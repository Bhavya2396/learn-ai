/**
 * Interactive activities for Nelson Mandela: Long Walk to Freedom lesson
 */

// Data for vocabulary matching activity
const vocabularyTerms = {
    "rainbow gathering": "A beautiful coming together of various peoples, like the colors in a rainbow",
    "seat of white supremacy": "The centre of racial superiority",
    "overwhelmed with a sense of history": "Feel deeply emotional, remembering and understanding all the past events that have led up to the moment",
    "resilience that defies the imagination": "A great ability (almost unimaginable) to remain unchanged by suffering (not losing hope, goodness or courage)",
    "glimmer of humanity": "A sign of human feeling (goodness, kindness, pity, justice, etc.)",
    "twilight existence": "A half-secret life, like a life lived in the fading light between sunset and darkness"
};

// Data for the balance/contrast sentence completion activity
const contrastSentences = [
    {
        start: "For decades the Union Buildings had been the seat of white supremacy,",
        complete: "and now it was the site of a rainbow gathering of different colours and nations for the installation of South Africa's first democratic, non-racial government."
    },
    {
        start: "Only moments before, the highest generals of the South African defence force and police... saluted me and pledged their loyalty.",
        complete: "not so many years before they would not have saluted but arrested me."
    },
    {
        start: "Although that day neither group knew the lyrics of the anthem they once despised,",
        complete: "they would soon know the words by heart."
    },
    {
        start: "My country is rich in the minerals and gems that lie beneath its soil,",
        complete: "but I have always known that its greatest wealth is its people, finer and truer than the purest diamonds."
    },
    {
        start: "The Air Show was not only a display of pinpoint precision and military force,",
        complete: "but a demonstration of the military's loyalty to democracy, to a new government that had been freely and fairly elected."
    }
];

// Data for noun/verb form transformation exercise
const nounVerbPairs = [
    { noun: "rebellion", verb: "rebel" },
    { noun: "constitution", verb: "constitute" },
    { noun: "segregation", verb: "segregate" },
    { noun: "transformation", verb: "transform" },
    { noun: "establishment", verb: "establish" },
    { noun: "declaration", verb: "declare" },
    { noun: "liberation", verb: "liberate" },
    { noun: "achievement", verb: "achieve" }
];

// Data for fill-in-the-blanks paragraph
const fillInBlanksParagraph = {
    paragraph: "Nelson Mandela's ________ to history as an outstanding leader began when he came to the ________ of South African people against apartheid. In those days, Black South Africans were confined to positions of second-class citizenship by restrictive laws and customs. To break these laws would mean ________ and ________ by the police and the legal system. Beatings, ________ and sometimes death awaited those who defied the system. Mandela's tactics of protest involved non-violent ________ to racial injustice.",
    answers: ["contribution", "assistance", "subjugation", "humiliation", "imprisonment", "resistance"]
};

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any activities that need setup on page load
    
    // Add event listeners for reflection exercise if it exists
    const reflectionSaveBtn = document.querySelector('.reflection-exercise .interactive-btn');
    if (reflectionSaveBtn) {
        reflectionSaveBtn.addEventListener('click', saveReflection);
    }
    
    // Add event listeners for vocabulary exercise
    const vocabCheckBtn = document.querySelector('#thinking-language .vocabulary-exercise .interactive-btn');
    if (vocabCheckBtn) {
        vocabCheckBtn.addEventListener('click', checkVocabulary);
    }
    
    // Add event listeners for essay submission
    const essaySubmitBtn = document.querySelector('.matching-game .interactive-btn');
    if (essaySubmitBtn) {
        essaySubmitBtn.addEventListener('click', checkEssay);
    }
});

// Function to save reflection (if not already defined in main.js)
if (typeof saveReflection !== 'function') {
    function saveReflection() {
        const textarea = document.getElementById('reflectionText');
        const feedback = document.getElementById('reflectionFeedback');
        
        if (!textarea || !feedback) return;
        
        const text = textarea.value.trim();
        
        if (text.length < 20) {
            feedback.textContent = 'Please write a reflection of at least 20 characters.';
            feedback.className = 'feedback-message warning show';
            return;
        }
        
        feedback.textContent = 'Your reflection has been saved!';
        feedback.className = 'feedback-message success show';
        
        // Award points for completing the activity
        if (typeof score !== 'undefined') {
            score += 5;
            document.getElementById('totalScore').textContent = score;
        }
        
        // Show achievement if function exists
        if (typeof showAchievement === 'function') {
            showAchievement('Reflection Completed!');
        }
    }
}

// Function to check vocabulary answers (if not already defined in main.js)
if (typeof checkVocabulary !== 'function') {
    function checkVocabulary() {
        const answers = {
            vocab1: "to create such heights of character",
            vocab2: "but the triumph over it",
            vocab3: "but he who conquers that fear",
            vocab4: "they can be taught to love",
            vocab5: "I was born free"
        };
        
        let correct = 0;
        let total = Object.keys(answers).length;
        
        for (const [id, correctAnswer] of Object.entries(answers)) {
            const select = document.getElementById(id);
            if (!select) continue;
            
            const userAnswer = select.value;
            if (userAnswer === correctAnswer) {
                correct++;
                select.style.borderColor = '#4caf50';
            } else {
                select.style.borderColor = '#f44336';
            }
        }
        
        const feedbackEl = document.getElementById('vocabFeedback');
        if (!feedbackEl) return;
        
        if (correct === total) {
            feedbackEl.textContent = `Perfect! All ${total} answers are correct.`;
            feedbackEl.className = 'feedback-message correct show';
            
            // Award points for perfect score
            if (typeof score !== 'undefined') {
                score += 10;
                document.getElementById('totalScore').textContent = score;
            }
            
            // Show achievement if function exists
            if (typeof showAchievement === 'function') {
                showAchievement('Vocabulary Exercise Completed!');
            }
        } else {
            feedbackEl.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message incorrect show';
        }
    }
}

// Function to check essay submission (if not already defined in main.js)
if (typeof checkEssay !== 'function') {
    function checkEssay() {
        const textarea = document.querySelector('.matching-game .question-textarea');
        const feedback = document.getElementById('essayFeedback');
        
        if (!textarea || !feedback) return;
        
        const text = textarea.value.trim();
        
        if (text.length < 80) {
            feedback.textContent = 'Please write at least 80 characters (about 100-150 words).';
            feedback.className = 'feedback-message warning show';
            return;
        }
        
        feedback.textContent = 'Your essay has been submitted. Great job expressing your opinion!';
        feedback.className = 'feedback-message success show';
        
        // Award points for completing the activity
        if (typeof score !== 'undefined') {
            score += 10;
            document.getElementById('totalScore').textContent = score;
        }
        
        // Show achievement if function exists
        if (typeof showAchievement === 'function') {
            showAchievement('Essay Submitted!');
        }
    }
}

// Function to create and display the matching game
function createMatchingGame(container, terms) {
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create instructions
    const instructions = document.createElement('h3');
    instructions.textContent = 'Match the expressions from Column A with their meanings in Column B';
    container.appendChild(instructions);
    
    // Create game board
    const gameBoard = document.createElement('div');
    gameBoard.className = 'matching-game-board';
    
    // Extract keys and values
    const keys = Object.keys(terms);
    const values = Object.values(terms);
    
    // Shuffle values
    const shuffledValues = [...values].sort(() => Math.random() - 0.5);
    
    // Create columns
    const columnA = document.createElement('div');
    columnA.className = 'matching-column';
    
    const columnB = document.createElement('div');
    columnB.className = 'matching-column';
    
    // Add items to columns
    keys.forEach((key, index) => {
        const itemA = document.createElement('div');
        itemA.className = 'matching-item';
        itemA.dataset.id = `a${index}`;
        itemA.textContent = key;
        itemA.addEventListener('click', () => selectItem(itemA, 'a'));
        columnA.appendChild(itemA);
    });
    
    shuffledValues.forEach((value, index) => {
        const itemB = document.createElement('div');
        itemB.className = 'matching-item';
        itemB.dataset.id = `b${index}`;
        itemB.dataset.value = value;
        itemB.textContent = value;
        itemB.addEventListener('click', () => selectItem(itemB, 'b'));
        columnB.appendChild(itemB);
    });
    
    gameBoard.appendChild(columnA);
    gameBoard.appendChild(columnB);
    container.appendChild(gameBoard);
    
    // Add check button
    const checkButton = document.createElement('button');
    checkButton.className = 'interactive-btn';
    checkButton.textContent = 'Check Matches';
    checkButton.addEventListener('click', checkMatches);
    container.appendChild(checkButton);
    
    // Add feedback area
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.id = 'matching-feedback';
    container.appendChild(feedback);
    
    // Selected items and their matches
    window.matchingState = {
        selectedA: null,
        selectedB: null,
        matches: [],
        terms: terms
    };
}

// Function to handle item selection in matching game
function selectItem(item, column) {
    // Clear previous selection in this column
    if (column === 'a') {
        if (window.matchingState.selectedA) {
            window.matchingState.selectedA.classList.remove('selected');
        }
        window.matchingState.selectedA = item;
    } else {
        if (window.matchingState.selectedB) {
            window.matchingState.selectedB.classList.remove('selected');
        }
        window.matchingState.selectedB = item;
    }
    
    // Add selected class
    item.classList.add('selected');
    
    // Check if both columns have selected items
    if (window.matchingState.selectedA && window.matchingState.selectedB) {
        // Create match
        const match = {
            a: window.matchingState.selectedA.dataset.id,
            b: window.matchingState.selectedB.dataset.id,
            term: window.matchingState.selectedA.textContent,
            definition: window.matchingState.selectedB.dataset.value
        };
        
        // Add to matches
        window.matchingState.matches.push(match);
        
        // Disable selected items
        window.matchingState.selectedA.classList.remove('selected');
        window.matchingState.selectedA.classList.add('matched');
        window.matchingState.selectedA.disabled = true;
        
        window.matchingState.selectedB.classList.remove('selected');
        window.matchingState.selectedB.classList.add('matched');
        window.matchingState.selectedB.disabled = true;
        
        // Reset selected items
        window.matchingState.selectedA = null;
        window.matchingState.selectedB = null;
    }
}

// Function to check matches in matching game
function checkMatches() {
    const feedback = document.getElementById('matching-feedback');
    if (!feedback || !window.matchingState) return;
    
    const { matches, terms } = window.matchingState;
    
    // Count correct matches
    let correctMatches = 0;
    matches.forEach(match => {
        const term = match.term;
        const definition = match.definition;
        
        if (terms[term] === definition) {
            correctMatches++;
        }
    });
    
    // Display feedback
    if (correctMatches === Object.keys(terms).length) {
        feedback.textContent = 'Perfect! All matches are correct!';
        feedback.className = 'feedback-message success show';
        
        // Award points for perfect score
        if (typeof score !== 'undefined') {
            score += 15;
            document.getElementById('totalScore').textContent = score;
        }
        
        // Show achievement if function exists
        if (typeof showAchievement === 'function') {
            showAchievement('Matching Game Completed!');
        }
    } else {
        feedback.textContent = `You got ${correctMatches} out of ${Object.keys(terms).length} correct. Try again!`;
        feedback.className = 'feedback-message incorrect show';
    }
}
