/**
 * Activities for Chapter 10 interactive Hindi lesson
 */

// Content for listening activity about Arun Kamal
const arunKamalLifeContent = `
अरुण कमल का जन्म बिहार के रोहतास जिले के नासरीगंज में 15 फरवरी 1954 को हुआ। 
वे इन दिनों पटना विश्वविद्यालय में प्राध्यापक हैं। 
उन्हें अपनी कविताओं के लिए साहित्य अकादमी पुरस्कार सहित कई अन्य पुरस्कारों से भी सम्मानित किया गया है।
अरुण कमल की प्रमुख कृतियाँ हैं: अपनी केवल धार, सबूत, नए इलाके में, पुतली में संसार (चारों कविता-संग्रह) तथा कविता और समय (आलोचनात्मक कृति)।
इनके अलावा अरुण कमल ने मायकोव्यस्की की आत्मकथा और जंगल बुक का हिंदी में और हिंदी के युवा कवियों की कविताओं का अंग्रेज़ी में अनुवाद किया, जो 'वॉयसेज' नाम से प्रकाशित हुआ।
अरुण कमल की कविताओं में नए बिंब, बोलचाल की भाषा, खड़ी बोली के अनेक लय-छंदों का समावेश है।
इनकी कविताएँ जितनी आपबीती हैं, उतनी ही जगबीती भी। इनकी कविताओं में जीवन के विविध क्षेत्रों का चित्रण है।
इस विविधता के कारण इनकी भाषा में भी विविधता के दर्शन होते हैं।
ये बड़ी कुशलता और सहजता से जीवन-प्रसंगों को कविता में रूपांतरित कर देते हैं।
इनकी कविता में वर्तमान शोषणमूलक व्यवस्था के खिलाफ़ आक्रोश, नफ़रत और उसे उलटकर एक नयी मानवीय व्यवस्था का निर्माण करने की आकुलता सर्वत्र दिखाई देती है।
`;

// Project resources
const arunKamalInfo = {
    bio: "अरुण कमल का जन्म बिहार के रोहतास जिले के नासरीगंज में 15 फरवरी 1954 को हुआ। वे इन दिनों पटना विश्वविद्यालय में प्राध्यापक हैं।",
    works: "अरुण कमल की प्रमुख कृतियाँ हैं: अपनी केवल धार, सबूत, नए इलाके में, पुतली में संसार (चारों कविता-संग्रह) तथा कविता और समय (आलोचनात्मक कृति)।",
    style: "अरुण कमल की कविताओं में नए बिंब, बोलचाल की भाषा, खड़ी बोली के अनेक लय-छंदों का समावेश है। इनकी कविताएँ जितनी आपबीती हैं, उतनी ही जगबीती भी।",
    themes: "इनकी कविता में वर्तमान शोषणमूलक व्यवस्था के खिलाफ़ आक्रोश, नफ़रत और उसे उलटकर एक नयी मानवीय व्यवस्था का निर्माण करने की आकुलता सर्वत्र दिखाई देती है।"
};

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activities
    setupActivityListeners();
});

// Set up event listeners for activities
function setupActivityListeners() {
    // Record speaking button
    const recordBtn = document.querySelector('.speaking-activity .interactive-btn');
    if (recordBtn) {
        recordBtn.addEventListener('click', recordSpeaking);
    }
    
    // Play listening activity button
    const listenBtn = document.querySelector('.listening-activity .interactive-btn');
    if (listenBtn) {
        listenBtn.addEventListener('click', playListeningActivity);
    }
    
    // Save listening notes button
    const saveNotesBtn = document.querySelector('.listening-notes .interactive-btn');
    if (saveNotesBtn) {
        saveNotesBtn.addEventListener('click', saveListeningNotes);
    }
    
    // Save writing button
    const saveWritingBtn = document.querySelector('.writing-activity .interactive-btn');
    if (saveWritingBtn) {
        saveWritingBtn.addEventListener('click', saveWriting);
    }
}

// Play listening activity
function playListeningActivity() {
    // Create feedback in the DOM instead of alert
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback-message success show';
    feedbackElement.textContent = 'इस गतिविधि में, अरुण कमल के जीवन और कार्य के बारे में एक ऑडियो क्लिप बज रहा है। कृपया ध्यान से सुनें और नोट्स बनाएँ।';
    
    // Find a place to add the feedback
    const listenBtn = document.querySelector('.listening-activity .interactive-btn');
    if (listenBtn) {
        // Remove any existing feedback
        const existingFeedback = listenBtn.parentNode.querySelector('.feedback-message');
        if (existingFeedback) existingFeedback.remove();
        
        // Insert after the listen button
        listenBtn.insertAdjacentElement('afterend', feedbackElement);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            feedbackElement.classList.remove('show');
            setTimeout(() => feedbackElement.remove(), 500);
        }, 5000);
    }
    
    // Create a visual indicator that audio is playing
    const audioIndicator = document.createElement('div');
    audioIndicator.className = 'reading-indicator';
    audioIndicator.innerHTML = '<div class="reading-spinner"></div><span>ऑडियो चल रहा है...</span>';
    
    // Add the indicator after feedback
    setTimeout(() => {
        const activitySection = document.querySelector('.listening-activity');
        if (activitySection) {
            const existingIndicator = activitySection.querySelector('.reading-indicator');
            if (!existingIndicator) {
                activitySection.appendChild(audioIndicator);
            }
        }
    }, 1000);
    
    // In a real implementation, this would play an audio file
    // For now, we'll use the narrator to read the content
    if (window.narrator) {
        window.narrator.onEndCallback = function() {
            // Remove the audio indicator when narration ends
            if (audioIndicator.parentNode) {
                audioIndicator.classList.add('fade-out');
                setTimeout(() => audioIndicator.remove(), 500);
            }
        };
        window.narrator.speak(arunKamalLifeContent);
    } else {
        // If narrator isn't available, remove the indicator after 10 seconds
        setTimeout(() => {
            audioIndicator.classList.add('fade-out');
            setTimeout(() => audioIndicator.remove(), 500);
        }, 10000);
    }
    
    // Show the notes section
    const notesSection = document.querySelector('.listening-notes');
    if (notesSection) {
        notesSection.style.display = 'block';
    }
}

// Save listening notes
function saveListeningNotes() {
    let correctCount = 0;
    let totalCount = 0;
    
    // Check birth year
    const birthYear = document.querySelector('input[name="birth-year"]:checked');
    if (birthYear) {
        totalCount++;
        if (birthYear.value === "1954") {
            correctCount++;
        }
    }
    
    // Check profession
    const profession = document.querySelector('input[name="profession"]:checked');
    if (profession) {
        totalCount++;
        if (profession.value === "प्राध्यापक") {
            correctCount++;
        }
    }
    
    // Check work
    const work = document.querySelector('input[name="work"]:checked');
    if (work) {
        totalCount++;
        if (work.value === "नए इलाके में") {
            correctCount++;
        }
    }
    
    // Check narrative
    const narrative = document.querySelector('input[name="narrative"]:checked');
    if (narrative) {
        totalCount++;
        if (narrative.value === "1" || narrative.value === "2") { // Both are correct descriptions
            correctCount++;
        }
    }
    
    // Show feedback in the DOM instead of alert
    const feedbackElement = document.createElement('div');
    feedbackElement.className = `feedback-message ${correctCount === totalCount ? 'success' : 'error'} show`;
    feedbackElement.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
    
    // Find a place to add the feedback
    const notesSaveBtn = document.querySelector('.listening-notes .interactive-btn');
    if (notesSaveBtn) {
        // Remove any existing feedback
        const existingFeedback = notesSaveBtn.parentNode.querySelector('.feedback-message');
        if (existingFeedback) existingFeedback.remove();
        
        // Insert after the save button
        notesSaveBtn.insertAdjacentElement('afterend', feedbackElement);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            feedbackElement.classList.remove('show');
            setTimeout(() => feedbackElement.remove(), 500);
        }, 5000);
    }
    
    // Update progress
    if (correctCount === totalCount && typeof updateProgress === 'function') {
        updateProgress('activities', 10);
        // Increase score
        const ts = document.getElementById('totalScore');
        if (ts) {
            let current = parseInt(ts.textContent || '0', 10) || 0;
            current += 10;
            ts.textContent = current;
        }
    }
}

// Record speaking
function recordSpeaking() {
    // Create answers container with styled content
    const answersContainer = document.createElement('div');
    answersContainer.className = 'speaking-answers';
    answersContainer.innerHTML = `
        <div class="answer-box" style="background-color: #f8f9fa; border-left: 4px solid #5c4033; padding: 15px; margin-top: 15px; border-radius: 8px;">
            <h4 style="color: #5c4033; margin-bottom: 10px;">उत्तर:</h4>
            <div class="answer-item" style="margin-bottom: 15px;">
                <p><strong>'नए इलाके में' कविता में कवि की विडंबना:</strong></p>
                <p>कवि शहरीकरण की तेज़ गति से उत्पन्न विडंबना की ओर संकेत करता है। नए बनते इलाकों में पुराने निशान, पहचान और स्मृतियां मिट जाती हैं। एक ही दिन में दुनिया पुरानी पड़ जाती है, और इंसान अपने ही परिचित माहौल में अजनबी हो जाता है। यह समय की तेज़ गति और बदलाव से उपजी अजनबीपन की विडंबना है।</p>
            </div>
            <div class="answer-item">
                <p><strong>'खुशबू रचते हैं हाथ' कविता में कवि द्वारा उजागर की गई सामाजिक विषमता:</strong></p>
                <p>इस कविता में कवि श्रमिक वर्ग के साथ होने वाली सामाजिक विषमता को उजागर करता है। जो हाथ दुनिया में सुगंध फैलाते हैं, वे खुद गंदगी और बदबू के बीच जीने को मजबूर हैं। अगरबत्तियां बनाने वाले मज़दूरों के हाथ समाज को खुशबू देते हैं, लेकिन उन्हें खुद गंदे मुहल्लों में रहना पड़ता है। यह श्रम और पूंजी के बीच की विषमता है।</p>
            </div>
        </div>
    `;
    
    // Find the speaking activity section
    const speakingSection = document.querySelector('.speaking-activity');
    if (speakingSection) {
        // Remove any existing elements
        const existingAnswers = speakingSection.querySelector('.speaking-answers');
        if (existingAnswers) existingAnswers.remove();
        
        const existingGuidance = speakingSection.querySelector('.speaking-guidance');
        if (existingGuidance) existingGuidance.remove();
        
        const existingFeedback = speakingSection.querySelector('.feedback-message');
        if (existingFeedback) existingFeedback.remove();
        
        // Add the answers
        speakingSection.appendChild(answersContainer);
    }
    
    // Update score and progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 5);
        // Increase score
        const ts = document.getElementById('totalScore');
        if (ts) {
            let current = parseInt(ts.textContent || '0', 10) || 0;
            current += 10;
            ts.textContent = current;
        }
    }
}

// Save writing selection
function saveWriting() {
    const selectedOption = document.querySelector('input[name="writing-option"]:checked');
    const chooseOptionBtn = document.getElementById('chooseOptionBtn');
    
    // Create feedback element
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback-message show';
    
    // Correct answer is option 2 (सामाजिक विषमता)
    const correctAnswer = "2";
    
    if (selectedOption) {
        if (selectedOption.value === correctAnswer) {
            // Success feedback for correct answer
            feedbackElement.classList.add('success');
            feedbackElement.innerHTML = '<strong>🎉 सही उत्तर!</strong><br><br>"सामाजिक विषमता" इन कविताओं की प्रमुख प्रासंगिकता है। "खुशबू रचते हैं हाथ" कविता में यह विशेष रूप से सामने आता है, जहां श्रमिकों की स्थिति और सामाजिक विषमता को उजागर किया गया है।<br><br>यह कविता हमें याद दिलाती है कि जो लोग हमारे जीवन को सुंदर बनाते हैं, वे खुद गंदगी और गरीबी में जीने को मजबूर हैं।';
            
            // Update button text and disable it
            if (chooseOptionBtn) {
                chooseOptionBtn.textContent = '✅ सही उत्तर!';
                chooseOptionBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
                chooseOptionBtn.disabled = true;
            }
            
            // Update progress
            if (typeof updateProgress === 'function') {
                updateProgress('activities', 5);
                // Increase score
                const ts = document.getElementById('totalScore');
                if (ts) {
                    let current = parseInt(ts.textContent || '0', 10) || 0;
                    current += 10;
                    ts.textContent = current;
                }
            }
        } else {
            // Feedback for wrong answer with guidance
            feedbackElement.classList.add('error');
            
            // Custom guidance based on what they selected
            let guidance = "";
            let selectedText = "";
            switch(selectedOption.value) {
                case "1":
                    selectedText = "शहरीकरण और पर्यावरण";
                    guidance = 'शहरीकरण और पर्यावरण महत्वपूर्ण हैं, लेकिन "खुशबू रचते हैं हाथ" कविता का मुख्य संदेश अलग है। कृपया श्रमिक वर्ग की स्थिति पर फिर से विचार करें।';
                    break;
                case "3":
                    selectedText = "मानवीय श्रम का महत्व";
                    guidance = 'मानवीय श्रम का महत्व दिखाया गया है, लेकिन कवि की मुख्य चिंता श्रम के मूल्यांकन और सामाजिक असमानता से संबंधित है।';
                    break;
                case "4":
                    selectedText = "स्मृति और समय का संबंध";
                    guidance = 'स्मृति और समय "नए इलाके में" कविता में तो महत्वपूर्ण हैं, लेकिन दोनों कविताओं को देखें तो एक अधिक व्यापक विषय उभरता है।';
                    break;
            }
            
            feedbackElement.innerHTML = `<strong>❌ यह सही उत्तर नहीं है।</strong><br><br>आपने "${selectedText}" चुना है।<br><br>${guidance}<br><br><strong>💡 सुझाव:</strong> पुनः प्रयास करें और विशेषकर "खुशबू रचते हैं हाथ" कविता पर ध्यान दें।`;
            
            // Reset button for retry
            if (chooseOptionBtn) {
                chooseOptionBtn.textContent = '🔄 पुनः प्रयास करें';
                chooseOptionBtn.style.background = 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)';
            }
        }
    } else {
        // Warning feedback
        feedbackElement.classList.add('error');
        feedbackElement.innerHTML = '<strong>⚠️ चेतावनी!</strong><br><br>कृपया एक विकल्प चुनें। ऊपर दिए गए चार विकल्पों में से कोई एक रेडियो बटन पर क्लिक करें।';
        
        // Reset button
        if (chooseOptionBtn) {
            chooseOptionBtn.textContent = '✅ विकल्प चुनें';
            chooseOptionBtn.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
        }
    }
    
    // Find the dedicated feedback container
    const feedbackContainer = document.getElementById('writing-feedback');
    if (feedbackContainer) {
        // Clear any existing feedback
        feedbackContainer.innerHTML = '';
        
        // Add the new feedback
        feedbackContainer.appendChild(feedbackElement);
        
        // If it's a wrong answer, auto-hide after some time
        if (!(selectedOption && selectedOption.value === correctAnswer)) {
            // Auto-hide after 15 seconds for incorrect answers
            setTimeout(() => {
                feedbackElement.classList.remove('show');
                setTimeout(() => {
                    if (feedbackElement.parentNode) {
                        feedbackElement.remove();
                    }
                }, 500);
            }, 15000);
        }
    }
}

// Show resource for project work
function showResource(resourceId) {
    if (arunKamalInfo[resourceId]) {
        // Create a modal-like element for the resource
        const resourceModal = document.createElement('div');
        resourceModal.className = 'resource-modal';
        resourceModal.innerHTML = `
            <div class="resource-content">
                <div class="resource-header">
                    <h3>संसाधन जानकारी</h3>
                    <button class="resource-close" onclick="this.parentNode.parentNode.parentNode.remove()">×</button>
                </div>
                <div class="resource-body">
                    <p>${arunKamalInfo[resourceId]}</p>
                </div>
            </div>
        `;
        
        // Add styles if they don't exist
        if (!document.getElementById('resource-modal-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'resource-modal-styles';
            styleEl.textContent = `
                .resource-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s;
                }
                .resource-content {
                    background: white;
                    border-radius: 16px;
                    width: 80%;
                    max-width: 600px;
                    max-height: 80%;
                    overflow-y: auto;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                }
                .resource-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 24px;
                    border-bottom: 1px solid #eee;
                }
                .resource-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                }
                .resource-body {
                    padding: 24px;
                }
            `;
            document.head.appendChild(styleEl);
        }
        
        // Add to document
        document.body.appendChild(resourceModal);
        
        // Allow clicking outside to close
        resourceModal.addEventListener('click', function(e) {
            if (e.target === resourceModal) {
                resourceModal.remove();
            }
        });
    }
}