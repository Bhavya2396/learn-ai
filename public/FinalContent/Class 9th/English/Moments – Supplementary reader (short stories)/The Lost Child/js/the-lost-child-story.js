/**
 * Story content and functionality for The Lost Child
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>A child goes to a fair with his parents. He is happy and excited and wants the sweets and toys displayed there. But his parents don't buy them for him. Why then does he refuse when someone else offers them to him?</p>
    
    <p>IT was the festival of spring. From the wintry shades of narrow lanes and alleys emerged a <span class="highlight-vocab">gaily<span class="vocab-tooltip">cheerfully, brightly</span></span> clad humanity. Some walked, some rode on horses, others sat, being carried in bamboo and bullock carts. One little boy ran between his father's legs, brimming over with life and laughter.</p>
    
    <div class="vocabulary-note">
        <div class="word">gaily</div>
        <div class="definition">cheerfully, brightly</div>
    </div>
    
    <p>"Come, child, come," called his parents, as he <span class="highlight-vocab">lagged behind<span class="vocab-tooltip">fell behind, moved slowly</span></span>, fascinated by the toys in the shops that lined the way.</p>
    
    <div class="vocabulary-note">
        <div class="word">lagged behind</div>
        <div class="definition">fell behind, moved slowly</div>
    </div>
    
    <p>He hurried towards his parents, his feet obedient to their call, his eyes still lingering on the receding toys. As he came to where they had stopped to wait for him, he could not suppress the desire of his heart, even though he well knew the old, cold stare of refusal in their eyes.</p>
    
    <p>"I want that toy," he pleaded.</p>
    
    <p>His father looked at him red-eyed, in his familiar <span class="highlight-vocab">tyrant's<span class="vocab-tooltip">cruel, oppressive ruler's</span></span> way.</p>
    
    <div class="vocabulary-note">
        <div class="word">tyrant's</div>
        <div class="definition">cruel, oppressive ruler's</div>
    </div>
    
    <p>His mother, melted by the free spirit of the day was tender and, giving him her finger to hold, said, "Look, child, what is before you!"</p>
    
    <p>It was a flowering mustard-field, pale like <span class="highlight-vocab">melting gold<span class="vocab-tooltip">golden color that seems to flow like melted metal</span></span> as it swept across miles and miles of even land.</p>
    
    <div class="vocabulary-note">
        <div class="word">melting gold</div>
        <div class="definition">golden color that seems to flow like melted metal</div>
    </div>
    
    <p>A group of dragon-flies were bustling about on their <span class="highlight-vocab">gaudy<span class="vocab-tooltip">brightly colored, showy</span></span> purple wings, intercepting the flight of a lone black bee or butterfly in search of sweetness from the flowers. The child followed them in the air with his gaze, till one of them would still its wings and rest, and he would try to catch it. But it would go fluttering, flapping, up into the air, when he had almost caught it in his hands. Then his mother gave a <span class="highlight-vocab">cautionary<span class="vocab-tooltip">warning</span></span> call: "Come, child, come, come on to the footpath."</p>
    
    <div class="vocabulary-note">
        <div class="word">gaudy</div>
        <div class="definition">brightly colored, showy</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">cautionary</div>
        <div class="definition">warning</div>
    </div>
    
    <p>He ran towards his parents gaily and walked abreast of them for a while, being, however, soon left behind, attracted by the little insects and worms along the footpath that were <span class="highlight-vocab">teeming<span class="vocab-tooltip">moving in large numbers</span></span> out from their hiding places to enjoy the sunshine.</p>
    
    <div class="vocabulary-note">
        <div class="word">teeming</div>
        <div class="definition">moving in large numbers</div>
    </div>
    
    <p>"Come, child, come!" his parents called from the shade of a grove where they had seated themselves on the edge of a well. He ran towards them.</p>
    
    <p>A shower of young flowers fell upon the child as he entered the grove, and, forgetting his parents, he began to gather the raining petals in his hands. But lo! he heard the <span class="highlight-vocab">cooing<span class="vocab-tooltip">soft, gentle sound</span></span> of doves and ran towards his parents, shouting, "The dove! The dove!" The raining petals dropped from his forgotten hands.</p>
    
    <div class="vocabulary-note">
        <div class="word">cooing</div>
        <div class="definition">soft, gentle sound</div>
    </div>
    
    <p>"Come, child, come!" they called to the child, who had now gone running in wild <span class="highlight-vocab">capers<span class="vocab-tooltip">playful skipping or leaping movements</span></span> round the banyan tree, and gathering him up they took the narrow, winding footpath which led to the fair through the mustard fields.</p>
    
    <div class="vocabulary-note">
        <div class="word">capers</div>
        <div class="definition">playful skipping or leaping movements</div>
    </div>
    
    <p>As they neared the village the child could see many other footpaths full of <span class="highlight-vocab">throngs<span class="vocab-tooltip">crowds of people</span></span>, converging to the <span class="highlight-vocab">whirlpool<span class="vocab-tooltip">a place of confusion or turbulent movement like a swirling vortex</span></span> of the fair, and felt at once repelled and fascinated by the confusion of the world he was entering.</p>
    
    <div class="vocabulary-note">
        <div class="word">throngs</div>
        <div class="definition">crowds of people</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">whirlpool</div>
        <div class="definition">a place of confusion or turbulent movement like a swirling vortex</div>
    </div>
    
    <p>A sweetmeat seller <span class="highlight-vocab">hawked<span class="vocab-tooltip">called out to sell</span></span>, "gulab-jaman, rasagulla, burfi, jalebi," at the corner of the entrance and a crowd pressed round his counter at the foot of an architecture of many coloured sweets, decorated with leaves of silver and gold. The child stared open-eyed and his mouth watered for the burfi that was his favourite sweet. "I want that burfi," he slowly murmured. But he half knew as he begged that his plea would not be heeded because his parents would say he was greedy. So without waiting for an answer he moved on.</p>
    
    <div class="vocabulary-note">
        <div class="word">hawked</div>
        <div class="definition">called out to sell</div>
    </div>
    
    <p>A flower-seller hawked, "A garland of gulmohur, a garland of gulmohur!" The child seemed <span class="highlight-vocab">irresistibly<span class="vocab-tooltip">in a way that cannot be resisted or stopped</span></span> drawn. He went towards the basket where the flowers lay heaped and half murmured, "I want that garland." But he well knew his parents would refuse to buy him those flowers because they would say that they were cheap. So, without waiting for an answer, he moved on.</p>
    
    <div class="vocabulary-note">
        <div class="word">irresistibly</div>
        <div class="definition">in a way that cannot be resisted or stopped</div>
    </div>
    
    <p>A man stood holding a pole with yellow, red, green and purple balloons flying from it. The child was simply carried away by the <span class="highlight-vocab">rainbow glory<span class="vocab-tooltip">bright, colorful splendor like a rainbow</span></span> of their silken colours and he was filled with an overwhelming desire to possess them all. But he well knew his parents would never buy him the balloons because they would say he was too old to play with such toys. So he walked on farther.</p>
    
    <div class="vocabulary-note">
        <div class="word">rainbow glory</div>
        <div class="definition">bright, colorful splendor like a rainbow</div>
    </div>
    
    <p>A snake-charmer stood playing a flute to a snake which coiled itself in a basket, its head raised in a <span class="highlight-vocab">graceful<span class="vocab-tooltip">elegant, beautiful</span></span> bend like the neck of a swan, while the music stole into its invisible ears like the gentle rippling of an invisible waterfall. The child went towards the snake-charmer. But, knowing his parents had forbidden him to hear such <span class="highlight-vocab">coarse<span class="vocab-tooltip">rough, unrefined</span></span> music as the snake-charmer played, he proceeded farther.</p>
    
    <div class="vocabulary-note">
        <div class="word">graceful</div>
        <div class="definition">elegant, beautiful</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">coarse</div>
        <div class="definition">rough, unrefined</div>
    </div>
    
    <p>There was a roundabout in full swing. Men, women and children, carried away in a whirling motion, <span class="highlight-vocab">shrieked<span class="vocab-tooltip">screamed loudly</span></span> and cried with dizzy laughter. The child watched them intently and then he made a bold request: "I want to go on the roundabout, please, Father, Mother."</p>
    
    <div class="vocabulary-note">
        <div class="word">shrieked</div>
        <div class="definition">screamed loudly</div>
    </div>
    
    <p>There was no reply. He turned to look at his parents. They were not there, ahead of him. He turned to look on either side. They were not there. He looked behind. There was no sign of them.</p>
    
    <p>A full, deep cry rose within his dry throat and with a sudden jerk of his body he ran from where he stood, crying in real fear, "Mother, Father." Tears rolled down from his eyes, hot and fierce; his flushed face was <span class="highlight-vocab">convulsed<span class="vocab-tooltip">contorted with violent, involuntary movements</span></span> with fear. Panic-stricken, he ran to one side first, then to the other, hither and thither in all directions, knowing not where to go. "Mother, Father," he wailed. His yellow turban came untied and his clothes became muddy.</p>
    
    <div class="vocabulary-note">
        <div class="word">convulsed</div>
        <div class="definition">contorted with violent, involuntary movements</div>
    </div>
    
    <p>Having run to and fro in a rage of running for a while, he stood defeated, his cries suppressed into sobs. At little distances on the green grass he could see, through his <span class="highlight-vocab">filmy<span class="vocab-tooltip">covered with a thin layer (of tears)</span></span> eyes, men and women talking. He tried to look intently among the patches of bright yellow clothes, but there was no sign of his father and mother among these people, who seemed to laugh and talk just for the sake of laughing and talking.</p>
    
    <div class="vocabulary-note">
        <div class="word">filmy</div>
        <div class="definition">covered with a thin layer (of tears)</div>
    </div>
    
    <p>He ran quickly again, this time to a shrine to which people seemed to be crowding. Every little inch of space here was <span class="highlight-vocab">congested<span class="vocab-tooltip">overcrowded</span></span> with men, but he ran through people's legs, his little sob lingering: "Mother, Father!" Near the entrance to the temple, however, the crowd became very thick: men <span class="highlight-vocab">jostled<span class="vocab-tooltip">pushed and shoved roughly</span></span> each other, heavy men, with flashing, <span class="highlight-vocab">murderous<span class="vocab-tooltip">showing violent or deadly intent</span></span> eyes and hefty shoulders. The poor child struggled to thrust a way between their feet but, knocked to and fro by their brutal movements, he might have been trampled underfoot, had he not shrieked at the highest pitch of his voice, "Father, Mother!" A man in the surging crowd heard his cry and, stooping with great difficulty, lifted him up in his arms.</p>
    
    <div class="vocabulary-note">
        <div class="word">congested</div>
        <div class="definition">overcrowded</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">jostled</div>
        <div class="definition">pushed and shoved roughly</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">murderous</div>
        <div class="definition">showing violent or deadly intent</div>
    </div>
    
    <p>"How did you get here, child? Whose baby are you?" the man asked as he steered clear of the mass. The child wept more bitterly than ever now and only cried, "I want my mother, I want my father!"</p>
    
    <p>The man tried to soothe him by taking him to the roundabout. "Will you have a ride on the horse?" he gently asked as he approached the ring. The child's throat tore into a thousand <span class="highlight-vocab">shrill<span class="vocab-tooltip">high-pitched</span></span> sobs and he only shouted, "I want my mother, I want my father!"</p>
    
    <div class="vocabulary-note">
        <div class="word">shrill</div>
        <div class="definition">high-pitched</div>
    </div>
    
    <p>The man headed towards the place where the snake-charmer still played on the flute to the swaying cobra. "Listen to that nice music, child!" he pleaded. But the child shut his ears with his fingers and shouted his double-pitched strain: "I want my mother, I want my father!" The man took him near the balloons, thinking the bright colours of the balloons would distract the child's attention and <span class="highlight-vocab">quieten<span class="vocab-tooltip">make quiet or calm</span></span> him. "Would you like a rainbow-coloured balloon?" he <span class="highlight-vocab">persuasively<span class="vocab-tooltip">in a way intended to convince</span></span> asked. The child turned his eyes from the flying balloons and just sobbed, "I want my mother, I want my father!"</p>
    
    <div class="vocabulary-note">
        <div class="word">quieten</div>
        <div class="definition">make quiet or calm</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">persuasively</div>
        <div class="definition">in a way intended to convince</div>
    </div>
    
    <p>The man, still trying to make the child happy, bore him to the gate where the flower-seller sat. "Look! Can you smell those nice flowers, child! Would you like a garland to put round your neck?"</p>
    
    <p>The child turned his nose away from the basket and <span class="highlight-vocab">reiterated<span class="vocab-tooltip">repeated</span></span> his sob, "I want my mother, I want my father!"</p>
    
    <div class="vocabulary-note">
        <div class="word">reiterated</div>
        <div class="definition">repeated</div>
    </div>
    
    <p>Thinking to humour his <span class="highlight-vocab">disconsolate<span class="vocab-tooltip">unhappy and unable to be comforted</span></span> charge by a gift of sweets, the man took him to the counter of the sweet shop. "What sweets would you like, child?" he asked. The child turned his face from the sweet shop and only sobbed, "I want my mother, I want my father!"</p>
    
    <div class="vocabulary-note">
        <div class="word">disconsolate</div>
        <div class="definition">unhappy and unable to be comforted</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What are the things the child sees on his way to the fair?</div>
        <div class="comprehension-question">2. In the fair he wants many things. What are they?</div>
        <div class="comprehension-question">3. When does he realize that he has lost his way?</div>
        <div class="comprehension-question">4. Why does the lost child lose interest in the things that he had wanted earlier?</div>
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
    let currentChunk = "The Lost Child, by Mulk Raj Anand. ";
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
    const contentDiv = document.getElementById('storyContent');
    
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
    
    // Find the content container
    const contentContainer = document.getElementById('storyContent');
    
    if (contentContainer) {
        contentContainer.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}
