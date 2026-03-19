/**
 * Story content and functionality for The Little Girl
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <p>This is an extract from Harper Lee's To Kill a Mocking Bird.</p>
            
            <p>After supper, Atticus sat down with the paper and called, "Scout, ready to read?". I ran <span class="highlight-vocab">crying<span class="vocab-tooltip">expressing loud sounds of grief</span></span>, went to the front porch. Atticus followed me. "Something wrong, Scout?" I told Atticus I didn't feel very well and didn't think I'd go to school any more if it was alright with him. Atticus sat down in the swing and crossed his legs. His fingers <span class="highlight-vocab">wandered<span class="vocab-tooltip">moved about without a fixed course or aim</span></span> to his watch pocket; he said that was the only way he could think. He waited in <span class="highlight-vocab">amiable<span class="vocab-tooltip">friendly, pleasant, good-natured</span></span> silence, and I sought to <span class="highlight-vocab">reinforce<span class="vocab-tooltip">strengthen or support</span></span> my position: "You never went to school and you do alright, so I'll just stay home too. You can teach me like <span class="highlight-vocab">Granddaddy<span class="vocab-tooltip">grandfather (informal)</span></span> taught you 'n' Uncle Jack." "No I can't", said Atticus. "I have to make a living. Besides, they'd put me in jail if I kept you at home. Now what's the matter? Bit by bit, I told him the day's misfortunes. "And the teacher said you taught me all wrong, so we can't ever read any more, ever. Please don't send me back, please Sir." Atticus stood up and walked to the end of the porch. When he completed his <span class="highlight-vocab">examination<span class="vocab-tooltip">inspection, observation</span></span> of the <span class="highlight-vocab">wisteria vine<span class="vocab-tooltip">a genus of flowering plants</span></span> he strolled back to me. "First of all", he said, "if you can learn a simple trick, Scout, you'll get along a lot better with all kinds of folks. You never really understand a person until you consider things from his point of view-" "Sir?" "-until you climb into his skin and walk around in it". "But if I keep on goin' to school, we can't ever read any more…" "That's really <span class="highlight-vocab">bothering<span class="vocab-tooltip">causing worry, anxiety, or trouble</span></span> you, isn't it?" "Yes sir."</p>
            
            <div class="vocabulary-note">
                <div class="word">crying</div>
                <div class="definition">expressing loud sounds of grief</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">wandered</div>
                <div class="definition">moved about without a fixed course or aim</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">amiable</div>
                <div class="definition">friendly, pleasant, good-natured</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">reinforce</div>
                <div class="definition">strengthen or support</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">Granddaddy</div>
                <div class="definition">grandfather (informal)</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">examination</div>
                <div class="definition">inspection, observation</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">wisteria vine</div>
                <div class="definition">a genus of flowering plants</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">bothering</div>
                <div class="definition">causing worry, anxiety, or trouble</div>
            </div>
            
            <p>When Atticus looked down at me I saw the expression on his face that always made me expect something. "Do you know what a <span class="highlight-vocab">compromise<span class="vocab-tooltip">agreement reached by mutual concession</span></span> is?", he asked. "Bending the law?" "No, an agreement reached by mutual <span class="highlight-vocab">concessions<span class="vocab-tooltip">things that are yielded or surrendered</span></span>. It works this way", he said. "If you'll concede the necessity of going to school, we'll go on reading every night just as we always have. Is it a <span class="highlight-vocab">bargain<span class="vocab-tooltip">an agreement between two or more people</span></span>?"</p>
            
            <div class="vocabulary-note">
                <div class="word">compromise</div>
                <div class="definition">agreement reached by mutual concession</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">concessions</div>
                <div class="definition">things that are yielded or surrendered</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">bargain</div>
                <div class="definition">an agreement between two or more people</div>
            </div>
            
            <p>"Yes sir!"</p>
            <p>"We'll consider it sealed without the usual <span class="highlight-vocab">formality<span class="vocab-tooltip">established procedure or routine</span></span>", Atticus said, when he saw me preparing to spit.</p>
            
            <div class="vocabulary-note">
                <div class="word">formality</div>
                <div class="definition">established procedure or routine</div>
            </div>
            
            <p>As I opened the front screen door Atticus said, "By the way, Scout, you'd better not say anything at school about our agreement". "Why not?" "I'm afraid our activities would be received with considerable <span class="highlight-vocab">disapprobation<span class="vocab-tooltip">strong moral disapproval</span></span> by the more learned authorities."</p>
            
            <div class="vocabulary-note">
                <div class="word">disapprobation</div>
                <div class="definition">strong moral disapproval</div>
            </div>
            
            <p>My brother and I were accustomed to our father's <span class="highlight-vocab">diction<span class="vocab-tooltip">choice and use of words in speech or writing</span></span>, and we were at all times free to interrupt Atticus for a <span class="highlight-vocab">translation<span class="vocab-tooltip">a written or spoken rendering in another language</span></span> when it was beyond our understanding. "Huh, Sir?"</p>
            
            <div class="vocabulary-note">
                <div class="word">diction</div>
                <div class="definition">choice and use of words in speech or writing</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">translation</div>
                <div class="definition">a written or spoken rendering in another language</div>
            </div>
            
            <p>"I never went to school", he said, "but I have a feeling that if you tell Miss Caroline we read every night she'll get after me, and I wouldn't want her after me".</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Why was Scout, the little girl upset?</div>
                <div class="comprehension-question">2. How did Atticus, her father, react to her outburst?</div>
                <div class="comprehension-question">3. What advice did Atticus give to his little girl to cope with situations that might upset her?</div>
                <div class="comprehension-question">4. How was the matter eventually resolved?</div>
                <div class="comprehension-question">5. What does the word 'disapprobation' mean in this context?</div>
                <div class="comprehension-question">6. Why did Atticus ask Scout not to mention their agreement to her teacher?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <h3>Poem at Thirty-Nine</h3>
            
            <div class="poem-text">
                How I miss my father.<br>
                I wish he had not been<br>
                so tired<br>
                when I was<br>
                born.<br>
                <br>
                Writing <span class="highlight-vocab">deposit slips<span class="vocab-tooltip">a small form recording an amount of money placed in a bank account</span></span> and cheques<br>
                I think of him.<br>
                He taught me how.<br>
                This is the form,<br>
                he must have said:<br>
                the way it is done.<br>
                I learned to see<br>
                bits of paper<br>
                as a way<br>
                to escape<br>
                the life he knew<br>
                and even in high school<br>
                had a savings<br>
                account.<br>
                <br>
                He taught me<br>
                that telling the truth<br>
                did not always mean<br>
                a beating;<br>
                though many of my truths<br>
                must have <span class="highlight-vocab">grieved<span class="vocab-tooltip">caused sorrow or distress</span></span> him<br>
                before the end.<br>
                <br>
                How I miss my father!<br>
                He cooked like a person<br>
                dancing<br>
                in a yoga meditation<br>
                and craved the <span class="highlight-vocab">voluptuous<span class="vocab-tooltip">giving great pleasure to the senses</span></span><br>
                sharing<br>
                of good food.<br>
                <br>
                Now I look and cook just like him:<br>
                my brain light;<br>
                <span class="highlight-vocab">tossing<span class="vocab-tooltip">throwing something lightly</span></span> this and that<br>
                into the pot;<br>
                <span class="highlight-vocab">seasoning<span class="vocab-tooltip">adding salt, herbs, or spices to food</span></span> none of my life<br>
                the same way twice; happy to feed<br>
                whoever <span class="highlight-vocab">strays<span class="vocab-tooltip">wanders or roams</span></span> my way.<br>
                <br>
                He would have grown<br>
                to admire<br>
                the woman I've become:<br>
                cooking, writing, chopping wood,<br>
                staring into the fire.
            </div>
            
            <div class="vocabulary-note">
                <div class="word">deposit slips</div>
                <div class="definition">a small form recording an amount of money placed in a bank account</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">grieved</div>
                <div class="definition">caused sorrow or distress</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">voluptuous</div>
                <div class="definition">giving great pleasure to the senses</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">tossing</div>
                <div class="definition">throwing something lightly</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">seasoning</div>
                <div class="definition">adding salt, herbs, or spices to food</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">strays</div>
                <div class="definition">wanders or roams</div>
            </div>
            
            <p class="content-block">—Alice Walker</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What made Alice Walker open a savings account in High School?</div>
                <div class="comprehension-question">2. What lesson did her father give her on telling the truth?</div>
                <div class="comprehension-question">3. What does 'dancing in yoga meditation' mean in the poem?</div>
                <div class="comprehension-question">4. What would her father have admired about the woman she has become?</div>
                <div class="comprehension-question">5. Why do you think the title of the poem is 'Poem at Thirty-Nine'?</div>
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
    
    // Get the poem content if it exists
    const poemDiv = tempDiv.querySelector('.poem-text');
    
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
    let storyText = validParagraphs
        .map(p => {
            let text = p.textContent.trim();
            // Remove vocabulary tooltip content that might be included
            text = text.replace(/\s+/g, ' '); // Normalize whitespace
            return text;
        })
        .filter(text => text.length > 0) // Remove empty strings
        .join(' ');
        
    // Handle poem content separately if it exists
    if (poemDiv) {
        const poemText = poemDiv.textContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('. ');
            
        // Add poem to the story text
        storyText = `${part.title}. Here's the poem: ${poemText}`;
    } else {
        // Add title to the beginning
        storyText = `${part.title}. ${storyText}`;
    }
    
    console.log(`Prepared text for narration (${storyText.length} characters)`);
    
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
                }, Math.min(storyText.length * 100, 60000)); // Dynamic timeout based on text length, max 1 minute
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
            window.narrator.speak(storyText);
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
