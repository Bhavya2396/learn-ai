// Interactive activities for Working of Institutions lesson

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
        progressFill.style.width = '20%';
        progressFill.textContent = 'Question 1 of 5';
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
    console.log('showQuizResults called from activities.js');
    console.log('Current userAnswers:', userAnswers);
    console.log('Current quizCompleted:', quizCompleted);

    quizCompleted = true;
    const quizContainer = document.getElementById('quiz-container');
    const resultsDiv = document.getElementById('quiz-results');
    const navigationDiv = document.getElementById('quiz-navigation');

    let correctCount = 0;
    let resultsHTML = '<div class="quiz-results"><h3>Quiz Completed!</h3><div class="results-summary">';

    // Use the quiz questions from content.js
    if (typeof quizQuestions !== 'undefined' && quizQuestions.length > 0) {
        quizQuestions.forEach((question, index) => {
            let isCorrect = false;
            let userAnswerText = 'No answer';
            let correctAnswerText = 'Not available';

            // Handle different question types
            if (question && question.options && Array.isArray(question.options) && question.correctAnswer !== undefined) {
                // Regular multiple choice questions (Questions 1, 2, 5)
                console.log(`Processing question ${index + 1}, userAnswers[${index}]:`, userAnswers[index]);
                if (userAnswers[index] !== undefined && userAnswers[index] === question.correctAnswer) {
                    correctCount++;
                    isCorrect = true;
                }
                userAnswerText = userAnswers[index] !== undefined ? question.options[userAnswers[index]] : 'No answer';
                correctAnswerText = question.options[question.correctAnswer];
            } else if (index === 2) {
                // Question 3: Country classification (A, B, C, D)
                const q3Answers = ['q3_i', 'q3_ii', 'q3_iii', 'q3_iv'];
                const q3CorrectAnswers = ['b', 'c', 'a', 'b']; // Undemocratic, Not sure, Democratic, Undemocratic
                const q3Labels = ['Country A', 'Country B', 'Country C', 'Country D'];
                const q3Descriptions = [
                    'People who do not accept the country\'s official religion do not have a right to vote.',
                    'The same party has been winning elections for the last twenty years.',
                    'Ruling party has lost in the last three elections.',
                    'There is no independent election commission.'
                ];
                let q3CorrectCount = 0;
                let q3UserAnswers = [];

                q3Answers.forEach((name, i) => {
                    const selected = document.querySelector(`input[name="${name}"]:checked`);
                    const userAnswer = selected ? selected.value : null;
                    q3UserAnswers.push(userAnswer);

                    if (userAnswer && userAnswer === q3CorrectAnswers[i]) {
                        q3CorrectCount++;
                    }
                });

                // For Q3, we count individual correct answers, not require all to be correct
                correctCount += q3CorrectCount; // Add individual correct answers to total count
                userAnswerText = `${q3CorrectCount} out of 4 countries correctly classified`;
                correctAnswerText = 'See detailed breakdown below';
            } else if (index === 3) {
                // Question 4: Country classification (P, Q, R, S)
                const q4Answers = ['q4_i', 'q4_ii', 'q4_iii', 'q4_iv'];
                const q4CorrectAnswers = ['b', 'a', 'b', 'c']; // Undemocratic, Democratic, Undemocratic, Not sure
                const q4Labels = ['Country P', 'Country Q', 'Country R', 'Country S'];
                const q4Descriptions = [
                    'The parliament cannot pass a law about the army without the consent of the Chief of Army.',
                    'The parliament cannot pass a law reducing the powers of the judiciary.',
                    'The country\'s leaders cannot sign any treaty with another country without taking permission from its neighbouring country.',
                    'All the major economic decisions about the country are taken by officials of the central bank which the ministers cannot change.'
                ];
                let q4CorrectCount = 0;
                let q4UserAnswers = [];

                q4Answers.forEach((name, i) => {
                    const selected = document.querySelector(`input[name="${name}"]:checked`);
                    const userAnswer = selected ? selected.value : null;
                    q4UserAnswers.push(userAnswer);

                    if (userAnswer && userAnswer === q4CorrectAnswers[i]) {
                        q4CorrectCount++;
                    }
                });

                // For Q4, we count individual correct answers, not require all to be correct
                correctCount += q4CorrectCount; // Add individual correct answers to total count
                userAnswerText = `${q4CorrectCount} out of 4 countries correctly classified`;
                correctAnswerText = 'See detailed breakdown below';
            }

            // Handle questions 3 and 4 with proper no-answer detection
            if (index === 2 || index === 3) {
                const questionNum = index + 1;
                const answers = index === 2 ? ['q3_i', 'q3_ii', 'q3_iii', 'q3_iv'] : ['q4_i', 'q4_ii', 'q4_iii', 'q4_iv'];
                const hasAnyAnswer = answers.some(name => document.querySelector(`input[name="${name}"]:checked`));

                if (!hasAnyAnswer) {
                    resultsHTML += `
                        <div class="question-result no-answer">
                            <h4>Question ${questionNum}: No options selected</h4>
                            <p><strong>Your answer:</strong> No answer provided</p>
                            <p><strong>Correct answer:</strong> See detailed breakdown below</p>
                        </div>`;
                } else {
                    resultsHTML += `
                        <div class="question-result ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                            <h4>Question ${questionNum}: ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h4>
                            <p><strong>Your answer:</strong> ${userAnswerText}</p>
                            <p><strong>Correct answer:</strong> See detailed breakdown below</p>
                        </div>`;
                }
            } else {
                resultsHTML += `
                    <div class="question-result ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                        <h4>Question ${index + 1}: ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h4>
                        <p><strong>Your answer:</strong> ${userAnswerText}</p>
                        <p><strong>Correct answer:</strong> ${correctAnswerText}</p>
                    </div>`;
            }
        });

        // Add detailed breakdown for questions 3 and 4 only if answers were provided
        const q3HasAnswers = ['q3_i', 'q3_ii', 'q3_iii', 'q3_iv'].some(name => document.querySelector(`input[name="${name}"]:checked`));
        const q4HasAnswers = ['q4_i', 'q4_ii', 'q4_iii', 'q4_iv'].some(name => document.querySelector(`input[name="${name}"]:checked`));

        if (q3HasAnswers || q4HasAnswers) {
            resultsHTML += `
                <div class="question-breakdown">
                    <h4>Question 3 - Country Classification (A, B, C, D):</h4>
                    <div class="country-answers">`;

            // Question 3 detailed breakdown
            if (q3HasAnswers) {
                const q3Answers = ['q3_i', 'q3_ii', 'q3_iii', 'q3_iv'];
                const q3CorrectAnswers = ['b', 'c', 'a', 'b'];
                const q3Labels = ['Country A', 'Country B', 'Country C', 'Country D'];
                const q3Descriptions = [
                    'People who do not accept the country\'s official religion do not have a right to vote.',
                    'The same party has been winning elections for the last twenty years.',
                    'Ruling party has lost in the last three elections.',
                    'There is no independent election commission.'
                ];

                q3Answers.forEach((name, i) => {
                    const selected = document.querySelector(`input[name="${name}"]:checked`);
                    const userAnswer = selected ? selected.value : null;
                    const isCorrect = userAnswer === q3CorrectAnswers[i];

                    resultsHTML += `
                        <div class="sub-question-result ${userAnswer ? (isCorrect ? 'correct' : 'incorrect') : 'no-answer'}">
                            <p><strong>${i + 1}) ${q3Labels[i]}:</strong> ${q3Descriptions[i]}</p>
                            <p class="answer-detail"><strong>Your answer:</strong> ${userAnswer ? `${userAnswer.toUpperCase()}) ${userAnswer === 'a' ? 'Democratic' : userAnswer === 'b' ? 'Undemocratic' : 'Not sure'}` : 'No answer selected'}</p>
                            <p class="answer-detail"><strong>Correct answer:</strong> ${q3CorrectAnswers[i].toUpperCase()}) ${q3CorrectAnswers[i] === 'a' ? 'Democratic' : q3CorrectAnswers[i] === 'b' ? 'Undemocratic' : 'Not sure'}</p>
                        </div>`;
                });
            } else {
                resultsHTML += `<p>No answers provided for Question 3</p>`;
            }

            resultsHTML += `
                    </div>

                    <h4>Question 4 - Country Classification (P, Q, R, S):</h4>
                    <div class="country-answers">`;

            // Question 4 detailed breakdown
            if (q4HasAnswers) {
                const q4Answers = ['q4_i', 'q4_ii', 'q4_iii', 'q4_iv'];
                const q4CorrectAnswers = ['b', 'a', 'b', 'c'];
                const q4Labels = ['Country P', 'Country Q', 'Country R', 'Country S'];
                const q4Descriptions = [
                    'The parliament cannot pass a law about the army without the consent of the Chief of Army.',
                    'The parliament cannot pass a law reducing the powers of the judiciary.',
                    'The country\'s leaders cannot sign any treaty with another country without taking permission from its neighbouring country.',
                    'All the major economic decisions about the country are taken by officials of the central bank which the ministers cannot change.'
                ];

                q4Answers.forEach((name, i) => {
                    const selected = document.querySelector(`input[name="${name}"]:checked`);
                    const userAnswer = selected ? selected.value : null;
                    const isCorrect = userAnswer === q4CorrectAnswers[i];

                    resultsHTML += `
                        <div class="sub-question-result ${userAnswer ? (isCorrect ? 'correct' : 'incorrect') : 'no-answer'}">
                            <p><strong>${i + 1}) ${q4Labels[i]}:</strong> ${q4Descriptions[i]}</p>
                            <p class="answer-detail"><strong>Your answer:</strong> ${userAnswer ? `${userAnswer.toUpperCase()}) ${userAnswer === 'a' ? 'Democratic' : userAnswer === 'b' ? 'Undemocratic' : 'Not sure'}` : 'No answer selected'}</p>
                            <p class="answer-detail"><strong>Correct answer:</strong> ${q4CorrectAnswers[i].toUpperCase()}) ${q4CorrectAnswers[i] === 'a' ? 'Democratic' : q4CorrectAnswers[i] === 'b' ? 'Undemocratic' : 'Not sure'}</p>
                        </div>`;
                });
            } else {
                resultsHTML += `<p>No answers provided for Question 4</p>`;
            }

            resultsHTML += `
                    </div>

                    <h4>Question 5 - Which is not a good argument in favour of democracy?</h4>
                    <div class="country-answers">
                        <p><strong>Correct answer:</strong> d) Democracies are more prosperous than others.</p>
                    </div>
                </div>`;
        }

        const percentage = Math.round((correctCount / quizQuestions.length) * 100);
        const displayPercentage = isNaN(percentage) ? 0 : percentage;

        resultsHTML += `
            <div class="score-circle">
                <span class="score-number">${displayPercentage}%</span>
                <span class="score-label">Score</span>
            </div>
            <div class="score-details">
                <p>You answered ${correctCount} out of 11 questions correctly.</p>
            </div>
        </div>

        <!-- Display individual question results -->
        <div class="question-results-list">
            <h4>Detailed Results:</h4>
        </div>
        </div>`;

        resultsDiv.innerHTML = resultsHTML;
        resultsDiv.style.display = 'block';
        navigationDiv.style.display = 'none';

        // Show achievement based on score (total possible: 11 points)
        if (correctCount === 11) {
            showAchievement('Quiz Master', 'You answered all questions correctly!');
        } else if (correctCount >= 8) {
            showAchievement('Excellent Understanding', 'Outstanding! You have an excellent grasp of democratic principles.');
        } else if (correctCount >= 6) {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of democratic principles.');
        } else if (correctCount >= 4) {
            showAchievement('Basic Understanding', 'Good start! Keep learning about democratic principles.');
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

    // Define correct answers for democracy concepts
    const correctAnswers = {
        'a': 'i',    // Democracy -> A form of government in which rulers are elected by the people
        'b': 'ii',   // Free and Fair Elections -> Elections that offer real choice and fair opportunity to change rulers
        'c': 'iii',  // Rule of Law -> Government and citizens must follow the constitution and laws
        'd': 'iv',   // Political Equality -> Each adult citizen has one vote and each vote has equal value
        'e': 'v'     // Accountability -> Elected rulers are responsible to the people and can be removed
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
            showAchievement('Democracy Expert', 'You matched all democracy concepts correctly!');
        } else if (correctCount >= 3) {
            showAchievement('Good Understanding', 'Well done! You have a good grasp of democratic principles.');
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

// Helper function to get democracy concept name from ID
function getMinistryName(id) {
    const democracyConcepts = {
        'i': 'A form of government in which rulers are elected by the people',
        'ii': 'Elections that offer real choice and fair opportunity to change rulers',
        'iii': 'Government and citizens must follow the constitution and laws',
        'iv': 'Each adult citizen has one vote and each vote has equal value',
        'v': 'Elected rulers are responsible to the people and can be removed'
    };
    return democracyConcepts[id] || 'Unknown Concept';
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

    // Initialize quiz answer tracking
    initializeQuizAnswerTracking();
});

// Initialize quiz answer tracking
function initializeQuizAnswerTracking() {
    console.log('Initializing quiz answer tracking...');

    // Initialize userAnswers array if it doesn't exist
    if (typeof userAnswers === 'undefined') {
        userAnswers = [];
    }

    // Add event listeners to all quiz radio buttons
    const quizRadioButtons = document.querySelectorAll('input[type="radio"][name^="q"]');
    console.log('Found quiz radio buttons:', quizRadioButtons.length);

    quizRadioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const questionName = this.name;
            const questionValue = this.value;

            console.log('Radio button changed:', questionName, '=', questionValue);
            console.log('Radio button checked state:', this.checked);

            // Determine which question index this belongs to
            if (questionName === 'q1') {
                userAnswers[0] = questionValue.charCodeAt(0) - 97; // Convert 'a' to 0, 'b' to 1, etc.
                console.log('Set userAnswers[0] to:', userAnswers[0]);
            } else if (questionName === 'q2') {
                userAnswers[1] = questionValue.charCodeAt(0) - 97;
                console.log('Set userAnswers[1] to:', userAnswers[1]);
            } else if (questionName === 'q5') {
                userAnswers[4] = questionValue.charCodeAt(0) - 97;
                console.log('Set userAnswers[4] to:', userAnswers[4]);
            }
            // Questions 3 and 4 are handled separately in showQuizResults function

            console.log('Updated userAnswers:', userAnswers);
        });
    });

    // Also check for any already selected radio buttons
    quizRadioButtons.forEach(radio => {
        if (radio.checked) {
            const questionName = radio.name;
            const questionValue = radio.value;

            console.log('Found pre-selected radio button:', questionName, '=', questionValue);

            if (questionName === 'q1') {
                userAnswers[0] = questionValue.charCodeAt(0) - 97;
            } else if (questionName === 'q2') {
                userAnswers[1] = questionValue.charCodeAt(0) - 97;
            } else if (questionName === 'q5') {
                userAnswers[4] = questionValue.charCodeAt(0) - 97;
            }
        }
    });

    console.log('Final userAnswers after initialization:', userAnswers);
}

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