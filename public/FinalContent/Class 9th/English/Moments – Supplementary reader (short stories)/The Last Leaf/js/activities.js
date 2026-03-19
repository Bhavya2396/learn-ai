/**
 * Activities for The Last Leaf interactive lesson
 */

// Save reflection function
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    
    if (reflectionText.length < 20) {
        const feedbackEl = document.getElementById('reflectionFeedback');
        feedbackEl.textContent = 'Please write a more detailed reflection (at least 20 characters).';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('reflectionFeedback');
    feedbackEl.textContent = 'Your reflection has been saved!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (typeof score !== 'undefined') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
    
    if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('Reflection Completed!');
        }
    }
    
    if (window.narrator) {
        window.narrator.speak("Thank you for sharing your reflection. Your thoughts have been saved.");
    }
}

// Check vocabulary exercise answers
function checkVocabulary() {
    const correctAnswers = {
        'vocab1': 'feeble',
        'vocab2': 'energetically',
        'vocab3': 'storey',
        'vocab4': 'pneumonia',
        'vocab5': 'masterpiece'
    };
    
    let allCorrect = true;
    let score = 0;
    
    // Check each vocabulary question
    for (let i = 1; i <= 5; i++) {
        const selectElement = document.getElementById(`vocab${i}`);
        const selectedValue = selectElement.value;
        
        if (selectedValue === correctAnswers[`vocab${i}`]) {
            // Correct answer
            score += 2;
            selectElement.classList.add('correct-answer');
            selectElement.classList.remove('wrong-answer');
        } else if (selectedValue !== '') {
            // Wrong answer
            allCorrect = false;
            selectElement.classList.add('wrong-answer');
            selectElement.classList.remove('correct-answer');
        } else {
            // No answer
            allCorrect = false;
        }
    }
    
    // Display feedback
    const feedbackElement = document.getElementById('vocabFeedback');
    
    if (allCorrect) {
        feedbackElement.textContent = 'Perfect! All answers are correct.';
        feedbackElement.className = 'feedback-message show success';
        
        // Update global score if it exists
        if (typeof window.score !== 'undefined') {
            window.score += 10;
            document.getElementById('totalScore').textContent = window.score;
        }
        
        // Mark this activity as completed
        if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('thinking-language')) {
            modulesCompleted.push('thinking-language');
            if (typeof updateProgress === 'function') {
                updateProgress();
            }
            if (typeof showAchievement === 'function') {
                showAchievement('Vocabulary Activity Completed!');
            }
        }
    } else {
        feedbackElement.textContent = `You got ${score/2}/5 correct. Try again!`;
        feedbackElement.className = 'feedback-message show warning';
    }
    
    // Read feedback aloud
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(feedbackElement.textContent);
    }
}

// Check conditionals exercise
function checkConditionals() {
    const inputs = document.querySelectorAll('.contraction-input');
    const correctAnswers = [
        "she will be disappointed",
        "we will get hungry",
        "won't send you any more letters",
        "she will become lazy",
        "will catch it"
    ];
    
    let allCorrect = true;
    let score = 0;
    
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = correctAnswers[index].toLowerCase();
        
        if (userAnswer === correctAnswer) {
            // Correct answer
            score += 2;
            input.classList.add('correct-answer');
            input.classList.remove('wrong-answer');
        } else if (userAnswer !== '') {
            // Check if the answer is close enough (contains key parts)
            const keyParts = correctAnswer.split(' ');
            let closeEnough = true;
            
            for (const part of keyParts) {
                if (part.length > 3 && !userAnswer.includes(part)) {
                    closeEnough = false;
                    break;
                }
            }
            
            if (closeEnough) {
                score += 1;
                input.classList.add('partial-answer');
                input.classList.remove('wrong-answer', 'correct-answer');
            } else {
                allCorrect = false;
                input.classList.add('wrong-answer');
                input.classList.remove('correct-answer', 'partial-answer');
            }
        } else {
            // No answer
            allCorrect = false;
            input.classList.remove('correct-answer', 'wrong-answer', 'partial-answer');
        }
    });
    
    // Display feedback
    const feedbackElement = document.getElementById('conditionalssFeedback');
    
    if (allCorrect) {
        feedbackElement.textContent = 'Perfect! All your conditional sentences are correct.';
        feedbackElement.className = 'feedback-message show success';
        
        // Update global score if it exists
        if (typeof window.score !== 'undefined') {
            window.score += 10;
            document.getElementById('totalScore').textContent = window.score;
        }
    } else if (score >= 5) {
        feedbackElement.textContent = 'Good effort! Some of your answers are close. Check the model answers.';
        feedbackElement.className = 'feedback-message show warning';
        
        // Add a button to show answers
        const showAnswersBtn = document.createElement('button');
        showAnswersBtn.textContent = 'Show Correct Answers';
        showAnswersBtn.className = 'interactive-btn show-answers-btn';
        showAnswersBtn.onclick = function() {
            showCorrectConditionalAnswers(correctAnswers);
        };
        
        feedbackElement.appendChild(showAnswersBtn);
    } else {
        feedbackElement.textContent = 'Keep trying! Review the examples and try again.';
        feedbackElement.className = 'feedback-message show error';
        
        // Add a button to show answers
        const showAnswersBtn = document.createElement('button');
        showAnswersBtn.textContent = 'Show Correct Answers';
        showAnswersBtn.className = 'interactive-btn show-answers-btn';
        showAnswersBtn.onclick = function() {
            showCorrectConditionalAnswers(correctAnswers);
        };
        
        feedbackElement.appendChild(showAnswersBtn);
    }
    
    // Read feedback aloud
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(feedbackElement.textContent);
    }
}

// Show correct answers for conditionals
function showCorrectConditionalAnswers(correctAnswers) {
    const inputs = document.querySelectorAll('.contraction-input');
    
    inputs.forEach((input, index) => {
        // Create a tooltip with the correct answer
        const tooltip = document.createElement('div');
        tooltip.className = 'answer-tooltip';
        tooltip.textContent = `Answer: ${correctAnswers[index]}`;
        
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
