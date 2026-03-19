/**
 * Main JavaScript for The Proposal interactive lesson
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
                // Replace abbreviations and symbols for better pronunciation
                let processed = text
                    .replace(/Mr\./g, "Mister ")
                    .replace(/Mrs\./g, "Missus ")
                    .replace(/Dr\./g, "Doctor ")
                    .replace(/St\./g, "Saint ")
                    .replace(/No\./g, "Number ")
                    .replace(/etc\./g, "etcetera ")
                    .replace(/\be\.g\./g, "for example ")
                    .replace(/\bi\.e\./g, "that is ")
                    .replace(/\&/g, " and ")
                    .replace(/\$/g, " dollars ")
                    .replace(/\%/g, " percent ");
                
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
                
                // Different voice selection strategy based on browser
                if (this.isSafari || this.isIOS) {
                    this.selectSafariVoice(voices);
                } else {
                    this.selectStandardVoice(voices);
                }
            },
            
            // Voice selection optimized for Safari/iOS
            selectSafariVoice: function(voices) {
                // Safari has good built-in voices
                let preferredVoice = voices.find(voice => 
                    voice.name.includes('Samantha') || // High quality US female voice on iOS
                    voice.name.includes('Moira') ||    // High quality Irish female voice on iOS
                    voice.name.includes('Tessa')       // High quality UK female voice on iOS
                );
                
                // Fallback to any English voice
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => voice.lang.startsWith('en'));
                }
                
                if (preferredVoice) {
                    this.voice = preferredVoice;
                    console.log('Selected Safari voice:', preferredVoice.name);
                }
            },
            
            // Voice selection for Chrome/Firefox/Edge
            selectStandardVoice: function(voices) {
                // Try to find a high-quality British female voice
                let preferredVoice = voices.find(voice => 
                    voice.name.includes('UK English Female') || 
                    voice.name.includes('Google UK English Female')
                );
                
                // Fallback to any British voice
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => voice.lang === 'en-GB');
                }
                
                // Fallback to any English female voice
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => 
                        voice.lang.startsWith('en') && 
                        (voice.name.includes('Female') || voice.name.includes('female'))
                    );
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
                    .replace(/:\s/g, ':  ');
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
                        <h4>🔊 Narrator says:</h4>
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
        showAchievement(`Module Completed: ${getModuleName(moduleId)}`);
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
                    let introContent = "Welcome to 'The Proposal'. ";
                    
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
                    window.narrator.speak("Welcome to the interactive English lesson on 'The Proposal'. This lesson explores the themes of marriage, property disputes, and human nature through Anton Chekhov's one-act play.");
                }
            }
            break;
            
        case 'prereading':
            if (window.narrator) {
                // Get the prereading content
                const prereadingModule = document.getElementById('prereading');
                if (prereadingModule) {
                    const contentBlocks = prereadingModule.querySelectorAll('.content-block');
                    let prereadingContent = "Let's Begin. ";
                    
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
                        prereadingContent += activityTitle.textContent + ". ";
                    }
                    
                    // Speak the full prereading content
                    speakInSequence(prereadingContent);
                } else {
                    // Fallback if module not found
                    window.narrator.speak("Welcome to the Let's Begin section. Here we'll explore facial expressions and their role in communication, especially in plays.");
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
                window.narrator.speak("Welcome to the Reading Comprehension section. Here you'll analyze the texts about anger management and violence, and answer questions about them.");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Vocabulary and Grammar section. Here you'll explore vocabulary, reported speech, and sentence construction exercises.");
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Activities section. Here you'll practice listening, speaking, and writing skills related to the texts.");
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
        case 'intro': return 'Introduction';
        case 'prereading': return 'Let\'s Begin';
        case 'story': return 'The Play';
        case 'thinking-text': return 'Reading Comprehension';
        case 'thinking-language': return 'Vocabulary & Grammar';
        case 'activities': return 'Activities';
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
            let prereadingContent = "Welcome to the interactive English lesson on 'The Proposal'. Let's begin by exploring facial expressions and their role in communication. ";
            
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
            narrator.speak("Welcome to the interactive English lesson on 'The Proposal'. Let's begin by exploring facial expressions and their role in communication.");
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
    btn.setAttribute('aria-label', audioEnabled ? 'Mute audio narration' : 'Enable audio narration');
}

// Toggle Print Mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');
    
    if (document.body.classList.contains('print-mode')) {
        if (narrator) {
            narrator.speak("Print mode enabled. The page is now optimized for printing.");
        }
    } else {
        if (narrator) {
            narrator.speak("Print mode disabled.");
        }
    }
}

// Function to speak longer text in sequence by breaking it into sentences
function speakInSequence(text) {
    if (!window.narrator) return;
    
    // Break the text into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
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
        narrator.speak("Vocabulary words have been highlighted. Hover over them to see their meanings.");
    }
}

// Check facial expressions
function checkFacialExpressions() {
    const inputs = document.querySelectorAll('.expression-input');
    let correctCount = 0;
    let totalCount = inputs.length;
    
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correctCount++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('expressionFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('prereading', 15);
        }
    }
    
    if (narrator) {
        narrator.speak(`You got ${correctCount} out of ${totalCount} facial expressions correct!`);
    }
}

// Check vocabulary answers
function checkVocabulary() {
    const inputs = document.querySelectorAll('.vocab-input');
    let correctCount = 0;
    let totalCount = inputs.length;
    
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correctCount++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('vocabFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
    
    if (narrator) {
        narrator.speak(`You got ${correctCount} out of ${totalCount} vocabulary answers correct!`);
    }
}

// Check reported speech answers
function checkReportedSpeech() {
    const selects = document.querySelectorAll('.speech-select');
    const inputs = document.querySelectorAll('.speech-input');
    let correctCount = 0;
    let totalCount = selects.length + inputs.length;
    
    selects.forEach(select => {
        const correctAnswer = select.getAttribute('data-answer').toLowerCase();
        const userAnswer = select.value.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            select.style.borderColor = '#4caf50';
            select.style.backgroundColor = '#e8f5e9';
            correctCount++;
        } else {
            select.style.borderColor = '#f44336';
            select.style.backgroundColor = '#ffebee';
        }
    });
    
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correctCount++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('speechFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
    
    if (narrator) {
        narrator.speak(`You got ${correctCount} out of ${totalCount} reported speech answers correct!`);
    }
}

// Check jumbled sentences
function checkJumbledSentences() {
    const textareas = document.querySelectorAll('.jumbled-textarea');
    let correctCount = 0;
    let totalCount = textareas.length;
    
    textareas.forEach(textarea => {
        const correctAnswer = textarea.getAttribute('data-answer').toLowerCase();
        const userAnswer = textarea.value.trim().toLowerCase();
        
        if (userAnswer === correctAnswer) {
            textarea.style.borderColor = '#4caf50';
            textarea.style.backgroundColor = '#e8f5e9';
            correctCount++;
        } else {
            textarea.style.borderColor = '#f44336';
            textarea.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('jumbledFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        if (correctCount === totalCount && typeof updateProgress === 'function') {
            updateProgress('thinking-language', 10);
        }
    }
    
    if (narrator) {
        narrator.speak(`You got ${correctCount} out of ${totalCount} jumbled sentences correct!`);
    }
}

// Save listening notes
function saveListeningNotes() {
    const answers = [
        document.getElementById('listeningAnswer1'),
        document.getElementById('listeningAnswer2'),
        document.getElementById('listeningAnswer3'),
        document.getElementById('listeningAnswer4'),
        document.getElementById('listeningAnswer5')
    ];
    
    let allAnswered = true;
    answers.forEach(answer => {
        if (!answer || answer.value.trim().length < 5) {
            allAnswered = false;
        }
    });
    
    if (!allAnswered) {
        alert('Please provide more detailed answers for all questions.');
        return;
    }
    
    // Save the answers (in a real app, this would be sent to a server)
    alert('Your listening activity answers have been saved!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('Listening Activity Completed!');
    }
    
    if (narrator) {
        narrator.speak("Great job! Your listening activity answers have been saved.");
    }
}

// Save writing
function saveWriting() {
    const writing = document.getElementById('writingPad').value.trim();
    
    if (writing.length < 100) {
        alert('Please write a more detailed response (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your writing has been saved!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("Excellent work! Your writing has been saved.");
    }
}

// Record speaking response
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('In a real implementation, this would record your spoken response using the Web Audio API.');
    
    // Update progress
    score += 10;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("Think about the topics discussed in the role play dialogue. Share your thoughts about violence on television and its impact on children.");
    }
}

// Play listening activity
function playListeningActivity() {
    // In a real app, this would play an audio file
    alert('In a real implementation, this would play the audio about Vanka by Anton Chekhov.');
    
    if (narrator) {
        narrator.speak("Vanka is a story by Anton Chekhov about a nine-year-old boy who works as an assistant to a shoemaker. On Christmas Eve, he writes a letter to his grandfather, describing his difficult life and asking to be taken away from his current situation.");
    }
}

// Open writing pad
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        
        // Scroll to the writing pad
        writingPad.scrollIntoView({ behavior: 'smooth' });
        
        // Provide instructions via narrator
        if (narrator) {
            narrator.speak("Please write your response in the text area below. Consider the different types of letters and communication methods discussed in the lesson.");
        }
    } else {
        console.error('Writing pad element not found');
    }
}
