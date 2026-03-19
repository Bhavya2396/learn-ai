/**
 * Questions for Mijbil the Otter interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "What 'experiment' did Maxwell think Camusfearna would be suitable for?",
                answer: "Maxwell thought Camusfearna would be a suitable place to keep an otter instead of a dog."
            },
            {
                id: "sq2",
                type: "short",
                text: "Why did Maxwell go to Basra?",
                answer: "Maxwell went to Basra to the Consulate-General to collect and answer mail from Europe."
            },
            {
                id: "sq3",
                type: "short",
                text: "How did Maxwell get the otter?",
                answer: "Maxwell's friend sent him the otter with two Arabs who brought it in a sack."
            },
            {
                id: "sq4",
                type: "short",
                text: "Why was the otter named 'Maxwell's otter'?",
                answer: "The otter was of a race previously unknown to science and was christened by zoologists as Lutrogale perspicillata maxwelli, or Maxwell's otter."
            },
            {
                id: "sq5",
                type: "short",
                text: "How did Mijbil behave in the first twenty-four hours?",
                answer: "Mijbil was neither hostile nor friendly; he was simply aloof and indifferent, choosing to sleep on the floor as far from Maxwell's bed as possible."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"With the opening of that sack began a phase of my life that has not yet ended...\"<br>(i) What does 'that sack' refer to?<br>(ii) What phase of the author's life is he talking about?<br>(iii) Why does he say it might not end before he does?",
                answer: "(i) The sack containing the otter Mijbil<br>(ii) His attachment to or fascination with otters<br>(iii) Because his love for otters had become so strong that he felt it would last his entire life"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"I made a body-belt for him and took him on a lead to the bathroom, where for half an hour he went wild with joy in the water...\"<br>(i) What was Mijbil's reaction to water?<br>(ii) What characteristic of otters does Maxwell describe?<br>(iii) What does the author mean by \"Water must be kept on the move\"?",
                answer: "(i) Mijbil went wild with joy, plunging and rolling in it<br>(ii) Otters love to play with water and need to spread it around<br>(iii) Otters feel that water should be active and dynamic, not still or static"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How was Mijbil transported to England? What difficulties did Maxwell face?",
                answer: "Mijbil had to be transported in a small box not more than eighteen inches square. Maxwell faced difficulties because Mij tore the lining of the box causing himself injuries. During the flight, Mij escaped, causing chaos on the aircraft. The British airline wouldn't fly animals, so Maxwell had to book a flight to Paris first, then to London."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "Describe the game Mijbil invented with the ping-pong ball and the suitcase.",
                answer: "Mijbil would place a ping-pong ball on the high end of a damaged suitcase whose lid remained at a slope. The ball would roll down the length of the suitcase, and Mij would dash to the other end to ambush its arrival. He would hide, crouch, spring up to take the ball by surprise, grab it, and then trot back to the high end to repeat the game. This could keep him engrossed for up to half an hour."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What 'compulsive habits' did Mijbil develop on his walks in London?",
                answer: "Mij developed ritualistic behaviors similar to those of children. He would tug Maxwell to a low wall opposite his flat, jump onto it, and gallop the full length of its thirty yards. This happened only on the way home, never on the way out. He also had other compulsions like touching certain objects or running in particular patterns."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What different reactions did Londoners have to seeing Mijbil on a leash?",
                answer: "Londoners made various guesses about what kind of animal Mij was. They mistook him for other animals in the Mustelline group (like badger, mongoose, weasel), as well as a baby seal, squirrel, walrus, hippo, beaver, bear cub, leopard, and even a 'brontosaur'. A laborer was particularly surprised and asked what Mij was 'supposed to be'."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What things does Mij do which tell you that he is an intelligent, friendly and fun-loving animal who needs love?",
                answer: "Mij demonstrates intelligence by figuring out how to turn on water taps, creating games like his ping-pong ball suitcase game, and following Maxwell without a leash. He shows friendliness by sleeping close to Maxwell, nuzzling his face and neck, and coming when called. His playful nature is evident in his joy in water, juggling marbles, and playing with various toys. He shows his need for affection by seeking comfort from Maxwell when scared (like after the box incident) and forming rituals during their walks."
            },
            {
                id: "eq2",
                type: "essay",
                text: "What are some of the things we come to know about otters from this text?",
                answer: "From the text, we learn that otters are intelligent animals that can be tamed. They have a special relationship with water - they love playing in it and feel water should be kept moving. Otters are playful creatures that can invent their own games and enjoy activities like juggling objects. They can form strong bonds with humans, following commands and showing affection. They can develop compulsive habits and rituals. Maxwell's otter belongs to a specific species called Lutrogale perspicillata maxwelli, and otters belong to a group called Mustellines."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Maxwell in the story speaks for the otter, Mij. He tells us what the otter feels and thinks on different occasions. How would you describe this relationship between human and animal?",
                answer: "Maxwell and Mij's relationship demonstrates a deep bond where the human develops an understanding of the animal's personality and needs. Maxwell shows empathy by interpreting Mij's emotions and behaviors, like his joy in water, distress in the box, or sense of play with toys. The author's phrase about entering a 'thraldom to otters' suggests a relationship of willing devotion rather than mere pet ownership. Their connection transcends typical human-pet relationships as Maxwell adapts his lifestyle to accommodate Mij's needs and finds delight in Mij's unique behaviors. The relationship is marked by mutual trust, companionship, and a blending of their lives."
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
                text: "What does Sandburg think the fog is like?",
                answer: "Sandburg thinks the fog is like a cat."
            },
            {
                id: "pq2",
                type: "short",
                text: "How does the fog come?",
                answer: "The fog comes on little cat feet - silently and softly."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What does 'it' in the third line refer to, and what does it do?",
                answer: "'It' refers to the fog. It sits looking over harbor and city on silent haunches, and then moves on."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "Find three things that tell us that the fog is like a cat.",
                answer: "The three things that tell us the fog is like a cat are: (1) it comes on little cat feet (silent, stealthy movement), (2) it sits looking (the way a cat observes its surroundings), and (3) it sits on haunches (the typical sitting posture of a cat)."
            }
        ]
    },
    {
        section: "Deeper Analysis",
        questions: [
            {
                id: "dq1",
                type: "essay",
                text: "This poem uses a metaphor to compare fog to a cat. Think about a storm. Try to visualize the force of the storm, hear the sound of the storm, feel the power of the storm. What animal would you compare a storm to, and why?",
                answer: "A storm could be compared to a tiger - powerful, fierce, and dangerous. Like a tiger's roar, thunder reverberates across the landscape. The storm pounces over fields with sudden, overwhelming force. Lightning strikes resemble a tiger's swift, deadly attacks. The storm's unpredictable nature mirrors a tiger's wild temperament. Both command respect through their raw power and both eventually retreat, leaving a changed landscape behind."
            },
            {
                id: "dq2",
                type: "essay",
                text: "This poem is written in 'free verse' without an obvious rhythm or rhyme scheme. What effect does this style have on how we experience the poem? Why might the poet have chosen this form?",
                answer: "The free verse form mirrors the fog's natural, unstructured movement. Without rigid rhythm or rhyme, the poem flows as organically as the fog itself. This style creates a gentle, drifting quality that matches the fog's quiet presence. The brevity and simplicity of the lines emphasize the poem's minimalist beauty. Each line carefully places an image in the reader's mind without forcing it into artificial patterns. The form allows Sandburg to focus entirely on the visual metaphor without distraction, creating a quiet moment of observation just as one might pause to watch fog moving through a city."
            },
            {
                id: "dq3",
                type: "essay",
                text: "Create your own short poem comparing a weather phenomenon (like rain, snow, sunshine) to an animal. Use the techniques you've observed in 'Fog'.",
                answer: "This is a creative exercise for students. A good response would include a short poem that uses metaphor to compare a weather phenomenon to an animal, perhaps using free verse like Sandburg's poem. Students should focus on creating vivid imagery that captures the movement, appearance, or feeling of the weather through animal characteristics. The poem should be concise but evocative."
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
        title = 'Mijbil the Otter - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'Fog - Comprehension Questions';
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
