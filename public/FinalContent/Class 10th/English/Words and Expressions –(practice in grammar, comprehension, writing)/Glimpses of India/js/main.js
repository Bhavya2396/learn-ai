/**
 * Main JavaScript for Glimpses of India interactive lesson
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
                    let introContent = "Welcome to 'Glimpses of India'. ";
                    
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
                    window.narrator.speak("Welcome to the interactive English lesson on 'Glimpses of India'. This lesson explores the rich cultural diversity of India, including its cuisine, traditions, and places.");
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
                    window.narrator.speak("Welcome to the Let's Begin section. Here we'll explore the rich diversity of Indian states, their cuisine, culture, art forms and traditions.");
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
                window.narrator.speak("Welcome to the Reading Comprehension section. Here you'll analyze the text excerpts and answer questions about them.");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Vocabulary and Grammar section. Here you'll explore vocabulary, sounds, and grammar concepts from the texts.");
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Activities section. Here you'll practice listening, speaking, and writing skills related to the texts about India's diversity.");
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
        case 'story': return 'The Texts';
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
            let prereadingContent = "Welcome to the interactive English lesson on 'Glimpses of India'. Let's begin by exploring India's rich cultural diversity. ";
            
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
            narrator.speak("Welcome to the interactive English lesson on 'Glimpses of India'. Let's begin by exploring India's rich cultural diversity.");
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

// Save reflection
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    
    if (reflectionText.length < 20) {
        const feedbackEl = document.getElementById('reflectionFeedback');
        feedbackEl.textContent = 'Please write more detailed research notes (at least 20 characters).';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('reflectionFeedback');
    feedbackEl.textContent = 'Your research notes have been saved!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        updateProgress();
        showAchievement('Research Notes Completed!');
    }
    
    if (narrator) {
        narrator.speak("Thank you for your research. Your notes have been saved.");
    }
}

// Save listening notes
function saveListeningNotes() {
    const notes = document.getElementById('listeningNotes').value.trim();
    const narrative = document.getElementById('narrativeAccount').value.trim();
    
    if (notes.length < 20 || narrative.length < 50) {
        alert('Please write more detailed notes and summary.');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    alert('Your notes and summary have been saved!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('Listening Activity Completed!');
    }
    
    if (narrator) {
        narrator.speak("Great job! Your notes and summary have been saved.");
    }
}

// Save writing
function saveWriting() {
    const writing = document.getElementById('writingPad').value.trim();
    
    if (writing.length < 100) {
        alert('Please write a more detailed travel account (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your travel account has been saved!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (narrator) {
        narrator.speak("Excellent work! Your travel account has been saved.");
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
        narrator.speak("Prepare an itinerary of your excursion to Araku valley, including details about transport, accommodation, and activities.");
    }
}

// Play listening activity
function playListeningActivity() {
    // In a real app, this would play an audio file
    alert('In a real implementation, this would play the audio of the baker passage.');
    
    if (narrator) {
        narrator.speak("During our childhood in Goa, the baker used to be our friend, companion and guide. He used to come at least twice a day. Once, when he set out in the morning on his selling round, and then again, when he returned after emptying his huge basket. The jingling thud of his bamboo woke us up from sleep and we ran to meet and greet him. Why was it so? Was it for the love of the loaf? Not at all. The loaves were bought by some Paskine or Bastine, the maid-servant of the house! What we longed for were those bread-bangles which we chose carefully. Sometimes it was sweet bread of a special kind.");
    }
}

// Show resource
function showResource(resourceId) {
    // In a real app, this would show or load a specific resource
    alert(`In a real implementation, this would show the resource: ${resourceId}`);
    
    if (narrator) {
        switch(resourceId) {
            case 'railway-history':
                narrator.speak("The Indian Railways is one of the world's largest railway networks, with over 67,000 kilometers of track. It was established in 1853 with the first passenger train operating between Mumbai and Thane.");
                break;
            case 'luxury-trains':
                narrator.speak("India has several luxury trains that offer royal experiences, including the Palace on Wheels, the Maharajas' Express, the Deccan Odyssey, and the Golden Chariot. These trains showcase India's rich cultural heritage and scenic beauty.");
                break;
            case 'project-template':
                narrator.speak("This template provides a structure for your project on Indian Railways, including sections for historical development, modern transformation, luxury trains, and personal experiences of rail travel.");
                break;
        }
    }
}

// Toggle read aloud for story
function toggleReadAloud() {
    if (typeof readStoryPartAloud === 'function') {
        // Get current active story part
        const activePart = document.querySelector('.story-part.active');
        if (activePart) {
            const partId = activePart.id;
            const partNumber = partId === 'storyPart1' ? 1 : 2;
            console.log(`Manual read aloud for part ${partNumber}`);
            readStoryPartAloud(partNumber, true); // true = manual call
        } else {
            // Default to part 1 if no active part found
            readStoryPartAloud(1, true);
        }
    } else {
        console.error("readStoryPartAloud function not found");
    }
}

// Function for checking particle exercises
function checkParticiples() {
    let correct = 0;
    const total = document.querySelectorAll('.contraction-input').length;
    
    document.querySelectorAll('.contraction-input').forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correct++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('participlesFeedback');
    if (feedbackEl) {
        if (correct === total) {
            feedbackEl.textContent = `Perfect! All ${correct} answers are correct.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Award points for perfect score
            score += 10;
            document.getElementById('totalScore').textContent = score;
            
            showAchievement('Participle Exercise Completed!');
        } else {
            feedbackEl.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
    
    if (narrator) {
        if (correct === total) {
            narrator.speak(`Perfect! All ${correct} answers are correct.`);
        } else {
            narrator.speak(`You got ${correct} out of ${total} correct. Try again!`);
        }
    }
}

// Check editing answers
function checkEditing() {
    let correct = 0;
    const total = document.querySelectorAll('.editing-input').length;
    
    document.querySelectorAll('.editing-input').forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correct++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('editingFeedback');
    if (feedbackEl) {
        if (correct === total) {
            feedbackEl.textContent = `Perfect! All ${correct} corrections are correct.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Award points for perfect score
            score += 15;
            document.getElementById('totalScore').textContent = score;
            
            showAchievement('Editing Exercise Completed!');
        } else {
            feedbackEl.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
    
    if (narrator) {
        if (correct === total) {
            narrator.speak(`Perfect! All ${correct} corrections are correct.`);
        } else {
            narrator.speak(`You got ${correct} out of ${total} correct. Try again!`);
        }
    }
}

// Open writing pad
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        document.getElementById('writingPad').focus();
    }
    
    if (narrator) {
        narrator.speak("Write an account of a travel by train using the given expressions. Describe the journey, including details of distance, booking, facilities, and suggestions.");
    }
}

// Matching game functionality
let firstSelected = null;

function selectMatch(item, type) {
    // If this item is already matched, do nothing
    if (item.classList.contains('correct')) return;
    
    // If this is the first selection
    if (!firstSelected) {
        firstSelected = { element: item, type: type, match: item.dataset.match };
        item.classList.add('selected');
        return;
    }
    
    // If clicking on the same item, deselect it
    if (firstSelected.element === item) {
        firstSelected.element.classList.remove('selected');
        firstSelected = null;
        return;
    }
    
    // If clicking on an item of the same type, switch selection
    if (firstSelected.type === type) {
        firstSelected.element.classList.remove('selected');
        firstSelected = { element: item, type: type, match: item.dataset.match };
        item.classList.add('selected');
        return;
    }
    
    // Check if match is correct
    const isMatch = firstSelected.match === item.dataset.match;
    
    if (isMatch) {
        // Correct match
        firstSelected.element.classList.remove('selected');
        firstSelected.element.classList.add('correct');
        item.classList.add('correct');
        
        // Check if all matches are complete
        setTimeout(() => {
            checkAllMatches();
        }, 500);
    } else {
        // Incorrect match
        firstSelected.element.classList.remove('selected');
        firstSelected.element.classList.add('incorrect');
        item.classList.add('incorrect');
        
        // Remove incorrect indicators after a short delay
        setTimeout(() => {
            firstSelected.element.classList.remove('incorrect');
            item.classList.remove('incorrect');
        }, 1000);
    }
    
    firstSelected = null;
}

function checkVocabMCQ() {
    // Define the correct answers (index of the correct option)
    const vocabAnswers = {
        'vocab1': '2', // Gurgling for water
        'vocab2': '0', // Rustling for leaves
        'vocab3': '1'  // Puffing for engine
    };
    
    let correctCount = 0;
    let totalCount = Object.keys(vocabAnswers).length;
    
    // Check each question
    Object.keys(vocabAnswers).forEach(id => {
        const selectedOption = document.querySelector(`input[name="${id}"]:checked`);
        const feedbackEl = document.getElementById(`${id}-feedback`);
        
        if (selectedOption) {
            const isCorrect = selectedOption.value === vocabAnswers[id];
            
            if (isCorrect) {
                feedbackEl.textContent = '✓ Correct!';
                feedbackEl.className = 'question-feedback correct';
                correctCount++;
            } else {
                // Find the correct answer text
                const correctOptionId = `${id}-${String.fromCharCode(97 + parseInt(vocabAnswers[id]))}`; // Convert 0->a, 1->b, etc.
                const correctOptionLabel = document.querySelector(`label[for="${correctOptionId}"]`).textContent;
                feedbackEl.textContent = `✗ Incorrect. The correct answer is: ${correctOptionLabel}`;
                feedbackEl.className = 'question-feedback incorrect';
            }
        } else {
            feedbackEl.textContent = 'Please select an answer.';
            feedbackEl.className = 'question-feedback warning';
        }
    });
    
    // Show overall feedback
    const feedbackContainer = document.getElementById('vocabMCQFeedback');
    if (feedbackContainer) {
        feedbackContainer.textContent = `You got ${correctCount} out of ${totalCount} questions correct!`;
        feedbackContainer.className = 'feedback-message show';
        feedbackContainer.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        // Award points and show achievement if all correct
        if (correctCount === totalCount) {
            // Award points
            score += 20;
            document.getElementById('totalScore').textContent = score;
            
            showAchievement('Vocabulary Quiz Completed!');
            
            if (narrator) {
                narrator.speak("Excellent work! You've correctly identified all the sound words.");
            }
        }
    }
}
