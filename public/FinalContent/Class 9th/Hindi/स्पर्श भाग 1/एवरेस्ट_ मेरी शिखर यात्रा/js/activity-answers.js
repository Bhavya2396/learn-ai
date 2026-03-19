/**
 * Activity answers and feedback for Everest story
 */

// Activity answers and feedback data
const activityAnswers = {
    // Research/meaning analysis answers
    meaning: {
        meaning1: {
            correct: "1",
            feedback: {
                "1": "बिल्कुल सही! यह वाक्य दर्शाता है कि बड़े लक्ष्यों के लिए जोखिम उठाना आवश्यक है। एवरेस्ट जैसे महान अभियान में खतरे स्वाभाविक हैं।",
                "2": "यह सही नहीं है। वाक्य का आशय यह नहीं है कि एवरेस्ट पर जाना गलत है।",
                "3": "यह आंशिक रूप से सही है लेकिन पूरा आशय नहीं है। वाक्य का मुख्य संदेश जोखिम स्वीकार करने के बारे में है।"
            }
        },
        meaning2: {
            correct: "1", 
            feedback: {
                "1": "उत्कृष्ट! यह वाक्य बछेंद्री की टीम भावना और नेतृत्व क्षमता को दर्शाता है। वे केवल व्यक्तिगत सफलता नहीं, बल्कि सामूहिक सफलता चाहती थीं।",
                "2": "यह सही नहीं है। बछेंद्री को अधिक काम नहीं करना पड़ता था, बल्कि वे स्वेच्छा से मदद कर रही थीं।",
                "3": "यह केवल विनम्रता नहीं थी, बल्कि वास्तविक टीम भावना का प्रदर्शन था।"
            }
        }
    },
    
    // Essay topic selection
    essay: {
        "1": {
            title: "साहस और दृढ़ संकल्प का महत्व",
            feedback: "उत्कृष्ट विषय चयन! बछेंद्री पाल के जीवन से साहस और दृढ़ संकल्प के अनेक उदाहरण मिलते हैं।",
            hints: [
                "बचपन से पहाड़ों पर चढ़ने का शौक",
                "आर्थिक कठिनाइयों के बावजूद शिक्षा पूरी करना", 
                "हिमस्खलन के बाद भी हार न मानना",
                "पहली भारतीय महिला एवरेस्ट विजेता बनना"
            ]
        },
        "2": {
            title: "महिला सशक्तिकरण और खेल",
            feedback: "बहुत अच्छा विषय! बछेंद्री पाल महिला सशक्तिकरण की प्रेरणादायी मिसाल हैं।",
            hints: [
                "पारंपरिक सोच को तोड़ना",
                "खेल जगत में महिलाओं की भागीदारी",
                "समाज में महिलाओं की स्थिति में सुधार",
                "भावी पीढ़ियों के लिए प्रेरणा"
            ]
        },
        "3": {
            title: "प्रकृति और मानव",
            feedback: "गहरा विषय चुना है! पर्वतारोहण प्रकृति और मानव के संबंध को दर्शाता है।",
            hints: [
                "प्रकृति की चुनौतियाँ",
                "मानव की जिजीविषा",
                "पर्यावरण संरक्षण का महत्व",
                "प्रकृति से सीख"
            ]
        }
    }
};

// Vocabulary and grammar answers
const languageAnswers = {
    vocabulary: {
        vocab1: "किसी काम के लिए प्रतिबद्धता",
        vocab2: "जहाँ पहुँचना कठिन हो", 
        vocab3: "नया सीखने वाला",
        vocab4: "ऊपर चढ़ने वाला",
        vocab5: "प्राप्ति"
    },
    punctuation: {
        punct1: 'तेनजिंग ने कहा, "तुम एक पक्की पर्वतीय लड़की लगती हो।"',
        punct2: "क्या तुम भयभीत थी?", 
        punct3: '"तुमने इतनी जोखिम क्यों ली, बछेंद्री?"'
    }
};

// Provide detailed feedback for activities
function getActivityFeedback(activityType, questionId, selectedValue) {
    switch(activityType) {
        case 'meaning':
            const meaningData = activityAnswers.meaning[questionId];
            if (meaningData && meaningData.feedback[selectedValue]) {
                return {
                    isCorrect: selectedValue === meaningData.correct,
                    feedback: meaningData.feedback[selectedValue]
                };
            }
            break;
            
        case 'essay':
            const essayData = activityAnswers.essay[selectedValue];
            if (essayData) {
                return {
                    isCorrect: true, // All essay topics are valid
                    feedback: essayData.feedback,
                    hints: essayData.hints
                };
            }
            break;
            
        case 'vocabulary':
            const correctAnswer = languageAnswers.vocabulary[questionId];
            return {
                isCorrect: selectedValue === correctAnswer,
                feedback: selectedValue === correctAnswer ? 
                    "सही उत्तर! ✓" : 
                    `गलत उत्तर। सही उत्तर है: ${correctAnswer}`
            };
            
        case 'punctuation':
            const correctPunct = languageAnswers.punctuation[questionId];
            return {
                isCorrect: selectedValue === correctPunct,
                feedback: selectedValue === correctPunct ? 
                    "बिल्कुल सही! ✓" : 
                    `गलत। सही उत्तर है: ${correctPunct}`
            };
    }
    
    return {
        isCorrect: false,
        feedback: "कोई उत्तर नहीं मिला।"
    };
}

// Get comprehensive activity feedback
function getComprehensiveActivityFeedback(activityType, responses) {
    let correctCount = 0;
    let totalCount = Object.keys(responses).length;
    let detailedFeedback = [];
    
    Object.keys(responses).forEach(questionId => {
        const result = getActivityFeedback(activityType, questionId, responses[questionId]);
        if (result.isCorrect) correctCount++;
        detailedFeedback.push({
            questionId,
            ...result
        });
    });
    
    const percentage = Math.round((correctCount / totalCount) * 100);
    let overallMessage = '';
    
    if (percentage >= 80) {
        overallMessage = `उत्कृष्ट प्रदर्शन! आपने ${correctCount}/${totalCount} सही उत्तर दिए हैं।`;
    } else if (percentage >= 60) {
        overallMessage = `अच्छा प्रयास! आपने ${correctCount}/${totalCount} सही उत्तर दिए हैं। थोड़ा और सुधार हो सकता है।`;
    } else {
        overallMessage = `और अभ्यास की जरूरत है। आपने ${correctCount}/${totalCount} सही उत्तर दिए हैं।`;
    }
    
    return {
        correctCount,
        totalCount,
        percentage,
        overallMessage,
        detailedFeedback
    };
}

// Study tips and hints
const studyTips = {
    reading: [
        "पाठ को ध्यान से पढ़ें और मुख्य बिंदुओं को समझें",
        "कठिन शब्दों के अर्थ जानें",
        "पात्रों के चरित्र और उनकी भावनाओं को समझें",
        "घटनाओं का क्रम याद रखें"
    ],
    writing: [
        "उत्तर लिखने से पहले सोचें",
        "मुख्य बिंदुओं को व्यवस्थित करें", 
        "सरल और स्पष्ट भाषा का प्रयोग करें",
        "उदाहरण देकर अपनी बात को स्पष्ट करें"
    ],
    vocabulary: [
        "नए शब्दों को संदर्भ में समझें",
        "शब्दों का प्रयोग वाक्यों में करें",
        "समानार्थी और विपरीतार्थी शब्द याद करें",
        "शब्द निर्माण के नियम सीखें"
    ]
};

// Get study tips for specific area
function getStudyTips(area) {
    return studyTips[area] || [];
}

// Make functions globally available
window.getActivityFeedback = getActivityFeedback;
window.getComprehensiveActivityFeedback = getComprehensiveActivityFeedback;
window.getStudyTips = getStudyTips;
window.activityAnswers = activityAnswers;
window.languageAnswers = languageAnswers;
