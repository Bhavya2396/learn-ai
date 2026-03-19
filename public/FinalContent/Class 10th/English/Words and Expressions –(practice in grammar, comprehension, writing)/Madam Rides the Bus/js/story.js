/**
 * Story content and functionality for "Madam Rides the Bus" lesson
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <p>In the story 'Madam Rides the Bus', Valli took a bus ride on the bus that she wanted to for last several months. She knew that she had to buy tickets for this. So she saved money suppressing all temptation to buy things like peppermints, toys, balloons, etc., and paid for the ticket.</p>
            
            <div class="vocabulary-note">
                <div class="word">suppressing</div>
                <div class="definition">holding back, controlling, or restraining feelings, actions, or impulses</div>
            </div>
            
            <p>Read the passage given below and answer the questions that follow.</p>
            
            <p>Vishav Driman (65 year old) and her husband Kamal Jeet (69 year old) set out to discover the hidden treasure of Uttarakhand by bicycle. Vishav shares their post-retirement adventure.</p>
            
            <h3>Pedalling through the Golden Years</h3>
            
            <p>At a time when our peers were slowing down, relaxing and watching sunsets from their front porch, we found a new passion — cycling. We started out with short daily rides, but found ourselves looking forward to them more and more, so much that we decided to venture further and cover more ground. There were obvious health concerns — the risk of performing a physically <span class="highlight-vocab">strenuous<span class="vocab-tooltip">requiring a lot of physical effort</span></span> activity at a high altitude, the most obvious of them. But it helped that we had lived in Uttarakhand's capital, Dehradun, our entire lives, and were therefore <span class="highlight-vocab">acclimatised<span class="vocab-tooltip">become used to a new climate or environment</span></span> to the cold winds and narrow winding roads that characterise this beautiful state. We were also familiar with almost all the scenic mountain trails it had to offer.</p>
            
            <div class="vocabulary-note">
                <div class="word">strenuous</div>
                <div class="definition">requiring a lot of physical effort</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">acclimatised</div>
                <div class="definition">become used to a new climate or environment</div>
            </div>
            
            <p>Short rides <span class="highlight-vocab">extended<span class="vocab-tooltip">spread out; became longer</span></span> to longer ones as we started falling deeper in love with not just the sport, but the very idea of discovering a world we had always been a part of, but never had the time to explore. Soon, a simple hobby turned into a project of sorts, and we started participating in <span class="highlight-vocab">cyclotrons<span class="vocab-tooltip">competitive cycling events</span></span> and other cycling events being held in the city. Admiration and encouragement poured in from family members, friends and neighbours along the way, sparking a new thought — was it possible to travel across the state on our bicycles? It seemed <span class="highlight-vocab">daunting<span class="vocab-tooltip">intimidating, overwhelming, or scary</span></span> at first, but we knew we had to try. Our gear in place, our bikes serviced, and our minds set, we set off on an adventure we would remember for the rest of our lives.</p>
            
            <div class="vocabulary-note">
                <div class="word">extended</div>
                <div class="definition">spread out; became longer</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">cyclotrons</div>
                <div class="definition">competitive cycling events</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">daunting</div>
                <div class="definition">intimidating, overwhelming, or scary</div>
            </div>
            
            <p>In my opinion, there are very few ways to enjoy and appreciate the beauty of Uttarakhand and cycling is the most thrilling of them all. Sunlight filtering through the trees and a cool breeze gently <span class="highlight-vocab">caressing<span class="vocab-tooltip">touching or stroking lightly and gently</span></span> your faces as you ride, coupled with breathtaking views of sal forests spread like a green cover on the mountains and surrounding valleys, the experience of pedalling across the state is truly <span class="highlight-vocab">inexplicable<span class="vocab-tooltip">unable to be explained or described</span></span>.</p>
            
            <div class="vocabulary-note">
                <div class="word">caressing</div>
                <div class="definition">touching or stroking lightly and gently</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">inexplicable</div>
                <div class="definition">unable to be explained or described</div>
            </div>
            
            <p>Of the many trails we navigated, there is one that occupies a special place in our hearts. It began from Ghanta Ghar, a popular tourist attraction in Dehradun, it took us through some of the most <span class="highlight-vocab">picturesque<span class="vocab-tooltip">visually attractive or beautiful, like a picture</span></span> locations of the state such as Kimadi, Hathi Paon, Mussoorie and Chaar Dukaan, right up to George Everest point. This 100km ride (approximately) is also one of the few routes in Uttarakhand that <span class="highlight-vocab">encapsulates<span class="vocab-tooltip">summarizes or contains all the essential elements</span></span> all the element that one expects while cycling here — steep slopes, sharp curves, endless hills, lush forests, and off-road experiences.</p>
            
            <div class="vocabulary-note">
                <div class="word">picturesque</div>
                <div class="definition">visually attractive or beautiful, like a picture</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">encapsulates</div>
                <div class="definition">summarizes or contains all the essential elements</div>
            </div>
            
            <p>(Source: by Vishav Driman, India Travel360)</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What is the meaning of the expression "when our peers were slowing down, relaxing and watching sunsets from their front porch"?</div>
                <div class="comprehension-question">2. What made Vishav and her husband confident to venture into Uttarakhand on bicycles?</div>
                <div class="comprehension-question">3. Why did they welcome the encouragement from family and friends?</div>
                <div class="comprehension-question">4. What makes cycling the most thrilling way to explore Uttarakhand?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <p>Read the poem given below and answer the questions that follow.</p>
            
            <h3>Going Down Hill on a Bicycle, A Boy's Song</h3>
            
            <p>With lifted feet, hands still,<br>
            I am <span class="highlight-vocab">poised<span class="vocab-tooltip">balanced or suspended</span></span>, and down the hill<br>
            Dart, with <span class="highlight-vocab">heedful<span class="vocab-tooltip">careful, attentive, or mindful</span></span> mind;<br>
            The air goes by in a wind.</p>
            
            <div class="vocabulary-note">
                <div class="word">poised</div>
                <div class="definition">balanced or suspended</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">heedful</div>
                <div class="definition">careful, attentive, or mindful</div>
            </div>
            
            <p>Swifter and yet more swift,<br>
            Till the heart with a mighty lift<br>
            Makes the lungs laugh, the throat cry:—<br>
            "O bird, see; see, bird, I fly.</p>
            
            <p>"Is this, is this your joy?<br>
            O bird, then I, though a boy,<br>
            For a golden moment share<br>
            Your feathery life in air!"</p>
            
            <p>Say, heart, is there aught like this<br>
            In a world that is full of bliss?<br>
            'Tis more than skating, bound<br>
            Steel-shod to the level ground.</p>
            
            <p>Speed <span class="highlight-vocab">slackens<span class="vocab-tooltip">becomes slower or decreases</span></span> now, I float<br>
            Awhile in my airy boat;<br>
            Till, when the wheels scarce crawl,<br>
            My feet to the <span class="highlight-vocab">treadles<span class="vocab-tooltip">bicycle pedals</span></span> fall.</p>
            
            <div class="vocabulary-note">
                <div class="word">slackens</div>
                <div class="definition">becomes slower or decreases</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">treadles</div>
                <div class="definition">bicycle pedals</div>
            </div>
            
            <p>Alas, that the longest hill<br>
            Must end in a <span class="highlight-vocab">vale<span class="vocab-tooltip">a broad, flat area of land between hills</span></span>; but still,<br>
            Who climbs with toil, wheresoe'er,<br>
            Shall find wings waiting there.</p>
            
            <div class="vocabulary-note">
                <div class="word">vale</div>
                <div class="definition">a broad, flat area of land between hills</div>
            </div>
            
            <p>Henry Charles Beeching</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What is the poem describing?</div>
                <div class="comprehension-question">2. How does the boy compare himself to a bird?</div>
                <div class="comprehension-question">3. What is the meaning of "golden moment"?</div>
                <div class="comprehension-question">4. What is the deeper meaning of the final two lines?</div>
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

// Document ready event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize story when the DOM is loaded
    if (document.getElementById('storyContent')) {
        // Show the first part by default
        showStoryPart(1);
    }
});