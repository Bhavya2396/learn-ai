/**
 * Activities for The Necklace interactive lesson
 */

// Save Reflection Function
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText');
    const feedbackElement = document.getElementById('reflectionFeedback');
    
    if (!reflectionText || !feedbackElement) return;
    
    const text = reflectionText.value.trim();
    
    if (text.length < 10) {
        feedbackElement.textContent = 'Please write a more detailed reflection.';
        feedbackElement.className = 'feedback-message warning show';
        return;
    }
    
    // Save the reflection (in a real app, this might send to a server)
    localStorage.setItem('necklace_reflection', text);
    
    // Show success message
    feedbackElement.textContent = 'Your reflection has been saved!';
    feedbackElement.className = 'feedback-message success show';
    
    // Update score
    if (typeof updateScore === 'function') {
        updateScore(5);
    }
    
    // Update progress
    if (!modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        updateProgress();
        showAchievement('Pre-reading Activity Completed!');
    }
}

// Check vocabulary exercise
function checkVocabulary() {
    const vocabFeedback = document.getElementById('vocabFeedback');
    if (!vocabFeedback) return;
    
    const vocab1 = document.getElementById('vocab1');
    const vocab2 = document.getElementById('vocab2');
    const vocab3 = document.getElementById('vocab3');
    const vocab4 = document.getElementById('vocab4');
    const vocab5 = document.getElementById('vocab5');
    
    if (!vocab1 || !vocab2 || !vocab3 || !vocab4 || !vocab5) return;
    
    // Get selected values
    const answers = [
        {element: vocab1, value: vocab1.value, correct: 'ruinous', feedback: document.getElementById('vocab1-feedback')},
        {element: vocab2, value: vocab2.value, correct: 'frigid', feedback: document.getElementById('vocab2-feedback')},
        {element: vocab3, value: vocab3.value, correct: 'incessantly', feedback: document.getElementById('vocab3-feedback')},
        {element: vocab4, value: vocab4.value, correct: 'spitefully', feedback: document.getElementById('vocab4-feedback')},
        {element: vocab5, value: vocab5.value, correct: 'ecstatic', feedback: document.getElementById('vocab5-feedback')}
    ];
    
    // Check if all are answered
    const unanswered = answers.filter(a => !a.value);
    if (unanswered.length > 0) {
        vocabFeedback.textContent = 'Please answer all questions.';
        vocabFeedback.className = 'feedback-message warning show';
        return;
    }
    
    // Check correct answers
    let correct = 0;
    answers.forEach(answer => {
        if (answer.value === answer.correct) {
            correct++;
            answer.element.classList.add('correct-answer');
            answer.element.classList.remove('incorrect-answer');
            if (answer.feedback) {
                answer.feedback.textContent = '✓ Correct!';
                answer.feedback.className = 'individual-feedback correct';
            }
        } else {
            answer.element.classList.add('incorrect-answer');
            answer.element.classList.remove('correct-answer');
            if (answer.feedback) {
                answer.feedback.textContent = '✗ Incorrect';
                answer.feedback.className = 'individual-feedback incorrect';
            }
        }
    });
    
    // Display result
    if (correct === answers.length) {
        vocabFeedback.textContent = 'Perfect! All answers are correct.';
        vocabFeedback.className = 'feedback-message success show';
        
        // Award points if this is the first time getting all correct
        if (!document.querySelector('.vocabulary-exercise').classList.contains('completed')) {
            document.querySelector('.vocabulary-exercise').classList.add('completed');
            if (typeof updateScore === 'function') {
                updateScore(10);
            }
        }
    } else {
        vocabFeedback.textContent = `You got ${correct} out of ${answers.length} correct. Try again!`;
        vocabFeedback.className = 'feedback-message partial show';
    }
}

// Check conditionals exercise
function checkConditionals() {
    const feedbackElement = document.getElementById('conditionalsFeedback');
    if (!feedbackElement) return;
    
    const inputs = document.querySelectorAll('.contraction-input');
    let allCorrect = true;
    let correctCount = 0;
    
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        const feedbackSpan = document.getElementById(`conditional-feedback-${index+1}`);
        
        // Check if the answer is correct or close enough (simple check)
        const isCorrect = userAnswer === correctAnswer || 
                          (userAnswer.length > 5 && correctAnswer.includes(userAnswer)) ||
                          (correctAnswer.length > 5 && userAnswer.includes(correctAnswer));
        
        if (isCorrect) {
            input.classList.add('correct-input');
            input.classList.remove('incorrect-input');
            correctCount++;
            if (feedbackSpan) {
                feedbackSpan.textContent = '✓ Correct!';
                feedbackSpan.className = 'individual-feedback correct';
            }
        } else {
            input.classList.add('incorrect-input');
            input.classList.remove('correct-input');
            allCorrect = false;
            if (feedbackSpan) {
                feedbackSpan.textContent = '✗ Incorrect';
                feedbackSpan.className = 'individual-feedback incorrect';
            }
        }
    });
    
    // Display feedback
    if (allCorrect) {
        feedbackElement.textContent = 'Excellent! All your answers are correct.';
        feedbackElement.className = 'feedback-message success show';
        
        // Award points if this is the first time getting all correct
        const matchingGame = document.querySelector('.matching-game');
        if (matchingGame && !matchingGame.classList.contains('completed')) {
            matchingGame.classList.add('completed');
            if (typeof updateScore === 'function') {
                updateScore(10);
            }
        }
    } else {
        feedbackElement.textContent = `You got ${correctCount} out of ${inputs.length} correct. Keep trying!`;
        feedbackElement.className = 'feedback-message partial show';
    }
}

// Show vocabulary answers function
function showVocabAnswers() {
    const answers = [
        {element: document.getElementById('vocab1'), correct: 'ruinous'},
        {element: document.getElementById('vocab2'), correct: 'frigid'},
        {element: document.getElementById('vocab3'), correct: 'incessantly'},
        {element: document.getElementById('vocab4'), correct: 'spitefully'},
        {element: document.getElementById('vocab5'), correct: 'ecstatic'}
    ];
    
    answers.forEach(answer => {
        if (answer.element) {
            answer.element.value = answer.correct;
            answer.element.classList.add('shown-answer');
        }
    });
    
    const vocabFeedback = document.getElementById('vocabFeedback');
    if (vocabFeedback) {
        vocabFeedback.textContent = 'Answers have been revealed.';
        vocabFeedback.className = 'feedback-message info show';
    }
}

// Show conditional answers function
function showConditionalAnswers() {
    const inputs = document.querySelectorAll('.contraction-input');
    
    inputs.forEach(input => {
        input.value = input.dataset.answer;
        input.classList.add('shown-answer');
    });
    
    const feedbackElement = document.getElementById('conditionalsFeedback');
    if (feedbackElement) {
        feedbackElement.textContent = 'Answers have been revealed.';
        feedbackElement.className = 'feedback-message info show';
    }
}

// Initialize activity interactions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if reflection was previously saved and restore it
    const savedReflection = localStorage.getItem('necklace_reflection');
    const reflectionText = document.getElementById('reflectionText');
    
    if (savedReflection && reflectionText) {
        reflectionText.value = savedReflection;
    }
    
    // Add event listeners for exercise buttons
    const saveReflectionBtn = document.querySelector('button[onclick="saveReflection()"]');
    if (saveReflectionBtn) {
        saveReflectionBtn.addEventListener('click', saveReflection);
    }
    
    const checkVocabBtn = document.querySelector('button[onclick="checkVocabulary()"]');
    if (checkVocabBtn) {
        checkVocabBtn.addEventListener('click', checkVocabulary);
    }
    
    const checkConditionalsBtn = document.querySelector('button[onclick="checkConditionals()"]');
    if (checkConditionalsBtn) {
        checkConditionalsBtn.addEventListener('click', checkConditionals);
    }
    
    const showVocabAnswersBtn = document.querySelector('button[onclick="showVocabAnswers()"]');
    if (showVocabAnswersBtn) {
        showVocabAnswersBtn.addEventListener('click', showVocabAnswers);
    }
    
    const showConditionalAnswersBtn = document.querySelector('button[onclick="showConditionalAnswers()"]');
    if (showConditionalAnswersBtn) {
        showConditionalAnswersBtn.addEventListener('click', showConditionalAnswers);
    }
});
