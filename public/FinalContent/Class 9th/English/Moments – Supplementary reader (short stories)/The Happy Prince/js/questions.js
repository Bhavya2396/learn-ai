/**
 * Questions for The Happy Prince interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Why do the courtiers call the prince 'the Happy Prince'?",
                answer: "The courtiers called him the Happy Prince because when he was alive, he lived in a palace where sorrow was not allowed to enter, and he was always happy."
            },
            {
                id: "sq2",
                type: "short",
                text: "What materials is the statue of the Happy Prince made of?",
                answer: "The statue is covered with thin leaves of fine gold, has sapphires for eyes, and a large red ruby on his sword hilt."
            },
            {
                id: "sq3",
                type: "short",
                text: "Why is the Happy Prince crying?",
                answer: "He is crying because from his high position, he can now see all the suffering and misery in the city that he never saw when he was alive."
            },
            {
                id: "sq4",
                type: "short",
                text: "Where was the swallow planning to go before meeting the Prince?",
                answer: "The swallow was planning to fly to Egypt to join his friends."
            },
            {
                id: "sq5",
                type: "short",
                text: "What does the Mayor decide to do with the statue at the end of the story?",
                answer: "The Mayor decides to pull down the statue because it is no longer beautiful or useful."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"I am covered with fine gold,\" said the Prince. \"You must take it off, leaf by leaf, and give it to the poor; the living always think that gold can make them happy.\"<br>(i) Who is the Prince speaking to?<br>(ii) What does the Prince want done with the gold?<br>(iii) What does this reveal about the Prince's character?",
                answer: "(i) The swallow<br>(ii) He wants the swallow to remove the gold leaf by leaf and give it to the poor people in the city<br>(iii) It reveals the Prince's compassion, selflessness, and understanding that material wealth isn't the source of true happiness"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"As he is no longer beautiful he is no longer useful,\" said the Art Professor at the University.<br>(i) Who is being referred to here?<br>(ii) What has happened to make him 'no longer beautiful'?<br>(iii) What is the irony in this statement?",
                answer: "(i) The statue of the Happy Prince<br>(ii) His gold leaf has been stripped away, his ruby is gone, and his sapphire eyes have been plucked out<br>(iii) The irony is that the statue became most useful and truly beautiful (in spirit) precisely when it gave away its external beauty to help others"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "Why does the Happy Prince send a ruby for the seamstress? What does the swallow do in the seamstress' house?",
                answer: "The Prince sends the ruby to help the poor seamstress whose son is ill with fever and needs oranges. The seamstress can't afford oranges as she has only river water to give him. The swallow places the ruby beside the woman's thimble, then flies around the boy's bed, fanning his forehead with its wings, which makes the boy feel cooler and helps him sleep."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "For whom does the prince send the sapphires and why?",
                answer: "The Prince sends one sapphire to a young playwright who is trying to finish a play but is too cold and hungry to continue writing. The second sapphire is sent to a little matchgirl who has dropped her matches in the gutter and fears being beaten by her father if she returns home without money."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What does the swallow see when it flies over the city?",
                answer: "The swallow sees stark inequality in the city. The rich are making merry in their beautiful houses, while beggars sit at the gates. In dark lanes, there are starving children with white faces looking listlessly at the black streets. Two little boys are huddled under a bridge trying to keep warm, only to be chased away by a watchman."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "Why did the swallow not leave the prince and go to Egypt?",
                answer: "At first, the swallow delays his journey to help the Prince with his requests, but gradually falls in love with the Prince's noble character and decides to stay with him forever. When winter comes, the swallow grows colder and colder but refuses to leave because he loves the Prince too much. Eventually, the cold kills the swallow."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What are the precious things mentioned in the story? Why are they precious?",
                answer: "The physical precious things include the gold covering, sapphire eyes, and ruby in the sword of the Prince's statue. However, the truly precious things at the end are the leaden heart of the Prince and the dead swallow, which God's Angel brings as 'the two most precious things in the city.' They are precious not because of material value but because they represent true love, compassion, and self-sacrifice—the Prince giving everything he had to help others, and the swallow sacrificing his life out of love for the Prince."
            },
            {
                id: "eq2",
                type: "essay",
                text: "What message does Oscar Wilde convey through the story 'The Happy Prince'?",
                answer: "Wilde conveys several messages: True happiness comes from helping others, not from wealth or luxury. The contrast between the Prince's earlier life in ignorant happiness and his current awareness of suffering highlights how sheltered the wealthy are from reality. The story criticizes societal values that prize outward beauty over inner worth, as shown when the statue is torn down once it loses its gold and gems. Ultimately, the story celebrates sacrifice and compassion as the highest virtues, recognized by God even when society fails to value them."
            },
            {
                id: "eq3",
                type: "essay",
                text: "The little swallow says, 'It is curious, but I feel quite warm now, although it is so cold.' What does this suggest about the relationship between good deeds and happiness?",
                answer: "This statement suggests that performing acts of kindness creates an inner warmth and satisfaction that transcends physical discomfort. Though physically cold, the swallow experiences emotional warmth from helping others. This illustrates how compassion and selflessness can bring a deeper form of happiness than physical comfort or material wealth. The swallow discovers what the Prince has already learned—that true joy comes from making a positive difference in others' lives."
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
        title = 'The Happy Prince - Comprehension Questions';
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
