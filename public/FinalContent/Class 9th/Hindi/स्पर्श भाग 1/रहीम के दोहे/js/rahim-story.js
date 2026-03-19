/**
 * Story content and functionality for Rahim Ke Dohe
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>रहीम का जन्म लाहौर (अब पाकिस्तान) में सन् 1556 में हुआ। इनका पूरा नाम अब्दुर्रहीम खानखाना था। रहीम अरबी, फ़ारसी, संस्कृत और हिंदी के अच्छे जानकार थे।</p>
            
            <p>इनकी नीतिपरक उक्तियों पर संस्कृत कवियों की स्पष्ट छाप परिलक्षित होती है। रहीम मध्ययुगीन दरबारी संस्कृति के प्रतिनिधि कवि माने जाते हैं। अकबर के दरबार में हिंदी कवियों में इनका महत्त्वपूर्ण स्थान था।</p>
            
            <div class="vocabulary-note">
                <div class="word">नीतिपरक</div>
                <div class="definition">नैतिकता से संबंधित</div>
            </div>
            
            <p>रहीम अकबर के नवरत्नों में से एक थे। रहीम के काव्य का मुख्य विषय श्रृंगार, नीति और भक्ति है। रहीम बहुत लोकप्रिय कवि थे। इनके दोहे सर्वसाधारण को आसानी से याद हो जाते हैं।</p>
            
            <div class="vocabulary-note">
                <div class="word">नवरत्न</div>
                <div class="definition">नौ रत्न, अकबर के दरबार के नौ प्रमुख व्यक्ति</div>
            </div>
            
            <p>इनके नीतिपरक दोहे ज़्यादा प्रचलित हैं, जिनमें दैनिक जीवन के दृष्टांत देकर कवि ने उन्हें सहज, सरल और बोधगम्य बना दिया है। रहीम को अवधी और ब्रज दोनों भाषाओं पर समान अधिकार था।</p>
            
            <div class="vocabulary-note">
                <div class="word">दृष्टांत</div>
                <div class="definition">उदाहरण, नमूना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">बोधगम्य</div>
                <div class="definition">समझने योग्य</div>
            </div>
            
            <p>इन्होंने अपने काव्य में प्रभावपूर्ण भाषा का प्रयोग किया है।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रहीम का जन्म कहाँ और कब हुआ था?</div>
                <div class="comprehension-question">2. रहीम किसके नवरत्नों में से एक थे?</div>
                <div class="comprehension-question">3. रहीम के काव्य का मुख्य विषय क्या था?</div>
                <div class="comprehension-question">4. रहीम को किन भाषाओं पर अधिकार था?</div>
            </div>
        `
    },
    {
        title: "कविता",
        content: `
            <div class="poem-text">
                रहिमन धागा प्रेम का, मत तोड़ो चटकाय।<br>
                टूटे से फिर ना मिले, मिले गाँठ परि जाय।।<br><br>
                
                रहिमन निज मन की बिथा, मन ही राखो गोय सुनि अठिलैहैं लोग सब, बाँटि न लैहैं कोय।।<br><br>
                
                एकै साधे सब सधै, सब साधे सब जाय। रहिमन मूलहिं सींचिबो, फूलै फलै अघाय।।<br><br>
                
                चित्रकूट में रमि रहे, रहिमन अवध-नरेस। जा पर बिपदा पड़त है, सो आवत यह देस।।<br><br>
                
                दीरघ दोहा अरथ के, आखर थोरे आहिं। ज्यों रहीम नट कुंडली, सिमिटि कूदि चढ़ि जाहिं।।<br><br>
                
                धनि रहीम जल पंक को लघु जिय पिअत अघाय। उदधि बड़ाई कौन है, जगत पिआसो जाय।।<br><br>
                
                नाद रीझि तन देत मृग, नर धन हेत समेत। ते रहीम पशु से अधिक, रीझेहु कछू न देत।।<br><br>
                
                बिगरी बात बनै नहीं, लाख करौ किन कोय। रहिमन फाटे दूध को, मथे न माखन होय ।।<br><br>
                
                रहिमन देखि बड़ेन को, लघु न दीजिये डारि। जहाँ काम आवे सुई, कहा करे तरवारि।।<br><br>
                
                रहिमन निज संपति बिना, कोउ न बिपति सहाय। बिनु पानी ज्यों जलज को, नहिं रवि सके बचाय।।<br><br>
                
                रहिमन पानी राखिए, बिनु पानी सब सून। पानी गए न ऊबरै, मोती, मानुष, चून ।।<br>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">चटकाय</div>
                <div class="definition">चटकाकर</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">बिथा</div>
                <div class="definition">व्यथा, दुःख, वेदना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">गोय</div>
                <div class="definition">छिपाकर</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">अठिलैहैं</div>
                <div class="definition">इठलाना, मज़ाक उड़ाना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">सींचिबो</div>
                <div class="definition">सिंचाई करना, पौधों में पानी देना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">अघाय</div>
                <div class="definition">तृप्त</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">अरथ</div>
                <div class="definition">मायने, आशय</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">थोरे</div>
                <div class="definition">थोड़ा, कम</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">पंक</div>
                <div class="definition">कीचड़</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">उदधि</div>
                <div class="definition">सागर</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">नाद</div>
                <div class="definition">ध्वनि</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">रीझि</div>
                <div class="definition">मोहित होकर</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">बिगरी</div>
                <div class="definition">बिगड़ी हुई</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">फाटे दूध</div>
                <div class="definition">फटा हुआ दूध</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">मथे</div>
                <div class="definition">बिलोना, मथना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">आवे</div>
                <div class="definition">आना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">निज</div>
                <div class="definition">अपना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">बिपति</div>
                <div class="definition">मुसीबत, संकट</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">पिआसो</div>
                <div class="definition">प्यासा</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">चित्रकूट</div>
                <div class="definition">वनवास के समय श्री रामचंद्र जी सीता और लक्ष्मण के साथ कुछ समय तक चित्रकूट में रहे थे।</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. प्रेम का धागा टूटने पर क्या होता है?</div>
                <div class="comprehension-question">2. हमें अपना दुःख दूसरों पर क्यों नहीं प्रकट करना चाहिए?</div>
                <div class="comprehension-question">3. एक को साधने से सब कैसे सध जाता है?</div>
                <div class="comprehension-question">4. पानी के महत्त्व को किस प्रकार समझाया गया है?</div>
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
