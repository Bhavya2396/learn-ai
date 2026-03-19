/**
 * Activities for Unit 7: Reach for the Top interactive lesson
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

// Hugh Herr content for listening activity
const hughHerrContent = `
Harvard-MIT researcher, Hugh Herr, is familiar with the obstacles faced by amputees. A world-class mountain climber at the age of 17, Herr and a friend were trapped in a snowstorm while ascending New Hampshire's Mount Washington in 1982. After three days without food or camping gear, the two were rescued, but frostbite cost Herr both his legs, which were amputated just below the knee.

Herr was fitted with prostheses, but he soon discovered that they were developed for walking on flat surfaces, and not for taking on advanced functions like climbing or running. With the same determination that he once applied to climbing, he set out to create a better prosthetic leg. He worked with an engineering shop to fashion his own prostheses, tinkering with customised sockets and lighter materials. He even designed artificial feet specially made for climbing rock (built flat and narrow for getting a toehold in cracks and ice featuring sharp spikes).

"I experienced a tremendous amount of pain from prosthetic limbs at first", Herr says. "So I decided to go back to school and learn about physics and engineering to try to solve these problems." Herr obtained a Master's degree in mechanical engineering from MIT in 1993 and a doctorate in biophysics from Harvard five years later.

After struggling for a decade to come up with a better prosthetic limb, just getting the knee to market will be a personal triumph for Herr — yet another mountain conquered. "It's been a long road", he says. "But I think I'm finally in a position to make a difference."
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
        const contentParagraphs = hughHerrContent.split('\n\n').filter(p => p.trim().length > 0);
        
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
        alert('Speech synthesis is not available in your browser. Please read about Hugh Herr instead.');
    }
}

// Information about resources for project work
const resourceInfo = {
    firstLadies: `
        In January 2018, the President of India awarded 112 amazing "First Ladies" for being first in their respective fields. These women have made remarkable achievements in various domains including sports, arts, science, business, and public service.
        
        The "First Ladies" include individuals like Karnam Malleswari (first Indian woman to win an Olympic medal), Bachendri Pal (first Indian woman to climb Mount Everest), Arunima Sinha (first female amputee to climb Mount Everest), Tessy Thomas (first woman to head a missile project in India), and many others who broke barriers in male-dominated fields.
        
        Their stories of perseverance, courage and exceptional talent serve as inspiration for future generations of girls across the country.
    `,
    sportsWomen: `
        Indian sportswomen have made remarkable achievements in various sports:
        
        Saina Nehwal: Born in Hisar, Haryana, she moved to Hyderabad where she trained under coaches like Nani Prasad and P. Gopichand. She became World No. 2 in 2009 and World No. 1 in 2015. She won an Olympic bronze medal and received the Rajiv Gandhi Khel Ratna award, Arjuna award, and Padma Bhushan.
        
        Sania Mirza: Born in Mumbai, she started learning tennis at age six from her father. She began participating in ITF tournaments in 2001 and turned professional in 2003. She won several doubles titles in WTA and was formerly ranked as India's No. 1 doubles player. She has been awarded the Arjuna Award and the Padma Shri.
        
        Other notable sportswomen include Mary Kom (boxing), PV Sindhu (badminton), and Mithali Raj (cricket).
    `,
    projectTemplate: `
        Project Template for "First Ladies of India":
        
        1. Introduction
           - Definition of "First Ladies" in this context
           - Brief overview of the 2018 Presidential awards
        
        2. Profile Section (for each selected "First Lady")
           - Personal background and early life
           - Challenges faced in their journey
           - Breakthrough achievements
           - Impact on society and other women
           - Recognition and awards received
        
        3. Common Themes
           - Barriers broken
           - Support systems that helped them
           - Personal qualities contributing to their success
        
        4. Conclusion
           - Lasting legacy
           - Inspiration for future generations
        
        5. Visual Elements
           - Photographs
           - Timeline of achievements
           - Quotes from the "First Ladies"
    `
};

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'first-ladies':
            content = resourceInfo.firstLadies;
            break;
        case 'sports-women':
            content = resourceInfo.sportsWomen;
            break;
        case 'project-template':
            content = resourceInfo.projectTemplate;
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
            window.narrator.speak("Write a short motivational article for your school magazine using information about Saina Nehwal and Sania Mirza. The article should aim towards encouraging girls to take up sports.");
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
    if (typeof score !== 'undefined') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your article has been saved.");
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
    if (typeof score !== 'undefined') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
    
    if (window.narrator) {
        window.narrator.speak("Great job! Your notes and narrative account have been saved.");
    }
}
