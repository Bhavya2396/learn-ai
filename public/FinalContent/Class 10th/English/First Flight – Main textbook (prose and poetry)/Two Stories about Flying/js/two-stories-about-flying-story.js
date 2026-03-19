/**
 * Story and poem content and functionality for Two Stories about Flying
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data - Part 1: His First Flight
const storyContent = `
    <h3>I. His First Flight</h3>
    
    <p>THE young seagull was alone on his <span class="highlight-vocab">ledge<span class="vocab-tooltip">a narrow horizontal shelf projecting from a wall or cliff</span></span>. His two brothers and his sister had already flown away the day before. He had been afraid to fly with them.</p>
    
    <div class="vocabulary-note">
        <div class="word">ledge</div>
        <div class="definition">a narrow horizontal shelf projecting from a wall or (here) a cliff</div>
    </div>
    
    <p>Somehow when he had taken a little run forward to the brink of the ledge and attempted to flap his wings he became afraid. The great expanse of sea stretched down beneath, and it was such a long way down — miles down. He felt certain that his wings would never support him; so he bent his head and ran away back to the little hole under the ledge where he slept at night.</p>
    
    <p>Even when each of his brothers and his little sister, whose wings were far shorter than his own, ran to the brink, flapped their wings, and flew away, he failed to muster up courage to take that plunge which appeared to him so desperate. His father and mother had come around calling to him shrilly, <span class="highlight-vocab">upbraiding<span class="vocab-tooltip">scolding</span></span> him, threatening to let him starve on his ledge unless he flew away. But for the life of him he could not move.</p>
    
    <div class="vocabulary-note">
        <div class="word">upbraiding</div>
        <div class="definition">scolding</div>
    </div>
    
    <p>That was twenty-four hours ago. Since then nobody had come near him. The day before, all day long, he had watched his parents flying about with his brothers and sister, perfecting them in the art of flight, teaching them how to <span class="highlight-vocab">skim<span class="vocab-tooltip">to move lightly just above a surface</span></span> the waves and how to dive for fish. He had, in fact, seen his older brother catch his first <span class="highlight-vocab">herring<span class="vocab-tooltip">a soft-finned sea fish</span></span> and devour it, standing on a rock, while his parents circled around raising a proud cackle.</p>
    
    <div class="vocabulary-note">
        <div class="word">skim</div>
        <div class="definition">to move lightly just above a surface (here, the sea)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">herring</div>
        <div class="definition">a soft-finned sea fish</div>
    </div>
    
    <p>And all the morning the whole family had walked about on the big plateau midway down the opposite cliff taunting him with his cowardice.</p>
    
    <p>The sun was now ascending the sky, blazing on his ledge that faced the south. He felt the heat because he had not eaten since the previous nightfall.</p>
    
    <p>He stepped slowly out to the brink of the ledge, and standing on one leg with the other leg hidden under his wing, he closed one eye, then the other, and pretended to be falling asleep. Still they took no notice of him. He saw his two brothers and his sister lying on the plateau dozing with their heads sunk into their necks. His father was <span class="highlight-vocab">preening<span class="vocab-tooltip">making an effort to maintain feathers</span></span> the feathers on his white back. Only his mother was looking at him.</p>
    
    <div class="vocabulary-note">
        <div class="word">preening</div>
        <div class="definition">making an effort to maintain feathers</div>
    </div>
    
    <p>She was standing on a little high hump on the plateau, her white breast thrust forward. Now and again, she tore at a piece of fish that lay at her feet and then scrapped each side of her beak on the rock. The sight of the food maddened him. How he loved to tear food that way, scrapping his beak now and again to <span class="highlight-vocab">whet<span class="vocab-tooltip">to sharpen</span></span> it.</p>
    
    <div class="vocabulary-note">
        <div class="word">whet</div>
        <div class="definition">to sharpen</div>
    </div>
    
    <p>"Ga, ga, ga," he cried begging her to bring him some food. "Gaw-col-ah," she screamed back <span class="highlight-vocab">derisively<span class="vocab-tooltip">in a manner showing someone that she/he is stupid</span></span>. But he kept calling plaintively, and after a minute or so he uttered a joyful scream. His mother had picked up a piece of the fish and was flying across to him with it.</p>
    
    <div class="vocabulary-note">
        <div class="word">derisively</div>
        <div class="definition">in a manner showing someone that she/he is stupid</div>
    </div>
    
    <p>He leaned out eagerly, tapping the rock with his feet, trying to get nearer to her as she flew across. But when she was just opposite to him, she halted, her wings motionless, the piece of fish in her beak almost within reach of his beak. He waited a moment in surprise, wondering why she did not come nearer, and then, maddened by hunger, he dived at the fish.</p>
    
    <p>With a loud scream he fell outwards and downwards into space. Then a monstrous terror seized him and his heart stood still. He could hear nothing. But it only lasted a minute. The next moment he felt his wings spread outwards. The wind rushed against his breast feathers, then under his stomach, and against his wings. He could feel the tips of his wings cutting through the air.</p>
    
    <p>He was not falling headlong now. He was soaring gradually downwards and outwards. He was no longer afraid. He just felt a bit <span class="highlight-vocab">dizzy<span class="vocab-tooltip">an uncomfortable feeling of spinning around and losing one's balance</span></span>. Then he flapped his wings once and he soared upwards. "Ga, ga, ga, Ga, ga, ga, Gaw-col-ah," his mother swooped past him, her wings making a loud noise. He answered her with another scream.</p>
    
    <div class="vocabulary-note">
        <div class="word">dizzy</div>
        <div class="definition">an uncomfortable feeling of spinning around and losing one's balance</div>
    </div>
    
    <p>Then his father flew over him screaming. He saw his two brothers and his sister flying around him <span class="highlight-vocab">curveting<span class="vocab-tooltip">leaping like a horse</span></span> and <span class="highlight-vocab">banking<span class="vocab-tooltip">flying with one wing higher than the other</span></span> and soaring and diving. Then he completely forgot that he had not always been able to fly, and commended himself to dive and soar and curve, shrieking shrilly.</p>
    
    <div class="vocabulary-note">
        <div class="word">curveting</div>
        <div class="definition">leaping like a horse</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">banking</div>
        <div class="definition">flying with one wing higher than the other</div>
    </div>
    
    <p>He was near the sea now, flying straight over it, facing straight out over the ocean. He saw a vast green sea beneath him, with little ridges moving over it and he turned his beak sideways and cawed amusedly.</p>
    
    <p>His parents and his brothers and sister had landed on this green flooring ahead of him. They were beckoning to him, calling shrilly. He dropped his legs to stand on the green sea. His legs sank into it. He screamed with fright and attempted to rise again flapping his wings. But he was tired and weak with hunger and he could not rise, exhausted by the strange exercise. His feet sank into the green sea, and then his belly touched it and he sank no farther. He was floating on it, and around him his family was screaming, praising him and their beaks were offering him scraps of dog-fish.</p>
    
    <p>He had made his first flight.</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check - His First Flight</h3>
        <div class="comprehension-question">1. Why was the young seagull afraid to fly?</div>
        <div class="comprehension-question">2. What did the seagull's mother do to encourage him to fly?</div>
        <div class="comprehension-question">3. How did the seagull feel when he started flying for the first time?</div>
        <div class="comprehension-question">4. What happened when the seagull tried to stand on the water?</div>
    </div>
`;

// Story content data - Part 2: The Black Aeroplane
const storyPart2 = `
    <h3>II. The Black Aeroplane</h3>
    
    <p>THE moon was coming up in the east, behind me, and stars were shining in the clear sky above me. There wasn't a cloud in the sky. I was happy to be alone high up above the sleeping countryside. I was flying my old Dakota aeroplane over France back to England. I was dreaming of my holiday and looking forward to being with my family. I looked at my watch: one thirty in the morning.</p>
    
    <p>'I should call Paris Control soon,' I thought. As I looked down past the nose of the aeroplane, I saw the lights of a big city in front of me. I switched on the radio and said, "Paris Control, Dakota DS 088 here. Can you hear me? I'm on my way to England. Over."</p>
    
    <p>The voice from the radio answered me immediately: "DS 088, I can hear you. You ought to turn twelve degrees west now, DS 088. Over."</p>
    
    <p>I checked the map and the compass, switched over to my second and last fuel tank, and turned the Dakota twelve degrees west towards England.</p>
    
    <p>'I'll be in time for breakfast,' I thought. A good big English breakfast! Everything was going well — it was an easy flight.</p>
    
    <p>Paris was about 150 kilometres behind me when I saw the clouds. Storm clouds. They were huge. They looked like black mountains standing in front of me across the sky. I knew I could not fly up and over them, and I did not have enough fuel to fly around them to the north or south.</p>
    
    <p>"I ought to go back to Paris," I thought, but I wanted to get home. I wanted that breakfast.</p>
    
    <p>'I'll take the risk,' I thought, and flew that old Dakota straight into the storm.</p>
    
    <p>Inside the clouds, everything was suddenly black. It was impossible to see anything outside the aeroplane. The old aeroplane jumped and twisted in the air. I looked at the compass. I couldn't believe my eyes: the compass was turning round and round and round. It was dead. It would not work! The other instruments were suddenly dead, too. I tried the radio.</p>
    
    <p>"Paris Control? Paris Control? Can you hear me?" There was no answer. The radio was dead too. I had no radio, no compass, and I could not see where I was. I was lost in the storm. Then, in the black clouds quite near me, I saw another aeroplane. It had no lights on its wings, but I could see it flying next to me through the storm. I could see the pilot's face — turned towards me. I was very glad to see another person. He lifted one hand and waved.</p>
    
    <p>"Follow me," he was saying. "Follow me."</p>
    
    <p>'He knows that I am lost,' I thought. 'He's trying to help me.'</p>
    
    <p>He turned his aeroplane slowly to the north, in front of my Dakota, so that it would be easier for me to follow him. I was very happy to go behind the strange aeroplane like an obedient child.</p>
    
    <p>After half an hour the strange black aeroplane was still there in front of me in the clouds. Now there was only enough fuel in the old Dakota's last tank to fly for five or ten minutes more. I was starting to feel frightened again. But then he started to go down and I followed through the storm.</p>
    
    <p>Suddenly I came out of the clouds and saw two long straight lines of lights in front of me. It was a runway! An airport! I was safe! I turned to look for my friend in the black aeroplane, but the sky was empty. There was nothing there. The black aeroplane was gone. I could not see it anywhere.</p>
    
    <p>I landed and was not sorry to walk away from the old Dakota near the control tower. I went and asked a woman in the control centre where I was and who the other pilot was. I wanted to say 'Thank you'.</p>
    
    <p>She looked at me very strangely, and then laughed.</p>
    
    <p>"Another aeroplane? Up there in this storm? No other aeroplanes were flying tonight. Yours was the only one I could see on the radar."</p>
    
    <p>So who helped me to arrive there safely without a compass or a radio, and without any more fuel in my tanks? Who was the pilot on the strange black aeroplane, flying in the storm, without lights?</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check - The Black Aeroplane</h3>
        <div class="comprehension-question">1. Why did the narrator take the risk of flying through the storm?</div>
        <div class="comprehension-question">2. What happened to the narrator's instruments inside the storm clouds?</div>
        <div class="comprehension-question">3. How did the black aeroplane help the narrator?</div>
        <div class="comprehension-question">4. What surprising information did the woman in the control center give the narrator?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load story content
    const storyContentDiv = document.getElementById('storyContent');
    if (storyContentDiv) {
        storyContentDiv.innerHTML = storyContent + storyPart2;
    }
    
    // Add event listeners to vocabulary terms
    document.querySelectorAll('.highlight-vocab').forEach(term => {
        term.addEventListener('click', function() {
            const word = this.textContent.split('\n')[0].trim();
            const definition = this.querySelector('.vocab-tooltip').textContent;
            
            if (window.narrator) {
                window.narrator.speak(`${word}: ${definition}`);
            }
        });
    });
});

// Poem content data - Poem 1: How to Tell Wild Animals
const poem1Content = `
    <div class="poem-text">
        <p class="poem-title">HOW TO TELL WILD ANIMALS</p>
        <p class="poem-author">by Carolyn Wells</p>
        
        <div class="poem-stanza">
            <p class="poem-line">If ever you should go by chance</p>
            <p class="poem-line">To jungles in the east;</p>
            <p class="poem-line">And if there should to you advance</p>
            <p class="poem-line">A large and <span class="highlight-vocab">tawny<span class="vocab-tooltip">yellowish-brown</span></span> beast,</p>
            <p class="poem-line">If he roars at you as you're dyin'</p>
            <p class="poem-line">You'll know it is the Asian Lion...</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Or if some time when roaming round,</p>
            <p class="poem-line">A noble wild beast greets you,</p>
            <p class="poem-line">With black stripes on a yellow <span class="highlight-vocab">ground<span class="vocab-tooltip">background</span></span>,</p>
            <p class="poem-line">Just notice if he eats you.</p>
            <p class="poem-line">This simple rule may help you learn</p>
            <p class="poem-line">The Bengal Tiger to <span class="highlight-vocab">discern<span class="vocab-tooltip">make out; identify</span></span>.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">If strolling forth, a beast you view,</p>
            <p class="poem-line">Whose <span class="highlight-vocab">hide<span class="vocab-tooltip">animal skin</span></span> with spots is <span class="highlight-vocab">peppered<span class="vocab-tooltip">here, covered with spots</span></span>,</p>
            <p class="poem-line">As soon as he has lept on you,</p>
            <p class="poem-line">You'll know it is the Leopard.</p>
            <p class="poem-line">'Twill do no good to roar with pain,</p>
            <p class="poem-line">He'll only lep and lep again.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">If when you're walking round your yard</p>
            <p class="poem-line">You meet a creature there,</p>
            <p class="poem-line">Who hugs you very, very hard,</p>
            <p class="poem-line">Be sure it is a Bear.</p>
            <p class="poem-line">If you have any doubts, I guess</p>
            <p class="poem-line">He'll give you just one more <span class="highlight-vocab">caress<span class="vocab-tooltip">a gentle, loving touch</span></span>.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Though to distinguish beasts of prey</p>
            <p class="poem-line">A <span class="highlight-vocab">novice<span class="vocab-tooltip">someone new to a job</span></span> might <span class="highlight-vocab">nonplus<span class="vocab-tooltip">(be) puzzle(d), confuse(d), surprise(d)</span></span>,</p>
            <p class="poem-line">The Crocodile you always may</p>
            <p class="poem-line">Tell from the Hyena thus:</p>
            <p class="poem-line">Hyenas come with merry smiles;</p>
            <p class="poem-line">But if they weep they're Crocodiles.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">The true Chameleon is small,</p>
            <p class="poem-line">A lizard sort of thing;</p>
            <p class="poem-line">He hasn't any ears at all,</p>
            <p class="poem-line">And not a single wing.</p>
            <p class="poem-line">If there is nothing on the tree,</p>
            <p class="poem-line">'Tis the chameleon you see.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">tawny</div>
        <div class="definition">yellowish-brown</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">ground</div>
        <div class="definition">background</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">discern</div>
        <div class="definition">make out; identify</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">hide</div>
        <div class="definition">animal skin</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">peppered</div>
        <div class="definition">here, covered with spots</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">caress</div>
        <div class="definition">a gentle, loving touch</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">novice</div>
        <div class="definition">someone new to a job</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">nonplus</div>
        <div class="definition">(be) puzzle(d), confuse(d), surprise(d)</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check - How to Tell Wild Animals</h3>
        <div class="comprehension-question">1. What is the main idea of the poem?</div>
        <div class="comprehension-question">2. How does the poet suggest that you can identify the lion and the tiger?</div>
        <div class="comprehension-question">3. What does the poet say about Hyenas and Crocodiles?</div>
        <div class="comprehension-question">4. What is the humorous element in this poem?</div>
    </div>
`;

// Poem content data - Poem 2: The Ball Poem
const poem2Content = `
    <div class="poem-text">
        <p class="poem-title">THE BALL POEM</p>
        <p class="poem-author">by John Berryman</p>
        
        <div class="poem-stanza">
            <p class="poem-line">What is the boy now, who has lost his ball,</p>
            <p class="poem-line">What, what is he to do? I saw it go</p>
            <p class="poem-line">Merrily bouncing, down the street, and then</p>
            <p class="poem-line">Merrily over — there it is in the water!</p>
            <p class="poem-line">No use to say 'O there are other balls':</p>
            <p class="poem-line">An ultimate shaking grief fixes the boy</p>
            <p class="poem-line">As he stands rigid, trembling, staring down</p>
            <p class="poem-line">All his young days into the harbour where</p>
            <p class="poem-line">His ball went. I would not <span class="highlight-vocab">intrude<span class="vocab-tooltip">here, to enter a situation where one is not welcome</span></span> on him;</p>
            <p class="poem-line">A <span class="highlight-vocab">dime<span class="vocab-tooltip">ten cents (U.S.)</span></span>, another ball, is worthless. Now</p>
            <p class="poem-line">He senses first responsibility</p>
            <p class="poem-line">In a world of possessions. People will take</p>
            <p class="poem-line">Balls, balls will be lost always, little boy.</p>
            <p class="poem-line">And no one buys a ball back. Money is external.</p>
            <p class="poem-line">He is learning, well behind his <span class="highlight-vocab">desperate<span class="vocab-tooltip">hopeless</span></span> eyes,</p>
            <p class="poem-line">The <span class="highlight-vocab">epistemology<span class="vocab-tooltip">understanding the nature of loss — what it means to lose something</span></span> of loss, how to stand up</p>
            <p class="poem-line">Knowing what every man must one day know</p>
            <p class="poem-line">And most know many days, how to stand up.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">intrude</div>
        <div class="definition">here, to enter a situation where one is not welcome</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">dime</div>
        <div class="definition">ten cents (U.S.)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">desperate</div>
        <div class="definition">hopeless</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">epistemology</div>
        <div class="definition">understanding the nature of loss — what it means to lose something</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check - The Ball Poem</h3>
        <div class="comprehension-question">1. Why does the poet not offer to buy the boy a new ball?</div>
        <div class="comprehension-question">2. What does the line "In the world of possessions" mean?</div>
        <div class="comprehension-question">3. What is the boy learning from the loss of the ball?</div>
        <div class="comprehension-question">4. Why is the loss of the ball described as "An ultimate shaking grief"?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load story1 content
    const story1ContentDiv = document.getElementById('story1Content');
    if (story1ContentDiv) {
        story1ContentDiv.innerHTML = storyContent;
    }
    
    // Load story2 content
    const story2ContentDiv = document.getElementById('story2Content');
    if (story2ContentDiv) {
        story2ContentDiv.innerHTML = storyPart2;
    }
    
    // Load poem1 content
    const poem1ContentDiv = document.getElementById('poem1Content');
    if (poem1ContentDiv) {
        poem1ContentDiv.innerHTML = poem1Content;
    }
    
    // Load poem2 content
    const poem2ContentDiv = document.getElementById('poem2Content');
    if (poem2ContentDiv) {
        poem2ContentDiv.innerHTML = poem2Content;
    }
    
    // Add event listeners to vocabulary terms
    document.querySelectorAll('.highlight-vocab').forEach(term => {
        term.addEventListener('click', function() {
            const word = this.textContent.split('\n')[0].trim();
            const definition = this.querySelector('.vocab-tooltip').textContent;
            
            if (window.narrator) {
                window.narrator.speak(`${word}: ${definition}`);
            }
        });
    });
    
    // Add read aloud button for story
    const storyBtn = document.createElement('button');
    storyBtn.className = 'interactive-btn read-part-btn';
    storyBtn.innerHTML = '🔊 Read Story Aloud';
    storyBtn.setAttribute('aria-label', 'Read story aloud');
    storyBtn.onclick = function() { readStoryAloud(); };
    
    // Add button container to story content if it doesn't exist
    if (storyContentDiv) {
        let buttonContainer = storyContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            storyContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(storyBtn);
    }
    
    // Add read aloud button for poem1
    const poem1Btn = document.createElement('button');
    poem1Btn.className = 'interactive-btn read-part-btn';
    poem1Btn.innerHTML = '🔊 Read Poem Aloud';
    poem1Btn.setAttribute('aria-label', 'Read poem aloud');
    poem1Btn.onclick = function() { readPoem1Aloud(); };
    
    // Add button container to poem1 content if it doesn't exist
    if (poem1ContentDiv) {
        let buttonContainer = poem1ContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            poem1ContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(poem1Btn);
    }
    
    // Add read aloud button for poem2
    const poem2Btn = document.createElement('button');
    poem2Btn.className = 'interactive-btn read-part-btn';
    poem2Btn.innerHTML = '🔊 Read Poem Aloud';
    poem2Btn.setAttribute('aria-label', 'Read poem aloud');
    poem2Btn.onclick = function() { readPoem2Aloud(); };
    
    // Add button container to poem2 content if it doesn't exist
    if (poem2ContentDiv) {
        let buttonContainer = poem2ContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            poem2ContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(poem2Btn);
    }
});

// Toggle Read Aloud function for any text
function toggleReadAloud() {
    // If we're in the story1 module, read story 1
    if (document.getElementById('story1').classList.contains('active')) {
        readStory1Aloud();
    }
    // If we're in the story2 module, read story 2
    else if (document.getElementById('story2').classList.contains('active')) {
        readStory2Aloud();
    }
    // If we're in the poem1 module, read the poem
    else if (document.getElementById('poem1').classList.contains('active')) {
        readPoem1Aloud();
    }
    // If we're in the poem2 module, read the poem
    else if (document.getElementById('poem2').classList.contains('active')) {
        readPoem2Aloud();
    }
}

// Read story 1 aloud function - using chunks for better performance
function readStory1Aloud() {
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    // Enable auto-narration
    autoNarrationEnabled = true;
    narrationDisabledByUser = false;
    
    // Stop any ongoing narration first
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
    }
    
    // Extract plain text from the story content
    const storyContentDiv = document.getElementById('story1Content');
    if (!storyContentDiv) return;
    
    // Get all paragraphs and remove vocabulary notes and comprehension checks
    const paragraphs = storyContentDiv.querySelectorAll('p');
    
    // Filter out paragraphs inside vocabulary notes and comprehension checks
    const validParagraphs = Array.from(paragraphs).filter(p => {
        if (p.closest('.vocabulary-note') || p.closest('.comprehension-check')) {
            return false;
        }
        return true;
    });
    
    // Extract text from valid paragraphs
    const paragraphTexts = validParagraphs.map(p => {
        let text = p.textContent.trim();
        // Remove vocabulary tooltip content
        text = text.replace(/\s+/g, ' ');
        return text;
    }).filter(text => text.length > 0);
    
    // Create chunks of paragraphs (approximately 250-300 words per chunk)
    const textChunks = [];
    let currentChunk = "His First Flight. ";
    let wordCount = 0;
    
    paragraphTexts.forEach(paragraphText => {
        const paragraphWordCount = paragraphText.split(' ').length;
        
        if (wordCount + paragraphWordCount > 250) {
            // Add current chunk to array and start a new one
            textChunks.push(currentChunk);
            currentChunk = paragraphText;
            wordCount = paragraphWordCount;
        } else {
            // Add paragraph to current chunk
            currentChunk += " " + paragraphText;
            wordCount += paragraphWordCount;
        }
    });
    
    // Add the last chunk if there's anything left
    if (currentChunk) {
        textChunks.push(currentChunk);
    }
    
    // Read the text chunks sequentially
    readTextChunksSequentially(textChunks, 'story1');
}

// Read story 2 aloud function - using chunks for better performance
function readStory2Aloud() {
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    // Enable auto-narration
    autoNarrationEnabled = true;
    narrationDisabledByUser = false;
    
    // Stop any ongoing narration first
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
    }
    
    // Extract plain text from the story content
    const storyContentDiv = document.getElementById('story2Content');
    if (!storyContentDiv) return;
    
    // Get all paragraphs and remove vocabulary notes and comprehension checks
    const paragraphs = storyContentDiv.querySelectorAll('p');
    
    // Filter out paragraphs inside vocabulary notes and comprehension checks
    const validParagraphs = Array.from(paragraphs).filter(p => {
        if (p.closest('.vocabulary-note') || p.closest('.comprehension-check')) {
            return false;
        }
        return true;
    });
    
    // Extract text from valid paragraphs
    const paragraphTexts = validParagraphs.map(p => {
        let text = p.textContent.trim();
        // Remove vocabulary tooltip content
        text = text.replace(/\s+/g, ' ');
        return text;
    }).filter(text => text.length > 0);
    
    // Create chunks of paragraphs (approximately 250-300 words per chunk)
    const textChunks = [];
    let currentChunk = "The Black Aeroplane. ";
    let wordCount = 0;
    
    paragraphTexts.forEach(paragraphText => {
        const paragraphWordCount = paragraphText.split(' ').length;
        
        if (wordCount + paragraphWordCount > 250) {
            // Add current chunk to array and start a new one
            textChunks.push(currentChunk);
            currentChunk = paragraphText;
            wordCount = paragraphWordCount;
        } else {
            // Add paragraph to current chunk
            currentChunk += " " + paragraphText;
            wordCount += paragraphWordCount;
        }
    });
    
    // Add the last chunk if there's anything left
    if (currentChunk) {
        textChunks.push(currentChunk);
    }
    
    // Read the text chunks sequentially
    readTextChunksSequentially(textChunks, 'story2');
}

// Read poem1 aloud function
function readPoem1Aloud() {
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    // Enable auto-narration
    autoNarrationEnabled = true;
    narrationDisabledByUser = false;
    
    // Stop any ongoing narration first
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
    }
    
    // Extract plain text from the poem content
    const poemContentDiv = document.getElementById('poem1Content');
    if (!poemContentDiv) return;
    
    // Get the poem title and author
    const poemTitle = poemContentDiv.querySelector('.poem-title').textContent;
    const poemAuthor = poemContentDiv.querySelector('.poem-author').textContent;
    
    // Get all poem lines
    const poemLines = poemContentDiv.querySelectorAll('.poem-line');
    
    // Extract text from poem lines
    const poemText = Array.from(poemLines)
        .map(line => {
            let text = line.textContent.trim();
            // Remove vocabulary tooltip content
            text = text.replace(/\s+/g, ' ');
            return text;
        })
        .filter(text => text.length > 0)
        .join('\n');
    
    // Full poem text for narration
    const fullText = `${poemTitle}, ${poemAuthor}.\n\n${poemText}`;
    
    // Read the poem
    readTextChunksSequentially([fullText], 'poem1');
}

// Read poem2 aloud function
function readPoem2Aloud() {
    // Track user interaction for speech synthesis
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    // Enable auto-narration
    autoNarrationEnabled = true;
    narrationDisabledByUser = false;
    
    // Stop any ongoing narration first
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
    }
    
    // Extract plain text from the poem content
    const poemContentDiv = document.getElementById('poem2Content');
    if (!poemContentDiv) return;
    
    // Get the poem title and author
    const poemTitle = poemContentDiv.querySelector('.poem-title').textContent;
    const poemAuthor = poemContentDiv.querySelector('.poem-author').textContent;
    
    // Get all poem lines
    const poemLines = poemContentDiv.querySelectorAll('.poem-line');
    
    // Extract text from poem lines
    const poemText = Array.from(poemLines)
        .map(line => {
            let text = line.textContent.trim();
            // Remove vocabulary tooltip content
            text = text.replace(/\s+/g, ' ');
            return text;
        })
        .filter(text => text.length > 0)
        .join('\n');
    
    // Full poem text for narration
    const fullText = `${poemTitle}, ${poemAuthor}.\n\n${poemText}`;
    
    // Read the poem
    readTextChunksSequentially([fullText], 'poem2');
}

// Function to read a series of text chunks sequentially
function readTextChunksSequentially(textChunks, contentType) {
    if (!window.narrator || !window.narrator.enabled || textChunks.length === 0) return;
    
    // Show reading indicator
    const contentDiv = contentType === 'story' 
        ? document.getElementById('storyContent')
        : contentType === 'poem1'
            ? document.getElementById('poem1Content')
            : document.getElementById('poem2Content');
    
    if (!contentDiv) return;
    
    const readingIndicator = document.createElement('div');
    readingIndicator.className = 'reading-indicator';
    readingIndicator.id = `reading-indicator-${contentType}`;
    readingIndicator.innerHTML = '<div class="reading-spinner"></div> Reading aloud...';
    
    // Find button container or create one
    let buttonContainer = contentDiv.querySelector('.button-container');
    if (!buttonContainer) {
        buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        contentDiv.appendChild(buttonContainer);
    }
    
    buttonContainer.appendChild(readingIndicator);
    
    // Add stop button
    const stopButton = document.createElement('button');
    stopButton.className = 'interactive-btn stop-narration-btn';
    stopButton.innerHTML = '⏹️ Stop Reading';
    stopButton.onclick = stopNarration;
    readingIndicator.appendChild(stopButton);
    
    
    // Read chunks sequentially
    let currentChunkIndex = 0;
    
    function readNextChunk() {
        if (currentChunkIndex >= textChunks.length) {
            // All chunks read, remove indicator
            if (readingIndicator.parentNode) {
                readingIndicator.classList.add('fade-out');
                setTimeout(() => readingIndicator.remove(), 500);
            }
            return;
        }
        
        // Set up callback for when this chunk finishes
        window.narrator.onEndCallback = function() {
            currentChunkIndex++;
            // Short pause between chunks
            setTimeout(readNextChunk, 500);
        };
        
        // Read the current chunk
        window.narrator.speak(textChunks[currentChunkIndex]);
    }
    
    // Start reading the first chunk
    readNextChunk();
    
    // Set timeout for removing indicator if narration fails
    window.readingTimeout = setTimeout(() => {
        if (readingIndicator.parentNode) {
            readingIndicator.classList.add('fade-out');
            setTimeout(() => readingIndicator.remove(), 500);
        }
    }, 5 * 60 * 1000); // 5 minutes max
}

// Stop ongoing narration
function stopNarration() {
    if (window.narrator) {
        window.narrator.stop();
        
        // Disable auto-narration when user manually stops
        autoNarrationEnabled = false;
        narrationDisabledByUser = true;
        
        // Remove all reading indicators
        document.querySelectorAll('.reading-indicator').forEach(indicator => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) indicator.remove();
            }, 500);
        });
        
        // Clear any timeouts
        if (window.readingTimeout && typeof clearTimeout === 'function') {
            clearTimeout(window.readingTimeout);
        }
    }
}

// Highlight story1 vocabulary words
function highlightStory1Vocabulary() {
    const vocabTerms = document.querySelectorAll('#story1Content .highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the story content container
    const contentContainer = document.getElementById('story1Content');
    if (contentContainer) {
        contentContainer.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

// Highlight story2 vocabulary words
function highlightStory2Vocabulary() {
    const vocabTerms = document.querySelectorAll('#story2Content .highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the story content container
    const contentContainer = document.getElementById('story2Content');
    if (contentContainer) {
        contentContainer.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

// Highlight vocabulary words in the text (legacy function)
function highlightVocabulary() {
    const vocabTerms = document.querySelectorAll('.highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the active content container
    let contentContainer;
    if (document.getElementById('story1').classList.contains('active')) {
        contentContainer = document.getElementById('story1Content');
    } else if (document.getElementById('story2').classList.contains('active')) {
        contentContainer = document.getElementById('story2Content');
    } else if (document.getElementById('poem1').classList.contains('active')) {
        contentContainer = document.getElementById('poem1Content');
    } else if (document.getElementById('poem2').classList.contains('active')) {
        contentContainer = document.getElementById('poem2Content');
    }
    
    if (contentContainer) {
        contentContainer.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

// Highlight poem vocabulary words for both poems
function highlightPoem1Vocabulary() {
    const vocabTerms = document.querySelectorAll('#poem1Content .highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the poem content container
    const poemContent = document.getElementById('poem1Content');
    if (poemContent) {
        poemContent.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

function highlightPoem2Vocabulary() {
    const vocabTerms = document.querySelectorAll('#poem2Content .highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the poem content container
    const poemContent = document.getElementById('poem2Content');
    if (poemContent) {
        poemContent.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

// Toggle print-friendly mode
function togglePrintMode() {
    document.body.classList.toggle('print-mode');
    
    // Show a message that print mode is toggled
    const isPrintMode = document.body.classList.contains('print-mode');
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = isPrintMode ? 
        'Print-friendly mode enabled. Use your browser\'s print function to print.' : 
        'Print-friendly mode disabled.';
    
    // Find the active content container
    let contentContainer;
    if (document.getElementById('story').classList.contains('active')) {
        contentContainer = document.getElementById('storyContent');
    } else if (document.getElementById('poem1').classList.contains('active')) {
        contentContainer = document.getElementById('poem1Content');
    } else if (document.getElementById('poem2').classList.contains('active')) {
        contentContainer = document.getElementById('poem2Content');
    }
    
    if (contentContainer) {
        contentContainer.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}
