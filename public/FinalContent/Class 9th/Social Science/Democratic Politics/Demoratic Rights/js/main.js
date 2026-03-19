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
    if (completedModules === 7) { // All 7 modules including intro
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
            speak("What truly makes a democracy work? Is it only about electing leaders and having laws in place, or is there something deeper? Democracy cannot survive on elections and institutions alone — it also needs the assurance of rights. Rights protect people from misuse of power and guarantee freedoms that make life dignified and fair. In this lesson, we'll look at what life would be like without rights, why rights are essential in a democracy, and how they are protected in India. We'll also explore each Fundamental Right in our Constitution and see how citizens can use them. Let's begin our journey to understand why rights are the very heart of democracy.");
            break;
            
        case 'overview':
            speak("In this overview, we'll explore the importance of democratic rights and how they complete the framework of a democratic government.");
            break;
            
        case 'southafrica':
            speak("This section explores real-life examples of what it means to live without rights, including cases from Guantanamo Bay, Saudi Arabia, and Kosovo.");
            break;
            
        case 'whyconstitution':
            speak("Rights in a democracy are essential for protecting citizens and ensuring fair governance. This section explores what rights are and why they are crucial in democratic societies.");
            break;
            
        case 'indianconstitution':
            speak("Explore the fundamental rights guaranteed by the Indian Constitution and understand how citizens can secure and enforce these rights.");
            break;
            
        case 'values':
            speak("Explore how the scope of rights has expanded beyond fundamental rights, including new legal rights, constitutional rights, and emerging human rights.");
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
    
    showAchievement('Journey Begins', 'You started your learning journey with Democratic Rights!');
    speak("Welcome to the interactive lesson on Democratic Rights. Let's begin by understanding the importance of rights in democratic societies.");
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
const totalQuestions = 5;

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
    let totalQuestions = 5;
    let results = [];

    // Question 1: d) Parents' property is inherited by their children
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'd') {
        score++;
        results.push('<p class="correct-answer">✓ Question 1: Correct! Parents\' property inheritance is not a fundamental right.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 1: Incorrect. The correct answer is d) Parents\' property is inherited by their children (not a fundamental right).</p>');
    }

    // Question 2: b) Freedom to participate in armed revolution
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'b') {
        score++;
        results.push('<p class="correct-answer">✓ Question 2: Correct! Armed revolution is not a fundamental right.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 2: Incorrect. The correct answer is b) Freedom to participate in armed revolution.</p>');
    }

    // Question 3: c) Right to protect one's culture
    const q3Answer = document.querySelector('input[name="q3"]:checked');
    if (q3Answer && q3Answer.value === 'c') {
        score++;
        results.push('<p class="correct-answer">✓ Question 3: Correct! Cultural protection is a fundamental right under Cultural and Educational Rights.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 3: Incorrect. The correct answer is c) Right to protect one\'s culture.</p>');
    }

    // Question 4: Matching answers
    let matchingScore = 0;
    const matchingAnswers = {
        'a': 'religion', // Freedom to propagate religion
        'b': 'freedom',  // Right to life
        'c': 'equality', // Abolition of untouchability
        'd': 'exploitation' // Ban on bonded labour
    };

    const matchingItems = document.querySelectorAll('.matching-item');
    matchingItems.forEach((item, index) => {
        const select = item.querySelector('.matching-select');
        const questionKey = String.fromCharCode(97 + index); // a, b, c, d
        const correctAnswer = matchingAnswers[questionKey];
        const userAnswer = select.value;

        if (userAnswer === correctAnswer) {
            matchingScore++;
        }
    });

    if (matchingScore === 4) {
        score++;
        results.push('<p class="correct-answer">✓ Question 4: All matching answers correct!</p>');
    } else {
        results.push(`<p class="wrong-answer">✗ Question 4: ${matchingScore}/4 matching answers correct. Correct matches: a) Right to Freedom of Religion, b) Right to Freedom, c) Right to Equality, d) Right against Exploitation.</p>`);
    }

    // Question 5: a) Every country that is a democracy gives rights to its citizens
    const q5Answer = document.querySelector('input[name="q5"]:checked');

    if (q5Answer && q5Answer.value === 'a') {
        score++;
        results.push('<p class="correct-answer">✓ Question 5: Correct! Democracies inherently provide rights to citizens.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 5: Incorrect. The correct answer is a) Every country that is a democracy gives rights to its citizens.</p>');
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
        progressFill.style.width = '20%';
        progressFill.textContent = 'Question 1 of 5';
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
    const curatedContent = "What truly makes a democracy work? Is it only about electing leaders and having laws in place, or is there something deeper? Democracy cannot survive on elections and institutions alone — it also needs the assurance of rights. Rights protect people from misuse of power and guarantee freedoms that make life dignified and fair. In this lesson, we'll look at what life would be like without rights, why rights are essential in a democracy, and how they are protected in India. We'll also explore each Fundamental Right in our Constitution and see how citizens can use them. Let's begin our journey to understand why rights are the very heart of democracy.";

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
    const curatedContent = "In the previous two chapters we have looked at two major elements of a democratic government. In Chapter 3 we saw how a democratic government has to be periodically elected by the people in a free and fair manner. In Chapter 4 we learnt that a democracy must be based on institutions that follow certain rules and procedures. These elements are necessary but not sufficient for a democracy. Elections and institutions need to be combined with a third element – enjoyment of rights – to make a government democratic. Even the most properly elected rulers working through the established institutional process must learn not to cross some limits. Citizens' democratic rights set those limits in a democracy. This is what we take up in this final chapter of the book. We begin by discussing some real life cases to imagine what it means to live without rights. This leads to a discussion on what we mean by rights and why do we need them. As in the previous chapters, the general discussion is followed by a focus on India. We discuss one by one the Fundamental Rights in the Indian Constitution. Then we turn to how these rights can be used by ordinary citizens. Who will protect and enforce them? Finally we take a look at how the scope of rights has been expanding.";

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

// Life Without Rights cards
function toggleHaryanaNarration() { toggleButtonNarrationById('haryanaSpeakerBtn'); }
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

// Rights in a Democracy narration
function toggleWhyConstitutionNarration() {
    const btn = document.getElementById('whyConstitutionSpeakerBtn');
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

    // Use curated content for Rights in a Democracy
    const curatedContent = "Think of all the examples that we have discussed so far. Think of the victims in each example: the prisoners in Guantanamo Bay, women in Saudi Arabia, Albanians in Kosovo. If you were in their position, what would you have wished? If you could, what would you do to ensure that such things do not happen to anyone? You would perhaps desire a system where security, dignity and fair play are assured to everyone. You might want, for example, that no one should be arrested without proper reason and information. And if someone is arrested, he or she should have a fair chance to defend themselves. You might agree that such assurance cannot apply to everything. One has to be reasonable in what one expects and demands of everyone else, for one has to grant the same to everyone. But you might insist that the assurance does not remain on paper, that there is someone to enforce these assurances, that those who violate these are punished. In other words, you might want a system where at least a minimum is guaranteed to everyone – powerful or weak, rich or poor, majority or minority. This is the spirit behind thinking about rights.";

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

// Rights in the Indian Constitution narration
function toggleIndianConstitutionNarration() {
    const btn = document.getElementById('indianConstitutionSpeakerBtn');
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

    // Use curated content for Rights in the Indian Constitution
    const curatedContent = "In India, like most other democracies in the world, these rights are mentioned in the Constitution. Some rights which are fundamental to our life are given a special status. They are called Fundamental Rights. We have already read in Chapter 2 the preamble to our Constitution. It talks about securing for all its citizens equality, liberty and justice. Fundamental Rights put this promise into effect. They are an important basic feature of India's Constitution. You already know our Constitution provides for six Fundamental Rights. Can you recall these? What exactly do these rights mean for an ordinary citizen? Let us look at these one by one.";

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

// Expanding Scope of Rights narration
function toggleExpandingRightsNarration() {
    const btn = document.getElementById('expandingRightsSpeakerBtn');
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

    // Use curated content for Expanding Scope of Rights
    const curatedContent = "We began this chapter by discussing the significance of rights. In much of the chapter we have focussed only on Fundamental Rights in the Constitution. You might think that Fundamental Rights granted by the Constitution are the only rights citizen have. This is not true. While Fundamental Rights are the source of all rights, our Constitution and law offers a wider range of rights. Over the years the scope of rights has expanded. Sometimes it leads to expansion in the legal rights that the citizen can enjoy. From time to time, the courts gave judgments to expand the scope of rights. Certain rights like right to freedom of press, right to information, and right to education are derived from the Fundamental Rights. Now school education has become a right for Indian citizens. The governments are responsible for providing free and compulsory education to all children up to the age of 14 years. Parliament has enacted a law giving the right to information to the citizens. This Act was made under the Fundamental Right to freedom of thought and expression. We have a right to seek information from government offices. Recently the Supreme Court has expanded the meaning of the right to life to include the right to food. Also, rights are not limited only to Fundamental Rights as enumerated in the Constitution.";

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