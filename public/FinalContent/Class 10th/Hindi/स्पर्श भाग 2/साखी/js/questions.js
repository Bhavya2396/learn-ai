/**
 * Questions and interactive exercises for Kabir Ke Sakhi
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "कबीर का जन्म कब और कहाँ हुआ माना जाता है?",
        options: [
            "1398 में अयोध्या में",
            "1398 में काशी में",
            "1440 में मगहर में",
            "1440 में काशी में"
        ],
        correctAnswer: 1,
        explanation: "कबीर का जन्म 1398 में काशी में हुआ माना जाता है, जैसा कि पाठ में बताया गया है।"
    },
    {
        question: "कबीर किसके शिष्य थे?",
        options: [
            "गुरु रविदास के",
            "गुरु नानक के",
            "गुरु रामानंद के",
            "गुरु गोरखनाथ के"
        ],
        correctAnswer: 2,
        explanation: "कबीर गुरु रामानंद के शिष्य थे।"
    },
    {
        question: "कबीर ने अपने जीवन के अंतिम वर्ष कहाँ बिताए?",
        options: [
            "काशी में",
            "अयोध्या में",
            "मगहर में",
            "प्रयाग में"
        ],
        correctAnswer: 2,
        explanation: "कबीर ने अपने जीवन के अंतिम कुछ वर्ष मगहर में बिताए, जहाँ वे चिरनिद्रा में लीन हो गए।"
    },
    {
        question: "कबीर की कविता में क्या झलकती है?",
        options: [
            "श्रृंगारिक भावनाएँ",
            "राजनीतिक विचारधारा",
            "गहरी सामाजिक चेतना",
            "प्रकृति का सौंदर्य"
        ],
        correctAnswer: 2,
        explanation: "कबीर क्रांतदर्शी कवि थे जिनकी कविता में गहरी सामाजिक चेतना झलकती है।"
    },
    {
        question: "कबीर के अनुसार ईश्वर कैसा है?",
        options: [
            "ईश्वर सभी मूर्तियों में है",
            "ईश्वर एक है, निर्विकार है और अरूप है",
            "ईश्वर साकार रूप में ही मिलता है",
            "ईश्वर केवल मंदिरों और मस्जिदों में है"
        ],
        correctAnswer: 1,
        explanation: "कबीर का मानना था कि ईश्वर एक है, निर्विकार (विकारों से रहित) है और अरूप (जिसका कोई रूप न हो) है।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "'साखी' शब्द किस शब्द का तद्भव रूप है और इसका अर्थ क्या है?",
        options: [
            "साक्ष्य - गवाही",
            "साक्षी - प्रत्यक्ष ज्ञान",
            "साख - विश्वास",
            "सख्य - मित्रता"
        ],
        correctAnswer: 1,
        explanation: "'साखी' शब्द 'साक्षी' शब्द का तद्भव रूप है। साक्षी शब्द साक्ष्य से बना है जिसका अर्थ होता है- प्रत्यक्ष ज्ञान।"
    },
    {
        question: "कबीर की भाषा को 'पचमेल खिचड़ी' या 'सधुक्कड़ी' क्यों कहा जाता है?",
        options: [
            "क्योंकि उनकी भाषा बहुत कठिन थी",
            "क्योंकि उनकी भाषा में अवधी, राजस्थानी, भोजपुरी और पंजाबी भाषाओं का मिश्रण था",
            "क्योंकि वे अपनी रचनाओं में भोजन का वर्णन करते थे",
            "क्योंकि उनकी भाषा में संस्कृत के शब्दों का अधिक प्रयोग था"
        ],
        correctAnswer: 1,
        explanation: "कबीर की रचनाओं में अवधी, राजस्थानी, भोजपुरी और पंजाबी भाषाओं के शब्दों का प्रभाव स्पष्ट दिखाई पड़ता है, इसी कारण उनकी भाषा को 'पचमेल खिचड़ी' या 'सधुक्कड़ी' कहा जाता है।"
    },
    {
        question: "कबीर किस प्रकार का ज्ञान अधिक महत्वपूर्ण मानते थे?",
        options: [
            "शास्त्रीय ज्ञान",
            "अनुभव ज्ञान",
            "धार्मिक ज्ञान",
            "पारंपरिक ज्ञान"
        ],
        correctAnswer: 1,
        explanation: "संत संप्रदाय में अनुभव ज्ञान की ही महत्ता है, शास्त्रीय ज्ञान की नहीं। कबीर भी शास्त्रीय ज्ञान से अधिक अनुभव के ज्ञान को महत्व देते थे।"
    },
    {
        question: "'साखी' किस छंद में लिखी जाती है और उसका लक्षण क्या है?",
        options: [
            "चौपाई छंद - 16 मात्रा",
            "दोहा छंद - 24 मात्रा (13 + 11)",
            "सोरठा छंद - 24 मात्रा (11 + 13)",
            "रोला छंद - 24 मात्रा (11 + 13)"
        ],
        correctAnswer: 1,
        explanation: "'साखी' वस्तुतः दोहा छंद ही है जिसका लक्षण है 13 और 11 के विश्राम से 24 मात्रा।"
    },
    {
        question: "कबीर अनुभव ज्ञान कैसे प्राप्त करते थे?",
        options: [
            "केवल शास्त्रों का अध्ययन करके",
            "गुरु की शिक्षाओं से",
            "जगह-जगह भ्रमण कर प्रत्यक्ष ज्ञान प्राप्त करके",
            "ध्यान और तपस्या करके"
        ],
        correctAnswer: 2,
        explanation: "कबीर का अनुभव क्षेत्र विस्तृत था। कबीर जगह-जगह भ्रमण कर प्रत्यक्ष ज्ञान प्राप्त करते थे।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "मीठी वाणी बोलने से क्या लाभ होता है?",
        options: [
            "केवल अपना तन सीतल होता है",
            "केवल औरों को सुख होता है",
            "अपना तन सीतल होता है और औरों को सुख होता है",
            "कोई लाभ नहीं होता"
        ],
        correctAnswer: 2,
        explanation: "कबीर के अनुसार मीठी वाणी बोलने से अपना तन सीतल होता है और औरों को सुख होता है।"
    },
    {
        question: "कस्तूरी मृग के संदर्भ में कबीर क्या कहना चाहते हैं?",
        options: [
            "कस्तूरी बहुत मूल्यवान होती है",
            "मृग को शिकारियों से बचना चाहिए",
            "जिसे हम खोजते हैं वह हमारे ही भीतर होता है",
            "जंगलों में भटकना व्यर्थ है"
        ],
        correctAnswer: 2,
        explanation: "जैसे कस्तूरी मृग के नाभि में होती है पर वह उसे जंगल में खोजता है, वैसे ही ईश्वर हर इंसान के भीतर है पर लोग उसे बाहर खोजते हैं।"
    },
    {
        question: "कबीर के अनुसार कौन सुखी है और कौन दुखी है?",
        options: [
            "जो जागता है वह सुखी है, जो सोता है वह दुखी है",
            "जो खाता और सोता है वह सुखी है, कबीर जैसे जो जागते और रोते हैं वे दुखी हैं",
            "जो ईश्वर को पाता है वह सुखी है, जो नहीं पाता वह दुखी है",
            "जो पढ़ता है वह सुखी है, जो नहीं पढ़ता वह दुखी है"
        ],
        correctAnswer: 1,
        explanation: "कबीर के अनुसार संसार में वे लोग सुखी हैं जो खाते और सोते हैं (भौतिक सुखों में लिप्त हैं), जबकि कबीर जैसे लोग दुखी हैं जो जागते और रोते हैं (आध्यात्मिक जागरूकता में रहते हैं और ईश्वर के विरह में रोते हैं)।"
    },
    {
        question: "कबीर के अनुसार पंडित कौन है?",
        options: [
            "जो बहुत पोथियाँ पढ़ता है",
            "जो संस्कृत जानता है",
            "जो प्रेम का एक अक्षर पढ़ता है",
            "जो शास्त्रों का ज्ञाता है"
        ],
        correctAnswer: 2,
        explanation: "कबीर के अनुसार असली पंडित वह है जो प्रेम (पीव) का एक अक्षर पढ़ लेता है, न कि वह जो केवल पोथियाँ पढ़कर अपना समय व्यर्थ करता है।"
    },
    {
        question: "निंदक के बारे में कबीर क्या कहते हैं?",
        options: [
            "निंदक से हमेशा दूर रहना चाहिए",
            "निंदक को अपने पास रखना चाहिए क्योंकि वह बिना साबुन-पानी के हमारा स्वभाव निर्मल करता है",
            "निंदक के साथ कठोर व्यवहार करना चाहिए",
            "निंदक को सुधारने का प्रयास करना चाहिए"
        ],
        correctAnswer: 1,
        explanation: "कबीर कहते हैं कि निंदक को अपने पास ही रखना चाहिए (आँगन में कुटी बनाकर), क्योंकि वह बिना साबुन और पानी के हमारा स्वभाव निर्मल कर देता है।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "पचमेल",
    vocab2: "सधुक्कड़ी",
    vocab3: "साखी",
    vocab4: "तद्भव",
    vocab5: "प्रत्यक्ष",
    vocab6: "अनुभव"
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

// NOTE: saveReflection function is now defined in main.js
// This duplicate implementation has been removed to prevent conflicts
