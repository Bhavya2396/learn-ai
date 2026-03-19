/**
 * Activities for Bholi interactive lesson
 */

// Vocabulary activities
const adverbActivity = {
    title: "Understanding Adjectives and Adverbs",
    instructions: "Read the following sentence from the story: 'She stammered' can be written as 'She spoke haltingly.' When you add '-ly' to a word, it often becomes an adverb.",
    questions: [
        {
            id: "vocab1",
            sentence: "The teacher spoke ___ to Bholi, ensuring she felt comfortable.",
            correctAnswer: "kindly",
            options: ["kindly", "angry", "hastily", "suspiciously"]
        },
        {
            id: "vocab2",
            sentence: "Bholi ___ refused to marry Bishamber.",
            correctAnswer: "bravely",
            options: ["bravely", "fearfully", "silently", "nervously"]
        },
        {
            id: "vocab3",
            sentence: "Her sisters looked at her ___.",
            correctAnswer: "enviously",
            options: ["enviously", "happily", "sadly", "carefully"]
        },
        {
            id: "vocab4",
            sentence: "Ramlal ___ placed his turban at Bishamber's feet.",
            correctAnswer: "sorrowfully",
            options: ["sorrowfully", "quickly", "angrily", "proudly"]
        },
        {
            id: "vocab5",
            sentence: "The bandsmen played ___ as the procession headed back.",
            correctAnswer: "confusedly",
            options: ["confusedly", "happily", "loudly", "softly"]
        }
    ]
};

// Grammar Activity - Complete the Sentences
const grammarActivity = {
    title: "Complete the Sentences",
    instructions: "Fill in the blanks to complete these sentences from the story of Bholi. Focus on using correct grammar.",
    sentences: [
        {
            id: "grammar1",
            text: "If Ramlal had not listened to the Tehsildar, Bholi ___ not have gone to school.",
            answer: "would"
        },
        {
            id: "grammar2",
            text: "Unless the teacher ___ encouraged her, Bholi would have remained silent.",
            answer: "had"
        },
        {
            id: "grammar3",
            text: "If Bholi ___ married Bishamber, she would have been unhappy.",
            answer: "had"
        },
        {
            id: "grammar4",
            text: "Bholi's mother said, 'If girls ___ to school, who will marry them?'",
            answer: "go"
        },
        {
            id: "grammar5",
            text: "Unless Bholi ___ educated, she would not have found her voice.",
            answer: "became"
        }
    ]
};

// True/False Activity
const trueFalseActivity = {
    title: "True or False Statements",
    instructions: "Read each statement and decide whether it is true or false based on the story.",
    questions: [
        {
            statement: "Bholi's real name was Sulekha.",
            answer: true,
            explanation: "In the beginning of the story, we learn that her name was Sulekha but everyone called her Bholi."
        },
        {
            statement: "Bholi was the eldest of Ramlal's daughters.",
            answer: false,
            explanation: "Bholi was the youngest of Ramlal's seven children, including four daughters."
        },
        {
            statement: "Bholi's mother wanted her to go to school from the beginning.",
            answer: false,
            explanation: "Bholi's mother initially opposed the idea, asking 'If girls go to school, who will marry them?'"
        },
        {
            statement: "Bishamber demanded a dowry after seeing Bholi's face.",
            answer: true,
            explanation: "After seeing Bholi's pockmarked face, Bishamber demanded five thousand rupees from Ramlal."
        },
        {
            statement: "At the end of the story, Bholi decides to become a teacher.",
            answer: true,
            explanation: "Bholi tells her father she will teach at the same school where she learned so much."
        }
    ]
};

// Multiple Choice Questions Activity
const multipleChoiceActivity = {
    title: "Multiple Choice Questions",
    instructions: "Choose the correct answer for each question.",
    questions: [
        {
            question: "Why did Bholi fall behind in her development?",
            options: [
                "She was born with a physical disability.",
                "She had fallen off the cot as a baby and damaged part of her brain.",
                "She was neglected by her parents from birth.",
                "She had a genetic condition."
            ],
            correctIndex: 1,
            explanation: "When she was ten months old, she fell off the cot and damaged part of her brain."
        },
        {
            question: "What happened to Bholi when she was two years old?",
            options: [
                "She broke her leg.",
                "She began to stammer.",
                "She had an attack of small-pox that left her disfigured.",
                "She became completely silent."
            ],
            correctIndex: 2,
            explanation: "At age two, Bholi had small-pox that left her body permanently disfigured with deep black pockmarks."
        },
        {
            question: "Why did Bholi's mother agree to send her to school?",
            options: [
                "She wanted Bholi to become independent.",
                "She believed education was important for girls.",
                "She thought Bholi was unlikely to get married anyway due to her appearance.",
                "She wanted to fulfill her own unrealized dream of education."
            ],
            correctIndex: 2,
            explanation: "Her mother said there was little chance of her getting married with her ugly face and lack of sense."
        },
        {
            question: "What did the teacher promise Bholi?",
            options: [
                "That she would find her a good husband.",
                "That she would become beautiful.",
                "That she would become rich and famous.",
                "That she would learn to read and speak without stammering."
            ],
            correctIndex: 3,
            explanation: "The teacher promised that Bholi would learn to read, become educated, and speak without stammering."
        },
        {
            question: "Why did Bishamber agree to marry Bholi initially?",
            options: [
                "He was in love with her despite her appearance.",
                "He wanted a young bride to care for his children.",
                "He didn't ask for dowry, which was unusual at that time.",
                "He was from another village and didn't know about her pockmarks."
            ],
            correctIndex: 3,
            explanation: "He was from another village and didn't know about her appearance."
        }
    ]
};

// This section has been removed

// This section has been removed

// Function to check vocabulary answers
function checkVocabularyAnswers() {
    const correctAnswers = {
        'vocab1': 'kindly',
        'vocab2': 'bravely',
        'vocab3': 'enviously',
        'vocab4': 'sorrowfully',
        'vocab5': 'confusedly'
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
            if (typeof updateScore === 'function') {
                updateScore(10);
            }
            
            // Show achievement
            if (typeof showAchievement === 'function') {
                showAchievement("Adverbs Master", "You've successfully completed the adverbs exercise!");
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Function to check grammar answers
function checkGrammarAnswers() {
    const correctAnswers = {
        'grammar1': 'would',
        'grammar2': 'had',
        'grammar3': 'had',
        'grammar4': 'go',
        'grammar5': 'became'
    };
    
    // Alternative acceptable answers
    const alternativeAnswers = {
        'grammar1': ['would'],
        'grammar2': ['had', 'has'],
        'grammar3': ['had'],
        'grammar4': ['go', 'went'],
        'grammar5': ['became', 'was', 'were', 'got']
    };
    
    let score = 0;
    let total = Object.keys(correctAnswers).length;
    
    // Check each answer
    for (const [id, correctAnswer] of Object.entries(correctAnswers)) {
        const input = document.getElementById(id);
        if (!input) continue;
        
        const userAnswer = input.value.trim().toLowerCase();
        const validAnswers = alternativeAnswers[id] || [correctAnswer.toLowerCase()];
        
        // Check if user's answer matches any valid answer
        const isCorrect = validAnswers.includes(userAnswer);
        
        if (isCorrect) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            score++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    }
    
    // Display feedback
    const feedbackEl = document.getElementById('grammarFeedback');
    if (feedbackEl) {
        if (score === total) {
            feedbackEl.textContent = `Perfect! You completed all ${total} sentences correctly.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress
            if (typeof updateScore === 'function') {
                updateScore(10);
            }
            
            // Show achievement
            if (typeof showAchievement === 'function') {
                showAchievement("Grammar Master", "You've successfully completed the grammar exercise!");
            }
        } else {
            feedbackEl.textContent = `You got ${score} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Function to show grammar answers
function showGrammarAnswers() {
    const correctAnswers = {
        'grammar1': 'would',
        'grammar2': 'had',
        'grammar3': 'had',
        'grammar4': 'go',
        'grammar5': 'became'
    };
    
    // Show each answer
    for (const id of Object.keys(correctAnswers)) {
        const answerElement = document.getElementById(`answer-${id}`);
        if (answerElement) {
            answerElement.style.display = 'inline';
        }
    }
    
    // Display feedback
    const feedbackEl = document.getElementById('grammarFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = 'Answers are now visible.'; 
        feedbackEl.className = 'feedback-message show';
    }
}

// Function to initialize grammar activity
function initializeGrammarActivity() {
    const activityContainer = document.getElementById('grammarActivity');
    if (!activityContainer) return;
    
    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'vocabulary-exercise';
    
    // Create grammar exercise header
    const grammarHeader = document.createElement('h3');
    grammarHeader.className = 'activity-title';
    grammarHeader.textContent = grammarActivity.title;
    contentWrapper.appendChild(grammarHeader);
    
    const instructions = document.createElement('p');
    instructions.textContent = grammarActivity.instructions;
    contentWrapper.appendChild(instructions);
    
    // Create conditional sentences exercise
    grammarActivity.sentences.forEach((item) => {
        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'contraction-item';
        
        const paragraph = document.createElement('p');
        const sentenceParts = item.text.split('___');
        
        // First part of sentence
        paragraph.appendChild(document.createTextNode(sentenceParts[0]));
        
        // Create input field
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'contraction-input';
        input.id = item.id;
        paragraph.appendChild(input);
        
        // Add second part of sentence if it exists
        if (sentenceParts.length > 1) {
            paragraph.appendChild(document.createTextNode(sentenceParts[1]));
        }
        
        // Create answer element (hidden by default)
        const answerElement = document.createElement('span');
        answerElement.className = 'grammar-answer';
        answerElement.style.display = 'none';
        answerElement.textContent = ` (Answer: ${item.answer})`;
        answerElement.id = `answer-${item.id}`;
        paragraph.appendChild(answerElement);
        
        sentenceDiv.appendChild(paragraph);
        contentWrapper.appendChild(sentenceDiv);
    });
    
    // Add button container for multiple buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    contentWrapper.appendChild(buttonContainer);
    
    // Add check button
    const checkButton = document.createElement('button');
    checkButton.className = 'interactive-btn';
    checkButton.textContent = 'Check Answers';
    checkButton.onclick = checkGrammarAnswers;
    buttonContainer.appendChild(checkButton);
    
    // Add show answers button
    const showAnswersButton = document.createElement('button');
    showAnswersButton.className = 'interactive-btn';
    showAnswersButton.textContent = 'Show Answers';
    showAnswersButton.onclick = showGrammarAnswers;
    buttonContainer.appendChild(showAnswersButton);
    
    // Add feedback container
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'grammarFeedback';
    feedbackDiv.className = 'feedback-message';
    feedbackDiv.setAttribute('aria-live', 'polite');
    contentWrapper.appendChild(feedbackDiv);
    
    activityContainer.appendChild(contentWrapper);
}

// Load activities when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize vocabulary activity
    initializeVocabularyActivity();
    
    // Initialize grammar activity
    const grammarActivityDiv = document.createElement('div');
    grammarActivityDiv.id = 'grammarActivity';
    grammarActivityDiv.className = 'activity-section';
    
    // Insert grammar activity before true/false activity
    const trueFalseActivity = document.getElementById('trueFalseActivity');
    if (trueFalseActivity && trueFalseActivity.parentNode) {
        trueFalseActivity.parentNode.insertBefore(grammarActivityDiv, trueFalseActivity);
    } else {
        // Fallback if trueFalseActivity doesn't exist yet
        const vocabularyActivity = document.getElementById('vocabularyActivity');
        if (vocabularyActivity && vocabularyActivity.parentNode) {
            vocabularyActivity.parentNode.insertBefore(grammarActivityDiv, vocabularyActivity.nextSibling);
        }
    }
    
    initializeGrammarActivity();
    
    // Initialize True/False activity
    initializeTrueFalseActivity();
    
    // Initialize Multiple Choice activity
    initializeMultipleChoiceActivity();
});

// Function to initialize vocabulary activity
function initializeVocabularyActivity() {
    const activityContainer = document.getElementById('vocabularyActivity');
    if (!activityContainer) return;
    
    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'vocabulary-exercise';
    
    // Create adverbs exercise
    const adverbHeader = document.createElement('h3');
    adverbHeader.className = 'activity-title';
    adverbHeader.textContent = adverbActivity.title;
    contentWrapper.appendChild(adverbHeader);
    
    const instructions = document.createElement('p');
    instructions.textContent = adverbActivity.instructions;
    contentWrapper.appendChild(instructions);
    
    // Create the adverb exercise with select dropdowns
    adverbActivity.questions.forEach((item) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'vocab-question';
        
        const sentence = document.createElement('p');
        const sentenceParts = item.sentence.split('___');
        
        // First part of sentence
        sentence.appendChild(document.createTextNode(sentenceParts[0]));
        
        // Create select dropdown
        const select = document.createElement('select');
        select.id = item.id;
        
        // Add empty default option
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select";
        select.appendChild(defaultOption);
        
        // Add answer options
        item.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        
        // Add select to sentence
        sentence.appendChild(select);
        
        // Add second part of sentence if it exists
        if (sentenceParts.length > 1) {
            sentence.appendChild(document.createTextNode(sentenceParts[1]));
        }
        
        questionDiv.appendChild(sentence);
        contentWrapper.appendChild(questionDiv);
    });
    
    // Add check button
    const checkButton = document.createElement('button');
    checkButton.className = 'interactive-btn';
    checkButton.textContent = 'Check Answers';
    checkButton.onclick = checkVocabularyAnswers;
    contentWrapper.appendChild(checkButton);
    
    // Add feedback container
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'vocabFeedback';
    feedbackDiv.className = 'feedback-message';
    feedbackDiv.setAttribute('aria-live', 'polite');
    contentWrapper.appendChild(feedbackDiv);
    
    activityContainer.appendChild(contentWrapper);
}

// Function to initialize True/False activity
function initializeTrueFalseActivity() {
    const activityContainer = document.getElementById('trueFalseActivity');
    if (!activityContainer) return;
    
    // Create activity header
    const header = document.createElement('h3');
    header.className = 'activity-title';
    header.textContent = trueFalseActivity.title;
    activityContainer.appendChild(header);
    
    // Create instructions
    const instructions = document.createElement('p');
    instructions.textContent = trueFalseActivity.instructions;
    activityContainer.appendChild(instructions);
    
    // Create questions
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'true-false-container';
    activityContainer.appendChild(questionsContainer);
    
    trueFalseActivity.questions.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'true-false-item';
        
        const statement = document.createElement('p');
        statement.textContent = `${index + 1}. ${item.statement}`;
        statement.className = 'true-false-statement';
        questionDiv.appendChild(statement);
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'true-false-buttons';
        
        const trueBtn = document.createElement('button');
        trueBtn.className = 'interactive-btn tf-btn';
        trueBtn.textContent = 'True';
        trueBtn.onclick = function() { checkTrueFalseAnswer(index, true, this); };
        buttonsDiv.appendChild(trueBtn);
        
        const falseBtn = document.createElement('button');
        falseBtn.className = 'interactive-btn tf-btn';
        falseBtn.textContent = 'False';
        falseBtn.onclick = function() { checkTrueFalseAnswer(index, false, this); };
        buttonsDiv.appendChild(falseBtn);
        
        questionDiv.appendChild(buttonsDiv);
        
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'tf-feedback';
        feedbackDiv.id = `tf-feedback-${index}`;
        feedbackDiv.style.display = 'none';
        questionDiv.appendChild(feedbackDiv);
        
        questionsContainer.appendChild(questionDiv);
    });
}

// Function to check True/False answer
function checkTrueFalseAnswer(index, userAnswer, buttonElement) {
    const question = trueFalseActivity.questions[index];
    const feedbackDiv = document.getElementById(`tf-feedback-${index}`);
    
    if (userAnswer === question.answer) {
        feedbackDiv.textContent = `Correct! ${question.explanation}`;
        feedbackDiv.className = 'tf-feedback correct';
        buttonElement.classList.add('correct-answer');
    } else {
        feedbackDiv.textContent = `Incorrect. ${question.explanation}`;
        feedbackDiv.className = 'tf-feedback incorrect';
        buttonElement.classList.add('incorrect-answer');
    }
    
    feedbackDiv.style.display = 'block';
    
    // Disable buttons
    const buttons = buttonElement.parentElement.querySelectorAll('.tf-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Update score
    if (userAnswer === question.answer && typeof updateScore === 'function') {
        updateScore(5);
    }
}

// Function to initialize Multiple Choice activity
function initializeMultipleChoiceActivity() {
    const activityContainer = document.getElementById('multipleChoiceActivity');
    if (!activityContainer) return;
    
    // Create activity header
    const header = document.createElement('h3');
    header.className = 'activity-title';
    header.textContent = multipleChoiceActivity.title;
    activityContainer.appendChild(header);
    
    // Create instructions
    const instructions = document.createElement('p');
    instructions.textContent = multipleChoiceActivity.instructions;
    activityContainer.appendChild(instructions);
    
    // Create questions
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'mc-container';
    activityContainer.appendChild(questionsContainer);
    
    multipleChoiceActivity.questions.forEach((item, questionIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mc-question';
        
        const questionText = document.createElement('p');
        questionText.className = 'mc-question-text';
        questionText.textContent = `${questionIndex + 1}. ${item.question}`;
        questionDiv.appendChild(questionText);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'mc-options';
        
        item.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `mc-question-${questionIndex}`;
            radioInput.id = `mc-q${questionIndex}-o${optionIndex}`;
            radioInput.value = optionIndex;
            
            const label = document.createElement('label');
            label.htmlFor = `mc-q${questionIndex}-o${optionIndex}`;
            label.textContent = option;
            
            optionDiv.appendChild(radioInput);
            optionDiv.appendChild(label);
            optionsContainer.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsContainer);
        
        const checkButton = document.createElement('button');
        checkButton.className = 'interactive-btn';
        checkButton.textContent = 'Check Answer';
        checkButton.onclick = function() { checkMultipleChoiceAnswer(questionIndex); };
        questionDiv.appendChild(checkButton);
        
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'mc-feedback';
        feedbackDiv.id = `mc-feedback-${questionIndex}`;
        feedbackDiv.style.display = 'none';
        questionDiv.appendChild(feedbackDiv);
        
        questionsContainer.appendChild(questionDiv);
    });
}

// Function to check Multiple Choice answer
function checkMultipleChoiceAnswer(questionIndex) {
    const question = multipleChoiceActivity.questions[questionIndex];
    const selectedOption = document.querySelector(`input[name="mc-question-${questionIndex}"]:checked`);
    const feedbackDiv = document.getElementById(`mc-feedback-${questionIndex}`);
    
    if (!selectedOption) {
        feedbackDiv.textContent = 'Please select an answer.';
        feedbackDiv.className = 'mc-feedback warning';
        feedbackDiv.style.display = 'block';
        return;
    }
    
    const userAnswer = parseInt(selectedOption.value);
    
    if (userAnswer === question.correctIndex) {
        feedbackDiv.textContent = `Correct! ${question.explanation}`;
        feedbackDiv.className = 'mc-feedback correct';
        selectedOption.parentElement.classList.add('correct-answer');
    } else {
        feedbackDiv.textContent = `Incorrect. ${question.explanation}`;
        feedbackDiv.className = 'mc-feedback incorrect';
        selectedOption.parentElement.classList.add('incorrect-answer');
        
        // Highlight the correct answer
        const correctOption = document.getElementById(`mc-q${questionIndex}-o${question.correctIndex}`);
        if (correctOption) {
            correctOption.parentElement.classList.add('correct-answer');
        }
    }
    
    feedbackDiv.style.display = 'block';
    
    // Disable radio buttons
    const options = document.querySelectorAll(`input[name="mc-question-${questionIndex}"]`);
    options.forEach(option => {
        option.disabled = true;
    });
    
    // Update score
    if (userAnswer === question.correctIndex && typeof updateScore === 'function') {
        updateScore(5);
    }
}

// This function has been removed

// This function has been removed

// This function has been removed
