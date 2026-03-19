/**
 * Story content and functionality for The Beggar
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>"KIND sir, have <span class="highlight-vocab">pity<span class="vocab-tooltip">compassion; sympathetic sorrow</span></span>; turn your attention to a poor, hungry man! For three days I have had nothing to eat; I haven't five <span class="highlight-vocab">copecks<span class="vocab-tooltip">Russian coin equal to one hundredth of a rouble</span></span> for a lodging, I swear it before God. For eight years I was a village schoolteacher and then I lost my place through <span class="highlight-vocab">intrigues<span class="vocab-tooltip">secret or underhand schemes</span></span>. I fell a victim to <span class="highlight-vocab">calumny<span class="vocab-tooltip">making false statements to damage someone's reputation</span></span>. It is a year now since I have had anything to do."</p>
    
    <div class="vocabulary-note">
        <div class="word">pity</div>
        <div class="definition">compassion; sympathetic sorrow</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">copeck</div>
        <div class="definition">Russian coin equal to one hundredth of a rouble</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">intrigues</div>
        <div class="definition">secret or underhand schemes</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">calumny</div>
        <div class="definition">making false statements to damage someone's reputation</div>
    </div>
    
    <p>The advocate, Sergei, looked at the ragged, fawn-coloured overcoat of the <span class="highlight-vocab">suppliant<span class="vocab-tooltip">a person making a humble plea to someone in power</span></span>, at his dull, drunken eyes, at the red spot on either cheek, and it seemed to him as if he had seen this man somewhere before.</p>
    
    <div class="vocabulary-note">
        <div class="word">suppliant</div>
        <div class="definition">a person making a humble plea to someone in power</div>
    </div>
    
    <p>"I have now had an offer of a position in the province of Kaluga," the <span class="highlight-vocab">mendicant<span class="vocab-tooltip">beggar</span></span> went on, "but I haven't the money to get there. Help me kindly; I am ashamed to ask, but — I am obliged to by circumstances."</p>
    
    <div class="vocabulary-note">
        <div class="word">mendicant</div>
        <div class="definition">beggar</div>
    </div>
    
    <p>Sergei's eyes fell on the man's overshoes, one of which was high and the other low, and he suddenly remembered something.</p>
    
    <p>"Look here, it seems to me I met you the day before yesterday in Sadovya Street," he said; "but you told me then that you were a student who had been expelled, and not a village schoolteacher. Do you remember?"</p>
    
    <p>"N-no, that can't be so," mumbled the beggar, taken aback. "I am a village schoolteacher, and if you like I can show you my papers."</p>
    
    <p>"Have done with lying! You called yourself a student and even told me what you had been expelled for. Don't you remember?"</p>
    
    <p>Sergei flushed and turned from the ragged creature with an expression of disgust.</p>
    
    <p>"This is <span class="highlight-vocab">dishonesty<span class="vocab-tooltip">lack of honesty; being deceitful</span></span>, my dear sir!" he cried angrily. "This is <span class="highlight-vocab">swindling<span class="vocab-tooltip">cheating a person of money</span></span> — I shall send the police for you, damn you!"</p>
    
    <div class="vocabulary-note">
        <div class="word">dishonesty</div>
        <div class="definition">lack of honesty; being deceitful</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">swindling</div>
        <div class="definition">cheating a person of money</div>
    </div>
    
    <p>"Sir!" he said, laying his hand on his heart, "the fact is I was lying! I am neither a student nor a schoolteacher. All that was fiction. Formerly I sang in a Russian choir and was sent away for drunkenness. But what else can I do? I can't get along without lying. No one will give me anything when I tell the truth, what can I do?"</p>
    
    <p>"What can you do? You ask what you can do?" cried Sergei, coming close to him. "Work! That's what you can do! You must work!"</p>
    
    <p>"Work — yes. I know that myself; but where can I find work?"</p>
    
    <p>"How would you like to chop wood for me?"</p>
    
    <p>"I wouldn't refuse to do that, but in these days even skilled wood-cutters find themselves sitting without bread."</p>
    
    <p>"Will you come and chop wood for me?"</p>
    
    <p>"Yes sir, I will."</p>
    
    <p>"Very well; we'll soon find out."</p>
    
    <p>Sergei hastened along, rubbing his hands. He called his cook out of the kitchen.</p>
    
    <p>"Here, Olga," he said, "take this gentleman into the wood-shed and let him chop wood."</p>
    
    <p>The <span class="highlight-vocab">scarecrow<span class="vocab-tooltip">figure made to resemble a human, often used to frighten birds; here used to describe a shabby person</span></span> of a beggar shrugged his shoulders, as if in <span class="highlight-vocab">perplexity<span class="vocab-tooltip">state of being puzzled; bewilderment</span></span>, and went <span class="highlight-vocab">irresolutely<span class="vocab-tooltip">hesitantly; undecidedly</span></span> after the cook. It was obvious from his gait that he had not consented to go and chop wood because he was hungry and wanted work, but simply from pride and shame and because he had been trapped by his own words. It was obvious, too, that his strength had been undermined by vodka and that he was unhealthy and did not feel the slightest inclination for toil.</p>
    
    <div class="vocabulary-note">
        <div class="word">scarecrow</div>
        <div class="definition">figure made to resemble a human, often used to frighten birds; here used to describe a shabby person</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">perplexity</div>
        <div class="definition">state of being puzzled; bewilderment</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">irresolutely</div>
        <div class="definition">hesitantly; undecidedly</div>
    </div>
    
    <p>Sergei hurried into the dining-room. From its windows one could see the wood-shed and everything that went on in the yard. Standing at the window, Sergei saw the cook and the beggar come out into the yard by the back door and make their way across the dirty snow to the shed. Olga glared wrathfully at her companion, shoved him aside with her elbow, unlocked the shed, and angrily banged the door.</p>
    
    <p>Next he saw the pseudo-teacher seat himself on a log and become lost in thought with his red cheeks resting on his fists. The woman flung down an axe at his feet, spat angrily, and, judging from the expression of her lips, began to scold him. The beggar <span class="highlight-vocab">irresolutely<span class="vocab-tooltip">hesitantly; undecidedly</span></span> pulled a <span class="highlight-vocab">billet<span class="vocab-tooltip">thick piece of wood</span></span> of wood towards him, set it up between his feet, and tapped it feebly with the axe. The billet wavered and fell down. The beggar again pulled it to him, blew on his freezing hands, and tapped it with his axe cautiously, as if afraid of hitting his overshoe or of cutting off his finger; the stick of wood again fell to the ground.</p>
    
    <div class="vocabulary-note">
        <div class="word">billet</div>
        <div class="definition">thick piece of wood</div>
    </div>
    
    <p>Sergei's anger had vanished and he now began to feel a little sorry and ashamed of himself for having set a spoiled, drunken, perhaps sick man to work at menial labour in the cold.</p>
    
    <p>An hour later Olga came in and announced that the wood had all been chopped.</p>
    
    <p>"Good! Give him half a rouble," said Sergei. "If he wants to he can come back and cut wood on the first day of each month. We can always find work for him."</p>
    
    <p>On the first of the month the <span class="highlight-vocab">waif<span class="vocab-tooltip">homeless person</span></span> made his appearance and again earned half a rouble, although he could barely stand on his legs. From that day on he often appeared in the yard and every time work was found for him. Now he would shovel snow, now put the wood-shed in order, now beat the dust out of rugs and mattresses. Every time he received from twenty to forty copecks, and once, even a pair of old trousers were sent out to him.</p>
    
    <div class="vocabulary-note">
        <div class="word">waif</div>
        <div class="definition">homeless person</div>
    </div>
    
    <p>When Sergei moved into another house he hired him to help in the packing and hauling of the furniture. This time the waif was sober, gloomy, and silent. He hardly touched the furniture, and walked behind the wagons hanging his head, not even making a pretence of appearing busy. He only shivered in the cold and became embarrassed when the carters jeered at him for his idleness, his feebleness, and his tattered, fancy overcoat. After the moving was over Sergei sent for him.</p>
    
    <p>"Well, I am happy that my words have taken effect,'" he said, handing him a rouble. "Here's for your pains. I see you are sober and have no objection to work. What is your name?'"</p>
    
    <p>"Lushkoff."</p>
    
    <p>"Well, Lushkoff, I can now offer you some other, cleaner employment. Can you write?"</p>
    
    <p>"I can."</p>
    
    <p>"Then take this letter to a friend of mine tomorrow and you will be given some copying to do. Work hard, don't drink, and remember what I have said to you. Goodbye!"</p>
    
    <p>Pleased at having put a man on the right path, Sergei tapped Lushkoff kindly on the shoulder and even gave him his hand at parting. Lushkoff took the letter, and from that day forth came no more to the yard for work.</p>
    
    <p>Two years went by. Then one evening, as Sergei was standing at the ticket window of a theatre paying for his seat, he noticed a little man beside him with a coat collar of curly fur and a worn sealskin cap. This little individual timidly asked the ticket seller for a seat in the gallery and paid for it in copper coins.</p>
    
    <p>"Lushkoff, is that you?" cried Sergei, recognising in the little man his former wood-chopper. "How are you? What are you doing? How is everything with you?"</p>
    
    <p>"All right. I am a notary now and am paid thirty-five roubles a month."</p>
    
    <p>"Thank Heaven! That's fine! I am delighted for your sake. I am very, very glad, Lushkoff. You see, you are my godson, in a sense. I gave you a push along the right path, you know. Do you remember what a <span class="highlight-vocab">roasting<span class="vocab-tooltip">scolding</span></span> I gave you, eh? I nearly had you sinking into the ground at my feet that day. Thank you, old man, for not forgetting my words."</p>
    
    <div class="vocabulary-note">
        <div class="word">roasting</div>
        <div class="definition">scolding</div>
    </div>
    
    <p>"Thank you, too." said Lushkoff. "If I hadn't come to you then I might still have been calling myself a teacher or a student to this day. Yes, by flying to your protection I dragged myself out of a pit."</p>
    
    <p>"I am very glad, indeed."</p>
    
    <p>"Thank you for your kind words and deeds. I am very grateful to you and to your cook. God bless that good and noble woman! You spoke finely then, and I shall be indebted to you to my dying day; but, strictly speaking, it was your cook, Olga, who saved me."</p>
    
    <p>"How is that?"</p>
    
    <p>"When I used to come to your house to chop wood she used to begin: 'Oh, you <span class="highlight-vocab">sot<span class="vocab-tooltip">habitual drunkard</span></span>, you! Oh, you miserable creature! There's nothing for you but ruin.' And then she would sit down opposite me and grow sad, look into my face and weep. 'Oh, you unlucky man! There is no pleasure for you in this world and there will be none in the world to come. You drunkard! You will burn in hell. Oh, you unhappy one!' And so she would carry on, you know, in that strain. I can't tell you how much misery she suffered, how many tears she shed for my sake. But the chief thing was — she used to chop the wood for me. Do you know, sir, that I did not chop one single stick of wood for you? She did it all. Why this saved me, why I changed, why I stopped drinking at the sight of her I cannot explain. I only know that, owing to her words and noble deeds, a change took place in my heart; she set me right and I shall never forget it. However, it is time to go now; there goes the bell."</p>
    
    <div class="vocabulary-note">
        <div class="word">sot</div>
        <div class="definition">habitual drunkard</div>
    </div>
    
    <p>Lushkoff bowed and departed to the gallery.</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Has Lushkoff become a beggar by circumstance or by choice?</div>
        <div class="comprehension-question">2. What reasons does he give to Sergei for his telling lies?</div>
        <div class="comprehension-question">3. Is Lushkoff a willing worker? Why, then, does he agree to chop wood for Sergei?</div>
        <div class="comprehension-question">4. During their conversation at the theatre, what does Lushkoff reveal about Olga?</div>
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

// Toggle Read Aloud function for story
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
    let currentChunk = "The Beggar, by Anton Chekhov. ";
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
    readTextChunksSequentially(textChunks);
}

// Function to read a series of text chunks sequentially
function readTextChunksSequentially(textChunks) {
    if (!window.narrator || !window.narrator.enabled || textChunks.length === 0) return;
    
    // Show reading indicator
    const contentDiv = document.getElementById('storyContent');
    if (!contentDiv) return;
    
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.id = 'reading-indicator-story';
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
    let contentContainer = document.getElementById('storyContent');
    
    if (contentContainer) {
        contentContainer.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}
