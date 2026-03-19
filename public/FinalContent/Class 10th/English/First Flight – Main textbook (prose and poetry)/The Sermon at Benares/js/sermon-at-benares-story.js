/**
 * Story and poem content and functionality for The Sermon at Benares
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>BEFORE YOU READ</p>
    
    <p>Use a dictionary or ask for your teacher's help as you discuss the following questions in groups.</p>
    <p>1. What is a sermon? Is it different from a lecture or a talk? Can this word also be used in a negative way or as a joke (as in "my mother's sermon about getting my work done on time…")?</p>
    <p>2. Find out the meanings of the words and phrases given in the box.</p>
    <p>afflicted with &nbsp;&nbsp; be composed &nbsp;&nbsp; desolation &nbsp;&nbsp; lamentation &nbsp;&nbsp; procure &nbsp;&nbsp; be subject to</p>
    <p>3. Have you heard of the Sermon on the Mount? Who delivered it? Who do you think delivered a sermon at Benares?</p>
    
    <p>GAUTAMA Buddha (563 B.C. – 483 B.C.) began life as a prince named Siddhartha Gautama, in northern India. At twelve, he was sent away for schooling in the Hindu sacred scriptures and four years later he returned home to marry a princess. They had a son and lived for ten years as <span class="highlight-vocab">befitted<span class="vocab-tooltip">was appropriate for</span></span> royalty. At about the age of twenty-five, the Prince, heretofore <span class="highlight-vocab">shielded<span class="vocab-tooltip">protected from</span></span> from the sufferings of the world, while out hunting <span class="highlight-vocab">chanced upon<span class="vocab-tooltip">came across by chance</span></span> a sick man, then an aged man, then a funeral procession, and finally a monk begging for alms. These sights so moved him that he at once went out into the world to seek <span class="highlight-vocab">enlightenment<span class="vocab-tooltip">a state of high spiritual knowledge</span></span> concerning the sorrows he had witnessed.</p>
    
    <div class="vocabulary-note">
        <div class="word">befitted</div>
        <div class="definition">was appropriate for</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">shielded</div>
        <div class="definition">protected from</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">chanced upon</div>
        <div class="definition">came across by chance</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">enlightenment</div>
        <div class="definition">a state of high spiritual knowledge</div>
    </div>
    
    <p>He wandered for seven years and finally sat down under a <span class="highlight-vocab">peepal<span class="vocab-tooltip">fig tree</span></span> tree, where he vowed to stay until enlightenment came. Enlightened after seven days, he renamed the tree the Bodhi Tree (Tree of Wisdom) and began to teach and to share his new understandings. At that point he became known as the Buddha (the Awakened or the Enlightened). The Buddha preached his first <span class="highlight-vocab">sermon<span class="vocab-tooltip">religious or moral talk</span></span> at the city of Benares, most holy of the <span class="highlight-vocab">dipping<span class="vocab-tooltip">bathing</span></span> places on the River Ganges; that sermon has been preserved and is given here. It reflects the Buddha's wisdom about one <span class="highlight-vocab">inscrutable<span class="vocab-tooltip">something which cannot be understood</span></span> kind of suffering.</p>
    
    <div class="vocabulary-note">
        <div class="word">peepal</div>
        <div class="definition">fig tree</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">sermon</div>
        <div class="definition">religious or moral talk</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">dipping</div>
        <div class="definition">bathing</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">inscrutable</div>
        <div class="definition">something which cannot be understood</div>
    </div>
    
    <p>Kisa Gotami had an only son, and he died. In her grief she carried the dead child to all her neighbours, asking them for medicine, and the people said, "She has lost her senses. The boy is dead."</p>
    
    <p>At length, Kisa Gotami met a man who replied to her request, "I cannot give thee medicine for thy child, but I know a physician who can."</p>
    
    <p>And the girl said, "Pray tell me, sir; who is it?" And the man replied, "Go to Sakyamuni, the Buddha."</p>
    
    <p>Kisa Gotami <span class="highlight-vocab">repaired<span class="vocab-tooltip">(a stylistic use) went to</span></span> to the Buddha and cried, "Lord and Master, give me the medicine that will cure my boy."</p>
    
    <div class="vocabulary-note">
        <div class="word">repaired</div>
        <div class="definition">(a stylistic use) went to</div>
    </div>
    
    <p>The Buddha answered, "I want a handful of mustard-seed." And when the girl in her joy promised to <span class="highlight-vocab">procure<span class="vocab-tooltip">get, obtain</span></span> it, the Buddha added, "The mustard-seed must be taken from a house where no one has lost a child, husband, parent or friend."</p>
    
    <div class="vocabulary-note">
        <div class="word">procure</div>
        <div class="definition">get, obtain</div>
    </div>
    
    <p>Poor Kisa Gotami now went from house to house, and the people pitied her and said, "Here is mustard-seed; take it!" But when she asked, "Did a son or daughter, a father or mother, die in your family?" they answered her, "Alas! the living are few, but the dead are many. Do not remind us of our deepest grief." And there was no house but some beloved one had died in it.</p>
    
    <p>Kisa Gotami became weary and hopeless, and sat down at the wayside watching the lights of the city, as they flickered up and were extinguished again. At last the darkness of the night reigned everywhere. And she considered the fate of men, that their lives flicker up and are extinguished again. And she thought to herself, "How selfish am I in my grief! Death is common to all; yet in this <span class="highlight-vocab">valley of desolation<span class="vocab-tooltip">an area which is filled with deep sorrow</span></span> there is a path that leads him to immortality who has surrendered all selfishness."</p>
    
    <div class="vocabulary-note">
        <div class="word">valley of desolation</div>
        <div class="definition">an area which is filled with deep sorrow</div>
    </div>
    
    <p>The Buddha said, ''The life of <span class="highlight-vocab">mortals<span class="vocab-tooltip">those bound to die</span></span> in this world is troubled and brief and combined with pain. For there is not any means by which those that have been born can avoid dying; after reaching old age there is death; of such a nature are living beings. As ripe fruits are early in danger of falling, so mortals when born are always in danger of death. As all earthen vessels made by the potter end in being broken, so is the life of mortals. Both young and adult, both those who are fools and those who are wise, all fall into the power of death; all are subject to death.</p>
    
    <div class="vocabulary-note">
        <div class="word">mortals</div>
        <div class="definition">those bound to die</div>
    </div>
    
    <p>"Of those who, overcome by death, depart from life, a father cannot save his son, nor kinsmen their relations. Mark! while relatives are looking on and lamenting deeply, one by one mortals are carried off, like an ox that is led to the slaughter. So the world is <span class="highlight-vocab">afflicted with<span class="vocab-tooltip">affected by suffering, disease or pain</span></span> death and decay, therefore the wise do not grieve, knowing the terms of the world.</p>
    
    <div class="vocabulary-note">
        <div class="word">afflicted with</div>
        <div class="definition">affected by suffering, disease or pain</div>
    </div>
    
    <p>"Not from weeping nor from grieving will anyone obtain peace of mind; on the contrary, his pain will be the greater and his body will suffer. He will make himself sick and pale, yet the dead are not saved by his <span class="highlight-vocab">lamentation<span class="vocab-tooltip">expression of sorrow</span></span>. He who seeks peace should draw out the arrow of lamentation, and complaint, and grief. He who has drawn out the arrow and has become <span class="highlight-vocab">composed<span class="vocab-tooltip">calm and in control of feelings</span></span> will obtain peace of mind; he who has overcome all sorrow will become free from sorrow, and be blessed."</p>
    
    <div class="vocabulary-note">
        <div class="word">lamentation</div>
        <div class="definition">expression of sorrow</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">composed</div>
        <div class="definition">calm and in control of feelings</div>
    </div>
    
    <p>[Source: Betty Renshaw, Values and Voices: A College Reader (1975)]</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. When her son dies, Kisa Gotami goes from house to house. What does she ask for? Does she get it? Why not?</div>
        <div class="comprehension-question">2. Kisa Gotami again goes from house to house after she speaks with the Buddha. What does she ask for, the second time around? Does she get it? Why not?</div>
        <div class="comprehension-question">3. What does Kisa Gotami understand the second time that she failed to understand the first time? Was this what the Buddha wanted her to understand?</div>
        <div class="comprehension-question">4. Why do you think Kisa Gotami understood this only the second time? In what way did the Buddha change her understanding?</div>
        <div class="comprehension-question">5. How do you usually understand the idea of 'selfishness'? Do you agree with Kisa Gotami that she was being 'selfish in her grief'?</div>
    </div>
    
    <h3>This text is written in an old-fashioned style, for it reports an incident more than two millennia old. Look for the following words and phrases in the text, and try to rephrase them in more current language, based on how you understand them.</h3>
    <ul>
        <li>give thee medicine for thy child</li>
        <li>Pray tell me</li>
        <li>Kisa repaired to the Buddha</li>
        <li>there was no house but someone had died in it</li>
        <li>kinsmen</li>
        <li>Mark!</li>
    </ul>
    
    <h3>The Buddha's sermon is over 2500 years old. Given below are two recent texts on the topic of grief.</h3>
    
    <h4>I. A Guide to Coping with the Death of a Loved One</h4>
    
    <p>Martha is having difficulty sleeping lately and no longer enjoys doing things with her friends. Martha lost her husband of 26 years to cancer a month ago.</p>
    
    <p>Anya, age 17, doesn't feel like eating and spends the days in her room crying. Her grandmother recently died.</p>
    
    <p>Both of these individuals are experiencing grief. Grief is an emotion natural to all types of loss or significant change.</p>
    
    <h4>Feelings of Grief</h4>
    
    <p>Although grief is unique and personal, a broad range of feelings and behaviours are commonly experienced after the death of a loved one.</p>
    
    <ul>
        <li>Sadness. This is the most common, and it is not necessarily manifested by crying.</li>
        <li>Anger. This is one of the most confusing feelings for a survivor. There may be frustration at not being able to prevent the death, and a sense of not being able to exist without the loved one.</li>
        <li>Guilt and Self-reproach. People may believe that they were not kind enough or caring enough to the person who died, or that the person should have seen the doctor sooner.</li>
        <li>Anxiety. An individual may fear that she/he won't be able to care for herself/himself.</li>
        <li>Loneliness. There are reminders throughout the day that a partner, family member or friend is gone. For example, meals are no longer prepared the same way, phone calls to share a special moment don't happen.</li>
        <li>Fatigue. There is an overall sense of feeling tired.</li>
        <li>Disbelief: This occurs particularly if it was a sudden death.</li>
    </ul>
    
    <h4>Helping Others Who Are Experiencing Grief</h4>
    
    <p>When a friend, loved one, or co-worker is experiencing grief—how can we help? It helps to understand that grief is expressed through a variety of behaviours.</p>
    
    <p>Reach out to others in their grief, but understand that some may not want to accept help and will not share their grief. Others will want to talk about their thoughts and feelings or reminisce.</p>
    
    <p>Be patient and let the grieving person know that you care and are there to support him or her.</p>
    
    <h4>II. Good Grief</h4>
    <p>AMITAI ETZIONI</p>
    
    <p>Soon after my wife died — her car slid off an icy road in 1985 — a school psychologist warned me that my children and I were not mourning in the right way. We felt angry; the proper first stage, he said, is denial.</p>
    
    <p>In late August this year, my 38-year-old son, Michael, died suddenly in his sleep, leaving behind a 2-year-old son and a wife expecting their next child.</p>
    
    <p>There is no set form for grief, and no 'right' way to express it. There seems to be an expectation that, after a great loss, we will progress systematically through the well-known stages of grief. It is wrong, we are told, to jump to anger — or to wallow too long in this stage before moving towards acceptance.</p>
    
    <p>But I was, and am, angry. To make parents bury their children is wrong; to have both my wife and son taken from me, for forever and a day, is cruel beyond words.</p>
    
    <p>A relative from Jerusalem, who is a psychiatrist, brought some solace by citing the maxim: 'We are not to ask why, but what.' The 'what' is that which survivors in grief are bound to do for one another. Following that advice, my family, close friends and I keep busy, calling each other and giving long answers to simple questions like, "How did your day go today?" We try to avoid thinking about either the immediate past or the bereft future. We take turns playing with Max, Michael's two-year-old son. Friends spend nights with the young widow, and will be among those holding her hand when the baby is born.</p>
    
    <p>Focusing on what we do for one another is the only consolation we can find.</p>
    
    <h3>Joy and Sorrow</h3>
    <p>Then a woman said, "Speak to us of Joy and Sorrow."<br>
    And he answered:<br>
    Your joy is your sorrow unmasked.<br>
    And the selfsame well from which your laughter rises was oftentimes filled with your tears.<br>
    And how else can it be?<br>
    The deeper that sorrow carves into your being, the more joy you can contain.<br>
    Is not the cup that holds your wine the very cup that was burned in the potter's oven?<br>
    And is not the lute that soothes your spirit, the very wood that was hollowed out with knives?<br>
    When you are joyous, look deep into your heart and you shall find it is only that which has given you sorrow that is giving you joy.<br>
    When you are sorrowful look again in your heart, and you shall see that in truth you are weeping for that which has been your delight.<br>
    Some of you say, "Joy is greater than sorrow," and others say, "Nay, sorrow is the greater."<br>
    But I say unto you, they are inseparable.<br>
    Together they come, and when one sits alone with you at your board, remember that the other is asleep upon your bed.</p>
    
    <p>Say not in grief that she is no more<br>
    but say in thankfulness that she was.<br>
    A death is not the extinguishing of a light,<br>
    but the putting out of the lamp because the dawn has come.</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. When her son dies, Kisa Gotami goes from house to house. What does she ask for? Does she get it? Why not?</div>
        <div class="comprehension-question">2. Kisa Gotami again goes from house to house after she speaks with the Buddha. What does she ask for, the second time around? Does she get it? Why not?</div>
        <div class="comprehension-question">3. What does Kisa Gotami understand the second time that she failed to understand the first time? Was this what the Buddha wanted her to understand?</div>
        <div class="comprehension-question">4. Why do you think Kisa Gotami understood this only the second time? In what way did the Buddha change her understanding?</div>
        <div class="comprehension-question">5. How do you usually understand the idea of 'selfishness'? Do you agree with Kisa Gotami that she was being 'selfish in her grief'?</div>
    </div>
`;

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">FOR ANNE GREGORY</p>
        <p class="poem-author">by William Butler Yeats</p>
        
        <div class="poem-stanza">
            <p class="poem-line">"Never shall a young man,</p>
            <p class="poem-line">Thrown into despair</p>
            <p class="poem-line">By those great honey-coloured</p>
            <p class="poem-line"><span class="highlight-vocab">Ramparts<span class="vocab-tooltip">the high, wide walls around a castle or fort</span></span> at your ear,</p>
            <p class="poem-line">Love you for yourself alone</p>
            <p class="poem-line">And not your yellow hair."</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">"But I can get a hair-dye</p>
            <p class="poem-line">And set such colour there,</p>
            <p class="poem-line">Brown, or black, or carrot,</p>
            <p class="poem-line">That young men in despair</p>
            <p class="poem-line">May love me for myself alone</p>
            <p class="poem-line">And not my yellow hair."</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">"I heard an old religious man</p>
            <p class="poem-line">But yesternight declare</p>
            <p class="poem-line">That he had found a text to prove</p>
            <p class="poem-line">That only God, my dear,</p>
            <p class="poem-line">Could love you for yourself alone</p>
            <p class="poem-line">And not your yellow hair."</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ramparts</div>
        <div class="definition">the high, wide walls around a castle or fort</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What does the young man mean by "great honey-coloured/Ramparts at your ear?" Why does he say that young men are "thrown into despair" by them?</div>
        <div class="comprehension-question">2. What colour is the young woman's hair? What does she say she can change it to? Why would she want to do so?</div>
        <div class="comprehension-question">3. Objects have qualities which make them desirable to others. Can you think of some objects (a car, a phone, a dress…) and say what qualities make one object more desirable than another?</div>
        <div class="comprehension-question">4. What about people? Do we love others because we like their qualities, whether physical or mental? Or is it possible to love someone "for themselves alone"?</div>
        <div class="comprehension-question">5. You have perhaps concluded that people are not objects to be valued for their qualities or riches rather than for themselves. But elsewhere Yeats asks the question: How can we separate the dancer from the dance? Is it possible to separate 'the person himself or herself' from how the person looks, sounds, walks, and so on?</div>
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
        text = text.replace(/\\s+/g, ' ');
        return text;
    }).filter(text => text.length > 0);
    
    // Create chunks of paragraphs (approximately 250-300 words per chunk)
    const textChunks = [];
    let currentChunk = "The Sermon at Benares. ";
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
            text = text.replace(/\\s+/g, ' ');
            return text;
        })
        .filter(text => text.length > 0)
        .join('\n'); // Fix: Use actual newline character instead of escaped string
    
    // Full poem text for narration - poems are usually short enough to read in one go
    // Fix: Replace escaped newlines with actual newlines to prevent "N-N" being narrated
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
