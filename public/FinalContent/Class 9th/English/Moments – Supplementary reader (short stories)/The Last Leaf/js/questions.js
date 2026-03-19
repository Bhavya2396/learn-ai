/**
 * Questions for The Last Leaf interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "What is Johnsy's illness?",
                answer: "Johnsy has pneumonia."
            },
            {
                id: "sq2",
                type: "short",
                text: "Why does Johnsy think she will die?",
                answer: "Johnsy believes she will die when the last leaf on the ivy creeper falls."
            },
            {
                id: "sq3",
                type: "short",
                text: "Where do Sue and Johnsy live?",
                answer: "Sue and Johnsy share a small flat on the third storey of an old house."
            },
            {
                id: "sq4",
                type: "short",
                text: "What did the doctor tell Sue about Johnsy's condition?",
                answer: "The doctor told Sue that Johnsy had made up her mind not to get well, and if she doesn't want to live, medicines will not help her."
            },
            {
                id: "sq5",
                type: "short",
                text: "What was Behrman's lifelong dream?",
                answer: "Behrman's lifelong dream was to paint a masterpiece."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "\"When the last leaf falls, I will die.\"<br>(i) Who says these words?<br>(ii) What does 'the last leaf' refer to?<br>(iii) Did the last leaf fall?",
                answer: "(i) Johnsy<br>(ii) The last leaf on the ivy creeper outside her window<br>(iii) No, the last leaf did not fall because it was painted by Behrman"
            },
            {
                id: "rq2",
                type: "reference",
                text: "\"I have been a bad girl.\"<br>(i) Who speaks these words?<br>(ii) Why does she call herself a bad girl?<br>(iii) What realization does she have?",
                answer: "(i) Johnsy<br>(ii) Because she had been depressed and gloomy and had not cooperated with Sue who was looking after her lovingly<br>(iii) She realizes that it is a sin to want to die"
            },
            {
                id: "rq3",
                type: "reference",
                text: "\"That's Behrman's masterpiece.\"<br>(i) Who says this?<br>(ii) What is Behrman's masterpiece?<br>(iii) Why is it considered a masterpiece?",
                answer: "(i) Sue<br>(ii) The painted ivy leaf that didn't fall<br>(iii) It is considered a masterpiece because it looked so real that Johnsy thought it was an actual leaf, and it gave her the will to live while costing Behrman his life"
            },
            {
                id: "rq4",
                type: "reference",
                text: "\"Is she stupid? How can she be so foolish?\"<br>(i) Who is being referred to here?<br>(ii) What makes the speaker say these words?<br>(iii) Was the person really being foolish? Why?",
                answer: "(i) Johnsy<br>(ii) Behrman thinks it is foolish for Johnsy to believe she will die when the last leaf falls<br>(iii) Yes, because she was giving up her will to live based on a superstition about falling leaves"
            }
        ]
    },
    {
        section: "Think and Reflect",
        questions: [
            {
                id: "tr1",
                type: "essay",
                text: "Do you think the feeling of depression Johnsy has is common among teenagers? Share your thoughts.",
                answer: "Depression is indeed common among teenagers due to academic pressure, social media influence, peer pressure, identity formation, and biological changes. It's important to recognize these feelings and seek support from friends, family, and professionals."
            },
            {
                id: "tr2",
                type: "essay",
                text: "What qualities of Behrman are revealed through his last act?",
                answer: "Behrman's last act reveals his selflessness, courage, creativity, determination, and deep compassion. Despite his age and the harsh weather, he risked his own life to paint the leaf and save Johnsy, showing that he valued others above himself."
            },
            {
                id: "tr3",
                type: "essay",
                text: "How does the last leaf become a symbol of hope in the story?",
                answer: "The last leaf becomes a symbol of hope as it defies nature by not falling despite the storm, inspiring Johnsy to also fight against her illness. It represents resilience and the will to survive against all odds, ultimately giving Johnsy a reason to live."
            },
            {
                id: "tr4",
                type: "essay",
                text: "What is the message of the story 'The Last Leaf'?",
                answer: "The story conveys that hope and willpower are essential for survival, the power of art to transform lives, and the beauty of sacrifice for others. It shows how our mental attitude influences physical health and how small acts of kindness can have profound effects."
            }
        ]
    }
];

// Load questions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize questions
    initializeQuestions();
});

// Initialize questions display
function initializeQuestions() {
    const textQuestionsDiv = document.getElementById('textQuestions');
    if (!textQuestionsDiv) return;
    
    // Display the story questions by default
    displayQuestions('story-questions');
}

// Display questions based on type
function showQuestionSet(questionSetType) {
    // Highlight the active button
    const buttons = document.querySelectorAll('.story-nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    const activeButton = document.querySelector(`.story-nav-btn[onclick*="${questionSetType}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }
    
    // Display the appropriate questions
    displayQuestions(questionSetType);
}

// Display questions in the container
function displayQuestions(questionSetType) {
    const textQuestionsDiv = document.getElementById('textQuestions');
    if (!textQuestionsDiv) return;
    
    // Clear existing content
    textQuestionsDiv.innerHTML = '';
    
    // Load story questions
    if (questionSetType === 'story-questions') {
        storyQuestions.forEach(section => {
            // Create section header
            const sectionHeader = document.createElement('h3');
            sectionHeader.className = 'section-header';
            sectionHeader.textContent = section.section;
            textQuestionsDiv.appendChild(sectionHeader);
            
            // Create questions container
            const questionsContainer = document.createElement('div');
            questionsContainer.className = 'questions-container';
            
            // Add individual questions
            section.questions.forEach(question => {
                // Create question card
                const questionCard = document.createElement('div');
                questionCard.className = 'question-card';
                
                // Question text
                const questionText = document.createElement('div');
                questionText.className = 'question-text';
                questionText.innerHTML = question.text;
                questionCard.appendChild(questionText);
                
                // Add appropriate input based on question type
                if (question.type === 'short') {
                    // Short answer input
                    const answerInput = document.createElement('textarea');
                    answerInput.className = 'answer-input';
                    answerInput.placeholder = 'Type your answer here...';
                    answerInput.id = `answer-${question.id}`;
                    answerInput.rows = 2;
                    questionCard.appendChild(answerInput);
                    
                } else if (question.type === 'reference' || question.type === 'essay') {
                    // Essay answer input
                    const answerInput = document.createElement('textarea');
                    answerInput.className = 'answer-input';
                    answerInput.placeholder = 'Type your answer here...';
                    answerInput.id = `answer-${question.id}`;
                    answerInput.rows = 4;
                    questionCard.appendChild(answerInput);
                }
                
                // Check answer button
                const checkButton = document.createElement('button');
                checkButton.className = 'interactive-btn check-answer-btn';
                checkButton.textContent = '✓ Check Answer';
                checkButton.onclick = function() { checkAnswer(question.id, question.answer); };
                questionCard.appendChild(checkButton);
                
                // Feedback container
                const feedbackContainer = document.createElement('div');
                feedbackContainer.className = 'feedback-container';
                feedbackContainer.id = `feedback-${question.id}`;
                questionCard.appendChild(feedbackContainer);
                
                // Add question card to container
                questionsContainer.appendChild(questionCard);
            });
            
            // Add questions container to the main container
            textQuestionsDiv.appendChild(questionsContainer);
        });
    }
}

// Check answer function
function checkAnswer(questionId, correctAnswer) {
    const userAnswer = document.getElementById(`answer-${questionId}`).value.trim().toLowerCase();
    const feedbackContainer = document.getElementById(`feedback-${questionId}`);
    
    if (!userAnswer) {
        feedbackContainer.innerHTML = '<div class="feedback-message error show">Please enter an answer before checking.</div>';
        return;
    }
    
    // For short answers, do simple comparison
    // For essays, just provide the model answer for comparison
    if (questionId.startsWith('sq')) {
        // Simple substring check for short questions
        const normalizedCorrect = correctAnswer.toLowerCase();
        
        if (userAnswer.includes(normalizedCorrect) || normalizedCorrect.includes(userAnswer)) {
            // Close enough
            feedbackContainer.innerHTML = `
                <div class="feedback-message success show">
                    <p>✓ Good work! Your answer seems to be on the right track.</p>
                    <p>Model answer: ${correctAnswer}</p>
                </div>
            `;
            
            // Update score
            if (typeof score !== 'undefined') {
                score += 5;
                document.getElementById('totalScore').textContent = score;
            }
        } else {
            // Not close enough
            feedbackContainer.innerHTML = `
                <div class="feedback-message error show">
                    <p>Your answer seems to be missing some key points.</p>
                    <p>Model answer: ${correctAnswer}</p>
                </div>
            `;
        }
    } else {
        // For reference or essay questions, just show the model answer
        feedbackContainer.innerHTML = `
            <div class="feedback-message info show">
                <p>Thank you for your answer. Compare with the model answer below:</p>
                <div class="model-answer">${correctAnswer}</div>
            </div>
        `;
        
        // Update score
        if (typeof score !== 'undefined') {
            score += 5;
            document.getElementById('totalScore').textContent = score;
        }
    }
    
    // Read feedback aloud
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(feedbackContainer.textContent);
    }
}
