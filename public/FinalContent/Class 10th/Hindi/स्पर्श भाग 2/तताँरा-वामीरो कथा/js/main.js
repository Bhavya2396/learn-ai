/**
 * Main JavaScript for Tatara-Vamiro interactive Hindi lesson
 */

// Global Variables
let progress = 0;
let score = 0;
let modulesCompleted = [];
let currentModule = 'intro';

// Debug flag to enable verbose logging
const DEBUG_NARRATION = true;

// Global narration state management
let globalNarrationState = {
    isEnabled: false,
    disabledByUser: false,
    currentModule: null,
    currentPart: null
};
let audioEnabled = true;
let narrator = null;
let timeStarted = Date.now();
let userInteracted = false;

// Initialize on load
window.addEventListener('load', () => {
    // Make globalNarrationState available to other modules
    window.globalNarrationState = globalNarrationState;
    
    // Add debug helper function to window for console debugging
    if (DEBUG_NARRATION) {
        window.debugNarration = function() {
            console.log('=== NARRATION DEBUG STATE ===');
            console.log('Current module:', currentModule);
            console.log('Story module active:', typeof isStoryModuleActive !== 'undefined' ? isStoryModuleActive : 'undefined');
            console.log('Global narration state:', JSON.stringify(window.globalNarrationState));
            
            if (window.speechSynthesis) {
                console.log('Speech synthesis state:', {
                    speaking: window.speechSynthesis.speaking,
                    pending: window.speechSynthesis.pending,
                    paused: window.speechSynthesis.paused
                });
            }
            
            if (window.narrator) {
                console.log('Narrator state:', {
                    enabled: window.narrator.enabled,
                    currentUtterance: window.narrator.currentUtterance ? 'exists' : 'none',
                    onEndCallback: window.narrator.onEndCallback ? 'exists' : 'none',
                    voice: window.narrator.voice ? window.narrator.voice.name : 'none'
                });
            }
            
            console.log('Pending timeouts:', {
                pendingNarrationTimeout: window.pendingNarrationTimeout || 'none',
                readingTimeout: window.readingTimeout || 'none',
                highlightTimeouts: window.highlightTimeouts ? window.highlightTimeouts.length : 'none'
            });
            
            console.log('=== END DEBUG STATE ===');
        };
        
        // Log initial state
        setTimeout(window.debugNarration, 1000);
    }
    
    initializeNarrator();
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // Add global user interaction tracking
    document.addEventListener('click', trackUserInteraction, { once: true });
    document.addEventListener('keydown', trackUserInteraction, { once: true });
    document.addEventListener('touchstart', trackUserInteraction, { once: true });
});

// Initialize Narrator
function initializeNarrator() {
    if ('speechSynthesis' in window) {
        // Initialize the narrator
        narrator = {
            synth: window.speechSynthesis,
            enabled: true,
            voice: null,
            isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            currentUtterance: null,
            onEndCallback: null,
            
            speak: function(text) {
                console.log('=== NARRATOR DEBUG === speak method called with text length:', text ? text.length : 0);
                
                if (!this.enabled) {
                    console.log('=== NARRATOR DEBUG === Narrator is disabled, not speaking');
                    return;
                }
                
                // Ensure narrator is properly initialized
                if (!this.synth) {
                    console.error('=== NARRATOR ERROR === Speech synthesis not available');
                    return;
                }
                
                // Check if user has interacted (required for autoplay policy)
                if (!userInteracted) {
                    console.log('=== NARRATOR DEBUG === Speech synthesis blocked - waiting for user interaction');
                    console.log('=== NARRATOR DEBUG === userInteracted flag is:', userInteracted);
                    this.showFallbackMessage(text);
                    return;
                }
                
                console.log('=== NARRATOR DEBUG === User interaction verified, proceeding with speech');
                
                // Cancel any ongoing speech
                console.log('=== NARRATOR DEBUG === Canceling any ongoing speech');
                this.synth.cancel();
                
                // Pre-process text for better narration quality
                console.log('=== NARRATOR DEBUG === Pre-processing text');
                const processedText = this.preprocessText(text);
                
                // Create new utterance
                console.log('=== NARRATOR DEBUG === Creating new utterance');
                const utterance = new SpeechSynthesisUtterance(processedText);
                
                // Add event handlers for debugging
                utterance.onstart = () => console.log('=== NARRATOR DEBUG === Utterance started');
                utterance.onend = () => console.log('=== NARRATOR DEBUG === Utterance ended');
                
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
                
                // Store current utterance for tracking
                this.currentUtterance = utterance;
                
                // Register end callback if provided
                if (this.onEndCallback) {
                    utterance.onend = () => {
                        console.log('=== NARRATOR DEBUG === Utterance ended, executing callback');
                        if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                            try {
                                this.onEndCallback();
                            } catch (e) {
                                console.error('Error in onEndCallback:', e);
                            }
                            // Clear callback after execution
                            this.onEndCallback = null;
                        }
                    };
                }
                
                // Handle errors
                utterance.onerror = (event) => {
                    console.error('=== NARRATOR ERROR === Speech synthesis error:', event);
                    
                    // Execute callback on error to ensure proper cleanup
                    if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                        try {
                            this.onEndCallback();
                        } catch (e) {
                            console.error('Error in onEndCallback (error handler):', e);
                        }
                        // Clear callback after execution
                        this.onEndCallback = null;
                    }
                };
                
                // Use special handling for Safari/iOS
                if (this.isSafari || this.isIOS) {
                    console.log('=== NARRATOR DEBUG === Using Safari/iOS specific speech handling');
                    this.speakForSafari(utterance, processedText);
                } else {
                    // Speak the text
                    try {
                        console.log('=== NARRATOR DEBUG === Starting speech synthesis');
                        this.synth.speak(utterance);
                        
                        // Check if speech actually started (Chrome sometimes fails silently)
                        setTimeout(() => {
                            console.log('=== NARRATOR DEBUG === Checking if speech started:',
                                'speaking:', this.synth.speaking,
                                'pending:', this.synth.pending,
                                'paused:', this.synth.paused);
                                
                            if (!this.synth.speaking && !this.synth.pending) {
                                console.log('=== NARRATOR DEBUG === Speech did not start, trying alternative approach');
                                // Try an alternative approach
                                const newUtterance = new SpeechSynthesisUtterance(processedText.substring(0, 100) + '...');
                                if (this.voice) newUtterance.voice = this.voice;
                                this.synth.speak(newUtterance);
                            }
                        }, 500);
                    } catch (e) {
                        console.error('=== NARRATOR ERROR === Error in synth.speak:', e);
                    }
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
                console.log('=== NARRATOR DEBUG === Stopping all speech synthesis');
                
                if (DEBUG_NARRATION) {
                    console.log(`[NARRATION DEBUG] narrator.stop() called`);
                    console.log(`[NARRATION DEBUG] Current utterance exists: ${!!this.currentUtterance}`);
                    console.log(`[NARRATION DEBUG] onEndCallback exists: ${!!this.onEndCallback}`);
                }
                
                // Cancel any ongoing speech synthesis
                if (this.synth) {
                    try {
                        if (DEBUG_NARRATION) {
                            console.log(`[NARRATION DEBUG] Speech synthesis state before cancel in narrator.stop():`, {
                                speaking: this.synth.speaking,
                                pending: this.synth.pending,
                                paused: this.synth.paused
                            });
                        }
                        
                        this.synth.cancel();
                        console.log('Speech synthesis canceled successfully');
                        
                        if (DEBUG_NARRATION) {
                            console.log(`[NARRATION DEBUG] Speech synthesis state after cancel in narrator.stop():`, {
                                speaking: this.synth.speaking,
                                pending: this.synth.pending,
                                paused: this.synth.paused
                            });
                        }
                    } catch (e) {
                        console.error('Error canceling speech synthesis:', e);
                    }
                }
                
                // Clear current utterance reference
                this.currentUtterance = null;
                
                // Clear any callbacks
                if (this.onEndCallback) {
                    const callback = this.onEndCallback;
                    this.onEndCallback = null;
                    
                    if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Preparing to execute onEndCallback with delay`);
                    
                    // Execute the callback to ensure proper cleanup
                    setTimeout(() => {
                        if (typeof callback === 'function') {
                            try {
                                if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Executing onEndCallback now`);
                                callback();
                                console.log('onEndCallback executed successfully');
                            } catch (e) {
                                console.error('Error executing onEndCallback:', e);
                            }
                        } else {
                            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] onEndCallback is not a function, skipping execution`);
                        }
                    }, 100);
                }
                
                console.log('Speech synthesis stopped successfully');
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
                        <h4>🔊 वाचक कहते हैं:</h4>
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

// Module Navigation
function showModule(moduleId) {
    console.log(`Showing module: ${moduleId}`);
    
    if (DEBUG_NARRATION) {
        console.log(`[NARRATION DEBUG] showModule('${moduleId}') called`);
        console.log(`[NARRATION DEBUG] Previous module: ${currentModule}`);
    }
    
    // Important: First check if we're switching away from story module
    if (currentModule === 'story' && moduleId !== 'story') {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Switching away from story module, resetting state FIRST`);
        resetStoryModuleState();
    }
    
    // Reset story module state if switching to a different module
    if (moduleId !== 'story') {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Not switching to story module`);
    } else {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Switching to story module`);
    }
    
    // Always stop any ongoing narration when switching modules, regardless of currentUtterance status
    if (window.narrator) {
        console.log('Stopping any ongoing narration due to module switch');
        
        if (DEBUG_NARRATION) {
            console.log(`[NARRATION DEBUG] Narrator state before stopping:`, {
                enabled: window.narrator.enabled,
                currentUtterance: window.narrator.currentUtterance ? 'exists' : 'none',
                onEndCallback: window.narrator.onEndCallback ? 'exists' : 'none'
            });
        }
        
        // First cancel speech synthesis directly
        if (window.speechSynthesis) {
            if (DEBUG_NARRATION) {
                console.log(`[NARRATION DEBUG] Speech synthesis state before cancel:`, {
                    speaking: window.speechSynthesis.speaking,
                    pending: window.speechSynthesis.pending,
                    paused: window.speechSynthesis.paused
                });
            }
            
            console.log('Canceling speech synthesis directly');
            window.speechSynthesis.cancel();
            
            if (DEBUG_NARRATION) {
                console.log(`[NARRATION DEBUG] Speech synthesis state after cancel:`, {
                    speaking: window.speechSynthesis.speaking,
                    pending: window.speechSynthesis.pending,
                    paused: window.speechSynthesis.paused
                });
            }
        }
        
        // Then use the narrator's stop method for proper cleanup
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Calling narrator.stop() in showModule`);
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
            window.readingTimeout = null;
        }
        
        if (window.highlightTimeouts && typeof clearTimeout === 'function') {
            window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
            window.highlightTimeouts = [];
        }
        
        // Reset global narration state
        if (window.globalNarrationState) {
            window.globalNarrationState.currentModule = null;
            window.globalNarrationState.currentPart = null;
        }
    }
    
    // Ensure we don't start new narration too quickly
    if (window.pendingNarrationTimeout) {
        clearTimeout(window.pendingNarrationTimeout);
        window.pendingNarrationTimeout = null;
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
            if (typeof window.showStoryPart === 'function') {
                // Set story module as active before showing part
                if (typeof isStoryModuleActive !== 'undefined') {
                    if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Setting isStoryModuleActive to true in showModule`);
                    isStoryModuleActive = true;
                    
                    // Log state change
                    if (DEBUG_NARRATION && typeof window.debugNarration === 'function') {
                        setTimeout(window.debugNarration, 10);
                    }
                }
                window.showStoryPart(1);
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
    
    // Automatically start narrating the new module content with sufficient delay to ensure cleanup is complete
    if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Setting up pending narration timeout for module ${moduleId}`);
    
    window.pendingNarrationTimeout = setTimeout(() => {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Pending narration timeout fired for module ${moduleId}`);
        console.log(`Starting narration for module: ${moduleId}`);
        
        // Check if module is still the same (user hasn't switched again during timeout)
        if (currentModule !== moduleId) {
            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Module changed during timeout from ${moduleId} to ${currentModule}, aborting narration`);
            return;
        }
        
        // Update global narration state
        if (!window.globalNarrationState) {
            window.globalNarrationState = {
                isEnabled: true,
                disabledByUser: false,
                currentModule: moduleId,
                currentPart: null
            };
            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Created new globalNarrationState:`, JSON.stringify(window.globalNarrationState));
        } else {
            window.globalNarrationState.currentModule = moduleId;
            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Updated globalNarrationState.currentModule to ${moduleId}`);
        }
        
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Calling startModuleNarration('${moduleId}')`);
        startModuleNarration(moduleId);
    }, 800); // Longer delay to ensure previous narration is fully stopped
    
    if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Pending narration timeout set with ID: ${window.pendingNarrationTimeout}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Start module narration automatically
function startModuleNarration(moduleId) {
    if (DEBUG_NARRATION) {
        console.log(`[NARRATION DEBUG] startModuleNarration('${moduleId}') called`);
        console.log(`[NARRATION DEBUG] Current module: ${currentModule}`);
        console.log(`[NARRATION DEBUG] Narrator state:`, {
            available: !!window.narrator,
            enabled: window.narrator ? window.narrator.enabled : false
        });
    }
    
    if (!window.narrator || !window.narrator.enabled) {
        console.log('Narrator not available or disabled');
        return;
    }
    
    // Double-check that we're still in the right module
    if (currentModule !== moduleId) {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Module changed from ${moduleId} to ${currentModule}, aborting narration`);
        return;
    }
    
    switch(moduleId) {
        case 'intro':
            if (window.narrator) {
                // Get the intro content
                const introModule = document.getElementById('intro');
                if (introModule) {
                    const contentBlocks = introModule.querySelectorAll('.content-block');
                    let introContent = "लेखक परिचय: लीलाधर मंडलोई। ";
                    
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
                    window.narrator.speak("लीलाधर मंडलोई की कहानी तताँरा-वामीरो कथा में आपका स्वागत है।");
                }
            }
            break;
            
        case 'prereading':
            if (window.narrator) {
                // Get the prereading content
                const prereadingModule = document.getElementById('prereading');
                if (prereadingModule) {
                    const contentBlocks = prereadingModule.querySelectorAll('.content-block');
                    let prereadingContent = "पाठ प्रवेश। ";
                    
                    // Extract text from content blocks
                    contentBlocks.forEach(block => {
                        const paragraphs = block.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            prereadingContent += p.textContent + " ";
                        });
                    });
                    
                    // Speak the full prereading content
                    window.narrator.speak(prereadingContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("पाठ प्रवेश। अंदमान निकोबार द्वीपसमूह की लोककथा।");
                }
            }
            break;
            
        case 'story':
            // Story module handles its own narration through the showStoryPart function
            break;
            
        case 'thinking-text':
            if (window.narrator) {
                // Get the thinking-text content
                const thinkingTextModule = document.getElementById('thinking-text');
                if (thinkingTextModule) {
                    const contentBlocks = thinkingTextModule.querySelectorAll('.section-title');
                    let thinkingTextContent = "प्रश्न अभ्यास। ";
                    
                    // Extract text from section titles
                    contentBlocks.forEach(block => {
                        thinkingTextContent += block.textContent + " ";
                    });
                    
                    // Speak the full thinking-text content
                    window.narrator.speak(thinkingTextContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("प्रश्न अभ्यास। इस खंड में आप कहानी से जुड़े प्रश्नों का अभ्यास करेंगे।");
                }
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                // Get the thinking-language content
                const thinkingLanguageModule = document.getElementById('thinking-language');
                if (thinkingLanguageModule) {
                    const contentBlocks = thinkingLanguageModule.querySelectorAll('.section-title');
                    let thinkingLanguageContent = "भाषा अध्ययन। ";
                    
                    // Extract text from section titles
                    contentBlocks.forEach(block => {
                        thinkingLanguageContent += block.textContent + " ";
                    });
                    
                    // Speak the full thinking-language content
                    window.narrator.speak(thinkingLanguageContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("भाषा अध्ययन। इस खंड में आप कहानी की भाषा का अध्ययन करेंगे।");
                }
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                // Get the activities content
                const activitiesModule = document.getElementById('activities');
                if (activitiesModule) {
                    const contentBlocks = activitiesModule.querySelectorAll('.section-title');
                    let activitiesContent = "गतिविधियां। ";
                    
                    // Extract text from section titles
                    contentBlocks.forEach(block => {
                        activitiesContent += block.textContent + " ";
                    });
                    
                    // Speak the full activities content
                    window.narrator.speak(activitiesContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("गतिविधियां। इस खंड में आप विभिन्न गतिविधियों का अभ्यास करेंगे।");
                }
            }
            break;
    }
}

// Track user interaction for speech synthesis
function trackUserInteraction() {
    if (!userInteracted) {
        console.log('User interaction detected, enabling speech synthesis');
        userInteracted = true;
        return true;
    }
    return false;
}

// Toggle audio narration
function toggleAudio() {
    if (window.narrator) {
        audioEnabled = window.narrator.toggle();
        const audioBtn = document.getElementById('audioToggle');
        if (audioBtn) {
            audioBtn.innerHTML = audioEnabled ? '🔊' : '🔇';
            audioBtn.setAttribute('aria-label', audioEnabled ? 'आवाज़ बंद करें' : 'आवाज़ चालू करें');
            audioBtn.setAttribute('title', audioEnabled ? 'आवाज़ बंद करें' : 'आवाज़ चालू करें');
        }
        
        // Show feedback message
        const feedbackMsg = document.createElement('div');
        feedbackMsg.className = 'feedback-message';
        feedbackMsg.textContent = audioEnabled ? 'आवाज़ चालू की गई।' : 'आवाज़ बंद की गई।';
        feedbackMsg.classList.add(audioEnabled ? 'success' : 'warning');
        feedbackMsg.classList.add('show');
        document.body.appendChild(feedbackMsg);
        
        // Auto-remove after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

// Update progress bar
function updateProgress() {
    // Calculate progress as percentage of completed modules
    const totalModules = document.querySelectorAll('.nav-item').length;
    const completedModules = modulesCompleted.length;
    progress = Math.min(Math.round((completedModules / totalModules) * 100), 100);
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }
    
    // Update progress text
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = `${progress}%`;
    }
    
    return progress;
}

// Show achievement notification
function showAchievement(message) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement';
    achievement.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-message">${message}</div>
    `;
    document.body.appendChild(achievement);
    
    // Animate in
    setTimeout(() => {
        achievement.classList.add('show');
    }, 100);
    
    // Auto-remove after a few seconds
    setTimeout(() => {
        achievement.classList.remove('show');
        setTimeout(() => achievement.remove(), 500);
    }, 5000);
}

// Get a friendly name for a module
function getModuleName(moduleId) {
    switch (moduleId) {
        case 'intro': return 'लेखक परिचय';
        case 'prereading': return 'पाठ प्रवेश';
        case 'story': return 'कहानी';
        case 'thinking-text': return 'प्रश्न अभ्यास';
        case 'thinking-language': return 'भाषा अध्ययन';
        case 'activities': return 'गतिविधियां';
        default: return moduleId;
    }
}

// Reset story module active state when switching modules
function resetStoryModuleState() {
    if (typeof isStoryModuleActive !== 'undefined') {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Resetting story module active state from ${isStoryModuleActive} to false`);
        console.log('Resetting story module active state');
        
        // This is critical - set to false BEFORE stopping narration to prevent auto-restart
        isStoryModuleActive = false;
        
        // Force immediate speech synthesis cancellation
        if (window.speechSynthesis) {
            if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] Force canceling speech synthesis in resetStoryModuleState`);
            window.speechSynthesis.cancel();
        }
    } else {
        if (DEBUG_NARRATION) console.log(`[NARRATION DEBUG] isStoryModuleActive is undefined, cannot reset`);
    }
}