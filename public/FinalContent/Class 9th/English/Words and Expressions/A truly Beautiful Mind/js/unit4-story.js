/**
 * Story content and functionality for Unit 4: Let's Begin
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <h3>The World as I See It</h3>
            
            <p>In my opinion, the present symptoms of <span class="highlight-vocab">decadence<span class="vocab-tooltip">moral or cultural decline as characterised by excessive indulgence in pleasure or luxury</span></span> are explained by the fact that the development of industry and machinery has made the struggle for existence very much more severe, greatly to the <span class="highlight-vocab">detriment<span class="vocab-tooltip">the state of being harmed or damaged</span></span> of the free development of the individual. But the development of machinery means that less and less work is needed from the individual for the community's needs. A planned division of labour is becoming more and more of a crying necessity and this division will lead to the material security of the individual. This security and the spare time and energy which the individual will have at his command can be made to further his development. In this way the community may regain its health, and we will hope that future historians will explain the morbid symptoms of present-day society as the childhood ailments of an aspiring humanity, due entirely to the excessive speed at which civilisation was advancing.</p>
            
            <div class="vocabulary-note">
                <div class="word">decadence</div>
                <div class="definition">moral or cultural decline as characterised by excessive indulgence in pleasure or luxury</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">detriment</div>
                <div class="definition">the state of being harmed or damaged</div>
            </div>
            
            <p class="text-source">(An extract from The World As I See It by A. Einstein)</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What is responsible for the present degradation of individual development?</div>
                <div class="comprehension-question">2. What is the meaning of development in relation to individuals?</div>
                <div class="comprehension-question">3. What is the 'planned division of labour'? How will it be helpful in human development?</div>
                <div class="comprehension-question">4. What does the phrase 'symptoms of decadence' mean in the opening line?</div>
                <div class="comprehension-question">5. The phrase 'crying necessity' in the opening paragraph means:</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <h3>When Einstein wrote to Gandhi</h3>
            
            <p>In 1931, Albert Einstein wrote the following short letter of admiration to another of the world's greatest minds, Mohandas Gandhi. Despite their intentions, the pair never met in person.</p>
            
            <blockquote>
                <p>Respected Mr. Gandhi,</p>
                <p>I use the <span class="highlight-vocab">presence<span class="vocab-tooltip">being present in a place</span></span> of your friend in our home to send you these lines. You have shown through your words, that it is possible to succeed without violence even with those who have not <span class="highlight-vocab">discarded<span class="vocab-tooltip">got rid of something no longer useful or wanted</span></span> the method of violence. We may hope that your example will spread beyond the borders of the country, and will help to establish an international authority, respected by all, that will take decisions and replace war conflicts.</p>
                <p>With sincere admiration<br>Yours<br>(Signed, 'A. Einstein')</p>
                <p>I hope that I will be able to meet you face to face someday.</p>
            </blockquote>
            
            <div class="vocabulary-note">
                <div class="word">presence</div>
                <div class="definition">being present in a place</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">discarded</div>
                <div class="definition">got rid of something no longer useful or wanted</div>
            </div>
            
            <h3>Gandhi's response</h3>
            
            <blockquote>
                <p>LONDON,<br>October 18, 1931</p>
                <p>DEAR FRIEND,</p>
                <p>I was delighted to have your beautiful letter sent through Sundaram. It is great <span class="highlight-vocab">consolation<span class="vocab-tooltip">comfort received by a person after a loss or disappointment</span></span> to me that the work I am doing finds <span class="highlight-vocab">favour<span class="vocab-tooltip">approval, support, or liking</span></span> in your sight. I do indeed wish that we could meet face to face and that too in India at my Ashram.</p>
                <p>Yours Sincerely<br>(Signed, 'M.K Gandhi')</p>
            </blockquote>
            
            <div class="vocabulary-note">
                <div class="word">consolation</div>
                <div class="definition">comfort received by a person after a loss or disappointment</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">favour</div>
                <div class="definition">approval, support, or liking</div>
            </div>
            
            <p class="text-source">(Source: Letters of Note, Volume 2, by Shaun Usher)</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Albert Einstein admired M. K. Gandhi because:</div>
                <div class="comprehension-question">2. Where did Gandhi wish to meet Einstein?</div>
                <div class="comprehension-question">3. Why does Einstein want Gandhi's example to go beyond India?</div>
                <div class="comprehension-question">4. What similarities do you find in the ideas of both the personalities?</div>
                <div class="comprehension-question">5. In the context of Gandhi's response to Einstein's letter, 'finds favour in your sight' means:</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text III",
        content: `
           
            
            <div class="poem-text">
                <p>If you can keep your head when all about you<br>
                Are losing theirs and blaming it on you;<br>
                If you can trust yourself when all men doubt you,<br>
                But make allowance for their doubting too;<br>
                If you can wait and not be tired by waiting,<br>
                Or, being lied about, don't deal in lies,<br>
                Or, being hated, don't give way to hating,<br>
                And yet don't look too good, nor talk too wise;</p>
                
                <p>If you can dream—and not make dreams your master;<br>
                If you can think—and not make thoughts your aim;<br>
                If you can meet with triumph and disaster<br>
                And treat those two <span class="highlight-vocab">impostors<span class="vocab-tooltip">a person who assumes a false identity in order to deceive or defraud</span></span> just the same;<br>
                If you can bear to hear the truth you've spoken<br>
                Twisted by <span class="highlight-vocab">knaves<span class="vocab-tooltip">a dishonest or unscrupulous man</span></span> to make a trap for fools,<br>
                Or watch the things you gave your life to broken,<br>
                And stoop and build 'em up with worn-out tools;</p>
                
                <p>If you can make one heap of all your winnings<br>
                And risk it on one turn of pitch-and-toss,<br>
                And lose, and start again at your beginnings<br>
                And never breathe a word about your loss;<br>
                If you can force your heart and nerve and sinew<br>
                To serve your turn long after they are gone,<br>
                And so hold on when there is nothing in you<br>
                Except the Will which says to them: "Hold on";</p>
                
                <p>If you can talk with crowds and keep your virtue,<br>
                Or walk with kings—nor lose the common touch;<br>
                If neither foes nor loving friends can hurt you;<br>
                If all men count with you, but none too much;<br>
                If you can fill the unforgiving minute<br>
                With sixty seconds' worth of distance run—<br>
                Yours is the Earth and everything that's in it,<br>
                And—which is more—you'll be a Man, my son!</p>
                
                <p class="poem-author">—Rudyard Kipling</p>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">impostor</div>
                <div class="definition">a person who assumes a false identity in order to deceive or defraud</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">knave</div>
                <div class="definition">a dishonest or unscrupulous man</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Which lines in the poem tell us to have self control, a clear head and not to become bitter when people speak against us?</div>
                <div class="comprehension-question">2. One must be just as graceful in losing as he is in winning. What are the two words in the poem that can replace the underlined ones?</div>
                <div class="comprehension-question">3. In the third stanza what does the poet mean by 'And lose, and start again'?</div>
                <div class="comprehension-question">4. There is a necessity to treat all people equal and amidst people we should not lose our self 'who we are'. How has the poet expressed this in the fourth stanza?</div>
                <div class="comprehension-question">5. List two things from each stanza that we can do to make the Earth ours, as given in the poem.</div>
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
