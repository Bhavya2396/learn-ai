/**
 * Story and poem content and functionality for My Childhood
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>I WAS born into a middle-class Tamil family in the island town of Rameswaram in the <span class="highlight-vocab">erstwhile<span class="vocab-tooltip">former</span></span> Madras State. My father, Jainulabdeen, had neither much formal education nor much wealth; despite these disadvantages, he possessed great <span class="highlight-vocab">innate<span class="vocab-tooltip">inborn; (a quality or feeling) in one's nature</span></span> wisdom and a true generosity of spirit. He had an ideal helpmate in my mother, Ashiamma. I do not recall the exact number of people she fed every day, but I am quite certain that far more outsiders ate with us than all the members of our own family put together.</p>
    
    <div class="vocabulary-note">
        <div class="word">erstwhile</div>
        <div class="definition">former</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">innate</div>
        <div class="definition">inborn; (a quality or feeling) in one's nature</div>
    </div>
    
    <p>I was one of many children — a short boy with rather undistinguished looks, born to tall and handsome parents. We lived in our ancestral house, which was built in the middle of the nineteenth century. It was a fairly large pucca house, made of limestone and brick, on the Mosque Street in Rameswaram. My <span class="highlight-vocab">austere<span class="vocab-tooltip">simple, strict and severe</span></span> father used to avoid all inessential comforts and luxuries. However, all necessities were provided for, in terms of food, medicine or clothes. In fact, I would say mine was a very secure childhood, both materially and emotionally.</p>
    
    <div class="vocabulary-note">
        <div class="word">austere</div>
        <div class="definition">simple, strict and severe</div>
    </div>
    
    <p>The Second World War broke out in 1939, when I was eight years old. For reasons I have never been able to understand, a sudden demand for tamarind seeds erupted in the market. I used to collect the seeds and sell them to a provision shop on Mosque Street. A day's collection would fetch me the <span class="highlight-vocab">princely sum<span class="vocab-tooltip">generous amount (here, ironic)</span></span> of one <span class="highlight-vocab">anna<span class="vocab-tooltip">an old Indian coin, worth about six paise</span></span>. My brother-in-law Jallaluddin would tell me stories about the War which I would later attempt to trace in the headlines in Dinamani. Our area, being isolated, was completely unaffected by the War. But soon India was forced to join the <span class="highlight-vocab">Allied Forces<span class="vocab-tooltip">the armies of U.K., U.S.A. and Russia during the Second World War</span></span> and something like a state of emergency was declared. The first casualty came in the form of the suspension of the train halt at Rameswaram station. The newspapers now had to be bundled and thrown out from the moving train on the Rameswaram Road between Rameswaram and Dhanuskodi. That forced my cousin Samsuddin, who distributed newspapers in Rameswaram , to look for a helping hand to catch the bundles and, as if naturally, I filled the slot. Samsuddin helped me earn my first wages. Half a century later, I can still feel the surge of pride in earning my own money for the first time.</p>
    
    <div class="vocabulary-note">
        <div class="word">princely sum</div>
        <div class="definition">generous amount (here, ironic)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">anna</div>
        <div class="definition">an old Indian coin, worth about six paise</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">Allied Forces</div>
        <div class="definition">the armies of U.K., U.S.A. and Russia during the Second World War</div>
    </div>
    
    <p>Every child is born, with some inherited characteristics, into a specific socio-economic and emotional environment, and trained in certain ways by figures of authority. I inherited honesty and self-discipline from my father; from my mother, I inherited faith in goodness and deep kindness and so did my three brothers and sister. I had three close friends in my childhood — Ramanadha Sastry, Aravindan and Sivaprakasan. All these boys were from orthodox Hindu Brahmin families. As children, none of us ever felt any difference amongst ourselves because of our religious differences and upbringing. In fact, Ramanadha Sastry was the son of Pakshi Lakshmana Sastry, the high priest of the Rameswaram temple. Later, he took over the priesthood of the Rameswaram temple from his father; Aravindan went into the business of arranging transport for visiting pilgrims; and Sivaprakasan became a catering contractor for the Southern Railways.</p>
    
    <p>During the annual Shri Sita Rama Kalyanam ceremony, our family used to arrange boats with a special platform for carrying idols of the Lord from the temple to the marriage site, situated in the middle of the pond called Rama Tirtha which was near our house. Events from the Ramayana and from the life of the Prophet were the bedtime stories my mother and grandmother would tell the children in our family.</p>
    
    <p>One day when I was in the fifth standard at the Rameswaram Elementary School, a new teacher came to our class. I used to wear a cap which marked me as a Muslim, and I always sat in the front row next to Ramanadha Sastry, who wore the sacred thread. The new teacher <span class="highlight-vocab">could not stomach<span class="vocab-tooltip">could not tolerate</span></span> a Hindu priest's son sitting with a Muslim boy. In accordance with our social ranking as the new teacher saw it, I was asked to go and sit on the back bench. I felt very sad, and so did Ramanadha Sastry. He looked utterly <span class="highlight-vocab">downcast<span class="vocab-tooltip">sad or depressed</span></span> as I shifted to my seat in the last row. The image of him weeping when I shifted to the last row left a lasting impression on me.</p>
    
    <div class="vocabulary-note">
        <div class="word">could not stomach</div>
        <div class="definition">could not tolerate</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">downcast</div>
        <div class="definition">sad or depressed</div>
    </div>
    
    <p>After school, we went home and told our respective parents about the incident. Lakshmana Sastry summoned the teacher, and in our presence, told the teacher that he should not spread the poison of social inequality and communal intolerance in the minds of innocent children. He bluntly asked the teacher to either apologise or quit the school and the island. Not only did the teacher regret his behaviour, but the strong sense of <span class="highlight-vocab">conviction<span class="vocab-tooltip">a strong opinion or belief</span></span> Lakshmana Sastry conveyed ultimately reformed this young teacher.</p>
    
    <div class="vocabulary-note">
        <div class="word">conviction</div>
        <div class="definition">a strong opinion or belief</div>
    </div>
    
    <p>On the whole, the small society of Rameswaram was very rigid in terms of the segregation of different social groups. However, my science teacher Sivasubramania Iyer, though an orthodox Brahmin with a very conservative wife, was something of a rebel. He did his best to break social barriers so that people from varying backgrounds could mingle easily. He used to spend hours with me and would say, "Kalam, I want you to develop so that you are on par with the highly educated people of the big cities."</p>
    
    <p>One day, he invited me to his home for a meal. His wife was horrified at the idea of a Muslim boy being invited to dine in her <span class="highlight-vocab">ritually pure<span class="vocab-tooltip">kept protected from all outside influences for observances of religion</span></span> kitchen. She refused to serve me in her kitchen. Sivasubramania Iyer was not perturbed, nor did he get angry with his wife, but instead, served me with his own hands and sat down beside me to eat his meal. His wife watched us from behind the kitchen door. I wondered whether she had observed any difference in the way I ate rice, drank water or cleaned the floor after the meal. When I was leaving his house, Sivasubramania Iyer invited me to join him for dinner again the next weekend. Observing my hesitation, he told me not to get upset, saying, "Once you decide to change the system, such problems have to be confronted." When I visited his house the next week, Sivasubramania Iyer's wife took me inside her kitchen and served me food with her own hands.</p>
    
    <div class="vocabulary-note">
        <div class="word">ritually pure</div>
        <div class="definition">kept protected from all outside influences for observances of religion</div>
    </div>
    
    <p>Then the Second World War was over and India's freedom was imminent. "Indians will build their own India," declared Gandhiji. The whole country was filled with an unprecedented optimism. I asked my father for permission to leave Rameswaram and study at the district headquarters in Ramanathapuram.</p>
    
    <p>He told me as if thinking aloud, "Abul ! I know you have to go away to grow. Does the seagull not fly across the sun, alone and without a nest?" He quoted Khalil Gibran to my hesitant mother, "Your children are not your children. They are the sons and daughters of Life's longing for itself. They come through you but not from you. You may give them your love but not your thoughts. For they have their own thoughts."</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Where was Abdul Kalam's house located?</div>
        <div class="comprehension-question">2. What did Abdul Kalam's father avoid?</div>
        <div class="comprehension-question">3. How did Abdul Kalam earn his first wages?</div>
        <div class="comprehension-question">4. What characteristics did Abdul Kalam inherit from his parents?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">NO MEN ARE FOREIGN</p>
        <p class="poem-author">by James Kirkup</p>
        
        <div class="poem-stanza">
            <p class="poem-line">Remember, no men are strange, no countries foreign</p>
            <p class="poem-line">Beneath all uniforms, a single body breathes</p>
            <p class="poem-line">Like ours: the land our brothers walk upon</p>
            <p class="poem-line">Is earth like this, in which we all shall lie.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">They, too, aware of sun and air and water,</p>
            <p class="poem-line">Are fed by peaceful harvests, by war's long winter <span class="highlight-vocab">starv'd<span class="vocab-tooltip">starved</span></span>.</p>
            <p class="poem-line">Their hands are ours, and in their lines we read</p>
            <p class="poem-line">A labour not different from our own.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Remember they have eyes like ours that wake</p>
            <p class="poem-line">Or sleep, and strength that can be won</p>
            <p class="poem-line">By love. In every land is common life</p>
            <p class="poem-line">That all can recognise and understand.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Let us remember, whenever we are told</p>
            <p class="poem-line">To hate our brothers, it is ourselves</p>
            <p class="poem-line">That we shall <span class="highlight-vocab">dispossess<span class="vocab-tooltip">dislodge; deprive</span></span>, betray, condemn.</p>
            <p class="poem-line">Remember, we who take arms against each other</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">It is the human earth that we <span class="highlight-vocab">defile<span class="vocab-tooltip">make dirty; pollute</span></span>.</p>
            <p class="poem-line">Our hells of fire and dust <span class="highlight-vocab">outrage the innocence<span class="vocab-tooltip">violate the purity</span></span></p>
            <p class="poem-line">Of air that is everywhere our own,</p>
            <p class="poem-line">Remember, no men are foreign, and no countries strange.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">starv'd</div>
        <div class="definition">starved</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">dispossess</div>
        <div class="definition">dislodge; deprive</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">defile</div>
        <div class="definition">make dirty; pollute</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">outrage the innocence</div>
        <div class="definition">violate the purity</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What does the poet mean by "Beneath all uniforms"?</div>
        <div class="comprehension-question">2. How does the poet suggest that all people on earth are the same?</div>
        <div class="comprehension-question">3. What is the central theme of the poem?</div>
        <div class="comprehension-question">4. According to the poem, what happens when we hate our brothers?</div>
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
    let currentChunk = "My Childhood, by A.P.J. Abdul Kalam. ";
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
