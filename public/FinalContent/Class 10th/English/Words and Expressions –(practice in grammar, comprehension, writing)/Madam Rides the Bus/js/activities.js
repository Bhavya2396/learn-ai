/**
 * Activities for "Madam Rides the Bus" lesson
 */

// Speaking activity content
const speakingActivities = [
    {
        title: "Role Play",
        description: "Practice this dialogue with a partner and then create your own similar conversations.",
        dialogues: [
            {
                context: "In the story 'Madam Rides the Bus', there are many conversations between Valli, the conductor, and some elderly people in the bus.",
                characters: ["Valli", "Conductor", "Elderly Woman", "Voice"],
                dialogue: [
                    {
                        character: "Valli",
                        line: "Stop the bus! Stop the bus!",
                        emotion: "loudly"
                    },
                    {
                        character: "Conductor",
                        line: "Who is it? Hurry then!",
                        emotion: "without looking up"
                    },
                    {
                        character: "Valli",
                        line: "It's me, I am the one who has to get on the bus.",
                        emotion: "loudly"
                    },
                    {
                        character: "Conductor",
                        line: "Oh, really! So you're the one who's been jumping up and down there, are you?",
                        emotion: "smilingly"
                    },
                    {
                        character: "Valli",
                        line: "I have to get to town and back. Here's my fare.",
                        emotion: "commandingly"
                    },
                    {
                        character: "Conductor",
                        line: "Oh, please let me help you up.",
                        emotion: "jokingly"
                    },
                    {
                        character: "Valli",
                        line: "I can get on by myself. You don't have to help me.",
                        emotion: "smartly"
                    },
                    {
                        character: "Voice",
                        line: "Listen, child, you shouldn't stand like that. Sit down.",
                        emotion: "anxiously"
                    },
                    {
                        character: "Valli",
                        line: "There is nobody here who is a child. I've paid my thirty paise like everyone else.",
                        emotion: "haughtily"
                    },
                    {
                        character: "Conductor",
                        line: "Oh, sir, but she's a very grown-up madam. Do you hear her? Let her be!",
                        emotion: "smilingly"
                    },
                    {
                        character: "Valli",
                        line: "I am not a madam. Please remember that!",
                        emotion: "angrily"
                    },
                    {
                        character: "Conductor",
                        line: "Then what should we call you? Just 'missy'?",
                        emotion: "mimicking her"
                    },
                    {
                        character: "Valli",
                        line: "Because I'm simply not old enough to be called a 'madam'.",
                        emotion: "steadfastly"
                    },
                    {
                        character: "Elderly Woman",
                        line: "If you're so smart, young lady, tell me, what's your name?",
                        emotion: "with concern"
                    },
                    {
                        character: "Valli",
                        line: "I'm not telling you my name, and I'm not a child to be spoken to by such people.",
                        emotion: "irritably"
                    }
                ]
            }
        ]
    },
    {
        title: "Communicative Tasks",
        description: "Practice these communicative tasks with your partner.",
        tasks: [
            {
                title: "Offering, accepting and refusing help",
                dialogue: [
                    {
                        character: "Chaman",
                        line: "Hello Prem. You look tired. Is there anything I can do to help you?"
                    },
                    {
                        character: "Prem",
                        line: "Thank you very much. I think I can manage. I am preparing a chart on Children's Rights."
                    },
                    {
                        character: "Chaman",
                        line: "It's a lot of work. Let me help you."
                    },
                    {
                        character: "Prem",
                        line: "Thank you. But I've already collected all the necessary information."
                    },
                    {
                        character: "Chaman",
                        line: "I can help you in illustrating some of the rights."
                    },
                    {
                        character: "Prem",
                        line: "Oh, can you? That sounds wonderful."
                    },
                    {
                        character: "Chaman",
                        line: "Could you tell me the themes to be illustrated?"
                    },
                    {
                        character: "Prem",
                        line: "Here you are. I'm really thankful to you."
                    },
                    {
                        character: "Chaman",
                        line: "What about children's duties?"
                    },
                    {
                        character: "Prem",
                        line: "Oh, yes. It's a good suggestion. I'll list their duties also."
                    },
                    {
                        character: "Chaman",
                        line: "Thank you."
                    }
                ],
                clues: [
                    "Excuse me...",
                    "Yes?",
                    "I wonder if you could lend me our dictionary. I'm doing my class work.",
                    "I'm sorry. I'm using it right now. May be later.",
                    "That's okay. Thanks anyway."
                ],
                scenarios: [
                    "in the kitchen",
                    "at the railway station",
                    "asking somebody to open the door",
                    "in a hospital",
                    "in the playground"
                ]
            },
            {
                title: "Asking for information, indirect questions and question tags",
                dialogue: [
                    {
                        character: "Vineet",
                        line: "Could you get me some warm clothes from the cupboard, please?"
                    },
                    {
                        character: "Ashima",
                        line: "Are you feeling cold?"
                    },
                    {
                        character: "Vineet",
                        line: "It's cold today, isn't it?"
                    },
                    {
                        character: "Ashima",
                        line: "Yes, it is. I shall have to light the fire soon."
                    },
                    {
                        character: "Vineet",
                        line: "Oh, you have coal-fires, do you?"
                    },
                    {
                        character: "Ashima",
                        line: "Yes. We don't have a room heater. You have room heaters, don't you?"
                    },
                    {
                        character: "Vineet",
                        line: "Yes. We do. But coal-fires are nice. They are more comforting than a radiator, aren't they?"
                    },
                    {
                        character: "Ashima",
                        line: "Yes, but there is a lot more work than just switching on a heater. We keep talking about getting room heaters."
                    },
                    {
                        character: "Vineet",
                        line: "I suppose coal-fires aren't very convenient, are they?"
                    },
                    {
                        character: "Ashima",
                        line: "They certainly aren't."
                    }
                ],
                topics: [
                    "the floods in Chennai", 
                    "'Cyberabad' (Hyderabad)", 
                    "a celebration in your school", 
                    "a landslide during the Amarnath yatra"
                ]
            }
        ]
    }
];

// Writing activity content
const writingActivities = [
    {
        title: "Debate Preparation",
        description: "In the text, seeing Valli travelling alone in the bus, some of the characters showed concerns. The elderly woman asked, 'Are you alone, dear?' The conductor questioned, 'Won't your mother be looking for you?' The old woman continued asking, 'Is it proper for such a young person to travel alone? Do you exactly know where you're going in town? What's the street? What's the house number?'",
        prompt: "Do you think that the concerns of the elderly lady and the conductor are apt and genuine? Will you say that it is applicable to young boys as well? Discuss in groups, make notes and then arrange a debate competition.",
        points: [
            "Girls and boys of Valli's age can travel alone in a bus or auto rickshaw, etc.",
            "Freedom should be given to them to move around.",
            "Safety of the young children is of utmost concern.",
            "What type of education should be given to them?",
            "This is a vulnerable age and children are innocent."
        ]
    },
    {
        title: "Paragraph Writing",
        description: "On her return journey, Valli saw the young cow lying dead by the roadside. This young cow was running very fast in front of the bus and had given Valli unbound happiness when she was travelling to the town.",
        prompt: "Write a paragraph on 'Should the domestic animals be let loose to walk on the roads freely' where the vehicles are plying? Who is responsible for the death of the young cow?"
    }
];

// Project activity content
const projectActivities = [
    {
        title: "Travel Tips",
        description: "Read the quick tips for travelling by a bike given below. When you travel by a bike, Vishav says that the frame and tyres of the bike should be according to the rider's height. One should carry a hand pump, extra tubes, and a puncture kit for emergency situations. Right accessories such as sweat-resistant gloves, helmets, knee and elbow pads, and a pair of shoes is of utmost importance. It is also necessary to carry essentials like dry food, water, and Oral Rehydration Salts (ORS). A first-aid kit with pain killers, muscle relaxing balms, and band-aids are also advisable.",
        task: "Prepare a list of things that you would like to suggest to people who want to travel by:",
        options: [
            "a train",
            "a bus",
            "a boat",
            "a motorbike",
            "on foot (for example a trek)"
        ]
    },
    {
        title: "Ticket Collage",
        description: "Copies of some tickets are given here. Collect some more train tickets, bus tickets, flight tickets, platform tickets, entry tickets for the zoo, cinema hall, metro rail etc.",
        tasks: [
            "Make a collage.",
            "Study the information given in these tickets.",
            "Draw a table to enter the information like PNR number, time of departure, time of arrival, confirmed ticket, wait-listed ticket, RAC status in train, seat number, food preferences, price of the ticket, number of passengers, etc.",
            "How are these tickets different from each other?"
        ],
        writingPrompt: "Write a paragraph on 'Why it is essential to travel with a ticket?'"
    }
];

// Listening activity content
const listeningActivity = {
    title: "Mizoram",
    passage: `Once a tourist remarked, "I visited the Eastern States this time — where the people talk in songs and they always dance."

The eastern region of India is no doubt charmingly novel in many of its features. Mizoram, literally the land of Mizos is an expanse of blue-green hills. Mizoram is broken up lenghwise into five major mountain ranges gradually descending from the south to the north. The hills are rugged and their heights uneven. The name of the state Mizoram is made of two words. 'Mi' means human beings, 'Zo' means a hill. So, a 'Mizo' is a human dweller of a hill; Mizoram means the land of the hill-dwellers. Aizawl is the capital town of the State built in tiers along the hill.

The Mizos have three main festivals — Mim Kut, Chapchar Kut and Pawl Kut. These festivals are associated with their agricultural activities during which they enjoy life by singing and dancing. The Mizos, blessed as they are with a beautiful environment and rich culture, are a vibrant and social people. They love to dance as much as they love to sing. They boast a number of folk and community dances handed down from one generation to the other through the ages. The dances are expressions of the gay, carefree spirit of the Mizos. It should be noted here that these dances are not intended for stage performance, rather they have been evolved for community involvement and participation.`,
    questions: [
        {
            question: "The land of Mizo is a large open area of _________________. The hills are ________________ and ________________.",
            answer: "blue-green hills, rugged, uneven heights"
        },
        {
            question: "The state referred here is made of two names — 'Mi' means ___________________, 'Zo' means ___________________, and Mizoram means ___________________.",
            answer: "human beings, hill, land of hill-dwellers"
        },
        {
            question: "Which activities are associated with Mizo festivals? How do Mizos enjoy these festivals?",
            answer: "Agricultural activities are associated with Mizo festivals. They enjoy these festivals by singing and dancing."
        },
        {
            question: "What are the special features of a Mizo dance?",
            answer: "Mizo dances are expressions of their gay, carefree spirit. They are not intended for stage performance but have evolved for community involvement and participation."
        },
        {
            type: "mcq",
            question: "The following statements characterise Mizo people. Tick the one which is not true.",
            options: [
                "Mizos have a beautiful culture.",
                "They live in a beautiful natural environment.",
                "They are a protective people.",
                "They are a vibrant people.",
                "They love to dance and not so much to sing.",
                "They have a number of community and folk dances.",
                "The community involvement and participation is always there."
            ],
            answer: 4 // "They love to dance and not so much to sing." - this is not true
        }
    ]
};

// Fun Facts content
const funFacts = {
    title: "Did You Know?",
    facts: [
        "In the 'Tongue twister' section: 'We surely shall see the sun shine soon'",
        "The idiom 'Turn a blind eye' means to ignore situations, facts, reality."
    ]
};

// Function to initialize activities
function initializeActivities() {
    // Add all the activity content to the page
    const activitiesContainer = document.getElementById('activities');
    if (!activitiesContainer) return;
    
    // Speaking activities
    const speakingSection = activitiesContainer.querySelector('.speaking-activity');
    if (speakingSection) {
        // Initialize speaking activities content
        const speakingContent = speakingSection.querySelector('.content-block');
        if (speakingContent) {
            let html = `<p>${speakingActivities[0].description}</p>`;
            html += `<div class="role-play-container">`;
            
            // Add dialogues
            speakingActivities[0].dialogues.forEach(dialogue => {
                html += `<div class="dialogue-context">${dialogue.context}</div>`;
                html += `<div class="dialogue-scene">`;
                
                dialogue.dialogue.forEach(line => {
                    html += `<div class="dialogue-line">
                                <span class="character">${line.character} (${line.emotion}):</span>
                                <span class="line">${line.line}</span>
                            </div>`;
                });
                
                html += `</div>`;
            });
            
            html += `</div>`;
            
            // Add communicative tasks
            html += `<h3>Communicative Task I<br>(${speakingActivities[1].tasks[0].title})</h3>`;
            html += `<div class="role-play">`;
            
            speakingActivities[1].tasks[0].dialogue.forEach(line => {
                html += `<div class="dialogue-line">
                            <span class="character">${line.character}:</span>
                            <span class="line">${line.line}</span>
                        </div>`;
            });
            
            html += `</div>`;
            html += `<p>Pair or Group Work</p>`;
            html += `<p>Write conversations like the one above imagining you are in the classroom. Use the clues given below.</p>`;
            html += `<ul>`;
            
            speakingActivities[1].tasks[0].clues.forEach(clue => {
                html += `<li>${clue}</li>`;
            });
            
            html += `</ul>`;
            html += `<p>Write similar conversations imagining you are in the following situations: ${speakingActivities[1].tasks[0].scenarios.join('; ')}.</p>`;
            
            // Add second communicative task
            html += `<h3>Communicative Task II<br>(${speakingActivities[1].tasks[1].title})</h3>`;
            html += `<div class="role-play">`;
            
            speakingActivities[1].tasks[1].dialogue.forEach(line => {
                html += `<div class="dialogue-line">
                            <span class="character">${line.character}:</span>
                            <span class="line">${line.line}</span>
                        </div>`;
            });
            
            html += `</div>`;
            html += `<p>Pair or Group work</p>`;
            html += `<p>Using the above piece as a model, ask for information, make requests and give your opinion regarding — ${speakingActivities[1].tasks[1].topics.join(', ')}, etc.</p>`;
            
            speakingContent.innerHTML = html;
        }
    }
    
    // Writing activities
    const writingSection = activitiesContainer.querySelector('.writing-activity');
    if (writingSection) {
        // Initialize writing activities content
        const writingContent = writingSection.querySelector('.content-block');
        if (writingContent) {
            let html = `<p>${writingActivities[0].description}</p>`;
            html += `<p>${writingActivities[0].prompt}</p>`;
            html += `<ul>`;
            
            writingActivities[0].points.forEach(point => {
                html += `<li>${point}</li>`;
            });
            
            html += `</ul>`;
            html += `<p>${writingActivities[1].description}</p>`;
            html += `<p>${writingActivities[1].prompt}</p>`;
            
            writingContent.innerHTML = html;
        }
    }
    
    // Project activities
    const projectSection = activitiesContainer.querySelector('.project-activity');
    if (projectSection) {
        // Initialize project activities content
        const projectContent = projectSection.querySelector('.content-block');
        if (projectContent) {
            let html = `<p>${projectActivities[0].description}</p>`;
            html += `<p>${projectActivities[0].task}</p>`;
            html += `<ul>`;
            
            projectActivities[0].options.forEach(option => {
                html += `<li>${option}</li>`;
            });
            
            html += `</ul>`;
            html += `<p>${projectActivities[1].description}</p>`;
            html += `<ul>`;
            
            projectActivities[1].tasks.forEach(task => {
                html += `<li>${task}</li>`;
            });
            
            html += `</ul>`;
            html += `<p>${projectActivities[1].writingPrompt}</p>`;
            
            projectContent.innerHTML = html;
        }
    }
    
    // Listening activity
    const listeningSection = activitiesContainer.querySelector('.listening-activity');
    if (listeningSection) {
        // Initialize listening activity content
        const listeningContent = listeningSection.querySelector('.content-block');
        if (listeningContent) {
            let html = `<h3>${listeningActivity.title}</h3>
            <p>Following is a passage on Mizoram and its people. When one visits this place, one is enchanted by its natural beauty and the vibrant culture of the state. Listen to the passage carefully and answer the questions that follow. You can listen to the recorded story or ask your teacher, sibling or friend to read the story aloud.</p>`;
            
            // Add Mizoram passage paragraphs
            listeningActivity.passage.split('\n\n').forEach((paragraph, index) => {
                if (paragraph.trim().length > 0) {
                    html += `<p class="mizoram-paragraph" data-index="${index}">${paragraph}</p>`;
                }
            });
            
            // Add questions
            html += `<div class="comprehension-check">
                <h3>Questions on Mizoram Passage:</h3>`;
                
            listeningActivity.questions.forEach((question, idx) => {
                if (question.type === 'mcq') {
                    html += `<div class="comprehension-question">
                        <p class="question-text">${idx + 1}. ${question.question}</p>
                        <div class="question-options">`;
                        
                    question.options.forEach((option, optIdx) => {
                        html += `<div class="option">
                            <input type="radio" name="mizoram-q${idx}" id="mizoram-q${idx}-opt${optIdx}" value="${optIdx}">
                            <label for="mizoram-q${idx}-opt${optIdx}">${option}</label>
                        </div>`;
                    });
                    
                    html += `</div>
                        <div class="question-feedback" id="mizoram-feedback-${idx}"></div>
                    </div>`;
                } else {
                    html += `<div class="comprehension-question">
                        <p class="question-text">${idx + 1}. ${question.question}</p>
                        <textarea class="question-textarea" id="mizoram-answer-${idx}" placeholder="Write your answer here..."></textarea>
                        <div class="question-feedback" id="mizoram-feedback-${idx}"></div>
                    </div>`;
                }
            });
            
            html += `</div>
            <button class="interactive-btn" onclick="checkMizoramAnswers()">Check Answers</button>`;
            
            listeningContent.innerHTML = html;
        }
    }
}

// Document ready event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize activities when the DOM is loaded
    if (document.getElementById('activities')) {
        initializeActivities();
    }
});
