/**
 * Activities functionality for Parvat Pradesh Me Pavas
 */

// Track activity progress
let activityProgress = {
    listening: 0,
    speaking: 0,
    writing: 0,
    project: 0
};

// Function to play the listening activity
// This is just a placeholder - the actual implementation is in main.js
function _playListeningActivity() {
    // The main implementation is in main.js
    console.log('This function is replaced by the implementation in main.js');
    
    // If somehow the main.js implementation is not found, show a message
    if (typeof playListeningActivity !== 'function' || playListeningActivity === _playListeningActivity) {
        console.error('Main playListeningActivity function not found');
        
        // Show the notes section as a fallback
        const notesSection = document.querySelector('.listening-notes');
        if (notesSection) {
            notesSection.style.display = 'block';
        }
        
        // Update progress
        activityProgress.listening += 5;
    }
}

// Function to record speaking activity
function recordSpeaking() {
    // In a real implementation, this would access the microphone and record audio
    console.log('Recording speaking activity');
    
    // Show a notification that this is a simulation
    const speakingSection = document.querySelector('.speaking-activity');
    const existingNotice = speakingSection.querySelector('.simulation-notice');
    
    if (!existingNotice) {
        const simulationNotice = document.createElement('div');
        simulationNotice.className = 'simulation-notice';
        simulationNotice.innerHTML = `
            <p>🎤 वाचन सिमुलेशन चल रहा है...</p>
            <p>वास्तविक कार्यान्वयन में, यहाँ आपकी आवाज़ रिकॉर्ड की जाएगी।</p>
            <div class="text-input-area">
                <p>आप अपने विचार टेक्स्ट के रूप में भी दर्ज कर सकते हैं:</p>
                <textarea id="speakingText" rows="5" placeholder="अपने विचार यहाँ लिखें..."></textarea>
                <button class="interactive-btn" onclick="saveSpeakingText()">सहेजें</button>
            </div>
        `;
        
        // Insert after button
        const button = speakingSection.querySelector('.interactive-btn');
        if (button) {
            button.parentNode.insertBefore(simulationNotice, button.nextSibling);
        } else {
            speakingSection.appendChild(simulationNotice);
        }
    }
    
    // Update progress
    activityProgress.speaking += 5;
    if (typeof updateProgress === 'function') {
        updateProgress('activity', activityProgress.speaking);
    }
}

// Function to save speaking text input
function saveSpeakingText() {
    const speakingText = document.getElementById('speakingText');
    
    if (speakingText) {
        const text = speakingText.value.trim();
        
        if (text.length < 30) {
            alert('कृपया कम से कम 30 अक्षरों का वर्णन लिखें।');
            return;
        }
        
        // Save speaking text (would normally save to server)
        console.log('Saving speaking text:', text);
        
        // Display success message
        alert('आपके विचार सफलतापूर्वक सहेज लिए गए हैं।');
        
        // Update progress
        activityProgress.speaking += 5;
        if (typeof updateProgress === 'function') {
            updateProgress('activity', activityProgress.speaking);
        }
    }
}

// Function to open writing pad
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        
        // Scroll to writing pad
        writingPad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Function to show writing answer (always visible now)
function toggleWritingAnswer() {
    // Update progress when user interacts with the writing answer section
    activityProgress.writing += 10;
    if (typeof updateProgress === 'function') {
        updateProgress('activity', activityProgress.writing);
    }
    
    // Scroll to the answer container
    const answerContainer = document.querySelector('.writing-answer');
    if (answerContainer) {
        answerContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Function to show resource (simulated)
function showResource(resourceId) {
    // In a real implementation, this would display a resource in a modal or new page
    console.log('Showing resource:', resourceId);
    
    let resourceTitle, resourceContent;
    
    // Define content for each resource
    switch (resourceId) {
        case 'pant-life':
            resourceTitle = 'सुमित्रानंदन पंत का जीवन परिचय';
            resourceContent = `
                <p>सुमित्रानंदन पंत का जन्म 20 मई 1900 को उत्तराखंड के कौसानी-अलमोड़ा में हुआ था। वे छायावादी युग के प्रमुख कवियों में से एक थे। उन्होंने अपनी कविताओं में प्रकृति का सुंदर चित्रण किया है, इसलिए उन्हें "प्रकृति का सुकुमार कवि" भी कहा जाता है।</p>
                <p>पंत जी की शिक्षा-दीक्षा अल्मोड़ा और कौसानी में हुई। उन्होंने 1918 में प्रयाग विश्वविद्यालय से अंग्रेजी साहित्य में एम.ए. की डिग्री प्राप्त की। 1969 में उन्हें "चिदंबरा" कविता संग्रह के लिए भारत का सर्वोच्च साहित्यिक सम्मान "ज्ञानपीठ पुरस्कार" प्रदान किया गया।</p>
                <p>उनकी प्रमुख रचनाओं में 'वीणा', 'पल्लव', 'गुंजन', 'युगवाणी', 'ग्राम्या', 'स्वर्णकिरण', 'स्वर्णधूलि', 'उत्तरा', 'चिदंबरा' और 'लोकायतन' शामिल हैं।</p>
            `;
            break;
        
        case 'chhayavad':
            resourceTitle = 'छायावाद की विशेषताएँ';
            resourceContent = `
                <p>छायावाद हिंदी साहित्य का एक प्रमुख काव्य-आंदोलन है जो 1918 से 1937 तक चला। जयशंकर प्रसाद, सुमित्रानंदन पंत, सूर्यकांत त्रिपाठी निराला और महादेवी वर्मा छायावाद के प्रमुख स्तंभ माने जाते हैं।</p>
                <p><strong>छायावाद की प्रमुख विशेषताएँ:</strong></p>
                <ul>
                    <li><strong>प्रकृति चित्रण:</strong> प्रकृति का मानवीकरण और सजीव चित्रण छायावाद की प्रमुख विशेषता है।</li>
                    <li><strong>रहस्यवाद:</strong> अदृश्य और अज्ञात के प्रति आकर्षण और जिज्ञासा।</li>
                    <li><strong>प्रतीकात्मकता:</strong> भावों और विचारों को व्यक्त करने के लिए प्रतीकों का प्रयोग।</li>
                    <li><strong>सौंदर्य-चेतना:</strong> कल्पना और भावुकता से परिपूर्ण सौंदर्य का चित्रण।</li>
                    <li><strong>वैयक्तिकता:</strong> कवि के व्यक्तिगत अनुभवों और भावनाओं की अभिव्यक्ति।</li>
                    <li><strong>नवीन छंद विधान:</strong> परंपरागत छंदों से हटकर नए छंदों का प्रयोग।</li>
                </ul>
            `;
            break;
        
        case 'project-template':
            resourceTitle = 'परियोजना टेम्पलेट';
            resourceContent = `
                <p>अपनी परियोजना को निम्नलिखित प्रारूप में प्रस्तुत कर सकते हैं:</p>
                
                <h3>1. शीर्षक पृष्ठ</h3>
                <ul>
                    <li>परियोजना का नाम</li>
                    <li>छात्रों के नाम</li>
                    <li>कक्षा और अनुभाग</li>
                    <li>दिनांक</li>
                </ul>
                
                <h3>2. विषय-सूची</h3>
                
                <h3>3. प्रस्तावना</h3>
                <ul>
                    <li>परियोजना का उद्देश्य</li>
                    <li>परियोजना का महत्व</li>
                </ul>
                
                <h3>4. मुख्य सामग्री</h3>
                <ul>
                    <li>छायावाद के प्रमुख कवि</li>
                    <li>छायावाद की विशेषताएँ</li>
                    <li>सुमित्रानंदन पंत की प्रमुख रचनाएँ</li>
                    <li>प्रकृति-चित्रण की विशेषताएँ</li>
                </ul>
                
                <h3>5. चित्र और उद्धरण</h3>
                
                <h3>6. निष्कर्ष</h3>
                
                <h3>7. संदर्भ सूची</h3>
            `;
            break;
        
        default:
            resourceTitle = 'संसाधन';
            resourceContent = '<p>यह संसाधन उपलब्ध नहीं है।</p>';
    }
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'resource-modal';
    modal.innerHTML = `
        <div class="resource-modal-content">
            <span class="close-modal">&times;</span>
            <h2>${resourceTitle}</h2>
            <div class="resource-content">
                ${resourceContent}
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Add close functionality
    const closeButton = modal.querySelector('.close-modal');
    if (closeButton) {
        closeButton.onclick = function() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
    }
    
    // Close on click outside
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };
    
    // Update progress for project resource access
    activityProgress.project += 2;
    if (typeof updateProgress === 'function') {
        updateProgress('activity', activityProgress.project);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add additional event listeners or initialization code here
});
