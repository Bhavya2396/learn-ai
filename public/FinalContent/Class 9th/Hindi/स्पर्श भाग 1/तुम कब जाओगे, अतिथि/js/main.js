/**
 * Main JavaScript for Chapter 3 interactive Hindi lesson
 * तुम कब जाओगे, अतिथि - शरद जोशी
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
                
                if (!this.synth) {
                    console.error('Speech synthesis not available');
                    return;
                }
                
                if (!userInteracted) {
                    console.log('Speech synthesis blocked - waiting for user interaction');
                    this.showFallbackMessage(text);
                    return;
                }
                
                this.synth.cancel();
                
                const processedText = this.preprocessText(text);
                const utterance = new SpeechSynthesisUtterance(processedText);
                
                this.optimizeVoiceParameters(utterance);
                
                if (!this.voice) {
                    this.initializeVoices();
                }
                
                if (this.voice) {
                    utterance.voice = this.voice;
                }
                
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
                
                this.currentUtterance = utterance;
                
                utterance.onend = (event) => {
                    console.log('Speech ended');
                    this.currentUtterance = null;
                    if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                        this.onEndCallback();
                    }
                };
                
                if (this.isSafari || this.isIOS) {
                    this.speakForSafari(utterance, processedText);
                } else {
                    this.synth.speak(utterance);
                }
            },
            
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
                    voice.lang.startsWith('hi') || 
                    voice.name.includes('Hindi')
                );
                
                if (!preferredVoice) {
                    preferredVoice = voices.find(voice => 
                        voice.name.includes('Indian') || 
                        voice.name.includes('India')
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
    
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration due to module switch');
        window.narrator.stop();
        
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
        
        if (window.readingTimeout && typeof clearTimeout === 'function') {
            clearTimeout(window.readingTimeout);
        }
        
        if (window.highlightTimeouts && typeof clearTimeout === 'function') {
            window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
            window.highlightTimeouts = [];
        }
    }
    
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    
    const moduleElement = document.getElementById(moduleId);
    if (!moduleElement) {
        console.error(`Module element not found: ${moduleId}`);
        return;
    }
    
    moduleElement.classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active');
        n.setAttribute('aria-pressed', 'false');
    });
    
    const navItems = document.querySelectorAll('.nav-item');
    for (let item of navItems) {
        if (item.onclick && item.onclick.toString().includes(moduleId)) {
            item.classList.add('active');
            item.setAttribute('aria-pressed', 'true');
            break;
        }
    }
    
    if (!modulesCompleted.includes(moduleId)) {
        modulesCompleted.push(moduleId);
        updateProgress();
        showAchievement(`मॉड्यूल पूर्ण: ${getModuleName(moduleId)}`);
    }
    
    currentModule = moduleId;
    
    switch(moduleId) {
        case 'story':
            // Stop any ongoing narration first
            if (window.narrator) {
                window.narrator.stop();
            }
            // Show first story part without auto-narration (user can click to start)
            if (typeof window.showStoryPart === 'function') {
                // Temporarily disable auto-narration for initial load
                const originalEnabled = window.narrator ? window.narrator.enabled : false;
                if (window.narrator) {
                    window.narrator.enabled = false;
                }
                window.showStoryPart(1);
                // Restore narration setting
                setTimeout(() => {
                    if (window.narrator) {
                        window.narrator.enabled = originalEnabled;
                    }
                }, 100);
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
    
    setTimeout(() => {
        startModuleNarration(moduleId);
    }, 200);
    
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
                    let introContent = "तुम कब जाओगे, अतिथि में आपका स्वागत है। ";
                    
                    contentBlocks.forEach(block => {
                        const paragraphs = block.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            introContent += p.textContent + " ";
                        });
                    });
                    
                    window.narrator.speak(introContent);
                } else {
                    window.narrator.speak("तुम कब जाओगे, अतिथि में आपका स्वागत है। यह पाठ शरद जोशी के व्यंग्य लेख पर आधारित है, जो आतिथ्य की भारतीय परंपरा पर एक मनोरंजक टिप्पणी है।");
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
                    
                    const activityTitle = prereadingModule.querySelector('.activity-title');
                    if (activityTitle) {
                        prereadingContent += activityTitle.textContent + "। ";
                    }
                    
                    speakInSequence(prereadingContent);
                } else {
                    window.narrator.speak("पाठ प्रवेश खंड में आपका स्वागत है। भारतीय संस्कृति में अतिथि देवो भव की परंपरा है, लेकिन आधुनिक जीवन में इसकी अपनी चुनौतियां हैं। शरद जोशी ने इसी विषय पर अपना व्यंग्य लिखा है।");
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
                window.narrator.speak("प्रश्न-अभ्यास खंड में आपका स्वागत है। यहां आप व्यंग्य लेख का विश्लेषण करके प्रश्नों के उत्तर देंगे।");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("भाषा अध्ययन खंड में आपका स्वागत है। यहां आप शब्दों के पर्याय और व्याकरण का अध्ययन करेंगे।");
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                window.narrator.speak("गतिविधि खंड में आपका स्वागत है। यहां आप रचनात्मक लेखन और चर्चा में भाग लेंगे।");
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
        case 'story': return 'व्यंग्य लेख';
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
            let prereadingContent = "तुम कब जाओगे, अतिथि में आपका स्वागत है। आइए पाठ प्रवेश से शुरू करते हैं और व्यंग्य लेख के विषय और पृष्ठभूमि के बारे में जानते हैं। ";
            
            contentBlocks.forEach(block => {
                const paragraphs = block.querySelectorAll('p');
                paragraphs.forEach(p => {
                    prereadingContent += p.textContent + " ";
                });
            });
            
            speakInSequence(prereadingContent);
        } else {
            narrator.speak("तुम कब जाओगे, अतिथि में आपका स्वागत है। आइए पाठ प्रवेश से शुरू करते हैं और व्यंग्य लेख के विषय और पृष्ठभूमि के बारे में जानते हैं।");
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
window.togglePrintMode = function() {
    console.log('togglePrintMode function called');
    document.body.classList.toggle('print-mode');
    
    if (document.body.classList.contains('print-mode')) {
        if (window.narrator) {
            window.narrator.speak("प्रिंट मोड सक्रिय। पृष्ठ अब प्रिंटिंग के लिए अनुकूलित है।");
        }
    } else {
        if (window.narrator) {
            window.narrator.speak("प्रिंट मोड निष्क्रिय।");
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
window.highlightVocabulary = function() {
    console.log('highlightVocabulary function called');
    document.querySelectorAll('.highlight-vocab').forEach(vocab => {
        vocab.style.background = '#ffeb3b';
    });
    
    if (window.narrator) {
        window.narrator.speak("शब्दार्थ हाइलाइट किए गए हैं। उन पर माउस लाकर उनके अर्थ देखें।");
    }
}

// Toggle Read Aloud
window.toggleReadAloud = function() {
    console.log('toggleReadAloud function called');
    if (typeof window.readCurrentStoryPartAloud === 'function') {
        window.readCurrentStoryPartAloud();
    } else if (typeof readCurrentStoryPartAloud === 'function') {
        readCurrentStoryPartAloud();
    } else {
        console.error("Read aloud function not available");
        if (window.narrator) {
            window.narrator.speak("क्षमा करें, वाचन सुविधा इस समय उपलब्ध नहीं है।");
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
    
    feedbackEl.textContent = 'आपका चिंतन सहेज लिया गया है! आतिथ्य की परंपरा पर आपके विचार सराहनीय हैं।';
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
        vocab1: "मेहमान",
        vocab2: "स्वागत",
        vocab3: "आना",
        vocab4: "आतिथेय",
        vocab5: "धैर्य"
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

// Check grammar exercises
function checkGrammar() {
    const grammarAnswers = {
        grammar1: "3",
        grammar2: "1",
        grammar3: "1"
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
            feedbackEl.textContent = 'सभी उत्तर सही हैं! आप व्याकरण के नियमों को अच्छी तरह से समझते हैं।';
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

// Save creative writing
function saveCreativeWriting() {
    const writingText = document.getElementById('creativeWriting');
    const feedbackEl = document.getElementById('writingFeedback');
    
    if (writingText && writingText.value.trim().length > 50) {
        feedbackEl.textContent = 'आपका व्यंग्य लेख सहेज लिया गया है! आपने शरद जोशी की शैली को अच्छी तरह से अपनाया है।';
        feedbackEl.className = 'feedback-message show success';
        
        score += 25;
        document.getElementById('totalScore').textContent = score;
        
        if (!modulesCompleted.includes('activities')) {
            modulesCompleted.push('activities');
            updateProgress();
            showAchievement('रचनात्मक लेखन पूर्ण!');
        }
    } else {
        feedbackEl.textContent = 'कृपया कम से कम 50 अक्षरों का व्यंग्य लेख लिखें।';
        feedbackEl.className = 'feedback-message show error';
    }
    
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}

// Save discussion
function saveDiscussion() {
    const discuss1 = document.querySelector('input[name="discuss1"]:checked');
    const discuss2 = document.querySelector('input[name="discuss2"]:checked');
    const feedbackEl = document.getElementById('discussionFeedback');
    
    if (discuss1 && discuss2) {
        feedbackEl.textContent = 'आपकी चर्चा सहेज ली गई है! आपने समस्या के सभी पहलुओं पर विचार किया है।';
        feedbackEl.className = 'feedback-message show success';
        
        score += 20;
        document.getElementById('totalScore').textContent = score;
        
        if (!modulesCompleted.includes('activities')) {
            modulesCompleted.push('activities');
            updateProgress();
            showAchievement('चर्चा गतिविधि पूर्ण!');
        }
    } else {
        feedbackEl.textContent = 'कृपया सभी प्रश्नों के उत्तर दें।';
        feedbackEl.className = 'feedback-message show error';
    }
    
    if (narrator) {
        narrator.speak(feedbackEl.textContent);
    }
}
