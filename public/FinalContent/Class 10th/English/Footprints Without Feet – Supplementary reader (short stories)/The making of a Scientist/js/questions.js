/**
 * Questions for The Making of a Scientist interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How old was Richard Ebright when he published his first article in a scientific journal?",
                answer: "He was twenty-two years old."
            },
            {
                id: "sq2",
                type: "short",
                text: "What was Richard Ebright's initial hobby?",
                answer: "Collecting butterflies, rocks, fossils, and coins. He was also an eager astronomer."
            },
            {
                id: "sq3",
                type: "short",
                text: "Which book opened the world of science to Richard Ebright?",
                answer: "The Travels of Monarch X, which was about monarch butterfly migration."
            },
            {
                id: "sq4",
                type: "short",
                text: "How did Richard Ebright help Dr. Urquhart in his research on monarch butterflies?",
                answer: "He tagged butterflies with light adhesive tags and raised butterflies through their life cycle in his basement."
            },
            {
                id: "sq5",
                type: "short",
                text: "Why did Richard Ebright lose in his first science fair competition?",
                answer: "Because he only made slides of frog tissues instead of doing a real experiment."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"I wouldn't play football or baseball with a team of one.\"<br>(i) Who says these words?<br>(ii) What does 'team of one' mean?<br>(iii) What could the speaker do instead?",
                answer: "(i) Richard Ebright<br>(ii) He was an only child and had no one else to play team sports with<br>(iii) He could collect things like butterflies, rocks, fossils, and coins"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"But then my mother got me a children's book called The Travels of Monarch X.\"<br>(i) Why did the speaker need the book?<br>(ii) What did he learn from the book?<br>(iii) What impact did the book have on him?",
                answer: "(i) Because he had already collected all butterfly species in his hometown and might have stopped collecting<br>(ii) He learned about monarch butterfly migration to Central America<br>(iii) It opened the world of science to him, which eventually led to his scientific career"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How did Richard Ebright's mother encourage his interest in learning?",
                answer: "His mother took him on trips, bought him equipment like telescopes and microscopes, brought friends home for him, and spent evenings with him at the dining room table. She found learning activities for him when he had nothing to do and encouraged his curiosity."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "What important lesson did Richard Ebright learn when he did not win anything at a science fair?",
                answer: "He learned that to win, he needed to do a real experiment rather than just making a neat display. He realized that he needed to move beyond simple demonstrations to actual scientific inquiry and experimentation."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Describe Richard Ebright's experiment with the monarch butterfly spots and its significance.",
                answer: "Ebright investigated the purpose of twelve tiny gold spots on the monarch pupa. He built a device showing these spots produced a hormone necessary for the butterfly's full development. Later, he grew cells from a monarch's wing and showed they would only develop into normal wing scales when fed the hormone from gold spots. This led to his discovery of an unknown insect hormone and ultimately to his theory about cell life."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What were Richard Ebright's other interests besides science?",
                answer: "Besides science, Richard Ebright was a champion debater and public speaker. He was involved in the Debating and Model United Nations clubs. He was also a good canoeist, an outdoors-person, and an expert photographer of nature and scientific exhibits."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What are the qualities that go into the making of a scientist, according to the story? How did Richard Ebright demonstrate these qualities?",
                answer: "The qualities that make a scientist are: a first-rate mind, curiosity, determination, competitiveness for the right reasons (not just winning but doing the best job), and willingness to learn. Ebright demonstrated these through his butterfly collection, science fair projects, research on monarch butterflies, dedication to learning, and his scientific discovery about cell life. He was driven by the desire to do his best rather than just winning."
            },
            {
                id: "eq2",
                type: "essay",
                text: "How did Richard Ebright's project on monarch butterflies evolve from a childhood hobby to serious scientific research?",
                answer: "Ebright's project evolved from simple butterfly collecting to tagging monarchs for migration research, then to raising them in his basement. After losing at his first science fair, he began conducting actual experiments, such as studying the disease affecting monarch caterpillars and testing if birds would eat monarchs. His research progressed to discovering the purpose of gold spots on monarch pupae, identifying the hormone they produced, and eventually to his theory about cell life and DNA. Each step built on his previous knowledge and became increasingly sophisticated scientifically."
            },
            {
                id: "eq3",
                type: "essay",
                text: "\"Start with a first-rate mind, add curiosity, and mix in the will to win for the right reasons.\" Discuss how this statement explains the making of a scientist.",
                answer: "A first-rate mind provides the intellectual capacity to understand complex concepts and solve problems. Curiosity drives the scientist to ask questions, investigate phenomena, and seek answers. The will to win for the right reasons (doing one's best rather than just seeking recognition) provides the motivation and determination to persevere through challenges, setbacks, and tedious work. These qualities together enable scientists to make discoveries, advance knowledge, and contribute to human understanding of the world. The combination creates both the ability and the drive necessary for scientific achievement."
            }
        ]
    },
    {
        section: "Think About It",
        questions: [
            {
                id: "tq1",
                type: "essay",
                text: "How can one become a scientist, an economist, a historian...? Does it simply involve reading many books on the subject? Does it involve observing, thinking and doing experiments?",
                answer: "Becoming a professional in any field requires more than just reading books. It involves active engagement through observation, critical thinking, practical application, and experimentation. It requires developing specific skills and methods relevant to the field. While reading provides knowledge, true mastery comes from applying that knowledge, testing ideas, learning from mentors, collaborating with others, and developing original insights through practice and experience."
            },
            {
                id: "tq2",
                type: "essay",
                text: "You must have read about cells and DNA in your science books. Discuss Richard Ebright's work in the light of what you have studied. If you get an opportunity to work like Richard Ebright on projects and experiments, which field would you like to work on and why?",
                answer: "Richard Ebright's work focused on understanding how cells can \"read\" the blueprint of DNA. This relates to the fundamental process of gene expression - how the information in DNA is used to create proteins that determine cell function. His research on insect hormones led him to insights about cellular processes that are universal in living organisms. For your own interests, consider which scientific questions fascinate you most - from environmental issues to disease treatment to technological innovation - and explain why that particular field captures your interest and how you might contribute to it."
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
        title = 'The Making of a Scientist - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn) => {
        const isActive = (setId === 'story-questions');
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
