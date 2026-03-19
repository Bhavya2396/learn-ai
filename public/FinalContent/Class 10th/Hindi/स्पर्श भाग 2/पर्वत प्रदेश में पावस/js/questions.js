/**
 * Questions and interactive learning exercises
 */

// Define questions for the text comprehension module - पर्वत प्रदेश में पावस
const authorQuestions = [
    {
        question: "पावस ऋतु में प्रकृति में कौन-कौन से परिवर्तन आते हैं?",
        type: "textarea",
        id: "question1",
        feedback: {
            correct: "बिल्कुल सही! पावस ऋतु में प्रकृति का रूप हर पल परिवर्तित होता रहता है।",
            incorrect: "आप अपने उत्तर को और विस्तार दे सकते हैं। कविता में वर्षा ऋतु के प्रकृति पर पड़ने वाले विभिन्न प्रभावों का वर्णन किया गया है।",
            hint: "कविता में 'पल-पल परिवर्तित प्रकृति-वेश' के बारे में बताया गया है।"
        },
        keypoints: [
            "पल-पल प्रकृति का रूप बदलना",
            "पहाड़ का अपना प्रतिबिंब जल में देखना",
            "झरनों का बहना",
            "बादल का आना",
            "बिजली चमकना"
        ]
    },
    {
        question: "'मेखलाकार' शब्द का क्या अर्थ है? कवि ने इस शब्द का प्रयोग यहाँ क्यों किया है?",
        type: "textarea",
        id: "question2",
        feedback: {
            correct: "शाबाश! आपने मेखलाकार के अर्थ और इसके प्रयोग के उद्देश्य को अच्छी तरह से समझा है।",
            incorrect: "आपका उत्तर सही दिशा में है, लेकिन थोड़ा और विचार कीजिए। मेखलाकार का अर्थ है करधनी के आकार की ढाल।",
            hint: "मेखला का अर्थ करधनी होता है। कवि ने पहाड़ की ढाल की तुलना करधनी से की है।"
        },
        keypoints: [
            "मेखलाकार का अर्थ करधनी के आकार की पहाड़ की ढाल है",
            "पहाड़ की घुमावदार आकृति",
            "श्रृंखलाबद्ध पहाड़ियों का वर्णन",
            "भौगोलिक सुंदरता को चित्रित करना"
        ]
    },
    {
        question: "'सहस्र दृग-सुमन' से क्या तात्पर्य है? कवि ने इस पद का प्रयोग किसके लिए किया होगा?",
        type: "textarea",
        id: "question3",
        feedback: {
            correct: "बहुत अच्छे! आपने 'सहस्र दृग-सुमन' के भावार्थ को सटीक रूप से समझा है।",
            incorrect: "आपका उत्तर आंशिक रूप से सही है। दृग-सुमन का अर्थ 'आँखें' होता है। पहाड़ों पर स्थित हज़ारों फूलों या झीलों की तुलना आँखों से की गई है।",
            hint: "सहस्र का अर्थ है 'हज़ार' और दृग-सुमन का अर्थ है 'आँखें'।"
        },
        keypoints: [
            "सहस्र का अर्थ हज़ार है",
            "दृग-सुमन का अर्थ आँखें है",
            "पहाड़ों पर स्थित हज़ारों छोटी झीलें या फूल जो आँखों की तरह दिखते हैं",
            "मानवीकरण अलंकार का प्रयोग"
        ]
    },
    {
        question: "कवि ने तालाब की समानता किसके साथ दिखाई है और क्यों?",
        type: "textarea",
        id: "question4",
        feedback: {
            correct: "उत्तम! आपने तालाब के दर्पण से की गई तुलना के अर्थ को अच्छी तरह समझा है।",
            incorrect: "आपका उत्तर पूरा नहीं है। कविता में तालाब की तुलना दर्पण से की गई है जिसमें पहाड़ अपना प्रतिबिंब देखता है।",
            hint: "कविता में कहा गया है: 'जिसके चरणों में पला ताल, दर्पण-सा फैला है विशाल!'"
        },
        keypoints: [
            "तालाब की तुलना दर्पण (आईने) से की गई है",
            "पहाड़ अपना प्रतिबिंब तालाब में देखता है",
            "स्वच्छ जल में स्पष्ट प्रतिबिंब दिखाई देना",
            "उपमा अलंकार का प्रयोग"
        ]
    },
    {
        question: "पर्वत के हृदय से उठकर ऊँचे-ऊँचे वृक्ष आकाश की ओर क्यों देख रहे थे और वे किस बात को प्रतिबिंबित करते हैं?",
        type: "textarea",
        id: "question5",
        feedback: {
            correct: "उत्कृष्ट! आपने वृक्षों के प्रतीकात्मक अर्थ को बहुत अच्छी तरह समझा है।",
            incorrect: "आपका उत्तर थोड़ा अधूरा है। कविता में वृक्षों को उच्चाकांक्षाओं के साथ जोड़ा गया है और वे आकाश की ओर चिंतापूर्वक देख रहे हैं।",
            hint: "कविता में कहा गया है: 'गिरिवर के उर से उठ-उठ कर उच्चाकांक्षाओं से तरुवर हैं झाँक रहे नीरव नभ पर अनिमेष, अटल, कुछ चिंतापर।'"
        },
        keypoints: [
            "वृक्ष उच्चाकांक्षाओं (ऊँचा उठने की कामना) के साथ आकाश को देख रहे हैं",
            "वे मनुष्य की महत्वाकांक्षाओं का प्रतीक हैं",
            "वृक्ष चिंतापूर्वक और एकटक आकाश को देख रहे हैं",
            "आने वाले तूफान/बदलाव का पूर्वाभास"
        ]
    },
    {
        question: "'है टूट पड़ा भू पर अंबर' का भाव स्पष्ट कीजिए।",
        type: "textarea",
        id: "question6",
        feedback: {
            correct: "अति उत्तम! आपने इस पंक्ति के भावार्थ को बहुत अच्छी तरह से व्यक्त किया है।",
            incorrect: "आपके उत्तर में और गहराई की आवश्यकता है। इस पंक्ति में वर्षा के प्रचंड रूप का वर्णन है जिसमें ऐसा लगता है कि आकाश धरती पर टूट पड़ा है।",
            hint: "यह पंक्ति वर्षा के प्रचंड रूप का वर्णन करती है जहाँ आकाश और धरती के बीच की सीमा मिट गई है।"
        },
        keypoints: [
            "आकाश का धरती पर टूट पड़ना अर्थात भारी वर्षा होना",
            "प्रकृति का भयावह रूप",
            "आकाश और धरती के बीच की सीमा का मिट जाना",
            "अतिशयोक्ति अलंकार का प्रयोग"
        ]
    },
    {
        question: "कविता का सौंदर्य किस पर निर्भर करता है - शब्दों की आवृत्ति पर, शब्दों की चित्रमयी भाषा पर या कविता की संगीतात्मकता पर? अपने विचार व्यक्त कीजिए।",
        type: "textarea",
        id: "question7",
        feedback: {
            correct: "बहुत बढ़िया! आपने कविता के सौंदर्य तत्वों का गहन विश्लेषण किया है।",
            incorrect: "आपके उत्तर में कविता के सौंदर्य तत्वों का अधिक विश्लेषण आवश्यक है। शब्दों की चित्रमयता, संगीतात्मकता और शब्दावली के प्रयोग पर विचार कीजिए।",
            hint: "कविता में प्रकृति के सजीव चित्र, लयात्मकता और ध्वनि-योजना पर विचार कीजिए।"
        },
        keypoints: [
            "शब्दों की चित्रमयी भाषा",
            "प्रकृति के सजीव चित्रण",
            "कविता की संगीतात्मकता और लय",
            "अनुप्रास और अन्य अलंकारों का प्रयोग",
            "मानवीकरण के माध्यम से प्रकृति का सजीव वर्णन"
        ]
    },
    {
        question: "कवि ने चित्रात्मक शैली का प्रयोग करते हुए पावस ऋतु का सजीव चित्र अंकित किया है। ऐसे स्थलों को छाँटकर लिखिए।",
        type: "textarea",
        id: "question8",
        feedback: {
            correct: "बेहतरीन! आपने कविता में चित्रात्मक शैली के प्रयोग का सटीक विश्लेषण किया है।",
            incorrect: "आपके उत्तर में कविता के चित्रात्मक स्थलों का अधिक उदाहरण देने की आवश्यकता है। कविता में प्रकृति के सजीव चित्रों पर ध्यान दीजिए।",
            hint: "पहाड़ का अपना प्रतिबिंब देखना, झरनों का बहना, वृक्षों का आकाश की ओर देखना - इन सभी में चित्रात्मक शैली का प्रयोग हुआ है।"
        },
        keypoints: [
            "मेखलाकार पर्वत अपार... नीचे जल में निज महाकार (पहाड़ का अपना प्रतिबिंब देखना)",
            "जिसके चरणों में पला ताल दर्पण-सा फैला है विशाल (तालाब का दर्पण जैसा होना)",
            "झरते हैं झाग भरे निर्झर (झरनों का मोतियों की तरह गिरना)",
            "उड़ गया, अचानक लो, भूधर फडका अपार पारद के पर (बिजली का चमकना)",
            "है टूट पड़ा भू पर अंबर (भारी वर्षा का चित्रण)"
        ]
    }
];

// Load questions when the module is shown
function loadTextQuestions() {
    const questionContainer = document.getElementById('textQuestions');
    
    if (!questionContainer) {
        console.error('Question container not found');
        return;
    }
    
    // Clear existing content
    questionContainer.innerHTML = '';
    
    // Create question elements
    textQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question-item';
        
        // Create question header
        const questionHeader = document.createElement('h3');
        questionHeader.className = 'question-header';
        questionHeader.textContent = `प्रश्न ${index + 1}: `;
        questionElement.appendChild(questionHeader);
        
        // Create question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = q.question;
        questionElement.appendChild(questionText);
        
        // Create answer input
        let answerInput;
        
        if (q.type === 'textarea') {
            answerInput = document.createElement('textarea');
            answerInput.rows = 5;
            answerInput.className = 'answer-input';
            answerInput.id = q.id;
            answerInput.placeholder = 'अपना उत्तर यहां लिखें...';
        } else if (q.type === 'radio' && q.options) {
            answerInput = document.createElement('div');
            answerInput.className = 'radio-options';
            
            q.options.forEach((option, optIndex) => {
                const radioLabel = document.createElement('label');
                radioLabel.className = 'radio-label';
                
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = q.id;
                radioInput.value = option.value;
                radioInput.className = 'radio-input';
                
                const radioText = document.createTextNode(option.text);
                
                radioLabel.appendChild(radioInput);
                radioLabel.appendChild(radioText);
                answerInput.appendChild(radioLabel);
            });
        }
        
        questionElement.appendChild(answerInput);
        
        // Create feedback area (hidden initially)
        const feedbackArea = document.createElement('div');
        feedbackArea.className = 'feedback-area';
        feedbackArea.id = `feedback-${q.id}`;
        questionElement.appendChild(feedbackArea);
        
        // Create hint button
        const hintButton = document.createElement('button');
        hintButton.className = 'hint-button';
        hintButton.textContent = '💡 संकेत';
        hintButton.onclick = function() {
            showHint(q.id, q.feedback.hint);
        };
        questionElement.appendChild(hintButton);
        
        // Create check answer button
        const checkButton = document.createElement('button');
        checkButton.className = 'interactive-btn';
        checkButton.textContent = 'उत्तर जाँचें';
        checkButton.onclick = function() {
            checkAnswer(q.id, q.feedback, q.keypoints);
        };
        questionElement.appendChild(checkButton);
        
        // Add the question to the container
        questionContainer.appendChild(questionElement);
    });
}

// Show hint for a question
function showHint(questionId, hintText) {
    const feedbackArea = document.getElementById(`feedback-${questionId}`);
    
    if (!feedbackArea) return;
    
    feedbackArea.className = 'feedback-area hint-feedback';
    feedbackArea.innerHTML = `<p><strong>संकेत:</strong> ${hintText}</p>`;
    
    // Show feedback area
    feedbackArea.style.display = 'block';
    
    // Add fade-out after a while
    setTimeout(() => {
        feedbackArea.classList.add('fade-in');
    }, 10);
}

// Check answer for a question
function checkAnswer(questionId, feedback, keypoints) {
    const answerInput = document.getElementById(questionId);
    const feedbackArea = document.getElementById(`feedback-${questionId}`);
    
    if (!answerInput || !feedbackArea) return;
    
    let answer = '';
    let isCorrect = false;
    
    // Get answer based on input type
    if (answerInput.tagName === 'TEXTAREA') {
        answer = answerInput.value.trim().toLowerCase();
        
        // Check if answer contains key points
        const keyPointsFound = keypoints.filter(point => 
            answer.includes(point.toLowerCase())
        );
        
        // If at least 3 key points are found, consider it correct
        isCorrect = keyPointsFound.length >= 3;
    } else if (answerInput.classList.contains('radio-options')) {
        const selectedRadio = answerInput.querySelector('input[type="radio"]:checked');
        if (selectedRadio) {
            answer = selectedRadio.value;
            isCorrect = answer === 'correct';
        }
    }
    
    // Display feedback
    feedbackArea.className = `feedback-area ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`;
    
    feedbackArea.innerHTML = `
        <p><strong>${isCorrect ? '✓ सही!' : '✗ पुनः प्रयास करें'}</strong></p>
        <p>${isCorrect ? feedback.correct : feedback.incorrect}</p>
    `;
    
    // Show feedback area
    feedbackArea.style.display = 'block';
    
    // Add fade-in effect
    setTimeout(() => {
        feedbackArea.classList.add('fade-in');
    }, 10);
    
    // Update progress if correct
    if (isCorrect && typeof updateProgress === 'function') {
        updateProgress('question', 5);
    }
}

// Function to check vocabulary exercises
function checkVocabulary() {
    const correctAnswers = {
        'vocab1': 'वर्षा',
        'vocab2': 'प्रकृति का रूप',
        'vocab3': 'करघनी के आकार की पहाड़ की ढाल',
        'vocab4': 'आँखें',
        'vocab5': 'विशाल आकार',
        'vocab6': 'बादल रूपी विमान'
    };
    
    let correct = 0;
    let total = Object.keys(correctAnswers).length;
    
    // Check each answer
    for (const [id, answer] of Object.entries(correctAnswers)) {
        const select = document.getElementById(id);
        if (select && select.value === answer) {
            correct++;
            select.parentElement.classList.add('correct-answer');
        } else if (select) {
            select.parentElement.classList.add('incorrect-answer');
        }
    }
    
    // Calculate score
    const score = Math.round((correct / total) * 100);
    
    // Display feedback
    const feedbackElement = document.getElementById('vocabFeedback');
    if (feedbackElement) {
        feedbackElement.innerHTML = `
            <p><strong>${correct}/${total} सही उत्तर</strong></p>
            <p>आपका स्कोर: ${score}%</p>
            <p>${score >= 80 ? 'शाबाश! आपने अच्छा प्रदर्शन किया है।' : 'अभ्यास जारी रखें!'}</p>
        `;
        feedbackElement.className = 'feedback-message ' + (score >= 80 ? 'success' : 'error') + ' show';
    }
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('vocabulary', score);
    }
}

// Function to check contraction exercises - Now just updates progress since answers are shown
function checkContractions() {
    // Update progress with full score since we now show the answers directly
    if (typeof updateProgress === 'function') {
        updateProgress('language', 100);
    }
}

// Save reflection text
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText');
    const feedbackElement = document.getElementById('reflectionFeedback');
    
    if (reflectionText && feedbackElement) {
        const text = reflectionText.value.trim();
        
        if (text.length < 50) {
            feedbackElement.innerHTML = 'कृपया कम से कम 50 अक्षरों का चिंतन लिखें।';
            feedbackElement.className = 'feedback-message error show';
            return;
        }
        
        // Save reflection (would normally save to server)
        console.log('Saving reflection:', text);
        
        // Display success message
        feedbackElement.innerHTML = 'आपका चिंतन सफलतापूर्वक सहेज लिया गया है।';
        feedbackElement.className = 'feedback-message success show';
        
        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress('reflection', 10);
        }
    }
}

// Save listening notes
function saveListeningNotes() {
    const listeningNotes = document.getElementById('listeningNotes');
    const narrativeAccount = document.getElementById('narrativeAccount');
    
    if (listeningNotes && narrativeAccount) {
        const notes = listeningNotes.value.trim();
        const narrative = narrativeAccount.value.trim();
        
        if (notes.length < 20 || narrative.length < 50) {
            alert('कृपया नोट्स और कथात्मक विवरण दोनों पूरा भरें।');
            return;
        }
        
        // Save notes (would normally save to server)
        console.log('Saving listening notes:', { notes, narrative });
        
        // Display success message
        alert('आपके नोट्स सफलतापूर्वक सहेज लिए गए हैं।');
        
        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress('listening', 10);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Register module visibility changes
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            const moduleId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            if (moduleId === 'thinking-text') {
                loadTextQuestions();
            }
        });
    });
    
    // Initially load questions if module is already active
    if (document.getElementById('thinking-text').classList.contains('active')) {
        loadTextQuestions();
    }
});
