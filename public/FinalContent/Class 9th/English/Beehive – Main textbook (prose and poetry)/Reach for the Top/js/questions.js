/**
 * Reading Comprehension Questions for Reach for the Top
 */

// Question data for Santosh Yadav
const santoshQuestions = [
    {
        id: 'sq1',
        type: 'short-answer',
        question: 'Why was the "holy man" surprised when Santosh\'s grandmother told him they didn\'t want a son?',
        points: 10,
        feedback: {
            correct: 'Correct! The "holy man" was surprised because in that society, the birth of a son was generally considered a blessing, while a daughter was not always welcome.',
            incorrect: 'Not quite. Remember that in Santosh\'s society, sons were typically preferred over daughters.'
        }
    },
    {
        id: 'sq2',
        type: 'multiple-choice',
        question: 'What did Santosh say about her determination from the beginning?',
        options: [
            'She would always listen to what her parents told her',
            'She would follow the traditional customs no matter what',
            'If she chose a correct and rational path, others would have to change, not her',
            'She would change herself to fit in with society'
        ],
        correctOption: 2,
        points: 10,
        feedback: {
            correct: 'Correct! Santosh was determined that if her path was rational and correct, she would not change herself to fit society\'s expectations.',
            incorrect: 'That\'s not what the text says. Santosh believed that if her path was rational, others would have to adapt, not her.'
        }
    },
    {
        id: 'sq3',
        type: 'short-answer',
        question: 'How did Santosh first become interested in mountaineering?',
        points: 10,
        feedback: {
            correct: 'Correct! Santosh became interested in mountaineering when she was at Kasturba Hostel in Jaipur, where she observed villagers going up the Aravalli Hills and decided to check it out herself, where she encountered mountaineers.',
            incorrect: 'That\'s not quite right. Remember that it started with her observations from her hostel room.'
        }
    },
    {
        id: 'sq4',
        type: 'multiple-choice',
        question: 'What record did Santosh Yadav set?',
        options: [
            'She was the youngest woman to scale Mt Everest',
            'She was the first Indian woman to scale Mt Everest',
            'She was the only woman to have scaled Mt Everest twice',
            'She was the fastest woman to scale Mt Everest'
        ],
        correctOption: 2,
        points: 10,
        feedback: {
            correct: 'Correct! Santosh Yadav became the only woman to have scaled Mt Everest twice, setting a record.',
            incorrect: 'Not quite. While she did have remarkable achievements, her unique record was being the only woman to scale Mt Everest twice.'
        }
    },
    {
        id: 'sq5',
        type: 'multiple-choice',
        question: 'What did Santosh do that shows she is an environmentalist?',
        options: [
            'She planted trees around the Everest base camp',
            'She collected and brought down 500 kilograms of garbage from the Himalayas',
            'She wrote a book about environmental conservation',
            'She started an environmental NGO'
        ],
        correctOption: 1,
        points: 10,
        feedback: {
            correct: 'Correct! Santosh showed her environmental consciousness by collecting and bringing down 500 kilograms of garbage from the Himalayas.',
            incorrect: 'That\'s not mentioned in the text. The text states that she collected and brought down 500 kilograms of garbage from the Himalayas.'
        }
    }
];

// Question data for Maria Sharapova
const mariaQuestions = [
    {
        id: 'mq1',
        type: 'multiple-choice',
        question: 'Why was Maria Sharapova sent to the United States?',
        options: [
            'To join her mother who was already living there',
            'To learn English',
            'To train for tennis',
            'To attend a regular school'
        ],
        correctOption: 2,
        points: 10,
        feedback: {
            correct: 'Correct! Maria was sent to the United States to train for tennis when she was not yet ten years old.',
            incorrect: 'That\'s not right. Maria was sent to the United States specifically to train for tennis.'
        }
    },
    {
        id: 'mq2',
        type: 'short-answer',
        question: 'What made Maria mentally tough according to the text?',
        points: 10,
        feedback: {
            correct: 'Correct! Maria became mentally tough because of the challenges she faced - being away from her mother, her father working and not being able to see her much, and the other tennis pupils making her tidy up the room when they came in late. Instead of letting this depress her, she became determined.',
            incorrect: 'That\'s not quite complete. Think about the hardships she faced at the training facility and her response to them.'
        }
    },
    {
        id: 'mq3',
        type: 'multiple-choice',
        question: 'What does Maria say about her nationality?',
        options: [
            'She considers herself more American than Russian',
            'She doesn\'t care about nationality',
            'She proudly claims her Russian nationality despite her American accent',
            'She has dual citizenship and is confused about her identity'
        ],
        correctOption: 2,
        points: 10,
        feedback: {
            correct: 'Correct! Despite her American accent, Maria proudly claims her Russian nationality, stating "I\'m Russian... My blood is totally Russian."',
            incorrect: 'That\'s not what the text indicates. Despite living in the U.S., Maria strongly identifies as Russian.'
        }
    },
    {
        id: 'mq4',
        type: 'short-answer',
        question: 'What is Maria\'s "mantra for success" according to the text?',
        points: 10,
        feedback: {
            correct: 'Correct! Maria\'s mantra for success is "I am very, very competitive. I work hard at what I do. It\'s my job."',
            incorrect: 'That\'s not quite right. Look at what Maria says about her competitive nature and work ethic.'
        }
    },
    {
        id: 'mq5',
        type: 'multiple-choice',
        question: 'What sacrifice did Maria have to make when she went to train in the United States?',
        options: [
            'She had to give up her education',
            'She had to endure a two-year separation from her mother',
            'She had to give up her Russian citizenship',
            'She had to abandon her childhood friends'
        ],
        correctOption: 1,
        points: 10,
        feedback: {
            correct: 'Correct! Maria had to endure a heart-wrenching two-year separation from her mother, who was compelled to stay back in Siberia because of visa restrictions.',
            incorrect: 'That\'s not the main sacrifice mentioned in the text. The text specifically mentions the separation from her mother due to visa restrictions.'
        }
    }
];

// Question data for the poem "On Killing a Tree"
const poemQuestions = [
    {
        id: 'pq1',
        type: 'multiple-choice',
        question: 'According to the poem, why is it difficult to kill a tree?',
        options: [
            'Trees are protected by law',
            'The tree has grown slowly, consuming the earth and absorbing years of sunlight',
            'People are emotionally attached to trees',
            'Trees can run away from danger'
        ],
        correctOption: 1,
        points: 10,
        feedback: {
            correct: 'Correct! The poem states that a tree is difficult to kill because it "has grown slowly consuming the earth, rising out of it, feeding upon its crust, absorbing years of sunlight, air, water."',
            incorrect: 'That\'s not what the poem suggests. The difficulty comes from the tree\'s deep connection to earth and years of growth.'
        }
    },
    {
        id: 'pq2',
        type: 'short-answer',
        question: 'What happens when you merely cut a tree according to the poem?',
        points: 10,
        feedback: {
            correct: 'Correct! According to the poem, when you merely cut a tree, "The bleeding bark will heal / And from close to the ground / Will rise curled green twigs, / Miniature boughs / Which if unchecked will expand again / To former size."',
            incorrect: 'That\'s not quite right. The poem explains that the tree can heal and grow back if only cut superficially.'
        }
    },
    {
        id: 'pq3',
        type: 'multiple-choice',
        question: 'What does the poet mean by "the strength of the tree exposed"?',
        options: [
            'The tree\'s ability to withstand strong winds',
            'The tree\'s roots becoming visible',
            'The core or source of the tree\'s life that is revealed when the roots are pulled out',
            'The hardness of the tree trunk'
        ],
        correctOption: 2,
        points: 10,
        feedback: {
            correct: 'Correct! The phrase "the strength of the tree exposed" refers to the source of the tree\'s life and power - "The source, white and wet, / The most sensitive, hidden / For years inside the earth" - that is revealed when the roots are pulled out.',
            incorrect: 'That\'s not what the poet is describing. The strength refers to the essence or life force of the tree that is exposed when uprooted.'
        }
    },
    {
        id: 'pq4',
        type: 'short-answer',
        question: 'What finally kills the tree according to the poem?',
        points: 10,
        feedback: {
            correct: 'Correct! According to the poem, what finally kills the tree is the "scorching and choking in sun and air" after it has been completely uprooted, leading to "browning, hardening, twisting, withering" before it is finally done.',
            incorrect: 'That\'s not quite right. The poem describes a specific process after uprooting that leads to the tree\'s death.'
        }
    },
    {
        id: 'pq5',
        type: 'multiple-choice',
        question: 'What is the main message of the poem "On Killing a Tree"?',
        options: [
            'Trees should be protected at all costs',
            'Killing a tree requires a complete and deliberate process, reflecting on how life persists despite harm',
            'Deforestation is a major environmental problem',
            'Gardeners need to know how to remove trees properly'
        ],
        correctOption: 1,
        points: 10,
        feedback: {
            correct: 'Correct! The main message of the poem is about the deliberate and complete process required to kill a tree, which serves as a metaphor for the resilience of life and the effort needed to completely destroy something that has established deep roots.',
            incorrect: 'That\'s not the main focus of the poem. The poem is more about the process and what it symbolizes about life\'s resilience.'
        }
    }
];

// Function to show question set based on selection
function showQuestionSet(setId) {
    // Update navigation button states
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Find the button that was clicked and activate it
    const buttons = document.querySelectorAll('.story-nav-btn');
    for (let button of buttons) {
        if (button.onclick && button.onclick.toString().includes(setId)) {
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            break;
        }
    }
    
    // Get container and clear previous content
    const container = document.getElementById('textQuestions');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Determine which question set to show
    let questions;
    let sectionTitle;
    
    if (setId === 'santosh-questions') {
        questions = santoshQuestions;
        sectionTitle = 'Questions about Santosh Yadav';
    } else if (setId === 'maria-questions') {
        questions = mariaQuestions;
        sectionTitle = 'Questions about Maria Sharapova';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        sectionTitle = 'Questions about "On Killing a Tree"';
    } else {
        console.error('Invalid question set ID:', setId);
        return;
    }
    
    // Add section title
    const titleElement = document.createElement('h3');
    titleElement.className = 'question-section-title';
    titleElement.textContent = sectionTitle;
    container.appendChild(titleElement);
    
    // Create question elements
    const questionSet = document.createElement('div');
    questionSet.className = 'question-set';
    
    questions.forEach(q => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.id = `question-${q.id}`;
        
        // Add question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = q.question;
        questionItem.appendChild(questionText);
        
        // Add answer input based on question type
        if (q.type === 'multiple-choice') {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'question-options';
            
            q.options.forEach((option, index) => {
                const optionContainer = document.createElement('div');
                optionContainer.className = 'option';
                
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = q.id;
                radioInput.id = `${q.id}-option-${index}`;
                radioInput.value = index;
                
                const label = document.createElement('label');
                label.htmlFor = `${q.id}-option-${index}`;
                label.textContent = option;
                
                optionContainer.appendChild(radioInput);
                optionContainer.appendChild(label);
                optionsContainer.appendChild(optionContainer);
            });
            
            questionItem.appendChild(optionsContainer);
            
            // Add check button
            const checkButton = document.createElement('button');
            checkButton.className = 'interactive-btn';
            checkButton.textContent = 'Check Answer';
            checkButton.onclick = function() {
                const selectedOption = document.querySelector(`input[name="${q.id}"]:checked`);
                
                // Create feedback message container if it doesn't exist
                let feedbackContainer = questionItem.querySelector('.question-feedback');
                if (!feedbackContainer) {
                    feedbackContainer = document.createElement('div');
                    feedbackContainer.className = 'question-feedback';
                    questionItem.appendChild(feedbackContainer);
                }
                
                if (!selectedOption) {
                    feedbackContainer.textContent = 'Please select an answer.';
                    feedbackContainer.className = 'question-feedback warning';
                    return;
                }
                
                const isCorrect = parseInt(selectedOption.value) === q.correctOption;
                
                if (isCorrect) {
                    feedbackContainer.textContent = q.feedback.correct;
                    feedbackContainer.className = 'question-feedback correct';
                    
                    // Award points
                    if (typeof updateScore === 'function') {
                        updateScore(q.points);
                    }
                    
                    // Show achievement
                    if (typeof showAchievement === 'function') {
                        showAchievement(`Correct Answer! +${q.points} points`);
                    }
                } else {
                    feedbackContainer.textContent = q.feedback.incorrect;
                    feedbackContainer.className = 'question-feedback incorrect';
                }
            };
            
            questionItem.appendChild(checkButton);
            
        } else if (q.type === 'short-answer') {
            const textareaContainer = document.createElement('div');
            textareaContainer.className = 'textarea-container';
            
            const textarea = document.createElement('textarea');
            textarea.className = 'question-textarea';
            textarea.rows = 4;
            textarea.placeholder = 'Type your answer here...';
            textarea.id = `${q.id}-answer`;
            
            textareaContainer.appendChild(textarea);
            questionItem.appendChild(textareaContainer);
            
            // Add submit button
            const submitButton = document.createElement('button');
            submitButton.className = 'interactive-btn';
            submitButton.textContent = 'Submit Answer';
            submitButton.onclick = function() {
                const userAnswer = document.getElementById(`${q.id}-answer`).value.trim();
                
                // Create feedback message container if it doesn't exist
                let feedbackContainer = questionItem.querySelector('.question-feedback');
                if (!feedbackContainer) {
                    feedbackContainer = document.createElement('div');
                    feedbackContainer.className = 'question-feedback';
                    questionItem.appendChild(feedbackContainer);
                }
                
                if (!userAnswer) {
                    feedbackContainer.textContent = 'Please type an answer.';
                    feedbackContainer.className = 'question-feedback warning';
                    return;
                }
                
                // For short answers, we'll give feedback but not check correctness automatically
                feedbackContainer.textContent = 'Thank you for your answer. Here\'s some guidance: ' + 
                    (userAnswer.length > 20 ? q.feedback.correct : q.feedback.incorrect);
                feedbackContainer.className = 'question-feedback correct';
                
                // Award points for effort
                if (typeof updateScore === 'function' && userAnswer.length > 20) {
                    updateScore(q.points);
                }
                
                // Show achievement
                if (typeof showAchievement === 'function' && userAnswer.length > 20) {
                    showAchievement(`Answer Submitted! +${q.points} points`);
                }
            };
            
            questionItem.appendChild(submitButton);
        }
        
        questionSet.appendChild(questionItem);
    });
    
    container.appendChild(questionSet);
}
