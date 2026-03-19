/**
 * Multiple Choice Questions for Everest story
 */

// Question sets organized by type - All converted to MCQs
const questionSets = {
    oral: {
        title: "प्रश्न-अभ्यास",
        subtitle: "निम्नलिखित प्रश्नों के लिए सही विकल्प चुनिए:",
        questions: [
            {
                id: "oral1",
                text: "अग्रिम दल का नेतृत्व कौन कर रहा था?",
                type: "mcq",
                options: [
                    "कर्नल खुल्लर",
                    "उपनेता प्रेमचंद", 
                    "बछेंद्री पाल",
                    "तेनजिंग शेरपा"
                ],
                correct: 1,
                explanation: "उपनेता प्रेमचंद अग्रिम दल का नेतृत्व कर रहे थे।"
            },
            {
                id: "oral2", 
                text: "एवरेस्ट को नेपाली में क्या कहते हैं?",
                type: "mcq",
                options: [
                    "चोमोलुंगमा",
                    "सागरमाथा",
                    "माउंट एवरेस्ट", 
                    "शिवसंकल्प"
                ],
                correct: 1,
                explanation: "एवरेस्ट को नेपाली में 'सागरमाथा' कहते हैं और लेखिका को यह नाम अच्छा लगा।"
            },
            {
                id: "oral3",
                text: "एवरेस्ट की चोटी पर लेखिका को क्या ध्वज-सा लगा?",
                type: "mcq",
                options: [
                    "तिरंगा झंडा",
                    "बर्फ का बड़ा फूल (प्लूम)",
                    "प्रार्थना झंडियाँ",
                    "बादलों की परत"
                ],
                correct: 1,
                explanation: "एवरेस्ट की चोटी पर बर्फ का बड़ा फूल (प्लूम) लेखिका को पर्वत-शिखर पर लहराते ध्वज-सा लगा।"
            },
            {
                id: "oral4",
                text: "हिमस्खलन से कितने लोगों की मृत्यु हुई?",
                type: "mcq",
                options: [
                    "दो शेरपा कुली",
                    "एक शेरपा कुली",
                    "तीन शेरपा कुली",
                    "कोई मृत्यु नहीं हुई"
                ],
                correct: 1,
                explanation: "हिमस्खलन से एक शेरपा कुली की मृत्यु हुई और चार घायल हुए।"
            },
            {
                id: "oral5",
                text: "कर्नल खुल्लर ने एवरेस्ट अभियान के बारे में क्या कहा?",
                type: "mcq",
                options: [
                    "यह बहुत आसान काम है",
                    "खतरों को सहज भाव से स्वीकार करना चाहिए",
                    "वापस लौट जाना चाहिए", 
                    "केवल पुरुष ही चढ़ सकते हैं"
                ],
                correct: 1,
                explanation: "कर्नल खुल्लर ने कहा कि एवरेस्ट जैसे महान अभियान में खतरों को और मृत्यु को भी सहज भाव से स्वीकार करना चाहिए।"
            },
            {
                id: "oral6",
                text: "रसोई सहायक की मृत्यु कैसे हुई?",
                type: "mcq",
                options: [
                    "हिमस्खलन से",
                    "जलवायु अनुकूल न होने से",
                    "ऑक्सीजन की कमी से",
                    "दुर्घटना से"
                ],
                correct: 1,
                explanation: "जलवायु अनुकूल न होने के कारण रसोई सहायक की मृत्यु हुई।"
            },
            {
                id: "oral7",
                text: "कैंप-चार कब लगाया गया?",
                type: "mcq",
                options: [
                    "28 अप्रैल को",
                    "29 अप्रैल को",
                    "30 अप्रैल को",
                    "1 मई को"
                ],
                correct: 1,
                explanation: "आंगदोरजी, लोपसांग और गगन बिस्सा ने 29 अप्रैल को 7900 मीटर पर कैंप-चार लगाया।"
            },
            {
                id: "oral8",
                text: "लेखिका ने तेनजिंग को अपना परिचय कैसे दिया?",
                type: "mcq",
                options: [
                    "अनुभवी पर्वतारोही के रूप में",
                    "नौसिखिया के रूप में",
                    "प्रशिक्षक के रूप में",
                    "गाइड के रूप में"
                ],
                correct: 1,
                explanation: "लेखिका ने अपना परिचय यह कहकर दिया कि वह बिल्कुल ही नौसिखिया है और एवरेस्ट उसका पहला अभियान है।"
            },
            {
                id: "oral9",
                text: "लेखिका की सफलता पर कर्नल खुल्लर ने क्या कहा?",
                type: "mcq",
                options: [
                    "यह एक साधारण उपलब्धि है",
                    "देश को उस पर गर्व है",
                    "उसे और अभ्यास की जरूरत है",
                    "यह केवल भाग्य की बात है"
                ],
                correct: 1,
                explanation: "कर्नल खुल्लर ने कहा कि देश को उस पर गर्व है और वह एक ऐसे संसार में वापस जाएगी जो उसके पीछे छोड़े संसार से एकदम भिन्न होगा।"
            }
        ]
    },
    written25: {
        title: "प्रश्न-अभ्यास",
        subtitle: "निम्नलिखित प्रश्नों के लिए सही विकल्प चुनिए:",
        questions: [
            {
                id: "written1",
                text: "नज़दीक से एवरेस्ट को देखकर लेखिका को कैसा लगा?",
                type: "mcq",
                options: [
                    "डर लगा और वापस जाना चाहा",
                    "भौंचक्की होकर खड़ी रह गई",
                    "खुशी से नाचने लगी",
                    "तुरंत चढ़ाई शुरू कर दी"
                ],
                correct: 1,
                explanation: "एवरेस्ट को नज़दीक से देखकर लेखिका भौंचक्की होकर खड़ी रह गई और एवरेस्ट, ल्होत्से और नुप्से की ऊँचाइयों से घिरी बर्फ़ीली टेढ़ी-मेढ़ी नदी को निहारती रही।"
            },
            {
                id: "written2",
                text: "डॉ. मीनू मेहता ने किस बारे में जानकारी दी?",
                type: "mcq",
                options: [
                    "खाना बनाने के तरीकों के बारे में",
                    "एल्यूमिनियम की सीढ़ियों और रस्सियों के उपयोग के बारे में",
                    "मौसम की भविष्यवाणी के बारे में",
                    "शेरपाओं से बात करने के बारे में"
                ],
                correct: 1,
                explanation: "डॉ. मीनू मेहता ने एल्यूमिनियम की सीढ़ियों से अस्थायी पुलों का बनाना, लट्ठों और रस्सियों का उपयोग, बर्फ़ की दीवारों पर रस्सियों को बाँधने की जानकारी दी।"
            },
            {
                id: "written3",
                text: "तेनजिंग ने लेखिका की तारीफ़ में क्या कहा?",
                type: "mcq",
                options: [
                    "वह बहुत कमज़ोर लड़की है",
                    "उसे पर्वतारोहण नहीं सीखना चाहिए",
                    "वह एक पक्की पर्वतीय लड़की है",
                    "वह बहुत डरपोक है"
                ],
                correct: 2,
                explanation: "तेनजिंग ने कहा कि लेखिका एक पक्की पर्वतीय लड़की लगती है और उसे तो शिखर पर पहले ही प्रयास में पहुँचना चाहिए।"
            },
            {
                id: "written4",
                text: "लेखिका को किनके साथ चढ़ाई करनी थी?",
                type: "mcq",
                options: [
                    "कर्नल खुल्लर और तेनजिंग के साथ",
                    "जैस, जय और मीनू के साथ",
                    "केवल शेरपाओं के साथ",
                    "अकेले चढ़ाई करनी थी"
                ],
                correct: 1,
                explanation: "लेखिका को जैस, जय और मीनू के साथ चढ़ाई करनी थी। वे धीरे-धीरे आ रहे थे क्योंकि भारी बोझ लेकर और बिना ऑक्सीजन के चल रहे थे।"
            },
            {
                id: "written5",
                text: "लोपसांग ने तंबू का रास्ता कैसे साफ़ किया?",
                type: "mcq",
                options: [
                    "हाथों से बर्फ हटाकर",
                    "स्विस नाइफ की मदद से",
                    "रस्सी की सहायता से",
                    "फावड़े का उपयोग करके"
                ],
                correct: 1,
                explanation: "लोपसांग ने अपनी स्विस नाइफ की मदद से तंबू का रास्ता साफ़ किया और बर्फ़ के बड़े हिमपिंडों को हटाकर लेखिका को बर्फ़ की कब्र से निकाला।"
            },
            {
                id: "written6",
                text: "साउथ कौल कैंप पहुँचकर लेखिका ने क्या तैयारी की?",
                type: "mcq",
                options: [
                    "केवल आराम किया",
                    "खाना, कुकिंग गैस और ऑक्सीजन सिलिंडर इकट्ठे किए",
                    "तुरंत वापस जाने की तैयारी की",
                    "केवल फोन कॉल किए"
                ],
                correct: 1,
                explanation: "साउथ कौल कैंप पहुँचकर लेखिका ने खाना, कुकिंग गैस तथा कुछ ऑक्सीजन सिलिंडर इकट्ठे किए और अपनी महत्वपूर्ण चढ़ाई की तैयारी शुरू की।"
            }
        ]
    },
    written50: {
        title: "प्रश्न-अभ्यास",
        subtitle: "निम्नलिखित प्रश्नों के लिए सही विकल्प चुनिए:",
        questions: [
            {
                id: "long1",
                text: "उपनेता प्रेमचंद ने किन स्थितियों से अवगत कराया?",
                type: "mcq",
                options: [
                    "केवल मौसम की स्थिति के बारे में बताया",
                    "कैंप-एक तक रास्ता साफ करने और ग्लेशियर में बदलाव की चेतावनी दी",
                    "केवल खाने की व्यवस्था के बारे में बताया",
                    "वापस जाने की सलाह दी"
                ],
                correct: 1,
                explanation: "उपनेता प्रेमचंद ने बताया कि उनके दल ने कैंप-एक तक का रास्ता साफ़ कर दिया है। पुल बनाकर, रस्सियाँ बाँधकर तथा झंडियों से रास्ता चिह्नित कर सभी कठिनाइयों का जायज़ा ले लिया गया है। उन्होंने चेतावनी दी कि ग्लेशियर में अनियमित बदलाव के कारण सभी काम व्यर्थ हो सकते हैं।"
            },
            {
                id: "long2",
                text: "हिमपात कैसे होता है?",
                type: "mcq",
                options: [
                    "केवल बारिश के रूप में होता है",
                    "बर्फ़ के खंडों के अव्यवस्थित गिरने से, जिससे दरारें बनती हैं",
                    "केवल हवा के कारण होता है",
                    "केवल रात के समय होता है"
                ],
                correct: 1,
                explanation: "हिमपात बर्फ़ के खंडों के अव्यवस्थित ढंग से गिरना है। ग्लेशियर के बहने से बर्फ़ में हलचल हो जाती है, जिससे बड़ी-बड़ी बर्फ़ की चट्टानें तत्काल गिर जाती हैं। इससे धरातल पर दरारें पड़ जाती हैं जो गहरे-चौड़े हिम-विदर में बदल जाती हैं।"
            },
            {
                id: "long3",
                text: "लेखिका के तंबू में गिरे बर्फ़ पिंड का क्या वर्णन है?",
                type: "mcq",
                options: [
                    "छोटा सा बर्फ़ का टुकड़ा धीरे से गिरा",
                    "एक्सप्रेस रेलगाड़ी की तेज़ गति और भीषण गरज के साथ विशालकाय पुँज बनकर गिरा",
                    "केवल हल्की बर्फबारी हुई",
                    "कुछ खास नहीं हुआ"
                ],
                correct: 1,
                explanation: "ल्होत्से ग्लेशियर से एक लंबा बर्फ़ का पिंड टूटकर गिरा और विशालकाय पुँज बन गया। हिमखंडों, बर्फ़ के टुकड़ों का यह पुँज एक्सप्रेस रेलगाड़ी की तेज़ गति और भीषण गरज के साथ सीधी ढलान से आकर कैंप को तहस-नहस कर गया।"
            },
            {
                id: "long4",
                text: "लेखिका को देखकर 'की' हक्का-बक्का क्यों रह गया?",
                type: "mcq",
                options: [
                    "लेखिका बहुत सुंदर थी",
                    "लेखिका ने बहुत बड़ा जोखिम उठाकर दल की मदद के लिए नीचे उतरी थी",
                    "लेखिका पहले से वहाँ मौजूद थी",
                    "लेखिका ने गलत रास्ता लिया था"
                ],
                correct: 1,
                explanation: "लेखिका दल के सदस्यों की मदद करने के लिए जोखिम भरी यात्रा करके नीचे उतरी थी। इतनी ऊँचाई पर यह काम बहुत खतरनाक था। 'की' को लगा कि लेखिका ने बहुत बड़ा जोखिम उठाया है।"
            },
            {
                id: "long5",
                text: "एवरेस्ट पर चढ़ने के लिए मुख्यतः कितने कैंप बनाए गए?",
                type: "mcq",
                options: [
                    "केवल दो कैंप",
                    "तीन कैंप",
                    "मुख्यतः चार कैंप (बेस कैंप, कैंप-एक, दो, तीन, चार) और साउथ कौल कैंप",
                    "पाँच कैंप"
                ],
                correct: 2,
                explanation: "एवरेस्ट पर चढ़ने के लिए मुख्यतः चार कैंप बनाए गए: बेस कैंप (आधार शिविर), कैंप-एक (6000 मी. हिमपात के ऊपर), कैंप-दो, कैंप-तीन (ल्होत्से की बर्फ़ीली ढलान पर), और कैंप-चार (7900 मी.)। इसके अलावा साउथ कौल कैंप और शिखर कैंप भी थे।"
            },
            {
                id: "long6",
                text: "चढ़ाई के समय एवरेस्ट की चोटी की स्थिति कैसी थी?",
                type: "mcq",
                options: [
                    "बिल्कुल शांत और साफ मौसम था",
                    "तेज़ हवा, भुरभुरे बर्फ़ के कण उड़ रहे थे और दृश्यता शून्य थी",
                    "केवल हल्की बारिश हो रही थी",
                    "धूप खिली हुई थी"
                ],
                correct: 1,
                explanation: "चढ़ाई के समय एवरेस्ट की चोटी पर तेज़ हवा चल रही थी। दक्षिणी शिखर के ऊपर हवा की गति बढ़ गई थी और तेज़ हवा के कारण भुरभुरे बर्फ़ के कण चारों तरफ़ उड़ रहे थे, जिससे दृश्यता शून्य तक आ गई थी।"
            }
        ]
    }
};

// Current active question set
let currentQuestionSet = 'oral';
let userAnswers = {};

// Initialize questions when module loads
function initializeQuestions() {
    console.log('Initializing questions module');
    loadQuestionSet('oral');
}

// Load a specific question set
function loadQuestionSet(setName) {
    console.log(`Loading question set: ${setName}`);
    
    currentQuestionSet = setName;
    const questionSection = document.getElementById('textQuestions');
    
    if (!questionSection) {
        console.error('Question section not found');
        return;
    }
    
    const questionSet = questionSets[setName];
    if (!questionSet) {
        console.error(`Question set ${setName} not found`);
        return;
    }
    
    // Create question set navigation
    const navigation = createQuestionSetNavigation();
    
    // Create question set content
    const content = createQuestionSetContent(questionSet);
    
    questionSection.innerHTML = navigation + content;
    
    // Update active navigation
    updateQuestionNavigation(setName);
}

// Create navigation for question sets
function createQuestionSetNavigation() {
    return `
        <div class="question-set-nav">
            <button class="question-nav-btn ${currentQuestionSet === 'oral' ? 'active' : ''}" 
                    onclick="loadQuestionSet('oral')" aria-pressed="${currentQuestionSet === 'oral'}">
                प्रश्न-अभ्यास 1
            </button>
            <button class="question-nav-btn ${currentQuestionSet === 'written25' ? 'active' : ''}" 
                    onclick="loadQuestionSet('written25')" aria-pressed="${currentQuestionSet === 'written25'}">
                प्रश्न-अभ्यास 2
            </button>
            <button class="question-nav-btn ${currentQuestionSet === 'written50' ? 'active' : ''}" 
                    onclick="loadQuestionSet('written50')" aria-pressed="${currentQuestionSet === 'written50'}">
                प्रश्न-अभ्यास 3
            </button>
        </div>
    `;
}

// Create content for a question set
function createQuestionSetContent(questionSet) {
    let content = `
        <div class="question-set">
            <h3 class="question-section-title">${questionSet.title}</h3>
            <p class="question-subtitle">${questionSet.subtitle}</p>
    `;
    
    questionSet.questions.forEach((question, index) => {
        content += createQuestionItem(question, index);
    });
    
    content += `
            <div class="question-actions">
                <button class="interactive-btn" onclick="checkAllAnswers()">
                    उत्तर जाँचें
                </button>
            </div>
        </div>
    `;
    
    return content;
}

// Create individual question item - Updated for MCQs
function createQuestionItem(question, index) {
    const questionNumber = index + 1;
    
    let optionsHTML = '';
    question.options.forEach((option, optionIndex) => {
        optionsHTML += `
            <div class="mcq-option">
                <input type="radio" 
                       id="option-${question.id}-${optionIndex}"
                       name="question-${question.id}" 
                       value="${optionIndex}">
                <label for="option-${question.id}-${optionIndex}">
                    ${option}
                </label>
            </div>
        `;
    });
    
    return `
        <div class="question-item" id="question-${question.id}">
            <div class="question-text">
                प्रश्न ${questionNumber}: ${question.text}
            </div>
            <div class="mcq-options">
                ${optionsHTML}
            </div>
            <div class="question-feedback" id="feedback-${question.id}"></div>
        </div>
    `;
}

// Update question navigation
function updateQuestionNavigation(activeSet) {
    document.querySelectorAll('.question-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    const activeBtn = document.querySelector(`[onclick="loadQuestionSet('${activeSet}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }
}

// Check all answers in current set - Updated for MCQs
function checkAllAnswers() {
    const questionSet = questionSets[currentQuestionSet];
    if (!questionSet) return;
    
    let correctAnswers = 0;
    let totalAnswers = 0;
    
    questionSet.questions.forEach(question => {
        const selectedOption = document.querySelector(`input[name="question-${question.id}"]:checked`);
        const feedbackEl = document.getElementById(`feedback-${question.id}`);
        
        if (!feedbackEl) return;
        
        totalAnswers++;
        
        if (!selectedOption) {
            feedbackEl.textContent = 'कृपया कोई विकल्प चुनें।';
            feedbackEl.className = 'question-feedback warning';
            return;
        }
        
        const selectedValue = parseInt(selectedOption.value);
        const isCorrect = selectedValue === question.correct;
        
        if (isCorrect) {
            feedbackEl.innerHTML = `
                <strong>सही उत्तर! ✓</strong><br>
                <em>${question.explanation}</em>
            `;
            feedbackEl.className = 'question-feedback correct';
            correctAnswers++;
        } else {
            const correctOptionText = question.options[question.correct];
            feedbackEl.innerHTML = `
                <strong>गलत उत्तर ✗</strong><br>
                <strong>सही उत्तर:</strong> ${correctOptionText}<br>
                <em>${question.explanation}</em>
            `;
            feedbackEl.className = 'question-feedback incorrect';
        }
        
        // Store user answer
        userAnswers[question.id] = selectedValue;
    });
    
    // Show overall feedback
    showOverallFeedback(correctAnswers, totalAnswers);
    
    // Update score
    if (window.score !== undefined) {
        window.score += correctAnswers * 5;
        const scoreEl = document.getElementById('totalScore');
        if (scoreEl) scoreEl.textContent = window.score;
    }
    
    // Narrator feedback
    if (window.narrator) {
        const percentage = Math.round((correctAnswers / totalAnswers) * 100);
        window.narrator.speak(`आपने ${totalAnswers} में से ${correctAnswers} प्रश्नों के सही उत्तर दिए हैं। यह ${percentage} प्रतिशत है।`);
    }
}

// Show all correct answers - Updated for MCQs
function showAllAnswers() {
    const questionSet = questionSets[currentQuestionSet];
    if (!questionSet) return;
    
    questionSet.questions.forEach(question => {
        const feedbackEl = document.getElementById(`feedback-${question.id}`);
        if (feedbackEl) {
            const correctOptionText = question.options[question.correct];
            feedbackEl.innerHTML = `
                <strong>सही उत्तर:</strong> ${correctOptionText}<br>
                <em>${question.explanation}</em>
            `;
            feedbackEl.className = 'question-feedback info';
        }
    });
    
    if (window.narrator) {
        window.narrator.speak("सभी सही उत्तर दिखा दिए गए हैं। इन्हें देखकर अपने चुने गए उत्तरों से तुलना करें।");
    }
}

// Show overall feedback
function showOverallFeedback(correct, total) {
    const percentage = Math.round((correct / total) * 100);
    let message = '';
    let className = '';
    
    if (percentage >= 80) {
        message = `उत्कृष्ट! आपने ${correct}/${total} प्रश्नों के सही उत्तर दिए हैं। (${percentage}%)`;
        className = 'feedback-message show success';
    } else if (percentage >= 60) {
        message = `अच्छा प्रयास! आपने ${correct}/${total} प्रश्नों के सही उत्तर दिए हैं। (${percentage}%) कुछ और सुधार की गुंजाइश है।`;
        className = 'feedback-message show warning';
    } else {
        message = `और अभ्यास की आवश्यकता है। आपने ${correct}/${total} प्रश्नों के सही उत्तर दिए हैं। (${percentage}%) सही उत्तर देखकर सुधार करें।`;
        className = 'feedback-message show error';
    }
    
    // Create or update overall feedback element
    let overallFeedback = document.getElementById('overallQuestionFeedback');
    if (!overallFeedback) {
        overallFeedback = document.createElement('div');
        overallFeedback.id = 'overallQuestionFeedback';
        const questionSection = document.getElementById('textQuestions');
        if (questionSection) {
            questionSection.appendChild(overallFeedback);
        }
    }
    
    overallFeedback.textContent = message;
    overallFeedback.className = className;
}

// CSS for MCQ styling
const mcqCSS = `
.question-set-nav {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.question-nav-btn {
    padding: 10px 20px;
    background: #e0e0e0;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;
    font-family: 'Noto Sans Devanagari', sans-serif;
}

.question-nav-btn:hover {
    background: #d0d0d0;
}

.question-nav-btn.active {
    background: #2c3e50;
    color: white;
}

.question-subtitle {
    font-style: italic;
    color: #666;
    margin-bottom: 20px;
    text-align: center;
}

.mcq-options {
    margin: 15px 0;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
}

.mcq-option {
    margin: 8px 0;
    display: flex;
    align-items: center;
}

.mcq-option input[type="radio"] {
    margin-right: 10px;
    transform: scale(1.2);
}

.mcq-option label {
    cursor: pointer;
    font-size: 1rem;
    line-height: 1.4;
    padding: 5px 0;
    width: 100%;
}

.mcq-option label:hover {
    background: rgba(44, 62, 80, 0.1);
    border-radius: 4px;
    padding: 5px;
}

.mcq-option input[type="radio"]:checked + label {
    font-weight: bold;
    color: #2c3e50;
}

.question-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .question-set-nav {
        flex-direction: column;
        align-items: center;
    }
    
    .question-nav-btn {
        width: 100%;
        max-width: 300px;
    }
    
    .question-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .question-actions .interactive-btn {
        width: 100%;
        max-width: 300px;
    }
    
    .mcq-option {
        margin: 10px 0;
    }
    
    .mcq-option label {
        font-size: 0.95rem;
    }
}
`;

// Add MCQ styles to document
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = mcqCSS;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize questions if we're on the questions module
    if (document.getElementById('textQuestions')) {
        initializeQuestions();
    }
});

// Make functions globally available
window.loadQuestionSet = loadQuestionSet;
window.checkAllAnswers = checkAllAnswers;
window.showAllAnswers = showAllAnswers;