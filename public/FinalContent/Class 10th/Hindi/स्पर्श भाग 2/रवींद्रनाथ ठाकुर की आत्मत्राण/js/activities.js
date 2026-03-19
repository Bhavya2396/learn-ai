/**
 * Activities for Ravindranath Tagore's Atmatran interactive Hindi lesson
 */

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activities
    setupActivityListeners();
    
    // Update static activities progress automatically
    if (typeof updateProgress === 'function') {
        setTimeout(() => {
            updateProgress('activities', 10); // For speaking activity
            updateProgress('activities', 15); // For writing activity
        }, 1000);
    }
});

// Set up event listeners for activities
function setupActivityListeners() {
    // Speaking section now shows static answer, no button needed
    
    // Play listening activity button
    const listenBtn = document.querySelector('.listening-activity .interactive-btn');
    if (listenBtn) {
        listenBtn.addEventListener('click', playListeningActivity);
    }
    
    // Writing activity now shows static answer, no button needed
    
    // Check listening answer button
    const checkListeningBtn = document.querySelector('.listening-notes .interactive-btn');
    if (checkListeningBtn) {
        checkListeningBtn.addEventListener('click', checkListeningAnswer);
    }
    
    // Writing now shows static answer, no button needed
    
    // Resource links
    const resourceLinks = document.querySelectorAll('.project-resources a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceId = this.getAttribute('onclick').match(/showResource\('(.+?)'\)/)[1];
            showResource(resourceId);
        });
    });
}

// Tagore's life content for listening activity
const tagoreLifeContent = `
रवींद्रनाथ ठाकुर का जन्म 6 मई 1861 को बंगाल के एक संपन्न परिवार में हुआ था। वे जोरासांको के प्रसिद्ध ठाकुर परिवार के सदस्य थे, जिसने बंगाल के सांस्कृतिक और बौद्धिक विकास में महत्वपूर्ण योगदान दिया।

रवींद्रनाथ ठाकुर की शिक्षा-दीक्षा घर पर ही हुई थी। वे बचपन से ही अत्यंत प्रतिभाशाली थे और उन्होंने छोटी उम्र में ही स्वाध्याय से अनेक विषयों का ज्ञान अर्जित कर लिया था। उन्होंने आठ वर्ष की आयु में ही कविता लिखना शुरू कर दिया था।

बैरिस्ट्री की शिक्षा के लिए उन्हें इंग्लैंड भेजा गया था, लेकिन वे बिना परीक्षा दिए ही भारत लौट आए। वे औपचारिक शिक्षा की परंपरागत पद्धतियों से संतुष्ट नहीं थे और प्रकृति में रहकर सीखने में विश्वास रखते थे।

1901 में उन्होंने शांति निकेतन की स्थापना की, जो एक अनूठा शैक्षिक और सांस्कृतिक संस्थान था। यह विश्व भारती विश्वविद्यालय का पूर्वरूप था। शांति निकेतन में पढ़ाई खुले वातावरण में होती थी और कला, संगीत और प्रकृति को विशेष महत्व दिया जाता था।

रवींद्रनाथ ठाकुर बहुमुखी प्रतिभा के धनी थे। वे न केवल एक महान साहित्यकार, बल्कि संगीतकार, चित्रकार, दार्शनिक और शिक्षाविद भी थे। उन्होंने लगभग एक हज़ार कविताएँ और दो हज़ार गीत लिखे हैं। उनके द्वारा रचित गानों को 'रवींद्र संगीत' कहा जाता है।

उनकी काव्य कृति 'गीतांजलि' के अंग्रेजी अनुवाद के लिए 1913 में उन्हें साहित्य का नोबेल पुरस्कार मिला था। वे एशिया के पहले और भारत के प्रथम नोबेल पुरस्कार विजेता हैं। उनकी अन्य प्रमुख कृतियाँ हैं- नैवैद्य, पूरबी, बलाका, क्षणिका, चित्र और सांध्यगीत, काबुलीवाला और सैकड़ों अन्य कहानियाँ; उपन्यास-गोरा, घरे बाइरे और रवींद्र के निबंध।

रवींद्रनाथ ठाकुर ने भारत के राष्ट्रीय स्वतंत्रता आंदोलन में भी महत्वपूर्ण भूमिका निभाई। उन्होंने भारत और बांग्लादेश दोनों देशों के राष्ट्रगान की रचना की है - 'जन गण मन' और 'आमार सोनार बांग्ला'।

रवींद्रनाथ ठाकुर का निधन 7 अगस्त 1941 को हुआ। उन्होंने अपने जीवन में साहित्य, संगीत, कला और शिक्षा के क्षेत्र में अमूल्य योगदान दिया, जिसकी विरासत आज भी जीवंत है।
`;

// Play the listening activity audio
function playListeningActivity() {
    if (window.narrator) {
        // Make sure the user has interacted with the page
        if (typeof trackUserInteraction === 'function') {
            trackUserInteraction();
        }
        
        // First stop any ongoing narration
        if (window.narrator.stop) {
            window.narrator.stop();
        }
        
        // Break content into smaller paragraphs to avoid interruption
        const contentParagraphs = tagoreLifeContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("अब कृपया रवींद्रनाथ ठाकुर के बारे में सही विकल्प चुनें।");
                }, 1000);
                return;
            }
            
            // Set callback for when this paragraph ends
            window.narrator.onEndCallback = function() {
                // Small pause between paragraphs
                setTimeout(() => {
                    speakSequentially(paragraphs, index + 1);
                }, 300);
            };
            
            // Speak the current paragraph
            window.narrator.speak(paragraphs[index]);
        }
        
        // Start speaking the first paragraph
        speakSequentially(contentParagraphs);
    } else {
        alert('आपके ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है। कृपया रवींद्रनाथ ठाकुर के जीवन के बारे में पढ़ें।');
    }
}

// Tagore information for project work
const tagoreInfo = {
    background: `
        रवींद्रनाथ ठाकुर का जन्म 6 मई 1861 को बंगाल के एक संपन्न परिवार में हुआ था। वे नोबेल पुरस्कार पाने वाले पहले भारतीय हैं। उन्हें 'गुरुदेव' के नाम से भी जाना जाता है।
        
        रवींद्रनाथ ठाकुर बहुमुखी प्रतिभा के धनी थे। वे न केवल एक महान साहित्यकार, बल्कि संगीतकार, चित्रकार, दार्शनिक और शिक्षाविद भी थे। उन्होंने नवीन शैक्षिक पद्धतियों को विकसित किया और शांति निकेतन की स्थापना की।
        
        उनके द्वारा रचित गानों को 'रवींद्र संगीत' कहा जाता है। भारत और बांग्लादेश दोनों देशों के राष्ट्रगान उन्हीं की रचनाएँ हैं।
    `,
    photos: `
        रवींद्रनाथ ठाकुर के अनेक चित्र और फोटोग्राफ उपलब्ध हैं। उन्हें अक्सर लंबी सफेद दाढ़ी, प्रभावशाली मुखमुद्रा और पारंपरिक बंगाली वस्त्रों में देखा जा सकता है। वे अपनी वेशभूषा में सादगी पसंद करते थे।
        
        रवींद्रनाथ ठाकुर ने 40 वर्ष की उम्र के बाद चित्रकला शुरू की और अपने जीवनकाल में 2,500 से अधिक चित्र बनाए। उनकी कलाकृतियाँ उनके जीवन के अनुभवों और प्रकृति के प्रति प्रेम को दर्शाती हैं।
    `,
    template: `
        यह टेम्पलेट रवींद्रनाथ ठाकुर के जीवन और उनके योगदान पर आपके प्रोजेक्ट के लिए एक संरचना प्रदान करता है। इसमें निम्नलिखित खंड शामिल हैं:
        
        1. रवींद्रनाथ ठाकुर का जीवन परिचय
        2. रवींद्रनाथ ठाकुर के समय का सामाजिक और साहित्यिक परिवेश
        3. रवींद्रनाथ ठाकुर की प्रमुख रचनाएँ और उनका साहित्यिक योगदान
        4. गीतांजलि का महत्व और इसके लिए मिला नोबेल पुरस्कार
        5. शांतिनिकेतन की स्थापना और महत्व
    `
};

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'tagore-life':
            content = tagoreInfo.background;
            break;
        case 'tagore-photos':
            content = tagoreInfo.photos;
            break;
        case 'project-template':
            content = tagoreInfo.template;
            break;
        default:
            content = 'संसाधन की जानकारी उपलब्ध नहीं है।';
    }
    
    alert(content);
    
    if (window.narrator) {
        window.narrator.speak(content);
    }
}

// Writing and speaking activities now show static answers
// Progress is updated automatically in the main DOMContentLoaded handler

// Check listening answer
function checkListeningAnswer() {
    const selectedOption = document.querySelector('input[name="listening-question"]:checked');
    const feedbackEl = document.getElementById('listeningFeedback');
    
    if (!selectedOption || !feedbackEl) {
        if (feedbackEl) {
            feedbackEl.textContent = 'कृपया एक विकल्प चुनें।';
            feedbackEl.className = 'feedback-message show warning';
        } else {
            console.error('Feedback element not found');
        }
        return;
    }
    
    const userAnswer = parseInt(selectedOption.value);
    const correctAnswer = 3; // Index of the correct option (0-indexed)
    const isCorrect = userAnswer === correctAnswer;
    
    feedbackEl.textContent = isCorrect ? 
        '✓ सही उत्तर! रवींद्रनाथ ठाकुर वाकई बहुमुखी प्रतिभा के धनी थे।' : 
        '✗ गलत उत्तर। रवींद्रनाथ ठाकुर बहुमुखी प्रतिभा के धनी थे जो साहित्यकार, संगीतकार, चित्रकार और शिक्षाविद थे।';
    feedbackEl.className = `feedback-message show ${isCorrect ? 'success' : 'error'}`;
    
    // Mark the correct option with green color
    const correctOption = document.querySelector(`#listening-opt${correctAnswer}`);
    if (correctOption) {
        correctOption.parentElement.style.backgroundColor = isCorrect ? '#e8f5e9' : '#f9fbe7';
        correctOption.parentElement.style.borderLeft = '4px solid #4caf50';
    }
    
    // Update progress if correct
    if (isCorrect && typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
    
    // Provide audio feedback if narrator is available
    if (window.narrator) {
        window.narrator.speak(isCorrect ? 
            'सही उत्तर! रवींद्रनाथ ठाकुर वाकई बहुमुखी प्रतिभा के धनी थे।' : 
            'गलत उत्तर। रवींद्रनाथ ठाकुर बहुमुखी प्रतिभा के धनी थे जो साहित्यकार, संगीतकार, चित्रकार और शिक्षाविद थे।');
    }
}
