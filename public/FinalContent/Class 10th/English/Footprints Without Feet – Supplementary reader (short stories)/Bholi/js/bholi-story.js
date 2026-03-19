/**
 * Story content and functionality for Bholi
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>HER name was Sulekha, but since her childhood everyone had been calling her <span class="highlight-vocab">Bholi<span class="vocab-tooltip">the simpleton</span></span>, the simpleton.</p>
    
    <div class="vocabulary-note">
        <div class="word">Bholi</div>
        <div class="definition">the simpleton</div>
    </div>
    
    <p>She was the fourth daughter of Numberdar Ramlal. When she was ten months old, she had fallen off the cot on her head and perhaps it had damaged some part of her brain. That was why she remained a backward child and came to be known as Bholi, the simpleton.</p>
    
    <p>At birth, the child was very fair and pretty. But when she was two years old, she had an attack of small-pox. Only the eyes were saved, but the entire body was permanently <span class="highlight-vocab">disfigured<span class="vocab-tooltip">made ugly by damage to the appearance</span></span> by deep black pock-marks. Little Sulekha could not speak till she was five, and when at last she learnt to speak, she <span class="highlight-vocab">stammered<span class="vocab-tooltip">spoke with difficulty, repeating sounds or words</span></span>. The other children often made fun of her and mimicked her. As a result, she talked very little.</p>
    
    <div class="vocabulary-note">
        <div class="word">disfigured</div>
        <div class="definition">made ugly by damage to the appearance</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">stammered</div>
        <div class="definition">spoke with difficulty, repeating sounds or words</div>
    </div>
    
    <p>Ramlal had seven children — three sons and four daughters, and the youngest of them was Bholi. It was a <span class="highlight-vocab">prosperous<span class="vocab-tooltip">successful and wealthy</span></span> farmer's household and there was plenty to eat and drink. All the children except Bholi were healthy and strong. The sons had been sent to the city to study in schools and later in colleges. Of the daughters, Radha, the eldest, had already been married. The second daughter Mangla's marriage had also been settled, and when that was done, Ramlal would think of the third, Champa. They were good-looking, healthy girls, and it was not difficult to find bridegrooms for them.</p>
    
    <div class="vocabulary-note">
        <div class="word">prosperous</div>
        <div class="definition">successful and wealthy</div>
    </div>
    
    <p>But Ramlal was worried about Bholi. She had neither good looks nor intelligence.</p>
    
    <p>Bholi was seven years old when Mangla was married. The same year a primary school for girls was opened in their village. The <span class="highlight-vocab">Tehsildar<span class="vocab-tooltip">revenue official</span></span> sahib came to perform its opening ceremony. He said to Ramlal, "As a revenue official you are the <span class="highlight-vocab">representative<span class="vocab-tooltip">a person who speaks or acts on behalf of an organization</span></span> of the government in the village and so you must set an example to the villagers. You must send your daughters to school."</p>
    
    <div class="vocabulary-note">
        <div class="word">Tehsildar</div>
        <div class="definition">revenue official</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">representative</div>
        <div class="definition">a person who speaks or acts on behalf of an organization</div>
    </div>
    
    <p>That night when Ramlal consulted his wife, she cried, "Are you crazy? If girls go to school, who will marry them?"</p>
    
    <p>But Ramlal had not the courage to <span class="highlight-vocab">disobey<span class="vocab-tooltip">refuse to follow orders or rules</span></span> the Tehsildar. At last his wife said, "I will tell you what to do. Send Bholi to school. As it is, there is little chance of her getting married, with her ugly face and lack of sense. Let the teachers at school worry about her."</p>
    
    <div class="vocabulary-note">
        <div class="word">disobey</div>
        <div class="definition">refuse to follow orders or rules</div>
    </div>
    
    <p>The next day Ramlal caught Bholi by the hand and said, "Come with me. I will take you to school." Bholi was frightened. She did not know what a school was like. She remembered how a few days ago their old cow, Lakshmi, had been turned out of the house and sold.</p>
    
    <p>"N-n-n-n NO, no-no-no," she shouted in terror and pulled her hand away from her father's grip.</p>
    
    <p>"What's the matter with you, you fool?" shouted Ramlal. "I am only taking you to school." Then he told his wife, "Let her wear some decent clothes today, or else what will the teachers and the other schoolgirls think of us when they see her?"</p>
    
    <p>New clothes had never been made for Bholi. The old dresses of her sisters were passed on to her. No one cared to mend or wash her clothes. But today she was lucky to receive a clean dress which had shrunk after many washings and no longer fitted Champa. She was even bathed and oil was rubbed into her dry and <span class="highlight-vocab">matted<span class="vocab-tooltip">entangled</span></span> hair. Only then did she begin to believe that she was being taken to a place better than her home!</p>
    
    <div class="vocabulary-note">
        <div class="word">matted</div>
        <div class="definition">entangled</div>
    </div>
    
    <p>When they reached the school, the children were already in their classrooms. Ramlal handed over his daughter to the headmistress. Left alone, the poor girl looked about her with fear-laden eyes. There were several rooms, and in each room girls like her <span class="highlight-vocab">squatted<span class="vocab-tooltip">sat on their heels</span></span> on mats, reading from books or writing on slates. The headmistress asked Bholi to sit down in a corner in one of the classrooms.</p>
    
    <div class="vocabulary-note">
        <div class="word">squatted</div>
        <div class="definition">sat on their heels</div>
    </div>
    
    <p>Bholi did not know what exactly a school was like and what happened there, but she was glad to find so many girls almost of her own age present there. She hoped that one of these girls might become her friend.</p>
    
    <p>The lady teacher who was in the class was saying something to the girls but Bholi could understand nothing. She looked at the pictures on the wall. The colours fascinated her — the horse was brown just like the horse on which the Tehsildar had come to visit their village; the goat was black like the goat of their neighbour; the parrot was green like the parrots she had seen in the mango orchard; and the cow was just like their Lakshmi. And suddenly Bholi noticed that the teacher was standing by her side, smiling at her.</p>
    
    <p>"What's your name, little one?"</p>
    <p>"Bh-Bho-Bho-." She could stammer no further than that.</p>
    <p>Then she began to cry and tears flowed from her eyes in a helpless flood. She kept her head down as she sat in her corner, not daring to look up at the girls who, she knew, were still laughing at her.</p>
    
    <p>When the school bell rang, all the girls <span class="highlight-vocab">scurried<span class="vocab-tooltip">ran or moved hurriedly</span></span> out of the classroom, but Bholi dared not leave her corner. Her head still lowered, she kept on sobbing.</p>
    
    <div class="vocabulary-note">
        <div class="word">scurried</div>
        <div class="definition">ran or moved hurriedly</div>
    </div>
    
    <p>"Bholi."</p>
    <p>The teacher's voice was so soft and soothing! In all her life she had never been called like that. It touched her heart.</p>
    <p>"Get up," said the teacher. It was not a command, but just a friendly suggestion. Bholi got up.</p>
    <p>"Now tell me your name."</p>
    <p>Sweat broke out over her whole body. Would her stammering tongue again disgrace her? For the sake of this kind woman, however, she decided to make an effort. She had such a soothing voice; she would not laugh at her.</p>
    
    <p>"Bh-Bh-Bho-Bho-," she began to stammer.</p>
    <p>"Well done, well done," the teacher encouraged her. "Come on, now — the full name?"</p>
    <p>"Bh-Bh-Bho-Bholi." At last she was able to say it and felt relieved as if it was a great achievement.</p>
    <p>"Well done." The teacher patted her affectionately and said, "Put the fear out of your heart and you will be able to speak like everyone else."</p>
    
    <p>Bholi looked up as if to ask, 'Really?'</p>
    
    <p>"Yes, yes, it will be very easy. You just come to school everyday. Will you come?"</p>
    
    <p>Bholi nodded.</p>
    <p>"No, say it aloud."</p>
    <p>"Ye-Ye-Yes." And Bholi herself was astonished that she had been able to say it.</p>
    <p>"Didn't I tell you? Now take this book."</p>
    <p>The book was full of nice pictures and the pictures were in colour — dog, cat, goat, horse, parrot, tiger and a cow just like Lakshmi. And with every picture was a word in big black letters.</p>
    
    <p>"In one month you will be able to read this book. Then I will give you a bigger book, then a still bigger one. In time you will be more learned than anyone else in the village. Then no one will ever be able to laugh at you. People will listen to you with respect and you will be able to speak without the slightest stammer. Understand? Now go home, and come back early tomorrow morning."</p>
    
    <p>Bholi felt as if suddenly all the bells in the village temple were ringing and the trees in front of the school-house had blossomed into big red flowers. Her heart was throbbing with a new hope and a new life.</p>
    
    <p>Thus the years passed.</p>
    <p>The village became a small town. The little primary school became a high school. There were now a cinema under a tin shed and a cotton <span class="highlight-vocab">ginning<span class="vocab-tooltip">separating raw cotton from its seeds</span></span> mill. The mail train began to stop at their railway station.</p>
    
    <div class="vocabulary-note">
        <div class="word">ginning</div>
        <div class="definition">separating raw cotton from its seeds</div>
    </div>
    
    <p>One night, after dinner, Ramlal said to his wife, "Then, shall I accept Bishamber's proposal?"</p>
    
    <p>"Yes, certainly," his wife said. "Bholi will be lucky to get such a well-to-do bridegroom. A big shop, a house of his own and I hear several thousand in the bank. Moreover, he is not asking for any dowry."</p>
    
    <p>"That's right, but he is not so young, you know — almost the same age as I am — and he also limps. Moreover, the children from his first wife are quite grown up."</p>
    
    <p>"So what does it matter?" his wife replied. "Forty-five or fifty — it is no great age for a man. We are lucky that he is from another village and does not know about her pock-marks and her lack of sense. If we don't accept this proposal, she may remain unmarried all her life."</p>
    
    <p>"Yes, but I wonder what Bholi will say."</p>
    <p>"What will that witless one say? She is like a dumb cow."</p>
    <p>"May be you are right," muttered Ramlal.</p>
    <p>In the other corner of the courtyard, Bholi lay awake on her cot, listening to her parents' whispered conversation.</p>
    
    <p>Bishamber Nath was a well-to-do grocer. He came with a big party of friends and relations with him for the wedding. A brass-band playing a popular tune from an Indian film headed the procession, with the bridegroom riding a decorated horse. Ramlal was overjoyed to see such pomp and splendour. He had never dreamt that his fourth daughter would have such a grand wedding. Bholi's elder sisters who had come for the occasion were envious of her luck.</p>
    
    <p>When the <span class="highlight-vocab">auspicious<span class="vocab-tooltip">favorable; promising success</span></span> moment came the priest said, "Bring the bride."</p>
    
    <div class="vocabulary-note">
        <div class="word">auspicious</div>
        <div class="definition">favorable; promising success</div>
    </div>
    
    <p>Bholi, clad in a red silken bridal dress, was led to the bride's place near the sacred fire.</p>
    
    <p>"Garland the bride," one of his friends prompted Bishamber Nath.</p>
    <p>The bridegroom lifted the garland of yellow marigolds. A woman slipped back the silken veil from the bride's face. Bishamber took a quick glance. The garland remained poised in his hands. The bride slowly pulled down the veil over her face.</p>
    
    <p>"Have you seen her?" said Bishamber to the friend next to him. "She has pock-marks on her face."</p>
    
    <p>"So what? You are not young either."</p>
    <p>"Maybe. But if I am to marry her, her father must give me five thousand rupees."</p>
    
    <p>Ramlal went and placed his turban — his honour — at Bishamber's feet. "Do not humiliate me so. Take two thousand rupees."</p>
    <p>"No. Five thousand, or we go back. Keep your daughter."</p>
    <p>"Be a little considerate, please. If you go back, I can never show my face in the village."</p>
    <p>"Then out with five thousand."</p>
    <p>Tears streaming down his face, Ramlal went in, opened the safe and counted out the notes. He placed the bundle at the bridegroom's feet.</p>
    
    <p>On Bishamber's greedy face appeared a <span class="highlight-vocab">triumphant<span class="vocab-tooltip">expressing joy or satisfaction because of victory or success</span></span> smile. He had gambled and won. "Give me the garland," he announced.</p>
    
    <div class="vocabulary-note">
        <div class="word">triumphant</div>
        <div class="definition">expressing joy or satisfaction because of victory or success</div>
    </div>
    
    <p>Once again the veil was slipped back from the bride's face, but this time her eyes were not <span class="highlight-vocab">downcast<span class="vocab-tooltip">looking downwards</span></span>. She was looking up, looking straight at her prospective husband, and in her eyes there was neither anger nor hate, only cold contempt.</p>
    
    <div class="vocabulary-note">
        <div class="word">downcast</div>
        <div class="definition">looking downwards</div>
    </div>
    
    <p>Bishamber raised the garland to place it round the bride's neck; but before he could do so, Bholi's hand struck out like a streak of lightning and the garland was flung into the fire. She got up and threw away the veil.</p>
    
    <p>"Pitaji!" said Bholi in a clear loud voice; and her father, mother, sisters, brothers, relations and neighbours were startled to hear her speak without even the slightest stammer.</p>
    
    <p>"Pitaji! Take back your money. I am not going to marry this man."</p>
    
    <p>Ramlal was thunderstruck. The guests began to whisper, "So shameless! So ugly and so shameless!"</p>
    
    <p>"Bholi, are you crazy?" shouted Ramlal. "You want to disgrace your family? Have some regard for our <span class="highlight-vocab">izzat<span class="vocab-tooltip">honor or reputation</span></span>!"</p>
    
    <div class="vocabulary-note">
        <div class="word">izzat</div>
        <div class="definition">honor or reputation</div>
    </div>
    
    <p>"For the sake of your izzat," said Bholi, "I was willing to marry this lame old man. But I will not have such a mean, greedy and <span class="highlight-vocab">contemptible<span class="vocab-tooltip">deserving of contempt; despicable</span></span> coward as my husband. I won't, I won't, I won't."</p>
    
    <div class="vocabulary-note">
        <div class="word">contemptible</div>
        <div class="definition">deserving of contempt; despicable</div>
    </div>
    
    <p>"What a shameless girl! We all thought she was a harmless dumb cow."</p>
    <p>Bholi turned violently on the old woman, "Yes, Aunty, you are right. You all thought I was a dumb–driven cow. That's why you wanted to hand me over to this heartless creature. But now the dumb cow, the stammering fool, is speaking. Do you want to hear more?"</p>
    
    <p>Bishamber Nath, the grocer, started to go back with his party. The confused bandsmen thought this was the end of the ceremony and struck up a closing song.</p>
    
    <p>Ramlal stood rooted to the ground, his head bowed low with the weight of grief and shame.</p>
    
    <p>The flames of the sacred fire slowly died down. Everyone was gone. Ramlal turned to Bholi and said, "But what about you, no one will ever marry you now. What shall we do with you?"</p>
    
    <p>And Sulekha said in a voice that was calm and steady, "Don't you worry, Pitaji! In your old age I will serve you and Mother and I will teach in the same school where I learnt so much. Isn't that right, Ma'am?"</p>
    
    <p>The teacher had all along stood in a corner, watching the drama. "Yes, Bholi, of course," she replied. And in her smiling eyes was the light of a deep satisfaction that an artist feels when contemplating the completion of her masterpiece.</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why is Bholi's father worried about her?</div>
        <div class="comprehension-question">2. For what unusual reasons is Bholi sent to school?</div>
        <div class="comprehension-question">3. Does Bholi enjoy her first day at school?</div>
        <div class="comprehension-question">4. Does she find her teacher different from the people at home?</div>
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
    let currentChunk = "Bholi, by K.A. Abbas. ";
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
