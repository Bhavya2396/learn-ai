/**
 * Form enhancements for Bade Bhai Sahab module
 */

// Initialize form enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all textareas for auto-resize
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', autoResizeTextarea);
        
        // Initial resize
        autoResizeTextarea.call(textarea);
    });
    
    // Add focus and blur effects to form elements
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
        element.addEventListener('focus', handleElementFocus);
        element.addEventListener('blur', handleElementBlur);
    });
    
    // Initialize tooltips for form elements
    initializeTooltips();
});

// Auto-resize textareas based on content
function autoResizeTextarea() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}

// Handle focus event for form elements
function handleElementFocus() {
    // Add focus class to parent container if exists
    const container = this.closest('.form-group');
    if (container) {
        container.classList.add('focused');
    }
    
    // Add focused class to element
    this.classList.add('element-focused');
}

// Handle blur event for form elements
function handleElementBlur() {
    // Remove focus class from parent container if exists
    const container = this.closest('.form-group');
    if (container) {
        container.classList.remove('focused');
        
        // Add filled class if the element has a value
        if (this.value) {
            container.classList.add('filled');
        } else {
            container.classList.remove('filled');
        }
    }
    
    // Remove focused class from element
    this.classList.remove('element-focused');
}

// Initialize tooltips for form elements
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'form-tooltip';
        tooltip.textContent = tooltipText;
        
        // Add tooltip to element
        element.appendChild(tooltip);
        
        // Show tooltip on hover or focus
        element.addEventListener('mouseenter', () => {
            tooltip.classList.add('show-tooltip');
        });
        
        element.addEventListener('focus', () => {
            tooltip.classList.add('show-tooltip');
        });
        
        // Hide tooltip on mouse leave or blur
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show-tooltip');
        });
        
        element.addEventListener('blur', () => {
            tooltip.classList.remove('show-tooltip');
        });
    });
}
