/**
 * Story and poem content and functionality for A Truly Beautiful Mind
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>ALBERT Einstein was born on 14 March 1879 in the German city of Ulm, without any indication that he was destined for greatness. On the contrary, his mother thought Albert was a <span class="highlight-vocab">freak<span class="vocab-tooltip">a word used disapprovingly to talk about a person who is unusual and doesn't behave, look or think like others</span></span>. To her, his head seemed much too large.</p>
    
    <div class="vocabulary-note">
        <div class="word">freak</div>
        <div class="definition">a word used disapprovingly to talk about a person who is unusual and doesn't behave, look or think like others</div>
    </div>
    
    <p>At the age of two-and-a-half, Einstein still wasn't talking. When he finally did learn to speak, he uttered everything twice. Einstein did not know what to do with other children, and his playmates called him "Brother Boring." So the youngster played by himself much of the time. He especially loved mechanical toys. Looking at his newborn sister, Maja, he is said to have said: "Fine, but where are her wheels?"</p>
    
    <p>A headmaster once told his father that what Einstein chose as a profession wouldn't matter, because "he'll never make a success at anything." Einstein began learning to play the violin at the age of six, because his mother wanted him to; he later became a gifted <span class="highlight-vocab">amateur<span class="vocab-tooltip">doing something for personal enjoyment rather than as a profession</span></span> violinist, maintaining this skill throughout his life.</p>
    
    <div class="vocabulary-note">
        <div class="word">amateur</div>
        <div class="definition">doing something for personal enjoyment rather than as a profession</div>
    </div>
    
    <p>But Albert Einstein was not a bad pupil. He went to high school in Munich, where Einstein's family had moved when he was 15 months old, and scored good marks in almost every subject. Einstein hated the school's <span class="highlight-vocab">regimentation<span class="vocab-tooltip">order or discipline taken to an extreme</span></span>, and often clashed with his teachers. At the age of 15, Einstein felt so <span class="highlight-vocab">stifled<span class="vocab-tooltip">unable to breathe; suffocated</span></span> there that he left the school for good.</p>
    
    <div class="vocabulary-note">
        <div class="word">regimentation</div>
        <div class="definition">order or discipline taken to an extreme</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">stifled</div>
        <div class="definition">unable to breathe; suffocated</div>
    </div>
    
    <p>The previous year, Albert's parents had moved to Milan, and left their son with relatives. After prolonged discussion, Einstein got his wish to continue his education in German-speaking Switzerland, in a city which was more <span class="highlight-vocab">liberal<span class="vocab-tooltip">willing to understand and respect others' opinions</span></span> than Munich.</p>
    
    <div class="vocabulary-note">
        <div class="word">liberal</div>
        <div class="definition">willing to understand and respect others' opinions</div>
    </div>
    
    <p>Einstein was highly gifted in mathematics and interested in physics, and after finishing school, he decided to study at a university in Zurich. But science wasn't the only thing that appealed to the dashing young man with the walrus moustache.</p>
    
    <p>He also felt a special interest in a fellow student, Mileva Maric, whom he found to be a "clever creature." This young Serb had come to Switzerland because the University in Zurich was one of the few in Europe where women could get degrees. Einstein saw in her an <span class="highlight-vocab">ally<span class="vocab-tooltip">a friend or an associate</span></span> against the "<span class="highlight-vocab">philistines<span class="vocab-tooltip">a word used disapprovingly to talk about people who do not like art, literature or music</span></span>"— those people in his family and at the university with whom he was constantly at odds. The couple fell in love. Letters survive in which they put their affection into words, mixing science with tenderness. Wrote Einstein: "How happy and proud I shall be when we both have brought our work on relativity to a victorious conclusion."</p>
    
    <div class="vocabulary-note">
        <div class="word">ally</div>
        <div class="definition">a friend or an associate</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">philistines</div>
        <div class="definition">a word used disapprovingly to talk about people who do not like art, literature or music</div>
    </div>
    
    <p>In 1900, at the age of 21, Albert Einstein was a university graduate and unemployed. He worked as a teaching assistant, gave private lessons and finally secured a job in 1902 as a technical expert in the <span class="highlight-vocab">patent<span class="vocab-tooltip">a document which gives the rights of an invention to an inventor</span></span> office in Bern. While he was supposed to be assessing other people's inventions, Einstein was actually developing his own ideas in secret. He is said to have jokingly called his desk drawer at work the "bureau of theoretical physics."</p>
    
    <div class="vocabulary-note">
        <div class="word">patent</div>
        <div class="definition">a document which gives the rights of an invention to an inventor</div>
    </div>
    
    <p>One of the famous papers of 1905 was Einstein's Special Theory of Relativity, according to which time and distance are not <span class="highlight-vocab">absolute<span class="vocab-tooltip">measured in itself, not in relation to anything else</span></span>. Indeed, two perfectly accurate clocks will not continue to show the same time if they come together again after a journey if one of them has been moving very fast relative to the other. From this followed the world's most famous formula which describes the relationship between mass and energy:</p>
    
    <div class="vocabulary-note">
        <div class="word">absolute</div>
        <div class="definition">measured in itself, not in relation to anything else</div>
    </div>
    
    <p style="text-align:center; font-size:1.2em; margin:20px 0;">E = mc²</p>
    
    <p>(In this mathematical equation, E stands for energy, m for mass and c for the speed of the light in a vacuum (about 300,000 km/s).</p>
    
    <blockquote>
        When you sit with a nice girl for two hours, it seems like two minutes. When you sit on a hot stove for two minutes, it seems like two hours —that's relativity. – ALBERT EINSTEIN
    </blockquote>
    
    <p>While Einstein was solving the most difficult problems in physics, his private life was <span class="highlight-vocab">unravelling<span class="vocab-tooltip">starting to fail</span></span>. Albert had wanted to marry Mileva right after finishing his studies, but his mother was against it. She thought Mileva, who was three years older than her son, was too old for him. She was also bothered by Mileva's intelligence. "She is a book like you," his mother said. Einstein put the wedding off.</p>
    
    <div class="vocabulary-note">
        <div class="word">unravelling</div>
        <div class="definition">starting to fail</div>
    </div>
    
    <p>The pair finally married in January 1903, and had two sons. But a few years later, the marriage <span class="highlight-vocab">faltered<span class="vocab-tooltip">became weak</span></span>. Mileva, meanwhile, was losing her intellectual ambition and becoming an unhappy housewife. After years of constant fighting, the couple finally divorced in 1919. Einstein married his cousin Elsa the same year.</p>
    
    <div class="vocabulary-note">
        <div class="word">faltered</div>
        <div class="definition">became weak</div>
    </div>
    
    <p>Einstein's new personal chapter coincided with his rise to world fame. In 1915, he had published his General Theory of Relativity, which provided a new interpretation of gravity. An eclipse of the sun in 1919 brought proof that it was accurate. Einstein had correctly calculated in advance the extent to which the light from fixed stars would be <span class="highlight-vocab">deflected<span class="vocab-tooltip">changed direction because it hit something</span></span> through the sun's gravitational field. The newspapers proclaimed his work as "a scientific revolution."</p>
    
    <div class="vocabulary-note">
        <div class="word">deflected</div>
        <div class="definition">changed direction because it hit something</div>
    </div>
    
    <p>Einstein received the Nobel Prize for Physics in 1921. He was showered with honours and invitations from all over the world, and lauded by the press.</p>
    
    <p>When the Nazis came to power in Germany in 1933, Einstein emigrated to the United States. Five years later, the discovery of nuclear fission in Berlin had American physicists <span class="highlight-vocab">in an uproar<span class="vocab-tooltip">very upset</span></span>. Many of them had fled from Fascism, just as Einstein had, and now they were afraid the Nazis could build and use an atomic bomb.</p>
    
    <div class="vocabulary-note">
        <div class="word">in an uproar</div>
        <div class="definition">very upset</div>
    </div>
    
    <p>At the urging of a colleague, Einstein wrote a letter to the American President, Franklin D. Roosevelt, on 2 August 1939, in which he warned: "A single bomb of this type . . . exploded in a port, might very well destroy the whole port together with some of the surrounding territory." His words did not fail to have an effect. The Americans developed the atomic bomb in a secret project of their own, and dropped it on the Japanese cities of Hiroshima and Nagasaki in August 1945.</p>
    
    <p>Einstein was deeply shaken by the extent of the destruction. This time he wrote a public <span class="highlight-vocab">missive<span class="vocab-tooltip">letter, especially long and official</span></span> to the United Nations. In it he proposed the formation of a world government. Unlike the letter to Roosevelt, this one made no impact. But over the next decade, Einstein got ever more involved in politics — agitating for an end to the arms buildup and using his popularity to campaign for peace and democracy.</p>
    
    <div class="vocabulary-note">
        <div class="word">missive</div>
        <div class="definition">letter, especially long and official</div>
    </div>
    
    <p>When Einstein died in 1955 at the age of 76, he was celebrated as a <span class="highlight-vocab">visionary<span class="vocab-tooltip">a person who can think about the future in an original and intelligent way</span></span> and world citizen as much as a scientific genius.</p>
    
    <div class="vocabulary-note">
        <div class="word">visionary</div>
        <div class="definition">a person who can think about the future in an original and intelligent way</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why did Einstein's mother think he was a freak?</div>
        <div class="comprehension-question">2. What did Einstein's playmates call him and why?</div>
        <div class="comprehension-question">3. Why did Einstein leave school at the age of 15?</div>
        <div class="comprehension-question">4. Why did Einstein write a letter to President Roosevelt?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">THE LAKE ISLE OF INNISFREE</p>
        <p class="poem-author">by William Butler Yeats</p>
        
        <div class="poem-stanza">
            <p class="poem-line">I will arise and go now, and go to Innisfree,</p>
            <p class="poem-line">And a small cabin build there, of clay and <span class="highlight-vocab">wattles<span class="vocab-tooltip">twisted sticks for making fences, walls</span></span> made:</p>
            <p class="poem-line">Nine bean-rows will I have there, a hive for the honeybee,</p>
            <p class="poem-line">And live alone in the bee-loud <span class="highlight-vocab">glade<span class="vocab-tooltip">clearing; open space</span></span>.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">And I shall have some peace there, for peace comes dropping slow</p>
            <p class="poem-line">Dropping from the veils of the morning to where the cricket sings;</p>
            <p class="poem-line">There midnight's all a glimmer, and noon a purple glow,</p>
            <p class="poem-line">And evenings full of the <span class="highlight-vocab">linnet's<span class="vocab-tooltip">a small brown and grey bird with a short beak</span></span> wings.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">I will arise and go now, for always night and day</p>
            <p class="poem-line">I hear the lake water lapping with low sounds by the shore;</p>
            <p class="poem-line">While I stand on the roadway, or on the pavements grey,</p>
            <p class="poem-line">I hear it in the deep heart's core.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">wattles</div>
        <div class="definition">twisted sticks for making fences, walls</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">glade</div>
        <div class="definition">clearing; open space</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">linnet's</div>
        <div class="definition">a small brown and grey bird with a short beak</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What does the poet plan to build at Innisfree?</div>
        <div class="comprehension-question">2. What natural sounds will the poet hear at Innisfree?</div>
        <div class="comprehension-question">3. Where is the poet currently standing in the last stanza?</div>
        <div class="comprehension-question">4. What does "peace comes dropping slow" mean?</div>
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
    let currentChunk = "A Truly Beautiful Mind, about Albert Einstein. ";
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