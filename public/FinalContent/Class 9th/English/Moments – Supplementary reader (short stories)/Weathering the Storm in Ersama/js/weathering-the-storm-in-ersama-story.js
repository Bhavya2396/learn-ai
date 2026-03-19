/**
 * Story content and functionality for Weathering the Storm in Ersama
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>The cyclone that hit Orissa in October 1999 killed thousands of people and <span class="highlight-vocab">devastated<span class="vocab-tooltip">completely destroyed or severely damaged</span></span> hundreds of villages. For two dreadful nights Prashant, a young man, was <span class="highlight-vocab">marooned<span class="vocab-tooltip">stranded, unable to leave a place</span></span> on the roof of a house. On the third day he decided to go to his village. Did he find his family?</p>
    
    <div class="vocabulary-note">
        <div class="word">devastated</div>
        <div class="definition">completely destroyed or severely damaged</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">marooned</div>
        <div class="definition">stranded, unable to leave a place</div>
    </div>
    
    <p>ON 27 October 1999, seven years after his mother's death, Prashant had gone to the block headquarters of Ersama, a small town in coastal Orissa, some eighteen kilometres from his village, to spend the day with a friend. In the evening, a dark and <span class="highlight-vocab">menacing<span class="vocab-tooltip">dangerous and harmful</span></span> storm quickly gathered. Winds beat against the houses with a speed and fury that Prashant had never witnessed before. Heavy and <span class="highlight-vocab">incessant<span class="vocab-tooltip">unceasing; continual</span></span> rain filled the darkness, ancient trees were uprooted and crashed to the earth. Screams rent the air as people and houses were swiftly washed away. The angry waters <span class="highlight-vocab">swirled<span class="vocab-tooltip">moved or flowed along with a whirling motion</span></span> into his friend's house, neck deep. The building was of brick and mortar and was strong enough to survive the devastation of the wind's velocity of 350 km per hour. But the cold terror of the family grew with the crashing of trees that had got uprooted and fallen on their house, some time in the middle of the night, damaging its roof and walls.</p>
    
    <div class="vocabulary-note">
        <div class="word">menacing</div>
        <div class="definition">dangerous and harmful</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">incessant</div>
        <div class="definition">unceasing; continual</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">swirled</div>
        <div class="definition">moved or flowed along with a whirling motion</div>
    </div>
    
    <p>The crazed destruction wrought by the cyclone and the surge of the ocean continued for the next thirty-six hours, although wind speeds had reduced somewhat by the next morning. To escape the waters rising in the house, Prashant and his friend's family had taken refuge on the roof. Prashant will never forget the shock he experienced at his first glimpse of the devastation wrought by the super cyclone, in the grey light of the early morning. A raging, deadly, brown sheet of water covered everything as far as the eye could see; only fractured cement houses still stood in a few places. Bloated animal <span class="highlight-vocab">carcasses<span class="vocab-tooltip">dead bodies of animals</span></span> and human corpses floated in every direction. All round even huge old trees had fallen. Two coconut trees had fallen on the roof of their house. This was a blessing in disguise, because the tender coconuts from the trees kept the trapped family from starving in the several days that followed.</p>
    
    <div class="vocabulary-note">
        <div class="word">carcasses</div>
        <div class="definition">dead bodies of animals</div>
    </div>
    
    <p>For the next two days, Prashant sat huddled with his friend's family in the open on the rooftop. They froze in the cold and incessant rain; the rain water washed away Prashant's tears. The only thought that flashed through his mind was whether his family had survived the fury of the super cyclone. Was he to be <span class="highlight-vocab">bereaved<span class="vocab-tooltip">lost a close relation or friend through his/her death</span></span> once again?</p>
    
    <div class="vocabulary-note">
        <div class="word">bereaved</div>
        <div class="definition">lost a close relation or friend through his/her death</div>
    </div>
    
    <p>Two days later, which seemed to Prashant like two years, the rain ceased and the rain waters slowly began to recede. Prashant was determined to seek out his family without further delay. But the situation was still dangerous, and his friend's family pleaded with Prashant to stay back a little while longer. But Prashant knew he had to go.</p>
    
    <p>He equipped himself with a long, sturdy stick, and then started on his eighteen-kilometre expedition back to his village through the swollen flood waters. It was a journey he would never forget. He constantly had to use his stick to locate the road, to determine where the water was most shallow. At places it was waist deep, and progress was slow. At several points, he lost the road and had to swim. After some distance, he was relieved to find two friends of his uncle who were also returning to their village. They decided to move ahead together.</p>
    
    <p>As they waded through the waters, the scenes they witnessed grew more and more <span class="highlight-vocab">macabre<span class="vocab-tooltip">disturbing and horrifying because of involvement with death</span></span>. They had to push away many human bodies — men, women, children — and carcasses of dogs, goats and cattle that the current swept against them as they moved ahead. In every village that they passed, they could barely see a house standing. Prashant now wept out loud and long. He was sure that his family could not have survived this catastrophe.</p>
    
    <div class="vocabulary-note">
        <div class="word">macabre</div>
        <div class="definition">disturbing and horrifying because of involvement with death</div>
    </div>
    
    <p>Eventually, Prashant reached his village, Kalikuda. His heart went cold. Where their home once stood, there were only <span class="highlight-vocab">remnants<span class="vocab-tooltip">small remaining quantities</span></span> of its roof. Some of their belongings were caught, mangled and twisted in the branches of trees just visible above the dark waters. Young Prashant decided to go to the Red Cross shelter to look for his family.</p>
    
    <div class="vocabulary-note">
        <div class="word">remnants</div>
        <div class="definition">small remaining quantities</div>
    </div>
    
    <p>Among the first people he saw in the crowd was his maternal grandmother. Weak with hunger, she rushed to him, her hands outstretched, her eyes brimming. It was a miracle. They had long given him up for dead.</p>
    
    <p>Quickly word spread and his extended family gathered around him, and hugged him tight in relief. Prashant anxiously scanned the <span class="highlight-vocab">motley<span class="vocab-tooltip">disparate; varied in appearance or character</span></span>, battered group. His brother and sister, his uncles and aunts, they all seemed to be there.</p>
    
    <div class="vocabulary-note">
        <div class="word">motley</div>
        <div class="definition">disparate; varied in appearance or character</div>
    </div>
    
    <p>By the next morning, as he took in the desperate situation in the shelter, he decided to get a grip over himself. He sensed a deathly grief settling upon the 2500 strong crowd in the shelter. Eighty-six lives were lost in the village. All the ninety-six houses had been washed away. It was their fourth day at the shelter. So far they had survived on green coconuts, but there were too few to go around such a <span class="highlight-vocab">tumult<span class="vocab-tooltip">uproar of a disorderly crowd</span></span> of people.</p>
    
    <div class="vocabulary-note">
        <div class="word">tumult</div>
        <div class="definition">uproar of a disorderly crowd</div>
    </div>
    
    <p>Prashant, all of nineteen years, decided to step in as leader of his village, if no one else did. He organised a group of youths and elders to jointly pressurise the merchant once again to part with his rice. This time the delegation succeeded and returned triumphantly, wading through the receding waters with food for the entire shelter. No one cared that the rice was already rotting. Branches from fallen trees were gathered to light a reluctant and slow fire, on which to cook the rice. For the first time in four days, the survivors at the cyclone shelter were able to fill their bellies. His next task was to organise a team of youth volunteers to clean the shelter of filth, urine, vomit and floating carcasses, and to tend to the wounds and fractures of the many who had been injured.</p>
    
    <p>On the fifth day, a military helicopter flew over the shelter and dropped some food parcels. It then did not return. The youth task force gathered empty utensils from the shelter. Then they deputed the children to lie in the sand left by the waters around the shelter with these utensils on their stomachs, to communicate to the passing helicopters that they were hungry. The message got through, and after that the helicopter made regular rounds of the shelter, airdropping food and other basic needs.</p>
    
    <p>Prashant found that a large number of children had been orphaned. He brought them together and put up a polythene sheet shelter for them. Women were mobilised to look after them, while the men secured food and materials for the shelter.</p>
    
    <p>As the weeks passed, Prashant was quick to recognise that the women and children were sinking deeper and deeper in their grief. He persuaded the women to start working in the food-for-work programme started by an NGO, and for the children he organised sports events. He himself loved to play cricket, and so he organised cricket matches for children. Prashant engaged, with other volunteers, in helping the widows and children to pick up the broken pieces of their lives. The initial government plan was to set up institutions for orphans and widows. However, this step was successfully resisted, as it was felt that in such institutions, children would grow up without love, and widows would suffer from <span class="highlight-vocab">stigma<span class="vocab-tooltip">mark of social disgrace</span></span> and loneliness. Prashant's group believed orphans should be resettled in their own community itself, possibly in new foster families made up of childless widows and children without adult care.</p>
    
    <div class="vocabulary-note">
        <div class="word">stigma</div>
        <div class="definition">mark of social disgrace</div>
    </div>
    
    <p>It is six months after the devastation of the super cyclone. This time Prashant's wounded spirit has healed simply because he had no time to bother about his own pain. His handsome, youthful face is what the widows and orphaned children of his village seek out most in their darkest hour of grief.</p>
    
    <p class="author-credit">HARSH MANDER</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What havoc has the super cyclone wreaked in the life of the people of Orissa?</div>
        <div class="comprehension-question">2. How has Prashant, a teenager, been able to help the people of his village?</div>
        <div class="comprehension-question">3. How have the people of the community helped one another?</div>
        <div class="comprehension-question">4. Why do Prashant and other volunteers resist the plan to set up institutions for orphans and widows?</div>
        <div class="comprehension-question">5. Do you think Prashant is a good leader? Do you think young people can get together to help people during natural calamities?</div>
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
        if (p.closest('.vocabulary-note') || p.closest('.comprehension-check') || p.classList.contains('author-credit')) {
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
    let currentChunk = "Weathering the Storm in Ersama, by Harsh Mander. ";
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
    
    // Find the story content container
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
