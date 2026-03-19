/**
 * Activities for Rahim Ke Dohe interactive Hindi lesson
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

// Rahim's life content for listening activity
const rahimLifeContent = `
रहीम का जन्म लाहौर (अब पाकिस्तान) में सन् 1556 में हुआ। इनका पूरा नाम अब्दुर्रहीम खानखाना था। रहीम अरबी, फ़ारसी, संस्कृत और हिंदी के अच्छे जानकार थे।

रहीम का जीवन कई महत्वपूर्ण घटनाओं से भरा है। वे अकबर के दरबार में महत्वपूर्ण स्थान रखते थे और उनके नवरत्नों में से एक थे। रहीम ने अपने जीवन में कई उतार-चढ़ाव देखे।

रहीम की नीतिपरक उक्तियों पर संस्कृत कवियों की स्पष्ट छाप परिलक्षित होती है। वे मध्ययुगीन दरबारी संस्कृति के प्रतिनिधि कवि माने जाते हैं। अकबर के दरबार में हिंदी कवियों में इनका महत्त्वपूर्ण स्थान था।

रहीम के काव्य का मुख्य विषय श्रृंगार, नीति और भक्ति है। वे बहुत लोकप्रिय कवि थे और उनके दोहे सर्वसाधारण को आसानी से याद हो जाते हैं। इनके नीतिपरक दोहे ज़्यादा प्रचलित हैं।

रहीम को अवधी और ब्रज दोनों भाषाओं पर समान अधिकार था। इन्होंने अपने काव्य में प्रभावपूर्ण भाषा का प्रयोग किया है। उनके दोहों में दैनिक जीवन के दृष्टांत देकर कवि ने उन्हें सहज, सरल और बोधगम्य बना दिया है।

रहीम की मृत्यु सन् 1626 में हुई। उनकी रचनाएँ आज भी उतनी ही प्रासंगिक हैं जितनी उनके समय में थीं। उनके दोहे मानवीय मूल्यों और नैतिकता की शिक्षा देते हैं।
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
        const contentParagraphs = rahimLifeContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    // Narration removed as requested
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
            // Narration removed as requested
        }
        
        // Start speaking the first paragraph
        speakSequentially(contentParagraphs);
    } else {
        alert('आपके ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है। कृपया रहीम के जीवन के बारे में पढ़ें।');
    }
}

// Rahim information for project work
const rahimInfo = {
    background: `
        रहीम हिंदी साहित्य के प्रमुख नीतिपरक कवि थे। उनका जन्म लाहौर में सन् 1556 में हुआ और उनकी मृत्यु सन् 1626 में हुई। वे अकबर के नवरत्नों में से एक थे।
        
        रहीम ने अपने दोहों के माध्यम से मानवीय मूल्यों और नैतिकता की शिक्षा दी। उन्होंने दैनिक जीवन के दृष्टांत देकर नीतिपरक शिक्षाओं को सहज, सरल और बोधगम्य बना दिया।
    `,
    photos: `
        रहीम के समय में फोटोग्राफी का आविष्कार नहीं हुआ था, इसलिए उनके वास्तविक चित्र उपलब्ध नहीं हैं। हालांकि, कई कलाकारों ने उनके कल्पित चित्र बनाए हैं जो उन्हें एक दरबारी वेशभूषा में दिखाते हैं। ये चित्र हमें रहीम के सरल और निर्मल जीवन की झलक देते हैं।
    `,
    template: `
        यह टेम्पलेट रहीम के जीवन और उनके दोहों पर आपके प्रोजेक्ट के लिए एक संरचना प्रदान करता है। इसमें निम्नलिखित खंड शामिल हैं:
        
        1. रहीम का जीवन परिचय
        2. रहीम के समय का सामाजिक और राजनीतिक परिवेश
        3. रहीम की प्रमुख रचनाएँ और उनका साहित्यिक योगदान
        4. रहीम के मुख्य विचार और दर्शन
        5. आज के समय में रहीम की प्रासंगिकता
    `
};

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'rahim-life':
            content = rahimInfo.background;
            break;
        case 'rahim-photos':
            content = rahimInfo.photos;
            break;
        case 'project-template':
            content = rahimInfo.template;
            break;
        default:
            content = 'संसाधन की जानकारी उपलब्ध नहीं है।';
    }
    
    alert(content);
    
    if (window.narrator) {
        // Narration removed as requested
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
            // Narration removed as requested
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
    
    // Feedback display removed as requested
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        // Narration removed as requested
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
        // Narration removed as requested
    }
}

// Save listening notes
function saveListeningNotes() {
    const birthYearSelected = document.querySelector('input[name="birth-year"]:checked');
    const courtSelected = document.querySelector('input[name="court"]:checked');
    const birthPlaceSelected = document.querySelector('input[name="birth-place"]:checked');
    
    if (!birthYearSelected || !courtSelected || !birthPlaceSelected) {
        alert('कृपया सभी प्रश्नों के उत्तर दें।');
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
    
    // Create feedback for court
    const courtValue = courtSelected.value;
    const courtFeedback = document.createElement('div');
    courtFeedback.className = 'feedback-item';
    if (typeof listeningAnswers !== 'undefined' && courtValue === listeningAnswers.court) {
        courtFeedback.classList.add('correct');
    } else {
        courtFeedback.classList.add('incorrect');
    }
    
    courtFeedback.textContent = typeof answerFeedback !== 'undefined' && answerFeedback.court && 
        answerFeedback.court[courtValue] ? answerFeedback.court[courtValue] : 
        (courtValue === listeningAnswers.court ? '✓ सही!' : '✗ गलत।');
    feedbackContainer.appendChild(courtFeedback);
    
    // Create feedback for birth place
    const birthPlaceValue = birthPlaceSelected.value;
    const birthPlaceFeedback = document.createElement('div');
    birthPlaceFeedback.className = 'feedback-item';
    if (typeof listeningAnswers !== 'undefined' && birthPlaceValue === listeningAnswers.birthPlace) {
        birthPlaceFeedback.classList.add('correct');
    } else {
        birthPlaceFeedback.classList.add('incorrect');
    }
    
    birthPlaceFeedback.textContent = typeof answerFeedback !== 'undefined' && answerFeedback.birthPlace && 
        answerFeedback.birthPlace[birthPlaceValue] ? answerFeedback.birthPlace[birthPlaceValue] : 
        (birthPlaceValue === listeningAnswers.birthPlace ? '✓ सही!' : '✗ गलत।');
    feedbackContainer.appendChild(birthPlaceFeedback);
    
    // Narrative section removed as it was hidden
    
    // Calculate score
    let correctCount = 0;
    if (birthYearValue === '1556') correctCount++;
    if (courtValue === 'अकबर') correctCount++;
    if (birthPlaceValue === 'लाहौर') correctCount++;
    
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
        // Narration removed as requested
    }
}
