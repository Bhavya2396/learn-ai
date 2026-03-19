/**
 * Story content and functionality for Geet-Ageet
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>रामधारी सिंह दिनकर का जन्म बिहार के मुंगेर जिले के सिमरिया गाँव में 30 सितंबर 1908 को हुआ। वे सन् 1952 में राज्यसभा के सदस्य मनोनीत किए गए। भारत सरकार ने इन्हें 'पद्मभूषण' अलंकरण से भी अलंकृत किया।</p>
            
            <p>दिनकर जी को 'संस्कृति के चार अध्याय' पुस्तक पर साहित्य अकादमी पुरस्कार मिला। अपनी काव्यकृति 'उर्वशी' के लिए इन्हें ज्ञानपीठ पुरस्कार से सम्मानित किया गया। दिनकर की प्रमुख कृतियाँ हैं: हुँकार, कुरुक्षेत्र, रश्मिरथी, परशुराम की प्रतीक्षा, उर्वशी और संस्कृति के चार अध्याय।</p>
            
            <div class="vocabulary-note">
                <div class="word">पद्मभूषण</div>
                <div class="definition">भारत का तीसरा सर्वोच्च नागरिक सम्मान</div>
            </div>
            
            <p>दिनकर ओज के कवि माने जाते हैं। इनकी भाषा अत्यंत प्रवाहपूर्ण, ओजस्वी और सरल है। दिनकर की सबसे बड़ी विशेषता है अपने देश और युग के सत्य के प्रति सजगता। दिनकर में विचार और संवेदना का सुंदर समन्वय दिखाई देता है।</p>
            
            <div class="vocabulary-note">
                <div class="word">ओज</div>
                <div class="definition">तेज, प्रभावशाली शक्ति</div>
            </div>
            
            <p>इनकी कुछ कृतियों में प्रेम और सौंदर्य का भी चित्रण है। दिनकर ने अपनी कविताओं में प्रकृति के सौंदर्य, मानवीय भावनाओं और सामाजिक चेतना को बखूबी व्यक्त किया है।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. दिनकर का जन्म कहाँ और कब हुआ था?</div>
                <div class="comprehension-question">2. दिनकर को कौन-कौन से पुरस्कार मिले?</div>
                <div class="comprehension-question">3. दिनकर की भाषा की क्या विशेषताएँ हैं?</div>
                <div class="comprehension-question">4. दिनकर की सबसे बड़ी विशेषता क्या है?</div>
            </div>
        `
    },
    {
        title: "कविता",
        content: `
            <div class="poem-text">
                गीत-अगीत<br><br>
                
                गीत, अगीत, कौन सुंदर है?<br><br>
                
                (1)<br>
                गाकर गीत विरह के<br>
                तटिनी वेगवती बहती जाती<br>
                दिल हलका कर लेने को<br>
                उपलों से कुछ कहती जाती है ।<br>
                तट पर एक गुलाब सोचता,<br>
                "देते स्वर यदि मुझे विधाता,<br>
                अपने पतझर के सपनों का<br>
                मैं भी जग को गीत सुनाता ।"<br>
                गा-गाकर बह रही निर्झरी,<br>
                पाटल मूक खड़ा तट पर है ।<br>
                गीत, अगीत, कौन सुंदर है?<br><br>
                
                (2)<br>
                बैठा शुक उस घनी डाल पर<br>
                जो खोंते पर छाया देती ।<br>
                पंख फुला नीचे खोंते में<br>
                शुकी बैठ अंडे है सेती ।<br>
                गाता शुक जब किरण वसंती<br>
                छूती अंग पर्ण से छनकर ।<br>
                किंतु, शुकी के गीत उमड़कर<br>
                रह जाते सनेह में सनकर ।<br>
                गूँज रहा शुक का स्वर वन में,<br>
                फूला मग्न शुकी का पर है ।<br>
                गीत, अगीत, कौन सुंदर है?<br><br>
                
                (3)<br>
                बड़े साँझ आल्हा गाता है,<br>
                पहला स्वर उसकी राधा को<br>
                घर से यहाँ खींच लाता है ।<br>
                चोरी-चोरी खड़ी नीम की<br>
                छाया में छिपकर सुनती है,<br>
                'हुई न क्यों मैं कड़ी गीत की<br>
                बिधना', यों मन में गुनती है ।<br>
                वह गाता, पर किसी वेग से<br>
                फूल रहा इसका अंतर है ।<br>
                गीत, अगीत, कौन सुंदर है?<br>
            </div>
            
            <h3 class="vocabulary-heading">शब्दार्थ और टिप्पणियाँ</h3>
            
            <div class="vocabulary-note">
                <div class="word">तटिनी</div>
                <div class="definition">नदी, तटों के बीच बहती हुई</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">वेगवती</div>
                <div class="definition">तेज गति से</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">उपलों</div>
                <div class="definition">किनारों से</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">विधाता</div>
                <div class="definition">ईश्वर</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">निर्झरी</div>
                <div class="definition">झरना, नदी</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">पाटल</div>
                <div class="definition">गुलाब</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">शुक</div>
                <div class="definition">तोता</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">खोंते</div>
                <div class="definition">घोंसला</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">गुनती है</div>
                <div class="definition">विचार करती है</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">पर</div>
                <div class="definition">गति</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. नदी का किनारों से कुछ कहते हुए बह जाने पर गुलाब क्या सोच रहा है?</div>
                <div class="comprehension-question">2. जब शुक गाता है, तो शुकी के हृदय पर क्या प्रभाव पड़ता है?</div>
                <div class="comprehension-question">3. प्रेमी जब गीत गाता है, तब प्रेमिका की क्या इच्छा होती है?</div>
                <div class="comprehension-question">4. कविता का केंद्रीय भाव क्या है?</div>
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
        readAloudBtn.innerHTML = '🔊 पढ़कर सुनाएँ';
        readAloudBtn.setAttribute('aria-label', `भाग ${partNumber} पढ़कर सुनाएँ`);
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
    
    // Get poem text if it exists
    const poemText = tempDiv.querySelector('.poem-text');
    
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
    
    // Extract text content to read
    let storyText = '';
    
    // Add title
    storyText += `${part.title}. `;
    
    // Add paragraph content
    if (validParagraphs.length > 0) {
        storyText += validParagraphs
            .map(p => {
                let text = p.textContent.trim();
                // Remove vocabulary tooltip content that might be included
                text = text.replace(/\s+/g, ' '); // Normalize whitespace
                return text;
            })
            .filter(text => text.length > 0) // Remove empty strings
            .join(' ');
    }
    
    // Add poem content if it exists
    if (poemText) {
        if (storyText.length > 0) {
            storyText += " ";
        }
        storyText += poemText.textContent.replace(/\s+/g, ' ').trim();
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
                readingIndicator.innerHTML = '<div class="reading-spinner"></div> पढ़ा जा रहा है...';
                
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
                stopButton.innerHTML = '⏹️ पढ़ना रोकें';
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
            const elementsToHighlight = [...validParagraphs];
            if (poemText) {
                elementsToHighlight.push(poemText);
            }
            highlightParagraphsSequentially(elementsToHighlight);
            
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
    const vocabTerms = document.querySelectorAll('.highlight-vocab');
    
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
