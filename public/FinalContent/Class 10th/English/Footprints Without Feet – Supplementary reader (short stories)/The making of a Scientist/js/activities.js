/**
 * Activities for The Making of a Scientist interactive lesson
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

// Check vocabulary exercise answers
function checkVocabulary() {
    const correctAnswers = {
        'vocab1': 'driving',
        'vocab2': 'drives',
        'vocab3': 'driven',
        'vocab4': 'drove',
        'vocab5': 'drive'
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
    const feedbackEl = document.getElementById('vocabFeedback');
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

// Check conditional sentences
function checkConditionals() {
    // These are sample answers - multiple correct answers are possible for conditionals
    const possibleAnswers = {
        0: ['you will succeed', 'you\'ll succeed', 'you will be successful', 'you\'ll be successful'],
        1: ['I would learn a new language', 'I\'d learn a new language', 'I would study a foreign language', 'I would take language classes'],
        2: ['millions of lives will be saved', 'many people will be saved', 'we can save millions of lives', 'it will save many lives'],
        3: ['we would have caught the train', 'we\'d have caught the train', 'we would have made it on time', 'we wouldn\'t have missed the train'],
        4: ['I will make important discoveries', 'I\'ll make important discoveries', 'I will help solve big problems', 'I\'ll contribute to scientific knowledge']
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    let score = 0;
    let total = inputs.length;
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // First check if the answer is empty
        if (userAnswer === '') {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
            return; // Skip to next input
        }
        
        // Check if the answer is among the possible correct answers
        // Only do the check if userAnswer has at least 5 characters to avoid matching empty or very short strings
        const isCorrect = userAnswer.length >= 5 && possibleAnswers[index].some(answer => 
            userAnswer.includes(answer.toLowerCase()) || 
            answer.toLowerCase().includes(userAnswer)
        );
        
        if (isCorrect) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            score++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('conditionalssFeedback');
    if (feedbackEl) {
        if (score === total) {
            feedbackEl.textContent = `Perfect! You completed all ${total} conditional sentences correctly.`;
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
                    showAchievement('Conditionals Exercise Completed!');
                }
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Show correct answers for conditionals
function showConditionalAnswers() {
    const inputs = document.querySelectorAll('.contraction-input');
    
    // Set each input to its correct answer
    inputs.forEach((input) => {
        // Get the correct answer from the data-answer attribute
        const correctAnswer = input.getAttribute('data-answer');
        input.value = correctAnswer;
        
        // Style the input to show it's correct
        input.style.borderColor = '#4caf50';
        input.style.backgroundColor = '#e8f5e9';
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('conditionalssFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = 'Above are the correct completions for each conditional sentence.';
        feedbackEl.className = 'feedback-message show success';
        
        // Read aloud if narrator is enabled
        if (window.narrator) {
            window.narrator.speak("Here are the correct completions for the conditional sentences.");
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
    
    const vocabButton = document.querySelector('button[onclick="checkVocabulary()"]');
    if (vocabButton) {
        vocabButton.addEventListener('click', checkVocabulary);
    }
    
    const conditionalsButton = document.querySelector('button[onclick="checkConditionals()"]');
    if (conditionalsButton) {
        conditionalsButton.addEventListener('click', checkConditionals);
    }
    
    const showConditionalsButton = document.querySelector('button[onclick="showConditionalAnswers()"]');
    if (showConditionalsButton) {
        showConditionalsButton.addEventListener('click', showConditionalAnswers);
    }
});
