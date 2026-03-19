/**
 * Language exercises for Bade Bhai Sahab module
 */

// Check vocabulary exercise answers
function checkVocabulary() {
    let correctCount = 0;
    let totalCount = 0;
    let incorrectFields = [];
    
    // Check all vocabulary questions
    for (let i = 1; i <= 6; i++) {
        const selectElem = document.getElementById(`vocab${i}`);
        if (!selectElem) continue;
        
        totalCount++;
        const userAnswer = selectElem.value;
        const correctAnswer = vocabAnswers[`vocab${i}`];
        
        if (userAnswer === correctAnswer) {
            // Correct answer
            correctCount++;
            selectElem.classList.add('correct-answer');
            selectElem.classList.remove('incorrect-answer');
        } else {
            // Incorrect answer
            selectElem.classList.add('incorrect-answer');
            selectElem.classList.remove('correct-answer');
            incorrectFields.push(i);
        }
    }
    
    // Display feedback
    const feedbackElem = document.getElementById('vocabFeedback');
    if (!feedbackElem) return;
    
    if (correctCount === totalCount) {
        // All correct
        feedbackElem.className = 'feedback success show';
        feedbackElem.innerHTML = `<span class="success-icon">✓</span> शाबाश! आपने सभी ${totalCount} प्रश्नों के सही उत्तर दिए।`;
        
        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        
        // Show achievement
        if (typeof showAchievement === 'function') {
            showAchievement('शब्द ज्ञान उत्तम! आपने सभी शब्दों के अर्थ सही पहचाने।');
        }
    } else {
        // Some incorrect
        const percentage = Math.round((correctCount / totalCount) * 100);
        feedbackElem.className = 'feedback error show';
        feedbackElem.innerHTML = `<span class="error-icon">✗</span> आपने ${totalCount} प्रश्नों में से ${correctCount} (${percentage}%) सही किए। कृपया प्रश्न ${incorrectFields.join(', ')} पर फिर से प्रयास करें।`;
    }
    
    // Hide feedback after some time
    setTimeout(() => {
        feedbackElem.classList.remove('show');
    }, 5000);
}

// Check contractions exercise answers
function checkContractions() {
    let correctCount = 0;
    let totalCount = 0;
    let incorrectFields = [];
    
    // Check all contraction questions
    for (let i = 1; i <= 8; i++) {
        const selectElem = document.getElementById(`contraction${i}`);
        if (!selectElem) continue;
        
        totalCount++;
        const userAnswer = selectElem.value;
        const correctAnswer = contractionAnswers[`contraction${i}`];
        
        if (userAnswer === correctAnswer) {
            // Correct answer
            correctCount++;
            selectElem.classList.add('correct-answer');
            selectElem.classList.remove('incorrect-answer');
        } else {
            // Incorrect answer
            selectElem.classList.add('incorrect-answer');
            selectElem.classList.remove('correct-answer');
            incorrectFields.push(i);
        }
    }
    
    // Display feedback
    const feedbackElem = document.getElementById('contractionFeedback');
    if (!feedbackElem) return;
    
    if (correctCount === totalCount) {
        // All correct
        feedbackElem.className = 'feedback success show';
        feedbackElem.innerHTML = `<span class="success-icon">✓</span> बहुत बढ़िया! आपने सभी ${totalCount} मुहावरों के सही अर्थ चुने हैं।`;
        
        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        
        // Show achievement
        if (typeof showAchievement === 'function') {
            showAchievement('मुहावरों का ज्ञान उत्कृष्ट! आपने सभी मुहावरों के सही अर्थ चुने हैं।');
        }
    } else {
        // Some incorrect
        const percentage = Math.round((correctCount / totalCount) * 100);
        feedbackElem.className = 'feedback error show';
        feedbackElem.innerHTML = `<span class="error-icon">✗</span> आपने ${totalCount} प्रश्नों में से ${correctCount} (${percentage}%) सही किए। कृपया प्रश्न ${incorrectFields.join(', ')} पर फिर से प्रयास करें।`;
    }
    
    // Hide feedback after some time
    setTimeout(() => {
        feedbackElem.classList.remove('show');
    }, 5000);
}
