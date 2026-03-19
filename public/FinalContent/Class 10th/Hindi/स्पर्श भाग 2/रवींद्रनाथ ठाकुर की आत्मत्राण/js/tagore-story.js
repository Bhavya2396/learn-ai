/**
 * Story content and functionality for Ravindranath Tagore's Atmatran
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>रवींद्रनाथ ठाकुर का जन्म 6 मई 1861 को बंगाल के एक संपन्न परिवार में हुआ था। वे नोबेल पुरस्कार पाने वाले पहले भारतीय हैं। इनकी शिक्षा-दीक्षा घर पर ही हुई और छोटी उम्र में ही स्वाध्याय से अनेक विषयों का ज्ञान अर्जित कर लिया।</p>
            
            <p>बैरिस्ट्री पढ़ने के लिए विदेश भेजे गए लेकिन बिना परीक्षा दिए ही लौट आए। रवींद्रनाथ की रचनाओं में लोक-संस्कृति का स्वर प्रमुख रूप से मुखरित होता है। प्रकृति से इन्हें गहरा लगाव था।</p>
            
            <p>इन्होंने लगभग एक हज़ार कविताएँ और दो हज़ार गीत लिखे हैं। चित्रकला, संगीत और भावनृत्य के प्रति इनके विशेष अनुराग के कारण रवींद्र संगीत नाम की एक अलग धारा का ही सूत्रपात हो गया।</p>
            
            <p>इन्होंने शांति निकेतन नाम की एक शैक्षिक और सांस्कृतिक संस्था की स्थापना की। यह अपनी तरह का अनूठा संस्थान माना जाता है। अपनी काव्य कृति गीतांजलि के लिए नोबेल पुरस्कार से सम्मानित हुए।</p>
            
            <p>रवींद्रनाथ ठाकुर की अन्य प्रमुख कृतियाँ हैं- नैवैद्य, पूरबी, बलाका, क्षणिका, चित्र और सांध्यगीत, काबुलीवाला और सैकड़ों अन्य कहानियाँ; उपन्यास-गोरा, घरे बाइरे और रवींद्र के निबंध।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रवींद्रनाथ ठाकुर का जन्म कब और कहाँ हुआ था?</div>
                <div class="comprehension-question">2. रवींद्रनाथ ठाकुर को किस कृति के लिए नोबेल पुरस्कार मिला?</div>
                <div class="comprehension-question">3. शांति निकेतन क्या है?</div>
                <div class="comprehension-question">4. रवींद्रनाथ ठाकुर की कुछ प्रमुख रचनाओं के नाम बताइए।</div>
            </div>
        `
    },
    {
        title: "कविता",
        content: `
            <div class="poem-text">
                विपदाओं से मुझे बचाओ, यह मेरी प्रार्थना नहीं<br>
                केवल इतना हो (करुणामय) कभी न विपदा में पाऊँ भय।<br><br>
                
                दुःख-ताप से व्यथित चित्त को न दो सांत्वना नहीं सही<br>
                पर इतना होवे (करुणामय) दुख को मैं कर सकूँ सदा जय।<br><br>
                
                कोई कहीं सहायक न मिले तो अपना बल पौरुष न हिले;<br>
                हानि उठानी पड़े जगत् में लाभ अगर वंचना रही<br>
                तो भी मन में ना मानूँ क्षय।।<br><br>
                
                मेरा त्राण करो अनुदिन तुम यह मेरी प्रार्थना नहीं<br>
                बस इतना होवे (करुणायम) तरने की हो शक्ति अनामय।<br><br>
                
                मेरा भार अगर लघु करके न दो सांत्वना नहीं सही।<br>
                केवल इतना रखना अनुनय- वहन कर सकूँ इसको निर्भय।<br><br>
                
                नत शिर होकर सुख के दिन में तव मुख पहचानूँ छिन-छिन में।<br>
                दुःख-रात्रि में करे वंचना मेरी जिस दिन निखिल मही<br>
                उस दिन ऐसा हो करुणामय, तुम पर करूँ नहीं कुछ संशय ।।<br>
                <br>अनुवाद : हजारीप्रसाद द्विवेदी
            </div>
            
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. कवि किससे और क्या प्रार्थना कर रहा है?</div>
                <div class="comprehension-question">2. विपदाओं के संदर्भ में कवि की क्या इच्छा है?</div>
                <div class="comprehension-question">3. कवि सहायता न मिलने पर क्या प्रार्थना करता है?</div>
                <div class="comprehension-question">4. 'आत्मत्राण' शीर्षक की सार्थकता समझाइए।</div>
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
        
        // Vocabulary highlighting disabled
        
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

// Vocabulary highlighting disabled
function highlightVocabulary() {
    // Function disabled
    console.log('Vocabulary highlighting has been disabled');
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
