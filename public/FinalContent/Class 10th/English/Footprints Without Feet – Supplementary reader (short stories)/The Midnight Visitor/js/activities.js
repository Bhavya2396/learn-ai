/**
 * Activities for The Midnight Visitor interactive lesson
 */

// Save reflection function
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    
    if (reflectionText.length < 20) {
        const feedbackEl = document.getElementById('reflectionFeedback');
        feedbackEl.textContent = 'Please write a more detailed reflection (at least 20 characters).';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('reflectionFeedback');
    feedbackEl.textContent = 'Your reflection has been saved!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (typeof score !== 'undefined') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
    
    if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('Reflection Completed!');
        }
    }
    
    if (window.narrator) {
        window.narrator.speak("Thank you for sharing your reflection. Your thoughts have been saved.");
    }
}

// Check matching exercise answers
function checkMatching() {
    const correctAnswers = {
        'match1': 'correct',
        'match2': 'correct',
        'match3': 'correct',
        'match4': 'correct',
        'match5': 'correct'
    };
    
    let score = 0;
    let total = Object.keys(correctAnswers).length;
    
    // Check each answer
    for (const [id, correctAnswer] of Object.entries(correctAnswers)) {
        const select = document.getElementById(id);
        if (!select) continue;
        
        const userAnswer = select.value;
        
        if (userAnswer === correctAnswer) {
            select.style.borderColor = '#4caf50';
            select.style.backgroundColor = '#e8f5e9';
            score++;
        } else {
            select.style.borderColor = '#f44336';
            select.style.backgroundColor = '#ffebee';
        }
    }
    
    // Display feedback
    const feedbackEl = document.getElementById('matchingFeedback');
    if (feedbackEl) {
        if (score === total) {
            feedbackEl.textContent = `Perfect! You got all ${total} answers correct.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress
            if (typeof window.score !== 'undefined') {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('thinking-language')) {
                modulesCompleted.push('thinking-language');
                if (typeof updateProgress === 'function') {
                    updateProgress();
                }
                if (typeof showAchievement === 'function') {
                    showAchievement('Vocabulary Exercise Completed!');
                }
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Check scenario responses
function checkScenarios() {
    // These are sample keywords - multiple correct answers are possible
    const keywordSets = {
        0: ['fire', 'extinguisher', 'water', 'smother', 'evacuate', 'call', 'emergency'],
        1: ['heimlich', 'back blows', 'pat', 'first aid', 'emergency', 'ambulance'],
        2: ['unplug', 'switch off', 'power', 'electricity', 'circuit breaker', 'water'],
        3: ['check', 'injury', 'help', 'ambulance', 'first aid', 'emergency', 'contact'],
        4: ['call', 'phone', 'contact', 'search', 'friends', 'police', 'message']
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    let score = 0;
    let total = inputs.length;
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // Check if the answer contains at least two keywords
        const keywords = keywordSets[index];
        const matchedKeywords = keywords.filter(keyword => userAnswer.includes(keyword));
        
        if (matchedKeywords.length >= 2 && userAnswer.length >= 15) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            score++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('scenariosFeedback');
    if (feedbackEl) {
        if (score === total) {
            feedbackEl.textContent = `Excellent! You've demonstrated good presence of mind in all ${total} scenarios.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress if not already completed
            if (typeof window.score !== 'undefined') {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            // Mark module as completed if not already done
            if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('thinking-language')) {
                modulesCompleted.push('thinking-language');
                if (typeof updateProgress === 'function') {
                    updateProgress();
                }
                if (typeof showAchievement === 'function') {
                    showAchievement('Scenarios Exercise Completed!');
                }
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try providing more detailed responses!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Show correct scenario answers
function showCorrectScenarios() {
    const inputs = document.querySelectorAll('.contraction-input');
    
    // Display the correct answer for each input
    inputs.forEach((input) => {
        const correctAnswer = input.getAttribute('data-answer');
        input.value = correctAnswer;
        input.style.borderColor = '#4caf50';
        input.style.backgroundColor = '#e8f5e9';
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('scenariosFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = 'Above are the correct responses for each scenario.';
        feedbackEl.className = 'feedback-message show success';
        
        // Read aloud if narrator is enabled
        if (window.narrator) {
            window.narrator.speak("Here are the correct responses for each emergency scenario.");
        }
    }
}

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    const reflectionButton = document.querySelector('button[onclick="saveReflection()"]');
    if (reflectionButton) {
        reflectionButton.addEventListener('click', saveReflection);
    }
    
    const matchingButton = document.querySelector('button[onclick="checkMatching()"]');
    if (matchingButton) {
        matchingButton.addEventListener('click', checkMatching);
    }
    
    const scenariosButton = document.querySelector('button[onclick="checkScenarios()"]');
    if (scenariosButton) {
        scenariosButton.addEventListener('click', checkScenarios);
    }
    
    const showCorrectScenariosButton = document.querySelector('button[onclick="showCorrectScenarios()"]');
    if (showCorrectScenariosButton) {
        showCorrectScenariosButton.addEventListener('click', showCorrectScenarios);
    }
});
