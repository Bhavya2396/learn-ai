/**
 * Story content and functionality for Iswaran the Storyteller
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>One night Mahendra woke up from his sleep and saw "a dark cloudy form". He broke out into a cold sweat. Was it a ghost?</p>
    
    <p>THE story was narrated to Ganesh by a young man, Mahendra by name. He was a junior <span class="highlight-vocab">supervisor<span class="vocab-tooltip">a person who oversees or manages others</span></span> in a firm which offered on hire supervisors at various types of construction sites: factories, bridges, dams, and so on. Mahendra's job was to keep an eye on the activities at the work site. He had to keep moving from place to place every now and then as ordered by his head office: from a coal mining area to a railway bridge construction site, from there after a few months to a chemical plant which was coming up somewhere.</p>
    
    <div class="vocabulary-note">
        <div class="word">supervisor</div>
        <div class="definition">a person who oversees or manages others</div>
    </div>
    
    <p>He was a bachelor. His needs were simple and he was able to adjust himself to all kinds of odd conditions, whether it was an <span class="highlight-vocab">ill-equipped<span class="vocab-tooltip">not having the proper equipment or facilities</span></span> circuit house or a makeshift canvas tent in the middle of a stone quarry. But one asset he had was his cook, Iswaran. The cook was quite attached to Mahendra and followed him uncomplainingly wherever he was posted. He cooked for Mahendra, washed his clothes and chatted away with his master at night. He could weave out endless stories and <span class="highlight-vocab">anecdotes<span class="vocab-tooltip">short, interesting stories about real people or events</span></span> on varied subjects.</p>
    
    <div class="vocabulary-note">
        <div class="word">ill-equipped</div>
        <div class="definition">not having the proper equipment or facilities</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">anecdotes</div>
        <div class="definition">short, interesting stories about real people or events</div>
    </div>
    
    <p>Iswaran also had an amazing capacity to produce vegetables and cooking ingredients, seemingly out of nowhere, in the middle of a <span class="highlight-vocab">desolate<span class="vocab-tooltip">empty and lonely, making you feel sad</span></span> landscape with no shops visible for miles around. He would miraculously <span class="highlight-vocab">conjure up<span class="vocab-tooltip">make something appear as if by magic</span></span> the most delicious dishes made with fresh vegetables within an hour of arriving at the zinc-sheet shelter at the new workplace.</p>
    
    <div class="vocabulary-note">
        <div class="word">desolate</div>
        <div class="definition">empty and lonely, making you feel sad</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">conjure up</div>
        <div class="definition">make something appear as if by magic</div>
    </div>
    
    <p>Mahendra would be up early in the morning and leave for work after breakfast, carrying some prepared food with him. Meanwhile Iswaran would tidy up the shed, wash the clothes, and have a leisurely bath, pouring several buckets of water over his head, muttering a prayer all the while. It would be lunchtime by then. After eating, he would read for a while before dozing off. The book was usually some popular Tamil thriller running to hundreds of pages. Its imaginative descriptions and narrative <span class="highlight-vocab">flourishes<span class="vocab-tooltip">elaborate or fancy decorative features</span></span> would hold Iswaran <span class="highlight-vocab">in thrall<span class="vocab-tooltip">the state of being in someone's power</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">flourishes</div>
        <div class="definition">elaborate or fancy decorative features</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">in thrall</div>
        <div class="definition">the state of being in someone's power</div>
    </div>
    
    <p>His own descriptions were greatly influenced by the Tamil authors that he read. When he was narrating even the smallest of incidents, he would try to work in suspense and a surprise ending into the account. For example, instead of saying that he had come across an uprooted tree on the highway, he would say, with eyebrows suitably arched and hands held out in a dramatic gesture, "The road was deserted and I was all alone. Suddenly I spotted something that looked like an enormous bushy beast lying sprawled across the road. I was half inclined to turn and go back. But as I came closer I saw that it was a fallen tree, with its dry branches spread out." Mahendra would stretch himself back in his canvas chair and listen to Iswaran's tales uncritically.</p>
    
    <p>"The place I come from is famous for timber," Iswaran would begin. "There is a richly wooded forest all around. The logs are hauled on to the lorries by elephants. They are huge well-fed beasts. When they turn wild even the most experienced <span class="highlight-vocab">mahout<span class="vocab-tooltip">a person who works with, rides and tends an elephant</span></span> is not able to control them." After this prologue Iswaran would launch into an elaborate anecdote involving an elephant.</p>
    
    <div class="vocabulary-note">
        <div class="word">mahout</div>
        <div class="definition">a person who works with, rides and tends an elephant</div>
    </div>
    
    <p>"One day a <span class="highlight-vocab">tusker<span class="vocab-tooltip">male elephant with large tusks</span></span> escaped from the timber yard and began to roam about, stamping on bushes, tearing up wild creepers and breaking branches at will. You know, sir, how an elephant behaves when it goes mad." Iswaran would get so caught up in the excitement of his own story that he would get up from the floor and jump about, stamping his feet in emulation of the mad elephant.</p>
    
    <div class="vocabulary-note">
        <div class="word">tusker</div>
        <div class="definition">male elephant with large tusks</div>
    </div>
    
    <p>"The elephant reached the outskirts of our town; breaking the fences down like matchsticks," he would continue. "It came into the main road and smashed all the stalls selling fruits, mud pots and clothes. People ran <span class="highlight-vocab">helter-skelter<span class="vocab-tooltip">in a confused and disorderly manner</span></span> in panic! The elephant now entered a school ground where children were playing, breaking through the brick wall. All the boys ran into the classrooms and shut the doors tight. The beast grunted and wandered about, pulling out the football goal-post, tearing down the volleyball net, kicking and flattening the drum kept for water, and uprooting the shrubs. Meanwhile all the teachers had climbed up to the terrace of the school building; from there they helplessly watched the <span class="highlight-vocab">depredations<span class="vocab-tooltip">attacks which are made to destroy something</span></span> of the elephant. There was not a soul below on the ground. The streets were empty as if the inhabitants of the entire town had suddenly disappeared.</p>
    
    <div class="vocabulary-note">
        <div class="word">helter-skelter</div>
        <div class="definition">in a confused and disorderly manner</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">depredations</div>
        <div class="definition">attacks which are made to destroy something</div>
    </div>
    
    <p>"I was studying in the junior class at that time, and was watching the whole drama from the rooftop. I don't know what came over me suddenly. I grabbed a cane from the hands of one of the teachers and ran down the stairs and into the open. The elephant grunted and menacingly swung a branch of a tree which it held in its trunk. It stamped its feet, kicking up a lot of mud and dust. It looked frightening. But I moved slowly towards it, stick in hand. People were watching the scene hypnotised from nearby housetops. The elephant looked at me red-eyed, ready to rush towards me. It lifted its trunk and trumpeted loudly. At that moment I moved forward and, mustering all my force, whacked its third toenail on the quick. The beast looked stunned for a moment; then it shivered from head to foot — and collapsed."</p>
    
    <p>At this point Iswaran would leave the story unfinished, and get up mumbling, "I will be back after lighting the gas and warming up the dinner." Mahendra who had been listening with rapt attention would be left hanging. When he returned, Iswaran would not pick up the thread of the story right away. Mahendra would have to remind him that the conclusion was pending.</p>
    
    <p>"Well, a veterinary doctor was summoned to revive the animal," Iswaran would shrug casually. "Two days later it was led away by its mahout to the jungle."</p>
    
    <p>"Well, how did you manage to do it, Iswaran — how did you bring down the beast?"</p>
    
    <p>"It has something to do with a Japanese art, I think, sir. <span class="highlight-vocab">Karate<span class="vocab-tooltip">a Japanese martial art focusing on striking techniques</span></span> or <span class="highlight-vocab">ju-jitsu<span class="vocab-tooltip">a Japanese martial art focusing on grappling techniques</span></span> it is called. I had read about it somewhere. It temporarily paralyses the nervous system, you see."</p>
    
    <div class="vocabulary-note">
        <div class="word">Karate</div>
        <div class="definition">a Japanese martial art focusing on striking techniques</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ju-jitsu</div>
        <div class="definition">a Japanese martial art focusing on grappling techniques</div>
    </div>
    
    <p>Not a day passed without Iswaran recounting some story packed with adventure, horror and suspense. Whether the story was credible or not, Mahendra enjoyed listening to it because of the inimitable way in which it was told. Iswaran seemed to more than make up for the absence of a TV in Mahendra's living quarters.</p>
    
    <p>One morning when Mahendra was having breakfast Iswaran asked, "Can I make something special for dinner tonight, sir? After all today is an <span class="highlight-vocab">auspicious<span class="vocab-tooltip">favorable; promising success; a good omen</span></span> day — according to tradition we prepare various delicacies to feed the spirits of our ancestors today, sir."</p>
    
    <div class="vocabulary-note">
        <div class="word">auspicious</div>
        <div class="definition">favorable; promising success; a good omen</div>
    </div>
    
    <p>That night Mahendra enjoyed the most delicious dinner and complimented Iswaran on his <span class="highlight-vocab">culinary<span class="vocab-tooltip">related to cooking</span></span> skills. He seemed very pleased but, unexpectedly, launched into a most <span class="highlight-vocab">garish<span class="vocab-tooltip">excessively bright or showy</span></span> account involving the supernatural.</p>
    
    <div class="vocabulary-note">
        <div class="word">culinary</div>
        <div class="definition">related to cooking</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">garish</div>
        <div class="definition">excessively bright or showy</div>
    </div>
    
    <p>"You know, sir, this entire factory area we are occupying was once a burial ground," he started. Mahendra was jerked out of the pleasant reverie he had drifted into after the satisfying meal.</p>
    
    <p>"I knew on the first day itself when I saw a human skull lying on the path. Even now I come across a number of skulls and bones," Iswaran continued.</p>
    
    <p>He went on to narrate how he sometimes saw ghosts at night. "I am not easily frightened by these things, sir. I am a brave fellow. But one horrible ghost of a woman which appears off and on at midnight during the full moon... It is an ugly creature with matted hair and a shrivelled face, like a skeleton holding a foetus in its arms."</p>
    
    <p>Mahendra shivered at the description and interrupted rather sharply, "You are crazy, Iswaran. There are no such things as ghosts or spirits. It is all a <span class="highlight-vocab">figment<span class="vocab-tooltip">something that is imagined or invented</span></span> of your imagination. Get your digestive system examined — and maybe your head as well. You are talking nonsense."</p>
    
    <div class="vocabulary-note">
        <div class="word">figment</div>
        <div class="definition">something that is imagined or invented</div>
    </div>
    
    <p>He left the room and retired for the night, expecting Iswaran to sulk for a couple of days. But the next morning he was surprised to find the cook as cheerful and talkative as ever.</p>
    
    <p>From that day on Mahendra, for all his brave talk, went to bed with a certain unease. Every night he peered into the darkness outside through the window next to his bed, trying to make sure that there was no movement of dark shapes in the vicinity. But he could only see a sea of darkness with the twinkling lights of the factory miles away.</p>
    
    <p>He had always liked to admire the milk-white landscape on full-moon nights. But after hearing Iswaran's story of the female ghost he avoided looking out of his window altogether when the moon was full.</p>
    
    <p>One night, Mahendra was woken up from his sleep by a low moan close to his window. At first he put it down to a cat prowling around for mice. But the sound was too <span class="highlight-vocab">guttural<span class="vocab-tooltip">sound produced in the throat; harsh-sounding</span></span> for a cat. He resisted the curiosity to look out lest he should behold a sight which would stop his heart. But the wailing became louder and less <span class="highlight-vocab">feline<span class="vocab-tooltip">relating to cats or other members of the cat family</span></span>. He could not resist the temptation any more. Lowering himself to the level of the windowsill he looked out at the white sheet of moonlight outside. There, not too far away, was a dark cloudy form clutching a bundle. Mahendra broke into a cold sweat and fell back on the pillow, panting. As he gradually recovered from the ghastly experience he began to reason with himself, and finally concluded that it must have been some sort of auto suggestion, some trick that his subconscious had played on him.</p>
    
    <div class="vocabulary-note">
        <div class="word">guttural</div>
        <div class="definition">sound produced in the throat; harsh-sounding</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">feline</div>
        <div class="definition">relating to cats or other members of the cat family</div>
    </div>
    
    <p>By the time he had got up in the morning, had a bath and come out to have his breakfast, the horror of the previous night had faded from his memory. Iswaran greeted him at the door with his lunch packet and his bag. Just as Mahendra was stepping out Iswaran grinned and said, "Sir, remember the other day when I was telling you about the female ghost with a foetus in its arms, you were so angry with me for imagining things? Well, you saw her yourself last night. I came running hearing the sound of moaning that was coming from your room..."</p>
    
    <p>A chill went down Mahendra's spine. He did not wait for Iswaran to complete his sentence. He hurried away to his office and handed in his papers, resolving to leave the haunted place the very next day!</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. In what way is Iswaran an asset to Mahendra?</div>
        <div class="comprehension-question">2. How does Iswaran describe the uprooted tree on the highway?</div>
        <div class="comprehension-question">3. Why did Mahendra's mother send for the County Inspector?</div>
        <div class="comprehension-question">4. What happens to Mahendra on a full-moon night?</div>
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
    let currentChunk = "Iswaran the Storyteller, by R.K. Laxman. ";
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
