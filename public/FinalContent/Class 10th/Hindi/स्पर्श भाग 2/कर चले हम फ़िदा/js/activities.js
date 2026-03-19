/**
 * Activities for Kar Chale Hum Fida
 */

// Data for activities
const activityData = {
    listening: {
        title: "कैफ़ी आज़मी का जीवन",
        audioSrc: "audio/kafi-azmi-life.mp3", // This would be a real audio file path in a complete implementation
        transcript: `
            कैफ़ी आज़मी का जन्म 19 जनवरी 1919 को उत्तर प्रदेश के आज़मगढ़ ज़िले में मजमां गाँव में हुआ था। अदब की दुनिया में वे आगे चलकर कैफ़ी आज़मी के नाम से मशहूर हुए। कैफ़ी आज़मी की गिनती प्रगतिशील उर्दू कवियों की पहली पंक्ति में की जाती है।

            उनकी कविताओं में एक ओर सामाजिक और राजनैतिक जागरूकता का समावेश है, तो दूसरी ओर हृदय की कोमलता भी है। युवावस्था में मुशायरों में वाह-वाही पाने वाले कैफ़ी आज़मी ने फ़िल्मों के लिए सैकड़ों बेहतरीन गीत भी लिखे हैं।

            10 मई 2002 को उनका निधन हुआ। उनके पाँच कविता संग्रह प्रकाशित हुए हैं: झंकार, आखिर-ए-शब, आवारा सज़दे, सरमाया और फ़िल्मी गीतों का संग्रह मेरी आवाज़ सुनो। उन्हें अपने रचनाकर्म के लिए साहित्य अकादेमी पुरस्कार सहित कई पुरस्कारों से सम्मानित किया गया।
            
            कैफ़ी कलाकारों के परिवार से थे। उनके तीनों बड़े भाई भी शायर थे। उनकी पत्नी शौकत आज़मी और बेटी शबाना आज़मी मशहूर अभिनेत्रियाँ हैं।
            
            1964 की फिल्म 'हक़ीक़त' के लिए उन्होंने "कर चले हम फ़िदा" गीत लिखा जो आज भी देशभक्ति के गीतों में एक अमर रचना है।
        `
    },
    speaking: {
        title: "देशभक्ति पर चिंतन",
        prompts: [
            "आपके विचार से देशभक्ति का क्या अर्थ है?",
            "क्या देशभक्ति का अर्थ केवल सैनिक बनना है या इसके अन्य रूप भी हो सकते हैं?",
            "आज के युग में युवाओं के लिए देशभक्ति के क्या मायने हैं?",
            "आप अपने दैनिक जीवन में देशभक्ति कैसे प्रदर्शित कर सकते हैं?"
        ]
    },
    writing: {
        title: "देशभक्ति और बलिदान पर लेख",
        guidelines: [
            "अपने लेख में देशभक्ति के विभिन्न आयामों पर चर्चा करें",
            "सैनिकों के बलिदान का महत्व स्पष्ट करें",
            "देशभक्ति को दैनिक जीवन में कैसे अपनाया जा सकता है, इस पर अपने विचार व्यक्त करें",
            "कविता से उदाहरण देकर अपनी बात समझाएँ"
        ]
    },
    resources: {
        "war-memorials": {
            title: "भारत के प्रमुख युद्ध स्मारक",
            content: `
                <h4>भारत के प्रमुख युद्ध स्मारक</h4>
                <ul>
                    <li>अमर जवान ज्योति, इंडिया गेट, नई दिल्ली</li>
                    <li>राष्ट्रीय युद्ध स्मारक, नई दिल्ली</li>
                    <li>विजय स्तंभ, झाँसी</li>
                    <li>वॉर मेमोरियल, दार्जिलिंग</li>
                    <li>कारगिल वॉर मेमोरियल, द्रास</li>
                </ul>
            `
        },
        "war-heroes": {
            title: "वीरता पुरस्कार विजेता",
            content: `
                <h4>परमवीर चक्र विजेता सैनिक</h4>
                <ul>
                    <li>मेजर सोमनाथ शर्मा</li>
                    <li>कैप्टन महेंद्र नाथ मुल्ला</li>
                    <li>लेफ्टिनेंट-कर्नल अर्देशिर बुरजोरजी तारापोर</li>
                    <li>मेजर शैतान सिंह</li>
                    <li>कंपनी क्वार्टर मास्टर हवलदार अब्दुल हमीद</li>
                    <li>लेफ्टिनेंट-कर्नल अलबर्ट एक्का</li>
                    <li>कैप्टन विक्रम बत्रा</li>
                </ul>
            `
        },
        "project-template": {
            title: "परियोजना टेम्पलेट",
            content: `
                <h4>परियोजना के लिए संरचना</h4>
                <ol>
                    <li>शीर्षक और परिचय (25-50 शब्द)</li>
                    <li>विषय-वस्तु (500-700 शब्द)</li>
                    <li>चित्र और उद्धरण</li>
                    <li>निष्कर्ष (50-100 शब्द)</li>
                    <li>सन्दर्भ सूची</li>
                </ol>
            `
        }
    }
};

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing activities...');
    
    // Set up event listeners for showing resources
    window.showResource = function(resourceId) {
        const resource = activityData.resources[resourceId];
        if (resource) {
            // Create modal to show resource
            const modal = document.createElement('div');
            modal.className = 'resource-modal';
            modal.innerHTML = `
                <div class="resource-modal-content">
                    <span class="resource-modal-close" onclick="closeResourceModal()">&times;</span>
                    <div class="resource-modal-body">
                        ${resource.content}
                    </div>
                </div>
            `;
            
            // Apply basic modal styles
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '2000';
            
            const modalContent = modal.querySelector('.resource-modal-content');
            modalContent.style.backgroundColor = 'white';
            modalContent.style.padding = '20px';
            modalContent.style.borderRadius = '16px';
            modalContent.style.maxWidth = '600px';
            modalContent.style.width = '80%';
            modalContent.style.maxHeight = '80vh';
            modalContent.style.overflow = 'auto';
            modalContent.style.position = 'relative';
            modalContent.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            
            const closeButton = modal.querySelector('.resource-modal-close');
            closeButton.style.position = 'absolute';
            closeButton.style.right = '15px';
            closeButton.style.top = '10px';
            closeButton.style.fontSize = '24px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.cursor = 'pointer';
            
            document.body.appendChild(modal);
            
            // Add function to close the modal
            window.closeResourceModal = function() {
                modal.remove();
            };
            
            // Close when clicking outside the modal content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    window.closeResourceModal();
                }
            });
        } else {
            console.error(`Resource ${resourceId} not found`);
            alert('संसाधन नहीं मिला');
        }
    };
});

// Function to play listening activity
function playListeningActivity() {
    const activity = activityData.listening;
    console.log(`Playing listening activity: ${activity.title}`);
    
    // Check if the speechSynthesis is available
    if (typeof speechSynthesis === 'undefined') {
        alert('आपके ब्राउज़र में स्पीच सिंथेसिस समर्थित नहीं है। कृपया अन्य ब्राउज़र का उपयोग करें।');
        return;
    }
    
    // Define the text to be narrated about Kaifi Azmi's life
    const kaifiAzmiText = `
        कैफ़ी आज़मी का जन्म 19 जनवरी 1919 को उत्तर प्रदेश के आज़मगढ़ ज़िले में मजमां गाँव में हुआ था।
        वे प्रगतिशील उर्दू कवियों की पहली पंक्ति में माने जाते थे।
        उनकी कविताओं में एक ओर सामाजिक और राजनैतिक जागरूकता का समावेश है, तो दूसरी ओर हृदय की कोमलता भी है।
        युवावस्था में मुशायरों में वाह-वाही पाने वाले कैफ़ी आज़मी ने फ़िल्मों के लिए सैकड़ों बेहतरीन गीत भी लिखे।
        10 मई 2002 को उनका निधन हुआ। उनके पाँच कविता संग्रह प्रकाशित हुए हैं।
        उनकी पत्नी शौकत आज़मी और बेटी शबाना आज़मी मशहूर अभिनेत्रियाँ हैं।
        कर चले हम फ़िदा गीत में उनकी देशभक्ति की भावना और त्याग की महत्ता दिखाई देती है।
    `;
    
    // Create a visual audio player
    const audioPlayer = document.createElement('div');
    audioPlayer.className = 'audio-player';
    audioPlayer.id = 'kaifiAzmiAudioPlayer';
    audioPlayer.innerHTML = `
        <div class="audio-player-header">
            <h4>कैफ़ी आज़मी: जीवन और योगदान</h4>
            <button class="audio-player-close" onclick="stopNarration()">✕</button>
        </div>
        <div class="audio-controls">
            <button id="playPauseBtn" class="audio-control-btn play-pause" onclick="toggleNarration()">⏸️ पॉज़</button>
            <div class="audio-progress">
                <div class="audio-progress-bar" id="narrationProgress"></div>
            </div>
            <span class="audio-time" id="narrationTime">वाचन चल रहा है...</span>
        </div>
        <details>
            <summary>प्रतिलेख</summary>
            <div class="audio-transcript">
                ${kaifiAzmiText}
            </div>
        </details>
    `;
    
    // Remove any existing audio player
    const existingPlayer = document.getElementById('kaifiAzmiAudioPlayer');
    if (existingPlayer) {
        existingPlayer.remove();
    }
    
    // Check if we need to create the Web Speech functions
    if (typeof window.toggleNarration !== 'function') {
        // Create global functions for narration control
        window.isNarrating = false;
        window.currentUtterance = null;
        
        // Function to toggle narration play/pause
        window.toggleNarration = function() {
            const btn = document.getElementById('playPauseBtn');
            
            if (window.isNarrating) {
                // Pause narration
                speechSynthesis.pause();
                window.isNarrating = false;
                btn.innerHTML = '▶️ प्ले';
            } else {
                // Resume narration
                if (speechSynthesis.paused) {
                    speechSynthesis.resume();
                }
                window.isNarrating = true;
                btn.innerHTML = '⏸️ पॉज़';
            }
        };
        
        // Function to stop narration completely
        window.stopNarration = function() {
            speechSynthesis.cancel();
            window.isNarrating = false;
            const player = document.getElementById('kaifiAzmiAudioPlayer');
            if (player) player.remove();
        };
    }
    
    // Start narration
    window.startNarration = function(text) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);
        window.currentUtterance = utterance;
        
        // Set language (Hindi if available)
        utterance.lang = 'hi-IN';
        
        // Start speaking
        speechSynthesis.speak(utterance);
        window.isNarrating = true;
        
        // Add event handlers
        utterance.onend = function() {
            window.isNarrating = false;
            const btn = document.getElementById('playPauseBtn');
            if (btn) btn.innerHTML = '▶️ प्ले';
            const timeDisplay = document.getElementById('narrationTime');
            if (timeDisplay) timeDisplay.textContent = 'वाचन पूर्ण हुआ';
        };
        
        // Update progress (simulated)
        let progress = 0;
        const progressBar = document.getElementById('narrationProgress');
        const progressInterval = setInterval(() => {
            if (!window.isNarrating) return;
            
            progress += 1;
            if (progress > 100) {
                clearInterval(progressInterval);
                return;
            }
            
            if (progressBar) progressBar.style.width = `${progress}%`;
        }, 300);
    };
    
    // Add player to page
    const listeningActivitySection = document.querySelector('.listening-activity');
    listeningActivitySection.appendChild(audioPlayer);
    
    // Start narration after a short delay
    setTimeout(() => {
        window.startNarration(kaifiAzmiText);
    }, 300);
    
    // Style the player
    const style = document.createElement('style');
    style.textContent = `
        .audio-player {
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            margin: 20px 0;
            border: 2px solid #e9ecef;
            animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .audio-player-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 10px;
        }
        .audio-player-header h4 {
            margin: 0;
            color: #5c4033;
            font-size: 1.2rem;
        }
        .audio-player-close {
            background: transparent;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        .audio-player-close:hover {
            background: #f0f0f0;
            transform: scale(1.1);
        }
        .audio-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            margin: 15px 0;
        }
        .audio-control-btn {
            background: linear-gradient(45deg, #5c4033, #8B6B4D);
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 500;
            box-shadow: 0 2px 5px rgba(92, 64, 51, 0.3);
            transition: all 0.2s;
        }
        .audio-control-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(92, 64, 51, 0.4);
        }
        .audio-control-btn:active {
            transform: translateY(0);
        }
        .audio-progress {
            flex: 1;
            height: 10px;
            background: #e0e0e0;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
        }
        .audio-progress-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #5c4033, #8B6B4D);
            border-radius: 5px;
            transition: width 0.3s ease;
        }
        .audio-time {
            font-size: 0.9rem;
            min-width: 120px;
            text-align: right;
            color: #555;
        }
        .audio-transcript {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 10px;
            margin-top: 10px;
            white-space: pre-line;
            font-size: 0.95rem;
            line-height: 1.6;
            border-left: 3px solid #5c4033;
        }
        details {
            margin-top: 15px;
        }
        details summary {
            cursor: pointer;
            color: #5c4033;
            font-weight: 500;
        }
        details summary:hover {
            text-decoration: underline;
        }
    `;
    
    document.head.appendChild(style);
    
    // Insert after the button that triggered this
    const button = document.querySelector('.listening-activity .interactive-btn');
    button.parentNode.insertBefore(audioPlayer, button.nextSibling);
    
    // Show the notes area
    document.querySelector('.listening-notes').style.display = 'block';
    
    // Simulate "playing" audio
    const playPauseBtn = audioPlayer.querySelector('.play-pause');
    const progressBar = audioPlayer.querySelector('.audio-progress-bar');
    const timeDisplay = audioPlayer.querySelector('.audio-time');
    let isPlaying = true;
    let currentTime = 0;
    const totalTime = 150; // 2:30 in seconds
    
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playPauseBtn.textContent = "⏸️ पॉज़";
        } else {
            playPauseBtn.textContent = "▶️ प्ले";
        }
    });
    
    // Update progress and time
    const progressInterval = setInterval(function() {
        if (isPlaying && currentTime < totalTime) {
            currentTime++;
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            const progress = (currentTime / totalTime) * 100;
            
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} / 2:30`;
            progressBar.style.width = `${progress}%`;
        } else if (currentTime >= totalTime) {
            clearInterval(progressInterval);
            playPauseBtn.textContent = "✓ समाप्त";
            playPauseBtn.disabled = true;
        }
    }, 1000);
}

// Function to check listening quiz answers
function saveListeningQuiz() {
    const q1 = document.querySelector('input[name="listening1"]:checked');
    const q2 = document.querySelector('input[name="listening2"]:checked');
    const q3 = document.querySelector('input[name="listening3"]:checked');
    
    if (!q1 || !q2 || !q3) {
        alert('कृपया सभी प्रश्नों के उत्तर दें।');
        return;
    }
    
    // Calculate score (hardcoding correct answers for this example)
    const correctAnswers = ["option1", "option2", "option2"]; // Replace with actual correct answers
    let score = 0;
    
    if (q1.value === correctAnswers[0]) score++;
    if (q2.value === correctAnswers[1]) score++;
    if (q3.value === correctAnswers[2]) score++;
    
    // Create feedback message
    const feedbackEl = document.getElementById('listeningFeedback');
    feedbackEl.textContent = `आपने ${score}/3 प्रश्नों के सही उत्तर दिए हैं!`;
    feedbackEl.className = `feedback-message show ${score === 3 ? 'success' : 'warning'}`;
    
    // Update progress if all correct
    if (typeof updateProgress === 'function' && score === 3) {
        updateProgress('activities', 15);
    }
}

// Function to record speaking
function recordSpeaking() {
    const activity = activityData.speaking;
    console.log(`Starting speaking activity: ${activity.title}`);
    
    // This would normally start recording
    // For demo purposes, we'll show prompts instead
    
    const recordingInterface = document.createElement('div');
    recordingInterface.className = 'recording-interface';
    recordingInterface.innerHTML = `
        <div class="recording-header">
            <h4>${activity.title}</h4>
            <div class="recording-status">तैयार</div>
        </div>
        <div class="recording-prompts">
            <p>निम्नलिखित प्रश्नों पर अपने विचार व्यक्त कीजिए:</p>
            <ol>
                ${activity.prompts.map(prompt => `<li>${prompt}</li>`).join('')}
            </ol>
        </div>
        <div class="recording-controls">
            <button class="recording-btn start-recording">🎤 रिकॉर्डिंग शुरू करें</button>
            <div class="recording-time">0:00</div>
        </div>
    `;
    
    // Style the interface
    const style = document.createElement('style');
    style.textContent = `
        .recording-interface {
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        .recording-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .recording-header h4 {
            margin: 0;
        }
        .recording-status {
            padding: 5px 10px;
            border-radius: 12px;
            background: #e0e0e0;
            font-size: 0.9rem;
        }
        .recording-prompts {
            margin-bottom: 20px;
        }
        .recording-prompts ol {
            padding-left: 20px;
        }
        .recording-prompts li {
            margin-bottom: 10px;
        }
        .recording-controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .recording-btn {
            background: #5c4033;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 20px;
            cursor: pointer;
        }
        .recording-status.recording {
            background: #f44336;
            color: white;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    // Insert after the button that triggered this
    const button = document.querySelector('.speaking-activity .interactive-btn');
    button.parentNode.insertBefore(recordingInterface, button.nextSibling);
    
    // Hide the original button
    button.style.display = 'none';
    
    // Handle recording simulation
    const startRecordingBtn = recordingInterface.querySelector('.start-recording');
    const recordingStatus = recordingInterface.querySelector('.recording-status');
    const recordingTime = recordingInterface.querySelector('.recording-time');
    let isRecording = false;
    let recordingDuration = 0;
    let recordingInterval;
    
    startRecordingBtn.addEventListener('click', function() {
        if (!isRecording) {
            // Start recording
            isRecording = true;
            startRecordingBtn.textContent = "⏹️ रिकॉर्डिंग बंद करें";
            recordingStatus.textContent = "रिकॉर्डिंग...";
            recordingStatus.classList.add('recording');
            
            // Simulate recording time
            recordingInterval = setInterval(function() {
                recordingDuration++;
                const minutes = Math.floor(recordingDuration / 60);
                const seconds = recordingDuration % 60;
                recordingTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        } else {
            // Stop recording
            isRecording = false;
            clearInterval(recordingInterval);
            startRecordingBtn.textContent = "✓ रिकॉर्डिंग सहेजी गई";
            startRecordingBtn.disabled = true;
            recordingStatus.textContent = "पूर्ण";
            recordingStatus.classList.remove('recording');
            
            // Create feedback message
            const feedback = document.createElement('div');
            feedback.className = 'feedback-message success show';
            feedback.textContent = 'आपकी प्रतिक्रिया रिकॉर्ड कर ली गई है!';
            recordingInterface.appendChild(feedback);
            
            // Update progress
            if (typeof updateProgress === 'function') {
                updateProgress('activities', 15);
            }
        }
    });
}

// Function to check speaking quiz answers
function checkSpeakingQuiz() {
    const q1 = document.querySelector('input[name="speaking1"]:checked');
    const q2 = document.querySelector('input[name="speaking2"]:checked');
    
    if (!q1 || !q2) {
        alert('कृपया सभी प्रश्नों के उत्तर दें।');
        return;
    }
    
    // Calculate score (hardcoding correct answers for this example)
    const correctAnswers = ["option3", "option4"]; // Replace with actual correct answers
    let score = 0;
    
    if (q1.value === correctAnswers[0]) score++;
    if (q2.value === correctAnswers[1]) score++;
    
    // Create feedback message
    const feedbackEl = document.getElementById('speakingFeedback');
    feedbackEl.textContent = `आपने ${score}/2 प्रश्नों के सही उत्तर दिए हैं!`;
    feedbackEl.className = `feedback-message show ${score === 2 ? 'success' : 'warning'}`;
    
    // Update progress if all correct
    if (typeof updateProgress === 'function' && score === 2) {
        updateProgress('activities', 15);
    }
}

// Function to open writing pad
function openWritingPad() {
    const activity = activityData.writing;
    console.log(`Opening writing pad: ${activity.title}`);
    
    // Show the writing pad
    const writingPad = document.querySelector('.writing-pad');
    writingPad.style.display = 'block';
    
    // Add guidelines above the textarea
    const guidelines = document.createElement('div');
    guidelines.className = 'writing-guidelines';
    guidelines.innerHTML = `
        <h4>लेखन दिशानिर्देश:</h4>
        <ul>
            ${activity.guidelines.map(guideline => `<li>${guideline}</li>`).join('')}
        </ul>
    `;
    
    // Style the guidelines
    const style = document.createElement('style');
    style.textContent = `
        .writing-guidelines {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        .writing-guidelines h4 {
            margin-top: 0;
        }
        .writing-guidelines ul {
            padding-left: 20px;
            margin-bottom: 0;
        }
        .writing-guidelines li {
            margin-bottom: 8px;
        }
    `;
    
    document.head.appendChild(style);
    
    // Insert guidelines before textarea
    writingPad.insertBefore(guidelines, writingPad.firstChild);
}

// Function to check writing quiz answers
function checkWritingQuiz() {
    const q1 = document.querySelector('input[name="writing1"]:checked');
    const q2 = document.querySelector('input[name="writing2"]:checked');
    const q3 = document.querySelector('input[name="writing3"]:checked');
    
    if (!q1 || !q2 || !q3) {
        alert('कृपया सभी प्रश्नों के उत्तर दें।');
        return;
    }
    
    // Calculate score (hardcoding correct answers for this example)
    const correctAnswers = ["option1", "option4", "option4"]; // Replace with actual correct answers
    let score = 0;
    
    if (q1.value === correctAnswers[0]) score++;
    if (q2.value === correctAnswers[1]) score++;
    if (q3.value === correctAnswers[2]) score++;
    
    // Create feedback message
    const feedbackEl = document.getElementById('writingFeedback');
    feedbackEl.textContent = `आपने ${score}/3 प्रश्नों के सही उत्तर दिए हैं!`;
    feedbackEl.className = `feedback-message show ${score === 3 ? 'success' : 'warning'}`;
    
    // Update progress if all correct
    if (typeof updateProgress === 'function' && score === 3) {
        updateProgress('activities', 20);
    }
}
