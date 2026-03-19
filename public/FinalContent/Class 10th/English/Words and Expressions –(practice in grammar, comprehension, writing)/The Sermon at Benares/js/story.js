/**
 * Story content and functionality for The Sermon at Benaras
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <p>In the future, if we want a happier humanity, a happy world, we must tackle the root of the problem. Of course the economy and political power are also causes. But the ultimate cause lies within the human mind. Every human action, verbal or physical, even minor actions, have some <span class="highlight-vocab">motivation<span class="vocab-tooltip">the reason for doing something</span></span>. Proper motivation or proper development is an important factor. Thus, if intelligence is accompanied with human affection and <span class="highlight-vocab">compassion<span class="vocab-tooltip">sympathetic concern for others</span></span>, what I call human feeling, then it is very useful.</p>
            
            <div class="vocabulary-note">
                <div class="word">motivation</div>
                <div class="definition">the reason for doing something</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">compassion</div>
                <div class="definition">sympathetic concern for others</div>
            </div>
            
            <p>If society's moral values and standards of behaviour become negative, each of us will suffer. Therefore, the intentions of an individual are very much related to the interests of society. There is a definite <span class="highlight-vocab">correlation<span class="vocab-tooltip">connection between two things</span></span>.</p>
            
            <div class="vocabulary-note">
                <div class="word">correlation</div>
                <div class="definition">connection between two things</div>
            </div>
            
            <p>The educational system and family life are two very important areas. In the educational field, one has to take care not only of the brain, but also of one's <span class="highlight-vocab">spiritual<span class="vocab-tooltip">concerning the spirit or soul</span></span> development. I say "spiritual development" not in a religious sense but simply in the sense of having a good and compassionate heart. If one has a compassionate heart, it automatically brings inner strength and allows for less fear and less doubt. Subsequently, one becomes happier and more open-minded, thus making more friends in society.</p>
            
            <div class="vocabulary-note">
                <div class="word">spiritual</div>
                <div class="definition">concerning the spirit or soul</div>
            </div>
            
            <p class="source">(Source: The Transformed Mind by His Holiness the Dalai Lama)</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. According to His Holiness the Dalai Lama, what should we do if we want a happier humanity?</div>
                <div class="comprehension-question">2. Where does the ultimate cause of the problem lie?</div>
                <div class="comprehension-question">3. What is referred to by "it" in "what I call human feeling, then 'it' is very useful"?</div>
                <div class="comprehension-question">4. Why does the Dalai Lama say that proper motivation is important?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <p>The Buddha preached his first sermon at the city of Benaras, most holy of the <span class="highlight-vocab">dipping<span class="vocab-tooltip">bathing or immersion in water</span></span> places on the River Ganges; that sermon has been preserved and is given here. It reflects the Buddha's wisdom about one inscrutable kind of suffering.</p>
            
            <div class="vocabulary-note">
                <div class="word">dipping</div>
                <div class="definition">bathing or immersion in water</div>
            </div>
            
            <p>Kisa Gotami had an only son, and he died. In her grief she carried the dead child to all her neighbors, asking them for medicine, and the people said, "She has lost her senses. The boy is dead."</p>
            
            <p>At length, Kisa Gotami met a man who replied to her request, "I cannot give thee medicine for thy child, but I know a physician who can."</p>
            
            <p>And the girl said, "Pray tell me, sir; who is it?" And the man replied, "Go to <span class="highlight-vocab">Sakyamuni<span class="vocab-tooltip">another name for Buddha, meaning "sage of the Sakyas"</span></span>, the Buddha."</p>
            
            <div class="vocabulary-note">
                <div class="word">Sakyamuni</div>
                <div class="definition">another name for Buddha, meaning "sage of the Sakyas"</div>
            </div>
            
            <p>Kisa Gotami repaired to the Buddha and cried, "Lord and Master, give me the medicine that will cure my boy."</p>
            
            <p>The Buddha answered, "I want a handful of <span class="highlight-vocab">mustard-seed<span class="vocab-tooltip">tiny round seeds from the mustard plant</span></span>." And when the girl in her joy promised to procure it, the Buddha added, "The mustard-seed must be taken from a house where no one has lost a child, husband, parent, or friend."</p>
            
            <div class="vocabulary-note">
                <div class="word">mustard-seed</div>
                <div class="definition">tiny round seeds from the mustard plant</div>
            </div>
            
            <p>Poor Kisa Gotami now went from house to house, and the people pitied her and said, "Here is mustard-seed; take it!" But when she asked, "Did a son or daughter, a father or mother, die in your family?" they answered her, "Alas! the living are few, but the dead are many. Do not remind us of our deepest grief." And there was no house but some beloved one had died in it.</p>
            
            <p>Kisa Gotami became <span class="highlight-vocab">weary<span class="vocab-tooltip">tired or exhausted</span></span> and hopeless, and sat down at the wayside watching the lights of the city, as they flickered up and were extinguished again. At last the darkness of the night <span class="highlight-vocab">reigned<span class="vocab-tooltip">prevailed or dominated</span></span> alone. And she considered the fate of men, that their lives flicker up for a few moments and are extinguished again.</p>
            
            <div class="vocabulary-note">
                <div class="word">weary</div>
                <div class="definition">tired or exhausted</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">reigned</div>
                <div class="definition">prevailed or dominated</div>
            </div>
            
            <p>And she thought to herself, "How selfish am I in my grief! Death is common to all; yet in this valley of <span class="highlight-vocab">desolation<span class="vocab-tooltip">sadness and loneliness</span></span> there is a path that leads him to immortality who has surrendered all selfishness."</p>
            
            <div class="vocabulary-note">
                <div class="word">desolation</div>
                <div class="definition">sadness and loneliness</div>
            </div>
            
            <p>Putting aside the selfishness of her affection for her child, Kisa Gotami had the dead body buried in the forest. Returning to the Buddha, she took refuge in him and found comfort in the Dharma, which is a balm that will soothe all the pains of our troubled hearts.</p>
            
            <p>The Buddha said, "The life of mortals in this world is troubled and brief and combined with pain. For there is not any means by which those that have been born can avoid dying; after reaching old age there is death; of such a nature are living beings. As ripe fruits are early in danger of falling, so mortals when born are always in danger of death. As all earthen vessels made by the potter end in being broken, so is the life of mortals. Both young and adult, both those who are fools and those who are wise, all fall into the power of death; all are subject to death."</p>
            
            <p>"Of those who, <span class="highlight-vocab">overcome<span class="vocab-tooltip">overwhelmed or defeated</span></span> by death, depart from life, a father cannot save his son, nor kinsmen their relations. Mark! while relatives are looking on and <span class="highlight-vocab">lamenting<span class="vocab-tooltip">expressing sorrow or grief</span></span> deeply, one by one mortals are carried off, like an ox that is led to the slaughter. So the world is afflicted with death and decay, therefore the wise do not grieve, knowing the terms of the world."</p>
            
            <div class="vocabulary-note">
                <div class="word">overcome</div>
                <div class="definition">overwhelmed or defeated</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">lamenting</div>
                <div class="definition">expressing sorrow or grief</div>
            </div>
            
            <p>"Not from weeping nor from grieving will anyone obtain peace of mind; on the contrary, his pain will be the greater and his body will suffer. He will make himself sick and pale, yet the dead are not saved by his lamentation. He who seeks peace should draw out the arrow of lamentation, and complaint, and grief. He who has drawn out the arrow and has become composed will obtain peace of mind; he who has overcome all sorrow will become free from sorrow, and be blessed."</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Why did Kisa Gotami go from house to house?</div>
                <div class="comprehension-question">2. What made her understand the truth about life and death?</div>
                <div class="comprehension-question">3. What is the central message of the Buddha's sermon?</div>
                <div class="comprehension-question">4. What does the Buddha compare the life of mortals to?</div>
            </div>
        `
    }
];

// Show a specific part of the story
function showStoryPart(partNumber) {
    if (partNumber < 1 || partNumber > storyParts.length) return;
    
    console.log(`Loading story part ${partNumber}`);
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === partNumber);
        btn.setAttribute('aria-pressed', index + 1 === partNumber ? 'true' : 'false');
    });
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) {
        console.error('Story content container not found');
        return;
    }
    
    // Create a container for this part if it doesn't exist
    let partContainer = document.getElementById(`storyPart${partNumber}`);
    if (!partContainer) {
        partContainer = document.createElement('div');
        partContainer.id = `storyPart${partNumber}`;
        partContainer.className = 'story-part';
        storyContent.appendChild(partContainer);
    }
    
    // Hide all parts and show the selected one
    document.querySelectorAll('.story-part').forEach(part => {
        part.classList.remove('active');
    });
    partContainer.classList.add('active');
    
    // Load content if not already loaded
    if (!partContainer.innerHTML.trim()) {
        const part = storyParts[partNumber - 1];
        if (!part) {
            console.error(`Story part ${partNumber} not found`);
            return;
        }
        
        partContainer.innerHTML = `
            <h3 class="story-part-title">${part.title}</h3>
            ${part.content}
        `;
        
        // Add event listeners to vocabulary terms
        partContainer.querySelectorAll('.highlight-vocab').forEach(term => {
            term.addEventListener('click', function() {
                const word = this.textContent.split('\n')[0].trim();
                const definition = this.querySelector('.vocab-tooltip').textContent;
                
                if (window.narrator) {
                    window.narrator.speak(`${word}: ${definition}`);
                }
            });
        });
        
        // Add read aloud button for this part
        const readAloudBtn = document.createElement('button');
        readAloudBtn.className = 'interactive-btn read-part-btn';
        readAloudBtn.innerHTML = '🔊 Read This Part Aloud';
        readAloudBtn.setAttribute('aria-label', `Read part ${partNumber} aloud`);
        readAloudBtn.onclick = function() { readStoryPartAloud(partNumber, true); }; // true = manual call
        
        // Add button to the end of the part
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.appendChild(readAloudBtn);
        partContainer.appendChild(buttonContainer);
    }
    
    // Scroll to top of story
    storyContent.scrollTop = 0;
    
    // Stop any ongoing narration when switching parts
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration due to part switch');
        window.narrator.stop();
        
        // Clear any reading indicators from previous parts
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Clear any paragraph highlights from previous parts
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
    }
    
    // Announce part change with narrator if available
    if (window.narrator) {
        // Small delay to ensure the previous narration has stopped
        setTimeout(() => {
            // Automatically start reading the new part when switching within story module
            console.log(`Auto-starting narration for story part ${partNumber}`);
            readStoryPartAloud(partNumber, false); // false = automatic call
        }, 100);
    }
}

// Read a specific story part aloud
function readStoryPartAloud(partNumber, isManualCall = true) {
    console.log(`Reading story part ${partNumber} aloud (manual: ${isManualCall})`);
    
    // Enable auto-narration only when user manually starts reading
    if (isManualCall) {
        autoNarrationEnabled = true;
        narrationDisabledByUser = false; // Re-enable auto-narration when user manually starts
    }
    
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    // Stop any ongoing narration first to avoid interruption errors
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration before starting new one');
        window.narrator.stop();
    }
    
    if (partNumber < 1 || partNumber > storyParts.length) {
        console.error(`Invalid part number: ${partNumber}`);
        return;
    }
    
    const part = storyParts[partNumber - 1];
    if (!part) {
        console.error(`Story part ${partNumber} not found`);
        return;
    }
    
    // Extract plain text from the story part
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = part.content;
    
    // Get all paragraphs and remove vocabulary notes
    const paragraphs = tempDiv.querySelectorAll('p');
    
    // Filter out empty paragraphs and those that are part of vocabulary notes
    const validParagraphs = Array.from(paragraphs).filter(p => {
        // Skip if it's empty
        if (p.textContent.trim().length === 0) return false;
        
        // Skip if it's inside a vocabulary note
        if (p.closest('.vocabulary-note')) return false;
        
        // Skip if it's inside a comprehension check
        if (p.closest('.comprehension-check')) return false;
        
        // Skip if it's a button or interactive element
        if (p.closest('button') || p.tagName === 'BUTTON') return false;
        
        return true;
    });
    
    // Extract text from valid paragraphs, cleaning up the content
    const storyText = validParagraphs
        .map(p => {
            let text = p.textContent.trim();
            // Remove vocabulary tooltip content that might be included
            text = text.replace(/\s+/g, ' '); // Normalize whitespace
            return text;
        })
        .filter(text => text.length > 0) // Remove empty strings
        .join(' ');
    
    // Add title to the beginning
    const fullText = `${part.title}. ${storyText}`;
    console.log(`Prepared text for narration (${fullText.length} characters)`);
    
    // Read the text aloud
    if (window.narrator && window.narrator.enabled) {
        try {
            // Show reading indicator
            const partContainer = document.getElementById(`storyPart${partNumber}`);
            if (partContainer) {
                // Remove any existing reading indicators
                const existingIndicators = partContainer.querySelectorAll('.reading-indicator');
                existingIndicators.forEach(indicator => indicator.remove());
                
                // Create new reading indicator
                const readingIndicator = document.createElement('div');
                readingIndicator.className = 'reading-indicator';
                readingIndicator.id = `reading-indicator-${partNumber}`;
                readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
                
                // Find button container or create one if it doesn't exist
                let buttonContainer = partContainer.querySelector('.button-container');
                if (!buttonContainer) {
                    buttonContainer = document.createElement('div');
                    buttonContainer.className = 'button-container';
                    partContainer.appendChild(buttonContainer);
                }
                
                buttonContainer.appendChild(readingIndicator);
                
                // Add stop button
                const stopButton = document.createElement('button');
                stopButton.className = 'interactive-btn stop-narration-btn';
                stopButton.innerHTML = '⏹️ Stop Reading';
                stopButton.onclick = stopNarration;
                readingIndicator.appendChild(stopButton);
                
                // Remove indicator when narration ends or after timeout
                window.readingTimeout = setTimeout(() => {
                    if (readingIndicator.parentNode) {
                        readingIndicator.classList.add('fade-out');
                        setTimeout(() => readingIndicator.remove(), 500);
                    }
                }, Math.min(fullText.length * 100, 60000)); // Dynamic timeout based on text length, max 1 minute
            }
            
            // Register narration end event
            if (window.narrator.onEndCallback) {
                window.narrator.onEndCallback = null;
            }
            
            window.narrator.onEndCallback = function() {
                const indicator = document.getElementById(`reading-indicator-${partNumber}`);
                if (indicator) {
                    indicator.classList.add('fade-out');
                    setTimeout(() => {
                        if (indicator.parentNode) indicator.remove();
                    }, 500);
                }
                
                if (window.readingTimeout && typeof clearTimeout === 'function') {
                    clearTimeout(window.readingTimeout);
                }
            };
            
            // Start narration
            window.narrator.speak(fullText);
            console.log('Narration started');
            
            // Highlight paragraphs as they are being read
            highlightParagraphsSequentially(validParagraphs);
            
        } catch (error) {
            console.error('Error starting narration:', error);
            alert('Sorry, there was an error starting the narration. Please try again.');
        }
    } else {
        console.error('Narrator not available');
        alert('Speech synthesis is not available in your browser.');
    }
}

// Stop ongoing narration
function stopNarration() {
    if (window.narrator) {
        window.narrator.stop();
        console.log('Narration stopped');
        
        // Disable auto-narration when user manually stops
        autoNarrationEnabled = false;
        narrationDisabledByUser = true; // Mark that user has disabled narration
        
        // Remove all reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Remove all paragraph highlights
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
        
        // Clear any timeouts
        if (window.readingTimeout && typeof clearTimeout === 'function') {
            clearTimeout(window.readingTimeout);
        }
        
        if (window.highlightTimeouts && typeof clearTimeout === 'function') {
            window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
            window.highlightTimeouts = [];
        }
    }
}

// Highlight paragraphs sequentially as they are being read
function highlightParagraphsSequentially(paragraphs) {
    // Clear any existing highlight timeouts
    if (window.highlightTimeouts && typeof clearTimeout === 'function') {
        window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
    }
    
    window.highlightTimeouts = [];
    
    // Remove any existing highlights
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    // Calculate approximate time per paragraph based on length
    const totalTextLength = paragraphs.reduce((sum, p) => sum + p.textContent.length, 0);
    let cumulativeLength = 0;
    
    // Estimate total reading time (about 15 characters per second)
    const totalReadingTime = totalTextLength / 15 * 1000;
    
    // Highlight each paragraph at the appropriate time
    paragraphs.forEach((paragraph, index) => {
        const textLength = paragraph.textContent.length;
        const startPercentage = cumulativeLength / totalTextLength;
        cumulativeLength += textLength;
        
        // Calculate when to highlight this paragraph
        const highlightTime = startPercentage * totalReadingTime;
        
        // Set timeout to add highlight
        const highlightTimeout = setTimeout(() => {
            // Remove highlight from previous paragraphs
            if (index > 0) {
                paragraphs[index - 1].classList.remove('paragraph-highlight');
            }
            
            // Add highlight to current paragraph
            paragraph.classList.add('paragraph-highlight');
            
            // Scroll to the paragraph
            paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, highlightTime);
        
        window.highlightTimeouts.push(highlightTimeout);
    });
    
    // Clear highlights when done
    const clearHighlightsTimeout = setTimeout(() => {
        paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
    }, totalReadingTime + 1000);
    
    window.highlightTimeouts.push(clearHighlightsTimeout);
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
