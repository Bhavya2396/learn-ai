/**
 * Questions for The Sound of Music interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Evelyn Glennie Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "How old was Evelyn when she went to the Royal Academy of Music?",
                answer: "Seventeen years old."
            },
            {
                id: "sq2",
                type: "short",
                text: "When was Evelyn's deafness first noticed? When was it confirmed?",
                answer: "It was first noticed when she was eight years old. It was confirmed when she was eleven."
            },
            {
                id: "sq3",
                type: "paragraph",
                text: "Who helped her to continue with music? What did he do and say?",
                answer: "Percussionist Ron Forbes helped her. He tuned two large drums to different notes and told her not to listen through her ears but to sense the music in other ways. He helped her discover that she could feel different notes in different parts of her body."
            },
            {
                id: "sq4",
                type: "paragraph",
                text: "Name the various places and causes for which Evelyn performs.",
                answer: "Apart from regular concerts, Evelyn gives free concerts in prisons and hospitals. She also gives classes for young musicians and supports the Beethoven Fund for Deaf Children."
            }
        ]
    },
    {
        section: "Bismillah Khan Questions",
        questions: [
            {
                id: "sq5",
                type: "short",
                text: "Why did Aurangzeb ban the playing of the pungi?",
                answer: "Because it had a shrill, unpleasant sound."
            },
            {
                id: "sq6",
                type: "paragraph",
                text: "How is a shehnai different from a pungi?",
                answer: "A shehnai has a longer and broader natural hollow stem compared to the pungi. It has seven holes on the body of the pipe which produces softer, more melodious sounds."
            },
            {
                id: "sq7",
                type: "paragraph",
                text: "Where was the shehnai played traditionally? How did Bismillah Khan change this?",
                answer: "Traditionally, the shehnai was played in temples, at weddings, and in royal courts as part of the naubat. Bismillah Khan brought the shehnai onto the classical stage and made it a respected concert instrument."
            },
            {
                id: "sq8",
                type: "paragraph",
                text: "When and how did Bismillah Khan get his big break?",
                answer: "Bismillah Khan got his big break in 1938 with the opening of the All India Radio in Lucknow. He soon became a frequently featured shehnai player on radio."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "How does Evelyn hear music?",
                answer: "Evelyn 'hears' music through her body. Music pours in through every part of her body and tingles in her skin, cheekbones, and even in her hair. When playing the xylophone, she senses sound passing up the sticks into her fingertips. She leans against drums to feel resonances flowing into her body. On wooden platforms, she removes her shoes so vibrations pass through her bare feet and up her legs."
            },
            {
                id: "eq2",
                type: "essay",
                text: "Find at least two instances in the text which tell us that Bismillah Khan loves India and Benaras.",
                answer: "1) Despite offers from abroad, Bismillah Khan refused to leave Benaras. When asked about moving to Pakistan during Partition, he said 'God forbid! Me, leave Benaras? Never!' 2) When a student offered to recreate the atmosphere of Benaras in the USA, he asked if River Ganga could be transported there too. 3) He said, 'Whenever I am in a foreign country, I keep yearning to see Hindustan. While in Mumbai, I think of only Benaras and the holy Ganga.'"
            },
            {
                id: "eq3",
                type: "essay",
                text: "What are some key similarities and differences between Evelyn Glennie and Bismillah Khan as musicians?",
                answer: "Similarities: Both had to overcome obstacles (Evelyn's deafness, Bismillah Khan's humble beginnings). Both received prestigious awards and international recognition. Both were dedicated to their craft from a young age. Both revolutionized their instruments/field. Differences: Evelyn is a Western classical percussionist, while Bismillah Khan played the shehnai in Indian classical tradition. Evelyn traveled extensively, while Bismillah Khan remained deeply attached to his hometown despite opportunities abroad."
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
                text: "What are the things the wind does in the first stanza?",
                answer: "It breaks the shutters of windows, scatters papers, throws down books from the shelf, tears pages of books, and brings rain."
            },
            {
                id: "pq2",
                type: "short",
                text: "What does the poet say the wind god winnows?",
                answer: "The wind god winnows and crushes frail crumbling houses, doors, rafters, wood, bodies, lives, and hearts."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What should we do to make friends with the wind?",
                answer: "To make friends with the wind, we should build strong homes, join the doors firmly, strengthen our bodies, and make our hearts steadfast."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What do the last four lines of the poem mean?",
                answer: "The last four lines suggest that the wind tests our strength - it destroys what is weak but helps the strong grow stronger. The poet says the wind's friendship is valuable, which is why we praise it every day. It symbolizes how challenges can destroy the weak but strengthen those who are resilient."
            }
        ]
    },
    {
        section: "Deeper Analysis",
        questions: [
            {
                id: "dq1",
                type: "essay",
                text: "How does the poet speak to the wind — in anger or with humour?",
                answer: "The poet begins with a tone of mild irritation and frustration when addressing the wind, especially when saying 'look what you did - you threw them all down.' However, the tone is not deeply angry but rather observational with a touch of humor in acknowledging the wind's mischievous power. By the end, the tone shifts to respect and appreciation, suggesting the initial frustration was part of a larger message about strength and resilience."
            },
            {
                id: "dq2",
                type: "essay",
                text: "What message is the poet trying to convey through the poem 'Wind'?",
                answer: "The poet uses wind as a metaphor for life's challenges and difficulties. The central message is that we should not be weak or frail in the face of hardship, but rather build ourselves strong through determination and resilience. The poem suggests that the same forces that destroy the weak can actually help the strong become even stronger. It's a call to strengthen ourselves physically, emotionally, and spiritually to withstand life's storms."
            },
            {
                id: "dq3",
                type: "essay",
                text: "How does the poet personify the wind in this poem?",
                answer: "The poet personifies wind by giving it human characteristics and intentions. The wind is portrayed as a conscious being who can deliberately break things, scatter papers, and tear pages. It is described as 'clever at poking fun at weaklings,' suggesting mischievousness and intent. The poet refers to the wind as 'he' and as a 'god' with the power to judge strength and weakness. The wind is described as having the capacity for friendship, and as an entity that can be praised, indicating a relationship similar to that between humans."
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
        title = 'The Sound of Music - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'Wind - Comprehension Questions';
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
