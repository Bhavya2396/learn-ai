/**
 * Questions and comprehension content for My Childhood lesson
 */

// Question sets for different sections
const questionSets = {
    'story-questions': {
        title: 'Story Comprehension Questions',
        questions: [
            {
                id: 'sq1',
                type: 'short-answer',
                text: 'Where was Abdul Kalam\'s house?',
                answer: 'Abdul Kalam\'s house was on the Mosque Street in Rameswaram.',
                hint: 'Think about the street name mentioned in the story.'
            },
            {
                id: 'sq2',
                type: 'short-answer',
                text: 'What do you think Dinamani is the name of? Give a reason for your answer.',
                answer: 'Dinamani is likely the name of a newspaper, as Abdul Kalam mentions trying to trace war stories in its headlines.',
                hint: 'Consider what Abdul Kalam was looking for in it.'
            },
            {
                id: 'sq3',
                type: 'short-answer',
                text: 'Who were Abdul Kalam\'s school friends? What did they later become?',
                answer: 'Abdul Kalam\'s school friends were Ramanadha Sastry, Aravindan, and Sivaprakasan. Ramanadha Sastry became the priest of Rameswaram temple, Aravindan went into the business of arranging transport for visiting pilgrims, and Sivaprakasan became a catering contractor for the Southern Railways.',
                hint: 'Their names and future occupations are mentioned in the fourth paragraph.'
            },
            {
                id: 'sq4',
                type: 'short-answer',
                text: 'How did Abdul Kalam earn his first wages?',
                answer: 'Abdul Kalam earned his first wages by helping his cousin Samsuddin catch newspaper bundles thrown from the moving train during World War II.',
                hint: 'Think about what happened when train services to Rameswaram were suspended.'
            },
            {
                id: 'sq5',
                type: 'short-answer',
                text: 'Had he earned any money before that? In what way?',
                answer: 'Yes, he had earned money by collecting and selling tamarind seeds to a provision shop on Mosque Street, which would fetch him one anna per day.',
                hint: 'Think about what he collected and sold during the early days of World War II.'
            }
        ]
    },
    'story-paragraph-questions': {
        title: 'Story Analysis Questions',
        questions: [
            {
                id: 'spq1',
                type: 'paragraph',
                text: 'How does the author describe: (i) his father, (ii) his mother, (iii) himself?',
                expectedPoints: [
                    'The author describes his father as having little formal education and wealth, but possessing innate wisdom and a true generosity of spirit. He was austere and avoided inessential comforts.',
                    'His mother is described as an ideal helpmate who was generous and fed many people every day.',
                    'The author describes himself as one of many children, a short boy with undistinguished looks born to tall and handsome parents.'
                ],
                hint: 'Focus on the descriptions provided in the first two paragraphs.'
            },
            {
                id: 'spq2',
                type: 'paragraph',
                text: 'What characteristics does he say he inherited from his parents?',
                expectedPoints: [
                    'From his father, he inherited honesty and self-discipline.',
                    'From his mother, he inherited faith in goodness and deep kindness.'
                ],
                hint: 'Look for the paragraph where the author talks about inherited characteristics.'
            },
            {
                id: 'spq3',
                type: 'paragraph',
                text: 'Why did Abdul Kalam want to leave Rameswaram?',
                expectedPoints: [
                    'Abdul Kalam wanted to leave Rameswaram to study at the district headquarters in Ramanathapuram.',
                    'India\'s freedom was imminent, and there was a sense of optimism and opportunity in the country.'
                ],
                hint: 'Check the final paragraphs of the story.'
            },
            {
                id: 'spq4',
                type: 'paragraph',
                text: 'What did his father say to this? What do you think his words mean?',
                expectedPoints: [
                    'His father said, "Abul! I know you have to go away to grow. Does the seagull not fly across the sun, alone and without a nest?"',
                    'He also quoted Khalil Gibran about children being "sons and daughters of Life\'s longing for itself" and not belonging to parents.',
                    'These words mean that his father understood that children need to leave home to fulfill their potential and grow, just like birds must leave the nest to fly.'
                ],
                hint: 'Look at the father\'s response and the metaphor he uses.'
            }
        ]
    },
    'poem-questions': {
        title: 'Poem Comprehension Questions',
        questions: [
            {
                id: 'pq1',
                type: 'short-answer',
                text: '"Beneath all uniforms..." What uniforms do you think the poet is speaking about?',
                answer: 'The poet is speaking about military uniforms that soldiers of different countries wear, which make them appear as enemies. These uniforms represent national and military identities that divide people.',
                hint: 'Think about what uniforms symbolize in the context of war and national divisions.'
            },
            {
                id: 'pq2',
                type: 'short-answer',
                text: 'How does the poet suggest that all people on earth are the same?',
                answer: 'The poet suggests that all people share the same physical body that breathes, all will lie in the same earth after death, all are aware of nature, need food, work with their hands, have eyes that wake and sleep, and experience common life that everyone can recognize.',
                hint: 'Look for physical and experiential similarities mentioned throughout the poem.'
            },
            {
                id: 'pq3',
                type: 'multiple-choice',
                text: 'The central theme of the poem is:',
                options: [
                    'The glory of war and patriotism',
                    'The beauty of different cultures and traditions',
                    'The universal brotherhood of all humans regardless of nationality',
                    'The history of conflicts between nations'
                ],
                correctAnswer: 2,
                hint: 'Look at the repeated phrase at the beginning and end of the poem.'
            },
            {
                id: 'pq4',
                type: 'paragraph',
                text: '"...whenever we are told to hate our brothers..." When do you think this happens? Why? Who \'tells\' us? What does the poet say?',
                expectedPoints: [
                    'This happens during times of conflict, war, or political tension between countries.',
                    'People are told to hate by politicians, media, or those who benefit from division and conflict.',
                    'The poet says that when we hate others, we actually dispossess, betray, and condemn ourselves, because we are harming our common humanity.'
                ],
                hint: 'Consider who benefits from promoting division and what the poet says about the consequences of hate.'
            }
        ]
    },
    'vocabulary-questions': {
        title: 'Vocabulary Questions',
        questions: [
            {
                id: 'vq1',
                type: 'multiple-choice',
                text: 'What are the things that can "erupt"?',
                options: [
                    'Only volcanoes',
                    'Volcanoes, emotions, and social phenomena like protests',
                    'Only natural disasters',
                    'Only human emotions'
                ],
                correctAnswer: 1,
                hint: 'Think about both literal and metaphorical uses of the word.'
            },
            {
                id: 'vq2',
                type: 'multiple-choice',
                text: 'What does "surge" refer to in the context "surge of pride"?',
                options: [
                    'A sudden decrease',
                    'A gradual build-up',
                    'A sudden, strong increase or upwelling of an emotion',
                    'A constant level'
                ],
                correctAnswer: 2,
                hint: 'Consider how emotions can rapidly change in intensity.'
            },
            {
                id: 'vq3',
                type: 'matching',
                text: 'Match the phrases with their meanings:',
                items: [
                    {term: 'broke out', definition: 'began suddenly in a violent way'},
                    {term: 'in accordance with', definition: 'according to a particular rule, principle, or system'},
                    {term: 'a helping hand', definition: 'assistance'},
                    {term: 'could not stomach', definition: 'was not able to tolerate'},
                    {term: 'generosity of spirit', definition: 'an attitude of kindness, a readiness to give freely'},
                    {term: 'figures of authority', definition: 'persons with power to make decisions'}
                ],
                hint: 'Look for contextual clues from how these phrases are used in the story.'
            }
        ]
    },
    'grammar-questions': {
        title: 'Grammar: Passive Voice',
        questions: [
            {
                id: 'gq1',
                type: 'short-answer',
                text: 'Rewrite the sentence in passive voice: "In yesterday\'s competition the Principal gave away the prizes."',
                answer: 'In yesterday\'s competition the prizes were given away by the Principal.',
                hint: 'Subject becomes object, and we use "were" + past participle.'
            },
            {
                id: 'gq2',
                type: 'short-answer',
                text: 'Rewrite the sentence in passive voice: "The labourers received payment on time despite financial difficulties."',
                answer: 'In spite of financial difficulties, the labourers were paid on time.',
                hint: 'Change "received payment" to "were paid".'
            },
            {
                id: 'gq3',
                type: 'short-answer',
                text: 'Rewrite the sentence in passive voice: "Authorities do not allow vehicles beyond this point on Republic Day."',
                answer: 'On Republic Day, vehicles are not allowed beyond this point.',
                hint: 'Use "are not allowed" in place of "do not allow".'
            },
            {
                id: 'gq4',
                type: 'short-answer',
                text: 'Rewrite the sentence in passive voice: "People buy and sell second-hand books on the pavement every Saturday."',
                answer: 'Second-hand books are bought and sold on the pavement every Saturday.',
                hint: 'Both verbs need to be changed to passive form.'
            },
            {
                id: 'gq5',
                type: 'short-answer',
                text: 'Rewrite the sentence in passive voice: "They hold elections to the Lok Sabha every five years."',
                answer: 'Elections to the Lok Sabha are held every five years.',
                hint: 'Use "are held" instead of "they hold".'
            },
            {
                id: 'gq6',
                type: 'short-answer',
                text: 'Rewrite the sentence in passive voice: "Rabindranath Tagore composed our National Anthem."',
                answer: 'Our National Anthem was composed by Rabindranath Tagore.',
                hint: 'Use "was composed" and place "by Rabindranath Tagore" at the end.'
            }
        ]
    }
};

// Function to load and display a question set
function showQuestionSet(setId) {
    const questionSet = questionSets[setId];
    if (!questionSet) return;
    
    // Update active button state
    const navButtons = document.querySelectorAll('.story-nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(setId)) {
            btn.classList.add('active');
        }
    });
    
    const container = document.getElementById('questionContainer');
    if (!container) return;
    
    // Clear previous questions
    container.innerHTML = '';
    
    // Add title
    const titleEl = document.createElement('h2');
    titleEl.className = 'question-section-title';
    titleEl.textContent = questionSet.title;
    container.appendChild(titleEl);
    
    // Add questions
    questionSet.questions.forEach(q => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.id = `question-${q.id}`;
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = q.text;
        questionItem.appendChild(questionText);
        
        // Create different input types based on question type
        switch(q.type) {
            case 'short-answer':
                createShortAnswerQuestion(questionItem, q);
                break;
            case 'paragraph':
                createParagraphQuestion(questionItem, q);
                break;
            case 'multiple-choice':
                createMultipleChoiceQuestion(questionItem, q);
                break;
            case 'matching':
                createMatchingQuestion(questionItem, q);
                break;
        }
        
        container.appendChild(questionItem);
    });
}

// Create short answer question
function createShortAnswerQuestion(container, question) {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'answer-container';
    
    const textArea = document.createElement('textarea');
    textArea.className = 'question-textarea';
    textArea.placeholder = 'Type your answer here...';
    textArea.setAttribute('aria-label', `Answer to question ${question.text}`);
    inputContainer.appendChild(textArea);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const checkButton = document.createElement('button');
    checkButton.className = 'interactive-btn';
    checkButton.textContent = 'Check Answer';
    checkButton.addEventListener('click', () => checkShortAnswer(question, textArea));
    buttonContainer.appendChild(checkButton);
    
    const hintButton = document.createElement('button');
    hintButton.className = 'interactive-btn';
    hintButton.textContent = 'Show Hint';
    hintButton.addEventListener('click', () => showHint(question.hint, container));
    buttonContainer.appendChild(hintButton);
    
    inputContainer.appendChild(buttonContainer);
    
    // Feedback area
    const feedback = document.createElement('div');
    feedback.className = 'question-feedback';
    feedback.id = `feedback-${question.id}`;
    
    container.appendChild(inputContainer);
    container.appendChild(feedback);
}

// Create paragraph question
function createParagraphQuestion(container, question) {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'answer-container';
    
    const textArea = document.createElement('textarea');
    textArea.className = 'question-textarea';
    textArea.placeholder = 'Type your answer here...';
    textArea.setAttribute('aria-label', `Answer to question ${question.text}`);
    inputContainer.appendChild(textArea);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const checkButton = document.createElement('button');
    checkButton.className = 'interactive-btn';
    checkButton.textContent = 'Check Answer';
    checkButton.addEventListener('click', () => checkParagraphAnswer(question, textArea));
    buttonContainer.appendChild(checkButton);
    
    const hintButton = document.createElement('button');
    hintButton.className = 'interactive-btn';
    hintButton.textContent = 'Show Hint';
    hintButton.addEventListener('click', () => showHint(question.hint, container));
    buttonContainer.appendChild(hintButton);
    
    inputContainer.appendChild(buttonContainer);
    
    // Expected points
    const expectedPointsContainer = document.createElement('div');
    expectedPointsContainer.className = 'expected-points';
    expectedPointsContainer.style.display = 'none';
    
    const expectedPointsTitle = document.createElement('h4');
    expectedPointsTitle.textContent = 'Key Points to Include:';
    expectedPointsContainer.appendChild(expectedPointsTitle);
    
    const pointsList = document.createElement('ul');
    question.expectedPoints.forEach(point => {
        const listItem = document.createElement('li');
        listItem.textContent = point;
        pointsList.appendChild(listItem);
    });
    expectedPointsContainer.appendChild(pointsList);
    
    // Feedback area
    const feedback = document.createElement('div');
    feedback.className = 'question-feedback';
    feedback.id = `feedback-${question.id}`;
    
    container.appendChild(inputContainer);
    container.appendChild(expectedPointsContainer);
    container.appendChild(feedback);
}

// Create multiple choice question
function createMultipleChoiceQuestion(container, question) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'question-options';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question-${question.id}`;
        radio.id = `option-${question.id}-${index}`;
        radio.value = index;
        
        const label = document.createElement('label');
        label.htmlFor = `option-${question.id}-${index}`;
        label.textContent = option;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
        
        // Make the whole option div clickable
        optionDiv.addEventListener('click', () => {
            radio.checked = true;
        });
    });
    
    container.appendChild(optionsContainer);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const checkButton = document.createElement('button');
    checkButton.className = 'interactive-btn';
    checkButton.textContent = 'Check Answer';
    checkButton.addEventListener('click', () => {
        const selectedOption = container.querySelector(`input[name="question-${question.id}"]:checked`);
        if (selectedOption) {
            checkMultipleChoice(question, parseInt(selectedOption.value), container);
        } else {
            showFeedback(container, 'Please select an option.', 'warning');
        }
    });
    
    const hintButton = document.createElement('button');
    hintButton.className = 'interactive-btn';
    hintButton.textContent = 'Show Hint';
    hintButton.addEventListener('click', () => showHint(question.hint, container));
    
    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(hintButton);
    container.appendChild(buttonContainer);
    
    // Feedback area
    const feedback = document.createElement('div');
    feedback.className = 'question-feedback';
    feedback.id = `feedback-${question.id}`;
    container.appendChild(feedback);
}

// Create matching question
function createMatchingQuestion(container, question) {
    const matchingContainer = document.createElement('div');
    matchingContainer.className = 'matching-game';
    
    // Create a shuffled copy of the items
    const shuffledDefinitions = [...question.items]
        .map(item => ({ term: item.term, definition: item.definition }))
        .sort(() => Math.random() - 0.5);
    
    // Create the matching interface
    question.items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'matching-row';
        
        const termDiv = document.createElement('div');
        termDiv.className = 'matching-term';
        termDiv.textContent = item.term;
        
        const selectDiv = document.createElement('div');
        selectDiv.className = 'matching-select';
        
        const select = document.createElement('select');
        select.id = `select-${question.id}-${index}`;
        select.setAttribute('data-term', item.term);
        
        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '-- Select matching definition --';
        select.appendChild(emptyOption);
        
        // Add all definitions as options
        shuffledDefinitions.forEach((shuffledItem, defIndex) => {
            const option = document.createElement('option');
            option.value = shuffledItem.definition;
            option.textContent = shuffledItem.definition;
            select.appendChild(option);
        });
        
        selectDiv.appendChild(select);
        row.appendChild(termDiv);
        row.appendChild(selectDiv);
        matchingContainer.appendChild(row);
    });
    
    container.appendChild(matchingContainer);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const checkButton = document.createElement('button');
    checkButton.className = 'interactive-btn';
    checkButton.textContent = 'Check Answers';
    checkButton.addEventListener('click', () => {
        checkMatchingAnswers(question, container);
    });
    
    const hintButton = document.createElement('button');
    hintButton.className = 'interactive-btn';
    hintButton.textContent = 'Show Hint';
    hintButton.addEventListener('click', () => showHint(question.hint, container));
    
    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(hintButton);
    container.appendChild(buttonContainer);
    
    // Feedback area
    const feedback = document.createElement('div');
    feedback.className = 'question-feedback';
    feedback.id = `feedback-${question.id}`;
    container.appendChild(feedback);
}

// Check short answer
function checkShortAnswer(question, textArea) {
    const userAnswer = textArea.value.trim().toLowerCase();
    
    if (userAnswer.length === 0) {
        showFeedback(textArea.parentElement.parentElement, 'Please enter an answer.', 'warning');
        return;
    }
    
    // Simple check for some keywords in the answer
    const keywordsInAnswer = question.answer.toLowerCase().split(' ')
        .filter(word => word.length > 4); // Only consider words longer than 4 chars as meaningful
    
    // Calculate how many keywords are in the user's answer
    const matchedKeywords = keywordsInAnswer.filter(keyword => 
        userAnswer.includes(keyword.replace(/[.,;:!?]/g, ''))
    );
    
    const matchPercentage = (matchedKeywords.length / keywordsInAnswer.length) * 100;
    
    if (matchPercentage >= 70) {
        showFeedback(textArea.parentElement.parentElement, 
            'Great job! Your answer covers the key points. The model answer is: ' + question.answer, 
            'correct');
    } else if (matchPercentage >= 40) {
        showFeedback(textArea.parentElement.parentElement, 
            'Your answer is partially correct. Consider these details: ' + question.answer, 
            'warning');
    } else {
        showFeedback(textArea.parentElement.parentElement, 
            'Your answer needs more detail. The expected answer is: ' + question.answer, 
            'incorrect');
    }
}

// Check paragraph answer
function checkParagraphAnswer(question, textArea) {
    const userAnswer = textArea.value.trim().toLowerCase();
    
    if (userAnswer.length === 0) {
        showFeedback(textArea.parentElement.parentElement, 'Please enter an answer.', 'warning');
        return;
    }
    
    // Check for each expected point
    const pointsFound = question.expectedPoints.filter(point => {
        // Extract key terms from the expected point
        const keyTerms = point.toLowerCase().split(' ')
            .filter(word => word.length > 4)
            .map(word => word.replace(/[.,;:!?]/g, ''));
        
        // Calculate how many key terms are in the user's answer
        const matchedTerms = keyTerms.filter(term => 
            userAnswer.includes(term)
        );
        
        // Consider the point addressed if at least 40% of key terms are mentioned
        return (matchedTerms.length / keyTerms.length) >= 0.4;
    });
    
    const percentageComplete = (pointsFound.length / question.expectedPoints.length) * 100;
    
    // Show expected points
    const expectedPointsContainer = textArea.parentElement.parentElement.querySelector('.expected-points');
    expectedPointsContainer.style.display = 'block';
    
    if (percentageComplete >= 75) {
        showFeedback(textArea.parentElement.parentElement, 
            `Excellent! You've addressed ${pointsFound.length} out of ${question.expectedPoints.length} key points.`, 
            'correct');
    } else if (percentageComplete >= 40) {
        showFeedback(textArea.parentElement.parentElement, 
            `Good effort! You've addressed ${pointsFound.length} out of ${question.expectedPoints.length} key points. Try to include more details.`, 
            'warning');
    } else {
        showFeedback(textArea.parentElement.parentElement, 
            `Your answer needs more development. You've only addressed ${pointsFound.length} out of ${question.expectedPoints.length} key points.`, 
            'incorrect');
    }
}

// Check multiple choice
function checkMultipleChoice(question, selectedIndex, container) {
    if (selectedIndex === question.correctAnswer) {
        showFeedback(container, 'Correct!', 'correct');
    } else {
        showFeedback(container, 
            `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`, 
            'incorrect');
    }
}

// Check matching answers
function checkMatchingAnswers(question, container) {
    const selects = container.querySelectorAll('select');
    let correctCount = 0;
    
    selects.forEach(select => {
        const term = select.getAttribute('data-term');
        const selectedDefinition = select.value;
        
        // Find the correct definition for this term
        const correctItem = question.items.find(item => item.term === term);
        
        if (correctItem && selectedDefinition === correctItem.definition) {
            select.parentElement.style.backgroundColor = '#e8f5e9'; // Light green
            correctCount++;
        } else if (selectedDefinition) {
            select.parentElement.style.backgroundColor = '#ffebee'; // Light red
        }
    });
    
    if (correctCount === question.items.length) {
        showFeedback(container, 'Perfect! All matches are correct.', 'correct');
    } else {
        const percentage = Math.round((correctCount / question.items.length) * 100);
        showFeedback(container, 
            `You matched ${correctCount} out of ${question.items.length} items correctly (${percentage}%).`, 
            percentage >= 50 ? 'warning' : 'incorrect');
    }
}

// Show feedback
function showFeedback(container, message, type) {
    const feedbackDiv = container.querySelector('.question-feedback');
    
    if (feedbackDiv) {
        feedbackDiv.textContent = message;
        feedbackDiv.className = `question-feedback ${type}`;
        
        // Ensure the feedback is visible
        feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Show hint
function showHint(hintText, container) {
    const existingHint = container.querySelector('.hint-text');
    
    if (existingHint) {
        existingHint.remove();
        return;
    }
    
    const hintDiv = document.createElement('div');
    hintDiv.className = 'hint-text';
    hintDiv.textContent = `Hint: ${hintText}`;
    
    // Find the button container and insert hint before it
    const buttonContainer = container.querySelector('.button-container');
    if (buttonContainer) {
        container.insertBefore(hintDiv, buttonContainer.nextSibling);
    } else {
        container.appendChild(hintDiv);
    }
}
