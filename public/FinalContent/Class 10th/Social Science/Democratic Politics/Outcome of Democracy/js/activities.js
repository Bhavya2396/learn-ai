// Interactive activities for Constitutional Design lesson

// Variables to track matching activity
let selectedTerm = null;
let selectedDef = null;

// Variables to track matching quiz
let matchingUserAnswers = {};
let matchingQuizCompleted = false;

// Variables to track quiz progress
let quizQuestionIndex = 0;
let userAnswers = [];
let quizCompleted = false;

// Function to check answer for current quiz question
function checkAnswer(optionIndex) {
    if (quizCompleted) return;

    const currentQuestion = document.querySelector('.quiz-question.active');
    if (!currentQuestion) return;

    const feedbackElement = document.getElementById('quiz-feedback');
    const options = currentQuestion.querySelectorAll('.quiz-option');

    // Store the user's answer
    userAnswers[quizQuestionIndex] = optionIndex;

    // Clear previous styling
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });

    // Get correct answer from the question data (stored in a data attribute or from main.js)
    const correctAnswers = [3, 2]; // d, c (0-indexed)
    const correctAnswer = correctAnswers[quizQuestionIndex];

    if (optionIndex === correctAnswer) {
        options[optionIndex].classList.add('correct');
        if (feedbackElement) {
            feedbackElement.innerHTML = 'Correct!';
            feedbackElement.className = 'feedback-message success show';
        }
        updateScore(5);
    } else {
        options[optionIndex].classList.add('incorrect');
        if (feedbackElement) {
            feedbackElement.innerHTML = 'Incorrect. Try again.';
            feedbackElement.className = 'feedback-message error show';
        }
    }

    // Hide feedback after 3 seconds
    if (feedbackElement) {
        setTimeout(() => {
            feedbackElement.classList.remove('show');
        }, 3000);
    }
}

// Function to show next question
function nextQuestion() {
    const totalQuestions = 2; // We have 2 questions in the HTML
    if (quizQuestionIndex < totalQuestions - 1) {
        quizQuestionIndex++;
        showCurrentQuestion();
    } else {
        // Quiz completed
        showQuizResults();
    }
}

// Function to reset the quiz
function resetQuiz() {
    quizQuestionIndex = 0;
    userAnswers = [];
    quizCompleted = false;

    // Also reset the main.js quiz system variable to keep them in sync
    if (typeof currentQuestionIndex !== 'undefined') {
        currentQuestionIndex = 0;
    }

    // Reset all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => button.checked = false);

    // Reset all select dropdowns
    const selects = document.querySelectorAll('.matching-select');
    selects.forEach(select => select.value = '');

    // Reset all question styling
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });

    // Hide results
    const resultsDiv = document.getElementById('quiz-results');
    if (resultsDiv) resultsDiv.style.display = 'none';

    // Show all questions and hide them except the first one
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach((q, index) => {
        if (index === 0) {
            q.classList.add('active');
        } else {
            q.classList.remove('active');
        }
    });

    // Reset progress bar
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        progressFill.style.width = '50%';
        progressFill.textContent = 'Question 1 of 2';
    }

    // Update navigation buttons - call both systems to ensure consistency
    updateQuizNavigation();
    if (typeof updateNavigation !== 'undefined') {
        updateNavigation();
    }

    // Also reset critical thinking questions
    initializeCriticalThinkingQuestions();
}

// Function to show current question
function showCurrentQuestion() {
    // Hide all questions
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach(q => q.classList.remove('active'));

    // Show current question
    const currentQuestion = document.getElementById(`question-${quizQuestionIndex + 1}`);
    if (currentQuestion) {
        currentQuestion.classList.add('active');
    }

    // Update progress bar
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        const progress = ((quizQuestionIndex + 1) / 2) * 100;
        progressFill.style.width = `${progress}%`;
        progressFill.textContent = `Question ${quizQuestionIndex + 1} of 2`;
    }

    // Update navigation buttons
    updateQuizNavigation();
}

// Function to update quiz navigation buttons
function updateQuizNavigation() {
    const nextBtn = document.getElementById('next-question-btn');
    const resetBtn = document.getElementById('reset-quiz-btn');
    const finalActions = document.getElementById('final-actions');
    const totalQuestions = 2; // We have 2 questions in the HTML

    if (nextBtn) {
        if (quizQuestionIndex >= totalQuestions - 1) {
            nextBtn.textContent = 'Finish Quiz';
        } else {
            nextBtn.textContent = 'Next Question';
        }
    }

    // Update final actions visibility
    if (finalActions) {
        if (quizQuestionIndex >= totalQuestions - 1) {
            finalActions.style.display = 'flex';
        } else {
            finalActions.style.display = 'none';
        }
    }
}

// Function to show quiz results
function showQuizResults() {
    quizCompleted = true;
    const resultsDiv = document.getElementById('quiz-results');
    const navigationDiv = document.getElementById('quiz-navigation');
    const totalQuestions = 2; // We have 2 questions in the HTML

    // Calculate score based on the checkQuizAnswers function logic
    let correctCount = 0;

    // Question 1: d) Governmental power is divided between different levels of government. (index 3)
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'd') {
        correctCount++;
    }

    // Question 2: c) A and B only (index 2)
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'c') {
        correctCount++;
    }

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    let resultsHTML = `
        <div class="quiz-results">
            <h3>Quiz Completed!</h3>
            <div class="results-summary">
                <div class="score-circle">
                    <span class="score-number">${percentage}%</span>
                    <span class="score-label">Score</span>
                </div>
                <div class="score-details">
                    <p>You answered ${correctCount} out of ${totalQuestions} questions correctly.</p>
                </div>
            </div>
        </div>`;

    resultsDiv.innerHTML = resultsHTML;
    resultsDiv.style.display = 'block';
    navigationDiv.style.display = 'none';

    // Show achievement if perfect score
    if (correctCount === totalQuestions) {
        showAchievement('Quiz Master', 'You answered all questions correctly!');
    }

    updateProgress('activities', 'quiz');
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

    // Define correct answers for federalism matching
    const correctAnswers = {
        '1': 'a',  // Union of India → Prime Minister
        '2': 'c',  // State → Governor
        '3': 'd',  // Municipal Corporation → Mayor
        '4': 'b'   // Gram Panchayat → Sarpanch
    };

    console.log('Correct answers:', correctAnswers);

    // Check each answer
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedMinistry = matchingUserAnswers[questionId];
        const correctMinistry = correctAnswers[questionId];

        console.log(`Question ${questionId}: Selected=${selectedMinistry}, Correct=${correctMinistry}`);

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
            showAchievement('Matching Expert', 'You matched all items correctly!');
        } else if (correctCount >= 3) {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of globalization concepts.');
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

// Helper function to get solution name from ID
function getMinistryName(id) {
    const solutions = {
        'a': 'Prime Minister',
        'b': 'Sarpanch',
        'c': 'Governor',
        'd': 'Mayor'
    };
    return solutions[id] || 'Unknown';
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
        } else {
            console.error(`Question element with data-id="${questionId}" not found`);
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
                showFeedback('Please click on a question first, then select an item to match it with.', 'error');
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
            showFeedback('Please click on a question first, then select an item to match it with.', 'error');
        }
    } catch (error) {
        console.error('Error in selectMinistry:', error);
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


// Initialize activities
window.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code for activities here
    initializeCriticalThinkingQuestions();
});

// Critical Thinking Questions functionality
let submittedAnswers = {
    1: false,
    2: false,
    '3a': false,
    '3b': false,
    '3c': false,
    '3d': false,
    '4a': false,
    '4b': false,
    '4c': false,
    5: false
};

// Initialize critical thinking questions state
function initializeCriticalThinkingQuestions() {
    // Ensure all text areas are enabled by default

    // Handle regular questions (1, 2, 5)
    for (let i = 1; i <= 10; i++) {
        const textarea = document.getElementById(`answer-${i}`);
        const submitBtn = document.querySelector(`#question-${i} .submit-btn`);
        const editBtn = document.querySelector(`#question-${i} .edit-btn`);

        if (textarea) {
            textarea.disabled = false;
        }

        if (submitBtn) {
            submitBtn.style.display = 'inline-block';
        }

        if (editBtn) {
            editBtn.style.display = 'none';
        }
    }

    // Handle sub-questions (3a, 3b, 3c, 3d, 4a, 4b, 4c)
    const subQuestions = ['3a', '3b', '3c', '3d', '4a', '4b', '4c'];
    subQuestions.forEach(subQ => {
        const textarea = document.getElementById(`answer-${subQ}`);
        if (textarea) {
            textarea.disabled = false;

            // Find the submit and edit buttons within the same question container
            const baseQuestionNumber = subQ.replace(/[a-z]/, '');
            const questionContainer = document.querySelector(`#question-${baseQuestionNumber}`);
            if (questionContainer) {
                const submitBtn = questionContainer.querySelector('.submit-btn');
                const editBtn = questionContainer.querySelector('.edit-btn');

                if (submitBtn) {
                    submitBtn.style.display = 'inline-block';
                }

                if (editBtn) {
                    editBtn.style.display = 'none';
                }
            }
        }
    });
}

// Function to submit answer
function submitAnswer(questionNumber) {
    console.log('submitAnswer called with questionNumber:', questionNumber);

    // Handle sub-question formats like '3a', '3b', etc.
    const isSubQuestion = typeof questionNumber === 'string' && /^[0-9]+[a-z]$/.test(questionNumber);

    if (isSubQuestion) {
        // For sub-questions, find the specific button container for this sub-question
        const textarea = document.getElementById(`answer-${questionNumber}`);

        if (textarea.value.trim() === '') {
            showFeedback('Please enter your answer before submitting.', 'error');
            return;
        }

        // Find the button container that contains buttons with onclick handlers for this specific question
        const buttonContainers = document.querySelectorAll('.question-buttons');
        let targetContainer = null;
        let submitBtn = null;
        let editBtn = null;

        for (let container of buttonContainers) {
            const buttons = container.querySelectorAll('button');
            for (let button of buttons) {
                if (button.onclick && button.onclick.toString().includes(`submitAnswer('${questionNumber}')`)) {
                    targetContainer = container;
                    submitBtn = container.querySelector('.submit-btn');
                    editBtn = container.querySelector('.edit-btn');
                    break;
                }
            }
            if (targetContainer) break;
        }

        console.log('textarea:', textarea);
        console.log('submitBtn:', submitBtn);
        console.log('editBtn:', editBtn);

        // Disable textarea and hide submit button, show edit button
        textarea.disabled = true;
        if (submitBtn) submitBtn.style.display = 'none';
        if (editBtn) editBtn.style.display = 'inline-block';

        // Mark as submitted
        submittedAnswers[questionNumber] = true;
    } else {
        // For regular questions (1, 2, 5)
        const textarea = document.getElementById(`answer-${questionNumber}`);
        const submitBtn = document.querySelector(`#question-${questionNumber} .submit-btn`);
        const editBtn = document.querySelector(`#question-${questionNumber} .edit-btn`);

        console.log('textarea:', textarea);
        console.log('submitBtn:', submitBtn);
        console.log('editBtn:', editBtn);

        if (textarea.value.trim() === '') {
            showFeedback('Please enter your answer before submitting.', 'error');
            return;
        }

        // Disable textarea and hide submit button, show edit button
        textarea.disabled = true;
        if (submitBtn) submitBtn.style.display = 'none';
        if (editBtn) editBtn.style.display = 'inline-block';

        // Mark as submitted
        submittedAnswers[questionNumber] = true;
    }

    // Show success popup
    showSuccessPopup();

    // Update progress if all questions are answered
    checkAllQuestionsAnswered();
}

// Function to edit answer
function editAnswer(questionNumber) {
    console.log('editAnswer called with questionNumber:', questionNumber);

    // Handle sub-question formats like '3a', '3b', etc.
    const isSubQuestion = typeof questionNumber === 'string' && /^[0-9]+[a-z]$/.test(questionNumber);

    if (isSubQuestion) {
        // For sub-questions, find the specific button container for this sub-question
        const textarea = document.getElementById(`answer-${questionNumber}`);

        // Find the button container that contains buttons with onclick handlers for this specific question
        const buttonContainers = document.querySelectorAll('.question-buttons');
        let targetContainer = null;
        let submitBtn = null;
        let editBtn = null;

        for (let container of buttonContainers) {
            const buttons = container.querySelectorAll('button');
            for (let button of buttons) {
                if (button.onclick && button.onclick.toString().includes(`editAnswer('${questionNumber}')`)) {
                    targetContainer = container;
                    submitBtn = container.querySelector('.submit-btn');
                    editBtn = container.querySelector('.edit-btn');
                    break;
                }
            }
            if (targetContainer) break;
        }

        // Enable textarea and show submit button, hide edit button
        textarea.disabled = false;
        if (submitBtn) submitBtn.style.display = 'inline-block';
        if (editBtn) editBtn.style.display = 'none';

        // Mark as not submitted
        submittedAnswers[questionNumber] = false;
    } else {
        // For regular questions (1, 2, 5)
        const textarea = document.getElementById(`answer-${questionNumber}`);
        const submitBtn = document.querySelector(`#question-${questionNumber} .submit-btn`);
        const editBtn = document.querySelector(`#question-${questionNumber} .edit-btn`);

        // Enable textarea and show submit button, hide edit button
        textarea.disabled = false;
        if (submitBtn) submitBtn.style.display = 'inline-block';
        if (editBtn) editBtn.style.display = 'none';

        // Mark as not submitted
        submittedAnswers[questionNumber] = false;
    }
}

// Function to show success popup
function showSuccessPopup() {
    console.log('showSuccessPopup called');

    // Create popup if it doesn't exist
    let popup = document.getElementById('success-popup');
    console.log('existing popup:', popup);

    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'success-popup';
        popup.className = 'success-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <i class="fas fa-check-circle"></i>
                <span>Your response has been saved successfully!</span>
                <button class="popup-close" onclick="closeSuccessPopup()">×</button>
            </div>
        `;
        document.body.appendChild(popup);
        console.log('popup created and added to body');
    }

    // Show popup
    popup.classList.add('show');
    console.log('show class added to popup');

    // Auto-hide after 3 seconds
    setTimeout(() => {
        closeSuccessPopup();
    }, 3000);
}

// Function to close success popup
function closeSuccessPopup() {
    const popup = document.getElementById('success-popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// Function to check if all questions are answered
function checkAllQuestionsAnswered() {
    const allAnswered = Object.values(submittedAnswers).every(status => status === true);

    if (allAnswered) {
        // Show achievement or completion message
        showAchievement('Critical Thinker', 'You have completed all critical thinking questions!');
        updateProgress('activities', 'critical-thinking');
    }
}

// Function to submit paragraph fill in the blanks answers
function submitParagraphFillInTheBlanks() {
    console.log('submitParagraphFillInTheBlanks called');

    // Get all fill-in-the-blank input fields (only the ones that exist)
    const blankInputs = [];
    for (let i = 1; i <= 6; i++) {
        const input = document.getElementById(`blank-${i}`);
        if (input) {
            blankInputs.push(input);
        }
    }

    let allFilled = true;

    // Check if all input fields have content
    blankInputs.forEach((input, index) => {
        if (!input.value.trim()) {
            allFilled = false;
            showFeedback(`Please fill in blank ${(index + 1)} before submitting.`, 'error');
            return;
        }
    });

    if (!allFilled) {
        return;
    }

    // Disable all input fields
    blankInputs.forEach(input => {
        input.disabled = true;
    });

    // Change submit button to edit button
    const submitBtn = document.querySelector('.activity-section:nth-of-type(3) .interactive-btn');
    if (submitBtn) {
        submitBtn.textContent = 'Edit Answers';
        submitBtn.onclick = editParagraphFillInTheBlanks;
    }

    // Show success message
    showAchievement('Fill in the Blanks Master', 'You have completed the paragraph fill-in-the-blank activity!');
    showFeedback('All answers submitted successfully!', 'success');
}

// Function to edit paragraph fill in the blanks answers
function editParagraphFillInTheBlanks() {
    console.log('editParagraphFillInTheBlanks called');

    // Get all fill-in-the-blank input fields (only the ones that exist)
    const blankInputs = [];
    for (let i = 1; i <= 6; i++) {
        const input = document.getElementById(`blank-${i}`);
        if (input) {
            blankInputs.push(input);
        }
    }

    // Enable all input fields
    blankInputs.forEach(input => {
        input.disabled = false;
    });

    // Change edit button back to submit button
    const editBtn = document.querySelector('.activity-section:nth-of-type(3) .interactive-btn');
    if (editBtn) {
        editBtn.textContent = 'Submit All Answers';
        editBtn.onclick = submitParagraphFillInTheBlanks;
    }

    showFeedback('You can now edit your answers.', 'success');
}