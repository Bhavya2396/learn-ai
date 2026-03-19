/**
 * Form enhancements for the Kartoos module
 */

document.addEventListener('DOMContentLoaded', () => {
    // Apply enhanced styling to all textareas and inputs
    applyInputStyles();
    
    // Set up auto-expanding textareas
    setupAutoExpandingTextareas();
    
    // Set up enhanced form feedback
    setupFormFeedback();
});

// Apply enhanced styling to inputs
function applyInputStyles() {
    // Add focus effects
    document.querySelectorAll('input[type="text"], input[type="email"], textarea, select').forEach(input => {
        // Add focus events
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
            
            // Add filled class if the input has content
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('input-filled');
            } else {
                this.parentElement.classList.remove('input-filled');
            }
        });
        
        // Check initial state
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('input-filled');
        }
    });
    
    // Add animation to buttons
    document.querySelectorAll('.interactive-btn').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.classList.add('btn-active');
        });
        
        button.addEventListener('mouseup', function() {
            this.classList.remove('btn-active');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-active');
        });
    });
}

// Setup auto-expanding textareas
function setupAutoExpandingTextareas() {
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            // Reset height to get the correct scrollHeight
            this.style.height = 'auto';
            
            // Set new height based on content
            const newHeight = Math.max(this.scrollHeight, 100) + 'px';
            this.style.height = newHeight;
        });
        
        // Initial height adjustment
        textarea.dispatchEvent(new Event('input'));
    });
}

// Setup enhanced form feedback
function setupFormFeedback() {
    // Set up error message display
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('invalid', function(event) {
            event.preventDefault();
            
            // Remove any existing error messages
            const existingError = this.parentElement.querySelector('.input-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Create and append error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'input-error';
            
            // Use custom message or default
            if (this.dataset.errorMessage) {
                errorMessage.textContent = this.dataset.errorMessage;
            } else {
                errorMessage.textContent = 'कृपया वैध मान दर्ज करें।';
            }
            
            this.parentElement.appendChild(errorMessage);
            this.parentElement.classList.add('has-error');
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            const errorElement = this.parentElement.querySelector('.input-error');
            if (errorElement) {
                errorElement.remove();
                this.parentElement.classList.remove('has-error');
            }
        });
    });
    
    // Enhance form feedback messages
    document.querySelectorAll('.feedback-message').forEach(feedback => {
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'feedback-close';
        closeButton.innerHTML = '×';
        closeButton.setAttribute('aria-label', 'Close message');
        closeButton.addEventListener('click', function() {
            this.parentElement.classList.remove('show');
            setTimeout(() => this.parentElement.remove(), 500);
        });
        
        feedback.appendChild(closeButton);
    });
}

// Function to toggle visibility of a section
window.toggleSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('section-hidden');
    }
};
