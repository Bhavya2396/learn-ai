/**
 * Questions and interactive exercises for Ginni ka Sona
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "रवींद्र केलेकर का जन्म कब और कहाँ हुआ था?",
        options: [
            "7 मार्च 1925 को कोंकण क्षेत्र में",
            "7 मार्च 1923 को कोंकण क्षेत्र में",
            "7 मार्च 1925 को गोवा में",
            "7 मार्च 1923 को गोवा में"
        ],
        correctAnswer: 0,
        explanation: "रवींद्र केलेकर का जन्म 7 मार्च 1925 को कोंकण क्षेत्र में हुआ था।"
    },
    {
        question: "रवींद्र केलेकर किस आंदोलन में सक्रिय रहे थे?",
        options: [
            "भारत छोड़ो आंदोलन",
            "असहयोग आंदोलन",
            "गोवा मुक्ति आंदोलन",
            "स्वदेशी आंदोलन"
        ],
        correctAnswer: 2,
        explanation: "रवींद्र केलेकर छात्र जीवन से ही गोवा मुक्ति आंदोलन में सक्रिय रहे थे।"
    },
    {
        question: "रवींद्र केलेकर को किस रूप में जाना जाता है?",
        options: [
            "मार्क्सवादी विचारक",
            "गांधीवादी विचारक",
            "समाजवादी विचारक",
            "पूँजीवादी विचारक"
        ],
        correctAnswer: 1,
        explanation: "रवींद्र केलेकर को एक गांधीवादी विचारक के रूप में जाना जाता है।"
    },
    {
        question: "रवींद्र केलेकर की हिंदी में कौन सी पुस्तक है?",
        options: [
            "कोंकणीचें राजकरण",
            "उजवाढाचे सूर",
            "पतझर में टूटी पत्तियाँ",
            "जापान जसा दिसला"
        ],
        correctAnswer: 2,
        explanation: "रवींद्र केलेकर की हिंदी में प्रकाशित पुस्तक 'पतझर में टूटी पत्तियाँ' है।"
    }
];

// Reading comprehension questions for Path Pravesh (पाठ प्रवेश)
const pathPraveshQuestions = [
    {
        question: "लेखक के अनुसार 'गिन्नी का सोना' प्रसंग किस विषय पर है?",
        options: [
            "सोने की गुणवत्ता के बारे में",
            "आदर्शवादी और व्यवहारवादी लोगों के बीच अंतर",
            "गिन्नी के बारे में",
            "सोने की कीमतों के बारे में"
        ],
        correctAnswer: 1,
        explanation: "'गिन्नी का सोना' प्रसंग आदर्शवादी और व्यवहारवादी लोगों के बीच अंतर के बारे में है।"
    },
    {
        question: "'झेन की देन' प्रसंग किस बारे में है?",
        options: [
            "चाय पीने की कला के बारे में",
            "जापानी संस्कृति के बारे में",
            "बौद्ध दर्शन में वर्णित ध्यान पद्धति के बारे में",
            "व्यस्त जीवन में आराम के तरीकों के बारे में"
        ],
        correctAnswer: 2,
        explanation: "'झेन की देन' प्रसंग बौद्ध दर्शन में वर्णित ध्यान पद्धति के बारे में है।"
    },
    {
        question: "पाठ का मुख्य उद्देश्य क्या है?",
        options: [
            "जापानी संस्कृति का वर्णन करना",
            "गांधीजी के बारे में जानकारी देना",
            "जागरूक और सक्रिय नागरिक बनने की प्रेरणा देना",
            "सोने के प्रकारों के बारे में जानकारी देना"
        ],
        correctAnswer: 2,
        explanation: "पाठ का मुख्य उद्देश्य जागरूक और सक्रिय नागरिक बनने की प्रेरणा देना है।"
    }
];

// Reading comprehension questions for Ginni ka Sona (गिन्नी का सोना)
const ginniKaSonaQuestions = [
    {
        question: "गिन्नी के सोने और शुद्ध सोने में क्या अंतर होता है?",
        options: [
            "गिन्नी के सोने में चाँदी मिली होती है",
            "गिन्नी का सोना कम कीमत वाला होता है",
            "गिन्नी के सोने में थोड़ा ताँबा मिला होता है",
            "गिन्नी का सोना शुद्ध सोने से कम चमकदार होता है"
        ],
        correctAnswer: 2,
        explanation: "गिन्नी के सोने में थोड़ा ताँबा मिला होता है, जिससे वह शुद्ध सोने से ज़्यादा चमकता और मज़बूत होता है।"
    },
    {
        question: "लेखक ने गांधीजी के बारे में क्या विशेष बात बताई है?",
        options: [
            "वे आदर्शों को व्यावहारिकता के स्तर पर लाए",
            "वे व्यावहारिकता को आदर्शों के स्तर तक पहुँचाए",
            "वे केवल व्यावहारिकता पर ध्यान देते थे",
            "वे केवल आदर्शवाद पर ध्यान देते थे"
        ],
        correctAnswer: 1,
        explanation: "गांधीजी व्यावहारिकता को आदर्शों के स्तर तक पहुँचाए, उन्होंने ताँबे में सोना मिलाकर उसकी कीमत बढ़ाई।"
    },
    {
        question: "लेखक के अनुसार समाज के शाश्वत मूल्यों का स्रोत क्या है?",
        options: [
            "व्यावहारिक लोग",
            "आदर्शवादी लोग",
            "प्रैक्टिकल आइडियालिस्ट",
            "वैज्ञानिक सोच"
        ],
        correctAnswer: 1,
        explanation: "लेखक के अनुसार, समाज के पास अगर कोई शाश्वत मूल्य है, तो वह आदर्शवादी लोगों की ही देन है।"
    },
    {
        question: "लेखक के अनुसार व्यवहारवादी लोगों की क्या विशेषता है?",
        options: [
            "वे सदैव दूसरों की मदद करते हैं",
            "वे चौकस रहते हैं और लाभ-हानि का हिसाब लगाते हैं",
            "वे समाज को ऊपर उठाते हैं",
            "वे दूसरों को साथ लेकर आगे बढ़ते हैं"
        ],
        correctAnswer: 1,
        explanation: "व्यवहारवादी लोग हमेशा चौकस रहते हैं और लाभ-हानि का हिसाब लगाकर ही कोई कदम उठाते हैं।"
    }
];

// Reading comprehension questions for Zhen ki Den (झेन की देन)
const zhenKiDenQuestions = [
    {
        question: "जापान में लोगों को मुख्यतः किस प्रकार की बीमारी होती है?",
        options: [
            "शारीरिक रोग",
            "संक्रामक रोग",
            "मानसिक रोग",
            "जन्मजात रोग"
        ],
        correctAnswer: 2,
        explanation: "जापान में 80% लोग मानसिक रोगी हैं।"
    },
    {
        question: "जापान में मानसिक रोगों का मुख्य कारण क्या है?",
        options: [
            "प्रदूषण",
            "खराब आहार",
            "अत्यधिक तेज़ जीवन गति और प्रतिस्पर्धा",
            "जेनेटिक कारण"
        ],
        correctAnswer: 2,
        explanation: "जापान में मानसिक रोगों का मुख्य कारण अत्यधिक तेज़ जीवन गति और अमेरिका से प्रतिस्पर्धा है।"
    },
    {
        question: "'चा-नो-यू' क्या है?",
        options: [
            "जापान का एक प्रसिद्ध त्योहार",
            "जापानी चाय समारोह",
            "जापानी भाषा में धन्यवाद",
            "जापानी साहित्य का एक रूप"
        ],
        correctAnswer: 1,
        explanation: "'चा-नो-यू' जापानी चाय समारोह है, जिसे टी-सेरेमनी भी कहा जाता है।"
    },
    {
        question: "लेखक के अनुसार वर्तमान क्षण का क्या महत्व है?",
        options: [
            "वर्तमान क्षण को याद रखना चाहिए",
            "वर्तमान क्षण केवल भविष्य की तैयारी है",
            "वर्तमान क्षण ही एकमात्र सत्य है और हमें उसी में जीना चाहिए",
            "वर्तमान क्षण अतीत की परछाई है"
        ],
        correctAnswer: 2,
        explanation: "लेखक के अनुसार, केवल वर्तमान क्षण ही सत्य है और हमें उसी में जीना चाहिए।"
    },
    {
        question: "लेखक ने चाय पीने के अनुभव से क्या सीखा?",
        options: [
            "चाय पीने की कला",
            "अनुशासन का महत्व",
            "वर्तमान क्षण में जीने की कला",
            "जापानी संस्कृति"
        ],
        correctAnswer: 2,
        explanation: "लेखक ने चाय पीने के अनुभव से वर्तमान क्षण में जीने की कला सीखी।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "व्यवहारकुशलता",
    vocab2: "सनातन",
    vocab3: "असाधारण",
    vocab4: "समझदारी",
    vocab5: "निस्तब्धता"
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
    if (document.querySelector('.nav-item.active') && document.querySelector('.nav-item.active').textContent.includes('प्रश्न अभ्यास')) {
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
    
    // Add Path Pravesh questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">पाठ प्रवेश पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, pathPraveshQuestions, 'pathPravesh');
    
    // Add Ginni ka Sona questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">गिन्नी का सोना पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, ginniKaSonaQuestions, 'ginniKaSona');
    
    // Add Zhen ki Den questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">झेन की देन पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, zhenKiDenQuestions, 'zhenKiDen');
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
        case 'pathPravesh':
            questions = pathPraveshQuestions;
            break;
        case 'ginniKaSona':
            questions = ginniKaSonaQuestions;
            break;
        case 'zhenKiDen':
            questions = zhenKiDenQuestions;
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
        if (typeof score !== 'undefined') {
            score += 10;
            document.getElementById('totalScore').textContent = score;
        }
        
        if (!modulesCompleted.includes('thinking-text')) {
            if (typeof modulesCompleted !== 'undefined' && typeof updateProgress === 'function') {
                modulesCompleted.push('thinking-text');
                updateProgress();
                showAchievement('प्रश्न अभ्यास पूर्ण!');
            }
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
        }
    };
}

// Make functions globally available
window.checkAnswers = checkAnswers;
