/**
 * Activities for Agni Path interactive Hindi lesson
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
    
    // Listening activity button removed - no longer needed
    
    // Open writing pad button
    const writeBtn = document.querySelector('.writing-activity .interactive-btn');
    if (writeBtn) {
        writeBtn.addEventListener('click', openWritingPad);
    }
    
    // Save reflection buttons in both modules
    const saveReflectionBtns = document.querySelectorAll('.reflection-exercise .interactive-btn');
    saveReflectionBtns.forEach(btn => {
        btn.addEventListener('click', saveReflection);
    });
    
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

// Bachchan's life content for listening activity
const bachchanLifeContent = `
हरिवंशराय बच्चन का जन्म 27 नवंबर 1907 को उत्तर प्रदेश के इलाहाबाद शहर में हुआ था। 'बच्चन' इनका माता-पिता द्वारा प्यार से लिया जानेवाला नाम था, जिसे इन्होंने अपना उपनाम बना लिया था।

बच्चन कुछ समय तक विश्वविद्यालय में प्राध्यापक रहने के बाद भारतीय विदेश सेवा में चले गए थे। इस दौरान इन्होंने कई देशों का भ्रमण किया और मंच पर ओजस्वी वाणी में काव्यपाठ के लिए विख्यात हुए।

बच्चन की कविताएँ सहज और संवेदनशील हैं। इनकी रचनाओं में व्यक्ति-वेदना, राष्ट्र-चेतना और जीवन-दर्शन के स्वर मिलते हैं। इन्होंने आत्मविश्लेषणवाली कविताएँ भी लिखी हैं।

बच्चन ने राजनैतिक जीवन के ढोंग, सामाजिक असमानता और कुरीतियों पर व्यंग्य किया है। कविता के अलावा बच्चन ने अपनी आत्मकथा भी लिखी, जो हिंदी गद्य की बेजोड़ कृति मानी गई।

बच्चन की प्रमुख कृतियाँ हैं: मधुशाला, निशा-निमंत्रण, एकांत संगीत, मिलन-यामिनी, आरती और अंगारे, टूटती चट्टानें, रूप तरंगिणी और आत्मकथा के चार खंड।

बच्चन साहित्य अकादमी पुरस्कार, सोवियत भूमि नेहरू पुरस्कार और सरस्वती सम्मान से सम्मानित हुए। उनकी कविताएँ आज भी पाठकों को प्रेरणा देती हैं।
`;

// Listening activity audio function removed - no longer needed

// Bachchan information for project work
const bachchanInfo = {
    background: `
        हरिवंशराय बच्चन हिंदी साहित्य के प्रमुख कवि थे। उनका जन्म 1907 में इलाहाबाद में हुआ था। वे एक महान कवि थे जिन्होंने मधुशाला जैसी प्रसिद्ध कृतियाँ लिखीं।
        
        बच्चन ने अपनी कविताओं में व्यक्ति-वेदना, राष्ट्र-चेतना और जीवन-दर्शन के स्वर मिलाए। उनकी कविताएँ सहज और संवेदनशील हैं जो आज भी पाठकों को प्रभावित करती हैं।
    `,
    photos: `
        हरिवंशराय बच्चन के कई चित्र उपलब्ध हैं जो उनके जीवन और कार्यों को दर्शाते हैं। ये चित्र हमें उनके व्यक्तित्व और उनकी काव्य-यात्रा की झलक देते हैं।
    `,
    template: `
        यह टेम्पलेट हरिवंशराय बच्चन के जीवन और उनकी कविता 'अग्नि पथ' पर आपके प्रोजेक्ट के लिए एक संरचना प्रदान करता है। इसमें निम्नलिखित खंड शामिल हैं:
        
        1. हरिवंशराय बच्चन का जीवन परिचय
        2. उनकी प्रमुख रचनाएँ
        3. कविता 'अग्नि पथ' का विश्लेषण
        4. कविता में प्रयुक्त शब्दों की पुनरावृत्ति का प्रभाव
        5. आज के समय में कविता की प्रासंगिकता
    `
};

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'bachchan-life':
            content = bachchanInfo.background;
            break;
        case 'bachchan-photos':
            content = bachchanInfo.photos;
            break;
        case 'project-template':
            content = bachchanInfo.template;
            break;
        default:
            content = 'संसाधन की जानकारी उपलब्ध नहीं है।';
    }
    
    alert(content);
    
    // Audio feedback removed - no longer needed
}

// This function is no longer needed as we've replaced the writing pad with selection options
function openWritingPad() {
    // Scroll to the writing selection area
    const writingSelection = document.querySelector('.writing-selection');
    if (writingSelection) {
        writingSelection.scrollIntoView({ behavior: 'smooth' });
        
        // Instructions provided via visual text only
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
    
    // Audio feedback removed - visual feedback only
}

// Record speaking response
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('वास्तविक कार्यान्वयन में, यह Web Audio API का उपयोग करके आपकी बोली हुई प्रतिक्रिया रिकॉर्ड करेगा।');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 10);
    }
    
    // Audio instructions removed - visual instructions only
}

// Function to handle reflection submissions with good, better, best feedback
function saveReflection() {
    // Determine which module's reflection form was submitted
    const reflectionExercise = this.closest('.reflection-exercise');
    
    if (!reflectionExercise) {
        console.error('Reflection exercise container not found');
        return;
    }
    
    // Find the checked radio button
    const selectedOption = reflectionExercise.querySelector('input[name="reflection"]:checked');
    
    if (!selectedOption) {
        alert('कृपया कोई एक विकल्प चुनें।');
        return;
    }
    
    const selectedValue = selectedOption.value;
    const moduleId = this.closest('.module').id;
    
    // Determine which set of answers to use
    let answerSet = moduleId === 'prereading' ? prereadingReflectionAnswers : reflectionAnswers;
    let feedbackType = moduleId === 'prereading' ? 'prereadingReflection' : 'reflection';
    
    // Get feedback element or create one if it doesn't exist
    let feedbackElement = reflectionExercise.querySelector('#reflectionFeedback');
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'reflectionFeedback';
        feedbackElement.className = 'feedback-message';
        reflectionExercise.appendChild(feedbackElement);
    }
    
    // Determine quality of answer (good, better, best)
    let qualityLabel = '';
    let feedbackClass = '';
    let optionClass = '';
    
    if (selectedValue === answerSet.best) {
        qualityLabel = 'उत्तम';
        feedbackClass = 'success';
        optionClass = 'best-option';
    } else if (answerSet.acceptable.includes(selectedValue)) {
        qualityLabel = 'बेहतर';
        feedbackClass = 'partial-success';
        optionClass = 'good-option';
    } else {
        qualityLabel = 'अच्छा';
        feedbackClass = 'partial-success';
        optionClass = 'good-option';
    }
    
    // Remove any previous highlighting
    reflectionExercise.querySelectorAll('.reflection-option').forEach(option => {
        option.classList.remove('selected-option', 'best-option', 'good-option');
    });
    
    // Highlight the selected option
    const selectedOptionContainer = selectedOption.closest('.reflection-option');
    if (selectedOptionContainer) {
        selectedOptionContainer.classList.add('selected-option', optionClass);
    }
    
    // Display appropriate feedback
    if (typeof answerFeedback !== 'undefined' && answerFeedback[feedbackType] && answerFeedback[feedbackType][selectedValue]) {
        feedbackElement.innerHTML = `<strong>${qualityLabel}:</strong> ${answerFeedback[feedbackType][selectedValue]}`;
        feedbackElement.className = `feedback-message show ${feedbackClass}`;
    } else {
        feedbackElement.innerHTML = `<strong>${qualityLabel}:</strong> आपका विकल्प सहेज लिया गया है!`;
        feedbackElement.className = `feedback-message show ${feedbackClass}`;
    }
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress(moduleId, 15);
    }
    
    // Audio feedback removed - visual feedback only
}

// Save listening notes
function saveListeningNotes() {
    const birthYearSelected = document.querySelector('input[name="birth-year"]:checked');
    const birthPlaceSelected = document.querySelector('input[name="birth-place"]:checked');
    const famousWorkSelected = document.querySelector('input[name="famous-work"]:checked');
    const narrativeSelected = document.querySelector('input[name="narrative"]:checked');
    
    if (!birthYearSelected || !birthPlaceSelected || !famousWorkSelected || !narrativeSelected) {
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
    
    // Create feedback for famous work
    const famousWorkValue = famousWorkSelected.value;
    const famousWorkFeedback = document.createElement('div');
    famousWorkFeedback.className = 'feedback-item';
    if (typeof listeningAnswers !== 'undefined' && famousWorkValue === listeningAnswers.famousWork) {
        famousWorkFeedback.classList.add('correct');
    } else {
        famousWorkFeedback.classList.add('incorrect');
    }
    
    famousWorkFeedback.textContent = typeof answerFeedback !== 'undefined' && answerFeedback.famousWork && 
        answerFeedback.famousWork[famousWorkValue] ? answerFeedback.famousWork[famousWorkValue] : 
        (famousWorkValue === listeningAnswers.famousWork ? '✓ सही!' : '✗ गलत।');
    feedbackContainer.appendChild(famousWorkFeedback);
    
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
    if (birthPlaceValue === listeningAnswers.birthPlace) correctCount++;
    if (famousWorkValue === listeningAnswers.famousWork) correctCount++;
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
    
    // Audio feedback removed - visual feedback only
}
