// Main JavaScript for Working of Institutions Interactive Lesson

// Global variables for tracking progress
let moduleProgress = {
    intro: false,
    overview: false,
    southafrica: false,
    whyconstitution: false,
    indianconstitution: false,
    guidingvalues: false,
    importantterms: false,
    activities: false
};

// Module order for progress calculation
const moduleOrder = ['intro', 'overview', 'southafrica', 'whyconstitution', 'indianconstitution', 'guidingvalues', 'importantterms', 'activities'];

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

    // Progress based on completed modules: intro is 15%, remaining 7 modules share 85%
    const progressPercentage = 15 + Math.round((completedModules - 1) / 7 * 85);
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
                showAchievement('Democracy Expert', 'You matched all terms correctly!');
                break;
            case 'quiz':
                showAchievement('Quiz Master', 'You completed the quiz successfully!');
                break;
        }
    }

    // Check if all modules are complete
    if (completedModules === 8) { // All 8 modules including intro
        showAchievement('Constitution Expert', 'You completed all modules of Constitutional Design!');
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
            return speak("Welcome to Constitutional Design! This chapter explores why we need a constitution, how it's made, and the values that guide it. We study South Africa's democratic constitution and how India created its own constitution.");

        case 'overview':
            return speak("This chapter explores constitutional design in democracy. Why do we need a constitution? How are they made? What values shape them? We study South Africa's constitution-making process and then examine how India created its constitution.");

        case 'southafrica':
            return speak("This module examines South Africa's Democratic Constitution. We explore the struggle against apartheid and racial discrimination. We learn about Nelson Mandela's fight and how South Africa transitioned to democracy.");

        case 'whyconstitution':
            return speak("This module explains why we need a constitution. Using the South African example, we learn how constitutions build trust between different groups, define government structure, limit powers, and express people's aspirations for a good society.");

        case 'indianconstitution':
            return speak("This module explores the making of the Indian Constitution. Despite partition and princely state integration challenges, India created its constitution through the Constituent Assembly. We learn about the process and why this constitution remains relevant today.");

        case 'guidingvalues':
            return speak("This module examines the guiding values of the Indian Constitution. We explore the Preamble's philosophy, the dreams of leaders like Gandhi, Ambedkar, and Nehru. We compare preambles of different countries and understand key terms like Sovereign, Socialist, Secular, Democratic, and Republic.");

        case 'importantterms':
            return speak("This module covers the important terms from Constitutional Design. Learn key vocabulary including constitution, apartheid, constituent assembly, preamble, sovereign, and secular. Understanding these terms is essential for grasping constitutional principles.");

        case 'activities':
            return speak("Test your knowledge with interactive activities about Constitutional Design. Complete quizzes and matching activities to reinforce learning about constitutional principles, South African constitution, Indian constitution making, and guiding values.");


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

    showAchievement('Journey Begins', 'You started your learning journey with Constitutional Design!');
    return speak("Welcome to Constitutional Design! This chapter explores why we need a constitution, how it's made, and the values that guide it. We study South Africa's democratic constitution and how India created its own constitution.");
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

// Manual function to enable audio if autoplay is blocked
function enableAudio() {
    console.log('Manual audio enable requested...');
    userInteracted = true;

    // Initialize audio system
    const success = initializeAudio();
    if (success) {
        showFeedback('Audio system enabled! Try switching modules to hear narration.', 'success');

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
}


// Function to speak individual card content
function speakCardContent(button, text) {
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

    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading...';
    button.parentNode.appendChild(readingIndicator);

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
    isAudioEnabled = !isAudioEnabled;
    globalNarrationState.isEnabled = isAudioEnabled;
    globalNarrationState.disabledByUser = !isAudioEnabled;

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
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
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

// Read paragraphs sequentially with visual highlighting
function readParagraphsSequentially(paragraphs, containerElement) {
    // Create reading indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
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

// Read the preamble aloud
function readPreamble(preambleId, buttonElement) {
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

    // Find the specific button container for this preamble using the button element
    const buttonContainer = buttonElement.parentNode;
    if (buttonContainer && buttonContainer.classList.contains('button-container')) {
        buttonContainer.appendChild(readingIndicator);
    } else {
        // Fallback: find the button container within the same preamble card
        const preambleCard = buttonElement.closest('.preamble-card');
        if (preambleCard) {
            const container = preambleCard.querySelector('.button-container');
            if (container) {
                container.appendChild(readingIndicator);
            } else {
                preambleCard.appendChild(readingIndicator);
            }
        } else {
            buttonElement.parentNode.appendChild(readingIndicator);
        }
    }

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

    // Add stop button to reading indicator immediately
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

// Read the US preamble aloud
function readUSPreamble() {
    const button = document.querySelector('button[onclick="readUSPreamble()"]');
    readPreamble('us-preamble', button);
}

// Read the South Africa preamble aloud
function readSAPreamble() {
    const button = document.querySelector('button[onclick="readSAPreamble()"]');
    readPreamble('sa-preamble', button);
}

// Read the Indian preamble aloud
function readIndiaPreamble() {
    const button = document.querySelector('button[onclick="readIndiaPreamble()"]');
    readPreamble('india-preamble', button);
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
        showFeedback('Unable to start audio narration. Please click the play button to try again.', 'error');
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

// Toggle preamble card expansion
function togglePreambleCard(cardElement) {
    const preambleText = cardElement.querySelector('.preamble-text');
    const buttonContainer = cardElement.querySelector('.button-container');

    if (cardElement.classList.contains('expanded')) {
        // Collapse
        cardElement.classList.remove('expanded');
        preambleText.style.maxHeight = '0';
        preambleText.style.opacity = '0';
    } else {
        // Expand
        cardElement.classList.add('expanded');
        preambleText.style.maxHeight = preambleText.scrollHeight + 'px';
        preambleText.style.opacity = '1';
    }
}

// Toggle description visibility
function toggleDesc(button) {
    const card = button.parentNode.parentNode; // Since button is in a center div inside card
    const desc = card.querySelector('.feature-desc');

    if (desc.style.display === 'none' || desc.style.display === '') {
        desc.style.display = 'block';
        button.textContent = 'See Less';
    } else {
        desc.style.display = 'none';
        button.textContent = 'See More';
    }
}

// Quiz functionality - One question at a time
// Note: currentQuestionIndex is declared in main.js
const totalQuestions = 2;

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
        const progress = ((currentQuestionIndex + 1) / 2) * 100;
        progressFill.style.width = `${progress}%`;
        progressFill.textContent = `Question ${currentQuestionIndex + 1} of 2`;
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
    let totalQuestions = 2;
    let results = [];

    // Always generate results regardless of quizQuestions availability
    try {
        // Question 1: c) Between the white minority and the black majority
        const q1Answer = document.querySelector('input[name="q1"]:checked');
        if (q1Answer && q1Answer.value === 'c') {
            score++;
            results.push('<p class="correct-answer">✓ Question 1: Correct! The most salient underlying conflict in the making of a democratic constitution in South Africa was between the white minority and the black majority.</p>');
        } else {
            const selectedValue = q1Answer ? q1Answer.value : 'No answer';
            results.push('<p class="wrong-answer">✗ Question 1: Incorrect. Your answer: ' + selectedValue + '. The correct answer is c) Between the white minority and the black majority.</p>');
        }

        // Question 2: b) Name of the head of the state
        const q2Answer = document.querySelector('input[name="q2"]:checked');
        if (q2Answer && q2Answer.value === 'b') {
            score++;
            results.push('<p class="correct-answer">✓ Question 2: Correct! A democratic constitution does not have the name of the head of the state as a provision.</p>');
        } else {
            const selectedValue = q2Answer ? q2Answer.value : 'No answer';
            results.push('<p class="wrong-answer">✗ Question 2: Incorrect. Your answer: ' + selectedValue + '. The correct answer is b) Name of the head of the state.</p>');
        }
    } catch (error) {
        console.error('Error checking quiz answers:', error);
        // Fallback: create basic results
        results.push('<p class="wrong-answer">✗ Question 1: No answer provided. The correct answer is c) Between the white minority and the black majority.</p>');
        results.push('<p class="wrong-answer">✗ Question 2: No answer provided. The correct answer is b) Name of the head of the state.</p>');
    }

    // Display results - only show when submit is clicked
    const displayResults = () => {
        console.log('=== DISPLAY RESULTS CALLED ===');
        console.log('Score:', score, 'Total:', totalQuestions);
        console.log('Results content:', results);

        // Get elements
        const scoreDisplay = document.getElementById('score-display');
        const answersReview = document.getElementById('answers-review');
        let resultsDiv = document.getElementById('quiz-results');

        console.log('Elements found:', {
            scoreDisplay: !!scoreDisplay,
            answersReview: !!answersReview,
            resultsDiv: !!resultsDiv
        });

        // Update score display
        if (scoreDisplay) {
            scoreDisplay.innerHTML = `<h4>Your Score: ${score}/${totalQuestions}</h4>`;
            console.log('Score display updated');
        }

        // Update answers review
        if (answersReview) {
            answersReview.innerHTML = results.join('');
            console.log('Answers review updated');
        }

        // Find and show results div
        if (!resultsDiv) {
            console.log('Results div not found by ID, searching...');
            resultsDiv = document.querySelector('#quiz-results');
            if (!resultsDiv) {
                resultsDiv = document.querySelector('.quiz-results');
            }
        }

        if (resultsDiv) {
            console.log('Results div found, showing...');

            // Clear any existing styles and classes first
            resultsDiv.style.cssText = '';
            resultsDiv.className = 'quiz-results';

            // Show the results
            resultsDiv.style.display = 'block';
            resultsDiv.style.visibility = 'visible';
            resultsDiv.style.opacity = '1';
            resultsDiv.classList.add('show');

            // Scroll into view
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            console.log('Results div shown successfully');

            // Simple timeout check
            setTimeout(() => {
                if (resultsDiv.style.display === 'none') {
                    console.log('Results hidden, forcing display again');
                    resultsDiv.style.display = 'block';
                    resultsDiv.style.visibility = 'visible';
                    resultsDiv.style.opacity = '1';
                }
            }, 100);
        } else {
            console.error('Results div not found, creating fallback...');

            // Create fallback results div
            const quizContainer = document.getElementById('quiz-container') || document.querySelector('.quiz-container');
            if (quizContainer) {
                const fallbackResultsDiv = document.createElement('div');
                fallbackResultsDiv.id = 'quiz-results-fallback';
                fallbackResultsDiv.className = 'quiz-results';
                fallbackResultsDiv.innerHTML = `
                    <h4>Quiz Results</h4>
                    <div id="score-display">Your Score: ${score}/${totalQuestions}</div>
                    <div id="answers-review">${results.join('')}</div>
                `;
                fallbackResultsDiv.style.cssText = `
                    background: white;
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                    border: 2px solid #4caf50;
                    display: block;
                    visibility: visible;
                    opacity: 1;
                `;

                quizContainer.appendChild(fallbackResultsDiv);
                console.log('Created fallback results div');
                fallbackResultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Hide navigation
        const navigationDiv = document.querySelector('.quiz-navigation');
        if (navigationDiv) {
            navigationDiv.style.display = 'none';
        }

        // Show achievement
        if (score === totalQuestions) {
            setTimeout(() => {
                showAchievement('Constitution Expert', 'Perfect score! You have excellent knowledge of Constitutional Design.');
            }, 1000);
        } else if (score >= 1) {
            setTimeout(() => {
                showAchievement('Good Understanding', 'Well done! You have a good grasp of constitutional principles.');
            }, 1000);
        } else {
            setTimeout(() => {
                showAchievement('Keep Learning', 'Review the material and try again to improve your understanding.');
            }, 1000);
        }

        console.log('=== DISPLAY RESULTS COMPLETED ===');
    };

    // Call display function immediately
    displayResults();
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

    // Hide and clear results - ensure complete reset
    const resultsDiv = document.getElementById('quiz-results');
    if (resultsDiv) {
        // Remove all classes that might show the results
        resultsDiv.className = 'quiz-results';
        resultsDiv.classList.remove('show', 'visible', 'active');

        // Force hide with inline styles (override CSS)
        resultsDiv.style.display = 'none';
        resultsDiv.style.visibility = 'hidden';
        resultsDiv.style.opacity = '0';
        resultsDiv.innerHTML = ''; // Clear the content

        // Also check for any fallback results div
        const fallbackResultsDiv = document.getElementById('quiz-results-fallback');
        if (fallbackResultsDiv) {
            fallbackResultsDiv.remove();
        }
    }

    // Also clear any other potential results containers
    const allResultsDivs = document.querySelectorAll('.quiz-results');
    allResultsDivs.forEach(div => {
        if (div.id !== 'quiz-results') {
            div.remove();
        }
    });

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
        progressFill.style.width = '50%';
        progressFill.textContent = 'Question 1 of 2';
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

// Initialize image gallery functionality
function initializeImageGallery() {
    // Add hover effects and ensure images are properly loaded
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach((image, index) => {
        // Remove cursor pointer since images don't need to be clickable
        image.style.cursor = 'default';

        // Add tabindex for accessibility
        image.setAttribute('tabindex', '0');

        // Ensure images load properly
        image.addEventListener('load', function() {
            console.log(`Gallery image ${index + 1} loaded successfully`);
        });

        image.addEventListener('error', function() {
            console.error(`Failed to load gallery image ${index + 1}`);
            // Provide fallback styling for broken images
            this.style.background = '#f5f5f5';
            this.style.border = '2px dashed #ccc';
            this.alt = 'Image not available';
        });
    });
}

// Initialize image gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing DOMContentLoaded code ...

    // Initialize image gallery after a short delay to ensure all images are loaded
    setTimeout(() => {
        initializeImageGallery();
    }, 500);
});