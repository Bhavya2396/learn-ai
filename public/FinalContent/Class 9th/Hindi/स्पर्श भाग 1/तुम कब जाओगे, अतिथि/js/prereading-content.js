/**
 * Pre-reading content for Chapter 3 - तुम कब जाओगे, अतिथि
 * Content and functionality for the pre-reading module
 */

// Pre-reading content data
const prereadingContent = {
    introduction: {
        title: "पाठ प्रवेश",
        content: [
            "भारतीय संस्कृति में 'अतिथि देवो भव' की परंपरा सदियों से चली आ रही है। हमारे यहाँ अतिथि का स्वागत और सत्कार एक पवित्र कर्तव्य माना जाता है।",
            "परंतु आधुनिक जीवन की व्यस्तता और बदलती जीवनशैली के कारण कभी-कभी यह परंपरा एक समस्या का रूप भी ले लेती है।",
            "शरद जोशी जी ने इसी स्थिति को अपने व्यंग्य लेख 'तुम कब जाओगे, अतिथि' में बहुत ही सहजता और हास्य के साथ प्रस्तुत किया है।"
        ]
    },
    context: {
        title: "व्यंग्य का संदर्भ",
        content: [
            "यह लेख एक ऐसे अतिथि की कहानी है जो अपने मेजबान के घर आवश्यकता से अधिक समय तक रुक जाता है।",
            "इस व्यंग्य के माध्यम से लेखक ने आधुनिक समाज की उन समस्याओं को उजागर किया है जो पारंपरिक मूल्यों और आधुनिक जीवनशैली के टकराव से उत्पन्न होती हैं।",
            "शरद जोशी की लेखनी में हास्य और व्यंग्य का अनूठा मिश्रण है जो पाठक को हंसाने के साथ-साथ सोचने पर भी मजबूर कर देता है।"
        ]
    },
    authorBackground: {
        title: "लेखक की पृष्ठभूमि",
        content: [
            "शरद जोशी हिंदी व्यंग्य साहित्य के प्रमुख हस्ताक्षर माने जाते हैं।",
            "उन्होंने अपनी रचनाओं में मध्यमवर्गीय जीवन की विसंगतियों को बहुत ही रोचक अंदाज़ में प्रस्तुत किया है।",
            "उनकी भाषा सरल और सहज है, जिसमें मुहावरों और व्यंग्य का प्रभावी प्रयोग देखने को मिलता है।"
        ]
    }
};

// Reflection questions for the pre-reading module
const reflectionQuestions = [
    {
        id: 'reflection1',
        question: "आपके अनुसार, आधुनिक युग में 'अतिथि देवो भव' की उक्ति की क्या प्रासंगिकता है?",
        options: [
            {
                id: 'opt1',
                text: "आज भी अतिथि सत्कार हमारी संस्कृति का महत्वपूर्ण हिस्सा है, लेकिन इसे संयम और समझदारी के साथ करना चाहिए।",
                feedback: "यह एक संतुलित दृष्टिकोण है। आपने परंपरा और आधुनिकता के बीच सामंजस्य की बात की है।"
            },
            {
                id: 'opt2', 
                text: "आधुनिक जीवन की व्यस्तता के कारण पारंपरिक आतिथ्य सत्कार में संशोधन की आवश्यकता है।",
                feedback: "यह एक व्यावहारिक सोच है। आपने समय की मांग को समझा है।"
            },
            {
                id: 'opt3',
                text: "अतिथि और मेजबान दोनों को एक-दूसरे की स्थिति को समझना चाहिए और मर्यादा का पालन करना चाहिए।",
                feedback: "बहुत अच्छा विचार! आपने दोनों पक्षों की जिम्मेदारी को समझा है।"
            },
            {
                id: 'opt4',
                text: "शरद जोशी की तरह हमें भी सामाजिक समस्याओं को हास्य-व्यंग्य के माध्यम से प्रस्तुत करना चाहिए।",
                feedback: "रचनात्मक सोच! व्यंग्य वास्तव में समाज में बदलाव लाने का प्रभावी माध्यम है।"
            }
        ]
    }
];

// Initialize pre-reading content when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load pre-reading content when the module is activated
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            if (this.textContent.includes('पाठ प्रवेश')) {
                setTimeout(initializePrereadingContent, 100);
            }
        });
    });

    // Also initialize if pre-reading is initially active
    if (document.querySelector('.nav-item.active') && 
        document.querySelector('.nav-item.active').textContent.includes('पाठ प्रवेश')) {
        setTimeout(initializePrereadingContent, 100);
    }
});

// Function to initialize pre-reading content
function initializePrereadingContent() {
    // Content is already in HTML, just add interactions
    setupReflectionInteraction();
    
    // Add content enhancement
    enhancePrereadingDisplay();
}

// Function to setup reflection interaction
function setupReflectionInteraction() {
    const reflectionOptions = document.querySelectorAll('.reflection-option input[type="radio"]');
    
    reflectionOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Remove previous selection highlighting
            document.querySelectorAll('.reflection-option').forEach(opt => {
                opt.classList.remove('selected-option', 'highlighted');
            });
            
            // Highlight selected option
            const selectedContainer = this.closest('.reflection-option');
            selectedContainer.classList.add('selected-option', 'highlighted');
            
            // Add visual feedback
            selectedContainer.style.transition = 'all 0.3s ease';
            selectedContainer.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                selectedContainer.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// Function to enhance pre-reading display
function enhancePrereadingDisplay() {
    // Add reading progress indicator
    addReadingProgressIndicator();
    
    // Add interactive elements
    addInteractiveElements();
}

// Function to add reading progress indicator
function addReadingProgressIndicator() {
    const prereadingModule = document.getElementById('prereading');
    if (!prereadingModule) return;
    
    const contentBlocks = prereadingModule.querySelectorAll('.content-block p');
    let readParagraphs = 0;
    
    // Add intersection observer to track reading progress
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('read');
                readParagraphs++;
                updateReadingProgress(readParagraphs, contentBlocks.length);
            }
        });
    }, { threshold: 0.8 });
    
    contentBlocks.forEach(p => {
        observer.observe(p);
    });
}

// Function to update reading progress
function updateReadingProgress(read, total) {
    const progressElement = document.querySelector('.prereading-progress');
    if (!progressElement) {
        // Create progress element if it doesn't exist
        const progressHTML = `
            <div class="prereading-progress">
                <div class="progress-bar-small">
                    <div class="progress-fill-small" style="width: 0%"></div>
                </div>
                <span class="progress-text">पढ़ाई प्रगति: 0%</span>
            </div>
        `;
        
        const prereadingCard = document.querySelector('#prereading .exercise-card');
        if (prereadingCard) {
            prereadingCard.insertAdjacentHTML('afterbegin', progressHTML);
        }
    }
    
    const progressBar = document.querySelector('.progress-fill-small');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar && progressText) {
        const percentage = Math.round((read / total) * 100);
        progressBar.style.width = percentage + '%';
        progressText.textContent = `पढ़ाई प्रगति: ${percentage}%`;
    }
}

// Function to add interactive elements
function addInteractiveElements() {
    // Add click-to-highlight functionality for key terms
    const keyTerms = [
        'अतिथि देवो भव',
        'आतिथ्य',
        'मेजबान',
        'व्यंग्य',
        'सामाजिक विसंगति'
    ];
    
    const prereadingModule = document.getElementById('prereading');
    if (!prereadingModule) return;
    
    keyTerms.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        const walker = document.createTreeWalker(
            prereadingModule,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes(term)) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            const parent = textNode.parentNode;
            const newHTML = textNode.textContent.replace(regex, 
                `<span class="key-term" data-term="${term}">$&</span>`);
            
            const wrapper = document.createElement('span');
            wrapper.innerHTML = newHTML;
            parent.replaceChild(wrapper, textNode);
        });
    });
    
    // Add click handlers for key terms
    document.querySelectorAll('.key-term').forEach(term => {
        term.addEventListener('click', function() {
            showTermDefinition(this.dataset.term, this);
        });
    });
}

// Function to show term definitions
function showTermDefinition(term, element) {
    const definitions = {
        'अतिथि देवो भव': 'अतिथि को देवता के समान मानना - यह भारतीय संस्कृति का मूल सिद्धांत है।',
        'आतिथ्य': 'मेहमानों का स्वागत सत्कार और उनकी देखभाल करना।',
        'मेजबान': 'वह व्यक्ति जो अतिथि का स्वागत करता है और उसकी देखभाल करता है।',
        'व्यंग्य': 'हास्य के माध्यम से समाज की कमियों और विसंगतियों को उजागर करना।',
        'सामाजिक विसंगति': 'समाज में व्याप्त ऐसी समस्याएं जो तर्कसंगत नहीं हैं।'
    };
    
    const definition = definitions[term];
    if (!definition) return;
    
    // Remove existing tooltips
    document.querySelectorAll('.term-tooltip').forEach(tooltip => tooltip.remove());
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'term-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <strong>${term}</strong><br>
            ${definition}
            <button class="tooltip-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = (rect.bottom + window.scrollY + 10) + 'px';
    tooltip.style.left = (rect.left + window.scrollX) + 'px';
    tooltip.style.zIndex = '1000';
    
    document.body.appendChild(tooltip);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 5000);
    
    // Highlight the term temporarily
    element.classList.add('term-highlighted');
    setTimeout(() => {
        element.classList.remove('term-highlighted');
    }, 2000);
}

// Enhanced save reflection function
function saveReflection() {
    console.log("Enhanced saveReflection function called");
    const selectedOption = document.querySelector('input[name="reflection"]:checked');
    const feedbackEl = document.getElementById('reflectionFeedback');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया कोई एक विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        
        // Add shake animation to options
        document.querySelector('.reflection-options').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.reflection-options').classList.remove('shake');
        }, 500);
        
        return;
    }
    
    const selectedValue = selectedOption.value;
    
    // Remove highlighting from all options first
    document.querySelectorAll('.reflection-option').forEach(option => {
        option.classList.remove('selected-option', 'best-option', 'good-option');
    });
    
    // Get the selected option's container div
    const selectedOptionDiv = selectedOption.closest('.reflection-option');
    
    // All options are acceptable for this exercise, but provide different feedback
    selectedOptionDiv.classList.add('selected-option', 'good-option');
    
    // Provide specific feedback based on selection
    let specificFeedback = '';
    switch(selectedValue) {
        case '1':
            specificFeedback = 'आपने परंपरा और आधुनिकता के बीच संतुलन की बात की है। यह एक परिपक्व दृष्टिकोण है।';
            break;
        case '2':
            specificFeedback = 'आपने व्यावहारिक समस्याओं को समझा है। आधुनिक जीवन में वास्तव में समायोजन की आवश्यकता है।';
            break;
        case '3':
            specificFeedback = 'उत्कृष्ट! आपने दोनों पक्षों की जिम्मेदारी को समझा है। यही सच्ची समझदारी है।';
            break;
        case '4':
            specificFeedback = 'रचनात्मक सोच! व्यंग्य वास्तव में समाज सुधार का प्रभावी माध्यम है।';
            break;
        default:
            specificFeedback = 'आपके विचार सराहनीय हैं।';
    }
    
    // Display feedback
    feedbackEl.innerHTML = `
        <strong>बधाई!</strong> आपका चिंतन सहेज लिया गया है!<br>
        <em>${specificFeedback}</em><br>
        शरद जोशी के व्यंग्य लेख में इन्हीं विषयों पर गहरी चर्चा मिलेगी।
    `;
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    updateReflectionProgress();
    
    // Add celebration animation
    selectedOptionDiv.classList.add('celebration');
    setTimeout(() => {
        selectedOptionDiv.classList.remove('celebration');
    }, 2000);
    
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak("बधाई! आपका चिंतन सहेज लिया गया है। " + specificFeedback);
    }
}

// Function to update reflection progress
function updateReflectionProgress() {
    if (typeof score !== 'undefined') {
        score += 15;
        if (document.getElementById('totalScore')) {
            document.getElementById('totalScore').textContent = score;
        }
    }
    
    if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('prereading')) {
        modulesCompleted.push('prereading');
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('पाठ प्रवेश पूर्ण!');
        }
    }
}

// Additional CSS for pre-reading enhancements
const prereadingStyles = `
<style>
.prereading-progress {
    margin: 15px 0;
    padding: 10px;
    background: rgba(139, 69, 19, 0.05);
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
}

.progress-bar-small {
    height: 8px;
    background: rgba(0,0,0,0.1);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
}

.progress-fill-small {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    transition: width 0.5s ease;
}

.progress-text {
    font-size: 0.9rem;
    color: var(--primary-color);
    font-weight: 500;
}

.key-term {
    background: linear-gradient(to bottom, transparent 60%, #ffeb3b 60%);
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 3px;
    transition: all 0.3s ease;
    position: relative;
}

.key-term:hover {
    background: #ffeb3b;
    transform: scale(1.05);
}

.key-term.term-highlighted {
    background: #ff9800;
    color: white;
    animation: termPulse 0.5s ease;
}

@keyframes termPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.term-tooltip {
    position: absolute;
    z-index: 1000;
    animation: tooltipFadeIn 0.3s ease;
}

.tooltip-content {
    background: #333;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    max-width: 300px;
    position: relative;
    font-size: 0.9rem;
    line-height: 1.4;
}

.tooltip-close {
    position: absolute;
    top: 5px;
    right: 8px;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    text-align: center;
}

@keyframes tooltipFadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.reflection-options.shake {
    animation: shake 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.reflection-option.celebration {
    animation: celebration 2s ease;
}

@keyframes celebration {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.05) rotate(1deg); }
    50% { transform: scale(1.1) rotate(-1deg); }
    75% { transform: scale(1.05) rotate(1deg); }
}

.content-block p.read {
    position: relative;
}

.content-block p.read::after {
    content: '✓';
    position: absolute;
    right: -25px;
    top: 0;
    color: #4caf50;
    font-weight: bold;
    opacity: 0;
    animation: checkMarkFade 1s ease forwards;
}

@keyframes checkMarkFade {
    from { opacity: 0; transform: scale(0); }
    to { opacity: 1; transform: scale(1); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .tooltip-content {
        max-width: 250px;
        font-size: 0.8rem;
    }
    
    .term-tooltip {
        position: fixed;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%);
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', prereadingStyles);
