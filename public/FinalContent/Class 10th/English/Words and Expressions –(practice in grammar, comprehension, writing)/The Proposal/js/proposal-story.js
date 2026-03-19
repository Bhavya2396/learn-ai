/**
 * Story content and functionality for The Proposal interactive lesson
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <h3>How Can We Control Anger?</h3>
            
            <p>Do you get angry when your mother switches off the television? Do you get upset when you lose a game? Do you crib when your teacher does not pay attention to you? Most of us can have "yes" as an answer to one or more of these situations. Anger sometimes gets the better of us and leaves us to regret the consequences later. The question is 'How can we control anger?'</p>
            
            <p>Anger is a normal and healthy emotion only if we know how to respond to it. Uncontrolled anger can often harm us directly or indirectly whether we realise or not. Before we learn to address the issue, let us revisit the concept of anger. Anger is nothing but absence of peace with oneself, people or situations around us. And we express it either by being <span class="highlight-vocab">assertive<span class="vocab-tooltip">confident and direct in dealing with others</span></span> or <span class="highlight-vocab">aggressive<span class="vocab-tooltip">ready or likely to attack or confront</span></span>.</p>
            
            <div class="vocabulary-note">
                <div class="word">assertive</div>
                <div class="definition">confident and direct in dealing with others</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">aggressive</div>
                <div class="definition">ready or likely to attack or confront</div>
            </div>
            
            <p>Let us all become the managers of our own anger. When angry, take a few moments to calm down (take five deep breaths, count up to ten, drink water, change your place) before responding. More often than not we do not have control over the situations that distress us. Getting physically active reduces stress. Funny dances, clapping, thumping your feet, a walk, making funny faces at the mirror, etc., go a long way in helping us let go of the distress anger or the <span class="highlight-vocab">frustration<span class="vocab-tooltip">the feeling of being upset or annoyed</span></span> inside us. Once we have our feelings under control, go through all the aspects of the situation and try to see the same situation from different perspectives. If it is a problem try to equip yourself with a few solutions before entering the same situation. Avoid holding a <span class="highlight-vocab">grudge<span class="vocab-tooltip">a persistent feeling of ill will or resentment</span></span> with people and learn when to seek help from others. Realising your own shortcomings can become one of the greatest strengths of character over the years to come.</p>
            
            <div class="vocabulary-note">
                <div class="word">frustration</div>
                <div class="definition">the feeling of being upset or annoyed</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">grudge</div>
                <div class="definition">a persistent feeling of ill will or resentment</div>
            </div>
            
            <p>We can never control circumstances, people or situations as they are constantly changing. The only thing we can control is our response. So we have to increase our capacity to tolerate, ability to understand, and learn to nurture love for others.</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What do you understand by the word 'anger'?</div>
                <div class="comprehension-question">2. List any four strategies to manage anger.</div>
                <div class="comprehension-question">3. How can you develop strengths of character as given in the passage above?</div>
                <div class="comprehension-question">4. Anger management helps you in developing strength of character, learning how to respond to the situation, and remaining stress free.</div>
                <div class="comprehension-question">5. What is under our control? How can we make it a positive one?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <h3>On Violence</h3>
            
            <p>There is a great deal of violence in the world. There is physical violence and also inward violence. Physical violence is to kill another, to hurt other people consciously, deliberately or without thought, to say cruel things, full of <span class="highlight-vocab">antagonism<span class="vocab-tooltip">active hostility or opposition</span></span> and hate and inwardly, inside the skin, to dislike people, to hate people, to criticise people. Inwardly, we are always quarrelling, battling, not only with others, but with ourselves. We want people to change, we want to force them to our way of thinking.</p>
            
            <div class="vocabulary-note">
                <div class="word">antagonism</div>
                <div class="definition">active hostility or opposition</div>
            </div>
            
            <p>In the world, as we grow up, we see a great deal of violence, at all levels of human existence. The ultimate violence is war — the killing for ideas, for so-called religious principles, for nationalities, the killing to preserve a little piece of land. To do that, man will kill, destroy, <span class="highlight-vocab">maim<span class="vocab-tooltip">wound or injure someone so that part of the body is permanently damaged</span></span>, and also be killed himself. There is enormous violence in the world, the rich wanting to keep people poor, and the poor wanting to get rich and in the process hating the rich. And you, being caught in society, are also going to contribute to this.</p>
            
            <div class="vocabulary-note">
                <div class="word">maim</div>
                <div class="definition">wound or injure someone so that part of the body is permanently damaged</div>
            </div>
            
            <p>There is violence between husband, wife, and children. There is violence, antagonism, hate, cruelty, ugly criticism, anger — all this is <span class="highlight-vocab">inherent<span class="vocab-tooltip">existing in something as a permanent characteristic</span></span> in man, inherent in each human being. It is inherent in you. And education is supposed to help you to go beyond all that, not merely to pass an examination and get a job. You have to be educated so that you become a really beautiful, healthy, sane, rational human being, not a brutal man with a very clever brain who can argue and defend his <span class="highlight-vocab">brutality<span class="vocab-tooltip">savage physical violence; great cruelty</span></span>.</p>
            
            <div class="vocabulary-note">
                <div class="word">inherent</div>
                <div class="definition">existing in something as a permanent characteristic</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">brutality</div>
                <div class="definition">savage physical violence; great cruelty</div>
            </div>
            
            <p>You are going to face all this violence as you grow up. You will forget all that you have heard here, and will be caught in the stream of society. You will become like the rest of the cruel, hard, bitter, angry, violent world, and you will not help to bring about a new society, a new world.</p>
            
            <p>But a new world is necessary. A new culture is necessary. The old culture is dead, buried, burnt, exploded, and <span class="highlight-vocab">vaporised<span class="vocab-tooltip">converted into vapour; disappeared</span></span>. You have to create a new culture. A new culture cannot be based on violence. The new culture depends on you because the older generation has built a society based on violence, based on <span class="highlight-vocab">aggressiveness<span class="vocab-tooltip">the quality of being aggressive</span></span> and it is this that has caused all the confusion, all the misery. The older generations have produced this world and you have to change it.</p>
            
            <div class="vocabulary-note">
                <div class="word">vaporised</div>
                <div class="definition">converted into vapour; disappeared</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">aggressiveness</div>
                <div class="definition">the quality of being aggressive</div>
            </div>
            
            <p>You cannot just sit back and say, "I will follow the rest of the people and seek success and position." If you do, your children are going to suffer. You may have a good time, but your children are going to pay for it. So, you have to take all that into account, the outward cruelty of man to man in the name of god, in the name of religion, in the name of self-importance, in the name of the security of the family. You will have to consider the outward cruelty and violence, and the inward violence which you do not yet know.</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What is the physical violence that J. Krishnamurti is talking about?</div>
                <div class="comprehension-question">2. What is the violence that cannot be expressed?</div>
                <div class="comprehension-question">3. War, the ultimate violence, could be due to difference of ideas, religious principles, nationalities, and the feeling to protect a little piece of land.</div>
                <div class="comprehension-question">4. How has J. Krishnamurti given the feelings of the rich and the poor in the given paragraph?</div>
                <div class="comprehension-question">5. What is the role of education in a human being's life?</div>
                <div class="comprehension-question">6. How, as a student, will you create a new world?</div>
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
