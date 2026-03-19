/**
 * Main JavaScript for Two Stories about Flying interactive lesson
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
                // Empty function - we've removed the fallback message box
                console.log("Speech synthesis fallback message suppressed:", text);
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
            // Load the story content if needed
            if (typeof storyContent !== 'undefined') {
                document.getElementById('storyContent').innerHTML = storyContent;
            }
            break;
        case 'poem1':
            // Load the poem content if needed
            if (typeof poem1Content !== 'undefined') {
                document.getElementById('poem1Content').innerHTML = poem1Content;
            }
            break;
        case 'poem2':
            // Load the poem content if needed
            if (typeof poem2Content !== 'undefined') {
                document.getElementById('poem2Content').innerHTML = poem2Content;
            }
            break;
        case 'thinking-text':
            // Initialize questions
            if (typeof showQuestionSet === 'function') {
                showQuestionSet('story1-questions');
            }
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
                    let introContent = "Welcome to 'Two Stories about Flying'. ";
                    
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
                    window.narrator.speak("Welcome to the interactive English lesson on 'Two Stories about Flying'. These are fascinating stories about conquering the skies.");
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
                    window.narrator.speak("Welcome to the Let's Begin section. We'll explore two fascinating stories about flying - one about a young seagull and another about a pilot.");
                }
            }
            break;
            
        case 'story1':
            // Automatically start reading story 1
            if (typeof readStory1Aloud === 'function') {
                readStory1Aloud();
            }
            break;
            
        case 'story2':
            // Automatically start reading story 2
            if (typeof readStory2Aloud === 'function') {
                readStory2Aloud();
            }
            break;
            
        case 'poem1':
            // Automatically start reading the poem
            if (typeof readPoem1Aloud === 'function') {
                readPoem1Aloud();
            }
            break;
            
        case 'poem2':
            // Automatically start reading the poem
            if (typeof readPoem2Aloud === 'function') {
                readPoem2Aloud();
            }
            break;
            
        case 'thinking-text':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Reading Comprehension section. Here you'll analyze the stories and poems and answer questions about them.");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Vocabulary and Grammar section. Here you'll explore vocabulary and phrases related to the stories and poems.");
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
        case 'story1': return 'His First Flight';
        case 'story2': return 'The Black Aeroplane';
        case 'poem1': return 'How to Tell Wild Animals';
        case 'poem2': return 'The Ball Poem';
        case 'thinking-text': return 'Reading Comprehension';
        case 'thinking-language': return 'Vocabulary & Grammar';
        default: return moduleId;
    }
}

// Update Progress
function updateProgress() {
    // We have 8 modules total in this lesson
    progress = (modulesCompleted.length / 8) * 100;
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
            let prereadingContent = "Welcome to the interactive English lesson on 'Two Stories about Flying'. Let's begin by exploring these fascinating stories about flying. ";
            
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
            narrator.speak("Welcome to the interactive English lesson on 'Two Stories about Flying'. Let's begin by exploring these fascinating stories.");
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

// Save reflection text
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value;
    const feedbackDiv = document.getElementById('reflectionFeedback');
    
    if (reflectionText.trim().length < 10) {
        feedbackDiv.textContent = "Please write a more detailed reflection (at least a few sentences).";
        feedbackDiv.className = "feedback-message error show";
    } else {
        feedbackDiv.textContent = "Your reflection has been saved successfully!";
        feedbackDiv.className = "feedback-message success show";
        
        // Award points for completing reflection
        score += 5;
        document.getElementById('totalScore').textContent = score;
        
        // Show achievement for meaningful reflection
        if (reflectionText.trim().length > 50) {
            showAchievement("Deep Thinker: You've written a thoughtful reflection!");
        }
    }
    
    // Hide feedback after a few seconds
    setTimeout(() => {
        feedbackDiv.classList.remove('show');
    }, 3000);
}

// Check vocabulary answers
function checkVocabulary() {
    let correctAnswers = 0;
    const totalQuestions = 3;
    const feedback = document.getElementById('vocabFeedback');
    
    // Check answer for question 1
    const answer1 = document.getElementById('vocab1').value;
    if (answer1 === 'dirty') {
        correctAnswers++;
        document.getElementById('vocab1').style.borderColor = '#4caf50';
    } else {
        document.getElementById('vocab1').style.borderColor = '#f44336';
    }
    
    // Check answer for question 2
    const answer2 = document.getElementById('vocab2').value;
    if (answer2 === 'angry') {
        correctAnswers++;
        document.getElementById('vocab2').style.borderColor = '#4caf50';
    } else {
        document.getElementById('vocab2').style.borderColor = '#f44336';
    }
    
    // Check answer for question 3
    const answer3 = document.getElementById('vocab3').value;
    if (answer3 === 'most evil') {
        correctAnswers++;
        document.getElementById('vocab3').style.borderColor = '#4caf50';
    } else {
        document.getElementById('vocab3').style.borderColor = '#f44336';
    }
    
    // Display feedback
    if (correctAnswers === totalQuestions) {
        feedback.textContent = `Perfect! You got all ${correctAnswers} questions right!`;
        feedback.className = 'feedback-message success show';
        
        // Award points and show achievement
        score += 10;
        document.getElementById('totalScore').textContent = score;
        showAchievement("Vocabulary Master: Perfect score on the 'black' meanings quiz!");
    } else {
        feedback.textContent = `You got ${correctAnswers} out of ${totalQuestions} questions correct. Try again!`;
        feedback.className = 'feedback-message error show';
    }
    
    // Hide feedback after a few seconds
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 5000);
}

// Check phrases matching
function checkPhrases() {
    let correctAnswers = 0;
    let totalQuestions = 0;
    const feedback = document.getElementById('phrasesFeedback');
    
    // Check all contraction inputs
    document.querySelectorAll('.contraction-input').forEach(input => {
        totalQuestions++;
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        // Check if answer is correct (allowing for some variation)
        if (userAnswer === correctAnswer || 
            correctAnswer.includes(userAnswer) || 
            userAnswer.includes(correctAnswer)) {
            correctAnswers++;
            input.style.borderColor = '#4caf50';
        } else {
            input.style.borderColor = '#f44336';
        }
    });
    
    // Display feedback
    if (correctAnswers === totalQuestions) {
        feedback.textContent = `Perfect! You matched all ${correctAnswers} phrases correctly!`;
        feedback.className = 'feedback-message success show';
        
        // Award points and show achievement
        score += 10;
        document.getElementById('totalScore').textContent = score;
        showAchievement("Phrase Master: You've correctly matched all fly phrases!");
    } else {
        feedback.textContent = `You matched ${correctAnswers} out of ${totalQuestions} phrases correctly. Try again!`;
        feedback.className = 'feedback-message error show';
    }
    
    // Hide feedback after a few seconds
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 5000);
}
