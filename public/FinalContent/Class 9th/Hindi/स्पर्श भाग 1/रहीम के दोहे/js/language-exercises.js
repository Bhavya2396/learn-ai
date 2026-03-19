/**
 * Language exercises for Kabir's Sakhi Interactive Module
 */

// Contraction exercise answers
const contractionAnswers = {
    contraction1: "बोली",
    contraction2: "अहंकार",
    contraction3: "नाभि",
    contraction4: "में",
    contraction5: "नहीं",
    contraction6: "आँगन",
    contraction7: "अक्षर",
    contraction8: "प्रिय"
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // No additional initialization needed
});

// Check contraction answers
function checkContractions() {
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
            if (typeof updateProgress === 'function') {
                score += 10;
                document.getElementById('totalScore').textContent = score;
                
                if (!modulesCompleted.includes('thinking-language')) {
                    modulesCompleted.push('thinking-language');
                    updateProgress();
                    showAchievement('भाषा अध्ययन पूर्ण!');
                }
            }
        }
    }
}
