/**
 * Activities for From the Diary of Anne Frank interactive lesson
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
        'vocab1': 'producing',
        'vocab2': 'homesick',
        'vocab3': 'daydream'
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

// Check phrasal verbs answers
function checkPhrasalVerbs() {
    // These are sample answers - multiple correct answers are possible for phrasal verbs
    const possibleAnswers = {
        0: ['have a good relationship with'],
        1: ['go straight to the topic'],
        2: ['not promoted'],
        3: ['give an assignment to a person in authority', 'submit an assignment', 'give homework to teacher'],
        4: ['stay indoors']
    };
    
    // Hints for each phrasal verb
    const hints = {
        0: "Think about how people interact positively with each other",
        1: "Consider what it means to start discussing something directly",
        2: "This relates to not advancing to the next grade in school",
        3: "Think about what students do with their completed homework",
        4: "This is about remaining at home rather than going out"
    };
    
    const inputs = document.querySelectorAll('.contraction-input');
    let score = 0;
    let total = inputs.length;
    let allInputsFilled = true;
    
    // First check if all inputs are filled
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allInputsFilled = false;
            input.style.borderColor = '#ffc107'; // Yellow warning color
            input.style.backgroundColor = '#fff8e1'; // Light yellow background
        }
    });
    
    // If not all inputs are filled, show warning and exit
    if (!allInputsFilled) {
        const feedbackEl = document.getElementById('phrasalVerbsFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = 'Please fill in all the blanks before checking your answers.';
            feedbackEl.className = 'feedback-message show warning';
        }
        return;
    }
    
    // Clear any previous hints
    document.querySelectorAll('.hint-text').forEach(hint => hint.remove());
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        
        // Check if the answer is among the possible correct answers
        const isCorrect = possibleAnswers[index].some(answer => 
            userAnswer.includes(answer.toLowerCase()) || 
            answer.toLowerCase().includes(userAnswer)
        );
        
        // Get the parent container for this input
        const container = input.closest('.contraction-item');
        
        // Remove any existing hint
        const existingHint = container.querySelector('.hint-text');
        if (existingHint) {
            existingHint.remove();
        }
        
        if (isCorrect) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            score++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
            
            // Add hint for incorrect answers
            const hintElement = document.createElement('div');
            hintElement.className = 'hint-text';
            hintElement.textContent = `Hint: ${hints[index]}`;
            hintElement.style.color = '#f57c00';
            hintElement.style.fontSize = '0.9rem';
            hintElement.style.marginTop = '5px';
            hintElement.style.fontStyle = 'italic';
            container.appendChild(hintElement);
        }
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('phrasalVerbsFeedback');
    if (feedbackEl) {
        if (score === total) {
            feedbackEl.textContent = `Perfect! You matched all ${total} phrasal verbs correctly.`;
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
                    showAchievement('Phrasal Verbs Exercise Completed!');
                }
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again with the hints provided!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Function to show all phrasal verb answers
function showPhrasalVerbAnswers() {
    // These are the correct answers for each phrasal verb
    const correctAnswers = {
        0: "have a good relationship with",
        1: "go straight to the topic",
        2: "not promoted",
        3: "give an assignment to a person in authority",
        4: "stay indoors"
    };
    
    // Get all input fields
    const inputs = document.querySelectorAll('.contraction-input');
    
    // Fill in the correct answers
    inputs.forEach((input, index) => {
        input.value = correctAnswers[index];
        input.style.borderColor = '#4caf50';
        input.style.backgroundColor = '#e8f5e9';
        
        // Remove any existing hints
        const container = input.closest('.contraction-item');
        const existingHint = container.querySelector('.hint-text');
        if (existingHint) {
            existingHint.remove();
        }
    });
    
    // Show success message
    const feedbackEl = document.getElementById('phrasalVerbsFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = "Here are the correct answers. Study them carefully to understand how phrasal verbs work.";
        feedbackEl.className = 'feedback-message show info';
        feedbackEl.style.backgroundColor = '#e3f2fd';
        feedbackEl.style.color = '#0d47a1';
        feedbackEl.style.borderLeft = '4px solid #2196f3';
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
    
    const phrasalVerbsButton = document.querySelector('button[onclick="checkPhrasalVerbs()"]');
    if (phrasalVerbsButton) {
        phrasalVerbsButton.addEventListener('click', checkPhrasalVerbs);
    }
});
