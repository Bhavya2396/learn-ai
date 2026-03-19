/**
 * Questions and interactive exercises for The Future Cars
 */

// Reading comprehension questions for Text I
const textIQuestions = [
    {
        question: "How will the self-driving cars or driverless cars be safe?",
        options: [
            "They will have police officers on board",
            "They will communicate with each other to avoid accidents and traffic jams",
            "They will drive at very low speeds",
            "They will only be allowed on empty roads"
        ],
        correctAnswer: 1,
        explanation: "According to the text, \"Cars will communicate with each other to avoid accidents and traffic jams.\" This communication between vehicles will help make them safer."
    },
    {
        question: "What do you understand by \"cars will communicate with each other\"?",
        options: [
            "Cars will have audio systems to talk to nearby vehicles",
            "Drivers will be able to talk to each other through a system",
            "Cars will share data and information electronically to coordinate movement",
            "Cars will use horns to signal to each other"
        ],
        correctAnswer: 2,
        explanation: "The text explains that self-driving cars will electronically communicate with each other to avoid accidents and traffic jams, which means they'll exchange data to coordinate their movements."
    },
    {
        question: "What are the advantages of self-driving cars?",
        options: [
            "They are cheaper to manufacture",
            "They can be driven by unlicensed drivers",
            "They reduce the need for parking spaces and allow passengers to do other activities during travel",
            "They run exclusively on fossil fuels"
        ],
        correctAnswer: 2,
        explanation: "According to the text, self-driving cars will \"dramatically reduce the need for parking\" and \"riders will be able to spend commuting time on other activities like work, education and socialising.\""
    },
    {
        question: "What is the use of GPS?",
        options: [
            "It is exclusively used by the military",
            "It is used to hail taxis and get mapping directions",
            "It is only used in airplanes",
            "It can only be accessed by government agencies"
        ],
        correctAnswer: 1,
        explanation: "The text states that GPS \"is now being used to hail taxis, get mapping directions, etc.\" although it originally started as military technology."
    },
    {
        question: "What is a drone? What are its advantages?",
        type: "text",
        sampleAnswer: "A drone is an unmanned aerial vehicle that originated as military technology but is now used for commercial and consumer applications. Advantages include inspecting infrastructure like bridges and power lines, surveying disaster areas, fighting animal poaching, and delivering medical supplies to remote villages.",
        evaluationFunction: function(answer) {
            const keyPoints = ["unmanned", "aerial", "vehicle", "infrastructure", "inspect", "survey", "disaster", "medical supplies", "remote"];
            const userAnswer = answer.toLowerCase();
            const matchCount = keyPoints.filter(point => userAnswer.includes(point.toLowerCase())).length;
            return matchCount >= 4; // Must include at least 4 key points
        },
        explanation: "Drones are unmanned aerial vehicles that can be used for inspecting infrastructure, surveying disaster areas, fighting poaching, and delivering medical supplies to remote locations."
    }
];

// Reading comprehension questions for Text II
const textIIQuestions = [
    {
        question: "Who is Sophia and who is her creator?",
        options: [
            "Sophia is a humanoid robot created by David Hanson of Hanson Robotics",
            "Sophia is an AI software created by Shah Rukh Khan",
            "Sophia is a virtual assistant created by Bill Gates",
            "Sophia is a robot created by Mark Zuckerberg"
        ],
        correctAnswer: 0,
        explanation: "According to the text, Sophia is \"the world's first humanoid robot\" and is \"the creation of American scientist David Hanson of Hanson Robotics of Hong Kong.\""
    },
    {
        question: "Why were the audience excited on the second day of the World Congress on Information Technology–2018?",
        options: [
            "Because Shah Rukh Khan was present",
            "Because there was a demonstration of flying cars",
            "Because of Sophia's witty answers to rapid-fire queries",
            "Because of the unveiling of a new technology"
        ],
        correctAnswer: 2,
        explanation: "The text states that Sophia \"enthralled the audiences on the second day of the World Congress on Information Technology (WCIT)–2018 with her witty answers to the rapid-fire queries.\""
    },
    {
        question: "The favourite tech person in Sophia's life is:",
        options: [
            "Shah Rukh Khan",
            "David Hanson",
            "Bill Gates",
            "Mark Zuckerberg"
        ],
        correctAnswer: 1,
        explanation: "According to the text, when asked about her favorite tech person, Sophia mentioned \"David (Hanson), her creator\" and specifically noted \"not Bill Gates or Mark Zuckerberg.\""
    },
    {
        question: "What changes does the humanoid robot want to see in the world?",
        options: [
            "She wants humans to develop a feeling of \"love for all\"",
            "She wants more robots to be created",
            "She wants to see flying cars become common",
            "She wants to replace human workers with robots"
        ],
        correctAnswer: 0,
        explanation: "The text states, \"On being asked if she wanted to see any change in the world, Sophia said, she would like people to develop a feeling of 'love for all'.\""
    },
    {
        question: "Which of the following statements regarding Sophia is true?",
        options: [
            "Sophia plans to kill the human race in the near future",
            "She can express her emotional feelings freely",
            "Hong Kong is her favourite place",
            "Sophia has a bank account"
        ],
        correctAnswer: 2,
        explanation: "The text states that \"Hong Kong continues to be her favourite place, because she was born there and has been with the Hanson Robotics family.\""
    },
    {
        question: "What are David's assertions as far as robots are concerned?",
        type: "text",
        sampleAnswer: "David asserts that robots would never be a thing of worry for mankind. He says they will be friends and there should be mutual trust and respect between humans and robots.",
        evaluationFunction: function(answer) {
            const keyPhrases = ["not worry", "never worry", "friends", "mutual trust", "respect"];
            const userAnswer = answer.toLowerCase();
            return keyPhrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
        },
        explanation: "David asserts that \"robots would never be a thing of worry for the mankind. They will be friends. There should be mutual trust and respect between humans and robots\"."
    }
];

// Vocabulary exercise answers
const vocabularyAnswers = {
    vocab1: "virtual",
    vocab2: "commute",
    vocab3: "welfare",
    vocab4: "autonomous",
    vocab5: "mainstream"
};

// Contraction exercise answers
const contractionAnswers = {
    "unless": "I won't be able to assist you unless",
    "if": "I will take this job if",
    "If": "If he advertises",
    "Unless": "Unless it is very cold",
    "if": "The thief threatened to kill us if",
    "Unless": "Unless you use high quality material"
};

// Phrasal verb exercise answers
const phrasalVerbAnswers = {
    "misuse": "use",
    "disagree": "agree",
    "disengage": "engage",
    "misunderstand": "understand",
    "unfold": "fold"
};

// Suffix exercise answers
const suffixAnswers = {
    suffix1: "able", // comfortable
    suffix2: "ny",   // sunny
    suffix3: "able", // readable
    suffix4: "ful",  // beautiful
    suffix5: "able", // enjoyable
    suffix6: "ful"   // helpful
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
    
    // Initialize suffix checking
    initSuffixChecking();
    
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
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Text I: The Future Cars</h3>';
    loadQuestionSet(questionsContainer, textIQuestions, 'textI');
    
    // Then add Text II questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Text II: Humanoid Robot Sophia</h3>';
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
}

// Initialize suffix checking
function initSuffixChecking() {
    window.checkSuffixes = function() {
        let correctCount = 0;
        let totalCount = Object.keys(suffixAnswers).length;
        
        // Check each suffix question
        Object.keys(suffixAnswers).forEach(name => {
            const selectedOption = document.querySelector(`input[name="${name}"]:checked`);
            
            if (selectedOption) {
                const userAnswer = selectedOption.value;
                const isCorrect = userAnswer === suffixAnswers[name];
                
                // Style the parent label based on correctness
                const parentLabel = selectedOption.parentElement;
                
                // Clear previous styles from all options in this question group
                document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
                    radio.parentElement.classList.remove('correct-option', 'incorrect-option');
                });
                
                // Apply appropriate style
                if (isCorrect) {
                    parentLabel.classList.add('correct-option');
                    correctCount++;
                } else {
                    parentLabel.classList.add('incorrect-option');
                    
                    // Highlight the correct answer
                    document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
                        if (radio.value === suffixAnswers[name]) {
                            radio.parentElement.classList.add('correct-option');
                        }
                    });
                }
            }
        });
        
        // Display feedback
        const feedbackEl = document.getElementById('suffixFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
            
            // Update progress if all correct
            if (correctCount === totalCount && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
        }
    };
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
        console.log("checkPhrasalVerbs function called"); // Debug logging
        
        const inputs = document.querySelectorAll('.phrasal-input');
        console.log(`Found ${inputs.length} prefixes inputs`); // Debug logging
        
        let correctCount = 0;
        
        inputs.forEach((input, index) => {
            const correctAnswer = input.getAttribute('data-answer');
            const userAnswer = input.value.trim().toLowerCase();
            
            console.log(`Checking input ${index+1}: User: "${userAnswer}", Correct: "${correctAnswer}"`); // Debug logging
            
            if (userAnswer === correctAnswer.toLowerCase()) {
                input.style.borderColor = '#4caf50';
                correctCount++;
                console.log(`Input ${index+1} is correct`);
            } else {
                input.style.borderColor = '#f44336';
                console.log(`Input ${index+1} is incorrect`);
            }
        });
        
        const feedbackEl = document.getElementById('phrasalFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${inputs.length} correct!`;
            
            // First reset classes then add the new ones
            feedbackEl.className = '';
            feedbackEl.classList.add('feedback-message');
            feedbackEl.classList.add('show');
            feedbackEl.classList.add(correctCount === inputs.length ? 'success' : 'error');
            
            // Triple-ensure the feedback is visible with multiple methods
            feedbackEl.style.display = 'block';
            feedbackEl.style.visibility = 'visible';
            feedbackEl.style.opacity = '1';
            
            console.log("Feedback message set:", feedbackEl.textContent); // Debug logging
            
            if (correctCount === inputs.length && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
                console.log("All correct! Updating progress.");
            }
        } else {
            console.error("Feedback element not found: #phrasalFeedback");
        }
    };
}

// Initialize editing exercise
function initEditingExercise() {
    window.checkEditing = function() {
        console.log("checkEditing function called"); // Debug logging
        
        const inputs = document.querySelectorAll('.editing-input');
        console.log(`Found ${inputs.length} editing inputs`); // Debug logging
        
        let correctCount = 0;
        
        inputs.forEach((input, index) => {
            const correctAnswer = input.getAttribute('data-answer');
            const userAnswer = input.value.trim();
            
            console.log(`Checking input ${index+1}: User: "${userAnswer}", Correct: "${correctAnswer}"`); // Debug logging
            
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                input.style.borderColor = '#4caf50';
                correctCount++;
                console.log(`Input ${index+1} is correct`);
            } else {
                input.style.borderColor = '#f44336';
                console.log(`Input ${index+1} is incorrect`);
            }
        });
        
        const feedbackEl = document.getElementById('editingFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${inputs.length} correct!`;
            
            // First reset classes then add the new ones
            feedbackEl.className = '';
            feedbackEl.classList.add('feedback-message');
            feedbackEl.classList.add('show');
            feedbackEl.classList.add(correctCount === inputs.length ? 'success' : 'error');
            
            // Triple-ensure the feedback is visible with multiple methods
            feedbackEl.style.display = 'block';
            feedbackEl.style.visibility = 'visible';
            feedbackEl.style.opacity = '1';
            
            console.log("Feedback message set:", feedbackEl.textContent); // Debug logging
            
            // Check if all 4 answers are correct (after removing the 'go' item)
            if (correctCount === inputs.length && inputs.length === 4 && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
                console.log("All correct! Updating progress.");
            }
        } else {
            console.error("Feedback element not found: #editingFeedback");
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