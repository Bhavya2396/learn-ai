/**
 * Story content and functionality for The Last Leaf
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>It is autumn. The wind is blowing hard and it is raining heavily. All the leaves on an ivy creeper have fallen, except one. Why doesn't the last leaf fall?</p>

    <p>SUE and Johnsy, two young artists, shared a small flat. The flat was on the third <span class="highlight-vocab">storey<span class="vocab-tooltip">floor or level of a building</span></span> of an old house.</p>
    
    <div class="vocabulary-note">
        <div class="word">storey</div>
        <div class="definition">floor or level of a building</div>
    </div>
    
    <p>Johnsy fell very seriously ill in November. She had <span class="highlight-vocab">pneumonia<span class="vocab-tooltip">a lung disease characterized by inflammation of the lung tissue</span></span>. She would lie in her bed without moving, just gazing out of the window. Sue, her friend, became very worried. She sent for the doctor. Although he came every day there was no change in Johnsy's condition.</p>
    
    <div class="vocabulary-note">
        <div class="word">pneumonia</div>
        <div class="definition">a lung disease characterized by inflammation of the lung tissue</div>
    </div>
    
    <p>One day the doctor took Sue aside and asked her, "Is anything worrying Johnsy?"</p>
    
    <p>"No," replied Sue. "But why do you ask?"</p>
    
    <p>The doctor said "Johnsy, it seems, has made up her mind that she is not going to get well. If she doesn't want to live, medicines will not help her."</p>
    
    <p>Sue tried her best to make Johnsy take an interest in things around her. She talked about clothes and fashions, but Johnsy did not respond. Johnsy continued to lie still on her bed. Sue brought her drawing-board into Johnsy's room and started painting. To take Johnsy's mind off her illness, she <span class="highlight-vocab">whistled<span class="vocab-tooltip">produced musical sound by forcing breath through a small opening between nearly closed lips</span></span> while working.</p>
    
    <div class="vocabulary-note">
        <div class="word">whistled</div>
        <div class="definition">produced musical sound by forcing breath through a small opening between nearly closed lips</div>
    </div>
    
    <p>Suddenly Sue heard Johnsy whisper something. She quickly rushed to the bed and heard Johnsy counting backwards. She was looking out of the window and was saying, "Twelve!" After sometime she whispered "eleven", then "ten", then "nine", "eight", "seven". Sue anxiously looked out of the window. She saw an old ivy creeper climbing half-way up the brick wall opposite their window. In the strong wind outside, the creeper was <span class="highlight-vocab">shedding<span class="vocab-tooltip">dropping, losing</span></span> its leaves.</p>
    
    <div class="vocabulary-note">
        <div class="word">shedding</div>
        <div class="definition">dropping, losing</div>
    </div>
    
    <p>"What is it, dear?" Sue asked.</p>
    
    <p>"Six," whispered Johnsy. "They are falling faster now. Three days ago there were almost a hundred leaves. There are only five left now."</p>
    
    <p>"It is autumn," said Sue, "and the leaves will fall."</p>
    
    <p>"When the last leaf falls, I will die," said Johnsy with <span class="highlight-vocab">finality<span class="vocab-tooltip">the impression that something is final, conclusive, or settled</span></span>. "I have known this for the last three days."</p>
    
    <div class="vocabulary-note">
        <div class="word">finality</div>
        <div class="definition">the impression that something is final, conclusive, or settled</div>
    </div>
    
    <p>"Oh, that's nonsense," replied Sue. "What have old ivy leaves to do with your getting well? The doctor is confident that you will get better."</p>
    
    <p>Johnsy did not say anything. Sue went and brought her a bowl of soup.</p>
    
    <p>"I don't want any soup," said Johnsy. "I am not hungry… Now there are only four leaves left. I want to see the last one fall before it gets dark. Then I will sleep forever."</p>
    
    <p>Sue sat on Johnsy's bed, kissed her and said, "You are not going to die. I can't draw the <span class="highlight-vocab">curtain<span class="vocab-tooltip">piece of cloth hanging across a window or doorway to block light</span></span> for I need the light. I want to finish the painting and get some money for us. Please, my dear friend," she begged Johnsy, "promise not to look out of the window while I paint."</p>
    
    <div class="vocabulary-note">
        <div class="word">curtain</div>
        <div class="definition">piece of cloth hanging across a window or doorway to block light</div>
    </div>
    
    <p>"All right," said Johnsy. "Finish your painting soon for I want to see the last leaf fall. I'm tired of waiting. I have to die, so let me go away peacefully like one of those poor, tired leaves."</p>
    
    <p>"Try to sleep," said Sue. "I have to paint an old miner. I will call <span class="highlight-vocab">Behrman<span class="vocab-tooltip">an old painter who lives on the ground floor of their building</span></span> up to be my model."</p>
    
    <div class="vocabulary-note">
        <div class="word">Behrman</div>
        <div class="definition">an old painter who lives on the ground floor of their building</div>
    </div>
    
    <p>Sue rushed down. Behrman lived on the ground floor. He was a sixty-year-old painter. His lifelong dream was to paint a <span class="highlight-vocab">masterpiece<span class="vocab-tooltip">a work of outstanding artistry or skill</span></span> but that had remained a dream.</p>
    
    <div class="vocabulary-note">
        <div class="word">masterpiece</div>
        <div class="definition">a work of outstanding artistry or skill</div>
    </div>
    
    <p>Sue poured out her worries to Behrman. She told him how Johnsy was convinced that she would die when the last leaf fell.</p>
    
    <p>"Is she stupid?" asked Behrman. "How can she be so foolish?"</p>
    
    <p>"She is running a high temperature,"complained Sue. "She refuses to eat or drink and that worries me a lot."</p>
    
    <p>"I will come with you and see Johnsy," Behrman said.</p>
    
    <p>They <span class="highlight-vocab">tiptoed<span class="vocab-tooltip">walked quietly and carefully on the tips of the toes</span></span> into the room. Johnsy was sleeping. Sue drew the curtains together and they went to the next room. She peeped out through the window. There was only one leaf on the creeper. It was raining heavily and an icy-cold wind was blowing. It seemed as though the leaf would fall any minute now. Behrman did not say a word. He went back to his room.</p>
    
    <div class="vocabulary-note">
        <div class="word">tiptoed</div>
        <div class="definition">walked quietly and carefully on the tips of the toes</div>
    </div>
    
    <p>Johnsy woke up next morning. In a <span class="highlight-vocab">feeble<span class="vocab-tooltip">physically weak</span></span> voice she asked Sue to draw the curtains. Sue was nervous. She drew back the curtains very reluctantly.</p>
    
    <div class="vocabulary-note">
        <div class="word">feeble</div>
        <div class="definition">physically weak</div>
    </div>
    
    <p>"Oh!" Sue exclaimed as she looked at the vine creeper. "Look, there is still one leaf on the creeper. It looks quite green and healthy. In spite of the storm and the fierce winds, it didn't fall."</p>
    
    <p>"I heard the wind last night," said Johnsy. "I thought it would have fallen. It will surely fall today. Then I'll die."</p>
    
    <p>"You won't die," said Sue <span class="highlight-vocab">energetically<span class="vocab-tooltip">with energy and enthusiasm</span></span>. "You have to live for your friends. What would happen to me if you die?"</p>
    
    <div class="vocabulary-note">
        <div class="word">energetically</div>
        <div class="definition">with energy and enthusiasm</div>
    </div>
    
    <p>Johnsy smiled weakly and closed her eyes. After every hour or so she would look out of the window and find the leaf still there. It seemed to be <span class="highlight-vocab">clinging<span class="vocab-tooltip">holding tightly</span></span> to the creeper.</p>
    
    <div class="vocabulary-note">
        <div class="word">clinging</div>
        <div class="definition">holding tightly</div>
    </div>
    
    <p>In the evening, there was another storm but the leaf did not fall. Johnsy lay for a long time looking at the leaf. Then she called out to Sue.</p>
    
    <p>"I have been a bad girl. You have looked after me so lovingly and I have not <span class="highlight-vocab">cooperated<span class="vocab-tooltip">worked together, assisted</span></span> with you. I have been depressed and gloomy. The last leaf has shown me how wicked I have been. I have realised that it is a sin to want to die."</p>
    
    <div class="vocabulary-note">
        <div class="word">cooperated</div>
        <div class="definition">worked together, assisted</div>
    </div>
    
    <p>Sue hugged Johnsy. Then she gave her lots of hot soup and a mirror. Johnsy combed her hair and smiled brightly.</p>
    
    <p>In the afternoon the doctor came. After examining his patient he told Sue, "Johnsy now has the will to live. I am confident she'll recover soon. Now I must go downstairs and see Behrman. He is also suffering from pneumonia. But I am afraid, there is no hope for him."</p>
    
    <p>The next morning Sue came and sat on Johnsy's bed. Taking Johnsy's hand in hers she said, "I have something to tell you. Mr Behrman died of pneumonia this morning. He was ill for only two days. The first day the <span class="highlight-vocab">janitor<span class="vocab-tooltip">a person whose job is to look after a building</span></span> found him on his bed. His clothes and shoes were wet and he was shivering. He had been out in that stormy night."</p>
    
    <div class="vocabulary-note">
        <div class="word">janitor</div>
        <div class="definition">a person whose job is to look after a building</div>
    </div>
    
    <p>Then they found a ladder and a lantern still lighted lying near his bed. There were also some <span class="highlight-vocab">brushes<span class="vocab-tooltip">tools consisting of bristles fastened into a handle, used for painting</span></span> and green and yellow paints on the floor near the ladder. "Johnsy dear," said Sue, "look out of the window. Look at that ivy leaf. Haven't you wondered why it doesn't flutter when the wind blows? That's Behrman's masterpiece. He painted it the night the last leaf fell."</p>
    
    <div class="vocabulary-note">
        <div class="word">brushes</div>
        <div class="definition">tools consisting of bristles fastened into a handle, used for painting</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What is Johnsy's illness? What can cure her, the medicine or the willingness to live?</div>
        <div class="comprehension-question">2. Do you think the feeling of depression Johnsy has is common among teenagers?</div>
        <div class="comprehension-question">3. Behrman has a dream. What is it? Does it come true?</div>
        <div class="comprehension-question">4. What is Behrman's masterpiece? What makes Sue say so?</div>
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
    let currentChunk = "The Last Leaf, by O. Henry. ";
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
