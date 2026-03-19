/**
 * Questions and interactive exercises for The Snake Chapter
 */

// Reading comprehension questions for The Miraculous Escape Part 1
const miracEscapePt1Questions = [
    {
        question: "What made the narrator go on a voyage?",
        options: [
            "He was rich and satisfied with his life",
            "He felt bored of his idle life",
            "He had urge to go on a voyage",
            "All of the above"
        ],
        correctAnswer: 3,
        explanation: "The narrator mentions being wealthy, feeling bored of his idle life, and having a strong urge to go on a voyage that grew stronger day by day."
    },
    {
        question: "How did the narrator and his friends feed themselves on the island?",
        options: [
            "They ate fish",
            "They could not find anything to eat",
            "They ate fruits to survive",
            "They ate the food they had brought with themselves"
        ],
        correctAnswer: 2,
        explanation: "As stated in the passage, 'We were fortunate enough to find fruit trees and a stream of fresh and cool water which gave us strength and energy and relieved us from hunger.'"
    },
    {
        question: "Why was the captain reluctant to anchor at the island?",
        options: [
            "It was a much dreaded place",
            "The water was too shallow",
            "There were no harbors",
            "The inhabitants were hostile"
        ],
        correctAnswer: 0,
        explanation: "The text states that 'The captain of the ship was reluctant to cast anchor at the port as it was a much dreaded place.'"
    },
    {
        question: "What happened when they went to sleep on the island?",
        options: [
            "They were attacked by wild animals",
            "They were startled by a rustling sound from a serpent",
            "They were disturbed by the storm",
            "They were ambushed by islanders"
        ],
        correctAnswer: 1,
        explanation: "According to the passage, they 'were soon startled by a rustle which came from a very long and huge python like serpent gliding swiftly towards us.'"
    },
    {
        question: "Find words from the story that mean 'extremely severe or intense'.",
        type: "text",
        sampleAnswer: "terrific",
        evaluationFunction: function(answer) {
            const correctTerms = ["terrific", "terrific/terrible"];
            const userTerms = answer.toLowerCase().trim();
            return correctTerms.some(term => userTerms.includes(term));
        },
        explanation: "The word 'terrific' in the passage means 'extremely severe or intense' as described in the vocabulary note."
    }
];

// Reading comprehension questions for The Miraculous Escape Part 2
const miracEscapePt2Questions = [
    {
        question: "The narrator and his companions were on the tree. The serpent swallowed his companion but not the narrator. Why?",
        options: [
            "The narrator was at a higher position on the tree",
            "The serpent was full after eating one companion",
            "The narrator had a weapon to defend himself",
            "The serpent couldn't see the narrator"
        ],
        correctAnswer: 0,
        explanation: "The text states that the serpent 'reached my other companion who was positioned somewhat lower than me on the tree.' This indicates the narrator's higher position saved him."
    },
    {
        question: "How did the narrator save himself from the serpent?",
        options: [
            "By hiding underwater",
            "By creating a defensive structure around himself",
            "By fighting the serpent with weapons",
            "By running away from the island"
        ],
        correctAnswer: 1,
        explanation: "The narrator collected dry wood and bushes, arranged them in a circular structure around the tree, and created a tent-like protective structure that the serpent could not penetrate."
    },
    {
        question: "Why couldn't the narrator leave his fortress immediately after the serpent left at dawn?",
        options: [
            "He was paralyzed with fear",
            "He was almost suffocated inside",
            "The serpent was still watching",
            "The structure was too complex to open quickly"
        ],
        correctAnswer: 1,
        explanation: "The text says 'I lay there half dead and almost suffocated' indicating he was unable to breathe properly inside his protective structure."
    },
    {
        question: "How was the narrator finally rescued?",
        options: [
            "Local islanders helped him",
            "He built a raft and escaped",
            "He was spotted by sailors on a passing ship",
            "Another merchant ship came looking for him"
        ],
        correctAnswer: 2,
        explanation: "The narrator saw a ship sailing at some distance, shouted wildly, took off his shirt and waved it, which attracted the sailors on the ship who sent a rescue boat for him."
    },
    {
        question: "Find words from the story which mean the opposite of 'offensive'.",
        type: "text",
        sampleAnswer: "defensive",
        evaluationFunction: function(answer) {
            const correctTerms = ["defensive"];
            const userTerms = answer.toLowerCase().trim();
            return correctTerms.some(term => userTerms.includes(term));
        },
        explanation: "The word 'defensive' in the passage is the opposite of 'offensive' as it refers to serving to protect or defend."
    }
];

// Questions about the snake poems
const snakePoemQuestions = [
    {
        question: "How is the snake portrayed in 'The Snake Trying' poem?",
        options: [
            "As a dangerous predator",
            "As a beautiful and graceful creature that is harmless",
            "As a symbolic representation of evil",
            "As a mystical creature with supernatural powers"
        ],
        correctAnswer: 1,
        explanation: "The poem describes the snake as 'beautiful', 'graceful', 'small and green', and explicitly states it is 'harmless even to children.'"
    },
    {
        question: "What is the central message of 'The Snake Trying' poem?",
        options: [
            "Snakes should be killed to protect humans",
            "Humans should let the harmless snake escape without hurting it",
            "People should stay away from all snakes",
            "Snakes are misunderstood creatures"
        ],
        correctAnswer: 1,
        explanation: "The poem pleads 'O let him go over the water into the reeds to hide without hurt,' clearly advocating for allowing the harmless snake to escape unharmed."
    },
    {
        question: "From whose perspective is the 'Green Snake' poem written?",
        options: [
            "A human observer watching the snake",
            "The snake itself",
            "A scientist studying snakes",
            "A child afraid of snakes"
        ],
        correctAnswer: 1,
        explanation: "The poem is written in first person from the snake's perspective, beginning with 'I am tired of being a sinuous body in the grass...' and continuing with the snake's thoughts."
    },
    {
        question: "In the poem 'Green Snake', why does the snake think humans fear it?",
        options: [
            "Because it is venomous",
            "Because it moves in a threatening manner",
            "Because it enters human homes",
            "Because they fear the mystery"
        ],
        correctAnswer: 3,
        explanation: "The poem ends with the snake stating that humans 'fear the serpent because they fear the mystery.'"
    },
    {
        question: "Compare the attitudes toward snakes presented in both poems.",
        type: "text",
        sampleAnswer: "The Snake Trying shows sympathy for the snake and sees its beauty, while Green Snake shows the snake's perspective on being feared and misunderstood by humans.",
        evaluationFunction: function(answer) {
            const keyTerms = ["beauty", "sympathy", "perspective", "fear", "misunderstood"];
            const userAnswer = answer.toLowerCase();
            return keyTerms.some(term => userAnswer.includes(term)) && answer.length >= 20;
        },
        explanation: "The first poem shows sympathy for the snake and appreciates its beauty and harmlessness, while the second poem presents the snake's own perspective on being feared and misunderstood by humans who fear the mystery it represents."
    }
];

// Reported Speech exercise answers
const reportedSpeechAnswers = {
    q1: "Once an old man asked a young boy who he thought were the most intelligent people.",
    q2: "The young man asked in return who the old man thought so.",
    q3: "The old man asked how sons and daughters could be intelligent without learning from their parents.",
    q4: "The young man asked how the old man as a parent had learned.",
    q5: "The old man asked why the young man was hijacking his question by asking him back."
};

// Editing exercise answers (prepositions)
const editingAnswers = {
    edit1: "for",
    edit2: "up",
    edit3: "at",
    edit4: "from",
    edit5: "at",
    edit6: "from",
    edit7: "out of"
};

// Initialize questions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load text questions when the reading-comprehension module is shown
    const textQuestionsContainer = document.getElementById('textQuestions');
    if (textQuestionsContainer) {
        loadTextQuestions(textQuestionsContainer);
    }
    
    // Initialize reported speech checking
    initReportedSpeechChecking();
    
    // Initialize fear vocabulary activity
    initFearVocabulary();
    
    // Initialize suffix checking
    initSuffixChecking();
    
    // Initialize editing exercise
    initEditingExercise();
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
    
    // First add Part 1 questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on The Miraculous Escape (Part 1)</h3>';
    loadQuestionSet(questionsContainer, miracEscapePt1Questions, 'part1');
    
    // Then add Part 2 questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on The Miraculous Escape (Part 2)</h3>';
    loadQuestionSet(questionsContainer, miracEscapePt2Questions, 'part2');
    
    // Then add Snake Poems questions
    questionsContainer.innerHTML += '<h3 class="question-section-title">Questions on The Snake Poems</h3>';
    loadQuestionSet(questionsContainer, snakePoemQuestions, 'poems');
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

// This function is no longer needed since we're showing all questions at once
// Keeping it for compatibility with existing code
function showQuestionSet(setId) {
    // No longer needed, but keeping the function for compatibility
    console.log(`showQuestionSet called with ${setId}, but all questions are now shown at once`);
}

// Check answers for a question set
function checkAnswers(prefix) {
    let questions;
    
    if (prefix === 'part1') {
        questions = miracEscapePt1Questions;
    } else if (prefix === 'part2') {
        questions = miracEscapePt2Questions;
    } else if (prefix === 'poems') {
        questions = snakePoemQuestions;
    } else {
        console.error('Unknown question set prefix:', prefix);
        return;
    }
    
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
            updateProgress('reading-comprehension', 20);
        }
    }
}

// Initialize reported speech checking
function initReportedSpeechChecking() {
    window.checkReportedSpeech = function() {
        let correctCount = 0;
        let totalCount = 0;
        
        Object.keys(reportedSpeechAnswers).forEach(id => {
            const textarea = document.getElementById(id);
            if (textarea) {
                totalCount++;
                const userAnswer = textarea.value.trim();
                const correctAnswer = reportedSpeechAnswers[id];
                
                // Check if the answer is close enough (case insensitive and ignoring minor punctuation differences)
                const normalizedUserAnswer = userAnswer.toLowerCase().replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
                const normalizedCorrectAnswer = correctAnswer.toLowerCase().replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
                
                const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer || 
                                  normalizedCorrectAnswer.includes(normalizedUserAnswer) || 
                                  normalizedUserAnswer.includes(normalizedCorrectAnswer);
                
                textarea.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
                if (isCorrect) correctCount++;
            }
        });
        
        const feedbackEl = document.getElementById('reportedSpeechFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${totalCount} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === totalCount ? 'success' : 'error');
            
            if (correctCount === totalCount && typeof updateProgress === 'function') {
                updateProgress('vocabulary-grammar', 10);
            }
        }
    };
}

// Initialize fear vocabulary activity
function initFearVocabulary() {
    window.checkFearVocabulary = function() {
        const fearWords = ["terrific", "terrible", "frightened", "alarmed", "terror", "danger", "scared", "horror"];
        const tiredWords = ["exhausted", "tired", "weary", "fatigued", "drained"];
        
        const fearInput = document.getElementById('fearWords');
        const tiredInput = document.getElementById('tiredWords');
        
        if (!fearInput || !tiredInput) return;
        
        const userFearWords = fearInput.value.trim().toLowerCase().split(/[,;\s]+/).filter(w => w.length > 0);
        const userTiredWords = tiredInput.value.trim().toLowerCase().split(/[,;\s]+/).filter(w => w.length > 0);
        
        const fearMatches = userFearWords.filter(word => fearWords.includes(word));
        const tiredMatches = userTiredWords.filter(word => tiredWords.includes(word));
        
        let message = '';
        let isSuccess = false;
        
        if (fearMatches.length >= 3 && tiredMatches.length >= 2) {
            message = 'Great job! You identified enough words in both categories.';
            isSuccess = true;
        } else {
            message = `You need to identify at least 3 fear words and 2 tired words. You found ${fearMatches.length} fear words and ${tiredMatches.length} tired words.`;
        }
        
        const feedbackEl = document.getElementById('fearVocabFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = message;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(isSuccess ? 'success' : 'error');
            
            if (isSuccess && typeof updateProgress === 'function') {
                updateProgress('vocabulary-grammar', 10);
            }
        }
    };
}

// Initialize suffix checking
function initSuffixChecking() {
    window.checkSuffixes = function() {
        const validSuffixes = ["ful", "less", "ous", "some", "ly", "ness", "y", "en"];
        const inputs = document.querySelectorAll('.suffix-input');
        let correctCount = 0;
        
        inputs.forEach(input => {
            const userSuffix = input.value.trim().toLowerCase();
            const isValid = validSuffixes.includes(userSuffix);
            
            input.style.borderColor = isValid ? '#4caf50' : '#f44336';
            if (isValid) correctCount++;
        });
        
        const feedbackEl = document.getElementById('suffixFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${inputs.length} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount >= 5 ? 'success' : 'error');
            
            if (correctCount >= 5 && typeof updateProgress === 'function') {
                updateProgress('vocabulary-grammar', 10);
            }
        }
    };
}

// Initialize editing exercise
function initEditingExercise() {
    window.checkEditing = function() {
        const inputs = document.querySelectorAll('.editing-input');
        let correctCount = 0;
        
        inputs.forEach(input => {
            const id = input.id;
            const correctAnswer = editingAnswers[id];
            const userAnswer = input.value.trim();
            
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                input.style.borderColor = '#4caf50';
                correctCount++;
            } else {
                input.style.borderColor = '#f44336';
            }
        });
        
        const feedbackEl = document.getElementById('editingFeedback');
        if (feedbackEl) {
            feedbackEl.textContent = `You got ${correctCount} out of ${inputs.length} correct!`;
            feedbackEl.className = 'feedback-message show';
            feedbackEl.classList.add(correctCount === inputs.length ? 'success' : 'error');
            
            if (correctCount === inputs.length && typeof updateProgress === 'function') {
                updateProgress('vocabulary-grammar', 10);
            }
        }
    };
}

// Save reflection
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    
    if (reflectionText.length < 20) {
        const feedbackEl = document.getElementById('reflectionFeedback');
        feedbackEl.textContent = 'Please write a more detailed reflection (at least 20 characters).';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('reflectionFeedback');
    feedbackEl.textContent = 'Your reflection has been saved!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('lets-begin', 15);
    }
}

// Save listening notes
function saveListeningNotes() {
    const notes = document.getElementById('listeningNotes').value.trim();
    const narrative = document.getElementById('narrativeAccount').value.trim();
    
    if (notes.length < 20 || narrative.length < 50) {
        alert('Please write more detailed notes and narrative account.');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    alert('Your notes and narrative account have been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
}

// Save writing
function saveWriting() {
    const writing = document.getElementById('writingPad').value.trim();
    
    if (writing.length < 100) {
        alert('Please write a more detailed story (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your story has been saved!');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 15);
    }
}

// Record speaking response
function recordSpeaking() {
    // In a real app, this would access the microphone and record audio
    alert('In a real implementation, this would record your spoken response using the Web Audio API.');
    
    // Update progress
    if (typeof updateProgress === 'function') {
        updateProgress('activities', 10);
    }
}

// Play listening activity
function playListeningActivity() {
    // In a real app, this would play an audio file
    alert('In a real implementation, this would play the audio about the brave child Shrawan Kumar.');
}

// Show resource
function showResource(resourceId) {
    // In a real app, this would show or load a specific resource
    alert(`In a real implementation, this would show the resource: ${resourceId}`);
}
