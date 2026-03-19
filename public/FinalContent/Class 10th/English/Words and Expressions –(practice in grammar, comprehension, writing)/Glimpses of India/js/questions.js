/**
 * Reading comprehension questions for Glimpses of India
 */

// Questions Content
const questionsContent = {
    text1: `
        <div class="question-set" id="text1Questions">
            <h3 class="question-section-title">Text I: The Parsi Community in India</h3>
            
            <div class="question-item">
                <p class="question-text">1. What does the expression "Nowrosji would cajole Parsi visitors off the train" mean?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">It means that Nowrosji would persuade or coax Parsi visitors to get off the train at Delhi using friendly encouragement and charm.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">2. Who said "Aavoji, aavo, aavo! Welcome to Delhi!" and why?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">Nowrosji Kapadia said this. He would greet the Parsi visitors arriving on the Frontier Mail train to welcome them to Delhi and invite them to his home.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">3. Why were Jer Bai's arguments always overruled?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">Jer Bai's arguments were always overruled because Nowrosji was determined to welcome Parsi visitors to Delhi and convince them to move there, despite her occasional objections to entertaining unknown visitors.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">4. What is meant by "outside catering was unheard of"?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">It means that during Parsi festive gatherings, the women of the community cooked all the food themselves rather than hiring professional caterers. This was a tradition maintained by the community.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">5. According to the writer, what "kind of life has almost gone forever"?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">The writer refers to the traditional communal lifestyle where Parsi women prepared elaborate meals for gatherings, poorer community members were included without knowing who had paid for what, and traditions were maintained collectively in cities like Lucknow, Kanpur, and Allahabad.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">6. What made the writer respect her grandmother more?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">The writer gained respect for her grandmother after trying to make malido (halwa) under her supervision and realizing how physically demanding it was. Despite her grandmother's dainty appearance, she had the strength and endurance to prepare this exhausting dish.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">7. What was special about teatime at the writer's home?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">Teatime was special because it was a formal occasion where the grandmother and writer would dress up specially for it. They would enjoy a variety of Parsi treats including biscuits (batasa, nan-khatai, khari), patrel, kumas (cake), and bhakra (doughnuts).</div>
            </div>
        </div>
    `,
    text2: `
        <div class="question-set" id="text2Questions">
            <h3 class="question-section-title">Text II: Coffee in Araku Valley</h3>
            
            <div class="question-item">
                <p class="question-text">1. What is unique about the Araku valley as stated in paragraph one?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">According to paragraph one, Araku Valley is unique because it has "traverses an unusual trajectory through Adivasi empowerment, hot-air balloons and some of the best coffee in the world." The valley combines tribal development with tourism and high-quality coffee production.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">2. Where is Araku valley located?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">Araku valley is located at about 1,200m above sea level in the north-eastern corner of Andhra Pradesh, sharing a border with Odisha.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">3. What does the expression "traverses an unusual trajectory" mean in the context?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">In this context, "traverses an unusual trajectory" means that the development and story of Araku Valley has taken an unexpected or uncommon path, combining elements of tribal empowerment, tourism (hot-air balloons), and high-quality coffee production in a unique way.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">4. State a historical fact about the coffee in the valley.</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">Coffee was introduced to the Araku Valley hill tracts in 1898 by a British civil servant named N.S. Brodie.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">5. What does the expression "sapling to savouring" in the last paragraph mean?</p>
                <div class="question-options">
                    <div class="option">
                        <input type="radio" name="saplingOptions" id="sapling1">
                        <label for="sapling1">Coffee plants are taken care of from the stage of plantation till its beans are ready for an enjoyable cup of coffee.</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="saplingOptions" id="sapling2">
                        <label for="sapling2">Coffee saplings are very delicate hence a lot of care is being taken of them.</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="saplingOptions" id="sapling3">
                        <label for="sapling3">The growth of coffee plants is dependent on shady trees.</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="saplingOptions" id="sapling4">
                        <label for="sapling4">Coffee plant can give a cup of enjoyable coffee.</label>
                    </div>
                </div>
                <button class="interactive-btn" onclick="checkRadioAnswer(this, 'sapling1')">Submit</button>
                <div class="question-feedback"></div>
            </div>
            
            <div class="question-item">
                <p class="question-text">6. What factors contribute to the high quality of Araku coffee?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">The high quality of Araku coffee comes from bio-dynamic farming practices that create an interconnected ecosystem. These include soil enrichment through composting, planting a variety of shade trees (including fruit trees like mango and jackfruit), careful assessment of terroirs, and implementing standard operating procedures that ensure healthier plants and sweeter cherries.</div>
            </div>
        </div>
    `
};

// Load questions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
});

// Load all questions
function loadQuestions() {
    const questionsElement = document.getElementById('textQuestions');
    if (questionsElement) {
        questionsElement.innerHTML = questionsContent.text1 + questionsContent.text2;
    }
}

// Check text answer
function checkAnswer(buttonElement) {
    const questionItem = buttonElement.closest('.question-item');
    const textarea = questionItem.querySelector('.question-textarea');
    const feedbackElement = questionItem.querySelector('.question-feedback');
    const modelAnswer = questionItem.querySelector('.model-answer');
    
    const userAnswer = textarea.value.trim();
    
    if (userAnswer.length < 10) {
        feedbackElement.textContent = 'Please provide a more detailed answer.';
        feedbackElement.className = 'question-feedback warning';
        return;
    }
    
    // Display model answer and feedback
    feedbackElement.innerHTML = `
        <p><strong>Your answer has been submitted.</strong></p>
        <p><strong>Sample answer:</strong> ${modelAnswer.textContent}</p>
        <p>Compare your answer with the sample answer above.</p>
    `;
    feedbackElement.className = 'question-feedback correct';
    
    // Update progress
    if (typeof updateScore === 'function') {
        updateScore(5);
    }
}

// Check radio button answer
function checkRadioAnswer(buttonElement, correctId) {
    const questionItem = buttonElement.closest('.question-item');
    const selectedOption = questionItem.querySelector('input[type="radio"]:checked');
    const feedbackElement = questionItem.querySelector('.question-feedback');
    
    if (!selectedOption) {
        feedbackElement.textContent = 'Please select an answer.';
        feedbackElement.className = 'question-feedback warning';
        return;
    }
    
    if (selectedOption.id === correctId) {
        feedbackElement.textContent = 'Correct! The expression "sapling to savouring" refers to the entire process from planting coffee saplings to enjoying the final cup of coffee.';
        feedbackElement.className = 'question-feedback correct';
        
        // Update progress
        if (typeof updateScore === 'function') {
            updateScore(5);
        }
    } else {
        feedbackElement.textContent = 'Not quite. The expression "sapling to savouring" refers to the entire process from planting coffee saplings to enjoying the final cup of coffee.';
        feedbackElement.className = 'question-feedback incorrect';
    }
}

// Update score
function updateScore(points) {
    if (window.score !== undefined) {
        window.score += points;
        document.getElementById('totalScore').textContent = window.score;
    }
    
    // Check if all questions have been attempted
    const totalQuestions = document.querySelectorAll('.question-item').length;
    const answeredQuestions = document.querySelectorAll('.question-feedback.correct, .question-feedback.incorrect').length;
    
    if (answeredQuestions >= totalQuestions / 2 && window.modulesCompleted && !window.modulesCompleted.includes('thinking-text')) {
        if (typeof window.showAchievement === 'function') {
            window.showAchievement('Reading Comprehension Progress!');
        }
        
        if (typeof window.updateProgress === 'function') {
            window.modulesCompleted.push('thinking-text');
            window.updateProgress();
        }
    }
    
    if (answeredQuestions === totalQuestions && typeof window.showAchievement === 'function') {
        window.showAchievement('All Reading Questions Completed!');
    }
}
