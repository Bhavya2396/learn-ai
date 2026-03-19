/**
 * Questions for Kathmandu interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Name the two temples the author visited in Kathmandu.",
                answer: "Pashupatinath and Baudhnath stupa."
            },
            {
                id: "sq2",
                type: "short",
                text: "What does the author mean by 'febrile confusion'?",
                answer: "Hurried activity and complete chaos."
            },
            {
                id: "sq3",
                type: "short",
                text: "What is sold in the shops around Baudhnath stupa?",
                answer: "Felt bags, Tibetan prints, and silver jewellery."
            },
            {
                id: "sq4",
                type: "short",
                text: "What does the author compare the bansuris to?",
                answer: "The quills of a porcupine."
            },
            {
                id: "sq5",
                type: "short",
                text: "Name five kinds of flutes mentioned in the text.",
                answer: "Reed neh, recorder, Japanese shakuhachi, bansuri, Chinese flutes."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"The policeman is not convinced that they are 'the Hindus'\"<br>(i) Who does 'they' refer to?<br>(ii) Why is the policeman not convinced?<br>(iii) What is the significance of this passage?",
                answer: "(i) The party of saffron-clad Westerners<br>(ii) Because they are foreigners, not Hindus by birth/ethnicity<br>(iii) It shows the cultural restrictions at sacred sites and how foreigners are sometimes restricted from entering certain places of worship"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"I wash it down with Coca Cola and a nauseating orange drink, and feel much the better for it.\"<br>(i) What does 'it' refer to?<br>(ii) What does the phrase 'wash down' mean here?<br>(iii) Why does the author feel 'better' despite calling the drink 'nauseating'?",
                answer: "(i) All the items he bought (marzipan, corn-on-the-cob, comics, Reader's Digest)<br>(ii) To drink something after eating<br>(iii) The author is indulging in familiar comfort foods that make him feel better emotionally, even if they aren't particularly tasty or healthy"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "Compare and contrast the atmosphere at the Pashupatinath temple with the Baudhnath stupa.",
                answer: "Pashupatinath has 'febrile confusion' with priests, hawkers, devotees, tourists, animals creating chaos. People push and elbow for attention. In contrast, Baudhnath stupa has 'a sense of stillness' and is described as a 'haven of quietness.' There are small shops but no crowds."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "What is the belief at Pashupatinath about the end of Kaliyug?",
                answer: "There is a small shrine half protruding from the stone platform on the river bank. When it emerges fully, the goddess inside will escape, and the evil period of the Kaliyug will end on earth."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "How does the author describe Kathmandu's busiest streets?",
                answer: "The author describes Kathmandu as 'vivid, mercenary, religious' with small shrines along narrow busy streets, fruit and flute sellers, hawkers of postcards, shops selling both Western goods and local items. There's noise from film songs, car horns, bicycle bells, and vendors shouting."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What makes the flute seller different from the other hawkers?",
                answer: "Unlike other hawkers, the flute seller plays his instrument slowly and meditatively without excessive display. He doesn't shout to attract customers. He makes sales in an 'offhanded way' as if selling is incidental to his playing. It seems like a long-established pattern of life."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "\"To hear any flute is to be drawn into the commonality of all mankind.\" Why does the author say this?",
                answer: "The author views the flute as a universal instrument found in all cultures (reed neh, recorder, Japanese shakuhachi, bansuri, Chinese flutes). Despite each having its own fingering and range, flute music has universal appeal. Its sound resembles the human voice, and like humans, it must pause to breathe. This universality creates a connection to shared human experience across cultures."
            },
            {
                id: "eq2",
                type: "essay",
                text: "What contrasts does the author highlight between different parts of Kathmandu?",
                answer: "The author contrasts the chaos of Pashupatinath temple with the stillness of Baudhnath stupa. He juxtaposes religious sites with commercial areas, traditional items with Western goods, quiet contemplation with noisy streets. He shows how tradition coexists with modernity (traditional flutes vs. modern drinks), and how sacred spaces exist alongside ordinary commercial activities."
            },
            {
                id: "eq3",
                type: "essay",
                text: "How does the author's attitude toward home change throughout the passage?",
                answer: "At the beginning, the author seems detached from thoughts of home while exploring Kathmandu. Midway, he considers taking a longer route home through various cities, showing some interest in extending his journey. By the end, he admits to being 'exhausted and homesick' and decides to take a direct flight home. The significance of familiar things (like flute music) grows stronger as he prepares to return."
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
                text: "What does 'a slumber did my spirit seal' mean?",
                answer: "It means a deep sleep closed off the poet's soul or mind."
            },
            {
                id: "pq2",
                type: "short",
                text: "What does 'she seemed a thing that could not feel the touch of earthly years' suggest?",
                answer: "It suggests that the poet believed his loved one was immortal or unaffected by time and aging."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Which lines of the poem say that the passing of time will no longer affect her?",
                answer: "\"No motion has she now, no force— / She neither hears nor sees.\" These lines indicate that she is now beyond the effects of time, as she no longer moves or experiences the world."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What does 'rolled round in earth's diurnal course' mean?",
                answer: "It means that she is now part of the earth's daily rotation—she has become one with nature, moving with the rocks, stones, and trees as the earth turns each day. 'Diurnal' refers to the daily rotation of the earth on its axis."
            },
            {
                id: "pq5",
                type: "paragraph",
                text: "How does the poet imagine her to be, after death?",
                answer: "The poet imagines her not in a heavenly state but as part of the natural world—integrated with the earth and its elements. She has become part of nature's cycles, rotating with the earth along with 'rocks and stones and trees.'"
            }
        ]
    },
    {
        section: "Deeper Analysis",
        questions: [
            {
                id: "dq1",
                type: "essay",
                text: "How does the poet react to his loved one's death? Does he feel bitter grief or a great peace?",
                answer: "The poet's reaction seems to be one of quiet acceptance rather than bitter grief. There's a sense of resignation and peace in how he describes her becoming part of nature's cycles. The 'slumber' that sealed his spirit suggests he's numbed or distanced from intense pain. He finds solace in seeing her as part of the natural world rather than simply gone."
            },
            {
                id: "dq2",
                type: "essay",
                text: "Why does the poet contrast his earlier perception of her with her state after death?",
                answer: "The contrast emphasizes the transformation from life to death. Initially, he thought she was immune to time ('could not feel the touch of earthly years'), suggesting youthful immortality. After death, ironically, she truly is beyond time's effects but not in the way he imagined—not through immortal life but through becoming part of timeless nature. This contrast highlights his coming to terms with mortality."
            },
            {
                id: "dq3",
                type: "essay",
                text: "What is the significance of the natural imagery in the last two lines of the poem?",
                answer: "The natural imagery ('rocks and stones and trees') emphasizes how death returns us to nature. By associating her with these enduring elements of earth, the poet suggests a kind of immortality through integration with nature rather than personal immortality. The earth's 'diurnal course' (daily rotation) also suggests continuity and cyclical patterns that transcend individual human life. This provides comfort through connection to something eternal."
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
        title = 'Kathmandu - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'A Slumber Did My Spirit Seal - Comprehension Questions';
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
