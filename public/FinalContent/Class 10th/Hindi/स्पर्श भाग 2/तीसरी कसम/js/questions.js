/**
 * Questions and interactive exercises for Teesri Kasam Shilpkar
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "प्रहलाद अग्रवाल का जन्म कब और कहाँ हुआ था?",
        options: [
            "1947 में मध्य प्रदेश के जबलपुर में",
            "1947 में मध्य प्रदेश के सतना में", 
            "1948 में मध्य प्रदेश के जबलपुर में",
            "1946 में मध्य प्रदेश के जबलपुर में"
        ],
        correctAnswer: 0,
        explanation: "प्रहलाद अग्रवाल का जन्म भारत की आज़ादी के साल (1947) में मध्य प्रदेश के जबलपुर शहर में हुआ था।"
    },
    {
        question: "प्रहलाद अग्रवाल को किशोरे वय से ही किस चीज़ में रुचि थी?",
        options: [
            "हिंदी साहित्य पढ़ने में",
            "हिंदी फिल्मों के इतिहास और फिल्मकारों के जीवन में",
            "संगीत सुनने में",
            "राजनीति में"
        ],
        correctAnswer: 1,
        explanation: "प्रहलाद अग्रवाल को किशोरे वय से ही हिंदी फिल्मों के इतिहास और फिल्मकारों के जीवन और उनके अभिनय के बारे में जानने में रुचि थी।"
    },
    {
        question: "प्रहलाद अग्रवाल की प्रमुख कृतियों में से कौन सी है?",
        options: [
            "गोदान",
            "राजकपूर : आधी हकीकत आधा फ़साना",
            "गुनाहों का देवता",
            "चंद्रगुप्त"
        ],
        correctAnswer: 1,
        explanation: "राजकपूर : आधी हकीकत आधा फ़साना प्रहलाद अग्रवाल की प्रमुख कृतियों में से एक है।"
    },
    {
        question: "वर्तमान में प्रहलाद अग्रवाल कहाँ प्राध्यापन कर रहे हैं?",
        options: [
            "जबलपुर के महाविद्यालय में",
            "दिल्ली विश्वविद्यालय में",
            "सतना के शासकीय स्वशासी स्नातकोत्तर महाविद्यालय में",
            "बनारस हिंदू विश्वविद्यालय में"
        ],
        correctAnswer: 2,
        explanation: "प्रहलाद अग्रवाल सतना के शासकीय स्वशासी स्नातकोत्तर महाविद्यालय में प्राध्यापन कर रहे हैं।"
    }
];

// Reading comprehension questions for मुख्य पाठ
const mainTextQuestions = [
    {
        question: "'तीसरी कसम' फिल्म को लेखक ने क्या कहा है?",
        options: [
            "एक साधारण फिल्म",
            "सैल्यूलाइड पर लिखी कविता",
            "व्यावसायिक फिल्म",
            "मनोरंजक फिल्म"
        ],
        correctAnswer: 1,
        explanation: "लेखक ने 'तीसरी कसम' को 'सैल्यूलाइड पर लिखी कविता' कहा है, जो इसकी काव्यात्मक और कलात्मक गुणवत्ता को दर्शाता है।"
    },
    {
        question: "'तीसरी कसम' फिल्म को कौन-कौन से पुरस्कार मिले?",
        options: [
            "केवल राष्ट्रपति स्वर्णपदक",
            "राष्ट्रपति स्वर्णपदक, बंगाल फिल्म जर्नलिस्ट एसोसिएशन का सर्वश्रेष्ठ फिल्म पुरस्कार और मास्को फिल्म फेस्टिवल का पुरस्कार",
            "केवल मास्को फिल्म फेस्टिवल का पुरस्कार",
            "फिल्मफेयर पुरस्कार"
        ],
        correctAnswer: 1,
        explanation: "'तीसरी कसम' को राष्ट्रपति स्वर्णपदक, बंगाल फिल्म जर्नलिस्ट एसोसिएशन का सर्वश्रेष्ठ फिल्म पुरस्कार और मास्को फिल्म फेस्टिवल में भी पुरस्कार मिला।"
    },
    {
        question: "शैलेंद्र ने कितनी फिल्में बनाईं?",
        options: [
            "तीन फिल्में",
            "दो फिल्में", 
            "केवल एक फिल्म (तीसरी कसम)",
            "पांच फिल्में"
        ],
        correctAnswer: 2,
        explanation: "'तीसरी कसम' शैलेंद्र के जीवन की पहली और अंतिम फिल्म है। उन्होंने केवल एक ही फिल्म बनाई।"
    },
    {
        question: "राजकपूर ने शैलेंद्र से 'तीसरी कसम' के लिए कितना पारिश्रमिक मांगा?",
        options: [
            "एक लाख रुपए",
            "एक रुपया",
            "दस हजार रुपए",
            "कोई पारिश्रमिक नहीं"
        ],
        correctAnswer: 1,
        explanation: "राजकपूर ने मज़ाक में एक रुपया पारिश्रमिक मांगा था, जो उनकी दोस्ती और शैलेंद्र के प्रति प्रेम को दर्शाता है।"
    },
    {
        question: "फिल्म 'तीसरी कसम' किस कहानी पर आधारित है?",
        options: [
            "प्रेमचंद की कहानी पर",
            "फणीश्वरनाथ रेणु की कहानी 'तीसरी कसम उर्फ मारे गए गुलफाम' पर",
            "यशपाल की कहानी पर",
            "जैनेंद्र की कहानी पर"
        ],
        correctAnswer: 1,
        explanation: "फिल्म 'तीसरी कसम' फणीश्वरनाथ 'रेणु' की अमर कृति 'तीसरी कसम उर्फ मारे गए गुलफाम' पर आधारित है।"
    },
    {
        question: "'तीसरी कसम' फिल्म की मुख्य समस्या क्या थी?",
        options: [
            "खराब कहानी",
            "कमज़ोर अभिनय",
            "वितरकों का न मिलना और प्रचार की कमी",
            "संगीत की कमी"
        ],
        correctAnswer: 2,
        explanation: "'तीसरी कसम' जैसी महान फिल्म को भी वितरकों का न मिलना और प्रचार की कमी जैसी समस्याओं का सामना करना पड़ा।"
    },
    {
        question: "शैलेंद्र के अनुसार कलाकार का क्या कर्तव्य है?",
        options: [
            "केवल मनोरंजन करना",
            "पैसा कमाना",
            "उपभोक्ता की रुचियों का परिष्कार करना",
            "प्रसिद्ध बनना"
        ],
        correctAnswer: 2,
        explanation: "शैलेंद्र का मानना था कि कलाकार का कर्तव्य उपभोक्ता की रुचियों का परिष्कार करने का प्रयत्न करना है।"
    },
    {
        question: "हमारी फिल्मों की सबसे बड़ी कमजोरी क्या है?",
        options: [
            "खराब तकनीक",
            "लोक-तत्व का अभाव",
            "कमज़ोर कहानी",
            "बुरे कलाकार"
        ],
        correctAnswer: 1,
        explanation: "लेखक के अनुसार हमारी फिल्मों की सबसे बड़ी कमजोरी लोक-तत्व का अभाव है, यानी वे जिंदगी से दूर होती हैं।"
    }
];


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
    const questionsHTML = `
        <div id="allQuestions" class="question-set active"></div>
    `;
    
    container.innerHTML = questionsHTML;
    
    const questionsContainer = document.getElementById('allQuestions');
    
    // Add different question sections
    questionsContainer.innerHTML += '<h3 class="question-section-title">लेखक परिचय पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, authorIntroQuestions, 'authorIntro');
    
    questionsContainer.innerHTML += '<h3 class="question-section-title">मुख्य पाठ पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, mainTextQuestions, 'mainText');
}

// Load a set of multiple choice questions
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


// Create HTML for multiple choice questions
function createQuestionHTML(question, index, prefix) {
    const questionId = `${prefix}-q${index}`;
    
    let optionsHTML = '';
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


// Check answers for multiple choice questions
function checkAnswers(prefix) {
    let questions;
    switch (prefix) {
        case 'authorIntro':
            questions = authorIntroQuestions;
            break;
        case 'mainText':
            questions = mainTextQuestions;
            break;
        default:
            console.error(`Unknown question prefix: ${prefix}`);
            return;
    }
    
    let correctCount = 0;
    
    questions.forEach((question, index) => {
        const questionId = `${prefix}-q${index}`;
        const feedbackEl = document.getElementById(`${questionId}-feedback`);
        
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            const isCorrect = userAnswer === question.correctAnswer;
            
            feedbackEl.textContent = isCorrect ? 
                '✓ सही! ' + question.explanation : 
                `✗ गलत। सही उत्तर है: ${question.options[question.correctAnswer]}। ${question.explanation}`;
            feedbackEl.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            
            if (isCorrect) correctCount++;
        } else {
            feedbackEl.textContent = 'कृपया एक विकल्प चुनें।';
            feedbackEl.className = 'question-feedback warning';
        }
    });
    
    // Show overall feedback
    const feedbackContainer = document.getElementById(`${prefix}Feedback`);
    if (feedbackContainer) {
        feedbackContainer.textContent = `आपने ${questions.length} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackContainer.className = 'feedback-message show';
        feedbackContainer.classList.add(correctCount === questions.length ? 'success' : 'error');
        
        // Update progress if all correct
        if (correctCount === questions.length) {
            if (typeof score !== 'undefined') {
                score += 15;
                if (document.getElementById('totalScore')) {
                    document.getElementById('totalScore').textContent = score;
                }
            }
            
            if (!modulesCompleted.includes('thinking-text')) {
                if (typeof modulesCompleted !== 'undefined' && typeof updateProgress === 'function') {
                    modulesCompleted.push('thinking-text');
                    updateProgress();
                    if (typeof showAchievement === 'function') {
                        showAchievement('प्रश्न अभ्यास पूर्ण!');
                    }
                }
            }
        }
    }
}


// Make functions globally available
window.checkAnswers = checkAnswers;
