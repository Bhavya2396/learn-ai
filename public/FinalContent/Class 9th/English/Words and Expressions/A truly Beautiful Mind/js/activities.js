/**
 * Activities for Unit 4: Let's Begin interactive lesson
 */

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for activities
    setupActivityListeners();
});

// Set up event listeners for activities
function setupActivityListeners() {
    // Play listening activity button
    const listenBtn = document.querySelector('.listening-activity .interactive-btn');
    if (listenBtn) {
        listenBtn.addEventListener('click', playListeningActivity);
    }
    
    // Open writing pad button
    const writeBtn = document.querySelector('.writing-activity .interactive-btn');
    if (writeBtn) {
        writeBtn.addEventListener('click', openWritingPad);
    }
    
    // Note: Save listening notes functionality has been replaced with checkListeningAnswers
    
    // Save writing button
    const saveWritingBtn = document.querySelector('.writing-pad .interactive-btn');
    if (saveWritingBtn) {
        saveWritingBtn.addEventListener('click', saveWriting);
    }
    
    // Resource links
    const resourceLinks = document.querySelectorAll('.project-resources a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceId = this.getAttribute('onclick').match(/showResource\('(.+?)'\)/)[1];
            showResource(resourceId);
        });
    });
}

// Gautama Buddha and Angulimala story content for listening activity
const buddhaStoryContent = `
Gautama Buddha was journeying through the Kosala region. He was warned not to pass through the deep jungle, as it was the den of a famous robber chief, Angulimala. He was the terror of the whole countryside. He lived by plundering travellers and feared no one. He had committed many murders. All attempts to capture the inhuman Angulimala had failed. So he continued his crimes unpunished. The people of Kosala pleaded with the Buddha not to expose himself to the dangers of the robber's territory.

But Gautama Buddha knew no fear. The warnings of the people of Kosala did not affect him. He made his way into the jungle. Angulimala got enraged at this boldness. He was determined to kill the intruder. But when he saw the Buddha, calm and self-possessed, and heard his words of kindness, the robber hesitated. His arm, which had been uplifted to kill, fell helpless by his side. His wrath cooled, and he knelt down before the Buddha. He confessed all his sins and declared his faith in the Buddha.

When the people saw the new disciple following his Master, they were amazed and could not believe that this was the ferocious man who had been a terror for so long. Angulimala became a monk. His past was forgotten, and he was widely respected for his holiness.
`;

// Stephen Hawking information for project work
const hawkingInfo = {
    bio: `
        Stephen William Hawking (1942-2018) was an English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology at the University of Cambridge. His scientific works included a collaboration with Roger Penrose on gravitational singularity theorems in the framework of general relativity and the theoretical prediction that black holes emit radiation, often called Hawking radiation.
        
        Despite being diagnosed with an early-onset slow-progressing form of motor neurone disease (MND) that gradually paralysed him over the decades, Hawking continued to work, communicate, and inspire people around the world. After the loss of his speech, he was able to communicate through a speech-generating device—initially through use of a handheld switch, and eventually by using a single cheek muscle.
    `,
    books: `
        Stephen Hawking authored several groundbreaking books that made complex scientific concepts accessible to general readers:
        
        1. "A Brief History of Time" (1988): His most famous work that explains cosmology, black holes, and the Big Bang for non-specialist readers. It became a bestseller with over 10 million copies sold.
        
        2. "The Universe in a Nutshell" (2001): A follow-up that updates readers on developments in theoretical physics.
        
        3. "A Briefer History of Time" (2005): A more accessible version of his original bestseller.
        
        4. "The Grand Design" (2010, co-authored with Leonard Mlodinow): Explores the major questions about the universe and existence.
        
        5. "Brief Answers to the Big Questions" (2018): His final book, published posthumously, addressing ten fundamental questions about our existence.
    `,
    achievements: `
        Stephen Hawking's scientific achievements include:
        
        1. Hawking Radiation: His theoretical discovery that black holes emit radiation due to quantum effects.
        
        2. Penrose-Hawking Singularity Theorems: Proved with Roger Penrose that if general relativity is correct and certain reasonable conditions are satisfied, then space-time must have singularities.
        
        3. No-Boundary Proposal: With James Hartle, he proposed that the universe has no boundary in imaginary time, suggesting the universe spontaneously appeared from nothing.
        
        4. Black Hole Information Paradox: His work on the paradox of information loss in black holes sparked decades of theoretical work.
        
        5. Scientific Communication: Perhaps his greatest achievement was making complex physics accessible to millions of people worldwide despite his physical limitations.
        
        In addition to his scientific work, he was awarded the Presidential Medal of Freedom, was a Fellow of the Royal Society, and a member of the US National Academy of Sciences.
    `
};

// Play the listening activity audio
function playListeningActivity() {
    if (window.narrator) {
        // Make sure the user has interacted with the page
        if (typeof trackUserInteraction === 'function') {
            trackUserInteraction();
        }
        
        // First stop any ongoing narration
        if (window.narrator.stop) {
            window.narrator.stop();
        }
        
        // Break content into smaller paragraphs to avoid interruption
        const contentParagraphs = buddhaStoryContent.split('\n\n').filter(p => p.trim().length > 0);
        
        // Function to speak paragraphs sequentially
        function speakSequentially(paragraphs, index = 0) {
            if (index >= paragraphs.length) {
                // All paragraphs spoken, now give instructions
                setTimeout(() => {
                    window.narrator.speak("Now please answer the questions in the form below.");
                }, 1000);
                return;
            }
            
            // Set callback for when this paragraph ends
            window.narrator.onEndCallback = function() {
                // Small pause between paragraphs
                setTimeout(() => {
                    speakSequentially(paragraphs, index + 1);
                }, 300);
            };
            
            // Speak the current paragraph
            window.narrator.speak(paragraphs[index]);
        }
        
        // Start speaking the first paragraph
        speakSequentially(contentParagraphs);
    } else {
        alert('Speech synthesis is not available in your browser. Please read the text about Gautama Buddha and Angulimala instead.');
    }
}

// Show resource information
function showResource(resourceId) {
    let content = '';
    
    switch(resourceId) {
        case 'hawking-bio':
            content = hawkingInfo.bio;
            break;
        case 'hawking-books':
            content = hawkingInfo.books;
            break;
        case 'hawking-achievements':
            content = hawkingInfo.achievements;
            break;
        default:
            content = 'Resource information not available.';
    }
    
    alert(content);
    
    if (window.narrator) {
        window.narrator.speak(content);
    }
}

// Open writing pad function
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        
        // Scroll to the writing pad
        writingPad.scrollIntoView({ behavior: 'smooth' });
        
        // Provide instructions via narrator
        if (window.narrator) {
            window.narrator.speak("Please prepare your debate outline in the sections below. Start with an introduction containing a quotation, then highlight your main points, elaborate your arguments, and conclude with your opinion.");
        }
    } else {
        console.error('Writing pad element not found');
    }
}

// Save writing function
function saveWriting() {
    const writingInputs = [
        document.getElementById('writingPad1'),
        document.getElementById('writingPad2'),
        document.getElementById('writingPad3'),
        document.getElementById('writingPad4')
    ];
    
    let allValid = true;
    let totalLength = 0;
    
    writingInputs.forEach(input => {
        if (!input) {
            console.error('Writing input not found');
            allValid = false;
            return;
        }
        
        const text = input.value.trim();
        totalLength += text.length;
        
        if (text.length < 20) {
            input.style.borderColor = '#f44336';
            allValid = false;
        } else {
            input.style.borderColor = '#4caf50';
        }
    });
    
    if (!allValid || totalLength < 100) {
        alert('Please write more detailed content in each section (at least 20 characters each, and 100 characters total).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your debate outline has been saved!');
    
    // Update progress
    score += 15;
    document.getElementById('totalScore').textContent = score;
    
    if (!modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        updateProgress();
        showAchievement('Speaking Activity Completed!');
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your debate outline has been saved.");
    }
}

// Show answer for a specific question
function showAnswer(questionNumber) {
    const answerElement = document.getElementById(`answer${questionNumber}`);
    const buttonElement = document.querySelector(`button[onclick="showAnswer(${questionNumber})"]`);
    
    if (answerElement && buttonElement) {
        if (answerElement.style.display === 'none') {
            answerElement.style.display = 'block';
            buttonElement.textContent = '🙈 Hide Answer';
            buttonElement.style.backgroundColor = '#ff9800';
            
            // Scroll to the answer
            answerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            if (window.narrator) {
                window.narrator.speak(`Answer for question ${questionNumber}: ${answerElement.textContent.replace('Answer:', '').trim()}`);
            }
        } else {
            answerElement.style.display = 'none';
            buttonElement.textContent = '💡 Show Answer';
            buttonElement.style.backgroundColor = '';
        }
    }
}

// Check individual answer for a specific question
function checkIndividualAnswer(questionNumber) {
    const textarea = document.querySelector(`textarea[data-question="${questionNumber}"]`);
    const feedbackEl = document.getElementById(`feedback${questionNumber}`);
    const userAnswer = textarea.value.trim().toLowerCase();
    
    if (userAnswer.length === 0) {
        feedbackEl.innerHTML = '<span class="feedback-text warning">⚠️ Please write an answer before checking.</span>';
        feedbackEl.className = 'individual-feedback warning';
        textarea.style.borderColor = '#ffc107';
        return;
    }
    
    // Define key concepts for each question
    const questionKeywords = {
        1: ['warning', 'jungle', 'angulimala', 'robber', 'danger', 'territory', 'murder'],
        2: ['terror', 'plundering', 'murders', 'failed', 'capture', 'crimes', 'feared'],
        3: ['enraged', 'boldness', 'entering', 'jungle', 'warnings', 'determined', 'kill'],
        4: ['hesitated', 'calm', 'self-possessed', 'kindness', 'wrath', 'cooled'],
        5: ['transformation', 'kneeled', 'confessed', 'sins', 'faith', 'monk', 'holiness'],
        6: ['respecting', 'monk', 'holiness', 'past', 'forgotten', 'disciple']
    };
    
    const keywords = questionKeywords[questionNumber];
    const matches = keywords.filter(keyword => userAnswer.includes(keyword));
    const matchPercentage = (matches.length / keywords.length) * 100;
    
    // Provide feedback based on match percentage
    if (matchPercentage >= 70) {
        feedbackEl.innerHTML = '<span class="feedback-text success">✅ Excellent! Your answer shows good understanding of the key concepts.</span>';
        feedbackEl.className = 'individual-feedback success';
        textarea.style.borderColor = '#4caf50';
    } else if (matchPercentage >= 40) {
        feedbackEl.innerHTML = '<span class="feedback-text partial">👍 Good attempt! You mentioned some key points. Try to include more details from the story.</span>';
        feedbackEl.className = 'individual-feedback partial';
        textarea.style.borderColor = '#ff9800';
    } else {
        feedbackEl.innerHTML = '<span class="feedback-text incorrect">📝 Your answer needs more detail. Try reading the story again and include more specific information.</span>';
        feedbackEl.className = 'individual-feedback incorrect';
        textarea.style.borderColor = '#f44336';
    }
    
    // Add helpful hints based on the question
    const hints = {
        1: '💡 Hint: Think about why the people were concerned about the Buddha\'s safety.',
        2: '💡 Hint: Consider what made Angulimala feared by everyone.',
        3: '💡 Hint: What made Angulimala angry about the Buddha\'s actions?',
        4: '💡 Hint: Think about the Buddha\'s behavior and its effect on Angulimala.',
        5: '💡 Hint: Consider the dramatic change in Angulimala\'s character.',
        6: '💡 Hint: Think about why people\'s opinion of Angulimala changed.'
    };
    
    feedbackEl.innerHTML += `<br><small class="hint-text">${hints[questionNumber]}</small>`;
    
    // Scroll to feedback
    feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    if (window.narrator) {
        const feedbackText = feedbackEl.querySelector('.feedback-text').textContent;
        window.narrator.speak(`Question ${questionNumber} feedback: ${feedbackText}`);
    }
}

// Check listening activity answers (overall check)
function checkListeningAnswers() {
    const textareas = document.querySelectorAll('.listening-notes .question-textarea');
    const feedbackEl = document.getElementById('listeningFeedback');
    
    let answeredCount = 0;
    let totalQuestions = textareas.length;
    let correctCount = 0;
    
    textareas.forEach((textarea, index) => {
        const text = textarea.value.trim();
        
        if (text.length > 0) {
            answeredCount++;
            // Check if individual feedback shows success
            const questionNum = textarea.getAttribute('data-question');
            const individualFeedback = document.getElementById(`feedback${questionNum}`);
            if (individualFeedback && individualFeedback.classList.contains('success')) {
                correctCount++;
            }
        }
    });
    
    if (answeredCount === 0) {
        feedbackEl.textContent = 'Please answer at least one question before checking your answers.';
        feedbackEl.className = 'feedback-message show warning';
        return;
    }
    
    if (answeredCount === totalQuestions) {
        feedbackEl.innerHTML = `
            <strong>Excellent!</strong> You have answered all ${totalQuestions} questions. 
            <br><strong>Correct answers: ${correctCount}/${totalQuestions}</strong>
            <br><br>
            <strong>Sample Answers:</strong>
            <br>1. The people warned the Buddha because the jungle was Angulimala's territory.
            <br>2. Angulimala was a terror because he was a murderer and robber who couldn't be captured.
            <br>3. Angulimala was enraged by the Buddha's boldness in entering his territory.
            <br>4. The robber hesitated because of the Buddha's calmness and kind words.
            <br>5. Angulimala transformed from a robber to a holy monk who followed the Buddha.
            <br>6. People respected him because he became a monk and was known for his holiness.
        `;
        feedbackEl.className = 'feedback-message show success';
        
        // Update score based on correct answers
        score += (correctCount * 5);
        document.getElementById('totalScore').textContent = score;
        
        if (!modulesCompleted.includes('activities')) {
            modulesCompleted.push('activities');
            updateProgress();
            showAchievement('Listening Activity Completed!');
        }
    } else {
        feedbackEl.textContent = `You have answered ${answeredCount} out of ${totalQuestions} questions. Please answer all questions to see the complete feedback.`;
        feedbackEl.className = 'feedback-message show info';
    }
    
    if (window.narrator) {
        window.narrator.speak(`You have answered ${answeredCount} out of ${totalQuestions} questions with ${correctCount} correct answers. ${answeredCount === totalQuestions ? 'Great job completing all questions!' : 'Please complete the remaining questions.'}`);
    }
}
