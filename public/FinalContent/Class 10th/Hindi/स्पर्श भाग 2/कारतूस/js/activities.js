/**
 * Interactive activities for the Kartoos module
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load activities when the tab is activated
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            if (this.textContent.includes('गतिविधियाँ')) {
                setTimeout(initializeActivities, 100);
            }
        });
    });

    // Also load content if that tab is initially active
    if (document.querySelector('.nav-item.active').textContent.includes('गतिविधियाँ')) {
        setTimeout(initializeActivities, 100);
    }
});

// Initialize all activities
function initializeActivities() {
    console.log('Initializing activities');
    setupResearchActivity();
    setupRolePlayActivity();
}

// Set up the research activity
function setupResearchActivity() {
    // Add event listeners to the research form
    document.querySelectorAll('input[name="birth"]').forEach(input => {
        input.addEventListener('change', function() {
            highlightSelectedOption(this);
            showQuestionFeedback('birth', '3', this.value);
        });
    });
    
    document.querySelectorAll('input[name="education"]').forEach(input => {
        input.addEventListener('change', function() {
            highlightSelectedOption(this);
            showQuestionFeedback('education', '1', this.value);
        });
    });
    
    document.querySelectorAll('input[name="theatre"]').forEach(input => {
        input.addEventListener('change', function() {
            highlightSelectedOption(this);
            showQuestionFeedback('theatre', '2', this.value);
        });
    });
    
    document.querySelectorAll('input[name="plays"]').forEach(input => {
        input.addEventListener('change', function() {
            highlightSelectedOption(this);
            showQuestionFeedback('plays', '1', this.value);
        });
    });
    
    document.querySelectorAll('input[name="contribution"]').forEach(input => {
        input.addEventListener('change', function() {
            highlightSelectedOption(this);
            showQuestionFeedback('contribution', '1', this.value);
        });
    });
}

// Show feedback for individual questions
function showQuestionFeedback(questionType, correctAnswer, userAnswer) {
    const feedbackDiv = document.getElementById(questionType + 'Feedback');
    if (!feedbackDiv) return;
    
    // Clear previous feedback
    feedbackDiv.textContent = '';
    feedbackDiv.className = 'question-feedback';
    
    // Compare answers and show feedback
    if (userAnswer === correctAnswer) {
        feedbackDiv.textContent = '✓ सही उत्तर! अच्छा किया।';
        feedbackDiv.classList.add('correct', 'show');
    } else {
        feedbackDiv.textContent = '✗ यह सही उत्तर नहीं है। पुनः प्रयास करें।';
        feedbackDiv.classList.add('incorrect', 'show');
    }
}

// Set up the role play activity
function setupRolePlayActivity() {
    // Add event listeners to the dialogue options
    document.querySelectorAll('input[name="dialogue"]').forEach(input => {
        input.addEventListener('change', function() {
            highlightSelectedOption(this);
        });
    });
}

// Highlight the selected option
function highlightSelectedOption(input) {
    const parentContainer = input.closest('.choice-options, .narrative-options, .role-play-options');
    if (!parentContainer) return;
    
    // Remove highlighting from all options
    parentContainer.querySelectorAll('.choice-option, .narrative-option, .role-play-option').forEach(option => {
        option.classList.remove('selected-option');
    });
    
    // Add highlighting to selected option
    const selectedOption = input.closest('.choice-option, .narrative-option, .role-play-option');
    if (selectedOption) {
        selectedOption.classList.add('selected-option');
    }
}

// Save research notes - for the research choices about Habib Tanvir
window.saveResearchNotes = function() {
    const birthSelected = document.querySelector('input[name="birth"]:checked');
    const educationSelected = document.querySelector('input[name="education"]:checked');
    const theatreSelected = document.querySelector('input[name="theatre"]:checked');
    const playsSelected = document.querySelector('input[name="plays"]:checked');
    const contributionSelected = document.querySelector('input[name="contribution"]:checked');
    
    const feedbackDiv = document.getElementById('researchFeedback');
    
    // Check if all options are selected
    if (!birthSelected || !educationSelected || !theatreSelected || !playsSelected || !contributionSelected) {
        feedbackDiv.textContent = 'कृपया सभी प्रश्नों के उत्तर चुनें।';
        feedbackDiv.className = 'feedback-message warning show';
        return;
    }
    
    // Correct answers
    const correctAnswers = {
        birth: "3", // 1 सितंबर, 1923 को भोपाल, मध्य प्रदेश में
        education: "1", // अलीगढ़ मुस्लिम विश्वविद्यालय से
        theatre: "2", // नया थिएटर
        plays: "1", // आगरा बाजार, चरणदास चोर, और बाकी इतिहास
        contribution: "1" // लोक नाट्य परंपराओं को आधुनिक रंगमंच से जोड़ा
    };
    
    // Get text descriptions of correct answers
    const correctTexts = {
        birth: document.querySelector('label[for="birth3"]').textContent,
        education: document.querySelector('label[for="edu1"]').textContent,
        theatre: document.querySelector('label[for="theatre2"]').textContent,
        plays: document.querySelector('label[for="plays1"]').textContent,
        contribution: document.querySelector('label[for="contrib1"]').textContent
    };
    
    // Count correct answers and show feedback for each
    let correctCount = 0;
    
    // Check each answer and show appropriate feedback
    if (birthSelected.value === correctAnswers.birth) {
        correctCount++;
        showQuestionFeedback('birth', correctAnswers.birth, birthSelected.value);
    } else {
        document.getElementById('birthFeedback').textContent = `✓ सही उत्तर: ${correctTexts.birth}`;
        document.getElementById('birthFeedback').className = 'question-feedback incorrect show';
    }
    
    if (educationSelected.value === correctAnswers.education) {
        correctCount++;
        showQuestionFeedback('education', correctAnswers.education, educationSelected.value);
    } else {
        document.getElementById('educationFeedback').textContent = `✓ सही उत्तर: ${correctTexts.education}`;
        document.getElementById('educationFeedback').className = 'question-feedback incorrect show';
    }
    
    if (theatreSelected.value === correctAnswers.theatre) {
        correctCount++;
        showQuestionFeedback('theatre', correctAnswers.theatre, theatreSelected.value);
    } else {
        document.getElementById('theatreFeedback').textContent = `✓ सही उत्तर: ${correctTexts.theatre}`;
        document.getElementById('theatreFeedback').className = 'question-feedback incorrect show';
    }
    
    if (playsSelected.value === correctAnswers.plays) {
        correctCount++;
        showQuestionFeedback('plays', correctAnswers.plays, playsSelected.value);
    } else {
        document.getElementById('playsFeedback').textContent = `✓ सही उत्तर: ${correctTexts.plays}`;
        document.getElementById('playsFeedback').className = 'question-feedback incorrect show';
    }
    
    if (contributionSelected.value === correctAnswers.contribution) {
        correctCount++;
        showQuestionFeedback('contribution', correctAnswers.contribution, contributionSelected.value);
    } else {
        document.getElementById('contributionFeedback').textContent = `✓ सही उत्तर: ${correctTexts.contribution}`;
        document.getElementById('contributionFeedback').className = 'question-feedback incorrect show';
    }
    
    // Show overall feedback
    feedbackDiv.textContent = `आपने ${5} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    feedbackDiv.className = 'feedback-message show';
    feedbackDiv.classList.add(correctCount === 5 ? 'success' : 'error');
    
    // Add score
    if (typeof window.addScore === 'function') {
        window.addScore(correctCount * 2); // 2 points per correct answer
    }
    
    // If all correct, show achievement
    if (correctCount === 5 && typeof window.showAchievement === 'function') {
        window.showAchievement('अनुसंधान गतिविधि पूरी की!');
    }
};

// Save role play selection - for the dialogue choices
window.saveRolePlay = function() {
    const dialogueSelected = document.querySelector('input[name="dialogue"]:checked');
    const feedbackDiv = document.getElementById('rolePlayFeedback');
    
    if (!dialogueSelected) {
        feedbackDiv.textContent = 'कृपया एक संवाद विकल्प चुनें।';
        feedbackDiv.className = 'feedback-message warning show';
        return;
    }
    
    // All dialogue options are acceptable
    feedbackDiv.textContent = 'आपका संवाद विकल्प सहेज लिया गया है। धन्यवाद!';
    feedbackDiv.className = 'feedback-message success show';
    
    // Add score
    if (typeof window.addScore === 'function') {
        window.addScore(10);
    }
    
    // Mark module as completed
    if (typeof window.markModuleCompleted === 'function') {
        setTimeout(() => window.markModuleCompleted('activities'), 1000);
    }
    
    // Show achievement
    if (typeof window.showAchievement === 'function') {
        window.showAchievement('रोल-प्ले गतिविधि पूरी की!');
    }
};