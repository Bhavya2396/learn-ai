/**
 * Activity answers and feedback for Diary Ka Ek Panna
 */

// Reflection activity answers
const reflectionAnswers = {
    best: 'स्वतंत्रता दिवस मनाना और देशभक्ति की भावना',
    acceptable: [
        'स्वतंत्रता दिवस मनाना और देशभक्ति की भावना',
        'रैली में भाग लेना और राष्ट्रीय गान गाना',
        'परिवार के साथ स्वतंत्रता सेनानियों को याद करना',
        'दोस्तों के साथ पार्क में स्वतंत्रता दिवस का कार्यक्रम देखना'
    ]
};

// Listening activity answers
const listeningAnswers = {
    'birth-year': '1892',
    'guru': 'स्वतंत्रता आंदोलन',
    'death-place': 'कोलकाता',
    'narrative': 'स्वतंत्रता आंदोलन में भाग लेने वाले व्यक्ति'
};

// Writing activity answers
const writingAnswers = {
    best: 'स्वतंत्रता सेनानियों के बारे में लिखना',
    acceptable: [
        'स्वतंत्रता सेनानियों के बारे में लिखना',
        '26 जनवरी 1931 के दिन की घटनाओं के बारे में लिखना',
        'देशभक्ति की भावना के बारे में लिखना',
        'स्वतंत्रता आंदोलन के बारे में लिखना'
    ]
};

// Answer feedback messages
const answerFeedback = {
    reflection: {
        'स्वतंत्रता दिवस मनाना और देशभक्ति की भावना': 'उत्कृष्ट! आपने पाठ का मुख्य भाव समझा है। स्वतंत्रता दिवस मनाना और देशभक्ति की भावना ही इस पाठ का केंद्रीय विषय है।',
        'रैली में भाग लेना और राष्ट्रीय गान गाना': 'बहुत अच्छा! यह भी पाठ का एक महत्वपूर्ण हिस्सा है। रैली और राष्ट्रीय गान देशभक्ति की भावना को व्यक्त करते हैं।',
        'परिवार के साथ स्वतंत्रता सेनानियों को याद करना': 'अच्छा विचार! परिवार के साथ स्वतंत्रता सेनानियों को याद करना भी देशभक्ति की भावना का हिस्सा है।',
        'दोस्तों के साथ पार्क में स्वतंत्रता दिवस का कार्यक्रम देखना': 'यह भी एक अच्छा उत्तर है। पार्क में स्वतंत्रता दिवस का कार्यक्रम देखना भी देशभक्ति की भावना को दर्शाता है।',
        'कुछ और': 'आपका विचार भी सही हो सकता है। कृपया अपने विचार साझा करें।'
    },
    
    listening: {
        '1892': 'सही! सीताराम सेकसरिया का जन्म 1892 में हुआ था।',
        '1890': 'गलत। सीताराम सेकसरिया का जन्म 1892 में हुआ था।',
        '1895': 'गलत। सीताराम सेकसरिया का जन्म 1892 में हुआ था।',
        '1900': 'गलत। सीताराम सेकसरिया का जन्म 1892 में हुआ था।',
        
        'स्वतंत्रता आंदोलन': 'सही! सीताराम सेकसरिया स्वतंत्रता आंदोलन से जुड़े थे।',
        'व्यापार': 'गलत। सीताराम सेकसरिया स्वतंत्रता आंदोलन से जुड़े थे।',
        'शिक्षा': 'गलत। सीताराम सेकसरिया स्वतंत्रता आंदोलन से जुड़े थे।',
        'कला': 'गलत। सीताराम सेकसरिया स्वतंत्रता आंदोलन से जुड़े थे।',
        
        'कोलकाता': 'सही! सीताराम सेकसरिया का अधिकांश जीवन कोलकाता में बीता।',
        'दिल्ली': 'गलत। सीताराम सेकसरिया का अधिकांश जीवन कोलकाता में बीता।',
        'मुंबई': 'गलत। सीताराम सेकसरिया का अधिकांश जीवन कोलकाता में बीता।',
        'चेन्नई': 'गलत। सीताराम सेकसरिया का अधिकांश जीवन कोलकाता में बीता।',
        
        'स्वतंत्रता आंदोलन में भाग लेने वाले व्यक्ति': 'सही! सीताराम सेकसरिया स्वतंत्रता आंदोलन में भाग लेने वाले व्यक्ति थे।',
        'व्यापारी': 'गलत। सीताराम सेकसरिया स्वतंत्रता आंदोलन में भाग लेने वाले व्यक्ति थे।',
        'शिक्षक': 'गलत। सीताराम सेकसरिया स्वतंत्रता आंदोलन में भाग लेने वाले व्यक्ति थे।',
        'कलाकार': 'गलत। सीताराम सेकसरिया स्वतंत्रता आंदोलन में भाग लेने वाले व्यक्ति थे।'
    },
    
    writing: {
        'स्वतंत्रता सेनानियों के बारे में लिखना': 'उत्कृष्ट! स्वतंत्रता सेनानियों के बारे में लिखना एक बहुत अच्छा विषय है। यह पाठ के साथ सीधा संबंध रखता है।',
        '26 जनवरी 1931 के दिन की घटनाओं के बारे में लिखना': 'बहुत अच्छा! 26 जनवरी 1931 के दिन की घटनाओं के बारे में लिखना पाठ के साथ सीधा संबंध रखता है।',
        'देशभक्ति की भावना के बारे में लिखना': 'अच्छा विचार! देशभक्ति की भावना के बारे में लिखना भी पाठ के साथ संबंध रखता है।',
        'स्वतंत्रता आंदोलन के बारे में लिखना': 'यह भी एक अच्छा विषय है। स्वतंत्रता आंदोलन के बारे में लिखना पाठ के साथ संबंध रखता है।',
        'कुछ और': 'आपका विचार भी सही हो सकता है। कृपया अपने विचार साझा करें।'
    }
};

// Get feedback for a specific answer
function getFeedback(category, answer) {
    if (answerFeedback[category] && answerFeedback[category][answer]) {
        return answerFeedback[category][answer];
    }
    return 'आपका उत्तर सहेज लिया गया है।';
}

// Check if answer is correct
function isCorrectAnswer(category, answer) {
    switch (category) {
        case 'reflection':
            return reflectionAnswers.acceptable.includes(answer);
        case 'listening':
            return Object.values(listeningAnswers).includes(answer);
        case 'writing':
            return writingAnswers.acceptable.includes(answer);
        default:
            return false;
    }
}

// Check if answer is the best answer
function isBestAnswer(category, answer) {
    switch (category) {
        case 'reflection':
            return answer === reflectionAnswers.best;
        case 'writing':
            return answer === writingAnswers.best;
        default:
            return false;
    }
}

// Get score for an answer
function getAnswerScore(category, answer) {
    if (isBestAnswer(category, answer)) {
        return 20; // Best answer gets full points
    } else if (isCorrectAnswer(category, answer)) {
        return 15; // Acceptable answer gets partial points
    } else {
        return 5; // Any other answer gets minimal points
    }
}

// Show feedback for an answer
function showAnswerFeedback(category, answer, feedbackElement) {
    const feedback = getFeedback(category, answer);
    const isCorrect = isCorrectAnswer(category, answer);
    const isBest = isBestAnswer(category, answer);
    
    // Set feedback text
    feedbackElement.textContent = feedback;
    
    // Set feedback class based on correctness
    feedbackElement.className = 'feedback-message show';
    if (isBest) {
        feedbackElement.classList.add('success');
    } else if (isCorrect) {
        feedbackElement.classList.add('partial-success');
    } else {
        feedbackElement.classList.add('error');
    }
    
    // Update score
    const score = getAnswerScore(category, answer);
    window.score += score;
    document.getElementById('totalScore').textContent = window.score;
    
    // Show achievement if it's a good answer
    if (isBest) {
        showAchievement('उत्कृष्ट उत्तर!');
    } else if (isCorrect) {
        showAchievement('अच्छा उत्तर!');
    }
    
    // Speak the feedback
    if (window.narrator) {
        window.narrator.speak(feedback);
    }
}
