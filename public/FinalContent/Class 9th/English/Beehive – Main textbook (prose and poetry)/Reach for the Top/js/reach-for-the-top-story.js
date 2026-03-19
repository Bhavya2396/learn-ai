/**
 * Story and poem content and functionality for Reach for the Top
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Santosh Yadav story content data
const santoshStoryContent = `
    <p>The only woman in the world who has <span class="highlight-vocab">scaled<span class="vocab-tooltip">climbed to the top of</span></span> Mt Everest twice was born in a society where the birth of a son was regarded as a blessing, and a daughter, though not considered a curse, was not generally welcome. When her mother was expecting Santosh, a travelling 'holy man', giving her his blessing, <span class="highlight-vocab">assumed<span class="vocab-tooltip">took to be true without proof</span></span> that she wanted a son. But, to everyone's surprise, the unborn child's grandmother, who was standing close by, told him that they did not want a son. The 'holy man' was also surprised! Nevertheless, he gave the requested blessing . . . and as destiny would have it, the blessing seemed to work. Santosh was born the sixth child in a family with five sons, a sister to five brothers. She was born in the small village of Joniyawas of Rewari District in Haryana.</p>

    <div class="vocabulary-note">
        <div class="word">scaled</div>
        <div class="definition">climbed to the top of</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">assumed</div>
        <div class="definition">took to be true without proof</div>
    </div>
    
    <p>The girl was given the name 'Santosh', which means contentment. But Santosh was not always content with her place in a traditional way of life. She began living life on her own terms from the start. Where other girls wore traditional Indian dresses, Santosh preferred shorts. Looking back, she says now, "From the very beginning I was quite determined that if I chose a correct and a <span class="highlight-vocab">rational<span class="vocab-tooltip">based on reason; sensible</span></span> path, the others around me had to change, not me."</p>

    <div class="vocabulary-note">
        <div class="word">rational</div>
        <div class="definition">based on reason; sensible</div>
    </div>
    
    <p>Santosh's parents were <span class="highlight-vocab">affluent<span class="vocab-tooltip">wealthy</span></span> landowners who could afford to send their children to the best schools, even to the country's capital, New Delhi, which was quite close by. But, in line with the <span class="highlight-vocab">prevailing custom<span class="vocab-tooltip">the usual way of doing things</span></span> in the family, Santosh had to make do with the local village school. So, she decided to fight the system in her own quiet way when the right moment arrived. And the right moment came when she turned sixteen. At sixteen, most of the girls in her village used to get married. Santosh was also under pressure from her parents to do the same.</p>

    <div class="vocabulary-note">
        <div class="word">affluent</div>
        <div class="definition">wealthy</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">prevailing custom</div>
        <div class="definition">the usual way of doing things</div>
    </div>
    
    <p>A marriage as early as that was the <span class="highlight-vocab">last thing<span class="vocab-tooltip">the least important thing</span></span> on her mind. She threatened her parents that she would never marry if she did not get a proper education. She left home and got herself enrolled in a school in Delhi. When her parents refused to pay for her education, she politely informed them of her plans to earn money by working part time to pay her school fees. Her parents then agreed to pay for her education.</p>

    <div class="vocabulary-note">
        <div class="word">last thing</div>
        <div class="definition">the least important thing</div>
    </div>
    
    <p>Wishing always to study "a bit more" and with her father slowly getting used to her <span class="highlight-vocab">urge<span class="vocab-tooltip">strong desire</span></span> for more education, Santosh passed the high school examinations and went to Jaipur. She joined Maharani College and got a room in Kasturba Hostel. Santosh remembers, "Kasturba Hostel faced the Aravalli Hills. I used to watch villagers from my room, going up the hill and suddenly vanishing after a while. One day I decided to <span class="highlight-vocab">check it out<span class="vocab-tooltip">find out (the truth)</span></span> myself. I found nobody except a few mountaineers. I asked if I could join them. To my pleasant surprise, they answered in the affirmative and motivated me to take to climbing."</p>

    <div class="vocabulary-note">
        <div class="word">urge</div>
        <div class="definition">strong desire</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">check it out</div>
        <div class="definition">find out (the truth)</div>
    </div>
    
    <p>Then there was no looking back for this determined young girl. She saved money and enrolled in a course at Uttarkashi's Nehru Institute of Mountaineering. "My college semester in Jaipur was to end in April but it ended on the nineteenth of May. And I was supposed to be in Uttarkashi on the twenty-first. So, I did not go back home; instead, I <span class="highlight-vocab">headed straight for<span class="vocab-tooltip">went towards</span></span> the training. I had to write a letter of apology to my father without whose permission I had got myself enrolled at Uttarkashi."</p>

    <div class="vocabulary-note">
        <div class="word">headed straight for</div>
        <div class="definition">went towards</div>
    </div>
    
    <p>Thereafter, Santosh went on an expedition every year. Her climbing skills matured rapidly. Also, she developed a remarkable resistance to cold and the altitude. Equipped with an iron will, physical <span class="highlight-vocab">endurance<span class="vocab-tooltip">the ability to continue despite fatigue</span></span> and an amazing mental toughness, she proved herself repeatedly. The <span class="highlight-vocab">culmination<span class="vocab-tooltip">the highest point</span></span> of her hard work and sincerity came in 1992, just four years after she had shyly asked the Aravalli mountaineers if she could join them. At barely twenty years of age, Santosh Yadav scaled Mt Everest, becoming the youngest woman in the world to achieve the feat. If her climbing skills, physical fitness, and mental strength impressed her seniors, her concern for others and desire to work together with them found her a special place in the hearts of fellow climbers.</p>

    <div class="vocabulary-note">
        <div class="word">endurance</div>
        <div class="definition">the ability to continue despite fatigue</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">culmination</div>
        <div class="definition">the highest point</div>
    </div>
    
    <p>During the 1992 Everest mission, Santosh Yadav provided special care to a climber who lay dying at the South Col. She was unfortunately unsuccessful in saving him. However, she managed to save another climber, Mohan Singh, who would have met with the same fate had she not shared her oxygen with him.</p>
    
    <p>Within twelve months, Santosh found herself a member of an Indo-Nepalese Women's Expedition that invited her to join them. She then scaled the Everest a second time, thus setting a record as the only woman to have scaled the Everest twice, and securing for herself and India a unique place in the <span class="highlight-vocab">annals<span class="vocab-tooltip">historical records</span></span> of mountaineering. In recognition of her achievements, the Indian government bestowed upon her one of the nation's <span class="highlight-vocab">top honours<span class="vocab-tooltip">highest awards</span></span>, the Padmashri.</p>

    <div class="vocabulary-note">
        <div class="word">annals</div>
        <div class="definition">historical records</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">top honours</div>
        <div class="definition">highest awards</div>
    </div>
    
    <p>Describing her feelings when she was literally 'on top of the world', Santosh has said, "It took some time for the <span class="highlight-vocab">enormity of the moment<span class="vocab-tooltip">a very great moment</span></span> to <span class="highlight-vocab">sink in<span class="vocab-tooltip">be understood</span></span> ... Then I unfurled the Indian tricolour and <span class="highlight-vocab">held it aloft<span class="vocab-tooltip">held it up high</span></span> on the roof of the world. The feeling is indescribable. The Indian flag was flying on top of the world. It was truly a spiritual moment. I felt proud as an Indian."</p>

    <div class="vocabulary-note">
        <div class="word">enormity of the moment</div>
        <div class="definition">a very great moment</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">sink in</div>
        <div class="definition">be understood</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">held it aloft</div>
        <div class="definition">held it up high</div>
    </div>
    
    <p>Also a <span class="highlight-vocab">fervent<span class="vocab-tooltip">having strong and sincere feelings</span></span> environmentalist, Santosh collected and brought down 500 kilograms of garbage from the Himalayas.</p>

    <div class="vocabulary-note">
        <div class="word">fervent</div>
        <div class="definition">having strong and sincere feelings</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why was the 'holy man' surprised?</div>
        <div class="comprehension-question">2. What was Santosh determined about from the beginning?</div>
        <div class="comprehension-question">3. How did Santosh first become interested in mountaineering?</div>
        <div class="comprehension-question">4. What records did Santosh Yadav set?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load Santosh Yadav story content
    const santoshContentDiv = document.getElementById('santoshStoryContent');
    if (santoshContentDiv) {
        santoshContentDiv.innerHTML = santoshStoryContent;
    }
    
    // Load Maria Sharapova story content
    const mariaContentDiv = document.getElementById('mariaStoryContent');
    if (mariaContentDiv) {
        mariaContentDiv.innerHTML = mariaStoryContent;
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
    
    // Add read aloud button for Santosh Yadav story
    const santoshBtn = document.createElement('button');
    santoshBtn.className = 'interactive-btn read-part-btn';
    santoshBtn.innerHTML = '🔊 Read Story Aloud';
    santoshBtn.setAttribute('aria-label', 'Read Santosh Yadav story aloud');
    santoshBtn.onclick = function() { readStoryAloud(); };
    
    // Add button container to Santosh Yadav story content if it doesn't exist
    if (santoshContentDiv) {
        let buttonContainer = santoshContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            santoshContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(santoshBtn);
    }

    // Add read aloud button for Maria Sharapova story
    const mariaBtn = document.createElement('button');
    mariaBtn.className = 'interactive-btn read-part-btn';
    mariaBtn.innerHTML = '🔊 Read Story Aloud';
    mariaBtn.setAttribute('aria-label', 'Read Maria Sharapova story aloud');
    mariaBtn.onclick = function() { readMariaStoryAloud(); };
    
    // Add button container to Maria Sharapova story content if it doesn't exist
    if (mariaContentDiv) {
        let buttonContainer = mariaContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            mariaContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(mariaBtn);
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
    // If we're in the Santosh Yadav story module, read that story
    if (document.getElementById('santosh-story').classList.contains('active')) {
        readStoryAloud();
    }
    // If we're in the Maria Sharapova story module, read that story
    else if (document.getElementById('maria-story').classList.contains('active')) {
        readMariaStoryAloud();
    }
    // If we're in the poem module, read the poem
    else if (document.getElementById('poem').classList.contains('active')) {
        readPoemAloud();
    }
}

// Read Santosh Yadav story aloud function - using chunks for better performance
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
    const storyContentDiv = document.getElementById('santoshStoryContent');
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
    let currentChunk = "Reach for the Top, Part I: Santosh Yadav. ";
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
    readTextChunksSequentially(textChunks, 'santosh-story');
}

// Read Maria Sharapova story aloud function - using chunks for better performance
function readMariaStoryAloud() {
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
    const storyContentDiv = document.getElementById('mariaStoryContent');
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
    let currentChunk = "Reach for the Top, Part II: Maria Sharapova. ";
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
    readTextChunksSequentially(textChunks, 'maria-story');
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
    let contentDiv;
    if (contentType === 'santosh-story') {
        contentDiv = document.getElementById('santoshStoryContent');
    } else if (contentType === 'maria-story') {
        contentDiv = document.getElementById('mariaStoryContent');
    } else if (contentType === 'poem') {
        contentDiv = document.getElementById('poemContent');
    }
    
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
    
    // Find the story content container (based on active module)
    let storyContent;
    if (document.getElementById('santosh-story').classList.contains('active')) {
        storyContent = document.getElementById('santoshStoryContent');
    } else if (document.getElementById('maria-story').classList.contains('active')) {
        storyContent = document.getElementById('mariaStoryContent');
    }
    
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
    if (document.getElementById('santosh-story').classList.contains('active')) {
        contentContainer = document.getElementById('santoshStoryContent');
    } else if (document.getElementById('maria-story').classList.contains('active')) {
        contentContainer = document.getElementById('mariaStoryContent');
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

// Maria Sharapova story content data
const mariaStoryContent = `
    <p>There is something <span class="highlight-vocab">disarming<span class="vocab-tooltip">friendly and removing suspicion</span></span> about Maria Sharapova, something <span class="highlight-vocab">at odds with<span class="vocab-tooltip">in contrast to; not agreeing with</span></span> her ready smile and <span class="highlight-vocab">glamorous attire<span class="vocab-tooltip">attractive and exciting clothes</span></span>. And that something in her lifted her on Monday, 22 August 2005 to the world number one position in women's tennis. All this happened <span class="highlight-vocab">in almost no time<span class="vocab-tooltip">quickly, almost immediately</span></span>. <span class="highlight-vocab">Poised beyond her years<span class="vocab-tooltip">more calm, confident than people of her age usually are</span></span>, the Siberian born teenager took just four years as a professional to reach the pinnacle.</p>

    <div class="vocabulary-note">
        <div class="word">disarming</div>
        <div class="definition">friendly and removing suspicion</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">at odds with</div>
        <div class="definition">in contrast to; not agreeing with</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">glamorous attire</div>
        <div class="definition">attractive and exciting clothes</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">in almost no time</div>
        <div class="definition">quickly, almost immediately</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">poised beyond her years</div>
        <div class="definition">more calm, confident than people of her age usually are</div>
    </div>
    
    <p>However, the rapid <span class="highlight-vocab">ascent<span class="vocab-tooltip">rise, climb</span></span> in a fiercely competitive world began nine years before with a level of sacrifice few children would be prepared to endure. Little Maria had not yet celebrated her tenth birthday when she was <span class="highlight-vocab">packed off<span class="vocab-tooltip">sent off</span></span> to train in the United States. That trip to Florida with her father Yuri <span class="highlight-vocab">launched<span class="vocab-tooltip">started</span></span> her on the path to success and stardom. But it also required a <span class="highlight-vocab">heart-wrenching<span class="vocab-tooltip">causing strong feelings of sadness</span></span> two-year separation from her mother Yelena. The latter was compelled to stay back in Siberia because of visa restrictions. The nine-year-old girl had already learnt an important lesson in life — that tennis excellence would only come at a price.</p>

    <div class="vocabulary-note">
        <div class="word">ascent</div>
        <div class="definition">rise, climb</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">packed off</div>
        <div class="definition">sent off</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">launched</div>
        <div class="definition">started</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">heart-wrenching</div>
        <div class="definition">causing strong feelings of sadness</div>
    </div>
    
    <p>"I used to be so lonely," Maria Sharapova recalls. "I missed my mother terribly. My father was working as much as he could to keep my tennis-training going. So, he couldn't see me either.</p>
    
    <p>"Because I was so young, I used to go to bed at 8 p.m. The other tennis pupils would come in at 11 p.m. and wake me up and order me to tidy up the room and clean it.</p>
    
    <p>"Instead of letting that depress me, I became more quietly determined and mentally tough. I learnt how to take care of myself. I never thought of quitting because I knew what I wanted. When you come from nothing and you have nothing, then it makes you very hungry and determined . . . I would have put up with much more humiliation and insults than that to <span class="highlight-vocab">steadfastly<span class="vocab-tooltip">firmly and resolutely</span></span> pursue my dream."</p>

    <div class="vocabulary-note">
        <div class="word">steadfastly</div>
        <div class="definition">firmly and resolutely</div>
    </div>
    
    <p>That toughness runs through Maria even today. It was the key to her bagging the women's singles crown at Wimbledon in 2004 and to her <span class="highlight-vocab">meteoric<span class="vocab-tooltip">very rapid</span></span> rise to the world number one spot the following year.</p>

    <div class="vocabulary-note">
        <div class="word">meteoric</div>
        <div class="definition">very rapid</div>
    </div>
    
    <p>While her journey from the frozen plains of Siberia to the summit of women's tennis has touched the hearts of tennis fans, for the youngster herself there appears to be no room for <span class="highlight-vocab">sentiment<span class="vocab-tooltip">tender feelings</span></span>. The straight looks and the answers she gives when asked about her ambition make it <span class="highlight-vocab">amply<span class="vocab-tooltip">sufficiently</span></span> clear that she considers the sacrifices were worth it. "I am very, very competitive. I work hard at what I do. It's my job." This is her mantra for success.</p>

    <div class="vocabulary-note">
        <div class="word">sentiment</div>
        <div class="definition">tender feelings</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">amply</div>
        <div class="definition">sufficiently</div>
    </div>
    
    <p>Though Maria Sharapova speaks with a pronounced American accent, she proudly <span class="highlight-vocab">parades<span class="vocab-tooltip">displays proudly</span></span> her Russian nationality. Clearing all doubts, she says, "I'm Russian. It's true that the U.S. is a big part of my life. But I have Russian citizenship. My blood is totally Russian. I will play the Olympics for Russia if they want me."</p>

    <div class="vocabulary-note">
        <div class="word">parades</div>
        <div class="definition">displays proudly</div>
    </div>
    
    <p>Like any number of teenaged <span class="highlight-vocab">sensations<span class="vocab-tooltip">people who cause great excitement</span></span>, Maria Sharapova lists fashion, singing and dancing as her hobbies. She loves reading the novels of Arthur Conan Doyle. Her fondness for sophisticated evening gowns appears at odds with her love of pancakes with chocolate spread and fizzy orange drinks.</p>

    <div class="vocabulary-note">
        <div class="word">sensations</div>
        <div class="definition">people who cause great excitement</div>
    </div>
    
    <p>Maria Sharapova cannot be <span class="highlight-vocab">pigeon-holed<span class="vocab-tooltip">classified too simply</span></span> or categorised. Her talent, unwavering desire to succeed and readiness to sacrifice have lifted her to the top of the world. Few would <span class="highlight-vocab">grudge<span class="vocab-tooltip">be reluctant to give</span></span> her the riches she is now reaping. This is what she has to say about her monetary gains from tennis: "Of course, money is a motivation. Tennis is a business and a sport, but the most important thing is to become number one in the world. That's the dream that kept me going."</p>

    <div class="vocabulary-note">
        <div class="word">pigeon-holed</div>
        <div class="definition">classified too simply</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">grudge</div>
        <div class="definition">be reluctant to give</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why was Maria sent to the United States?</div>
        <div class="comprehension-question">2. What made her mentally tough?</div>
        <div class="comprehension-question">3. What does Maria say about her nationality?</div>
        <div class="comprehension-question">4. What is her 'mantra for success'?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load Santosh Yadav story content
    const santoshContentDiv = document.getElementById('santoshStoryContent');
    if (santoshContentDiv) {
        santoshContentDiv.innerHTML = santoshStoryContent;
    }
    
    // Load Maria Sharapova story content
    const mariaContentDiv = document.getElementById('mariaStoryContent');
    if (mariaContentDiv) {
        mariaContentDiv.innerHTML = mariaStoryContent;
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
    
    // Add read aloud button for Santosh Yadav story
    const santoshBtn = document.createElement('button');
    santoshBtn.className = 'interactive-btn read-part-btn';
    santoshBtn.innerHTML = '🔊 Read Story Aloud';
    santoshBtn.setAttribute('aria-label', 'Read Santosh Yadav story aloud');
    santoshBtn.onclick = function() { readStoryAloud(); };
    
    // Add button container to Santosh Yadav story content if it doesn't exist
    if (santoshContentDiv) {
        let buttonContainer = santoshContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            santoshContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(santoshBtn);
    }

    // Add read aloud button for Maria Sharapova story
    const mariaBtn = document.createElement('button');
    mariaBtn.className = 'interactive-btn read-part-btn';
    mariaBtn.innerHTML = '🔊 Read Story Aloud';
    mariaBtn.setAttribute('aria-label', 'Read Maria Sharapova story aloud');
    mariaBtn.onclick = function() { readMariaStoryAloud(); };
    
    // Add button container to Maria Sharapova story content if it doesn't exist
    if (mariaContentDiv) {
        let buttonContainer = mariaContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            mariaContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(mariaBtn);
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
    // If we're in the Santosh Yadav story module, read that story
    if (document.getElementById('santosh-story').classList.contains('active')) {
        readStoryAloud();
    }
    // If we're in the Maria Sharapova story module, read that story
    else if (document.getElementById('maria-story').classList.contains('active')) {
        readMariaStoryAloud();
    }
    // If we're in the poem module, read the poem
    else if (document.getElementById('poem').classList.contains('active')) {
        readPoemAloud();
    }
}

// Read Santosh Yadav story aloud function - using chunks for better performance
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
    const storyContentDiv = document.getElementById('santoshStoryContent');
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
    let currentChunk = "Reach for the Top, Part I: Santosh Yadav. ";
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
    readTextChunksSequentially(textChunks, 'santosh-story');
}

// Read Maria Sharapova story aloud function - using chunks for better performance
function readMariaStoryAloud() {
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
    const storyContentDiv = document.getElementById('mariaStoryContent');
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
    let currentChunk = "Reach for the Top, Part II: Maria Sharapova. ";
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
    readTextChunksSequentially(textChunks, 'maria-story');
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
    let contentDiv;
    if (contentType === 'santosh-story') {
        contentDiv = document.getElementById('santoshStoryContent');
    } else if (contentType === 'maria-story') {
        contentDiv = document.getElementById('mariaStoryContent');
    } else if (contentType === 'poem') {
        contentDiv = document.getElementById('poemContent');
    }
    
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
    
    // Find the story content container (based on active module)
    let storyContent;
    if (document.getElementById('santosh-story').classList.contains('active')) {
        storyContent = document.getElementById('santoshStoryContent');
    } else if (document.getElementById('maria-story').classList.contains('active')) {
        storyContent = document.getElementById('mariaStoryContent');
    }
    
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
    if (document.getElementById('santosh-story').classList.contains('active')) {
        contentContainer = document.getElementById('santoshStoryContent');
    } else if (document.getElementById('maria-story').classList.contains('active')) {
        contentContainer = document.getElementById('mariaStoryContent');
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

// Poem content data - On Killing a Tree by Gieve Patel
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">ON KILLING A TREE</p>
        <p class="poem-author">by Gieve Patel</p>
        
        <div class="poem-stanza">
            <p class="poem-line">It takes much time to kill a tree,</p>
            <p class="poem-line">Not a simple <span class="highlight-vocab">jab<span class="vocab-tooltip">sudden rough blow</span></span> of the knife</p>
            <p class="poem-line">Will do it. It has grown</p>
            <p class="poem-line">Slowly consuming the earth,</p>
            <p class="poem-line">Rising out of it, feeding</p>
            <p class="poem-line">Upon its crust, absorbing</p>
            <p class="poem-line">Years of sunlight, air, water,</p>
            <p class="poem-line">And out of its <span class="highlight-vocab">leprous hide<span class="vocab-tooltip">discoloured bark</span></span></p>
            <p class="poem-line">Sprouting leaves.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">So <span class="highlight-vocab">hack<span class="vocab-tooltip">cut roughly by striking heavy blows</span></span> and chop</p>
            <p class="poem-line">But this alone wont do it.</p>
            <p class="poem-line">Not so much pain will do it.</p>
            <p class="poem-line">The bleeding bark will heal</p>
            <p class="poem-line">And from close to the ground</p>
            <p class="poem-line">Will rise curled green twigs,</p>
            <p class="poem-line">Miniature boughs</p>
            <p class="poem-line">Which if unchecked will expand again</p>
            <p class="poem-line">To former size.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">No,</p>
            <p class="poem-line">The root is to be pulled out —</p>
            <p class="poem-line">Out of the <span class="highlight-vocab">anchoring earth<span class="vocab-tooltip">Trees are held securely with the help of the roots in the earth</span></span>;</p>
            <p class="poem-line">It is to be roped, tied,</p>
            <p class="poem-line">And pulled out — <span class="highlight-vocab">snapped out<span class="vocab-tooltip">chopped out</span></span></p>
            <p class="poem-line">Or pulled out entirely,</p>
            <p class="poem-line">Out from the earth-cave,</p>
            <p class="poem-line">And the strength of the tree exposed</p>
            <p class="poem-line">The source, white and wet,</p>
            <p class="poem-line">The most sensitive, hidden</p>
            <p class="poem-line">For years inside the earth.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Then the matter</p>
            <p class="poem-line">Of <span class="highlight-vocab">scorching and choking<span class="vocab-tooltip">the drying up of the tree after being uprooted</span></span></p>
            <p class="poem-line">In sun and air,</p>
            <p class="poem-line">Browning, hardening,</p>
            <p class="poem-line">Twisting, withering,</p>
            <p class="poem-line">And then it is done.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">jab</div>
        <div class="definition">sudden rough blow</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">leprous hide</div>
        <div class="definition">discoloured bark</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">hack</div>
        <div class="definition">cut roughly by striking heavy blows</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">anchoring earth</div>
        <div class="definition">Trees are held securely with the help of the roots in the earth</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">snapped out</div>
        <div class="definition">chopped out</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">scorching and choking</div>
        <div class="definition">the drying up of the tree after being uprooted</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What does the poem say about how difficult it is to kill a tree?</div>
        <div class="comprehension-question">2. What happens when you merely cut a tree?</div>
        <div class="comprehension-question">3. What does the poet mean by "the strength of the tree exposed"?</div>
        <div class="comprehension-question">4. What finally kills the tree?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load Santosh Yadav story content
    const santoshContentDiv = document.getElementById('santoshStoryContent');
    if (santoshContentDiv) {
        santoshContentDiv.innerHTML = santoshStoryContent;
    }
    
    // Load Maria Sharapova story content
    const mariaContentDiv = document.getElementById('mariaStoryContent');
    if (mariaContentDiv) {
        mariaContentDiv.innerHTML = mariaStoryContent;
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
    
    // Add read aloud button for Santosh Yadav story
    const santoshBtn = document.createElement('button');
    santoshBtn.className = 'interactive-btn read-part-btn';
    santoshBtn.innerHTML = '🔊 Read Story Aloud';
    santoshBtn.setAttribute('aria-label', 'Read Santosh Yadav story aloud');
    santoshBtn.onclick = function() { readStoryAloud(); };
    
    // Add button container to Santosh Yadav story content if it doesn't exist
    if (santoshContentDiv) {
        let buttonContainer = santoshContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            santoshContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(santoshBtn);
    }

    // Add read aloud button for Maria Sharapova story
    const mariaBtn = document.createElement('button');
    mariaBtn.className = 'interactive-btn read-part-btn';
    mariaBtn.innerHTML = '🔊 Read Story Aloud';
    mariaBtn.setAttribute('aria-label', 'Read Maria Sharapova story aloud');
    mariaBtn.onclick = function() { readMariaStoryAloud(); };
    
    // Add button container to Maria Sharapova story content if it doesn't exist
    if (mariaContentDiv) {
        let buttonContainer = mariaContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            mariaContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(mariaBtn);
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
    // If we're in the Santosh Yadav story module, read that story
    if (document.getElementById('santosh-story').classList.contains('active')) {
        readStoryAloud();
    }
    // If we're in the Maria Sharapova story module, read that story
    else if (document.getElementById('maria-story').classList.contains('active')) {
        readMariaStoryAloud();
    }
    // If we're in the poem module, read the poem
    else if (document.getElementById('poem').classList.contains('active')) {
        readPoemAloud();
    }
}

// Read Santosh Yadav story aloud function - using chunks for better performance
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
    const storyContentDiv = document.getElementById('santoshStoryContent');
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
    let currentChunk = "Reach for the Top, Part I: Santosh Yadav. ";
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
    readTextChunksSequentially(textChunks, 'santosh-story');
}

// Read Maria Sharapova story aloud function - using chunks for better performance
function readMariaStoryAloud() {
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
    const storyContentDiv = document.getElementById('mariaStoryContent');
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
    let currentChunk = "Reach for the Top, Part II: Maria Sharapova. ";
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
    readTextChunksSequentially(textChunks, 'maria-story');
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
    let contentDiv;
    if (contentType === 'santosh-story') {
        contentDiv = document.getElementById('santoshStoryContent');
    } else if (contentType === 'maria-story') {
        contentDiv = document.getElementById('mariaStoryContent');
    } else if (contentType === 'poem') {
        contentDiv = document.getElementById('poemContent');
    }
    
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
    
    // Find the story content container (based on active module)
    let storyContent;
    if (document.getElementById('santosh-story').classList.contains('active')) {
        storyContent = document.getElementById('santoshStoryContent');
    } else if (document.getElementById('maria-story').classList.contains('active')) {
        storyContent = document.getElementById('mariaStoryContent');
    }
    
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
    if (document.getElementById('santosh-story').classList.contains('active')) {
        contentContainer = document.getElementById('santoshStoryContent');
    } else if (document.getElementById('maria-story').classList.contains('active')) {
        contentContainer = document.getElementById('mariaStoryContent');
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
