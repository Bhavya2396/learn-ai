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
    impact: false,
    fairglobalisation: false,
    summingup: false,
    activities: false
};

// Module order for progress calculation
const moduleOrder = ['intro', 'overview', 'southafrica', 'whyconstitution', 'indianconstitution', 'values', 'formalsector', 'selfhelp', 'impact', 'fairglobalisation', 'summingup', 'activities'];

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

    // Progress based on completed modules: intro is 15%, remaining 11 modules share 85%
    const progressPercentage = 15 + Math.round((completedModules - 1) / 11 * 85);
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
    if (completedModules === 12) { // All 12 modules including intro
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
            speak("Welcome to Globalisation and the Indian Economy. This chapter explores how globalisation works, the factors that drive it—such as technology, liberalisation, and international organisations—and its impact on development.");
            break;
            
        case 'overview':
            speak("As consumers in today's world, we have a wide choice of goods and services. From digital cameras to automobiles, our markets have transformed with products from leading global manufacturers. This chapter explores these rapid changes and their impact on our lives.");
            break;
            
        case 'southafrica':
            speak("Until the middle of the twentieth century, production was largely organized within countries. The emergence of multinational corporations changed this by spreading production across the globe to minimize costs and maximize profits through strategic global locations.");
            break;
            
        case 'whyconstitution':
            speak("In general, MNCs set up production where it is close to the markets; where there is skilled and unskilled labour available at low costs; and where the availability of other factors of production is assured. MNCs spread their production across countries through investments, partnerships, and buying local companies, creating an interlinked global production network.");
            break;
            
        case 'indianconstitution':
            speak("For a long time foreign trade has been the main channel connecting countries. Foreign trade creates opportunities for producers to reach beyond domestic markets and allows buyers to access goods from other countries. This section explores how foreign trade leads to integration of markets through the example of Chinese toys in Indian markets.");
            break;
            
        case 'values':
            speak("Globalisation is the process of rapid integration between countries through increased foreign investment, trade, and movement of goods, services, investments and technology. MNCs play a major role in this process by setting up production across countries and controlling a large part of foreign trade.");
            break;

        case 'formalsector':
            speak("Globalisation has been enabled by several key factors. Rapid improvements in technology, especially transportation and information technology, have made global trade faster and cheaper. Information technology plays a major role in spreading production across countries, while liberalisation of trade policies has removed barriers to foreign investment and trade.");
            break;

        case 'selfhelp':
            speak("This section explores the World Trade Organisation (WTO) and its role in liberalising international trade. It examines how WTO rules are established and enforced, and discusses the debate on fair trade practices between developed and developing countries, particularly regarding agricultural subsidies.");
            break;

        case 'impact':
            speak("This section examines the impact of globalisation on India's economy over the past twenty years, including its effects on consumers, producers, workers, and small businesses through three key areas: foreign investment attraction, challenges for small producers, and changing employment conditions.");
            break;

        case 'fairglobalisation':
            speak("This section explores how not everyone has benefited equally from globalisation. While some people with education, skill and wealth have made the best use of new opportunities, many others have not shared the benefits. It discusses how to make globalisation more fair and the role of government policies, international organizations like WTO, and people's movements in creating a fairer globalisation.");
            break;

        case 'summingup':
            speak("In this chapter, we looked at the present phase of globalisation. Globalisation is the process of rapid integration of countries through greater foreign trade and foreign investment. MNCs are playing a major role in the globalisation process. Technology, particularly IT, has played a big role in organising production across countries. While globalisation has benefited well-off consumers and skilled producers, many small producers and workers have suffered due to rising competition. Fair globalisation would create opportunities for all and ensure that the benefits of globalisation are shared better.");
            break;

        case 'activities':
            speak("Test your knowledge and understanding with these interactive activities about Globalisation and the Indian Economy.");
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
    
    showAchievement('Journey Begins', 'You started your learning journey with Globalisation and the Indian Economy!');
    speak("Welcome to the interactive lesson on Globalisation and the Indian Economy. Let's begin by understanding how globalisation works and its impact on development.");
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
    const impactSpeakerContainer = card.querySelector('.impact-speaker-container');
    const smallProducersSpeakerContainer = card.querySelector('.small-producers-speaker-container');
    const employmentSpeakerContainer = card.querySelector('.employment-speaker-container');

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
                event.target.closest('.employment-speaker-container')) {
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
                !event.target.closest('.employment-speaker-container')) {
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

    // Question 1: b) goods, services and investments between countries
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'b') {
        score++;
        results.push('<p class="correct-answer">✓ Question 1: Correct! The past two decades of globalisation has seen rapid movements in goods, services and investments between countries.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 1: Incorrect. The correct answer is b) goods, services and investments between countries.</p>');
    }

    // Question 2: b) buy existing local companies
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'b') {
        score++;
        results.push('<p class="correct-answer">✓ Question 2: Correct! The most common route for investments by MNCs is to buy existing local companies.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 2: Incorrect. The correct answer is b) buy existing local companies.</p>');
    }

    // Question 3: d) none of the above
    const q3Answer = document.querySelector('input[name="q3"]:checked');
    if (q3Answer && q3Answer.value === 'd') {
        score++;
        results.push('<p class="correct-answer">✓ Question 3: Correct! Globalisation has not led to improvement in living conditions of all the people.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 3: Incorrect. The correct answer is d) none of the above.</p>');
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
            showAchievement('Quiz Master', 'Perfect score! You have excellent knowledge of Globalisation and the Indian Economy.');
        }, 1000);
    } else if (score >= 1) {
        setTimeout(() => {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of Globalisation and the Indian Economy concepts.');
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
      b.className.includes('employment-speaker-btn')
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

    // Use curated content for Terms of Credit
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

// Foreign Trade and Integration of Markets
function toggleForeignTradeNarration() {
    const btn = document.getElementById('foreignTradeSpeakerBtn');
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

    // Use the provided content for Foreign Trade and Integration of Markets
    const curatedContent = "For a long time foreign trade has been the main channel connecting countries. In history you would have read about the trade routes connecting India and South Asia to markets both in the East and West and the extensive trade that took place along these routes. Also, you would remember that it was trading interests which attracted various trading companies such as the East India Company to India. What then is the basic function of foreign trade? To put it simply, foreign trade creates an opportunity for the producers to reach beyond the domestic markets, i.e., markets of their own countries. Producers can sell their produce not only in markets located within the country but can also compete in markets located in other countries of the world. Similarly, for the buyers, import of goods produced in another country is one way of expanding the choice of goods beyond what is domestically produced. Let us see the effect of foreign trade through the example of Chinese toys in the Indian markets. Chinese Toys in India - Chinese manufacturers learn of an opportunity to export toys to India, where toys are sold at a high price. They start exporting plastic toys to India. Buyers in India now have the option of choosing between Indian and the Chinese toys. Because of the cheaper prices and new designs, Chinese toys become more popular in the Indian markets. Within a year, 70 to 80 per cent of the toy shops have replaced Indian toys with Chinese toys. Toys are now cheaper in the Indian markets than earlier. What is happening here? As a result of trade, Chinese toys come into the Indian markets. In the competition between Indian and Chinese toys, Chinese toys prove better. Indian buyers have a greater choice of toys and at lower prices. For the Chinese toy makers, this provides an opportunity to expand business. The opposite is true for Indian toy makers. They face losses, as their toys are selling much less. In general, with the opening of trade, goods travel from one market to another. Choice of goods in the markets rises. Prices of similar goods in the two markets tend to become equal. And, producers in the two countries now closely compete against each other even though they are separated by thousands of miles! Foreign trade thus results in connecting the markets or integration of markets in different countries.";

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

// Interlinking Production across Countries
function toggleInterlinkingNarration() {
    const btn = document.getElementById('interlinkingSpeakerBtn');
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

    // Use the provided content for Interlinking Production across Countries
    const curatedContent = "In general, MNCs set up production where it is close to the markets; where there is skilled and unskilled labour available at low costs; and where the availability of other factors of production is assured. In addition, MNCs might look for government policies that look after their interests. You will read more about the policies later in the chapter. Having assured themselves of these conditions, MNCs set up factories and offices for production. The money that is spent to buy assets such as land, building, machines and other equipment is called investment. Investment made by MNCs is called foreign investment. Any investment is made with the hope that these assets will earn profits. At times, MNCs set up production jointly with some of the local companies of these countries. The benefit to the local company of such joint production is two-fold. First, MNCs can provide money for additional investments, like buying new machines for faster production. Second, MNCs might bring with them the latest technology for production. But the most common route for MNC investments is to buy up local companies and then to expand production. MNCs with huge wealth can quite easily do so. To take an example, Cargill Foods, a very large American MNC, has bought over smaller Indian companies such as Parakh Foods. Parakh Foods had built a large marketing network in various parts of India, where its brand was well-reputed. Also, Parakh Foods had four oil refineries, whose control has now shifted to Cargill. Cargill is now the largest producer of edible oil in India, with a capacity to make 5 million pouches daily! In fact, many of the top MNCs have wealth exceeding the entire budgets of the developing country governments. With such enormous wealth, imagine the power and influence of these MNCs! There's another way in which MNCs control production. Large MNCs in developed countries place orders for production with small producers. Garments, footwear, sports items are examples of industries where production is carried out by a large number of small producers around the world. The products are supplied to the MNCs, which then sell these under their own brand names to the customers. These large MNCs have tremendous power to determine price, quality, delivery, and labour conditions for these distant producers. Thus, we see that there are a variety of ways in which the MNCs are spreading their production and interacting with local producers in various countries across the globe. By setting up partnerships with local companies, by using the local companies for supplies, by closely competing with the local companies or buying them up, MNCs are exerting a strong influence on production at these distant locations. As a result, production in these widely dispersed locations is getting interlinked.";

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

// Production Across Countries
function toggleProductionNarration() {
    const btn = document.getElementById('productionSpeakerBtn');
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
    const contentElements = card.querySelectorAll('.content-block p');
    const curatedContent = contentElements.length > 0
        ? Array.from(contentElements).map(el => el.textContent.trim()).join(' ')
        : "Until the middle of the twentieth century, production was largely organised within countries. What crossed the boundaries of these countries were raw material, food stuff and finished products. Colonies such as India exported raw materials and food stuff and imported finished goods. Trade was the main channel connecting distant countries. This was before large companies called multinational corporations (MNCs) emerged on the scene. A MNC is a company that owns or controls production in more than one nation. MNCs set up offices and factories for production in regions where they can get cheap labour and other resources. This is done so that the cost of production is low and the MNCs can earn greater profits. Consider the following example. Spreading of Production by an MNC A large MNC, producing industrial equipment, designs its products in research centres in the United States, and then has the components manufactured in China. These are then shipped to Mexico and Eastern Europe where the products are assembled and the finished products are sold all over the world. Meanwhile, the company's customer care is carried out through call centres located in India. In this example the MNC is not only selling its finished products globally, but more important, the goods and services are produced globally. As a result, production is organised in increasingly complex ways. The production process is divided into small parts and spread out across the globe. In the above example, China provides the advantage of being a cheap manufacturing location. Mexico and Eastern Europe are useful for their closeness to the markets in the US and Europe. India has highly skilled engineers who can understand the technical aspects of production. It also has educated English speaking youth who can provide customer care services. And all this probably can mean 50-60 per cent cost-savings for the MNC! The advantage of spreading out production across the borders to the multinationals can be truly immense.";

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

// What is Globalisation Section
function toggleGlobalisationNarration() {
    const btn = document.getElementById('globalisationSpeakerBtn');
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
    const contentElements = card.querySelectorAll('.content-block p');
    const curatedContent = contentElements.length > 0
        ? Array.from(contentElements).map(el => el.textContent.trim()).join(' ')
        : "In the past two to three decades, more and more MNCs have been looking for locations around the world which would be cheap for their production. Foreign investment by MNCs in these countries has been rising. At the same time, foreign trade between countries has been rising rapidly. A large part of the foreign trade is also controlled by MNCs. For instance, the car manufacturing plant of Ford Motors in India not only produces cars for the Indian markets, it also exports cars to other developing countries and exports car components for its many factories around the world. Likewise, activities of most MNCs involve substantial trade in goods and also services. The result of greater foreign investment and greater foreign trade has been greater integration of production and markets across countries. Globalisation is this process of rapid integration or interconnection between countries. MNCs are playing a major role in the globalisation process. More and more goods and services, investments and technology are moving between countries. Most regions of the world are in closer contact with each other than a few decades back. Besides the movements of goods, services, investments and technology, there is one more way in which the countries can be connected. This is through the movement of people between countries. People usually move from one country to another in search of better income, better jobs or better education. In the past few decades, however, there has not been much increase in the movement of people between countries due to various restrictions.";

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
    const curatedContent = contentElement ? contentElement.textContent.trim() : "Globalisation is a process that has brought countries closer through trade, investment, and the growing influence of multinational corporations (MNCs). Over the past few decades, MNCs have played a central role in linking distant regions of the world, shaping production, markets, and economies. This chapter explores how globalisation works, the factors that drive it—such as technology, liberalisation, and international organisations—and its impact on development. It also encourages us to think critically about the opportunities and challenges globalisation creates for people, businesses, and nations.";

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

    // Use curated content for the overview section
    const curatedContent = "As consumers in today's world, some of us have a wide choice of goods and services before us. The latest models of digital cameras, mobile phones and televisions made by the leading manufacturers of the world are within our reach. Every season, new models of automobiles can be seen on Indian roads. Gone are the days when Ambassador and Fiat were the only cars on Indian roads. Today, Indians are buying cars produced by nearly all the top companies in the world. A similar explosion of brands can be seen for many other goods: from shirts to televisions to processed fruit juices. Such wide-ranging choice of goods in our markets is a relatively recent phenomenon. You wouldn't have found such a wide variety of goods in Indian markets even two decades back. In a matter of years, our markets have been transformed! How do we understand these rapid transformations? What are the factors that are bringing about these changes? And, how are these changes affecting the lives of the people? We shall dwell on these questions in this chapter.";

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

// Factors that have Enabled Globalisation - Main section narration
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

    // Use curated content for the overall section summary
    const curatedContent = "Globalisation has been enabled by several key factors. Rapid improvement in technology has been one major factor that has stimulated the globalisation process. Information and communication technology has played a major role in spreading out production of services across countries. The liberalisation of foreign trade and foreign investment policy, starting around 1991, removed barriers to foreign trade and investment, allowing goods to be imported and exported easily and foreign companies to set up factories and offices.";

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

// World Trade Organisation
function toggleWTONarration() {
    const btn = document.getElementById('wtoSpeakerBtn');
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
        : "We have seen that the liberalisation of foreign trade and investment in India was supported by some very powerful international organisations. These organisations say that all barriers to foreign trade and investment are harmful. There should be no barriers. Trade between countries should be 'free'. All countries in the world should liberalise their policies. World Trade Organisation (WTO) is one such organisation whose aim is to liberalise international trade. Started at the initiative of the developed countries, WTO establishes rules regarding international trade, and sees that these rules are obeyed. About 160 countries of the world are currently members of the WTO. Though WTO is supposed to allow free trade for all, in practice, it is seen that the developed countries have unfairly retained trade barriers. On the other hand, WTO rules have forced the developing countries to remove trade barriers. An example of this is the current debate on trade in agricultural products. Debate on Trade Practices - You have seen in Chapter 2, that the agriculture sector provides the bulk of employment and a significant portion of the GDP in India. Compare this to a developed country such as the US with the share of agriculture in GDP at 1% and its share in total employment a tiny 0.5%! And yet this very small percentage of people who are engaged in agriculture in the US receive massive sums of money from the US government for production and for exports to other countries. Due to this massive money that they receive, US farmers can sell the farm products at abnormally low prices. The surplus farm products are sold in other country markets at low prices, adversely affecting farmers in these countries. Developing countries are, therefore, asking the developed country governments, 'We have reduced trade barriers as per WTO rules. But you have ignored the rules of WTO and have continued to pay your farmers vast sums of money. You have asked our governments to stop supporting our farmers, but you are doing so yourselves. Is this free and fair trade?'";

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

// Impact of Globalisation in India - Main Section
function toggleImpactNarration() {
    const btn = document.getElementById('impactSpeakerBtn');
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
    const contentElements = card.querySelectorAll('.content-block p');
    const curatedContent = contentElements.length > 0
        ? Array.from(contentElements).map(el => el.textContent.trim()).join(' ')
        : "In the last twenty years, globalisation of the Indian economy has come a long way. What has been its effect on the lives of people? Let us look at some of the evidence. Globalisation and greater competition among producers - both local and foreign producers - has been of advantage to consumers, particularly the well-off sections in the urban areas. There is greater choice before these consumers who now enjoy improved quality and lower prices for several products. As a result, these people today, enjoy much higher standards of living than was possible earlier. Among producers and workers, the impact of globalisation has not been uniform. Firstly, MNCs have increased their investments in India over the past 20 years, which means investing in India has been beneficial for them. MNCs have been interested in industries such as cell phones, automobiles, electronics, soft drinks, fast food or services such as banking in urban areas. These products have a large number of well-off buyers. In these industries and services, new jobs have been created. Also, local companies supplying raw materials, etc. to these industries have prospered.";

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

// The Struggle for a Fair Globalisation
function toggleFairGlobalisationNarration() {
    const btn = document.getElementById('fairGlobalisationSpeakerBtn');
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
    const curatedContent = contentElement ? contentElement.textContent.trim() : "The above evidence indicates that not everyone has benefited from globalisation. People with education, skill and wealth have made the best use of the new opportunities. On the other hand, there are many people who have not shared the benefits. Since globalisation is now a reality, the question is how to make globalisation more 'fair'? Fair globalisation would create opportunities for all, and also ensure that the benefits of globalisation are shared better. The government can play a major role in making this possible. Its policies must protect the interests, not only of the rich and the powerful, but all the people in the country. You have read about some of the possible steps that the government can take. For instance, the government can ensure that labour laws are properly implemented and the workers get their rights. It can support small producers to improve their performance till the time they become strong enough to compete. If necessary, the government can use trade and investment barriers. It can negotiate at the WTO for 'fairer rules'. It can also align with other developing countries with similar interests to fight against the domination of developed countries in the WTO. In the past few years, massive campaigns and representation by people's organisations have influenced important decisions relating to trade and investments at the WTO. This has demonstrated that people also can play an important role in the struggle for fair globalisation.";

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

    // Use the new content for Summing Up
    const curatedContent = "In this chapter, we looked at the present phase of globalisation. Globalisation is the process of rapid integration of countries. This is happening through greater foreign trade and foreign investment. MNCs are playing a major role in the globalisation process. More and more MNCs are looking for locations around the world that are cheap for their production. As a result, production is being organised in complex ways. Technology, particularly IT, has played a big role in organising production across countries. In addition, liberalisation of trade and investment has facilitated globalisation by removing barriers to trade and investment. At the international level, WTO has put pressure on developing countries to liberalise trade and investment. While globalisation has benefited well-off consumers and also producers with skill, education and wealth, many small producers and workers have suffered as a result of the rising competition. Fair globalisation would create opportunities for all, and also ensure that the benefits of globalisation are shared better.";

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