// Main JavaScript for Constitutional Design Interactive Lesson

// Global variables for tracking progress
let moduleProgress = {
      intro: false,
      overview: false,
      southafrica: false,
      whyconstitution: false,
      indianconstitution: false,
      stateparties: false,
      challenges: false,
      reformed: false,
      activities: false
  };

// Module order for progress calculation
const moduleOrder = ['intro', 'overview', 'southafrica', 'whyconstitution', 'indianconstitution', 'stateparties', 'challenges', 'reformed', 'activities'];

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
    const startOnInteraction = (event) => {
        // Don't start auto-narration if clicking on narration buttons
        if (event.target.closest('.speaker-btn, [onclick*="Narration"]')) {
            return;
        }
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

    // Progress based on completed modules: intro is 15%, remaining 8 modules share 85%
    const progressPercentage = 15 + Math.round((completedModules - 1) / 8 * 85);
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
               speak("Welcome to Political Parties. This chapter explores the crucial role of political parties in democracy, from contesting elections to forming governments, and examines why parties are necessary, how many are ideal for democracy, and the challenges they face in India.");
               break;

        case 'overview':
               speak("This chapter examines the nature and working of political parties in India, addressing why we need parties, how many are good for democracy, and introducing national and regional parties while discussing their shortcomings and reforms.");
               break;
            
        case 'southafrica':
               speak("This section explores why political parties are essential for democracy, examining their meaning, functions, and necessity in modern representative governments.");
               break;
            
        case 'whyconstitution':
               speak("This section explores how many political parties are ideal for a democracy, examining one-party, two-party, and multiparty systems, and discusses popular participation in political parties.");
               break;
            
        case 'indianconstitution':
              speak("This section explores the national political parties in India, including their formation, ideologies, achievements, and current status as recognized by the Election Commission.");
              break;
            

        case 'stateparties':
            speak("This section explores State parties in India, also known as regional parties, which have grown significantly over the last three decades. While some are truly regional in character, others like the Samajwadi Party and Rashtriya Janata Dal have national-level organizations. Parties like Biju Janata Dal, Sikkim Democratic Front, Mizo National Front and Telangana Rashtra Samithi maintain strong state identities. The growth of these parties has made Parliament more diverse and compelled national parties to form alliances with them since 1996, strengthening federalism and democracy in India.");
            break;

        case 'challenges':
            speak("This section examines the major challenges faced by political parties in India, including lack of internal democracy, dynastic succession, growing role of money and muscle power, and the lack of meaningful choice for voters.");
            break;

        case 'reformed':
            speak("This section explores how political parties can be reformed in India, examining recent efforts like anti-defection laws, Supreme Court orders on money and criminals in politics, Election Commission regulations, and various suggestions for improving internal democracy and representation.");
            break;

        case 'activities':
            speak("Test your knowledge and understanding with these interactive activities about Political Parties.");
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
    
    showAchievement('Journey Begins', 'You started your learning journey with Political Parties!');
    speak("Welcome to the interactive lesson on Gender, Religion and Caste. Let's begin by understanding how social divisions shape politics in India.");
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
    // Find the card element more reliably
    let card = button.closest('.feature-card');
    if (!card) {
        // Fallback to the old method if closest doesn't work
        card = button.parentNode.parentNode;
    }

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
    const impactSpeakerContainer = card.querySelector('.impact-speaker-container');
    const smallProducersSpeakerContainer = card.querySelector('.small-producers-speaker-container');
    const employmentSpeakerContainer = card.querySelector('.employment-speaker-container');

    if (desc.style.display === 'none' || desc.style.display === '') {
        card.classList.add('expanded');
        desc.style.display = 'block';
        button.textContent = 'See Less';

        // Show narration button when content is expanded
        if (haryanaSpeakerContainer) {
            haryanaSpeakerContainer.style.display = 'flex';
        }
        if (saudiSpeakerContainer) {
            saudiSpeakerContainer.style.display = 'flex';
        }
        if (haryanaSpeakerContainer) {
            haryanaSpeakerContainer.style.display = 'flex';
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
        if (impactSpeakerContainer) {
            impactSpeakerContainer.style.display = 'flex';
        }
        if (smallProducersSpeakerContainer) {
            smallProducersSpeakerContainer.style.display = 'flex';
        }
        if (employmentSpeakerContainer) {
            employmentSpeakerContainer.style.display = 'flex';
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
        if (impactSpeakerContainer) {
            const impactBtn = impactSpeakerContainer.querySelector('.impact-speaker-btn');
            if (impactBtn && impactBtn.classList.contains('active')) {
                impactBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (smallProducersSpeakerContainer) {
            const smallProducersBtn = smallProducersSpeakerContainer.querySelector('.small-producers-speaker-btn');
            if (smallProducersBtn && smallProducersBtn.classList.contains('active')) {
                smallProducersBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        if (employmentSpeakerContainer) {
            const employmentBtn = employmentSpeakerContainer.querySelector('.employment-speaker-btn');
            if (employmentBtn && employmentBtn.classList.contains('active')) {
                employmentBtn.classList.remove('active');
                stopAllNarration();
            }
        }
        // Stop narration for Belgium cards if active
        const powerSharingContainer = card.querySelector('.haryana-speaker-container');
        if (powerSharingContainer) {
            const powerSharingBtn = powerSharingContainer.querySelector('.haryana-speaker-btn');
            if (powerSharingBtn && powerSharingBtn.classList.contains('active')) {
                powerSharingBtn.classList.remove('active');
                stopAllNarration();
            }
        }

        card.classList.remove('expanded');
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
        if (impactSpeakerContainer) {
            impactSpeakerContainer.style.display = '';
        }
        if (smallProducersSpeakerContainer) {
            smallProducersSpeakerContainer.style.display = '';
        }
        if (employmentSpeakerContainer) {
            employmentSpeakerContainer.style.display = '';
        }
        // Reset display for Belgium card speaker containers
        const belgiumCardContainers = card.querySelectorAll('.haryana-speaker-container');
        belgiumCardContainers.forEach(container => {
            container.style.display = '';
        });
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
                event.target.closest('.impact-speaker-btn') ||
                event.target.closest('.small-producers-speaker-btn') ||
                event.target.closest('.employment-speaker-btn') ||
                event.target.closest('.belgium-card-speaker-btn') ||
                event.target.closest('.khalil-speaker-btn') ||
                event.target.closest('.haryana-speaker-container') ||
                event.target.closest('.saudi-speaker-container') ||
                event.target.closest('.kosovo-speaker-container') ||
                event.target.closest('.parliament-speaker-container') ||
                event.target.closest('.houses-speaker-container') ||
                event.target.closest('.values-speaker-container') ||
                event.target.closest('.covenant-speaker-container') ||
                event.target.closest('.formalsector-speaker-container') ||
                event.target.closest('.selfhelp-speaker-container') ||
                event.target.closest('.summingup-speaker-container') ||
                event.target.closest('.impact-speaker-container') ||
                event.target.closest('.small-producers-speaker-container') ||
                event.target.closest('.employment-speaker-container') ||
                event.target.closest('.belgium-card-speaker-container') ||
                event.target.closest('.khalil-speaker-container')) {
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
                !event.target.closest('.summingup-speaker-container') &&
                !event.target.closest('.impact-speaker-container') &&
                !event.target.closest('.small-producers-speaker-container') &&
                !event.target.closest('.employment-speaker-container') &&
                !event.target.closest('.belgium-card-speaker-container') &&
                !event.target.closest('.khalil-speaker-container')) {
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
        progressFill.textContent = `Question ${currentQuestionIndex + 1} of 3`;
    }
}

function checkQuizAnswers() {
    let score = 0;
    let totalQuestions = 3;
    let results = [];

    // Question 1: (a) Kanshi Ram
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'a') {
        score++;
        results.push('<p class="correct-answer">✓ Question 1: Correct! Kanshi Ram is the founder of Bahujan Samaj Party.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 1: Incorrect. The correct answer is (a) Kanshi Ram.</p>');
    }

    // Question 2: (c) Integral humanism
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'c') {
        score++;
        results.push('<p class="correct-answer">✓ Question 2: Correct! Integral humanism is the guiding philosophy of BJP.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 2: Incorrect. The correct answer is (c) Integral humanism.</p>');
    }

    // Question 3: (b) A and B
    const q3Answer = document.querySelector('input[name="q3"]:checked');
    if (q3Answer && q3Answer.value === 'b') {
        score++;
        results.push('<p class="correct-answer">✓ Question 3: Correct! A and B are correct statements.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 3: Incorrect. The correct answer is (b) A and B.</p>');
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
            showAchievement('Quiz Master', 'Perfect score! You have excellent knowledge of Gender, Religion and Caste.');
        }, 1000);
    } else if (score >= 1) {
        setTimeout(() => {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of Gender, Religion and Caste concepts.');
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
        progressFill.style.width = '33.33%';
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
    if (b !== exceptBtn && typeof b.className === 'string' && (
      b.className.includes('-speaker-btn') ||
      b.className.includes('haryana-speaker-btn') ||
      b.className.includes('saudi-speaker-btn') ||
      b.className.includes('impact-speaker-btn') ||
      b.className.includes('small-producers-speaker-btn') ||
      b.className.includes('employment-speaker-btn') ||
      b.className.includes('belgium-card-speaker-btn') ||
      b.className.includes('khalil-speaker-btn')
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
      console.log('Speech started successfully');
      currentSpeechState = 'speaking';
      updatePlayPauseButton();
      // Show feedback that narration started
      showFeedback('Narration started for Forms of Power Sharing', 'success');
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

  utter.onend = () => {
      console.log('Speech ended successfully');
      onCleanup();
  };

  utter.onpause = () => {
      console.log('Speech paused');
  };

  utter.onresume = () => {
      console.log('Speech resumed');
  };
  utter.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      // Don't treat 'interrupted' as a real error - it just means another speech started
      if (e.error !== 'interrupted') {
          console.error('Real speech error:', e.error);
          onCleanup();
      } else {
          console.log('Speech was interrupted by another speech - this is normal');
      }
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
      console.log('Button is active, stopping narration');
      btn.classList.remove('active');
      stopAllNarration();
      return;
  }

  console.log('Button is not active, starting narration');
  const card = getCardElementFromButton(btn);
  if (!card) {
      console.error('Card element not found for Forms of Power Sharing');
      showFeedback('Unable to locate the content to narrate for this section.', 'error');
      return;
  }

  console.log('Card found:', card);

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

    // Use curated content for Terms of Credit
    const curatedContent = "Every loan agreement specifies an interest rate which the borrower must pay to the lender along with the repayment of the principal. In addition, lenders may demand collateral (security) against loans. Collateral is an asset that the borrower owns (such as land, building, vehicle, livestocks, deposits with banks) and uses this as a guarantee to a lender until the loan is repaid. If the borrower fails to repay the loan, the lender has the right to sell the asset or collateral to obtain payment. Property such as land titles, deposits with banks, livestock are some common examples of collateral used for borrowing.";

    stopAllNarration();
    clearAllSpeakerActiveStates(btn);
    btn.classList.add('active');

    // Respect global audio toggle
    console.log('Audio enabled:', isAudioEnabled);
    if (!isAudioEnabled) {
        console.log('Audio is disabled');
        showFeedback('Audio narration is currently disabled. Please enable it first.', 'error');
        btn.classList.remove('active');
        return;
    }

    console.log('Speech synthesis support:', window.speechSynthesis, window.SpeechSynthesisUtterance);
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        console.log('Speech synthesis not supported');
        showFeedback('Your browser does not support speech synthesis.', 'error');
        btn.classList.remove('active');
        return;
    }

    // Mark that user has interacted (some browsers require this to allow speech)
    userInteracted = true;

    console.log('Creating speech utterance with content length:', curatedContent.length);
    const utter = new SpeechSynthesisUtterance(curatedContent);
    utter.rate = 0.9;
    utter.pitch = 1.0;

    console.log('Speech utterance created');

    utter.onstart = () => {
        console.log('Speech started successfully');
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
        window.speechSynthesis.speak(utter);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// What makes India a federal country?
function toggleIndiaFederalNarration() {
    const btn = document.getElementById('indiaFederalSpeakerBtn');
    if (!btn) {
        console.error('Button not found: indiaFederalSpeakerBtn');
        return;
    }

    if (btn.classList.contains('active')) {
        // Turn off and stop
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    // Find the correct module and content
    const module = document.getElementById('indianconstitution');
    if (!module) {
        console.error('Module not found: indianconstitution');
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    const contentBlock = module.querySelector('.content-block');
    if (!contentBlock) {
        console.error('Content block not found in indianconstitution module');
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Get all paragraphs from the content block
    const paragraphs = contentBlock.querySelectorAll('p');

    if (paragraphs.length === 0) {
        console.error('No paragraphs found in content block');
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    console.log('Found', paragraphs.length, 'paragraphs to narrate');

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

    // Read paragraphs sequentially for better narration flow
    readParagraphsSequentiallyForIndiaFederal(paragraphs, btn);
}


// Helper function to read paragraphs sequentially for India Federal section
function readParagraphsSequentiallyForIndiaFederal(paragraphs, button) {
    // Initialize paragraph timeouts array
    if (!window.indiaFederalTimeouts) {
        window.indiaFederalTimeouts = [];
    } else {
        // Clear any existing timeouts
        window.indiaFederalTimeouts.forEach(timeout => clearTimeout(timeout));
        window.indiaFederalTimeouts = [];
    }

    let currentIndex = 0;

    // Function to read the next paragraph
    const readNextParagraph = () => {
        if (currentIndex < paragraphs.length) {
            const paragraph = paragraphs[currentIndex];

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
                    // Remove active state from button
                    if (button) {
                        button.classList.remove('active');
                    }

                    // Update speech state
                    currentSpeechState = 'stopped';
                    updatePlayPauseButton();
                }
            };

            // Error handling
            speechUtterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);

                // Remove active state from button
                if (button) {
                    button.classList.remove('active');
                }

                currentSpeechState = 'stopped';
                updatePlayPauseButton();
            };

            // Start speaking this paragraph
            window.speechSynthesis.speak(speechUtterance);

            // Update speech state
            currentSpeechState = 'speaking';
            updatePlayPauseButton();

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
                    // Remove active state from button
                    if (button) {
                        button.classList.remove('active');
                    }

                    currentSpeechState = 'stopped';
                    updatePlayPauseButton();
                }
            }, estimatedDuration + 1000); // Add 1 second buffer

            window.indiaFederalTimeouts.push(fallbackTimeout);
        }
    };

    // Start reading the first paragraph
    readNextParagraph();
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

    utter.onend = () => {
        console.log('Forms of Power Sharing speech ended');
        onCleanup();
    };

    utter.onerror = (e) => {
        console.error('Speech synthesis error for Forms of Power Sharing:', e);
        showFeedback('Speech synthesis error: ' + (e.error || 'Unknown error'), 'error');
        onCleanup();
    };

    try {
        window.speechSynthesis.speak(utter);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Why do we need Political Parties? narration
function toggleWhyPartiesNarration() {
    const btn = document.getElementById('whyPartiesSpeakerBtn');
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

    // Use curated content for Why do we need Political Parties?
    const fullContent = "Political parties are easily one of the most visible institutions in a democracy. For most ordinary citizens, democracy is equal to political parties. If you travel to remote parts of our country and speak to the less educated citizens, you could come across people who may not know anything about our Constitution or about the nature of our government. But chances are that they would know something about our political parties. At the same time, this visibility does not mean popularity. Most people tend to be very critical of political parties. They tend to blame parties for all that is wrong with our democracy and our political life. Parties have become identified with social and political divisions. Therefore, it is natural to ask – do we need political parties at all? About hundred years ago, there were few countries of the world that had any political party. Now there are few that do not have parties. Why did political parties become so omnipresent in democracies all over the world? Let us first answer what political parties are and what they do, before we say why we need them.";

    // Break into smaller parts for better narration
    const parts = fullContent.split('. ').map(part => part.trim() + (part.endsWith('.') ? '' : '.'));

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

    let currentPartIndex = 0;

    const speakNextPart = () => {
        if (currentPartIndex < parts.length) {
            const utter = new SpeechSynthesisUtterance(parts[currentPartIndex]);
            utter.rate = 0.9;
            utter.pitch = 1.0;

            utter.onstart = () => {
                currentSpeechState = 'speaking';
                updatePlayPauseButton();
            };

            utter.onend = () => {
                currentPartIndex++;
                if (currentPartIndex < parts.length) {
                    setTimeout(speakNextPart, 200); // Small pause between parts
                } else {
                    onCleanup();
                }
            };

            utter.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                if (e.error !== 'interrupted') {
                    onCleanup();
                }
            };

            window.speechSynthesis.speak(utter);
        }
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            speakNextPart();
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Meaning narration
function toggleMeaningNarration() {
    const btn = document.getElementById('meaningSpeakerBtn');
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

    // Use curated content for Meaning
    const fullContent = "A political party is a group of people who come together to contest elections and hold power in the government. They agree on some policies and programmes for the society with a view to promote the collective good. Since there can be different views on what is good for all, parties try to persuade people why their policies are better than others. They seek to implement these policies by winning popular support through elections. Thus, parties reflect fundamental political divisions in a society. Parties are about a part of the society and thus, involve partisanship. Thus, a party is known by which part it stands for, which policies it supports and whose interests it upholds. A political party has three components: 1) the leaders, 2) the active members and 3) the followers";

    // Break into smaller parts for better narration - split only on sentence-ending periods
    const parts = [];
    let currentPart = '';
    let i = 0;
    while (i < fullContent.length) {
        currentPart += fullContent[i];
        if (fullContent[i] === '.' && i + 1 < fullContent.length && fullContent[i + 1] === ' ') {
            // Check if next non-space character is uppercase (start of new sentence)
            let j = i + 2;
            while (j < fullContent.length && fullContent[j] === ' ') j++;
            if (j < fullContent.length && fullContent[j] >= 'A' && fullContent[j] <= 'Z') {
                parts.push(currentPart.trim());
                currentPart = '';
            }
        }
        i++;
    }
    if (currentPart.trim()) {
        parts.push(currentPart.trim());
    }

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

    let currentPartIndex = 0;

    const speakNextPart = () => {
        if (currentPartIndex < parts.length) {
            const utter = new SpeechSynthesisUtterance(parts[currentPartIndex]);
            utter.rate = 0.9;
            utter.pitch = 1.0;

            utter.onstart = () => {
                currentSpeechState = 'speaking';
                updatePlayPauseButton();
            };

            utter.onend = () => {
                currentPartIndex++;
                if (currentPartIndex < parts.length) {
                    setTimeout(speakNextPart, 200); // Small pause between parts
                } else {
                    onCleanup();
                }
            };

            utter.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                if (e.error !== 'interrupted') {
                    onCleanup();
                }
            };

            window.speechSynthesis.speak(utter);
        }
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            speakNextPart();
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Functions narration
function toggleFunctionsNarration() {
    const btn = document.getElementById('functionsSpeakerBtn');
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

    // Use curated content for Functions
    const fullContent = "What does a political party do? Basically, political parties fill political offices and exercise political power. Parties do so by performing a series of functions: 1. Parties contest elections. In most democracies, elections are fought mainly among the candidates put up by political parties. Parties select their candidates in different ways. In some countries, such as the USA, members and supporters of a party choose its candidates. Now more and more countries are following this method. In other countries like India, top party leaders choose candidates for contesting elections. 2. Parties put forward different policies and programmes and the voters choose from them. Each of us may have different opinions and views on what policies are suitable for the society. But no government can handle such a large variety of views. In a democracy, a large number of similar opinions have to be grouped together to provide a direction in which policies can be formulated by the governments. This is what the parties do. A party reduces a vast multitude of opinions into a few basic positions which it supports. A government is expected to base its policies on the line taken by the ruling party. 3. Parties play a decisive role in making laws for a country. Formally, laws are debated and passed in the legislature. But since most of the members belong to a party, they go by the direction of the party leadership, irrespective of their personal opinions. 4. Parties form and run governments. As we noted last year, the big policy decisions are taken by political executive that comes from the political parties. Parties recruit leaders, train them and then make them ministers to run the government in the way they want. 5. Those parties that lose in the elections play the role of opposition to the parties in power, by voicing different views and criticising government for its failures or wrong policies. Opposition parties also mobilise opposition to the government. 6. Parties shape public opinion. They raise and highlight issues. Parties have lakhs of members and activists spread all over the country. Many of the pressure groups are the extensions of political parties among different sections of society. Parties sometimes also launch movements for the resolution of problems faced by people. Often opinions in the society crystallise on the lines parties take. 7. Parties provide people access to government machinery and welfare schemes implemented by governments. For an ordinary citizen it is easy to approach a local party leader than a government officer. That is why, they feel close to parties even when they do not fully trust them. Parties have to be responsive to people’s needs and demands. Otherwise people can reject those parties in the next elections.";

    // Break into smaller parts for better narration (split by numbered points and sentences)
    const parts = fullContent.split(/\d+\.\s/).filter(part => part.trim()).map(part => part.trim());

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

    let currentPartIndex = 0;

    const speakNextPart = () => {
        if (currentPartIndex < parts.length) {
            const utter = new SpeechSynthesisUtterance(parts[currentPartIndex]);
            utter.rate = 0.9;
            utter.pitch = 1.0;

            utter.onstart = () => {
                currentSpeechState = 'speaking';
                updatePlayPauseButton();
            };

            utter.onend = () => {
                currentPartIndex++;
                if (currentPartIndex < parts.length) {
                    setTimeout(speakNextPart, 300); // Small pause between parts
                } else {
                    onCleanup();
                }
            };

            utter.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                if (e.error !== 'interrupted') {
                    onCleanup();
                }
            };

            window.speechSynthesis.speak(utter);
        }
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            speakNextPart();
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Necessity narration
function toggleNecessityNarration() {
    const btn = document.getElementById('necessitySpeakerBtn');
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

    // Use curated content for Necessity
    const fullContent = "This list of functions in a sense answers the question asked above: we need political parties because they perform all these functions. But we still need to ask why modern democracies cannot exist without political parties. We can understand the necessity of political parties by imagining a situation without parties. Every candidate in the elections will be independent. So no one will be able to make any promises to the people about any major policy changes. The government may be formed, but its utility will remain ever uncertain. Elected representatives will be accountable to their constituency for what they do in the locality. But no one will be responsible for how the country will be run. We can also think about it by looking at the non-party based elections to the panchayat in many states. Although, the parties do not contest formally, it is generally noticed that the village gets split into more than one faction, each of which puts up a 'panel' of its candidates. This is exactly what the party does. That is the reason we find political parties in almost all countries of the world, whether these countries are big or small, old or new, developed or developing. The rise of political parties is directly linked to the emergence of representative democracies. As we have seen, large societies need representative democracy. As societies became large and complex, they also needed some agency to gather different views on various issues and to present these to the government. They needed some ways, to bring various representatives together so that a responsible government could be formed. They needed a mechanism to support or restrain the government, make policies, justify or oppose them. Political parties fulfill these needs that every representative government has. We can say that parties are a necessary condition for a democracy.";

    // Break into smaller parts for better narration
    const parts = fullContent.split('. ').map(part => part.trim() + (part.endsWith('.') ? '' : '.'));

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

    let currentPartIndex = 0;

    const speakNextPart = () => {
        if (currentPartIndex < parts.length) {
            const utter = new SpeechSynthesisUtterance(parts[currentPartIndex]);
            utter.rate = 0.9;
            utter.pitch = 1.0;

            utter.onstart = () => {
                currentSpeechState = 'speaking';
                updatePlayPauseButton();
            };

            utter.onend = () => {
                currentPartIndex++;
                if (currentPartIndex < parts.length) {
                    setTimeout(speakNextPart, 300); // Small pause between parts
                } else {
                    onCleanup();
                }
            };

            utter.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                if (e.error !== 'interrupted') {
                    onCleanup();
                }
            };

            window.speechSynthesis.speak(utter);
        }
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            speakNextPart();
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
        onCleanup();
    }
}

// Key Features of Federalism
function toggleKeyFeaturesNarration() {
    const btn = document.getElementById('keyFeaturesSpeakerBtn');
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

    // Use the complete key features content
    const curatedContent = "Let us look at some of the key features of federalism: 1. There are two or more levels (or tiers) of government. 2. Different tiers of government govern the same citizens, but each tier has its own jurisdiction in specific matters of legislation, taxation and administration. 3. The jurisdictions of the respective levels or tiers of government are specified in the constitution. So the existence and authority of each tier of government is constitutionally guaranteed. 4. The fundamental provisions of the constitution cannot be unilaterally changed by one level of government. Such changes require the consent of both the levels of government. 5. Courts have the power to interpret the constitution and the powers of different levels of government. The highest court acts as an umpire if disputes arise between different levels of government in the exercise of their respective powers. 6. Sources of revenue for each level of government are clearly specified to ensure its financial autonomy. 7. The federal system thus has dual objectives: to safeguard and promote unity of the country, while at the same time accommodate regional diversity. Therefore, two aspects are crucial for the institutions and practice of federalism. Governments at different levels should agree to some rules of power-sharing. They should also trust that each would abide by its part of the agreement. An ideal federal system has both aspects: mutual trust and agreement to live together. The exact balance of power between the central and the state government varies from one federation to another. This balance depends mainly on the historical context in which the federation was formed. There are two kinds of routes through which federations have been formed. The first route involves independent States coming together on their own to form a bigger unit, so that by pooling sovereignty and retaining identity, they can increase their security. This type of 'coming together' federations include the USA, Switzerland and Australia. In this first category of federations, all the constituent States usually have equal power and are strong vis-à-vis the federal government. The second route is where a large country decides to divide its power between the constituent States and the national government. India, Spain and Belgium are examples of this kind of 'holding together' federations. In this second category, the Central Government tends to be more powerful vis-à-vis the States. Very often different constituent units of the federation have unequal powers. Some units are granted special powers.";

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
        showFeedback('Speech synthesis error: ' + err.message, 'error');
        onCleanup();
    }
}

// Why do we need Political Parties?
function toggleWhyPartiesNarration() {
    const btn = document.getElementById('whyPartiesSpeakerBtn');
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

    // Get all paragraphs from the content block
    const paragraphs = card.querySelectorAll('.content-block p');
    let contentToRead = '';

    if (paragraphs.length > 0) {
        // Read all paragraphs
        contentToRead = Array.from(paragraphs).map(p => p.textContent.trim()).join(' ');
    } else {
        // Fallback to entire content block text
        contentToRead = card.querySelector('.content-block').textContent.trim();
    }

    if (!contentToRead) {
        showFeedback('No content found to narrate.', 'error');
        return;
    }

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

    const utter = new SpeechSynthesisUtterance(contentToRead);
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
        showFeedback('Speech synthesis error: ' + err.message, 'error');
        onCleanup();
    }
}

// Forms of Power Sharing Card Narrations

// Card 1: Horizontal Distribution of Power
function toggleHorizontalPowerNarration() {
    const btn = document.getElementById('horizontalPowerSpeakerBtn');
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

// Card 2: Vertical Division of Power
function toggleVerticalPowerNarration() {
    const btn = document.getElementById('verticalPowerSpeakerBtn');
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

// Card 3: Community Government
function toggleCommunityGovernmentNarration() {
    const btn = document.getElementById('communityGovernmentSpeakerBtn');
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

// Card 4: Power Sharing among Political Parties
function togglePoliticalPartiesNarration() {
    const btn = document.getElementById('politicalPartiesSpeakerBtn');
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

// Forms of Power Sharing Section
function toggleFormsOfPowerSharingNarration() {
    console.log('Forms of Power Sharing narration function called');

    const btn = document.getElementById('formsOfPowerSharingSpeakerBtn');
    if (!btn) {
        console.error('Forms of Power Sharing speaker button not found!');
        showFeedback('Error: Narration button not found. Please refresh the page.', 'error');
        return;
    }

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

    // Use the specified text for How is federalism practised section
    const curatedContent = "Constitutional provisions are necessary for the success of federalism but these are not sufficient. If the federal experiment has succeeded in India, it is not merely because of the clearly laid out constitutional provisions. The real success of federalism in India can be attributed to the nature of democratic politics in our country. This ensured that the spirit of federalism, respect for diversity and desire for living together became shared ideals in our country. Let us look at some of the major ways in which this happened.";

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
        console.log('Attempting to speak Forms of Power Sharing content...');
        window.speechSynthesis.speak(utter);
        console.log('Speech synthesis request sent successfully');
    } catch (err) {
        console.error('Error speaking content:', err);
        showFeedback('Speech synthesis error: ' + err.message, 'error');
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
    const curatedContent = contentElement ? contentElement.textContent.trim() : "Political parties are the backbone of democracy, linking the people with the government and shaping political life. This chapter explores the essential role parties play—from contesting elections to forming governments and representing diverse interests. It discusses why political parties are necessary, how many parties a democracy needs, and examines both national and regional parties in India. The chapter also highlights the challenges faced by political parties and suggests ways to make them more effective and democratic.";

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

// Why do we need Political Parties? cards

// Card 1: Meaning
function toggleMeaningNarration() {
    const btn = document.getElementById('meaningSpeakerBtn');
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

// Card 2: Functions
function toggleFunctionsNarration() {
    const btn = document.getElementById('functionsSpeakerBtn');
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

// Card 3: Necessity
function toggleNecessityNarration() {
    const btn = document.getElementById('necessitySpeakerBtn');
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

// How many parties should we have? narration
function toggleHowManyNarration() {
    const btn = document.getElementById('howManySpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Get all paragraphs from the content block
    const paragraphs = card.querySelectorAll('.content-block p');
    let fullContent = '';

    if (paragraphs.length > 0) {
        // Read all paragraphs as one continuous text
        fullContent = Array.from(paragraphs).map(p => p.textContent.trim()).join(' ');
    } else {
        // Fallback to entire content block text
        fullContent = card.querySelector('.content-block').textContent.trim();
    }

    if (!fullContent) {
        showFeedback('No content found to narrate.', 'error');
        return;
    }

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

    // Speak entire content as one smooth utterance
    const utterance = new SpeechSynthesisUtterance(fullContent);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
        currentSpeechState = 'speaking';
        updatePlayPauseButton();
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    utterance.onend = onCleanup;
    utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        if (e.error !== 'interrupted') {
            onCleanup();
        }
    };

    try {
        // Force cancel any pending speech and start immediately
        window.speechSynthesis.cancel();
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 20);
    } catch (err) {
        console.error('Error speaking content:', err);
        onCleanup();
    }
}

// Gender and politics cards

// Card 1: Public/private division
function togglePublicPrivateNarration() {
    const btn = document.getElementById('publicPrivateSpeakerBtn');
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

// Religion, communalism and politics narration
function toggleReligionNarration() {
    const btn = document.getElementById('religionSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use the exact text specified by user
    const curatedContent = "Let us now turn to a very different kind of social division, the division based on religious differences. This division is not as universal as gender, but religious diversity is fairly widespread in the world today. Many countries including India have in their population, followers of different religions. As we noticed in the case of Northern Ireland, even when most of the people belong to the same religion, there can be serious differences about the way people practice that religion. Unlike gender differences, the religious differences are often expressed in the field of politics. Consider the following: 1. Gandhiji used to say that religion can never be separated from politics. What he meant by religion was not any particular religion like Hinduism or Islam but moral values that inform all religions. He believed that politics must be guided by ethics drawn from religion. 2.Human rights groups in our country have demanded that the Government should take special steps to prevent communal riots and protect religious minorities. 3.Women's movement has argued that family laws of all religions discriminate against women. So they have demanded that government should change these laws to make them more equitable. All these instances involve a relationship between religion and politics. But they do not seem very wrong or dangerous. Ideas, ideals and values drawn from different religions can and perhaps should play a role in politics. People should be able to express in politics their needs, interests and demands as a member of a religious community. Those who hold political power should sometimes be able to regulate the practice of religion so as to prevent discrimination and oppression. These political acts are not wrong as long as they treat every religion equally.";

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

// Card 1: Communalism
function toggleCommunalismNarration() {
    const btn = document.getElementById('communalismSpeakerBtn');
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

// Card 2: Secular state
function toggleSecularStateNarration() {
    const btn = document.getElementById('secularStateSpeakerBtn');
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

// National Parties narration
function toggleNationalPartiesNarration() {
    const btn = document.getElementById('nationalPartiesSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use the content from the content-block
    const contentElement = card.querySelector('.content-block p');
    const curatedContent = contentElement ? contentElement.textContent.trim() : "Democracies that follow a federal system all over the world tend to have two kinds of political parties: parties that are present in only one of the federal units and parties that are present in several or all units of the federation. This is the case in India as well. There are some country-wide parties, which are called 'national parties'. These parties have their units in various states. But by and large, all these units follow the same policies, programmes and strategy that is decided at the national level. Every party in the country has to register with the Election Commission. While the Commission treats all parties equally, it offers some special facilities to large and established parties. These parties are given a unique symbol – only the official candidates of that party can use that election symbol. Parties that get this privilege and some other special facilities are 'recognised' by the Election Commission for this purpose. That is why these parties are called, 'recognised political parties'. The Election Commission has laid down detailed criteria of the proportion of votes and seats that a party must get in order to be a recognised party. A party that secures at least six per cent of the total votes in an election to the Legislative Assembly of a State and wins at least two seats is recognised as a State party. A party that secures at least six per cent of the total votes in Lok Sabha elections or Assembly elections in four States and wins at least four seats in the Lok Sabha is recognised as a national party. According to this classification, there are six recognized national parties in the country as per notification of the Election Commission of India issued in 2023.";

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

// State Parties narration
function toggleStatePartiesNarration() {
    const btn = document.getElementById('statePartiesSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Use the content from the content-block
    const contentElement = card.querySelector('.content-block p');
    const curatedContent = contentElement ? contentElement.textContent.trim() : "Other than these seven parties, most of the major parties of the country are classified by the Election Commission as 'State parties'. These are commonly referred to as regional parties. Yet these parties need not be regional in their ideology or outlook. Some of these parties are all India parties that happen to have succeeded only in some states. Parties like the Samajwadi Party and Rashtriya Janata Dal have national level political organisation with units in several states. Some of these parties like Biju Janata Dal, Sikkim Democratic Front, Mizo National Front and Telangana Rashtra Samithi are conscious about their State identity. Over the last three decades, the number and strength of these parties has expanded. This made the Parliament of India politically more and more diverse. No one national party is able to secure on its own a majority in the Lok Sabha, until 2014. As a result, the national parties are compelled to form alliances with State parties. Since 1996, nearly every one of the State parties has got an opportunity to be a part of one or the other national level coalition government. This has contributed to the strengthening of federalism and democracy in our country.";

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

// Challenges to political parties narration
function toggleChallengesNarration() {
    const btn = document.getElementById('challengesSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Get all paragraphs from the content block
    const paragraphs = card.querySelectorAll('.content-block p');
    let fullContent = '';

    if (paragraphs.length > 0) {
        // Read all paragraphs
        fullContent = Array.from(paragraphs).map(p => p.textContent.trim()).join(' ');
    } else {
        // Fallback to entire content block text
        fullContent = card.querySelector('.content-block').textContent.trim();
    }

    if (!fullContent) {
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    // Split into sentences for smooth narration
    const parts = fullContent.split('. ').map(part => part.trim() + (part.endsWith('.') ? '' : '.'));

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

    let currentPartIndex = 0;

    const speakNextPart = () => {
        if (currentPartIndex < parts.length) {
            const utter = new SpeechSynthesisUtterance(parts[currentPartIndex]);
            utter.rate = 0.9;
            utter.pitch = 1.0;

            utter.onstart = () => {
                currentSpeechState = 'speaking';
                updatePlayPauseButton();
            };

            utter.onend = () => {
                currentPartIndex++;
                if (currentPartIndex < parts.length) {
                    setTimeout(speakNextPart, 10); // Very short pause for seamless flow
                } else {
                    onCleanup();
                }
            };

            utter.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                if (e.error !== 'interrupted') {
                    onCleanup();
                }
            };

            window.speechSynthesis.speak(utter);
        }
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            speakNextPart();
        }, 100);
    } catch (err) {
        console.error('Error speaking content:', err);
        onCleanup();
    }
}

// Reformed section narration (How can parties be reformed?)
function toggleReformedNarration() {
    const btn = document.getElementById('reformedSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        stopAllNarration();
        return;
    }

    const card = getCardElementFromButton(btn);
    if (!card) {
        showFeedback('Unable to locate the content to narrate for this section.', 'error');
        return;
    }

    // Get all paragraphs from the content block
    const paragraphs = card.querySelectorAll('.content-block p');
    let fullContent = '';

    if (paragraphs.length > 0) {
        // Read all paragraphs as one continuous text
        fullContent = Array.from(paragraphs).map(p => p.textContent.trim()).join(' ');
    } else {
        // Fallback to entire content block text
        fullContent = card.querySelector('.content-block').textContent.trim();
    }

    if (!fullContent) {
        showFeedback('No content found to narrate.', 'error');
        return;
    }

    // Split into logical parts for better narration flow
    const parts = [
        "In order to face these challenges, political parties need to be reformed. The question is: Are political parties willing to reform? If they are willing, what has prevented them from reforming so far? If they are not willing, is it possible to force them to reform?",
        "Citizens all over the world face this question. This is not a simple question to answer. In a democracy, the final decision is made by leaders who represent political parties. People can replace them, but only by another set of party leaders. If all of them do not wish to reform, how can anyone force them to change?",
        "Let us look at some of the recent efforts and suggestions in our country to reform political parties and its leaders:",
        "1. The Constitution was amended to prevent elected MLAs and MPs from changing parties. This was done because many elected representatives were indulging in defection in order to become ministers or for cash rewards. Now the law says that if any MLA or MP changes parties, he or she will lose the seat in the legislature.",
        "This new law has helped bring defection down. At the same time, this has made any dissent even more difficult. MPs and MLAs have to accept whatever the party leaders decide.",
        "2. The Supreme Court passed an order to reduce the influence of money and criminals. Now, it is mandatory for every candidate who contests elections to file an affidavit giving details of his property and criminal cases pending against him.",
        "The new system has made a lot of information available to the public. But there is no system to check if the information given by the candidates is true. As yet we do not know if it has led to decline in the influence of the rich and the criminals.",
        "3. The Election Commission passed an order making it necessary for political parties to hold their organisational elections and file their income tax returns. The parties have started doing so but sometimes it is mere formality.",
        "It is not clear if this step has led to greater internal democracy in political parties. Besides these, many suggestions are often made to reform political parties:",
        "1. A law should be made to regulate the internal affairs of political parties. It should be made compulsory for political parties to maintain a register of its members, to follow its own constitution, to have an independent authority, to act as a judge in case of party disputes, to hold open elections to the highest posts.",
        "2. It should be made mandatory for political parties to give a minimum number of tickets, about one-third, to women candidates. Similarly, there should be a quota for women in the decision making bodies of the party.",
        "3. There should be state funding of elections. The government should give parties money to support their election expenses. This support could be given in kind: petrol, paper, telephone, etc. Or it could be given in cash on the basis of the votes secured by the party in the last election.",
        "These suggestions have not yet been accepted by political parties. If and when these are accepted these could lead to some improvement. But we must be very careful about legal solutions to political problems.",
        "Over-regulation of political parties can be counter-productive. This would force all parties to find ways to cheat the law. Besides, political parties will not agree to pass a law that they do not like.",
        "There are two other ways in which political parties can be reformed. One, people can put pressure on political parties. This can be done through petitions, publicity and agitations.",
        "Ordinary citizens, pressure groups and movements and the media can play an important role in this. If political parties feel that they would lose public support by not taking up reforms, they would become more serious about reforms.",
        "Two, political parties can improve if those who want this, join political parties. The quality of democracy depends on the degree of public participation.",
        "It is difficult to reform politics if ordinary citizens do not take part in it and simply criticise it from the outside. The problem of bad politics can be solved by more and better politics. We shall return to this theme in the final chapter."
    ];

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

    let currentPartIndex = 0;

    const speakNextPart = () => {
        if (currentPartIndex < parts.length) {
            const utter = new SpeechSynthesisUtterance(parts[currentPartIndex]);
            utter.rate = 0.9;
            utter.pitch = 1.0;

            utter.onstart = () => {
                currentSpeechState = 'speaking';
                updatePlayPauseButton();
            };

            utter.onend = () => {
                currentPartIndex++;
                if (currentPartIndex < parts.length) {
                    speakNextPart(); // No pause for seamless flow
                } else {
                    onCleanup();
                }
            };

            utter.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                if (e.error !== 'interrupted') {
                    onCleanup();
                }
            };

            window.speechSynthesis.speak(utter);
        }
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    try {
        // Force cancel any pending speech and start immediately
        window.speechSynthesis.cancel();
        setTimeout(() => {
            speakNextPart();
        }, 20);
    } catch (err) {
        console.error('Error speaking content:', err);
        onCleanup();
    }
}

// Card 1: Aam Aadmi Party
function toggleAAPNarration() {
    const btn = document.getElementById('aapSpeakerBtn');
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

// Card 2: Bahujan Samaj Party
function toggleBSPNarration() {
    const btn = document.getElementById('bspSpeakerBtn');
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

// Card 3: Bharatiya Janata Party
function toggleBJPNarration() {
    const btn = document.getElementById('bjpSpeakerBtn');
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

// Card 4: Communist Party of India - Marxist
function toggleCPIMNarration() {
    const btn = document.getElementById('cpimSpeakerBtn');
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

// Card 5: Indian National Congress
function toggleINCNarration() {
    const btn = document.getElementById('incSpeakerBtn');
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

// Card 6: National People's Party
function toggleNPPNarration() {
    const btn = document.getElementById('nppSpeakerBtn');
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

// Card 1: Caste Inequalities
function toggleCasteInequalitiesNarration() {
    const btn = document.getElementById('casteInequalitiesSpeakerBtn');
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

// Card 2: Caste in politics
function toggleCasteInPoliticsNarration() {
    const btn = document.getElementById('casteInPoliticsSpeakerBtn');
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

// Card 3: Politics in caste
function togglePoliticsInCasteNarration() {
    const btn = document.getElementById('politicsInCasteSpeakerBtn');
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

// Card 4: Social and Religious Diversity of India
function toggleSocialReligiousDiversityNarration() {
    const btn = document.getElementById('socialReligiousDiversitySpeakerBtn');
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

// Card 5: Caste Inequality Today
function toggleCasteInequalityTodayNarration() {
    const btn = document.getElementById('casteInequalityTodaySpeakerBtn');
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

// Card 2: Women’s political representation
function toggleWomenPoliticalNarration() {
    const btn = document.getElementById('womenPoliticalSpeakerBtn');
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

    // Use curated content for the overview section
    const curatedContent = "In this tour of democracy, we have come across political parties several times. In Class IX, we noticed the role of political parties in the rise of democracies, in the formation of constitutional designs, in electoral politics and in the making and working of governments. In this textbook, we have glanced at political parties as vehicles of federal sharing of political power and as negotiators of social divisions in the arena of democratic politics. Before concluding this tour, let us take a close look at the nature and working of political parties, especially in our country. We begin by asking two common questions: Why do we need parties? How many parties are good for a democracy? In the light of these, we introduce the national and regional political parties in today's India and then look at what is wrong with political parties and what can be done about it.";

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


// Card 1: Technology
function toggleTechnologyNarration() {
    const btn = document.getElementById('technologySpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
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

// Card 2: Using IT in Globalisation
function toggleITNarration() {
    const btn = document.getElementById('itSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
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

// Card 3: Liberalisation of foreign trade and foreign investment policy
function toggleLiberalisationNarration() {
    const btn = document.getElementById('liberalisationSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
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




// Impact Card 1: Steps to Attract Foreign Investment
function toggleInvestmentNarration() {
    const btn = document.getElementById('investmentSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
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

// Impact Card 2: Small producers: Compete or perish
function toggleSmallProducersNarration() {
    const btn = document.getElementById('smallProducersSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
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

// Impact Card 3: Competition and Uncertain Employment
function toggleEmploymentNarration() {
    const btn = document.getElementById('employmentSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
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

// Accommodation Card 1: Why power sharing is desirable?
function togglePowerSharingNarration() {
    const btn = document.getElementById('powerSharingSpeakerBtn');
    if (!btn) return;

    if (btn.classList.contains('active')) {
        // Turn off and stop
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

// Communalism narration
function toggleCommunalismNarration() {
    const btn = document.getElementById('communalismSpeakerBtn');
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

    // Use curated content for Communalism
    const fullContent = "The problem begins when religion is seen as the basis of the nation. The example of Northern Ireland in Chapter 3 shows the dangers of such an approach to nationalism. The problem becomes more acute when religion is expressed in politics in exclusive and partisan terms, when one religion and its followers are pitted against another. This happens when beliefs of one religion are presented as superior to those of other religions, when the demands of one religious group are formed in opposition to another and when state power is used to establish domination of one religious group over the rest. This manner of using religion in politics is communal politics. Communal politics is based on the idea that religion is the principal basis of social community. Communalism involves thinking along the following lines. The followers of a particular religion must belong to one community. Their fundamental interests are the same. Any difference that they may have is irrelevant or trivial for community life. It also follows that people who follow different religions cannot belong to the same social community. If the followers of different religions have some commonalities these are superficial and immaterial, their interests are bound to be different and involve a conflict. In its extreme form, communalism leads to the belief that people belonging to different religions cannot live as equal citizens within one nation. Either, one of them has to dominate the rest or they have to form different nations. This belief is fundamentally flawed. People of one religion do not have the same interests and aspirations in every context. Everyone has several other roles, positions and identities. There are many voices inside every community. All these voices have a right to be heard. Therefore any attempt to bring all followers of one religion together in context other than religion is bound to suppress many voices within that community. Communalism can take various forms in politics: 1. The most common expression of communalism is in everyday beliefs. These routinely involve religious prejudices, stereotypes of religious communities and belief in the superiority of one's religion over other religions. This is so common that we often fail to notice it, even when we believe in it. 2. A communal mind often leads to a quest for political dominance of one's own religious community. For those belonging to majority community, this takes the form of majoritarian dominance. For those belonging to the minority community, it can take the form of a desire to form a separate political unit. 3. Political mobilisation on religious lines is another frequent form of communalism. This involves the use of sacred symbols, religious leaders, emotional appeal and plain fear in order to bring the followers of one religion together in the political arena. In electoral politics, this often involves special appeal to the interests or emotions of voters of one religion in preference to others. 4. Sometimes communalism takes its most ugly form of communal violence, riots and massacre. India and Pakistan suffered some of the worst communal riots at the time of the Partition. The post-Independence period has also seen large scale communal violence.";

    // Break into smaller parts for better narration
    const parts = fullContent.split('. ').map(part => part.trim() + (part.endsWith('.') ? '' : '.'));

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

    let currentPartIndex = 0;

    const speakNextPart = () => {
        if (currentPartIndex < parts.length) {
            const utter = new SpeechSynthesisUtterance(parts[currentPartIndex]);
            utter.rate = 0.9;
            utter.pitch = 1.0;

            utter.onstart = () => {
                currentSpeechState = 'speaking';
                updatePlayPauseButton();
            };

            utter.onend = () => {
                currentPartIndex++;
                if (currentPartIndex < parts.length) {
                    setTimeout(speakNextPart, 300); // Small pause between parts
                } else {
                    onCleanup();
                }
            };

            utter.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                if (e.error !== 'interrupted') {
                    onCleanup();
                }
            };

            window.speechSynthesis.speak(utter);
        }
    };

    const onCleanup = () => {
        btn.classList.remove('active');
        currentSpeechState = 'stopped';
        updatePlayPauseButton();
    };

    try {
        // Force cancel any pending speech and wait a bit
        window.speechSynthesis.cancel();
        setTimeout(() => {
            speakNextPart();
        }, 100);
    } catch (err) {
        console.error('Error speaking curated content:', err);
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