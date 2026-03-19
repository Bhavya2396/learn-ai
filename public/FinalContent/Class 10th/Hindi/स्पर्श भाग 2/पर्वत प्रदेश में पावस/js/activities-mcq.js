/**
 * Activities MCQ functionality for गतिविधियाँ tab with guided feedback
 */

// Define the MCQ options for the listening activity with correct/incorrect status
const listeningActivityOptions = [
    {
        id: "listening-option-1",
        text: "सुमित्रानंदन पंत का जन्म और प्रारंभिक जीवन",
        isCorrect: false
    },
    {
        id: "listening-option-2",
        text: "सुमित्रानंदन पंत की काव्य शैली और प्रमुख रचनाएँ",
        isCorrect: false
    },
    {
        id: "listening-option-3",
        text: "सुमित्रानंदन पंत और प्रकृति का संबंध",
        isCorrect: true,  // This is the correct option
        feedback: "सही! सुमित्रानंदन पंत को प्रकृति का सच्चा चितेरा माना जाता है और उनकी कविताओं में प्रकृति का विशेष स्थान है।"
    },
    {
        id: "listening-option-4",
        text: "सुमित्रानंदन पंत के जीवन के महत्वपूर्ण पड़ाव",
        isCorrect: false
    }
];

// Initialize the activities MCQ functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the activities module
    const activitiesModule = document.getElementById('activities');
    if (!activitiesModule) return;
    
    // Find the listening activity section
    const listeningActivity = activitiesModule.querySelector('.listening-activity');
    if (!listeningActivity) return;
    
    // Find the listening notes section that needs to be replaced
    const listeningNotes = listeningActivity.querySelector('.listening-notes');
    if (!listeningNotes) return;
    
    // Create the MCQ container
    const mcqContainer = document.createElement('div');
    mcqContainer.className = 'activity-mcq-container';
    mcqContainer.innerHTML = `
        <div class="activity-mcq-title">(सही विकल्प चुनें):</div>
        <div class="activity-mcq-options"></div>
        <div class="activity-feedback-message" id="activity-feedback"></div>
    `;
    
    // Replace the listening notes with the MCQ container
    listeningNotes.parentNode.replaceChild(mcqContainer, listeningNotes);
    
    // Get the options container
    const optionsContainer = mcqContainer.querySelector('.activity-mcq-options');
    const feedbackElement = mcqContainer.querySelector('#activity-feedback');
    
    // Add the MCQ options
    listeningActivityOptions.forEach(option => {
        const optionElement = document.createElement('label');
        optionElement.className = 'activity-option';
        optionElement.id = option.id;
        optionElement.setAttribute('data-correct', option.isCorrect.toString());
        optionElement.innerHTML = `
            <input type="radio" name="listening-activity-mcq" value="${option.id}">
            <span class="activity-option-text">${option.text}</span>
            <span class="activity-feedback-icon"></span>
        `;
        optionsContainer.appendChild(optionElement);
        
        // Add click event listener to the option
        optionElement.addEventListener('click', function() {
            // Select the radio button
            const radioButton = this.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
                
                // Reset all options
                document.querySelectorAll('.activity-option').forEach(opt => {
                    opt.classList.remove('selected', 'correct', 'incorrect');
                    opt.querySelector('.activity-feedback-icon').textContent = '';
                });
                
                // Find the correct option for reference
                const correctOption = document.querySelector('.activity-option[data-correct="true"]');
                
                // Check if the selected option is correct
                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                // Add appropriate classes and feedback icons
                if (isCorrect) {
                    this.classList.add('selected', 'correct');
                    this.querySelector('.activity-feedback-icon').textContent = '✓';
                    feedbackElement.textContent = 'सही! ' + option.feedback;
                    feedbackElement.className = 'activity-feedback-message correct';
                } else {
                    this.classList.add('selected', 'incorrect');
                    this.querySelector('.activity-feedback-icon').textContent = '✗';
                    
                    // Also highlight the correct answer
                    correctOption.classList.add('correct');
                    correctOption.querySelector('.activity-feedback-icon').textContent = '✓';
                    
                    // Show feedback
                    feedbackElement.textContent = 'गलत। सही उत्तर: ' + listeningActivityOptions.find(opt => opt.isCorrect).text;
                    feedbackElement.className = 'activity-feedback-message incorrect';
                }
                
                // Show feedback with animation
                feedbackElement.style.display = 'block';
                setTimeout(() => {
                    feedbackElement.classList.add('show');
                }, 10);
                
                // Update progress regardless of correctness
                if (typeof updateProgress === 'function') {
                    updateProgress('listening', 10);
                }
            }
        });
    });
    
    // Update the content block text
    const contentBlock = listeningActivity.querySelector('.content-block p');
    if (contentBlock) {
        contentBlock.textContent = 'सुमित्रानंदन पंत के जीवन के बारे में सुनिए और नीचे दिए गए विकल्पों में से सही विकल्प चुनें:';
    }
});
