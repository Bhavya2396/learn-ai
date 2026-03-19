/**
 * Activities for The Book That Saved the Earth interactive lesson
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
        'vocab1': 'easel',
        'vocab2': 'apprentice',
        'vocab3': 'peevishly',
        'vocab4': 'decipher',
        'vocab5': 'transcribe'
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

// Check "Think About It" answers
function checkThinkAboutIt() {
    // These are sample answers - multiple correct answers are possible for reflection questions
    const possibleAnswers = {
        0: ['respectful', 'deferential', 'polite', 'diplomatic', 'tactful', 'careful', 'titles', 'beg pardon', 'forgive me', 'insignificant', 'data', 'information'],
        1: ['direct', 'honest', 'humor', 'diplomatic', 'suggest', 'alternatives', 'speak up', 'stay silent', 'approach', 'handle', 'mistakes'],
        2: ['advantages', 'disadvantages', 'accessibility', 'portability', 'cost', 'environmental', 'reading experience', 'eye strain', 'battery', 'tactile', 'device'],
        3: ['knowledge', 'entertainment', 'comfort', 'reliable', 'judge', 'available', 'transport', 'worlds', 'times', 'companion', 'best']
    };
    
    const inputs = document.querySelectorAll('#thinking-language .contraction-input');
    let score = 0;
    let total = inputs.length;
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // Check if the answer contains key concepts from the possible answers
        const isCorrect = possibleAnswers[index].some(keyword => 
            userAnswer.includes(keyword.toLowerCase())
        );
        
        if (isCorrect && userAnswer.length >= 10) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            score++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('thinkAboutItFeedback');
    if (feedbackEl) {
        if (score === total) {
            feedbackEl.textContent = `Perfect! You completed all ${total} reflection questions correctly.`;
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
                    showAchievement('Think About It Exercise Completed!');
                }
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Show answers for "Think About It" questions
function showThinkAboutItAnswers() {
    const inputs = document.querySelectorAll('#thinking-language .contraction-input');
    const feedbackEl = document.getElementById('thinkAboutItFeedback');
    
    if (!feedbackEl) return;
    
    let answersHtml = '<strong>Suggested Answers:</strong><br><br>';
    
    inputs.forEach((input, index) => {
        const answer = input.getAttribute('data-answer');
        if (answer) {
            answersHtml += `<strong>Question ${index + 1}:</strong> ${answer}<br><br>`;
        }
    });
    
    // Display the answers
    feedbackEl.innerHTML = answersHtml;
    feedbackEl.className = 'feedback-message show';
    feedbackEl.style.display = 'block';
    feedbackEl.style.padding = '15px';
    feedbackEl.style.margin = '15px 0';
    feedbackEl.style.backgroundColor = '#f5f5f5';
    feedbackEl.style.border = '1px solid #ddd';
    feedbackEl.style.borderRadius = '5px';
    feedbackEl.style.color = '#333';
    feedbackEl.style.textAlign = 'left';
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
    
    const thinkAboutItButton = document.querySelector('button[onclick="checkThinkAboutIt()"]');
    if (thinkAboutItButton) {
        thinkAboutItButton.addEventListener('click', checkThinkAboutIt);
    }
});
