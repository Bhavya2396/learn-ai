/**
 * Story content and functionality for Ginni ka Sona
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;
let currentParagraphIndex = 0;
let paragraphElements = [];

// Show a specific part of the story
function showStoryPart(partNumber) {
    if (partNumber < 1 || partNumber > storyParts.length) return;
    
    console.log(`Loading story part ${partNumber}`);
    
    // Map the part number to the correct index in the storyParts array
    let actualPartIndex;
    
    // Direct mapping based on part number
    switch(partNumber) {
        case 1: // लेखक परिचय
            actualPartIndex = 0;
            break;
        case 3: // गिन्नी का सोना
            actualPartIndex = 2;
            break;
        case 4: // झेन की देन
            actualPartIndex = 3;
            break;
        case 5: // शब्दार्थ और टिप्पणियाँ
            actualPartIndex = 4;
            break;
        default:
            actualPartIndex = 0; // Default to first part if not found
    }
    
    // This check is now redundant since we default to 0, but keeping for safety
    if (actualPartIndex === undefined) {
        console.error(`Story part ${partNumber} not found, defaulting to first part`);
        actualPartIndex = 0;
    }
    
    // Update navigation buttons - match button index with the requested part number
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        // Map index to the corresponding part number (0->1, 1->3, 2->4, 3->5)
        const buttonPartNumber = index === 0 ? 1 : 
                               (index === 1 ? 3 : 
                               (index === 2 ? 4 : 5));
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
        // Get the actual part using the index we found earlier
        const part = storyParts[actualPartIndex];
        if (!part) {
            console.error(`Story part ${partNumber} not found`);
            return;
        }
        
        partContainer.innerHTML = `
            <h3 class="story-part-title">${part.title}</h3>
            ${part.content}
        `;
        
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
        case 3: // गिन्नी का सोना
            actualPartIndex = 2;
            break;
        case 4: // झेन की देन
            actualPartIndex = 3;
            break;
        case 5: // शब्दार्थ और टिप्पणियाँ
            actualPartIndex = 4;
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
const storyParts = [
    {
        title: "लेखक परिचय",
        content: `
            <p>" रवींद्र केलेकर (1925-2010)</p>
            
            <p>7 मार्च 1925 को कोंकण क्ेतर में जन्मे रींदर केलेकर छात्र जीवन से ही गोवा मुकित आंदोलन में शामिल हो गए थे। गांधीवादी चितक के रूप में विख्यात 'केलेकर ने अपने लेखन में जन-जीवन के विविध पक्षों, मान्यताओं और व्यक्तिगत विचारं को देश और समाज के परिप्रेष्य में प्रस्ुत किया है। इनकी अनुभवजन्य टिप्पणियों में अपने चिंतन की मौलिकता के साथ ही मानवीय सत्य तक पहँचने की सहज चेष्टा रहती है।</p>
            
            <p>कोंकणी और मराठी के शीर्षस्थ लेखक और पत्रकार रवं्र केलेकर की कोंकणी में पच्चीस, मराठी में तीन, हंदी और गुजराती में भी कुछेक पुस्तकें प्रकाशित हैं। केलेकर ने काका कालेलकर की अनेक पुस्तकों का संपादन और अनुबाद भी किया है।</p>
            
            <p>गोवा कला अकादमी के साहित्य पुरस्कार सहित कई पुरस्कारों से सम्मानित केलेकर की प्रमुख कृतियाँ हैं-कोंकणी में उजवाढाचे सूर, समिधा, संगली ओथांबे; मराठी में कोंकणीचें राजकरण, जापान जसा दिसला और हिंी में पतझर में टूटी पत्तियाँ | "</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. रवींद्र केलेकर का जन्म कब और कहाँ हुआ था?</div>
                <div class="comprehension-question">2. रवींद्र केलेकर किस विचारधारा से प्रभावित थे?</div>
                <div class="comprehension-question">3. रवींद्र केलेकर की हिंदी में कौन सी प्रमुख कृति है?</div>
            </div>
        `
    },
    {
        title: "पाठ प्रवेश",
        content: `
            <p>" ऐसा माना जाता है कि थोड़े में बहुत कुछ कह देना कविता का गुण है। जब कभी यह गुण किसी गद्य रचना में भी दिखाईं देता है तब उसे पढ़ने वाले को यह मुहावरा याद नहीं रखना पड़ता कि 'सार-सार को गहि रहे, थोथा देय उडाय'। सरल लिखना, थोड़े शब्दों में लिखना ज्यादा कठिन काम है। फिर भी यह काम होता रहा है। सूक्त कथाएँ, आगम कथाएँ. जातक कथाएँ. पंचत्र की कहानियाँ उसी लेखन के प्रमाण हैं। यही काम कोंकणी में खींर केलेकर ने किया है।</p>
            
            <p>प्रसतुत पाठ के प्रसंग पढ़ने वालों से थोड़ा कहा बहत समझना की माँग करते हैं। ये प्रसंग महज पढ़ने-गुनने की नहीं, एक जागरूक और सक्रिय नागरिक बनने की प्रेणा भी देते हैं। पहला प्रसंग गिन्नी का सोना जीवन में अपने लिए सुख -साधन 'जुटाने वालों से नहीं बल्कि उन लोगों से परिचित कराता है जो इस जगत को जीने और रहने योग्य बनाए हए हैं।</p>
            
            <p>दूसरा प्रसंग झेन की देन बौद्ध दर्शन में वर्णित ध्यान की उस पद्धति की याद दिलाता है जिसके कारंण जापान के लोग आज भी अपनी व्यस्ततम दिनच्या के बीच कुछ चैन भरेपलपा जाते हैं।"</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. लेखक ने अपने प्रसंगों के माध्यम से किस प्रकार के मूल्य प्रस्तुत किए हैं?</div>
                <div class="comprehension-question">2. 'सार-सार को गहि रहे, थोथा देय उड़ाय' का क्या अर्थ है?</div>
            </div>
        `
    },
    {
        title: "गिन्नी का सोना",
        content: `
            <p>शुद्ध सोना अलग है और गिन्नी का सोना अलग। गिन्नी के सोने में थोड़ा-सा ताँबा मिलाया हुआ होता है, इसलिए वह ज्यादा चमकता है और शुद्ध सोने से मजबूत भी होता है। औरतें अकसर इसी सोने के गहने बनवा लेती हैं।</p>
            
            <p>फिर भी होता तो वह है गिन्नी का ही सोना। शुद्ध आदर्श भी शुद्ध सोने के जैसे ही होते हैं। चंद लोग उनमें व्यावहारिकता का थोड़ा-सा ताँबा मिला देते हैं और चलाकर दिखाते हैं। तब हम लोग उन्हें "प्रैक्टिकल आइडियालिस्ट" कहकर उनका बखान करते हैं।</p>
            
            <p>पर बात न भूलें कि बखान आदर्शों का नहीं होता, बल्कि व्यावहारिकता का होता है। और जब व्यावहारिकता का बखान होने लगता है तब 'प्रैक्टिकल आइडियालिस्टों' के जीवन से आदर्श धीरे-धीरे पीछे हटने लगते हैं और उनकी व्यावहारिक सूझबूझ ही आगे आने लगती है। सोना पीछे रहकर ताँबा ही आगे आता है।</p>
            
            <p>चंद लोग कहते हैं, गांधीजी 'प्रैक्टिकल आइडियालिस्ट' थे। व्यावहारिकता को पहचानते थे। उसकी कीमत जानते थे। इसीलिए वे अपने विलक्षण आदर्श चला सके। वरना हवा में ही उड़ते रहते। देश उनके पीछे न जाता।</p>
            
            <p>हाँ, पर गांधीजी कभी आदर्शों को व्यावहारिकता के स्तर पर उतरने नहीं देते थे। बल्कि व्यावहारिकता को आदर्शों के स्तर पर चढ़ाते थे। वे सोने में ताँबा नहीं बल्कि ताँबे में सोना मिलाकर उसकी कीमत बढ़ाते थे।</p>
            
            <p>इसलिए सोना ही हमेशा आगे आता रहता था। व्यवहारवादी लोग हमेशा सजग रहते हैं। लाभ-हानि का हिसाब लगाकर ही कदम उठाते हैं। वे जीवन में सफल होते हैं, अन्यों से आगे भी जाते हैं पर क्या वे ऊपर चढ़ते हैं। खुद ऊपर चढ़ें और अपने साथ दूसरों को भी ऊपर ले चलें, यही महत्व की बात है। यह काम तो हमेशा आदर्शवादी लोगों ने ही किया है। समाज के पास अगर शाश्वत मूल्यों जैसा कुछ है तो वह आदर्शवादी लोगों का ही दिया हुआ है। व्यवहारवादी लोगों ने तो समाज को गिराया ही है।</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. शुद्ध सोना और गिन्नी का सोना में क्या अंतर है?</div>
                <div class="comprehension-question">2. लेखक के अनुसार, गांधीजी के विषय में 'प्रैक्टिकल आइडियालिस्ट' कहना कहाँ तक उचित है?</div>
                <div class="comprehension-question">3. समाज के शाश्वत मूल्यों के विषय में लेखक का क्या मत है?</div>
            </div>
        `
    },
    {
        title: "झेन की देन",
        content: `
            <p>जापान में मैंने अपने एक मित्र से पूछा, "यहाँ के लोगों को कौन-सी बीमारियाँ अधिक होती हैं?" "मानसिक", उन्होंने जवाब दिया, "यहाँ के अस्सी फ़ीसदी लोग मनोरुग्ण." "इसकी क्या वजह है?"</p>
            
            <p>कहने लगे, "हमारे जीवन की रफ़्तार बढ़ गई है। यहाँ कोई चलता नहीं, बल्कि दौड़ता है। कोई बोलता नहीं, बकता है। हम जब अकेले पड़ते हैं तब अपने आपसे लगातार बड़बड़ाते रहते हैं। अमेरिका से हम प्रतिस्पर्धा करने लगे। एक महीने में पूरा होने वाला काम एक दिन ही पूरा करने की कोशिश करने लगे। वैसे भी दिमाग की रफ़्तार हमेशा तेज़ ही रहती है। उसे 'स्पीड' का इंजन लगाने पर वह हज़ार गुना अधिक रफ़्तार से दौड़ने लगता है। फिर एक क्षण ऐसा आता है जब दिमाग का तनाव बढ़ जाता है और पूरा इंजन टूट जाता है। यही कारण है जिससे मानसिक रोग यहाँ बढ़ गए हैं।"</p>
            
            <p>शाम को वह मुझे एक 'टी-सेरेमनी' में ले गए। चाय पीने की यह एक विधि है। जापानी में उसे चा-नो-यू कहते हैं।</p>
            
            <p>वह एक छः मंजिली इमारत थी जिसकी छत पर दफ़्ती की दीवारोंवाली और तातामी (चटाई) की जमीनवाली एक सुंदर पर्णकुटी थी। बाहर बेढब-सा एक मिट्टी का बरतन था। उसमें पानी भरा हुआ था। हमने अपने हाथ-पाँव इस पानी से धोए। तौलिए से पोंछे और अंदर गए। अंदर 'चाजीन' बैठा था। हमें देखकर वह खड़ा हुआ। कमर झुकाकर उसने हमें प्रणाम किया। "दो...झो..." (आइए, तशरीफ लाइए) कहकर स्वागत किया। बैठने की जगह हमें दिखाई। अँगीठी सुलगाई। उस पर चायदानी रखी। बगल के कमरे में जाकर कुछ बरतन ले आया। तौलिए से बरतन साफ़ किए। सभी क्रियाएँ इतनी गरिमापूर्ण ढंग से कीं कि उसकी हर भंगिमा से लगता था मानो जयजयवंती के सुर गूँज रहे हों। वहाँ का वातावरण इतना शांत था कि चायदानी के पानी का खदबदाना भी सुनाई दे रहा था।</p>
            
            <p>चाय तैयार हुई। उसने वह प्यालों में भरी। फिर वे प्याले हमारे सामने रख दिए गए। वहाँ हम तीन मित्र ही थे। इस विधि में शांति मुख्य बात होती है। इसलिए वहाँ तीन से अधिक आदमियों को प्रवेश नहीं दिया जाता। प्याले में दो घूँट से अधिक चाय नहीं थी। हम ओठों से प्याला लगाकर एक-एक बूँद चाय पीते रहे। करीब डेढ़ घंटे तक चुसकियों का यह सिलसिला चलता रहा।</p>
            
            <p>पहले दस-पंद्रह मिनट तो मैं उलझन में पड़ा। फिर देखा, दिमाग की रफ़्तार धीरे-धीरे धीमी पड़ती जा रही है। थोड़ी देर में बिलकुल बंद भी हो गई। मुझे लगा, मानो अनंतकाल में मैं जी रहा हूँ। यहाँ तक कि सन्नाटा भी मुझे सुनाई देने लगा।</p>
            
            <p>अकसर हम या तो गुज़रे हुए दिनों की खट्टी-मीठी यादों में उलझे रहते हैं या भविष्य के रंगीन सपने देखते रहते हैं। हम या तो भूतकाल में रहते हैं या भविष्यकाल में। असल में दोनों काल मिथ्या हैं। एक चला गया है, दूसरा आया नहीं है। हमारे सामने जो वर्तमान क्षण है, वही सत्य है। उसी में जीना चाहिए। चाय पीते-पीते उस दिन मेरे दिमाग से भूत और भविष्य दोनों काल उड़ गए थे। केवल वर्तमान क्षण सामने था। और वह अनंतकाल जितना विस्तृत था।</p>
            
            <p>जीना किसे कहते हैं, उस दिन मालूम हुआ। झेन परंपरा की यह बड़ी देन मिली है जापानियों को!</p>
            
            <div class="comprehension-check">
                <h3>📝 बोध प्रश्न</h3>
                <div class="comprehension-question">1. जापान में लोग किस प्रकार के रोग से अधिक ग्रसित हैं और क्यों?</div>
                <div class="comprehension-question">2. 'चा-नो-यू' क्या है और इसकी क्या विशेषताएँ हैं?</div>
                <div class="comprehension-question">3. लेखक के अनुसार वर्तमान क्षण का क्या महत्व है?</div>
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
                            <td>व्यावहारिकता</td>
                            <td>समय और अवसर देखकर कार्य करने की समझ</td>
                        </tr>
                        <tr>
                            <td>प्रैक्टिकल आइडियालिस्ट</td>
                            <td>व्यावहारिक आदर्श</td>
                        </tr>
                        <tr>
                            <td>बखान</td>
                            <td>प्रशंसा</td>
                        </tr>
                        <tr>
                            <td>सूझ-बूझ</td>
                            <td>अच्छी समझ</td>
                        </tr>
                        <tr>
                            <td>स्तर</td>
                            <td>किसी स्थिति या योग्यता का माप</td>
                        </tr>
                        <tr>
                            <td>सजग</td>
                            <td>चौकस, सावधान</td>
                        </tr>
                        <tr>
                            <td>शाश्वत</td>
                            <td>हमेशा रहने वाला</td>
                        </tr>
                        <tr>
                            <td>शुद्ध सोना</td>
                            <td>बिना मिलावट वाला सोना</td>
                        </tr>
                        <tr>
                            <td>गिन्नी का सोना</td>
                            <td>मिलावट वाला सोना</td>
                        </tr>
                        <tr>
                            <td>मानसिक</td>
                            <td>मन से संबंधित</td>
                        </tr>
                        <tr>
                            <td>मनोरुग्ण</td>
                            <td>तनाव के कारण मन से अस्वस्थ</td>
                        </tr>
                        <tr>
                            <td>प्रतिस्पर्द्धा</td>
                            <td>होड़</td>
                        </tr>
                        <tr>
                            <td>स्पीड</td>
                            <td>गति</td>
                        </tr>
                        <tr>
                            <td>टी-सेरेमनी</td>
                            <td>जापान में चाय पीने का विशेष आयोजन</td>
                        </tr>
                        <tr>
                            <td>चा-नो-यू</td>
                            <td>जापानी में टी-सेरेमनी का नाम</td>
                        </tr>
                        <tr>
                            <td>दफ़्ती</td>
                            <td>लकड़ी की खोखली सरकने वाली दीवार जिस पर चित्रकारी होती है</td>
                        </tr>
                        <tr>
                            <td>पर्णकुटी</td>
                            <td>पत्तों से बनी कुटिया</td>
                        </tr>
                        <tr>
                            <td>बेढब-सा</td>
                            <td>बेडौल-सा</td>
                        </tr>
                        <tr>
                            <td>चाजीन</td>
                            <td>जापानी विधि से चाय पिलाने वाला</td>
                        </tr>
                        <tr>
                            <td>गरिमापूर्ण</td>
                            <td>सलीके से</td>
                        </tr>
                        <tr>
                            <td>भंगिमा</td>
                            <td>मुद्रा</td>
                        </tr>
                        <tr>
                            <td>जयजयवंती</td>
                            <td>एक राग का नाम</td>
                        </tr>
                        <tr>
                            <td>खदबदाना</td>
                            <td>उबलना</td>
                        </tr>
                        <tr>
                            <td>उलझन</td>
                            <td>असमंजस की स्थिति</td>
                        </tr>
                        <tr>
                            <td>अनंतकाल</td>
                            <td>वह काल जिसका अंत न हो</td>
                        </tr>
                        <tr>
                            <td>सन्नाटा</td>
                            <td>खामोशी</td>
                        </tr>
                        <tr>
                            <td>मिथ्या</td>
                            <td>भ्रम</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }
];
