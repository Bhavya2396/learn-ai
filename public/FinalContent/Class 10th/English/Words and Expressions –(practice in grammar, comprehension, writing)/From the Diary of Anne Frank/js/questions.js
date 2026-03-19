/**
 * Questions and interactive exercises for From the Diary of Anne Frank
 */

// Reading comprehension questions for Text I
const textIQuestions = [
    {
        question: "Infer the meaning of the expression 'to feel the breath of war'.",
        options: [
            "To experience the physical effects of war",
            "To sense that war was approaching or imminent",
            "To be directly involved in combat",
            "To be afraid of war"
        ],
        correctAnswer: 1,
        explanation: "The expression 'to feel the breath of war' means there were indications that war was going to start soon or that the effects of war were beginning to be felt."
    },
    {
        question: "What does 'appalling hunger and cold' refer to in the passage?",
        options: [
            "Mild discomfort experienced by citizens",
            "Extremely severe and shocking conditions of starvation and freezing temperatures",
            "Temporary food shortages during winter",
            "Normal wartime rationing"
        ],
        correctAnswer: 1,
        explanation: "The term 'appalling' indicates extremely severe and shocking conditions - in this case, the terrible hunger and cold that the citizens of Leningrad experienced during the siege."
    },
    {
        question: "Why did the people under siege welcome bad weather conditions?",
        options: [
            "Because they enjoyed the rain and snow",
            "Because it made food distribution easier",
            "Because it reduced visibility, making it harder for Germans to bomb the city",
            "Because it helped crops grow in their victory gardens"
        ],
        correctAnswer: 2,
        explanation: "As stated in the passage, 'Leningraders welcomed inclement weather for the reduced visibility it brought' - bad weather made it harder for German planes to see targets and bomb the city."
    },
    {
        question: "What were 'blockade grams'?",
        options: [
            "Letters sent during the blockade",
            "Minimal food rations distributed during the siege",
            "Military communications",
            "Weight measurements for artillery shells"
        ],
        correctAnswer: 1,
        explanation: "The 'blockade grams' were the minimal food rations that citizens received during the siege - specifically 125 grams for children, dependents and white-collar workers and 250 grams for manual workers."
    },
    {
        question: "List the words from the passage which are related to the war.",
        type: "text",
        sampleAnswer: "siege, bombardment, air raids, artillery, bomb shelters, shells",
        evaluationFunction: function(answer) {
            const warTerms = ["siege", "bombardment", "air raids", "artillery", "bomb shelters", "shells", "war"];
            const userTerms = answer.toLowerCase().split(/[,;\s]+/);
            const matchedTerms = userTerms.filter(term => warTerms.includes(term));
            return matchedTerms.length >= 3;
        },
        explanation: "The passage contains several terms related to war, including siege, bombardment, air raids, artillery, bomb shelters, and shells."
    }
];

// Reading comprehension questions for Text II
const textIIQuestions = [
    {
        question: "What is being talked about in the first paragraph of Daniel Defoe's journal?",
        options: [
            "The author's personal life",
            "The return of the plague to Holland",
            "The weather conditions in Amsterdam",
            "Trade between England and Turkey"
        ],
        correctAnswer: 1,
        explanation: "The first paragraph discusses how the author and his neighbors heard that 'the plague was returned again in Holland' and debates about where it originated from."
    },
    {
        question: "How was news about important events circulated during those days?",
        options: [
            "Through printed newspapers",
            "Through television broadcasts",
            "Through letters of merchants and word of mouth",
            "Through government announcements only"
        ],
        correctAnswer: 2,
        explanation: "As stated in the passage, 'such things as these were gathered from the letters of merchants and others who corresponded abroad, and from them were handed about by word of mouth only.'"
    },
    {
        question: "Why did the rumour about the plague die off?",
        options: [
            "Because it was proven to be false",
            "Because the government kept information about it private",
            "Because people were not interested",
            "Because the plague was cured"
        ],
        correctAnswer: 1,
        explanation: "The passage states, 'But all was kept very private. Hence, it was that this rumour died off again, and people began to forget it.' The government kept information private, causing the rumor to fade."
    },
    {
        question: "What does 'the weekly bill of mortality' mean?",
        options: [
            "The weekly payment of dues",
            "The weekly news about deaths",
            "The statement about hospital expenditure issued every week",
            "The list which was issued weekly, of persons who died due to plague"
        ],
        correctAnswer: 3,
        explanation: "The 'weekly bill of mortality' was a list published weekly that recorded deaths, including those from plague. In the passage, it recorded 'Plague 2. Parishes infected 1.'"
    },
    {
        question: "Find words from the text which seem different compared to modern English usage and provide their current equivalents.",
        type: "text",
        sampleAnswer: "whither - where, whence - from where, whereupon - after which",
        evaluationFunction: function(answer) {
            const oldTerms = ["whither", "whence", "whereupon"];
            const userText = answer.toLowerCase();
            return oldTerms.some(term => userText.includes(term));
        },
        explanation: "The text contains several archaic terms like 'whither' (where), 'whence' (from where), and 'whereupon' (after which) that are rarely used in modern English."
    }
];

// Vocabulary exercise answers
const vocabularyAnswers = {
    vocab1: "it",
    vocab2: "oneself",
    vocab3: "who",
    vocab4: "yours",
    vocab5: "damage",
    vocab6: "concerned with"
};

// Idiom MCQ answers (correct option index)
const idiomAnswers = {
    idiom1: "1",  // All's fair in love and war
    idiom2: "1",  // Call the shots
    idiom3: "1",  // Raining cats and dogs
    idiom4: "1",  // Icing on the cake
    idiom5: "1",  // Chalk and cheese
    idiom6: "1"   // Breaking the ice
};

// Contraction exercise answers
const contractionAnswers = {
    "shouldn't": "should not",
    "They've": "They have",
    "Let's": "Let us",
    "didn't": "did not",
    "couldn't": "could not",
    "Here's": "Here is",
    "I'd": "I would",
    "aren't": "are not"
};

// Phrasal verb exercise answers
const phrasalVerbAnswers = {
    "go out": "wanted to go out",
    "broke down": "broke down",
    "look for": "look for",
    "checked out": "checked out",
    "found out": "found out"
};

// Initialize questions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load text questions when the thinking-text module is shown
    const textQuestionsContainer = document.getElementById('textQuestions');
    if (textQuestionsContainer) {
        loadTextQuestions(textQuestionsContainer);
    }
    
    // Initialize vocabulary checking
    initVocabularyChecking();
    
    // Initialize idiom matching
    initIdiomMatching();
    
    // Initialize contraction checking
    initContractionChecking();
    
    // Initialize phrasal verb checking
    initPhrasalVerbChecking();
    
    // Initialize editing exercise
    initEditingExercise();
});

// Load text comprehension questions
function loadTextQuestions(container) {
    // Create a single container for all questions
    const questionsHTML = `
        <div id="allQuestions" class="question-set active"></div>
    `;
    
    container.innerHTML = questionsHTML;
    
    // Load all questions in a single container
    const questionsContainer = document.getElementById('allQuestions');
    
    // First add Text I questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Anne Frank\'s Diary</h3>';
    loadQuestionSet(questionsContainer, textIQuestions, 'textI');
    
    // Then add Text II questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Daniel Defoe\'s Journal</h3>';
    loadQuestionSet(questionsContainer, textIIQuestions, 'textII');
}

// Load a set of questions into a container
function loadQuestionSet(container, questions, prefix) {
    questions.forEach((q, index) => {
        const questionHTML = createQuestionHTML(q, index, prefix);
        container.innerHTML += questionHTML;
    });
    
    // Add submit button
    container.innerHTML += `
        <div class="button-container">
            <button class="interactive-btn" onclick="checkAnswers('${prefix}')">Check Answers</button>
        </div>
        <div id="${prefix}Feedback" class="feedback-message"></div>
    `;
}

// Create HTML for a question
function createQuestionHTML(question, index, prefix) {
    const questionId = `${prefix}-q${index}`;
    
    let optionsHTML = '';
    
    if (question.type === 'text') {
        // Text input question
        optionsHTML = `
            <textarea id="${questionId}" class="question-textarea" rows="4" placeholder="Type your answer here..."></textarea>
        `;
    } else {
        // Multiple choice question
        question.options.forEach((option, optIndex) => {
            optionsHTML += `
                <div class="option">
                    <input type="radio" id="${questionId}-opt${optIndex}" name="${questionId}" value="${optIndex}">
                    <label for="${questionId}-opt${optIndex}">${option}</label>
                </div>
            `;
        });
    }
    
    return `
        <div class="question-item" data-question-index="${index}">
            <div class="question-text">${index + 1}. ${question.question}</div>
            <div class="question-options">
                ${optionsHTML}
            </div>
            <div class="question-feedback" id="${questionId}-feedback"></div>
        </div>
    `;
}

// This function is no longer needed since we're showing all questions at once
// Keeping it for compatibility with existing code
function showQuestionSet(setId) {
    // No longer needed, but keeping the function for compatibility
    console.log(`showQuestionSet called with ${setId}, but all questions are now shown at once`);
}

// Check answers for a question set
function checkAnswers(prefix) {
    const questions = prefix === 'textI' ? textIQuestions : textIIQuestions;
    let correctCount = 0;
    
    questions.forEach((question, index) => {
        const questionId = `${prefix}-q${index}`;
        const feedbackEl = document.getElementById(`${questionId}-feedback`);
        
        if (question.type === 'text') {
            // Text input question
            const userAnswer = document.getElementById(questionId).value.trim();
            const isCorrect = question.evaluationFunction(userAnswer);
            
            feedbackEl.textContent = isCorrect ? 
                '✓ Correct!' : 
                `✗ Sample answer: ${question.sampleAnswer}`;
            feedbackEl.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            
            if (isCorrect) correctCount++;
        } else {
            // Multiple choice question
            const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
            
            if (selectedOption) {
                const userAnswer = parseInt(selectedOption.value);
                const isCorrect = userAnswer === question.correctAnswer;
                
                feedbackEl.textContent = isCorrect ? 
                    '✓ Correct!' : 
                    `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`;
                feedbackEl.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
                
                if (isCorrect) correctCount++;
            } else {
                feedbackEl.textContent = 'Please select an answer.';
                feedbackEl.className = 'question-feedback warning';
            }
        }
    });
    
    // Show overall feedback
    const feedbackContainer = document.getElementById(`${prefix}Feedback`);
    feedbackContainer.textContent = `You got ${correctCount} out of ${questions.length} questions correct!`;
    feedbackContainer.className = 'feedback-message show';
    feedbackContainer.classList.add(correctCount === questions.length ? 'success' : 'error');
    
    // Update progress if all correct
    if (correctCount === questions.length) {
        if (typeof updateProgress === 'function') {
            updateProgress('thinking-text', 20);
        }
    }
}

// Initialize vocabulary checking
function initVocabularyChecking() {
    window.checkVocabulary = function() {
        let correctCount = 0;
        let totalCount = 0;
        
        Object.keys(vocabularyAnswers).forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                totalCount++;
                const isCorrect = select.value === vocabularyAnswers[id];
                select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
                if (isCorrect) correctCount++;
            }
        });
        
        const feedbackEl = document.getElementById('vocabFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
            
            if (correctCount === totalCount && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
        }
    };
    
    // Add idiom checking function
    window.checkIdioms = function() {
        let correctCount = 0;
        let totalCount = 0;
        
        Object.keys(idiomAnswers).forEach(id => {
            totalCount++;
            const selectedOption = document.querySelector(`input[name="${id}"]:checked`);
            const feedbackEl = document.getElementById(`${id}-feedback`);
            
            if (selectedOption) {
                const isCorrect = selectedOption.value === idiomAnswers[id];
                
                if (isCorrect) {
                    feedbackEl.textContent = '✓ Correct!';
                    feedbackEl.className = 'question-feedback correct';
                    feedbackEl.style.display = 'block';
                    correctCount++;
                } else {
                    // Find the correct answer text
                    const correctOptionLabel = document.querySelector(`label[for="${id}-b"]`).textContent;
                    feedbackEl.textContent = `✗ Incorrect. The correct answer is: ${correctOptionLabel}`;
                    feedbackEl.className = 'question-feedback incorrect';
                    feedbackEl.style.display = 'block';
                }
            } else {
                feedbackEl.textContent = 'Please select an answer.';
                feedbackEl.className = 'question-feedback warning';
                feedbackEl.style.display = 'block';
            }
        });
        
        // Show overall feedback
        const feedbackContainer = document.getElementById('idiomFeedback');
        feedbackContainer.textContent = `You got ${correctCount} out of ${totalCount} idioms correct!`;
        feedbackContainer.className = 'feedback-message show';
        feedbackContainer.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        // Update progress if all correct
        if (correctCount === totalCount) {
            if (typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
            if (typeof showAchievement === 'function') {
                showAchievement('Idiom Challenge Completed!');
            }
        }
    };
}

// Initialize idiom matching
function initIdiomMatching() {
    let selectedTerm = null;
    let selectedDef = null;
    
    window.selectMatch = function(element, type) {
        if (element.classList.contains('correct')) {
            return; // Already matched correctly
        }
        
        if (type === 'term') {
            // Deselect previous term if any
            if (selectedTerm) {
                selectedTerm.classList.remove('selected');
            }
            
            // Select this term
            element.classList.add('selected');
            selectedTerm = element;
        } else {
            // Deselect previous definition if any
            if (selectedDef) {
                selectedDef.classList.remove('selected');
            }
            
            // Select this definition
            element.classList.add('selected');
            selectedDef = element;
        }
        
        // Check if we have both a term and definition selected
        if (selectedTerm && selectedDef) {
            checkMatch();
        }
    };
    
    function checkMatch() {
        const termMatch = selectedTerm.getAttribute('data-match');
        const defMatch = selectedDef.getAttribute('data-match');
        
        if (termMatch === defMatch) {
            // Correct match
            selectedTerm.classList.remove('selected');
            selectedDef.classList.remove('selected');
            
            selectedTerm.classList.add('correct');
            selectedDef.classList.add('correct');
            
            // Check if all items are matched
            const allMatched = document.querySelectorAll('.match-item:not(.correct)').length === 0;
            
            if (allMatched) {
                const feedbackEl = document.getElementById('matchFeedback');
                if (feedbackEl) {
                    feedbackEl.textContent = 'Great job! You matched all the idioms correctly!';
                    feedbackEl.className = 'feedback-message show success';
                    
                    if (typeof updateProgress === 'function') {
                        updateProgress('thinking-language', 10);
                    }
                }
            }
        } else {
            // Incorrect match
            selectedTerm.classList.remove('selected');
            selectedDef.classList.remove('selected');
            
            selectedTerm.classList.add('incorrect');
            selectedDef.classList.add('incorrect');
            
            // Remove incorrect class after a short delay
            setTimeout(() => {
                selectedTerm.classList.remove('incorrect');
                selectedDef.classList.remove('incorrect');
            }, 1000);
        }
        
        // Reset selections
        selectedTerm = null;
        selectedDef = null;
    }
}

// Initialize contraction checking
function initContractionChecking() {
    window.checkContractions = function() {
        const inputs = document.querySelectorAll('.contraction-input');
        let correctCount = 0;
        
        inputs.forEach(input => {
            const correctAnswer = input.getAttribute('data-answer');
            const userAnswer = input.value.trim();
            
            if (userAnswer === correctAnswer) {
                input.style.borderColor = '#4caf50';
                correctCount++;
            } else {
                input.style.borderColor = '#f44336';
            }
        });
        
        const feedbackEl = document.getElementById('contractionFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${inputs.length} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === inputs.length ? 'success' : 'error');
            
            if (correctCount === inputs.length && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
        }
    };
}

// Initialize phrasal verb checking
function initPhrasalVerbChecking() {
    window.checkPhrasalVerbs = function() {
        const inputs = document.querySelectorAll('.phrasal-input');
        let correctCount = 0;
        
        inputs.forEach(input => {
            const correctAnswer = input.getAttribute('data-answer');
            const userAnswer = input.value.trim().toLowerCase();
            
            if (userAnswer === correctAnswer.toLowerCase()) {
                input.style.borderColor = '#4caf50';
                correctCount++;
            } else {
                input.style.borderColor = '#f44336';
            }
        });
        
        const feedbackEl = document.getElementById('phrasalFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${inputs.length} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === inputs.length ? 'success' : 'error');
            
            if (correctCount === inputs.length && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
        }
    };
}

// Initialize editing exercise
function initEditingExercise() {
    window.checkEditing = function() {
        const inputs = document.querySelectorAll('.editing-input');
        let correctCount = 0;
        
        inputs.forEach(input => {
            const correctAnswer = input.getAttribute('data-answer');
            const userAnswer = input.value.trim();
            
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                input.style.borderColor = '#4caf50';
                correctCount++;
            } else {
                input.style.borderColor = '#f44336';
            }
        });
        
        const feedbackEl = document.getElementById('editingFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${inputs.length} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === inputs.length ? 'success' : 'error');
            
            if (correctCount === inputs.length && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
        }
    };
}

// Save reflection
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
    if (typeof updateProgress === 'function') {
        updateProgress('prereading', 15);
    }
}

// Save listening notes
function saveListeningNotes() {
    const notes = document.getElementById('listeningNotes').value.trim();
    const narrative = document.getElementById('narrativeAccount').value.trim();
    
    if (notes.length < 20 || narrative.length < 50) {
        alert('Please write more detailed notes and narrative account.');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    alert('Your notes and narrative account have been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
}

// Save writing
function saveWriting() {
    const writing = document.getElementById('writingPad').value.trim();
    
    if (writing.length < 100) {
        alert('Please write a more detailed report (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your report has been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
}

// Record speaking response
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('In a real implementation, this would record your spoken response using the Web Audio API.');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 10);
    }
}

// Play listening activity
function playListeningActivity() {
    // In a real app, this would play an audio file
    alert('In a real implementation, this would play the audio about the Siege of Leningrad.');
}

// Show resource
function showResource(resourceId) {
    // In a real app, this would show or load a specific resource
    alert(`In a real implementation, this would show the resource: ${resourceId}`);
}
