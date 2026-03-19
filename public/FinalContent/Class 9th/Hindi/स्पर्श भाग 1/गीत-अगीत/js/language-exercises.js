/**
 * Language exercises for Geet-Ageet Interactive Module
 */

// Vocabulary exercise answers are defined in questions.js

// Contraction exercise answers
const contractionAnswers = {
    contraction1: "तेजी से",
    contraction2: "किनारों से",
    contraction3: "ईश्वर",
    contraction4: "झरना",
    contraction5: "गुलाब",
    contraction6: "तोता",
    contraction7: "घोंसला",
    contraction8: "विचार करती है"
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Language exercises DOM loaded');
    // Add event listeners to vocabulary and contraction check buttons
    const vocabCheckButton = document.querySelector('.vocabulary-exercise .interactive-btn');
    const contractionCheckButton = document.querySelector('.contraction-exercise .interactive-btn');
    
    console.log('Vocab button found:', vocabCheckButton);
    console.log('Contraction button found:', contractionCheckButton);
    
    if (vocabCheckButton) {
        vocabCheckButton.addEventListener('click', function() {
            checkVocabulary();
        });
    }
    
    if (contractionCheckButton) {
        contractionCheckButton.addEventListener('click', function() {
            checkContractions();
        });
    }
    
    // Test if function is accessible
    console.log('checkContractions function available:', typeof window.checkContractions);
});

// Check vocabulary answers
window.checkVocabulary = function() {
    let correctCount = 0;
    let totalCount = 0;
    
    // Check each vocabulary select
    Object.keys(vocabularyAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            totalCount++;
            const isCorrect = select.value === vocabularyAnswers[id];
            
            // Apply visual feedback
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            select.style.backgroundColor = isCorrect ? '#e8f5e9' : '#ffebee';
            
            // Add tick or cross mark after the select
            const feedbackIcon = document.getElementById(`${id}-feedback`);
            if (!feedbackIcon) {
                const icon = document.createElement('span');
                icon.id = `${id}-feedback`;
                icon.className = 'answer-feedback';
                icon.innerHTML = isCorrect ? '✓' : '✗';
                icon.style.color = isCorrect ? '#4caf50' : '#f44336';
                icon.style.marginLeft = '10px';
                icon.style.fontSize = '1.2rem';
                icon.style.fontWeight = 'bold';
                select.parentNode.insertBefore(icon, select.nextSibling);
            } else {
                feedbackIcon.innerHTML = isCorrect ? '✓' : '✗';
                feedbackIcon.style.color = isCorrect ? '#4caf50' : '#f44336';
            }
            
            if (isCorrect) correctCount++;
        }
    });
    
    // Show overall feedback
    const feedbackEl = document.getElementById('vocabFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        // Update progress if all correct
        if (correctCount === totalCount) {
            if (typeof updateProgress === 'function') {
                score += 10;
                document.getElementById('totalScore').textContent = score;
                
                if (!modulesCompleted.includes('thinking-language')) {
                    modulesCompleted.push('thinking-language');
                    updateProgress();
                    showAchievement('शब्दार्थ अध्ययन पूर्ण!');
                }
            }
        }
    }
}

// Check contraction answers
window.checkContractions = function() {
    console.log('checkContractions function called');
    let correctCount = 0;
    let totalCount = 0;
    
    // Check each contraction select
    Object.keys(contractionAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            totalCount++;
            const isCorrect = select.value === contractionAnswers[id];
            
            // Apply visual feedback
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            select.style.backgroundColor = isCorrect ? '#e8f5e9' : '#ffebee';
            
            // Add tick or cross mark after the select
            const feedbackIcon = document.getElementById(`${id}-feedback`);
            if (!feedbackIcon) {
                const icon = document.createElement('span');
                icon.id = `${id}-feedback`;
                icon.className = 'answer-feedback';
                icon.innerHTML = isCorrect ? '✓' : '✗';
                icon.style.color = isCorrect ? '#4caf50' : '#f44336';
                icon.style.marginLeft = '10px';
                icon.style.fontSize = '1.2rem';
                icon.style.fontWeight = 'bold';
                select.parentNode.insertBefore(icon, select.nextSibling);
            } else {
                feedbackIcon.innerHTML = isCorrect ? '✓' : '✗';
                feedbackIcon.style.color = isCorrect ? '#4caf50' : '#f44336';
            }
            
            if (isCorrect) correctCount++;
        }
    });
    
    // Show overall feedback
    const feedbackEl = document.getElementById('contractionFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        // Update progress if all correct
        if (correctCount === totalCount) {
            console.log('All answers correct, updating progress');
            if (typeof updateProgress === 'function') {
                console.log('updateProgress function available');
                if (typeof score !== 'undefined') {
                    score += 10;
                    document.getElementById('totalScore').textContent = score;
                } else {
                    console.log('score variable not available');
                }
                
                if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('thinking-language')) {
                    modulesCompleted.push('thinking-language');
                    updateProgress();
                    showAchievement('भाषा अध्ययन पूर्ण!');
                } else {
                    console.log('modulesCompleted variable not available');
                }
            } else {
                console.log('updateProgress function not available');
            }
        }
    }
}
