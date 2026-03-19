/**
 * Language exercises for Agni Path Interactive Module
 */

// Vocabulary exercise answers for अग्नि पथ
const vocabularyAnswers = {
    vocabulary1: "कठिनाइयों से भरा हुआ मार्ग",
    vocabulary2: "पत्ता",
    vocabulary3: "कसम, सौगंध",
    vocabulary4: "आँसू",
    vocabulary5: "पसीना",
    vocabulary6: "खून, शोणित",
    vocabulary7: "सना हुआ"
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // No additional initialization needed
});

// Check vocabulary answers
function checkVocabulary() {
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
            
            if (isCorrect) correctCount++;
        }
    });
    
    // Show overall feedback
    const feedbackEl = document.getElementById('vocabularyFeedback');
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
                    showAchievement('शब्दार्थ पूर्ण!');
                }
            }
        }
    }
}
