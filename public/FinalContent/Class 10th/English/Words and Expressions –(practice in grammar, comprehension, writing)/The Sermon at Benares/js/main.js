/**
 * Main JavaScript file for The Sermon at Benaras interactive lesson
 */

// Global variables
let startTime = Date.now();
let moduleCompleteCount = 0;
let totalScoreValue = 0;
let audioEnabled = true;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Main script loaded');
    initNarrator();
    updateTimer();
    initProgressTracking();
});

/**
 * Initialize the speech synthesis narrator
 */
function initNarrator() {
    // Create global narrator object
    window.narrator = {
        enabled: false,
        currentUtterance: null,
        voices: [],
        preferredVoice: null,
        
        // Method to speak text
        speak: function(text) {
            if (!this.enabled) return;
            
            // Stop any ongoing speech
            if (this.currentUtterance) {
                window.speechSynthesis.cancel();
            }
            
            // Create new utterance
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Set voice if available
            if (this.preferredVoice) {
                utterance.voice = this.preferredVoice;
            }
            
            // Set properties
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            // Set event handlers
            utterance.onend = (event) => {
                console.log('Speech finished');
                this.currentUtterance = null;
                if (this.onEndCallback && typeof this.onEndCallback === 'function') {
                    this.onEndCallback();
                }
            };
            
            utterance.onerror = (event) => {
                console.error('Speech error:', event);
                this.currentUtterance = null;
            };
            
            // Store current utterance
            this.currentUtterance = utterance;
            
            // Speak
            window.speechSynthesis.speak(utterance);
        },
        
        // Method to stop speech
        stop: function() {
            window.speechSynthesis.cancel();
            this.currentUtterance = null;
        },
        
        // Callback for when speech ends
        onEndCallback: null
    };
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
        window.narrator.enabled = true;
        console.log('Speech synthesis available');
        
        // Load voices
        function loadVoices() {
            window.narrator.voices = window.speechSynthesis.getVoices();
            console.log(`${window.narrator.voices.length} voices loaded`);
            
            // Try to find an English voice
            window.narrator.preferredVoice = window.narrator.voices.find(voice => 
                voice.lang.startsWith('en-') && voice.name.includes('Female')
            );
            
            if (!window.narrator.preferredVoice) {
                window.narrator.preferredVoice = window.narrator.voices.find(voice => 
                    voice.lang.startsWith('en-')
                );
            }
            
            if (window.narrator.preferredVoice) {
                console.log(`Selected voice: ${window.narrator.preferredVoice.name}`);
            } else {
                console.log('No preferred voice found, using default');
            }
        }
        
        // Firefox loads voices immediately, Chrome loads them asynchronously
        if (window.speechSynthesis.getVoices().length > 0) {
            loadVoices();
        } else {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    } else {
        console.warn('Speech synthesis not available');
    }
}

/**
 * Track user interaction for speech synthesis
 * (Some browsers require user interaction before allowing speech synthesis)
 */
function trackUserInteraction() {
    if (window.narrator) {
        window.narrator.userInteracted = true;
    }
}

/**
 * Toggle audio narration on/off
 */
function toggleAudio() {
    audioEnabled = !audioEnabled;
    const audioBtn = document.getElementById('audioBtn');
    
    if (audioEnabled) {
        audioBtn.textContent = '🔊';
        audioBtn.classList.remove('muted');
        
        // Resume any ongoing narration
        if (window.narrator && window.narrator.currentUtterance) {
            window.speechSynthesis.resume();
        }
    } else {
        audioBtn.textContent = '🔇';
        audioBtn.classList.add('muted');
        
        // Stop any ongoing narration
        if (window.narrator) {
            window.narrator.stop();
        }
    }
    
    console.log(`Audio ${audioEnabled ? 'enabled' : 'disabled'}`);
}

/**
 * Toggle read aloud functionality for the story content
 */
function toggleReadAloud() {
    console.log('Toggle read aloud');
    trackUserInteraction();
    
    const activeStoryPart = document.querySelector('.story-part.active');
    if (!activeStoryPart) return;
    
    const partNumber = activeStoryPart.id.replace('storyPart', '');
    
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
    } else {
        if (typeof readStoryPartAloud === 'function') {
            readStoryPartAloud(parseInt(partNumber, 10), true);
        } else {
            console.error('readStoryPartAloud function not available');
        }
    }
}

/**
 * Show a specific module
 * @param {string} moduleId - ID of the module to show
 */
function showModule(moduleId) {
    // Hide all modules
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        module.classList.remove('active');
    });
    
    // Show the selected module
    const selectedModule = document.getElementById(moduleId);
    if (selectedModule) {
        selectedModule.classList.add('active');
        
        // Update navigation buttons
        const navButtons = document.querySelectorAll('.nav-item');
        navButtons.forEach(btn => {
            const isActive = btn.getAttribute('onclick').includes(moduleId);
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        
        // Initialize specific module content if needed
        if (moduleId === 'story' && typeof showStoryPart === 'function') {
            showStoryPart(1);
        }
        
        // Scroll to top of page
        window.scrollTo(0, 0);
        
        // Stop any ongoing narration when changing modules
        if (window.narrator) {
            window.narrator.stop();
        }
        
        // Start narration for the new module after a small delay
        setTimeout(() => {
            startModuleNarration(moduleId);
        }, 200);
    }
}

/**
 * Start Module Narration
 * @param {string} moduleId - ID of the module to narrate
 */
function startModuleNarration(moduleId) {
    if (!window.narrator || !window.narrator.enabled) {
        console.log('Narrator not available or disabled');
        return;
    }
    
    switch(moduleId) {
        case 'intro':
            // Get the intro content
            const introModule = document.getElementById('intro');
            if (introModule) {
                const contentBlocks = introModule.querySelectorAll('.content-block');
                let introContent = "Welcome to 'The Sermon at Benaras'. ";
                
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
                window.narrator.speak("Welcome to the interactive English lesson on 'The Sermon at Benaras'. This lesson explores Buddha's wisdom and teachings about life and death.");
            }
            break;
            
        case 'prereading':
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
                window.narrator.speak(prereadingContent);
            } else {
                // Fallback if module not found
                window.narrator.speak("Welcome to the Let's Begin section. Here we'll explore the context of 'sermon' and reflect on grief.");
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
                window.narrator.speak("Welcome to the Reading Comprehension section. Here you'll analyze the texts and answer questions about them.");
            }
            break;
            
        case 'thinking-language':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Vocabulary and Grammar section. Here you'll explore vocabulary, antonyms, and reported speech from the texts.");
            }
            break;
            
        case 'activities':
            if (window.narrator) {
                window.narrator.speak("Welcome to the Activities section. Here you'll practice listening, speaking, and writing skills related to the sermon text.");
            }
            break;
            
        default:
            console.log(`No specific narration defined for module: ${moduleId}`);
            break;
    }
}

/**
 * Start the learning journey by showing the first module
 */
function startJourney() {
    showModule('prereading');
    incrementScore(5);
    showAchievement('Journey Started! +5 points', 'You\'ve embarked on your learning journey.');
    
    // Get the prereading content for a more complete narration
    const prereadingModule = document.getElementById('prereading');
    if (prereadingModule && window.narrator) {
        const contentBlocks = prereadingModule.querySelectorAll('.content-block');
        let prereadingContent = "Welcome to the interactive English lesson on 'The Sermon at Benaras'. Let's begin by exploring the context of the sermon and reflecting on grief. ";
        
        // Extract text from content blocks
        contentBlocks.forEach(block => {
            const paragraphs = block.querySelectorAll('p');
            paragraphs.forEach(p => {
                prereadingContent += p.textContent + " ";
            });
        });
        
        // Speak the full content
        window.narrator.speak(prereadingContent);
    }
}

/**
 * Save reflection text from the pre-reading module
 */
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    const feedbackElement = document.getElementById('reflectionFeedback');
    
    if (reflectionText.length < 10) {
        feedbackElement.textContent = 'Please write at least a few sentences to share your thoughts.';
        feedbackElement.className = 'feedback-message error show';
        return;
    }
    
    // Save reflection (in a real application, this would likely send data to a server)
    console.log('Reflection saved:', reflectionText);
    feedbackElement.textContent = 'Your reflection has been saved!';
    feedbackElement.className = 'feedback-message success show';
    
    incrementScore(10);
    showAchievement('Reflection Complete! +10 points', 'You\'ve shared your valuable thoughts.');
    
    // Narrate feedback
    if (window.narrator) {
        window.narrator.speak("Thank you for sharing your reflection. Your thoughts have been saved.");
    }
    
    // Hide feedback after a delay
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 3000);
}

/**
 * Check vocabulary exercise answers
 */
function checkVocabulary() {
    const vocab1 = document.getElementById('vocab1').value;
    const vocab2 = document.getElementById('vocab2').value;
    const vocab3 = document.getElementById('vocab3').value;
    const vocab4 = document.getElementById('vocab4').value;
    const vocab5 = document.getElementById('vocab5').value;
    const vocab6 = document.getElementById('vocab6').value;
    
    const feedbackElement = document.getElementById('vocabFeedback');
    
    // Check if all questions are answered
    if (!vocab1 || !vocab2 || !vocab3 || !vocab4 || !vocab5 || !vocab6) {
        feedbackElement.textContent = 'Please answer all questions before checking.';
        feedbackElement.className = 'feedback-message warning show';
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak("Please answer all vocabulary questions before checking your answers.");
        }
        return;
    }
    
    // Check answers (these are the correct values)
    const correctAnswers = {
        vocab1: 'worthy',
        vocab2: 'grief',
        vocab3: 'discontent',
        vocab4: 'lost',
        vocab5: 'grieved',
        vocab6: 'lifeless'
    };
    
    let score = 0;
    if (vocab1 === correctAnswers.vocab1) score++;
    if (vocab2 === correctAnswers.vocab2) score++;
    if (vocab3 === correctAnswers.vocab3) score++;
    if (vocab4 === correctAnswers.vocab4) score++;
    if (vocab5 === correctAnswers.vocab5) score++;
    if (vocab6 === correctAnswers.vocab6) score++;
    
    // Calculate percentage score
    const percentage = Math.round((score / 6) * 100);
    
    // Provide feedback
    if (percentage === 100) {
        feedbackElement.textContent = 'Perfect! All answers are correct.';
        feedbackElement.className = 'feedback-message success show';
        incrementScore(20);
        showAchievement('Vocabulary Master! +20 points', 'You got all vocabulary answers correct.');
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak("Excellent! You got all the vocabulary answers correct.");
        }
    } else if (percentage >= 70) {
        feedbackElement.textContent = `Good job! You got ${score} out of 6 answers correct.`;
        feedbackElement.className = 'feedback-message success show';
        incrementScore(10);
        showAchievement('Vocabulary Explorer! +10 points', 'You got most vocabulary answers correct.');
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak(`Good job! You got ${score} out of 6 vocabulary answers correct.`);
        }
    } else {
        feedbackElement.textContent = `You got ${score} out of 6 answers correct. Try again!`;
        feedbackElement.className = 'feedback-message error show';
        incrementScore(5);
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak(`You got ${score} out of 6 vocabulary answers correct. Try again!`);
        }
    }
    
    // Hide feedback after a delay
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 5000);
}

/**
 * Handle matching game interactions
 * @param {HTMLElement} element - The clicked element
 * @param {string} type - Type of element ('term' or 'def')
 */
function selectMatch(element, type) {
    // Check if element is already matched correctly
    if (element.classList.contains('correct')) {
        return;
    }
    
    // Get currently selected item of the opposite type
    const otherType = type === 'term' ? 'def' : 'term';
    const otherSelected = document.querySelector(`.match-item.selected[data-match][onclick*="${otherType}"]`);
    
    // If there's already a selected item of this type, deselect it
    const currentlySelected = document.querySelector(`.match-item.selected[onclick*="${type}"]`);
    if (currentlySelected) {
        currentlySelected.classList.remove('selected');
    }
    
    // Select this item
    element.classList.add('selected');
    
    // Check for match if we have both types selected
    if (otherSelected) {
        const thisMatch = element.getAttribute('data-match');
        const otherMatch = otherSelected.getAttribute('data-match');
        
        if (thisMatch === otherMatch) {
            // Correct match
            element.classList.remove('selected');
            element.classList.add('correct');
            otherSelected.classList.remove('selected');
            otherSelected.classList.add('correct');
            
            // Check if all items are matched
            checkAllMatched();
        } else {
            // Incorrect match - flash both items
            element.classList.add('incorrect');
            otherSelected.classList.add('incorrect');
            
            setTimeout(() => {
                element.classList.remove('incorrect', 'selected');
                otherSelected.classList.remove('incorrect', 'selected');
            }, 800);
        }
    }
}

/**
 * Check if all match items are correctly matched
 */
function checkAllMatched() {
    const allItems = document.querySelectorAll('.match-item');
    const correctItems = document.querySelectorAll('.match-item.correct');
    
    if (allItems.length > 0 && correctItems.length === allItems.length) {
        const feedbackElement = document.getElementById('matchFeedback');
        feedbackElement.textContent = 'Great job! You matched all items correctly.';
        feedbackElement.className = 'feedback-message success show';
        
        incrementScore(15);
        showAchievement('Matching Master! +15 points', 'You successfully matched all word meanings.');
        
        // Hide feedback after a delay
        setTimeout(() => {
            feedbackElement.classList.remove('show');
        }, 5000);
    }
}

/**
 * Check contractions exercise answers
 */
function checkContractions() {
    const inputs = document.querySelectorAll('.contraction-input');
    let correct = 0;
    let total = 0;
    
    inputs.forEach(input => {
        const expectedAnswer = input.getAttribute('data-answer').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();
        
        if (expectedAnswer.includes('/')) {
            // Multiple possible answers (separated by /)
            const possibleAnswers = expectedAnswer.split('/');
            const isCorrect = possibleAnswers.some(answer => userAnswer === answer.trim());
            
            if (isCorrect) {
                input.style.borderColor = '#4caf50';
                correct++;
            } else {
                input.style.borderColor = '#f44336';
            }
        } else {
            // Single answer
            if (userAnswer === expectedAnswer) {
                input.style.borderColor = '#4caf50';
                correct++;
            } else {
                input.style.borderColor = '#f44336';
            }
        }
        
        total++;
    });
    
    // Show feedback
    const feedbackElement = document.getElementById('contractionFeedback');
    
    if (correct === total) {
        feedbackElement.textContent = 'Perfect! All answers are correct.';
        feedbackElement.className = 'feedback-message success show';
        incrementScore(15);
        showAchievement('Grammar Expert! +15 points', 'You mastered the reported speech exercise.');
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak("Perfect! You've correctly converted all the direct speech to reported speech.");
        }
    } else {
        const percentage = Math.round((correct / total) * 100);
        
        if (percentage > 60) {
            feedbackElement.textContent = `Good attempt! You got ${correct} out of ${total} correct.`;
            feedbackElement.className = 'feedback-message success show';
            incrementScore(5);
            
            // Narrate feedback
            if (window.narrator) {
                window.narrator.speak(`Good attempt! You got ${correct} out of ${total} answers correct.`);
            }
        } else {
            feedbackElement.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackElement.className = 'feedback-message error show';
            
            // Narrate feedback
            if (window.narrator) {
                window.narrator.speak(`You got ${correct} out of ${total} answers correct. Try again!`);
            }
        }
    }
    
    // Hide feedback after a delay
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 5000);
}

/**
 * Check editing exercise answers
 */
function checkEditing() {
    const inputs = document.querySelectorAll('.editing-input');
    let correct = 0;
    let total = inputs.length;
    
    inputs.forEach(input => {
        const expectedAnswer = input.getAttribute('data-answer').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();
        
        if (userAnswer === expectedAnswer) {
            input.style.borderColor = '#4caf50';
            correct++;
        } else {
            input.style.borderColor = '#f44336';
        }
    });
    
    // Show feedback
    const feedbackElement = document.getElementById('editingFeedback');
    
    if (correct === total) {
        feedbackElement.textContent = 'Perfect! All answers are correct.';
        feedbackElement.className = 'feedback-message success show';
        incrementScore(20);
        showAchievement('Editing Master! +20 points', 'You completed the editing exercise perfectly.');
    } else {
        const percentage = Math.round((correct / total) * 100);
        
        if (percentage > 60) {
            feedbackElement.textContent = `Good attempt! You got ${correct} out of ${total} correct.`;
            feedbackElement.className = 'feedback-message success show';
            incrementScore(10);
        } else {
            feedbackElement.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackElement.className = 'feedback-message error show';
            incrementScore(5);
        }
    }
    
    // Hide feedback after a delay
    setTimeout(() => {
        feedbackElement.classList.remove('show');
    }, 5000);
}

/**
 * Play the listening activity audio
 */
function playListeningActivity() {
    alert('This would play the audio about Sanchi Stupa. In a real implementation, this would stream the audio narration about the Buddhist monument.');
    
    // In a real implementation, this would play actual audio
    if (window.narrator && window.narrator.enabled) {
        const sampleText = `
            The fascinating and world famous Sanchi stupa is located on a hilltop in Sanchi town, Madhya Pradesh, India. 
            It is one of the most important Buddhist monuments that portrays Buddhist art and sculpture. 
            Starting from the third century BC through the twelfth century AD, it attracts the attention of thousands 
            of visitors round the year including national and foreign tourists, archaeologists, and historians among others.
            
            This stupa is the oldest stone structure in India that was built during the Mauryan period. 
            Originally commissioned in the third century BCE by Emperor Ashoka, this huge hemispherical dome consists 
            of a central chamber. In this chamber, the relics of Lord Buddha are placed.`;
            
        window.narrator.speak(sampleText);
    }
}

/**
 * Save listening notes
 */
function saveListeningNotes() {
    const answers = [
        document.getElementById('listeningAnswer1').value,
        document.getElementById('listeningAnswer2').value,
        document.getElementById('listeningAnswer3').value,
        document.getElementById('listeningAnswer4').value,
        document.getElementById('listeningAnswer5').value
    ];
    
    // Check if all questions have been answered
    const allAnswered = answers.every(answer => answer.trim().length > 0);
    
    if (allAnswered) {
        alert('Your answers have been saved!');
        incrementScore(15);
        showAchievement('Active Listener! +15 points', 'You completed the listening activity.');
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak("Great job! Your answers to the listening activity have been saved.");
        }
    } else {
        alert('Please answer all questions before submitting.');
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak("Please answer all questions before submitting your responses.");
        }
    }
}

/**
 * Simulate recording speaking response
 */
function recordSpeaking() {
    const notes = document.getElementById('speakingNotes').value.trim();
    
    if (notes.length < 10) {
        alert('Please write your notes first before recording your response.');
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak("Please write your notes first before recording your response.");
        }
        return;
    }
    
    alert('In a real implementation, this would record your spoken response. Your notes have been saved!');
    incrementScore(10);
    showAchievement('Speaking Practice! +10 points', 'You practiced your speaking skills.');
    
    // Narrate feedback
    if (window.narrator) {
        window.narrator.speak("Thank you for sharing your thoughts about grief and how to support those who are grieving. Your notes have been saved.");
    }
}

/**
 * Open the writing pad
 */
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    writingPad.style.display = 'block';
    document.getElementById('writingPad').focus();
}

/**
 * Save writing
 */
function saveWriting() {
    const writingText = document.getElementById('writingPad').value.trim();
    
    if (writingText.length < 50) {
        alert('Please write at least a paragraph before saving.');
        
        // Narrate feedback
        if (window.narrator) {
            window.narrator.speak("Please write at least a paragraph before saving your work.");
        }
        return;
    }
    
    alert('Your writing has been saved!');
    incrementScore(15);
    showAchievement('Thoughtful Writer! +15 points', 'You completed the writing activity.');
    
    // Narrate feedback
    if (window.narrator) {
        window.narrator.speak("Excellent! Your thoughtful writing about helping those in grief has been saved.");
    }
}

/**
 * Show resource information
 * @param {string} resourceId - ID of the resource to show
 */
function showResource(resourceId) {
    alert(`This would display the resource: ${resourceId}. In a real implementation, this would open a modal or new page with detailed information.`);
    
    // Narrate resource information based on the selected resource
    if (window.narrator) {
        switch(resourceId) {
            case 'jataka-tales':
                window.narrator.speak("Jataka tales are stories about the previous lives of the Buddha. These tales describe the adventures of people and animals who are believed to have been the Buddha himself in his past lives.");
                break;
            case 'buddha-life':
                window.narrator.speak("Siddhartha Gautama was born in Lumbini and raised in Kapilavastu. At age 29, he left his palace to seek understanding of suffering. After years of ascetic practice and meditation, he attained Enlightenment and became the Buddha, spending the rest of his life teaching the path to liberation.");
                break;
            case 'comic-template':
                window.narrator.speak("This template provides a structure for your comic strip based on Jataka tales, with panels for illustrations and space for dialogue and narration.");
                break;
            default:
                window.narrator.speak(`You've selected the ${resourceId} resource. In a complete implementation, detailed information would be provided here.`);
        }
    }
}

/**
 * Show an achievement popup
 * @param {string} title - Achievement title
 * @param {string} description - Achievement description
 */
function showAchievement(title, description) {
    const popup = document.getElementById('achievementPopup');
    const descElement = document.getElementById('achievementDesc');
    
    descElement.textContent = description;
    popup.classList.add('show');
    
    // Hide the popup after a delay
    setTimeout(() => {
        popup.classList.remove('show');
    }, 5000);
    
    // Increment completed modules count
    moduleCompleteCount++;
    document.getElementById('modulesComplete').textContent = moduleCompleteCount;
    updateProgress();
    
    // Narrate achievement if narrator is enabled
    if (window.narrator && window.narrator.enabled) {
        // Only narrate if the user hasn't disabled audio
        if (audioEnabled) {
            const achievementText = `Achievement unlocked! ${description}`;
            // Use a slight delay to avoid overlapping with other speech
            setTimeout(() => {
                window.narrator.speak(achievementText);
            }, 500);
        }
    }
}

/**
 * Increment score
 * @param {number} points - Points to add
 */
function incrementScore(points) {
    totalScoreValue += points;
    document.getElementById('totalScore').textContent = totalScoreValue;
    updateProgress();
}

/**
 * Update progress bar
 */
function updateProgress() {
    // Calculate progress as percentage of total possible score (estimate 150 as max score)
    const progress = Math.min(100, Math.floor((totalScoreValue / 150) * 100));
    const progressBar = document.getElementById('progressBar');
    
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${progress}%`;
}

/**
 * Update the timer display
 */
function updateTimer() {
    setInterval(() => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;
        
        document.getElementById('timeSpent').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

/**
 * Initialize progress tracking
 */
function initProgressTracking() {
    // Set initial values
    document.getElementById('modulesComplete').textContent = moduleCompleteCount;
    document.getElementById('totalScore').textContent = totalScoreValue;
    updateProgress();
}
