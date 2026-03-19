/**
 * Activities and interactions for तोप lesson
 */

// Audio for the listening activity
let listeningAudio = null;
let audioInitialized = false;
let speechSynthesis = window.speechSynthesis;
let speechUtterance = null;
let isPaused = false;
let useAudioElement = false; // Flag to use regular audio element instead of speech synthesis
let transcript = `1857 का विद्रोह भारतीय इतिहास में एक महत्वपूर्ण मोड़ रहा है। इस विद्रोह को भारत का प्रथम स्वतंत्रता संग्राम भी कहा जाता है। इस विद्रोह में तोपों का विशेष महत्व था। अंग्रेजी सेना तोपों का उपयोग एक प्रमुख हथियार के रूप में करती थी।

कई ऐतिहासिक स्थानों पर आज भी तोपें संग्रहालयों और स्मारकों के रूप में रखी गई हैं। ये तोपें हमें याद दिलाती हैं कि कैसे ब्रिटिश साम्राज्य ने अपनी सैन्य शक्ति के बल पर भारत पर शासन किया था। वीरेन डंगवाल की कविता 'तोप' इसी ऐतिहासिक प्रतीक के माध्यम से एक गहरा संदेश देती है।

कविता में वर्णित तोप कंपनी बाग के मुहाने पर रखी हुई है। चौकीदार सैलानियों को बताता है कि यह वही तोप है जिसने कई सूरमाओं के धज्जे उड़ा दिए थे। लेकिन अब यह तोप निष्क्रिय है। छोटे बच्चे इस पर घुड़सवारी करते हैं और चिड़ियाँ इस पर बैठकर गपशप करती हैं।

चिड़ियों के माध्यम से कवि एक महत्वपूर्ण संदेश देते हैं - कितनी भी बड़ी हो तोप, एक दिन उसका मुँह बंद होना ही है। यह संदेश हमें बताता है कि कोई भी शक्ति स्थायी नहीं होती। अत्याचार और उत्पीड़न की शक्तियाँ अंततः पराजित होती हैं।

आज के समय में, ये ऐतिहासिक तोपें हमारी धरोहर का हिस्सा हैं। ये हमें अपने इतिहास से सीखने और अपनी स्वतंत्रता के मूल्य को समझने की प्रेरणा देती हैं। इस प्रकार तोप एक प्रतीक के रूप में हमारे वर्तमान में भी प्रासंगिक है।`;

// Initialize the activity event listeners
document.addEventListener('DOMContentLoaded', function() {
    initListeningActivity();
    initSpeakingActivity();
    initWritingActivity();
});

// MCQ answer checking function
window.checkMcqAnswer = function(inputElement, questionId) {
    // Correct answers for each question
    const correctAnswers = {
        'revolt-role': 'main-weapon',
        'poet-message': 'power-end',
        'cannon-today': 'heritage',
        'narrative': '2'
    };
    
    // Get feedback element
    const feedbackElement = document.getElementById(questionId + '-feedback');
    if (!feedbackElement) return;
    
    // Clear previous feedback
    feedbackElement.className = 'question-feedback';
    
    // Check if answer is correct
    if (inputElement.value === correctAnswers[questionId]) {
        feedbackElement.textContent = '✓ सही उत्तर!';
        feedbackElement.classList.add('correct');
    } else {
        feedbackElement.textContent = '✗ पुनः प्रयास करें';
        feedbackElement.classList.add('incorrect');
    }
};

// Initialize the listening activity
function initListeningActivity() {
    // Play audio using a direct iframe approach for better reliability
    window.playListeningActivity = function() {
        // Display audio content directly for maximum compatibility
        const container = document.querySelector('.listening-activity .content-block');
        
        // Always ensure the audio player container exists and is reset
        const existingPlayer = document.getElementById('audio-player-container');
        if (existingPlayer) {
            existingPlayer.remove();
        }
        
        // Create player container
        const audioPlayerContainer = document.createElement('div');
        audioPlayerContainer.id = 'audio-player-container';
        audioPlayerContainer.style.margin = '20px 0';
        audioPlayerContainer.style.padding = '15px';
        audioPlayerContainer.style.backgroundColor = '#f5f5f5';
        audioPlayerContainer.style.borderRadius = '8px';
        audioPlayerContainer.style.border = '1px solid #ddd';
        
        // Create player header
        const playerHeader = document.createElement('div');
        playerHeader.style.display = 'flex';
        playerHeader.style.alignItems = 'center';
        playerHeader.style.marginBottom = '15px';
        
        // Create title
        const playerTitle = document.createElement('h4');
        playerTitle.textContent = '1857 का विद्रोह और तोप का महत्व';
        playerTitle.style.margin = '0';
        playerTitle.style.flex = '1';
        
        // Create controls container
        const playerControls = document.createElement('div');
        playerControls.style.display = 'flex';
        playerControls.style.gap = '10px';
            
        // Play/pause button
        const playPauseBtn = document.createElement('button');
        playPauseBtn.id = 'play-pause-btn';
        playPauseBtn.textContent = '▶️ चलाएँ';
        playPauseBtn.className = 'audio-control-btn';
        playPauseBtn.style.padding = '5px 10px';
        playPauseBtn.style.backgroundColor = '#4CAF50';
        playPauseBtn.style.color = 'white';
        playPauseBtn.style.border = 'none';
        playPauseBtn.style.borderRadius = '4px';
        playPauseBtn.style.cursor = 'pointer';
            
        // Stop button
        const stopBtn = document.createElement('button');
        stopBtn.id = 'stop-btn';
        stopBtn.textContent = '⏹️ रोकें';
        stopBtn.className = 'audio-control-btn';
        stopBtn.style.padding = '5px 10px';
        stopBtn.style.backgroundColor = '#f44336';
        stopBtn.style.color = 'white';
        stopBtn.style.border = 'none';
        stopBtn.style.borderRadius = '4px';
        stopBtn.style.cursor = 'pointer';
            
        // Add buttons to controls
        playerControls.appendChild(playPauseBtn);
        playerControls.appendChild(stopBtn);
        
        // Assemble header
        playerHeader.appendChild(playerTitle);
        playerHeader.appendChild(playerControls);
            
        // Create progress container
        const progressContainer = document.createElement('div');
        progressContainer.style.width = '100%';
        progressContainer.style.backgroundColor = '#ddd';
        progressContainer.style.borderRadius = '4px';
        progressContainer.style.height = '8px';
        progressContainer.style.position = 'relative';
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.id = 'audio-progress';
        progressBar.style.width = '0%';
        progressBar.style.backgroundColor = '#4CAF50';
        progressBar.style.height = '100%';
        progressBar.style.borderRadius = '4px';
        progressBar.style.transition = 'width 0.3s';
            
        // Add progress bar to container
        progressContainer.appendChild(progressBar);
        
        // Create status text
        const statusText = document.createElement('p');
        statusText.id = 'audio-status';
        statusText.textContent = 'ऑडियो तैयार है';
        statusText.style.margin = '10px 0 0 0';
        statusText.style.fontSize = '0.9em';
        statusText.style.color = '#666';
            
        // Create transcript container (hidden initially)
        const transcriptContainer = document.createElement('div');
        transcriptContainer.id = 'transcript-container';
        transcriptContainer.style.marginTop = '15px';
        transcriptContainer.style.padding = '10px';
        transcriptContainer.style.border = '1px solid #ddd';
        transcriptContainer.style.borderRadius = '4px';
        transcriptContainer.style.maxHeight = '150px';
        transcriptContainer.style.overflowY = 'auto';
        transcriptContainer.style.display = 'none';
        transcriptContainer.style.backgroundColor = 'white';
        
        // Add transcript text
        const transcriptText = document.createElement('p');
        transcriptText.textContent = transcript;
        transcriptText.style.margin = '0';
        transcriptText.style.lineHeight = '1.6';
        // Add text to transcript container
        transcriptContainer.appendChild(transcriptText);
        
        // Show transcript button
        const showTranscriptBtn = document.createElement('button');
        showTranscriptBtn.id = 'show-transcript-btn';
        showTranscriptBtn.textContent = '📄 प्रतिलेख दिखाएँ';
        showTranscriptBtn.style.padding = '5px 10px';
        showTranscriptBtn.style.backgroundColor = '#2196F3';
        showTranscriptBtn.style.color = 'white';
        showTranscriptBtn.style.border = 'none';
        showTranscriptBtn.style.borderRadius = '4px';
        showTranscriptBtn.style.marginTop = '10px';
        showTranscriptBtn.style.cursor = 'pointer';
            
        // Assemble player
        audioPlayerContainer.appendChild(playerHeader);
        audioPlayerContainer.appendChild(progressContainer);
        audioPlayerContainer.appendChild(statusText);
        audioPlayerContainer.appendChild(showTranscriptBtn);
        audioPlayerContainer.appendChild(transcriptContainer);
        
        // Insert player into the page
        const button = document.querySelector('.listening-activity .interactive-btn');
        if (container && button) {
            container.insertBefore(audioPlayerContainer, button);
            
            // Set up event handlers
            playPauseBtn.addEventListener('click', togglePlayPause);
            stopBtn.addEventListener('click', stopAudio);
            showTranscriptBtn.addEventListener('click', toggleTranscript);
        }
        
        audioInitialized = true;
        
        // Add a direct iframe to the content immediately, no need for delayed start
        // This ensures the audio content is always available, even if speech synthesis fails
        const audioContent = document.createElement('iframe');
        audioContent.src = 'audio/1857-revolt.html';
        audioContent.style.width = '100%';
        audioContent.style.height = '300px';
        audioContent.style.border = '1px solid #ddd';
        audioContent.style.borderRadius = '4px';
        audioContent.style.marginTop = '15px';
        
        // Add the iframe after the progress bar
        progressContainer.parentNode.insertBefore(audioContent, progressContainer.nextSibling);
        
        // Show transcript immediately
        showTranscript();
        
        // Update status
        statusText.textContent = 'नैरेशन प्रदर्शित है। कृपया पढ़ें और प्रश्नों के उत्तर दें।';
        statusText.style.color = '#1976d2';
        
        // Hide the "play audio" button since we now have the custom player
        const playButton = document.querySelector('.listening-activity .interactive-btn');
        if (playButton) {
            playButton.style.display = 'none';
        }
        
        // Show message to scroll down after listening
        const messageDiv = document.createElement('div');
        messageDiv.style.textAlign = 'center';
        messageDiv.style.margin = '15px 0';
        messageDiv.innerHTML = '<button class="interactive-btn" onclick="scrollToQuestions()">⬇️ प्रश्नों के उत्तर दें</button>';
        container.appendChild(messageDiv);
        
        // Initialize the scroll to questions function
        window.scrollToQuestions = function() {
            const questionsSection = document.querySelector('.listening-notes');
            if (questionsSection) {
                questionsSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
    };
    
    // Toggle play/pause function
    function togglePlayPause() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const statusText = document.getElementById('audio-status');
        
        // Check if speech synthesis is available
        if (!window.speechSynthesis) {
            // Try using HTML5 audio as fallback
            if (!useAudioElement) {
                useAudioElement = true;
                
                try {
                    // Create an iframe with the audio content
                    const audioIframe = document.createElement('iframe');
                    audioIframe.src = 'audio/1857-revolt.html';
                    audioIframe.style.width = '100%';
                    audioIframe.style.height = '300px';
                    audioIframe.style.border = '1px solid #ddd';
                    audioIframe.style.borderRadius = '4px';
                    audioIframe.style.marginTop = '15px';
                    
                    // Create an audio player with narration
                    const audioPlayer = document.createElement('div');
                    audioPlayer.style.marginTop = '15px';
                    audioPlayer.innerHTML = `
                        <details open>
                            <summary style="cursor: pointer; color: #1976d2; margin-bottom: 10px;">नैरेशन</summary>
                            <div style="margin-top: 10px;">
                                <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                                    <p style="font-weight: bold; margin-top: 0;">1857 के विद्रोह और तोप का महत्व (नैरेशन)</p>
                                    <p>${transcript.split('\n\n').join('</p><p>')}</p>
                                </div>
                            </div>
                        </details>
                    `;
                    
                    // Insert after status text
                    const statusTextElement = document.getElementById('audio-status');
                    if (statusTextElement) {
                        statusTextElement.parentNode.insertBefore(audioPlayer, statusTextElement.nextSibling);
                    }
                    
                    // Update status text
                    statusText.textContent = 'कृपया नैरेशन पढ़कर प्रश्नों के उत्तर दें।';
                    statusText.style.color = '#1976d2';
                    
                    // Disable play/pause button
                    playPauseBtn.disabled = true;
                    playPauseBtn.style.opacity = 0.5;
                } catch (error) {
                    console.error("HTML5 audio fallback failed:", error);
                }
                
                // Show transcript regardless
                showTranscript();
            }
            return;
        }
        
        // Log speech synthesis status to help with debugging
        console.log("Speech synthesis available:", !!window.speechSynthesis);
        
        if (!speechUtterance) {
            // First time playing
            speechUtterance = new SpeechSynthesisUtterance(transcript);
            speechUtterance.lang = 'hi-IN';
            
            // Find a Hindi voice if available
            let voices = speechSynthesis.getVoices();
            
            // In some browsers getVoices might be async, so we need to handle that
            if (voices.length === 0) {
                speechSynthesis.onvoiceschanged = function() {
                    voices = speechSynthesis.getVoices();
                    const hindiVoice = voices.find(voice => voice.lang === 'hi-IN' || voice.lang.startsWith('hi'));
                    if (hindiVoice) {
                        speechUtterance.voice = hindiVoice;
                    }
                };
            } else {
                const hindiVoice = voices.find(voice => voice.lang === 'hi-IN' || voice.lang.startsWith('hi'));
                if (hindiVoice) {
                    speechUtterance.voice = hindiVoice;
                }
            }
            
            // Set speaking rate and pitch
            speechUtterance.rate = 0.9; // Slightly slower for clarity
            speechUtterance.pitch = 1;
            
            // Add event listeners
            speechUtterance.onstart = function() {
                statusText.textContent = 'ऑडियो चल रहा है...';
                updateProgress();
            };
            
            speechUtterance.onpause = function() {
                statusText.textContent = 'ऑडियो रुका हुआ है';
            };
            
            speechUtterance.onresume = function() {
                statusText.textContent = 'ऑडियो चल रहा है...';
            };
            
            speechUtterance.onend = function() {
                statusText.textContent = 'ऑडियो पूरा हो गया';
                playPauseBtn.textContent = '▶️ चलाएँ';
                isPaused = false;
                document.getElementById('audio-progress').style.width = '100%';
            };
            
            speechUtterance.onerror = function(event) {
                statusText.textContent = 'ऑडियो चलाने में त्रुटि: ' + event.error;
                statusText.style.color = '#f44336';
                playPauseBtn.textContent = '▶️ चलाएँ';
                isPaused = false;
                showTranscript();
            };
            
            // Start speaking
            try {
                // Reset any previous speech synthesis state
                speechSynthesis.cancel();
                
                // Create a new utterance
                speechUtterance = new SpeechSynthesisUtterance(transcript);
                speechUtterance.lang = 'hi-IN';
                
                // Find a Hindi voice if available
                let voices = speechSynthesis.getVoices();
                const hindiVoice = voices.find(voice => voice.lang === 'hi-IN' || voice.lang.startsWith('hi'));
                if (hindiVoice) {
                    speechUtterance.voice = hindiVoice;
                }
                
                // Set speaking rate and pitch
                speechUtterance.rate = 0.9; // Slightly slower for clarity
                speechUtterance.pitch = 1;
                
                // Start speaking
                speechSynthesis.speak(speechUtterance);
                playPauseBtn.textContent = '⏸️ रोकें';
                isPaused = false;
                
                // Show status
                statusText.textContent = 'ऑडियो चल रहा है...';
                
                // Check if speech actually started
                setTimeout(() => {
                    if (!speechSynthesis.speaking && !isPaused) {
                        // Speech didn't start, show the transcript and fallback to HTML content
                        statusText.textContent = 'ऑडियो शुरू नहीं हो सका। प्रतिलेख पढ़कर प्रश्नों के उत्तर दें।';
                        statusText.style.color = '#f44336';
                        useAudioElement = true;
                        
                        // Create iframe with audio content
                        const audioIframe = document.createElement('iframe');
                        audioIframe.src = 'audio/1857-revolt.html';
                        audioIframe.style.width = '100%';
                        audioIframe.style.height = '300px';
                        audioIframe.style.border = '1px solid #ddd';
                        audioIframe.style.borderRadius = '4px';
                        audioIframe.style.marginTop = '15px';
                        
                        // Add iframe before status text
                        const statusTextElement = document.getElementById('audio-status');
                        if (statusTextElement) {
                            statusTextElement.parentNode.insertBefore(audioIframe, statusTextElement);
                        }
                        
                        showTranscript();
                    }
                }, 1000);
            } catch (error) {
                console.error("Speech synthesis error:", error);
                statusText.textContent = 'ऑडियो चलाने में त्रुटि। प्रतिलेख पढ़कर प्रश्नों के उत्तर दें।';
                statusText.style.color = '#f44336';
                showTranscript();
                
                // Create iframe with audio content as a fallback
                const audioIframe = document.createElement('iframe');
                audioIframe.src = 'audio/1857-revolt.html';
                audioIframe.style.width = '100%';
                audioIframe.style.height = '300px';
                audioIframe.style.border = '1px solid #ddd';
                audioIframe.style.borderRadius = '4px';
                audioIframe.style.marginTop = '15px';
                
                // Add iframe before status text
                const statusTextElement = document.getElementById('audio-status');
                if (statusTextElement) {
                    statusTextElement.parentNode.insertBefore(audioIframe, statusTextElement);
                }
                
                playPauseBtn.disabled = true;
                playPauseBtn.style.opacity = 0.5;
            }
        } else if (isPaused) {
            // Resume speaking
            speechSynthesis.resume();
            playPauseBtn.textContent = '⏸️ रोकें';
            isPaused = false;
        } else {
            // Pause speaking
            speechSynthesis.pause();
            playPauseBtn.textContent = '▶️ चलाएँ';
            isPaused = true;
        }
    }
    
    // Stop audio function
    function stopAudio() {
        if (speechSynthesis && speechUtterance) {
            speechSynthesis.cancel();
            const statusText = document.getElementById('audio-status');
            statusText.textContent = 'ऑडियो रोका गया';
            document.getElementById('play-pause-btn').textContent = '▶️ चलाएँ';
            document.getElementById('audio-progress').style.width = '0%';
            isPaused = false;
            speechUtterance = null;
        }
    }
    
    // Toggle transcript visibility
    function toggleTranscript() {
        const transcriptContainer = document.getElementById('transcript-container');
        const showTranscriptBtn = document.getElementById('show-transcript-btn');
        
        if (transcriptContainer.style.display === 'none') {
            showTranscript();
        } else {
            transcriptContainer.style.display = 'none';
            showTranscriptBtn.textContent = '📄 प्रतिलेख दिखाएँ';
        }
    }
    
    // Show transcript
    function showTranscript() {
        const transcriptContainer = document.getElementById('transcript-container');
        const showTranscriptBtn = document.getElementById('show-transcript-btn');
        
        transcriptContainer.style.display = 'block';
        showTranscriptBtn.textContent = '📄 प्रतिलेख छिपाएँ';
    }
    
    // Update progress bar
    function updateProgress() {
        if (speechSynthesis && speechUtterance) {
            const progressBar = document.getElementById('audio-progress');
            
            // Use an interval to update the progress
            const progressInterval = setInterval(() => {
                if (speechSynthesis.speaking) {
                    // Estimate progress (not exact since we don't have a reliable way to track this)
                    // We'll simulate progress based on time
                    const currentWidth = parseFloat(progressBar.style.width) || 0;
                    if (currentWidth < 98) {
                        progressBar.style.width = (currentWidth + 0.2) + '%';
                    }
                } else {
                    clearInterval(progressInterval);
                    progressBar.style.width = '100%';
                }
            }, 100);
        }
    }
    
    // No need for separate pause function as HTML5 audio element has built-in controls
    
    // Function to save listening notes
    window.saveListeningNotes = function() {
        // Check if at least one option is selected in each group
        const revoltRole = document.querySelector('input[name="revolt-role"]:checked');
        const poetMessage = document.querySelector('input[name="poet-message"]:checked');
        const cannonToday = document.querySelector('input[name="cannon-today"]:checked');
        
        if (!revoltRole || !poetMessage || !cannonToday) {
            showFeedback('listeningFeedback', 'कृपया सभी प्रश्नों के उत्तर चुनें।', 'warning');
            return;
        }
        
        // Check if answers are correct
        const correctAnswers = {
            'revolt-role': 'main-weapon',
            'poet-message': 'power-end',
            'cannon-today': 'heritage'
        };
        
        let correctCount = 0;
        if (revoltRole.value === correctAnswers['revolt-role']) correctCount++;
        if (poetMessage.value === correctAnswers['poet-message']) correctCount++;
        if (cannonToday.value === correctAnswers['cannon-today']) correctCount++;
        
        // Display feedback
        let message = '';
        let feedbackClass = '';
        
        if (correctCount === 3) {
            message = 'बधाई हो! आपने सभी प्रश्नों के सही उत्तर दिए हैं।';
            feedbackClass = 'success';
        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress('activities', 15);
        }
            // Show achievement
            if (typeof showAchievement === 'function') {
                showAchievement('श्रवण गतिविधि पूर्ण!');
            }
        } else if (correctCount >= 2) {
            message = 'आपने ' + correctCount + ' प्रश्नों के सही उत्तर दिए हैं। और प्रयास करें!';
            feedbackClass = 'warning';
        } else {
            message = 'आपने ' + correctCount + ' प्रश्नों के सही उत्तर दिए हैं। कृपया दोबारा प्रयास करें।';
            feedbackClass = 'error';
        }
        
        showFeedback('listeningFeedback', message, feedbackClass);
    };
    }

// Initialize the speaking activity
function initSpeakingActivity() {
    // Function to save speaking option
    window.saveSpeakingOption = function() {
        const selectedOption = document.querySelector('input[name="speaking-option"]:checked');
        
        if (!selectedOption) {
            showFeedback('speakingFeedback', 'कृपया एक विचार चुनें।', 'warning');
            return;
        }
        
        // All options are valid interpretations, so we accept any choice
        showFeedback('speakingFeedback', 'आपका विचार सहेज लिया गया है। अच्छा प्रयास!', 'success');
        
        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress('activities', 10);
        }
    };
}

// Initialize the writing activity
function initWritingActivity() {
    // Function to save writing
    window.saveWriting = function() {
        const selectedOption = document.querySelector('input[name="writing-option"]:checked');
        
        if (!selectedOption) {
            showFeedback('writingFeedback', 'कृपया एक विकल्प चुनें।', 'warning');
            return;
        }
        
        // All options are valid interpretations, so we accept any choice
        showFeedback('writingFeedback', 'आपका विचार सहेज लिया गया है। अच्छा प्रयास!', 'success');
        
        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress('activities', 20);
        }
        
        // Show achievement
        if (typeof showAchievement === 'function') {
            showAchievement('विचार-चयन गतिविधि पूर्ण!');
        }
    };
}

// Utility function to show feedback
function showFeedback(elementId, message, type) {
    const feedbackElement = document.getElementById(elementId);
    if (feedbackElement) {
        feedbackElement.textContent = message;
        feedbackElement.className = 'feedback-message show';
        
        // Remove existing type classes
        feedbackElement.classList.remove('success', 'error', 'warning', 'info');
        
        // Add the specified type class
        if (type) {
            feedbackElement.classList.add(type);
        }
    }
}