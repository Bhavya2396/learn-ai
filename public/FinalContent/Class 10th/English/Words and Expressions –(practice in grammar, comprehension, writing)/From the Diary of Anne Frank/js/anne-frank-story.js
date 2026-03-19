/**
 * Story content and functionality for From the Diary of Anne Frank
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <p>The following excerpt is from the diary of Lena Mukhina, a teenage girl who had undergone the atrocities of Germans when they fortified the city of Leningrad. The siege of Leningrad is an important landmark in the history of Russia. The siege of Leningrad lasted from September 1941 to 1944. The city was cut off from the rest of Russia. The Germans continuously <span class="highlight-vocab">bombarded<span class="vocab-tooltip">attacked repeatedly</span></span> the city which resulted in death, destruction, and starvation of the people. However, the resolute Russians were warned in the beginning that the enemy was at the gate and it was a question of life and death. They fought bravely and failed the Germans in their evil designs.</p>
            
            <div class="vocabulary-note">
                <div class="word">bombarded</div>
                <div class="definition">attacked repeatedly</div>
            </div>
            
            <p>Read the excerpt and answer the questions that follow.</p>
            
            <h3>Foreword from The Diary of Lena Mukhina</h3>
            
            <p>No one could possibly have known that the city would remain in the grip of <span class="highlight-vocab">siege<span class="vocab-tooltip">military blockade of a city</span></span> for 872 days and nights. But Leningrad's citizens had begun to feel the breath of war as early as September. Daily air raids and artillery bombardment of residential neighbourhoods drove the city's inhabitants into bomb shelters, several times a day, and for hours at a time. People's initial curiosity in the <span class="highlight-vocab">aftermath<span class="vocab-tooltip">the period following an unpleasant event</span></span> of the first bomb attacks soon gave way to fear and then, in conditions of <span class="highlight-vocab">appalling<span class="vocab-tooltip">shocking, horrifying</span></span> hunger and cold, to <span class="highlight-vocab">apathy<span class="vocab-tooltip">lack of interest or concern</span></span>. Leningraders welcomed <span class="highlight-vocab">inclement<span class="vocab-tooltip">unpleasant, stormy, harsh</span></span> weather for the reduced visibility it brought. They came to dread sunny days and moonlit nights, when the Germans would be sure to bomb their city. Cloud cover, however, offered no protection from artillery fire: in just over six months from the start of the siege there were only thirty-two days when shells did not explode on the city's streets.</p>
            
            <div class="vocabulary-note">
                <div class="word">siege</div>
                <div class="definition">military blockade of a city</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">aftermath</div>
                <div class="definition">the period following an unpleasant event</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">appalling</div>
                <div class="definition">shocking, horrifying</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">apathy</div>
                <div class="definition">lack of interest or concern</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">inclement</div>
                <div class="definition">unpleasant, stormy, harsh</div>
            </div>
            
            <p>Hunger soon set in. Between September and November 1941 the bread rations that had been announced in July were reduced five times, reaching their lowest point on 20 November — 125 '<span class="highlight-vocab">blockade grams<span class="vocab-tooltip">minimal food rations during the siege</span></span>' for children, dependents and white-collar workers and 250g for manual workers, technicians and engineers. Rations of meat, butter, sugar and other food items were <span class="highlight-vocab">severely<span class="vocab-tooltip">extremely, very badly</span></span> reduced. The summer months and the beginning of autumn, when it was still possible to buy food without ration cards in ordinary shops and canteens were no more than a distant memory.</p>
            
            <div class="vocabulary-note">
                <div class="word">blockade grams</div>
                <div class="definition">minimal food rations during the siege</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">severely</div>
                <div class="definition">extremely, very badly</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Infer the meaning of "to feel the breath of war".</div>
                <div class="comprehension-question">2. What were the fears in the mind of the people?</div>
                <div class="comprehension-question">3. Why did the people under siege welcome bad weather conditions?</div>
                <div class="comprehension-question">4. What were "blockade grams"?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <p>There are many ways of recording the events, news, and personal experiences. Diary writing, logbook, daybook, journal, etc. are a few to name. The journal writing is about writing the everyday record of an event or writing about an event, activity or experience, etc.</p>
            
            <p>The following is an excerpt from the beginning of A Journal of the Plague Year by Daniel Defoe.</p>
            
            <h3>A Journal of the Plague Year</h3>
            
            <p>It was about the beginning of September, 1664, that I, among the rest of my neighbours, heard in ordinary <span class="highlight-vocab">discourse<span class="vocab-tooltip">conversation, discussion</span></span> that the plague was returned again in Holland; for it had been very violent there, and particularly at Amsterdam and Rotterdam, in the year 1663, whither, they say, it was brought, some said from Italy, others from the Levant, among some goods which were brought home by their Turkey fleet; others said it was brought from Candia; others from Cyprus. It mattered not from whence it came; but all agreed it was come into Holland again.</p>
            
            <div class="vocabulary-note">
                <div class="word">discourse</div>
                <div class="definition">conversation, discussion</div>
            </div>
            
            <p>We had no such thing as printed newspapers in those days to spread rumours and reports of things, and to improve them by the <span class="highlight-vocab">invention<span class="vocab-tooltip">creative imagination</span></span> of men, as I have lived to see practiced since. But such things as these were gathered from the letters of merchants and others who corresponded abroad, and from them were handed about by word of mouth only; so that things did not spread instantly over the whole nation, as they do now.</p>
            
            <div class="vocabulary-note">
                <div class="word">invention</div>
                <div class="definition">creative imagination</div>
            </div>
            
            <p>But it seems that the Government had a true account of it, and several councils were held about ways to prevent its coming over; but all was kept very private. Hence, it was that this rumour died off again, and people began to forget it as a thing we were very little concerned in, and that we hoped was not true; till the latter end of November or the beginning of December 1664 when two men, said to be Frenchmen, died of the plague in Long Acre, or rather at the upper end of Drury Lane. The family they were in endeavoured to conceal it as much as possible, but as it had gotten some <span class="highlight-vocab">vent<span class="vocab-tooltip">outlet, expression</span></span> in the discourse of the neighbourhood, the Secretaries of State got knowledge of it; and concerning themselves to inquire about it, in order to be certain of the truth, two physicians and a surgeon were ordered to go to the house and make <span class="highlight-vocab">inspection<span class="vocab-tooltip">examination, investigation</span></span>. This they did; and finding evident <span class="highlight-vocab">tokens<span class="vocab-tooltip">signs, indications</span></span> of the sickness upon both the bodies that were dead, they gave their opinions publicly that they died of the plague. Whereupon, it was given in to the parish clerk, and he also returned them to the Hall; and it was printed in the weekly bill of mortality in the usual manner, thus — Plague 2. Parishes infected 1.</p>
            
            <div class="vocabulary-note">
                <div class="word">vent</div>
                <div class="definition">outlet, expression</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">inspection</div>
                <div class="definition">examination, investigation</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">tokens</div>
                <div class="definition">signs, indications</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What is being talked about in the first paragraph?</div>
                <div class="comprehension-question">2. How was news about important events circulated during those days?</div>
                <div class="comprehension-question">3. Why did the rumour about the plague die off?</div>
                <div class="comprehension-question">4. What does "the weekly bill of mortality" mean?</div>
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
