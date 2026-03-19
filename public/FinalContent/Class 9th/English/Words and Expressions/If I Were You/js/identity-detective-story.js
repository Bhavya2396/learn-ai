/**
 * Story content and functionality for Identity Theft and Detectives
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <p>Read the following text and answer the questions that follow.</p>
            
            <h3>Interview with a Detective</h3>
            
            <p>His appearance was clean, cool and deliberately <span class="highlight-vocab">ambiguous<span class="vocab-tooltip">open to more than one interpretation; not having one obvious meaning</span></span>. Under the <span class="highlight-vocab">sanctuary<span class="vocab-tooltip">shelter, protection</span></span> of his aviators, his eyes silently scanned the room. He is a Manhattan-based, third-generation private detective who's been in the business for more than three decades — specialising in <span class="highlight-vocab">surveillance<span class="vocab-tooltip">close observation, especially of a suspected spy or criminal</span></span> and being an overall mystery-tinged badass. We asked him everything we've ever wanted to know about the profession.</p>
            
            <div class="vocabulary-note">
                <div class="word">ambiguous</div>
                <div class="definition">open to more than one interpretation; not having one obvious meaning</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">sanctuary</div>
                <div class="definition">shelter, protection</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">surveillance</div>
                <div class="definition">close observation, especially of a suspected spy or criminal</div>
            </div>
            
            <div class="interview-dialogue">
                <p><strong>Interviewer:</strong> So, what exactly do you do?</p>
                <p><strong>Detective:</strong> I do a lot of surveillance. Basically, someone who wonders, "What is this other person up to?" If it's <span class="highlight-vocab">insurance<span class="vocab-tooltip">an agreement that provides compensation for specified loss</span></span> company (surveying someone on workers' compensation), they'll ask, "Is he back working?" Things like that.</p>
                
                <p>Another very common request is locating people, and it could be for a lot of reasons. I had a case recently, a man hadn't been in touch with his mother for 20 years and I helped him find her.</p>
                
                <div class="vocabulary-note">
                    <div class="word">insurance</div>
                    <div class="definition">an agreement that provides compensation for specified loss</div>
                </div>
            </div>
            
            <div class="interview-dialogue">
                <p><strong>Interviewer:</strong> What kind of skills make for a good PI (Private Investigator)?</p>
                <p><strong>Detective:</strong> Patience — Number one. You have to pay attention. You have to be the kind of person, if you sit in front of a door watching it for six hours, and you haven't seen your guy.</p>
                
                <p>You have to plan accordingly, and be willing to make sacrifices in order to stay out there. It's not a job for people who want to slack off.</p>
            </div>
            
            <div class="interview-dialogue">
                <p><strong>Interviewer:</strong> If you needed to locate someone, what's the ideal information you need to start?</p>
                <p><strong>Detective:</strong> Usually, this is what I tell people, "If you want to find someone, I need the name with the exact spelling, the DOB if you know it, the social security number, and a last known, official address where they've lived within the past 15 years." Because that means they'll be in our <span class="highlight-vocab">database<span class="vocab-tooltip">a structured set of data held in a computer</span></span>.</p>
                
                <div class="vocabulary-note">
                    <div class="word">database</div>
                    <div class="definition">a structured set of data held in a computer</div>
                </div>
            </div>
            
            <div class="interview-dialogue">
                <p><strong>Interviewer:</strong> Do most private investigators have a relationship with local police?</p>
                <p><strong>Detective:</strong> I would say that's kind of a myth. Most cops wouldn't even do it in the first place, because they know how serious a <span class="highlight-vocab">violation<span class="vocab-tooltip">the act of going against or refusing to obey a law</span></span> it is.</p>
                
                <div class="vocabulary-note">
                    <div class="word">violation</div>
                    <div class="definition">the act of going against or refusing to obey a law</div>
                </div>
            </div>
            
            <div class="interview-dialogue">
                <p><strong>Interviewer:</strong> Do most private eyes carry guns?</p>
                <p><strong>Detective:</strong> I don't think so. We don't kill people but help them.</p>
            </div>
            
            <div class="interview-dialogue">
                <p><strong>Interviewer:</strong> What do films and television shows get wrong about being a PI?</p>
                <p><strong>Detective:</strong> The big difference is, the things you see in films do happen to private detectives, but they're shrinking down maybe 20 years of adventure into an episode. After 30 years, I probably have one good movie worth of experiences.</p>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What is the profession of the person being interviewed?</div>
                <div class="comprehension-question">2. Complete the following sentence: As soon as the detective entered the room, he _________</div>
                <div class="comprehension-question">3. Which of the following was not a part of the job of the detective?</div>
                <div class="comprehension-question">4. According to the detective, what are the essential qualities in his profession?</div>
                <div class="comprehension-question">5. What information should the PI have in order to locate someone?</div>
                <div class="comprehension-question">6. What does the word 'aviators' mean in the context?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <p>Read the passage and answer the questions that follow.</p>
            
            <h3>Sharadindu Bandyopadhyay</h3>
            
            <p>Do you know who is Sharadindu Bandyopadhyay? He was a Bengali writer. He is remembered for his most famous creation of a fictional detective, Byomkesh Bakshi.</p>
            
            <p>He was actively involved with Bengali cinema as well as Bollywood. He wrote different forms of prose: novels, short stories, plays and screenplays. Besides, he wrote many songs and poems. However, his <span class="highlight-vocab">forte<span class="vocab-tooltip">a thing at which someone excels</span></span> was short stories and novels. He also wrote historical fiction and supernatural stories.</p>
            
            <div class="vocabulary-note">
                <div class="word">forte</div>
                <div class="definition">a thing at which someone excels</div>
            </div>
            
            <p>Sharadindu Bandyopadhyay started writing Byomkesh stories in 1932 at the age of 33. He has written 32 Byomkesh stories. He continued to write till his death in 1970. He portrayed himself as a narrator of his stories named Ajit Bandhopadhyay who is also a companion of Byomkesh Bakshi. In some stories Ajit also investigates in the absence of Byomkesh. These stories are written in traditional Bengali language and have now been translated into other languages.</p>
            
            <p>His stories are very engrossing and consist of a series of events. Byomkesh solves cases from international drug racket to household mysteries and crimes. Byomkesh identifies himself as Satyanweshi meaning 'truth seeker' rather than a detective. Where he stands out from other legendary detectives like Hercule Poirot or Sherlock Holmes is that he is more concerned with truth than with the law.</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Who among the following is not a detective?</div>
                <div class="comprehension-question">2. Sharadindu Bandyopadhyay is known for his:</div>
                <div class="comprehension-question">3. State whether true or false: Byomkesh is a 'truth seeker'.</div>
                <div class="comprehension-question">4. What is the role of Ajit in Byomkesh stories?</div>
                <div class="comprehension-question">5. Find the antonyms of the words given below from the text:</div>
            </div>
            
            <div class="fun-facts">
                <h3>📚 Fun Facts</h3>
                <p><strong>Collective Nouns:</strong></p>
                <ul>
                    <li>a bolt of lightning</li>
                    <li>a deck of cards</li>
                    <li>a swarm of bees</li>
                    <li>a school of fish</li>
                    <li>a fleet of cars</li>
                    <li>a flock of birds</li>
                    <li>an army of caterpillars</li>
                    <li>a herd of cows</li>
                </ul>
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
