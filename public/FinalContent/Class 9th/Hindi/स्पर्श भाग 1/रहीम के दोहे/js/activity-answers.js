/**
 * Answer keys and feedback for Rahim Ke Dohe activities
 */

// Listening activity answers
const listeningAnswers = {
    birthYear: "1556",
    court: "अकबर",
    birthPlace: "लाहौर"
};

// Writing activity answers
const writingAnswers = {
    option: "1" // Best answer option
};

// Reflection activity answers
const reflectionAnswers = {
    best: "3", // Best answer
    acceptable: ["1", "2", "3"] // All options are acceptable
};

// Answer feedback messages
const answerFeedback = {
    birthYear: {
        "1556": "✓ सही! रहीम का जन्म 1556 में हुआ था।",
        "1550": "✗ गलत। रहीम का जन्म 1556 में हुआ था।",
        "1560": "✗ गलत। रहीम का जन्म 1556 में हुआ था।"
    },
    court: {
        "अकबर": "✓ सही! रहीम अकबर के दरबार में थे।",
        "शाहजहाँ": "✗ गलत। रहीम अकबर के दरबार में थे।",
        "औरंगजेब": "✗ गलत। रहीम अकबर के दरबार में थे।"
    },
    birthPlace: {
        "लाहौर": "✓ सही! रहीम का जन्म लाहौर में हुआ था।",
        "दिल्ली": "✗ गलत। रहीम का जन्म लाहौर में हुआ था।",
        "आगरा": "✗ गलत। रहीम का जन्म लाहौर में हुआ था।"
    },
    narrative: {
        "1": "✓ अच्छा विकल्प! रहीम के नीतिपरक दोहों की महत्ता पर आपका विचार सही है।",
        "2": "✓ अच्छा विकल्प! रहीम के दोहों की सरलता और प्रभावशीलता पर आपका विचार सही है।",
        "3": "✓ अच्छा विकल्प! रहीम के दोहों की प्रासंगिकता पर आपका विचार सही है।"
    },
    reflection: {
        "1": "✓ अच्छा विचार! नीतिपरक शिक्षाओं की महत्ता पर आपका विचार सही है।",
        "2": "✓ अच्छा विचार! दोहे शब्द के अर्थ और नीतिपरक शिक्षाओं की महत्ता पर आपका विचार सही है।",
        "3": "✓ उत्कृष्ट विचार! रहीम के दोहों की महत्ता और प्रासंगिकता पर आपका विचार बहुत अच्छा है।",
        "4": "✓ अच्छा विचार! अनुभवजन्य ज्ञान की महत्ता पर आपका विचार सही है।"
    },
    writing: {
        "1": "✓ उत्कृष्ट चयन! मानवीय संबंधों पर रहीम के विचारों की प्रासंगिकता पर आपका विचार बहुत अच्छा है।",
        "2": "✓ अच्छा चयन! नैतिक मूल्यों के संदर्भ में रहीम के विचारों की प्रासंगिकता पर आपका विचार सही है।",
        "3": "✓ अच्छा चयन! सामाजिक समरसता पर रहीम के विचारों की प्रासंगिकता पर आपका विचार सही है।",
        "4": "✓ अच्छा चयन! जीवन की सीख के महत्व पर रहीम के विचारों की प्रासंगिकता पर आपका विचार सही है।"
    }
};

// Make variables globally available
window.listeningAnswers = listeningAnswers;
window.writingAnswers = writingAnswers;
window.reflectionAnswers = reflectionAnswers;
window.answerFeedback = answerFeedback;
