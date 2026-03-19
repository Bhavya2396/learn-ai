/**
 * Questions for A Question of Trust interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How old was Horace Danby?",
                answer: "Horace Danby was about fifty years old."
            },
            {
                id: "sq2",
                type: "short",
                text: "What did Horace Danby like to collect?",
                answer: "Horace Danby liked to collect rare, expensive books."
            },
            {
                id: "sq3",
                type: "short",
                text: "Why did he steal every year?",
                answer: "He stole every year to get enough money to buy the rare books he loved."
            },
            {
                id: "sq4",
                type: "short",
                text: "What medical condition did Horace suffer from?",
                answer: "Horace suffered from hay fever."
            },
            {
                id: "sq5",
                type: "short",
                text: "Who was Sherry?",
                answer: "Sherry was the small dog in the kitchen at Shotover Grange."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"I'm not a man who threatens society.\"<br>(i) Who says these words?<br>(ii) What does he mean?<br>(iii) Is the statement true or false?",
                answer: "(i) Horace Danby<br>(ii) He means that he only steals from the wealthy and doesn't harm others<br>(iii) False, because stealing is a crime that threatens society regardless of who the victim is"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"I have always liked the wrong kind of people.\"<br>(i) Who says these words?<br>(ii) Who is she talking to?<br>(iii) What does she mean?",
                answer: "(i) The young woman dressed in red (the thief posing as the lady of the house)<br>(ii) Horace Danby<br>(iii) She is pretending to sympathize with criminals to gain Horace's trust"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How did Horace Danby plan his robberies?",
                answer: "Horace planned his robberies meticulously. He studied the house for two weeks, examining its rooms, electric wiring, paths and garden. He made sure the owners were away and the servants were out. He wore gloves to avoid leaving fingerprints and cut the burglar alarm wire."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "Who is speaking to Horace Danby when he is caught in the act of robbery?",
                answer: "The person speaking to Horace is a young, pretty woman dressed in red who pretends to be the lady of the house. She is actually another thief who tricks Horace into opening the safe for her and stealing the jewels."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Who is the real culprit in the story?",
                answer: "The real culprit is the young woman dressed in red who pretends to be the wife of the owner of the house. She tricks Horace into opening the safe for her so that she can steal the jewels without leaving her own fingerprints."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How does Horace's hay fever cause his downfall?",
                answer: "Horace's hay fever caused him to sneeze because of the flowers in the room. This alerted the young woman to his presence. Later, when she asked if it was a cold or hay fever, he automatically replied 'hay fever' before thinking, which began their conversation. Most importantly, when he took off his gloves to give her his lighter, he left his fingerprints on the safe, which led to his arrest."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "\"Horace Danby was good and respectable — but not completely honest\". Why do you think this description is apt for Horace? Why can't he be categorized as a typical thief?",
                answer: "This description is apt because Horace lived a respectable life as a successful businessman who made locks and had employees. He appeared honest to everyone who knew him. However, he had a secret criminal side where he committed one burglary each year. Unlike typical thieves, Horace didn't steal out of desperation or greed but for his passion for rare books. He was selective about his targets (only wealthy people), careful in his planning, and limited his criminal activity to just once a year. His motives were more about pursuing his passion than enriching himself."
            },
            {
                id: "eq2",
                type: "essay",
                text: "Do you think Horace Danby was unfairly punished, or that he deserved what he got?",
                answer: "This is a question of moral judgment. On one hand, Horace was indeed committing crimes (burglary) regardless of his motives, so legally he deserved punishment. On the other hand, there's irony in that he was arrested for a crime he didn't technically commit (stealing the jewels himself) - he was tricked into helping another thief. The fact that he was caught through deception by another criminal creates a sense of unfairness. However, had he not been breaking into the house in the first place, he wouldn't have been vulnerable to this trick."
            },
            {
                id: "eq3",
                type: "essay",
                text: "What do you think the phrase 'honour among thieves' means in the context of this story?",
                answer: "The phrase 'honour among thieves' suggests that even criminals have a code of conduct and won't betray each other. In this story, this concept is directly challenged, as one thief (the young woman) betrays another thief (Horace) for her own gain. She shows no loyalty or honor toward a fellow criminal, leaving him to take the blame while she escapes with the jewels. The story's ending, where Horace gets angry when anyone mentions 'honour among thieves,' shows he has learned through bitter experience that this concept is often a myth."
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
    let questions = storyQuestions;
    let title = 'A Question of Trust - Comprehension Questions';
    
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
    const correctKeywords = correctAnswer.toLowerCase().split(/\\s+/);
    const significantKeywords = correctKeywords.filter(word => 
        word.length > 4 && 
        !['about', 'above', 'after', 'again', 'along', 'around', 'because', 'before', 'below', 'between', 'could', 'every', 'first', 'found', 'their', 'there', 'these', 'thing', 'think', 'those', 'through', 'under', 'where', 'which', 'while', 'would'].includes(word)
    );
    
    const userKeywords = userAnswer.toLowerCase().split(/\\s+/);
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
