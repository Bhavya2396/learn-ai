/**
 * Reading comprehension questions for Mijbil the Otter
 */

// Questions Content
const questionsContent = {
    text1: `
        <div class="question-set" id="text1Questions">
            <h3 class="question-section-title">Text I: Baby Bhakat</h3>
            
            <div class="question-item">
                <p class="question-text">1. Dharini —</p>
                <div class="question-options">
                    <div class="option">
                        <input type="radio" name="dharini" id="dhariniA">
                        <label for="dhariniA">is the land owner</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="dharini" id="dhariniB">
                        <label for="dhariniB">loves animals</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="dharini" id="dhariniC">
                        <label for="dhariniC">is a gardener</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="dharini" id="dhariniD">
                        <label for="dhariniD">is father of Bhakat</label>
                    </div>
                </div>
                <button class="interactive-btn" onclick="checkRadioAnswer(this, 'dhariniB')">Submit</button>
                <div class="question-feedback"></div>
            </div>
            
            <div class="question-item">
                <p class="question-text">2. Civet cats are also called ___________________.</p>
                <div class="question-options">
                    <div class="option">
                        <input type="radio" name="civet" id="civetA">
                        <label for="civetA">Baby cats</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="civet" id="civetB">
                        <label for="civetB">Night cats</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="civet" id="civetC">
                        <label for="civetC">Toddy cats</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="civet" id="civetD">
                        <label for="civetD">Snail cats</label>
                    </div>
                </div>
                <button class="interactive-btn" onclick="checkRadioAnswer(this, 'civetC')">Submit</button>
                <div class="question-feedback"></div>
            </div>
            
            <div class="question-item">
                <p class="question-text">3. Baby Bhakat loves to eat ___________________.</p>
                <div class="question-options">
                    <div class="option">
                        <input type="radio" name="food" id="foodA">
                        <label for="foodA">roti</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="food" id="foodB">
                        <label for="foodB">vegetables</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="food" id="foodC">
                        <label for="foodC">fruits</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="food" id="foodD">
                        <label for="foodD">meat</label>
                    </div>
                </div>
                <button class="interactive-btn" onclick="checkRadioAnswer(this, 'foodD')">Submit</button>
                <div class="question-feedback"></div>
            </div>
            
            <div class="question-item">
                <p class="question-text">4. Baby Bhakat hates to ___________________.</p>
                <div class="question-options">
                    <div class="option">
                        <input type="radio" name="hate" id="hateA">
                        <label for="hateA">eat snails</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="hate" id="hateB">
                        <label for="hateB">be in water</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="hate" id="hateC">
                        <label for="hateC">play with Mama</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="hate" id="hateD">
                        <label for="hateD">sleep in the rafter</label>
                    </div>
                </div>
                <button class="interactive-btn" onclick="checkRadioAnswer(this, 'hateB')">Submit</button>
                <div class="question-feedback"></div>
            </div>
            
            <div class="question-item">
                <p class="question-text">5. The home for the Bhakat is _________________________.</p>
                <div class="question-options">
                    <div class="option">
                        <input type="radio" name="home" id="homeA">
                        <label for="homeA">a garden near a river</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="home" id="homeB">
                        <label for="homeB">the roof of the little hut</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="home" id="homeC">
                        <label for="homeC">a little hut by a river</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="home" id="homeD">
                        <label for="homeD">the nest in a coconut tree</label>
                    </div>
                </div>
                <button class="interactive-btn" onclick="checkRadioAnswer(this, 'homeC')">Submit</button>
                <div class="question-feedback"></div>
            </div>
            
            <div class="question-item">
                <p class="question-text">6. Which statement is NOT true about Dharini and Anjali?</p>
                <div class="question-options">
                    <div class="option">
                        <input type="radio" name="notTrue" id="notTrueA">
                        <label for="notTrueA">Dharani and Anjali treat Bhakat as their own baby.</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="notTrue" id="notTrueB">
                        <label for="notTrueB">They keep the door closed to keep Bhakat safe.</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="notTrue" id="notTrueC">
                        <label for="notTrueC">Anjali plays with Bhakat and lets it be naughty.</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="notTrue" id="notTrueD">
                        <label for="notTrueD">Anjali feeds Bhakat before anyone else.</label>
                    </div>
                </div>
                <button class="interactive-btn" onclick="checkRadioAnswer(this, 'notTrueB')">Submit</button>
                <div class="question-feedback"></div>
            </div>
        </div>
    `,
    text2: `
        <div class="question-set" id="text2Questions">
            <h3 class="question-section-title">Text II: Human-Wildlife Conflict</h3>
            
            <div class="question-item">
                <p class="question-text">1. What happens when communities expand?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">When communities expand, natural wild places are reduced, causing people and wildlife to increasingly come into conflict over living space and food.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">2. What is the meaning of "impact" in the passage? How is it affecting people and their life?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">In the passage, "impact" refers to the significant effects or consequences of human-wildlife conflict. It affects people by causing them to lose crops and livestock (affecting their income and food security), property, and sometimes their lives. Even injuries caused by wildlife can lead to loss of livelihood.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">3. What will make the human-wildlife conflict more intense?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">According to the passage, the effects of climate change will probably make the human-wildlife conflict more intense or worse in the future.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">4. The passage talks about one solution to tackle human-wildlife conflict. What is it?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">One solution mentioned is planting a barrier of crops that repel animals, such as chilli plants which elephants and some other wildlife don't like. This approach is creative and simple, and additionally beneficial as the chilli can be sold to increase income.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">5. Which of these statements are NOT true about the creative and simple solutions mentioned in the passage? (Select all that apply)</p>
                <div class="question-options">
                    <div class="option">
                        <input type="checkbox" name="solutions" id="solutionA">
                        <label for="solutionA">active community involvement</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" name="solutions" id="solutionB">
                        <label for="solutionB">generate income naturally</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" name="solutions" id="solutionC">
                        <label for="solutionC">mutually beneficial coexistence</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" name="solutions" id="solutionD">
                        <label for="solutionD">people live with wildlife happily</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" name="solutions" id="solutionE">
                        <label for="solutionE">be more enthusiastic and supportive of conservation</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" name="solutions" id="solutionF">
                        <label for="solutionF">developing sustainable livelihood</label>
                    </div>
                </div>
                <button class="interactive-btn" onclick="checkCheckboxAnswers(this, ['solutionD'])">Submit</button>
                <div class="question-feedback"></div>
            </div>
        </div>
    `,
    text3: `
        <div class="question-set" id="text3Questions">
            <h3 class="question-section-title">Text III: Animal Rights</h3>
            
            <div class="question-item">
                <p class="question-text">1. What do the people who support animal rights recognise?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">People who support animal rights recognise that all animals have an inherent worth or value that is completely separate from their usefulness to humans, and that every being with a will to live has the right to live free from exploitation and suffering.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">2. As human beings, what are our moral obligations towards animals?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">As human beings, whenever we consider doing something that would interfere with animals' needs, we are morally obligated to take them into account and consider their ability to suffer in the same way and to the same degree that humans do.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">3. What is the right of animals as mentioned in paragraph three?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">According to paragraph three, animals have the right not to suffer at the hands of humans and to live their lives free from suffering and exploitation because they have an interest in doing so.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">4. Why should we rediscover our empathy, compassion, and respect for animals?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">We should rediscover our empathy, compassion, and respect for animals because it helps us look past the arbitrary distinctions between different species and respect all animals equally, recognizing that they all have the same capacity to feel pain and fear.</div>
            </div>
            
            <div class="question-item">
                <p class="question-text">5. Anyone who cares about animals can start putting "these principles" into practice. What are "these principles"?</p>
                <textarea class="question-textarea" placeholder="Type your answer here..."></textarea>
                <button class="interactive-btn" onclick="checkAnswer(this)">Submit</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display:none;">"These principles" refer to animal rights principles that recognize animals' inherent worth and their right to live free from suffering and exploitation. The principles include treating all animals equally regardless of species, having compassion for them, and respecting their ability to feel pain and fear.</div>
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
        questionsElement.innerHTML = questionsContent.text1 + questionsContent.text2 + questionsContent.text3;
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
        feedbackElement.textContent = 'Correct! Well done.';
        feedbackElement.className = 'question-feedback correct';
        
        // Update progress
        if (typeof updateScore === 'function') {
            updateScore(5);
        }
    } else {
        feedbackElement.textContent = 'Incorrect. Try again.';
        feedbackElement.className = 'question-feedback incorrect';
    }
}

// Check checkbox answers
function checkCheckboxAnswers(buttonElement, correctIds) {
    const questionItem = buttonElement.closest('.question-item');
    const selectedOptions = Array.from(questionItem.querySelectorAll('input[type="checkbox"]:checked'));
    const feedbackElement = questionItem.querySelector('.question-feedback');
    
    if (selectedOptions.length === 0) {
        feedbackElement.textContent = 'Please select at least one answer.';
        feedbackElement.className = 'question-feedback warning';
        return;
    }
    
    // Check if selected options match correct ids
    const selectedIds = selectedOptions.map(option => option.id);
    const correctAnswers = correctIds.every(id => selectedIds.includes(id)) && 
                          selectedIds.every(id => correctIds.includes(id));
    
    if (correctAnswers) {
        feedbackElement.textContent = 'Correct! You identified all the statements that are not true.';
        feedbackElement.className = 'question-feedback correct';
        
        // Update progress
        if (typeof updateScore === 'function') {
            updateScore(5);
        }
    } else {
        feedbackElement.textContent = 'Incorrect. Try again.';
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
