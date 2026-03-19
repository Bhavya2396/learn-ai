/**
 * Activities for Raidas Ke Pad
 */

// Function to play listening activity audio
function playListeningActivity() {
    // In a real app, this would play an audio file
    if (narrator) {
        narrator.speak("रैदास का जन्म सन् 1388 में बनारस में हुआ और उन्होंने वहीं सन् 1518 में देहावसान किया। उनकी ख्याति दूर-दूर तक फैली हुई थी। यहाँ तक कि सिकंदर लोदी ने उन्हें दिल्ली आने का निमंत्रण भी भेजा था। रैदास के चालीस पद सिखों के पवित्र धर्मग्रंथ 'गुरुग्रंथ साहब' में भी सम्मिलित हैं। उनकी भाषा सरल, व्यावहारिक ब्रजभाषा है जिसमें अवधी, राजस्थानी, खड़ी बोली और उर्दू-फ़ारसी के शब्दों का मिश्रण है।");
    }
}

// Save listening notes
function saveListeningNotes() {
    const birthYearSelected = document.querySelector('input[name="birth-year"]:checked');
    const invitationSelected = document.querySelector('input[name="invitation"]:checked');
    const scriptureSelected = document.querySelector('input[name="scripture"]:checked');
    const narrativeSelected = document.querySelector('input[name="narrative"]:checked');
    
    if (!birthYearSelected || !invitationSelected || !scriptureSelected || !narrativeSelected) {
        alert('कृपया सभी प्रश्नों के उत्तर दें और एक कथात्मक विकल्प चुनें।');
        return;
    }
    
    // Correct answers
    const correctAnswers = {
        'birth-year': '1388',
        'invitation': 'दिल्ली',
        'scripture': 'गुरुग्रंथ साहब'
    };
    
    // Clear previous feedback
    document.querySelectorAll('.answer-feedback, .narrative-feedback').forEach(el => el.remove());
    
    // Add feedback for each question
    const questions = [
        { selected: birthYearSelected, correctValue: correctAnswers['birth-year'], questionId: 'birth-year' },
        { selected: invitationSelected, correctValue: correctAnswers['invitation'], questionId: 'invitation' },
        { selected: scriptureSelected, correctValue: correctAnswers['scripture'], questionId: 'scripture' }
    ];
    
    let correctCount = 0;
    
    questions.forEach(question => {
        const isCorrect = question.selected.value === question.correctValue;
        if (isCorrect) correctCount++;
        
        // Find the parent option-group
        const optionGroup = document.querySelector(`input[name="${question.questionId}"]`).closest('.option-group');
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `answer-feedback ${isCorrect ? 'correct-answer' : 'incorrect-answer'}`;
        feedback.innerHTML = isCorrect ? 
            '<span class="feedback-icon">✓</span> सही उत्तर!' : 
            `<span class="feedback-icon">✗</span> गलत उत्तर! सही उत्तर है: ${question.correctValue}`;
        
        // Add styles
        feedback.style.marginTop = '5px';
        feedback.style.padding = '5px 10px';
        feedback.style.borderRadius = '4px';
        feedback.style.fontWeight = 'bold';
        
        if (isCorrect) {
            feedback.style.backgroundColor = '#e6ffe6';
            feedback.style.color = '#008800';
        } else {
            feedback.style.backgroundColor = '#ffebeb';
            feedback.style.color = '#cc0000';
        }
        
        // Append feedback
        optionGroup.appendChild(feedback);
    });
    
    // Handle narrative selection - define the best narrative option
    const narrativeBest = "3"; // The most comprehensive description
    const narrativeValue = narrativeSelected.value;
    const narrativeContainer = document.querySelector('.narrative-options');
    
    // Add feedback for narrative selection
    const narrativeOptions = document.querySelectorAll('input[name="narrative"]');
    narrativeOptions.forEach(option => {
        const narrativeOptionDiv = option.closest('.narrative-option');
        const label = narrativeOptionDiv.querySelector('label');
        
        // Remove any existing feedback
        const existingFeedback = narrativeOptionDiv.querySelector('.narrative-feedback');
        if (existingFeedback) existingFeedback.remove();
        
        // Reset styles
        narrativeOptionDiv.style.backgroundColor = '';
        
        if (option.checked) {
            // Create feedback element
            const feedback = document.createElement('div');
            feedback.className = 'narrative-feedback';
            
            const isOptimal = option.value === narrativeBest && option.checked;
            
            if (isOptimal) {
                feedback.innerHTML = '<span style="color: #008800; font-weight: bold;">✓ उत्तम विकल्प!</span>';
                narrativeOptionDiv.style.backgroundColor = '#e6ffe6'; // Light green background
            } else {
                feedback.innerHTML = '<span style="color: #008800; font-weight: bold;">✓ अच्छा विकल्प!</span>';
                narrativeOptionDiv.style.backgroundColor = '#f0f8ff'; // Light blue background
            }
            
            // Style feedback
            feedback.style.marginTop = '5px';
            feedback.style.padding = '5px 10px';
            feedback.style.borderRadius = '4px';
            
            // Append feedback right after the label
            label.insertAdjacentElement('afterend', feedback);
        }
    });
    
    // Add overall feedback
    const listeningSectionEl = document.querySelector('.listening-activity');
    const existingFeedbackEl = listeningSectionEl.querySelector('.overall-feedback');
    
    if (existingFeedbackEl) {
        existingFeedbackEl.remove();
    }
    
    const overallFeedback = document.createElement('div');
    overallFeedback.className = 'overall-feedback feedback-message';
    
    if (correctCount === 3) {
        overallFeedback.classList.add('success');
        overallFeedback.textContent = 'उत्कृष्ट! आपने सभी प्रश्नों के सही उत्तर दिए हैं। आपका नैरेटिव चयन भी बहुत अच्छा है।';
    } else if (correctCount >= 1) {
        overallFeedback.classList.add('partial-success');
        overallFeedback.textContent = correctCount === 1 ? 
            'आप सही दिशा में हैं! एक सही उत्तर है। अन्य प्रश्नों पर फिर से विचार करें।' : 
            `अच्छा प्रयास! ${correctCount} सही उत्तर हैं। अन्य प्रश्नों पर फिर से विचार करें।`;
    } else {
        overallFeedback.classList.add('error');
        overallFeedback.textContent = 'कृपया ऑडियो को और ध्यान से सुनें और फिर से प्रयास करें।';
    }
    
    // Add styles
    overallFeedback.style.marginTop = '20px';
    overallFeedback.style.padding = '10px';
    overallFeedback.style.borderRadius = '4px';
    overallFeedback.style.fontWeight = 'bold';
    overallFeedback.style.textAlign = 'center';
    
    // Append overall feedback
    const buttonContainer = document.querySelector('.listening-notes button').parentElement;
    buttonContainer.after(overallFeedback);
    
    // Update progress
    score += correctCount * 5;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('श्रवण गतिविधि पूर्ण!');
    }
    
    if (narrator) {
        narrator.speak(overallFeedback.textContent);
    }
}

// Save writing
function saveWriting() {
    const selectedOption = document.querySelector('input[name="writing-option"]:checked');
    
    if (!selectedOption) {
        alert('कृपया कोई एक विकल्प चुनें।');
        return;
    }
    
    // Define the best option (but all are valid)
    const bestOption = "3"; // Option about humanistic values
    const isOptimal = selectedOption.value === bestOption;
    
    // Clear previous feedback
    const writingSection = document.querySelector('.writing-activity');
    const existingFeedback = writingSection.querySelector('.writing-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Mark all options appropriately
    document.querySelectorAll('input[name="writing-option"]').forEach(option => {
        // Remove previous feedback icons
        const label = option.parentElement.querySelector('label');
        const existingIcon = label.querySelector('.feedback-icon');
        if (existingIcon) existingIcon.remove();
        
        // Reset styles
        option.parentElement.style.backgroundColor = '';
        label.style.fontWeight = '';
        
        if (option === selectedOption) {
            // Create feedback icon
            const icon = document.createElement('span');
            icon.className = 'feedback-icon';
            icon.style.marginRight = '8px';
            icon.style.fontWeight = 'bold';
            
            if (isOptimal) {
                // Best answer
                icon.textContent = '✓';
                icon.style.color = '#008800';
                option.parentElement.style.backgroundColor = '#e6ffe6';
            } else {
                // Good answer but not the best
                icon.textContent = '✓';
                icon.style.color = '#008800';  // Still show as correct since all are valid
                option.parentElement.style.backgroundColor = '#f0f8ff'; // Light blue for "good but not best"
            }
            
            // Insert icon at beginning of label
            label.prepend(icon);
            
            // Make selected option stand out
            label.style.fontWeight = 'bold';
        }
    });
    
    // Create overall feedback
    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'writing-feedback feedback-message success';
    
    if (isOptimal) {
        feedbackEl.textContent = 'उत्कृष्ट विकल्प! आपने सर्वोत्तम उत्तर चुना है! यह रैदास के मानवीय मूल्यों पर आधारित विचारों को सर्वश्रेष्ठ रूप से प्रस्तुत करता है।';
    } else {
        feedbackEl.textContent = 'अच्छा विकल्प! आपका चयन रैदास के विचारों के महत्वपूर्ण पहलू पर प्रकाश डालता है।';
    }
    
    // Style feedback
    feedbackEl.style.marginTop = '20px';
    feedbackEl.style.padding = '10px';
    feedbackEl.style.borderRadius = '4px';
    feedbackEl.style.fontWeight = 'bold';
    feedbackEl.style.textAlign = 'center';
    
    // Add feedback to page
    const buttonContainer = document.querySelector('.writing-selection').nextElementSibling;
    buttonContainer.after(feedbackEl);
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    // Speak feedback
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}
