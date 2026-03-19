/**
 * Questions and interactive exercises for तोप
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "वीरेन डंगवाल का जन्म कब और कहाँ हुआ था?",
        options: [
            "4 अगस्त 1947 को उत्तराखंड के कीर्तिनगर में",
            "5 अगस्त 1947 को उत्तराखंड के टिहरी गढ़वाल ज़िले के कीर्तिनगर में",
            "5 अगस्त 1948 को नैनीताल में",
            "15 अगस्त 1947 को इलाहाबाद में"
        ],
        correctAnswer: 1,
        explanation: "वीरेन डंगवाल का जन्म 5 अगस्त 1947 को उत्तराखंड के टिहरी गढ़वाल ज़िले के कीर्तिनगर में हुआ था, जैसा कि पाठ में बताया गया है।"
    },
    {
        question: "वीरेन डंगवाल ने अपनी उच्च शिक्षा कहाँ पूरी की?",
        options: [
            "नैनीताल में",
            "कीर्तिनगर में",
            "इलाहाबाद में",
            "दिल्ली में"
        ],
        correctAnswer: 2,
        explanation: "वीरेन डंगवाल ने अपनी शुरुआती शिक्षा नैनीताल में और उच्च शिक्षा इलाहाबाद में पूरी की थी।"
    },
    {
        question: "वीरेन डंगवाल किस पेशे से जुड़े थे?",
        options: [
            "केवल प्राध्यापक",
            "केवल पत्रकार",
            "प्राध्यापक और पत्रकार दोनों",
            "लेखक और राजनेता"
        ],
        correctAnswer: 2,
        explanation: "वीरेन डंगवाल पेशे से प्राध्यापक होने के साथ-साथ पत्रकारिता से भी जुड़े थे।"
    },
    {
        question: "वीरेन डंगवाल के कविता संग्रह का नाम क्या है जिस पर उन्हें साहित्य अकादेमी पुरस्कार मिला?",
        options: [
            "इसी दुनिया में",
            "दुष्चक्र में स्रष्टा",
            "स्रष्टा का संसार",
            "कवि का मन"
        ],
        correctAnswer: 1,
        explanation: "वीरेन डंगवाल को उनके कविता संग्रह 'दुष्चक्र में स्रष्टा' पर साहित्य अकादेमी पुरस्कार मिला था।"
    },
    {
        question: "वीरेन डंगवाल की कविताओं की मुख्य विशेषता क्या थी?",
        options: [
            "राष्ट्रीय चेतना और देशभक्ति का भाव",
            "प्रकृति और पर्यावरण का चित्रण",
            "समाज के आम लोगों और हाशिए पर स्थित जीवन के विलक्षण विवरण और दृश्य",
            "रोमांटिक भावनाओं का प्रदर्शन"
        ],
        correctAnswer: 2,
        explanation: "वीरेन डंगवाल की कविताओं में समाज के आम लोगों और हाशिए पर स्थित जीवन के विलक्षण विवरण और दृश्य देखने को मिलते हैं। उन्होंने ऐसी कई चीज़ों और जीव-जंतुओं को अपनी कविताओं का विषय बनाया, जिन्हें हम अक्सर देखकर भी अनदेखा कर देते हैं।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "प्रतीक और धरोहर कितने प्रकार की होती हैं?",
        options: [
            "एक प्रकार की",
            "दो प्रकार की",
            "तीन प्रकार की",
            "चार प्रकार की"
        ],
        correctAnswer: 1,
        explanation: "पाठ के अनुसार, प्रतीक और धरोहर दो तरह की होती हैं।"
    },
    {
        question: "प्रतीक और धरोहर के दो प्रकार कौन से हैं?",
        options: [
            "एक जो पुरानी और एक जो नई है",
            "एक जो विदेशी और एक जो भारतीय है",
            "एक जिनसे हमें अपने देश की उपलब्धियों का एहसास होता है, और दूसरी जो पूर्वजों की गलतियों को बताती हैं",
            "एक जो राष्ट्रीय और एक जो अंतरराष्ट्रीय है"
        ],
        correctAnswer: 2,
        explanation: "पाठ के अनुसार, प्रतीक और धरोहर दो तरह की होती हैं: एक वे जिनसे हमें अपने देश और समाज की पुरानी उपलब्धियों का एहसास होता है, और दूसरी वे जो हमें यह बताती हैं कि हमारे पूर्वजों से कब और क्या गलती हुई थी।"
    },
    {
        question: "ईस्ट इंडिया कंपनी भारत में किस उद्देश्य से आई थी?",
        options: [
            "भारत पर शासन करने",
            "यहाँ के लोगों को शिक्षित करने",
            "व्यापार के इरादे से",
            "भारतीय संस्कृति का अध्ययन करने"
        ],
        correctAnswer: 2,
        explanation: "पाठ के अनुसार, ईस्ट इंडिया कंपनी कभी भारत में व्यापार के इरादे से आई थी।"
    },
    {
        question: "इस पाठ के अनुसार हमें क्या याद रखना चाहिए?",
        options: [
            "भविष्य में कोई ऐसी कंपनी यहाँ पैर न जमाए, जिसके इरादे नेक न हों और जिससे फिर वही तबाही मचे",
            "ईस्ट इंडिया कंपनी के योगदान और विकास कार्यों को",
            "तोप के निर्माण की विधि और प्रक्रिया को",
            "बागों और पार्कों के निर्माण के महत्व को"
        ],
        correctAnswer: 0,
        explanation: "पाठ के अनुसार, हमें यह याद रखना चाहिए कि भविष्य में कोई ऐसी कंपनी यहाँ पैर न जमाए, जिसके इरादे नेक न हों और जिससे फिर वही तबाही मचे जिसके घाव आज भी हमारे दिलों में ताज़ा हैं।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "कविता में तोप कहाँ रखी हुई है?",
        options: [
            "मुख्य चौक पर",
            "संग्रहालय में",
            "कंपनी बाग के प्रवेश द्वार पर",
            "किले के अंदर"
        ],
        correctAnswer: 2,
        explanation: "कविता के अनुसार, तोप कंपनी बाग के प्रवेश द्वार पर रखी गई है।"
    },
    {
        question: "कविता के अनुसार तोप की क्या देखभाल होती है?",
        options: [
            "हर महीने इसे चमकाया जाता है",
            "साल में दो बार इसे चमकाया जाता है",
            "कभी-कभी इसकी सफाई की जाती है",
            "इसकी कोई देखभाल नहीं होती"
        ],
        correctAnswer: 1,
        explanation: "कविता के अनुसार, कंपनी बाग की तरह, इस तोप की भी बहुत देखभाल होती है, और साल में दो बार इसे चमकाया जाता है।"
    },
    {
        question: "चौकीदार सैलानियों को तोप के बारे में क्या बताता है?",
        options: [
            "यह 1857 से पहले की तोप है",
            "इस तोप से अंग्रेजों ने जीत हासिल की थी",
            "यह वही तोप है जिसने अकेले ही कई सूरमाओं के धज्जे उड़ा दिए थे",
            "यह तोप कभी भी इस्तेमाल नहीं की गई थी"
        ],
        correctAnswer: 2,
        explanation: "कविता के अनुसार, चौकीदार सैलानियों को बताता है कि यह वही तोप है जिसने अकेले ही कई सूरमाओं के धज्जे उड़ा दिए थे।"
    },
    {
        question: "कविता में तोप पर अब कौन बैठकर गपशप करते हैं?",
        options: [
            "पर्यटक",
            "चौकीदार",
            "चिड़ियाँ",
            "छोटे लड़के"
        ],
        correctAnswer: 2,
        explanation: "कविता के अनुसार, अब छोटे लड़कों की घुड़सवारी से अगर यह फ़ारिग हो, तो उसके ऊपर बैठकर चिड़ियाँ ही अकसर गपशप करती हैं।"
    },
    {
        question: "कविता के अंत में चिड़ियाँ क्या बताती हैं?",
        options: [
            "कितनी भी बड़ी हो तोप, एक दिन तो होना ही है उसका मुँह बंद",
            "तोप हमेशा ही एक शक्तिशाली हथियार रहेगी",
            "तोप अब केवल एक प्रदर्शनी की वस्तु बन गई है",
            "तोप पर चिड़ियों का बैठना अच्छी बात है"
        ],
        correctAnswer: 0,
        explanation: "कविता के अनुसार, चिड़ियाँ बताती हैं कि दरअसल कितनी भी बड़ी हो तोप, एक दिन तो होना ही है उसका मुँह बंद।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "धरोहर",
    vocab2: "हाशिए",
    vocab3: "स्रष्टा",
    vocab4: "ईस्ट इंडिया कंपनी",
    vocab5: "मुहाने",
    vocab6: "फ़ारिग"
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
    
    // All questions are multiple choice now
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
        
        // All questions are multiple choice now
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

// Save reflection
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    
    if (reflectionText.length < 20) {
        const feedbackEl = document.getElementById('reflectionFeedback');
        feedbackEl.textContent = 'कृपया अधिक विस्तृत चिंतन लिखें (कम से कम 20 अक्षर)।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('reflectionFeedback');
    feedbackEl.textContent = 'आपका चिंतन सहेज लिया गया है!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('prereading', 15);
    }
}
