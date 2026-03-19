/**
 * Questions and interactive exercises for Unit 4: Let's Begin
 */

// Reading comprehension questions for Text I (The World as I See It)
const textIQuestions = [
    {
        question: "What is responsible for the present degradation of individual development?",
        options: [
            "Excessive personal freedom",
            "The development of industry and machinery making the struggle for existence more severe",
            "Poor education systems",
            "Lack of material security"
        ],
        correctAnswer: 1,
        explanation: "As stated in the text, 'the present symptoms of decadence are explained by the fact that the development of industry and machinery has made the struggle for existence very much more severe, greatly to the detriment of the free development of the individual.'"
    },
    {
        question: "What is the meaning of development in relation to individuals?",
        options: [
            "Earning more money",
            "Having more free time",
            "Personal growth and self-realization",
            "Achieving material wealth"
        ],
        correctAnswer: 2,
        explanation: "Einstein suggests that development of the individual refers to personal growth and self-realization that can occur when one has 'security and spare time and energy' at their command."
    },
    {
        question: "What is the 'planned division of labour'?",
        options: [
            "Assigning specific jobs to people based on their skills",
            "Organizing work distribution to meet community needs while ensuring individual security",
            "Everyone doing equal amounts of work",
            "Eliminating unnecessary jobs"
        ],
        correctAnswer: 1,
        explanation: "In the text, the 'planned division of labour' refers to organizing work in a way that meets community needs while also providing material security for individuals."
    },
    {
        question: "What does the phrase 'symptoms of decadence' mean in the opening line?",
        options: [
            "Diagnosis of degradation",
            "Warning signs of depravity",
            "Signs of prosperity",
            "Diagnosis of indifference"
        ],
        correctAnswer: 1,
        explanation: "In this context, 'symptoms of decadence' refers to the warning signs of moral or cultural decline characterized by excessive indulgence in pleasure or luxury."
    },
    {
        question: "The phrase 'crying necessity' in the opening paragraph means:",
        options: [
            "Urgent need",
            "Weeping need",
            "Sad need",
            "Average need"
        ],
        correctAnswer: 0,
        explanation: "The phrase 'crying necessity' is an idiomatic expression that means an urgent or pressing need."
    }
];

// Reading comprehension questions for Text II (Einstein-Gandhi Letters)
const textIIQuestions = [
    {
        question: "Albert Einstein admired M. K. Gandhi because:",
        options: [
            "Gandhi discarded the method of violence.",
            "Gandhi showed that it is possible to succeed without violence with those who have discarded the method of violence.",
            "Gandhi showed that it is possible to succeed without violence only with those who have discarded the method of violence.",
            "Gandhi showed that it is possible to succeed without violence with all irrespective of whether they have continued or discarded the method of violence."
        ],
        correctAnswer: 3,
        explanation: "Einstein wrote that Gandhi 'showed through your words, that it is possible to succeed without violence even with those who have not discarded the method of violence', meaning Gandhi succeeded nonviolently even with people who still used violent methods."
    },
    {
        question: "Where did Gandhi wish to meet Einstein?",
        options: [
            "His residence in London",
            "His Ashram in India",
            "His Ashram in London",
            "During his tour to London"
        ],
        correctAnswer: 1,
        explanation: "In Gandhi's response, he wrote 'I do indeed wish that we could meet face to face and that too in India at my Ashram.'"
    },
    {
        question: "Why does Einstein want Gandhi's example to go beyond India?",
        type: "text",
        sampleAnswer: "Einstein hoped that Gandhi's example of nonviolent success would help establish an international authority that could make decisions and replace war conflicts.",
        evaluationFunction: function(answer) {
            const keyPhrases = [
                "international authority",
                "replace war",
                "conflict",
                "nonviolence",
                "peace"
            ];
            const userAnswer = answer.toLowerCase();
            return keyPhrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
        },
        explanation: "Einstein wanted Gandhi's example to spread beyond India's borders to help establish an international authority respected by all that would make decisions and replace war conflicts."
    },
    {
        question: "What similarities do you find in the ideas of both the personalities?",
        type: "text",
        sampleAnswer: "Both Einstein and Gandhi valued nonviolence and peaceful resolution of conflicts. They shared a vision of a world where international cooperation and respect could replace war and violence.",
        evaluationFunction: function(answer) {
            const keyPhrases = [
                "nonviolence",
                "peace",
                "respect",
                "cooperation",
                "international"
            ];
            const userAnswer = answer.toLowerCase();
            return keyPhrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
        },
        explanation: "Both Einstein and Gandhi valued nonviolence and peaceful resolution of conflicts. They shared a vision of international cooperation to replace war."
    },
    {
        question: "In the context of Gandhi's response to Einstein's letter, 'finds favour in your sight' means:",
        options: [
            "Satisfied you",
            "Delighted you",
            "Appreciated by you",
            "Not accepted by you"
        ],
        correctAnswer: 2,
        explanation: "The phrase 'finds favour in your sight' means that Gandhi was pleased that his work was appreciated and approved by Einstein."
    }
];

// Reading comprehension questions for Text III (Poem: If)
const textIIIQuestions = [
    {
        question: "Which lines in the poem tell us to have self control, a clear head and not to become bitter when people speak against us?",
        type: "text",
        sampleAnswer: "If you can keep your head when all about you are losing theirs and blaming it on you; Or, being lied about, don't deal in lies, Or, being hated, don't give way to hating.",
        evaluationFunction: function(answer) {
            const keyPhrases = [
                "keep your head",
                "blaming it on you",
                "being lied about",
                "don't deal in lies",
                "being hated",
                "don't give way to hating"
            ];
            const userAnswer = answer.toLowerCase();
            return keyPhrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
        },
        explanation: "The lines 'If you can keep your head when all about you are losing theirs and blaming it on you' and 'Or, being lied about, don't deal in lies, Or, being hated, don't give way to hating' tell us to have self control, maintain a clear head, and not become bitter when people speak against us."
    },
    {
        question: "One must be just as graceful in losing as he is in winning. What are the two words in the poem that can replace the underlined ones?",
        options: [
            "Dream and thoughts",
            "Triumph and disaster",
            "Heart and nerve",
            "Victory and defeat"
        ],
        correctAnswer: 1,
        explanation: "The poem states 'If you can meet with triumph and disaster and treat those two impostors just the same', showing that one should be equally graceful in winning (triumph) and losing (disaster)."
    },
    {
        question: "In the third stanza what does the poet mean by 'And lose, and start again'?",
        type: "text",
        sampleAnswer: "The poet means that after losing everything, one should have the courage and resilience to begin again from the beginning without giving up or complaining about the loss.",
        evaluationFunction: function(answer) {
            const keyPhrases = [
                "begin again",
                "start over",
                "resilience",
                "not giving up",
                "without complaining"
            ];
            const userAnswer = answer.toLowerCase();
            return keyPhrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
        },
        explanation: "In 'And lose, and start again at your beginnings', the poet means that after experiencing loss, one should have the resilience to start over without complaining or being defeated by the loss."
    },
    {
        question: "There is a necessity to treat all people equal and amidst people we should not lose our self 'who we are'. How has the poet expressed this in the fourth stanza?",
        type: "text",
        sampleAnswer: "The poet expresses this by saying 'If you can talk with crowds and keep your virtue, Or walk with kings—nor lose the common touch; If neither foes nor loving friends can hurt you; If all men count with you, but none too much'.",
        evaluationFunction: function(answer) {
            const keyPhrases = [
                "talk with crowds",
                "keep your virtue",
                "walk with kings",
                "common touch",
                "all men count",
                "none too much"
            ];
            const userAnswer = answer.toLowerCase();
            return keyPhrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
        },
        explanation: "The poet expresses this concept in the lines 'If you can talk with crowds and keep your virtue, Or walk with kings—nor lose the common touch' and 'If all men count with you, but none too much', showing that one should maintain their true self while treating all people equally regardless of their social status."
    },
    {
        question: "List two things from each stanza that we can do to make the Earth ours, as given in the poem.",
        type: "text",
        sampleAnswer: "Stanza 1: Keep your head when others blame you; Trust yourself while allowing for doubts. Stanza 2: Don't be mastered by dreams; Treat triumph and disaster equally. Stanza 3: Risk everything and start again if you lose; Keep going with willpower when you have nothing left. Stanza 4: Talk with crowds while maintaining virtue; Value all people equally without being too affected by any.",
        evaluationFunction: function(answer) {
            const stanza1Phrases = ["keep your head", "trust yourself", "wait", "not tired", "don't deal in lies", "don't give way to hating"];
            const stanza2Phrases = ["dream", "not make dreams your master", "think", "triumph and disaster", "bear to hear", "build"];
            const stanza3Phrases = ["risk", "lose and start again", "heart and nerve", "hold on", "will"];
            const stanza4Phrases = ["talk with crowds", "keep your virtue", "walk with kings", "common touch", "all men count", "fill the unforgiving minute"];
            
            const userAnswer = answer.toLowerCase();
            
            // Check if at least one phrase from each stanza is mentioned
            const hasStanza1 = stanza1Phrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
            const hasStanza2 = stanza2Phrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
            const hasStanza3 = stanza3Phrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
            const hasStanza4 = stanza4Phrases.some(phrase => userAnswer.includes(phrase.toLowerCase()));
            
            return hasStanza1 && hasStanza2 && hasStanza3 && hasStanza4;
        },
        explanation: "Each stanza in the poem provides qualities and actions that lead to success: self-control and patience in stanza 1; balanced approach to dreams and resilience in stanza 2; courage to risk and perseverance in stanza 3; and humility and using time wisely in stanza 4."
    }
];

// Combine all questions
const allQuestions = {
    textI: textIQuestions,
    textII: textIIQuestions,
    textIII: textIIIQuestions
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
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on "The World as I See It" by Einstein</h3>';
    loadQuestionSet(questionsContainer, textIQuestions, 'textI');
    
    // Then add Text II questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Einstein and Gandhi\'s Letters</h3>';
    loadQuestionSet(questionsContainer, textIIQuestions, 'textII');
    
    // Then add Text III questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on "If" by Rudyard Kipling</h3>';
    loadQuestionSet(questionsContainer, textIIIQuestions, 'textIII');
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
    const questions = allQuestions[prefix];
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
        score += 15;
        document.getElementById('totalScore').textContent = score;
        
        if (!modulesCompleted.includes('thinking-text')) {
            modulesCompleted.push('thinking-text');
            updateProgress();
            showAchievement('Reading Comprehension Completed!');
        }
    }
}
