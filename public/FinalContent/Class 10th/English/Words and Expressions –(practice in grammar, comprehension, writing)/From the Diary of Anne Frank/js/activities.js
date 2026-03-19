/**
 * Activities for From the Diary of Anne Frank interactive lesson
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

// Siege of Leningrad content for listening activity
const siegeOfLeningradContent = `
The Siege of Leningrad, also known as the 900-Day Siege, began on September 8, 1941, when German forces completely encircled the city of Leningrad, now known as Saint Petersburg.

The siege was one of the longest and most destructive in history, lasting 872 days until January 27, 1944. During this time, the city's civilian population of nearly 3 million people was cut off from all supplies, including food and fuel.

The winter of 1941-1942 was particularly brutal, with temperatures dropping to -30°C. Food rations were reduced to just 125 grams of bread per day for many residents - what became known as "blockade grams." People suffered from extreme starvation, and approximately 1.5 million civilians died during the siege, mostly from starvation, cold, and bombardment.

Despite these terrible conditions, the city never surrendered. The people of Leningrad showed remarkable resilience and determination. They cleared rubble after bombings, worked in factories producing military supplies, and even maintained cultural activities like orchestra performances.

A small supply route across Lake Ladoga, known as the "Road of Life," was established during winter when the lake froze solid enough to support trucks. This tenuous lifeline provided minimal supplies and allowed some civilians to evacuate.

The siege was partially broken in January 1943, but was not fully lifted until January 27, 1944. The resilience shown by the citizens of Leningrad remains one of the most remarkable examples of human endurance during World War II.
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
        const contentParagraphs = siegeOfLeningradContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("Now please make notes in the first box. Then write a narrative account in the second box.");
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
        alert('Speech synthesis is not available in your browser. Please read about the Siege of Leningrad instead.');
    }
}

// This is now handled by siegeOfLeningradContent variable above

// Bengal Famine information for project work
const bengalFamineInfo = {
    background: `
        The Bengal famine of 1943 was a devastating famine that struck Bengal in British India during World War II. An estimated 2 to 3 million people died of starvation, malnutrition, and disease.
        
        The famine was caused by a complex set of factors including war-time colonial policies, hoarding, price inflation, and natural disasters. British wartime policies including prioritizing military and defense needs over civilian requirements exacerbated the situation.
    `,
    photos: `
        Historical photographs documenting the Bengal famine show the devastating impact on the population, including widespread starvation and suffering. These images were captured by photographers like Sunil Janah and became important historical documentation of this tragedy.
    `,
    template: `
        This template provides a structure for your project on the Bengal famine, including sections for affected areas, causes, relief measures, and historical impact. Use it to organize your research findings and create a comprehensive poster.
    `
};

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'bengal-famine':
            content = bengalFamineInfo.background;
            break;
        case 'famine-photos':
            content = bengalFamineInfo.photos;
            break;
        case 'project-template':
            content = bengalFamineInfo.template;
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
            window.narrator.speak("Please write your report in the text area below. Consider how news is reported today compared to the historical methods described in 'A Journal of the Plague Year'.");
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
        alert('Please write a more detailed report (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your report has been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your report has been saved.");
    }
}

// Record speaking response
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('In a real implementation, this would record your spoken response using the Web Audio API.');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 10);
    }
    
    if (window.narrator) {
        window.narrator.speak("Think about a person who demonstrates qualities like perseverance, determination, and will power. Share your thoughts about them.");
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
