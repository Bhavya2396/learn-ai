/**
 * Story content and functionality for In the Kingdom of Fools
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>IN the Kingdom of Fools, both the king and the minister were <span class="highlight-vocab">idiots<span class="vocab-tooltip">foolish or stupid people</span></span>. They didn't want to run things like other kings, so they decided to change night into day and day into night. They ordered that everyone should be awake at night, till their fields and run their businesses only after dark, and go to bed as soon as the sun came up. Anyone who disobeyed would be punished with death. The people did as they were told for fear of death. The king and the minister were delighted at the success of their project.</p>

    <div class="vocabulary-note">
        <div class="word">idiots</div>
        <div class="definition">foolish or stupid people</div>
    </div>

    <p>One day a guru and his disciple arrived in the city. It was a beautiful city, it was broad daylight, but there was no one about. Everyone was asleep, not a mouse <span class="highlight-vocab">stirring<span class="vocab-tooltip">moving</span></span>. Even the cattle had been taught to sleep by day. The two strangers were amazed by what they saw around them and wandered around town till evening, when suddenly the whole town woke up and went about its nightly business.</p>
    
    <div class="vocabulary-note">
        <div class="word">stirring</div>
        <div class="definition">moving</div>
    </div>
    
    <p>The two men were hungry. Now that the shops were open, they went to buy some groceries. To their astonishment, they found that everything cost the same, a single <span class="highlight-vocab">duddu<span class="vocab-tooltip">a coin of low value</span></span> — whether they bought a measure of rice or a bunch of bananas, it cost a duddu. The guru and his disciple were delighted. They had never heard of anything like this. They could buy all the food they wanted for a rupee.</p>

    <div class="vocabulary-note">
        <div class="word">duddu</div>
        <div class="definition">a coin of low value</div>
    </div>
    
    <p>When they had cooked and eaten, the guru realised that this was a kingdom of fools and it wouldn't be a good idea for them to stay there. "This is no place for us. Let's go," he said to his disciple. But the disciple didn't want to leave the place. Everything was cheap here. All he wanted was good, cheap food. The guru said, "They are all fools. This won't last very long, and you can't tell what they'll do to you next."</p>
    
    <p>But the disciple wouldn't listen to the guru's wisdom. He wanted to stay. The guru finally gave up and said, "Do what you want. I'm going," and left. The disciple stayed on, ate his fill every day — bananas and <span class="highlight-vocab">ghee<span class="vocab-tooltip">clarified butter</span></span> and rice and wheat, and grew fat like a street-side sacred bull.</p>

    <div class="vocabulary-note">
        <div class="word">ghee</div>
        <div class="definition">clarified butter</div>
    </div>
    
    <p>One bright day, a thief broke into a rich merchant's house. He had made a hole in the wall and sneaked in, and as he was carrying out his <span class="highlight-vocab">loot<span class="vocab-tooltip">stolen goods</span></span>, the wall of the old house collapsed on his head and killed him on the spot. His brother ran to the king and complained, "Your Highness, when my brother was pursuing his ancient trade, a wall fell on him and killed him. This merchant is to blame. He should have built a good, strong wall. You must punish the wrongdoer and compensate the family for this injustice."</p>
    
    <div class="vocabulary-note">
        <div class="word">loot</div>
        <div class="definition">stolen goods</div>
    </div>
    
    <p>The king said, "Justice will be done. Don't worry," and at once <span class="highlight-vocab">summoned<span class="vocab-tooltip">called to appear</span></span> the owner of the house.</p>

    <div class="vocabulary-note">
        <div class="word">summoned</div>
        <div class="definition">called to appear</div>
    </div>
    
    <p>When the merchant arrived, the king questioned him. "What's your name?" "Such and Such, Your Highness." "Were you at home when the dead man <span class="highlight-vocab">burgled<span class="vocab-tooltip">broke into and stole from</span></span> your house?" "Yes, My Lord. He broke in and the wall was weak. It fell on him." "The accused pleads guilty. Your wall killed this man's brother. You have murdered a man. We have to punish you."</p>

    <div class="vocabulary-note">
        <div class="word">burgled</div>
        <div class="definition">broke into and stole from</div>
    </div>
    
    <p>"Lord," said the helpless merchant, "I didn't put up the wall. It's really the fault of the man who built the wall. He didn't build it right. You should punish him."</p>
    
    <p>"Who is that?" "My Lord, this wall was built in my father's time. I know the man. He's an old man now. He lives nearby."</p>
    
    <p>The king sent out messengers to bring in the <span class="highlight-vocab">bricklayer<span class="vocab-tooltip">person who builds with bricks</span></span> who had built the wall. They brought him, tied hand and foot.</p>
    
    <div class="vocabulary-note">
        <div class="word">bricklayer</div>
        <div class="definition">person who builds with bricks</div>
    </div>
    
    <p>"You there, did you build this man's wall in his father's time?" "Yes, My Lord, I did." "What kind of a wall is this that you built? It has fallen on a poor man and killed him. You've murdered him. We have to punish you by death."</p>
    
    <p>Before the king could order the execution, the poor bricklayer pleaded, "Please listen to me before you give your orders. It's true I built this wall and it was no good. But that was because my mind was not on it. I remember very well a dancing girl who was going up and down that street all day with her anklets jingling, and I couldn't keep my eyes or my mind on the wall I was building. You must get that dancing girl. I know where she lives."</p>
    
    <p>"You're right. The case <span class="highlight-vocab">deepens<span class="vocab-tooltip">becomes more complex or serious</span></span>. We must look into it. It is not easy to judge such complicated cases. Let's get that dancer, wherever she is."</p>

    <div class="vocabulary-note">
        <div class="word">deepens</div>
        <div class="definition">becomes more complex or serious</div>
    </div>
    
    <p>The dancing girl, now an old woman, came trembling to the court. "Did you walk up and down that street many years ago, while this poor man was building a wall? Did you see him?" "Yes, My Lord, I remember it very well." "So you did walk up and down, with your anklets jingling. You were young and you distracted him, so he built a bad wall. It has fallen on a poor burglar and killed him. You've killed an innocent man. You'll have to be punished."</p>
    
    <p>She thought for a minute and said, "My Lord, wait. I know now why I was walking up and down that street. I had given some gold to the goldsmith to make some <span class="highlight-vocab">jewellery<span class="vocab-tooltip">decorative items made of gold, silver, or precious stones</span></span> for me. He was a lazy <span class="highlight-vocab">scoundrel<span class="vocab-tooltip">villain; dishonest person</span></span>. He made so many excuses, said he would give it now and he would give it then and so on all day. He made me walk up and down to his house a dozen times. That was when this bricklayer saw me. It's not my fault, My Lord, it's the damned goldsmith's fault."</p>
    
    <div class="vocabulary-note">
        <div class="word">jewellery</div>
        <div class="definition">decorative items made of gold, silver, or precious stones</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">scoundrel</div>
        <div class="definition">villain; dishonest person</div>
    </div>

    <p>"Poor thing, she's absolutely right," thought the king, <span class="highlight-vocab">weighing<span class="vocab-tooltip">considering carefully</span></span> the evidence. "We've got the real culprit at last. Get the goldsmith, wherever he is hiding. At once!"</p>
    
    <div class="vocabulary-note">
        <div class="word">weighing</div>
        <div class="definition">considering carefully</div>
    </div>

    <p>The king's <span class="highlight-vocab">bailiffs<span class="vocab-tooltip">law officers who make sure that the decisions of a court are obeyed</span></span> searched for the goldsmith, who was hiding in a corner of his shop. When he heard the accusation against him, he had his own story to tell.</p>
    
    <div class="vocabulary-note">
        <div class="word">bailiffs</div>
        <div class="definition">law officers who make sure that the decisions of a court are obeyed</div>
    </div>
    
    <p>"My Lord," he said, "I 'm a poor goldsmith. It's true I made this dancer come many times to my door. I gave her excuses because I couldn't finish making her jewellery before I finished the rich merchant's orders. They had a wedding coming, and they wouldn't wait. You know how <span class="highlight-vocab">impatient<span class="vocab-tooltip">unable to wait calmly</span></span> rich men are!"</p>

    <div class="vocabulary-note">
        <div class="word">impatient</div>
        <div class="definition">unable to wait calmly</div>
    </div>
    
    <p>"Who is this rich merchant who kept you from finishing this poor woman's jewellery, made her walk up and down, which distracted this bricklayer, which made a mess of his wall, which has now fallen on an innocent man and killed him? Can you name him?"</p>
    
    <p>The goldsmith named the merchant, and he was none other than the original owner of the house whose wall had fallen. Now justice had come full circle, thought the king, back to the merchant. When he was rudely summoned back to the court, he arrived crying, "It wasn't me but my father who ordered the jewellery! He's dead! I'm innocent!"</p>
    
    <p>But the king consulted his minister and ruled decisively: "It's true your father is the true murderer. He's dead, but somebody must be punished in his place. You've <span class="highlight-vocab">inherited<span class="vocab-tooltip">received as an heir</span></span> everything from that criminal father of yours, his riches as well as his sins. I knew at once, even when I first set eyes on you, that you were at the root of this horrible crime. You must die."</p>
    
    <div class="vocabulary-note">
        <div class="word">inherited</div>
        <div class="definition">received as an heir</div>
    </div>

    <p>And he ordered a new <span class="highlight-vocab">stake<span class="vocab-tooltip">pointed wooden post onto which a victim is impaled as a method of execution</span></span> to be made ready for the final <span class="highlight-vocab">impaling<span class="vocab-tooltip">execution by fixing on a stake</span></span> of the criminal. As the servants sharpened the stake and got it ready for the final impaling of the criminal, it occurred to the minister that the rich merchant was somehow too thin to be properly executed on the stake. He appealed to the king's common sense. The king too worried about it.</p>
    
    <div class="vocabulary-note">
        <div class="word">stake</div>
        <div class="definition">pointed wooden post onto which a victim is impaled as a method of execution</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">impaling</div>
        <div class="definition">execution by fixing on a stake</div>
    </div>
    
    <p>"What shall we do?" he said, when suddenly it struck him that all they needed to do was to find a man fat enough to fit the stake. The servants were immediately sent all over the town looking for a man who would fit the stake, and their eyes fell on the disciple who had fattened himself for months on bananas and rice and wheat and ghee.</p>
    
    <p>"What have I done wrong? I'm innocent. I'm a <span class="highlight-vocab">sanyasi<span class="vocab-tooltip">religious ascetic; one who renounces worldly life</span></span>!" he cried.</p>
    
    <div class="vocabulary-note">
        <div class="word">sanyasi</div>
        <div class="definition">religious ascetic; one who renounces worldly life</div>
    </div>

    <p>"That may be true. But it's the royal decree that we should find a man fat enough to fit the stake," they said, and carried him to the place of execution. He remembered his wise guru's words: "This is a city of fools. You don't know what they will do next." While he was waiting for death, he prayed to his guru in his heart, asking him to hear his cry wherever he was. The guru saw everything in a vision; he had magic powers, he could see far, and he could see the future as he could see the present and the past. He arrived at once to save his disciple, who had got himself into such a <span class="highlight-vocab">scrape<span class="vocab-tooltip">difficult situation</span></span> through love of food.</p>
    
    <div class="vocabulary-note">
        <div class="word">scrape</div>
        <div class="definition">difficult situation</div>
    </div>
    
    <p>As soon as he arrived, he scolded the disciple and told him something in a whisper. Then he went to the king and addressed him, "O wisest of kings, who is greater? The guru or the disciple?"</p>
    
    <p>"Of course, the guru. No doubt about it. Why do you ask?" "Then put me to the stake first. Put my disciple to death after me."</p>
    
    <p>When the disciple heard this, he understood and began to <span class="highlight-vocab">clamour<span class="vocab-tooltip">make loud demands</span></span>, "Me first! You brought me here first! Put me to death first, not him!"</p>
    
    <div class="vocabulary-note">
        <div class="word">clamour</div>
        <div class="definition">make loud demands</div>
    </div>
    
    <p>The guru and the disciple now got into a fight about who should go first. The king was puzzled by this behaviour. He asked the guru, "Why do you want to die? We chose him because we needed a fat man for the stake."</p>
    
    <p>"You shouldn't ask me such questions. Put me to death first," replied the guru.</p>
    
    <p>"Why? There's some mystery here. As a wise man you must make me understand."</p>
    
    <p>"Will you promise to put me to death if I tell you?" asked the guru. The king gave him his <span class="highlight-vocab">solemn<span class="vocab-tooltip">formal and serious</span></span> word. The guru took him aside, out of the servants' earshot, and whispered to him, "Do you know why we want to die right now, the two of us? We've been all over the world but we've never found a city like this or a king like you. That stake is the stake of the god of justice. It's new, it has never had a criminal on it. Whoever dies on it first will be reborn as the king of this country. And whoever goes next will be the future minister of this country. We're sick of our <span class="highlight-vocab">ascetic<span class="vocab-tooltip">practising self-discipline and abstention</span></span> life. It would be nice to enjoy ourselves as king and minister for a while. Now keep your word, My Lord, and put us to death. Me first, remember?"</p>
    
    <div class="vocabulary-note">
        <div class="word">solemn</div>
        <div class="definition">formal and serious</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ascetic</div>
        <div class="definition">practising self-discipline and abstention</div>
    </div>
    
    <p>The king was now thrown into deep thought. He didn't want to lose the kingdom to someone else in the next round of life. He needed time. So he ordered the execution postponed to the next day and talked in secret with his minister. "It's not right for us to give over the kingdom to others in the next life. Let's go on the stake ourselves and we'll be reborn as king and minister again. Holy men do not tell lies," he said, and the minister agreed.</p>
    
    <p>So he told the executioners, "We'll send the criminals tonight. When the first man comes to you, put him to death first. Then do the same to the second man. Those are my orders. Don't make any mistake."</p>
    
    <p>That night, the king and his minister went secretly to the prison, released the guru and the disciple, <span class="highlight-vocab">disguised<span class="vocab-tooltip">dressed to look like someone else</span></span> themselves as the two, and as arranged beforehand with loyal servants, were taken to the stake and promptly executed.</p>
    
    <div class="vocabulary-note">
        <div class="word">disguised</div>
        <div class="definition">dressed to look like someone else</div>
    </div>
    
    <p>When the bodies were taken down to be thrown to crows and <span class="highlight-vocab">vultures<span class="vocab-tooltip">large birds that feed on dead animals</span></span> the people <span class="highlight-vocab">panicked<span class="vocab-tooltip">were suddenly afraid</span></span>. They saw before them the dead bodies of the king and the minister. The city was in confusion.</p>
    
    <div class="vocabulary-note">
        <div class="word">vultures</div>
        <div class="definition">large birds that feed on dead animals</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">panicked</div>
        <div class="definition">were suddenly afraid</div>
    </div>
    
    <p>All night they mourned and discussed the future of the kingdom. Some people suddenly thought of the guru and the disciple and caught up with them as they were preparing to leave town unnoticed. "We people need a king and a minister," said someone. Others agreed. They begged the guru and the disciple to be their king and their minister. It didn't take many arguments to persuade the disciple, but it took longer to persuade the guru. They finally agreed to rule the kingdom of the foolish king and the silly minister, on the condition that they could change all the old laws.</p>
    
    <p>From then on, night would again be night and day would again be day, and you could get nothing for a duddu. It became like any other place.</p>

    <p class="story-credit">[A Kannada folktale from A.K. Ramanujan's Folk Tales from India]</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What are the two strange things the guru and his disciple find in the Kingdom of Fools?</div>
        <div class="comprehension-question">2. Why does the disciple decide to stay in the Kingdom of Fools?</div>
        <div class="comprehension-question">3. Who are all the people tried in the king's court?</div>
        <div class="comprehension-question">4. How does the guru manage to save his disciple's life?</div>
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
    let currentChunk = "In the Kingdom of Fools, a Kannada folktale. ";
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
