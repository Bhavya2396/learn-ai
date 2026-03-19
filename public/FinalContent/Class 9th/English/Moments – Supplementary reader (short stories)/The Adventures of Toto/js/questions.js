/**
 * Questions for The Adventures of Toto interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How does Toto come to grandfather's private zoo?",
                answer: "Grandfather bought Toto from a tonga-driver for the sum of five rupees."
            },
            {
                id: "sq2",
                type: "short",
                text: "What did the tonga-driver do with Toto?",
                answer: "The tonga-driver used to keep the little red monkey tied to a feeding-trough."
            },
            {
                id: "sq3",
                type: "short",
                text: "How did Toto's tail serve as a third hand?",
                answer: "He could use it to hang from a branch and to scoop up any delicacy that might be out of reach of his hands."
            },
            {
                id: "sq4",
                type: "short",
                text: "Why was Toto's presence kept a secret from Grandmother?",
                answer: "Grandmother always fussed when Grandfather brought home some new bird or animal. They wanted to tell her when she was in a particularly good mood."
            },
            {
                id: "sq5",
                type: "short",
                text: "What happened to the closet where Toto was kept?",
                answer: "The walls were stripped of ornamental paper, the peg was wrenched from its socket, and the school blazer was torn to shreds."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"He's clever,\" said Grandfather. \"Given time, I'm sure he could have tied the torn pieces of your blazer into a rope, and made his escape from the window!\"<br>(i) Who is 'he' referring to?<br>(ii) Why does Grandfather think 'he' is clever?<br>(iii) What does this tell us about Grandfather's attitude towards Toto?",
                answer: "(i) Toto the monkey<br>(ii) Because Toto had managed to wrench the peg from the wall and tear the blazer to shreds<br>(iii) Grandfather admires Toto's intelligence and mischief, seeming pleased rather than upset by his destructive behavior"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"Sir, you have a dog with you. You'll have to pay for it accordingly.\"<br>(i) Who says these words and to whom?<br>(ii) What was the 'dog' actually?<br>(iii) What was the outcome of this situation?",
                answer: "(i) The ticket-collector to Grandfather<br>(ii) The 'dog' was actually Toto the monkey<br>(iii) Grandfather had to pay three rupees as fare for Toto after unsuccessfully trying to prove that a monkey wasn't a dog or quadruped"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "In what sense is Toto pretty? Give a physical description of Toto.",
                answer: "Toto was pretty with bright eyes that sparkled with mischief beneath deep-set eyebrows, pearly white teeth, and a tail that added to his good looks. However, his hands looked dried-up as though they had been pickled in the sun for many years, though his fingers were quick and wicked."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "Why does the ticket-collector insist on calling Toto a dog?",
                answer: "The ticket-collector likely classified Toto as a dog to collect the pet fare. Despite Grandfather's protests that a monkey isn't a dog or even a quadruped, the ticket-collector maintained his classification to charge three rupees for Toto's fare."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "How does Toto take a bath? Where has he learned to do this?",
                answer: "Toto would test the water temperature with his hand, then gradually step into the bath, first one foot, then the other, until he was in the water up to his neck. Then he would take soap and rub himself all over. When the water got cold, he would run to the kitchen fire to dry himself. He learned this behavior by watching the narrator."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How does Toto almost boil himself alive?",
                answer: "Toto found a large kitchen kettle on the fire that was heating for tea. He removed the lid and got in when the water was just warm. As the water began to boil, Toto would raise himself up when it got too hot, but finding it cold outside, he would sit back down. He continued hopping up and down until Grandmother found him and hauled him out, half-boiled."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What evidence is there to show that Toto was highly mischievous?",
                answer: "Toto shows mischief through tearing wallpaper, destroying the blazer, disturbing other animals at night, trying to tear aunts' dresses, stealing the pullao, throwing plates and glasses, and deliberately breaking the dish to spite Grandmother. The author even mentions that if there is a part of the brain devoted to mischief, it was largely developed in Toto."
            },
            {
                id: "eq2",
                type: "essay",
                text: "Why does the author say, \"Toto was not the sort of pet we could keep for long\"?",
                answer: "Toto couldn't be kept because he was destructive and costly. He tore clothes, curtains, and wallpaper. He stole food and broke dishes. The family was not well-to-do and couldn't afford the constant damage and losses. His mischievous nature made him unsuitable as a pet despite Grandfather's fondness for him."
            },
            {
                id: "eq3",
                type: "essay",
                text: "How does Toto's character and behavior tell us something about wild animals as pets?",
                answer: "Toto's story shows that wild animals often retain their natural instincts and behaviors when kept as pets. They may be intelligent and entertaining but can be destructive, difficult to control, and expensive to maintain. They may not adapt well to domestic life or get along with other animals. The story suggests that wild animals like monkeys are best left in their natural habitats rather than kept as pets."
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
        title = 'The Adventures of Toto - Comprehension Questions';
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
