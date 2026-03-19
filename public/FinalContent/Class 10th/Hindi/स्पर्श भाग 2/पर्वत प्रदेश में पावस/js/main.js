/**
 * Main functionality for Parvat Pradesh Me Pavas interactive learning module
 */

// Global Variables
let progress = 0;
let score = 0;
let modulesCompleted = [];
let currentModule = 'intro';
let audioEnabled = true;
let narrator = null;
let timeStarted = Date.now();
let userInteracted = false;

// Global narration state management
let globalNarrationState = {
    isEnabled: false,
    disabledByUser: false,
    currentModule: null,
    currentPart: null
};

// Initialize on load
window.addEventListener('load', () => {
    initializeNarrator();
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // Add global user interaction tracking
    document.addEventListener('click', trackUserInteraction, { once: true });
    document.addEventListener('keydown', trackUserInteraction, { once: true });
    document.addEventListener('touchstart', trackUserInteraction, { once: true });
    
    // Don't speak immediately - wait for user interaction
});

// Initialize Narrator
function initializeNarrator() {
    if ('speechSynthesis' in window) {
        console.log('Initializing narrator...');
        narrator = {
            synth: window.speechSynthesis,
            enabled: true,
            voice: null,
            isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            currentUtterance: null,
            onEndCallback: null,
            
            speak: function(text) {
                if (!this.enabled) return;
                
                // Ensure narrator is properly initialized
                if (!this.synth) {
                    console.error('Speech synthesis not available');
                    return;
                }
                
                // Check if user has interacted (required for autoplay policy)
                if (!userInteracted) {
                    console.log('Speech synthesis blocked - waiting for user interaction');
                    this.showFallbackMessage(text);
                    return;
                }
                
                // Cancel any ongoing speech
                this.synth.cancel();
                
                // Pre-process text for better narration quality
                const processedText = this.preprocessText(text);
                
                // Create new utterance
                const utterance = new SpeechSynthesisUtterance(processedText);
                
                // Set voice parameters based on browser
                this.optimizeVoiceParameters(utterance);
                
                // Select appropriate voice if available
                if (!this.voice) {
                    // Initialize voices if not done already
                    this.initializeVoices();
                }
                
                if (this.voice) {
                    utterance.voice = this.voice;
                }
                
                // Add error handling
                utterance.onerror = (event) => {
                    console.error('Speech synthesis error:', event);
                    if (event.error === 'not-allowed') {
                        console.log('Speech synthesis not allowed - showing fallback message');
                        userInteracted = false; // Reset interaction flag
                        this.showFallbackMessage(processedText);
                    } else if (event.error === 'interrupted') {
                        console.log('Speech synthesis was interrupted - this is normal when switching content');
                        // Don't show fallback message for interruptions as they're expected
                    } else {
                        console.log('Speech synthesis error - showing fallback message');
                        this.showFallbackMessage(processedText);
                    }
                };
                
                // Store current utterance for reference
                this.currentUtterance = utterance;
                
                // Set up end event handler
                utterance.onend = (event) => {
                    console.log('Speech ended');
                    // Clear current utterance reference
                    this.currentUtterance = null;
                    if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                        this.onEndCallback();
                    }
                };
                
                // Safari/iOS specific handling
                if (this.isSafari || this.isIOS) {
                    this.speakForSafari(utterance, processedText);
                } else {
                    // Speak the text for other browsers
                    this.synth.speak(utterance);
                }
            },
            
            // Safari-specific speech handling
            speakForSafari: function(utterance, text) {
                // Safari has issues with long text, so we'll chunk it
                const chunks = this.chunkText(text);
                
                // Queue each chunk with a slight delay between them
                let i = 0;
                const speakNextChunk = () => {
                    if (i < chunks.length && this.enabled) {
                        const chunkUtterance = new SpeechSynthesisUtterance(chunks[i]);
                        // Copy properties from original utterance
                        chunkUtterance.voice = utterance.voice;
                        chunkUtterance.rate = utterance.rate;
                        chunkUtterance.pitch = utterance.pitch;
                        chunkUtterance.volume = utterance.volume;
                        
                        // Set up to speak next chunk when this one ends
                        chunkUtterance.onend = () => {
                            i++;
                            if (i < chunks.length) {
                                setTimeout(speakNextChunk, 50); // Small delay between chunks
                            } else {
                                // Last chunk finished, trigger the end callback
                                console.log('Safari speech completed');
                                if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                                    this.onEndCallback();
                                }
                            }
                        };
                        
                        chunkUtterance.onerror = (event) => {
                            console.error('Speech synthesis error in chunk:', event);
                            i++;
                            if (i < chunks.length) {
                                setTimeout(speakNextChunk, 50);
                            } else {
                                // Last chunk errored, still trigger the end callback
                                if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                                    this.onEndCallback();
                                }
                            }
                        };
                        
                        this.synth.speak(chunkUtterance);
                    }
                };
                
                speakNextChunk();
            },
            
            // Break text into smaller chunks for better Safari performance
            chunkText: function(text) {
                // Split by sentences and ensure chunks aren't too long
                const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                const chunks = [];
                let currentChunk = '';
                
                sentences.forEach(sentence => {
                    // If adding this sentence would make the chunk too long, start a new chunk
                    if (currentChunk.length + sentence.length > 200) {
                        if (currentChunk) chunks.push(currentChunk);
                        currentChunk = sentence;
                    } else {
                        currentChunk += sentence;
                    }
                });
                
                if (currentChunk) chunks.push(currentChunk);
                return chunks.length ? chunks : [text];
            },
            
            // Preprocess text for better speech quality
            preprocessText: function(text) {
                // Remove emojis
                text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
                
                // Replace abbreviations and symbols for better pronunciation in Hindi
                let processed = text
                    .replace(/डॉ\./g, "डॉक्टर ")
                    .replace(/श्री\./g, "श्रीमान ")
                    .replace(/सं\./g, "संवत ")
                    .replace(/पृ\./g, "पृष्ठ ")
                    .replace(/\&/g, " और ")
                    .replace(/\$/g, " रुपये ")
                    .replace(/\%/g, " प्रतिशत ")
                    .replace(/🔊/g, "")
                    .replace(/📚/g, "")
                    .replace(/📝/g, "")
                    .replace(/📖/g, "")
                    .replace(/❓/g, "")
                    .replace(/🎯/g, "")
                    .replace(/🔤/g, "")
                    .replace(/🗣️/g, "")
                    .replace(/📊/g, "")
                    .replace(/🔇/g, "");
                
                // Add pauses at punctuation for more natural speech
                processed = this.addNaturalPauses(processed);
                
                return processed;
            },
            
            // Set optimal voice parameters based on browser
            optimizeVoiceParameters: function(utterance) {
                if (this.isSafari || this.isIOS) {
                    // Safari/iOS needs different parameters
                    utterance.rate = 0.9;   // Slightly slower
                    utterance.pitch = 1.0;  // Normal pitch
                    utterance.volume = 1.0; // Full volume
                } else {
                    // Chrome/Firefox/Edge parameters
                    utterance.rate = 0.85;  // Slightly slower for better clarity
                    utterance.pitch = 1.05; // Slightly higher pitch for female voice
                    utterance.volume = 1.0; // Full volume
                }
            },
            
            initializeVoices: function() {
                // Get available voices
                const voices = this.synth.getVoices();
                console.log('Available voices:', voices.map(v => v.name + ' (' + v.lang + ')'));
                
                // Try to find a Hindi voice
                let preferredVoice = voices.find(voice => 
                    voice.lang.startsWith('hi') || // Hindi voices
                    voice.name.includes('Hindi')
                );
                
                // If no Hindi voice is available, try to find an Indian English voice
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => 
                        voice.name.includes('Indian') || 
                        voice.name.includes('India')
                    );
                }
                
                // Fall back to any English voice if no Hindi or Indian English voice is available
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => voice.lang.startsWith('en'));
                }
                
                // Use any available voice as last resort
                if (!preferredVoice && voices.length > 0) {
                    preferredVoice = voices[0];
                }
                
                if (preferredVoice) {
                    this.voice = preferredVoice;
                    console.log('Selected voice:', preferredVoice.name);
                } else {
                    console.warn('No suitable voice found for narration');
                }
            },
            
            addNaturalPauses: function(text) {
                // Add extra spaces at punctuation for more natural speech pauses
                return text
                    .replace(/\.\s/g, '.  ')
                    .replace(/\!\s/g, '!  ')
                    .replace(/\?\s/g, '?  ')
                    .replace(/,\s/g, ',  ')
                    .replace(/;\s/g, ';  ')
                    .replace(/:\s/g, ':  ')
                    .replace(/।\s/g, '।  '); // For Hindi punctuation
            },
            
            stop: function() {
                this.synth.cancel();
                
                // Clear current utterance reference
                this.currentUtterance = null;
                
                // Clear any callbacks
                if (this.onEndCallback) {
                    this.onEndCallback = null;
                }
                
                console.log('Speech synthesis stopped');
            },
            
            toggle: function() {
                this.enabled = !this.enabled;
                if (!this.enabled) this.stop();
                return this.enabled;
            },
            
            showFallbackMessage: function(text) {
                // Create a fallback message box if speech fails
                const fallback = document.createElement('div');
                fallback.className = 'narrator-fallback';
                fallback.innerHTML = `
                    <div class="fallback-header">
                        <h4>वाचक कहते हैं:</h4>
                        <button class="fallback-close" onclick="this.parentNode.parentNode.remove()">×</button>
                    </div>
                    <p>${text}</p>
                `;
                document.body.appendChild(fallback);
                
                // Auto-remove after 8 seconds
                setTimeout(() => {
                    if (fallback.parentNode) {
                        fallback.classList.add('fade-out');
                        setTimeout(() => fallback.remove(), 500);
                    }
                }, 8000);
            }
        };
        
        // Make narrator available globally for other modules
        window.narrator = narrator;
        
        // Handle voices being loaded asynchronously in some browsers
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = function() {
                narrator.initializeVoices();
            };
        } else {
            // For Safari which doesn't always fire onvoiceschanged
            setTimeout(() => {
                if (!narrator.voice) {
                    narrator.initializeVoices();
                }
            }, 1000);
        }
        
    } else {
        console.warn('Speech synthesis not supported in this browser');
    }
}

// Update Timer
function updateTimer() {
    const elapsed = Math.floor((Date.now() - timeStarted) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timeSpent').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Track user interaction for speech synthesis
function trackUserInteraction() {
    if (!userInteracted) {
        userInteracted = true;
        console.log('User interaction detected - speech synthesis enabled');
    }
    return userInteracted;
}

// Module Navigation
function showModule(moduleId) {
    console.log(`Showing module: ${moduleId}`);
    
    // Stop any ongoing narration when switching modules
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration due to module switch');
        window.narrator.stop();
        
        // Clear any reading indicators from previous modules
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Clear any paragraph highlights from previous modules
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
        
        // Clear any timeouts
        if (window.readingTimeout && typeof clearTimeout === 'function') {
            clearTimeout(window.readingTimeout);
        }
        
        if (window.highlightTimeouts && typeof clearTimeout === 'function') {
            window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
            window.highlightTimeouts = [];
        }
    }
    
    // Hide all modules
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    
    // Show selected module
    const moduleElement = document.getElementById(moduleId);
    if (!moduleElement) {
        console.error(`Module element not found: ${moduleId}`);
        return;
    }
    
    moduleElement.classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active');
        n.setAttribute('aria-pressed', 'false');
    });
    
    // Find and update the clicked nav item
    const navItems = document.querySelectorAll('.nav-item');
    for (let item of navItems) {
        if (item.onclick && item.onclick.toString().includes(moduleId)) {
            item.classList.add('active');
            item.setAttribute('aria-pressed', 'true');
            break;
        }
    }
    
    // Track completion
    if (!modulesCompleted.includes(moduleId)) {
        modulesCompleted.push(moduleId);
        updateProgress();
        showAchievement(`मॉड्यूल पूर्ण: ${getModuleName(moduleId)}`);
    }
    
    currentModule = moduleId;
    
    // Handle specific module initialization
    switch(moduleId) {
        case 'story':
            // Always show Part 1 when entering the story module
            if (typeof showStoryPart === 'function') {
                showStoryPart(1);
            }
            break;
        case 'prereading':
            console.log('Initializing prereading module');
            // Auto-update progress for reflection section
            if (typeof saveReflection === 'function') {
                setTimeout(saveReflection, 2000); // Delay to ensure the module is visible
            }
            break;
        case 'thinking-text':
            console.log('Initializing thinking-text module');
            break;
        case 'thinking-language':
            console.log('Initializing thinking-language module');
            // Auto-update progress for expression practice section since answers are shown
            if (typeof updateProgress === 'function') {
                updateProgress('language', 100);
            }
            break;
        case 'activities':
            console.log('Initializing activities module');
            break;
    }
    
    // Automatically start narrating the new module content
    setTimeout(() => {
        startModuleNarration(moduleId);
    }, 200); // Small delay to ensure module is fully loaded
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Start module narration automatically
function startModuleNarration(moduleId) {
    if (!window.narrator || !window.narrator.enabled) {
        console.log('Narrator not available or disabled');
        return;
    }
    
    switch(moduleId) {
        case 'intro':
            if (window.narrator) {
                // Get the intro content
                const introModule = document.getElementById('intro');
                if (introModule) {
                    const contentBlocks = introModule.querySelectorAll('.content-block');
                    let introContent = "पर्वत प्रदेश में पावस कविता में आपका स्वागत है। ";
                    
                    // Extract text from content blocks
                    contentBlocks.forEach(block => {
                        const paragraphs = block.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            introContent += p.textContent + " ";
                        });
                    });
                    
                    // Speak the full intro content
                    window.narrator.speak(introContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("पर्वत प्रदेश में पावस कविता में आपका स्वागत है। यह पाठ सुमित्रानंदन पंत के जीवन और उनकी कविता का अन्वेषण करता है।");
                }
            }
            break;
            
        case 'prereading':
            if (window.narrator) {
                // Get the prereading content
                const prereadingModule = document.getElementById('prereading');
                if (prereadingModule) {
                    const contentBlocks = prereadingModule.querySelectorAll('.content-block');
                    let prereadingContent = "आइए शुरू करें। ";
                    
                    // Extract text from content blocks
                    contentBlocks.forEach(block => {
                        const paragraphs = block.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            prereadingContent += p.textContent + " ";
                        });
                    });
                    
                    // Add the activity title
                    const activityTitle = prereadingModule.querySelector('.activity-title');
                    if (activityTitle) {
                        prereadingContent += activityTitle.textContent + "। ";
                    }
                    
                    // Speak the full prereading content
                    speakInSequence(prereadingContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("पाठ प्रवेश खंड में आपका स्वागत है। यहां हम पर्वत प्रदेश में पावस कविता के संदर्भ और महत्व पर चर्चा करेंगे।");
                }
            }
            break;
            
        case 'story':
            // Automatically start reading the first part of the story
            if (typeof readStoryPartAloud === 'function') {
                readStoryPartAloud(1, false); // false = automatic call
            }
            break;
            
        case 'thinking-text':
            if (window.narrator) {
                window.narrator.speak("प्रश्न-अभ्यास खंड में आपका स्वागत है। यहां आप कविता का विश्लेषण करके प्रश्नों के उत्तर देंगे।");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("भाषा अध्ययन खंड में आपका स्वागत है। यहां आप शब्दों और उनके प्रचलित रूपों का अध्ययन करेंगे।");
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                window.narrator.speak("गतिविधि खंड में आपका स्वागत है। यहां आप विभिन्न क्रियाकलापों में भाग लेंगे।");
            }
            break;
            
        default:
            console.log(`No specific narration defined for module: ${moduleId}`);
            break;
    }
}

// Get a friendly name for a module
function getModuleName(moduleId) {
    switch (moduleId) {
        case 'intro': return 'परिचय';
        case 'prereading': return 'पाठ प्रवेश';
        case 'story': return 'कविता';
        case 'thinking-text': return 'प्रश्न अभ्यास';
        case 'thinking-language': return 'भाषा अध्ययन';
        case 'activities': return 'गतिविधियां';
        default: return moduleId;
    }
}

// Update Progress
function updateProgress() {
    progress = (modulesCompleted.length / 6) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    progressBar.textContent = Math.round(progress) + '%';
    document.getElementById('modulesComplete').textContent = modulesCompleted.length;
    
    // Update ARIA values
    const progressBarContainer = document.querySelector('.progress-bar');
    if (progressBarContainer) {
        progressBarContainer.setAttribute('aria-valuenow', Math.round(progress));
    }
}

// Show Achievement
function showAchievement(text) {
    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementDesc').textContent = text;
    popup.classList.add('show');
    
    score += 10;
    document.getElementById('totalScore').textContent = score;
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
    
    // Note: No narration here - achievements should not be announced
}

// Start Journey
function startJourney() {
    trackUserInteraction(); // Enable speech synthesis
    showModule('prereading');
    if (narrator) {
        // Get the prereading content for a more complete narration
        const prereadingModule = document.getElementById('prereading');
        if (prereadingModule) {
            const contentBlocks = prereadingModule.querySelectorAll('.content-block');
            let prereadingContent = "पर्वत प्रदेश में पावस कविता में आपका स्वागत है। आइए पाठ प्रवेश से शुरू करते हैं और इस कविता के अर्थ और महत्व के बारे में जानते हैं। ";
            
            // Extract text from content blocks
            contentBlocks.forEach(block => {
                const paragraphs = block.querySelectorAll('p');
                paragraphs.forEach(p => {
                    prereadingContent += p.textContent + " ";
                });
            });
            
            // Speak the full content using the sequence function
            speakInSequence(prereadingContent);
        } else {
            // Fallback if module not found
            narrator.speak("पर्वत प्रदेश में पावस कविता में आपका स्वागत है। आइए पाठ प्रवेश से शुरू करते हैं और इस कविता के अर्थ और महत्व के बारे में जानते हैं।");
        }
    }
}

// Toggle Audio
function toggleAudio() {
    trackUserInteraction(); // Enable speech synthesis when user interacts with audio controls
    if (!narrator) return;
    
    const btn = document.getElementById('audioBtn');
    audioEnabled = narrator.toggle();
    btn.textContent = audioEnabled ? '🔊' : '🔇';
    btn.classList.toggle('muted', !audioEnabled);
    btn.setAttribute('aria-label', audioEnabled ? 'वाचन बंद करें' : 'वाचन शुरू करें');
}

// Toggle Print Mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');
    
    if (document.body.classList.contains('print-mode')) {
        if (narrator) {
            narrator.speak("प्रिंट मोड सक्रिय। पृष्ठ अब प्रिंटिंग के लिए अनुकूलित है।");
        }
    } else {
        if (narrator) {
            narrator.speak("प्रिंट मोड निष्क्रिय।");
        }
    }
}

// Function to speak longer text in sequence by breaking it into sentences
function speakInSequence(text) {
    if (!window.narrator) return;
    
    // Break the text into sentences
    const sentences = text.match(/[^.!?।]+[.!?।]+/g) || [text];
    
    // Function to speak sentences sequentially
    function speakNextSentence(index = 0) {
        if (index >= sentences.length) return;
        
        // Set callback for when this sentence ends
        window.narrator.onEndCallback = function() {
            // Small pause between sentences
            setTimeout(() => {
                speakNextSentence(index + 1);
            }, 200);
        };
        
        // Speak the current sentence
        window.narrator.speak(sentences[index]);
    }
    
    // Start speaking the first sentence
    speakNextSentence(0);
}

// Highlight Vocabulary
function highlightVocabulary() {
    document.querySelectorAll('.highlight-vocab').forEach(vocab => {
        vocab.style.background = '#ffeb3b';
    });
    
    if (narrator) {
        narrator.speak("शब्दार्थ हाइलाइट किए गए हैं। उन पर माउस लाकर उनके अर्थ देखें।");
    }
}

// Handle reflection progress - Auto-updates progress when the reflection section is viewed
function saveReflection() {
    // Auto-update progress when user views the reflection section
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        updateProgress();
        showAchievement('प्रकृति पर चिंतन पूर्ण!');
    }
    
    if (narrator) {
        narrator.speak("प्रकृति पर चिंतन के लिए धन्यवाद। अपने विचारों को मापदंडों के अनुसार जांचें।");
    }
}

// Save listening notes
function saveListeningNotes() {
    const notes = document.getElementById('listeningNotes').value.trim();
    const narrative = document.getElementById('narrativeAccount').value.trim();
    
    if (notes.length < 20 || narrative.length < 50) {
        alert('कृपया अधिक विस्तृत नोट्स और कथा लिखें।');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    alert('आपके नोट्स और कथा सहेज ली गई हैं!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('श्रवण गतिविधि पूर्ण!');
    }
    
    if (narrator) {
        narrator.speak("बहुत अच्छा! आपके नोट्स और कथा सहेज ली गई हैं।");
    }
}

// Save writing
function saveWriting() {
    const writing = document.getElementById('writingPad').value.trim();
    
    if (writing.length < 100) {
        alert('कृपया अधिक विस्तृत लेख लिखें (कम से कम 100 अक्षर)।');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('आपका लेख सहेज लिया गया है!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("उत्कृष्ट कार्य! आपका लेख सहेज लिया गया है।");
    }
}

// Record speaking response
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('वास्तविक कार्यान्वयन में, यह Web Audio API का उपयोग करके आपकी बोली हुई प्रतिक्रिया रिकॉर्ड करेगा।');
    
    // Update progress
    score += 10;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("किसी ऐसे व्यक्ति के बारे में सोचें जो दृढ़ता, संकल्प और इच्छाशक्ति जैसे गुण प्रदर्शित करता है। उनके बारे में अपने विचार साझा करें।");
    }
}

// Play listening activity
function playListeningActivity() {
    // Track user interaction for speech synthesis
    trackUserInteraction();
    
    // In a real app, this would play an audio file
    console.log('Playing listening activity audio');
    
    // Show the notes section
    const notesSection = document.querySelector('.listening-notes');
    if (notesSection) {
        notesSection.style.display = 'block';
    }
    
    // Use narrator to speak the text
    if (narrator) {
        // Create more comprehensive biographical text
        const biographicalText = 
            "सुमित्रानंदन पंत का जन्म 20 मई 1900 को उत्तराखंड के कौसानी-अलमोड़ा में हुआ था। " +
            "उन्होंने बचपन से ही कविता लिखना शुरू कर दिया था। मात्र सात साल की उम्र में स्कूल में काव्य पाठ के लिए पुरस्कृत हुए। " +
            "उन्होंने 1915 में स्थायी रूप से साहित्य सृजन शुरू किया और छायावाद के प्रमुख स्तंभ के रूप में प्रसिद्धि पाई। " +
            "पंत जी की आरंभिक कविताओं में प्रकृति प्रेम और रहस्यवाद झलकता है। " +
            "इसके बाद वे मार्क्स और महात्मा गांधी के विचारों से प्रभावित हुए। " +
            "इनकी बाद की कविताओं में अरविंद दर्शन का प्रभाव स्पष्ट नज़र आता है। " +
            "जीविका के क्षेत्र में पंत जी उदयशंकर संस्कृति केंद्र से जुड़े। आकाशवाणी के परामर्शदाता रहे। " +
            "1961 में भारत सरकार ने इन्हें पद्मभूषण सम्मान से अलंकृत किया। " +
            "हिंदी के पहले ज्ञानपीठ पुरस्कार विजेता हुए।";
            
        // Use speakInSequence for better narration quality
        if (typeof speakInSequence === 'function') {
            console.log('Using sequential speech for better narration quality');
            speakInSequence(biographicalText);
        } else {
            // Fall back to regular speak if speakInSequence isn't available
            narrator.speak(biographicalText);
        }
        
        // Show a visual indicator that audio is playing
        const listeningSection = document.querySelector('.listening-activity');
        if (listeningSection) {
            const existingIndicator = listeningSection.querySelector('.audio-playing');
            if (!existingIndicator) {
                const audioIndicator = document.createElement('div');
                audioIndicator.className = 'audio-playing';
                audioIndicator.innerHTML = '<div class="audio-wave"></div> वाचन चल रहा है...';
                
                // Find the button
                const button = listeningSection.querySelector('.interactive-btn');
                if (button) {
                    button.parentNode.insertBefore(audioIndicator, button.nextSibling);
                    
                    // Remove indicator after a reasonable time or when narration ends
                    if (narrator.onEndCallback) {
                        narrator.onEndCallback = function() {
                            if (audioIndicator.parentNode) {
                                audioIndicator.remove();
                            }
                        };
                    } else {
                        // Fallback timeout
                        setTimeout(() => {
                            if (audioIndicator.parentNode) {
                                audioIndicator.remove();
                            }
                        }, biographicalText.length * 80); // Approximate time to finish speaking
                    }
                }
            }
        }
    } else {
        // Show fallback message if narrator isn't available
        const fallbackMessage = "सुमित्रानंदन पंत का जन्म 20 मई 1900 को उत्तराखंड के कौसानी-अलमोड़ा में हुआ था। उन्होंने बचपन से ही कविता लिखना शुरू कर दिया था।";
        
        if (window.narrator && typeof window.narrator.showFallbackMessage === 'function') {
            window.narrator.showFallbackMessage(fallbackMessage);
        } else {
            alert('वाचन सुविधा उपलब्ध नहीं है। वाचन चालू करने के लिए ऑडियो बटन को सक्रिय करें।');
        }
    }
    
    // Update progress
    score += 5;
    document.getElementById('totalScore').textContent = score;
}

// Show resource
function showResource(resourceId) {
    // In a real app, this would show or load a specific resource
    alert(`वास्तविक कार्यान्वयन में, यह संसाधन दिखाएगा: ${resourceId}`);
    
    if (narrator) {
        switch(resourceId) {
            case 'pant-life':
                narrator.speak("सुमित्रानंदन पंत का जन्म 20 मई 1900 को उत्तराखंड के कौसानी-अलमोड़ा में हुआ था। उन्होंने बचपन से ही कविता लिखना शुरू कर दिया था। उन्होंने 1915 में स्थायी रूप से साहित्य सृजन शुरू किया और छायावाद के प्रमुख स्तंभ के रूप में प्रसिद्धि पाई।");
                break;
            case 'pant-photos':
                narrator.speak("ये चित्र सुमित्रानंदन पंत के जीवन और उनकी कविताओं को दर्शाते हैं।");
                break;
            case 'project-template':
                narrator.speak("यह टेम्पलेट सुमित्रानंदन पंत के जीवन और उनकी कविताओं पर आपके प्रोजेक्ट के लिए एक संरचना प्रदान करता है, जिसमें उनके विचारों, उनके समय के सामाजिक संदर्भ, और आज के समय में उनकी प्रासंगिकता के लिए खंड शामिल हैं।");
                break;
        }
    }
}

// This is a duplicate function - the main one is at line 596
// Using empty implementation to avoid errors from existing calls
function _showAchievement(message) {
    // Delegate to the main implementation
    showAchievement(message);
}
