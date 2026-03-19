/**
 * Questions and interactive exercises for Manushyata (मनुष्यता)
 */

// Reading comprehension questions for Author Introduction (लेखक परिचय)
const authorIntroQuestions = [
    {
        question: "मैथिलीशरण गुप्त का जन्म कब और कहाँ हुआ था?",
        options: [
            "1886 में अयोध्या में",
            "1886 में चिरगाँव में",
            "1898 में झाँसी में",
            "1898 में चिरगाँव में"
        ],
        correctAnswer: 1,
        explanation: "मैथिलीशरण गुप्त का जन्म 1886 में झाँसी के करीब चिरगाँव में हुआ था, जैसा कि पाठ में बताया गया है।"
    },
    {
        question: "मैथिलीशरण गुप्त किस उपाधि से विख्यात हुए थे?",
        options: [
            "राष्ट्रकवि",
            "महाकवि",
            "आधुनिक कवि",
            "युगपुरुष"
        ],
        correctAnswer: 0,
        explanation: "मैथिलीशरण गुप्त अपने जीवनकाल में ही राष्ट्रकवि के रूप में विख्यात हुए थे।"
    },
    {
        question: "मैथिलीशरण गुप्त की शिक्षा-दीक्षा कहाँ हुई थी?",
        options: [
            "विश्वविद्यालय में",
            "गुरुकुल में",
            "घर पर ही",
            "विदेश में"
        ],
        correctAnswer: 2,
        explanation: "मैथिलीशरण गुप्त की शिक्षा-दीक्षा घर पर ही हुई थी।"
    },
    {
        question: "मैथिलीशरण गुप्त की प्रमुख कृतियाँ कौन-कौन सी हैं?",
        options: [
            "साकेत, भारत-भारती, प्रियप्रवास",
            "साकेत, यशोधरा, जयद्रथ वध",
            "रामचरितमानस, गीतांजलि, कामायनी",
            "कुरुक्षेत्र, उर्वशी, रश्मिरथी"
        ],
        correctAnswer: 1,
        explanation: "मैथिलीशरण गुप्त की प्रमुख कृतियाँ हैं- साकेत, यशोधरा, जयद्रथ वध।"
    },
    {
        question: "मैथिलीशरण गुप्त की कविता की भाषा कैसी थी?",
        options: [
            "विशुद्ध खड़ी बोली जिस पर संस्कृत का प्रभाव था",
            "ब्रज भाषा जिस पर अवधी का प्रभाव था",
            "अवधी जिस पर फारसी का प्रभाव था",
            "राजस्थानी जिस पर ब्रज का प्रभाव था"
        ],
        correctAnswer: 0,
        explanation: "मैथिलीशरण गुप्त की कविता की भाषा विशुद्ध खड़ी बोली थी। भाषा पर संस्कृत का प्रभाव था।"
    }
];

// Reading comprehension questions for Text Introduction (पाठ प्रवेश)
const textIntroQuestions = [
    {
        question: "प्रकृति के अन्य प्राणियों की तुलना में मनुष्य की क्या विशेषता है?",
        options: [
            "शारीरिक शक्ति",
            "चेतना शक्ति की प्रबलता",
            "लंबा जीवन",
            "अधिक समझदारी"
        ],
        correctAnswer: 1,
        explanation: "पाठ के अनुसार, प्रकृति के अन्य प्राणियों की तुलना में मनुष्य में चेतना शक्ति की प्रबलता होती ही है।"
    },
    {
        question: "कवि किसे सच्चा मनुष्य मानता है?",
        options: [
            "जो केवल अपने लिए जीता है",
            "जो अपने परिवार के लिए जीता है",
            "जो दूसरों के हित के लिए अपना जीवन समर्पित करता है",
            "जो धन-संपत्ति कमाता है"
        ],
        correctAnswer: 2,
        explanation: "कवि उन मनुष्यों को ही महान मानता है जिनमें अपने और अपनों के हित चिंतन से कहीं पहले और सर्वोपरि दूसरों का हित चिंतन हो।"
    },
    {
        question: "पाठ में 'सुमृत्यु' शब्द का क्या अर्थ है?",
        options: [
            "आत्महत्या",
            "प्राकृतिक मृत्यु",
            "युद्ध में मृत्यु",
            "ऐसी मृत्यु जो लोगों की यादों में बसी रहे"
        ],
        correctAnswer: 3,
        explanation: "पाठ के अनुसार, ऐसी मृत्यु जिससे व्यक्ति युगों तक औरों की यादों में बना रहता है, सुमृत्यु होती है।"
    },
    {
        question: "कवि के अनुसार पशु और मनुष्य में क्या अंतर है?",
        options: [
            "पशु केवल अपने लिए जीता है जबकि मनुष्य दूसरों के लिए जीता और मरता है",
            "पशु हिंसक होते हैं जबकि मनुष्य अहिंसक होते हैं",
            "पशु अपना भोजन स्वयं जुटाते हैं जबकि मनुष्य समाज पर निर्भर होते हैं",
            "पशु प्रकृति के नियमों का पालन करते हैं जबकि मनुष्य अपने नियम बनाते हैं"
        ],
        correctAnswer: 0,
        explanation: "कवि के अनुसार, 'वही पशु-प्रवृत्ति है कि आप आप ही चरे, वही मनुष्य है कि जो मनुष्य के लिए मरे।' अर्थात पशु केवल अपने लिए जीता है जबकि मनुष्य दूसरों के लिए जीता और मरता है।"
    }
];

// Reading comprehension questions for Poem (कविता)
const poemQuestions = [
    {
        question: "कवि ने कैसी मृत्यु को 'सुमृत्यु' कहा है?",
        options: [
            "जो बिना किसी कष्ट के हो",
            "जो बुढ़ापे में आए",
            "जिससे सभी लोग याद करें",
            "जो युद्ध में होती है"
        ],
        correctAnswer: 2,
        explanation: "कवि के अनुसार, 'मरो, परंतु यों मरो कि याद जो करें सभी। हुई न यों सुमृत्यु तो वृथा मरे, वृथा जिए।' अर्थात वह मृत्यु जिससे लोग व्यक्ति को याद करें, सुमृत्यु है।"
    },
    {
        question: "कविता में उदार व्यक्ति के लिए क्या कहा गया है?",
        options: [
            "वह धन से संपन्न होता है",
            "उसकी कीर्ति सदा जीवित रहती है",
            "उसे सब आदर देते हैं",
            "वह कभी नहीं मरता"
        ],
        correctAnswer: 1,
        explanation: "कविता के अनुसार, 'उसी उदार की सदा सजीव कीर्ति कूजती; तथा उसी उदार को समस्त सृष्टि पूजती।' अर्थात उदार व्यक्ति की कीर्ति सदा जीवित रहती है और सारी सृष्टि उसका सम्मान करती है।"
    },
    {
        question: "कविता में किन महापुरुषों के त्याग का उदाहरण दिया गया है?",
        options: [
            "बुद्ध, महावीर, गांधी",
            "रंतिदेव, दधीचि, उशीनर, कर्ण",
            "राम, कृष्ण, शिव",
            "अर्जुन, भीम, युधिष्ठिर"
        ],
        correctAnswer: 1,
        explanation: "कविता में रंतिदेव, दधीचि, उशीनर और कर्ण के त्याग का उदाहरण दिया गया है।"
    },
    {
        question: "'मनुष्य मात्र बंधु है' से कवि क्या संदेश देना चाहता है?",
        options: [
            "सभी मनुष्य एक ही परिवार के सदस्य हैं और उन्हें एक-दूसरे की सहायता करनी चाहिए",
            "सभी मनुष्य बंधन में हैं और उन्हें मुक्ति पानी चाहिए",
            "मनुष्य को केवल अपने परिवार से प्रेम करना चाहिए",
            "मनुष्य बंधुओं के बीच भी प्रतिस्पर्धा होनी चाहिए"
        ],
        correctAnswer: 0,
        explanation: "कवि यह संदेश देना चाहता है कि सभी मनुष्य एक ही परिवार के सदस्य हैं। फलानुसार कर्म के आधार पर बाहरी भेद हो सकते हैं, लेकिन अंतर्मन में सभी एक हैं। इसलिए सभी को एक-दूसरे की सहायता करनी चाहिए।"
    },
    {
        question: "कविता के अनुसार, परोपकार का क्या महत्व है?",
        options: [
            "इससे धन प्राप्त होता है",
            "इससे व्यक्ति को शक्ति मिलती है",
            "यह मनुष्यता का सच्चा लक्षण है",
            "इससे स्वार्थ सिद्ध होता है"
        ],
        correctAnswer: 2,
        explanation: "कविता के अनुसार, 'अहा! वही उदार है परोपकार जो करे, वही मनुष्य है कि जो मनुष्य के लिए मरे।' अर्थात परोपकार मनुष्यता का सच्चा लक्षण है।"
    }
];

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "मरणशील",
    vocab2: "पशु जैसा स्वभाव",
    vocab3: "दानशील",
    vocab4: "आभारी",
    vocab5: "यश",
    vocab6: "भूख से व्याकुल"
};

// Initialize questions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load text questions when the thinking-text module is shown
    const textQuestionsContainer = document.getElementById('textQuestions');
    if (textQuestionsContainer) {
        loadTextQuestions(textQuestionsContainer);
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
    
    // Always create multiple choice question
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
        if (typeof updateProgress === 'function') {
            updateProgress('thinking-text', 20);
        }
    }
}

// Check prereading MCQs
function checkPreereadingMCQs() {
    // Correct answers (0-based index) with quality ratings
    const correctAnswers = {
        'prereading-q1': {
            answer: 2, // मनुष्य की सच्ची पहचान उसके द्वारा दूसरों के लिए किए गए कार्यों से है
            rating: "best"
        },
        'prereading-q2': {
            answer: 1, // सुमृत्यु का अर्थ है ऐसी मृत्यु जिससे लोग व्यक्ति को याद करें
            rating: "best"
        },
        'prereading-q3': {
            answer: 0, // परोपकार से समाज में सहयोग और सामंजस्य की भावना पनपती है
            rating: "best"
        }
    };
    
    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let allAnswered = true;
    let answerQuality = {};
    
    // Check each question
    Object.keys(correctAnswers).forEach(questionName => {
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            const isCorrect = userAnswer === correctAnswers[questionName].answer;
            
            // Get the parent question div
            const questionDiv = document.querySelector(`[name="${questionName}"]`).closest('.mcq-question');
            
            // Add feedback to the question
            let feedbackEl = questionDiv.querySelector('.question-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.className = 'question-feedback';
                questionDiv.appendChild(feedbackEl);
            }
            
            if (isCorrect) {
                feedbackEl.textContent = '✓ उत्तम! यह सबसे अच्छा विकल्प है।';
                feedbackEl.className = 'question-feedback correct';
                correctCount++;
                answerQuality[questionName] = "best";
            } else {
                // Determine quality of answer
                let quality = "good";
                if (Math.abs(userAnswer - correctAnswers[questionName].answer) === 1) {
                    quality = "better";
                } else {
                    quality = "good";
                }
                
                // Get the text of the correct option and selected option
                const correctOptionLabel = document.querySelector(`label[for="${questionName}-opt${correctAnswers[questionName].answer}"]`).textContent;
                
                if (quality === "better") {
                    feedbackEl.textContent = `आपका उत्तर बेहतर है, लेकिन सर्वोत्तम उत्तर है: ${correctOptionLabel}`;
                } else {
                    feedbackEl.textContent = `आपका उत्तर अच्छा है, लेकिन सर्वोत्तम उत्तर है: ${correctOptionLabel}`;
                }
                
                feedbackEl.className = `question-feedback ${quality}`;
                answerQuality[questionName] = quality;
            }
        } else {
            // Question not answered
            allAnswered = false;
            
            // Get the parent question div
            const questionDiv = document.querySelector(`[name="${questionName}"]`).closest('.mcq-question');
            
            // Add warning feedback
            let feedbackEl = questionDiv.querySelector('.question-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.className = 'question-feedback';
                questionDiv.appendChild(feedbackEl);
            }
            
            feedbackEl.textContent = 'कृपया एक विकल्प चुनें।';
            feedbackEl.className = 'question-feedback warning';
        }
    });
    
    if (!allAnswered) {
        return;
    }
    
    // Show overall feedback
    const feedbackContainer = document.getElementById('preereadingFeedback');
    
    // Provide quality-based feedback
    let bestCount = Object.values(answerQuality).filter(q => q === "best").length;
    let betterCount = Object.values(answerQuality).filter(q => q === "better").length;
    
    let feedbackMessage = '';
    let feedbackClass = '';
    
    if (bestCount === totalQuestions) {
        feedbackMessage = 'उत्कृष्ट! आपने सभी प्रश्नों के सर्वोत्तम उत्तर दिए!';
        feedbackClass = 'success';
    } else if (bestCount >= totalQuestions / 2) {
        feedbackMessage = 'बहुत अच्छा! आपने अधिकांश प्रश्नों के सर्वोत्तम उत्तर दिए।';
        feedbackClass = 'success';
    } else if (betterCount >= totalQuestions / 2) {
        feedbackMessage = 'अच्छा प्रयास! आपके उत्तर बेहतर हैं, लेकिन और सुधार की गुंजाइश है।';
        feedbackClass = 'partial';
    } else {
        feedbackMessage = 'अच्छा प्रयास! अपने उत्तरों पर पुनः विचार करें।';
        feedbackClass = 'partial';
    }
    
    feedbackContainer.textContent = feedbackMessage;
    feedbackContainer.className = `feedback-message show ${feedbackClass}`;
    
    // Update progress
    if (typeof updateProgress === 'function' && (bestCount + betterCount) >= 2) {
        updateProgress('prereading', 15);
    }
}
