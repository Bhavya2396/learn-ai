/**
 * Story and poem content and functionality for The Fun They Had
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>MARGIE even wrote about it that night in her diary. On the page headed 17 May 2157, she wrote, "Today Tommy found a <span class="highlight-vocab">real<span class="vocab-tooltip">physical, printed</span></span> book!"</p>
    
    <div class="vocabulary-note">
        <div class="word">real</div>
        <div class="definition">physical, printed (in contrast to electronic)</div>
    </div>
    
    <p>It was a very old book. Margie's grandfather once said that when he was a little boy his grandfather told him that there was a time when all stories were printed on paper.</p>
    
    <p>They turned the pages, which were yellow and <span class="highlight-vocab">crinkly<span class="vocab-tooltip">with many folds or lines</span></span>, and it was <span class="highlight-vocab">awfully<span class="vocab-tooltip">extremely</span></span> funny to read words that stood still instead of moving the way they were supposed to — on a screen, you know. And then when they turned back to the page before, it had the same words on it that it had had when they read it the first time.</p>
    
    <div class="vocabulary-note">
        <div class="word">crinkly</div>
        <div class="definition">with many folds or lines</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">awfully</div>
        <div class="definition">extremely</div>
    </div>
    
    <p>"Gee," said Tommy, "what a waste. When you're through with the book, you just throw it away, I guess. Our television screen must have had a million books on it and it's good for plenty more. I wouldn't throw it away."</p>
    
    <p>"Same with mine," said Margie. She was eleven and hadn't seen as many telebooks as Tommy had. He was thirteen.</p>
    
    <p>She said, "Where did you find it?"</p>
    
    <p>"In my house." He pointed without looking, because he was busy reading. "In the <span class="highlight-vocab">attic<span class="vocab-tooltip">a space just below the roof, used as a storeroom</span></span>."</p>
    
    <div class="vocabulary-note">
        <div class="word">attic</div>
        <div class="definition">a space just below the roof, used as a storeroom</div>
    </div>
    
    <p>"What's it about?"</p>
    
    <p>"School."</p>
    
    <p>Margie was <span class="highlight-vocab">scornful<span class="vocab-tooltip">contemptuous; showing you think something is worthless</span></span>. "School? What's there to write about school? I hate school."</p>
    
    <div class="vocabulary-note">
        <div class="word">scornful</div>
        <div class="definition">contemptuous; showing you think something is worthless</div>
    </div>
    
    <p>Margie always hated school, but now she hated it more than ever. The mechanical teacher had been giving her test after test in geography and she had been doing worse and worse until her mother had shaken her head <span class="highlight-vocab">sorrowfully<span class="vocab-tooltip">in a sad manner</span></span> and sent for the County Inspector.</p>
    
    <div class="vocabulary-note">
        <div class="word">sorrowfully</div>
        <div class="definition">in a sad manner</div>
    </div>
    
    <p>He was a round little man with a red face and a whole box of tools with dials and wires. He smiled at Margie and gave her an apple, then took the teacher apart. Margie had hoped he wouldn't know how to put it together again, but he knew how all right, and, after an hour or so, there it was again, large and black and ugly, with a big screen on which all the lessons were shown and the questions were asked. That wasn't so bad. The part Margie hated most was the <span class="highlight-vocab">slot<span class="vocab-tooltip">a given space, time or position</span></span> where she had to put homework and test papers. She always had to write them out in a punch code they made her learn when she was six years old, and the mechanical teacher calculated the marks in no time.</p>
    
    <div class="vocabulary-note">
        <div class="word">slot</div>
        <div class="definition">a given space, time or position</div>
    </div>
    
    <p>The Inspector had smiled after he was finished and patted Margie's head. He said to her mother, "It's not the little girl's fault, Mrs Jones. I think the geography sector was <span class="highlight-vocab">geared<span class="vocab-tooltip">adjusted to a particular standard or level</span></span> a little too quick. Those things happen sometimes. I've slowed it up to an average ten-year level. Actually, the overall pattern of her progress is quite satisfactory." And he patted Margie's head again.</p>
    
    <div class="vocabulary-note">
        <div class="word">geared</div>
        <div class="definition">adjusted to a particular standard or level</div>
    </div>
    
    <p>Margie was disappointed. She had been hoping they would take the teacher away altogether. They had once taken Tommy's teacher away for nearly a month because the history sector had blanked out <span class="highlight-vocab">completely<span class="vocab-tooltip">totally, entirely</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">completely</div>
        <div class="definition">totally, entirely</div>
    </div>
    
    <p>So she said to Tommy, "Why would anyone write about school?"</p>
    
    <p>Tommy looked at her with very superior eyes. "Because it's not our kind of school, stupid. This is the old kind of school that they had hundreds and hundreds of years ago." He added <span class="highlight-vocab">loftily<span class="vocab-tooltip">in a superior way</span></span>, pronouncing the word <span class="highlight-vocab">carefully<span class="vocab-tooltip">with caution and attention</span></span>, "Centuries ago."</p>
    
    <div class="vocabulary-note">
        <div class="word">loftily</div>
        <div class="definition">in a superior way</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">carefully</div>
        <div class="definition">with caution and attention</div>
    </div>
    
    <p>Margie was hurt. "Well, I don't know what kind of school they had all that time ago." She read the book over his shoulder for a while, then said, "Anyway, they had a teacher."</p>
    
    <p>They had a teacher... It was a man.</p>
    
    <p>"Sure they had a teacher, but it wasn't a <span class="highlight-vocab">regular<span class="vocab-tooltip">normal; of the usual kind</span></span> teacher. It was a man."</p>
    
    <div class="vocabulary-note">
        <div class="word">regular</div>
        <div class="definition">normal; of the usual kind</div>
    </div>
    
    <p>"A man? How could a man be a teacher?"</p>
    
    <p>"Well, he just told the boys and girls things and gave them homework and asked them questions."</p>
    
    <p>"A man isn't smart enough."</p>
    
    <p>"Sure he is. My father knows as much as my teacher."</p>
    
    <p>"He knows almost as much, I <span class="highlight-vocab">betcha<span class="vocab-tooltip">(I) bet you (in fast speech): I'm sure</span></span>."</p>
    
    <div class="vocabulary-note">
        <div class="word">betcha</div>
        <div class="definition">(I) bet you (in fast speech): I'm sure</div>
    </div>
    
    <p>Margie wasn't prepared to <span class="highlight-vocab">dispute<span class="vocab-tooltip">disagree with</span></span> that. She said, "I wouldn't want a strange man in my house to teach me."</p>
    
    <div class="vocabulary-note">
        <div class="word">dispute</div>
        <div class="definition">disagree with</div>
    </div>
    
    <p>Tommy screamed with laughter. "You don't know much, Margie. The teachers didn't live in the house. They had a special building and all the kids went there."</p>
    
    <p>"And all the kids learned the same thing?"</p>
    
    <p>"Sure, if they were the same age."</p>
    
    <p>"But my mother says a teacher has to be adjusted to fit the mind of each boy and girl it teaches and that each kid has to be taught <span class="highlight-vocab">differently<span class="vocab-tooltip">in a different manner</span></span>."</p>
    
    <div class="vocabulary-note">
        <div class="word">differently</div>
        <div class="definition">in a different manner</div>
    </div>
    
    <p>"Just the same they didn't do it that way then. If you don't like it, you don't have to read the book."</p>
    
    <p>"I didn't say I didn't like it," Margie said <span class="highlight-vocab">quickly<span class="vocab-tooltip">rapidly, at a fast pace</span></span>. She wanted to read about those funny schools.</p>
    
    <div class="vocabulary-note">
        <div class="word">quickly</div>
        <div class="definition">rapidly, at a fast pace</div>
    </div>
    
    <p>They weren't even half finished when Margie's mother called, "Margie! School!"</p>
    
    <p>Margie looked up. "Not yet, Mamma."</p>
    
    <p>"Now!" said Mrs Jones. "And it's probably time for Tommy, too."</p>
    
    <p>Margie said to Tommy, "Can I read the book some more with you after school?"</p>
    
    <p>"May be," he said <span class="highlight-vocab">nonchalantly<span class="vocab-tooltip">not showing much interest or enthusiasm; carelessly</span></span>. He walked away whistling, the dusty old book tucked beneath his arm.</p>
    
    <div class="vocabulary-note">
        <div class="word">nonchalantly</div>
        <div class="definition">not showing much interest or enthusiasm; carelessly</div>
    </div>
    
    <p>Margie went into the schoolroom. It was right next to her bedroom, and the mechanical teacher was on and waiting for her. It was always on at the same time every day except Saturday and Sunday, because her mother said little girls learned better if they learned at regular hours.</p>
    
    <p>The screen was lit up, and it said: "Today's arithmetic lesson is on the addition of proper fractions. Please insert yesterday's homework in the proper slot."</p>
    
    <p>Margie did so with a sigh. She was thinking about the old schools they had when her grandfather's grandfather was a little boy. All the kids from the whole neighborhood came, laughing and shouting in the schoolyard, sitting together in the schoolroom, going home together at the end of the day. They learned the same things, so they could help one another with the homework and talk about it.</p>
    
    <p>And the teachers were people...</p>
    
    <p>The mechanical teacher was flashing on the screen: "When we add fractions ½ and ¼..."</p>
    
    <p>Margie was thinking about how the kids must have loved it in the old days. She was thinking about the fun they had.</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. How old are Margie and Tommy?</div>
        <div class="comprehension-question">2. What did Margie write in her diary?</div>
        <div class="comprehension-question">3. What subjects did Margie and Tommy learn?</div>
        <div class="comprehension-question">4. Why was Margie doing badly in geography?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">THE ROAD NOT TAKEN</p>
        <p class="poem-author">by Robert Frost</p>
        
        <div class="poem-stanza">
            <p class="poem-line">Two roads <span class="highlight-vocab">diverged<span class="vocab-tooltip">separated and took a different direction</span></span> in a yellow wood,</p>
            <p class="poem-line">And sorry I could not travel both</p>
            <p class="poem-line">And be one traveller, long I stood</p>
            <p class="poem-line">And looked down one as far as I could</p>
            <p class="poem-line">To where it bent in the <span class="highlight-vocab">undergrowth<span class="vocab-tooltip">dense growth of plants and bushes</span></span>;</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Then took the other, just as fair,</p>
            <p class="poem-line">And having perhaps the better claim,</p>
            <p class="poem-line">Because it was grassy and <span class="highlight-vocab">wanted wear<span class="vocab-tooltip">had not been used</span></span>;</p>
            <p class="poem-line">Though as for that the passing there</p>
            <p class="poem-line">Had worn them really about the same.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">And both that morning equally lay</p>
            <p class="poem-line">In leaves no step had trodden black.</p>
            <p class="poem-line">Oh, I kept the first for another day!</p>
            <p class="poem-line">Yet knowing how way leads on to way,</p>
            <p class="poem-line">I doubted if I should ever come back.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">I shall be telling this with a sigh</p>
            <p class="poem-line">Somewhere ages and ages <span class="highlight-vocab">hence<span class="vocab-tooltip">here, in the future</span></span>;</p>
            <p class="poem-line">Two roads diverged in a wood, and I —</p>
            <p class="poem-line">I took the one less travelled by,</p>
            <p class="poem-line">And that has made all the difference.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">diverged</div>
        <div class="definition">separated and took a different direction</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">undergrowth</div>
        <div class="definition">dense growth of plants and bushes</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">wanted wear</div>
        <div class="definition">had not been used</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">hence</div>
        <div class="definition">here, in the future</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Where does the traveller find himself?</div>
        <div class="comprehension-question">2. What does "a yellow wood" mean?</div>
        <div class="comprehension-question">3. What do you think the last two lines of the poem mean?</div>
        <div class="comprehension-question">4. Is there any difference between the two roads as the poet describes them?</div>
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
    let currentChunk = "The Fun They Had, by Isaac Asimov. ";
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