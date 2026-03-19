/**
 * Activities and interactive exercises for Reach for the Top
 */

// Global variables for activity state
let reflectionSaved = false;
let vocabularyAnswers = {
    vocab1: 'correct',
    vocab2: 'correct',
    vocab3: 'correct'
};
let combiningSentencesAnswers = {
    0: 'Grandfather told me about the old days when all books were printed on paper.',
    1: 'After you finish the book, perhaps you just throw it away.',
    2: 'He gave the little girl an apple and took the computer apart.',
    3: 'When you have nothing, that makes you very determined.',
    4: 'I never thought of quitting because I knew what I wanted.'
};

// Function to save reflection
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value;
    const feedbackDiv = document.getElementById('reflectionFeedback');
    
    if (!reflectionText || reflectionText.length < 10) {
        feedbackDiv.textContent = 'Please write a longer reflection to continue.';
        feedbackDiv.className = 'feedback-message error show';
        return;
    }
    
    // Save reflection (this would typically go to a database)
    reflectionSaved = true;
    
    // Show success message
    feedbackDiv.textContent = 'Your reflection has been saved successfully!';
    feedbackDiv.className = 'feedback-message success show';
    
    // Award points
    if (typeof updateScore === 'function') {
        updateScore(15);
    }
    
    // Show achievement
    if (typeof showAchievement === 'function') {
        showAchievement('Reflection Saved! +15 points');
    }
    
    // Encourage user to move to next module
    setTimeout(() => {
        feedbackDiv.textContent = 'Now you can move on to the story sections.';
        
        // Add a button to go to the Santosh Yadav story
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Go to Santosh Yadav Story';
        nextButton.className = 'interactive-btn';
        nextButton.onclick = function() {
            if (typeof showModule === 'function') {
                showModule('santosh-story');
            }
        };
        feedbackDiv.appendChild(document.createElement('br'));
        feedbackDiv.appendChild(nextButton);
    }, 2000);
}

// Check vocabulary exercise
function checkVocabulary() {
    const feedbackDiv = document.getElementById('vocabFeedback');
    const vocab1 = document.getElementById('vocab1').value;
    const vocab2 = document.getElementById('vocab2').value;
    const vocab3 = document.getElementById('vocab3').value;
    
    if (!vocab1 || !vocab2 || !vocab3) {
        feedbackDiv.textContent = 'Please select an answer for all questions.';
        feedbackDiv.className = 'feedback-message error show';
        return;
    }
    
    // Check answers
    let correctAnswers = 0;
    let totalQuestions = 3;
    
    if (vocab1 === vocabularyAnswers.vocab1) correctAnswers++;
    if (vocab2 === vocabularyAnswers.vocab2) correctAnswers++;
    if (vocab3 === vocabularyAnswers.vocab3) correctAnswers++;
    
    // Calculate score
    const score = Math.round((correctAnswers / totalQuestions) * 20);
    
    // Show feedback
    if (correctAnswers === totalQuestions) {
        feedbackDiv.textContent = `Perfect! You got all ${correctAnswers} out of ${totalQuestions} correct.`;
        feedbackDiv.className = 'feedback-message success show';
        
        // Award points
        if (typeof updateScore === 'function') {
            updateScore(score);
        }
        
        // Show achievement
        if (typeof showAchievement === 'function') {
            showAchievement(`Perfect Score! +${score} points`);
        }
    } else if (correctAnswers > 0) {
        feedbackDiv.textContent = `Good effort! You got ${correctAnswers} out of ${totalQuestions} correct.`;
        feedbackDiv.className = 'feedback-message success show';
        
        // Award points
        if (typeof updateScore === 'function') {
            updateScore(score);
        }
        
        // Show achievement
        if (typeof showAchievement === 'function') {
            showAchievement(`Good Effort! +${score} points`);
        }
    } else {
        feedbackDiv.textContent = `Try again! You got ${correctAnswers} out of ${totalQuestions} correct.`;
        feedbackDiv.className = 'feedback-message error show';
    }
}

// Check combining sentences exercise
function checkCombiningSentences() {
    const feedbackDiv = document.getElementById('combiningSentencesFeedback');
    const inputs = document.querySelectorAll('.contraction-input');
    
    let correctAnswers = 0;
    let totalQuestions = inputs.length;
    let allFilled = true;
    
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim();
        
        if (!userAnswer) {
            allFilled = false;
            return;
        }
        
        // Check if the answer is correct
        const correctAnswer = combiningSentencesAnswers[index];
        
        // Allow for some flexibility in answers - check if the key elements are there
        if (userAnswer.toLowerCase().includes(correctAnswer.toLowerCase().split(' ').filter(word => word.length > 3).join(' ').toLowerCase())) {
            correctAnswers++;
        }
    });
    
    if (!allFilled) {
        feedbackDiv.textContent = 'Please complete all sentences.';
        feedbackDiv.className = 'feedback-message error show';
        return;
    }
    
    // Calculate score
    const score = Math.round((correctAnswers / totalQuestions) * 25);
    
    // Show feedback
    if (correctAnswers === totalQuestions) {
        feedbackDiv.textContent = `Perfect! You got all ${correctAnswers} out of ${totalQuestions} correct.`;
        feedbackDiv.className = 'feedback-message success show';
        
        // Award points
        if (typeof updateScore === 'function') {
            updateScore(score);
        }
        
        // Show achievement
        if (typeof showAchievement === 'function') {
            showAchievement(`Perfect Score! +${score} points`);
        }
    } else if (correctAnswers > totalQuestions / 2) {
        feedbackDiv.textContent = `Good effort! You got ${correctAnswers} out of ${totalQuestions} correct.`;
        feedbackDiv.className = 'feedback-message success show';
        
        // Award points
        if (typeof updateScore === 'function') {
            updateScore(score);
        }
        
        // Show achievement
        if (typeof showAchievement === 'function') {
            showAchievement(`Good Effort! +${score} points`);
        }
    } else {
        feedbackDiv.textContent = `Try again! You got ${correctAnswers} out of ${totalQuestions} correct.`;
        feedbackDiv.className = 'feedback-message error show';
    }
    
    // Show correct answers
    setTimeout(() => {
        feedbackDiv.innerHTML += '<br><br>Here are the correct ways to combine the sentences:';
        
        Object.values(combiningSentencesAnswers).forEach((answer, index) => {
            const paragraph = document.createElement('p');
            paragraph.textContent = `${index + 1}. ${answer}`;
            paragraph.style.fontStyle = 'italic';
            feedbackDiv.appendChild(paragraph);
        });
    }, 2000);
}

// Function to update overall score
function updateScore(points) {
    const currentScore = parseInt(document.getElementById('totalScore').textContent);
    const newScore = currentScore + points;
    document.getElementById('totalScore').textContent = newScore;
}

// Initialize activity listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add any activity-specific event listeners here
    
    // Example: Add keyboard shortcut for reflection submission
    const reflectionText = document.getElementById('reflectionText');
    if (reflectionText) {
        reflectionText.addEventListener('keydown', function(e) {
            // Allow Ctrl+Enter or Cmd+Enter to submit reflection
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                saveReflection();
            }
        });
    }
});
