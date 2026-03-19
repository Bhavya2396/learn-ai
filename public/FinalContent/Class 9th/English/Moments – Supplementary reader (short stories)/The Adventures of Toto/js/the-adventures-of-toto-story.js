/**
 * Story content and functionality for The Adventures of Toto
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>Have you ever had a baby monkey as a pet? Toto is a baby monkey. Let's find out whether he is <span class="highlight-vocab">mischievous<span class="vocab-tooltip">playfully causing trouble</span></span> or <span class="highlight-vocab">docile<span class="vocab-tooltip">easily taught, handled, or managed</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">mischievous</div>
        <div class="definition">playfully causing trouble</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">docile</div>
        <div class="definition">easily taught, handled, or managed</div>
    </div>
    
    <p>GRANDFATHER bought Toto from a <span class="highlight-vocab">tonga-driver<span class="vocab-tooltip">a person who drives a horse-drawn carriage</span></span> for the sum of five rupees. The tonga-driver used to keep the little red monkey tied to a <span class="highlight-vocab">feeding-trough<span class="vocab-tooltip">a container for animal food</span></span>, and the monkey looked so out of place there that Grandfather decided he would add the little fellow to his private zoo.</p>
    
    <div class="vocabulary-note">
        <div class="word">tonga-driver</div>
        <div class="definition">a person who drives a horse-drawn carriage</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">feeding-trough</div>
        <div class="definition">a container for animal food</div>
    </div>
    
    <p>Toto was a pretty monkey. His bright eyes sparkled with mischief beneath <span class="highlight-vocab">deep-set<span class="vocab-tooltip">positioned far back</span></span> eyebrows, and his teeth, which were a pearly white, were very often displayed in a smile that frightened the life out of elderly Anglo-lndian ladies. But his hands looked <span class="highlight-vocab">dried-up<span class="vocab-tooltip">withered; shriveled</span></span> as though they had been pickled in the sun for many years. Yet his fingers were quick and <span class="highlight-vocab">wicked<span class="vocab-tooltip">mischievous; naughty</span></span>; and his tail, while adding to his good looks (Grandfather believed a tail would add to anyone's good looks), also served as a third hand. He could use it to hang from a branch; and it was capable of <span class="highlight-vocab">scooping<span class="vocab-tooltip">picking up with a sweeping motion</span></span> up any delicacy that might be out of reach of his hands.</p>
    
    <div class="vocabulary-note">
        <div class="word">deep-set</div>
        <div class="definition">positioned far back</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">dried-up</div>
        <div class="definition">withered; shriveled</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">wicked</div>
        <div class="definition">mischievous; naughty</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">scooping</div>
        <div class="definition">picking up with a sweeping motion</div>
    </div>
    
    <p>Grandmother always <span class="highlight-vocab">fussed<span class="vocab-tooltip">became worried or upset</span></span> when Grandfather brought home some new bird or animal. So it was decided that Toto's presence should be kept a secret from her until she was in a particularly good mood. Grandfather and I put him away in a little <span class="highlight-vocab">closet<span class="vocab-tooltip">a small room for storing things</span></span> opening into my bedroom wall, where he was tied securely — or so we thought — to a <span class="highlight-vocab">peg<span class="vocab-tooltip">a projecting pin or bolt</span></span> fastened into the wall.</p>
    
    <div class="vocabulary-note">
        <div class="word">fussed</div>
        <div class="definition">became worried or upset</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">closet</div>
        <div class="definition">a small room for storing things</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">peg</div>
        <div class="definition">a projecting pin or bolt</div>
    </div>
    
    <p>A few hours later, when Grandfather and I came back to release Toto, we found that the walls, which had been covered with some <span class="highlight-vocab">ornamental<span class="vocab-tooltip">decorative</span></span> paper chosen by Grandfather, now stood out as naked brick and plaster. The peg in the wall had been <span class="highlight-vocab">wrenched<span class="vocab-tooltip">pulled with a violent twist</span></span> from its socket, and my school blazer, which had been hanging there, was in shreds. I wondered what Grandmother would say. But Grandfather didn't worry; he seemed pleased with Toto's performance.</p>
    
    <div class="vocabulary-note">
        <div class="word">ornamental</div>
        <div class="definition">decorative</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">wrenched</div>
        <div class="definition">pulled with a violent twist</div>
    </div>
    
    <p>"He's clever," said Grandfather. "Given time, I'm sure he could have tied the torn pieces of your blazer into a rope, and made his escape from the window!"</p>
    
    <p>His presence in the house still a secret, Toto was now transferred to a big cage in the servants' quarters where a number of Grandfather's pets lived very <span class="highlight-vocab">sociably<span class="vocab-tooltip">in a friendly manner</span></span> together — a tortoise, a pair of rabbits, a tame squirrel and, for a while, my pet goat. But the monkey wouldn't allow any of his companions to sleep at night; so Grandfather, who had to leave Dehra Dun next day to collect his pension in Saharanpur, decided to take him along.</p>
    
    <div class="vocabulary-note">
        <div class="word">sociably</div>
        <div class="definition">in a friendly manner</div>
    </div>
    
    <p>Unfortunately I could not accompany Grandfather on that trip, but he told me about it afterwards. A big black <span class="highlight-vocab">canvas<span class="vocab-tooltip">heavy, closely woven cloth</span></span> kit-bag was provided for Toto. This, with some straw at the bottom, became his new abode. When the bag was closed, there was no escape. Toto could not get his hands through the opening, and the canvas was too strong for him to bite his way through. His efforts to get out only had the effect of making the bag roll about on the floor or occasionally jump into the air — an <span class="highlight-vocab">exhibition<span class="vocab-tooltip">a public display or show</span></span> that attracted a curious crowd of onlookers on the Dehra Dun railway platform.</p>
    
    <div class="vocabulary-note">
        <div class="word">canvas</div>
        <div class="definition">heavy, closely woven cloth</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">exhibition</div>
        <div class="definition">a public display or show</div>
    </div>
    
    <p>Toto remained in the bag as far as Saharanpur, but while Grandfather was producing his ticket at the railway <span class="highlight-vocab">turnstile<span class="vocab-tooltip">a mechanical gate consisting of revolving horizontal arms</span></span>, Toto suddenly poked his head out of the bag and gave the ticket-collector a wide grin.</p>
    
    <div class="vocabulary-note">
        <div class="word">turnstile</div>
        <div class="definition">a mechanical gate consisting of revolving horizontal arms</div>
    </div>
    
    <p>The poor man was taken aback; but, with great <span class="highlight-vocab">presence of mind<span class="vocab-tooltip">quick thinking and composure in a difficult situation</span></span> and much to Grandfather's annoyance, he said, "Sir, you have a dog with you. You'll have to pay for it accordingly."</p>
    
    <div class="vocabulary-note">
        <div class="word">presence of mind</div>
        <div class="definition">quick thinking and composure in a difficult situation</div>
    </div>
    
    <p>In vain did Grandfather take Toto out of the bag; in vain did he try to prove that a monkey did not qualify as a dog, or even as a <span class="highlight-vocab">quadruped<span class="vocab-tooltip">an animal having four feet</span></span>. Toto was classified a dog by the ticket-collector; and three rupees was the sum handed over as his fare.</p>
    
    <div class="vocabulary-note">
        <div class="word">quadruped</div>
        <div class="definition">an animal having four feet</div>
    </div>
    
    <p>Then Grandfather, just to get his own back, took from his pocket our pet tortoise, and said, "What must I pay for this, since you charge for all animals?"</p>
    
    <p>The ticket-collector looked closely at the tortoise, <span class="highlight-vocab">prodded<span class="vocab-tooltip">poked or jabbed</span></span> it with his forefinger, gave Grandfather a pleased and <span class="highlight-vocab">triumphant<span class="vocab-tooltip">showing or expressing joy at victory</span></span> look, and said, "No charge. It is not a dog."</p>
    
    <div class="vocabulary-note">
        <div class="word">prodded</div>
        <div class="definition">poked or jabbed</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">triumphant</div>
        <div class="definition">showing or expressing joy at victory</div>
    </div>
    
    <p>When Toto was finally accepted by Grandmother he was given a comfortable home in the stable, where he had for a companion the family donkey, Nana. On Toto's first night in the stable, Grandfather paid him a visit to see if he was comfortable. To his surprise he found Nana, without apparent cause, pulling at her <span class="highlight-vocab">halter<span class="vocab-tooltip">a rope or strap placed around the head of a horse or other animal</span></span> and trying to keep her head as far as possible from a bundle of hay.</p>
    
    <div class="vocabulary-note">
        <div class="word">halter</div>
        <div class="definition">a rope or strap placed around the head of a horse or other animal</div>
    </div>
    
    <p>Grandfather gave Nana a slap across her <span class="highlight-vocab">haunches<span class="vocab-tooltip">the hindquarters, hips, and upper thighs</span></span>, and she jerked back, dragging Toto with her. He had fastened on to her long ears with his sharp little teeth.</p>
    
    <div class="vocabulary-note">
        <div class="word">haunches</div>
        <div class="definition">the hindquarters, hips, and upper thighs</div>
    </div>
    
    <p>Toto and Nana never became friends.</p>
    
    <p>A great treat for Toto during cold winter evenings was the large bowl of warm water given him by Grandmother for his bath. He would <span class="highlight-vocab">cunningly<span class="vocab-tooltip">cleverly; slyly</span></span> test the temperature with his hand, then gradually step into the bath, first one foot, then the other (as he had seen me doing), until he was into the water up to his neck.</p>
    
    <div class="vocabulary-note">
        <div class="word">cunningly</div>
        <div class="definition">cleverly; slyly</div>
    </div>
    
    <p>Once comfortable, he would take the soap in his hands or feet, and rub himself all over. When the water became cold, he would get out and run as quickly as he could to the kitchen-fire in order to dry himself. If anyone laughed at him during this performance, Toto's feelings would be hurt and he would refuse to go on with his bath. One day Toto nearly succeeded in boiling himself alive.</p>
    
    <p>A large kitchen kettle had been left on the fire to boil for tea and Toto, finding himself with nothing better to do, decided to remove the lid. Finding the water just warm enough for a bath, he got in, with his head sticking out from the open kettle. This was just fine for a while, until the water began to boil. Toto then raised himself a little; but, finding it cold outside, sat down again. He continued hopping up and down for some time, until Grandmother arrived and <span class="highlight-vocab">hauled<span class="vocab-tooltip">pulled or dragged with effort</span></span> him, half-boiled, out of the kettle.</p>
    
    <div class="vocabulary-note">
        <div class="word">hauled</div>
        <div class="definition">pulled or dragged with effort</div>
    </div>
    
    <p>If there is a part of the brain especially devoted to mischief, that part was largely developed in Toto. He was always tearing things to pieces. Whenever one of my aunts came near him, he made every effort to get hold of her dress and tear a hole in it.</p>
    
    <p>One day, at lunch-time, a large dish of <span class="highlight-vocab">pullao<span class="vocab-tooltip">a rice dish with spices, vegetables, and/or meat</span></span> stood in the centre of the dining-table. We entered the room to find Toto stuffing himself with rice. My grandmother screamed — and Toto threw a plate at her. One of my aunts rushed forward — and received a glass of water in the face. When Grandfather arrived, Toto picked up the dish of pullao and made his exit through a window. We found him in the branches of the <span class="highlight-vocab">jackfruit<span class="vocab-tooltip">a large tropical fruit with a spiky outer skin</span></span> tree, the dish still in his arms. He remained there all afternoon, eating slowly through the rice, determined on finishing every grain. And then, in order to <span class="highlight-vocab">spite<span class="vocab-tooltip">deliberately hurt or anger someone</span></span> Grandmother, who had screamed at him, he threw the dish down from the tree, and chattered with delight when it broke into a hundred pieces.</p>
    
    <div class="vocabulary-note">
        <div class="word">pullao</div>
        <div class="definition">a rice dish with spices, vegetables, and/or meat</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">jackfruit</div>
        <div class="definition">a large tropical fruit with a spiky outer skin</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">spite</div>
        <div class="definition">deliberately hurt or anger someone</div>
    </div>
    
    <p>Obviously Toto was not the sort of pet we could keep for long. Even Grandfather realised that. We were not <span class="highlight-vocab">well-to-do<span class="vocab-tooltip">having enough money to live comfortably</span></span>, and could not afford the frequent loss of dishes, clothes, curtains and wallpaper. So Grandfather found the tonga-driver, and sold Toto back to him — for only three rupees.</p>
    
    <div class="vocabulary-note">
        <div class="word">well-to-do</div>
        <div class="definition">having enough money to live comfortably</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. How does Toto come to grandfather's private zoo?</div>
        <div class="comprehension-question">2. In what sense is Toto pretty?</div>
        <div class="comprehension-question">3. Why was it decided to keep Toto's presence a secret from Grandmother?</div>
        <div class="comprehension-question">4. What happened when Grandfather and the narrator came to release Toto?</div>
        <div class="comprehension-question">5. How does Toto take a bath? What happens when he tries to take a bath in the kettle?</div>
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
    let currentChunk = "The Adventures of Toto, by Ruskin Bond. ";
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
        : null;
    
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
