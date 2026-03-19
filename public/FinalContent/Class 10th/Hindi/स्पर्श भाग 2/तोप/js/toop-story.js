/**
 * Story content and functionality for तोप
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>वीरेन डंगवाल का जन्म 5 अगस्त 1947 को उत्तराखंड के टिहरी गढ़वाल ज़िले के कीर्तिनगर में हुआ था। उन्होंने अपनी शुरुआती शिक्षा नैनीताल में और उच्च शिक्षा इलाहाबाद में पूरी की। वे पेशे से <span class="highlight-vocab">प्राध्यापक<span class="vocab-tooltip">शिक्षक/अध्यापक</span></span> होने के साथ-साथ पत्रकारिता से भी जुड़े थे।</p>
            
            <div class="vocabulary-note">
                <div class="word">प्राध्यापक</div>
                <div class="definition">शिक्षक/अध्यापक</div>
            </div>
            
            <p>वीरेन की कविताओं में समाज के आम लोगों और <span class="highlight-vocab">हाशिए<span class="vocab-tooltip">समाज के किनारे</span></span> पर स्थित जीवन के विलक्षण विवरण और दृश्य देखने को मिलते हैं। उन्होंने ऐसी कई चीज़ों और जीव-जंतुओं को अपनी कविताओं का विषय बनाया, जिन्हें हम अक्सर देखकर भी अनदेखा कर देते हैं।</p>
            
            <div class="vocabulary-note">
                <div class="word">हाशिए</div>
                <div class="definition">समाज के किनारे</div>
            </div>
            
            <p>उनके अब तक दो कविता संग्रह, इसी दुनिया में और दुष्चक्र में <span class="highlight-vocab">स्रष्टा<span class="vocab-tooltip">रचनाकार</span></span>, प्रकाशित हो चुके हैं। पहले संग्रह पर उन्हें श्रीकांत वर्मा पुरस्कार और दूसरे पर साहित्य अकादेमी पुरस्कार मिला। उनका निधन 28 सितंबर 2015 को हुआ।</p>
            
            <div class="vocabulary-note">
                <div class="word">स्रष्टा</div>
                <div class="definition">रचनाकार</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. वीरेन डंगवाल का जन्म कब और कहाँ हुआ था?</div>
                <div class="comprehension-question">2. वीरेन डंगवाल की कविताओं की मुख्य विशेषताएँ क्या थीं?</div>
                <div class="comprehension-question">3. वीरेन डंगवाल के किस कविता संग्रह पर उन्हें साहित्य अकादेमी पुरस्कार मिला?</div>
                <div class="comprehension-question">4. वीरेन डंगवाल किस पेशे से जुड़े थे?</div>
            </div>
        `
    },
    {
        title: "कविता",
        content: `
            <div class="poem-text">
                तोप<br>
                कंपनी बाग के मुहाने पर<br>
                धर रखी गई है यह 1857 की तोप<br>
                इसकी होती है बड़ी सम्हाल, विरासत में मिले<br>
                कंपनी बाग की तरह<br>
                साल में चमकाई जाती है दो बार।<br><br>
                
                सुबह-शाम कंपनी बाग में आते हैं बहुत से सैलानी<br>
                उन्हें बताती है यह तोप<br>
                कि मैं बड़ी जबर<br>
                उड़ा दिए थे मैंने<br>
                अच्छे-अच्छे सूरमाओं के धज्जे<br>
                अपने जमाने में<br><br>
                
                अब तो बहरहाल<br>
                छोटे लड़कों की घुड़सवारी से अगर यह फ़ारिग हो<br>
                तो उसके ऊपर बैठकर<br>
                चिड़ियाँ ही अकसर करती हैं गपशप<br>
                कभी-कभी शैतानी में इसके भीतर भी घुस जाती हैं<br>
                ख़ास कर गौरैयें<br><br>
                
                वे बताती हैं कि दरअसल कितनी भी बड़ी हो तोप<br>
                एक दिन तो होना ही है उसका मुँह बंद।
            </div>
            
            <div class="vocabulary-note">
                <div class="word">मुहाने</div>
                <div class="definition">प्रवेश द्वार पर</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">सैलानियों</div>
                <div class="definition">दर्शनीय स्थलों पर आने वाले यात्री</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">सूरमाओं</div>
                <div class="definition">वीरों</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">धज्जे</div>
                <div class="definition">चिथड़े-चिथड़े करना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">फ़ारिग</div>
                <div class="definition">मुक्त / खाली</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">कंपनी बाग</div>
                <div class="definition">गुलाम भारत में 'ईस्ट इंडिया कंपनी' द्वारा जगह-जगह पर बनवाए गए बाग-बगीचों में से कानपुर में बनवाया गया एक बाग</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. तोप कहाँ रखी हुई है?</div>
                <div class="comprehension-question">2. तोप की देखभाल कैसे होती है?</div>
                <div class="comprehension-question">3. चौकीदार सैलानियों को तोप के बारे में क्या बताता है?</div>
                <div class="comprehension-question">4. कविता में तोप को एक दिन क्या होना है?</div>
            </div>
        `
    },
    {
        title: "शब्दार्थ और टिप्पणियाँ",
        content: `
            <div class="vocabulary-section">
                <h3>शब्दार्थ और टिप्पणियाँ</h3>
                <table class="vocabulary-table" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr style="background-color: #f3f3f3;">
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left; font-weight: bold;">शब्द</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left; font-weight: bold;">अर्थ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">मुहाने</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">प्रवेश द्वार पर</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">धर रखी</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">रखी गई</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">सम्हाल</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">देखभाल</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">विरासत</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">पूर्व पीढ़ियों से प्राप्त वस्तुएँ</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">सैलानी</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">दर्शनीय स्थलों पर आने वाले यात्री</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">सूरमा(ओं)</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">वीर</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">धज्जे</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">चिथड़े-चिथड़े करना</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">फ़ारिग</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">मुक्त / खाली</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: 500;">कंपनी बाग</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">गुलाम भारत में 'ईस्ट इंडिया कंपनी' द्वारा जगह-जगह पर बनवाए गए बाग-बगीचों में से कानपुर में बनवाया गया एक बाग</td>
                        </tr>
                    </tbody>
                </table>
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
