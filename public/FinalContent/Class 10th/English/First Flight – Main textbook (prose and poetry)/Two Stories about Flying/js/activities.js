/**
 * Activities and interactive exercises for Two Stories about Flying
 */

// Initialize activities when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activity buttons
    setupReflectionSaving();
    
    // Initialize any vocabulary exercises
    initializeVocabularyExercises();
    
    // Set up drag and drop activities
    setupDragAndDropActivities();
    
    // Initialize word matching games
    initializeWordMatching();
    
    // Initialize audio pronunciation guides
    setupAudioPronunciation();
});

// Function to save reflection text
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value;
    const feedbackDiv = document.getElementById('reflectionFeedback');
    
    if (reflectionText.trim().length < 10) {
        feedbackDiv.textContent = "Please write a more detailed reflection (at least a few sentences).";
        feedbackDiv.className = "feedback-message error show";
    } else {
        feedbackDiv.textContent = "Your reflection has been saved successfully!";
        feedbackDiv.className = "feedback-message success show";
        
        // Award points for completing reflection
        if (typeof score !== 'undefined') {
            score += 5;
            document.getElementById('totalScore').textContent = score;
        }
        
        // Show achievement for meaningful reflection
        if (reflectionText.trim().length > 50 && typeof showAchievement === 'function') {
            showAchievement("Deep Thinker: You've written a thoughtful reflection!");
        }
    }
    
    // Hide feedback after a few seconds
    setTimeout(() => {
        feedbackDiv.classList.remove('show');
    }, 3000);
}

// Setup reflection saving
function setupReflectionSaving() {
    const reflectionBtn = document.querySelector('.reflection-exercise .interactive-btn');
    if (reflectionBtn && !reflectionBtn.hasAttribute('data-initialized')) {
        reflectionBtn.setAttribute('data-initialized', 'true');
        reflectionBtn.addEventListener('click', saveReflection);
    }
}

// Initialize vocabulary exercises
function initializeVocabularyExercises() {
    // Check if vocabulary exercises are already initialized
    if (document.querySelector('.vocabulary-exercise .interactive-btn[data-initialized="true"]')) {
        return;
    }
    
    // Set up vocabulary check button
    const vocabBtn = document.querySelector('.vocabulary-exercise .interactive-btn');
    if (vocabBtn) {
        vocabBtn.setAttribute('data-initialized', 'true');
        vocabBtn.addEventListener('click', checkVocabulary);
    }
    
    // Set up phrases check button
    const phrasesBtn = document.querySelector('.matching-game .interactive-btn');
    if (phrasesBtn) {
        phrasesBtn.setAttribute('data-initialized', 'true');
        phrasesBtn.addEventListener('click', checkPhrases);
    }
}

// Check vocabulary answers
function checkVocabulary() {
    let correctAnswers = 0;
    const totalQuestions = 3;
    const feedback = document.getElementById('vocabFeedback');
    
    // Check answer for question 1
    const answer1 = document.getElementById('vocab1').value;
    if (answer1 === 'dirty') {
        correctAnswers++;
        document.getElementById('vocab1').style.borderColor = '#4caf50';
    } else {
        document.getElementById('vocab1').style.borderColor = '#f44336';
    }
    
    // Check answer for question 2
    const answer2 = document.getElementById('vocab2').value;
    if (answer2 === 'angry') {
        correctAnswers++;
        document.getElementById('vocab2').style.borderColor = '#4caf50';
    } else {
        document.getElementById('vocab2').style.borderColor = '#f44336';
    }
    
    // Check answer for question 3
    const answer3 = document.getElementById('vocab3').value;
    if (answer3 === 'most evil') {
        correctAnswers++;
        document.getElementById('vocab3').style.borderColor = '#4caf50';
    } else {
        document.getElementById('vocab3').style.borderColor = '#f44336';
    }
    
    // Display feedback
    if (correctAnswers === totalQuestions) {
        feedback.textContent = `Perfect! You got all ${correctAnswers} questions right!`;
        feedback.className = 'feedback-message success show';
        
        // Award points and show achievement
        if (typeof score !== 'undefined') {
            score += 10;
            document.getElementById('totalScore').textContent = score;
        }
        
        if (typeof showAchievement === 'function') {
            showAchievement("Vocabulary Master: Perfect score on the 'black' meanings quiz!");
        }
    } else {
        feedback.textContent = `You got ${correctAnswers} out of ${totalQuestions} questions correct. Try again!`;
        feedback.className = 'feedback-message error show';
    }
    
    // Hide feedback after a few seconds
    // Store the timeout so we can clear it if needed
    window.feedbackTimeout = setTimeout(() => {
        feedback.classList.remove('show');
    }, 5000);
}

// Check phrases matching
function checkPhrases() {
    let correctAnswers = 0;
    let totalQuestions = 0;
    let allInputsFilled = true; // Flag to check if all inputs are filled
    const feedback = document.getElementById('phrasesFeedback');
    
    // Check all contraction inputs
    document.querySelectorAll('.contraction-input').forEach(input => {
        totalQuestions++;
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        // First check if the input is empty
        if (userAnswer === '') {
            allInputsFilled = false;
            input.style.borderColor = '#ffc107'; // Yellow warning color for empty fields
            input.style.backgroundColor = '#fff8e1'; // Light yellow background
            return; // Skip further validation for this empty input
        }
        
        // Check if answer is correct (allowing for some variation)
        if (userAnswer === correctAnswer || 
            correctAnswer.includes(userAnswer) || 
            userAnswer.includes(correctAnswer)) {
            correctAnswers++;
            input.style.borderColor = '#4caf50'; // Green for correct
            input.style.backgroundColor = '#e8f5e9'; // Light green background
        } else {
            input.style.borderColor = '#f44336'; // Red for incorrect
            input.style.backgroundColor = '#ffebee'; // Light red background
        }
    });
    
    // Display feedback - first check if all inputs are filled
    if (!allInputsFilled) {
        feedback.textContent = 'Please fill in all the blanks before checking your answers.';
        feedback.className = 'feedback-message warning show';
    } else if (correctAnswers === totalQuestions) {
        feedback.textContent = `Perfect! You matched all ${correctAnswers} phrases correctly!`;
        feedback.className = 'feedback-message success show';
        
        // Award points and show achievement
        if (typeof score !== 'undefined') {
            score += 10;
            document.getElementById('totalScore').textContent = score;
        }
        
        if (typeof showAchievement === 'function') {
            showAchievement("Phrase Master: You've correctly matched all fly phrases!");
        }
    } else {
        feedback.textContent = `You matched ${correctAnswers} out of ${totalQuestions} phrases correctly. Try again!`;
        feedback.className = 'feedback-message error show';
        
        // Add a "Show Answers" button after two attempts
        if (!document.getElementById('showAnswersBtn')) {
            const attemptsKey = 'flyPhrasesAttempts';
            let attempts = parseInt(localStorage.getItem(attemptsKey) || '0') + 1;
            localStorage.setItem(attemptsKey, attempts.toString());
            
            if (attempts >= 2) {
                const showAnswersBtn = document.createElement('button');
                showAnswersBtn.id = 'showAnswersBtn';
                showAnswersBtn.className = 'interactive-btn show-answers-btn';
                showAnswersBtn.textContent = 'Show Correct Answers';
                showAnswersBtn.style.marginLeft = '10px';
                showAnswersBtn.onclick = showPhraseAnswers;
                
                feedback.appendChild(document.createElement('br'));
                feedback.appendChild(document.createElement('br'));
                feedback.appendChild(showAnswersBtn);
            }
        }
    }
    
    // Hide feedback after a few seconds
    // Store the timeout so we can clear it if needed
    window.feedbackTimeout = setTimeout(() => {
        feedback.classList.remove('show');
    }, 5000);
}

// Setup drag and drop activities
function setupDragAndDropActivities() {
    // This is a placeholder for future drag-and-drop activities
    // Not implemented in the current version
}

// Initialize word matching games
function initializeWordMatching() {
    // This is a placeholder for future word matching games
    // Not implemented in the current version
}

// Setup audio pronunciation guides
function setupAudioPronunciation() {
    // Set up click listeners for vocabulary words if not already done
    const vocabTerms = document.querySelectorAll('.highlight-vocab:not([data-audio-initialized])');
    
    vocabTerms.forEach(term => {
        term.setAttribute('data-audio-initialized', 'true');
        term.addEventListener('click', function() {
            const word = this.textContent.split('\n')[0].trim();
            const definition = this.querySelector('.vocab-tooltip').textContent;
            
            if (window.narrator) {
                window.narrator.speak(`${word}: ${definition}`);
            }
        });
    });
}

// Function to show correct answers for the "Phrases with 'Fly'" activity
function showPhraseAnswers() {
    // Get all input fields
    const inputs = document.querySelectorAll('.contraction-input');
    
    // Create an answers container
    let answersContainer = document.getElementById('answersContainer');
    if (!answersContainer) {
        answersContainer = document.createElement('div');
        answersContainer.id = 'answersContainer';
        answersContainer.className = 'answers-container';
        answersContainer.style.marginTop = '20px';
        answersContainer.style.padding = '15px';
        answersContainer.style.backgroundColor = '#f5f5f5';
        answersContainer.style.borderRadius = '8px';
        answersContainer.style.border = '1px solid #e0e0e0';
        
        // Add a title
        const title = document.createElement('h3');
        title.textContent = 'Correct Answers:';
        title.style.marginTop = '0';
        answersContainer.appendChild(title);
        
        // Create a list of correct answers
        const answersList = document.createElement('ul');
        answersList.style.paddingLeft = '20px';
        
        // Add each phrase and its correct answer
        inputs.forEach((input, index) => {
            const phrase = input.closest('.contraction-item').querySelector('p').textContent.split('input')[0].trim();
            const correctAnswer = input.getAttribute('data-answer');
            
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${phrase}</strong>: ${correctAnswer}`;
            listItem.style.marginBottom = '8px';
            answersList.appendChild(listItem);
            
            // Also fill in the correct answer in the input field
            input.value = correctAnswer;
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            input.disabled = true; // Disable the input after showing answers
        });
        
        answersContainer.appendChild(answersList);
        
        // Add a note about learning
        const note = document.createElement('p');
        note.innerHTML = '<strong>Note:</strong> Try to remember these phrases for future use in your writing and speaking.';
        note.style.marginTop = '15px';
        note.style.fontSize = '0.9em';
        note.style.fontStyle = 'italic';
        answersContainer.appendChild(note);
        
        // Add the answers container to the page
        const matchingGame = document.querySelector('.matching-game');
        matchingGame.appendChild(answersContainer);
        
        // Hide the show answers button
        const showAnswersBtn = document.getElementById('showAnswersBtn');
        if (showAnswersBtn) {
            showAnswersBtn.style.display = 'none';
        }
        
        // Update the feedback message
        const feedback = document.getElementById('phrasesFeedback');
        if (feedback) {
            feedback.textContent = 'Here are the correct answers. Review them carefully to learn these phrases.';
            feedback.className = 'feedback-message info show';
            
            // Keep the feedback visible
            clearTimeout(window.feedbackTimeout);
        }
    }
}

// Add a function for creating a timed quiz
function createTimedQuiz(questions, timeLimit) {
    // This is a placeholder for a future timed quiz feature
    // Not implemented in the current version
    console.log(`Would create a timed quiz with ${questions.length} questions and ${timeLimit} seconds per question`);
}

// Function to track lesson progress
function trackLessonProgress(moduleId, completed = true) {
    if (!window.modulesCompleted) {
        window.modulesCompleted = [];
    }
    
    if (completed && !window.modulesCompleted.includes(moduleId)) {
        window.modulesCompleted.push(moduleId);
        
        // Update progress if function exists
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        
        // Show achievement if function exists
        if (typeof showAchievement === 'function' && typeof getModuleName === 'function') {
            showAchievement(`Module Completed: ${getModuleName(moduleId)}`);
        }
    }
}

// Helper function to create interactive cards
function createInteractiveCard(title, content, interactiveElement) {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    
    const titleElement = document.createElement('h2');
    titleElement.className = 'exercise-title';
    titleElement.innerHTML = `<span class="exercise-icon">🔍</span> ${title}`;
    
    const contentBlock = document.createElement('div');
    contentBlock.className = 'content-block';
    contentBlock.innerHTML = content;
    
    card.appendChild(titleElement);
    card.appendChild(contentBlock);
    
    if (interactiveElement) {
        card.appendChild(interactiveElement);
    }
    
    return card;
}

// Function to generate downloadable certificate
function generateCertificate(userName, score) {
    // This is a placeholder for a future certificate generation feature
    // Not implemented in the current version
    console.log(`Would generate certificate for ${userName} with score ${score}`);
}
