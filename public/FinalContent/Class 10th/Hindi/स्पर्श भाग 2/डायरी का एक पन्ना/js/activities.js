/**
 * Activities for Diary Ka Ek Panna
 */

// Setup activity listeners
function setupActivityListeners() {
    console.log('Setting up activity listeners');
    
    // Reflection activity
    const reflectionForm = document.getElementById('reflectionForm');
    if (reflectionForm) {
        reflectionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveReflection();
        });
    }
    
    // Listening activity
    const listeningForm = document.getElementById('listeningForm');
    if (listeningForm) {
        listeningForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveListeningNotes();
        });
    }
    
    
    
    // Listening activity button
    const listeningBtn = document.getElementById('listeningBtn');
    if (listeningBtn) {
        listeningBtn.addEventListener('click', playListeningActivity);
    }
    
    // Resource buttons
    const resourceBtns = document.querySelectorAll('.resource-btn');
    resourceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resourceId = this.getAttribute('data-resource');
            showResource(resourceId);
        });
    });
}

// Kabir life content for listening activity
const kabirLifeContent = `
    सीताराम सेकसरिया का जन्म 1892 में राजस्थान के नवलगढ़ में हुआ था। उनका अधिकांश जीवन कलकत्ता में बीता। वे व्यापार-व्यवसाय से जुड़े थे और अनेक साहित्यिक, सांस्कृतिक और नारी शिक्षण संस्थाओं के प्रेरक, संस्थापक, संचालक रहे।
    
    उन्होंने स्वतंत्रता आंदोलन में भी भाग लिया था। वे एक देशभक्त थे जो अपने देश की आजादी के लिए काम करते थे। उनका लेखन भी देशभक्ति की भावना से ओत-प्रोत था।
    
    उनकी रचनाएं हिंदी साहित्य में महत्वपूर्ण स्थान रखती हैं। वे एक अच्छे लेखक और समाजसेवी थे। उनका योगदान हिंदी साहित्य और समाज के लिए बहुत महत्वपूर्ण है।
`;

// Play listening activity
function playListeningActivity() {
    console.log('Playing listening activity');
    
    // Play the audio content
    if (window.narrator) {
        window.narrator.speak(kabirLifeContent);
    }
    
    // Show a subtle notification that audio is playing
    const feedbackEl = document.getElementById('listeningFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = 'सीताराम सेकसरिया के जीवन के बारे में सुनें और नीचे दिए गए प्रश्नों के उत्तर दें।';
        feedbackEl.className = 'feedback-message show info';
        feedbackEl.style.display = 'block';
        
        // Hide the info message after 5 seconds
        setTimeout(() => {
            feedbackEl.style.display = 'none';
        }, 5000);
    }
}


// Kabir info for project work
const kabirInfo = {
    'seksaria-life': {
        title: 'सीताराम सेकसरिया का जीवन',
        content: `
            <h4>सीताराम सेकसरिया (1892-1982)</h4>
            <p><strong>जन्म:</strong> 1892, नवलगढ़, राजस्थान</p>
            <p><strong>मुख्य कार्यक्षेत्र:</strong> कोलकाता</p>
            <p><strong>व्यवसाय:</strong> व्यापार-व्यवसाय</p>
            <p><strong>योगदान:</strong> साहित्यिक, सांस्कृतिक और नारी शिक्षण संस्थाओं के प्रेरक, संस्थापक, संचालक</p>
            <p><strong>स्वतंत्रता आंदोलन:</strong> सक्रिय भागीदारी</p>
            <p><strong>लेखन:</strong> देशभक्ति की भावना से ओत-प्रोत रचनाएं</p>
        `
    },
    'independence-photos': {
        title: 'स्वतंत्रता आंदोलन के चित्र',
        content: `
            <h4>26 जनवरी 1931 के दिन की घटनाएं</h4>
            <p>ये चित्र स्वतंत्रता आंदोलन के दौरान की घटनाओं को दर्शाते हैं:</p>
            <ul>
                <li>स्वतंत्रता दिवस की रैलियां</li>
                <li>तिरंगा झंडा फहराना</li>
                <li>राष्ट्रीय गान गाना</li>
                <li>स्वतंत्रता सेनानियों की याद</li>
                <li>देशभक्ति के गीत</li>
            </ul>
        `
    },
    'project-template': {
        title: 'प्रोजेक्ट टेम्पलेट',
        content: `
            <h4>स्वतंत्रता आंदोलन पर प्रोजेक्ट</h4>
            <p><strong>विषय:</strong> 26 जनवरी 1931 का दिन</p>
            <p><strong>उद्देश्य:</strong> स्वतंत्रता आंदोलन और देशभक्ति की भावना को समझना</p>
            <p><strong>सामग्री:</strong></p>
            <ul>
                <li>सीताराम सेकसरिया का जीवन परिचय</li>
                <li>26 जनवरी 1931 की घटनाएं</li>
                <li>स्वतंत्रता आंदोलन का महत्व</li>
                <li>देशभक्ति की भावना</li>
                <li>आज के समय में देशभक्ति</li>
            </ul>
        `
    }
};

// Show resource
function showResource(resourceId) {
    console.log(`Showing resource: ${resourceId}`);
    
    const resource = kabirInfo[resourceId];
    if (!resource) {
        console.error(`Resource not found: ${resourceId}`);
        return;
    }
    
    // Create resource modal
    const modal = document.createElement('div');
    modal.className = 'resource-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${resource.title}</h3>
                <button class="modal-close" onclick="this.parentNode.parentNode.parentNode.remove()">×</button>
            </div>
            <div class="modal-body">
                ${resource.content}
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.parentNode.parentNode.parentNode.remove()">बंद करें</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    if (window.narrator) {
        window.narrator.speak(resource.title + '। ' + resource.content.replace(/<[^>]*>/g, ' '));
    }
}



// Save listening notes
function saveListeningNotes() {
    console.log('Saving listening notes');
    
    const birthYearSelected = document.querySelector('input[name="birth-year"]:checked');
    const birthPlaceSelected = document.querySelector('input[name="birth-place"]:checked');
    const movementSelected = document.querySelector('input[name="movement"]:checked');
    const feedbackEl = document.getElementById('listeningFeedback');
    
    if (!birthYearSelected || !birthPlaceSelected || !movementSelected) {
        if (feedbackEl) {
            feedbackEl.textContent = 'कृपया सभी प्रश्नों के उत्तर दें।';
            feedbackEl.className = 'feedback-message show error';
            feedbackEl.style.display = 'block';
        }
        return;
    }
    
    // Check answers and provide feedback
    let correctCount = 0;
    let totalQuestions = 3;
    let feedbackMessage = '';
    
    // Check each answer and provide specific feedback
    if (birthYearSelected.value === '1892') {
        correctCount++;
        feedbackMessage += '✅ सही: जन्म वर्ष 1892 है। ';
    } else {
        feedbackMessage += '❌ गलत: सही जन्म वर्ष 1892 है। ';
    }
    
    if (birthPlaceSelected.value === 'नवलगढ़, राजस्थान') {
        correctCount++;
        feedbackMessage += '✅ सही: जन्म स्थान नवलगढ़, राजस्थान है। ';
    } else {
        feedbackMessage += '❌ गलत: सही जन्म स्थान नवलगढ़, राजस्थान है। ';
    }
    
    if (movementSelected.value === 'स्वतंत्रता आंदोलन') {
        correctCount++;
        feedbackMessage += '✅ सही: उन्होंने स्वतंत्रता आंदोलन में भाग लिया। ';
    } else {
        feedbackMessage += '❌ गलत: सही उत्तर "स्वतंत्रता आंदोलन" है। ';
    }
    
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    // Show detailed result
    if (feedbackEl) {
        feedbackEl.innerHTML = `
            <div class="result-summary">
                <strong>आपके परिणाम: ${correctCount}/${totalQuestions} (${percentage}%)</strong>
            </div>
            <div class="detailed-feedback">
                ${feedbackMessage}
            </div>
        `;
        
        // Set appropriate styling based on performance
        if (percentage >= 80) {
            feedbackEl.className = 'feedback-message show success';
        } else if (percentage >= 60) {
            feedbackEl.className = 'feedback-message show partial-success';
        } else {
            feedbackEl.className = 'feedback-message show error';
        }
        
        feedbackEl.style.display = 'block';
    }
    
    // Update score
    score += correctCount * 5;
    document.getElementById('totalScore').textContent = score;
    
    // Track completion
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('श्रवण गतिविधि पूर्ण!');
    }
    
    if (window.narrator) {
        window.narrator.speak(`आपने ${correctCount} में से ${totalQuestions} प्रश्नों के सही उत्तर दिए। ${percentage} प्रतिशत सफलता मिली।`);
    }
}
