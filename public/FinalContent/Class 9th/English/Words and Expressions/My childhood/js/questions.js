/**
 * Questions and interactive exercises for Presidents of India
 */

// Reading comprehension questions for Text I
const textIQuestions = [
    {
        question: "What type of student was Gandhi according to the passage?",
        options: [
            "Excellent",
            "Mediocre",
            "Poor",
            "Above average"
        ],
        correctAnswer: 1,
        explanation: "In the passage, Gandhi describes himself as 'I could only have been a mediocre student', indicating that he was an average student."
    },
    {
        question: "What personality trait did young Gandhi have?",
        options: [
            "Outgoing and friendly",
            "Loud and disruptive",
            "Shy and reserved",
            "Aggressive and competitive"
        ],
        correctAnswer: 2,
        explanation: "Gandhi describes himself as 'very shy and avoided all company', indicating he was reserved and preferred to be alone with his books."
    },
    {
        question: "What did the teacher try to do during the spelling test?",
        options: [
            "Help Gandhi by giving him the correct answer",
            "Prompt Gandhi to copy from his neighbor",
            "Punish Gandhi for misspelling the word",
            "Encourage Gandhi to try again"
        ],
        correctAnswer: 1,
        explanation: "The teacher tried to prompt Gandhi with the point of his boot to copy from his neighbor's slate."
    },
    {
        question: "What was Gandhi's attitude toward copying in exams?",
        options: [
            "He thought it was acceptable",
            "He couldn't understand the concept",
            "He thought it was wrong but necessary",
            "He thought teachers should allow it"
        ],
        correctAnswer: 1,
        explanation: "Gandhi says 'I could never learn the art of 'copying'' and misunderstood the teacher's prompt because he thought teachers were there to prevent copying."
    },
    {
        question: "What book made a strong impression on Gandhi?",
        type: "text",
        sampleAnswer: "Shravana Pitribhakti Nataka",
        evaluationFunction: function(answer) {
            const correctAnswer = "shravana pitribhakti nataka";
            return answer.toLowerCase().includes("shravana");
        },
        explanation: "The book that made an indelible impression on Gandhi was Shravana Pitribhakti Nataka, which showed a son carrying his blind parents on a pilgrimage."
    }
];

// Reading comprehension questions for Text II
const textIIQuestions = [
    {
        question: "What has Malcom Gladwell said in his book that Indra Nooyi refers to?",
        options: [
            "Success depends on hard work alone",
            "Who you are cannot be separated from where you came from",
            "Intelligence is the key to success",
            "People should focus on their strengths"
        ],
        correctAnswer: 1,
        explanation: "Indra Nooyi quotes Malcom Gladwell's book Outliers: 'Who you are cannot be separated from where you came from.'"
    },
    {
        question: "What helped Indra Nooyi achieve great success according to her?",
        options: [
            "Her education in the USA",
            "Her position at PepsiCo",
            "Her wonderful upbringing in India",
            "Her natural talent"
        ],
        correctAnswer: 2,
        explanation: "Nooyi specifically mentions that her success wouldn't have happened without her 'wonderful upbringing very much here in India.'"
    },
    {
        question: "What is the first lesson Indra Nooyi talks about in her speech?",
        options: [
            "Work hard for success",
            "Be a lifelong student",
            "Maintain work-life balance",
            "Stay connected to your roots"
        ],
        correctAnswer: 1,
        explanation: "Nooyi's first lesson is 'please be a lifelong student' and she emphasizes the importance of maintaining curiosity."
    },
    {
        question: "According to Indra Nooyi, what quality should we maintain to be a lifelong student?",
        options: [
            "Discipline",
            "Intelligence",
            "Curiosity",
            "Memory"
        ],
        correctAnswer: 2,
        explanation: "Nooyi says 'please remain a lifelong student, don't lose that curiosity' emphasizing that curiosity is essential for lifelong learning."
    },
    {
        question: "How does Indra Nooyi view her job?",
        options: [
            "As a burden",
            "As a temporary position",
            "As a stepping stone to something better",
            "As a Calling and a Passion"
        ],
        correctAnswer: 3,
        explanation: "Nooyi says 'I look at my job not as a job, I look at it as a Calling, as a Passion' showing she views it as much more than just work."
    },
    {
        question: "What obligation does Indra Nooyi talk about in her speech?",
        type: "text",
        sampleAnswer: "The obligation to help others rise and pull others up",
        evaluationFunction: function(answer) {
            const keywords = ["help others rise", "pull others up", "obligation", "responsibility"];
            return keywords.some(keyword => answer.toLowerCase().includes(keyword.toLowerCase()));
        },
        explanation: "Nooyi talks about the obligation for people in positions of power to 'help others rise' and 'pull others up' so they too can achieve greatness."
    }
];

// Vocabulary exercise answers
const vocabularyAnswers = {
    vocab1: "knowledge",
    vocab2: "acceptance",
    vocab3: "separation",
    vocab4: "obligation",
    vocab5: "achievement"
};

// Contraction exercise answers (passive voice)
const contractionAnswers = {
    "are taken": "take",
    "are separated": "separate",
    "are made": "make",
    "is put": "put",
    "is added": "add",
    "is set": "set",
    "are removed": "remove",
    "are hung": "hang"
};

// Phrasal verb exercise answers
const phrasalVerbAnswers = {
    "broke down": "stopped due to engine failure",
    "broke up": "came to an end",
    "broke into": "entered",
    "break away": "leave the mother's grasp",
    "break up": "discard the age-old practices"
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
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Gandhi\'s Autobiography</h3>';
    loadQuestionSet(questionsContainer, textIQuestions, 'textI');
    
    // Then add Text II questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Indra Nooyi\'s Speech</h3>';
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

// Word combinations answers
const wordCombinationsAnswers = {
    'tune-question': 'up',
    'water-question': 'proof',
    'communal-question': 'harmony',
    'sound-question': 'system',
    'felt-question': 'paper',
    'black-question': 'board'
};

// Initialize word combinations checking
function initIdiomMatching() {
    // Add the new function for checking word combinations
    window.checkWordCombinations = function() {
        let correctCount = 0;
        let totalCount = Object.keys(wordCombinationsAnswers).length;
        let answeredCount = 0;
        
        // Check each question
        Object.keys(wordCombinationsAnswers).forEach(questionName => {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (selectedOption) {
                answeredCount++;
                const userAnswer = selectedOption.value;
                const correctAnswer = wordCombinationsAnswers[questionName];
                
                // Check if the answer is correct
                const isCorrect = userAnswer === correctAnswer;
                
                // Update the styling
                const option = selectedOption.closest('.option');
                if (option) {
                    if (isCorrect) {
                        option.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                        option.style.borderLeft = '3px solid #4caf50';
                        correctCount++;
                    } else {
                        option.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                        option.style.borderLeft = '3px solid #f44336';
                        
                        // Find and highlight correct answer
                        const correctOption = document.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`).closest('.option');
                        if (correctOption) {
                            correctOption.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                            correctOption.style.borderLeft = '3px solid #4caf50';
                        }
                    }
                }
            }
        });
        
        // Show feedback message
        const feedbackEl = document.getElementById('wordCombinationsFeedback');
        if (feedbackEl) {
            if (answeredCount < totalCount) {
                feedbackEl.textContent = `Please answer all questions. You've answered ${answeredCount} out of ${totalCount}.`;
                feedbackEl.className = 'feedback-message show warning';
            } else {
                feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
                feedbackEl.className = 'feedback-message show';
                feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
                
                // Update progress if all correct
                if (correctCount === totalCount && typeof updateProgress === 'function') {
                    updateProgress('thinking-language', 10);
                }
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
