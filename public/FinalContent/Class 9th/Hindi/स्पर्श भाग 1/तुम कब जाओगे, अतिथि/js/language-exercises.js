/**
 * Language exercises for Chapter 3 module
 * Enhanced vocabulary and grammar activities
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load language exercises when the tab is activated
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', function() {
            if (this.textContent.includes('भाषा अध्ययन')) {
                setTimeout(initializeLanguageExercises, 100);
            }
        });
    });

    // Also load content if that tab is initially active
    if (document.querySelector('.nav-item.active') && 
        document.querySelector('.nav-item.active').textContent.includes('भाषा अध्ययन')) {
        setTimeout(initializeLanguageExercises, 100);
    }
});

// Initialize all language exercises
function initializeLanguageExercises() {
    console.log('Initializing language exercises');
    setupVocabularyExercises();
    setupGrammarExercises();
    addLanguageLearningFeatures();
    addProgressTracking();
}

// Setup vocabulary exercises with enhanced features
function setupVocabularyExercises() {
    // Add enhanced vocabulary checking
    const vocabButton = document.querySelector('button[onclick*="checkVocabulary"]');
    if (vocabButton) {
        vocabButton.onclick = function() {
            checkVocabularyEnhanced();
        };
    }
    
    // Add vocabulary hints
    addVocabularyHints();
    
    // Add practice mode
    addVocabularyPracticeMode();
    
    // Add vocabulary games
    addVocabularyGames();
}

// Enhanced vocabulary checking with detailed feedback
function checkVocabularyEnhanced() {
    const vocabAnswers = {
        vocab1: "मेहमान",
        vocab2: "स्वागत",
        vocab3: "आना", 
        vocab4: "आतिथेय",
        vocab5: "धैर्य"
    };
    
    const explanations = {
        vocab1: "अतिथि का अर्थ है जो अतिथि के रूप में आया हो, यानी मेहमान",
        vocab2: "सत्कार का अर्थ है सम्मान के साथ स्वागत करना",
        vocab3: "आगमन का अर्थ है किसी स्थान पर आना",
        vocab4: "मेजबान वह होता है जो अतिथि का स्वागत करता है, यानी आतिथेय",
        vocab5: "सहनशीलता का अर्थ है कष्ट या परेशानी को सहन करने का गुण, यानी धैर्य"
    };
    
    let correctCount = 0;
    let totalCount = Object.keys(vocabAnswers).length;
    let detailedResults = [];
    
    Object.keys(vocabAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const userAnswer = select.value;
            const correctAnswer = vocabAnswers[id];
            const isCorrect = userAnswer === correctAnswer;
            
            // Visual feedback
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            select.style.backgroundColor = isCorrect ? 
                'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)';
            
            // Add animation
            select.classList.add(isCorrect ? 'correct-answer' : 'incorrect-answer');
            setTimeout(() => {
                select.classList.remove('correct-answer', 'incorrect-answer');
            }, 2000);
            
            if (isCorrect) {
                correctCount++;
            }
            
            detailedResults.push({
                question: select.closest('.vocab-question').querySelector('p').textContent,
                userAnswer: userAnswer || 'चयन नहीं किया गया',
                correctAnswer: correctAnswer,
                isCorrect: isCorrect,
                explanation: explanations[id]
            });
        }
    });
    
    // Display enhanced feedback
    displayVocabularyResults(correctCount, totalCount, detailedResults);
    
    // Update progress
    updateLanguageProgress('vocabulary', correctCount, totalCount);
    
    // Provide audio feedback
    if (window.narrator && window.narrator.enabled) {
        const message = `शब्दार्थ अभ्यास पूर्ण। आपने ${totalCount} में से ${correctCount} सही उत्तर दिए।`;
        window.narrator.speak(message);
    }
}

// Display detailed vocabulary results
function displayVocabularyResults(correctCount, totalCount, results) {
    const feedbackEl = document.getElementById('vocabFeedback');
    if (!feedbackEl) return;
    
    const percentage = Math.round((correctCount / totalCount) * 100);
    let performanceLevel = '';
    let performanceColor = '';
    
    if (percentage >= 90) {
        performanceLevel = 'उत्कृष्ट';
        performanceColor = '#4caf50';
    } else if (percentage >= 70) {
        performanceLevel = 'अच्छा';
        performanceColor = '#8bc34a';
    } else if (percentage >= 50) {
        performanceLevel = 'संतोषजनक';
        performanceColor = '#ff9800';
    } else {
        performanceLevel = 'सुधार की आवश्यकता';
        performanceColor = '#f44336';
    }
    
    let feedbackHTML = `
        <div class="vocab-results">
            <div class="results-header" style="color: ${performanceColor}">
                📊 परिणाम: ${correctCount}/${totalCount} सही (${percentage}%)
                <span class="performance-badge" style="background: ${performanceColor}">${performanceLevel}</span>
            </div>
            
            <div class="detailed-results">
                ${results.map((result, index) => `
                    <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="result-question">${index + 1}. ${result.question}</div>
                        <div class="result-answer">
                            ${result.isCorrect ? '✅' : '❌'} 
                            आपका उत्तर: <strong>${result.userAnswer}</strong>
                            ${!result.isCorrect ? `| सही उत्तर: <strong>${result.correctAnswer}</strong>` : ''}
                        </div>
                        <div class="result-explanation">${result.explanation}</div>
                    </div>
                `).join('')}
            </div>
            
            ${percentage < 80 ? `
                <div class="improvement-suggestions">
                    <h4>सुधार के सुझाव:</h4>
                    <ul>
                        <li>शब्द-कोश का नियमित अध्ययन करें</li>
                        <li>पर्यायवाची शब्दों की सूची बनाएं</li>
                        <li>वाक्य प्रयोग के माध्यम से शब्दों को याद करें</li>
                        <li>व्यंग्य लेखों में प्रयुक्त शब्दों पर विशेष ध्यान दें</li>
                    </ul>
                </div>
            ` : `
                <div class="excellence-message">
                    🎉 बधाई! आपने शब्दार्थ अभ्यास में उत्कृष्ट प्रदर्शन किया है।
                </div>
            `}
        </div>
    `;
    
    feedbackEl.innerHTML = feedbackHTML;
    feedbackEl.className = 'feedback-message show ' + (percentage >= 70 ? 'success' : 'error');
    
    // Update score
    if (typeof score !== 'undefined') {
        const earnedScore = Math.round((correctCount / totalCount) * 20);
        score += earnedScore;
        if (document.getElementById('totalScore')) {
            document.getElementById('totalScore').textContent = score;
        }
    }
}

// Add vocabulary hints
function addVocabularyHints() {
    document.querySelectorAll('.vocab-question').forEach(question => {
        const hintButton = document.createElement('button');
        hintButton.className = 'hint-button';
        hintButton.textContent = '💡 संकेत';
        hintButton.type = 'button';
        hintButton.onclick = function() {
            showVocabularyHint(this);
        };
        
        question.appendChild(hintButton);
    });
}

// Show vocabulary hints
function showVocabularyHint(button) {
    const question = button.closest('.vocab-question');
    const questionText = question.querySelector('p').textContent;
    
    const hints = {
        'अतिथि': 'जो घर आया हो, मेहमान के लिए प्रयुक्त शब्द',
        'सत्कार': 'सम्मान के साथ किया जाने वाला काम',
        'आगमन': 'किसी स्थान पर पहुंचने की क्रिया',
        'मेजबान': 'जो किसी का स्वागत करता है',
        'सहनशीलता': 'कष्ट को सहन करने का गुण'
    };
    
    // Find relevant hint
    let hint = 'इस शब्द का संदर्भ ध्यान से देखें।';
    Object.keys(hints).forEach(word => {
        if (questionText.includes(word)) {
            hint = hints[word];
        }
    });
    
    // Show hint
    showHintPopup(button, hint);
}

// Show hint popup
function showHintPopup(element, hint) {
    // Remove existing hints
    document.querySelectorAll('.hint-popup').forEach(popup => popup.remove());
    
    const popup = document.createElement('div');
    popup.className = 'hint-popup';
    popup.innerHTML = `
        <div class="hint-content">
            💡 ${hint}
            <button class="hint-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Position popup
    const rect = element.getBoundingClientRect();
    popup.style.position = 'absolute';
    popup.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    popup.style.left = (rect.left + window.scrollX) + 'px';
    popup.style.zIndex = '1000';
    
    document.body.appendChild(popup);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 8000);
}

// Add vocabulary practice mode
function addVocabularyPracticeMode() {
    const vocabSection = document.querySelector('.vocabulary-exercise');
    if (!vocabSection) return;
    
    const practiceButton = document.createElement('button');
    practiceButton.className = 'interactive-btn practice-btn';
    practiceButton.textContent = '🎯 अभ्यास मोड';
    practiceButton.onclick = startVocabularyPractice;
    
    vocabSection.insertBefore(practiceButton, vocabSection.querySelector('button'));
}

// Start vocabulary practice mode
function startVocabularyPractice() {
    const practiceWords = [
        { word: 'अतिथि', options: ['मेहमान', 'मालिक', 'सेवक', 'पड़ोसी'], correct: 0 },
        { word: 'सत्कार', options: ['अपमान', 'स्वागत', 'उपेक्षा', 'निंदा'], correct: 1 },
        { word: 'आगमन', options: ['गमन', 'आना', 'जाना', 'ठहरना'], correct: 1 },
        { word: 'विसंगति', options: ['समानता', 'असंगति', 'एकता', 'मेल'], correct: 1 },
        { word: 'व्यंग्य', options: ['प्रशंसा', 'हास्य युक्त आलोचना', 'गुस्सा', 'खुशी'], correct: 1 }
    ];
    
    createPracticeModal(practiceWords);
}

// Create practice modal
function createPracticeModal(words) {
    const modal = document.createElement('div');
    modal.className = 'practice-modal';
    modal.innerHTML = `
        <div class="practice-content">
            <div class="practice-header">
                <h3>🎯 शब्दार्थ अभ्यास</h3>
                <button class="close-practice" onclick="this.closest('.practice-modal').remove()">×</button>
            </div>
            <div class="practice-body">
                <div class="practice-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <span class="progress-text">0 / ${words.length}</span>
                </div>
                <div class="practice-question" id="practiceQuestion">
                    <!-- Question will be loaded here -->
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Start practice session
    let currentQuestion = 0;
    let correctAnswers = 0;
    
    function loadQuestion() {
        const word = words[currentQuestion];
        const questionEl = document.getElementById('practiceQuestion');
        
        questionEl.innerHTML = `
            <div class="practice-word">
                "${word.word}" का सही अर्थ चुनिए:
            </div>
            <div class="practice-options">
                ${word.options.map((option, index) => `
                    <button class="practice-option" onclick="checkPracticeAnswer(${index}, ${word.correct})">${option}</button>
                `).join('')}
            </div>
            <div class="practice-feedback" id="practiceFeedback"></div>
        `;
    }
    
    window.checkPracticeAnswer = function(selected, correct) {
        const feedbackEl = document.getElementById('practiceFeedback');
        const options = document.querySelectorAll('.practice-option');
        
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === correct) {
                option.style.backgroundColor = '#4caf50';
                option.style.color = 'white';
            } else if (index === selected && selected !== correct) {
                option.style.backgroundColor = '#f44336';
                option.style.color = 'white';
            }
        });
        
        if (selected === correct) {
            correctAnswers++;
            feedbackEl.innerHTML = '<span style="color: #4caf50;">✅ सही उत्तर!</span>';
        } else {
            feedbackEl.innerHTML = '<span style="color: #f44336;">❌ गलत उत्तर</span>';
        }
        
        // Next question
        setTimeout(() => {
            currentQuestion++;
            updatePracticeProgress(currentQuestion, words.length);
            
            if (currentQuestion < words.length) {
                loadQuestion();
            } else {
                showPracticeResults(correctAnswers, words.length);
            }
        }, 2000);
    };
    
    function updatePracticeProgress(current, total) {
        const progressFill = modal.querySelector('.progress-fill');
        const progressText = modal.querySelector('.progress-text');
        
        const percentage = (current / total) * 100;
        progressFill.style.width = percentage + '%';
        progressText.textContent = `${current} / ${total}`;
    }
    
    function showPracticeResults(correct, total) {
        const questionEl = document.getElementById('practiceQuestion');
        const percentage = Math.round((correct / total) * 100);
        
        questionEl.innerHTML = `
            <div class="practice-results">
                <h4>अभ्यास पूर्ण!</h4>
                <div class="result-score">
                    आपका स्कोर: ${correct}/${total} (${percentage}%)
                </div>
                <div class="result-message">
                    ${percentage >= 80 ? '🎉 उत्कृष्ट प्रदर्शन!' : 
                      percentage >= 60 ? '👍 अच्छा प्रयास!' : '📚 और अभ्यास की आवश्यकता है।'}
                </div>
                <button class="interactive-btn" onclick="this.closest('.practice-modal').remove()">
                    बंद करें
                </button>
            </div>
        `;
    }
    
    // Load first question
    loadQuestion();
}

// Setup grammar exercises
function setupGrammarExercises() {
    // Enhanced grammar checking
    const grammarButton = document.querySelector('button[onclick*="checkGrammar"]');
    if (grammarButton) {
        grammarButton.onclick = function() {
            checkGrammarEnhanced();
        };
    }
    
    // Add grammar explanations
    addGrammarExplanations();
    
    // Add sentence construction exercise
    addSentenceConstruction();
}

// Enhanced grammar checking
function checkGrammarEnhanced() {
    const grammarAnswers = {
        grammar1: "3", 
        grammar2: "1", 
        grammar3: "1"
    };
    
    const explanations = {
        grammar1: "नकारात्मक वाक्य में 'कभी नहीं' का प्रयोग होता है।",
        grammar2: "प्रश्नवाचक वाक्य में 'क्या' का प्रयोग होता है।",
        grammar3: "भूतकाल में 'था/थी/थे' का प्रयोग होता है।"
    };
    
    let correctCount = 0;
    let totalCount = Object.keys(grammarAnswers).length;
    let results = [];
    
    Object.keys(grammarAnswers).forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const isCorrect = select.value === grammarAnswers[id];
            
            // Visual feedback
            select.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            select.style.backgroundColor = isCorrect ? 
                'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)';
            
            if (isCorrect) correctCount++;
            
            results.push({
                question: select.closest('.grammar-item').querySelector('p').textContent,
                isCorrect: isCorrect,
                explanation: explanations[id]
            });
        }
    });
    
    // Display results
    displayGrammarResults(correctCount, totalCount, results);
    
    // Update progress
    updateLanguageProgress('grammar', correctCount, totalCount);
}

// Display grammar results
function displayGrammarResults(correctCount, totalCount, results) {
    const feedbackEl = document.getElementById('grammarFeedback');
    if (!feedbackEl) return;
    
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    let feedbackHTML = `
        <div class="grammar-results">
            <div class="results-summary">
                📊 व्याकरण परिणाम: ${correctCount}/${totalCount} (${percentage}%)
            </div>
            
            <div class="grammar-explanations">
                ${results.map((result, index) => `
                    <div class="grammar-explanation ${result.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="explanation-header">
                            ${result.isCorrect ? '✅' : '❌'} प्रश्न ${index + 1}
                        </div>
                        <div class="explanation-text">${result.explanation}</div>
                    </div>
                `).join('')}
            </div>
            
            ${percentage === 100 ? `
                <div class="perfect-score">
                    🎉 परफेक्ट स्कोर! आप व्याकरण में माहिर हैं।
                </div>
            ` : `
                <div class="grammar-tips">
                    <h4>व्याकरण सुधार के लिए:</h4>
                    <ul>
                        <li>वाक्य रूपांतरण का अधिक अभ्यास करें</li>
                        <li>काल (tense) की पहचान सीखें</li>
                        <li>प्रश्नवाचक और नकारात्मक वाक्यों के नियम याद करें</li>
                    </ul>
                </div>
            `}
        </div>
    `;
    
    feedbackEl.innerHTML = feedbackHTML;
    feedbackEl.className = 'feedback-message show ' + (percentage >= 70 ? 'success' : 'error');
}

// Add grammar explanations
function addGrammarExplanations() {
    const grammarItems = document.querySelectorAll('.grammar-item');
    
    grammarItems.forEach(item => {
        const explanationButton = document.createElement('button');
        explanationButton.className = 'explanation-button';
        explanationButton.textContent = '📖 व्याख्या';
        explanationButton.type = 'button';
        explanationButton.onclick = function() {
            showGrammarExplanation(this);
        };
        
        item.appendChild(explanationButton);
    });
}

// Show grammar explanation
function showGrammarExplanation(button) {
    const item = button.closest('.grammar-item');
    const questionText = item.querySelector('p').textContent;
    
    const explanations = {
        'नकारात्मक': 'नकारात्मक वाक्य में "नहीं" का प्रयोग करके वाक्य को नकारात्मक बनाया जाता है।',
        'प्रश्नवाचक': 'प्रश्नवाचक वाक्य में "क्या", "कब", "कहाँ", "कैसे" आदि प्रश्नवाचक शब्दों का प्रयोग होता है।',
        'भूतकाल': 'भूतकाल में बीते समय की घटनाओं को दर्शाने के लिए "था", "थी", "थे" का प्रयोग होता है।'
    };
    
    let explanation = 'व्याकरण के नियमों के अनुसार वाक्य का रूपांतरण करें।';
    
    Object.keys(explanations).forEach(key => {
        if (questionText.includes(key)) {
            explanation = explanations[key];
        }
    });
    
    showExplanationModal(explanation);
}

// Show explanation modal
function showExplanationModal(explanation) {
    const modal = document.createElement('div');
    modal.className = 'explanation-modal';
    modal.innerHTML = `
        <div class="explanation-content">
            <div class="explanation-header">
                <h4>📖 व्याकरण व्याख्या</h4>
                <button class="close-explanation" onclick="this.closest('.explanation-modal').remove()">×</button>
            </div>
            <div class="explanation-body">
                ${explanation}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 10000);
}

// Add sentence construction exercise
function addSentenceConstruction() {
    const languageModule = document.getElementById('thinking-language');
    if (!languageModule) return;
    
    const constructionHTML = `
        <div class="exercise-card">
            <h2 class="exercise-title">
                <span class="exercise-icon">🔨</span>
                वाक्य निर्माण अभ्यास
            </h2>
            <div class="content-block">
                <p>दिए गए शब्दों का प्रयोग करके सार्थक वाक्य बनाइए:</p>
            </div>
            
            <div class="construction-exercise">
                <div class="word-bank">
                    <h4>शब्द भंडार:</h4>
                    <div class="words">
                        <span class="word-chip" draggable="true">अतिथि</span>
                        <span class="word-chip" draggable="true">सत्कार</span>
                        <span class="word-chip" draggable="true">मेजबान</span>
                        <span class="word-chip" draggable="true">परंपरा</span>
                        <span class="word-chip" draggable="true">सम्मान</span>
                    </div>
                </div>
                
                <div class="sentence-builder">
                    <h4>वाक्य निर्माण क्षेत्र:</h4>
                    <div class="drop-zone" id="sentenceArea">
                        यहाँ शब्दों को खींचकर छोड़ें
                    </div>
                    <button class="interactive-btn" onclick="checkSentence()">वाक्य जाँचें</button>
                    <button class="interactive-btn" onclick="clearSentence()">साफ़ करें</button>
                </div>
                
                <div id="sentenceFeedback" class="feedback-message"></div>
            </div>
        </div>
    `;
    
    languageModule.insertAdjacentHTML('beforeend', constructionHTML);
    
    // Setup drag and drop
    setupDragAndDrop();
}

// Setup drag and drop for sentence construction
function setupDragAndDrop() {
    const wordChips = document.querySelectorAll('.word-chip');
    const dropZone = document.getElementById('sentenceArea');
    
    wordChips.forEach(chip => {
        chip.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.textContent);
            this.classList.add('dragging');
        });
        
        chip.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const word = e.dataTransfer.getData('text/plain');
        if (this.textContent === 'यहाँ शब्दों को खींचकर छोड़ें') {
            this.textContent = word;
        } else {
            this.textContent += ' ' + word;
        }
    });
}

// Check constructed sentence
window.checkSentence = function() {
    const sentenceArea = document.getElementById('sentenceArea');
    const sentence = sentenceArea.textContent.trim();
    const feedbackEl = document.getElementById('sentenceFeedback');
    
    if (sentence === 'यहाँ शब्दों को खींचकर छोड़ें' || sentence === '') {
        feedbackEl.textContent = 'कृपया कोई वाक्य बनाएं।';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Simple sentence validation
    const hasVerb = sentence.includes('करता') || sentence.includes('होता') || sentence.includes('देता');
    const hasNoun = sentence.includes('अतिथि') || sentence.includes('मेजबान');
    
    if (hasVerb && hasNoun) {
        feedbackEl.innerHTML = `
            <strong>उत्कृष्ट!</strong> आपने एक सार्थक वाक्य बनाया है:<br>
            <em>"${sentence}"</em>
        `;
        feedbackEl.className = 'feedback-message show success';
    } else {
        feedbackEl.innerHTML = `
            आपका वाक्य: <em>"${sentence}"</em><br>
            सुझाव: वाक्य में क्रिया (verb) और संज्ञा (noun) दोनों होने चाहिए।
        `;
        feedbackEl.className = 'feedback-message show error';
    }
};

// Clear constructed sentence
window.clearSentence = function() {
    const sentenceArea = document.getElementById('sentenceArea');
    sentenceArea.textContent = 'यहाँ शब्दों को खींचकर छोड़ें';
    
    const feedbackEl = document.getElementById('sentenceFeedback');
    feedbackEl.className = 'feedback-message';
    feedbackEl.textContent = '';
};

// Add language learning features
function addLanguageLearningFeatures() {
    // Add pronunciation guide
    addPronunciationGuide();
    
    // Add etymology information
    addEtymologyInfo();
    
    // Add usage examples
    addUsageExamples();
}

// Add pronunciation guide
function addPronunciationGuide() {
    document.querySelectorAll('.vocab-question').forEach(question => {
        const pronounceButton = document.createElement('button');
        pronounceButton.className = 'pronounce-button';
        pronounceButton.textContent = '🔊 उच्चारण';
        pronounceButton.type = 'button';
        pronounceButton.onclick = function() {
            pronounceWord(this);
        };
        
        question.appendChild(pronounceButton);
    });
}

// Pronounce word
function pronounceWord(button) {
    const question = button.closest('.vocab-question');
    const questionText = question.querySelector('p').textContent;
    
    // Extract the main word from question
    const words = ['अतिथि', 'सत्कार', 'आगमन', 'मेजबान', 'सहनशीलता'];
    let wordToPronounce = '';
    
    words.forEach(word => {
        if (questionText.includes(word)) {
            wordToPronounce = word;
        }
    });
    
    if (wordToPronounce && window.narrator && window.narrator.enabled) {
        window.narrator.speak(wordToPronounce);
    }
}

// Update language progress
function updateLanguageProgress(type, correct, total) {
    // Create or update progress tracker
    let progressTracker = document.querySelector('.language-progress-tracker');
    if (!progressTracker) {
        progressTracker = document.createElement('div');
        progressTracker.className = 'language-progress-tracker';
        progressTracker.innerHTML = `
            <h4>📊 भाषा अध्ययन प्रगति</h4>
            <div class="progress-items">
                <div class="progress-item" data-type="vocabulary">
                    <span>शब्दार्थ:</span>
                    <span class="progress-score">0%</span>
                </div>
                <div class="progress-item" data-type="grammar">
                    <span>व्याकरण:</span>
                    <span class="progress-score">0%</span>
                </div>
            </div>
        `;
        
        const languageModule = document.getElementById('thinking-language');
        if (languageModule) {
            languageModule.querySelector('.exercise-card').insertAdjacentHTML('afterbegin', progressTracker.outerHTML);
            progressTracker = document.querySelector('.language-progress-tracker');
        }
    }
    
    // Update specific progress
    const progressItem = progressTracker.querySelector(`[data-type="${type}"]`);
    if (progressItem) {
        const percentage = Math.round((correct / total) * 100);
        const scoreSpan = progressItem.querySelector('.progress-score');
        scoreSpan.textContent = `${percentage}%`;
        scoreSpan.style.color = percentage >= 70 ? '#4caf50' : percentage >= 50 ? '#ff9800' : '#f44336';
    }
}

// Add progress tracking
function addProgressTracking() {
    // Track completion of exercises
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList.contains('feedback-message')) {
                        checkModuleCompletion();
                    }
                });
            }
        });
    });
    
    // Start observing
    const languageModule = document.getElementById('thinking-language');
    if (languageModule) {
        observer.observe(languageModule, { childList: true, subtree: true });
    }
}

// Check if language module is completed
function checkModuleCompletion() {
    const vocabCompleted = document.getElementById('vocabFeedback')?.classList.contains('show');
    const grammarCompleted = document.getElementById('grammarFeedback')?.classList.contains('show');
    
    if (vocabCompleted && grammarCompleted) {
        if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('thinking-language')) {
            modulesCompleted.push('thinking-language');
            if (typeof updateProgress === 'function') {
                updateProgress();
            }
            if (typeof showAchievement === 'function') {
                showAchievement('भाषा अध्ययन पूर्ण!');
            }
        }
    }
}

// Additional CSS for language exercises
const languageExerciseStyles = `
<style>
.vocab-results, .grammar-results {
    border-radius: 8px;
    overflow: hidden;
}

.results-header {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.performance-badge {
    padding: 4px 12px;
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
}

.detailed-results {
    margin: 15px 0;
}

.result-item {
    margin: 10px 0;
    padding: 12px;
    border-radius: 6px;
    border-left: 4px solid transparent;
}

.result-item.correct {
    background: #e8f5e9;
    border-left-color: #4caf50;
}

.result-item.incorrect {
    background: #ffebee;
    border-left-color: #f44336;
}

.result-question {
    font-weight: 600;
    margin-bottom: 5px;
}

.result-answer {
    margin: 5px 0;
    font-size: 0.95rem;
}

.result-explanation {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
    margin-top: 5px;
}

.improvement-suggestions, .grammar-tips {
    margin: 15px 0;
    padding: 12px;
    background: #fff3e0;
    border-radius: 6px;
    border-left: 4px solid #ff9800;
}

.excellence-message, .perfect-score {
    text-align: center;
    padding: 15px;
    background: #e8f5e9;
    border-radius: 6px;
    color: #2e7d32;
    font-weight: 600;
}

.hint-button, .explanation-button, .pronounce-button {
    margin: 5px;
    padding: 4px 8px;
    background: #e3f2fd;
    border: 1px solid #2196f3;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
}

.hint-button:hover, .explanation-button:hover, .pronounce-button:hover {
    background: #2196f3;
    color: white;
    transform: translateY(-1px);
}

.hint-popup {
    position: absolute;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.hint-content {
    background: #333;
    color: white;
    padding: 10px 15px;
    border-radius: 6px;
    position: relative;
    max-width: 250px;
    font-size: 0.9rem;
    line-height: 1.4;
}

.hint-close {
    position: absolute;
    top: 5px;
    right: 8px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 14px;
}

.practice-modal, .explanation-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
}

.practice-content, .explanation-content {
    background: white;
    border-radius: 12px;
    padding: 0;
    max-width: 500px;
    width: 90%;
    max-height: 80%;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.practice-header, .explanation-header {
    background: var(--primary-color);
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px 12px 0 0;
}

.close-practice, .close-explanation {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    text-align: center;
}

.practice-body, .explanation-body {
    padding: 20px;
}

.practice-progress {
    margin-bottom: 20px;
}

.progress-bar {
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    transition: width 0.5s ease;
}

.progress-text {
    font-size: 0.9rem;
    color: #666;
}

.practice-word {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
    color: var(--primary-color);
}

.practice-options {
    display: grid;
    gap: 10px;
    margin-bottom: 20px;
}

.practice-option {
    padding: 12px 16px;
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
}

.practice-option:hover {
    background: #e9ecef;
    border-color: var(--primary-color);
    transform: translateY(-1px);
}

.practice-feedback {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
    min-height: 30px;
}

.practice-results {
    text-align: center;
}

.result-score {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 15px 0;
}

.result-message {
    font-size: 1.1rem;
    margin: 15px 0;
}

.construction-exercise {
    margin: 20px 0;
}

.word-bank {
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
}

.words {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}

.word-chip {
    padding: 8px 12px;
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 20px;
    cursor: grab;
    transition: all 0.3s ease;
    user-select: none;
}

.word-chip:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.word-chip.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}

.sentence-builder {
    margin-top: 20px;
}

.drop-zone {
    min-height: 60px;
    padding: 20px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    background: #fafafa;
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin: 10px 0;
    transition: all 0.3s ease;
}

.drop-zone.drag-over {
    border-color: var(--primary-color);
    background: rgba(139, 69, 19, 0.1);
    transform: scale(1.02);
}

.language-progress-tracker {
    margin: 0 0 20px 0;
    padding: 15px;
    background: #f0f8ff;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
}

.progress-items {
    margin-top: 10px;
}

.progress-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.progress-item:last-child {
    border-bottom: none;
}

.progress-score {
    font-weight: 600;
    font-size: 1.1rem;
}

.grammar-explanations {
    margin: 15px 0;
}

.grammar-explanation {
    margin: 10px 0;
    padding: 10px;
    border-radius: 6px;
    border-left: 4px solid transparent;
}

.grammar-explanation.correct {
    background: #e8f5e9;
    border-left-color: #4caf50;
}

.grammar-explanation.incorrect {
    background: #ffebee;
    border-left-color: #f44336;
}

.explanation-header {
    font-weight: 600;
    margin-bottom: 5px;
}

.explanation-text {
    font-size: 0.9rem;
    color: #666;
}

.results-summary {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    text-align: center;
    padding: 10px;
    background: rgba(139, 69, 19, 0.1);
    border-radius: 6px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .practice-content, .explanation-content {
        width: 95%;
        margin: 10px;
    }
    
    .words {
        justify-content: center;
    }
    
    .word-chip {
        font-size: 0.9rem;
        padding: 6px 10px;
    }
    
    .results-header {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', languageExerciseStyles);
