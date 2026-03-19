/**
 * Activity answers and validation for Chapter 3
 * तुम कब जाओगे, अतिथि - शरद जोशी
 */

// Answer keys and validation data for activities
const activityAnswers = {
    // Creative writing evaluation criteria
    creativeWriting: {
        minLength: 50,
        keywords: [
            'व्यंग्य', 'हास्य', 'समस्या', 'आधुनिक', 'समाज', 'जीवन',
            'मध्यमवर्गीय', 'विसंगति', 'परंपरा', 'बदलाव', 'तकनीक'
        ],
        scoringCriteria: {
            excellent: { minLength: 200, minKeywords: 3, score: 25 },
            good: { minLength: 100, minKeywords: 2, score: 20 },
            satisfactory: { minLength: 50, minKeywords: 1, score: 15 }
        }
    },
    
    // Discussion questions answers
    discussion: {
        question1: {
            correctAnswers: ['1', '2', '3'], // All options are acceptable
            feedback: {
                '1': 'आपने अतिथि की जिम्मेदारी पर ज़ोर दिया है। यह सही है कि अतिथि को समझना चाहिए।',
                '2': 'आपने संवाद की महत्ता को समझा है। स्पष्ट बातचीत से कई समस्याएं हल हो सकती हैं।',
                '3': 'संतुलित दृष्टिकोण! दोनों पक्षों की जिम्मेदारी को समझना महत्वपूर्ण है।'
            }
        },
        question2: {
            correctAnswers: ['1', '2', '3'], // All options are acceptable
            feedback: {
                '1': 'व्यावहारिक समाधान! पूर्व नियोजन से कई समस्याओं से बचा जा सकता है।',
                '2': 'बेहतरीन सुझाव! खुली बातचीत रिश्तों को मजबूत बनाती है।',
                '3': 'गहरी सोच! सामाजिक शिष्टाचार की नई परिभाषा वाकई आवश्यक है।'
            }
        }
    },
    
    // Vocabulary exercises
    vocabulary: {
        vocab1: "मेहमान",
        vocab2: "स्वागत", 
        vocab3: "आना",
        vocab4: "आतिथेय",
        vocab5: "धैर्य"
    },
    
    // Grammar exercises  
    grammar: {
        grammar1: "3", // तुम कभी नहीं जाओगे, अतिथि।
        grammar2: "1", // क्या अतिथि सदैव देवता होता है?
        grammar3: "1"  // मेरी सहनशीलता की वह अंतिम सुबह थी।
    }
};

// Enhanced creative writing validation
function validateCreativeWriting(text) {
    if (!text || text.trim().length === 0) {
        return {
            isValid: false,
            score: 0,
            feedback: 'कृपया अपना व्यंग्य लेख लिखें।',
            suggestions: ['किसी आधुनिक समस्या का चुनाव करें', 'हास्य-व्यंग्य की शैली अपनाएं', 'व्यावहारिक समाधान सुझाएं']
        };
    }
    
    const length = text.trim().length;
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    
    // Check for minimum length
    if (length < activityAnswers.creativeWriting.minLength) {
        return {
            isValid: false,
            score: 0,
            feedback: `कृपया कम से कम ${activityAnswers.creativeWriting.minLength} अक्षरों का लेख लिखें। वर्तमान में: ${length} अक्षर`,
            suggestions: ['अधिक विस्तार से लिखें', 'उदाहरण दें', 'अपने अनुभव साझा करें']
        };
    }
    
    // Count relevant keywords
    let keywordCount = 0;
    const lowerText = text.toLowerCase();
    
    activityAnswers.creativeWriting.keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
            keywordCount++;
        }
    });
    
    // Determine score based on criteria
    const criteria = activityAnswers.creativeWriting.scoringCriteria;
    let result = {
        isValid: true,
        score: 0,
        feedback: '',
        suggestions: []
    };
    
    if (length >= criteria.excellent.minLength && keywordCount >= criteria.excellent.minKeywords) {
        result.score = criteria.excellent.score;
        result.feedback = 'उत्कृष्ट! आपने शरद जोशी की शैली में बेहतरीन व्यंग्य लेख लिखा है। आपकी लेखनी में हास्य और व्यंग्य का अच्छा मिश्रण है।';
        result.suggestions = ['इसे और भी विस्तृत बनाया जा सकता है', 'कुछ और उदाहरण जोड़े जा सकते हैं'];
    } else if (length >= criteria.good.minLength && keywordCount >= criteria.good.minKeywords) {
        result.score = criteria.good.score;
        result.feedback = 'अच्छा प्रयास! आपने व्यंग्य लेखन की मूल भावना को समझा है। कुछ और सुधार के साथ यह और भी बेहतर हो सकता है।';
        result.suggestions = ['अधिक हास्य तत्व जोड़ें', 'समस्या का समाधान भी सुझाएं', 'व्यंग्य को और तीखा बनाएं'];
    } else {
        result.score = criteria.satisfactory.score;
        result.feedback = 'संतोषजनक प्रयास! आपने लेखन की शुरुआत अच्छी की है। अधिक अभ्यास से आप बेहतर व्यंग्य लेखक बन सकते हैं।';
        result.suggestions = ['व्यंग्य की तकनीक सीखें', 'रोजमर्रा की समस्याओं पर लिखें', 'हास्य और गंभीरता में संतुलन बनाएं'];
    }
    
    // Add word count info
    result.wordCount = wordCount;
    result.charCount = length;
    result.keywordCount = keywordCount;
    
    return result;
}

// Enhanced discussion validation
function validateDiscussion(question1Answer, question2Answer) {
    let results = {
        isValid: false,
        score: 0,
        feedback: '',
        question1Feedback: '',
        question2Feedback: ''
    };
    
    if (!question1Answer || !question2Answer) {
        results.feedback = 'कृपया दोनों प्रश्नों के उत्तर दें।';
        return results;
    }
    
    // Validate question 1
    if (activityAnswers.discussion.question1.correctAnswers.includes(question1Answer)) {
        results.question1Feedback = activityAnswers.discussion.question1.feedback[question1Answer];
        results.score += 10;
    }
    
    // Validate question 2  
    if (activityAnswers.discussion.question2.correctAnswers.includes(question2Answer)) {
        results.question2Feedback = activityAnswers.discussion.question2.feedback[question2Answer];
        results.score += 10; 
    }
    
    if (results.score > 0) {
        results.isValid = true;
        results.feedback = 'आपकी चर्चा सहेज ली गई है! आपने समस्या के विभिन्न पहलुओं पर गहराई से विचार किया है।';
    }
    
    return results;
}

// Enhanced vocabulary validation with detailed feedback
function validateVocabularyAnswers() {
    const answers = activityAnswers.vocabulary;
    let correctCount = 0;
    let totalCount = Object.keys(answers).length;
    let detailedFeedback = [];
    
    Object.keys(answers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const isCorrect = select.value === answers[id];
            const questionText = select.closest('.vocab-question').querySelector('p').textContent;
            
            if (isCorrect) {
                correctCount++;
                select.style.borderColor = '#4caf50';
                select.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                
                detailedFeedback.push({
                    question: questionText,
                    status: 'correct',
                    message: `सही उत्तर: ${answers[id]}`
                });
            } else {
                select.style.borderColor = '#f44336';
                select.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                
                detailedFeedback.push({
                    question: questionText,
                    status: 'incorrect', 
                    message: `सही उत्तर: ${answers[id]}, आपका उत्तर: ${select.value || 'नहीं चुना गया'}`
                });
            }
        }
    });
    
    return {
        correctCount,
        totalCount,
        percentage: Math.round((correctCount / totalCount) * 100),
        detailedFeedback,
        isExcellent: correctCount === totalCount,
        isGood: correctCount >= Math.ceil(totalCount * 0.8),
        isSatisfactory: correctCount >= Math.ceil(totalCount * 0.6)
    };
}

// Enhanced grammar validation
function validateGrammarAnswers() {
    const answers = activityAnswers.grammar;
    let correctCount = 0;
    let totalCount = Object.keys(answers).length;
    let detailedFeedback = [];
    
    Object.keys(answers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const isCorrect = select.value === answers[id];
            const questionElement = select.closest('.grammar-item').querySelector('p');
            const questionText = questionElement ? questionElement.textContent : '';
            
            if (isCorrect) {
                correctCount++;
                select.style.borderColor = '#4caf50';
                select.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                
                detailedFeedback.push({
                    question: questionText,
                    status: 'correct',
                    message: 'सही उत्तर!'
                });
            } else {
                select.style.borderColor = '#f44336';
                select.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                
                detailedFeedback.push({
                    question: questionText,
                    status: 'incorrect',
                    message: 'गलत उत्तर - पुन: प्रयास करें'
                });
            }
            
            // Add visual feedback animation
            select.classList.add(isCorrect ? 'correct-answer' : 'incorrect-answer');
            setTimeout(() => {
                select.classList.remove('correct-answer', 'incorrect-answer');
            }, 2000);
        }
    });
    
    return {
        correctCount,
        totalCount,
        percentage: Math.round((correctCount / totalCount) * 100),
        detailedFeedback,
        isExcellent: correctCount === totalCount,
        isGood: correctCount >= Math.ceil(totalCount * 0.8),
        isSatisfactory: correctCount >= Math.ceil(totalCount * 0.6)
    };
}

// Function to provide writing tips based on text analysis
function getWritingTips(text) {
    const tips = [];
    
    // Check for sentence variety
    const sentences = text.split(/[.!?।]/);
    if (sentences.length < 3) {
        tips.push('अधिक वाक्यों का प्रयोग करें');
    }
    
    // Check for dialogue usage
    if (!text.includes('"') && !text.includes("'")) {
        tips.push('संवाद का प्रयोग करें');
    }
    
    // Check for descriptive language
    const descriptiveWords = ['सुंदर', 'भयानक', 'अद्भुत', 'विचित्र', 'हास्यास्पद'];
    const hasDescriptive = descriptiveWords.some(word => text.includes(word));
    if (!hasDescriptive) {
        tips.push('वर्णनात्मक शब्दों का प्रयोग करें');
    }
    
    // Check for humor elements
    const humorWords = ['हंसी', 'मज़ाक', 'हास्य', 'मजेदार', 'विनोद'];
    const hasHumor = humorWords.some(word => text.includes(word));
    if (!hasHumor) {
        tips.push('हास्य तत्व जोड़ें');
    }
    
    return tips;
}

// Function to check writing style similarity with Sharad Joshi
function checkStyleSimilarity(text) {
    const joshiStyleMarkers = [
        'मध्यमवर्गीय', 'परेशानी', 'समस्या', 'हास्यास्पद', 'विडंबना',
        'क्या', 'कैसे', 'अरे', 'बेचारा', 'गजब', 'कमाल'
    ];
    
    let styleScore = 0;
    const lowerText = text.toLowerCase();
    
    joshiStyleMarkers.forEach(marker => {
        if (lowerText.includes(marker)) {
            styleScore++;
        }
    });
    
    const maxScore = joshiStyleMarkers.length;
    const percentage = Math.round((styleScore / maxScore) * 100);
    
    let styleFeedback = '';
    if (percentage >= 70) {
        styleFeedback = 'आपकी शैली शरद जोशी से बहुत मिलती है!';
    } else if (percentage >= 50) {
        styleFeedback = 'आप शरद जोशी की शैली की दिशा में जा रहे हैं।';
    } else if (percentage >= 30) {
        styleFeedback = 'कुछ और अभ्यास से आप शरद जोशी की शैली के करीब पहुंच सकते हैं।';
    } else {
        styleFeedback = 'शरद जोशी की शैली सीखने के लिए उनकी और रचनाएं पढ़ें।';
    }
    
    return {
        score: styleScore,
        percentage,
        feedback: styleFeedback,
        suggestions: percentage < 50 ? [
            'रोजमर्रा की भाषा का प्रयोग करें',
            'मध्यमवर्गीय समस्याओं पर लिखें', 
            'प्रश्नवाचक वाक्यों का प्रयोग करें',
            'हास्य और व्यंग्य में संतुलन बनाएं'
        ] : []
    };
}

// Global function to save and validate creative writing
window.saveCreativeWriting = function() {
    const writingText = document.getElementById('creativeWriting');
    const feedbackEl = document.getElementById('writingFeedback');
    
    if (!writingText || !feedbackEl) {
        console.error('Writing elements not found');
        return;
    }
    
    const text = writingText.value;
    const validation = validateCreativeWriting(text);
    
    if (!validation.isValid) {
        feedbackEl.innerHTML = `
            <div class="feedback-header">❌ ${validation.feedback}</div>
            <div class="feedback-suggestions">
                <strong>सुझाव:</strong>
                <ul>
                    ${validation.suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `;
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Get additional analysis
    const tips = getWritingTips(text);
    const styleAnalysis = checkStyleSimilarity(text);
    
    // Create detailed feedback
    let feedbackHTML = `
        <div class="feedback-header">✅ ${validation.feedback}</div>
        <div class="feedback-stats">
            <div class="stat-item">📝 शब्द: ${validation.wordCount}</div>
            <div class="stat-item">🔤 अक्षर: ${validation.charCount}</div>
            <div class="stat-item">🎯 मुख्य शब्द: ${validation.keywordCount}</div>
            <div class="stat-item">⭐ स्कोर: ${validation.score}/25</div>
        </div>
        <div class="style-analysis">
            <h4>शैली विश्लेषण:</h4>
            <p>${styleAnalysis.feedback} (${styleAnalysis.percentage}% समानता)</p>
        </div>
    `;
    
    if (tips.length > 0) {
        feedbackHTML += `
            <div class="writing-tips">
                <h4>सुधार के सुझाव:</h4>
                <ul>
                    ${tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (styleAnalysis.suggestions.length > 0) {
        feedbackHTML += `
            <div class="style-tips">
                <h4>शैली सुधार:</h4>
                <ul>
                    ${styleAnalysis.suggestions.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    feedbackEl.innerHTML = feedbackHTML;
    feedbackEl.className = 'feedback-message show success';
    
    // Update score
    if (typeof score !== 'undefined') {
        score += validation.score;
        if (document.getElementById('totalScore')) {
            document.getElementById('totalScore').textContent = score;
        }
    }
    
    // Mark module as completed
    if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('रचनात्मक लेखन पूर्ण!');
        }
    }
    
    // Narrate feedback
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(`आपका लेख सहेज लिया गया है। आपको ${validation.score} अंक मिले हैं।`);
    }
};

// Global function to save and validate discussion
window.saveDiscussion = function() {
    const discuss1 = document.querySelector('input[name="discuss1"]:checked');
    const discuss2 = document.querySelector('input[name="discuss2"]:checked');
    const feedbackEl = document.getElementById('discussionFeedback');
    
    if (!feedbackEl) {
        console.error('Discussion feedback element not found');
        return;
    }
    
    const validation = validateDiscussion(
        discuss1 ? discuss1.value : null,
        discuss2 ? discuss2.value : null
    );
    
    if (!validation.isValid) {
        feedbackEl.textContent = validation.feedback;
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Create detailed feedback
    let feedbackHTML = `
        <div class="feedback-header">✅ ${validation.feedback}</div>
        <div class="discussion-analysis">
            <div class="question-feedback">
                <strong>प्रश्न 1:</strong> ${validation.question1Feedback}
            </div>
            <div class="question-feedback">
                <strong>प्रश्न 2:</strong> ${validation.question2Feedback}
            </div>
        </div>
        <div class="score-display">
            आपको ${validation.score}/20 अंक मिले हैं।
        </div>
    `;
    
    feedbackEl.innerHTML = feedbackHTML;
    feedbackEl.className = 'feedback-message show success';
    
    // Update score
    if (typeof score !== 'undefined') {
        score += validation.score;
        if (document.getElementById('totalScore')) {
            document.getElementById('totalScore').textContent = score;
        }
    }
    
    // Mark module as completed
    if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('चर्चा गतिविधि पूर्ण!');
        }
    }
    
    // Narrate feedback
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(`चर्चा पूर्ण। आपको ${validation.score} अंक मिले हैं।`);
    }
};

// Additional CSS for enhanced feedback
const activityAnswerStyles = `
<style>
.feedback-header {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 10px;
}

.feedback-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    margin: 15px 0;
    padding: 15px;
    background: rgba(0,0,0,0.05);
    border-radius: 8px;
}

.stat-item {
    text-align: center;
    padding: 8px;
    background: white;
    border-radius: 4px;
    font-weight: 500;
}

.style-analysis {
    margin: 15px 0;
    padding: 12px;
    background: #e3f2fd;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
}

.writing-tips,
.style-tips {
    margin: 15px 0;
    padding: 12px;
    background: #fff3e0;
    border-radius: 8px;
    border-left: 4px solid #ff9800;
}

.writing-tips ul,
.style-tips ul {
    margin: 8px 0 0 20px;
}

.writing-tips li,
.style-tips li {
    margin: 5px 0;
}

.discussion-analysis {
    margin: 15px 0;
}

.question-feedback {
    margin: 10px 0;
    padding: 10px;
    background: rgba(76, 175, 80, 0.1);
    border-radius: 6px;
    border-left: 3px solid #4caf50;
}

.score-display {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: #2e7d32;
    margin: 15px 0;
    padding: 10px;
    background: #e8f5e9;
    border-radius: 8px;
}

.correct-answer {
    animation: correctPulse 1s ease;
}

.incorrect-answer {
    animation: incorrectShake 0.5s ease;
}

@keyframes correctPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes incorrectShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .feedback-stats {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', activityAnswerStyles);
