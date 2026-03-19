/**
 * Activities and interactive elements for The Sound of Music
 */

// Global variables for tracking user progress
// Using window.score to share with main.js
let completedModulesBitmap = 0; // Using different name to avoid conflict with main.js
let startTime;
let progressInterval;

// Initialize activity when the DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress tracking
    startTime = new Date();
    updateTimer();
    progressInterval = setInterval(updateTimer, 60000); // Update timer every minute
    
    // Set up event listeners for module navigation buttons
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const moduleId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showModule(moduleId);
        });
    });
    
    // Initialize vocabulary activities
    initVocabularyActivities();
    
    // Initialize adjective activities
    initAdjectiveActivities();
    
    // Set up audio narration
    setupNarration();
    
    // Add achievement popup functionality
    setupAchievements();
});

// Function to start the journey (from intro screen)
function startJourney() {
    showModule('prereading');
    showAchievement('Journey Begun', 'You have started your learning journey through "The Sound of Music". Keep exploring!');
    updateScore(5);
}

// Function to show a specific module
function showModule(moduleId) {
    // Hide all modules first
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Show the selected module
    const targetModule = document.getElementById(moduleId);
    if (targetModule) {
        targetModule.classList.add('active');
        
        // Update navigation buttons
        document.querySelectorAll('.nav-item').forEach(item => {
            const itemModuleId = item.getAttribute('onclick').match(/'([^']+)'/)[1];
            item.classList.toggle('active', itemModuleId === moduleId);
            item.setAttribute('aria-pressed', itemModuleId === moduleId ? 'true' : 'false');
        });
        
        // Track module completion if not already completed
        const moduleIndex = getModuleIndex(moduleId);
        if (moduleIndex !== -1 && !isModuleCompleted(moduleIndex)) {
            completeModule(moduleIndex);
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Get module index
function getModuleIndex(moduleId) {
    const moduleIds = ['intro', 'prereading', 'story', 'poem', 'thinking-text', 'thinking-language'];
    return moduleIds.indexOf(moduleId);
}

// Check if a module is completed
function isModuleCompleted(moduleIndex) {
    return (completedModulesBitmap & (1 << moduleIndex)) !== 0;
}

// Mark a module as completed
function completeModule(moduleIndex) {
    if (!isModuleCompleted(moduleIndex)) {
        completedModulesBitmap |= (1 << moduleIndex);
        document.getElementById('modulesComplete').textContent = countCompletedModules();
        updateProgress();
        updateScore(10);
        showAchievement('Module Completed', 'You have completed a new module. Keep going!');
    }
}

// Count completed modules
function countCompletedModules() {
    let count = 0;
    for (let i = 0; i < 6; i++) {
        if (isModuleCompleted(i)) {
            count++;
        }
    }
    return count;
}

// Update progress bar
function updateProgress() {
    const completedCount = countCompletedModules();
    const totalModules = 6;
    const progressPercentage = Math.min(Math.round((completedCount / totalModules) * 100), 100);
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progressPercentage + '%';
        progressBar.textContent = progressPercentage + '%';
    }
}

// Update score - uses window.score to share with main.js
function updateScore(points) {
    // Initialize score if not defined
    if (typeof window.score !== 'number') {
        window.score = 0;
    }
    
    window.score += points;
    document.getElementById('totalScore').textContent = window.score;
    
    // Show achievement for milestone scores
    if (window.score >= 50 && window.score < 60) {
        showAchievement('Score Milestone', 'You reached 50 points! Keep going!');
    } else if (window.score >= 100 && window.score < 110) {
        showAchievement('Score Milestone', 'You reached 100 points! You\'re doing great!');
    }
}

// Update timer
function updateTimer() {
    const now = new Date();
    const timeDiff = Math.floor((now - startTime) / 1000);
    const minutes = Math.floor(timeDiff / 60);
    const seconds = timeDiff % 60;
    
    document.getElementById('timeSpent').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Initialize vocabulary activities
function initVocabularyActivities() {
    // Setup correct answers for vocabulary exercise
    const vocabAnswers = {
        vocab1: 'became',
        vocab2: 'received',
        vocab3: 'understood',
        vocab4: 'achieved'
    };
    
    // Function to check vocabulary answers
    window.checkVocabulary = function() {
        let correctCount = 0;
        let total = Object.keys(vocabAnswers).length;
        
        // Check each answer
        for (let id in vocabAnswers) {
            const select = document.getElementById(id);
            if (select && select.value === vocabAnswers[id]) {
                correctCount++;
                select.style.borderColor = '#4caf50';
            } else if (select) {
                select.style.borderColor = '#f44336';
            }
        }
        
        // Show feedback
        const feedback = document.getElementById('vocabFeedback');
        if (feedback) {
            if (correctCount === total) {
                feedback.textContent = 'Excellent! All answers are correct!';
                feedback.className = 'feedback-message success show';
                updateScore(10);
            } else {
                feedback.textContent = `You got ${correctCount} out of ${total} correct. Try again!`;
                feedback.className = 'feedback-message error show';
            }
        }
    };
}

// Initialize adjective activities
function initAdjectiveActivities() {
    // Function to check adjective answers
    window.checkAdjectiveUse = function() {
        const inputs = document.querySelectorAll('.contraction-input');
        let correctCount = 0;
        
        inputs.forEach(input => {
            // Get the correct answer directly from the data-answer attribute
            const correctAnswer = input.getAttribute('data-answer');
            
            // If no data-answer attribute, skip this input
            if (!correctAnswer) {
                console.error('Input is missing data-answer attribute:', input);
                return;
            }
            
            const userAnswer = input.value.trim().toLowerCase();
            
            if (userAnswer === correctAnswer.toLowerCase()) {
                input.style.borderColor = '#4caf50';
                correctCount++;
            } else {
                input.style.borderColor = '#f44336';
            }
        });
        
        // Show feedback
        const feedback = document.getElementById('adjectivesFeedback');
        if (feedback) {
            if (correctCount === inputs.length) {
                feedback.textContent = 'Excellent! All answers are correct!';
                feedback.className = 'feedback-message success show';
                updateScore(10);
            } else {
                feedback.textContent = `You got ${correctCount} out of ${inputs.length} correct. Try again!`;
                feedback.className = 'feedback-message error show';
            }
        }
    };
}

// Save reflection function
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    const feedback = document.getElementById('reflectionFeedback');
    
    if (reflectionText.length < 20) {
        feedback.textContent = 'Please write a more detailed reflection (at least 20 characters).';
        feedback.className = 'feedback-message error show';
        return;
    }
    
    feedback.textContent = 'Your reflection has been saved!';
    feedback.className = 'feedback-message success show';
    updateScore(5);
    
    // Mark prereading module as completed
    completeModule(1); // 1 is index for prereading
}

// Setup audio narration
function setupNarration() {
    // Simple narrator object
    window.narrator = {
        enabled: true,
        currentUtterance: null,
        onEndCallback: null,
        
        speak: function(text) {
            if (!this.enabled) return;
            
            // Create speech synthesis utterance
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            
            // Store current utterance
            this.currentUtterance = utterance;
            
            // Set up callback when speech ends
            utterance.onend = () => {
                this.currentUtterance = null;
                if (typeof this.onEndCallback === 'function') {
                    this.onEndCallback();
                }
            };
            
            // Speak the text
            window.speechSynthesis.speak(utterance);
        },
        
        stop: function() {
            window.speechSynthesis.cancel();
            this.currentUtterance = null;
        }
    };
    
    // Toggle audio function
    window.toggleAudio = function() {
        const audioBtn = document.getElementById('audioBtn');
        window.narrator.enabled = !window.narrator.enabled;
        
        if (window.narrator.enabled) {
            audioBtn.textContent = '🔊';
            audioBtn.classList.remove('muted');
        } else {
            audioBtn.textContent = '🔇';
            audioBtn.classList.add('muted');
            window.narrator.stop();
        }
    };
    
    // Ensure user interaction for speech synthesis
    window.trackUserInteraction = function() {
        // This is a dummy function to track user interaction
        // Speech synthesis often requires user interaction before it works
    };
}

// Setup achievements popup
function setupAchievements() {
    window.showAchievement = function(title, description) {
        const popup = document.getElementById('achievementPopup');
        const desc = document.getElementById('achievementDesc');
        
        if (popup && desc) {
            desc.textContent = description;
            popup.classList.add('show');
            
            // Hide after a few seconds
            setTimeout(() => {
                popup.classList.remove('show');
            }, 5000);
        }
    };
}
