/**
 * Questions for "Madam Rides the Bus" lesson
 */

// Reading Comprehension Questions for Text I
const textOneQuestions = [
    {
        id: "q1_1",
        type: "essay",
        question: "What is the meaning of the expression \"when our peers were slowing down, relaxing and watching sunsets from their front porch\" and in what context has the author used this?",
        hint: "Think about how this relates to retirement expectations",
        model_answer: "The expression refers to the common retirement lifestyle where older people tend to slow down and enjoy a relaxing, laid-back lifestyle. The author uses this to contrast with their own active post-retirement choice to take up cycling as a challenging adventure, showing that they chose an unconventional path compared to typical retirees their age."
    },
    {
        id: "q1_2",
        type: "essay",
        question: "What made Vishav and her husband confident to venture into Uttarakhand on their bicycles?",
        hint: "Look for factors related to their familiarity with the region",
        model_answer: "Vishav and her husband were confident because they had lived in Uttarakhand's capital, Dehradun, their entire lives. They were acclimatized to the cold winds and narrow winding roads of the state. Additionally, they were familiar with almost all the scenic mountain trails in the region, which gave them the confidence to undertake this challenging journey."
    },
    {
        id: "q1_3",
        type: "essay",
        question: "What was the strong passion that prompted the retired couple to take up this adventurous journey?",
        hint: "Consider how their hobby evolved over time",
        model_answer: "The couple developed a strong passion for cycling, which started with short daily rides but evolved as they found themselves looking forward to these rides more and more. Their passion was fueled by their desire to discover and explore their surroundings in a way they never had time to before. Their simple hobby turned into a project as they began participating in cyclotrons and other cycling events, eventually leading to the adventurous idea of traveling across the state on bicycles."
    },
    {
        id: "q1_4",
        type: "essay",
        question: "What, according to the author, is the most thrilling way to enjoy and appreciate Uttarakhand? Why does she say so?",
        hint: "Look for the sensory experience described in the passage",
        model_answer: "According to the author, cycling is the most thrilling way to enjoy and appreciate Uttarakhand's beauty. She believes this because of the unique sensory experience it provides: feeling sunlight filtering through trees, cool breezes caressing the face while riding, and enjoying breathtaking views of sal forests and valleys. The experience of pedalling across the state offers a more intimate connection with nature that she describes as 'truly inexplicable.'"
    },
    {
        id: "q1_5",
        type: "essay",
        question: "Which trail occupies a special place in the couple's heart?",
        hint: "Find the specific route mentioned in the passage",
        model_answer: "The trail that occupies a special place in the couple's hearts began from Ghanta Ghar, a popular tourist attraction in Dehradun. It took them through picturesque locations such as Kimadi, Hathi Paon, Mussoorie, and Chaar Dukaan, right up to George Everest point. This approximately 100km ride holds special significance for them."
    },
    {
        id: "q1_6",
        type: "essay",
        question: "What are the expectations of a cyclist from such an adventurous trip through the mountains? Did Vishav and Kamal Jeet get these experiences from the 100 km ride?",
        hint: "Look for the elements that make cycling in Uttarakhand unique",
        model_answer: "A cyclist expects diverse challenging terrain and beautiful scenery from an adventurous mountain trip. According to the passage, cyclists in Uttarakhand specifically expect steep slopes, sharp curves, endless hills, lush forests, and off-road experiences. Vishav and Kamal Jeet did indeed get these experiences from their 100 km ride, as the author explicitly states that this route 'encapsulates all the elements that one expects while cycling here,' followed by listing those exact features."
    }
];

// Reading Comprehension Questions for Text II (The Poem)
const textTwoQuestions = [
    {
        id: "q2_1",
        type: "mcq",
        question: "The poem describes the _____________ of going downhill on a bicycle.",
        options: ["enjoyment", "happiness", "excitement", "satisfaction"],
        answer: 2,  // excitement (index 2)
        explanation: "The poem vividly captures the excitement and thrill of riding a bicycle downhill through descriptions of speed, freedom, and the physical sensations of the experience."
    },
    {
        id: "q2_2",
        type: "essay",
        question: "Which line(s) depict the freedom like that of a bird that the poet enjoys?",
        hint: "Look for comparisons between the boy and a bird",
        model_answer: "The lines \"O bird, see; see, bird, I fly\" and \"For a golden moment share Your feathery life in air!\" clearly depict the freedom like that of a bird that the poet enjoys. These lines show the boy comparing his bicycle ride to flying like a bird, feeling the same sense of freedom and exhilaration in the air."
    },
    {
        id: "q2_3",
        type: "essay",
        question: "Which is the experience the boy is sharing with the bird? What is the golden moment he is referring to?",
        hint: "Consider the sensation of movement described in the poem",
        model_answer: "The boy is sharing the experience of flight/soaring with the bird - the sensation of moving freely through the air with speed. The 'golden moment' refers to that precious, perfect instant when the boy feels completely free while speeding downhill on his bicycle, experiencing the same joyful liberation that birds experience when flying. It's called 'golden' because it's rare, valuable, and fleeting, capturing a moment of pure joy and transcendence."
    },
    {
        id: "q2_4",
        type: "essay",
        question: "What is the meaning of 'full of bliss' here? Can the boy find this kind of bliss in the world where he lives?",
        hint: "Consider what brings supreme joy in the poem",
        model_answer: "'Full of bliss' refers to a world filled with supreme joy and happiness. The boy is questioning whether there is anything else in the world that can bring as much joy as riding downhill on a bicycle. He believes that this particular experience of freedom and exhilaration is unmatched, suggesting that while the world offers many pleasures ('full of bliss'), this specific sensation of speeding downhill, feeling like a bird in flight, represents a unique form of bliss that cannot be easily found in other activities in his everyday world."
    },
    {
        id: "q2_5",
        type: "essay",
        question: "There is a comparison in the third stanza. What is it?",
        hint: "Look at how the boy describes himself in relation to the bird",
        model_answer: "In the third stanza, the boy compares himself to a bird. He asks the bird if the joy of flying is similar to what he feels while cycling downhill. Then he states that although he is just a boy, for a brief moment ('golden moment'), he shares the bird's 'feathery life in air' - meaning he experiences the same sensation of flight and freedom that birds naturally enjoy."
    },
    {
        id: "q2_6",
        type: "essay",
        question: "What is the meaning of the last two lines of the poem? Does \"toil\" mean dedication, determination, and will power to climb the hill? What is the reward here?",
        hint: "Consider the effort-reward relationship described at the end",
        model_answer: "The last two lines ('Who climbs with toil, wheresoe'er, Shall find wings waiting there') mean that those who make the effort to climb uphill, regardless of where they are, will be rewarded with the ability to soar like birds on their way down. Yes, 'toil' does refer to the dedication, determination, and willpower needed to climb the hill - the hard work and effort. The reward is the 'wings' - the feeling of flight, freedom, and exhilaration that comes with the downhill journey. This is a metaphor suggesting that hard work and struggle often lead to moments of joy and liberation."
    }
];

// Vocabulary and Grammar Questions
const vocabularyQuestions = {
    matching: [
        { id: "match1", term: "acclimatised", definition: "became used to a new climate or environment" },
        { id: "match2", term: "strenuous", definition: "requiring a lot of physical effort" },
        { id: "match3", term: "inexplicable", definition: "unable to be explained or described" },
        { id: "match4", term: "daunting", definition: "intimidating, overwhelming, or scary" },
        { id: "match5", term: "picturesque", definition: "visually attractive or beautiful, like a picture" }
    ],
    phrasal_verbs: {
        words: ["break down", "look for", "fill in", "turn on", "wake up"],
        sentence: "It was evening. She {{turned on}} the light. Do not {{wake up}} Ramesh. He was studying late at night yesterday. The school bus {{broke down}} and had to be towed to the garage for repair. You have to {{fill in}} the form yourself.",
        answers: ["turned on", "wake up", "broke down", "fill in"]
    },
    word_meaning: [
        { word: "inquisitive", hint: "curious, eager to learn" },
        { word: "intricate", hint: "very complicated or detailed" },
        { word: "mesmerizing", hint: "capturing complete attention; fascinating" },
        { word: "immense", hint: "extremely large or great" },
        { word: "hardly", hint: "barely; only just" }
    ]
};

// Initialize Reading Comprehension Questions
function initializeReadingQuestions() {
    // Text I Questions
    const textQuestionsContainer = document.getElementById('textQuestions');
    if (!textQuestionsContainer) return;
    
    let textOneHTML = '<div class="question-section-title">Questions for Text I: Pedalling through the Golden Years</div>';
    textOneHTML += '<div class="question-set">';
    
    textOneQuestions.forEach(q => {
        textOneHTML += createQuestionHTML(q);
    });
    
    textOneHTML += '</div>';
    
    let textTwoHTML = '<div class="question-section-title">Questions for Text II: Going Down Hill on a Bicycle</div>';
    textTwoHTML += '<div class="question-set">';
    
    textTwoQuestions.forEach(q => {
        textTwoHTML += createQuestionHTML(q);
    });
    
    textTwoHTML += '</div>';
    
    textQuestionsContainer.innerHTML = textOneHTML + textTwoHTML;
    
    // Add event listeners to check answers
    document.querySelectorAll('.check-answer-btn').forEach(btn => {
        btn.addEventListener('click', checkAnswer);
    });
    
    // Add event listeners for MCQ options
    document.querySelectorAll('.option input').forEach(input => {
        input.addEventListener('change', function() {
            const questionId = this.getAttribute('name');
            document.querySelectorAll(`input[name="${questionId}"]`).forEach(opt => {
                opt.parentElement.classList.remove('selected');
            });
            this.parentElement.classList.add('selected');
        });
    });
}

// Create HTML for a question
function createQuestionHTML(question) {
    let html = `<div class="question-item" id="${question.id}">
                    <div class="question-text">${question.question}</div>`;
    
    if (question.type === 'mcq') {
        html += '<div class="question-options">';
        question.options.forEach((option, index) => {
            html += `<div class="option">
                        <input type="radio" id="${question.id}_opt${index}" name="${question.id}" value="${index}">
                        <label for="${question.id}_opt${index}">${option}</label>
                    </div>`;
        });
        html += '</div>';
    } else if (question.type === 'essay') {
        html += `<textarea class="question-textarea" id="${question.id}_answer" placeholder="Write your answer here..."></textarea>`;
        if (question.hint) {
            html += `<div class="question-hint"><strong>Hint:</strong> ${question.hint}</div>`;
        }
    }
    
    html += `<button class="interactive-btn check-answer-btn" data-question-id="${question.id}">Check Answer</button>
             <div class="question-feedback" id="${question.id}_feedback"></div>
             </div>`;
    
    return html;
}

// Check answer function
function checkAnswer(event) {
    const questionId = event.target.getAttribute('data-question-id');
    const questionType = questionId.startsWith('q1') ? 'text1' : 'text2';
    
    // Find the question object
    let question;
    if (questionType === 'text1') {
        question = textOneQuestions.find(q => q.id === questionId);
    } else {
        question = textTwoQuestions.find(q => q.id === questionId);
    }
    
    if (!question) return;
    
    const feedbackEl = document.getElementById(`${questionId}_feedback`);
    
    if (question.type === 'mcq') {
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        
        if (!selectedOption) {
            feedbackEl.textContent = 'Please select an option.';
            feedbackEl.className = 'question-feedback warning';
            return;
        }
        
        const selectedIndex = parseInt(selectedOption.value);
        
        if (selectedIndex === question.answer) {
            feedbackEl.innerHTML = `<strong>Correct!</strong> ${question.explanation || ''}`;
            feedbackEl.className = 'question-feedback correct';
            
            // Update score
            window.score += 5;
            document.getElementById('totalScore').textContent = window.score;
        } else {
            feedbackEl.textContent = 'That\'s not correct. Try again.';
            feedbackEl.className = 'question-feedback incorrect';
        }
    } else if (question.type === 'essay') {
        const answer = document.getElementById(`${questionId}_answer`).value.trim();
        
        if (answer.length < 20) {
            feedbackEl.textContent = 'Please provide a more detailed answer.';
            feedbackEl.className = 'question-feedback warning';
            return;
        }
        
        feedbackEl.innerHTML = `<strong>Thank you for your response!</strong> Here's a model answer for reference:<br><br>${question.model_answer}`;
        feedbackEl.className = 'question-feedback correct';
        
        // Update score
        window.score += 10;
        document.getElementById('totalScore').textContent = window.score;
        
        // Track module completion
        if (!window.modulesCompleted.includes('thinking-text')) {
            window.modulesCompleted.push('thinking-text');
            window.updateProgress();
            window.showAchievement('Reading Comprehension Completed!');
        }
    }
}

// Check vocabulary matching
function checkMatching() {
    // Implementation depends on how the matching game is structured in HTML
    // This is just a placeholder function
    console.log('Checking matching answers');
    
    // Update score for correct matches
    window.score += 10;
    document.getElementById('totalScore').textContent = window.score;
    
    const matchFeedback = document.getElementById('matchFeedback');
    matchFeedback.textContent = 'Great job! You matched the vocabulary correctly.';
    matchFeedback.className = 'feedback-message show success';
}

// Check vocabulary selection
function checkVocabulary() {
    // Implementation depends on the vocabulary exercise structure
    console.log('Checking vocabulary answers');
    
    // Update score
    window.score += 5;
    document.getElementById('totalScore').textContent = window.score;
    
    const vocabFeedback = document.getElementById('vocabFeedback');
    vocabFeedback.textContent = 'Well done! You completed the vocabulary exercise.';
    vocabFeedback.className = 'feedback-message show success';
}

// Check phrasal verbs
function checkPhrasalVerbs() {
    const inputs = document.querySelectorAll('.phrasal-input');
    let allCorrect = true;
    let correctCount = 0;
    
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer');
        const userAnswer = input.value.trim();
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            input.style.borderColor = '#4caf50';
            correctCount++;
        } else {
            input.style.borderColor = '#f44336';
            allCorrect = false;
        }
    });
    
    const phrasalFeedback = document.getElementById('phrasalFeedback');
    
    if (allCorrect) {
        phrasalFeedback.textContent = 'Excellent! All phrasal verbs are correct.';
        phrasalFeedback.className = 'feedback-message show success';
        
        // Update score
        window.score += 10;
        document.getElementById('totalScore').textContent = window.score;
        
        // Track module completion
        if (!window.modulesCompleted.includes('thinking-language')) {
            window.modulesCompleted.push('thinking-language');
            window.updateProgress();
            window.showAchievement('Vocabulary & Grammar Completed!');
        }
    } else {
        phrasalFeedback.textContent = `You got ${correctCount} out of ${inputs.length} correct. Try again!`;
        phrasalFeedback.className = 'feedback-message show error';
    }
}

// Check editing exercise
function checkEditing() {
    const inputs = document.querySelectorAll('.editing-input');
    let allCorrect = true;
    let correctCount = 0;
    
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer');
        const userAnswer = input.value.trim();
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            input.style.borderColor = '#4caf50';
            correctCount++;
        } else {
            input.style.borderColor = '#f44336';
            allCorrect = false;
        }
    });
    
    const editingFeedback = document.getElementById('editingFeedback');
    
    if (allCorrect) {
        editingFeedback.textContent = 'Perfect! All corrections are accurate.';
        editingFeedback.className = 'feedback-message show success';
        
        // Update score
        window.score += 10;
        document.getElementById('totalScore').textContent = window.score;
    } else {
        editingFeedback.textContent = `You got ${correctCount} out of ${inputs.length} correct. Keep trying!`;
        editingFeedback.className = 'feedback-message show error';
    }
}

// Check contractions
function checkContractions() {
    const inputs = document.querySelectorAll('.contraction-input');
    let allCorrect = true;
    let correctCount = 0;
    
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer');
        const userAnswer = input.value.trim();
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            input.style.borderColor = '#4caf50';
            correctCount++;
        } else {
            input.style.borderColor = '#f44336';
            allCorrect = false;
        }
    });
    
    const contractionFeedback = document.getElementById('contractionFeedback');
    
    if (allCorrect) {
        contractionFeedback.textContent = 'Excellent! All contractions are correct.';
        contractionFeedback.className = 'feedback-message show success';
        
        // Update score
        window.score += 8;
        document.getElementById('totalScore').textContent = window.score;
    } else {
        contractionFeedback.textContent = `You got ${correctCount} out of ${inputs.length} correct. Try again!`;
        contractionFeedback.className = 'feedback-message show error';
    }
}

// Document ready event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize questions when the DOM is loaded
    if (document.getElementById('textQuestions')) {
        initializeReadingQuestions();
    }
});
