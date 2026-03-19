/**
 * Questions for Chapter 10 (from provided text)
 */

// Build questions exactly from provided prompts; make them multiple-choice for interactivity
const authorIntroQuestions = [
    {
        question: "अरुण कमल का जन्म कब और कहाँ हुआ?",
        options: [
            "1954, नासरीगंज (रोहतास, बिहार)",
            "1960, पटना (बिहार)",
            "1954, पटना (बिहार)",
            "1950, नासरीगंज (रोहतास, बिहार)"
        ],
        correctAnswer: 0,
        explanation: "टेक्स्ट के अनुसार: 15 फरवरी 1954, रोहतास (नासरीगंज), बिहार।"
    },
    {
        question: "इनमें से कौन-सी कृति अरुण कमल की नहीं है?",
        options: [
            "अपनी केवल धार",
            "सबूत",
            "पुतली में संसार",
            "मधुशाला"
        ],
        correctAnswer: 3,
        explanation: "'मधुशाला' हरिवंशराय बच्चन की कृति है।"
    },
    {
        question: "अरुण कमल की भाषा-शैली के बारे में क्या कहा गया है?",
        options: [
            "केवल तत्सम प्रधान",
            "बोलचाल की भाषा और खड़ी बोली के लय-छंदों का समावेश",
            "अत्यंत कठिन और दुर्बोध",
            "अधिकांशतः अंग्रेज़ी मिश्रित"
        ],
        correctAnswer: 1,
        explanation: "टेक्स्ट में नए बिंब, बोलचाल की भाषा, खड़ी बोली के अनेक लय-छंदों का समावेश बताया गया है।"
    }
];

const textIntroQuestions = [
    {
        question: "'नए इलाके में' कविता क्या बोध कराती है?",
        options: [
            "जीवन में सब कुछ स्थायी है",
            "जीवन में कुछ भी स्थायी नहीं होता",
            "शहरों में रास्ते सरल हैं",
            "स्मृतियाँ हमेशा सहायक होती हैं"
        ],
        correctAnswer: 1,
        explanation: "टेक्स्ट के अनुसार: एक ही दिन में पुरानी पड़ जाती दुनिया; स्मृतियों के भरोसे नहीं।"
    },
    {
        question: "'खुशबू रचते हैं हाथ' कविता किस विडंबना को उजागर करती है?",
        options: [
            "सुगंध बनाने वाले हाथ समृद्ध और सुखी होते हैं",
            "सुगंध बनाने वाले हाथ गंदगी और अभाव में जीते हैं",
            "अगरबत्तियाँ गाँव में बनती हैं",
            "सुगंध केवल महलों में बनती है"
        ],
        correctAnswer: 1,
        explanation: "टेक्स्ट में: दुनिया की सारी गंदगी के बीच दुनिया की सारी खुशबू; उपेक्षित जीवन।"
    }
];

const poemQuestions = [
    {
        question: "कवि पुराने निशान किन-किन का खोजता है?",
        options: [
            "पीपल का पेड़, ढहा हुआ घर, ज़मीन का खाली टुक",
            "पुल, तालाब, मंदिर",
            "स्कूल, बाज़ार, सड़क",
            "पीपल का पेड़, मंदिर, तालाब"
        ],
        correctAnswer: 0,
        explanation: "कविता-पंक्तियाँ इन्हीं निशानों का उल्लेख करती हैं।"
    },
    {
        question: "'यहाँ स्मृति का भरोसा नहीं' का क्या आशय है?",
        options: [
            "स्मृति कभी काम नहीं आती",
            "इलाका तेज़ी से बदल रहा है, इसलिए पुराने निशान धोखा देते हैं",
            "स्मृति गलत होती है",
            "स्मृति अनैतिक है"
        ],
        correctAnswer: 1,
        explanation: "हर दिन कुछ बनता-घटता है, इसलिए स्मृतियाँ भ्रामक हो जाती हैं।"
    },
    {
        question: "'खुशबू रचते हैं हाथ' में किन-किन प्रकार के हाथों का वर्णन है?",
        options: [
            "केवल कोमल हाथ",
            "उभरी नसोंवाले, घिसे नाखूनोंवाले, नए-नए, खुशबूदार, गंदे, कटे-पिटे, ज़ख्म से फटे",
            "केवल श्रमिकों के हाथ",
            "केवल बच्चों के हाथ"
        ],
        correctAnswer: 1,
        explanation: "पंक्तियों में अनेक प्रकार के हाथों का उल्लेख है।"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const textQuestionsContainer = document.getElementById('textQuestions');
    if (textQuestionsContainer) {
        loadTextQuestions(textQuestionsContainer);
    }
});

function loadTextQuestions(container) {
    const questionsHTML = `
        <div id="allQuestions" class="question-set active"></div>
    `;
    container.innerHTML = questionsHTML;
    const questionsContainer = document.getElementById('allQuestions');
    questionsContainer.innerHTML += '<h3 class="question-section-title">लेखक परिचय पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, authorIntroQuestions, 'authorIntro');
    questionsContainer.innerHTML += '<h3 class="question-section-title">पाठ प्रवेश पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, textIntroQuestions, 'textIntro');
    questionsContainer.innerHTML += '<h3 class="question-section-title">कविता पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, poemQuestions, 'poem');
}

function loadQuestionSet(container, questions, prefix) {
    questions.forEach((q, index) => {
        const questionHTML = createQuestionHTML(q, index, prefix);
        container.innerHTML += questionHTML;
    });
    container.innerHTML += `
        <div class="button-container">
            <button class="interactive-btn" onclick="checkAnswers('${prefix}')">उत्तर जाँचें</button>
        </div>
        <div id="${prefix}Feedback" class="feedback-message"></div>
    `;
}

function createQuestionHTML(question, index, prefix) {
    const questionId = `${prefix}-q${index}`;
    let optionsHTML = '';
    question.options.forEach((option, optIndex) => {
        optionsHTML += `
            <div class="option">
                <input type="radio" id="${questionId}-opt${optIndex}" name="${questionId}" value="${optIndex}">
                <label for="${questionId}-opt${optIndex}">${option}</label>
            </div>
        `;
    });
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

function checkAnswers(prefix) {
    let questions;
    switch (prefix) {
        case 'authorIntro': questions = authorIntroQuestions; break;
        case 'textIntro': questions = textIntroQuestions; break;
        case 'poem': questions = poemQuestions; break;
        default: return;
    }
    let correctCount = 0;
    questions.forEach((question, index) => {
        const questionId = `${prefix}-q${index}`;
        const feedbackEl = document.getElementById(`${questionId}-feedback`);
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            const isCorrect = userAnswer === question.correctAnswer;
            feedbackEl.textContent = isCorrect ? '✓ सही!' : `✗ गलत। सही उत्तर है: ${question.options[question.correctAnswer]}`;
            feedbackEl.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            if (isCorrect) correctCount++;
        } else {
            feedbackEl.textContent = 'कृपया एक विकल्प चुनें।';
            feedbackEl.className = 'question-feedback warning';
        }
    });
    const feedbackContainer = document.getElementById(`${prefix}Feedback`);
    if (feedbackContainer) {
        feedbackContainer.textContent = `आपने ${questions.length} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackContainer.className = 'feedback-message show';
        feedbackContainer.classList.add(correctCount === questions.length ? 'success' : 'error');
        
        // Update progress if all answers are correct
        if (correctCount === questions.length && typeof updateProgress === 'function') {
            if (prefix === 'authorIntro') updateProgress('author', 10);
            else if (prefix === 'textIntro') updateProgress('prereading', 10);
            else if (prefix === 'poem') updateProgress('thinking-text', 10);
        }
    }
}


