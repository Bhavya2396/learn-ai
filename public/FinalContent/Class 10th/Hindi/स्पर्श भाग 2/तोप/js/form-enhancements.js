/**
 * Enhanced form handlers for MCQ questions and interactions
 */

// Initialize event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize MCQ functions
    initReflectionMCQ();
    initContractionsMCQ();
    initListeningMCQ();
    initWritingMCQ();
});

// Function to save reflection dialog
function saveReflection() {
    // Get the selected values
    const reflection1 = document.getElementById('reflection-mcq1').value;
    const reflection2 = document.getElementById('reflection-mcq2').value;
    const reflection3 = document.getElementById('reflection-mcq3').value;
    
    // Check if all selections are made
    if (reflection1 && reflection2 && reflection3) {
        // Display success feedback
        const feedbackEl = document.getElementById('reflectionFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = 'आपका संवाद सफलतापूर्वक सहेजा गया!';
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress
            if (typeof updateProgress === 'function') {
                updateProgress('prereading', 15);
            }
        }
    } else {
        // Display error if not all selections are made
        const feedbackEl = document.getElementById('reflectionFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = 'कृपया सभी विकल्पों का चयन करें।';
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Function to initialize reflection functionality
function initReflectionMCQ() {
    window.saveReflection = saveReflection;
}

// Function to check contraction MCQ answers
function checkContractions() {
    // Define correct answers for contraction MCQs
    const correctAnswers = {
        'contraction1': 'प्रवेश द्वार पर',
        'contraction2': 'रखी गई',
        'contraction3': 'देखभाल',
        'contraction4': 'पूर्व पीढ़ियों से प्राप्त वस्तुएँ',
        'contraction5': 'वीर',
        'contraction6': 'चिथड़े-चिथड़े करना',
        'contraction7': 'मुक्त / खाली'
    };
    processAnswers(correctAnswers, 'contractionFeedback', 'thinking-language', 10);
}

// Function to initialize contractions MCQ functionality
function initContractionsMCQ() {
    window.checkContractions = checkContractions;
}

// Function to check listening MCQ answers
function checkListeningMCQ() {
    // Define correct answers for listening MCQs
    const correctAnswers = {
        'listening-mcq1': 'option1', // अंग्रेजों द्वारा प्रयुक्त एक प्रमुख हथियार
        'listening-mcq2': 'option1', // हर शक्ति का एक दिन अंत होता है
        'listening-mcq3': 'option1'  // ऐतिहासिक धरोहर के रूप में
    };
    processAnswers(correctAnswers, 'listeningMCQFeedback', 'activities', 10);
}

// Function to initialize listening MCQ functionality
function initListeningMCQ() {
    window.checkListeningMCQ = checkListeningMCQ;
}

// Function to check writing MCQ answers
function checkWritingMCQ() {
    // Define correct answers for writing MCQs
    const correctAnswers = {
        'writing-mcq1': 'option1', // ये हमें इतिहास की गलतियों से सीखने का अवसर देते हैं
        'writing-mcq2': 'option1', // वे हमें अपने अतीत से जोड़े रखते हैं
        'writing-mcq3': 'option1', // आर्थिक और सांस्कृतिक आत्मनिर्भरता का महत्व
        'writing-mcq4': 'option1'  // भविष्य में समान गलतियों से बचना
    };
    processAnswers(correctAnswers, 'writingMCQFeedback', 'activities', 15);
}

// Function to initialize writing MCQ functionality
function initWritingMCQ() {
    window.checkWritingMCQ = checkWritingMCQ;
}

// Helper function to process answers and provide feedback
function processAnswers(correctAnswers, feedbackElementId, progressModule, progressPoints) {
    let correctCount = 0;
    let totalCount = Object.keys(correctAnswers).length;

    // Check each MCQ answer
    Object.keys(correctAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const isCorrect = select.value === correctAnswers[id];
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            if (isCorrect) correctCount++;
        }
    });

    // Display feedback
    const feedbackEl = document.getElementById(feedbackElementId);
    if (feedbackEl) {
        feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        // Update progress if all correct
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress(progressModule, progressPoints);
        }
    }
}