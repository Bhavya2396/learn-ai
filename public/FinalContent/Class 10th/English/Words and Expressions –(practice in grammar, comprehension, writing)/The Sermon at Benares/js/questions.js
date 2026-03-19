/**
 * Questions and assessment content for The Sermon at Benaras
 */

// Questions for Text I
const questionsTextI = [
    {
        id: 'q1',
        text: 'According to His Holiness the Dalai Lama, what should we do if we want a happier humanity?',
        type: 'text',
        answer: 'We must tackle the root of the problem, which lies within the human mind.'
    },
    {
        id: 'q2',
        text: 'Where does the ultimate cause of the problem lie?',
        type: 'radio',
        options: [
            'In the economy',
            'In political power',
            'Within the human mind',
            'In the educational system'
        ],
        correctAnswer: 'Within the human mind'
    },
    {
        id: 'q3',
        text: 'What is referred to by "it" in "what I call human feeling, then \'it\' is very useful"?',
        type: 'text',
        answer: '"It" refers to intelligence accompanied with human affection and compassion.'
    },
    {
        id: 'q4',
        text: 'Why does the Dalai Lama say that proper motivation is important?',
        type: 'radio',
        options: [
            'Because it brings economic success',
            'Because every human action has some motivation',
            'Because it helps in building political power',
            'Because it can prevent wars'
        ],
        correctAnswer: 'Because every human action has some motivation'
    },
    {
        id: 'q5',
        text: 'Why is there a requirement of correlation between the intention of an individual and the interest of society?',
        type: 'text',
        answer: 'Because if society\'s moral values and standards of behaviour become negative, each of us will suffer.'
    }
];

// Questions for Text II
const questionsTextII = [
    {
        id: 'q6',
        text: 'Why did Kisa Gotami go from house to house?',
        type: 'radio',
        options: [
            'To find medicine for her sick son',
            'To collect mustard seeds from houses where no death had occurred',
            'To spread the Buddha\'s teachings',
            'To beg for alms'
        ],
        correctAnswer: 'To collect mustard seeds from houses where no death had occurred'
    },
    {
        id: 'q7',
        text: 'What made Kisa Gotami understand the truth about life and death?',
        type: 'text',
        answer: 'She realized that death is common to all when she couldn\'t find a house where no death had occurred. She saw the city lights flickering and being extinguished, which made her understand the impermanence of life.'
    },
    {
        id: 'q8',
        text: 'What is the central message of the Buddha\'s sermon?',
        type: 'radio',
        options: [
            'Death can be overcome with medicine',
            'Grief and lamentation only increase suffering',
            'Family members can save each other from death',
            'Life is eternal if we believe in it'
        ],
        correctAnswer: 'Grief and lamentation only increase suffering'
    },
    {
        id: 'q9',
        text: 'In the sermon, the Buddha compares the life of mortals to:',
        type: 'checkbox',
        options: [
            'Ripe fruits in danger of falling',
            'Earthen vessels made by the potter',
            'Flowing river water',
            'An ox being led to slaughter'
        ],
        correctAnswers: ['Ripe fruits in danger of falling', 'Earthen vessels made by the potter', 'An ox being led to slaughter']
    },
    {
        id: 'q10',
        text: 'How did Kisa Gotami find comfort after losing her son?',
        type: 'text',
        answer: 'She took refuge in the Buddha and found comfort in the Dharma, which is a balm that soothes all the pains of troubled hearts. She put aside the selfishness of her affection for her child.'
    }
];

// Load questions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Questions script loaded');
    loadQuestions();
});

/**
 * Load questions into the DOM
 */
function loadQuestions() {
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) {
        console.error('Questions container not found');
        return;
    }
    
    // Create question sets for each text
    const textISection = document.createElement('div');
    textISection.className = 'question-set';
    textISection.innerHTML = '<h3 class="question-section-title">Text I: The Dalai Lama\'s Perspective</h3>';
    
    const textIISection = document.createElement('div');
    textIISection.className = 'question-set';
    textIISection.innerHTML = '<h3 class="question-section-title">Text II: The Sermon at Benaras</h3>';
    
    // Add questions for Text I
    questionsTextI.forEach(question => {
        textISection.appendChild(createQuestionElement(question));
    });
    
    // Add questions for Text II
    questionsTextII.forEach(question => {
        textIISection.appendChild(createQuestionElement(question));
    });
    
    // Add both sections to the container
    questionsContainer.appendChild(textISection);
    questionsContainer.appendChild(textIISection);
}

/**
 * Create a question element based on question type
 * @param {Object} question - Question object
 * @returns {HTMLElement} - Question element
 */
function createQuestionElement(question) {
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    questionItem.id = `question-${question.id}`;
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = question.text;
    
    questionItem.appendChild(questionText);
    
    // Create different input types based on question type
    switch (question.type) {
        case 'text':
            const textarea = document.createElement('textarea');
            textarea.className = 'question-textarea';
            textarea.placeholder = 'Write your answer here...';
            textarea.setAttribute('data-question-id', question.id);
            
            const submitBtn = document.createElement('button');
            submitBtn.className = 'interactive-btn';
            submitBtn.textContent = 'Check Answer';
            submitBtn.onclick = () => checkTextAnswer(question.id, textarea.value, question.answer);
            
            questionItem.appendChild(textarea);
            questionItem.appendChild(submitBtn);
            
            // Add feedback element
            const feedbackElement = document.createElement('div');
            feedbackElement.className = 'question-feedback';
            feedbackElement.id = `feedback-${question.id}`;
            questionItem.appendChild(feedbackElement);
            
            break;
            
        case 'radio':
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'question-options';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question-${question.id}`;
                radio.id = `question-${question.id}-option-${index}`;
                radio.value = option;
                
                const label = document.createElement('label');
                label.textContent = option;
                label.setAttribute('for', `question-${question.id}-option-${index}`);
                
                optionElement.appendChild(radio);
                optionElement.appendChild(label);
                optionsContainer.appendChild(optionElement);
            });
            
            const radioSubmitBtn = document.createElement('button');
            radioSubmitBtn.className = 'interactive-btn';
            radioSubmitBtn.textContent = 'Submit Answer';
            radioSubmitBtn.onclick = () => checkRadioAnswer(question.id, question.correctAnswer);
            
            questionItem.appendChild(optionsContainer);
            questionItem.appendChild(radioSubmitBtn);
            
            // Add feedback element
            const radioFeedbackElement = document.createElement('div');
            radioFeedbackElement.className = 'question-feedback';
            radioFeedbackElement.id = `feedback-${question.id}`;
            questionItem.appendChild(radioFeedbackElement);
            
            break;
            
        case 'checkbox':
            const checkboxContainer = document.createElement('div');
            checkboxContainer.className = 'question-options';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = `question-${question.id}`;
                checkbox.id = `question-${question.id}-option-${index}`;
                checkbox.value = option;
                
                const label = document.createElement('label');
                label.textContent = option;
                label.setAttribute('for', `question-${question.id}-option-${index}`);
                
                optionElement.appendChild(checkbox);
                optionElement.appendChild(label);
                checkboxContainer.appendChild(optionElement);
            });
            
            const checkboxSubmitBtn = document.createElement('button');
            checkboxSubmitBtn.className = 'interactive-btn';
            checkboxSubmitBtn.textContent = 'Submit Answer';
            checkboxSubmitBtn.onclick = () => checkCheckboxAnswer(question.id, question.correctAnswers);
            
            questionItem.appendChild(checkboxContainer);
            questionItem.appendChild(checkboxSubmitBtn);
            
            // Add feedback element
            const checkboxFeedbackElement = document.createElement('div');
            checkboxFeedbackElement.className = 'question-feedback';
            checkboxFeedbackElement.id = `feedback-${question.id}`;
            questionItem.appendChild(checkboxFeedbackElement);
            
            break;
    }
    
    return questionItem;
}

/**
 * Check text answer
 * @param {string} questionId - Question ID
 * @param {string} userAnswer - User's answer
 * @param {string} correctAnswer - Correct answer
 */
function checkTextAnswer(questionId, userAnswer, correctAnswer) {
    const feedbackElement = document.getElementById(`feedback-${questionId}`);
    
    if (!userAnswer.trim()) {
        feedbackElement.textContent = 'Please provide an answer before submitting.';
        feedbackElement.className = 'question-feedback warning';
        return;
    }
    
    // Simple check for keywords in the answer
    const keywords = correctAnswer.toLowerCase().split(/\s+/).filter(word => 
        word.length > 4 && !['there', 'their', 'these', 'those', 'which', 'would', 'could', 'should', 'about', 'with'].includes(word)
    );
    
    let matchCount = 0;
    keywords.forEach(keyword => {
        if (userAnswer.toLowerCase().includes(keyword)) {
            matchCount++;
        }
    });
    
    const matchPercentage = (matchCount / keywords.length) * 100;
    
    if (matchPercentage >= 70) {
        feedbackElement.textContent = 'Great answer! Your response covers the key points.';
        feedbackElement.className = 'question-feedback correct';
        if (typeof incrementScore === 'function') {
            incrementScore(10);
        }
    } else if (matchPercentage >= 40) {
        feedbackElement.textContent = 'You\'re on the right track, but consider including more key points from the text.';
        feedbackElement.className = 'question-feedback warning';
        if (typeof incrementScore === 'function') {
            incrementScore(5);
        }
    } else {
        feedbackElement.textContent = 'Try again. Focus on key details from the text.';
        feedbackElement.className = 'question-feedback incorrect';
    }
}

/**
 * Check radio button answer
 * @param {string} questionId - Question ID
 * @param {string} correctAnswer - Correct answer
 */
function checkRadioAnswer(questionId, correctAnswer) {
    const feedbackElement = document.getElementById(`feedback-${questionId}`);
    const selectedOption = document.querySelector(`input[name="question-${questionId}"]:checked`);
    
    if (!selectedOption) {
        feedbackElement.textContent = 'Please select an option before submitting.';
        feedbackElement.className = 'question-feedback warning';
        return;
    }
    
    if (selectedOption.value === correctAnswer) {
        feedbackElement.textContent = 'Correct! Well done.';
        feedbackElement.className = 'question-feedback correct';
        if (typeof incrementScore === 'function') {
            incrementScore(5);
        }
    } else {
        feedbackElement.textContent = 'That\'s not correct. Try again.';
        feedbackElement.className = 'question-feedback incorrect';
    }
}

/**
 * Check checkbox answers
 * @param {string} questionId - Question ID
 * @param {Array} correctAnswers - Array of correct answers
 */
function checkCheckboxAnswer(questionId, correctAnswers) {
    const feedbackElement = document.getElementById(`feedback-${questionId}`);
    const selectedOptions = Array.from(document.querySelectorAll(`input[name="question-${questionId}"]:checked`))
        .map(option => option.value);
    
    if (selectedOptions.length === 0) {
        feedbackElement.textContent = 'Please select at least one option before submitting.';
        feedbackElement.className = 'question-feedback warning';
        return;
    }
    
    // Check if all selected options are correct and all correct options are selected
    const allCorrect = selectedOptions.every(option => correctAnswers.includes(option)) &&
                      correctAnswers.every(answer => selectedOptions.includes(answer));
    
    // Check if some selected options are correct
    const someCorrect = selectedOptions.some(option => correctAnswers.includes(option)) &&
                       selectedOptions.length <= correctAnswers.length;
    
    if (allCorrect) {
        feedbackElement.textContent = 'Perfect! All your selections are correct.';
        feedbackElement.className = 'question-feedback correct';
        if (typeof incrementScore === 'function') {
            incrementScore(10);
        }
    } else if (someCorrect) {
        feedbackElement.textContent = 'Partially correct. You identified some but not all correct options.';
        feedbackElement.className = 'question-feedback warning';
        if (typeof incrementScore === 'function') {
            incrementScore(3);
        }
    } else {
        feedbackElement.textContent = 'That\'s not correct. Try again.';
        feedbackElement.className = 'question-feedback incorrect';
    }
}
