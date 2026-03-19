/**
 * Questions for A Triumph of Surgery interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Who is Mrs Pumphrey?",
                answer: "Mrs Pumphrey is Tricki's owner/mistress, a wealthy woman who overfeeds and pampers her pet dog."
            },
            {
                id: "sq2",
                type: "short",
                text: "What kind of animal is Tricki?",
                answer: "Tricki is a small dog, described as a 'little golden figure'."
            },
            {
                id: "sq3",
                type: "short",
                text: "What was Tricki's main problem?",
                answer: "Tricki was extremely overweight due to overfeeding and lack of exercise."
            },
            {
                id: "sq4",
                type: "short",
                text: "Why did Mrs Pumphrey think Tricki was suffering from malnutrition?",
                answer: "Because he was listless and had no energy, so she wrongly thought he needed more food rather than less."
            },
            {
                id: "sq5",
                type: "short",
                text: "What did the narrator do to help Tricki?",
                answer: "The narrator (the veterinarian) took Tricki to his surgery where he gave the dog no food for two days, only water, then gradually reintroduced food and allowed him to exercise with other dogs."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"I was really worried about Tricki this time.\"<br>(i) Who is 'I' in this statement?<br>(ii) Why was the speaker worried?<br>(iii) What did Tricki look like?",
                answer: "(i) 'I' refers to the veterinarian, Mr. Herriot.<br>(ii) The speaker was worried because Tricki's health had seriously deteriorated due to obesity.<br>(iii) Tricki looked 'hugely fat, like a bloated sausage with a leg at each corner,' with bloodshot, rheumy eyes and his tongue lolling from his jaws."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"The word 'convalescing' seemed to do something to Mrs Pumphrey.\"<br>(i) What did the word make Mrs Pumphrey do?<br>(ii) How did this affect the narrator and his household?<br>(iii) What does this tell us about Mrs Pumphrey's character?",
                answer: "(i) It made her bring round fresh eggs, two dozen at a time, bottles of wine, and later brandy - supposedly for Tricki's recovery.<br>(ii) The narrator and his colleagues enjoyed the luxury items themselves, having eggs for breakfast, wine at lunch, and brandy in the evenings.<br>(iii) It shows she's wealthy, generous, gullible, and overly indulgent toward her pet, willing to go to extreme lengths for what she believes will help him."
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "What was Tricki's daily routine like at Mrs Pumphrey's home? How did this affect his health?",
                answer: "At Mrs Pumphrey's home, Tricki was overfed with regular meals plus 'extras' like cream cakes, chocolates, malt and cod-liver oil, and Horlicks at night. He had very little exercise - only short walks with Mrs Pumphrey since the gardener who played ring-throwing games with him had lumbago. This lifestyle made him severely overweight, lethargic, and eventually sick with vomiting episodes and complete loss of energy."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "Describe the transformation in Tricki during his stay at the surgery. What caused this change?",
                answer: "Tricki transformed from an obese, lethargic, unhealthy dog to 'a lithe, hard-muscled animal.' The change was caused by a proper diet (initial fasting followed by regular, appropriate meals), extensive exercise playing with the other dogs, and a normal, active lifestyle. He became energetic enough to join in 'scrimmages' with other dogs, hunt rats, and run actively around the garden."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "What did Mrs Pumphrey send for Tricki during his stay at the surgery and what did the narrator and his colleagues do with these items?",
                answer: "Mrs Pumphrey sent fresh eggs (two dozen at a time), bottles of wine, and later brandy, supposedly to help with Tricki's recovery. The narrator and his colleagues consumed these items themselves, enjoying eggs for breakfast, wine at lunch, and brandy in the evenings, calling them 'days of deep content.'"
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "Why did Mrs Pumphrey call Tricki's recovery 'a triumph of surgery'? Was it actually a triumph of surgery?",
                answer: "Mrs Pumphrey called it 'a triumph of surgery' because she believed some complex medical intervention had saved Tricki's life. In reality, there was no surgery or medical treatment involved - just proper diet, exercise, and a healthy lifestyle. The irony is that the cure was simply the removal of the unhealthy conditions that Mrs Pumphrey had created."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "Why do you think the author titled the story 'A Triumph of Surgery' when no actual surgery was performed?",
                answer: "The title is ironic and humorous. The 'triumph' was not a medical procedure but simply removing Tricki from his pampered lifestyle. The humor comes from Mrs Pumphrey's misunderstanding - she believes complex medical intervention saved Tricki when it was just proper diet and exercise. The title also highlights the contrast between perceived complexity (surgery) and actual simplicity (lifestyle change) of the solution."
            },
            {
                id: "eq2",
                type: "essay",
                text: "Do you think Mrs Pumphrey was a good pet owner? Give reasons for your answer.",
                answer: "Consider: She loved Tricki deeply and was willing to spend lavishly on him. However, she harmed him with overfeeding and lack of exercise. She ignored professional advice about his diet. She humanized him by giving him clothes and treating him like a child. She seemed more focused on her emotional needs than his physical health. A good owner should balance affection with proper care based on the animal's actual needs."
            },
            {
                id: "eq3",
                type: "essay",
                text: "What qualities of a good veterinarian are shown by the narrator in this story?",
                answer: "The narrator shows several professional qualities: diagnostic skills (immediately recognizing the obesity problem), clear communication (firmly telling Mrs Pumphrey to change Tricki's diet), decisive action when needed (taking Tricki away), practical treatment approach (focusing on diet and exercise rather than unnecessary medication), patience (dealing with an overindulgent pet owner), and appropriate humor and compassion while maintaining professional ethics."
            }
        ]
    },
    {
        section: "Think About It",
        questions: [
            {
                id: "tq1",
                type: "essay",
                text: "What kind of a person do you think the narrator, a veterinary surgeon, is? Would you say he is tactful as well as full of common sense?",
                answer: "The narrator shows practicality, humor, and professional ethics. He's tactful in handling Mrs Pumphrey's excessive pampering without harshly criticizing her. He shows common sense by implementing a simple solution (proper diet and exercise) rather than unnecessary medical interventions. He's also honest and compassionate, caring genuinely for both animal and owner, while having a sense of humor about the situation."
            },
            {
                id: "tq2",
                type: "essay",
                text: "Do you think Tricki was happy to go home? What do you think will happen now?",
                answer: "Tricki showed excitement upon seeing Mrs Pumphrey, leaping into her lap and licking her face, suggesting he was happy to see her. However, he had clearly enjoyed his time at the surgery with the other dogs. In the future, Tricki will likely gradually return to being overweight unless Mrs Pumphrey has genuinely learned her lesson. The cycle might repeat itself, given Mrs Pumphrey's personality and her fundamental misunderstanding of what actually helped Tricki."
            },
            {
                id: "tq3",
                type: "essay",
                text: "Do you think this is a real-life episode, or mere fiction? Or is it a mixture of both?",
                answer: "The story feels realistic due to its detailed observations of animal and human behavior, the plausible medical scenario, and the author's background as a real veterinarian. James Herriot (pen name of James Alfred Wight) based his stories on his experiences as a country vet, though he often combined events and embellished characters for literary effect. The story likely has a core of truth with artistic enhancements for humor and narrative impact."
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
        title = 'A Triumph of Surgery - Comprehension Questions';
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
