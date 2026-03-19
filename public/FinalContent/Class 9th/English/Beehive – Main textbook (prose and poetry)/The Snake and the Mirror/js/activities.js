/**
 * Activities for The Snake and the Mirror interactive lesson
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
        'vocab1': 'to stone',
        'vocab2': 'my breath',
        'vocab3': 'a stone image in the flesh'
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

// Check reported questions
function checkConditionals() {
    // These are sample answers - multiple correct answers are possible for reported questions
    const possibleAnswers = {
        0: ['if she thought her teacher would come that day', 'whether she thought her teacher would come that day'],
        1: ['where he would go that summer', 'where he would go for the summer'],
        2: ['why he was studying english'],
        3: ['when we were going to leave', 'when they were going to leave'],
        4: ['if i had finished reading the newspaper', 'whether i had finished reading the newspaper']
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    let score = 0;
    let total = inputs.length;
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // Check if the answer is among the possible correct answers and not empty
        const isCorrect = userAnswer !== '' && possibleAnswers[index].some(answer => 
            userAnswer.includes(answer.toLowerCase()) || 
            (userAnswer.length > 3 && answer.toLowerCase().includes(userAnswer))
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
            feedbackEl.textContent = `Perfect! You completed all ${total} reported questions correctly.`;
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
                    showAchievement('Reported Questions Exercise Completed!');
                }
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
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
});
