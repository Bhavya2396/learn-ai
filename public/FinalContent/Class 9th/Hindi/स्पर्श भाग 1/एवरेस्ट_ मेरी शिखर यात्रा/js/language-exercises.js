/**
 * Language exercises for Everest story
 */

// Language exercise data and functions
const languageExercises = {
    wordMeanings: {
        title: "शब्दार्थ अभ्यास",
        exercises: [
            {
                word: "अभियान",
                options: ["यात्रा", "चुनौती", "किसी काम के लिए प्रतिबद्धता", "खेल"],
                correct: "किसी काम के लिए प्रतिबद्धता",
                explanation: "अभियान का अर्थ है किसी निश्चित लक्ष्य के लिए किया गया प्रयास या मिशन।"
            },
            {
                word: "दुर्गम",
                options: ["आसान", "जहाँ पहुँचना कठिन हो", "सुंदर", "ऊँचा"],
                correct: "जहाँ पहुँचना कठिन हो",
                explanation: "दुर्गम का अर्थ है कठिन, जहाँ पहुँचना मुश्किल हो।"
            }
        ]
    },
    
    punctuation: {
        title: "विराम चिह्न अभ्यास",
        exercises: [
            {
                sentence: "तेनजिंग ने कहा तुम एक पक्की पर्वतीय लड़की लगती हो",
                options: [
                    'तेनजिंग ने कहा, "तुम एक पक्की पर्वतीय लड़की लगती हो।"',
                    "तेनजिंग ने कहा तुम एक पक्की पर्वतीय लड़की लगती हो!",
                    "तेनजिंग ने कहा? तुम एक पक्की पर्वतीय लड़की लगती हो"
                ],
                correct: 'तेनजिंग ने कहा, "तुम एक पक्की पर्वतीय लड़की लगती हो।"',
                explanation: "प्रत्यक्ष कथन के लिए अल्पविराम और उद्धरण चिह्न का प्रयोग होता है।"
            }
        ]
    }
};

// Initialize language exercises
function initializeLanguageExercises() {
    console.log('Language exercises initialized');
    
    // Add interactive features to language exercises
    enhanceLanguageInteractions();
}

// Enhance language exercise interactions
function enhanceLanguageInteractions() {
    // Add hover effects to options
    document.querySelectorAll('.language-select option').forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
    });
    
    // Add explanation tooltips
    addExplanationTooltips();
}

// Add explanation tooltips to language exercises
function addExplanationTooltips() {
    document.querySelectorAll('.vocab-question, .sentence-item').forEach(question => {
        const tooltip = document.createElement('div');
        tooltip.className = 'exercise-tooltip';
        tooltip.innerHTML = '💡 सुझाव देखने के लिए यहाँ क्लिक करें';
        tooltip.style.cursor = 'pointer';
        tooltip.style.fontSize = '0.8rem';
        tooltip.style.color = '#666';
        tooltip.style.marginTop = '5px';
        
        tooltip.addEventListener('click', function() {
            showExerciseHint(question);
        });
        
        question.appendChild(tooltip);
    });
}

// Show exercise hint
function showExerciseHint(questionElement) {
    const questionText = questionElement.querySelector('p').textContent;
    let hint = '';
    
    // Provide contextual hints based on question
    if (questionText.includes('अभियान')) {
        hint = 'अभियान शब्द "अभि" + "यान" से बना है। इसका संबंध किसी विशेष मिशन से है।';
    } else if (questionText.includes('दुर्गम')) {
        hint = 'दुर्गम का विपरीत "सुगम" होता है। सोचिए कि पहाड़ों के संदर्भ में यह क्या अर्थ दे सकता है।';
    } else if (questionText.includes('तेनजिंग')) {
        hint = 'जब कोई व्यक्ति किसी और के शब्दों को उद्धृत करता है तो कौन से विराम चिह्न का प्रयोग होता है?';
    } else {
        hint = 'पाठ में इस शब्द/वाक्य के संदर्भ को याद करें।';
    }
    
    // Show hint in a small popup
    const hintPopup = document.createElement('div');
    hintPopup.className = 'hint-popup';
    hintPopup.innerHTML = `
        <div class="hint-content">
            <button class="hint-close" onclick="this.parentNode.parentNode.remove()">×</button>
            <p>${hint}</p>
        </div>
    `;
    
    document.body.appendChild(hintPopup);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (hintPopup.parentNode) {
            hintPopup.remove();
        }
    }, 5000);
}

// Advanced vocabulary exercises
function createAdvancedVocabExercise() {
    const advancedWords = [
        { word: "आरोही", meaning: "ऊपर चढ़ने वाला", usage: "बछेंद्री एक कुशल आरोही थीं।" },
        { word: "नौसिखिया", meaning: "नया सीखने वाला", usage: "एवरेस्ट पर यह उनका पहला अभियान था, वे नौसिखिया थीं।" },
        { word: "उपलब्धि", meaning: "प्राप्ति", usage: "एवरेस्ट पर चढ़ना एक महान उपलब्धि थी।" }
    ];
    
    return advancedWords;
}

// Word usage exercise
function createWordUsageExercise(word, options, correctUsage) {
    return `
        <div class="word-usage-exercise">
            <h4>"${word}" का सही प्रयोग चुनिए:</h4>
            ${options.map((option, index) => `
                <div class="usage-option">
                    <input type="radio" id="usage${index}" name="wordUsage" value="${index}">
                    <label for="usage${index}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;
}

// Grammar pattern recognition
function createGrammarPatternExercise() {
    const patterns = [
        {
            pattern: "द्वंद्व समास",
            examples: ["माता-पिता", "सुख-दुख", "लाभ-हानि"],
            rule: "दो शब्दों के बीच योजक चिह्न (-) लगाकर बनाया जाता है"
        },
        {
            pattern: "भाववाचक संज्ञा", 
            examples: ["सफलता", "कठिनाई", "सुंदरता"],
            rule: "गुण, अवस्था या भाव को व्यक्त करने वाली संज्ञा"
        }
    ];
    
    return patterns;
}

// Interactive pronunciation guide
function createPronunciationGuide() {
    const difficultWords = [
        { word: "सागरमाथा", pronunciation: "सा-गर-मा-था", meaning: "एवरेस्ट का नेपाली नाम" },
        { word: "ल्होत्से", pronunciation: "ल्हो-त्से", meaning: "एवरेस्ट के पास का पर्वत" },
        { word: "आंगदोरजी", pronunciation: "आंग-दो-र्जी", meaning: "शेरपा गाइड का नाम" }
    ];
    
    return difficultWords.map(item => `
        <div class="pronunciation-item">
            <span class="word">${item.word}</span>
            <span class="pronunciation">[${item.pronunciation}]</span>
            <span class="meaning">${item.meaning}</span>
            <button class="pronounce-btn" onclick="speakWord('${item.word}')">🔊</button>
        </div>
    `).join('');
}

// Speak word using speech synthesis
function speakWord(word) {
    if (window.narrator && window.narrator.speak) {
        window.narrator.speak(word);
    } else if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'hi-IN';
        speechSynthesis.speak(utterance);
    }
}

// CSS for language exercises
const languageExerciseCSS = `
.hint-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 8px;
    z-index: 1000;
    max-width: 300px;
}

.hint-content {
    position: relative;
}

.hint-close {
    position: absolute;
    top: -10px;
    right: -10px;
    background: white;
    color: black;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
}

.exercise-tooltip {
    background: #f0f8ff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-top: 5px;
    transition: all 0.3s;
}

.exercise-tooltip:hover {
    background: #e3f2fd;
}

.word-usage-exercise {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.usage-option {
    margin: 10px 0;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 4px;
    cursor: pointer;
}

.usage-option:hover {
    background: #f9f9f9;
}

.pronunciation-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.pronunciation-item .word {
    font-weight: bold;
    min-width: 100px;
}

.pronunciation-item .pronunciation {
    color: #666;
    font-style: italic;
    min-width: 120px;
}

.pronunciation-item .meaning {
    flex: 1;
    font-size: 0.9rem;
}

.pronounce-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
}

.pronounce-btn:hover {
    background: #f0f0f0;
}

.character-count {
    font-size: 0.8rem;
    text-align: right;
    margin-top: 5px;
    color: #666;
}
`;

// Add language exercise styles
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = languageExerciseCSS;
    document.head.appendChild(style);
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('thinking-language')) {
        initializeLanguageExercises();
    }
});

// Export functions
window.languageExercises = {
    initializeLanguageExercises,
    createAdvancedVocabExercise,
    createWordUsageExercise,
    createGrammarPatternExercise,
    createPronunciationGuide,
    speakWord
};
