/**
 * Activity answers and functionality for Nida Fazli's "Ab Kahan Dusre Ke Dukh Se Dukhi Hone Wale"
 */

// Vocabulary exercise answers for language section
const vocabularyAnswers = {
    vocab1: "राजा",
    vocab2: "प्रिय",
    vocab3: "सिकुड़ना",
    vocab4: "बाढ़",
    vocab5: "अस्थायी पड़ाव"
};

// Karak Chinh (Idiom) answers
const idiomAnswers = {
    idiom1: "1", // ने (कर्ता कारक)
    idiom2: "2", // के लिए (संप्रदान कारक)
    idiom3: "2", // को (कर्म कारक)
    idiom4: "1"  // पर (अधिकरण कारक)
};

// Grammar (Bahuvachan) answers
const grammarAnswers = {
    adj1: "चींटियाँ",
    adj2: "घोड़े",
    adj3: "आवाजें",
    adj4: "टुकड़े"
};

// Explanation answers for meaning analysis
const meaningAnswers = {
    meaning: "1", // First quote explanation
    meaning2: "1" // Second quote explanation
};

// Essay topic selection
document.addEventListener('DOMContentLoaded', function() {
    // Initialize essay topic selection
    const essayOptions = document.querySelectorAll('input[name="essay"]');
    essayOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Save selected topic
            localStorage.setItem('selectedEssayTopic', this.value);
        });
    });
    
    // Initialize reflection choice
    const reflectionOptions = document.querySelectorAll('input[name="reflection"]');
    reflectionOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Save selected reflection
            localStorage.setItem('selectedReflection', this.value);
        });
    });
});

// Save research notes
function saveResearchNotes() {
    const meaning1 = document.querySelector('input[name="meaning"]:checked');
    const meaning2 = document.querySelector('input[name="meaning2"]:checked');
    const feedbackEl = document.getElementById('researchFeedback');
    
    if (!meaning1 || !meaning2) {
        feedbackEl.textContent = 'कृपया दोनों आशयों के लिए विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    const isCorrect1 = meaning1.value === meaningAnswers.meaning;
    const isCorrect2 = meaning2.value === meaningAnswers.meaning2;
    
    if (isCorrect1 && isCorrect2) {
        feedbackEl.textContent = 'उत्कृष्ट! आपने दोनों वाक्यांशों के आशय सही-सही समझे हैं।';
        feedbackEl.className = 'feedback-message show success';
        
        score += 20;
        document.getElementById('totalScore').textContent = score;
        
        if (!modulesCompleted.includes('activities')) {
            modulesCompleted.push('activities');
            updateProgress();
            showAchievement('आशय विश्लेषण पूर्ण!');
        }
    } else {
        feedbackEl.textContent = 'आपके कुछ उत्तर सही नहीं हैं। वाक्यांशों को एक बार फिर से पढ़कर विचार करें।';
        feedbackEl.className = 'feedback-message show error';
    }
    
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}

// Save role play (निबंध विषय)
function saveRolePlay() {
    const selectedOption = document.querySelector('input[name="essay"]:checked');
    const feedbackEl = document.getElementById('rolePlayFeedback');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया कोई एक विषय चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    feedbackEl.textContent = 'आपका विषय चयन सहेज लिया गया है! अब आप इस विषय पर अपने विचार लिखने के लिए तैयार हैं।';
    feedbackEl.className = 'feedback-message show success';
    
    score += 20;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('निबंध विषय चयन पूर्ण!');
    }
    
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}

// Save reflection
function saveReflection() {
    const selectedOption = document.querySelector('input[name="reflection"]:checked');
    const feedbackEl = document.getElementById('reflectionFeedback');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया कोई एक विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // All reflection options are acceptable
    const selectedOptionDiv = selectedOption.closest('.reflection-option');
    document.querySelectorAll('.reflection-option').forEach(option => {
        option.classList.remove('selected-option', 'good-option');
    });
    selectedOptionDiv.classList.add('selected-option', 'good-option');
    
    feedbackEl.textContent = 'आपका चिंतन सहेज लिया गया है! आपके विचार सराहनीय हैं।';
    feedbackEl.className = 'feedback-message show success';
    
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        updateProgress();
        showAchievement('चिंतन पूर्ण!');
    }
    
    if (narrator) {
        narrator.speak("अपना चिंतन साझा करने के लिए धन्यवाद। " + feedbackEl.textContent);
    }
}

// Make functions globally available
window.saveResearchNotes = saveResearchNotes;
window.saveRolePlay = saveRolePlay;
window.saveReflection = saveReflection;
