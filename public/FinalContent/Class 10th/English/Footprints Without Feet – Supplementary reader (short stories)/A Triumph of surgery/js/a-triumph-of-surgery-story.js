/**
 * Story content and functionality for A Triumph of Surgery
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>I WAS really <span class="highlight-vocab">worried<span class="vocab-tooltip">concerned, anxious</span></span> about Tricki this time. I had pulled up my car when I saw him in the street with his mistress and I was shocked at his appearance. He had become hugely fat, like a <span class="highlight-vocab">bloated<span class="vocab-tooltip">swollen, puffed up</span></span> sausage with a leg at each corner. His eyes, <span class="highlight-vocab">bloodshot<span class="vocab-tooltip">having blood vessels that are prominent and visible</span></span> and <span class="highlight-vocab">rheumy<span class="vocab-tooltip">watery discharge from mucous membranes</span></span>, stared straight ahead and his tongue <span class="highlight-vocab">lolled<span class="vocab-tooltip">hung loosely</span></span> from his jaws.</p>
    
    <div class="vocabulary-note">
        <div class="word">worried</div>
        <div class="definition">concerned, anxious</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">bloated</div>
        <div class="definition">swollen, puffed up</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">bloodshot</div>
        <div class="definition">having blood vessels that are prominent and visible</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">rheumy</div>
        <div class="definition">a watery discharge from mucous membranes especially of the nose or eyes</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">lolled</div>
        <div class="definition">hung loosely</div>
    </div>
    
    <p>Mrs Pumphrey <span class="highlight-vocab">hastened<span class="vocab-tooltip">moved quickly</span></span> to explain, "He was so <span class="highlight-vocab">listless<span class="vocab-tooltip">lacking energy and enthusiasm</span></span>, Mr Herriot. He seemed to have no energy. I thought he must be suffering from <span class="highlight-vocab">malnutrition<span class="vocab-tooltip">poor condition due to insufficient or unbalanced diet</span></span>, so I have been giving him some little extras between meals to build him up, some malt and cod-liver oil and a bowl of Horlicks at night to make him sleep — nothing much really."</p>

    <div class="vocabulary-note">
        <div class="word">hastened</div>
        <div class="definition">moved quickly</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">listless</div>
        <div class="definition">lacking energy and enthusiasm</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">malnutrition</div>
        <div class="definition">poor condition due to insufficient or unbalanced diet</div>
    </div>
    
    <p>"And did you cut down on the sweet things as I told you?"</p>
    
    <p>"Oh, I did for a bit, but he seemed to be so weak I had to relent. He does love cream cakes and chocolates so. I can't bear to refuse him."</p>
    
    <p>I looked down again at the little dog. That was the trouble. Tricki's only fault was <span class="highlight-vocab">greed<span class="vocab-tooltip">excessive desire for food</span></span>. He had never been known to refuse food; he would tackle a meal at any hour of the day or night. And I wondered about all the things Mrs Pumphrey hadn't mentioned.</p>

    <div class="vocabulary-note">
        <div class="word">greed</div>
        <div class="definition">excessive desire for food</div>
    </div>
    
    <p>"Are you giving him plenty of exercise?"</p>
    
    <p>"Well, he has his little walks with me as you can see, but Hodgkin, the gardener, has been down with <span class="highlight-vocab">lumbago<span class="vocab-tooltip">pain in the lower back</span></span>, so there has been no ring-throwing lately."</p>

    <div class="vocabulary-note">
        <div class="word">lumbago</div>
        <div class="definition">muscular pain in the lower part of the back (lumbar region)</div>
    </div>
    
    <p>I tried to sound <span class="highlight-vocab">severe<span class="vocab-tooltip">serious and strict</span></span>: "Now I really mean this. If you don't cut his food right down and give him more exercise he is going to be really ill. You must <span class="highlight-vocab">harden<span class="vocab-tooltip">make firm or resolute</span></span> your heart and keep him on a very strict diet."</p>

    <div class="vocabulary-note">
        <div class="word">severe</div>
        <div class="definition">serious and strict</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">harden</div>
        <div class="definition">make firm or resolute</div>
    </div>
    
    <p>Mrs Pumphrey <span class="highlight-vocab">wrung<span class="vocab-tooltip">twisted or squeezed tightly</span></span> her hands. "Oh I will, Mr Herriot. I'm sure you are right, but it is so difficult, so very difficult." She set off, head down, along the road, as if determined to put the new <span class="highlight-vocab">regime<span class="vocab-tooltip">prescribed course of diet and exercise</span></span> into practice immediately.</p>

    <div class="vocabulary-note">
        <div class="word">wrung</div>
        <div class="definition">twisted or squeezed tightly</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">regime</div>
        <div class="definition">prescribed course of exercise and diet</div>
    </div>
    
    <p>I watched their progress with growing concern. Tricki was <span class="highlight-vocab">tottering<span class="vocab-tooltip">walking unsteadily</span></span> along in his little tweed coat; he had a whole wardrobe of these coats — for the cold weather and a raincoat for the wet days. He struggled on, <span class="highlight-vocab">drooping<span class="vocab-tooltip">hanging down limply</span></span> in his harness. I thought it wouldn't be long before I heard from Mrs Pumphrey.</p>

    <div class="vocabulary-note">
        <div class="word">tottering</div>
        <div class="definition">walking unsteadily</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">drooping</div>
        <div class="definition">hanging down limply</div>
    </div>
    
    <p>The expected call came within a few days. Mrs Pumphrey was <span class="highlight-vocab">distraught<span class="vocab-tooltip">extremely worried</span></span>. Tricki would eat nothing. Refused even his favourite dishes; and besides, he had bouts of vomiting. He spent all his time lying on a rug, panting. Didn't want to go for walks, didn't want to do anything.</p>

    <div class="vocabulary-note">
        <div class="word">distraught</div>
        <div class="definition">extremely worried</div>
    </div>
    
    <p>I had made my plans in advance. The only way was to get Tricki out of the house for a period. I suggested that he be <span class="highlight-vocab">hospitalised<span class="vocab-tooltip">placed in hospital for treatment</span></span> for about a fortnight to be kept under observation.</p>

    <div class="vocabulary-note">
        <div class="word">hospitalised</div>
        <div class="definition">placed in hospital for treatment</div>
    </div>
    
    <p>The poor lady almost <span class="highlight-vocab">swooned<span class="vocab-tooltip">fainted</span></span>. She was sure he would <span class="highlight-vocab">pine<span class="vocab-tooltip">suffer from grief or longing</span></span> and die if he did not see her every day.</p>

    <div class="vocabulary-note">
        <div class="word">swooned</div>
        <div class="definition">fainted</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">pine</div>
        <div class="definition">suffer from grief or longing</div>
    </div>
    
    <p>But I took a firm line. Tricki was very ill and this was the only way to save him; in fact, I thought it best to take him without delay and, followed by Mrs Pumphrey's <span class="highlight-vocab">wailings<span class="vocab-tooltip">loud cries of grief</span></span>, I marched out to the car carrying the little dog wrapped in a blanket.</p>

    <div class="vocabulary-note">
        <div class="word">wailings</div>
        <div class="definition">loud cries of grief</div>
    </div>
    
    <p>The entire staff was <span class="highlight-vocab">roused<span class="vocab-tooltip">awakened or summoned</span></span> and maids rushed in and out bringing his day bed, his night bed, favourite cushions, toys and rubber rings, breakfast bowl, lunch bowl, supper bowl. Realising that my car would never hold all the stuff, I started to drive away. As I moved off, Mrs Pumphrey, with a <span class="highlight-vocab">despairing<span class="vocab-tooltip">showing hopelessness</span></span> cry, threw an armful of the little coats through the window. I looked in the mirror before I turned the corner of the drive; everybody was in tears.</p>

    <div class="vocabulary-note">
        <div class="word">roused</div>
        <div class="definition">awakened or summoned</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">despairing</div>
        <div class="definition">showing hopelessness</div>
    </div>
    
    <p>Out on the road, I glanced down at the <span class="highlight-vocab">pathetic<span class="vocab-tooltip">arousing pity or sympathy</span></span> little animal gasping on the seat by my side. I patted the head and Tricki made a brave effort to wag his tail. "Poor old lad," I said. "You haven't a kick in you but I think I know a cure for you."</p>

    <div class="vocabulary-note">
        <div class="word">pathetic</div>
        <div class="definition">arousing pity or sympathy</div>
    </div>
    
    <p>At the <span class="highlight-vocab">surgery<span class="vocab-tooltip">doctor's office or clinic</span></span>, the household dogs <span class="highlight-vocab">surged<span class="vocab-tooltip">moved suddenly and powerfully</span></span> round me. Tricki looked down at the noisy pack with dull eyes and, when put down, lay motionless on the carpet. The other dogs, after sniffing round him for a few seconds, decided he was an uninteresting object and ignored him.</p>

    <div class="vocabulary-note">
        <div class="word">surgery</div>
        <div class="definition">a place where a doctor, dentist, or veterinary surgeon treats patients</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">surged</div>
        <div class="definition">moved suddenly and powerfully</div>
    </div>
    
    <p>I made up a bed for him in a warm loose box next to the one where the other dogs slept. For two days I kept an eye on him, giving him no food but plenty of water. At the end of the second day he started to show some interest in his surroundings and on the third he began to <span class="highlight-vocab">whimper<span class="vocab-tooltip">make a low, feeble sound</span></span> when he heard the dogs in the yard.</p>

    <div class="vocabulary-note">
        <div class="word">whimper</div>
        <div class="definition">make a low, feeble sound</div>
    </div>
    
    <p>When I opened the door, Tricki <span class="highlight-vocab">trotted<span class="vocab-tooltip">walked briskly at moderate pace</span></span> out and was immediately <span class="highlight-vocab">engulfed<span class="vocab-tooltip">surrounded completely</span></span> by Joe, the greyhound, and his friends. After rolling him over and thoroughly inspecting him, the dogs moved off down the garden. Tricki followed them, rolling slightly with his surplus fat.</p>

    <div class="vocabulary-note">
        <div class="word">trotted</div>
        <div class="definition">walked briskly at moderate pace</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">engulfed</div>
        <div class="definition">surrounded completely</div>
    </div>
    
    <p>Later that day, I was present at feeding time. I watched while Tristan <span class="highlight-vocab">slopped<span class="vocab-tooltip">poured carelessly</span></span> the food into the bowls. There was the usual <span class="highlight-vocab">headlong<span class="vocab-tooltip">very fast and not in control</span></span> rush followed by the sounds of high-speed eating; every dog knew that if he fell behind the others he was liable to have some competition for the last part of his meal.</p>

    <div class="vocabulary-note">
        <div class="word">slopped</div>
        <div class="definition">poured carelessly</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">headlong</div>
        <div class="definition">very fast and not in control</div>
    </div>
    
    <p>When they had finished, Tricki took a walk round the shining bowls, licking <span class="highlight-vocab">casually<span class="vocab-tooltip">in a relaxed manner</span></span> inside one or two of them. Next day, an extra bowl was put out for him and I was pleased to see him <span class="highlight-vocab">jostling<span class="vocab-tooltip">pushing or bumping</span></span> his way towards it.</p>

    <div class="vocabulary-note">
        <div class="word">casually</div>
        <div class="definition">in a relaxed manner</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">jostling</div>
        <div class="definition">pushing or bumping</div>
    </div>
    
    <p>From then on, his progress was rapid. He had no medicinal treatment of any kind but all day he ran about with the dogs, joining in their friendly <span class="highlight-vocab">scrimmages<span class="vocab-tooltip">rough or confused struggle</span></span>. He discovered the joys of being bowled over, tramped on and <span class="highlight-vocab">squashed<span class="vocab-tooltip">pressed or crushed</span></span> every few minutes. He became an accepted member of the gang, an unlikely, silky little object among the shaggy crew, fighting like a tiger for his share at mealtimes and hunting rats in the old hen-house at night. He had never had such a time in his life.</p>

    <div class="vocabulary-note">
        <div class="word">scrimmages</div>
        <div class="definition">rough or confused struggle</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">squashed</div>
        <div class="definition">pressed or crushed</div>
    </div>
    
    <p>All the while, Mrs Pumphrey <span class="highlight-vocab">hovered<span class="vocab-tooltip">remained suspended or stayed nearby</span></span> anxiously in the background, ringing a dozen times a day for the latest <span class="highlight-vocab">bulletins<span class="vocab-tooltip">short reports</span></span>. I <span class="highlight-vocab">dodged<span class="vocab-tooltip">evaded or avoided</span></span> the questions about whether his cushions were being turned regularly or his correct coat worn according to the weather; but I was able to tell her that the little fellow was out of danger and <span class="highlight-vocab">convalescing<span class="vocab-tooltip">recovering from illness</span></span> rapidly.</p>

    <div class="vocabulary-note">
        <div class="word">hovered</div>
        <div class="definition">remained suspended or stayed nearby</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">bulletins</div>
        <div class="definition">short reports</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">dodged</div>
        <div class="definition">evaded or avoided</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">convalescing</div>
        <div class="definition">recovering from an illness</div>
    </div>
    
    <p>The word 'convalescing' seemed to do something to Mrs Pumphrey. She started to bring round fresh eggs, two dozen at a time, to build up Tricki's strength. For a happy period my partners and I had two eggs each for breakfast, but when the bottles of wine began to arrive, the real possibilities of the situation began to <span class="highlight-vocab">dawn<span class="vocab-tooltip">become clear or apparent</span></span> on the household.</p>

    <div class="vocabulary-note">
        <div class="word">dawn</div>
        <div class="definition">become clear or apparent</div>
    </div>
    
    <p>It was to <span class="highlight-vocab">enrich<span class="vocab-tooltip">make richer in quality</span></span> Tricki's blood. Lunch became a <span class="highlight-vocab">ceremonial<span class="vocab-tooltip">formal and ritualistic</span></span> occasion with two glasses of wine before and several during the meal.</p>

    <div class="vocabulary-note">
        <div class="word">enrich</div>
        <div class="definition">make richer in quality</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">ceremonial</div>
        <div class="definition">formal and ritualistic</div>
    </div>
    
    <p>We could hardly believe it when the brandy came to put a final <span class="highlight-vocab">edge<span class="vocab-tooltip">sharpness or finishing touch</span></span> on Tricki's <span class="highlight-vocab">constitution<span class="vocab-tooltip">physical makeup</span></span>. For a few nights the fine spirit was rolled around, inhaled and <span class="highlight-vocab">reverently<span class="vocab-tooltip">with deep respect</span></span> drunk.</p>

    <div class="vocabulary-note">
        <div class="word">edge</div>
        <div class="definition">sharpness or finishing touch</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">constitution</div>
        <div class="definition">physical makeup</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">reverently</div>
        <div class="definition">with deep respect</div>
    </div>
    
    <p>They were days of deep <span class="highlight-vocab">content<span class="vocab-tooltip">satisfaction or happiness</span></span>, starting well with the extra egg in the morning, improved and <span class="highlight-vocab">sustained<span class="vocab-tooltip">maintained or supported</span></span> by the midday wine and finishing <span class="highlight-vocab">luxuriously<span class="vocab-tooltip">in a way suggesting great comfort</span></span> round the fire with the brandy.</p>

    <div class="vocabulary-note">
        <div class="word">content</div>
        <div class="definition">satisfaction or happiness</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">sustained</div>
        <div class="definition">maintained or supported</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">luxuriously</div>
        <div class="definition">in a way suggesting great comfort</div>
    </div>
    
    <p>It was a <span class="highlight-vocab">temptation<span class="vocab-tooltip">desire to do something wrong or unwise</span></span> to keep Tricki on as a permanent guest, but I knew Mrs Pumphrey was suffering and after a fortnight, felt <span class="highlight-vocab">compelled<span class="vocab-tooltip">forced or obliged</span></span> to phone and tell her that the little dog had recovered and was awaiting collection.</p>

    <div class="vocabulary-note">
        <div class="word">temptation</div>
        <div class="definition">desire to do something wrong or unwise</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">compelled</div>
        <div class="definition">forced or obliged</div>
    </div>
    
    <p>Within minutes, about thirty feet of <span class="highlight-vocab">gleaming<span class="vocab-tooltip">shining brightly</span></span> black metal drew up outside the surgery. The <span class="highlight-vocab">chauffeur<span class="vocab-tooltip">person employed to drive a car</span></span> opened the door and I could just make out the figure of Mrs Pumphrey almost lost in the interior. Her hands were tightly clasped in front of her; her lips trembled. "Oh, Mr Herriot, do tell me the truth. Is he really better?"</p>

    <div class="vocabulary-note">
        <div class="word">gleaming</div>
        <div class="definition">shining brightly</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">chauffeur</div>
        <div class="definition">person employed to drive a car</div>
    </div>
    
    <p>"Yes, he's fine. There's no need for you to get out of the car — I'll go and fetch him."</p>
    
    <p>I walked through the house into the garden. A mass of dogs was <span class="highlight-vocab">hurtling<span class="vocab-tooltip">moving at high speed</span></span> round and round the lawn and in their midst, ears flapping, tail waving, was the little golden figure of Tricki. In two weeks he had been transformed into a <span class="highlight-vocab">lithe<span class="vocab-tooltip">flexible, supple</span></span>, hard-muscled animal; he was keeping up well with the pack, stretching out in great bounds, his chest almost brushing the ground.</p>

    <div class="vocabulary-note">
        <div class="word">hurtling</div>
        <div class="definition">moving at high speed</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">lithe</div>
        <div class="definition">flexible, supple</div>
    </div>
    
    <p>I carried him back along the passage to the front of the house. The chauffeur was still holding the car door open and when Tricki saw his mistress he took off from my arms in a <span class="highlight-vocab">tremendous<span class="vocab-tooltip">very great in size, amount, or intensity</span></span> leap and sailed into Mrs Pumphrey's lap. She gave a startled "Ooh!" And then had to defend herself as he <span class="highlight-vocab">swarmed<span class="vocab-tooltip">moved in large numbers</span></span> over her, licking her face and barking.</p>

    <div class="vocabulary-note">
        <div class="word">tremendous</div>
        <div class="definition">very great in size, amount, or intensity</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">swarmed</div>
        <div class="definition">moved in large numbers</div>
    </div>
    
    <p>During the excitement, I helped the chauffeur to bring out the beds, toys, cushions, coats and bowls, none of which had been used. As the car moved away, Mrs Pumphrey leaned out of the window. Tears shone in her eyes. Her lips trembled.</p>
    
    <p>"Oh, Mr Herriot," she cried, "how can I ever thank you? This is a triumph of surgery!"</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why was Mrs Pumphrey worried about Tricki?</div>
        <div class="comprehension-question">2. What did the narrator suggest as a solution to Tricki's health problem?</div>
        <div class="comprehension-question">3. What treatment did Tricki receive at the surgery?</div>
        <div class="comprehension-question">4. Why did the narrator and his colleagues enjoy Tricki's stay at the surgery?</div>
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
    let currentChunk = "A Triumph of Surgery, by James Herriot. ";
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
