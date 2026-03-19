/**
 * Story and poem content and functionality for Nelson Mandela: Long Walk to Freedom
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>TENTH May dawned bright and clear. For the past few days I had been pleasantly <span class="highlight-vocab">besieged<span class="vocab-tooltip">surrounded closely</span></span> by dignitaries and world leaders who were coming to pay their respects before the inauguration. The inauguration would be the largest gathering ever of international leaders on South African soil.</p>
    
    <div class="vocabulary-note">
        <div class="word">besieged</div>
        <div class="definition">surrounded closely</div>
    </div>
    
    <p>The ceremonies took place in the lovely sandstone <span class="highlight-vocab">amphitheatre<span class="vocab-tooltip">building without a roof, with many rows of seats rising in steps</span></span> formed by the Union Buildings in Pretoria. For decades this had been the seat of white supremacy, and now it was the site of a rainbow gathering of different colours and nations for the installation of South Africa's first democratic, non-racial government.</p>
    
    <div class="vocabulary-note">
        <div class="word">amphitheatre</div>
        <div class="definition">building without a roof, with many rows of seats rising in steps (typical of ancient Greece and Rome)</div>
    </div>
    
    <p>On that lovely autumn day I was accompanied by my daughter Zenani. On the podium, Mr de Klerk was first sworn in as second deputy president. Then Thabo Mbeki was sworn in as first deputy president. When it was my turn, I pledged to obey and uphold the Constitution and to devote myself to the well-being of the Republic and its people. To the assembled guests and the watching world, I said:</p>
    
    <p>Today, all of us do, by our presence here... <span class="highlight-vocab">confer<span class="vocab-tooltip">give</span></span> glory and hope to newborn liberty. Out of the experience of an extraordinary human disaster that lasted too long, must be born a society of which all humanity will be proud.</p>
    
    <div class="vocabulary-note">
        <div class="word">confer</div>
        <div class="definition">give (a formal word)</div>
    </div>
    
    <p>We, who were <span class="highlight-vocab">outlaws<span class="vocab-tooltip">because of its policy of apartheid, many countries had earlier broken off diplomatic relations with South Africa</span></span> not so long ago, have today been given the rare privilege to be host to the nations of the world on our own soil. We thank all of our distinguished international guests for having come to take possession with the people of our country of what is, after all, a common victory for justice, for peace, for human dignity.</p>
    
    <div class="vocabulary-note">
        <div class="word">outlaws</div>
        <div class="definition">because of its policy of apartheid, many countries had earlier broken off diplomatic relations with South Africa</div>
    </div>
    
    <p>We have, at last, achieved our political <span class="highlight-vocab">emancipation<span class="vocab-tooltip">freedom from restriction</span></span>. We pledge ourselves to liberate all our people from the continuing bondage of poverty, <span class="highlight-vocab">deprivation<span class="vocab-tooltip">state of not having one's rightful benefits</span></span>, suffering, gender and other <span class="highlight-vocab">discrimination<span class="vocab-tooltip">being treated differently or unfavourably</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">emancipation</div>
        <div class="definition">freedom from restriction</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">deprivation</div>
        <div class="definition">state of not having one's rightful benefits</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">discrimination</div>
        <div class="definition">being treated differently or unfavourably</div>
    </div>
    
    <p>Never, never, and never again shall it be that this beautiful land will again experience the oppression of one by another.</p>
    
    <p>The sun shall never set on so glorious a human achievement.</p>
    
    <p>Let freedom reign. God bless Africa!</p>
    
    <p>A few moments later we all lifted our eyes in awe as a <span class="highlight-vocab">spectacular array<span class="vocab-tooltip">an impressive display (colourful and attractive)</span></span> of South African jets, helicopters and troop carriers roared in perfect formation over the Union Buildings. It was not only a display of pinpoint precision and military force, but a demonstration of the military's loyalty to democracy, to a new government that had been freely and fairly elected. Only moments before, the highest generals of the South African defence force and police, their chests bedecked with ribbons and medals from days gone by, saluted me and pledged their loyalty. I was <span class="highlight-vocab">not unmindful of<span class="vocab-tooltip">conscious of; aware of</span></span> the fact that not so many years before they would not have saluted but arrested me. Finally a <span class="highlight-vocab">chevron<span class="vocab-tooltip">a pattern in the shape of a V</span></span> of Impala jets left a smoke trail of the black, red, green, blue and gold of the new South African flag.</p>
    
    <div class="vocabulary-note">
        <div class="word">spectacular array</div>
        <div class="definition">an impressive display (colourful and attractive)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">not unmindful of</div>
        <div class="definition">conscious of; aware of</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">chevron</div>
        <div class="definition">a pattern in the shape of a V</div>
    </div>
    
    <p>The day was symbolised for me by the playing of our two national anthems, and the vision of whites singing 'Nkosi Sikelel –iAfrika' and blacks singing 'Die Stem', the old anthem of the Republic. Although that day neither group knew the lyrics of the anthem they once <span class="highlight-vocab">despised<span class="vocab-tooltip">had a very low opinion of</span></span>, they would soon know the words by heart.</p>
    
    <div class="vocabulary-note">
        <div class="word">despised</div>
        <div class="definition">had a very low opinion of</div>
    </div>
    
    <p>On the day of the inauguration, I was overwhelmed with a sense of history. In the first decade of the twentieth century, a few years after the bitter Anglo-Boer war and before my own birth, the white-skinned peoples of South Africa patched up their differences and erected a system of racial domination against the dark-skinned peoples of their own land. The structure they created formed the basis of one of the harshest, most inhumane, societies the world has ever known. Now, in the last decade of the twentieth century, and my own eighth decade as a man, that system had been overturned forever and replaced by one that recognised the rights and freedoms of all peoples, regardless of the colour of their skin.</p>
    
    <p>That day had come about through the unimaginable sacrifices of thousands of my people, people whose suffering and courage can never be counted or repaid. I felt that day, as I have on so many other days, that I was simply the sum of all those African patriots who had gone before me. That long and noble line ended and now began again with me. I was pained that I was not able to thank them and that they were not able to see what their sacrifices had <span class="highlight-vocab">wrought<span class="vocab-tooltip">done, achieved</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">wrought</div>
        <div class="definition">done, achieved (old fashioned, formal word)</div>
    </div>
    
    <p>The policy of apartheid created a deep and lasting wound in my country and my people. All of us will spend many years, if not generations, recovering from that <span class="highlight-vocab">profound<span class="vocab-tooltip">deep and strong</span></span> hurt. But the decades of oppression and brutality had another, unintended, effect, and that was that it produced the Oliver Tambos, the Walter Sisulus, the Chief Luthulis, the Yusuf Dadoos, the Bram Fischers, the Robert Sobukwes of our time — men of such extraordinary courage, wisdom and generosity that their like may never be known again. Perhaps it requires such depths of oppression to create such heights of character.</p>
    
    <div class="vocabulary-note">
        <div class="word">profound</div>
        <div class="definition">deep and strong</div>
    </div>
    
    <p>My country is rich in the minerals and gems that lie beneath its soil, but I have always known that its greatest wealth is its people, finer and truer than the purest diamonds.</p>
    
    <p>It is from these comrades in the struggle that I learned the meaning of courage. Time and again, I have seen men and women risk and give their lives for an idea. I have seen men stand up to attacks and torture without breaking, showing a strength and <span class="highlight-vocab">resilience<span class="vocab-tooltip">the ability to deal with any kind of hardship and recover from its effects</span></span> that defies the imagination. I learned that courage was not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear.</p>
    
    <div class="vocabulary-note">
        <div class="word">resilience</div>
        <div class="definition">the ability to deal with any kind of hardship and recover from its effects</div>
    </div>
    
    <p>No one is born hating another person because of the colour of his skin, or his background, or his religion. People must learn to hate, and if they can learn to hate, they can be taught to love, for love comes more naturally to the human heart than its opposite. Even in the grimmest times in prison, when my comrades and I were <span class="highlight-vocab">pushed to our limits<span class="vocab-tooltip">pushed to the last point in our ability to bear pain</span></span>, I would see a <span class="highlight-vocab">glimmer<span class="vocab-tooltip">a sign of human feeling (goodness, kindness, pity, justice, etc.)</span></span> of humanity in one of the guards, perhaps just for a second, but it was enough to reassure me and keep me going. Man's goodness is a flame that can be hidden but never extinguished.</p>
    
    <div class="vocabulary-note">
        <div class="word">pushed to our limits</div>
        <div class="definition">pushed to the last point in our ability to bear pain</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">glimmer</div>
        <div class="definition">a sign of human feeling (goodness, kindness, pity, justice, etc.)</div>
    </div>
    
    <p>In life, every man has twin obligations — obligations to his family, to his parents, to his wife and children; and he has an obligation to his people, his community, his country. In a civil and humane society, each man is able to fulfil those obligations according to his own <span class="highlight-vocab">inclinations<span class="vocab-tooltip">natural tendencies of behavior</span></span> and abilities. But in a country like South Africa, it was almost impossible for a man of my birth and colour to fulfil both of those obligations. In South Africa, a man of colour who attempted to live as a human being was punished and isolated. In South Africa, a man who tried to fulfil his duty to his people was <span class="highlight-vocab">inevitably<span class="vocab-tooltip">unavoidably</span></span> ripped from his family and his home and was forced to live a life apart, a <span class="highlight-vocab">twilight<span class="vocab-tooltip">a half-secret life, like a life lived in the fading light between sunset and darkness</span></span> existence of secrecy and rebellion. I did not in the beginning choose to place my people above my family, but in attempting to serve my people, I found that I was prevented from fulfilling my obligations as a son, a brother, a father and a husband.</p>
    
    <div class="vocabulary-note">
        <div class="word">inclinations</div>
        <div class="definition">natural tendencies of behavior</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">inevitably</div>
        <div class="definition">unavoidably</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">twilight</div>
        <div class="definition">a half-secret life, like a life lived in the fading light between sunset and darkness</div>
    </div>
    
    <p>I was not born with a hunger to be free. I was born free — free in every way that I could know. Free to run in the fields near my mother's hut, free to swim in the clear stream that ran through my village, free to roast mealies under the stars and ride the broad backs of slow-moving bulls. As long as I obeyed my father and abided by the customs of my tribe, I was not troubled by the laws of man or God.</p>
    
    <p>It was only when I began to learn that my boyhood freedom was an <span class="highlight-vocab">illusion<span class="vocab-tooltip">something that appears to be real but is not</span></span>, when I discovered as a young man that my freedom had already been taken from me, that I began to hunger for it. At first, as a student, I wanted freedom only for myself, the <span class="highlight-vocab">transitory<span class="vocab-tooltip">not permanent</span></span> freedoms of being able to stay out at night, read what I pleased and go where I chose. Later, as a young man in Johannesburg, I yearned for the basic and honourable freedoms of achieving my potential, of earning my keep, of marrying and having a family — the freedom not to be obstructed in a lawful life.</p>
    
    <div class="vocabulary-note">
        <div class="word">illusion</div>
        <div class="definition">something that appears to be real but is not</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">transitory</div>
        <div class="definition">not permanent</div>
    </div>
    
    <p>But then I slowly saw that not only was I not free, but my brothers and sisters were not free. I saw that it was not just my freedom that was <span class="highlight-vocab">curtailed<span class="vocab-tooltip">reduced</span></span>, but the freedom of everyone who looked like I did. That is when I joined the African National Congress, and that is when the hunger for my own freedom became the greater hunger for the freedom of my people. It was this desire for the freedom of my people to live their lives with dignity and self-respect that animated my life, that transformed a frightened young man into a bold one, that drove a law-abiding attorney to become a criminal, that turned a family-loving husband into a man without a home, that forced a life-loving man to live like a monk. I am no more virtuous or self-sacrificing than the next man, but I found that I could not even enjoy the poor and limited freedoms I was allowed when I knew my people were not free. Freedom is indivisible; the chains on anyone of my people were the chains on all of them, the chains on all of my people were the chains on me.</p>
    
    <div class="vocabulary-note">
        <div class="word">curtailed</div>
        <div class="definition">reduced</div>
    </div>
    
    <p>I knew that the oppressor must be liberated just as surely as the oppressed. A man who takes away another man's freedom is a prisoner of hatred; he is locked behind the bars of <span class="highlight-vocab">prejudice<span class="vocab-tooltip">a strong dislike without any good reason</span></span> and narrow-mindedness. I am not truly free if I am taking away someone else's freedom, just as surely as I am not free when my freedom is taken from me. The oppressed and the oppressor alike are robbed of their humanity.</p>
    
    <div class="vocabulary-note">
        <div class="word">prejudice</div>
        <div class="definition">a strong dislike without any good reason</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Where did the ceremonies take place? What is the significance of this location?</div>
        <div class="comprehension-question">2. How does Mandela describe the systems of government in his country (i) in the first decade, and (ii) in the final decade, of the twentieth century?</div>
        <div class="comprehension-question">3. What does Mandela thank the international leaders for?</div>
        <div class="comprehension-question">4. What ideals does Mandela set out for the future of South Africa?</div>
        <div class="comprehension-question">5. What does courage mean to Mandela?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">A TIGER IN THE ZOO</p>
        <p class="poem-author">by Leslie Norris</p>
        
        <div class="poem-stanza">
            <p class="poem-line">He stalks in his vivid stripes</p>
            <p class="poem-line">The few steps of his cage,</p>
            <p class="poem-line">On <span class="highlight-vocab">pads<span class="vocab-tooltip">soft cushion-like parts of an animal's foot</span></span> of velvet quiet,</p>
            <p class="poem-line">In his quiet rage.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">He should be <span class="highlight-vocab">lurking<span class="vocab-tooltip">hiding and waiting to attack</span></span> in shadow,</p>
            <p class="poem-line">Sliding through long grass</p>
            <p class="poem-line">Near the water hole</p>
            <p class="poem-line">Where plump deer pass.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">He should be <span class="highlight-vocab">snarling<span class="vocab-tooltip">making an angry, warning sound</span></span> around houses</p>
            <p class="poem-line">At the jungle's edge,</p>
            <p class="poem-line"><span class="highlight-vocab">Baring<span class="vocab-tooltip">showing or uncovering</span></span> his white fangs, his claws,</p>
            <p class="poem-line">Terrorising the village!</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">But he's locked in a concrete cell,</p>
            <p class="poem-line">His strength behind bars,</p>
            <p class="poem-line">Stalking the length of his cage,</p>
            <p class="poem-line">Ignoring visitors.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">He hears the last voice at night,</p>
            <p class="poem-line">The <span class="highlight-vocab">patrolling<span class="vocab-tooltip">going around an area at regular times to check it</span></span> cars,</p>
            <p class="poem-line">And stares with his brilliant eyes</p>
            <p class="poem-line">At the brilliant stars.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">pads</div>
        <div class="definition">soft cushion-like parts of an animal's foot</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">lurking</div>
        <div class="definition">hiding and waiting to attack</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">snarling</div>
        <div class="definition">making an angry, warning sound</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">baring</div>
        <div class="definition">showing or uncovering</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">patrolling</div>
        <div class="definition">going around an area at regular times to check it</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What are the movements and actions of the tiger in the cage?</div>
        <div class="comprehension-question">2. How does the tiger feel in the cage?</div>
        <div class="comprehension-question">3. What should the tiger be doing instead, according to the poet?</div>
        <div class="comprehension-question">4. What is the effect of the repetition of words in the last stanza?</div>
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
    let currentChunk = "Nelson Mandela: Long Walk to Freedom. ";
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
