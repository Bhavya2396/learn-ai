/**
 * Interactive activities for Manushyata (मनुष्यता) lesson
 */

// Global tracking for activities completion
let activitiesCompleted = {
    speaking: false,
    writing: false
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide writing pad initially
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'none';
    }
    
    // Add auto-expand functionality to textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', autoResizeTextarea);
    });
    
    // Initialize activity buttons
    initializeActivities();
});

// Auto-resize textareas as content grows
function autoResizeTextarea() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}

// Initialize all activity buttons and interactions
function initializeActivities() {
    // Speaking MCQ activity
    const checkSpeakingBtn = document.querySelector('.speaking-mcq .interactive-btn');
    if (checkSpeakingBtn) {
        checkSpeakingBtn.addEventListener('click', checkSpeakingMCQs);
    }
    
    // Writing MCQ activity
    const checkWritingBtn = document.querySelector('.writing-mcq .interactive-btn');
    if (checkWritingBtn) {
        checkWritingBtn.addEventListener('click', checkWritingMCQs);
    }
}



// Check speaking MCQ answers
function checkSpeakingMCQs() {
    // Correct answers (0-based index)
    const correctAnswers = {
        'speaking-q1': 1, // क्योंकि मनुष्य मर्त्य है और मृत्यु अनिवार्य है
        'speaking-q2': 2, // ऐसे अच्छे कार्य करके मरो कि लोग आपको याद रखें
        'speaking-q3': 2  // जिसमें व्यक्ति अपने कार्यों से समाज पर अमिट छाप छोड़े
    };
    
    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let allAnswered = true;
    
    // Check each question
    Object.keys(correctAnswers).forEach(questionName => {
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        const questionNumber = questionName.split('-')[1];
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            const isCorrect = userAnswer === correctAnswers[questionName];
            
            // Get the parent question div
            const questionDiv = document.querySelector(`[name="${questionName}"]`).closest('.mcq-question');
            
            // Add feedback to the question
            let feedbackEl = questionDiv.querySelector('.question-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.className = 'question-feedback';
                questionDiv.appendChild(feedbackEl);
            }
            
            if (isCorrect) {
                feedbackEl.textContent = '✓ सही!';
                feedbackEl.className = 'question-feedback correct';
                correctCount++;
            } else {
                // Get the text of the correct option
                const correctOptionLabel = document.querySelector(`label[for="${questionName}-opt${correctAnswers[questionName]}"]`).textContent;
                feedbackEl.textContent = `✗ गलत। सही उत्तर है: ${correctOptionLabel}`;
                feedbackEl.className = 'question-feedback incorrect';
            }
        } else {
            // Question not answered
            allAnswered = false;
            
            // Get the parent question div
            const questionDiv = document.querySelector(`[name="${questionName}"]`).closest('.mcq-question');
            
            // Add warning feedback
            let feedbackEl = questionDiv.querySelector('.question-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.className = 'question-feedback';
                questionDiv.appendChild(feedbackEl);
            }
            
            feedbackEl.textContent = 'कृपया एक विकल्प चुनें।';
            feedbackEl.className = 'question-feedback warning';
        }
    });
    
    if (!allAnswered) {
        return;
    }
    
    // Show overall feedback
    const feedbackContainer = document.getElementById('speakingFeedback');
    feedbackContainer.textContent = `आपने ${totalQuestions} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    feedbackContainer.className = 'feedback-message show';
    feedbackContainer.classList.add(correctCount === totalQuestions ? 'success' : 'error');
    
    // Mark as completed only if at least 2 out of 3 are correct
    if (correctCount >= 2) {
        // Update completion status
        activitiesCompleted.speaking = true;
        updateActivityProgress();
        
        // Update progress
        if (typeof updateProgress === 'function') {
            score += 10;
            document.getElementById('totalScore').textContent = score;
        }
    
        // Speak feedback
    if (window.narrator) {
            window.narrator.speak("बहुत अच्छा! आपने वाचन गतिविधि पूरी कर ली है।");
        }
    }
}

// Check writing MCQ answers
function checkWritingMCQs() {
    // Correct answers (0-based index)
    const correctAnswers = {
        'writing-q1': 1, // परोपकार और त्याग ही सच्ची मनुष्यता का लक्षण है
        'writing-q2': 1, // इससे समाज में सद्भावना और एकता बढ़ती है
        'writing-q3': 0  // समाज में समरसता और सौहार्द बढ़ता है
    };
    
    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let allAnswered = true;
    
    // Check each question
    Object.keys(correctAnswers).forEach(questionName => {
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        const questionNumber = questionName.split('-')[1];
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            const isCorrect = userAnswer === correctAnswers[questionName];
            
            // Get the parent question div
            const questionDiv = document.querySelector(`[name="${questionName}"]`).closest('.mcq-question');
            
            // Add feedback to the question
            let feedbackEl = questionDiv.querySelector('.question-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.className = 'question-feedback';
                questionDiv.appendChild(feedbackEl);
            }
            
            if (isCorrect) {
                feedbackEl.textContent = '✓ सही!';
                feedbackEl.className = 'question-feedback correct';
                correctCount++;
            } else {
                // Get the text of the correct option
                const correctOptionLabel = document.querySelector(`label[for="${questionName}-opt${correctAnswers[questionName]}"]`).textContent;
                feedbackEl.textContent = `✗ गलत। सही उत्तर है: ${correctOptionLabel}`;
                feedbackEl.className = 'question-feedback incorrect';
            }
        } else {
            // Question not answered
            allAnswered = false;
            
            // Get the parent question div
            const questionDiv = document.querySelector(`[name="${questionName}"]`).closest('.mcq-question');
            
            // Add warning feedback
            let feedbackEl = questionDiv.querySelector('.question-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.className = 'question-feedback';
                questionDiv.appendChild(feedbackEl);
            }
            
            feedbackEl.textContent = 'कृपया एक विकल्प चुनें।';
            feedbackEl.className = 'question-feedback warning';
        }
    });
    
    if (!allAnswered) {
        return;
    }
    
    // Show overall feedback
    const feedbackContainer = document.getElementById('writingFeedback');
    feedbackContainer.textContent = `आपने ${totalQuestions} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    feedbackContainer.className = 'feedback-message show';
    feedbackContainer.classList.add(correctCount === totalQuestions ? 'success' : 'error');
    
    // Mark as completed only if at least 2 out of 3 are correct
    if (correctCount >= 2) {
    // Update completion status
    activitiesCompleted.writing = true;
    updateActivityProgress();
    
    // Update progress
    if (typeof updateProgress === 'function') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
    
    // Speak feedback
    if (window.narrator) {
            window.narrator.speak("उत्कृष्ट कार्य! आपने प्रश्नोत्तरी पूरी कर ली है।");
        }
    }
}


// Update activity progress
function updateActivityProgress() {
    // Count completed activities
    const completedCount = Object.values(activitiesCompleted).filter(Boolean).length;
    
    // If all activities are completed, complete the module
    if (completedCount >= 3 && typeof updateProgress === 'function') {
        // Only add to completed modules if it's not already there
        if (!modulesCompleted.includes('activities')) {
            modulesCompleted.push('activities');
            updateProgress();
            showAchievement('गतिविधियाँ पूर्ण!');
        }
    }
}

// Add CSS for custom elements
document.addEventListener('DOMContentLoaded', function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .speaking-prompt {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .speaking-prompt-content {
            background: white;
            border-radius: var(--card-radius);
            padding: 30px;
            max-width: 90%;
            width: 600px;
            box-shadow: var(--shadow-lg);
        }
        
        
        .fade-out {
            animation: fadeOut 0.3s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    
    document.head.appendChild(styleElement);
});

// Check vocabulary answers
function checkVocabulary() {
    // Correct answers
    const correctAnswers = {
        'vocab1': 'राष्ट्रकवि',
        'vocab2': 'मरणशील',
        'vocab3': 'पशु जैसा स्वभाव',
        'vocab4': 'सभी सही',
        'vocab5': 'सभी सही',
        'vocab6': 'दूसरों के लिए'
    };
    
    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let allAnswered = true;
    
    // Check each question
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedOption = document.getElementById(questionId);
        
        if (selectedOption && selectedOption.value) {
            const userAnswer = selectedOption.value;
            const isCorrect = userAnswer === correctAnswers[questionId];
            
            if (isCorrect) {
                correctCount++;
                selectedOption.style.borderColor = '#4CAF50';
                selectedOption.style.backgroundColor = '#E8F5E8';
            } else {
                selectedOption.style.borderColor = '#F44336';
                selectedOption.style.backgroundColor = '#FFEBEE';
            }
        } else {
            allAnswered = false;
            if (selectedOption) {
                selectedOption.style.borderColor = '#FF9800';
                selectedOption.style.backgroundColor = '#FFF3E0';
            }
        }
    });
    
    if (!allAnswered) {
        const feedbackContainer = document.getElementById('vocabFeedback');
        feedbackContainer.textContent = 'कृपया सभी प्रश्नों के उत्तर दें।';
        feedbackContainer.className = 'feedback-message show warning';
        return;
    }
    
    // Show overall feedback
    const feedbackContainer = document.getElementById('vocabFeedback');
    feedbackContainer.textContent = `आपने ${totalQuestions} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    feedbackContainer.className = 'feedback-message show';
    feedbackContainer.classList.add(correctCount === totalQuestions ? 'success' : 'error');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        score += 10;
        document.getElementById('totalScore').textContent = score;
    }
    
    // Speak feedback
    if (window.narrator) {
        window.narrator.speak("बहुत अच्छा! आपने शब्दार्थ अभ्यास पूरा किया है।");
    }
}

// Check contraction answers
function checkContractions() {
    // Correct answers
    const correctAnswers = {
        'contraction1': 'जैसे',
        'contraction2': 'कुछ',
        'contraction3': 'नहीं',
        'contraction4': 'कोई',
        'contraction5': 'धन्य',
        'contraction6': 'अक्षर',
        'contraction7': 'मधुर ध्वनि करती',
        'contraction8': 'भूख से व्याकुल'
    };
    
    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let allAnswered = true;
    
    // Check each question
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedOption = document.getElementById(questionId);
        
        if (selectedOption && selectedOption.value) {
            const userAnswer = selectedOption.value;
            const isCorrect = userAnswer === correctAnswers[questionId];
            
            if (isCorrect) {
                correctCount++;
                selectedOption.style.borderColor = '#4CAF50';
                selectedOption.style.backgroundColor = '#E8F5E8';
            } else {
                selectedOption.style.borderColor = '#F44336';
                selectedOption.style.backgroundColor = '#FFEBEE';
            }
        } else {
            allAnswered = false;
            if (selectedOption) {
                selectedOption.style.borderColor = '#FF9800';
                selectedOption.style.backgroundColor = '#FFF3E0';
            }
        }
    });
    
    if (!allAnswered) {
        const feedbackContainer = document.getElementById('contractionFeedback');
        feedbackContainer.textContent = 'कृपया सभी प्रश्नों के उत्तर दें।';
        feedbackContainer.className = 'feedback-message show warning';
        return;
    }
    
    // Show overall feedback
    const feedbackContainer = document.getElementById('contractionFeedback');
    feedbackContainer.textContent = `आपने ${totalQuestions} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    feedbackContainer.className = 'feedback-message show';
    feedbackContainer.classList.add(correctCount === totalQuestions ? 'success' : 'error');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        score += 10;
        document.getElementById('totalScore').textContent = score;
    }
    
    // Speak feedback
    if (window.narrator) {
        window.narrator.speak("उत्कृष्ट! आपने शब्दों के प्रचलित रूप का अभ्यास पूरा किया है।");
    }
}

// Form enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Auto-expand textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});
