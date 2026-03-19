/**
 * Questions for The Beggar interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "What different stories does Lushkoff tell about himself?",
                answer: "First he claims to be a village schoolteacher who lost his job through intrigues. Then Sergei reveals that he previously claimed to be an expelled student. Finally, Lushkoff admits he was a singer in a Russian choir who was dismissed for drunkenness."
            },
            {
                id: "sq2",
                type: "short",
                text: "Why does Lushkoff tell lies?",
                answer: "Lushkoff says he can't get along without lying because no one will give him anything when he tells the truth."
            },
            {
                id: "sq3",
                type: "short",
                text: "What does Sergei initially think has reformed Lushkoff?",
                answer: "Sergei believes his own words and actions have reformed Lushkoff. He takes credit for putting Lushkoff on the right path."
            },
            {
                id: "sq4",
                type: "short",
                text: "What is Lushkoff's profession when he meets Sergei at the theatre?",
                answer: "Lushkoff is working as a notary and earning thirty-five roubles a month."
            },
            {
                id: "sq5",
                type: "short",
                text: "What specifically does Olga do that helps Lushkoff change?",
                answer: "Olga speaks to him with concern for his wellbeing, weeps for his situation, and secretly chops all the wood for him while he is supposedly working."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"Work — yes. I know that myself; but where can I find work?\"<br>(i) Who says these words?<br>(ii) What is the context of this statement?<br>(iii) What work is offered to the speaker after this?",
                answer: "(i) Lushkoff says these words.<br>(ii) Sergei has just told him that he should work rather than beg, and Lushkoff acknowledges this but questions where he can find employment.<br>(iii) Sergei offers him the opportunity to chop wood."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"It was obvious from his gait that he had not consented to go and chop wood because he was hungry and wanted work, but simply from pride and shame and because he had been trapped by his own words.\"<br>(i) What does this tell us about Lushkoff's character?<br>(ii) What happens when he attempts to chop wood?<br>(iii) How does Sergei react to this scene?",
                answer: "(i) Lushkoff has pride despite his situation and feels trapped when he's caught in his lies.<br>(ii) He struggles to chop the wood - he taps feebly at the billet, which keeps falling down; he appears weak and incapable.<br>(iii) Sergei begins to feel sorry and ashamed for making a spoiled, possibly sick man do menial labor in the cold."
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How does Lushkoff's appearance and behavior change over the course of the story?",
                answer: "At first, Lushkoff appears as a shabby, drunk beggar in mismatched overshoes who can barely stand. When offered work, he seems reluctant and weak. By the end of the story, he has transformed into a respectable notary in better clothing (coat with collar of curly fur). His behavior changes from deceptive and helpless to honest, grateful, and employed."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "What kind of help did Sergei provide to Lushkoff? Was it effective?",
                answer: "Sergei provided physical work opportunities (chopping wood, shoveling snow, moving furniture), payment for labor, clothing (old trousers), and eventually a referral for clerical work (copying). His help was partially effective - the work and income helped sustain Lushkoff, and the referral led to better employment. However, we learn that the true catalyst for change was Olga's compassion."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "How does Olga treat Lushkoff, and why is her approach more effective than Sergei's?",
                answer: "While Olga appears harsh (scolding Lushkoff, calling him names like 'sot' and 'miserable creature'), she shows genuine emotional concern by sitting with him, looking into his face, weeping for him, and secretly chopping the wood for him. Her approach is more effective because it combines practical help with emotional support and genuine care for his wellbeing. Unlike Sergei's more transactional approach, Olga treats Lushkoff with compassion that acknowledges his humanity."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What do you think is the main message of the story?",
                answer: "The main message is about the transformative power of compassion and genuine human connection. While practical help (like providing work) is important, true change comes from being seen and cared for as a person worthy of concern. The story also suggests that what appears to be helping someone (Sergei's work assignments) may be less impactful than unseen acts of kindness (Olga's emotional support and secretly chopping the wood). Finally, it shows that people are often not changed by harsh judgment but by unexpected kindness."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "Sergei says, \"I am happy that my words have taken effect.\" Why does he say so? Is he right in saying this?",
                answer: "Sergei says this because he observes that Lushkoff is now sober and working, and he assumes his own advice and opportunities have reformed Lushkoff. He's incorrect - while his referral for copying work did help Lushkoff advance, the real transformation came from Olga's compassion and assistance. Sergei doesn't realize that Olga secretly chopped all the wood and provided the emotional support that truly changed Lushkoff. The irony is that Sergei takes credit for a transformation he did not cause, demonstrating how we can misunderstand the true catalysts of change in others' lives."
            },
            {
                id: "eq2",
                type: "essay",
                text: "During their conversation Lushkoff reveals that Sergei's cook, Olga, is responsible for the positive change in him. How has Olga saved Lushkoff?",
                answer: "Olga saved Lushkoff through a combination of tough love, genuine compassion, and practical help. While verbally scolding him as a drunkard headed for ruin, she showed deep emotional investment by sitting with him, looking into his face, and weeping for his situation. Most significantly, she secretly chopped all the wood for him, allowing him to maintain his dignity while still receiving payment. This combination of seeing him as a person worthy of concern, expressing genuine emotional investment in his welfare, and providing tangible assistance without humiliating him created the conditions for his transformation. Unlike Sergei's more detached approach, Olga's actions demonstrated that someone truly cared about Lushkoff as a human being, not just as a problem to be solved."
            },
            {
                id: "eq3",
                type: "essay",
                text: "How can we help beggars/abolish begging? What are your thoughts based on the story?",
                answer: "The story suggests several approaches to addressing begging: 1) Providing opportunities for work and dignity rather than just handouts; 2) Treating people with compassion while still holding them accountable; 3) Recognizing that behind begging may lie complex issues like addiction (Lushkoff's alcoholism); 4) Understanding that true help often involves both practical assistance and emotional support; 5) Realizing that reformation may require personalized approaches rather than one-size-fits-all solutions. The story implies that abolishing begging requires both systemic opportunities (jobs, education) and personal connection that recognizes the humanity and potential in each individual. Meaningful change comes not just from material support but from treating people with dignity and genuine concern for their welfare."
            }
        ]
    }
];

// Load questions when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize question set visibility
    showQuestionSet('story-questions');
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
        title = 'The Beggar - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
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
