// Interactive activities for Electoral Politics lesson

// Variables to track matching activity
let selectedTerm = null;
let selectedDef = null;

// Variables to track matching quiz
let matchingUserAnswers = {};
let matchingQuizCompleted = false;

// Variables to track quiz progress (declared in main.js)
// let currentQuestionIndex = 0;
// let userAnswers = [];
// let quizCompleted = false;

// Function to check answer for current quiz question
function checkAnswer(optionIndex) {
    if (quizCompleted) return;

    const question = quizQuestions[currentQuestionIndex];
    const feedbackElement = document.getElementById('quiz-feedback');
    const options = document.querySelectorAll('.quiz-option');

    // Store the user's answer
    userAnswers[currentQuestionIndex] = optionIndex;

    // Clear previous styling
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });

    if (optionIndex === question.correctAnswer) {
        options[optionIndex].classList.add('correct');
        feedbackElement.innerHTML = 'Correct!';
        feedbackElement.className = 'feedback-message success show';
        updateScore(5);
    } else {
        options[optionIndex].classList.add('incorrect');
        feedbackElement.innerHTML = 'Incorrect. Try again.';
        feedbackElement.className = 'feedback-message error show';
    }

    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 3000);
}

// Function to show next question
function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        showCurrentQuestion();
    } else {
        // Quiz completed
        showQuizResults();
    }
}

// Function to reset the quiz
function resetQuiz() {
    console.log('resetQuiz called from activities.js');

    // Reset current question index
    currentQuestionIndex = 0;

    // Reset radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
        button.checked = false;
        button.disabled = false;
    });

    // Reset select dropdowns
    const selects = document.querySelectorAll('.matching-select');
    selects.forEach(select => select.value = '');

    // Hide and clear results (preserve structure so re-submit works)
    const resultsDiv = document.getElementById('quiz-results');
    if (resultsDiv) {
        // Ensure required placeholders exist; recreate if missing (covers earlier resets)
        if (!document.getElementById('score-display') || !document.getElementById('answers-review')) {
            resultsDiv.innerHTML = `
                <h4>Quiz Results</h4>
                <div id="score-display"></div>
                <div id="answers-review"></div>
            `;
        } else {
            // Clear previous content without removing structure
            const sd = document.getElementById('score-display');
            const ar = document.getElementById('answers-review');
            if (sd) sd.innerHTML = '';
            if (ar) ar.innerHTML = '';
        }

        // Hide the results container
        resultsDiv.classList.remove('show');
        resultsDiv.style.display = 'none';
        resultsDiv.style.visibility = '';
        resultsDiv.style.opacity = '';
    }

    // Hide quiz navigation
    const navigationDiv = document.querySelector('.quiz-navigation');
    if (navigationDiv) {
        navigationDiv.style.display = 'flex';
    }

    // Hide final actions until last question is reached again
    const finalActions = document.getElementById('final-actions');
    if (finalActions) {
        finalActions.style.display = 'none';
    }

    // Reset quiz completion state
    quizCompleted = false;
    userAnswers = [];

    // Reset progress bar
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        progressFill.style.width = '50%';
        progressFill.textContent = 'Question 1 of 2';
    }

    // Clear any feedback messages
    const feedbackElement = document.getElementById('quiz-feedback');
    if (feedbackElement) {
        feedbackElement.classList.remove('show', 'success', 'error');
        feedbackElement.innerHTML = '';
    }

    // Reset question styling
    const allQuestions = document.querySelectorAll('.quiz-question');
    allQuestions.forEach(q => {
        q.classList.remove('active');
        // Clear any answer styling within questions
        const options = q.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
    });

    // Reset navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) {
        prevBtn.disabled = true;
        prevBtn.classList.add('disabled');
    }
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('disabled');
    }

    // Reinitialize quiz
    console.log('Reset complete, reinitializing quiz...');
    setTimeout(() => {
        showCurrentQuestion();
    }, 100);
}

// Function to show current question
function showCurrentQuestion() {
    console.log('showCurrentQuestion called, currentQuestionIndex:', currentQuestionIndex);

    // Check if quizQuestions is available
    if (typeof quizQuestions === 'undefined' || !quizQuestions || quizQuestions.length === 0) {
        console.error('quizQuestions not available or empty');
        showFeedback('Quiz questions not loaded. Please refresh the page.', 'error');
        return;
    }

    const quizContainer = document.getElementById('quiz-container');
    const question = quizQuestions[currentQuestionIndex];

    console.log('Current question:', question);

    // Hide all questions first
    const allQuestions = document.querySelectorAll('.quiz-question');
    allQuestions.forEach(q => q.classList.remove('active'));

    // Show current question
    const currentQuestionElement = document.getElementById(`question-${currentQuestionIndex + 1}`);
    if (currentQuestionElement) {
        currentQuestionElement.classList.add('active');
        console.log('Question element found and activated');
    } else {
        console.error('Question element not found for index:', currentQuestionIndex + 1);
    }

    // Update progress
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressFill.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    }

    // Update navigation buttons
    updateQuizNavigation();
}

// Function to update quiz navigation buttons
function updateQuizNavigation() {
    console.log('updateQuizNavigation called, currentQuestionIndex:', currentQuestionIndex);

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finalActions = document.getElementById('final-actions');

    // Update Previous button
    if (prevBtn) {
        if (currentQuestionIndex === 0) {
            prevBtn.disabled = true;
            prevBtn.classList.add('disabled');
            console.log('Previous button disabled');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('disabled');
            console.log('Previous button enabled');
        }
    }

    // Update Next button and final actions
    if (currentQuestionIndex === quizQuestions.length - 1) {
        // Last question - show final actions
        if (nextBtn) nextBtn.style.display = 'none';
        if (finalActions) {
            finalActions.style.display = 'flex';
            console.log('Final actions shown');
        }
    } else {
        // Not last question - show next button
        if (nextBtn) nextBtn.style.display = 'flex';
        if (finalActions) finalActions.style.display = 'none';
    }
}

// Function to show quiz results
function showQuizResults() {
    quizCompleted = true;
    const quizContainer = document.getElementById('quiz-container');
    const resultsDiv = document.getElementById('quiz-results');
    const navigationDiv = document.getElementById('quiz-navigation');

    let correctCount = 0;
    let resultsHTML = '<div class="quiz-results"><h3>Quiz Completed!</h3><div class="results-summary">';

    // Use the quiz questions from content.js
    if (typeof quizQuestions !== 'undefined' && quizQuestions.length > 0) {
        quizQuestions.forEach((question, index) => {
            // Only process questions that have proper structure (skip matching questions or malformed questions)
            if (question && question.options && Array.isArray(question.options) && question.correctAnswer !== undefined) {
                let isCorrect = false;
                let userAnswerText = 'No answer';
                let correctAnswerText = question.options[question.correctAnswer] || 'Unknown';

                // Regular multiple choice questions only
                if (userAnswers[index] !== undefined && userAnswers[index] !== null) {
                    userAnswerText = question.options[userAnswers[index]] || 'No answer';
                    if (userAnswers[index] === question.correctAnswer) {
                        correctCount++;
                        isCorrect = true;
                    }
                }

                resultsHTML += `
                    <div class="question-result ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                        <h4>Question ${index + 1}: ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h4>
                        <p><strong>Your answer:</strong> ${userAnswerText}</p>
                        <p><strong>Correct answer:</strong> ${correctAnswerText}</p>
                    </div>`;
            }
        });

        const percentage = Math.round((correctCount / quizQuestions.length) * 100);
        const displayPercentage = isNaN(percentage) ? 0 : percentage;

        resultsHTML += `
            <div class="score-circle">
                <span class="score-number">${displayPercentage}%</span>
                <span class="score-label">Score</span>
            </div>
            <div class="score-details">
                <p>You answered ${correctCount} out of ${quizQuestions.length} questions correctly.</p>
            </div>
        </div></div>`;

        // Ensure results div is properly cleared and updated
        resultsDiv.innerHTML = resultsHTML;
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });

        // Hide navigation
        if (navigationDiv) {
            navigationDiv.style.display = 'none';
        }

        // Show final actions with reset button
        const finalActions = document.getElementById('final-actions');
        if (finalActions) {
            finalActions.style.display = 'flex';
        }

        // Show achievement if perfect score
        if (correctCount === quizQuestions.length) {
            setTimeout(() => {
                showAchievement('Quiz Master', 'You answered all questions correctly!');
            }, 500);
        } else if (correctCount >= 1) {
            setTimeout(() => {
                showAchievement('Good Understanding', 'Well done! You have a good grasp of electoral politics.');
            }, 500);
        }

        updateProgress('activities', 'quiz');
    } else {
        // Fallback if quizQuestions is not available
        console.error('Quiz questions not found');
        showFeedback('Quiz questions not loaded properly. Please refresh the page.', 'error');
    }
}

// Function to handle matching activity
function selectMatch(element, type) {
    // Reset previously selected items of the same type
    document.querySelectorAll(`.match-item[data-selected="${type}"]`).forEach(item => {
        item.removeAttribute('data-selected');
    });
    
    // Mark this element as selected
    element.setAttribute('data-selected', type);
    
    if (type === 'term') {
        selectedTerm = element;
    } else {
        selectedDef = element;
    }
    
    // If we have both a term and definition selected, check if they match
    if (selectedTerm && selectedDef) {
        const termMatch = selectedTerm.getAttribute('data-match');
        const defMatch = selectedDef.getAttribute('data-match');
        
        if (termMatch === defMatch) {
            // Correct match
            selectedTerm.classList.add('matched');
            selectedDef.classList.add('matched');
            
            // Disable the matched items
            selectedTerm.onclick = null;
            selectedDef.onclick = null;
            
            // Show feedback
            showFeedback('Correct match!', 'success');
            
            // Award points
            updateScore(3);
            
            // Check if all items are matched
            const unmatchedTerms = document.querySelectorAll('#match-terms .match-item:not(.matched)');
            if (unmatchedTerms.length === 0) {
                showFeedback('Excellent! You matched all the terms correctly!', 'success');
                showAchievement('Vocabulary Master', 'You matched all terms correctly!');
                updateProgress('activities', 'match');
            }
        } else {
            // Incorrect match
            showFeedback('That\'s not a correct match. Try again.', 'error');
        }
        
        // Reset selections
        selectedTerm.removeAttribute('data-selected');
        selectedDef.removeAttribute('data-selected');
        selectedTerm = null;
        selectedDef = null;
    }
}

// Function to check comparison answers
function checkComparison() {
    const inputs = document.querySelectorAll('.comparison-input');
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        if (userAnswer === correctAnswer || correctAnswer.includes(userAnswer)) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    if (correctCount === inputs.length) {
        showFeedback('Excellent! All your answers are correct!', 'success');
        showAchievement('Comparison Expert', 'You completed the comparison activity perfectly!');
        updateScore(correctCount * 2);
    } else {
        showFeedback(`You got ${correctCount} out of ${inputs.length} correct!`, 'success');
        updateScore(correctCount);
    }
}

// Function to check preamble comparison
function checkPreambleComparison() {
    const inputs = document.querySelectorAll('.preamble-comparison-input');
    let correctCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        if (userAnswer === correctAnswer || correctAnswer.includes(userAnswer)) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    if (correctCount === inputs.length) {
        showFeedback('Excellent! All your answers are correct!', 'success');
        showAchievement('Preamble Expert', 'You completed the preamble comparison perfectly!');
        updateScore(correctCount * 2);
    } else {
        showFeedback(`You got ${correctCount} out of ${inputs.length} correct!`, 'success');
        updateScore(correctCount);
    }
}




// Function to toggle debate activity
function toggleDebateActivity() {
    const content = document.getElementById('debate-content');
    const button = event.target;

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        button.textContent = 'Hide Debate Activity';
        // Scroll to content
        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        content.style.display = 'none';
        button.textContent = 'Start Debate Activity';
    }
}


// Function to show error notification
function showErrorNotification(message) {
    try {
        console.log('showErrorNotification called with message:', message);

        // Create a simple error popup similar to debate section
        const errorDiv = document.createElement('div');
        errorDiv.id = 'tempErrorPopup';
        errorDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border: 2px solid #f44336;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3);
            z-index: 10000;
            max-width: 350px;
            font-family: 'Segoe UI', system-ui, sans-serif;
        `;

        errorDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                <h4 style="color: #f44336; margin: 0; font-size: 1rem; font-weight: bold;">⚠️ Error</h4>
                <button onclick="this.parentElement.parentElement.remove()"
                        style="background: none; border: none; color: #666; font-size: 18px; cursor: pointer; padding: 0;">✕</button>
            </div>
            <p style="color: #333; margin: 0; font-size: 0.9rem; line-height: 1.4;">${message}</p>
        `;

        // Remove any existing error popup
        const existingError = document.getElementById('tempErrorPopup');
        if (existingError) {
            existingError.remove();
        }

        document.body.appendChild(errorDiv);
        console.log('Error notification shown successfully');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);

    } catch (error) {
        console.error('Error in showErrorNotification:', error);
        alert('Error: ' + message);
    }
}

// Function to close error notification
function closeErrorNotification() {
    // Try to close the HTML element version first
    const errorNotification = document.getElementById('errorNotification');
    if (errorNotification) {
        errorNotification.classList.remove('show');
    }

    // Also close any temporary error popup
    const tempError = document.getElementById('tempErrorPopup');
    if (tempError) {
        tempError.remove();
    }
}


// Function to check matching quiz answers
function checkMatchingAnswers() {
    console.log('checkMatchingAnswers function called');
    console.log('Current matchingUserAnswers:', matchingUserAnswers);

    if (matchingQuizCompleted) {
        console.log('Quiz already completed, returning');
        return;
    }

    // Check if required elements exist
    const resultsDiv = document.getElementById('matching-results');
    const scoreDisplay = document.getElementById('matching-score-display');
    const answersReview = document.getElementById('matching-answers-review');
    const matchingActions = document.getElementById('matching-actions');

    console.log('Results elements found:', { resultsDiv: !!resultsDiv, scoreDisplay: !!scoreDisplay, answersReview: !!answersReview });

    if (!resultsDiv || !scoreDisplay || !answersReview) {
        console.error('Matching quiz results elements not found');
        showFeedback('Matching quiz elements not found. Please refresh the page.', 'error');
        return;
    }

    let correctCount = 0;
    let resultsHTML = '';

    // Define correct answers
    const correctAnswers = {
        'a': 'iv',
        'b': 'i',
        'c': 'ii',
        'd': 'iii'
    };

    console.log('Correct answers:', correctAnswers);

    // Check each answer
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedMinistry = matchingUserAnswers[questionId];
        const correctMinistry = correctAnswers[questionId];

        console.log(`Question ${questionId}: Selected=${selectedMinistry}, Correct=${correctMinistry}`);
        console.log('matchingUserAnswers object:', matchingUserAnswers);
        console.log('Full comparison:', {
            questionId,
            selectedMinistry,
            correctMinistry,
            isCorrect: selectedMinistry === correctMinistry,
            selectedMinistryType: typeof selectedMinistry,
            correctMinistryType: typeof correctMinistry
        });

        if (selectedMinistry && selectedMinistry === correctMinistry) {
            correctCount++;
            resultsHTML += `
                <div class="question-result correct-answer">
                    <h4>${questionId.toUpperCase()}: ✓ Correct!</h4>
                    <p><strong>Your answer:</strong> ${getMinistryName(selectedMinistry)}</p>
                    <p><strong>Correct answer:</strong> ${getMinistryName(correctMinistry)}</p>
                </div>`;
        } else {
            resultsHTML += `
                <div class="question-result wrong-answer">
                    <h4>${questionId.toUpperCase()}: ✗ Incorrect</h4>
                    <p><strong>Your answer:</strong> ${selectedMinistry ? getMinistryName(selectedMinistry) : 'No answer'}</p>
                    <p><strong>Correct answer:</strong> ${getMinistryName(correctMinistry)}</p>
                </div>`;
        }
    });

    const percentage = Math.round((correctCount / Object.keys(correctAnswers).length) * 100);

    console.log(`Final score: ${correctCount}/${Object.keys(correctAnswers).length} = ${percentage}%`);

    // Show results
    try {
        scoreDisplay.innerHTML = `
            <div class="score-circle">
                <span class="score-number">${percentage}%</span>
                <span class="score-label">Score</span>
            </div>
            <div class="score-details">
                <p>You matched ${correctCount} out of ${Object.keys(correctAnswers).length} correctly.</p>
            </div>`;

        answersReview.innerHTML = resultsHTML;
        resultsDiv.style.display = 'block';

        console.log('Results displayed successfully');

        // Hide submit/reset buttons
        if (matchingActions) {
            matchingActions.style.display = 'none';
        }

        matchingQuizCompleted = true;

        // Show achievement based on score
        if (correctCount === Object.keys(correctAnswers).length) {
            showAchievement('Matching Expert', 'You matched all ministries correctly!');
        } else if (correctCount >= 3) {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of ministry functions.');
        }
    } catch (error) {
        console.error('Error displaying results:', error);
        showFeedback('Error displaying quiz results. Please try again.', 'error');
    }
}

// Function to reset matching quiz
function resetMatchingQuiz() {
    console.log('resetMatchingQuiz called');

    // Reset user answers
    matchingUserAnswers = {};
    matchingQuizCompleted = false;

    // Clear all selections
    const allMatchItems = document.querySelectorAll('.match-item');
    allMatchItems.forEach(item => {
        item.classList.remove('selected', 'matched', 'correct', 'incorrect');
        item.removeAttribute('data-selected');
    });

    // Hide results
    const resultsDiv = document.getElementById('matching-results');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }

    // Show submit/reset buttons
    const matchingActions = document.getElementById('matching-actions');
    if (matchingActions) {
        matchingActions.style.display = 'flex';
    }

    // Clear any error notifications
    closeErrorNotification();

    console.log('Matching quiz reset successfully');
}

// Helper function to get reason text from ID
function getMinistryName(id) {
    const reasons = {
        'i': 'there is a fair representation of all sections of our society',
        'ii': 'everyone has equal opportunity to elect their representative',
        'iii': 'all candidates must have a fair chance of competing in elections',
        'iv': 'some people may have moved away from the area where they voted last'
    };
    return reasons[id] || 'Unknown Reason';
}

// Function to select a question for matching
function selectQuestion(questionId) {
    console.log(`selectQuestion called with questionId: ${questionId}`);

    if (matchingQuizCompleted) {
        console.log('Quiz already completed, returning');
        return;
    }

    try {
        // Remove previous question selection
        const previousQuestion = document.querySelector('.match-item.question-selected');
        if (previousQuestion) {
            previousQuestion.classList.remove('question-selected');
        }

        // Mark the selected question
        const selectedQuestion = document.querySelector(`.match-item[data-id="${questionId}"]`);
        if (selectedQuestion) {
            selectedQuestion.classList.add('question-selected');
            console.log(`Question ${questionId} selected`);
            console.log('Selected question element:', selectedQuestion);
            console.log('Question text:', selectedQuestion.textContent.substring(0, 50));
        } else {
            console.error(`Question element with data-id="${questionId}" not found`);
            // Let's see what elements are available
            const allMatchItems = document.querySelectorAll('.match-item');
            console.log('Available match items:');
            allMatchItems.forEach(item => {
                console.log(`- ${item.getAttribute('data-id')}: ${item.textContent.substring(0, 50)}`);
            });
        }
    } catch (error) {
        console.error('Error in selectQuestion:', error);
    }
}

// Function to select ministry for matching quiz
function selectMinistryForQuiz(questionId, ministryId) {
    console.log(`selectMinistryForQuiz called with questionId: ${questionId}, ministryId: ${ministryId}`);

    if (matchingQuizCompleted) {
        console.log('Quiz already completed, returning');
        return;
    }

    try {
        // If questionId is null, it means user clicked on a ministry first
        // We need to find the currently selected question
        if (questionId === null) {
            const selectedQuestion = document.querySelector('.match-item.question-selected');
            if (selectedQuestion) {
                questionId = selectedQuestion.getAttribute('data-id');
            } else {
                // No question selected, show error
                showFeedback('Please click on a question first, then select a ministry to match it with.', 'error');
                return;
            }
        }

        // Remove previous selection for this question
        const previousSelection = document.querySelector(`.match-item[data-selected="${questionId}"]`);
        if (previousSelection) {
            previousSelection.classList.remove('selected');
            previousSelection.removeAttribute('data-selected');
        }

        // Mark the selected ministry
        const selectedItem = document.querySelector(`.match-item[data-id="${ministryId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
            selectedItem.setAttribute('data-selected', questionId);
        }

        // Store the answer
        matchingUserAnswers[questionId] = ministryId;
        console.log('Updated matchingUserAnswers:', matchingUserAnswers);
        console.log(`Stored answer for question ${questionId}: ${ministryId} (${getMinistryName(ministryId)})`);
    } catch (error) {
        console.error('Error in selectMinistryForQuiz:', error);
    }
}

// Function to handle ministry selection (called from HTML)
function selectMinistry(ministryId) {
    console.log(`selectMinistry called with ministryId: ${ministryId}`);

    if (matchingQuizCompleted) {
        console.log('Quiz already completed, returning');
        return;
    }

    try {
        // Find the currently selected question
        const selectedQuestion = document.querySelector('.match-item.question-selected');
        if (selectedQuestion) {
            const questionId = selectedQuestion.getAttribute('data-id');
            console.log(`Found selected question: ${questionId}`);

            // Call the main function with proper parameters
            selectMinistryForQuiz(questionId, ministryId);
        } else {
            // No question selected, show error
            showFeedback('Please click on a question first, then select a ministry to match it with.', 'error');
        }
    } catch (error) {
        console.error('Error in selectMinistry:', error);
    }
}

// Test function to debug matching quiz
function testFunctions() {
    console.log('testFunctions called');

    // Test if functions are accessible
    console.log('selectQuestion function:', typeof selectQuestion);
    console.log('selectMinistryForQuiz function:', typeof selectMinistryForQuiz);
    console.log('checkMatchingAnswers function:', typeof checkMatchingAnswers);

    // Test DOM elements
    const matchItems = document.querySelectorAll('.match-item');
    console.log('Match items found:', matchItems.length);

    matchItems.forEach(item => {
        console.log('Match item:', item.getAttribute('data-id'), item.textContent.substring(0, 50));
    });

    // Test question selection
    console.log('Testing question selection...');
    selectQuestion('a');

    // Test ministry selection
    console.log('Testing ministry selection...');
    selectMinistryForQuiz(null, 'i');
}

// Initialize activities
window.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code for activities here
    console.log('Activities module loaded');

    // Initialize question states from localStorage
    initializeQuestionStates();

    // Initialize quiz state
    initializeQuizState();
});

// Function to initialize quiz state
function initializeQuizState() {
    console.log('Initializing quiz state...');

    // Ensure quiz variables are properly initialized
    if (typeof currentQuestionIndex === 'undefined') {
        window.currentQuestionIndex = 0;
    }
    if (typeof userAnswers === 'undefined') {
        window.userAnswers = [];
    }
    if (typeof quizCompleted === 'undefined') {
        window.quizCompleted = false;
    }

    console.log('Quiz state initialized:', {
        currentQuestionIndex: window.currentQuestionIndex,
        userAnswers: window.userAnswers,
        quizCompleted: window.quizCompleted
    });
}

// Initialize question states from localStorage
function initializeQuestionStates() {
    // Define all question IDs
    const questionIds = [
        'q1', 'q2a', 'q2b', 'q2c', 'q3a', 'q3b', 'q3c', 'q3d',
        'q4', 'q5a', 'q5b', 'q5c', 'q6a', 'q6b', 'q6c', 'q6d',
        'q7a', 'q7b', 'q7c', 'q8'
    ];

    questionIds.forEach(questionId => {
        const answer = localStorage.getItem(`${questionId}-answer`);
        const isSubmitted = localStorage.getItem(`${questionId}-submitted`) === 'true';

        if (isSubmitted && answer) {
            // Restore submitted state
            const textarea = document.getElementById(`${questionId}-answer`);
            const submitBtn = document.querySelector(`[onclick="submitAnswer('${questionId}')"]`);
            const editBtn = document.getElementById(`${questionId}-edit-btn`);

            if (textarea) {
                textarea.value = answer;
                textarea.disabled = true;
            }

            if (submitBtn) submitBtn.style.display = 'none';
            if (editBtn) editBtn.style.display = 'inline-block';
        }
    });
}

// Submit answer function
function submitAnswer(questionId) {
    const textarea = document.getElementById(`${questionId}-answer`);
    const submitBtn = document.querySelector(`[onclick="submitAnswer('${questionId}')"]`);
    const editBtn = document.getElementById(`${questionId}-edit-btn`);

    if (!textarea) {
        console.error(`Textarea for ${questionId} not found`);
        return;
    }

    const answer = textarea.value.trim();

    if (!answer) {
        // Show error popup
        showErrorNotification('Please enter your answer before submitting.');
        return;
    }

    // Save answer to localStorage
    localStorage.setItem(`${questionId}-answer`, answer);
    localStorage.setItem(`${questionId}-submitted`, 'true');

    // Disable textarea
    textarea.disabled = true;

    // Hide submit button, show edit button
    if (submitBtn) submitBtn.style.display = 'none';
    if (editBtn) editBtn.style.display = 'inline-block';

    // Show success popup
    showSuccessNotification('Your response has been saved successfully');
}

// Edit answer function
function editAnswer(questionId) {
    const textarea = document.getElementById(`${questionId}-answer`);
    const submitBtn = document.querySelector(`[onclick="submitAnswer('${questionId}')"]`);
    const editBtn = document.getElementById(`${questionId}-edit-btn`);

    if (!textarea) {
        console.error(`Textarea for ${questionId} not found`);
        return;
    }

    // Enable textarea
    textarea.disabled = false;

    // Show submit button, hide edit button
    if (submitBtn) submitBtn.style.display = 'inline-block';
    if (editBtn) editBtn.style.display = 'none';

    // Remove submitted state from localStorage
    localStorage.removeItem(`${questionId}-submitted`);
}

// Function to check quiz answers
function checkQuizAnswers() {
    console.log('checkQuizAnswers called');

    let score = 0;
    let totalQuestions = 2;
    let results = [];

    // Check if quizQuestions is available
    if (typeof quizQuestions === 'undefined' || !quizQuestions || quizQuestions.length === 0) {
        console.error('quizQuestions not available for checking answers');
        showFeedback('Quiz questions not loaded. Please refresh the page.', 'error');
        return;
    }

    // Question 1: c) Elections enable people to evaluate the performance of the judiciary.
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'c') {
        score++;
        results.push('<p class="correct-answer">✓ Question 1: Correct! Elections enable people to evaluate the performance of the judiciary is a false statement.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 1: Incorrect. The correct answer is c) Elections enable people to evaluate the performance of the judiciary.</p>');
    }

    // Question 2: a) India has the largest number of voters in the world.
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'a') {
        score++;
        results.push('<p class="correct-answer">✓ Question 2: Correct! India has the largest number of voters in the world is not a good reason to say that Indian elections are democratic.</p>');
    } else {
        results.push('<p class="wrong-answer">✗ Question 2: Incorrect. The correct answer is a) India has the largest number of voters in the world.</p>');
    }

    // Display results
    const resultsDiv = document.getElementById('quiz-results');
    let scoreDisplay = document.getElementById('score-display');
    let answersReview = document.getElementById('answers-review');

    // If placeholders were wiped earlier, rebuild them now to avoid blank results
    if (resultsDiv && (!scoreDisplay || !answersReview)) {
        resultsDiv.innerHTML = `
            <h4>Quiz Results</h4>
            <div id="score-display"></div>
            <div id="answers-review"></div>
        `;
        scoreDisplay = document.getElementById('score-display');
        answersReview = document.getElementById('answers-review');
    }

    if (scoreDisplay) {
        scoreDisplay.innerHTML = `<h4>Your Score: ${score}/${totalQuestions}</h4>`;
    }

    if (answersReview) {
        answersReview.innerHTML = results.join('');
    }

    if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Hide navigation
    const navigationDiv = document.querySelector('.quiz-navigation');
    if (navigationDiv) {
        navigationDiv.style.display = 'none';
    }

    // Show final actions with reset button
    const finalActions = document.getElementById('final-actions');
    if (finalActions) {
        finalActions.style.display = 'flex';
    }

    // Show achievement if perfect score
    if (score === totalQuestions) {
        setTimeout(() => {
            showAchievement('Quiz Master', 'Perfect score! You have excellent knowledge of electoral politics.');
        }, 1000);
    } else if (score >= 1) {
        setTimeout(() => {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of electoral politics.');
        }, 1000);
    }
}

// Success notification function
function showSuccessNotification(message) {
    try {
        console.log('showSuccessNotification called with message:', message);

        // Create success popup
        const successDiv = document.createElement('div');
        successDiv.id = 'tempSuccessPopup';
        successDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border: 2px solid #4caf50;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
            z-index: 10000;
            max-width: 350px;
            font-family: 'Segoe UI', system-ui, sans-serif;
        `;

        successDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                <h4 style="color: #4caf50; margin: 0; font-size: 1rem; font-weight: bold;">✅ Success</h4>
                <button onclick="this.parentElement.parentElement.remove()"
                        style="background: none; border: none; color: #666; font-size: 18px; cursor: pointer; padding: 0;">✕</button>
            </div>
            <p style="color: #333; margin: 0; font-size: 0.9rem; line-height: 1.4;">${message}</p>
        `;

        // Remove any existing success popup
        const existingSuccess = document.getElementById('tempSuccessPopup');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        document.body.appendChild(successDiv);
        console.log('Success notification shown successfully');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);

    } catch (error) {
        console.error('Error in showSuccessNotification:', error);
        alert('Success: ' + message);
    }
}