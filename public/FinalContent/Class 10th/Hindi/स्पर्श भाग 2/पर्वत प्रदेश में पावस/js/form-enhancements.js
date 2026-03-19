/**
 * Form enhancements for better accessibility and user experience
 */

document.addEventListener('DOMContentLoaded', function() {
    enhanceFormElements();
    setupFormValidation();
});

// Enhance form elements with better styling and interaction
function enhanceFormElements() {
    // Enhance textareas with auto-resize
    document.querySelectorAll('textarea').forEach(textarea => {
        if (!textarea.classList.contains('enhanced')) {
            textarea.classList.add('enhanced');
            
            // Set initial height
            adjustTextareaHeight(textarea);
            
            // Add input event listener to adjust height as user types
            textarea.addEventListener('input', function() {
                adjustTextareaHeight(this);
            });
            
            // Add focus and blur handlers for styling
            textarea.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            textarea.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        }
    });
    
    // Enhance select elements
    document.querySelectorAll('select').forEach(select => {
        if (!select.classList.contains('enhanced')) {
            select.classList.add('enhanced');
            
            // Create a wrapper if not already wrapped
            if (!select.parentElement.classList.contains('select-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'select-wrapper';
                select.parentNode.insertBefore(wrapper, select);
                wrapper.appendChild(select);
                
                // Add arrow indicator
                const arrow = document.createElement('div');
                arrow.className = 'select-arrow';
                arrow.innerHTML = '▼';
                wrapper.appendChild(arrow);
            }
            
            // Add change handler to mark as filled
            select.addEventListener('change', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        }
    });
    
    // Enhance radio button groups
    document.querySelectorAll('.radio-options').forEach(group => {
        if (!group.classList.contains('enhanced')) {
            group.classList.add('enhanced');
            
            // Add keyboard navigation
            group.addEventListener('keydown', handleRadioKeyNavigation);
        }
    });
}

// Adjust textarea height to match content
function adjustTextareaHeight(textarea) {
    // Reset height to auto to get actual content height
    textarea.style.height = 'auto';
    
    // Add some extra space to avoid scrollbar flashing
    const newHeight = Math.max(textarea.scrollHeight + 2, 50);
    
    // Set new height
    textarea.style.height = newHeight + 'px';
}

// Handle keyboard navigation for radio button groups
function handleRadioKeyNavigation(event) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    
    const radioButtons = Array.from(this.querySelectorAll('input[type="radio"]'));
    const currentIndex = radioButtons.findIndex(radio => radio === document.activeElement);
    
    if (currentIndex < 0) return;
    
    // Prevent default to avoid page scrolling
    event.preventDefault();
    
    let nextIndex;
    
    if (event.key === 'ArrowUp') {
        // Move to previous radio button or wrap to last
        nextIndex = currentIndex > 0 ? currentIndex - 1 : radioButtons.length - 1;
    } else {
        // Move to next radio button or wrap to first
        nextIndex = currentIndex < radioButtons.length - 1 ? currentIndex + 1 : 0;
    }
    
    // Focus and check the next radio button
    radioButtons[nextIndex].focus();
    radioButtons[nextIndex].checked = true;
}

// Set up form validation
function setupFormValidation() {
    // Add form submission handlers
    document.querySelectorAll('form').forEach(form => {
        if (!form.classList.contains('validation-enhanced')) {
            form.classList.add('validation-enhanced');
            
            form.addEventListener('submit', function(event) {
                // Validate form before submission
                if (!validateForm(this)) {
                    event.preventDefault();
                }
            });
        }
    });
    
    // Add validation to required inputs
    document.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
        if (!field.classList.contains('validation-enhanced')) {
            field.classList.add('validation-enhanced');
            
            // Add blur handler to validate field
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Add input handler to clear validation when user starts typing
            field.addEventListener('input', function() {
                this.classList.remove('invalid');
                const errorElement = this.parentElement.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
            });
        }
    });
}

// Validate a single form field
function validateField(field) {
    let isValid = true;
    let errorMessage = '';
    
    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Check if field is required and empty
    if (field.required && !field.value.trim()) {
        isValid = false;
        errorMessage = 'यह फ़ील्ड आवश्यक है।';
    }
    // Check email format if it's an email field
    else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'कृपया एक वैध ईमेल पता दर्ज करें।';
        }
    }
    // Check minimum length for text fields
    else if ((field.tagName === 'TEXTAREA' || field.type === 'text') && 
             field.getAttribute('minlength') && 
             field.value.length < parseInt(field.getAttribute('minlength'))) {
        isValid = false;
        errorMessage = `कृपया कम से कम ${field.getAttribute('minlength')} अक्षर दर्ज करें।`;
    }
    
    // Mark field as valid or invalid
    field.classList.toggle('invalid', !isValid);
    
    // Add error message if invalid
    if (!isValid) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = errorMessage;
        field.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

// Validate entire form
function validateForm(form) {
    let isValid = true;
    
    // Validate all required fields
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}
