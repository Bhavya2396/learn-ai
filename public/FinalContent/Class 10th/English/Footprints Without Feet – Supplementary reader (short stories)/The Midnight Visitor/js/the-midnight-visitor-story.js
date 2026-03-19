/**
 * Story content and functionality for The Midnight Visitor
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>AUSABLE did not fit any description of a secret agent Fowler had ever read. Following him down the <span class="highlight-vocab">musty<span class="vocab-tooltip">stale and damp-smelling</span></span> corridor of the gloomy French hotel where Ausable had a room, Fowler felt let down. It was a small room, on the sixth and top floor, and scarcely a setting for a romantic adventure.</p>
    
    <div class="vocabulary-note">
        <div class="word">musty</div>
        <div class="definition">stale and damp-smelling</div>
    </div>
    
    <p>Ausable was, for one thing, fat. Very fat. And then there was his accent. Though he spoke French and German <span class="highlight-vocab">passably<span class="vocab-tooltip">just well enough; tolerably well</span></span>, he had never altogether lost the American accent he had brought to Paris from Boston twenty years ago.</p>
    
    <div class="vocabulary-note">
        <div class="word">passably</div>
        <div class="definition">just well enough; tolerably well</div>
    </div>
    
    <p>"You are disappointed," Ausable said <span class="highlight-vocab">wheezily<span class="vocab-tooltip">breathing with difficulty and making a whistling sound</span></span> over his shoulder. "You were told that I was a secret agent, a spy, dealing in <span class="highlight-vocab">espionage<span class="vocab-tooltip">the practice of spying to get information about plans and activities</span></span> and danger. You wished to meet me because you are a writer, young and romantic. You <span class="highlight-vocab">envisioned<span class="vocab-tooltip">imagined</span></span> mysterious figures in the night, the crack of pistols, drugs in the wine."</p>
    
    <div class="vocabulary-note">
        <div class="word">wheezily</div>
        <div class="definition">breathing with difficulty and making a whistling sound</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">espionage</div>
        <div class="definition">the practice of spying to get information about plans and activities</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">envisioned</div>
        <div class="definition">imagined</div>
    </div>
    
    <p>"Instead, you have spent a dull evening in a French music hall with a <span class="highlight-vocab">sloppy<span class="vocab-tooltip">carelessly dressed</span></span> fat man who, instead of having messages slipped into his hand by dark-eyed beauties, gets only a <span class="highlight-vocab">prosaic<span class="vocab-tooltip">ordinary, not romantic or special</span></span> telephone call making an appointment in his room. You have been bored!" The fat man <span class="highlight-vocab">chuckled<span class="vocab-tooltip">laughed quietly, without opening his mouth</span></span> to himself as he unlocked the door of his room and stood aside to let his frustrated guest enter.</p>
    
    <div class="vocabulary-note">
        <div class="word">sloppy</div>
        <div class="definition">carelessly dressed</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">prosaic</div>
        <div class="definition">ordinary, not romantic or special</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">chuckled</div>
        <div class="definition">laughed quietly, without opening his mouth</div>
    </div>
    
    <p>"You are <span class="highlight-vocab">disillusioned<span class="vocab-tooltip">disappointed when you discover something is not as good as you believed</span></span>," Ausable told him. "But take cheer, my young friend. Presently you will see a paper, a quite important paper for which several men and women have risked their lives, come to me. Some day soon that paper may well affect the course of history. In that thought is drama, is there not?"</p>
    
    <div class="vocabulary-note">
        <div class="word">disillusioned</div>
        <div class="definition">disappointed when you discover something is not as good as you believed</div>
    </div>
    
    <p>As he spoke, Ausable closed the door behind him. Then he switched on the light.</p>
    
    <p>And as the light came on, Fowler had his first authentic thrill of the day. For halfway across the room, a small automatic pistol in his hand, stood a man.</p>
    
    <p>Ausable blinked a few times.</p>
    
    <p>"Max," he wheezed, "you gave me quite a start. I thought you were in Berlin. What are you doing here in my room?"</p>
    
    <p>Max was slender, a little less than tall, with features that suggested slightly the <span class="highlight-vocab">crafty<span class="vocab-tooltip">clever at deceiving people</span></span>, pointed <span class="highlight-vocab">countenance<span class="vocab-tooltip">face or expression</span></span> of a fox. There was about him — aside from the gun — nothing especially <span class="highlight-vocab">menacing<span class="vocab-tooltip">threatening, showing the intention to harm</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">crafty</div>
        <div class="definition">clever at deceiving people</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">countenance</div>
        <div class="definition">face or expression</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">menacing</div>
        <div class="definition">threatening, showing the intention to harm</div>
    </div>
    
    <p>"The report," he murmured. "The report that is being brought to you tonight concerning some new <span class="highlight-vocab">missiles<span class="vocab-tooltip">weapons directed by remote control or automatically</span></span>. I thought I would take it from you. It will be safer in my hands than in yours."</p>
    
    <div class="vocabulary-note">
        <div class="word">missiles</div>
        <div class="definition">weapons directed by remote control or automatically</div>
    </div>
    
    <p>Ausable moved to an armchair and sat down heavily. "I'm going to raise the devil with the management this time, and you can bet on it," he said <span class="highlight-vocab">grimly<span class="vocab-tooltip">in a stern or forbidding manner</span></span>. "This is the second time in a month that somebody has got into my room through that nuisance of a balcony!" Fowler's eyes went to the single window of the room. It was an ordinary window, against which now the night was pressing blackly.</p>
    
    <div class="vocabulary-note">
        <div class="word">grimly</div>
        <div class="definition">in a stern or forbidding manner</div>
    </div>
    
    <p>"Balcony?" Max said, with a rising <span class="highlight-vocab">inflection<span class="vocab-tooltip">change in the tone or pitch of the voice</span></span>. "No, a <span class="highlight-vocab">passkey<span class="vocab-tooltip">a master key that opens many different doors</span></span>. I did not know about the balcony. It might have saved me some trouble had I known."</p>
    
    <div class="vocabulary-note">
        <div class="word">inflection</div>
        <div class="definition">change in the tone or pitch of the voice</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">passkey</div>
        <div class="definition">a master key that opens many different doors</div>
    </div>
    
    <p>"It's not my balcony," Ausable said with extreme irritation. "It belongs to the next apartment." He glanced <span class="highlight-vocab">explanatorily<span class="vocab-tooltip">in a way that gives explanation</span></span> at Fowler. "You see," he said, "this room used to be part of a large unit, and the next room — through that door there — used to be the living room. It had the balcony, which extends under my window now. You can get onto it from the empty room two doors down — and somebody did, last month. The management promised to block it off. But they haven't."</p>
    
    <div class="vocabulary-note">
        <div class="word">explanatorily</div>
        <div class="definition">in a way that gives explanation</div>
    </div>
    
    <p>Max glanced at Fowler, who was standing stiffly not far from Ausable, and waved the gun with a commanding gesture. "Please sit down," he said. "We have a wait of half an hour, I think."</p>
    
    <p>"Thirty-one minutes," Ausable said moodily. "The appointment was for twelve-thirty. I wish I knew how you learned about the report, Max."</p>
    
    <p>The little spy smiled evilly. "And we wish we knew how your people got the report. But no harm has been done. I will get it back tonight. What is that? Who is at the door?"</p>
    
    <p>Fowler jumped at the sudden knocking at the door. Ausable just smiled. "That will be the police," he said. "I thought that such an important paper as the one we are waiting for should have a little extra protection. I told them to check on me to make sure everything was all right."</p>
    
    <p>Max bit his lip nervously. The knocking was repeated.</p>
    
    <p>"What will you do now, Max?" Ausable asked. "If I do not answer the door, they will enter anyway. The door is unlocked. And they will not hesitate to shoot."</p>
    
    <p>Max's face was black with anger as he backed swiftly towards the window. He swung a leg over the sill. "Send them away!" he warned. "I will wait on the balcony. Send them away or I'll shoot and take my chances!"</p>
    
    <p>The knocking at the door became louder and a voice was raised.</p>
    
    <p>"Mr Ausable! Mr Ausable!"</p>
    
    <p>Keeping his body twisted so that his gun still covered the fat man and his guest, the man at the window grasped the frame with his free hand to support himself. Then he swung his other leg up and over the window-sill.</p>
    
    <p>The doorknob turned. Swiftly Max pushed with his left hand to free himself from the sill and drop to the balcony. And then, as he dropped, he screamed once, <span class="highlight-vocab">shrilly<span class="vocab-tooltip">piercingly; in a high pitch</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">shrilly</div>
        <div class="definition">piercingly; in a high pitch</div>
    </div>
    
    <p>The door opened and a waiter stood there with a tray, a bottle and two glasses. "Here is the drink you ordered for when you returned," he said, and set the tray on the table, deftly uncorked the bottle, and left the room.</p>
    
    <p>White-faced, Fowler stared after him. "But..." he stammered, "the police..."</p>
    
    <p>"There were no police." Ausable sighed. "Only Henry, whom I was expecting."</p>
    
    <p>"But won't that man out on the balcony…?" Fowler began.</p>
    
    <p>"No," said Ausable, "he won't return. You see, my young friend, there is no balcony."</p>
    
    <p style="text-align: right;">ROBERT ARTHUR</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. How is Ausable different from other secret agents?</div>
        <div class="comprehension-question">2. Who is Fowler and what is his first authentic thrill of the day?</div>
        <div class="comprehension-question">3. How has Max got into the room according to himself?</div>
        <div class="comprehension-question">4. How does Ausable say Max got in?</div>
        <div class="comprehension-question">5. What happens to Max in the end?</div>
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
    let currentChunk = "The Midnight Visitor, by Robert Arthur. ";
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
