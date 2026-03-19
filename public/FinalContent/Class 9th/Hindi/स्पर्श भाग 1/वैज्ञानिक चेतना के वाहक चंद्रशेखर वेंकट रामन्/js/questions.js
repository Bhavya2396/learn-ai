/**
 * Questions and interactive exercises for CV Raman
 */

// Oral Questions (मौखिक प्रश्न) - One-two line answers
const oralQuestions = [
    {
        question: "रामन् भावुक प्रकृति प्रेमी के अलावा और क्या थे?",
        options: [
            "केवल कवि थे",
            "एक जिज्ञासु वैज्ञानिक भी थे",
            "एक चित्रकार थे",
            "एक संगीतकार थे"
        ],
        correctAnswer: 1,
        explanation: "रामन् भावुक प्रकृति प्रेमी के अलावा एक जिज्ञासु वैज्ञानिक भी थे।"
    },
    {
        question: "समुद्र को देखकर रामन् के मन में कौन-सी दो जिज्ञासाएँ उठीं?",
        options: [
            "समुद्र कितना गहरा है और उसमें कौन से जीव रहते हैं",
            "समुद्र का रंग नीला क्यों है और कुछ और क्यों नहीं",
            "समुद्र में कितना पानी है और वह कहाँ से आता है",
            "समुद्र में लहरें क्यों उठती हैं और वे कैसे बनती हैं"
        ],
        correctAnswer: 1,
        explanation: "रामन् के मन में यह जिज्ञासा उठी कि समुद्र का रंग नीला क्यों होता है, कुछ और क्यों नहीं।"
    },
    {
        question: "रामन् के पिता ने उनमें किन विषयों की सशक्त नींव डाली?",
        options: [
            "हिंदी और अंग्रेजी",
            "गणित और भौतिकी",
            "इतिहास और भूगोल",
            "रसायन और जीव विज्ञान"
        ],
        correctAnswer: 1,
        explanation: "रामन् के पिता ने उनमें गणित और भौतिकी विषयों की सशक्त नींव डाली थी।"
    },
    {
        question: "वाद्ययंत्रों की ध्वनियों के अध्ययन के द्वारा रामन् क्या करना चाहते थे?",
        options: [
            "संगीत सिखाना",
            "वाद्ययंत्र बनाना",
            "वाद्ययंत्रों की ध्वनियों के पीछे छिपे वैज्ञानिक रहस्यों की परतें खोलना",
            "संगीत समारोह आयोजित करना"
        ],
        correctAnswer: 2,
        explanation: "रामन् वाद्ययंत्रों की ध्वनियों के पीछे छिपे वैज्ञानिक रहस्यों की परतें खोलने का प्रयास कर रहे थे।"
    },
    {
        question: "सरकारी नौकरी छोड़ने के पीछे रामन् की क्या भावना थी?",
        options: [
            "अधिक पैसा कमाना",
            "प्रसिद्ध होना",
            "सरस्वती की साधना (शोधकार्य) सरकारी सुख-सुविधाओं से कहीं अधिक महत्वपूर्ण थी",
            "विदेश जाना"
        ],
        correctAnswer: 2,
        explanation: "रामन् के लिए सरस्वती की साधना (शोधकार्य) सरकारी सुख-सुविधाओं से कहीं अधिक महत्वपूर्ण थी।"
    },
    {
        question: "'रामन् प्रभाव' की खोज के पीछे कौन-सा सवाल हिलोरें ले रहा था?",
        options: [
            "प्रकाश कैसे फैलता है?",
            "समुद्र का रंग नीला क्यों होता है?",
            "सूर्य क्यों चमकता है?",
            "आकाश नीला क्यों दिखता है?"
        ],
        correctAnswer: 1,
        explanation: "समुद्र के नीले रंग की वजह का सवाल रामन् के मस्तिष्क में हिलोरें ले रहा था।"
    },
    {
        question: "प्रकाश तरंगों के बारे में आइंस्टाइन ने क्या बताया?",
        options: [
            "प्रकाश केवल तरंग है",
            "प्रकाश अति सूक्ष्म कणों (फोटॉन) की तीव्र धारा के समान है",
            "प्रकाश एक प्रकार की ध्वनि है",
            "प्रकाश दिखाई नहीं देता"
        ],
        correctAnswer: 1,
        explanation: "आइंस्टाइन ने बताया कि प्रकाश अति सूक्ष्म कणों (फोटॉन) की तीव्र धारा के समान है।"
    },
    {
        question: "रामन् की खोज ने किन अध्ययनों को सहज बनाया?",
        options: [
            "रसायन विज्ञान के अध्ययन को",
            "पदार्थों के अणुओं और परमाणुओं की आंतरिक संरचना के अध्ययन को",
            "भूगोल के अध्ययन को",
            "जीव विज्ञान के अध्ययन को"
        ],
        correctAnswer: 1,
        explanation: "रामन् की खोज ने पदार्थों के अणुओं और परमाणुओं की आंतरिक संरचना के अध्ययन को सहज बनाया।"
    }
];

// Written Questions (25-30 words) - लिखित प्रश्न (क)
const writtenQuestionsShort = [
    {
        question: "कॉलेज के दिनों में रामन् की दिली इच्छा क्या थी?",
        options: [
            "वे अपना सारा जीवन शोधकार्यों को ही समर्पित कर देना चाहते थे",
            "वे एक बड़े अधिकारी बनना चाहते थे",
            "वे विदेश जाकर पढ़ना चाहते थे",
            "वे एक अमीर व्यक्ति बनना चाहते थे"
        ],
        correctAnswer: 0,
        explanation: "रामन् की दिली इच्छा यही थी कि वे अपना सारा जीवन शोधकार्यों को ही समर्पित कर दें।"
    },
    {
        question: "वाद्ययंत्रों पर की गई खोजों से रामन् ने कौन-सी भ्रांति तोड़ने की कोशिश की?",
        options: [
            "यह भ्रांति कि भारतीय वाद्ययंत्र विदेशी वाद्यों की तुलना में घटिया हैं",
            "यह भ्रांति कि संगीत से कोई फायदा नहीं",
            "यह भ्रांति कि वाद्ययंत्र महंगे होते हैं",
            "यह भ्रांति कि वाद्ययंत्र सीखना कठिन है"
        ],
        correctAnswer: 0,
        explanation: "रामन् ने पश्चिमी देशों की इस भ्रांति को तोड़ने की कोशिश की कि भारतीय वाद्ययंत्र विदेशी वाद्यों की तुलना में घटिया हैं।"
    },
    {
        question: "रामन् के लिए नौकरी संबंधी कौन-सा निर्णय कठिन था?",
        options: [
            "सरकारी नौकरी छोड़कर कम वेतन और कम सुविधाओंवाली विश्वविद्यालय की नौकरी में आना",
            "नौकरी छोड़कर व्यापार करना",
            "एक शहर से दूसरे शहर जाना",
            "अपना काम का समय बढ़ाना"
        ],
        correctAnswer: 0,
        explanation: "रामन् के लिए सरकारी नौकरी छोड़कर कम वेतन और कम सुविधाओंवाली विश्वविद्यालय की नौकरी में आने का निर्णय कठिन था।"
    },
    {
        question: "सर चंद्रशेखर वेंकट रामन् को समय-समय पर किन-किन पुरस्कारों से सम्मानित किया गया?",
        options: [
            "रॉयल सोसाइटी की सदस्यता, 'सर' की उपाधि, नोबेल पुरस्कार, भारत रत्न आदि",
            "केवल नोबेल पुरस्कार",
            "केवल भारत रत्न",
            "केवल पद्म श्री"
        ],
        correctAnswer: 0,
        explanation: "रामन् को रॉयल सोसाइटी की सदस्यता, 'सर' की उपाधि, नोबेल पुरस्कार, भारत रत्न आदि कई पुरस्कारों से सम्मानित किया गया।"
    },
    {
        question: "रामन् को मिलनेवाले पुरस्कारों ने भारतीय चेतना को जाग्रत किया। ऐसा क्यों कहा गया है?",
        options: [
            "क्योंकि उन्हें अधिकांश सम्मान उस दौर में मिले जब भारत गुलाम था, जिससे भारत को नया आत्म-सम्मान मिला",
            "क्योंकि वे बहुत अमीर हो गए थे",
            "क्योंकि वे विदेश चले गए थे",
            "क्योंकि वे राजनीति में शामिल हो गए थे"
        ],
        correctAnswer: 0,
        explanation: "रामन् को अधिकांश सम्मान उस दौर में मिले जब भारत अंग्रेज़ों का गुलाम था। इससे भारत को नया आत्म-सम्मान और आत्म-विश्वास मिला।"
    }
];

// Written Questions (50-60 words) - लिखित प्रश्न (ख)
const writtenQuestionsLong = [
    {
        question: "रामन् के प्रारंभिक शोधकार्य को आधुनिक हठयोग क्यों कहा गया है?",
        options: [
            "क्योंकि वे योग करते थे",
            "क्योंकि वे दफ़्तर के बाद कामचलाऊ उपकरणों से कठिन परिस्थितियों में भी दृढ़ता से शोधकार्य करते थे",
            "क्योंकि वे बहुत तेज़ी से काम करते थे",
            "क्योंकि वे रात में काम करते थे"
        ],
        correctAnswer: 1,
        explanation: "रामन् के शोधकार्य को आधुनिक हठयोग कहा गया क्योंकि वे दफ़्तर की मेहनत के बाद भी कम साधनों में दृढ़ता से काम करते थे।"
    },
    {
        question: "रामन् की खोज 'रामन् प्रभाव' क्या है?",
        options: [
            "जब प्रकाश पानी में गिरता है तो वह चमकता है",
            "जब एकवर्णीय प्रकाश तरल या ठोस पदार्थ से गुज़रता है तो उसके रंग में परिवर्तन होता है",
            "जब प्रकाश दर्पण से टकराता है तो वह वापस आता है",
            "जब सूर्य की किरणें पृथ्वी पर आती हैं तो गर्मी होती है"
        ],
        correctAnswer: 1,
        explanation: "रामन् प्रभाव यह है कि जब एकवर्णीय प्रकाश किसी तरल या ठोस पदार्थ से गुज़रता है तो उसके रंग में परिवर्तन होता है।"
    },
    {
        question: "'रामन् प्रभाव' की खोज से विज्ञान के क्षेत्र में कौन-से कार्य संभव हो सके?",
        options: [
            "केवल प्रकाश का अध्ययन संभव हुआ",
            "पदार्थों के अणुओं और परमाणुओं की संरचना का अध्ययन सहज हो गया और रामन् स्पेक्ट्रोस्कोपी विकसित हुई",
            "केवल रंगों का अध्ययन हुआ",
            "केवल समुद्र का अध्ययन संभव हुआ"
        ],
        correctAnswer: 1,
        explanation: "रामन् प्रभाव से पदार्थों की आंतरिक संरचना का अध्ययन आसान हो गया और रामन् स्पेक्ट्रोस्कोपी तकनीक विकसित हुई।"
    },
    {
        question: "देश को वैज्ञानिक दृष्टि प्रदान करने में रामन् का क्या योगदान था?",
        options: [
            "केवल नोबेल पुरस्कार जीता",
            "रामन् रिसर्च इंस्टीट्यूट की स्थापना, शोध-पत्रिका शुरू की, छात्रों का मार्गदर्शन किया",
            "केवल किताबें लिखीं",
            "केवल भाषण दिए"
        ],
        correctAnswer: 1,
        explanation: "रामन् ने अनुसंधान संस्थान बनाया, पत्रिकाएं शुरू कीं और सैकड़ों छात्रों को प्रशिक्षित किया।"
    },
    {
        question: "रामन् के जीवन से हमें क्या संदेश मिलता है?",
        options: [
            "केवल पैसा कमाना चाहिए",
            "वैज्ञानिक दृष्टि, जिज्ञासा, दृढ़ता और भारतीय पहचान बनाए रखते हुए काम करना चाहिए",
            "केवल विदेश जाना चाहिए",
            "केवल आराम करना चाहिए"
        ],
        correctAnswer: 1,
        explanation: "रामन् का जीवन हमें वैज्ञानिक सोच, जिज्ञासा, दृढ़ता और अपनी संस्कृति के साथ सफलता का संदेश देता है।"
    }
];

// Meaning Questions - आशय स्पष्ट कीजिए
const meaningQuestions = [
    {
        question: "उनके लिए सरस्वती की साधना सरकारी सुख-सुविधाओं से कहीं अधिक महत्वपूर्ण थी।",
        options: [
            "रामन् को सरकारी नौकरी पसंद नहीं थी",
            "रामन् के लिए विद्या और ज्ञान की प्राप्ति भौतिक सुख-सुविधाओं से अधिक मूल्यवान थी",
            "रामन् केवल पूजा-पाठ करते थे",
            "रामन् को पैसे की आवश्यकता नहीं थी"
        ],
        correctAnswer: 1,
        explanation: "इस वाक्य का आशय है कि रामन् के लिए ज्ञान और शोध (सरस्वती की साधना) सरकारी नौकरी की भौतिक सुविधाओं से कहीं अधिक महत्वपूर्ण थी।"
    },
    {
        question: "हमारे आसपास ऐसी न जाने कितनी ही चीजें बिखरी पड़ी हैं, जो अपने पात्र की तलाश में हैं।",
        options: [
            "हमारे आसपास बहुत से बर्तन पड़े हैं",
            "हमारे चारों ओर अनेक प्राकृतिक घटनाएँ और रहस्य हैं जो योग्य वैज्ञानिक की प्रतीक्षा में हैं",
            "लोग अपना सामान इधर-उधर फेंक देते हैं",
            "प्रकृति में सब कुछ बिखरा हुआ है"
        ],
        correctAnswer: 1,
        explanation: "यह वाक्य दर्शाता है कि हमारे आसपास अनेक वैज्ञानिक रहस्य और प्राकृतिक घटनाएँ हैं जो उस योग्य व्यक्ति की प्रतीक्षा में हैं जो उन्हें समझ सके।"
    },
    {
        question: "यह अपने आपमें एक आधुनिक हठयोग का उदाहरण था।",
        options: [
            "रामन् योग करते थे",
            "रामन् का कम साधनों में भी दृढ़ता और समर्पण से शोधकार्य करना आधुनिक तपस्या के समान था",
            "रामन् बहुत सख्त थे",
            "रामन् को गुस्सा आता था"
        ],
        correctAnswer: 1,
        explanation: "यह वाक्य दर्शाता है कि रामन् का कठिन परिस्थितियों में भी दृढ़ता से शोधकार्य में लगे रहना आधुनिक हठयोग (तपस्या) का उदाहरण था।"
    }
];

// Fill in the blanks - रिक्त स्थानों की पूर्ति
const fillInBlanks = [
    {
        question: "रामन् का पहला शोध पत्र ______ में प्रकाशित हुआ था।",
        options: ["नेचर", "फिलॉसॉफिकल मैगज़ीन", "साइंस", "करेंट साइंस"],
        correctAnswer: "फिलॉसॉफिकल मैगज़ीन"
    },
    {
        question: "रामन् की खोज ______ के क्षेत्र में एक क्रांति के समान थी।",
        options: ["रसायन विज्ञान", "भौतिकी", "जीव विज्ञान", "गणित"],
        correctAnswer: "भौतिकी"
    },
    {
        question: "कलकत्ता की मामूली-सी प्रयोगशाला का नाम ______ था।",
        options: ["टाटा इंस्टीट्यूट", "इंडियन एसोसिएशन फॉर द कल्टीवेशन ऑफ़ साइंस", "रामन् रिसर्च इंस्टीट्यूट", "इंडियन साइंस इंस्टीट्यूट"],
        correctAnswer: "इंडियन एसोसिएशन फॉर द कल्टीवेशन ऑफ़ साइंस"
    },
    {
        question: "रामन् द्वारा स्थापित शोध संस्थान ______ नाम से जानी जाती है।",
        options: ["रामन् इंस्टीट्यूट", "रामन् रिसर्च इंस्टीट्यूट", "इंडियन साइंस इंस्टीट्यूट", "टाटा रिसर्च इंस्टीट्यूट"],
        correctAnswer: "रामन् रिसर्च इंस्टीट्यूट"
    },
    {
        question: "पहले पदार्थों के अणुओं और परमाणुओं की आंतरिक संरचना का अध्ययन करने के लिए ______ का सहारा लिया जाता था।",
        options: ["रामन् स्पेक्ट्रोस्कोपी", "इंफ्रा रेड स्पेक्ट्रोस्कोपी", "एक्स-रे", "अल्ट्रासाउंड"],
        correctAnswer: "इंफ्रा रेड स्पेक्ट्रोस्कोपी"
    }
];

// Vocabulary answers for language section
const vocabularyAnswers = {
    vocab1: "आंध्र प्रदेश का एक नगर",
    vocab2: "बढ़ा-चढ़ाकर कहना", 
    vocab3: "जिसमें विलक्षण बौद्धिक शक्ति हो",
    vocab4: "उपयोगी",
    vocab5: "शोधकार्य"
};

// Sentence formation answers
const sentenceAnswers = {
    sentence1: "correct",
    sentence2: "correct", 
    sentence3: "correct"
};

// Initialize global question mappings
window.questionMappings = {};

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
    
    // Initialize vocabulary and sentence checking
    initializeLanguageExercises();
    
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
    // Reset question mappings for fresh shuffling
    window.questionMappings = {};
    
    // Create a single container for all questions
    const questionsHTML = `
        <div id="allQuestions" class="question-set active"></div>
    `;
    
    container.innerHTML = questionsHTML;
    
    // Load all questions in a single container
    const questionsContainer = document.getElementById('allQuestions');
    
    // Add Oral questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">प्रश्न-अभ्यास</h3><p class="section-desc">निम्नलिखित प्रश्नों के उत्तर एक-दो पंक्तियों में दीजिए:</p>';
    loadQuestionSet(questionsContainer, oralQuestions, 'oral');
    
    // Add Short Written questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">प्रश्न-अभ्यास</h3>';
    loadQuestionSet(questionsContainer, writtenQuestionsShort, 'written_short');
    
    // Add Long Written questions  
    questionsContainer.innerHTML += '<h3 class="question-section-title">प्रश्न-अभ्यास</h3>';
    loadQuestionSet(questionsContainer, writtenQuestionsLong, 'written_long');
    
    // Add Meaning questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">आशय स्पष्ट कीजिए</h3>';
    loadQuestionSet(questionsContainer, meaningQuestions, 'meaning');
    
    // Add Fill in the blanks
    questionsContainer.innerHTML += '<h3 class="question-section-title">रिक्त स्थानों की पूर्ति कीजिए</h3>';
    loadQuestionSet(questionsContainer, fillInBlanks, 'fill_blanks');
}

// Shuffle array function (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
    
    // Add event listeners to clear feedback when options change
    addOptionChangeListeners(container, prefix);
}

// Load long answer questions
function loadLongAnswerQuestions(container, questions, prefix) {
    questions.forEach((q, index) => {
        const questionHTML = createLongAnswerHTML(q, index, prefix);
        container.innerHTML += questionHTML;
    });
    
    // Add submit button for long answer questions
    container.innerHTML += `
        <div class="button-container">
            <button class="interactive-btn" onclick="showSampleAnswers('${prefix}')">नमूना उत्तर देखें</button>
        </div>
        <div id="${prefix}Feedback" class="feedback-message"></div>
    `;
}

// Create HTML for a question
function createQuestionHTML(question, index, prefix) {
    const questionId = `${prefix}-q${index}`;
    
    let optionsHTML = '';
    let shuffledOptions = [];
    let newCorrectAnswer = question.correctAnswer;
    
    // Multiple choice question
    if (question.options) {
        // Create array of options with their original indices
        const optionsWithIndex = question.options.map((option, idx) => ({
            text: option,
            originalIndex: idx
        }));
        
        // Shuffle the options
        shuffledOptions = shuffleArray(optionsWithIndex);
        
        // Find the new index of the correct answer after shuffling
        // Handle both numeric indices and string answers (for fill-in-the-blanks)
        let originalCorrectIndex;
        if (typeof question.correctAnswer === 'string') {
            originalCorrectIndex = question.options.indexOf(question.correctAnswer);
        } else {
            originalCorrectIndex = question.correctAnswer;
        }
        
        newCorrectAnswer = shuffledOptions.findIndex(opt => opt.originalIndex === originalCorrectIndex);
        
        // Store the shuffled mapping for later use in answer checking
        if (!window.questionMappings) window.questionMappings = {};
        window.questionMappings[questionId] = {
            shuffledOptions: shuffledOptions,
            correctAnswer: newCorrectAnswer
        };
        
        shuffledOptions.forEach((option, optIndex) => {
            optionsHTML += `
                <div class="option">
                    <input type="radio" id="${questionId}-opt${optIndex}" name="${questionId}" value="${optIndex}">
                    <label for="${questionId}-opt${optIndex}">${option.text}</label>
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

// Create HTML for long answer questions
function createLongAnswerHTML(question, index, prefix) {
    const questionId = `${prefix}-q${index}`;
    
    return `
        <div class="question-item" data-question-index="${index}">
            <div class="question-text">${index + 1}. ${question.question}</div>
            <textarea class="question-textarea" id="${questionId}-answer" placeholder="अपना उत्तर यहाँ लिखें..."></textarea>
            <div class="question-feedback" id="${questionId}-feedback" style="display: none;">
                <strong>नमूना उत्तर:</strong><br>
                ${question.sample_answer}
            </div>
        </div>
    `;
}

// Check answers for a question set
function checkAnswers(prefix) {
    let questions;
    switch (prefix) {
        case 'oral':
            questions = oralQuestions;
            break;
        case 'written_short':
            questions = writtenQuestionsShort;
            break;
        case 'written_long':
            questions = writtenQuestionsLong;
            break;
        case 'meaning':
            questions = meaningQuestions;
            break;
        case 'fill_blanks':
            questions = fillInBlanks;
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
            
            // Handle different answer formats
            let correctAnswer, correctAnswerText;
            
            // For fill-in-the-blanks, correctAnswer is a string, convert to index
            if (typeof question.correctAnswer === 'string') {
                correctAnswer = question.options.indexOf(question.correctAnswer);
                correctAnswerText = question.correctAnswer;
            } else {
                // For regular multiple choice, correctAnswer is already an index
                correctAnswer = question.correctAnswer;
                correctAnswerText = question.options[question.correctAnswer];
            }
            
            // Apply shuffled mapping if exists
            if (window.questionMappings && window.questionMappings[questionId]) {
                correctAnswer = window.questionMappings[questionId].correctAnswer;
                const shuffledOptions = window.questionMappings[questionId].shuffledOptions;
                correctAnswerText = shuffledOptions[correctAnswer].text;
            }
            
            const isCorrect = userAnswer === correctAnswer;
            
            feedbackEl.textContent = isCorrect ? 
                '✓ सही!' : 
                `✗ गलत। सही उत्तर है: ${correctAnswerText}`;
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
            score += 20;
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

// Add event listeners to clear feedback when options change
function addOptionChangeListeners(container, prefix) {
    // Add event listeners to all radio buttons in this container
    const radioButtons = container.querySelectorAll('input[type="radio"]');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Clear feedback for this specific question
            const questionId = this.name;
            const feedbackEl = document.getElementById(`${questionId}-feedback`);
            
            if (feedbackEl) {
                feedbackEl.textContent = '';
                feedbackEl.className = 'question-feedback';
            }
            
            // Also clear overall feedback
            const overallFeedback = document.getElementById(`${prefix}Feedback`);
            if (overallFeedback) {
                overallFeedback.textContent = '';
                overallFeedback.className = 'feedback-message';
            }
        });
    });
}

// Show sample answers for long answer questions
function showSampleAnswers(prefix) {
    let questions;
    switch (prefix) {
        case 'written_long':
            questions = writtenQuestionsLong;
            break;
        case 'meaning':
            questions = meaningQuestions;
            break;
        default:
            console.error(`Unknown question prefix: ${prefix}`);
            return;
    }
    
    questions.forEach((question, index) => {
        const questionId = `${prefix}-q${index}`;
        const feedbackEl = document.getElementById(`${questionId}-feedback`);
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'question-feedback correct';
    });
    
    // Show overall feedback
    const feedbackContainer = document.getElementById(`${prefix}Feedback`);
    feedbackContainer.textContent = 'नमूना उत्तर दिखाए गए हैं। इन उत्तरों की तुलना में अपने उत्तर लिखें।';
    feedbackContainer.className = 'feedback-message show success';
    
    // Update score
    if (typeof score !== 'undefined') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
}

// Initialize language exercises
function initializeLanguageExercises() {
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
            
            if (correctCount === totalCount) {
                if (typeof score !== 'undefined') {
                    score += 10;
                    document.getElementById('totalScore').textContent = score;
                }
            }
        }
    };
    
    window.checkSentences = function() {
        let correctCount = 0;
        let totalCount = 0;
        
        Object.keys(sentenceAnswers).forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                totalCount++;
                const isCorrect = select.value === sentenceAnswers[id];
                select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
                if (isCorrect) correctCount++;
            }
        });
        
        const feedbackEl = document.getElementById('sentenceFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} वाक्यों का सही प्रयोग किया!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
            
            if (correctCount === totalCount) {
                if (typeof score !== 'undefined') {
                    score += 10;
                    document.getElementById('totalScore').textContent = score;
                }
            }
        }
    };
}

// Make functions globally available
window.checkAnswers = checkAnswers;
window.showSampleAnswers = showSampleAnswers;
