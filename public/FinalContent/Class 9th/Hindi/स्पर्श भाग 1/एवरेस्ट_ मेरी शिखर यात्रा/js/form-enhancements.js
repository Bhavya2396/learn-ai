/**
 * Form enhancements for Everest interactive lesson
 */

// Enhanced form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form enhancements
    initializeFormEnhancements();
});

function initializeFormEnhancements() {
    // Add loading states to buttons
    enhanceButtons();
    
    // Add input validation
    enhanceInputs();
    
    // Add accessibility improvements
    enhanceAccessibility();
}

// Enhance button interactions
function enhanceButtons() {
    document.querySelectorAll('.interactive-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.textContent;
                this.textContent = 'प्रक्रिया जारी...';
                
                // Remove loading state after 1 second
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 1000);
            }
        });
    });
}

// Enhance input fields
function enhanceInputs() {
    // Add focus/blur effects to textareas
    document.querySelectorAll('.question-textarea').forEach(textarea => {
        textarea.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        textarea.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
        
        // Add character count for longer texts
        if (textarea.hasAttribute('rows') && parseInt(textarea.getAttribute('rows')) >= 4) {
            addCharacterCount(textarea);
        }
    });
    
    // Enhanced radio button interactions
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Add visual feedback
            const parent = this.closest('.reflection-option, .choice-option, .role-play-option');
            if (parent) {
                // Remove previous selections
                const siblings = parent.parentNode.querySelectorAll('.reflection-option, .choice-option, .role-play-option');
                siblings.forEach(sibling => sibling.classList.remove('selected'));
                
                // Add selection to current
                parent.classList.add('selected');
            }
        });
    });
}

// Add character count to textarea
function addCharacterCount(textarea) {
    const countDiv = document.createElement('div');
    countDiv.className = 'character-count';
    countDiv.textContent = '0 अक्षर';
    
    textarea.parentNode.appendChild(countDiv);
    
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        countDiv.textContent = `${count} अक्षर`;
        
        // Color coding based on length
        if (count < 50) {
            countDiv.style.color = '#f44336';
        } else if (count < 100) {
            countDiv.style.color = '#ff9800';
        } else {
            countDiv.style.color = '#4caf50';
        }
    });
}

// Enhance accessibility
function enhanceAccessibility() {
    // Add keyboard navigation for custom radio buttons
    document.querySelectorAll('.reflection-option, .choice-option, .role-play-option').forEach(option => {
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                }
            }
        });
        
        // Make focusable
        option.setAttribute('tabindex', '0');
    });
    
    // Improve screen reader support
    document.querySelectorAll('.question-text').forEach(question => {
        question.setAttribute('aria-level', '3');
        question.setAttribute('role', 'heading');
    });
}

// Auto-save functionality for longer texts
function initializeAutoSave() {
    document.querySelectorAll('.question-textarea').forEach(textarea => {
        const saveKey = `everest-answer-${textarea.id}`;
        
        // Load saved content
        const saved = localStorage.getItem(saveKey);
        if (saved) {
            textarea.value = saved;
        }
        
        // Save on input with debounce
        let saveTimeout;
        textarea.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                localStorage.setItem(saveKey, this.value);
            }, 2000);
        });
    });
}

// Form validation
function validateForm(formElement) {
    let isValid = true;
    const errors = [];
    
    // Check required fields
    formElement.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            errors.push(`${field.getAttribute('aria-label') || 'Field'} is required`);
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    // Check minimum length for textareas
    formElement.querySelectorAll('textarea[data-min-length]').forEach(textarea => {
        const minLength = parseInt(textarea.getAttribute('data-min-length'));
        if (textarea.value.trim().length < minLength) {
            isValid = false;
            errors.push(`कम से कम ${minLength} अक्षर लिखें`);
            textarea.classList.add('error');
        } else {
            textarea.classList.remove('error');
        }
    });
    
    return { isValid, errors };
}

// Export functions for use in other modules
window.formEnhancements = {
    validateForm,
    initializeAutoSave,
    enhanceButtons,
    enhanceInputs,
    enhanceAccessibility
};
