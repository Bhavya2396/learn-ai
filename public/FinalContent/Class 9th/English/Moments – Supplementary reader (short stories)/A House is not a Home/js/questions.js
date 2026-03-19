/**
 * Questions for A House Is Not a Home interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How did the author feel about his first year of high school?",
                answer: "The author felt awkward and isolated because his closest friends were sent to a different high school, and he had to start over as a freshman."
            },
            {
                id: "sq2",
                type: "short",
                text: "What happened on the Sunday afternoon while the author was doing homework?",
                answer: "Their house caught fire. Smoke began pouring through the ceiling and filled the room quickly, forcing them to run outside."
            },
            {
                id: "sq3",
                type: "short",
                text: "Why did the author's mother run back into the burning house?",
                answer: "She went back to save photos and letters of the author's father who had died when the author was young."
            },
            {
                id: "sq4",
                type: "short",
                text: "What did the author miss most after the fire?",
                answer: "The author missed his cat the most, who had disappeared during the fire."
            },
            {
                id: "sq5",
                type: "short",
                text: "What did the author's classmates do to help?",
                answer: "They collected and bought school supplies, notebooks, and different clothes for the author. They also invited him to their homes and introduced themselves."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"I walked around school like a zombie. Everything felt surreal, and I wasn't sure what was going to happen.\"<br>(i) When did the author feel like this?<br>(ii) What does 'surreal' mean here?<br>(iii) Why did the author feel this way?",
                answer: "(i) The day after the fire when the author went to school<br>(ii) Strange or bizarre<br>(iii) Because his house had burned down, he had lost his cat, and he had to go to school without proper clothes or school supplies"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"While we sat there on the curb, planning my new bedroom, I heard someone walk up to me from behind and say, 'Does this belong to you?'\"<br>(i) Who is the 'we' referred to here?<br>(ii) What did the person behind the author have?<br>(iii) How did the author react?",
                answer: "(i) The author and his two new friends from school<br>(ii) The author's lost cat<br>(iii) The author leapt up, grabbed the cat, held it close and cried into its fur"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "Describe what happened immediately after the fire broke out in the house.",
                answer: "The smoke filled the room quickly, making it hard to see. The family ran out to the front yard. The author ran to neighbors to call the fire department while his mother went back into the house to save important documents. Later, she went in again for photos and letters of the author's father, but firefighters rescued her as she inhaled smoke."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "Why was the author deeply embarrassed the next day in school?",
                answer: "The author was embarrassed because he had to wear borrowed clothes (including tennis shoes from his aunt), had no books or homework, and his backpack was gone. He felt like an outcast and feared he wouldn't fit in at the new school after this disaster."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "How was the cat found after the fire?",
                answer: "The cat had run over a mile away due to fear from the fire. A kind woman found the cat, took it in, and worked hard to find the owner despite the phone number on the collar being disconnected. She eventually brought the cat back to the author about a month after the fire."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How did the fire change the author's life in a positive way?",
                answer: "The fire made the author stop focusing on feelings of insecurity and open up to others. The kindness of classmates who collected clothes and supplies for him helped him make friends and feel part of a community. He realized his life was being rebuilt just like his house."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What does the title 'A House Is Not a Home' mean in relation to this story?",
                answer: "The title suggests that a physical structure (house) is different from the emotional concept of 'home'. Throughout the story, the author loses his actual house but discovers that home is more about connections with people and pets. By the end, even though his physical house is still being rebuilt, he has found a sense of 'home' through his new friends and recovered pet. The title emphasizes that the emotional bonds and sense of belonging are what truly constitute a 'home'."
            },
            {
                id: "eq2",
                type: "essay",
                text: "What do you think the author means by 'My cat was back and so was I'?",
                answer: "When the author says 'My cat was back and so was I,' he means that just as his cat had physically returned, he had emotionally returned from his state of loss and isolation. After the fire, he felt lost, like a 'zombie,' and disconnected from his identity. The return of his cat symbolizes the return of normalcy, connection, and hope in his life. He had found new friends, begun adjusting to his new school, and was starting to rebuild both his physical home and his sense of belonging in the world."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Describe a time when you experienced loss or a major change. How did you cope with it? Did anyone help you like the author's classmates did?",
                answer: "Consider: personal experiences with loss/change, emotional responses, coping mechanisms, support systems, how the experience changed you, lessons learned, and comparisons to the author's experience."
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
        title = 'A House Is Not a Home - Comprehension Questions';
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
