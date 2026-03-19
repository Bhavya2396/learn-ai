/**
 * Language exercises for Tatara-Vamiro interactive Hindi lesson
 */

// Initialize language exercises
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageExercises();
});

// Set up language exercises
function initializeLanguageExercises() {
    // Add event listeners to vocabulary exercises
    const vocabSelects = document.querySelectorAll('.vocabulary-exercise select');
    vocabSelects.forEach(select => {
        select.addEventListener('change', function() {
            updateSelectStyles(this);
        });
    });
    
    // Add event listeners to sentence type exercises
    const sentenceTypeSelects = document.querySelectorAll('.contraction-exercise select');
    sentenceTypeSelects.forEach(select => {
        select.addEventListener('change', function() {
            updateSelectStyles(this);
        });
    });
    
    // Set up verb form exercises if present
    setupVerbFormExercises();
}

// Update select styles when an option is selected
function updateSelectStyles(selectElement) {
    if (selectElement.value) {
        selectElement.classList.add('has-selection');
    } else {
        selectElement.classList.remove('has-selection');
    }
}

// Set up verb form exercises
function setupVerbFormExercises() {
    const verbFormInputs = document.querySelectorAll('.verb-form-exercise input[type="text"]');
    
    verbFormInputs.forEach(input => {
        // Add input event listener
        input.addEventListener('input', function() {
            validateVerbForm(this);
        });
        
        // Add focus event listener
        input.addEventListener('focus', function() {
            this.closest('.verb-form-item').classList.add('focused');
        });
        
        // Add blur event listener
        input.addEventListener('blur', function() {
            this.closest('.verb-form-item').classList.remove('focused');
            validateVerbForm(this);
        });
    });
}

// Validate verb form input
function validateVerbForm(inputElement) {
    const value = inputElement.value.trim();
    const item = inputElement.closest('.verb-form-item');
    
    if (value) {
        item.classList.add('has-content');
    } else {
        item.classList.remove('has-content');
    }
}

// Check vocabulary answers
function checkVocabulary() {
    console.log("checkVocabulary function called");
    
    // Prevent multiple rapid clicks
    if (window.isCheckingVocabulary) {
        console.log("Already processing a check, ignoring duplicate call");
        return;
    }
    
    window.isCheckingVocabulary = true;
    setTimeout(() => { window.isCheckingVocabulary = false; }, 1000);
    
    try {
        // Get all vocabulary select elements
        const vocab1 = document.getElementById('vocab1');
        const vocab2 = document.getElementById('vocab2');
        const vocab3 = document.getElementById('vocab3');
        const vocab4 = document.getElementById('vocab4');
        const vocab5 = document.getElementById('vocab5');
        
        if (!vocab1 || !vocab2 || !vocab3 || !vocab4 || !vocab5) {
            console.error("Could not find all vocabulary select elements");
            return;
        }
        
        // Get the feedback element
        const feedbackEl = document.getElementById('vocabFeedback');
        if (!feedbackEl) {
            console.error("Feedback element not found!");
            return;
        }
        
        // Check if all selections are made
        if (!vocab1.value || !vocab2.value || !vocab3.value || !vocab4.value || !vocab5.value) {
            feedbackEl.textContent = 'कृपया सभी शब्दों के लिए विकल्प चुनें।';
            feedbackEl.className = 'feedback-message warning show';
            return;
        }
        
        // Define correct answers directly in this function to avoid dependency issues
        const correctAnswers = {
            vocab1: "आत्मीय",
            vocab2: "निर्निमेष",
            vocab3: "अचंभित",
            vocab4: "आशंका",
            vocab5: "विलक्षण"
        };
        
        console.log("Correct answers:", correctAnswers);
        console.log("User selections:", {
            vocab1: vocab1.value,
            vocab2: vocab2.value,
            vocab3: vocab3.value,
            vocab4: vocab4.value,
            vocab5: vocab5.value
        });
        
        // Check answers and count correct ones
        let correctCount = 0;
        
        // Check each answer and apply visual feedback
        const checkAnswer = (select, correctAnswer) => {
            // Remove any existing feedback
            select.classList.remove('correct-select', 'incorrect-select', 'is-valid', 'is-invalid');
            
            // Remove any existing feedback icons
            const parent = select.parentNode;
            const existingIcons = parent.querySelectorAll('.feedback-icon');
            existingIcons.forEach(icon => icon.remove());
            
            // Check if answer is correct
            const isCorrect = select.value === correctAnswer;
            
            if (isCorrect) {
                correctCount++;
                select.classList.add('correct-select', 'is-valid');
                select.style.border = '2px solid #28a745';
                select.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                
                // Create checkmark icon
                const checkmark = document.createElement('span');
                checkmark.className = 'feedback-icon correct';
                checkmark.innerHTML = ' ✓';
                checkmark.style.color = '#28a745';
                checkmark.style.fontWeight = 'bold';
                checkmark.style.marginLeft = '5px';
                checkmark.style.display = 'inline-block';
                parent.insertBefore(checkmark, select.nextSibling);
            } else {
                select.classList.add('incorrect-select', 'is-invalid');
                select.style.border = '2px solid #dc3545';
                select.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                
                // Create X icon
                const xmark = document.createElement('span');
                xmark.className = 'feedback-icon incorrect';
                xmark.innerHTML = ' ✗';
                xmark.style.color = '#dc3545';
                xmark.style.fontWeight = 'bold';
                xmark.style.marginLeft = '5px';
                xmark.style.display = 'inline-block';
                parent.insertBefore(xmark, select.nextSibling);
            }
        };
        
        // Check each answer
        checkAnswer(vocab1, correctAnswers.vocab1);
        checkAnswer(vocab2, correctAnswers.vocab2);
        checkAnswer(vocab3, correctAnswers.vocab3);
        checkAnswer(vocab4, correctAnswers.vocab4);
        checkAnswer(vocab5, correctAnswers.vocab5);
        
        // Determine feedback message
        let feedbackText, feedbackClass;
        const totalQuestions = 5;
        
        if (correctCount === totalQuestions) {
            feedbackText = "शानदार! सभी उत्तर सही हैं।";
            feedbackClass = 'success';
        } else if (correctCount > 0) {
            feedbackText = `${correctCount} सही उत्तर में से ${totalQuestions}। (${Math.round((correctCount / totalQuestions) * 100)}%)`;
            feedbackClass = 'partial-success';
        } else {
            feedbackText = "कोई सही उत्तर नहीं। पुनः प्रयास करें।";
            feedbackClass = 'error';
        }
        
        // Display feedback
        feedbackEl.textContent = feedbackText;
        feedbackEl.className = `feedback-message ${feedbackClass} show`;
        
        // Make sure feedback is visible with inline styles
        feedbackEl.style.display = 'block';
        feedbackEl.style.padding = '10px';
        feedbackEl.style.marginTop = '10px';
        feedbackEl.style.borderRadius = '5px';
        
        if (feedbackClass === 'success') {
            feedbackEl.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
            feedbackEl.style.border = '1px solid #28a745';
        } else if (feedbackClass === 'partial-success') {
            feedbackEl.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
            feedbackEl.style.border = '1px solid #ffc107';
        } else {
            feedbackEl.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
            feedbackEl.style.border = '1px solid #dc3545';
        }
        
        // Ensure the feedback is visible by scrolling to it
        setTimeout(() => {
            feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        // Update score based on performance
        if (correctCount === totalQuestions) {
            // Full points for all correct
            if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
                score += 15;
                document.getElementById('totalScore').textContent = score;
            }
        } else if (correctCount / totalQuestions >= 0.5) {
            // Partial points for at least 50% correct
            if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
                const points = Math.round(15 * (correctCount / totalQuestions));
                score += points;
                document.getElementById('totalScore').textContent = score;
            }
        }
        
        // If narrator is available, speak the feedback
        if (window.narrator) {
            const message = correctCount === totalQuestions ? 
                "शानदार! आपने सभी शब्दों के अर्थ सही पहचाने हैं।" : 
                `आपने ${totalQuestions} में से ${correctCount} शब्दों के अर्थ सही पहचाने हैं।`;
            window.narrator.speak(message);
        }
    } catch (error) {
        // Just log the error to console, don't show any user-facing error message
        console.error("Error in checkVocabulary:", error);
        
        // Try to recover by showing a neutral message instead of an error
        try {
            const feedbackEl = document.getElementById('vocabFeedback');
            if (feedbackEl) {
                feedbackEl.textContent = "कृपया अपने उत्तरों की जाँच करें।";
                feedbackEl.className = "feedback-message info show";
            }
        } catch (e) {
            // Silent catch - no user-facing error
        }
    }
}

// Check contraction answers
function checkContractions() {
    // Prevent multiple rapid clicks
    if (window.isCheckingContractions) {
        console.log("Already processing a check, ignoring duplicate call");
        return;
    }
    
    window.isCheckingContractions = true;
    setTimeout(() => { window.isCheckingContractions = false; }, 1000);
    
    try {
        const contraction1 = document.getElementById('contraction1').value;
        const contraction2 = document.getElementById('contraction2').value;
        const contraction3 = document.getElementById('contraction3').value;
        
        const feedbackEl = document.getElementById('contractionFeedback');
    
        // Check if all selections are made
        if (!contraction1 || !contraction2 || !contraction3) {
            feedbackEl.textContent = 'कृपया सभी वाक्य प्रकारों के लिए विकल्प चुनें।';
            feedbackEl.className = 'feedback-message warning show';
            return;
        }
    
        // Define correct answers directly
        const correctAnswers = {
            contraction1: "विधानवाचक",
            contraction2: "प्रश्नवाचक",
            contraction3: "विस्मयादिबोधक"
        };
        
        // Check answers against correct values
        const answers = [
            { id: 'contraction1', value: contraction1, correct: correctAnswers.contraction1 },
            { id: 'contraction2', value: contraction2, correct: correctAnswers.contraction2 },
            { id: 'contraction3', value: contraction3, correct: correctAnswers.contraction3 }
        ];
    
        let correctCount = answers.filter(a => a.value === a.correct).length;
        
        // Apply visual feedback to each select element
        answers.forEach(answer => {
            const select = document.getElementById(answer.id);
            select.classList.remove('correct-select', 'incorrect-select');
            
            if (answer.value === answer.correct) {
                select.classList.add('correct-select');
            } else {
                select.classList.add('incorrect-select');
            }
        });
        
        // Determine feedback based on number of correct answers
        let feedbackText, feedbackClass;
        if (correctCount === answers.length) {
            feedbackText = "शानदार! सभी उत्तर सही हैं।";
            feedbackClass = 'success';
        } else if (correctCount > 0) {
            feedbackText = `${correctCount} सही उत्तर में से ${answers.length}। (${Math.round((correctCount / answers.length) * 100)}%)`;
            feedbackClass = 'partial-success';
        } else {
            feedbackText = "कोई सही उत्तर नहीं। पुनः प्रयास करें।";
            feedbackClass = 'error';
        }
        
        // Display feedback
        feedbackEl.textContent = feedbackText;
        feedbackEl.className = `feedback-message ${feedbackClass} show`;
        
        // Update score if at least one correct answer
        if (correctCount > 0) {
            updateLanguageExerciseScore(correctCount * 3);
        }
        
        // If narrator is available, speak the feedback
        if (window.narrator) {
            const message = correctCount === answers.length ? 
                "शानदार! आपने सभी वाक्य प्रकारों को सही पहचाना है!" : 
                `आपने ${answers.length} में से ${correctCount} वाक्य प्रकारों को सही पहचाना है।`;
            window.narrator.speak(message);
        }
    } catch (error) {
        // Just log the error to console, don't show any user-facing error message
        console.error("Error in checkContractions:", error);
        
        // Try to recover by showing a neutral message instead of an error
        try {
            const feedbackEl = document.getElementById('contractionFeedback');
            if (feedbackEl) {
                feedbackEl.textContent = "कृपया अपने उत्तरों की जाँच करें।";
                feedbackEl.className = "feedback-message info show";
            }
        } catch (e) {
            // Silent catch - no user-facing error
        }
    }
}

// Update score for language exercises
function updateLanguageExerciseScore(points) {
    if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
        score += points;
        document.getElementById('totalScore').textContent = score;
        
        // Animate score change
        const scoreElement = document.getElementById('totalScore');
        scoreElement.classList.add('score-change');
        setTimeout(() => {
            scoreElement.classList.remove('score-change');
        }, 1000);
    }
}