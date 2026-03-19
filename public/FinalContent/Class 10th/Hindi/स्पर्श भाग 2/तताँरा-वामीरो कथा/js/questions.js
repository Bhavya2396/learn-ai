/**
 * Questions data for Tatara-Vamiro interactive Hindi lesson
 */

// Reflection answers (which answers are best/acceptable)
const reflectionAnswers = {
    best: "3", // This is the index of the best answer
    acceptable: ["2"] // This is also a good answer
};

// Feedback for each reflection option
const answerFeedback = {
    reflection: {
        "1": "अच्छा प्रयास! लेकिन आप और गहराई से सोचें कि तताँरा और वामीरो के बलिदान का महत्व क्या था।",
        "2": "अच्छा विचार! तताँरा और वामीरो के बलिदान से वैवाहिक संबंध संभव हुए, लेकिन इसका और गहरा सामाजिक प्रभाव क्या था?",
        "3": "शानदार! आपने सही पहचाना कि तताँरा और वामीरो का बलिदान एक शक्तिशाली प्रतीक है जिसने पुरानी रूढ़ियों को तोड़कर समाज को एक नई दिशा दी।",
        "4": "अच्छा प्रयास! लेकिन इस कहानी को महज़ एक लोककथा मानना इसके गहरे सामाजिक और सांस्कृतिक महत्व की उपेक्षा करना है।"
    }
};

// Text comprehension questions
const textQuestions = [
    {
        type: "multiple-choice",
        question: "अंदमान द्वीपसमूह का अंतिम दक्षिणी द्वीप कौन सा है?",
        options: [
            "कार-निकोबार",
            "लिटिल अंदमान",
            "पोर्ट ब्लेयर",
            "लपाती"
        ],
        correctAnswer: 1, // Index of correct option (0-based)
        feedback: {
            correct: "बिल्कुल सही! अंदमान द्वीपसमूह का अंतिम दक्षिणी द्वीप लिटिल अंदमान है, जो पोर्ट ब्लेयर से लगभग सौ किलोमीटर दूर स्थित है।",
            incorrect: "यह सही नहीं है। अंदमान द्वीपसमूह का अंतिम दक्षिणी द्वीप लिटिल अंदमान है।"
        }
    },
    {
        type: "multiple-choice",
        question: "तताँरा के पास कौन सी विशेष वस्तु थी?",
        options: [
            "सोने का हार",
            "चमकदार मणि",
            "लकड़ी की तलवार",
            "जादुई छड़ी"
        ],
        correctAnswer: 2, // Index of correct option (0-based)
        feedback: {
            correct: "बिल्कुल सही! तताँरा के पास एक लकड़ी की तलवार थी जिसमें लोगों के अनुसार अद्भुत दैवीय शक्ति थी।",
            incorrect: "यह सही नहीं है। तताँरा के पास एक लकड़ी की तलवार थी जिसमें लोगों के अनुसार अद्भुत दैवीय शक्ति थी।"
        }
    },
    {
        type: "multiple-choice",
        question: "वामीरो किस गाँव से थी?",
        options: [
            "पासा",
            "लपाती",
            "कार-निकोबार",
            "पोर्ट ब्लेयर"
        ],
        correctAnswer: 1, // Index of correct option (0-based)
        feedback: {
            correct: "सही उत्तर! वामीरो लपाती गाँव से थी।",
            incorrect: "यह सही नहीं है। कहानी में बताया गया है कि वामीरो लपाती गाँव से थी।"
        }
    },
    {
        type: "multiple-choice",
        question: "तताँरा और वामीरो का मिलन कहाँ हुआ?",
        options: [
            "जंगल में",
            "गाँव के मंदिर में",
            "समुद्र किनारे",
            "पर्व-त्योहार में"
        ],
        correctAnswer: 2, // Index of correct option (0-based)
        feedback: {
            correct: "सही उत्तर! तताँरा और वामीरो का मिलन समुद्र किनारे हुआ था, जहाँ वामीरो गा रही थी और तताँरा टहलने निकला था।",
            incorrect: "यह सही नहीं है। तताँरा और वामीरो का मिलन समुद्र किनारे हुआ था, जहाँ वामीरो गा रही थी और तताँरा टहलने निकला था।"
        }
    },
    {
        type: "short-answer",
        question: "तताँरा और वामीरो के संबंध के मार्ग में क्या बाधा थी? इसका समाज पर क्या प्रभाव पड़ा?",
        model_answer: "तताँरा और वामीरो के संबंध के मार्ग में मुख्य बाधा यह थी कि वे दो अलग-अलग गाँवों से थे। परंपरा के अनुसार, अलग-अलग गाँवों के लोगों के बीच वैवाहिक संबंध संभव नहीं थे। इस बाधा और उनके बलिदान के कारण समाज में परिवर्तन आया और बाद में निकोबारी लोग दूसरे गाँवों में भी आपसी वैवाहिक संबंध करने लगे। इस प्रकार उनका बलिदान सामाजिक परिवर्तन का कारण बना।",
        feedback: "आपका उत्तर अच्छा है! तताँरा और वामीरो के अलग-अलग गाँवों से होने के कारण उनके संबंध पर परंपरा की रोक थी। उनके बलिदान के बाद समाज में परिवर्तन आया और लोग दूसरे गाँवों में भी वैवाहिक संबंध बनाने लगे।"
    },
    {
        type: "multiple-choice",
        question: "कहानी के अनुसार, कार-निकोबार और लिटिल अंदमान द्वीप के बीच की दूरी कितनी है?",
        options: [
            "50 किलोमीटर",
            "75 किलोमीटर",
            "96 किलोमीटर",
            "100 किलोमीटर"
        ],
        correctAnswer: 2, // Index of correct option (0-based)
        feedback: {
            correct: "सही उत्तर! कहानी में बताया गया है कि कार-निकोबार और लिटिल अंदमान द्वीप के बीच की दूरी 96 किलोमीटर है।",
            incorrect: "यह सही नहीं है। कहानी में बताया गया है कि कार-निकोबार और लिटिल अंदमान द्वीप के बीच की दूरी 96 किलोमीटर है।"
        }
    },
    {
        type: "essay",
        question: "इस लोककथा का क्या संदेश है? आज के संदर्भ में इसकी प्रासंगिकता पर अपने विचार व्यक्त कीजिए।",
        model_answer: "इस लोककथा का मूल संदेश है कि प्रेम और बलिदान सामाजिक परिवर्तन ला सकते हैं और कुरीतियों को मिटा सकते हैं। तताँरा और वामीरो ने जिस प्रकार अपने प्रेम के लिए बलिदान दिया, उसने रूढ़िवादी विचारों को तोड़ने में मदद की। आज के संदर्भ में भी इस कथा की प्रासंगिकता है क्योंकि आज भी कई समाजों में जातिगत, धार्मिक या क्षेत्रीय भेदभाव के आधार पर प्रेम और विवाह पर प्रतिबंध हैं। यह कहानी हमें सिखाती है कि समाज को बदलने के लिए कभी-कभी त्याग और बलिदान की आवश्यकता होती है, और एक पीढ़ी के बलिदान से आने वाली पीढ़ियों को स्वतंत्रता मिलती है।",
        feedback: "आपका उत्तर अच्छा है। इस लोककथा में प्रेम और बलिदान द्वारा सामाजिक परिवर्तन का संदेश है, जो आज भी प्रासंगिक है जहाँ सामाजिक भेदभाव और रूढ़िवादी विचारों के खिलाफ संघर्ष जारी है।"
    },
    {
        type: "short-answer",
        question: "तताँरा की तलवार का क्या महत्व था और उसने इसका उपयोग कैसे किया?",
        model_answer: "तताँरा की तलवार लकड़ी की थी, लेकिन लोगों का मानना था कि उसमें अद्भुत दैवीय शक्ति थी। तताँरा इसे हमेशा अपने पास रखता था और कभी अलग नहीं करता था। क्रोध में उसने इसी तलवार को धरती में घोंप दिया, जिससे द्वीप दो हिस्सों में बंट गया। इस प्रकार तताँरा की तलवार ने सचमुच अलौकिक शक्ति का परिचय दिया और कार-निकोबार और लिटिल अंदमान द्वीप के अलग होने का कारण बनी।",
        feedback: "सही उत्तर! तताँरा की लकड़ी की तलवार में दैवीय शक्ति थी, जिससे क्रोध में धरती में घोंपने पर द्वीप दो हिस्सों में बंट गया, जिससे कार-निकोबार और लिटिल अंदमान अलग हो गए।"
    },
    {
        type: "multiple-choice",
        question: "लीलाधर मंडलोई की यह कहानी किस प्रकार की है?",
        options: [
            "ऐतिहासिक कथा",
            "लोककथा",
            "आत्मकथा",
            "विज्ञान कथा"
        ],
        correctAnswer: 1, // Index of correct option (0-based)
        feedback: {
            correct: "सही उत्तर! यह एक लोककथा है जो अंदमान निकोबार द्वीपसमूह में प्रचलित है और जिसे लीलाधर मंडलोई ने पुनर्लिखित किया है।",
            incorrect: "यह सही नहीं है। यह एक लोककथा है जो अंदमान निकोबार द्वीपसमूह में प्रचलित है और जिसे लीलाधर मंडलोई ने पुनर्लिखित किया है।"
        }
    },
    {
        type: "short-answer",
        question: "इस कहानी में आये भाषाई सौंदर्य के किन्हीं दो उदाहरणों पर चर्चा कीजिए।",
        model_answer: "इस कहानी में भाषाई सौंदर्य के अनेक उदाहरण हैं। पहला उदाहरण है: 'एक-एक पल पहाड़ की तरह भारी था' - यहाँ उपमा अलंकार का प्रयोग करके प्रतीक्षा की कठिनाई को दर्शाया गया है। दूसरा उदाहरण है: 'आस की एक किरण थी जो समुद्र की देह पर डूबती किरणों की तरह कभी भी डूब सकती थी' - यहाँ उपमा और रूपक अलंकारों का सुंदर संयोजन है जो आशा और निराशा के बीच झूलते मन की स्थिति को दर्शाता है।",
        feedback: "आपने भाषाई सौंदर्य के अच्छे उदाहरण दिए हैं। कहानी में उपमा, रूपक और अन्य अलंकारों का सुंदर प्रयोग है जो कथानक को प्रभावशाली बनाता है।"
    }
];

// Load questions into the interface
document.addEventListener('DOMContentLoaded', () => {
    loadTextQuestions();
});

// Function to load text comprehension questions
function loadTextQuestions() {
    const questionContainer = document.getElementById('textQuestions');
    if (!questionContainer) return;
    
    // Clear any existing content
    questionContainer.innerHTML = '';
    
    // Add multiple choice and short answer questions
    const shortAnswerQuestions = textQuestions.filter(q => q.type === 'short-answer' || q.type === 'essay');
    const multiChoiceQuestions = textQuestions.filter(q => q.type === 'multiple-choice');
    
    // Section for multiple choice questions
    const mcSection = document.createElement('div');
    mcSection.className = 'question-set';
    mcSection.innerHTML = `
        <h3 class="question-section-title">बहुविकल्पीय प्रश्न</h3>
    `;
    
    // Add each multiple choice question
    multiChoiceQuestions.forEach((question, index) => {
        const questionId = `mc-question-${index}`;
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        
        // Create question markup
        let questionMarkup = `
            <div class="question-text">${index + 1}. ${question.question}</div>
            <div class="question-options">
        `;
        
        // Add options
        question.options.forEach((option, optIndex) => {
            questionMarkup += `
                <div class="option">
                    <input type="radio" id="${questionId}-option-${optIndex}" name="${questionId}" value="${optIndex}">
                    <label for="${questionId}-option-${optIndex}">${option}</label>
                </div>
            `;
        });
        
        // Close question options and add submit button + feedback area
        questionMarkup += `
            </div>
            <button class="interactive-btn" onclick="checkMultipleChoice('${questionId}', ${index})">
                उत्तर जाँचें
            </button>
            <div id="${questionId}-feedback" class="question-feedback"></div>
        `;
        
        questionItem.innerHTML = questionMarkup;
        mcSection.appendChild(questionItem);
    });
    
    // Section for short answer questions
    const saSection = document.createElement('div');
    saSection.className = 'question-set';
    saSection.innerHTML = `
        <h3 class="question-section-title">लघु उत्तरीय प्रश्न</h3>
    `;
    
    // Add each short answer question
    shortAnswerQuestions.forEach((question, index) => {
        const questionId = `sa-question-${index}`;
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        
        // Determine if it's a short answer or essay question
        const isEssay = question.type === 'essay';
        const questionTypeLabel = isEssay ? 'निबंधात्मक प्रश्न' : 'लघु उत्तरीय प्रश्न';
        const rows = isEssay ? 8 : 4;
        
        // Create question markup
        let questionMarkup = `
            <div class="question-text">${index + 1}. ${question.question} <span class="question-type">(${questionTypeLabel})</span></div>
            <div class="model-answer">
                <h4>उत्तर:</h4>
                <p>${question.model_answer}</p>
            </div>
        `;
        
        questionItem.innerHTML = questionMarkup;
        saSection.appendChild(questionItem);
    });
    
    // Add sections to container
    questionContainer.appendChild(mcSection);
    questionContainer.appendChild(saSection);
}

// Function to check multiple choice answers
function checkMultipleChoice(questionId, index) {
    const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
    const feedbackElement = document.getElementById(`${questionId}-feedback`);
    
    if (!selectedOption) {
        feedbackElement.textContent = 'कृपया कोई एक विकल्प चुनें।';
        feedbackElement.className = 'question-feedback warning';
        return;
    }
    
    const multiChoiceQuestions = textQuestions.filter(q => q.type === 'multiple-choice');
    const question = multiChoiceQuestions[index];
    const userAnswer = parseInt(selectedOption.value);
    const isCorrect = userAnswer === question.correctAnswer;
    
    feedbackElement.textContent = isCorrect ? question.feedback.correct : question.feedback.incorrect;
    feedbackElement.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    // Update score if correct
    if (isCorrect && !question.alreadyAnswered) {
        question.alreadyAnswered = true;
        if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
            score += 5;
            document.getElementById('totalScore').textContent = score;
        }
    }
}

// Function to show model answer
function showModelAnswer(questionId) {
    const modelAnswer = document.getElementById(`${questionId}-model`);
    if (modelAnswer.style.display === 'none') {
        modelAnswer.style.display = 'block';
    } else {
        modelAnswer.style.display = 'none';
    }
}

// Note: saveShortAnswer function has been removed as we're now showing answers directly
