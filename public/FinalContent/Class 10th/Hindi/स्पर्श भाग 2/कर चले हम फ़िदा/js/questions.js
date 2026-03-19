/**
 * Questions and interactive exercises for Kar Chale Hum Fida
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "कैफ़ी आज़मी का जन्म कब और कहाँ हुआ था?",
        options: [
            "20 जनवरी 1920 को मजमां गाँव में",
            "19 जनवरी 1919 को मजमां गाँव में",
            "19 जनवरी 1919 को आज़मगढ़ शहर में",
            "20 जनवरी 1920 को आज़मगढ़ शहर में"
        ],
        correctAnswer: 1,
        explanation: "कैफ़ी आज़मी का जन्म 19 जनवरी 1919 को उत्तर प्रदेश के आज़मगढ़ ज़िले में मजमां गाँव में हुआ था।"
    },
    {
        question: "कैफ़ी आज़मी की कविताओं की मुख्य विशेषताएँ क्या हैं?",
        options: [
            "केवल सामाजिक जागरूकता",
            "केवल राजनैतिक जागरूकता",
            "केवल हृदय की कोमलता",
            "सामाजिक और राजनैतिक जागरूकता के साथ हृदय की कोमलता"
        ],
        correctAnswer: 3,
        explanation: "कैफ़ी आज़मी की कविताओं में एक ओर सामाजिक और राजनैतिक जागरूकता का समावेश है, तो दूसरी ओर हृदय की कोमलता भी है।"
    },
    {
        question: "कैफ़ी आज़मी का निधन कब हुआ?",
        options: [
            "10 मई 2001 को",
            "10 मई 2002 को",
            "10 जून 2002 को",
            "10 जून 2001 को"
        ],
        correctAnswer: 1,
        explanation: "10 मई 2002 को कैफ़ी आज़मी का निधन हुआ।"
    },
    {
        question: "कैफ़ी आज़मी के परिवार के बारे में क्या जानकारी दी गई है?",
        options: [
            "उनके परिवार के सभी सदस्य शायर थे",
            "उनके तीनों बड़े भाई भी शायर थे और उनकी पत्नी शौकत आज़मी तथा बेटी शबाना आज़मी मशहूर अभिनेत्रियाँ हैं",
            "उनके परिवार में कोई भी कला से जुड़ा नहीं था",
            "उनके परिवार के बारे में कोई जानकारी नहीं दी गई है"
        ],
        correctAnswer: 1,
        explanation: "कैफ़ी कलाकारों के परिवार से थे। उनके तीनों बड़े भाई भी शायर थे। उनकी पत्नी शौकत आज़मी और बेटी शबाना आज़मी मशहूर अभिनेत्रियाँ हैं।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "सैनिक का जीवन आम लोगों के जीवन से कैसे भिन्न होता है?",
        options: [
            "सैनिक अपने लिए जीते हैं जबकि आम लोग दूसरों के लिए",
            "सैनिक अपने लिए नहीं बल्कि दूसरों के जीवन और आज़ादी के लिए लड़ते हैं",
            "सैनिकों को मौत का डर नहीं होता जबकि आम लोगों को होता है",
            "सैनिकों को जीवन से प्रेम नहीं होता जबकि आम लोगों को होता है"
        ],
        correctAnswer: 1,
        explanation: "सैनिक का जीवन आम लोगों से भिन्न होता है क्योंकि वह अपने लिए नहीं, बल्कि जब औरों के जीवन और आज़ादी पर संकट आता है, तब मुकाबले के लिए सीना तानकर खड़ा हो जाता है।"
    },
    {
        question: "शांतिप्रिय जीव भी किस परिस्थिति में मुकाबले के लिए तैयार हो जाते हैं?",
        options: [
            "जब उन्हें भूख लगती है",
            "जब उनके प्राणों पर संकट आता है",
            "जब उन्हें प्रेरणा मिलती है",
            "जब वे अकेले होते हैं"
        ],
        correctAnswer: 1,
        explanation: "शांतिप्रिय जीव भी अपने प्राणों पर संकट आने पर मुकाबले के लिए तैयार हो जाते हैं।"
    },
    {
        question: "इस कविता की पृष्ठभूमि क्या है?",
        options: [
            "एक प्रेम कहानी",
            "युद्ध की पृष्ठभूमि पर बनी फ़िल्म 'हक़ीक़त'",
            "भारत के स्वतंत्रता संग्राम की कहानी",
            "किसान आंदोलन"
        ],
        correctAnswer: 1,
        explanation: "यह पाठ, युद्ध की पृष्ठभूमि पर बनी फ़िल्म 'हक़ीक़त' के लिए लिखा गया था।"
    },
    {
        question: "कविता में सैनिकों की क्या भावना व्यक्त की गई है?",
        options: [
            "युद्ध से हारने का डर",
            "अपनी जान की परवाह किए बिना देश की रक्षा के लिए बलिदान देने की तत्परता",
            "शत्रु के प्रति क्रोध और बदला लेने की इच्छा",
            "युद्ध से बचने की इच्छा"
        ],
        correctAnswer: 1,
        explanation: "कविता में ऐसे सैनिकों के दिल की आवाज़ बयां की गई है, जिन्हें अपने किए पर गर्व है। इसी के साथ उन्हें अपने देशवासियों से कुछ अपेक्षाएँ भी हैं।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "इस कविता का प्रतिपाद्य अपने शब्दों में लिखिए।",
        options: [
            "सैनिकों का वीर गाथा और उनकी बहादुरी का वर्णन",
            "देशभक्ति और देश के लिए बलिदान की भावना",
            "युद्ध की विभीषिका और उसके दुष्प्रभाव",
            "स्वतंत्रता आंदोलन का इतिहास"
        ],
        correctAnswer: 1,
        explanation: "इस कविता का प्रतिपाद्य है देशभक्ति और देश के लिए अपने प्राणों का बलिदान देने की भावना। इसमें सैनिकों द्वारा देश की रक्षा के लिए अपनी जान न्योछावर करने का भाव व्यक्त किया गया है।"
    },
    {
        question: "कविता में सैनिकों की क्या भावना व्यक्त की गई है?",
        options: [
            "युद्ध से हारने का डर",
            "अपनी जान की परवाह किए बिना देश की रक्षा के लिए बलिदान देने की तत्परता",
            "शत्रु के प्रति क्रोध और बदला लेने की इच्छा",
            "युद्ध से बचने की इच्छा"
        ],
        correctAnswer: 1,
        explanation: "कविता में सैनिकों की देश के लिए अपनी जान की परवाह किए बिना बलिदान देने की तत्परता व्यक्त की गई है। वे देश की रक्षा के लिए अपने प्राणों का त्याग करने के लिए तैयार हैं।"
    },
    {
        question: "कैफ़ी आज़मी के परिवार के बारे में क्या जानकारी दी गई है?",
        options: [
            "उनके परिवार के सभी सदस्य शायर थे",
            "उनके तीनों बड़े भाई शायर थे और उनकी पत्नी शौकत आज़मी तथा बेटी शबाना आज़मी मशहूर अभिनेत्रियाँ हैं",
            "उनके परिवार में कोई भी कला से जुड़ा नहीं था",
            "उनके परिवार के बारे में कोई जानकारी नहीं दी गई है"
        ],
        correctAnswer: 1,
        explanation: "लेखक परिचय में बताया गया है कि कैफ़ी कलाकारों के परिवार से थे। उनके तीनों बड़े भाई भी शायर थे। उनकी पत्नी शौकत आज़मी और बेटी शबाना आज़मी मशहूर अभिनेत्रियाँ हैं।"
    },
    {
        question: "'सर हिमालय का हमने न झुकने दिया', इस पंक्ति में हिमालय किस बात का प्रतीक है?",
        options: [
            "भारत की भौगोलिक सीमा का",
            "भारत के गौरव और अखंडता का",
            "भारतीय संस्कृति का",
            "प्राकृतिक सौंदर्य का"
        ],
        correctAnswer: 1,
        explanation: "इस पंक्ति में हिमालय भारत के गौरव और अखंडता का प्रतीक है। सैनिकों ने अपने बलिदान से देश के गौरव और अखंडता को बनाए रखा।"
    },
    {
        question: "इस गीत में धरती को दुलहन क्यों कहा गया है?",
        options: [
            "क्योंकि धरती को युद्ध में सजाया गया है",
            "क्योंकि धरती देश के युवाओं से विवाह करना चाहती है",
            "क्योंकि सैनिकों के रक्त से धरती सजी है और वे अपने बलिदान से उसकी रक्षा कर रहे हैं",
            "क्योंकि धरती में फूल खिल रहे हैं"
        ],
        correctAnswer: 2,
        explanation: "सैनिकों के रक्त से धरती सजी है और वे अपने बलिदान से उसकी रक्षा कर रहे हैं, इसलिए उसे दुलहन कहा गया है। वे अपना जीवन देश पर न्योछावर कर रहे हैं।"
    },
    {
        question: "कवि ने इस कविता में किस क़ाफ़िले को आगे बढ़ाते रहने की बात कही है?",
        options: [
            "सैनिकों के क़ाफ़िले को",
            "क़ुर्बानियों (बलिदान) के क़ाफ़िले को",
            "युद्ध के क़ाफ़िले को",
            "प्रेम के क़ाफ़िले को"
        ],
        correctAnswer: 1,
        explanation: "कवि ने क़ुर्बानियों (बलिदान) के क़ाफ़िले को आगे बढ़ाते रहने की बात कही है। 'राह क़ुर्बानियों की न वीरान हो, तुम सजाते ही रहना नए क़ाफ़िले' से स्पष्ट है कि कवि चाहता है कि देशभक्ति और बलिदान की परंपरा जारी रहे।"
    },
    {
        question: "इस कविता का प्रतिपाद्य अपने शब्दों में लिखिए।",
        options: [
            "सैनिकों का वीर गाथा और उनकी बहादुरी का वर्णन",
            "देशभक्ति और देश के लिए बलिदान की भावना",
            "युद्ध की विभीषिका और उसके दुष्प्रभाव",
            "स्वतंत्रता के महत्व और उसकी रक्षा के लिए एकजुट होने का आह्वान"
        ],
        correctAnswer: 1,
        explanation: "इस कविता का प्रतिपाद्य है देशभक्ति और बलिदान की महत्ता। कविता में सैनिकों की भावनाओं को व्यक्त किया गया है जो अपना सर्वस्व देश पर न्योछावर कर देते हैं और देशवासियों से आशा करते हैं कि वे देश की रक्षा और स्वतंत्रता के महत्व को समझें।"
    },
    {
        question: "इस गीत में 'सर पर कफ़न बाँधना' किस ओर संकेत करता है?",
        options: [
            "सैनिकों की हताशा की ओर",
            "युद्ध के भय की ओर",
            "मृत्यु के स्वागत और बलिदान के लिए तैयार रहने की ओर",
            "शांति की इच्छा की ओर"
        ],
        correctAnswer: 2,
        explanation: "इस गीत में 'सर पर कफ़न बाँधना' मृत्यु का स्वागत करने और बलिदान के लिए तैयार रहने का प्रतीक है। सैनिक जानते हैं कि वे देश के लिए अपनी जान दे सकते हैं और वे इसके लिए तैयार हैं।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "न्योछावर",
    vocab2: "सुपुर्द",
    vocab3: "मौसम",
    vocab4: "बदनाम",
    vocab5: "निडरता",
    vocab6: "त्याग"
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
    
    if (question.type === 'text') {
        // Text input question
        optionsHTML = `
            <textarea id="${questionId}" class="question-textarea" rows="4" placeholder="अपना उत्तर यहाँ लिखें..."></textarea>
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
        
        if (question.type === 'text') {
            // Text input question
            const userAnswer = document.getElementById(questionId).value.trim();
            const isCorrect = question.evaluationFunction(userAnswer);
            
            feedbackEl.textContent = isCorrect ? 
                '✓ सही!' : 
                `✗ नमूना उत्तर: ${question.sampleAnswer}`;
            feedbackEl.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            
            if (isCorrect) correctCount++;
        } else {
            // Multiple choice question
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

// Function to highlight correct answer when user selects any option
window.highlightCorrectAnswer = function(questionName, correctAnswer) {
    console.log(`Highlighting correct answer for ${questionName}: ${correctAnswer}`);
    
    // Clear previous highlights for this question only
    const allOptions = document.querySelectorAll(`input[name="${questionName}"]`);
    allOptions.forEach(option => {
        option.closest('.mcq-option').classList.remove('correct-answer', 'incorrect-answer');
    });
    
    // Find the correct option and mark it in green
    const correctOption = Array.from(allOptions).find(option => option.value === correctAnswer);
    if (correctOption) {
        correctOption.closest('.mcq-option').classList.add('correct-answer');
    }
    
    // Find the selected option and mark it in red if it's wrong
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    if (selectedOption && selectedOption.value !== correctAnswer) {
        selectedOption.closest('.mcq-option').classList.add('incorrect-answer');
    }
};

// Function for checking contraction exercises
window.checkContractions = function() {
    console.log("Checking contraction answers...");
    
    // Clear previous highlights
    document.querySelectorAll('.mcq-option').forEach(opt => {
        opt.classList.remove('correct-answer', 'incorrect-answer');
    });
    
    // Define correct answers for each question
    const correctAnswers = {
        'contraction1': 'वीरगति प्राप्त करना',
        'contraction2': 'शरीर का ठंडा होना',
        'contraction3': 'बलिदान का समय',
        'contraction4': 'विद्रोह या विरोध करने लगे'
    };
    
    let correctCount = 0;
    let totalCount = Object.keys(correctAnswers).length;
    
    // Process each question
    Object.keys(correctAnswers).forEach(questionName => {
        const correctAnswer = correctAnswers[questionName];
        
        // Find the selected radio button for this question
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        
        // Find all options for this question
        const allOptions = document.querySelectorAll(`input[name="${questionName}"]`);
        
        // Find the correct option
        const correctOption = Array.from(allOptions).find(option => option.value === correctAnswer);
        
        // Always mark the correct answer in green (regardless of selection)
        if (correctOption) {
            correctOption.closest('.mcq-option').classList.add('correct-answer');
            console.log(`Marked correct option for ${questionName}: ${correctAnswer}`);
        }
        
        // If user selected an option
        if (selectedOption) {
            const isCorrect = selectedOption.value === correctAnswer;
            const selectedValue = selectedOption.value;
            
            if (isCorrect) {
                correctCount++;
                console.log(`User selected correct answer for ${questionName}`);
            } else {
                // Only if selected and wrong, mark it in red
                selectedOption.closest('.mcq-option').classList.add('incorrect-answer');
                console.log(`User selected wrong answer for ${questionName}: ${selectedValue}`);
            }
        }
    });
    
    // Show overall feedback with exact count of correct answers
    const feedbackEl = document.getElementById('contractionFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        // Update progress if all correct
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 15);
        }
    }
};

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
