/**
 * Form enhancements for better UX in Tatara-Vamiro interactive Hindi lesson
 */

// Add event listeners when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    enhanceFormElements();
    setupReflectionOptions();
    setupFormFeedback();
});

// Enhance form elements for better accessibility and UX
function enhanceFormElements() {
    // Add focus styles for form elements
    const formElements = document.querySelectorAll('input, select, textarea, button');
    formElements.forEach(element => {
        // Add focus and blur event listeners
        element.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
        
        // Add change event listeners for select elements
        if (element.tagName === 'SELECT') {
            element.addEventListener('change', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
            
            // Set initial state
            if (element.value) {
                element.classList.add('has-value');
            }
        }
    });
}

// Setup reflection options for better interaction
function setupReflectionOptions() {
    const reflectionOptions = document.querySelectorAll('.reflection-option');
    
    reflectionOptions.forEach(option => {
        // Make the whole option clickable
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Remove selection from all options
                reflectionOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                this.classList.add('selected');
            }
        });
    });
}

// Setup form feedback animations
function setupFormFeedback() {
    // Add animation for feedback messages
    const feedbackMessages = document.querySelectorAll('.feedback-message');
    
    feedbackMessages.forEach(message => {
        // Add entrance animation class
        message.classList.add('feedback-animate');
        
        // Listen for transitions
        message.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'opacity' && this.style.opacity === '0') {
                this.style.display = 'none';
            }
        });
    });
}

// Function to show feedback message
function showFeedback(elementId, message, type = 'success') {
    const feedbackElement = document.getElementById(elementId);
    if (!feedbackElement) return;
    
    // Set message and class
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback-message ${type} show feedback-animate`;
    
    // Make sure element is visible
    feedbackElement.style.display = 'block';
    feedbackElement.style.opacity = '1';
    
    // Hide after some time
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 5000);
}

// Function to save reflection with enhanced animation
function saveReflection() {
    const selectedOption = document.querySelector('input[name="reflection"]:checked');
    const feedbackEl = document.getElementById('reflectionFeedback');
    
    if (!selectedOption) {
        showFeedback('reflectionFeedback', 'कृपया कोई एक विकल्प चुनें।', 'warning');
        return;
    }
    
    const selectedValue = selectedOption.value;
    
    // Remove highlighting from all options first
    document.querySelectorAll('.reflection-option').forEach(option => {
        option.classList.remove('selected-option', 'best-option', 'good-option');
    });
    
    // Get the selected option's container div
    const selectedOptionDiv = selectedOption.closest('.reflection-option');
    
    // Check if the answer is the best or just acceptable
    let isBestAnswer = false;
    let isAcceptableAnswer = false;
    
    if (typeof reflectionAnswers !== 'undefined') {
        isBestAnswer = selectedValue === reflectionAnswers.best;
        isAcceptableAnswer = reflectionAnswers.acceptable.includes(selectedValue);
    }
    
    // Apply highlighting to show correctness with animation
    if (isBestAnswer) {
        // Best answer gets green highlight and checkmark
        selectedOptionDiv.classList.add('selected-option', 'best-option');
        
        // Add a checkmark icon
        const checkmark = document.createElement('span');
        checkmark.className = 'answer-icon best-icon';
        checkmark.innerHTML = '✓';
        selectedOptionDiv.appendChild(checkmark);
        
        // Animate the checkmark
        setTimeout(() => {
            checkmark.classList.add('show-icon');
        }, 100);
    } else if (isAcceptableAnswer) {
        // Good but not best answer gets blue highlight
        selectedOptionDiv.classList.add('selected-option', 'good-option');
        
        // Add a star icon
        const star = document.createElement('span');
        star.className = 'answer-icon good-icon';
        star.innerHTML = '★';
        selectedOptionDiv.appendChild(star);
        
        // Animate the star
        setTimeout(() => {
            star.classList.add('show-icon');
        }, 100);
    } else {
        // Any other answer just gets selected
        selectedOptionDiv.classList.add('selected-option');
    }
    
    // Display appropriate feedback based on the selected option
    if (typeof answerFeedback !== 'undefined' && answerFeedback.reflection && answerFeedback.reflection[selectedValue]) {
        let feedbackType = isBestAnswer ? 'success' : (isAcceptableAnswer ? 'partial-success' : 'error');
        showFeedback('reflectionFeedback', answerFeedback.reflection[selectedValue], feedbackType);
    } else {
        // Fallback if no feedback is defined
        showFeedback('reflectionFeedback', 'आपका चिंतन सहेज लिया गया है!', 'success');
    }
    
    // Update progress only if answer is acceptable or best
    if (isBestAnswer || isAcceptableAnswer) {
        if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
            score += 15;
            document.getElementById('totalScore').textContent = score;
            
            // Animate score change
            const scoreElement = document.getElementById('totalScore');
            scoreElement.classList.add('score-change');
            setTimeout(() => {
                scoreElement.classList.remove('score-change');
            }, 1000);
        }
        
        if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('prereading')) {
            modulesCompleted.push('prereading');
            if (typeof updateProgress === 'function') {
                updateProgress();
            }
            if (typeof showAchievement === 'function') {
                showAchievement('चिंतन पूर्ण!');
            }
        }
    }
    
    // If narrator is available, speak the feedback
    if (window.narrator) {
        const feedback = answerFeedback?.reflection?.[selectedValue] || 'आपका चिंतन सहेज लिया गया है!';
        window.narrator.speak("अपना चिंतन साझा करने के लिए धन्यवाद। " + feedback);
    }
}
