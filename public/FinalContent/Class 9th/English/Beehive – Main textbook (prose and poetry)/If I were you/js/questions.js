/**
 * If I Were You - Comprehension Questions
 */

// Question data for the play
const storyQuestions = [
    {
        id: 'q1',
        type: 'short-answer',
        question: '"At last a sympathetic audience."<br>(i) Who says this?<br>(ii) Why does he say it?<br>(iii) Is he sarcastic or serious?',
        points: 10,
        feedback: {
            correct: 'Correct! Gerrard says this. He says it ironically when the intruder asks him to talk about himself. He is being sarcastic because the intruder is not actually interested in his life story but wants information for his own criminal purposes.',
            incorrect: 'Not quite. Remember that Gerrard is being ironic here - the intruder is not really a "sympathetic audience" but someone trying to get information.'
        }
    },
    {
        id: 'q2',
        type: 'short-answer',
        question: 'Why does the intruder choose Gerrard as the man whose identity he wants to take on?',
        points: 10,
        feedback: {
            correct: 'Correct! The intruder chooses Gerrard because he appears to be a mysterious man who lives alone, frequently goes away suddenly, and doesn\'t see many people. This lifestyle would be perfect for the intruder who is on the run from the police.',
            incorrect: 'That\'s not quite right. Think about what the intruder observed about Gerrard\'s lifestyle and how it would help him hide from the police.'
        }
    },
    {
        id: 'q3',
        type: 'multiple-choice',
        question: '"I said it with bullets." What does this statement mean?',
        options: [
            'The speaker has threatened someone with a gun',
            'The speaker has committed murder with a gun',
            'The speaker likes to use bullets as a metaphor',
            'The speaker is pretending to be a violent criminal'
        ],
        correctOption: 3,
        points: 5,
        feedback: {
            correct: 'Correct! Gerrard is pretending to be a violent criminal to convince the intruder that he is also a criminal, which changes the intruder\'s plans.',
            incorrect: 'That\'s not right. Remember that Gerrard is creating a fictional story about himself to trick the intruder.'
        }
    },
    {
        id: 'q4',
        type: 'short-answer',
        question: 'What is Gerrard\'s profession? Quote the parts of the play that support your answer.',
        points: 15,
        feedback: {
            correct: 'Correct! Gerrard appears to be involved in theater or acting, most likely a playwright or director. Evidence includes his phone call about "props" for "rehearsal" and his reference to putting his experience "in my next play."',
            incorrect: 'That\'s not quite right. Look at the end of the play where Gerrard makes a phone call - what does he say about props and rehearsal?'
        }
    },
    {
        id: 'q5',
        type: 'multiple-choice',
        question: '"You\'ll soon stop being smart." Who says this and why?',
        options: [
            'Gerrard says it because he plans to overpower the intruder',
            'The intruder says it because he\'s annoyed by Gerrard\'s clever responses',
            'Gerrard says it because he knows the police are coming',
            'The intruder says it to warn Gerrard not to try any tricks'
        ],
        correctOption: 1,
        points: 5,
        feedback: {
            correct: 'Correct! The intruder says this because he\'s frustrated by Gerrard\'s clever and witty responses throughout their conversation.',
            incorrect: 'That\'s not right. Think about who is getting frustrated by the other person\'s intelligence and quick thinking.'
        }
    },
    {
        id: 'q6',
        type: 'short-answer',
        question: '"They can\'t hang me twice." Who says this and why?',
        points: 10,
        feedback: {
            correct: 'Correct! The intruder says this. He explains that he has already killed a policeman and is wanted for murder, so he has nothing to lose by killing Gerrard too since the death penalty can only be given once.',
            incorrect: 'That\'s not quite right. Think about what the intruder has already done and why he feels he has nothing to lose.'
        }
    },
    {
        id: 'q7',
        type: 'multiple-choice',
        question: 'What is the mystery that Gerrard proposes to explain?',
        options: [
            'Why he lives alone in the cottage',
            'How he acquired his wealth',
            'Why he leads a mysterious lifestyle with sudden disappearances',
            'How he plans to escape from the intruder'
        ],
        correctOption: 2,
        points: 5,
        feedback: {
            correct: 'Correct! Gerrard proposes to explain why he leads a mysterious lifestyle with sudden disappearances, which is what the intruder observed and found appealing.',
            incorrect: 'That\'s not right. The intruder was specifically interested in Gerrard\'s mysterious habits of disappearing and making phone orders.'
        }
    },
    {
        id: 'q8',
        type: 'multiple-choice',
        question: 'How does Gerrard finally outwit the intruder?',
        options: [
            'By calling the police while the intruder isn\'t looking',
            'By convincing him that they are both criminals and should escape together',
            'By tricking him into looking through a door and pushing him into a cupboard',
            'By secretly drugging the intruder\'s drink'
        ],
        correctOption: 2,
        points: 5,
        feedback: {
            correct: 'Correct! Gerrard tricks the intruder by convincing him they should escape together, then pushes him into a cupboard when he looks through the door.',
            incorrect: 'That\'s not right. Remember the final scene where Gerrard opens a door and the intruder leans forward to inspect it.'
        }
    },
    {
        id: 'q9',
        type: 'short-answer',
        question: 'What were the "big surprises" mentioned in the play and who experienced them?',
        points: 10,
        feedback: {
            correct: 'Correct! There are two "big surprises" in the play. First, the intruder surprises Gerrard by saying he plans to kill him and take his identity. Second, Gerrard surprises the intruder by claiming to be a criminal himself.',
            incorrect: 'That\'s not quite right. Think about the two major revelations that change the course of the play - one from each character.'
        }
    },
    {
        id: 'q10',
        type: 'short-answer',
        question: 'How does Gerrard\'s quick thinking and presence of mind save his life? What qualities does he exhibit throughout the play?',
        points: 20,
        feedback: {
            correct: 'Excellent! Gerrard exhibits calmness, wit, intelligence, creativity, acting ability, and strategic planning. He remains composed under pressure, creates a convincing story, and executes a clever plan to trap the intruder.',
            incorrect: 'That\'s a good start. Consider how Gerrard handles the dangerous situation - what specific qualities help him survive and outwit the intruder?'
        }
    }
];

// Function to show question set based on selection
function showQuestionSet(setId) {
    // Get container and clear previous content
    const container = document.getElementById('textQuestions');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Use story questions
    const questions = storyQuestions;
    const sectionTitle = 'Questions about "If I Were You"';
    
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
        questionText.innerHTML = q.question;
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

// Function to update score (if not already defined in main.js)
function updateScore(points) {
    if (typeof score !== 'undefined') {
        score += points;
        const scoreElement = document.getElementById('totalScore');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }
}
