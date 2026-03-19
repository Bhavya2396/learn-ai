/**
 * Language exercises for Chapter 10 Interactive Module
 */

// Vocabulary exercise answers
const vocabularyAnswers = {
    vocab1: "क्षेत्र",
    vocab2: "धीरे-धीरे, डगमगाते हुए",
    vocab3: "याद",
    vocab4: "आकाश",
    vocab5: "देश"
};

// Contraction exercise answers
const contractionAnswers = {
    contraction1: "नाली, जल निकासी का मार्ग",
    contraction2: "कचरा, रद्दी",
    contraction3: "मोहल्ला, बस्ती",
    contraction4: "चोट, घाव",
    contraction5: "एक सुगंधित पौधा",
    contraction6: "एक सुगंधित घास"
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdowns();
});

// Initialize dropdowns to ensure they work properly
function initializeDropdowns() {
    // Get all select elements in vocabulary and contraction exercises
    const vocabSelects = document.querySelectorAll('#thinking-language select[id^="vocab"]');
    const contractionSelects = document.querySelectorAll('#thinking-language select[id^="contraction"]');
    
    // Add event listeners to all selects
    [...vocabSelects, ...contractionSelects].forEach(select => {
        // Ensure the select is properly initialized
        select.style.display = 'block';
        select.style.visibility = 'visible';
        
        // Add change event listener for debugging
        select.addEventListener('change', function() {
            console.log(`Selected value for ${this.id}: ${this.value}`);
        });
        
        // Add click event listener to ensure dropdown opens
        select.addEventListener('click', function() {
            console.log(`Clicked on ${this.id}`);
        });
    });
    
    console.log(`Initialized ${vocabSelects.length} vocabulary dropdowns and ${contractionSelects.length} contraction dropdowns`);
}

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
    const feedbackEl = document.getElementById('vocabFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        // Update progress if all correct
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
}

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
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
}