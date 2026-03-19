/**
 * Language Exercises for दुःख का अधिकार Interactive Lesson
 */

// Language exercises data
const languageExercisesData = {
    vocabulary: {
        words: [
            {
                word: "अनुभूति",
                meaning: "एहसास",
                context: "समाज की निचली श्रेणियों की अनुभूति को समझना चाहते हैं।"
            },
            {
                word: "व्यवधान",
                meaning: "रुकावट, बाधा",
                context: "मेरी पोशाक ही व्यवधान बन खड़ी हो गई।"
            },
            {
                word: "बेहया",
                meaning: "बेशर्म, निर्लज्ज",
                context: "यह बेहया दूकान लगा बैठी है।"
            },
            {
                word: "सूतक",
                meaning: "छूत",
                context: "तेरह दिन का सूतक होता है।"
            },
            {
                word: "निर्वाह",
                meaning: "गुजारा",
                context: "परिवार का निर्वाह करता था।"
            }
        ]
    },
    wordPairs: [
        {
            pair: "छन्नी-ककना",
            meaning: "मामूली गहना, जेवर",
            context: "माँ के हाथों की छन्नी-ककना ही क्यों न बिक जाएँ।"
        },
        {
            pair: "दुअन्नी-चवन्नी",
            meaning: "थोड़े पैसे",
            context: "बुढ़िया को दुअन्नी-चवन्नी भी कौन उधार देता?"
        },
        {
            pair: "फफक-फफककर",
            meaning: "रोते हुए",
            context: "फफक-फफककर रो रही थी।"
        },
        {
            pair: "झाड़ना-फूँकना",
            meaning: "जादू-टोना करना",
            context: "झाड़ना-फूँकना हुआ।"
        },
        {
            pair: "लिपट-लिपटकर",
            meaning: "चिपककर",
            context: "बच्चे 'भगवाना' से लिपट-लिपटकर रोए।"
        }
    ],
    grammar: {
        punctuation: [
            {
                sentence: "क्या जमाना है जवान लड़के के मरे पूरा दिन नहीं बीता",
                correct: "क्या जमाना है! जवान लड़के के मरे पूरा दिन नहीं बीता।"
            },
            {
                sentence: "अरे जैसी नीयत होती है अल्ला भी वैसी ही बरकत देता है",
                correct: "अरे, जैसी नीयत होती है, अल्ला भी वैसी ही बरकत देता है।"
            },
            {
                sentence: "ये कमीने लोग रोटी के टुकड़े पर जान देते हैं",
                correct: "ये कमीने लोग रोटी के टुकड़े पर जान देते हैं।"
            }
        ],
        synonyms: [
            {
                word: "ईमान",
                synonyms: ["धर्म", "विश्वास", "आस्था"]
            },
            {
                word: "बदन",
                synonyms: ["शरीर", "देह", "काया"]
            },
            {
                word: "अंदाजा",
                synonyms: ["अनुमान", "अटकल", "कल्पना"]
            },
            {
                word: "बेचैनी",
                synonyms: ["अशांति", "व्याकुलता", "घबराहट"]
            },
            {
                word: "गम",
                synonyms: ["दुःख", "शोक", "वेदना"]
            }
        ]
    }
};

// Initialize language exercises
function initializeLanguageExercises() {
    console.log('Language exercises module initialized');
}

// Check vocabulary answers
function checkVocabularyAnswers() {
    const answers = {
        vocab1: "एहसास",
        vocab2: "रुकावट", 
        vocab3: "बेशर्म",
        vocab4: "छूत",
        vocab5: "गुजारा"
    };
    
    let correctCount = 0;
    let totalCount = 0;
    
    Object.keys(answers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            totalCount++;
            const isCorrect = select.value === answers[id];
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
            if (window.score !== undefined) {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            if (!window.modulesCompleted.includes('thinking-language')) {
                window.modulesCompleted.push('thinking-language');
                if (typeof window.updateProgress === 'function') {
                    window.updateProgress();
                }
                if (typeof window.showAchievement === 'function') {
                    window.showAchievement('शब्दार्थ अभ्यास पूर्ण!');
                }
            }
        }
    }
    
    if (window.narrator) {
        window.narrator.speak(`आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`);
    }
}

// Check sentence construction
function checkSentenceConstruction() {
    const correctAnswers = {
        sentence1: "correct",
        sentence2: "correct",
        sentence3: "correct", 
        sentence4: "correct",
        sentence5: "correct"
    };
    
    let correctCount = 0;
    let totalCount = Object.keys(correctAnswers).length;
    
    // Reset all select styling before applying new feedback
    Object.keys(correctAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.style.borderColor = '';
            select.style.backgroundColor = '';
        }
    });
    
    Object.keys(correctAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select && select.value) {
            if (select.value === correctAnswers[id]) {
                select.style.borderColor = '#4caf50';
                select.style.backgroundColor = '#e8f5e8';
                correctCount++;
            } else {
                select.style.borderColor = '#f44336';
                select.style.backgroundColor = '#ffeaea';
            }
        } else if (select) {
            select.style.borderColor = '#f44336';
            select.style.backgroundColor = '#ffeaea';
        }
    });
    
    const feedbackEl = document.getElementById('sentenceFeedback');
    if (feedbackEl) {
        if (correctCount === totalCount) {
            feedbackEl.innerHTML = `
                <div class="feedback-success">
                    <strong>✅ सभी उत्तर सही हैं!</strong><br>
                    शब्द-युग्मों का प्रयोग उत्कृष्ट है। आपने सभी वाक्यों में सही शब्द-युग्मों का प्रयोग किया है। आप चाहें तो पुन: अभ्यास कर सकते हैं।
                </div>
            `;
            feedbackEl.className = 'feedback-message show success';
            
            if (window.score !== undefined) {
                window.score += 15;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            if (!window.modulesCompleted) {
                window.modulesCompleted = [];
            }
            if (!window.modulesCompleted.includes('thinking-language')) {
                window.modulesCompleted.push('thinking-language');
                if (typeof window.updateProgress === 'function') {
                    window.updateProgress();
                }
                if (typeof window.showAchievement === 'function') {
                    window.showAchievement('व्याकरण अभ्यास पूर्ण!');
                }
            }
        } else {
            feedbackEl.innerHTML = `
                <div class="feedback-error">
                    <strong>❌ कुछ उत्तर गलत हैं</strong><br>
                    आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए। आप पुन: प्रयास कर सकते हैं।
                </div>
            `;
            feedbackEl.className = 'feedback-message show error';
        }
    }
    
    // Allow multiple attempts - no blocking
    // Users can now answer the questions multiple times
}

// Show vocabulary help
function showVocabularyHelp() {
    const helpHTML = `
        <div class="vocabulary-help">
            <h4>शब्दार्थ सहायता:</h4>
            <div class="help-content">
                ${languageExercisesData.vocabulary.words.map(word => `
                    <div class="help-item">
                        <strong>${word.word}:</strong> ${word.meaning}<br>
                        <em>संदर्भ:</em> ${word.context}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'vocabulary-help-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>शब्दार्थ सहायता</h3>
                <button class="close-btn" onclick="this.parentNode.parentNode.parentNode.remove()">×</button>
            </div>
            <div class="modal-body">
                ${helpHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 15 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 15000);
}

// Show word pairs help
function showWordPairsHelp() {
    const helpHTML = `
        <div class="word-pairs-help">
            <h4>शब्द-युग्म सहायता:</h4>
            <div class="help-content">
                ${languageExercisesData.wordPairs.map(pair => `
                    <div class="help-item">
                        <strong>${pair.pair}:</strong> ${pair.meaning}<br>
                        <em>संदर्भ:</em> ${pair.context}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'word-pairs-help-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>शब्द-युग्म सहायता</h3>
                <button class="close-btn" onclick="this.parentNode.parentNode.parentNode.remove()">×</button>
            </div>
            <div class="modal-body">
                ${helpHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 15 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 15000);
}

// Initialize language exercises when the module is shown
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language exercises when thinking-language module is loaded
    const originalShowModule = window.showModule;
    window.showModule = function(moduleId) {
        originalShowModule(moduleId);
        if (moduleId === 'thinking-language') {
            setTimeout(initializeLanguageExercises, 100);
        }
    };
});

// Reset color feedback for language exercises (useful for testing)
function resetLanguageColorFeedback() {
    const allSelects = document.querySelectorAll('.sentence-item select');
    allSelects.forEach(select => {
        select.style.borderColor = '';
        select.style.backgroundColor = '';
    });
    
    const feedbackEl = document.getElementById('sentenceFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-message';
    }
}

// Make functions globally available
window.initializeLanguageExercises = initializeLanguageExercises;
window.checkVocabularyAnswers = checkVocabularyAnswers;
window.checkSentenceConstruction = checkSentenceConstruction;
window.showVocabularyHelp = showVocabularyHelp;
window.showWordPairsHelp = showWordPairsHelp;
window.resetLanguageColorFeedback = resetLanguageColorFeedback;
