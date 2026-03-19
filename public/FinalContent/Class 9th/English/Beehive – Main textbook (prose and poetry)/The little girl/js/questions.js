/**
 * Questions for The Little Girl interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Why was Kezia afraid of her father?",
                answer: "Kezia was afraid of her father because he was strict, had a loud voice, looked at her over his spectacles in a terrifying way, and made her stutter."
            },
            {
                id: "sq2",
                type: "short",
                text: "Who were the people in Kezia's family?",
                answer: "Kezia's family consisted of her father, mother, and grandmother."
            },
            {
                id: "sq3",
                type: "short",
                text: "What was Kezia's father's routine before going to his office?",
                answer: "Before going to work, he would come into Kezia's room and give her a casual kiss."
            },
            {
                id: "sq4",
                type: "short",
                text: "What was Kezia's father's routine after coming back from his office?",
                answer: "After coming back, he would ask for his tea in the drawing room, his newspaper, and his slippers. He would also call Kezia to take off his boots."
            },
            {
                id: "sq5",
                type: "short",
                text: "How did Kezia's father spend his Sundays?",
                answer: "On Sunday afternoons, he would be stretched out on the sofa with his handkerchief on his face, sleeping and snoring."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"What's the matter? What are you looking so wretched about?\"<br>(i) Who says these words?<br>(ii) Why does he say this?<br>(iii) What does 'wretched' mean here?",
                answer: "(i) Kezia's father<br>(ii) He says this because Kezia looks unhappy and scared<br>(iii) 'Wretched' means unhappy or miserable"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"Mother, I wish you taught this child not to appear on the brink of suicide...\"<br>(i) Who is referred to as 'this child'?<br>(ii) Why does the speaker say this?<br>(iii) What does 'on the brink of suicide' mean?",
                answer: "(i) Kezia<br>(ii) Because Kezia looks extremely unhappy and scared<br>(iii) It means looking so unhappy that one might consider taking their own life"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "In what ways did Kezia's grandmother encourage her to get to know her father better?",
                answer: "Kezia's grandmother encouraged her to have 'nice talks' with her father and mother on Sunday afternoons. She also suggested Kezia make a pin-cushion as a birthday gift for her father, which was an attempt to create a positive connection between them."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "What happened when Kezia tore up her father's papers to make a pin-cushion?",
                answer: "When Kezia tore up her father's important papers to stuff her pin-cushion, there was a 'hue and cry' in the house. Her father's speech for the Port Authority was lost. Her mother called her to the dining room where her angry father questioned her. Though Kezia tried to explain it was for his birthday, her father was upset and punished her by beating her hands with a ruler."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What was different about Mr. Macdonald compared to Kezia's father?",
                answer: "Mr. Macdonald was playful and affectionate with his children. He would play 'tag' with them in the evening, carry his baby on his shoulders, let his daughters hang onto his coat pockets, and laugh with them. He would even let his sons spray him with water from a hose. This was very different from Kezia's strict, serious father who rarely played or showed affection."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How does Kezia begin to see her father as a human being who needs her sympathy?",
                answer: "During her nightmare, her father comforts her by carrying her to his bed when she's scared. He tucks her in, lets her snuggle against him, and tells her to warm her feet against his legs. Seeing him asleep, she realizes he's 'not so big after all' and has 'no one to look after him.' She understands he works hard every day and is too tired to be playful like Mr. Macdonald. This makes her feel sympathetic toward him."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "Kezia's efforts to please her father resulted in displeasing him very much. How did this happen?",
                answer: "Kezia tried to please her father by making him a birthday present - a pin-cushion from yellow silk. While her intentions were good, she made a critical error by using pages of her father's important speech for the Port Authority as stuffing material. She didn't understand the importance of these papers and tore them into tiny pieces. When her father discovered this, he was extremely angry and punished her physically. The irony is that Kezia's attempt to express love through a gift ended up causing problems because she didn't understand the value of what she was destroying."
            },
            {
                id: "eq2",
                type: "essay",
                text: "How would you describe Kezia's father based on his actions in the story? Was he right to punish her?",
                answer: "Kezia's father appears strict, authoritative, and emotionally distant through most of the story. He has high expectations, demands respect, and maintains discipline in the household. He seems unable to express affection easily and creates an atmosphere of fear around him. His punishing Kezia for tearing up his speech, while understandable from his perspective, was likely excessive and didn't account for her innocent intentions. However, by the end of the story, we see another side of him - capable of tenderness when Kezia is frightened, suggesting he does care deeply but struggles to show it. The story illustrates how adults' behaviors can be misunderstood by children, and how important gentle communication is in parent-child relationships."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Has your perception about your parents changed as you've grown older? How?",
                answer: "This question invites personal reflection on how our understanding of parents evolves as we mature. Many people begin to see their parents more as complex individuals with their own struggles, histories, and motivations rather than just authority figures. We often recognize the sacrifices they've made, understand their strictness or rules in a new light, and appreciate their humanity. Consider how your view has shifted from seeing parents as perfect or all-powerful to recognizing their vulnerabilities and strengths. Think about moments when you realized your parents' behaviors were influenced by their own upbringing or life challenges."
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
                text: "What does the poet like to do when it rains?",
                answer: "The poet likes to lie in bed and listen to the patter of soft rain overhead."
            },
            {
                id: "pq2",
                type: "short",
                text: "What is the single major memory that comes to the poet?",
                answer: "The memory of his mother looking at him and his siblings (the 'darling dreamers') before they fell asleep."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What do the following phrases mean in the poem: 'humid shadows' and 'starry spheres'?",
                answer: "'Humid shadows' refers to the moisture-laden darkness or clouds during rainy weather. 'Starry spheres' refers to the celestial bodies or the night sky filled with stars."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "Who are the 'darling dreamers' the poet refers to?",
                answer: "The 'darling dreamers' are likely the poet and his siblings when they were children, whom his mother would check on before leaving them to sleep till dawn."
            }
        ]
    },
    {
        section: "Deeper Analysis",
        questions: [
            {
                id: "dq1",
                type: "essay",
                text: "Is the poet now a child? Is his mother still alive? How do you know?",
                answer: "The poet is no longer a child but an adult reminiscing about his childhood. This is evident from his use of past tense phrases like 'as she used in years agone' when referring to his mother. The phrase 'years agone' (years gone by) suggests a significant passage of time. His mother is likely no longer alive, as he speaks of her as a memory that comes to him while listening to rain, rather than as a present reality. The nostalgic, wistful tone throughout the poem also hints at the permanent loss of those childhood moments with his mother."
            },
            {
                id: "dq2",
                type: "essay",
                text: "What feelings does the sound of rain on the roof evoke in the poet?",
                answer: "The sound of rain on the roof evokes a sense of comfort, peace, and nostalgia in the poet. He describes it as a 'bliss' to lie listening to the patter of rain. The sound triggers 'a thousand dreamy fancies' and 'a thousand recollections' - suggesting that the rain brings forth both creative thoughts and memories. Most significantly, it awakens tender memories of his mother checking on him before he slept as a child. The rain creates a meditative state that connects him to his past and to the memory of maternal love and care."
            },
            {
                id: "dq3",
                type: "essay",
                text: "Does everyone have a cosy bed to lie in when it rains? Describe how different kinds of people or animals spend time during rain.",
                answer: "No, not everyone has a cosy bed during rainstorms. While some people enjoy rain from the comfort of their homes, others face significant challenges. Homeless individuals may seek shelter under bridges, in doorways, or public buildings. People living in areas prone to flooding might be anxiously watching water levels rather than relaxing. Those in poverty-stricken areas with inadequate housing may be dealing with leaking roofs or dampness. Workers like farmers, delivery personnel, or emergency responders must often continue their duties regardless of weather. Animals also respond differently - wild animals might seek natural shelter under trees or in dens, domestic pets may become anxious or seek comfort with their owners, while some animals like ducks or frogs might actually become more active during rain."
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
        title = 'The Little Girl - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'Rain on the Roof - Comprehension Questions';
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
