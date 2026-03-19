/**
 * Questions and assessment functionality for Kathmandu lesson
 */

// Text I questions
const textIQuestions = [
    {
        id: "q1",
        type: "mcq",
        question: "Tourism is about taking a tour",
        options: [
            "to a place under an expert guide",
            "for hiking in remote places",
            "for visiting a place for sightseeing",
            "All of the above"
        ],
        correctAnswer: 3, // 0-based index, so 3 is option D - "All of the above"
        explanation: "According to the text, tourism involves all of these activities. The text mentions 'taking a study tour under an expert guide', 'hiking in a wilderness park', and 'visiting a particular place for sightseeing'."
    },
    {
        id: "q2",
        type: "mcq",
        question: "By 'hiking in wilderness' the author means",
        options: [
            "taking a long distance walk in abandoned areas",
            "walk in the forest areas",
            "marathon in uninhabited areas",
            "sprinting in abandoned, uninhabited areas"
        ],
        correctAnswer: 1, // Option B - "walk in the forest areas"
        explanation: "Hiking in wilderness typically refers to walking in undeveloped natural areas like forests, which best matches option B."
    },
    {
        id: "q3",
        type: "mcq",
        question: "A cruise ship is",
        options: [
            "a large ship that carries people on voyages of pleasure.",
            "a big ship that carries people and goods on special mission.",
            "a large watercraft for carrying passengers from one point to another.",
            "a large ship that carries mail, goods and first aid facilities."
        ],
        correctAnswer: 0, // Option A - "a large ship that carries people on voyages of pleasure."
        explanation: "In the context of tourism, a cruise ship is used for pleasure voyages, which is described in option A."
    },
    {
        id: "q4",
        type: "shortAnswer",
        question: "What all activities do tourists engage in?",
        sampleAnswer: "According to the text, tourists engage in various sports, sunbathing, talking, singing, taking rides, touring, reading or simply enjoying themselves. They may also participate in conventions, business conferences, professional activities, or take study tours under expert guides."
    },
    {
        id: "q5",
        type: "shortAnswer",
        question: "What are the forms of transportation tourists use for visiting places?",
        sampleAnswer: "The text mentions various forms of transportation including hiking, flying in a jet, taking a chairlift, cruise ships, cars, motor coaches, campers, trains, motorbikes, and bicycles."
    }
];

// Text II questions
const textIIQuestions = [
    {
        id: "q6",
        type: "mcq",
        question: "Why is Saturday described as that distinguished Saturday?",
        options: [
            "because the much awaited Saturday has come when the voyage has to start.",
            "because Saturday was a holiday.",
            "because it is on Saturday that people were allowed to board the ship.",
            "because it is in the afternoon on Saturday that ship would start the voyage."
        ],
        correctAnswer: 0, // Option A
        explanation: "The text suggests that this was a special day when the voyage was set to begin, making option A the most appropriate."
    },
    {
        id: "q7",
        type: "mcq",
        question: "Who are excursionists?",
        options: [
            "They are the research students.",
            "They are pilgrims.",
            "They are musicians.",
            "They are tourists on a leisure trip."
        ],
        correctAnswer: 3, // Option D - "They are tourists on a leisure trip."
        explanation: "The passage describes a 'pleasure excursion' and the excursionists are people taking part in this leisure trip."
    },
    {
        id: "q8",
        type: "shortAnswer",
        question: "What was the mood of the people on the ship?",
        sampleAnswer: "The mood of the people on the ship was gloomy and miserable. The text describes them as 'moping about in a drizzling rain and looking as droopy and woebegone as so many molting chickens'. The author calls it 'the bluest, bluest spectacle'."
    },
    {
        id: "q9",
        type: "shortAnswer",
        question: "What was the author looking forward to?",
        sampleAnswer: "Based on the text, the author was looking forward to a 'pleasure excursion' as mentioned in the program. However, he notes that the atmosphere on board didn't match this expectation, indicating disappointment that the reality didn't match the anticipated enjoyment."
    },
    {
        id: "q10",
        type: "matching",
        question: "Match the words/phrases with their images:",
        pairs: [
            { term: "Pier", definition: "[Image of a pier]" },
            { term: "deck", definition: "[Image of a ship deck]" },
            { term: "carriage", definition: "[Image of a carriage]" },
            { term: "valise", definition: "[Image of a valise/suitcase]" },
            { term: "mast", definition: "[Image of a ship mast]" }
        ]
    }
];

// Combine all questions
const allQuestions = [...textIQuestions, ...textIIQuestions];

// Load questions when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Find question container
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) {
        console.error('Questions container not found');
        return;
    }
    
    // Generate HTML for text I questions
    const textIHTML = generateQuestionsHTML(textIQuestions, "Text I Questions");
    
    // Generate HTML for text II questions
    const textIIHTML = generateQuestionsHTML(textIIQuestions, "Text II Questions");
    
    // Combine and insert into the container
    questionsContainer.innerHTML = textIHTML + textIIHTML;
    
    // Add event listeners for the MCQ questions
    document.querySelectorAll('.mcq-option').forEach(option => {
        option.addEventListener('click', handleMCQSelection);
    });
    
    // Add event listeners for the submit short answer buttons
    document.querySelectorAll('.submit-short-answer').forEach(button => {
        button.addEventListener('click', handleShortAnswerSubmission);
    });
    
    // Add event listeners for showing sample answers
    document.querySelectorAll('.show-sample-answer').forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question-id');
            const sampleAnswerElement = document.getElementById(`sample-${questionId}`);
            
            if (sampleAnswerElement) {
                if (sampleAnswerElement.style.display === 'block') {
                    sampleAnswerElement.style.display = 'none';
                    this.textContent = 'Show Sample Answer';
                } else {
                    sampleAnswerElement.style.display = 'block';
                    this.textContent = 'Hide Sample Answer';
                }
            }
        });
    });
});

// Generate HTML for a set of questions
function generateQuestionsHTML(questions, sectionTitle) {
    let html = `<h3 class="questions-section-title">${sectionTitle}</h3>`;
    
    // Add progress tracking
    html += generateProgressTracker(questions);
    
    questions.forEach((question, index) => {
        html += `<div class="question-item" id="${question.id}-container">`;
        html += `<h4 class="question-text">${question.question}</h4>`;
        
        if (question.type === 'mcq') {
            html += `<div class="mcq-options">`;
            question.options.forEach((option, optIndex) => {
                const optionLetter = String.fromCharCode(65 + optIndex); // A, B, C, D...
                html += `
                    <div class="mcq-option" data-question-id="${question.id}" data-option-index="${optIndex}">
                        <span class="option-letter">${optionLetter}</span>
                        <span class="option-text">${option}</span>
                    </div>
                `;
            });
            html += `</div>`;
            html += `<div class="feedback" id="feedback-${question.id}"></div>`;
            html += `<div class="explanation" id="explanation-${question.id}">${question.explanation}</div>`;
        } 
        else if (question.type === 'shortAnswer') {
            html += `
                <textarea class="short-answer-input" id="input-${question.id}" rows="4" placeholder="Write your answer here..."></textarea>
                <div class="button-row">
                    <button class="interactive-btn submit-short-answer" data-question-id="${question.id}">Submit Answer</button>
                    <button class="interactive-btn show-sample-answer" data-question-id="${question.id}">Show Sample Answer</button>
                </div>
                <div class="sample-answer" id="sample-${question.id}">${question.sampleAnswer}</div>
                <div class="feedback" id="feedback-${question.id}"></div>
            `;
        }
        else if (question.type === 'matching') {
            // Enhanced matching question UI
            html += `
                <div class="matching-exercise">
                    <div class="matching-instructions">
                        <p>Match the terms with their corresponding definitions by selecting them.</p>
                    </div>
                    <div class="match-container">
                        <div class="match-terms">
                            ${question.pairs.map((pair, pairIndex) => `
                                <div class="match-term" data-term-id="${question.id}-${pairIndex}">
                                    ${pair.term}
                                </div>
                            `).join('')}
                        </div>
                        <div class="match-definitions">
                            ${question.pairs.map((pair, pairIndex) => `
                                <div class="match-definition" data-def-id="${question.id}-${pairIndex}">
                                    ${pair.definition}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="feedback" id="feedback-${question.id}"></div>
            `;
        }
        
        html += `</div>`;
    });
    
    return html;
}

// Generate progress tracker for questions
function generateProgressTracker(questions) {
    let html = `<div class="question-progress">`;
    
    questions.forEach((question, index) => {
        const isFirst = index === 0;
        const isLast = index === questions.length - 1;
        
        if (!isFirst) {
            html += `<div class="progress-line"><div class="progress-line-fill" id="progress-line-${index}" style="width: 0%"></div></div>`;
        }
        
        html += `
            <div class="progress-step" id="progress-step-${question.id}" data-step="${index + 1}">
                <div class="progress-circle">${index + 1}</div>
            </div>
        `;
    });
    
    html += `</div>`;
    return html;
}

// Handle MCQ option selection
function handleMCQSelection() {
    const questionId = this.getAttribute('data-question-id');
    const selectedOptionIndex = parseInt(this.getAttribute('data-option-index'));
    
    // Find the question
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) {
        console.error(`Question not found: ${questionId}`);
        return;
    }
    
    // Get all options for this question
    const options = document.querySelectorAll(`[data-question-id="${questionId}"]`);
    
    // Remove any previous selection
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark this option as selected
    this.classList.add('selected');
    
    // Check if answer is correct
    const isCorrect = selectedOptionIndex === question.correctAnswer;
    
    // Add correct/incorrect class
    this.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Show feedback
    const feedbackElement = document.getElementById(`feedback-${questionId}`);
    if (feedbackElement) {
        feedbackElement.textContent = isCorrect ? 'Correct! Well done!' : 'Incorrect. Try again.';
        feedbackElement.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
        
        // Show explanation if answer is correct
        const explanationElement = document.getElementById(`explanation-${questionId}`);
        if (explanationElement) {
            explanationElement.style.display = isCorrect ? 'block' : 'none';
        }
    }
    
    // Update score if correct
    if (isCorrect) {
        updateScore(5); // Add 5 points for a correct MCQ answer
        
        // Update progress tracker
        updateProgressTracker(questionId);
        
        // Add completion animation to question item
        const questionItem = document.getElementById(`${questionId}-container`);
        if (questionItem) {
            questionItem.classList.add('question-completed');
        }
    }
    
    // If answer is incorrect, highlight the correct option after a delay
    if (!isCorrect) {
        setTimeout(() => {
            options.forEach((option, index) => {
                if (index === question.correctAnswer) {
                    option.classList.add('correct-answer');
                }
            });
        }, 1000);
    }
    
    // Narrate feedback if narrator is available
    if (window.narrator) {
        window.narrator.speak(isCorrect ? 
            'Correct! Well done. Let\'s move to the next question.' : 
            'That\'s not quite right. Please try again.');
    }
    
    // Scroll to the next question if correct
    if (isCorrect) {
        scrollToNextQuestion(questionId);
    }
}

// Handle short answer submission
function handleShortAnswerSubmission() {
    const questionId = this.getAttribute('data-question-id');
    const inputElement = document.getElementById(`input-${questionId}`);
    
    if (!inputElement) {
        console.error(`Input element not found for question: ${questionId}`);
        return;
    }
    
    const userAnswer = inputElement.value.trim();
    
    // Check if answer is not empty
    if (userAnswer.length < 20) {
        // Show feedback
        const feedbackElement = document.getElementById(`feedback-${questionId}`);
        if (feedbackElement) {
            feedbackElement.textContent = 'Please provide a more detailed answer (at least 20 characters).';
            feedbackElement.className = 'feedback warning';
        }
        return;
    }
    
    // Accept any non-empty answer as valid for short answer questions
    // In a real implementation, you might want to use AI or keyword matching
    
    // Show feedback
    const feedbackElement = document.getElementById(`feedback-${questionId}`);
    if (feedbackElement) {
        feedbackElement.textContent = 'Answer submitted. Check the sample answer to compare with your response.';
        feedbackElement.className = 'feedback success';
    }
    
    // Update score
    updateScore(10); // Add 10 points for submitting a short answer
    
    // Update progress tracker
    updateProgressTracker(questionId);
    
    // Add completion animation to question item
    const questionItem = document.getElementById(`${questionId}-container`);
    if (questionItem) {
        questionItem.classList.add('question-completed');
        
        // Automatically show the sample answer
        const sampleAnswerElement = document.getElementById(`sample-${questionId}`);
        if (sampleAnswerElement) {
            sampleAnswerElement.style.display = 'block';
            
            // Update button text
            const showSampleButton = document.querySelector(`.show-sample-answer[data-question-id="${questionId}"]`);
            if (showSampleButton) {
                showSampleButton.textContent = 'Hide Sample Answer';
            }
        }
    }
    
    // Narrate feedback if narrator is available
    if (window.narrator) {
        window.narrator.speak('Thank you for your answer. You can compare it with our sample answer below.');
    }
    
    // Scroll to the next question
    scrollToNextQuestion(questionId);
}

// Update score
function updateScore(points) {
    if (typeof score !== 'undefined') {
        score += points;
        const scoreElement = document.getElementById('totalScore');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    } else {
        console.warn('Score variable not found. Make sure main.js is loaded first.');
    }
    
    // Check if all questions in a section have been answered
    checkSectionCompletion();
}

// Update progress tracker UI
function updateProgressTracker(questionId) {
    // Find the current question in the array
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    // Find the index of the question in its section
    const isTextI = textIQuestions.some(q => q.id === questionId);
    const questionSet = isTextI ? textIQuestions : textIIQuestions;
    const index = questionSet.findIndex(q => q.id === questionId);
    
    // Update the progress step to completed
    const progressStep = document.getElementById(`progress-step-${questionId}`);
    if (progressStep) {
        progressStep.classList.add('completed');
    }
    
    // Find the next question in the sequence
    const nextIndex = index + 1;
    if (nextIndex < questionSet.length) {
        const nextQuestion = questionSet[nextIndex];
        const nextProgressStep = document.getElementById(`progress-step-${nextQuestion.id}`);
        if (nextProgressStep) {
            nextProgressStep.classList.add('current');
        }
        
        // Update the progress line
        const progressLine = document.getElementById(`progress-line-${nextIndex}`);
        if (progressLine) {
            progressLine.style.width = '100%';
        }
    }
    
    // Check if this was the last question in the section
    if (index === questionSet.length - 1) {
        // This was the last question, check if the other section is also complete
        const otherSection = isTextI ? textIIQuestions : textIQuestions;
        const otherSectionCompleted = otherSection.every(q => {
            const step = document.getElementById(`progress-step-${q.id}`);
            return step && step.classList.contains('completed');
        });
        
        if (otherSectionCompleted) {
            // Both sections are complete!
            completeSections();
        } else {
            // Only this section is complete
            const sectionTitle = isTextI ? "Text I" : "Text II";
            showAchievement(`${sectionTitle} Section Completed!`);
        }
    }
}

// Scroll to the next question
function scrollToNextQuestion(currentQuestionId) {
    // Find the current question in the array
    const allQuestionIds = allQuestions.map(q => q.id);
    const currentIndex = allQuestionIds.indexOf(currentQuestionId);
    
    if (currentIndex < allQuestionIds.length - 1) {
        // There is a next question
        const nextQuestionId = allQuestionIds[currentIndex + 1];
        const nextQuestionContainer = document.getElementById(`${nextQuestionId}-container`);
        
        if (nextQuestionContainer) {
            // Add a small delay for better UX
            setTimeout(() => {
                nextQuestionContainer.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Add a visual focus indicator
                nextQuestionContainer.classList.add('question-focus');
                setTimeout(() => {
                    nextQuestionContainer.classList.remove('question-focus');
                }, 1500);
            }, 800);
        }
    }
}

// Complete all sections
function completeSections() {
    // Add a celebratory animation or effect
    document.querySelectorAll('.question-item').forEach(item => {
        item.classList.add('all-completed');
    });
    
    // Show completion message
    showAchievement('Reading Comprehension Module Completed!');
    
    // Add module to completed list
    if (!modulesCompleted.includes('thinking-text')) {
        modulesCompleted.push('thinking-text');
        updateProgress();
    }
    
    // Narrate completion if narrator is available
    if (window.narrator) {
        window.narrator.speak('Congratulations! You have completed all the reading comprehension questions.');
    }
}

// Check if all questions in a section have been completed
function checkSectionCompletion() {
    // Check how many questions are completed
    const completedQuestions = document.querySelectorAll('.question-completed').length;
    const totalQuestions = allQuestions.length;
    
    // Update the progress based on completion percentage
    const completionPercentage = (completedQuestions / totalQuestions) * 100;
    
    // Only mark as complete if all questions are answered
    if (completedQuestions === totalQuestions) {
        if (!modulesCompleted.includes('thinking-text')) {
            modulesCompleted.push('thinking-text');
            updateProgress();
            showAchievement('Reading Comprehension Module Completed!');
        }
    }
}
