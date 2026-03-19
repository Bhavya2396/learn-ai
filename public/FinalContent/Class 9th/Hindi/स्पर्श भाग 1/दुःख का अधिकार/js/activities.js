/**
 * Activities for दुःख का अधिकार Interactive Lesson
 */

// Activities data
const activitiesData = {
    meaningAnalysis: [
        {
            text: "जैसे वायु की लहरें कटी हुई पतंग को सहसा भूमि पर नहीं गिर जाने देतीं उसी तरह खास परिस्थितियों में हमारी पोशाक हमें झुक सकने से रोकती रहती है।",
            options: [
                {
                    text: "इसका अर्थ है कि समाज में पोशाक व्यक्ति की सामाजिक स्थिति निर्धारित करती है। कभी-कभी यही पोशाक हमें निचली श्रेणियों के लोगों के साथ घुलने-मिलने से रोकती है।",
                    correct: true
                },
                {
                    text: "इसका अर्थ है कि पोशाक हमेशा अच्छी होनी चाहिए।",
                    correct: false
                },
                {
                    text: "इसका अर्थ है कि पोशाक से कोई फर्क नहीं पड़ता।",
                    correct: false
                }
            ]
        },
        {
            text: "शोक करने, गम मनाने के लिए भी सहूलियत चाहिए और... दुःखी होने का भी एक अधिकार होता है।",
            options: [
                {
                    text: "यह वाक्य समाज की कड़वी सच्चाई को दर्शाता है। गरीब लोगों को अपने दुःख को भी छुपाना पड़ता है क्योंकि उनके पास दुःख मनाने की सुविधा नहीं होती।",
                    correct: true
                },
                {
                    text: "यह दिखाता है कि सभी लोग दुःख मना सकते हैं।",
                    correct: false
                },
                {
                    text: "यह केवल एक सामान्य बात है।",
                    correct: false
                }
            ]
        }
    ],
    writingTopics: [
        {
            title: "सामाजिक असमानता और दुःख का अधिकार",
            description: "यशपाल की कहानी के आधार पर सामाजिक असमानता और दुःख मनाने के अधिकार पर अपने विचार व्यक्त करें। समझाएं कि कैसे समाज में सभी को समान अधिकार मिलना चाहिए।",
            points: [
                "समाज में व्याप्त असमानता",
                "दुःख मनाने का अधिकार",
                "गरीब और अमीर के बीच अंतर",
                "सामाजिक न्याय की आवश्यकता"
            ]
        },
        {
            title: "गरीबी और मानवीय संवेदना",
            description: "कहानी में दिखाए गए गरीबी के दृश्यों के आधार पर गरीबी और मानवीय संवेदना के बीच संबंध पर चर्चा करें। बताएं कि कैसे आर्थिक तंगी लोगों के जीवन को प्रभावित करती है।",
            points: [
                "गरीबी का प्रभाव",
                "मानवीय संवेदना",
                "आर्थिक तंगी के परिणाम",
                "समाज की जिम्मेदारी"
            ]
        },
        {
            title: "अंधविश्वास और सामाजिक कुरीतियाँ",
            description: "कहानी में दिखाए गए अंधविश्वासों और सामाजिक कुरीतियों पर अपने विचार व्यक्त करें। समझाएं कि कैसे ये कुरीतियाँ समाज के विकास में बाधक बनती हैं।",
            points: [
                "अंधविश्वास का प्रभाव",
                "सामाजिक कुरीतियाँ",
                "सूतक की प्रथा",
                "समाज सुधार की आवश्यकता"
            ]
        }
    ]
};

// Initialize activities
function initializeActivities() {
    // Activities are already defined in HTML, this function can be used for additional setup
    console.log('Activities module initialized');
}

// Check meaning analysis answers
function checkMeaningAnalysis() {
    const meaning1 = document.querySelector('input[name="meaning"]:checked');
    const meaning2 = document.querySelector('input[name="meaning2"]:checked');
    const feedbackEl = document.getElementById('researchFeedback');
    
    if (!meaning1 || !meaning2) {
        feedbackEl.textContent = 'कृपया दोनों आशयों के लिए विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    const isCorrect1 = meaning1.value === "1";
    const isCorrect2 = meaning2.value === "1";
    
    // Add color feedback for Question 1 options
    const question1Options = document.querySelectorAll('input[name="meaning"]');
    question1Options.forEach(option => {
        const label = document.querySelector(`label[for="${option.id}"]`);
        if (option.checked) {
            if (option.value === "1") {
                // Correct answer - green
                label.style.backgroundColor = '#d4edda';
                label.style.borderColor = '#c3e6cb';
                label.style.color = '#155724';
                label.style.border = '2px solid #28a745';
                label.style.borderRadius = '8px';
                label.style.padding = '8px';
                label.style.margin = '4px 0';
            } else {
                // Wrong answer - red
                label.style.backgroundColor = '#f8d7da';
                label.style.borderColor = '#f5c6cb';
                label.style.color = '#721c24';
                label.style.border = '2px solid #dc3545';
                label.style.borderRadius = '8px';
                label.style.padding = '8px';
                label.style.margin = '4px 0';
            }
        } else {
            // Show correct answer in green even if not selected
            if (option.value === "1") {
                label.style.backgroundColor = '#d1ecf1';
                label.style.borderColor = '#bee5eb';
                label.style.color = '#0c5460';
                label.style.border = '2px solid #17a2b8';
                label.style.borderRadius = '8px';
                label.style.padding = '8px';
                label.style.margin = '4px 0';
            } else {
                // Reset other options
                label.style.backgroundColor = '';
                label.style.borderColor = '';
                label.style.color = '';
                label.style.border = '';
                label.style.borderRadius = '';
                label.style.padding = '';
                label.style.margin = '';
            }
        }
    });
    
    // Add color feedback for Question 2 options
    const question2Options = document.querySelectorAll('input[name="meaning2"]');
    question2Options.forEach(option => {
        const label = document.querySelector(`label[for="${option.id}"]`);
        if (option.checked) {
            if (option.value === "1") {
                // Correct answer - green
                label.style.backgroundColor = '#d4edda';
                label.style.borderColor = '#c3e6cb';
                label.style.color = '#155724';
                label.style.border = '2px solid #28a745';
                label.style.borderRadius = '8px';
                label.style.padding = '8px';
                label.style.margin = '4px 0';
            } else {
                // Wrong answer - red
                label.style.backgroundColor = '#f8d7da';
                label.style.borderColor = '#f5c6cb';
                label.style.color = '#721c24';
                label.style.border = '2px solid #dc3545';
                label.style.borderRadius = '8px';
                label.style.padding = '8px';
                label.style.margin = '4px 0';
            }
        } else {
            // Show correct answer in green even if not selected
            if (option.value === "1") {
                label.style.backgroundColor = '#d1ecf1';
                label.style.borderColor = '#bee5eb';
                label.style.color = '#0c5460';
                label.style.border = '2px solid #17a2b8';
                label.style.borderRadius = '8px';
                label.style.padding = '8px';
                label.style.margin = '4px 0';
            } else {
                // Reset other options
                label.style.backgroundColor = '';
                label.style.borderColor = '';
                label.style.color = '';
                label.style.border = '';
                label.style.borderRadius = '';
                label.style.padding = '';
                label.style.margin = '';
            }
        }
    });
    
    if (isCorrect1 && isCorrect2) {
        feedbackEl.innerHTML = `
            <div class="feedback-success">
                <strong>✅ उत्कृष्ट!</strong><br>
                आपने दोनों वाक्यांशों के आशय सही-सही समझे हैं। आपका विश्लेषण बहुत अच्छा है।
            </div>
        `;
        feedbackEl.className = 'feedback-message show success';
        
        if (window.score !== undefined) {
            window.score += 20;
            document.getElementById('totalScore').textContent = window.score;
        }
        
        if (!window.modulesCompleted) {
            window.modulesCompleted = [];
        }
        if (!window.modulesCompleted.includes('activities')) {
            window.modulesCompleted.push('activities');
            if (typeof window.updateProgress === 'function') {
                window.updateProgress();
            }
            if (typeof window.showAchievement === 'function') {
                window.showAchievement('आशय विश्लेषण पूर्ण!');
            }
        }
    } else {
        feedbackEl.innerHTML = `
            <div class="feedback-error">
                <strong>❌ कुछ उत्तर गलत हैं</strong><br>
                आपके कुछ उत्तर सही नहीं हैं। वाक्यांशों को एक बार फिर से पढ़कर विचार करें। सही उत्तर हरे रंग में दिखाए गए हैं।
            </div>
        `;
        feedbackEl.className = 'feedback-message show error';
    }
    
    // Disable all radio buttons after checking
    const allRadioButtons = document.querySelectorAll('input[name="meaning"], input[name="meaning2"]');
    allRadioButtons.forEach(radio => {
        radio.disabled = true;
    });
    
    // Disable the button
    const button = document.querySelector('button[onclick="checkMeaningAnalysis()"]');
    if (button) {
        button.disabled = true;
        button.textContent = 'उत्तर जाँचे गए';
    }
}

// Check writing topic selection
function checkWritingTopic() {
    const selectedOption = document.querySelector('input[name="essay"]:checked');
    const feedbackEl = document.getElementById('rolePlayFeedback');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया कोई एक विषय चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    const selectedValue = selectedOption.value;
    const selectedTopic = activitiesData.writingTopics[selectedValue - 1];
    
    feedbackEl.innerHTML = `
        <strong>आपका चयनित विषय:</strong> ${selectedTopic.title}<br><br>
        <strong>विवरण:</strong> ${selectedTopic.description}<br><br>
        <strong>मुख्य बिंदु:</strong><br>
        ${selectedTopic.points.map(point => `• ${point}`).join('<br>')}<br><br>
        अब आप इस विषय पर अपने विचार लिखने के लिए तैयार हैं।
    `;
    feedbackEl.className = 'feedback-message show success';
    
    if (window.score !== undefined) {
        window.score += 20;
        document.getElementById('totalScore').textContent = window.score;
    }
    
    if (!window.modulesCompleted.includes('activities')) {
        window.modulesCompleted.push('activities');
        if (typeof window.updateProgress === 'function') {
            window.updateProgress();
        }
        if (typeof window.showAchievement === 'function') {
            window.showAchievement('लेखन विषय चयन पूर्ण!');
        }
    }
    
    if (window.narrator) {
        window.narrator.speak("आपका विषय चयन सहेज लिया गया है। अब आप इस विषय पर अपने विचार लिखने के लिए तैयार हैं।");
    }
}

// Show writing tips
function showWritingTips() {
    const tips = [
        "अपने विचार स्पष्ट और तार्किक रूप से व्यक्त करें।",
        "कहानी से उदाहरण देकर अपनी बात को मजबूत बनाएं।",
        "समाज की वर्तमान स्थिति पर भी चर्चा करें।",
        "अपने निजी अनुभव भी साझा कर सकते हैं।",
        "भाषा सरल और स्पष्ट रखें।"
    ];
    
    const tipsHTML = `
        <div class="writing-tips">
            <h4>लेखन के लिए सुझाव:</h4>
            <ul>
                ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // Show tips in a modal or popup
    const modal = document.createElement('div');
    modal.className = 'writing-tips-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>लेखन सुझाव</h3>
                <button class="close-btn" onclick="this.parentNode.parentNode.parentNode.remove()">×</button>
            </div>
            <div class="modal-body">
                ${tipsHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 10000);
}

// Initialize activities when the module is shown
document.addEventListener('DOMContentLoaded', function() {
    // Initialize activities when activities module is loaded
    const originalShowModule = window.showModule;
    window.showModule = function(moduleId) {
        originalShowModule(moduleId);
        if (moduleId === 'activities') {
            setTimeout(initializeActivities, 100);
        }
    };
});

// Reset color feedback (useful for testing or if user wants to try again)
function resetColorFeedback() {
    const allLabels = document.querySelectorAll('.listening-notes label');
    allLabels.forEach(label => {
        label.style.backgroundColor = '';
        label.style.borderColor = '';
        label.style.color = '';
        label.style.border = '';
        label.style.borderRadius = '';
        label.style.padding = '';
        label.style.margin = '';
    });
    
    const allRadioButtons = document.querySelectorAll('input[name="meaning"], input[name="meaning2"]');
    allRadioButtons.forEach(radio => {
        radio.disabled = false;
    });
    
    const button = document.querySelector('button[onclick="checkMeaningAnalysis()"]');
    if (button) {
        button.disabled = false;
        button.textContent = 'विचार सहेजें';
    }
    
    const feedbackEl = document.getElementById('researchFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-message';
    }
}

// Make functions globally available
window.initializeActivities = initializeActivities;
window.checkMeaningAnalysis = checkMeaningAnalysis;
window.checkWritingTopic = checkWritingTopic;
window.showWritingTips = showWritingTips;
window.resetColorFeedback = resetColorFeedback;
