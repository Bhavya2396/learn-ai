// Interactive activities for Constitutional Design lesson

// Variables to track matching activity
let selectedTerm = null;
let selectedDef = null;

// Variables to track matching quiz
let matchingUserAnswers = {};
let matchingQuizCompleted = false;

// Variables to track True/False quiz progress
let trueFalseUserAnswers = {};
let trueFalseQuizCompleted = false;

// Correct answers for True/False questions
const correctAnswers = {
    'q1': false,  // (i) COPRA applies only to goods → False
    'q2': true,   // (ii) India is one of the many countries... → True
    'q3': true,   // (iii) When a consumer feels exploited... → True
    'q4': false,  // (iv) It is worthwhile to move to consumer commissions... → False
    'q5': true,   // (v) Hallmark is the certification... → True
    'q6': false,  // (vi) The consumer redressal process... → False
    'q7': true    // (vii) A consumer has the right to get compensation... → True
};

// Function to check True/False answers
function checkTrueFalseAnswers() {
    console.log('checkTrueFalseAnswers function called');
    console.log('Current trueFalseUserAnswers:', trueFalseUserAnswers);

    if (trueFalseQuizCompleted) {
        console.log('Quiz already completed, returning');
        return;
    }

    // Check if required elements exist
    const resultsDiv = document.getElementById('true-false-results');
    const scoreDisplay = document.getElementById('true-false-score-display');
    const answersReview = document.getElementById('true-false-answers-review');
    const trueFalseActions = document.getElementById('true-false-actions');

    console.log('Results elements found:', { resultsDiv: !!resultsDiv, scoreDisplay: !!scoreDisplay, answersReview: !!answersReview });

    if (!resultsDiv || !scoreDisplay || !answersReview) {
        console.error('True/False quiz results elements not found');
        showFeedback('True/False quiz elements not found. Please refresh the page.', 'error');
        return;
    }

    let correctCount = 0;
    let resultsHTML = '';

    // Check if all questions are answered
    const totalQuestions = Object.keys(correctAnswers).length;
    const answeredQuestions = Object.keys(trueFalseUserAnswers).length;

    if (answeredQuestions < totalQuestions) {
        showFeedback(`Please answer all ${totalQuestions} questions before submitting.`, 'error');
        return;
    }

    // Check each answer
    Object.keys(correctAnswers).forEach(questionId => {
        const userAnswer = trueFalseUserAnswers[questionId];
        const correctAnswer = correctAnswers[questionId];

        console.log(`Question ${questionId}: User=${userAnswer}, Correct=${correctAnswer}`);

        if (userAnswer === correctAnswer) {
            correctCount++;
            resultsHTML += `
                <div class="question-result correct-answer">
                    <h4>${questionId.toUpperCase()}: ✓ Correct!</h4>
                    <p><strong>Your answer:</strong> ${userAnswer ? 'True' : 'False'}</p>
                    <p><strong>Correct answer:</strong> ${correctAnswer ? 'True' : 'False'}</p>
                </div>`;
        } else {
            resultsHTML += `
                <div class="question-result wrong-answer">
                    <h4>${questionId.toUpperCase()}: ✗ Incorrect</h4>
                    <p><strong>Your answer:</strong> ${userAnswer ? 'True' : 'False'}</p>
                    <p><strong>Correct answer:</strong> ${correctAnswer ? 'True' : 'False'}</p>
                </div>`;
        }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    console.log(`Final score: ${correctCount}/${totalQuestions} = ${percentage}%`);

    // Show results
    try {
        scoreDisplay.innerHTML = `
            <div class="score-circle">
                <span class="score-number">${percentage}%</span>
                <span class="score-label">Score</span>
            </div>
            <div class="score-details">
                <p>You answered ${correctCount} out of ${totalQuestions} questions correctly.</p>
            </div>`;

        answersReview.innerHTML = resultsHTML;
        resultsDiv.style.display = 'block';

        console.log('Results displayed successfully');

        // Hide only submit button, keep reset button visible
        const submitBtn = document.querySelector('#true-false-actions .interactive-btn:not(.secondary)');
        if (submitBtn) {
            submitBtn.style.display = 'none';
        }

        trueFalseQuizCompleted = true;

        // Show achievement based on score
        if (correctCount === totalQuestions) {
            showAchievement('Consumer Rights Expert', 'You answered all questions correctly!');
        } else if (correctCount >= 4) {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of consumer rights.');
        }

        updateProgress('activities', 'true-false-quiz');
    } catch (error) {
        console.error('Error displaying results:', error);
        showFeedback('Error displaying quiz results. Please try again.', 'error');
    }
}

// Function to reset True/False quiz
function resetTrueFalseQuiz() {
    console.log('resetTrueFalseQuiz called');

    // Reset user answers
    trueFalseUserAnswers = {};
    trueFalseQuizCompleted = false;

    // Reset all dropdowns
    const dropdowns = document.querySelectorAll('.true-false-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.value = '';
    });

    // Hide results
    const resultsDiv = document.getElementById('true-false-results');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }

    // Show submit/reset buttons
    const trueFalseActions = document.getElementById('true-false-actions');
    if (trueFalseActions) {
        trueFalseActions.style.display = 'flex';
        // Explicitly show the submit button
        const submitBtn = trueFalseActions.querySelector('.interactive-btn:not(.secondary)');
        if (submitBtn) {
            submitBtn.style.display = 'inline-block';
        }
    }

    // Clear any error notifications
    closeErrorNotification();

    console.log('True/False quiz reset successfully');
}

// Function to handle dropdown selection changes
function handleTrueFalseSelection(questionId, selectedValue) {
    console.log(`handleTrueFalseSelection called: ${questionId} = ${selectedValue}`);

    if (trueFalseQuizCompleted) {
        console.log('Quiz already completed, ignoring selection');
        return;
    }

    // Convert string value to boolean
    const booleanValue = selectedValue === 'true' ? true : selectedValue === 'false' ? false : null;

    if (booleanValue !== null) {
        trueFalseUserAnswers[questionId] = booleanValue;
        console.log('Updated trueFalseUserAnswers:', trueFalseUserAnswers);
    } else {
        // Remove from answers if "Select Answer" is chosen
        delete trueFalseUserAnswers[questionId];
        console.log('Removed answer for', questionId);
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

    // Define correct answers for consumer rights matching
    const correctAnswers = {
        '1': 'e',  // Availing details of ingredients of a product → Right to information
        '2': 'c',  // Agmark → Certification of edible oil and cereals
        '3': 'a',  // Accident due to faulty engine in a scooter → Right to safety
        '4': 'b',  // District Consumer Commission → Dealing with consumer cases
        '5': 'g',  // Food fortification → Addition of key nutrients to staple foods
        '6': 'f',  // Consumers International → Global level institution of consumer welfare organisations
        '7': 'd'   // Bureau of Indian Standards → Agency that develop standards for goods and services
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

        // Hide only submit button, keep reset button visible
        const submitBtn = document.querySelector('#matching-actions .interactive-btn:not(.secondary)');
        if (submitBtn) {
            submitBtn.style.display = 'none';
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
        // Explicitly show the submit button
        const submitBtn = matchingActions.querySelector('.interactive-btn:not(.secondary)');
        if (submitBtn) {
            submitBtn.style.display = 'inline-block';
        }
    }

    // Clear any error notifications
    closeErrorNotification();

    console.log('Matching quiz reset successfully');
}

// Helper function to get solution name from ID
function getMinistryName(id) {
    const solutions = {
        'a': 'Right to safety',
        'b': 'Dealing with consumer cases',
        'c': 'Certification of edible oil and cereals',
        'd': 'Agency that develop standards for goods and services',
        'e': 'Right to information',
        'f': 'Global level institution of consumer welfare organisations',
        'g': 'Addition of key nutrients to staple foods'
    };
    return solutions[id] || 'Unknown Solution';
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
    initializeTrueFalseQuiz();
});

// Initialize True/False quiz dropdowns
function initializeTrueFalseQuiz() {
    console.log('Initializing True/False quiz dropdowns');

    // Set up event listeners for all True/False dropdowns
    const dropdowns = document.querySelectorAll('.true-false-dropdown');
    console.log(`Found ${dropdowns.length} dropdowns`);

    dropdowns.forEach(dropdown => {
        const questionId = dropdown.id;
        console.log(`Setting up listener for ${questionId}`);

        dropdown.addEventListener('change', function() {
            console.log(`Dropdown ${questionId} changed to: ${this.value}`);
            handleTrueFalseSelection(questionId, this.value);
        });
    });

    console.log('True/False quiz initialization completed');
}

// Critical Thinking Questions functionality
let submittedAnswers = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false
};

// Initialize critical thinking questions state
function initializeCriticalThinkingQuestions() {
    // Ensure all text areas are enabled by default
    for (let i = 1; i <= 11; i++) {
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
}

// Function to submit answer
function submitAnswer(questionNumber) {
    console.log('submitAnswer called with questionNumber:', questionNumber);

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
    submitBtn.style.display = 'none';
    editBtn.style.display = 'inline-block';

    // Mark as submitted
    submittedAnswers[questionNumber] = true;

    // Show success popup
    showSuccessPopup();

    // Update progress if all questions are answered
    checkAllQuestionsAnswered();
}

// Function to edit answer
function editAnswer(questionNumber) {
    const textarea = document.getElementById(`answer-${questionNumber}`);
    const submitBtn = document.querySelector(`#question-${questionNumber} .submit-btn`);
    const editBtn = document.querySelector(`#question-${questionNumber} .edit-btn`);

    // Enable textarea and show submit button, hide edit button
    textarea.disabled = false;
    submitBtn.style.display = 'inline-block';
    editBtn.style.display = 'none';

    // Mark as not submitted
    submittedAnswers[questionNumber] = false;
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
        showAchievement('Critical Thinker', 'You have completed all 10 critical thinking questions!');
        updateProgress('activities', 'critical-thinking');
    }
}

// Function to submit paragraph fill in the blanks answers
function submitParagraphFillInTheBlanks() {
    console.log('submitParagraphFillInTheBlanks called');

    // Get all fill-in-the-blank input fields
    const blankInputs = [
        document.getElementById('blank-1'),
        document.getElementById('blank-2'),
        document.getElementById('blank-3'),
        document.getElementById('blank-4'),
        document.getElementById('blank-5'),
        document.getElementById('blank-6')
    ];

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
    const submitBtn = document.querySelector('.activity-section:nth-of-type(2) .interactive-btn');
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

    // Get all fill-in-the-blank input fields
    const blankInputs = [
        document.getElementById('blank-1'),
        document.getElementById('blank-2'),
        document.getElementById('blank-3'),
        document.getElementById('blank-4'),
        document.getElementById('blank-5'),
        document.getElementById('blank-6')
    ];

    // Enable all input fields
    blankInputs.forEach(input => {
        input.disabled = false;
    });

    // Change edit button back to submit button
    const editBtn = document.querySelector('.activity-section:nth-of-type(2) .interactive-btn');
    if (editBtn) {
        editBtn.textContent = 'Submit All Answers';
        editBtn.onclick = submitParagraphFillInTheBlanks;
    }

    showFeedback('You can now edit your answers.', 'success');
}