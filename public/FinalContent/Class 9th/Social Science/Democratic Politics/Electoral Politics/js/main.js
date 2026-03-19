// Main JavaScript for Electoral Politics Interactive Lesson

// Global variables for tracking progress
let moduleProgress = {
    intro: false,
    overview: false,
    whyelections: false,
    system: false,
    democratic: false,
    terms: false,
    activities: false
};

// Module order for progress calculation
const moduleOrder = ['intro', 'overview', 'whyelections', 'system', 'democratic', 'terms', 'activities'];

let maxProgressIndex = 0;

let currentScore = 0;
let startTime = null;
let timer = null;
let isAudioEnabled = true; // Enable audio by default
let audioInitialized = false; // Track if audio has been initialized
let userInteracted = true; // Enable user interaction by default for auto-play
let currentSpeechState = 'stopped'; // Track speech state: 'stopped', 'speaking', 'paused'

// Quiz variables
let currentQuestionIndex = 0;
let userAnswers = [];
let quizCompleted = false;

// Global narration state management
let globalNarrationState = {
    isEnabled: true,
    disabledByUser: false,
    currentModule: null,
    currentPart: null
};

// Ensure audio is enabled by default
isAudioEnabled = true;
globalNarrationState.disabledByUser = false;

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Enable user interaction for speech synthesis on page load
    userInteracted = true;
    initialize();

    // Initialize audio immediately for auto-play
    if (window.speechSynthesis) {
        initializeAudio();
    }

    // Initialize play/pause button state
    updatePlayPauseButton();

    // Set audio button to enabled state by default
    const audioBtn = document.getElementById('audioBtn');
    if (audioBtn) {
        const icon = audioBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-volume-up';
        }
        audioBtn.setAttribute('aria-label', 'Mute audio narration');
        audioBtn.classList.remove('muted');
    }

    // Update enable audio button visibility
    updateEnableAudioButton();

    // Initialize quiz if activities module is already active
    const activitiesModule = document.getElementById('activities');
    console.log('Checking if activities module is active on page load:', activitiesModule);
    if (activitiesModule) {
        console.log('Activities module classList:', activitiesModule.classList);
        if (activitiesModule.classList.contains('active')) {
            console.log('Activities module is active on page load, initializing quiz...');
            setTimeout(() => {
                if (typeof initializeQuiz === 'function') {
                    console.log('Initializing quiz on page load...');
                    initializeQuiz();
                } else {
                    console.error('initializeQuiz function not found on page load');
                }
            }, 100);
        } else {
            console.log('Activities module is not active on page load');
        }
    } else {
        console.log('Activities module not found on page load');
    }

    // Also initialize quiz if quiz container exists (for direct access)
    if (document.getElementById('quiz-container')) {
        console.log('Quiz container found, initializing quiz...');
        setTimeout(() => {
            if (typeof initializeQuiz === 'function') {
                console.log('Initializing quiz for quiz container...');
                try {
                    initializeQuiz();
                } catch (error) {
                    console.error('Error initializing quiz:', error);
                }
            } else {
                console.error('initializeQuiz function not found for quiz container');
            }
        }, 100);
    }

    // Audio will only start when user manually clicks on intro section
    // No automatic audio start on page load or user interaction
});

// Initialize function
function initialize() {
    // Start timer
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);

    // Create background particles
    createParticles();

    // Content will be initialized by content.js when it loads
    
    // Intro narration will only start when user clicks on intro section
    // Removed auto-start on page load
    
    // Mark intro as completed since we land directly on it
    moduleProgress.intro = true;
    updateProgressNew('intro');

    // Auto-start intro narration after a short delay
    setTimeout(() => {
        if (isAudioEnabled && !globalNarrationState.disabledByUser) {
            console.log('Auto-starting intro narration on page load...');
            startModuleNarration('intro');
        }
    }, 1000);

    // Add global user interaction tracking for speech synthesis
    document.addEventListener('click', function(event) {
        userInteracted = true;
        console.log('User interaction detected, speech synthesis enabled');

        // Check if click was in intro module
        const introModule = document.getElementById('intro');
        if (introModule && introModule.classList.contains('active')) {
            // If user clicks in intro module, try to start audio
            setTimeout(() => {
                if (!window.speechSynthesis.speaking && currentSpeechState !== 'speaking') {
                    console.log('Click in intro module detected, attempting to start audio...');
                    startModuleNarration('intro');
                }
            }, 200);
        }
    });
    document.addEventListener('keydown', function() {
        userInteracted = true;
        console.log('User keyboard interaction detected, speech synthesis enabled');
    });

    // Check for browser feature support and initialize audio
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
        // Disable audio features if speech synthesis is not supported
        document.querySelectorAll('[onclick*="readText"], [onclick*="readQuote"], [onclick*="readPreamble"]').forEach(btn => {
            btn.disabled = true;
            btn.title = 'Speech synthesis not supported in your browser';
        });

        showFeedback('Speech synthesis is not supported in your browser. Some audio features will be disabled.', 'error');
    } else {
        // Initialize speech synthesis
        console.log('Initializing speech synthesis...');
        initializeAudio();

        // Handle voices being loaded asynchronously in some browsers
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = function() {
                console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
                audioInitialized = true;
                // No auto-narration - only manual start
            };
        }

        // Check if audio started successfully after 4 seconds
        setTimeout(() => {
            console.log('Checking if audio started successfully...');
            if (!window.speechSynthesis.speaking && currentSpeechState !== 'speaking') {
                console.log('Audio did not start automatically');
                // Don't show feedback message - let the manual button handle it
            }
        }, 4000);
    }
}
// Create background particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Function to start auto-narration for the initial module
function startAutoNarration() {
    // Auto-narration removed - intro audio only plays when user clicks intro section
    console.log('Auto-narration disabled - intro audio only plays on intro section click');
}

// Show a specific module
function showModule(moduleId) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Show the selected module
    document.getElementById(moduleId).classList.add('active');
    
    // Update navigation button states
    document.querySelectorAll('.tab').forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
    });

    document.querySelector(`.tab[onclick="showModule('${moduleId}')"]`).classList.add('active');
    document.querySelector(`.tab[onclick="showModule('${moduleId}')"]`).setAttribute('aria-pressed', 'true');
    
    // Mark module as visited if it's the first time
    if (!moduleProgress[moduleId]) {
        moduleProgress[moduleId] = true;
    }

    // Update progress every time we switch modules
    console.log('Switching to module:', moduleId);
    updateProgressNew(moduleId);

    // Show/hide enable audio buttons based on audio state
    updateEnableAudioButton();
    
    // Stop any ongoing audio
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        currentSpeechState = 'stopped';
        updatePlayPauseButton();

        // Clear any reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        });

        // Clear any paragraph highlights
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
    }
    
    // Update global narration state
    globalNarrationState.currentModule = moduleId;

    // Try to auto-start narration for all modules
    setTimeout(() => {
        console.log('=== AUTO-PLAY ATTEMPT ===');
        console.log('Module:', moduleId);
        console.log('isAudioEnabled:', isAudioEnabled);
        console.log('disabledByUser:', globalNarrationState.disabledByUser);
        console.log('audioInitialized:', audioInitialized);
        console.log('userInteracted:', userInteracted);

        if (isAudioEnabled && !globalNarrationState.disabledByUser) {
            console.log(`Attempting to auto-start narration for ${moduleId}...`);

            // Ensure audio is initialized
            if (!audioInitialized) {
                console.log('Audio not initialized, initializing now...');
                initializeAudio();
            }

            const success = startModuleNarration(moduleId);

            // If audio didn't start, show helpful feedback
            if (!success) {
                console.log('Audio auto-start failed');
                // Don't show popup message - just log to console
            } else {
                console.log('Audio auto-start successful');
            }
        } else {
            console.log('Audio auto-play blocked by settings');
            // Don't show popup messages - just log to console
        }
    }, 300);

    // Initialize quiz if activities module is shown
    if (moduleId === 'activities') {
        console.log('Activities module shown, initializing quiz...');
        setTimeout(() => {
            if (typeof initializeQuiz === 'function') {
                console.log('Calling initializeQuiz function');
                initializeQuiz();
            } else {
                console.error('initializeQuiz function not found');
            }
        }, 100);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateProgressNew(moduleId){
    console.log('Updating progress new for module:', moduleId);

    // Count total completed modules
    const completedModules = Object.values(moduleProgress).filter(Boolean).length;

    // Progress based on completed modules: intro is 15%, remaining 6 modules share 85%
    const progressPercentage = 15 + Math.round((completedModules - 1) / 6 * 85);
    console.log('Progress updated to:', progressPercentage, 'completed modules:', completedModules);

    // Update progress bar
    document.getElementById('progressBar').style.width = `${progressPercentage}%`;
    document.getElementById('progressBar').textContent = `${progressPercentage}%`;

    // Update accessibility attribute
    const progressBarElement = document.querySelector('.progress-bar');
    if (progressBarElement) {
        progressBarElement.setAttribute('aria-valuenow', progressPercentage);
    }

    const modulesElement = document.getElementById('modulesComplete');
    if (modulesElement) {
        modulesElement.textContent = completedModules;
    }

    // Check if specific submission types should trigger achievements
    if (typeof submissionType !== 'undefined' && submissionType) {
        switch (submissionType) {
            case 'match':
                showAchievement('Institution Expert', 'You matched all terms correctly!');
                break;
            case 'quiz':
                showAchievement('Quiz Master', 'You completed the quiz successfully!');
                break;
        }
    }

    // Check if all modules are complete
    if (completedModules === 7) { // All 7 modules including intro
        showAchievement('Completion Hero', 'You completed all modules of the lesson!');
        clearInterval(timer); // Stop the timer
    }
}
// Initialize audio system
function initializeAudio() {
    console.log('Initializing audio system...');

    if (!window.speechSynthesis) {
        console.error('Speech synthesis not supported');
        showFeedback('Your browser does not support audio narration.', 'error');
        return false;
    }

    // Try to initialize speech synthesis
    try {
        // Get available voices
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            console.log('No voices available, waiting for voices to load...');
            // Wait for voices to load
            return new Promise((resolve) => {
                window.speechSynthesis.onvoiceschanged = () => {
                    voices = window.speechSynthesis.getVoices();
                    console.log(`Voices loaded: ${voices.length}`);
                    audioInitialized = true;
                    resolve(true);
                };
            });
        } else {
            console.log(`Voices already available: ${voices.length}`);
            audioInitialized = true;
            return true;
        }
    } catch (error) {
        console.error('Error initializing audio:', error);
        showFeedback('Failed to initialize audio system.', 'error');
        return false;
    }
}

// Start module narration automatically
function startModuleNarration(moduleId) {
    console.log(`Starting automatic narration for module: ${moduleId}`);
    console.log('Audio enabled:', isAudioEnabled);
    console.log('User disabled:', globalNarrationState.disabledByUser);
    console.log('Audio initialized:', audioInitialized);

    // Update play/pause button to show pause
    const playPauseBtn = document.getElementById('playPause');
    if (playPauseBtn) {
        const icon = playPauseBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-pause';
        playPauseBtn.setAttribute('aria-label', 'Pause narration');
    }

    // Ensure speech synthesis is available
    if (!window.speechSynthesis) {
        console.error('Speech synthesis not available');
        showFeedback('Speech synthesis is not available in your browser.', 'error');
        return false;
    }

    // Initialize audio if not already done
    if (!audioInitialized) {
        console.log('Audio not initialized, initializing now...');
        initializeAudio();
    }

    switch(moduleId) {
        case 'intro':
            console.log('Starting intro narration...');
            return speak("Welcome to \"Electoral Politics. This chapter explains why elections are essential in a democracy and how they give meaning to the idea of people's rule. It explores the process of elections, the role of political competition, and the conditions that make an election truly democratic.");

        case 'overview':
            return speak("In this chapter we will look at how representatives are elected. We begin by understanding why elections are necessary and useful in a democracy. We try to understand how electoral competition among parties serves the people. We then go on to ask what makes an election democratic. The rest of the chapter tries to assess elections in India in the light of this yardstick.");

        case 'whyelections':
            return speak("This section explores why elections are necessary in a democracy. We look at real examples like the Haryana Assembly election and examine what makes an election democratic. We also discuss the benefits and challenges of political competition in elections.");

        case 'system':
            return speak("This section examines our system of elections in India. We look at electoral constituencies, reserved constituencies, voters' lists, nomination of candidates, election campaigns, polling and counting of votes, and whether elections are too expensive for our country.");

        case 'democratic':
            return speak("This section assesses whether elections in India are truly democratic. We examine the role of the independent Election Commission, popular participation in elections, acceptance of election outcomes, and the challenges to free and fair elections.");

        case 'terms':
            // Get the full terms content for auto-narration
            const termsModule = document.getElementById('terms');
            if (termsModule) {
                const contentBlock = termsModule.querySelector('.content-block');
                const introText = contentBlock ? contentBlock.textContent.trim() : '';

                const termsGrid = termsModule.querySelector('.terms-grid');
                let termsText = '';

                if (termsGrid) {
                    const termItems = termsGrid.querySelectorAll('.term-item');
                    termsText = Array.from(termItems).map(item => {
                        const termName = item.querySelector('h3')?.textContent || '';
                        const termDefinition = item.querySelector('p')?.textContent || '';
                        return `${termName}: ${termDefinition}`;
                    }).join('. ');
                }

                const fullText = `${introText}. Here are the important terms: ${termsText}`;
                return speak(fullText);
            }
            return speak("This section covers important terms related to electoral politics, including Code of Conduct, Constituency, Incumbent, Level playing field, Rigging, and Turnout. These terms help us understand the key concepts and processes involved in democratic elections in India.");

        case 'activities':
            return speak("Test your knowledge and understanding with these interactive activities about Electoral Politics. Complete quizzes and matching activities to reinforce your learning about elections and democracy in India.");

        case 'haryana':
            // Get the full Haryana story content for auto-narration
            const haryanaBtn = document.getElementById('haryanaSpeakerBtn');
            if (haryanaBtn) {
                const haryanaCard = haryanaBtn.closest('.feature-card');
                if (haryanaCard) {
                    const featureDesc = haryanaCard.querySelector('.feature-desc');
                    if (featureDesc) {
                        const textContent = featureDesc.textContent.trim();
                        return speak(textContent);
                    }
                }
            }
            return speak("This is the story of the Assembly Election in Haryana in 1987. The State had been ruled by a Congress party led government since 1982. Chaudhary Devi Lal, then an opposition leader, led a movement called 'Nyaya Yudh' (Struggle for Justice) and formed a new party, Lok Dal. His party joined other opposition parties to form a front against the Congress in the elections. In the election campaign, Devi Lal said that if his party won the elections, his government would waive the loans of farmers and small businessmen. He promised that this would be the first action of his government. The people were unhappy with the existing government. They were also attracted by Devi Lal's promise. So, when elections were held, they voted overwhelmingly in favour of Lok Dal and its allies. Lok Dal and its partners won 76 out of 90 seats in the State Assembly. Lok Dal alone won 60 seats and thus had a clear majority in the Assembly. The Congress could win only 5 seats. Once the election results were announced, the sitting Chief Minister resigned. The newly elected Members of Legislative Assembly (MLAs) of Lok Dal chose Devi Lal as their leader. The Governor invited Devi Lal to be the new Chief Minister. Three days after the election results were declared, he became the Chief Minister. As soon as he became the Chief Minister, his Government issued a Government Order waiving the outstanding loans of small farmers, agricultural labourers and small businessmen. His party ruled the State for four years. The next elections were held in 1991. But this time his party did not win popular support. The Congress won the election and formed the government.");

        default:
            console.log(`No specific narration defined for module: ${moduleId}`);
            return false;
    }
}

// Start the learning journey
function startJourney() {
    showModule('overview');

    if (!startTime) {
        startTime = new Date();
        timer = setInterval(updateTimer, 1000);
    }

    // Enable user interaction for speech synthesis
    userInteracted = true;

    showAchievement('Journey Begins', 'You started your learning journey with Electoral Politics!');
    return speak("Welcome to \"Electoral Politics. This chapter explains why elections are essential in a democracy and how they give meaning to the idea of people's rule. It explores the process of elections, the role of political competition, and the conditions that make an election truly democratic.");
}

// Manual function to start intro audio
function startIntroAudio() {
    console.log('Manual audio start requested...');
    userInteracted = true;

    // Hide the manual start button
    const startAudioBtn = document.getElementById('startAudioBtn');
    if (startAudioBtn) {
        startAudioBtn.style.display = 'none';
    }

    // Start the intro narration
    startModuleNarration('intro');

    showFeedback('Audio narration started successfully!', 'success');
}

// Toggle overview narration
function toggleOverviewNarration() {
    console.log('toggleOverviewNarration called');

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // Get the overview speaker button
    const overviewSpeakerBtn = document.getElementById('overviewSpeakerBtn');
    if (!overviewSpeakerBtn) {
        console.error('Overview speaker button not found');
        return;
    }

    // Check if currently speaking
    if (window.speechSynthesis.speaking) {
        // Stop current narration
        console.log('Stopping current narration...');
        window.speechSynthesis.cancel();
        currentSpeechState = 'stopped';
        updatePlayPauseButton();

        // Update button state
        const icon = overviewSpeakerBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-volume-up';
        overviewSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');

        return;
    }

    // Start overview narration
    console.log('Starting overview narration...');
    const success = startModuleNarration('overview');

    if (success) {
        // Update button state to show it's playing
        const icon = overviewSpeakerBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-pause';
        overviewSpeakerBtn.setAttribute('aria-label', 'Pause narration');
    }
}

// Global variable to track intro narration state
let introNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track overview narration state
let overviewNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track terms narration state
let termsNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track haryana narration state
let haryanaNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track why elections narration state
let whyElectionsNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track democratic narration state
let democraticNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track competition narration state
let competitionNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track electoral narration state
let electoralNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track reserved narration state
let reservedNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track voters narration state
let votersNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track nomination narration state
let nominationNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track educational narration state
let educationalNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track campaign narration state
let campaignNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track polling narration state
let pollingNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track expensive narration state
let expensiveNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track independent narration state
let independentNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track popular narration state
let popularNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track acceptance narration state
let acceptanceNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Global variable to track challenges narration state
let challengesNarrationState = {
    isPlaying: false,
    currentUtterance: null,
    hasStarted: false
};

// Toggle intro narration function
function toggleIntroNarration() {
    console.log('toggleIntroNarration called');
    console.log('Current intro narration state:', introNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (introNarrationState.isPlaying) {
        console.log('Stopping intro narration...');
        window.speechSynthesis.cancel();
        introNarrationState.isPlaying = false;
        introNarrationState.hasStarted = false;

        // Update button state
        const introSpeakerBtn = document.getElementById('introSpeakerBtn');
        if (introSpeakerBtn) {
            introSpeakerBtn.classList.remove('playing');
            introSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            introSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Clear any reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        });

        return;
    }

    // If not playing, start narration
    console.log('Starting intro narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get all content from the Introduction module
    const introModule = document.getElementById('intro');
    if (!introModule) {
        console.error('Introduction module not found');
        showFeedback('Introduction module not found.', 'error');
        return;
    }

    // Get the content block (skip the title and buttons)
    const contentBlock = introModule.querySelector('.content-block');
    if (!contentBlock) {
        console.error('Content block not found in Introduction module');
        showFeedback('Content not found in Introduction module.', 'error');
        return;
    }

    // Get all text content from the content block
    const textContent = contentBlock.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Introduction module');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    introNarrationState.currentUtterance = utterance;
    introNarrationState.isPlaying = true;
    introNarrationState.hasStarted = true;

    // Update button state
    const introSpeakerBtn = document.getElementById('introSpeakerBtn');
    if (introSpeakerBtn) {
        introSpeakerBtn.classList.add('playing');
        introSpeakerBtn.innerHTML = '<i class="fas fa-stop"></i>';
        introSpeakerBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Intro narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Intro narration ended successfully');
        introNarrationState.isPlaying = false;
        introNarrationState.hasStarted = false;

        // Update button state
        if (introSpeakerBtn) {
            introSpeakerBtn.classList.remove('playing');
            introSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            introSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Intro narration error:', event);
        introNarrationState.isPlaying = false;
        introNarrationState.hasStarted = false;

        // Update button state
        if (introSpeakerBtn) {
            introSpeakerBtn.classList.remove('playing');
            introSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            introSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start intro narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Intro narration started successfully');
    } catch (error) {
        console.error('Error starting intro narration:', error);
        introNarrationState.isPlaying = false;
        introNarrationState.hasStarted = false;

        // Update button state
        if (introSpeakerBtn) {
            introSpeakerBtn.classList.remove('playing');
            introSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            introSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Silent error handling - no popup message
        console.error('Error starting intro narration:', error);
    }
}

// Toggle overview narration function
function toggleOverviewNarration() {
    console.log('toggleOverviewNarration called');
    console.log('Current overview narration state:', overviewNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (overviewNarrationState.isPlaying) {
        console.log('Stopping overview narration...');
        window.speechSynthesis.cancel();
        overviewNarrationState.isPlaying = false;
        overviewNarrationState.hasStarted = false;

        // Update button state
        const overviewSpeakerBtn = document.getElementById('overviewSpeakerBtn');
        if (overviewSpeakerBtn) {
            overviewSpeakerBtn.classList.remove('playing');
            overviewSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            overviewSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting overview narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get all content from the Overview module
    const overviewModule = document.getElementById('overview');
    if (!overviewModule) {
        console.error('Overview module not found');
        showFeedback('Overview module not found.', 'error');
        return;
    }

    // Get the content block (skip the title and buttons)
    const contentBlock = overviewModule.querySelector('.content-block');
    if (!contentBlock) {
        console.error('Content block not found in Overview module');
        showFeedback('Content not found in Overview module.', 'error');
        return;
    }

    // Get all text content from the content block
    const textContent = contentBlock.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Overview module');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    overviewNarrationState.currentUtterance = utterance;
    overviewNarrationState.isPlaying = true;
    overviewNarrationState.hasStarted = true;

    // Update button state
    const overviewSpeakerBtn = document.getElementById('overviewSpeakerBtn');
    if (overviewSpeakerBtn) {
        overviewSpeakerBtn.classList.add('playing');
        overviewSpeakerBtn.innerHTML = '<i class="fas fa-stop"></i>';
        overviewSpeakerBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Overview narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Overview narration ended successfully');
        overviewNarrationState.isPlaying = false;
        overviewNarrationState.hasStarted = false;

        // Update button state
        if (overviewSpeakerBtn) {
            overviewSpeakerBtn.classList.remove('playing');
            overviewSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            overviewSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Overview narration error:', event);
        overviewNarrationState.isPlaying = false;
        overviewNarrationState.hasStarted = false;

        // Update button state
        if (overviewSpeakerBtn) {
            overviewSpeakerBtn.classList.remove('playing');
            overviewSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            overviewSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start overview narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Overview narration started successfully');
    } catch (error) {
        console.error('Error starting overview narration:', error);
        overviewNarrationState.isPlaying = false;
        overviewNarrationState.hasStarted = false;

        // Update button state
        if (overviewSpeakerBtn) {
            overviewSpeakerBtn.classList.remove('playing');
            overviewSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            overviewSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Silent error handling - no popup message
        console.error('Error starting overview narration:', error);
    }
}

// Toggle terms narration function
function toggleTermsNarration() {
    console.log('toggleTermsNarration called');
    console.log('Current terms narration state:', termsNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (termsNarrationState.isPlaying) {
        console.log('Stopping terms narration...');
        window.speechSynthesis.cancel();
        termsNarrationState.isPlaying = false;
        termsNarrationState.hasStarted = false;

        // Update button state
        const termsSpeakerBtn = document.getElementById('termsSpeakerBtn');
        if (termsSpeakerBtn) {
            termsSpeakerBtn.classList.remove('playing');
            termsSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            termsSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting terms narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get all content from the Terms module
    const termsModule = document.getElementById('terms');
    if (!termsModule) {
        console.error('Terms module not found');
        showFeedback('Terms module not found.', 'error');
        return;
    }

    // Get the content block (skip the title and buttons)
    const contentBlock = termsModule.querySelector('.content-block');
    if (!contentBlock) {
        console.error('Content block not found in Terms module');
        showFeedback('Content not found in Terms module.', 'error');
        return;
    }

    // Get all text content from the content block
    const introText = contentBlock.textContent.trim();

    // Get all term definitions from the terms grid
    const termsGrid = termsModule.querySelector('.terms-grid');
    let termsText = '';

    if (termsGrid) {
        const termItems = termsGrid.querySelectorAll('.term-item');
        termsText = Array.from(termItems).map(item => {
            const termName = item.querySelector('h3')?.textContent || '';
            const termDefinition = item.querySelector('p')?.textContent || '';
            return `${termName}: ${termDefinition}`;
        }).join('. ');
    }

    // Combine intro text and all term definitions
    const fullTextContent = `${introText}. Here are the important terms: ${termsText}`;

    if (!fullTextContent || fullTextContent.trim() === 'Here are the important terms:') {
        console.error('No text content found in Terms module');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Full text content to narrate:', fullTextContent.substring(0, 200) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(fullTextContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    termsNarrationState.currentUtterance = utterance;
    termsNarrationState.isPlaying = true;
    termsNarrationState.hasStarted = true;

    // Update button state
    const termsSpeakerBtn = document.getElementById('termsSpeakerBtn');
    if (termsSpeakerBtn) {
        termsSpeakerBtn.classList.add('playing');
        termsSpeakerBtn.innerHTML = '<i class="fas fa-stop"></i>';
        termsSpeakerBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Terms narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Terms narration ended successfully');
        termsNarrationState.isPlaying = false;
        termsNarrationState.hasStarted = false;

        // Update button state
        if (termsSpeakerBtn) {
            termsSpeakerBtn.classList.remove('playing');
            termsSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            termsSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Terms narration error:', event);
        termsNarrationState.isPlaying = false;
        termsNarrationState.hasStarted = false;

        // Update button state
        if (termsSpeakerBtn) {
            termsSpeakerBtn.classList.remove('playing');
            termsSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            termsSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start terms narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Terms narration started successfully');
    } catch (error) {
        console.error('Error starting terms narration:', error);
        termsNarrationState.isPlaying = false;
        termsNarrationState.hasStarted = false;

        // Update button state
        if (termsSpeakerBtn) {
            termsSpeakerBtn.classList.remove('playing');
            termsSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            termsSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Silent error handling - no popup message
        console.error('Error starting terms narration:', error);
    }
}

// Toggle haryana narration function
function toggleHaryanaNarration() {
    console.log('toggleHaryanaNarration called');
    console.log('Current haryana narration state:', haryanaNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (haryanaNarrationState.isPlaying) {
        console.log('Stopping haryana narration...');
        window.speechSynthesis.cancel();
        haryanaNarrationState.isPlaying = false;
        haryanaNarrationState.hasStarted = false;

        // Update button state
        const haryanaSpeakerBtn = document.getElementById('haryanaSpeakerBtn');
        if (haryanaSpeakerBtn) {
            haryanaSpeakerBtn.classList.remove('playing');
            haryanaSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            haryanaSpeakerBtn.setAttribute('aria-label', 'Listen to Assembly Election in Haryana story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting haryana narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Haryana card
    // Find the card that contains the haryana speaker button
    const haryanaSpeakerBtn = document.getElementById('haryanaSpeakerBtn');
    if (!haryanaSpeakerBtn) {
        console.error('Haryana speaker button not found');
        showFeedback('Haryana speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const haryanaCard = haryanaSpeakerBtn.closest('.feature-card');
    if (!haryanaCard) {
        console.error('Haryana card not found');
        showFeedback('Haryana card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = haryanaCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Haryana card');
        showFeedback('Content not found in Haryana card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Haryana card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Haryana text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    haryanaNarrationState.currentUtterance = utterance;
    haryanaNarrationState.isPlaying = true;
    haryanaNarrationState.hasStarted = true;

    // Update button state
    const haryanaBtn = document.getElementById('haryanaSpeakerBtn');
    if (haryanaBtn) {
        haryanaBtn.classList.add('playing');
        haryanaBtn.innerHTML = '<i class="fas fa-stop"></i>';
        haryanaBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Haryana narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Haryana narration ended successfully');
        haryanaNarrationState.isPlaying = false;
        haryanaNarrationState.hasStarted = false;

        // Update button state
        if (haryanaBtn) {
            haryanaBtn.classList.remove('playing');
            haryanaBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            haryanaBtn.setAttribute('aria-label', 'Listen to Assembly Election in Haryana story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Haryana narration error:', event);
        haryanaNarrationState.isPlaying = false;
        haryanaNarrationState.hasStarted = false;

        // Update button state
        if (haryanaBtn) {
            haryanaBtn.classList.remove('playing');
            haryanaBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            haryanaBtn.setAttribute('aria-label', 'Listen to Assembly Election in Haryana story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start haryana narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Haryana narration started successfully');
    } catch (error) {
        console.error('Error starting haryana narration:', error);
        haryanaNarrationState.isPlaying = false;
        haryanaNarrationState.hasStarted = false;

        // Update button state
        if (haryanaBtn) {
            haryanaBtn.classList.remove('playing');
            haryanaBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            haryanaBtn.setAttribute('aria-label', 'Listen to Assembly Election in Haryana story');
        }

        // Silent error handling - no popup message
        console.error('Error starting haryana narration:', error);
    }
}

// Toggle why elections narration function
function toggleWhyElectionsNarration() {
    console.log('toggleWhyElectionsNarration called');
    console.log('Current why elections narration state:', whyElectionsNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (whyElectionsNarrationState.isPlaying) {
        console.log('Stopping why elections narration...');
        window.speechSynthesis.cancel();
        whyElectionsNarrationState.isPlaying = false;
        whyElectionsNarrationState.hasStarted = false;

        // Update button state
        const whyelectionsSpeakerBtn = document.getElementById('whyelectionsSpeakerBtn');
        if (whyelectionsSpeakerBtn) {
            whyelectionsSpeakerBtn.classList.remove('playing');
            whyelectionsSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            whyelectionsSpeakerBtn.setAttribute('aria-label', 'Listen to Why do we need elections story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting why elections narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Why Elections card
    const whyelectionsSpeakerBtn = document.getElementById('whyelectionsSpeakerBtn');
    if (!whyelectionsSpeakerBtn) {
        console.error('Why elections speaker button not found');
        showFeedback('Why elections speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const whyelectionsCard = whyelectionsSpeakerBtn.closest('.feature-card');
    if (!whyelectionsCard) {
        console.error('Why elections card not found');
        showFeedback('Why elections card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = whyelectionsCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Why elections card');
        showFeedback('Content not found in Why elections card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Why elections card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Why elections text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    whyElectionsNarrationState.currentUtterance = utterance;
    whyElectionsNarrationState.isPlaying = true;
    whyElectionsNarrationState.hasStarted = true;

    // Update button state
    const whyelectionsBtn = document.getElementById('whyelectionsSpeakerBtn');
    if (whyelectionsBtn) {
        whyelectionsBtn.classList.add('playing');
        whyelectionsBtn.innerHTML = '<i class="fas fa-stop"></i>';
        whyelectionsBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Why elections narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Why elections narration ended successfully');
        whyElectionsNarrationState.isPlaying = false;
        whyElectionsNarrationState.hasStarted = false;

        // Update button state
        if (whyelectionsBtn) {
            whyelectionsBtn.classList.remove('playing');
            whyelectionsBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            whyelectionsBtn.setAttribute('aria-label', 'Listen to Why do we need elections story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Why elections narration error:', event);
        whyElectionsNarrationState.isPlaying = false;
        whyElectionsNarrationState.hasStarted = false;

        // Update button state
        if (whyelectionsBtn) {
            whyelectionsBtn.classList.remove('playing');
            whyelectionsBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            whyelectionsBtn.setAttribute('aria-label', 'Listen to Why do we need elections story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start why elections narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Why elections narration started successfully');
    } catch (error) {
        console.error('Error starting why elections narration:', error);
        whyElectionsNarrationState.isPlaying = false;
        whyElectionsNarrationState.hasStarted = false;

        // Update button state
        if (whyelectionsBtn) {
            whyelectionsBtn.classList.remove('playing');
            whyelectionsBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            whyelectionsBtn.setAttribute('aria-label', 'Listen to Why do we need elections story');
        }

        // Silent error handling - no popup message
        console.error('Error starting why elections narration:', error);
    }
}

// Toggle democratic narration function
function toggleDemocraticNarration() {
    console.log('toggleDemocraticNarration called');
    console.log('Current democratic narration state:', democraticNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (democraticNarrationState.isPlaying) {
        console.log('Stopping democratic narration...');
        window.speechSynthesis.cancel();
        democraticNarrationState.isPlaying = false;
        democraticNarrationState.hasStarted = false;

        // Update button state
        const democraticSpeakerBtn = document.getElementById('democraticSpeakerBtn');
        if (democraticSpeakerBtn) {
            democraticSpeakerBtn.classList.remove('playing');
            democraticSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            democraticSpeakerBtn.setAttribute('aria-label', 'Listen to What makes an election democratic story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting democratic narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Democratic card
    const democraticSpeakerBtn = document.getElementById('democraticSpeakerBtn');
    if (!democraticSpeakerBtn) {
        console.error('Democratic speaker button not found');
        showFeedback('Democratic speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const democraticCard = democraticSpeakerBtn.closest('.feature-card');
    if (!democraticCard) {
        console.error('Democratic card not found');
        showFeedback('Democratic card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = democraticCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Democratic card');
        showFeedback('Content not found in Democratic card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Democratic card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Democratic text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    democraticNarrationState.currentUtterance = utterance;
    democraticNarrationState.isPlaying = true;
    democraticNarrationState.hasStarted = true;

    // Update button state
    const democraticBtn = document.getElementById('democraticSpeakerBtn');
    if (democraticBtn) {
        democraticBtn.classList.add('playing');
        democraticBtn.innerHTML = '<i class="fas fa-stop"></i>';
        democraticBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Democratic narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Democratic narration ended successfully');
        democraticNarrationState.isPlaying = false;
        democraticNarrationState.hasStarted = false;

        // Update button state
        if (democraticBtn) {
            democraticBtn.classList.remove('playing');
            democraticBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            democraticBtn.setAttribute('aria-label', 'Listen to What makes an election democratic story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Democratic narration error:', event);
        democraticNarrationState.isPlaying = false;
        democraticNarrationState.hasStarted = false;

        // Update button state
        if (democraticBtn) {
            democraticBtn.classList.remove('playing');
            democraticBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            democraticBtn.setAttribute('aria-label', 'Listen to What makes an election democratic story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start democratic narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Democratic narration started successfully');
    } catch (error) {
        console.error('Error starting democratic narration:', error);
        democraticNarrationState.isPlaying = false;
        democraticNarrationState.hasStarted = false;

        // Update button state
        if (democraticBtn) {
            democraticBtn.classList.remove('playing');
            democraticBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            democraticBtn.setAttribute('aria-label', 'Listen to What makes an election democratic story');
        }

        // Silent error handling - no popup message
        console.error('Error starting democratic narration:', error);
    }
}

// Toggle competition narration function
function toggleCompetitionNarration() {
    console.log('toggleCompetitionNarration called');
    console.log('Current competition narration state:', competitionNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (competitionNarrationState.isPlaying) {
        console.log('Stopping competition narration...');
        window.speechSynthesis.cancel();
        competitionNarrationState.isPlaying = false;
        competitionNarrationState.hasStarted = false;

        // Update button state
        const competitionSpeakerBtn = document.getElementById('competitionSpeakerBtn');
        if (competitionSpeakerBtn) {
            competitionSpeakerBtn.classList.remove('playing');
            competitionSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            competitionSpeakerBtn.setAttribute('aria-label', 'Listen to Is it good to have political competition story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting competition narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Competition card
    const competitionSpeakerBtn = document.getElementById('competitionSpeakerBtn');
    if (!competitionSpeakerBtn) {
        console.error('Competition speaker button not found');
        showFeedback('Competition speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const competitionCard = competitionSpeakerBtn.closest('.feature-card');
    if (!competitionCard) {
        console.error('Competition card not found');
        showFeedback('Competition card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = competitionCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Competition card');
        showFeedback('Content not found in Competition card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Competition card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Competition text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    competitionNarrationState.currentUtterance = utterance;
    competitionNarrationState.isPlaying = true;
    competitionNarrationState.hasStarted = true;

    // Update button state
    const competitionBtn = document.getElementById('competitionSpeakerBtn');
    if (competitionBtn) {
        competitionBtn.classList.add('playing');
        competitionBtn.innerHTML = '<i class="fas fa-stop"></i>';
        competitionBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Competition narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Competition narration ended successfully');
        competitionNarrationState.isPlaying = false;
        competitionNarrationState.hasStarted = false;

        // Update button state
        if (competitionBtn) {
            competitionBtn.classList.remove('playing');
            competitionBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            competitionBtn.setAttribute('aria-label', 'Listen to Is it good to have political competition story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Competition narration error:', event);
        competitionNarrationState.isPlaying = false;
        competitionNarrationState.hasStarted = false;

        // Update button state
        if (competitionBtn) {
            competitionBtn.classList.remove('playing');
            competitionBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            competitionBtn.setAttribute('aria-label', 'Listen to Is it good to have political competition story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start competition narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Competition narration started successfully');
    } catch (error) {
        console.error('Error starting competition narration:', error);
        competitionNarrationState.isPlaying = false;
        competitionNarrationState.hasStarted = false;

        // Update button state
        if (competitionBtn) {
            competitionBtn.classList.remove('playing');
            competitionBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            competitionBtn.setAttribute('aria-label', 'Listen to Is it good to have political competition story');
        }

        // Silent error handling - no popup message
        console.error('Error starting competition narration:', error);
    }
}

// Toggle electoral narration function
function toggleElectoralNarration() {
    console.log('toggleElectoralNarration called');
    console.log('Current electoral narration state:', electoralNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (electoralNarrationState.isPlaying) {
        console.log('Stopping electoral narration...');
        window.speechSynthesis.cancel();
        electoralNarrationState.isPlaying = false;
        electoralNarrationState.hasStarted = false;

        // Update button state
        const electoralSpeakerBtn = document.getElementById('electoralSpeakerBtn');
        if (electoralSpeakerBtn) {
            electoralSpeakerBtn.classList.remove('playing');
            electoralSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            electoralSpeakerBtn.setAttribute('aria-label', 'Listen to Electoral Constituencies story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting electoral narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Electoral Constituencies card
    const electoralSpeakerBtn = document.getElementById('electoralSpeakerBtn');
    if (!electoralSpeakerBtn) {
        console.error('Electoral speaker button not found');
        showFeedback('Electoral speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const electoralCard = electoralSpeakerBtn.closest('.feature-card');
    if (!electoralCard) {
        console.error('Electoral card not found');
        showFeedback('Electoral card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = electoralCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Electoral card');
        showFeedback('Content not found in Electoral card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Electoral card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Electoral text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    electoralNarrationState.currentUtterance = utterance;
    electoralNarrationState.isPlaying = true;
    electoralNarrationState.hasStarted = true;

    // Update button state
    const electoralBtn = document.getElementById('electoralSpeakerBtn');
    if (electoralBtn) {
        electoralBtn.classList.add('playing');
        electoralBtn.innerHTML = '<i class="fas fa-stop"></i>';
        electoralBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Electoral narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Electoral narration ended successfully');
        electoralNarrationState.isPlaying = false;
        electoralNarrationState.hasStarted = false;

        // Update button state
        if (electoralBtn) {
            electoralBtn.classList.remove('playing');
            electoralBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            electoralBtn.setAttribute('aria-label', 'Listen to Electoral Constituencies story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Electoral narration error:', event);
        electoralNarrationState.isPlaying = false;
        electoralNarrationState.hasStarted = false;

        // Update button state
        if (electoralBtn) {
            electoralBtn.classList.remove('playing');
            electoralBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            electoralBtn.setAttribute('aria-label', 'Listen to Electoral Constituencies story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start electoral narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Electoral narration started successfully');
    } catch (error) {
        console.error('Error starting electoral narration:', error);
        electoralNarrationState.isPlaying = false;
        electoralNarrationState.hasStarted = false;

        // Update button state
        if (electoralBtn) {
            electoralBtn.classList.remove('playing');
            electoralBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            electoralBtn.setAttribute('aria-label', 'Listen to Electoral Constituencies story');
        }

        // Silent error handling - no popup message
        console.error('Error starting electoral narration:', error);
    }
}

// Toggle reserved narration function
function toggleReservedNarration() {
    console.log('toggleReservedNarration called');
    console.log('Current reserved narration state:', reservedNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (reservedNarrationState.isPlaying) {
        console.log('Stopping reserved narration...');
        window.speechSynthesis.cancel();
        reservedNarrationState.isPlaying = false;
        reservedNarrationState.hasStarted = false;

        // Update button state
        const reservedSpeakerBtn = document.getElementById('reservedSpeakerBtn');
        if (reservedSpeakerBtn) {
            reservedSpeakerBtn.classList.remove('playing');
            reservedSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            reservedSpeakerBtn.setAttribute('aria-label', 'Listen to Reserved Constituencies story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting reserved narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Reserved Constituencies card
    const reservedSpeakerBtn = document.getElementById('reservedSpeakerBtn');
    if (!reservedSpeakerBtn) {
        console.error('Reserved speaker button not found');
        showFeedback('Reserved speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const reservedCard = reservedSpeakerBtn.closest('.feature-card');
    if (!reservedCard) {
        console.error('Reserved card not found');
        showFeedback('Reserved card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = reservedCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Reserved card');
        showFeedback('Content not found in Reserved card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Reserved card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Reserved text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    reservedNarrationState.currentUtterance = utterance;
    reservedNarrationState.isPlaying = true;
    reservedNarrationState.hasStarted = true;

    // Update button state
    const reservedBtn = document.getElementById('reservedSpeakerBtn');
    if (reservedBtn) {
        reservedBtn.classList.add('playing');
        reservedBtn.innerHTML = '<i class="fas fa-stop"></i>';
        reservedBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Reserved narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Reserved narration ended successfully');
        reservedNarrationState.isPlaying = false;
        reservedNarrationState.hasStarted = false;

        // Update button state
        if (reservedBtn) {
            reservedBtn.classList.remove('playing');
            reservedBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            reservedBtn.setAttribute('aria-label', 'Listen to Reserved Constituencies story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Reserved narration error:', event);
        reservedNarrationState.isPlaying = false;
        reservedNarrationState.hasStarted = false;

        // Update button state
        if (reservedBtn) {
            reservedBtn.classList.remove('playing');
            reservedBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            reservedBtn.setAttribute('aria-label', 'Listen to Reserved Constituencies story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start reserved narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Reserved narration started successfully');
    } catch (error) {
        console.error('Error starting reserved narration:', error);
        reservedNarrationState.isPlaying = false;
        reservedNarrationState.hasStarted = false;

        // Update button state
        if (reservedBtn) {
            reservedBtn.classList.remove('playing');
            reservedBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            reservedBtn.setAttribute('aria-label', 'Listen to Reserved Constituencies story');
        }

        // Silent error handling - no popup message
        console.error('Error starting reserved narration:', error);
    }
}

// Toggle voters narration function
function toggleVotersNarration() {
    console.log('toggleVotersNarration called');
    console.log('Current voters narration state:', votersNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (votersNarrationState.isPlaying) {
        console.log('Stopping voters narration...');
        window.speechSynthesis.cancel();
        votersNarrationState.isPlaying = false;
        votersNarrationState.hasStarted = false;

        // Update button state
        const votersSpeakerBtn = document.getElementById('votersSpeakerBtn');
        if (votersSpeakerBtn) {
            votersSpeakerBtn.classList.remove('playing');
            votersSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            votersSpeakerBtn.setAttribute('aria-label', 'Listen to Voters\' List story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting voters narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Voters' List card
    const votersSpeakerBtn = document.getElementById('votersSpeakerBtn');
    if (!votersSpeakerBtn) {
        console.error('Voters speaker button not found');
        showFeedback('Voters speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const votersCard = votersSpeakerBtn.closest('.feature-card');
    if (!votersCard) {
        console.error('Voters card not found');
        showFeedback('Voters card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = votersCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Voters card');
        showFeedback('Content not found in Voters card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Voters card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Voters text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    votersNarrationState.currentUtterance = utterance;
    votersNarrationState.isPlaying = true;
    votersNarrationState.hasStarted = true;

    // Update button state
    const votersBtn = document.getElementById('votersSpeakerBtn');
    if (votersBtn) {
        votersBtn.classList.add('playing');
        votersBtn.innerHTML = '<i class="fas fa-stop"></i>';
        votersBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Voters narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Voters narration ended successfully');
        votersNarrationState.isPlaying = false;
        votersNarrationState.hasStarted = false;

        // Update button state
        if (votersBtn) {
            votersBtn.classList.remove('playing');
            votersBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            votersBtn.setAttribute('aria-label', 'Listen to Voters\' List story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Voters narration error:', event);
        votersNarrationState.isPlaying = false;
        votersNarrationState.hasStarted = false;

        // Update button state
        if (votersBtn) {
            votersBtn.classList.remove('playing');
            votersBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            votersBtn.setAttribute('aria-label', 'Listen to Voters\' List story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start voters narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Voters narration started successfully');
    } catch (error) {
        console.error('Error starting voters narration:', error);
        votersNarrationState.isPlaying = false;
        votersNarrationState.hasStarted = false;

        // Update button state
        if (votersBtn) {
            votersBtn.classList.remove('playing');
            votersBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            votersBtn.setAttribute('aria-label', 'Listen to Voters\' List story');
        }

        // Silent error handling - no popup message
        console.error('Error starting voters narration:', error);
    }
}

// Toggle nomination narration function
function toggleNominationNarration() {
    console.log('toggleNominationNarration called');
    console.log('Current nomination narration state:', nominationNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (nominationNarrationState.isPlaying) {
        console.log('Stopping nomination narration...');
        window.speechSynthesis.cancel();
        nominationNarrationState.isPlaying = false;
        nominationNarrationState.hasStarted = false;

        // Update button state
        const nominationSpeakerBtn = document.getElementById('nominationSpeakerBtn');
        if (nominationSpeakerBtn) {
            nominationSpeakerBtn.classList.remove('playing');
            nominationSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            nominationSpeakerBtn.setAttribute('aria-label', 'Listen to Nomination of Candidates story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting nomination narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Nomination of Candidates card
    const nominationSpeakerBtn = document.getElementById('nominationSpeakerBtn');
    if (!nominationSpeakerBtn) {
        console.error('Nomination speaker button not found');
        showFeedback('Nomination speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const nominationCard = nominationSpeakerBtn.closest('.feature-card');
    if (!nominationCard) {
        console.error('Nomination card not found');
        showFeedback('Nomination card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = nominationCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Nomination card');
        showFeedback('Content not found in Nomination card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Nomination card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Nomination text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    nominationNarrationState.currentUtterance = utterance;
    nominationNarrationState.isPlaying = true;
    nominationNarrationState.hasStarted = true;

    // Update button state
    const nominationBtn = document.getElementById('nominationSpeakerBtn');
    if (nominationBtn) {
        nominationBtn.classList.add('playing');
        nominationBtn.innerHTML = '<i class="fas fa-stop"></i>';
        nominationBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Nomination narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Nomination narration ended successfully');
        nominationNarrationState.isPlaying = false;
        nominationNarrationState.hasStarted = false;

        // Update button state
        if (nominationBtn) {
            nominationBtn.classList.remove('playing');
            nominationBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            nominationBtn.setAttribute('aria-label', 'Listen to Nomination of Candidates story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Nomination narration error:', event);
        nominationNarrationState.isPlaying = false;
        nominationNarrationState.hasStarted = false;

        // Update button state
        if (nominationBtn) {
            nominationBtn.classList.remove('playing');
            nominationBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            nominationBtn.setAttribute('aria-label', 'Listen to Nomination of Candidates story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start nomination narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Nomination narration started successfully');
    } catch (error) {
        console.error('Error starting nomination narration:', error);
        nominationNarrationState.isPlaying = false;
        nominationNarrationState.hasStarted = false;

        // Update button state
        if (nominationBtn) {
            nominationBtn.classList.remove('playing');
            nominationBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            nominationBtn.setAttribute('aria-label', 'Listen to Nomination of Candidates story');
        }

        // Silent error handling - no popup message
        console.error('Error starting nomination narration:', error);
    }
}

// Toggle educational narration function
function toggleEducationalNarration() {
    console.log('toggleEducationalNarration called');
    console.log('Current educational narration state:', educationalNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (educationalNarrationState.isPlaying) {
        console.log('Stopping educational narration...');
        window.speechSynthesis.cancel();
        educationalNarrationState.isPlaying = false;
        educationalNarrationState.hasStarted = false;

        // Update button state
        const educationalSpeakerBtn = document.getElementById('educationalSpeakerBtn');
        if (educationalSpeakerBtn) {
            educationalSpeakerBtn.classList.remove('playing');
            educationalSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            educationalSpeakerBtn.setAttribute('aria-label', 'Listen to Educational Qualifications for Candidates story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting educational narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Educational Qualifications card
    const educationalSpeakerBtn = document.getElementById('educationalSpeakerBtn');
    if (!educationalSpeakerBtn) {
        console.error('Educational speaker button not found');
        showFeedback('Educational speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const educationalCard = educationalSpeakerBtn.closest('.feature-card');
    if (!educationalCard) {
        console.error('Educational card not found');
        showFeedback('Educational card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = educationalCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Educational card');
        showFeedback('Content not found in Educational card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Educational card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Educational text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    educationalNarrationState.currentUtterance = utterance;
    educationalNarrationState.isPlaying = true;
    educationalNarrationState.hasStarted = true;

    // Update button state
    const educationalBtn = document.getElementById('educationalSpeakerBtn');
    if (educationalBtn) {
        educationalBtn.classList.add('playing');
        educationalBtn.innerHTML = '<i class="fas fa-stop"></i>';
        educationalBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Educational narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Educational narration ended successfully');
        educationalNarrationState.isPlaying = false;
        educationalNarrationState.hasStarted = false;

        // Update button state
        if (educationalBtn) {
            educationalBtn.classList.remove('playing');
            educationalBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            educationalBtn.setAttribute('aria-label', 'Listen to Educational Qualifications for Candidates story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Educational narration error:', event);
        educationalNarrationState.isPlaying = false;
        educationalNarrationState.hasStarted = false;

        // Update button state
        if (educationalBtn) {
            educationalBtn.classList.remove('playing');
            educationalBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            educationalBtn.setAttribute('aria-label', 'Listen to Educational Qualifications for Candidates story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start educational narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Educational narration started successfully');
    } catch (error) {
        console.error('Error starting educational narration:', error);
        educationalNarrationState.isPlaying = false;
        educationalNarrationState.hasStarted = false;

        // Update button state
        if (educationalBtn) {
            educationalBtn.classList.remove('playing');
            educationalBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            educationalBtn.setAttribute('aria-label', 'Listen to Educational Qualifications for Candidates story');
        }

        // Silent error handling - no popup message
        console.error('Error starting educational narration:', error);
    }
}

// Toggle campaign narration function
function toggleCampaignNarration() {
    console.log('toggleCampaignNarration called');
    console.log('Current campaign narration state:', campaignNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (campaignNarrationState.isPlaying) {
        console.log('Stopping campaign narration...');
        window.speechSynthesis.cancel();
        campaignNarrationState.isPlaying = false;
        campaignNarrationState.hasStarted = false;

        // Update button state
        const campaignSpeakerBtn = document.getElementById('campaignSpeakerBtn');
        if (campaignSpeakerBtn) {
            campaignSpeakerBtn.classList.remove('playing');
            campaignSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            campaignSpeakerBtn.setAttribute('aria-label', 'Listen to Election Campaign story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting campaign narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Election Campaign card
    const campaignSpeakerBtn = document.getElementById('campaignSpeakerBtn');
    if (!campaignSpeakerBtn) {
        console.error('Campaign speaker button not found');
        showFeedback('Campaign speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const campaignCard = campaignSpeakerBtn.closest('.feature-card');
    if (!campaignCard) {
        console.error('Campaign card not found');
        showFeedback('Campaign card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = campaignCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Campaign card');
        showFeedback('Content not found in Campaign card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Campaign card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Campaign text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    campaignNarrationState.currentUtterance = utterance;
    campaignNarrationState.isPlaying = true;
    campaignNarrationState.hasStarted = true;

    // Update button state
    const campaignBtn = document.getElementById('campaignSpeakerBtn');
    if (campaignBtn) {
        campaignBtn.classList.add('playing');
        campaignBtn.innerHTML = '<i class="fas fa-stop"></i>';
        campaignBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Campaign narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Campaign narration ended successfully');
        campaignNarrationState.isPlaying = false;
        campaignNarrationState.hasStarted = false;

        // Update button state
        if (campaignBtn) {
            campaignBtn.classList.remove('playing');
            campaignBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            campaignBtn.setAttribute('aria-label', 'Listen to Election Campaign story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Campaign narration error:', event);
        campaignNarrationState.isPlaying = false;
        campaignNarrationState.hasStarted = false;

        // Update button state
        if (campaignBtn) {
            campaignBtn.classList.remove('playing');
            campaignBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            campaignBtn.setAttribute('aria-label', 'Listen to Election Campaign story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start campaign narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Campaign narration started successfully');
    } catch (error) {
        console.error('Error starting campaign narration:', error);
        campaignNarrationState.isPlaying = false;
        campaignNarrationState.hasStarted = false;

        // Update button state
        if (campaignBtn) {
            campaignBtn.classList.remove('playing');
            campaignBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            campaignBtn.setAttribute('aria-label', 'Listen to Election Campaign story');
        }

        // Silent error handling - no popup message
        console.error('Error starting campaign narration:', error);
    }
}

// Toggle polling narration function
function togglePollingNarration() {
    console.log('togglePollingNarration called');
    console.log('Current polling narration state:', pollingNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (pollingNarrationState.isPlaying) {
        console.log('Stopping polling narration...');
        window.speechSynthesis.cancel();
        pollingNarrationState.isPlaying = false;
        pollingNarrationState.hasStarted = false;

        // Update button state
        const pollingSpeakerBtn = document.getElementById('pollingSpeakerBtn');
        if (pollingSpeakerBtn) {
            pollingSpeakerBtn.classList.remove('playing');
            pollingSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            pollingSpeakerBtn.setAttribute('aria-label', 'Listen to Polling and Counting of Votes story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting polling narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Polling and Counting of Votes card
    const pollingSpeakerBtn = document.getElementById('pollingSpeakerBtn');
    if (!pollingSpeakerBtn) {
        console.error('Polling speaker button not found');
        showFeedback('Polling speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const pollingCard = pollingSpeakerBtn.closest('.feature-card');
    if (!pollingCard) {
        console.error('Polling card not found');
        showFeedback('Polling card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = pollingCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Polling card');
        showFeedback('Content not found in Polling card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Polling card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Polling text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    pollingNarrationState.currentUtterance = utterance;
    pollingNarrationState.isPlaying = true;
    pollingNarrationState.hasStarted = true;

    // Update button state
    const pollingBtn = document.getElementById('pollingSpeakerBtn');
    if (pollingBtn) {
        pollingBtn.classList.add('playing');
        pollingBtn.innerHTML = '<i class="fas fa-stop"></i>';
        pollingBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Polling narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Polling narration ended successfully');
        pollingNarrationState.isPlaying = false;
        pollingNarrationState.hasStarted = false;

        // Update button state
        if (pollingBtn) {
            pollingBtn.classList.remove('playing');
            pollingBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            pollingBtn.setAttribute('aria-label', 'Listen to Polling and Counting of Votes story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Polling narration error:', event);
        pollingNarrationState.isPlaying = false;
        pollingNarrationState.hasStarted = false;

        // Update button state
        if (pollingBtn) {
            pollingBtn.classList.remove('playing');
            pollingBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            pollingBtn.setAttribute('aria-label', 'Listen to Polling and Counting of Votes story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start polling narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Polling narration started successfully');
    } catch (error) {
        console.error('Error starting polling narration:', error);
        pollingNarrationState.isPlaying = false;
        pollingNarrationState.hasStarted = false;

        // Update button state
        if (pollingBtn) {
            pollingBtn.classList.remove('playing');
            pollingBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            pollingBtn.setAttribute('aria-label', 'Listen to Polling and Counting of Votes story');
        }

        // Silent error handling - no popup message
        console.error('Error starting polling narration:', error);
    }
}

// Toggle expensive narration function
function toggleExpensiveNarration() {
    console.log('toggleExpensiveNarration called');
    console.log('Current expensive narration state:', expensiveNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (expensiveNarrationState.isPlaying) {
        console.log('Stopping expensive narration...');
        window.speechSynthesis.cancel();
        expensiveNarrationState.isPlaying = false;
        expensiveNarrationState.hasStarted = false;

        // Update button state
        const expensiveSpeakerBtn = document.getElementById('expensiveSpeakerBtn');
        if (expensiveSpeakerBtn) {
            expensiveSpeakerBtn.classList.remove('playing');
            expensiveSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            expensiveSpeakerBtn.setAttribute('aria-label', 'Listen to Are the elections too expensive for our country story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting expensive narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Are the elections too expensive card
    const expensiveSpeakerBtn = document.getElementById('expensiveSpeakerBtn');
    if (!expensiveSpeakerBtn) {
        console.error('Expensive speaker button not found');
        showFeedback('Expensive speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const expensiveCard = expensiveSpeakerBtn.closest('.feature-card');
    if (!expensiveCard) {
        console.error('Expensive card not found');
        showFeedback('Expensive card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = expensiveCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Expensive card');
        showFeedback('Content not found in Expensive card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Expensive card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Expensive text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    expensiveNarrationState.currentUtterance = utterance;
    expensiveNarrationState.isPlaying = true;
    expensiveNarrationState.hasStarted = true;

    // Update button state
    const expensiveBtn = document.getElementById('expensiveSpeakerBtn');
    if (expensiveBtn) {
        expensiveBtn.classList.add('playing');
        expensiveBtn.innerHTML = '<i class="fas fa-stop"></i>';
        expensiveBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Expensive narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Expensive narration ended successfully');
        expensiveNarrationState.isPlaying = false;
        expensiveNarrationState.hasStarted = false;

        // Update button state
        if (expensiveBtn) {
            expensiveBtn.classList.remove('playing');
            expensiveBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            expensiveBtn.setAttribute('aria-label', 'Listen to Are the elections too expensive for our country story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Expensive narration error:', event);
        expensiveNarrationState.isPlaying = false;
        expensiveNarrationState.hasStarted = false;

        // Update button state
        if (expensiveBtn) {
            expensiveBtn.classList.remove('playing');
            expensiveBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            expensiveBtn.setAttribute('aria-label', 'Listen to Are the elections too expensive for our country story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start expensive narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Expensive narration started successfully');
    } catch (error) {
        console.error('Error starting expensive narration:', error);
        expensiveNarrationState.isPlaying = false;
        expensiveNarrationState.hasStarted = false;

        // Update button state
        if (expensiveBtn) {
            expensiveBtn.classList.remove('playing');
            expensiveBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            expensiveBtn.setAttribute('aria-label', 'Listen to Are the elections too expensive for our country story');
        }

        // Silent error handling - no popup message
        console.error('Error starting expensive narration:', error);
    }
}

// Toggle independent narration function
function toggleIndependentNarration() {
    console.log('toggleIndependentNarration called');
    console.log('Current independent narration state:', independentNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (independentNarrationState.isPlaying) {
        console.log('Stopping independent narration...');
        window.speechSynthesis.cancel();
        independentNarrationState.isPlaying = false;
        independentNarrationState.hasStarted = false;

        // Update button state
        const independentSpeakerBtn = document.getElementById('independentSpeakerBtn');
        if (independentSpeakerBtn) {
            independentSpeakerBtn.classList.remove('playing');
            independentSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            independentSpeakerBtn.setAttribute('aria-label', 'Listen to Independent Election Commission story');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting independent narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Independent Election Commission card
    const independentSpeakerBtn = document.getElementById('independentSpeakerBtn');
    if (!independentSpeakerBtn) {
        console.error('Independent speaker button not found');
        showFeedback('Independent speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const independentCard = independentSpeakerBtn.closest('.feature-card');
    if (!independentCard) {
        console.error('Independent card not found');
        showFeedback('Independent card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = independentCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Independent card');
        showFeedback('Content not found in Independent card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Independent card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Independent text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    independentNarrationState.currentUtterance = utterance;
    independentNarrationState.isPlaying = true;
    independentNarrationState.hasStarted = true;

    // Update button state
    const independentBtn = document.getElementById('independentSpeakerBtn');
    if (independentBtn) {
        independentBtn.classList.add('playing');
        independentBtn.innerHTML = '<i class="fas fa-stop"></i>';
        independentBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Independent narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Independent narration ended successfully');
        independentNarrationState.isPlaying = false;
        independentNarrationState.hasStarted = false;

        // Update button state
        if (independentBtn) {
            independentBtn.classList.remove('playing');
            independentBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            independentBtn.setAttribute('aria-label', 'Listen to Independent Election Commission story');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Independent narration error:', event);
        independentNarrationState.isPlaying = false;
        independentNarrationState.hasStarted = false;

        // Update button state
        if (independentBtn) {
            independentBtn.classList.remove('playing');
            independentBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            independentBtn.setAttribute('aria-label', 'Listen to Independent Election Commission story');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start independent narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Independent narration started successfully');
    } catch (error) {
        console.error('Error starting independent narration:', error);
        independentNarrationState.isPlaying = false;
        independentNarrationState.hasStarted = false;

        // Update button state
        if (independentBtn) {
            independentBtn.classList.remove('playing');
            independentBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            independentBtn.setAttribute('aria-label', 'Listen to Independent Election Commission story');
        }

        // Silent error handling - no popup message
        console.error('Error starting independent narration:', error);
    }
}

// Toggle popular narration function
function togglePopularNarration() {
    console.log('togglePopularNarration called');
    console.log('Current popular narration state:', popularNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (popularNarrationState.isPlaying) {
        console.log('Stopping popular narration...');
        window.speechSynthesis.cancel();
        popularNarrationState.isPlaying = false;
        popularNarrationState.hasStarted = false;

        // Update button state
        const popularSpeakerBtn = document.getElementById('popularSpeakerBtn');
        if (popularSpeakerBtn) {
            popularSpeakerBtn.classList.remove('playing');
            popularSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            popularSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting popular narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Popular Participation card
    const popularSpeakerBtn = document.getElementById('popularSpeakerBtn');
    if (!popularSpeakerBtn) {
        console.error('Popular speaker button not found');
        showFeedback('Popular speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const popularCard = popularSpeakerBtn.closest('.feature-card');
    if (!popularCard) {
        console.error('Popular card not found');
        showFeedback('Popular card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = popularCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Popular card');
        showFeedback('Content not found in Popular card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Popular card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Popular text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    popularNarrationState.currentUtterance = utterance;
    popularNarrationState.isPlaying = true;
    popularNarrationState.hasStarted = true;

    // Update button state
    const popularBtn = document.getElementById('popularSpeakerBtn');
    if (popularBtn) {
        popularBtn.classList.add('playing');
        popularBtn.innerHTML = '<i class="fas fa-stop"></i>';
        popularBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Popular narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Popular narration ended successfully');
        popularNarrationState.isPlaying = false;
        popularNarrationState.hasStarted = false;

        // Update button state
        if (popularBtn) {
            popularBtn.classList.remove('playing');
            popularBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            popularBtn.setAttribute('aria-label', 'Click to listen to the content');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Popular narration error:', event);
        popularNarrationState.isPlaying = false;
        popularNarrationState.hasStarted = false;

        // Update button state
        if (popularBtn) {
            popularBtn.classList.remove('playing');
            popularBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            popularBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start popular narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Popular narration started successfully');
    } catch (error) {
        console.error('Error starting popular narration:', error);
        popularNarrationState.isPlaying = false;
        popularNarrationState.hasStarted = false;

        // Update button state
        if (popularBtn) {
            popularBtn.classList.remove('playing');
            popularBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            popularBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Silent error handling - no popup message
        console.error('Error starting popular narration:', error);
    }
}

// Toggle acceptance narration function
function toggleAcceptanceNarration() {
    console.log('toggleAcceptanceNarration called');
    console.log('Current acceptance narration state:', acceptanceNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (acceptanceNarrationState.isPlaying) {
        console.log('Stopping acceptance narration...');
        window.speechSynthesis.cancel();
        acceptanceNarrationState.isPlaying = false;
        acceptanceNarrationState.hasStarted = false;

        // Update button state
        const acceptanceSpeakerBtn = document.getElementById('acceptanceSpeakerBtn');
        if (acceptanceSpeakerBtn) {
            acceptanceSpeakerBtn.classList.remove('playing');
            acceptanceSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            acceptanceSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting acceptance narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Acceptance card
    const acceptanceSpeakerBtn = document.getElementById('acceptanceSpeakerBtn');
    if (!acceptanceSpeakerBtn) {
        console.error('Acceptance speaker button not found');
        showFeedback('Acceptance speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const acceptanceCard = acceptanceSpeakerBtn.closest('.feature-card');
    if (!acceptanceCard) {
        console.error('Acceptance card not found');
        showFeedback('Acceptance card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = acceptanceCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Acceptance card');
        showFeedback('Content not found in Acceptance card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Acceptance card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Acceptance text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    acceptanceNarrationState.currentUtterance = utterance;
    acceptanceNarrationState.isPlaying = true;
    acceptanceNarrationState.hasStarted = true;

    // Update button state
    const acceptanceBtn = document.getElementById('acceptanceSpeakerBtn');
    if (acceptanceBtn) {
        acceptanceBtn.classList.add('playing');
        acceptanceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        acceptanceBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Acceptance narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Acceptance narration ended successfully');
        acceptanceNarrationState.isPlaying = false;
        acceptanceNarrationState.hasStarted = false;

        // Update button state
        if (acceptanceBtn) {
            acceptanceBtn.classList.remove('playing');
            acceptanceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            acceptanceBtn.setAttribute('aria-label', 'Click to listen to the content');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Acceptance narration error:', event);
        acceptanceNarrationState.isPlaying = false;
        acceptanceNarrationState.hasStarted = false;

        // Update button state
        if (acceptanceBtn) {
            acceptanceBtn.classList.remove('playing');
            acceptanceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            acceptanceBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start acceptance narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Acceptance narration started successfully');
    } catch (error) {
        console.error('Error starting acceptance narration:', error);
        acceptanceNarrationState.isPlaying = false;
        acceptanceNarrationState.hasStarted = false;

        // Update button state
        if (acceptanceBtn) {
            acceptanceBtn.classList.remove('playing');
            acceptanceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            acceptanceBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Silent error handling - no popup message
        console.error('Error starting acceptance narration:', error);
    }
}

// Toggle challenges narration function
function toggleChallengesNarration() {
    console.log('toggleChallengesNarration called');
    console.log('Current challenges narration state:', challengesNarrationState);

    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // If currently playing, stop it
    if (challengesNarrationState.isPlaying) {
        console.log('Stopping challenges narration...');
        window.speechSynthesis.cancel();
        challengesNarrationState.isPlaying = false;
        challengesNarrationState.hasStarted = false;

        // Update button state
        const challengesSpeakerBtn = document.getElementById('challengesSpeakerBtn');
        if (challengesSpeakerBtn) {
            challengesSpeakerBtn.classList.remove('playing');
            challengesSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            challengesSpeakerBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        return;
    }

    // If not playing, start narration
    console.log('Starting challenges narration...');

    // Stop any existing narration first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Get the full content from the Challenges card
    const challengesSpeakerBtn = document.getElementById('challengesSpeakerBtn');
    if (!challengesSpeakerBtn) {
        console.error('Challenges speaker button not found');
        showFeedback('Challenges speaker button not found.', 'error');
        return;
    }

    // Get the parent card element
    const challengesCard = challengesSpeakerBtn.closest('.feature-card');
    if (!challengesCard) {
        console.error('Challenges card not found');
        showFeedback('Challenges card not found.', 'error');
        return;
    }

    // Get the feature-desc content
    const featureDesc = challengesCard.querySelector('.feature-desc');
    if (!featureDesc) {
        console.error('Feature description not found in Challenges card');
        showFeedback('Content not found in Challenges card.', 'error');
        return;
    }

    // Get all text content from the feature description
    const textContent = featureDesc.textContent.trim();
    if (!textContent) {
        console.error('No text content found in Challenges card');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Challenges text content to narrate:', textContent.substring(0, 100) + '...');

    // Create utterance for the entire content
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track the utterance
    challengesNarrationState.currentUtterance = utterance;
    challengesNarrationState.isPlaying = true;
    challengesNarrationState.hasStarted = true;

    // Update button state
    const challengesBtn = document.getElementById('challengesSpeakerBtn');
    if (challengesBtn) {
        challengesBtn.classList.add('playing');
        challengesBtn.innerHTML = '<i class="fas fa-stop"></i>';
        challengesBtn.setAttribute('aria-label', 'Stop narration');
    }

    // When narration starts
    utterance.onstart = () => {
        console.log('Challenges narration started successfully');
    };

    // When narration ends
    utterance.onend = () => {
        console.log('Challenges narration ended successfully');
        challengesNarrationState.isPlaying = false;
        challengesNarrationState.hasStarted = false;

        // Update button state
        if (challengesBtn) {
            challengesBtn.classList.remove('playing');
            challengesBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            challengesBtn.setAttribute('aria-label', 'Click to listen to the content');
        }
    };

    // Error handling
    utterance.onerror = (event) => {
        console.error('Challenges narration error:', event);
        challengesNarrationState.isPlaying = false;
        challengesNarrationState.hasStarted = false;

        // Update button state
        if (challengesBtn) {
            challengesBtn.classList.remove('playing');
            challengesBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            challengesBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Silent error handling - no popup message
            console.error('Audio permission error:', event.error);
        }
    };

    // Start speaking
    try {
        console.log('Attempting to start challenges narration...');
        window.speechSynthesis.speak(utterance);
        console.log('Challenges narration started successfully');
    } catch (error) {
        console.error('Error starting challenges narration:', error);
        challengesNarrationState.isPlaying = false;
        challengesNarrationState.hasStarted = false;

        // Update button state
        if (challengesBtn) {
            challengesBtn.classList.remove('playing');
            challengesBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            challengesBtn.setAttribute('aria-label', 'Click to listen to the content');
        }

        // Silent error handling - no popup message
        console.error('Error starting challenges narration:', error);
    }
}

// Manual function to enable audio if autoplay is blocked
function enableAudio() {
    console.log('Manual audio enable requested...');
    userInteracted = true;

    // Ensure audio is enabled - synchronize all state variables
    isAudioEnabled = true;
    globalNarrationState.isEnabled = true;
    globalNarrationState.disabledByUser = false;

    // Update audio button state
    const audioBtn = document.getElementById('audioBtn');
    if (audioBtn) {
        const icon = audioBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-volume-up';
        audioBtn.setAttribute('aria-label', 'Mute audio narration');
        audioBtn.classList.remove('muted');
    }

    // Initialize audio system
    const success = initializeAudio();
    if (success) {
        showFeedback('Audio system enabled! Try switching modules or clicking read aloud buttons to hear narration.', 'success');

        // Try to start current module narration
        setTimeout(() => {
            const activeModule = document.querySelector('.module.active');
            if (activeModule) {
                startModuleNarration(activeModule.id);
            }
        }, 500);
    } else {
        showFeedback('Failed to enable audio. Please check your browser settings.', 'error');
    }

    // Update enable audio button visibility
    updateEnableAudioButton();
}

// Function to help users enable speech synthesis permissions
function showPermissionHelp() {
    const helpMessage = `
To enable audio narration:
1. Click the lock/address bar icon in your browser
2. Allow microphone permissions for this site
3. Refresh the page and try again
4. Or click anywhere on the page first, then try the audio button

Some browsers require user interaction before allowing speech synthesis.
    `;

    showFeedback(helpMessage, 'info');
}


// Function to speak individual card content
function speakCardContent(button, text) {
    console.log('speakCardContent called with text:', text.substring(0, 50) + '...');
    console.log('isAudioEnabled:', isAudioEnabled);
    console.log('globalNarrationState.isEnabled:', globalNarrationState.isEnabled);
    console.log('globalNarrationState.disabledByUser:', globalNarrationState.disabledByUser);

    // Check if audio is globally enabled - use single source of truth
    if (!isAudioEnabled) {
        console.log('Audio is disabled, showing feedback');
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        console.log('Speech synthesis not available');
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }

    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading article...';
    button.parentNode.insertBefore(readingIndicator, button.nextSibling);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // When done reading
    utterance.onend = function() {
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };

    // Error handling
    utterance.onerror = function(event) {
        console.error('Speech synthesis error:', event);
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };

    // Start speaking
    window.speechSynthesis.speak(utterance);

    // Add stop button to reading indicator
    const stopButton = document.createElement('button');
    stopButton.className = 'stop-narration-btn';
    stopButton.textContent = 'Stop';
    stopButton.onclick = () => {
        window.speechSynthesis.cancel();
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    readingIndicator.appendChild(stopButton);
}

// Function to help users enable speech synthesis permissions
function showPermissionHelp() {
    const helpMessage = `
To enable audio narration:
1. Click the lock/address bar icon in your browser
2. Allow microphone permissions for this site
3. Refresh the page and try again
4. Or click anywhere on the page first, then try the audio button

Some browsers require user interaction before allowing speech synthesis.
    `;

    showFeedback(helpMessage, 'info');
}

// Function to update the enable audio button visibility
function updateEnableAudioButton() {
    const enableAudioBtn = document.getElementById('enableAudioBtn');
    const forceEnableAudioBtn = document.getElementById('forceEnableAudioBtn');
    const debugAudioBtn = document.getElementById('debugAudioBtn');

    if (enableAudioBtn) {
        if (!isAudioEnabled) {
            enableAudioBtn.style.display = 'inline-block';
        } else {
            enableAudioBtn.style.display = 'none';
        }
    }

    if (forceEnableAudioBtn) {
        if (!isAudioEnabled) {
            forceEnableAudioBtn.style.display = 'inline-block';
        } else {
            forceEnableAudioBtn.style.display = 'none';
        }
    }

    if (debugAudioBtn) {
        if (!isAudioEnabled) {
            debugAudioBtn.style.display = 'inline-block';
        } else {
            debugAudioBtn.style.display = 'none';
        }
    }
}

// Function to force enable audio and ensure all states are synchronized
function forceEnableAudio() {
    console.log('Force enabling audio...');

    // Synchronize all audio state variables
    isAudioEnabled = true;
    globalNarrationState.isEnabled = true;
    globalNarrationState.disabledByUser = false;
    userInteracted = true;
    audioInitialized = true;

    // Update UI elements
    const audioBtn = document.getElementById('audioBtn');
    if (audioBtn) {
        const icon = audioBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-volume-up';
        }
        audioBtn.setAttribute('aria-label', 'Mute audio narration');
        audioBtn.classList.remove('muted');
    }

    // Update enable audio button
    updateEnableAudioButton();

    console.log('Audio force enabled successfully');
    showFeedback('Audio narration has been force enabled. Try the read aloud buttons now.', 'success');
}

// Update progress tracker
// function updateProgress(moduleId, submissionType = null) {
//     // Calculate progress based on current module index
//     console.log('Updating progress for module:', moduleId);
//     const currentIndex = moduleOrder.indexOf(moduleId);
//     if (currentIndex === -1) return; // Invalid moduleId

//     // Intro is always worth 15%, remaining 7 modules share 85%
//     const progressPercentage = 15 + Math.round((currentIndex / (moduleOrder.length - 1)) * 85);
//     console.log('Progress updated to:', progressPercentage);
//     // Update progress bar
//     document.getElementById('progressBar').style.width = `${progressPercentage}%`;
//     document.getElementById('progressBar').textContent = `${progressPercentage}%`;

//     // Update accessibility attribute
//     const progressBarElement = document.querySelector('.progress-bar');
//     if (progressBarElement) {
//         progressBarElement.setAttribute('aria-valuenow', progressPercentage);
//     }

//     // Count total completed modules for other purposes
//     const completedModules = Object.values(moduleProgress).filter(Boolean).length;
//     const modulesElement = document.getElementById('modulesComplete');
//     if (modulesElement) {
//         modulesElement.textContent = completedModules;
//     }

//     // Check if specific submission types should trigger achievements
//     if (submissionType) {
//         switch (submissionType) {
//             case 'match':
//                 showAchievement('Institution Expert', 'You matched all terms correctly!');
//                 break;
//             case 'quiz':
//                 showAchievement('Quiz Master', 'You completed the quiz successfully!');
//                 break;
//         }
//     }

//     // Check if all modules are complete
//     if (completedModules === 8) { // All 8 modules including intro
//         showAchievement('Completion Hero', 'You completed all modules of the lesson!');
//         clearInterval(timer); // Stop the timer
//     }
// }

// Update score
function updateScore(points) {
    currentScore += points;
    const scoreElement = document.getElementById('totalScore');
    if (scoreElement) {
        scoreElement.textContent = currentScore;
    }

    // Achievement thresholds - only trigger if not from achievement popup itself
    if (points !== 10) { // 10 points come from achievement popups
        if (currentScore >= 50 && !document.querySelector('.score-50')) {
            showAchievement('Score 50', 'You reached 50 points!');
        }
        if (currentScore >= 100 && !document.querySelector('.score-100')) {
            showAchievement('Score 100', 'You reached 100 points!');
        }
    }
}

// Update timer
function updateTimer() {
    if (!startTime) return;

    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    const timeElement = document.getElementById('timeSpent');
    if (timeElement) {
        timeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

// Close achievement popup manually
function closeAchievement() {
    console.log('Manually closing achievement popup');
    const popup = document.getElementById('achievementPopup');
    if (popup) {
        popup.classList.remove('show');
    }

    // Clear any existing timeout
    if (window.achievementTimeout) {
        clearTimeout(window.achievementTimeout);
        window.achievementTimeout = null;
    }
}

// Show achievement popup
function showAchievement(title, description) {
    console.log('Showing achievement:', title);

    const popup = document.getElementById('achievementPopup');
    if (!popup) {
        console.error('Achievement popup element not found');
        return;
    }

    // Don't show if already visible
    if (popup.classList.contains('show')) {
        console.log('Achievement popup already visible, skipping');
        return;
    }

    const titleElement = document.getElementById('achievementTitle');
    const descElement = document.getElementById('achievementDesc');

    if (titleElement) {
        titleElement.textContent = '🏆 ' + title;
    }
    if (descElement) {
        descElement.textContent = description;
    }

    popup.classList.add('show');

    // Add to score
    updateScore(10);

    // Clear any existing timeout to prevent multiple timers
    if (window.achievementTimeout) {
        clearTimeout(window.achievementTimeout);
    }

    // Hide popup after 4 seconds
    window.achievementTimeout = setTimeout(() => {
        console.log('Auto-closing achievement popup');
        if (popup) {
            popup.classList.remove('show');
        }
        window.achievementTimeout = null;
    }, 4000);
}


// Show feedback message
function showFeedback(message, type = 'success') {
    // Create a temporary feedback element if it doesn't exist
    let feedbackElement = document.getElementById('tempFeedback');

    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'tempFeedback';
        feedbackElement.className = 'temp-feedback feedback-message';
        document.body.appendChild(feedbackElement);
    }

    feedbackElement.textContent = message;

    // Reset classes and add the appropriate type and show class
    feedbackElement.className = 'temp-feedback feedback-message';
    feedbackElement.classList.add(type);
    feedbackElement.classList.add('show');

    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 3000);
}

// Toggle audio narration globally (mute/unmute)
function toggleAudio() {
    console.log('toggleAudio called, current state:', isAudioEnabled);

    isAudioEnabled = !isAudioEnabled;
    globalNarrationState.isEnabled = isAudioEnabled;
    globalNarrationState.disabledByUser = !isAudioEnabled;

    console.log('New audio state:', isAudioEnabled);
    console.log('New globalNarrationState.isEnabled:', globalNarrationState.isEnabled);
    console.log('New globalNarrationState.disabledByUser:', globalNarrationState.disabledByUser);

    // Update enable audio button visibility
    updateEnableAudioButton();

    const audioBtn = document.getElementById('audioBtn');
    const icon = audioBtn.querySelector('i');

    if (isAudioEnabled) {
        icon.className = 'fas fa-volume-up';
        audioBtn.setAttribute('aria-label', 'Mute audio narration');
        audioBtn.classList.remove('muted');

        // Enable user interaction for speech synthesis
        userInteracted = true;

        // Try to initialize audio if not already done
        if (!audioInitialized) {
            initializeAudio();
        }

        // Show feedback
        showFeedback('Audio narration enabled. Try switching modules to hear narration.', 'success');
    } else {
        icon.className = 'fas fa-volume-mute';
        audioBtn.setAttribute('aria-label', 'Unmute audio narration');
        audioBtn.classList.add('muted');

        // Stop any ongoing speech
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            currentSpeechState = 'stopped';
            updatePlayPauseButton();

            // No reading indicator to clear for intro narration

            // Clear any paragraph highlights
            document.querySelectorAll('.paragraph-highlight').forEach(p => {
                p.classList.remove('paragraph-highlight');
            });
        }

        showFeedback('Audio narration disabled.', 'info');
    }

    // Update enable audio button visibility
    updateEnableAudioButton();

    // Also update the audio button state to reflect the change
    const audioBtnElement = document.getElementById('audioBtn');
    if (audioBtnElement) {
        const icon = audioBtnElement.querySelector('i');
        if (icon) {
            icon.className = isAudioEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        }
        audioBtnElement.setAttribute('aria-label', isAudioEnabled ? 'Mute audio narration' : 'Unmute audio narration');
        audioBtnElement.classList.toggle('muted', !isAudioEnabled);
    }
}

// Play/pause current narration
function togglePlayPause() {
    const playPauseBtn = document.getElementById('playPause');
    const icon = playPauseBtn.querySelector('i');

    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    console.log('Current speech state:', currentSpeechState);

    if (currentSpeechState === 'speaking') {
        // Currently speaking, pause
        console.log('Pausing speech...');
        window.speechSynthesis.pause();
        currentSpeechState = 'paused';
        updatePlayPauseButton();

    } else if (currentSpeechState === 'paused') {
        // Currently paused, resume
        console.log('Resuming speech...');
        window.speechSynthesis.resume();
        currentSpeechState = 'speaking';
        updatePlayPauseButton();

    } else {
        // Not speaking, start narration for current module
        console.log('Starting new narration...');
        const activeModule = document.querySelector('.module.active');
        if (activeModule) {
            startModuleNarration(activeModule.id);
            // Button will be updated by the utterance.onstart event
        } else {
            console.log('No active module found');
        }
    }
}

// Read text content aloud
function readText(elementId) {
    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }
    
    const contentElement = document.getElementById(elementId);
    if (!contentElement) {
        console.error(`Element with ID ${elementId} not found`);
        return;
    }
    
    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        
        // Remove any existing reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.parentNode.removeChild(indicator);
        });
        
        // Remove any paragraph highlights
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
        
        return;
    }
    
    // Get all paragraphs in the content element
    const paragraphs = Array.from(contentElement.querySelectorAll('p'))
        .filter(p => p.textContent.trim().length > 0);
    
    if (paragraphs.length === 0) {
        // If no paragraphs found, read the entire content
        readWholeContent(contentElement);
    } else {
        // Read paragraph by paragraph with highlighting
        readParagraphsSequentially(paragraphs, contentElement);
    }
}

// Read whole content without paragraph highlighting
function readWholeContent(contentElement) {
    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading article...';
    contentElement.appendChild(readingIndicator);
    
    // Get text to narrate
    const textToNarrate = contentElement.innerText;
    
    const utterance = new SpeechSynthesisUtterance(textToNarrate);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    // When done reading
    utterance.onend = function() {
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    
    // Error handling
    utterance.onerror = function(event) {
        console.error('Speech synthesis error:', event);
        console.error('Error details:', event.error, event.message);

        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio permission required. Please click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            showFeedback('Speech synthesis error occurred. Please try again or check your browser settings.', 'error');
        }
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    
    // Add stop button to reading indicator
    const stopButton = document.createElement('button');
    stopButton.className = 'stop-narration-btn';
    stopButton.textContent = 'Stop';
    stopButton.onclick = () => {
        window.speechSynthesis.cancel();
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    readingIndicator.appendChild(stopButton);
}

// Read paragraphs sequentially with visual highlighting
function readParagraphsSequentially(paragraphs, containerElement) {
    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading article...';
    containerElement.appendChild(readingIndicator);
    
    // Add stop button to reading indicator
    const stopButton = document.createElement('button');
    stopButton.className = 'stop-narration-btn';
    stopButton.textContent = 'Stop';
    stopButton.onclick = () => {
        window.speechSynthesis.cancel();
        
        // Remove reading indicator
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
        
        // Remove paragraph highlights
        paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
        
        // Clear any timeouts
        if (window.paragraphTimeouts) {
            window.paragraphTimeouts.forEach(timeout => clearTimeout(timeout));
            window.paragraphTimeouts = [];
        }
    };
    readingIndicator.appendChild(stopButton);
    
    // Initialize paragraph timeouts array
    if (!window.paragraphTimeouts) {
        window.paragraphTimeouts = [];
    } else {
        // Clear any existing timeouts
        window.paragraphTimeouts.forEach(timeout => clearTimeout(timeout));
        window.paragraphTimeouts = [];
    }
    
    let currentIndex = 0;
    
    // Function to read the next paragraph
    const readNextParagraph = () => {
        if (currentIndex < paragraphs.length) {
            const paragraph = paragraphs[currentIndex];
            
            // Remove highlight from previous paragraph
            if (currentIndex > 0) {
                paragraphs[currentIndex - 1].classList.remove('paragraph-highlight');
            }
            
            // Add highlight to current paragraph
            paragraph.classList.add('paragraph-highlight');
            
            // Scroll paragraph into view
            paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Get clean text content
            const text = paragraph.textContent.trim();
            
            // Create utterance for this paragraph
            const speechUtterance = new SpeechSynthesisUtterance(text);
            speechUtterance.rate = 0.9;
            speechUtterance.pitch = 1.0;
            
            // When paragraph is done, move to next one
            speechUtterance.onend = () => {
                currentIndex++;
                if (currentIndex < paragraphs.length) {
                    readNextParagraph();
                } else {
                    // All paragraphs complete
                    // Remove reading indicator
                    if (readingIndicator && readingIndicator.parentNode) {
                        readingIndicator.parentNode.removeChild(readingIndicator);
                    }
                    
                    // Remove paragraph highlights
                    paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
                }
            };
            
            // Error handling
            speechUtterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                // Remove reading indicator
                if (readingIndicator && readingIndicator.parentNode) {
                    readingIndicator.parentNode.removeChild(readingIndicator);
                }
                
                // Remove paragraph highlights
                paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
            };
            
            // Start speaking this paragraph
            window.speechSynthesis.speak(speechUtterance);
            
            // Estimate duration for fallback timeout (200ms per word)
            const wordCount = text.split(/\s+/).length;
            const estimatedDuration = wordCount * 200;
            
            // Fallback to move to next paragraph if speech synthesis fails silently
            const fallbackTimeout = setTimeout(() => {
                if (window.speechSynthesis.speaking) {
                    // Still speaking, do nothing
                    return;
                }
                
                // If not speaking anymore but we didn't get the onend event
                currentIndex++;
                if (currentIndex < paragraphs.length) {
                    readNextParagraph();
                } else {
                    // All paragraphs complete
                    // Remove reading indicator
                    if (readingIndicator && readingIndicator.parentNode) {
                        readingIndicator.parentNode.removeChild(readingIndicator);
                    }
                    
                    // Remove paragraph highlights
                    paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
                }
            }, estimatedDuration + 1000); // Add 1 second buffer
            
            window.paragraphTimeouts.push(fallbackTimeout);
        }
    };
    
    // Start reading the first paragraph
    readNextParagraph();
}

// Read specific quote aloud
function readQuote(quoteElement) {
    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }
    
    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    const quoteText = quoteElement.querySelector('.quote-text').innerText;
    const quoteAuthorElement = quoteElement.querySelector('.quote-author');
    const quoteAuthor = quoteAuthorElement ? quoteAuthorElement.innerText : '';
    const fullText = quoteAuthor ? `${quoteText} - ${quoteAuthor}` : quoteText;
    
    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading quote...';
    quoteElement.appendChild(readingIndicator);
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    // When done reading
    utterance.onend = function() {
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    
    // Error handling
    utterance.onerror = function(event) {
        console.error('Speech synthesis error:', event);
        console.error('Error details:', event.error, event.message);

        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }

        // Provide specific feedback based on error type
        if (event.error === 'not-allowed') {
            showFeedback('Audio permission required. Please click the play button or anywhere on the page to enable audio.', 'info');
        } else if (event.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (event.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            showFeedback('Speech synthesis error occurred. Please try again or check your browser settings.', 'error');
        }
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    
    // Add stop button to reading indicator
    const stopButton = document.createElement('button');
    stopButton.className = 'stop-narration-btn';
    stopButton.textContent = 'Stop';
    stopButton.onclick = () => {
        window.speechSynthesis.cancel();
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    readingIndicator.appendChild(stopButton);
}

// Read the preamble aloud
function readPreamble(preambleId) {
    // Check if audio is globally enabled
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        return;
    }

    if (!window.speechSynthesis) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        return;
    }
    
    const preambleElement = document.getElementById(preambleId);
    if (!preambleElement) {
        console.error(`Preamble element with ID ${preambleId} not found`);
        return;
    }
    
    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    // Get clean text without HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = preambleElement.innerHTML;
    const preambleText = tempDiv.textContent || tempDiv.innerText || '';
    
    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading preamble...';
    preambleElement.parentNode.appendChild(readingIndicator);
    
    const utterance = new SpeechSynthesisUtterance(preambleText);
    utterance.rate = 0.8; // Slower for formal text
    utterance.pitch = 1.0;
    
    // When done reading
    utterance.onend = function() {
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    
    // Error handling
    utterance.onerror = function(event) {
        console.error('Speech synthesis error:', event);
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    
    // Add stop button to reading indicator
    const stopButton = document.createElement('button');
    stopButton.className = 'stop-narration-btn';
    stopButton.textContent = 'Stop';
    stopButton.onclick = () => {
        window.speechSynthesis.cancel();
        if (readingIndicator && readingIndicator.parentNode) {
            readingIndicator.parentNode.removeChild(readingIndicator);
        }
    };
    readingIndicator.appendChild(stopButton);
}

// Generic speak function for simple narration
function speak(text) {
    console.log('=== SPEAK FUNCTION CALLED ===');
    console.log('Text to speak:', text);
    console.log('isAudioEnabled:', isAudioEnabled);
    console.log('speechSynthesis available:', !!window.speechSynthesis);
    console.log('audioInitialized:', audioInitialized);

    if (!isAudioEnabled || !window.speechSynthesis) {
        console.log('Speech synthesis not available or disabled');
        return false;
    }

    console.log('Speaking:', text.substring(0, 50) + '...');

    // Enable user interaction for speech synthesis
    userInteracted = true;

    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
        console.log('Cancelling existing speech...');
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track speech state and update button accordingly
    utterance.onstart = () => {
        console.log('Speech started successfully');
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    utterance.onend = () => {
        console.log('Speech ended successfully');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utterance.onpause = () => {
        console.log('Speech paused');
        currentSpeechState = 'paused';
        updatePlayPauseButton();
    };

    utterance.onresume = () => {
        console.log('Speech resumed');
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    utterance.onerror = (e) => {
        console.error('Speech error:', e);
        currentSpeechState = 'stopped';
        updatePlayPauseButton();

        // Provide specific feedback based on error type
        if (e.error === 'not-allowed') {
            // Only show permission message if user actually tried to use audio (not on auto-start)
            if (currentSpeechState === 'speaking') {
                showFeedback('Audio needs permission. Click the play button or anywhere on the page to enable audio.', 'info');
            }
            // If auto-start failed, just log to console - don't show popup
        } else if (e.error === 'network') {
            showFeedback('Network error occurred during speech synthesis. Please check your internet connection.', 'error');
        } else if (e.error === 'audio-busy') {
            showFeedback('Audio is busy. Please wait for current audio to finish or stop it manually.', 'error');
        } else {
            // Don't show popup message - just log to console
        }
    };

    try {
        console.log('Attempting to speak...');
        window.speechSynthesis.speak(utterance);
        currentSpeechState = 'speaking';
        console.log('Speech started successfully');
        return true;
    } catch (error) {
        console.error('Error speaking:', error);
        currentSpeechState = 'stopped';
        // Silent error handling - no popup message
        return false;
    }
}

// Update play/pause button based on current speech state
function updatePlayPauseButton() {
    const playPauseBtn = document.getElementById('playPause');
    if (!playPauseBtn) return;

    const icon = playPauseBtn.querySelector('i');
    if (!icon) return;

    switch (currentSpeechState) {
        case 'speaking':
            icon.className = 'fas fa-pause';
            playPauseBtn.setAttribute('aria-label', 'Pause narration');
            break;
        case 'paused':
            icon.className = 'fas fa-play';
            playPauseBtn.setAttribute('aria-label', 'Resume narration');
            break;
        case 'stopped':
            icon.className = 'fas fa-play';
            playPauseBtn.setAttribute('aria-label', 'Start narration');
            break;
    }
}

// Toggle expandable card
function toggleCard(cardElement) {
    cardElement.classList.toggle('expanded');
}

// Toggle description visibility
function toggleDesc(button) {
    const card = button.parentNode.parentNode; // Since button is in a center div inside card
    const desc = card.querySelector('.feature-desc');
    const haryanaSpeakerContainer = card.querySelector('.haryana-speaker-container');
    const whyelectionsSpeakerContainer = card.querySelector('.whyelections-speaker-container');
    const democraticSpeakerContainer = card.querySelector('.democratic-speaker-container');
    const competitionSpeakerContainer = card.querySelector('.competition-speaker-container');
    const electoralSpeakerContainer = card.querySelector('.electoral-speaker-container');
    const reservedSpeakerContainer = card.querySelector('.reserved-speaker-container');
    const votersSpeakerContainer = card.querySelector('.voters-speaker-container');
    const nominationSpeakerContainer = card.querySelector('.nomination-speaker-container');
    const educationalSpeakerContainer = card.querySelector('.educational-speaker-container');
    const campaignSpeakerContainer = card.querySelector('.campaign-speaker-container');
    const pollingSpeakerContainer = card.querySelector('.polling-speaker-container');
    const expensiveSpeakerContainer = card.querySelector('.expensive-speaker-container');
    const independentSpeakerContainer = card.querySelector('.independent-speaker-container');
    const popularSpeakerContainer = card.querySelector('.popular-speaker-container');
    const acceptanceSpeakerContainer = card.querySelector('.acceptance-speaker-container');
    const challengesSpeakerContainer = card.querySelector('.challenges-speaker-container');

    if (desc.style.display === 'none' || desc.style.display === '') {
        desc.style.display = 'block';
        button.textContent = 'See Less';

        // Show the narration buttons when card is expanded
        if (haryanaSpeakerContainer) {
            haryanaSpeakerContainer.style.display = 'flex';
        }
        if (whyelectionsSpeakerContainer) {
            whyelectionsSpeakerContainer.style.display = 'flex';
        }
        if (democraticSpeakerContainer) {
            democraticSpeakerContainer.style.display = 'flex';
        }
        if (competitionSpeakerContainer) {
            competitionSpeakerContainer.style.display = 'flex';
        }
        if (electoralSpeakerContainer) {
            electoralSpeakerContainer.style.display = 'flex';
        }
        if (reservedSpeakerContainer) {
            reservedSpeakerContainer.style.display = 'flex';
        }
        if (votersSpeakerContainer) {
            votersSpeakerContainer.style.display = 'flex';
        }
        if (nominationSpeakerContainer) {
            nominationSpeakerContainer.style.display = 'flex';
        }
        if (educationalSpeakerContainer) {
            educationalSpeakerContainer.style.display = 'flex';
        }
        if (campaignSpeakerContainer) {
            campaignSpeakerContainer.style.display = 'flex';
        }
        if (pollingSpeakerContainer) {
            pollingSpeakerContainer.style.display = 'flex';
        }
        if (expensiveSpeakerContainer) {
            expensiveSpeakerContainer.style.display = 'flex';
        }
        if (independentSpeakerContainer) {
            independentSpeakerContainer.style.display = 'flex';
        }
        if (popularSpeakerContainer) {
            popularSpeakerContainer.style.display = 'flex';
        }
        if (acceptanceSpeakerContainer) {
            acceptanceSpeakerContainer.style.display = 'flex';
        }
        if (challengesSpeakerContainer) {
            challengesSpeakerContainer.style.display = 'flex';
        }
    } else {
        desc.style.display = 'none';
        button.textContent = 'See More';

        // Hide the narration buttons when card is collapsed
        if (haryanaSpeakerContainer) {
            haryanaSpeakerContainer.style.display = 'none';
        }
        if (whyelectionsSpeakerContainer) {
            whyelectionsSpeakerContainer.style.display = 'none';
        }
        if (democraticSpeakerContainer) {
            democraticSpeakerContainer.style.display = 'none';
        }
        if (competitionSpeakerContainer) {
            competitionSpeakerContainer.style.display = 'none';
        }
        if (electoralSpeakerContainer) {
            electoralSpeakerContainer.style.display = 'none';
        }
        if (reservedSpeakerContainer) {
            reservedSpeakerContainer.style.display = 'none';
        }
        if (votersSpeakerContainer) {
            votersSpeakerContainer.style.display = 'none';
        }
        if (nominationSpeakerContainer) {
            nominationSpeakerContainer.style.display = 'none';
        }
        if (educationalSpeakerContainer) {
            educationalSpeakerContainer.style.display = 'none';
        }
        if (campaignSpeakerContainer) {
            campaignSpeakerContainer.style.display = 'none';
        }
        if (pollingSpeakerContainer) {
            pollingSpeakerContainer.style.display = 'none';
        }
        if (expensiveSpeakerContainer) {
            expensiveSpeakerContainer.style.display = 'none';
        }
        if (independentSpeakerContainer) {
            independentSpeakerContainer.style.display = 'none';
        }
        if (popularSpeakerContainer) {
            popularSpeakerContainer.style.display = 'none';
        }
        if (acceptanceSpeakerContainer) {
            acceptanceSpeakerContainer.style.display = 'none';
        }
        if (challengesSpeakerContainer) {
            challengesSpeakerContainer.style.display = 'none';
        }
    }
}

// Quiz functionality - One question at a time
// Note: currentQuestionIndex is declared in main.js
const totalQuestions = 4;

// Function to create quiz questions if they don't exist
function createQuizQuestions() {
    console.log('createQuizQuestions called');

    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) {
        console.error('Quiz container not found');
        return;
    }

    // Check if questions already exist
    const existingQuestions = document.querySelectorAll('.quiz-question');
    if (existingQuestions.length > 0) {
        console.log('Quiz questions already exist');
        return;
    }

    // Create quiz questions from quizQuestions data
    if (typeof quizQuestions !== 'undefined' && quizQuestions.length > 0) {
        quizQuestions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.id = `question-${index + 1}`;

            let questionHTML = `
                <h3>Question ${index + 1}: ${question.question}</h3>
                <div class="quiz-options">
            `;

            if (index === 4) { // Matching question
                questionHTML += `
                    <div class="matching-container">
                        <div class="matching-column">
                            <h4>Situation</h4>
                            <div class="matching-items">
                                <div class="matching-item">
                                    <span>a)</span>
                                    <select class="matching-select" data-question="a">
                                        <option value="">Select Ministry</option>
                                        <option value="i">Ministry of Defence</option>
                                        <option value="ii">Ministry of Agriculture, Food and Public Distribution</option>
                                        <option value="iii">Ministry of Health</option>
                                        <option value="iv">Ministry of Commerce and Industry</option>
                                        <option value="v">Ministry of Communications and Information Technology</option>
                                    </select>
                                </div>
                                <div class="matching-item">
                                    <span>b)</span>
                                    <select class="matching-select" data-question="b">
                                        <option value="">Select Ministry</option>
                                        <option value="i">Ministry of Defence</option>
                                        <option value="ii">Ministry of Agriculture, Food and Public Distribution</option>
                                        <option value="iii">Ministry of Health</option>
                                        <option value="iv">Ministry of Commerce and Industry</option>
                                        <option value="v">Ministry of Communications and Information Technology</option>
                                    </select>
                                </div>
                                <div class="matching-item">
                                    <span>c)</span>
                                    <select class="matching-select" data-question="c">
                                        <option value="">Select Ministry</option>
                                        <option value="i">Ministry of Defence</option>
                                        <option value="ii">Ministry of Agriculture, Food and Public Distribution</option>
                                        <option value="iii">Ministry of Health</option>
                                        <option value="iv">Ministry of Commerce and Industry</option>
                                        <option value="v">Ministry of Communications and Information Technology</option>
                                    </select>
                                </div>
                                <div class="matching-item">
                                    <span>d)</span>
                                    <select class="matching-select" data-question="d">
                                        <option value="">Select Ministry</option>
                                        <option value="i">Ministry of Defence</option>
                                        <option value="ii">Ministry of Agriculture, Food and Public Distribution</option>
                                        <option value="iii">Ministry of Health</option>
                                        <option value="iv">Ministry of Commerce and Industry</option>
                                        <option value="v">Ministry of Communications and Information Technology</option>
                                    </select>
                                </div>
                                <div class="matching-item">
                                    <span>e)</span>
                                    <select class="matching-select" data-question="e">
                                        <option value="">Select Ministry</option>
                                        <option value="i">Ministry of Defence</option>
                                        <option value="ii">Ministry of Agriculture, Food and Public Distribution</option>
                                        <option value="iii">Ministry of Health</option>
                                        <option value="iv">Ministry of Commerce and Industry</option>
                                        <option value="v">Ministry of Communications and Information Technology</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="matching-column">
                            <h4>Ministry</h4>
                            <div class="matching-items">
                                <div class="matching-item"><span>i)</span> Ministry of Defence</div>
                                <div class="matching-item"><span>ii)</span> Ministry of Agriculture, Food and Public Distribution</div>
                                <div class="matching-item"><span>iii)</span> Ministry of Health</div>
                                <div class="matching-item"><span>iv)</span> Ministry of Commerce and Industry</div>
                                <div class="matching-item"><span>v)</span> Ministry of Communications and Information Technology</div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Regular multiple choice questions
                question.options.forEach((option, optionIndex) => {
                    const optionLetter = String.fromCharCode(97 + optionIndex); // a, b, c, d
                    questionHTML += `
                        <div class="quiz-option">
                            <input type="radio" id="q${index + 1}${optionLetter}" name="q${index + 1}" value="${optionLetter}">
                            <label for="q${index + 1}${optionLetter}">${optionLetter}) ${option}</label>
                        </div>
                    `;
                });
            }

            questionHTML += `</div>`;
            questionDiv.innerHTML = questionHTML;
            quizContainer.appendChild(questionDiv);
        });

        console.log('Quiz questions created successfully');
    } else {
        console.error('quizQuestions not available for creating questions');
    }
}

function initializeQuiz() {
    console.log('initializeQuiz called from main.js');
    currentQuestionIndex = 0;
    userAnswers = [];
    quizCompleted = false;

    // Create quiz questions if they don't exist
    createQuizQuestions();

    // Show first question
    showCurrentQuestion();
    updateQuizNavigation();
    updateProgressNew('activities');
}

function showCurrentQuestion() {
    console.log('showCurrentQuestion called from main.js, currentQuestionIndex:', currentQuestionIndex);

    // Check if quizQuestions is available
    if (typeof quizQuestions === 'undefined' || !quizQuestions || quizQuestions.length === 0) {
        console.error('quizQuestions not available or empty');
        showFeedback('Quiz questions not loaded. Please refresh the page.', 'error');
        return;
    }

    // Hide all questions first
    const allQuestions = document.querySelectorAll('.quiz-question');
    allQuestions.forEach(q => q.classList.remove('active'));

    // Show current question
    const currentQuestionElement = document.getElementById(`question-${currentQuestionIndex + 1}`);
    if (currentQuestionElement) {
        currentQuestionElement.classList.add('active');
        console.log('Question element found and activated');
    } else {
        console.error('Question element not found for index:', currentQuestionIndex + 1);
        // Try to create the question element if it doesn't exist
        console.log('Attempting to create missing question element...');
        createQuizQuestions();
        // Try again after creating questions
        setTimeout(() => {
            const retryElement = document.getElementById(`question-${currentQuestionIndex + 1}`);
            if (retryElement) {
                retryElement.classList.add('active');
                console.log('Question element created and activated');
            }
        }, 100);
        return;
    }

    // Update progress
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressFill.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    }

    // Update navigation buttons
    updateQuizNavigation();
}

function updateQuizNavigation() {
    console.log('updateQuizNavigation called from main.js, currentQuestionIndex:', currentQuestionIndex);

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finalActions = document.getElementById('final-actions');

    // Update Previous button
    if (prevBtn) {
        if (currentQuestionIndex === 0) {
            prevBtn.disabled = true;
            prevBtn.classList.add('disabled');
            console.log('Previous button disabled');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('disabled');
            console.log('Previous button enabled');
        }
    }

    // Update Next button and final actions
    if (currentQuestionIndex === quizQuestions.length - 1) {
        // Last question - show final actions
        if (nextBtn) nextBtn.style.display = 'none';
        if (finalActions) {
            finalActions.style.display = 'flex';
            console.log('Final actions shown');
        }
    } else {
        // Not last question - show next button
        if (nextBtn) nextBtn.style.display = 'flex';
        if (finalActions) finalActions.style.display = 'none';
    }
}

function navigateQuestion(direction) {
    console.log('navigateQuestion called with direction:', direction);

    const newIndex = currentQuestionIndex + direction;

    if (newIndex >= 0 && newIndex < quizQuestions.length) {
        currentQuestionIndex = newIndex;
        showCurrentQuestion();
    } else {
        console.log('Navigation out of bounds, newIndex:', newIndex);
    }
}

function checkQuizAnswers() {
    console.log('checkQuizAnswers called');

    let score = 0;
    let totalQuestions = 5;
    let results = [];

    // Check if quizQuestions is available
    if (typeof quizQuestions === 'undefined' || !quizQuestions || quizQuestions.length === 0) {
        console.error('quizQuestions not available for checking answers');
        showFeedback('Quiz questions not loaded. Please refresh the page.', 'error');
        return;
    }

    // Question 1: c) Ask for reconsideration of a bill passed by both the Houses
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'c') {
        score++;
        results.push('<p class="correct-answer">✓ Question 1: Correct! The President can ask for reconsideration of a bill.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 1: Incorrect. The correct answer is c) Ask for reconsideration of a bill passed by both the Houses.</p>');
    }

    // Question 2: c) Home Minister
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'c') {
        score++;
        results.push('<p class="correct-answer">✓ Question 2: Correct! The Home Minister is part of the political executive.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 2: Incorrect. The correct answer is c) Home Minister.</p>');
    }

    // Question 3: a) Every law passed by the Parliament needs approval of the Supreme Court
    const q3Answer = document.querySelector('input[name="q3"]:checked');
    if (q3Answer && q3Answer.value === 'a') {
        score++;
        results.push('<p class="correct-answer">✓ Question 3: Correct! This statement is false - Parliament does not need Supreme Court approval for laws.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 3: Incorrect. The correct answer is a) Every law passed by the Parliament needs approval of the Supreme Court.</p>');
    }

    // Question 4: d) The Parliament
    const q4Answer = document.querySelector('input[name="q4"]:checked');
    if (q4Answer && q4Answer.value === 'd') {
        score++;
        results.push('<p class="correct-answer">✓ Question 4: Correct! Parliament can make changes to existing laws.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 4: Incorrect. The correct answer is d) The Parliament.</p>');
    }

    // Question 5: b) Anjaiah says that judiciary is independent...
    const q5Answer = document.querySelector('input[name="q5"]:checked');
    if (q5Answer && q5Answer.value === 'b') {
        score++;
        results.push('<p class="correct-answer">✓ Question 5: Correct! Anjaiah\'s view correctly identifies that the judiciary is independent because it could have given a verdict against the government order.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 5: Incorrect. The correct answer is b) Anjaiah says that judiciary is independent because it could have given a verdict against the government order. The Supreme Court did direct the government to modify it.</p>');
    }

    // Display results
    const scoreDisplay = document.getElementById('score-display');
    const answersReview = document.getElementById('answers-review');
    const resultsDiv = document.getElementById('quiz-results');

    if (scoreDisplay) {
        scoreDisplay.innerHTML = `<h4>Your Score: ${score}/${totalQuestions}</h4>`;
    }

    if (answersReview) {
        answersReview.innerHTML = results.join('');
    }

    if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Hide navigation
    const navigationDiv = document.querySelector('.quiz-navigation');
    if (navigationDiv) {
        navigationDiv.style.display = 'none';
    }

    // Show achievement if perfect score
    if (score === totalQuestions) {
        setTimeout(() => {
            showAchievement('Quiz Master', 'Perfect score! You have excellent knowledge of democratic rights.');
        }, 1000);
    } else if (score >= 2) {
        setTimeout(() => {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of democratic rights.');
        }, 1000);
    }
}

function resetQuiz() {
    console.log('resetQuiz called');

    // Reset current question index
    currentQuestionIndex = 0;

    // Reset radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => button.checked = false);

    // Reset select dropdowns
    const selects = document.querySelectorAll('.matching-select');
    selects.forEach(select => select.value = '');

    // Hide and clear results
    const resultsDiv = document.getElementById('quiz-results');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
        resultsDiv.innerHTML = ''; // Clear the content
    }

    // Hide quiz navigation
    const navigationDiv = document.querySelector('.quiz-navigation');
    if (navigationDiv) {
        navigationDiv.style.display = 'flex';
    }

    // Show final actions (reset/submit buttons)
    const finalActions = document.getElementById('final-actions');
    if (finalActions) {
        finalActions.style.display = 'none';
    }

    // Reset quiz completion state
    quizCompleted = false;
    userAnswers = [];

    // Reset progress bar
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        progressFill.style.width = '20%';
        progressFill.textContent = 'Question 1 of 5';
    }

    // Reinitialize quiz
    initializeQuiz();
}

// Function to show specific question by index
function showQuestion(index) {
    console.log('showQuestion called with index:', index);

    // Check if quizQuestions is available
    if (typeof quizQuestions === 'undefined' || !quizQuestions || quizQuestions.length === 0) {
        console.error('quizQuestions not available or empty');
        showFeedback('Quiz questions not loaded. Please refresh the page.', 'error');
        return;
    }

    // Hide all questions first
    const questions = document.querySelectorAll('.quiz-question');
    console.log('Found questions:', questions.length);
    questions.forEach(q => q.classList.remove('active'));

    // Show current question
    const currentQuestion = document.getElementById(`question-${index + 1}`);
    console.log('Current question element:', currentQuestion);
    if (currentQuestion) {
        currentQuestion.classList.add('active');
        console.log('Added active class to question', index + 1);
    } else {
        console.error('Question element not found for index:', index + 1);
    }

    // Update navigation buttons
    updateQuizNavigation();
    updateProgressNew('activities');
}

// Initialize quiz when activities module is shown









// Research Activity Functions
function saveResearch() {
    // Get table data and validate required fields
    const tableData = {};
    const tableRows = document.querySelectorAll('.comparison-table tr');
    let allFieldsFilled = true;
    let emptyFields = [];

    tableRows.forEach((row, index) => {
        if (index === 0) return; // Skip header row

        const cells = row.querySelectorAll('td, th');
        if (cells.length >= 3) {
            const aspect = cells[0].textContent.trim();
            const indiaData = cells[1].textContent.trim();
            const textarea = row.querySelector('textarea');
            const otherData = textarea ? textarea.value.trim() : '';

            // Check if the textarea field is empty
            if (!otherData) {
                allFieldsFilled = false;
                emptyFields.push(aspect);
            }

            tableData[`row_${index - 1}`] = {
                aspect: aspect,
                india: indiaData,
                other: otherData
            };
        }
    });

    // Validation: Check if all required fields are filled
    if (!allFieldsFilled) {
        showFeedback('Please fill in all the research details before saving.', 'error');
        speak('Please complete all research fields before saving.');
        return;
    }

    // Confirmation prompt with audio
    speak('All fields are complete. Are you sure you want to save your research? This will overwrite any previously saved research.');
    const confirmed = confirm('Are you sure you want to save your research? This will overwrite any previously saved research.');
    if (!confirmed) {
        speak('Research save cancelled.');
        return;
    }

    const researchData = {
        tableData: tableData,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('constitutionResearch', JSON.stringify(researchData));

    showFeedback('Saved Successfully', 'success');
    speak('Your research has been saved successfully.');
}


// Function to toggle research activity
function toggleResearchActivity(button) {
    console.log('toggleResearchActivity called with button:', button);
    const content = document.getElementById('research-content');
    console.log('Content element found:', content);

    if (!content) {
        console.error('Research content element not found');
        return;
    }

    const currentDisplay = content.style.display;
    console.log('Current display style:', currentDisplay);

    if (currentDisplay === 'none' || currentDisplay === '') {
        content.style.display = 'block';
        button.textContent = 'Hide Research Activity';
        console.log('Content shown - display set to block');
        // Scroll to content
        setTimeout(() => {
            content.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        content.style.display = 'none';
        button.textContent = 'Start Research Activity';
        console.log('Content hidden - display set to none');
    }
}

// Toggle print mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');

    if (document.body.classList.contains('print-mode')) {
        speak("Print mode enabled. The page is now optimized for printing.");
    } else {
        speak("Print mode disabled.");
    }
}

// Function to print research template
function printResearch() {
    // Get the research content specifically
    const researchContent = document.getElementById('research-content');
    if (!researchContent) {
        console.error('Research content not found');
        return;
    }

    // Clone the research content
    const clonedContent = researchContent.cloneNode(true);

    // Replace textareas with their current values for printing
    const originalTextareas = researchContent.querySelectorAll('textarea');
    const clonedTextareas = clonedContent.querySelectorAll('textarea');

    clonedTextareas.forEach((textarea, index) => {
        const originalTextarea = originalTextareas[index];
        if (originalTextarea) {
            const value = originalTextarea.value;
            const div = document.createElement('div');
            div.style.cssText = 'border: 1px solid #ddd; padding: 8px; min-height: 60px; white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; margin: 5px 0;';
            div.textContent = value || '';
            textarea.parentNode.replaceChild(div, textarea);
        }
    });

    // Remove save/print buttons from the cloned content
    const buttons = clonedContent.querySelectorAll('.button-container');
    buttons.forEach(btnContainer => btnContainer.remove());

    // Get the research activity heading
    const activitySection = researchContent.closest('.activity-section');
    const heading = activitySection ? activitySection.querySelector('h3') : null;
    const headingText = heading ? heading.textContent : 'Research Activity: Comparing Democratic Rights';

    // Create a minimal print window with forced single-page layout
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${headingText}</title>
            <style>
                * {
                    box-sizing: border-box;
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 15px;
                    line-height: 1.4;
                    color: #333;
                    font-size: 11px;
                    background: white;
                }
                h3 {
                    color: #1e3c72;
                    border-bottom: 1px solid #ff6b6b;
                    padding-bottom: 5px;
                    margin-bottom: 10px;
                    font-size: 16px;
                    font-weight: bold;
                    page-break-after: avoid;
                }
                .research-instructions {
                    background: #f8f9fa;
                    padding: 10px;
                    border-radius: 5px;
                    border-left: 3px solid #1e3c72;
                    margin-bottom: 10px;
                    page-break-inside: avoid;
                }
                .research-instructions p {
                    margin: 0 0 8px 0;
                    font-size: 11px;
                }
                .research-instructions ul, .research-instructions ol {
                    margin: 8px 0;
                    padding-left: 15px;
                }
                .research-instructions li {
                    margin-bottom: 3px;
                    font-size: 10px;
                }
                .research-template {
                    background: white;
                    padding: 10px;
                    border-radius: 5px;
                }
                .comparison-table {
                    margin: 10px 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    margin: 10px 0;
                    font-size: 10px;
                    page-break-inside: avoid;
                }
                th {
                    background: #1e3c72;
                    color: white;
                    padding: 6px;
                    text-align: left;
                    font-weight: bold;
                    font-size: 10px;
                }
                td {
                    padding: 6px;
                    border: 1px solid #ddd;
                    vertical-align: top;
                    font-size: 10px;
                }
                tr:nth-child(even) {
                    background: #f8f9fa;
                }
                .activity-content {
                    background: #f8f9fa;
                    padding: 10px;
                    border-radius: 5px;
                    border-left: 3px solid #1e3c72;
                    page-break-inside: avoid;
                }
                /* Force single page printing */
                @media print {
                    body {
                        margin: 0;
                        padding: 10px;
                        font-size: 10px;
                        width: 100%;
                        height: auto;
                    }
                    * {
                        page-break-inside: avoid !important;
                        page-break-after: avoid !important;
                        page-break-before: avoid !important;
                    }
                    html, body {
                        height: auto !important;
                        overflow: visible !important;
                    }
                    @page {
                        size: auto;
                        margin: 5mm;
                    }
                }
            </style>
        </head>
        <body>
            <h3>${headingText}</h3>
            <div style="max-width: 100%; overflow: hidden;">
                ${clonedContent.innerHTML}
            </div>
        </body>
        </html>
    `);

    printWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        // Don't close immediately to allow print dialog
        setTimeout(() => {
            printWindow.close();
        }, 1000);
    }, 300);
}


// Test audio functionality
function testAudio() {
    console.log('=== TESTING AUDIO FUNCTIONALITY ===');
    console.log('Audio enabled:', isAudioEnabled);
    console.log('Audio initialized:', audioInitialized);
    console.log('User interacted:', userInteracted);
    console.log('Speech synthesis available:', !!window.speechSynthesis);
    console.log('Speech synthesis speaking:', window.speechSynthesis ? window.speechSynthesis.speaking : 'N/A');
    console.log('Current speech state:', currentSpeechState);
    console.log('Global narration state:', globalNarrationState);

    if (window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
        if (voices.length > 0) {
            console.log('First voice:', voices[0].name, voices[0].lang);
        }
    }

    // Try to speak a test message
    if (isAudioEnabled && window.speechSynthesis) {
        speak('Audio test successful! You should hear this message.');
        showFeedback('Audio test initiated. Check console for details.', 'info');
    } else {
        showFeedback('Audio is disabled or not available. Enable audio first.', 'error');
    }
}

// Debug audio state function
function debugAudioState() {
    console.log('=== AUDIO STATE DEBUG ===');
    console.log('isAudioEnabled:', isAudioEnabled);
    console.log('globalNarrationState.isEnabled:', globalNarrationState.isEnabled);
    console.log('globalNarrationState.disabledByUser:', globalNarrationState.disabledByUser);
    console.log('audioInitialized:', audioInitialized);
    console.log('userInteracted:', userInteracted);
    console.log('currentSpeechState:', currentSpeechState);
    console.log('window.speechSynthesis available:', !!window.speechSynthesis);

    if (window.speechSynthesis) {
        console.log('window.speechSynthesis.speaking:', window.speechSynthesis.speaking);
        console.log('window.speechSynthesis.pending:', window.speechSynthesis.pending);
        console.log('window.speechSynthesis.paused:', window.speechSynthesis.paused);
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
    }

    // Show current state in UI
    const debugInfo = `
Audio State Debug:
- isAudioEnabled: ${isAudioEnabled}
- globalNarrationState.isEnabled: ${globalNarrationState.isEnabled}
- globalNarrationState.disabledByUser: ${globalNarrationState.disabledByUser}
- audioInitialized: ${audioInitialized}
- userInteracted: ${userInteracted}
- currentSpeechState: ${currentSpeechState}
- Speech synthesis available: ${!!window.speechSynthesis}
    `;

    showFeedback(debugInfo, 'info');
    console.log(debugInfo);
}