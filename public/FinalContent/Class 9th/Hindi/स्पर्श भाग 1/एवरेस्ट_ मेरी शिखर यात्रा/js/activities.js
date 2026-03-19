/**
 * Activities and interactive exercises for Everest story
 */

// Activity state management
let activityProgress = {
    meaningAnalysis: false,
    essaySelection: false,
    totalActivitiesCompleted: 0
};

// Initialize activities
function initializeActivities() {
    console.log('Initializing activities module');
    
    // Add event listeners for interactive elements
    setupActivityListeners();
}

// Setup event listeners for activities
function setupActivityListeners() {
    // Meaning analysis listeners
    const meaningInputs = document.querySelectorAll('input[name="meaning"], input[name="meaning2"]');
    meaningInputs.forEach(input => {
        input.addEventListener('change', updateMeaningAnalysisProgress);
    });
    
    // Essay selection listeners
    const essayInputs = document.querySelectorAll('input[name="essay"]');
    essayInputs.forEach(input => {
        input.addEventListener('change', updateEssaySelectionProgress);
    });
}

// Update meaning analysis progress
function updateMeaningAnalysisProgress() {
    const meaning1 = document.querySelector('input[name="meaning"]:checked');
    const meaning2 = document.querySelector('input[name="meaning2"]:checked');
    
    if (meaning1 && meaning2) {
        activityProgress.meaningAnalysis = true;
        updateOverallProgress();
    }
}

// Update essay selection progress
function updateEssaySelectionProgress() {
    const selectedEssay = document.querySelector('input[name="essay"]:checked');
    
    if (selectedEssay) {
        activityProgress.essaySelection = true;
        updateOverallProgress();
    }
}

// Update overall activity progress
function updateOverallProgress() {
    const completed = Object.values(activityProgress).filter(value => typeof value === 'boolean' && value).length;
    activityProgress.totalActivitiesCompleted = completed;
    
    // Update UI if needed
    console.log(`Activities completed: ${completed}/2`);
}

// Save research notes with enhanced feedback
function saveResearchNotes() {
    const meaning1 = document.querySelector('input[name="meaning"]:checked');
    const meaning2 = document.querySelector('input[name="meaning2"]:checked');
    const feedbackEl = document.getElementById('researchFeedback');
    
    if (!meaning1 || !meaning2) {
        feedbackEl.textContent = 'कृपया दोनों आशयों के लिए विकल्प चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Get detailed feedback using activity answers
    const feedback1 = window.getActivityFeedback('meaning', 'meaning1', meaning1.value);
    const feedback2 = window.getActivityFeedback('meaning', 'meaning2', meaning2.value);
    
    const isCorrect1 = feedback1.isCorrect;
    const isCorrect2 = feedback2.isCorrect;
    
    let feedbackMessage = '';
    let className = '';
    
    if (isCorrect1 && isCorrect2) {
        feedbackMessage = 'उत्कृष्ट! आपने दोनों वाक्यांशों के आशय सही-सही समझे हैं।';
        className = 'feedback-message show success';
        
        // Update score
        if (window.score !== undefined) {
            window.score += 20;
            const scoreEl = document.getElementById('totalScore');
            if (scoreEl) scoreEl.textContent = window.score;
        }
        
        // Mark as completed
        if (window.modulesCompleted && !window.modulesCompleted.includes('activities')) {
            window.modulesCompleted.push('activities');
            if (typeof window.updateProgress === 'function') {
                window.updateProgress();
            }
            if (typeof window.showAchievement === 'function') {
                window.showAchievement('आशय विश्लेषण पूर्ण!');
            }
        }
    } else if (isCorrect1 || isCorrect2) {
        feedbackMessage = 'एक उत्तर सही है। दूसरे के लिए पुन: विचार करें।';
        className = 'feedback-message show warning';
    } else {
        feedbackMessage = 'दोनों उत्तरों में सुधार की आवश्यकता है। वाक्यांशों को एक बार फिर से पढ़कर विचार करें।';
        className = 'feedback-message show error';
    }
    
    feedbackEl.textContent = feedbackMessage;
    feedbackEl.className = className;
    
    // Provide specific feedback for each question
    if (!isCorrect1 || !isCorrect2) {
        const detailedFeedback = document.createElement('div');
        detailedFeedback.className = 'detailed-feedback';
        detailedFeedback.innerHTML = `
            <h4>विस्तृत फीडबैक:</h4>
            <p><strong>प्रश्न 1:</strong> ${feedback1.feedback}</p>
            <p><strong>प्रश्न 2:</strong> ${feedback2.feedback}</p>
        `;
        feedbackEl.appendChild(detailedFeedback);
    }
    
    // Mark activity as completed
    activityProgress.meaningAnalysis = true;
    updateOverallProgress();
    
    if (window.narrator) {
        window.narrator.speak(feedbackMessage);
    }
}

// Save role play (essay topic) with enhanced feedback
function saveRolePlay() {
    const selectedOption = document.querySelector('input[name="essay"]:checked');
    const feedbackEl = document.getElementById('rolePlayFeedback');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'कृपया कोई एक विषय चुनें।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Get detailed feedback for essay topic
    const essayFeedback = window.getActivityFeedback('essay', 'essay', selectedOption.value);
    
    feedbackEl.innerHTML = `
        <div class="essay-feedback">
            <p>${essayFeedback.feedback}</p>
            ${essayFeedback.hints ? `
                <div class="essay-hints">
                    <h4>लेखन के लिए सुझाव:</h4>
                    <ul>
                        ${essayFeedback.hints.map(hint => `<li>${hint}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
    feedbackEl.className = 'feedback-message show success';
    
    // Update score
    if (window.score !== undefined) {
        window.score += 20;
        const scoreEl = document.getElementById('totalScore');
        if (scoreEl) scoreEl.textContent = window.score;
    }
    
    // Mark activity as completed
    if (window.modulesCompleted && !window.modulesCompleted.includes('activities')) {
        window.modulesCompleted.push('activities');
        if (typeof window.updateProgress === 'function') {
            window.updateProgress();
        }
        if (typeof window.showAchievement === 'function') {
            window.showAchievement('लेखन विषय चयन पूर्ण!');
        }
    }
    
    activityProgress.essaySelection = true;
    updateOverallProgress();
    
    if (window.narrator) {
        window.narrator.speak("आपका विषय चयन सहेज लिया गया है। दिए गए सुझावों का उपयोग करके एक अच्छा निबंध लिख सकते हैं।");
    }
}

// Generate writing prompt based on selected essay topic
function generateWritingPrompt() {
    const selectedOption = document.querySelector('input[name="essay"]:checked');
    
    if (!selectedOption) {
        alert('पहले कोई विषय चुनें।');
        return;
    }
    
    const topicData = window.activityAnswers.essay[selectedOption.value];
    if (!topicData) return;
    
    const promptModal = document.createElement('div');
    promptModal.className = 'writing-prompt-modal';
    promptModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${topicData.title}</h3>
                <button class="modal-close" onclick="this.parentNode.parentNode.parentNode.remove()">×</button>
            </div>
            <div class="modal-body">
                <h4>लेखन दिशा-निर्देश:</h4>
                <ul>
                    ${topicData.hints.map(hint => `<li>${hint}</li>`).join('')}
                </ul>
                <h4>सुझावित संरचना:</h4>
                <ol>
                    <li>प्रस्तावना - विषय का परिचय</li>
                    <li>मुख्य भाग - मुख्य बिंदुओं की व्याख्या</li>
                    <li>उदाहरण - बछेंद्री पाल के जीवन से</li>
                    <li>निष्कर्ष - अपने विचार</li>
                </ol>
                <textarea class="writing-area" placeholder="यहाँ अपना निबंध लिखें..." rows="10"></textarea>
                <div class="modal-actions">
                    <button class="interactive-btn" onclick="saveEssayDraft()">निबंध सहेजें</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(promptModal);
}

// Save essay draft
function saveEssayDraft() {
    const essayText = document.querySelector('.writing-area').value;
    
    if (essayText.trim().length < 50) {
        alert('कृपया कम से कम 50 शब्द लिखें।');
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('everest-essay-draft', essayText);
    localStorage.setItem('everest-essay-topic', document.querySelector('input[name="essay"]:checked').value);
    
    alert('आपका निबंध सहेज लिया गया है!');
    
    // Close modal
    document.querySelector('.writing-prompt-modal').remove();
    
    if (window.narrator) {
        window.narrator.speak("आपका निबंध सफलतापूर्वक सहेज लिया गया है।");
    }
}

// Load saved essay draft
function loadEssayDraft() {
    const savedEssay = localStorage.getItem('everest-essay-draft');
    const savedTopic = localStorage.getItem('everest-essay-topic');
    
    if (savedEssay && savedTopic) {
        // Select the saved topic
        const topicRadio = document.querySelector(`input[name="essay"][value="${savedTopic}"]`);
        if (topicRadio) {
            topicRadio.checked = true;
        }
        
        // Show the essay
        const essayModal = document.createElement('div');
        essayModal.className = 'writing-prompt-modal';
        essayModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>सहेजा गया निबंध</h3>
                    <button class="modal-close" onclick="this.parentNode.parentNode.parentNode.remove()">×</button>
                </div>
                <div class="modal-body">
                    <textarea class="writing-area" rows="10">${savedEssay}</textarea>
                    <div class="modal-actions">
                        <button class="interactive-btn" onclick="saveEssayDraft()">अपडेट करें</button>
                        <button class="interactive-btn" onclick="clearEssayDraft()">मिटाएं</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(essayModal);
    } else {
        alert('कोई सहेजा गया निबंध नहीं मिला।');
    }
}

// Clear essay draft
function clearEssayDraft() {
    localStorage.removeItem('everest-essay-draft');
    localStorage.removeItem('everest-essay-topic');
    document.querySelector('.writing-prompt-modal').remove();
    alert('निबंध मिटा दिया गया।');
}

// Activity completion tracker
function getActivityCompletionStatus() {
    return {
        ...activityProgress,
        completionPercentage: Math.round((activityProgress.totalActivitiesCompleted / 2) * 100)
    };
}

// CSS for modal and activities
const activityCSS = `
.writing-prompt-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 12px;
    max-width: 800px;
    width: 90%;
    max-height: 90%;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.modal-body {
    padding: 20px;
}

.modal-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
}

.writing-area {
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    resize: vertical;
}

.essay-feedback {
    margin-top: 15px;
}

.essay-hints {
    background: #f0f8ff;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
}

.essay-hints ul {
    margin: 10px 0;
    padding-left: 20px;
}

.detailed-feedback {
    margin-top: 15px;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 8px;
}

.detailed-feedback h4 {
    margin-bottom: 10px;
    color: #333;
}
`;

// Add activity styles to document
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = activityCSS;
    document.head.appendChild(style);
}

// Initialize activities when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('activities')) {
        initializeActivities();
    }
});

// Make functions globally available  
window.saveResearchNotes = saveResearchNotes;
window.saveRolePlay = saveRolePlay;
window.generateWritingPrompt = generateWritingPrompt;
window.saveEssayDraft = saveEssayDraft;
window.loadEssayDraft = loadEssayDraft;
window.clearEssayDraft = clearEssayDraft;
window.getActivityCompletionStatus = getActivityCompletionStatus;
