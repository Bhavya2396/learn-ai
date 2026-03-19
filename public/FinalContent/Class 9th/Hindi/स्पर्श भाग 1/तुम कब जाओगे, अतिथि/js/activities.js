/**
 * Interactive activities for Chapter 3 module
 * तुम कब जाओगे, अतिथि - शरद जोशी
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load activities when the tab is activated
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            if (this.textContent.includes('गतिविधियाँ')) {
                setTimeout(initializeActivities, 100);
            }
        });
    });

    // Also load content if that tab is initially active
    if (document.querySelector('.nav-item.active') && 
        document.querySelector('.nav-item.active').textContent.includes('गतिविधियाँ')) {
        setTimeout(initializeActivities, 100);
    }
});

// Initialize all activities
function initializeActivities() {
    console.log('Initializing activities');
    setupWritingActivity();
    setupDiscussionActivity();
    setupInteractiveElements();
    addActivityProgressTracking();
}

// Set up the creative writing activity
function setupWritingActivity() {
    const writingTextarea = document.getElementById('creativeWriting');
    if (!writingTextarea) return;
    
    // Add real-time feedback
    let typingTimer;
    writingTextarea.addEventListener('input', function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            provideWritingFeedback(this.value);
        }, 1000); // Wait 1 second after user stops typing
    });
    
    // Add writing prompts
    addWritingPrompts();
    
    // Add word count tracker
    addWordCountTracker(writingTextarea);
    
    // Add writing tips sidebar
    addWritingTipsSidebar();
}

// Set up the discussion activity
function setupDiscussionActivity() {
    // Add event listeners to discussion options
    document.querySelectorAll('input[name="discuss1"], input[name="discuss2"]').forEach(input => {
        input.addEventListener('change', function() {
            highlightSelectedOption(this);
            updateDiscussionProgress();
        });
    });
    
    // Add discussion analytics
    addDiscussionAnalytics();
}

// Add writing prompts for inspiration
function addWritingPrompts() {
    const writingSection = document.querySelector('.writing-activity');
    if (!writingSection) return;
    
    const prompts = [
        "मोबाइल फोन का व्यसन",
        "सोशल मीडिया की दुनिया", 
        "ऑनलाइन शॉपिंग की आदत",
        "ट्रैफिक जाम की समस्या",
        "ऑफिस की राजनीति",
        "डिजिटल शिक्षा की चुनौतियां",
        "होम डिलीवरी का जमाना",
        "व्हाट्सऐप ग्रुप्स की परेशानी"
    ];
    
    const promptsHTML = `
        <div class="writing-prompts">
            <h4>📝 लेखन विषय सुझाव:</h4>
            <div class="prompt-buttons">
                ${prompts.map(prompt => 
                    `<button class="prompt-btn" onclick="selectPrompt('${prompt}')">${prompt}</button>`
                ).join('')}
            </div>
        </div>
    `;
    
    writingSection.insertAdjacentHTML('afterbegin', promptsHTML);
}

// Add word count tracker
function addWordCountTracker(textarea) {
    const countTracker = document.createElement('div');
    countTracker.className = 'word-count-tracker';
    countTracker.innerHTML = `
        <div class="count-stats">
            <span class="word-count">शब्द: 0</span>
            <span class="char-count">अक्षर: 0</span>
            <span class="sentence-count">वाक्य: 0</span>
        </div>
    `;
    
    textarea.parentNode.insertBefore(countTracker, textarea.nextSibling);
    
    // Update counts on input
    textarea.addEventListener('input', function() {
        updateWordCount(this.value, countTracker);
    });
}

// Update word count display
function updateWordCount(text, tracker) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = text.trim() ? text.split(/[.!?।]+/).filter(s => s.trim()).length : 0;
    
    tracker.querySelector('.word-count').textContent = `शब्द: ${words}`;
    tracker.querySelector('.char-count').textContent = `अक्षर: ${chars}`;
    tracker.querySelector('.sentence-count').textContent = `वाक्य: ${sentences}`;
    
    // Color code based on length
    const wordCountSpan = tracker.querySelector('.word-count');
    if (words < 20) {
        wordCountSpan.style.color = '#f44336';
    } else if (words < 50) {
        wordCountSpan.style.color = '#ff9800';
    } else {
        wordCountSpan.style.color = '#4caf50';
    }
}

// Add writing tips sidebar
function addWritingTipsSidebar() {
    const activitiesModule = document.getElementById('activities');
    if (!activitiesModule) return;
    
    const tipsHTML = `
        <div class="writing-tips-sidebar">
            <h4>✍️ व्यंग्य लेखन की तकनीक</h4>
            <div class="tip-items">
                <div class="tip-item">
                    <strong>हास्य और व्यंग्य में संतुलन:</strong>
                    पाठक को हंसाने के साथ-साथ सोचने पर मजबूर करें।
                </div>
                <div class="tip-item">
                    <strong>रोजमर्रा की भाषा:</strong>
                    सामान्य बोलचाल की भाषा का प्रयोग करें।
                </div>
                <div class="tip-item">
                    <strong>मध्यमवर्गीय समस्याएं:</strong>
                    आम आदमी की परेशानियों को उजागर करें।
                </div>
                <div class="tip-item">
                    <strong>विडंबना दिखाएं:</strong>
                    स्थिति की विडंबना को स्पष्ट करें।
                </div>
                <div class="tip-item">
                    <strong>समाधान सुझाएं:</strong>
                    समस्या के साथ-साथ समाधान भी दें।
                </div>
            </div>
        </div>
    `;
    
    activitiesModule.querySelector('.exercise-card').insertAdjacentHTML('beforeend', tipsHTML);
}

// Provide real-time writing feedback
function provideWritingFeedback(text) {
    if (!text || text.length < 10) return;
    
    const feedbackContainer = document.querySelector('.live-feedback');
    if (!feedbackContainer) {
        // Create feedback container
        const container = document.createElement('div');
        container.className = 'live-feedback';
        document.getElementById('creativeWriting').parentNode.appendChild(container);
    }
    
    const feedback = analyzWriting(text);
    displayLiveFeedback(feedback);
}

// Analyze writing for real-time feedback
function analyzWriting(text) {
    const analysis = {
        length: text.length,
        words: text.trim().split(/\s+/).length,
        sentences: text.split(/[.!?।]+/).filter(s => s.trim()).length,
        humorElements: 0,
        satiricalElements: 0,
        suggestions: []
    };
    
    // Check for humor elements
    const humorWords = ['हंसी', 'मज़ा', 'हास्य', 'मजेदार', 'विनोद', 'कॉमेडी'];
    humorWords.forEach(word => {
        if (text.includes(word)) analysis.humorElements++;
    });
    
    // Check for satirical elements
    const satiricalWords = ['व्यंग्य', 'विडंबना', 'परेशानी', 'समस्या', 'मुश्किल', 'दिक्कत'];
    satiricalWords.forEach(word => {
        if (text.includes(word)) analysis.satiricalElements++;
    });
    
    // Generate suggestions
    if (analysis.words < 20) {
        analysis.suggestions.push('अधिक विस्तार से लिखें');
    }
    
    if (analysis.humorElements === 0) {
        analysis.suggestions.push('हास्य तत्व जोड़ें');
    }
    
    if (analysis.satiricalElements === 0) {
        analysis.suggestions.push('व्यंग्य की मात्रा बढ़ाएं');
    }
    
    if (!text.includes('?')) {
        analysis.suggestions.push('प्रश्नवाचक वाक्यों का प्रयोग करें');
    }
    
    return analysis;
}

// Display live feedback
function displayLiveFeedback(analysis) {
    const container = document.querySelector('.live-feedback');
    if (!container) return;
    
    let statusColor = '#f44336'; // Red
    let statusText = 'और लिखने की आवश्यकता';
    
    if (analysis.words >= 50) {
        statusColor = '#4caf50'; // Green  
        statusText = 'अच्छी प्रगति!';
    } else if (analysis.words >= 20) {
        statusColor = '#ff9800'; // Orange
        statusText = 'अच्छी शुरुआत';
    }
    
    container.innerHTML = `
        <div class="feedback-header" style="color: ${statusColor}">
            📊 लेखन विश्लेषण: ${statusText}
        </div>
        <div class="analysis-stats">
            <span>📝 ${analysis.words} शब्द</span>
            <span>😄 ${analysis.humorElements} हास्य तत्व</span>
            <span>😏 ${analysis.satiricalElements} व्यंग्य तत्व</span>
        </div>
        ${analysis.suggestions.length > 0 ? `
            <div class="live-suggestions">
                <strong>सुझाव:</strong>
                <ul>
                    ${analysis.suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
    `;
}

// Add discussion analytics
function addDiscussionAnalytics() {
    const discussionSection = document.querySelector('.discussion-activity');
    if (!discussionSection) return;
    
    const analyticsHTML = `
        <div class="discussion-analytics">
            <h4>📊 चर्चा प्रगति</h4>
            <div class="progress-items">
                <div class="progress-item" id="question1-progress">
                    <span>प्रश्न 1:</span>
                    <span class="status">अनुत्तरित</span>
                </div>
                <div class="progress-item" id="question2-progress">
                    <span>प्रश्न 2:</span>
                    <span class="status">अनुत्तरित</span>
                </div>
            </div>
        </div>
    `;
    
    discussionSection.insertAdjacentHTML('beforeend', analyticsHTML);
}

// Update discussion progress
function updateDiscussionProgress() {
    const q1Selected = document.querySelector('input[name="discuss1"]:checked');
    const q2Selected = document.querySelector('input[name="discuss2"]:checked');
    
    const q1Progress = document.getElementById('question1-progress');
    const q2Progress = document.getElementById('question2-progress');
    
    if (q1Progress) {
        const statusSpan = q1Progress.querySelector('.status');
        if (q1Selected) {
            statusSpan.textContent = 'उत्तरित ✓';
            statusSpan.style.color = '#4caf50';
        } else {
            statusSpan.textContent = 'अनुत्तरित';
            statusSpan.style.color = '#f44336';
        }
    }
    
    if (q2Progress) {
        const statusSpan = q2Progress.querySelector('.status');
        if (q2Selected) {
            statusSpan.textContent = 'उत्तरित ✓';
            statusSpan.style.color = '#4caf50';
        } else {
            statusSpan.textContent = 'अनुत्तरित';
            statusSpan.style.color = '#f44336';
        }
    }
    
    // Check if both questions are answered
    if (q1Selected && q2Selected) {
        showCompletionMessage();
    }
}

// Show completion message when all questions are answered
function showCompletionMessage() {
    const existingMessage = document.querySelector('.completion-message');
    if (existingMessage) return; // Don't show multiple times
    
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = `
        <div class="completion-content">
            🎉 सभी प्रश्नों के उत्तर दे दिए गए हैं!
            <br>अब "चर्चा सहेजें" बटन दबाएं।
        </div>
    `;
    
    const discussionSection = document.querySelector('.discussion-activity');
    if (discussionSection) {
        discussionSection.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

// Highlight selected options
function highlightSelectedOption(selectedInput) {
    // Remove highlighting from all options in the same question group
    const questionContainer = selectedInput.closest('.discussion-item');
    questionContainer.querySelectorAll('.choice-option').forEach(option => {
        option.classList.remove('selected-option');
    });
    
    // Highlight the selected option
    const selectedOption = selectedInput.closest('.choice-option');
    selectedOption.classList.add('selected-option');
    
    // Add selection animation
    selectedOption.style.transform = 'scale(1.02)';
    setTimeout(() => {
        selectedOption.style.transform = 'scale(1)';
    }, 300);
}

// Add activity progress tracking
function addActivityProgressTracking() {
    const activitiesModule = document.getElementById('activities');
    if (!activitiesModule) return;
    
    const progressHTML = `
        <div class="activity-progress-tracker">
            <h4>🎯 गतिविधि प्रगति</h4>
            <div class="activity-items">
                <div class="activity-item" data-activity="writing">
                    <span class="activity-name">रचनात्मक लेखन</span>
                    <span class="activity-status">प्रारंभ करें</span>
                </div>
                <div class="activity-item" data-activity="discussion">
                    <span class="activity-name">चर्चा गतिविधि</span>
                    <span class="activity-status">प्रारंभ करें</span>
                </div>
            </div>
        </div>
    `;
    
    activitiesModule.querySelector('.exercise-card').insertAdjacentHTML('afterbegin', progressHTML);
    
    // Set up progress monitoring
    monitorActivityProgress();
}

// Monitor activity progress
function monitorActivityProgress() {
    // Monitor writing activity
    const writingTextarea = document.getElementById('creativeWriting');
    if (writingTextarea) {
        writingTextarea.addEventListener('input', function() {
            updateActivityStatus('writing', this.value.length > 0 ? 'प्रगति में' : 'प्रारंभ करें');
        });
    }
    
    // Monitor discussion activity
    document.querySelectorAll('input[name="discuss1"], input[name="discuss2"]').forEach(input => {
        input.addEventListener('change', function() {
            const q1 = document.querySelector('input[name="discuss1"]:checked');
            const q2 = document.querySelector('input[name="discuss2"]:checked');
            
            if (q1 && q2) {
                updateActivityStatus('discussion', 'पूर्ण ✓');
            } else if (q1 || q2) {
                updateActivityStatus('discussion', 'प्रगति में');
            }
        });
    });
}

// Update activity status
function updateActivityStatus(activityName, status) {
    const activityItem = document.querySelector(`[data-activity="${activityName}"]`);
    if (!activityItem) return;
    
    const statusSpan = activityItem.querySelector('.activity-status');
    statusSpan.textContent = status;
    
    // Color code the status
    if (status.includes('✓')) {
        statusSpan.style.color = '#4caf50';
        activityItem.classList.add('completed');
    } else if (status.includes('प्रगति')) {
        statusSpan.style.color = '#ff9800';
        activityItem.classList.add('in-progress');
    } else {
        statusSpan.style.color = '#666';
        activityItem.classList.remove('completed', 'in-progress');
    }
}

// Function to select a writing prompt
window.selectPrompt = function(prompt) {
    const textarea = document.getElementById('creativeWriting');
    if (!textarea) return;
    
    // Add prompt as starting text if textarea is empty
    if (textarea.value.trim() === '') {
        textarea.value = `${prompt} पर एक व्यंग्य लेख:\n\n`;
        textarea.focus();
        
        // Move cursor to end
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        
        // Trigger input event for word count
        textarea.dispatchEvent(new Event('input'));
        
        // Highlight selected prompt button
        document.querySelectorAll('.prompt-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        event.target.classList.add('selected');
        
        // Show success message
        showPromptSelectedMessage(prompt);
    }
};

// Show prompt selected message
function showPromptSelectedMessage(prompt) {
    const message = document.createElement('div');
    message.className = 'prompt-selected-message';
    message.textContent = `विषय चुना गया: ${prompt}`;
    
    const promptsSection = document.querySelector('.writing-prompts');
    if (promptsSection) {
        promptsSection.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
}

// Setup interactive elements
function setupInteractiveElements() {
    // Add hover effects to activity sections
    document.querySelectorAll('.activity-section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add click animations to buttons
    document.querySelectorAll('.interactive-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Additional CSS for activities
const activitiesStyles = `
<style>
.writing-prompts {
    margin: 20px 0;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
}

.prompt-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}

.prompt-btn {
    padding: 6px 12px;
    background: #e3f2fd;
    border: 1px solid #2196f3;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.prompt-btn:hover {
    background: #2196f3;
    color: white;
    transform: translateY(-1px);
}

.prompt-btn.selected {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.word-count-tracker {
    margin: 10px 0;
    padding: 8px 12px;
    background: #f5f5f5;
    border-radius: 6px;
    border: 1px solid #ddd;
}

.count-stats {
    display: flex;
    gap: 20px;
    font-size: 0.9rem;
}

.writing-tips-sidebar {
    margin: 20px 0;
    padding: 16px;
    background: #fff3e0;
    border-radius: 8px;
    border-left: 4px solid #ff9800;
}

.tip-items {
    margin-top: 10px;
}

.tip-item {
    margin: 10px 0;
    padding: 8px;
    background: white;
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: 1.4;
}

.live-feedback {
    margin: 15px 0;
    padding: 12px;
    background: #e8f5e9;
    border-radius: 8px;
    border-left: 4px solid #4caf50;
    animation: fadeIn 0.5s ease;
}

.feedback-header {
    font-weight: 600;
    margin-bottom: 8px;
}

.analysis-stats {
    display: flex;
    gap: 15px;
    margin: 8px 0;
    font-size: 0.9rem;
}

.live-suggestions ul {
    margin: 8px 0 0 16px;
    font-size: 0.9rem;
}

.discussion-analytics {
    margin: 20px 0;
    padding: 16px;
    background: #e3f2fd;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
}

.progress-items {
    margin-top: 10px;
}

.progress-item {
    display: flex;
    justify-content: space-between;
    padding: 6px 8px;
    margin: 5px 0;
    background: white;
    border-radius: 4px;
}

.completion-message {
    margin: 15px 0;
    padding: 12px;
    background: #e8f5e9;
    border-radius: 8px;
    border-left: 4px solid #4caf50;
    text-align: center;
    animation: bounceIn 0.5s ease;
}

@keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); opacity: 0.8; }
    70% { transform: scale(0.9); opacity: 0.9; }
    100% { transform: scale(1); opacity: 1; }
}

.activity-progress-tracker {
    margin: 0 0 20px 0;
    padding: 16px;
    background: #f0f8ff;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
}

.activity-items {
    margin-top: 10px;
}

.activity-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 5px 0;
    background: white;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.activity-item.completed {
    background: #e8f5e9;
    border-left: 3px solid #4caf50;
}

.activity-item.in-progress {
    background: #fff3e0;
    border-left: 3px solid #ff9800;
}

.prompt-selected-message {
    margin-top: 8px;
    padding: 6px 12px;
    background: #e8f5e9;
    color: #2e7d32;
    border-radius: 4px;
    font-size: 0.9rem;
    animation: slideIn 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .count-stats {
        flex-direction: column;
        gap: 5px;
    }
    
    .analysis-stats {
        flex-direction: column;
        gap: 5px;
    }
    
    .prompt-buttons {
        flex-direction: column;
    }
    
    .prompt-btn {
        text-align: center;
    }
}

/* Writing questions styles */
.writing-results {
    margin: 15px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
}

.writing-results .results-header {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    text-align: center;
    color: #1565c0;
}

.writing-results .detailed-results {
    margin: 15px 0;
}

.writing-results .result-item {
    margin: 10px 0;
    padding: 12px;
    border-radius: 6px;
    border-left: 4px solid transparent;
}

.writing-results .result-item.correct {
    background: #e8f5e9;
    border-left-color: #4caf50;
}

.writing-results .result-item.incorrect {
    background: #ffebee;
    border-left-color: #f44336;
}

.writing-results .result-question {
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
}

.writing-results .result-answer {
    margin: 8px 0;
    font-size: 0.95rem;
}

.writing-results .result-explanation {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
    margin-top: 8px;
    line-height: 1.5;
}

.writing-results .excellence-message {
    text-align: center;
    padding: 15px;
    background: #e8f5e9;
    border-radius: 6px;
    color: #2e7d32;
    font-weight: 600;
    margin: 15px 0;
}

.writing-results .improvement-suggestions {
    margin: 15px 0;
    padding: 12px;
    background: #fff3e0;
    border-radius: 6px;
    border-left: 4px solid #ff9800;
}

.writing-results .improvement-suggestions h4 {
    margin: 0 0 8px 0;
    color: #e65100;
}

.writing-results .improvement-suggestions ul {
    margin: 8px 0 0 20px;
    color: #666;
}

.writing-results .improvement-suggestions li {
    margin: 4px 0;
    line-height: 1.4;
}
</style>
`;

// Check writing questions
window.checkWritingQuestions = function() {
    console.log('checkWritingQuestions function called');
    
    const writingAnswers = {
        writing1: "2", // हल्की-फुल्की हास्यप्रद शैली में गंभीर समस्याओं को उजागर करना
        writing2: "2"  // मोबाइल फोन के कारण होने वाली सामाजिक समस्याओं पर
    };
    
    const explanations = {
        writing1: "शरद जोशी की व्यंग्य शैली की मुख्य विशेषता हल्की-फुल्की हास्यप्रद शैली में गंभीर समस्याओं को उजागर करना है। वे कटु आलोचना नहीं करते बल्कि मानवीयता और करुणा के साथ समाज की कमियों को दिखाते हैं।",
        writing2: "पाठ की समझ में मुख्य फोकस उस विषय से जुड़ी सामाजिक समस्याओं पर होना चाहिए। मोबाइल फोन के व्यसन के कारण होने वाली समस्याओं जैसे पारिवारिक संबंधों में दूरी, स्वास्थ्य समस्याएं, समय की बर्बादी आदि पर ध्यान देना चाहिए।"
    };
    
    let correctCount = 0;
    let totalCount = Object.keys(writingAnswers).length;
    let detailedResults = [];
    
    Object.keys(writingAnswers).forEach(questionName => {
        const selectedRadio = document.querySelector(`input[name="${questionName}"]:checked`);
        const isCorrect = selectedRadio && selectedRadio.value === writingAnswers[questionName];
        
        // Visual feedback
        const questionItem = document.querySelector(`input[name="${questionName}"]`).closest('.question-item');
        const options = questionItem.querySelectorAll('.choice-option');
        
        options.forEach(option => {
            const radio = option.querySelector('input[type="radio"]');
            option.classList.remove('correct', 'incorrect', 'selected');
            
            if (radio.value === writingAnswers[questionName]) {
                option.classList.add('correct');
            } else if (radio.checked && radio.value !== writingAnswers[questionName]) {
                option.classList.add('incorrect');
            }
            
            if (radio.checked) {
                option.classList.add('selected');
            }
        });
        
        if (isCorrect) correctCount++;
        
        detailedResults.push({
            question: questionItem.querySelector('h4').textContent,
            isCorrect: isCorrect,
            userAnswer: selectedRadio ? selectedRadio.nextElementSibling.textContent : 'कोई उत्तर नहीं चुना गया',
            correctAnswer: document.querySelector(`input[name="${questionName}"][value="${writingAnswers[questionName]}"]`).nextElementSibling.textContent,
            explanation: explanations[questionName]
        });
    });
    
    // Display results
    displayWritingResults(correctCount, totalCount, detailedResults);
    
    // Update score
    if (typeof score !== 'undefined') {
        const earnedScore = Math.round((correctCount / totalCount) * 20);
        score += earnedScore;
        if (document.getElementById('totalScore')) {
            document.getElementById('totalScore').textContent = score;
        }
    }
    
    // Track completion
    trackActivityCompletion('writing-questions');
};

// Display writing results
function displayWritingResults(correctCount, totalCount, results) {
    const feedbackEl = document.getElementById('writingFeedback');
    if (!feedbackEl) return;
    
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    let feedbackHTML = `
        <div class="writing-results">
            <div class="results-header">
                📊 पाठ समझ परिणाम: ${correctCount}/${totalCount} (${percentage}%)
            </div>
            
            <div class="detailed-results">
                ${results.map((result, index) => `
                    <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="result-question">${result.question}</div>
                        <div class="result-answer">
                            ${result.isCorrect ? '✅' : '❌'} 
                            आपका उत्तर: <strong>${result.userAnswer}</strong>
                            ${!result.isCorrect ? `<br>सही उत्तर: <strong>${result.correctAnswer}</strong>` : ''}
                        </div>
                        <div class="result-explanation">${result.explanation}</div>
                    </div>
                `).join('')}
            </div>
            
            ${percentage === 100 ? `
                <div class="excellence-message">
                    🎉 बधाई! आपको पाठ की अच्छी समझ है।
                </div>
            ` : `
                <div class="improvement-suggestions">
                    <h4>पाठ की समझ में सुधार के लिए:</h4>
                    <ul>
                        <li>शरद जोशी के अन्य व्यंग्य लेख पढ़ें</li>
                        <li>पाठ को ध्यान से पढ़ें और समझें</li>
                        <li>व्यंग्य में छुपे संदेश को समझने का प्रयास करें</li>
                    </ul>
                </div>
            `}
        </div>
    `;
    
    feedbackEl.innerHTML = feedbackHTML;
    feedbackEl.className = 'feedback-message show ' + (percentage >= 70 ? 'success' : 'error');
}

// Inject styles
document.head.insertAdjacentHTML('beforeend', activitiesStyles);
