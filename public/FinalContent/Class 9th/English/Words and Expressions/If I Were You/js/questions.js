/**
 * Questions and interactive exercises for Identity Theft and Detectives
 */

// Reading comprehension questions for Text I (Interview with a Detective)
const textIQuestions = [
    {
        question: "What is the profession of the person being interviewed?",
        options: [
            "Police officer",
            "Private detective",
            "Security guard",
            "Lawyer"
        ],
        correctAnswer: 1,
        explanation: "The person being interviewed is a private detective, as mentioned in the text: 'He is a Manhattan-based, third-generation private detective'."
    },
    {
        question: "Complete the following sentence: As soon as the detective entered the room, he _________",
        options: [
            "examined the place carefully",
            "was vague and uncertain",
            "knew what he was doing",
            "got ready for the interview"
        ],
        correctAnswer: 0,
        explanation: "The text states that 'his eyes silently scanned the room', which indicates he examined the place carefully."
    },
    {
        question: "Which of the following was not a part of the job of the detective?",
        options: [
            "to wander about",
            "to find lost people",
            "to carry guns",
            "to keep a watch"
        ],
        correctAnswer: 2,
        explanation: "The detective explicitly states 'I don't think so. We don't kill people but help them' when asked about carrying guns."
    },
    {
        question: "According to the detective, what are the essential qualities in his profession?",
        type: "text",
        sampleAnswer: "Patience, attention to detail, planning, willingness to make sacrifices",
        evaluationFunction: function(answer) {
            const qualities = ["patience", "attention", "planning", "sacrifices"];
            const userText = answer.toLowerCase();
            return qualities.some(quality => userText.includes(quality));
        },
        explanation: "The detective mentions patience as the number one quality, along with attention to detail, planning, and willingness to make sacrifices."
    },
    {
        question: "What information should the PI have in order to locate someone?",
        options: [
            "Just the name",
            "Name, date of birth, and last known address",
            "Only the social security number",
            "Just the phone number"
        ],
        correctAnswer: 1,
        explanation: "The detective states he needs 'the name with the exact spelling, the DOB if you know it, the social security number, and a last known, official address where they've lived within the past 15 years.'"
    },
    {
        question: "In the sentence 'Under the sanctuary of his aviators', what does 'sanctuary' mean?",
        options: [
            "shelter",
            "shade",
            "hideout",
            "refuge"
        ],
        correctAnswer: 1,
        explanation: "In this context, 'sanctuary' refers to the shade or protection provided by the sunglasses (aviators)."
    }
];

// Reading comprehension questions for Text II (Sharadindu Bandyopadhyay)
const textIIQuestions = [
    {
        question: "Who among the following is not a detective?",
        options: [
            "Byomkesh Bakshi",
            "Sharadindu Bandyopadhyay",
            "Hercule Poirot",
            "Sherlock Holmes"
        ],
        correctAnswer: 1,
        explanation: "Sharadindu Bandyopadhyay is the author who created the fictional detective Byomkesh Bakshi, not a detective himself."
    },
    {
        question: "Sharadindu Bandyopadhyay is known for his:",
        options: [
            "Short stories and novels",
            "Poems and songs",
            "Historical fiction",
            "All of the above"
        ],
        correctAnswer: 3,
        explanation: "The text mentions that he wrote novels, short stories, plays, screenplays, songs, poems, historical fiction, and supernatural stories. However, his forte was short stories and novels."
    },
    {
        question: "State whether true or false: Byomkesh is a 'truth seeker'.",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 0,
        explanation: "The text explicitly states that 'Byomkesh identifies himself as Satyanweshi meaning 'truth seeker' rather than a detective.'"
    },
    {
        question: "What is the role of Ajit in Byomkesh stories?",
        type: "text",
        sampleAnswer: "Ajit is the narrator and companion of Byomkesh, who also investigates in Byomkesh's absence",
        evaluationFunction: function(answer) {
            const keyTerms = ["narrator", "companion", "investigates", "ajit"];
            const userText = answer.toLowerCase();
            return keyTerms.some(term => userText.includes(term));
        },
        explanation: "Ajit Bandhopadhyay is portrayed as the narrator of the stories and a companion of Byomkesh who also investigates in Byomkesh's absence."
    },
    {
        question: "Find the antonyms of the words given below from the text:",
        type: "text",
        sampleAnswer: "natural - supernatural, fact - fiction, passively - actively, discontinued - continued, presence - absence, modern - traditional, unconcerned - concerned",
        evaluationFunction: function(answer) {
            const antonyms = ["supernatural", "fiction", "actively", "continued", "absence", "traditional", "concerned"];
            const userText = answer.toLowerCase();
            return antonyms.some(antonym => userText.includes(antonym));
        },
        explanation: "The text contains several words that have antonyms: supernatural (natural), fiction (fact), traditional (modern), etc."
    }
];

// Initialize questions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load text questions when the thinking-text module is shown
    const textQuestionsContainer = document.getElementById('textQuestions');
    if (textQuestionsContainer) {
        loadTextQuestions(textQuestionsContainer);
    }
    
    // Initialize vocabulary matching
    initVocabularyMatching();
});

// Load text comprehension questions
function loadTextQuestions(container) {
    // Create a single container for all questions
    const questionsHTML = `
        <div id="allQuestions" class="question-set active"></div>
    `;
    
    container.innerHTML = questionsHTML;
    
    // Load all questions in a single container
    const questionsContainer = document.getElementById('allQuestions');
    
    // First add Text I questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Interview with a Detective</h3>';
    loadQuestionSet(questionsContainer, textIQuestions, 'textI');
    
    // Then add Text II questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on Sharadindu Bandyopadhyay</h3>';
    loadQuestionSet(questionsContainer, textIIQuestions, 'textII');
}

// Load a set of questions into a container
function loadQuestionSet(container, questions, prefix) {
    questions.forEach((q, index) => {
        const questionHTML = createQuestionHTML(q, index, prefix);
        container.innerHTML += questionHTML;
    });
    
    // Add submit button
    container.innerHTML += `
        <div class="button-container">
            <button class="interactive-btn" onclick="checkAnswers('${prefix}')">Check Answers</button>
        </div>
        <div id="${prefix}Feedback" class="feedback-message"></div>
    `;
}

// Create HTML for a question
function createQuestionHTML(question, index, prefix) {
    const questionId = `${prefix}-q${index}`;
    
    let optionsHTML = '';
    
    if (question.type === 'text') {
        // Text input question
        optionsHTML = `
            <textarea id="${questionId}" class="question-textarea" rows="4" placeholder="Type your answer here..."></textarea>
        `;
    } else {
        // Multiple choice question
        question.options.forEach((option, optIndex) => {
            optionsHTML += `
                <div class="option">
                    <input type="radio" id="${questionId}-opt${optIndex}" name="${questionId}" value="${optIndex}">
                    <label for="${questionId}-opt${optIndex}">${option}</label>
                </div>
            `;
        });
    }
    
    return `
        <div class="question-item" data-question-index="${index}">
            <div class="question-text">${index + 1}. ${question.question}</div>
            <div class="question-options">
                ${optionsHTML}
            </div>
            <div class="question-feedback" id="${questionId}-feedback"></div>
        </div>
    `;
}

// Check answers for a question set
function checkAnswers(prefix) {
    const questions = prefix === 'textI' ? textIQuestions : textIIQuestions;
    let correctCount = 0;
    
    questions.forEach((question, index) => {
        const questionId = `${prefix}-q${index}`;
        const feedbackEl = document.getElementById(`${questionId}-feedback`);
        
        if (question.type === 'text') {
            // Text input question
            const userAnswer = document.getElementById(questionId).value.trim();
            const isCorrect = question.evaluationFunction(userAnswer);
            
            feedbackEl.textContent = isCorrect ? 
                '✓ Correct!' : 
                `✗ Sample answer: ${question.sampleAnswer}`;
            feedbackEl.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            
            if (isCorrect) correctCount++;
        } else {
            // Multiple choice question
            const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
            
            if (selectedOption) {
                const userAnswer = parseInt(selectedOption.value);
                const isCorrect = userAnswer === question.correctAnswer;
                
                feedbackEl.textContent = isCorrect ? 
                    '✓ Correct!' : 
                    `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`;
                feedbackEl.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
                
                if (isCorrect) correctCount++;
            } else {
                feedbackEl.textContent = 'Please select an answer.';
                feedbackEl.className = 'question-feedback warning';
            }
        }
    });
    
    // Show overall feedback
    const feedbackContainer = document.getElementById(`${prefix}Feedback`);
    feedbackContainer.textContent = `You got ${correctCount} out of ${questions.length} questions correct!`;
    feedbackContainer.className = 'feedback-message show';
    feedbackContainer.classList.add(correctCount === questions.length ? 'success' : 'error');
    
    // Update progress if all correct
    if (correctCount === questions.length) {
        if (typeof updateProgress === 'function') {
            updateProgress('thinking-text', 20);
        }
        if (typeof showAchievement === 'function') {
            showAchievement('Reading Comprehension Master!');
        }
    }
}

// Initialize vocabulary matching
function initVocabularyMatching() {
    let selectedTerm = null;
    let selectedDef = null;
    
    window.selectMatch = function(element, type) {
        if (element.classList.contains('correct')) {
            return; // Already matched correctly
        }
        
        if (type === 'term') {
            // Deselect previous term if any
            if (selectedTerm) {
                selectedTerm.classList.remove('selected');
            }
            
            // Select this term
            element.classList.add('selected');
            selectedTerm = element;
        } else {
            // Deselect previous definition if any
            if (selectedDef) {
                selectedDef.classList.remove('selected');
            }
            
            // Select this definition
            element.classList.add('selected');
            selectedDef = element;
        }
        
        // Check if we have both a term and definition selected
        if (selectedTerm && selectedDef) {
            checkMatch();
        }
    };
    
    function checkMatch() {
        const termMatch = selectedTerm.getAttribute('data-match');
        const defMatch = selectedDef.getAttribute('data-match');
        
        if (termMatch === defMatch) {
            // Correct match
            selectedTerm.classList.remove('selected');
            selectedDef.classList.remove('selected');
            
            selectedTerm.classList.add('correct');
            selectedDef.classList.add('correct');
            
            // Check if all items are matched
            const allMatched = document.querySelectorAll('.match-item:not(.correct)').length === 0;
            
            if (allMatched) {
                const feedbackEl = document.getElementById('matchFeedback');
                if (feedbackEl) {
                    feedbackEl.textContent = 'Great job! You matched all the vocabulary words correctly!';
                    feedbackEl.className = 'feedback-message show success';
                    
                    if (typeof updateProgress === 'function') {
                        updateProgress('thinking-language', 10);
                    }
                    if (typeof showAchievement === 'function') {
                        showAchievement('Vocabulary Master!');
                    }
                }
            }
        } else {
            // Incorrect match
            selectedTerm.classList.remove('selected');
            selectedDef.classList.remove('selected');
            
            selectedTerm.classList.add('incorrect');
            selectedDef.classList.add('incorrect');
            
            // Remove incorrect class after a short delay
            setTimeout(() => {
                selectedTerm.classList.remove('incorrect');
                selectedDef.classList.remove('incorrect');
            }, 1000);
        }
        
        // Reset selections
        selectedTerm = null;
        selectedDef = null;
    }
}
