/**
 * Activities and additional exercises for Meera Ke Pad module
 */

// Store activity scores and state
let activityScores = {
    listening: 0,
    speaking: 0,
    writing: 0,
    project: 0
};

// Initialize activities when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Activities module loaded');
    initActivities();
});

// Initialize activities
function initActivities() {
    // Set up writing pad expanding functionality
    const writingPad = document.getElementById('writingPad');
    if (writingPad) {
        writingPad.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Set up listening notes expanding functionality
    const listeningNotes = document.getElementById('listeningNotes');
    if (listeningNotes) {
        listeningNotes.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    const narrativeAccount = document.getElementById('narrativeAccount');
    if (narrativeAccount) {
        narrativeAccount.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}

// Play listening activity audio
function playListeningActivity() {
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    // In a real implementation, this would play an audio file
    // For now, we'll use the narrator to speak the content
    if (window.narrator) {
        window.narrator.speak(`
            मीरा का जन्म जोधपुर के चोकड़ी (कुड़की) गाँव में 1503 में हुआ माना जाता है। 
            13 वर्ष की उम्र में मेवाड़ के महाराणा सांगा के कुँवर भोजराज से उनका विवाह हुआ। 
            उनका जीवन दुखों की छाया में ही बीता। बाल्यावस्था में ही माँ का देहांत हो गया था। 
            विवाह के कुछ ही साल बाद पहले पति, फिर पिता और एक युद्ध के दौरान श्वसुर का भी देहांत हो गया। 
            भौतिक जीवन से निराश मीरा ने घर-परिवार त्याग दिया और वृंदावन में डेरा डाल पूरी तरह 
            गिरधर गोपाल कृष्ण के प्रति समर्पित हो गईं।
            
            मीरा की भक्ति दैन्य और माधुर्यभाव की है। इन पर योगियों, संतों और वैष्णव भक्तों का सम्मिलित प्रभाव पड़ा है। 
            मीरा के पदों की भाषा में राजस्थानी, ब्रज और गुजराती का मिश्रण पाया जाता है। वहीं पंजाबी, खड़ी बोली और पूर्वी के प्रयोग भी मिल जाते हैं।
            
            अब नोट्स बनाने और कथात्मक विवरण लिखने के लिए तैयार हो जाइए।
        `);
    } else {
        alert('वाचन सुविधा उपलब्ध नहीं है।');
    }
}

// Function to handle option selection with immediate feedback
function selectOption(element, questionName, optionIndex) {
    // First check if the radio button is already selected
    const radio = element.querySelector('input[type="radio"]');
    if (radio.checked) {
        return; // Already selected, no need to do anything
    }
    
    // Select the radio button
    radio.checked = true;
    
    // Define correct answers
    const correctAnswers = {
        birthplace: 0, // जोधपुर के चोकड़ी (कुड़की) गाँव में
        bhakti: 1,     // दैन्य और माधुर्य भाव की
        language: 1    // राजस्थानी, ब्रज और गुजराती
    };
    
    // Check if the selected option is correct
    const isCorrect = (optionIndex === correctAnswers[questionName]);
    
    // Get all options for this question
    const allOptions = document.querySelectorAll(`input[name="${questionName}"]`);
    
    // Remove existing highlighting from other options in this question
    allOptions.forEach(input => {
        const optionDiv = input.closest('.mcq-option');
        optionDiv.classList.remove('correct-answer', 'incorrect-answer');
    });
    
    // Apply appropriate class to the selected option
    if (isCorrect) {
        element.classList.add('correct-answer');
    } else {
        element.classList.add('incorrect-answer');
        
        // Also highlight the correct answer
        const correctOption = document.getElementById(`${questionName}-opt${correctAnswers[questionName]}`);
        if (correctOption) {
            correctOption.closest('.mcq-option').classList.add('correct-answer');
        }
    }
    
    // Create a temporary feedback message
    const tempFeedback = document.createElement('div');
    tempFeedback.className = `feedback-message show ${isCorrect ? 'success' : 'error'}`;
    tempFeedback.textContent = isCorrect ? 
        '✓ आपका उत्तर सही है!' : 
        '✗ आपका उत्तर गलत है!';
    tempFeedback.style.marginTop = '10px';
    tempFeedback.style.marginBottom = '10px';
    
    // Find parent question-box and append feedback after mcq-options
    const questionBox = element.closest('.question-box');
    const mcqOptions = questionBox.querySelector('.mcq-options');
    
    // Remove any existing temporary feedback
    const existingFeedback = questionBox.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Insert feedback after mcq-options
    mcqOptions.insertAdjacentElement('afterend', tempFeedback);
    
    // If correct, play a sound effect (if available)
    if (isCorrect && window.navigator.vibrate) {
        window.navigator.vibrate(100); // Haptic feedback on mobile
    }
    
    // Use narrator for verbal feedback if available
    if (window.narrator) {
        window.narrator.speak(isCorrect ? 
            'सही उत्तर!' : 
            'गलत उत्तर!');
    }
    
    // Remove temporary feedback after a few seconds
    setTimeout(() => {
        if (tempFeedback.parentNode) {
            tempFeedback.classList.add('fade-out');
            setTimeout(() => tempFeedback.remove(), 500);
        }
    }, 3000);
}

// Save listening notes - now mainly for checking all answers
function saveListeningNotes() {
    const birthplace = document.querySelector('input[name="birthplace"]:checked');
    const bhakti = document.querySelector('input[name="bhakti"]:checked');
    const language = document.querySelector('input[name="language"]:checked');
    
    // Check if all questions are answered
    if (!birthplace || !bhakti || !language) {
        alert('कृपया सभी प्रश्नों के उत्तर चुनें।');
        return;
    }
    
    // Check correct answers
    const correctAnswers = {
        birthplace: "0", // जोधपुर के चोकड़ी (कुड़की) गाँव में
        bhakti: "1", // दैन्य और माधुर्य भाव की
        language: "1" // राजस्थानी, ब्रज और गुजराती
    };
    
    const questions = [
        {
            id: 'birthplace',
            question: "मीरा का जन्म कहाँ हुआ था?",
            options: [
                "जोधपुर के चोकड़ी (कुड़की) गाँव में",
                "राजस्थान के चित्तौड़गढ़ में",
                "मेवाड़ के मेड़ता में"
            ]
        },
        {
            id: 'bhakti',
            question: "मीरा की भक्ति कैसी थी?",
            options: [
                "वात्सल्य भाव की",
                "दैन्य और माधुर्य भाव की",
                "सख्य भाव की"
            ]
        },
        {
            id: 'language',
            question: "मीरा के पदों की भाषा में किन भाषाओं का मिश्रण पाया जाता है?",
            options: [
                "केवल राजस्थानी और खड़ी बोली",
                "राजस्थानी, ब्रज और गुजराती",
                "संस्कृत, हिंदी और फारसी"
            ]
        }
    ];
    
    let correctCount = 0;
    
    // Check each question and show individual feedback
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="${question.id}"]:checked`);
        const userAnswer = parseInt(selectedOption.value);
        const isCorrect = userAnswer === parseInt(correctAnswers[question.id]);
        
        // Find or create feedback element for this question
        let feedbackEl = document.getElementById(`${question.id}-feedback`);
        if (!feedbackEl) {
            // Create feedback element if it doesn't exist
            const questionBox = selectedOption.closest('.question-box');
            if (questionBox) {
                feedbackEl = document.createElement('div');
                feedbackEl.id = `${question.id}-feedback`;
                feedbackEl.className = 'question-feedback';
                questionBox.appendChild(feedbackEl);
            }
        }
        
        if (feedbackEl) {
            if (isCorrect) {
                feedbackEl.textContent = '✓ सही!';
                feedbackEl.className = 'question-feedback correct';
                correctCount++;
            } else {
                feedbackEl.textContent = `✗ गलत। सही उत्तर है: ${question.options[parseInt(correctAnswers[question.id])]}`;
                feedbackEl.className = 'question-feedback incorrect';
            }
        }
    });
    
    // Show overall feedback
    const feedbackEl = document.getElementById('listeningFeedback');
    feedbackEl.textContent = `आपने ${questions.length} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    feedbackEl.className = 'feedback-message show';
    feedbackEl.classList.add(correctCount === questions.length ? 'success' : 'error');
    
    // Award points based on correct answers
    const baseScore = 5;
    const bonusPerCorrect = 3;
    
    activityScores.listening = baseScore + (correctCount * bonusPerCorrect);
    
    // Update total score
    if (typeof updateScore === 'function') {
        updateScore(activityScores.listening);
    }
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    // Show achievement
    if (typeof showAchievement === 'function') {
        showAchievement('श्रवण गतिविधि पूर्ण!');
    }
    
    // Provide narrated feedback
    if (window.narrator) {
        window.narrator.speak(`आपने ${correctCount} सही उत्तर दिए! बहुत अच्छा!`);
    }
}

// Record speaking
function recordSpeaking() {
    // In a real app, this would use the Web Speech API
    // For now, we'll just simulate recording
    
    // Show a dialog explaining the activity
    alert('वास्तविक कार्यान्वयन में, यह Web Audio API का उपयोग करके आपकी बोली हुई प्रतिक्रिया रिकॉर्ड करेगा।');
    
    // Award points
    activityScores.speaking = 10;
    
    // Update total score
    if (typeof updateScore === 'function') {
        updateScore(activityScores.speaking);
    }
    
    // Provide narrated instructions
    if (window.narrator) {
        window.narrator.speak(`
            मीरा के पदों के संदर्भ में विचार कीजिए कि वे कृष्ण के प्रति अपनी भक्ति किस प्रकार व्यक्त करती हैं। 
            चाकरी का भाव क्या दर्शाता है, और इसमें भक्त और भगवान के बीच क्या संबंध स्थापित होता है?
        `);
    }
}

// Open writing pad
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        document.getElementById('writingPad').focus();
    }
}

// Function to handle writing option selection with immediate feedback
function selectWritingOption(element, questionName, optionIndex) {
    // First check if the radio button is already selected
    const radio = element.querySelector('input[type="radio"]');
    if (radio.checked) {
        return; // Already selected, no need to do anything
    }
    
    // Select the radio button
    radio.checked = true;
    
    // Define correct answers
    const correctAnswers = {
        bhakti_bhav: 1,      // निष्काम प्रेम और पूर्ण समर्पण
        samarpan: 1,         // आराध्य को अपना सर्वस्व मानने के रूप में
        sthan: 1,            // सगुण भक्ति धारा की प्रमुख कवयित्री के रूप में
        modern_relevance: 1  // मानवीय मूल्यों, एकता और सहिष्णुता की प्रेरणा देती है
    };
    
    // Check if the selected option is correct
    const isCorrect = (optionIndex === correctAnswers[questionName]);
    
    // Get all options for this question
    const allOptions = document.querySelectorAll(`input[name="${questionName}"]`);
    
    // Remove existing highlighting from other options in this question
    allOptions.forEach(input => {
        const optionDiv = input.closest('.mcq-option');
        optionDiv.classList.remove('correct-answer', 'incorrect-answer');
    });
    
    // Apply appropriate class to the selected option
    if (isCorrect) {
        element.classList.add('correct-answer');
    } else {
        element.classList.add('incorrect-answer');
        
        // Also highlight the correct answer
        const correctOption = document.getElementById(`${questionName}-opt${correctAnswers[questionName]}`);
        if (correctOption) {
            correctOption.closest('.mcq-option').classList.add('correct-answer');
        }
    }
    
    // Create a temporary feedback message
    const tempFeedback = document.createElement('div');
    tempFeedback.className = `feedback-message show ${isCorrect ? 'success' : 'error'}`;
    tempFeedback.textContent = isCorrect ? 
        '✓ आपका उत्तर सही है!' : 
        '✗ आपका उत्तर गलत है!';
    tempFeedback.style.marginTop = '10px';
    tempFeedback.style.marginBottom = '10px';
    
    // Find parent question-box and append feedback after mcq-options
    const questionBox = element.closest('.question-box');
    const mcqOptions = questionBox.querySelector('.mcq-options');
    
    // Remove any existing temporary feedback
    const existingFeedback = questionBox.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Insert feedback after mcq-options
    mcqOptions.insertAdjacentElement('afterend', tempFeedback);
    
    // If correct, play a sound effect (if available)
    if (isCorrect && window.navigator.vibrate) {
        window.navigator.vibrate(100); // Haptic feedback on mobile
    }
    
    // Use narrator for verbal feedback if available
    if (window.narrator) {
        window.narrator.speak(isCorrect ? 
            'सही उत्तर!' : 
            'गलत उत्तर!');
    }
    
    // Remove temporary feedback after a few seconds
    setTimeout(() => {
        if (tempFeedback.parentNode) {
            tempFeedback.classList.add('fade-out');
            setTimeout(() => tempFeedback.remove(), 500);
        }
    }, 3000);
}

// Save writing - now mainly for checking all answers
function saveWriting() {
    const bhaktiBhav = document.querySelector('input[name="bhakti_bhav"]:checked');
    const samarpan = document.querySelector('input[name="samarpan"]:checked');
    const sthan = document.querySelector('input[name="sthan"]:checked');
    const modernRelevance = document.querySelector('input[name="modern_relevance"]:checked');
    
    // Check if all questions are answered
    if (!bhaktiBhav || !samarpan || !sthan || !modernRelevance) {
        alert('कृपया सभी प्रश्नों के उत्तर चुनें।');
        return;
    }
    
    // Check correct answers
    const correctAnswers = {
        bhakti_bhav: "1", // निष्काम प्रेम और पूर्ण समर्पण
        samarpan: "1", // आराध्य को अपना सर्वस्व मानने के रूप में
        sthan: "1", // सगुण भक्ति धारा की प्रमुख कवयित्री के रूप में
        modern_relevance: "1" // मानवीय मूल्यों, एकता और सहिष्णुता की प्रेरणा देती है
    };
    
    const questions = [
        {
            id: 'bhakti_bhav',
            question: "मीरा का भक्ति भाव किस प्रकार का था?",
            options: [
                "सांसारिक प्रेम के रूप में",
                "निष्काम प्रेम और पूर्ण समर्पण",
                "दास्य भाव के रूप में"
            ]
        },
        {
            id: 'samarpan',
            question: "मीरा का आराध्य के प्रति समर्पण किस प्रकार दिखता है?",
            options: [
                "धन-संपत्ति त्याग के रूप में",
                "आराध्य को अपना सर्वस्व मानने के रूप में",
                "कठोर तपस्या के रूप में"
            ]
        },
        {
            id: 'sthan',
            question: "भक्ति काव्य में मीरा का क्या स्थान है?",
            options: [
                "निर्गुण भक्ति धारा की प्रमुख कवयित्री के रूप में",
                "सगुण भक्ति धारा की प्रमुख कवयित्री के रूप में",
                "रीति कालीन कवयित्री के रूप में"
            ]
        },
        {
            id: 'modern_relevance',
            question: "आधुनिक समाज में मीरा की भक्ति की प्रासंगिकता क्या है?",
            options: [
                "वर्तमान समाज में कोई प्रासंगिकता नहीं है",
                "मानवीय मूल्यों, एकता और सहिष्णुता की प्रेरणा देती है",
                "केवल साहित्यिक महत्व ही रखती है"
            ]
        }
    ];
    
    let correctCount = 0;
    
    // Check each question and show individual feedback
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="${question.id}"]:checked`);
        const userAnswer = parseInt(selectedOption.value);
        const isCorrect = userAnswer === parseInt(correctAnswers[question.id]);
        
        // Find or create feedback element for this question
        let feedbackEl = document.getElementById(`${question.id}-feedback`);
        if (!feedbackEl) {
            // Create feedback element if it doesn't exist
            const questionBox = selectedOption.closest('.question-box');
            if (questionBox) {
                feedbackEl = document.createElement('div');
                feedbackEl.id = `${question.id}-feedback`;
                feedbackEl.className = 'question-feedback';
                questionBox.appendChild(feedbackEl);
            }
        }
        
        if (feedbackEl) {
            if (isCorrect) {
                feedbackEl.textContent = '✓ सही!';
                feedbackEl.className = 'question-feedback correct';
                correctCount++;
            } else {
                feedbackEl.textContent = `✗ गलत। सही उत्तर है: ${question.options[parseInt(correctAnswers[question.id])]}`;
                feedbackEl.className = 'question-feedback incorrect';
            }
        }
    });
    
    // Show overall feedback
    const feedbackEl = document.getElementById('writingFeedback');
    feedbackEl.textContent = `आपने ${questions.length} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    feedbackEl.className = 'feedback-message show';
    feedbackEl.classList.add(correctCount === questions.length ? 'success' : 'error');
    
    // Award points based on correct answers
    const baseScore = 10;
    const bonusPerCorrect = 3;
    
    activityScores.writing = baseScore + (correctCount * bonusPerCorrect);
    
    // Update total score
    if (typeof updateScore === 'function') {
        updateScore(activityScores.writing);
    }
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    // Show achievement
    if (typeof showAchievement === 'function') {
        showAchievement('लेखन गतिविधि पूर्ण!');
    }
    
    // Provide narrated feedback
    if (window.narrator) {
        window.narrator.speak(`आपने ${correctCount} सही उत्तर दिए! बहुत अच्छा!`);
    }
}

// Show resource
function showResource(resourceId) {
    // In a real app, this would show or load a specific resource
    alert(`वास्तविक कार्यान्वयन में, यह संसाधन दिखाएगा: ${resourceId}`);
    
    // Provide narrated content based on resource
    if (window.narrator) {
        switch(resourceId) {
            case 'meera-life':
                window.narrator.speak(`
                    मीरा का जन्म जोधपुर के चोकड़ी गाँव में 1503 में हुआ माना जाता है। 13 वर्ष की उम्र में मेवाड़ के महाराणा सांगा के कुँवर भोजराज से उनका विवाह हुआ।
                    उनका जीवन दुखों की छाया में बीता। बाल्यावस्था में ही माँ का देहांत हो गया था। विवाह के कुछ ही साल बाद पहले पति, फिर पिता और एक युद्ध के दौरान श्वसुर का भी देहांत हो गया।
                    भौतिक जीवन से निराश मीरा ने घर-परिवार त्याग दिया और वृंदावन में डेरा डाल पूरी तरह गिरधर गोपाल कृष्ण के प्रति समर्पित हो गईं।
                `);
                break;
            case 'meera-photos':
                window.narrator.speak(`
                    यहाँ मीरा से संबंधित चित्र दिखाए जाएंगे, जिनमें उनकी विभिन्न चित्रकारों द्वारा बनाई गई चित्रकृतियाँ, उनके भजन-स्थल और वे स्थान जहाँ वे रहीं - जैसे चित्तौड़गढ़, वृंदावन और द्वारका शामिल होंगे।
                    इन चित्रों से मीरा के जीवन और भक्ति के विभिन्न पहलुओं को समझने में मदद मिलेगी।
                `);
                break;
            case 'project-template':
                window.narrator.speak(`
                    यह परियोजना टेम्पलेट आपको मीरा के जीवन और रचनाओं पर एक सुव्यवस्थित प्रोजेक्ट बनाने में मदद करेगा। 
                    इसमें मीरा का जीवन परिचय, उनका सामाजिक-धार्मिक संदर्भ, उनकी प्रमुख रचनाएँ और भक्ति भाव के विभिन्न पहलुओं पर विशेष अनुभाग हैं।
                    आप चार्ट पेपर पर या डिजिटल माध्यम से इस टेम्पलेट का उपयोग कर सकते हैं।
                `);
                break;
        }
    }
    
    // Update progress for project activity
    if (resourceId === 'project-template') {
        activityScores.project = 5;
        
        // Update total score
        if (typeof updateScore === 'function') {
            updateScore(activityScores.project);
        }
        
        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress('activities', 5);
        }
    }
}

