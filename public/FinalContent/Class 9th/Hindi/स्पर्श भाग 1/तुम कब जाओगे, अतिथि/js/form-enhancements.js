/**
 * Form enhancements for Chapter 3 module
 * Enhanced form interactions and accessibility
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeFormEnhancements();
});

// Initialize all form enhancements
function initializeFormEnhancements() {
    enhanceRadioButtons();
    enhanceTextareas();
    enhanceSelectDropdowns();
    addFormValidation();
    addAccessibilityFeatures();
    addFormAnimations();
}

// Enhance radio button interactions
function enhanceRadioButtons() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        // Add custom styling and interactions
        radio.addEventListener('change', function() {
            handleRadioChange(this);
        });
        
        // Add keyboard navigation
        radio.addEventListener('keydown', function(e) {
            handleRadioKeyboard(e, this);
        });
        
        // Add focus indicators
        radio.addEventListener('focus', function() {
            this.closest('.option, .choice-option, .reflection-option')?.classList.add('focused');
        });
        
        radio.addEventListener('blur', function() {
            this.closest('.option, .choice-option, .reflection-option')?.classList.remove('focused');
        });
    });
}

// Handle radio button changes
function handleRadioChange(radio) {
    const container = radio.closest('.question-item, .reflection-exercise, .discussion-item');
    if (!container) return;
    
    // Remove previous selections
    container.querySelectorAll('.option, .choice-option, .reflection-option').forEach(opt => {
        opt.classList.remove('selected', 'highlighted');
    });
    
    // Highlight current selection
    const currentOption = radio.closest('.option, .choice-option, .reflection-option');
    if (currentOption) {
        currentOption.classList.add('selected', 'highlighted');
        
        // Add selection animation
        currentOption.style.transform = 'scale(1.02)';
        setTimeout(() => {
            currentOption.style.transform = 'scale(1)';
        }, 200);
        
        // Add sound feedback if enabled
        playSelectionSound();
    }
    
    // Update progress indicators
    updateFormProgress(container);
}

// Handle keyboard navigation for radio buttons
function handleRadioKeyboard(event, radio) {
    const container = radio.closest('.option, .choice-option, .reflection-option').parentNode;
    const allRadios = Array.from(container.querySelectorAll('input[type="radio"]'));
    const currentIndex = allRadios.indexOf(radio);
    
    switch(event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % allRadios.length;
            allRadios[nextIndex].focus();
            allRadios[nextIndex].checked = true;
            handleRadioChange(allRadios[nextIndex]);
            break;
            
        case 'ArrowUp':
        case 'ArrowLeft':
            event.preventDefault();
            const prevIndex = currentIndex === 0 ? allRadios.length - 1 : currentIndex - 1;
            allRadios[prevIndex].focus();
            allRadios[prevIndex].checked = true;
            handleRadioChange(allRadios[prevIndex]);
            break;
    }
}

// Enhance textarea interactions
function enhanceTextareas() {
    document.querySelectorAll('textarea').forEach(textarea => {
        // Add auto-resize functionality
        addAutoResize(textarea);
        
        // Add character count
        addCharacterCount(textarea);
        
        // Add writing assistance
        addWritingAssistance(textarea);
        
        // Add save draft functionality
        addDraftSaving(textarea);
        
        // Enhanced focus/blur effects
        textarea.addEventListener('focus', function() {
            this.closest('.writing-exercise, .reflection-exercise')?.classList.add('focused');
            showWritingToolbar(this);
        });
        
        textarea.addEventListener('blur', function() {
            this.closest('.writing-exercise, .reflection-exercise')?.classList.remove('focused');
            hideWritingToolbar(this);
        });
    });
}

// Add auto-resize to textareas
function addAutoResize(textarea) {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Initial resize
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// Add character count display
function addCharacterCount(textarea) {
    const countDisplay = document.createElement('div');
    countDisplay.className = 'character-count';
    countDisplay.innerHTML = '<span class="current">0</span> / <span class="recommended">200</span> अक्षर';
    
    textarea.parentNode.insertBefore(countDisplay, textarea.nextSibling);
    
    textarea.addEventListener('input', function() {
        const current = this.value.length;
        const currentSpan = countDisplay.querySelector('.current');
        currentSpan.textContent = current;
        
        // Color coding
        if (current < 50) {
            currentSpan.style.color = '#f44336';
        } else if (current < 150) {
            currentSpan.style.color = '#ff9800';
        } else {
            currentSpan.style.color = '#4caf50';
        }
    });
}

// Add writing assistance
function addWritingAssistance(textarea) {
    let assistanceTimer;
    
    textarea.addEventListener('input', function() {
        clearTimeout(assistanceTimer);
        assistanceTimer = setTimeout(() => {
            provideWritingAssistance(this);
        }, 2000);
    });
}

// Provide writing assistance suggestions
function provideWritingAssistance(textarea) {
    const text = textarea.value;
    if (text.length < 10) return;
    
    const suggestions = [];
    
    // Check for repetitive words
    const words = text.split(/\s+/);
    const wordCount = {};
    words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
    });
    
    const repetitiveWords = Object.keys(wordCount).filter(word => 
        wordCount[word] > 3 && word.length > 3
    );
    
    if (repetitiveWords.length > 0) {
        suggestions.push(`शब्द "${repetitiveWords[0]}" की अधिक पुनरावृत्ति - पर्यायवाची शब्दों का प्रयोग करें`);
    }
    
    // Check for sentence variety
    const sentences = text.split(/[.!?।]/);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;
    
    if (avgSentenceLength > 100) {
        suggestions.push('छोटे वाक्यों का प्रयोग करें');
    }
    
    if (suggestions.length > 0) {
        showWritingSuggestions(textarea, suggestions);
    }
}

// Show writing suggestions
function showWritingSuggestions(textarea, suggestions) {
    // Remove existing suggestions
    const existingSuggestions = textarea.parentNode.querySelector('.writing-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
    
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'writing-suggestions';
    suggestionsDiv.innerHTML = `
        <div class="suggestions-header">💡 लेखन सुझाव:</div>
        <ul>
            ${suggestions.map(s => `<li>${s}</li>`).join('')}
        </ul>
        <button class="close-suggestions" onclick="this.parentNode.remove()">×</button>
    `;
    
    textarea.parentNode.insertBefore(suggestionsDiv, textarea.nextSibling);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (suggestionsDiv.parentNode) {
            suggestionsDiv.remove();
        }
    }, 10000);
}

// Add draft saving functionality
function addDraftSaving(textarea) {
    const draftKey = `draft_${textarea.id || 'textarea_' + Date.now()}`;
    
    // Load saved draft
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft && textarea.value.trim() === '') {
        textarea.value = savedDraft;
        showDraftNotification(textarea, 'पुराना ड्राफ्ट लोड किया गया');
    }
    
    // Save draft on input
    let saveTimer;
    textarea.addEventListener('input', function() {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
            if (this.value.trim().length > 10) {
                localStorage.setItem(draftKey, this.value);
                showDraftNotification(this, 'ड्राफ्ट सहेजा गया');
            }
        }, 3000);
    });
    
    // Clear draft on successful submission
    textarea.closest('form, .exercise-card')?.addEventListener('submit', function() {
        localStorage.removeItem(draftKey);
    });
}

// Show draft notification
function showDraftNotification(textarea, message) {
    const notification = document.createElement('div');
    notification.className = 'draft-notification';
    notification.textContent = message;
    
    textarea.parentNode.insertBefore(notification, textarea.nextSibling);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 2000);
}

// Show writing toolbar
function showWritingToolbar(textarea) {
    // Create toolbar if it doesn't exist
    let toolbar = textarea.parentNode.querySelector('.writing-toolbar');
    if (!toolbar) {
        toolbar = document.createElement('div');
        toolbar.className = 'writing-toolbar';
        toolbar.innerHTML = `
            <button type="button" onclick="insertText(this, '**', '**')" title="Bold">B</button>
            <button type="button" onclick="insertText(this, '*', '*')" title="Italic">I</button>
            <button type="button" onclick="insertText(this, '"', '"')" title="Quotes">"</button>
            <button type="button" onclick="clearText(this)" title="Clear">Clear</button>
        `;
        textarea.parentNode.insertBefore(toolbar, textarea);
    }
    
    toolbar.style.display = 'flex';
}

// Hide writing toolbar
function hideWritingToolbar(textarea) {
    const toolbar = textarea.parentNode.querySelector('.writing-toolbar');
    if (toolbar) {
        setTimeout(() => {
            toolbar.style.display = 'none';
        }, 1000);
    }
}

// Insert text in textarea
window.insertText = function(button, before, after) {
    const textarea = button.parentNode.nextElementSibling;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    const newText = before + selectedText + after;
    textarea.value = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    
    // Set cursor position
    const newStart = start + before.length;
    const newEnd = newStart + selectedText.length;
    textarea.setSelectionRange(newStart, newEnd);
    textarea.focus();
    
    // Trigger input event
    textarea.dispatchEvent(new Event('input'));
};

// Clear textarea
window.clearText = function(button) {
    const textarea = button.parentNode.nextElementSibling;
    if (confirm('क्या आप वाकई सारा टेक्स्ट हटाना चाहते हैं?')) {
        textarea.value = '';
        textarea.focus();
        textarea.dispatchEvent(new Event('input'));
    }
};

// Enhance select dropdowns
function enhanceSelectDropdowns() {
    document.querySelectorAll('select').forEach(select => {
        // Add change animations
        select.addEventListener('change', function() {
            this.classList.add('changed');
            setTimeout(() => {
                this.classList.remove('changed');
            }, 500);
            
            // Play selection sound
            playSelectionSound();
        });
        
        // Add keyboard navigation hints
        select.addEventListener('focus', function() {
            showSelectHint(this);
        });
        
        select.addEventListener('blur', function() {
            hideSelectHint(this);
        });
    });
}

// Show select navigation hint
function showSelectHint(select) {
    const hint = document.createElement('div');
    hint.className = 'select-hint';
    hint.textContent = 'तीर के बटन से विकल्प चुनें';
    
    select.parentNode.insertBefore(hint, select.nextSibling);
    
    setTimeout(() => {
        if (hint.parentNode) {
            hint.remove();
        }
    }, 3000);
}

// Hide select hint
function hideSelectHint(select) {
    const hint = select.parentNode.querySelector('.select-hint');
    if (hint) {
        hint.remove();
    }
}

// Add form validation
function addFormValidation() {
    document.querySelectorAll('form, .exercise-card').forEach(container => {
        // Add real-time validation
        const inputs = container.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'यह फील्ड आवश्यक है';
    }
    
    // Textarea minimum length
    if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
        isValid = false;
        message = 'कम से कम 10 अक्षर लिखें';
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'वैध ईमेल पता डालें';
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add accessibility features
function addAccessibilityFeatures() {
    // Add ARIA labels to unlabeled inputs
    document.querySelectorAll('input, textarea, select').forEach(input => {
        if (!input.getAttribute('aria-label') && !input.closest('label')) {
            const placeholder = input.placeholder || input.name || 'Input field';
            input.setAttribute('aria-label', placeholder);
        }
    });
    
    // Add keyboard navigation for custom elements
    document.querySelectorAll('.option, .choice-option').forEach(option => {
        if (!option.hasAttribute('tabindex')) {
            option.setAttribute('tabindex', '0');
        }
        
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    handleRadioChange(radio);
                }
            }
        });
    });
    
    // Add screen reader announcements
    addScreenReaderAnnouncements();
}

// Add screen reader announcements
function addScreenReaderAnnouncements() {
    const announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    
    document.body.appendChild(announcer);
    
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Add form animations
function addFormAnimations() {
    // Add input focus animations
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // Add button click animations
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    });
}

// Update form progress
function updateFormProgress(container) {
    const inputs = container.querySelectorAll('input[type="radio"]:checked, textarea');
    const totalInputs = container.querySelectorAll('input[type="radio"], textarea').length;
    
    let filledInputs = 0;
    
    // Count radio buttons
    const radioGroups = {};
    container.querySelectorAll('input[type="radio"]').forEach(radio => {
        if (!radioGroups[radio.name]) {
            radioGroups[radio.name] = false;
        }
        if (radio.checked) {
            radioGroups[radio.name] = true;
        }
    });
    
    filledInputs += Object.values(radioGroups).filter(Boolean).length;
    
    // Count textareas
    container.querySelectorAll('textarea').forEach(textarea => {
        if (textarea.value.trim().length > 0) {
            filledInputs++;
        }
    });
    
    const progress = Math.round((filledInputs / Object.keys(radioGroups).length + container.querySelectorAll('textarea').length) * 100);
    
    // Update progress indicator if exists
    const progressIndicator = container.querySelector('.form-progress');
    if (progressIndicator) {
        progressIndicator.textContent = `${progress}% पूर्ण`;
        progressIndicator.style.width = progress + '%';
    }
}

// Play selection sound (if audio is enabled)
function playSelectionSound() {
    if (typeof audioEnabled !== 'undefined' && audioEnabled) {
        // Create a subtle click sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Additional CSS for form enhancements
const formEnhancementStyles = `
<style>
.focused {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
}

.selected {
    background-color: rgba(139, 69, 19, 0.1) !important;
    border-color: var(--primary-color) !important;
}

.highlighted {
    animation: highlightPulse 0.5s ease;
}

@keyframes highlightPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}

.character-count {
    text-align: right;
    font-size: 0.85rem;
    color: #666;
    margin-top: 5px;
}

.writing-suggestions {
    margin: 10px 0;
    padding: 12px;
    background: #e3f2fd;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
    position: relative;
    animation: slideIn 0.3s ease;
}

.suggestions-header {
    font-weight: 600;
    margin-bottom: 8px;
    color: #1565c0;
}

.close-suggestions {
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #666;
}

.draft-notification {
    position: absolute;
    top: -30px;
    right: 0;
    background: #4caf50;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    animation: fadeIn 0.3s ease;
}

.draft-notification.fade-out {
    animation: fadeOut 0.5s ease forwards;
}

.writing-toolbar {
    display: none;
    gap: 5px;
    margin-bottom: 8px;
    padding: 8px;
    background: #f5f5f5;
    border-radius: 4px;
}

.writing-toolbar button {
    padding: 4px 8px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s ease;
}

.writing-toolbar button:hover {
    background: #e0e0e0;
    transform: translateY(-1px);
}

.select-hint {
    font-size: 0.8rem;
    color: #666;
    font-style: italic;
    margin-top: 5px;
    animation: fadeIn 0.3s ease;
}

.field-error {
    color: #f44336;
    font-size: 0.85rem;
    margin-top: 5px;
    animation: shake 0.5s ease;
}

.error {
    border-color: #f44336 !important;
    background-color: rgba(244, 67, 54, 0.05) !important;
}

.changed {
    animation: changeHighlight 0.5s ease;
}

@keyframes changeHighlight {
    0%, 100% { background-color: transparent; }
    50% { background-color: rgba(76, 175, 80, 0.1); }
}

.clicked {
    transform: scale(0.95);
    transition: transform 0.1s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

@keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .selected {
        border-width: 3px !important;
    }
    
    .focused {
        outline: 3px solid #000 !important;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', formEnhancementStyles);
