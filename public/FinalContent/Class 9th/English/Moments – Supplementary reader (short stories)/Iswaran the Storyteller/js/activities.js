/**
 * Activities for Iswaran the Storyteller interactive lesson
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
        'vocab1': 'captivated',
        'vocab2': 'attacks',
        'vocab3': 'harsh',
        'vocab4': 'relating'
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

// Check adverbs exercises
function checkAdverbs() {
    // These are sample answers - multiple correct answers are possible for adverbs
    const possibleAnswers = {
        0: ['unexpectedly', 'suddenly'],
        1: ['confidently', 'bravely', 'boldly'],
        2: ['menacingly', 'threateningly', 'aggressively'],
        3: ['excitedly', 'enthusiastically', 'dramatically'],
        4: ['casually', 'nonchalantly', 'indifferently']
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    let score = 0;
    let total = inputs.length;
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // First check if the input is empty
        if (!userAnswer) {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
        // Then check if the answer is among the possible correct answers
        else {
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
        }
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('adverbsFeedback');
    if (feedbackEl) {
        // Clear any previous content/buttons
        feedbackEl.innerHTML = '';
        
        if (score === total) {
            feedbackEl.textContent = `Perfect! You completed all ${total} adverb examples correctly.`;
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
                    showAchievement('Adverbs Exercise Completed!');
                }
            }
        } else {
            const feedbackText = document.createTextNode(`You got ${score} out of ${total} correct. Try again!`);
            feedbackEl.appendChild(feedbackText);
            feedbackEl.className = 'feedback-message show error';
            
            // Add a button to show answers
            const showAnswersBtn = document.createElement('button');
            showAnswersBtn.textContent = 'Show Correct Answers';
            showAnswersBtn.className = 'interactive-btn show-answers-btn';
            showAnswersBtn.onclick = function() {
                showCorrectAdverbs();
            };
            
            feedbackEl.appendChild(showAnswersBtn);
        }
    }
}

// Show correct answers for adverbs
function showCorrectAdverbs() {
    const inputs = document.querySelectorAll('.contraction-input');
    const possibleAnswers = {
        0: ['unexpectedly', 'suddenly'],
        1: ['confidently', 'bravely', 'boldly'],
        2: ['menacingly', 'threateningly', 'aggressively'],
        3: ['excitedly', 'enthusiastically', 'dramatically'],
        4: ['casually', 'nonchalantly', 'indifferently']
    };
    
    inputs.forEach((input, index) => {
        // Create a tooltip with the correct answer
        const tooltip = document.createElement('div');
        tooltip.className = 'answer-tooltip';
        tooltip.textContent = `Answer: ${possibleAnswers[index].join(' or ')}`;
        
        // Position the tooltip near the input
        const inputRect = input.getBoundingClientRect();
        tooltip.style.top = `${inputRect.bottom + window.scrollY + 5}px`;
        tooltip.style.left = `${inputRect.left + window.scrollX}px`;
        
        // Add to the document
        document.body.appendChild(tooltip);
        
        // Remove after a few seconds
        setTimeout(() => {
            tooltip.classList.add('fade-out');
            setTimeout(() => tooltip.remove(), 500);
        }, 5000);
    });
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
    
    const adverbsButton = document.querySelector('button[onclick="checkAdverbs()"]');
    if (adverbsButton) {
        adverbsButton.addEventListener('click', checkAdverbs);
    }
});
