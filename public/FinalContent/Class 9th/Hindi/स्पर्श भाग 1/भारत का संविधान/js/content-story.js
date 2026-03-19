/**
 * Story content and functionality for Bharat Ka Samvidhan
 */

// CRITICAL DEBUG: Confirm this file is being loaded
console.log('=== CONTENT-STORY.JS LOADED ===');
console.log('This should appear if content-story.js is being executed');

// Global variables to track narration state
let autoNarrationEnabled = true; // Set to true to match reference file behavior
let narrationDisabledByUser = false;
let currentStoryPart = 1;

// Track if we're in the story module - make it a window property for global access
window.isStoryModuleActive = false;

// Flag to track if initial narration has been triggered by main.js
window.initialStoryNarrationDone = false;

// Debug flag to enable verbose logging
const DEBUG_NARRATION = true;

// Story parts data
const storyParts = [
    {
        title: "भारत का संविधान - उद्देशिका (भाग 1)",
        content: `
            <div class="story-text">
                <h3>हम, भारत के लोग</h3>
                
                <p>भारत को एक <span class="highlight-vocab">संपूर्ण प्रभुत्व-संपन्न<span class="vocab-tooltip">पूर्णतः स्वतंत्र और सर्वोच्च शक्ति</span></span> <span class="highlight-vocab">समाजवादी<span class="vocab-tooltip">समाज में आर्थिक समानता का सिद्धांत</span></span> <span class="highlight-vocab">पंथनिरपेक्ष<span class="vocab-tooltip">किसी भी धर्म को राजकीय धर्म न मानना</span></span> <span class="highlight-vocab">लोकतंत्रात्मक<span class="vocab-tooltip">जनता द्वारा शासन</span></span> <span class="highlight-vocab">गणराज्य<span class="vocab-tooltip">जहाँ राष्ट्राध्यक्ष जनता द्वारा निर्वाचित हो</span></span> बनाने के लिए,</p>
                
                <p>तथा उसके समस्त नागरिकों को:</p>
                
                <div class="vocabulary-note">
                    <div class="word">संपूर्ण प्रभुत्व-संपन्न</div>
                    <div class="definition">पूर्णतः स्वतंत्र और सर्वोच्च शक्ति संपन्न। भारत किसी बाहरी शक्ति के अधीन नहीं है।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">समाजवादी</div>
                    <div class="definition">समाज में आर्थिक समानता का सिद्धांत। सभी नागरिकों को आर्थिक न्याय मिले।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">पंथनिरपेक्ष</div>
                    <div class="definition">किसी भी धर्म को राजकीय धर्म न मानना। सभी धर्मों के प्रति समान आदर।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">लोकतंत्रात्मक</div>
                    <div class="definition">जनता द्वारा शासन। शासन की शक्ति जनता में निहित है।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">गणराज्य</div>
                    <div class="definition">जहाँ राष्ट्राध्यक्ष जनता द्वारा निर्वाचित हो, वंशानुगत न हो।</div>
                </div>
                
                <h3>न्याय</h3>
                <p><strong>सामाजिक</strong> न्याय - समाज में सभी को समान अवसर और सम्मान</p>
                <p><strong>आर्थिक</strong> न्याय - धन का समान वितरण और आर्थिक समानता</p>
                <p><strong>राजनीतिक</strong> न्याय - सभी नागरिकों को समान राजनीतिक अधिकार</p>
                
                <h3>स्वतंत्रता</h3>
                <p><strong>विचार</strong> की स्वतंत्रता - सोचने की आजादी</p>
                <p><strong>अभिव्यक्ति</strong> की स्वतंत्रता - अपने विचार प्रकट करने की आजादी</p>
                <p><strong>विश्वास</strong> की स्वतंत्रता - किसी भी बात पर विश्वास करने की आजादी</p>
                <p><strong>धर्म</strong> की स्वतंत्रता - किसी भी धर्म को मानने की आजादी</p>
                <p><strong>उपासना</strong> की स्वतंत्रता - किसी भी तरीके से पूजा करने की आजादी</p>
                
                <h3>समता</h3>
                <p><strong>प्रतिष्ठा</strong> की समता - सभी नागरिकों को समान सम्मान</p>
                <p><strong>अवसर</strong> की समता - सभी को समान अवसर मिलें</p>
                
                <p>प्राप्त कराने के लिए,</p>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. भारत को किस प्रकार का गणराज्य बनाने की बात कही गई है?</div>
                <div class="comprehension-question">2. संविधान में कितने प्रकार के न्याय का उल्लेख है?</div>
                <div class="comprehension-question">3. नागरिकों को किन-किन स्वतंत्रताओं की गारंटी दी गई है?</div>
                <div class="comprehension-question">4. समता से क्या अभिप्राय है?</div>
            </div>
        `
    },
    {
        title: "भारत का संविधान - उद्देशिका (भाग 2)",
        content: `
            <div class="story-text">
                <h3>बंधुता</h3>
                
                <p>तथा उन सब में</p>
                
                <p>व्यक्ति की <span class="highlight-vocab">गरिमा<span class="vocab-tooltip">सम्मान और महत्व</span></span> और</p>
                
                <p><span class="highlight-vocab">राष्ट्र की एकता और अखंडता<span class="vocab-tooltip">देश की एकजुटता और अविभाज्यता</span></span> सुनिश्चित करने वाली <span class="highlight-vocab">बंधुता<span class="vocab-tooltip">भाईचारा, एकता की भावना</span></span></p>
                
                <p>बढ़ाने के लिए</p>
                
                <div class="vocabulary-note">
                    <div class="word">गरिमा</div>
                    <div class="definition">सम्मान और महत्व। प्रत्येक व्यक्ति का अपना सम्मान और महत्व है।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">एकता</div>
                    <div class="definition">एक होने का भाव। सभी नागरिक एक हैं।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">अखंडता</div>
                    <div class="definition">अविभाज्यता। देश विभाजित नहीं होगा।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">बंधुता</div>
                    <div class="definition">भाईचारा, एकता की भावना। सभी भारतवासी एक परिवार के सदस्य हैं।</div>
                </div>
                
                <h3>संविधान का अंगीकरण</h3>
                
                <p><span class="highlight-vocab">दृढ़संकल्प<span class="vocab-tooltip">पक्का इरादा</span></span> होकर अपनी इस संविधान सभा में आज तारीख <strong>26 नवंबर, 1949 ई.</strong> को एतद्द्वारा इस संविधान को <span class="highlight-vocab">अंगीकृत<span class="vocab-tooltip">स्वीकार करना</span></span>, <span class="highlight-vocab">अधिनियमित<span class="vocab-tooltip">कानून बनाना</span></span> और <span class="highlight-vocab">आत्मार्पित<span class="vocab-tooltip">समर्पित करना</span></span> करते हैं।</p>
                
                <div class="vocabulary-note">
                    <div class="word">दृढ़संकल्प</div>
                    <div class="definition">पक्का इरादा। भारत के लोगों का दृढ़ निश्चय।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">अंगीकृत</div>
                    <div class="definition">स्वीकार करना। संविधान को स्वीकार करना।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">अधिनियमित</div>
                    <div class="definition">कानून बनाना। संविधान को कानूनी रूप देना।</div>
                </div>
                
                <div class="vocabulary-note">
                    <div class="word">आत्मार्पित</div>
                    <div class="definition">समर्पित करना। अपने आप को संविधान के प्रति समर्पित करना।</div>
                </div>
                
                <h3>महत्वपूर्ण तिथियाँ</h3>
                <ul>
                    <li><strong>26 नवंबर 1949</strong> - संविधान को अंगीकृत किया गया</li>
                    <li><strong>26 जनवरी 1950</strong> - संविधान लागू किया गया</li>
                </ul>
                
                <h3>संशोधन</h3>
                <p><strong>42वाँ संशोधन अधिनियम, 1976:</strong></p>
                <ul>
                    <li>"समाजवादी" और "पंथनिरपेक्ष" शब्द जोड़े गए</li>
                    <li>"राष्ट्र की एकता" के स्थान पर "राष्ट्र की एकता और अखंडता" लिखा गया</li>
                </ul>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. बंधुता से क्या तात्पर्य है?</div>
                <div class="comprehension-question">2. संविधान कब अंगीकृत किया गया?</div>
                <div class="comprehension-question">3. संविधान कब लागू किया गया?</div>
                <div class="comprehension-question">4. 42वें संशोधन में कौन से शब्द जोड़े गए?</div>
            </div>
        `
    }
];

// Show a specific part of the story
function showStoryPart(partNumber) {
    // CRITICAL DEBUG: Confirm this function is being called
    console.log('=== CONTENT showStoryPart CALLED ===');
    console.log(`=== CONTENT showStoryPart(${partNumber}) ===`);
    
    // Simplified implementation to match reference file behavior
    console.log(`[DEBUG] showStoryPart(${partNumber}) called`);
    
    // Validate part number
    if (partNumber < 1 || partNumber > storyParts.length) {
        console.error(`Invalid part number: ${partNumber}`);
        return;
    }
    
    // Get part title
    const partTitle = storyParts[partNumber-1].title;
    
    // Log part switch (matching reference file)
    console.log(`Switched to part ${partNumber}: ${partTitle}`);
    
    // Set story module as active
    window.isStoryModuleActive = true;
    currentStoryPart = partNumber;
    console.log(`Active tab part: ${currentStoryPart}, requested part: ${partNumber}`);
    
    console.log(`[DEBUG] Story module state: isStoryModuleActive=${window.isStoryModuleActive}, currentStoryPart=${currentStoryPart}`);
    
    // Update global narration state
    if (window.globalNarrationState) {
        window.globalNarrationState.currentModule = 'story';
        window.globalNarrationState.currentPart = partNumber;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        if (index === partNumber - 1) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
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
    
    // Stop any ongoing narration immediately
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    
    if (window.narrator) {
        window.narrator.stop();
        
        // Clear any reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            if (indicator.parentNode) indicator.remove();
        });
        
        // Paragraph highlighting has been disabled
    }
    
    // Clear any timeouts
    if (window.readingTimeout) clearTimeout(window.readingTimeout);
    if (window.highlightTimeouts) {
        window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
        window.highlightTimeouts = [];
    }
    
    // Only start narration if this is not an automatic module switch
    // This prevents double narration when the module is first loaded
    console.log(`Setting up narration timeout for part ${partNumber}`);
    setTimeout(() => {
        console.log(`Narration timeout fired for part ${partNumber}, isStoryModuleActive: ${window.isStoryModuleActive}`);
        
        // Check if this is a manual part change (not the initial module load)
        // We'll use a global flag to track if narration has already been triggered by main.js
        if (window.isStoryModuleActive && !window.initialStoryNarrationDone && partNumber === 1) {
            // For part 1, let main.js handle the initial narration
            console.log(`Skipping auto-narration for initial story load of part ${partNumber}`);
            window.initialStoryNarrationDone = true;
        } else if (window.isStoryModuleActive && partNumber > 1) {
            // For other parts, always narrate when changed
            console.log(`Auto-starting narration for story part ${partNumber}`);
            readStoryPartAloud(partNumber, false);
        } else {
            console.log(`Story module not active, skipping narration for part ${partNumber}`);
        }
    }, 100);
}

// Read a specific story part aloud
function readStoryPartAloud(partNumber, isManualCall = true) {
    // Simplified implementation to match reference file behavior
    console.log(`[DEBUG] readStoryPartAloud(${partNumber}, ${isManualCall}) called`);
    console.log(`Starting narration for part ${partNumber}`);
    
    // Set the flag to prevent duplicate narration
    if (partNumber === 1) {
        window.initialStoryNarrationDone = true;
    }
    
    // Check if we're still in the story module
    if (!window.isStoryModuleActive) {
        console.log('Narration skipped - no longer in story module');
        return;
    }
    
    console.log(`[DEBUG] Proceeding with narration for part ${partNumber}`);
    
    // Enable auto-narration when user manually starts reading
    if (isManualCall) {
        autoNarrationEnabled = true;
        narrationDisabledByUser = false;
    }
    
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    if (partNumber < 1 || partNumber > storyParts.length) {
        console.error(`Invalid part number: ${partNumber}`);
        return;
    }
    
    // Stop any ongoing narration immediately
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    
    if (window.narrator) {
        window.narrator.stop();
    }
    
    // Process the story part immediately
    console.log(`[DEBUG] Calling readStoryPartAloudInternal for part ${partNumber}`);
    readStoryPartAloudInternal(partNumber, isManualCall);
}

// Internal function to handle the actual narration
function readStoryPartAloudInternal(partNumber, isManualCall = true) {
    console.log(`[DEBUG] readStoryPartAloudInternal(${partNumber}, ${isManualCall}) called`);
    
    const part = storyParts[partNumber - 1];
    if (!part) {
        console.error(`Story part ${partNumber} not found`);
        return;
    }
    
    // Double-check we're still in story module
    if (!window.isStoryModuleActive) {
        console.log('Story module no longer active, skipping narration');
        return;
    }
    
    console.log(`[DEBUG] Processing story part ${partNumber}: ${part.title}`);
    
    // Extract plain text from the story part
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = part.content;
    
    // Get story text container first
    const storyText = tempDiv.querySelector('.story-text');
    if (!storyText) {
        console.error(`Story text container not found in part ${partNumber}`);
    }
    
    // Also get the actual DOM element for this part (not just the temp div)
    const actualPartContainer = document.getElementById(`storyPart${partNumber}`);
    
    // Get all headings and paragraphs - DIRECTLY FROM THE ACTUAL DOM
    // This is critical to ensure we get the real content that's displayed
    let headings = [];
    let paragraphs = [];
    let domHeadings = [];
    
    // First try to get content from the actual rendered DOM (most reliable)
    if (actualPartContainer) {
        const actualStoryText = actualPartContainer.querySelector('.story-text');
        if (actualStoryText) {
            domHeadings = actualStoryText.querySelectorAll('h3');
            paragraphs = actualStoryText.querySelectorAll('p');
            console.log(`Found ${domHeadings.length} headings and ${paragraphs.length} paragraphs in actual DOM`);
            
            // Use DOM headings as our primary source
            headings = domHeadings;
        }
    }
    
    // If we couldn't find content in the DOM, fall back to template content
    if (headings.length === 0) {
        headings = storyText ? storyText.querySelectorAll('h3') : [];
        console.log(`Falling back to template: Found ${headings.length} headings in template`);
    }
    
    if (paragraphs.length === 0) {
        paragraphs = storyText ? storyText.querySelectorAll('p') : tempDiv.querySelectorAll('p');
        console.log(`Falling back to template: Found ${paragraphs.length} paragraphs in template`);
    }
    
    // DIRECT DEBUG: Log the actual content of headings and paragraphs
    console.log("HEADINGS CONTENT:");
    Array.from(headings).forEach((h, i) => console.log(`Heading ${i+1}: "${h.textContent.trim()}"`));
    
    console.log("PARAGRAPHS CONTENT (first 50 chars):");
    Array.from(paragraphs).forEach((p, i) => {
        const text = p.textContent.trim();
        console.log(`Paragraph ${i+1}: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
    });
    
    // Get all list items for narration
    const listItems = storyText ? storyText.querySelectorAll('li') : [];
    
    // Filter out empty paragraphs and those that are part of vocabulary notes
    const validParagraphs = Array.from(paragraphs).filter(p => {
        // Skip if it's empty
        if (p.textContent.trim().length === 0) {
            return false;
        }
        
        // Skip if it's inside a vocabulary note
        if (p.closest('.vocabulary-note')) {
            return false;
        }
        
        // Skip if it's inside a comprehension check
        if (p.closest('.comprehension-check')) {
            return false;
        }
        
        // Skip if it's a button or interactive element
        if (p.closest('button') || p.tagName === 'BUTTON') {
            return false;
        }
        
        return true;
    });
    
    // Log paragraph processing (matching reference file)
    console.log(`[DEBUG] Found ${validParagraphs.length} valid paragraphs for part ${partNumber}`);
    console.log(`Found ${headings.length} headings: ${Array.from(headings).map(h => h.textContent.trim()).join(', ')}`);
    console.log(`Found ${listItems.length} list items`);
    console.log(`Processing ${validParagraphs.length} paragraphs, ${headings.length} headings, and ${listItems.length} list items for part ${partNumber}`);
    
    // Extract text content to read
    let storyTextContent = '';
    
    // Always include the title first
    storyTextContent += `${part.title}. `;
    
    // Get all content elements in order (h3 and p) from the DOM
    // This ensures we read content in the natural top-to-bottom flow
    if (actualPartContainer) {
        const actualStoryText = actualPartContainer.querySelector('.story-text');
        if (actualStoryText) {
            console.log("Getting all content elements in natural reading order");
            
            // Get all elements in the story text container - this preserves the natural order
            const allElements = actualStoryText.children;
            console.log(`Found ${allElements.length} total elements in story text`);
            
            // Process each element in order (headings, paragraphs, etc.)
            Array.from(allElements).forEach(element => {
                // Skip vocabulary notes and other non-content elements
                if (element.classList.contains('vocabulary-note') || 
                    element.classList.contains('comprehension-check') ||
                    element.tagName === 'BUTTON') {
                    return;
                }
                
                // Process based on element type
                if (element.tagName === 'H3') {
                    // It's a heading
                    const headingText = element.textContent.trim();
                    if (headingText.length > 0) {
                        storyTextContent += `${headingText}. `;
                        console.log(`Added heading in sequence: "${headingText}"`);
                    }
                } 
                else if (element.tagName === 'P') {
                    // It's a paragraph
                    // Create a clone to work with
                    const pClone = element.cloneNode(true);
                    
                    // Remove all vocabulary tooltips from the clone
                    const tooltips = pClone.querySelectorAll('.vocab-tooltip');
                    tooltips.forEach(tooltip => tooltip.remove());
                    
                    // Get the text without tooltips
                    let text = pClone.textContent.trim();
                    
                    // Skip empty paragraphs
                    if (text.length === 0) return;
                    
                    // Normalize whitespace
                    text = text.replace(/\s+/g, ' ');
                    storyTextContent += `${text}. `;
                    console.log(`Added paragraph in sequence: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
                }
                else if (element.tagName === 'UL' || element.tagName === 'OL') {
                    // It's a list
                    const listItems = element.querySelectorAll('li');
                    if (listItems.length > 0) {
                        Array.from(listItems).forEach(item => {
                            const itemText = item.textContent.trim();
                            if (itemText.length > 0) {
                                storyTextContent += `${itemText}. `;
                                console.log(`Added list item in sequence: "${itemText.substring(0, 50)}${itemText.length > 50 ? '...' : ''}"`);
                            }
                        });
                    }
                }
            });
        }
    }
    
    // If we couldn't get content from the DOM, fall back to the old method
    if (storyTextContent.length <= part.title.length + 2) { // Only title was added
        console.log("Falling back to separate headings and paragraphs method");
        
        // Check if this is part 1 - if so, ensure we include "हम, भारत के लोग"
        if (partNumber === 1) {
            console.log("This is part 1 - ensuring we include the preamble text");
            const preambleText = "हम, भारत के लोग";
            if (!storyTextContent.includes(preambleText)) {
                storyTextContent += `${preambleText}. `;
            }
        }
        
        // Add headings
        if (headings.length > 0) {
            Array.from(headings).forEach(heading => {
                const headingText = heading.textContent.trim();
                if (!storyTextContent.includes(headingText)) {
                    storyTextContent += `${headingText}. `;
                }
            });
        }
        
        // Add paragraphs
        if (paragraphs.length > 0) {
            const validParas = Array.from(paragraphs).filter(p => 
                !p.closest('.vocabulary-note') && 
                !p.closest('.comprehension-check') && 
                !p.closest('button') && 
                p.tagName !== 'BUTTON'
            );
            
            validParas.forEach(p => {
                const pClone = p.cloneNode(true);
                const tooltips = pClone.querySelectorAll('.vocab-tooltip');
                tooltips.forEach(tooltip => tooltip.remove());
                
                const text = pClone.textContent.trim().replace(/\s+/g, ' ');
                if (text.length > 0) {
                    storyTextContent += `${text}. `;
                }
            });
        }
    }

// We now handle list items in the main content loop above
// This section is kept as a fallback only if we couldn't process the content in sequence
if (storyTextContent.length <= part.title.length + 2 && listItems.length > 0) {
    console.log(`Fallback: Adding ${listItems.length} list items to narration content`);
    const listItemTexts = Array.from(listItems).map(item => {
        // Create a clone of the list item to work with
        const itemClone = item.cloneNode(true);
        
        // Remove any tooltips or other non-readable elements
        const tooltips = itemClone.querySelectorAll('.vocab-tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
        
        // Get the text without tooltips
        let text = itemClone.textContent.trim();
        
        // Normalize whitespace
        text = text.replace(/\s+/g, ' ');
        return text;
    }).filter(text => text.length > 0); // Remove empty strings
    
    storyTextContent += ' ' + listItemTexts.join('. ') + '.';
}
    
    // Read the text aloud
    if (window.narrator && window.narrator.enabled) {
        // Make sure user interaction is tracked
        if (typeof trackUserInteraction === 'function') {
            const interacted = trackUserInteraction();
            
            // Force user interaction to true if it's not already set
            if (!interacted && window.userInteracted !== undefined) {
                window.userInteracted = true;
            }
        }
        
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
                }, Math.min(storyTextContent.length * 100, 60000)); // Dynamic timeout based on text length, max 1 minute
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
            try {
                // Ensure speech synthesis is available and ready
                if (window.speechSynthesis) {
                    if (DEBUG_NARRATION) {
                        console.log(`[NARRATION DEBUG] Starting narration in readStoryPartAloudInternal for part ${partNumber}`);
                        console.log(`[NARRATION DEBUG] Speech synthesis state before cancel:`, {
                            speaking: window.speechSynthesis.speaking,
                            pending: window.speechSynthesis.pending,
                            paused: window.speechSynthesis.paused
                        });
                        
                        // Log full debug state
                        if (typeof window.debugNarration === 'function') {
                            window.debugNarration();
                        }
                    }
                    
                    // Reset the speech synthesis if it's in a bad state
                    window.speechSynthesis.cancel();
                    
                    if (DEBUG_NARRATION) {
                        console.log(`[NARRATION DEBUG] Speech synthesis state after cancel:`, {
                            speaking: window.speechSynthesis.speaking,
                            pending: window.speechSynthesis.pending,
                            paused: window.speechSynthesis.paused
                        });
                    }
                    
                    // Small pause to ensure the reset is complete
                    setTimeout(() => {
                        try {
                            // Check if we're still in the story module
                            if (!window.isStoryModuleActive) {
                                if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Story module no longer active before starting chunks, aborting narration`);
                                return;
                            }
                            
                            // Log the full text to be narrated to help debug
                            console.log(`Full text to narrate (${storyTextContent.length} chars): "${storyTextContent.substring(0, 200)}..."`);
                            
                            // Split the content into manageable chunks for better narration of large text
                            const chunks = splitTextIntoChunks(storyTextContent, 300); // Increased chunk size for better flow
                            
                            if (DEBUG_NARRATION) {
                                console.log(`[NARRATION DEBUG] Full text to narrate length: ${storyTextContent.length} chars`);
                                console.log(`[NARRATION DEBUG] Split story content into ${chunks.length} chunks`);
                            }
                            console.log(`Story text split into ${chunks.length} chunks for narration`);
                            
                            // Speak each chunk sequentially
                            speakChunksSequentially(chunks);
                        } catch (innerError) {
                            // Handle error silently
                            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Error in narration timeout:`, innerError);
                        }
                    }, 100);
                }
            } catch (e) {
                // Handle error silently
                if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Error in narration start:`, e);
            }
            
            // Highlight paragraphs as they are being read
            const elementsToHighlight = [...validParagraphs];
            if (storyText) {
                elementsToHighlight.push(storyText);
            }
            highlightParagraphsSequentially(elementsToHighlight);
            
        } catch (error) {
            alert('क्षमा करें, वाचन शुरू करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
        }
    } else {
        alert('आपके ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है।');
    }
}

// Stop ongoing narration
function stopNarration() {
    if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] stopNarration() called`);
    
    if (window.narrator) {
        // First cancel speech synthesis directly
        if (window.speechSynthesis) {
            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Speech synthesis state before cancel in stopNarration:`, {
                speaking: window.speechSynthesis.speaking,
                pending: window.speechSynthesis.pending,
                paused: window.speechSynthesis.paused
            });
            
            console.log('Canceling speech synthesis directly from stopNarration');
            window.speechSynthesis.cancel();
            
            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Speech synthesis state after cancel in stopNarration:`, {
                speaking: window.speechSynthesis.speaking,
                pending: window.speechSynthesis.pending,
                paused: window.speechSynthesis.paused
            });
        }
        
        // Then use narrator's stop method
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Calling narrator.stop() in stopNarration`);
        window.narrator.stop();
        
        // Disable auto-narration when user manually stops
        autoNarrationEnabled = false;
        narrationDisabledByUser = true; // Mark that user has disabled narration
        
        // Update global narration state
        if (window.globalNarrationState) {
            window.globalNarrationState.disabledByUser = true;
        }
        
        // Remove all reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Paragraph highlighting has been disabled
        
        // Clear any timeouts
        if (window.readingTimeout && typeof clearTimeout === 'function') {
            clearTimeout(window.readingTimeout);
            window.readingTimeout = null;
        }
        
        if (window.highlightTimeouts && typeof clearTimeout === 'function') {
            window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
            window.highlightTimeouts = [];
        }
        
        console.log('Narration stopped by user');
    }
}

// Highlight paragraphs sequentially as they are being read - DISABLED
function highlightParagraphsSequentially(paragraphs) {
    // This function has been disabled to remove paragraph highlighting during narration
    // We'll still keep track of the timeouts for cleanup purposes
    
    // Clear any existing highlight timeouts
    if (window.highlightTimeouts && typeof clearTimeout === 'function') {
        window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
    }
    
    window.highlightTimeouts = [];
    
    // Remove any existing highlights
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    // Calculate approximate time per paragraph based on length (for auto-scroll functionality)
    const totalTextLength = paragraphs.reduce((sum, p) => sum + p.textContent.length, 0);
    let cumulativeLength = 0;
    
    // Estimate total reading time (about 12 characters per second - slightly slower for better sync)
    const totalReadingTime = totalTextLength / 12 * 1000;
    
    // Handle auto-scrolling without highlighting
    paragraphs.forEach((paragraph, index) => {
        const textLength = paragraph.textContent.length;
        const startPercentage = cumulativeLength / totalTextLength;
        cumulativeLength += textLength;
        
        // Calculate when to scroll to this paragraph
        const scrollTime = startPercentage * totalReadingTime;
        
        // Set timeout for scrolling only
        const scrollTimeout = setTimeout(() => {
            // Only proceed if narration is still active (check for reading indicator)
            if (document.querySelector('.reading-indicator')) {
                // Only handle scrolling, no highlighting
                // Scroll to the paragraph with proper container reference
                const container = document.querySelector('.story-content');
                if (container) {
                    // Calculate if paragraph is visible
                    const paragraphRect = paragraph.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    
                    // If paragraph is not fully visible, scroll to it
                    if (paragraphRect.top < containerRect.top || 
                        paragraphRect.bottom > containerRect.bottom) {
                        container.scrollTop = paragraph.offsetTop - container.offsetTop - 100;
                    }
                }
            }
        }, scrollTime);
        
        window.highlightTimeouts.push(scrollTimeout);
    });
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
    // Force user interaction flag
    if (window.userInteracted !== undefined) {
        window.userInteracted = true;
    }
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    
    // Get the currently active story part
    const activeBtn = document.querySelector('.story-nav-btn.active');
    if (activeBtn) {
        try {
            // Extract the part number from the onclick attribute
            const onclickAttr = activeBtn.getAttribute('onclick');
            const match = onclickAttr.match(/showStoryPart\((\d+)\)/);
            if (match && match[1]) {
                const partNumber = parseInt(match[1]);
                
                // Cancel any ongoing narration first
                if (window.narrator && window.narrator.currentUtterance) {
                    window.narrator.stop();
                }
                
                // Wait a moment to ensure any previous narration has stopped
                setTimeout(() => {
                    // Call the read aloud function with the current part number
                    readStoryPartAloud(partNumber, true); // true means it's a manual call
                }, 100);
            }
        } catch (e) {
            // Handle error silently
        }
    } else {
        // If no active button is found, default to part 1
        setTimeout(() => {
            readStoryPartAloud(1, true);
        }, 100);
    }
}

// Split text into manageable chunks for narration
function splitTextIntoChunks(text, chunkSize = 150) { // Reduced chunk size for better handling
    // Try to split at sentence boundaries (including Hindi danda)
    const sentences = text.match(/[^.!?\u0964]+[.!?\u0964]+/g) || [];
    
    if (sentences.length === 0) {
        // If no sentence boundaries found, split by commas or other punctuation
        const fragments = text.match(/[^,;:\u0964]+[,;:\u0964]*/g) || [];
        if (fragments.length > 1) {
            return splitFragmentsIntoChunks(fragments, chunkSize);
        }
        return [text];
    }
    
    const chunks = [];
    let currentChunk = '';
    
    sentences.forEach(sentence => {
        // If the sentence itself is very long, split it further
        if (sentence.length > chunkSize * 1.5) {
            if (currentChunk) {
                chunks.push(currentChunk);
                currentChunk = '';
            }
            
            // Split long sentence by commas or other punctuation
            const fragments = sentence.match(/[^,;:\u0964]+[,;:\u0964]*/g) || [sentence];
            if (fragments.length > 1) {
                const sentenceChunks = splitFragmentsIntoChunks(fragments, chunkSize);
                chunks.push(...sentenceChunks);
            } else {
                // If no punctuation to split by, just add as is
                chunks.push(sentence);
            }
        }
        // If adding this sentence would make the chunk too long, start a new chunk
        else if (currentChunk.length + sentence.length > chunkSize) {
            if (currentChunk) {
                chunks.push(currentChunk);
            }
            currentChunk = sentence;
        } else {
            currentChunk += sentence;
        }
    });
    
    // Add the last chunk if it's not empty
    if (currentChunk) {
        chunks.push(currentChunk);
    }
    
    return chunks.length ? chunks : [text];
}

// Helper function to split text fragments into chunks
function splitFragmentsIntoChunks(fragments, chunkSize) {
    const chunks = [];
    let currentChunk = '';
    
    fragments.forEach(fragment => {
        if (currentChunk.length + fragment.length > chunkSize) {
            if (currentChunk) {
                chunks.push(currentChunk);
            }
            currentChunk = fragment;
        } else {
            currentChunk += fragment;
        }
    });
    
    if (currentChunk) {
        chunks.push(currentChunk);
    }
    
    return chunks;
}

// Speak text chunks sequentially
function speakChunksSequentially(chunks, index = 0) {
    if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] speakChunksSequentially(chunks[${chunks.length}], ${index}) called`);
    
    // Process chunks sequentially to handle large text better
    
    if (index >= chunks.length) {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] All chunks processed, ending sequence`);
        return;
    }
    
    // Check if narration should continue
    if (window.narrator && !window.narrator.enabled) {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Narration stopped - narrator disabled`);
        console.log('Narration stopped - narrator disabled');
        return;
    }
    
    // CRITICAL CHECK: Check if we're still in story module
    if (!window.isStoryModuleActive) {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Story module no longer active in speakChunksSequentially, stopping narration`);
        // Force immediate speech synthesis cancellation
        if (window.speechSynthesis) {
            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Force canceling speech synthesis in speakChunksSequentially`);
            window.speechSynthesis.cancel();
        }
        return;
    }
    
    try {
        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        
        // Add debug logging
        console.log(`Speaking chunk ${index+1} of ${chunks.length}, length: ${chunks[index].length}`);
        
        // Apply voice settings if available
        if (window.narrator && window.narrator.voice) {
            utterance.voice = window.narrator.voice;
            
            // Apply the same optimization parameters as in the narrator
            if (window.narrator.optimizeVoiceParameters) {
                window.narrator.optimizeVoiceParameters(utterance);
            }
        }
        
        // Set event handlers
        utterance.onend = () => {
            // Speak the next chunk with minimal delay for smoother narration
            setTimeout(() => {
                speakChunksSequentially(chunks, index + 1);
            }, 50); // Very short delay for smoother transitions between chunks
        };
        utterance.onerror = (event) => {
            console.error("Error speaking chunk:", event);
            // If error is interrupted, it's likely due to tab switching, so stop
            if (event.error === 'interrupted') {
                console.log('Narration interrupted - stopping sequence');
                return;
            }
            // Try to continue with the next chunk even if there's an error
            setTimeout(() => {
                speakChunksSequentially(chunks, index + 1);
            }, 500);
        };
        
        // Store current utterance in narrator for tracking
        if (window.narrator) {
            window.narrator.currentUtterance = utterance;
        }
        
        // Speak the chunk
        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.error("Error in speakChunksSequentially:", e);
        // Try to continue with the next chunk
        setTimeout(() => {
            speakChunksSequentially(chunks, index + 1);
        }, 500);
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

