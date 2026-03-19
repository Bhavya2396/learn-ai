/**
 * Questions for The Snake and the Mirror interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How old was the doctor when this incident occurred?",
                answer: "The story doesn't specifically mention his age, but he was a young bachelor who had just started his medical practice."
            },
            {
                id: "sq2",
                type: "short",
                text: "What did the doctor do for a living?",
                answer: "He was a homeopath doctor who had just started his medical practice."
            },
            {
                id: "sq3",
                type: "short",
                text: "How much money did the doctor have?",
                answer: "He had about sixty rupees in his suitcase."
            },
            {
                id: "sq4",
                type: "short",
                text: "Why did the doctor say his wife should be fat?",
                answer: "So that if he made a silly mistake and needed to run away, she wouldn't be able to catch him."
            },
            {
                id: "sq5",
                type: "short",
                text: "What was the sound that the doctor kept hearing from above?",
                answer: "The sound of rats moving across the beam in his room."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"I looked into the mirror and smiled. It was an attractive smile.\"<br>(i) Who is the speaker?<br>(ii) Why did he smile?<br>(iii) What decision did he make after this?",
                answer: "(i) The homeopath doctor is the speaker.<br>(ii) He smiled while admiring himself in the mirror.<br>(iii) He decided to always keep that attractive smile on his face to look more handsome."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"I was turned to stone.\"<br>(i) What made the speaker feel this way?<br>(ii) What does this expression mean?<br>(iii) What other expressions in the text show his fear?",
                answer: "(i) The snake landing on his shoulder and coiling around his arm made him feel this way.<br>(ii) The expression means he was completely frozen with fear and couldn't move.<br>(iii) Other expressions include \"holding my breath\", \"sat like a stone image in the flesh\", and \"Death lurked four inches away\"."
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "Describe the doctor's living conditions.",
                answer: "The doctor lived in a small rented room that wasn't electrified. It had a tiled roof with supporting gables but no ceiling. The room had rats regularly moving across the beam. He had modest possessions including a suitcase with about sixty rupees, some shirts and dhotis, and one black coat. He used a kerosene lamp for light. These conditions reflect his meager earnings as a new doctor."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "How did the snake save the doctor's life?",
                answer: "The snake saved the doctor's life indirectly. When it moved from his arm to the table to look at its reflection in the mirror, it gave the doctor an opportunity to escape. The snake was so fascinated by its own reflection that it didn't chase the doctor or strike him, allowing him to quietly slip away from certain death."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What happened to the doctor's possessions after he ran away?",
                answer: "After the doctor ran away, a thief stole most of his possessions. When he returned the next morning with friends, they found that the room had been cleaned out. The thief had left behind only one thing - the doctor's dirty vest - as a \"final insult.\""
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How does the author inject humor into this dangerous situation?",
                answer: "The author injects humor through the doctor's vanity while facing danger, his dreams about a fat wife, his realization of being a \"poor, foolish, and stupid doctor\" in crisis, the snake's apparent vanity looking in the mirror, the irony of the thief leaving only the dirty vest behind, and the doctor's self-deprecating remarks. The contrast between life-threatening danger and these humorous elements creates a unique narrative tone."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "This story about a frightening incident is narrated in a humorous way. What makes it humorous? Think of the contrasts it presents between dreams and reality.",
                answer: "The humor comes from the contrast between the doctor's vanity and his actual situation, his grand dreams versus modest reality, his planned escape versus actual panic, the snake's apparent vanity matching his own, and the final ironic twist with the thief. The narrator's self-awareness and ability to laugh at himself transforms a terrifying encounter into a humorous tale."
            },
            {
                id: "eq2",
                type: "essay",
                text: "How does the doctor's encounter with the snake change him?",
                answer: "Though not explicitly stated, the encounter likely humbled the doctor. His vanity about appearance was challenged by a life-threatening situation. The contrast between his dreams (wealthy doctor wife) and reality (losing all possessions) serves as a reality check. His ability to laugh at himself later suggests growth and perspective. The comment about his actual wife being thin and fast (opposite of what he wanted) hints that his priorities and judgments changed after this humbling experience."
            },
            {
                id: "eq3",
                type: "essay",
                text: "What details create the setting of the story? How does the setting contribute to the events?",
                answer: "The setting is established through details of the small, non-electrified rented room with a tiled roof, no ceiling, rats, kerosene lamp, mirror, and table. This humble setting reflects the doctor's financial situation and creates the perfect conditions for the events: darkness for the snake to hide, exposed beams for it to travel on, lack of escape routes, and the mirror that ultimately saves him. The isolated room also allows for his vanity to develop unchecked and the thief to operate undisturbed."
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
                text: "Which country or countries do you think 'the Northland' refers to?",
                answer: "The poem likely refers to Nordic countries such as Norway, Sweden, Finland, or perhaps parts of Russia or Canada - northern regions characterized by long winter nights, snowy landscapes, and reindeer."
            },
            {
                id: "pq2",
                type: "short",
                text: "What did Saint Peter ask the old lady for?",
                answer: "Saint Peter asked her for a single cake from her store of cakes."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "How did the old lady behave with Saint Peter?",
                answer: "The old lady behaved selfishly. She made several cakes, but each time she thought they were too large to give away. She kept making smaller cakes but still couldn't part with them, saying even the tiny ones were 'too large to give away.' She put all the cakes on the shelf and gave nothing to Saint Peter despite his hunger."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How did Saint Peter punish the old lady for being selfish?",
                answer: "Saint Peter punished the old lady by transforming her into a woodpecker. He said she was too selfish to live in human form and deserving of shelter and food. He decreed that she would have to build her home like birds do and obtain her food by 'boring and boring' into hard, dry wood."
            },
            {
                id: "pq5",
                type: "paragraph",
                text: "How does the woodpecker get her food now?",
                answer: "The woodpecker gets her food by boring and boring into hard, dry wood all day long. This reflects her punishment - having to work hard constantly to find scarce food (boring into wood for insects) rather than having the abundant food she was unwilling to share."
            }
        ]
    },
    {
        section: "Deeper Analysis",
        questions: [
            {
                id: "dq1",
                type: "essay",
                text: "Is this a true story? Which parts of this poem do you feel are the most important?",
                answer: "No, the poem itself acknowledges it's likely not true with the line 'I don't believe 'tis true.' However, it's presented as a legend or folktale with a moral lesson. The most important parts are the woman's escalating selfishness (making increasingly smaller cakes but still refusing to share), Saint Peter's judgment that selfish people don't deserve human comforts, and the transformation that makes her eternally work for meager food - a fitting consequence for her unwillingness to share abundance."
            },
            {
                id: "dq2",
                type: "essay",
                text: "What is a legend? Why is this poem called a legend?",
                answer: "A legend is a traditional story sometimes popularly regarded as historical but not authenticated. This poem is called 'A Legend of the Northland' because it presents a traditional folk explanation for the woodpecker's appearance and behavior. Like many legends, it combines supernatural elements (Saint Peter's powers), a moral lesson (against selfishness), and an explanation of natural phenomena (why woodpeckers have red heads and peck at wood). The poem itself frames the story as something told in the Northland, positioning it as regional folklore rather than verified history."
            },
            {
                id: "dq3",
                type: "essay",
                text: "Do you think the old woman would have been so ungenerous if she had known who Saint Peter really was? What would she have done then?",
                answer: "The old woman likely would have behaved differently had she recognized Saint Peter as an important religious figure or someone with divine authority. People often show conditional generosity based on who they perceive others to be. Had she known, she probably would have given him her best cake and shown excessive hospitality for selfish reasons - to gain favor or blessings rather than out of genuine generosity. The story suggests true character is revealed in how we treat ordinary people, not just those we think are important."
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
        title = 'The Snake and the Mirror - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'A Legend of the Northland - Comprehension Questions';
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
