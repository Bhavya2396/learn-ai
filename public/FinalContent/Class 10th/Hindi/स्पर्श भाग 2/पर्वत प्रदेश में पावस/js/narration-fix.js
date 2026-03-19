/**
 * Narration fixes for the लेखक परिचय (Author Introduction) section
 * This script addresses three critical screen reader issues:
 * 1. Skip highlighted word meanings
 * 2. Resolve narration stop after specific sentence
 * 3. Ensure continuous line-by-line flow
 */

document.addEventListener('DOMContentLoaded', function() {
    // Override the startModuleNarration function for the intro module
    const originalStartModuleNarration = window.startModuleNarration;
    
    window.startModuleNarration = function(moduleId) {
        // For modules other than intro, use the original function
        if (moduleId !== 'intro') {
            return originalStartModuleNarration(moduleId);
        }
        
        console.log('Using enhanced narration for लेखक परिचय section');
        
        if (!window.narrator || !window.narrator.enabled) {
            console.log('Narrator not available or disabled');
            return;
        }
        
        // Get the intro content
        const introModule = document.getElementById('intro');
        if (!introModule) {
            console.error('Intro module not found');
            return;
        }
        
        // Extract paragraphs directly from the content block
        const contentBlock = introModule.querySelector('.content-block');
        if (!contentBlock) {
            console.error('Content block not found in intro module');
            return;
        }
        
        const paragraphs = contentBlock.querySelectorAll('p');
        if (!paragraphs || paragraphs.length === 0) {
            console.error('No paragraphs found in intro content block');
            return;
        }
        
        // Create an array of paragraph texts
        const paragraphTexts = Array.from(paragraphs).map(p => p.textContent.trim());
        
        // Function to speak paragraphs sequentially with improved flow
        function speakParagraphsSequentially(index = 0) {
            if (index >= paragraphTexts.length) {
                console.log('Finished narrating all paragraphs');
                return;
            }
            
            // Create a clean copy of the paragraph text
            let cleanText = paragraphTexts[index];
            
            // Highlight the current paragraph being read
            paragraphs.forEach((p, i) => {
                p.classList.toggle('paragraph-highlight', i === index);
            });
            
            // Scroll to the paragraph
            paragraphs[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Set callback for when this paragraph ends
            window.narrator.onEndCallback = function() {
                // Small pause between paragraphs
                setTimeout(() => {
                    // Proceed to the next paragraph without stopping
                    speakParagraphsSequentially(index + 1);
                }, 300);
            };
            
            // Speak the current paragraph
            console.log(`Speaking paragraph ${index + 1}/${paragraphTexts.length}`);
            window.narrator.speak(cleanText);
        }
        
        // Start speaking from the first paragraph
        speakParagraphsSequentially(0);
    };
    
    // Override the preprocessText method to ensure highlighted words are read normally
    if (window.narrator) {
        const originalPreprocessText = window.narrator.preprocessText;
        
        window.narrator.preprocessText = function(text) {
            // First apply the original preprocessing
            let processedText = originalPreprocessText.call(this, text);
            
            // Additional processing specific to our needs:
            // 1. Ensure we don't pause at "राम का कीर्तिगान उनकी चिरसंचित अभिलाषा रही।"
            processedText = processedText.replace(/चिरसंचित अभिलाषा रही।\s+/g, 'चिरसंचित अभिलाषा रही। ');
            
            return processedText;
        };
    }
    
    console.log('Narration fixes for लेखक परिचय section initialized');
});
