/**
 * Story and poem content and functionality for The Snake and the Mirror
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>"HAS a snake ever coiled itself round any part of your body? A <span class="highlight-vocab">full-blooded<span class="vocab-tooltip">fully developed, powerful</span></span> cobra?" All of us fell silent. The question came from the <span class="highlight-vocab">homeopath<span class="vocab-tooltip">a doctor who treats patients using homeopathy</span></span>. The topic came up when we were discussing snakes. We listened attentively as the doctor continued with his tale.</p>
    
    <div class="vocabulary-note">
        <div class="word">full-blooded</div>
        <div class="definition">fully developed, powerful</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">homeopath</div>
        <div class="definition">a doctor who treats patients using homeopathy</div>
    </div>
    
    <p>It was a hot summer night; about ten o'clock. I had my meal at the restaurant and returned to my room. I heard a noise from above as I opened the door. The sound was a familiar one. One could say that the rats and I shared the room. I took out my box of matches and lighted the kerosene lamp on the table.</p>
    
    <p>The house was not electrified; it was a small rented room. I had just set up medical practice and my earnings were <span class="highlight-vocab">meagre<span class="vocab-tooltip">small in quantity</span></span>. I had about sixty rupees in my suitcase. Along with some shirts and dhotis, I also possessed one solitary black coat which I was then wearing.</p>
    
    <div class="vocabulary-note">
        <div class="word">meagre</div>
        <div class="definition">small in quantity</div>
    </div>
    
    <p>I took off my black coat, white shirt and not-so-white vest and hung them up. I opened the two windows in the room. It was an outer room with one wall facing the open yard. It had a tiled roof with long supporting <span class="highlight-vocab">gables<span class="vocab-tooltip">upper part of a wall below a sloping roof</span></span> that rested on the beam over the wall. There was no ceiling. There was a regular traffic of rats to and from the beam. I made my bed and pulled it close to the wall. I lay down but I could not sleep. I got up and went out to the veranda for a little air, but the wind god seemed to have taken time off.</p>
    
    <div class="vocabulary-note">
        <div class="word">gables</div>
        <div class="definition">upper part of a wall below a sloping roof</div>
    </div>
    
    <p>I went back into the room and sat down on the chair. I opened the box beneath the table and took out a book, the <span class="highlight-vocab">Materia Medica<span class="vocab-tooltip">a reference book for medical remedies</span></span>. I opened it at the table on which stood the lamp and a large mirror; a small comb lay beside the mirror.</p>
    <p>One feels tempted to look into a mirror when it is near one. I took a look. In those days I was a great admirer of beauty and I believed in making myself look handsome. I was unmarried and I was a doctor. I felt I had to make my presence felt. I picked up the comb and ran it through my hair and adjusted the parting so that it looked straight and neat.</p>
    <p>Again I heard that sound from above.</p>
    
    <div class="vocabulary-note">
        <div class="word">Materia Medica</div>
        <div class="definition">a reference book for medical remedies</div>
    </div>
    
    <p>I took a close look at my face in the mirror. I made an important decision — I would shave daily and grow a thin moustache to look more handsome. I was after all a bachelor, and a doctor!</p>
    <p>I looked into the mirror and smiled. It was an attractive smile. I made another <span class="highlight-vocab">earth-shaking<span class="vocab-tooltip">very important, ground-breaking</span></span> decision. I would always keep that attractive smile on my face . . . to look more handsome. I was after all a bachelor, and a doctor too on top of it!</p>
    <p>Again came that noise from above.</p>
    
    <div class="vocabulary-note">
        <div class="word">earth-shaking</div>
        <div class="definition">very important, ground-breaking</div>
    </div>
    
    <p>I got up, paced up and down the room. Then another lovely thought struck me. I would marry.</p>
    <p>I would get married to a woman doctor who had plenty of money and a good medical practice. She had to be fat; for a valid reason. If I made some silly mistake and needed to run away she should not be able to run after me and catch me!</p>
    <p>With such thoughts in my mind I resumed my seat in the chair in front of the table. There were no more sounds from above. Suddenly there came a dull <span class="highlight-vocab">thud<span class="vocab-tooltip">a dull sound</span></span> as if a rubber tube had fallen to the ground ... surely nothing to worry about. Even so I thought I would turn around and take a look. No sooner had I turned than a fat snake wriggled over the back of the chair and landed on my shoulder. The snake's landing on me and my turning were simultaneous.</p>
    
    <div class="vocabulary-note">
        <div class="word">thud</div>
        <div class="definition">a dull sound</div>
    </div>
    
    <p>I didn't jump. I didn't tremble. I didn't cry out. There was no time to do any such thing. The snake <span class="highlight-vocab">slithered<span class="vocab-tooltip">moved smoothly like a snake</span></span> along my shoulder and coiled around my left arm above the elbow. The hood was spread out and its head was hardly three or four inches from my face!</p>
    <p>It would not be correct to say merely that I sat there holding my breath. I was turned to stone. But my mind was very active. The door opened into darkness. The room was surrounded by darkness. In the light of the lamp I sat there like a stone image in the flesh.</p>
    
    <div class="vocabulary-note">
        <div class="word">slithered</div>
        <div class="definition">moved smoothly like a snake</div>
    </div>
    
    <p>I felt then the great presence of the creator of this world and this universe. God was there. Suppose I said something and he did not like it . . .</p>
    <p>I tried in my imagination to write in bright letters outside my little heart the words, 'O God'.</p>
    <p>There was some pain in my left arm. It was as if a thick <span class="highlight-vocab">leaden<span class="vocab-tooltip">made of lead, a heavy metal</span></span> rod — no, a rod made of molten fire — was slowly but powerfully crushing my arm. The arm was beginning to be drained of all strength. What could I do?</p>
    
    <div class="vocabulary-note">
        <div class="word">leaden</div>
        <div class="definition">made of lead, a heavy metal</div>
    </div>
    
    <p>At my slightest movement the snake would strike me! Death lurked four inches away. Suppose it struck, what was the medicine I had to take? There were no medicines in the room. I was but a poor, foolish and stupid doctor. I forgot my danger and smiled feebly at myself.</p>
    <p>It seemed as if God appreciated that. The snake turned its head. It looked into the mirror and saw its reflection. I do not claim that it was the first snake that had ever looked into a mirror. But it was certain that the snake was looking into the mirror. Was it admiring its own beauty? Was it trying to make an important decision about growing a moustache or using eye shadow and <span class="highlight-vocab">mascara<span class="vocab-tooltip">a cosmetic used to darken eyelashes</span></span> or wearing a <span class="highlight-vocab">vermilion<span class="vocab-tooltip">bright red pigment</span></span> spot on its forehead?</p>
    
    <div class="vocabulary-note">
        <div class="word">mascara</div>
        <div class="definition">a cosmetic used to darken eyelashes</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">vermilion</div>
        <div class="definition">bright red pigment</div>
    </div>
    
    <p>I did not know anything for certain. What sex was this snake, was it male or female? I will never know; for the snake unwound itself from my arm and slowly slithered into my lap. From there it crept onto the table and moved towards the mirror. Perhaps it wanted to enjoy its reflection at closer quarters.</p>
    <p>I was no mere image cut in <span class="highlight-vocab">granite<span class="vocab-tooltip">a hard, durable stone</span></span>. I was suddenly a man of flesh and blood. Still holding my breath I got up from the chair. I quietly went out through the door into the veranda. From there I leapt into the yard and ran for all I was worth.</p>
    
    <div class="vocabulary-note">
        <div class="word">granite</div>
        <div class="definition">a hard, durable stone</div>
    </div>
    
    <p>"Phew!" Each of us heaved a sigh of relief. Somebody asked, "Doctor, is your wife very fat?"</p>
    
    <p>"No," the doctor said. "God willed otherwise. My life companion is a thin <span class="highlight-vocab">reedy<span class="vocab-tooltip">thin and tall like a reed plant</span></span> person with the gift of a <span class="highlight-vocab">sprinter<span class="vocab-tooltip">someone who can run fast for short distances</span></span>."</p>
    <p>Someone else asked, "Doctor, when you ran did the snake follow you?"</p>
    
    <div class="vocabulary-note">
        <div class="word">reedy</div>
        <div class="definition">thin and tall like a reed plant</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">sprinter</div>
        <div class="definition">someone who can run fast for short distances</div>
    </div>
    
    <p>The doctor replied, "I ran and ran till I reached a friend's house. Immediately I <span class="highlight-vocab">smeared<span class="vocab-tooltip">spread thickly</span></span> oil all over myself and took a bath. I changed into fresh clothes. The next morning at about eight-thirty I took my friend and one or two others to my room to move my things from there. But we found we had little to carry. Some thief had removed most of my things. The room had been cleaned out! But not really, the thief had left behind one thing as a final insult!"</p>
    
    <div class="vocabulary-note">
        <div class="word">smeared</div>
        <div class="definition">spread thickly</div>
    </div>
    
    <p>"What was that?" I asked.</p>
    <p>The doctor said, "My vest, the dirty one. The fellow had such a sense of cleanliness...! The <span class="highlight-vocab">rascal<span class="vocab-tooltip">dishonest or mischievous person</span></span> could have taken it and used it after washing it with soap and water."</p>
    
    <div class="vocabulary-note">
        <div class="word">rascal</div>
        <div class="definition">dishonest or mischievous person</div>
    </div>
    
    <p>"Did you see the snake the next day, doctor?"</p>
    <p>The doctor laughed, "I've never seen it since. It was a snake which was <span class="highlight-vocab">taken with<span class="vocab-tooltip">attracted by</span></span> its own beauty!"</p>
    
    <div class="vocabulary-note">
        <div class="word">taken with</div>
        <div class="definition">attracted by</div>
    </div>
    
    <p class="story-author">VAIKOM MUHAMMAD BASHEER<br>[ translated from the Malayalam by V. Abdulla]</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Where did the doctor live and why?</div>
        <div class="comprehension-question">2. What were the doctor's thoughts when he looked at himself in the mirror?</div>
        <div class="comprehension-question">3. What happened when the doctor was admiring himself in the mirror?</div>
        <div class="comprehension-question">4. What was the doctor's reaction when the snake landed on his shoulder?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">A LEGEND OF THE NORTHLAND</p>
        <p class="poem-author">by Phoebe Cary</p>
        
        <div class="poem-stanza">
            <p class="poem-line">Away, away in the <span class="highlight-vocab">Northland<span class="vocab-tooltip">a land in the north</span></span>,</p>
            <p class="poem-line">Where the hours of the day are few,</p>
            <p class="poem-line">And the nights are so long in winter</p>
            <p class="poem-line">That they cannot sleep them through;</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Where they <span class="highlight-vocab">harness<span class="vocab-tooltip">fasten, connect so as to control movement</span></span> the swift reindeer</p>
            <p class="poem-line">To the sledges, when it snows;</p>
            <p class="poem-line">And the children look like bear's cubs</p>
            <p class="poem-line">In their funny, furry clothes:</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">They tell them a curious story —</p>
            <p class="poem-line">I don't believe 'tis true;</p>
            <p class="poem-line">And yet you may learn a lesson</p>
            <p class="poem-line">If I tell the tale to you.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Once, when the good Saint Peter</p>
            <p class="poem-line">Lived in the world below,</p>
            <p class="poem-line">And walked about it, preaching,</p>
            <p class="poem-line">Just as he did, you know,</p>
        </div>

        <div class="poem-stanza">
            <p class="poem-line">He came to the door of a cottage,</p>
            <p class="poem-line">In travelling round the earth,</p>
            <p class="poem-line">Where a little woman was making cakes,</p>
            <p class="poem-line">And baking them on the <span class="highlight-vocab">hearth<span class="vocab-tooltip">floor of a fireplace</span></span>;</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">And being <span class="highlight-vocab">faint<span class="vocab-tooltip">weak from hunger</span></span> with fasting,</p>
            <p class="poem-line">For the day was almost done,</p>
            <p class="poem-line">He asked her, from her store of cakes,</p>
            <p class="poem-line">To give him a single one.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">So she made a very little cake,</p>
            <p class="poem-line">But as it baking lay,</p>
            <p class="poem-line">She looked at it, and thought it seemed</p>
            <p class="poem-line">Too large to give away.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Therefore she <span class="highlight-vocab">kneaded<span class="vocab-tooltip">worked and pressed with hands</span></span> another,</p>
            <p class="poem-line">And still a smaller one;</p>
            <p class="poem-line">But it looked, when she turned it over,</p>
            <p class="poem-line">As large as the first had done.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Then she took a tiny <span class="highlight-vocab">scrap<span class="vocab-tooltip">small piece</span></span> of dough,</p>
            <p class="poem-line">And rolled and rolled it flat;</p>
            <p class="poem-line">And baked it thin as a <span class="highlight-vocab">wafer<span class="vocab-tooltip">thin, light, crisp biscuit</span></span> —</p>
            <p class="poem-line">But she couldn't part with that.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">For she said, "My cakes that seem too small</p>
            <p class="poem-line">When I eat of them myself</p>
            <p class="poem-line">Are yet too large to give away."</p>
            <p class="poem-line">So she put them on the shelf.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Then good Saint Peter grew angry,</p>
            <p class="poem-line">For he was hungry and faint;</p>
            <p class="poem-line">And surely such a woman</p>
            <p class="poem-line">Was enough to <span class="highlight-vocab">provoke<span class="vocab-tooltip">make angry</span></span> a saint.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">And he said, "You are far too selfish</p>
            <p class="poem-line">To dwell in a human form,</p>
            <p class="poem-line">To have both food and shelter,</p>
            <p class="poem-line">And fire to keep you warm.</p>
        </div>

        <div class="poem-stanza">
            <p class="poem-line">Now, you shall build as the birds do,</p>
            <p class="poem-line">And shall get your <span class="highlight-vocab">scanty<span class="vocab-tooltip">barely sufficient</span></span> food</p>
            <p class="poem-line">By boring, and boring, and boring,</p>
            <p class="poem-line">All day in the hard, dry wood."</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Then up she went through the chimney,</p>
            <p class="poem-line">Never speaking a word,</p>
            <p class="poem-line">And out of the top flew a woodpecker,</p>
            <p class="poem-line">For she was changed to a bird.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">She had a <span class="highlight-vocab">scarlet<span class="vocab-tooltip">bright red</span></span> cap on her head,</p>
            <p class="poem-line">And that was left the same;</p>
            <p class="poem-line">But all the rest of her clothes were burned</p>
            <p class="poem-line">Black as a coal in the flame.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">And every country schoolboy</p>
            <p class="poem-line">Has seen her in the wood,</p>
            <p class="poem-line">Where she lives in the trees till this very day,</p>
            <p class="poem-line">Boring and boring for food.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">Northland</div>
        <div class="definition">a land in the north</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">harness</div>
        <div class="definition">fasten, connect so as to control movement</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">hearth</div>
        <div class="definition">floor of a fireplace</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">faint</div>
        <div class="definition">weak from hunger</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">kneaded</div>
        <div class="definition">worked and pressed with hands</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">scrap</div>
        <div class="definition">small piece</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">wafer</div>
        <div class="definition">thin, light, crisp biscuit</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">provoke</div>
        <div class="definition">make angry</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">scanty</div>
        <div class="definition">barely sufficient</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">scarlet</div>
        <div class="definition">bright red</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Which country or countries do you think "the Northland" refers to?</div>
        <div class="comprehension-question">2. What did Saint Peter ask the old lady for?</div>
        <div class="comprehension-question">3. How did he punish her for being selfish?</div>
        <div class="comprehension-question">4. How does the woodpecker get her food?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load story content
    const storyContentDiv = document.getElementById('storyContent');
    if (storyContentDiv) {
        storyContentDiv.innerHTML = storyContent;
    }
    
    // Load poem content
    const poemContentDiv = document.getElementById('poemContent');
    if (poemContentDiv) {
        poemContentDiv.innerHTML = poemContent;
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
    
    // Add read aloud button for poem
    const poemBtn = document.createElement('button');
    poemBtn.className = 'interactive-btn read-part-btn';
    poemBtn.innerHTML = '🔊 Read Poem Aloud';
    poemBtn.setAttribute('aria-label', 'Read poem aloud');
    poemBtn.onclick = function() { readPoemAloud(); };
    
    // Add button container to poem content if it doesn't exist
    if (poemContentDiv) {
        let buttonContainer = poemContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            poemContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(poemBtn);
    }
});

// Toggle Read Aloud function for any text
function toggleReadAloud() {
    // If we're in the story module, read the story
    if (document.getElementById('story').classList.contains('active')) {
        readStoryAloud();
    }
    // If we're in the poem module, read the poem
    else if (document.getElementById('poem').classList.contains('active')) {
        readPoemAloud();
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
    let currentChunk = "The Snake and the Mirror, by Vaikom Muhammad Basheer. ";
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

// Read poem aloud function - using a simpler approach since poems are shorter
function readPoemAloud() {
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
    
    // Extract plain text from the poem content
    const poemContentDiv = document.getElementById('poemContent');
    if (!poemContentDiv) return;
    
    // Get the poem title and author
    const poemTitle = poemContentDiv.querySelector('.poem-title').textContent;
    const poemAuthor = poemContentDiv.querySelector('.poem-author').textContent;
    
    // Get all poem lines
    const poemLines = poemContentDiv.querySelectorAll('.poem-line');
    
    // Extract text from poem lines
    const poemText = Array.from(poemLines)
        .map(line => {
            let text = line.textContent.trim();
            // Remove vocabulary tooltip content
            text = text.replace(/\s+/g, ' ');
            return text;
        })
        .filter(text => text.length > 0)
        .join('\n');
    
    // Full poem text for narration - poems are usually short enough to read in one go
    const fullText = `${poemTitle}, ${poemAuthor}.\n\n${poemText}`;
    
    // Read the poem in one go
    readTextChunksSequentially([fullText], 'poem');
}

// Function to read a series of text chunks sequentially
function readTextChunksSequentially(textChunks, contentType) {
    if (!window.narrator || !window.narrator.enabled || textChunks.length === 0) return;
    
    // Show reading indicator
    const contentDiv = contentType === 'story' 
        ? document.getElementById('storyContent') 
        : document.getElementById('poemContent');
    
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
        
        // Update progress indicator
        // progressIndicator.textContent = `Chunk ${currentChunkIndex + 1}/${textChunks.length}`;
        
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

// Highlight poem vocabulary words
function highlightPoemVocabulary() {
    const vocabTerms = document.querySelectorAll('#poemContent .highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the poem content container
    const poemContent = document.getElementById('poemContent');
    if (poemContent) {
        poemContent.appendChild(feedbackMsg);
        
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
    } else if (document.getElementById('poem').classList.contains('active')) {
        contentContainer = document.getElementById('poemContent');
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
