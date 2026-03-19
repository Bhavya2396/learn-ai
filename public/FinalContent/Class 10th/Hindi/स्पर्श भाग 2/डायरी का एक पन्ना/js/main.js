/**
 * Main JavaScript for Diary Ka Ek Panna interactive Hindi lesson
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
                        console.log('Speech synthesis not allowed');
                        userInteracted = false; // Reset interaction flag
                    } else if (event.error === 'interrupted') {
                        console.log('Speech synthesis was interrupted - this is normal when switching content');
                        // Interruptions are expected when switching content
                    } else {
                        console.log('Speech synthesis error');
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
                // Cancel all speech synthesis
                this.synth.cancel();
                
                // Clear current utterance reference
                this.currentUtterance = null;
                
                // Clear any callbacks
                if (this.onEndCallback) {
                    this.onEndCallback = null;
                }
                
                // Additional safety: Clear any pending timeouts
                if (window.readingTimeout && typeof clearTimeout === 'function') {
                    clearTimeout(window.readingTimeout);
                    window.readingTimeout = null;
                }
                
                if (window.highlightTimeouts && typeof clearTimeout === 'function') {
                    window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
                    window.highlightTimeouts = [];
                }
                
                console.log('Speech synthesis stopped completely');
            },
            
            toggle: function() {
                this.enabled = !this.enabled;
                if (!this.enabled) this.stop();
                return this.enabled;
            },
            
            // showFallbackMessage function removed
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

// Module Navigation
function showModule(moduleId) {
    console.log(`Showing module: ${moduleId}`);
    
    // CRITICAL: Stop any ongoing narration when switching modules
    if (window.narrator) {
        console.log('Stopping any ongoing narration due to module switch');
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
        
        // Additional safety: Clear any pending callbacks
        if (window.narrator.onEndCallback) {
            window.narrator.onEndCallback = null;
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
        case 'thinking-text':
            console.log('Initializing thinking-text module');
            break;
        case 'thinking-language':
            console.log('Initializing thinking-language module');
            break;
        case 'activities':
            console.log('Initializing activities module');
            break;
    }
    
    // Automatically start narrating the new module content
    setTimeout(() => {
        startModuleNarration(moduleId);
    }, 500); // Increased delay to ensure previous narration is completely stopped
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Start module narration automatically
function startModuleNarration(moduleId) {
    if (!window.narrator || !window.narrator.enabled) {
        console.log('Narrator not available or disabled');
        return;
    }
    
    // CRITICAL: Stop any ongoing narration first to prevent overlap
    console.log(`Starting narration for module: ${moduleId}`);
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping any ongoing narration before starting new module narration');
        window.narrator.stop();
        
        // Clear any reading indicators from previous modules
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
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
    
    switch(moduleId) {
        case 'intro':
            if (window.narrator) {
                // Get the intro content
                const introModule = document.getElementById('intro');
                if (introModule) {
                    const contentBlocks = introModule.querySelectorAll('.content-block');
                    let introContent = "डायरी का एक पन्ना में आपका स्वागत है। ";
                    
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
                    window.narrator.speak("डायरी का एक पन्ना में आपका स्वागत है। यह पाठ स्वतंत्रता आंदोलन के दौरान 26 जनवरी 1931 के दिन की घटनाओं का वर्णन करता है।");
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
                    window.narrator.speak("पाठ प्रवेश खंड में आपका स्वागत है। यहां हम 26 जनवरी 1931 के दिन की घटनाओं और स्वतंत्रता आंदोलन के बारे में जानेंगे।");
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
                window.narrator.speak("प्रश्न-अभ्यास खंड में आपका स्वागत है। यहां आप पाठ का विश्लेषण करके प्रश्नों के उत्तर देंगे।");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("भाषा अध्ययन खंड में आपका स्वागत है। यहां आप शब्दों और वाक्य संरचना का अध्ययन करेंगे।");
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                // Ensure we only speak the activities intro and nothing else
                console.log('Speaking activities module intro only - no story content should follow');
                window.narrator.speak("गतिविधि खंड में आपका स्वागत है। यहां आप विभिन्न क्रियाकलापों में भाग लेंगे।");
                
                // Additional safety: Clear any story-related timeouts or callbacks
                if (window.readingTimeout && typeof clearTimeout === 'function') {
                    clearTimeout(window.readingTimeout);
                    window.readingTimeout = null;
                }
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
        case 'story': return 'डायरी का पन्ना';
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
}

// Track user interaction for speech synthesis
function trackUserInteraction() {
    if (!userInteracted) {
        userInteracted = true;
        console.log('User interaction detected - speech synthesis enabled');
    }
    return userInteracted;
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
            let prereadingContent = "डायरी का एक पन्ना में आपका स्वागत है। आइए पाठ प्रवेश से शुरू करते हैं और 26 जनवरी 1931 के दिन की घटनाओं के बारे में जानते हैं। ";
            
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
            narrator.speak("डायरी का एक पन्ना में आपका स्वागत है। आइए पाठ प्रवेश से शुरू करते हैं और 26 जनवरी 1931 के दिन की घटनाओं के बारे में जानते हैं।");
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

// Save reflection
function saveReflection() {
    console.log("saveReflection function called");  // Debug log
    const selectedOption = document.querySelector('input[name="reflection"]:checked');
    const feedbackEl = document.getElementById('reflectionFeedback');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया कोई एक विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    const selectedValue = selectedOption.value;
    
    // Remove highlighting from all options first
    document.querySelectorAll('.reflection-option').forEach(option => {
        option.classList.remove('selected-option', 'best-option', 'good-option');
    });
    
    // Get the selected option's container div
    const selectedOptionDiv = selectedOption.closest('.reflection-option');
    
    // Check if the answer is the best or just acceptable
    let isBestAnswer = false;
    let isAcceptableAnswer = false;
    
    if (typeof reflectionAnswers !== 'undefined') {
        isBestAnswer = selectedValue === reflectionAnswers.best;
        isAcceptableAnswer = reflectionAnswers.acceptable.includes(selectedValue);
    }
    
    // Apply highlighting to show correctness
    if (isBestAnswer) {
        // Best answer gets green highlight and checkmark
        selectedOptionDiv.classList.add('selected-option', 'best-option');
    } else if (isAcceptableAnswer) {
        // Good but not best answer gets blue highlight
        selectedOptionDiv.classList.add('selected-option', 'good-option');
    } else {
        // Any other answer just gets selected
        selectedOptionDiv.classList.add('selected-option');
    }
    
    // Display appropriate feedback based on the selected option
    if (typeof answerFeedback !== 'undefined' && answerFeedback.reflection && answerFeedback.reflection[selectedValue]) {
        feedbackEl.textContent = answerFeedback.reflection[selectedValue];
        feedbackEl.className = 'feedback-message show';
        
        // Add appropriate success class
        if (isBestAnswer) {
            feedbackEl.classList.add('success');
        } else if (isAcceptableAnswer) {
            feedbackEl.classList.add('partial-success');
        } else {
            feedbackEl.classList.add('error'); // If there are any wrong answers
        }
    } else {
        // Fallback if no feedback is defined
        feedbackEl.textContent = 'आपका चिंतन सहेज लिया गया है!';
        feedbackEl.className = 'feedback-message show success';
    }
    
    // Update progress only if answer is acceptable or best
    if (isBestAnswer || isAcceptableAnswer) {
        score += 15;
        document.getElementById('totalScore').textContent = score;
        
        if (!modulesCompleted.includes('prereading')) {
            modulesCompleted.push('prereading');
            updateProgress();
            showAchievement('चिंतन पूर्ण!');
        }
    }
    
    if (narrator) {
        narrator.speak("अपना चिंतन साझा करने के लिए धन्यवाद। " + feedbackEl.textContent);
    }
}


// Save writing
function saveWriting() {
    const selectedOption = document.querySelector('input[name="writing-option"]:checked');
    
    if (!selectedOption) {
        alert('कृपया कोई एक विकल्प चुनें।');
        return;
    }
    
    // Save the selected writing option (in a real app, this would be sent to a server)
    alert('आपका चुना हुआ विकल्प सहेज लिया गया है!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("उत्कृष्ट कार्य! आपका चयन सहेज लिया गया है।");
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


// Show resource
function showResource(resourceId) {
    // In a real app, this would show or load a specific resource
    alert(`वास्तविक कार्यान्वयन में, यह संसाधन दिखाएगा: ${resourceId}`);
    
    if (narrator) {
        switch(resourceId) {
            case 'seksaria-life':
                narrator.speak("सीताराम सेकसरिया का जन्म 1892 में राजस्थान के नवलगढ़ में हुआ था। उनका अधिकांश जीवन कलकत्ता में बीता। वे व्यापार-व्यवसाय से जुड़े थे।");
                break;
            case 'independence-photos':
                narrator.speak("ये चित्र स्वतंत्रता आंदोलन के दौरान की घटनाओं को दर्शाते हैं। इनमें 26 जनवरी 1931 के दिन की घटनाएं भी शामिल हैं।");
                break;
            case 'project-template':
                narrator.speak("यह टेम्पलेट स्वतंत्रता आंदोलन और 26 जनवरी 1931 के दिन की घटनाओं पर आपके प्रोजेक्ट के लिए एक संरचना प्रदान करता है।");
                break;
        }
    }
}
