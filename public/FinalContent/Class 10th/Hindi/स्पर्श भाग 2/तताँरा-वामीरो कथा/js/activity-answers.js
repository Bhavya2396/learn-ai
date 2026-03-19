/**
 * Activity answers and validation for Tatara-Vamiro interactive Hindi lesson
 */

// Reflection answers (which answers are best/acceptable)
const reflectionAnswers = {
    best: "3", // This is the index of the best answer for the reflection activity
    acceptable: ["2"] // This is also a good answer
};

// Define vocabulary answers
const vocabularyAnswers = {
    vocab1: "आत्मीय",
    vocab2: "निर्निमेष",
    vocab3: "अचंभित",
    vocab4: "आशंका",
    vocab5: "विलक्षण"
};

// Define sentence types
const sentenceTypeAnswers = {
    contraction1: "विधानवाचक",
    contraction2: "प्रश्नवाचक",
    contraction3: "विस्मयादिबोधक"
};

// Answers for the listening activity
const listeningAnswers = {
    country: "भारत",
    narrative: "3" // This is the index of the correct narrative option
};

// Answers for the writing activity
const writingAnswers = {
    best: "4", // All themes are present in the story - this is the only correct answer
    acceptable: [] // No other acceptable answers
};

// Feedback for different answer options
const answerFeedback = {
    // Reflection activity feedback
    reflection: {
        "1": "अच्छा प्रयास! लेकिन आप और गहराई से सोचें कि तताँरा और वामीरो के बलिदान का महत्व क्या था।",
        "2": "अच्छा विचार! तताँरा और वामीरो के बलिदान से वैवाहिक संबंध संभव हुए, लेकिन इसका और गहरा सामाजिक प्रभाव क्या था?",
        "3": "शानदार! आपने सही पहचाना कि तताँरा और वामीरो का बलिदान एक शक्तिशाली प्रतीक है जिसने पुरानी रूढ़ियों को तोड़कर समाज को एक नई दिशा दी।",
        "4": "अच्छा प्रयास! लेकिन इस कहानी को महज़ एक लोककथा मानना इसके गहरे सामाजिक और सांस्कृतिक महत्व की उपेक्षा करना है।"
    },
    
    // Vocabulary activity feedback
    vocabulary: {
        all_correct: "शाबाश! आपने सभी शब्दों के अर्थ सही पहचाने हैं!",
        some_correct: "अच्छा प्रयास! आपने कुछ शब्दों के अर्थ सही पहचाने हैं। शेष शब्दों पर पुनः विचार करें।",
        none_correct: "फिर से प्रयास करें! आपने कोई भी शब्द का अर्थ सही नहीं पहचाना है।"
    },
    
    // Sentence type activity feedback
    contraction: {
        all_correct: "शाबाश! आपने सभी वाक्य प्रकारों को सही पहचाना है!",
        some_correct: "अच्छा प्रयास! आपने कुछ वाक्य प्रकारों को सही पहचाना है। शेष पर पुनः विचार करें।",
        none_correct: "फिर से प्रयास करें! आपने किसी भी वाक्य प्रकार को सही नहीं पहचाना है।"
    },
    
    // Listening activity feedback
    listening: {
        correct: "शाबाश! आपने अंदमान-निकोबार द्वीपसमूह के बारे में तथ्यों को सही पहचाना है।",
        incorrect: "इन तथ्यों पर पुनः विचार करें। अंदमान-निकोबार द्वीपसमूह भारत का एक केंद्र शासित प्रदेश है।"
    },
    
    // Writing activity feedback
    writing: {
        "1": "यह उत्तर सही नहीं है। प्रेम की शक्ति कहानी का एक महत्वपूर्ण विषय है, लेकिन यह एकमात्र विषय नहीं है।",
        "2": "यह उत्तर सही नहीं है। सामाजिक रूढ़ियों पर प्रहार कहानी का एक प्रमुख विषय है, लेकिन यह एकमात्र विषय नहीं है।",
        "3": "यह उत्तर सही नहीं है। बलिदान का महत्व कहानी का एक महत्वपूर्ण संदेश है, लेकिन यह एकमात्र विषय नहीं है।",
        "4": "शाबाश! आपका उत्तर बिलकुल सही है। कहानी में प्रेम की शक्ति, सामाजिक रूढ़ियों पर प्रहार, बलिदान का महत्व और परिवर्तन की आवश्यकता - सभी विचार समाहित हैं।"
    }
};
