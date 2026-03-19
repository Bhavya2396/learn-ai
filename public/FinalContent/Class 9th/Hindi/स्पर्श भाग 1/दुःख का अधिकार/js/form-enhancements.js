/**
 * Form Enhancements for दुःख का अधिकार Interactive Lesson
 */

// Form enhancement utilities
const formEnhancements = {
    // Initialize form enhancements
    init: function() {
        this.addFormValidation();
        this.addFormStyling();
        this.addFormInteractions();
        this.addAccessibilityFeatures();
        console.log('Form enhancements initialized');
    },
    
    // Add form validation
    addFormValidation: function() {
        const forms = document.querySelectorAll('form, .question-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                validateForm(this);
            });
        });
        
        // Add real-time validation for text inputs
        const textInputs = document.querySelectorAll('input[type="text"], textarea');
        textInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearValidationError(this);
            });
        });
    },
    
    // Add form styling
    addFormStyling: function() {
        // Add focus styles
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
            });
        });
        
        // Add hover effects for buttons
        const buttons = document.querySelectorAll('button, .interactive-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            button.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });
    },
    
    // Add form interactions
    addFormInteractions: function() {
        // Add character counter for textareas
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            addCharacterCounter(textarea);
        });
        
        // Add auto-save functionality
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                autoSave(this);
            });
        });
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                saveAllForms();
            }
        });
    },
    
    // Add accessibility features
    addAccessibilityFeatures: function() {
        // Add ARIA labels
        const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
        inputs.forEach(input => {
            if (!input.getAttribute('aria-label')) {
                const label = input.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    input.setAttribute('aria-label', label.textContent);
                }
            }
        });
        
        // Add keyboard navigation
        const focusableElements = document.querySelectorAll('button, input, textarea, select, [tabindex]');
        focusableElements.forEach((element, index) => {
            element.setAttribute('tabindex', index + 1);
        });
        
        // Add screen reader announcements
        const feedbackElements = document.querySelectorAll('.feedback-message');
        feedbackElements.forEach(element => {
            element.setAttribute('aria-live', 'polite');
            element.setAttribute('role', 'status');
        });
    }
};

// Form validation functions
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        showFormSuccess(form);
    } else {
        showFormError(form, 'कृपया सभी आवश्यक फ़ील्ड भरें।');
    }
    
    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const required = input.hasAttribute('required');
    
    // Clear previous validation
    clearValidationError(input);
    
    // Check if required field is empty
    if (required && !value) {
        showValidationError(input, 'यह फ़ील्ड आवश्यक है।');
        return false;
    }
    
    // Type-specific validation
    if (value) {
        switch (type) {
            case 'email':
                if (!isValidEmail(value)) {
                    showValidationError(input, 'कृपया एक वैध ईमेल पता दर्ज करें।');
                    return false;
                }
                break;
            case 'number':
                if (isNaN(value)) {
                    showValidationError(input, 'कृपया एक वैध संख्या दर्ज करें।');
                    return false;
                }
                break;
        }
    }
    
    return true;
}

function showValidationError(input, message) {
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    input.parentNode.appendChild(errorDiv);
}

function clearValidationError(input) {
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');
    
    const errorDiv = input.parentNode.querySelector('.validation-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showFormSuccess(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = 'फ़ॉर्म सफलतापूर्वक सबमिट हो गया!';
    successDiv.setAttribute('role', 'status');
    
    form.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

function showFormError(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    form.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Character counter for textareas
function addCharacterCounter(textarea) {
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = `0 / ${textarea.getAttribute('maxlength') || '∞'} अक्षर`;
    
    textarea.parentNode.appendChild(counter);
    
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        const maxLength = this.getAttribute('maxlength');
        
        counter.textContent = `${length} / ${maxLength || '∞'} अक्षर`;
        
        if (maxLength && length > maxLength * 0.9) {
            counter.classList.add('warning');
        } else {
            counter.classList.remove('warning');
        }
    });
}

// Auto-save functionality
function autoSave(input) {
    const key = `autosave_${input.id || input.name}`;
    const value = input.value;
    
    if (value) {
        localStorage.setItem(key, value);
    } else {
        localStorage.removeItem(key);
    }
}

// Restore auto-saved data
function restoreAutoSavedData() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const key = `autosave_${input.id || input.name}`;
        const savedValue = localStorage.getItem(key);
        
        if (savedValue && !input.value) {
            input.value = savedValue;
        }
    });
}

// Save all forms
function saveAllForms() {
    const forms = document.querySelectorAll('form, .question-form');
    let savedCount = 0;
    
    forms.forEach(form => {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        if (Object.keys(data).length > 0) {
            localStorage.setItem(`form_${form.id || 'default'}`, JSON.stringify(data));
            savedCount++;
        }
    });
    
    showNotification(`सभी फ़ॉर्म सहेजे गए! (${savedCount} फ़ॉर्म)`, 'success');
}

// Load saved form data
function loadSavedFormData() {
    const forms = document.querySelectorAll('form, .question-form');
    
    forms.forEach(form => {
        const savedData = localStorage.getItem(`form_${form.id || 'default'}`);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        input.value = data[key];
                    }
                });
            } catch (e) {
                console.error('Error loading saved form data:', e);
            }
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize form enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    formEnhancements.init();
    restoreAutoSavedData();
    loadSavedFormData();
});

// Make functions globally available
window.validateForm = validateForm;
window.validateInput = validateInput;
window.saveAllForms = saveAllForms;
window.loadSavedFormData = loadSavedFormData;
window.showNotification = showNotification;
