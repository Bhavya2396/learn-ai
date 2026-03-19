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

// Play the listening activity audio
function playListeningActivity() {
    if (window.narrator) {
        // Make sure the user has interacted with the page
        if (typeof trackUserInteraction === 'function') {
            trackUserInteraction();
        }
        
        // First stop any ongoing narration
        if (window.narrator.stop) {
            window.narrator.stop();
        }
        
        // Break content into smaller paragraphs to avoid interruption
        const contentParagraphs = kabirLifeContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("अब कृपया पहले बॉक्स में नोट्स लिखें। फिर दूसरे बॉक्स में एक कथा लिखें।");
                }, 1000);
                return;
            }
            
            // Set callback for when this paragraph ends
            window.narrator.onEndCallback = function() {
                // Small pause between paragraphs
                setTimeout(() => {
                    speakSequentially(paragraphs, index + 1);
                }, 300);
            };
            
            // Speak the current paragraph
            window.narrator.speak(paragraphs[index]);
        }
        
        // Start speaking the first paragraph
        speakSequentially(contentParagraphs);
    } else {
        alert('आपके ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है। कृपया कबीर के जीवन के बारे में पढ़ें।');
    }
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
    
    if (window.narrator) {
        window.narrator.speak(content);
    }
}

// This function is no longer needed as we've replaced the writing pad with selection options
function openWritingPad() {
    // Scroll to the writing selection area
    const writingSelection = document.querySelector('.writing-selection');
    if (writingSelection) {
        writingSelection.scrollIntoView({ behavior: 'smooth' });
        
        // Provide instructions via narrator
        if (window.narrator) {
            window.narrator.speak("कृपया कबीर के विचारों की वर्तमान प्रासंगिकता पर दिए गए विकल्पों में से एक चुनें।");
        }
    } else {
        console.error('Writing selection element not found');
    }
}

// Save writing function
function saveWriting() {
    const selectedOption = document.querySelector('input[name="writing-option"]:checked');
    
    if (!selectedOption) {
        alert('कृपया कोई एक विकल्प चुनें।');
        return;
    }
    
    const selectedValue = selectedOption.value;
    
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
        feedbackElement.textContent = "आपका विकल्प सहेज लिया गया है!";
        feedbackElement.className = 'feedback-message show success';
    }
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak("उत्कृष्ट कार्य! " + feedbackElement.textContent);
    }
}

// Record speaking response
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('वास्तविक कार्यान्वयन में, यह Web Audio API का उपयोग करके आपकी बोली हुई प्रतिक्रिया रिकॉर्ड करेगा।');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 10);
    }
    
    if (window.narrator) {
        window.narrator.speak("कबीर की शिक्षाओं और उनकी वर्तमान प्रासंगिकता के बारे में अपने विचार साझा करें।");
    }
}

// Save listening notes
function saveListeningNotes() {
    const birthYearSelected = document.querySelector('input[name="birth-year"]:checked');
    const guruSelected = document.querySelector('input[name="guru"]:checked');
    const deathPlaceSelected = document.querySelector('input[name="death-place"]:checked');
    const narrativeSelected = document.querySelector('input[name="narrative"]:checked');
    
    if (!birthYearSelected || !guruSelected || !deathPlaceSelected || !narrativeSelected) {
        alert('कृपया सभी प्रश्नों के उत्तर दें और एक कथात्मक विकल्प चुनें।');
        return;
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
    
    // Create feedback for birth year
    const birthYearValue = birthYearSelected.value;
    const birthYearFeedback = document.createElement('div');
    birthYearFeedback.className = 'feedback-item';
    if (typeof listeningAnswers !== 'undefined' && birthYearValue === listeningAnswers.birthYear) {
        birthYearFeedback.classList.add('correct');
    } else {
        birthYearFeedback.classList.add('incorrect');
    }
    
    birthYearFeedback.textContent = typeof answerFeedback !== 'undefined' && answerFeedback.birthYear && 
        answerFeedback.birthYear[birthYearValue] ? answerFeedback.birthYear[birthYearValue] : 
        (birthYearValue === listeningAnswers.birthYear ? '✓ सही!' : '✗ गलत।');
    feedbackContainer.appendChild(birthYearFeedback);
    
    // Create feedback for guru
    const guruValue = guruSelected.value;
    const guruFeedback = document.createElement('div');
    guruFeedback.className = 'feedback-item';
    if (typeof listeningAnswers !== 'undefined' && guruValue === listeningAnswers.guru) {
        guruFeedback.classList.add('correct');
    } else {
        guruFeedback.classList.add('incorrect');
    }
    
    guruFeedback.textContent = typeof answerFeedback !== 'undefined' && answerFeedback.guru && 
        answerFeedback.guru[guruValue] ? answerFeedback.guru[guruValue] : 
        (guruValue === listeningAnswers.guru ? '✓ सही!' : '✗ गलत।');
    feedbackContainer.appendChild(guruFeedback);
    
    // Create feedback for death place
    const deathPlaceValue = deathPlaceSelected.value;
    const deathPlaceFeedback = document.createElement('div');
    deathPlaceFeedback.className = 'feedback-item';
    if (typeof listeningAnswers !== 'undefined' && deathPlaceValue === listeningAnswers.deathPlace) {
        deathPlaceFeedback.classList.add('correct');
    } else {
        deathPlaceFeedback.classList.add('incorrect');
    }
    
    deathPlaceFeedback.textContent = typeof answerFeedback !== 'undefined' && answerFeedback.deathPlace && 
        answerFeedback.deathPlace[deathPlaceValue] ? answerFeedback.deathPlace[deathPlaceValue] : 
        (deathPlaceValue === listeningAnswers.deathPlace ? '✓ सही!' : '✗ गलत।');
    feedbackContainer.appendChild(deathPlaceFeedback);
    
    // Create feedback for narrative
    const narrativeValue = narrativeSelected.value;
    const narrativeFeedback = document.createElement('div');
    narrativeFeedback.className = 'feedback-item';
    narrativeFeedback.classList.add('correct'); // All narrative options are valid
    
    narrativeFeedback.textContent = typeof answerFeedback !== 'undefined' && answerFeedback.narrative && 
        answerFeedback.narrative[narrativeValue] ? answerFeedback.narrative[narrativeValue] : 
        '✓ अच्छा विकल्प!';
    feedbackContainer.appendChild(narrativeFeedback);
    
    // Calculate score
    let correctCount = 0;
    if (birthYearValue === listeningAnswers.birthYear) correctCount++;
    if (guruValue === listeningAnswers.guru) correctCount++;
    if (deathPlaceValue === listeningAnswers.deathPlace) correctCount++;
    // Narrative is always considered correct
    
    // Overall feedback
    const overallFeedback = document.createElement('div');
    overallFeedback.className = 'feedback-message show';
    overallFeedback.classList.add(correctCount === 3 ? 'success' : 'partial-success');
    overallFeedback.textContent = `आपने ${correctCount} तथ्यात्मक प्रश्नों के सही उत्तर दिए!`;
    feedbackContainer.appendChild(overallFeedback);
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak(`बहुत अच्छा! आपने ${correctCount} तथ्यात्मक प्रश्नों के सही उत्तर दिए!`);
    }
}
