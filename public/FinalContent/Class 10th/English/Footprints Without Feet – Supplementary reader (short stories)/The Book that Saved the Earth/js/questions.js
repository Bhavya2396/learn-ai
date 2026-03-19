/**
 * Questions for The Book That Saved the Earth interactive lesson
 */

// Play questions data
const playQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Why was the twentieth century called the 'Era of the Book'?",
                answer: "Because in those days, there were books about everything, from ant eaters to Zulus. Books taught people how to, and when to, and where to, and why to. They illustrated, educated, punctuated, and even decorated."
            },
            {
                id: "sq2",
                type: "short",
                text: "Who tried to invade the earth in the twenty-first century?",
                answer: "The Martians, led by Great and Mighty Think-Tank, tried to invade Earth in 2040."
            },
            {
                id: "sq3",
                type: "short",
                text: "What did the Martians think books were at first?",
                answer: "The Martians first thought books were sandwiches - food items that Earthlings ate."
            },
            {
                id: "sq4",
                type: "short",
                text: "What was the name of the book that saved the Earth?",
                answer: "Mother Goose - a book of nursery rhymes."
            },
            {
                id: "sq5",
                type: "short",
                text: "What did Think-Tank think the nursery rhymes were?",
                answer: "Think-Tank thought the nursery rhymes were military intelligence and secret codes about Earth's advanced technology and weapons."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"The strangest thing a book ever did was to save the Earth.\"<br>(i) Who says these words?<br>(ii) What does 'strangest' mean here?<br>(iii) What book saved the Earth?",
                answer: "(i) The Historian<br>(ii) Most unusual or unexpected<br>(iii) Mother Goose - a book of nursery rhymes"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"These are actually communication sandwiches.\"<br>(i) Who says these words?<br>(ii) What are 'these' referring to?<br>(iii) What does the speaker think they are used for?",
                answer: "(i) Think-Tank<br>(ii) Books<br>(iii) Communication between Earthlings"
            },
            {
                id: "rq3",
                type: "reference",
                text: "\"It's me! It's my Great and Mighty Balloon Brain.\"<br>(i) Who says these words?<br>(ii) What is 'it' referring to?<br>(iii) Why is the speaker alarmed?",
                answer: "(i) Think-Tank<br>(ii) Humpty Dumpty in the nursery rhyme<br>(iii) He thinks the Earthlings have seen him and are planning to capture him"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How did the Martians misinterpret the nursery rhyme 'Mistress Mary, quite contrary'?",
                answer: "Think-Tank thought it was about Earthlings discovering how to combine agriculture and mining. He believed they could grow crops of rare metals like silver and high explosives like cockle shells."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "What did Think-Tank think 'Hey diddle diddle' meant?",
                answer: "He thought it showed that Earthlings had reached a high level of civilization by teaching their domesticated animals musical culture and space techniques. He feared they might launch an interplanetary attack using millions of cows."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Why did Think-Tank decide to flee to Alpha Centauri?",
                answer: "When he saw the Humpty Dumpty nursery rhyme, he thought it was a picture of himself and that the Earthlings were planning to capture Mars Central Control. He interpreted 'had a great fall' as a threat to his position."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How did Noodle help Think-Tank throughout the play?",
                answer: "Noodle corrected Think-Tank's mistakes in a respectful way, suggesting that books were communication devices rather than food, and that Earthlings opened and watched them rather than listened to them. He was always polite and deferential while providing helpful information."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What are the main themes of the play 'The Book That Saved the Earth'?",
                answer: "The main themes include: the power of literature and books, the danger of misunderstanding and misinterpretation, the importance of communication, the absurdity of prejudice and assumptions, and how fear can lead to irrational decisions. The play also explores the idea that something as innocent as nursery rhymes can be misunderstood as threatening."
            },
            {
                id: "eq2",
                type: "essay",
                text: "How does the play use humor to convey its message?",
                answer: "The play uses humor through the Martians' complete misunderstanding of everyday objects and literature. Their interpretation of books as sandwiches, nursery rhymes as military intelligence, and their over-the-top reactions create comedy. The humor makes the serious message about misunderstanding and prejudice more accessible and memorable."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Do you think the play's message about books and literature is still relevant today? Why or why not?",
                answer: "Consider: the importance of reading and literacy, how books can change perspectives, the danger of misinterpreting information, the power of literature to influence people, and how technology has changed how we access and understand information."
            },
            {
                id: "eq4",
                type: "essay",
                text: "If you were to write a modern version of this play, what contemporary items or technology might be misunderstood by aliens?",
                answer: "Consider modern technology like smartphones, social media, video games, streaming services, or everyday items like credit cards, GPS devices, or even simple things like emojis or memes. Think about how these could be misinterpreted by someone from another culture or planet."
            }
        ]
    },
    {
        section: "Think About It",
        questions: [
            {
                id: "ta1",
                type: "essay",
                text: "Noodle avoids offending Think-Tank but at the same time he corrects his mistakes. How does he manage to do that?",
                answer: "Noodle is very respectful and deferential in his language, always addressing Think-Tank with proper titles and saying things like 'I beg your pardon' or 'Forgive me.' He presents his corrections as 'insignificant bits of data' or 'cloudy pieces of information' rather than direct contradictions. This allows him to correct Think-Tank without challenging his authority."
            },
            {
                id: "ta2",
                type: "essay",
                text: "If you were in Noodle's place, how would you handle Think-Tank's mistakes?",
                answer: "Consider different approaches: being direct and honest, using humor, finding diplomatic ways to suggest alternatives, or deciding when to speak up versus when to stay silent. Think about the consequences of each approach."
            },
            {
                id: "ta3",
                type: "essay",
                text: "Do you think books are being replaced by the electronic media? Can we do away with books altogether?",
                answer: "Consider the advantages and disadvantages of both formats: accessibility, portability, cost, environmental impact, reading experience, eye strain, battery life, and the tactile experience of holding a book versus using a device."
            },
            {
                id: "ta4",
                type: "essay",
                text: "Why are books referred to as a man's best companion? Which is your favourite book and why? Write a paragraph about that book.",
                answer: "Books are called man's best companion because they provide knowledge, entertainment, comfort, and can be relied upon in any situation. They don't judge, they're always available, and they can transport us to different worlds and times. Share your favorite book and explain why it's special to you."
            }
        ]
    }
];

// Load questions when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize question set visibility
    showQuestionSet('play-questions');
    
    // Add event listeners to question set buttons if they exist
    const playQuestionsBtn = document.querySelector('.story-nav-btn[onclick="showQuestionSet(\'play-questions\')"]');
    
    if (playQuestionsBtn) {
        playQuestionsBtn.addEventListener('click', () => showQuestionSet('play-questions'));
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
    
    if (setId === 'play-questions') {
        questions = playQuestions;
        title = 'The Book That Saved the Earth - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        const isActive = (index === 0 && setId === 'play-questions');
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
