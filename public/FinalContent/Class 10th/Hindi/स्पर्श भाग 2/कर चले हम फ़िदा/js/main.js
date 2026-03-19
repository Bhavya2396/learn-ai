/**
 * Main functionality for Kar Chale Hum Fida Interactive Hindi Module
 */

// Track module completion and scores
let completedModules = 0;
let totalScore = 0;
let startTime = new Date();
let userInteracted = false;

// Global narration state management
let globalNarrationState = {
    isEnabled: true,
    disabledByUser: false,
    currentModule: null,
    currentPart: null
};

// Initialize the module
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Kar Chale Hum Fida module...');
    
    // Initialize the progress tracker
    updateProgressDisplay();
    
    // Initialize the narrator if Speech Synthesis is available
    initNarrator();
    
    // Initialize timer
    startTimer();
    
    // Add global user interaction tracking
    document.addEventListener('click', trackUserInteraction, { once: true });
    document.addEventListener('keydown', trackUserInteraction, { once: true });
    document.addEventListener('touchstart', trackUserInteraction, { once: true });
    
    // Add event listener for module navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const moduleId = this.getAttribute('onclick').match(/showModule\('(.+?)'\)/)[1];
            console.log(`Navigation to module: ${moduleId}`);
        });
    });
    
    // Load the story content if we're on the story page
    if (document.getElementById('storyContent')) {
        showStoryPart(1);
    }
});

// Show a specific module
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
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Show the selected module
    const targetModule = document.getElementById(moduleId);
    if (targetModule) {
        targetModule.classList.add('active');
        
        // Update navigation states
        document.querySelectorAll('.nav-item').forEach(item => {
            const itemModuleId = item.getAttribute('onclick').match(/showModule\('(.+?)'\)/)[1];
            item.classList.toggle('active', itemModuleId === moduleId);
            item.setAttribute('aria-pressed', itemModuleId === moduleId ? 'true' : 'false');
        });
        
        // Update global narration state
        globalNarrationState.currentModule = moduleId;
        
        // If showing the story module, initialize the story content
        if (moduleId === 'story' && document.getElementById('storyContent')) {
            if (!document.querySelector('.story-part')) {
                showStoryPart(1);
            }
        } else {
            // Start module-specific narration with a small delay
            setTimeout(() => {
                startModuleNarration(moduleId);
            }, 200);
        }
    } else {
        console.error(`Module with ID ${moduleId} not found`);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Start the learning journey
function startJourney() {
    trackUserInteraction(); // Enable speech synthesis
    console.log('Starting the learning journey...');
    showModule('prereading');
    updateProgress('intro', 10);
}

// Initialize the narrator for text-to-speech
function initNarrator() {
    if ('speechSynthesis' in window) {
        console.log('Speech synthesis is available');
        window.narrator = {
            enabled: true,
            speaking: false,
            currentUtterance: null,
            onEndCallback: null,
            voice: null,
            isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            
            speak: function(text) {
                if (!this.enabled || !text) return;
                
                // Check if user has interacted (required for autoplay policy)
                if (!userInteracted) {
                    console.log('Speech synthesis blocked - waiting for user interaction');
                    this.showFallbackMessage(text);
                    return;
                }
                
                // Stop any current speech
                this.stop();
                
                // Pre-process text for better narration quality
                const processedText = this.preprocessText(text);
                
                // Create a new utterance
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
                
                utterance.onend = () => {
                    this.speaking = false;
                    this.currentUtterance = null;
                    console.log('Speech ended');
                    if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                        this.onEndCallback();
                    }
                };
                
                utterance.onerror = (event) => {
                    console.error('Speech synthesis error:', event);
                    this.speaking = false;
                    this.currentUtterance = null;
                    
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
                
                // Safari/iOS specific handling
                if (this.isSafari || this.isIOS) {
                    this.speakForSafari(utterance, processedText);
                } else {
                    // Speak the text for other browsers
                    window.speechSynthesis.speak(utterance);
                    this.speaking = true;
                    console.log('Started speaking');
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
                        
                        window.speechSynthesis.speak(chunkUtterance);
                    }
                };
                
                speakNextChunk();
                this.speaking = true;
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
                // Replace abbreviations and symbols for better pronunciation in Hindi
                let processed = text
                    .replace(/डॉ\./g, "डॉक्टर ")
                    .replace(/श्री\./g, "श्रीमान ")
                    .replace(/सं\./g, "संवत ")
                    .replace(/पृ\./g, "पृष्ठ ")
                    .replace(/\&/g, " और ")
                    .replace(/\$/g, " रुपये ")
                    .replace(/\%/g, " प्रतिशत ");
                
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
                const voices = window.speechSynthesis.getVoices();
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
            
            showFallbackMessage: function(text) {
                // Create a fallback message box if speech fails
                const fallback = document.createElement('div');
                fallback.className = 'narrator-fallback';
                fallback.innerHTML = `
                    <div class="fallback-header">
                        <h4>🔊 वाचक कहते हैं:</h4>
                        <button class="fallback-close" onclick="this.parentNode.parentNode.remove()">×</button>
                    </div>
                    <p>${text}</p>
                `;
                
                // Apply styles
                fallback.style.position = 'fixed';
                fallback.style.bottom = '20px';
                fallback.style.right = '20px';
                fallback.style.width = '300px';
                fallback.style.background = 'white';
                fallback.style.borderRadius = '8px';
                fallback.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                fallback.style.zIndex = '1000';
                fallback.style.padding = '15px';
                
                document.body.appendChild(fallback);
                
                // Auto-remove after 8 seconds
                setTimeout(() => {
                    if (fallback.parentNode) {
                        fallback.style.opacity = '0';
                        fallback.style.transition = 'opacity 0.5s';
                        setTimeout(() => fallback.remove(), 500);
                    }
                }, 8000);
            },
            
            
            stop: function() {
                if (this.speaking) {
                    window.speechSynthesis.cancel();
                    this.speaking = false;
                    this.currentUtterance = null;
                    console.log('Speech stopped');
                }
            },
            
            pause: function() {
                if (this.speaking) {
                    window.speechSynthesis.pause();
                    this.speaking = false;
                    console.log('Speech paused');
                }
            },
            
            resume: function() {
                if (!this.speaking && this.currentUtterance) {
                    window.speechSynthesis.resume();
                    this.speaking = true;
                    console.log('Speech resumed');
                }
            }
        };
        
        // Work around browser quirks for speech synthesis
        let voices = [];
        
        function populateVoices() {
            voices = window.speechSynthesis.getVoices();
            console.log(`Loaded ${voices.length} voices`);
        }
        
        populateVoices();
        
        // Chrome loads voices asynchronously, so we need to wait for them to be loaded
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = populateVoices;
        }
    } else {
        console.warn('Speech synthesis not available');
        window.narrator = {
            enabled: false,
            speak: function() {
                console.warn('Speech synthesis is not available');
                alert('आपके ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है।');
            },
            stop: function() {},
            pause: function() {},
            resume: function() {}
        };
    }
}

// Toggle audio narration on/off
function toggleAudio() {
    trackUserInteraction(); // Enable speech synthesis when user interacts with audio controls
    const audioBtn = document.getElementById('audioBtn');
    if (!window.narrator) return;
    
    if (window.narrator.enabled) {
        window.narrator.enabled = false;
        window.narrator.stop();
        audioBtn.innerHTML = '🔇';
        audioBtn.classList.add('muted');
        audioBtn.setAttribute('aria-label', 'वाचन बंद है, चालू करने के लिए क्लिक करें');
        globalNarrationState.disabledByUser = true;
    } else {
        window.narrator.enabled = true;
        audioBtn.innerHTML = '🔊';
        audioBtn.classList.remove('muted');
        audioBtn.setAttribute('aria-label', 'वाचन चालू है, बंद करने के लिए क्लिक करें');
        globalNarrationState.disabledByUser = false;
    }
}

// Track user interaction for speech synthesis
// Some browsers require user interaction before allowing speech synthesis
function trackUserInteraction() {
    if (!userInteracted) {
        userInteracted = true;
        console.log('User interaction detected - speech synthesis enabled');
    }
    return userInteracted;
}

// Update progress for a module
function updateProgress(moduleId, points) {
    console.log(`Updating progress for module ${moduleId} with ${points} points`);
    totalScore += points;
    completedModules += 1;
    updateProgressDisplay();
    showAchievement(`आपने "${moduleId}" मॉड्यूल पूरा किया और ${points} अंक अर्जित किए!`);
}

// Update the progress display
function updateProgressDisplay() {
    const progressBar = document.getElementById('progressBar');
    const modulesDisplay = document.getElementById('modulesComplete');
    const scoreDisplay = document.getElementById('totalScore');
    
    if (progressBar) {
        const totalModules = 6; // Total number of modules
        const progress = Math.min(Math.round((completedModules / totalModules) * 100), 100);
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }
    
    if (modulesDisplay) {
        modulesDisplay.textContent = completedModules;
    }
    
    if (scoreDisplay) {
        scoreDisplay.textContent = totalScore;
    }
}

// Show achievement popup
function showAchievement(message) {
    const popup = document.getElementById('achievementPopup');
    const desc = document.getElementById('achievementDesc');
    
    if (popup && desc) {
        desc.textContent = message;
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 5000);
    }
}

// Start timer
function startTimer() {
    setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        
        const timeDisplay = document.getElementById('timeSpent');
        if (timeDisplay) {
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

// Functions for reading aloud
function toggleReadAloud() {
    trackUserInteraction(); // Enable speech synthesis when user interacts with audio controls
    if (!window.narrator) return;
    
    if (window.narrator.speaking) {
        stopNarration();
    } else {
        // Find the current visible story part
        const activePart = document.querySelector('.story-part.active');
        if (activePart) {
            const partNumber = parseInt(activePart.id.replace('storyPart', ''));
            if (!isNaN(partNumber)) {
                readStoryPartAloud(partNumber, true);
            }
        }
    }
}

// Activities functions
function playListeningActivity() {
    alert('ऑडियो फ़ाइल उपलब्ध नहीं है। यह एक डेमो है।');
    
    // In a real implementation, this would play an audio file
    // For now, we'll just enable the notes section
    document.querySelector('.listening-notes').style.display = 'block';
}

function saveListeningNotes() {
    const notes = document.getElementById('listeningNotes').value.trim();
    const narrative = document.getElementById('narrativeAccount').value.trim();
    
    if (notes.length < 10 || narrative.length < 20) {
        alert('कृपया अपने नोट्स और कथात्मक विवरण में अधिक जानकारी दें।');
        return;
    }
    
    alert('आपके नोट्स और कथात्मक विवरण सहेज लिए गए हैं!');
    updateProgress('activities', 10);
}

function recordSpeaking() {
    alert('ऑडियो रिकॉर्डिंग उपलब्ध नहीं है। यह एक डेमो है।');
    
    // In a real implementation, this would record audio
    // For now, we'll just simulate success
    setTimeout(() => {
        alert('आपकी प्रतिक्रिया रिकॉर्ड कर ली गई है!');
        updateProgress('activities', 10);
    }, 1000);
}

function openWritingPad() {
    document.querySelector('.writing-pad').style.display = 'block';
}

function saveWriting() {
    const writingContent = document.getElementById('writingPad').value.trim();
    
    if (writingContent.length < 50) {
        alert('कृपया अधिक विस्तृत लेख लिखें (कम से कम 50 अक्षर)।');
        return;
    }
    
    alert('आपका लेख सहेज लिया गया है!');
    updateProgress('activities', 15);
}

function showResource(resourceId) {
    alert('संसाधन फ़ाइल उपलब्ध नहीं है। यह एक डेमो है।');
}

// Start module narration automatically
function startModuleNarration(moduleId) {
    if (!window.narrator || !window.narrator.enabled || globalNarrationState.disabledByUser) {
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
                    let introContent = "कर चले हम फ़िदा में आपका स्वागत है। ";
                    
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
                    window.narrator.speak("कर चले हम फ़िदा में आपका स्वागत है। यह पाठ कैफ़ी आज़मी की कविता पर आधारित है जिसमें देशभक्ति और बलिदान की भावना व्यक्त की गई है।");
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
                    window.narrator.speak("पाठ प्रवेश खंड में आपका स्वागत है।");
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
                window.narrator.speak("भाषा अध्ययन खंड में आपका स्वागत है। यहां आप शब्दों और उनके अर्थों का अध्ययन करेंगे।");
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
