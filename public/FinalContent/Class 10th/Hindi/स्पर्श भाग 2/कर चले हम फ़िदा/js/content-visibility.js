/**
 * Script to hide specific content on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Track if we're in the Kavita/story tab
    let inKavitaTab = false;
    
    // Function to check which tab is active
    const checkActiveTab = function() {
        const storyTab = document.getElementById('story');
        inKavitaTab = storyTab && storyTab.classList.contains('active');
        return inKavitaTab;
    };
    
    // Function to manage author bio visibility
    const manageAuthorBio = function() {
        // Find the author introduction content container
        const authorBioContainer = document.querySelector('#storyPart1');
        
        // Only hide in non-story tabs
        if (authorBioContainer) {
            if (checkActiveTab()) {
                // In Kavita tab - show the author bio
                authorBioContainer.style.display = '';
            } else {
                // Not in Kavita tab - hide the author bio
                authorBioContainer.style.display = 'none';
            }
        }
        
        // Handle paragraphs with author bio content
        const allContentElements = document.querySelectorAll('p');
        allContentElements.forEach(element => {
            // Check if the paragraph contains the author's name and birthdate
            if (element.textContent.includes('कैफ़ी आज़मी का जन्म 19 जनवरी 1919')) {
                const parentElement = element.closest('.story-part');
                // If it's not in a story part container or we're not in the kavita tab, hide it
                if (!parentElement || !checkActiveTab()) {
                    element.style.display = 'none';
                } else {
                    element.style.display = '';
                }
            }
        });
    };
    
    // Add tab switch listener
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Small delay to ensure the tab has changed
            setTimeout(manageAuthorBio, 50);
        });
    });
    
    // Also add story navigation button listeners
    const storyNavButtons = document.querySelectorAll('.story-nav-btn');
    storyNavButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Small delay to ensure the part has changed
            setTimeout(manageAuthorBio, 50);
        });
    });
    
    // Run after a slight delay to ensure the DOM is fully loaded
    setTimeout(manageAuthorBio, 100);
    
    // Re-run after a longer delay to catch delayed loading
    setTimeout(manageAuthorBio, 1000);
});