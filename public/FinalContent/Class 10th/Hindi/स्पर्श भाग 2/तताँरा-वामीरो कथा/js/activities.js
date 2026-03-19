/**
 * Interactive activities for Tatara-Vamiro Hindi lesson
 */

// Define listening answers in case they're not available from activity-answers.js
if (typeof window.listeningAnswers === 'undefined') {
    window.listeningAnswers = {
        country: "भारत",
        narrative: "3" // This is the index of the correct narrative option
    };
}

// Define writing answers in case they're not available from activity-answers.js
if (typeof window.writingAnswers === 'undefined') {
    window.writingAnswers = {
        best: "4", // All themes are present in the story - this is the only correct answer
        acceptable: [] // No other acceptable answers
    };
}

// Define answerFeedback if not available
if (typeof window.answerFeedback === 'undefined') {
    window.answerFeedback = {
        writing: {
            "1": "यह उत्तर सही नहीं है। प्रेम की शक्ति कहानी का एक महत्वपूर्ण विषय है, लेकिन यह एकमात्र विषय नहीं है।",
            "2": "यह उत्तर सही नहीं है। सामाजिक रूढ़ियों पर प्रहार कहानी का एक प्रमुख विषय है, लेकिन यह एकमात्र विषय नहीं है।",
            "3": "यह उत्तर सही नहीं है। बलिदान का महत्व कहानी का एक महत्वपूर्ण संदेश है, लेकिन यह एकमात्र विषय नहीं है।",
            "4": "शाबाश! आपका उत्तर बिलकुल सही है। कहानी में प्रेम की शक्ति, सामाजिक रूढ़ियों पर प्रहार, बलिदान का महत्व और परिवर्तन की आवश्यकता - सभी विचार समाहित हैं।"
        },
        listening: {
            correct: "शाबाश! आपने अंदमान-निकोबार द्वीपसमूह के बारे में तथ्यों को सही पहचाना है।",
            incorrect: "इन तथ्यों पर पुनः विचार करें। अंदमान-निकोबार द्वीपसमूह भारत का एक केंद्र शासित प्रदेश है।"
        }
    };
}

// Initialize activities when document is ready
document.addEventListener('DOMContentLoaded', () => {
    setupCheckAnswerButtons();
});

// Check vocabulary knowledge in activities section
function checkActivityVocabulary() {
    const vocab1 = document.getElementById('vocab1').value;
    const vocab2 = document.getElementById('vocab2').value;
    const vocab3 = document.getElementById('vocab3').value;
    const vocab4 = document.getElementById('vocab4').value;
    const vocab5 = document.getElementById('vocab5').value;
    
    const feedbackEl = document.getElementById('vocabFeedback');
    
    // Check if all selections are made
    if (!vocab1 || !vocab2 || !vocab3 || !vocab4 || !vocab5) {
        feedbackEl.textContent = 'कृपया सभी शब्दों के लिए विकल्प चुनें।';
        feedbackEl.className = 'feedback-message warning show';
        return;
    }
    
    // Check answers against correct values
    let correctCount = 0;
    if (vocab1 === vocabularyAnswers.vocab1) correctCount++;
    if (vocab2 === vocabularyAnswers.vocab2) correctCount++;
    if (vocab3 === vocabularyAnswers.vocab3) correctCount++;
    if (vocab4 === vocabularyAnswers.vocab4) correctCount++;
    if (vocab5 === vocabularyAnswers.vocab5) correctCount++;
    
    // Determine feedback based on number of correct answers
    let feedbackText, feedbackClass;
    if (correctCount === 5) {
        feedbackText = answerFeedback.vocabulary.all_correct;
        feedbackClass = 'success';
    } else if (correctCount > 0) {
        feedbackText = answerFeedback.vocabulary.some_correct + ` (${correctCount}/5 सही)`;
        feedbackClass = 'partial-success';
    } else {
        feedbackText = answerFeedback.vocabulary.none_correct;
        feedbackClass = 'error';
    }
    
    // Display feedback
    feedbackEl.textContent = feedbackText;
    feedbackEl.className = `feedback-message ${feedbackClass} show`;
    
    // Update score if at least one correct answer
    if (correctCount > 0 && typeof updateScore === 'function') {
        // Each correct answer is worth 2 points
        updateScore(correctCount * 2);
    }
    
    // Highlight correct and incorrect answers
    highlightVocabularyAnswers();
    
    // If narrator is available, speak the feedback
    if (window.narrator) {
        window.narrator.speak(feedbackText);
    }
}

// Highlight correct and incorrect vocabulary answers
function highlightVocabularyAnswers() {
    const vocabItems = [
        { id: 'vocab1', correct: vocabularyAnswers.vocab1 },
        { id: 'vocab2', correct: vocabularyAnswers.vocab2 },
        { id: 'vocab3', correct: vocabularyAnswers.vocab3 },
        { id: 'vocab4', correct: vocabularyAnswers.vocab4 },
        { id: 'vocab5', correct: vocabularyAnswers.vocab5 }
    ];
    
    vocabItems.forEach(item => {
        const select = document.getElementById(item.id);
        if (!select) return;
        
        // Get the selected value
        const selectedValue = select.value;
        
        // Remove any existing highlight classes
        select.classList.remove('correct-answer', 'incorrect-answer');
        
        // Add appropriate highlight class
        if (selectedValue === item.correct) {
            select.classList.add('correct-answer');
        } else if (selectedValue) {
            select.classList.add('incorrect-answer');
        }
    });
}

// Check sentence type knowledge
function checkContractions() {
    const contraction1 = document.getElementById('contraction1').value;
    const contraction2 = document.getElementById('contraction2').value;
    const contraction3 = document.getElementById('contraction3').value;
    
    const feedbackEl = document.getElementById('contractionFeedback');
    
    // Check if all selections are made
    if (!contraction1 || !contraction2 || !contraction3) {
        feedbackEl.textContent = 'कृपया सभी वाक्यों के लिए वाक्य प्रकार चुनें।';
        feedbackEl.className = 'feedback-message warning show';
        return;
    }
    
    // Check answers against correct values
    let correctCount = 0;
    if (contraction1 === sentenceTypeAnswers.contraction1) correctCount++;
    if (contraction2 === sentenceTypeAnswers.contraction2) correctCount++;
    if (contraction3 === sentenceTypeAnswers.contraction3) correctCount++;
    
    // Determine feedback based on number of correct answers
    let feedbackText, feedbackClass;
    if (correctCount === 3) {
        feedbackText = answerFeedback.contraction.all_correct;
        feedbackClass = 'success';
    } else if (correctCount > 0) {
        feedbackText = answerFeedback.contraction.some_correct + ` (${correctCount}/3 सही)`;
        feedbackClass = 'partial-success';
    } else {
        feedbackText = answerFeedback.contraction.none_correct;
        feedbackClass = 'error';
    }
    
    // Display feedback
    feedbackEl.textContent = feedbackText;
    feedbackEl.className = `feedback-message ${feedbackClass} show`;
    
    // Update score if at least one correct answer
    if (correctCount > 0 && typeof updateScore === 'function') {
        // Each correct answer is worth 3 points
        updateScore(correctCount * 3);
    }
    
    // Highlight correct and incorrect answers
    highlightContractionAnswers();
    
    // If narrator is available, speak the feedback
    if (window.narrator) {
        window.narrator.speak(feedbackText);
    }
}

// Highlight correct and incorrect sentence type answers
function highlightContractionAnswers() {
    const contractionItems = [
        { id: 'contraction1', correct: sentenceTypeAnswers.contraction1 },
        { id: 'contraction2', correct: sentenceTypeAnswers.contraction2 },
        { id: 'contraction3', correct: sentenceTypeAnswers.contraction3 }
    ];
    
    contractionItems.forEach(item => {
        const select = document.getElementById(item.id);
        if (!select) return;
        
        // Get the selected value
        const selectedValue = select.value;
        
        // Remove any existing highlight classes
        select.classList.remove('correct-answer', 'incorrect-answer');
        
        // Add appropriate highlight class
        if (selectedValue === item.correct) {
            select.classList.add('correct-answer');
        } else if (selectedValue) {
            select.classList.add('incorrect-answer');
        }
    });
}

// Check listening activity answers
function checkListeningAnswers() {
    const countrySelected = document.querySelector('input[name="country"]:checked');
    const narrativeSelected = document.querySelector('input[name="narrative"]:checked');
    
    if (!countrySelected || !narrativeSelected) {
        // Create or update inline validation message
        const listeningNotes = document.querySelector('.listening-notes');
        if (listeningNotes) {
            // Remove any existing feedback
            const existingFeedback = listeningNotes.querySelector('.validation-message');
            if (existingFeedback) {
                existingFeedback.remove();
            }
            
            // Create validation message
            const validationMessage = document.createElement('div');
            validationMessage.className = 'validation-message';
            validationMessage.innerHTML = '⚠️ कृपया सभी प्रश्नों के उत्तर दें और एक कथात्मक विकल्प चुनें।';
            validationMessage.style.color = '#856404';
            validationMessage.style.backgroundColor = '#fff3cd';
            validationMessage.style.padding = '10px';
            validationMessage.style.borderRadius = '4px';
            validationMessage.style.marginBottom = '15px';
            validationMessage.style.borderLeft = '4px solid #ffc107';
            
            // Insert at the top of the container
            listeningNotes.insertBefore(validationMessage, listeningNotes.firstChild);
            
            // Auto-scroll to the message
            validationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (validationMessage.parentNode) {
                    validationMessage.classList.add('fade-out');
                    setTimeout(() => validationMessage.remove(), 500);
                }
            }, 5000);
        }
        return;
    }
    
    // Check if the answers are correct
    const isCountryCorrect = countrySelected.value === window.listeningAnswers.country;
    const isNarrativeCorrect = narrativeSelected.value === window.listeningAnswers.narrative;
    
    // Create a container for detailed feedback
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'listening-feedback-container';
    
    // Add feedback for country selection
    const countryFeedback = document.createElement('div');
    if (isCountryCorrect) {
        countryFeedback.className = 'feedback-item correct';
        countryFeedback.innerHTML = '✓ अंदमान निकोबार द्वीपसमूह भारत का हिस्सा है - सही!';
    } else {
        countryFeedback.className = 'feedback-item incorrect';
        countryFeedback.innerHTML = '✗ अंदमान निकोबार द्वीपसमूह भारत का हिस्सा है, आपका उत्तर सही नहीं है।';
    }
    feedbackContainer.appendChild(countryFeedback);
    
    // Mark all country options with visual indicators
    document.querySelectorAll('input[name="country"]').forEach(radio => {
        // Remove any existing indicators
        const parentLabel = radio.nextElementSibling;
        const existingIndicator = parentLabel.querySelector('.answer-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // Remove any existing classes
        parentLabel.classList.remove('correct-label', 'incorrect-label');
        
        // Add indicator to show correct/incorrect status
        const indicator = document.createElement('span');
        indicator.className = 'answer-indicator';
        
        if (radio.value === window.listeningAnswers.country) {
            // This is the correct answer
            indicator.innerHTML = ' ✓ (सही उत्तर)';
            indicator.classList.add('correct');
            parentLabel.classList.add('correct-label');
            parentLabel.appendChild(indicator);
        } else if (radio.checked) {
            // This is an incorrect selected answer
            indicator.innerHTML = ' ✗ (गलत उत्तर)';
            indicator.classList.add('incorrect');
            parentLabel.classList.add('incorrect-label');
            parentLabel.appendChild(indicator);
        }
    });
    
    // Add feedback for narrative selection
    const narrativeFeedback = document.createElement('div');
    if (isNarrativeCorrect) {
        narrativeFeedback.className = 'feedback-item correct';
        narrativeFeedback.innerHTML = '✓ आपने अंदमान निकोबार के निवासियों के बारे में सही विवरण चुना है!';
    } else {
        narrativeFeedback.className = 'feedback-item incorrect';
        narrativeFeedback.innerHTML = '✗ आपका चयन अंदमान निकोबार के निवासियों के बारे में सही विवरण नहीं है।';
    }
    feedbackContainer.appendChild(narrativeFeedback);
    
    // Mark all narrative options with visual indicators
    document.querySelectorAll('input[name="narrative"]').forEach(radio => {
        // Remove any existing indicators
        const parentLabel = radio.nextElementSibling;
        const existingIndicator = parentLabel.querySelector('.answer-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // Remove any existing classes
        parentLabel.classList.remove('correct-label', 'incorrect-label');
        
        // Add indicator to show correct/incorrect status
        const indicator = document.createElement('span');
        indicator.className = 'answer-indicator';
        
        if (radio.value === window.listeningAnswers.narrative) {
            // This is the correct answer
            indicator.innerHTML = ' ✓ (सही उत्तर)';
            indicator.classList.add('correct');
            parentLabel.classList.add('correct-label');
            parentLabel.appendChild(indicator);
        } else if (radio.checked) {
            // This is an incorrect selected answer
            indicator.innerHTML = ' ✗ (गलत उत्तर)';
            indicator.classList.add('incorrect');
            parentLabel.classList.add('incorrect-label');
            parentLabel.appendChild(indicator);
        }
    });
    
    // Calculate points and add score feedback
    let correctCount = 0;
    if (isCountryCorrect) correctCount++;
    if (isNarrativeCorrect) correctCount++;
    
    let pointsToAdd = 0;
    if (isCountryCorrect) pointsToAdd += 5;
    if (isNarrativeCorrect) pointsToAdd += 10;
    
    if (pointsToAdd > 0) {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'feedback-item correct';
        scoreItem.textContent = `आपने ${pointsToAdd} अंक अर्जित किए!`;
        feedbackContainer.appendChild(scoreItem);
        
        // Update score
        if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
            score += pointsToAdd;
            document.getElementById('totalScore').textContent = score;
        }
    }
    
    // Find container to append feedback
    const listeningNotes = document.querySelector('.listening-notes');
    if (listeningNotes) {
        // Remove any existing feedback
        const existingFeedback = listeningNotes.querySelector('.listening-feedback-container');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Add new feedback
        listeningNotes.appendChild(feedbackContainer);
        
        // Scroll to the feedback
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Update module completion status
    if (isCountryCorrect && isNarrativeCorrect) {
        if (!modulesCompleted.includes('activities')) {
            modulesCompleted.push('activities');
            updateProgress();
            showAchievement('श्रवण गतिविधि पूर्ण!');
        }
    }
    
    // If narrator is available, speak the feedback
    if (window.narrator) {
        window.narrator.speak(`आपने ${correctCount} प्रश्नों में से ${correctCount} सही उत्तर दिए हैं।`);
    }
}

// Check writing activity answers
function checkWritingAnswers() {
    const selectedOption = document.querySelector('input[name="writing-option"]:checked');
    
    if (!selectedOption) {
        // Create or update inline validation message
        const writingSelection = document.querySelector('.writing-selection');
        if (writingSelection) {
            // Remove any existing feedback
            const existingFeedback = writingSelection.querySelector('.validation-message');
            if (existingFeedback) {
                existingFeedback.remove();
            }
            
            // Create validation message
            const validationMessage = document.createElement('div');
            validationMessage.className = 'validation-message';
            validationMessage.innerHTML = '⚠️ कृपया कोई एक विकल्प चुनें।';
            validationMessage.style.color = '#856404';
            validationMessage.style.backgroundColor = '#fff3cd';
            validationMessage.style.padding = '10px';
            validationMessage.style.borderRadius = '4px';
            validationMessage.style.marginBottom = '15px';
            validationMessage.style.borderLeft = '4px solid #ffc107';
            
            // Insert at the bottom of the container
            writingSelection.appendChild(validationMessage);
            
            // Auto-scroll to the message
            validationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (validationMessage.parentNode) {
                    validationMessage.classList.add('fade-out');
                    setTimeout(() => validationMessage.remove(), 500);
                }
            }, 5000);
        }
        return;
    }
    
    const selectedValue = selectedOption.value;
    let feedback = '';
    let points = 0;
    
    // Determine points and feedback based on selection
    if (selectedValue === window.writingAnswers.best) {
        feedback = window.answerFeedback.writing[selectedValue];
        points = 15; // Full points for the correct answer
    } else {
        feedback = window.answerFeedback.writing[selectedValue] || 'आपका चयन सही नहीं है।';
        points = 0; // No points for incorrect answers
    }
    
    // Create feedback container
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'writing-feedback-container';
    
    // Add main feedback
    const feedbackEl = document.createElement('div');
    feedbackEl.className = selectedValue === writingAnswers.best ? 
        'feedback-item correct' : 
        (writingAnswers.acceptable.includes(selectedValue) ? 'feedback-item correct' : 'feedback-item warning');
    
    // Add tick/cross mark to feedback
    if (selectedValue === writingAnswers.best || writingAnswers.acceptable.includes(selectedValue)) {
        feedbackEl.innerHTML = '✓ ' + feedback;
    } else {
        feedbackEl.innerHTML = '✗ ' + feedback;
    }
    feedbackContainer.appendChild(feedbackEl);
    
    // Add score feedback
    const scoreItem = document.createElement('div');
    
    if (points > 0) {
        scoreItem.className = 'feedback-item correct';
        scoreItem.innerHTML = `✓ आपने सही उत्तर चुना है! ${points} अंक अर्जित किए!`;
    } else {
        scoreItem.className = 'feedback-item incorrect';
        scoreItem.innerHTML = `✗ आपका उत्तर सही नहीं है। कोई अंक नहीं मिले।`;
    }
    
    feedbackContainer.appendChild(scoreItem);
    
    // Mark all writing options with visual indicators
    document.querySelectorAll('input[name="writing-option"]').forEach(radio => {
        // Remove any existing indicators
        const parentLabel = radio.nextElementSibling;
        const existingIndicator = parentLabel.querySelector('.answer-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // Remove any existing classes
        parentLabel.classList.remove('correct-label', 'incorrect-label');
        
        // Create indicator element
        const indicator = document.createElement('span');
        indicator.className = 'answer-indicator';
        
        // Show correct option (only one)
        if (radio.value === window.writingAnswers.best) {
            indicator.innerHTML = ' ✓ (सही उत्तर)';
            indicator.classList.add('correct');
            parentLabel.classList.add('correct-label');
            parentLabel.appendChild(indicator);
        }
        // Show incorrect selected option
        else if (radio.checked) {
            indicator.innerHTML = ' ✗ (गलत उत्तर)';
            indicator.classList.add('incorrect');
            parentLabel.classList.add('incorrect-label');
            parentLabel.appendChild(indicator);
        }
    });
    
    // Find container to append feedback
    const writingSelection = document.querySelector('.writing-selection');
    if (writingSelection) {
        // Remove any existing feedback
        const existingFeedback = writingSelection.querySelector('.writing-feedback-container');
        if (existingFeedback) existingFeedback.remove();
        
        writingSelection.appendChild(feedbackContainer);
        
        // Scroll to the feedback
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Update score based on answer
    if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
        score += points;
        document.getElementById('totalScore').textContent = score;
    }
    
    // Mark writing activity as completed
    if (typeof updateProgress === 'function' && !modulesCompleted.includes('writing')) {
        modulesCompleted.push('writing');
        updateProgress();
        
        if (typeof showAchievement === 'function') {
            showAchievement('लेखन गतिविधि पूर्ण!');
        }
    }
    
    // If narrator is available, speak the feedback
    if (window.narrator) {
        window.narrator.speak(feedback);
    }
}

// Helper function to update score
function updateScore(points) {
    if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
        score += points;
        document.getElementById('totalScore').textContent = score;
    }
}

// Setup check answer buttons
function setupCheckAnswerButtons() {
    // Find the save buttons and replace their text and functionality
    const saveButtons = document.querySelectorAll('button.interactive-btn');
    saveButtons.forEach(button => {
        if (button.textContent === 'विकल्प सहेजें') {
            button.textContent = 'उत्तर जाँचें';
            
            // Remove existing onclick attribute
            button.removeAttribute('onclick');
            
            // Add new event listener based on the section
            if (button.closest('.listening-activity')) {
                button.addEventListener('click', checkListeningAnswers);
            } else if (button.closest('.writing-activity')) {
                button.addEventListener('click', checkWritingAnswers);
            }
        }
    });
}

// Show immediate feedback for country selection
function showCountryFeedback(radioElement) {
    // Remove any existing indicators
    document.querySelectorAll('input[name="country"]').forEach(radio => {
        const parentLabel = radio.nextElementSibling;
        const existingIndicator = parentLabel.querySelector('.answer-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        parentLabel.classList.remove('correct-label', 'incorrect-label');
    });
    
    // Add new indicator to the selected option
    const parentLabel = radioElement.nextElementSibling;
    const indicator = document.createElement('span');
    indicator.className = 'answer-indicator';
    
    if (radioElement.value === listeningAnswers.country) {
        indicator.innerHTML = ' ✓';
        indicator.classList.add('correct');
        parentLabel.classList.add('correct-label');
    } else {
        indicator.innerHTML = ' ✗';
        indicator.classList.add('incorrect');
        parentLabel.classList.add('incorrect-label');
    }
    
    parentLabel.appendChild(indicator);
    
    // Show the correct answer if the selected one is wrong
    if (radioElement.value !== listeningAnswers.country) {
        // Find the correct option and highlight it
        document.querySelectorAll('input[name="country"]').forEach(radio => {
            if (radio.value === listeningAnswers.country) {
                const correctLabel = radio.nextElementSibling;
                const correctIndicator = document.createElement('span');
                correctIndicator.className = 'answer-indicator correct';
                correctIndicator.innerHTML = ' ✓ (सही उत्तर)';
                correctLabel.classList.add('correct-label');
                correctLabel.appendChild(correctIndicator);
            }
        });
    }
    
    // Update score if correct
    if (radioElement.value === listeningAnswers.country) {
        updateScore(5);
    }
}

// Show immediate feedback for narrative selection
function showNarrativeFeedback(radioElement) {
    // Remove any existing indicators
    document.querySelectorAll('input[name="narrative"]').forEach(radio => {
        const parentLabel = radio.nextElementSibling;
        const existingIndicator = parentLabel.querySelector('.answer-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        parentLabel.classList.remove('correct-label', 'incorrect-label');
    });
    
    // Add new indicator to the selected option
    const parentLabel = radioElement.nextElementSibling;
    const indicator = document.createElement('span');
    indicator.className = 'answer-indicator';
    
    if (radioElement.value === listeningAnswers.narrative) {
        indicator.innerHTML = ' ✓';
        indicator.classList.add('correct');
        parentLabel.classList.add('correct-label');
    } else {
        indicator.innerHTML = ' ✗';
        indicator.classList.add('incorrect');
        parentLabel.classList.add('incorrect-label');
    }
    
    parentLabel.appendChild(indicator);
    
    // Show the correct answer if the selected one is wrong
    if (radioElement.value !== listeningAnswers.narrative) {
        // Find the correct option and highlight it
        document.querySelectorAll('input[name="narrative"]').forEach(radio => {
            if (radio.value === listeningAnswers.narrative) {
                const correctLabel = radio.nextElementSibling;
                const correctIndicator = document.createElement('span');
                correctIndicator.className = 'answer-indicator correct';
                correctIndicator.innerHTML = ' ✓ (सही उत्तर)';
                correctLabel.classList.add('correct-label');
                correctLabel.appendChild(correctIndicator);
            }
        });
    }
    
    // Update score if correct
    if (radioElement.value === listeningAnswers.narrative) {
        updateScore(10);
    }
    
    // Update module completion status if both country and narrative are correct
    const countrySelected = document.querySelector('input[name="country"]:checked');
    if (countrySelected && countrySelected.value === listeningAnswers.country && 
        radioElement.value === listeningAnswers.narrative) {
        if (!modulesCompleted.includes('activities')) {
            modulesCompleted.push('activities');
            updateProgress();
            showAchievement('श्रवण गतिविधि पूर्ण!');
        }
    }
}

// Show immediate feedback for writing selection
function showWritingFeedback(radioElement) {
    // Remove any existing indicators
    document.querySelectorAll('input[name="writing-option"]').forEach(radio => {
        const parentLabel = radio.nextElementSibling;
        const existingIndicator = parentLabel.querySelector('.answer-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        parentLabel.classList.remove('correct-label', 'incorrect-label');
    });
    
    // Add new indicator to the selected option
    const parentLabel = radioElement.nextElementSibling;
    const indicator = document.createElement('span');
    indicator.className = 'answer-indicator';
    
    let points = 0;
    let feedbackText = '';
    
    if (radioElement.value === writingAnswers.best) {
        indicator.innerHTML = ' ✓ (सर्वोत्तम विकल्प)';
        indicator.classList.add('correct');
        parentLabel.classList.add('correct-label');
        points = 15;
        feedbackText = answerFeedback.writing[radioElement.value];
    } else if (writingAnswers.acceptable.includes(radioElement.value)) {
        indicator.innerHTML = ' ✓ (अच्छा विकल्प)';
        indicator.classList.add('correct');
        parentLabel.classList.add('correct-label');
        points = 10;
        feedbackText = answerFeedback.writing[radioElement.value];
    } else {
        indicator.innerHTML = ' ✗';
        indicator.classList.add('incorrect');
        parentLabel.classList.add('incorrect-label');
        points = 5; // For participation
        feedbackText = answerFeedback.writing[radioElement.value] || 'आपका चयन सहेज लिया गया है।';
    }
    
    parentLabel.appendChild(indicator);
    
    // Show the best answer if the selected one is not the best
    if (radioElement.value !== writingAnswers.best) {
        // Find the best option and highlight it
        document.querySelectorAll('input[name="writing-option"]').forEach(radio => {
            if (radio.value === writingAnswers.best) {
                const bestLabel = radio.nextElementSibling;
                const bestIndicator = document.createElement('span');
                bestIndicator.className = 'answer-indicator correct';
                bestIndicator.innerHTML = ' ✓ (सर्वोत्तम विकल्प)';
                bestLabel.classList.add('correct-label');
                bestLabel.appendChild(bestIndicator);
            }
        });
    }
    
    // Create or update feedback message
    const writingSelection = document.querySelector('.writing-selection');
    if (writingSelection) {
        // Remove any existing feedback
        const existingFeedback = writingSelection.querySelector('.immediate-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'immediate-feedback';
        feedbackEl.style.marginTop = '15px';
        feedbackEl.style.padding = '10px';
        feedbackEl.style.borderRadius = '5px';
        
        if (radioElement.value === writingAnswers.best || writingAnswers.acceptable.includes(radioElement.value)) {
            feedbackEl.style.backgroundColor = '#d4edda';
            feedbackEl.style.borderLeft = '4px solid #28a745';
            feedbackEl.style.color = '#155724';
        } else {
            feedbackEl.style.backgroundColor = '#fff3cd';
            feedbackEl.style.borderLeft = '4px solid #ffc107';
            feedbackEl.style.color = '#856404';
        }
        
        feedbackEl.innerHTML = `<p>${feedbackText}</p><p>आपने ${points} अंक अर्जित किए!</p>`;
        writingSelection.appendChild(feedbackEl);
    }
    
    // Update score
    updateScore(points);
    
    // Mark writing activity as completed
    if (typeof updateProgress === 'function' && !modulesCompleted.includes('writing')) {
        modulesCompleted.push('writing');
        updateProgress();
        
        if (typeof showAchievement === 'function') {
            showAchievement('लेखन गतिविधि पूर्ण!');
        }
    }
    
    // If narrator is available, speak the feedback
    if (window.narrator) {
        window.narrator.speak(feedbackText);
    }
}

