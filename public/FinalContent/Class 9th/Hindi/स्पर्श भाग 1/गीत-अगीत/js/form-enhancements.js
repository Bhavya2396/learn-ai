/**
 * Form Enhancements for Kabir's Sakhi Interactive Module
 * Adds interactive behaviors to form elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhancements
    initializeFormEnhancements();

    // Set up keyboard navigation detection
    setupKeyboardNavigation();
});

/**
 * Initialize all form enhancements
 */
function initializeFormEnhancements() {
    // Auto-expanding textareas
    setupAutoExpandingTextareas();
    
    // Enhanced focus management
    setupEnhancedFocus();
    
    // Enhanced dropdowns
    setupEnhancedDropdowns();
    
    // Input highlight on value change
    setupInputHighlight();

    // Radio button enhancements
    setupRadioEnhancements();
}

/**
 * Auto-expanding textareas grow as content is added
 */
function setupAutoExpandingTextareas() {
    // Find all textareas with auto-expand class
    const expandableTextareas = document.querySelectorAll('textarea.auto-expand');
    
    expandableTextareas.forEach(textarea => {
        // Set initial height
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
        
        // Update height on input
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    // For all textareas, add auto-expand class and initialize
    const allTextareas = document.querySelectorAll('.question-textarea, .reflection-exercise textarea, .writing-pad textarea, .listening-notes textarea');
    
    allTextareas.forEach(textarea => {
        textarea.classList.add('auto-expand');
        
        // Set initial height based on content
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(textarea.scrollHeight, parseInt(getComputedStyle(textarea).minHeight)) + 'px';
        
        // Add input event listener
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.max(this.scrollHeight, parseInt(getComputedStyle(this).minHeight)) + 'px';
        });
    });
}

/**
 * Enhanced focus management for form elements
 */
function setupEnhancedFocus() {
    // Selectors for all form elements to enhance
    const formElements = document.querySelectorAll('input, textarea, select, .option');
    
    formElements.forEach(element => {
        // Add focus animation class
        element.addEventListener('focus', function() {
            this.classList.add('focus-active');
            
            // For option containers with radio inputs
            if (this.classList.contains('option')) {
                this.querySelector('input[type="radio"]')?.focus();
            }
        });
        
        // Remove focus animation class
        element.addEventListener('blur', function() {
            this.classList.remove('focus-active');
        });
    });
}

/**
 * Enhanced dropdown selects with custom styling
 */
function setupEnhancedDropdowns() {
    const selects = document.querySelectorAll('select');
    
    selects.forEach(select => {
        // Add change event animation
        select.addEventListener('change', function() {
            this.classList.add('changed');
            
            setTimeout(() => {
                this.classList.remove('changed');
            }, 1000);
        });
    });
}

/**
 * Input highlight on value change
 */
function setupInputHighlight() {
    const inputs = document.querySelectorAll('input[type="text"], .contraction-input');
    
    inputs.forEach(input => {
        const originalValue = input.value;
        
        input.addEventListener('change', function() {
            if (this.value !== originalValue && this.value.trim() !== '') {
                this.classList.add('value-changed');
                
                setTimeout(() => {
                    this.classList.remove('value-changed');
                }, 1500);
            }
        });
    });
}

/**
 * Setup radio button enhancements for easier selection
 */
function setupRadioEnhancements() {
    const optionContainers = document.querySelectorAll('.option');
    
    optionContainers.forEach(container => {
        const radioInput = container.querySelector('input[type="radio"]');
        
        if (radioInput) {
            // Make the whole container clickable to select the radio
            container.addEventListener('click', function(e) {
                if (e.target !== radioInput) {
                    radioInput.checked = true;
                    radioInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
            
            // Add keyboard navigation
            container.addEventListener('keydown', function(e) {
                // Select on Enter or Space
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    radioInput.checked = true;
                    radioInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    });
}

/**
 * Detect keyboard navigation to provide appropriate focus styles
 */
function setupKeyboardNavigation() {
    // Add class to body when user is using keyboard to navigate
    function handleFirstTab(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
            window.removeEventListener('keydown', handleFirstTab);
        }
    }
    
    window.addEventListener('keydown', handleFirstTab);
    
    // Remove keyboard navigation class when mouse is used
    document.body.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });
}

/**
 * Initialize character count for textareas
 */
function initializeCharacterCount() {
    const textareas = document.querySelectorAll('.with-char-count');
    
    textareas.forEach(textarea => {
        // Create character count element
        const charCount = document.createElement('div');
        charCount.className = 'char-count';
        charCount.textContent = `${textarea.value.length} / ${textarea.getAttribute('maxlength') || 'unlimited'}`;
        
        // Insert after textarea
        textarea.parentNode.insertBefore(charCount, textarea.nextSibling);
        
        // Update on input
        textarea.addEventListener('input', function() {
            const maxLength = this.getAttribute('maxlength');
            const currentLength = this.value.length;
            
            charCount.textContent = `${currentLength}${maxLength ? ' / ' + maxLength : ''}`;
            
            // Add warning class when approaching limit
            if (maxLength && currentLength >= parseInt(maxLength) * 0.9) {
                charCount.classList.add('char-count-warning');
            } else {
                charCount.classList.remove('char-count-warning');
            }
        });
    });
}

/**
 * Add "filled" class to inputs with values for styling
 */
function markFilledInputs() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    function checkFilled() {
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    }
    
    // Initial check
    checkFilled();
    
    // Check on input
    inputs.forEach(input => {
        input.addEventListener('input', checkFilled);
        input.addEventListener('change', checkFilled);
    });
}

// Additional utility function to add to window object
window.formEnhancements = {
    initAutoExpand: function(selector) {
        const textareas = document.querySelectorAll(selector);
        textareas.forEach(textarea => {
            textarea.classList.add('auto-expand');
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(textarea.scrollHeight, parseInt(getComputedStyle(textarea).minHeight)) + 'px';
        });
    },
    
    // Function to apply validation styling to an input
    markValidity: function(input, isValid, message = '') {
        if (isValid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
            
            // Show error message if provided
            if (message) {
                // Create message element if doesn't exist
                let errorMsg = input.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    input.parentNode.insertBefore(errorMsg, input.nextSibling);
                }
                errorMsg.textContent = message;
            }
        }
    },
    
    // Reset all form elements in a container
    resetForms: function(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (container) {
            const formElements = container.querySelectorAll('input, textarea, select');
            formElements.forEach(el => {
                if (el.type === 'radio' || el.type === 'checkbox') {
                    el.checked = false;
                } else {
                    el.value = '';
                }
                el.classList.remove('valid', 'invalid', 'filled');
            });
            
            // Remove any error messages
            container.querySelectorAll('.error-message').forEach(msg => msg.remove());
        }
    }
};

// Initialize character count and filled markers
document.addEventListener('DOMContentLoaded', function() {
    initializeCharacterCount();
    markFilledInputs();
});
