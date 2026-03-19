/**
 * Form enhancements for Manushyata (मनुष्यता) lesson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Track keyboard navigation for accessibility
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    window.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });
    
    // Add character counter to textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        // Add character counter display
        const charCounter = document.createElement('div');
        charCounter.className = 'char-count';
        charCounter.textContent = '0 अक्षर';
        
        // Wrap textarea in container if it's not already wrapped
        if (!textarea.parentElement.classList.contains('with-char-count')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'with-char-count';
            textarea.parentNode.insertBefore(wrapper, textarea);
            wrapper.appendChild(textarea);
            wrapper.appendChild(charCounter);
        } else {
            textarea.parentElement.appendChild(charCounter);
        }
        
        // Update counter on input
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            charCounter.textContent = count + ' अक्षर';
            
            // Add warning class if approaching maximum (if maxlength is set)
            if (this.getAttribute('maxlength')) {
                const max = parseInt(this.getAttribute('maxlength'));
                if (count > max * 0.8) {
                    charCounter.classList.add('char-count-warning');
                } else {
                    charCounter.classList.remove('char-count-warning');
                }
            }
            
            // For required fields with minimum length expectations
            if (count > 0) {
                this.classList.add('has-value');
                
                if (this.id === 'reflectionText' && count < 20) {
                    this.classList.add('is-invalid');
                } else if (this.id === 'writingPad' && count < 100) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            } else {
                this.classList.remove('has-value', 'is-valid', 'is-invalid');
            }
        });
    });
    
    // Enhanced select validation
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('has-value');
                this.classList.add('changed');
                
                // Remove the changed class after animation completes
                setTimeout(() => {
                    this.classList.remove('changed');
                }, 1000);
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Add floating label behavior
    document.querySelectorAll('.float-label input, .float-label textarea, .float-label select').forEach(input => {
        // Initial state check
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Update on input
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Add conditional field behavior
    document.querySelectorAll('[data-show-if]').forEach(field => {
        const targetId = field.dataset.showIf.split(':')[0];
        const targetValue = field.dataset.showIf.split(':')[1];
        
        const targetField = document.getElementById(targetId);
        if (targetField) {
            // Initial check
            toggleConditionalField(targetField, targetValue, field);
            
            // Update on change
            targetField.addEventListener('change', function() {
                toggleConditionalField(this, targetValue, field);
            });
            
            targetField.addEventListener('input', function() {
                toggleConditionalField(this, targetValue, field);
            });
        }
    });
});

// Toggle conditional fields
function toggleConditionalField(targetField, targetValue, conditionalField) {
    if ((targetField.type === 'checkbox' && targetField.checked === (targetValue === 'true')) ||
        (targetField.type !== 'checkbox' && targetField.value === targetValue)) {
        conditionalField.classList.add('is-visible');
    } else {
        conditionalField.classList.remove('is-visible');
    }
}
