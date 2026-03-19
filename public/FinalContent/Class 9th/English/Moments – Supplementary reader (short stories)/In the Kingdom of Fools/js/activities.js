/**
 * Activities and interactive elements for In the Kingdom of Fools lesson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive activities
    initializeActivities();
});

function initializeActivities() {
    // Set up event listeners for vocabulary exercises
    setupVocabularyExercise();
    
    // Set up event listeners for conditional sentences exercise
    setupConditionalsExercise();
    
    // Set up reflection saving functionality
    setupReflectionSaving();
}

// Vocabulary exercise functionality
function setupVocabularyExercise() {
    const checkButton = document.querySelector('#thinking-language .vocabulary-exercise .interactive-btn');
    if (!checkButton) return;
    
    checkButton.addEventListener('click', checkVocabulary);
}

// Check vocabulary exercise answers
function checkVocabulary() {
    // Correct answers for each vocabulary question
    const correctAnswers = {
        'vocab1': 'noun',
        'vocab2': 'adverb',
        'vocab3': 'adverb',
        'vocab4': 'noun',
        'vocab5': 'verb'
    };
    
    let score = 0;
    let total = Object.keys(correctAnswers).length;
    let feedback = "";
    
    // Check each answer
    for (const [id, answer] of Object.entries(correctAnswers)) {
        const select = document.getElementById(id);
        if (!select) continue;
        
        if (select.value === answer) {
            select.style.borderColor = '#4CAF50';
            score++;
        } else {
            select.style.borderColor = '#F44336';
        }
    }
    
    // Prepare feedback message
    if (score === total) {
        feedback = `Perfect! ${score}/${total} correct. You have an excellent understanding of word functions.`;
    } else if (score >= Math.floor(total * 0.6)) {
        feedback = `Good job! ${score}/${total} correct. You have a good understanding of word functions.`;
    } else {
        feedback = `You got ${score}/${total} correct. Let's review the different functions of words.`;
    }
    
    // Display feedback
    const feedbackElement = document.getElementById('vocabFeedback');
    if (feedbackElement) {
        feedbackElement.textContent = feedback;
        feedbackElement.className = 'feedback-message show';
        
        if (score === total) {
            feedbackElement.classList.add('success');
        } else if (score >= Math.floor(total * 0.6)) {
            feedbackElement.classList.add('success');
        } else {
            feedbackElement.classList.add('error');
        }
    }
    
    // Award points based on performance
    if (typeof updateScore === 'function') {
        updateScore(score * 2); // 2 points per correct answer
    }
}

// Conditionals exercise functionality
function setupConditionalsExercise() {
    const checkButton = document.querySelector('#thinking-language .matching-game .interactive-btn');
    if (!checkButton) return;
    
    checkButton.addEventListener('click', checkConditionals);
}

// Check conditional sentences exercise
function checkConditionals() {
    const answers = document.querySelectorAll('.contraction-input');
    let score = 0;
    let feedbackText = "";
    
    answers.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        // Check if the answer is correct or close enough
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4CAF50';
            score++;
        } else if (isCloseEnough(userAnswer, correctAnswer)) {
            input.style.borderColor = '#FFC107'; // Yellow for close answers
            input.title = "Close! The exact answer is: " + correctAnswer;
            score += 0.5;
        } else {
            input.style.borderColor = '#F44336';
            input.title = "The correct answer is: " + correctAnswer;
        }
    });
    
    // Prepare feedback message
    if (score === answers.length) {
        feedbackText = "Perfect! All conditional sentences are correct.";
    } else if (score >= answers.length * 0.7) {
        feedbackText = "Good job! Most of your conditional sentences are correct.";
    } else if (score >= answers.length * 0.4) {
        feedbackText = "You're getting there. Keep practicing conditional sentences.";
    } else {
        feedbackText = "Let's review conditional sentences. Check the correct answers and try again.";
    }
    
    // Display feedback
    const feedbackElement = document.getElementById('conditionalssFeedback');
    if (feedbackElement) {
        // Clear any previous content/buttons
        feedbackElement.innerHTML = '';
        
        // Add the feedback text
        const feedbackTextElement = document.createElement('span');
        feedbackTextElement.textContent = feedbackText;
        feedbackElement.appendChild(feedbackTextElement);
        
        feedbackElement.className = 'feedback-message show';
        
        if (score === answers.length) {
            feedbackElement.classList.add('success');
        } else if (score >= answers.length * 0.7) {
            feedbackElement.classList.add('success');
        } else if (score >= answers.length * 0.4) {
            feedbackElement.classList.add('warning');
            
            // Add a button to show answers
            const showAnswersBtn = document.createElement('button');
            showAnswersBtn.textContent = 'Show Correct Answers';
            showAnswersBtn.className = 'interactive-btn show-answers-btn';
            showAnswersBtn.onclick = function() {
                showCorrectConditionalAnswers();
            };
            
            feedbackElement.appendChild(showAnswersBtn);
        } else {
            feedbackElement.classList.add('error');
            
            // Add a button to show answers
            const showAnswersBtn = document.createElement('button');
            showAnswersBtn.textContent = 'Show Correct Answers';
            showAnswersBtn.className = 'interactive-btn show-answers-btn';
            showAnswersBtn.onclick = function() {
                showCorrectConditionalAnswers();
            };
            
            feedbackElement.appendChild(showAnswersBtn);
        }
    }
    
    // Award points
    if (typeof updateScore === 'function') {
        updateScore(Math.round(score * 2)); // 2 points per correct answer
    }
}

// Helper function to check if an answer is close enough
function isCloseEnough(userAnswer, correctAnswer) {
    // If answers are very short, require exact match
    if (correctAnswer.length < 5) return false;
    
    // Otherwise check if the answers are similar
    const userWords = userAnswer.split(/\s+/);
    const correctWords = correctAnswer.split(/\s+/);
    
    // Count matching words
    const matchingWords = userWords.filter(word => 
        correctWords.includes(word) && word.length > 2
    ).length;
    
    // Consider it close enough if 70% of words match
    return matchingWords >= Math.max(correctWords.length * 0.7, 2);
}

// Setup reflection saving functionality
function setupReflectionSaving() {
    const saveButton = document.querySelector('#prereading .reflection-exercise .interactive-btn');
    if (!saveButton) return;
    
    saveButton.addEventListener('click', saveReflection);
}

// Save user reflection
function saveReflection() {
    const textarea = document.getElementById('reflectionText');
    const feedback = document.getElementById('reflectionFeedback');
    
    if (!textarea || !feedback) return;
    
    const reflection = textarea.value.trim();
    
    if (reflection.length < 20) {
        feedback.textContent = "Please write a more detailed reflection (at least 20 characters).";
        feedback.className = 'feedback-message error show';
        return;
    }
    
    // In a real application, we might save this to a server
    // Here we'll just acknowledge it and give points
    
    feedback.textContent = "Reflection saved successfully! Great thinking.";
    feedback.className = 'feedback-message success show';
    
    // Award points for thoughtful reflection
    if (typeof updateScore === 'function') {
        updateScore(5);
    }
    
    // Mark module as completed if not already
    if (typeof markModuleCompleted === 'function') {
        markModuleCompleted('prereading');
    }
    
    // Remove success message after a few seconds
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 5000);
}

// Helper function to mark a module as completed
function markModuleCompleted(moduleId) {
    if (typeof modulesCompleted !== 'undefined' && Array.isArray(modulesCompleted)) {
        if (!modulesCompleted.includes(moduleId)) {
            modulesCompleted.push(moduleId);
            
            if (typeof updateProgress === 'function') {
                updateProgress();
            }
            
            if (typeof showAchievement === 'function') {
                showAchievement(`Module Completed: ${getModuleName(moduleId)}`);
            }
        }
    }
}

// Show correct answers for conditionals
function showCorrectConditionalAnswers() {
    const inputs = document.querySelectorAll('.contraction-input');
    
    inputs.forEach((input) => {
        const correctAnswer = input.getAttribute('data-answer');
        
        // Create a tooltip with the correct answer
        const tooltip = document.createElement('div');
        tooltip.className = 'answer-tooltip';
        tooltip.textContent = `Correct answer: ${correctAnswer}`;
        
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

// Helper function to get a friendly module name
function getModuleName(moduleId) {
    switch (moduleId) {
        case 'intro': return 'Introduction';
        case 'prereading': return 'Let\'s Begin';
        case 'story': return 'The Story';
        case 'thinking-text': return 'Reading Comprehension';
        case 'thinking-language': return 'Vocabulary & Grammar';
        default: return moduleId;
    }
}
