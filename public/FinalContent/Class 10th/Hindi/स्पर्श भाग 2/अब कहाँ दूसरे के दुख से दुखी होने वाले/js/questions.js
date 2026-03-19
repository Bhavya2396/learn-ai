/**
 * Questions and interactive exercises for Nida Fazli's "Ab Kahan Dusre Ke Dukh Se Dukhi Hone Wale"
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "निदा फ़ाजली का जन्म कब और कहाँ हुआ था?",
        options: [
            "12 अक्टूबर 1938 को दिल्ली में",
            "12 अक्टूबर 1938 को ग्वालियर में",
            "12 अक्टूबर 1940 को दिल्ली में",
            "12 अक्टूबर 1940 को ग्वालियर में"
        ],
        correctAnswer: 0,
        explanation: "निदा फ़ाजली का जन्म 12 अक्टूबर 1938 को दिल्ली में हुआ था।"
    },
    {
        question: "निदा फ़ाजली की कविताओं की क्या विशेषता थी?",
        options: [
            "जटिल शब्दावली का प्रयोग",
            "आम बोलचाल की भाषा में सरल अभिव्यक्ति",
            "संस्कृतनिष्ठ शब्दावली",
            "लंबे-लंबे वाक्य"
        ],
        correctAnswer: 1,
        explanation: "निदा फ़ाजली की कविताओं की विशेषता थी कि वे आम बोलचाल की भाषा में सरलता से किसी के भी दिल और दिमाग में घर कर सकती थीं।"
    },
    {
        question: "निदा फ़ाजली को साहित्य अकादमी पुरस्कार किस रचना के लिए मिला था?",
        options: [
            "लफ़्जों का पुल",
            "खोया हुआ सा कुछ",
            "दीवारों के बीच",
            "तमाशा मेरे आगे"
        ],
        correctAnswer: 1,
        explanation: "निदा फ़ाजली को 'खोया हुआ सा कुछ' काव्य संग्रह के लिए 1998 में साहित्य अकादमी पुरस्कार से सम्मानित किया गया था।"
    },
    {
        question: "निदा फ़ाजली की आत्मकथा के भाग किस नाम से प्रकाशित हुए हैं?",
        options: [
            "आगे-पीछे, इधर-उधर",
            "जिंदगी के साए, जिंदगी के पाए",
            "दीवारों के बीच और दीवारों के पार",
            "अंदर-बाहर, आस-पास"
        ],
        correctAnswer: 2,
        explanation: "निदा फ़ाजली की आत्मकथा के दो भाग 'दीवारों के बीच' और 'दीवारों के पार' नाम से प्रकाशित हुए हैं।"
    }
];

// Reading comprehension questions for Story (कहानी)
const storyQuestions = [
    {
        question: "बड़े-बड़े बिल्डर समुद्र के साथ क्या कर रहे थे?",
        options: [
            "समुद्र में सफाई अभियान चला रहे थे",
            "समुद्र को पीछे धकेलकर उसकी जमीन हथिया रहे थे",
            "समुद्र में नई मछलियाँ छोड़ रहे थे",
            "समुद्र में पर्यटन को बढ़ावा दे रहे थे"
        ],
        correctAnswer: 1,
        explanation: "बड़े-बड़े बिल्डर समुद्र को पीछे धकेलकर उसकी जमीन हथिया रहे थे, जिससे समुद्र लगातार सिमटता जा रहा था।"
    },
    {
        question: "समुद्र ने अपने गुस्से का प्रदर्शन किस रूप में किया?",
        options: [
            "भारी बारिश के रूप में",
            "तीन जहाजों को उठाकर फेंकने के रूप में",
            "सूनामी के रूप में",
            "भूकंप के रूप में"
        ],
        correctAnswer: 1,
        explanation: "समुद्र ने एक रात अपने गुस्से का प्रदर्शन तीन जहाजों को उठाकर तीन दिशाओं में फेंकने के रूप में किया।"
    },
    {
        question: "शेख अयाज़ के पिता ने चींटे के साथ क्या व्यवहार किया?",
        options: [
            "उसे मार दिया",
            "उसे बाहर फेंक दिया",
            "उसे भोजन खिलाया",
            "उसे कुएँ पर उसके घर छोड़ने गए"
        ],
        correctAnswer: 3,
        explanation: "शेख अयाज़ के पिता चींटे को उसके घर (कुएँ पर) छोड़ने गए क्योंकि उन्हें लगा कि उन्होंने एक घर वाले को बेघर कर दिया है।"
    },
    {
        question: "नूह को उस नाम से क्यों पुकारा जाता था?",
        options: [
            "क्योंकि वे जहाज बनाते थे",
            "क्योंकि वे सारी उम्र रोते रहे",
            "क्योंकि वे नदियों के पास रहते थे",
            "क्योंकि वे पानी के देवता थे"
        ],
        correctAnswer: 1,
        explanation: "नूह का असली नाम लशकर था, लेकिन उन्हें नूह के नाम से इसलिए पुकारा जाता था क्योंकि वे सारी उम्र रोते रहे।"
    },
    {
        question: "लेखक की माँ अंडा टूटने पर क्यों परेशान हुईं?",
        options: [
            "उन्हें अंडे की कीमत का नुकसान हुआ",
            "उन्हें कबूतरों की आँखों में दुख देखकर दुख हुआ",
            "उन्हें अंडे से बने खाने की चिंता थी",
            "उन्हें अंडे के खोल से खिलौने बनाने थे"
        ],
        correctAnswer: 1,
        explanation: "लेखक की माँ कबूतरों की आँखों में दुख देखकर परेशान हुईं और उनकी आँखों में आँसू आ गए।"
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
    
    // Add Story questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">कहानी पर प्रश्न</h3>';
    loadQuestionSet(questionsContainer, storyQuestions, 'story');
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
        case 'story':
            questions = storyQuestions;
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

// Make functions globally available
window.checkAnswers = checkAnswers;
