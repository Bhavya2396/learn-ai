/**
 * Story content and functionality for Kar Chale Hum Fida
 */

// Narration state is now managed in main.js via globalNarrationState

// Story parts data
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>कैफ़ी आज़मी का जन्म 19 जनवरी 1919 को उत्तर प्रदेश के आज़मगढ़ ज़िले में मजमां गाँव में हुआ था। अदब की दुनिया में वे आगे चलकर कैफ़ी आज़मी के नाम से मशहूर हुए। कैफ़ी आज़मी की गिनती <span class="highlight-vocab">प्रगतिशील<span class="vocab-tooltip">आधुनिक विचारधारा वाले</span></span> उर्दू कवियों की पहली पंक्ति में की जाती है।</p>
            
            <p>उनकी कविताओं में एक ओर <span class="highlight-vocab">सामाजिक<span class="vocab-tooltip">समाज से संबंधित</span></span> और राजनैतिक जागरूकता का समावेश है, तो दूसरी ओर हृदय की कोमलता भी है।</p>
            
            <p>युवावस्था में मुशायरों में वाह-वाही पाने वाले कैफ़ी आज़मी ने फ़िल्मों के लिए सैकड़ों बेहतरीन गीत भी लिखे हैं। 10 मई 2002 को उनका निधन हुआ। उनके पाँच कविता संग्रह प्रकाशित हुए हैं: <span class="highlight-vocab">झंकार<span class="vocab-tooltip">एक प्रकार की आवाज़</span></span>, आखिर-ए-शब, आवारा सज़दे, सरमाया और फ़िल्मी गीतों का संग्रह मेरी आवाज़ सुनो।</p>
            
            <p>उन्हें अपने रचनाकर्म के लिए साहित्य अकादेमी पुरस्कार सहित कई पुरस्कारों से सम्मानित किया गया। कैफ़ी कलाकारों के परिवार से थे। उनके तीनों बड़े भाई भी शायर थे। उनकी पत्नी शौकत आज़मी और बेटी शबाना आज़मी मशहूर <span class="highlight-vocab">अभिनेत्रियाँ<span class="vocab-tooltip">महिला अभिनेता</span></span> हैं।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. कैफ़ी आज़मी का जन्म कब और कहाँ हुआ था?</div>
                <div class="comprehension-question">2. कैफ़ी आज़मी की कविताओं की मुख्य विशेषताएँ क्या हैं?</div>
                <div class="comprehension-question">3. कैफ़ी आज़मी के प्रकाशित कविता संग्रहों के नाम क्या हैं?</div>
                <div class="comprehension-question">4. कैफ़ी आज़मी के परिवार के बारे में क्या जानकारी दी गई है?</div>
            </div>
        `
    },
    {
        title: "कविता",
        content: `
            <div class="poem-text">
                कर चले हम फ़िदा जानो-तन साथियो<br>
                अब तुम्हारे हवाले वतन साथियो<br><br>
                
                साँस थमती गई, नब्ज़ जमती गई<br>
                फिर भी बढ़ते कदम को न रुकने दिया<br>
                कट गए सर हमारे तो कुछ ग़म नहीं<br>
                सर हिमालय का हमने न झुकने दिया<br>
                मरते-मरते रहा बाँकपन साथियो<br>
                अब तुम्हारे हवाले वतन साथियो<br><br>
                
                ज़िंदा रहने के मौसम बहुत हैं<br>
                मगर जान देने की रुत रोज़ आती नहीं<br>
                हुस्न और इश्क़ दोनों को रुस्वा करे<br>
                वो जवानी जो ख़ूँ में नहाती नहीं<br>
                आज धरती बनी है दुलहन साथियो<br>
                अब तुम्हारे हवाले वतन साथियो<br><br>
                
                राह क़ुर्बानियों की न वीरान हो<br>
                तुम सजाते ही रहना नए क़ाफ़िले<br>
                फ़तह का जश्न इस जश्न के बाद है<br>
                ज़िंदगी मौत से मिल रही है गले<br>
                बाँध लो अपने सर से कफ़न साथियो<br>
                अब तुम्हारे हवाले वतन साथियो<br><br>
                
                खींच दो अपने ख़ूँ से ज़मीं पर लकीर<br>
                इस तरफ़ आने पाए न रावन कोई<br>
                तोड़ दो हाथ अगर हाथ उठने लगे<br>
                छू न पाए सीता का दामन कोई<br>
                राम भी तुम, तुम्हीं लक्ष्मण साथियो<br>
                अब तुम्हारे हवाले वतन साथियो
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. इस कविता में सैनिक किसे हवाले करके जा रहे हैं?</div>
                <div class="comprehension-question">2. 'सर हिमालय का हमने न झुकने दिया' पंक्ति में हिमालय किस बात का प्रतीक है?</div>
                <div class="comprehension-question">3. कवि ने इस कविता में किस क़ाफ़िले को आगे बढ़ाते रहने की बात कही है?</div>
                <div class="comprehension-question">4. 'सर पर कफ़न बाँधना' किस ओर संकेत करता है?</div>
            </div>
        `
    },
    {
        title: "शब्दार्थ",
        content: `
            <div class="vocabulary-section">
                <h3>कविता के महत्वपूर्ण शब्द और उनके अर्थ</h3>
                
                <div class="vocabulary-note">
                    <div class="word">फ़िदा</div>
                    <div class="definition">न्योछावर</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">हवाले</div>
                    <div class="definition">सुपुर्द</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">नब्ज़</div>
                    <div class="definition">नाड़ी</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">बाँकपन</div>
                    <div class="definition">निडरता, बहादुरी</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">रुत</div>
                    <div class="definition">मौसम</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">हुस्न</div>
                    <div class="definition">सुंदरता</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">इश्क़</div>
                    <div class="definition">प्रेम</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">रुस्वा</div>
                    <div class="definition">बदनाम</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">ख़ूँ</div>
                    <div class="definition">रक्त, लहू</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">क़ुर्बानियों</div>
                    <div class="definition">त्याग</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">काफ़िला</div>
                    <div class="definition">यात्रियों का समूह</div>
                </div>
            </div>
        `
    },
    {
        title: "टिप्पणियाँ",
        content: `
            <div class="notes-section">
                <h3>कविता पर टिप्पणियाँ</h3>
                
                <div class="note-item">
                    <h4>देशभक्ति और बलिदान</h4>
                    <p>"कर चले हम फ़िदा" कविता देशभक्ति और बलिदान की भावना को दर्शाती है। इसमें सैनिक अपने देश के प्रति अपनी जिम्मेदारी को पूरा करते हुए, अपने प्राणों की चिंता किए बिना देश की रक्षा के लिए बलिदान देने की तत्परता व्यक्त करते हैं।</p>
                </div>
                
                <div class="note-item">
                    <h4>प्रतीक</h4>
                    <p>'सर हिमालय का हमने न झुकने दिया' पंक्ति में हिमालय भारत के गौरव और अखंडता का प्रतीक है। सैनिकों ने अपने बलिदान से देश के गौरव और अखंडता को बनाए रखा है।</p>
                </div>
                
                <div class="note-item">
                    <h4>रामायण का संदर्भ</h4>
                    <p>अंतिम अनुच्छेद में कवि ने रामायण के संदर्भ का उपयोग किया है। जहां सैनिकों को राम और लक्ष्मण के रूप में, देश को सीता के रूप में और शत्रुओं को रावण के रूप में चित्रित किया गया है।</p>
                </div>
                
                <div class="note-item">
                    <h4>ऐतिहासिक संदर्भ</h4>
                    <p>यह कविता 1964 की फिल्म 'हक़ीक़त' के लिए लिखी गई थी, जो 1962 के भारत-चीन युद्ध पर आधारित थी। इस युद्ध में भारतीय सैनिकों ने अपार साहस और बलिदान का परिचय दिया था।</p>
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
    if (window.narrator && !globalNarrationState.disabledByUser) {
        // Update global narration state
        globalNarrationState.currentPart = partNumber;
        
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
        globalNarrationState.disabledByUser = false; // Re-enable auto-narration when user manually starts
        trackUserInteraction(); // Ensure user interaction is tracked
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
        globalNarrationState.disabledByUser = true; // Mark that user has disabled narration
        
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
