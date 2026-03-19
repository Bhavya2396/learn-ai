/**
 * Reading comprehension questions for In the Kingdom of Fools
 */

// Initialize question sets when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuestionSets();
    setupNavigationHandlers();
});

// Show specified question set
function showQuestionSet(setId) {
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Find the button that triggered this and update its state
    const buttons = document.querySelectorAll('.story-nav-btn');
    for (let btn of buttons) {
        if (btn.onclick && btn.onclick.toString().includes(setId)) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            break;
        }
    }
    
    // Load the questions
    loadQuestions(setId);
}

// Initialize question sets and display the default set
function initializeQuestionSets() {
    // Default to story questions
    loadQuestions('story-questions');
}

// Set up navigation handlers if needed
function setupNavigationHandlers() {
    // This function can be expanded if more complex navigation is needed
    console.log('Question navigation handlers initialized');
}

// Load questions based on the selected set
function loadQuestions(setId) {
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) return;
    
    let questionContent = '';
    
    switch(setId) {
        case 'story-questions':
            questionContent = generateStoryQuestions();
            break;
        default:
            questionContent = '<p>No questions available for this section.</p>';
    }
    
    questionsContainer.innerHTML = questionContent;
    
    // Add event listeners to the newly loaded questions
    attachQuestionHandlers();
}

// Generate HTML for story questions
function generateStoryQuestions() {
    return `
        <h3 class="question-section-title">Think About It</h3>
        
        <div class="question-set">
            <div class="question-item" id="question1">
                <div class="question-text">1. What are the two strange things the guru and his disciple find in the Kingdom of Fools?</div>
                <textarea class="question-textarea" placeholder="Write your answer here..."></textarea>
                <button class="interactive-btn check-answer-btn" data-question-id="1">Check Answer</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display: none;">
                    <p>The two strange things were:</p>
                    <ol>
                        <li>Everyone was sleeping during the day and working at night because the king and minister had reversed day and night.</li>
                        <li>Everything in the kingdom cost the same - just one duddu, regardless of what it was (rice, bananas, or anything else).</li>
                    </ol>
                </div>
            </div>
            
            <div class="question-item" id="question2">
                <div class="question-text">2. Why does the disciple decide to stay in the Kingdom of Fools? Is it a good idea?</div>
                <textarea class="question-textarea" placeholder="Write your answer here..."></textarea>
                <button class="interactive-btn check-answer-btn" data-question-id="2">Check Answer</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display: none;">
                    <p>The disciple decides to stay in the Kingdom of Fools because everything is very cheap there. He can eat all the food he wants - bananas, ghee, rice, and wheat - for very little money. He is interested only in enjoying good food at cheap prices.</p>
                    <p>It was not a good idea to stay because, as the guru warned, the kingdom was unpredictable and dangerous. The guru said, "They are all fools. This won't last very long, and you can't tell what they'll do to you next." This warning proved true when the disciple was later selected to be executed simply because he had grown fat.</p>
                </div>
            </div>
            
            <div class="question-item" id="question3">
                <div class="question-text">3. Name all the people who are tried in the king's court, and give the reasons for their trial.</div>
                <textarea class="question-textarea" placeholder="Write your answer here..."></textarea>
                <button class="interactive-btn check-answer-btn" data-question-id="3">Check Answer</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display: none;">
                    <p>The following people were tried in the king's court:</p>
                    <ol>
                        <li>The merchant (house owner) - Because his weak wall collapsed and killed the thief.</li>
                        <li>The bricklayer - Because he built the weak wall that collapsed.</li>
                        <li>The dancing girl - Because she distracted the bricklayer with her jingling anklets while he was building the wall.</li>
                        <li>The goldsmith - Because he made the dancing girl walk up and down many times to his house, which distracted the bricklayer.</li>
                        <li>The merchant again - Because his father had ordered jewellery from the goldsmith which delayed the dancing girl's order, causing her to walk up and down the street.</li>
                        <li>The disciple - Not for any crime, but because he was fat enough to fit the execution stake.</li>
                    </ol>
                </div>
            </div>
            
            <div class="question-item" id="question4">
                <div class="question-text">4. Who is the real culprit according to the king? Why does he escape punishment?</div>
                <textarea class="question-textarea" placeholder="Write your answer here..."></textarea>
                <button class="interactive-btn check-answer-btn" data-question-id="4">Check Answer</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display: none;">
                    <p>According to the king, the real culprit is the merchant's father who ordered the jewellery from the goldsmith. This delayed the dancing girl's order, causing her to walk up and down distracting the bricklayer, who built a bad wall that eventually collapsed and killed the thief.</p>
                    <p>The merchant's father escapes punishment because he is already dead. So the king decides to punish his son instead, saying the son has "inherited everything from that criminal father of yours, his riches as well as his sins."</p>
                </div>
            </div>
            
            <div class="question-item" id="question5">
                <div class="question-text">5. What are the Guru's words of wisdom? When does the disciple remember them?</div>
                <textarea class="question-textarea" placeholder="Write your answer here..."></textarea>
                <button class="interactive-btn check-answer-btn" data-question-id="5">Check Answer</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display: none;">
                    <p>The Guru's words of wisdom are: "This is a city of fools. You don't know what they will do next." He warns the disciple that the kingdom is unpredictable and potentially dangerous.</p>
                    <p>The disciple remembers these words when he is about to be executed. He realizes too late that the guru was right about the foolish and unpredictable nature of the kingdom, where he could be selected for execution simply because he was fat enough to fit the stake.</p>
                </div>
            </div>
            
            <div class="question-item" id="question6">
                <div class="question-text">6. How does the guru manage to save his disciple's life?</div>
                <textarea class="question-textarea" placeholder="Write your answer here..."></textarea>
                <button class="interactive-btn check-answer-btn" data-question-id="6">Check Answer</button>
                <div class="question-feedback"></div>
                <div class="model-answer" style="display: none;">
                    <p>The guru saves his disciple's life through a clever trick. He tells the king that whoever dies first on the stake will be reborn as the king of the country, and whoever dies next will become the minister. He creates a competition with his disciple about who should die first, making both of them appear eager to be executed.</p>
                    <p>The foolish king and minister believe the guru's story and decide they want these positions in their next lives. They secretly release the guru and disciple, disguise themselves as the prisoners, and get themselves executed first. This allows the guru and disciple to escape and eventually become the new rulers of the kingdom.</p>
                </div>
            </div>
        </div>

        <h3 class="question-section-title">Talk About It</h3>
        
        <div class="question-set">
            <div class="question-item" id="discussion1">
                <div class="question-text">In Shakespeare's plays the fool is not really foolish. If you have read or seen Shakespeare's plays such as King Lear, As You Like It, Twelfth Night, you may talk about the role of the fool.</div>
                <div class="content-block">
                    <p>In many literary traditions, the character of the "fool" is often much wiser than they appear. Consider how the guru in this story uses the foolishness of the king to his advantage. What other examples can you think of where apparent foolishness is actually a form of wisdom?</p>
                </div>
                <textarea class="question-textarea" placeholder="Write your thoughts here..."></textarea>
                <button class="interactive-btn save-discussion-btn" data-question-id="discussion1">Save Response</button>
                <div class="question-feedback"></div>
            </div>
            
            <div class="question-item" id="discussion2">
                <div class="question-text">Do you know any stories in your language about wise fools, such as Tenali Rama or Gopal Bhar?</div>
                <div class="content-block">
                    <p>Many cultures have stories about characters who use apparent foolishness to convey wisdom or solve problems. Share any stories you know about such characters.</p>
                </div>
                <textarea class="question-textarea" placeholder="Write your thoughts here..."></textarea>
                <button class="interactive-btn save-discussion-btn" data-question-id="discussion2">Save Response</button>
                <div class="question-feedback"></div>
            </div>
        </div>
    `;
}

// Attach event handlers to question buttons
function attachQuestionHandlers() {
    // Add event listeners to 'Check Answer' buttons
    document.querySelectorAll('.check-answer-btn').forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question-id');
            const questionItem = this.closest('.question-item');
            const textarea = questionItem.querySelector('.question-textarea');
            const feedback = questionItem.querySelector('.question-feedback');
            const modelAnswer = questionItem.querySelector('.model-answer');
            
            // Check if the answer has sufficient content
            if (textarea.value.trim().length < 10) {
                feedback.textContent = "Please provide a more detailed answer.";
                feedback.className = "question-feedback warning";
                return;
            }
            
            // Show model answer for comparison
            feedback.innerHTML = "<strong>Thank you for your answer.</strong> Here's a model answer for comparison:";
            feedback.className = "question-feedback correct";
            
            // Clone and show the model answer
            const modelAnswerContent = modelAnswer.cloneNode(true);
            modelAnswerContent.style.display = "block";
            modelAnswerContent.className = "model-answer-display";
            feedback.appendChild(modelAnswerContent);
            
            // Disable the button after checking
            this.disabled = true;
            
            // Award points and track progress
            if (typeof updateScore === 'function') {
                updateScore(5); // Award 5 points for answering
            }
        });
    });
    
    // Add event listeners to 'Save Response' buttons for discussion questions
    document.querySelectorAll('.save-discussion-btn').forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question-id');
            const questionItem = this.closest('.question-item');
            const textarea = questionItem.querySelector('.question-textarea');
            const feedback = questionItem.querySelector('.question-feedback');
            
            // Check if the response has sufficient content
            if (textarea.value.trim().length < 10) {
                feedback.textContent = "Please provide a more detailed response.";
                feedback.className = "question-feedback warning";
                return;
            }
            
            // Acknowledge the response
            feedback.textContent = "Your response has been saved. Great thinking!";
            feedback.className = "question-feedback correct";
            
            // Disable the button after saving
            this.disabled = true;
            
            // Award points for participation
            if (typeof updateScore === 'function') {
                updateScore(3); // Award 3 points for discussion participation
            }
        });
    });
}
