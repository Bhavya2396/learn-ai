/**
 * Questions and interactive exercises for Agni Path
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "हरिवंशराय बच्चन का जन्म कब और कहाँ हुआ था?",
        options: [
            "1905 में दिल्ली में",
            "1907 में इलाहाबाद में",
            "1910 में मुंबई में",
            "1907 में काशी में"
        ],
        correctAnswer: 1,
        explanation: "हरिवंशराय बच्चन का जन्म 27 नवंबर 1907 को उत्तर प्रदेश के इलाहाबाद शहर में हुआ था।"
    },
    {
        question: "'बच्चन' नाम कैसे पड़ा?",
        options: [
            "यह उनका जन्मजात नाम था",
            "यह उनके माता-पिता द्वारा प्यार से लिया जानेवाला नाम था",
            "यह उनके गुरु ने दिया था",
            "यह उन्होंने स्वयं चुना था"
        ],
        correctAnswer: 1,
        explanation: "'बच्चन' इनका माता-पिता द्वारा प्यार से लिया जानेवाला नाम था, जिसे इन्होंने अपना उपनाम बना लिया था।"
    },
    {
        question: "बच्चन ने किस सेवा में काम किया?",
        options: [
            "भारतीय प्रशासनिक सेवा",
            "भारतीय विदेश सेवा",
            "भारतीय पुलिस सेवा",
            "भारतीय रेलवे सेवा"
        ],
        correctAnswer: 1,
        explanation: "बच्चन कुछ समय तक विश्वविद्यालय में प्राध्यापक रहने के बाद भारतीय विदेश सेवा में चले गए थे।"
    },
    {
        question: "बच्चन की कविताओं की मुख्य विशेषता क्या है?",
        options: [
            "वे बहुत कठिन हैं",
            "वे सहज और संवेदनशील हैं",
            "वे केवल प्रेम पर आधारित हैं",
            "वे केवल धर्म पर आधारित हैं"
        ],
        correctAnswer: 1,
        explanation: "बच्चन की कविताएँ सहज और संवेदनशील हैं। इनकी रचनाओं में व्यक्ति-वेदना, राष्ट्र-चेतना और जीवन-दर्शन के स्वर मिलते हैं।"
    },
    {
        question: "बच्चन की प्रसिद्ध कृति कौन सी है?",
        options: [
            "गीतांजलि",
            "मधुशाला",
            "साकेत",
            "रामचरितमानस"
        ],
        correctAnswer: 1,
        explanation: "बच्चन की प्रमुख कृतियों में मधुशाला, निशा-निमंत्रण, एकांत संगीत, मिलन-यामिनी, आरती और अंगारे, टूटती चट्टानें, रूप तरंगिणी शामिल हैं।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "कवि ने संघर्षमय जीवन को क्या कहा है?",
        options: [
            "सुख पथ",
            "अग्नि पथ",
            "कंटक पथ",
            "दुख पथ"
        ],
        correctAnswer: 1,
        explanation: "कवि ने संघर्षमय जीवन को 'अग्नि पथ' कहा है।"
    },
    {
        question: "कवि ने मनुष्य को क्या संदेश दिया है?",
        options: [
            "राह में सुख रूपी छाँह की चाह करनी चाहिए",
            "राह में सुख रूपी छाँह की चाह न कर अपनी मंजिल की ओर कर्मठतापूर्वक बढ़ते ही जाना चाहिए",
            "राह में रुककर आराम करना चाहिए",
            "राह में सुख-सुविधाओं का लाभ उठाना चाहिए"
        ],
        correctAnswer: 1,
        explanation: "कवि ने मनुष्य को यह संदेश दिया है कि राह में सुख रूपी छाँह की चाह न कर अपनी मंजिल की ओर कर्मठतापूर्वक बिना थकान महसूस किए बढ़ते ही जाना चाहिए।"
    },
    {
        question: "कविता में शब्दों की पुनरावृत्ति का क्या प्रभाव है?",
        options: [
            "यह कविता को कठिन बनाती है",
            "यह कविता को उबाऊ बनाती है",
            "यह मनुष्य को आगे बढ़ने की प्रेरणा देती है",
            "यह कविता को लंबा बनाती है"
        ],
        correctAnswer: 2,
        explanation: "कविता में शब्दों की पुनरावृत्ति कैसे मनुष्य को आगे बढ़ने की प्रेरणा देती है, यह देखने योग्य है।"
    },
    {
        question: "कविता का मुख्य संदेश क्या है?",
        options: [
            "जीवन में सुख-सुविधाओं का लाभ उठाना चाहिए",
            "जीवन में कठिनाइयों से घबराना नहीं चाहिए",
            "जीवन में आराम करना चाहिए",
            "जीवन में दूसरों पर निर्भर रहना चाहिए"
        ],
        correctAnswer: 1,
        explanation: "कविता का मुख्य संदेश यह है कि जीवन में कठिनाइयों से घबराना नहीं चाहिए और अपने लक्ष्य की ओर दृढ़ता से बढ़ते रहना चाहिए।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "कवि ने 'अग्नि पथ' किसके प्रतीक स्वरूप प्रयोग किया है?",
        options: [
            "सुखमय जीवन के",
            "संघर्षमय जीवन के",
            "शांतिपूर्ण जीवन के",
            "आरामदायक जीवन के"
        ],
        correctAnswer: 1,
        explanation: "कवि ने 'अग्नि पथ' संघर्षमय जीवन के प्रतीक स्वरूप प्रयोग किया है।"
    },
    {
        question: "'माँग मत', 'कर शपथ', 'लथपथ' इन शब्दों का बार-बार प्रयोग कर कवि क्या कहना चाहता है?",
        options: [
            "यह शब्द सुंदर लगते हैं",
            "यह शब्द कविता को लंबा बनाते हैं",
            "यह शब्द मनुष्य को आगे बढ़ने की प्रेरणा देते हैं",
            "यह शब्द कविता को कठिन बनाते हैं"
        ],
        correctAnswer: 2,
        explanation: "इन शब्दों की पुनरावृत्ति मनुष्य को आगे बढ़ने की प्रेरणा देती है और कविता में एक तालबद्धता लाती है।"
    },
    {
        question: "'एक पत्र-छाँह भी माँग मत' इस पंक्ति का आशय क्या है?",
        options: [
            "पेड़ों के पत्ते नहीं माँगने चाहिए",
            "राह में सुख रूपी छाँह की चाह नहीं करनी चाहिए",
            "पेड़ों के नीचे नहीं बैठना चाहिए",
            "पत्तों को तोड़ना नहीं चाहिए"
        ],
        correctAnswer: 1,
        explanation: "इस पंक्ति का आशय यह है कि राह में सुख रूपी छाँह की चाह नहीं करनी चाहिए, अर्थात् कठिन मार्ग पर चलते समय आराम की चाह नहीं करनी चाहिए।"
    },
    {
        question: "'तू न थमेगा कभी! तू न थकेगा कभी! तू न मुड़ेगा कभी!' इन पंक्तियों का भाव क्या है?",
        options: [
            "मनुष्य को रुकना नहीं चाहिए",
            "मनुष्य को थकना नहीं चाहिए",
            "मनुष्य को पीछे मुड़ना नहीं चाहिए",
            "उपर्युक्त सभी"
        ],
        correctAnswer: 3,
        explanation: "इन पंक्तियों का भाव यह है कि मनुष्य को रुकना नहीं चाहिए, थकना नहीं चाहिए और पीछे मुड़ना नहीं चाहिए।"
    },
    {
        question: "'चल रहा मनुष्य है अश्रु-स्वेद-रक्त से लथपथ' इस पंक्ति का भाव क्या है?",
        options: [
            "मनुष्य रोता हुआ चल रहा है",
            "मनुष्य पसीने से भीगा हुआ चल रहा है",
            "मनुष्य खून से सना हुआ चल रहा है",
            "मनुष्य आँसू, पसीना और खून से सना हुआ चल रहा है"
        ],
        correctAnswer: 3,
        explanation: "इस पंक्ति का भाव यह है कि मनुष्य आँसू, पसीना और खून से सना हुआ (लथपथ) चल रहा है, अर्थात् वह कठिनाइयों का सामना करते हुए आगे बढ़ रहा है।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "अग्नि पथ",
    vocab2: "पत्र",
    vocab3: "शपथ",
    vocab4: "अश्रु",
    vocab5: "स्वेद",
    vocab6: "रक्त",
    vocab7: "लथपथ"
};

// Initialize questions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load text questions when the questions module is shown
    const textQuestionsContainer = document.getElementById('textQuestions');
    if (textQuestionsContainer) {
        loadTextQuestions(textQuestionsContainer);
    }
    
    // Initialize vocabulary checking
    initVocabularyChecking();
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
    
    // Add Author Introduction questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">लेखक परिचय पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, authorIntroQuestions, 'authorIntro');
    
    // Add Text Introduction questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">पाठ प्रवेश पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, textIntroQuestions, 'textIntro');
    
    // Add Poem questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">कविता पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, poemQuestions, 'poem');
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
            <button class="interactive-btn" onclick="checkAnswers('${prefix}')">उत्तर जाँचें</button>
        </div>
        <div id="${prefix}Feedback" class="feedback-message"></div>
    `;
}

// Create HTML for a question
function createQuestionHTML(question, index, prefix) {
    const questionId = `${prefix}-q${index}`;
    
    let optionsHTML = '';
    
    // Multiple choice question (all questions are now multiple choice)
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

// Check answers for a question set
function checkAnswers(prefix) {
    let questions;
    switch (prefix) {
        case 'authorIntro':
            questions = authorIntroQuestions;
            break;
        case 'textIntro':
            questions = textIntroQuestions;
            break;
        case 'poem':
            questions = poemQuestions;
            break;
        default:
            console.error(`Unknown question prefix: ${prefix}`);
            return;
    }
    
    let correctCount = 0;
    
    questions.forEach((question, index) => {
        const questionId = `${prefix}-q${index}`;
        const feedbackEl = document.getElementById(`${questionId}-feedback`);
        
        // Multiple choice question (all questions are now multiple choice)
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            const isCorrect = userAnswer === question.correctAnswer;
            
            feedbackEl.textContent = isCorrect ? 
                '✓ सही!' : 
                `✗ गलत। सही उत्तर है: ${question.options[question.correctAnswer]}`;
            feedbackEl.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            
            if (isCorrect) correctCount++;
        } else {
            feedbackEl.textContent = 'कृपया एक विकल्प चुनें।';
            feedbackEl.className = 'question-feedback warning';
        }
    });
    
    // Show overall feedback
    const feedbackContainer = document.getElementById(`${prefix}Feedback`);
    feedbackContainer.textContent = `आपने ${questions.length} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    feedbackContainer.className = 'feedback-message show';
    feedbackContainer.classList.add(correctCount === questions.length ? 'success' : 'error');
    
    // Update progress if all correct
    if (correctCount === questions.length) {
        if (typeof updateProgress === 'function') {
            updateProgress('questions', 20);
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
            feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
            
            if (correctCount === totalCount && typeof updateProgress === 'function') {
                updateProgress('questions', 10);
            }
        }
    };
}
