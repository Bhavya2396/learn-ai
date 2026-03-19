/**
 * Language exercises for Diary Ka Ek Panna
 */

// Grammar exercises from textbook (भाषा अध्ययन)

// Sentence transformation exercises (वाक्य रूपांतरण)
const sentenceTransformationAnswers = {
    'दो सौ आदमियों का जुलूस लालबाजार गया और वहाँ पर गिरफ़्तार हो गया।': 'दो सौ आदमियों का जुलूस लालबाजार जाकर गिरफ़्तार हो गया।',
    'मैदान में हजारों आदमियों की भीड़ होने लगी और लोग टोलियाँ बना-बनाकर मैदान में घूमने लगे।': 'मैदान में हजारों आदमियों की भीड़ होकर लोग टोलियाँ बना-बनाकर घूमने लगे।',
    'सुभाष बाबू को पकड़ लिया गया और गाड़ी में बैठाकर लालबाज़ार लॉकअप में भेज दिया गया।': 'सुभाष बाबू को पकड़कर गाड़ी में बैठाकर लालबाज़ार लॉकअप में भेज दिया गया।'
};

// Sandhi exercises (संधि अभ्यास)
const sandhiAnswers = {
    'श्रद्धा + आनंद': 'श्रद्धानंद',
    'प्रति + एक': 'प्रत्येक',
    'पुरुष + उत्तम': 'पुरुषोत्तम',
    'झंडा + उत्सव': 'झंडोत्सव',
    'पुनः + आवृत्ति': 'पुनरावृत्ति',
    'ज्योतिः + मय': 'ज्योतिर्मय'
};

// Verb usage exercises (क्रिया प्रयोग)
const verbUsageAnswers = {
    'कई मकान सजाए गए थे।': 'past passive',
    'कलकत्ते के प्रत्येक भाग में झंडे लगाए गए थे।': 'past passive',
    'बड़े बाज़ार के प्रायः मकानों पर राष्ट्रीय झंडा फहरा रहा था।': 'past continuous',
    'कितनी ही लारियाँ शहर में घुमाई जा रही थीं।': 'past continuous passive',
    'पुलिस भी अपनी पूरी ताकत से शहर में गश्त देकर प्रदर्शन कर रही थी।': 'past continuous',
    'सुभाष बाबू के जुलूस का भार पूर्णोदास पर था, वह प्रबंध कर चुका था।': 'past perfect',
    'पुलिस कमिश्नर का नोटिस निकल चुका था।': 'past perfect'
};

// Check sandhi exercises
function checkSandhiExercises() {
    console.log('Checking sandhi exercises');
    
    const questions = document.querySelectorAll('#sandhiExercise .mcq-question');
    let correctCount = 0;
    let totalCount = questions.length;
    
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        const correctOption = question.querySelector('input[data-correct="true"]');
        
        if (selectedOption) {
            if (selectedOption === correctOption) {
                selectedOption.closest('.mcq-option').classList.add('correct');
                correctCount++;
            } else {
                selectedOption.closest('.mcq-option').classList.add('incorrect');
                if (correctOption) {
                    correctOption.closest('.mcq-option').classList.add('correct-answer');
                }
            }
        } else {
            // No answer selected
            if (correctOption) {
                correctOption.closest('.mcq-option').classList.add('correct-answer');
            }
        }
    });
    
    // Show result
    const resultDiv = document.getElementById('sandhiResult');
    if (resultDiv) {
        const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
        resultDiv.innerHTML = `
            <div class="result-summary">
                <h3>संधि अभ्यास के परिणाम</h3>
                <p>सही उत्तर: ${correctCount}/${totalCount}</p>
                <p>प्रतिशत: ${percentage}%</p>
                <div class="result-message">
                    ${percentage >= 80 ? '🎉 बहुत बढ़िया! आपने संधि को अच्छी तरह समझा है।' :
                      percentage >= 60 ? '👍 अच्छा काम! थोड़ा और अभ्यास करें।' :
                      '📚 संधि के नियमों को फिर से पढ़ें और अभ्यास करें।'}
                </div>
            </div>
        `;
        resultDiv.style.display = 'block';
    }
    
    // Update score
    score += correctCount * 2;
    document.getElementById('totalScore').textContent = score;
    
    // Track completion
    if (!modulesCompleted.includes('thinking-language')) {
        modulesCompleted.push('thinking-language');
        updateProgress();
        showAchievement('भाषा अध्ययन पूर्ण!');
    }
    
    if (window.narrator) {
        window.narrator.speak(`आपने ${correctCount} में से ${totalCount} संधि के सही उत्तर दिए। ${percentage} प्रतिशत सफलता मिली।`);
    }
}

// Initialize language exercises
function initializeLanguageExercises() {
    console.log('Initializing language exercises');
    
    // Setup sandhi exercise
    setupSandhiExercise();
    
    // Setup vocabulary exercise
    setupVocabularyExercise();
    
    // Setup grammar exercise
    setupGrammarExercise();
}

// Setup sandhi exercise
function setupSandhiExercise() {
    const sandhiContainer = document.getElementById('sandhiExercise');
    if (!sandhiContainer) return;
    
    // Create sandhi exercise HTML with MCQ format
    const exerciseHTML = `
        <div class="exercise-content">
            <h4>संधि अभ्यास</h4>
            <p>नीचे दिए गए शब्दों की संधि के लिए सही विकल्प चुनें:</p>
            
            <div class="mcq-container">
                <div class="mcq-question">
                    <h5>1. श्रद्धा + आनंद = ?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="sandhi1" value="श्रद्धानंद" data-correct="true">
                            <span class="option-text">श्रद्धानंद</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi1" value="श्रद्धानन्द">
                            <span class="option-text">श्रद्धानन्द</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi1" value="श्रद्धा आनंद">
                            <span class="option-text">श्रद्धा आनंद</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi1" value="श्रद्धानंदा">
                            <span class="option-text">श्रद्धानंदा</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>2. प्रति + एक = ?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="sandhi2" value="प्रत्येक" data-correct="true">
                            <span class="option-text">प्रत्येक</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi2" value="प्रतिएक">
                            <span class="option-text">प्रतिएक</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi2" value="प्रति एक">
                            <span class="option-text">प्रति एक</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi2" value="प्रत्यक">
                            <span class="option-text">प्रत्यक</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>3. पुरुष + उत्तम = ?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="sandhi3" value="पुरुषोत्तम" data-correct="true">
                            <span class="option-text">पुरुषोत्तम</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi3" value="पुरुष उत्तम">
                            <span class="option-text">पुरुष उत्तम</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi3" value="पुरुषोत्तमा">
                            <span class="option-text">पुरुषोत्तमा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi3" value="पुरुषोत्तमः">
                            <span class="option-text">पुरुषोत्तमः</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>4. झंडा + उत्सव = ?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="sandhi4" value="झंडोत्सव" data-correct="true">
                            <span class="option-text">झंडोत्सव</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi4" value="झंडा उत्सव">
                            <span class="option-text">झंडा उत्सव</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi4" value="झंडोत्सवा">
                            <span class="option-text">झंडोत्सवा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi4" value="झंडोत्सवः">
                            <span class="option-text">झंडोत्सवः</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>5. पुनः + आवृत्ति = ?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="sandhi5" value="पुनरावृत्ति" data-correct="true">
                            <span class="option-text">पुनरावृत्ति</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi5" value="पुनः आवृत्ति">
                            <span class="option-text">पुनः आवृत्ति</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi5" value="पुनरावृत्तिः">
                            <span class="option-text">पुनरावृत्तिः</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi5" value="पुनरावृत्तिा">
                            <span class="option-text">पुनरावृत्तिा</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>6. ज्योतिः + मय = ?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="sandhi6" value="ज्योतिर्मय" data-correct="true">
                            <span class="option-text">ज्योतिर्मय</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi6" value="ज्योतिः मय">
                            <span class="option-text">ज्योतिः मय</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi6" value="ज्योतिर्मया">
                            <span class="option-text">ज्योतिर्मया</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="sandhi6" value="ज्योतिर्मयः">
                            <span class="option-text">ज्योतिर्मयः</span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="button-container">
                <button class="check-btn" onclick="checkSandhiExercises()">
                    <span class="btn-icon">✅</span>
                    <span class="btn-text">जांचें</span>
                </button>
            </div>
            
            <div id="sandhiResult" class="exercise-result" style="display: none;"></div>
        </div>
    `;
    
    sandhiContainer.innerHTML = exerciseHTML;
}

// Setup vocabulary exercise
function setupVocabularyExercise() {
    const vocabularyContainer = document.getElementById('vocabularyExercise');
    if (!vocabularyContainer) return;
    
    // Create vocabulary exercise HTML with MCQ format
    const exerciseHTML = `
        <div class="exercise-content">
            <h4>शब्दार्थ अभ्यास</h4>
            <p>नीचे दिए गए शब्दों के सही अर्थ चुनें:</p>
            
            <div class="mcq-container">
                <div class="mcq-question">
                    <h5>1. "उत्साहित" शब्द का अर्थ क्या है?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="vocab1" value="खुशी और उमंग से भरा हुआ" data-correct="true">
                            <span class="option-text">खुशी और उमंग से भरा हुआ</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab1" value="दुखी और निराश">
                            <span class="option-text">दुखी और निराश</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab1" value="शांत और गंभीर">
                            <span class="option-text">शांत और गंभीर</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab1" value="भयभीत और चिंतित">
                            <span class="option-text">भयभीत और चिंतित</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>2. "तिरंगा" शब्द का अर्थ क्या है?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="vocab2" value="तीन रंगों वाला झंडा" data-correct="true">
                            <span class="option-text">तीन रंगों वाला झंडा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab2" value="दो रंगों वाला झंडा">
                            <span class="option-text">दो रंगों वाला झंडा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab2" value="चार रंगों वाला झंडा">
                            <span class="option-text">चार रंगों वाला झंडा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab2" value="एक रंग का झंडा">
                            <span class="option-text">एक रंग का झंडा</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>3. "रैली" शब्द का अर्थ क्या है?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="vocab3" value="लोगों का समूह जो किसी उद्देश्य के लिए एकत्रित हो" data-correct="true">
                            <span class="option-text">लोगों का समूह जो किसी उद्देश्य के लिए एकत्रित हो</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab3" value="एक व्यक्ति का अकेला प्रदर्शन">
                            <span class="option-text">एक व्यक्ति का अकेला प्रदर्शन</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab3" value="घर में बैठकर बात करना">
                            <span class="option-text">घर में बैठकर बात करना</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab3" value="स्कूल में पढ़ाई करना">
                            <span class="option-text">स्कूल में पढ़ाई करना</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>4. "एकत्रित" शब्द का अर्थ क्या है?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="vocab4" value="इकट्ठा हुआ" data-correct="true">
                            <span class="option-text">इकट्ठा हुआ</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab4" value="अलग-अलग हो गया">
                            <span class="option-text">अलग-अलग हो गया</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab4" value="छुप गया">
                            <span class="option-text">छुप गया</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab4" value="भाग गया">
                            <span class="option-text">भाग गया</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>5. "नारा" शब्द का अर्थ क्या है?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="vocab5" value="ऐसा वाक्य जो जोश भरने के लिए बोला जाए" data-correct="true">
                            <span class="option-text">ऐसा वाक्य जो जोश भरने के लिए बोला जाए</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab5" value="एक शांत बातचीत">
                            <span class="option-text">एक शांत बातचीत</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab5" value="एक गाना">
                            <span class="option-text">एक गाना</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab5" value="एक कहानी">
                            <span class="option-text">एक कहानी</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>6. "राष्ट्रीय" शब्द का अर्थ क्या है?</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="vocab6" value="देश से संबंधित" data-correct="true">
                            <span class="option-text">देश से संबंधित</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab6" value="परिवार से संबंधित">
                            <span class="option-text">परिवार से संबंधित</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab6" value="विद्यालय से संबंधित">
                            <span class="option-text">विद्यालय से संबंधित</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="vocab6" value="गांव से संबंधित">
                            <span class="option-text">गांव से संबंधित</span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="button-container">
                <button class="check-btn" onclick="checkVocabularyExercises()">
                    <span class="btn-icon">📚</span>
                    <span class="btn-text">जांचें</span>
                </button>
            </div>
            
            <div id="vocabularyResult" class="exercise-result" style="display: none;"></div>
        </div>
    `;
    
    vocabularyContainer.innerHTML = exerciseHTML;
}

// Setup grammar exercise
function setupGrammarExercise() {
    const grammarContainer = document.getElementById('grammarExercise');
    if (!grammarContainer) return;
    
    // Create grammar exercise HTML with MCQ format
    const exerciseHTML = `
        <div class="exercise-content">
            <h4>व्याकरण अभ्यास</h4>
            <p>नीचे दिए गए वाक्यों में सही क्रिया का प्रयोग चुनें:</p>
            
            <div class="mcq-container">
                <div class="mcq-question">
                    <h5>1. मैं आज बहुत ___ हूं।</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="grammar1" value="उत्साहित" data-correct="true">
                            <span class="option-text">उत्साहित</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar1" value="उत्साहिता">
                            <span class="option-text">उत्साहिता</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar1" value="उत्साहिती">
                            <span class="option-text">उत्साहिती</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar1" value="उत्साहिते">
                            <span class="option-text">उत्साहिते</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>2. हम सभी ___ थे।</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="grammar2" value="गा रहे" data-correct="true">
                            <span class="option-text">गा रहे</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar2" value="गा रही">
                            <span class="option-text">गा रही</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar2" value="गा रहा">
                            <span class="option-text">गा रहा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar2" value="गा रही थी">
                            <span class="option-text">गा रही थी</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>3. वह ___ था।</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="grammar3" value="आया" data-correct="true">
                            <span class="option-text">आया</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar3" value="आई">
                            <span class="option-text">आई</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar3" value="आए">
                            <span class="option-text">आए</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar3" value="आईं">
                            <span class="option-text">आईं</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>4. तुम ___ हो।</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="grammar4" value="जा रहे" data-correct="true">
                            <span class="option-text">जा रहे</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar4" value="जा रही">
                            <span class="option-text">जा रही</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar4" value="जा रहा">
                            <span class="option-text">जा रहा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar4" value="जा रही हो">
                            <span class="option-text">जा रही हो</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>5. वे सभी ___ थे।</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="grammar5" value="खुश" data-correct="true">
                            <span class="option-text">खुश</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar5" value="खुशी">
                            <span class="option-text">खुशी</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar5" value="खुशा">
                            <span class="option-text">खुशा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar5" value="खुशे">
                            <span class="option-text">खुशे</span>
                        </label>
                    </div>
                </div>
                
                <div class="mcq-question">
                    <h5>6. मैं ___ रहा हूं।</h5>
                    <div class="mcq-options">
                        <label class="mcq-option">
                            <input type="radio" name="grammar6" value="पढ़" data-correct="true">
                            <span class="option-text">पढ़</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar6" value="पढ़ी">
                            <span class="option-text">पढ़ी</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar6" value="पढ़ा">
                            <span class="option-text">पढ़ा</span>
                        </label>
                        <label class="mcq-option">
                            <input type="radio" name="grammar6" value="पढ़े">
                            <span class="option-text">पढ़े</span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="button-container">
                <button class="check-btn" onclick="checkGrammar()">
                    <span class="btn-icon">📝</span>
                    <span class="btn-text">जांचें</span>
                </button>
            </div>
            
            <div id="grammarResult" class="exercise-result" style="display: none;"></div>
        </div>
    `;
    
    grammarContainer.innerHTML = exerciseHTML;
}

// Check vocabulary exercises
function checkVocabularyExercises() {
    console.log('Checking vocabulary exercises');
    
    const questions = document.querySelectorAll('#vocabularyExercise .mcq-question');
    let correctCount = 0;
    let totalCount = questions.length;
    
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        const correctOption = question.querySelector('input[data-correct="true"]');
        
        if (selectedOption) {
            if (selectedOption === correctOption) {
                selectedOption.closest('.mcq-option').classList.add('correct');
                correctCount++;
            } else {
                selectedOption.closest('.mcq-option').classList.add('incorrect');
                if (correctOption) {
                    correctOption.closest('.mcq-option').classList.add('correct-answer');
                }
            }
        } else {
            // No answer selected
            if (correctOption) {
                correctOption.closest('.mcq-option').classList.add('correct-answer');
            }
        }
    });
    
    // Show result
    const resultDiv = document.getElementById('vocabularyResult');
    if (resultDiv) {
        const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
        resultDiv.innerHTML = `
            <div class="result-summary">
                <h3>शब्दार्थ अभ्यास के परिणाम</h3>
                <p>सही उत्तर: ${correctCount}/${totalCount}</p>
                <p>प्रतिशत: ${percentage}%</p>
                <div class="result-message">
                    ${percentage >= 80 ? '🎉 बहुत बढ़िया! आपने शब्दार्थ को अच्छी तरह समझा है।' :
                      percentage >= 60 ? '👍 अच्छा काम! थोड़ा और अभ्यास करें।' :
                      '📚 शब्दार्थ को फिर से पढ़ें और अभ्यास करें।'}
                </div>
            </div>
        `;
        resultDiv.style.display = 'block';
    }
    
    // Update score
    score += correctCount * 2;
    document.getElementById('totalScore').textContent = score;
    
    if (window.narrator) {
        window.narrator.speak(`आपने ${correctCount} में से ${totalCount} शब्दार्थ के सही उत्तर दिए। ${percentage} प्रतिशत सफलता मिली।`);
    }
}

// Check grammar
function checkGrammar() {
    console.log('Checking grammar');
    
    const questions = document.querySelectorAll('#grammarExercise .mcq-question');
    let correctCount = 0;
    let totalCount = questions.length;
    
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        const correctOption = question.querySelector('input[data-correct="true"]');
        
        if (selectedOption) {
            if (selectedOption === correctOption) {
                selectedOption.closest('.mcq-option').classList.add('correct');
                correctCount++;
            } else {
                selectedOption.closest('.mcq-option').classList.add('incorrect');
                if (correctOption) {
                    correctOption.closest('.mcq-option').classList.add('correct-answer');
                }
            }
        } else {
            // No answer selected
            if (correctOption) {
                correctOption.closest('.mcq-option').classList.add('correct-answer');
            }
        }
    });
    
    // Show result
    const resultDiv = document.getElementById('grammarResult');
    if (resultDiv) {
        const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
        resultDiv.innerHTML = `
            <div class="result-summary">
                <h3>व्याकरण अभ्यास के परिणाम</h3>
                <p>सही उत्तर: ${correctCount}/${totalCount}</p>
                <p>प्रतिशत: ${percentage}%</p>
                <div class="result-message">
                    ${percentage >= 80 ? '🎉 बहुत बढ़िया! आपने व्याकरण को अच्छी तरह समझा है।' :
                      percentage >= 60 ? '👍 अच्छा काम! थोड़ा और अभ्यास करें।' :
                      '📚 व्याकरण के नियमों को फिर से पढ़ें और अभ्यास करें।'}
                </div>
            </div>
        `;
        resultDiv.style.display = 'block';
    }
    
    // Update score
    score += correctCount * 3;
    document.getElementById('totalScore').textContent = score;
    
    if (window.narrator) {
        window.narrator.speak(`आपने ${correctCount} में से ${totalCount} व्याकरण के सही उत्तर दिए। ${percentage} प्रतिशत सफलता मिली।`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLanguageExercises);
