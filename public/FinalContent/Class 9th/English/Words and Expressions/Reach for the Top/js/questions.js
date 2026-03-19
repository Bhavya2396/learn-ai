/**
 * Questions and interactive exercises for Unit 7: Reach for the Top
 */

// Reading comprehension questions for Text I
const textIQuestions = [
    {
        question: "Why is Leander's victory at Atlanta significant?",
        options: [
            "Because he was playing on his favorite surface",
            "Because he became the first Indian to win an individual medal in 44 years",
            "Because he was playing against a higher-ranked player",
            "Because he received a standing ovation"
        ],
        correctAnswer: 1,
        explanation: "As mentioned in the text, 'On 3 August 1996, Leander Paes became the first Indian to win an individual medal in 44 years' which makes his victory historically significant."
    },
    {
        question: "How was his father's Olympic triumph in 1972 different from his own?",
        options: [
            "His father won a gold medal, while Leander won bronze",
            "His father won in Munich, while Leander won in Atlanta",
            "His father's medal was as part of the hockey team, while Leander's was in an individual event",
            "His father was not playing for India"
        ],
        correctAnswer: 2,
        explanation: "As stated in the passage, 'Leander's father had won a bronze medal in the Munich Olympics 1972 as a member of the Indian hockey team. It is creditable to Leander Paes as he got it in an individual event.'"
    },
    {
        question: "How did Leander's coach and doubles teammate help him?",
        options: [
            "They gave him financial support",
            "They helped with his training and kept him in a good frame of mind",
            "They played against him in practice matches",
            "They arranged for his travel to Atlanta"
        ],
        correctAnswer: 1,
        explanation: "Leander said, 'They have helped me out and given me advice and kept me in good frame of mind.' This shows they provided mental and technical support."
    },
    {
        question: "What qualities make Leander a successful player?",
        options: [
            "His height and physical strength",
            "His family background in sports",
            "His willingness to take chances, swift reflexes, mental strength, and not accepting defeat easily",
            "His wealth and financial resources"
        ],
        correctAnswer: 2,
        explanation: "The text clearly states: 'He succeeds because of his willingness to take his chances, swift reflexes and mental strength, and the fact that he does not accept defeat easily.'"
    },
    {
        question: "What advantages did Leander have in India for Davis Cup victories?",
        type: "text",
        sampleAnswer: "He was playing on his favourite surface (grass) and enjoyed home support.",
        evaluationFunction: function(answer) {
            const lowerAnswer = answer.toLowerCase();
            return lowerAnswer.includes("grass") && lowerAnswer.includes("home support");
        },
        explanation: "The text mentions that 'some of his Davis Cup victories were achieved because he was playing on his favourite surface, grass and enjoyed home support.'"
    },
    {
        question: "What motivated Leander to win at Atlanta despite lacking some advantages?",
        type: "text",
        sampleAnswer: "He was playing for his country without expecting anything in return, which set him apart.",
        evaluationFunction: function(answer) {
            const lowerAnswer = answer.toLowerCase();
            return (lowerAnswer.includes("country") || lowerAnswer.includes("india")) && 
                   (lowerAnswer.includes("don't expect") || lowerAnswer.includes("not expect"));
        },
        explanation: "The text quotes Leander saying, 'When I am playing for my country I don't expect anything.' The author notes that 'That straightaway sets him apart.'"
    }
];

// Reading comprehension questions for Text II
const textIIQuestions = [
    {
        question: "Which line from the poem refers to 'everybody should be able to learn'?",
        options: [
            "Where the mind is without fear and the head is held high",
            "Where knowledge is free",
            "Where the world has not been broken up into fragments",
            "Where words come out from the depth of truth"
        ],
        correctAnswer: 1,
        explanation: "The line 'Where knowledge is free' directly relates to the idea that education and learning should be accessible to everyone."
    },
    {
        question: "Which lines refer to 'there ought not be a division among people on the basis of caste, class, creed, religion or any other such basis'?",
        options: [
            "Where the mind is without fear and the head is held high",
            "Where knowledge is free",
            "Where the world has not been broken up into fragments by narrow domestic walls",
            "Where tireless striving stretches its arms towards perfection"
        ],
        correctAnswer: 2,
        explanation: "The lines 'Where the world has not been broken up into fragments by narrow domestic walls' refer to divisions in society based on caste, religion, etc."
    },
    {
        question: "Which line means 'people should be honest and speak out their heart'?",
        options: [
            "Where the mind is without fear and the head is held high",
            "Where words come out from the depth of truth",
            "Where tireless striving stretches its arms towards perfection",
            "Where the clear stream of reason has not lost its way"
        ],
        correctAnswer: 1,
        explanation: "The line 'Where words come out from the depth of truth' refers to honesty in expression and speech."
    },
    {
        question: "Which lines suggest 'actions should stem from logic and not superstitions and beliefs, leading to progress'?",
        options: [
            "Where the mind is led forward by thee into ever-widening thought and action",
            "Where the clear stream of reason has not lost its way into the dreary desert sand of dead habits",
            "Where tireless striving stretches its arms towards perfection",
            "Where knowledge is free"
        ],
        correctAnswer: 1,
        explanation: "The lines 'Where the clear stream of reason has not lost its way into the dreary desert sand of dead habits' suggest that rational thinking should guide actions rather than superstitions or outdated practices."
    },
    {
        question: "Which lines refer to 'people should be free of fear and oppression'?",
        type: "text",
        sampleAnswer: "Where the mind is without fear and the head is held high",
        evaluationFunction: function(answer) {
            const lowerAnswer = answer.toLowerCase();
            return lowerAnswer.includes("mind") && lowerAnswer.includes("fear") && lowerAnswer.includes("head") && lowerAnswer.includes("high");
        },
        explanation: "The very first line 'Where the mind is without fear and the head is held high' directly addresses freedom from fear and oppression."
    },
    {
        question: "Who is the poet addressing in this poem and what is he asking for?",
        type: "text",
        sampleAnswer: "The poet is addressing God (my Father) and asking him to awaken his country (India) into freedom.",
        evaluationFunction: function(answer) {
            const lowerAnswer = answer.toLowerCase();
            return (lowerAnswer.includes("god") || lowerAnswer.includes("father")) && 
                   (lowerAnswer.includes("awake") || lowerAnswer.includes("awaken")) && 
                   lowerAnswer.includes("country") && 
                   (lowerAnswer.includes("freedom") || lowerAnswer.includes("free"));
        },
        explanation: "In the last line 'Into that heaven of freedom, my Father, let my country awake', the poet addresses 'my Father' (God) and asks for his country to awaken into freedom."
    }
];

// Vocabulary exercise answers
const vocabularyAnswers = {
    vocab1: "contentment",
    vocab2: "custom",
    vocab3: "assent",
    vocab4: "endurance",
    vocab5: "culmination"
};

// Idiom exercise answers
const idiomAnswers = {
    idiom1: "hardWorker",
    idiom2: "moneyMaker",
    idiom3: "unfairTrial",
    idiom4: "careless",
    idiom5: "bePatient"
};

// Clause exercise answers
const clauseAnswers = {
    clause1: "alcohol",
    clause2: "stairs",
    clause3: "left",
    clause4: "tripped",
    clause5: "emergency"
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
    
    // Initialize idiom checking
    initIdiomChecking();
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
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Leander Paes</h3>';
    loadQuestionSet(questionsContainer, textIQuestions, 'textI');
    
    // Then add Text II questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on "Where the Mind is Without Fear"</h3>';
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

// Initialize idiom and clause checking
function initIdiomChecking() {
    // Check idioms function
    window.checkIdioms = function() {
        let correctCount = 0;
        let totalCount = 0;
        
        Object.keys(idiomAnswers).forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                totalCount++;
                const isCorrect = select.value === idiomAnswers[id];
                select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
                if (isCorrect) correctCount++;
            }
        });
        
        const feedbackEl = document.getElementById('idiomFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
            
            if (correctCount === totalCount && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
        }
    };
    
    // Check clauses function
    window.checkClauses = function() {
        let correctCount = 0;
        let totalCount = 0;
        
        Object.keys(clauseAnswers).forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                totalCount++;
                const isCorrect = select.value === clauseAnswers[id];
                select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
                if (isCorrect) correctCount++;
            }
        });
        
        const feedbackEl = document.getElementById('clauseFeedback');
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

// Check editing answers
function checkEditing() {
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
}
