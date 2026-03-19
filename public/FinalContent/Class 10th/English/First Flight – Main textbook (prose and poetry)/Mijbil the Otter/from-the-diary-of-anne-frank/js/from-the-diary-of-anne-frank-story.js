/**
 * Story and poem content and functionality for From the Diary of Anne Frank
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>WRITING in a diary is a really strange experience for someone like me. Not only because I've never written anything before, but also because it seems to me that later on neither I nor anyone else will be interested in the <span class="highlight-vocab">musings<span class="vocab-tooltip">thoughts, reflections</span></span> of a thirteen-year-old schoolgirl. Oh well, it doesn't matter. I feel like writing, and I have an even greater need to get all kinds of things off my chest.</p>
    
    <div class="vocabulary-note">
        <div class="word">musings</div>
        <div class="definition">thoughts, reflections</div>
    </div>
    
    <p>'Paper has more patience than people.' I thought of this saying on one of those days when I was feeling a little depressed and was sitting at home with my chin in my hands, bored and <span class="highlight-vocab">listless<span class="vocab-tooltip">with no energy or interest</span></span>, wondering whether to stay in or go out. I finally stayed where I was, <span class="highlight-vocab">brooding<span class="vocab-tooltip">thinking deeply about something that makes one sad or worried</span></span>: Yes, paper does have more patience, and since I'm not planning to let anyone else read this <span class="highlight-vocab">stiff-backed<span class="vocab-tooltip">having a rigid back</span></span> notebook grandly referred to as a 'diary', unless I should ever find a real friend, it probably won't make a bit of difference.</p>
    
    <div class="vocabulary-note">
        <div class="word">listless</div>
        <div class="definition">with no energy or interest</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">brooding</div>
        <div class="definition">thinking deeply about something that makes one sad or worried</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">stiff-backed</div>
        <div class="definition">having a rigid back</div>
    </div>
    
    <p>Now I'm back to the point that prompted me to keep a diary in the first place: I don't have a friend.</p>
    
    <p>Let me put it more clearly, since no one will believe that a thirteen-year-old girl is completely alone in the world. And I'm not. I have loving parents and a sixteen-year-old sister, and there are about thirty people I can call friends. I have a family, loving aunts and a good home. No, on the surface I seem to have everything, except my one true friend. All I think about when I'm with friends is having a good time. I can't bring myself to talk about anything but ordinary everyday things. We don't seem to be able to get any closer, and that's the problem. Maybe it's my fault that we don't <span class="highlight-vocab">confide<span class="vocab-tooltip">tell personal things privately to a person that one trusts</span></span> in each other. In any case, that's just how things are, and <span class="highlight-vocab">unfortunately<span class="vocab-tooltip">by bad luck</span></span> they're not liable to change. This is why I've started the diary.</p>
    
    <div class="vocabulary-note">
        <div class="word">confide</div>
        <div class="definition">tell personal things privately to a person that one trusts</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">unfortunately</div>
        <div class="definition">by bad luck</div>
    </div>
    
    <p>To enhance the image of this long-awaited friend in my imagination, I don't want to jot down the facts in this diary the way most people would do, but I want the diary to be my friend, and I'm going to call this friend 'Kitty'.</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What makes writing in a diary a strange experience for Anne Frank?</div>
        <div class="comprehension-question">2. Why does Anne want to keep a diary?</div>
        <div class="comprehension-question">3. Why did Anne think she could confide more in her diary than in people?</div>
    </div>
    
    <p>Since no one would understand a word of my stories to Kitty if I were to plunge right in, I'd better provide a brief sketch of my life, much as I dislike doing so.</p>
    
    <p>My father, the most adorable father I've ever seen, didn't marry my mother until he was thirty-six and she was twenty-five. My sister, Margot, was born in Frankfurt in Germany in 1926. I was born on 12 June 1929. I lived in Frankfurt until I was four. My father <span class="highlight-vocab">emigrated<span class="vocab-tooltip">left one's country to live in another</span></span> to Holland in 1933. My mother, Edith Hollander Frank, went with him to Holland in September, while Margot and I were sent to Aachen to stay with our grandmother. Margot went to Holland in December, and I followed in February, when I was <span class="highlight-vocab">plunked down<span class="vocab-tooltip">put down in a casual way</span></span> on the table as a birthday present for Margot.</p>
    
    <div class="vocabulary-note">
        <div class="word">emigrated</div>
        <div class="definition">left one's country to live in another</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">plunked down</div>
        <div class="definition">put down in a casual way</div>
    </div>
    
    <p>I started right away at the Montessori nursery school. I stayed there until I was six, at which time I started in the first form. In the sixth form my teacher was Mrs Kuperus, the <span class="highlight-vocab">headmistress<span class="vocab-tooltip">a woman who is the head teacher of a school</span></span>. At the end of the year we were both in tears as we said a heartbreaking farewell.</p>
    
    <div class="vocabulary-note">
        <div class="word">headmistress</div>
        <div class="definition">a woman who is the head teacher of a school</div>
    </div>
    
    <p>In the summer of 1941 Grandma fell ill and had to have an operation, so my birthday passed with little celebration.</p>
    
    <p>Grandma died in January 1942. No one knows how often I think of her and still love her. This birthday celebration in 1942 was intended to make up for the other, and Grandma's candle was lit along with the rest.</p>
    
    <p>The four of us are still doing well, and that brings me to the present date of 20 June 1942, and the solemn dedication of my diary.</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why does Anne provide a brief sketch of her life?</div>
        <div class="comprehension-question">2. What tells you that Anne loved her grandmother?</div>
    </div>
    
    <p>Saturday, 20 June 1942<br>Dearest Kitty,</p>
    
    <p>Our entire class is <span class="highlight-vocab">quaking in its boots<span class="vocab-tooltip">shaking with fear and nervousness</span></span>. The reason, of course, is the forthcoming meeting in which the teachers decide who'll move up to the next form and who'll be kept back. Half the class is making bets. G.N. and I laugh ourselves silly at the two boys behind us, C.N. and Jacques, who have staked their entire holiday savings on their bet. From morning to night, it's "You're going to pass", "No, I'm not", "Yes, you are", "No, I'm not". Even G.'s pleading glances and my angry outbursts can't calm them down. If you ask me, there are so many dummies that about a quarter of the class should be kept back, but teachers are the most unpredictable creatures on earth.</p>
    
    <div class="vocabulary-note">
        <div class="word">quaking in its boots</div>
        <div class="definition">shaking with fear and nervousness</div>
    </div>
    
    <p>I'm not so worried about my girlfriends and myself. We'll make it. The only subject I'm not sure about is maths. Anyway, all we can do is wait. Until then, we keep telling each other not to lose heart.</p>
    
    <p>I get along pretty well with all my teachers. There are nine of them, seven men and two women. Mr Keesing, the <span class="highlight-vocab">old fogey<span class="vocab-tooltip">an old-fashioned person</span></span> who teaches maths, was annoyed with me for ages because I talked so much. After several warnings, he assigned me extra homework. An essay on the subject, 'A Chatterbox'. A chatterbox — what can you write about that? I'd worry about that later, I decided. I jotted down the title in my notebook, tucked it in my bag and tried to keep quiet.</p>
    
    <div class="vocabulary-note">
        <div class="word">old fogey</div>
        <div class="definition">an old-fashioned person</div>
    </div>
    
    <p>That evening, after I'd finished the rest of my homework, the note about the essay caught my eye. I began thinking about the subject while chewing the tip of my fountain pen. Anyone could <span class="highlight-vocab">ramble on<span class="vocab-tooltip">talk or write aimlessly for long</span></span> and leave big spaces between the words, but the trick was to come up with <span class="highlight-vocab">convincing arguments<span class="vocab-tooltip">a statement made in such a manner that people believe it</span></span> to prove the necessity of talking. I thought and thought, and suddenly I had an idea. I wrote the three pages Mr Keesing had assigned me and was satisfied. I argued that talking is a student's trait and that I would do my best to keep it under control, but that I would never be able to cure myself of the habit since my mother talked as much as I did if not more, and that there's not much you can do about <span class="highlight-vocab">inherited traits<span class="vocab-tooltip">qualities (physical or mental) that one gets from one's parents</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">ramble on</div>
        <div class="definition">talk or write aimlessly for long</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">convincing arguments</div>
        <div class="definition">a statement made in such a manner that people believe it</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">inherited traits</div>
        <div class="definition">qualities (physical or mental) that one gets from one's parents</div>
    </div>
    
    <p>Mr Keesing had a good laugh at my arguments, but when I proceeded to talk my way through the next lesson, he assigned me a second essay. This time it was supposed to be on 'An <span class="highlight-vocab">Incorrigible<span class="vocab-tooltip">something that cannot be corrected (usually a bad quality)</span></span> Chatterbox'. I handed it in, and Mr Keesing had nothing to complain about for two whole lessons. However, during the third lesson he'd finally had enough. "Anne Frank, as punishment for talking in class, write an essay entitled — 'Quack, Quack, Quack, Said Mistress Chatterbox'."</p>
    
    <div class="vocabulary-note">
        <div class="word">incorrigible</div>
        <div class="definition">something that cannot be corrected (usually a bad quality)</div>
    </div>
    
    <p>The class roared. I had to laugh too, though I'd nearly exhausted my <span class="highlight-vocab">ingenuity<span class="vocab-tooltip">originality and inventiveness</span></span> on the topic of chatterboxes. It was time to come up with something else, something original. My friend, Sanne, who's good at poetry, offered to help me write the essay from beginning to end in verse and I jumped for joy. Mr Keesing was trying to play a joke on me with this ridiculous subject, but I'd make sure the joke was on him.</p>
    
    <div class="vocabulary-note">
        <div class="word">ingenuity</div>
        <div class="definition">originality and inventiveness</div>
    </div>
    
    <p>I finished my poem, and it was beautiful! It was about a mother duck and a father swan with three baby ducklings who were bitten to death by the father because they quacked too much. Luckily, Mr Keesing took the joke the right way. He read the poem to the class, adding his own comments, and to several other classes as well. Since then I've been allowed to talk and haven't been assigned any extra homework. On the contrary, Mr Keesing's always making jokes these days.</p>
    
    <p>Yours,</p>
    
    <p>Anne</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why was Mr Keesing annoyed with Anne? What did he ask her to do?</div>
        <div class="comprehension-question">2. How did Anne justify her being a chatterbox in her essay?</div>
        <div class="comprehension-question">3. Do you think Mr Keesing was a strict teacher?</div>
        <div class="comprehension-question">4. What made Mr Keesing allow Anne to talk in class?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">AMANDA!</p>
        <p class="poem-author">by Robin Klein</p>
        
        <div class="poem-stanza">
            <p class="poem-line">Don't bite your nails, Amanda!</p>
            <p class="poem-line">Don't hunch your shoulders, Amanda!</p>
            <p class="poem-line">Stop that <span class="highlight-vocab">slouching<span class="vocab-tooltip">standing or sitting in a lazy way with your shoulders bent</span></span> and sit up straight,</p>
            <p class="poem-line">Amanda!</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">(There is a <span class="highlight-vocab">languid<span class="vocab-tooltip">relaxed</span></span>, emerald sea,</p>
            <p class="poem-line">where the sole <span class="highlight-vocab">inhabitant<span class="vocab-tooltip">a person who lives in a place</span></span> is me—</p>
            <p class="poem-line">a mermaid, <span class="highlight-vocab">drifting<span class="vocab-tooltip">moving slowly</span></span> blissfully.)</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Did you finish your homework, Amanda?</p>
            <p class="poem-line">Did you tidy your room, Amanda?</p>
            <p class="poem-line">I thought I told you to clean your shoes,</p>
            <p class="poem-line">Amanda!</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">(I am an orphan, roaming the street.</p>
            <p class="poem-line">I <span class="highlight-vocab">pattern<span class="vocab-tooltip">make patterns</span></span> soft dust with my hushed, bare feet.</p>
            <p class="poem-line">The silence is golden, the freedom is sweet.)</p>
        </div>

        <div class="poem-stanza">
            <p class="poem-line">Don't eat that chocolate, Amanda!</p>
            <p class="poem-line">Remember your acne, Amanda!</p>
            <p class="poem-line">Will you please look at me when I'm speaking to you,</p>
            <p class="poem-line">Amanda!</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">(I am Rapunzel, I have not a care;</p>
            <p class="poem-line">life in a tower is <span class="highlight-vocab">tranquil<span class="vocab-tooltip">calm</span></span> and rare;</p>
            <p class="poem-line">I'll certainly never let down my bright hair!)</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Stop that <span class="highlight-vocab">sulking<span class="vocab-tooltip">being silent and refusing to be friendly because you are angry</span></span> at once, Amanda!</p>
            <p class="poem-line">You're always so <span class="highlight-vocab">moody<span class="vocab-tooltip">having changing moods</span></span>, Amanda!</p>
            <p class="poem-line">Anyone would think that I nagged at you,</p>
            <p class="poem-line">Amanda!</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">slouching</div>
        <div class="definition">standing or sitting in a lazy way with your shoulders bent</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">languid</div>
        <div class="definition">relaxed</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">inhabitant</div>
        <div class="definition">a person who lives in a place</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">drifting</div>
        <div class="definition">moving slowly</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">pattern</div>
        <div class="definition">make patterns</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">tranquil</div>
        <div class="definition">calm</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">sulking</div>
        <div class="definition">being silent and refusing to be friendly because you are angry</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">moody</div>
        <div class="definition">having changing moods</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. How old do you think Amanda is? How do you know this?</div>
        <div class="comprehension-question">2. Who do you think is speaking to her?</div>
        <div class="comprehension-question">3. Why are stanzas 2, 4 and 6 given in parenthesis?</div>
        <div class="comprehension-question">4. What does Amanda yearn for?</div>
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
    let currentChunk = "From the Diary of Anne Frank. ";
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
