/**
 * Activities and exercises for A Question of Trust interactive lesson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Setup reflection activity
    setupReflectionExercise();
    
    // Setup vocabulary exercises
    setupVocabularyExercise();
    
    // Setup conditional exercises
    setupConditionalExercise();
});

// Setup the reflection exercise
function setupReflectionExercise() {
    const saveReflectionBtn = document.querySelector('.reflection-exercise button');
    if (saveReflectionBtn) {
        saveReflectionBtn.addEventListener('click', saveReflection);
    }
}

// Save reflection function
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText');
    const feedbackMsg = document.getElementById('reflectionFeedback');
    
    if (!reflectionText || !feedbackMsg) return;
    
    const text = reflectionText.value.trim();
    
    if (text.length < 20) {
        feedbackMsg.textContent = 'Please write a more detailed reflection (at least 20 characters).';
        feedbackMsg.className = 'feedback-message error show';
        return;
    }
    
    // Save the reflection (in a real app, this would send to a server)
    feedbackMsg.textContent = 'Your reflection has been saved!';
    feedbackMsg.className = 'feedback-message success show';
    
    // Update score
    if (typeof score !== 'undefined') {
        score += 5;
        const scoreElement = document.getElementById('totalScore');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }
    
    // Show achievement
    if (typeof showAchievement === 'function') {
        showAchievement('Reflection Completed!');
    }
}

// Setup vocabulary exercise
function setupVocabularyExercise() {
    const checkVocabBtn = document.querySelector('.vocabulary-exercise .interactive-btn');
    if (checkVocabBtn) {
        checkVocabBtn.addEventListener('click', checkVocabulary);
    }
}

// Check vocabulary answers
function checkVocabulary() {
    // Define correct answers
    const correctAnswers = {
        'vocab1': 'could',
        'vocab2': 'would',
        'vocab3': 'should',
        'vocab4': 'would',
        'vocab5': 'should'
    };
    
    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    
    // Check each answer
    for (const [id, correctAnswer] of Object.entries(correctAnswers)) {
        const select = document.getElementById(id);
        if (!select) continue;
        
        const userAnswer = select.value;
        
        if (userAnswer === correctAnswer) {
            select.style.borderColor = '#4caf50';
            select.style.backgroundColor = '#e8f5e9';
            correctCount++;
        } else {
            select.style.borderColor = '#f44336';
            select.style.backgroundColor = '#ffebee';
        }
    }
    
    // Show feedback
    const feedbackElement = document.getElementById('vocabFeedback');
    if (feedbackElement) {
        if (correctCount === totalQuestions) {
            feedbackElement.textContent = 'Excellent! All answers are correct.';
            feedbackElement.className = 'feedback-message success show';
            
            // Update score if all correct
            if (typeof score !== 'undefined') {
                score += 10;
                const scoreElement = document.getElementById('totalScore');
                if (scoreElement) {
                    scoreElement.textContent = score;
                }
            }
            
            // Show achievement
            if (typeof showAchievement === 'function') {
                showAchievement('Vocabulary Master!');
            }
        } else {
            feedbackElement.textContent = `You got ${correctCount} out of ${totalQuestions} correct. Try again!`;
            feedbackElement.className = 'feedback-message warning show';
        }
    }
}

    // Setup conditional exercise
function setupConditionalExercise() {
    const buttons = document.querySelectorAll('.matching-game .interactive-btn');
    if (buttons.length > 0) {
        // First button is "Check Answers"
        buttons[0].addEventListener('click', checkConditionals);
        
        // Second button is "Show Answers" if it exists
        if (buttons.length > 1) {
            buttons[1].addEventListener('click', showConditionals);
        }
    }
}

// Check conditional answers
function checkConditionals() {
    // Get all input fields
    const inputs = document.querySelectorAll('.contraction-input');
    
    let correctCount = 0;
    const totalQuestions = inputs.length;
    
    // Check each answer
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        // Check if user answer is empty
        if (userAnswer === '') {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
        // Allow for some flexibility in answers, but only if not empty
        else if (userAnswer === correctAnswer || 
                (userAnswer.length > 5 && (correctAnswer.includes(userAnswer) || userAnswer.includes(correctAnswer)))) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correctCount++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    // Show feedback
    const feedbackElement = document.getElementById('conditionalssFeedback');
    if (feedbackElement) {
        if (correctCount === totalQuestions) {
            feedbackElement.textContent = 'Perfect! All conditional sentences are correct.';
            feedbackElement.className = 'feedback-message success show';
            
            // Update score if all correct
            if (typeof score !== 'undefined') {
                score += 10;
                const scoreElement = document.getElementById('totalScore');
                if (scoreElement) {
                    scoreElement.textContent = score;
                }
            }
            
            // Show achievement
            if (typeof showAchievement === 'function') {
                showAchievement('Grammar Expert!');
            }
        } else {
            feedbackElement.textContent = `You got ${correctCount} out of ${totalQuestions} correct. Try again!`;
            feedbackElement.className = 'feedback-message warning show';
        }
    }
}

// Show conditional answers
function showConditionals() {
    // Get all input fields
    const inputs = document.querySelectorAll('.contraction-input');
    
    // Display the correct answer for each input
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer');
        input.value = correctAnswer;
        input.style.borderColor = '#4caf50';
        input.style.backgroundColor = '#e8f5e9';
    });
    
    // Show feedback
    const feedbackElement = document.getElementById('conditionalssFeedback');
    if (feedbackElement) {
        feedbackElement.textContent = 'Here are the correct answers for the conditional sentences.';
        feedbackElement.className = 'feedback-message success show';
        
        // Read aloud if narrator is enabled
        if (window.narrator) {
            window.narrator.speak("Here are the correct answers for the conditional sentences.");
        }
    }
}
