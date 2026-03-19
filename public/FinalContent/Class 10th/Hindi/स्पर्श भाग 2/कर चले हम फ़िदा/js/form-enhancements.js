/**
 * Form and UI enhancements for Kar Chale Hum Fida
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize custom select styling
    initCustomSelects();
    
    // Initialize custom input enhancements
    initInputEnhancements();
    
    // Initialize checkbox/radio styling
    initCustomCheckboxes();
    
    // Add validation to text inputs
    addTextInputValidation();
});

// Initialize custom select styling
function initCustomSelects() {
    // Add focus styling to select elements
    const selectElements = document.querySelectorAll('select');
    
    selectElements.forEach(select => {
        // Handle focus events
        select.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        select.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
        
        // Handle change events
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('selected');
            } else {
                this.classList.remove('selected');
            }
        });
        
        // Initial state
        if (select.value) {
            select.classList.add('selected');
        }
    });
}

// Initialize custom input enhancements
function initInputEnhancements() {
    // Add focus styling to text inputs and textareas
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    
    textInputs.forEach(input => {
        // Handle focus events
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
        
        // Handle input events
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
        
        // Initial state
        if (input.value.trim()) {
            input.classList.add('has-content');
        }
    });
}

// Initialize custom checkbox and radio button styling
function initCustomCheckboxes() {
    // Add custom styling to checkboxes and radio buttons
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const radios = document.querySelectorAll('input[type="radio"]');
    
    // Enhance checkboxes
    checkboxes.forEach(checkbox => {
        // Create a custom wrapper if it doesn't exist
        if (!checkbox.parentNode.classList.contains('custom-checkbox')) {
            const wrapper = document.createElement('label');
            wrapper.className = 'custom-checkbox';
            
            // Insert wrapper before checkbox
            checkbox.parentNode.insertBefore(wrapper, checkbox);
            
            // Move checkbox into wrapper
            wrapper.appendChild(checkbox);
            
            // Add custom elements
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            wrapper.appendChild(checkmark);
        }
    });
    
    // Enhance radio buttons
    radios.forEach(radio => {
        // Add event listener to update styling
        radio.addEventListener('change', function() {
            // Remove selected class from all radios in the same group
            document.querySelectorAll(`input[type="radio"][name="${this.name}"]`).forEach(r => {
                r.parentNode.classList.remove('selected');
            });
            
            // Add selected class to the parent of the checked radio
            if (this.checked) {
                this.parentNode.classList.add('selected');
            }
        });
        
        // Initial state
        if (radio.checked) {
            radio.parentNode.classList.add('selected');
        }
    });
}

// Add validation to text inputs
function addTextInputValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Check required text inputs
            const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    
                    // Add error styling
                    input.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = input.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'यह फ़ील्ड आवश्यक है';
                        input.parentNode.insertBefore(errorMessage, input.nextSibling);
                    }
                } else {
                    // Remove error styling
                    input.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = input.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            // Prevent form submission if invalid
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
    
    // Clear error state on input
    const allInputs = document.querySelectorAll('input, textarea');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            
            // Remove error message if it exists
            const errorMessage = this.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        });
    });
}

// Function to check contractions exercise
window.checkContractions = function() {
    const contractionInputs = document.querySelectorAll('.contraction-input');
    let correctCount = 0;
    let totalCount = contractionInputs.length;
    
    contractionInputs.forEach(input => {
        const userAnswer = input.value.trim();
        const correctAnswer = input.getAttribute('data-answer');
        
        // Check if the answer is correct
        // We're being lenient here - if the answer contains the correct keywords it's considered correct
        const isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase()) || 
                          correctAnswer.toLowerCase().includes(userAnswer.toLowerCase());
        
        // Update styling
        input.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
        
        if (isCorrect) {
            correctCount++;
        }
    });
    
    // Show feedback
    const feedback = document.getElementById('contractionFeedback');
    if (feedback) {
        feedback.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedback.className = 'feedback-message show';
        feedback.classList.add(correctCount === totalCount ? 'success' : 'error');
    }
    
    // Update progress if all correct
    if (correctCount === totalCount && typeof updateProgress === 'function') {
        updateProgress('thinking-language', 15);
    }
};

// Function to add animation effects to UI elements
function addAnimationEffects() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.interactive-btn, .nav-item, .story-nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add animation to exercise cards
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
    exerciseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Call animation effects setup
window.addEventListener('load', addAnimationEffects);

// Add function to handle reflection saving
function saveReflection() {
    // Check if the user has selected an option for both question sets
    const selected1 = document.querySelector('input[name="reflection"]:checked');
    const selected2 = document.querySelector('input[name="reflection2"]:checked');
    
    if (!selected1 || !selected2) {
        const feedbackEl = document.getElementById('reflectionFeedback');
        feedbackEl.textContent = 'कृपया दोनों प्रश्नों के उत्तर दें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('reflectionFeedback');
    feedbackEl.textContent = 'आपके उत्तर सहेज लिए गए हैं!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('prereading', 15);
    }
}
