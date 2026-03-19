/**
 * Questions for Iswaran the Storyteller interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "In what way is Iswaran an asset to Mahendra?",
                answer: "Iswaran cooks for Mahendra, washes his clothes, keeps him company, tells entertaining stories, and can produce fresh vegetables even in desolate locations."
            },
            {
                id: "sq2",
                type: "short",
                text: "How does Iswaran describe the uprooted tree on the highway?",
                answer: "He describes it dramatically as \"an enormous bushy beast lying sprawled across the road\" that initially made him want to turn back."
            },
            {
                id: "sq3",
                type: "short",
                text: "Why did Mahendra call Iswaran's ghost story a figment of his imagination?",
                answer: "Mahendra didn't believe in ghosts or spirits and thought Iswaran was making up stories due to his overactive imagination."
            },
            {
                id: "sq4",
                type: "short",
                text: "What happens to Mahendra on a full-moon night?",
                answer: "Mahendra sees what appears to be the ghost that Iswaran had described - a dark cloudy form clutching a bundle, which terrifies him."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"He would miraculously conjure up the most delicious dishes made with fresh vegetables within an hour of arriving at the zinc-sheet shelter at the new workplace.\"<br>(i) Who is 'he' in this sentence?<br>(ii) What does 'conjure up' mean here?<br>(iii) Why was this ability considered amazing?",
                answer: "(i) Iswaran<br>(ii) To make something appear as if by magic<br>(iii) Because they were often in desolate locations with no shops for miles"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"His own descriptions were greatly influenced by the Tamil authors that he read.\"<br>(i) Whose descriptions are being referred to?<br>(ii) How did these authors influence him?<br>(iii) Give an example of this influence.",
                answer: "(i) Iswaran's descriptions<br>(ii) He adopted their dramatic storytelling style with suspense and surprise endings<br>(iii) His description of the fallen tree as \"an enormous bushy beast\" instead of simply saying he saw an uprooted tree"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "Describe Iswaran's storytelling technique.",
                answer: "Iswaran had a flair for dramatic storytelling. He added suspense and surprise endings even to mundane events. He used gestures (arched eyebrows, hand movements), adopted dramatic language, acted out scenes (stamping feet like an elephant), and built suspense by pausing at crucial moments in the story."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "How does Iswaran narrate the story of the tusker? Does it appear to be plausible?",
                answer: "Iswaran narrates it with great drama and excitement - describing the elephant's rampage through town, destruction at school, and his own heroic confrontation where he supposedly used a Japanese martial art technique. The story seems implausible because a young schoolboy defeating a rampaging elephant with a single strike appears highly exaggerated, especially his claim about knowing karate or ju-jitsu from merely reading about it somewhere."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Why does the author say that Iswaran seemed to more than make up for the absence of a TV in Mahendra's living quarters?",
                answer: "Iswaran provided constant entertainment with his dramatic storytelling, making everyday events sound exciting. He told endless stories full of adventure, horror, and suspense - similar to what one might watch on television. His theatrical delivery with gestures, sound effects, and acting made his stories as engaging as watching a TV show."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "Mahendra calls ghosts or spirits a figment of the imagination. What happens to him on a full-moon night?",
                answer: "Despite dismissing ghosts as imaginary, Mahendra experiences what appears to be a supernatural encounter. After hearing Iswaran's description of a female ghost with matted hair holding a foetus, Mahendra becomes anxious on full-moon nights. One night, he hears moaning sounds outside his window. Though initially reluctant to look, he eventually peers out and sees 'a dark cloudy form clutching a bundle' - matching Iswaran's description. He breaks into a cold sweat and falls back, terrified. Though he later rationalizes it as 'auto suggestion,' his fear is confirmed when Iswaran reveals he heard Mahendra's moaning and saw him encountering the ghost. This experience so terrifies Mahendra that he immediately resigns and decides to leave the haunted place."
            },
            {
                id: "eq2",
                type: "essay",
                text: "Can you think of some other ending for the story?",
                answer: "Alternative ending possibilities: (1) Mahendra could confront Iswaran, discovering it was a prank where Iswaran dressed up as the ghost to prove his stories were true. (2) Mahendra might investigate the moaning sounds, finding a logical explanation like an injured animal or wind through pipes. (3) Mahendra could decide to stay despite his fear, developing a scientific interest in documenting the supernatural occurrences. (4) Iswaran might admit to making up the ghost story, but they both witness something truly inexplicable that night. (5) Mahendra could invite a paranormal investigator, leading to discoveries about the burial ground's history."
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
        title = 'Iswaran the Storyteller - Comprehension Questions';
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
