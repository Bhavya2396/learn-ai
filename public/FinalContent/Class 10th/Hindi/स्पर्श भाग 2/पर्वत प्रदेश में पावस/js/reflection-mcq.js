/**
 * Reflection MCQ functionality for प्रकृति पर चिंतन section
 */

// Define the MCQ options for reflection
const reflectionOptions = [
    {
        id: "reflection-option-1",
        text: "प्रकृति मेरे जीवन में महत्वपूर्ण है क्योंकि यह मुझे शांति देती है। मैं एक बार नैनीताल गया था और वहाँ का सौंदर्य अद्भुत था। पहाड़ों की हरियाली और झील का पानी देखकर मन प्रसन्न हो गया था।",
        level: "good",
        feedback: "आपने प्रकृति के साथ अपने व्यक्तिगत अनुभव का उल्लेख किया है और नैनीताल के बारे में कुछ बुनियादी जानकारी दी है। आपने प्रकृति के प्रति अपनी भावनाओं का भी संक्षेप में वर्णन किया है।"
    },
    {
        id: "reflection-option-2",
        text: "प्रकृति मेरे जीवन में एक महत्वपूर्ण स्थान रखती है। मैं पिछले वर्ष उत्तराखंड के पहाड़ों पर गया था, जहाँ चारों ओर हरे-भरे पेड़, बहते झरने और शांत वातावरण ने मुझे गहराई से प्रभावित किया। वहाँ की ताजी हवा में साँस लेना, पक्षियों का कलरव सुनना और दूर तक फैली पहाड़ियों को निहारना एक अद्भुत अनुभव था। प्रकृति के इस सौंदर्य ने मुझे अपने दैनिक जीवन के तनाव से मुक्ति दिलाई और मैंने महसूस किया कि हमें प्रकृति के साथ अधिक समय बिताना चाहिए।",
        level: "better",
        feedback: "आपने प्रकृति के साथ अपने विस्तृत व्यक्तिगत अनुभव और गहरे संबंध का वर्णन किया है। उत्तराखंड के पहाड़ों के प्राकृतिक सौंदर्य का विस्तार से चित्रण किया है और अपनी भावनात्मक प्रतिक्रिया को भी व्यक्त किया है। प्रकृति के महत्व पर आपका दृष्टिकोण व्यापक है।"
    },
    {
        id: "reflection-option-3",
        text: "प्रकृति मेरे अस्तित्व का अभिन्न हिस्सा है, जिसके साथ मेरा संबंध बचपन से ही गहरा रहा है। पिछले वसंत में मैं केदारनाथ की यात्रा पर गया था, जहाँ पर्वतीय परिदृश्य ने मुझे एक आध्यात्मिक अनुभूति दी। सूर्योदय के समय बर्फीली चोटियों पर पड़ती सुनहरी किरणें, घने देवदार के वृक्षों के बीच से गुजरती पगडंडियाँ, और अलकनंदा नदी का कलकल निनाद - ये सब मिलकर एक ऐसा संगीत रचते थे, जिसने मेरी आत्मा को छू लिया। वहाँ की शांति में बैठकर मैंने महसूस किया कि प्रकृति और मनुष्य का संबंध कितना गहरा और परस्पर निर्भर है। हमारी संस्कृति, कला और साहित्य में प्रकृति का प्रभाव इसी गहरे संबंध का परिणाम है। प्रकृति न केवल हमें जीवन देती है, बल्कि हमारी रचनात्मकता और आंतरिक शांति का भी स्रोत है। इस यात्रा ने मुझे प्रकृति के संरक्षण के प्रति और अधिक संवेदनशील बना दिया है।",
        level: "appropriate",
        feedback: "आपने प्रकृति के साथ अपने गहरे व्यक्तिगत अनुभव और संबंध का विस्तृत और काव्यात्मक वर्णन किया है। केदारनाथ के प्राकृतिक सौंदर्य का सजीव चित्रण प्रस्तुत किया है और अपनी भावनात्मक प्रतिक्रिया का गहन विश्लेषण किया है। आपके विचारों में मौलिकता है और प्रकृति के महत्व पर आपका दृष्टिकोण गहन और व्यापक है, जिसमें प्रकृति और मनुष्य के बीच संबंध पर चिंतन भी शामिल है।"
    }
];

// Initialize the reflection MCQ functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the prereading module
    const prereadingModule = document.getElementById('prereading');
    if (!prereadingModule) return;
    
    // Find the reflection section
    const reflectionSection = prereadingModule.querySelector('.reflection-prompt');
    if (!reflectionSection) return;
    
    // Create the MCQ container
    const mcqContainer = document.createElement('div');
    mcqContainer.className = 'reflection-mcq-container';
    mcqContainer.innerHTML = `
        <h4>अपने विचारों के अनुरूप सबसे उपयुक्त विकल्प चुनें:</h4>
        <div class="reflection-options"></div>
    `;
    
    // Insert the MCQ container after the reflection prompt
    reflectionSection.after(mcqContainer);
    
    // Get the options container
    const optionsContainer = mcqContainer.querySelector('.reflection-options');
    
    // Add the MCQ options
    reflectionOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'reflection-option';
        optionElement.setAttribute('data-level', option.level);
        optionElement.setAttribute('data-feedback', option.feedback);
        optionElement.id = option.id;
        optionElement.innerHTML = `
            <label class="reflection-option-label">
                <input type="radio" name="reflection-mcq" value="${option.id}">
                <span class="reflection-option-text">${option.text}</span>
            </label>
        `;
        optionsContainer.appendChild(optionElement);
        
        // Add click event listener to the radio button
        const radioButton = optionElement.querySelector('input[type="radio"]');
        radioButton.addEventListener('change', function() {
            if (this.checked) {
                handleOptionSelection(option);
            }
        });
    });
    
    // Hide the feedback section initially
    const feedbackSection = prereadingModule.querySelector('.guided-feedback');
    if (feedbackSection) {
        feedbackSection.style.display = 'none';
    }
});

// Handle option selection
function handleOptionSelection(selectedOption) {
    // Find the guided feedback section
    const guidedFeedback = document.querySelector('.guided-feedback');
    if (!guidedFeedback) return;
    
    // Show the feedback section - add both display block and the show class for animation
    guidedFeedback.style.display = 'block';
    
    // Add a small delay before adding the show class to trigger the animation
    setTimeout(() => {
        guidedFeedback.classList.add('show');
    }, 10);
    
    // Hide all feedback levels initially
    const feedbackLevels = guidedFeedback.querySelectorAll('.feedback-level');
    feedbackLevels.forEach(level => {
        level.classList.remove('active-feedback');
    });
    
    // Show the appropriate feedback level
    let targetLevel;
    let feedbackTitle = '';
    
    switch (selectedOption.level) {
        case 'good':
            targetLevel = guidedFeedback.querySelector('.good-level');
            feedbackTitle = 'अच्छा उत्तर';
            break;
        case 'better':
            targetLevel = guidedFeedback.querySelector('.better-level');
            feedbackTitle = 'बेहतर उत्तर';
            break;
        case 'appropriate':
            targetLevel = guidedFeedback.querySelector('.appropriate-level');
            feedbackTitle = 'उपयुक्त उत्तर';
            break;
    }
    
    // Create and display a summary message at the top of the feedback section
    const summaryElement = document.createElement('div');
    summaryElement.className = 'feedback-summary ' + selectedOption.level + '-summary';
    summaryElement.innerHTML = `
        <h3>आपका चयन: <strong>${feedbackTitle}</strong></h3>
        <p>${selectedOption.feedback}</p>
    `;
    
    // Remove any existing summary
    const existingSummary = guidedFeedback.querySelector('.feedback-summary');
    if (existingSummary) {
        existingSummary.remove();
    }
    
    // Insert the summary at the top of the guided feedback section
    guidedFeedback.insertBefore(summaryElement, guidedFeedback.firstChild);
    
    if (targetLevel) {
        // Add a small delay before adding the active class for better visual effect
        setTimeout(() => {
            targetLevel.classList.add('active-feedback');
            
            // Scroll to the feedback
            targetLevel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
    
    // Update progress
    if (typeof saveReflection === 'function') {
        saveReflection();
    }
}
