/**
 * Story content and functionality for Meera Ke Pad
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>मीरा (1503-1546) का जन्म जोधपुर के चोकड़ी (कुड़की) गाँव में 1503 में हुआ माना जाता है। 13 वर्ष की उम्र में मेवाड़ के महाराणा सांगा के कुँवर 
            भोजराज से उनका विवाह हुआ। उनका जीवन दुखों की छाया में ही बीता। <span class="highlight-vocab">बाल्यावस्था<span class="vocab-tooltip">बचपन</span></span> में ही माँ का देहांत हो गया था।</p>
            
            <div class="vocabulary-note">
                <div class="word">बाल्यावस्था</div>
                <div class="definition">बचपन</div>
            </div>
            
            <p>विवाह के कुछ ही साल बाद पहले पति, फिर पिता और एक युद्ध के दौरान श्वसुर का भी देहांत हो गया। भौतिक जीवन से 
            <span class="highlight-vocab">निराश<span class="vocab-tooltip">हताश</span></span> मीरा ने घर-परिवार त्याग दिया और वृंदावन में डेरा डाल पूरी तरह 
            <span class="highlight-vocab">गिरधर गोपाल<span class="vocab-tooltip">श्रीकृष्ण का एक नाम</span></span> कृष्ण के प्रति समर्पित हो गईं।</p>
            
            <div class="vocabulary-note">
                <div class="word">निराश</div>
                <div class="definition">हताश</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">गिरधर गोपाल</div>
                <div class="definition">श्रीकृष्ण का एक नाम</div>
            </div>
            
            <p>मध्यकालीन भक्ति आंदोलन की आध्यात्मिक प्रेरणा ने जिन कवियों को जन्म दिया उनमें मीराबाई का विशिष्ट स्थान है। इनके पद पूरे उत्तर भारत सहित गुजरात, बिहार और बंगाल तक प्रचलित हैं। मीरा हिंदी और गुजराती दोनों की कवयित्री मानी जाती हैं। संत 
            <span class="highlight-vocab">रैदास<span class="vocab-tooltip">15वीं-16वीं शताब्दी के संत और कवि</span></span> की शिष्या मीरा की कुल सात-आठ कृतियाँ ही उपलब्ध हैं।</p>
            
            <div class="vocabulary-note">
                <div class="word">रैदास</div>
                <div class="definition">15वीं-16वीं शताब्दी के संत और कवि</div>
            </div>
            
            <p>मीरा की भक्ति <span class="highlight-vocab">दैन्य<span class="vocab-tooltip">विनय, नम्रता</span></span> और 
            <span class="highlight-vocab">माधुर्यभाव<span class="vocab-tooltip">प्रेम भाव</span></span> की है। इन पर योगियों, संतों और वैष्णव भक्तों का सम्मिलित प्रभाव पड़ा है। मीरा के पदों की भाषा में राजस्थानी, ब्रज और गुजराती का मिश्रण पाया जाता है। वहीं पंजाबी, खड़ी बोली और पूर्वी के प्रयोग भी मिल जाते हैं।</p>
            
            <div class="vocabulary-note">
                <div class="word">दैन्य</div>
                <div class="definition">विनय, नम्रता</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">माधुर्यभाव</div>
                <div class="definition">प्रेम भाव</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. मीरा का जन्म कहाँ और कब हुआ था?</div>
                <div class="comprehension-question">2. मीरा किसकी शिष्या थीं?</div>
                <div class="comprehension-question">3. मीरा की भक्ति की मुख्य विशेषताएँ क्या थीं?</div>
                <div class="comprehension-question">4. मीरा के पदों की भाषा में किन भाषाओं का मिश्रण पाया जाता है?</div>
            </div>
        `
    },
    {
        title: "कविता",
        content: `
            <div class="poem-text">
                (1) हरि आप हरो जन री भीर। द्रोपदी री लाज राखी, आप बढ़ायो चीर।<br>
                भगत कारण रूप नरहरि, धर्यो आप सरीर।<br>
                बूढ़तो गजराज राख्यो, काटी कुण्जर पीर।<br>
                दासी मीराँ लाल गिरधर, हरो म्हारी भीर।।<br><br>
                
                (2) स्याम म्हाने चाकर राखो जी, गिरधारी लाला म्हाँने चाकर राखोजी।<br>
                चाकर रहस्यूँ बाग लगास्यूँ नित उठ दरसण पास्यूँ।<br>
                बिन्दरावन री कुंज गली में, गोविन्द लीला गास्यूँ।<br>
                चाकरी में दरसण पास्यूँ, सुमरण पास्यूँ खरची।<br>
                भाव भगती जागीरी पास्यूँ, तीनूं बाताँ सरसी।<br>
                मोर मुगट पीताम्बर सौहे, गल वैजन्ती माला।<br>
                बिन्दरावन में धेनु चरावे, मोहन मुरली वाला।<br>
                ऊँचा ऊँचा महल बणावं बिच बिच राखूँ बारी।<br>
                साँवरिया रा दरसण पास्यूँ, पहर कुसुम्बी साड़ी।<br>
                आधी रात प्रभु दरसण, दीज्यो जमनाजी रे तीरां।<br>
                मीराँ रा प्रभु गिरधर नागर, हिवड़ो घणो अधीराँ।।
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. पहले पद में मीरा ने हरि से अपनी पीड़ा हरने की विनती किस प्रकार की है?</div>
                <div class="comprehension-question">2. दूसरे पद में मीराबाई श्याम की चाकरी क्यों करना चाहती हैं?</div>
                <div class="comprehension-question">3. मीराबाई ने श्रीकृष्ण के रूप-सौंदर्य का वर्णन कैसे किया है?</div>
                <div class="comprehension-question">4. मीराबाई श्रीकृष्ण को पाने के लिए क्या-क्या कार्य करने को तैयार हैं?</div>
            </div>
        `
    },
    {
        title: "शब्दार्थ और टिप्पणियाँ",
        content: `
            <div class="shabdarth-tippaniyan-content">
                <h3>शब्दार्थ और टिप्पणियाँ</h3>
                
                <div class="vocabulary-list">
                    <div class="vocab-item">
                        <span class="word">बढ़ायो</span> - <span class="meaning">बढ़ाना</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">गजराज</span> - <span class="meaning">ऐरावत</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">कुंजर</span> - <span class="meaning">हाथी</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">पास्यूँ</span> - <span class="meaning">पाना</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">लीला</span> - <span class="meaning">विविध रूप</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">सुमरण</span> - <span class="meaning">याद करना / स्मरण</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">जागीरी</span> - <span class="meaning">जागीर / साम्राज्य</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">पीतांबर</span> - <span class="meaning">पीला वस्त्र</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">वैजंती</span> - <span class="meaning">एक फूल</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">तीरां</span> - <span class="meaning">किनारा</span>
                    </div>
                    <div class="vocab-item">
                        <span class="word">अधीराँ (अधीर)</span> - <span class="meaning">व्याकुल होना</span>
                    </div>
                </div>
                
                <div class="tippaniyan-section">
                    <h4>टिप्पणियाँ</h4>
                    <div class="note-item">
                        <strong>द्रोपदी री लाज राखी</strong> - दुर्योधन द्वारा द्रोपदी का चीरहरण कराने पर श्रीकृष्ण ने चीर को बढ़ाते-बढ़ाते इतना बढ़ा दिया कि दुःशासन का हाथ थक गया
                    </div>
                    <div class="note-item">
                        <strong>काटी कुंजर पीर</strong> - कुंजर का कष्ट दूर करने के लिए मगरमच्छ को मारा
                    </div>
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
        
        // Add event listeners to vocabulary terms - highlighting only, no narration
        partContainer.querySelectorAll('.highlight-vocab').forEach(term => {
            term.addEventListener('click', function() {
                // Simply highlight the word without narration
                this.classList.toggle('active-highlight');
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
    feedbackMsg.textContent = 'शब्दार्थ हाइलाइट किए गए हैं।';
    
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


