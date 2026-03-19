/**
 * Activities for A Truly Beautiful Mind interactive lesson
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
        'vocab1': 'correct', // Working round the clock
        'vocab2': 'correct', // noticing the colours blending softly into one another
        'vocab3': 'correct', // neighing continually
        'vocab4': 'correct', // Having taken the wrong train
        'vocab5': 'correct'  // Not having bathed for two days
    };
    
    let score = 0;
    let total = Object.keys(correctAnswers).length;
    let answersSubmitted = 0;
    
    // Check each answer
    for (const [id, correctAnswer] of Object.entries(correctAnswers)) {
        const select = document.getElementById(id);
        if (!select) continue;
        
        const userAnswer = select.value;
        
        // Only count if user has selected an answer
        if (userAnswer) {
            answersSubmitted++;
            
            if (userAnswer === correctAnswer) {
                select.style.borderColor = '#4caf50';
                select.style.backgroundColor = '#e8f5e9';
                score++;
            } else {
                select.style.borderColor = '#f44336';
                select.style.backgroundColor = '#ffebee';
            }
        }
    }
    
    // Display feedback
    const feedbackEl = document.getElementById('vocabFeedback');
    if (feedbackEl) {
        // Check if any answers were submitted
        if (answersSubmitted === 0) {
            feedbackEl.textContent = 'Please select at least one answer.';
            feedbackEl.className = 'feedback-message show error';
            return;
        }

        if (score === answersSubmitted && answersSubmitted === total) {
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
        } else if (score === answersSubmitted) {
            feedbackEl.textContent = `Good job on the answers you submitted! Complete all questions to finish the exercise.`;
            feedbackEl.className = 'feedback-message show success';
        } else {
            feedbackEl.textContent = `You got ${score} out of ${answersSubmitted} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Check conditional sentences
function checkConditionals() {
    // These are sample answers - multiple correct answers are possible for conditionals
    const possibleAnswers = {
        0: ['became weak', 'failed', 'broke'],
        1: ['in disagreement', 'on bad terms', 'unhappy'],
        2: ['declared', 'praised', 'showed'],
        3: ['campaigning', 'fighting', 'supporting'],
        4: ['suffocated', 'unable to breathe']
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    let score = 0;
    let total = inputs.length;
    let answersSubmitted = 0;
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // Only count if user has entered something
        if (userAnswer) {
            answersSubmitted++;
            
            // Check if the answer is among the possible correct answers
            const isCorrect = possibleAnswers[index].some(answer => 
                userAnswer === answer.toLowerCase()
            );
            
            if (isCorrect) {
                input.style.borderColor = '#4caf50';
                input.style.backgroundColor = '#e8f5e9';
                score++;
            } else {
                input.style.borderColor = '#f44336';
                input.style.backgroundColor = '#ffebee';
            }
        }
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('conditionalssFeedback');
    if (feedbackEl) {
        // Check if any answers were submitted
        if (answersSubmitted === 0) {
            feedbackEl.textContent = 'Please answer at least one question.';
            feedbackEl.className = 'feedback-message show error';
            return;
        }

        if (score === answersSubmitted && answersSubmitted === total) {
            feedbackEl.textContent = `Perfect! You completed all ${total} vocabulary items correctly.`;
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
                    showAchievement('Vocabulary Exercise Completed!');
                }
            }
        } else if (score === answersSubmitted) {
            feedbackEl.textContent = `Good job on the answers you submitted! Complete all questions to finish the exercise.`;
            feedbackEl.className = 'feedback-message show success';
        } else {
            feedbackEl.textContent = `You got ${score} out of ${answersSubmitted} correct. Try again!`;
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