// Main JavaScript for Constitutional Design Interactive Lesson

// Global variables for tracking progress
let moduleProgress = {
    intro: false,
    overview: false,
    southafrica: false,
    whyconstitution: false,
    indianconstitution: false,
    values: false,
    activities: false
};

// Module order for progress calculation
const moduleOrder = ['intro', 'overview', 'southafrica', 'whyconstitution', 'indianconstitution', 'values', 'activities'];

let maxProgressIndex = 0;

let currentScore = 0;
let startTime = null;
let timer = null;
let isAudioEnabled = true; // Enable audio by default
let userInteracted = false;
let currentSpeechState = 'stopped'; // Track speech state: 'stopped', 'speaking', 'paused'
let submissionType = null; // Track the type of activity submission

// Global narration state management
let globalNarrationState = {
    isEnabled: true,
    disabledByUser: false,
    currentModule: null,
    currentPart: null
};

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Enable user interaction for speech synthesis on page load
    userInteracted = true;
    initialize();

    // Initialize play/pause button state
    updatePlayPauseButton();

    // Try to start audio immediately and also on first user interaction
    const tryStartAudio = () => {
        if (isAudioEnabled && !globalNarrationState.disabledByUser && !window.speechSynthesis.speaking) {
            console.log('Attempting to start audio...');
            startModuleNarration('intro');
            const playPauseBtn = document.getElementById('playPause');
            if (playPauseBtn) {
                const icon = playPauseBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-pause';
                playPauseBtn.setAttribute('aria-label', 'Pause narration');
            }
        }
    };

    // Try immediately
    setTimeout(tryStartAudio, 500);

    // Also try on first user interaction
    const startOnInteraction = () => {
        tryStartAudio();
        document.removeEventListener('click', startOnInteraction);
        document.removeEventListener('keydown', startOnInteraction);
    };

    document.addEventListener('click', startOnInteraction);
    document.addEventListener('keydown', startOnInteraction);
});

// Initialize function
function initialize() {
    // Start timer
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);

    // Create background particles
    createParticles();

    // Content will be initialized by content.js when it loads
    
    // Start narration for intro after content loads
    setTimeout(() => {
        if (isAudioEnabled && !globalNarrationState.disabledByUser) {
            startModuleNarration('intro');
        }
    }, 500);
    
    // Mark intro as completed since we land directly on it
    moduleProgress.intro = true;
    updateProgress('intro');

    // Add global user interaction tracking for speech synthesis
    document.addEventListener('click', function() {
        userInteracted = true;
    });
    document.addEventListener('keydown', function() {
        userInteracted = true;
    });

    // Check for browser feature support
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
        // Disable audio features if speech synthesis is not supported
        document.querySelectorAll('[onclick*="readText"], [onclick*="readQuote"], [onclick*="readPreamble"]').forEach(btn => {
            btn.disabled = true;
            btn.title = 'Speech synthesis not supported in your browser';
        });

        showFeedback('Speech synthesis is not supported in your browser. Some audio features will be disabled.', 'error');
    } else {
        // Initialize speech synthesis
        window.speechSynthesis.getVoices(); // Trigger voice loading

        // Handle voices being loaded asynchronously in some browsers
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = function() {
                console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
                // Start auto-narration once voices are loaded
                setTimeout(startAutoNarration, 100);
            };
        }

        // Also try after a delay regardless of voices loaded event
        setTimeout(() => {
            if (!window.speechSynthesis.speaking) {
                startAutoNarration();
            }
        }, 1000);
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
    // Always update the button to show pause icon when attempting auto-play
    const playPauseBtn = document.getElementById('playPause');
    if (playPauseBtn) {
        const icon = playPauseBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-pause';
        playPauseBtn.setAttribute('aria-label', 'Pause narration');
    }

    if (isAudioEnabled && !globalNarrationState.disabledByUser) {
        startModuleNarration('intro');
    }
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

    // Automatically start narrating the new module content if enabled
    setTimeout(() => {
        if (isAudioEnabled && !globalNarrationState.disabledByUser) {
            startModuleNarration(moduleId);
            // Update play/pause button to show pause icon
            const playPauseBtn = document.getElementById('playPause');
            if (playPauseBtn) {
                const icon = playPauseBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-pause';
                playPauseBtn.setAttribute('aria-label', 'Pause narration');
            }
        }
    }, 200); // Small delay to ensure module is fully loaded
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateProgressNew(moduleId){
    console.log('Updating progress new for module:', moduleId);

    // Count total completed modules
    const completedModules = Object.values(moduleProgress).filter(Boolean).length;

    // Progress based on completed modules: intro is 15%, remaining 9 modules share 85%
    const progressPercentage = 15 + Math.round((completedModules - 1) / 9 * 85);
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
    if (submissionType) {
        switch (submissionType) {
            case 'match':
                showAchievement('Constitution Expert', 'You matched all terms correctly!');
                break;
            case 'quiz':
                showAchievement('Quiz Master', 'You completed the quiz successfully!');
                break;
        }
    }

    // Check if all modules are complete
    if (completedModules === 9) { // All 9 modules including intro
        showAchievement('Completion Hero', 'You completed all modules of the lesson!');
        clearInterval(timer); // Stop the timer
    }
}
// Start module narration automatically
function startModuleNarration(moduleId) {
    if (!isAudioEnabled || globalNarrationState.disabledByUser) {
        console.log('Automatic narration disabled');
        return;
    }

    console.log(`Starting automatic narration for module: ${moduleId}`);

    // Update play/pause button to show pause
    const playPauseBtn = document.getElementById('playPause');
    if (playPauseBtn) {
        const icon = playPauseBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-pause';
        playPauseBtn.setAttribute('aria-label', 'Pause narration');
    }

    switch(moduleId) {
        case 'intro':
             speak("Welcome to Chapter 1 on Development. This chapter explores how development shapes our aspirations and vision for the future. It examines the kind of society we want to live in, how to achieve equality for all, and the role of democracy in turning hopes into reality.");
             break;
            
        case 'overview':
             speak("This overview explores the idea of development and progress that has always been with us. We have aspirations about how we want to live and what our country should be like. It examines essential questions about equality, living together, and achieving goals through democratic processes.");
             break;
            
        case 'southafrica':
             speak("This section explores what development means to different people. We examine how various individuals and groups have different goals and aspirations, and how these can sometimes conflict with each other.");
             break;
            
        case 'whyconstitution':
            speak("Income and other goals explores how people seek not just more income, but also equal treatment, freedom, security, and respect. This section examines how developmental goals include both material and non-material aspects of life.");
            break;
            
        case 'indianconstitution':
            speak("This section explores national development and how different people can have different notions of what development means for a country. It examines how to think about fair and just development that benefits everyone.");
            break;

        case 'comparecountries':
            speak("This section explains how to compare different countries or states by examining various criteria and measurements. It explores why income is often used as a key indicator and how per capita income helps us understand development levels across nations.");
            break;

        case 'incomeother':
            speak("This section examines income and other important criteria for measuring development. It compares different states using not just per capita income but also other indicators like infant mortality rates and school attendance to provide a more complete picture of development.");
            break;

        case 'publicfacilities':
            speak("This section explores the importance of public facilities and collective goods in development. It explains why income alone is insufficient and how essential services like healthcare, education, and infrastructure need to be provided collectively for the benefit of all citizens.");
            break;
            
        case 'values':
            speak("This section examines the sustainability of development and explores whether our current development patterns can be maintained for future generations. It discusses environmental challenges and the need for sustainable development practices.");
            break;
            
        case 'activities':
            speak("Test your knowledge and understanding with these interactive activities about democratic rights and fundamental freedoms.");
            break;

        default:
            console.log(`No specific narration defined for module: ${moduleId}`);
            break;
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
    
    showAchievement('Journey Begins', 'You started your learning journey with Chapter-1 Development!');
    speak("Welcome to the interactive lesson on Development. Let's begin by understanding the concept of development and its importance in shaping our society and nation.");
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
//                 showAchievement('Constitution Expert', 'You matched all terms correctly!');
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
    if (!isAudioEnabled || !window.speechSynthesis) {
        console.log('Speech synthesis not available or disabled');
        return;
    }

    console.log('Speaking:', text.substring(0, 50) + '...');

    // Enable user interaction for speech synthesis
    userInteracted = true;

    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Track speech state and update button accordingly
    utterance.onstart = () => {
        console.log('Speech started');
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    utterance.onend = () => {
        console.log('Speech ended');
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
    };

    try {
        window.speechSynthesis.speak(utterance);
        currentSpeechState = 'speaking';
    } catch (error) {
        console.error('Error speaking:', error);
        currentSpeechState = 'stopped';
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
    const isCurrentlyExpanded = cardElement.classList.contains('expanded');

    cardElement.classList.toggle('expanded');

    // If card is being collapsed (not expanded), stop any active narration
    if (isCurrentlyExpanded) {
        // Card is being collapsed - stop narration for this specific card
        const politicalBtn = cardElement.querySelector('.political-speaker-btn');
        const councilBtn = cardElement.querySelector('.council-speaker-btn');
        const powersBtn = cardElement.querySelector('.powers-speaker-btn');
        const presidentBtn = cardElement.querySelector('.president-speaker-btn');
        const presidentialBtn = cardElement.querySelector('.presidential-speaker-btn');
        const judiciaryBtn = cardElement.querySelector('.judiciary-speaker-btn');

        // Stop narration for each specific button type if active
        if (politicalBtn && politicalBtn.classList.contains('active')) {
            togglePoliticalNarration();
        }
        if (councilBtn && councilBtn.classList.contains('active')) {
            toggleCouncilNarration();
        }
        if (powersBtn && powersBtn.classList.contains('active')) {
            togglePowersNarration();
        }
        if (presidentBtn && presidentBtn.classList.contains('active')) {
            togglePresidentNarration();
        }
        if (presidentialBtn && presidentialBtn.classList.contains('active')) {
            togglePresidentialNarration();
        }
        if (judiciaryBtn && judiciaryBtn.classList.contains('active')) {
            toggleJudiciaryNarration();
        }
    }
}

// Prevent card content clicks from closing cards (only for Rights in Constitution section)
document.addEventListener('DOMContentLoaded', function() {
    const rightsCards = document.querySelectorAll('#indianconstitution .expandable-card .card-content');
    rightsCards.forEach(content => {
        content.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});

// Toggle description visibility
function toggleDesc(button) {
    const card = button.parentNode.parentNode; // Since button is in a center div inside card
    const desc = card.querySelector('.feature-desc');
    const haryanaSpeakerContainer = card.querySelector('.haryana-speaker-container');
    const saudiSpeakerContainer = card.querySelector('.saudi-speaker-container');
    const kosovoSpeakerContainer = card.querySelector('.kosovo-speaker-container');
    const parliamentSpeakerContainer = card.querySelector('.parliament-speaker-container');
    const housesSpeakerContainer = card.querySelector('.houses-speaker-container');
    const valuesSpeakerContainer = card.querySelector('.values-speaker-container');
    const covenantSpeakerContainer = card.querySelector('.covenant-speaker-container');

    if (desc.style.display === 'none' || desc.style.display === '') {
        desc.style.display = 'block';
        button.textContent = 'See Less';

        // Show narration button when content is expanded
        if (haryanaSpeakerContainer) {
            haryanaSpeakerContainer.style.display = 'flex';
        }
        if (saudiSpeakerContainer) {
            saudiSpeakerContainer.style.display = 'flex';
        }
        if (kosovoSpeakerContainer) {
            kosovoSpeakerContainer.style.display = 'flex';
        }
        if (parliamentSpeakerContainer) {
            parliamentSpeakerContainer.style.display = 'flex';
        }
        if (housesSpeakerContainer) {
            housesSpeakerContainer.style.display = 'flex';
        }
        if (valuesSpeakerContainer) {
            valuesSpeakerContainer.style.display = 'flex';
        }
        if (covenantSpeakerContainer) {
            covenantSpeakerContainer.style.display = 'flex';
        }
    } else {
        // Stop any active narration before collapsing
        if (haryanaSpeakerContainer) {
            const haryanaBtn = haryanaSpeakerContainer.querySelector('.haryana-speaker-btn');
            if (haryanaBtn && haryanaBtn.classList.contains('active')) {
                // Stop narration and remove active state without triggering other narrations
                haryanaBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (saudiSpeakerContainer) {
            const saudiBtn = saudiSpeakerContainer.querySelector('.saudi-speaker-btn');
            if (saudiBtn && saudiBtn.classList.contains('active')) {
                toggleSaudiNarration();
            }
        }
        if (kosovoSpeakerContainer) {
            const kosovoBtn = kosovoSpeakerContainer.querySelector('.kosovo-speaker-btn');
            if (kosovoBtn && kosovoBtn.classList.contains('active')) {
                toggleKosovoNarration();
            }
        }
        if (parliamentSpeakerContainer) {
            const parliamentBtn = parliamentSpeakerContainer.querySelector('.parliament-speaker-btn');
            if (parliamentBtn && parliamentBtn.classList.contains('active') && parliamentBtn.id === 'parliamentSpeakerBtn') {
                toggleParliamentNarration();
            }
        }
        if (housesSpeakerContainer) {
            const housesBtn = housesSpeakerContainer.querySelector('.houses-speaker-btn');
            if (housesBtn && housesBtn.classList.contains('active')) {
                toggleHousesNarration();
            }
        }
        if (parliamentSpeakerContainer) {
            const nhrcBtn = parliamentSpeakerContainer.querySelector('.parliament-speaker-btn');
            if (nhrcBtn && nhrcBtn.classList.contains('active') && nhrcBtn.id === 'nhrcSpeakerBtn') {
                toggleNHRCNarration();
            }
        }
        if (valuesSpeakerContainer) {
            const valuesBtn = valuesSpeakerContainer.querySelector('.values-speaker-btn');
            if (valuesBtn && valuesBtn.classList.contains('active')) {
                // Stop narration for values speaker buttons
                valuesBtn.classList.remove('active');
                stopAllNarration();
            }
        }

        desc.style.display = 'none';
        button.textContent = 'See More';

        // Hide narration button when content is collapsed by removing inline styles
        // This allows CSS defaults to take effect (display: flex for visible buttons)
        if (haryanaSpeakerContainer) {
            haryanaSpeakerContainer.style.display = '';
        }
        if (saudiSpeakerContainer) {
            saudiSpeakerContainer.style.display = '';
        }
        if (kosovoSpeakerContainer) {
            kosovoSpeakerContainer.style.display = '';
        }
        if (parliamentSpeakerContainer) {
            parliamentSpeakerContainer.style.display = '';
        }
        if (housesSpeakerContainer) {
            housesSpeakerContainer.style.display = '';
        }
        if (valuesSpeakerContainer) {
            valuesSpeakerContainer.style.display = '';
        }
        if (covenantSpeakerContainer) {
            covenantSpeakerContainer.style.display = '';
        }
    }
}

// Make entire cards clickable to expand/collapse
function makeCardsClickable() {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Don't trigger if clicking on narration buttons or their containers
            if (event.target.closest('.haryana-speaker-btn') ||
                event.target.closest('.saudi-speaker-btn') ||
                event.target.closest('.kosovo-speaker-btn') ||
                event.target.closest('.parliament-speaker-btn') ||
                event.target.closest('.houses-speaker-btn') ||
                event.target.closest('.values-speaker-btn') ||
                event.target.closest('.covenant-speaker-btn') ||
                event.target.closest('.haryana-speaker-container') ||
                event.target.closest('.saudi-speaker-container') ||
                event.target.closest('.kosovo-speaker-container') ||
                event.target.closest('.parliament-speaker-container') ||
                event.target.closest('.houses-speaker-container') ||
                event.target.closest('.values-speaker-container') ||
                event.target.closest('.covenant-speaker-container')) {
                return; // Don't toggle card if clicking on narration elements
            }

            // Don't trigger if clicking on the See More/See Less button itself
            // This allows the button's own onclick handler to work properly
            if (event.target.closest('.interactive-btn')) {
                return; // Don't toggle card if clicking on the toggle button
            }

            // Find the See More/See Less button within this card
            const toggleButton = card.querySelector('.interactive-btn');
            if (toggleButton) {
                toggleDesc(toggleButton);
            }
        });

        // Add visual feedback for clickable cards
        card.style.cursor = 'pointer';

        // Prevent text selection when clicking to expand/collapse
        card.addEventListener('selectstart', function(event) {
            if (!event.target.closest('.feature-desc') &&
                !event.target.closest('.haryana-speaker-container') &&
                !event.target.closest('.saudi-speaker-container') &&
                !event.target.closest('.kosovo-speaker-container') &&
                !event.target.closest('.parliament-speaker-container') &&
                !event.target.closest('.houses-speaker-container') &&
                !event.target.closest('.values-speaker-container') &&
                !event.target.closest('.covenant-speaker-container')) {
                event.preventDefault();
            }
        });
    });
}

// Initialize clickable cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    makeCardsClickable();
});

// Quiz functionality - One question at a time
let currentQuestionIndex = 0;
const totalQuestions = 3;

function initializeQuiz() {
    currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);
    updateNavigation();
    updateProgress();
}

function showQuestion(index) {
    // Hide all questions
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach(q => q.classList.remove('active'));

    // Show current question
    const currentQuestion = document.getElementById(`question-${index + 1}`);
    if (currentQuestion) {
        currentQuestion.classList.add('active');
    }

    updateNavigation();
    updateProgress();
}

function navigateQuestion(direction) {
    const newIndex = currentQuestionIndex + direction;

    if (newIndex >= 0 && newIndex < totalQuestions) {
        currentQuestionIndex = newIndex;

        // Also update the activities.js system to keep them in sync
        if (typeof quizQuestionIndex !== 'undefined') {
            quizQuestionIndex = newIndex;
        }

        showQuestion(currentQuestionIndex);
        updateNavigation(); // Ensure navigation buttons are updated after index change

        // Also update the activities.js navigation if the function exists
        if (typeof updateQuizNavigation !== 'undefined') {
            updateQuizNavigation();
        }
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finalActions = document.getElementById('final-actions');

    // Update Previous button
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }

    // Update Next button and final actions
    if (currentQuestionIndex === totalQuestions - 1) {
        // Last question - show final actions
        if (nextBtn) nextBtn.style.display = 'none';
        if (finalActions) finalActions.style.display = 'flex';
    } else {
        // Not last question - show next button
        if (nextBtn) nextBtn.style.display = 'flex';
        if (finalActions) finalActions.style.display = 'none';
    }
}

function updateProgress() {
    const progressFill = document.getElementById('quiz-progress-fill');
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    if (progressFill) {
        progressFill.style.width = `${progress}%`;
        progressFill.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    }
}

function checkQuizAnswers() {
    let score = 0;
    let totalQuestions = 3;
    let results = [];

    // Question 1: d) all the above
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'd') {
        score++;
        results.push('<p class="correct-answer">✓ Question 1: Correct! Development can be determined by per capita income, average literacy level, and health status of people.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 1: Incorrect. The correct answer is (iv) all the above.</p>');
    }

    // Question 2: b) Sri Lanka
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'b') {
        score++;
        results.push('<p class="correct-answer">✓ Question 2: Correct! Sri Lanka has better performance in terms of human development than India.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 2: Incorrect. The correct answer is (ii) Sri Lanka.</p>');
    }

    // Question 3: d) Rs 6000
    const q3Answer = document.querySelector('input[name="q3"]:checked');
    if (q3Answer && q3Answer.value === 'd') {
        score++;
        results.push('<p class="correct-answer">✓ Question 3: Correct! Total income = 5000 × 4 = Rs 20,000. Income of fourth family = Rs 20,000 - (4000 + 7000 + 3000) = Rs 20,000 - Rs 14,000 = Rs 6,000.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 3: Incorrect. The correct answer is (iv) Rs 6000.</p>');
    }

    // Display results
    const scoreDisplay = document.getElementById('score-display');
    const answersReview = document.getElementById('answers-review');
    const resultsDiv = document.getElementById('quiz-results');

    scoreDisplay.innerHTML = `<h4>Your Score: ${score}/${totalQuestions}</h4>`;
    answersReview.innerHTML = results.join('');

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });

    // Show achievement if perfect score
    if (score === totalQuestions) {
        setTimeout(() => {
            showAchievement('Quiz Master', 'Perfect score! You have excellent knowledge of democratic rights.');
        }, 1000);
    } else if (score >= 3) {
        setTimeout(() => {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of democratic rights.');
        }, 1000);
    }
}

function resetQuiz() {
    // Reset current question index
    currentQuestionIndex = 0;

    // Reset radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => button.checked = false);

    // Reset select dropdowns
    const selects = document.querySelectorAll('.matching-select');
    selects.forEach(select => select.value = '');

    // Reset question styling
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });

    // Hide results
    const resultsDiv = document.getElementById('quiz-results');
    if (resultsDiv) resultsDiv.style.display = 'none';

    // Reset progress bar
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        progressFill.style.width = '33%';
        progressFill.textContent = 'Question 1 of 3';
    }

    // Reset navigation buttons explicitly
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finalActions = document.getElementById('final-actions');

    if (prevBtn) {
        prevBtn.disabled = true; // Disable Previous button on first question
        prevBtn.style.display = 'flex';
        prevBtn.style.visibility = 'visible';
    }

    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.display = 'flex'; // Show Next button
        nextBtn.style.visibility = 'visible';
    }

    if (finalActions) {
        finalActions.style.display = 'none'; // Hide final actions
        finalActions.style.visibility = 'hidden';
    }

    // Show first question
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach((q, index) => {
        if (index === 0) {
            q.classList.add('active');
            q.style.display = 'block';
            q.style.opacity = '1';
        } else {
            q.classList.remove('active');
            q.style.display = 'none';
            q.style.opacity = '0';
        }
    });

    // Update progress
    updateProgress();

    // Ensure navigation is consistent with the reset state
    updateNavigation();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quiz if we're on the activities page
    if (document.getElementById('quiz-container')) {
        initializeQuiz();
    }
});




// Toggle print mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');

    if (document.body.classList.contains('print-mode')) {
        speak("Print mode enabled. The page is now optimized for printing.");
    } else {
        speak("Print mode disabled.");
    }
}


// Function to save debate
function saveDebate() {
    // Get form elements
    const topicSelect = document.getElementById('debate-topic');
    const textareas = document.querySelectorAll('#debate .argument-section textarea');

    // Validation: Check if topic is selected
    if (!topicSelect || topicSelect.value === "0" || topicSelect.value === "") {
        showFeedback('Please select a debate topic before saving.', 'error');
        return;
    }

    // Validation: Check if at least FOR and AGAINST arguments are filled
    const forArgs = textareas[0] ? textareas[0].value.trim() : '';
    const againstArgs = textareas[1] ? textareas[1].value.trim() : '';

    if (!forArgs || !againstArgs) {
        showFeedback('Please fill in at least the FOR and AGAINST arguments before saving.', 'error');
        return;
    }

    // Confirmation prompt
    const confirmed = window.confirm('Are you sure you want to save your debate? This will record your completion.');
    if (!confirmed) {
        return;
    }

    // Save the debate
    showAchievement('Constitutional Debater', 'You completed the constitutional debate activity!');
    updateScore(15);
    showFeedback('Debate saved successfully!', 'success');

    // Optionally hide the content after saving
    // document.getElementById('debate-content').style.display = 'none';
}
// ====== Narration button toggles (per card/section) ======
// Generic helpers

function getCardElementFromButton(btn) {
  if (!btn) return null;

  // For speaker buttons, we want the specific card that contains this button
  // Walk up the DOM tree to find the card that contains this specific button
  let current = btn.parentNode;
  while (current && current !== document.body) {
    if (current.classList && (current.classList.contains('feature-card') || current.classList.contains('expandable-card')) && !current.classList.contains('letter-card')) {
      // Make sure this card contains our button
      if (current.contains(btn)) {
        return current;
      }
    }
    current = current.parentNode;
  }

  // Fallback to the old logic if we can't find the specific card
  return btn.closest('.exercise-card') || btn.closest('.feature-card') || btn.closest('.expandable-card') || btn.closest('.module');
}

function clearAllSpeakerActiveStates(exceptBtn) {
  // Remove 'active' from all speaker buttons except the current one
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach(b => {
    if (b !== exceptBtn && typeof b.className === 'string' && b.className.includes('-speaker-btn')) {
      b.classList.remove('active');
    }
  });
}

function stopAllNarration() {
  try {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      currentSpeechState = 'stopped';
      updatePlayPauseButton();
    }
  } catch (e) {
    console.error('Failed to stop narration:', e);
  }
}

 // Speak element content and manage button 'active' state (prefers only the card description)
function speakElementContentForButton(element, btn) {
  if (!element || !btn) return;

  // Prefer reading only the description inside the card to avoid noisy UI text
  const featureDesc = element.querySelector('.feature-desc');
  const cardContent = element.querySelector('.card-content');
  let text = '';

  if (featureDesc) {
    // For feature cards
    const parts = Array.from(featureDesc.querySelectorAll('p, li, .quote-text'));
    if (parts.length) {
      text = parts.map(n => (n.textContent || '').trim()).join(' ');
    } else {
      text = (featureDesc.textContent || '').trim();
    }
  } else if (cardContent) {
    // For expandable cards
    const parts = Array.from(cardContent.querySelectorAll('p, li, .quote-text'));
    if (parts.length) {
      text = parts.map(n => (n.textContent || '').trim()).join(' ');
    } else {
      text = (cardContent.textContent || '').trim();
    }
  } else {
    text = (element.textContent || '').trim();
  }

  text = text.replace(/\s+/g, ' ').trim();

  if (!text) {
    showFeedback('Nothing to read in this section.', 'error');
    return;
  }

  // Ensure any current speech is cancelled before starting a new one
  stopAllNarration();
  // Clear active state from all speaker buttons except this one
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach(b => {
      if (b !== btn && typeof b.className === 'string' && b.className.includes('-speaker-btn')) {
          b.classList.remove('active');
      }
  });
  btn.classList.add('active');

  // Respect global audio toggle
  if (!isAudioEnabled) {
    showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
    btn.classList.remove('active');
    return;
  }

  // Feature detection
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
    showFeedback('Your browser does not support speech synthesis.', 'error');
    btn.classList.remove('active');
    return;
  }

  // Mark that user has interacted (some browsers require this to allow speech)
  userInteracted = true;

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  utter.pitch = 1.0;

  utter.onstart = () => {
    currentSpeechState = 'speaking';
    updatePlayPauseButton();
  };

  const onCleanup = () => {
      // Remove active state from this specific button only
      const nhrcBtn = document.getElementById('nhrcSpeakerBtn');
      if (nhrcBtn) {
          nhrcBtn.classList.remove('active');
      }
      currentSpeechState = 'stopped';
      updatePlayPauseButton();
  };

  utter.onend = onCleanup;
  utter.onerror = (e) => {
    console.error('Speech synthesis error:', e);
    onCleanup();
  };

  try {
    // Small timeout can help after a cancel() on some browsers
    setTimeout(() => {
      window.speechSynthesis.speak(utter);
    }, 0);
  } catch (err) {
    console.error('Error speaking element content:', err);
    onCleanup();
  }
}

// Toggle handler: if the button is already active, stop narration; else read entire card content
function toggleButtonNarrationById(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  if (btn.classList.contains('active')) {
    // Turn off and stop
    btn.classList.remove('active');
    stopAllNarration();
    return;
  }

  const card = getCardElementFromButton(btn);
  if (!card) {
    showFeedback('Unable to locate the content to narrate for this section.', 'error');
    return;
  }

  speakElementContentForButton(card, btn);
}

// ====== Per-section/card toggle functions (wired from HTML onclick) ======
// Intro
function toggleIntroNarration() {
    const btn = document.getElementById('introSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use curated content instead of reading entire element
     const curatedContent = "The concept of development has always been central to human life, shaping our aspirations and guiding our vision for the future. It is not just about personal progress but also about imagining the kind of society and country we want to live in. Development raises important questions—how can life be better for all, how should people live together, and how can equality be achieved? Understanding development requires looking at history, politics, and economics, since each plays a role in shaping the way we live today. This chapter begins the journey of exploring these ideas and the role of democracy in turning hopes into reality.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        onCleanup();
    };

    try {
        window.speechSynthesis.speak(utter);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// International Covenant narration
function toggleCovenantNarration() {
    const btn = document.getElementById('covenantSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use curated content for International Covenant
    const curatedContent = "This international covenant recognises many rights that are not directly a part of the Fundamental Rights in the Indian Constitution. This has not yet become an international treaty. But human right activists all over the world see this as a standard of human rights. These include: Right to work: opportunity to everyone to earn livelihood by working. Right to safe and healthy working conditions, fair wages that can provide decent standard of living for the workers and their families. Right to adequate standard of living including adequate food, clothing and housing. Right to social security and insurance. Right to health: medical care during illness, special care for women during childbirth and prevention of epidemics. Right to education: free and compulsory primary education, equal access to higher education.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        // Don't treat 'interrupted' as a real error - it just means another speech started
        if (e.error !== 'interrupted') {
            onCleanup();
        }
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            window.speechSynthesis.speak(utter);
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Legal Rights Expansion narration
function toggleLegalRightsNarration() {
    const btn = document.getElementById('legalRightsSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use curated content for Legal Rights Expansion
    const curatedContent = "Constitution provides many more rights, which may not be Fundamental Rights. For example the right to property is not a Fundamental Right but it is a constitutional right. Right to vote in elections is an important constitutional right. Sometimes the expansion takes place in what is called human rights. These are universal moral claims that may or may not have been recognised by law. In that sense these claims are not rights going by the definition that we presented earlier. With the expansion of democracy all over the world, there is greater pressure on governments to accept these claims. Some international covenants have also contributed to the expansion of rights. Thus the scope of rights has been expanding and new rights are evolving over time. They are result of struggle of the people. New rights emerge as societies develop or as new constitutions are made. The Constitution of South Africa guarantees its citizens several kinds of new rights: Right to privacy, so that citizens or their home cannot be searched, their phones cannot be tapped, their communication cannot be opened. Right to an environment that is not harmful to their health or well-being; Right to have access to adequate housing. Right to have access to health care services, sufficient food and water; no one may be refused emergency medical treatment. Many people think that the right to work, right to health, right to minimum livelihood and right to privacy should be made fundamental rights in India as well. What do you think?";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        // Don't treat 'interrupted' as a real error - it just means another speech started
        if (e.error !== 'interrupted') {
            onCleanup();
        }
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            window.speechSynthesis.speak(utter);
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Key Terms narration
function toggleKeyTermsNarration() {
    const btn = document.getElementById('keyTermsSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use curated content for Key Terms
    const curatedContent = "Amnesty International: An international organisation of volunteers who campaign for human rights. This organisation brings out independent reports on the violation of human rights all over the world. Claim: Demand for legal or moral entitlements a person makes on fellow citizens, society or the government. Covenant: Promise made by individuals, groups or countries to uphold a rule or principle. It is legally binding on the signatories to the agreement or statement. Dalit: A person who belongs to the castes which were considered low and not touchable by others. Dalits are also known by other names such as the Scheduled Castes, Depressed Classes etc. Ethnic group: An ethnic group is a human population whose members usually identify with each other on the basis of a common ancestry. People of an ethnic group are united by cultural practices, religious beliefs and historical memories. Traffic: Selling and buying of men, women or children for immoral purposes. Summon: An order issued by a court asking a person to appear before it. Writ: A formal document containing an order of the court to the government issued only by High Court or the Supreme Court.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        // Don't treat 'interrupted' as a real error - it just means another speech started
        if (e.error !== 'interrupted') {
            onCleanup();
        }
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            window.speechSynthesis.speak(utter);
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}
// Overview
function toggleOverviewNarration() {
    const btn = document.getElementById('overviewSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use curated content instead of reading entire element
     const curatedContent = "The idea of development or progress has always been with us. We have aspirations or desires about what we would like to do and how we would like to live. Similarly, we have ideas about what a country should be like. What are the essential things that we require? Can life be better for all? How should people live together? Can there be more equality? Development involves thinking about these questions and about the ways in which we can work towards achieving these goals. This is a complex task and in this chapter we shall make a beginning at understanding development. You will learn more about these issues in greater depth in higher classes. Also, you will find answers to many of these questions not just in economics but also in your course in history and political science. This is because the way we live today is influenced by the past. We can't desire for change without being aware of this. In the same way, it is only through a democratic political process that these hopes and possibilities can be achieved in real life.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        onCleanup();
    };

    try {
        window.speechSynthesis.speak(utter);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Development Goals section
 function toggleHaryanaNarration() { toggleButtonNarrationById('haryanaSpeakerBtn'); }

 // Income and Other Goals section
 function toggleIncomeGoalsNarration() {
     const btn = document.getElementById('incomeGoalsSpeakerBtn');
     if (!btn) return;

     if (btn.classList.contains('active')) {
         // Turn off and stop
         btn.classList.remove('active');
         stopAllNarration();
         return;
     }

     const card = getCardElementFromButton(btn);
     if (!card) {
         showFeedback('Unable to locate the content to narrate for this section.', 'error');
         return;
     }

     // Use curated content for Income and Other Goals section
     const curatedContent = "If you go over Table 1.1 again, you will notice one common thing: what people desire are regular work, better wages, and decent price for their crops or other products that they produce. In other words, they want more income. Besides seeking more income, one way or the other, people also seek things like equal treatment, freedom, security, and respect of others. They resent discrimination. All these are important goals. In fact, in some cases, these may be more important than more income or more consumption because material goods are not all that you need to live. Money, or material things that one can buy with it, is one factor on which our life depends. But the quality of our life also depends on non-material things mentioned above. If it is not obvious to you, then just think of the role of your friends in your life. You may desire their friendship. Similarly, there are many things that are not easily measured but they mean a lot to our lives. These are often ignored. However, it will be wrong to conclude that what cannot be measured is not important. Consider another example. If you get a job in a far off place, before accepting it you would try to consider many factors, apart from income, such as facilities for your family, working atmosphere, or opportunity to learn. In another case, a job may give you less pay but may offer regular employment that enhances your sense of security. Another job, however, may offer high pay but no job security and also leave no time for your family. This will reduce your sense of security and freedom. Similarly, for development, people look at a mix of goals. It is true that if women are engaged in paid work, their dignity in the household and society increases. However, it is also the case that if there is respect for women there would be more sharing of housework and a greater acceptance of women working outside. A safe and secure environment may allow more women to take up a variety of jobs or run a business. Hence, the developmental goals that people have are not only about better income but also about other important things in life.";

     stopAllNarration();
     clearAllSpeakerActiveStates(btn);
     btn.classList.add('active');

     // Respect global audio toggle
     if (!isAudioEnabled) {
         showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
         btn.classList.remove('active');
         return;
     }

     if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
         showFeedback('Your browser does not support speech synthesis.', 'error');
         btn.classList.remove('active');
         return;
     }

     const utter = new SpeechSynthesisUtterance(curatedContent);
     utter.rate = 0.9;
     utter.pitch = 1.0;

     utter.onstart = () => {
         currentSpeechState = 'speaking';
         updatePlayPauseButton();
     };

     const onCleanup = () => {
         btn.classList.remove('active');
         currentSpeechState = 'stopped';
         updatePlayPauseButton();
     };

     utter.onend = onCleanup;
     utter.onerror = (e) => {
         console.error('Speech synthesis error:', e);
         // Don't treat 'interrupted' as a real error - it just means another speech started
         if (e.error !== 'interrupted') {
             onCleanup();
         }
     };

     try {
         // Force cancel any pending speech and wait a bit
         window.speechSynthesis.cancel();
         setTimeout(() => {
             window.speechSynthesis.speak(utter);
         }, 100);
     } catch (err) {
         console.error('Error speaking curated content:', err);
         onCleanup();
     }
 }

// National Development section
 function toggleNationalDevelopmentNarration() {
     const btn = document.getElementById('nationalDevelopmentSpeakerBtn');
     if (!btn) return;

     if (btn.classList.contains('active')) {
         // Turn off and stop
         btn.classList.remove('active');
         stopAllNarration();
         return;
     }

     const card = getCardElementFromButton(btn);
     if (!card) {
         showFeedback('Unable to locate the content to narrate for this section.', 'error');
         return;
     }

     // Use curated content for National Development section
     const curatedContent = "If, as we have seen above, individuals seek different goals, then their notion of national development is also likely to be different. Discuss among yourselves on what India should do for development. Most likely, you would find that different students in the class have given different answers to the above question. In fact, you might yourself think of many different answers and not be too sure of any of these. It is very important to keep in mind that different persons could have different as well as conflicting notions of a country's development. However, can all the ideas be considered equally important? Or, if there are conflicts how does one decide? What would be a fair and just path for all? We also have to think whether there is a better way of doing things. Would the idea benefit a large number of people or only a small group? National development means thinking about these questions.";

     stopAllNarration();
     clearAllSpeakerActiveStates(btn);
     btn.classList.add('active');

     // Respect global audio toggle
     if (!isAudioEnabled) {
         showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
         btn.classList.remove('active');
         return;
     }

     if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
         showFeedback('Your browser does not support speech synthesis.', 'error');
         btn.classList.remove('active');
         return;
     }

     const utter = new SpeechSynthesisUtterance(curatedContent);
     utter.rate = 0.9;
     utter.pitch = 1.0;

     utter.onstart = () => {
         currentSpeechState = 'speaking';
         updatePlayPauseButton();
     };

     const onCleanup = () => {
         btn.classList.remove('active');
         currentSpeechState = 'stopped';
         updatePlayPauseButton();
     };

     utter.onend = onCleanup;
     utter.onerror = (e) => {
         console.error('Speech synthesis error:', e);
         // Don't treat 'interrupted' as a real error - it just means another speech started
         if (e.error !== 'interrupted') {
             onCleanup();
         }
     };

     try {
         // Force cancel any pending speech and wait a bit
         window.speechSynthesis.cancel();
         setTimeout(() => {
             window.speechSynthesis.speak(utter);
         }, 100);
     } catch (err) {
         console.error('Error speaking curated content:', err);
         onCleanup();
     }
 }

// How to Compare Different Countries or States section
 function toggleCompareCountriesNarration() {
     const btn = document.getElementById('compareCountriesSpeakerBtn');
     if (!btn) return;

     if (btn.classList.contains('active')) {
         // Turn off and stop
         btn.classList.remove('active');
         stopAllNarration();
         return;
     }

     const card = getCardElementFromButton(btn);
     if (!card) {
         showFeedback('Unable to locate the content to narrate for this section.', 'error');
         return;
     }

     // Use curated content for How to Compare Different Countries or States section
     const curatedContent = "You might ask if development can mean different things, how come some countries are generally called developed and others under-developed? Before we come to this, let us consider another question. When we compare different things, they could have similarities as well as differences. Which aspects do we use to compare them? Let us look at students in the class itself. How do we compare different students? They differ in their height, health, talents and interests. The healthiest student may not be the most studious one. The most intelligent student may not be the friendliest one. So, how do we compare students? The criterion we may use depends on the purpose of comparison. We use different criterion to choose a sports team, a debate team, a music team or a team to organise a picnic. Still, if for some purpose, we have to choose the criterion for the all-round progress of children in the class, how shall we do it? Usually we take one or more important characteristics of persons and compare them based on these characteristics. Of course, there can be differences about what are important characteristics that should form the basis of comparison: friendliness and spirit of cooperation, creativity or marks secured? This is true of development too. For comparing countries, their income is considered to be one of the most important attributes. Countries with higher income are more developed than others with less income. This is based on the understanding that more income means more of all things that human beings need. Whatever people like, and should have, they will be able to get with greater income. So, greater income itself is considered to be one important goal. Now, what is the income of a country? Intuitively, the income of the country is the income of all the residents of the country. This gives us the total income of the country. However, for comparison between countries, total income is not such an useful measure. Since, countries have different populations, comparing total income will not tell us what an average person is likely to earn. Are people in one country better off than others in a different country? Hence, we compare the average income which is the total income of the country divided by its total population. The average income is also called per capita income. In World Development Reports, brought out by the World Bank, this criterion is used in classifying countries. Countries with per capita income of US$ 63,400 per annum and above in 2023, are called high income or rich countries and those with per capita income of about US$ 2400 or less are called low-income countries. India comes in the category of low middle income countries because its per capita income in 2023 was just about US$10030 per annum. The rich countries, excluding countries of Middle East and certain other small countries, are generally called developed countries.";

     stopAllNarration();
     clearAllSpeakerActiveStates(btn);
     btn.classList.add('active');

     // Respect global audio toggle
     if (!isAudioEnabled) {
         showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
         btn.classList.remove('active');
         return;
     }

     if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
         showFeedback('Your browser does not support speech synthesis.', 'error');
         btn.classList.remove('active');
         return;
     }

     const utter = new SpeechSynthesisUtterance(curatedContent);
     utter.rate = 0.9;
     utter.pitch = 1.0;

     utter.onstart = () => {
         currentSpeechState = 'speaking';
         updatePlayPauseButton();
     };

     const onCleanup = () => {
         btn.classList.remove('active');
         currentSpeechState = 'stopped';
         updatePlayPauseButton();
     };

     utter.onend = onCleanup;
     utter.onerror = (e) => {
         console.error('Speech synthesis error:', e);
         // Don't treat 'interrupted' as a real error - it just means another speech started
         if (e.error !== 'interrupted') {
             onCleanup();
         }
     };

     try {
         // Force cancel any pending speech and wait a bit
         window.speechSynthesis.cancel();
         setTimeout(() => {
             window.speechSynthesis.speak(utter);
         }, 100);
     } catch (err) {
         console.error('Error speaking curated content:', err);
         onCleanup();
     }
 }

// Income and Other Criteria section
 function toggleIncomeOtherNarration() {
     const btn = document.getElementById('incomeOtherSpeakerBtn');
     if (!btn) return;

     if (btn.classList.contains('active')) {
         // Turn off and stop
         btn.classList.remove('active');
         stopAllNarration();
         return;
     }

     const card = getCardElementFromButton(btn);
     if (!card) {
         showFeedback('Unable to locate the content to narrate for this section.', 'error');
         return;
     }

     // Use curated content for Income and Other Criteria section
     const curatedContent = "When we looked at individual aspirations and goals, we found that people not only think of better income but also have goals such as security, respect for others, equal treatment, freedom, etc. in mind. Similarly, when we think of a nation or a region, we may, besides average income, think of other equally important attributes. INCOME AND OTHER CRITERIA What could these attributes be? Let us examine this through an example. Table 1.3 gives the per capita income of Haryana, Kerala and Bihar. Actually, these figures are of Per Capita Net State Domestic Product at Current Prices for 2021–22. Let us ignore what this complicated term exactly means. Roughly, we can take it to be the per capita income of the state. We find that of the three, Haryana has the highest per capita income and Bihar is at the bottom. This means that, on an average, a person in Haryana earned Rs 2,64,729 in one year whereas, on an average, a person in Bihar earned only around Rs 47,500. So, if per capita income were to be used as the measure of development, Haryana will be considered the most developed and Bihar the least developed state of the three. Now, let us look at certain other data pertaining to these states given in Table 1.4. What does this table show? The first column of the table shows that in Kerala, out of 1000 children born, 6 died before completing one year of age but in Haryana the proportion of children dying within one year of birth was 28, which is nearly three times more than that of Kerala. On the other hand, the per capita income of Haryana is more than that of Kerala as shown in Table 1.3. Just think of how dear you are to your parents, think of how every one is so happy when a child is born. Now, try to think of parents whose children die before they even celebrate their first birthday. How painful it must be to these parents? Next, note the year to which this data pertains. This was during 2018. So we are not talking of old times; it is 70 years after independence when our metro cities are full of high rise buildings and shopping malls! The problem does not end with Infant Mortality Rate. The last column of table 1.4 shows that about one-third of the children aged 15–17 years in Bihar are not attending school in secondary classes. This means that if you went to school in Bihar nearly one-third of your class friends would be missing. Those who could have been in school are not there! If this had happened to you, you would not be able to read what you are reading now.";

     stopAllNarration();
     clearAllSpeakerActiveStates(btn);
     btn.classList.add('active');

     // Respect global audio toggle
     if (!isAudioEnabled) {
         showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
         btn.classList.remove('active');
         return;
     }

     if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
         showFeedback('Your browser does not support speech synthesis.', 'error');
         btn.classList.remove('active');
         return;
     }

     const utter = new SpeechSynthesisUtterance(curatedContent);
     utter.rate = 0.9;
     utter.pitch = 1.0;

     utter.onstart = () => {
         currentSpeechState = 'speaking';
         updatePlayPauseButton();
     };

     const onCleanup = () => {
         btn.classList.remove('active');
         currentSpeechState = 'stopped';
         updatePlayPauseButton();
     };

     utter.onend = onCleanup;
     utter.onerror = (e) => {
         console.error('Speech synthesis error:', e);
         // Don't treat 'interrupted' as a real error - it just means another speech started
         if (e.error !== 'interrupted') {
             onCleanup();
         }
     };

     try {
         // Force cancel any pending speech and wait a bit
         window.speechSynthesis.cancel();
         setTimeout(() => {
             window.speechSynthesis.speak(utter);
         }, 100);
     } catch (err) {
         console.error('Error speaking curated content:', err);
         onCleanup();
     }
 }

// Public Facilities section
 function togglePublicFacilitiesNarration() {
     const btn = document.getElementById('publicFacilitiesSpeakerBtn');
     if (!btn) return;

     if (btn.classList.contains('active')) {
         // Turn off and stop
         btn.classList.remove('active');
         stopAllNarration();
         return;
     }

     const card = getCardElementFromButton(btn);
     if (!card) {
         showFeedback('Unable to locate the content to narrate for this section.', 'error');
         return;
     }

     // Use curated content for Public Facilities section
     const curatedContent = "How is it that the average person in Haryana has more income than the average person in Kerala but lags behind in these crucial areas? The reason is — money in your pocket cannot buy all the goods and services that you may need to live well. So, income by itself is not a completely adequate indicator of material goods and services that citizens are able to use. For example, normally, your money cannot buy you a pollution-free environment or ensure that you get unadulterated medicines, unless you can afford to shift to a community that already has all these things. Money may also not be able to protect you from infectious diseases, unless the whole of your community takes preventive steps. Actually for many of the important things in life the best way, also the cheapest way, is to provide these goods and services collectively. Just think – will it be cheaper to have collective security for the whole locality or for each house to have its own security staff? What if no one, other than you, in your village or locality is interested in studying? Would you be able to study? Not unless your parents could afford to send you to some private school elsewhere. So you are actually able to study because many other children also want to study and because many people believe that the government should open schools and provide other facilities so that all children have a chance to study. Even now, in many areas, children, particularly girls, are not able to go to high school because the government/society has not provided adequate facilities. Kerala has a low Infant Mortality Rate because it has adequate provision of basic health and educational facilities. Similarly, in some states, the Public Distribution System (PDS) functions well. Health and nutritional status of people of such states is certainly likely to be better. Isn't it surprising that a small country in our neighbourhood, Sri Lanka, is much ahead of India in every respect and a big country like ours has such a low rank in the world? Table 1.6 also shows that though Nepal and Bangladesh have low per capita income than that of India, yet they are better than India in life expectancy. Many improvements have been suggested in calculating HDI and many new components have been added to the Human Development Report but, by pre-fixing Human to Development, it has made it very clear that what is important in development is what is happening to citizens of a country. It is people, their health, their well being, that is most important. Do you think there are certain other aspects that should be considered in measuring human development? HUMAN DEVELOPMENT REPORT Once it is realised that even though the level of income is important, yet it is an inadequate measure of the level of development, we begin to think of other criterion. There could be a long list of such criterion but then it would not be so useful. What we need is a small number of the most important things. Health and education indicators, such as the ones we used in comparison of Kerala and Haryana, are among them. Over the past decade or so, health and education indicators have come to be widely used along with income as a measure of development. For instance, Human Development Report published by UNDP compares countries based on the educational levels of the people, their health status and per capita income. It would be interesting to look at certain relevant data regarding India and its neighbours from Human Development Report 2023-24.";

     stopAllNarration();
     clearAllSpeakerActiveStates(btn);
     btn.classList.add('active');

     // Respect global audio toggle
     if (!isAudioEnabled) {
         showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
         btn.classList.remove('active');
         return;
     }

     if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
         showFeedback('Your browser does not support speech synthesis.', 'error');
         btn.classList.remove('active');
         return;
     }

     const utter = new SpeechSynthesisUtterance(curatedContent);
     utter.rate = 0.9;
     utter.pitch = 1.0;

     utter.onstart = () => {
         currentSpeechState = 'speaking';
         updatePlayPauseButton();
     };

     const onCleanup = () => {
         btn.classList.remove('active');
         currentSpeechState = 'stopped';
         updatePlayPauseButton();
     };

     utter.onend = onCleanup;
     utter.onerror = (e) => {
         console.error('Speech synthesis error:', e);
         // Don't treat 'interrupted' as a real error - it just means another speech started
         if (e.error !== 'interrupted') {
             onCleanup();
         }
     };

     try {
         // Force cancel any pending speech and wait a bit
         window.speechSynthesis.cancel();
         setTimeout(() => {
             window.speechSynthesis.speak(utter);
         }, 100);
     } catch (err) {
         console.error('Error speaking curated content:', err);
         onCleanup();
     }
 }

// Sustainability of Development section
 function toggleSustainabilityNarration() {
     const btn = document.getElementById('sustainabilitySpeakerBtn');
     if (!btn) return;

     if (btn.classList.contains('active')) {
         // Turn off and stop
         btn.classList.remove('active');
         stopAllNarration();
         return;
     }

     const card = getCardElementFromButton(btn);
     if (!card) {
         showFeedback('Unable to locate the content to narrate for this section.', 'error');
         return;
     }

     // Use curated content for Sustainability of Development section
     const curatedContent = "Suppose for the present that a particular country is quite developed. We would certainly like this level of development to go up further or at least be maintained for future generations. This is obviously desirable. However, since the second half of the twentieth century, a number of scientists have been warning that the present type, and levels, of development are not sustainable. We have not inherited the world from our forefathers — we have borrowed it from our children. LET'S UNDERSTAND WHY THIS IS SO THROUGH THE FOLLOWING EXAMPLES - Example 1: Groundwater in India. Recent evidence suggests that the groundwater is under serious threat of overuse in many parts of the country. About 300 districts have reported a water level decline of over 4 metres during the past 20 years. Nearly one-third of the country is overusing their groundwater reserves. In another 25 years, 60 per cent of the country would be doing the same if the present way of using this resource continues. Groundwater overuse is particularly found in the agriculturally prosperous regions of Punjab and Western U.P., hard rock plateau areas of central and south India, some coastal areas and the rapidly growing urban settlements. Groundwater is an example of renewable resources. These resources are replenished by nature as in the case of crops and plants. However, even these resources may be overused. For example, in the case of groundwater, if we use more than what is being replenished by rain then we would be overusing this resource. Non-renewable resources are those which will get exhausted after a few years of use. We have a fixed stock on earth which cannot be replenished. We do discover new resources that we did not know of earlier. New sources in this way add to the stock. However, over time, even this will get exhausted. The table gives an estimate of reserves of crude oil. More important, it also tells us for how many years the stock of crude oil will last if people continue to extract it at the present rate. The reserves would last only 50 years more. This is for the world as a whole. However, different countries face different situations. Countries like India depend on importing oil from abroad because they do not have enough stocks of their own. If prices of oil increase this becomes a burden for everyone. There are countries like USA which have low reserves and hence want to secure oil through military or economic power. The question of sustainability of development raises many fundamentally new issues about the nature and process of development. Consequences of environmental degradation do not respect national or state boundaries; this issue is no longer region or nation specific. Our future is linked together. Sustainability of development is comparatively a new area of knowledge in which scientists, economists, philosophers and other social scientists are working together. In general, the question of development or progress is perennial. At all times as a member of society and as individuals we need to ask where we want to go, what we wish to become and what our goals are. So the debate on development continues.";

     stopAllNarration();
     clearAllSpeakerActiveStates(btn);
     btn.classList.add('active');

     // Respect global audio toggle
     if (!isAudioEnabled) {
         showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
         btn.classList.remove('active');
         return;
     }

     if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
         showFeedback('Your browser does not support speech synthesis.', 'error');
         btn.classList.remove('active');
         return;
     }

     const utter = new SpeechSynthesisUtterance(curatedContent);
     utter.rate = 0.9;
     utter.pitch = 1.0;

     utter.onstart = () => {
         currentSpeechState = 'speaking';
         updatePlayPauseButton();
     };

     const onCleanup = () => {
         btn.classList.remove('active');
         currentSpeechState = 'stopped';
         updatePlayPauseButton();
     };

     utter.onend = onCleanup;
     utter.onerror = (e) => {
         console.error('Speech synthesis error:', e);
         // Don't treat 'interrupted' as a real error - it just means another speech started
         if (e.error !== 'interrupted') {
             onCleanup();
         }
     };

     try {
         // Force cancel any pending speech and wait a bit
         window.speechSynthesis.cancel();
         setTimeout(() => {
             window.speechSynthesis.speak(utter);
         }, 100);
     } catch (err) {
         console.error('Error speaking curated content:', err);
         onCleanup();
     }
 }

// What Development Promises section
 function toggleSouthAfricaNarration() {
    const btn = document.getElementById('southAfricaSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use curated content for What Development Promises section
    const curatedContent = "Let us try to imagine what development or progress is likely to mean to different persons listed in Table 1.1. What are their aspirations? You will find that some columns are partially filled. Try to complete the table. You can also add any other category of persons. Having filled Table 1.1, let us now examine it. Do all of these persons have the same notion of development or progress? Most likely not. Each one of them seeks different things. They seek things that are most important for them, i.e., that which can fulfil their aspirations or desires. In fact, at times, two persons or groups of persons may seek things which are conflicting. A girl expects as much freedom and opportunity as her brother, and that he also shares in the household work. Her brother may not like this. Similarly, to get more electricity, industrialists may want more dams. But this may submerge the land and disrupt the lives of people who are displaced – such as tribals. They might resent this and may prefer small check dams or tanks to irrigate their land. So, two things are quite clear: one, different persons can have different developmental goals and two, what may be development for one may not be development for the other. It may even be destructive for the other.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        // Don't treat 'interrupted' as a real error - it just means another speech started
        if (e.error !== 'interrupted') {
            onCleanup();
        }
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            window.speechSynthesis.speak(utter);
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}
function toggleSaudiNarration() { toggleButtonNarrationById('saudiSpeakerBtn'); }
function toggleKosovoNarration() { toggleButtonNarrationById('kosovoSpeakerBtn'); }
function toggleWhyElectionsNarration() { toggleButtonNarrationById('whyelectionsSpeakerBtn'); }
function toggleDemocraticNarration() { toggleButtonNarrationById('democraticSpeakerBtn'); }

// Parliament section cards
function toggleParliamentNarration() { toggleButtonNarrationById('parliamentSpeakerBtn'); }
function toggleHousesNarration() { toggleButtonNarrationById('housesSpeakerBtn'); }

// Political Executive cards
function togglePoliticalNarration() { toggleButtonNarrationById('politicalSpeakerBtn'); }
function toggleCouncilNarration() {
    const btn = document.getElementById('councilSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    // Test with simple text first to verify speech synthesis works
    const testText = "Freedom means absence of constraints. In practical life it means absence of interference in our affairs by others – be it other individuals or the government. We want to live in society, but we want to be free. We want to do things in the way we want to do them. Others should not dictate us what we should do. So, under the Indian Constitution all citizens have the right to Freedom of speech and expression, Assembly in a peaceful manner, Form associations and unions, Move freely throughout the country, Reside in any part of the country, and Practice any profession, or to carry on any occupation, trade or business.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(testText);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        onCleanup();
    };

    try {
        window.speechSynthesis.speak(utter);
    } catch (err) {
        console.error('Error speaking test content:', err);
        onCleanup();
    }
}
function togglePowersNarration() { toggleButtonNarrationById('powersSpeakerBtn'); }
function togglePresidentNarration() { toggleButtonNarrationById('presidentSpeakerBtn'); }
function togglePresidentialNarration() { toggleButtonNarrationById('presidentialSpeakerBtn'); }

// Judiciary module - narration removed

// Important Terms
function toggleTermsNarration() { toggleButtonNarrationById('termsSpeakerBtn'); }

// Expanding Rights (Values) module - narration removed

// National Human Rights Commission
function toggleNHRCNarration() {
    const btn = document.getElementById('nhrcSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use curated content for NHRC
    const curatedContent = "Many cases of human rights violations in diverse fields are being brought to the public notice from across India. Human rights organisations and the media often criticise government agencies for not seriously pursuing these cases or catching the culprits. Someone had to intervene on behalf of the victims. This is where the National Human Rights Commission stepped in. This is an independent commission set up by law in 1993. Like judiciary, the Commission is independent of the government. The Commission is appointed by the President and includes retired judges, officers and eminent citizens. Yet it does not have the burden of deciding court cases. So it can focus on helping the victims secure their human rights. These include all the rights granted to the citizens by the Constitution. For NHRC human rights also include the rights mentioned in the UN sponsored international treaties that India has signed. The NHRC cannot by itself punish the guilty. That is the responsibility of courts. The NHRC is there to make independent and credible inquiry into any case of violation of human rights. It also inquires into any case of abetment of such violation or negligence in controlling it by any government officer and takes other general steps to promote human rights in the country. The Commission presents its findings and recommendations to the government or intervene in the court on behalf of the victims. It has wide ranging powers to carry out its inquiry. Like any court it can summon witnesses, question any government official, demand any official paper, visit any prison for inspection or send its own team for on-the-spot inquiry. Any citizen of India can write a letter to this address to complain against the violation of human rights: National Human Rights Commission, G.P.O. Complex, INA, New Delhi 110023. There is no fee or any formal procedure to approach the NHRC. Like NHRC, there are State Human Rights Commissions in all the 28 states of the country.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        // Don't treat 'interrupted' as a real error - it just means another speech started
        if (e.error !== 'interrupted') {
            onCleanup();
        }
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            window.speechSynthesis.speak(utter);
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Right to Constitutional Remedies narration
function toggleJudiciaryNarration() {
    const btn = document.getElementById('judiciarySpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use curated content for Right to Constitutional Remedies
    const curatedContent = "How can we secure these rights? If rights are like guarantees, they are of no use if there is no one to honour them. The fundamental rights in the Constitution are important because they are enforceable. We have a right to seek the enforcement of the above mentioned rights. This is called the Right to Constitutional Remedies. This itself is a Fundamental Right. This right makes other rights effective. It is possible that sometimes our rights may be violated by fellow citizens, private bodies or by the government. When any of our rights are violated we can seek remedy through courts. If it is a Fundamental Right we can directly approach the Supreme Court or the High Court of a state. That is why Dr. Ambedkar called the Right to Constitutional Remedies, 'the heart and soul' of our Constitution. Fundamental Rights are guaranteed against the actions of the Legislatures, the Executive, and any other authorities instituted by the government. There can be no law or action that violates the Fundamental Rights. If any act of the Legislature or the Executive takes away or limits any of the Fundamental Rights it will be invalid. We can challenge such laws of the central and state governments, the policies and actions of the government or the governmental organisations like the nationalised banks or electricity boards. Courts also enforce the Fundamental Rights against private individuals and bodies. The Supreme Court and High Courts have the power to issue directions, orders or writs for the enforcement of the Fundamental Rights. They can also award compensation to the victims and punishment to the violators. We have already seen in Chapter 4 that the judiciary in our country is independent of the government and the parliament. We also noted that our judiciary is very powerful and can do whatever is needed to protect the rights of the citizens. In case of any violation of a Fundamental Right the aggrieved person can go to a court for remedy. But now, any person can go to court against the violation of the Fundamental Right, if it is of social or public interest. It is called Public Interest Litigation (PIL). Under the PIL any citizen or group of citizens can approach the Supreme Court or a High Court for the protection of public interest against a particular law or action of the government. One can write to the judges even on a postcard. The court will take up the matter if the judges find it in public interest.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    utter.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utter.onend = onCleanup;
    utter.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        // Don't treat 'interrupted' as a real error - it just means another speech started
        if (e.error !== 'interrupted') {
            onCleanup();
        }
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            window.speechSynthesis.speak(utter);
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}