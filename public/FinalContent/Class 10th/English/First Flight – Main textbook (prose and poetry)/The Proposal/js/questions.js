/**
 * Questions for The Proposal interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "What does Chubukov at first suspect that Lomov has come for?",
                answer: "Chubukov at first suspects that Lomov has come to borrow money."
            },
            {
                id: "sq2",
                type: "short",
                text: "Is Chubukov sincere when he later says \"And I've always loved you, my angel, as if you were my own son\"?",
                answer: "No, Chubukov is not sincere. He previously thought Lomov came to borrow money and was even prepared to refuse him, but changed his attitude completely when he learned about the proposal."
            },
            {
                id: "sq3",
                type: "short",
                text: "How does Lomov's health condition affect him?",
                answer: "Lomov suffers from palpitations, is excitable, easily upset, has trembling lips, twitching eyebrows, and serious sleep problems."
            },
            {
                id: "sq4",
                type: "short",
                text: "Why does Lomov want to marry Natalya?",
                answer: "Lomov wants to marry because he's already 35 (a critical age), needs to lead a quiet and regular life due to his health issues, and finds Natalya to be an excellent housekeeper, not bad-looking and well-educated."
            },
            {
                id: "sq5",
                type: "short",
                text: "What is Chubukov's reaction when he learns about Lomov's intention?",
                answer: "Chubukov is overjoyed, embraces and kisses Lomov, sheds tears of happiness, and quickly goes to call his daughter."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"...as if she won't consent! She's in love; egad, she's like a lovesick cat…\"<br>(i) Who says these words?<br>(ii) Who is he speaking about?<br>(iii) Is the speaker right about the person he is speaking about?",
                answer: "(i) Chubukov says these words.<br>(ii) He is speaking about his daughter, Natalya.<br>(iii) No, he's not right. Natalya shows no signs of being in love with Lomov during the play and instead gets into arguments with him."
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"If I give myself time to think, to hesitate, to talk a lot, to look for an ideal, or for real love, then I'll never get married.\"<br>(i) Who says these words?<br>(ii) What do these words tell you about the speaker?<br>(iii) What is his attitude toward marriage?",
                answer: "(i) Lomov says these words.<br>(ii) These words show that Lomov is practical rather than romantic about marriage, and is anxious about his prospects.<br>(iii) His attitude toward marriage is that it is a practical necessity rather than a matter of love or romance."
            }
        ]
    },
    {
        section: "Character Questions",
        questions: [
            {
                id: "cq1",
                type: "paragraph",
                text: "What words and expressions in the play do the characters use to speak about each other?",
                answer: "Chubukov calls Lomov: \"my dear fellow\", \"my darling\", \"my angel\", \"my treasure\", \"my precious\", \"my beauty\". Lomov addresses Chubukov as \"honoured Stepan Stepanovitch\". Natalya initially treats Lomov as a casual visitor. Later in the play (not shown in excerpt), they hurl insults at each other during arguments over property and dogs."
            },
            {
                id: "cq2",
                type: "paragraph",
                text: "Would you agree with the statement that Natalya is \"in love\" and \"like a lovesick cat\" as her father claims?",
                answer: "No, there's no evidence in the play that Natalya is in love with Lomov. She doesn't show any special interest in him and easily gets into arguments with him over property (Oxen Meadows) and dogs (Squeezer vs. Guess). Her father's claim is likely just his wishful thinking or an attempt to encourage the marriage for economic reasons."
            },
            {
                id: "cq3",
                type: "paragraph",
                text: "How would you describe Lomov's character based on his speech and actions?",
                answer: "Lomov appears nervous, anxious, and hypochondriac. He suffers from various health issues, is extremely formal (wearing evening dress for a proposal), lacks confidence (worrying about rejection), and is practical rather than romantic about marriage. He is easily excitable and values economic considerations over love."
            }
        ]
    },
    {
        section: "Essay Questions",
        questions: [
            {
                id: "eq1",
                type: "essay",
                text: "What does the play say about marriage and relationships in the society it portrays?",
                answer: "The play portrays marriage as primarily an economic arrangement between wealthy families rather than a love match. Both Lomov and Chubukov view the proposal as a practical matter. Lomov wants to marry because of his age and need for a stable life, while Chubukov is pleased by the prospect of his daughter marrying a wealthy neighbor. The play satirizes how economic interests drive relationships in this society, while petty arguments over property reveal the characters' true priorities."
            },
            {
                id: "eq2",
                type: "essay",
                text: "What makes this play a 'farce'?",
                answer: "This play is a farce because it uses absurd situations, exaggerated characters, and improbable events for humorous effect. The characters are caricatures who shift rapidly between extreme emotions. The plot involves ridiculous arguments over trivial matters like ownership of meadows and which dog is superior, nearly derailing a marriage proposal that's supposedly important. The dramatic irony (we know Lomov's purpose but Natalya doesn't) and the characters' overreactions create comedy through absurdity and misdirection."
            },
            {
                id: "eq3",
                type: "essay",
                text: "How does Chekhov use humor in the play to convey deeper social commentary?",
                answer: "Chekhov uses humor to critique the shallow nature of relationships in the landed gentry. The quick transitions from formal politeness to heated arguments reveal the characters' pretense and pettiness. The exaggerated health complaints of Lomov and the excessive terms of endearment used by Chubukov create comedy while showing their insincerity. The play mocks how economic interests drive human relationships, with property disputes taking precedence over genuine connection. Through humor, Chekhov exposes the absurdity of a society where marriage is primarily a business transaction."
            }
        ]
    }
];

// Load questions when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize questions
    loadQuestions();
});

// Load questions
function loadQuestions() {
    console.log('Loading questions...');
    
    // Get the questions container
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) {
        console.error('Questions container not found');
        return;
    }
    
    // Clear previous content
    questionsContainer.innerHTML = '';
    
    // Determine which question set to show
    let questions = storyQuestions;
    let title = 'The Proposal - Comprehension Questions';
    
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
            if (typeof window.score !== 'undefined') {
                window.score += 5;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            // Check if we should mark the module as completed
            checkModuleCompletion();
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
        if (typeof window.score !== 'undefined') {
            window.score += 10;
            document.getElementById('totalScore').textContent = window.score;
        }
        
        // Check if we should mark the module as completed
        checkModuleCompletion();
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

// Check if the module should be marked as complete
function checkModuleCompletion() {
    // Check if at least half of the questions have been answered
    const totalQuestions = document.querySelectorAll('.question-item').length;
    const completedQuestions = document.querySelectorAll('.question-item.completed').length;
    
    if (completedQuestions >= Math.ceil(totalQuestions / 2)) {
        // Mark the module as completed
        if (typeof window.modulesCompleted !== 'undefined' && !window.modulesCompleted.includes('thinking-text')) {
            window.modulesCompleted.push('thinking-text');
            if (typeof window.updateProgress === 'function') {
                window.updateProgress();
            }
            if (typeof window.showAchievement === 'function') {
                window.showAchievement('Reading Comprehension Completed!');
            }
        }
    }
}
