/**
 * Questions and interactive exercises for Kartoos
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "हबीब तनवीर का जन्म कब और कहाँ हुआ था?",
        options: [
            "1 सितंबर, 1923 को रायपुर, छत्तीसगढ़ में",
            "1 सितंबर, 1923 को भोपाल, मध्य प्रदेश में",
            "16 अगस्त, 1923 को भोपाल, मध्य प्रदेश में",
            "16 अगस्त, 1925 को नागपुर, महाराष्ट्र में"
        ],
        correctAnswer: 1,
        explanation: "हबीब तनवीर का जन्म 1 सितंबर, 1923 को भोपाल, मध्य प्रदेश में हुआ था।"
    },
    {
        question: "हबीब तनवीर ने किस प्रकार का नाट्य रंगमंच स्थापित किया?",
        options: [
            "नया थिएटर",
            "अभिनव रंगमंडल",
            "लोक रंगमंच",
            "नया थिएटर और स्टेज सोसायटी"
        ],
        correctAnswer: 0,
        explanation: "हबीब तनवीर ने 'नया थिएटर' नामक नाट्य रंगमंच की स्थापना की थी।"
    },
    {
        question: "हबीब तनवीर को किस वर्ष पद्म विभूषण से सम्मानित किया गया?",
        options: [
            "1969",
            "1983",
            "1993",
            "2002"
        ],
        correctAnswer: 3,
        explanation: "हबीब तनवीर को 2002 में पद्म विभूषण से सम्मानित किया गया था।"
    },
    {
        question: "हबीब तनवीर के प्रमुख नाटकों में से कौन सा है?",
        options: [
            "आधे अधूरे",
            "आगरा बाजार",
            "अंधायुग",
            "घासीराम कोतवाल"
        ],
        correctAnswer: 1,
        explanation: "आगरा बाजार हबीब तनवीर के प्रमुख नाटकों में से एक है।"
    },
    {
        question: "हबीब तनवीर के नाटक 'कारतूस' का मुख्य पात्र कौन है?",
        options: [
            "कबीर",
            "वज़ीर अली",
            "टीपू सुल्तान",
            "नाना फडनवीस"
        ],
        correctAnswer: 1,
        explanation: "हबीब तनवीर के नाटक 'कारतूस' का मुख्य पात्र वज़ीर अली है।"
    }
];

// Reading comprehension questions for Play Introduction (नाटक परिचय)
const playIntroQuestions = [
    {
        question: "अंग्रेज़ भारत में किस रूप में आए थे?",
        options: [
            "राजनयिक के रूप में",
            "पर्यटक के रूप में",
            "व्यापारी के रूप में",
            "शासक के रूप में"
        ],
        correctAnswer: 2,
        explanation: "अंग्रेज़ इस देश में व्यापारी के भेष में आए थे और शुरू में व्यापार ही करते रहे।"
    },
    {
        question: "वज़ीर अली का एकमात्र लक्ष्य क्या था?",
        options: [
            "अवध के शासक बनना",
            "अंग्रेज़ों को हिंदुस्तान से बाहर करना",
            "कंपनी के वकील की हत्या करना",
            "कर्नल से कारतूस लेना"
        ],
        correctAnswer: 1,
        explanation: "वज़ीर अली का एकमात्र लक्ष्य अंग्रेज़ों को हिंदुस्तान से बाहर करना था।"
    },
    {
        question: "वज़ीर अली को किसने अवध से हटाया था?",
        options: [
            "कंपनी ने",
            "सआदत अली ने",
            "कर्नल कालिंज ने",
            "मराठों ने"
        ],
        correctAnswer: 0,
        explanation: "वज़ीर अली को अवध से कंपनी (ईस्ट इंडिया कंपनी) ने हटाया था।"
    },
    {
        question: "कंपनी ने अवध में वज़ीर अली की जगह किसे बिठाया?",
        options: [
            "टीपू सुल्तान को",
            "नाना फडनवीस को",
            "सआदत अली को",
            "कर्नल कालिंज को"
        ],
        correctAnswer: 2,
        explanation: "वज़ीर अली को हटाकर कंपनी ने अवध में सआदत अली को बिठाया था।"
    },
    {
        question: "नाटक में वज़ीर अली को कैसा व्यक्ति दिखाया गया है?",
        options: [
            "डरपोक और संदेहशील",
            "निडर और देशभक्त",
            "चालाक और स्वार्थी",
            "ऐश पसंद और आलसी"
        ],
        correctAnswer: 1,
        explanation: "नाटक में वज़ीर अली को एक निडर और देशभक्त व्यक्ति के रूप में दिखाया गया है।"
    }
];

// Reading comprehension questions for Play (नाटक)
const playQuestions = [
    {
        question: "वज़ीर अली कंपनी के वकील की हत्या क्यों करता है?",
        options: [
            "व्यक्तिगत द्वेष के कारण",
            "जमीन विवाद के कारण",
            "वकील द्वारा अपमानित किए जाने और अंग्रेजों के प्रति नफरत के कारण",
            "सत्ता हासिल करने के लिए"
        ],
        correctAnswer: 2,
        explanation: "वज़ीर अली कंपनी के वकील की हत्या इसलिए करता है क्योंकि वकील ने उसकी शिकायत न सिर्फ अनसुनी की बल्कि उसे बुरा-भला भी सुनाया। वज़ीर अली के मन में पहले से ही अंग्रेजों के प्रति नफरत थी, इसलिए गुस्से में आकर उसने वकील का काम तमाम कर दिया।"
    },
    {
        question: "वज़ीर अली किस भेष में कर्नल के खेमे में जाता है?",
        options: [
            "सिपाही के भेष में",
            "सवार के भेष में",
            "व्यापारी के भेष में",
            "साधु के भेष में"
        ],
        correctAnswer: 1,
        explanation: "वज़ीर अली सवार के भेष में कर्नल के खेमे में जाता है।"
    },
    {
        question: "वज़ीर अली कर्नल से क्या माँगता है?",
        options: [
            "राजगद्दी",
            "माफी",
            "कारतूस",
            "अपनी जान की भिक्षा"
        ],
        correctAnswer: 2,
        explanation: "वज़ीर अली कर्नल से कारतूस माँगता है।"
    },
    {
        question: "वज़ीर अली कारतूस क्यों माँगता है?",
        options: [
            "कर्नल को मारने के लिए",
            "स्वयं को बचाने के लिए",
            "कर्नल को यह बताकर कि वह स्वयं वज़ीर अली है, उसे आश्चर्यचकित करने के लिए",
            "अंग्रेजों से युद्ध करने के लिए"
        ],
        correctAnswer: 2,
        explanation: "वज़ीर अली कर्नल से कारतूस माँगकर और फिर अपनी असली पहचान बताकर कर्नल को आश्चर्यचकित करना चाहता है। यह उसके साहस और निडरता का प्रतीक है।"
    },
    {
        question: "नाटक के अंत में कर्नल कालिंज की क्या प्रतिक्रिया होती है?",
        options: [
            "वह क्रोधित होकर वज़ीर अली का पीछा करता है",
            "वह आश्चर्यचकित होकर सन्नाटे में खड़ा रह जाता है",
            "वह अपने सिपाहियों को वज़ीर अली को पकड़ने का आदेश देता है",
            "वह डर जाता है और वज़ीर अली को जाने देता है"
        ],
        correctAnswer: 1,
        explanation: "नाटक के अंत में कर्नल कालिंज आश्चर्यचकित होकर सन्नाटे में खड़ा रह जाता है और दबी ज़बान से कहता है 'एक जाँबाज़ सिपाही'।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "विरुद्ध",
    vocab2: "पवित्र",
    vocab3: "आशा",
    vocab4: "प्राप्त",
    vocab5: "सफल"
};

// Initialize questions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load text questions when the thinking-text module is shown
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            if (this.textContent.includes('प्रश्न अभ्यास')) {
                setTimeout(() => {
                    const textQuestionsContainer = document.getElementById('textQuestions');
                    if (textQuestionsContainer) {
                        loadTextQuestions(textQuestionsContainer);
                    }
                }, 100);
            }
        });
    });
    
    // Initialize vocabulary checking
    initVocabularyChecking();
    
    // Also load questions if that tab is initially active
    if (document.querySelector('.nav-item.active').textContent.includes('प्रश्न अभ्यास')) {
        setTimeout(() => {
            const textQuestionsContainer = document.getElementById('textQuestions');
            if (textQuestionsContainer) {
                loadTextQuestions(textQuestionsContainer);
            }
        }, 100);
    }
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
    
    // Add Play Introduction questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">नाटक परिचय पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, playIntroQuestions, 'playIntro');
    
    // Add Play questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">नाटक पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, playQuestions, 'play');
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
    
    // Multiple choice question
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
        case 'playIntro':
            questions = playIntroQuestions;
            break;
        case 'play':
            questions = playQuestions;
            break;
        default:
            console.error(`Unknown question prefix: ${prefix}`);
            return;
    }
    
    let correctCount = 0;
    
    questions.forEach((question, index) => {
        const questionId = `${prefix}-q${index}`;
        const feedbackEl = document.getElementById(`${questionId}-feedback`);
        
        // Multiple choice question
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            const isCorrect = userAnswer === question.correctAnswer;
            
            // Mark the selected option with appropriate color
            const optionLabel = selectedOption.parentElement;
            optionLabel.style.backgroundColor = isCorrect ? '#e8f5e9' : '#ffebee';
            optionLabel.style.borderLeft = isCorrect ? '4px solid #4caf50' : '4px solid #f44336';
            
            // Also highlight the correct answer if user selected wrong
            if (!isCorrect) {
                const options = document.querySelectorAll(`input[name="${questionId}"]`);
                const correctOption = options[question.correctAnswer].parentElement;
                correctOption.style.backgroundColor = '#e8f5e9';
                correctOption.style.borderLeft = '4px solid #4caf50';
            }
            
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

// Check grammar function
function checkGrammar() {
    // Check radio buttons for adj1
    const adj1Selected = document.querySelector('input[name="adj1"]:checked');
    const noun1Selected = document.querySelector('input[name="noun1"]:checked');
    const adj2Selected = document.querySelector('input[name="adj2"]:checked');
    const noun2Selected = document.querySelector('input[name="noun2"]:checked');
    
    const feedbackEl = document.getElementById('grammarFeedback');
    
    if (!adj1Selected || !noun1Selected || !adj2Selected || !noun2Selected) {
        feedbackEl.textContent = 'कृपया सभी विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show warning';
        return;
    }
    
    // Define correct answers
    const correctAnswers = {
        adj1: "बड़ी",
        noun1: "जिंदगी",
        adj2: "सारे",
        noun2: "हिंदुस्तान"
    };
    
    // Check if answers are correct and highlight them
    const isAdj1Correct = adj1Selected.value === correctAnswers.adj1 || adj1Selected.value === "खतरनाक";
    const isNoun1Correct = noun1Selected.value === correctAnswers.noun1;
    const isAdj2Correct = adj2Selected.value === correctAnswers.adj2 || adj2Selected.value === "एक";
    const isNoun2Correct = noun2Selected.value === correctAnswers.noun2 || noun2Selected.value === "लहर";
    
    // Style the selected options
    const adj1OptionDiv = adj1Selected.closest('.choice-option');
    adj1OptionDiv.style.backgroundColor = isAdj1Correct ? '#e8f5e9' : '#ffebee';
    adj1OptionDiv.style.borderLeftColor = isAdj1Correct ? '#4caf50' : '#f44336';
    
    const noun1OptionDiv = noun1Selected.closest('.choice-option');
    noun1OptionDiv.style.backgroundColor = isNoun1Correct ? '#e8f5e9' : '#ffebee';
    noun1OptionDiv.style.borderLeftColor = isNoun1Correct ? '#4caf50' : '#f44336';
    
    const adj2OptionDiv = adj2Selected.closest('.choice-option');
    adj2OptionDiv.style.backgroundColor = isAdj2Correct ? '#e8f5e9' : '#ffebee';
    adj2OptionDiv.style.borderLeftColor = isAdj2Correct ? '#4caf50' : '#f44336';
    
    const noun2OptionDiv = noun2Selected.closest('.choice-option');
    noun2OptionDiv.style.backgroundColor = isNoun2Correct ? '#e8f5e9' : '#ffebee';
    noun2OptionDiv.style.borderLeftColor = isNoun2Correct ? '#4caf50' : '#f44336';
    
    // If wrong, highlight the correct answers
    if (!isAdj1Correct) {
        const allAdj1Options = document.querySelectorAll('input[name="adj1"]');
        allAdj1Options.forEach(option => {
            if (option.value === correctAnswers.adj1) {
                const correctOptionDiv = option.closest('.choice-option');
                correctOptionDiv.style.backgroundColor = '#e8f5e9';
                correctOptionDiv.style.borderLeftColor = '#4caf50';
            }
        });
    }
    
    if (!isNoun1Correct) {
        const allNoun1Options = document.querySelectorAll('input[name="noun1"]');
        allNoun1Options.forEach(option => {
            if (option.value === correctAnswers.noun1) {
                const correctOptionDiv = option.closest('.choice-option');
                correctOptionDiv.style.backgroundColor = '#e8f5e9';
                correctOptionDiv.style.borderLeftColor = '#4caf50';
            }
        });
    }
    
    if (!isAdj2Correct) {
        const allAdj2Options = document.querySelectorAll('input[name="adj2"]');
        allAdj2Options.forEach(option => {
            if (option.value === correctAnswers.adj2) {
                const correctOptionDiv = option.closest('.choice-option');
                correctOptionDiv.style.backgroundColor = '#e8f5e9';
                correctOptionDiv.style.borderLeftColor = '#4caf50';
            }
        });
    }
    
    if (!isNoun2Correct) {
        const allNoun2Options = document.querySelectorAll('input[name="noun2"]');
        allNoun2Options.forEach(option => {
            if (option.value === correctAnswers.noun2) {
                const correctOptionDiv = option.closest('.choice-option');
                correctOptionDiv.style.backgroundColor = '#e8f5e9';
                correctOptionDiv.style.borderLeftColor = '#4caf50';
            }
        });
    }
    
    // Calculate score
    let score = 0;
    if (isAdj1Correct) score++;
    if (isNoun1Correct) score++;
    if (isAdj2Correct) score++;
    if (isNoun2Correct) score++;
    
    // Provide feedback
    if (score === 4) {
        feedbackEl.textContent = 'सभी उत्तर सही हैं! बधाई हो!';
        feedbackEl.className = 'feedback-message show success';
        
        if (typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    } else {
        feedbackEl.textContent = `आपने ${4} में से ${score} सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show error';
    }
}

// Check idioms function
function checkIdioms() {
    let correctCount = 0;
    const idioms = ['idiom1', 'idiom2', 'idiom3', 'idiom4'];
    
    idioms.forEach(idiom => {
        const select = document.getElementById(idiom);
        if (select && select.value) {
            correctCount++;
        }
    });
    
    const feedbackEl = document.getElementById('idiomFeedback');
    
    if (correctCount < idioms.length) {
        feedbackEl.textContent = 'कृपया सभी मुहावरों के लिए वाक्य चुनें।';
        feedbackEl.className = 'feedback-message show warning';
    } else {
        feedbackEl.textContent = 'आपके सभी उत्तर सहेज लिए गए हैं!';
        feedbackEl.className = 'feedback-message show success';
        
        if (typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
}

// Make functions globally available
window.checkAnswers = checkAnswers;
window.checkGrammar = checkGrammar;
window.checkIdioms = checkIdioms;