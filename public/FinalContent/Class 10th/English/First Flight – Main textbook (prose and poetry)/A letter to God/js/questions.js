/**
 * Questions for A Letter to God interactive lesson
 */

// Questions for the story
const storyQuestions = [
    {
        question: "Who is Lencho in the story?",
        type: "radio",
        options: [
            "A postman",
            "A farmer",
            "A wealthy landowner",
            "A government official"
        ],
        correct: 1,
        feedback: "Lencho is a farmer who writes a letter to God when his crops are destroyed by hail."
    },
    {
        question: "What destroyed Lencho's crops?",
        type: "radio",
        options: [
            "A drought",
            "Locusts",
            "Hailstones",
            "A flood"
        ],
        correct: 2,
        feedback: "Lencho's crops were destroyed by a hailstorm that left the field white 'as if covered with salt'."
    },
    {
        question: "How much money did Lencho ask for in his letter to God?",
        type: "radio",
        options: [
            "Fifty pesos",
            "Seventy pesos",
            "One hundred pesos",
            "Two hundred pesos"
        ],
        correct: 2,
        feedback: "Lencho asked God for one hundred pesos to sow his field again and to live until the crop comes."
    },
    {
        question: "Who actually sent Lencho money?",
        type: "radio",
        options: [
            "The government",
            "The church",
            "His neighbors",
            "The postmaster and post office employees"
        ],
        correct: 3,
        feedback: "The postmaster and post office employees collected money to help Lencho. The postmaster signed the letter simply as 'God'."
    },
    {
        question: "Why was Lencho angry at the end of the story?",
        type: "radio",
        options: [
            "Because the letter was late",
            "Because he received less money than he asked for",
            "Because God had forgotten him",
            "Because his neighbors didn't help him"
        ],
        correct: 1,
        feedback: "Lencho was angry because he received only 70 pesos instead of the 100 pesos he had asked for. He believed post office employees had stolen the rest."
    },
    {
        question: "What does this story say about Lencho's faith in God?",
        type: "textarea",
        feedback: "Lencho has complete, unwavering faith in God. He writes to God without hesitation, fully expecting a reply. Even when he receives less money than requested, his faith in God remains unshaken - he believes God sent the full amount and blames the post office employees for stealing some of it."
    },
    {
        question: "What is ironic about the ending of the story?",
        type: "textarea",
        feedback: "The irony is that Lencho accuses the very people who helped him of being crooks. The post office employees were kind and generous in gathering money to help a stranger, but Lencho calls them 'a bunch of crooks' in his second letter to God."
    }
];

// Questions for the first poem (Dust of Snow)
const poem1Questions = [
    {
        question: "What does 'dust of snow' refer to in the poem?",
        type: "radio",
        options: [
            "A heavy snowfall",
            "Fine particles of snow",
            "Snow that has turned to dust",
            "Frost on the ground"
        ],
        correct: 1,
        feedback: "The 'dust of snow' refers to fine particles of snow that fell from the hemlock tree when the crow shook the branch."
    },
    {
        question: "What is unusual about the poet choosing a crow and a hemlock tree in this poem?",
        type: "radio",
        options: [
            "They are rare in winter landscapes",
            "They are both traditionally associated with positive emotions",
            "They are both traditionally associated with negative images",
            "They are mythological creatures"
        ],
        correct: 2,
        feedback: "Both the crow and the hemlock tree are traditionally associated with negative images - the crow is often seen as a bad omen and the hemlock is a poisonous plant. Yet in the poem, they become agents of a positive change in the poet's mood."
    },
    {
        question: "What change happens to the speaker in the poem?",
        type: "radio",
        options: [
            "He becomes physically ill",
            "His mood improves",
            "He gets lost in the snow",
            "He falls asleep"
        ],
        correct: 1,
        feedback: "The speaker experiences a change of mood - from negative to positive. The small incident of snow falling on him changes his outlook and 'saves' part of a day that had been unpleasant."
    },
    {
        question: "What does the word 'rued' mean in the last line of the poem?",
        type: "radio",
        options: [
            "Colored red",
            "Celebrated",
            "Regretted",
            "Remembered"
        ],
        correct: 2,
        feedback: "'Rued' means regretted or held in regret. The speaker was having a bad day that he regretted until this small moment changed his perspective."
    },
    {
        question: "What is the main theme of this poem?",
        type: "textarea",
        feedback: "The main theme of the poem is how small, seemingly insignificant moments in nature can have a profound effect on human emotions. It speaks to the healing power of nature and how a simple incident can change one's mood and perspective, turning a negative day into a more positive one."
    }
];

// Questions for the second poem (Fire and Ice)
const poem2Questions = [
    {
        question: "According to the poem, what are the two ways the world might end?",
        type: "radio",
        options: [
            "War and peace",
            "Day and night",
            "Fire and ice",
            "Heaven and hell"
        ],
        correct: 2,
        feedback: "The poem presents two contrasting possibilities for how the world might end: in fire or in ice."
    },
    {
        question: "What human emotion does the poet associate with fire?",
        type: "radio",
        options: [
            "Fear",
            "Joy",
            "Desire",
            "Anger"
        ],
        correct: 2,
        feedback: "The poet associates fire with desire: 'From what I've tasted of desire / I hold with those who favor fire.'"
    },
    {
        question: "What human emotion does the poet associate with ice?",
        type: "radio",
        options: [
            "Love",
            "Hate",
            "Indifference",
            "Jealousy"
        ],
        correct: 1,
        feedback: "The poet associates ice with hate: 'I think I know enough of hate / To say that for destruction ice / Is also great.'"
    },
    {
        question: "What does the word 'perish' mean in the poem?",
        type: "radio",
        options: [
            "To be born",
            "To flourish",
            "To die or be destroyed",
            "To change form"
        ],
        correct: 2,
        feedback: "'Perish' means to die or be destroyed. The line 'But if it had to perish twice' refers to the world ending twice."
    },
    {
        question: "What deeper meaning can you find in the contrast between fire and ice in this poem?",
        type: "textarea",
        feedback: "The contrast between fire and ice represents the destructive power of both passionate emotions (desire, represented by fire) and cold emotions (hate, represented by ice). The poem suggests that both intense passion and cold detachment can be equally destructive forces in human relationships and in the world. Frost uses this contrast to reflect on how human emotions might ultimately lead to destruction."
    }
];

// Function to show question set based on selection
function showQuestionSet(setName) {
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Find and update the clicked button
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        if (btn.onclick.toString().includes(setName)) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        }
    });
    
    let questions;
    let title;
    
    // Determine which question set to display
    if (setName === 'story-questions') {
        questions = storyQuestions;
        title = "Story Comprehension Questions";
    } else if (setName === 'poem1-questions') {
        questions = poem1Questions;
        title = "Dust of Snow - Poem Questions";
    } else if (setName === 'poem2-questions') {
        questions = poem2Questions;
        title = "Fire and Ice - Poem Questions";
    } else {
        console.error("Unknown question set:", setName);
        return;
    }
    
    // Generate HTML for questions
    const questionHTML = generateQuestionHTML(questions, title);
    
    // Update the DOM
    const questionContainer = document.getElementById('textQuestions');
    if (questionContainer) {
        questionContainer.innerHTML = questionHTML;
        
        // Add event listeners for question submission
        setupQuestionListeners();
    }
}

// Function to generate HTML for questions
function generateQuestionHTML(questions, title) {
    let html = `
        <div class="question-section-title">${title}</div>
        <div class="question-set">
    `;
    
    questions.forEach((q, index) => {
        html += `
            <div class="question-item" data-question-index="${index}">
                <div class="question-text">${index + 1}. ${q.question}</div>
        `;
        
        if (q.type === 'radio') {
            html += `<div class="question-options">`;
            q.options.forEach((option, optionIndex) => {
                html += `
                    <div class="option">
                        <input type="radio" id="q${index}_opt${optionIndex}" name="q${index}" value="${optionIndex}">
                        <label for="q${index}_opt${optionIndex}">${option}</label>
                    </div>
                `;
            });
            html += `</div>`;
            
            // Add submit button for this question
            html += `
                <button class="interactive-btn submit-answer" data-question-index="${index}">
                    Check Answer
                </button>
            `;
        } else if (q.type === 'textarea') {
            html += `
                <textarea class="question-textarea" id="q${index}_response" placeholder="Write your answer here..."></textarea>
                <button class="interactive-btn submit-essay" data-question-index="${index}">
                    Check Answer
                </button>
            `;
        }
        
        // Add feedback div (initially hidden)
        html += `<div class="question-feedback" id="feedback_${index}"></div>`;
        
        html += `</div>`;
    });
    
    html += `</div>`;
    return html;
}

// Setup listeners for question submission
function setupQuestionListeners() {
    // Setup listeners for radio button questions
    document.querySelectorAll('.submit-answer').forEach(button => {
        button.addEventListener('click', function() {
            const questionIndex = parseInt(this.getAttribute('data-question-index'));
            checkAnswer(questionIndex);
        });
    });
    
    // Setup listeners for essay questions
    document.querySelectorAll('.submit-essay').forEach(button => {
        button.addEventListener('click', function() {
            const questionIndex = parseInt(this.getAttribute('data-question-index'));
            checkEssayAnswer(questionIndex);
        });
    });
}

// Function to check radio button answers
function checkAnswer(questionIndex) {
    // Find which question set is active
    let questions;
    if (document.querySelector('.story-nav-btn.active').textContent.includes('Story')) {
        questions = storyQuestions;
    } else if (document.querySelector('.story-nav-btn.active').textContent.includes('Dust of Snow')) {
        questions = poem1Questions;
    } else {
        questions = poem2Questions;
    }
    
    const question = questions[questionIndex];
    const selectedOption = document.querySelector(`input[name="q${questionIndex}"]:checked`);
    const feedbackDiv = document.getElementById(`feedback_${questionIndex}`);
    
    // Create feedback div if it doesn't exist
    if (!feedbackDiv) {
        const questionItem = document.querySelector(`.question-item[data-question-index="${questionIndex}"]`);
        if (!questionItem) return;
        
        const newFeedbackDiv = document.createElement('div');
        newFeedbackDiv.id = `feedback_${questionIndex}`;
        newFeedbackDiv.className = 'question-feedback';
        questionItem.appendChild(newFeedbackDiv);
        return checkAnswer(questionIndex); // Retry after creating the feedback div
    }
    
    // Clear previous feedback
    feedbackDiv.className = 'question-feedback';
    
    // Reset all option styling
    document.querySelectorAll(`.question-item[data-question-index="${questionIndex}"] .option`).forEach(option => {
        option.classList.remove('correct-option', 'incorrect-option');
    });
    
    // Check if an option was selected
    if (!selectedOption) {
        feedbackDiv.textContent = "Please select an answer.";
        feedbackDiv.classList.add('warning');
        feedbackDiv.style.display = 'block';
        return;
    }
    
    const selectedValue = parseInt(selectedOption.value);
    
    // Get all options for this question
    const allOptions = document.querySelectorAll(`.question-item[data-question-index="${questionIndex}"] .option`);
    
    // Check if the answer is correct
    if (selectedValue === question.correct) {
        // Style the selected option as correct
        selectedOption.closest('.option').classList.add('correct-option');
        
        feedbackDiv.innerHTML = `
            <div class="feedback-icon correct-icon">✓</div>
            <div class="feedback-content">
                <div class="feedback-title">Correct!</div>
                <div class="feedback-explanation">${question.feedback}</div>
            </div>
        `;
        feedbackDiv.classList.add('correct');
        updateScore(10); // Add 10 points for a correct answer
    } else {
        // Style the selected option as incorrect
        selectedOption.closest('.option').classList.add('incorrect-option');
        
        // Highlight the correct option
        const correctOptionIndex = question.correct;
        if (allOptions && allOptions[correctOptionIndex]) {
            allOptions[correctOptionIndex].classList.add('correct-option');
        }
        
        feedbackDiv.innerHTML = `
            <div class="feedback-icon incorrect-icon">✗</div>
            <div class="feedback-content">
                <div class="feedback-title">Incorrect</div>
                <div class="feedback-explanation">${question.feedback}</div>
            </div>
        `;
        feedbackDiv.classList.add('incorrect');
    }
    
    feedbackDiv.style.display = 'block';
    
    // Disable all radio buttons after submission to prevent multiple attempts
    document.querySelectorAll(`input[name="q${questionIndex}"]`).forEach(radio => {
        radio.disabled = true;
    });
    
    // Change the button text to "Show Explanation"
    const submitButton = document.querySelector(`.question-item[data-question-index="${questionIndex}"] .submit-answer`);
    if (submitButton) {
        submitButton.textContent = "Show Explanation";
        submitButton.onclick = function() {
            feedbackDiv.style.display = feedbackDiv.style.display === 'none' ? 'block' : 'none';
        };
    }
}

// Function to check essay answers
function checkEssayAnswer(questionIndex) {
    // Find which question set is active
    let questions;
    if (document.querySelector('.story-nav-btn.active').textContent.includes('Story')) {
        questions = storyQuestions;
    } else if (document.querySelector('.story-nav-btn.active').textContent.includes('Dust of Snow')) {
        questions = poem1Questions;
    } else {
        questions = poem2Questions;
    }
    
    const question = questions[questionIndex];
    const textarea = document.getElementById(`q${questionIndex}_response`);
    const response = textarea ? textarea.value.trim() : '';
    let feedbackDiv = document.getElementById(`feedback_${questionIndex}`);
    
    // Create feedback div if it doesn't exist
    if (!feedbackDiv) {
        const questionItem = document.querySelector(`.question-item[data-question-index="${questionIndex}"]`);
        if (!questionItem) return;
        
        feedbackDiv = document.createElement('div');
        feedbackDiv.id = `feedback_${questionIndex}`;
        feedbackDiv.className = 'question-feedback';
        questionItem.appendChild(feedbackDiv);
    }
    
    // Clear previous feedback
    feedbackDiv.className = 'question-feedback';
    
    // Check if there's a response
    if (!response) {
        feedbackDiv.innerHTML = `
            <div class="feedback-icon warning-icon">!</div>
            <div class="feedback-content">
                <div class="feedback-title">Empty Response</div>
                <div class="feedback-explanation">Please write an answer before submitting.</div>
            </div>
        `;
        feedbackDiv.classList.add('warning');
        feedbackDiv.style.display = 'block';
        
        // Highlight the textarea to indicate it needs input
        if (textarea) {
            textarea.style.borderColor = '#ffc107';
            textarea.style.backgroundColor = '#fff8e1';
        }
        return;
    }
    
    // For essay questions, we provide the sample answer as feedback with improved styling
    feedbackDiv.innerHTML = `
        <div class="feedback-content">
            <div class="feedback-title">Thank you for your response!</div>
            <div class="feedback-comparison">
                <div class="user-answer">
                    <h4>Your Answer:</h4>
                    <div class="answer-text">${response}</div>
                </div>
                <div class="sample-answer">
                    <h4>Sample Answer:</h4>
                    <div class="answer-text">${question.feedback}</div>
                </div>
            </div>
        </div>
    `;
    feedbackDiv.classList.add('essay-feedback');
    feedbackDiv.style.display = 'block';
    
    // Style the textarea to indicate submission
    if (textarea) {
        textarea.style.borderColor = '#4caf50';
        textarea.style.backgroundColor = '#e8f5e9';
        textarea.disabled = true; // Prevent further edits
    }
    
    // Change the button text to "Show/Hide Feedback"
    const submitButton = document.querySelector(`.question-item[data-question-index="${questionIndex}"] .submit-essay`);
    if (submitButton) {
        submitButton.textContent = "Show/Hide Feedback";
        submitButton.onclick = function() {
            feedbackDiv.style.display = feedbackDiv.style.display === 'none' ? 'block' : 'none';
        };
    }
    
    // Award points for essay submission
    updateScore(5);
}

// Function to update score
function updateScore(points) {
    if (window.score !== undefined) {
        window.score += points;
        const scoreElement = document.getElementById('totalScore');
        if (scoreElement) {
            scoreElement.textContent = window.score;
        }
    }
}

// Setup poem question tabs
document.addEventListener('DOMContentLoaded', function() {
    // Create poem question navigation
    const storyNavContainer = document.querySelector('.story-navigation');
    
    if (storyNavContainer) {
        // Add buttons for the two poems if not already there
        if (!document.querySelector('[onclick="showQuestionSet(\'poem1-questions\')"]')) {
            const poem1Button = document.createElement('button');
            poem1Button.className = 'story-nav-btn';
            poem1Button.textContent = 'Dust of Snow Questions';
            poem1Button.onclick = function() { showQuestionSet('poem1-questions'); };
            poem1Button.setAttribute('aria-pressed', 'false');
            storyNavContainer.appendChild(poem1Button);
            
            const poem2Button = document.createElement('button');
            poem2Button.className = 'story-nav-btn';
            poem2Button.textContent = 'Fire and Ice Questions';
            poem2Button.onclick = function() { showQuestionSet('poem2-questions'); };
            poem2Button.setAttribute('aria-pressed', 'false');
            storyNavContainer.appendChild(poem2Button);
        }
    }
});
