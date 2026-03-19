// Main JavaScript for Constitutional Design Interactive Lesson

// Global variables for tracking progress
let moduleProgress = {
    intro: false,
    overview: false,
    southafrica: false,
    whyconstitution: false,
    indianconstitution: false,
    values: false,
    formalsector: false,
    selfhelp: false,
    summingup: false,
    activities: false
};

// Module order for progress calculation
const moduleOrder = ['intro', 'overview', 'southafrica', 'whyconstitution', 'indianconstitution', 'values', 'formalsector', 'selfhelp', 'summingup', 'activities'];

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
    if (completedModules === 10) { // All 10 modules including intro
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
            speak("Welcome to Money and Credit. This chapter introduces us to the concept of money, its modern forms, and the importance of credit in ensuring equal opportunities for development.");
            break;
            
        case 'overview':
            speak("Money serves as a medium of exchange in our economy. It eliminates the need for double coincidence of wants that exists in barter systems. When money is used, people can easily exchange goods and services, making transactions much simpler and more efficient than direct barter.");
            break;
            
        case 'southafrica':
            speak("Modern forms of money include currency and bank deposits. Currency consists of paper notes and coins issued by the Reserve Bank of India, while bank deposits offer interest and can be used for transactions through cheques, making them an essential part of the modern money system.");
            break;
            
        case 'whyconstitution':
            speak("Banks play a vital role in the economy by accepting deposits and using them to provide loans. They act as a link between depositors with surplus funds and borrowers in need, earning income through the interest rate difference.");
            break;
            
        case 'indianconstitution':
            speak("Credit plays a vital role in our economy, but its impact depends on the situation. This section explores two different credit scenarios - one where credit helps increase earnings and another where it leads to a debt trap.");
            break;
            
        case 'values':
            speak("A loan agreement not only requires repayment of the principal with interest but often also involves collateral as security. Collateral serves as a safeguard for lenders, allowing them to recover their money by selling the borrower's asset if the loan is not repaid.");
            break;

        case 'formalsector':
            speak("Formal sector credit in India includes loans from banks and cooperatives, while informal sector loans come from moneylenders, traders, and others. The Reserve Bank of India supervises formal lenders to ensure fair practices and monitors their lending activities, interest rates, and borrower coverage.");
            break;

        case 'selfhelp':
            speak("Self-Help Groups organize rural poor, especially women, into small groups that pool savings and provide loans to members at reasonable rates. This approach helps overcome the lack of collateral and provides financial self-reliance while also addressing social issues.");
            break;

        case 'summingup':
            speak("This chapter explored modern forms of money and their connection to the banking system, the importance of credit in economic activities, and the need for increased formal sector credit to reduce dependence on expensive informal sources.");
            break;

        case 'activities':
            speak("Test your knowledge and understanding with these interactive activities about Money and Credit.");
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
    
    showAchievement('Journey Begins', 'You started your learning journey with Money and Credit!');
    speak("Welcome to the interactive lesson on Money and Credit. Let's begin by understanding the evolution and importance of money in modern economies.");
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
    const currencySpeakerContainer = card.querySelector('.haryana-speaker-container');
    const depositsSpeakerContainer = card.querySelector('.saudi-speaker-container');
    const kosovoSpeakerContainer = card.querySelector('.kosovo-speaker-container');
    const parliamentSpeakerContainer = card.querySelector('.parliament-speaker-container');
    const housesSpeakerContainer = card.querySelector('.houses-speaker-container');
    const valuesSpeakerContainer = card.querySelector('.values-speaker-container');
    const covenantSpeakerContainer = card.querySelector('.covenant-speaker-container');
    const formalsectorSpeakerContainer = card.querySelector('.formalsector-speaker-container');
    const selfhelpSpeakerContainer = card.querySelector('.selfhelp-speaker-container');
    const summingupSpeakerContainer = card.querySelector('.summingup-speaker-container');

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
        if (currencySpeakerContainer) {
            currencySpeakerContainer.style.display = 'flex';
        }
        if (depositsSpeakerContainer) {
            depositsSpeakerContainer.style.display = 'flex';
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
        if (formalsectorSpeakerContainer) {
            formalsectorSpeakerContainer.style.display = 'flex';
        }
        if (selfhelpSpeakerContainer) {
            selfhelpSpeakerContainer.style.display = 'flex';
        }
        if (summingupSpeakerContainer) {
            summingupSpeakerContainer.style.display = 'flex';
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
                // Stop narration and remove active state without triggering other narrations
                saudiBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (currencySpeakerContainer) {
            const currencyBtn = currencySpeakerContainer.querySelector('.haryana-speaker-btn');
            if (currencyBtn && currencyBtn.classList.contains('active')) {
                currencyBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (depositsSpeakerContainer) {
            const depositsBtn = depositsSpeakerContainer.querySelector('.saudi-speaker-btn');
            if (depositsBtn && depositsBtn.classList.contains('active')) {
                depositsBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (kosovoSpeakerContainer) {
            const kosovoBtn = kosovoSpeakerContainer.querySelector('.kosovo-speaker-btn');
            if (kosovoBtn && kosovoBtn.classList.contains('active')) {
                // Stop narration and remove active state without triggering other narrations
                kosovoBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (parliamentSpeakerContainer) {
            const parliamentBtn = parliamentSpeakerContainer.querySelector('.parliament-speaker-btn');
            if (parliamentBtn && parliamentBtn.classList.contains('active') && parliamentBtn.id === 'parliamentSpeakerBtn') {
                // Stop narration and remove active state without triggering other narrations
                parliamentBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (housesSpeakerContainer) {
            const housesBtn = housesSpeakerContainer.querySelector('.houses-speaker-btn');
            if (housesBtn && housesBtn.classList.contains('active')) {
                // Stop narration and remove active state without triggering other narrations
                housesBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (parliamentSpeakerContainer) {
            const nhrcBtn = parliamentSpeakerContainer.querySelector('.parliament-speaker-btn');
            if (nhrcBtn && nhrcBtn.classList.contains('active') && nhrcBtn.id === 'nhrcSpeakerBtn') {
                // Stop narration and remove active state without triggering other narrations
                nhrcBtn.classList.remove('active');
                stopAllNarration();
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
        if (formalsectorSpeakerContainer) {
            const formalsectorBtn = formalsectorSpeakerContainer.querySelector('.formalsector-speaker-btn');
            if (formalsectorBtn && formalsectorBtn.classList.contains('active')) {
                // Stop narration and remove active state without triggering other narrations
                formalsectorBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (selfhelpSpeakerContainer) {
            const selfhelpBtn = selfhelpSpeakerContainer.querySelector('.selfhelp-speaker-btn');
            if (selfhelpBtn && selfhelpBtn.classList.contains('active')) {
                // Stop narration and remove active state without triggering other narrations
                selfhelpBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (summingupSpeakerContainer) {
            const summingupBtn = summingupSpeakerContainer.querySelector('.summingup-speaker-btn');
            if (summingupBtn && summingupBtn.classList.contains('active')) {
                // Stop narration and remove active state without triggering other narrations
                summingupBtn.classList.remove('active');
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
        if (currencySpeakerContainer) {
            currencySpeakerContainer.style.display = '';
        }
        if (depositsSpeakerContainer) {
            depositsSpeakerContainer.style.display = '';
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
        if (formalsectorSpeakerContainer) {
            formalsectorSpeakerContainer.style.display = '';
        }
        if (selfhelpSpeakerContainer) {
            selfhelpSpeakerContainer.style.display = '';
        }
        if (summingupSpeakerContainer) {
            summingupSpeakerContainer.style.display = '';
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
                event.target.closest('.formalsector-speaker-btn') ||
                event.target.closest('.selfhelp-speaker-btn') ||
                event.target.closest('.summingup-speaker-btn') ||
                event.target.closest('.haryana-speaker-container') ||
                event.target.closest('.saudi-speaker-container') ||
                event.target.closest('.kosovo-speaker-container') ||
                event.target.closest('.parliament-speaker-container') ||
                event.target.closest('.houses-speaker-container') ||
                event.target.closest('.values-speaker-container') ||
                event.target.closest('.covenant-speaker-container') ||
                event.target.closest('.formalsector-speaker-container') ||
                event.target.closest('.selfhelp-speaker-container') ||
                event.target.closest('.summingup-speaker-container')) {
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
                !event.target.closest('.covenant-speaker-container') &&
                !event.target.closest('.formalsector-speaker-container') &&
                !event.target.closest('.selfhelp-speaker-container') &&
                !event.target.closest('.summingup-speaker-container')) {
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
const totalQuestions = 2;

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
    let totalQuestions = 2;
    let results = [];

    // Question 1: b) Members
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'b') {
        score++;
        results.push('<p class="correct-answer">✓ Question 1: Correct! In a SHG, members take most decisions regarding savings and loan activities.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 1: Incorrect. The correct answer is b) Members.</p>');
    }

    // Question 2: c) Employers
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'c') {
        score++;
        results.push('<p class="correct-answer">✓ Question 2: Correct! Employers are not a formal source of credit.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 2: Incorrect. The correct answer is c) Employers.</p>');
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
            showAchievement('Quiz Master', 'Perfect score! You have excellent knowledge of Money and Credit.');
        }, 1000);
    } else if (score >= 1) {
        setTimeout(() => {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of Money and Credit concepts.');
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
        progressFill.style.width = '50%';
        progressFill.textContent = 'Question 1 of 2';
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
    if (b !== exceptBtn && typeof b.className === 'string' && (
      b.className.includes('-speaker-btn') ||
      b.className.includes('haryana-speaker-btn') ||
      b.className.includes('saudi-speaker-btn')
    )) {
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
// Terms of Credit Card Narrations - Direct Content Reading
function toggleHouseLoanNarration() {
    const btn = document.getElementById('houseLoanSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = btn.closest('.feature-card');
    if (!card) return;

    const content = card.querySelector('.feature-desc').textContent.trim();
    if (!content) return;

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    utterance.onend = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    window.speechSynthesis.speak(utterance);
}

function toggleCreditArrangementsNarration() {
    const btn = document.getElementById('creditArrangementsSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = btn.closest('.feature-card');
    if (!card) return;

    const content = card.querySelector('.feature-desc').textContent.trim();
    if (!content) return;

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    utterance.onend = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    window.speechSynthesis.speak(utterance);
}

function toggleCooperativesNarration() {
    const btn = document.getElementById('cooperativesSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = btn.closest('.feature-card');
    if (!card) return;

    const content = card.querySelector('.feature-desc').textContent.trim();
    if (!content) return;

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    if (!isAudioEnabled) {
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    utterance.onend = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    window.speechSynthesis.speak(utterance);
}

// Terms of Credit
function toggleTermsNarration() {
    const btn = document.getElementById('termsSpeakerBtn');
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

    // Use the specific text provided for Terms of Credit narration
    const curatedContent = "Every loan agreement specifies an interest rate which the borrower must pay to the lender along with the repayment of the principal. In addition, lenders may demand collateral (security) against loans. Collateral is an asset that the borrower owns (such as land, building, vehicle, livestocks, deposits with banks) and uses this as a guarantee to a lender until the loan is repaid. If the borrower fails to repay the loan, the lender has the right to sell the asset or collateral to obtain payment. Property such as land titles, deposits with banks, livestock are some common examples of collateral used for borrowing.";

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

// Two Different Credit Situations
function toggleCreditNarration() {
    const btn = document.getElementById('creditSpeakerBtn');
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

    // Use curated content for Two Different Credit Situations
    const curatedContent = "A large number of transactions in our day-to-day activities involve credit in some form or the other. Credit (loan) refers to an agreement in which the lender supplies the borrower with money, goods or services in return for the promise of future payment. Let us see how credit works through the following two examples. 1) Festival Season - It is festival season two months from now and the shoe manufacturer, Salim, has received an order from a large trader in town for 3,000 pairs of shoes to be delivered in a month time. To complete production on time, Salim has to hire a few more workers for stitching and pasting work. He has to purchase the raw materials. To meet these expenses, Salim obtains loans from two sources. First, he asks the leather supplier to supply leather now and promises to pay him later. Second, he obtains loan in cash from the large trader as advance payment for 1000 pairs of shoes with a promise to deliver the whole order by the end of the month. At the end of the month, Salim is able to deliver the order, make a good profit, and repay the money that he had borrowed. In this case, Salim obtains credit to meet the working capital needs of production. The credit helps him to meet the ongoing expenses of production, complete production on time, and thereby increase his earnings. Credit therefore plays a vital and positive role in this situation. 2) Swapna's Problem Swapna, a small farmer, grows groundnut on her three acres of land. She takes a loan from the moneylender to meet the expenses of cultivation, hoping that her harvest would help repay the loan. Midway through the season the crop is hit by pests and the crop fails. Though Swapna sprays her crops with expensive pesticides, it makes little difference. She is unable to repay the moneylender and the debt grows over the year into a large amount. Next year, Swapna takes a fresh loan for cultivation. It is a normal crop this year. But the earnings are not enough to cover the old loan. She is caught in debt. She has to sell a part of the land to pay off the debt. In rural areas, the main demand for credit is for crop production. Crop production involves considerable costs on seeds, fertilisers, pesticides, water, electricity, repair of equipment, etc. There is a minimum stretch of three to four months between the time when the farmers buy these inputs and when they sell the crop. Farmers usually take crop loans at the beginning of the season and repay the loan after harvest. Repayment of the loan is crucially dependent on the income from farming. In Swapna's case, the failure of the crop made loan repayment impossible. She had to sell part of the land to repay the loan. Credit, instead of helping Swapna improve her earnings, left her worse off. This is an example of what is commonly called debt-trap. Credit in this case pushes the borrower into a situation from which recovery is very painful. In one situation credit helps to increase earnings and therefore the person is better off than before. In another situation, because of the crop failure, credit pushes the person into a debt trap. To repay her loan she has to sell a portion of her land. She is clearly much worse off than before. Whether credit would be useful or not, therefore, depends on the risks in the situation and whether there is some support, in case of loss.";

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

// Loan Activities of Banks
function toggleLoanNarration() {
    const btn = document.getElementById('loanSpeakerBtn');
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

    // Use curated content for Loan Activities of Banks
    const curatedContent = "Let us take the story of banks further. What do the banks do with the deposits which they accept from the public? There is an interesting mechanism at work here. Banks keep only a small proportion of their deposits as cash with themselves. For example, banks in India these days hold about 5 per cent of their deposits as cash. This is kept as provision to pay the depositors who might come to withdraw money from the bank on any given day. Since, on any particular day, only some of its many depositors come to withdraw cash, the bank is able to manage with this cash. Banks use the major portion of the deposits to extend loans. There is a huge demand for loans for various economic activities. We shall read more about this in the following sections. Banks make use of the deposits to meet the loan requirements of the people. In this way, banks mediate between those who have surplus funds (the depositors) and those who are in need of these funds (the borrowers). Banks charge a higher interest rate on loans than what they offer on deposits. The difference between what is charged from borrowers and what is paid to depositors is their main source of income.";

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

    // Use the actual content from the HTML element
    const contentElement = card.querySelector('.content-block p');
    const curatedContent = contentElement ? contentElement.textContent.trim() : "Money is more than just a medium of exchange—it reflects history, society, and the changing needs of people. From ancient forms to modern banking systems, the journey of money is full of interesting stories. Today, with computerisation and digital transactions, money is rapidly evolving in India. Events like demonetisation in 2016 highlight how currency, credit, and digital payments shape people's lives and the economy. This chapter introduces us to the concept of money, its modern forms, and the importance of credit in ensuring equal opportunities for development.";

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
    const curatedContent = "The use of money spans a very large part of our everyday life. Look around you and you would easily be able to identify several transactions involving money in any single day. Can you make a list of these? In many of these transactions, goods are being bought and sold with the use of money. In some of these transactions, services are being exchanged with money. For some, there might not be any actual transfer of money taking place now but a promise to pay money later. Have you ever wondered why transactions are made in money? The reason is simple. A person holding money can easily exchange it for any commodity or service that he or she might want. Thus everyone prefers to receive payments in money and then exchange the money for things that they want. Take the case of a shoe manufacturer. He wants to sell shoes in the market and buy wheat. The shoe manufacturer will first exchange shoes that he has produced for money, and then exchange the money for wheat. Imagine how much more difficult it would be if the shoe manufacturer had to directly exchange shoes for wheat without the use of money. He would have to look for a wheat growing farmer who not only wants to sell wheat but also wants to buy the shoes in exchange. That is, both parties have to agree to sell and buy each others commodities. This is known as double coincidence of wants. What a person desires to sell is exactly what the other wishes to buy. In a barter system where goods are directly exchanged without the use of money, double coincidence of wants is an essential feature. In contrast, in an economy where money is in use, money by providing the crucial intermediate step eliminates the need for double coincidence of wants. It is no longer necessary for the shoe manufacturer to look for a farmer who will buy his shoes and at the same time sell him wheat. All he has to do is find a buyer for his shoes. Once he has exchanged his shoes for money, he can purchase wheat or any other commodity in the market. Since money acts as an intermediate in the exchange process, it is called a medium of exchange.";

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

// Modern Forms of Money cards
function toggleCurrencyNarration() { toggleButtonNarrationById('currencySpeakerBtn'); }
function toggleDepositsNarration() { toggleButtonNarrationById('depositsSpeakerBtn'); }

// Formal Sector Credit in India
function toggleFormalSectorNarration() {
    const btn = document.getElementById('formalsectorSpeakerBtn');
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

    // Use the actual content from all paragraphs and elements in the HTML
    const contentElements = card.querySelectorAll('.content-block p, .content-block h3');
    const curatedContent = contentElements.length > 0
        ? Array.from(contentElements).map(el => el.textContent.trim()).join(' ')
        : "We have seen in the above examples that people obtain loans from various sources. The various types of loans can be conveniently grouped as formal sector loans and informal sector loans. Among the former are loans from banks and cooperatives. The informal lenders include moneylenders, traders, employers, relatives and friends, etc. In Graph 1 you can see the various sources of credit to rural households in India. Is more credit coming from the formal sector or the informal sector? The Reserve Bank of India supervises the functioning of formal sources of loans. For instance, we have seen that the banks maintain a minimum cash balance out of the deposits they receive. The RBI monitors the banks in actually maintaining cash balance. Similarly, the RBI sees that the banks give loans not just to profit-making businesses and traders but also to small cultivators, small scale industries, to small borrowers etc. Periodically, banks have to submit information to the RBI on how much they are lending, to whom, at what interest rate, etc. There is no organisation which supervises the credit activities of lenders in the informal sector. They can lend at whatever interest rate they choose. There is no one to stop them from using unfair means to get their money back. Compared to the formal lenders, most of the informal lenders charge a much higher interest on loans. Thus, the cost to the borrower of informal loans is much higher. Higher cost of borrowing means a larger part of the earnings of the borrowers is used to repay the loan. Hence, borrowers have less income left for themselves (as we saw for Shyamal in Sonpur). In certain cases, the high interest rate for borrowing can mean that the amount to be repaid is greater than the income of the borrower. This could lead to increasing debt (as we saw for Rama in Sonpur) and debt trap. Also, people who might wish to start an enterprise by borrowing may not do so because of the high cost of borrowing. For these reasons, banks and cooperative societies need to lend more. This would lead to higher incomes and many people could then borrow cheaply for a variety of needs. They could grow crops, do business, set up small-scale industries etc. They could set up new industries or trade in goods. Cheap and affordable credit is crucial for the country's development. Formal and Informal Credit: Who gets what? Graph 2 shows the importance of formal and informal sources of credit for people in urban areas. The people are divided into four groups, from poor to rich, as shown in the figure. You can see that 54 per cent of the loans taken by poor households in the urban areas are from informal sources. Compare this with the rich urban households. What do you find? Only 17 per cent of their loans are from informal sources, while 83 per cent are from formal sources. A similar pattern is also found in rural areas. The rich households are availing cheap credit from formal lenders whereas the poor households have to pay a large amount for borrowing. What does all this suggest? First, the formal sector still meets only about half of the total credit needs of the rural people. The remaining credit needs are met from informal sources. Most loans from informal lenders carry a very high interest rate and do little to increase the income of the borrowers. Thus, it is necessary that banks and cooperatives increase their lending particularly in the rural areas, so that the dependence on informal sources of credit reduces. Secondly, while formal sector loans need to expand, it is also necessary that everyone receives these loans. At present, it is the richer households who receive formal credit whereas the poor have to depend on the informal sources. It is important that the formal credit is distributed more equally so that the poor can benefit from the cheaper loans.";

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

// Self-Help Groups for the Poor
function toggleSelfHelpNarration() {
    const btn = document.getElementById('selfhelpSpeakerBtn');
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

    // Use the actual content from all paragraphs and elements in the HTML
    const contentElements = card.querySelectorAll('.content-block p, .content-block h3');
    const curatedContent = contentElements.length > 0
        ? Array.from(contentElements).map(el => el.textContent.trim()).join(' ')
        : "In the previous section we have seen that poor households are still dependent on informal sources of credit. Why is it so? Banks are not present everywhere in rural India. Even when they are present, getting a loan from a bank is much more difficult than taking a loan from informal sources. As we saw for Megha, bank loans require proper documents and collateral. Absence of collateral is one of the major reasons which prevents the poor from getting bank loans. Informal lenders such as moneylenders, on the other hand, know the borrowers personally and hence are often willing to give a loan without collateral. The borrowers can, if necessary, approach the moneylenders even without repaying their earlier loans. However, the moneylenders charge very high rates of interest, keep no records of the transactions and harass the poor borrowers. In recent years, people have tried out some newer ways of providing loans to the poor. The idea is to organise rural poor, in particular women, into small Self Help Groups (SHGs) and pool (collect) their savings. A typical SHG has 15-20 members, usually belonging to one neighbourhood, who meet and save regularly. Saving per member varies from Rs 25 to Rs 100 or more, depending on the ability of the people to save. Members can take small loans from the group itself to meet their needs. The group charges interest on these loans but this is still less than what the moneylender charges. After a year or two, if the group is regular in savings, it becomes eligible for availing loan from the bank. Loan is sanctioned in the name of the group and is meant to create selfemployment opportunities for the members. For instance, small loans are provided to the members for releasing mortgaged land, for meeting working capital needs (e.g. buying seeds, fertilisers, raw materials like bamboo and cloth), for housing materials, for acquiring assets like sewing machine, handlooms, cattle, etc. Most of the important decisions regarding the savings and loan activities are taken by the group members. The group decides as regards the loans to be granted — the purpose, amount, interest to be charged, repayment schedule etc. Also, it is the group which is responsible for the repayment of the loan. Any case of non repayment of loan by any one member is followed up seriously by other members in the group. Because of this feature, banks are willing to lend to the poor women when organised in SHGs, even though they have no collateral as such. Thus, the SHGs help borrowers overcome the problem of lack of collateral. They can get timely loans for a variety of purposes and at a reasonable interest rate. Moreover, SHGs are the building blocks of organisation of the rural poor. Not only does it help women to become financially self-reliant, the regular meetings of the group provide a platform to discuss and act on a variety of social issues such as health, nutrition, domestic violence, etc. Grameen Bank of Bangladesh - Grameen Bank of Bangladesh is one of the biggest success stories in reaching the poor to meet their credit needs at reasonable rates. Started in the 1970s as a small project, Grameen Bank in 2018 had over 9 million members in about 81,600 villages spread across Bangladesh. Almost all of the borrowers are women and belong to poorest sections of the society. These borrowers have proved that not only are poor women reliable borrowers, but that they can start and run a variety of small income-generating activities successfully. If credit can be made available to the poor people on terms and conditions that are appropriate and reasonable these millions of small people with their millions of small pursuits can add up to create the biggest development wonder. - Professor Muhammad Yunus, the founder of Grameen Bank, and recipient of 2006 Nobel Prize for Peace";

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
        console.error('Error speaking content:', err);
        onCleanup();
    }
}

// Summing Up
function toggleSummingUpNarration() {
    const btn = document.getElementById('summingupSpeakerBtn');
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

    // Use the actual content from all paragraphs in the HTML element
    const contentElements = card.querySelectorAll('.content-block p');
    const curatedContent = contentElements.length > 0
        ? Array.from(contentElements).map(el => el.textContent.trim()).join(' ')
        : "In this chapter we have looked at the modern forms of money and how they are linked with the banking system. On one side are the depositors who keep their money in the banks and on the other side are the borrowers who take loans from these banks. Economic activities require loans or credit. Credit, as we saw can have a positive impact, or in certain situations make the borrower worse off. Credit is available from a variety of sources. These can be either formal sources or informal sources. Terms of credit vary substantially between formal and informal lenders. At present, it is the richer households who receive credit from formal sources whereas the poor have to depend on the informal sources. It is essential that the total formal sector credit increases so that the dependence on the more expensive informal credit becomes less. Also, the poor should get a much greater share of formal loans from banks, cooperative societies etc. Both these steps are important for development.";

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
        console.error('Error speaking content:', err);
        onCleanup();
    }
}

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

// Important Terms - narration removed

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