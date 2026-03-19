/**
 * Questions and interactive exercises for Rahim Ke Dohe
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "रहीम का जन्म कब और कहाँ हुआ था?",
        options: [
            "1556 में दिल्ली में",
            "1556 में लाहौर में",
            "1550 में आगरा में",
            "1560 में लाहौर में"
        ],
        correctAnswer: 1,
        explanation: "रहीम का जन्म लाहौर (अब पाकिस्तान) में सन् 1556 में हुआ था।"
    },
    {
        question: "रहीम का पूरा नाम क्या था?",
        options: [
            "अब्दुल रहीम",
            "रहीम खान",
            "अब्दुर्रहीम खानखाना",
            "खान अब्दुर्रहीम"
        ],
        correctAnswer: 2,
        explanation: "रहीम का पूरा नाम अब्दुर्रहीम खानखाना था।"
    },
    {
        question: "रहीम किसके नवरत्नों में से एक थे?",
        options: [
            "शाहजहाँ के",
            "औरंगजेब के",
            "अकबर के",
            "जहाँगीर के"
        ],
        correctAnswer: 2,
        explanation: "रहीम अकबर के नवरत्नों में से एक थे।"
    },
    {
        question: "रहीम के काव्य का मुख्य विषय क्या था?",
        options: [
            "केवल श्रृंगार",
            "केवल नीति",
            "केवल भक्ति",
            "श्रृंगार, नीति और भक्ति"
        ],
        correctAnswer: 3,
        explanation: "रहीम के काव्य का मुख्य विषय श्रृंगार, नीति और भक्ति है।"
    },
    {
        question: "रहीम को किन भाषाओं पर अधिकार था?",
        options: [
            "केवल हिंदी",
            "हिंदी और संस्कृत",
            "अरबी, फ़ारसी, संस्कृत और हिंदी",
            "अरबी और फ़ारसी"
        ],
        correctAnswer: 2,
        explanation: "रहीम अरबी, फ़ारसी, संस्कृत और हिंदी के अच्छे जानकार थे।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "रहीम के दोहों की मुख्य विशेषता क्या है?",
        options: [
            "वे केवल श्रृंगार पर आधारित हैं",
            "वे नीतिपरक हैं और दैनिक जीवन के दृष्टांत देते हैं",
            "वे केवल धार्मिक विषयों पर हैं",
            "वे बहुत कठिन भाषा में लिखे गए हैं"
        ],
        correctAnswer: 1,
        explanation: "रहीम के नीतिपरक दोहे ज़्यादा प्रचलित हैं, जिनमें दैनिक जीवन के दृष्टांत देकर कवि ने उन्हें सहज, सरल और बोधगम्य बना दिया है।"
    },
    {
        question: "रहीम की नीतिपरक उक्तियों पर किसका प्रभाव दिखाई देता है?",
        options: [
            "अरबी कवियों का",
            "फ़ारसी कवियों का",
            "संस्कृत कवियों का",
            "अंग्रेजी कवियों का"
        ],
        correctAnswer: 2,
        explanation: "इनकी नीतिपरक उक्तियों पर संस्कृत कवियों की स्पष्ट छाप परिलक्षित होती है।"
    },
    {
        question: "रहीम के दोहे क्यों आसानी से याद हो जाते हैं?",
        options: [
            "क्योंकि वे बहुत छोटे हैं",
            "क्योंकि वे सरल और सहज भाषा में लिखे गए हैं",
            "क्योंकि वे केवल दो पंक्तियों में हैं",
            "क्योंकि वे केवल नीति पर आधारित हैं"
        ],
        correctAnswer: 1,
        explanation: "रहीम के दोहे सर्वसाधारण को आसानी से याद हो जाते हैं क्योंकि वे सरल और सहज भाषा में लिखे गए हैं।"
    },
    {
        question: "रहीम को किन भाषाओं पर समान अधिकार था?",
        options: [
            "अवधी और ब्रज",
            "हिंदी और संस्कृत",
            "अरबी और फ़ारसी",
            "संस्कृत और अरबी"
        ],
        correctAnswer: 0,
        explanation: "रहीम को अवधी और ब्रज दोनों भाषाओं पर समान अधिकार था।"
    },
    {
        question: "रहीम के दोहों की प्रासंगिकता क्यों है?",
        options: [
            "क्योंकि वे बहुत पुराने हैं",
            "क्योंकि वे आज भी उतने ही प्रासंगिक हैं जितने पहले थे",
            "क्योंकि वे केवल नीति पर आधारित हैं",
            "क्योंकि वे बहुत सरल हैं"
        ],
        correctAnswer: 1,
        explanation: "रहीम के दोहों में व्यक्त विचार और संदेश आज भी उतने ही प्रासंगिक हैं जितने पहले थे।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "प्रेम का धागा टूटने पर क्या होता है?",
        options: [
            "वह फिर से जुड़ जाता है",
            "वह फिर नहीं मिलता, मिले तो गाँठ पड़ जाती है",
            "वह और मजबूत हो जाता है",
            "वह पहले से भी अच्छा हो जाता है"
        ],
        correctAnswer: 1,
        explanation: "रहीम कहते हैं कि प्रेम का धागा टूटने पर फिर नहीं मिलता, और अगर मिले तो गाँठ पड़ जाती है।"
    },
    {
        question: "हमें अपना दुःख दूसरों पर क्यों नहीं प्रकट करना चाहिए?",
        options: [
            "क्योंकि वे हमारी मदद नहीं करेंगे",
            "क्योंकि वे हमारा मज़ाक उड़ाएंगे और कोई भी हमारा दुःख नहीं बाँटेगा",
            "क्योंकि वे हमें कमजोर समझेंगे",
            "क्योंकि वे हमारी बात नहीं सुनेंगे"
        ],
        correctAnswer: 1,
        explanation: "रहीम कहते हैं कि अपना दुःख मन में ही रखना चाहिए क्योंकि लोग सुनकर मज़ाक उड़ाएंगे और कोई भी हमारा दुःख नहीं बाँटेगा।"
    },
    {
        question: "एक को साधने से सब कैसे सध जाता है?",
        options: [
            "क्योंकि सब एक-दूसरे से जुड़े हैं",
            "क्योंकि जैसे पौधे की जड़ में पानी देने से फूल-फल सब अच्छे होते हैं",
            "क्योंकि सब एक ही सिद्धांत पर काम करते हैं",
            "क्योंकि सब एक ही दिशा में जाते हैं"
        ],
        correctAnswer: 1,
        explanation: "रहीम कहते हैं कि जैसे पौधे की जड़ (मूल) में पानी देने से फूल-फल सब अच्छे होते हैं, वैसे ही एक को साधने से सब सध जाता है।"
    },
    {
        question: "रहीम ने सागर की अपेक्षा पंक जल को धन्य क्यों कहा है?",
        options: [
            "क्योंकि पंक जल पीने योग्य है",
            "क्योंकि पंक जल छोटे जीवों को तृप्त करता है, जबकि सागर की बड़ाई किस काम की जब दुनिया प्यासी रह जाए",
            "क्योंकि पंक जल सागर से अधिक मूल्यवान है",
            "क्योंकि पंक जल सागर से अधिक उपयोगी है"
        ],
        correctAnswer: 1,
        explanation: "रहीम कहते हैं कि पंक जल धन्य है क्योंकि वह छोटे जीवों को तृप्त करता है, जबकि सागर की बड़ाई किस काम की जब दुनिया प्यासी रह जाए।"
    },
    {
        question: "पानी के महत्त्व को किस प्रकार समझाया गया है?",
        options: [
            "पानी के बिना कुछ नहीं हो सकता",
            "पानी के बिना सब सूना है, पानी गए तो मोती, मनुष्य, चूना कुछ भी नहीं बच सकता",
            "पानी जीवन का आधार है",
            "पानी के बिना कोई काम नहीं हो सकता"
        ],
        correctAnswer: 1,
        explanation: "रहीम कहते हैं कि पानी के बिना सब सूना है और पानी गए तो मोती, मनुष्य, चूना कुछ भी नहीं बच सकता।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "अवधी",
    vocab2: "ब्रज",
    vocab3: "नीतिपरक",
    vocab4: "अकबर",
    vocab5: "अब्दुर्रहीम खानखाना",
    vocab6: "1556"
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

// Initialize contractions checking
function initContractionsChecking() {
    const contractionAnswers = {
        contraction1: "जैसे",
        contraction2: "कुछ",
        contraction3: "नहीं",
        contraction4: "कोई",
        contraction5: "धन्य",
        contraction6: "अक्षर",
        contraction7: "जीव",
        contraction8: "थोड़ा"
    };
    
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

// Initialize contractions checking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContractionsChecking();
});
