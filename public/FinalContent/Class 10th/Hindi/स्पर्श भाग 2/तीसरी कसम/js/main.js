/**
 * Main JavaScript for Teesri Kasam Shilpkar interactive Hindi lesson
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
                        userInteracted = false;
                        this.showFallbackMessage(processedText);
                    } else if (event.error === 'interrupted') {
                        console.log('Speech synthesis was interrupted - this is normal when switching content');
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
                    this.currentUtterance = null;
                    if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                        this.onEndCallback();
                    }
                };
                
                // Safari/iOS specific handling
                if (this.isSafari || this.isIOS) {
                    this.speakForSafari(utterance, processedText);
                } else {
                    this.synth.speak(utterance);
                }
            },
            
            // Safari-specific speech handling
            speakForSafari: function(utterance, text) {
                const chunks = this.chunkText(text);
                
                let i = 0;
                const speakNextChunk = () => {
                    if (i < chunks.length && this.enabled) {
                        const chunkUtterance = new SpeechSynthesisUtterance(chunks[i]);
                        chunkUtterance.voice = utterance.voice;
                        chunkUtterance.rate = utterance.rate;
                        chunkUtterance.pitch = utterance.pitch;
                        chunkUtterance.volume = utterance.volume;
                        
                        chunkUtterance.onend = () => {
                            i++;
                            if (i < chunks.length) {
                                setTimeout(speakNextChunk, 50);
                            } else {
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
                const sentences = text.match(/[^.!?।]+[.!?।]+/g) || [text];
                const chunks = [];
                let currentChunk = '';
                
                sentences.forEach(sentence => {
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
                let processed = text
                    .replace(/डॉ\./g, "डॉक्टर ")
                    .replace(/श्री\./g, "श्रीमान ")
                    .replace(/सं\./g, "संवत ")
                    .replace(/पृ\./g, "पृष्ठ ")
                    .replace(/\&/g, " और ")
                    .replace(/\$/g, " रुपये ")
                    .replace(/\%/g, " प्रतिशत ");
                
                processed = this.addNaturalPauses(processed);
                
                return processed;
            },
            
            // Set optimal voice parameters based on browser
            optimizeVoiceParameters: function(utterance) {
                if (this.isSafari || this.isIOS) {
                    utterance.rate = 0.9;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;
                } else {
                    utterance.rate = 0.85;
                    utterance.pitch = 1.05;
                    utterance.volume = 1.0;
                }
            },
            
            initializeVoices: function() {
                const voices = this.synth.getVoices();
                console.log('Available voices:', voices.map(v => v.name + ' (' + v.lang + ')'));
                
                let preferredVoice = voices.find(voice => 
                    voice.lang.startsWith('hi') || voice.name.includes('Hindi')
                );
                
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => 
                        voice.name.includes('Indian') || voice.name.includes('India')
                    );
                }
                
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => voice.lang.startsWith('en'));
                }
                
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
                return text
                    .replace(/\.\s/g, '.  ')
                    .replace(/\!\s/g, '!  ')
                    .replace(/\?\s/g, '?  ')
                    .replace(/,\s/g, ',  ')
                    .replace(/;\s/g, ';  ')
                    .replace(/:\s/g, ':  ')
                    .replace(/।\s/g, '।  ');
            },
            
            stop: function() {
                this.synth.cancel();
                this.currentUtterance = null;
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
                
                setTimeout(() => {
                    if (fallback.parentNode) {
                        fallback.classList.add('fade-out');
                        setTimeout(() => fallback.remove(), 500);
                    }
                }, 8000);
            }
        };
        
        window.narrator = narrator;
        
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = function() {
                narrator.initializeVoices();
            };
        } else {
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
        
        // Reading indicators removed completely as requested
        
        // Paragraph highlight clearing removed as highlighting is disabled
        
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
    }, 200);
    
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
                const introModule = document.getElementById('intro');
                if (introModule) {
                    const contentBlocks = introModule.querySelectorAll('.content-block');
                    let introContent = "तीसरी कसम के शिल्पकार शैलेंद्र में आपका स्वागत है। ";
                    
                    contentBlocks.forEach(block => {
                        const paragraphs = block.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            introContent += p.textContent + " ";
                        });
                    });
                    
                    window.narrator.speak(introContent);
                } else {
                    window.narrator.speak("तीसरी कसम के शिल्पकार शैलेंद्र में आपका स्वागत है। यह पाठ शैलेंद्र की रचना पर आधारित है।");
                }
            }
            break;
            
        case 'prereading':
            if (window.narrator) {
                const prereadingModule = document.getElementById('prereading');
                if (prereadingModule) {
                    const contentBlocks = prereadingModule.querySelectorAll('.content-block');
                    let prereadingContent = "आइए शुरू करें। ";
                    
                    contentBlocks.forEach(block => {
                        const paragraphs = block.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            prereadingContent += p.textContent + " ";
                        });
                    });
                    
                    speakInSequence(prereadingContent);
                } else {
                    window.narrator.speak("पाठ प्रवेश खंड में आपका स्वागत है।");
                }
            }
            break;
            
        case 'story':
            if (typeof readCurrentStoryPartAloud === 'function') {
                setTimeout(() => {
                    readCurrentStoryPartAloud();
                }, 500);
            }
            break;
            
        case 'thinking-text':
            if (window.narrator) {
                window.narrator.speak("प्रश्न-अभ्यास खंड में आपका स्वागत है। यहां आप पाठ का विश्लेषण करके प्रश्नों के उत्तर देंगे।");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("भाषा अध्ययन खंड में आपका स्वागत है। यहां आप शब्दों के पर्याय, मुहावरे और संधि विच्छेद का अध्ययन करेंगे।");
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                window.narrator.speak("गतिविधि खंड में आपका स्वागत है। यहां आप विभिन्न क्रियाकलापों में भाग लेंगे, जिनमें आशय विश्लेषण और निबंध लेखन शामिल हैं।");
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
        case 'story': return 'पाठ';
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
    trackUserInteraction();
    showModule('prereading');
    if (narrator) {
        const prereadingModule = document.getElementById('prereading');
        if (prereadingModule) {
            const contentBlocks = prereadingModule.querySelectorAll('.content-block');
            let prereadingContent = "तीसरी कसम के शिल्पकार शैलेंद्र में आपका स्वागत है। आइए पाठ प्रवेश से शुरू करते हैं। ";
            
            contentBlocks.forEach(block => {
                const paragraphs = block.querySelectorAll('p');
                paragraphs.forEach(p => {
                    prereadingContent += p.textContent + " ";
                });
            });
            
            speakInSequence(prereadingContent);
        } else {
            narrator.speak("तीसरी कसम के शिल्पकार शैलेंद्र में आपका स्वागत है। आइए पाठ प्रवेश से शुरू करते हैं।");
        }
    }
}

// Toggle Audio
function toggleAudio() {
    trackUserInteraction();
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
    
    const sentences = text.match(/[^.!?।]+[.!?।]+/g) || [text];
    
    function speakNextSentence(index = 0) {
        if (index >= sentences.length) return;
        
        window.narrator.onEndCallback = function() {
            setTimeout(() => {
                speakNextSentence(index + 1);
            }, 200);
        };
        
        window.narrator.speak(sentences[index]);
    }
    
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

// Toggle Read Aloud
function toggleReadAloud() {
    if (typeof readCurrentStoryPartAloud === 'function') {
        readCurrentStoryPartAloud();
    } else {
        console.error("Read aloud function not available");
        if (narrator) {
            narrator.speak("क्षमा करें, वाचन सुविधा इस समय उपलब्ध नहीं है।");
        }
    }
}

// Save reflection
function saveReflection() {
    console.log("saveReflection function called");
    const selectedOption = document.querySelector('input[name="reflection"]:checked');
    const feedbackEl = document.getElementById('reflectionFeedback');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया कोई एक विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    const selectedValue = selectedOption.value;
    
    document.querySelectorAll('.reflection-option').forEach(option => {
        option.classList.remove('selected-option', 'best-option', 'good-option');
    });
    
    const selectedOptionDiv = selectedOption.closest('.reflection-option');
    
    selectedOptionDiv.classList.add('selected-option', 'good-option');
    
    feedbackEl.textContent = 'आपका चिंतन सहेज लिया गया है! आपके विचार सराहनीय हैं।';
    feedbackEl.className = 'feedback-message show success';
    
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        updateProgress();
        showAchievement('चिंतन पूर्ण!');
    }
    
    if (narrator) {
        narrator.speak("अपना चिंतन साझा करने के लिए धन्यवाद। " + feedbackEl.textContent);
    }
}

// Check vocabulary answers
function checkVocabulary() {
    const vocabAnswers = {
        vocab1: "फिल्म की रील",
        vocab2: "तीव्रता",
        vocab3: "बहुत कठिनाई से",
        vocab4: "अनजान",
        vocab5: "भरोसा"
    };
    
    let correctCount = 0;
    let totalCount = 0;
    
    Object.keys(vocabAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            totalCount++;
            const isCorrect = select.value === vocabAnswers[id];
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            if (isCorrect) correctCount++;
        }
    });
    
    const feedbackEl = document.getElementById('vocabFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`;
        feedbackEl.className = 'feedback-message show';
        feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
        
        if (correctCount === totalCount) {
            score += 10;
            document.getElementById('totalScore').textContent = score;
            
            if (!modulesCompleted.includes('thinking-language')) {
                modulesCompleted.push('thinking-language');
                updateProgress();
                showAchievement('शब्दार्थ अभ्यास पूर्ण!');
            }
        }
    }
    
    if (narrator) {
        narrator.speak(`आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए!`);
    }
}

// Check idiom usage
function checkIdioms() {
    const idiomAnswers = {
        idiom1: "1", // निराश होने पर उसका चेहरा मुरझा गया
        idiom2: "1", // समझदार व्यक्ति भी कभी-कभी चक्कर खा जाता है
        idiom3: "1"  // हीराबाई की आँखें बोलती हैं, शब्दों की जरूरत नहीं
    };
    
    let correctCount = 0;
    let totalCount = Object.keys(idiomAnswers).length;
    
    Object.keys(idiomAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const isCorrect = select.value === idiomAnswers[id];
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            if (isCorrect) correctCount++;
        }
    });
    
    const feedbackEl = document.getElementById('idiomFeedback');
    if (feedbackEl) {
        if (correctCount === totalCount) {
            feedbackEl.textContent = 'सभी उत्तर सही हैं! मुहावरों की समझ उत्कृष्ट है।';
            feedbackEl.className = 'feedback-message show success';
            
            score += 15;
            document.getElementById('totalScore').textContent = score;
            
            if (!modulesCompleted.includes('thinking-language')) {
                modulesCompleted.push('thinking-language');
                updateProgress();
                showAchievement('व्याकरण अभ्यास पूर्ण!');
            }
        } else {
            feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए। पुन: प्रयास करें।`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
    
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}

// Check grammar exercises (संधि विच्छेद)
function checkGrammar() {
    const grammarAnswers = {
        adj1: "सर्व + उत्कृष्ट",
        adj2: "चमत् + कर्ष",
        adj3: "रूप + अंतरण"
    };
    
    let correctCount = 0;
    let totalCount = Object.keys(grammarAnswers).length;
    
    Object.keys(grammarAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const isCorrect = select.value === grammarAnswers[id];
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            if (isCorrect) correctCount++;
        }
    });
    
    const feedbackEl = document.getElementById('grammarFeedback');
    if (feedbackEl) {
        if (correctCount === totalCount) {
            feedbackEl.textContent = 'सभी उत्तर सही हैं! आप संधि विच्छेद अच्छी तरह से कर सकते हैं।';
            feedbackEl.className = 'feedback-message show success';
            
            score += 20;
            document.getElementById('totalScore').textContent = score;
            
            if (!modulesCompleted.includes('thinking-language')) {
                modulesCompleted.push('thinking-language');
                updateProgress();
                showAchievement('व्याकरण अभ्यास पूर्ण!');
            }
        } else {
            feedbackEl.textContent = `आपने ${totalCount} में से ${correctCount} प्रश्नों के सही उत्तर दिए। पुन: प्रयास करें।`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
    
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}

// Save research notes
function saveResearchNotes() {
    const meaning1 = document.querySelector('input[name="meaning"]:checked');
    const meaning2 = document.querySelector('input[name="meaning2"]:checked');
    const feedbackEl = document.getElementById('researchFeedback');
    
    if (!meaning1 || !meaning2) {
        feedbackEl.textContent = 'कृपया दोनों आशयों के लिए विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    const isCorrect1 = meaning1.value === "1";
    const isCorrect2 = meaning2.value === "1";
    
    if (isCorrect1 && isCorrect2) {
        feedbackEl.textContent = 'उत्कृष्ट! आपने दोनों वाक्यांशों के आशय सही-सही समझे हैं।';
        feedbackEl.className = 'feedback-message show success';
        
        score += 20;
        document.getElementById('totalScore').textContent = score;
        
        if (!modulesCompleted.includes('activities')) {
            modulesCompleted.push('activities');
            updateProgress();
            showAchievement('आशय विश्लेषण पूर्ण!');
        }
    } else {
        feedbackEl.textContent = 'आपके कुछ उत्तर सही नहीं हैं। वाक्यांशों को एक बार फिर से पढ़कर विचार करें।';
        feedbackEl.className = 'feedback-message show error';
    }
    
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}

// Save role play (निबंध विषय)
function saveRolePlay() {
    const selectedOption = document.querySelector('input[name="essay"]:checked');
    const feedbackEl = document.getElementById('rolePlayFeedback');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया कोई एक विषय चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    feedbackEl.textContent = 'आपका विषय चयन सहेज लिया गया है! अब आप इस विषय पर अपने विचार लिखने के लिए तैयार हैं।';
    feedbackEl.className = 'feedback-message show success';
    
    score += 20;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('निबंध विषय चयन पूर्ण!');
    }
    
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}

// Show answer helper for activities section
function showAnswer(questionNumber) {
    const answerDiv = document.getElementById(`answer${questionNumber}`);
    const button = event.target;
    
    if (!answerDiv) return;
    
    // Check which option is selected for the question
    let selectedOption = null;
    if (questionNumber === 1) {
        selectedOption = document.querySelector('input[name="meaning"]:checked');
    } else if (questionNumber === 2) {
        selectedOption = document.querySelector('input[name="meaning2"]:checked');
    }
    
    // If no option is selected, prompt user to select one
    if (!selectedOption) {
        answerDiv.innerHTML = `
            <div class="answer-content">
                <h4>कृपया पहले कोई विकल्प चुनें</h4>
                <p>उत्तर देखने से पहले कृपया कोई एक विकल्प चुनें।</p>
            </div>
        `;
        answerDiv.style.display = 'block';
        answerDiv.className = 'feedback-message show warning';
        
        if (narrator && narrator.enabled) {
            narrator.speak('कृपया पहले कोई विकल्प चुनें।');
        }
        return;
    }
    
    // Define correct answers for each question
    const correctAnswers = {
        1: {
            title: "सही उत्तर!",
            content: `<strong>बधाई हो! पहला विकल्प सही है।</strong><br><br>
                     <strong>व्याख्या:</strong> "'तीसरी कसम' फिल्म नहीं, सैल्यूलाइड पर लिखी कविता थी" का अर्थ यह है कि यह फिल्म केवल एक व्यावसायिक मनोरंजन नहीं थी बल्कि एक कलात्मक अभिव्यक्ति थी। इसमें कविता जैसी संवेदनशीलता, भावप्रवणता और कलात्मक गुणवत्ता थी। शैलेंद्र के कवि-हृदय की झलक इस फिल्म में दिखाई देती है, जिससे यह एक उत्कृष्ट कलाकृति बन गई।`
        },
        2: {
            title: "सही उत्तर!",
            content: `<strong>बधाई हो! पहला विकल्प सही है।</strong><br><br>
                     <strong>व्याख्या:</strong> "लोक-तत्व का अभाव" का अर्थ है कि हमारी अधिकांश फिल्में वास्तविक जीवन से दूर होती हैं। उनमें आम लोगों की समस्याएं, परंपराएं, संस्कृति और जनसामान्य की संवेदनाओं का सही चित्रण नहीं होता। लोक-तत्व का मतलब है जिंदगी से जुड़ाव, सच्चाई और जनसामान्य की पीड़ा और खुशी का प्रामाणिक चित्रण।`
        }
    };
    
    // Wrong answer message
    const wrongAnswer = {
        title: "गलत उत्तर!",
        content: `<strong>खेद है, यह उत्तर सही नहीं है।</strong><br><br>
                 <strong>सुझाव:</strong> कृपया पाठ को एक बार फिर से पढ़ें और पहले विकल्प पर विचार करें। पहला विकल्प सही उत्तर है।`
    };
    
    // Toggle visibility
    if (answerDiv.style.display === 'none' || answerDiv.style.display === '') {
        // Check if the selected option is correct (option 1)
        const isCorrect = selectedOption.value === "1";
        
        if (isCorrect) {
            // Show correct answer explanation
            answerDiv.innerHTML = `
                <div class="answer-content">
                    <h4>${correctAnswers[questionNumber].title}</h4>
                    <p>${correctAnswers[questionNumber].content}</p>
                </div>
            `;
            answerDiv.className = 'feedback-message show success';
            
            // Narrate the correct answer
            if (narrator && narrator.enabled) {
                const textToRead = correctAnswers[questionNumber].content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                narrator.speak(`सही उत्तर! ${textToRead}`);
            }
        } else {
            // Show wrong answer message
            answerDiv.innerHTML = `
                <div class="answer-content">
                    <h4>${wrongAnswer.title}</h4>
                    <p>${wrongAnswer.content}</p>
                </div>
            `;
            answerDiv.className = 'feedback-message show error';
            
            // Narrate the wrong answer message
            if (narrator && narrator.enabled) {
                narrator.speak('गलत उत्तर! खेद है, यह उत्तर सही नहीं है। कृपया पहले विकल्प पर विचार करें।');
            }
        }
        
        answerDiv.style.display = 'block';
        button.textContent = 'उत्तर छुपाएं';
        
        // Scroll to answer
        answerDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } else {
        answerDiv.style.display = 'none';
        answerDiv.className = 'feedback-message';
        button.textContent = 'उत्तर सहेजें';
    }
}
