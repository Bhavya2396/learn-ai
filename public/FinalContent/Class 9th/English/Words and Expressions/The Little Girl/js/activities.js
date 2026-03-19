/**
 * Activities for The Little Girl interactive lesson
 */

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activities
    setupActivityListeners();
});

// Set up event listeners for activities
function setupActivityListeners() {
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
}

// Que Sera, Sera lyrics content for listening activity
const queSeraSeraContent = `
When I was just a little girl
I asked my mother
What will I be
Will I be pretty?
Will I be rich?
Here's what she said to me
Que sera, sera
Whatever will be, will be
The future's not ours to see
Que sera, sera
What will be, will be

When I grew up and fell in love
I asked my sweetheart
What lies ahead
Will we have rainbows?
Day after day
Here's what my sweetheart said
Que sera, sera
Whatever will be, will be
The future's not ours to see
Que sera, sera
What will be, will be

Now I have Children of my own
They ask their mother
What will I be?
Will I be handsome?
Will I be rich?
I tell them tenderly
Que sera, sera
Whatever will be, will be
The future's not ours to see
Que sera, sera
What will be, will be
Que Sera, Sera
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
        const contentParagraphs = queSeraSeraContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("Now please answer the questions about the song in your notes.");
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
        alert('Speech synthesis is not available in your browser. Please read the song lyrics instead.');
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
            window.narrator.speak("Please write your letter to your parents, expressing appreciation for all the little things they do. Take your time to express your feelings sincerely.");
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

// Save listening notes
function saveListeningNotes() {
    const notes = document.getElementById('listeningNotes');
    
    if (!notes) {
        console.error('Listening notes textarea not found');
        return;
    }
    
    const notesText = notes.value.trim();
    
    if (notesText.length < 50) {
        alert('Please write more detailed notes about the song (at least 50 characters).');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    alert('Your notes have been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak("Great job! Your notes on the song have been saved.");
    }
}
