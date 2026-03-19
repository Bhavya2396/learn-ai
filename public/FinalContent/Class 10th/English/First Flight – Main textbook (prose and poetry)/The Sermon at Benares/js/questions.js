/**
 * Questions for The Sermon at Benares interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "When did Gautama Buddha live?",
                answer: "563 B.C. – 483 B.C."
            },
            {
                id: "sq2",
                type: "short",
                text: "What was Buddha's name at birth?",
                answer: "Siddhartha Gautama"
            },
            {
                id: "sq3",
                type: "short",
                text: "What four sights moved the prince to seek enlightenment?",
                answer: "A sick man, an aged man, a funeral procession, and a monk begging for alms."
            },
            {
                id: "sq4",
                type: "short",
                text: "What is the Bodhi Tree?",
                answer: "The peepal tree under which Gautama attained enlightenment, which he renamed the Tree of Wisdom."
            },
            {
                id: "sq5",
                type: "short",
                text: "What was Kisa Gotami seeking from the Buddha?",
                answer: "Medicine to cure her dead son."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"I want a handful of mustard-seed.\"<br>(i) Who says these words?<br>(ii) To whom are these words spoken?<br>(iii) What condition is set for the mustard-seed?",
                answer: "(i) The Buddha<br>(ii) Kisa Gotami<br>(iii) It must be taken from a house where no one has lost a child, husband, parent or friend."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"How selfish am I in my grief!\"<br>(i) Who speaks these words?<br>(ii) Why does she consider herself selfish?<br>(iii) What realization does she come to?",
                answer: "(i) Kisa Gotami<br>(ii) Because she was focusing only on her own suffering, not realizing that death is common to all<br>(iii) She realizes that death is universal, and that one must surrender selfishness to find the path to immortality."
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "When her son dies, Kisa Gotami goes from house to house. What does she ask for? Does she get it? Why not?",
                answer: "First, she asks neighbors for medicine to cure her dead son. She doesn't get it because the boy is already dead, and the people say she has lost her senses."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "Kisa Gotami again goes from house to house after she speaks with the Buddha. What does she ask for, the second time around? Does she get it? Why not?",
                answer: "She asks for mustard seeds from a house where no one has died. She doesn't get it because she discovers that there is no house where death hasn't occurred - every family has experienced death."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What does Kisa Gotami understand the second time that she failed to understand the first time? Was this what the Buddha wanted her to understand?",
                answer: "She understands that death is universal and inevitable, affecting everyone. Yes, this was exactly what the Buddha wanted her to understand - that suffering from death is common to all and one must accept this reality rather than be consumed by personal grief."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "Why do you think Kisa Gotami understood this only the second time? In what way did the Buddha change her understanding?",
                answer: "She understood it the second time because she experienced it directly by visiting many houses and hearing the same story of loss. The Buddha changed her understanding through experiential learning rather than just telling her the truth. He made her discover the universality of death for herself."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "How do you usually understand the idea of 'selfishness'? Do you agree with Kisa Gotami that she was being 'selfish in her grief'?",
                answer: "Selfishness usually means caring only about oneself. In grief, we often focus entirely on our own pain. Kisa Gotami's realization that her exclusive focus on her own loss while ignoring the universal nature of suffering could be seen as a form of selfishness. However, grief is a natural human response, and calling it 'selfish' may seem harsh. The Buddha's teaching suggests that acknowledging the universality of suffering is part of the path toward healing."
            },
            {
                id: "eq2",
                type: "essay",
                text: "The Buddha says, \"The life of mortals in this world is troubled and brief and combined with pain.\" What observations support this statement?",
                answer: "The Buddha's statement is supported by observations of aging, illness, and death - the very sights that prompted his spiritual journey. All living beings eventually die, as seen in Kisa Gotami's quest finding no household untouched by death. Physical pain, emotional suffering, and the brevity of life are universal experiences. Modern observations about disease, natural disasters, conflicts, and the inevitable aging process all support this statement."
            },
            {
                id: "eq3",
                type: "essay",
                text: "The Buddha's sermon is over 2500 years old. Do you think his ideas and way of teaching continue to hold meaning for us today? Why or why not?",
                answer: "Consider: The universality of suffering and death remains unchanged. The Buddha's experiential teaching method (having Kisa Gotami learn through discovery) aligns with modern educational approaches. His teachings on accepting reality rather than being consumed by grief have psychological validity today. The emphasis on mindfulness and overcoming attachment continues to influence psychology and mental health practices worldwide. However, modern medicine and grief counseling offer additional tools for dealing with loss."
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
                text: "Who are the three speakers in the poem?",
                answer: "A young man, a young woman, and an old religious man (as quoted by the young man)."
            },
            {
                id: "pq2",
                type: "short",
                text: "What is the young woman's hair color?",
                answer: "Yellow (blonde)."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What does the young man mean by \"great honey-coloured/Ramparts at your ear?\" Why does he say that young men are \"thrown into despair\" by them?",
                answer: "The \"ramparts\" refer to the young woman's blonde hair falling beside her ears. He compares her hair to castle walls because they are impressive and defensive barriers. Young men are \"thrown into despair\" because they're captivated by her beauty rather than loving her for who she truly is as a person."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What does the young woman say she can change her hair color to? Why would she want to do so?",
                answer: "She says she can dye her hair brown, black, or carrot (reddish-orange). She wants to do this to test whether men would then love her for herself alone rather than for her yellow hair."
            },
            {
                id: "pq5",
                type: "paragraph",
                text: "What is the old religious man's perspective on love?",
                answer: "The old religious man says that only God could love someone for themselves alone, not for their external qualities like yellow hair. This suggests that human love is always influenced by physical attributes."
            }
        ]
    },
    {
        section: "Deeper Analysis",
        questions: [
            {
                id: "dq1",
                type: "essay",
                text: "Objects have qualities which make them desirable to others. Can you think of some objects (a car, a phone, a dress…) and say what qualities make one object more desirable than another?",
                answer: "Consider: Physical qualities (appearance, color, design), functional qualities (performance, efficiency, features), symbolic qualities (brand status, rarity, cultural associations), emotional qualities (comfort, familiarity, nostalgia). Objects are valued for their combination of intrinsic and extrinsic qualities, which often reflect broader social values and personal preferences."
            },
            {
                id: "dq2",
                type: "essay",
                text: "What about people? Do we love others because we like their qualities, whether physical or mental? Or is it possible to love someone \"for themselves alone\"?",
                answer: "Consider: Physical attraction often initiates relationships, while personality traits, values, and character sustain them. We're drawn to specific qualities in others that resonate with us. Complete separation of a person from their qualities seems difficult - if we removed all qualities, what would remain to love? Yet the deepest forms of love (like parental love) often come closest to loving someone for their essential being. The poem suggests this kind of unconditional love may be more divine than human."
            },
            {
                id: "dq3",
                type: "essay",
                text: "Yeats asks the question elsewhere: 'How can we separate the dancer from the dance?' Is it possible to separate 'the person himself or herself' from how the person looks, sounds, walks, and so on?",
                answer: "Consider: Just as a dance cannot exist apart from the dancer, a person's essence might be inseparable from their expressions and qualities. Physical characteristics and behaviors are how we manifest ourselves in the world. While we might conceptually distinguish between someone's 'true self' and their attributes, in practice they form an integrated whole. Our identities exist through our expressions, choices, and interactions. Yet people can change dramatically while still being 'themselves,' suggesting some core identity persists across these changes."
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
        title = 'The Sermon at Benares - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'For Anne Gregory - Comprehension Questions';
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
