/**
 * Questions for Nelson Mandela: Long Walk to Freedom interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Where did the ceremonies take place?",
                answer: "The ceremonies took place in the sandstone amphitheatre formed by the Union Buildings in Pretoria."
            },
            {
                id: "sq2",
                type: "short",
                text: "What is the significance of 10 May?",
                answer: "It was the day of Nelson Mandela's inauguration as South Africa's first black President."
            },
            {
                id: "sq3",
                type: "short",
                text: "What does Mandela refer to as 'an extraordinary human disaster'?",
                answer: "He is referring to the policy of apartheid and racial segregation in South Africa."
            },
            {
                id: "sq4",
                type: "short",
                text: "What were the two national anthems played at the ceremony?",
                answer: "'Nkosi Sikelel–iAfrika' and 'Die Stem', representing both black and white South Africans."
            },
            {
                id: "sq5",
                type: "short",
                text: "What did the military display symbolize?",
                answer: "It symbolized the military's loyalty to democracy and the new government."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"It was this desire for the freedom of my people to live their lives with dignity and self-respect that animated my life...\"<br>(i) What desire is Mandela talking about?<br>(ii) What change did it bring in his life?",
                answer: "(i) The desire for the freedom of his people (all South Africans of color)<br>(ii) It transformed him from a frightened young man to a bold one, from a law-abiding attorney to a criminal, from a family-loving husband to a man without a home."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"The brave man is not he who does not feel afraid, but he who conquers that fear.\"<br>(i) Who said these words?<br>(ii) What is the meaning of these words?<br>(iii) Where did the speaker learn this lesson from?",
                answer: "(i) Nelson Mandela<br>(ii) True courage is not the absence of fear but overcoming fear despite feeling it<br>(iii) From his comrades in the struggle who showed strength and resilience against torture and attacks"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How does Mandela describe the systems of government in his country (i) in the first decade, and (ii) in the final decade, of the twentieth century?",
                answer: "(i) In the first decade: A system of racial domination created by white-skinned peoples who patched up their differences to oppress dark-skinned peoples, forming one of the harshest, most inhumane societies ever known.<br>(ii) In the final decade: A system that recognized the rights and freedoms of all peoples regardless of skin color, with South Africa's first democratic, non-racial government."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "What does Mandela mean by 'twin obligations'? What made it impossible for him to fulfill both obligations?",
                answer: "Twin obligations refers to (1) obligations to family (parents, wife, children) and (2) obligations to people, community and country. In apartheid South Africa, a man of color who tried to fulfill his duty to his people was inevitably separated from his family. Attempting to serve his people prevented him from fulfilling his family obligations."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "How did Mandela's understanding of freedom change with age and experience?",
                answer: "As a boy, he thought he was born free. As a student, he wanted freedom only for himself (staying out at night, reading what he pleased). As a young man in Johannesburg, he wanted basic freedoms (achieving potential, earning a living, having a family). Finally, he realized freedom was collective - he could not enjoy his limited freedoms while his people were not free."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How did 'depths of oppression create heights of character' according to Mandela?",
                answer: "The harsh apartheid system produced extraordinary leaders like Oliver Tambo, Walter Sisulu, and others with remarkable courage, wisdom and generosity. The extreme suffering and oppression fostered exceptional moral character and resilience in those who fought against it."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What were the ideals Mandela set out for the future of South Africa in his inaugural address?",
                answer: "Mandela pledged to liberate all people from poverty, deprivation, suffering, gender and other discrimination. He declared that South Africa would never again experience the oppression of one by another. He emphasized political emancipation, human dignity, justice, and peace for all people regardless of color."
            },
            {
                id: "eq2",
                type: "essay",
                text: "What is Mandela's understanding of courage and hatred based on his personal experiences?",
                answer: "Courage: Not the absence of fear, but triumph over it. The brave person feels afraid but conquers fear. He learned this from seeing comrades endure torture without breaking.\n\nHatred: Not innate but learned. 'No one is born hating another person because of their skin color.' People can be taught to love just as they learn to hate. Love is more natural to the human heart than hatred."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Why does Mandela say that the oppressor and the oppressed both need to be liberated?",
                answer: "Mandela believes a person who takes away another's freedom becomes 'a prisoner of hatred' and 'locked behind bars of prejudice and narrow-mindedness.' True freedom means not taking freedom from others. Both oppressed and oppressor lose their humanity in an oppressive system. Liberation must be mutual for a society to heal."
            }
        ]
    }
];

// Poem questions data
const poemQuestions = [
    {
        section: "Understanding the Poem",
        questions: [
            {
                id: "pq1",
                type: "short",
                text: "Where is the tiger in the poem?",
                answer: "The tiger is in a cage in a zoo."
            },
            {
                id: "pq2",
                type: "short",
                text: "How does the tiger move in the cage?",
                answer: "The tiger stalks the few steps of his cage on pads of velvet quiet."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Describe the different places where the tiger should be, according to the poet.",
                answer: "According to the poet, the tiger should be lurking in shadow, sliding through long grass near the water hole where deer pass. It should also be snarling around houses at the jungle's edge, terrorizing the village with its white fangs and claws."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What is the contrast drawn between the tiger in the zoo and in the wild?",
                answer: "In the zoo, the tiger is locked in a concrete cell, limited to stalking in small steps in his cage, ignoring visitors. In the wild, he would be free to hunt, lurk in shadows, slide through grass, and terrorize villages. The contrast is between captivity and freedom, between restricted and natural behavior."
            },
            {
                id: "pq5",
                type: "paragraph",
                text: "What effect does the repetition of 'brilliant' create in the last stanza?",
                answer: "The repetition of 'brilliant' (in 'brilliant eyes' and 'brilliant stars') creates a connection between the tiger and the cosmos. It emphasizes the contrast between his confinement and the vastness of the night sky, highlighting his longing for freedom and the natural world."
            }
        ]
    },
    {
        section: "Deeper Analysis",
        questions: [
            {
                id: "dq1",
                type: "essay",
                text: "What is the message of this poem? What does the poet want to convey through this poem?",
                answer: "The poem conveys the message that wild animals should not be confined in zoos, as captivity restricts their natural behavior and instincts. The poet wants to highlight the cruelty of removing animals from their natural habitat and the contrast between the tiger's limited existence in a cage versus its powerful, free life in the wild. There's a sense of the tiger's dignity despite confinement, as it continues to look beyond its prison to the stars."
            },
            {
                id: "dq2",
                type: "essay",
                text: "Are zoos necessary for the protection or conservation of some species of animals? Are there alternatives to zoos?",
                answer: "Zoos can play important roles in conservation of endangered species, breeding programs, research, and education. However, they also restrict animals' natural behaviors and can cause psychological distress. Alternatives include wildlife sanctuaries, national parks, protected reserves, and rehabilitation centers that provide more natural habitats while still offering protection. Virtual and augmented reality experiences could also educate people about animals without confining them."
            },
            {
                id: "dq3",
                type: "essay",
                text: "Compare the poem 'A Tiger in the Zoo' with Nelson Mandela's experience of imprisonment and freedom.",
                answer: "Both the tiger and Mandela experienced confinement and a loss of natural freedom. The tiger is physically restricted to a cage, while Mandela was imprisoned for 27 years. Both maintained dignity in confinement - the tiger still has its 'brilliant eyes' and gazes at stars; Mandela retained his principles and humanity. Both yearn for true freedom - the tiger should be in the wild; Mandela fought for freedom not just for himself but for his people. Both stories show how unnatural and harmful it is to restrict freedom, whether for animals or humans."
            }
        ]
    }
];

// Load questions when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize question set visibility
    showQuestionSet('story-questions');
    
    // Add event listeners to question set buttons if they exist
    const storyQuestionsBtn = document.querySelector('.story-nav-btn[onclick="showQuestionSet(\'story-questions\')"]');
    const poemQuestionsBtn = document.querySelector('.story-nav-btn[onclick="showQuestionSet(\'poem-questions\')"]');
    
    if (storyQuestionsBtn && poemQuestionsBtn) {
        storyQuestionsBtn.addEventListener('click', () => showQuestionSet('story-questions'));
        poemQuestionsBtn.addEventListener('click', () => showQuestionSet('poem-questions'));
    }
});

// Show a specific question set
function showQuestionSet(setId) {
    console.log(`Loading question set: ${setId}`);
    
    // Get the questions container
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) {
        console.error('Questions container not found');
        return;
    }
    
    // Clear previous content
    questionsContainer.innerHTML = '';
    
    // Determine which question set to show
    let questions;
    let title;
    
    if (setId === 'story-questions') {
        questions = storyQuestions;
        title = 'Nelson Mandela: Long Walk to Freedom - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'A Tiger in the Zoo - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        const isActive = (index === 0 && setId === 'story-questions') || 
                        (index === 1 && setId === 'poem-questions');
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.className = 'question-section-title';
    titleElement.textContent = title;
    questionsContainer.appendChild(titleElement);
    
    // Render each section of questions
    questions.forEach(section => {
        // Create section
        const sectionElement = document.createElement('div');
        sectionElement.className = 'question-set';
        
        // Add section title
        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = section.section;
        sectionElement.appendChild(sectionTitle);
        
        // Add questions
        section.questions.forEach(question => {
            // Create question item
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.id = question.id;
            
            // Add question text
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.innerHTML = question.text;
            questionItem.appendChild(questionText);
            
            // Add appropriate input based on question type
            if (question.type === 'short' || question.type === 'paragraph') {
                // Text area for short and paragraph answers
                const textarea = document.createElement('textarea');
                textarea.className = 'question-textarea';
                textarea.rows = question.type === 'short' ? 3 : 6;
                textarea.placeholder = `Write your ${question.type} answer here...`;
                textarea.dataset.questionId = question.id;
                questionItem.appendChild(textarea);
                
                // Check answer button
                const checkButton = document.createElement('button');
                checkButton.className = 'interactive-btn';
                checkButton.textContent = 'Check Answer';
                checkButton.onclick = function() { checkAnswer(question.id, question.answer); };
                questionItem.appendChild(checkButton);
                
                // Feedback element
                const feedback = document.createElement('div');
                feedback.className = 'question-feedback';
                feedback.id = `feedback-${question.id}`;
                feedback.style.display = 'none'; // Initially hidden
                questionItem.appendChild(feedback);
                
                // Show answer button
                const showAnswerButton = document.createElement('button');
                showAnswerButton.className = 'interactive-btn';
                showAnswerButton.textContent = 'Show Answer';
                showAnswerButton.style.marginLeft = '10px';
                showAnswerButton.onclick = function() { showAnswer(question.id, question.answer); };
                questionItem.appendChild(showAnswerButton);
            } 
            else if (question.type === 'essay') {
                // Larger text area for essay questions
                const textarea = document.createElement('textarea');
                textarea.className = 'question-textarea';
                textarea.rows = 10;
                textarea.placeholder = 'Write your essay answer here...';
                textarea.dataset.questionId = question.id;
                questionItem.appendChild(textarea);
                
                // Save button for essays
                const saveButton = document.createElement('button');
                saveButton.className = 'interactive-btn';
                saveButton.textContent = 'Save Essay';
                saveButton.onclick = function() { saveEssay(question.id); };
                questionItem.appendChild(saveButton);
                
                // Feedback element
                const feedback = document.createElement('div');
                feedback.className = 'question-feedback';
                feedback.id = `feedback-${question.id}`;
                feedback.style.display = 'none'; // Initially hidden
                questionItem.appendChild(feedback);
                
                // Show suggested answer button
                const showAnswerButton = document.createElement('button');
                showAnswerButton.className = 'interactive-btn';
                showAnswerButton.textContent = 'Show Suggested Response';
                showAnswerButton.style.marginLeft = '10px';
                showAnswerButton.onclick = function() { showAnswer(question.id, question.answer); };
                questionItem.appendChild(showAnswerButton);
            }
            else if (question.type === 'reference') {
                // Text area for reference questions
                const textarea = document.createElement('textarea');
                textarea.className = 'question-textarea';
                textarea.rows = 6;
                textarea.placeholder = 'Write your answer here...';
                textarea.dataset.questionId = question.id;
                questionItem.appendChild(textarea);
                
                // Check answer button
                const checkButton = document.createElement('button');
                checkButton.className = 'interactive-btn';
                checkButton.textContent = 'Check Answer';
                checkButton.onclick = function() { checkAnswer(question.id, question.answer); };
                questionItem.appendChild(checkButton);
                
                // Feedback element
                const feedback = document.createElement('div');
                feedback.className = 'question-feedback';
                feedback.id = `feedback-${question.id}`;
                feedback.style.display = 'none'; // Initially hidden
                questionItem.appendChild(feedback);
                
                // Show answer button
                const showAnswerButton = document.createElement('button');
                showAnswerButton.className = 'interactive-btn';
                showAnswerButton.textContent = 'Show Answer';
                showAnswerButton.style.marginLeft = '10px';
                showAnswerButton.onclick = function() { showAnswer(question.id, question.answer); };
                questionItem.appendChild(showAnswerButton);
            }
            
            // Add question to section
            sectionElement.appendChild(questionItem);
        });
        
        // Add section to container
        questionsContainer.appendChild(sectionElement);
    });
}

// Check answer function
function checkAnswer(questionId, correctAnswer) {
    const textarea = document.querySelector(`textarea[data-question-id="${questionId}"]`);
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    if (!textarea || !feedback) return;
    
    const userAnswer = textarea.value.trim();
    
    if (userAnswer.length === 0) {
        feedback.textContent = 'Please provide an answer before checking.';
        feedback.className = 'question-feedback warning show';
        feedback.style.display = 'block'; // Make sure it's visible
        return;
    }
    
    // For simplicity, we'll just check if the user's answer contains certain keywords from the correct answer
    // In a real implementation, you'd want a more sophisticated check
    const correctKeywords = correctAnswer.toLowerCase().split(/\s+/);
    const significantKeywords = correctKeywords.filter(word => 
        word.length > 4 && 
        !['about', 'above', 'after', 'again', 'along', 'around', 'because', 'before', 'below', 'between', 'could', 'every', 'first', 'found', 'their', 'there', 'these', 'thing', 'think', 'those', 'through', 'under', 'where', 'which', 'while', 'would'].includes(word)
    );
    
    const userKeywords = userAnswer.toLowerCase().split(/\s+/);
    const matchedKeywords = significantKeywords.filter(keyword => 
        userKeywords.some(userWord => userWord.includes(keyword) || keyword.includes(userWord))
    );
    
    const percentMatched = matchedKeywords.length / Math.min(5, significantKeywords.length);
    
    if (percentMatched >= 0.6) {
        feedback.textContent = 'Good answer! Your response covers the key points.';
        feedback.className = 'question-feedback correct show';
        feedback.style.display = 'block'; // Make sure it's visible
        
        // Update score if not already completed
        if (!document.getElementById(questionId).classList.contains('completed')) {
            document.getElementById(questionId).classList.add('completed');
            if (typeof updateScore === 'function') {
                updateScore(5);
            }
        }
    } else {
        feedback.textContent = 'Your answer may be missing some important points. Try again or check the suggested answer.';
        feedback.className = 'question-feedback incorrect show';
        feedback.style.display = 'block'; // Make sure it's visible
    }
}

// Save essay function
function saveEssay(questionId) {
    const textarea = document.querySelector(`textarea[data-question-id="${questionId}"]`);
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    if (!textarea || !feedback) return;
    
    const userAnswer = textarea.value.trim();
    
    if (userAnswer.length < 50) {
        feedback.textContent = 'Please write a more detailed essay (at least 50 characters).';
        feedback.className = 'question-feedback warning show';
        feedback.style.display = 'block'; // Make sure it's visible
        return;
    }
    
    feedback.textContent = 'Your essay has been saved!';
    feedback.className = 'question-feedback correct show';
    feedback.style.display = 'block'; // Make sure it's visible
    
    // Update score if not already completed
    if (!document.getElementById(questionId).classList.contains('completed')) {
        document.getElementById(questionId).classList.add('completed');
        if (typeof updateScore === 'function') {
            updateScore(10);
        }
    }
}

// Show answer function
function showAnswer(questionId, answer) {
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    if (!feedback) return;
    
    // Ensure the feedback is visible and styled properly
    feedback.innerHTML = `<strong>Suggested Answer:</strong><br>${answer}`;
    feedback.className = 'question-feedback show';
    feedback.style.display = 'block';
    feedback.style.padding = '15px';
    feedback.style.margin = '15px 0';
    feedback.style.backgroundColor = '#f5f5f5';
    feedback.style.border = '1px solid #ddd';
    feedback.style.borderRadius = '5px';
    feedback.style.color = '#333';
}

// Function to update the score (called from main.js)
function updateScore(points) {
    if (typeof score !== 'undefined' && typeof document.getElementById('totalScore') !== 'undefined') {
        score += points;
        document.getElementById('totalScore').textContent = score;
    }
}
