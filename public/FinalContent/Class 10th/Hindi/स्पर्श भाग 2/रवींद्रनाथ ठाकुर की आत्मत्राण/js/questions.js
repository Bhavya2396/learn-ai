/**
 * Questions and interactive exercises for Ravindranath Tagore's Atmatran
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "रवींद्रनाथ ठाकुर का जन्म कब और कहाँ हुआ था?",
        options: [
            "6 मई 1860 को दिल्ली में",
            "6 मई 1861 को बंगाल में",
            "6 मई 1861 को कोलकाता में",
            "6 मई 1862 को बंगाल में"
        ],
        correctAnswer: 1,
        explanation: "रवींद्रनाथ ठाकुर का जन्म 6 मई 1861 को बंगाल के एक संपन्न परिवार में हुआ था, जैसा कि पाठ में बताया गया है।"
    },
    {
        question: "रवींद्रनाथ ठाकुर को किस कृति के लिए नोबेल पुरस्कार मिला?",
        options: [
            "नैवेद्य के लिए",
            "गीतांजलि के लिए",
            "गोरा के लिए",
            "पूरबी के लिए"
        ],
        correctAnswer: 1,
        explanation: "रवींद्रनाथ ठाकुर को उनकी काव्य कृति गीतांजलि के लिए नोबेल पुरस्कार से सम्मानित किया गया था।"
    },
    {
        question: "रवींद्रनाथ ठाकुर ने किस संस्था की स्थापना की?",
        options: [
            "विश्व भारती",
            "शांति निकेतन",
            "गीतांजलि अकादमी",
            "कला भवन"
        ],
        correctAnswer: 1,
        explanation: "रवींद्रनाथ ठाकुर ने शांति निकेतन नाम की एक शैक्षिक और सांस्कृतिक संस्था की स्थापना की।"
    },
    {
        question: "रवींद्रनाथ ठाकुर ने कितनी कविताएँ और गीत लिखे?",
        options: [
            "लगभग 500 कविताएँ और 1000 गीत",
            "लगभग 2000 कविताएँ और 500 गीत",
            "लगभग 1000 कविताएँ और 2000 गीत",
            "लगभग 1500 कविताएँ और 1500 गीत"
        ],
        correctAnswer: 2,
        explanation: "रवींद्रनाथ ठाकुर ने लगभग एक हज़ार कविताएँ और दो हज़ार गीत लिखे हैं।"
    },
    {
        question: "रवींद्रनाथ ठाकुर की प्रमुख कृतियाँ कौन-सी हैं?",
        options: [
            "लिली, पद्मा, आंधी",
            "नैवैद्य, पूरबी, बलाका, क्षणिका",
            "चांदनी रात, पर्वत माला",
            "हिमालय, गंगा, सागर"
        ],
        correctAnswer: 1,
        explanation: "रवींद्रनाथ ठाकुर की प्रमुख कृतियाँ हैं- नैवैद्य, पूरबी, बलाका, क्षणिका, चित्र और सांध्यगीत, काबुलीवाला और सैकड़ों अन्य कहानियाँ; उपन्यास-गोरा, घरे बाइरे और रवींद्र के निबंध।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "प्रस्तुत कविता का बंगला से हिंदी में अनुवाद किसने किया है?",
        options: [
            "रवींद्रनाथ ठाकुर",
            "हजारीप्रसाद द्विवेदी",
            "प्रेमचंद",
            "महादेवी वर्मा"
        ],
        correctAnswer: 1,
        explanation: "रवींद्रनाथ ठाकुर की प्रस्तुत कविता का बंगला से हिंदी में अनुवाद श्रद्धेय आचार्य हजारीप्रसाद द्विवेदी जी ने किया है।"
    },
    {
        question: "प्रस्तुत कविता में कविगुरु किस विषय पर अपने विचार प्रस्तुत कर रहे हैं?",
        options: [
            "प्रकृति के सौंदर्य पर",
            "स्वयं के संघर्ष और प्रभु से सहायता पर",
            "समाज की समस्याओं पर",
            "प्रेम और त्याग पर"
        ],
        correctAnswer: 1,
        explanation: "कविगुरु मानते हैं कि प्रभु में सब कुछ संभव कर देने की सामर्थ्य है, फिर भी वह यह कतई नहीं चाहते कि वही सब कुछ कर दें। कवि कामना करता है कि किसी भी आपद-विपद में, किसी भी द्वंद्व में सफल होने के लिए संघर्ष वह स्वयं करे, प्रभु को कुछ न करना पड़े।"
    },
    {
        question: "पाठ प्रवेश में क्या उदाहरण दिया गया है?",
        options: [
            "पेड़ और पक्षी का",
            "तैराक और परीक्षार्थी का",
            "माता और बच्चे का",
            "शिक्षक और छात्र का"
        ],
        correctAnswer: 1,
        explanation: "पाठ प्रवेश में तैरना चाहने वाले और परीक्षा देने जाने वाले का उदाहरण दिया गया है। तैरना चाहने वाला जब स्वयं हाथ-पाँव चलाता है तभी तैराक बन पाता है, और परीक्षा देने वाले को स्वयं ही परीक्षा देनी होती है।"
    },
    {
        question: "अनुवाद के बारे में क्या बताया गया है?",
        options: [
            "अनुवाद से मूल रचना का अर्थ बदल जाता है",
            "अनुवाद मूल रचना की 'आत्मा' को अक्षुण्ण बनाए रखने में सक्षम है",
            "अनुवाद करना बहुत कठिन है",
            "अनुवाद की आवश्यकता नहीं है"
        ],
        correctAnswer: 1,
        explanation: "द्विवेदी जी का अनुवाद बताता है कि अनुवाद कैसे मूल रचना की 'आत्मा' को अक्षुण्ण बनाए रखने में सक्षम है।"
    },
    {
        question: "कवि अपने प्रभु से क्या चाहते हैं?",
        options: [
            "प्रभु उन्हें सारे कष्टों से बचा लें",
            "प्रभु उन्हें शक्ति प्रदान करें",
            "किसी भी आपद-विपद में संघर्ष वह स्वयं करे, प्रभु को कुछ न करना पड़े",
            "प्रभु उनके जीवन को सुखमय बना दें"
        ],
        correctAnswer: 2,
        explanation: "कवि कामना करता है कि किसी भी आपद-विपद में, किसी भी द्वंद्व में सफल होने के लिए संघर्ष वह स्वयं करे, प्रभु को कुछ न करना पड़े।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "कवि किससे और क्या प्रार्थना कर रहा है?",
        options: [
            "कवि प्रभु से विपदाओं से बचाने की प्रार्थना कर रहा है",
            "कवि प्रभु से विपदाओं में भय न आने की प्रार्थना कर रहा है",
            "कवि प्रभु से अपना त्राण करने की प्रार्थना कर रहा है",
            "कवि प्रभु से दुःख कम करने की प्रार्थना कर रहा है"
        ],
        correctAnswer: 1,
        explanation: "कवि प्रभु से प्रार्थना कर रहा है कि उसे विपदाओं से बचाने की बात नहीं, बल्कि विपदाओं में भय न आए।"
    },
    {
        question: "दुःख-ताप के संदर्भ में कवि की क्या इच्छा है?",
        options: [
            "दुःख-ताप से मुक्ति",
            "दुःख-ताप में सांत्वना",
            "दुःख-ताप को जीतने की शक्ति",
            "दुःख-ताप का न होना"
        ],
        correctAnswer: 2,
        explanation: "कवि की इच्छा है कि दुःख-ताप से व्यथित चित्त को सांत्वना न दी जाए, बल्कि उसे दुख को जीतने की शक्ति मिले।"
    },
    {
        question: "कवि सहायता न मिलने पर क्या प्रार्थना करता है?",
        options: [
            "सहायता मिले",
            "अपना बल पौरुष न हिले",
            "दुःख कम हो",
            "परिस्थिति बदल जाए"
        ],
        correctAnswer: 1,
        explanation: "कवि प्रार्थना करता है कि यदि कोई कहीं सहायक न मिले तो भी उसका अपना बल और पौरुष न हिले।"
    },
    {
        question: "कवि भार के संदर्भ में क्या प्रार्थना करता है?",
        options: [
            "भार कम कर दिया जाए",
            "भार को उठाने की सहायता मिले",
            "भार को वहन करने की शक्ति मिले",
            "भार ही न दिया जाए"
        ],
        correctAnswer: 2,
        explanation: "कवि प्रार्थना करता है कि उसका भार लघु न किया जाए, बल्कि उसे भार को वहन करने की शक्ति मिले।"
    },
    {
        question: "'आत्मत्राण' शीर्षक की सार्थकता क्या है?",
        options: [
            "यह शीर्षक केवल सुंदर लगता है",
            "इसका कविता से कोई संबंध नहीं है",
            "आत्मत्राण का अर्थ है प्रभु से त्राण पाना",
            "आत्मत्राण का अर्थ है स्वयं का उद्धार, कवि स्वयं संघर्ष करने की शक्ति माँगता है"
        ],
        correctAnswer: 3,
        explanation: "'आत्मत्राण' का अर्थ है स्वयं का उद्धार। कविता में कवि बार-बार प्रभु से यही प्रार्थना करता है कि वह स्वयं संघर्ष कर सके, प्रभु उसका त्राण न करे। इस प्रकार शीर्षक कविता के मूल भाव को स्पष्ट करता है और पूर्णतः सार्थक है।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "मुसीबत",
    vocab2: "सहानुभूति",
    vocab3: "उद्धार",
    vocab4: "भयभीत",
    vocab5: "विनय",
    vocab6: "प्रतिदिन"
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
    
    // Initialize contraction feedback system
    initContractionFeedback();
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

// Constants for contraction answers
const contractionAnswers = {
    "contraction1": "दूसरों पर दया करने वाला",
    "contraction2": "कष्ट की पीड़ा",
    "contraction3": "दुखी",
    "contraction4": "पराक्रम",
    "contraction5": "नाश",
    "contraction6": "स्वस्थ",
    "contraction7": "झुका हुआ सिर",
    "contraction8": "दुख की रात"
};

// Initialize contraction feedback system
function initContractionFeedback() {
    Object.keys(contractionAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            // Add feedback spans after each select element
            const feedbackSpan = document.createElement('span');
            feedbackSpan.className = 'contraction-feedback';
            feedbackSpan.id = `${id}-feedback`;
            select.parentNode.appendChild(feedbackSpan);
            
            // Add change event listener to provide immediate feedback
            select.addEventListener('change', function() {
                provideFeedback(id);
            });
        }
    });
}

// Provide immediate feedback for a contraction selection
function provideFeedback(id) {
    const select = document.getElementById(id);
    const feedbackSpan = document.getElementById(`${id}-feedback`);
    
    if (select && feedbackSpan) {
        const userAnswer = select.value;
        const correctAnswer = contractionAnswers[id];
        const isCorrect = userAnswer === correctAnswer;
        
        // Visual feedback on select element
        select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
        
        // Feedback message with icon
        if (userAnswer) {
            feedbackSpan.innerHTML = isCorrect ? 
                '<span style="color: #4caf50; margin-left: 10px;">✓ सही उत्तर!</span>' : 
                '<span style="color: #f44336; margin-left: 10px;">✗ गलत उत्तर!</span>';
        } else {
            feedbackSpan.innerHTML = '';
        }
    }
}

// Check all contractions and provide overall feedback
window.checkContractions = function() {
    let correctCount = 0;
    let totalCount = 0;
    
    Object.keys(contractionAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            totalCount++;
            const isCorrect = select.value === contractionAnswers[id];
            // Refresh feedback for all items
            provideFeedback(id);
            if (isCorrect) correctCount++;
        }
    });
    
    const feedbackEl = document.getElementById('contractionFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `आपने ${items.length} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === items.length ? 'success' : 'error');
        
        if (correctCount === items.length && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 15);
        }
    }
};

// Rate reflection
window.rateReflection = function(element) {
    // First, get all reflection options and remove any existing classes
    const allOptions = document.querySelectorAll('.reflection-option');
    allOptions.forEach(opt => {
        opt.classList.remove('best', 'better', 'good');
    });
    
    // Select the radio button for this option
    const radioBtn = element.querySelector('input[type="radio"]');
    radioBtn.checked = true;
    
    // Add appropriate class based on the data-value
    const rating = element.getAttribute('data-value');
    element.classList.add(rating);
    
    // Show feedback message
    const feedbackEl = document.getElementById('reflectionFeedback');
    
    let feedbackText = '';
    let feedbackClass = '';
    
    switch(rating) {
        case 'best':
            feedbackText = '⭐⭐⭐ उत्तम! आपका उत्तर आत्मत्राण के सर्वोत्तम अर्थ को दर्शाता है। आत्मत्राण में स्वयं के संघर्ष और ईश्वर से शक्ति प्राप्ति की भावना का महत्वपूर्ण संतुलन है।';
            feedbackClass = 'success';
            break;
        case 'better':
            feedbackText = '⭐⭐ बहुत अच्छा! आपका उत्तर आत्मत्राण के मूल अर्थ को समझता है। हालाँकि, आप ईश्वर और व्यक्ति के बीच संबंध के आयाम पर और विचार कर सकते हैं।';
            feedbackClass = 'success';
            break;
        case 'good':
            feedbackText = '⭐ अच्छा! आपका उत्तर आत्मत्राण के आध्यात्मिक पहलू पर प्रकाश डालता है, लेकिन कविता के संदर्भ में स्वयं के संघर्ष के महत्व पर और ध्यान देना चाहिए।';
            feedbackClass = 'success';
            break;
    }
    
    if (feedbackEl) {
        feedbackEl.textContent = feedbackText;
        feedbackEl.className = `feedback-message show ${feedbackClass}`;
    }
    
    // Update progress for any selection
    if (typeof updateProgress === 'function') {
        updateProgress('prereading', 15);
    }
}
