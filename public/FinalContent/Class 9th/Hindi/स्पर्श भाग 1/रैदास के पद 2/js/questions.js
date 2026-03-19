/**
 * Questions and interactive exercises for Raidas Ke Pad
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "रैदास का जन्म और देहावसान कब और कहाँ हुआ था?",
        options: [
            "1398 में दिल्ली और 1508 में बनारस",
            "1388 में बनारस और 1518 में बनारस",
            "1388 में बनारस और 1518 में मगहर",
            "1398 में काशी और 1518 में दिल्ली"
        ],
        correctAnswer: 1,
        explanation: "रैदास का जन्म सन् 1388 और देहावसान सन् 1518 में बनारस में ही हुआ, ऐसा माना जाता है।"
    },
    {
        question: "रैदास को किसने दिल्ली आने का निमंत्रण भेजा था?",
        options: [
            "अकबर ने",
            "बाबर ने",
            "सिकंदर लोदी ने",
            "हुमायूँ ने"
        ],
        correctAnswer: 2,
        explanation: "रैदास की ख्याति से प्रभावित होकर सिकंदर लोदी ने इन्हें दिल्ली आने का निमंत्रण भेजा था।"
    },
    {
        question: "रैदास की भाषा की क्या विशेषता थी?",
        options: [
            "केवल संस्कृतनिष्ठ शब्दों का प्रयोग",
            "केवल खड़ी बोली का प्रयोग",
            "सरल, व्यावहारिक ब्रजभाषा जिसमें अवधी, राजस्थानी, खड़ी बोली और उर्दू-फ़ारसी के शब्दों का मिश्रण",
            "केवल पूर्वी बोलियों का प्रयोग"
        ],
        correctAnswer: 2,
        explanation: "रैदास ने अपनी काव्य-रचनाओं में सरल, व्यावहारिक ब्रजभाषा का प्रयोग किया है, जिसमें अवधी, राजस्थानी, खड़ी बोली और उर्दू-फ़ारसी के शब्दों का भी मिश्रण है।"
    },
    {
        question: "रैदास के पद सिखों के किस धर्मग्रंथ में सम्मिलित हैं?",
        options: [
            "गुरुग्रंथ साहब",
            "बीजक",
            "सुंदरकांड",
            "आदिग्रंथ"
        ],
        correctAnswer: 0,
        explanation: "रैदास के चालीस पद सिखों के पवित्र धर्मग्रंथ 'गुरुग्रंथ साहब' में भी सम्मिलित हैं।"
    },
    {
        question: "रैदास को कौन से अलंकार विशेष प्रिय थे?",
        options: [
            "यमक और अनुप्रास",
            "श्लेष और यमक",
            "उपमा और रूपक",
            "अनुप्रास और श्लेष"
        ],
        correctAnswer: 2,
        explanation: "रैदास को उपमा और रूपक अलंकार विशेष प्रिय रहे हैं।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "पाठ के अनुसार, रैदास किस काव्यधारा के कवि थे?",
        options: [
            "सगुण भक्ति काव्यधारा",
            "निर्गुण भक्ति काव्यधारा",
            "रीतिकाल काव्यधारा",
            "वीरगाथा काव्यधारा"
        ],
        correctAnswer: 1,
        explanation: "रैदास निर्गुण भक्ति काव्यधारा के प्रमुख कवि थे।"
    },
    {
        question: "रैदास के सच्चे धर्म की अवधारणा क्या थी?",
        options: [
            "मूर्तिपूजा और तीर्थयात्रा",
            "कर्मकांड और अनुष्ठान",
            "व्यक्ति की आंतरिक भावनाएं और आपसी भाईचारा",
            "शास्त्रों का अनुसरण"
        ],
        correctAnswer: 2,
        explanation: "मूर्तिपूजा, तीर्थयात्रा जैसे दिखावों में रैदास का जरा भी विश्वास न था। वह व्यक्ति की आंतरिक भावनाओं और आपसी भाईचारे की ही सच्चा धर्म मानते थे।"
    },
    {
        question: "पहले पद में रैदास किसकी याद करते हैं?",
        options: [
            "अपने गुरु की",
            "अपने आराध्य (प्रभु) की",
            "अपने मित्रों की",
            "समाज की"
        ],
        correctAnswer: 1,
        explanation: "पहले पद में 'प्रभु जी, तुम चंदन हम पानी' में कवि अपने आराध्य को याद करते हुए उनसे अपना तुलना करता है।"
    },
    {
        question: "दूसरे पद में रैदास का वर्णन किस विषय पर है?",
        options: [
            "प्रकृति के सौंदर्य पर",
            "राजा-महाराजाओं की वीरता पर",
            "भगवान् की उदारता, कृपा और उनके समदर्शी स्वभाव पर",
            "सांसारिक मोह-माया पर"
        ],
        correctAnswer: 2,
        explanation: "दूसरे पद में भगवान् की अपार उदारता, कृपा और उनके समदर्शी स्वभाव का वर्णन है।"
    },
    {
        question: "रैदास के पद में 'नीचहु ऊँच करै' का क्या अर्थ है?",
        options: [
            "नीचे से ऊपर जाना",
            "निम्न स्थान से उच्च स्थान पर जाना",
            "निम्न कुल के व्यक्ति को उच्च पदवी प्रदान करना",
            "गरीब को अमीर बनाना"
        ],
        correctAnswer: 2,
        explanation: "रैदास कहते हैं कि भगवान् ने तथाकथित निम्न कुल के भक्तों को भी सहज-भाव से अपनाया है और उन्हें लोक में सम्माननीय स्थान दिया है।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "पहले पद में भगवान् और भक्त की तुलना किस-किस से की गई है?",
        options: [
            "सूरज-चंद्रमा, नदी-सागर",
            "चंदन-पानी, घन-मोर, दीपक-बाती, मोती-धागा, स्वामी-दास",
            "फूल-सुगंध, फल-मिठास, पेड़-छाया",
            "पर्वत-झरना, धरती-आकाश, तारे-चांदनी"
        ],
        correctAnswer: 1,
        explanation: "पहले पद में भगवान् और भक्त की तुलना चंदन-पानी, घन-मोर, दीपक-बाती, मोती-धागा, स्वामी-दास से की गई है।"
    },
    {
        question: "'प्रभु जी, तुम घन बन हम मोरा, जैसे चितवत चंद चकोरा' - इसमें क्या तुलना की गई है?",
        options: [
            "भगवान को बादल से और भक्त को मोर से",
            "भगवान को जंगल से और भक्त को पक्षी से",
            "भगवान को चंद्रमा से और भक्त को चकोर से",
            "भगवान को आकाश से और भक्त को धरती से"
        ],
        correctAnswer: 0,
        explanation: "इस पंक्ति में प्रभु को बादल (घन) और भक्त को मोर से तुलना की गई है, जैसे चकोर पक्षी चंद्रमा को देखता है।"
    },
    {
        question: "दूसरे पद में 'गरीब निवाजु' किसे कहा गया है?",
        options: [
            "रैदास को",
            "राजा को",
            "भगवान को",
            "संतों को"
        ],
        correctAnswer: 2,
        explanation: "दूसरे पद में 'गरीब निवाजु' (दीन-दुखियों पर दया करनेवाला) भगवान को कहा गया है।"
    },
    {
        question: "दूसरे पद में 'जाकी छोति जगत कउ लागै ता पर तुहीं ढरै' का क्या अर्थ है?",
        options: [
            "जिसे संसार अस्पृश्य मानता है, उस पर तुम दया करते हो",
            "जिसकी बुराई संसार करता है, उसकी तुम रक्षा करते हो",
            "जिसे संसार छूना भी नहीं चाहता, उसे तुम गले लगाते हो",
            "जिसे संसार नीच समझता है, उसे तुम ऊंचा उठाते हो"
        ],
        correctAnswer: 0,
        explanation: "इसका अर्थ है कि जिसे संसार अस्पृश्य (छोति) मानता है, उस पर भगवान दया (ढरै) करते हैं।"
    },
    {
        question: "दूसरे पद में 'नामदेव कबीरू तिलोचनु सधना सैनु' का उल्लेख किस संदर्भ में किया गया है?",
        options: [
            "ये सभी रैदास के समकालीन कवि थे",
            "ये सभी निम्न जाति से थे और भगवान ने इन्हें उच्च स्थान दिया",
            "ये सभी रैदास के गुरु थे",
            "ये सभी रैदास के शिष्य थे"
        ],
        correctAnswer: 1,
        explanation: "रैदास इन संतों का उल्लेख यह दिखाने के लिए करते हैं कि भगवान ने तथाकथित निम्न कुल के इन भक्तों को भी सहज-भाव से अपनाया है और उन्हें लोक में सम्माननीय स्थान दिया है।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "सभी",
    vocab2: "उपमा और रूपक",
    vocab3: "निर्गुण",
    vocab4: "चालीस",
    vocab5: "बनारस"
};

// Contraction exercise answers
const contractionAnswers = {
    contraction1: "मेरा",
    contraction2: "चंद्र",
    contraction3: "बत्ती",
    contraction4: "ज्योति",
    contraction5: "जलना",
    contraction6: "रात्रि",
    contraction7: "छत्र",
    contraction8: "को"
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
    
    // Initialize contraction checking
    initContractionChecking();
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
            feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
            
            if (correctCount === totalCount && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
        }
    };
}

// Initialize contraction checking
function initContractionChecking() {
    window.checkContractions = function() {
        let correctCount = 0;
        let totalCount = 0;
        
        Object.keys(contractionAnswers).forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                totalCount++;
                const isCorrect = select.value === contractionAnswers[id];
                select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
                if (isCorrect) correctCount++;
            }
        });
        
        const feedbackEl = document.getElementById('contractionFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
            
            if (correctCount === totalCount && typeof updateProgress === 'function') {
                updateProgress('thinking-language', 10);
            }
        }
    };
}
