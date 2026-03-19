/**
 * Activities for The Proposal interactive lesson
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
}

// Vanka story content for listening activity
const vankaStoryContent = `
Vanka Zhukov, a nine-year-old boy, was made an assistant to Alyakhin, the Shoemaker. He didn't go to bed on Christmas Eve. When everyone in the shop had gone to Church, he began to write on a crumpled sheet of paper.

"Dear Grandfather Konstantin, he wrote", I'm writing a letter to you. I wish you a Merry Christmas and all good things from the Lord God. I've no father and mother, and you are all I have left.

Vanka raised his eyes to the dark windowpane. In his imagination he saw his grandfather Konstantin standing there. His grandfather was a night watchman on the estate of a rich man. Konstantin was a small, thin and lively old man of sixty-five whose face was always crinkling with laughter.

In the daytime the old man slept in the servant's kitchen or cracked jokes with the cooks. At night, wrapped in a big sheepskin coat he made rounds of the estate, blowing his whistle at regular intervals. He was always followed by his dogs, Brownie and Eel.

Yesterday I was given a beating. That was because when I was rocking the baby in the cradle, I unfortunately fell asleep. Another day the mistress of the house asked me to clean the fish. I didn't know how, so she rubbed the fish all over my face. My friends laughed at me.

Then there's nothing to eat. In the morning they give me bread, there is porridge for dinner and in the evening only bread again. The master and the mistress eat all the good things themselves. I sleep in the corridor and when the baby cries, I don't get any sleep at all because I've to rock the cradle.

Dear Grandfather, please take me away from here, take me to the village, it's more than I can bear. I'll grind your snuff for you, I'll pray to God to keep you healthy and if I ever do anything wrong, you can beat me as you like.

If you think there's no place for me then I can clean boots or even work as a shepherd boy. Grandfather, it's more than I can bear. I thought of running away to the village, but I don't have any boots.

Dear Grandfather, when they put up the Christmas tree at the big house, please take down a golden walnut for me and hide it in the green box. Ask the young mistress Olga, and say it is for Vanka.

Vanka folded the sheet of paper and then put it in an envelope he had bought the previous day. He thought for a while, then wrote the address: To Grandfather in the Village. He added the words: Konstantin Makarich.

He ran out to the street to post it. Vanka had been told by the clerks that letters were dropped in boxes from where they were carried all over the world on mail coaches drawn by horse and driven by drunken drivers, while the bells jingled.

Vanka ran to the nearest mailbox and put his letter in it. An hour later, lulled by sweetest hopes, he was fast asleep. He dreamed of a stove. His grandfather was sitting beside it, reading out his letter to the cooks. Eel, the dog, was walking round the stove, wagging his tail.
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
        const contentParagraphs = vankaStoryContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("Now please answer the questions about Vanka's story in the text areas below.");
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
        alert('Speech synthesis is not available in your browser. Please read about Vanka by Anton Chekhov instead.');
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
            window.narrator.speak("Please write your response in the text area below. Consider the different types of letters and communication methods discussed in the lesson, and think about how Vanka and Lencho's situations might be similar.");
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
        alert('Please write a more detailed response (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your writing has been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your writing has been saved.");
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
        window.narrator.speak("Think about the topics discussed in the role play dialogue. Share your thoughts about violence on television and its impact on children, and discuss other topics like people going abroad for studies or building a dispensary in place of a playground.");
    }
}

// Save listening notes
function saveListeningNotes() {
    const answers = [
        document.getElementById('listeningAnswer1'),
        document.getElementById('listeningAnswer2'),
        document.getElementById('listeningAnswer3'),
        document.getElementById('listeningAnswer4'),
        document.getElementById('listeningAnswer5')
    ];
    
    let allAnswered = true;
    answers.forEach(answer => {
        if (!answer || answer.value.trim().length < 5) {
            allAnswered = false;
        }
    });
    
    if (!allAnswered) {
        alert('Please provide more detailed answers for all questions.');
        return;
    }
    
    // Save the answers (in a real app, this would be sent to a server)
    alert('Your listening activity answers have been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (window.narrator) {
        window.narrator.speak("Great job! Your listening activity answers have been saved.");
    }
}

// Project work information
const projectInfo = {
    qualities: [
        "Character and values",
        "Education and intelligence", 
        "Family background",
        "Financial stability",
        "Physical compatibility",
        "Shared interests and goals",
        "Communication skills",
        "Respect and understanding",
        "Emotional maturity",
        "Compatibility in lifestyle",
        "Mutual respect",
        "Trust and honesty",
        "Supportive nature",
        "Ambition and drive",
        "Sense of humor"
    ],
    
    discussionTopics: [
        "People going abroad for studies",
        "Building a dispensary in place of a playground",
        "Sports cannot be a profession",
        "The importance of family values",
        "Technology's impact on relationships",
        "Career vs. personal life balance",
        "The role of education in marriage",
        "Financial planning for the future"
    ]
};

// Show project information
function showProjectInfo() {
    const info = `
        Qualities to look for in a life partner:
        ${projectInfo.qualities.map(q => `• ${q}`).join('\n')}
        
        Discussion topics for group work:
        ${projectInfo.discussionTopics.map(t => `• ${t}`).join('\n')}
    `;
    
    alert(info);
    
    if (window.narrator) {
        window.narrator.speak("Here are some qualities to consider when looking for a life partner, and topics you can discuss with your group for the project work.");
    }
}

// Fun facts about silent letters
const funFacts = {
    silentH: [
        "Honest - the H is silent",
        "Hour - the H is silent", 
        "Honour - the H is silent",
        "Lamb - the B is silent",
        "Climb - the B is silent",
        "Bomb - the B is silent"
    ],
    
    tongueTwisters: [
        "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
        "Swan swam over the pond, Swim swan swim! Swan swam back again Well swum swan!",
        "She sells seashells by the seashore",
        "Peter Piper picked a peck of pickled peppers"
    ],
    
    idioms: [
        "Bury the hatchet - to stop conflict and make peace",
        "Break the ice - to reduce tension in a social situation",
        "Call the shots - to be in charge and make decisions",
        "All's fair in love and war - any method is acceptable in certain situations"
    ]
};

// Show fun facts
function showFunFacts() {
    const facts = `
        Silent Letter H:
        ${funFacts.silentH.map(f => `• ${f}`).join('\n')}
        
        Tongue Twisters:
        ${funFacts.tongueTwisters.map(t => `• ${t}`).join('\n')}
        
        Idioms:
        ${funFacts.idioms.map(i => `• ${i}`).join('\n')}
    `;
    
    alert(facts);
    
    if (window.narrator) {
        window.narrator.speak("Here are some fun facts about silent letters, tongue twisters, and idioms that you can practice!");
    }
}
