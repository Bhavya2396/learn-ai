/**
 * Story content and functionality for A House Is Not a Home
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>MY first year of high school felt <span class="highlight-vocab">awkward<span class="vocab-tooltip">uncomfortable, strange</span></span>. After leaving junior high at the head of my class with all the seniority the upper grade levels could afford me, it felt strange starting over as a freshman. The school was twice as big as my old school, and to make matters worse, my closest friends were sent to a different high school. I felt very <span class="highlight-vocab">isolated<span class="vocab-tooltip">alone, separated from others</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">awkward</div>
        <div class="definition">uncomfortable, strange</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">isolated</div>
        <div class="definition">alone, separated from others</div>
    </div>
    
    <p>I missed my old teachers so much that I would go back and visit them. They would encourage me to get involved in school activities so that I could meet new people. They told me that in time I would adjust and probably end up loving my new school more than I had my old one. They made me promise that when that happened I would still come by and visit them from time to time. I understood the <span class="highlight-vocab">psychology<span class="vocab-tooltip">the science of the mind and behavior</span></span> in what they were saying, but I took some comfort in it <span class="highlight-vocab">nonetheless<span class="vocab-tooltip">in spite of that</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">psychology</div>
        <div class="definition">the science of the mind and behavior</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">nonetheless</div>
        <div class="definition">in spite of that</div>
    </div>
    
    <p>One Sunday afternoon, not long after I had started high school, I was sitting at home at our dining-room table doing homework. It was a cold and windy fall day, and we had a fire going in our fireplace. As usual, my red tabby cat was lying on top of all my papers, purring loudly and occasionally <span class="highlight-vocab">swatting<span class="vocab-tooltip">hitting with a quick blow</span></span> at my pen for entertainment's sake.</p>
    
    <div class="vocabulary-note">
        <div class="word">swatting</div>
        <div class="definition">hitting with a quick blow</div>
    </div>
    
    <p>She was never far from me. I had <span class="highlight-vocab">rescued<span class="vocab-tooltip">saved from danger</span></span> her when she was a kitten, and somehow she knew that I was the one responsible for giving her 'the good life'.</p>
    
    <div class="vocabulary-note">
        <div class="word">rescued</div>
        <div class="definition">saved from danger</div>
    </div>
    
    <p>My mother kept <span class="highlight-vocab">stoking<span class="vocab-tooltip">feeding and tending</span></span> the fire to keep the house nice and warm. Suddenly, I smelled something strange, and then I noticed it... smoke pouring in through the seams of the ceiling. The smoke began to fill the room so quickly that we could barely see. <span class="highlight-vocab">Groping<span class="vocab-tooltip">feeling about blindly</span></span> our way to the front door, we all ran out into the front yard. By the time we made our way outside, the whole roof was <span class="highlight-vocab">engulfed<span class="vocab-tooltip">completely surrounded or covered</span></span> in flames and it was spreading quickly. I ran to the neighbours to call the fire department, while I watched my mother run back into the house.</p>
    
    <div class="vocabulary-note">
        <div class="word">stoking</div>
        <div class="definition">feeding and tending</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">groping</div>
        <div class="definition">feeling about blindly</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">engulfed</div>
        <div class="definition">completely surrounded or covered</div>
    </div>
    
    <p>My mother then ran out of the house carrying a small metal box full of important documents. She dropped the case on the lawn and, in a <span class="highlight-vocab">crazed<span class="vocab-tooltip">wild, frantic</span></span> state, ran back into the house. I knew what she was after. My father had died when I was young, and I was certain that she was not going to let his pictures and letters go up in flames. They were the only things that she had to remember him by. Still I screamed at her, "Mom! No!"</p>
    
    <div class="vocabulary-note">
        <div class="word">crazed</div>
        <div class="definition">wild, frantic</div>
    </div>
    
    <p>I was about to run after her when I felt a large hand hold me back. It was a fireman. I hadn't even noticed that the street had already filled with fire trucks. I was trying to free myself from his grasp, yelling, "You don't understand, my mother's in there!"</p>
    
    <p>He held on to me while other firefighters ran into the house. He knew that I wasn't acting very <span class="highlight-vocab">logically<span class="vocab-tooltip">in a way that follows the rules of reasoning</span></span> and that if he were to let go, I'd run. He was right.</p>
    
    <div class="vocabulary-note">
        <div class="word">logically</div>
        <div class="definition">in a way that follows the rules of reasoning</div>
    </div>
    
    <p>"It's all right, they'll get her," he said. He wrapped a blanket around me and sat me down in our car. Soon after that, a fireman emerged from our house with my mom in <span class="highlight-vocab">tow<span class="vocab-tooltip">being pulled along</span></span>. He quickly took her over to the truck and put an oxygen mask on her. I ran over and hugged her. All those times I ever argued with her and hated her vanished at the thought of losing her.</p>
    
    <div class="vocabulary-note">
        <div class="word">tow</div>
        <div class="definition">being pulled along</div>
    </div>
    
    <p>"She's going to be okay," said the fireman. "She just <span class="highlight-vocab">inhaled<span class="vocab-tooltip">breathed in</span></span> a little smoke." And then he ran back to fight the fire while my mother and I sat there <span class="highlight-vocab">dazed<span class="vocab-tooltip">stunned, confused</span></span>. I remember watching my house burn down and thinking that there was nothing I could do about it.</p>
    
    <div class="vocabulary-note">
        <div class="word">inhaled</div>
        <div class="definition">breathed in</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">dazed</div>
        <div class="definition">stunned, confused</div>
    </div>
    
    <p>Five hours later, the fire was finally out. Our house was almost completely burned down. But then it struck me ... I hadn't seen my cat. Where was my cat? Much to my horror, I <span class="highlight-vocab">realized<span class="vocab-tooltip">became fully aware</span></span> that she was nowhere to be found. Then all at once it hit me — the new school, the fire, my cat — I broke down in tears and cried and cried. I was suffering loss, big time.</p>
    
    <div class="vocabulary-note">
        <div class="word">realized</div>
        <div class="definition">became fully aware</div>
    </div>
    
    <p>The firemen wouldn't let us go back into the house that night. It was still too dangerous. Dead or alive, I couldn't imagine leaving without knowing about my cat. <span class="highlight-vocab">Regardless<span class="vocab-tooltip">in spite of everything</span></span>, I had to go. We piled into the car with just the clothes on our backs and a few of the firemen's blankets, and made our way to my grandparents' house to spend the night.</p>
    
    <div class="vocabulary-note">
        <div class="word">regardless</div>
        <div class="definition">in spite of everything</div>
    </div>
    
    <p>The next day, Monday, I went to school. When the fire broke out, I was still wearing the dress I had worn to church that morning but I had no shoes! I had kicked them off when I was doing my homework. They became yet another <span class="highlight-vocab">casualty<span class="vocab-tooltip">victim or loss</span></span> of the fire. So I had to borrow some tennis shoes from my aunt. Why couldn't I just stay home from school? My mother wouldn't hear of it, but I was totally <span class="highlight-vocab">embarrassed<span class="vocab-tooltip">feeling self-conscious, uncomfortable or humiliated</span></span> by everything. The clothes I was wearing looked weird, I had no books or homework, and my backpack was gone. I had my life in that backpack! The more I tried to fit in, the worse it got. Was I destined to be an <span class="highlight-vocab">outcast<span class="vocab-tooltip">someone who is not accepted</span></span> and a geek all my life? That's what it felt like. I didn't want to grow up, change or have to handle life if it was going to be this way. I just wanted to curl up and die.</p>
    
    <div class="vocabulary-note">
        <div class="word">casualty</div>
        <div class="definition">victim or loss</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">embarrassed</div>
        <div class="definition">feeling self-conscious, uncomfortable or humiliated</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">outcast</div>
        <div class="definition">someone who is not accepted</div>
    </div>
    
    <p>I walked around school like a <span class="highlight-vocab">zombie<span class="vocab-tooltip">a dull and apathetic person</span></span>. Everything felt <span class="highlight-vocab">surreal<span class="vocab-tooltip">strange, bizarre</span></span>, and I wasn't sure what was going to happen. All the security I had known, from my old school, my friends, my house and my cat had all been <span class="highlight-vocab">ripped<span class="vocab-tooltip">torn violently</span></span> away.</p>
    
    <div class="vocabulary-note">
        <div class="word">zombie</div>
        <div class="definition">a dull and apathetic person</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">surreal</div>
        <div class="definition">strange, bizarre</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ripped</div>
        <div class="definition">torn violently</div>
    </div>
    
    <p>When I walked through what used to be my house after school that day, I was <span class="highlight-vocab">shocked<span class="vocab-tooltip">surprised or startled emotionally</span></span> to see how much damage there was — whatever hadn't burned was destroyed by the water and chemicals they had used to put out the fire. The only material things not destroyed were the photo albums, documents and some other personal items that my mother had managed to <span class="highlight-vocab">heroically<span class="vocab-tooltip">bravely, courageously</span></span> rescue. But my cat was gone and my heart ached for her.</p>
    
    <div class="vocabulary-note">
        <div class="word">shocked</div>
        <div class="definition">surprised or startled emotionally</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">heroically</div>
        <div class="definition">bravely, courageously</div>
    </div>
    
    <p>There was no time to <span class="highlight-vocab">grieve<span class="vocab-tooltip">mourn, feel deep sorrow</span></span>. My mother rushed me out of the house. We would have to find a place to live, and I would have to go buy some clothes for school.</p>
    
    <div class="vocabulary-note">
        <div class="word">grieve</div>
        <div class="definition">mourn, feel deep sorrow</div>
    </div>
    
    <p>We had to borrow money from my grandparents because there were no credit cards, cash or even any identification to be able to withdraw money from the bank. Everything had gone up in smoke.</p>
    
    <p>That week the <span class="highlight-vocab">rubble<span class="vocab-tooltip">broken pieces of stone, brick, etc. from collapsed buildings</span></span> that used to be our house was being cleared off the lot. Even though we had rented an apartment nearby, I would go over to watch them clear away <span class="highlight-vocab">debris<span class="vocab-tooltip">scattered fragments, ruins</span></span>, hoping that my cat was somewhere to be found. She was gone. I kept thinking about her as that <span class="highlight-vocab">vulnerable<span class="vocab-tooltip">capable of being physically or emotionally wounded</span></span> little kitten. In the early morning when I would disturb her and get out of bed, she would tag along after me, climb up my robe and crawl into my pocket to fall asleep. I was missing her terribly.</p>
    
    <div class="vocabulary-note">
        <div class="word">rubble</div>
        <div class="definition">broken pieces of stone, brick, etc. from collapsed buildings</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">debris</div>
        <div class="definition">scattered fragments, ruins</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">vulnerable</div>
        <div class="definition">capable of being physically or emotionally wounded</div>
    </div>
    
    <p>It always seems that bad news spreads quickly, and in my case it was no different. Everyone in high school, including the teachers, was aware of my <span class="highlight-vocab">plight<span class="vocab-tooltip">a difficult or unfortunate situation</span></span>. I was embarrassed as if somehow I were responsible. What a way to start off at a new school! This was not the kind of attention I was looking for.</p>
    
    <div class="vocabulary-note">
        <div class="word">plight</div>
        <div class="definition">a difficult or unfortunate situation</div>
    </div>
    
    <p>The next day at school, people were acting even more strange than usual. I was getting ready for gym class at my locker. People were <span class="highlight-vocab">milling around<span class="vocab-tooltip">moving in an aimless manner</span></span> me, asking me to hurry up. I thought it strange, but in the light of the past few weeks, nothing would surprise me. It almost seemed that they were trying to <span class="highlight-vocab">shove<span class="vocab-tooltip">push hard</span></span> me into the gym — then I saw why. There was a big table set up with all kinds of stuff on it, just for me. They had taken up a collection and bought me school supplies, notebooks, all kinds of different clothes — jeans, tops, sweatsuits. It was like Christmas. I was overcome by emotion. People who had never spoken to me before were coming up to me to introduce themselves. I got all kinds of invitations to their houses. Their <span class="highlight-vocab">genuine<span class="vocab-tooltip">sincere, not fake</span></span> outpouring of concern really touched me. In that instant, I finally breathed a sigh of relief and thought for the first time that things were going to be okay. I made friends that day.</p>
    
    <div class="vocabulary-note">
        <div class="word">milling around</div>
        <div class="definition">moving in an aimless manner</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">shove</div>
        <div class="definition">push hard</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">genuine</div>
        <div class="definition">sincere, not fake</div>
    </div>
    
    <p>A month later, I was at my house watching them rebuild it. But this time it was different — I wasn't alone. I was with two of my new friends from school. It took a fire for me to stop focusing on my feelings of <span class="highlight-vocab">insecurity<span class="vocab-tooltip">lack of confidence</span></span> and open up to all the wonderful people around me. Now I was sitting there watching my house being rebuilt when I <span class="highlight-vocab">realized<span class="vocab-tooltip">became fully aware</span></span> my life was doing the same thing.</p>
    
    <div class="vocabulary-note">
        <div class="word">insecurity</div>
        <div class="definition">lack of confidence</div>
    </div>
    
    <p>While we sat there on the curb, planning my new bedroom, I heard someone walk up to me from behind and say, "Does this belong to you?" When I turned around to see who it was, I couldn't believe my eyes. A woman was standing there holding my cat! I <span class="highlight-vocab">leapt<span class="vocab-tooltip">jumped quickly</span></span> up and grabbed her out of the woman's arms. I held her close to me and cried into that beautiful orange fur. She purred happily. My friends were hugging me, hugging the cat and jumping around.</p>
    
    <div class="vocabulary-note">
        <div class="word">leapt</div>
        <div class="definition">jumped quickly</div>
    </div>
    
    <p>Apparently, my cat had been so <span class="highlight-vocab">freaked<span class="vocab-tooltip">frightened, extremely worried</span></span> by the fire that she ran over a mile away. Her collar had our phone number on it, but our phones had been destroyed and disconnected. This wonderful woman took her in and worked hard to find out whose cat it was. Somehow, she knew this cat was loved and sorely missed.</p>
    
    <div class="vocabulary-note">
        <div class="word">freaked</div>
        <div class="definition">frightened, extremely worried</div>
    </div>
    
    <p>As I sat there with my friends and my cat curled up in my lap, all the <span class="highlight-vocab">overwhelming<span class="vocab-tooltip">overpowering in effect or strength</span></span> feelings of loss and tragedy seemed to <span class="highlight-vocab">diminish<span class="vocab-tooltip">become less</span></span>. I felt gratitude for my life, my new friends, the kindness of a stranger and the loud purr of my beloved cat. My cat was back and so was I.</p>
    
    <div class="vocabulary-note">
        <div class="word">overwhelming</div>
        <div class="definition">overpowering in effect or strength</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">diminish</div>
        <div class="definition">become less</div>
    </div>
    
    <p class="author-name">ZAN GAUDIOSO</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What does the author notice one Sunday afternoon?</div>
        <div class="comprehension-question">2. Why does the author break down in tears after the fire?</div>
        <div class="comprehension-question">3. Why is the author deeply embarrassed the next day in school?</div>
        <div class="comprehension-question">4. What actions of the schoolmates change the author's understanding of life?</div>
        <div class="comprehension-question">5. What is the meaning of "My cat was back and so was I"?</div>
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
        if (p.closest('.vocabulary-note') || p.closest('.comprehension-check') || p.classList.contains('author-name')) {
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
    let currentChunk = "A House Is Not a Home, by Zan Gaudioso. ";
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
