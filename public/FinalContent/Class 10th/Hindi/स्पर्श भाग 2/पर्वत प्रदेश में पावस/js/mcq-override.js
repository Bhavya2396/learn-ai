/**
 * This file overrides the existing question functionality with multiple choice questions
 * based on the exact content from hindi 4.txt
 */

// Questions for Poem (कविता) - Using exact questions from hindi 4.txt
const poemQuestions = [
    {
        question: "पावस ऋतु में प्रकृति में कौन-कौन से परिवर्तन आते हैं? कविता के आधार पर स्पष्ट कीजिए।",
        options: [
            "केवल पहाड़ों पर बर्फ जमती है और वृक्ष हरे हो जाते हैं।",
            "प्रकृति का रूप पल-पल परिवर्तित होता रहता है, मेखलाकार पर्वत अपना प्रतिबिंब जल में देखते हैं, और झरने बहते हैं।",
            "केवल नदियों का जल स्तर बढ़ता है और आसपास हरियाली छा जाती है।",
            "केवल वृक्षों पर नए पत्ते आते हैं और फूल खिलते हैं।"
        ],
        correctAnswer: 1,
        explanation: "कविता के अनुसार पावस ऋतु में प्रकृति का रूप पल-पल परिवर्तित होता रहता है, मेखलाकार पर्वत अपना प्रतिबिंब जल में देखते हैं, और झरने बहते हैं।"
    },
    {
        question: "'मेखलाकार' शब्द का क्या अर्थ है? कवि ने इस शब्द का प्रयोग यहाँ क्यों किया है?",
        options: [
            "गोल आकार का, क्योंकि पहाड़ गोलाकार होते हैं।",
            "ऊँचा और विशाल, क्योंकि पहाड़ ऊँचे होते हैं।",
            "करघनी के आकार की पहाड़ की ढाल, क्योंकि कवि ने पहाड़ की ढाल की तुलना करधनी से की है।",
            "मेखला नामक पहाड़, क्योंकि कवि उसी पहाड़ के बारे में बात कर रहे हैं।"
        ],
        correctAnswer: 2,
        explanation: "मेखलाकार का अर्थ करघनी के आकार की पहाड़ की ढाल होता है। कवि ने पहाड़ की ढाल की तुलना करधनी से की है क्योंकि पहाड़ की श्रृंखलाबद्ध आकृति करधनी जैसी दिखती है।"
    },
    {
        question: "'सहस्र दृग-सुमन' से क्या तात्पर्य है? कवि ने इस पद का प्रयोग किसके लिए किया होगा?",
        options: [
            "हज़ारों फूल, पहाड़ों पर खिले फूलों के लिए।",
            "हज़ारों आँखें, पहाड़ों पर स्थित हज़ारों छोटी झीलों या फूलों के लिए जो आँखों की तरह दिखते हैं।",
            "सूरज की किरणें, जो पहाड़ों पर चमकती हैं।",
            "पहाड़ की चोटियाँ, जो दूर से देखने पर फूलों जैसी दिखती हैं।"
        ],
        correctAnswer: 1,
        explanation: "सहस्र का अर्थ हज़ार है और दृग-सुमन का अर्थ आँखें है। यह पहाड़ों पर स्थित हज़ारों छोटी झीलों या फूलों की आँखों से की गई तुलना है, जिससे मानवीकरण अलंकार का प्रयोग हुआ है।"
    },
    {
        question: "कवि ने तालाब की समानता किसके साथ दिखाई है और क्यों?",
        options: [
            "समुद्र के साथ, क्योंकि दोनों में पानी होता है।",
            "आकाश के साथ, क्योंकि दोनों नीले होते हैं।",
            "दर्पण (आईने) के साथ, क्योंकि पहाड़ अपना प्रतिबिंब तालाब में देखता है।",
            "फूल के साथ, क्योंकि तालाब के किनारे फूल खिलते हैं।"
        ],
        correctAnswer: 2,
        explanation: "कविता में तालाब की तुलना दर्पण (आईने) से की गई है, जिसमें पहाड़ अपना प्रतिबिंब देखता है। कवि ने 'जिसके चरणों में पला ताल दर्पण-सा फैला है विशाल!' पंक्ति में इसका वर्णन किया है।"
    },
    {
        question: "पर्वत के हृदय से उठकर ऊँचे-ऊँचे वृक्ष आकाश की ओर क्यों देख रहे थे और वे किस बात को प्रतिबिंबित करते हैं?",
        options: [
            "सूरज को देखने के लिए, वे प्रकाश की ओर आकर्षण को प्रतिबिंबित करते हैं।",
            "उच्चाकांक्षाओं के कारण, वे मनुष्य की महत्वाकांक्षाओं का प्रतीक हैं और आने वाले बदलाव का पूर्वाभास देते हैं।",
            "आने वाली वर्षा को देखने के लिए, वे प्रकृति के प्रति सचेतता को प्रतिबिंबित करते हैं।",
            "पक्षियों को देखने के लिए, वे प्राकृतिक संतुलन को प्रतिबिंबित करते हैं।"
        ],
        correctAnswer: 1,
        explanation: "वृक्ष उच्चाकांक्षाओं (ऊँचा उठने की कामना) के कारण आकाश को देख रहे हैं। वे मनुष्य की महत्वाकांक्षाओं का प्रतीक हैं और चिंतापूर्वक एकटक आकाश को देख रहे हैं, जो आने वाले बदलाव का पूर्वाभास देते हैं।"
    },
    {
        question: "शाल के वृक्ष भयभीत होकर धरती में क्यों धँस गए?",
        options: [
            "भूकंप के कारण",
            "अत्यधिक वर्षा के कारण मिट्टी का कटाव होने से",
            "बिजली के चमकने और बादलों के गरजने से डरकर",
            "तेज हवाओं के कारण"
        ],
        correctAnswer: 2,
        explanation: "कविता में वर्णित है कि बिजली के चमकने और बादलों के गरजने से भयभीत होकर शाल के वृक्ष धरती में धँस गए। यह प्रकृति के भयावह रूप का वर्णन है।"
    },
    {
        question: "झरने किसके गौरव का गान कर रहे हैं? बहते हुए झरने की तुलना किससे की गई है?",
        options: [
            "सूरज के गौरव का, झरने की तुलना सूरज की किरणों से की गई है।",
            "पर्वत (गिरि) के गौरव का, झरने की तुलना मोतियों की लड़ियों से की गई है।",
            "वर्षा के गौरव का, झरने की तुलना बादलों से की गई है।",
            "वनों के गौरव का, झरने की तुलना हरियाली से की गई है।"
        ],
        correctAnswer: 1,
        explanation: "झरने पर्वत (गिरि) के गौरव का गान कर रहे हैं। बहते हुए झरने की तुलना मोतियों की लड़ियों से की गई है - 'गिरि का गौरव गाकर झर-झर... मोती की लड़ियों से सुंदर झरते हैं झाग भरे निर्झर!'"
    },
    {
        question: "'है टूट पड़ा भू पर अंबर' का भाव स्पष्ट कीजिए।",
        options: [
            "आकाश खंडित हो गया है, यह प्रकृति के विनाश का प्रतीक है।",
            "तारे टूट कर गिर रहे हैं, यह उल्का वर्षा का वर्णन है।",
            "भारी वर्षा होना, जिससे ऐसा लगता है कि आकाश धरती पर टूट पड़ा है। यह अतिशयोक्ति अलंकार का प्रयोग है।",
            "आकाश और धरती का मिलन, यह प्रकृति के विभिन्न तत्वों के एकीकरण का प्रतीक है।"
        ],
        correctAnswer: 2,
        explanation: "इस पंक्ति में वर्षा के प्रचंड रूप का वर्णन है, जिसमें ऐसा लगता है कि आकाश धरती पर टूट पड़ा है। यह अतिशयोक्ति अलंकार का प्रयोग है जिससे वर्षा की प्रचंडता का बोध होता है।"
    },
    {
        question: "'यों जलद-यान में विचर-विचर था इंद्र खेलता इंद्रजाल' का भाव स्पष्ट कीजिए।",
        options: [
            "इंद्र देवता अपने वाहन पर सवार होकर आकाश में घूम रहे थे।",
            "बादलों के विमान में घूम-घूमकर इंद्र देवता जादू दिखा रहे थे, अर्थात बादलों, बिजली और वर्षा के माध्यम से प्रकृति में अद्भुत परिवर्तन हो रहे थे।",
            "इंद्रधनुष आकाश में दिखाई दे रहा था।",
            "इंद्र देवता वर्षा के लिए प्रार्थना कर रहे थे।"
        ],
        correctAnswer: 1,
        explanation: "इस पंक्ति का भाव है कि बादलों के विमान में घूम-घूमकर इंद्र देवता जादू दिखा रहे थे, अर्थात बादलों, बिजली और वर्षा के माध्यम से प्रकृति में अद्भुत परिवर्तन हो रहे थे। यह पौराणिक संदर्भ का प्रयोग करके प्राकृतिक घटना का काव्यात्मक वर्णन है।"
    },
    {
        question: "'गिरिवर के उर से उठ-उठ कर उच्चाकांक्षाओं से तरुवर हैं झाँक रहे नीरव नभ पर अनिमेष, अटल, कुछ चिंतापर' का भाव स्पष्ट कीजिए।",
        options: [
            "पहाड़ से उगे वृक्ष केवल आकाश की ओर बढ़ रहे हैं।",
            "वृक्ष अपनी शाखाओं को आकाश की ओर फैला रहे हैं।",
            "पर्वत के हृदय से उठकर वृक्ष अपनी उच्चाकांक्षाओं के कारण शांत आकाश को एकटक, अटल और चिंतित भाव से देख रहे हैं। यह मानवीय भावनाओं का प्रकृति पर आरोपण है।",
            "वृक्ष पर्वत से ऊपर उठकर आकाश को छूना चाहते हैं।"
        ],
        correctAnswer: 2,
        explanation: "इस पंक्ति का भाव है कि पर्वत के हृदय से उठकर वृक्ष अपनी उच्चाकांक्षाओं के कारण शांत आकाश को एकटक, अटल और चिंतित भाव से देख रहे हैं। यह मानवीय भावनाओं का प्रकृति पर आरोपण है, जिससे मानवीकरण अलंकार का सुंदर प्रयोग हुआ है।"
    }
];

// Questions about the beauty of the poem (कविता का सौंदर्य)
const poeticBeautyQuestions = [
    {
        question: "इस कविता में मानवीकरण अलंकार का प्रयोग किस प्रकार किया गया है? स्पष्ट कीजिए।",
        options: [
            "केवल झरनों को मानवीय विशेषताओं से युक्त दिखाया गया है।",
            "केवल पहाड़ों को मानवीय विशेषताओं से युक्त दिखाया गया है।",
            "कविता में पहाड़, वृक्ष, झरने आदि प्राकृतिक तत्वों को मानवीय विशेषताओं और भावनाओं से युक्त दिखाया गया है, जैसे पहाड़ का अपना प्रतिबिंब देखना, वृक्षों का चिंतित होना आदि।",
            "कविता में मानवीकरण अलंकार का प्रयोग नहीं किया गया है।"
        ],
        correctAnswer: 2,
        explanation: "कविता में मानवीकरण अलंकार का प्रयोग पहाड़, वृक्ष, झरने आदि प्राकृतिक तत्वों को मानवीय विशेषताओं और भावनाओं से युक्त दिखाकर किया गया है। जैसे - पहाड़ का अपना प्रतिबिंब देखना, वृक्षों का चिंतित होकर आकाश की ओर देखना, झरनों का पर्वत का गौरवगान करना आदि।"
    },
    {
        question: "आपकी दृष्टि में इस कविता का सौंदर्य इनमें से किस पर निर्भर करता है?",
        options: [
            "अनेक शब्दों की आवृत्ति पर।",
            "शब्दों की चित्रमयी भाषा पर।",
            "कविता की संगीतात्मकता पर।",
            "शब्दों की चित्रमयी भाषा और संगीतात्मकता दोनों पर।"
        ],
        correctAnswer: 3,
        explanation: "इस कविता का सौंदर्य मुख्य रूप से शब्दों की चित्रमयी भाषा और संगीतात्मकता दोनों पर निर्भर करता है। कवि ने प्रकृति के सजीव चित्र प्रस्तुत किए हैं और साथ ही अनुप्रास और लय का सुंदर प्रयोग किया है।"
    },
    {
        question: "कवि ने चित्रात्मक शैली का प्रयोग करते हुए पावस ऋतु का सजीव चित्र अंकित किया है। ऐसे स्थलों का सबसे अच्छा उदाहरण क्या है?",
        options: [
            "केवल 'पल-पल परिवर्तित प्रकृति-वेश' में",
            "केवल 'मेखलाकार पर्वत अपार अपने सहस्र दृग-सुमन फाड़' में",
            "केवल 'है टूट पड़ा भू पर अंबर' में",
            "उपरोक्त सभी उदाहरणों में, साथ ही 'झरते हैं झाग भरे निर्झर', 'उड़ गया, अचानक लो, भूधर फडका अपार पारद के पर' आदि पंक्तियों में"
        ],
        correctAnswer: 3,
        explanation: "कवि ने कविता में अनेक स्थलों पर चित्रात्मक शैली का प्रयोग किया है, जैसे - 'पल-पल परिवर्तित प्रकृति-वेश', 'मेखलाकार पर्वत अपार अपने सहस्र दृग-सुमन फाड़', 'झरते हैं झाग भरे निर्झर', 'है टूट पड़ा भू पर अंबर', 'उड़ गया, अचानक लो, भूधर फडका अपार पारद के पर' आदि।"
    }
];

// Load text comprehension questions - Display only, no interactive elements
function loadTextQuestions(container) {
    // Clear existing content
    container.innerHTML = '';
    
    // Create a single container for all questions
    const questionsHTML = `
        <div id="allQuestions" class="question-set active">
            <h2 class="question-main-title">प्रश्न-अभ्यास</h2>
        </div>
    `;
    
    container.innerHTML = questionsHTML;
    
    // Load all questions in a single container
    const questionsContainer = document.getElementById('allQuestions');
    
    // Add section heading for main questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">(क) निम्नलिखित प्रश्नों के उत्तर दीजिए</h3>';
    loadQuestionSet(questionsContainer, poemQuestions, 'poem');
    
    // Add section heading for poetic beauty questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">(ख) कविता का सौंदर्य</h3>';
    loadQuestionSet(questionsContainer, poeticBeautyQuestions, 'beauty');
    
    // Auto update progress
    if (typeof updateProgress === 'function') {
        updateProgress('question', 100);
    }
}

// Load a set of questions into a container - Display only, no interactive elements
function loadQuestionSet(container, questions, prefix) {
    questions.forEach((q, index) => {
        const questionHTML = createQuestionHTML(q, index, prefix);
        container.innerHTML += questionHTML;
    });
}

// Create HTML for a question with interactive feedback
function createQuestionHTML(question, index, prefix) {
    const questionId = `${prefix}-q${index}`;
    
    let optionsHTML = '';
    
    // Display multiple choice options with interactive elements
    question.options.forEach((option, optIndex) => {
        optionsHTML += `
            <div class="option" data-option-index="${optIndex}" data-is-correct="${optIndex === question.correctAnswer}" onclick="selectOption('${questionId}', ${optIndex}, ${question.correctAnswer})">
                <span class="option-marker">${String.fromCharCode(65 + optIndex)}.</span>
                <span class="option-text">${option}</span>
                <span class="option-feedback"></span>
            </div>
        `;
    });
    
    return `
        <div class="question-item" data-question-index="${index}" id="${questionId}">
            <div class="question-text">${index + 1}. ${question.question}</div>
            <div class="question-options">
                ${optionsHTML}
            </div>
            <div class="question-feedback" id="${questionId}-feedback"></div>
        </div>
    `;
}

// Function to handle option selection and provide feedback
function selectOption(questionId, selectedIndex, correctIndex) {
    // Get all options for this question
    const questionElement = document.getElementById(questionId);
    const options = questionElement.querySelectorAll('.option');
    const feedbackElement = document.getElementById(`${questionId}-feedback`);
    
    // Clear previous selections
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.querySelector('.option-feedback').textContent = '';
    });
    
    // Get the selected option and correct option
    const selectedOption = options[selectedIndex];
    const correctOption = options[correctIndex];
    
    // Check if the selected option is correct
    const isCorrect = selectedIndex === correctIndex;
    
    // Mark the selected option
    if (isCorrect) {
        selectedOption.classList.add('correct');
        selectedOption.querySelector('.option-feedback').textContent = '✓';
        
        // Show feedback message
        feedbackElement.textContent = 'सही उत्तर!';
        feedbackElement.className = 'question-feedback correct show';
    } else {
        // Mark the selected option as incorrect
        selectedOption.classList.add('incorrect');
        selectedOption.querySelector('.option-feedback').textContent = '✗';
        
        // Mark the correct option
        correctOption.classList.add('correct');
        correctOption.querySelector('.option-feedback').textContent = '✓';
        
        // Show feedback message
        feedbackElement.textContent = 'गलत उत्तर। सही उत्तर है: ' + correctOption.querySelector('.option-text').textContent;
        feedbackElement.className = 'question-feedback incorrect show';
    }
    
    // Update progress if correct
    if (isCorrect && typeof updateProgress === 'function') {
        updateProgress('question', 5);
    }
}

// Override the existing functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("MCQ Override loaded - Interactive version with hindi 4.txt content");
    
    // Make the selectOption function globally available
    window.selectOption = selectOption;
    
    // Register module visibility changes
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            const moduleId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            if (moduleId === 'thinking-text') {
                console.log("Loading interactive MCQ questions from hindi 4.txt");
                loadTextQuestions(document.getElementById('textQuestions'));
            }
        });
    });
    
    // If module is already active, load questions
    if (document.getElementById('thinking-text').classList.contains('active')) {
        console.log("Loading interactive MCQ questions from hindi 4.txt on page load");
        loadTextQuestions(document.getElementById('textQuestions'));
    }
});