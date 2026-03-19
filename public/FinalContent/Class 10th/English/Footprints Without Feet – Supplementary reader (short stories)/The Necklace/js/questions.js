/**
 * Questions for The Necklace interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "What kind of a person is Mme Loisel?",
                answer: "Mme Loisel is a pretty, young lady who feels she was born for luxuries. She is discontented with her modest lifestyle and constantly dreams of wealth and elegance."
            },
            {
                id: "sq2",
                type: "short",
                text: "What kind of a person is her husband?",
                answer: "Her husband is kind, understanding and generous. He sacrifices his own desires (like buying a gun) to please her, and works hard to repay the debt for ten years."
            },
            {
                id: "sq3",
                type: "short",
                text: "What did Mme Loisel's husband bring her one evening?",
                answer: "He brought her an invitation to a grand party at the Minister's residence."
            },
            {
                id: "sq4",
                type: "short",
                text: "How did Mme Loisel react to the invitation?",
                answer: "Instead of being delighted, she threw it spitefully on the table and was upset because she had nothing suitable to wear to such an occasion."
            },
            {
                id: "sq5",
                type: "short",
                text: "Why was Mme Loisel unhappy before the party?",
                answer: "First she was unhappy because she had no suitable dress. After getting money for the dress, she was unhappy because she had no jewels to adorn herself with."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"She suffered incessantly, feeling herself born for all delicacies and luxuries.\"<br>(i) Who is 'she' in these lines?<br>(ii) Why did she suffer?<br>(iii) What does this tell us about her character?",
                answer: "(i) 'She' refers to Madame Loisel/Matilda.<br>(ii) She suffered because she felt she deserved a life of luxury but was trapped in poverty.<br>(iii) It tells us she was materialistic, discontented with her life, and believed she deserved better than her actual circumstances."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"Mine were false. They were not worth over five hundred francs!\"<br>(i) Who says these words and to whom?<br>(ii) What is the speaker referring to?<br>(iii) What is the irony in this statement?",
                answer: "(i) Madame Forestier says these words to Madame Loisel.<br>(ii) She is referring to the diamond necklace that she had lent to Madame Loisel.<br>(iii) The irony is that Mme Loisel and her husband spent ten years paying off an expensive replacement for what was actually just costume jewelry worth very little."
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "How did Mme Loisel solve her problem of not having jewelry for the party?",
                answer: "At her husband's suggestion, Mme Loisel visited her wealthy friend Mme Forestier and borrowed a diamond necklace from her. This allowed her to attend the party with both a new dress and beautiful jewelry."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "What happened when Mme Loisel returned home from the party?",
                answer: "When Mme Loisel returned home and looked at herself in the mirror one last time, she discovered that the diamond necklace was no longer around her neck. Despite searching everywhere and retracing their steps, they could not find it."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What did the Loisels do to replace the necklace?",
                answer: "The Loisels found a similar necklace at a jeweler's in the Palais-Royal for thirty-six thousand francs. Mr. Loisel used his eighteen thousand franc inheritance and borrowed the rest from various lenders. They purchased this replacement necklace and returned it to Mme Forestier without telling her about the loss."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "How did the Loisels repay their debt and what was its effect on their lives?",
                answer: "They moved to a smaller apartment, dismissed their servant, and lived in extreme poverty. Mr. Loisel worked multiple jobs and Mme Loisel did all the heavy household work and shopped frugally. After ten years of this difficult life, they finally repaid all the debt, but Mme Loisel had aged prematurely and lost her beauty."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What was the cause of Matilda's ruin? How could she have avoided it?",
                answer: "Matilda's ruin was caused by her vanity, pride and materialism. She wanted to appear wealthy and lost a borrowed necklace at the party. Her failure to admit the truth to Mme Forestier and the decision to replace it with an expensive one led to her financial ruin. She could have avoided this by being honest with Mme Forestier about losing the necklace, or by being content with her social status and not aspiring beyond her means."
            },
            {
                id: "eq2",
                type: "essay",
                text: "The course of the Loisels' life changed due to the necklace. Comment.",
                answer: "The necklace dramatically altered the Loisels' lives. Before losing it, they lived a modest but comfortable middle-class life. After losing and replacing it, they descended into extreme poverty for a decade. They lost their home, servant, social position, and Mme Loisel lost her beauty and youth. The ironic twist at the end—that the original necklace was fake—makes their sacrifice even more tragic. Their lives were changed not just by the necklace itself but by Matilda's vanity and their decision to hide the truth."
            },
            {
                id: "eq3",
                type: "essay",
                text: "What would have happened to Matilda if she had confessed to her friend that she had lost her necklace?",
                answer: "If Matilda had confessed to Mme Forestier about losing the necklace, she would have learned that it was made of fake diamonds worth only 500 francs. This would have saved the Loisels from the crushing debt and decade of poverty they endured. They could have easily replaced the fake necklace at an affordable price. Matilda would have maintained her youth, beauty, and comfortable lifestyle. Though embarrassing in the moment, honesty would have spared them years of hardship and sacrifice."
            },
            {
                id: "eq4",
                type: "essay",
                text: "If you were caught in a situation like this, how would you have dealt with it?",
                answer: "In a similar situation, the best approach would be honesty. I would immediately confess to losing the borrowed item and offer to replace it. Open communication might reveal important details (like the necklace being fake) that would affect the solution. I would take responsibility for my carelessness but wouldn't allow pride to drive me to extreme measures like taking on crushing debt. I would seek a reasonable solution through honest dialogue with the owner, perhaps offering to pay the actual value over time if necessary."
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
        title = 'The Necklace - Comprehension Questions';
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
