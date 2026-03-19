/**
 * Questions and interactive exercises for The Little Girl
 */

// Reading comprehension questions for Text I
const textIQuestions = [
    {
        question: "Why was Scout, the little girl upset?",
        options: [
            "She didn't like being told what to do.",
            "She didn't want to read with her father.",
            "She didn't want to stop reading with her father.",
            "She didn't want to read with her teacher."
        ],
        correctAnswer: 2,
        explanation: "Scout was upset because her teacher said her father taught her reading all wrong, so she thought they couldn't read together anymore."
    },
    {
        question: "How did Atticus, her father, react to her outburst?",
        options: [
            "He was angry.",
            "He was patient.",
            "He was annoyed.",
            "He was sad."
        ],
        correctAnswer: 1,
        explanation: "Atticus reacted with patience, sitting down to listen to her, examining the wisteria vine, and finding a compromise to make his daughter feel better."
    },
    {
        question: "What advice did Atticus give to his little girl to cope with situations that might upset her?",
        options: [
            "To know and understand that life isn't fair.",
            "To stay calm and then run away from the problem.",
            "To try and see from the other person's point of view.",
            "To face her fears by expressing how she felt."
        ],
        correctAnswer: 2,
        explanation: "Atticus advised Scout to try to understand people by considering things from their point of view - 'climb into his skin and walk around in it'."
    },
    {
        question: "How was the matter eventually resolved?",
        options: [
            "Atticus agreed to allow her to learn from home.",
            "Atticus agreed to continue reading as before.",
            "Atticus agreed to speak to her teacher.",
            "Atticus agreed to allow only the teacher to teach her."
        ],
        correctAnswer: 1,
        explanation: "Atticus resolved the matter by offering a compromise - if Scout would go to school, they would continue reading together every night as before."
    },
    {
        question: "What does the word 'disapprobation' mean in this context?",
        options: [
            "Disapproval",
            "Disturbance",
            "Disgrace",
            "Disorientation"
        ],
        correctAnswer: 0,
        explanation: "In this context, 'disapprobation' means disapproval - Atticus was worried that school authorities would disapprove of their reading activities."
    },
    {
        question: "Why did Atticus ask Scout not to mention their agreement to her teacher?",
        options: [
            "He respected the wishes of the teacher yet didn't want to disappoint his daughter.",
            "He might get into trouble with the teacher who might come after him.",
            "He only cared for his daughter and thought the teacher was incorrect.",
            "He was afraid that the teacher may not like it and Scout might get into trouble."
        ],
        correctAnswer: 0,
        explanation: "Atticus respected the teacher's authority while also wanting to maintain his reading relationship with his daughter, so he asked Scout to keep their agreement private."
    }
];

// Reading comprehension questions for Text II
const textIIQuestions = [
    {
        question: "What made Alice Walker open a savings account in High School?",
        type: "text",
        sampleAnswer: "She learned from her father to see bits of paper (like deposit slips and cheques) as a way to escape the life her father knew. Her father taught her how to write deposit slips and cheques.",
        evaluationFunction: function(answer) {
            const keywords = ["father", "taught", "bits of paper", "escape", "deposit", "cheque", "way to escape"];
            const userText = answer.toLowerCase();
            return keywords.some(word => userText.includes(word.toLowerCase()));
        },
        explanation: "Alice Walker opened a savings account in high school because her father taught her to see 'bits of paper' (financial documents) as a way to escape the life he knew."
    },
    {
        question: "What lesson did her father give her on telling the truth?",
        type: "text",
        sampleAnswer: "Her father taught her that telling the truth did not always mean a beating, even though many of her truths must have grieved him before the end.",
        evaluationFunction: function(answer) {
            const keywords = ["truth", "beating", "not always", "grieved"];
            const userText = answer.toLowerCase();
            return keywords.some(word => userText.includes(word.toLowerCase()));
        },
        explanation: "Her father taught her that telling the truth did not always result in punishment (a beating), even though her honesty may have caused him grief."
    },
    {
        question: "What does 'dancing in yoga meditation' mean in the poem?",
        options: [
            "To cook relaxedly and with full concentration.",
            "To cook while doing yoga exercises.",
            "To cook food after doing yoga meditation.",
            "Take lessons in cooking by joining class on yoga meditation."
        ],
        correctAnswer: 0,
        explanation: "In the poem, 'dancing in yoga meditation' describes her father's cooking style - relaxed, focused, and graceful, like someone performing a mindful dance."
    },
    {
        question: "What would her father have admired about the woman she has become?",
        type: "text",
        sampleAnswer: "Her father would have admired her for cooking, writing, chopping wood, and staring into the fire. She mentions that she now looks and cooks just like him.",
        evaluationFunction: function(answer) {
            const keywords = ["cooking", "writing", "chopping wood", "staring", "fire", "just like him"];
            const userText = answer.toLowerCase();
            return keywords.some(word => userText.includes(word.toLowerCase()));
        },
        explanation: "According to the poem, her father would have admired the woman she's become: someone who cooks like him, writes, chops wood, and stares into the fire."
    },
    {
        question: "Why do you think the title of the poem is 'Poem at Thirty-Nine'?",
        type: "text",
        sampleAnswer: "The title likely indicates that the poet wrote this poem when she was 39 years old, reflecting on her relationship with her father who has passed away. At this age, she realizes how much she has become like him.",
        evaluationFunction: function(answer) {
            const keywords = ["age", "thirty-nine", "39", "wrote", "reflection", "passed", "father", "relationship"];
            const userText = answer.toLowerCase();
            return keywords.some(word => userText.includes(word.toLowerCase()));
        },
        explanation: "The title 'Poem at Thirty-Nine' suggests the poet wrote this at age 39, reflecting on her father who has passed away and recognizing the similarities between them at this point in her life."
    }
];

// Vocabulary exercise answers
const vocabularyAnswers = {
    vocab1: "watched",
    vocab2: "watch",
    vocab3: "view",
    vocab4: "watch",
    vocab5: "observed",
    vocab6: "catch",
    vocab7: "glimpse"
};

// Look usage answers
const lookUsageAnswers = {
    look1: "glanced",
    look2: "peeping",
    look3: "watched",
    look4: "stare"
};

// Reporting verbs answers
const reportingVerbAnswers = {
    report1: "A", // advised
    report2: "C", // reminded
    report3: "A"  // offered
};

// Editing exercise answers
const editingAnswers = {
    edit1: ".",
    edit2: "\"field day\"",
    edit3: "-",
    edit4: "."
};

// Initialize questions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load text questions when the thinking-text module is shown
    const textQuestionsContainer = document.getElementById('textQuestions');
    if (textQuestionsContainer) {
        loadTextQuestions(textQuestionsContainer);
    }
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
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on "To Kill a Mockingbird" Extract</h3>';
    loadQuestionSet(questionsContainer, textIQuestions, 'textI');
    
    // Then add Text II questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on "Poem at Thirty-Nine"</h3>';
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

// Check vocabulary answers
function checkVocabulary() {
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
}

// Check look usage answers
function checkLookUsage() {
    let correctCount = 0;
    let totalCount = 0;
    
    Object.keys(lookUsageAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            totalCount++;
            const isCorrect = select.value === lookUsageAnswers[id];
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            if (isCorrect) correctCount++;
        }
    });
    
    const feedbackEl = document.getElementById('lookUsageFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
}

// Check reporting verbs answers
function checkReportingVerbs() {
    let correctCount = 0;
    let totalCount = 0;
    
    Object.keys(reportingVerbAnswers).forEach(id => {
        const selected = document.querySelector(`input[name="${id}"]:checked`);
        if (selected) {
            totalCount++;
            const isCorrect = selected.value === reportingVerbAnswers[id];
            selected.parentNode.style.backgroundColor = isCorrect ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)';
            if (isCorrect) correctCount++;
        }
    });
    
    const feedbackEl = document.getElementById('reportingVerbsFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
}

// Check editing exercise
function checkEditing() {
    let correctCount = 0;
    let totalCount = 0;
    
    const editingInputs = document.querySelectorAll('.editing-input');
    editingInputs.forEach(input => {
        totalCount++;
        const correctAnswer = input.getAttribute('data-answer');
        const userAnswer = input.value.trim();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            correctCount++;
        } else {
            input.style.borderColor = '#f44336';
        }
    });
    
    const feedbackEl = document.getElementById('editingFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
}
