/**
 * Activities for The Snake Chapter interactive lesson
 */

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activities
    setupActivityListeners();
});

// Set up event listeners for activities
function setupActivityListeners() {
    // Speaking activity removed
    
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

// Brave Hearts content for listening activity
const braveHeartsContent = `
The Brave Hearts

On October 26, 2009, Jhalaram's hut in the village Sarneshwar in Rajasthan, suddenly caught fire. His two daughters, aged two-and-a-half years and one year, as well as ten goats were in the hut at that time.

Shrawan Kumar, a six-year old boy, was playing in his house at a distance of about 200 feet. Seeing smoke coming out from Jhalaram's house, he ran towards it. He saw the children sitting on a cot and screaming for help, and the goats caught in the flames.

Shrawan entered the house, lifted the younger child in one arm and pulling the older one by the hand, brought them out safely. He took them to his house, then ran to inform his father and the children's father.

The elders rushed to the site. But by that time, the goats had died and the household belongings had been destroyed in the fire. It was Shrawan Kumar's daring act that saved the lives of the two children.
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
        const contentParagraphs = braveHeartsContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("Now please answer the questions about the story in the text boxes provided.");
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
        alert('Speech synthesis is not available in your browser. Please read the story about Shrawan Kumar instead.');
    }
}

// National Bravery Awards information for project work
const braveryAwardsInfo = {
    background: `
        The National Bravery Award scheme was initiated by the Indian Council for Child Welfare. The award was first instituted in 1957. The Government of India recognized ICCW's National Bravery Award scheme in 1957 by instituting a separate category of awards for brave children.
        
        Every year, these awards are given to children who show exemplary courage in saving lives, often at great personal risk. These children receive a medal, certificate, and financial assistance for their education.
    `,
    stories: `
        The stories of the National Bravery Award winners are truly inspiring. From rescuing people from drowning, fires, or attacks, to reporting criminal activities, these children show extraordinary courage and presence of mind in the face of danger.
    `,
    template: `
        This template provides a structure for your survey about people's fears. It includes sections for demographic information, questions about different types of fears, causes of fears, and possible ways to overcome them. Use it to organize your research and create a comprehensive report.
    `
};

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'national-bravery-awards':
            content = braveryAwardsInfo.background;
            break;
        case 'bravery-stories':
            content = braveryAwardsInfo.stories;
            break;
        case 'survey-template':
            content = braveryAwardsInfo.template;
            break;
        default:
            content = 'Resource information not available.';
    }
    
    alert(content);
    
    if (window.narrator) {
        window.narrator.speak(content);
    }
}

// Open writing pad function
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        
        // Scroll to the writing pad
        writingPad.scrollIntoView({ behavior: 'smooth' });
        
        // Provide instructions via narrator
        if (window.narrator) {
            window.narrator.speak("Imagine yourself as the narrator in the story 'The Miraculous Escape' and describe your experience during your voyage.");
        }
    } else {
        console.error('Writing pad element not found');
    }
}

// Save writing function
function saveWriting() {
    const writing = document.getElementById('writingPad');
    if (!writing) {
        console.error('Writing pad textarea not found');
        return;
    }
    
    const text = writing.value.trim();
    
    if (text.length < 100) {
        alert('Please write a more detailed story (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your story has been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your story has been saved.");
    }
}


// Save listening notes
function saveListeningNotes() {
    const notes = document.getElementById('listeningNotes');
    const narrative = document.getElementById('narrativeAccount');
    
    if (!notes || !narrative) {
        console.error('Listening notes or narrative account textarea not found');
        return;
    }
    
    const notesText = notes.value.trim();
    const narrativeText = narrative.value.trim();
    
    if (notesText.length < 20 || narrativeText.length < 50) {
        alert('Please write more detailed notes and narrative account.');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    alert('Your notes and narrative account have been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak("Great job! Your notes and narrative account have been saved.");
    }
}
