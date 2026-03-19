/**
 * Story content and functionality for Footprints without Feet
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>THE two boys started in <span class="highlight-vocab">surprise<span class="vocab-tooltip">astonishment; a feeling caused by something unexpected</span></span> at the fresh muddy imprints of a pair of bare feet. What was a barefooted man doing on the steps of a house, in the middle of London? And where was the man?</p>
    
    <div class="vocabulary-note">
        <div class="word">surprise</div>
        <div class="definition">astonishment; a feeling caused by something unexpected</div>
    </div>
    
    <p>As they gazed, a remarkable sight met their eyes. A fresh footmark appeared from nowhere!</p>
    
    <p>Further footprints followed, one after another, descending the steps and <span class="highlight-vocab">progressing<span class="vocab-tooltip">moving forward or advancing</span></span> down the street. The boys followed, <span class="highlight-vocab">fascinated<span class="vocab-tooltip">very interested and attracted</span></span>, until the muddy impressions became fainter and fainter, and at last disappeared altogether.</p>
    
    <div class="vocabulary-note">
        <div class="word">progressing</div>
        <div class="definition">moving forward or advancing</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">fascinated</div>
        <div class="definition">very interested and attracted</div>
    </div>
    
    <p>The explanation of the mystery was really simple enough. The <span class="highlight-vocab">bewildered<span class="vocab-tooltip">confused and puzzled</span></span> boys had been following a scientist who had just discovered how to make the human body transparent.</p>
    
    <div class="vocabulary-note">
        <div class="word">bewildered</div>
        <div class="definition">confused and puzzled</div>
    </div>
    
    <p>Griffin, the scientist, had carried out experiment after experiment to prove that the human body could become invisible. Finally he swallowed certain <span class="highlight-vocab">rare<span class="vocab-tooltip">not common; unusual</span></span> drugs and his body became as transparent as a sheet of glass — though it also remained as solid as glass.</p>
    
    <div class="vocabulary-note">
        <div class="word">rare</div>
        <div class="definition">not common; unusual</div>
    </div>
    
    <p>Brilliant scientist though he was, Griffin was rather a <span class="highlight-vocab">lawless<span class="vocab-tooltip">not obeying rules or laws</span></span> person. His landlord disliked him and tried to <span class="highlight-vocab">eject<span class="vocab-tooltip">force to leave</span></span> him. In revenge Griffin set fire to the house. To get away without being seen he had to remove his clothes. Thus it was that he became a homeless wanderer, without clothes, without money, and quite invisible — until he happened to step in some mud, and left footprints as he walked!</p>
    
    <div class="vocabulary-note">
        <div class="word">lawless</div>
        <div class="definition">not obeying rules or laws</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">eject</div>
        <div class="definition">force to leave</div>
    </div>
    
    <p>He escaped easily enough from the boys who followed his footprints in London. But his adventures were by no means over. He had chosen a bad time of the year to wander about London without clothes. It was mid-winter. The air was <span class="highlight-vocab">bitterly<span class="vocab-tooltip">extremely</span></span> cold and he could not do without clothes. Instead of walking about the streets he decided to slip into a big London store for warmth.</p>
    
    <div class="vocabulary-note">
        <div class="word">bitterly</div>
        <div class="definition">extremely</div>
    </div>
    
    <p>Closing time arrived, and as soon as the doors were shut Griffin was able to give himself the pleasure of clothing and feeding himself without regard to expense. He broke open boxes and wrappers and fitted himself out with warm clothes. Soon, with shoes, an overcoat and a wide-brimmed hat, he became a fully dressed and visible person. In the kitchen of the restaurant he found cold meat and coffee, and he followed up the meal with sweets and wine taken from the grocery store. Finally he <span class="highlight-vocab">settled down<span class="vocab-tooltip">relaxed or established oneself</span></span> to sleep on a pile of quilts.</p>
    
    <div class="vocabulary-note">
        <div class="word">settled down</div>
        <div class="definition">relaxed or established oneself</div>
    </div>
    
    <p>If only Griffin had managed to wake up in good time all might have been well. As it was, he did not wake up until the assistants were already arriving next morning. When he saw a couple of them approaching, he <span class="highlight-vocab">panicked<span class="vocab-tooltip">suddenly became very frightened</span></span> and began to run. They naturally gave chase. In the end he was able to escape only by quickly taking off his newly-found clothes. So once more he found himself invisible but naked in the chill January air.</p>
    
    <div class="vocabulary-note">
        <div class="word">panicked</div>
        <div class="definition">suddenly became very frightened</div>
    </div>
    
    <p>This time he decided to try the stock of a theatrical company in the hope of finding not only clothes but also something that would hide the empty space above his shoulders. <span class="highlight-vocab">Shivering<span class="vocab-tooltip">trembling with cold</span></span> with cold he hurried to Drury Lane, the centre of the theatre world.</p>
    
    <div class="vocabulary-note">
        <div class="word">shivering</div>
        <div class="definition">trembling with cold</div>
    </div>
    
    <p>He soon found a suitable shop. He made his way, invisible, upstairs and came out a little later wearing bandages round his forehead, dark glasses, false nose, big <span class="highlight-vocab">bushy<span class="vocab-tooltip">thick and full</span></span> side-whiskers, and a large hat. To escape without being seen, he <span class="highlight-vocab">callously<span class="vocab-tooltip">in a cruel way, without caring</span></span> attacked the shopkeeper from behind, after which he robbed him of all the money he could find.</p>
    
    <div class="vocabulary-note">
        <div class="word">bushy</div>
        <div class="definition">thick and full</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">callously</div>
        <div class="definition">in a cruel way, without caring</div>
    </div>
    
    <p>Eager to get away from crowded London he took a train to the village of Iping, where he booked two rooms at the local inn.</p>
    
    <p>The arrival of a stranger at an inn in winter was in any case an unusual event. A stranger of such <span class="highlight-vocab">uncommon<span class="vocab-tooltip">rare; unusual</span></span> appearance set all tongues wagging. Mrs Hall, the landlord's wife, made every effort to be friendly. But Griffin had no desire to talk, and told her, "My reason for coming to Iping is a desire for <span class="highlight-vocab">solitude<span class="vocab-tooltip">the state of being alone</span></span>. I do not wish to be disturbed in my work. Besides, an accident has affected my face."</p>
    
    <div class="vocabulary-note">
        <div class="word">uncommon</div>
        <div class="definition">rare; unusual</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">solitude</div>
        <div class="definition">the state of being alone</div>
    </div>
    
    <p>Satisfied that her guest was an <span class="highlight-vocab">eccentric<span class="vocab-tooltip">strange or unusual, especially in behavior</span></span> scientist, and in view of the fact that he had paid her in advance, Mrs Hall was prepared to excuse his strange habits and <span class="highlight-vocab">irritable<span class="vocab-tooltip">easily annoyed</span></span> temper. But the stolen money did not last long, and presently Griffin had to admit that he had no more ready cash. He pretended, however, that he was expecting a cheque to arrive at any moment.</p>
    
    <div class="vocabulary-note">
        <div class="word">eccentric</div>
        <div class="definition">strange or unusual, especially in behavior</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">irritable</div>
        <div class="definition">easily annoyed</div>
    </div>
    
    <p>Shortly afterwards a curious episode occurred. Very early in the morning a <span class="highlight-vocab">clergyman<span class="vocab-tooltip">a religious leader or priest</span></span> and his wife were awakened by noises in the study. Creeping downstairs, they heard the <span class="highlight-vocab">chink<span class="vocab-tooltip">light metallic sound</span></span> of money being taken from the clergyman's desk.</p>
    
    <div class="vocabulary-note">
        <div class="word">clergyman</div>
        <div class="definition">a religious leader or priest</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">chink</div>
        <div class="definition">light metallic sound</div>
    </div>
    
    <p>Without making any noise and with a poker <span class="highlight-vocab">grasped<span class="vocab-tooltip">held firmly</span></span> firmly in his hand, the clergyman flung open the door.</p>
    
    <div class="vocabulary-note">
        <div class="word">grasped</div>
        <div class="definition">held firmly</div>
    </div>
    
    <p>"Surrender!"</p>
    
    <p>Then to his <span class="highlight-vocab">amazement<span class="vocab-tooltip">great surprise</span></span> he realised that the room appeared to be empty. He and his wife looked under the desk, and behind the curtains, and even up the <span class="highlight-vocab">chimney<span class="vocab-tooltip">a vertical structure through which smoke and gases escape from a fire</span></span>. There wasn't a sign of anybody. Yet the desk had been opened and the housekeeping money was missing.</p>
    
    <div class="vocabulary-note">
        <div class="word">amazement</div>
        <div class="definition">great surprise</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">chimney</div>
        <div class="definition">a vertical structure through which smoke and gases escape from a fire</div>
    </div>
    
    <p>"Extraordinary affair!" the clergyman kept saying for the rest of the day.</p>
    
    <p>But it was not as <span class="highlight-vocab">extraordinary<span class="vocab-tooltip">unusual or remarkable</span></span> as the behaviour of Mrs Hall's furniture a little later that morning.</p>
    
    <div class="vocabulary-note">
        <div class="word">extraordinary</div>
        <div class="definition">unusual or remarkable</div>
    </div>
    
    <p>The landlord and his wife were up very early, and were surprised to see the scientist's door wide open. Usually it was shut and locked, and he was furious if anyone entered his room. The opportunity seemed too good to be missed. They <span class="highlight-vocab">peeped<span class="vocab-tooltip">looked quickly and secretly</span></span> round the door, saw nobody, and decided to investigate. The bedclothes were cold, showing that the scientist must have been up for some time; and stranger still, the clothes and bandages that he always wore were lying about the room.</p>
    
    <div class="vocabulary-note">
        <div class="word">peeped</div>
        <div class="definition">looked quickly and secretly</div>
    </div>
    
    <p>All of a sudden Mrs Hall heard a <span class="highlight-vocab">sniff<span class="vocab-tooltip">the sound of breathing in through the nose</span></span> close to her ear. A moment later the hat on the bedpost leapt up and dashed itself into her face. Then the bedroom chair became alive. Springing into the air it charged straight at her, legs foremost. As she and her husband turned away in terror, the extraordinary chair pushed them both out of the room and then appeared to slam and lock the door after them.</p>
    
    <div class="vocabulary-note">
        <div class="word">sniff</div>
        <div class="definition">the sound of breathing in through the nose</div>
    </div>
    
    <p>Mrs Hall almost fell down the stairs in <span class="highlight-vocab">hysterics<span class="vocab-tooltip">extreme emotional excitement or fear</span></span>. She was convinced that the room was <span class="highlight-vocab">haunted<span class="vocab-tooltip">visited by ghosts</span></span> by spirits, and that the stranger had somehow caused these to enter into her furniture.</p>
    
    <div class="vocabulary-note">
        <div class="word">hysterics</div>
        <div class="definition">extreme emotional excitement or fear</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">haunted</div>
        <div class="definition">visited by ghosts</div>
    </div>
    
    <p>"My poor mother used to sit in that chair," she moaned. "To think it should rise up against me now!"</p>
    
    <p>The feeling among the neighbours was that the trouble was caused by <span class="highlight-vocab">witchcraft<span class="vocab-tooltip">magic performed by witches</span></span>. But witchcraft or not, when news of the burglary at the clergyman's home became known, the strange scientist was strongly suspected of having had a hand in it. Suspicion grew even stronger when he suddenly produced some ready cash, though he had admitted not long before that he had no money.</p>
    
    <div class="vocabulary-note">
        <div class="word">witchcraft</div>
        <div class="definition">magic performed by witches</div>
    </div>
    
    <p>The village <span class="highlight-vocab">constable<span class="vocab-tooltip">police officer</span></span> was secretly sent for. Instead of waiting for the constable, Mrs Hall went to the scientist, who had somehow mysteriously appeared from his empty bedroom.</p>
    
    <div class="vocabulary-note">
        <div class="word">constable</div>
        <div class="definition">police officer</div>
    </div>
    
    <p>"I want to know what you have been doing to my chair upstairs," she demanded. "And I want to know how it is you came out of an empty room and how you entered a locked room."</p>
    
    <p>The scientist was always <span class="highlight-vocab">quick-tempered<span class="vocab-tooltip">becoming angry easily</span></span>; now he became furious. "You don't understand who or what I am!" he shouted. "Very well — I'll show you."</p>
    
    <div class="vocabulary-note">
        <div class="word">quick-tempered</div>
        <div class="definition">becoming angry easily</div>
    </div>
    
    <p>Suddenly he threw off bandages, whiskers, spectacles, and even nose. It took him only a minute to do this. The <span class="highlight-vocab">horrified<span class="vocab-tooltip">extremely shocked</span></span> people in the bar found themselves staring at a headless man!</p>
    
    <div class="vocabulary-note">
        <div class="word">horrified</div>
        <div class="definition">extremely shocked</div>
    </div>
    
    <p>Mr Jaffers, the constable, now arrived, and was quite surprised to find that he had to arrest a man without a head. But Jaffers was not easily prevented from doing his duty. If a magistrate's <span class="highlight-vocab">warrant<span class="vocab-tooltip">an official document giving authority</span></span> ordered a person's arrest, then that person had to be arrested, with or without his head.</p>
    
    <div class="vocabulary-note">
        <div class="word">warrant</div>
        <div class="definition">an official document giving authority</div>
    </div>
    
    <p>There followed a remarkable scene as the policeman tried to get hold of a man who was becoming more and more invisible as he threw off one garment after another. Finally a shirt flew into the air, and the constable found himself struggling with someone he could not see at all. Some people tried to help him, but found themselves hit by blows that seemed to come from nowhere.</p>
    
    <p>In the end Jaffers was knocked <span class="highlight-vocab">unconscious<span class="vocab-tooltip">not awake and unaware of one's surroundings</span></span> as he made a last attempt to hold on to the unseen scientist.</p>
    
    <div class="vocabulary-note">
        <div class="word">unconscious</div>
        <div class="definition">not awake and unaware of one's surroundings</div>
    </div>
    
    <p>There were nervous, excited cries of "Hold him!" But this was easier said than done. Griffin had shaken himself free, and no one knew where to lay hands on him.</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. How did the invisible man first become visible?</div>
        <div class="comprehension-question">2. Why was Griffin wandering the streets?</div>
        <div class="comprehension-question">3. Why does Mrs Hall find the scientist eccentric?</div>
        <div class="comprehension-question">4. What curious episode occurs in the study?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load story content
    const storyContentDiv = document.getElementById('storyContent');
    if (storyContentDiv) {
        storyContentDiv.innerHTML = storyContent;
    }
    
    // Add event listeners to vocabulary terms
    document.querySelectorAll('.highlight-vocab').forEach(term => {
        term.addEventListener('click', function() {
            const word = this.textContent.split('\n')[0].trim();
            const definition = this.querySelector('.vocab-tooltip').textContent;
            
            if (window.narrator) {
                window.narrator.speak(`${word}: ${definition}`);
            }
        });
    });
    
    // Add read aloud button for story
    const storyBtn = document.createElement('button');
    storyBtn.className = 'interactive-btn read-part-btn';
    storyBtn.innerHTML = '🔊 Read Story Aloud';
    storyBtn.setAttribute('aria-label', 'Read story aloud');
    storyBtn.onclick = function() { readStoryAloud(); };
    
    // Add button container to story content if it doesn't exist
    if (storyContentDiv) {
        let buttonContainer = storyContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            storyContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(storyBtn);
    }
});

// Toggle Read Aloud function for any text
function toggleReadAloud() {
    // If we're in the story module, read the story
    if (document.getElementById('story').classList.contains('active')) {
        readStoryAloud();
    }
}

// Read story aloud function - using chunks for better performance
function readStoryAloud() {
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    // Enable auto-narration
    autoNarrationEnabled = true;
    narrationDisabledByUser = false;
    
    // Stop any ongoing narration first
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
    }
    
    // Extract plain text from the story content
    const storyContentDiv = document.getElementById('storyContent');
    if (!storyContentDiv) return;
    
    // Get all paragraphs and remove vocabulary notes and comprehension checks
    const paragraphs = storyContentDiv.querySelectorAll('p');
    
    // Filter out paragraphs inside vocabulary notes and comprehension checks
    const validParagraphs = Array.from(paragraphs).filter(p => {
        if (p.closest('.vocabulary-note') || p.closest('.comprehension-check')) {
            return false;
        }
        return true;
    });
    
    // Extract text from valid paragraphs
    const paragraphTexts = validParagraphs.map(p => {
        let text = p.textContent.trim();
        // Remove vocabulary tooltip content
        text = text.replace(/\s+/g, ' ');
        return text;
    }).filter(text => text.length > 0);
    
    // Create chunks of paragraphs (approximately 250-300 words per chunk)
    const textChunks = [];
    let currentChunk = "Footprints without Feet, by H.G. Wells. ";
    let wordCount = 0;
    
    paragraphTexts.forEach(paragraphText => {
        const paragraphWordCount = paragraphText.split(' ').length;
        
        if (wordCount + paragraphWordCount > 250) {
            // Add current chunk to array and start a new one
            textChunks.push(currentChunk);
            currentChunk = paragraphText;
            wordCount = paragraphWordCount;
        } else {
            // Add paragraph to current chunk
            currentChunk += " " + paragraphText;
            wordCount += paragraphWordCount;
        }
    });
    
    // Add the last chunk if there's anything left
    if (currentChunk) {
        textChunks.push(currentChunk);
    }
    
    // Read the text chunks sequentially
    readTextChunksSequentially(textChunks, 'story');
}

// Function to read a series of text chunks sequentially
function readTextChunksSequentially(textChunks, contentType) {
    if (!window.narrator || !window.narrator.enabled || textChunks.length === 0) return;
    
    // Show reading indicator
    const contentDiv = contentType === 'story' 
        ? document.getElementById('storyContent') 
        : null;
    
    if (!contentDiv) return;
    
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.id = `reading-indicator-${contentType}`;
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
    
    // Find button container or create one
    let buttonContainer = contentDiv.querySelector('.button-container');
    if (!buttonContainer) {
        buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        contentDiv.appendChild(buttonContainer);
    }
    
    buttonContainer.appendChild(readingIndicator);
    
    // Add stop button
    const stopButton = document.createElement('button');
    stopButton.className = 'interactive-btn stop-narration-btn';
    stopButton.innerHTML = '⏹️ Stop Reading';
    stopButton.onclick = stopNarration;
    readingIndicator.appendChild(stopButton);
    
    
    // Read chunks sequentially
    let currentChunkIndex = 0;
    
    function readNextChunk() {
        if (currentChunkIndex >= textChunks.length) {
            // All chunks read, remove indicator
            if (readingIndicator.parentNode) {
                readingIndicator.classList.add('fade-out');
                setTimeout(() => readingIndicator.remove(), 500);
            }
            return;
        }
        
        // Set up callback for when this chunk finishes
        window.narrator.onEndCallback = function() {
            currentChunkIndex++;
            // Short pause between chunks
            setTimeout(readNextChunk, 500);
        };
        
        // Read the current chunk
        window.narrator.speak(textChunks[currentChunkIndex]);
    }
    
    // Start reading the first chunk
    readNextChunk();
    
    // Set timeout for removing indicator if narration fails
    window.readingTimeout = setTimeout(() => {
        if (readingIndicator.parentNode) {
            readingIndicator.classList.add('fade-out');
            setTimeout(() => readingIndicator.remove(), 500);
        }
    }, 5 * 60 * 1000); // 5 minutes max
}

// Stop ongoing narration
function stopNarration() {
    if (window.narrator) {
        window.narrator.stop();
        
        // Disable auto-narration when user manually stops
        autoNarrationEnabled = false;
        narrationDisabledByUser = true;
        
        // Remove all reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Clear any timeouts
        if (window.readingTimeout && typeof clearTimeout === 'function') {
            clearTimeout(window.readingTimeout);
        }
    }
}

// Highlight vocabulary words in the text
function highlightVocabulary() {
    const vocabTerms = document.querySelectorAll('.highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the story content container
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

// Toggle print-friendly mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');
    
    // Show a message that print mode is toggled
    const isPrintMode = document.body.classList.contains('print-mode');
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = isPrintMode ? 
        'Print-friendly mode enabled. Use your browser\'s print function to print.' : 
        'Print-friendly mode disabled.';
    
    // Find the active content container
    let contentContainer;
    if (document.getElementById('story').classList.contains('active')) {
        contentContainer = document.getElementById('storyContent');
    }
    
    if (contentContainer) {
        contentContainer.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}
