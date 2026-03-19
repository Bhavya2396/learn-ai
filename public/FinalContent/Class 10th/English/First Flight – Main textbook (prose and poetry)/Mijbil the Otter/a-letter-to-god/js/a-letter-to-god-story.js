/**
 * Story and poem content and functionality for A Letter to God
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>THE house — the only one in the entire valley — sat on the <span class="highlight-vocab">crest<span class="vocab-tooltip">top of a hill</span></span> of a low hill. From this height one could see the river and the field of <span class="highlight-vocab">ripe<span class="vocab-tooltip">fully grown and ready to be harvested</span></span> corn dotted with the flowers that always promised a good harvest. The only thing the earth needed was a <span class="highlight-vocab">downpour<span class="vocab-tooltip">heavy rain</span></span> or at least a shower. Throughout the morning Lencho — who knew his fields <span class="highlight-vocab">intimately<span class="vocab-tooltip">very closely and thoroughly</span></span> — had done nothing else but see the sky towards the north-east.</p>
    
    <div class="vocabulary-note">
        <div class="word">crest</div>
        <div class="definition">top of a hill</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ripe</div>
        <div class="definition">fully grown and ready to be harvested</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">downpour</div>
        <div class="definition">heavy rain</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">intimately</div>
        <div class="definition">very closely and thoroughly</div>
    </div>
    
    <p>"Now we're really going to get some water, woman." The woman who was preparing supper, replied, "Yes, God willing". The older boys were working in the field, while the smaller ones were playing near the house until the woman called to them all, "Come for dinner". It was during the meal that, just as Lencho had predicted, big drops of rain began to fall. In the north-east huge mountains of clouds could be seen approaching. The air was fresh and sweet. The man went out for no other reason than to have the pleasure of feeling the rain on his body, and when he returned he exclaimed, ''These aren't raindrops falling from the sky, they are new coins. The big drops are ten cent pieces and the little ones are fives.''</p>
    
    <p>With a <span class="highlight-vocab">satisfied<span class="vocab-tooltip">pleased or content</span></span> expression he regarded the field of ripe corn with its flowers, <span class="highlight-vocab">draped<span class="vocab-tooltip">covered (with cloth)</span></span> in a curtain of rain. But suddenly a strong wind began to blow and along with the rain very large hailstones began to fall. These truly did resemble new silver coins. The boys, exposing themselves to the rain, ran out to collect the frozen pearls.</p>
    
    <div class="vocabulary-note">
        <div class="word">satisfied</div>
        <div class="definition">pleased or content</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">draped</div>
        <div class="definition">covered (with cloth)</div>
    </div>
    
    <p>''It's really getting bad now,'' exclaimed the man. "I hope it passes quickly." It did not pass quickly. For an hour the hail rained on the house, the garden, the hillside, the cornfield, on the whole valley. The field was white, as if covered with salt. Not a leaf remained on the trees. The corn was totally destroyed. The flowers were gone from the plants. Lencho's soul was filled with sadness. When the storm had passed, he stood in the middle of the field and said to his sons, "A <span class="highlight-vocab">plague<span class="vocab-tooltip">a large number of insects or animals that destroy crops</span></span> of <span class="highlight-vocab">locusts<span class="vocab-tooltip">insects which fly in big swarms (groups) and destroy crops</span></span> would have left more than this. The hail has left nothing. This year we will have no corn."</p>
    
    <div class="vocabulary-note">
        <div class="word">plague</div>
        <div class="definition">a large number of insects or animals that destroy crops</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">locusts</div>
        <div class="definition">insects which fly in big swarms (groups) and destroy crops</div>
    </div>
    
    <p>That night was a sorrowful one.</p>
    
    <p>"All our work, for nothing."</p>
    
    <p>''There's no one who can help us."</p>
    
    <p>"We'll all go hungry this year."</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What did Lencho hope for?</div>
        <div class="comprehension-question">2. Why did Lencho say the raindrops were like 'new coins'?</div>
        <div class="comprehension-question">3. How did the rain change? What happened to Lencho's fields?</div>
        <div class="comprehension-question">4. What were Lencho's feelings when the hail stopped?</div>
    </div>
    
    <p>But in the hearts of all who lived in that solitary house in the middle of the valley, there was a single hope: help from God.</p>
    
    <p>"Don't be so upset, even though this seems like a total loss. Remember, no one dies of hunger."</p>
    
    <p>"That's what they say: no one dies of hunger."</p>
    
    <p>All through the night, Lencho thought only of his one hope: the help of God, whose eyes, as he had been instructed, see everything, even what is deep in one's <span class="highlight-vocab">conscience<span class="vocab-tooltip">inner sense of right and wrong</span></span>. Lencho was an <span class="highlight-vocab">ox of a man<span class="vocab-tooltip">a strong, hardworking man</span></span>, working like an animal in the fields, but still he knew how to write. The following Sunday, at daybreak, he began to write a letter which he himself would carry to town and place in the mail. It was nothing less than a letter to God.</p>
    
    <div class="vocabulary-note">
        <div class="word">conscience</div>
        <div class="definition">inner sense of right and wrong</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ox of a man</div>
        <div class="definition">a strong, hardworking man</div>
    </div>
    
    <p>"God," he wrote, "if you don't help me, my family and I will go hungry this year. I need a hundred <span class="highlight-vocab">pesos<span class="vocab-tooltip">currency of several Latin American countries</span></span> in order to sow my field again and to live until the crop comes, because the hailstorm... ." He wrote 'To God' on the envelope, put the letter inside and, still troubled, went to town. At the post office, he placed a stamp on the letter and dropped it into the mailbox.</p>
    
    <div class="vocabulary-note">
        <div class="word">pesos</div>
        <div class="definition">currency of several Latin American countries</div>
    </div>
    
    <p>One of the employees, who was a postman and also helped at the post office, went to his boss laughing heartily and showed him the letter to God. Never in his career as a postman had he known that address. The postmaster — a fat, <span class="highlight-vocab">amiable<span class="vocab-tooltip">friendly and pleasant</span></span> fellow — also broke out laughing, but almost immediately he turned serious and, tapping the letter on his desk, commented, "What faith! I wish I had the faith of the man who wrote this letter. Starting up a correspondence with God!"</p>
    
    <div class="vocabulary-note">
        <div class="word">amiable</div>
        <div class="definition">friendly and pleasant</div>
    </div>
    
    <p>So, in order not to shake the writer's faith in God, the postmaster came up with an idea: answer the letter. But when he opened it, it was evident that to answer it he needed something more than goodwill, ink and paper. But he stuck to his <span class="highlight-vocab">resolution<span class="vocab-tooltip">firm decision</span></span>: he asked for money from his employees, he himself gave part of his salary, and several friends of his were <span class="highlight-vocab">obliged<span class="vocab-tooltip">made to feel it was their duty</span></span> to give something 'for an act of charity'.</p>
    
    <div class="vocabulary-note">
        <div class="word">resolution</div>
        <div class="definition">firm decision</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">obliged</div>
        <div class="definition">made to feel it was their duty</div>
    </div>
    
    <p>It was impossible for him to gather together the hundred pesos, so he was able to send the farmer only a little more than half. He put the money in an envelope addressed to Lencho and with it a letter containing only a single word as a signature: God.</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Who or what did Lencho have faith in? What did he do?</div>
        <div class="comprehension-question">2. Who read the letter?</div>
        <div class="comprehension-question">3. What did the postmaster do then?</div>
    </div>
    
    <p>The following Sunday Lencho came a bit earlier than usual to ask if there was a letter for him. It was the postman himself who handed the letter to him while the postmaster, experiencing the <span class="highlight-vocab">contentment<span class="vocab-tooltip">satisfaction</span></span> of a man who has performed a good deed, looked on from his office.</p>
    
    <div class="vocabulary-note">
        <div class="word">contentment</div>
        <div class="definition">satisfaction</div>
    </div>
    
    <p>Lencho showed not the slightest surprise on seeing the money; such was his confidence — but he became angry when he counted the money. God could not have made a mistake, nor could he have denied Lencho what he had requested.</p>
    
    <p>Immediately, Lencho went up to the window to ask for paper and ink. On the public writing-table, he started to write, with much <span class="highlight-vocab">wrinkling of his brow<span class="vocab-tooltip">frowning in concentration</span></span>, caused by the effort he had to make to express his ideas. When he finished, he went to the window to buy a stamp which he licked and then affixed to the envelope with a blow of his fist. The moment the letter fell into the mailbox the postmaster went to open it. It said: "God: Of the money that I asked for, only seventy pesos reached me. Send me the rest, since I need it very much. But don't send it to me through the mail because the post office employees are a bunch of crooks. Lencho."</p>
    
    <div class="vocabulary-note">
        <div class="word">wrinkling of his brow</div>
        <div class="definition">frowning in concentration</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Was Lencho surprised to find a letter for him with money in it?</div>
        <div class="comprehension-question">2. What made him angry?</div>
    </div>
`;

// Poem content data for Dust of Snow
const poem1Content = `
    <div class="poem-text">
        <p class="poem-title">DUST OF SNOW</p>
        <p class="poem-author">by Robert Frost</p>
        
        <div class="poem-stanza">
            <p class="poem-line">The way a crow</p>
            <p class="poem-line">Shook down on me</p>
            <p class="poem-line">The dust of snow</p>
            <p class="poem-line">From a <span class="highlight-vocab">hemlock<span class="vocab-tooltip">a poisonous plant (tree) with small white flowers</span></span> tree</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Has given my heart</p>
            <p class="poem-line">A change of mood</p>
            <p class="poem-line">And saved some part</p>
            <p class="poem-line">Of a day I had <span class="highlight-vocab">rued<span class="vocab-tooltip">held in regret</span></span>.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">hemlock</div>
        <div class="definition">a poisonous plant (tree) with small white flowers</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">rued</div>
        <div class="definition">held in regret</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What is a "dust of snow"? What does the poet say has changed his mood?</div>
        <div class="comprehension-question">2. How does Frost present nature in this poem?</div>
        <div class="comprehension-question">3. What do the 'crow' and 'hemlock' represent — joy or sorrow?</div>
    </div>
`;

// Poem content data for Fire and Ice
const poem2Content = `
    <div class="poem-text">
        <p class="poem-title">FIRE AND ICE</p>
        <p class="poem-author">by Robert Frost</p>
        
        <div class="poem-stanza">
            <p class="poem-line">Some say the world will end in fire</p>
            <p class="poem-line">Some say in ice.</p>
            <p class="poem-line">From what I've tasted of desire</p>
            <p class="poem-line">I hold with those who <span class="highlight-vocab">favour<span class="vocab-tooltip">prefer, support</span></span> fire.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">But if it had to <span class="highlight-vocab">perish<span class="vocab-tooltip">die</span></span> twice,</p>
            <p class="poem-line">I think I know enough of hate</p>
            <p class="poem-line">To say that for destruction ice</p>
            <p class="poem-line">Is also great</p>
            <p class="poem-line">And would <span class="highlight-vocab">suffice<span class="vocab-tooltip">be sufficient</span></span>.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">favour</div>
        <div class="definition">prefer, support</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">perish</div>
        <div class="definition">die</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">suffice</div>
        <div class="definition">be sufficient</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What do 'fire' and 'ice' stand for in the poem?</div>
        <div class="comprehension-question">2. What is the rhyme scheme of the poem?</div>
        <div class="comprehension-question">3. How does the rhyme scheme help bring out contrasting ideas in the poem?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content loaded - initializing content');
    
    // Load story content
    const storyContentDiv = document.getElementById('storyContent');
    if (storyContentDiv) {
        storyContentDiv.innerHTML = storyContent;
        console.log('Story content loaded successfully');
    } else {
        console.error('Story content div not found');
    }
    
    // Load poem 1 (Dust of Snow) content
    const poem1ContentDiv = document.getElementById('poem1Content');
    if (poem1ContentDiv) {
        poem1ContentDiv.innerHTML = poem1Content;
        console.log('Poem 1 (Dust of Snow) content loaded successfully');
    } else {
        console.error('Poem 1 content div not found');
    }
    
    // Load poem 2 (Fire and Ice) content
    const poem2ContentDiv = document.getElementById('poem2Content');
    if (poem2ContentDiv) {
        poem2ContentDiv.innerHTML = poem2Content;
        console.log('Poem 2 (Fire and Ice) content loaded successfully');
    } else {
        console.error('Poem 2 content div not found');
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
    
    // Add read aloud button for poem 1 (Dust of Snow)
    const poem1Btn = document.createElement('button');
    poem1Btn.className = 'interactive-btn read-part-btn';
    poem1Btn.innerHTML = '🔊 Read Poem Aloud';
    poem1Btn.setAttribute('aria-label', 'Read Dust of Snow aloud');
    poem1Btn.onclick = function() { readPoemAloud('poem1'); };
    
    // Add button container to poem1 content if it doesn't exist
    if (poem1ContentDiv) {
        let buttonContainer = poem1ContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            poem1ContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(poem1Btn);
    }
    
    // Add read aloud button for poem 2 (Fire and Ice)
    const poem2Btn = document.createElement('button');
    poem2Btn.className = 'interactive-btn read-part-btn';
    poem2Btn.innerHTML = '🔊 Read Poem Aloud';
    poem2Btn.setAttribute('aria-label', 'Read Fire and Ice aloud');
    poem2Btn.onclick = function() { readPoemAloud('poem2'); };
    
    // Add button container to poem2 content if it doesn't exist
    if (poem2ContentDiv) {
        let buttonContainer = poem2ContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            poem2ContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(poem2Btn);
    }
});

// This function is no longer needed as we now have separate tabs for each poem
// Removing it as it might cause confusion with the new navigation structure

// Toggle Read Aloud function for any text
function toggleReadAloud() {
    // If we're in the story module, read the story
    if (document.getElementById('story').classList.contains('active')) {
        readStoryAloud();
    }
    // If we're in the poem1 module (Dust of Snow), read the poem
    else if (document.getElementById('poem1').classList.contains('active')) {
        readPoemAloud('poem1');
    }
    // If we're in the poem2 module (Fire and Ice), read the poem
    else if (document.getElementById('poem2').classList.contains('active')) {
        readPoemAloud('poem2');
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
    let currentChunk = "A Letter to God. ";
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
function readPoemAloud(poemType = 'poem1') {
    console.log(`Reading poem aloud: ${poemType}`);
    
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
    
    // Extract plain text from the poem content based on poem type
    const poemContentDiv = document.getElementById(`${poemType}Content`);
    if (!poemContentDiv) {
        console.error(`Poem content div not found: ${poemType}Content`);
        return;
    }
    
    console.log(`Found poem content div: ${poemType}Content`);
    
    // Get the poem title and author
    const poemTitleEl = poemContentDiv.querySelector('.poem-title');
    const poemAuthorEl = poemContentDiv.querySelector('.poem-author');
    
    if (!poemTitleEl || !poemAuthorEl) {
        console.error('Poem title or author elements not found');
        return;
    }
    
    const poemTitle = poemTitleEl.textContent;
    const poemAuthor = poemAuthorEl.textContent;
    
    console.log(`Poem title: ${poemTitle}, Author: ${poemAuthor}`);
    
    // Get all poem lines
    const poemLines = poemContentDiv.querySelectorAll('.poem-line');
    
    if (!poemLines || poemLines.length === 0) {
        console.error('No poem lines found');
        return;
    }
    
    console.log(`Found ${poemLines.length} poem lines`);
    
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
    
    console.log(`Prepared poem text (first 50 chars): ${fullText.substring(0, 50)}...`);
    
    // Read the poem in one go
    readTextChunksSequentially([fullText], poemType);
}

// Function to read a series of text chunks sequentially
function readTextChunksSequentially(textChunks, contentType) {
    if (!window.narrator || !window.narrator.enabled || textChunks.length === 0) return;
    
    // Show reading indicator - handle different content types
    let contentDiv;
    if (contentType === 'story') {
        contentDiv = document.getElementById('storyContent');
    } else if (contentType === 'poem1') {
        contentDiv = document.getElementById('poem1Content');
    } else if (contentType === 'poem2') {
        contentDiv = document.getElementById('poem2Content');
    } else {
        console.error('Unknown content type:', contentType);
        return;
    }
    
    if (!contentDiv) {
        console.error('Content div not found for type:', contentType);
        return;
    }
    
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
function highlightPoemVocabulary(poemType = 'poem1') {
    const vocabTerms = document.querySelectorAll(`#${poemType}Content .highlight-vocab`);
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the poem content container
    const poemContent = document.getElementById(`${poemType}Content`);
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
