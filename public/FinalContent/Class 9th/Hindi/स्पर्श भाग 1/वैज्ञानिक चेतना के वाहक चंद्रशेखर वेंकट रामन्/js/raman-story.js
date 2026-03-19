/**
 * Story content and functionality for CV Raman
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;
let currentParagraphIndex = 0;
let paragraphElements = [];

// Helper function to check if vocabulary section is active
function isVocabularyActive() {
    const vocabSection = document.getElementById('vocabularySection');
    return vocabSection && vocabSection.classList.contains('active');
}

// Show vocabulary section
function showVocabulary() {
    console.log('Loading vocabulary section...');
    
    try {
        // Stop any active narration immediately
        if (window.narrator && window.narrator.isSpeaking && window.narrator.isSpeaking()) {
            window.narrator.stop();
            console.log('Stopped active narration for vocabulary section');
        }
        
        // Disable auto-narration for vocabulary section
        autoNarrationEnabled = false;
        narrationDisabledByUser = true;
        
        // Clear any ongoing narration timers or callbacks
        if (window.narrator && window.narrator.onEndCallback) {
            window.narrator.onEndCallback = null;
        }
        
        // Remove all reading indicators from any active sections
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 100);
        });
        
        // Remove all paragraph highlights from any active sections
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
        
        // Update navigation buttons
        console.log('Updating navigation buttons...');
        document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
            // Deactivate all story part buttons
            if (index < 5) {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
            // Activate vocabulary button (last button)
            if (index === 5) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            }
        });
        
        // Get the story content container
        const storyContent = document.getElementById('storyContent');
        if (!storyContent) {
            console.error('Story content container not found');
            return;
        }
        console.log('Story content container found:', storyContent);
        
        // Hide all existing story parts first
        document.querySelectorAll('.story-part').forEach(part => {
            part.classList.remove('active');
            // Don't set display: none here - let CSS handle visibility
        });
        
        // Create vocabulary container if it doesn't exist
        let vocabContainer = document.getElementById('vocabularySection');
        if (!vocabContainer) {
            console.log('Creating new vocabulary container...');
            vocabContainer = document.createElement('div');
            vocabContainer.id = 'vocabularySection';
            vocabContainer.className = 'story-part vocabulary-section active';
            storyContent.appendChild(vocabContainer);
        } else {
            console.log('Using existing vocabulary container...');
            vocabContainer.className = 'story-part vocabulary-section active';
        }
        
        // Make sure the vocabulary section is active and visible
        vocabContainer.classList.add('active');
        
        // Load vocabulary content if not already loaded
        if (!vocabContainer.innerHTML.trim()) {
            console.log('Loading vocabulary content...');
            loadVocabularyContent(vocabContainer);
        } else {
            console.log('Vocabulary content already loaded');
        }
        
        // Scroll to top
        storyContent.scrollTop = 0;
        
        console.log('Vocabulary section loaded successfully - narration disabled');
        
        // Provide user feedback
        if (window.narrator && window.narrator.enabled) {
            setTimeout(() => {
                window.narrator.speak("शब्दार्थ और टिप्पणियाँ अनुभाग लोड हो गया है।");
            }, 500);
        }
        
    } catch (error) {
        console.error('Error loading vocabulary section:', error);
        alert('शब्दार्थ लोड करने में त्रुटि हुई है। कृपया पुनः प्रयास करें।');
    }
}

// Show a specific part of the story
function showStoryPart(partNumber) {
    if (partNumber < 1 || partNumber > storyParts.length) return;
    
    console.log(`Loading story part ${partNumber}`);
    
    // Re-enable narration when switching back to story parts from vocabulary
    narrationDisabledByUser = false;
    
    // Map the part number to the correct index in the storyParts array
    let actualPartIndex = partNumber - 1;
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === (partNumber - 1));
        btn.setAttribute('aria-pressed', index === (partNumber - 1) ? 'true' : 'false');
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
        // Ensure no inline display styles are set
        part.style.display = '';
    });
    partContainer.classList.add('active');
    
    // Load content if not already loaded
    if (!partContainer.innerHTML.trim()) {
        const part = storyParts[actualPartIndex];
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
                console.log('Vocabulary term clicked');
            });
        });
        
        // Add read aloud button for this part
        const readAloudBtn = document.createElement('button');
        readAloudBtn.className = 'interactive-btn read-part-btn';
        readAloudBtn.innerHTML = '🔊 पढ़कर सुनाएँ';
        readAloudBtn.setAttribute('aria-label', `भाग ${partNumber} पढ़कर सुनाएँ`);
        readAloudBtn.onclick = function() { readStoryPartAloud(partNumber, true); };
        
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
    
    // Automatically start reading the new part when switching within story module
    // Only if not switching from vocabulary section
    if (window.narrator && !isVocabularyActive()) {
        setTimeout(() => {
            console.log(`Auto-starting narration for story part ${partNumber}`);
            readStoryPartAloud(partNumber, false);
        }, 100);
    }
}

// Read current paragraph aloud
function readCurrentParagraph() {
    // Check if narration is disabled (e.g., when viewing vocabulary section)
    if (narrationDisabledByUser || isVocabularyActive()) {
        console.log("Narration disabled by user or vocabulary section active - skipping paragraph reading");
        return;
    }
    
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
    
    // Check if narration is disabled and this is not a manual call
    if ((narrationDisabledByUser || isVocabularyActive()) && !isManualCall) {
        console.log("Narration disabled or vocabulary section active - skipping auto-narration");
        return;
    }
    
    // Enable auto-narration only when user manually starts reading
    if (isManualCall) {
        autoNarrationEnabled = true;
        narrationDisabledByUser = false;
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
    
    // Add title
    let storyText = `${part.title}. `;
    
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
        narrationDisabledByUser = true;
        
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

// Story parts data based on CH4.txt
const storyParts = [
    {
        title: "रामन् का जन्म और बचपन",
        content: `
            <p>पेड़ से सेब गिरते हुए तो लोग सदियों से देखते आ रहे थे, मगर गिरने के पीछे छिपे रहस्य को न्यूटन से पहले कोई और समझ नहीं पाया था। ठीक उसी प्रकार विराट समुद्र की <span class="highlight-vocab" title="नीली चमक">नील-वर्णीय आभा<span class="vocab-tooltip">नीली चमक</span></span> को भी असंख्य लोग आदिकाल से देखते आ रहे थे, मगर इस आभा पर पड़े रहस्य के परदे को हटाने के लिए हमारे समक्ष उपस्थित हुए सर चंद्रशेखर वेंकट रामन्।</p>
            
            <p>बात सन् 1921 की है, जब रामन् समुद्री यात्रा पर थे। जहाज के डेक पर खड़े होकर नीले समुद्र को निहारना, प्रकृति-प्रेमी रामन् को अच्छा लगता था। वे समुद्र की नीली आभा में घंटों खोए रहते। लेकिन रामन् केवल भावुक प्रकृति-प्रेमी ही नहीं थे। उनके अंदर एक वैज्ञानिक की <span class="highlight-vocab" title="जानने की इच्छा">जिज्ञासा<span class="vocab-tooltip">जानने की इच्छा</span></span> भी उतनी ही सशक्त थी।</p>
            
            <p>यही जिज्ञासा उनसे सवाल कर बैठी - 'आखिर समुद्र का रंग नीला ही क्यों होता है? कुछ और क्यों नहीं?' रामन् सवाल का जवाब ढूँढ़ने में लग गए। जवाब ढूँढ़ते ही वे <span class="highlight-vocab" title="विश्व में प्रसिद्ध">विश्वविख्यात<span class="vocab-tooltip">विश्व में प्रसिद्ध</span></span> बन गए।</p>
            
            <p>रामन् का जन्म 7 नवंबर सन् 1888 को तमिलनाडु के तिरुचिरापल्ली नगर में हुआ था। इनके पिता विशाखापत्तनम् में गणित और भौतिकी के शिक्षक थे। पिता इन्हें बचपन से गणित और भौतिकी पढ़ाते थे।</p>
            
            <p>इसमें कोई <span class="highlight-vocab" title="बढ़ा-चढ़ाकर कहना">अतिशयोक्ति<span class="vocab-tooltip">बढ़ा-चढ़ाकर कहना</span></span> नहीं होगी कि जिन दो विषयों के ज्ञान ने उन्हें जगत-प्रसिद्ध बनाया, उनकी सशक्त नींव उनके पिता ने ही तैयार की थी।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रामन् के मन में समुद्र के नीले रंग को लेकर कौन सा प्रश्न उत्पन्न हुआ?</div>
                <div class="comprehension-question">2. रामन् के पिता कौन से विषय पढ़ाते थे?</div>
                <div class="comprehension-question">3. रामन् का जन्म कब और कहाँ हुआ था?</div>
            </div>
        `
    },
    {
        title: "शिक्षा और प्रारंभिक जीवन",
        content: `
            <p>कॉलेज की पढ़ाई उन्होंने पहले ए.बी.एन. कॉलेज तिरुचिरापल्ली से और फिर प्रेसीडेंसी कॉलेज मद्रास से की। बी.ए. और एम.ए. दोनों ही परीक्षाओं में उन्होंने काफ़ी ऊँचे अंक <span class="highlight-vocab" title="प्राप्त किए">हासिल<span class="vocab-tooltip">प्राप्त किए</span></span> किए।</p>
            
            <p>रामन् का मस्तिष्क विज्ञान के रहस्यों को सुलझाने के लिए बचपन से ही बेचैन रहता था। अपने कॉलेज के ज़माने से ही उन्होंने <span class="highlight-vocab" title="अनुसंधान कार्य">शोधकार्यों<span class="vocab-tooltip">अनुसंधान कार्य</span></span> में दिलचस्पी लेना शुरू कर दिया था।</p>
            
            <p>उनका पहला शोधपत्र फिलॉसॉफिकल मैगज़ीन में प्रकाशित हुआ था। उनकी दिली इच्छा तो यही थी कि वे अपना सारा जीवन शोधकार्यों को ही समर्पित कर दें, मगर उन दिनों शोधकार्य को पूरे समय के कैरियर के रूप में अपनाने की कोई खास व्यवस्था नहीं थी।</p>
            
            <p><span class="highlight-vocab" title="विशेष योग्यता वाले">प्रतिभावान<span class="vocab-tooltip">विशेष योग्यता वाले</span></span> छात्र सरकारी नौकरी की ओर आकर्षित होते थे। रामन् भी अपने समय के अन्य सुयोग्य छात्रों की भाँति भारत सरकार के वित्त-विभाग में अफसर बन गए। उनकी तैनाती कलकत्ता में हुई।</p>
            
            <p>कलकत्ता में सरकारी नौकरी के दौरान उन्होंने अपने स्वाभाविक <span class="highlight-vocab" title="झुकाव, प्रवृत्ति">रुझान<span class="vocab-tooltip">झुकाव, प्रवृत्ति</span></span> को बनाए रखा। दफ़्तर से फुर्सत पाते ही वे लौटते हुए बहू बाज़ार आते, जहाँ 'इंडियन एसोसिएशन फॉर द कल्टीवेशन ऑफ़ साइंस' की प्रयोगशाला थी।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रामन् ने अपनी कॉलेज की शिक्षा कहाँ से पूरी की?</div>
                <div class="comprehension-question">2. रामन् का पहला शोधपत्र कहाँ प्रकाशित हुआ था?</div>
                <div class="comprehension-question">3. रामन् की सरकारी नौकरी कहाँ लगी थी?</div>
            </div>
        `
    },
    {
        title: "वैज्ञानिक खोज - रामन् प्रभाव",
        content: `
            <p>यह अपने आपमें एक अनूठी संस्था थी, जिसे कलकत्ता के एक डॉक्टर महेंद्रलाल सरकार ने वर्षों की कठिन मेहनत और लगन के बाद खड़ा किया था। इस संस्था का उद्देश्य था देश में वैज्ञानिक चेतना का विकास करना।</p>
            
            <p>अपने महान् उद्देश्यों के बावजूद इस संस्था के पास साधनों का नितांत अभाव था। रामन् इस संस्था की प्रयोगशाला में कामचलाऊ <span class="highlight-vocab" title="यंत्र, साधन">उपकरणों<span class="vocab-tooltip">यंत्र, साधन</span></span> का इस्तेमाल करते हुए शोधकार्य करते।</p>
            
            <p>यह अपने आपमें एक आधुनिक हठयोग का उदाहरण था, जिसमें एक साधक दफ़्तर में कड़ी मेहनत के बाद बहू बाज़ार की इस मामूली-सी प्रयोगशाला में पहुँचता और अपनी इच्छाशक्ति के ज़ोर से भौतिक विज्ञान को <span class="highlight-vocab" title="उन्नत बनाने">समृद्ध<span class="vocab-tooltip">उन्नत बनाने</span></span> के प्रयास करता।</p>
            
            <p>चार साल बाद यानी सन् 1921 में समुद्र-यात्रा के दौरान जब रामन् के मस्तिष्क में समुद्र के नीले रंग की वजह का सवाल हिलोरें लेने लगा, तो उन्होंने आगे इस दिशा में प्रयोग किए, जिसकी <span class="highlight-vocab" title="परिणाम">परिणति<span class="vocab-tooltip">परिणाम</span></span> रामन् प्रभाव की खोज के रूप में हुई।</p>
            
            <p>रामन् ने अनेक ठोस रवों और तरल पदार्थों पर प्रकाश की किरण के प्रभाव का अध्ययन किया। उन्होंने पाया कि जब <span class="highlight-vocab" title="एक रंग का">एकवर्णीय<span class="vocab-tooltip">एक रंग का</span></span> प्रकाश की किरण किसी तरल या ठोस रवेदार पदार्थ से गुज़रती है तो गुज़रने के बाद उसके वर्ण में परिवर्तन आता है।</p>
            
            <p>वजह यह होती है कि एकवर्णीय प्रकाश की किरण के <span class="highlight-vocab" title="प्रकाश कण">फोटॉन<span class="vocab-tooltip">प्रकाश कण</span></span> जब तरल या ठोस रवे से गुज़रते हुए इनके अणुओं से टकराते हैं तो इस टकराव के परिणामस्वरूप वे या तो <span class="highlight-vocab" title="शक्ति">ऊर्जा<span class="vocab-tooltip">शक्ति</span></span> का कुछ अंश खो देते हैं या पा जाते हैं।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रामन् प्रभाव की खोज क्या है?</div>
                <div class="comprehension-question">2. प्रकाश के रंग में परिवर्तन क्यों होता है?</div>
                <div class="comprehension-question">3. रामन् ने किस संस्था में शोधकार्य किया?</div>
            </div>
        `
    },
    {
        title: "सम्मान और उपलब्धियाँ",
        content: `
            <p>रामन् की खोज भौतिकी के क्षेत्र में एक क्रांति के समान थी। इसका पहला परिणाम तो यह हुआ कि प्रकाश की प्रकृति के बारे में आइंस्टाइन के विचारों का <span class="highlight-vocab" title="प्रयोग द्वारा सिद्ध">प्रायोगिक<span class="vocab-tooltip">प्रयोग द्वारा सिद्ध</span></span> प्रमाण मिल गया।</p>
            
            <p>आइंस्टाइन के पूर्ववर्ती वैज्ञानिक प्रकाश को तरंग के रूप में मानते थे, मगर आइंस्टाइन ने बताया कि प्रकाश अति सूक्ष्म कणों की तीव्र धारा के समान है। इन अति सूक्ष्म कणों की तुलना आइंस्टाइन ने बुलेट से की और इन्हें 'फोटॉन' नाम दिया।</p>
            
            <p>रामन् प्रभाव की खोज ने रामन् को विश्व के चोटी के वैज्ञानिकों की पंक्ति में ला खड़ा किया। पुरस्कारों और सम्मानों की तो जैसे झड़ी-सी लगी रही।</p>
            
            <p>उन्हें सन् 1924 में रॉयल सोसाइटी की सदस्यता से सम्मानित किया गया। सन् 1929 में उन्हें 'सर' की उपाधि प्रदान की गई। ठीक अगले ही साल उन्हें विश्व के सर्वोच्च पुरस्कार-भौतिकी में नोबेल पुरस्कार से सम्मानित किया गया।</p>
            
            <p>उन्हें और भी कई पुरस्कार मिले, जैसे रोम का मेत्यूसी पदक, रॉयल सोसाइटी का ह्यूज़ पदक, फ़िलाडेल्फिया इंस्टीट्यूट का फ्रैंकलिन पदक, सोवियत रूस का अंतर्राष्ट्रीय लेनिन पुरस्कार आदि।</p>
            
            <p>सन् 1954 में रामन् को देश के सर्वोच्च सम्मान भारत रत्न से सम्मानित किया गया। वे नोबेल पुरस्कार पानेवाले पहले भारतीय वैज्ञानिक थे। उनके बाद यह पुरस्कार भारतीय नागरिकतावाले किसी अन्य वैज्ञानिक को अभी तक नहीं मिल पाया है।</p>
            
            <div class="vocabulary-note">
                <p><span class="word">नोबेल पुरस्कार:</span> <span class="definition">यह एक अंतरराष्ट्रीय स्तर का सर्वोच्च पुरस्कार है जो साहित्य, भौतिक विज्ञान, रसायन विज्ञान, चिकित्सा विज्ञान, अर्थशास्त्र तथा शांति के क्षेत्र में अभूतपूर्व कार्य के लिए दिया जाता है।</span></p>
            </div>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रामन् को कौन-कौन से पुरस्कार मिले?</div>
                <div class="comprehension-question">2. रामन् को नोबेल पुरस्कार कब मिला?</div>
                <div class="comprehension-question">3. रामन् भारत के पहले नोबेल पुरस्कार विजेता वैज्ञानिक क्यों कहलाते हैं?</div>
            </div>
        `
    },
    {
        title: "विरासत और प्रेरणा",
        content: `
            <p>उन्हें अधिकांश सम्मान उस दौर में मिले जब भारत अंग्रेज़ों का गुलाम था। उन्हें मिलनेवाले सम्मानों ने भारत को एक नया आत्म-सम्मान और आत्म-विश्वास दिया। विज्ञान के क्षेत्र में उन्होंने एक नयी भारतीय चेतना को जाग्रत किया।</p>
            
            <p>भारतीय संस्कृति से रामन् को हमेशा ही गहरा लगाव रहा। उन्होंने अपनी भारतीय पहचान को हमेशा <span class="highlight-vocab" title="अखंडित, बना रहने वाला">अक्षुण्ण<span class="vocab-tooltip">अखंडित, बना रहने वाला</span></span> रखा। अंतरराष्ट्रीय प्रसिद्धि के बाद भी उन्होंने अपने दक्षिण भारतीय पहनावे को नहीं छोड़ा।</p>
            
            <p>वे कट्टर शाकाहारी थे और मदिरा से सख्त परहेज रखते थे। जब वे नोबेल पुरस्कार प्राप्त करने स्टॉकहोम गए तो वहाँ उन्होंने अल्कोहल पर रामन् प्रभाव का प्रदर्शन किया।</p>
            
            <p>रामन् का वैज्ञानिक व्यक्तित्व प्रयोगों और शोधपत्र लेखन तक ही सिमटा हुआ नहीं था। उनके अंदर एक राष्ट्रीय चेतना थी और वे देश में वैज्ञानिक दृष्टि और चिंतन के विकास के प्रति समर्पित थे।</p>
            
            <p>उन्हें अपने शुरुआती दिन हमेशा ही याद रहे जब उन्हें ढंग की प्रयोगशाला और उपकरणों के अभाव में काफ़ी संघर्ष करना पड़ा था। इसीलिए उन्होंने एक अत्यंत उन्नत प्रयोगशाला और शोध-संस्थान की स्थापना की जो बंगलोर में स्थित है और उन्हीं के नाम पर 'रामन् रिसर्च इंस्टीट्यूट' नाम से जानी जाती है।</p>
            
            <p>भौतिक शास्त्र में अनुसंधान को बढ़ावा देने के लिए उन्होंने इंडियन जरनल ऑफ़ फ़िज़िक्स नामक शोध-पत्रिका प्रारंभ की। अपने जीवनकाल में उन्होंने सैकड़ों शोध-छात्रों का मार्गदर्शन किया।</p>
            
            <p>उनकी मृत्यु 21 नवंबर सन् 1970 के दिन 82 वर्ष की आयु में हुई। रामन् वैज्ञानिक चेतना और दृष्टि की साक्षात <span class="highlight-vocab" title="मूर्ति, प्रतिमा">प्रतिमूर्ति<span class="vocab-tooltip">मूर्ति, प्रतिमा</span></span> थे।</p>
            
            <p>उन्होंने हमें हमेशा ही यह संदेश दिया कि हम अपने आसपास घट रही विभिन्न प्राकृतिक घटनाओं की छानबीन एक वैज्ञानिक दृष्टि से करें। तभी तो उन्होंने संगीत के सुर-ताल और प्रकाश की किरणों की आभा के अंदर से वैज्ञानिक सिद्धांत खोज निकाले।</p>
            
            <p>हमारे आसपास ऐसी न जाने कितनी ही चीजें बिखरी पड़ी हैं, जो अपने पात्र की तलाश में हैं। ज़रूरत है रामन् के जीवन से प्रेरणा लेने की और प्रकृति के बीच छुपे वैज्ञानिक रहस्य का भेदन करने की।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रामन् ने भारतीय वैज्ञानिक चेतना के विकास के लिए क्या योगदान दिया?</div>
                <div class="comprehension-question">2. रामन् रिसर्च इंस्टीट्यूट की स्थापना क्यों की गई?</div>
                <div class="comprehension-question">3. रामन् के जीवन से हमें क्या प्रेरणा मिलती है?</div>
            </div>
        `
    }
];

// Vocabulary data for Shabdarth aur Tippaniyan
const vocabularyData = [
    { word: "नील वर्णीय", meaning: "नीले रंग का" },
    { word: "असंख्य", meaning: "अनगिनत, जिसकी संख्या बताना संभव न हो" },
    { word: "आभा", meaning: "चमक" },
    { word: "जिज्ञासा", meaning: "जानने की इच्छा" },
    { word: "विश्वविख्यात", meaning: "संसार में प्रसिद्ध" },
    { word: "भौतिकी", meaning: "वह विज्ञान जिसमें तत्त्वों के गुण आदि का विवेचन किया गया हो, फ़िज़िक्स" },
    { word: "अतिशयोक्ति", meaning: "किसी बात को बढ़ा-चढ़ाकर बोलना" },
    { word: "हासिल", meaning: "प्राप्त" },
    { word: "शोधकार्य", meaning: "खोज, अनुसंधान कार्य" },
    { word: "प्रतिभावान", meaning: "जिसमें विलक्षण-बौद्धिक शक्ति हो" },
    { word: "वित्त विभाग", meaning: "किसी राज्य के आय-व्यय से संबंधित विभाग" },
    { word: "रुझान", meaning: "झुकाव, किसी ओर प्रवृत्त होना" },
    { word: "उपकरण", meaning: "साधन, औजार" },
    { word: "समृद्ध", meaning: "उन्नतशील" },
    { word: "भ्रांति", meaning: "संदेह, अयथार्थ ज्ञान" },
    { word: "सृजित", meaning: "रचा हुआ" },
    { word: "समक्ष", meaning: "सामने" },
    { word: "अध्यापन", meaning: "पढ़ाना" },
    { word: "परिणति", meaning: "परिणाम" },
    { word: "ठोस रवे", meaning: "बिल्लौर, मणिभ" },
    { word: "फोटॉन", meaning: "प्रकाश का अंश" },
    { word: "एकवर्णीय", meaning: "एक रंग का" },
    { word: "ऊर्जा", meaning: "शक्ति, बल" },
    { word: "प्रायोगिक", meaning: "प्रयोग संबंधित" },
    { word: "तीव्रधारा", meaning: "तेज़ धारा" },
    { word: "इंफ्रा रेड स्पेक्ट्रोस्कोपी", meaning: "अवरक्त स्पेक्ट्रम विज्ञान" },
    { word: "आणविक", meaning: "अणु का" },
    { word: "परमाणविक", meaning: "परमाणु का" },
    { word: "संरचना", meaning: "बनावट" },
    { word: "संश्लेषण", meaning: "मिलान करना (सिंथेसिस)" },
    { word: "कृत्रिम", meaning: "बनाया हुआ, बनावटी" },
    { word: "कट्टर", meaning: "दृढ़" },
    { word: "अक्षुण्ण", meaning: "अखंडित" },
    { word: "परिहास", meaning: "हँसी-मजाक" },
    { word: "आह्लादित", meaning: "आनंदित" },
    { word: "आलोकित", meaning: "प्रकाशित" },
    { word: "प्रतिमूर्ति", meaning: "अनुकृति, चित्र, प्रतिमा" }
];

// Function to load vocabulary content
function loadVocabularyContent(container) {
    console.log('Loading vocabulary content into container:', container);
    
    try {
        const vocabularyHTML = `
            <div class="vocabulary-content">
                <h2 class="section-title">शब्दार्थ और टिप्पणियाँ</h2>
                
                <div class="vocabulary-table-container">
                    <table class="vocabulary-table">
                        <thead>
                            <tr>
                                <th>शब्द</th>
                                <th>अर्थ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vocabularyData.map(item => `
                                <tr>
                                    <td class="word-column">${item.word}</td>
                                    <td class="meaning-column">${item.meaning}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="nobel-prize-info">
                    <h3>नोबेल पुरस्कार</h3>
                    <div class="info-card">
                        <p><strong>नोबेल पुरस्कार</strong> - यह एक अंतरराष्ट्रीय स्तर का सर्वोच्च पुरस्कार है जो साहित्य, भौतिक विज्ञान, रसायन विज्ञान, चिकित्सा विज्ञान, अर्थशास्त्र तथा शांति के क्षेत्र में अभूतपूर्व कार्य के लिए दिया जाता है।</p>
                        <p><strong>संस्थापक:</strong> नोबेल पुरस्कार के जन्मदाता अल्फ्रेड नोबेल हैं, जिनका जन्म सन् 1833 में स्वीडन स्टॉकहोम नामक स्थान में हुआ था।</p>
                        <p><strong>आविष्कार:</strong> अल्फ्रेड नोबेल ने सन् 1866 में विध्वंसकारी डायनामाइट का आविष्कार किया था।</p>
                        <p><strong>प्रथम पुरस्कार:</strong> इस पुरस्कार को सर्वप्रथम सन् 1901 में दिया गया।</p>
                    </div>
                </div>
                
                <div class="button-container">
                    <button class="interactive-btn" onclick="showStoryPart(1)">
                        📖 पाठ पर वापस जाएं
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = vocabularyHTML;
        console.log('Vocabulary content loaded successfully');
        
        // Force a reflow to ensure the content is rendered
        container.offsetHeight;
        
    } catch (error) {
        console.error('Error loading vocabulary content:', error);
        container.innerHTML = `
            <div class="vocabulary-content">
                <h2 class="section-title">शब्दार्थ और टिप्पणियाँ</h2>
                <div class="error-message">
                    <p>शब्दार्थ लोड करने में त्रुटि हुई है। कृपया पुनः प्रयास करें।</p>
                    <button class="interactive-btn" onclick="showVocabulary()">पुनः प्रयास करें</button>
                </div>
            </div>
        `;
    }
}

// Make functions available globally
window.showVocabulary = showVocabulary;
window.showStoryPart = showStoryPart;
window.readCurrentStoryPartAloud = readCurrentStoryPartAloud;
window.readStoryPartAloud = readStoryPartAloud;
window.stopNarration = stopNarration;
window.highlightVocabulary = highlightVocabulary;

// Debug function to test vocabulary loading
window.testVocabulary = function() {
    console.log('Testing vocabulary function...');
    showVocabulary();
};
