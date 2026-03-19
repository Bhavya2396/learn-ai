/**
 * Form enhancements for Diary Ka Ek Panna
 */

// Setup auto-expanding textareas
function setupAutoExpandingTextareas() {
    const textareas = document.querySelectorAll('textarea[data-auto-expand]');
    
    textareas.forEach(textarea => {
        // Set initial height
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        
        // Add event listener for input
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
        
        // Add event listener for focus
        textarea.addEventListener('focus', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// Setup enhanced focus
function setupEnhancedFocus() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add focus event listener
        input.addEventListener('focus', function() {
            this.classList.add('focus-active');
            this.parentNode.classList.add('focus-active');
        });
        
        // Add blur event listener
        input.addEventListener('blur', function() {
            this.classList.remove('focus-active');
            this.parentNode.classList.remove('focus-active');
        });
        
        // Add change event listener for validation
        input.addEventListener('change', function() {
            validateInput(this);
        });
        
        // Add input event listener for real-time validation
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
}

// Setup enhanced dropdowns
function setupEnhancedDropdowns() {
    const selects = document.querySelectorAll('select');
    
    selects.forEach(select => {
        // Add change event listener
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        // Check initial value
        if (select.value) {
            select.classList.add('has-value');
        }
    });
}

// Setup input highlight
function setupInputHighlight() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add mouseenter event listener
        input.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
            this.parentNode.classList.add('hover-active');
        });
        
        // Add mouseleave event listener
        input.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
            this.parentNode.classList.remove('hover-active');
        });
    });
}

// Setup radio enhancements
function setupRadioEnhancements() {
    const radioGroups = document.querySelectorAll('input[type="radio"]');
    
    radioGroups.forEach(radio => {
        // Add change event listener
        radio.addEventListener('change', function() {
            // Remove selected class from all options in the same group
            const groupName = this.name;
            const groupRadios = document.querySelectorAll(`input[name="${groupName}"]`);
            groupRadios.forEach(r => {
                r.parentNode.classList.remove('selected-option');
            });
            
            // Add selected class to the checked option
            if (this.checked) {
                this.parentNode.classList.add('selected-option');
            }
        });
        
        // Check initial state
        if (radio.checked) {
            radio.parentNode.classList.add('selected-option');
        }
    });
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add keydown event listener
        form.addEventListener('keydown', function(e) {
            // Handle Enter key
            if (e.key === 'Enter') {
                const activeElement = document.activeElement;
                
                // If it's a textarea, don't submit the form
                if (activeElement.tagName === 'TEXTAREA') {
                    return;
                }
                
                // If it's a submit button, submit the form
                if (activeElement.type === 'submit') {
                    return;
                }
                
                // Otherwise, prevent default and focus next element
                e.preventDefault();
                focusNextElement(activeElement);
            }
            
            // Handle Tab key
            if (e.key === 'Tab') {
                // Let default behavior handle tab navigation
                return;
            }
        });
    });
}

// Focus next element
function focusNextElement(currentElement) {
    const form = currentElement.closest('form');
    if (!form) return;
    
    const focusableElements = form.querySelectorAll('input, textarea, select, button');
    const currentIndex = Array.from(focusableElements).indexOf(currentElement);
    
    if (currentIndex < focusableElements.length - 1) {
        focusableElements[currentIndex + 1].focus();
    } else {
        // If it's the last element, focus the first one
        focusableElements[0].focus();
    }
}

// Initialize character count
function initializeCharacterCount() {
    const textareas = document.querySelectorAll('textarea[data-max-length]');
    
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('data-max-length'));
        if (!maxLength) return;
        
        // Create character count element
        const countElement = document.createElement('div');
        countElement.className = 'character-count';
        countElement.textContent = `0/${maxLength}`;
        
        // Insert after textarea
        textarea.parentNode.insertBefore(countElement, textarea.nextSibling);
        
        // Add input event listener
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            countElement.textContent = `${currentLength}/${maxLength}`;
            
            // Add warning class if approaching limit
            if (currentLength > maxLength * 0.8) {
                countElement.classList.add('warning');
            } else {
                countElement.classList.remove('warning');
            }
            
            // Add error class if over limit
            if (currentLength > maxLength) {
                countElement.classList.add('error');
                this.classList.add('is-invalid');
            } else {
                countElement.classList.remove('error');
                this.classList.remove('is-invalid');
            }
        });
    });
}

// Mark filled inputs
function markFilledInputs() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Check if input has value
        if (input.value && input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Add input event listener
        input.addEventListener('input', function() {
            if (this.value && this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Validate input
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const required = input.hasAttribute('required');
    
    // Remove existing validation classes
    input.classList.remove('is-valid', 'is-invalid', 'has-warning');
    
    // Check if required field is empty
    if (required && !value) {
        input.classList.add('is-invalid');
        return false;
    }
    
    // Check if field has value
    if (!value) {
        return true; // Empty optional field is valid
    }
    
    // Validate based on type
    switch (type) {
        case 'email':
            if (!isValidEmail(value)) {
                input.classList.add('is-invalid');
                return false;
            }
            break;
            
        case 'tel':
            if (!isValidPhone(value)) {
                input.classList.add('is-invalid');
                return false;
            }
            break;
            
        case 'url':
            if (!isValidURL(value)) {
                input.classList.add('is-invalid');
                return false;
            }
            break;
            
        case 'number':
            if (!isValidNumber(value)) {
                input.classList.add('is-invalid');
                return false;
            }
            break;
    }
    
    // Check max length
    const maxLength = input.getAttribute('maxlength');
    if (maxLength && value.length > parseInt(maxLength)) {
        input.classList.add('is-invalid');
        return false;
    }
    
    // Check min length
    const minLength = input.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
        input.classList.add('has-warning');
        return false;
    }
    
    // If all validations pass, mark as valid
    input.classList.add('is-valid');
    return true;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Validate URL
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Validate number
function isValidNumber(number) {
    return !isNaN(number) && isFinite(number);
}

// Initialize all form enhancements
function initializeFormEnhancements() {
    console.log('Initializing form enhancements');
    
    setupAutoExpandingTextareas();
    setupEnhancedFocus();
    setupEnhancedDropdowns();
    setupInputHighlight();
    setupRadioEnhancements();
    setupKeyboardNavigation();
    initializeCharacterCount();
    markFilledInputs();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFormEnhancements);
