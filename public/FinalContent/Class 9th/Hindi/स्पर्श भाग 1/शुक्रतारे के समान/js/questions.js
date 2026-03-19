/**
 * Questions and interactive exercises for Shukratarey ke Samaan - Multiple Choice Questions
 */

// Questions based on Chapter 5 content - मौखिक प्रश्न (Multiple Choice)
const oralQuestions = [
    {
        id: "q1",
        question: "महादेव भाई अपना परिचय किस रूप में देते थे?",
        type: "mcq",
        options: [
            "गाँधीजी के 'हम्माल' और 'पीर-बावर्ची-भिश्ती-खर' के रूप में",
            "गाँधीजी के 'सचिव' और 'सलाहकार' के रूप में", 
            "गाँधीजी के 'मित्र' और 'सहयोगी' के रूप में",
            "गाँधीजी के 'शिष्य' और 'अनुयायी' के रूप में"
        ],
        correctAnswer: 0,
        explanation: "महादेव भाई विनोद में अपने को गाँधीजी का 'हम्माल' कहते थे और कभी-कभी अपना परिचय उनके 'पीर-बावर्ची-भिश्ती-खर' के रूप में देते थे।"
    },
    {
        id: "q2", 
        question: "'यंग इंडिया' साप्ताहिक में लेखों की कमी क्यों रहने लगी थी?",
        type: "mcq",
        options: [
            "गाँधीजी के पास समय नहीं था",
            "हार्नीमैन को देश निकाला मिलने के बाद",
            "कागज़ की कमी के कारण",
            "सरकारी पाबंदियों के कारण"
        ],
        correctAnswer: 1,
        explanation: "हार्नीमैन को देश निकाला मिलने के बाद 'यंग इंडिया' के लिए लिखने वालों की कमी हो गई थी।"
    },
    {
        id: "q3",
        question: "गाँधीजी ने 'यंग इंडिया' प्रकाशित करने के विषय में क्या निश्चय किया?",
        type: "mcq", 
        options: [
            "इसे बंद करने का निश्चय किया",
            "इसे मासिक बनाने का निश्चय किया",
            "इसे हफ्ते में दो बार प्रकाशित करने का निश्चय किया",
            "इसे दैनिक बनाने का निश्चय किया"
        ],
        correctAnswer: 2,
        explanation: "गाँधीजी ने 'यंग इंडिया' को हफ्ते में दो बार प्रकाशित करने का निश्चय किया।"
    },
    {
        id: "q4",
        question: "गाँधीजी से मिलने से पहले महादेव भाई कहाँ नौकरी करते थे?",
        type: "mcq",
        options: [
            "न्यायालय में वकील के रूप में",
            "सरकार के अनुवाद-विभाग में",
            "किसी अखबार में संपादक के रूप में",
            "कॉलेज में अध्यापक के रूप में"
        ],
        correctAnswer: 1,
        explanation: "गाँधीजी से मिलने से पहले विद्यार्थी अवस्था में महादेव भाई सरकार के अनुवाद-विभाग में नौकरी करते थे।"
    },
    {
        id: "q5",
        question: "महादेव भाई के झोलों में क्या भरा रहता था?",
        type: "mcq",
        options: [
            "कपड़े और व्यक्तिगत सामान",
            "ताजे-से-ताजे समाचार-पत्र, मासिक-पत्र और पुस्तकें",
            "खाना और पानी",
            "दवाइयाँ और चिकित्सा सामग्री"
        ],
        correctAnswer: 1,
        explanation: "महादेव भाई के बड़े-बड़े झोलों में ताजे-से-ताजे समाचार-पत्र, मासिक-पत्र और पुस्तकें भरी रहती थीं।"
    }
];

// लिखित प्रश्न - Multiple Choice
const writtenQuestionsShort = [
    {
        id: "w1",
        question: "गाँधीजी ने महादेव को अपना वारिस कब कहा था?",
        type: "mcq",
        options: [
            "सन् 1917 में जब वे पहली बार मिले थे",
            "सन् 1919 में जलियाँवाला बाग के हत्याकांड के दिनों में पलवल स्टेशन पर",
            "सन् 1920 में खिलाफत आंदोलन के दौरान",
            "सन् 1929 में जब वे देश के दुलारे बन गए"
        ],
        correctAnswer: 1,
        explanation: "सन् 1919 में जलियाँवाला बाग के हत्याकांड के दिनों में पंजाब जाते हुए गाँधीजी को पलवल स्टेशन पर गिरफ्तार किया गया था। उसी समय गाँधीजी ने महादेव भाई को अपना वारिस कहा था।"
    },
    {
        id: "w2", 
        question: "गाँधीजी से मिलने आनेवालों के लिए महादेव भाई क्या करते थे?",
        type: "mcq",
        options: [
            "उनके लिए खाना और आवास की व्यवस्था करते थे",
            "उनकी बातों की संक्षिप्त टिप्पणियाँ तैयार करके गाँधीजी के सामने पेश करते थे",
            "उनके लिए गाँधीजी से मिलने का समय तय करते थे",
            "उनसे उनकि समस्याओं का समाधान करते थे"
        ],
        correctAnswer: 1,
        explanation: "महादेव भाई पीड़ितों की बातों की संक्षिप्त टिप्पणियाँ तैयार करके उनको गाँधीजी के सामने पेश करते थे और आनेवालों के साथ उनकी रू-ब-रू मुलाकातें भी करवाते थे।"
    },
    {
        id: "w3",
        question: "महादेव भाई की मुख्य साहित्यिक देन क्या थी?",
        type: "mcq", 
        options: [
            "उन्होंने अपनी आत्मकथा लिखी",
            "उन्होंने गाँधीजी की आत्मकथा 'सत्य के प्रयोग' का अंग्रेजी अनुवाद किया",
            "उन्होंने महादेव भाई की जीवनी लिखी",
            "उन्होंने कई नाटक लिखे"
        ],
        correctAnswer: 1,
        explanation: "महादेव भाई ने टैगोर और शरदचंद्र के साहित्य का अनुवाद किया। उनकी मुख्य देन गाँधीजी की आत्मकथा 'सत्य के प्रयोग' का अंग्रेजी अनुवाद था।"
    },
    {
        id: "w4",
        question: "महादेव भाई की अकाल मृत्यु का मुख्य कारण क्या माना जाता है?",
        type: "mcq",
        options: [
            "गंभीर बीमारी",
            "वर्धा की असह्य गर्मी में रोज 11 मील पैदल चलना और अधिक कामकाज",
            "दुर्घटना में चोट",
            "बुढ़ापे के कारण"
        ],
        correctAnswer: 1,
        explanation: "वर्धा की असह्य गर्मी में रोज सुबह पैदल चलकर सेवाग्राम पहुँचना, वहाँ दिनभर काम करके शाम को वापस पैदल आना (कुल 11 मील) और निरंतर अधिक काम का बोझ महादेव भाई की अकाल मृत्यु का कारण माना जाता है।"
    }
];

// लिखित प्रश्न (विस्तृत) - Multiple Choice
const writtenQuestionsLong = [
    {
        id: "l1",
        question: "पंजाब में फ़ौजी शासन के कारण क्या हुआ?",
        type: "mcq",
        options: [
            "सिर्फ कालिनाथ राय को 5 साल की सजा हुई",
            "अधिकतर नेताओं को गिरफ्तार करके कालापानी भेज दिया गया और 'ट्रिब्यून' के संपादक को 10 साल की सजा मिली",
            "सभी अखबारों को बंद कर दिया गया",
            "सिर्फ गाँधीजी को गिरफ्तार किया गया"
        ],
        correctAnswer: 1,
        explanation: "पंजाब में फ़ौजी कानून के कारण अधिकतर नेताओं को गिरफ्तार करके फ़ौजी कानून के तहत जन्म-कैद की सजाएँ देकर कालापानी भेज दिया गया। लाहौर के 'ट्रिब्यून' के संपादक कालिनाथ राय को 10 साल की जेल की सजा मिली।"
    },
    {
        id: "l2",
        question: "महादेव जी के कोन से गुण उन्हें सबका लाड़ला बनाते थे?",
        type: "mcq", 
        options: [
            "उनकी गुजराती भाषा का ज्ञान और बुद्धिमानी",
            "उनकी सत्यनिष्ठा, विनय-विवेक और कट्टर विरोधियों के साथ भी शिष्टाचार",
            "उनकी आर्थिक स्थिति और पारिवारिक पृष्ठभूमि",
            "उनकी पत्रकारिता की प्रसिद्धि और लेखन शैली"
        ],
        correctAnswer: 1,
        explanation: "महादेव जी की सत्यनिष्ठा, विनय-विवेक, उच्च चरित्र, कट्टर विरोधियों के साथ भी शिष्टाचार और गाँधीजी की तालीम के अनुसार व्यवहार करने के गुणों ने उन्हें देश-विदेश के सारे समाचार-पत्रों की दुनिया में सबका लाड़ला बना दिया था।"
    },
    {
        id: "l3",
        question: "महादेव जी की लेखन शैली की मुख्य विशेषता क्या थी?",
        type: "mcq",
        options: [
            "उनकी लिखावट में कैदी जीवन के अनुभव झलकते थे",
            "उनकी लिखावट में प्रथम श्रेणी की शिष्ट, संस्कार-संपन्न भाषा और मनोहारी लेखनशैली थी",
            "वे हमेशा अंग्रेजी में लिखते थे",
            "उनकी लिखावट बहुत कठिन और जटिल थी"
        ],
        correctAnswer: 1,
        explanation: "महादेव जी की लिखावट में प्रथम श्रेणी की शिष्ट, संस्कार-संपन्न भाषा और मनोहारी लेखनशैली की ईश्वरीय देन थी। उनकी लिखावट इतनी सुंदर थी कि गाँधीजी के पत्र हमेशा महादेव की लिखावट में ही जाते थे।"
    }
];

// आशय स्पष्टीकरण प्रश्न - Multiple Choice
const meaningQuestions = [
    {
        id: "m1",
        question: "'अपना परिचय उनके 'पीर-बावर्ची-भिश्ती-खर' के रूप में देने में वे गौरवान्वित महसूस करते थे।' - इस वाक्य का आशय क्या है?",
        type: "mcq",
        options: [
            "महादेव भाई को अपने नाम-पद पर गर्व था",
            "महादेव भाई गाँधीजी के लिए सभी प्रकार के काम गर्व से करते थे",
            "महादेव भाई को अपनी बहुमुखी प्रतिभा पर गर्व था",
            "महादेव भाई को गाँधीजी के साथ काम करने पर गर्व था"
        ],
        correctAnswer: 1,
        explanation: "महादेव भाई गाँधीजी के लिए सभी प्रकार के काम करते थे - चाहे वह आध्यात्मिक गुरु (पीर) का काम हो, रसोइया (बावर्ची) का हो, पानी भरने वाले (भिश्ती) का हो या बोझ ढोने वाले (खर) का। वे इन सभी कामों को गर्व से करते थे।"
    },
    {
        id: "m2", 
        question: "'इस पेशा में आमतौर पर स्वार्थ को सफेद और सफेद को स्वार्थ करना होता था।' - यहाँ 'पेशा' किसका संकेत है?",
        type: "mcq",
        options: [
            "पत्रकारिता का पेशा",
            "वकालत का पेशा",
            "अध्यापन का पेशा",
            "राजनीति का पेशा"
        ],
        correctAnswer: 1,
        explanation: "यहाँ वकालत के पेशे की बात हो रही है। वकालत के पेशे में अक्सर गलत को सही और सही को गलत साबित करना पड़ता है। यहाँ न्याय की अपेक्षा स्वार्थ की पूर्ति मुख्य होती है।"
    },
    {
        id: "m3",
        question: "'देश और दुनिया को मुग्ध करके शुक्रतारे की तरह ही अचानक अस्त हो गए।' - इस वाक्य में लेखक का आशय क्या है?",
        type: "mcq",
        options: [
            "महादेव भाई ने अपनी शिक्षा को छोड़कर राजनीति में प्रवेश किया",
            "महादेव भाई की मृत्यु उनकी बीमारी के कारण हुई",
            "शुक्रतारे की तरह महादेव भाई ने अपनी प्रतिभा से सबको मुग्ध किया और फिर अचानक मृत्यु हो गई",
            "महादेव भाई ने विदेश जाकर वहाँ काम करना शुरू किया"
        ],
        correctAnswer: 2,
        explanation: "लेखक का आशय यह है कि जैसे शुक्रतारा अपनी चमक से सबको मोहित करके अचानक अदृश्य हो जाता है, उसी तरह महादेव भाई ने अपनी अद्भुत प्रतिभा और काम से सबको मुग्ध किया और फिर अचानक मृत्यु को प्राप्त हो गए।"
    }
];

// Load questions into the DOM
function loadQuestions() {
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) {
        console.error('Questions container not found');
        return;
    }
    
    let questionsHTML = '';
    
    // Oral Questions Section
    questionsHTML += `
        <div class="question-set">
            <h3 class="question-section-title">मौखिक</h3>
            <p><strong>निम्नलिखित प्रश्नों के उत्तर एक-दो पंक्तियों में दीजिए-</strong></p>
            ${oralQuestions.map(q => createQuestionHTML(q)).join('')}
        </div>
    `;
    
    // Written Questions Short Section  
    questionsHTML += `
        <div class="question-set">
            <h3 class="question-section-title">लिखित</h3>
            <p><strong>(क) निम्नलिखित प्रश्नों के उत्तर (25-30) शब्दों में लिखिए-</strong></p>
            ${writtenQuestionsShort.map(q => createQuestionHTML(q)).join('')}
        </div>
    `;
    
    // Written Questions Long Section
    questionsHTML += `
        <div class="question-set">
            <p><strong>(ख) निम्नलिखित प्रश्नों के उत्तर (50-60 शब्दों में) लिखिए-</strong></p>
            ${writtenQuestionsLong.map(q => createQuestionHTML(q)).join('')}
        </div>
    `;
    
    // Meaning Questions Section
    questionsHTML += `
        <div class="question-set">
            <p><strong>(ग) निम्नलिखित का आशय स्पष्ट कीजिए-</strong></p>
            ${meaningQuestions.map(q => createMeaningQuestionHTML(q)).join('')}
        </div>
    `;
    
    questionsContainer.innerHTML = questionsHTML;
    
    console.log('Questions loaded successfully');
}

// Create HTML for regular questions (Multiple Choice)
function createQuestionHTML(question) {
    if (question.type === 'mcq') {
        const optionsHTML = question.options.map((option, index) => `
            <div class="mcq-option">
                <input type="radio" 
                       id="option_${question.id}_${index}" 
                       name="question_${question.id}" 
                       value="${index}">
                <label for="option_${question.id}_${index}">${option}</label>
            </div>
        `).join('');
        
        return `
            <div class="question-item" data-question-id="${question.id}">
                <div class="question-text">${question.question}</div>
                <div class="mcq-options">
                    ${optionsHTML}
                </div>
                <button class="interactive-btn" onclick="checkMCQAnswer('${question.id}')">
                    उत्तर जाँचें
                </button>
                <div class="question-feedback" id="feedback_${question.id}"></div>
                <div class="sample-answer" id="explanation_${question.id}" style="display: none;">
                    <strong>व्याख्या:</strong> ${question.explanation}
                </div>
            </div>
        `;
    }
    
    return '';
}

// Create HTML for meaning questions (Multiple Choice)
function createMeaningQuestionHTML(question) {
    if (question.type === 'mcq') {
        const optionsHTML = question.options.map((option, index) => `
            <div class="mcq-option">
                <input type="radio" 
                       id="option_${question.id}_${index}" 
                       name="question_${question.id}" 
                       value="${index}">
                <label for="option_${question.id}_${index}">${option}</label>
            </div>
        `).join('');
        
        return `
            <div class="question-item" data-question-id="${question.id}">
                <div class="question-text">${question.question}</div>
                <div class="mcq-options">
                    ${optionsHTML}
                </div>
                <button class="interactive-btn" onclick="checkMCQAnswer('${question.id}')">
                    उत्तर जाँचें
                </button>
                <div class="question-feedback" id="feedback_${question.id}"></div>
                <div class="sample-answer" id="explanation_${question.id}" style="display: none;">
                    <strong>व्याख्या:</strong> ${question.explanation}
                </div>
            </div>
        `;
    }
    
    return '';
}

// Check MCQ answer
function checkMCQAnswer(questionId) {
    const selectedRadio = document.querySelector(`input[name="question_${questionId}"]:checked`);
    const feedbackDiv = document.getElementById(`feedback_${questionId}`);
    const explanationDiv = document.getElementById(`explanation_${questionId}`);
    
    if (!feedbackDiv) {
        console.error('Feedback element not found for question:', questionId);
        return;
    }
    
    if (!selectedRadio) {
        feedbackDiv.textContent = 'कृपया कोई विकल्प चुनें।';
        feedbackDiv.className = 'question-feedback warning';
        return;
    }
    
    // Find the question in all arrays
    const question = [...oralQuestions, ...writtenQuestionsShort, ...writtenQuestionsLong, ...meaningQuestions]
        .find(q => q.id === questionId);
    
    if (!question) {
        console.error('Question not found:', questionId);
        return;
    }
    
    const selectedAnswer = parseInt(selectedRadio.value);
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
        feedbackDiv.textContent = '✅ सही उत्तर! बहुत बढ़िया!';
        feedbackDiv.className = 'question-feedback correct';
        
        // Update score
        updateScoreForAnswer();
        
        // Show explanation
        if (explanationDiv) {
            explanationDiv.style.display = 'block';
        }
        
        // Turn selected option green for correct answer
        selectedRadio.parentElement.classList.add('mcq-option-correct');
        
        // Disable radio buttons after correct answer
        document.querySelectorAll(`input[name="question_${questionId}"]`).forEach(radio => {
            radio.disabled = true;
        });
        
    } else {
        feedbackDiv.textContent = '❌ गलत उत्तर। कृपया दोबारा प्रयास करें।';
        feedbackDiv.className = 'question-feedback incorrect';
        
        // Turn selected option red for incorrect answer
        selectedRadio.parentElement.classList.add('mcq-option-incorrect');
    }
}

// Update score for answered questions
function updateScoreForAnswer() {
    if (typeof score !== 'undefined' && typeof updateProgress === 'function') {
        score += 5;
        document.getElementById('totalScore').textContent = score;
        
        // Check if all questions module should be marked complete
        const answeredQuestions = document.querySelectorAll('.question-feedback.correct').length;
        if (answeredQuestions >= 5 && !modulesCompleted.includes('thinking-text')) {
            modulesCompleted.push('thinking-text');
            updateProgress();
            showAchievement('प्रश्न अभ्यास पूर्ण!');
        }
    }
}

// Initialize questions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('textQuestions')) {
        loadQuestions();
    }
});
