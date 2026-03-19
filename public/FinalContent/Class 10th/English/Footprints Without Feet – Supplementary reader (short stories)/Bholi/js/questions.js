/**
 * Questions for Bholi interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Why was the child named Bholi (the simpleton)?",
                answer: "She had fallen off the cot at 10 months old and damaged some part of her brain, making her a backward child."
            },
            {
                id: "sq2",
                type: "short",
                text: "Why did Bholi stammer?",
                answer: "She started speaking late (at five years of age), and when she did, she stammered. Other children made fun of her and mimicked her, making her talk very little."
            },
            {
                id: "sq3",
                type: "short",
                text: "Why was Bholi sent to school?",
                answer: "Since she was unlikely to get married due to her appearance and lack of intelligence, her parents decided to send her to school when the Tehsildar suggested it."
            },
            {
                id: "sq4",
                type: "short",
                text: "How was Bholi different from her siblings?",
                answer: "She had neither good looks nor intelligence. She was disfigured by pockmarks, she stammered, and she was considered backward, unlike her healthy and strong siblings."
            },
            {
                id: "sq5",
                type: "short",
                text: "How did Bholi's teacher help her overcome her fear?",
                answer: "The teacher spoke softly and soothingly to her, encouraged her to speak, patted her affectionately, and promised that she would learn to speak without stammering."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"What will that witless one say? She is like a dumb cow.\"<br>(i) Who says these words?<br>(ii) Who is the 'witless one'?<br>(iii) What was the occasion?",
                answer: "(i) Ramlal's wife (Bholi's mother)<br>(ii) Bholi<br>(iii) Discussing Bishamber's marriage proposal for Bholi"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"For the sake of your izzat, I was willing to marry this lame old man.\"<br>(i) Who speaks these words?<br>(ii) What does 'izzat' mean here?<br>(iii) Why does the speaker call this person a 'lame old man'?",
                answer: "(i) Bholi<br>(ii) Family honor or reputation<br>(iii) Because Bishamber was old (around 45-50) and had a limp"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "What kind of life did Bholi lead before she started going to school?",
                answer: "Bholi led a neglected life. She was considered a simpleton due to brain damage as an infant. Her body was disfigured by pockmarks from smallpox. She stammered and was mocked by other children. No new clothes were made for her; she only received her sisters' old clothes. No one cared to mend or wash her clothes."
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "Why did Ramlal's wife agree to send Bholi to school?",
                answer: "Ramlal's wife agreed to send Bholi to school because she believed that with Bholi's ugly face and lack of intelligence, there was little chance of her getting married anyway. She thought it was better to let the school teachers worry about her rather than keeping her at home."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "How did Bholi's teacher change her life?",
                answer: "The teacher was kind and patient with Bholi. She spoke gently, encouraged her to speak, and promised she would learn to read and speak properly. She gave Bholi hope that education would earn her respect and confidence. The teacher's support transformed Bholi from a stammering, fearful girl into a confident, educated woman who could stand up for herself."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "Why did Bholi refuse to marry Bishamber?",
                answer: "Bholi refused to marry Bishamber because he revealed himself to be greedy and contemptible when he demanded 5,000 rupees after seeing her pockmarked face. She considered him a heartless coward and felt she deserved better treatment. Her education had given her the confidence to make her own decisions."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "Bholi had many apprehensions about going to school. What made her feel that she was going to a better place than her home?",
                answer: "Bholi was initially afraid of school but began to feel positive when she received special treatment at home before going to school. She was bathed, given clean clothes, and had oil rubbed into her hair—attention she rarely received. At school, seeing other girls her age gave her hope of making friends. The teacher's kind treatment, gentle voice, and encouragement made her feel valued, respected, and gave her hope for a better future—all things she didn't experience at home where she was neglected and called names."
            },
            {
                id: "eq2",
                type: "essay",
                text: "How did Bholi's teacher play an important role in changing the course of her life?",
                answer: "The teacher transformed Bholi's life by showing her kindness, patience and respect when no one else did. She encouraged Bholi to speak despite her stammer, building her confidence gradually. The teacher's promise that education would bring respect and end mockery gave Bholi hope. Over the years, the teacher's mentorship helped Bholi become educated, confident, and independent. This education ultimately gave Bholi the courage to reject an unsuitable marriage and choose her own path as a teacher, breaking social norms of her time."
            },
            {
                id: "eq3",
                type: "essay",
                text: "Why did Bholi at first agree to an unequal match? Why did she later reject the marriage? What does this tell us about her?",
                answer: "Initially, Bholi agreed to marry the much older, lame Bishamber for her family's honor (izzat), showing her self-sacrifice and desire for family approval. However, when Bishamber demanded money after seeing her pockmarks, revealing his greed and shallow character, Bholi rejected him. Her rejection demonstrates her newfound self-respect, courage, and moral clarity. Her transformation from an obedient, stammering girl to a confident woman who could speak clearly and make her own decisions shows how education had empowered her to recognize her own worth and stand up against exploitation."
            },
            {
                id: "eq4",
                type: "essay",
                text: "Bholi's real name is Sulekha. We are told this right at the beginning. But only in the last but one paragraph of the story is Bholi called Sulekha again. Why do you think she is called Sulekha at that point in the story?",
                answer: "Bholi is called Sulekha again at the end to signify her complete transformation and reclamation of her true identity. Throughout the story, 'Bholi' (meaning simpleton) represents her marginalized, voiceless self, defined by others' perceptions of her disability and appearance. The return to 'Sulekha' marks the moment she fully embraces her authentic self—educated, articulate, and independent. This happens when she makes the life-changing decision to reject an exploitative marriage and choose her own path. The name change symbolizes her journey from a neglected, stammering girl to a confident woman who has overcome society's limitations and found her voice."
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
    
    if (storyQuestionsBtn) {
        storyQuestionsBtn.addEventListener('click', () => showQuestionSet('story-questions'));
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
        title = 'Bholi - Comprehension Questions';
    } else {
        console.error(`Unknown question set: ${setId}`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach((btn, index) => {
        const isActive = index === 0;
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
