/**
 * Activities JavaScript for Kathmandu lesson
 */

// Listening activity content
const listeningActivity = {
    audio: "bhitarkanika-visit.mp3", // This would be the actual audio file in a real implementation
    transcript: `The sun was warm but the sea breeze kept up its cooling effect all along. Soon the steamer turned away and anchored near a creek by the river. The muddy fringe and the mangrove vegetation declared the gateway to the Bhitarkanika Wildlife Sanctuary in Odisha. The steamer could not negotiate these creeks at low tide, so a similar motorboat was hired to ferry us to the Dangmal forest rest-house in the heart of the mangrove forest. From the motorboat we had a good look at a large crocodile basking in the sun.

The boat moved on, taking us deeper into the forest. Here we felt as though we had stepped into a time warp. In this awesome and mysterious place, birds of extraordinary plumage appeared before us. For the moment we revelled in the magnificence of nature which had us completely in its thrall. Among the birds, the kingfishers were the stars of the show. Crocodiles, large and small, slid into the water at our approach. Through the foliage we could see chital deer delicately browsing on fresh outcrops of leaves.

A herd of wild boar was spotted searching for succulent roots. High above us, open-billed storks stood sentry-like following our progress through their remarkable kingdom. The evening sun was beginning to paint the tree-lined horizon crimson and gold and a brooding silence enveloped us all.`,
    questions: [
        "Where was the author going?",
        "Where was the forest rest-house? How did the group manage to get there?",
        "Which creature did they see first?",
        "What does the author mean by 'the magnificence of nature'?",
        "How are the kingfishers and the open-billed storks described?",
        "What were the chital deer and the wild boar doing when the motorboat went past them?"
    ],
    sampleAnswers: [
        "The author was going to the Bhitarkanika Wildlife Sanctuary in Odisha.",
        "The forest rest-house was at Dangmal, in the heart of the mangrove forest. The group hired a motorboat to ferry them there because the steamer could not navigate the creeks at low tide.",
        "They first saw a large crocodile basking in the sun from the motorboat.",
        "The author is referring to the extraordinary beauty and diversity of wildlife they encountered, including birds with beautiful plumage, crocodiles, deer, wild boar, and storks, all in their natural habitat.",
        "The kingfishers are described as 'the stars of the show' among the birds, suggesting they were particularly impressive. The open-billed storks are described as standing 'sentry-like' high above them, watching their progress through the forest.",
        "The chital deer were 'delicately browsing on fresh outcrops of leaves' while the wild boar were 'spotted searching for succulent roots'."
    ]
};

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize activity-specific event listeners and functionality
    
    // Set up listening activity if it exists on the page
    setupListeningActivity();
    
    // Set up speaking activity if it exists on the page
    setupSpeakingActivity();
    
    // Set up matching activity if it exists on the page
    setupMatchingActivity();
    
    // Initialize other interactive elements
    initializeInteractiveElements();
});

// Set up the listening activity
function setupListeningActivity() {
    // This function would normally set up audio player controls
    // For this demo, we'll just implement the function to narrate the transcript
    
    const playButton = document.querySelector('.listening-activity .interactive-btn');
    if (!playButton) return;
    
    playButton.addEventListener('click', function() {
        // In a real implementation, this would play an audio file
        if (window.narrator) {
            // Break the transcript into sections for easier listening
            const sections = listeningActivity.transcript.split('\n\n');
            
            // Create a function to speak sections sequentially
            function speakNextSection(index = 0) {
                if (index >= sections.length) {
                    // Done speaking, prompt user to answer questions
                    setTimeout(() => {
                        window.narrator.speak("Now, please answer the questions about what you heard.");
                    }, 1000);
                    return;
                }
                
                // Set callback for when this section ends
                window.narrator.onEndCallback = function() {
                    // Small pause between sections
                    setTimeout(() => {
                        speakNextSection(index + 1);
                    }, 1000);
                };
                
                // Speak the current section
                window.narrator.speak(sections[index]);
            }
            
            // Start speaking with introduction
            window.narrator.speak("A Visit to Bhitarkanika. Please listen carefully to the following passage.");
            
            // When introduction is done, start the main transcript
            window.narrator.onEndCallback = function() {
                setTimeout(() => {
                    speakNextSection(0);
                }, 500);
            };
        } else {
            console.log("Audio narration is not available. Please read the transcript in your textbook.");
        }
    });
    
    // Set up answer saving functionality
    const answerSubmitButton = document.querySelector('.listening-questions .interactive-btn');
    if (answerSubmitButton) {
        answerSubmitButton.addEventListener('click', function() {
            saveListeningAnswers();
        });
    }
}

// Set up the speaking activity
function setupSpeakingActivity() {
    const speechTextArea = document.getElementById('speechText');
    const saveButton = document.querySelector('.speaking-activity .interactive-btn');
    
    if (!speechTextArea || !saveButton) return;
    
    saveButton.addEventListener('click', function() {
        saveSpeech();
    });
    
    // Add hint button to provide speaking prompts
    const speechSection = document.querySelector('.speaking-activity');
    if (speechSection) {
        const hintButton = document.createElement('button');
        hintButton.textContent = '💡 Get Speaking Tips';
        hintButton.className = 'interactive-btn hint-btn';
        hintButton.addEventListener('click', function() {
            // Show speaking tips
            if (window.narrator) {
                window.narrator.speak("Here are some tips for your speech: Start with a strong opening quote or question. Include personal experiences or observations about travel. Conclude with how travel broadens our perspectives.");
            }
            
            // Create a tips box
            const tipsBox = document.createElement('div');
            tipsBox.className = 'tips-box';
            tipsBox.innerHTML = `
                <h4>Speech Tips</h4>
                <ul>
                    <li>Start with a strong opening quote or question</li>
                    <li>Include personal experiences or observations about travel</li>
                    <li>Discuss how travel helps us understand different cultures</li>
                    <li>Include examples of how travel changes our perspective</li>
                    <li>Conclude with how travel broadens our horizons</li>
                </ul>
            `;
            
            // Add to the section
            speechSection.appendChild(tipsBox);
            
            // Remove after a while
            setTimeout(() => {
                tipsBox.classList.add('fade-out');
                setTimeout(() => {
                    if (tipsBox.parentNode) {
                        tipsBox.parentNode.removeChild(tipsBox);
                    }
                }, 500);
            }, 15000);
        });
        
        // Add the hint button before the textarea
        speechTextArea.parentNode.insertBefore(hintButton, speechTextArea);
    }
}

// Play the speaking activity content aloud
function playSpeakingActivity() {
    if (!window.narrator) {
        console.log("Audio narration is not available. Please read the content in your textbook.");
        return;
    }
    
    // Extract the speaking activity content
    const speakingSection = document.querySelector('.speaking-activity');
    if (!speakingSection) return;
    
    // Get the main instruction
    const instruction = speakingSection.querySelector('.content-block p').textContent.trim();
    
    // Get the quotes
    const quotes = Array.from(speakingSection.querySelectorAll('blockquote')).map(quote => {
        return quote.textContent.trim();
    });
    
    // Prepare the full text for narration
    let fullText = "Speaking Activity. " + instruction + " ";
    
    // Add each quote with proper introduction
    quotes.forEach((quote, index) => {
        if (index === 0) {
            fullText += "Here are some inspiring quotes about travel to help you prepare your speech. First quote: " + quote + ". ";
        } else {
            fullText += "Second quote: " + quote + ". ";
        }
    });
    
    fullText += "Now think about these quotes and prepare your own speech about how travel broadens our perspectives and enriches our lives.";
    
    // Speak the content
    window.narrator.speak(fullText);
    
    // Show a visual indicator that the content is being narrated
    const playButton = speakingSection.querySelector('button[onclick="playSpeakingActivity()"]');
    if (playButton) {
        const originalText = playButton.textContent;
        playButton.textContent = '🔊 Playing...';
        playButton.disabled = true;
        
        // Reset button when narration ends
        if (window.narrator.onEndCallback) {
            window.narrator.onEndCallback = function() {
                playButton.textContent = originalText;
                playButton.disabled = false;
                window.narrator.onEndCallback = null;
            };
        }
    }
}

// Set up matching activity for learning interactive vocabulary
function setupMatchingActivity() {
    // This would normally set up drag and drop functionality
    // For this demo, we'll just use click-based selection
    
    const matchItems = document.querySelectorAll('.match-item');
    if (!matchItems.length) return;
    
    let selectedTerm = null;
    let selectedDef = null;
    
    matchItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemType = this.getAttribute('data-type');
            const matchId = this.getAttribute('data-match');
            
            if (itemType === 'term') {
                // Deselect any previously selected term
                document.querySelectorAll('.match-item.selected-term').forEach(i => {
                    i.classList.remove('selected-term');
                });
                
                // Select this term
                this.classList.add('selected-term');
                selectedTerm = matchId;
            } else {
                // Deselect any previously selected definition
                document.querySelectorAll('.match-item.selected-def').forEach(i => {
                    i.classList.remove('selected-def');
                });
                
                // Select this definition
                this.classList.add('selected-def');
                selectedDef = matchId;
            }
            
            // Check if we have a match
            if (selectedTerm && selectedDef) {
                if (selectedTerm === selectedDef) {
                    // Match found!
                    document.querySelectorAll(`.match-item[data-match="${selectedTerm}"]`).forEach(i => {
                        i.classList.add('matched');
                        i.classList.remove('selected-term', 'selected-def');
                    });
                    
                    // Reset selections
                    selectedTerm = null;
                    selectedDef = null;
                    
                    // Check if all are matched
                    const allMatched = document.querySelectorAll('.match-item:not(.matched)').length === 0;
                    if (allMatched) {
                        // All matches found!
                        document.getElementById('matchFeedback').textContent = 'Great job! All matches found!';
                        document.getElementById('matchFeedback').className = 'feedback-message show success';
                        
                        // Add points to score
                        if (typeof score !== 'undefined') {
                            score += 20;
                            document.getElementById('totalScore').textContent = score;
                        }
                        
                        if (window.narrator) {
                            window.narrator.speak("Excellent! You've correctly matched all the phrasal verbs with their meanings.");
                        }
                    }
                } else {
                    // Not a match
                    setTimeout(() => {
                        document.querySelector(`.match-item.selected-term`).classList.remove('selected-term');
                        document.querySelector(`.match-item.selected-def`).classList.remove('selected-def');
                        
                        // Reset selections
                        selectedTerm = null;
                        selectedDef = null;
                    }, 1000);
                }
            }
        });
    });
}

// Initialize other interactive elements
function initializeInteractiveElements() {
    // This would set up any other interactive elements not covered by the other setup functions
    
    // Setup click listeners for "Fun Facts" to narrate them
    const funFactItems = document.querySelectorAll('.fun-fact-item');
    funFactItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.narrator) {
                const heading = this.querySelector('h4');
                const content = this.querySelector('p');
                
                if (heading && content) {
                    window.narrator.speak(`${heading.textContent}: ${content.textContent}`);
                }
            }
        });
        
        // Add visual cue that these are clickable
        item.classList.add('clickable');
    });
    
    // Setup project resource links
    const resourceLinks = document.querySelectorAll('.project-resources a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceId = this.getAttribute('onclick').match(/showResource\('(.+?)'\)/)[1];
            
            if (typeof showResource === 'function') {
                showResource(resourceId);
            } else {
                console.error('showResource function not available');
            }
        });
    });
}

// Helper function to select a match item
function selectMatch(element, type) {
    // First, remove selection from any other item of the same type
    document.querySelectorAll(`.match-item.selected-${type}`).forEach(item => {
        item.classList.remove(`selected-${type}`);
    });
    
    // Add selection to this item
    element.classList.add(`selected-${type}`);
    
    // Check if we have both a term and definition selected
    const selectedTerm = document.querySelector('.match-item.selected-term');
    const selectedDef = document.querySelector('.match-item.selected-def');
    
    if (selectedTerm && selectedDef) {
        const termMatch = selectedTerm.getAttribute('data-match');
        const defMatch = selectedDef.getAttribute('data-match');
        
        if (termMatch === defMatch) {
            // Match found!
            selectedTerm.classList.add('matched');
            selectedDef.classList.add('matched');
            
            // Remove selection classes
            selectedTerm.classList.remove('selected-term');
            selectedDef.classList.remove('selected-def');
            
            // Check if all are matched
            const allMatched = document.querySelectorAll('.match-item:not(.matched)').length === 0;
            if (allMatched) {
                // All matches found!
                const feedbackEl = document.getElementById('matchFeedback');
                if (feedbackEl) {
                    feedbackEl.textContent = 'Great job! All matches found!';
                    feedbackEl.className = 'feedback-message show success';
                }
                
                // Add points to score
                if (typeof score !== 'undefined') {
                    score += 20;
                    document.getElementById('totalScore').textContent = score;
                }
                
                if (window.narrator) {
                    window.narrator.speak("Excellent! You've correctly matched all the items.");
                }
            }
        } else {
            // Not a match
            setTimeout(() => {
                selectedTerm.classList.remove('selected-term');
                selectedDef.classList.remove('selected-def');
            }, 1000);
        }
    }
}
