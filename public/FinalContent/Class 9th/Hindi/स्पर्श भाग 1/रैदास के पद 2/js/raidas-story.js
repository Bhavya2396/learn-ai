/**
 * Story content and functionality for Raidas Ke Pad
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>रैदास नाम से विख्यात संत रविदास का जन्म सन् 1388 और देहावसान सन् 1518 में बनारस में ही हुआ, ऐसा माना जाता है। इनकी ख्याति से प्रभावित होकर सिकंदर लोदी ने इन्हें दिल्ली आने का निमंत्रण भेजा था।</p>
            
            <p>मध्ययुगीन साधकों में रैदास का विशिष्ट स्थान है। कबीर की तरह रैदास भी संत कोटि के कवियों में गिने जाते हैं। मूर्तिपूजा, तीर्थयात्रा जैसे दिखावों में रैदास का जरा भी विश्वास न था। वह व्यक्ति की आंतरिक भावनाओं और आपसी भाईचारे की ही सच्चा धर्म मानते थे।</p>
            
            <p>रैदास ने अपनी काव्य-रचनाओं में सरल, व्यावहारिक ब्रजभाषा का प्रयोग किया है, जिसमें अवधी, राजस्थानी, खड़ी बोली और उर्दू-फ़ारसी के शब्दों का भी मिश्रण है। रैदास को उपमा और रूपक अलंकार विशेष प्रिय रहे हैं। सीधे-सादे पदों में संत कवि ने हृदय के भाव बड़ी सफ़ाई से प्रकट किए हैं। इनका आत्मनिवेदन, दैन्य भाव और सहज पाठक के हृदय को उद्वेलित करते हैं। रैदास के चालीस पद सिखों के पवित्र धर्मग्रंथ 'गुरुग्रंथ साहब' में भी सम्मिलित हैं।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रैदास का जन्म और देहावसान कब और कहाँ हुआ था?</div>
                <div class="comprehension-question">2. रैदास को किसने दिल्ली आने का निमंत्रण भेजा था?</div>
                <div class="comprehension-question">3. रैदास की काव्य रचनाओं की मुख्य विशेषताएँ क्या थीं?</div>
                <div class="comprehension-question">4. रैदास के कितने पद 'गुरुग्रंथ साहब' में सम्मिलित हैं?</div>
            </div>
        `
    },
    {
        title: "कविता",
        content: `
            <div class="poem-text">
                <h3>पद (1)</h3>
                <p>अब कैसे छूटै राम नाम रट लागी।<br>
                प्रभु जी, तुम चंदन हम पानी, जाकी अंग-अंग बास समानी।<br>
                प्रभु जी, तुम घन बन हम मोरा, जैसे चितवत चंद चकोरा।<br>
                प्रभु जी, तुम दीपक हम बाती, जाकी जोति बरै दिन राती।<br>
                प्रभु जी, तुम मोती हम धागा, जैसे सोनहिं मिलत सुहागा।<br>
                प्रभु जी, तुम स्वामी हम दासा, ऐसी भक्ति करे रैदासा।।</p>

                <h3>पद (2)</h3>
                <p>ऐसी लाल तुझ बिनु कउनु करै।<br>
                गरीब निवाजु गुसईआ मेरा माथे छत्रु धरै।।<br>
                जाकी छोति जगत कउ लागै ता पर तुहीं ढरै।<br>
                नीचहु ऊच करै मेरा गोबिंदु काहू ते न डरै।।<br>
                नामदेव कबीरू तिलोचनु सधना सैनु तरै।<br>
                कहि रविदासु सुनहु रे संतहु हरीजीउ ते सभै सरै।।</p>
            </div>
            
            <h3>शब्दार्थ</h3>
            
            <div class="shabdarth-section">
                <div class="shabdarth-row">
                    <div class="shabdarth-word">बास</div>
                    <div class="shabdarth-meaning">गंध, वास</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">समानी</div>
                    <div class="shabdarth-meaning">समाना (सुगंध का बस जाना), बसा हुआ (समाहित)</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">घन</div>
                    <div class="shabdarth-meaning">बादल</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">मोरा</div>
                    <div class="shabdarth-meaning">मोर, मयूर</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">चितवत</div>
                    <div class="shabdarth-meaning">देखना, निरखना</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">चकोर</div>
                    <div class="shabdarth-meaning">तीतर की जाति का एक पक्षी जो चंद्रमा का परम प्रेमी माना जाता है</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">बाती</div>
                    <div class="shabdarth-meaning">बत्ती; रूई, पुराने कपड़े आदि को ऐंठकर या बटकर बनाई हुई पतली पूनी, जिसे तेल में डालकर दिया जलाते हैं</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">जोति</div>
                    <div class="shabdarth-meaning">ज्योति, देवता के प्रीत्यर्थ जलाया जानेवाला दीपक</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">बरै</div>
                    <div class="shabdarth-meaning">बढ़ना, जलना</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">राती</div>
                    <div class="shabdarth-meaning">रात्रि</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">सुहागा</div>
                    <div class="shabdarth-meaning">सोने को शुद्ध करने के लिए प्रयोग में आनेवाला क्षारद्रव्य</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">दासा</div>
                    <div class="shabdarth-meaning">दास, सेवक</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">लाल</div>
                    <div class="shabdarth-meaning">प्रिय</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">कउनु</div>
                    <div class="shabdarth-meaning">कौन</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">गरीब निवाजु</div>
                    <div class="shabdarth-meaning">दीन-दुखियों पर दया करनेवाला</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">गुसईआ</div>
                    <div class="shabdarth-meaning">स्वामी, गुसाईं</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">माथे छत्रु धरै</div>
                    <div class="shabdarth-meaning">मस्तक पर स्वामी होने का मुकुट धारण करता है</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">छोति</div>
                    <div class="shabdarth-meaning">छुआछूत, अस्पृश्यता</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">जगत कउ लागै</div>
                    <div class="shabdarth-meaning">संसार के लोगों को लगती है</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">तुहीं ढरै</div>
                    <div class="shabdarth-meaning">उन पर द्रवित होता है</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">नीचहु ऊँच करै</div>
                    <div class="shabdarth-meaning">नीच को भी ऊँची पदवी प्रदान करता है</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">नामदेव</div>
                    <div class="shabdarth-meaning">महाराष्ट्र के एक प्रसिद्ध संत, इन्होंने मराठी और हिंदी दोनों भाषाओं में रचना की है</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">तिलोचनु (त्रिलोचन)</div>
                    <div class="shabdarth-meaning">एक प्रसिद्ध वैष्णव आचार्य, जो ज्ञानदेव और नामदेव के गुरु थे</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">सधना</div>
                    <div class="shabdarth-meaning">एक उच्च कोटि के संत जो नामदेव के समकालीन माने जाते हैं</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">सैनु</div>
                    <div class="shabdarth-meaning">ये भी एक प्रसिद्ध संत हैं, आदि 'गुरुग्रंथ साहब' में संगृहीत पद के आधार पर इन्हें रामानंद का समकालीन माना जाता है</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">हरिजीउ</div>
                    <div class="shabdarth-meaning">हरि जी से</div>
                </div>
                
                <div class="shabdarth-row">
                    <div class="shabdarth-word">सभै सरै</div>
                    <div class="shabdarth-meaning">सब कुछ संभव हो जाता है</div>
                </div>
            </div>

            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. पहले पद में भगवान् और भक्त की तुलना किन-किन चीज़ों से की गई है?</div>
                <div class="comprehension-question">2. भगवान् की किन विशेषताओं का वर्णन दूसरे पद में किया गया है?</div>
                <div class="comprehension-question">3. "नीचहु ऊँच करै मेरा गोबिंदु" से रैदास क्या कहना चाहते हैं?</div>
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
        
        // Special handling for कविता section (part 2) and लेखक परिचय (part 1)
        if (partNumber === 1 || partNumber === 2) {
            // Remove any highlight vocabulary spans by replacing them with their text content
            const highlightSpans = partContainer.querySelectorAll('.highlight-vocab');
            highlightSpans.forEach(span => {
                const text = span.textContent.trim();
                const textNode = document.createTextNode(text);
                if (span.parentNode) {
                    span.parentNode.replaceChild(textNode, span);
                }
            });
            
            // Hide any vocabulary notes
            const vocabNotes = partContainer.querySelectorAll('.vocabulary-note');
            vocabNotes.forEach(note => {
                note.style.display = 'none';
            });
        } else {
            // Add event listeners to vocabulary terms for other sections
            partContainer.querySelectorAll('.highlight-vocab').forEach(term => {
                term.addEventListener('click', function() {
                    const word = this.textContent.split('\n')[0].trim();
                    const definition = this.querySelector('.vocab-tooltip').textContent;
                    
                    if (window.narrator) {
                        window.narrator.speak(`${word}: ${definition}`);
                    }
                });
            });
        }
        
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
    
    // Special handling for poem content (partNumber 2 is कविता)
    if (partNumber === 2 && poemText) {
        // Extract headings and poem paragraphs
        const headings = tempDiv.querySelectorAll('.poem-text h3');
        const poemParagraphs = tempDiv.querySelectorAll('.poem-text > p');
        
        // Format the poem with appropriate headings and content
        if (headings.length > 0 && poemParagraphs.length > 0) {
            // Add brief introduction
            storyText += "अब रैदास के पदों का वाचन सुनें। ";
            
            // Add first poem with heading
            if (headings[0] && poemParagraphs[0]) {
                const heading1Text = headings[0].textContent.replace(/\(\d+\)/g, ''); // Remove parentheses around number
                storyText += `पद एक। ${poemParagraphs[0].textContent.replace(/\s+/g, ' ').trim()} `;
            }
            
            // Add second poem with heading
            if (headings[1] && poemParagraphs[1]) {
                const heading2Text = headings[1].textContent.replace(/\(\d+\)/g, ''); // Remove parentheses around number
                storyText += `पद दो। ${poemParagraphs[1].textContent.replace(/\s+/g, ' ').trim()}`;
            }
        } else {
            // Fallback in case the structure isn't as expected
            storyText += poemText.textContent.replace(/\s+/g, ' ').trim();
        }
    } 
    // Normal handling for other content (like लेखक परिचय)
    else if (validParagraphs.length > 0) {
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
            let elementsToHighlight = [];
            
            // Special highlighting for poem content
            if (partNumber === 2 && poemText) {
                // Get the real DOM elements (not the temp ones)
                const storyPartEl = document.getElementById(`storyPart${partNumber}`);
                if (storyPartEl) {
                    // First highlight the h3 headings and then their respective paragraphs
                    const h3Elements = storyPartEl.querySelectorAll('.poem-text h3');
                    const pElements = storyPartEl.querySelectorAll('.poem-text > p');
                    
                    // Create a sequence that alternates: heading1, poem1, heading2, poem2
                    if (h3Elements.length > 0 && pElements.length > 0) {
                        elementsToHighlight = [
                            h3Elements[0],  // First heading (पद 1)
                            pElements[0],   // First poem
                            h3Elements[1],  // Second heading (पद 2)
                            pElements[1]    // Second poem
                        ].filter(el => el); // Remove any undefined elements
                    } else {
                        // Fallback to highlighting the whole poem container
                        elementsToHighlight = [poemText];
                    }
                }
            }
            // Normal highlighting for other content
            else {
                elementsToHighlight = [...validParagraphs];
            }
            
            highlightParagraphsSequentially(elementsToHighlight);
            
        } catch (error) {
            console.error('Error starting narration:', error);
            
            // Instead of showing an error alert, try a simpler approach
            try {
                // Create a simplified version of the text for narration
                let fallbackText = '';
                
                if (partNumber === 2) { // कविता section
                    fallbackText = "कविता। पद एक। अब कैसे छूटै राम नाम रट लागी। प्रभु जी, तुम चंदन हम पानी। पद दो। ऐसी लाल तुझ बिनु कउनु करै।";
                } else {
                    fallbackText = storyText.substring(0, 200); // Just read the first part
                }
                
                // Try speaking the simplified text
                setTimeout(() => {
                    if (window.narrator) {
                        window.narrator.speak(fallbackText);
                    }
                }, 500);
            } catch (fallbackError) {
                console.error('Fallback narration also failed:', fallbackError);
                // Only show alert if even the fallback fails
                alert('क्षमा करें, वाचन शुरू करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
            }
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

// Highlight vocabulary words in the text - disabled for कविता and लेखक परिचय sections
function highlightVocabulary() {
    // Check if we're in the कविता section (part 2) or लेखक परिचय section (part 1)
    const activePartButton = document.querySelector('.story-nav-btn.active');
    const isPoem = activePartButton && activePartButton.textContent === "कविता";
    const isAuthorIntro = activePartButton && activePartButton.textContent === "लेखक परिचय";
    
    // If in poem or author intro section, show message that highlighting is disabled
    if (isPoem || isAuthorIntro) {
        const feedbackMsg = document.createElement('div');
        feedbackMsg.className = 'feedback-message info show';
        
        if (isPoem) {
            feedbackMsg.textContent = 'कविता खंड में हाइलाइट सुविधा उपलब्ध नहीं है।';
        } else {
            feedbackMsg.textContent = 'लेखक परिचय खंड में हाइलाइट सुविधा उपलब्ध नहीं है।';
        }
        
        // Find the story content container and append message
        const storyContent = document.getElementById('storyContent');
        if (storyContent) {
            storyContent.appendChild(feedbackMsg);
            
            // Remove the message after a few seconds
            setTimeout(() => {
                feedbackMsg.classList.remove('show');
                setTimeout(() => feedbackMsg.remove(), 500);
            }, 3000);
        }
        
        return; // Exit the function early
    }
    
    // Otherwise proceed with normal highlighting
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
