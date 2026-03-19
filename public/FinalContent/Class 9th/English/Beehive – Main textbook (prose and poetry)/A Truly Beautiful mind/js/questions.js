/**
 * Questions for A Truly Beautiful Mind interactive lesson
 */

// Story questions data
const storyQuestions = [
    {
        section: "Headings for Paragraphs",
        questions: [
            {
                id: "sq1",
                type: "short",
                text: "Match these headings with the correct paragraph numbers from the story: <br><br>Einstein's equation",
                answer: "Paragraph 9"
            },
            {
                id: "sq2",
                type: "short",
                text: "Einstein meets his future wife",
                answer: "Paragraph 7"
            },
            {
                id: "sq3",
                type: "short",
                text: "The making of a violinist",
                answer: "Paragraph 3"
            },
            {
                id: "sq4",
                type: "short",
                text: "Mileva and Einstein's mother",
                answer: "Paragraph 10"
            },
            {
                id: "sq5",
                type: "short",
                text: "A letter that launched the arms race",
                answer: "Paragraph 15"
            },
            {
                id: "sq6",
                type: "short",
                text: "A desk drawer full of ideas",
                answer: "Paragraph 8"
            },
            {
                id: "sq7",
                type: "short",
                text: "Marriage and divorce",
                answer: "Paragraph 11"
            }
        ]
    },
    {
        section: "Short Answer Questions",
        questions: [
            {
                id: "sq8",
                type: "short",
                text: "Who had these opinions about Einstein? <br>'He was boring.'",
                answer: "His playmates/other children"
            },
            {
                id: "sq9",
                type: "short",
                text: "Who said 'He was stupid and would never succeed in life'?",
                answer: "A headmaster"
            },
            {
                id: "sq10",
                type: "short",
                text: "Who thought 'He was a freak'?",
                answer: "His mother"
            },
            {
                id: "sq11",
                type: "short",
                text: "Explain why Einstein left the school in Munich for good.",
                answer: "Einstein felt stifled by the school's extreme regimentation and discipline. He often clashed with his teachers and at age 15 decided to leave the school permanently."
            },
            {
                id: "sq12",
                type: "short",
                text: "Why did Einstein want to study in Switzerland rather than in Munich?",
                answer: "Einstein wanted to continue his education in Switzerland because it was more liberal than Munich, and he preferred the atmosphere of German-speaking Switzerland."
            },
            {
                id: "sq13",
                type: "short",
                text: "Why did Einstein see Mileva as an ally?",
                answer: "Einstein saw Mileva as an ally against the 'philistines' - people in his family and at the university with whom he was constantly at odds."
            }
        ]
    },
    {
        section: "Reference Questions",
        questions: [
            {
                id: "rq1",
                type: "reference",
                text: "What did Einstein call his desk drawer at the patent office? Why?",
                answer: "Einstein jokingly called his desk drawer at the patent office the 'bureau of theoretical physics' because while he was supposed to be assessing other people's inventions, he was secretly developing his own ideas."
            },
            {
                id: "rq2",
                type: "reference",
                text: "Why did Einstein write a letter to Franklin Roosevelt?",
                answer: "Einstein wrote a letter to President Roosevelt to warn him about the possibility that the Nazis might build an atomic bomb. He warned that a single bomb could destroy an entire port and surrounding territory."
            },
            {
                id: "rq3",
                type: "reference",
                text: "How did Einstein react to the bombing of Hiroshima and Nagasaki?",
                answer: "Einstein was deeply shaken by the extent of the destruction. He wrote a public letter to the United Nations proposing the formation of a world government to prevent such devastation in the future."
            },
            {
                id: "rq4",
                type: "reference",
                text: "Why does the world remember Einstein as a 'world citizen'?",
                answer: "The world remembers Einstein as a 'world citizen' because in his later years he became increasingly involved in politics, campaigning for peace, democracy, and an end to arms buildup. When he died, he was celebrated as both a scientific genius and a visionary who worked for the betterment of humanity."
            }
        ]
    },
    {
        section: "Chronological Order",
        questions: [
            {
                id: "co1",
                type: "mcq",
                text: "Arrange these facts from Einstein's life in chronological order. Which came first?",
                options: [
                    "Einstein is born in the German city of Ulm.",
                    "Einstein attends a high school in Munich.",
                    "Einstein's family moves to Milan.",
                    "Einstein withdraws from school in Munich."
                ],
                correctOption: "0"
            },
            {
                id: "co2",
                type: "mcq",
                text: "Which happened next in Einstein's life?",
                options: [
                    "Einstein joins a university in Zurich, where he meets Mileva.",
                    "Einstein works in a patent office as a technical expert.",
                    "Einstein publishes his special theory of relativity.",
                    "Einstein provides a new interpretation of gravity."
                ],
                correctOption: "0"
            },
            {
                id: "co3",
                type: "mcq",
                text: "After university, what was Einstein's next major step?",
                options: [
                    "Einstein works in a patent office as a technical expert.",
                    "Einstein publishes his special theory of relativity.",
                    "Einstein is awarded the Nobel Prize in Physics.",
                    "Einstein provides a new interpretation of gravity."
                ],
                correctOption: "0"
            },
            {
                id: "co4",
                type: "mcq",
                text: "What was Einstein's breakthrough in 1905?",
                options: [
                    "Einstein publishes his special theory of relativity.",
                    "He provides a new interpretation of gravity.",
                    "He is awarded the Nobel Prize in Physics.",
                    "Einstein writes a letter to U.S. President, Franklin D. Roosevelt."
                ],
                correctOption: "0"
            },
            {
                id: "co5",
                type: "mcq",
                text: "Which event occurred in 1915?",
                options: [
                    "He provides a new interpretation of gravity (General Theory of Relativity).",
                    "He is awarded the Nobel Prize in Physics.",
                    "When Hitler comes to power, Einstein leaves Germany for the United States.",
                    "Einstein writes a letter to U.S. President, Franklin D. Roosevelt."
                ],
                correctOption: "0"
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
                text: "What kind of place is Innisfree? What three things does the poet want to do when he goes back there?",
                answer: "Innisfree is a peaceful, natural place. The poet wants to build a small cabin made of clay and wattles, plant nine rows of beans, and keep a beehive for honey."
            },
            {
                id: "pq2",
                type: "short",
                text: "What does the poet hear and see at Innisfree? What effect does it have on him?",
                answer: "The poet hears crickets singing and sees midnight that's full of stars ('all a glimmer'), noon with purple light, and evenings filled with birds (linnets). This brings him peace that 'comes dropping slow'."
            },
            {
                id: "pq3",
                type: "short",
                text: "What does the poet hear in his 'heart's core' even when he is far away from Innisfree?",
                answer: "Even when far away, the poet hears the sound of the lake water lapping with low sounds by the shore."
            },
            {
                id: "pq4",
                type: "short",
                text: "How does the poet contrast Innisfree with where he now stands?",
                answer: "The poet contrasts the natural beauty of Innisfree with his current urban surroundings of 'roadway' and 'pavements grey', suggesting the city's artificial, colorless environment versus nature's peace and beauty."
            },
            {
                id: "pq5",
                type: "short",
                text: "Do you think Innisfree is only a place, or a state of mind? Does the poet actually miss the place of his boyhood days?",
                answer: "Innisfree represents both a real place and a state of mind symbolizing peace and harmony with nature. The poet clearly misses this place from his boyhood as shown by his deep longing to return and the way the memories persist 'in the deep heart's core' even while he's in the city."
            }
        ]
    },
    {
        section: "Poetic Devices",
        questions: [
            {
                id: "pq6",
                type: "reference",
                text: "Look at these expressions from the poem:<br>'bee-loud glade'<br>'evenings full of the linnet's wings'<br>'lake water lapping with low sounds'<br><br>What pictures do these words create in your mind?",
                answer: "These expressions create vivid sensory images: 'bee-loud glade' evokes the humming sound of busy bees in a peaceful clearing; 'evenings full of the linnet's wings' creates a visual of birds in flight at dusk; 'lake water lapping with low sounds' gives the gentle, rhythmic sound of water touching the shore."
            },
            {
                id: "pq7",
                type: "reference",
                text: "What do these words mean to you?<br>'peace comes dropping slow<br>Dropping from the veils of the morning to where the cricket sings'",
                answer: "These lines suggest peace as something that gradually descends like morning dew or mist (veils of the morning), settling gently upon the natural world where crickets make their music. It creates an image of tranquility gradually enveloping the landscape from dawn, suggesting peace as a natural, unhurried process."
            }
        ]
    }
];

// Function to check story answers
function checkStoryAnswers() {
    let correctCount = 0;
    let totalQuestions = 0;
    
    // Get all question inputs
    const shortAnswers = document.querySelectorAll('#textQuestions textarea');
    const mcqs = document.querySelectorAll('#textQuestions select');
    
    // Check short answers
    shortAnswers.forEach(answer => {
        const userAnswer = answer.value.trim().toLowerCase();
        const correctAnswer = answer.getAttribute('data-answer').toLowerCase();
        
        if (userAnswer && (userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer))) {
            answer.style.border = '2px solid green';
            correctCount++;
        } else if (userAnswer) {
            answer.style.border = '2px solid red';
        }
        
        totalQuestions++;
    });
    
    // Check MCQs
    mcqs.forEach(mcq => {
        const userAnswer = mcq.value;
        const correctAnswer = mcq.getAttribute('data-answer');
        
        if (userAnswer === correctAnswer) {
            mcq.style.border = '2px solid green';
            correctCount++;
        } else if (userAnswer) {
            mcq.style.border = '2px solid red';
        }
        
        totalQuestions++;
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('questionsFeedback');
    if (feedbackEl) {
        const answeredQuestions = document.querySelectorAll('#textQuestions textarea:not(:placeholder-shown), #textQuestions select[value!=""]').length;
        
        if (answeredQuestions === 0) {
            feedbackEl.textContent = 'Please answer at least one question.';
            feedbackEl.className = 'feedback-message show error';
            return;
        }
        
        const percentage = Math.round((correctCount / answeredQuestions) * 100);
        
        if (percentage >= 80) {
            feedbackEl.textContent = `Excellent! You got ${correctCount} out of ${answeredQuestions} correct (${percentage}%).`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update score
            if (typeof score !== 'undefined') {
                score += correctCount * 5;
                document.getElementById('totalScore').textContent = score;
            }
            
            // Update progress
            if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('thinking-text')) {
                modulesCompleted.push('thinking-text');
                if (typeof updateProgress === 'function') {
                    updateProgress();
                }
                if (typeof showAchievement === 'function') {
                    showAchievement('Reading Comprehension Completed!');
                }
            }
            
        } else if (percentage >= 60) {
            feedbackEl.textContent = `Good job! You got ${correctCount} out of ${answeredQuestions} correct (${percentage}%).`;
            feedbackEl.className = 'feedback-message show success';
        } else {
            feedbackEl.textContent = `You got ${correctCount} out of ${answeredQuestions} correct (${percentage}%). Try reviewing the story again.`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
    
    if (window.narrator) {
        window.narrator.speak(`You answered ${correctCount} questions correctly out of ${totalQuestions} attempted questions.`);
    }
}

// Function to check poem answers
function checkPoemAnswers() {
    let correctCount = 0;
    let totalQuestions = 0;
    
    // Get all question inputs
    const shortAnswers = document.querySelectorAll('#textQuestions textarea');
    
    // Check short answers
    shortAnswers.forEach(answer => {
        const userAnswer = answer.value.trim().toLowerCase();
        const correctAnswer = answer.getAttribute('data-answer').toLowerCase();
        
        if (userAnswer && (userAnswer.includes(correctAnswer.substring(0, 15)) || correctAnswer.includes(userAnswer.substring(0, 15)))) {
            answer.style.border = '2px solid green';
            correctCount++;
        } else if (userAnswer) {
            answer.style.border = '2px solid red';
        }
        
        totalQuestions++;
    });
    
    // Display feedback
    const feedbackEl = document.getElementById('questionsFeedback');
    if (feedbackEl) {
        const answeredQuestions = document.querySelectorAll('#textQuestions textarea:not(:placeholder-shown)').length;
        
        if (answeredQuestions === 0) {
            feedbackEl.textContent = 'Please answer at least one question.';
            feedbackEl.className = 'feedback-message show error';
            return;
        }
        
        const percentage = Math.round((correctCount / answeredQuestions) * 100);
        
        if (percentage >= 80) {
            feedbackEl.textContent = `Excellent! You got ${correctCount} out of ${answeredQuestions} correct (${percentage}%).`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update score
            if (typeof score !== 'undefined') {
                score += correctCount * 5;
                document.getElementById('totalScore').textContent = score;
            }
            
        } else if (percentage >= 60) {
            feedbackEl.textContent = `Good job! You got ${correctCount} out of ${answeredQuestions} correct (${percentage}%).`;
            feedbackEl.className = 'feedback-message show success';
        } else {
            feedbackEl.textContent = `You got ${correctCount} out of ${answeredQuestions} correct (${percentage}%). Try reviewing the poem again.`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
    
    if (window.narrator) {
        window.narrator.speak(`You answered ${correctCount} questions correctly out of ${totalQuestions} attempted questions.`);
    }
}
