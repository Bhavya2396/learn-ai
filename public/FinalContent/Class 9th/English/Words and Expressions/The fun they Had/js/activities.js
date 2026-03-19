/**
 * Activities for The Future Cars interactive lesson
 */

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activities
    setupActivityListeners();
});

// Set up event listeners for activities
function setupActivityListeners() {
    // Speaking activity has no interactive buttons
    
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

// Self-driving Cars content for listening activity
const selfDrivingCarsContent = `
Self-driving cars, also known as autonomous vehicles, are rapidly evolving from science fiction to reality. Today, we'll explore how these vehicles work, their potential benefits, and the challenges they face.

Self-driving cars use a combination of sensors, cameras, radar, and artificial intelligence to navigate roads and respond to their environment. Most autonomous vehicles employ a technology called LIDAR - Light Detection and Ranging - which creates detailed 3D maps of the surroundings by bouncing laser beams off objects and measuring their return times.

The potential benefits of self-driving cars are substantial. First, they could dramatically reduce traffic accidents, as over 90% of crashes involve human error. Second, they would provide mobility for those who cannot drive, such as elderly or disabled individuals. Third, they could increase traffic efficiency by communicating with each other to optimize routes and speeds, reducing congestion and fuel consumption.

Passengers in self-driving cars will be able to use their commute time productively, reading, working, or relaxing instead of focusing on driving. Urban planning will also change significantly, with less space needed for parking and more available for parks, wider sidewalks, and other public amenities.

However, challenges remain. Technical hurdles include ensuring these vehicles can safely navigate in poor weather conditions and unpredictable environments. Regulatory frameworks need to be developed to address liability issues when accidents occur. There are also ethical questions, such as how a car should be programmed to respond in unavoidable accident scenarios.

Despite these challenges, most automotive and technology experts believe fully autonomous vehicles will become mainstream within the next decade, gradually transforming our transportation systems and reshaping our cities and daily lives.
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
        const contentParagraphs = selfDrivingCarsContent.split('\n\n').filter(p => p.trim().length > 0);
        
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
        alert('Speech synthesis is not available in your browser. Please read about Self-driving Cars instead.');
    }
}

// UFO Sightings information for project work
const ufoSightingsInfo = {
    history: `
        UFO sightings have been reported throughout human history, but they gained significant public attention after the 1947 Roswell incident. Since then, thousands of UFO sightings have been reported worldwide, with varying degrees of credibility and evidence.
        
        The term "UFO" simply means "Unidentified Flying Object" and doesn't necessarily imply extraterrestrial origin, though this is a common assumption. Many sightings have later been explained as natural phenomena, experimental aircraft, or optical illusions, while others remain unexplained.
    `,
    photos: `
        Many photographs and videos claim to show UFOs, but many have been debunked as hoaxes or misidentifications. However, some images remain unexplained and continue to fuel debate. When analyzing UFO photos, experts consider factors such as lighting conditions, camera capabilities, and possible manipulations.
    `,
    template: `
        This template provides a structure for your project on UFO sightings. It includes sections for describing five notable sightings, the evidence available for each, expert opinions, and your group's conclusion about whether you believe these sightings represent extraterrestrial craft or other phenomena. 
        
        Be sure to include dates, locations, and descriptions for each sighting, along with any official explanations that have been offered.
    `
};

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'ufo-history':
            content = ufoSightingsInfo.history;
            break;
        case 'ufo-photos':
            content = ufoSightingsInfo.photos;
            break;
        case 'project-template':
            content = ufoSightingsInfo.template;
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
            window.narrator.speak("Please write your letter about space debris in the text area below. Consider the impact on satellites, the International Space Station, and the financial consequences of potential damage.");
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
        alert('Please write a more detailed letter (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your letter has been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your letter has been saved.");
    }
}

// Note: recordSpeaking function has been removed as the button was removed from the UI

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
