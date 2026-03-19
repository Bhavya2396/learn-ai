/**
 * Activities for Bade Bhai Sahab module
 */

// Vocabulary exercises data
const vocabularyData = {
    '1': 'पुख्ता',
    '2': 'तम्बीह',
    '3': 'हिमाकत',
    '4': 'ताज्जुब',
    '5': 'प्राणांतक'
};

// Contractions/idioms data
const contractionsData = {
    '1': 'हमेशा खतरे में रहना',
    '2': 'फटकारना',
    '3': 'अनजाने में सफलता मिल जाना',
    '4': 'बहुत कठिन काम करना',
    '5': 'कठिन परिस्थिति में फंसना'
};

// Listening activity answers
const listeningAnswers = {
    'value': '3',
    'narrative': '3'
};

// Writing activity answers
const writingAnswers = {
    'writing-option': '4'
};

// Check vocabulary answers
function checkVocabulary() {
    let correctCount = 0;
    let totalQuestions = 0;
    let incorrectFields = [];
    
    for (const [key, correctAnswer] of Object.entries(vocabularyData)) {
        totalQuestions++;
        const userAnswer = document.getElementById(`vocab${key}`).value;
        
        if (userAnswer === correctAnswer) {
            correctCount++;
            document.getElementById(`vocab${key}`).classList.add('correct-answer');
            document.getElementById(`vocab${key}`).classList.remove('incorrect-answer');
        } else {
            document.getElementById(`vocab${key}`).classList.add('incorrect-answer');
            document.getElementById(`vocab${key}`).classList.remove('correct-answer');
            incorrectFields.push(`प्रश्न ${key}`);
        }
    }
    
    const feedbackElement = document.getElementById('vocabFeedback');
    
    if (correctCount === totalQuestions) {
        feedbackElement.className = 'feedback success show';
        feedbackElement.innerHTML = `<span class="success-icon">✓</span> बहुत बढ़िया! आपने सभी ${totalQuestions} प्रश्नों के सही उत्तर दिए हैं।`;
        
        // Update progress
        updateProgress();
        showAchievement('शाब्दिक ज्ञान पूर्ण! आपने सभी शब्दों के अर्थ सही पहचाने।');
        
    } else {
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        feedbackElement.className = 'feedback error show';
        feedbackElement.innerHTML = `<span class="error-icon">✗</span> आपने ${totalQuestions} प्रश्नों में से ${correctCount} (${percentage}%) सही किए। कृपया इन प्रश्नों पर पुनः प्रयास करें: ${incorrectFields.join(', ')}`;
    }
    
    // Hide feedback after some time
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 5000);
}

// Check contractions/idioms answers
function checkContractions() {
    let correctCount = 0;
    let totalQuestions = 0;
    let incorrectFields = [];
    
    for (const [key, correctAnswer] of Object.entries(contractionsData)) {
        totalQuestions++;
        const userAnswer = document.getElementById(`contraction${key}`).value;
        
        if (userAnswer === correctAnswer) {
            correctCount++;
            document.getElementById(`contraction${key}`).classList.add('correct-answer');
            document.getElementById(`contraction${key}`).classList.remove('incorrect-answer');
        } else {
            document.getElementById(`contraction${key}`).classList.add('incorrect-answer');
            document.getElementById(`contraction${key}`).classList.remove('correct-answer');
            incorrectFields.push(`मुहावरा ${key}`);
        }
    }
    
    const feedbackElement = document.getElementById('contractionFeedback');
    
    if (correctCount === totalQuestions) {
        feedbackElement.className = 'feedback success show';
        feedbackElement.innerHTML = `<span class="success-icon">✓</span> शाबाश! आपने सभी ${totalQuestions} मुहावरों के सही अर्थ चुने हैं।`;
        
        // Update progress
        updateProgress();
        showAchievement('मुहावरों का ज्ञान उत्कृष्ट! आपने सभी मुहावरों के अर्थ सही पहचाने।');
        
    } else {
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        feedbackElement.className = 'feedback error show';
        feedbackElement.innerHTML = `<span class="error-icon">✗</span> आपने ${totalQuestions} मुहावरों में से ${correctCount} (${percentage}%) सही किए। कृपया इन मुहावरों पर पुनः प्रयास करें: ${incorrectFields.join(', ')}`;
    }
    
    // Hide feedback after some time
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 5000);
}

// Check listening activity answers
function checkListeningAnswers() {
    let correctCount = 0;
    let totalQuestions = 0;
    let incorrectFields = [];
    
    // Clear any previous feedback
    clearListeningFeedback();
    
    // Check value question
    totalQuestions++;
    const selectedValue = document.querySelector('input[name="value"]:checked')?.value;
    if (selectedValue === listeningAnswers.value) {
        correctCount++;
        // Mark correct answer
        const correctValueOption = document.querySelector(`#value-${listeningAnswers.value}`).closest('.option-item');
        correctValueOption.classList.add('correct-answer');
        
        // Add tick mark
        const tickMark = document.createElement('span');
        tickMark.className = 'answer-icon correct';
        tickMark.innerHTML = '✓';
        correctValueOption.appendChild(tickMark);
    } else if (selectedValue) {
        incorrectFields.push('मूल्य प्रश्न');
        
        // Mark incorrect answer
        const selectedValueOption = document.querySelector(`input[name="value"]:checked`).closest('.option-item');
        selectedValueOption.classList.add('incorrect-answer');
        
        // Add cross mark
        const crossMark = document.createElement('span');
        crossMark.className = 'answer-icon incorrect';
        crossMark.innerHTML = '✗';
        selectedValueOption.appendChild(crossMark);
        
        // Show correct answer
        const correctValueOption = document.querySelector(`#value-${listeningAnswers.value}`).closest('.option-item');
        correctValueOption.classList.add('correct-answer');
        
        // Add tick mark to correct answer
        const tickMark = document.createElement('span');
        tickMark.className = 'answer-icon correct';
        tickMark.innerHTML = '✓';
        correctValueOption.appendChild(tickMark);
    }
    
    // Check narrative question
    totalQuestions++;
    const selectedNarrative = document.querySelector('input[name="narrative"]:checked')?.value;
    if (selectedNarrative === listeningAnswers.narrative) {
        correctCount++;
        // Mark correct answer
        const correctNarrativeOption = document.querySelector(`#narrative${listeningAnswers.narrative}`).closest('.narrative-option');
        correctNarrativeOption.classList.add('correct-answer');
        
        // Add tick mark
        const tickMark = document.createElement('span');
        tickMark.className = 'answer-icon correct';
        tickMark.innerHTML = '✓';
        correctNarrativeOption.appendChild(tickMark);
    } else if (selectedNarrative) {
        incorrectFields.push('कहानी का सार');
        
        // Mark incorrect answer
        const selectedNarrativeOption = document.querySelector(`input[name="narrative"]:checked`).closest('.narrative-option');
        selectedNarrativeOption.classList.add('incorrect-answer');
        
        // Add cross mark
        const crossMark = document.createElement('span');
        crossMark.className = 'answer-icon incorrect';
        crossMark.innerHTML = '✗';
        selectedNarrativeOption.appendChild(crossMark);
        
        // Show correct answer
        const correctNarrativeOption = document.querySelector(`#narrative${listeningAnswers.narrative}`).closest('.narrative-option');
        correctNarrativeOption.classList.add('correct-answer');
        
        // Add tick mark to correct answer
        const tickMark = document.createElement('span');
        tickMark.className = 'answer-icon correct';
        tickMark.innerHTML = '✓';
        correctNarrativeOption.appendChild(tickMark);
    }
    
    if (!selectedValue || !selectedNarrative) {
        // Create feedback message
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-message error show';
        feedbackDiv.id = 'listeningFeedback';
        feedbackDiv.innerHTML = '<span class="error-icon">✗</span> कृपया सभी प्रश्नों के उत्तर दें।';
        
        // Add feedback after the button
        const button = document.querySelector('.listening-activity .interactive-btn');
        button.insertAdjacentElement('afterend', feedbackDiv);
        
        // Hide feedback after some time
        setTimeout(() => {
            feedbackDiv.classList.remove('show');
            setTimeout(() => {
                if (feedbackDiv.parentNode) {
                    feedbackDiv.remove();
                }
            }, 500);
        }, 5000);
        
        return;
    }
    
    // Create feedback message
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'listeningFeedback';
    
    if (correctCount === totalQuestions) {
        feedbackDiv.className = 'feedback-message success show';
        feedbackDiv.innerHTML = '<span class="success-icon">✓</span> बहुत बढ़िया! आपने सभी प्रश्नों के सही उत्तर दिए हैं।';
        
        // Update progress
        updateProgress();
        showAchievement('श्रवण कौशल पूर्ण! आपने कहानी को अच्छी तरह से समझा है।');
    } else {
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        feedbackDiv.className = 'feedback-message error show';
        feedbackDiv.innerHTML = `<span class="error-icon">✗</span> आपने ${totalQuestions} प्रश्नों में से ${correctCount} (${percentage}%) सही किए। कृपया इन प्रश्नों पर पुनः प्रयास करें: ${incorrectFields.join(', ')}`;
    }
    
    // Add feedback after the button
    const button = document.querySelector('.listening-activity .interactive-btn');
    button.insertAdjacentElement('afterend', feedbackDiv);
    
    // Hide feedback after some time
    setTimeout(() => {
        feedbackDiv.classList.remove('show');
        setTimeout(() => {
            if (feedbackDiv.parentNode) {
                feedbackDiv.remove();
            }
        }, 500);
    }, 5000);
}

// Helper function to clear previous listening feedback
function clearListeningFeedback() {
    // Remove any existing feedback
    const existingFeedback = document.getElementById('listeningFeedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Remove answer icons
    const answerIcons = document.querySelectorAll('.option-item .answer-icon, .narrative-option .answer-icon');
    answerIcons.forEach(icon => icon.remove());
    
    // Remove answer styling
    const optionItems = document.querySelectorAll('.option-item, .narrative-option');
    optionItems.forEach(option => {
        option.classList.remove('correct-answer', 'incorrect-answer');
    });
}

// Check writing activity answers
function checkWritingAnswers() {
    const selectedOption = document.querySelector('input[name="writing-option"]:checked')?.value;
    
    if (!selectedOption) {
        alert('कृपया एक विकल्प चुनें।');
        return;
    }
    
    // Clear any previous feedback
    clearWritingFeedback();
    
    // Get all writing options
    const writingOptions = document.querySelectorAll('.writing-option');
    
    if (selectedOption === writingAnswers['writing-option']) {
        // Add tick mark to correct answer
        const correctOption = document.querySelector(`#writing${selectedOption}`).closest('.writing-option');
        correctOption.classList.add('correct-answer');
        
        // Add tick mark icon
        const tickMark = document.createElement('span');
        tickMark.className = 'answer-icon correct';
        tickMark.innerHTML = '✓';
        correctOption.appendChild(tickMark);
        
        // Create success feedback message
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-message success show';
        feedbackDiv.id = 'writingFeedback';
        feedbackDiv.innerHTML = '<span class="success-icon">✓</span> बहुत बढ़िया! आपने सही विकल्प चुना है। कहानी में निहित सभी विचार महत्वपूर्ण हैं।';
        
        // Add feedback after the button
        const button = document.querySelector('.writing-activity .interactive-btn');
        button.insertAdjacentElement('afterend', feedbackDiv);
        
        // Update progress
        updateProgress();
        showAchievement('कहानी के विचारों को समझने में सफलता! आपने प्रेमचंद के संदेश को अच्छी तरह समझा है।');
        
    } else {
        // Add cross mark to incorrect answer
        const selectedOptionElement = document.querySelector(`#writing${selectedOption}`).closest('.writing-option');
        selectedOptionElement.classList.add('incorrect-answer');
        
        // Add cross mark icon
        const crossMark = document.createElement('span');
        crossMark.className = 'answer-icon incorrect';
        crossMark.innerHTML = '✗';
        selectedOptionElement.appendChild(crossMark);
        
        // Add tick mark to correct answer for guidance
        const correctOption = document.querySelector(`#writing${writingAnswers['writing-option']}`).closest('.writing-option');
        correctOption.classList.add('correct-answer');
        
        // Add tick mark icon to correct answer
        const tickMark = document.createElement('span');
        tickMark.className = 'answer-icon correct';
        tickMark.innerHTML = '✓';
        correctOption.appendChild(tickMark);
        
        // Create error feedback message
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-message error show';
        feedbackDiv.id = 'writingFeedback';
        feedbackDiv.innerHTML = '<span class="error-icon">✗</span> यह उत्तर पूर्ण नहीं है। कहानी में एक से अधिक विचार निहित हैं। कृपया पुनः प्रयास करें।';
        
        // Add feedback after the button
        const button = document.querySelector('.writing-activity .interactive-btn');
        button.insertAdjacentElement('afterend', feedbackDiv);
    }
    
    // Hide feedback after some time
    setTimeout(() => {
        const feedback = document.getElementById('writingFeedback');
        if (feedback) {
            feedback.classList.remove('show');
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.remove();
                }
            }, 500);
        }
    }, 5000);
}

// Helper function to clear previous writing feedback
function clearWritingFeedback() {
    // Remove any existing feedback
    const existingFeedback = document.getElementById('writingFeedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Remove answer icons
    const answerIcons = document.querySelectorAll('.writing-option .answer-icon');
    answerIcons.forEach(icon => icon.remove());
    
    // Remove answer styling
    const writingOptions = document.querySelectorAll('.writing-option');
    writingOptions.forEach(option => {
        option.classList.remove('correct-answer', 'incorrect-answer');
    });
}

// Function to play audio for listening activity (placeholder)
function playListeningActivity() {
    alert('इस गतिविधि में, आपको कहानी के मूल विचारों पर चिंतन करना है। कृपया प्रश्नों के उत्तर दें।');
    
    // In a real implementation, this would play an audio file
    // For now, we'll just show a simulation of audio playing
    const button = document.querySelector('.listening-activity button');
    button.textContent = '🔊 ऑडियो बज रहा है...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = '🔊 ऑडियो फिर से चलाएँ';
        button.disabled = false;
    }, 3000);
}

// Function to save listening activity notes
function saveListeningNotes() {
    checkListeningAnswers();
}

// Function to save writing activity notes
function saveWriting() {
    checkWritingAnswers();
}

// Initialize activities when the document loads
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
});
