// Basic focus/auto-expand behavior replicated
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('.question-textarea');
    textareas.forEach(textarea => {
        textarea.classList.add('auto-expand');
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(textarea.scrollHeight, parseInt(getComputedStyle(textarea).minHeight || '120')) + 'px';
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.max(this.scrollHeight, parseInt(getComputedStyle(this).minHeight || '120')) + 'px';
        });
    });
});


