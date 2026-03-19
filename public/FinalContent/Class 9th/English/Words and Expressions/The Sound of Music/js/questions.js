/**
 * Questions for Role of Music in Life interactive lesson
 */

// Reading comprehension questions for all texts
const readingQuestions = {
    // Text I - Role of Music in Life
    text1: [
        {
            question: "Which type of music helps in relaxation of our body and mind?",
            type: "multiple-choice",
            options: [
                "Pop music",
                "Soothing music",
                "Jazz music",
                "Rock music"
            ],
            correctAnswer: 1, // Soothing music
            explanation: "The text states that 'Listening to music, particularly gentle, calming and melodious music, relaxes people both physically and mentally.'"
        },
        {
            question: "What are the natural painkillers released in our brain called?",
            type: "multiple-choice",
            options: [
                "Insulin",
                "Endorphins",
                "Endocrine",
                "Glycerin"
            ],
            correctAnswer: 1, // Endorphins
            explanation: "According to the text, 'Music releases endorphins, the natural painkillers in our brain, which relieve us from the sense of pain.'"
        },
        {
            question: "How does music help students?",
            type: "multiple-choice",
            options: [
                "By improving their concentration",
                "By improving their emotion",
                "By improving their relaxation",
                "By improving their anxiety"
            ],
            correctAnswer: 0, // By improving their concentration
            explanation: "The text mentions that 'Students can improve their concentration and boost their memory by listening to soft music.'"
        },
        {
            question: "Which word from the passage means the same as 'to renew'?",
            type: "multiple-choice",
            options: [
                "rejuvenate",
                "enhance",
                "release",
                "relieve"
            ],
            correctAnswer: 0, // rejuvenate
            explanation: "The word 'rejuvenate' means 'to make young or fresh again; to restore to a former state of health, vigor, etc.'"
        },
        {
            question: "List the benefits of music mentioned in the passage.",
            type: "text-area",
            modelAnswer: "The benefits of music mentioned in the passage include: relaxation of body and mind, release of endorphins (natural painkillers), normalization of heart rate and blood pressure, reduction of fatigue and boredom, diversion from anxieties, help in meditation, improvement in concentration and memory for students, help in getting better sleep, overcoming negative traits like anger and worry, creating positive energy and happiness, energizing the body cells, and promoting peace of mind."
        }
    ],
    
    // Text II - Beating the Odds
    text2: [
        {
            question: "Read the following statements about Beethoven and indicate whether they are true (T) or false (F):",
            type: "true-false-set",
            statements: [
                {
                    text: "Although he composed a lot of music, Beethoven never learned to play music himself.",
                    isTrue: false,
                    explanation: "The text states that Beethoven 'has always been acclaimed as a brilliant piano maestro' and that he 'could listen to and play music effortlessly' for the first thirty years of his life."
                },
                {
                    text: "His deafness was not a sudden loss of hearing.",
                    isTrue: true,
                    explanation: "The text states that 'His deafness was not sudden, but a gradual decline.'"
                },
                {
                    text: "He composed most of his music early in his life, before he became deaf.",
                    isTrue: false,
                    explanation: "The text indicates that even after becoming deaf, 'he continued living his dream of composing music' and that 'Deafness could not deter him from achieving the pinnacle of musical success.'"
                },
                {
                    text: "His musical skills were compared to Haydn.",
                    isTrue: false,
                    explanation: "The text states that 'He is compared to Mozart for his genius, and is considered the most eminent musician after Mozart.' Haydn was his teacher, not someone he was compared to."
                },
                {
                    text: "Beethoven cut down the legs of his piano to hear the notes of the keys from the floor.",
                    isTrue: true,
                    explanation: "The text mentions that 'To be able to hear his own compositions, he sawed off the legs of his piano. The piano touched the floor, and Beethoven would press his ear to the floor, banging the piano keys to listen to the high notes in his compositions.'"
                }
            ]
        },
        {
            question: "How could Beethoven compose music despite his loss of hearing?",
            type: "text-area",
            modelAnswer: "Beethoven composed music despite his hearing loss through several adaptations and experiences. His deafness was gradual, which gave him time to understand musical instruments and pitch before becoming completely deaf. As his hearing declined, his mind became more active in imagining how compositions would sound. After becoming deaf, he observed vibrations of the piano and adapted by cutting off the piano legs so it would touch the floor. He would press his ear against the floor to feel the vibrations of the piano keys, especially the high notes. His determination and refusal to give up allowed him to overcome this major obstacle."
        },
        {
            question: "What realization made Beethoven continue his passion for music with more determination?",
            type: "text-area",
            modelAnswer: "Beethoven realized that he should not give up on his passion for music despite his deafness. He understood that by adapting to his condition and finding alternative ways to experience music (like feeling vibrations), he could still compose. His realization that deafness was an obstacle that could be overcome, not an end to his musical career, gave him the determination to continue. His quality of 'never giving up' strengthened him and helped him come to terms with his deafness in a dynamic and constructive way, eventually leading him to become a famous composer despite what seemed like an insurmountable challenge for a musician."
        },
        {
            question: "Which word in the text is similar in meaning to 'skillful'?",
            type: "multiple-choice",
            options: [
                "brilliant",
                "masterly",
                "talented",
                "genius"
            ],
            correctAnswer: 0, // brilliant
            explanation: "In the text, Beethoven is described as 'a brilliant piano maestro,' where 'brilliant' suggests exceptional skill."
        }
    ],
    
    // Text III - The Solitary Reaper
    text3: [
        {
            question: "Complete the summary of the poem with suitable words/phrases.",
            type: "fill-in-blanks",
            text: "The poet finds a young Highland girl who (a)___ alone and sings to herself. The poet asks us to listen carefully, because the whole (b)___ is filled with the overflowing sound of her singing. He asks us to either (c)___ and listen to her sad song, or gently pass by so as not to disturb her.\n\nHe goes on to say that no nightingale ever sang a more (d)___ song to bands of tired (e)___ in the Arabian Desert. The poet asserts that the beauty of the girl's singing exceeds that of the cuckoo's in the (f)___. Her singing is also the only thing which (g)___ the silence of the valley.\n\nThe poet tries to (h)___ what the girl is singing about. He is unable to get the words of the song clearly. He thinks that perhaps she is singing about old sorrows or (i)___ fought long ago, or more routine concerns of life or even some (j)___ which she has endured and may endure again.\n\nAt the end, he quietly walks away with a feeling that he may never be able to find out the (k)___ of her never-ending song. Nevertheless, he asserts that her singing has captured his imagination so much that he will (l)___ the music in his heart long after it is heard no more.",
            blanks: [
                { id: "a", correctAnswer: "reaps/cuts and binds grain", alternatives: ["reaps", "cuts and binds grain", "works", "harvests"] },
                { id: "b", correctAnswer: "vale profound", alternatives: ["vale", "valley", "field", "countryside"] },
                { id: "c", correctAnswer: "stop here", alternatives: ["stop", "wait", "pause", "remain"] },
                { id: "d", correctAnswer: "welcome", alternatives: ["pleasant", "beautiful", "melodious"] },
                { id: "e", correctAnswer: "travellers", alternatives: ["travelers", "wanderers", "journeymen"] },
                { id: "f", correctAnswer: "spring-time", alternatives: ["spring", "springtime", "spring season"] },
                { id: "g", correctAnswer: "breaks", alternatives: ["interrupts", "disrupts", "pierces"] },
                { id: "h", correctAnswer: "understand", alternatives: ["know", "comprehend", "interpret"] },
                { id: "i", correctAnswer: "battles", alternatives: ["wars", "conflicts", "fights"] },
                { id: "j", correctAnswer: "natural sorrow/loss/pain", alternatives: ["sorrow", "natural sorrow", "pain", "loss"] },
                { id: "k", correctAnswer: "theme", alternatives: ["subject", "topic", "meaning"] },
                { id: "l", correctAnswer: "bear", alternatives: ["carry", "remember", "keep"] }
            ]
        }
    ]
};

// Function to load questions for a specific text
function loadTextQuestions(textNumber) {
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) return;
    
    // Clear previous questions
    questionsContainer.innerHTML = '';
    
    // Get questions for the specified text
    const questions = readingQuestions[`text${textNumber}`];
    if (!questions) {
        console.error(`Questions for text ${textNumber} not found`);
        return;
    }
    
    // Add a section title
    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'question-section-title';
    let titleText = '';
    switch(textNumber) {
        case 1:
            titleText = 'Questions on "Role of Music in Life"';
            break;
        case 2:
            titleText = 'Questions on "Beating the Odds"';
            break;
        case 3:
            titleText = 'Questions on "The Solitary Reaper"';
            break;
        default:
            titleText = `Questions on Text ${textNumber}`;
    }
    sectionTitle.textContent = titleText;
    questionsContainer.appendChild(sectionTitle);
    
    // Create question set container
    const questionSet = document.createElement('div');
    questionSet.className = 'question-set';
    questionsContainer.appendChild(questionSet);
    
    // Add each question
    questions.forEach((q, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionItem.appendChild(questionText);
        
        // Create different question types
        switch(q.type) {
            case 'multiple-choice':
                createMultipleChoiceQuestion(q, questionItem, `text${textNumber}-q${index}`);
                break;
            case 'text-area':
                createTextAreaQuestion(q, questionItem, `text${textNumber}-q${index}`);
                break;
            case 'true-false-set':
                createTrueFalseSetQuestion(q, questionItem, `text${textNumber}-q${index}`);
                break;
            case 'fill-in-blanks':
                createFillInBlanksQuestion(q, questionItem, `text${textNumber}-q${index}`);
                break;
        }
        
        questionSet.appendChild(questionItem);
    });
}

// Create a multiple choice question
function createMultipleChoiceQuestion(question, container, id) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'question-options';
    
    question.options.forEach((option, optIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = id;
        radio.id = `${id}-opt${optIndex}`;
        radio.value = optIndex;
        
        const label = document.createElement('label');
        label.htmlFor = `${id}-opt${optIndex}`;
        label.textContent = option;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Add check button
    const checkBtn = document.createElement('button');
    checkBtn.className = 'interactive-btn';
    checkBtn.textContent = 'Check Answer';
    checkBtn.onclick = () => checkMultipleChoice(id, question.correctAnswer, question.explanation);
    
    // Add feedback container
    const feedback = document.createElement('div');
    feedback.id = `${id}-feedback`;
    feedback.className = 'question-feedback';
    
    container.appendChild(optionsContainer);
    container.appendChild(checkBtn);
    container.appendChild(feedback);
}

// Create a text area question
function createTextAreaQuestion(question, container, id) {
    const textarea = document.createElement('textarea');
    textarea.className = 'question-textarea';
    textarea.id = `${id}-textarea`;
    textarea.placeholder = 'Write your answer here...';
    textarea.rows = 5;
    
    // Add check button
    const checkBtn = document.createElement('button');
    checkBtn.className = 'interactive-btn';
    checkBtn.textContent = 'View Model Answer';
    checkBtn.onclick = () => showModelAnswer(id, question.modelAnswer);
    
    // Add feedback container
    const feedback = document.createElement('div');
    feedback.id = `${id}-feedback`;
    feedback.className = 'question-feedback';
    
    container.appendChild(textarea);
    container.appendChild(checkBtn);
    container.appendChild(feedback);
}

// Create a true-false set question
function createTrueFalseSetQuestion(question, container, id) {
    const statementsContainer = document.createElement('div');
    statementsContainer.className = 'true-false-statements';
    
    question.statements.forEach((statement, stIndex) => {
        const statementDiv = document.createElement('div');
        statementDiv.className = 'true-false-statement';
        
        const statementText = document.createElement('p');
        statementText.textContent = statement.text;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'true-false-options';
        
        // True option
        const trueOption = document.createElement('div');
        trueOption.className = 'option';
        const trueRadio = document.createElement('input');
        trueRadio.type = 'radio';
        trueRadio.name = `${id}-stmt${stIndex}`;
        trueRadio.id = `${id}-stmt${stIndex}-true`;
        trueRadio.value = 'true';
        const trueLabel = document.createElement('label');
        trueLabel.htmlFor = `${id}-stmt${stIndex}-true`;
        trueLabel.textContent = 'True';
        trueOption.appendChild(trueRadio);
        trueOption.appendChild(trueLabel);
        
        // False option
        const falseOption = document.createElement('div');
        falseOption.className = 'option';
        const falseRadio = document.createElement('input');
        falseRadio.type = 'radio';
        falseRadio.name = `${id}-stmt${stIndex}`;
        falseRadio.id = `${id}-stmt${stIndex}-false`;
        falseRadio.value = 'false';
        const falseLabel = document.createElement('label');
        falseLabel.htmlFor = `${id}-stmt${stIndex}-false`;
        falseLabel.textContent = 'False';
        falseOption.appendChild(falseRadio);
        falseOption.appendChild(falseLabel);
        
        optionsDiv.appendChild(trueOption);
        optionsDiv.appendChild(falseOption);
        
        statementDiv.appendChild(statementText);
        statementDiv.appendChild(optionsDiv);
        statementsContainer.appendChild(statementDiv);
    });
    
    // Add check button
    const checkBtn = document.createElement('button');
    checkBtn.className = 'interactive-btn';
    checkBtn.textContent = 'Check Answers';
    checkBtn.onclick = () => checkTrueFalseSet(id, question.statements);
    
    // Add feedback container
    const feedback = document.createElement('div');
    feedback.id = `${id}-feedback`;
    feedback.className = 'question-feedback';
    
    container.appendChild(statementsContainer);
    container.appendChild(checkBtn);
    container.appendChild(feedback);
}

// Create fill-in-blanks question
function createFillInBlanksQuestion(question, container, id) {
    // Create formatted text with blanks
    const textWithBlanks = document.createElement('div');
    textWithBlanks.className = 'fill-in-blanks-text';
    
    // Split text by blank identifiers (a), (b), etc.
    const parts = question.text.split(/\([a-l]\)___/);
    const blanks = question.blanks;
    
    // Create the text with input fields
    let formattedText = '';
    parts.forEach((part, index) => {
        formattedText += part;
        if (index < parts.length - 1) {
            const blankId = blanks[index].id;
            formattedText += `<input type="text" class="blank-input" id="${id}-blank-${blankId}" data-blank-id="${blankId}">`;
        }
    });
    
    textWithBlanks.innerHTML = formattedText;
    
    // Add check button
    const checkBtn = document.createElement('button');
    checkBtn.className = 'interactive-btn';
    checkBtn.textContent = 'Check Answers';
    checkBtn.onclick = () => checkBlanksFill(id, blanks);
    
    // Add feedback container
    const feedback = document.createElement('div');
    feedback.id = `${id}-feedback`;
    feedback.className = 'question-feedback';
    
    container.appendChild(textWithBlanks);
    container.appendChild(checkBtn);
    container.appendChild(feedback);
}

// Check multiple choice answer
function checkMultipleChoice(id, correctAnswer, explanation) {
    const selectedOption = document.querySelector(`input[name="${id}"]:checked`);
    const feedback = document.getElementById(`${id}-feedback`);
    
    if (!selectedOption) {
        feedback.textContent = 'Please select an answer.';
        feedback.className = 'question-feedback warning';
        return;
    }
    
    if (parseInt(selectedOption.value) === correctAnswer) {
        feedback.innerHTML = `Correct! ${explanation}`;
        feedback.className = 'question-feedback correct';
        
        // Update score
        score += 5;
        document.getElementById('totalScore').textContent = score;
        
        if (window.narrator) {
            window.narrator.speak('Correct! Well done.');
        }
    } else {
        feedback.innerHTML = `Incorrect. ${explanation}`;
        feedback.className = 'question-feedback incorrect';
        
        if (window.narrator) {
            window.narrator.speak('Incorrect. Try again.');
        }
    }
}

// Show model answer
function showModelAnswer(id, modelAnswer) {
    const userAnswer = document.getElementById(`${id}-textarea`).value.trim();
    const feedback = document.getElementById(`${id}-feedback`);
    
    if (userAnswer.length < 10) {
        feedback.textContent = 'Please write a more detailed answer before viewing the model answer.';
        feedback.className = 'question-feedback warning';
        return;
    }
    
    feedback.innerHTML = `<strong>Your Answer:</strong><br>${userAnswer}<br><br><strong>Model Answer:</strong><br>${modelAnswer}`;
    feedback.className = 'question-feedback correct';
    
    // Update score if they've written something substantial
    if (userAnswer.length > 50) {
        score += 10;
        document.getElementById('totalScore').textContent = score;
    }
    
    if (window.narrator) {
        window.narrator.speak('Here is the model answer for comparison.');
    }
}

// Check true-false set
function checkTrueFalseSet(id, statements) {
    let correct = 0;
    let total = statements.length;
    const feedback = document.getElementById(`${id}-feedback`);
    let feedbackHTML = '';
    
    // Check each statement
    for (let i = 0; i < statements.length; i++) {
        const selectedOption = document.querySelector(`input[name="${id}-stmt${i}"]:checked`);
        if (!selectedOption) {
            feedback.textContent = 'Please answer all statements.';
            feedback.className = 'question-feedback warning';
            return;
        }
        
        const userAnswer = selectedOption.value === 'true';
        if (userAnswer === statements[i].isTrue) {
            correct++;
            feedbackHTML += `<p>Statement ${i+1}: Correct!</p>`;
        } else {
            feedbackHTML += `<p>Statement ${i+1}: Incorrect. ${statements[i].explanation}</p>`;
        }
    }
    
    // Show overall result
    feedbackHTML = `<p><strong>You got ${correct} out of ${total} correct.</strong></p>` + feedbackHTML;
    feedback.innerHTML = feedbackHTML;
    
    if (correct === total) {
        feedback.className = 'question-feedback correct';
        // Update score
        score += 10;
        document.getElementById('totalScore').textContent = score;
        
        if (window.narrator) {
            window.narrator.speak(`Perfect! You got all ${total} statements correct.`);
        }
    } else if (correct >= total / 2) {
        feedback.className = 'question-feedback correct';
        // Update score partially
        score += 5;
        document.getElementById('totalScore').textContent = score;
        
        if (window.narrator) {
            window.narrator.speak(`Good job! You got ${correct} out of ${total} statements correct.`);
        }
    } else {
        feedback.className = 'question-feedback incorrect';
        
        if (window.narrator) {
            window.narrator.speak(`You got ${correct} out of ${total} statements correct. Review the feedback and try again.`);
        }
    }
}

// Check fill-in-blanks answers
function checkBlanksFill(id, blanks) {
    let correct = 0;
    let total = blanks.length;
    const feedback = document.getElementById(`${id}-feedback`);
    
    // Check each blank
    blanks.forEach(blank => {
        const input = document.getElementById(`${id}-blank-${blank.id}`);
        if (!input) return;
        
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = blank.correctAnswer.toLowerCase();
        const alternatives = blank.alternatives || [];
        
        if (userAnswer === correctAnswer || alternatives.some(alt => userAnswer === alt.toLowerCase())) {
            correct++;
            input.style.backgroundColor = '#e8f5e9';
            input.style.borderColor = '#4caf50';
        } else {
            input.style.backgroundColor = '#ffebee';
            input.style.borderColor = '#f44336';
        }
    });
    
    // Show overall result
    if (correct === total) {
        feedback.textContent = `Perfect! You got all ${total} blanks correct.`;
        feedback.className = 'question-feedback correct';
        
        // Update score
        score += 15;
        document.getElementById('totalScore').textContent = score;
        
        if (window.narrator) {
            window.narrator.speak(`Excellent! You filled in all the blanks correctly.`);
        }
    } else if (correct >= total / 2) {
        feedback.textContent = `Good effort! You got ${correct} out of ${total} blanks correct.`;
        feedback.className = 'question-feedback correct';
        
        // Update score partially
        score += Math.floor((correct / total) * 10);
        document.getElementById('totalScore').textContent = score;
        
        if (window.narrator) {
            window.narrator.speak(`Good job! You got ${correct} out of ${total} blanks correct.`);
        }
    } else {
        feedback.textContent = `You got ${correct} out of ${total} blanks correct. Try again!`;
        feedback.className = 'question-feedback incorrect';
        
        if (window.narrator) {
            window.narrator.speak(`You got ${correct} out of ${total} blanks correct. Try again.`);
        }
    }
}

// Check vocabulary answers
function checkVocabulary() {
    // Correct answers for each vocabulary question
    const vocabAnswers = {
        vocab1: "relieves",
        vocab2: "endorphins",
        vocab3: "exhaustion",
        vocab4: "rejuvenate",
        vocab5: "vitality"
    };
    
    let correct = 0;
    let total = Object.keys(vocabAnswers).length;
    
    // Check each question
    for (let id in vocabAnswers) {
        const select = document.getElementById(id);
        if (!select) continue;
        
        const selectedValue = select.value;
        const correctValue = vocabAnswers[id];
        
        if (selectedValue === correctValue) {
            // Mark as correct
            select.style.borderColor = "#4caf50";
            select.style.backgroundColor = "#e8f5e9";
            correct++;
        } else if (selectedValue) {
            // Mark as incorrect (only if something was selected)
            select.style.borderColor = "#f44336";
            select.style.backgroundColor = "#ffebee";
        } else {
            // Nothing selected
            select.style.borderColor = "#ff9800";
            select.style.backgroundColor = "#fff3e0";
        }
    }
    
    // Show feedback
    const feedbackEl = document.getElementById('vocabFeedback');
    if (feedbackEl) {
        if (correct === total) {
            feedbackEl.textContent = "Excellent! All vocabulary answers are correct!";
            feedbackEl.className = "feedback-message success show";
            
            // Update progress
            score += 15;
            document.getElementById('totalScore').textContent = score;
        } else if (correct > 0) {
            feedbackEl.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackEl.className = "feedback-message error show";
        } else {
            feedbackEl.textContent = "Please select answers for the vocabulary questions.";
            feedbackEl.className = "feedback-message warning show";
        }
    }
}

// Initialize the reading comprehension section with the questions
document.addEventListener('DOMContentLoaded', function() {
    // Load the first text's questions by default
    const questionContainer = document.getElementById('textQuestions');
    
    if (questionContainer) {
        // Create text selection buttons
        const textSelector = document.createElement('div');
        textSelector.className = 'text-selector';
        
        const text1Btn = document.createElement('button');
        text1Btn.className = 'story-nav-btn active';
        text1Btn.textContent = 'Text I: Role of Music in Life';
        text1Btn.onclick = () => {
            document.querySelectorAll('.text-selector .story-nav-btn').forEach(btn => btn.classList.remove('active'));
            text1Btn.classList.add('active');
            loadTextQuestions(1);
        };
        
        const text2Btn = document.createElement('button');
        text2Btn.className = 'story-nav-btn';
        text2Btn.textContent = 'Text II: Beating the Odds';
        text2Btn.onclick = () => {
            document.querySelectorAll('.text-selector .story-nav-btn').forEach(btn => btn.classList.remove('active'));
            text2Btn.classList.add('active');
            loadTextQuestions(2);
        };
        
        const text3Btn = document.createElement('button');
        text3Btn.className = 'story-nav-btn';
        text3Btn.textContent = 'Text III: The Solitary Reaper';
        text3Btn.onclick = () => {
            document.querySelectorAll('.text-selector .story-nav-btn').forEach(btn => btn.classList.remove('active'));
            text3Btn.classList.add('active');
            loadTextQuestions(3);
        };
        
        textSelector.appendChild(text1Btn);
        textSelector.appendChild(text2Btn);
        textSelector.appendChild(text3Btn);
        
        questionContainer.appendChild(textSelector);
        
        // Load questions for Text I initially
        loadTextQuestions(1);
    }
});
