/**
 * Story and poem content and functionality for Mijbil the Otter
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>EARLY in the New Year of 1956 I travelled to Southern Iraq. By then it had <span class="highlight-vocab">crossed my mind<span class="vocab-tooltip">came into my thoughts</span></span> that I should like to keep an otter instead of a dog, and that Camusfearna, ringed by water a <span class="highlight-vocab">stone's throw<span class="vocab-tooltip">very short distance</span></span> from its door, would be an eminently suitable spot for this experiment.</p>
    
    <div class="vocabulary-note">
        <div class="word">crossed my mind</div>
        <div class="definition">came into my thoughts</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">stone's throw</div>
        <div class="definition">very short distance</div>
    </div>
    
    <p>When I casually mentioned this to a friend, he as casually replied that I had better get one in the Tigris marshes, for there they were as common as mosquitoes, and were often tamed by the Arabs. We were going to Basra to the Consulate-General to collect and answer our mail from Europe. At the Consulate-General we found that my friend's mail had arrived but that mine had not.</p>
    
    <p>I <span class="highlight-vocab">cabled<span class="vocab-tooltip">sent a message by telegraph</span></span> to England, and when, three days later, nothing had happened, I tried to telephone. The call had to be booked twenty-four hours in advance. On the first day the line was out of order; on the second the exchange was closed for a religious holiday. On the third day there was another breakdown. My friend left, and I arranged to meet him in a week's time. Five days later, my mail arrived.</p>
    
    <div class="vocabulary-note">
        <div class="word">cabled</div>
        <div class="definition">sent a message by telegraph</div>
    </div>
    
    <p>I carried it to my bedroom to read, and there, squatting on the floor, were two Arabs; beside them lay a sack that <span class="highlight-vocab">squirmed<span class="vocab-tooltip">twisted about</span></span> from time to time. They handed me a note from my friend: "Here is your otter..."</p>
    
    <div class="vocabulary-note">
        <div class="word">squirmed</div>
        <div class="definition">twisted about</div>
    </div>
    
    <p>With the opening of that sack began a phase of my life that has not yet ended, and may, for all I know, not end before I do. It is, in effect, a <span class="highlight-vocab">thraldom<span class="vocab-tooltip">being under the control of</span></span> to otters, an otter <span class="highlight-vocab">fixation<span class="vocab-tooltip">a very strong attachment or feeling</span></span>, that I have since found to be shared by most other people, who have ever owned one.</p>
    
    <div class="vocabulary-note">
        <div class="word">thraldom</div>
        <div class="definition">being under the control of</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">fixation</div>
        <div class="definition">a very strong attachment or feeling</div>
    </div>
    
    <p>The creature that emerged from this sack on to the spacious tiled floor of the Consulate bedroom resembled most of all a very small, <span class="highlight-vocab">medievally-conceived<span class="vocab-tooltip">an imagination of the Middle Ages</span></span> dragon. From the head to the tip of the tail he was coated with symmetrical pointed scales of mud armour, between whose tips was visible a soft velvet fur like that of a chocolate-brown mole. He shook himself, and I half expected a cloud of dust, but in fact it was not for another month that I managed to remove the last of the mud and see the otter, as it were, in his true colours.</p>
    
    <div class="vocabulary-note">
        <div class="word">medievally-conceived</div>
        <div class="definition">an imagination of the Middle Ages</div>
    </div>
    
    <p>Mijbil, as I called the otter, was, in fact, of a race previously unknown to science, and was at length <span class="highlight-vocab">christened<span class="vocab-tooltip">named</span></span> by zoologists <em>Lutrogale perspicillata maxwelli</em>, or Maxwell's otter. For the first twenty-four hours Mijbil was neither <span class="highlight-vocab">hostile<span class="vocab-tooltip">unfriendly</span></span> nor friendly; he was simply <span class="highlight-vocab">aloof and indifferent<span class="vocab-tooltip">keeping a distance</span></span>, choosing to sleep on the floor as far from my bed as possible. The second night Mijbil came on to my bed in the small hours and remained asleep in the crook of my knees until the servant brought tea in the morning, and during the day he began to lose his <span class="highlight-vocab">apathy<span class="vocab-tooltip">absence of interest</span></span> and take a keen, much too keen, interest in his surroundings.</p>
    
    <div class="vocabulary-note">
        <div class="word">christened</div>
        <div class="definition">named</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">hostile</div>
        <div class="definition">unfriendly</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">aloof and indifferent</div>
        <div class="definition">keeping a distance</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">apathy</div>
        <div class="definition">absence of interest</div>
    </div>
    
    <p>I made a body-belt for him and took him on a lead to the bathroom, where for half an hour he went wild with joy in the water, plunging and rolling in it, shooting up and down the length of the bathtub underwater, and making enough slosh and splash for a hippo. This, I was to learn, is a characteristic of otters; every drop of water must be, <span class="highlight-vocab">so to speak<span class="vocab-tooltip">as it were (one could say this)</span></span>, extended and spread about the place; a bowl must at once be overturned, or, if it will not be overturned, be sat in and sploshed in until it overflows. Water must be kept on the move and made to do things; when static it is wasted and <span class="highlight-vocab">provoking<span class="vocab-tooltip">causing anger or some other reaction</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">so to speak</div>
        <div class="definition">as it were (one could say this)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">provoking</div>
        <div class="definition">causing anger or some other reaction</div>
    </div>
    
    <p>Two days later, Mijbil escaped from my bedroom as I entered it, and I turned to see his tail disappearing round the bend of the corridor that led to the bathroom. By the time I got there he was up on the end of the bathtub and <span class="highlight-vocab">fumbling<span class="vocab-tooltip">trying to do something in a clumsy manner</span></span> at the chromium taps with his paws. I watched, amazed; in less than a minute he had turned the tap far enough to produce a trickle of water, and after a moment or two achieved the full flow. (He had been lucky to turn the tap the right way; on later occasions he would sometimes screw it up still tighter, chittering with irritation and disappointment at the tap's failure to cooperate.)</p>
    
    <div class="vocabulary-note">
        <div class="word">fumbling</div>
        <div class="definition">trying to do something in a clumsy manner</div>
    </div>
    
    <p>Very soon Mij would follow me without a lead and come to me when I called his name. He spent most of his time in play. He spent hours shuffling a rubber ball round the room like a four-footed soccer player using all four feet to dribble the ball, and he could also throw it, with a powerful <span class="highlight-vocab">flick<span class="vocab-tooltip">a quick, light movement</span></span> of the neck, to a surprising height and distance. But the real play of an otter is when he lies on his back and juggles with small objects between his paws. Marbles were Mij's favourite toys for this pastime: he would lie on his back rolling two or more of them up and down his wide, flat belly without ever dropping one to the floor.</p>
    
    <div class="vocabulary-note">
        <div class="word">flick</div>
        <div class="definition">a quick, light movement</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Oral Comprehension Check</h3>
        <div class="comprehension-question">1. What 'experiment' did Maxwell think Camusfearna would be suitable for?</div>
        <div class="comprehension-question">2. Why does he go to Basra? How long does he wait there, and why?</div>
        <div class="comprehension-question">3. How does he get the otter? Does he like it? Pick out the words that tell you this.</div>
        <div class="comprehension-question">4. Why was the otter named 'Maxwell's otter'?</div>
        <div class="comprehension-question">5. Tick the right answer. In the beginning, the otter was
            • aloof and indifferent
            • friendly
            • hostile</div>
        <div class="comprehension-question">6. What happened when Maxwell took Mijbil to the bathroom? What did it do two days after that?</div>
    </div>
    
    <p>The days passed peacefully at Basra, but I <span class="highlight-vocab">dreaded the prospect<span class="vocab-tooltip">was in great fear of something that would happen in the future</span></span> of transporting Mij to England, and to Camusfearna. The British airline to London would not fly animals, so I booked a flight to Paris on another airline, and from there to London. The airline insisted that Mij should be packed into a box not more than eighteen inches square, to be carried on the floor at my feet. I had a box made, and an hour before we started, I put Mij into the box so that he would become accustomed to it, and left for a hurried meal.</p>
    
    <div class="vocabulary-note">
        <div class="word">dreaded the prospect</div>
        <div class="definition">was in great fear of something that would happen in the future</div>
    </div>
    
    <p>When I returned, there was <span class="highlight-vocab">an appalling spectacle<span class="vocab-tooltip">a shocking scene</span></span>. There was complete silence from the box, but from its airholes and chinks around the lid, blood had trickled and dried. I <span class="highlight-vocab">whipped off<span class="vocab-tooltip">quickly took off</span></span> the lock and tore open the lid, and Mij, exhausted and blood-spattered, whimpered and caught at my leg. He had torn the lining of the box to shreds; when I removed the last of it so that there were no cutting edges left, it was just ten minutes until the time of the flight, and the airport was five miles distant. I put the miserable Mij back into the box, holding down the lid with my hand.</p>
    
    <div class="vocabulary-note">
        <div class="word">an appalling spectacle</div>
        <div class="definition">a shocking scene</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">whipped off</div>
        <div class="definition">quickly took off</div>
    </div>
    
    <p>I sat in the back of the car with the box beside me as the driver tore through the streets of Basra like a <span class="highlight-vocab">ricochetting bullet<span class="vocab-tooltip">a bullet which changes direction after hitting a surface</span></span>. The aircraft was waiting to take off; I was rushed through to it by <span class="highlight-vocab">infuriated<span class="vocab-tooltip">very angry</span></span> officials. Luckily, the seat booked for me was at the extreme front. I covered the floor around my feet with newspapers, rang for the air hostess, and gave her a parcel of fish (for Mij) to keep in a cool place. I <span class="highlight-vocab">took her into my confidence<span class="vocab-tooltip">shared with her my experiences or secrets</span></span> about the events of the last half hour. I have retained the most profound admiration for that air hostess; she was the very queen of her kind. She suggested that I might prefer to have my pet on my knee, and I could have kissed her hand in the depth of my gratitude. But, not knowing otters, I was quite unprepared for what followed.</p>
    
    <div class="vocabulary-note">
        <div class="word">ricochetting bullet</div>
        <div class="definition">a bullet which changes direction after hitting a surface</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">infuriated</div>
        <div class="definition">very angry</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">took her into my confidence</div>
        <div class="definition">shared with her my experiences or secrets</div>
    </div>
    
    <p>Mij was out of the box in a flash. He disappeared at high speed down the aircraft. There were squawks and shrieks, and a woman stood up on her seat screaming out, "A rat! A rat!" I caught sight of Mij's tail disappearing beneath the legs of a <span class="highlight-vocab">portly<span class="vocab-tooltip">stout</span></span> white-turbaned Indian. Diving for it, I missed, but found my face covered in curry. "Perhaps," said the air hostess with the most charming smile, "it would be better if you resumed your seat, and I will find the animal and bring it to you."</p>
    
    <div class="vocabulary-note">
        <div class="word">portly</div>
        <div class="definition">stout</div>
    </div>
    
    <p>I returned to my seat. I was craning my neck trying to follow the hunt when suddenly I heard from my feet a distressed chitter of recognition and welcome, and Mij <span class="highlight-vocab">bounded on to<span class="vocab-tooltip">climbed up quickly</span></span> my knee and began to <span class="highlight-vocab">nuzzle<span class="vocab-tooltip">to rub gently with the nose</span></span> my face and my neck.</p>
    
    <div class="vocabulary-note">
        <div class="word">bounded on to</div>
        <div class="definition">climbed up quickly</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">nuzzle</div>
        <div class="definition">to rub gently with the nose</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Oral Comprehension Check</h3>
        <div class="comprehension-question">1. How was Mij to be transported to England?</div>
        <div class="comprehension-question">2. What did Mij do to the box?</div>
        <div class="comprehension-question">3. Why did Maxwell put the otter back in the box? How do you think he felt when he did this?</div>
        <div class="comprehension-question">4. Why does Maxwell say the airhostess was "the very queen of her kind"?</div>
        <div class="comprehension-question">5. What happened when the box was opened?</div>
    </div>
    
    <p>After an eventful journey, Maxwell and his otter reach London, where he has a flat.</p>
    
    <p>Mij and I remained in London for nearly a month. He would play for hours with a selection of toys, ping-pong balls, marbles, rubber fruit, and a <span class="highlight-vocab">terrapin shell<span class="vocab-tooltip">the shell of small turtle found in North America</span></span> that I had brought back from his native marshes. With the ping-pong ball he invented a game of his own which could keep him <span class="highlight-vocab">engrossed<span class="vocab-tooltip">completely interested in</span></span> for up to half an hour at a time. A suitcase that I had taken to Iraq had become damaged on the journey home, so that the lid, when closed, remained at a slope from one end to the other. Mij discovered that if he placed the ball on the high end it would run down the length of the suitcase. He would dash around to the other end to <span class="highlight-vocab">ambush<span class="vocab-tooltip">to attack suddenly from a hidden position</span></span> its arrival, hide from it, crouching, to spring up and take it by surprise, grab it and trot off with it to the high end once more.</p>
    
    <div class="vocabulary-note">
        <div class="word">terrapin shell</div>
        <div class="definition">the shell of small turtle found in North America</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">engrossed</div>
        <div class="definition">completely interested in</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ambush</div>
        <div class="definition">to attack suddenly from a hidden position</div>
    </div>
    
    <p>Outside the house I exercised him on a lead, precisely as if he had been a dog. Mij quickly developed certain <span class="highlight-vocab">compulsive habits<span class="vocab-tooltip">habits impossible to control</span></span> on these walks in the London streets, like the rituals of children who on their way to and from school must place their feet squarely on the centre of each paving block; must touch every seventh <span class="highlight-vocab">upright<span class="vocab-tooltip">post or rod placed straight up</span></span> of the iron railings, or pass to the outside of every second lamp post. Opposite to my flat was a single-storied primary school, along whose frontage ran a low wall some two feet high. On his way home, but never on his way out, Mij would tug me to this wall, jump on to it, and gallop the full length of its thirty yards, to the hopeless <span class="highlight-vocab">distraction<span class="vocab-tooltip">something that takes away one's attention from what one is doing</span></span> both of pupils and of staff within.</p>
    
    <div class="vocabulary-note">
        <div class="word">compulsive habits</div>
        <div class="definition">habits impossible to control</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">upright</div>
        <div class="definition">post or rod placed straight up</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">distraction</div>
        <div class="definition">something that takes away one's attention from what one is doing</div>
    </div>
    
    <p>It is not, I suppose, in any way strange that the average Londoner should not recognise an otter, but the variety of guesses as to what kind of animal this might be came as a surprise to me. Otters belong to a comparatively small group of animals called Mustellines, shared by the badger, mongoose, weasel, stoat, mink and others. I faced a continuous <span class="highlight-vocab">barrage of conjectural questions<span class="vocab-tooltip">a stream of questions filled with guesses</span></span> that sprayed all the Mustellines but the otter; more random guesses hit on 'a baby seal' and 'a squirrel.' 'Is that a walrus, mister?' reduced me to giggles, and outside a dog show I heard 'a hippo'. A beaver, a bear cub, a leopard — one, apparently, that had changed its spots — and a 'brontosaur'; Mij was anything but an otter.</p>
    
    <div class="vocabulary-note">
        <div class="word">barrage of conjectural questions</div>
        <div class="definition">a stream of questions filled with guesses</div>
    </div>
    
    <p>But the question for which I awarded the highest score came from a labourer digging a hole in the street. I was still far from him when he laid down his tool, put his hands on his hips, and began to stare. As I drew nearer I saw his expression of surprise and affront, as though he would have me know that he was not one upon whom to play jokes. I came abreast of him; he spat, glared, and then growled out, "Here, Mister — what is that supposed to be?"</p>
    
    <div class="comprehension-check">
        <h3>📝 Oral Comprehension Check</h3>
        <div class="comprehension-question">1. What game had Mij invented?</div>
        <div class="comprehension-question">2. What are 'compulsive habits'? What does Maxwell say are the compulsive habits of:
            (i) school children
            (ii) Mij?</div>
        <div class="comprehension-question">3. What group of animals do otters belong to?</div>
        <div class="comprehension-question">4. What guesses did the Londoners make about what Mij was?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">FOG</p>
        <p class="poem-author">by Carl Sandburg</p>
        
        <div class="poem-stanza">
            <p class="poem-line">The fog comes</p>
            <p class="poem-line">on little cat feet.</p>
            <p class="poem-line">It sits looking</p>
            <p class="poem-line">over harbour and city</p>
            <p class="poem-line">on silent <span class="highlight-vocab">haunches<span class="vocab-tooltip">sitting with knees bent</span></span></p>
            <p class="poem-line">and then moves on.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">haunches</div>
        <div class="definition">sitting with knees bent</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. (i) What does Sandburg think the fog is like?</div>
        <div class="comprehension-question">   (ii) How does the fog come?</div>
        <div class="comprehension-question">   (iii) What does 'it' in the third line refer to?</div>
        <div class="comprehension-question">   (iv) Does the poet actually say that the fog is like a cat? Find three things that tell us that the fog is like a cat.</div>
        <div class="comprehension-question">2. You know that a metaphor compares two things by transferring a feature of one thing to the other. Can you find metaphors for storm, train, fire, school, and home?</div>
        <div class="comprehension-question">3. Does this poem have a rhyme scheme? Poetry that does not have an obvious rhythm or rhyme is called 'free verse'.</div>
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
    let currentChunk = "Mijbil the Otter, by Gavin Maxwell. ";
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
