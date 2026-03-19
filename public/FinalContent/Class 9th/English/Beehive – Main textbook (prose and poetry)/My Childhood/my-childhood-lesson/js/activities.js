/**
 * Activities and exercises for My Childhood lesson
 */

// Pre-reading activities
function initPrereadingActivities() {
    const prereadingContainer = document.getElementById('prereadingActivities');
    if (!prereadingContainer) return;
    
    // Create reflection activity
    const reflectionActivity = `
        <div class="exercise-card">
            <h3 class="exercise-title"><span class="exercise-icon">✏️</span> Reflection Activity</h3>
            
            <div class="activity-title">Scientists as Statesmen</div>
            <p>Can you think of any scientists who have also been statesmen? List their names and contributions below.</p>
            
            <div class="reflection-exercise">
                <textarea id="scientist-reflection" rows="5" placeholder="Type your response here..."></textarea>
                <div class="button-container">
                    <button class="interactive-btn" onclick="saveReflection('scientist-reflection')">Save Reflection</button>
                </div>
            </div>
            
            <div class="activity-title">A.P.J. Abdul Kalam</div>
            <p>What do you already know about A.P.J. Abdul Kalam? Share your knowledge about his accomplishments as a scientist and as the President of India.</p>
            
            <div class="reflection-exercise">
                <textarea id="kalam-reflection" rows="5" placeholder="Type your response here..."></textarea>
                <div class="button-container">
                    <button class="interactive-btn" onclick="saveReflection('kalam-reflection')">Save Reflection</button>
                </div>
            </div>
            
            <div class="activity-title">Childhood Influences</div>
            <p>How do you think childhood experiences shape a person's character and achievements later in life? Consider how your own childhood experiences might influence your future.</p>
            
            <div class="reflection-exercise">
                <textarea id="childhood-reflection" rows="5" placeholder="Type your response here..."></textarea>
                <div class="button-container">
                    <button class="interactive-btn" onclick="saveReflection('childhood-reflection')">Save Reflection</button>
                </div>
            </div>
        </div>
    `;
    
    prereadingContainer.innerHTML = reflectionActivity;
}

// Vocabulary activities
function initVocabularyActivities() {
    const vocabContainer = document.getElementById('vocabularyActivities');
    if (!vocabContainer) return;
    
    // Create word meaning activity
    const wordMeaningActivity = `
        <div class="exercise-card">
            <h3 class="exercise-title"><span class="exercise-icon">📚</span> Word Meanings</h3>
            <p>Find the sentences in the text where these words occur and select their meanings based on context.</p>
            
            <div class="vocabulary-exercise">
                <div class="vocab-question">
                    <p><strong>erupt</strong> - "For reasons I have never been able to understand, a sudden demand for tamarind seeds erupted in the market."</p>
                    <p>What things can erupt?</p>
                    <select id="vocab-erupt">
                        <option value="">Select the best answer</option>
                        <option value="1">Only volcanoes</option>
                        <option value="2">Volcanoes, emotions, and social phenomena like protests or demands</option>
                        <option value="3">Only natural disasters</option>
                        <option value="4">Only human emotions</option>
                    </select>
                    <div class="question-feedback" id="feedback-erupt"></div>
                </div>
                
                <div class="vocab-question">
                    <p><strong>surge</strong> - "Half a century later, I can still feel the surge of pride in earning my own money for the first time."</p>
                    <p>What things can surge?</p>
                    <select id="vocab-surge">
                        <option value="">Select the best answer</option>
                        <option value="1">Only electricity</option>
                        <option value="2">Only ocean tides</option>
                        <option value="3">Emotions, electricity, water, crowds, and support</option>
                        <option value="4">Only human emotions</option>
                    </select>
                    <div class="question-feedback" id="feedback-surge"></div>
                </div>
                
                <div class="vocab-question">
                    <p><strong>trace</strong> - "My brother-in-law Jallaluddin would tell me stories about the War which I would later attempt to trace in the headlines in Dinamani."</p>
                    <p>Which meaning of "trace" is closest to its use in the text?</p>
                    <select id="vocab-trace">
                        <option value="">Select the best answer</option>
                        <option value="1">To draw an outline</option>
                        <option value="2">To find or discover by investigation</option>
                        <option value="3">A very small amount</option>
                        <option value="4">To copy by following lines seen through transparent paper</option>
                    </select>
                    <div class="question-feedback" id="feedback-trace"></div>
                </div>
                
                <div class="vocab-question">
                    <p><strong>undistinguished</strong> - "I was one of many children — a short boy with rather undistinguished looks, born to tall and handsome parents."</p>
                    <p>What does "undistinguished" mean?</p>
                    <select id="vocab-undistinguished">
                        <option value="">Select the best answer</option>
                        <option value="1">Not recognized or not known</option>
                        <option value="2">Not able to be distinguished or told apart</option>
                        <option value="3">Ordinary; not remarkable or special in any way</option>
                        <option value="4">Unclear or hazy</option>
                    </select>
                    <div class="question-feedback" id="feedback-undistinguished"></div>
                </div>
                
                <div class="button-container">
                    <button class="interactive-btn" onclick="checkVocabSelections()">Check Answers</button>
                </div>
            </div>
        </div>
    `;
    
    // Create prefixes activity
    const prefixesActivity = `
        <div class="exercise-card">
            <h3 class="exercise-title"><span class="exercise-icon">🔠</span> Prefixes: un- and in-</h3>
            <p>Study these words with prefixes un- and in- from the text:</p>
            <ul>
                <li><strong>undistinguished</strong> (un + distinguished)</li>
                <li><strong>inessential</strong> (in + essential)</li>
                <li><strong>unaffected</strong> (un + affected)</li>
                <li><strong>inequality</strong> (in + equality)</li>
                <li><strong>intolerance</strong> (in + tolerance)</li>
            </ul>
            
            <p>Now form the opposites of these words by adding un- or in- (which can also appear as il-, ir-, or im-).</p>
            
            <div class="vocabulary-exercise">
                <div class="vocab-question">
                    <p>adequate → <input type="text" id="prefix-adequate" class="grammar-input"></p>
                    <div class="question-feedback" id="feedback-prefix-adequate"></div>
                </div>
                
                <div class="vocab-question">
                    <p>acceptable → <input type="text" id="prefix-acceptable" class="grammar-input"></p>
                    <div class="question-feedback" id="feedback-prefix-acceptable"></div>
                </div>
                
                <div class="vocab-question">
                    <p>regular → <input type="text" id="prefix-regular" class="grammar-input"></p>
                    <div class="question-feedback" id="feedback-prefix-regular"></div>
                </div>
                
                <div class="vocab-question">
                    <p>tolerant → <input type="text" id="prefix-tolerant" class="grammar-input"></p>
                    <div class="question-feedback" id="feedback-prefix-tolerant"></div>
                </div>
                
                <div class="vocab-question">
                    <p>logical → <input type="text" id="prefix-logical" class="grammar-input"></p>
                    <div class="question-feedback" id="feedback-prefix-logical"></div>
                </div>
                
                <div class="vocab-question">
                    <p>responsible → <input type="text" id="prefix-responsible" class="grammar-input"></p>
                    <div class="question-feedback" id="feedback-prefix-responsible"></div>
                </div>
                
                <div class="button-container">
                    <button class="interactive-btn" onclick="checkPrefixes()">Check Answers</button>
                </div>
            </div>
        </div>
    `;
    
    // Create passive voice activity
    const passiveVoiceActivity = `
        <div class="exercise-card">
            <h3 class="exercise-title"><span class="exercise-icon">🔄</span> Passive Voice Practice</h3>
            <p>Study these sentences from the text in passive voice:</p>
            <ul>
                <li>"My parents <strong>were regarded</strong> as an ideal couple."</li>
                <li>"I <strong>was asked</strong> to go and sit on the back bench."</li>
                <li>"Such problems <strong>have to be confronted</strong>."</li>
            </ul>
            
            <p>Rewrite the following sentences using passive voice:</p>
            
            <div class="vocabulary-exercise">
                <div class="grammar-item">
                    <p>1. In yesterday's competition the Principal gave away the prizes.</p>
                    <input type="text" id="passive-1" class="grammar-input" style="width: 80%;">
                    <div class="question-feedback" id="feedback-passive-1"></div>
                </div>
                
                <div class="grammar-item">
                    <p>2. In spite of financial difficulties, they paid the labourers on time.</p>
                    <input type="text" id="passive-2" class="grammar-input" style="width: 80%;">
                    <div class="question-feedback" id="feedback-passive-2"></div>
                </div>
                
                <div class="grammar-item">
                    <p>3. On Republic Day, they do not allow vehicles beyond this point.</p>
                    <input type="text" id="passive-3" class="grammar-input" style="width: 80%;">
                    <div class="question-feedback" id="feedback-passive-3"></div>
                </div>
                
                <div class="grammar-item">
                    <p>4. They buy and sell second-hand books on the pavement every Saturday.</p>
                    <input type="text" id="passive-4" class="grammar-input" style="width: 80%;">
                    <div class="question-feedback" id="feedback-passive-4"></div>
                </div>
                
                <div class="grammar-item">
                    <p>5. They hold elections to the Lok Sabha every five years.</p>
                    <input type="text" id="passive-5" class="grammar-input" style="width: 80%;">
                    <div class="question-feedback" id="feedback-passive-5"></div>
                </div>
                
                <div class="grammar-item">
                    <p>6. Rabindranath Tagore composed our National Anthem.</p>
                    <input type="text" id="passive-6" class="grammar-input" style="width: 80%;">
                    <div class="question-feedback" id="feedback-passive-6"></div>
                </div>
                
                <div class="button-container">
                    <button class="interactive-btn" onclick="checkPassiveVoice()">Check Answers</button>
                </div>
            </div>
        </div>
    `;
    
    vocabContainer.innerHTML = wordMeaningActivity + prefixesActivity + passiveVoiceActivity;
}

// Speaking activity
function initSpeakingActivity() {
    const speakingContainer = document.getElementById('speakingActivity');
    if (!speakingContainer) return;
    
    const speakingActivityContent = `
        <div class="exercise-card">
            <h3 class="exercise-title"><span class="exercise-icon">🗣️</span> Speaking Activity</h3>
            <p>Here is a topic for you to think about and give your opinion on:</p>
            
            <div class="activity-title">'Career Building Is the Only Goal of Education.' OR 'Getting a Good Job Is More Important than Being a Good Human Being.'</div>
            
            <p>You can use the following phrases while giving your opinion:</p>
            <ul>
                <li>I think that...</li>
                <li>In my opinion...</li>
                <li>It seems to me that...</li>
                <li>I am of the view that...</li>
                <li>As far as I know...</li>
                <li>If you ask me...</li>
            </ul>
            
            <p>For saying what other people think:</p>
            <ul>
                <li>According to some...</li>
                <li>Quite a few think...</li>
                <li>Some others favour...</li>
                <li>Thirty per cent of the people disagree...</li>
                <li>Fifty per cent of them strongly feel...</li>
            </ul>
            
            <p>For asking others' opinions:</p>
            <ul>
                <li>What do you think about...</li>
                <li>What do you think of...</li>
                <li>What is your opinion about...</li>
                <li>Do you agree...</li>
                <li>Does this make you believe...</li>
            </ul>
            
            <div class="reflection-exercise">
                <p>Write your thoughts on the topic:</p>
                <textarea id="speaking-reflection" rows="8" placeholder="Type your response here..."></textarea>
                <div class="button-container">
                    <button class="interactive-btn" onclick="saveReflection('speaking-reflection')">Save Response</button>
                </div>
            </div>
        </div>
    `;
    
    speakingContainer.innerHTML = speakingActivityContent;
}

// Writing activity
function initWritingActivity() {
    const writingContainer = document.getElementById('writingActivity');
    if (!writingContainer) return;
    
    const writingActivityContent = `
        <div class="exercise-card">
            <h3 class="exercise-title"><span class="exercise-icon">✍️</span> Writing Activity</h3>
            
            <div class="activity-title">Life in Rameswaram in the 1940s</div>
            <p>Think and write a short account of what life in Rameswaram in the 1940s must have been like. Consider these questions:</p>
            <ul>
                <li>Were people rich or poor?</li>
                <li>Were they hard working or lazy?</li>
                <li>Were they hopeful of change, or resistant to it?</li>
            </ul>
            
            <div class="reflection-exercise">
                <textarea id="rameswaram-reflection" rows="10" placeholder="Type your response here..."></textarea>
                <div class="button-container">
                    <button class="interactive-btn" onclick="saveReflection('rameswaram-reflection')">Save Writing</button>
                </div>
            </div>
            
            <blockquote>
                "Do your little bit of good where you are; it's those little bits of good put together that overwhelm the world."
                <br>
                <strong>- Archbishop Desmond Tutu</strong>
            </blockquote>
        </div>
    `;
    
    writingContainer.innerHTML = writingActivityContent;
}

// Save reflection
function saveReflection(id) {
    const textarea = document.getElementById(id);
    if (!textarea || !textarea.value.trim()) {
        // Show error if empty
        const container = textarea.closest('.reflection-exercise');
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-message error show';
        feedbackDiv.textContent = 'Please enter some text before saving.';
        container.appendChild(feedbackDiv);
        
        // Remove the feedback after a few seconds
        setTimeout(() => {
            feedbackDiv.classList.remove('show');
            setTimeout(() => feedbackDiv.remove(), 500);
        }, 3000);
        return;
    }
    
    // Save the reflection to localStorage
    localStorage.setItem(`reflection-${id}`, textarea.value);
    
    // Show success message
    const container = textarea.closest('.reflection-exercise');
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-message success show';
    feedbackDiv.textContent = 'Your response has been saved!';
    container.appendChild(feedbackDiv);
    
    // Add points for completing activity
    score += 5;
    document.getElementById('totalScore').textContent = score;
    
    // Show achievement
    showAchievement('Activity Completed: +5 points');
    
    // Remove the feedback after a few seconds
    setTimeout(() => {
        feedbackDiv.classList.remove('show');
        setTimeout(() => feedbackDiv.remove(), 500);
    }, 3000);
}

// Check vocabulary selections
function checkVocabSelections() {
    const answers = {
        'vocab-erupt': '2',
        'vocab-surge': '3',
        'vocab-trace': '2',
        'vocab-undistinguished': '3'
    };
    
    let correctCount = 0;
    
    for (const [id, correctAnswer] of Object.entries(answers)) {
        const select = document.getElementById(id);
        const feedback = document.getElementById(`feedback-${id.replace('vocab-', '')}`);
        
        if (select.value === '') {
            feedback.textContent = 'Please select an answer.';
            feedback.className = 'question-feedback warning';
        } else if (select.value === correctAnswer) {
            feedback.textContent = 'Correct!';
            feedback.className = 'question-feedback correct';
            correctCount++;
        } else {
            feedback.textContent = 'Incorrect. Try again.';
            feedback.className = 'question-feedback incorrect';
        }
    }
    
    if (correctCount === Object.keys(answers).length) {
        // Add points for all correct answers
        score += 10;
        document.getElementById('totalScore').textContent = score;
        showAchievement('Vocabulary Activity Completed: +10 points');
    }
}

// Check prefixes
function checkPrefixes() {
    const answers = {
        'prefix-adequate': 'inadequate',
        'prefix-acceptable': 'unacceptable',
        'prefix-regular': 'irregular',
        'prefix-tolerant': 'intolerant',
        'prefix-logical': 'illogical',
        'prefix-responsible': 'irresponsible'
    };
    
    let correctCount = 0;
    
    for (const [id, correctAnswer] of Object.entries(answers)) {
        const input = document.getElementById(id);
        const feedback = document.getElementById(`feedback-${id}`);
        const userAnswer = input.value.trim().toLowerCase();
        
        if (userAnswer === '') {
            feedback.textContent = 'Please enter an answer.';
            feedback.className = 'question-feedback warning';
        } else if (userAnswer === correctAnswer) {
            feedback.textContent = 'Correct!';
            feedback.className = 'question-feedback correct';
            correctCount++;
        } else {
            feedback.textContent = `Incorrect. The answer is: ${correctAnswer}`;
            feedback.className = 'question-feedback incorrect';
        }
    }
    
    if (correctCount === Object.keys(answers).length) {
        // Add points for all correct answers
        score += 10;
        document.getElementById('totalScore').textContent = score;
        showAchievement('Prefixes Activity Completed: +10 points');
    }
}

// Check passive voice answers
function checkPassiveVoice() {
    const correctAnswers = [
        { id: 'passive-1', answer: 'In yesterday\'s competition the prizes were given away by the Principal.' },
        { id: 'passive-2', answer: 'In spite of financial difficulties, the labourers were paid on time.' },
        { id: 'passive-3', answer: 'On Republic Day, vehicles are not allowed beyond this point.' },
        { id: 'passive-4', answer: 'Second-hand books are bought and sold on the pavement every Saturday.' },
        { id: 'passive-5', answer: 'Elections to the Lok Sabha are held every five years.' },
        { id: 'passive-6', answer: 'Our National Anthem was composed by Rabindranath Tagore.' }
    ];
    
    let correctCount = 0;
    
    correctAnswers.forEach(item => {
        const input = document.getElementById(item.id);
        const feedback = document.getElementById(`feedback-${item.id}`);
        const userAnswer = input.value.trim().toLowerCase();
        
        if (userAnswer === '') {
            feedback.textContent = 'Please enter an answer.';
            feedback.className = 'question-feedback warning';
        } else if (similarPassiveStructure(userAnswer, item.answer.toLowerCase())) {
            feedback.textContent = 'Correct!';
            feedback.className = 'question-feedback correct';
            correctCount++;
        } else {
            feedback.textContent = `Incorrect. A possible answer is: ${item.answer}`;
            feedback.className = 'question-feedback incorrect';
        }
    });
    
    if (correctCount === correctAnswers.length) {
        // Add points for all correct answers
        score += 15;
        document.getElementById('totalScore').textContent = score;
        showAchievement('Passive Voice Activity Completed: +15 points');
    }
}

// Helper function to check if passive voice structure is similar
function similarPassiveStructure(userAnswer, correctAnswer) {
    // Check if key passive voice elements are present
    const passiveMarkers = ['is', 'are', 'was', 'were', 'be', 'been', 'being'];
    const participleEndings = ['ed', 'en', 't'];
    
    // Check if the user's answer contains the basic structure
    let hasPassiveMarker = passiveMarkers.some(marker => userAnswer.includes(` ${marker} `));
    let hasParticiple = participleEndings.some(ending => 
        userAnswer.match(new RegExp(`\\s\\w+${ending}\\b`, 'i'))
    );
    
    // Check if answer has similar key words
    const correctKeywords = correctAnswer.split(' ')
        .filter(word => word.length > 3 && !passiveMarkers.includes(word))
        .map(word => word.replace(/[.,;:!?]/, ''));
    
    const userKeywords = userAnswer.split(' ')
        .filter(word => word.length > 3)
        .map(word => word.replace(/[.,;:!?]/, ''));
    
    const keywordMatches = correctKeywords.filter(word => 
        userKeywords.some(userWord => userWord.includes(word) || word.includes(userWord))
    ).length;
    
    const keywordPercentage = keywordMatches / correctKeywords.length;
    
    // Accept answer if it has passive structure and at least 70% of keywords
    return hasPassiveMarker && hasParticiple && keywordPercentage >= 0.7;
}

// Initialize all activities when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // If we have stored reflections, load them
    document.querySelectorAll('textarea[id^="reflection-"]').forEach(textarea => {
        const storedValue = localStorage.getItem(`reflection-${textarea.id}`);
        if (storedValue) {
            textarea.value = storedValue;
        }
    });
    
    // Initialize all activities
    initPrereadingActivities();
    initVocabularyActivities();
    initSpeakingActivity();
    initWritingActivity();
});
