/**
 * Story content and functionality for Nida Fazli's "Ab Kahan Dusre Ke Dukh Se Dukhi Hone Wale"
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;
let currentParagraphIndex = 0;
let paragraphElements = [];

// Show a specific part of the story
function showStoryPart(partNumber) {
    console.log(`showStoryPart called with partNumber: ${partNumber}, storyParts.length: ${storyParts.length}`);
    if (partNumber < 1 || partNumber > storyParts.length) {
        console.error(`Invalid part number: ${partNumber}, storyParts.length: ${storyParts.length}`);
        return;
    }
    
    console.log(`Loading story part ${partNumber}`);
    
    // Make sure we're in the story module first
    if (!document.getElementById('story').classList.contains('active')) {
        // Switch to story module first
        showModule('story');
        
        // Small delay to ensure module is loaded before showing the part
        setTimeout(() => {
            showStoryPartInternal(partNumber);
        }, 300); // Increased delay for better reliability
        return;
    }
    
    // If already in story module, show the part directly
    showStoryPartInternal(partNumber);
}

// Internal function to handle story part display
function showStoryPartInternal(partNumber) {
    console.log(`showStoryPartInternal called with partNumber: ${partNumber}`);
    
    // Convert partNumber to a number if it's a string
    partNumber = parseInt(partNumber, 10);
    
    // Map the part number to the correct index in the storyParts array
    let actualPartIndex;
    
    // Direct mapping based on part number
    switch(partNumber) {
        case 1: // लेखक परिचय
            actualPartIndex = 0;
            console.log("Showing लेखक परिचय (index 0)");
            break;
        case 3: // कहानी
            actualPartIndex = 1;
            console.log("Showing कहानी (index 1)");
            break;
        case 5: // शब्दार्थ और टिप्पणियाँ
            actualPartIndex = 2;
            console.log("Showing शब्दार्थ और टिप्पणियाँ (index 2)");
            break;
        case 2: // Fallback for शब्दार्थ और टिप्पणियाँ if button number is wrong
            actualPartIndex = 2;
            console.log("Using fallback for शब्दार्थ और टिप्पणियाँ (index 2)");
            break;
        default:
            // If the part number is out of our expected range, use a better fallback
            if (partNumber > 0 && partNumber <= storyParts.length) {
                // If the part number is valid as a 1-based index, use it
                actualPartIndex = partNumber - 1;
                console.log(`Using direct mapping for part ${partNumber} to index ${actualPartIndex}`);
            } else {
                actualPartIndex = 0; // Default to first part if not found
                console.log(`Unknown part number ${partNumber}, defaulting to index 0`);
            }
    }
    
    // Double-check the index is valid
    if (actualPartIndex === undefined || actualPartIndex < 0 || actualPartIndex >= storyParts.length) {
        console.error(`Invalid index ${actualPartIndex} for story part ${partNumber}, defaulting to first part`);
        actualPartIndex = 0;
    }
    
    // Special handling for shabdarth button
    if (partNumber === 5 && storyParts.length >= 3) {
        console.log("Ensuring शब्दार्थ और टिप्पणियाँ content is loaded");
        actualPartIndex = 2; // Force to load the third part (index 2)
    }
    
    // Update navigation buttons - match button index with the requested part number
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        // Map index to the corresponding part number (0->1, 1->3, 2->5)
        const buttonPartNumber = index === 0 ? 1 : 
                               (index === 1 ? 3 : 5);
        btn.classList.toggle('active', buttonPartNumber === partNumber);
        btn.setAttribute('aria-pressed', buttonPartNumber === partNumber ? 'true' : 'false');
    });
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) {
        console.error('Story content container not found');
        return;
    }
    
    // Create a container for this part if it doesn't exist
    const containerID = `storyPart${partNumber}`;
    console.log(`Looking for container with ID: "${containerID}"`);
    let partContainer = document.getElementById(containerID);
    if (!partContainer) {
        console.log(`Creating new container with ID: "${containerID}"`);
        partContainer = document.createElement('div');
        partContainer.id = containerID;
        partContainer.className = 'story-part';
        storyContent.appendChild(partContainer);
    } else {
        console.log(`Found existing container with ID: "${containerID}"`);
    }
    
    // Hide all parts and show the selected one
    document.querySelectorAll('.story-part').forEach(part => {
        part.classList.remove('active');
    });
    partContainer.classList.add('active');
    
    // Always reload the content to ensure it's up to date
    // Get the actual part using the index we found earlier
    console.log(`Attempting to access storyParts[${actualPartIndex}] for part number ${partNumber}`);
    const part = storyParts[actualPartIndex];
    if (!part) {
        console.error(`Story part ${partNumber} not found, actualPartIndex=${actualPartIndex}`);
        return;
    }
    console.log(`Found part with title: "${part.title}"`);
    console.log(`Part content begins with: "${part.content.substring(0, 50)}..."`);
    
    
    // Clear existing content and reload it
    console.log(`Updating content for container with ID: "${partContainer.id}"`);
    
    // Insert the HTML content
    try {
        partContainer.innerHTML = `
            <h3 class="story-part-title">${part.title}</h3>
            ${part.content}
        `;
        console.log(`Successfully updated content for part: "${part.title}"`);
    } catch (error) {
        console.error(`Error updating content: ${error.message}`);
    }
    
    // Add event listeners to vocabulary terms - without narration
    partContainer.querySelectorAll('.highlight-vocab').forEach(term => {
        term.addEventListener('click', function() {
            // Keep the clickability but don't narrate the meaning
            console.log('Vocabulary term clicked - narration disabled');
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

// Read current paragraph aloud
function readCurrentParagraph() {
    if (!paragraphElements || paragraphElements.length === 0) {
        console.log("No paragraphs found to read");
        return;
    }
    
    if (currentParagraphIndex >= paragraphElements.length) {
        console.log("End of text reached, resetting to beginning");
        currentParagraphIndex = 0;
    }
    
    const paragraph = paragraphElements[currentParagraphIndex];
    
    // Remove previous highlight
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    // Add highlight to current paragraph
    paragraph.classList.add('paragraph-highlight');
    
    // Scroll to the current paragraph
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Get the text to narrate
    let textToNarrate = paragraph.textContent.trim();
    
    // Narrate the text
    if (window.narrator) {
        window.narrator.speak(textToNarrate);
        
        // Set callback to read the next paragraph when this one ends
        window.narrator.onEndCallback = () => {
            currentParagraphIndex++;
            if (currentParagraphIndex < paragraphElements.length && autoNarrationEnabled) {
                setTimeout(() => {
                    readCurrentParagraph();
                }, 500);
            } else {
                // End of the current part
                console.log('End of current part');
                autoNarrationEnabled = false;
                
                // Remove highlight
                paragraph.classList.remove('paragraph-highlight');
            }
        };
    }
}

// Toggle read aloud for the current part
function readCurrentStoryPartAloud() {
    // Initialize paragraph elements if not done already
    const activeStoryPart = document.querySelector('.story-part.active');
    if (activeStoryPart) {
        // Collect all paragraphs from the active story part
        paragraphElements = Array.from(activeStoryPart.querySelectorAll('p:not(.vocab-tooltip)'));
        currentParagraphIndex = 0;
        
        console.log(`Found ${paragraphElements.length} paragraphs for narration`);
    } else {
        console.error('No active story part found');
        return;
    }
    
    // Start narration
    autoNarrationEnabled = true;
    narrationDisabledByUser = false;
    readCurrentParagraph();
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
    
    // Map the part number to the correct index in the storyParts array
    let actualPartIndex;
    
    // Direct mapping based on part number
    switch(partNumber) {
        case 1: // लेखक परिचय
            actualPartIndex = 0;
            break;
        case 3: // कहानी
            actualPartIndex = 1;
            break;
        case 5: // शब्दार्थ और टिप्पणियाँ
            actualPartIndex = 2;
            break;
        default:
            actualPartIndex = 0; // Default to first part if not found
    }
    
    const part = storyParts[actualPartIndex];
    if (!part) {
        console.error(`Story part ${partNumber} not found`);
        return;
    }
    
    // Extract plain text from the story part
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = part.content;
    
    // Get all paragraphs and remove vocabulary notes
    const paragraphs = tempDiv.querySelectorAll('p');
    
    // Filter out empty paragraphs and those that are part of vocabulary notes
    paragraphElements = Array.from(paragraphs).filter(p => {
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
    
    // Reset paragraph index
    currentParagraphIndex = 0;
    
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
    }
    
    // Begin reading paragraphs
    readCurrentParagraph();
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
    }
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
    feedbackMsg.textContent = 'शब्दार्थ हाइलाइट किए गए हैं। अर्थ देखने के लिए हाइलाइट किए गए शब्दों पर माउस होवर करें।';
    
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

// Story parts data
// Dedicated function to show Shabdarth and Tippaniyan content
function showShabdarthAndTippaniyan() {
    console.log("Direct function call to show शब्दार्थ और टिप्पणियाँ");
    
    // Make sure we're in the story module
    if (!document.getElementById('story').classList.contains('active')) {
        showModule('story');
        
        // Add delay before showing the part
        setTimeout(() => {
            forceLoadShabdarthContent();
        }, 300);
    } else {
        forceLoadShabdarthContent();
    }
}

// Helper function to directly load the shabdarth content
function forceLoadShabdarthContent() {
    if (storyParts.length < 3) {
        console.error("Error: storyParts array doesn't have enough elements");
        return;
    }
    
    // Get the shabdarth content directly from the array
    const shabdarthContent = storyParts[2];
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) {
        console.error('Story content container not found');
        return;
    }
    
    // Create or find the container for shabdarth content
    const containerID = 'storyPart5'; // This matches the expected ID from the button
    console.log(`Looking for container with ID: "${containerID}"`);
    let partContainer = document.getElementById(containerID);
    
    if (!partContainer) {
        console.log(`Creating new container with ID: "${containerID}"`);
        partContainer = document.createElement('div');
        partContainer.id = containerID;
        partContainer.className = 'story-part';
        storyContent.appendChild(partContainer);
    } else {
        console.log(`Found existing container with ID: "${containerID}"`);
    }
    
    // Hide all parts and show the selected one
    document.querySelectorAll('.story-part').forEach(part => {
        part.classList.remove('active');
    });
    partContainer.classList.add('active');
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === 2); // index 2 corresponds to shabdarth button
        btn.setAttribute('aria-pressed', index === 2 ? 'true' : 'false');
    });
    
    // Insert the content
    try {
        partContainer.innerHTML = `
            <h3 class="story-part-title">${shabdarthContent.title}</h3>
            ${shabdarthContent.content}
        `;
        console.log("Successfully loaded शब्दार्थ और टिप्पणियाँ content");
    } catch (error) {
        console.error(`Error loading शब्दार्थ और टिप्पणियाँ content: ${error}`);
    }
}

const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>निदा फ़ाजली का जन्म 12 अक्टूबर 1938 को दिल्ली में हुआ था। उनका बचपन ग्वालियर में बीता। उन्हें उर्दू की <span class="highlight-vocab">साठोत्तरी पीढ़ी<span class="vocab-tooltip">1960 के बाद की पीढ़ी</span></span> के महत्वपूर्ण कवियों में से एक माना जाता है।</p>
            
            <div class="vocabulary-note">
                <div class="word">साठोत्तरी पीढ़ी</div>
                <div class="definition">1960 के बाद की पीढ़ी</div>
            </div>
            
            <p>आम बोलचाल की भाषा में और सरलता से किसी के भी दिल और दिमाग में घर कर सकने वाली कविता लिखने की कला में वे माहिर थे। वही निदा फ़ाजली अपनी गद्य रचनाओं में शेर-ओ-शायरी पिरोकर बहुत कुछ थोड़े में कह देने के मामले में अपने किस्म के अकेले ही गद्यकार थे।</p>
            
            <p>निदा फ़ाजली की पहली कविता पुस्तक का नाम 'लफ़्जों का पुल' था। उन्हें 'खोया हुआ सा कुछ' काव्य संग्रह के लिए 1998 में साहित्य अकादमी पुरस्कार से सम्मानित किया गया था। उनकी आत्मकथा के दो भाग 'दीवारों के बीच' और 'दीवारों के पार' नाम से प्रकाशित हुए हैं।</p>
            
            <p>फिल्म उद्योग से भी जुड़े रहे निदा फ़ाजली का निधन 8 फरवरी 2016 को हुआ। प्रस्तुत पाठ 'अब कहाँ दूसरे के दुख से दुखी होने वाले' उनकी पुस्तक 'तमाशा मेरे आगे' से लिया गया है।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. निदा फ़ाजली का जन्म कब और कहाँ हुआ था?</div>
                <div class="comprehension-question">2. निदा फ़ाजली की साहित्यिक विशेषता क्या थी?</div>
                <div class="comprehension-question">3. निदा फ़ाजली को साहित्य अकादमी पुरस्कार किस रचना के लिए मिला था?</div>
            </div>
        `
    },
    {
        title: "कहानी",
        content: `
            <h3>अब कहाँ दूसरे के दुख से दुखी होने वाले</h3>
            
            <p><span class="highlight-vocab">बाइबिल<span class="vocab-tooltip">ईसाइयों का धर्मग्रंथ</span></span> के सोलोमेन जिन्हें कुरआन में सुलेमान कहा गया है, ईसा से 1025 वर्ष पूर्व एक बादशाह थे। कहा गया है, वह केवल मानव जाति के ही राजा नहीं थे, सारे छोटे-बड़े पशु-पक्षी के भी <span class="highlight-vocab">हाकिम<span class="vocab-tooltip">मालिक</span></span> थे। वह इन सबकी भाषा भी जानते थे। एक दफा सुलेमान अपने लश्कर के साथ एक रास्ते से गुज़र रहे थे। रास्ते में कुछ चीटियों ने घोड़ों की टापों की आवाज़ सुनी तो डर कर एक-दूसरे से कहा, 'आप जल्दी से अपने-अपने बिलों में चलो, फ़ौज आ रही है।' सुलेमान उनकी बातें सुनकर थोड़ी दूर पर रुक गए और चींटियों से बोले, 'घबराओ नहीं, सुलेमान को खुदा ने सबका रखवाला बनाया है। मैं किसी के लिए मुसीबत नहीं हूँ, सबके लिए मुहब्बत हूँ।" चींटियों ने उनके लिए ईश्वर से दुआ की और सुलेमान अपनी मंज़िल की ओर बढ़ गए।</p>
            
            <div class="vocabulary-note">
                <div class="word">बाइबिल</div>
                <div class="definition">ईसाइयों का धर्मग्रंथ</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">हाकिम</div>
                <div class="definition">मालिक</div>
            </div>
            
            <p>ऐसी एक घटना का ज़िक्र सिंधी भाषा के महाकवि शेख अयाज़ ने अपनी आत्मकथा में किया है। उन्होंने लिखा है-'एक दिन उनके पिता कुएँ से नहाकर लौटे। माँ ने भोजन परोसा। उन्होंने जैसे ही रोटी का कौर तोड़ा। उनकी नज़र अपनी बाजू पर पड़ी। वहाँ एक काला च्योंटा रेंग रहा था। वह भोजन छोड़कर उठ खड़े हुए।' माँ ने पूछा, 'क्या बात है? भोजन अच्छा नहीं लगा?" शेख अयाज़ के पिता बोले, 'नहीं, यह बात नहीं है। मैंने एक घर वाले को बेघर कर दिया है। उस बेघर को कुएँ पर उसके घर छोड़ने जा रहा हूँ।'</p>
            
            <p><span class="highlight-vocab">बाइबिल और दूसरे पावन ग्रंथों<span class="vocab-tooltip">पवित्र धार्मिक पुस्तकों</span></span> में नूह नाम के एक पैगंबर का ज़िक्र मिलता है। उनका असली नाम लशकर था, लेकिन अरब ने उनको नूह के <span class="highlight-vocab">लक़ब<span class="vocab-tooltip">पद सूचक नाम</span></span> से याद किया है। वह इसलिए कि आप सारी उम्र रोते रहे। इसका कारण एक ज़ख्मी कुत्ता था। नूह के सामने से एक बार एक घायल कुत्ता गुज़रा। नूह ने उसे दुत्कारते हुए कहा, 'दूर हो जा गंदे कुत्ते!" इस्लाम में कुत्तों को गंदा समझा जाता है। कुत्ते ने उनकी दुत्कार सुनकर जवाब दिया. 'न मैं अपनी मर्ज़ी से कुत्ता हूँ, न तुम अपनी पसंद से इनसान हो। बनाने वाला सबका तो वही एक है।'</p>
            
            <div class="vocabulary-note">
                <div class="word">पावन ग्रंथों</div>
                <div class="definition">पवित्र धार्मिक पुस्तकों</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">लक़ब</div>
                <div class="definition">पद सूचक नाम</div>
            </div>
            
            <p>मिट्टी से मिट्टी मिले, खो के सभी निशान। किसमें कितना कौन है, कैसे हो पहचान।</p>
            
            <p>नूह ने जब उसकी बात सुनी तो दुखी हो मुद्दत तक रोते रहे। 'महाभारत' में युधिष्ठिर का जो अंत तक साथ निभाता नज़र आता है, वह भी <span class="highlight-vocab">प्रतीकात्मक<span class="vocab-tooltip">प्रतीक स्वरूप</span></span> रूप में एक कुत्ता ही था। सब साथ छोड़ते गए तो केवल वही उनके एकांत को शांत कर रहा था।</p>
            
            <div class="vocabulary-note">
                <div class="word">प्रतीकात्मक</div>
                <div class="definition">प्रतीक स्वरूप</div>
            </div>
            
            <p>दुनिया कैसे वजूद में आई? पहले क्या थी? किस बिंदु से इसकी यात्रा शुरू हुई? इन प्रश्नों के उत्तर विज्ञान अपनी तरह से देता है, धार्मिक ग्रंथ अपनी-अपनी तरह से। संसार की रचना भले ही कैसे हुई हो, लेकिन धरती किसी एक की नहीं है। पंछी, मानव, पशु, नदी, पर्वत, समंदर आदि की इसमें बराबर की हिस्सेदारी है। यह और बात है कि इस हिस्सेदारी में मानव जाति ने अपनी बुद्धि से बड़ी-बड़ी दीवारें खड़ी कर दी हैं।</p>
            
            <p>पहले पूरा संसार एक परिवार के समान था अब टुकड़ों में बँटकर एक-दूसरे से दूर हो चुका है। पहले बड़े-बड़े <span class="highlight-vocab">दालानों-आँगनों<span class="vocab-tooltip">बरामदों और आँगनों</span></span> में सब मिल-जुलकर रहते थे अब छोटे-छोटे डिब्बे जैसे घरों में जीवन <span class="highlight-vocab">सिमटने<span class="vocab-tooltip">सिकुड़ना</span></span> लगा है। बढ़ती हुई आबादियों ने समंदर को पीछे सरकाना शुरू कर दिया है, पेड़ों को रास्तों से हटाना शुरू कर दिया है, फैलते हुए प्रदूषण ने पंछियों को बस्तियों से भगाना शुरू कर दिया है। बारूदों की विनाशलीलाओं ने वातावरण को सताना शुरू कर दिया। अब गरमी में ज्यादा गरमी, बेवक़्त की बरसातें, <span class="highlight-vocab">जलज़ले<span class="vocab-tooltip">भूकंप</span></span>, <span class="highlight-vocab">सैलाब<span class="vocab-tooltip">बाढ़</span></span>, तूफ़ान और नित नए रोग, मानव और प्रकृति के इसी असंतुलन के परिणाम हैं। नेचर की सहनशक्ति की एक सीमा होती है। नेचर के गुस्से का एक नमूना कुछ साल पहले बंबई (मुंबई) में देखने को मिला था और यह नमूना इतना डरावना था कि बंबई के निवासी डरकर अपने-अपने पूजा-स्थल में अपने खुदाओं से प्रार्थना करने लगे थे।</p>
            
            <div class="vocabulary-note">
                <div class="word">दालानों-आँगनों</div>
                <div class="definition">बरामदों और आँगनों</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">सिमटना</div>
                <div class="definition">सिकुड़ना</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">जलज़ले</div>
                <div class="definition">भूकंप</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">सैलाब</div>
                <div class="definition">बाढ़</div>
            </div>
            
            <p>कई सालों से बड़े-बड़े बिल्डर समंदर को पीछे धकेल कर उसकी ज़मीन को हथिया रहे थे। बेचारा समंदर लगातार सिमटता जा रहा था। पहले उसने अपनी बाहें समेटीं, थोड़ा सिकुड़कर बैठ गया। फिर जगह कम पड़ी तो उकड़ुँ बैठ गया। फिर खड़ा हो गया। जब खड़े रहने की जगह कम पड़ी तो उसे गुस्सा आ गया। जो जितना बड़ा होता है उसे उतना ही कम गुस्सा आता है। परंतु आता है तो रोकना मुश्किल हो जाता है, और यही हुआ, उसने एक रात अपनी लहरों पर दौड़ते हुए तीन जहाजों को उठाकर बच्चों की गेंद की तरह तीन दिशाओं में फेंक दिया। एक वर्सोवा के समंदर के किनारे पर आकर गिरा, दूसरा बांद्रा में कार्ट रोड के सामने औधे मुँह और तीसरा गेट-वे-ऑफ इंडिया पर टूट-फूटकर <span class="highlight-vocab">सैलानियों<span class="vocab-tooltip">पर्यटकों</span></span> का नज़ारा बना। बावजूद कोशिश, वे फिर से चलने-फिरने के काबिल नहीं हो सके।</p>
            
            <div class="vocabulary-note">
                <div class="word">सैलानी</div>
                <div class="definition">पर्यटक</div>
            </div>
            
            <p>मेरी माँ कहती थी, सूरज ढले आँगन के पेड़ों से पत्ते मत तोड़ो, पेड़ रोएँगे। दीया-बत्ती के वक्त फूलों को मत तोड़ो, फूल बददुआ देते हैं... दरिया पर जाओ तो उसे सलाम किया करो, वह खुश होता है। कबूतरों को मत सताया करो, वे हज़रत मुहम्मद को <span class="highlight-vocab">अज़ीज़<span class="vocab-tooltip">प्यारे</span></span> हैं। उन्होंने उन्हें अपनी <span class="highlight-vocab">मज़ार<span class="vocab-tooltip">दरगाह</span></span> के नीले <span class="highlight-vocab">गुंबद<span class="vocab-tooltip">गोलाकार छत</span></span> पर घोंसले बनाने की इजाज़त दे रखी है। मुर्गों को परेशान नहीं किया करो, वह मुल्ला जी से पहले मोहल्ले में <span class="highlight-vocab">अज़ान<span class="vocab-tooltip">नमाज़ के समय की सूचना</span></span> देकर सबको सवेरे जगाता है। - सब की पूजा एक-सी, अलग-अलग है रीत। मस्जिद जाए मौलवी, कोयल गाए गीत।</p>
            
            <div class="vocabulary-note">
                <div class="word">अज़ीज़</div>
                <div class="definition">प्यारे</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">मज़ार</div>
                <div class="definition">दरगाह</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">गुंबद</div>
                <div class="definition">गोलाकार छत</div>
            </div>
            
            <div class="vocabulary-note">
                <div class="word">अज़ान</div>
                <div class="definition">नमाज़ के समय की सूचना</div>
            </div>
            
            <p>ग्वालियर में हमारा एक मकान था, उस मकान के दालान में दो रोशनदान थे। उसमें कबूतर के एक जोड़े ने घोंसला बना लिया था। एक बार बिल्ली ने उछलकर दो में से एक अंडा तोड़ दिया। मेरी माँ ने देखा तो उसे दुख हुआ। उसने स्टूल पर चढ़कर दूसरे अंडे को बचाने की कोशिश की। लेकिन इस कोशिश में दूसरा अंडा उसी के हाथ से गिरकर टूट गया। कबूतर परेशानी में इधर-उधर फड़फड़ा रहे थे। उनकी आँखों में दुख देखकर मेरी माँ की आँखों में आँसू आ गए। इस गुनाह को खुदा से मुआफ़ कराने के लिए उसने पूरे दिन रोज़ा रखा। दिन-भर कुछ खाया-पिया नहीं। सिर्फ़ रोती रही और बार-बार नमाज़ पढ़-पढ़कर खुदा से इस गलती को मुआफ़ करने की दुआ माँगती रही।</p>
            
            <p>ग्वालियर से बंबई की दूरी ने संसार को काफ़ी कुछ बदल दिया है। वर्सोवा में जहाँ आज मेरा घर है पहले यहाँ दूर तक जंगल था। पेड़ थे, परिंदे थे और दूसरे जानवर थे। अब यहाँ समंदर के किनारे लंबी-चौड़ी बस्ती बन गई है। इस बस्ती ने न जाने कितने परिंदों-चरिंदों से उनका घर छीन लिया है। इनमें से कुछ शहर छोड़कर चले गए हैं। जो नहीं जा सके हैं उन्होंने यहाँ-वहाँ <span class="highlight-vocab">डेरा<span class="vocab-tooltip">अस्थाई पड़ाव</span></span> डाल लिया है। इनमें से दो कबूतरों ने मेरे फ्लैट के एक मचान में घोंसला बना लिया है। बच्चे अभी छोटे हैं। उनके खिलाने-पिलाने की ज़िम्मेदारी अभी बड़े कबूतरों की है। वे दिन में कई-कई बार आते-जाते हैं। और क्यों न आएँ-जाएँ आखिर उनका भी घर है। लेकिन उनके आने-जाने से हमें परेशानी भी होती है। वे कभी किसी चीज़ को गिराकर तोड़ देते हैं। कभी मेरी लाइब्रेरी में घुसकर कबीर या मिर्ज़ा ग़ालिब को सताने लगते हैं।</p>
            
            <div class="vocabulary-note">
                <div class="word">डेरा</div>
                <div class="definition">अस्थाई पड़ाव</div>
            </div>
            
            <p>इस रोज़-रोज़ की परेशानी से तंग आकर मेरी पत्नी ने उस जगह जहाँ उनका आशियाना था, एक जाली लगा दी है, उनके बच्चों को दूसरी जगह कर दिया है। उनके आने की खिड़की को भी बंद किया जाने लगा है। खिड़की के बाहर अब दोनों कबूतर रात-भर खामोश और उदास बैठे रहते हैं। मगर अब न सोलोमेन है जो उनकी ज़ुबान को समझकर उनका दुख बाँटे, न मेरी माँ है, जो इनके दुखों में सारी रात नमाज़ों में काटे-</p>
            
            <p>नदिया सींचे खेत को, तोता कुतरे आम। सूरज टेके दार-सा, सबको बाँटे काम।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. प्राकृतिक संतुलन बिगड़ने के क्या परिणाम हो रहे हैं?</div>
                <div class="comprehension-question">2. लेखक ने समुद्र के गुस्से का क्या उदाहरण दिया है?</div>
                <div class="comprehension-question">3. लेखक की माँ अंडे टूटने पर क्यों दुखी हुईं?</div>
                <div class="comprehension-question">4. लेखक के फ्लैट में कबूतरों के साथ क्या व्यवहार किया गया?</div>
            </div>
        `
    },
    {
        title: "शब्दार्थ और टिप्पणियाँ",
        content: `
            <div class="glossary-section">
                <table class="glossary-table">
                    <thead>
                        <tr>
                            <th>शब्द</th>
                            <th>अर्थ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>हाकिम</td>
                            <td>राजा / मालिक</td>
                        </tr>
                        <tr>
                            <td>लशकर (लश्कर)</td>
                            <td>सेना / विशाल जनसमुदाय</td>
                        </tr>
                        <tr>
                            <td>लकब</td>
                            <td>पद सूचक नाम</td>
                        </tr>
                        <tr>
                            <td>प्रतीकात्मक</td>
                            <td>प्रतीकस्वरूप</td>
                        </tr>
                        <tr>
                            <td>दालान</td>
                            <td>बरामदा</td>
                        </tr>
                        <tr>
                            <td>सिमटना</td>
                            <td>सिकुड़ना</td>
                        </tr>
                        <tr>
                            <td>जलजले</td>
                            <td>भूकंप</td>
                        </tr>
                        <tr>
                            <td>सैलाब</td>
                            <td>बाढ़</td>
                        </tr>
                        <tr>
                            <td>सैलानी</td>
                            <td>ऐसे पर्यटक जो भ्रमण कर नए-नए स्थानों के विषय में जानना चाहते हैं</td>
                        </tr>
                        <tr>
                            <td>अज़ीज़</td>
                            <td>प्रिय / प्यारा</td>
                        </tr>
                        <tr>
                            <td>मज़ार</td>
                            <td>दरगाह / क़ब्र</td>
                        </tr>
                        <tr>
                            <td>गुंबद</td>
                            <td>मंदिर, मस्जिद और गुरुद्वारे आदि के ऊपर बनी गोल छत जिसमें आवाज़ गूँजती है</td>
                        </tr>
                        <tr>
                            <td>अज़ान</td>
                            <td>नमाज़ के समय की सूचना जो मस्ज़िद की छत या दूसरी ऊँची जगह पर खड़े होकर दी जाती है</td>
                        </tr>
                        <tr>
                            <td>डेरा</td>
                            <td>अस्थायी पड़ाव</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }
];
