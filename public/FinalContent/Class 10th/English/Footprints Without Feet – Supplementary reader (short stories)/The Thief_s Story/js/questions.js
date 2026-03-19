/**
 * Questions for The Thief's Story interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Who does 'I' refer to in this story?",
                answer: "A young thief who introduces himself as Hari Singh (although this is not his real name)."
            },
            {
                id: "sq2",
                type: "short",
                text: "What is he 'a fairly successful hand' at?",
                answer: "He is fairly successful at stealing/thieving."
            },
            {
                id: "sq3",
                type: "short",
                text: "What does he get from Anil in return for his work?",
                answer: "Food, shelter on the balcony, and education (learning to write his name, sentences, and add numbers)."
            },
            {
                id: "sq4",
                type: "short",
                text: "How did the boy first meet Anil?",
                answer: "The boy met Anil at a wrestling match and approached him with flattery to gain his confidence."
            },
            {
                id: "sq5",
                type: "short",
                text: "What work did the boy do for Anil?",
                answer: "He cooked (after being taught by Anil) and did the shopping for supplies."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"I took a new name every month. That kept me ahead of the police and my former employers.\"<br>(i) Who is 'I' in these lines?<br>(ii) Why did he change his name frequently?<br>(iii) What does this tell us about his character?",
                answer: "(i) The young thief/narrator<br>(ii) To avoid being caught by the police and former employers he had stolen from<br>(iii) He is experienced in deception, cautious, and has been stealing for some time"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"And that is why it was so difficult to rob him. It's easy to rob a greedy man, because he can afford to be robbed; but it's difficult to rob a careless man — sometimes he doesn't even notice he's been robbed and that takes all the pleasure out of the work.\"<br>(i) Who was difficult to rob and why?<br>(ii) Why does the thief say it's easy to rob a greedy man?<br>(iii) Why does the thief find pleasure in his work?",
                answer: "(i) Anil was difficult to rob because he was so trusting of the narrator<br>(ii) Because greedy men have fear of losing their money, which gives the thief satisfaction<br>(iii) He enjoys seeing the reaction of his victims when they discover the theft"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How does the thief think different kinds of people react when they have been robbed?",
                answer: "According to the thief, greedy men show fear when robbed, rich men show anger, and poor men show acceptance. He thinks Anil would only show sadness, not for the loss of money but for the loss of trust."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "Why did the thief return the stolen money?",
                answer: "He realized the value of education that Anil was providing him. He thought learning to read and write could bring him more than the 600 rupees he stole. He also felt bad about betraying Anil's trust."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Why did Anil not hand the thief over to the police?",
                answer: "Anil knew the boy had returned the money and had learned a moral lesson. He valued the boy's change of heart and wanted to give him another chance. He chose to continue teaching him instead of punishing him."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How does the thief know that Anil was aware of the theft and the return of the money?",
                answer: "The fifty-rupee note that Anil gave him in the morning was still wet from the rain, indicating that Anil knew the money had been taken outside in the rain and then returned."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What are Hari Singh's reactions to the prospect of receiving an education? Do they change over time?",
                answer: "Initially, Hari sees education as a means to advance his criminal career - 'I knew that once I could write like an educated man there would be no limit to what I could achieve.' Later, his perspective shifts when he realizes education could be more valuable than the stolen money - 'Whole sentences, I knew, could one day bring me more than a few hundred rupees.' This shows his gradual understanding that education could help him become 'a really big man, a clever and respected man' rather than just a more efficient thief."
            },
            {
                id: "eq2",
                type: "essay",
                text: "Do you think people like Anil and Hari Singh are found only in fiction, or are there such people in real life?",
                answer: "People like Anil who show exceptional trust, forgiveness, and a desire to help others certainly exist in real life. Similarly, people like Hari Singh who make poor choices but have the capacity to change when shown kindness also exist. The story depicts realistic human behavior - someone recognizing the greater value in honest opportunity over dishonest gain. While fiction may dramatize these qualities, they reflect real human traits seen in mentors, teachers, and reformed individuals."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Do you think it a significant detail in the story that Anil is a struggling writer? Does this explain his behavior in any way?",
                answer: "Anil being a struggling writer is significant. Despite limited resources ('he made money by fits and starts'), he values education and shares what he has. Writers typically value knowledge and human potential, explaining why he teaches the boy. His irregular income explains his simple lifestyle yet generosity with what he has. His creative profession suggests an understanding of human nature and second chances, making him more likely to forgive the thief and recognize his potential for change."
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
        title = 'The Thief\'s Story - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn) => {
        const isActive = btn.textContent.includes('Story Questions');
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
