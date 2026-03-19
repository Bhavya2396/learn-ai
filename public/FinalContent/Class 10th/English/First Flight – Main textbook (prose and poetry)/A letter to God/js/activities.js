/**
 * Activities for A Letter to God interactive lesson
 */

// Initialize activities when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    setupMoneyOrderForm();
    
    // Initialize the storm matching exercise
    setupStormMatching();
    
    // Initialize the metaphors exercise
    setupMetaphorsTable();
    
    // Initialize the reflections saving
    setupReflectionSaving();
    
    // Initialize vocabulary exercises
    setupVocabularyExercises();
});

// Function to save user reflections
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText');
    const feedbackMessage = document.getElementById('reflectionFeedback');
    
    if (!reflectionText || !feedbackMessage) return;
    
    if (reflectionText.value.trim() === '') {
        feedbackMessage.textContent = 'Please write something before saving.';
        feedbackMessage.className = 'feedback-message error show';
        setTimeout(() => {
            feedbackMessage.classList.remove('show');
        }, 3000);
        return;
    }
    
    // In a real app, this would save to a server
    // Here we just show a success message
    feedbackMessage.textContent = 'Your reflection has been saved!';
    feedbackMessage.className = 'feedback-message success show';
    
    // Update progress
    if (window.updateProgress) {
        window.updateProgress();
    }
    
    // Show an achievement popup
    if (window.showAchievement) {
        window.showAchievement('Reflection Completed!');
    }
    
    setTimeout(() => {
        feedbackMessage.classList.remove('show');
    }, 3000);
}

// Setup the Money Order Form Activity
function setupMoneyOrderForm() {
    const moneyOrderForm = document.getElementById('moneyOrderForm');
    if (!moneyOrderForm) return;
    
    const submitBtn = moneyOrderForm.querySelector('.submit-form-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            const sender = moneyOrderForm.querySelector('#senderName').value.trim();
            const receiver = moneyOrderForm.querySelector('#receiverName').value.trim();
            const amount = moneyOrderForm.querySelector('#amount').value.trim();
            
            const feedbackDiv = document.getElementById('moneyOrderFeedback');
            
            if (!sender || !receiver || !amount) {
                feedbackDiv.textContent = 'Please fill in all required fields.';
                feedbackDiv.className = 'feedback-message error show';
            } else {
                feedbackDiv.innerHTML = `
                    <p>Money order from ${sender} to ${receiver} for ${amount} pesos has been submitted.</p>
                    <p>Just like the postmaster in the story, you've helped someone in need!</p>
                `;
                feedbackDiv.className = 'feedback-message success show';
                
                // Update progress and score
                if (window.score !== undefined) {
                    window.score += 15;
                    document.getElementById('totalScore').textContent = window.score;
                }
                
                if (window.showAchievement) {
                    window.showAchievement('Activity Completed: Money Order Form');
                }
            }
            
            setTimeout(() => {
                feedbackDiv.classList.remove('show');
            }, 5000);
        });
    }
}

// Setup the Storm Types Matching Activity
function setupStormMatching() {
    const stormForm = document.getElementById('stormMatchingForm');
    if (!stormForm) return;
    
    const submitBtn = stormForm.querySelector('.submit-form-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check answers
            const answers = {
                'storm1': 'cyclone',
                'storm2': 'gale',
                'storm3': 'typhoon',
                'storm4': 'tornado',
                'storm5': 'hurricane',
                'storm6': 'whirlwind'
            };
            
            let correctCount = 0;
            let feedback = '';
            
            // Check each answer
            Object.keys(answers).forEach(key => {
                const input = stormForm.querySelector(`#${key}`);
                if (input) {
                    const userAnswer = input.value.toLowerCase().trim();
                    if (userAnswer === answers[key]) {
                        correctCount++;
                        input.style.borderColor = '#4caf50';
                    } else {
                        input.style.borderColor = '#f44336';
                    }
                }
            });
            
            // Generate feedback
            const feedbackDiv = document.getElementById('stormFeedback');
            if (feedbackDiv) {
                if (correctCount === Object.keys(answers).length) {
                    feedbackDiv.textContent = 'Perfect! You matched all storm types correctly.';
                    feedbackDiv.className = 'feedback-message success show';
                    
                    // Update progress and score
                    if (window.score !== undefined) {
                        window.score += 20;
                        document.getElementById('totalScore').textContent = window.score;
                    }
                    
                    if (window.showAchievement) {
                        window.showAchievement('Activity Completed: Storm Types');
                    }
                } else {
                    feedbackDiv.textContent = `You got ${correctCount} out of ${Object.keys(answers).length} correct. Try again!`;
                    feedbackDiv.className = 'feedback-message error show';
                }
                
                setTimeout(() => {
                    feedbackDiv.classList.remove('show');
                }, 5000);
            }
        });
    }
}

// Setup the Metaphors Table Activity
function setupMetaphorsTable() {
    const metaphorForm = document.getElementById('metaphorForm');
    if (!metaphorForm) return;
    
    const submitBtn = metaphorForm.querySelector('.submit-form-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check answers - there can be multiple correct interpretations
            const answers = {
                'metaphor1': ['money', 'coins', 'wealth'],
                'metaphor2': ['coins', 'money', 'silver', 'wealth'],
                'metaphor3': ['destruction', 'devastation', 'disaster', 'plague'],
                'metaphor4': ['strength', 'hardworking', 'powerful', 'strong']
            };
            
            let correctCount = 0;
            
            // Check each answer
            Object.keys(answers).forEach(key => {
                const input = metaphorForm.querySelector(`#${key}`);
                if (input) {
                    const userAnswer = input.value.toLowerCase().trim();
                    // Check if the answer contains any of the correct keywords
                    const isCorrect = answers[key].some(keyword => userAnswer.includes(keyword));
                    if (isCorrect) {
                        correctCount++;
                        input.style.borderColor = '#4caf50';
                    } else {
                        input.style.borderColor = '#f44336';
                    }
                }
            });
            
            // Generate feedback
            const feedbackDiv = document.getElementById('metaphorFeedback');
            if (feedbackDiv) {
                if (correctCount === Object.keys(answers).length) {
                    feedbackDiv.innerHTML = `
                        <p>Excellent! You've identified all metaphors correctly.</p>
                        <p>Lencho uses these metaphors to express his understanding of nature and his emotions.</p>
                    `;
                    feedbackDiv.className = 'feedback-message success show';
                    
                    // Update progress and score
                    if (window.score !== undefined) {
                        window.score += 20;
                        document.getElementById('totalScore').textContent = window.score;
                    }
                    
                    if (window.showAchievement) {
                        window.showAchievement('Activity Completed: Metaphor Analysis');
                    }
                } else {
                    feedbackDiv.innerHTML = `
                        <p>You got ${correctCount} out of ${Object.keys(answers).length} correct.</p>
                        <p>Remember that metaphors compare two unlike things without using 'like' or 'as'.</p>
                    `;
                    feedbackDiv.className = 'feedback-message error show';
                }
                
                setTimeout(() => {
                    feedbackDiv.classList.remove('show');
                }, 5000);
            }
        });
    }
}

// Setup vocabulary exercises
function setupVocabularyExercises() {
    // Removed negative emphasis and relative clauses exercises
}

// Check vocabulary dropdown exercises
function checkVocabulary() {
    const answers = {
        'vocab1': 'carefully',
        'vocab2': 'nonchalantly',
        'vocab3': 'differently',
        'vocab4': 'sorrowfully',
        'vocab5': 'completely'
    };
    
    let correctCount = 0;
    let totalQuestions = Object.keys(answers).length;
    
    // Check each answer
    Object.keys(answers).forEach(id => {
        const select = document.getElementById(id);
        if (select && select.value === answers[id]) {
            correctCount++;
            select.style.borderColor = '#4caf50';
        } else if (select) {
            select.style.borderColor = '#f44336';
        }
    });
    
    // Generate feedback
    const feedbackDiv = document.getElementById('vocabFeedback');
    if (feedbackDiv) {
        if (correctCount === totalQuestions) {
            feedbackDiv.textContent = 'Perfect! All adverbs are correctly placed.';
            feedbackDiv.className = 'feedback-message success show';
            
            // Update progress and score
            if (window.score !== undefined) {
                window.score += 15;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            if (window.showAchievement) {
                window.showAchievement('Activity Completed: Adverbs');
            }
        } else {
            feedbackDiv.textContent = `You got ${correctCount} out of ${totalQuestions} correct. Try again!`;
            feedbackDiv.className = 'feedback-message error show';
        }
        
        setTimeout(() => {
            feedbackDiv.classList.remove('show');
        }, 5000);
    }
}

// Check conditional sentences
function checkConditionals() {
    const answers = [
        'she will be disappointed',
        'we will get hungry',
        'won\'t send you any more letters',
        'she will become lazy',
        'will catch it'
    ];
    
    let correctCount = 0;
    let totalQuestions = answers.length;
    const inputs = document.querySelectorAll('.contraction-input');
    
    // Check each answer
    inputs.forEach((input, index) => {
        const userAnswer = input.value.toLowerCase().trim();
        const correctAnswer = answers[index];
        
        // Allow for some variation in answers
        if (userAnswer === correctAnswer || 
            userAnswer === correctAnswer.replace('will', '\'ll') ||
            userAnswer === correctAnswer.replace('will not', 'won\'t')) {
            correctCount++;
            input.style.borderColor = '#4caf50';
        } else {
            input.style.borderColor = '#f44336';
        }
    });
    
    // Generate feedback
    const feedbackDiv = document.getElementById('conditionalssFeedback');
    if (feedbackDiv) {
        if (correctCount === totalQuestions) {
            feedbackDiv.textContent = 'Excellent! All conditional sentences are correctly completed.';
            feedbackDiv.className = 'feedback-message success show';
            
            // Update progress and score
            if (window.score !== undefined) {
                window.score += 15;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            if (window.showAchievement) {
                window.showAchievement('Activity Completed: Conditional Sentences');
            }
        } else {
            feedbackDiv.textContent = `You got ${correctCount} out of ${totalQuestions} correct. Try again!`;
            feedbackDiv.className = 'feedback-message error show';
        }
        
        setTimeout(() => {
            feedbackDiv.classList.remove('show');
        }, 5000);
    }
}

// Removed setupNegativeEmphasis and setupRelativeClauses functions

// Add additional CSS to support new activities
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for poem tabs if not already there
    if (!document.querySelector('style#poem-tab-styles')) {
        const poemTabStyles = document.createElement('style');
        poemTabStyles.id = 'poem-tab-styles';
        poemTabStyles.textContent = `
            .poem-tabs {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .poem-tab {
                padding: 10px 20px;
                background: #e0e0e0;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 1rem;
                font-weight: 500;
            }
            
            .poem-tab:hover {
                background: #d0d0d0;
            }
            
            .poem-tab.active {
                background: linear-gradient(135deg, #4a6572, #334756);
                color: white;
                box-shadow: var(--shadow-md);
            }
            
            .poem-container {
                display: none;
            }
            
            .poem-container.active {
                display: block;
                animation: fadeIn 0.5s;
            }
            
            .money-order-form {
                background: #f8f9fa;
                padding: 24px;
                border-radius: var(--card-radius);
                margin: 20px 0;
                box-shadow: var(--shadow-md);
                border: 1px solid rgba(0,0,0,0.05);
            }
            
            .form-group {
                margin-bottom: 16px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
            }
            
            .form-group input {
                width: 100%;
                padding: 10px 16px;
                border: 1px solid rgba(0,0,0,0.1);
                border-radius: var(--input-radius);
                font-size: 1rem;
                box-shadow: var(--shadow-sm);
                transition: var(--transition);
                outline: none;
            }
            
            .form-group input:focus {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(74, 101, 114, 0.2);
            }
            
            .metaphor-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            
            .metaphor-table th, .metaphor-table td {
                padding: 12px;
                border: 1px solid #e0e0e0;
            }
            
            .metaphor-table th {
                background: #f5f5f5;
                text-align: left;
            }
            
            .metaphor-table input {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid rgba(0,0,0,0.1);
                border-radius: var(--input-radius);
                font-size: 1rem;
                box-shadow: var(--shadow-sm);
                outline: none;
            }
            
            .metaphor-table input:focus {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(74, 101, 114, 0.2);
            }
        `;
        document.head.appendChild(poemTabStyles);
    }
});
