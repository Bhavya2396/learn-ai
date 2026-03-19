/**
 * Questions for Bade Bhai Sahab module
 */

// Reflection answers for the prereading module
const reflectionAnswers = {
    best: '3',
    acceptable: ['3', '4']
};

// Feedback for different reflection options
const answerFeedback = {
    '1': 'यह विचार पूर्ण नहीं है। बड़े होने के साथ जिम्मेदारियाँ भी आती हैं।',
    '2': 'यह विचार कहानी के संदेश के विपरीत है। बड़े होने का मतलब सिर्फ आदेश देना नहीं है।',
    '3': 'बहुत अच्छे! आपने सही पहचाना कि बड़े होने के साथ जिम्मेदारियाँ आती हैं, जो व्यक्तित्व विकास में महत्वपूर्ण भूमिका निभाती हैं।',
    '4': 'अच्छा प्रयास! बड़ा होना सिर्फ उम्र से नहीं, बल्कि समझदारी से भी संबंधित है।'
};

// Reading comprehension questions
const textQuestions = [
    // Multiple choice questions
    {
        type: 'multiple-choice',
        question: 'बड़े भाई साहब छोटे भाई से कितने साल बड़े थे?',
        options: ['तीन साल', 'चार साल', 'पाँच साल', 'छः साल'],
        correctAnswer: 2,
        feedback: 'सही उत्तर: पाँच साल। कहानी के शुरुआत में ही बताया गया है कि बड़े भाई साहब छोटे भाई से पाँच साल बड़े थे।'
    },
    {
        type: 'multiple-choice',
        question: 'बड़े भाई साहब कितनी कक्षा में पढ़ते थे?',
        options: ['आठवीं', 'नौवीं', 'दसवीं', 'ग्यारहवीं'],
        correctAnswer: 1,
        feedback: 'सही उत्तर: नौवीं। कहानी में उल्लेख है कि बड़े भाई नौवीं जमात में थे, और छोटा भाई पाँचवीं में।'
    },
    {
        type: 'multiple-choice',
        question: 'पहली बार इम्तिहान के बाद कौन पास हुआ और कौन फेल?',
        options: ['दोनों पास हुए', 'दोनों फेल हो गए', 'बड़े भाई पास हुए, छोटा भाई फेल हो गया', 'छोटा भाई पास हुआ, बड़े भाई फेल हो गए'],
        correctAnswer: 3,
        feedback: 'सही उत्तर: छोटा भाई पास हुआ, बड़े भाई फेल हो गए। इसके बाद बड़े भाई ने छोटे भाई को घमंड न करने का उपदेश दिया।'
    },
    {
        type: 'multiple-choice',
        question: 'छोटे भाई के दृष्टिकोण से एक घंटा भी किताब लेकर बैठना कैसा था?',
        options: ['आनंददायक', 'रोचक', 'सरल', 'पहाड़'],
        correctAnswer: 3,
        feedback: 'सही उत्तर: पहाड़। कहानी में छोटा भाई कहता है कि उसका जी पढ़ने में बिलकुल न लगता था और एक घंटा भी किताब लेकर बैठना पहाड़ था।'
    },
    {
        type: 'multiple-choice',
        question: 'बड़े भाई साहब घमंड के बारे में समझाने के लिए किसका उदाहरण देते हैं?',
        options: ['कृष्ण', 'राम', 'रावण', 'अर्जुन'],
        correctAnswer: 2,
        feedback: 'सही उत्तर: रावण। बड़े भाई साहब ने अपने उपदेश में रावण का उदाहरण देकर बताया कि घमंड का अंत पतन है।'
    },
    
    // Short answer questions
    {
        type: 'short-answer',
        question: 'बड़े भाई साहब की पढ़ाई के संबंध में क्या विशेषता थी?',
        correctAnswer: ['धीमी गति से पढ़ना', 'मज़बूत बुनियाद'],
        model_answer: 'बड़े भाई साहब पढ़ाई को बहुत महत्व देते थे और जल्दबाजी से काम नहीं लेते थे। वे शिक्षा की बुनियाद मज़बूत डालना चाहते थे, इसलिए एक साल का काम दो या कभी-कभी तीन साल में करते थे। उनका मानना था कि बुनियाद पुख्ता न हो तो मकान पायेदार नहीं बनता।',
        feedback: 'बड़े भाई साहब मानते थे कि शिक्षा की मज़बूत बुनियाद डालना महत्वपूर्ण है, इसलिए वे जल्दबाजी से काम नहीं लेते थे।'
    },
    {
        type: 'short-answer',
        question: 'बड़े भाई साहब के अनुसार, किताबी ज्ञान और जीवन के अनुभव में से कौन अधिक महत्वपूर्ण है और क्यों?',
        correctAnswer: ['अनुभव', 'जीवन का अनुभव'],
        model_answer: 'बड़े भाई साहब के अनुसार, किताबी ज्ञान से अधिक महत्वपूर्ण जीवन का अनुभव है। वे कहते हैं, "समझ किताबें पढ़ने से नहीं आती, दुनिया देखने से आती है।" वे उदाहरण देते हैं कि माता-पिता भले ही कम शिक्षित हों, लेकिन उनके अनुभव का महत्व सदैव बना रहता है। बड़े भाई साहब का मानना था कि जीवन के अनुभव से व्यावहारिक ज्ञान मिलता है, जो कितने भी एम.ए., डी. फ़िल. या डी. लिट्. से अधिक मूल्यवान होता है।',
        feedback: 'बड़े भाई साहब के अनुसार, जीवन का अनुभव किताबी ज्ञान से कहीं अधिक महत्वपूर्ण है, क्योंकि वास्तविक समझ दुनिया देखने से आती है।'
    },
    {
        type: 'short-answer',
        question: 'बड़े भाई साहब शिक्षा पद्धति पर क्या व्यंग्य करते हैं?',
        correctAnswer: ['रटंत विद्या', 'अर्थहीन शिक्षा', 'व्यर्थ की लंबाई'],
        model_answer: 'बड़े भाई साहब शिक्षा पद्धति पर कई प्रकार के व्यंग्य करते हैं। वे रटंत विद्या की आलोचना करते हैं और कहते हैं कि परीक्षक चाहते हैं कि छात्र अक्षर-अक्षर रट डालें। वे "समय की पाबंदी" पर चार पन्नों का निबंध लिखने के निर्देश को हिमाकत (बेवकूफ़ी) बताते हैं और कहते हैं कि जो बात एक वाक्य में कही जा सकती है, उसे चार पन्नों में लिखवाना समय का दुरुपयोग है। वे गणित के प्रश्नों में अ ब ज और अजब के अंतर पर अंक काटने को भी निरर्थक मानते हैं। उनके अनुसार, यह शिक्षा पद्धति छात्रों पर अत्याचार है।',
        feedback: 'बड़े भाई साहब शिक्षा पद्धति में रटंत विद्या, व्यर्थ के विस्तार और निरर्थक नियमों पर व्यंग्य करते हैं, जिन्हें वे छात्रों पर अत्याचार मानते हैं।'
    },
    {
        type: 'short-answer',
        question: 'कहानी के अंत में छोटे भाई के मन में बड़े भाई साहब के प्रति श्रद्धा क्यों उत्पन्न हुई?',
        correctAnswer: ['उदाहरण देकर समझाने', 'पतंग उड़ाने', 'स्वयं भी कनकौआ उड़ाना'],
        model_answer: 'कहानी के अंत में जब छोटे भाई को पतंग उड़ाते हुए बड़े भाई साहब ने डाँटा, तब वे युक्तिपूर्ण ढंग से समझा रहे थे कि बड़े होने के नाते उन्हें अनुचित व्यवहार से परहेज़ करना चाहिए। लेकिन जब एक कटी हुई पतंग ऊपर से गुज़री, तो बड़े भाई साहब ने खुद उछलकर उस पतंग को पकड़ लिया और बेतहाशा दौड़ पड़े। इस द्वंद्व और मानवीय कमजोरी के दर्शन से छोटे भाई को अपनी लघुता का अनुभव हुआ और बड़े भाई के प्रति श्रद्धा उत्पन्न हुई। उन्हें समझ में आया कि बड़े भाई साहब भी कनकौए उड़ाना चाहते हैं, लेकिन छोटे भाई की जिम्मेदारी निभाने के लिए स्वयं को रोके रखते हैं।',
        feedback: 'छोटे भाई के मन में श्रद्धा उत्पन्न हुई क्योंकि उन्होंने देखा कि बड़े भाई साहब भी कनकौए के प्रति आकर्षित हैं लेकिन अपनी जिम्मेदारी निभाने के लिए स्वयं को रोकते हैं।'
    },
    {
        type: 'short-answer',
        question: 'कहानी से आपको क्या शिक्षा मिलती है?',
        correctAnswer: ['अनुभव का महत्व', 'जिम्मेदारी का महत्व', 'घमंड नहीं करना'],
        model_answer: 'इस कहानी से कई महत्वपूर्ण शिक्षाएँ मिलती हैं। पहली, जीवन में किताबी ज्ञान से अधिक महत्वपूर्ण अनुभव और व्यावहारिक समझ है। दूसरी, अच्छे परिणाम मिलने पर घमंड नहीं करना चाहिए, क्योंकि सफलता कभी-कभी भाग्य का साथ भी हो सकता है। तीसरी, बड़े होने के साथ जिम्मेदारियाँ आती हैं, जिन्हें निभाने के लिए कभी-कभी अपनी इच्छाओं का दमन करना पड़ता है। चौथी, शिक्षा प्रणाली में सुधार की आवश्यकता है, जहाँ रटंत विद्या के स्थान पर समझ पर ध्यान दिया जाए। कहानी यह भी सिखाती है कि हर व्यक्ति में कमजोरियाँ होती हैं और हम सभी मानवीय हैं।',
        feedback: 'कहानी हमें अनुभव के महत्व, जिम्मेदारी के निर्वाह, विनम्रता और मानवीय कमजोरियों के बारे में सिखाती है।'
    }
];

// Load text questions function
function loadTextQuestions() {
    const container = document.getElementById('textQuestions');
    if (!container) return;
    
    container.innerHTML = '<h3>पाठ के आधार पर प्रश्न</h3>';
    
    // Add multiple choice questions
    const mcQuestions = textQuestions.filter(q => q.type === 'multiple-choice');
    if (mcQuestions.length > 0) {
        const mcSection = document.createElement('div');
        mcSection.className = 'question-section';
        mcSection.innerHTML = '<h4>बहुविकल्पी प्रश्न</h4>';
        
        mcQuestions.forEach((question, index) => {
            const questionId = `mc-${index}`;
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item multiple-choice';
            
            let questionHTML = `
                <div class="question-text">${index + 1}. ${question.question}</div>
                <div class="question-options">
            `;
            
            question.options.forEach((option, optIndex) => {
                questionHTML += `
                    <div class="option">
                        <input type="radio" id="${questionId}-${optIndex}" name="${questionId}" value="${optIndex}" onchange="checkMultipleChoice('${questionId}', ${optIndex})">
                        <label for="${questionId}-${optIndex}">${option}</label>
                    </div>
                `;
            });
            
            questionHTML += `
                </div>
                <div class="feedback" id="${questionId}-feedback"></div>
            `;
            
            questionDiv.innerHTML = questionHTML;
            mcSection.appendChild(questionDiv);
        });
        
        container.appendChild(mcSection);
    }
    
    // Add short answer questions
    const saQuestions = textQuestions.filter(q => q.type === 'short-answer');
    if (saQuestions.length > 0) {
        const saSection = document.createElement('div');
        saSection.className = 'question-section';
        saSection.innerHTML = '<h4>लघु उत्तरीय प्रश्न</h4>';
        
        saQuestions.forEach((question, index) => {
            const questionId = `sa-${index}`;
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item short-answer';
            
            let questionHTML = `
                <div class="question-text">${index + 1}. ${question.question}</div>
                <div class="model-answer">
                    <h5>उत्तर:</h5>
                    <p>${question.model_answer}</p>
                </div>
            `;
            
            questionDiv.innerHTML = questionHTML;
            saSection.appendChild(questionDiv);
        });
        
        container.appendChild(saSection);
    }
}

// Check multiple choice answer
function checkMultipleChoice(questionId, selectedIndex) {
    const questionNumber = parseInt(questionId.split('-')[1]);
    const question = textQuestions.filter(q => q.type === 'multiple-choice')[questionNumber];
    
    const feedbackElement = document.getElementById(`${questionId}-feedback`);
    
    if (selectedIndex === question.correctAnswer) {
        feedbackElement.className = 'feedback success';
        feedbackElement.innerHTML = `<span class="success-icon">✓</span> सही उत्तर! ${question.feedback}`;
        
        // Update progress and show achievement
        updateProgress();
        showAchievement('बहुत बढ़िया! आपने एक प्रश्न सही हल किया।');
        
    } else {
        feedbackElement.className = 'feedback error';
        feedbackElement.innerHTML = `<span class="error-icon">✗</span> गलत उत्तर। ${question.feedback}`;
    }
}

// These functions are no longer needed since we're showing answers directly
// Kept as empty functions to avoid any potential errors if they're called elsewhere
function checkShortAnswer(questionId) {
    // Function removed - answers are now shown directly
    console.log('Short answer check no longer needed - answers are shown directly');
}

function showModelAnswer(questionId) {
    // Function removed - answers are now shown directly
    console.log('Show model answer no longer needed - answers are shown directly');
}

// Evaluate reflection answers
function saveReflection() {
    const selectedOption = document.querySelector('input[name="reflection"]:checked');
    
    if (!selectedOption) {
        alert('कृपया एक विकल्प चुनें।');
        return;
    }
    
    const selectedValue = selectedOption.value;
    const feedbackElement = document.getElementById('reflectionFeedback');
    
    if (selectedValue === reflectionAnswers.best) {
        feedbackElement.className = 'feedback success show';
        feedbackElement.innerHTML = `<span class="success-icon">✓</span> ${answerFeedback[selectedValue]}`;
        
        // Update progress
        updateProgress();
        showAchievement('बहुत बढ़िया! आपने सही प्रतिबिंब दिया है।');
        
    } else if (reflectionAnswers.acceptable.includes(selectedValue)) {
        feedbackElement.className = 'feedback partial show';
        feedbackElement.innerHTML = `<span class="partial-icon">⟳</span> ${answerFeedback[selectedValue]}`;
        
        // Update progress partially
        updateProgress(0.5);
        
    } else {
        feedbackElement.className = 'feedback error show';
        feedbackElement.innerHTML = `<span class="error-icon">✗</span> ${answerFeedback[selectedValue]}`;
    }
    
    // Hide feedback after a few seconds
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 5000);
}

// Initialize when the document loads
document.addEventListener('DOMContentLoaded', function() {
    // Load text questions when thinking-text module is shown
    if (document.getElementById('thinking-text')) {
        loadTextQuestions();
    }
});
