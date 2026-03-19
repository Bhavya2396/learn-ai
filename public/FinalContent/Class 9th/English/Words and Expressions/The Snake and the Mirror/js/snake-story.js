/**
 * Story content and functionality for The Snake Chapter
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - THE MIRACULOUS ESCAPE",
        content: `
            <p>I had been very wealthy and prosperous and was leading a very comfortable life. I had all the worldly pleasures with me. But soon I became bored of my idle life. The urge to go on a voyage became stronger and stronger day by day. It <span class="highlight-vocab">haunted<span class="vocab-tooltip">obsessed, troubled persistently</span></span> me like anything. So one day I boarded a ship and went trading from island to island with other merchants.</p>
            
            <div class="vocabulary-note">
                <div class="word">haunted</div>
                <div class="definition">obsessed, troubled persistently</div>
            </div>
            
            <p>When we started, the weather was fine and the sea was calm. But on the fourth day of our voyage, our ship was caught in a <span class="highlight-vocab">terrific<span class="vocab-tooltip">extremely severe or intense</span></span> hurricane and we wandered from our set course. The <span class="highlight-vocab">tempest<span class="vocab-tooltip">violent windy storm</span></span> continued for several days and drove us near an island. The captain of the ship was <span class="highlight-vocab">reluctant<span class="vocab-tooltip">unwilling, hesitant</span></span> to cast anchor at the port as it was a much dreaded place.</p>
            
            <div class="vocabulary-note">
                <div class="word">terrific</div>
                <div class="definition">extremely severe or intense</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">tempest</div>
                <div class="definition">violent windy storm</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">reluctant</div>
                <div class="definition">unwilling, hesitant</div>
            </div>
            
            <p>The violent waves of the sea had <span class="highlight-vocab">exhausted<span class="vocab-tooltip">completely tired</span></span> us. We were all tired and hungry so we went in search of food and water. We were fortunate enough to find fruit trees and a stream of fresh and cool water which gave us strength and energy and relieved us from hunger.</p>
            
            <div class="vocabulary-note">
                <div class="word">exhausted</div>
                <div class="definition">completely tired</div>
            </div>
            
            <p>It had started getting dark. As we were tired we went to sleep but were soon <span class="highlight-vocab">startled<span class="vocab-tooltip">suddenly shocked or alarmed</span></span> by a <span class="highlight-vocab">rustle<span class="vocab-tooltip">soft, muffled crackling sound</span></span> which came from a very long and huge python like serpent gliding swiftly towards us. We ran to save our lives but the serpent was quick enough to swallow one of my companions. We kept running till we had covered a good enough distance from the serpent. We felt a bit relieved but at the same time sad as we had lost a friend of ours. We took shelter on the top of a tree and thought ourselves to be safe.</p>
            
            <div class="vocabulary-note">
                <div class="word">startled</div>
                <div class="definition">suddenly shocked or alarmed</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">rustle</div>
                <div class="definition">soft, muffled crackling sound</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Why did the narrator decide to go on a voyage?</div>
                <div class="comprehension-question">2. What happened on the fourth day of their journey?</div>
                <div class="comprehension-question">3. Why was the captain reluctant to anchor at the island?</div>
                <div class="comprehension-question">4. What did they find to relieve their hunger and thirst?</div>
            </div>
        `
    },
    {
        title: "THE MIRACULOUS ESCAPE - Continued",
        content: `
            <p>But we were mistaken for we had hardly slept a little time when we heard a <span class="highlight-vocab">hissing<span class="vocab-tooltip">sound made by a snake</span></span> sound which <span class="highlight-vocab">alarmed<span class="vocab-tooltip">warned of danger</span></span> and frightened us. <span class="highlight-vocab">Coiling<span class="vocab-tooltip">winding into spiral loops</span></span> itself round the tree, the serpent reached my other companion who was positioned somewhat lower than me on the tree. It swallowed him and went away. Terror stricken I clung to the branch of the tree tightly and I did not know when I fell asleep. It was daylight when I awoke. I climbed down. It seemed to me that I had no courage left. It took me no time to realise that if I would not think of a way to escape soon, I would be a dead man. It was just a matter of time when I would also be swallowed like my two other companions. The <span class="highlight-vocab">instinct<span class="vocab-tooltip">natural tendency</span></span> to prevent one's life is greater than any fear or <span class="highlight-vocab">frustration<span class="vocab-tooltip">feeling of being upset or annoyed</span></span>.</p>
            
            <div class="vocabulary-note">
                <div class="word">hissing</div>
                <div class="definition">sound made by a snake</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">alarmed</div>
                <div class="definition">warned of danger</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">coiling</div>
                <div class="definition">winding into spiral loops</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">instinct</div>
                <div class="definition">natural tendency</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">frustration</div>
                <div class="definition">feeling of being upset or annoyed</div>
            </div>
            
            <p>I thought I should spare no means to save myself. I collected a lot of dry wood and bushes and tied them into a bundle with <span class="highlight-vocab">reeds<span class="vocab-tooltip">tall grasses that grow in wet areas</span></span>. I arranged them in a circular structure round the tree and tied some of them with the branches of the tree. In this way I made a tent like structure in which I sat after dusk and securely tied from within. I had the satisfaction that whatever I could do I did it to prevent myself. This time when the serpent arrived he crept round the tree but he could not <span class="highlight-vocab">penetrate<span class="vocab-tooltip">force a way into or through</span></span> the <span class="highlight-vocab">defensive<span class="vocab-tooltip">serving to protect or defend</span></span> structure I had made around me. It just sat and waited the whole night like a cat that waits for the mouse to emerge out of its hole.</p>
            
            <div class="vocabulary-note">
                <div class="word">reeds</div>
                <div class="definition">tall grasses that grow in wet areas</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">penetrate</div>
                <div class="definition">force a way into or through</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">defensive</div>
                <div class="definition">serving to protect or defend</div>
            </div>
            
            <p>At dawn the serpent crept back but I dared not come out of my <span class="highlight-vocab">fortress<span class="vocab-tooltip">strongly protected place</span></span>. I lay there half dead and almost <span class="highlight-vocab">suffocated<span class="vocab-tooltip">unable to breathe properly</span></span>.</p>
            
            <div class="vocabulary-note">
                <div class="word">fortress</div>
                <div class="definition">strongly protected place</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">suffocated</div>
                <div class="definition">unable to breathe properly</div>
            </div>
            
            <p>When the Sun began to shine, I came out of my wooden fortress. I was so desperate that I ran towards the seashore. When I was about to jump into the sea, I saw a ship sailing at some distance. I shouted <span class="highlight-vocab">wildly<span class="vocab-tooltip">uncontrolled, very enthusiastically</span></span>, I took off my shirt and waved it too, which attracted the sailors on the ship and a rescue boat was immediately sent for me. This was my miraculous escape from the deadly serpent.</p>
            
            <div class="vocabulary-note">
                <div class="word">wildly</div>
                <div class="definition">uncontrolled, very enthusiastically</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What happened to the second companion?</div>
                <div class="comprehension-question">2. How did the narrator protect himself from the serpent?</div>
                <div class="comprehension-question">3. Why couldn't he leave his fortress immediately in the morning?</div>
                <div class="comprehension-question">4. How was the narrator finally rescued?</div>
                <div class="comprehension-question">5. Why is the escape described as "miraculous"?</div>
            </div>
        `
    },
    {
        title: "The Snake Poems",
        content: `
            <div class="poem-text">
                <h3>The Snake Trying</h3>
                <p>by W.W.E. Ross</p>
                <br>
                <p>The snake trying</p>
                <p>to escape the pursuing stick,</p>
                <p>with sudden <span class="highlight-vocab">curvings<span class="vocab-tooltip">bending movements</span></span> of thin</p>
                <p>long body. How beautiful</p>
                <p>and <span class="highlight-vocab">graceful<span class="vocab-tooltip">elegant, showing grace</span></span> are his shapes!</p>
                <p>He <span class="highlight-vocab">glides<span class="vocab-tooltip">moves smoothly and effortlessly</span></span> through the water away</p>
                <p>from the stroke. O let him go</p>
                <p>over the water</p>
                <p>into the <span class="highlight-vocab">reeds<span class="vocab-tooltip">tall grasses that grow in wet areas</span></span> to hide</p>
                <p>without hurt. Small and green</p>
                <p>he is <span class="highlight-vocab">harmless<span class="vocab-tooltip">not able or likely to cause harm</span></span> even to children.</p>
                <p>Along the sand</p>
                <p>he lay until observed</p>
                <p>and chased away, and now</p>
                <p>he <span class="highlight-vocab">ripples<span class="vocab-tooltip">forms small waves</span></span> through the water <span class="highlight-vocab">peacefully<span class="vocab-tooltip">in a peaceful manner</span></span>.</p>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">curvings</div>
                <div class="definition">bending movements</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">graceful</div>
                <div class="definition">elegant, showing grace</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">glides</div>
                <div class="definition">moves smoothly and effortlessly</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">reeds</div>
                <div class="definition">tall grasses that grow in wet areas</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">harmless</div>
                <div class="definition">not able or likely to cause harm</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">ripples</div>
                <div class="definition">forms small waves</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">peacefully</div>
                <div class="definition">in a peaceful manner</div>
            </div>
            
            <div class="poem-text">
                <h3>Green Snake</h3>
                <p>by Margaret Atwood</p>
                <br>
                <p>I am tired of being</p>
                <p>a <span class="highlight-vocab">sinuous<span class="vocab-tooltip">having many curves or bends</span></span> body in the grass, a <span class="highlight-vocab">venom<span class="vocab-tooltip">poisonous fluid produced by animals such as snakes</span></span> in the dust.</p>
                <p>When I <span class="highlight-vocab">curl<span class="vocab-tooltip">form into a curved shape</span></span> around the egg of a small bird and swallow it whole</p>
                <p>or <span class="highlight-vocab">slip<span class="vocab-tooltip">move smoothly and quietly</span></span> past the dog and into the house</p>
                <p>where I make my home under the eaves,</p>
                <p>or <span class="highlight-vocab">dangle<span class="vocab-tooltip">hang or swing loosely</span></span> like a shoelace from a tree,</p>
                <p>When I lay on the <span class="highlight-vocab">bare<span class="vocab-tooltip">uncovered, naked</span></span> floor or <span class="highlight-vocab">coil<span class="vocab-tooltip">arrange into a series of loops</span></span> in the <span class="highlight-vocab">dewgrass<span class="vocab-tooltip">grass covered with dew (moisture)</span></span></p>
                <p>I think of how beautiful I am,</p>
                <p>but <span class="highlight-vocab">repulsive<span class="vocab-tooltip">causing strong dislike or disgust</span></span> to them</p>
                <p>who fear the serpent</p>
                <p>because they fear the mystery.</p>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">sinuous</div>
                <div class="definition">having many curves or bends</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">venom</div>
                <div class="definition">poisonous fluid produced by animals such as snakes</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">curl</div>
                <div class="definition">form into a curved shape</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">slip</div>
                <div class="definition">move smoothly and quietly</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">dangle</div>
                <div class="definition">hang or swing loosely</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">bare</div>
                <div class="definition">uncovered, naked</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">coil</div>
                <div class="definition">arrange into a series of loops</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">dewgrass</div>
                <div class="definition">grass covered with dew (moisture)</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">repulsive</div>
                <div class="definition">causing strong dislike or disgust</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. How is the snake portrayed in "The Snake Trying" poem?</div>
                <div class="comprehension-question">2. What is the central message of "The Snake Trying" poem?</div>
                <div class="comprehension-question">3. From whose perspective is "Green Snake" written?</div>
                <div class="comprehension-question">4. Compare the attitudes toward snakes in both poems.</div>
                <div class="comprehension-question">5. What does the snake in "Green Snake" poem think about humans' fear?</div>
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
