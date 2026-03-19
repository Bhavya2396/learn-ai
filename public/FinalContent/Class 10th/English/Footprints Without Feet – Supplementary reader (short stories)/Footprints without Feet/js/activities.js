/**
 * Activities for Footprints without Feet interactive lesson
 */

// Save student reflection
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value;
    const feedbackElement = document.getElementById('reflectionFeedback');
    
    if (reflectionText.trim().length < 10) {
        feedbackElement.textContent = 'Please write at least a few sentences for your reflection.';
        feedbackElement.className = 'feedback-message error show';
    } else {
        // We would typically save this to a database in a real application
        // For now, we'll just provide feedback
        feedbackElement.textContent = 'Your reflection has been saved! Good job reflecting on scientific ethics.';
        feedbackElement.className = 'feedback-message success show';
        
        // Log reflection locally (we'd normally send this to a server)
        console.log('Student reflection:', reflectionText);
        
        // Award points for completing the activity
        if (typeof updateScore === 'function') {
            updateScore(5); // Add 5 points
            showAchievement('Reflection Completed: +5 points');
        }
    }
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 3000);
}

// Check vocabulary exercise
function checkVocabulary() {
    const vocab1 = document.getElementById('vocab1').value;
    const vocab2 = document.getElementById('vocab2').value;
    const vocab3 = document.getElementById('vocab3').value;
    const vocab4 = document.getElementById('vocab4').value;
    const vocab5 = document.getElementById('vocab5').value;
    
    const feedbackElement = document.getElementById('vocabFeedback');
    
    // Check if all questions have been answered
    if (!vocab1 || !vocab2 || !vocab3 || !vocab4 || !vocab5) {
        feedbackElement.textContent = 'Please answer all questions before checking.';
        feedbackElement.className = 'feedback-message error show';
        return;
    }
    
    // Check answers
    const correctAnswers = {
        vocab1: 'extremely clever',
        vocab2: 'allowing light to pass through',
        vocab3: 'not obeying rules',
        vocab4: 'in a cruel way',
        vocab5: 'unusual in behavior'
    };
    
    // Count correct answers
    let correctCount = 0;
    if (vocab1 === correctAnswers.vocab1) correctCount++;
    if (vocab2 === correctAnswers.vocab2) correctCount++;
    if (vocab3 === correctAnswers.vocab3) correctCount++;
    if (vocab4 === correctAnswers.vocab4) correctCount++;
    if (vocab5 === correctAnswers.vocab5) correctCount++;
    
    // Prepare feedback message
    let message = `You got ${correctCount} out of 5 correct!`;
    
    // Add specific feedback for incorrect answers
    if (vocab1 !== correctAnswers.vocab1) {
        message += '<br>1. Brilliant means "extremely clever".';
    }
    if (vocab2 !== correctAnswers.vocab2) {
        message += '<br>2. Transparent means "allowing light to pass through".';
    }
    if (vocab3 !== correctAnswers.vocab3) {
        message += '<br>3. Lawless means "not obeying rules".';
    }
    if (vocab4 !== correctAnswers.vocab4) {
        message += '<br>4. Callously means "in a cruel way".';
    }
    if (vocab5 !== correctAnswers.vocab5) {
        message += '<br>5. Eccentric means "unusual in behavior".';
    }
    
    // Display feedback
    feedbackElement.innerHTML = message;
    feedbackElement.className = correctCount === 5 ? 
        'feedback-message success show' : 
        'feedback-message partial show';
    
    // Award points based on performance
    if (typeof updateScore === 'function') {
        const points = correctCount * 2; // 2 points per correct answer
        updateScore(points);
        showAchievement(`Vocabulary Activity: +${points} points`);
    }
}

// Check conditional sentences
function checkConditionals() {
    const inputs = document.querySelectorAll('.contraction-input');
    const feedbackElement = document.getElementById('conditionalssFeedback');
    
    // Check if all inputs have values
    let allAnswered = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            allAnswered = false;
        }
    });
    
    if (!allAnswered) {
        feedbackElement.textContent = 'Please complete all sentences before checking.';
        feedbackElement.className = 'feedback-message error show';
        return;
    }
    
    // Count how many are correct
    let correctCount = 0;
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        // Check if answer is exactly correct or contains the main verb
        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            correctCount++;
        } else {
            input.classList.add('incorrect');
        }
    });
    
    // Display feedback
    const message = `You got ${correctCount} out of ${inputs.length} correct!`;
    feedbackElement.textContent = message;
    feedbackElement.className = correctCount === inputs.length ? 
        'feedback-message success show' : 
        'feedback-message partial show';
    
    // Add correct answers for reference
    if (correctCount < inputs.length) {
        const correctAnswersDiv = document.createElement('div');
        correctAnswersDiv.className = 'correct-answers';
        correctAnswersDiv.innerHTML = '<h4>Correct Answers:</h4>';
        
        const answerList = document.createElement('ul');
        inputs.forEach((input, index) => {
            if (input.classList.contains('incorrect')) {
                const listItem = document.createElement('li');
                listItem.textContent = `Sentence ${index + 1}: "${input.getAttribute('data-answer')}"`;
                answerList.appendChild(listItem);
            }
        });
        
        correctAnswersDiv.appendChild(answerList);
        feedbackElement.appendChild(correctAnswersDiv);
    }
    
    // Award points based on performance
    if (typeof updateScore === 'function') {
        const points = correctCount * 2; // 2 points per correct answer
        updateScore(points);
        showAchievement(`Grammar Activity: +${points} points`);
    }
}

// Update score (hook into main.js's score system)
function updateScore(points) {
    if (typeof window.score !== 'undefined') {
        window.score += points;
        document.getElementById('totalScore').textContent = window.score;
    }
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any interactive elements
    const reflectionText = document.getElementById('reflectionText');
    if (reflectionText) {
        reflectionText.addEventListener('focus', function() {
            this.placeholder = '';
        });
        reflectionText.addEventListener('blur', function() {
            if (!this.value) {
                this.placeholder = 'Write your reflection here...';
            }
        });
    }
    
    // Initialize vocabulary dropdowns with event listeners
    const vocabSelects = document.querySelectorAll('select[id^="vocab"]');
    vocabSelects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('selected');
            } else {
                this.classList.remove('selected');
            }
        });
    });
});

// Function to toggle activity tools visibility
function toggleActivityTools() {
    const toolsContainer = document.querySelector('.activity-tools');
    if (toolsContainer) {
        toolsContainer.classList.toggle('show');
    }
}
