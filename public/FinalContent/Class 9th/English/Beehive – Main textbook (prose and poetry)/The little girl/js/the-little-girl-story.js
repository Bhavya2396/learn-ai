/**
 * Story and poem content and functionality for The Little Girl
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>TO the little girl he was a <span class="highlight-vocab">figure<span class="vocab-tooltip">a person</span></span> to be feared and avoided. Every morning before going to work he came into her room and gave her a <span class="highlight-vocab">casual<span class="vocab-tooltip">not showing much care or interest</span></span> kiss, to which she responded with "Goodbye, Father". And oh, there was a <span class="highlight-vocab">glad<span class="vocab-tooltip">happy, pleased</span></span> sense of relief when she heard the noise of the carriage growing fainter and fainter down the long road!</p>

    <div class="vocabulary-note">
        <div class="word">figure</div>
        <div class="definition">a person</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">casual</div>
        <div class="definition">not showing much care or interest</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">glad</div>
        <div class="definition">happy, pleased</div>
    </div>
    
    <p>In the evening when he came home she stood near the staircase and heard his loud voice in the hall. "Bring my tea into the drawing-room... Hasn't the paper come yet? Mother, go and see if my paper's out there — and bring me my slippers."</p>
    
    <p>"Kezia," Mother would call to her, "if you're a good girl you can come down and take off father's boots."</p>
    
    <p>Slowly the girl would <span class="highlight-vocab">slip down<span class="vocab-tooltip">come down quietly and unwillingly</span></span> the stairs, more slowly still across the hall, and push open the drawing-room door.</p>
    
    <div class="vocabulary-note">
        <div class="word">slip down</div>
        <div class="definition">come down quietly and unwillingly</div>
    </div>
    
    <p>By that time he had his spectacles on and looked at her over them in a way that was <span class="highlight-vocab">terrifying<span class="vocab-tooltip">causing great fear</span></span> to the little girl.</p>
    
    <div class="vocabulary-note">
        <div class="word">terrifying</div>
        <div class="definition">causing great fear</div>
    </div>
    
    <p>"Well, Kezia, hurry up and pull off these boots and take them outside. Have you been a good girl today?"</p>
    
    <p>"I d-d-don't know, Father."</p>
    
    <p>"You d-d-don't know? If you stutter like that Mother will have to take you to the doctor."</p>
    
    <p>She never stuttered with other people — had quite <span class="highlight-vocab">given it up<span class="vocab-tooltip">stopped doing it</span></span> — but only with Father, because then she was trying so hard to say the words properly.</p>
    
    <div class="vocabulary-note">
        <div class="word">given it up</div>
        <div class="definition">stopped doing it</div>
    </div>
    
    <p>"What's the matter? What are you looking so <span class="highlight-vocab">wretched<span class="vocab-tooltip">unhappy</span></span> about? Mother, I wish you taught this child not to appear <span class="highlight-vocab">on the brink of suicide<span class="vocab-tooltip">about to commit suicide</span></span>... Here, Kezia, carry my teacup back to the table carefully."</p>
    
    <div class="vocabulary-note">
        <div class="word">wretched</div>
        <div class="definition">unhappy</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">on the brink of suicide</div>
        <div class="definition">about to commit suicide</div>
    </div>
    
    <p>He was so big — his hands and his neck, especially his mouth when he yawned. Thinking about him alone was like thinking about a giant.</p>
    
    <p>On Sunday afternoons Grandmother sent her down to the drawing-room to have a "nice talk with Father and Mother". But the little girl always found Mother reading and Father stretched out on the sofa, his handkerchief on his face, his feet on one of the best cushions, sleeping soundly and snoring.</p>
    
    <p>She sat on a stool, <span class="highlight-vocab">gravely<span class="vocab-tooltip">in a serious manner</span></span> watched him until he woke and stretched, and asked the time — then looked at her.</p>
    
    <div class="vocabulary-note">
        <div class="word">gravely</div>
        <div class="definition">in a serious manner</div>
    </div>
    
    <p>"Don't stare so, Kezia. You look like a little brown owl."</p>
    
    <p>One day, when she was kept indoors with a cold, her grandmother told her that father's birthday was next week, and suggested she should make him a pin-cushion for a gift out of a beautiful piece of yellow silk.</p>
    
    <p><span class="highlight-vocab">Laboriously<span class="vocab-tooltip">with a lot of effort or difficulty</span></span>, with a double cotton, the little girl stitched three sides. But what to fill it with? That was the question. The grandmother was out in the garden, and she <span class="highlight-vocab">wandered into<span class="vocab-tooltip">went into, by chance</span></span> Mother's bedroom to look for <span class="highlight-vocab">scraps<span class="vocab-tooltip">small pieces of cloth or paper that are not needed</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">laboriously</div>
        <div class="definition">with a lot of effort or difficulty</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">wandered into</div>
        <div class="definition">went into, by chance</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">scraps</div>
        <div class="definition">small pieces of cloth or paper that are not needed</div>
    </div>
    
    <p>On the bed-table she discovered a great many sheets of fine paper, gathered them up, tore them into tiny pieces, and stuffed her case, then sewed up the fourth side.</p>
    
    <p>That night there was a <span class="highlight-vocab">hue and cry<span class="vocab-tooltip">angry protest</span></span> in the house. Father's great speech for the Port Authority had been lost. Rooms were searched; servants questioned. Finally Mother came into Kezia's room.</p>
    
    <div class="vocabulary-note">
        <div class="word">hue and cry</div>
        <div class="definition">angry protest</div>
    </div>
    
    <p>"Kezia, I suppose you didn't see some papers on a table in our room?"</p>
    
    <p>"Oh yes," she said, "I tore them up for my surprise."</p>
    
    <p>"What!" screamed Mother. "Come straight down to the dining-room this instant."</p>
    
    <p>And she was dragged down to where Father was pacing to and fro, hands behind his back.</p>
    
    <p>"Well?" he said sharply.</p>
    
    <p>Mother explained.</p>
    
    <p>He stopped and stared at the child.</p>
    
    <p>"Did you do that?"</p>
    
    <p>"N-n-no", she whispered.</p>
    
    <p>"Mother, go up to her room and fetch down the damned thing — see that the child's put to bed this instant."</p>
    
    <p>Crying too much to explain, she lay in the shadowed room watching the evening light make a sad little pattern on the floor.</p>
    
    <p>Then Father came into the room with a ruler in his hands.</p>
    
    <p>"I am going to beat you for this," he said.</p>
    
    <p>"Oh, no, no", she screamed, hiding under the bedclothes.</p>
    
    <p>He pulled them aside.</p>
    
    <p>"Sit up," he ordered, "and hold out your hands. You must be taught once and for all not to touch what does not belong to you."</p>
    
    <p>"But it was for your b-b-birthday."</p>
    
    <p>Down came the ruler on her little, pink palms.</p>
    
    <p>Hours later, when Grandmother had wrapped her in a shawl and rocked her in the rocking-chair, the child clung to her soft body.</p>
    
    <p>"What did God make fathers for?" she sobbed.</p>
    
    <p>"Here's a clean hanky, darling. Blow your nose. Go to sleep, pet; you'll forget all about it in the morning. I tried to explain to Father but he was too upset to listen tonight."</p>
    
    <p>But the child never forgot. Next time she saw him she quickly put both hands behind her back and a red colour flew into her cheeks.</p>
    
    <p>The Macdonalds lived next door. They had five children. Looking through a gap in the fence the little girl saw them playing <span class="highlight-vocab">'tag'<span class="vocab-tooltip">a children's game of catching one another</span></span> in the evening. The father with the baby, Mao, on his shoulders, two little girls hanging on to his coat pockets ran round and round the flower-beds, shaking with laughter. Once she saw the boys turn the hose on him—and he tried to catch them laughing all the time.</p>
    
    <div class="vocabulary-note">
        <div class="word">tag</div>
        <div class="definition">a children's game of catching one another</div>
    </div>
    
    <p>Then it was she decided there were different sorts of fathers.</p>
    
    <p>Suddenly, one day, Mother became ill, and she and Grandmother went to hospital.</p>
    
    <p>The little girl was left alone in the house with Alice, the cook. That was all right in the daytime, but while Alice was putting her to bed she grew suddenly afraid.</p>
    
    <p>"What'll I do if I have a <span class="highlight-vocab">nightmare<span class="vocab-tooltip">a bad dream</span></span>?" she asked. "I often have nightmares and then Grannie takes me into her bed—I can't stay in the dark—it all gets 'whispery'…"</p>
    
    <div class="vocabulary-note">
        <div class="word">nightmare</div>
        <div class="definition">a bad dream</div>
    </div>
    
    <p>"You just go to sleep, child," said Alice, pulling off her socks, "and don't you scream and wake your poor Pa."</p>
    
    <p>But the same old nightmare came — the butcher with a knife and a rope, who came nearer and nearer, smiling that dreadful smile, while she could not move, could only stand still, crying out, "Grandma! Grandma!" She woke shivering to see Father beside her bed, a candle in his hand.</p>
    
    <p>"What's the matter?" he said.</p>
    
    <p>"Oh, a butcher — a knife — I want Grannie." He blew out the candle, bent down and caught up the child in his arms, carrying her along the passage to the big bedroom. A newspaper was on the bed. He put away the paper, then carefully <span class="highlight-vocab">tucked up<span class="vocab-tooltip">covered up nicely in bed</span></span> the child. He lay down beside her. Half asleep still, still with the butcher's smile all about her it seemed, she <span class="highlight-vocab">snuggled<span class="vocab-tooltip">moved into a warm, comfortable position, close to another person</span></span> her head under his arm, held tightly to his shirt.</p>
    
    <div class="vocabulary-note">
        <div class="word">tucked up</div>
        <div class="definition">covered up nicely in bed</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">snuggled</div>
        <div class="definition">moved into a warm, comfortable position, close to another person</div>
    </div>
    
    <p>Then the dark did not matter; she lay still.</p>
    
    <p>"Here, rub your feet against my legs and get them warm," said Father.</p>
    
    <p>Tired out, he slept before the little girl. A funny feeling came over her. Poor Father, not so big, after all — and with no one to look after him. He was harder than Grandmother, but it was a nice hardness. And every day he had to work and was too tired to be a Mr Macdonald… She had torn up all his beautiful writing… She stirred suddenly, and sighed.</p>
    
    <p>"What's the matter?" asked her father. "Another dream?"</p>
    
    <p>"Oh," said the little girl, "my head's on your heart. I can hear it going. What a big heart you've got, Father dear."</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why was Kezia afraid of her father?</div>
        <div class="comprehension-question">2. Who were the people in Kezia's family?</div>
        <div class="comprehension-question">3. How did Kezia's grandmother encourage her to get to know her father better?</div>
        <div class="comprehension-question">4. How does Kezia begin to see her father as a human being who needs her sympathy?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">RAIN ON THE ROOF</p>
        <p class="poem-author">by Coates Kinney</p>
        
        <div class="poem-stanza">
            <p class="poem-line">When the <span class="highlight-vocab">humid<span class="vocab-tooltip">damp, moist</span></span> shadows hover</p>
            <p class="poem-line">Over all the starry <span class="highlight-vocab">spheres<span class="vocab-tooltip">celestial bodies, orbs</span></span></p>
            <p class="poem-line">And the <span class="highlight-vocab">melancholy<span class="vocab-tooltip">sad, gloomy</span></span> darkness</p>
            <p class="poem-line">Gently weeps in rainy tears,</p>
            <p class="poem-line">What a <span class="highlight-vocab">bliss<span class="vocab-tooltip">great joy, happiness</span></span> to press the pillow</p>
            <p class="poem-line">Of a cottage-chamber bed</p>
            <p class="poem-line">And lie listening to the <span class="highlight-vocab">patter<span class="vocab-tooltip">light, repeated tapping sound</span></span></p>
            <p class="poem-line">Of the soft rain overhead!</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Every <span class="highlight-vocab">tinkle<span class="vocab-tooltip">short, light ringing sounds</span></span> on the <span class="highlight-vocab">shingles<span class="vocab-tooltip">rectangular wooden tiles used on roofs</span></span></p>
            <p class="poem-line">Has an echo in the heart;</p>
            <p class="poem-line">And a thousand dreamy fancies</p>
            <p class="poem-line">Into busy being start,</p>
            <p class="poem-line">And a thousand recollections</p>
            <p class="poem-line">Weave their air-threads into <span class="highlight-vocab">woof<span class="vocab-tooltip">weft, i.e. the threads woven across the loom</span></span>,</p>
            <p class="poem-line">As I listen to the patter</p>
            <p class="poem-line">Of the rain upon the roof.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Now in memory comes my mother,</p>
            <p class="poem-line">As she used in years <span class="highlight-vocab">agone<span class="vocab-tooltip">ago, gone by</span></span>,</p>
            <p class="poem-line">To regard the darling dreamers</p>
            <p class="poem-line"><span class="highlight-vocab">Ere<span class="vocab-tooltip">old poetic word for 'before'</span></span> she left them till the dawn:</p>
            <p class="poem-line">O! I feel her fond look on me</p>
            <p class="poem-line">As I <span class="highlight-vocab">list<span class="vocab-tooltip">old poetic word for 'listen'</span></span> to this <span class="highlight-vocab">refrain<span class="vocab-tooltip">a repeated part of a song or a poem; here, the sound of the rain</span></span></p>
            <p class="poem-line">Which is played upon the shingles</p>
            <p class="poem-line">By the patter of the rain.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">humid</div>
        <div class="definition">damp, moist</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">spheres</div>
        <div class="definition">celestial bodies, orbs</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">melancholy</div>
        <div class="definition">sad, gloomy</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">bliss</div>
        <div class="definition">great joy, happiness</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">patter</div>
        <div class="definition">light, repeated tapping sound</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">tinkle</div>
        <div class="definition">short, light ringing sounds</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">shingles</div>
        <div class="definition">rectangular wooden tiles used on roofs</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">woof</div>
        <div class="definition">weft, i.e. the threads woven across the loom</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">agone</div>
        <div class="definition">ago, gone by</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ere</div>
        <div class="definition">old poetic word for 'before'</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">list</div>
        <div class="definition">old poetic word for 'listen'</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">refrain</div>
        <div class="definition">a repeated part of a song or a poem; here, the sound of the rain</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What does the poet like to do when it rains?</div>
        <div class="comprehension-question">2. What is the single major memory that comes to the poet?</div>
        <div class="comprehension-question">3. Who are the "darling dreamers" the poet refers to?</div>
        <div class="comprehension-question">4. Is the poet now a child? Is his mother still alive?</div>
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
    let currentChunk = "The Little Girl, by Katherine Mansfield. ";
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
