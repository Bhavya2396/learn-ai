/**
 * Story content and functionality for Unit 7: Reach for the Top
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <p>On 3 August 1996, Leander Paes became the first Indian to win an individual medal in 44 years when he defeated <span class="highlight-vocab">gusto<span class="vocab-tooltip">enjoyment and enthusiasm</span></span> Fernando Meligeni of Brazil in an exciting match in the Centennial Olympic Games at Atlanta. Paes ranked 31 places below the Brazilian, played with gusto and determination against a player who has two ATP tour titles under his belt, and clinched the bronze medal. He was given a standing ovation when Paes raised his hand in triumph and said a silent prayer.</p>
            
            <div class="vocabulary-note">
                <div class="word">gusto</div>
                <div class="definition">enjoyment and enthusiasm</div>
            </div>
            
            <p>Leander's father had won a bronze medal in the Munich Olympics 1972 as a member of the Indian hockey team. It is creditable to Leander Paes as he got it in an individual event.</p>
            
            <p>Later he dedicated the medal to his coach and his doubles teammate. "They have helped me out and given me advice and kept me in good frame of mind. This medal doesn't just show my efforts; it shows the efforts of the whole team."</p>
            
            <p>Paes was recognised as a <span class="highlight-vocab">prodigy<span class="vocab-tooltip">a young person with exceptional qualities or abilities</span></span> by Vijay Amritraj in the '80s. Even so, Paes' true mentor has been Naresh Kumar, the former Indian Davis Cup Captain. His incredible Davis Cup record speaks for itself. While it may be said that some of his Davis Cup victories were achieved because he was playing on his favourite surface, grass and enjoyed home support. But at Atlanta, Paes had none of these advantages except his coach, close family members and the <span class="highlight-vocab">expatriates<span class="vocab-tooltip">a person who lives outside their native country</span></span>. While Davis Cup victories bring in good cash rewards and ATP (Association of Tennis Professionals) points, there he was playing for just a medal. Paes explains it all when he says, "When I am playing for my country I don't expect anything." That straightaway sets him apart.</p>
            
            <div class="vocabulary-note">
                <div class="word">prodigy</div>
                <div class="definition">a young person with exceptional qualities or abilities</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">expatriate</div>
                <div class="definition">a person who lives outside their native country</div>
            </div>
            
            <p>He succeeds because of his willingness to take his chances, swift reflexes and mental strength, and the fact that he does not accept defeat easily.</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Why is Leander's victory at Atlanta significant?</div>
                <div class="comprehension-question">2. How was his father's Olympic triumph in 1972 different from his own?</div>
                <div class="comprehension-question">3. How did Leander's coach and doubles teammate help him?</div>
                <div class="comprehension-question">4. What qualities make Leander a successful player?</div>
                <div class="comprehension-question">5. What advantages did Leander have in India for Davis Cup victories?</div>
                <div class="comprehension-question">6. Why did Leander win at Atlanta despite lacking some advantages?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <h3>Where the Mind is Without Fear</h3>
            
            <div class="poem-text">
                <p>Where the mind is without fear and the head is held high;</p>
                <p>Where knowledge is free;</p>
                <p>Where the world has not been broken up into fragments</p>
                <p>By narrow domestic walls;</p>
                <p>Where words come out from the depth of truth;</p>
                <p>Where tireless striving stretches its arms towards perfection;</p>
                <p>Where the clear stream of reason has not lost its way</p>
                <p>Into the dreary desert sand of dead habits;</p>
                <p>Where the mind is led forward by thee</p>
                <p>Into ever-widening thought and action;</p>
                <p>Into that heaven of freedom, my Father, let my country awake.</p>
                <p class="poem-author">— Rabindranath Tagore</p>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Which line from the poem refers to "everybody should be able to learn"?</div>
                <div class="comprehension-question">2. Which lines refer to "there ought not be a division among people on the basis of caste, class, creed, religion or any other such basis"?</div>
                <div class="comprehension-question">3. Which line means "people should be honest and speak out their heart"?</div>
                <div class="comprehension-question">4. Which lines suggest "actions should stem from logic and not superstitions and beliefs, leading to progress"?</div>
                <div class="comprehension-question">5. Which lines refer to "people should be free of fear and oppression"?</div>
                <div class="comprehension-question">6. Who is the poet addressing in this poem and what is he asking for?</div>
            </div>
            
            <div class="vocabulary-section">
                <h3>Fun Facts</h3>
                <div class="fun-fact">
                    <h4>Commonly misspelt words</h4>
                    <table class="vocab-table">
                        <tr>
                            <th>Incorrect</th>
                            <th>Correct</th>
                        </tr>
                        <tr>
                            <td>Posession</td>
                            <td>Possession</td>
                        </tr>
                        <tr>
                            <td>Recieve</td>
                            <td>Receive</td>
                        </tr>
                        <tr>
                            <td>Seperate</td>
                            <td>Separate</td>
                        </tr>
                        <tr>
                            <td>Supercede</td>
                            <td>Supersede</td>
                        </tr>
                        <tr>
                            <td>Threshhold</td>
                            <td>Threshold</td>
                        </tr>
                        <tr>
                            <td>Unforseen</td>
                            <td>Unforeseen</td>
                        </tr>
                    </table>
                </div>
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
