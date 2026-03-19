/**
 * Form enhancement functionality for Meera Ke Pad module
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Form enhancements module loaded');
    initFormEnhancements();
});

/**
 * Initialize all form enhancements
 */
function initFormEnhancements() {
    setupTextAreaAutoExpand();
    setupAutoResizingInputs();
    setupFormValidation();
    setupKeyboardNavigation();
    setupCharacterCounters();
    enhanceDropdowns();
}

/**
 * Set up auto-expanding textareas
 */
function setupTextAreaAutoExpand() {
    const textareas = document.querySelectorAll('textarea.auto-expand');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Trigger once to set initial height
        if (textarea.value) {
            const event = new Event('input');
            textarea.dispatchEvent(event);
        }
    });
}

/**
 * Set up auto-resizing inputs for special cases
 */
function setupAutoResizingInputs() {
    const inputs = document.querySelectorAll('input[data-auto-resize]');
    
    inputs.forEach(input => {
        // Create hidden span to measure text width
        const measurer = document.createElement('span');
        measurer.className = 'input-measurer';
        measurer.style.position = 'absolute';
        measurer.style.visibility = 'hidden';
        measurer.style.whiteSpace = 'pre';
        measurer.style.font = window.getComputedStyle(input).font;
        document.body.appendChild(measurer);
        
        // Auto-resize function
        const resize = () => {
            measurer.textContent = input.value || input.placeholder || '';
            const width = Math.max(
                measurer.offsetWidth + 20, // Add padding
                parseInt(input.getAttribute('data-min-width') || '60', 10)
            );
            input.style.width = `${width}px`;
        };
        
        // Attach event listeners
        input.addEventListener('input', resize);
        input.addEventListener('change', resize);
        input.addEventListener('focus', resize);
        
        // Initial resize
        resize();
    });
}

/**
 * Set up form validation for required fields and special validation
 */
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const requiredInputs = form.querySelectorAll('[required]');
        const submitButton = form.querySelector('button[type="submit"]') || 
                             form.querySelector('.submit-btn');
        
        if (submitButton) {
            form.addEventListener('submit', function(event) {
                let isValid = true;
                
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        highlightInvalidField(input);
                    } else {
                        clearInvalidHighlight(input);
                    }
                });
                
                if (!isValid) {
                    event.preventDefault();
                    showErrorMessage(form, 'कृपया सभी आवश्यक फ़ील्ड भरें');
                }
            });
        }
        
        // Live validation for fields with data-validate attribute
        const validatableFields = form.querySelectorAll('[data-validate]');
        validatableFields.forEach(field => {
            field.addEventListener('blur', function() {
                const validationType = this.getAttribute('data-validate');
                const isValid = validateField(this, validationType);
                
                if (!isValid) {
                    highlightInvalidField(this);
                } else {
                    clearInvalidHighlight(this);
                }
            });
        });
    });
}

/**
 * Validate a field based on validation type
 * @param {HTMLElement} field - The field to validate
 * @param {string} validationType - Type of validation to perform
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field, validationType) {
    const value = field.value.trim();
    
    // Skip validation if empty (unless required)
    if (!value && !field.hasAttribute('required')) {
        return true;
    }
    
    switch (validationType) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'number':
            return !isNaN(parseFloat(value)) && isFinite(value);
        case 'minlength':
            const minLength = parseInt(field.getAttribute('data-min-length') || '0', 10);
            return value.length >= minLength;
        case 'maxlength':
            const maxLength = parseInt(field.getAttribute('data-max-length') || '9999', 10);
            return value.length <= maxLength;
        default:
            return true;
    }
}

/**
 * Highlight invalid field
 * @param {HTMLElement} field - Field to highlight
 */
function highlightInvalidField(field) {
    field.classList.add('is-invalid');
    
    // Create or update error message
    let errorEl = field.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('error-message')) {
        errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        field.parentNode.insertBefore(errorEl, field.nextSibling);
    }
    
    // Set appropriate error message
    if (!field.value.trim() && field.hasAttribute('required')) {
        errorEl.textContent = 'यह फ़ील्ड आवश्यक है';
    } else {
        switch (field.getAttribute('data-validate')) {
            case 'email':
                errorEl.textContent = 'कृपया एक वैध ईमेल पता दर्ज करें';
                break;
            case 'number':
                errorEl.textContent = 'कृपया एक वैध संख्या दर्ज करें';
                break;
            case 'minlength':
                const minLength = field.getAttribute('data-min-length');
                errorEl.textContent = `कम से कम ${minLength} अक्षर होने चाहिए`;
                break;
            case 'maxlength':
                const maxLength = field.getAttribute('data-max-length');
                errorEl.textContent = `अधिकतम ${maxLength} अक्षर हो सकते हैं`;
                break;
            default:
                errorEl.textContent = 'यह फ़ील्ड अमान्य है';
        }
    }
}

/**
 * Clear invalid field highlighting
 * @param {HTMLElement} field - Field to clear
 */
function clearInvalidHighlight(field) {
    field.classList.remove('is-invalid');
    
    // Remove error message if it exists
    const errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains('error-message')) {
        errorEl.remove();
    }
}

/**
 * Show an error message for a form
 * @param {HTMLFormElement} form - Form to show error for
 * @param {string} message - Error message
 */
function showErrorMessage(form, message) {
    let errorContainer = form.querySelector('.form-error-container');
    
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'form-error-container';
        form.insertBefore(errorContainer, form.firstChild);
    }
    
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 3000);
}

/**
 * Set up keyboard navigation indicators
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Add class to body when Tab is pressed
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    document.addEventListener('mousedown', function() {
        // Remove class when mouse is used
        document.body.classList.remove('user-is-tabbing');
    });
}

/**
 * Set up character counters for textarea fields
 */
function setupCharacterCounters() {
    const textAreas = document.querySelectorAll('textarea[data-max-chars]');
    
    textAreas.forEach(textArea => {
        const maxChars = parseInt(textArea.getAttribute('data-max-chars'), 10);
        
        // Create character counter
        const counterWrapper = document.createElement('div');
        counterWrapper.className = 'char-count';
        
        const counter = document.createElement('span');
        counter.className = 'current-chars';
        counter.textContent = '0';
        
        const divider = document.createTextNode(' / ');
        
        const max = document.createElement('span');
        max.className = 'max-chars';
        max.textContent = maxChars;
        
        counterWrapper.appendChild(counter);
        counterWrapper.appendChild(divider);
        counterWrapper.appendChild(max);
        
        // Insert after textarea
        textArea.parentNode.insertBefore(counterWrapper, textArea.nextSibling);
        
        // Update counter on input
        textArea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = currentLength;
            
            // Visual warning when approaching limit
            if (currentLength > maxChars * 0.9) {
                counterWrapper.classList.add('char-count-warning');
            } else {
                counterWrapper.classList.remove('char-count-warning');
            }
            
            // Hard limit at max chars
            if (currentLength > maxChars) {
                this.value = this.value.substring(0, maxChars);
                counter.textContent = maxChars;
            }
        });
    });
}

/**
 * Enhance dropdown selects with better styling and accessibility
 */
function enhanceDropdowns() {
    const selects = document.querySelectorAll('select:not(.no-enhance)');
    
    selects.forEach(select => {
        // Add change animation class when value changes
        select.addEventListener('change', function() {
            this.classList.add('changed');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('changed');
            }, 1000);
        });
    });
}

