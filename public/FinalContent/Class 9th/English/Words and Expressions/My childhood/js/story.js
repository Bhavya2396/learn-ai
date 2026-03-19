/**
 * Story content and functionality for Presidents of India
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <p>Read the following passages and answer the questions that follow.</p>
            
            <h3>Text I</h3>
            
            <p>I must have been about seven when my father left Porbandar for Rajkot to become a member of the Rajasthanik Court. There I was put into a primary school, and I can well recollect those days, including the names and other particulars of the teachers who taught me. As at Porbandar, so here, there is hardly anything to note about my studies. I could only have been a <span class="highlight-vocab">mediocre<span class="vocab-tooltip">average or ordinary quality</span></span> student. From this school I went to the suburban school and thence to high school, having already reached my twelfth year. I do not remember having ever told a lie, during this short period, either to my teachers or to my school-mates. However, I used to be very shy and avoided all company. My books and my lessons were my sole companions. To be at school at the stroke of the hour and to run back home as soon as the school closed — that was my daily habit. There is an incident which occurred at the examination during my first year at high school and which is worth recording. Mr Giles, the educational Inspector, had come on a visit of inspection. He had set us five words to <span class="highlight-vocab">prompt<span class="vocab-tooltip">cause someone to take a course of action</span></span> as a spelling exercise. One of the words was 'Kettle'.</p>
            
            <div class="vocabulary-note">
                <div class="word">mediocre</div>
                <div class="definition">average or ordinary quality</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">prompt</div>
                <div class="definition">cause someone to take a course of action</div>
            </div>
            
            <p>I had misspelt it. The teacher tried to prompt me with the point of his boot, but I would not be prompted. It was beyond me to see that he wanted me to copy the spelling from my neighbour's slate, for I had thought that the teacher was there to supervise us against copying. The result was that all the boys, except myself, were found to have spelt every word correctly. I could never learn the art of 'copying'. Yet the incident did not in the least diminish my respect for my teacher. I was by nature, blind to the faults of elders. Later I came to know of many other failings of this teacher, but my regard for him remained the same. Two other incidents belonging to the same period have always clung to my memory. As a rule I had distaste for any reading beyond my school books. The daily lessons had to be done, because I disliked being taken to task by my teacher as much as I disliked <span class="highlight-vocab">deceiving<span class="vocab-tooltip">give a mistaken impression</span></span> him. Therefore I would do the lessons, but often without my mind in them. Thus, when even the lessons could not be done properly, there was of course no question of any extra reading. But somehow my eyes fell on a book purchased by my father. It was Shravana Pitribhakti Nataka. I read it with intense interest. One of the pictures I was shown was of Shravana carrying, by means of slings fitted for his shoulders, his blind parents on a pilgrimage. The book and the picture left an <span class="highlight-vocab">indelible<span class="vocab-tooltip">not able to be forgotten</span></span> impression on my mind.</p>
            
            <div class="vocabulary-note">
                <div class="word">deceiving</div>
                <div class="definition">give a mistaken impression</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">indelible</div>
                <div class="definition">not able to be forgotten</div>
            </div>
            
            <p>(An excerpt from The Story of My Experiments with Truth, Mohandas Karamchand Gandhi)</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What type of student was Gandhi?</div>
                <div class="comprehension-question">2. What was Gandhi's personality like as a student?</div>
                <div class="comprehension-question">3. What incident took place during the spelling test?</div>
                <div class="comprehension-question">4. What book made an indelible impression on Gandhi's mind?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <h3>Text II</h3>
            
            <p>Indra Krishnamurthy Nooyi is an Indian American business executive. She is the Chairman and Chief Executive Officer of Pepsico. She is one among the world's most powerful women. She delivered the following speech at the Rashtrapati Bhawan on 14 December 2013. She was named one of the 25 Greatest Living Legends by NDTV, and was awarded by the then President of India, Pranab Mukherjee at the Rashtrapati Bhawan.</p>
            
            <p>Read the speech delivered by Indra Nooyi and answer the questions that follow.</p>
            
            <p>Mr President and NDTV, thank you very much for this incredible honour.</p>
            
            <p>Malcom Gladwell in his book, Outliers says: "Who you are cannot be separated from where you came from."</p>
            
            <p>I left India 35 years ago, went to the USA and had tremendous success in the <span class="highlight-vocab">meritocracy<span class="vocab-tooltip">a ruling or influential class of educated or able people</span></span>. But none of that could have happened if I would not have had wonderful upbringing very much here in India. So I have a lot to thank India for. Now my three lessons I would like to share with you.</p>
            
            <div class="vocabulary-note">
                <div class="word">meritocracy</div>
                <div class="definition">a ruling or influential class of educated or able people</div>
            </div>
            
            <p>First, please be a lifelong student. You know when we were kids, we used to ask questions like "Why is the sky blue?", "Why the birds flying so high?" But for some reasons, as we get older, that curiosity goes away. And if we are happy with the knowledge we have, then we are actually going to <span class="highlight-vocab">atrophy<span class="vocab-tooltip">gradual decline in effectiveness or vigour due to underuse or neglect</span></span>. So, please remain a lifelong student, don't lose that curiosity.</p>
            
            <div class="vocabulary-note">
                <div class="word">atrophy</div>
                <div class="definition">gradual decline in effectiveness or vigour due to underuse or neglect</div>
            </div>
            
            <p>Second, whatever you do, throw yourself into it, throw your head, heart and hands into it. I look at my job not as a job, I look at it as a Calling, as a Passion and I don't care about the hours, about the hardships, because to me everything is a joy. So whatever you do, please look upon it as a Calling, a Passion, not as a job, not as something temporary.</p>
            
            <p>The third and the most important one, please help others rise. Greatness comes not from a position, but from helping build a future. All of us in position of power have an obligation to pull others up. You know, as I stand here today, I look at my responsibility not as accepting an honour, I look upon it as accepting a challenge and a responsibility, an obligation to actually make it possible for people who are younger to come up and achieve levels of greatness, so they too can be on the stage sometime in the future.</p>
            
            <p>(Source: Speech delivered by Indra Nooyi at the Rashtrapati Bhawan on 14 December 2013)</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. What has Malcom Gladwell said in his book that Indra Nooyi refers to?</div>
                <div class="comprehension-question">2. What according to Indra Nooyi helped her achieve great success?</div>
                <div class="comprehension-question">3. What is the first lesson that Indra Nooyi talks about in her speech?</div>
                <div class="comprehension-question">4. What quality should we maintain to be a lifelong student?</div>
                <div class="comprehension-question">5. How does she view her job?</div>
                <div class="comprehension-question">6. What obligation does she talk about in her speech?</div>
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

// Function to toggle reading mode
function toggleReadAloud() {
    // This function will be called when the Read Aloud button is clicked
    readStoryPartAloud(document.querySelector('.story-nav-btn.active').textContent.includes('Text I') ? 1 : 2, true);
}
