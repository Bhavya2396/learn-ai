/**
 * Questions for Weathering the Storm in Ersama interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Where did Prashant go on 27 October 1999?",
                answer: "Prashant had gone to the block headquarters of Ersama, a small town in coastal Orissa."
            },
            {
                id: "sq2",
                type: "short",
                text: "What was the wind speed during the super cyclone?",
                answer: "The wind speed was 350 km per hour."
            },
            {
                id: "sq3",
                type: "short",
                text: "Where did Prashant take shelter during the cyclone?",
                answer: "Prashant took shelter on the roof of his friend's house."
            },
            {
                id: "sq4",
                type: "short",
                text: "How did the coconut trees help Prashant and his friend's family?",
                answer: "The tender coconuts from the fallen trees kept them from starving in the days following the cyclone."
            },
            {
                id: "sq5",
                type: "short",
                text: "How long was Prashant on his friend's rooftop before he decided to go back to his village?",
                answer: "Prashant was on the rooftop for two days."
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "Describe the scene that Prashant saw when he first looked at the devastation caused by the cyclone.",
                answer: "A raging, deadly, brown sheet of water covered everything as far as he could see. Only fractured cement houses stood in a few places. Bloated animal carcasses and human corpses floated in every direction, and huge old trees had fallen all around."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "What difficulties did Prashant face during his journey back to his village?",
                answer: "He had to use a stick to locate the road and determine where the water was most shallow. At places, the water was waist deep, making progress slow. He lost the road at several points and had to swim. He also had to push away human bodies and animal carcasses that swept against him."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "How did Prashant help arrange food for the cyclone victims at the shelter?",
                answer: "Prashant organized a group of youths and elders to pressure a merchant to share his rice. He also arranged to gather branches from fallen trees to make fire for cooking. Later, he devised a way to signal to military helicopters that they needed food, which resulted in regular airdrops of supplies."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What initiative did Prashant take to help the orphaned children and widows?",
                answer: "Prashant built a shelter using polythene sheets for orphaned children, mobilized women to care for them, and organized sports events including cricket matches to lift their spirits. He also persuaded women to join the food-for-work program started by an NGO."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"The situation was still dangerous, and his friend's family pleaded with Prashant to stay back.\"<br>(i) What was the situation?<br>(ii) Why did they plead with Prashant?<br>(iii) What did Prashant do?",
                answer: "(i) The cyclone had devastated the area, leaving it flooded with dangerous currents and debris.<br>(ii) They were concerned for his safety given the dangerous conditions.<br>(iii) Despite their pleas, Prashant decided to go search for his family with a sturdy stick to help him navigate."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"They had to push away many human bodies — men, women, children — and carcasses of dogs, goats and cattle.\"<br>(i) Who are 'they'?<br>(ii) Why did they have to push the bodies?<br>(iii) What effect did this experience have on Prashant?",
                answer: "(i) 'They' refers to Prashant and two friends of his uncle who were also returning to their village.<br>(ii) They had to push away the bodies that the current swept against them as they moved through the flood waters.<br>(iii) The experience made Prashant weep out loud, and he became convinced that his family could not have survived the catastrophe."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What havoc has the super cyclone wreaked in the life of the people of Orissa?",
                answer: "The super cyclone devastated coastal Orissa, killing thousands of people and destroying hundreds of villages. It uprooted ancient trees, washed away houses, and caused massive flooding. In Prashant's village alone, eighty-six lives were lost and all ninety-six houses were destroyed. Families were separated, many children were orphaned, and women were widowed. The survivors faced starvation, exposure to the elements, and the trauma of witnessing death and destruction all around them. The disaster completely disrupted normal life, leaving people without shelter, food, and basic necessities."
            },
            {
                id: "eq2",
                type: "essay",
                text: "How have the people of the community helped one another? What role do the women of Kalikuda play during these days?",
                answer: "Community members worked together for survival and recovery. Youth volunteers helped clean the shelter and care for the injured. People shared whatever resources they had, including coconuts for food. The women of Kalikuda played crucial roles by looking after orphaned children, participating in the food-for-work program, and helping rebuild community life. By forming new support structures with widows caring for orphaned children, the community created new family units that provided both practical care and emotional support. This mutual assistance was essential to their collective recovery from the disaster."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Why do Prashant and other volunteers resist the plan to set up institutions for orphans and widows? What alternatives do they consider?",
                answer: "Prashant and the volunteers resisted institutional care because they believed children would grow up without proper love in such settings, and widows would suffer from stigma and loneliness. Instead, they proposed integrating orphans within their own community through foster families formed by matching childless widows with children who had lost their parents. This community-based approach would preserve cultural connections, provide family-like environments for children, give purpose to grieving widows, and maintain social bonds that are crucial for emotional healing after trauma."
            },
            {
                id: "eq4",
                type: "essay",
                text: "Do you think Prashant is a good leader? Do you think young people can get together to help people during natural calamities?",
                answer: "Prashant demonstrates excellent leadership qualities through his initiative, resourcefulness, and compassion. At just nineteen, he takes charge when needed, organizes groups for specific tasks, identifies critical needs, and implements practical solutions—from securing food to creating activities for children. His leadership focuses on both immediate survival needs and longer-term psychological well-being of survivors. Young people can indeed be powerful forces during disasters, bringing energy, innovation, and fresh perspectives to crisis situations. Their technological savvy, physical strength, and often fewer family responsibilities can make them particularly effective first responders and community organizers."
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
        title = 'Weathering the Storm in Ersama - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn) => {
        const isActive = (btn.onclick && btn.onclick.toString().includes(setId));
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
