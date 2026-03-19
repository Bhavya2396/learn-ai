/**
 * Questions for Bharat Ka Samvidhan module
 */

// Reflection answers for the prereading module
const reflectionAnswers = {
    best: '4',
    acceptable: ['4', '1', '2', '3']
};

// Feedback for different reflection options
const answerFeedback = {
    '1': '✓ अच्छा प्रयास! न्याय निश्चित रूप से महत्वपूर्ण है। यह उत्तर अच्छा है, लेकिन संविधान के सभी मूल्यों के बारे में सोचें।',
    '2': '✓ अच्छा प्रयास! स्वतंत्रता निश्चित रूप से महत्वपूर्ण है। यह उत्तर अच्छा है, लेकिन संविधान के सभी मूल्यों के बारे में सोचें।',
    '3': '✓✓ बहुत अच्छा! समता निश्चित रूप से महत्वपूर्ण है और यह अन्य मूल्यों का आधार है। यह उत्तर बेहतर है!',
    '4': '✓✓✓ उत्कृष्ट! आपने सही पहचाना कि सभी मूल्य समान रूप से महत्वपूर्ण हैं और एक-दूसरे के पूरक हैं। यह सर्वोत्तम उत्तर है!'
};

// Reading comprehension questions
const textQuestions = [
    // Multiple choice questions
    {
        type: 'multiple-choice',
        question: 'भारत को किस प्रकार का गणराज्य घोषित किया गया है?',
        options: ['संपूर्ण प्रभुत्व-संपन्न', 'समाजवादी', 'पंथनिरपेक्ष', 'उपरोक्त सभी'],
        correctAnswer: 3,
        feedback: 'सही उत्तर: उपरोक्त सभी। भारत को संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य घोषित किया गया है।'
    },
    {
        type: 'multiple-choice',
        question: 'संविधान की उद्देशिका में कितने प्रकार के न्याय का उल्लेख है?',
        options: ['एक', 'दो', 'तीन', 'चार'],
        correctAnswer: 2,
        feedback: 'सही उत्तर: तीन। उद्देशिका में सामाजिक, आर्थिक और राजनीतिक - तीन प्रकार के न्याय का उल्लेख है।'
    },
    {
        type: 'multiple-choice',
        question: 'भारत के संविधान को कब अंगीकृत किया गया?',
        options: ['26 जनवरी 1949', '26 नवंबर 1949', '26 जनवरी 1950', '15 अगस्त 1947'],
        correctAnswer: 1,
        feedback: 'सही उत्तर: 26 नवंबर 1949। इसे 26 जनवरी 1950 को लागू किया गया।'
    },
    {
        type: 'multiple-choice',
        question: '"समाजवादी" और "पंथनिरपेक्ष" शब्द किस संशोधन द्वारा जोड़े गए?',
        options: ['41वाँ', '42वाँ', '43वाँ', '44वाँ'],
        correctAnswer: 1,
        feedback: 'सही उत्तर: 42वाँ संशोधन। यह संशोधन 1976 में किया गया था।'
    },
    {
        type: 'multiple-choice',
        question: 'संविधान की उद्देशिका का सबसे महत्वपूर्ण शब्द क्या है?',
        options: ['"हम, भारत के लोग"', '"संपूर्ण प्रभुत्व-संपन्न"', '"लोकतंत्रात्मक गणराज्य"', '"न्याय, स्वतंत्रता, समता"'],
        correctAnswer: 0,
        feedback: 'सही उत्तर: "हम, भारत के लोग"। यह स्पष्ट करता है कि संविधान की शक्ति जनता में निहित है।'
    },
    
    // Short answer questions
    {
        type: 'short-answer',
        question: 'संविधान की उद्देशिका क्या है और इसका क्या महत्व है?',
        correctAnswer: ['उद्देश्य', 'आत्मा', 'मूल सिद्धांत'],
        model_answer: 'संविधान की उद्देशिका भारतीय संविधान का परिचयात्मक वक्तव्य है जो संविधान के उद्देश्य और दर्शन को स्पष्ट करता है। यह संविधान की आत्मा है और इसमें भारत के आदर्शों और मूल्यों का सार प्रस्तुत किया गया है। सर्वोच्च न्यायालय ने कहा है कि संविधान के किसी भी प्रावधान की व्याख्या उद्देशिका में निहित मूल्यों के अनुसार की जानी चाहिए।',
        feedback: 'उद्देशिका संविधान की आत्मा है और इसमें भारत के मूल आदर्शों और मूल्यों को प्रस्तुत किया गया है।'
    },
    {
        type: 'short-answer',
        question: 'संविधान की उद्देशिका में उल्लेखित चार प्रमुख मूल्य कौन से हैं?',
        correctAnswer: ['न्याय', 'स्वतंत्रता', 'समता', 'बंधुता'],
        model_answer: 'संविधान की उद्देशिका में चार प्रमुख मूल्य हैं: (1) न्याय - सामाजिक, आर्थिक और राजनीतिक न्याय; (2) स्वतंत्रता - विचार, अभिव्यक्ति, विश्वास, धर्म और उपासना की स्वतंत्रता; (3) समता - प्रतिष्ठा और अवसर की समानता; और (4) बंधुता - व्यक्ति की गरिमा और राष्ट्र की एकता और अखंडता को बढ़ाने वाली भाईचारे की भावना।',
        feedback: 'उद्देशिका में न्याय, स्वतंत्रता, समता और बंधुता - चार प्रमुख मूल्यों का उल्लेख है।'
    },
    {
        type: 'short-answer',
        question: '"पंथनिरपेक्ष" शब्द का क्या अर्थ है?',
        correctAnswer: ['धर्मनिरपेक्ष', 'सभी धर्मों के प्रति समान'],
        model_answer: 'पंथनिरपेक्ष या धर्मनिरपेक्ष का अर्थ है कि भारत में कोई राजकीय धर्म नहीं है। राज्य सभी धर्मों के प्रति समान आदर रखता है और किसी भी धर्म को विशेष संरक्षण या प्राथमिकता नहीं देता। सभी नागरिकों को अपनी इच्छा के किसी भी धर्म को मानने, आचरण करने और प्रचार करने की स्वतंत्रता है।',
        feedback: 'पंथनिरपेक्ष का अर्थ है कि राज्य का कोई धर्म नहीं है और सभी धर्मों के प्रति समान आदर है।'
    },
    {
        type: 'short-answer',
        question: '"बंधुता" से क्या तात्पर्य है और यह क्यों महत्वपूर्ण है?',
        correctAnswer: ['भाईचारा', 'एकता', 'गरिमा'],
        model_answer: 'बंधुता का अर्थ है भाईचारा या भ्रातृत्व की भावना। यह व्यक्ति की गरिमा और राष्ट्र की एकता और अखंडता को सुनिश्चित करती है। बंधुता की भावना से सभी भारतवासी एक-दूसरे को एक परिवार के सदस्य के रूप में देखते हैं। यह विविधता में एकता को बढ़ावा देती है और राष्ट्रीय एकीकरण में महत्वपूर्ण भूमिका निभाती है। बंधुता के बिना न्याय, स्वतंत्रता और समता का वास्तविक अर्थ अधूरा रहता है।',
        feedback: 'बंधुता भाईचारे की भावना है जो व्यक्ति की गरिमा और राष्ट्र की एकता को सुनिश्चित करती है।'
    },
    {
        type: 'short-answer',
        question: '"हम, भारत के लोग" वाक्यांश का क्या महत्व है?',
        correctAnswer: ['जनता की शक्ति', 'लोकतंत्र', 'जनसंप्रभुता'],
        model_answer: '"हम, भारत के लोग" वाक्यांश यह स्पष्ट करता है कि संविधान की शक्ति और स्रोत भारत की जनता है। यह जनसंप्रभुता के सिद्धांत को दर्शाता है - अर्थात शासन की अंतिम शक्ति जनता में निहित है। यह वाक्यांश इस बात का प्रतीक है कि भारत के लोगों ने स्वयं अपने लिए यह संविधान बनाया है और इसे स्वीकार किया है। यह भारतीय लोकतंत्र की नींव है।',
        feedback: 'यह वाक्यांश दर्शाता है कि संविधान की शक्ति जनता में निहित है और जनता ने स्वयं इसे बनाया है।'
    },
    {
        type: 'short-answer',
        question: 'भारत के संविधान निर्माण में डॉ. बी. आर. अंबेडकर की क्या भूमिका थी?',
        correctAnswer: ['मुख्य वास्तुकार', 'प्रारूप समिति अध्यक्ष'],
        model_answer: 'डॉ. बी. आर. अंबेडकर को भारतीय संविधान का मुख्य वास्तुकार माना जाता है। वे संविधान प्रारूप समिति के अध्यक्ष थे। उनके नेतृत्व में संविधान सभा ने 2 वर्ष 11 माह 18 दिन में संविधान का निर्माण किया। डॉ. अंबेडकर ने संविधान में सामाजिक न्याय, समानता और मौलिक अधिकारों पर विशेष जोर दिया। उनका योगदान भारतीय लोकतंत्र की नींव रखने में अत्यंत महत्वपूर्ण है।',
        feedback: 'डॉ. अंबेडकर भारतीय संविधान के मुख्य वास्तुकार थे और संविधान प्रारूप समिति के अध्यक्ष थे।'
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

// Save reflection answer
function saveReflection() {
    const selected = document.querySelector('input[name="reflection"]:checked');
    if (!selected) {
        alert('कृपया एक विकल्प चुनें।');
        return;
    }
    
    const feedbackElement = document.getElementById('reflectionFeedback');
    const selectedValue = selected.value;
    
    // Set feedback text
    feedbackElement.innerHTML = answerFeedback[selectedValue];
    
    // Style feedback based on answer quality
    let feedbackClass = 'feedback-message show';
    if (selectedValue === reflectionAnswers.best) {
        feedbackClass += ' best'; // Best answer
        feedbackElement.style.backgroundColor = '#d4edda';
        feedbackElement.style.color = '#155724';
        feedbackElement.style.borderColor = '#c3e6cb';
    } else if (selectedValue === '3') {
        feedbackClass += ' better'; // Better answer
        feedbackElement.style.backgroundColor = '#d1ecf1';
        feedbackElement.style.color = '#0c5460';
        feedbackElement.style.borderColor = '#bee5eb';
    } else {
        feedbackClass += ' good'; // Good answer
        feedbackElement.style.backgroundColor = '#fff3cd';
        feedbackElement.style.color = '#856404';
        feedbackElement.style.borderColor = '#ffeeba';
    }
    
    feedbackElement.className = feedbackClass;
    
    // Narrate the feedback if narrator is available
    if (window.narrator && window.narrator.speak) {
        window.narrator.speak(feedbackElement.textContent);
    }
    
    // Update progress
    if (reflectionAnswers.acceptable.includes(selectedValue)) {
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('चिंतन सहेजा गया!');
        }
    }
    
    // Hide feedback after a longer time to allow reading
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 8000);
}

// Initialize questions on page load
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        // Check if questions module exists
        const questionsContainer = document.getElementById('textQuestions');
        if (questionsContainer) {
            loadTextQuestions();
        }
    });
}

