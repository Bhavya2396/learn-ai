/**
 * Activities for Role of Music in Life interactive lesson
 */

// Word search puzzle for musical instruments
const wordSearchGrid = [
    ['p', 'i', 'a', 'n', 'o', 'l', 'a', 'b', 'b', 'c', 'c', 'd'],
    ['a', 'e', 'b', 'c', 'y', 'p', 'r', 'a', 't', 'i', 't', 'g'],
    ['s', 'n', 's', 'r', 't', 'a', 'b', 'l', 'a', 'r', 'o', 'd'],
    ['i', 'o', 'e', 'a', 'l', 's', 'e', 'l', 'u', 'd', 't', 'h'],
    ['t', 'h', 'o', 'b', 'r', 'e', 'a', 'm', 'a', 'p', 'a', 'o'],
    ['a', 'p', 'd', 's', 'a', 'r', 'o', 'd', 'p', 'n', 'n', 'l'],
    ['r', 'o', 't', 'h', 'r', 'e', 'd', 'e', 'f', 'g', 'j', 'a'],
    ['a', 'l', 'v', 'e', 't', 'n', 'r', 'i', 'u', 't', 'o', 'k'],
    ['l', 'y', 'e', 'h', 'a', 'a', 'u', 'p', 'u', 'n', 'g', 'i'],
    ['c', 'x', 'e', 'n', 'n', 'i', 'm', 'f', 'd', 'n', 't', 'p'],
    ['l', 'h', 'n', 'a', 'h', 'p', 'e', 't', 'u', 'l', 'f', 'g'],
    ['e', 'h', 'a', 'i', 'm', 'o', 'n', 'i', 'u', 'm', 'j', 'o']
];

// List of instruments that can be found in the word search
const hiddenInstruments = [
    'piano', 'tabla', 'sitar', 'flute', 'sarod', 'veena', 'harmonium', 'drum', 'clarinet'
];

// Listening activity content - Music as a Therapy passage
const listeningPassage = `
    "Rhythm and harmony find their way into the inward places of the soul", rightly said by Plato. Music is often referred to as 'food' for the soul due to the several benefits we can derive from experiencing it.

    Music can be pleasure for some, and a way to relax for others. It also motivates and energises listeners. Music is, indeed, a universal language, which can bring nations together and unite people with different faiths as it touches one's soul. In the mainstream, music is mainly known for its entertainment quotient, but the Indian culture also talks about the healing effects of music through 'Raga Chikitsa'. Raga Chikitsa has helped in reviving an ancient healing practice known as Nada Yoga.  

    Nada is a musical sound, which is believed to have curative effects on the body and soul of all creatures. Consequently, its power is therapeutic and is used in curing diseases. Medical research has found music therapy to aid patients in pain management. It is not surprising, as music affects the body and mind significantly.

    One experiences positive energy by listening to music. Music lifts one from clouds of desolation. Rhythms, particularly upbeat music, helps one distract oneself from situations that cause stress and brightens one's mood. Music lowers anxiety levels, relaxes mind and brings optimism. It is said that listening to soft, sedative music once a day can help overcome depression.

    Music therapy finds its traces in mythology. The story of Hippocrates, the Greek father of medicine dates back to 400 B.C. He is known to have used music to cure his patients. This therapy also aids stroke victims to heal at a faster rate, since it increases the patient's emotional comforts and motivates them to move towards the path of recovery. On the other hand, adolescents, too, are benefitted by music in terms of emotional, social and psychological well being. Music is a force that purifies beings from within.
`;

// Function to initialize the word search grid
function initializeWordSearch() {
    const gridContainer = document.querySelector('.word-search-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';
    
    // Create grid cells
    wordSearchGrid.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'word-search-row';
        
        row.forEach(letter => {
            const cell = document.createElement('div');
            cell.className = 'word-search-cell';
            cell.textContent = letter;
            cell.addEventListener('click', () => toggleWordSearchCell(cell));
            rowElement.appendChild(cell);
        });
        
        gridContainer.appendChild(rowElement);
    });
    
    // Initialize found instruments list
    const foundInstruments = document.getElementById('foundInstruments');
    if (foundInstruments) {
        foundInstruments.innerHTML = '';
    }
}

// Toggle selection of a word search cell
function toggleWordSearchCell(cell) {
    cell.classList.toggle('selected');
}

// Check if the instrument name is valid from the word search
function checkInstrument() {
    const input = document.getElementById('instrumentInput');
    if (!input) return;
    
    const instrument = input.value.trim().toLowerCase();
    
    // Check if the instrument is in the list and hasn't been found already
    if (hiddenInstruments.includes(instrument)) {
        const foundInstruments = document.getElementById('foundInstruments');
        if (!foundInstruments) return;
        
        // Check if already found
        const alreadyFound = Array.from(foundInstruments.children).some(
            item => item.textContent.toLowerCase() === instrument
        );
        
        if (alreadyFound) {
            alert('You already found this instrument!');
            return;
        }
        
        // Add to found list
        const instrumentTag = document.createElement('div');
        instrumentTag.className = 'found-instrument';
        instrumentTag.textContent = instrument;
        foundInstruments.appendChild(instrumentTag);
        
        // Clear input
        input.value = '';
        
        // Check if all instruments are found
        const foundCount = foundInstruments.children.length;
        if (foundCount === hiddenInstruments.length) {
            alert('Congratulations! You found all the hidden instruments!');
            
            // Update score
            score += 20;
            document.getElementById('totalScore').textContent = score;
            
            if (!modulesCompleted.includes('thinking-language')) {
                modulesCompleted.push('thinking-language');
                updateProgress();
                showAchievement('Word Search Completed!');
            }
        } else {
            // Update score for each found instrument
            score += 2;
            document.getElementById('totalScore').textContent = score;
        }
    } else {
        alert('That\'s not a valid instrument name or it\'s spelled incorrectly.');
        input.value = '';
    }
}

// Play the listening activity audio
function playListeningActivity() {
    // In a real implementation, this would play an audio file
    // For this implementation, we'll use the narrator to read the text
    if (window.narrator) {
        window.narrator.speak("Now playing the audio passage about Music as a Therapy. Listen carefully.");
        
        // Wait a moment before starting the actual passage
        setTimeout(() => {
            window.narrator.speak(listeningPassage);
        }, 3000);
    } else {
        alert('Audio narration is not available. Here is the text of the passage:');
        
        // Create a modal dialog with the text
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.maxWidth = '80%';
        modal.style.maxHeight = '80%';
        modal.style.overflowY = 'auto';
        modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        modal.style.zIndex = '1000';
        modal.style.borderRadius = '10px';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.marginTop = '20px';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.backgroundColor = '#4a6572';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '5px';
        closeBtn.style.cursor = 'pointer';
        
        closeBtn.onclick = () => modal.remove();
        
        modal.innerHTML = `<h3>Music as a Therapy</h3><div style="white-space: pre-line; line-height: 1.6;">${listeningPassage}</div>`;
        modal.appendChild(closeBtn);
        
        document.body.appendChild(modal);
    }
}

// Record speech function has been removed

// Initialize activities when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize word search
    initializeWordSearch();
    
    // Add event listener to the instrument input for Enter key
    const instrumentInput = document.getElementById('instrumentInput');
    if (instrumentInput) {
        instrumentInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                checkInstrument();
            }
        });
    }
});
