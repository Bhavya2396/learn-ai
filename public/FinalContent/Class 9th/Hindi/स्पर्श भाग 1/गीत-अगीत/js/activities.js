/**
 * Activities for Kabir Ke Sakhi interactive Hindi lesson
 */

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activities
    setupActivityListeners();
});

// Set up event listeners for activities
function setupActivityListeners() {
    // Record speaking button
    const recordBtn = document.querySelector('.speaking-activity .interactive-btn');
    if (recordBtn) {
        recordBtn.addEventListener('click', recordSpeaking);
    }
    
    // Play listening activity button
    const listenBtn = document.querySelector('.listening-activity .interactive-btn');
    if (listenBtn) {
        listenBtn.addEventListener('click', playListeningActivity);
    }
    
    // Open writing pad button
    const writeBtn = document.querySelector('.writing-activity .interactive-btn');
    if (writeBtn) {
        writeBtn.addEventListener('click', openWritingPad);
    }
    
    // Save listening notes button
    const saveNotesBtn = document.querySelector('.listening-notes .interactive-btn');
    if (saveNotesBtn) {
        saveNotesBtn.addEventListener('click', saveListeningNotes);
    }
    
    // Save writing button
    const saveWritingBtn = document.querySelector('.writing-pad .interactive-btn');
    if (saveWritingBtn) {
        saveWritingBtn.addEventListener('click', saveWriting);
    }
    
    // Resource links
    const resourceLinks = document.querySelectorAll('.project-resources a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceId = this.getAttribute('onclick').match(/showResource\('(.+?)'\)/)[1];
            showResource(resourceId);
        });
    });
}

// Kabir's life content for listening activity
const kabirLifeContent = `
कबीर का जन्म 1398 में काशी में हुआ माना जाता है और उन्होंने 120 वर्ष की आयु पाई थी। वे गुरु रामानंद के शिष्य थे।

कबीर का जीवन कई किंवदंतियों से भरा है। उनके जन्म और मृत्यु के बारे में कई मान्यताएँ हैं। कहा जाता है कि एक विधवा ब्राह्मणी को कबीर मिले, जिसे गुरु रामानंद ने आशीर्वाद दिया था। उन्होंने काशी के लहरतारा तालाब के पास एक बच्चे को पाया, जिसे वे अपने घर ले आईं और उसका नाम कबीर रखा।

कबीर मुस्लिम जुलाहा परिवार में पले-बढ़े। वे नीरू और नीमा नामक दंपति के घर में बड़े हुए, जो जुलाहे (कपड़ा बुनने वाले) थे। कबीर ने भी अपना जीवन एक जुलाहे के रूप में बिताया।

कबीर बचपन से ही आध्यात्मिक प्रवृत्ति के थे और गुरु रामानंद के शिष्य बन गए। उन्होंने हिंदू और मुस्लिम दोनों धर्मों के आडंबरों और रूढ़िवादिता की आलोचना की। वे मानते थे कि ईश्वर एक है और उसे विभिन्न नामों से पुकारा जाता है।

कबीर की रचनाएँ दोहे, सबद और रमैनी रूप में हैं। उनकी भाषा सरल और सीधी थी, जिसे आम लोग आसानी से समझ सकते थे। उनकी रचनाओं में अवधी, राजस्थानी, भोजपुरी और पंजाबी भाषाओं का मिश्रण था, जिसे 'पचमेल खिचड़ी' या 'सधुक्कड़ी' कहा जाता है।

कबीर ने अपने जीवन के अंतिम कुछ वर्ष मगहर में बिताए, जहाँ वे चिरनिद्रा में लीन हो गए। कहा जाता है कि उनकी मृत्यु के बाद हिंदू और मुस्लिम दोनों समुदायों के लोग उनके शव पर दावा करने लगे। जब चादर उठाई गई तो शव के स्थान पर फूल मिले, जिन्हें दोनों समुदायों ने आपस में बाँट लिया।

कबीर का आविर्भाव ऐसे समय में हुआ जब राजनीतिक, धार्मिक और सामाजिक क्रांतियाँ अपने चरम पर थीं। वे क्रांतदर्शी कवि थे जिनकी कविता में गहरी सामाजिक चेतना झलकती है। आज भी उनके विचार और शिक्षाएँ प्रासंगिक हैं।
`;

// Play the listening activity audio - Narration removed as requested
function playListeningActivity() {
    // Narration functionality removed as requested
    alert('श्रवण गतिविधि में नारेशन हटा दिया गया है। कृपया दिनकर के जीवन के बारे में पढ़ें और नीचे दिए गए प्रश्नों के उत्तर दें।');
}

// Kabir information for project work
const kabirInfo = {
    background: `
        कबीर हिंदी साहित्य के प्रमुख निर्गुण संत कवि थे। उनका जन्म 1398 में काशी में हुआ माना जाता है और उन्होंने 120 वर्ष की आयु पाई थी। वे गुरु रामानंद के शिष्य थे।
        
        कबीर ने हिंदू और मुस्लिम दोनों धर्मों के आडंबरों और रूढ़िवादिता की आलोचना की। उन्होंने धर्म और समाज की कुरीतियों पर कड़ा प्रहार किया और सत्य, अहिंसा और प्रेम का संदेश दिया।
    `,
    photos: `
        कबीर के समय में फोटोग्राफी का आविष्कार नहीं हुआ था, इसलिए उनके वास्तविक चित्र उपलब्ध नहीं हैं। हालांकि, कई कलाकारों ने उनके कल्पित चित्र बनाए हैं जो उन्हें एक साधारण वेशभूषा में दिखाते हैं, अक्सर एक जुलाहे के रूप में। ये चित्र हमें कबीर के सरल और निर्मल जीवन की झलक देते हैं।
    `,
    template: `
        यह टेम्पलेट कबीर के जीवन और उनकी शिक्षाओं पर आपके प्रोजेक्ट के लिए एक संरचना प्रदान करता है। इसमें निम्नलिखित खंड शामिल हैं:
        
        1. कबीर का जीवन परिचय
        2. कबीर के समय का सामाजिक और धार्मिक परिवेश
        3. कबीर की प्रमुख रचनाएँ और उनका साहित्यिक योगदान
        4. कबीर के मुख्य विचार और दर्शन
        5. आज के समय में कबीर की प्रासंगिकता
    `
};

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'kabir-life':
            content = kabirInfo.background;
            break;
        case 'kabir-photos':
            content = kabirInfo.photos;
            break;
        case 'project-template':
            content = kabirInfo.template;
            break;
        default:
            content = 'संसाधन की जानकारी उपलब्ध नहीं है।';
    }
    
    alert(content);
    
    // Narration removed as requested
}

// This function is no longer needed as we've replaced the writing pad with selection options
function openWritingPad() {
    // Scroll to the writing selection area
    const writingSelection = document.querySelector('.writing-selection');
    if (writingSelection) {
        writingSelection.scrollIntoView({ behavior: 'smooth' });
        
        // Instructions removed as requested
    } else {
        console.error('Writing selection element not found');
    }
}

// Save writing function
function saveWriting() {
    const selectedOption = document.querySelector('input[name="writing-option"]:checked');
    
    // Create or update warning element
    let warningElement = document.getElementById('writing-warning');
    
    if (!selectedOption) {
        if (!warningElement) {
            warningElement = document.createElement('div');
            warningElement.id = 'writing-warning';
            warningElement.className = 'feedback-message show error';
            warningElement.textContent = 'कृपया कोई एक विकल्प चुनें।';
            document.querySelector('.writing-selection').insertBefore(
                warningElement,
                document.querySelector('.writing-selection .interactive-btn')
            );
        } else {
            warningElement.style.display = 'block';
        }
        return;
    }
    
    // Hide warning if it exists
    if (warningElement) {
        warningElement.style.display = 'none';
    }
    
    const selectedValue = selectedOption.value;
    const label = document.querySelector(`label[for="writing-option${selectedValue}"]`);
    
    // Define correct writing option
    const correctWritingOption = "4"; // Option 4 is considered most correct
    const isCorrect = selectedValue === correctWritingOption;
    
    // Clear previous feedback icons
    document.querySelectorAll('label[for^="writing-option"] .answer-feedback').forEach(icon => {
        icon.remove();
    });
    
    // Add visual feedback (tick/cross mark) to the selected option
    if (label) {
        // Create feedback icon
        const feedbackIcon = document.createElement('span');
        feedbackIcon.className = 'answer-feedback';
        feedbackIcon.innerHTML = isCorrect ? '✓' : '✗';
        feedbackIcon.style.color = isCorrect ? '#4caf50' : '#f44336';
        feedbackIcon.style.marginLeft = '10px';
        feedbackIcon.style.fontSize = '1.2rem';
        feedbackIcon.style.fontWeight = 'bold';
        feedbackIcon.style.display = 'inline-block';
        feedbackIcon.style.animation = 'feedbackFade 0.3s ease forwards, pulse 2s infinite';
        label.appendChild(feedbackIcon);
    }
    
    // Create feedback element if it doesn't exist
    let feedbackElement = document.getElementById('writing-feedback');
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'writing-feedback';
        feedbackElement.className = 'feedback-message';
        selectedOption.closest('.writing-selection').appendChild(feedbackElement);
    }
    
    // Display appropriate feedback
    if (typeof answerFeedback !== 'undefined' && answerFeedback.writing && answerFeedback.writing[selectedValue]) {
        feedbackElement.textContent = answerFeedback.writing[selectedValue];
        feedbackElement.className = 'feedback-message show';
        
        // Add success class if it's the best answer
        if (typeof writingAnswers !== 'undefined' && selectedValue === writingAnswers.option) {
            feedbackElement.classList.add('success');
        } else {
            feedbackElement.classList.add('partial-success');
        }
    } else {
        feedbackElement.textContent = "✓ आपका विकल्प सहेज लिया गया है!";
        feedbackElement.className = 'feedback-message show success';
    }
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    // Narration code hidden as requested
    // if (window.narrator) {
    //     window.narrator.speak("उत्कृष्ट कार्य! " + feedbackElement.textContent);
    // }
}

// Record speaking response
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('वास्तविक कार्यान्वयन में, यह Web Audio API का उपयोग करके आपकी बोली हुई प्रतिक्रिया रिकॉर्ड करेगा।');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 10);
    }
    
    // Narration removed as requested
}

// Save listening notes
function saveListeningNotes() {
    const birthYearSelected = document.querySelector('input[name="birth-year"]:checked');
    const awardSelected = document.querySelector('input[name="award"]:checked');
    const poetTypeSelected = document.querySelector('input[name="poet-type"]:checked');
    const narrativeSelected = document.querySelector('input[name="narrative"]:checked');
    
    // Hide the alert message
    const warningElement = document.getElementById('listening-warning');
    
    if (!birthYearSelected || !awardSelected || !poetTypeSelected || !narrativeSelected) {
        // Create warning element if it doesn't exist
        if (!warningElement) {
            const warningDiv = document.createElement('div');
            warningDiv.id = 'listening-warning';
            warningDiv.className = 'feedback-message show error';
            warningDiv.textContent = 'कृपया सभी प्रश्नों के उत्तर दें और एक कथात्मक विकल्प चुनें।';
            document.querySelector('.listening-notes').insertBefore(
                warningDiv,
                document.querySelector('.listening-notes .interactive-btn')
            );
        } else {
            warningElement.style.display = 'block';
        }
        return;
    }
    
    // Hide warning if it exists
    if (warningElement) {
        warningElement.style.display = 'none';
    }
    
    // Create a container for feedback if it doesn't exist
    const listeningNotesContainer = document.querySelector('.listening-notes');
    let feedbackContainer = document.getElementById('listening-feedback-container');
    
    if (!feedbackContainer) {
        feedbackContainer = document.createElement('div');
        feedbackContainer.id = 'listening-feedback-container';
        feedbackContainer.className = 'listening-feedback-container';
        listeningNotesContainer.appendChild(feedbackContainer);
    }
    
    // Clear previous feedback
    feedbackContainer.innerHTML = '';
    
    // Define correct answers
    const correctAnswers = {
        birthYear: "1908",
        award: "संस्कृति के चार अध्याय",
        poetType: "ओज के"
    };
    
    // Process birth year answer
    const birthYearValue = birthYearSelected.value;
    processAnswer(birthYearValue, correctAnswers.birthYear, 'birth-year', birthYearSelected, feedbackContainer);
    
    // Process award answer
    const awardValue = awardSelected.value;
    processAnswer(awardValue, correctAnswers.award, 'award', awardSelected, feedbackContainer);
    
    // Process poet type answer
    const poetTypeValue = poetTypeSelected.value;
    processAnswer(poetTypeValue, correctAnswers.poetType, 'poet-type', poetTypeSelected, feedbackContainer);
    
    // Calculate initial score from factual questions
    let correctCount = 0;
    if (birthYearValue === correctAnswers.birthYear) correctCount++;
    if (awardValue === correctAnswers.award) correctCount++;
    if (poetTypeValue === correctAnswers.poetType) correctCount++;
    
    // Process narrative selection (only option 1 is the correct answer for Geet-Ageet)
    const narrativeValue = narrativeSelected.value;
    const correctNarrativeValue = "1"; // Option 1 is the correct one
    const isNarrativeCorrect = narrativeValue === correctNarrativeValue;
    
    // Remove previous feedback icons from all narrative options
    document.querySelectorAll('label[for^="narrative"] .answer-feedback').forEach(icon => {
        icon.remove();
    });
    
    const narrativeLabel = document.querySelector(`label[for="narrative${narrativeValue}"]`);
    
    if (narrativeLabel) {
        const feedbackIcon = document.createElement('span');
        feedbackIcon.className = 'answer-feedback';
        feedbackIcon.innerHTML = isNarrativeCorrect ? '✓' : '✗';
        feedbackIcon.style.color = isNarrativeCorrect ? '#4caf50' : '#f44336';
        feedbackIcon.style.marginLeft = '10px';
        feedbackIcon.style.fontSize = '1.2rem';
        feedbackIcon.style.fontWeight = 'bold';
        feedbackIcon.style.display = 'inline-block';
        
        // Add the feedback icon
        narrativeLabel.appendChild(feedbackIcon);
        
        // Add to correctCount if narrative is correct
        if (isNarrativeCorrect) correctCount++;
        
        // Also add detailed feedback text in the container
        const narrativeFeedbackItem = document.createElement('div');
        narrativeFeedbackItem.className = `feedback-item ${isNarrativeCorrect ? 'correct' : 'incorrect'}`;
        narrativeFeedbackItem.textContent = isNarrativeCorrect ? 
            `✓ सही! आपने सबसे उपयुक्त विवरण चुना है।` : 
            `✗ गलत। विकल्प 1 सबसे उपयुक्त विवरण है।`;
        feedbackContainer.appendChild(narrativeFeedbackItem);
    }
    
    // Overall feedback
    const overallFeedback = document.createElement('div');
    overallFeedback.className = 'feedback-message show';
    overallFeedback.classList.add(correctCount === 4 ? 'success' : 'partial-success');
    overallFeedback.textContent = `आपने ${correctCount} प्रश्नों के सही उत्तर दिए (कुल 4 में से)!`;
    feedbackContainer.appendChild(overallFeedback);
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    // Narration removed as requested
}

// Helper function to process each answer and add visual feedback
function processAnswer(selectedValue, correctValue, inputName, selectedElement, feedbackContainer) {
    const isCorrect = selectedValue === correctValue;
    const label = document.querySelector(`label[for="${selectedElement.id}"]`);
    
    if (label) {
        // Create or update feedback icon
        let feedbackIcon = label.querySelector('.answer-feedback');
        
        if (!feedbackIcon) {
            feedbackIcon = document.createElement('span');
            feedbackIcon.className = 'answer-feedback';
            label.appendChild(feedbackIcon);
        }
        
        // Set the appropriate check/cross mark
        feedbackIcon.innerHTML = isCorrect ? '✓' : '✗';
        feedbackIcon.style.color = isCorrect ? '#4caf50' : '#f44336';
        feedbackIcon.style.marginLeft = '10px';
        feedbackIcon.style.fontSize = '1.2rem';
        feedbackIcon.style.fontWeight = 'bold';
        feedbackIcon.style.display = 'inline-block';
        
        // Add animation to make the feedback more visible
        feedbackIcon.style.animation = 'feedbackFade 0.3s ease forwards, pulse 2s infinite';
    }
    
    // Also add detailed feedback text in the container
    const feedbackItem = document.createElement('div');
    feedbackItem.className = `feedback-item ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackItem.textContent = isCorrect ? 
        `✓ सही! "${selectedValue}" सही उत्तर है।` : 
        `✗ गलत। सही उत्तर "${correctValue}" है।`;
    feedbackContainer.appendChild(feedbackItem);
}

// Function to check individual answers (copied from prashn abhyaas functionality)
window.checkAnswer = function(questionType) {
    const selectedOption = document.querySelector(`input[name="${questionType}"]:checked`);
    const feedbackEl = document.getElementById(`${questionType}-feedback`);
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया एक विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    const selectedValue = selectedOption.value;
    
    // Define correct answers
    const correctAnswers = {
        'birth-year': '1908',
        'award': 'संस्कृति के चार अध्याय',
        'poet-type': 'ओज के'
    };
    
    const correctAnswer = correctAnswers[questionType];
    const isCorrect = selectedValue === correctAnswer;
    
    // Add visual feedback to the selected option
    const label = document.querySelector(`label[for="${selectedOption.id}"]`);
    if (label) {
        // Remove any existing feedback icons
        const existingIcon = label.querySelector('.answer-feedback');
        if (existingIcon) {
            existingIcon.remove();
        }
        
        // Create new feedback icon
        const feedbackIcon = document.createElement('span');
        feedbackIcon.className = 'answer-feedback';
        feedbackIcon.innerHTML = isCorrect ? '✓' : '✗';
        feedbackIcon.style.color = isCorrect ? '#4caf50' : '#f44336';
        feedbackIcon.style.marginLeft = '10px';
        feedbackIcon.style.fontSize = '1.2rem';
        feedbackIcon.style.fontWeight = 'bold';
        feedbackIcon.style.display = 'inline-block';
        feedbackIcon.style.animation = 'feedbackFade 0.3s ease forwards, pulse 2s infinite';
        label.appendChild(feedbackIcon);
    }
    
    // Show feedback message
    feedbackEl.textContent = isCorrect ? 
        '✓ सही!' : 
        `✗ गलत। सही उत्तर है: ${correctAnswer}`;
    feedbackEl.className = `feedback-message show ${isCorrect ? 'success' : 'error'}`;
    
    // Update progress if correct
    if (isCorrect && typeof updateProgress === 'function') {
        updateProgress('activities', 5);
    }
    
    // Narration removed as requested
}

// Function to save vikalp (4th part) with specific message
window.saveVikalp = function() {
    const narrativeSelected = document.querySelector('input[name="narrative"]:checked');
    
    if (!narrativeSelected) {
        alert('कृपया एक विकल्प चुनें।');
        return;
    }
    
    // Show the specific message as requested
    alert('आपका विकल्प सहेज लिया गया है!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 10);
    }
    
    // Narration removed as requested
}