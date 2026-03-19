/**
 * Story content and functionality for Agni Path
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Poem content data
const poemContent = {
    title: "अग्नि पथ",
    author: "हरिवंशराय बच्चन",
    content: `
        <div class="poem-text">
            अग्नि पथ! अग्नि पथ! अग्नि पथ!<br>
            वृक्ष हों भले खड़े,<br>
            हों घने, हों बड़े,<br>
            एक पत्र-छाँह भी माँग मत, माँग मत, माँग मत!<br>
            तू न थमेगा कभी! <br>
            अग्नि पथ! अग्नि पथ! अग्नि पथ!<br>
            तू न थकेगा कभी!<br>
            तू न मुड़ेगा कभी!<br>
            शपथ, कर शपथ, कर शपथ!<br>
            अग्नि पथ! अग्नि पथ! अग्नि पथ!<br>
            यह महान<br>
            दृश्य है-<br>
            चल रहा मनुष्य है<br>
            अश्रु-स्वेद-रक्त से लथपथ, लथपथ, लथपथ!<br>
            अग्नि पथ! अग्नि पथ! अग्नि पथ!
        </div>
        
        <div class="vocabulary-section">
            <h3 class="vocabulary-heading">शब्दार्थ</h3>
        </div>
        
        <div class="vocabulary-note">
            <div class="word">अग्नि पथ</div>
            <div class="definition">कठिनाइयों से भरा हुआ मार्ग, आगयुक्त मार्ग</div>
        </div>
        
        <div class="vocabulary-note">
            <div class="word">पत्र</div>
            <div class="definition">पत्ता</div>
        </div>
        
        <div class="vocabulary-note">
            <div class="word">शपथ</div>
            <div class="definition">कसम, सौगंध</div>
        </div>
        
        <div class="vocabulary-note">
            <div class="word">अश्रु</div>
            <div class="definition">आँसू</div>
        </div>
        
        <div class="vocabulary-note">
            <div class="word">स्वेद</div>
            <div class="definition">पसीना</div>
        </div>
        
        <div class="vocabulary-note">
            <div class="word">रक्त</div>
            <div class="definition">खून, शोणित</div>
        </div>
        
        <div class="vocabulary-note">
            <div class="word">लथपथ</div>
            <div class="definition">सना हुआ</div>
        </div>
        
        <div class="comprehension-check">
            <h3>📝 बोध प्रश्न</h3>
            <div class="comprehension-question">1. कवि ने 'अग्नि पथ' किसके प्रतीक स्वरूप प्रयोग किया है?</div>
            <div class="comprehension-question">2. 'माँग मत', 'कर शपथ', 'लथपथ' इन शब्दों का बार-बार प्रयोग कर कवि क्या कहना चाहता है?</div>
            <div class="comprehension-question">3. 'एक पत्र-छाँह भी माँग मत' इस पंक्ति का आशय स्पष्ट कीजिए।</div>
            <div class="comprehension-question">4. 'चल रहा मनुष्य है अश्रु-स्वेद-रक्त से लथपथ' इस पंक्ति का भाव स्पष्ट कीजिए।</div>
        </div>
    `
};

// Show the poem content
function showPoemPart(partNumber) {
    console.log(`Loading poem content`);
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) {
        console.error('Story content container not found');
        return;
    }
    
    // Create a container for the poem if it doesn't exist
    let poemContainer = document.getElementById('poemContainer');
    if (!poemContainer) {
        poemContainer = document.createElement('div');
        poemContainer.id = 'poemContainer';
        poemContainer.className = 'story-part active';
        storyContent.appendChild(poemContainer);
    }
    
    // Load content if not already loaded
    if (!poemContainer.innerHTML.trim()) {
        poemContainer.innerHTML = `
            <h3 class="story-part-title">${poemContent.title}</h3>
            <p class="poem-author">- ${poemContent.author}</p>
            ${poemContent.content}
        `;
        
        // Add event listeners to vocabulary terms
        poemContainer.querySelectorAll('.vocabulary-note').forEach(note => {
            const word = note.querySelector('.word').textContent;
            const definition = note.querySelector('.definition').textContent;
            
            note.addEventListener('click', function() {
                if (window.narrator) {
                    window.narrator.speak(`${word}: ${definition}`);
                }
            });
        });
        
        // Add read aloud button for the poem
        const readAloudBtn = document.createElement('button');
        readAloudBtn.className = 'interactive-btn read-part-btn';
        readAloudBtn.innerHTML = '🔊 पढ़कर सुनाएँ';
        readAloudBtn.setAttribute('aria-label', 'कविता पढ़कर सुनाएँ');
        readAloudBtn.onclick = function() { readPoemAloud(true); }; // true = manual call
        
        // Add button to the end of the poem
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.appendChild(readAloudBtn);
        poemContainer.appendChild(buttonContainer);
    }
    
    // Scroll to top of poem
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
            // Automatically start reading the poem when switching to poem module
            console.log(`Auto-starting narration for poem`);
            readPoemAloud(false); // false = automatic call
        }, 100);
    }
}

// Read the poem aloud
function readPoemAloud(isManualCall = true) {
    console.log(`Reading poem aloud (manual: ${isManualCall})`);
    
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
    
    // Extract plain text from the poem
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = poemContent.content;
    
    // Get poem text
    const poemText = tempDiv.querySelector('.poem-text');
    
    // Extract text content to read
    let poemTextToRead = '';
    
    // Add title
    poemTextToRead += `${poemContent.title}। `;
    poemTextToRead += `${poemContent.author} द्वारा रचित। `;
    
    // Add poem content
    if (poemText) {
        poemTextToRead += poemText.textContent.replace(/\s+/g, ' ').trim();
    }
    
    console.log(`Prepared text for narration (${poemTextToRead.length} characters)`);
    
    // Read the text aloud
    if (window.narrator && window.narrator.enabled) {
        try {
            // Show reading indicator
            const poemContainer = document.getElementById('poemContainer');
            if (poemContainer) {
                // Remove any existing reading indicators
                const existingIndicators = poemContainer.querySelectorAll('.reading-indicator');
                existingIndicators.forEach(indicator => indicator.remove());
                
                // Create new reading indicator
                const readingIndicator = document.createElement('div');
                readingIndicator.className = 'reading-indicator';
                readingIndicator.id = 'reading-indicator-poem';
                readingIndicator.innerHTML = '<div class="reading-spinner"></div> पढ़ा जा रहा है...';
                
                // Find button container or create one if it doesn't exist
                let buttonContainer = poemContainer.querySelector('.button-container');
                if (!buttonContainer) {
                    buttonContainer = document.createElement('div');
                    buttonContainer.className = 'button-container';
                    poemContainer.appendChild(buttonContainer);
                }
                
                buttonContainer.appendChild(readingIndicator);
                
                // Add stop button
                const stopButton = document.createElement('button');
                stopButton.className = 'interactive-btn stop-narration-btn';
                stopButton.innerHTML = '⏹️ पढ़ना रोकें';
                stopButton.onclick = stopNarration;
                readingIndicator.appendChild(stopButton);
                
                // Remove indicator when narration ends or after timeout
                window.readingTimeout = setTimeout(() => {
                    if (readingIndicator.parentNode) {
                        readingIndicator.classList.add('fade-out');
                        setTimeout(() => readingIndicator.remove(), 500);
                    }
                }, Math.min(poemTextToRead.length * 100, 60000)); // Dynamic timeout based on text length, max 1 minute
            }
            
            // Register narration end event
            if (window.narrator.onEndCallback) {
                window.narrator.onEndCallback = null;
            }
            
            window.narrator.onEndCallback = function() {
                const indicator = document.getElementById('reading-indicator-poem');
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
            window.narrator.speak(poemTextToRead);
            console.log('Narration started');
            
            // Highlight the poem as it is being read
            if (poemText) {
                highlightParagraphsSequentially([poemText]);
            }
            
        } catch (error) {
            console.error('Error starting narration:', error);
            alert('क्षमा करें, वाचन शुरू करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
        }
    } else {
        console.error('Narrator not available');
        alert('आपके ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है।');
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
    const vocabTerms = document.querySelectorAll('.vocabulary-note');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'शब्दार्थ हाइलाइट किए गए हैं। अर्थ सुनने के लिए हाइलाइट किए गए शब्दों पर क्लिक करें।';
    
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
        'प्रिंट मोड सक्रिय। प्रिंट करने के लिए अपने ब्राउज़र का प्रिंट फ़ंक्शन उपयोग करें।' : 
        'प्रिंट मोड निष्क्रिय।';
    
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
