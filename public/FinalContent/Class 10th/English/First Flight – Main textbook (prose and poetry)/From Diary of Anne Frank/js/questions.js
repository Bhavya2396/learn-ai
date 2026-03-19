/**
 * Questions for From the Diary of Anne Frank interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "What makes writing in a diary a strange experience for Anne Frank?",
                answer: "She had never written anything before, and she feels that no one would be interested in the musings of a thirteen-year-old schoolgirl."
            },
            {
                id: "sq2",
                type: "short",
                text: "Why did Anne think she could confide more in her diary than in people?",
                answer: "Because 'paper has more patience than people'. She could express her thoughts and feelings freely without being judged."
            },
            {
                id: "sq3",
                type: "short",
                text: "Why does Anne provide a brief sketch of her life?",
                answer: "So that readers of her diary would understand her stories to 'Kitty' (her diary) if they read it."
            },
            {
                id: "sq4",
                type: "short",
                text: "What tells you that Anne loved her grandmother?",
                answer: "She mentions that no one knows how often she thinks of her grandmother and still loves her. Her grandma's candle was lit along with the rest during her birthday celebration."
            },
            {
                id: "sq5",
                type: "short",
                text: "What subject was Anne not sure about passing?",
                answer: "She wasn't sure about mathematics."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "'Paper has more patience than people.'<br>(i) Who says this?<br>(ii) What does it mean?<br>(iii) Why does the speaker feel the need for patience?",
                answer: "(i) Anne Frank<br>(ii) It means that one can write anything in a diary without being judged or interrupted, unlike talking to people<br>(iii) Anne feels she has no real friend to confide in, and she wants to express her feelings"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"I don't want to jot down the facts in this diary the way most people would, but I want the diary to be my friend.\"<br>(i) What does this tell us about Anne?<br>(ii) What does she call her diary-friend?<br>(iii) What kind of relationship does she want with her diary?",
                answer: "(i) She's looking for a personal connection, not just record-keeping<br>(ii) She calls it 'Kitty'<br>(iii) She wants an intimate friendship where she can confide her deepest thoughts"
            }
        ]
    },
    {
        section: "Paragraph Questions",
        questions: [
            {
                id: "pq1",
                type: "paragraph",
                text: "Why was Mr Keesing annoyed with Anne? What did he ask her to do?",
                answer: "Mr Keesing was annoyed with Anne because she talked too much in class. After several warnings, he assigned her extra homework - an essay on the subject 'A Chatterbox.'"
            },
            {
                id: "pq2",
                type: "paragraph",
                text: "How did Anne justify her being a chatterbox in her essay?",
                answer: "Anne argued that talking was a student's trait and that she would try to control it but could never cure herself of the habit since her mother talked as much as she did, if not more. She argued it was an inherited trait that she couldn't do much about."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Do you think Mr Keesing was a strict teacher?",
                answer: "Mr Keesing initially appears strict as he gives Anne extra homework as punishment for talking. However, he showed his sense of humor and fairness by appreciating Anne's creative responses and eventually allowing her to talk in class, revealing a reasonable side to his strictness."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What made Mr Keesing allow Anne to talk in class?",
                answer: "Mr Keesing was impressed by Anne's creativity and humor in writing her third assignment - a poem about a family of ducks whose father bit them to death for quacking too much. He appreciated the joke and read it to multiple classes, showing he could take a joke directed at himself."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What does Anne write in her first essay to defend her habit of talking?",
                answer: "In her first essay, Anne defends her talkative nature by arguing that talking is a student's trait. She acknowledges she would try to control it but explains that she could never completely cure herself of this habit because it was an inherited trait - her mother talked as much as she did, if not more. She cleverly uses the argument that there's not much one can do about inherited qualities, presenting a thoughtful defense of her chattiness."
            },
            {
                id: "eq2",
                type: "essay",
                text: "Anne says teachers are most unpredictable. Is Mr Keesing unpredictable? How?",
                answer: "Yes, Mr Keesing proves to be unpredictable. Initially, he seems like a strict teacher who is annoyed with Anne for talking too much, giving her extra homework as punishment. However, he surprises everyone by appreciating Anne's creative essays instead of becoming more irritated. After her third assignment (the poem), his attitude changes completely - he reads it to other classes, starts making jokes himself, and allows Anne to talk in class. His transformation from a strict disciplinarian to someone who can appreciate humor and creativity demonstrates his unpredictability."
            },
            {
                id: "eq3",
                type: "essay",
                text: "What do these statements tell you about Anne Frank as a person?<br>'We don't seem to be able to get any closer, and that's the problem. Maybe it's my fault that we don't confide in each other.'",
                answer: "This statement reveals Anne's self-awareness, introspection, and emotional intelligence. She recognizes the superficiality in her friendships and yearns for deeper connections. Instead of simply blaming others, she considers her own role in the relationship dynamic, showing maturity and self-reflection. The statement demonstrates her honesty about her social struggles and her loneliness despite having many friends. It shows that Anne values authentic connections and is thoughtful about relationships, seeking something more meaningful than casual social interactions."
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
                text: "How old do you think Amanda is? How do you know this?",
                answer: "Amanda appears to be a school-age child, probably between 8-13 years old. This is evident from references to homework, tidying her room, cleaning her shoes, and warnings about chocolate causing acne, which are typical parental instructions to children of this age."
            },
            {
                id: "pq2",
                type: "short",
                text: "Who do you think is speaking to her?",
                answer: "An adult authority figure, most likely her parent or guardian, is speaking to her. The tone is instructional and reprimanding, with typical parental concerns about posture, homework, cleanliness, and behavior."
            },
            {
                id: "pq3",
                type: "paragraph",
                text: "Why are stanzas 2, 4 and 6 given in parenthesis?",
                answer: "These stanzas represent Amanda's inner thoughts or imagination. The parentheses separate them from reality (the adult's commands) and show her escape into fantasy worlds where she can be free from constant instructions and criticism. They reveal her internal retreat from the constant nagging."
            },
            {
                id: "pq4",
                type: "paragraph",
                text: "What does Amanda yearn for?",
                answer: "Amanda yearns for freedom, peace, and independence. Her fantasies (being a mermaid alone in the sea, an orphan with freedom, and Rapunzel in her tranquil tower) all represent escape from control, rules, and constant criticism. She dreams of worlds where she can exist without being continuously corrected and instructed."
            },
            {
                id: "pq5",
                type: "paragraph",
                text: "Do you know the story of Rapunzel? Why does Amanda want to be Rapunzel?",
                answer: "Rapunzel is a fairy tale character locked in a tower with long hair. Ironically, Amanda wants to be Rapunzel because she sees the tower as a peaceful sanctuary rather than a prison. While Rapunzel was imprisoned, Amanda imagines the isolation as 'tranquil and rare' - a place without nagging or demands. Her declaration to 'never let down my bright hair' shows she doesn't want rescue or interaction, but rather to maintain her solitude."
            }
        ]
    },
    {
        section: "Deeper Analysis",
        questions: [
            {
                id: "dq1",
                type: "essay",
                text: "Read the last stanza. Do you think Amanda is sulking and is moody?",
                answer: "The last stanza reveals a disconnect between Amanda's perception and the adult's perception. The adult accuses Amanda of sulking and being moody, but the poem has shown us that Amanda is actually retreating into her imagination as a coping mechanism against constant criticism. From the reader's perspective, Amanda isn't simply being moody - she's seeking mental escape from an environment of continuous correction. The adult's accusation that 'Anyone would think that I nagged at you' contains irony, as the entire poem demonstrates precisely that nagging behavior. Amanda's withdrawal isn't mere moodiness but a natural response to feeling constantly criticized."
            },
            {
                id: "dq2",
                type: "essay",
                text: "What are the different imaginary worlds that Amanda creates?",
                answer: "Amanda creates three distinct imaginary worlds as escapes:<br>1) A serene underwater realm where she's a mermaid - the sole inhabitant of a 'languid, emerald sea' drifting blissfully. This represents complete solitude and freedom from social expectations.<br>2) Life as an orphan roaming the streets, where she patterns dust with her bare feet. Here, she imagines independence without parental oversight, finding peace in 'golden' silence and 'sweet' freedom.<br>3) Being Rapunzel in a tower, but ironically seeing this traditionally imprisoning situation as 'tranquil and rare.' She adapts the fairy tale by declaring she'll never let down her hair (never allow rescue), preferring isolation to constant criticism.<br>All three fantasies share themes of solitude, independence, and escape from criticism and control."
            },
            {
                id: "dq3",
                type: "essay",
                text: "Every child feels controlled or instructed at times. Have you ever felt this way? How do you handle such situations?",
                answer: "This question invites personal reflection about experiences with authority and coping mechanisms. Consider:<br>- Times when you've felt overwhelmed by instructions or criticism<br>- Whether you use imagination as an escape like Amanda<br>- Other coping strategies like communication, compromise, or creative expression<br>- The balance between necessary guidance and excessive control<br>- How perspective changes as children mature and understand the reasons behind rules"
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
        title = 'From the Diary of Anne Frank - Comprehension Questions';
    } else if (setId === 'poem-questions') {
        questions = poemQuestions;
        title = 'Amanda! - Comprehension Questions';
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
