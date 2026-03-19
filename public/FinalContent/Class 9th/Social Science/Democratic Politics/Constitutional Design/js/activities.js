// Interactive activities for Constitutional Design lesson

// Variables to track matching activity
let selectedTerm = null;
let selectedDef = null;

// Variables to track matching quiz
let matchingUserAnswers = {};
let matchingQuizCompleted = false;

// Variables for second matching quiz
let matchingUserAnswers2 = {};
let matchingQuizCompleted2 = false;

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
    radioButtons.forEach(button => button.checked = false);

    // Reset select dropdowns
    const selects = document.querySelectorAll('.matching-select');
    selects.forEach(select => select.value = '');

    // Hide and clear results
    const resultsDiv = document.getElementById('quiz-results');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
        resultsDiv.innerHTML = ''; // Clear the content
    }

    // Hide quiz navigation
    const navigationDiv = document.querySelector('.quiz-navigation');
    if (navigationDiv) {
        navigationDiv.style.display = 'flex';
    }

    // Show final actions (reset/submit buttons)
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

    // Reinitialize quiz
    showCurrentQuestion();
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
        const progress = ((currentQuestionIndex + 1) / 2) * 100;
        progressFill.style.width = `${progress}%`;
        progressFill.textContent = `Question ${currentQuestionIndex + 1} of 2`;
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

                // Regular multiple choice questions only
                if (userAnswers[index] === question.correctAnswer) {
                    correctCount++;
                    isCorrect = true;
                }

                resultsHTML += `
                    <div class="question-result ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                        <h4>Question ${index + 1}: ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h4>
                        <p><strong>Your answer:</strong> ${question.options[userAnswers[index]] || 'No answer'}</p>
                        <p><strong>Correct answer:</strong> ${question.options[question.correctAnswer]}</p>
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

        resultsDiv.innerHTML = resultsHTML;
        resultsDiv.style.display = 'block';
        navigationDiv.style.display = 'none';

        // Show achievement if perfect score
        if (correctCount === quizQuestions.length) {
            showAchievement('Constitution Expert', 'You answered all questions correctly!');
        } else if (correctCount >= 1) {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of constitutional principles.');
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


// Function to check matching quiz answers (First Quiz - Constituent Assembly Members)
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

    // Define correct answers for Constituent Assembly Members
    const correctAnswers = {
        'a': 'iv',   // Motilal Nehru -> Prepared a Constitution for India in 1928
        'b': 'iii',  // B.R. Ambedkar -> Chairman of the Drafting Committee
        'c': 'i',    // Rajendra Prasad -> President of the Constituent Assembly
        'd': 'ii'    // Sarojini Naidu -> Member of the Constituent Assembly
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
            const userAnswer = selectedMinistry ? getMinistryName(selectedMinistry) : 'No answer';
            resultsHTML += `
                <div class="question-result wrong-answer">
                    <h4>${questionId.toUpperCase()}: ✗ Incorrect</h4>
                    <p><strong>Your answer:</strong> ${userAnswer}</p>
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
            showAchievement('Constitution Expert', 'You matched all Constituent Assembly members correctly!');
        } else if (correctCount >= 2) {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of constitutional history.');
        }
    } catch (error) {
        console.error('Error displaying results:', error);
        showFeedback('Error displaying quiz results. Please try again.', 'error');
    }
}

// Function to check second matching quiz answers (Constitutional Values)
function checkMatchingAnswers2() {
    console.log('checkMatchingAnswers2 function called');
    console.log('Current matchingUserAnswers2:', matchingUserAnswers2);

    if (matchingQuizCompleted2) {
        console.log('Quiz already completed, returning');
        return;
    }

    // Check if required elements exist
    const resultsDiv = document.getElementById('matching-results-2');
    const scoreDisplay = document.getElementById('matching-score-display-2');
    const answersReview = document.getElementById('matching-answers-review-2');
    const matchingActions = document.getElementById('matching-actions-2');

    console.log('Results elements found:', { resultsDiv: !!resultsDiv, scoreDisplay: !!scoreDisplay, answersReview: !!answersReview });

    if (!resultsDiv || !scoreDisplay || !answersReview) {
        console.error('Matching quiz 2 results elements not found');
        showFeedback('Matching quiz elements not found. Please refresh the page.', 'error');
        return;
    }

    let correctCount = 0;
    let resultsHTML = '';

    // Define correct answers for Constitutional Values
    const correctAnswers = {
        'a': 'ii',   // Sovereign -> People have the supreme right to make decisions
        'b': 'iii',  // Republic -> Head of the state is an elected person
        'c': 'iv',   // Fraternity -> People should live like brothers and sisters
        'd': 'i'     // Secular -> Government will not favour any religion
    };

    console.log('Correct answers:', correctAnswers);

    // Check each answer
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedMinistry = matchingUserAnswers2[questionId];
        const correctMinistry = correctAnswers[questionId];

        console.log(`Question ${questionId}: Selected=${selectedMinistry}, Correct=${correctMinistry}`);

        if (selectedMinistry && selectedMinistry === correctMinistry) {
            correctCount++;
            resultsHTML += `
                <div class="question-result correct-answer">
                    <h4>${questionId.toUpperCase()}: ✓ Correct!</h4>
                    <p><strong>Your answer:</strong> ${getMinistryName2(selectedMinistry)}</p>
                    <p><strong>Correct answer:</strong> ${getMinistryName2(correctMinistry)}</p>
                </div>`;
        } else {
            const userAnswer = selectedMinistry ? getMinistryName2(selectedMinistry) : 'No answer';
            resultsHTML += `
                <div class="question-result wrong-answer">
                    <h4>${questionId.toUpperCase()}: ✗ Incorrect</h4>
                    <p><strong>Your answer:</strong> ${userAnswer}</p>
                    <p><strong>Correct answer:</strong> ${getMinistryName2(correctMinistry)}</p>
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

        matchingQuizCompleted2 = true;

        // Show achievement based on score
        if (correctCount === Object.keys(correctAnswers).length) {
            showAchievement('Constitution Expert', 'You matched all constitutional values correctly!');
        } else if (correctCount >= 2) {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of constitutional values.');
        }
    } catch (error) {
        console.error('Error displaying results:', error);
        showFeedback('Error displaying quiz results. Please try again.', 'error');
    }
}

// Function to reset matching quiz (First Quiz)
function resetMatchingQuiz() {
    console.log('resetMatchingQuiz called');

    // Reset user answers
    matchingUserAnswers = {};
    matchingQuizCompleted = false;

    // Clear all selections for first quiz
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

// Function to reset second matching quiz
function resetMatchingQuiz2() {
    console.log('resetMatchingQuiz2 called');

    // Reset user answers
    matchingUserAnswers2 = {};
    matchingQuizCompleted2 = false;

    // Clear all selections for second quiz
    const allMatchItems = document.querySelectorAll('.quiz2-match-item');
    allMatchItems.forEach(item => {
        item.classList.remove('selected', 'matched', 'correct', 'incorrect', 'question-selected');
        item.removeAttribute('data-selected');
    });

    // Hide results
    const resultsDiv = document.getElementById('matching-results-2');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }

    // Show submit/reset buttons
    const matchingActions = document.getElementById('matching-actions-2');
    if (matchingActions) {
        matchingActions.style.display = 'flex';
    }

    // Clear any error notifications
    closeErrorNotification();

    console.log('Matching quiz 2 reset successfully');
}

// Helper function to get Constituent Assembly member role name from ID (First Quiz)
function getMinistryName(id) {
    const constitutionalConcepts = {
        'i': 'President of the Constituent Assembly',
        'ii': 'Member of the Constituent Assembly',
        'iii': 'Chairman of the Drafting Committee',
        'iv': 'Prepared a Constitution for India in 1928'
    };
    return constitutionalConcepts[id] || 'Unknown Role';
}

// Helper function to get Constitutional Value meaning from ID (Second Quiz)
function getMinistryName2(id) {
    const constitutionalValues = {
        'i': 'Government will not favour any religion',
        'ii': 'People have the supreme right to make decisions',
        'iii': 'Head of the state is an elected person',
        'iv': 'People should live like brothers and sisters'
    };
    return constitutionalValues[id] || 'Unknown Value';
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
});

// Initialize question states from localStorage
function initializeQuestionStates() {
    // Handle questions q1, q2, q3, q4
    for (let i = 1; i <= 4; i++) {
        const questionId = `q${i}`;
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
    }

    // Handle questions q1a, q1b, q1c, q2a, q2b, q2c
    const subQuestions = ['q1a', 'q1b', 'q1c', 'q2a', 'q2b', 'q2c'];
    subQuestions.forEach(questionId => {
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

// Function to select debate position
function selectDebatePosition(position) {
    console.log('selectDebatePosition called with position:', position);

    const positionDisplay = document.getElementById('selected-position');
    const argumentsTextarea = document.getElementById('debate-arguments');

    if (position === 'rigid') {
        if (!positionDisplay) {
            const positionDiv = document.createElement('div');
            positionDiv.id = 'selected-position';
            positionDiv.style.cssText = `
                background: #e3f2fd;
                border: 2px solid #2196f3;
                border-radius: 8px;
                padding: 10px;
                margin: 10px 0;
                font-weight: bold;
                color: #1976d2;
            `;
            positionDiv.innerHTML = '<i class="fas fa-balance-scale"></i> Position: The constitution should be rigid and difficult to amend to protect fundamental rights.';
            argumentsTextarea.parentNode.insertBefore(positionDiv, argumentsTextarea);
        } else {
            positionDisplay.innerHTML = '<i class="fas fa-balance-scale"></i> Position: The constitution should be rigid and difficult to amend to protect fundamental rights.';
        }
    } else {
        if (!positionDisplay) {
            const positionDiv = document.createElement('div');
            positionDiv.id = 'selected-position';
            positionDiv.style.cssText = `
                background: #fff3e0;
                border: 2px solid #ff9800;
                border-radius: 8px;
                padding: 10px;
                margin: 10px 0;
                font-weight: bold;
                color: #f57c00;
            `;
            positionDiv.innerHTML = '<i class="fas fa-cogs"></i> Position: The constitution should be flexible and easy to amend to adapt to changing times.';
            argumentsTextarea.parentNode.insertBefore(positionDiv, argumentsTextarea);
        } else {
            positionDisplay.innerHTML = '<i class="fas fa-cogs"></i> Position: The constitution should be flexible and easy to amend to adapt to changing times.';
        }
    }

    // Provide helpful prompts based on position
    if (position === 'rigid') {
        argumentsTextarea.placeholder = 'Arguments for rigid constitution:\n1. Protects fundamental rights from temporary majorities\n2. Provides stability and continuity\n3. Prevents hasty changes based on political whims\n4. South Africa\'s experience shows value of strong constitutional protections\n5. Ensures long-term vision over short-term politics';
    } else {
        argumentsTextarea.placeholder = 'Arguments for flexible constitution:\n1. Allows adaptation to changing social and technological needs\n2. Enables responsive governance to contemporary challenges\n3. Indian Constitution\'s amendment process shows flexibility works\n4. Prevents outdated provisions from hindering progress\n5. Balances tradition with necessary evolution';
    }
}

// Function to save debate arguments
function saveDebate() {
    const positionRadios = document.querySelectorAll('input[name="debate-position"]');
    const argumentsTextarea = document.getElementById('debate-arguments');
    const counterargumentsTextarea = document.getElementById('debate-counterarguments');

    let selectedPosition = '';
    positionRadios.forEach(radio => {
        if (radio.checked) {
            selectedPosition = radio.value;
        }
    });

    if (!selectedPosition) {
        showErrorNotification('Please select a debate position first.');
        return;
    }

    if (!argumentsTextarea.value.trim()) {
        showErrorNotification('Please write your arguments before saving.');
        return;
    }

    const debateData = {
        position: selectedPosition,
        arguments: argumentsTextarea.value,
        counterarguments: counterargumentsTextarea.value,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('constitutionDebate', JSON.stringify(debateData));

    showSuccessNotification('Your debate arguments have been saved successfully!');
}

// Function to load saved debate data
function loadDebateData() {
    const savedData = localStorage.getItem('constitutionDebate');
    if (savedData) {
        try {
            const debateData = JSON.parse(savedData);
            const positionRadio = document.querySelector(`input[value="${debateData.position}"]`);
            const argumentsTextarea = document.getElementById('debate-arguments');
            const counterargumentsTextarea = document.getElementById('debate-counterarguments');

            if (positionRadio) {
                positionRadio.checked = true;
                selectDebatePosition(debateData.position);
            }

            if (argumentsTextarea && debateData.arguments) {
                argumentsTextarea.value = debateData.arguments;
            }

            if (counterargumentsTextarea && debateData.counterarguments) {
                counterargumentsTextarea.value = debateData.counterarguments;
            }
        } catch (error) {
            console.error('Error loading debate data:', error);
        }
    }
}

// Function to select a question for second matching quiz
function selectQuestion2(questionId) {
    console.log(`selectQuestion2 called with questionId: ${questionId}`);

    if (matchingQuizCompleted2) {
        console.log('Quiz already completed, returning');
        return;
    }

    try {
        // Remove previous question selection from second quiz
        const previousQuestion = document.querySelector('.quiz2-match-item.question-selected');
        if (previousQuestion) {
            previousQuestion.classList.remove('question-selected');
        }

        // Mark the selected question in second quiz
        const selectedQuestion = document.querySelector(`.quiz2-match-item[data-id="${questionId}"]`);
        if (selectedQuestion) {
            selectedQuestion.classList.add('question-selected');
            console.log(`Question ${questionId} selected`);
        } else {
            console.error(`Question element with data-id="${questionId}" not found in second quiz`);
        }
    } catch (error) {
        console.error('Error in selectQuestion2:', error);
    }
}

// Function to select ministry for second matching quiz
function selectMinistry2(ministryId) {
    console.log(`selectMinistry2 called with ministryId: ${ministryId}`);

    if (matchingQuizCompleted2) {
        console.log('Quiz already completed, returning');
        return;
    }

    try {
        // Find the currently selected question in second quiz
        const selectedQuestion = document.querySelector('.quiz2-match-item.question-selected');
        if (selectedQuestion) {
            const questionId = selectedQuestion.getAttribute('data-id');
            console.log(`Found selected question: ${questionId}`);

            // Call the main function with proper parameters
            selectMinistryForQuiz2(questionId, ministryId);
        } else {
            // No question selected, show error
            showFeedback('Please click on a question first, then select a ministry to match it with.', 'error');
        }
    } catch (error) {
        console.error('Error in selectMinistry2:', error);
    }
}

// Function to select ministry for second matching quiz
function selectMinistryForQuiz2(questionId, ministryId) {
    console.log(`selectMinistryForQuiz2 called with questionId: ${questionId}, ministryId: ${ministryId}`);

    if (matchingQuizCompleted2) {
        console.log('Quiz already completed, returning');
        return;
    }

    try {
        // If questionId is null, it means user clicked on a ministry first
        // We need to find the currently selected question in second quiz
        if (questionId === null) {
            const selectedQuestion = document.querySelector('.quiz2-match-item.question-selected');
            if (selectedQuestion) {
                questionId = selectedQuestion.getAttribute('data-id');
            } else {
                // No question selected, show error
                showFeedback('Please click on a question first, then select a ministry to match it with.', 'error');
                return;
            }
        }

        // Remove previous selection for this question in second quiz
        const previousSelection = document.querySelector(`.quiz2-match-item[data-selected="${questionId}"]`);
        if (previousSelection) {
            previousSelection.classList.remove('selected');
            previousSelection.removeAttribute('data-selected');
        }

        // Mark the selected ministry in second quiz
        const selectedItem = document.querySelector(`.quiz2-match-item[data-id="${ministryId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
            selectedItem.setAttribute('data-selected', questionId);
        }

        // Store the answer
        matchingUserAnswers2[questionId] = ministryId;
        console.log('Updated matchingUserAnswers2:', matchingUserAnswers2);
        console.log(`Stored answer for question ${questionId}: ${ministryId} (${getMinistryName2(ministryId)})`);
    } catch (error) {
        console.error('Error in selectMinistryForQuiz2:', error);
    }
}