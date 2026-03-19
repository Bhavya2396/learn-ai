/**
 * Activities for The Proposal interactive lesson
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
    if (typeof window.score !== 'undefined') {
        window.score += 15;
        document.getElementById('totalScore').textContent = window.score;
    }
    
    if (typeof window.modulesCompleted !== 'undefined' && !window.modulesCompleted.includes('prereading')) {
        window.modulesCompleted.push('prereading');
        if (typeof window.updateProgress === 'function') {
            window.updateProgress();
        }
        if (typeof window.showAchievement === 'function') {
            window.showAchievement('Reflection Completed!');
        }
    }
    
    if (window.narrator) {
        window.narrator.speak("Thank you for sharing your reflection. Your thoughts have been saved.");
    }
}

// Check vocabulary exercise answers
function checkVocabulary() {
    const correctAnswers = {
        'vocab1': 'fair',
        'vocab2': 'fare',
        'vocab3': 'principal',
        'vocab4': 'principle'
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
            
            // Mark as a partial completion
            markLanguageModuleProgress();
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Check conditionals sentences
function checkConditionals() {
    // These are sample answers - multiple correct answers are possible for reported speech
    const possibleAnswers = {
        0: ['asked'],
        1: ['said'],
        2: ['there'],
        3: ['past tense', 'past'],
        4: ['past continuous', 'past continuous tense']
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    let score = 0;
    let total = inputs.length;
    let allInputsFilled = true;
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // Check if input is empty
        if (userAnswer === '') {
            input.style.borderColor = '#ffc107';
            input.style.backgroundColor = '#fff8e1';
            allInputsFilled = false;
            return;
        }
        
        // Check if the answer is among the possible correct answers
        const isCorrect = possibleAnswers[index].some(answer => 
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
        if (!allInputsFilled) {
            feedbackEl.textContent = `Please fill in all the blanks before checking your answers.`;
            feedbackEl.className = 'feedback-message show warning';
        } else if (score === total) {
            feedbackEl.textContent = `Perfect! You completed all ${total} answers correctly.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress
            if (typeof window.score !== 'undefined') {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            // Mark as a partial completion or full completion if vocab was also done
            markLanguageModuleProgress();
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Track language module completion progress
function markLanguageModuleProgress() {
    // Both activities need to be completed to mark the module as done
    const vocabFeedback = document.getElementById('vocabFeedback');
    const conditionalsFeedback = document.getElementById('conditionalssFeedback');
    
    const vocabComplete = vocabFeedback && vocabFeedback.classList.contains('success');
    const conditionalsComplete = conditionalsFeedback && conditionalsFeedback.classList.contains('success');
    
    // Mark the module as completed if both activities are done
    if (vocabComplete && conditionalsComplete) {
        if (typeof window.modulesCompleted !== 'undefined' && !window.modulesCompleted.includes('thinking-language')) {
            window.modulesCompleted.push('thinking-language');
            if (typeof window.updateProgress === 'function') {
                window.updateProgress();
            }
            if (typeof window.showAchievement === 'function') {
                window.showAchievement('Language Activities Completed!');
            }
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
