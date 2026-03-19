/**
 * Story content and functionality for The Thief's Story
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>I WAS still a thief when I met Anil. And though only 15, I was an <span class="highlight-vocab">experienced<span class="vocab-tooltip">knowledgeable through observation or involvement</span></span> and fairly successful hand.</p>
    
    <div class="vocabulary-note">
        <div class="word">experienced</div>
        <div class="definition">knowledgeable through observation or involvement</div>
    </div>
    
    <p>Anil was watching a wrestling match when I approached him. He was about 25 — a tall, lean fellow — and he looked easy-going, kind and simple enough for my purpose. I hadn't had much luck of late and thought I might be able to get into the young man's <span class="highlight-vocab">confidence<span class="vocab-tooltip">trust; belief in someone's reliability</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">confidence</div>
        <div class="definition">trust; belief in someone's reliability</div>
    </div>
    
    <p>"You look a bit of a wrestler yourself," I said. A little <span class="highlight-vocab">flattery<span class="vocab-tooltip">insincere praise</span></span> helps in making friends.</p>
    
    <div class="vocabulary-note">
        <div class="word">flattery</div>
        <div class="definition">insincere praise</div>
    </div>
    
    <p>"So do you," he replied, which put me off for a moment because at that time I was rather thin.</p>
    
    <p>"Well," I said <span class="highlight-vocab">modestly<span class="vocab-tooltip">without boasting; in a humble way</span></span>, "I do wrestle a bit."</p>
    
    <div class="vocabulary-note">
        <div class="word">modestly</div>
        <div class="definition">without boasting; in a humble way</div>
    </div>
    
    <p>"What's your name?"</p>
    
    <p>"Hari Singh," I lied. I took a new name every month. That kept me ahead of the police and my former employers.</p>
    
    <p>After this introduction, Anil talked about the well-oiled wrestlers who were <span class="highlight-vocab">grunting<span class="vocab-tooltip">making low guttural sounds</span></span>, lifting and throwing each other about. I didn't have much to say. Anil walked away. I followed casually.</p>
    
    <div class="vocabulary-note">
        <div class="word">grunting</div>
        <div class="definition">making low guttural sounds</div>
    </div>
    
    <p>"Hello again," he said.</p>
    
    <p>I gave him my most <span class="highlight-vocab">appealing<span class="vocab-tooltip">attractive</span></span> smile. "I want to work for you," I said.</p>
    
    <div class="vocabulary-note">
        <div class="word">appealing</div>
        <div class="definition">attractive</div>
    </div>
    
    <p>"But I can't pay you."</p>
    
    <p>I thought that over for a minute. Perhaps I had misjudged my man. I asked, "Can you feed me?"</p>
    
    <p>"Can you cook?"</p>
    
    <p>"I can cook," I lied again.</p>
    
    <p>"If you can cook, then may be I can feed you."</p>
    
    <p>He took me to his room over the Jumna Sweet Shop and told me I could sleep on the balcony. But the meal I cooked that night must have been terrible because Anil gave it to a stray dog and told me to be off. But I just hung around, smiling in my most appealing way, and he couldn't help laughing.</p>
    
    <p>Later, he patted me on the head and said never mind, he'd teach me to cook. He also taught me to write my name and said he would soon teach me to write whole sentences and to add numbers. I was grateful. I knew that once I could write like an educated man there would be no limit to what I could achieve.</p>
    
    <p>It was quite pleasant working for Anil. I made the tea in the morning and then would take my time buying the day's supplies, usually making a profit of about a rupee a day. I think he knew I made a little money this way but he did not seem to mind.</p>
    
    <p>Anil made money by fits and starts. He would borrow one week, lend the next. He kept worrying about his next cheque, but as soon as it arrived he would go out and celebrate. It seems he wrote for magazines — a <span class="highlight-vocab">queer<span class="vocab-tooltip">strange; unusual</span></span> way to make a living!</p>
    
    <div class="vocabulary-note">
        <div class="word">queer</div>
        <div class="definition">strange; unusual</div>
    </div>
    
    <p>One evening he came home with a small bundle of notes, saying he had just sold a book to a publisher. At night, I saw him tuck the money under the mattress.</p>
    
    <p>I had been working for Anil for almost a month and, apart from cheating on the shopping, had not done anything in my line of work. I had every opportunity for doing so. Anil had given me a key to the door, and I could come and go as I pleased. He was the most trusting person I had ever met.</p>
    
    <p>And that is why it was so difficult to rob him. It's easy to rob a greedy man, because he can afford to be robbed; but it's difficult to rob a careless man — sometimes he doesn't even notice he's been robbed and that takes all the pleasure out of the work.</p>
    
    <p>Well, it's time I did some real work, I told myself; I'm out of practice. And if I don't take the money, he'll only waste it on his friends. After all, he doesn't even pay me.</p>
    
    <p>Anil was asleep. A beam of moonlight stepped over the balcony and fell on the bed. I sat up on the floor, considering the situation. If I took the money, I could catch the 10.30 Express to Lucknow. Slipping out of the blanket, I crept up to the bed. Anil was sleeping peacefully. His face was clear and <span class="highlight-vocab">unlined<span class="vocab-tooltip">showing no sign of worry or anxiety</span></span>; even I had more marks on my face, though mine were mostly scars.</p>
    
    <div class="vocabulary-note">
        <div class="word">unlined</div>
        <div class="definition">showing no sign of worry or anxiety</div>
    </div>
    
    <p>My hand slid under the mattress, searching for the notes. When I found them, I drew them out without a sound. Anil sighed in his sleep and turned on his side, towards me. I was startled and quickly crawled out of the room.</p>
    
    <p>When I was on the road, I began to run. I had the notes at my waist, held there by the string of my pyjamas. I slowed down to a walk and counted the notes: 600 rupees in fifties! I could live like an oil-rich Arab for a week or two.</p>
    
    <p>When I reached the station I did not stop at the ticket office (I had never bought a ticket in my life) but dashed straight to the platform. The Lucknow Express was just moving out. The train had still to pick up speed and I should have been able to jump into one of the carriages, but I hesitated — for some reason I can't explain — and I lost the chance to get away.</p>
    
    <p>When the train had gone, I found myself standing alone on the deserted platform. I had no idea where to spend the night. I had no friends, believing that friends were more trouble than help. And I did not want to make anyone curious by staying at one of the small hotels near the station. The only person I knew really well was the man I had robbed. Leaving the station, I walked slowly through the bazaar.</p>
    
    <p>In my short career as a thief, I had made a study of men's faces when they had lost their goods. The greedy man showed fear; the rich man showed anger; the poor man showed acceptance. But I knew that Anil's face, when he discovered the theft, would show only a touch of sadness. Not for the loss of money, but for the loss of trust.</p>
    
    <p>I found myself in the maidan and sat down on a bench. The night was chilly — it was early November — and a light <span class="highlight-vocab">drizzle<span class="vocab-tooltip">light rain</span></span> added to my discomfort. Soon it was raining quite heavily. My shirt and pyjamas stuck to my skin, and a cold wind blew the rain across my face.</p>
    
    <div class="vocabulary-note">
        <div class="word">drizzle</div>
        <div class="definition">light rain</div>
    </div>
    
    <p>I went back to the bazaar and sat down in the shelter of the clock tower. The clock showed midnight. I felt for the notes. They were damp from the rain.</p>
    
    <p>Anil's money. In the morning he would probably have given me two or three rupees to go to the cinema, but now I had it all. I couldn't cook his meals, run to the bazaar or learn to write whole sentences any more.</p>
    
    <p>I had forgotten about them in the excitement of the theft. Whole sentences, I knew, could one day bring me more than a few hundred rupees. It was a simple matter to steal — and sometimes just as simple to be caught. But to be a really big man, a clever and respected man, was something else. I should go back to Anil, I told myself, if only to learn to read and write.</p>
    
    <p>I hurried back to the room feeling very nervous, for it is much easier to steal something than to return it undetected. I opened the door quietly, then stood in the doorway, in clouded moonlight. Anil was still asleep. I crept to the head of the bed, and my hand came up with the notes. I felt his breath on my hand. I remained still for a minute. Then my hand found the edge of the mattress, and slipped under it with the notes.</p>
    
    <p>I awoke late next morning to find that Anil had already made the tea. He stretched out his hand towards me. There was a fifty-rupee note between his fingers. My heart sank. I thought I had been discovered.</p>
    
    <p>"I made some money yesterday," he explained. "Now you'll be paid regularly."</p>
    
    <p>My spirits rose. But when I took the note, I saw it was still wet from the night's rain.</p>
    
    <p>"Today we'll start writing sentences," he said.</p>
    
    <p>He knew. But neither his lips nor his eyes showed anything. I smiled at Anil in my most appealing way. And the smile came by itself, without any effort.</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Who does 'I' refer to in this story?</div>
        <div class="comprehension-question">2. What is he "a fairly successful hand" at?</div>
        <div class="comprehension-question">3. What does he get from Anil in return for his work?</div>
        <div class="comprehension-question">4. How does the thief think Anil will react to the theft?</div>
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
    let currentChunk = "The Thief's Story, by Ruskin Bond. ";
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
