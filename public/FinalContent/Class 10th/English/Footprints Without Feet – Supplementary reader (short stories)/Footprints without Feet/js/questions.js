/**
 * Questions for Footprints without Feet interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Multiple Choice Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How did Griffin, the scientist, make himself invisible?",
                options: [
                    "He painted himself with invisible paint",
                    "He swallowed certain rare drugs",
                    "He performed a magic spell",
                    "He used a special machine"
                ],
                answer: "He swallowed certain rare drugs that made his body as transparent as a sheet of glass."
            },
            {
                id: "sq2",
                type: "short",
                text: "Why did Griffin burn down his landlord's house?",
                options: [
                    "To test his scientific theories",
                    "In revenge against his landlord",
                    "It was an accident during an experiment",
                    "To hide evidence of his invisibility"
                ],
                answer: "In revenge against his landlord who disliked him and tried to eject him."
            },
            {
                id: "sq3",
                type: "short",
                text: "What problem did Griffin face immediately after becoming invisible?",
                options: [
                    "He couldn't see himself",
                    "He had no clothes or money",
                    "People could still see his shadow",
                    "The drugs made him very ill"
                ],
                answer: "He had no clothes or money, and was homeless during mid-winter."
            },
            {
                id: "sq4",
                type: "short",
                text: "What did Griffin do in the London store after closing time?",
                options: [
                    "He broke equipment and caused damage",
                    "He stole scientific equipment",
                    "He clothed and fed himself",
                    "He experimented on animals"
                ],
                answer: "He clothed and fed himself by breaking open boxes and wrappers, and then eating food from the restaurant and grocery sections."
            },
            {
                id: "sq5",
                type: "short",
                text: "How did the chair in Mrs. Hall's inn behave strangely?",
                options: [
                    "It disappeared completely",
                    "It moved on its own",
                    "It changed color",
                    "It grew in size"
                ],
                answer: "It moved on its own. The chair sprang into the air, charged at Mrs. Hall and her husband, pushed them out of the room, and then appeared to slam and lock the door."
            }
        ]
    },
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "saq1",
                type: "short",
                text: "What did Griffin obtain from the theatrical company shop and why?",
                answer: "He got bandages, dark glasses, false nose, whiskers, and a large hat to hide his invisibility and appear normal."
            },
            {
                id: "saq2",
                type: "short",
                text: "Why did Mrs. Hall initially tolerate Griffin's strange behavior?",
                answer: "He had paid her in advance and she believed he was an eccentric scientist."
            },
            {
                id: "saq3",
                type: "short",
                text: "What unusual event happened in the clergyman's home?",
                answer: "Money was stolen from a locked desk, but the room appeared empty with no sign of a thief."
            }
        ]
    },
    {
        section: "True or False",
        questions: [
            {
                id: "tf1",
                type: "short",
                text: "Mr. Jaffers, the constable, refused to arrest Griffin when he discovered he had no head.",
                options: ["True", "False"],
                answer: "False. Mr. Jaffers was determined to do his duty and insisted that if a magistrate's warrant ordered a person's arrest, they must be arrested with or without a head."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "\"Griffin was rather a lawless person.\" Would you agree with this statement? Why or why not?",
                answer: "Griffin was indeed lawless as shown by: burning down his landlord's house in revenge, stealing clothes and food, robbing the clergyman, and assaulting people who got in his way. He used his scientific discovery for personal gain and harming others rather than for the benefit of society."
            }
        ]
    }
];

// Load questions when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize question set visibility
    showQuestionSet('story-questions');
});

// Show a specific question set
function showQuestionSet(setId) {
    console.log(`Loading question set: ${setId}`);
    
    // Get the questions container
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) {
        console.error('Questions container not found');
        return;
    }
    
    // Clear previous content
    questionsContainer.innerHTML = '';
    
    // Determine which question set to show
    let questions;
    let title;
    
    if (setId === 'story-questions') {
        questions = storyQuestions;
        title = 'Footprints without Feet - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn) => {
        const isActive = btn.onclick && btn.onclick.toString().includes(setId);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.className = 'question-section-title';
    titleElement.textContent = title;
    questionsContainer.appendChild(titleElement);
    
    // Render each section of questions
    questions.forEach(section => {
        // Create section
        const sectionElement = document.createElement('div');
        sectionElement.className = 'question-set';
        
        // Add section title
        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = section.section;
        sectionElement.appendChild(sectionTitle);
        
        // Add questions
        section.questions.forEach(question => {
            // Create question item
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.id = question.id;
            
            // Add question text
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.innerHTML = question.text;
            questionItem.appendChild(questionText);
            
            // Add appropriate input based on question type
            if (question.type === 'short') {
                if (question.options) {
                    // Multiple choice question
                    const optionsContainer = document.createElement('div');
                    optionsContainer.className = 'question-options';
                    
                    question.options.forEach((option, index) => {
                        const optionLabel = document.createElement('label');
                        optionLabel.className = 'option';
                        
                        const optionInput = document.createElement('input');
                        optionInput.type = 'radio';
                        optionInput.name = question.id;
                        optionInput.value = index;
                        optionInput.dataset.questionId = question.id;
                        
                        const optionText = document.createElement('span');
                        optionText.textContent = option;
                        
                        optionLabel.appendChild(optionInput);
                        optionLabel.appendChild(optionText);
                        optionsContainer.appendChild(optionLabel);
                    });
                    
                    questionItem.appendChild(optionsContainer);
                } else {
                    // Text area for short answers
                    const textarea = document.createElement('textarea');
                    textarea.className = 'question-textarea';
                    textarea.rows = 3;
                    textarea.placeholder = 'Write your answer here...';
                    textarea.dataset.questionId = question.id;
                    questionItem.appendChild(textarea);
                }
                
                // Check answer button
                const checkButton = document.createElement('button');
                checkButton.className = 'interactive-btn';
                checkButton.textContent = 'Check Answer';
                checkButton.onclick = function() { checkAnswer(question.id, question.answer); };
                questionItem.appendChild(checkButton);
                
                // Feedback element
                const feedback = document.createElement('div');
                feedback.className = 'question-feedback';
                feedback.id = `feedback-${question.id}`;
                feedback.style.display = 'none'; // Initially hidden
                questionItem.appendChild(feedback);
                
                // Show answer button
                const showAnswerButton = document.createElement('button');
                showAnswerButton.className = 'interactive-btn';
                showAnswerButton.textContent = 'Show Answer';
                showAnswerButton.style.marginLeft = '10px';
                showAnswerButton.onclick = function() { showAnswer(question.id, question.answer); };
                questionItem.appendChild(showAnswerButton);
            } 
            else if (question.type === 'essay') {
                // Larger text area for essay questions
                const textarea = document.createElement('textarea');
                textarea.className = 'question-textarea';
                textarea.rows = 10;
                textarea.placeholder = 'Write your essay answer here...';
                textarea.dataset.questionId = question.id;
                questionItem.appendChild(textarea);
                
                // Save button for essays
                const saveButton = document.createElement('button');
                saveButton.className = 'interactive-btn';
                saveButton.textContent = 'Save Essay';
                saveButton.onclick = function() { saveEssay(question.id); };
                questionItem.appendChild(saveButton);
                
                // Feedback element
                const feedback = document.createElement('div');
                feedback.className = 'question-feedback';
                feedback.id = `feedback-${question.id}`;
                feedback.style.display = 'none'; // Initially hidden
                questionItem.appendChild(feedback);
                
                // Show suggested answer button
                const showAnswerButton = document.createElement('button');
                showAnswerButton.className = 'interactive-btn';
                showAnswerButton.textContent = 'Show Suggested Response';
                showAnswerButton.style.marginLeft = '10px';
                showAnswerButton.onclick = function() { showAnswer(question.id, question.answer); };
                questionItem.appendChild(showAnswerButton);
            }
            
            // Add question to section
            sectionElement.appendChild(questionItem);
        });
        
        // Add section to container
        questionsContainer.appendChild(sectionElement);
    });
}

// Check answer function
function checkAnswer(questionId, correctAnswer) {
    const textarea = document.querySelector(`textarea[data-question-id="${questionId}"]`);
    const radioInputs = document.querySelectorAll(`input[type="radio"][data-question-id="${questionId}"]`);
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    if (!feedback) return;
    
    let userAnswer = '';
    let isCorrect = false;
    
    // Check if it's a text input or multiple choice question
    if (textarea) {
        userAnswer = textarea.value.trim();
        
        if (userAnswer.length === 0) {
            feedback.textContent = 'Please provide an answer before checking.';
            feedback.className = 'question-feedback warning';
            feedback.style.display = 'block';
            return;
        }
        
        // For text answers, check for keywords
        const correctKeywords = correctAnswer.toLowerCase().split(/\s+/);
        const significantKeywords = correctKeywords.filter(word => 
            word.length > 4 && 
            !['about', 'above', 'after', 'again', 'along', 'around', 'because', 'before', 'below', 'between', 'could', 'every', 'first', 'found', 'their', 'there', 'these', 'thing', 'think', 'those', 'through', 'under', 'where', 'which', 'while', 'would'].includes(word)
        );
        
        const userKeywords = userAnswer.toLowerCase().split(/\s+/);
        const matchedKeywords = significantKeywords.filter(keyword => 
            userKeywords.some(userWord => userWord.includes(keyword) || keyword.includes(userWord))
        );
        
        const percentMatched = matchedKeywords.length / Math.max(1, Math.min(5, significantKeywords.length));
        isCorrect = percentMatched >= 0.6;
    } 
    else if (radioInputs.length > 0) {
        // For multiple choice, find selected option
        const selectedInput = Array.from(radioInputs).find(input => input.checked);
        
        if (!selectedInput) {
            feedback.textContent = 'Please select an answer before checking.';
            feedback.className = 'question-feedback warning';
            feedback.style.display = 'block';
            return;
        }
        
        // Check if the correct option contains the user's selection text
        const selectedText = selectedInput.nextSibling.textContent;
        isCorrect = correctAnswer.includes(selectedText);
    } else {
        return; // No input found
    }
    
    // Display feedback
    if (isCorrect) {
        feedback.textContent = 'Correct! Good job.';
        feedback.className = 'question-feedback correct';
        
        // Update score if not already completed
        if (!document.getElementById(questionId).classList.contains('completed')) {
            document.getElementById(questionId).classList.add('completed');
            if (typeof updateScore === 'function') {
                updateScore(5);
            }
        }
    } else {
        feedback.textContent = 'Your answer may be missing some important points. Try again or check the suggested answer.';
        feedback.className = 'question-feedback incorrect';
    }
    
    feedback.style.display = 'block';
}

// Save essay function
function saveEssay(questionId) {
    const textarea = document.querySelector(`textarea[data-question-id="${questionId}"]`);
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    if (!textarea || !feedback) return;
    
    const userAnswer = textarea.value.trim();
    
    if (userAnswer.length < 50) {
        feedback.textContent = 'Please write a more detailed essay (at least 50 characters).';
        feedback.className = 'question-feedback warning';
        feedback.style.display = 'block';
        return;
    }
    
    feedback.textContent = 'Your essay has been saved!';
    feedback.className = 'question-feedback correct';
    feedback.style.display = 'block';
    
    // Update score if not already completed
    if (!document.getElementById(questionId).classList.contains('completed')) {
        document.getElementById(questionId).classList.add('completed');
        if (typeof updateScore === 'function') {
            updateScore(10);
        }
    }
}

// Show answer function
function showAnswer(questionId, answer) {
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    if (!feedback) return;
    
    // Ensure the feedback is visible and styled properly
    feedback.innerHTML = `<strong>Suggested Answer:</strong><br>${answer}`;
    feedback.className = 'question-feedback';
    feedback.style.display = 'block';
    feedback.style.padding = '15px';
    feedback.style.margin = '15px 0';
    feedback.style.backgroundColor = '#f5f5f5';
    feedback.style.border = '1px solid #ddd';
    feedback.style.borderRadius = '5px';
    feedback.style.color = '#333';
}

// Function to update the score (should be defined in main.js)
function updateScore(points) {
    if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
        score += points;
        document.getElementById('totalScore').textContent = score;
    }
}