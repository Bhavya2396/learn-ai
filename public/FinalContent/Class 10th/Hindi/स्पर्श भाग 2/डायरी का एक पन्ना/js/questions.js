/**
 * Questions and answers for Diary Ka Ek Panna
 */

// Author introduction questions
const authorIntroQuestions = [
    {
        id: 'author-name',
        question: 'लेखक का नाम क्या है?',
        options: [
            'सीताराम सेकसरिया',
            'रामचंद्र शुक्ल',
            'महात्मा गांधी',
            'जवाहरलाल नेहरू'
        ],
        correct: 0,
        explanation: 'लेखक का नाम सीताराम सेकसरिया है।'
    },
    {
        id: 'author-birth',
        question: 'लेखक का जन्म कब हुआ था?',
        options: [
            '1890',
            '1892',
            '1895',
            '1900'
        ],
        correct: 1,
        explanation: 'लेखक का जन्म 1892 में हुआ था।'
    },
    {
        id: 'author-place',
        question: 'लेखक का जन्म स्थान कहां है?',
        options: [
            'दिल्ली',
            'मुंबई',
            'नवलगढ़, राजस्थान',
            'कोलकाता'
        ],
        correct: 2,
        explanation: 'लेखक का जन्म नवलगढ़, राजस्थान में हुआ था।'
    }
];

// Text introduction questions
const textIntroQuestions = [
    {
        id: 'text-date',
        question: 'डायरी का यह पन्ना किस तारीख का है?',
        options: [
            '26 जनवरी 1930',
            '26 जनवरी 1931',
            '15 अगस्त 1947',
            '26 जनवरी 1950'
        ],
        correct: 1,
        explanation: 'डायरी का यह पन्ना 26 जनवरी 1931 का है।'
    },
    {
        id: 'text-significance',
        question: '26 जनवरी 1931 का क्या महत्व है?',
        options: [
            'भारत की आजादी का दिन',
            'स्वतंत्रता दिवस मनाया जाने वाला दिन',
            'गणतंत्र दिवस',
            'गांधी जयंती'
        ],
        correct: 1,
        explanation: '26 जनवरी 1931 को स्वतंत्रता दिवस मनाया जा रहा था।'
    },
    {
        id: 'text-mood',
        question: 'लेखक का मनोभाव कैसा है?',
        options: [
            'उदास',
            'उत्साहित और गर्वित',
            'चिंतित',
            'निराश'
        ],
        correct: 1,
        explanation: 'लेखक उत्साहित और गर्वित है क्योंकि वह स्वतंत्रता दिवस मना रहा है।'
    }
];

// Oral questions from textbook (मौखिक प्रश्न)
const oralQuestions = [
    {
        id: 'oral-1',
        question: 'कलकत्ता वासियों के लिए 26 जनवरी 1931 का दिन क्यों महत्त्वपूर्ण था?',
        options: [
            'क्योंकि यह स्वतंत्रता दिवस था',
            'क्योंकि यह गणतंत्र दिवस था',
            'क्योंकि यह गांधी जयंती थी',
            'क्योंकि यह होली का दिन था'
        ],
        correct: 0,
        explanation: '26 जनवरी 1931 को स्वतंत्रता दिवस मनाया जा रहा था, इसलिए यह दिन कलकत्ता वासियों के लिए महत्वपूर्ण था।'
    },
    {
        id: 'oral-2',
        question: 'सुभाष बाबू के जुलूस का भार किस पर था?',
        options: [
            'अविनाश बाबू पर',
            'पूर्णोदास पर',
            'हरिश्चंद्र सिंह पर',
            'विमल प्रतिभा पर'
        ],
        correct: 1,
        explanation: 'सुभाष बाबू के जुलूस का भार पूर्णोदास पर था।'
    },
    {
        id: 'oral-3',
        question: 'विद्यार्थी संघ के मंत्री अविनाश बाबू के झंडा गाड़ने पर क्या प्रतिक्रिया हुई?',
        options: [
            'लोगों ने ताली बजाई',
            'पुलिस ने उनको पकड़ लिया और दूसरे लोगों को मारा',
            'सभी ने मिलकर राष्ट्रीय गान गाया',
            'कोई प्रतिक्रिया नहीं हुई'
        ],
        correct: 1,
        explanation: 'अविनाश बाबू के झंडा गाड़ने पर पुलिस ने उनको पकड़ लिया और दूसरे लोगों को मारा या हटा दिया।'
    },
    {
        id: 'oral-4',
        question: 'लोग अपने-अपने मकानों व सार्वजनिक स्थलों पर राष्ट्रीय झंडा फहराकर किस बात का देना चाहते थे?',
        options: [
            'अपनी समृद्धि का',
            'अपनी स्वतंत्रता की भावना और देशभक्ति का',
            'अपनी शिक्षा का',
            'अपनी संस्कृति का'
        ],
        correct: 1,
        explanation: 'लोग राष्ट्रीय झंडा फहराकर अपनी स्वतंत्रता की भावना और देशभक्ति का प्रदर्शन करना चाहते थे।'
    },
    {
        id: 'oral-5',
        question: 'पुलिस ने बड़े-बड़े पार्कों तथा मैदानों को क्यों घेर लिया था?',
        options: [
            'स्वतंत्रता दिवस मनाने के लिए',
            'सभा रोकने और लोगों को नियंत्रित करने के लिए',
            'सुरक्षा के लिए',
            'किसी कार्यक्रम के लिए'
        ],
        correct: 1,
        explanation: 'पुलिस ने बड़े-बड़े पार्कों और मैदानों को सभा रोकने और लोगों को नियंत्रित करने के लिए घेर लिया था।'
    }
];

// Written questions from textbook (लिखित प्रश्न - 25-30 शब्दों में)
const writtenQuestionsShort = [
    {
        id: 'written-short-1',
        question: "'आज जो बात थी वह निराली थी'- किस बात से पता चल रहा था कि आज का दिन अपने आप में निराला है? स्पष्ट कीजिए।",
        options: [
            'क्योंकि पहली बार इतनी बड़ी सभा हुई थी',
            'क्योंकि यह ओपन लड़ाई थी और कानून भंग का काम था',
            'क्योंकि बहुत सारे लोग आए थे',
            'क्योंकि यह स्वतंत्रता दिवस था'
        ],
        correct: 1,
        explanation: 'आज का दिन निराला था क्योंकि जब से कानून भंग का काम शुरू हुआ है तब से आज तक इतनी बड़ी सभा ऐसे मैदान में नहीं की गई थी और यह सभा तो कहना चाहिए कि ओपन लड़ाई थी।'
    },
    {
        id: 'written-short-2',
        question: '26 जनवरी 1931 के दिन को अमर बनाने के लिए क्या-क्या तैयारियाँ की गईं?',
        options: [
            'केवल झंडे लगाए गए',
            'प्रचार में दो हज़ार रुपया खर्च, कार्यकर्ताओं को समझाना, झंडे लगाना, सजावट करना',
            'केवल सभा की तैयारी',
            'केवल जुलूस की तैयारी'
        ],
        correct: 1,
        explanation: '26 जनवरी 1931 के दिन को अमर बनाने के लिए प्रचार में दो हज़ार रुपया खर्च किया गया, कार्यकर्ताओं के घर जा-जाकर समझाया गया, झंडे लगाए गए और सजावट की गई।'
    },
    {
        id: 'written-short-3',
        question: 'पुलिस कमिश्नर के नोटिस और कौंसिल के नोटिस में क्या अंतर था?',
        options: [
            'दोनों एक जैसे थे',
            'पुलिस कमिश्नर ने सभा रोकने का नोटिस दिया, कौंसिल ने सभा करने का नोटिस दिया',
            'कोई अंतर नहीं था',
            'दोनों ने सभा करने का नोटिस दिया'
        ],
        correct: 1,
        explanation: 'पुलिस कमिश्नर ने सभा रोकने का नोटिस दिया था जबकि कौंसिल ने सभा करने और झंडा फहराने का नोटिस दिया था।'
    },
    {
        id: 'written-short-4',
        question: 'धर्मतल्ले के मोड़ पर आकर जुलूस क्यों टूट गया?',
        options: [
            'लोग थक गए थे',
            'पुलिस के डंडे चलाने और मारपीट के कारण',
            'समय समाप्त हो गया था',
            'बारिश होने लगी थी'
        ],
        correct: 1,
        explanation: 'धर्मतल्ले के मोड़ पर आकर जुलूस पुलिस के डंडे चलाने और मारपीट के कारण टूट गया।'
    },
    {
        id: 'written-short-5',
        question: 'डॉ. दासगुप्ता जुलूस में घायल लोगों की देख-रेख तो कर ही रहे थे, उनके फ़ोटो भी उतरवा रहे थे। उन लोगों के फ़ोटो खींचने की क्या वजह हो सकती थी? स्पष्ट कीजिए।',
        options: [
            'स्मृति के लिए',
            'अंग्रेज़ों के अत्याचारों का प्रमाण और इतिहास में दर्ज करने के लिए',
            'पहचान के लिए',
            'इलाज के लिए'
        ],
        correct: 1,
        explanation: 'डॉ. दासगुप्ता घायल लोगों के फ़ोटो अंग्रेज़ों के अत्याचारों का प्रमाण और इतिहास में दर्ज करने के लिए खींच रहे थे।'
    }
];

// Written questions from textbook (लिखित प्रश्न - 50-60 शब्दों में)
const writtenQuestionsLong = [
    {
        id: 'written-long-1',
        question: 'सुभाष बाबू के जुलूस में स्त्री समाज की क्या भूमिका थी?',
        options: [
            'केवल देखने की',
            'सक्रिय भागीदारी - झंडा फहराना, घोषणा पढ़ना, जुलूस निकालना, गिरफ्तार होना',
            'केवल गाना गाना',
            'केवल सहायता करना'
        ],
        correct: 1,
        explanation: 'स्त्री समाज ने सुभाष बाबू के जुलूस में सक्रिय भूमिका निभाई - वे मोनुमेंट की सीढ़ियों पर चढ़कर झंडा फहराईं, घोषणा पढ़ीं, जुलूस निकाला और 105 स्त्रियाँ गिरफ्तार हुईं।'
    },
    {
        id: 'written-long-2',
        question: 'जुलूस के लालबाज़ार आने पर लोगों की क्या दशा हुई?',
        options: [
            'सभी खुश थे',
            'पुलिस ने फिर डंडे चलाए, बहुत लोग घायल हुए, सुभाष बाबू को गिरफ्तार किया गया',
            'कोई समस्या नहीं हुई',
            'सभी घर चले गए'
        ],
        correct: 1,
        explanation: 'जुलूस के लालबाज़ार आने पर पुलिस ने फिर डंडे चलाने शुरू कर दिए, बहुत लोग घायल हुए और सुभाष बाबू को गिरफ्तार करके लालबाज़ार लॉकअप में भेज दिया गया।'
    },
    {
        id: 'written-long-3',
        question: "'जब से कानून भंग का काम शुरू हुआ है तब से आज तक इतनी बड़ी सभा ऐसे मैदान में नहीं की गई थी और यह सभा तो कहना चाहिए कि ओपन लड़ाई थी।' यहाँ पर कौन से और किसके द्वारा लागू किए गए कानून को भंग करने की बात कही गई है? क्या कानून भंग करना उचित था? पाठ के संदर्भ में अपने विचार प्रकट कीजिए।",
        options: [
            'अंग्रेज़ों के कानून को भंग करना उचित नहीं था',
            'अंग्रेज़ों के द्वारा लागू किए गए कानून को भंग करना उचित था क्योंकि यह स्वतंत्रता के लिए था',
            'कोई कानून भंग नहीं किया गया',
            'भारतीय कानून को भंग किया गया'
        ],
        correct: 1,
        explanation: 'यहाँ अंग्रेज़ों के द्वारा लागू किए गए कानून को भंग करने की बात कही गई है। कानून भंग करना उचित था क्योंकि यह स्वतंत्रता प्राप्ति के लिए आवश्यक था और यह एक शांतिपूर्ण प्रतिरोध था।'
    },
    {
        id: 'written-long-4',
        question: 'बहुत से लोग घायल हुए, बहुतों को लॉकअप में रखा गया, बहुत-सी स्त्रियाँ जेल गईं, फिर भी इस दिन को अपूर्व बताया गया है। आपके विचार में यह सब अपूर्व क्यों है? अपने शब्दों में लिखिए।',
        options: [
            'क्योंकि बहुत सारे लोग आए थे',
            'क्योंकि यह पहली बार हुआ था',
            'क्योंकि लोगों ने बिना डरे अंग्रेज़ों का खुला चुनौती दी और अपनी स्वतंत्रता की भावना प्रकट की',
            'क्योंकि यह एक बड़ा कार्यक्रम था'
        ],
        correct: 2,
        explanation: 'यह दिन अपूर्व था क्योंकि लोगों ने बिना डरे अंग्रेज़ों का खुला चुनौती दी, अपनी स्वतंत्रता की भावना प्रकट की और दिखाया कि वे अपनी आजादी के लिए कुछ भी कर सकते हैं।'
    }
];

// Meaning questions from textbook (आशय स्पष्ट कीजिए)
const meaningQuestions = [
    {
        id: 'meaning-1',
        question: 'आज तो जो कुछ हुआ वह अपूर्व हुआ है। बंगाल के नाम या कलकत्ता के नाम पर कलंक था कि यहाँ काम नहीं हो रहा है वह आज बहुत अंश में धुल गया।',
        options: [
            'आज कुछ खास नहीं हुआ',
            'आज का दिन सामान्य था',
            'आज जो हुआ वह अभूतपूर्व था और कलकत्ता के निष्क्रिय होने का कलंक धुल गया',
            'आज बहुत बुरा दिन था'
        ],
        correct: 2,
        explanation: 'इसका आशय है कि आज जो हुआ वह अभूतपूर्व था और कलकत्ता के निष्क्रिय होने का कलंक धुल गया, लोगों ने सोचना शुरू कर दिया कि यहाँ भी बहुत सा काम हो सकता है।'
    },
    {
        id: 'meaning-2',
        question: 'खुला चैलेंज देकर ऐसी सभा पहले नहीं की गई थी।',
        options: [
            'ऐसी सभा पहले भी होती थी',
            'यह पहली बार था जब अंग्रेज़ों को खुला चुनौती देकर सभा की गई थी',
            'कोई चुनौती नहीं दी गई थी',
            'यह एक सामान्य सभा थी'
        ],
        correct: 1,
        explanation: 'इसका आशय है कि यह पहली बार था जब अंग्रेज़ों को खुला चुनौती देकर सभा की गई थी, पहले ऐसा नहीं हुआ था।'
    }
];

// Combined diary questions (using the actual textbook questions)
const diaryQuestions = [
    ...oralQuestions,
    ...writtenQuestionsShort,
    ...writtenQuestionsLong,
    ...meaningQuestions
];

// Vocabulary exercise answers (from textbook शब्दार्थ और टिप्पणियाँ)
const vocabularyAnswers = {
    'पुनरावृत्ति': 'फिर से दोहराना',
    'अपने / अपना': 'हम / हमारे / मेरा (लेखक के लिखने की शैली का उदाहरण)',
    'गश्त': 'पुलिस कर्मचारी का पहरे के लिए घूमना',
    'सारजेंट': 'सेना में एक पद',
    'मोनुमेंट': 'स्मारक',
    'कौंसिल': 'परिषद्',
    'चौरंगी': 'कलकत्ता (कोलकाता) शहर में एक स्थान का नाम',
    'वालेंटियर': 'स्वयंसेवक',
    'संगीन': 'गंभीर',
    'मदालसा': 'जानकीदेवी एवं जमना लाल बजाज की पुत्री का नाम',
    'कलकत्ता (कोलकाता)': 'अंग्रेज़ों ने भारत में पहली राजधानी कलकत्ता में स्थापित की थी। बाद में नयी दिल्ली राजधानी बनी।',
    'उत्साह': 'जोश और उमंग',
    'नवीनता': 'नयापन',
    'प्रदर्शन': 'दिखावा या प्रकट करना',
    'तैनात': 'नियुक्त या स्थापित',
    'घुड़सवार': 'घोड़े पर सवार',
    'ट्रैफ़िक': 'यातायात',
    'भोर': 'सुबह का समय',
    'मारपीट': 'मारना-पीटना',
    'गिरफ़्तार': 'पकड़ना',
    'झंडोत्सव': 'झंडे का उत्सव',
    'प्रबंध': 'व्यवस्था',
    'निराली': 'अनोखी या विशेष',
    'कानून भंग': 'कानून तोड़ना',
    'ओपन लड़ाई': 'खुली लड़ाई',
    'चैलेंज': 'चुनौती',
    'प्रतिज्ञा': 'शपथ या वचन',
    'सर्वसाधारण': 'सभी लोग',
    'लाठी': 'डंडा',
    'घायल': 'चोटिल',
    'वंदे मातरम्': 'भारत माता की वंदना',
    'फ़ासला': 'दूरी',
    'भयानक': 'डरावना',
    'मिंच जाना': 'बंद हो जाना',
    'सीढ़ी': 'सीढ़ा',
    'घोषणा': 'घोषित करना',
    'लॉकअप': 'कैदखाना',
    'ठंडी पड़ना': 'शांत हो जाना',
    'डंडा': 'लाठी',
    'टोलियाँ': 'छोटे-छोटे समूह',
    'मोड़': 'मुड़ने का स्थान',
    'नेतृत्व': 'नेतागिरी',
    'पौन घंटा': 'तीन चौथाई घंटा',
    'लारी': 'बड़ी गाड़ी',
    'दमदम जेल': 'एक जेल का नाम',
    'घुड़सवार': 'घोड़े पर सवार',
    'थाना': 'पुलिस स्टेशन',
    'खादी भंडार': 'खादी का दुकान',
    'कांग्रेस ऑफ़िस': 'कांग्रेस का कार्यालय',
    'चोट': 'घाव या जख्म',
    'अस्पताल': 'चिकित्सालय',
    'अपूर्व': 'अभूतपूर्व या अनोखा',
    'कलंक': 'दाग या बदनामी',
    'धुल जाना': 'साफ हो जाना',
    'अंश': 'हिस्सा'
};

// Load text questions
function loadTextQuestions() {
    console.log('Loading text questions');
    
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) {
        console.error('Text questions container not found');
        return;
    }
    
    // Load diary questions
    loadQuestionSet(diaryQuestions, questionsContainer);
}

// Load question set
function loadQuestionSet(questions, container) {
    questions.forEach((question, index) => {
        const questionElement = createQuestionHTML(question, index);
        container.appendChild(questionElement);
    });
}

// Create question HTML
function createQuestionHTML(question, index) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    questionDiv.innerHTML = `
        <div class="question-header">
            <h4>प्रश्न ${index + 1}: ${question.question}</h4>
        </div>
        <div class="question-options">
            ${question.options.map((option, optionIndex) => `
                <label class="option-label">
                    <input type="radio" name="question-${question.id}" value="${optionIndex}">
                    <span class="option-text">${option}</span>
                </label>
            `).join('')}
        </div>
        <div class="question-feedback" id="feedback-${question.id}" style="display: none;">
            <p class="feedback-text"></p>
        </div>
    `;
    
    return questionDiv;
}

// Check answers
function checkAnswers() {
    console.log('Checking answers');
    
    let correctCount = 0;
    let totalQuestions = 0;
    
    // Check diary questions
    diaryQuestions.forEach(question => {
        const selectedOption = document.querySelector(`input[name="question-${question.id}"]:checked`);
        const feedbackEl = document.getElementById(`feedback-${question.id}`);
        
        if (selectedOption) {
            totalQuestions++;
            const selectedValue = parseInt(selectedOption.value);
            
            if (selectedValue === question.correct) {
                correctCount++;
                feedbackEl.innerHTML = `
                    <p class="feedback-text success">✅ सही! ${question.explanation}</p>
                `;
            } else {
                feedbackEl.innerHTML = `
                    <p class="feedback-text error">❌ गलत। सही उत्तर: ${question.options[question.correct]}</p>
                    <p class="feedback-text explanation">${question.explanation}</p>
                `;
            }
            
            feedbackEl.style.display = 'block';
        }
    });
    
    // Show overall result
    const resultDiv = document.getElementById('questionResult');
    if (resultDiv) {
        const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
        resultDiv.innerHTML = `
            <div class="result-summary">
                <h3>आपके परिणाम</h3>
                <p>सही उत्तर: ${correctCount}/${totalQuestions}</p>
                <p>प्रतिशत: ${percentage}%</p>
                <div class="result-message">
                    ${percentage >= 80 ? '🎉 बहुत बढ़िया! आपने पाठ को अच्छी तरह समझा है।' :
                      percentage >= 60 ? '👍 अच्छा काम! थोड़ा और अभ्यास करें।' :
                      '📚 पाठ को फिर से पढ़ें और प्रश्नों का उत्तर दें।'}
                </div>
            </div>
        `;
        resultDiv.style.display = 'block';
    }
    
    // Update score
    score += correctCount * 5;
    document.getElementById('totalScore').textContent = score;
    
    // Track completion
    if (!modulesCompleted.includes('thinking-text')) {
        modulesCompleted.push('thinking-text');
        updateProgress();
        showAchievement('प्रश्न अभ्यास पूर्ण!');
    }
    
    if (narrator) {
        narrator.speak(`आपने ${correctCount} में से ${totalQuestions} प्रश्नों के सही उत्तर दिए। ${percentage} प्रतिशत सफलता मिली।`);
    }
}

// Initialize vocabulary checking
function initVocabularyChecking() {
    console.log('Initializing vocabulary checking');
    
    // Add click handlers to vocabulary words
    document.querySelectorAll('.highlight-vocab').forEach(vocab => {
        vocab.addEventListener('click', function() {
            const word = this.textContent.trim();
            const meaning = vocabularyAnswers[word];
            
            if (meaning) {
                // Show meaning in a tooltip or popup
                showVocabularyMeaning(word, meaning);
            }
        });
    });
}

// Show vocabulary meaning
function showVocabularyMeaning(word, meaning) {
    // Create a tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'vocabulary-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <h4>${word}</h4>
            <p>${meaning}</p>
            <button class="tooltip-close" onclick="this.parentNode.parentNode.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(tooltip);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.classList.add('fade-out');
            setTimeout(() => tooltip.remove(), 500);
        }
    }, 5000);
    
    if (narrator) {
        narrator.speak(`${word} का अर्थ है: ${meaning}`);
    }
}
