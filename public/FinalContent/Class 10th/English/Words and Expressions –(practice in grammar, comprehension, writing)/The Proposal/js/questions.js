/**
 * Questions and interactive exercises for The Proposal interactive lesson
 */

// Reading comprehension questions for Text I (Anger Management)
const textIQuestions = [
    {
        question: "What do you understand by the word 'anger'?",
        type: "text",
        sampleAnswer: "Anger is a normal and healthy emotion that is the absence of peace with oneself, people or situations around us. It can be expressed either by being assertive or aggressive.",
        evaluationFunction: function(answer) {
            const keywords = ["emotion", "peace", "assertive", "aggressive", "normal", "healthy"];
            const userText = answer.toLowerCase();
            return keywords.some(keyword => userText.includes(keyword));
        },
        explanation: "Anger is described in the text as a normal and healthy emotion that represents the absence of peace with oneself, people or situations around us."
    },
    {
        question: "List any four strategies to manage anger.",
        type: "text",
        sampleAnswer: "1. Take five deep breaths 2. Count up to ten 3. Drink water 4. Change your place 5. Get physically active 6. Do funny dances or clapping 7. Take a walk 8. Make funny faces at the mirror",
        evaluationFunction: function(answer) {
            const strategies = ["breath", "count", "water", "place", "active", "dance", "clap", "walk", "mirror", "physical"];
            const userText = answer.toLowerCase();
            const matchedStrategies = strategies.filter(strategy => userText.includes(strategy));
            return matchedStrategies.length >= 3;
        },
        explanation: "The text mentions several strategies including taking deep breaths, counting to ten, drinking water, changing place, getting physically active, doing funny dances, clapping, walking, and making funny faces at the mirror."
    },
    {
        question: "How can you develop strengths of character as given in the passage above?",
        type: "text",
        sampleAnswer: "By realizing your own shortcomings, avoiding holding grudges with people, learning when to seek help from others, and increasing your capacity to tolerate and understand others.",
        evaluationFunction: function(answer) {
            const keywords = ["shortcomings", "grudge", "help", "tolerate", "understand", "character"];
            const userText = answer.toLowerCase();
            return keywords.some(keyword => userText.includes(keyword));
        },
        explanation: "The passage suggests developing character strengths by realizing your shortcomings, avoiding grudges, seeking help when needed, and increasing tolerance and understanding."
    },
    {
        question: "Anger management helps you in (Tick the correct answer.) —",
        options: [
            "remaining always happy",
            "developing strength of character",
            "remaining stress free",
            "learning how to respond to the situation"
        ],
        correctAnswer: 1,
        explanation: "The passage emphasizes that anger management helps in developing strength of character, learning how to respond to situations, and remaining stress-free."
    },
    {
        question: "What is under our control? How can we make it a positive one?",
        type: "text",
        sampleAnswer: "The only thing we can control is our response to circumstances, people or situations. We can make it positive by increasing our capacity to tolerate, ability to understand, and learning to nurture love for others.",
        evaluationFunction: function(answer) {
            const keywords = ["response", "control", "tolerate", "understand", "love", "positive"];
            const userText = answer.toLowerCase();
            return keywords.some(keyword => userText.includes(keyword));
        },
        explanation: "The text states that we can only control our response to situations, and we can make it positive by increasing tolerance, understanding, and nurturing love for others."
    }
];

// Reading comprehension questions for Text II (On Violence)
const textIIQuestions = [
    {
        question: "What is the physical violence that J. Krishnamurti is talking about?",
        type: "text",
        sampleAnswer: "Physical violence includes killing another, hurting other people consciously or deliberately, saying cruel things full of antagonism and hate, and all forms of outward violence between people.",
        evaluationFunction: function(answer) {
            const keywords = ["kill", "hurt", "cruel", "antagonism", "hate", "physical", "violence"];
            const userText = answer.toLowerCase();
            return keywords.some(keyword => userText.includes(keyword));
        },
        explanation: "Physical violence is described as killing others, hurting people consciously or deliberately, saying cruel things full of antagonism and hate."
    },
    {
        question: "What is the violence that cannot be expressed?",
        type: "text",
        sampleAnswer: "Inward violence - the violence inside us where we dislike people, hate people, criticize people, and are always quarrelling and battling with ourselves and others inwardly.",
        evaluationFunction: function(answer) {
            const keywords = ["inward", "inside", "dislike", "hate", "criticize", "quarrel", "battle"];
            const userText = answer.toLowerCase();
            return keywords.some(keyword => userText.includes(keyword));
        },
        explanation: "The violence that cannot be expressed is inward violence - the internal conflicts, dislikes, hatred, and criticism that we carry within ourselves."
    },
    {
        question: "War, the ultimate violence, could be due to (Tick the correct options) —",
        options: [
            "difference of ideas",
            "religious principles",
            "nationalities",
            "the feeling to protect a little piece of land",
            "all of the above",
            "none of the above"
        ],
        correctAnswer: 4,
        explanation: "The text states that war is the ultimate violence caused by killing for ideas, religious principles, nationalities, and to preserve a little piece of land - so all of the above are correct."
    },
    {
        question: "How has J. Krishnamurti given the feelings of the rich and the poor in the given paragraph?",
        type: "text",
        sampleAnswer: "The rich want to keep people poor, while the poor want to get rich and in the process hate the rich. This creates a cycle of violence and antagonism between the two groups.",
        evaluationFunction: function(answer) {
            const keywords = ["rich", "poor", "keep", "hate", "cycle", "violence", "antagonism"];
            const userText = answer.toLowerCase();
            return keywords.some(keyword => userText.includes(keyword));
        },
        explanation: "Krishnamurti describes how the rich want to keep people poor, while the poor want to get rich and hate the rich in the process, creating a cycle of violence."
    },
    {
        question: "What is the role of education in a human being's life?",
        type: "text",
        sampleAnswer: "Education should help you go beyond violence and become a really beautiful, healthy, sane, rational human being, not just pass examinations and get a job. It should help create a new culture based on peace rather than violence.",
        evaluationFunction: function(answer) {
            const keywords = ["beyond", "violence", "beautiful", "healthy", "sane", "rational", "culture", "peace"];
            const userText = answer.toLowerCase();
            return keywords.some(keyword => userText.includes(keyword));
        },
        explanation: "Education should help individuals transcend violence and become beautiful, healthy, sane, rational human beings, creating a new culture based on peace rather than violence."
    },
    {
        question: "How, as a student, will you create a new world?",
        type: "text",
        sampleAnswer: "As a student, I will work to create a new world by rejecting violence, building understanding and tolerance, promoting peace and love, and not following the old patterns of violence and aggression.",
        evaluationFunction: function(answer) {
            const keywords = ["reject", "violence", "understanding", "tolerance", "peace", "love", "new", "world"];
            const userText = answer.toLowerCase();
            return keywords.some(keyword => userText.includes(keyword));
        },
        explanation: "Students can create a new world by rejecting violence, promoting understanding and tolerance, and building a culture based on peace and love rather than aggression."
    }
];

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
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Anger Management</h3>';
    loadQuestionSet(questionsContainer, textIQuestions, 'textI');
    
    // Then add Text II questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Violence</h3>';
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
    
    // Provide audio feedback
    if (window.narrator) {
        window.narrator.speak(`You got ${correctCount} out of ${questions.length} questions correct!`);
    }
}
