/**
 * Questions and interactive exercises for Chapter 3
 * तुम कब जाओगे, अतिथि - शरद जोशी
 */

// मौखिक प्रश्न (Oral Questions) - Reference Format
const oralQuestions = [
    {
        id: 'oral1',
        question: "अतिथि कितने दिनों से लेखक के घर पर रह रहा है?",
        type: 'multiple-choice',
        options: [
            "दो दिन",
            "तीन दिन", 
            "चार दिन",
            "पाँच दिन"
        ],
        correctAnswer: 2,
        explanation: "अतिथि चार दिनों से लेखक के घर पर रह रहा है।"
    },
    {
        id: 'oral2',
        question: "कैलेंडर की तारीखें किस तरह फड़फड़ा रही हैं?",
        type: 'multiple-choice',
        options: [
            "अपनी सीमा में स्नेह से",
            "बेचैनी से",
            "उत्सुकता से",
            "डर से"
        ],
        correctAnswer: 0,
        explanation: "कैलेंडर की तारीखें अपनी सीमा में स्नेह से फड़फड़ा रही हैं।"
    },
    {
        id: 'oral3',
        question: "पत्नी की आँखें क्यों बड़ी-बड़ी हो गईं?",
        type: 'multiple-choice',
        options: [
            "खुशी से",
            "आशंका और भय से कि अतिथि अधिक दिनों तक ठहरेगा",
            "आश्चर्य से",
            "क्रोध से"
        ],
        correctAnswer: 1,
        explanation: "पत्नी की आँखें इस आशंका और भय से बड़ी हुईं कि अतिथि अधिक दिनों तक ठहरेगा।"
    },
    {
        id: 'oral4',
        question: "दोपहर के भोजन को कौन सी गरिमा प्रदान की गई?",
        type: 'multiple-choice',
        options: [
            "डिनर की गरिमा",
            "लंच की गरिमा",
            "ब्रंच की गरिमा",
            "स्नैक्स की गरिमा"
        ],
        correctAnswer: 1,
        explanation: "दोपहर के भोजन को 'लंच' की गरिमा प्रदान की गई।"
    },
    {
        id: 'oral5',
        question: "तीसरे दिन सुबह अतिथि ने क्या कहा?",
        type: 'multiple-choice',
        options: [
            "मैं आज जा रहा हूँ",
            "मैं धोबी को कपड़े देना चाहता हूँ",
            "मुझे खाना चाहिए",
            "मैं सिनेमा देखना चाहता हूँ"
        ],
        correctAnswer: 1,
        explanation: "तीसरे दिन की सुबह अतिथि ने कहा, 'मैं धोबी को कपड़े देना चाहता हूँ।'"
    },
    {
        id: 'oral6',
        question: "सत्कार की ऊष्मा समाप्त होने पर क्या हुआ?",
        type: 'multiple-choice',
        options: [
            "अतिथि चला गया",
            "शब्दों का लेन-देन मिट गया और चर्चा के विषय चुक गए",
            "सब खुश हो गए",
            "नया मेहमान आया"
        ],
        correctAnswer: 1,
        explanation: "सत्कार की ऊष्मा समाप्त होने पर शब्दों का लेन-देन मिट गया और चर्चा के विषय चुक गए।"
    }
];

// लिखित प्रश्न (Written Questions) - Reference Format
const writtenQuestions = [
    {
        id: 'written1',
        question: "लेखक अतिथि को कैसी विदा चाहता था?",
        type: 'multiple-choice',
        options: [
            "एक शानदार मेहमाननवाजी की छाप अपने हृदय में लेकर",
            "बिना कुछ कहे-सुने",
            "क्रोधित होकर",
            "उदासी के साथ"
        ],
        correctAnswer: 0,
        explanation: "लेखक चाहता था कि अतिथि दूसरे दिन किसी रेल से एक शानदार मेहमाननवाजी की छाप अपने हृदय में लेकर चला जाए।"
    },
    {
        id: 'written2',
        question: "'अंदर ही अंदर कहीं मेरा बटुआ काँप गया।' - इस कथन का क्या अर्थ है?",
        type: 'multiple-choice',
        options: [
            "लेखक के पास पैसे नहीं थे",
            "लेखक को डर लगा कि अतिथि की मेहमानदारी में पैसा खर्च होगा",
            "लेखक का बटुआ खो गया था",
            "लेखक ने अतिथि से पैसे माँगे"
        ],
        correctAnswer: 1,
        explanation: "इस वाक्य का अर्थ है कि अतिथि को देखकर लेखक को अंदाज़ा लग गया कि अब उसे मेहमानदारी में काफी पैसा खर्च करना पड़ेगा।"
    },
    {
        id: 'written3',
        question: "'अतिथि सदैव देवता नहीं होता, वह मानव और थोड़े अंशों में राक्षस भी हो सकता है।' - इस कथन का क्या अर्थ है?",
        type: 'multiple-choice',
        options: [
            "अतिथि हमेशा अच्छा होता है",
            "अतिथि कभी-कभी परेशानी का कारण भी बन सकता है",
            "अतिथि हमेशा बुरा होता है",
            "अतिथि को देवता मानना चाहिए"
        ],
        correctAnswer: 1,
        explanation: "इस कथन का अर्थ है कि अतिथि हमेशा देवता नहीं होता, कभी-कभी वह मानव की तरह परेशानी का कारण भी बन सकता है।"
    },
    {
        id: 'written4',
        question: "'लोग दूसरे के होम की स्वीटनेस को काटने न दौड़ें।' - इस कथन का क्या अर्थ है?",
        type: 'multiple-choice',
        options: [
            "लोगों को दूसरों के घर जाना चाहिए",
            "लोगों को दूसरों के घर की मिठास को नष्ट नहीं करना चाहिए",
            "लोगों को मिठाई खानी चाहिए",
            "लोगों को घर बनाना चाहिए"
        ],
        correctAnswer: 1,
        explanation: "इस कथन का अर्थ है कि लोगों को दूसरों के घर की खुशी और शांति को नष्ट नहीं करना चाहिए।"
    },
    {
        id: 'written5',
        question: "'मेरी सहनशीलता की वह अंतिम सुबह होगी।' - इस कथन का क्या अर्थ है?",
        type: 'multiple-choice',
        options: [
            "लेखक की सहनशीलता बढ़ जाएगी",
            "लेखक की सहनशीलता की सीमा समाप्त हो जाएगी",
            "लेखक सुबह उठेगा",
            "लेखक सुबह सोएगा"
        ],
        correctAnswer: 1,
        explanation: "इस कथन का अर्थ है कि लेखक की सहनशीलता की सीमा समाप्त हो जाएगी और वह अब और सहन नहीं कर पाएगा।"
    },
    {
        id: 'written6',
        question: "'एक देवता और एक मनुष्य अधिक देर साथ नहीं रहते।' - इस कथन का क्या अर्थ है?",
        type: 'multiple-choice',
        options: [
            "देवता और मनुष्य एक साथ रह सकते हैं",
            "देवता और मनुष्य अलग-अलग रहते हैं",
            "देवता और मनुष्य हमेशा साथ रहते हैं",
            "देवता और मनुष्य कभी मिलते नहीं"
        ],
        correctAnswer: 1,
        explanation: "इस कथन का अर्थ है कि देवता और मनुष्य अलग-अलग स्तर के होते हैं और अधिक देर तक साथ नहीं रह सकते।"
    }
];

// विस्तृत प्रश्न (Detailed Questions) - Reference Format
const detailedQuestions = [
    {
        id: 'detailed1',
        question: "कौन-सा आघात अप्रत्याशित था और उसका लेखक पर क्या प्रभाव पड़ा?",
        type: 'multiple-choice',
        options: [
            "अतिथि का आना - लेखक खुश हो गया",
            "तीसरे दिन अतिथि का 'धोबी को कपड़े देना चाहता हूँ' कहना - लेखक को लगा कि अतिथि और दिन रुकेगा",
            "अतिथि का जाना - लेखक उदास हो गया",
            "पत्नी का क्रोध - लेखक डर गया"
        ],
        correctAnswer: 1,
        explanation: "तीसरे दिन सुबह अतिथि का 'धोबी को कपड़े देना चाहता हूँ' कहना अप्रत्याशित आघात था। इससे लेखक को लगा कि अतिथि और दिन रुकने की योजना बना रहा है।"
    },
    {
        id: 'detailed2',
        question: "'संबंधों का संक्रमण' के दौर से गुज़रना - इस पंक्ति से आप क्या समझते हैं?",
        type: 'multiple-choice',
        options: [
            "संबंधों में खुशी का आना",
            "एक अवस्था से दूसरी अवस्था में संबंधों का परिवर्तन",
            "संबंधों का मजबूत होना",
            "संबंधों का हमेशा एक समान रहना"
        ],
        correctAnswer: 1,
        explanation: "संक्रमण का अर्थ है एक अवस्था से दूसरी अवस्था में परिवर्तन। यहाँ लेखक और अतिथि के संबंध में बदलाव हो रहा है - शुरू में स्नेह और सत्कार था, अब तनाव और झुंझलाहट आ गई है।"
    },
    {
        id: 'detailed3',
        question: "जब अतिथि चार दिन तक नहीं गया तो लेखक के व्यवहार में क्या-क्या परिवर्तन आए?",
        type: 'multiple-choice',
        options: [
            "लेखक और भी खुश हो गया और अधिक सत्कार करने लगा",
            "लेखक का व्यवहार ठंडा हो गया, बातचीत बंद हो गई और झुंझलाहट आ गई",
            "लेखक ने अतिथि को और भी सुविधाएं देनी शुरू कीं",
            "लेखक ने अतिथि को अपना मित्र बना लिया"
        ],
        correctAnswer: 1,
        explanation: "चार दिन बाद लेखक का व्यवहार बदल गया - वह अतिथि की ओर आँख उठाकर नहीं देखता, बातचीत बंद हो गई, सत्कार की गर्मी समाप्त हो गई, और वह मन में झुंझलाहट महसूस करने लगा।"
    }
];

// Legacy oral questions for backward compatibility
const legacyOralQuestions = [
    {
        question: "अतिथि कितने दिनों से लेखक के घर पर रह रहा है?",
        answer: "अतिथि चार दिनों से लेखक के घर पर रह रहा है।"
    },
    {
        question: "कैलेंडर की तारीखें किस तरह फड़फड़ा रही हैं?",
        answer: "कैलेंडर की तारीखें अपनी सीमा में स्नेह से फड़फड़ा रही हैं।"
    },
    {
        question: "पत्नी की आँखें क्यों बड़ी-बड़ी हो गईं?",
        answer: "पत्नी की आँखें इस आशंका और भय से बड़ी हुईं कि अतिथि अधिक दिनों तक ठहरेगा।"
    },
    {
        question: "दोपहर के भोजन को कौन सी गरिमा प्रदान की गई?",
        answer: "दोपहर के भोजन को 'लंच' की गरिमा प्रदान की गई।"
    },
    {
        question: "तीसरे दिन सुबह अतिथि ने क्या कहा?",
        answer: "तीसरे दिन सुबह अतिथि ने कहा कि वह धोबी को कपड़े देना चाहता है।"
    },
    {
        question: "सत्कार की ऊष्मा समाप्त होने पर क्या हुआ?",
        answer: "सत्कार की ऊष्मा समाप्त होने पर शब्दों का लेन-देन मिट गया और चर्चा के विषय चुक गए।"
    }
];

// Current question being displayed
let currentQuestionIndex = 0;
let userAnswers = {};

// Initialize questions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load questions when the thinking-text tab is activated
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            if (this.textContent.includes('प्रश्न अभ्यास')) {
                setTimeout(loadTextQuestions, 100);
            }
        });
    });

    // Also load content if that tab is initially active
    if (document.querySelector('.nav-item.active') && 
        document.querySelector('.nav-item.active').textContent.includes('प्रश्न अभ्यास')) {
        setTimeout(loadTextQuestions, 100);
    }
});

// Function to load text comprehension questions
function loadTextQuestions() {
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) {
        console.error('Questions container not found');
        return;
    }

    let questionsHTML = `
        <div class="question-section-title">मौखिक प्रश्न</div>
        <div class="oral-questions-section">
            ${oralQuestions.map((q, index) => generateQuestionHTML(q, index)).join('')}
        </div>

        <div class="question-section-title">लिखित प्रश्न</div>
        <div class="written-questions-section">
            ${writtenQuestions.map((q, index) => generateQuestionHTML(q, index)).join('')}
        </div>

        <div class="question-section-title">विस्तृत प्रश्न</div>
        <div class="detailed-questions-section">
            ${detailedQuestions.map((q, index) => generateQuestionHTML(q, index)).join('')}
        </div>
    `;

    questionsContainer.innerHTML = questionsHTML;
    
    // Initialize question interactions
    initializeQuestionInteractions();
}

// Function to generate HTML for different question types
function generateQuestionHTML(question, index) {
    switch (question.type) {
        case 'multiple-choice':
            return `
                <div class="question-item" data-question-id="${question.id}">
                    <div class="question-text">${index + 1}. ${question.question}</div>
                    <div class="question-options">
                        ${question.options.map((option, optIndex) => `
                            <div class="option">
                                <input type="radio" id="${question.id}_option_${optIndex}" 
                                       name="${question.id}" value="${optIndex}">
                                <label for="${question.id}_option_${optIndex}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                    <button class="interactive-btn" onclick="checkAnswer('${question.id}', ${index})">उत्तर जाँचें</button>
                    <div class="question-feedback" id="feedback_${question.id}"></div>
                </div>
            `;
        
        case 'essay':
            return `
                <div class="question-item" data-question-id="${question.id}">
                    <div class="question-text">${index + 1}. ${question.question_text || question.question}</div>
                    <textarea class="question-textarea" id="${question.id}_textarea" 
                              placeholder="अपना उत्तर यहाँ लिखें..." rows="6"></textarea>
                    <button class="interactive-btn" onclick="checkEssayAnswer('${question.id}', ${index})">उत्तर सहेजें</button>
                    <div class="question-feedback" id="feedback_${question.id}"></div>
                    ${question.sample_answer ? `
                        <div class="sample-answer" id="sample_${question.id}" style="display: none;">
                            <h4>नमूना उत्तर:</h4>
                            <p>${question.sample_answer}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        
        case 'explanation':
            return `
                <div class="question-item" data-question-id="${question.id}">
                    <div class="question-text">${index + 1}. ${question.question}</div>
                    ${question.statements.map((stmt, stmtIndex) => `
                        <div class="explanation-item">
                            <div class="statement">"${stmt.statement}"</div>
                            <div class="explanation-display" id="explanation_${question.id}_${stmtIndex}" style="display: none;">
                                <strong>व्याख्या:</strong> ${stmt.explanation}
                            </div>
                            <button class="interactive-btn" onclick="showExplanation('${question.id}', ${stmtIndex})">व्याख्या देखें</button>
                        </div>
                    `).join('')}
                </div>
            `;
        
        default:
            return '';
    }
}

// Function to initialize question interactions
function initializeQuestionInteractions() {
    // Add change listeners to radio buttons for immediate feedback
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const questionId = this.name;
            const questionItem = document.querySelector(`[data-question-id="${questionId}"]`);
            if (questionItem) {
                questionItem.classList.add('answered');
            }
        });
    });
    
    // Add input listeners to textareas
    document.querySelectorAll('.question-textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            const questionId = this.id.replace('_textarea', '');
            const questionItem = document.querySelector(`[data-question-id="${questionId}"]`);
            if (questionItem && this.value.trim().length > 10) {
                questionItem.classList.add('answered');
            }
        });
    });
}

// Function to show oral question answers
function showOralAnswer(index) {
    const answerDiv = document.getElementById(`oral-answer-${index}`);
    const button = answerDiv.previousElementSibling;
    const questionDiv = button.previousElementSibling;
    
    // Show the answer if it's not already shown
    if (answerDiv.style.display === 'none' || answerDiv.style.display === '') {
        answerDiv.style.display = 'block';
        
        // Get the question text and display it on the button
        const questionText = questionDiv.textContent.trim();
        button.textContent = questionText;
        button.classList.add('answer-shown');
        button.disabled = true;
        
        // Hide the original question text since it's now on the button
        questionDiv.style.display = 'none';
        
        // Add animation effect
        answerDiv.style.animation = 'fadeIn 0.3s ease-in-out';
        
        // Announce to screen reader
        if (window.announceToScreenReader) {
            window.announceToScreenReader('उत्तर दिखाया गया');
        }
    }
}

// Function to check multiple choice answers
function checkAnswer(questionId, questionIndex) {
    // Find the question in any of the question arrays
    let question = null;
    let questionArray = null;
    
    if (questionId.startsWith('oral')) {
        questionArray = oralQuestions;
        question = oralQuestions.find(q => q.id === questionId);
    } else if (questionId.startsWith('written')) {
        questionArray = writtenQuestions;
        question = writtenQuestions.find(q => q.id === questionId);
    } else if (questionId.startsWith('detailed')) {
        questionArray = detailedQuestions;
        question = detailedQuestions.find(q => q.id === questionId);
    }
    
    if (!question) {
        console.error(`Question not found: ${questionId}`);
        return;
    }
    
    const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
    const feedbackDiv = document.getElementById(`feedback_${questionId}`);
    
    if (!selectedOption) {
        feedbackDiv.textContent = 'कृपया कोई विकल्प चुनें।';
        feedbackDiv.className = 'question-feedback show warning';
        return;
    }
    
    const selectedValue = parseInt(selectedOption.value);
    const isCorrect = selectedValue === question.correctAnswer;
    
    // Color code the options
    document.querySelectorAll(`input[name="${questionId}"]`).forEach((option, index) => {
        const optionDiv = option.closest('.option');
        if (index === question.correctAnswer) {
            optionDiv.style.backgroundColor = '#e8f5e9';
            optionDiv.style.borderLeft = '4px solid #4caf50';
        } else if (index === selectedValue && !isCorrect) {
            optionDiv.style.backgroundColor = '#ffebee';
            optionDiv.style.borderLeft = '4px solid #f44336';
        }
    });
    
    if (isCorrect) {
        feedbackDiv.innerHTML = `<strong>सही उत्तर!</strong> ${question.explanation}`;
        feedbackDiv.className = 'question-feedback show correct';
        
        // Add to score
        if (!userAnswers[questionId]) {
            score += 10;
            document.getElementById('totalScore').textContent = score;
            userAnswers[questionId] = true;
        }
    } else {
        feedbackDiv.innerHTML = `<strong>गलत उत्तर।</strong> ${question.explanation}`;
        feedbackDiv.className = 'question-feedback show incorrect';
    }
    
    // Speak feedback if narrator is available
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(isCorrect ? 'सही उत्तर!' : 'गलत उत्तर।');
    }
}

// Function to check essay answers
function checkEssayAnswer(questionId, questionIndex) {
    const question = essayQuestions[questionIndex];
    const textarea = document.getElementById(`${questionId}_textarea`);
    const feedbackDiv = document.getElementById(`feedback_${questionId}`);
    const sampleAnswerDiv = document.getElementById(`sample_${questionId}`);
    
    if (!textarea.value.trim()) {
        feedbackDiv.textContent = 'कृपया अपना उत्तर लिखें।';
        feedbackDiv.className = 'question-feedback show warning';
        return;
    }
    
    const answerLength = textarea.value.trim().length;
    
    if (answerLength < 20) {
        feedbackDiv.textContent = 'कृपया अधिक विस्तार से उत्तर लिखें।';
        feedbackDiv.className = 'question-feedback show warning';
        return;
    }
    
    feedbackDiv.textContent = 'आपका उत्तर सहेज लिया गया है। उत्कृष्ट विचार!';
    feedbackDiv.className = 'question-feedback show correct';
    
    // Show sample answer if available
    if (sampleAnswerDiv) {
        sampleAnswerDiv.style.display = 'block';
    }
    
    // Add to score
    if (!userAnswers[questionId]) {
        score += 15;
        document.getElementById('totalScore').textContent = score;
        userAnswers[questionId] = true;
    }
    
    // Speak feedback if narrator is available
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak('आपका उत्तर सहेज लिया गया है।');
    }
}

// Function to show explanations
function showExplanation(questionId, statementIndex) {
    const explanationDiv = document.getElementById(`explanation_${questionId}_${statementIndex}`);
    const button = explanationDiv.nextElementSibling;
    
    if (explanationDiv.style.display === 'none') {
        explanationDiv.style.display = 'block';
        button.textContent = 'व्याख्या छुपाएं';
        button.classList.add('active');
    } else {
        explanationDiv.style.display = 'none';
        button.textContent = 'व्याख्या देखें';
        button.classList.remove('active');
    }
}

// Additional CSS for questions
const questionStyles = `
<style>
.question-section-title {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin: 30px 0 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0,0,0,0.05);
    font-weight: 600;
}

.oral-questions-section,
.written-questions-section {
    margin-bottom: 40px;
}

.question-item {
    background: white;
    border-radius: var(--card-radius);
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0,0,0,0.05);
    transition: var(--transition);
}

.question-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.question-item.answered {
    border-left: 4px solid #4caf50;
}

.question-text {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 15px;
    line-height: 1.6;
}

.question-options {
    margin: 15px 0;
}

.answer-display,
.explanation-display {
    margin: 15px 0;
    padding: 12px 16px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
    animation: fadeIn 0.5s ease;
}

.sample-answer {
    margin: 20px 0;
    padding: 16px;
    background: #e8f5e9;
    border-radius: 8px;
    border-left: 4px solid #4caf50;
    animation: fadeIn 0.5s ease;
}

.sample-answer h4 {
    color: #2e7d32;
    margin-bottom: 10px;
}

.explanation-item {
    margin: 15px 0;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 8px;
    border-left: 4px solid #e0e0e0;
}

.statement {
    font-style: italic;
    font-weight: 500;
    color: var(--primary-color);
    margin-bottom: 10px;
    padding: 8px 12px;
    background: rgba(139, 69, 19, 0.05);
    border-radius: 4px;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

 .interactive-btn.active {
     background: var(--secondary-color);
     transform: translateY(-1px);
 }
 
 .interactive-btn.answer-shown {
     background: #4caf50;
     border-color: #4caf50;
     color: white;
     cursor: default;
     opacity: 0.9;
     white-space: normal;
     text-align: left;
     padding: 12px 16px;
     min-height: auto;
     line-height: 1.4;
     font-size: 0.95rem;
 }
 
 .interactive-btn.answer-shown:hover {
     background: #4caf50;
     border-color: #4caf50;
     transform: none;
 }
 
 .interactive-btn:disabled {
     opacity: 0.7;
     cursor: not-allowed;
 }

/* Responsive adjustments */
@media (max-width: 768px) {
    .question-item {
        padding: 15px;
    }
    
    .question-text {
        font-size: 1rem;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', questionStyles);
