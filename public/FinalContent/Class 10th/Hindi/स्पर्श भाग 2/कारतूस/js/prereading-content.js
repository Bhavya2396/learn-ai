/**
 * Content for पाठ प्रवेश (Prereading) module
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load prereading content when tab is activated
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            if (this.textContent.includes('पाठ प्रवेश')) {
                setTimeout(loadPrereadingContent, 100);
            }
        });
    });

    // Also load content if that tab is initially active
    if (document.querySelector('.nav-item.active').textContent.includes('पाठ प्रवेश')) {
        setTimeout(loadPrereadingContent, 100);
    }
});

// Load prereading content
function loadPrereadingContent() {
    console.log('Loading prereading content');
    const prereadingContainer = document.getElementById('prereading-content');
    
    if (!prereadingContainer) {
        console.error('Prereading container not found');
        return;
    }

    prereadingContainer.innerHTML = `
        <div class="author-info">
            <h3>लेखक परिचय: हबीब तनवीर</h3>
            <p>हबीब तनवीर का जन्म 1923 में छत्तीसगढ़ के रायपुर में हुआ था। उन्होंने नाटककार, कवि, पत्रकार, अभिनेता और नाट्य निर्देशक के रूप में ख्याति प्राप्त की। वे लोकनाट्य के क्षेत्र में अग्रणी रहे और उन्होंने नाटकों में लोकतत्वों को प्रमुखता दी।</p>

            <p>हबीब तनवीर ने आगरा बाज़ार, चरनदास चोर, देख रहे हैं नैन और हिरमा की अमर कहानी जैसे प्रसिद्ध नाटक लिखे। उन्होंने बसंत ऋतु का सपना, शाजापुर की शांति बाई और मिट्टी की गाड़ी जैसे नाटकों का आधुनिक रूपांतर भी किया।</p>

            <p>हबीब तनवीर को कई प्रतिष्ठित पुरस्कारों और सम्मानों से नवाज़ा गया, जिनमें पद्मश्री और संगीत नाटक अकादमी पुरस्कार शामिल हैं। वर्ष 2009 में उनका निधन हो गया, लेकिन उनका सृजनात्मक योगदान सदा याद रखा जाएगा।</p>
        </div>

        <div class="play-intro">
            <h3>नाटक "कारतूस" का परिचय</h3>
            <p>हबीब तनवीर द्वारा रचित "कारतूस" एक ऐतिहासिक नाटक है, जो अवध के शासक वज़ीर अली और अंग्रेज़ अधिकारियों के बीच के तनावपूर्ण संबंधों पर आधारित है। यह नाटक वज़ीर अली की दिलेरी, चतुराई और देशभक्ति को दर्शाता है, जो अपने दुश्मन के खेमे में जाकर भी साहस से पेश आता है।</p>

            <p>इस नाटक का कथानक सन् 1799 का है, जब अंग्रेज़ों ने वज़ीर अली को अवध के शासक पद से हटाकर सआदत अली को वहां बिठा दिया था। वज़ीर अली अंग्रेज़ों के विरुद्ध था और उसका एकमात्र उद्देश्य अंग्रेज़ों को हिंदुस्तान से निकालना था। नाटक की कहानी गोरखपुर के जंगलों में कर्नल कालिंज के खेमे में घटित होती है, जहाँ कर्नल और लेफ्टीनेंट वज़ीर अली को गिरफ्तार करने की योजना बना रहे हैं।</p>

            <p>नाटक का मुख्य आकर्षण अंत में आता है, जब वज़ीर अली स्वयं अपने दुश्मन के खेमे में जाकर उससे कारतूस माँगता है और अंत में अपनी पहचान बताकर सबको चौंका देता है। यह नाटक देशभक्ति, साहस और चतुराई का प्रतीक है।</p>
        </div>

        <div class="historical-context">
            <h3>ऐतिहासिक पृष्ठभूमि</h3>
            <p>18वीं शताब्दी के अंत और 19वीं शताब्दी की शुरुआत में, ईस्ट इंडिया कंपनी भारत के विभिन्न हिस्सों में अपना प्रभाव बढ़ा रही थी। अवध भी इसका अपवाद नहीं था। कंपनी ने अपने हितों के अनुरूप शासकों को नियुक्त करना और हटाना शुरू कर दिया था।</p>

            <p>वज़ीर अली जैसे कई स्वतंत्रता प्रेमी और साहसी नेता इस विदेशी हस्तक्षेप के खिलाफ़ थे। उनका विरोध और संघर्ष भारत के स्वतंत्रता संग्राम की प्रारंभिक अभिव्यक्तियों में से एक है। इस नाटक के माध्यम से हबीब तनवीर ने इस ऐतिहासिक यथार्थ को जीवंत किया है।</p>
        </div>
    `;

    // Load reflection options
    loadReflectionOptions();
}

// Load reflection options
function loadReflectionOptions() {
    const optionsContainer = document.getElementById('prereading-reflection-options');
    
    if (!optionsContainer) {
        console.error('Reflection options container not found');
        return;
    }

    optionsContainer.innerHTML = `
        <div class="reflection-option">
            <input type="radio" id="reflection1" name="reflection" value="साहस">
            <label for="reflection1">वज़ीर अली की दिलेरी और साहस आज के युवाओं के लिए प्रेरणा स्रोत है। देश के लिए हर खतरा मोल लेने की उनकी तत्परता सच्चे देशभक्त का परिचय देती है।</label>
        </div>
        <div class="reflection-option">
            <input type="radio" id="reflection2" name="reflection" value="चतुराई">
            <label for="reflection2">वज़ीर अली की चतुराई सराहनीय है। दुश्मन के खेमे में जाकर अपनी पहचान छिपाकर कारतूस माँगना उनकी बुद्धिमत्ता का परिचायक है।</label>
        </div>
        <div class="reflection-option">
            <input type="radio" id="reflection3" name="reflection" value="देशभक्ति">
            <label for="reflection3">देश के प्रति समर्पण एक व्यक्ति को असाधारण कार्य करने के लिए प्रेरित करता है। वज़ीर अली का अंग्रेज़ों को हिंदुस्तान से निकालने का संकल्प उनके देशप्रेम का प्रमाण है।</label>
        </div>
        <div class="reflection-option">
            <input type="radio" id="reflection4" name="reflection" value="अन्य">
            <label for="reflection4">अपने देश के प्रति समर्पण और त्याग की भावना एक समाज के विकास के लिए महत्वपूर्ण है। वज़ीर अली के चरित्र से हमें सीख लेनी चाहिए कि कैसे विपरीत परिस्थितियों में भी अपने लक्ष्य के प्रति दृढ़ रहा जाए।</label>
        </div>
    `;
}

// Save reflection function (called from index.html)
window.saveReflection = function() {
    const selectedReflection = document.querySelector('input[name="reflection"]:checked');
    const feedbackDiv = document.getElementById('reflectionFeedback');
    
    if (!selectedReflection) {
        feedbackDiv.textContent = 'कृपया एक विचार चुनें।';
        feedbackDiv.className = 'feedback-message warning show';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    feedbackDiv.textContent = 'आपका चिंतन सहेज लिया गया है। धन्यवाद!';
    feedbackDiv.className = 'feedback-message success show';
    
    // Update score
    if (typeof window.addScore === 'function') {
        window.addScore(5);
    }

    // Mark module as completed
    if (typeof window.markModuleCompleted === 'function') {
        setTimeout(() => window.markModuleCompleted('prereading'), 1000);
    }
    
    // Auto-hide feedback after 3 seconds
    setTimeout(() => {
        feedbackDiv.classList.remove('show');
    }, 3000);
};
