/**
 * Story content and functionality for A Question of Trust
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>It is said that you must set a thief to catch a thief. But it is also said that there is honour among thieves. Which saying does this story illustrate?</p>
    
    <div class="vocabulary-note">
        <div class="word">set a thief to catch a thief</div>
        <div class="definition">proverb meaning that it takes someone who knows how thieves think to catch one</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">honour among thieves</div>
        <div class="definition">proverb meaning that even criminals have a code of conduct among themselves</div>
    </div>
    
    <p>EVERYONE thought that Horace Danby was a good, honest citizen. He was about fifty years old and unmarried, and he lived with a housekeeper who worried over his health. In fact, he was usually very well and happy except for attacks of <span class="highlight-vocab">hay fever<span class="vocab-tooltip">a disorder affecting the nose and throat, caused by allergy to pollen or dust</span></span> in summer. He made locks and was successful enough at his business to have two helpers. Yes, Horace Danby was good and respectable — but not completely honest.</p>
    
    <div class="vocabulary-note">
        <div class="word">hay fever</div>
        <div class="definition">a disorder affecting the nose and throat, caused by allergy to pollen or dust</div>
    </div>
    
    <p>Fifteen years ago, Horace had served his first and only <span class="highlight-vocab">sentence<span class="vocab-tooltip">punishment given by a judge in court</span></span> in a prison library. He loved rare, expensive books. So he robbed a safe every year. Each year he planned carefully just what he would do, stole enough to last for twelve months, and secretly bought the books he loved through an agent.</p>
    
    <div class="vocabulary-note">
        <div class="word">sentence</div>
        <div class="definition">punishment given by a judge in court</div>
    </div>
    
    <p>Now, walking in the bright July sunshine, he felt sure that this year's robbery was going to be as successful as all the others. For two weeks he had been studying the house at Shotover Grange, looking at its rooms, its electric wiring, its paths and its garden. This afternoon the two servants, who remained in the Grange while the family was in London, had gone to the movies. Horace saw them go, and he felt happy in spite of a little <span class="highlight-vocab">tickle<span class="vocab-tooltip">slight itchy feeling</span></span> of hay fever in his nose. He came out from behind the garden wall, his tools carefully packed in a bag on his back.</p>
    
    <div class="vocabulary-note">
        <div class="word">tickle</div>
        <div class="definition">slight itchy feeling</div>
    </div>
    
    <p>There were about fifteen thousand pounds' worth of jewels in the Grange safe. If he sold them one by one, he expected to get at least five thousand, enough to make him happy for another year. There were three very interesting books coming up for sale in the autumn. Now he would get the money he wanted to buy them.</p>
    
    <p>He had seen the housekeeper hang the key to the kitchen door on a hook outside. He put on a pair of gloves, took the key, and opened the door. He was always careful not to leave any <span class="highlight-vocab">fingerprints<span class="vocab-tooltip">impressions or marks made by a person's fingertips</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">fingerprints</div>
        <div class="definition">impressions or marks made by a person's fingertips</div>
    </div>
    
    <p>A small dog was lying in the kitchen. It stirred, made a noise, and moved its tail in a friendly way.</p>
    
    <p>"All right, Sherry," Horace said as he passed. All you had to do to keep dogs quiet was to call them by their right names, and show them love.</p>
    
    <p>The safe was in the drawing room, behind a rather poor painting. Horace wondered for a moment whether he should collect pictures instead of books. But they took up too much room. In a small house, books were better.</p>
    
    <p>There was a great bowl of flowers on the table, and Horace felt his nose tickle. He gave a little sneeze and then put down his bag. He carefully arranged his tools. He had four hours before the servants returned.</p>
    
    <p>The safe was not going to be hard to open. After all, he had lived with locks and safes all his life. The <span class="highlight-vocab">burglar alarm<span class="vocab-tooltip">security system that warns about intruders</span></span> was poorly built. He went into the hall to cut its wire. He came back and sneezed loudly as the smell of the flowers came to him again.</p>
    
    <div class="vocabulary-note">
        <div class="word">burglar alarm</div>
        <div class="definition">security system that warns about intruders</div>
    </div>
    
    <p>How foolish people are when they own valuable things, Horace thought. A magazine article had described this house, giving a plan of all the rooms and a picture of this room. The writer had even mentioned that the painting hid a safe!</p>
    
    <p>But Horace found that the flowers were hindering him in his work. He buried his face in his handkerchief.</p>
    
    <p>Then he heard a voice say from the doorway, "What is it? A cold or hay fever?"</p>
    
    <p>Before he could think, Horace said, "Hay fever," and found himself sneezing again.</p>
    
    <p>The voice went on, "You can cure it with a special treatment, you know, if you find out just what plant gives you the disease. I think you'd better see a doctor, if you're serious about your work. I heard you from the top of the house just now."</p>
    
    <p>It was a quiet, kindly voice, but one with <span class="highlight-vocab">firmness<span class="vocab-tooltip">showing resoluteness and determination</span></span> in it. A woman was standing in the doorway, and Sherry was rubbing against her. She was young, quite pretty, and was dressed in red. She walked to the fireplace and straightened the ornaments there.</p>
    
    <div class="vocabulary-note">
        <div class="word">firmness</div>
        <div class="definition">showing resoluteness and determination</div>
    </div>
    
    <p>"Down, Sherry," she said. "Anyone would think I'd been away for a month!" She smiled at Horace, and went on, "However, I came back just in time, though I didn't expect to meet a burglar."</p>
    
    <p>Horace had some hope because she seemed to be amused at meeting him. He might avoid trouble if he treated her the right way. He replied, "I didn't expect to meet one of the family."</p>
    
    <p>She nodded. "I see what an <span class="highlight-vocab">inconvenience<span class="vocab-tooltip">something that causes trouble, difficulty, or discomfort</span></span> it is for you to meet me. What are you going to do?"</p>
    
    <div class="vocabulary-note">
        <div class="word">inconvenience</div>
        <div class="definition">something that causes trouble, difficulty, or discomfort</div>
    </div>
    
    <p>Horace said, "My first thought was to run."</p>
    <p>"Of course, you could do that. But I would telephone the police and tell them all about you. They'd get you at once."</p>
    
    <p>Horace said, "I would, of course, cut the telephone wires first and then...," he hesitated, a smile on his face, "I would make sure that you could do nothing for some time. A few hours would be enough."</p>
    
    <p>She looked at him seriously. "You'd hurt me?"</p>
    <p>Horace paused, and then said, "I think I was trying to frighten you when I said that."</p>
    <p>"You didn't frighten me."</p>
    <p>Horace suggested, "It would be nice if you would forget you ever saw me. Let me go."</p>
    <p>The voice was suddenly sharp. "Why should I? You were going to rob me. If I let you go, you'll only rob someone else. Society must be protected from men like you."</p>
    
    <p>Horace smiled. "I'm not a man who threatens society. I steal only from those who have a lot of money. I steal for a very good reason. And I hate the thought of prison."</p>
    
    <p>She laughed, and he begged, thinking that he had persuaded her, "Look, I have no right to ask you for anything, but I'm desperate. Let me go and I promise never to do this kind of thing again. I really mean it."</p>
    
    <p>She was silent, watching him closely. Then she said, "You are really afraid of going to prison, aren't you?"</p>
    
    <p>She came over to him shaking her head. "I have always liked the wrong kind of people."</p>
    
    <p>She picked up a silver box from the table and took a cigarette from it. Horace, eager to please her and seeing that she might help him, took off his gloves and gave her his cigarette lighter.</p>
    
    <p>"You'll let me go?" He held the lighter towards her.</p>
    <p>"Yes, but only if you'll do something for me."</p>
    <p>"Anything you say."</p>
    <p>"Before we left for London, I promised my husband to take my jewels to our bank; but I left them here in the safe. I want to wear them to a party tonight, so I came down to get them, but..."</p>
    
    <p>Horace smiled. "You've forgotten the numbers to open the safe, haven't you?"</p>
    
    <p>"Yes," replied the young lady.</p>
    <p>"Just leave it to me and you'll have them within an hour. But I'll have to break your safe."</p>
    <p>"Don't worry about that. My husband won't be here for a month, and I'll have the safe mended by that time."</p>
    
    <p>And within an hour Horace had opened the safe, given her the jewels, and gone happily away.</p>
    
    <p>For two days he kept his promise to the kind young lady. On the morning of the third day, however, he thought of the books he wanted and he knew he would have to look for another safe. But he never got the chance to begin his plan. By noon a policeman had arrested him for the jewel robbery at Shotover Grange.</p>
    
    <p>His <span class="highlight-vocab">fingerprints<span class="vocab-tooltip">impressions or marks made by a person's fingertips</span></span>, for he had opened the safe without gloves, were all over the room, and no one believed him when he said that the wife of the owner of the house had asked him to open the safe for her. The wife herself, a <span class="highlight-vocab">gray-haired<span class="vocab-tooltip">having hair that is gray in color</span></span>, <span class="highlight-vocab">sharp-tongued<span class="vocab-tooltip">speaking in a harsh, critical manner</span></span> woman of sixty, said that the story was nonsense.</p>
    
    <div class="vocabulary-note">
        <div class="word">gray-haired</div>
        <div class="definition">having hair that is gray in color</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">sharp-tongued</div>
        <div class="definition">speaking in a harsh, critical manner</div>
    </div>
    
    <p>Horace is now the assistant librarian in the prison. He often thinks of the charming, clever young lady who was in the same profession as he was, and who tricked him. He gets very angry when anyone talks about 'honour among thieves'.</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What did Horace Danby like to collect?</div>
        <div class="comprehension-question">2. Why did he steal every year?</div>
        <div class="comprehension-question">3. Who was the real culprit in the story?</div>
        <div class="comprehension-question">4. Did Horace's hay fever cause his downfall?</div>
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
        text = text.replace(/\\s+/g, ' ');
        return text;
    }).filter(text => text.length > 0);
    
    // Create chunks of paragraphs (approximately 250-300 words per chunk)
    const textChunks = [];
    let currentChunk = "A Question of Trust, by Victor Canning. ";
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
    
    // Find the active content container
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
