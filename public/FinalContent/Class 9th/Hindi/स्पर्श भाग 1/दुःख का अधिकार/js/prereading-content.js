/**
 * Pre-reading Content for दुःख का अधिकार Interactive Lesson
 */

// Pre-reading content data
const prereadingContentData = {
    author: {
        name: "यशपाल",
        birthYear: 1903,
        deathYear: 1976,
        birthPlace: "फिरोजपुर छावनी",
        education: "आरंभिक शिक्षा स्थानीय स्कूल में और उच्च शिक्षा लाहौर में",
        background: "विद्यार्थी काल से ही क्रांतिकारी गतिविधियों में जुट गए थे। अमर शहीद भगतसिंह आदि के साथ मिलकर इन्होंने भारतीय स्वतंत्रता आंदोलन में भाग लिया।"
    },
    works: {
        novels: ["देशद्रोही", "पार्टी कामरेड", "दादा कामरेड", "झूठा सच", "तेरी, मेरी, उसकी बात"],
        shortStories: ["ज्ञानदान", "तर्क का तूफ़ान", "पिंजड़े की उड़ान", "फूलों का कुरता", "उत्तराधिकारी"],
        autobiography: ["सिंहावलोकन"]
    },
    awards: [
        {
            work: "तेरी, मेरी, उसकी बात",
            award: "साहित्य अकादेमी पुरस्कार"
        }
    ],
    characteristics: [
        "कथा रस सर्वत्र मिलता है",
        "वर्ग-संघर्ष",
        "मनोविश्लेषण", 
        "पैना व्यंग्य"
    ],
    philosophy: "समाज को उन्नत बनाने का एक ही रास्ता है– सामाजिक समानता के साथ-साथ आर्थिक समानता।",
    language: "हिंदी के अलावा उर्दू और अंग्रेजी के शब्दों का भी बेहिचक प्रयोग किया।"
};

// Story context
const storyContext = {
    theme: "देश में फैले अंधविश्वासों और ऊँच-नीच के भेद-भाव को बेनकाब करते हुए यह बताती है कि दुःख की अनुभूति सभी को समान रूप से होती है।",
    socialIssues: [
        "धनी लोगों की अमानवीयता",
        "गरीबों की मजबूरी",
        "सामाजिक असमानता",
        "दुःख मनाने के अधिकार का अभाव"
    ],
    message: "यह सही है कि दुःख सभी को तोड़ता है, दुःख में मातम मनाना हर कोई चाहता है, दुःख के क्षण से सामना होने पर सब अवश्य हो जाते हैं, पर इस देश में ऐसे भी अभागे लोग हैं जिन्हें न तो दुःख मनाने का अधिकार, न अवकाश!"
};

// Initialize pre-reading content
function initializePrereadingContent() {
    console.log('Pre-reading content module initialized');
    
    // Add interactive elements if needed
    addInteractiveElements();
}

// Add interactive elements to pre-reading content
function addInteractiveElements() {
    // Add click handlers for author information
    const authorElements = document.querySelectorAll('.author-info');
    authorElements.forEach(element => {
        element.addEventListener('click', showAuthorDetails);
    });
    
    // Add click handlers for work information
    const workElements = document.querySelectorAll('.work-info');
    workElements.forEach(element => {
        element.addEventListener('click', showWorkDetails);
    });
}

// Show author details
function showAuthorDetails() {
    const detailsHTML = `
        <div class="author-details">
            <h4>यशपाल के बारे में विस्तृत जानकारी:</h4>
            <div class="details-content">
                <p><strong>जन्म:</strong> ${prereadingContentData.author.birthYear} में ${prereadingContentData.author.birthPlace} में</p>
                <p><strong>शिक्षा:</strong> ${prereadingContentData.author.education}</p>
                <p><strong>पृष्ठभूमि:</strong> ${prereadingContentData.author.background}</p>
                <p><strong>दर्शन:</strong> ${prereadingContentData.philosophy}</p>
                <p><strong>भाषा शैली:</strong> ${prereadingContentData.language}</p>
            </div>
        </div>
    `;
    
    showModal('लेखक परिचय', detailsHTML);
}

// Show work details
function showWorkDetails() {
    const detailsHTML = `
        <div class="work-details">
            <h4>यशपाल की प्रमुख कृतियाँ:</h4>
            <div class="details-content">
                <h5>उपन्यास:</h5>
                <ul>
                    ${prereadingContentData.works.novels.map(work => `<li>${work}</li>`).join('')}
                </ul>
                
                <h5>कहानी संग्रह:</h5>
                <ul>
                    ${prereadingContentData.works.shortStories.map(work => `<li>${work}</li>`).join('')}
                </ul>
                
                <h5>आत्मकथा:</h5>
                <ul>
                    ${prereadingContentData.works.autobiography.map(work => `<li>${work}</li>`).join('')}
                </ul>
                
                <h5>पुरस्कार:</h5>
                <ul>
                    ${prereadingContentData.awards.map(award => `<li>${award.work} - ${award.award}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    showModal('कृतियाँ और पुरस्कार', detailsHTML);
}

// Show story context
function showStoryContext() {
    const contextHTML = `
        <div class="story-context">
            <h4>कहानी का संदर्भ:</h4>
            <div class="context-content">
                <p><strong>विषयवस्तु:</strong> ${storyContext.theme}</p>
                
                <h5>सामाजिक समस्याएँ:</h5>
                <ul>
                    ${storyContext.socialIssues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
                
                <p><strong>कहानी का संदेश:</strong> ${storyContext.message}</p>
            </div>
        </div>
    `;
    
    showModal('कहानी का संदर्भ', contextHTML);
}

// Show modal
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'info-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-btn" onclick="this.parentNode.parentNode.parentNode.remove()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 20 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 20000);
}

// Show reflection options
function showReflectionOptions() {
    const options = [
        "समाज में दुःख मनाने का अधिकार सभी को समान रूप से मिलना चाहिए।",
        "यशपाल की कहानी सामाजिक असमानता पर तीखा व्यंग्य है।",
        "कहानी में दिखाया गया है कि कैसे आर्थिक तंगी लोगों को प्रभावित करती है।",
        "मानवीय संवेदना और दुःख की अनुभूति सभी में समान होती है।"
    ];
    
    const optionsHTML = `
        <div class="reflection-options">
            <h4>अपने विचार चुनिए:</h4>
            <div class="options-list">
                ${options.map((option, index) => `
                    <div class="reflection-option">
                        <input type="radio" id="reflection${index + 1}" name="reflection" value="${index + 1}">
                        <label for="reflection${index + 1}">${option}</label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    return optionsHTML;
}

// Initialize pre-reading content when the module is shown
document.addEventListener('DOMContentLoaded', function() {
    // Initialize pre-reading content when prereading module is loaded
    const originalShowModule = window.showModule;
    window.showModule = function(moduleId) {
        originalShowModule(moduleId);
        if (moduleId === 'prereading') {
            setTimeout(initializePrereadingContent, 100);
        }
    };
});

// Make functions globally available
window.initializePrereadingContent = initializePrereadingContent;
window.showAuthorDetails = showAuthorDetails;
window.showWorkDetails = showWorkDetails;
window.showStoryContext = showStoryContext;
window.showReflectionOptions = showReflectionOptions;
