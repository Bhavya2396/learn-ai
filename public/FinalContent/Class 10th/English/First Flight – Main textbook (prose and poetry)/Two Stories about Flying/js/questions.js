/**
 * Questions and interactive exercises for Two Stories about Flying
 */

// Story 1 questions - His First Flight
const story1Questions = [
    {
        id: "s1q1",
        text: "Why was the young seagull afraid to fly?",
        type: "text",
        correctAnswer: "He was afraid that his wings would never support him over the long drop to the sea below.",
        hint: "Think about what the seagull feared would happen if he tried to fly."
    },
    {
        id: "s1q2",
        text: "What did the seagull's mother do to encourage him to fly?",
        type: "multiple",
        options: [
            "She pushed him off the ledge.",
            "She brought fish to him on the ledge.",
            "She held a piece of fish in her beak just out of his reach, making him dive for it.",
            "She pretended to be injured to make him rescue her."
        ],
        correctAnswer: 2,
        explanation: "The mother seagull tempted her hungry son with food, flying near him with a piece of fish. When he reached for it, she stopped just out of reach, causing him to dive off the ledge after it."
    },
    {
        id: "s1q3",
        text: "How did the young seagull feel during his first flight?",
        type: "multiple",
        options: [
            "Terrified throughout the entire flight",
            "Initially terrified, then gradually confident",
            "Excited from the beginning",
            "Indifferent about the whole experience"
        ],
        correctAnswer: 1,
        explanation: "The seagull was initially gripped by 'monstrous terror' but soon felt the wind under his wings and was 'no longer afraid' - just a bit dizzy. By the end, he had 'completely forgotten that he had not always been able to fly'."
    },
    {
        id: "s1q4",
        text: "What lesson can we learn from the story of the young seagull?",
        type: "text",
        correctAnswer: "Sometimes we need to face our fears and take a leap of faith to discover our true capabilities.",
        hint: "Think about how the seagull discovered his ability to fly only after he was forced to try."
    }
];

// Story 2 questions - The Black Aeroplane
const story2Questions = [
    {
        id: "s2q1",
        text: "Why did the pilot decide to fly through the storm instead of turning back to Paris?",
        type: "multiple",
        options: [
            "He wanted to test his flying skills.",
            "He wanted to get home in time for breakfast.",
            "He was following orders from Paris Control.",
            "His plane was running out of fuel."
        ],
        correctAnswer: 1,
        explanation: "The pilot wanted to get home to have 'a good big English breakfast' and was willing to take the risk to fly through the storm."
    },
    {
        id: "s2q2",
        text: "What happened to the instruments when the pilot entered the storm?",
        type: "multiple",
        options: [
            "They were damaged by lightning.",
            "They started showing incorrect readings.",
            "They stopped working completely.",
            "They began to make strange noises."
        ],
        correctAnswer: 2,
        explanation: "Inside the storm, all the instruments including the compass and the radio stopped working. The pilot says 'It was dead. It would not work!'"
    },
    {
        id: "s2q3",
        text: "What mysterious event occurred in the storm?",
        type: "text",
        correctAnswer: "Another aeroplane without lights appeared and guided the pilot safely through the storm to a runway, but when the pilot landed and asked about the other plane, he was told no other planes were flying that night.",
        hint: "Think about the black aeroplane that appeared and what happened after the pilot landed."
    },
    {
        id: "s2q4",
        text: "Who do you think was the pilot of the strange black aeroplane?",
        type: "text",
        correctAnswer: "The story leaves this open to interpretation. It could be a supernatural being, a guardian angel, or perhaps a hallucination caused by stress.",
        hint: "This is open to interpretation - share your thoughts about the mysterious pilot."
    }
];

// Poem 1 questions - How to Tell Wild Animals
const poem1Questions = [
    {
        id: "p1q1",
        text: "What is the main idea of the poem 'How to Tell Wild Animals'?",
        type: "multiple",
        options: [
            "To provide scientific information about different wild animals",
            "To offer humorous and exaggerated ways to identify dangerous animals",
            "To warn people about the dangers of wild animals",
            "To describe the habitats of various wild animals"
        ],
        correctAnswer: 1,
        explanation: "The poem offers humorous and exaggerated ways to identify wild animals, often suggesting that you'll only know what they are after they've attacked you."
    },
    {
        id: "p1q2",
        text: "According to the poem, how can you tell the difference between a hyena and a crocodile?",
        type: "multiple",
        options: [
            "By their size",
            "By their color",
            "By their habitat",
            "By whether they smile or weep"
        ],
        correctAnswer: 3,
        explanation: "The poem says: 'Hyenas come with merry smiles; But if they weep they're Crocodiles.'"
    },
    {
        id: "p1q3",
        text: "What literary device is most prominently used throughout this poem?",
        type: "multiple",
        options: [
            "Alliteration",
            "Metaphor",
            "Humor and irony",
            "Personification"
        ],
        correctAnswer: 2,
        explanation: "The poem uses humor and irony throughout - suggesting absurd ways to identify animals that would actually be too late to be useful (e.g., you'll know it's a lion after it's attacked you)."
    },
    {
        id: "p1q4",
        text: "What is special about the chameleon according to the poem?",
        type: "text",
        correctAnswer: "According to the poem, the chameleon is small, has no ears, no wings, and is invisible when on a tree ('If there is nothing on the tree, 'Tis the chameleon you see').",
        hint: "Think about how the poem describes the chameleon's appearance and visibility."
    }
];

// Poem 2 questions - The Ball Poem
const poem2Questions = [
    {
        id: "p2q1",
        text: "Why does the poet say, 'I would not intrude on him'?",
        type: "multiple",
        options: [
            "Because the boy is a stranger",
            "Because the poet doesn't care about the boy's loss",
            "Because the boy needs to learn this lesson on his own",
            "Because the poet is in a hurry to leave"
        ],
        correctAnswer: 2,
        explanation: "The poet understands that this is an important learning experience for the boy about loss and responsibility, and interfering would prevent the boy from learning this necessary life lesson."
    },
    {
        id: "p2q2",
        text: "What does the poet mean by 'in the world of possessions'?",
        type: "text",
        correctAnswer: "The poet is referring to the material world where we own things that can be lost, broken, or taken away. The boy is learning that in this world, he will inevitably lose things he cares about.",
        hint: "Think about how the boy is learning about ownership and loss."
    },
    {
        id: "p2q3",
        text: "What is the boy learning from the loss of the ball?",
        type: "multiple",
        options: [
            "How to be more careful with his toys",
            "How to ask others for help",
            "How to handle loss and responsibility",
            "How to save money for new purchases"
        ],
        correctAnswer: 2,
        explanation: "The boy is learning about loss, responsibility, and resilience - 'the epistemology of loss' - that is, how to stand up and move on after losing something important."
    },
    {
        id: "p2q4",
        text: "In what way is the lost ball a symbol?",
        type: "text",
        correctAnswer: "The ball symbolizes innocence and childhood. Its loss represents the inevitable losses we all face growing up, and how we must learn to cope with them as part of maturing.",
        hint: "Think about what the ball might represent beyond just being a toy."
    }
];

// Initialize function to display question sets
function showQuestionSet(setId) {
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Find the clicked button and update it
    const buttons = document.querySelectorAll('.story-nav-btn');
    for (let btn of buttons) {
        if (btn.onclick && btn.onclick.toString().includes(setId)) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            break;
        }
    }
    
    // Get question container
    const questionContainer = document.getElementById('textQuestions');
    if (!questionContainer) return;
    
    // Clear previous questions
    questionContainer.innerHTML = '';
    
    // Determine which question set to display
    let questions;
    let title;
    
    switch (setId) {
        case 'story1-questions':
            questions = story1Questions;
            title = 'Questions: His First Flight';
            break;
        case 'story2-questions':
            questions = story2Questions;
            title = 'Questions: The Black Aeroplane';
            break;
        case 'poem1-questions':
            questions = poem1Questions;
            title = 'Questions: How to Tell Wild Animals';
            break;
        case 'poem2-questions':
            questions = poem2Questions;
            title = 'Questions: The Ball Poem';
            break;
        default:
            questions = [];
            title = 'Reading Comprehension Questions';
    }
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.className = 'question-section-title';
    titleElement.textContent = title;
    questionContainer.appendChild(titleElement);
    
    // Add each question
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.id = question.id;
        
        // Add question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = question.text;
        questionDiv.appendChild(questionText);
        
        // Create different question types
        if (question.type === 'multiple') {
            // Multiple choice
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'question-options';
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = question.id;
                radio.id = `${question.id}-option-${index}`;
                radio.value = index;
                
                const label = document.createElement('label');
                label.htmlFor = `${question.id}-option-${index}`;
                label.textContent = option;
                
                optionDiv.appendChild(radio);
                optionDiv.appendChild(label);
                optionsDiv.appendChild(optionDiv);
            });
            
            questionDiv.appendChild(optionsDiv);
        } else if (question.type === 'text') {
            // Text input
            const textArea = document.createElement('textarea');
            textArea.className = 'question-textarea';
            textArea.placeholder = 'Type your answer here...';
            textArea.rows = 4;
            questionDiv.appendChild(textArea);
            
            // Add hint if available
            if (question.hint) {
                const hintButton = document.createElement('button');
                hintButton.className = 'interactive-btn hint-btn';
                hintButton.textContent = '💡 Show Hint';
                hintButton.onclick = function() {
                    const hintText = document.createElement('div');
                    hintText.className = 'question-feedback warning';
                    hintText.textContent = question.hint;
                    
                    // Check if hint already exists
                    const existingHint = questionDiv.querySelector('.question-feedback.warning');
                    if (existingHint) {
                        existingHint.remove();
                    } else {
                        questionDiv.appendChild(hintText);
                    }
                };
                questionDiv.appendChild(hintButton);
            }
        }
        
        // Add check answer button
        const checkButton = document.createElement('button');
        checkButton.className = 'interactive-btn check-answer-btn';
        checkButton.textContent = '✓ Check Answer';
        checkButton.onclick = function() {
            checkAnswer(question, questionDiv);
        };
        questionDiv.appendChild(checkButton);
        
        // Add feedback area (hidden initially)
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'question-feedback';
        questionDiv.appendChild(feedbackDiv);
        
        // Add to container
        questionContainer.appendChild(questionDiv);
    });
}

// Function to check answers
function checkAnswer(question, questionElement) {
    const feedbackDiv = questionElement.querySelector('.question-feedback');
    let isCorrect = false;
    let userAnswer = '';
    
    // Process different question types
    if (question.type === 'multiple') {
        const selectedOption = questionElement.querySelector(`input[name="${question.id}"]:checked`);
        if (selectedOption) {
            userAnswer = parseInt(selectedOption.value);
            isCorrect = userAnswer === question.correctAnswer;
        } else {
            feedbackDiv.textContent = "Please select an answer option.";
            feedbackDiv.className = 'question-feedback warning';
            return;
        }
    } else if (question.type === 'text') {
        const textArea = questionElement.querySelector('.question-textarea');
        userAnswer = textArea.value.trim();
        
        // Text answers are checked for keywords rather than exact matches
        if (userAnswer.length < 10) {
            feedbackDiv.textContent = "Please provide a more detailed answer.";
            feedbackDiv.className = 'question-feedback warning';
            return;
        }
        
        // Check for keywords in the answer - simplified approach
        const keywords = extractKeywords(question.correctAnswer);
        const userKeywords = keywords.filter(keyword => 
            userAnswer.toLowerCase().includes(keyword.toLowerCase())
        );
        
        // If more than 50% of keywords are present, consider it correct
        isCorrect = userKeywords.length >= keywords.length * 0.5;
    }
    
    // Update feedback based on correctness
    if (isCorrect) {
        feedbackDiv.textContent = question.type === 'multiple' ? 
            question.explanation : 
            "Good answer! The important points have been covered.";
        feedbackDiv.className = 'question-feedback correct';
        
        // Award points for correct answer
        if (typeof score !== 'undefined') {
            score += 5;
            document.getElementById('totalScore').textContent = score;
        }
    } else {
        feedbackDiv.textContent = question.type === 'multiple' ? 
            "That's not quite right. Try again!" : 
            "Your answer is missing some key points. Try again!";
        feedbackDiv.className = 'question-feedback incorrect';
    }
}

// Helper function to extract keywords from answers
function extractKeywords(text) {
    // Remove common words and keep only meaningful keywords
    const commonWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as', 'of', 'that', 'this', 'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might'];
    
    return text.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .split(' ')
        .filter(word => word.length > 3 && !commonWords.includes(word))
        .map(word => word.trim());
}
