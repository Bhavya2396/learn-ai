/**
 * Activities for Identity Theft and Detectives interactive lesson
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
    
    // Open story pad button
    const storyBtn = document.querySelector('.project-activity .interactive-btn');
    if (storyBtn) {
        storyBtn.addEventListener('click', openStoryPad);
    }
    
    // Save listening answers button
    const saveAnswersBtn = document.querySelector('.listening-notes .interactive-btn');
    if (saveAnswersBtn) {
        saveAnswersBtn.addEventListener('click', saveListeningAnswers);
    }
    
    // Save writing button
    const saveWritingBtn = document.querySelector('.writing-pad .interactive-btn');
    if (saveWritingBtn) {
        saveWritingBtn.addEventListener('click', saveWriting);
    }
    
    // Save story button
    const saveStoryBtn = document.querySelector('.story-pad .interactive-btn');
    if (saveStoryBtn) {
        saveStoryBtn.addEventListener('click', saveStory);
    }
}

// King Shibi story content for listening activity
const kingShibiStory = `
There are many stories in our mythology when gods have disguised themselves in the forms of human beings, birds, etc. This is done either to test the efficiency and ability of the kings or to see if people are happy and contented on earth. This is another aspect of changing the identity. Let us listen to story of King Shibi.

There was a great king, Shibi Rana who had immense power then, even gods in heavens were amazed. They feared that Shibi might take away their kingdoms. They devised a plan to test his sense of justice. So they decided to reach Shibi's kingdom in disguise.

One day, Shibi Rana was sitting on his throne. His courtroom was surrounded by majestic gardens. There came a scared dove flying to him and it was followed by a fierce looking eagle. The king gave shelter to the dove and saved her. The eagle argued that the king has taken away his food — the dove. It would starve. The king assured the eagle that he would give equal quantity of any other food. The eagle asked for King Shibi's flesh. The magnanimous king agreed with a smile. A balance was brought in the court. It was soon found that with each addition of the king's flesh the dove grew heavier. The equal balance was not arrived at. But the king remained calm and unperturbed.

The Gods in the guise of dove and eagle were assured of Shibi's righteousness. The forms of the eagle and the dove soon disappeared. In their place stood Indra, the king of the Gods and Agni, the God of fire smiling and blessing the king for his benevolence and greatness.
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
        const contentParagraphs = kingShibiStory.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("Now please answer the questions in the text areas below. Take your time to think about each answer.");
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
        alert('Speech synthesis is not available in your browser. Please read the story about King Shibi instead.');
    }
}

// Save listening answers
function saveListeningAnswers() {
    const answers = [
        document.getElementById('listeningQ1'),
        document.getElementById('listeningQ2'),
        document.getElementById('listeningQ3'),
        document.getElementById('listeningQ4'),
        document.getElementById('listeningQ5'),
        document.getElementById('listeningQ6')
    ];
    
    let allAnswered = true;
    let totalLength = 0;
    
    answers.forEach((answer, index) => {
        if (!answer || answer.value.trim().length === 0) {
            allAnswered = false;
        } else {
            totalLength += answer.value.trim().length;
        }
    });
    
    if (!allAnswered) {
        alert('Please answer all questions before saving.');
        return;
    }
    
    if (totalLength < 100) {
        alert('Please provide more detailed answers (at least 100 characters total).');
        return;
    }
    
    // Save the answers (in a real app, this would be sent to a server)
    alert('Your answers have been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (typeof showAchievement === 'function') {
        showAchievement('Listening Activity Completed!');
    }
    
    if (window.narrator) {
        window.narrator.speak("Great job! Your answers have been saved. You've completed the listening activity about King Shibi.");
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
            window.narrator.speak("Please write about your identity, interests, and future vision in the text area below. Think about what makes you unique and what you hope to achieve in the future.");
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
    
    if (text.length < 300) {
        alert('Please write a more detailed response (at least 300 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your writing has been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (typeof showAchievement === 'function') {
        showAchievement('Writing Activity Completed!');
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your personal reflection has been saved. Thank you for sharing your thoughts about your identity and future vision.");
    }
}

// Open story pad function
function openStoryPad() {
    const storyPad = document.querySelector('.story-pad');
    if (storyPad) {
        storyPad.style.display = 'block';
        
        // Scroll to the story pad
        storyPad.scrollIntoView({ behavior: 'smooth' });
        
        // Provide instructions via narrator
        if (window.narrator) {
            window.narrator.speak("Please continue the scary story in the text area below. Remember to give it a suitable title and make it terrifying. Use your imagination to create suspense and horror.");
        }
    } else {
        console.error('Story pad element not found');
    }
}

// Save story function
function saveStory() {
    const title = document.getElementById('storyTitle');
    const content = document.getElementById('storyContent');
    
    if (!title || !content) {
        console.error('Story title or content element not found');
        return;
    }
    
    const titleText = title.value.trim();
    const contentText = content.value.trim();
    
    if (titleText.length === 0) {
        alert('Please give your story a title.');
        return;
    }
    
    if (contentText.length < 200) {
        alert('Please write a more detailed story (at least 200 characters).');
        return;
    }
    
    // Save the story (in a real app, this would be sent to a server)
    alert(`Your story "${titleText}" has been saved!`);
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    if (typeof showAchievement === 'function') {
        showAchievement('Creative Writing Completed!');
    }
    
    if (window.narrator) {
        window.narrator.speak(`Excellent work! Your scary story "${titleText}" has been saved. You've shown great creativity in storytelling.`);
    }
}

// Speaking activity function
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('In a real implementation, this would record your spoken response using the Web Audio API.');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 10);
    }
    
    if (window.narrator) {
        window.narrator.speak("Think about identity theft in the digital age. Discuss with your group about the importance of protecting personal information online and measures to prevent identity theft.");
    }
}

// Additional utility functions for activities
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'identity-theft-info':
            content = 'Identity theft occurs when someone uses another person\'s personal information without permission to commit fraud or other crimes. Common methods include phishing, data breaches, and social engineering.';
            break;
        case 'prevention-tips':
            content = 'To prevent identity theft: use strong passwords, be cautious with personal information online, monitor your accounts regularly, and be aware of phishing attempts.';
            break;
        case 'detective-career':
            content = 'Private investigators help solve cases, locate missing persons, conduct surveillance, and gather evidence. They need patience, attention to detail, and strong analytical skills.';
            break;
        default:
            content = 'Resource information not available.';
    }
    
    alert(content);
    
    if (window.narrator) {
        window.narrator.speak(content);
    }
}

// Digital safety tips for the reflection activity
const digitalSafetyTips = [
    "Never share personal information like passwords, social security numbers, or bank details online",
    "Use strong, unique passwords for each account",
    "Be cautious about what you post on social media",
    "Don't click on suspicious links or download unknown attachments",
    "Keep your software and devices updated",
    "Use two-factor authentication when available",
    "Monitor your accounts regularly for unusual activity",
    "Be aware of phishing attempts and scams"
];

// Get random digital safety tip
function getRandomSafetyTip() {
    const randomIndex = Math.floor(Math.random() * digitalSafetyTips.length);
    return digitalSafetyTips[randomIndex];
}

// Show digital safety tip
function showSafetyTip() {
    const tip = getRandomSafetyTip();
    alert(`Digital Safety Tip: ${tip}`);
    
    if (window.narrator) {
        window.narrator.speak(`Here's a digital safety tip: ${tip}`);
    }
}
