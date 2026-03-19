/**
 * Questions and interactive exercises for Meera Ke Pad
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "मीरा का जन्म कब और कहाँ हुआ माना जाता है?",
        options: [
            "1503 में जोधपुर के चोकड़ी (कुड़की) गाँव में",
            "1450 में राजस्थान के चित्तौड़गढ़ में",
            "1498 में मेवाड़ के मेड़ता में",
            "1520 में गुजरात के द्वारका में"
        ],
        correctAnswer: 0,
        explanation: "मीरा का जन्म जोधपुर के चोकड़ी (कुड़की) गाँव में 1503 में हुआ माना जाता है।"
    },
    {
        question: "मीरा किसकी शिष्या थीं?",
        options: [
            "संत कबीरदास की",
            "संत रविदास (रैदास) की",
            "संत तुलसीदास की",
            "संत सूरदास की"
        ],
        correctAnswer: 1,
        explanation: "मीरा संत रैदास की शिष्या थीं, जैसा कि पाठ में बताया गया है।"
    },
    {
        question: "मीरा के पदों की भाषा में किन भाषाओं का मिश्रण पाया जाता है?",
        options: [
            "केवल राजस्थानी और हिंदी",
            "केवल गुजराती और ब्रज",
            "राजस्थानी, ब्रज, गुजराती, पंजाबी, खड़ी बोली और पूर्वी",
            "संस्कृत, हिंदी और फारसी"
        ],
        correctAnswer: 2,
        explanation: "मीरा के पदों की भाषा में राजस्थानी, ब्रज और गुजराती का मिश्रण पाया जाता है। वहीं पंजाबी, खड़ी बोली और पूर्वी के प्रयोग भी मिल जाते हैं।"
    },
    {
        question: "मीरा की भक्ति किस प्रकार की थी?",
        options: [
            "वात्सल्य भाव की",
            "दैन्य और माधुर्यभाव की",
            "केवल निर्गुण भक्ति",
            "दास्य भाव की"
        ],
        correctAnswer: 1,
        explanation: "मीरा की भक्ति दैन्य और माधुर्यभाव की थी। इन पर योगियों, संतों और वैष्णव भक्तों का सम्मिलित प्रभाव पड़ा था।"
    },
    {
        question: "मीरा ने अपना जीवन किसके प्रति समर्पित किया था?",
        options: [
            "गिरधर गोपाल (श्रीकृष्ण)",
            "शिव",
            "राम",
            "हनुमान"
        ],
        correctAnswer: 0,
        explanation: "भौतिक जीवन से निराश मीरा ने घर-परिवार त्याग दिया और वृंदावन में डेरा डाल पूरी तरह गिरधर गोपाल कृष्ण के प्रति समर्पित हो गईं।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "मीरा ने घर-द्वार क्यों छोड़ दिया था?",
        options: [
            "परिवार से अनबन के कारण",
            "संन्यास लेने के लिए",
            "पारिवारिक संतापों से मुक्ति पाने के लिए",
            "तीर्थ यात्रा के लिए"
        ],
        correctAnswer: 2,
        explanation: "कहते हैं पारिवारिक संतापों से मुक्ति पाने के लिए मीरा घर-द्वार छोड़कर वृंदावन में जा बसी थीं और कृष्णमय हो गई थीं।"
    },
    {
        question: "मीरा के पदों में उनके आराध्य किस रूप में संकल्पित किए गए हैं?",
        options: [
            "केवल कृष्ण के रूप में",
            "केवल निर्गुण ब्रह्म के रूप में",
            "निर्गुण निराकार ब्रह्म, सगुण साकार गोपीवल्लभ श्रीकृष्ण और निर्मोही परदेशी जोगी के रूप में",
            "केवल परदेशी जोगी के रूप में"
        ],
        correctAnswer: 2,
        explanation: "इनकी रचनाओं में इनके आराध्य कहीं निर्गुण निराकार ब्रह्म, कहीं सगुण साकार गोपीवल्लभ श्रीकृष्ण और कहीं निर्मोही परदेशी जोगी के रूप में संकल्पित किए गए हैं।"
    },
    {
        question: "मीरा अपने आराध्य के साथ कैसा व्यवहार करती हैं?",
        options: [
            "केवल प्रार्थना करती हैं",
            "मनुहार करती हैं, लाड़ लड़ाती हैं और कभी-कभी उलाहना भी देती हैं",
            "केवल उनके गुणों का गान करती हैं",
            "केवल उनसे दूर रहने का दुख व्यक्त करती हैं"
        ],
        correctAnswer: 1,
        explanation: "मीरा अपने आराध्य से मनुहार भी करती हैं, लाड़ भी लड़ाती हैं तो अवसर आने पर उलाहना देने से भी नहीं चूकतीं।"
    },
    {
        question: "इस पाठ में संकलित पदों का मुख्य विषय क्या है?",
        options: [
            "मीरा का दुखी जीवन",
            "कृष्ण के प्रति मीरा का प्रेम और भक्ति",
            "वृंदावन के सौंदर्य का वर्णन",
            "मीरा के परिवार का वर्णन"
        ],
        correctAnswer: 1,
        explanation: "प्रस्तुत पाठ में संकलित दोनों पद मीरा के आराध्य श्रीकृष्ण के प्रति उनके प्रेम और भक्ति भाव को व्यक्त करते हैं।"
    },
    {
        question: "मीरा अपने आराध्य को क्या याद दिलाने में देर नहीं लगातीं?",
        options: [
            "उनके कर्तव्य",
            "उनकी लीलाएँ",
            "उनका प्यार",
            "उनकी शक्तियाँ"
        ],
        correctAnswer: 0,
        explanation: "उनकी क्षमताओं का गुणगान, स्मरण करती हैं तो उन्हें उनके कर्तव्य याद दिलाने में भी देर नहीं लगातीं।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "पहले पद में मीरा हरि से क्या करने की विनती करती हैं?",
        options: [
            "अपने दर्शन देने की",
            "जन की भीर (पीड़ा) हरने की",
            "अपने साथ ले जाने की",
            "वृंदावन में रहने की"
        ],
        correctAnswer: 1,
        explanation: "पहले पद में मीरा हरि से 'जन री भीर' अर्थात जन की पीड़ा हरने की विनती करती हैं।"
    },
    {
        question: "पहले पद में मीरा ने हरि के कौन-कौन से प्रसंगों का उल्लेख किया है?",
        options: [
            "केवल द्रौपदी की लज्जा रक्षा का",
            "केवल नरसिंह अवतार का",
            "द्रौपदी की लज्जा रक्षा, नरसिंह अवतार और गजराज की रक्षा का",
            "केवल राधा के साथ रास रचाने का"
        ],
        correctAnswer: 2,
        explanation: "मीरा ने द्रौपदी की लज्जा रक्षा, नरसिंह अवतार और गजराज (हाथी) की रक्षा के प्रसंगों का उल्लेख किया है।"
    },
    {
        question: "दूसरे पद में मीरा श्याम से क्या मांगती हैं?",
        options: [
            "धन-संपत्ति",
            "अपनी चाकरी (सेवक) में रखने के लिए",
            "वृंदावन में निवास",
            "मुक्ति"
        ],
        correctAnswer: 1,
        explanation: "दूसरे पद में मीरा श्याम से अपने को चाकर (सेवक) रूप में रखने की प्रार्थना करती हैं - 'स्याम म्हाने चाकर राखो जी'।"
    },
    {
        question: "मीरा श्याम की सेवा में क्या-क्या करना चाहती हैं?",
        options: [
            "केवल उनका गुणगान करना",
            "केवल उनके दर्शन पाना",
            "बाग लगाना, दर्शन पाना, गोविन्द लीला गाना",
            "केवल वृंदावन जाना"
        ],
        correctAnswer: 2,
        explanation: "मीरा श्याम की सेवा में बाग लगाना, नित्य उठकर दर्शन पाना और वृंदावन की कुंज गली में गोविंद लीला गाना चाहती हैं।"
    },
    {
        question: "मीरा के पदों में श्रीकृष्ण के रूप का वर्णन किस प्रकार किया गया है?",
        options: [
            "मोर मुगट, पीताम्बर, वैजन्ती माला और मुरली वाले",
            "त्रिशूलधारी, नीलकंठ और डमरू वाले",
            "गदा, चक्र, पद्म और शंख धारण किए हुए",
            "जटाधारी, चिता भस्म में लिपटे"
        ],
        correctAnswer: 0,
        explanation: "मीरा ने श्रीकृष्ण को मोर मुगट (मयूर पंख का मुकुट) धारण किए, पीताम्बर (पीले वस्त्र) पहने, गले में वैजन्ती माला पहने और मुरली बजाते हुए वृंदावन में गायें चराते हुए वर्णित किया है।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "राजस्थानी",
    vocab2: "ब्रज",
    vocab3: "गुजराती",
    vocab4: "संत रैदास",
    vocab5: "दैन्य और माधुर्य"
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

// Function to check contraction answers
function checkContractions() {
    const selects = document.querySelectorAll('.contraction-select');
    let correctCount = 0;
    
    selects.forEach(select => {
        const correctAnswer = select.getAttribute('data-answer');
        const userAnswer = select.value;
        
        // Check if answer is correct
        const isCorrect = userAnswer === correctAnswer;
        
        // Style based on correctness
        select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
        select.style.backgroundColor = isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)';
        
        if (isCorrect) correctCount++;
    });
    
    // Show feedback
    const feedbackEl = document.getElementById('contractionFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `आपने ${selects.length} में से ${correctCount} शब्दों के सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === selects.length ? 'success' : 'error');
        
        // Update progress if all are correct
        if (correctCount === selects.length && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
}

// Save reflection
function saveReflection() {
    const reflectionSelected = document.querySelector('input[name="reflection"]:checked');
    const relevanceSelected = document.querySelector('input[name="relevance"]:checked');
    
    const feedbackEl = document.getElementById('reflectionFeedback');
    
    if (!reflectionSelected || !relevanceSelected) {
        feedbackEl.textContent = 'कृपया दोनों प्रश्नों के उत्तर चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the selections (in a real app, this would be sent to a server)
    feedbackEl.textContent = 'आपके उत्तर सहेज लिए गए हैं!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('prereading', 15);
    }
}

