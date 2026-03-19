/**
 * Story content for Role of Music in Life interactive lesson
 */

// Text content for the three texts
const storyTexts = {
    // Text I - Role of Music in Life
    part1: `
        <div class="story-part active" id="story-part-1">
            <h3 class="story-part-title">Text I: Role of Music in Life</h3>
            
            <p>Today, we are rushing through life and everyone seems to be pressurised and stressed about one or the other thing. <span class="highlight-vocab" data-definition="unable to be avoided or denied">Stress has become an inescapable part of our lives</span>. Many of our illnesses are a result of stress, and to deal with it, we need certain ways to relax our body and mind. Listening to music, particularly gentle, calming and melodious music, relaxes people both physically and mentally. Music releases endorphins, the natural painkillers in our brain, which relieve us from the sense of pain.</p>
            
            <div class="vocabulary-note">
                <span class="word">inescapable:</span> <span class="definition">unable to be avoided or denied</span>
            </div>
            
            <p>Music can normalise heart rate and blood pressure. The common occurrences of fatigue and boredom decrease when we listen to music. It diverts our attention from everyday anxieties, thereby reducing the stress caused by such concerns. While meditating, listening to music helps us to connect with our soul.</p>
            
            <p>Students can improve their concentration and boost their memory by listening to soft music. Soothing music, when played at night, helps us to rest and relax for a good night's sleep. Listening to good music helps in overcoming negative traits such as anger or worry, thereby improving our personality. It creates positive energy and happiness. Every cell in the body becomes energetic with increased peace of mind.</p>
            
            <p>Music is a therapy for everyone — plants, birds, animals and human beings — to flourish and rejuvenate. It certainly plays an important part in making the world better for all living beings.</p>
            
            <div class="comprehension-check">
                <h3>Quick Check:</h3>
                <ol>
                    <li>What kind of music helps to relax people physically and mentally?</li>
                    <li>How does music help students?</li>
                    <li>What are endorphins?</li>
                </ol>
            </div>
        </div>
    `,
    
    // Text II - Beating the Odds
    part2: `
        <div class="story-part" id="story-part-2">
            <h3 class="story-part-title">Text II: Beating the Odds</h3>
            
            <p>The musical accomplishments of composer Ludwig van Beethoven have been all the more remarkable for the fact that he lost his hearing ability from an early age. He developed the symptoms of tinnitus, a constant sound of ringing in his ears that made it difficult for him to hear. <span class="highlight-vocab" data-definition="to succeed despite not having a good chance of succeeding">He is compared to Mozart for his genius</span>, and is considered the most eminent musician after Mozart.</p>
            
            <div class="vocabulary-note">
                <span class="word">beating the odds:</span> <span class="definition">to succeed despite not having a good chance of succeeding</span>
            </div>
            
            <p>Although his formal education never went beyond the elementary level, he trained in music under Joseph Haydn. He has always been acclaimed as a brilliant piano maestro. His father and grandfather were the court musicians of a German prince. Young Ludwig was often made to perform for his father's drinking companions in the middle of the night, and was even beaten if he protested.</p>
            
            <p>For the first thirty years of his life, Beethoven could listen to and play music effortlessly. As a result, he understood sounds of musical instruments and the pitch of the singing voices. He knew the harmony between music and singing before he became completely deaf. His deafness was not sudden, but a gradual decline. This slow process of losing his hearing activated his mind to imagine how his compositions would sound like.</p>
            
            <p>When he became completely deaf, he started to observe the vibrations of the piano. The observations helped him realise that he could not hear the high notes of the piano. To be able to hear his own compositions, he sawed off the legs of his piano. The piano touched the floor, and Beethoven would press his ear to the floor, banging the piano keys to listen to the high notes in his compositions.</p>
            
            <div class="vocabulary-note">
                <span class="word">pinnacle:</span> <span class="definition">the most successful point</span>
            </div>
            
            <p>The most significant aspect of Beethoven's character was that he did not give up. With a brave heart, he confronted the greatest challenge a musician can face, and continued living his dream of composing music. Deafness could not deter him from achieving the <span class="highlight-vocab" data-definition="the most successful point">pinnacle</span> of musical success. He fought against the greatest obstacle and won.</p>
            
            <p>His quality of 'never giving up' strengthened him. It made him come to terms with his deafness in a dynamic and constructive way. These qualities led him to become a famous composer.</p>
            
            <div class="comprehension-check">
                <h3>Quick Check:</h3>
                <ol>
                    <li>What condition made it difficult for Beethoven to hear?</li>
                    <li>How did Beethoven listen to his compositions after becoming deaf?</li>
                    <li>What was Beethoven's most significant quality?</li>
                </ol>
            </div>
        </div>
    `,
    
    // Text III - The Solitary Reaper
    part3: `
        <div class="story-part" id="story-part-3">
            <h3 class="story-part-title">Text III: The Solitary Reaper</h3>
            
            <div class="poem-text">
                Behold her, single in the field, <br>
                Yon solitary Highland lass! <br>
                Reaping and singing by herself; <br>
                Stop here, or gently pass! <br>
                Alone she cuts and binds the grain, <br>
                And sings a <span class="highlight-vocab" data-definition="very great or intense">melancholy</span> strain; <br>
                O listen! for the Vale <span class="highlight-vocab" data-definition="very great or intense">profound</span> <br>
                Is overflowing with the sound. <br><br>
                
                No Nightingale did ever <span class="highlight-vocab" data-definition="old British spelling of chant; a repeated rhythmic phrase">chaunt</span> <br>
                More welcome notes to weary bands <br>
                Of travellers in some shady haunt, <br>
                Among Arabian sands: <br>
                A voice so thrilling ne'er was heard <br>
                In spring-time from the Cuckoo-bird, <br>
                Breaking the silence of the seas <br>
                Among the farthest Hebrides. <br><br>
                
                Will no one tell me what she sings? <br>
                Perhaps the plaintive numbers flow <br>
                For old, unhappy, far-off things, <br>
                And battles long ago: <br>
                Or is it some more humble lay, <br>
                Familiar matter of to-day? <br>
                Some natural sorrow, loss, or pain, <br>
                That has been, and may be again? <br><br>
                
                Whate'er the theme, the Maiden sang <br>
                As if her song could have no ending; <br>
                I saw her singing at her work, <br>
                And o'er the sickle bending; <br>
                I listened, motionless and still; <br>
                And, as I mounted up the hill, <br>
                The music in my heart I bore, <br>
                Long after it was heard no more. <br><br>
                
                —William Wordsworth
            </div>
            
            <div class="vocabulary-note">
                <span class="word">profound:</span> <span class="definition">very great or intense</span>
                <br>
                <span class="word">chaunt:</span> <span class="definition">old British spelling of chant; a repeated rhythmic phrase</span>
            </div>
            
            <div class="comprehension-check">
                <h3>Quick Check:</h3>
                <ol>
                    <li>What is the Highland lass (girl) doing in the field?</li>
                    <li>What does the poet say about the quality of the girl's singing?</li>
                    <li>What happens to the poet after he hears the song?</li>
                </ol>
            </div>
        </div>
    `
};

// Toggle read aloud functionality
function toggleReadAloud() {
    const activeStoryPart = document.querySelector('.story-part.active');
    if (!activeStoryPart) return;
    
    const partId = activeStoryPart.id;
    if (!partId) return;
    
    // Extract the part number from the ID (format: story-part-N)
    const partNumber = parseInt(partId.split('-').pop());
    if (isNaN(partNumber)) return;
    
    // Read the active part aloud
    readStoryPartAloud(partNumber, true);
}

// Highlight vocabulary words in the text
function highlightVocabulary() {
    const vocabTerms = document.querySelectorAll('.highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the story content container
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
    
    if (window.narrator) {
        window.narrator.speak("Vocabulary words have been highlighted. Click on them to hear their meanings.");
    }
}

// Toggle print-friendly mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');
    
    // Show a message that print mode is toggled
    const isPrintMode = document.body.classList.contains('print-mode');
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = isPrintMode ? 
        'Print-friendly mode enabled. Use your browser\'s print function to print.' : 
        'Print-friendly mode disabled.';
    
    // Find the story content container
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
    
    if (window.narrator) {
        window.narrator.speak(isPrintMode ? 
            "Print mode enabled. The page is now optimized for printing." : 
            "Print mode disabled.");
    }
}

// Function to show a specific part of the story
function showStoryPart(partNumber) {
    console.log(`Showing story part ${partNumber}`);
    
    // Stop any ongoing narration when switching parts
    if (window.narrator && window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration due to part switch');
        window.narrator.stop();
        
        // Clear any reading indicators from previous parts
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Clear any paragraph highlights from previous parts
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
    }
    
    // Hide all story parts
    document.querySelectorAll('.story-part').forEach(part => {
        part.classList.remove('active');
    });
    
    // Show the selected part
    const storyPart = document.getElementById(`story-part-${partNumber}`);
    if (storyPart) {
        storyPart.classList.add('active');
        
        // Scroll to top of content
        const storyContent = document.getElementById('storyContent');
        if (storyContent) storyContent.scrollTop = 0;
    } else {
        // If the part doesn't exist yet, load it dynamically
        loadStoryPart(partNumber);
        return; // loadStoryPart will call showStoryPart again
    }
    
    // Update navigation
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Find and update the clicked nav button
    const navBtns = document.querySelectorAll('.story-nav-btn');
    for (let i = 0; i < navBtns.length; i++) {
        if (i === partNumber - 1) {
            navBtns[i].classList.add('active');
            navBtns[i].setAttribute('aria-pressed', 'true');
            break;
        }
    }
    
    // Automatically start narrating the new part content after a short delay
    setTimeout(() => {
        readStoryPartAloud(partNumber, false); // false = automatic call
    }, 200);
}

// Function to load story part dynamically
function loadStoryPart(partNumber) {
    const storyContentContainer = document.getElementById('storyContent');
    const partContent = storyTexts[`part${partNumber}`];
    
    if (partContent && storyContentContainer) {
        // First check if any story parts already exist
        if (storyContentContainer.querySelectorAll('.story-part').length > 0) {
            // If they do, append the new part without replacing existing content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = partContent;
            const newPart = tempDiv.firstElementChild;
            storyContentContainer.appendChild(newPart);
            
            // Set it as active
            showStoryPart(partNumber);
        } else {
            // If no parts exist yet, simply set the content
            storyContentContainer.innerHTML = partContent;
        }
    } else {
        console.error(`Story part ${partNumber} not found or container missing`);
    }
}

// Function to read story part aloud
function readStoryPartAloud(partNumber, userInitiated = true) {
    console.log(`Reading story part ${partNumber} aloud (manual: ${userInitiated})`);
    
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    if (!window.narrator) {
        console.log('Narrator not available');
        return;
    }
    
    // Stop any ongoing narration first
    if (window.narrator.currentUtterance) {
        console.log('Stopping ongoing narration before starting new one');
        window.narrator.stop();
    }
    
    // Ensure the correct part is showing
    if (document.querySelector(`#story-part-${partNumber}:not(.active)`)) {
        showStoryPart(partNumber);
        return; // showStoryPart will call readStoryPartAloud again
    }
    
    // Get the text content without HTML tags
    const storyPart = document.getElementById(`story-part-${partNumber}`);
    if (!storyPart) return;
    
    try {
        // Show reading indicator
        const existingIndicators = storyPart.querySelectorAll('.reading-indicator');
        existingIndicators.forEach(indicator => indicator.remove());
        
        // Create reading indicator
        const readingIndicator = document.createElement('div');
        readingIndicator.className = 'reading-indicator';
        readingIndicator.id = `reading-indicator-${partNumber}`;
        readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
        storyPart.appendChild(readingIndicator);
        
        // Add stop button
        const stopButton = document.createElement('button');
        stopButton.className = 'interactive-btn stop-narration-btn';
        stopButton.innerHTML = '⏹️ Stop Reading';
        stopButton.onclick = stopNarration;
        readingIndicator.appendChild(stopButton);
        
        // Extract text from the story part
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = storyPart.innerHTML;
        
        // Get all paragraphs and remove vocabulary notes
        const paragraphs = Array.from(tempDiv.querySelectorAll('p')).filter(p => {
            // Skip if it's empty
            if (p.textContent.trim().length === 0) return false;
            
            // Skip if it's inside a vocabulary note
            if (p.closest('.vocabulary-note')) return false;
            
            // Skip if it's inside a comprehension check
            if (p.closest('.comprehension-check')) return false;
            
            // Skip if it's a button or interactive element
            if (p.closest('button') || p.tagName === 'BUTTON') return false;
            
            return true;
        });
        
        // For poems, also include the poem-text div content
        let poemText = '';
        const poem = storyPart.querySelector('.poem-text');
        if (poem) {
            poemText = poem.textContent.trim().replace(/\s+/g, ' ') + ' ';
        }
        
        // Extract text from valid paragraphs, cleaning up the content
        let storyText = paragraphs
            .map(p => {
                let text = p.textContent.trim();
                // Remove vocabulary tooltip content that might be included
                text = text.replace(/\s+/g, ' '); // Normalize whitespace
                return text;
            })
            .filter(text => text.length > 0) // Remove empty strings
            .join(' ');
        
        // Add poem text if available
        if (poemText) {
            storyText += poemText;
        }
        
        // Add title to the beginning
        const title = storyPart.querySelector('.story-part-title');
        if (title) {
            storyText = `${title.textContent}. ${storyText}`;
        }
        
        console.log(`Prepared text for narration (${storyText.length} characters)`);
        
        // Setup highlighting of paragraphs in the original document (not the tempDiv)
        const originalParagraphs = Array.from(storyPart.querySelectorAll('p')).filter(p => {
            if (p.textContent.trim().length === 0) return false;
            if (p.closest('.vocabulary-note')) return false;
            if (p.closest('.comprehension-check')) return false;
            if (p.closest('button') || p.tagName === 'BUTTON') return false;
            return true;
        });
        
        // Calculate approximate time per paragraph based on length
        window.highlightTimeouts = [];
        const totalTextLength = originalParagraphs.reduce((sum, p) => sum + p.textContent.length, 0);
        let cumulativeLength = 0;
        
        // Estimate total reading time (about 15 characters per second)
        const totalReadingTime = totalTextLength / 15 * 1000;
        
        // Highlight each paragraph at the appropriate time
        originalParagraphs.forEach((paragraph, index) => {
            const textLength = paragraph.textContent.length;
            const startPercentage = cumulativeLength / totalTextLength;
            cumulativeLength += textLength;
            
            // Calculate when to highlight this paragraph
            const highlightTime = startPercentage * totalReadingTime;
            
            // Set timeout to add highlight
            const highlightTimeout = setTimeout(() => {
                // Remove highlight from all paragraphs
                originalParagraphs.forEach(p => p.classList.remove('paragraph-highlight'));
                
                // Add highlight to current paragraph
                paragraph.classList.add('paragraph-highlight');
                
                // No auto-scrolling
            }, highlightTime);
            
            window.highlightTimeouts.push(highlightTimeout);
        });
        
        // Clear highlights when done
        const clearHighlightsTimeout = setTimeout(() => {
            originalParagraphs.forEach(p => p.classList.remove('paragraph-highlight'));
            
            // Remove indicator if it still exists
            const indicator = document.getElementById(`reading-indicator-${partNumber}`);
            if (indicator) {
                indicator.classList.add('fade-out');
                setTimeout(() => {
                    if (indicator.parentNode) indicator.remove();
                }, 500);
            }
        }, totalReadingTime + 1000);
        
        window.highlightTimeouts.push(clearHighlightsTimeout);
        
        // Read the extracted text
        window.narrator.speak(storyText);
        
        // Register narration end event
        if (window.narrator.onEndCallback) {
            window.narrator.onEndCallback = null;
        }
        
        window.narrator.onEndCallback = function() {
            const indicator = document.getElementById(`reading-indicator-${partNumber}`);
            if (indicator) {
                indicator.classList.add('fade-out');
                setTimeout(() => {
                    if (indicator.parentNode) indicator.remove();
                }, 500);
            }
            
            // Remove all paragraph highlights
            originalParagraphs.forEach(p => p.classList.remove('paragraph-highlight'));
            
            // Clear any timeouts
            if (window.highlightTimeouts && Array.isArray(window.highlightTimeouts)) {
                window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
                window.highlightTimeouts = [];
            }
        };
    } catch (error) {
        console.error('Error starting narration:', error);
        alert('Sorry, there was an error starting the narration. Please try again.');
    }
}

// Stop ongoing narration
function stopNarration() {
    if (window.narrator) {
        window.narrator.stop();
        console.log('Narration stopped by user');
        
        // Remove all reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Remove all paragraph highlights
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
        
        // Clear any timeouts
        if (window.highlightTimeouts && Array.isArray(window.highlightTimeouts)) {
            window.highlightTimeouts.forEach(timeout => clearTimeout(timeout));
            window.highlightTimeouts = [];
        }
        
        if (window.narrator.speak) {
            window.narrator.speak('Reading stopped.');
        }
    }
}

// Initialize story content when page loads
document.addEventListener('DOMContentLoaded', function() {
    const storyContentContainer = document.getElementById('storyContent');
    if (storyContentContainer) {
        // Clear any existing content
        storyContentContainer.innerHTML = '';
        
        // Load all story parts
        for (let i = 1; i <= 3; i++) {
            const partContent = storyTexts[`part${i}`];
            if (partContent) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = partContent;
                const storyPart = tempDiv.firstElementChild;
                storyContentContainer.appendChild(storyPart);
            }
        }
        
        // Show the first part initially
        showStoryPart(1);
        
        // Add event listeners to vocabulary terms
        document.querySelectorAll('.highlight-vocab').forEach(term => {
            term.addEventListener('click', function() {
                const word = this.textContent.split('\n')[0].trim();
                const definition = this.getAttribute('data-definition');
                if (definition && window.narrator) {
                    window.narrator.speak(`${word}: ${definition}`);
                }
            });
        });
    }
});
