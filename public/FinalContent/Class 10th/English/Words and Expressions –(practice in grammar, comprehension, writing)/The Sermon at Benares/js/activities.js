/**
 * Activities and interactive content for The Sermon at Benaras
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Activities script loaded');
    initializeActivities();
});

/**
 * Initialize all activities
 */
function initializeActivities() {
    // Set up any specific activity initializations here
    setupListeningActivity();
}

/**
 * Set up the listening activity
 */
function setupListeningActivity() {
    const listeningActivity = document.querySelector('.listening-activity');
    if (!listeningActivity) return;
    
    // In a real implementation, this would set up the audio player, load the audio file, etc.
    console.log('Listening activity setup');
}

/**
 * Play the listening activity audio
 * This is called from main.js when the user clicks the play button
 */
function playListeningActivity() {
    // In a real implementation, this would play the audio file
    // For this demo, we'll use the narrator to speak some sample text
    
    const sampleText = `
        The fascinating and world famous Sanchi stupa is located on a hilltop in Sanchi town, Madhya Pradesh, India. 
        It is one of the most important Buddhist monuments that portrays Buddhist art and sculpture. 
        Starting from the third century BC through the twelfth century AD, it attracts the attention of thousands 
        of visitors round the year including national and foreign tourists, archaeologists, and historians among others.
        
        This stupa is the oldest stone structure in India that was built during the Mauryan period. 
        Originally commissioned in the third century BCE by Emperor Ashoka, this huge hemispherical dome consists 
        of a central chamber. In this chamber, the relics of Lord Buddha are placed.
    `;
    
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(sampleText);
    } else {
        alert('Speech synthesis is not available in your browser. Please read the text instead.');
    }
}

/**
 * Save listening notes
 * This is called from main.js when the user submits their notes
 */
function saveListeningNotes() {
    const answers = [
        document.getElementById('listeningAnswer1').value.trim(),
        document.getElementById('listeningAnswer2').value.trim(),
        document.getElementById('listeningAnswer3').value.trim(),
        document.getElementById('listeningAnswer4').value.trim(),
        document.getElementById('listeningAnswer5').value.trim()
    ];
    
    // Check if all questions have been answered with at least some text
    const allAnswered = answers.every(answer => answer.length > 0);
    
    if (allAnswered) {
        // In a real implementation, this would send the answers to a server or store them locally
        console.log('Listening answers:', answers);
        
        // Show feedback to the user
        alert('Your answers have been saved!');
        
        // Add points to the score
        if (typeof incrementScore === 'function') {
            incrementScore(15);
        }
        
        // Show achievement
        if (typeof showAchievement === 'function') {
            showAchievement('Active Listener', 'You completed the listening comprehension activity.');
        }
    } else {
        // Show error message if not all questions are answered
        alert('Please answer all questions before submitting.');
    }
}

/**
 * Simulate recording a speaking response
 * This is called from main.js when the user clicks the record button
 */
function recordSpeaking() {
    const notes = document.getElementById('speakingNotes').value.trim();
    
    if (notes.length < 10) {
        // Show error message if the notes are too short
        alert('Please write your notes first before recording your response.');
        return;
    }
    
    // In a real implementation, this would start recording the user's voice
    // For this demo, we'll just show a message
    alert('In a real implementation, this would record your spoken response. Your notes have been saved!');
    
    // Add points to the score
    if (typeof incrementScore === 'function') {
        incrementScore(10);
    }
    
    // Show achievement
    if (typeof showAchievement === 'function') {
        showAchievement('Speaking Practice', 'You practiced your speaking skills.');
    }
}

/**
 * Show the writing pad
 * This is called from main.js when the user clicks the writing button
 */
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        document.getElementById('writingPad').focus();
    }
}

/**
 * Save the user's writing
 * This is called from main.js when the user submits their writing
 */
function saveWriting() {
    const writingText = document.getElementById('writingPad').value.trim();
    
    if (writingText.length < 50) {
        // Show error message if the writing is too short
        alert('Please write at least a paragraph before saving.');
        return;
    }
    
    // In a real implementation, this would send the writing to a server or store it locally
    console.log('Writing saved:', writingText);
    
    // Show feedback to the user
    alert('Your writing has been saved!');
    
    // Add points to the score
    if (typeof incrementScore === 'function') {
        incrementScore(15);
    }
    
    // Show achievement
    if (typeof showAchievement === 'function') {
        showAchievement('Thoughtful Writer', 'You completed the writing activity.');
    }
}

/**
 * Show a resource
 * This is called from main.js when the user clicks a resource link
 * @param {string} resourceId - ID of the resource to show
 */
function showResource(resourceId) {
    // In a real implementation, this would load and display the resource
    // For this demo, we'll just show an alert
    
    let resourceTitle = '';
    let resourceDescription = '';
    
    switch (resourceId) {
        case 'jataka-tales':
            resourceTitle = 'Jataka Tales Overview';
            resourceDescription = 'Jataka tales are stories about the previous lives of the Buddha. These tales describe the adventures of people and animals who are believed to have been the Buddha himself in his past lives.';
            break;
            
        case 'buddha-life':
            resourceTitle = 'Life of Gautama Buddha';
            resourceDescription = 'Siddhartha Gautama was born in Lumbini (modern-day Nepal) and raised in Kapilavastu. At age 29, he left his palace to seek understanding of suffering. After 6 years of ascetic practice and meditation, he attained Enlightenment and became the Buddha, spending the rest of his life teaching the path to liberation.';
            break;
            
        case 'comic-template':
            resourceTitle = 'Comic Strip Template';
            resourceDescription = 'Download this template to create your own comic strip based on Jataka tales. The template includes 6 panels with space for dialogue and narration.';
            break;
            
        default:
            resourceTitle = 'Resource';
            resourceDescription = 'Resource information not available.';
    }
    
    alert(`${resourceTitle}\n\n${resourceDescription}`);
}
