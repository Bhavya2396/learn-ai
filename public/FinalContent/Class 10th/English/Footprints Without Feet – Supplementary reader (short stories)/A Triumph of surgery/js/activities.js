/**
 * Activities for A Triumph of Surgery interactive lesson
 */

// Save reflection function
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    
    if (reflectionText.length < 20) {
        const feedbackEl = document.getElementById('reflectionFeedback');
        feedbackEl.textContent = 'Please write a more detailed reflection (at least 20 characters).';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('reflectionFeedback');
    feedbackEl.textContent = 'Your reflection has been saved!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (typeof score !== 'undefined') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
    
    if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('Reflection Completed!');
        }
    }
    
    if (window.narrator) {
        window.narrator.speak("Thank you for sharing your reflection. Your thoughts have been saved.");
    }
}

// Check vocabulary exercise answers
function checkVocabulary() {
    const correctAnswers = {
        'vocab1': 'rheumy',
        'vocab2': 'listless',
        'vocab3': 'regime',
        'vocab4': 'distraught',
        'vocab5': 'convalescing'
    };
    
    let score = 0;
    let total = Object.keys(correctAnswers).length;
    
    // Check each answer
    for (const [id, correctAnswer] of Object.entries(correctAnswers)) {
        const select = document.getElementById(id);
        if (!select) continue;
        
        const userAnswer = select.value;
        
        if (userAnswer === correctAnswer) {
            select.style.borderColor = '#4caf50';
            select.style.backgroundColor = '#e8f5e9';
            score++;
        } else {
            select.style.borderColor = '#f44336';
            select.style.backgroundColor = '#ffebee';
        }
    }
    
    // Display feedback
    const feedbackEl = document.getElementById('vocabFeedback');
    if (feedbackEl) {
        if (score === total) {
            feedbackEl.textContent = `Perfect! You got all ${total} answers correct.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress
            if (typeof window.score !== 'undefined') {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('thinking-language')) {
                modulesCompleted.push('thinking-language');
                if (typeof updateProgress === 'function') {
                    updateProgress();
                }
                if (typeof showAchievement === 'function') {
                    showAchievement('Vocabulary Exercise Completed!');
                }
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Check comparisons exercise
function checkComparisons() {
    const correctAnswers = {
        0: ['healthier than', 'more energetic than', 'more active than', 'fitter than', 'stronger than'],
        1: ['smaller than', 'less luxurious than', 'less expensive than', 'more modest than', 'tinier than'],
        2: ['happier than', 'more content than', 'more joyful than', 'more satisfied than', 'more fulfilled than'],
        3: ['stricter than', 'more severe than', 'more firm than', 'more resolute than', 'more determined than'],
        4: ['more worried than', 'more anxious than', 'more concerned than', 'more distressed than', 'more upset than']
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    let score = 0;
    let total = inputs.length;
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // Check if the answer is among the possible correct answers
        // Only mark as correct if user has entered something
        const isCorrect = userAnswer !== '' && correctAnswers[index].some(answer => 
            userAnswer.includes(answer.toLowerCase()) || 
            answer.toLowerCase().includes(userAnswer)
        );
        
        if (isCorrect) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            score++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('comparisonsFeedback');
    if (feedbackEl) {
        if (score === total) {
            feedbackEl.textContent = `Perfect! You completed all ${total} comparison sentences correctly.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress if not already completed
            if (typeof window.score !== 'undefined') {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            // Mark module as completed if not already done
            if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('thinking-language')) {
                modulesCompleted.push('thinking-language');
                if (typeof updateProgress === 'function') {
                    updateProgress();
                }
                if (typeof showAchievement === 'function') {
                    showAchievement('Comparisons Exercise Completed!');
                }
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Show correct answers for comparisons
function showComparisonsAnswers() {
    const correctAnswers = {
        0: 'healthier than',
        1: 'smaller than',
        2: 'happier than',
        3: 'stricter than',
        4: 'more worried than'
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    
    // Display the correct answers in each input field
    inputs.forEach((input, index) => {
        input.value = correctAnswers[index];
        input.style.borderColor = '#4caf50';
        input.style.backgroundColor = '#e8f5e9';
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('comparisonsFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = 'Here are the correct answers. Try to write these comparisons on your own next time!';
        feedbackEl.className = 'feedback-message show success';
    }
}

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    const reflectionButton = document.querySelector('button[onclick="saveReflection()"]');
    if (reflectionButton) {
        reflectionButton.addEventListener('click', saveReflection);
    }
    
    const vocabButton = document.querySelector('button[onclick="checkVocabulary()"]');
    if (vocabButton) {
        vocabButton.addEventListener('click', checkVocabulary);
    }
    
    const comparisonsButton = document.querySelector('button[onclick="checkComparisons()"]');
    if (comparisonsButton) {
        comparisonsButton.addEventListener('click', checkComparisons);
    }
    
    const showComparisonsButton = document.querySelector('button[onclick="showComparisonsAnswers()"]');
    if (showComparisonsButton) {
        showComparisonsButton.addEventListener('click', showComparisonsAnswers);
    }
});
