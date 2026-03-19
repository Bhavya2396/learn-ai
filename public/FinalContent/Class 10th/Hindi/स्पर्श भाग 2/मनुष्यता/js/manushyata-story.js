/**
 * Story content and functionality for Manushyata (मनुष्यता)
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story parts data
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>मैथिलीशरण गुप्त का जन्म 1886 में झाँसी के करीब चिरगाँव में हुआ था। वे अपने जीवनकाल में ही 
            <span class="highlight-vocab">राष्ट्रकवि<span class="vocab-tooltip">राष्ट्र के प्रतिनिधि कवि</span></span> के रूप में विख्यात हुए थे। उनकी शिक्षा-दीक्षा घर पर ही हुई।</p>
            
            <p>गुप्त जी संस्कृत, बांग्ला, मराठी और अंग्रेज़ी पर समान अधिकार रखते थे। वे 
            <span class="highlight-vocab">रामभक्त<span class="vocab-tooltip">राम के प्रति समर्पित भक्त</span></span> कवि थे। राम का कीर्तिगान उनकी चिरसंचित अभिलाषा रही।</p>
            
            <p>उन्होंने भारतीय जीवन को समग्रता में समझने और प्रस्तुत करने का प्रयास किया। गुप्त जी की कविता की भाषा 
            <span class="highlight-vocab">विशुद्ध खड़ी बोली<span class="vocab-tooltip">शुद्ध मानक हिंदी</span></span> है। भाषा पर संस्कृत का प्रभाव है।</p>
            
            <p>काव्य की कथावस्तु भारतीय इतिहास के ऐसे अंशों से ली गई है जो भारत के अतीत का स्वर्ण चित्र पाठक के सामने उपस्थित करते हैं। गुप्त जी की प्रमुख कृतियाँ हैं- साकेत, यशोधरा, जयद्रथ वध। गुप्त जी के पिता सेठ रामचरण दास भी कवि थे और उनके छोटे भाई सियारामशरण गुप्त भी प्रसिद्ध कवि हुए।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. मैथिलीशरण गुप्त का जन्म कहाँ और कब हुआ था?</div>
                <div class="comprehension-question">2. उन्हें किस उपाधि से सम्मानित किया गया था?</div>
                <div class="comprehension-question">3. गुप्त जी की काव्य भाषा की क्या विशेषता थी?</div>
                <div class="comprehension-question">4. गुप्त जी की प्रमुख कृतियाँ कौन-कौन सी हैं?</div>
            </div>
        `
    },
    {
        title: "कविता",
        content: `
            <div class="poem-text">
                विचार लो कि मर्त्य हो न मृत्यु से डरो कभी,<br>
                मरो, परंतु यों मरो कि याद जो करें सभी।<br>
                हुई न यों सुमृत्यु तो वृथा मरे, वृथा जिए,<br>
                मरा नहीं वही कि जो जिया न आपके लिए।<br>
                वही पशु-प्रवृत्ति है कि आप आप ही चरे,<br>
                वही मनुष्य है कि जो मनुष्य के लिए मरे।।<br><br>
                
                उसी उदार की कथा सरस्वती बखानती,<br>
                उसी उदार से धरा कृतार्थ भाव मानती।<br>
                उसी उदार की सदा सजीव कीर्ति कूजती;<br>
                तथा उसी उदार को समस्त सृष्टि पूजती।<br>
                अखंड आत्म भाव जो असीम विश्व में भरे,<br>
                वही मनुष्य है कि जो मनुष्य के लिए मरे।।<br><br>
                
                क्षुधार्त रंतिदेव ने दिया करस्थ थाल भी,<br>
                तथा दधीचि ने दिया परार्थ अस्थिजाल भी।<br>
                उशीनर क्षितीश ने स्वमांस दान भी किया,<br>
                सहर्ष वीर कर्ण ने शरीर-चर्म भी दिया।<br>
                अनित्य देह के लिए अनादि जीव क्या डरे?<br>
                वही मनुष्य है कि जो मनुष्य के लिए मरे।।<br><br>
                
                सहानुभूति चाहिए, महाविभूति है यही;<br>
                वशीकृता सदैव है बनी हुई स्वयं मही।<br>
                विरुद्धवाद बुद्ध का दया-प्रवाह में बहा,<br>
                विनीत लोकवर्ग क्या न सामने झुका रहा?<br>
                अहा! वही उदार है परोपकार जो करे,<br>
                वही मनुष्य है कि जो मनुष्य के लिए मरे।।<br><br>
                
                रहो न भूल के कभी मदांध तुच्छ वित्त में,<br>
                सनाथ जान आपको करो न गर्व चित्त में।<br>
                अनाथ कौन है यहाँ? त्रिलोकनाथ साथ हैं,<br>
                दयालु दीनबंधु के बड़े विशाल हाथ हैं।<br>
                अतीव भाग्यहीन है अधीर भाव जो करे,<br>
                वही मनुष्य है कि जो मनुष्य के लिए मरे।।<br><br>
                
                अनंत अंतरिक्ष में अनंत देव हैं खड़े<br>
                समक्ष ही स्वबाहु जो बढ़ा रहे बड़े-बड़े।<br>
                परस्परावलंब से उठो तथा बढ़ो सभी,<br>
                अभी अमर्त्य-अंक में अपंक हो चढ़ो सभी।<br>
                रहो न यों कि एक से न काम और का सरे,<br>
                वही मनुष्य है कि जो मनुष्य के लिए मरे।।<br><br>
                
                'मनुष्य मात्र बंधु है' यही बड़ा विवेक है,<br>
                पुराणपुरुष स्वयंभू पिता प्रसिद्ध एक है।<br>
                फलानुसार कर्म के अवश्य बाह्य भेद हैं,<br>
                परंतु अंतरैक्य में प्रमाणभूत वेद हैं।<br>
                अनर्थ है कि बंधु ही न बंधु की व्यथा हरे,<br>
                वही मनुष्य है कि जो मनुष्य के लिए मरे।।<br><br>
                
                चलो अभीष्ट मार्ग में सहर्ष खेलते हुए,<br>
                विपत्ति, विघ्न जो पड़ें उन्हें ढकेलते हुए।<br>
                घटे न हेलमेल हाँ, बढ़े न भिन्नता कभी,<br>
                अतर्क एक पंथ के सतर्क पंथ हों सभी।<br>
                तभी समर्थ भाव है कि तारता हुआ तरे,<br>
                वही मनुष्य है कि जो मनुष्य के लिए मरे।।<br>
            </div>
            
            <h3 class="shabarth-heading">शब्दार्थ</h3>
            
            <div class="vocabulary-note">
                <div class="word">मर्त्य</div>
                <div class="definition">मरणशील</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">सुमृत्यु</div>
                <div class="definition">अच्छी मृत्यु</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">पशु-प्रवृत्ति</div>
                <div class="definition">पशु जैसा स्वभाव</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">उदार</div>
                <div class="definition">दानशील / सहृदय</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">कृतार्थ</div>
                <div class="definition">आभारी / धन्य</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">कीर्ति</div>
                <div class="definition">यश</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">कूजती</div>
                <div class="definition">मधुर ध्वनि करती</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">अखंड</div>
                <div class="definition">पूर्ण</div>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. कवि ने कैसी मृत्यु को सुमृत्यु कहा है?</div>
                <div class="comprehension-question">2. सच्चे मनुष्य की कवि के अनुसार क्या पहचान है?</div>
                <div class="comprehension-question">3. कविता में किन-किन महान व्यक्तियों का उल्लेख हुआ है और क्यों?</div>
                <div class="comprehension-question">4. 'मनुष्य मात्र बंधु है' से कवि क्या संदेश देना चाहता है?</div>
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
    // Use a longer delay to ensure previous narration is completely stopped
    const delayMs = 1000; // Increased from 100ms to 1000ms
    
    setTimeout(() => {
        // Check if we're still on the same part
        const currentActivePart = document.querySelector('.story-part.active');
        if (currentActivePart && currentActivePart.id === `storyPart${partNumber}`) {
            console.log(`Auto-starting narration for story part ${partNumber}`);
            readStoryPartAloud(partNumber, false); // false = automatic call
        }
    }, delayMs);
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
    
    console.log(`Found ${validParagraphs.length} valid paragraphs for part ${partNumber}`);
    
    // Extract text content to read
    let storyText = '';
    
    // Special handling for कविता part (part 2) and लेखक परिचय part (part 1)
    const isKavitaPart = partNumber === 2;
    const isAuthorIntroPart = partNumber === 1;
    
    // Always include the title for both कविता and लेखक परिचय parts to ensure headings are read first
    if (isKavitaPart || isAuthorIntroPart) {
        storyText += `${part.title}. `;
    }
    // For other parts, only add title if it's a manual call (user clicked)
    else if (isManualCall) {
        storyText += `${part.title}. `;
    }
    
    // Add paragraph content
    if (validParagraphs.length > 0) {
        storyText += validParagraphs
            .map((p, index) => {
                // Clone the paragraph to avoid modifying the original
                const clonedP = p.cloneNode(true);
                
                // Remove all vocab-tooltip elements to get clean text
                const tooltips = clonedP.querySelectorAll('.vocab-tooltip');
                tooltips.forEach(tooltip => tooltip.remove());
                
                // Also remove any highlight-vocab spans but keep their text content
                const highlightVocab = clonedP.querySelectorAll('.highlight-vocab');
                highlightVocab.forEach(span => {
                    // Get only the main text, not the tooltip
                    const mainText = span.childNodes[0]?.textContent || span.textContent;
                    span.replaceWith(document.createTextNode(mainText));
                });
                
                // Get the clean text content
                let text = clonedP.textContent.trim();
                
                // Normalize whitespace and remove any special characters that might cause issues
                text = text.replace(/\s+/g, ' ');
                // Clean the text more thoroughly - keep only safe characters
                text = text.replace(/[^\u0900-\u097F\u0020-\u007E\u0964\u0965\u002C\u002E\u003A\u003B\u0021\u003F\u002D]/g, '');
                // Remove any remaining problematic sequences
                text = text.replace(/\u200C/g, ''); // Zero-width non-joiner
                text = text.replace(/\u200D/g, ''); // Zero-width joiner
                text = text.trim();
                
                // Add proper punctuation for better narration flow
                if (text && !text.endsWith('.') && !text.endsWith('।') && !text.endsWith('।।')) {
                    text += '।';
                }
                
                console.log(`Paragraph ${index + 1} text:`, text);
                return text;
            })
            .filter(text => text.length > 0) // Remove empty strings
            .join(' '); // Join with space for natural flow
    }
    
    // Add poem content if it exists
    if (poemText) {
        // Always add a small pause after the title before starting the poem
        if (storyText.length > 0 && (isKavitaPart || isAuthorIntroPart)) {
            storyText += " ";  // Just add a space for natural pause
        }
        
        // Process poem content line by line with pauses between verses
        const poemLines = poemText.innerHTML.split('<br>').map(line => line.trim());
        
        // Custom processing to handle specific lines without adding a dot before them
        const processedPoemText = poemLines.reduce((result, line, index) => {
            // Check if this is one of the specific lines we want to avoid adding a dot before
            const isSpecificLine = line.startsWith("क्षुधार्त रंतिदेव ने") || 
                                  line.startsWith("रहो न भूल के कभी मदांध तुच्छ वित्त में") ||
                                  line.includes("'मनुष्य मात्र बंधु है'");
            
            // If this is the first line or a special line, don't add a dot before it
            if (index === 0 || isSpecificLine) {
                return result + line;
            } else {
                // For all other lines, add the dot separator
                return result + '. ' + line;
            }
        }, '');
        
        const finalPoemText = processedPoemText.replace(/\s+/g, ' ').trim();
        storyText += finalPoemText;
    }
    
    console.log(`Prepared text for narration (${storyText.length} characters):`, storyText.substring(0, 200) + '...');
    
    // Validate text before narration
    if (!storyText || storyText.trim().length === 0) {
        console.error('No text to narrate');
        alert('पाठ सामग्री उपलब्ध नहीं है।');
        return;
    }
    
    // Check for potentially problematic characters
    const problematicChars = storyText.match(/[^\u0900-\u097F\u0020-\u007E\u0964\u0965\u002C\u002E\u003A\u003B\u0021\u003F\u002D]/g);
    if (problematicChars) {
        console.warn('Found potentially problematic characters:', problematicChars);
    }
    
    // Read the text aloud
    if (window.narrator && window.narrator.enabled) {
        try {
            // Show reading indicator - but not for the kavita section (partNumber === 2)
            const partContainer = document.getElementById(`storyPart${partNumber}`);
            if (partContainer && partNumber !== 2) {
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
                // Only try to remove the indicator if it's not the kavita section
                if (partNumber !== 2) {
                    const indicator = document.getElementById(`reading-indicator-${partNumber}`);
                    if (indicator) {
                        indicator.classList.add('fade-out');
                        setTimeout(() => {
                            if (indicator.parentNode) indicator.remove();
                        }, 500);
                    }
                }
                
                if (window.readingTimeout && typeof clearTimeout === 'function') {
                    clearTimeout(window.readingTimeout);
                }
            };
            
            // Try breaking the text into smaller chunks if it's the poem (part 2) or if it's long
            if ((partNumber === 2 && storyText.length > 500) || (partNumber === 1 && storyText.length > 800)) {
                // Split the text into manageable chunks
                const chunks = [];
                
                if (partNumber === 1) {
                    // For लेखक परिचय (part 1), split by sentences/paragraphs
                    const sentences = storyText.split('।');
                    let currentChunk = '';
                    
                    sentences.forEach((sentence, index) => {
                        // Add back the removed delimiter
                        const sentenceWithDelimiter = index < sentences.length - 1 ? sentence + '।' : sentence;
                        
                        if (currentChunk.length + sentenceWithDelimiter.length < 300) {
                            currentChunk += sentenceWithDelimiter;
                        } else {
                            if (currentChunk.trim()) chunks.push(currentChunk.trim());
                            currentChunk = sentenceWithDelimiter;
                        }
                    });
                    
                    // Add the last chunk if not empty
                    if (currentChunk.trim()) {
                        chunks.push(currentChunk.trim());
                    }
                } else {
                    // For कविता (part 2), split by verses as before
                    let currentChunk = '';
                    const sentences = storyText.split('।');
                    
                    sentences.forEach((sentence, index) => {
                        const sentenceWithDelimiter = index < sentences.length - 1 ? sentence + '।' : sentence;
                        
                        if (currentChunk.length + sentenceWithDelimiter.length < 200) {
                            currentChunk += sentenceWithDelimiter;
                        } else {
                            chunks.push(currentChunk);
                            currentChunk = sentenceWithDelimiter;
                        }
                    });
                    
                    if (currentChunk.trim()) {
                        chunks.push(currentChunk);
                    }
                }
                
                console.log(`Breaking text into ${chunks.length} chunks for part ${partNumber}`);
                
                // Speak each chunk with a small delay between them
                let chunkIndex = 0;
                
                const speakNextChunk = () => {
                    if (chunkIndex < chunks.length) {
                        const chunk = chunks[chunkIndex];
                        console.log(`Speaking chunk ${chunkIndex + 1}/${chunks.length}:`, chunk.substring(0, 100) + '...');
                        
                        // Set up callback for when this chunk ends
                        window.narrator.onEndCallback = () => {
                            chunkIndex++;
                            // Add a longer delay to ensure proper speech synthesis reset
                            setTimeout(speakNextChunk, 1000);
                        };
                        
                        // Add error handling for individual chunks
                        if (window.narrator.currentUtterance) {
                            window.narrator.currentUtterance.onerror = (event) => {
                                console.error(`Error in chunk ${chunkIndex + 1}:`, event.error);
                                if (event.error !== 'interrupted') {
                                    // Skip to next chunk on error
                                    chunkIndex++;
                                    setTimeout(speakNextChunk, 1000);
                                }
                            };
                        }
                        
                        // Speak this chunk
                        window.narrator.speak(chunk);
                    } else {
                        console.log('Finished reading all chunks');
                        // Final cleanup when all chunks are done - only if not kavita section
                        if (partNumber !== 2) {
                            const indicator = document.getElementById(`reading-indicator-${partNumber}`);
                            if (indicator) {
                                indicator.classList.add('fade-out');
                                setTimeout(() => {
                                    if (indicator.parentNode) indicator.remove();
                                }, 500);
                            }
                        }
                    }
                };
                
                // Start speaking chunks
                speakNextChunk();
            } else {
                // Start narration normally for non-poem parts or short text
                window.narrator.speak(storyText);
            }
            
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
        // Silent failure - don't show alert message
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
        const paragraphText = paragraph.textContent || '';
        const textLength = paragraphText.length;
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
            
            // Check if this paragraph contains the specific stanza text
            // Do not highlight or scroll if it's the specific stanza
            const isSpecificStanza = paragraphText.includes("क्षुधार्त रंतिदेव ने दिया करस्थ थाल भी") || 
                                    paragraphText.includes("तथा दधीचि ने दिया परार्थ अस्थिजाल भी");
            
            if (!isSpecificStanza) {
                // Add highlight to current paragraph
                paragraph.classList.add('paragraph-highlight');
                
                // Scroll to the paragraph
                paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
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

// Toggle read aloud functionality
function toggleReadAloud() {
    if (window.narrator) {
        if (window.narrator.currentUtterance) {
            stopNarration();
        } else {
            // Get current active story part
            const activePart = document.querySelector('.story-part.active');
            if (activePart) {
                const partNumber = parseInt(activePart.id.replace('storyPart', ''), 10);
                if (!isNaN(partNumber)) {
                    readStoryPartAloud(partNumber, true);
                }
            }
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
