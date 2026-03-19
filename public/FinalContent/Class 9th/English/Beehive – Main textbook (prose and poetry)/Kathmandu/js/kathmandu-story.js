/**
 * Story and poem content and functionality for Kathmandu
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>I GET a cheap room in the centre of town and sleep for hours. The next morning, with Mr Shah's son and nephew, I visit the two temples in Kathmandu that are most sacred to Hindus and Buddhists.</p>
    
    <p>At Pashupatinath (outside which a sign <span class="highlight-vocab">proclaims<span class="vocab-tooltip">makes publicly or officially known</span></span> 'Entrance for the Hindus only') there is an atmosphere of '<span class="highlight-vocab">febrile confusion<span class="vocab-tooltip">hurried activity; complete chaos</span></span>'. Priests, hawkers, devotees, tourists, cows, monkeys, pigeons and dogs roam through the grounds. We offer a few flowers. There are so many worshippers that some people trying to get the priest's attention are elbowed aside by others pushing their way to the front.</p>
    
    <div class="vocabulary-note">
        <div class="word">proclaim</div>
        <div class="definition">make publicly or officially known</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">febrile confusion</div>
        <div class="definition">hurried activity; complete chaos</div>
    </div>
    
    <p>A princess of the Nepalese royal house appears; everyone bows and makes way. By the main gate, a party of saffron-clad Westerners struggle for permission to enter. The policeman is not convinced that they are 'the Hindus' (only Hindus are allowed to enter the temple). A fight breaks out between two monkeys. One chases the other, who jumps onto a shivalinga, then runs screaming around the temples and down to the river, the holy Bagmati, that flows below.</p>
    
    <p>A corpse is being cremated on its banks; washerwomen are at their work and children bathe. From a balcony a basket of flowers and leaves, old offerings now wilted, is dropped into the river. A small <span class="highlight-vocab">shrine<span class="vocab-tooltip">a place of worship</span></span> half protrudes from the stone platform on the river bank. When it emerges fully, the goddess inside will escape, and the evil period of the Kaliyug will end on earth.</p>
    
    <div class="vocabulary-note">
        <div class="word">shrine</div>
        <div class="definition">a place of worship</div>
    </div>
    
    <p>At the Baudhnath stupa, the Buddhist shrine of Kathmandu, there is, in contrast, a sense of stillness. Its immense white dome is ringed by a road. Small shops stand on its outer edge: many of these are owned by Tibetan immigrants; felt bags, Tibetan prints and silver jewellery can be bought here. There are no crowds: this is a <span class="highlight-vocab">haven<span class="vocab-tooltip">a safe place</span></span> of quietness in the busy streets around.</p>
    
    <div class="vocabulary-note">
        <div class="word">haven</div>
        <div class="definition">a safe place</div>
    </div>
    
    <p>Kathmandu is vivid, mercenary, religious, with small shrines to flower-adorned deities along the narrowest and busiest streets; with fruit sellers, flute sellers, hawkers of postcards; shops selling Western cosmetics, film rolls and chocolate; or copper utensils and Nepalese antiques. Film songs blare out from the radios, car horns sound, bicycle bells ring, stray cows low questioningly at motorcycles, vendors shout out their wares.</p>
    
    <p>I indulge myself mindlessly: buy a bar of <span class="highlight-vocab">marzipan<span class="vocab-tooltip">a sweet made with grated almond</span></span>, a corn-on-the-cob roasted in a charcoal <span class="highlight-vocab">brazier<span class="vocab-tooltip">open stove</span></span> on the pavement (rubbed with salt, chilli powder and lemon); a couple of love story comics, and even a Reader's Digest. All this I wash down with Coca Cola and a <span class="highlight-vocab">nauseating<span class="vocab-tooltip">sickening</span></span> orange drink, and feel much the better for it.</p>
    
    <div class="vocabulary-note">
        <div class="word">marzipan</div>
        <div class="definition">a sweet made with grated almond</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">brazier</div>
        <div class="definition">open stove</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">nauseating</div>
        <div class="definition">sickening</div>
    </div>
    
    <p>I consider what route I should take back home. If I were propelled by enthusiasm for travel <span class="highlight-vocab">per se<span class="vocab-tooltip">by itself</span></span>, I would go by bus and train to Patna, then sail up the Ganges past Benaras to Allahabad, then up the Yamuna, past Agra to Delhi. But I am too exhausted and homesick; today is the last day of August. Go home, I tell myself: move directly towards home. I enter a Nepal Airlines office and buy a ticket for tomorrow's flight.</p>
    
    <div class="vocabulary-note">
        <div class="word">per se</div>
        <div class="definition">by itself</div>
    </div>
    
    <p>I look at the flute seller standing in a corner of the square near the hotel. In his hand is a pole with an attachment at the top from which fifty or sixty bansuris protrude in all directions, like the quills of a porcupine. They are of bamboo: there are cross-flutes and recorders. From time to time he stands the pole on the ground, selects a flute and plays for a few minutes.</p>
    
    <p>The sound rises clearly above the noise of the traffic and the hawkers' cries. He plays slowly, <span class="highlight-vocab">meditatively<span class="vocab-tooltip">thoughtfully</span></span>, without excessive display. He does not shout out his wares. Occasionally he makes a sale, but in a curiously <span class="highlight-vocab">offhanded<span class="vocab-tooltip">casual; not showing much interest in something</span></span> way as if this were incidental to his enterprise. Sometimes he breaks off playing to talk to the fruit seller. I imagine that this has been the pattern of his life for years.</p>
    
    <div class="vocabulary-note">
        <div class="word">meditatively</div>
        <div class="definition">thoughtfully</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">offhanded</div>
        <div class="definition">casual; not showing much interest in something</div>
    </div>
    
    <p>I find it difficult to tear myself away from the square. Flute music always does this to me: it is at once the most universal and most particular of sounds. There is no culture that does not have its flute—the reed neh, the recorder, the Japanese shakuhachi, the deep bansuri of Hindustani classical music, the clear or breathy flutes of South America, the high-pitched Chinese flutes. Each has its specific <span class="highlight-vocab">fingering<span class="vocab-tooltip">way of placing the fingers to play different notes</span></span> and <span class="highlight-vocab">compass<span class="vocab-tooltip">here, range</span></span>. It weaves its own associations.</p>
    
    <div class="vocabulary-note">
        <div class="word">fingering</div>
        <div class="definition">way of placing the fingers to play different notes</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">compass</div>
        <div class="definition">here, range</div>
    </div>
    
    <p>Yet to hear any flute is, it seems to me, to be drawn into the commonality of all mankind, to be moved by music closest in its phrases and sentences to the human voice. Its motive force too is living breath: it too needs to pause and breathe before it can go on.</p>
    
    <p>That I can be so affected by a few familiar phrases on the bansuri, surprises me at first, for on the previous occasions that I have returned home after a long absence abroad, I have hardly noticed such details, and certainly have not invested them with the significance I now do.</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Name the two temples the author visited in Kathmandu.</div>
        <div class="comprehension-question">2. What are the main differences between these two temples?</div>
        <div class="comprehension-question">3. What is the belief at Pashupatinath about the end of Kaliyug?</div>
        <div class="comprehension-question">4. What does the author say about the flute music?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">A SLUMBER DID MY SPIRIT SEAL</p>
        <p class="poem-author">by William Wordsworth</p>
        
        <div class="poem-stanza">
            <p class="poem-line">A slumber did my spirit seal—</p>
            <p class="poem-line">I had no human fears.</p>
            <p class="poem-line">She seemed a thing that could not feel</p>
            <p class="poem-line">The touch of earthly years.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">No motion has she now, no force—</p>
            <p class="poem-line">She neither hears nor sees,</p>
            <p class="poem-line">Rolled round in earth's <span class="highlight-vocab">diurnal<span class="vocab-tooltip">daily</span></span> course</p>
            <p class="poem-line">With rocks and stones and trees.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">diurnal</div>
        <div class="definition">daily ("Earth's diurnal course" is earth's daily rotation on its axis.)</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. How does the poet react to his loved one's death?</div>
        <div class="comprehension-question">2. Which lines of the poem say that the passing of time will no longer affect her?</div>
        <div class="comprehension-question">3. How does the poet imagine her to be, after death?</div>
        <div class="comprehension-question">4. What do you think "rolled round in earth's diurnal course" means?</div>
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
    let currentChunk = "Kathmandu, by Vikram Seth. ";
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
