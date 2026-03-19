/**
 * Main script for Bholi interactive lesson
 */

// Global variables
let score = 0;
let activeModule = 'intro';
let modulesCompleted = {
    intro: false,
    prereading: false,
    story: false,
    thinking_text: false,
    thinking_language: false
};
let startTime = Date.now();

// Initialize text-to-speech narrator
class Narrator {
    constructor() {
        this.enabled = true;
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.onEndCallback = null;
        this.voice = null;
        
        // Load available voices
        this.loadVoices();
        
        // Handle dynamic voice loading
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
    }
    
    loadVoices() {
        const voices = this.synth.getVoices();
        
        // Prefer British female voice per user preference
        this.voice = voices.find(voice => 
            voice.lang.includes('en-GB') && voice.name.includes('Female')
        );
        
        // Fallback to any British voice
        if (!this.voice) {
            this.voice = voices.find(voice => voice.lang.includes('en-GB'));
        }
        
        // Fallback to any English voice
        if (!this.voice) {
            this.voice = voices.find(voice => voice.lang.includes('en'));
        }
    }
    
    speak(text) {
        if (!this.enabled || !this.synth) return;
        
        // Stop any current speech
        this.stop();
        
        // Create new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set voice (if we found a suitable one)
        if (this.voice) {
            utterance.voice = this.voice;
        }
        
        // Adjust rate and pitch for a more natural sound
        utterance.rate = 0.95;  // Slightly slower
        utterance.pitch = 1.0;  // Normal pitch
        
        // Set callback for when speech ends
        utterance.onend = () => {
            if (this.onEndCallback) {
                this.onEndCallback();
            }
            this.currentUtterance = null;
        };
        
        // Speak the text
        this.currentUtterance = utterance;
        this.synth.speak(utterance);
    }
    
    stop() {
        if (this.synth) {
            this.synth.cancel();
            this.currentUtterance = null;
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stop();
        }
        return this.enabled;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize narrator
    window.narrator = new Narrator();
    
    // Add event listeners to navigation buttons
    document.querySelectorAll('.nav-item').forEach(button => {
        button.addEventListener('click', function() {
            const module = this.getAttribute('onclick').match(/showModule\('(.+)'\)/)[1];
            showModule(module);
        });
    });
    
    // Initialize audio toggle button
    const audioBtn = document.getElementById('audioBtn');
    if (audioBtn) {
        audioBtn.addEventListener('click', toggleAudio);
    }
    
    // Start timer
    startTimer();
    
    // Add global user interaction tracking to enable speech synthesis
    document.addEventListener('click', trackUserInteraction, { once: true });
    document.addEventListener('keydown', trackUserInteraction, { once: true });
    document.addEventListener('touchstart', trackUserInteraction, { once: true });
    
    // Welcome message
    if (window.narrator) {
        setTimeout(() => {
            window.narrator.speak("Welcome to the interactive lesson on Bholi. Navigate through the tabs to explore the story, activities, and questions.");
        }, 1000);
    }
});

// Show a specific module
function showModule(moduleId) {
    console.log(`Showing module: ${moduleId}`);
    
    // Stop any ongoing narration when switching modules
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration due to module switch');
        window.narrator.stop();
    }
    
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Show selected module
    const selectedModule = document.getElementById(moduleId);
    if (selectedModule) {
        selectedModule.classList.add('active');
        activeModule = moduleId;
    } else {
        console.error(`Module element not found: ${moduleId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.nav-item').forEach(button => {
        const btnModule = button.getAttribute('onclick').match(/showModule\('(.+)'\)/)[1];
        if (btnModule === moduleId) {
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
        } else {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        }
    });
    
    // Update module completion status if not already completed
    if (!modulesCompleted[moduleId]) {
        modulesCompleted[moduleId] = true;
        updateProgress();
        
        // Award points for visiting a new module
        updateScore(5);
        
        // Show achievement popup
        showAchievement("Module Explored", "You've explored a new section of the lesson!");
    }
    
    // Automatically start narrating the new module content
    setTimeout(() => {
        startModuleNarration(moduleId);
    }, 200); // Small delay to ensure module is fully loaded
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Start the learning journey
function startJourney() {
    // Track user interaction to enable speech synthesis
    trackUserInteraction();
    
    showModule('prereading');
    
    if (window.narrator && window.narrator.enabled) {
        // Get the prereading content for a more complete narration
        const prereadingModule = document.getElementById('prereading');
        if (prereadingModule) {
            const contentBlocks = prereadingModule.querySelectorAll('.content-block');
            let prereadingContent = "Welcome to the interactive English lesson on 'Bholi'. Let's begin by exploring how education can transform lives. ";
            
            // Extract text from content blocks
            contentBlocks.forEach(block => {
                const paragraphs = block.querySelectorAll('p');
                paragraphs.forEach(p => {
                    prereadingContent += p.textContent + " ";
                });
            });
            
            // Speak the full content using the sequence function
            speakInSequence(prereadingContent);
        } else {
            // Fallback if module not found
            window.narrator.speak("Let's begin our exploration of Bholi. In this section, you can reflect on the themes of the story before reading it.");
        }
    }
}

// Update progress bar
function updateProgress() {
    // Count completed modules
    const completed = Object.values(modulesCompleted).filter(val => val).length;
    const total = Object.keys(modulesCompleted).length;
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const percentage = Math.round((completed / total) * 100);
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
    }
    
    // Update modules count
    const modulesComplete = document.getElementById('modulesComplete');
    if (modulesComplete) {
        modulesComplete.textContent = completed;
    }
}

// Update score
function updateScore(points) {
    score += points;
    const totalScore = document.getElementById('totalScore');
    if (totalScore) {
        totalScore.textContent = score;
    }
    
    // Check for achievements based on score milestones
    if (score >= 50 && !window.achievement50) {
        window.achievement50 = true;
        showAchievement("Scholar", "You've earned 50 points! Keep learning!");
    } else if (score >= 100 && !window.achievement100) {
        window.achievement100 = true;
        showAchievement("Master Scholar", "You've earned 100 points! Amazing progress!");
    }
}

// Start timer
function startTimer() {
    setInterval(updateTimer, 1000);
}

// Update timer
function updateTimer() {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timeSpent = document.getElementById('timeSpent');
    if (timeSpent) {
        timeSpent.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Toggle audio narration
function toggleAudio() {
    const audioBtn = document.getElementById('audioBtn');
    
    if (window.narrator) {
        const isEnabled = window.narrator.toggle();
        
        if (audioBtn) {
            audioBtn.textContent = isEnabled ? '🔊' : '🔇';
            audioBtn.classList.toggle('muted', !isEnabled);
        }
        
        // Show feedback
        const feedbackMsg = isEnabled ? "Audio narration enabled" : "Audio narration disabled";
        showFeedback(feedbackMsg, isEnabled ? 'success' : 'info');
    }
}

// Save reflection
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText');
    const reflectionFeedback = document.getElementById('reflectionFeedback');
    
    if (reflectionText && reflectionFeedback) {
        const text = reflectionText.value.trim();
        
        if (text.length < 10) {
            reflectionFeedback.textContent = 'Please write a more detailed reflection.';
            reflectionFeedback.className = 'feedback-message error show';
        } else {
            reflectionFeedback.textContent = 'Your reflection has been saved!';
            reflectionFeedback.className = 'feedback-message success show';
            
            // Award points for reflection
            updateScore(10);
        }
    }
}

// Show achievement popup
function showAchievement(title, description) {
    const achievementPopup = document.getElementById('achievementPopup');
    const achievementDesc = document.getElementById('achievementDesc');
    
    if (achievementPopup && achievementDesc) {
        achievementDesc.textContent = description;
        achievementPopup.classList.add('show');
        
        // Hide after a few seconds
        setTimeout(() => {
            achievementPopup.classList.remove('show');
        }, 5000);
    }
}

// Show feedback message
function showFeedback(message, type = 'info') {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = `feedback-message ${type} show`;
    feedbackContainer.textContent = message;
    feedbackContainer.style.position = 'fixed';
    feedbackContainer.style.bottom = '20px';
    feedbackContainer.style.left = '50%';
    feedbackContainer.style.transform = 'translateX(-50%)';
    feedbackContainer.style.zIndex = '1000';
    
    document.body.appendChild(feedbackContainer);
    
    // Remove after a few seconds
    setTimeout(() => {
        feedbackContainer.classList.remove('show');
        setTimeout(() => {
            feedbackContainer.remove();
        }, 500);
    }, 3000);
}

// Track user interaction for speech synthesis
function trackUserInteraction() {
    // This function is needed for mobile browsers
    // that require user interaction before allowing speech synthesis
    if (window.userInteracted) return window.userInteracted;
    
    window.userInteracted = true;
    console.log('User interaction detected - speech synthesis enabled');
    
    // Create a silent utterance to "unlock" speech synthesis on iOS
    if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance('');
        speechSynthesis.speak(utterance);
    }
    
    return window.userInteracted;
}

// Optimize for mobile devices
function setupMobileOptimizations() {
    // Add meta viewport tag if not present
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
        document.head.appendChild(meta);
    }
    
    // Adjust font sizes for mobile
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}

// Start module narration automatically
function startModuleNarration(moduleId) {
    if (!window.narrator || !window.narrator.enabled) {
        console.log('Narrator not available or disabled');
        return;
    }
    
    switch(moduleId) {
        case 'intro':
            if (window.narrator) {
                // Get the intro content
                const introModule = document.getElementById('intro');
                if (introModule) {
                    const contentBlocks = introModule.querySelectorAll('.content-block');
                    let introContent = "Welcome to 'Bholi'. ";
                    
                    // Extract text from content blocks
                    contentBlocks.forEach(block => {
                        const paragraphs = block.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            introContent += p.textContent + " ";
                        });
                    });
                    
                    // Speak the full intro content
                    window.narrator.speak(introContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("Welcome to the interactive English lesson on 'Bholi'. This story portrays the journey of a girl who transforms from being called 'a simpleton' to becoming an educated and confident woman.");
                }
            }
            break;
            
        case 'prereading':
            if (window.narrator) {
                // Get the prereading content
                const prereadingModule = document.getElementById('prereading');
                if (prereadingModule) {
                    const contentBlocks = prereadingModule.querySelectorAll('.content-block');
                    let prereadingContent = "Let's Begin. ";
                    
                    // Extract text from content blocks
                    contentBlocks.forEach(block => {
                        const paragraphs = block.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            prereadingContent += p.textContent + " ";
                        });
                    });
                    
                    // Add the activity title
                    const activityTitle = prereadingModule.querySelector('.activity-title');
                    if (activityTitle) {
                        prereadingContent += activityTitle.textContent + ". ";
                    }
                    
                    // Speak the full prereading content
                    speakInSequence(prereadingContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("Welcome to the Let's Begin section. Let's think about how education can transform lives, especially for those who face challenges or disadvantages.");
                }
            }
            break;
            
        case 'story':
            // Automatically start reading the story
            if (typeof toggleReadAloud === 'function') {
                toggleReadAloud();
            }
            break;
            
        case 'thinking-text':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Reading Comprehension section. Here you'll analyze the story and answer questions about it.");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Vocabulary and Grammar section. Here you'll explore vocabulary and grammar concepts from the story.");
            }
            break;
            
        default:
            console.log(`No specific narration defined for module: ${moduleId}`);
            break;
    }
}

// Function to speak longer text in sequence by breaking it into sentences
function speakInSequence(text) {
    if (!window.narrator) return;
    
    // Break the text into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    // Function to speak sentences sequentially
    function speakNextSentence(index = 0) {
        if (index >= sentences.length) return;
        
        // Set callback for when this sentence ends
        window.narrator.onEndCallback = function() {
            // Small pause between sentences
            setTimeout(() => {
                speakNextSentence(index + 1);
            }, 200);
        };
        
        // Speak the current sentence
        window.narrator.speak(sentences[index]);
    }
    
    // Start speaking the first sentence
    speakNextSentence(0);
}

// Call mobile optimizations on page load
document.addEventListener('DOMContentLoaded', setupMobileOptimizations);

// Call mobile optimizations on resize
window.addEventListener('resize', setupMobileOptimizations);
