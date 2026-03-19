/**
 * Pre-reading content and activities for Everest story
 */

// Pre-reading content data
const prereadingData = {
    introduction: {
        title: "पाठ प्रवेश",
        content: `
            <p>बछेंद्री पाल का जन्म उत्तरांचल के चमोली जिले में बम्पा गाँव में 24 मई 1954 को हुआ। आर्थिक तंगी के बावजूद उन्होंने संस्कृत से एम.ए. और फिर बी.एड. की शिक्षा हासिल की। पहाड़ों पर चढ़ने का चाव उन्हें बचपन से ही था।</p>
            
            <p>1984 में इंडियन माउंटेन फाउंडेशन ने एवरेस्ट अभियान पर जाने का साहस रखने वाली महिलाओं की खोज शुरू की। बछेंद्री इस अभियान-दल में शामिल हो गईं। कई महीनों के अभ्यास के बाद आखिर वह दिन आ ही गया, जब उन्होंने एवरेस्ट विजय के लिए प्रयाण किया।</p>
            
            <p>प्रस्तुत पाठ उनकी इस रोमांचक पर्वतारोहण-यात्रा का संपूर्ण विवरण है। यह लोमहर्षक अंश बछेंद्री के उस अंतिम पड़ाव से शिखर तक पहुँचकर तिरंगा लहराने के पल-पल का ब्योरा बताता है।</p>
        `
    },
    backgroundInfo: {
        title: "पृष्ठभूमि",
        content: `
            <h4>एवरेस्ट पर्वत</h4>
            <p>एवरेस्ट पर्वत की ऊंचाई 8,848 मीटर (29,029 फीट) है। यह नेपाल में 'सागरमाथा' और तिब्बत में 'चोमोलुंगमा' के नाम से जाना जाता है।</p>
            
            <h4>पर्वतारोहण की चुनौतियाँ</h4>
            <p>एवरेस्ट पर चढ़ना अत्यंत चुनौतीपूर्ण है। मुख्य खतरे हैं: हिमस्खलन, ऑक्सीजन की कमी, अत्यधिक ठंड, तेज़ हवा, और दुर्गम रास्ते।</p>
            
            <h4>महिला सशक्तिकरण</h4>
            <p>बछेंद्री पाल की यह उपलब्धि भारतीय महिलाओं के लिए प्रेरणास्रोत बनी। उन्होंने साबित किया कि दृढ़ संकल्प और मेहनत से कोई भी लक्ष्य असंभव नहीं।</p>
        `
    }
};

// Initialize pre-reading content
function initializePrereadingContent() {
    console.log('Initializing pre-reading content');
    
    // Add background information if needed
    const prereadingModule = document.getElementById('prereading');
    if (prereadingModule && !prereadingModule.querySelector('.background-info')) {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.className = 'background-info';
        backgroundDiv.innerHTML = `
            <div class="exercise-card">
                <h3 class="activity-title">पृष्ठभूमि जानकारी</h3>
                <div class="content-block">
                    ${prereadingData.backgroundInfo.content}
                </div>
            </div>
        `;
        prereadingModule.appendChild(backgroundDiv);
    }
}

// Make function globally available
window.initializePrereadingContent = initializePrereadingContent;
