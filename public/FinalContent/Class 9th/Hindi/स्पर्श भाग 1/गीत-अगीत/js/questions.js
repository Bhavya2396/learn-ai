/**
 * Questions and interactive exercises for Geet-Ageet
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "रामधारी सिंह दिनकर का जन्म कब और कहाँ हुआ था?",
        options: [
            "1908 में बिहार के मुंगेर जिले के सिमरिया गाँव में",
            "1908 में उत्तर प्रदेश के कानपुर में",
            "1910 में बिहार के पटना में",
            "1910 में उत्तर प्रदेश के वाराणसी में"
        ],
        correctAnswer: 0,
        explanation: "रामधारी सिंह दिनकर का जन्म बिहार के मुंगेर जिले के सिमरिया गाँव में 30 सितंबर 1908 को हुआ था।"
    },
    {
        question: "दिनकर जी को कौन-कौन से प्रमुख पुरस्कार मिले?",
        options: [
            "केवल साहित्य अकादमी पुरस्कार",
            "केवल ज्ञानपीठ पुरस्कार",
            "साहित्य अकादमी पुरस्कार और ज्ञानपीठ पुरस्कार",
            "पद्मभूषण, साहित्य अकादमी पुरस्कार और ज्ञानपीठ पुरस्कार"
        ],
        correctAnswer: 3,
        explanation: "दिनकर जी को 'पद्मभूषण' अलंकरण, 'संस्कृति के चार अध्याय' पुस्तक पर साहित्य अकादमी पुरस्कार और 'उर्वशी' के लिए ज्ञानपीठ पुरस्कार मिला।"
    },
    {
        question: "दिनकर की प्रमुख काव्यकृतियाँ कौन सी हैं?",
        options: [
            "केवल हुँकार और कुरुक्षेत्र",
            "हुँकार, कुरुक्षेत्र, रश्मिरथी, परशुराम की प्रतीक्षा, उर्वशी और संस्कृति के चार अध्याय",
            "केवल उर्वशी और संस्कृति के चार अध्याय",
            "केवल रश्मिरथी और परशुराम की प्रतीक्षा"
        ],
        correctAnswer: 1,
        explanation: "दिनकर की प्रमुख कृतियाँ हैं: हुँकार, कुरुक्षेत्र, रश्मिरथी, परशुराम की प्रतीक्षा, उर्वशी और संस्कृति के चार अध्याय।"
    },
    {
        question: "दिनकर की भाषा शैली की क्या विशेषताएँ हैं?",
        options: [
            "केवल सरल और सीधी",
            "केवल प्रवाहपूर्ण और ओजस्वी",
            "प्रवाहपूर्ण, ओजस्वी और सरल",
            "केवल कठिन और जटिल"
        ],
        correctAnswer: 2,
        explanation: "दिनकर की भाषा अत्यंत प्रवाहपूर्ण, ओजस्वी और सरल है।"
    },
    {
        question: "दिनकर की सबसे बड़ी विशेषता क्या है?",
        options: [
            "उनकी कविता में प्रेम और सौंदर्य का चित्रण",
            "अपने देश और युग के सत्य के प्रति सजगता",
            "विचार और संवेदना का समन्वय",
            "उनकी भाषा की सरलता"
        ],
        correctAnswer: 1,
        explanation: "दिनकर की सबसे बड़ी विशेषता है अपने देश और युग के सत्य के प्रति सजगता।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "कविता 'गीत-अगीत' में क्या वर्णित है?",
        options: [
            "केवल प्रकृति का सौंदर्य",
            "केवल जीव-जंतुओं का ममत्व",
            "प्रकृति का सौंदर्य, जीव-जंतुओं का ममत्व, मानवीय राग और प्रेमभाव",
            "केवल मानवीय राग और प्रेमभाव"
        ],
        correctAnswer: 2,
        explanation: "कविता 'गीत-अगीत' में प्रकृति के सौंदर्य के अतिरिक्त जीव-जंतुओं के ममत्व, मानवीय राग और प्रेमभाव का भी सजीव चित्रण है।"
    },
    {
        question: "कवि को कहाँ गीत का सृजन होता दिखाई देता है?",
        options: [
            "केवल नदी के बहाव में",
            "केवल शुक-शुकी के कार्यकलापों में",
            "नदी के बहाव में, शुक-शुकी के कार्यकलापों में और आल्हा गाते प्रेमी में",
            "केवल आल्हा गाते प्रेमी में"
        ],
        correctAnswer: 2,
        explanation: "कवि को नदी के बहाव में गीत का सृजन होता जान पड़ता है, तो शुक-शुकी के कार्यकलापों में भी गीत सुनाई देता है और आल्हा गाता प्रेमी तो गीत-गान में निमग्न दिखाई देता ही है।"
    },
    {
        question: "कवि का मानना है कि क्या हो रहा है?",
        options: [
            "गुलाब, शुकी और प्रेमिका प्रत्यक्ष रूप से गीत-सृजन कर रहे हैं",
            "गुलाब, शुकी और प्रेमिका प्रत्यक्ष रूप से गीत-गान कर रहे हैं",
            "गुलाब, शुकी और प्रेमिका प्रत्यक्ष रूप से गीत-सृजन या गीत-गान नहीं कर रहे, पर दरअसल वहाँ गीत का सृजन और गान भी हो रहा है",
            "कहीं भी गीत का सृजन नहीं हो रहा"
        ],
        correctAnswer: 2,
        explanation: "कवि का मानना है कि गुलाब, शुकी और प्रेमिका प्रत्यक्ष रूप से गीत-सृजन या गीत-गान भले ही न कर रहे हों, पर दरअसल वहाँ गीत का सृजन और गान भी हो रहा है।"
    },
    {
        question: "कवि की दुविधा क्या है?",
        options: [
            "कौन सा गीत अधिक सुंदर है",
            "कौन सा अगीत अधिक सुंदर है",
            "उनका वह अगीत सुंदर है या प्रेमी द्वारा सस्वर गाया जा रहा गीत",
            "कौन सा कवि अधिक प्रसिद्ध है"
        ],
        correctAnswer: 2,
        explanation: "कवि की दुविधा महज इतनी है कि उनका वह अगीत (जो गाया नहीं जा रहा, महज़ इसलिए अगीत है) सुंदर है या प्रेमी द्वारा सस्वर गाया जा रहा गीत?"
    },
    {
        question: "कविता का केंद्रीय भाव क्या है?",
        options: [
            "केवल प्रकृति का सौंदर्य",
            "केवल मानवीय भावनाएँ",
            "गीत और अगीत के बीच का सौंदर्य और उनकी तुलना",
            "केवल पक्षियों का गाना"
        ],
        correctAnswer: 2,
        explanation: "कविता का केंद्रीय भाव गीत और अगीत के बीच के सौंदर्य की तुलना और कवि की इस बारे में दुविधा है।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "नदी का किनारों से कुछ कहते हुए बह जाने पर गुलाब क्या सोच रहा है?",
        options: [
            "वह भी नदी के साथ बहना चाहता है",
            "वह नदी से बात करना चाहता है",
            "यदि उसे स्वर मिला होता तो वह अपने पतझर के सपनों का गीत जग को सुनाता",
            "वह नदी के गीत को सुनना चाहता है"
        ],
        correctAnswer: 2,
        explanation: "गुलाब सोचता है कि 'देते स्वर यदि मुझे विधाता, अपने पतझर के सपनों का मैं भी जग को गीत सुनाता।'"
    },
    {
        question: "जब शुक गाता है, तो शुकी के हृदय पर क्या प्रभाव पड़ता है?",
        options: [
            "वह भी गाने लगती है",
            "वह शुक से दूर चली जाती है",
            "उसके गीत उमड़कर सनेह में सनकर रह जाते हैं",
            "वह शुक को रोकती है"
        ],
        correctAnswer: 2,
        explanation: "जब शुक गाता है, तो शुकी के गीत उमड़कर सनेह में सनकर रह जाते हैं।"
    },
    {
        question: "प्रेमी जब गीत गाता है, तब प्रेमिका की क्या इच्छा होती है?",
        options: [
            "वह भी गाना चाहती है",
            "वह प्रेमी से दूर जाना चाहती है",
            "वह चाहती है कि वह भी गीत की कड़ी बन सके",
            "वह प्रेमी को रोकना चाहती है"
        ],
        correctAnswer: 2,
        explanation: "प्रेमिका सोचती है कि 'हुई न क्यों मैं कड़ी गीत की बिधना' - अर्थात् वह भी गीत का हिस्सा बनना चाहती है।"
    },
    {
        question: "प्रथम छंद में वर्णित प्रकृति-चित्रण क्या है?",
        options: [
            "केवल नदी का बहना",
            "केवल गुलाब का खिलना",
            "नदी का विरह के गीत गाते हुए बहना और तट पर गुलाब का मूक खड़ा रहना",
            "केवल पक्षियों का गाना"
        ],
        correctAnswer: 2,
        explanation: "प्रथम छंद में नदी का विरह के गीत गाते हुए वेगवती होकर बहना और तट पर गुलाब का मूक खड़ा रहना वर्णित है।"
    },
    {
        question: "कविता का केंद्रीय प्रश्न क्या है?",
        options: [
            "कौन सा पक्षी अधिक सुंदर है",
            "कौन सा फूल अधिक सुंदर है",
            "गीत, अगीत, कौन सुंदर है?",
            "कौन सा मनुष्य अधिक सुंदर है"
        ],
        correctAnswer: 2,
        explanation: "कविता का केंद्रीय प्रश्न है: 'गीत, अगीत, कौन सुंदर है?'"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "नदी",
    vocab2: "तेज गति से",
    vocab3: "किनारों से",
    vocab4: "ईश्वर",
    vocab5: "झरना",
    vocab6: "गुलाब"
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
