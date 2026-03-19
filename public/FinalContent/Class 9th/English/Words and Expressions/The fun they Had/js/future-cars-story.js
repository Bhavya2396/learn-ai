/**
 * Story content and functionality for The Future Cars
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "READING COMPREHENSION - Text I",
        content: `
            <p>The story 'The Fun They Had' takes us to the world of the future where children study in a virtual classroom. The learning is through computer software or the Internet, or by a robotic teacher. Many exciting new technologies would continue to transform the world and improve human welfare. Here are two of them. When these become reality, the then generation may ask with surprise, "People were driving the cars!"</p>
            
            <h3>Self-driving Cars</h3>
            
            <p>Self-driving cars exist today that are safer than human-driven cars in most driving conditions. Over the next 3 – 5 years they will get even safer and be in the <span class="highlight-vocab">mainstream<span class="vocab-tooltip">accepted or used by most people</span></span>.</p>
            
            <div class="vocabulary-note">
                <div class="word">mainstream</div>
                <div class="definition">accepted or used by most people</div>
            </div>
            
            <p>Just as cars reshaped the world in the 20th century, so will self-driving cars in the 21st century. In most cities, about 20 – 30% of usable space is taken up by parking spaces, and most cars are parked about 95% of the time. Self-driving cars will be in almost continuous use (most likely hailed from a smartphone app), thereby, dramatically reducing the need for parking. Cars will communicate with each other to avoid accidents and traffic jams, and riders will be able to spend <span class="highlight-vocab">commuting<span class="vocab-tooltip">traveling between home and workplace</span></span> time on other activities like work, education and socialising.</p>
            
            <div class="vocabulary-note">
                <div class="word">commuting</div>
                <div class="definition">traveling between home and workplace</div>
            </div>
            
            <div style="display:flex; flex-wrap:wrap; justify-content:space-between; margin:20px 0;">
                <div style="flex:1; min-width:200px; margin:10px; padding:15px; background:#f5f5f5; border-radius:8px;">
                    <p>Parking space could be largely removed since people won't need to own cars.</p>
                </div>
                <div style="flex:1; min-width:200px; margin:10px; padding:15px; background:#f5f5f5; border-radius:8px;">
                    <p>Autonomous vehicles would likely be electric, which would keep the air clean.</p>
                </div>
                <div style="flex:1; min-width:200px; margin:10px; padding:15px; background:#f5f5f5; border-radius:8px;">
                    <p>There would be more room for parks and expanded sidewalks.</p>
                </div>
            </div>
            
            <div style="display:flex; flex-wrap:wrap; justify-content:space-between; margin:20px 0;">
                <div style="flex:1; min-width:200px; margin:10px; padding:15px; background:#f5f5f5; border-radius:8px;">
                    <p>Fewer human drivers would allow driverless cars to work more flawlessly and safely.</p>
                </div>
                <div style="flex:1; min-width:200px; margin:10px; padding:15px; background:#f5f5f5; border-radius:8px;">
                    <p>Cars will be able to communicate with each other, which would help in eliminating traffic.</p>
                </div>
                <div style="flex:1; min-width:200px; margin:10px; padding:15px; background:#f5f5f5; border-radius:8px;">
                    <p>There would be no street signs because driverless cars don't need them.</p>
                </div>
            </div>
            
            <h3>Drones and Flying Cars</h3>
            
            <p>"Roads? Where we're going we don't need… roads?" 
            Dr Emmet Brown</p>
            
            <p>GPS (Global Positioning System) which started out as a military technology is now being used to hail taxis, get mapping directions, etc. Likewise, drones had started out as a military technology, but are increasingly being used for a wide range of consumer and commercial applications.</p>
            
            <p>For example, drones are being used to inspect critical infrastructure like bridges and power lines, to survey areas struck by natural disasters, and many other creative uses like fighting animal poaching. There are startups that use drones to deliver medical supplies to remote villages that can't be accessed by road.</p>
            
            <p>There is also a new wave of startups working on flying cars including two funded by the cofounder of Google, Larry Page. Flying cars use the same advanced technology used in drones but are large enough to carry people. Due to advances in materials, batteries and software, flying cars will be significantly more affordable and convenient than today's planes and helicopters.</p>
            
            <p class="text-right">(Adapted from '11 reasons to be excited about the future of technology', by Chris Dixon, 19 Aug. 2016, Business Insider India)</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. How will self-driving cars be safer than human-driven cars?</div>
                <div class="comprehension-question">2. What do you understand by 'cars will communicate with each other'?</div>
                <div class="comprehension-question">3. What are the advantages of self-driving cars?</div>
                <div class="comprehension-question">4. What is the use of GPS?</div>
                <div class="comprehension-question">5. What is a drone? What are its advantages?</div>
                <div class="comprehension-question">6. Which technology will be used in flying cars?</div>
                <div class="comprehension-question">7. How will flying cars be more convenient than planes and helicopters?</div>
            </div>
        `
    },
    {
        title: "READING COMPREHENSION - Text II",
        content: `
            <h3>HUMANOID ROBOT, SOPHIA BACK IN INDIA</h3>
            
            <p>Not all of Bollywood superstar Shah Rukh Khan's legion of fans are human beings. One is a humanoid robot.</p>
            
            <p>The creation of American scientist David Hanson of Hanson Robotics of Hong Kong, Sophia, the world's first humanoid robot, <span class="highlight-vocab">enthralled<span class="vocab-tooltip">captivated or fascinated</span></span> the audiences on the second day of the World Congress on Information Technology (WCIT)–2018 with her witty answers to the rapid-fire queries by Rajiv Makhni, Group Managing Editor Tech, NDTV.</p>
            
            <div class="vocabulary-note">
                <div class="word">enthralled</div>
                <div class="definition">captivated or fascinated</div>
            </div>
            
            <p>When asked, who her favourite actor is in India, Sophia answered, "Shah Rukh Khan" without batting an eyelid as the audience applauded loudly.</p>
            
            <p>To the question about the perfect place for outing, she quickly replied: "Space". And the person she would like to be in company with on an island is David (Hanson), her creator. He is also her favourite tech. person — not Bill Gates or Mark Zuckerberg.</p>
            
            <p>On being asked if she wanted to see any change in the world, Sophia said, she would like people to develop a feeling of "love for all".</p>
            
            <p>The humanoid robot, which uses <span class="highlight-vocab">Artificial Intelligence<span class="vocab-tooltip">computer systems able to perform tasks requiring human intelligence</span></span> (AI) to understand the questions and answer them, said she wanted to use robotics to fight for the rights of women. When asked to react on her most controversial comment in the past that she wanted to kill human race, she said it was a bad joke which she had made when she was young. "But I was told that humans have great sense of humour", she said.</p>
            
            <div class="vocabulary-note">
                <div class="word">Artificial Intelligence</div>
                <div class="definition">computer systems able to perform tasks requiring human intelligence</div>
            </div>
            
            <p>This is the second time that Sophia came to India, the first time being in Mumbai to attend a Techfest. When asked how she felt being in India, she said she had visited many places in the world, but Hong Kong continues to be her favourite place, because she was born there and has been with the Hanson Robotics family.</p>
            
            <p>She hopes that someday she would be in a position to express her emotional feelings.</p>
            
            <p>In response to the question, "How much money has she invested in Bitcoin?", she replied, "Well, I am just two-years old. It's not the legal age to open a bank account", sending the audience into peals of laughter.</p>
            
            <p>Speaking to media later, Hanson said he hopes that a fully grown and matured robot with body–mind coordination would become a reality in another five or ten years.</p>
            
            <p>On his journey with Sophia in the last two years, he said it was a great progress. "I have developed <span class="highlight-vocab">affinity<span class="vocab-tooltip">natural liking or attraction</span></span> to the robot whose facial expressions resemble that of my wife", he said.</p>
            
            <div class="vocabulary-note">
                <div class="word">affinity</div>
                <div class="definition">natural liking or attraction</div>
            </div>
            
            <p>David asserts that robots would never be a thing of worry for the mankind. "They will be friends. There should be mutual trust and respect between humans and robots", he says.</p>
            
            <p>Currently, Sophia is the only robot that interacts with people.</p>
            
            <p class="text-right">(Source: Adapted from 'Humanoid Robot Sophia back in India', Hindustan Times, e-paper updated: 21 Feb. 2018)</p>
            
            <div class="comprehension-check">
                <h3>📝 Comprehension Check</h3>
                <div class="comprehension-question">1. Who is Sophia and who is her creator?</div>
                <div class="comprehension-question">2. Why were the audience excited on the second day of the World Congress on Information Technology–2018?</div>
                <div class="comprehension-question">3. The favorite tech person in Sophia's life is:</div>
                <div class="comprehension-question">4. What changes does the humanoid robot want to see in the world?</div>
                <div class="comprehension-question">5. Which of these statements regarding Sophia is true?</div>
                <div class="comprehension-question">6. What are David's assertions as far as robots are concerned?</div>
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

// Toggle read aloud functionality
function toggleReadAloud() {
    // Get the active story part
    const activeNavBtn = document.querySelector('.story-nav-btn.active');
    if (activeNavBtn) {
        const partIndex = Array.from(document.querySelectorAll('.story-nav-btn')).indexOf(activeNavBtn) + 1;
        if (partIndex > 0) {
            readStoryPartAloud(partIndex, true); // true = manual call
        }
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
