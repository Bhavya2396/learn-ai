/**
 * Questions for The Midnight Visitor interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How is Ausable different from other secret agents?",
                answer: "Ausable is fat, has an American accent, and doesn't fit the description of a typical secret agent. He lacks the physical appearance and mysterious demeanor usually associated with spies."
            },
            {
                id: "sq2",
                type: "short",
                text: "Who is Fowler and what is his first authentic thrill of the day?",
                answer: "Fowler is a young writer who wanted to meet Ausable. His first authentic thrill was seeing Max with a pistol in Ausable's room."
            },
            {
                id: "sq3",
                type: "short",
                text: "How did Max get into the room according to himself?",
                answer: "Max said he used a passkey to enter Ausable's room."
            },
            {
                id: "sq4",
                type: "short",
                text: "What did Ausable claim was outside his window?",
                answer: "Ausable claimed there was a balcony outside his window that belonged to the next apartment."
            },
            {
                id: "sq5",
                type: "short",
                text: "What happened to Max in the end?",
                answer: "Max fell to his death while trying to escape through the window, thinking there was a balcony when there actually wasn't one."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"You are disappointed.\"<br>(i) Who says these words and to whom?<br>(ii) Why does the speaker say this?<br>(iii) Why is the listener disappointed?",
                answer: "(i) Ausable says these words to Fowler.<br>(ii) Because he can see that Fowler is let down by his appearance.<br>(iii) Because Ausable doesn't fit the description of a secret agent that Fowler had read about."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"I'm going to raise the devil with the management this time, and you can bet on it.\"<br>(i) Who speaks these words?<br>(ii) What does 'raise the devil' mean here?<br>(iii) Why does the speaker say this?",
                answer: "(i) Ausable<br>(ii) To complain angrily or create a disturbance<br>(iii) To create a convincing story about the balcony for Max to believe"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How does Ausable manage to make Max believe that there is a balcony attached to his room?",
                answer: "Ausable convincingly creates a detailed story about a balcony that belongs to the next apartment but extends under his window. He adds credibility by mentioning that someone had previously entered through it, and that management had promised to block it off. His confident and irritated tone makes the lie believable."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "When do you think Ausable thought up his plan for getting rid of Max?",
                answer: "Ausable likely thought of his plan when he heard the knock at the door. He immediately seized the opportunity by inventing the story about police checking on him and the non-existent balcony. His quick thinking and calm demeanor suggest he created the plan on the spot in response to the situation."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What kind of person do you think Ausable is? Support your answer with evidence from the story.",
                answer: "Ausable is intelligent, quick-thinking, and calm under pressure. Despite his unremarkable physical appearance, he demonstrates exceptional presence of mind by inventing the balcony story. He shows intelligence through his detailed lie, cleverly exploiting the knock at the door. His calm demeanor throughout the dangerous situation proves his experience and competence as a secret agent."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "In this story, Ausable shows 'presence of mind.' Describe a situation where you had to think quickly to solve a problem.",
                answer: "Consider: identifying a challenging situation, explaining the quick thinking required, describing the solution implemented, reflecting on the outcome, and lessons learned. Include specific details about emotions, thought processes, and actions taken."
            },
            {
                id: "eq2",
                type: "essay",
                text: "Do you think intelligence is more important than physical strength in difficult situations? Give examples to support your view.",
                answer: "Consider: comparing mental and physical abilities, analyzing situations where intelligence prevails over strength, examining situations where physical strength is crucial, exploring how they complement each other, and drawing conclusions about their relative importance in different contexts."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Compare the character of Ausable with other secret agents you have read about or seen in movies. How is he similar or different?",
                answer: "Consider: comparing physical attributes, personality traits, methods of operation, problem-solving approaches, and effectiveness. Reference specific examples from books, movies, or television shows featuring secret agents, and analyze how Ausable challenges stereotypical portrayals."
            }
        ]
    }
];

// Load questions when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize question set visibility
    showQuestionSet('story-questions');
    
    // Add event listeners to question set buttons if they exist
    const storyQuestionsBtn = document.querySelector('.story-nav-btn[onclick="showQuestionSet(\'story-questions\')"]');
    
    if (storyQuestionsBtn) {
        storyQuestionsBtn.addEventListener('click', () => showQuestionSet('story-questions'));
    }
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
        title = 'The Midnight Visitor - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        const isActive = (index === 0 && setId === 'story-questions');
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
            if (question.type === 'short' || question.type === 'paragraph') {
                // Text area for short and paragraph answers
                const textarea = document.createElement('textarea');
                textarea.className = 'question-textarea';
                textarea.rows = question.type === 'short' ? 3 : 6;
                textarea.placeholder = `Write your ${question.type} answer here...`;
                textarea.dataset.questionId = question.id;
                questionItem.appendChild(textarea);
                
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
            else if (question.type === 'reference') {
                // Text area for reference questions
                const textarea = document.createElement('textarea');
                textarea.className = 'question-textarea';
                textarea.rows = 6;
                textarea.placeholder = 'Write your answer here...';
                textarea.dataset.questionId = question.id;
                questionItem.appendChild(textarea);
                
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
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    if (!textarea || !feedback) return;
    
    const userAnswer = textarea.value.trim();
    
    if (userAnswer.length === 0) {
        feedback.textContent = 'Please provide an answer before checking.';
        feedback.className = 'question-feedback warning show';
        feedback.style.display = 'block'; // Make sure it's visible
        return;
    }
    
    // For simplicity, we'll just check if the user's answer contains certain keywords from the correct answer
    // In a real implementation, you'd want a more sophisticated check
    const correctKeywords = correctAnswer.toLowerCase().split(/\s+/);
    const significantKeywords = correctKeywords.filter(word => 
        word.length > 4 && 
        !['about', 'above', 'after', 'again', 'along', 'around', 'because', 'before', 'below', 'between', 'could', 'every', 'first', 'found', 'their', 'there', 'these', 'thing', 'think', 'those', 'through', 'under', 'where', 'which', 'while', 'would'].includes(word)
    );
    
    const userKeywords = userAnswer.toLowerCase().split(/\s+/);
    const matchedKeywords = significantKeywords.filter(keyword => 
        userKeywords.some(userWord => userWord.includes(keyword) || keyword.includes(userWord))
    );
    
    const percentMatched = matchedKeywords.length / Math.min(5, significantKeywords.length);
    
    if (percentMatched >= 0.6) {
        feedback.textContent = 'Good answer! Your response covers the key points.';
        feedback.className = 'question-feedback correct show';
        feedback.style.display = 'block'; // Make sure it's visible
        
        // Update score if not already completed
        if (!document.getElementById(questionId).classList.contains('completed')) {
            document.getElementById(questionId).classList.add('completed');
            if (typeof updateScore === 'function') {
                updateScore(5);
            }
        }
    } else {
        feedback.textContent = 'Your answer may be missing some important points. Try again or check the suggested answer.';
        feedback.className = 'question-feedback incorrect show';
        feedback.style.display = 'block'; // Make sure it's visible
    }
}

// Save essay function
function saveEssay(questionId) {
    const textarea = document.querySelector(`textarea[data-question-id="${questionId}"]`);
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    if (!textarea || !feedback) return;
    
    const userAnswer = textarea.value.trim();
    
    if (userAnswer.length < 50) {
        feedback.textContent = 'Please write a more detailed essay (at least 50 characters).';
        feedback.className = 'question-feedback warning show';
        feedback.style.display = 'block'; // Make sure it's visible
        return;
    }
    
    feedback.textContent = 'Your essay has been saved!';
    feedback.className = 'question-feedback correct show';
    feedback.style.display = 'block'; // Make sure it's visible
    
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
    feedback.className = 'question-feedback show';
    feedback.style.display = 'block';
    feedback.style.padding = '15px';
    feedback.style.margin = '15px 0';
    feedback.style.backgroundColor = '#f5f5f5';
    feedback.style.border = '1px solid #ddd';
    feedback.style.borderRadius = '5px';
    feedback.style.color = '#333';
}

// Function to update the score (called from main.js)
function updateScore(points) {
    if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
        score += points;
        document.getElementById('totalScore').textContent = score;
    }
}
