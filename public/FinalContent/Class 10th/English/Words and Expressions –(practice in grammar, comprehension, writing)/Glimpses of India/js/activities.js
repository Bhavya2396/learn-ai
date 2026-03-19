/**
 * Activities for Glimpses of India interactive lesson
 */

// Activities setup
document.addEventListener('DOMContentLoaded', () => {
    setupActivities();
});

function setupActivities() {
    // Initially hide writing pad
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'none';
    }
}

// Function to check matchings
let matchCount = 0;
const totalMatchPairs = 9; // Total number of matching pairs

function selectMatch(item, type) {
    // Handle match selection logic in main.js
}

// Sample audio transcripts for the listening activity
const audioTranscript = {
    baker: `During our childhood in Goa, the baker used to be our friend, companion and guide. He used to come at least twice a day. Once, when he set out in the morning on his selling round, and then again, when he returned after emptying his huge basket. The jingling thud of his bamboo woke us up from sleep and we ran to meet and greet him. Why was it so? Was it for the love of the loaf? Not at all. The loaves were bought by some Paskine or Bastine, the maid-servant of the house! What we longed for were those bread-bangles which we chose carefully. Sometimes it was sweet bread of a special kind.`
};

// Play audio for listening activity
function playListeningActivity() {
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(audioTranscript.baker);
    } else {
        alert('Audio narration is disabled. Please enable it to listen to the passage.');
    }
}

// Save notes from listening activity
function saveListeningNotes() {
    const notes = document.getElementById('listeningNotes').value.trim();
    const summary = document.getElementById('narrativeAccount').value.trim();
    
    if (notes.length < 20) {
        alert('Please write more detailed notes (at least 20 characters).');
        return;
    }
    
    if (summary.length < 50) {
        alert('Please write a more complete summary (at least 50 characters).');
        return;
    }
    
    // In a real application, this would save the notes to a server or local storage
    alert('Your notes and summary have been saved!');
    
    // Update progress
    if (window.score !== undefined) {
        window.score += 15;
        document.getElementById('totalScore').textContent = window.score;
    }
    
    if (window.modulesCompleted && !window.modulesCompleted.includes('activities')) {
        if (typeof window.showAchievement === 'function') {
            window.showAchievement('Listening Activity Completed!');
        }
        
        if (typeof window.updateProgress === 'function') {
            window.modulesCompleted.push('activities');
            window.updateProgress();
        }
    }
}

// Record speaking response
function recordSpeaking() {
    // In a real application, this would access the device microphone
    alert('In a real implementation, this would record your spoken response about planning a trip to Araku Valley.');
    
    // Provide feedback for the speaking activity
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(`Think about the following aspects for your trip to Araku Valley:
        1. How would you travel there? What are the transportation options?
        2. Where would you stay? What accommodation options fit your budget?
        3. What activities would you include in your itinerary?
        4. What local cuisine would you want to try?
        5. How much would the entire trip cost?`);
    }
    
    // Update progress
    if (window.score !== undefined) {
        window.score += 10;
        document.getElementById('totalScore').textContent = window.score;
    }
}

// Open writing pad for writing activity
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        document.getElementById('writingPad').focus();
    }
    
    // Provide guidance for writing
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(`Write an account of a travel by train using these expressions: "length and breadth", "chugged into", "vouch for", "long gone", and "out came the treats". Describe the journey by giving details of distance, booking of tickets, facilities available, and suggestions for improvement.`);
    }
}

// Save writing
function saveWriting() {
    const writingText = document.getElementById('writingPad').value.trim();
    
    if (writingText.length < 150) {
        alert('Please write a more detailed account (at least 150 characters).');
        return;
    }
    
    // Check for required expressions
    const requiredExpressions = [
        'length and breadth',
        'chugged into',
        'vouch for',
        'long gone',
        'out came the treats'
    ];
    
    let usedExpressions = 0;
    requiredExpressions.forEach(expr => {
        if (writingText.toLowerCase().includes(expr.toLowerCase())) {
            usedExpressions++;
        }
    });
    
    if (usedExpressions < 3) {
        alert(`Please use more of the required expressions. You've used ${usedExpressions} out of 5.`);
        return;
    }
    
    // In a real application, this would save the writing to a server or local storage
    alert('Your train journey account has been saved!');
    
    // Update progress
    if (window.score !== undefined) {
        window.score += 20;
        document.getElementById('totalScore').textContent = window.score;
    }
    
    if (typeof window.showAchievement === 'function') {
        window.showAchievement('Writing Activity Completed!');
    }
}

// Show resources
function showResource(resourceId) {
    let resourceTitle, resourceContent;
    
    switch (resourceId) {
        case 'railway-history':
            resourceTitle = "History of Indian Railways";
            resourceContent = `The Indian Railways was established in 1853 with the first passenger train running between Bombay (now Mumbai) and Thane. Today, it is one of the world's largest railway networks with over 67,000 kilometers of track and 7,300 stations. It carries over 23 million passengers daily and 3 million tonnes of freight. The railways played a crucial role in India's independence movement and economic development.`;
            break;
            
        case 'luxury-trains':
            resourceTitle = "Luxury Trains of India";
            resourceContent = `India has several luxury tourist trains that offer royal experiences:
            1. Palace on Wheels - Explores Rajasthan and Agra
            2. Maharajas' Express - India's most expensive luxury train
            3. Golden Chariot - Covers South India
            4. Deccan Odyssey - Explores Maharashtra and Goa
            5. Royal Rajasthan on Wheels - A newer luxury train covering Rajasthan
            These trains feature lavish cabins, fine dining, and curated experiences.`;
            break;
            
        case 'project-template':
            resourceTitle = "Railway Project Template";
            resourceContent = `Project Structure:
            1. Introduction to Indian Railways
            2. Historical Development (1853-1947)
            3. Post-Independence Growth
            4. Modern Transformation (Electrification, High-Speed Rail, etc.)
            5. Luxury & Heritage Trains
            6. Personal Experiences (Interviews)
            7. Photo Gallery & Visual Elements
            8. Bibliography & Resources`;
            break;
            
        default:
            resourceTitle = "Resource Not Found";
            resourceContent = "The requested resource could not be found.";
    }
    
    // In a real application, this would display the resource in a modal
    alert(`${resourceTitle}\n\n${resourceContent}`);
    
    // Narrate if available
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(`${resourceTitle}. ${resourceContent}`);
    }
}
