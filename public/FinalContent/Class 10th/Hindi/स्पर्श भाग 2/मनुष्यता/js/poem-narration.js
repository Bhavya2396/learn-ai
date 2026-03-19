/**
 * Poem Narration Functionality
 * Enables immediate narration of poems when clicked
 */

// Initialize poem narration functionality
function initializePoemNarration() {
    console.log('Initializing poem narration functionality...');
    
    // Find all poem containers
    const poemContainers = document.querySelectorAll('.poem-container');
    
    if (poemContainers.length === 0) {
        console.log('No poem containers found on the page.');
        return;
    }
    
    console.log(`Found ${poemContainers.length} poem containers.`);
    
    // Current audio element being played
    let currentAudio = null;
    
    // Add click event listeners to each poem container
    poemContainers.forEach(container => {
        // Add a visual indicator that this element is clickable
        container.style.cursor = 'pointer';
        
        // Add a play icon to indicate this is clickable for narration
        const playIcon = document.createElement('div');
        playIcon.className = 'poem-play-icon';
        playIcon.innerHTML = '▶️';
        playIcon.style.position = 'absolute';
        playIcon.style.top = '10px';
        playIcon.style.right = '10px';
        playIcon.style.fontSize = '24px';
        playIcon.style.opacity = '0.7';
        playIcon.style.transition = 'opacity 0.3s ease';
        
        // Only add the play icon if the container is positioned relative or absolute
        const containerPosition = window.getComputedStyle(container).position;
        if (containerPosition === 'static') {
            container.style.position = 'relative';
        }
        
        container.appendChild(playIcon);
        
        // Show/hide play icon on hover
        container.addEventListener('mouseenter', () => {
            playIcon.style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
            playIcon.style.opacity = '0.7';
        });
        
        // Add click event listener
        container.addEventListener('click', function(event) {
            // Track user interaction for autoplay policy
            if (typeof trackUserInteraction === 'function') {
                trackUserInteraction();
            }
            
            // Get the audio source from data attribute
            const audioSrc = this.getAttribute('data-audio-src');
            
            // If no audio source is specified, use speech synthesis instead
            if (!audioSrc) {
                // Stop any currently playing audio
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                    currentAudio = null;
                }
                
                // Stop any ongoing speech synthesis
                if (window.narrator && window.narrator.synth) {
                    window.narrator.synth.cancel();
                }
                
                // Get the poem text
                const poemText = this.textContent.trim();
                
                // Speak the poem text
                if (window.narrator) {
                    // Add a visual indicator that narration is active
                    this.classList.add('narrating');
                    playIcon.innerHTML = '⏸️';
                    
                    // Store reference to container for removal of class later
                    const container = this;
                    const icon = playIcon;
                    
                    // Set callback to remove indicator when narration ends
                    window.narrator.onEndCallback = function() {
                        container.classList.remove('narrating');
                        icon.innerHTML = '▶️';
                    };
                    
                    // Start narration immediately
                    window.narrator.speak(poemText);
                }
                return;
            }
            
            // Handle audio file narration
            let audio;
            
            // Check if this container already has an audio element
            audio = this.querySelector('audio');
            
            if (!audio) {
                // Create new audio element if none exists
                audio = new Audio(audioSrc);
                audio.preload = 'metadata';
                
                // Hide the audio element but keep it accessible
                audio.style.display = 'none';
                this.appendChild(audio);
            }
            
            // Stop any currently playing audio
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                
                // Reset the play icon on the previously playing container
                document.querySelectorAll('.poem-container').forEach(cont => {
                    if (cont !== this && cont.classList.contains('narrating')) {
                        cont.classList.remove('narrating');
                        const icon = cont.querySelector('.poem-play-icon');
                        if (icon) icon.innerHTML = '▶️';
                    }
                });
            }
            
            // Stop any ongoing speech synthesis
            if (window.narrator && window.narrator.synth) {
                window.narrator.synth.cancel();
            }
            
            // If this audio is already playing, restart it
            if (!audio.paused) {
                audio.currentTime = 0;
            } else {
                // Otherwise, play it
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error('Error playing audio:', error);
                        
                        // Fallback to speech synthesis if audio playback fails
                        if (window.narrator) {
                            const poemText = this.textContent.trim();
                            window.narrator.speak(poemText);
                        }
                    });
                }
            }
            
            // Update current audio reference
            currentAudio = audio;
            
            // Add visual indicator
            this.classList.add('narrating');
            playIcon.innerHTML = '⏸️';
            
            // Remove indicator when audio ends
            audio.onended = () => {
                this.classList.remove('narrating');
                playIcon.innerHTML = '▶️';
                currentAudio = null;
            };
        });
    });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize poem narration
    initializePoemNarration();
});
