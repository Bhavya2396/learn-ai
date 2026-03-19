/**
 * Activities for The Sermon at Benares interactive lesson
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
        'vocab1': 'befitted',
        'vocab2': 'shielded',
        'vocab3': 'afflicted with',
        'vocab4': 'lamentation',
        'vocab5': 'composed'
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

// Check completion of language activity - rephrasing old-fashioned expressions
function checkRephrasing() {
    // These are sample answers - multiple correct answers are possible for rephrasing
    const possibleAnswers = {
        0: ['give you medicine for your child', 'give medicine to your child', 'provide medicine for your child'],
        1: ['please tell me', 'tell me please', 'would you please tell me', 'could you tell me'],
        2: ['kisa went to the buddha', 'kisa visited the buddha', 'kisa approached the buddha'],
        3: ['there was no house where someone had not died', 'every house had experienced death', 'each house had lost someone'],
        4: ['relatives', 'family members', 'relations', 'family']
    };
    
    const inputs = document.querySelectorAll('.rephrasing-input');
    let score = 0;
    let total = inputs.length;
    
    // Clear any existing feedback details
    const existingDetails = document.querySelectorAll('.rephrasing-feedback-detail');
    existingDetails.forEach(detail => detail.remove());
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // First check if the input is empty
        if (userAnswer === '') {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
            return; // Skip further checks for this empty input
        }
        
        // Check if the answer is among the possible correct answers
        const isCorrect = possibleAnswers[index].some(answer => 
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
        
        // Create a feedback detail element showing the correct answer
        const containerDiv = input.closest('.contraction-item');
        if (containerDiv) {
            // Remove any existing feedback for this item
            const existingFeedback = containerDiv.querySelector('.rephrasing-feedback-detail');
            if (existingFeedback) {
                existingFeedback.remove();
            }
            
            // Skip feedback for empty inputs
            if (userAnswer === '') {
                // Create feedback for empty input
                const feedbackDetail = document.createElement('div');
                feedbackDetail.className = 'rephrasing-feedback-detail incorrect';
                feedbackDetail.innerHTML = `
                    <strong>✗ Empty</strong>
                    <p>Please enter your answer.</p>
                `;
                
                // Add the feedback after the input
                containerDiv.appendChild(feedbackDetail);
            } else {
                // Create feedback for non-empty input
                const feedbackDetail = document.createElement('div');
                feedbackDetail.className = `rephrasing-feedback-detail ${isCorrect ? 'correct' : 'incorrect'}`;
                feedbackDetail.innerHTML = `
                    <strong>${isCorrect ? '✓ Correct' : '✗ Incorrect'}</strong>
                    <p>Example answer: "${possibleAnswers[index][0]}"</p>
                `;
                
                // Add the feedback after the input
                containerDiv.appendChild(feedbackDetail);
            }
        }
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('rephrasingFeedback');
    if (feedbackEl) {
        // Check if any inputs are empty
        const hasEmptyInputs = Array.from(inputs).some(input => input.value.trim() === '');
        
        if (hasEmptyInputs) {
            // Show error for empty inputs
            feedbackEl.textContent = `Please fill in all the fields before checking your answers.`;
            feedbackEl.className = 'feedback-message show error';
        } else if (score === total) {
            // All answers are correct
            feedbackEl.textContent = `Perfect! You rephrased all ${total} expressions correctly.`;
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
                    showAchievement('Language Exercise Completed!');
                }
            }
        } else {
            // Some answers are incorrect
            feedbackEl.textContent = `You got ${score} out of ${total} correct. See the feedback for each answer.`;
            feedbackEl.className = 'feedback-message show error';
        }
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
    
    const rephrasingButton = document.querySelector('button[onclick="checkRephrasing()"]');
    if (rephrasingButton) {
        rephrasingButton.addEventListener('click', checkRephrasing);
    }
});
