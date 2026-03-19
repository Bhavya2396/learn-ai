/**
 * Questions for Madam Rides the Bus interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How old was Valli?",
                answer: "Valli was eight years old."
            },
            {
                id: "sq2",
                type: "short",
                text: "What was Valli's favorite pastime?",
                answer: "Standing in the front doorway of her house, watching what was happening in the street outside."
            },
            {
                id: "sq3",
                type: "short",
                text: "What was the source of unending joy for Valli?",
                answer: "The bus that traveled between her village and the nearest town, filled each time with a new set of passengers."
            },
            {
                id: "sq4",
                type: "short",
                text: "How much money did Valli save for her bus journey?",
                answer: "Valli saved a total of sixty paise."
            },
            {
                id: "sq5",
                type: "short",
                text: "Why didn't Valli get off the bus at the town?",
                answer: "She was afraid to explore the town all by herself."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"Stop the bus! Stop the bus!\" And a tiny hand was raised commandingly.<br>(i) Whose hand was raised?<br>(ii) Why was the command given?<br>(iii) What does 'commandingly' tell us about the character?",
                answer: "(i) Valli's hand<br>(ii) To make the bus stop so she could board it<br>(iii) It shows her determination and confidence despite being a small eight-year-old girl"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"There's nobody here who's a child,\" she said haughtily. \"I've paid my thirty paise like everyone else.\"<br>(i) Who is the speaker?<br>(ii) When were these words spoken?<br>(iii) What do these words tell us about the speaker?",
                answer: "(i) Valli<br>(ii) When an elderly man called her a child and asked her to sit down<br>(iii) She is proud, independent, and wants to be treated like an adult"
            }
        ]
    },
    {
        section: "Character and Theme Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "What kind of a person is Valli? Describe her character based on the story.",
                answer: "Valli is determined, independent, self-respecting, curious, observant, mature for her age, responsible with money, careful, clever, and resourceful. She plans her journey meticulously and handles herself with dignity despite being just eight years old."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "How did Valli plan her bus journey? What details did she gather about the bus?",
                answer: "Valli gathered details by listening to conversations and asking discreet questions. She learned that the town was six miles away, the fare was thirty paise one way, the journey took 45 minutes, and she could return on the same bus by paying another thirty paise."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Why does Valli refuse to look out of the window on her way back?",
                answer: "Valli refuses to look out because she had seen the dead cow by the roadside - the same cow she had laughed at earlier when it was running in front of the bus. This disturbing sight of death dampened her enthusiasm and affected her deeply."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What does Valli mean when she says, \"I was just agreeing with what you said about things happening without our knowledge\"?",
                answer: "Valli is referring to her secret bus journey that happened without her mother's knowledge. The statement is ironic because while her mother speaks generally about things happening without people's awareness, she has no idea that her own daughter had just taken a bus journey all by herself."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What is the theme of the story 'Madam Rides the Bus'? How does the author explore the theme through Valli's experience?",
                answer: "The story explores the themes of childhood curiosity, growing up, independence, and the first encounter with mortality. Through Valli's bus journey, the author shows her transition from innocence to a more mature understanding of the world. The dead cow incident marks her initiation into the reality of death, showing the gap between knowing that death exists and truly understanding it."
            },
            {
                id: "eq2",
                type: "essay",
                text: "How does the author describe the things that Valli sees from an eight-year-old's point of view? Provide examples from the text.",
                answer: "The author captures Valli's childlike wonder and perspective throughout the story. Examples: her fascination with the bus, her description of scenery with repetitions ('green, green, green'), her joyful reaction to the cow running in front of the bus, her repulsion towards the old woman with betel nut, and her shift from laughter to sadness upon seeing the dead cow."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Compare and contrast your childhood experiences with Valli's. What similarities and differences do you notice?",
                answer: "Consider: independence levels in different times and cultures, modes of entertainment, safety concerns, financial awareness, planning abilities, and encounters with difficult realities. Discuss how Valli's world without modern technology differs from contemporary childhood experiences."
            }
        ]
    }
];

// Poem questions data
const poemQuestions = [
    {
        section: "Understanding the Poem",
        questions: [
            {
                id: "pq1",
                type: "short",
                text: "Who are the characters in the poem 'The Tale of Custard the Dragon'?",
                answer: "Belinda, Ink the black kitten, Blink the grey mouse, Mustard the yellow dog, and Custard the dragon."
            },
            {
                id: "pq2",
                type: "short",
                text: "Why is the dragon called 'cowardly'?",
                answer: "Because unlike the others who appear brave, Custard cries for a nice safe cage."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What is the contrast between Custard's appearance and his behavior?",
                answer: "Despite having big sharp teeth, spikes, scales, a mouth like a fireplace, and daggers on his toes - all fierce features - Custard behaves cowardly by crying for a safe cage while the smaller pets act brave."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What is the tone of the poem? Is it serious or light-hearted?",
                answer: "The poem has a light-hearted, humorous tone with playful language like 'realio, trulio' and the contrast between Custard's fierce appearance and cowardly behavior. The poem seems to be a fun children's ballad rather than a serious poem."
            }
        ]
    },
    {
        section: "Poetic Devices",
        questions: [
            {
                id: "dq1",
                type: "paragraph",
                text: "What poetic devices can you identify in the poem?",
                answer: "The poem contains rhyming couplets (house/mouse, wagon/dragon), similes ('brave as a barrel full of bears', 'brave as a tiger in a rage'), alliteration ('big black', 'little yellow'), repetition ('little', 'realio, trulio'), and playful made-up words ('realio, trulio')."
            },
            {
                id: "dq2",
                type: "paragraph",
                text: "How does the poem use humor? Give examples.",
                answer: "The poem uses humor through the contrast between appearance and behavior (fierce dragon being cowardly), the playful made-up words, the exaggerated descriptions of bravery, and the ironic situation of the smallest creatures claiming to be the bravest."
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
    const poemQuestionsBtn = document.querySelector('.story-nav-btn[onclick="showQuestionSet(\'poem-questions\')"]');
    
    if (storyQuestionsBtn && poemQuestionsBtn) {
        storyQuestionsBtn.addEventListener('click', () => showQuestionSet('story-questions'));
        poemQuestionsBtn.addEventListener('click', () => showQuestionSet('poem-questions'));
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
        title = 'Madam Rides the Bus - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'The Tale of Custard the Dragon - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        const isActive = (index === 0 && setId === 'story-questions') || 
                        (index === 1 && setId === 'poem-questions');
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
