/**
 * If I Were You - Interactive Activities
 */

// Global activities state
let activitiesState = {
    reflectionSaved: false,
    vocabularyAnswers: {
        correct: 0,
        attempted: false
    },
    dictionaryAnswers: {
        correct: 0,
        attempted: false
    }
};

// Function to save student reflection
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    const feedbackDiv = document.getElementById('reflectionFeedback');
    
    if (!feedbackDiv) return;
    
    if (reflectionText.length < 10) {
        feedbackDiv.className = 'feedback-message show error';
        feedbackDiv.textContent = 'Please write a more detailed reflection (at least 10 characters).';
        return;
    }
    
    // Show success message
    feedbackDiv.className = 'feedback-message show success';
    feedbackDiv.textContent = 'Your reflection has been saved. Thank you for sharing your thoughts!';
    
    // Mark as completed for progress tracking
    if (!activitiesState.reflectionSaved) {
        activitiesState.reflectionSaved = true;
        increaseScore(5);
    }
    
    // Hide message after delay
    setTimeout(() => {
        feedbackDiv.classList.remove('show');
    }, 3000);
}

// Function to check vocabulary exercise answers
function checkVocabulary() {
    const vocab1 = document.getElementById('vocab1');
    const vocab2 = document.getElementById('vocab2');
    const vocab3 = document.getElementById('vocab3');
    
    const feedbackDiv = document.getElementById('vocabFeedback');
    
    if (!feedbackDiv) return;
    
    // Check if all questions are answered
    if (!vocab1.value || !vocab2.value || !vocab3.value) {
        feedbackDiv.className = 'feedback-message show error';
        feedbackDiv.textContent = 'Please answer all questions before checking.';
        return;
    }
    
    // Clear previous visual feedback
    clearVocabularyFeedback();
    
    // Check each answer and provide individual feedback
    let correct = 0;
    let feedbackHTML = '<div class="answer-feedback"><h4>Answer Review:</h4><ul>';
    
    // Question 1
    const isCorrect1 = vocab1.value === 'correct';
    if (isCorrect1) correct++;
    feedbackHTML += `<li class="${isCorrect1 ? 'correct-answer' : 'incorrect-answer'}">
        <strong>Question 1:</strong> ${isCorrect1 ? '✅ Correct!' : '❌ Incorrect'} 
        ${isCorrect1 ? 'Gerrard pretends the intruder is a social visitor to hide his fear.' : 'The correct answer is: Gerrard pretends the intruder is a social visitor to hide his fear.'}
    </li>`;
    
    // Question 2
    const isCorrect2 = vocab2.value === 'correct';
    if (isCorrect2) correct++;
    feedbackHTML += `<li class="${isCorrect2 ? 'correct-answer' : 'incorrect-answer'}">
        <strong>Question 2:</strong> ${isCorrect2 ? '✅ Correct!' : '❌ Incorrect'} 
        ${isCorrect2 ? 'Gerrard pretends the intruder wants to listen to him, when actually the intruder wants information for his own use.' : 'The correct answer is: Gerrard pretends the intruder wants to listen to him, when actually the intruder wants information for his own use.'}
    </li>`;
    
    // Question 3
    const isCorrect3 = vocab3.value === 'correct';
    if (isCorrect3) correct++;
    feedbackHTML += `<li class="${isCorrect3 ? 'correct-answer' : 'incorrect-answer'}">
        <strong>Question 3:</strong> ${isCorrect3 ? '✅ Correct!' : '❌ Incorrect'} 
        ${isCorrect3 ? 'Gerrard is being sarcastic about the intruder\'s questioning.' : 'The correct answer is: Gerrard is being sarcastic about the intruder\'s questioning.'}
    </li>`;
    
    feedbackHTML += '</ul></div>';
    
    // Add visual indicators to select elements
    vocab1.style.borderColor = isCorrect1 ? '#4caf50' : '#f44336';
    vocab2.style.borderColor = isCorrect2 ? '#4caf50' : '#f44336';
    vocab3.style.borderColor = isCorrect3 ? '#4caf50' : '#f44336';
    
    // Update main feedback
    feedbackDiv.className = 'feedback-message show ' + (correct === 3 ? 'success' : 'error');
    
    if (correct === 3) {
        feedbackHTML = '<strong>🎉 Perfect!</strong> You have correctly identified all the ironic expressions.<br><br>' + feedbackHTML;
        
        // Award points if this is first successful attempt
        if (!activitiesState.vocabularyAnswers.attempted || activitiesState.vocabularyAnswers.correct < 3) {
            increaseScore(10);
            activitiesState.vocabularyAnswers.correct = correct;
            activitiesState.vocabularyAnswers.attempted = true;
        }
    } else {
        feedbackHTML = `<strong>📝 Review your answers:</strong> You got ${correct} out of 3 correct. Here's the detailed feedback:<br><br>` + feedbackHTML;
        
        // Record attempt
        activitiesState.vocabularyAnswers.attempted = true;
        activitiesState.vocabularyAnswers.correct = correct;
    }
    
    feedbackDiv.innerHTML = feedbackHTML;
}

// Function to clear visual feedback from vocabulary questions
function clearVocabularyFeedback() {
    const selects = document.querySelectorAll('#vocab1, #vocab2, #vocab3');
    selects.forEach(select => {
        select.style.borderColor = '';
    });
}

// Function to check dictionary exercise answers
function checkDictionary() {
    const inputFields = document.querySelectorAll('.contraction-input');
    const feedbackDiv = document.getElementById('dictionaryFeedback');
    
    if (!feedbackDiv || inputFields.length === 0) {
        console.error('Dictionary exercise elements not found');
        return;
    }
    
    // Check if all fields have content
    let allFilled = true;
    let correctCount = 0;
    let feedbackHTML = '<div class="answer-feedback"><h4>Answer Review:</h4><ul>';
    
    inputFields.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        // Extract the word from the paragraph - find the strong element within the paragraph
        const paragraph = input.previousElementSibling;
        const strongElement = paragraph ? paragraph.querySelector('strong') : null;
        const word = strongElement ? strongElement.textContent.toLowerCase() : `word${index + 1}`;
        // Get the correct answer from the data-answer attribute
        const correctAnswer = input.dataset.answer || 'No correct answer defined';
        
        if (!userAnswer) {
            allFilled = false;
            feedbackHTML += `<li class="incorrect-answer">
                <strong>${word.charAt(0).toUpperCase() + word.slice(1)}:</strong> ❌ No answer provided
            </li>`;
        } else {
            // Check if the answer is correct (more flexible matching)
            const isCorrect = checkDictionaryAnswer(userAnswer, correctAnswer);
            if (isCorrect) correctCount++;
            
            feedbackHTML += `<li class="${isCorrect ? 'correct-answer' : 'incorrect-answer'}">
                <strong>${word.charAt(0).toUpperCase() + word.slice(1)}:</strong> ${isCorrect ? '✅ Correct!' : '❌ Incorrect'} 
                ${isCorrect ? `Your answer: "${input.value}"` : `Your answer: "${input.value}"<br>Correct answer: "${correctAnswer}"`}
            </li>`;
            
            // Add visual indicators to input fields
            input.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
        }
    });
    
    feedbackHTML += '</ul></div>';
    
    if (!allFilled) {
        feedbackDiv.className = 'feedback-message show error';
        feedbackDiv.textContent = 'Please fill in all the dictionary meanings before checking.';
        return;
    }
    
    // Provide feedback based on correctness
    feedbackDiv.className = 'feedback-message show ' + (correctCount >= 3 ? 'success' : 'error');
    
    if (correctCount >= 3) {
        feedbackHTML = `<strong>🎉 Great work!</strong> You've correctly identified ${correctCount} out of 5 dictionary meanings.<br><br>` + feedbackHTML;
        
        // Award points based on success
        const points = Math.min(15, correctCount * 3); // Max 15 points
        
        // Only award points if improved from previous attempt
        if (!activitiesState.dictionaryAnswers.attempted || activitiesState.dictionaryAnswers.correct < correctCount) {
            increaseScore(points);
            activitiesState.dictionaryAnswers.correct = correctCount;
            activitiesState.dictionaryAnswers.attempted = true;
        }
    } else {
        feedbackHTML = `<strong>📚 Keep learning!</strong> You've correctly identified ${correctCount} out of 5 dictionary meanings. Here's the detailed feedback:<br><br>` + feedbackHTML;
        
        // Record attempt
        activitiesState.dictionaryAnswers.attempted = true;
        activitiesState.dictionaryAnswers.correct = correctCount;
    }
    
    feedbackDiv.innerHTML = feedbackHTML;
}

// Helper function to check dictionary answers with flexible matching
function checkDictionaryAnswer(userAnswer, correctAnswer) {
    // Add error handling for undefined parameters
    if (!userAnswer || !correctAnswer) {
        return false;
    }
    
    const userWords = userAnswer.split(/\s+/);
    const correctWords = correctAnswer.toLowerCase().split(/\s+/);
    
    // Check if most key words from the correct answer are present in user's answer
    let matchingWords = 0;
    correctWords.forEach(word => {
        if (word.length > 3 && userAnswer.includes(word)) { // Only check words longer than 3 characters
            matchingWords++;
        }
    });
    
    // Consider it correct if at least 60% of key words match
    return matchingWords >= Math.ceil(correctWords.filter(w => w.length > 3).length * 0.6);
}

// Function to clear visual feedback from dictionary inputs
function clearDictionaryFeedback() {
    const inputs = document.querySelectorAll('.contraction-input');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Helper function to increase score
function increaseScore(points) {
    if (typeof score !== 'undefined') {
        score += points;
        const scoreElement = document.getElementById('totalScore');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }
}

// Initialize activities
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for pressing Enter in text fields
    const reflectionTextarea = document.getElementById('reflectionText');
    if (reflectionTextarea) {
        reflectionTextarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                saveReflection();
            }
        });
    }
    
    // Add tooltips for vocabulary terms
    const vocabElements = document.querySelectorAll('.highlight-vocab');
    vocabElements.forEach(elem => {
        const tooltip = document.createElement('span');
        tooltip.className = 'vocab-tooltip';
        tooltip.textContent = elem.dataset.definition || 'Definition not available';
        elem.appendChild(tooltip);
    });
    
    // Add custom CSS for answer feedback
    const style = document.createElement('style');
    style.innerHTML = `
        .answer-feedback {
            margin-top: 15px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }
        
        .answer-feedback h4 {
            margin: 0 0 10px 0;
            color: #495057;
            font-size: 1.1rem;
        }
        
        .answer-feedback ul {
            margin: 0;
            padding-left: 20px;
        }
        
        .answer-feedback li {
            margin-bottom: 8px;
            padding: 8px;
            border-radius: 4px;
            line-height: 1.4;
        }
        
        .correct-answer {
            background-color: #d4edda;
            border-left: 4px solid #28a745;
            color: #155724;
        }
        
        .incorrect-answer {
            background-color: #f8d7da;
            border-left: 4px solid #dc3545;
            color: #721c24;
        }
        
        .answer-feedback strong {
            font-weight: 600;
        }
        
        /* Enhanced select and input styling for feedback */
        .vocab-question select {
            transition: border-color 0.3s ease;
        }
        
        .contraction-input {
            transition: border-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners to clear feedback when answers are changed
    const vocabSelects = document.querySelectorAll('#vocab1, #vocab2, #vocab3');
    vocabSelects.forEach(select => {
        select.addEventListener('change', function() {
            clearVocabularyFeedback();
            const feedbackDiv = document.getElementById('vocabFeedback');
            if (feedbackDiv) {
                feedbackDiv.innerHTML = '';
                feedbackDiv.className = 'feedback-message';
            }
        });
    });
    
    const dictionaryInputs = document.querySelectorAll('.contraction-input');
    dictionaryInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearDictionaryFeedback();
            const feedbackDiv = document.getElementById('dictionaryFeedback');
            if (feedbackDiv) {
                feedbackDiv.innerHTML = '';
                feedbackDiv.className = 'feedback-message';
            }
        });
    });
    
    // Make sure the function is globally accessible
    window.checkDictionary = checkDictionary;
});
