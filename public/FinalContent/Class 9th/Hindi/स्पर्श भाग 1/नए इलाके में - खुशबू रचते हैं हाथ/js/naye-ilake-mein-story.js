/**
 * Story/Poem content and narration for Chapter 10
 */

// Narration state
let autoNarrationEnabled = true; // Changed to true for better user experience
let narrationDisabledByUser = false;
let currentStoryPart = 1;

// Debug flag to enable verbose logging if needed
const DEBUG_NARRATION = false;

// Build poem content strictly from provided text
const poemContent = {
    title: "कविताएँ",
    author: "अरुण कमल",
    content: `
        <div class="poem-text" id="poem-nae-ilake-mein">
कविता (1): नए इलाके में\n(1) नए इलाके में इन नए बसते इलाकों में जहाँ रोज़ बन रहे हैं नए-नए मकान मैं अकसर रास्ता भूल जाता हूँ Published धोखा दे जाते हैं पुराने निशान खोजता हूँ ताकता पीपल का पेड़ खोजता हूँ ढहा हुआ घर और ज़मीन का खाली टुक जहाँ से बाएँ मुड़ना था मुझे फिर दो मकान बाद बिना रंगवाले लोहे के फाटक का घर था इकमंज़िला और मैं हर बार एक घर पीछे चल देता हूँ\nया दो घर आगे ठकमकाता यहाँ रोज़ कुछ बन रहा है रोज़ कुछ घट रहा है यहाँ स्मृति का भरोसा नहीं Reprint 2025-26 नए इलाके में/खुशबू रचते हैं हाथ/87 एक ही दिन में पुरानी पड़ जाती है दुनिया जैसे वसंत का गया पतझड़ को लौटा हूँ जैसे बैसाख का गया भादों को लौटा हूँ अब यही है उपाय कि हर दरवाज़ा खटखटाओ और पूछो- क्या यही है वो घर? समय बहुत कम है तुम्हारे पास आ चला पानी ढहा आ रहा अकास शायद पुकार ले कोई पहचाना ऊपर से देखकर
        </div>
        <div class="poem-text" id="poem-khushboo-rachte-hain-haath">
कविता (2): खुशबू रचते हैं हाथ\n(2) खुशबू रचते हैं हाथ कई गलियों के बीच कई नालों के पार कूड़े-करकट के ढेरों के बाद बदबू से फटते जाते इस टोले के अंदर खुशबू रचते हैं हाथ खुशबू रचते हैं हाथ। उभरी नसोंवाले हाथ घिसे नाखूनोंवाले हाथ पीपल के पत्ते-से नए-नए हाथ जूही की डाल-से खुशबूदार हाथ\nगंदे कटे-पिटे हाथ ज़ख्म से फटे हुए हाथ खुशबू रचते हैं हाथ खुशबू रचते हैं हाथ। यहीं इस गली में बनती हैं मुल्क की मशहूर अगरबत्तियाँ इन्हीं गंदे मुहल्लों के गंदे लोग बनाते हैं केवड़ा गुलाब खस और रातरानी अगरबत्तियाँ दुनिया की सारी गंदगी के बीच दुनिया की सारी खुशबू खुशबू रचते हैं हाथा  रचते रहते हैं हाथ खुशबू रचते हैं हाथ
        </div>
        <div class="comprehension-check">
            <h3>📝 बोध प्रश्न</h3>
            <div class="comprehension-question">1. निम्नलिखित प्रश्नों के उत्तर दीजिए- (क) नए बसते इलाके में कवि रास्ता क्यों भूल जाता है? (ख) कविता में कौन-कौन से पुराने निशानों का उल्लेख किया गया है? (ग) कवि एक घर पीछे या दो घर आगे क्यों चल देता है? (घ) 'वसंत का गया पतझड़' और 'बैसाख का गया भादों को लौटा' से क्या अभिप्राय है? (ङ) कवि ने इस कविता में 'समय की कमी' की ओर क्यों इशारा किया है? (च) इस कविता में कवि ने शहरों की किस विडंबना की ओर संकेत किया है?</div>
            <div class="comprehension-question">2. व्याख्या कीजिए- (क) यहाँ स्मृति का भरोसा नहीं एक ही दिन में पुरानी पड़ जाती है दुनिया (ख) समय बहुत कम है तुम्हारे पास आ चला पानी ढहा आ रहा अकास शायद पुकार ले कोई पहचाना ऊपर से देखकर</div>
            <div class="comprehension-question">योग्यता-विस्तार: पाठ में हिंदी महीनों के कुछ नाम आए हैं। आप सभी हिंदी महीनों के नाम क्रम से लिखिए।</div>
            <div class="comprehension-question">(2) खुशबू रचते हैं हाथ 1. निम्नलिखित प्रश्नों के उत्तर दीजिए (क) 'खुशबू रचनेवाले हाथ' कैसी परिस्थितियों में तथा कहाँ-कहाँ रहते हैं? (ख) कविता में कितने तरह के हाथों की चर्चा हुई है? (ग) कवि ने यह क्यों कहा है कि 'खुशबू रचते हैं हाथ'? (घ) जहाँ अगरबत्तियाँ बनती हैं, वहाँ का माहौल कैसा होता है? (ङ) इस कविता को लिखने का मुख्य उद्देश्य क्या है?</div>
            <div class="comprehension-question">2. व्याख्या कीजिए- (क) (i) पीपल के पत्ते से नए-नए हाथ जूही की डाल से खुशबूदार हाथ (ii) दुनिया की सारी गंदगी के बीच दुनिया की सारी खुशबू रचते रहते हैं हाथ (ख) कवि ने इस कविता में 'बहुवचन' का प्रयोग अधिक किया है? इसका क्या कारण है? (ग) कवि ने हाथों के लिए कौन-कौन से विशेषणों का प्रयोग किया है?</div>
        </div>
    `
};

// Story parts for the two poems
const storyParts = [
    {
        title: "नए इलाके में",
        content: `
            <h3>कविता (1): नए इलाके में</h3>
            <p> नए <span class="highlight-vocab">इलाके<span class="vocab-tooltip">क्षेत्र, जगह</span></span> में</p>
            <p>इन नए <span class="highlight-vocab">बसते<span class="vocab-tooltip">बसने वाले, रहने वाले</span></span> इलाकों में</p>
            <p>जहाँ रोज़ बन रहे हैं नए-नए <span class="highlight-vocab">मकान<span class="vocab-tooltip">घर</span></span></p>
            <p>मैं <span class="highlight-vocab">अकसर<span class="vocab-tooltip">प्रायः, बहुधा</span></span> रास्ता भूल जाता हूँ</p>
            <p><span class="highlight-vocab">धोखा<span class="vocab-tooltip">भ्रम, गलतफहमी</span></span> दे जाते हैं पुराने <span class="highlight-vocab">निशान<span class="vocab-tooltip">चिह्न, संकेत</span></span></p>
            <p>खोजता हूँ <span class="highlight-vocab">ताकता<span class="vocab-tooltip">देखता, ढूंढता</span></span> पीपल का पेड़</p>
            <p>खोजता हूँ <span class="highlight-vocab">ढहा<span class="vocab-tooltip">गिरा हुआ, ध्वस्त</span></span> हुआ घर</p>
            <p>और ज़मीन का खाली <span class="highlight-vocab">टुक<span class="vocab-tooltip">टुकड़ा, भाग</span></span></p>
            <p>जहाँ से बाएँ मुड़ना था मुझे</p>
            <p>फिर दो मकान बाद</p>
            <p>बिना रंगवाले लोहे के <span class="highlight-vocab">फाटक<span class="vocab-tooltip">दरवाज़ा, गेट</span></span> का घर था</p>
            <p><span class="highlight-vocab">इकमंज़िला<span class="vocab-tooltip">एक मंज़िल का</span></span></p>
            <p>और मैं हर बार एक घर पीछे चल देता हूँ</p>
            <p>या दो घर आगे <span class="highlight-vocab">ठकमकाता<span class="vocab-tooltip">धीरे-धीरे, डगमगाते हुए</span></span></p>
            <p>यहाँ रोज़ कुछ बन रहा है</p>
            <p>रोज़ कुछ <span class="highlight-vocab">घट<span class="vocab-tooltip">कम होना, नष्ट होना</span></span> रहा है</p>
            <p>यहाँ <span class="highlight-vocab">स्मृति<span class="vocab-tooltip">याद, स्मरण</span></span> का भरोसा नहीं</p>
            <p>एक ही दिन में पुरानी पड़ जाती है दुनिया</p>
            <p>जैसे <span class="highlight-vocab">वसंत<span class="vocab-tooltip">छह ऋतुओं में से एक, बसंत ऋतु</span></span> का गया <span class="highlight-vocab">पतझड़<span class="vocab-tooltip">एक ऋतु जब पेड़ों के पत्ते झड़ते हैं</span></span> को लौटा हूँ</p>
            <p>जैसे <span class="highlight-vocab">बैसाख<span class="vocab-tooltip">चैत के बाद आने वाला महीना (अप्रैल-मई)</span></span> का गया <span class="highlight-vocab">भादों<span class="vocab-tooltip">सावन के बाद आने वाला महीना (अगस्त-सितंबर)</span></span> को लौटा हूँ</p>
            <p>अब यही है <span class="highlight-vocab">उपाय<span class="vocab-tooltip">तरीका, समाधान</span></span> कि</p>
            <p>हर दरवाज़ा <span class="highlight-vocab">खटखटाओ<span class="vocab-tooltip">दस्तक देना</span></span> और पूछो-</p>
            <p>क्या यही है वो घर?</p>
            <p>समय बहुत कम है तुम्हारे पास</p>
            <p>आ चला पानी ढहा आ रहा <span class="highlight-vocab">अकास<span class="vocab-tooltip">आकाश, आसमान</span></span></p>
            <p>शायद <span class="highlight-vocab">पुकार<span class="vocab-tooltip">बुलाना, आवाज़ देना</span></span> ले कोई <span class="highlight-vocab">पहचाना<span class="vocab-tooltip">जाना-पहचाना</span></span></p>
            <p>ऊपर से देखकर</p>
        `
    },
    {
        title: "खुशबू रचते हैं हाथ",
        content: `
            <h3>कविता (2): खुशबू रचते हैं हाथ</h3>
            <p> <span class="highlight-vocab">खुशबू<span class="vocab-tooltip">सुगंध, महक</span></span> <span class="highlight-vocab">रचते<span class="vocab-tooltip">बनाते, सृजन करते</span></span> हैं हाथ</p>
            <p>कई <span class="highlight-vocab">गलियों<span class="vocab-tooltip">संकरी सड़कें</span></span> के बीच</p>
            <p>कई <span class="highlight-vocab">नालों<span class="vocab-tooltip">नाली, जल निकासी का मार्ग</span></span> के पार</p>
            <p><span class="highlight-vocab">कूड़े-करकट<span class="vocab-tooltip">कचरा, रद्दी</span></span> के ढेरों के बाद</p>
            <p><span class="highlight-vocab">बदबू<span class="vocab-tooltip">दुर्गंध, बुरी गंध</span></span> से फटते जाते इस <span class="highlight-vocab">टोले<span class="vocab-tooltip">मोहल्ला, बस्ती</span></span> के अंदर</p>
            <p>खुशबू रचते हैं हाथ</p>
            <p>खुशबू रचते हैं हाथ।</p>
            <p><span class="highlight-vocab">उभरी<span class="vocab-tooltip">बाहर निकली हुई</span></span> <span class="highlight-vocab">नसोंवाले<span class="vocab-tooltip">नसों वाले</span></span> हाथ</p>
            <p><span class="highlight-vocab">घिसे<span class="vocab-tooltip">घिसे हुए, पुराने</span></span> <span class="highlight-vocab">नाखूनोंवाले<span class="vocab-tooltip">नाखून वाले</span></span> हाथ</p>
            <p>पीपल के पत्ते-से नए-नए हाथ</p>
            <p><span class="highlight-vocab">जूही<span class="vocab-tooltip">एक सुगंधित फूल</span></span> की <span class="highlight-vocab">डाल<span class="vocab-tooltip">शाखा, टहनी</span></span>-से <span class="highlight-vocab">खुशबूदार<span class="vocab-tooltip">सुगंधित</span></span> हाथ</p>
            <p>गंदे <span class="highlight-vocab">कटे-पिटे<span class="vocab-tooltip">कटे और पिटे हुए</span></span> हाथ</p>
            <p><span class="highlight-vocab">ज़ख्म<span class="vocab-tooltip">चोट, घाव</span></span> से फटे हुए हाथ</p>
            <p>खुशबू रचते हैं हाथ</p>
            <p>खुशबू रचते हैं हाथ।</p>
            <p>यहीं इस गली में बनती हैं</p>
            <p><span class="highlight-vocab">मुल्क<span class="vocab-tooltip">देश</span></span> की <span class="highlight-vocab">मशहूर<span class="vocab-tooltip">प्रसिद्ध, मशहूर</span></span> <span class="highlight-vocab">अगरबत्तियाँ<span class="vocab-tooltip">सुगंधित छड़ियाँ</span></span></p>
            <p>इन्हीं गंदे <span class="highlight-vocab">मुहल्लों<span class="vocab-tooltip">मोहल्लों, क्षेत्रों</span></span> के गंदे लोग बनाते हैं</p>
            <p><span class="highlight-vocab">केवड़ा<span class="vocab-tooltip">एक सुगंधित पौधा</span></span> गुलाब <span class="highlight-vocab">खस<span class="vocab-tooltip">एक सुगंधित घास</span></span> और <span class="highlight-vocab">रातरानी<span class="vocab-tooltip">रात में खिलने वाला फूल</span></span> अगरबत्तियाँ</p>
            <p>दुनिया की सारी <span class="highlight-vocab">गंदगी<span class="vocab-tooltip">मैल, अपवित्रता</span></span> के बीच</p>
            <p>दुनिया की सारी खुशबू</p>
            <p>खुशबू रचते हैं हाथ</p>
            <p>रचते रहते हैं हाथ</p>
            <p>खुशबू रचते हैं हाथ</p>
        `
    }
];

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    // Load the first poem by default
    showStoryPart(1);
});

// Track highlight timeouts to clear them when needed
window.highlightTimeouts = [];

// Show the selected poem part (1 or 2)
function showStoryPart(partNumber) {
    if (DEBUG_NARRATION) console.log(`[DEBUG] showStoryPart(${partNumber}) called`);
    
    // Validate part number (1-based index)
    if (partNumber < 1 || partNumber > storyParts.length) {
        console.error(`Invalid part number: ${partNumber}. Must be between 1 and ${storyParts.length}`);
        return;
    }
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) {
        console.error('Story content container not found');
        return;
    }
    
    // Check if we're actually switching parts (to avoid redundant operations)
    const isSwitchingParts = partNumber !== currentStoryPart;
    
    // Update current story part
    currentStoryPart = partNumber;
    
    // Update the static navigation buttons to show active state
    const navButtons = document.querySelectorAll('.story-nav-btn');
    navButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === partNumber);
        btn.setAttribute('aria-pressed', index + 1 === partNumber);
    });
    
    // Clean up narration properly without stopping if auto-narration is enabled
    if (window.highlightTimeouts) {
        window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
        window.highlightTimeouts = [];
    }
    
    // Clear paragraph highlights
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    // Clear any existing content
    storyContent.innerHTML = '';
    
    // Get the selected part (0-based index)
    const selectedPart = storyParts[partNumber - 1];
    
    // Create part container
    const partContainer = document.createElement('div');
    partContainer.className = 'story-part active'; // Add 'active' class to make it visible
    partContainer.innerHTML = selectedPart.content;
    
    // Create interactive button inside the poem
    const poemButton = document.createElement('button');
    poemButton.className = 'interactive-btn poem-action-btn';
    poemButton.textContent = '📝 टिप्पणी जोड़ें';
    poemButton.onclick = function() {
        addPoemNote(partNumber);
    };
    
    // Add button inside the poem container
    partContainer.appendChild(document.createElement('br'));
    partContainer.appendChild(document.createElement('br'));
    partContainer.appendChild(poemButton);
    
    storyContent.appendChild(partContainer);
    
    // Start narration for the new part if auto-narration is enabled and we're switching parts
    if (isSwitchingParts && autoNarrationEnabled && !narrationDisabledByUser) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
            if (DEBUG_NARRATION) console.log(`[DEBUG] Auto-starting narration for newly switched part ${partNumber}`);
            readStoryPartAloud(partNumber, false);
        }, 100);
    }
}

// Read the selected story part aloud with paragraph highlighting
function readStoryPartAloud(partNumber, isManualCall = false) {
    if (DEBUG_NARRATION) console.log(`[DEBUG] readStoryPartAloud(${partNumber}, ${isManualCall}) called`);
    
    // Update current part being narrated
    currentStoryPart = partNumber;
    
    // Validate part number
    if (partNumber < 1 || partNumber > storyParts.length) {
        console.error(`Invalid part number: ${partNumber}`);
        return;
    }
    
    // If this is a manual call, update the narration state
    if (isManualCall) {
        narrationDisabledByUser = false;
        autoNarrationEnabled = true;
    }
    
    // If narration is disabled by user, don't proceed
    if (narrationDisabledByUser) return;
    
    // Process the story part immediately
    processStoryPartForNarration(partNumber, isManualCall);
}

// Process and narrate the story part
function processStoryPartForNarration(partNumber, isManualCall = true) {
    if (DEBUG_NARRATION) console.log(`[DEBUG] processStoryPartForNarration(${partNumber}, ${isManualCall}) called`);
    
    const part = storyParts[partNumber - 1];
    if (!part) {
        console.error(`Story part ${partNumber} not found`);
        return;
    }
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) return;
    
    // Get all paragraphs in the current part
    const paragraphs = storyContent.querySelectorAll('.story-part.active p');
    if (!paragraphs || paragraphs.length === 0) {
        if (DEBUG_NARRATION) console.log(`[DEBUG] No paragraphs found in part ${partNumber}`);
        return;
    }
    
    // Stop any ongoing narration and clean up
    stopNarration();
    
    // Extract text content to read
    let storyTextContent = '';
    
    // Add title
    storyTextContent += `${part.title}. `;
    
    // Filter valid paragraphs and add their content
    const validParagraphs = Array.from(paragraphs).filter(p => {
        // Skip if empty
        if (!p || !p.textContent.trim()) return false;
        // Skip if inside a vocabulary note or comprehension check
        if (p.closest('.vocabulary-note') || p.closest('.comprehension-check')) return false;
        return true;
    });
    
    if (DEBUG_NARRATION) console.log(`[DEBUG] Found ${validParagraphs.length} valid paragraphs for narration`);
    
    // Process paragraph text
    if (validParagraphs.length > 0) {
        const paragraphTexts = validParagraphs.map((p, idx) => {
            // Clone paragraph to work with
            const pClone = p.cloneNode(true);
            
            // Remove tooltip spans entirely so they're not read
            const tooltips = pClone.querySelectorAll('.vocab-tooltip');
            tooltips.forEach(tooltip => tooltip.remove());
            
            // Keep only the main words from highlight-vocab elements (without tooltip text)
            const highlightElements = pClone.querySelectorAll('.highlight-vocab');
            highlightElements.forEach(highlight => {
                // Get only the main text content without any nested elements
                const mainText = highlight.childNodes[0].textContent.trim();
                
                // Replace the highlight-vocab element with just the word
                if (highlight.parentNode) {
                    highlight.parentNode.replaceChild(document.createTextNode(mainText), highlight);
                }
            });
            
            // Get clean text
            let text = pClone.textContent.trim();
            // Normalize whitespace
            text = text.replace(/\s+/g, ' ');
            
            // Log for debugging
            console.log(`Processing paragraph ${idx+1}: "${text}"`);
            
            return text;
        }).filter(text => text.length > 0);
        
        // Join paragraphs with a period and space to ensure proper separation
        storyTextContent += paragraphTexts.join('. ');
    }
    
    // Read the content aloud using chunking for better stability
    if (window.narrator && storyTextContent) {
        try {
            console.log("Full text to narrate:", storyTextContent);
            console.log("Total paragraphs to narrate:", validParagraphs.length);
            
            // Add visual indicator that reading is happening
            const readingIndicator = createReadingIndicator(partNumber);
            const partContainer = storyContent.querySelector('.story-part.active');
            if (partContainer && readingIndicator) {
                partContainer.appendChild(readingIndicator);
            }
            
            // Special handling for direct narration to ensure all text is read
            if (partNumber === 1 || partNumber === 2) { // For both poems to ensure all lines are read
                console.log(`Using special paragraph-by-paragraph narration for poem ${partNumber}`);
                
                // Directly read each paragraph sequentially
                let currentIndex = 0;
                
                const readNextParagraph = () => {
                    if (currentIndex >= validParagraphs.length) {
                        console.log("Finished reading all paragraphs");
            return;
        }
                    
                    const paragraph = validParagraphs[currentIndex];
                    console.log(`Reading paragraph ${currentIndex+1}/${validParagraphs.length}`);
        
        // Highlight the current paragraph
                    document.querySelectorAll('.paragraph-highlight').forEach(p => {
                        p.classList.remove('paragraph-highlight');
                    });
        paragraph.classList.add('paragraph-highlight');
        
                    // Extract text properly without tooltips
                    // Clone the paragraph to avoid modifying the original
                    const pClone = paragraph.cloneNode(true);
                    
                    // Remove all tooltip spans
                    const tooltips = pClone.querySelectorAll('.vocab-tooltip');
                    tooltips.forEach(tooltip => tooltip.remove());
                    
                    // Get the cleaned text without tooltips
                    let text = pClone.textContent.trim();
                    
                    // Speak the paragraph
        if (window.narrator) {
            window.narrator.onEndCallback = () => {
                            currentIndex++;
                            setTimeout(() => {
                    readNextParagraph();
                            }, 300);
                        };
                        
                        window.narrator.speak(text);
        }
    };
    
    // Start reading
    readNextParagraph();
            } else {
                // Regular handling for other parts
                // Split text into chunks for better narration
                const chunks = splitTextIntoChunks(storyTextContent);
                console.log(`Split text into ${chunks.length} chunks`);
                
                // Register narration end event
                if (window.narrator.onEndCallback) {
                    window.narrator.onEndCallback = null;
                }
                
                window.narrator.onEndCallback = function() {
                    // Clean up reading indicator
                    const indicator = document.getElementById(`reading-indicator-${partNumber}`);
                    if (indicator) {
                        indicator.classList.add('fade-out');
                        setTimeout(() => {
                            if (indicator.parentNode) indicator.remove();
                        }, 500);
                    }
                };
                
                // Speak text chunks sequentially
                speakTextChunksSequentially(chunks, validParagraphs);
            }
        } catch (error) {
            console.error("Error starting narration:", error);
        }
    }
}

// Create a reading indicator element
function createReadingIndicator(partNumber) {
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.id = `reading-indicator-${partNumber}`;
    
    // Special indicator for the second poem
    if (partNumber === 2) {
        readingIndicator.innerHTML = '<div class="reading-spinner"></div> खुशबू रचते हैं हाथ कविता पढ़ी जा रही है...';
    } else {
        readingIndicator.innerHTML = '<div class="reading-spinner"></div> पढ़ा जा रहा है...';
    }
    
    // Add stop button
    const stopButton = document.createElement('button');
    stopButton.className = 'interactive-btn stop-narration-btn';
    stopButton.innerHTML = '⏹️ पढ़ना रोकें';
    stopButton.onclick = stopNarration;
    readingIndicator.appendChild(stopButton);
    
    // Make the indicator more visible
    readingIndicator.style.padding = '10px';
    readingIndicator.style.margin = '15px 0';
    
    return readingIndicator;
}

// Stop ongoing narration
function stopNarration() {
    // Cancel speech synthesis directly
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    
    // Use narrator's stop method if available
    if (window.narrator) {
        window.narrator.stop();
    }
    
    // Clear any existing timeouts
    if (window.highlightTimeouts) {
        window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
        window.highlightTimeouts = [];
    }
    
    // Remove paragraph highlights
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    // Remove reading indicators
    document.querySelectorAll('.reading-indicator').forEach(indicator => {
        indicator.remove();
    });
}

// Split text into manageable chunks for more reliable narration
function splitTextIntoChunks(text, chunkSize = 150) {
    // Try to split at sentence boundaries (including Hindi danda)
    const sentences = text.match(/[^.!?\u0964]+[.!?\u0964]+/g) || [];
    
    if (sentences.length === 0) {
        return [text];
    }
    
    const chunks = [];
    let currentChunk = '';
    
    sentences.forEach(sentence => {
        // If adding this sentence would make the chunk too long, start a new chunk
        if (currentChunk.length + sentence.length > chunkSize) {
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

// Speak text chunks sequentially with paragraph highlighting
function speakTextChunksSequentially(chunks, paragraphs, index = 0) {
    if (index >= chunks.length) return;
    
    try {
        // Create utterance for this chunk
        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        
        // Apply voice settings if available
        if (window.narrator && window.narrator.voice) {
            utterance.voice = window.narrator.voice;
        }
        
        // Highlight paragraphs progressively
        highlightParagraphsForChunk(paragraphs, index, chunks.length);
        
        // Set event handlers
        utterance.onend = () => {
            // Continue to next chunk with minimal delay
            setTimeout(() => {
                speakTextChunksSequentially(chunks, paragraphs, index + 1);
            }, 50);
        };
        
        utterance.onerror = (event) => {
            if (DEBUG_NARRATION) console.log(`[DEBUG] Error speaking chunk: ${event.error}`);
            // Try next chunk even on error
            setTimeout(() => {
                speakTextChunksSequentially(chunks, paragraphs, index + 1);
            }, 100);
        };
        
        // Store current utterance in narrator
        if (window.narrator) {
            window.narrator.currentUtterance = utterance;
        }
        
        // Speak the chunk
        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.error("Error in sequential narration:", e);
        // Try next chunk
        setTimeout(() => {
            speakTextChunksSequentially(chunks, paragraphs, index + 1);
        }, 100);
    }
}

// Highlight paragraphs progressively during narration
function highlightParagraphsForChunk(paragraphs, chunkIndex, totalChunks) {
    // Remove existing highlights
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
    
    // Calculate which paragraphs to highlight based on progress
    const progress = chunkIndex / totalChunks;
    const paragraphToHighlight = Math.floor(progress * paragraphs.length);
    
    // Highlight the current paragraph
    if (paragraphs[paragraphToHighlight]) {
        paragraphs[paragraphToHighlight].classList.add('paragraph-highlight');
        
        // Scroll to paragraph if needed
        const storyContent = document.getElementById('storyContent');
        if (storyContent) {
            const rect = paragraphs[paragraphToHighlight].getBoundingClientRect();
            const containerRect = storyContent.getBoundingClientRect();
            
            if (rect.top < containerRect.top || rect.bottom > containerRect.bottom) {
                storyContent.scrollTop = paragraphs[paragraphToHighlight].offsetTop - 100;
            }
        }
    }
}

function highlightVocabulary() {
    // Toggle vocabulary highlighting
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) return;
    
    const highlightedWords = storyContent.querySelectorAll('.highlight-vocab');
    const isHighlighted = highlightedWords.length > 0 && highlightedWords[0].style.backgroundColor !== '';
    
    if (isHighlighted) {
        // Remove highlighting
        highlightedWords.forEach(word => {
            word.style.backgroundColor = '';
            word.style.color = '';
            word.style.borderRadius = '';
            word.style.padding = '';
        });
        
        // Remove vocabulary list if exists
        const existingVocabList = storyContent.querySelector('.vocabulary-list');
        if (existingVocabList) {
            existingVocabList.remove();
        }
        
        const feedbackMsg = document.createElement('div');
        feedbackMsg.className = 'feedback-message info show';
        feedbackMsg.textContent = 'शब्दार्थ हाइलाइट हटाया गया।';
        storyContent.appendChild(feedbackMsg);
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 2000);
    } else {
        // Add highlighting
        highlightedWords.forEach(word => {
            word.style.backgroundColor = '#fff3cd';
            word.style.color = '#856404';
            word.style.borderRadius = '3px';
            word.style.padding = '2px 4px';
            word.style.cursor = 'help';
        });
        
        // Create comprehensive vocabulary list
        createVocabularyList();
        
        const feedbackMsg = document.createElement('div');
        feedbackMsg.className = 'feedback-message success show';
        feedbackMsg.textContent = 'शब्दार्थ हाइलाइट किया गया। नीचे शब्दों की सूची देखें।';
        storyContent.appendChild(feedbackMsg);
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

function createVocabularyList() {
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) return;
    
    // Remove existing vocabulary list
    const existingVocabList = storyContent.querySelector('.vocabulary-list');
    if (existingVocabList) {
        existingVocabList.remove();
    }
    
    // Create vocabulary list container
    const vocabList = document.createElement('div');
    vocabList.className = 'vocabulary-list';
    vocabList.innerHTML = `
        <div class="vocab-section">
            <h3>📚 शब्दार्थ (Word Meanings)</h3>
            <div class="vocab-grid">
                <div class="vocab-column">
                    <h4>कविता 1: नए इलाके में</h4>
                    <div class="vocab-item"><strong>इलाके:</strong> क्षेत्र, जगह</div>
                    <div class="vocab-item"><strong>बसते:</strong> बसने वाले, रहने वाले</div>
                    <div class="vocab-item"><strong>मकान:</strong> घर</div>
                    <div class="vocab-item"><strong>अकसर:</strong> प्रायः, बहुधा</div>
                    <div class="vocab-item"><strong>धोखा:</strong> भ्रम, गलतफहमी</div>
                    <div class="vocab-item"><strong>निशान:</strong> चिह्न, संकेत</div>
                    <div class="vocab-item"><strong>ताकता:</strong> देखता, ढूंढता</div>
                    <div class="vocab-item"><strong>ढहा:</strong> गिरा हुआ, ध्वस्त</div>
                    <div class="vocab-item"><strong>टुक:</strong> टुकड़ा, भाग</div>
                    <div class="vocab-item"><strong>फाटक:</strong> दरवाज़ा, गेट</div>
                    <div class="vocab-item"><strong>इकमंज़िला:</strong> एक मंज़िल का</div>
                    <div class="vocab-item"><strong>ठकमकाता:</strong> धीरे-धीरे, डगमगाते हुए</div>
                    <div class="vocab-item"><strong>घट:</strong> कम होना, नष्ट होना</div>
                    <div class="vocab-item"><strong>स्मृति:</strong> याद, स्मरण</div>
                    <div class="vocab-item"><strong>वसंत:</strong> छह ऋतुओं में से एक, बसंत ऋतु</div>
                    <div class="vocab-item"><strong>पतझड़:</strong> एक ऋतु जब पेड़ों के पत्ते झड़ते हैं</div>
                    <div class="vocab-item"><strong>बैसाख:</strong> चैत के बाद आने वाला महीना (अप्रैल-मई)</div>
                    <div class="vocab-item"><strong>भादों:</strong> सावन के बाद आने वाला महीना (अगस्त-सितंबर)</div>
                    <div class="vocab-item"><strong>उपाय:</strong> तरीका, समाधान</div>
                    <div class="vocab-item"><strong>खटखटाओ:</strong> दस्तक देना</div>
                    <div class="vocab-item"><strong>अकास:</strong> आकाश, आसमान</div>
                    <div class="vocab-item"><strong>पुकार:</strong> बुलाना, आवाज़ देना</div>
                    <div class="vocab-item"><strong>पहचाना:</strong> जाना-पहचाना</div>
                </div>
                <div class="vocab-column">
                    <h4>कविता 2: खुशबू रचते हैं हाथ</h4>
                    <div class="vocab-item"><strong>खुशबू:</strong> सुगंध, महक</div>
                    <div class="vocab-item"><strong>रचते:</strong> बनाते, सृजन करते</div>
                    <div class="vocab-item"><strong>गलियों:</strong> संकरी सड़कें</div>
                    <div class="vocab-item"><strong>नालों:</strong> नाली, जल निकासी का मार्ग</div>
                    <div class="vocab-item"><strong>कूड़े-करकट:</strong> कचरा, रद्दी</div>
                    <div class="vocab-item"><strong>बदबू:</strong> दुर्गंध, बुरी गंध</div>
                    <div class="vocab-item"><strong>टोले:</strong> मोहल्ला, बस्ती</div>
                    <div class="vocab-item"><strong>उभरी:</strong> बाहर निकली हुई</div>
                    <div class="vocab-item"><strong>नसोंवाले:</strong> नसों वाले</div>
                    <div class="vocab-item"><strong>घिसे:</strong> घिसे हुए, पुराने</div>
                    <div class="vocab-item"><strong>नाखूनोंवाले:</strong> नाखून वाले</div>
                    <div class="vocab-item"><strong>जूही:</strong> एक सुगंधित फूल</div>
                    <div class="vocab-item"><strong>डाल:</strong> शाखा, टहनी</div>
                    <div class="vocab-item"><strong>खुशबूदार:</strong> सुगंधित</div>
                    <div class="vocab-item"><strong>कटे-पिटे:</strong> कटे और पिटे हुए</div>
                    <div class="vocab-item"><strong>ज़ख्म:</strong> चोट, घाव</div>
                    <div class="vocab-item"><strong>मुल्क:</strong> देश</div>
                    <div class="vocab-item"><strong>मशहूर:</strong> प्रसिद्ध, मशहूर</div>
                    <div class="vocab-item"><strong>अगरबत्तियाँ:</strong> सुगंधित छड़ियाँ</div>
                    <div class="vocab-item"><strong>मुहल्लों:</strong> मोहल्लों, क्षेत्रों</div>
                    <div class="vocab-item"><strong>केवड़ा:</strong> एक सुगंधित पौधा</div>
                    <div class="vocab-item"><strong>खस:</strong> एक सुगंधित घास</div>
                    <div class="vocab-item"><strong>रातरानी:</strong> रात में खिलने वाला फूल</div>
                    <div class="vocab-item"><strong>गंदगी:</strong> मैल, अपवित्रता</div>
                </div>
            </div>
        </div>
    `;
    
    // Add the vocabulary list to the story content
    storyContent.appendChild(vocabList);
}

function togglePrintMode() {
    document.body.classList.toggle('print-mode');
    const isPrintMode = document.body.classList.contains('print-mode');
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = isPrintMode ? 
        'प्रिंट मोड सक्रिय। प्रिंट करने के लिए अपने ब्राउज़र का प्रिंट फ़ंक्शन उपयोग करें।' : 
        'प्रिंट मोड निष्क्रिय।';
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.appendChild(feedbackMsg);
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

// Function to add note for the poem
function addPoemNote(poemNumber) {
    const poemTitle = storyParts[poemNumber - 1].title;
    
    // Create note container
    const noteContainer = document.createElement('div');
    noteContainer.className = 'poem-note-container';
    
    // Create note form
    noteContainer.innerHTML = `
        <div class="poem-note-form">
            <h4>कविता "${poemTitle}" पर टिप्पणी</h4>
            <textarea class="poem-note-input" placeholder="अपनी टिप्पणी यहां लिखें..." rows="4"></textarea>
            <div class="note-actions">
                <button class="interactive-btn save-note-btn">सहेजें</button>
                <button class="interactive-btn cancel-note-btn">रद्द करें</button>
            </div>
        </div>
    `;
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) return;
    
    // Find the poem button and add the note form after it
    const poemButton = storyContent.querySelector('.poem-action-btn');
    if (poemButton) {
        poemButton.style.display = 'none'; // Hide the button while adding note
        poemButton.insertAdjacentElement('afterend', noteContainer);
        
        // Focus on textarea
        const textarea = noteContainer.querySelector('.poem-note-input');
        if (textarea) textarea.focus();
        
        // Add event listeners to buttons
        const saveBtn = noteContainer.querySelector('.save-note-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const noteText = textarea.value.trim();
                if (noteText) {
                    // Save the note and display it
                    saveAndDisplayNote(noteText, poemNumber);
                    
                    // Show feedback
                    const feedbackMsg = document.createElement('div');
                    feedbackMsg.className = 'feedback-message success show';
                    feedbackMsg.textContent = 'टिप्पणी सफलतापूर्वक सहेजी गई!';
                    storyContent.appendChild(feedbackMsg);
                    setTimeout(() => {
                        feedbackMsg.classList.remove('show');
                        setTimeout(() => feedbackMsg.remove(), 500);
                    }, 3000);
                    
                    // Remove the note form
                    noteContainer.remove();
                    
                    // Show the button again
                    poemButton.style.display = 'inline-block';
                } else {
                    // Show error if note is empty
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'feedback-message error show';
                    errorMsg.textContent = 'कृपया टिप्पणी लिखें।';
                    noteContainer.appendChild(errorMsg);
                    setTimeout(() => {
                        errorMsg.classList.remove('show');
                        setTimeout(() => errorMsg.remove(), 500);
                    }, 3000);
                }
            });
        }
        
        // Cancel button handler
        const cancelBtn = noteContainer.querySelector('.cancel-note-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                noteContainer.remove();
                poemButton.style.display = 'inline-block'; // Show the button again
            });
        }
    }
}

// Function to save and display the note
function saveAndDisplayNote(noteText, poemNumber) {
    // Create note display container
    const noteDisplay = document.createElement('div');
    noteDisplay.className = 'poem-note-display';
    
    // Add note content
    noteDisplay.innerHTML = `
        <div class="poem-note-content">
            <h4>आपकी टिप्पणी:</h4>
            <p>${noteText}</p>
            <div class="note-actions">
                <button class="interactive-btn edit-note-btn">संपादित करें</button>
                <button class="interactive-btn delete-note-btn">हटाएँ</button>
            </div>
        </div>
    `;
    
    // Get the story content container
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) return;
    
    // Find the poem button and add the note display before it
    const poemButton = storyContent.querySelector('.poem-action-btn');
    if (poemButton) {
        poemButton.insertAdjacentElement('beforebegin', noteDisplay);
        poemButton.textContent = '📝 टिप्पणी संपादित करें'; // Change button text
        
        // Edit button handler
        const editBtn = noteDisplay.querySelector('.edit-note-btn');
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                // Hide the note display
                noteDisplay.style.display = 'none';
                
                // Call the add note function again to create a new form, but with existing content
                addPoemNote(poemNumber);
                
                // Pre-fill the textarea with existing note
                const textarea = document.querySelector('.poem-note-input');
                if (textarea) {
                    textarea.value = noteText;
                }
            });
        }
        
        // Delete button handler
        const deleteBtn = noteDisplay.querySelector('.delete-note-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                // Ask for confirmation
                if (confirm('क्या आप वाकई इस टिप्पणी को हटाना चाहते हैं?')) {
                    noteDisplay.remove();
                    poemButton.textContent = '📝 टिप्पणी जोड़ें'; // Reset button text
                }
            });
        }
    }
}

// Toggle Read Aloud functionality for the current poem
function toggleReadAloud() {
    if (DEBUG_NARRATION) console.log(`[DEBUG] toggleReadAloud() called`);
    
    // Check if already speaking
    const isSpeaking = window.speechSynthesis && window.speechSynthesis.speaking;
    
    // If already reading, stop
    if (isSpeaking || (window.narrator && window.narrator.currentUtterance)) {
        if (DEBUG_NARRATION) console.log(`[DEBUG] Stopping ongoing narration`);
        stopNarration();
        narrationDisabledByUser = true;
        return;
    }
    
    // Get the currently active poem part
    const activeNavBtn = document.querySelector('.story-nav-btn.active');
    let currentPartNumber = 1; // Default to first poem
    
    if (activeNavBtn) {
        // Find which poem is active based on the active button
        const navButtons = document.querySelectorAll('.story-nav-btn');
        navButtons.forEach((button, index) => {
            if (button.classList.contains('active')) {
                currentPartNumber = index + 1;
            }
        });
    }
    
    if (DEBUG_NARRATION) console.log(`[DEBUG] Starting narration for part ${currentPartNumber}`);
    
    // Enable narration
    narrationDisabledByUser = false;
    autoNarrationEnabled = true;
    
    // Start reading the current poem
    readStoryPartAloud(currentPartNumber, true);
}