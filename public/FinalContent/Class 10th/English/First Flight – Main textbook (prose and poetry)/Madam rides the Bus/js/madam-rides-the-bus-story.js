/**
 * Story and poem content and functionality for Madam Rides the Bus
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Complete story content data for Madam Rides the Bus
const storyContent = `
    <p>BEFORE YOU READ</p>
    
    <p>In this sensitive story, an eight-year old girl's first bus journey into the world outside her village is also her induction into the mystery of life and death. She sees the gap between our knowing that there is death, and our understanding of it.</p>
    
    <p>I</p>
    
    <p>THERE was a girl named Valliammai who was called Valli for short. She was eight years old and very curious about things. Her <span class="highlight-vocab">favourite<span class="vocab-tooltip">preferred, enjoyed most</span></span> pastime was standing in the front doorway of her house, watching what was happening in the street outside. There were no playmates of her own age on her street, and this was about all she had to do.</p>
    
    <div class="vocabulary-note">
        <div class="word">favourite</div>
        <div class="definition">preferred, enjoyed most</div>
    </div>
    
    <p>But for Valli, standing at the front door was every bit as enjoyable as any of the elaborate games other children played. Watching the street gave her many new unusual experiences.</p>
    
    <p>The most <span class="highlight-vocab">fascinating<span class="vocab-tooltip">extremely interesting</span></span> thing of all was the bus that travelled between her village and the nearest town. It passed through her street each hour, once going to the town and once coming back. The sight of the bus, filled each time with a new set of passengers, was a source of unending joy for Valli.</p>
    
    <div class="vocabulary-note">
        <div class="word">fascinating</div>
        <div class="definition">extremely interesting</div>
    </div>
    
    <p>Day after day she watched the bus, and gradually a tiny wish crept into her head and grew there: she wanted to ride on that bus, even if just once. This wish became stronger and stronger, until it was an overwhelming desire. Valli would stare <span class="highlight-vocab">wistfully<span class="vocab-tooltip">longingly</span></span> at the people who got on or off the bus when it stopped at the street corner. Their faces would <span class="highlight-vocab">kindle<span class="vocab-tooltip">set alight (a fire), here, feelings</span></span> in her longings, dreams, and hopes. If one of her friends happened to ride the bus and tried to describe the sights of the town to her, Valli would be too jealous to listen and would shout, in English: "Proud! proud!" Neither she nor her friends really understood the meaning of the word, but they used it often as a <span class="highlight-vocab">slang expression<span class="vocab-tooltip">informal words, often used within a close group</span></span> of disapproval.</p>
    
    <div class="vocabulary-note">
        <div class="word">wistfully</div>
        <div class="definition">longingly</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">kindle</div>
        <div class="definition">set alight (a fire), here, feelings</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">slang expression</div>
        <div class="definition">informal words, often used within a close group</div>
    </div>
    
    <p>Over many days and months Valli listened carefully to conversations between her neighbours and people who regularly used the bus, and she also asked a few <span class="highlight-vocab">discreet questions<span class="vocab-tooltip">careful questions</span></span> here and there. This way she picked up various small details about the bus journey. The town was six miles from her village. The fare was thirty paise one way — "which is almost nothing at all," she heard one well-dressed man say, but to Valli, who scarcely saw that much money from one month to the next, it seemed a fortune. The trip to the town took forty-five minutes. On reaching town, if she stayed in her seat and paid another thirty paise, she could return home on the same bus. This meant that she could take the one-o'clock afternoon bus, reach the town at one forty-five, and be back home by about two forty-five...</p>
    
    <div class="vocabulary-note">
        <div class="word">discreet questions</div>
        <div class="definition">careful questions</div>
    </div>
    
    <p>On and on went her thoughts as she calculated and recalculated, planned and replanned.</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What was Valli's favourite pastime?</div>
        <div class="comprehension-question">2. What was a source of unending joy for Valli? What was her strongest desire?</div>
        <div class="comprehension-question">3. What did Valli find out about the bus journey? How did she find out these details?</div>
        <div class="comprehension-question">4. What do you think Valli was planning to do?</div>
    </div>

    <p>II</p>
    
    <p>Well, one fine spring day the afternoon bus was just on the point of leaving the village and turning into the main highway when a small voice was heard shouting: "Stop the bus! Stop the bus!" And a tiny hand was raised <span class="highlight-vocab">commandingly<span class="vocab-tooltip">in a manner that gives orders</span></span>.</p>
    
    <div class="vocabulary-note">
        <div class="word">commandingly</div>
        <div class="definition">in a manner that gives orders</div>
    </div>
    
    <p>The bus slowed down to a <span class="highlight-vocab">crawl<span class="vocab-tooltip">very slow pace</span></span>, and the conductor, sticking his head out the door, said, "Hurry then! Tell whoever it is to come quickly."</p>
    
    <div class="vocabulary-note">
        <div class="word">crawl</div>
        <div class="definition">very slow pace</div>
    </div>
    
    <p>"It's me," shouted Valli. "I'm the one who has to get on."</p>
    
    <p>By now the bus had come to a stop, and the conductor said, "Oh, really! You don't say so!"</p>
    
    <p>"Yes, I simply have to go to town," said Valli, still standing outside the bus, "and here's my money." She showed him some coins.</p>
    
    <p>"Okay, okay, but first you must get on the bus," said the conductor, and he stretched out a hand to help her up.</p>
    
    <p>"Never mind," she said, "I can get on by myself. You don't have to help me."</p>
    
    <p>The conductor was a jolly sort, fond of joking. "Oh, please don't be angry with me, my fine madam," he said. "Here, have a seat right up there in front. Everybody move aside please — make way for madam."</p>
    
    <p>It was the <span class="highlight-vocab">slack time<span class="vocab-tooltip">time when there is not much work</span></span> of day, and there were only six or seven passengers on the bus. They were all looking at Valli and laughing with the conductor. Valli was overcome with shyness. Avoiding everyone's eyes, she walked quickly to an empty seat and sat down.</p>
    
    <div class="vocabulary-note">
        <div class="word">slack time</div>
        <div class="definition">time when there is not much work</div>
    </div>
    
    <p>"May we start now, madam?" the conductor asked, smiling. Then he blew his whistle twice, and the bus moved forward with a roar.</p>
    
    <p>It was a new bus, its outside painted a gleaming white with some green stripes along the sides. Inside, the overhead bars shone like silver. Directly in front of Valli, above the windshield, there was a beautiful clock. The seats were soft and luxurious.</p>
    
    <p>Valli <span class="highlight-vocab">devoured<span class="vocab-tooltip">consumed eagerly</span></span> everything with her eyes. But when she started to look outside, she found her view cut off by a canvas blind that covered the lower part of her window. So she stood up on the seat and peered over the blind.</p>
    
    <div class="vocabulary-note">
        <div class="word">devoured</div>
        <div class="definition">consumed eagerly</div>
    </div>
    
    <p>The bus was now going along the bank of a canal. The road was very narrow. On one side there was the canal and, beyond it, palm trees, grassland, distant mountains, and the blue, blue sky. On the other side was a deep ditch and then acres and acres of green fields — green, green, green, as far as the eye could see.</p>
    
    <p>Oh, it was all so wonderful!</p>
    
    <p>Suddenly she was startled by a voice. "Listen, child," said the voice, "you shouldn't stand like that. Sit down."</p>
    
    <p>Sitting down, she looked to see who had spoken. It was an elderly man who had honestly been concerned for her, but she was annoyed by his attention.</p>
    
    <p>"There's nobody here who's a child," she said <span class="highlight-vocab">haughtily<span class="vocab-tooltip">proudly</span></span>. "I've paid my thirty paise like everyone else."</p>
    
    <div class="vocabulary-note">
        <div class="word">haughtily</div>
        <div class="definition">proudly</div>
    </div>
    
    <p>The conductor chimed in. "Oh, sir, but this is a very grown-up madam. Do you think a mere girl could pay her own fare and travel to the city all alone?"</p>
    
    <p>Valli shot an angry glance at the conductor and said, "I am not a madam. Please remember that. And you've not yet given me my ticket."</p>
    
    <p>"I'll remember," the conductor said, <span class="highlight-vocab">mimicking<span class="vocab-tooltip">copying</span></span> her tone. Everyone laughed, and gradually Valli too joined in the laughter.</p>
    
    <div class="vocabulary-note">
        <div class="word">mimicking</div>
        <div class="definition">copying</div>
    </div>
    
    <p>The conductor punched a ticket and handed it to her. "Just sit back and make yourself comfortable. Why should you stand when you've paid for a seat?"</p>
    
    <p>"Because I want to," she answered, standing up again.</p>
    
    <p>"But if you stand on the seat, you may fall and hurt yourself when the bus makes a sharp turn or hits a bump. That's why we want you to sit down, child."</p>
    
    <p>"I'm not a child, I tell you," she said <span class="highlight-vocab">irritably<span class="vocab-tooltip">in an annoyed manner</span></span>. "I'm eight years old."</p>
    
    <div class="vocabulary-note">
        <div class="word">irritably</div>
        <div class="definition">in an annoyed manner</div>
    </div>
    
    <p>"Of course, of course. How stupid of me! Eight years — my!"</p>
    
    <p>The bus stopped, some new passengers got on, and the conductor got busy for a time. Afraid of losing her seat, Valli finally sat down.</p>
    
    <p>An elderly woman came and sat beside her. "Are you all alone, dear?" she asked Valli as the bus started again.</p>
    
    <p>Valli found the woman absolutely <span class="highlight-vocab">repulsive<span class="vocab-tooltip">causing strong dislike</span></span> — such big holes she had in her ear lobes, and such ugly earrings in them! And she could smell the betel nut the woman was chewing and see the betel juice that was threatening to spill over her lips at any moment. Ugh! — who could be sociable with such a person?</p>
    
    <div class="vocabulary-note">
        <div class="word">repulsive</div>
        <div class="definition">causing strong dislike</div>
    </div>
    
    <p>"Yes, I'm travelling alone," she answered <span class="highlight-vocab">curtly<span class="vocab-tooltip">showing displeasure</span></span>. "And I've got a ticket too."</p>
    
    <div class="vocabulary-note">
        <div class="word">curtly</div>
        <div class="definition">showing displeasure</div>
    </div>
    
    <p>"Yes, she's on her way to town," said the conductor. "With a thirty-paise ticket."</p>
    
    <p>"Oh, why don't you mind your own business," said Valli. But she laughed all the same, and the conductor laughed too.</p>
    
    <p>But the old woman went on with her <span class="highlight-vocab">drivel<span class="vocab-tooltip">silly nonsense</span></span>. "Is it proper for such a young person to travel alone? Do you know exactly where you're going in town? What's the street? What's the house number?"</p>
    
    <div class="vocabulary-note">
        <div class="word">drivel</div>
        <div class="definition">silly nonsense</div>
    </div>
    
    <p>"You needn't bother about me. I can take care of myself," Valli said, turning her face towards the window and staring out.</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. Why does the conductor call Valli 'madam'?</div>
        <div class="comprehension-question">2. Why does Valli stand up on the seat? What does she see now?</div>
        <div class="comprehension-question">3. What does Valli tell the elderly man when he calls her a child?</div>
        <div class="comprehension-question">4. Why didn't Valli want to make friends with the elderly woman?</div>
    </div>
    
    <p>III</p>
    
    <p>Her first journey — what careful, painstaking, elaborate plans she had had to make for it! She had <span class="highlight-vocab">thriftily<span class="vocab-tooltip">spend money carefully</span></span> saved whatever stray coins came her way, resisting every temptation to buy peppermints, toys, balloons, and the like, and finally she had saved a total of sixty paise. How difficult it had been, particularly that day at the village fair, but she had <span class="highlight-vocab">resolutely stifled<span class="vocab-tooltip">suppressed/controlled with determination</span></span> a strong desire to ride the merry-go-round, even though she had the money.</p>
    
    <div class="vocabulary-note">
        <div class="word">thriftily</div>
        <div class="definition">spend money carefully</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">resolutely stifled</div>
        <div class="definition">suppressed/controlled with determination</div>
    </div>
    
    <p>After she had enough money saved, her next problem was how to slip out of the house without her mother's knowledge. But she managed this without too much difficulty. Every day after lunch her mother would nap from about one to four or so. Valli always used these hours for her 'excursions' as she stood looking from the doorway of her house or sometimes even <span class="highlight-vocab">ventured out<span class="vocab-tooltip">went cautiously, courageously</span></span> into the village; today, these same hours could be used for her first excursion outside the village.</p>
    
    <div class="vocabulary-note">
        <div class="word">ventured out</div>
        <div class="definition">went cautiously, courageously</div>
    </div>
    
    <p>The bus rolled on now cutting across a bare landscape, now rushing through a tiny hamlet or past an odd wayside shop. Sometimes the bus seemed on the point of gobbling up another vehicle that was coming towards them or a pedestrian crossing the road. But lo! somehow it passed on smoothly, leaving all obstacles safely behind. Trees came running towards them but then stopped as the bus reached them and simply stood there helpless for a moment by the side of the road before rushing away in the other direction.</p>
    
    <p>Suddenly Valli clapped her hands with glee. A young cow, tail high in the air, was running very fast, right in the middle of the road, right in front of the bus. The bus slowed to a crawl, and the driver sounded his horn loudly again and again. But the more he honked, the more frightened the animal became and the faster it galloped — always right in front of the bus.</p>
    
    <p>Somehow this was very funny to Valli. She laughed and laughed until there were tears in her eyes.</p>
    
    <p>"Hey, lady, haven't you laughed enough?" called, the conductor. "Better save some for tomorrow."</p>
    
    <p>At last the cow moved off the road. And soon the bus came to a railroad crossing. A speck of a train could be seen in the distance, growing bigger and bigger as it drew near. Then it rushed past the crossing gate with a tremendous roar and rattle, shaking the bus. Then the bus went on and passed the train station. From there it traversed a busy, well-laid-out shopping street and, turning, entered a wider <span class="highlight-vocab">thoroughfare<span class="vocab-tooltip">a busy public road</span></span>. Such big, bright-looking shops! What glittering displays of clothes and other <span class="highlight-vocab">merchandise<span class="vocab-tooltip">things for sale</span></span>! Such big crowds!</p>
    
    <div class="vocabulary-note">
        <div class="word">thoroughfare</div>
        <div class="definition">a busy public road</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">merchandise</div>
        <div class="definition">things for sale</div>
    </div>
    
    <p>Struck dumb with wonder, Valli gaped at everything. Then the bus stopped and everyone got off except Valli.</p>
    
    <p>"Hey, lady," said the conductor, "aren't you ready to get off? This is as far as your thirty paise takes you."</p>
    
    <p>"No," Valli said, "I'm going back on this same bus." She took another thirty paise from her pocket and handed the coins to the conductor.</p>
    
    <p>"Why, is something the matter?"</p>
    
    <p>"No, nothing's the matter. I just felt like having a bus ride, that's all."</p>
    
    <p>"Don't you want to have a look at the sights, now that you're here?"</p>
    
    <p>"All by myself? Oh, I'd be much too afraid."</p>
    
    <p>Greatly amused by the girl's way of speaking, the conductor said, "But you weren't afraid to come in the bus."</p>
    
    <p>"Nothing to be afraid of about that," she answered.</p>
    
    <p>"Well, then, why not go to that stall over there and have something to drink? Nothing to be afraid of about that either."</p>
    
    <p>"Oh, no, I couldn't do that."</p>
    
    <p>"Well, then, let me bring you a cold drink."</p>
    
    <p>"No, I don't have enough money. Just give me my ticket, that's all."</p>
    
    <p>"It'll be my treat and not cost you anything."</p>
    
    <p>"No, no," she said firmly, "please, no."</p>
    
    <p>The conductor shrugged, and they waited until it was time for the bus to begin the return journey. Again there weren't many passengers.</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. How did Valli save up money for her first journey? Was it easy for her?</div>
        <div class="comprehension-question">2. What did Valli see on her way that made her laugh?</div>
        <div class="comprehension-question">3. Why didn't she get off the bus at the bus station?</div>
        <div class="comprehension-question">4. Why didn't Valli want to go to the stall and have a drink? What does this tell you about her?</div>
    </div>
    
    <p>IV</p>
    
    <p>"Won't your mother be looking for you?" the conductor asked when he gave the girl her ticket.</p>
    
    <p>"No, no one will be looking for me," she said.</p>
    
    <p>The bus started, and again there were the same wonderful sights. Valli wasn't bored in the slightest and greeted everything with the same excitement she'd felt the first time. But suddenly she saw a young cow lying dead by the roadside, just where it had been struck by some fast-moving vehicle.</p>
    
    <p>"Isn't that the same cow that ran in front of the bus on our trip to town?" she asked the conductor.</p>
    
    <p>The conductor nodded, and she was overcome with sadness. What had been a lovable, beautiful creature just a little while ago had now suddenly lost its charm and its life and looked so horrible, so frightening as it lay there, legs <span class="highlight-vocab">spreadeagled<span class="vocab-tooltip">spread out</span></span>, a fixed stare in its lifeless eyes, blood all over...</p>
    
    <div class="vocabulary-note">
        <div class="word">spreadeagled</div>
        <div class="definition">spread out</div>
    </div>
    
    <p>The bus moved on. The memory of the dead cow <span class="highlight-vocab">haunted<span class="vocab-tooltip">returned repeatedly to her mind; was impossible to forget</span></span> her, dampening her enthusiasm. She no longer wanted to look out the window.</p>
    
    <div class="vocabulary-note">
        <div class="word">haunted</div>
        <div class="definition">returned repeatedly to her mind; was impossible to forget</div>
    </div>
    
    <p>She sat thus, glued to her seat, until the bus reached her village at three forty. She stood up and stretched herself. Then she turned to the conductor and said, "Well, sir, 1 hope to see you again."</p>
    
    <p>"Okay, madam," he answered her, smiling. "Whenever you feel like a bus ride, come and join us. And don't forget to bring your fare."</p>
    
    <p>She laughed and jumped down from the bus. Then away she went, running straight for home.</p>
    
    <p>When she entered her house she found her mother awake and talking to one of Valli's aunts, the one from South Street. This aunt was a real <span class="highlight-vocab">chatterbox<span class="vocab-tooltip">a very talkative person</span></span>, never closing her mouth once she started talking.</p>
    
    <div class="vocabulary-note">
        <div class="word">chatterbox</div>
        <div class="definition">a very talkative person</div>
    </div>
    
    <p>"And where have you been?" said her aunt when Valli came in. She spoke very casually, not expecting a reply. So Valli just smiled, and her mother and aunt went on with their conversation.</p>
    
    <p>"Yes, you're right," her mother said. "So many things in our midst and in the world outside. How can we possibly know about everything? And even when we do know about something, we often can't understand it completely, can we?"</p>
    
    <p>"Oh, yes!" breathed Valli.</p>
    
    <p>"What?" asked her mother. "What's that you say?"</p>
    
    <p>"Oh," said Valli, "I was just agreeing with what you said about things happening without our knowledge."</p>
    
    <p>"Just a chit of a girl, she is," said her aunt, "and yet look how she <span class="highlight-vocab">pokes her nose<span class="vocab-tooltip">takes an interest in something that doesn't concern her</span></span> into our conversation, just as though she were a grown lady."</p>
    
    <div class="vocabulary-note">
        <div class="word">pokes her nose</div>
        <div class="definition">takes an interest in something that doesn't concern her</div>
    </div>
    
    <p>Valli smiled to herself. She didn't want them to understand her smile. But, then, there wasn't much chance of that, was there?</p>

    <div class="comprehension-check">
        <h3>📝 Thinking About the Text</h3>
        <div class="comprehension-question">1. What was Valli's deepest desire? Find the words and phrases in the story that tell you this.</div>
        <div class="comprehension-question">2. How did Valli plan her bus ride? What did she find out about the bus, and how did she save up the fare?</div>
        <div class="comprehension-question">3. What kind of a person is Valli? To answer this question, pick out the following sentences from the text and fill in the blanks: (i) "Stop the bus! Stop the bus!" And a tiny hand was raised _______. (ii) "Yes, I _____ go to town," said Valli, still standing outside the bus. (iii) "There's nobody here _____," she said haughtily. "I've paid my thirty paise like everyone else." (iv) "Never mind," she said, "I can _____. You don't have to help me. "I'm not a child, I tell you," she said, _____. (v) "You needn't bother about me. I _____," Valli said, turning her face toward the window and staring out. (vi) Then she turned to the conductor and said, "Well, sir, I hope _____."</div>
        <div class="comprehension-question">4. Why does the conductor call Valli 'madam'?</div>
        <div class="comprehension-question">5. Find the lines in the text which tell you that Valli was enjoying her ride on the bus.</div>
        <div class="comprehension-question">6. Why does Valli refuse to look out of the window on her way back?</div>
        <div class="comprehension-question">7. What does Valli mean when she says, "I was just agreeing with what you said about things happening without our knowledge."</div>
        <div class="comprehension-question">8. The author describes the things that Valli sees from an eight-year-old's point of view. Can you find evidence from the text for this statement?</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Speaking Activity</h3>
        <p>This story has a lot of people talking in it. The conductor jokes and laughs with Valli, some passengers try to show their concern for her, and her mother and her aunt spend time chatting.</p>
        <p>Read the conversations carefully. Then think of similar people, or similar situations that you have experienced. Mimic a person or persons who spoke to you, saying what they said, along with your replies.</p>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Writing Activity</h3>
        <p>Write a page — about three paragraphs — on one of the following topics:</p>
        <div class="comprehension-question">1. Have you ever planned something entirely on your own, without taking grown-ups into your confidence? What did you plan, and how? Did you carry out your plan?</div>
        <div class="comprehension-question">2. Have you made a journey that was unforgettable in some way? What made it memorable?</div>
        <div class="comprehension-question">3. Are you concerned about traffic and road safety? What are your concerns? How would you make road travel safer and more enjoyable?</div>
    </div>
`;

// Poem content data (The Tale of Custard the Dragon)
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">THE TALE OF CUSTARD THE DRAGON</p>
        <p class="poem-author">by Ogden Nash</p>
        
        <div class="poem-stanza">
            <p class="poem-line">Belinda lived in a little white house,</p>
            <p class="poem-line">With a little black kitten and a little grey mouse,</p>
            <p class="poem-line">And a little yellow dog and a little red wagon,</p>
            <p class="poem-line">And a realio, trulio, little pet dragon.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Now the name of the little black kitten was Ink,</p>
            <p class="poem-line">And the little grey mouse, she called him Blink,</p>
            <p class="poem-line">And the little yellow dog was sharp as Mustard,</p>
            <p class="poem-line">But the dragon was a coward, and she called him Custard.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Custard the dragon had big sharp teeth,</p>
            <p class="poem-line">And spikes on top of him and scales underneath,</p>
            <p class="poem-line">Mouth like a fireplace, chimney for a nose,</p>
            <p class="poem-line">And realio, trulio daggers on his toes.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Belinda was as brave as a <span class="highlight-vocab">barrel<span class="vocab-tooltip">a large cylindrical container</span></span> full of bears,</p>
            <p class="poem-line">And Ink and Blink chased lions down the stairs,</p>
            <p class="poem-line">Mustard was as brave as a tiger in a rage,</p>
            <p class="poem-line">But Custard cried for a nice safe cage.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Belinda tickled him, she tickled him <span class="highlight-vocab">unmerciful<span class="vocab-tooltip">without mercy</span></span>,</p>
            <p class="poem-line">Ink, Blink and Mustard, they rudely called him Percival,</p>
            <p class="poem-line">They all sat laughing in the little red wagon</p>
            <p class="poem-line">At the realio, trulio, cowardly dragon.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Belinda giggled till she shook the house,</p>
            <p class="poem-line">And Blink said Weeck! which is giggling for a mouse,</p>
            <p class="poem-line">Ink and Mustard rudely asked his age,</p>
            <p class="poem-line">When Custard cried for a nice safe cage.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Suddenly, suddenly they heard a nasty sound,</p>
            <p class="poem-line">And Mustard growled, and they all looked around.</p>
            <p class="poem-line">Meowch! cried Ink, and ooh! cried Belinda,</p>
            <p class="poem-line">For there was a pirate, climbing in the <span class="highlight-vocab">winda<span class="vocab-tooltip">window (written this way for rhyme)</span></span>.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Pistol in his left hand, pistol in his right,</p>
            <p class="poem-line">And he held in his teeth a <span class="highlight-vocab">cutlass<span class="vocab-tooltip">a short sword with a curved blade</span></span> bright,</p>
            <p class="poem-line">His beard was black, one leg was wood;</p>
            <p class="poem-line">It was clear that the pirate meant no good.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Belinda paled, and she cried Help! Help!</p>
            <p class="poem-line">But Mustard fled with a terrified yelp,</p>
            <p class="poem-line">Ink trickled down to the bottom of the household,</p>
            <p class="poem-line">And little mouse Blink strategically mouseholed.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">But up jumped Custard, snorting like an engine,</p>
            <p class="poem-line">Clashed his tail like irons in a <span class="highlight-vocab">dungeon<span class="vocab-tooltip">a dark underground prison</span></span>,</p>
            <p class="poem-line">With a clatter and a clank and a jangling squirm,</p>
            <p class="poem-line">He went at the pirate like a robin at a worm.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">The pirate gaped at Belinda's dragon,</p>
            <p class="poem-line">And gulped some <span class="highlight-vocab">grog<span class="vocab-tooltip">a drink typically drunk by sailors</span></span> from his pocket <span class="highlight-vocab">flagon<span class="vocab-tooltip">a container for drinks</span></span>,</p>
            <p class="poem-line">He fired two bullets, but they didn't hit,</p>
            <p class="poem-line">And Custard gobbled him, every bit.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Belinda embraced him, Mustard licked him,</p>
            <p class="poem-line">No one mourned for his pirate victim.</p>
            <p class="poem-line">Ink and Blink in glee did <span class="highlight-vocab">gyrate<span class="vocab-tooltip">to move around in circles</span></span></p>
            <p class="poem-line">Around the dragon that ate the pirate.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">But presently up spoke little dog Mustard,</p>
            <p class="poem-line">I'd have been twice as brave if I hadn't been <span class="highlight-vocab">flustered<span class="vocab-tooltip">confused or nervous</span></span>.</p>
            <p class="poem-line">And up spoke Ink and up spoke Blink,</p>
            <p class="poem-line">We'd have been three times as brave, we think,</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">And Custard said, I quite agree</p>
            <p class="poem-line">That everybody is braver than me.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Belinda still lives in her little white house,</p>
            <p class="poem-line">With her little black kitten and her little grey mouse,</p>
            <p class="poem-line">And her little yellow dog and her little red wagon,</p>
            <p class="poem-line">And her realio, trulio little pet dragon.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Belinda is as brave as a barrel full of bears,</p>
            <p class="poem-line">And Ink and Blink chase lions down the stairs,</p>
            <p class="poem-line">Mustard is as brave as a tiger in a rage,</p>
            <p class="poem-line">But Custard keeps crying for a nice safe cage.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">barrel</div>
        <div class="definition">a large cylindrical container</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">unmerciful</div>
        <div class="definition">without mercy</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">winda</div>
        <div class="definition">window (written this way for rhyme)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">cutlass</div>
        <div class="definition">a short sword with a curved blade</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">dungeon</div>
        <div class="definition">a dark underground prison</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">grog</div>
        <div class="definition">a drink typically drunk by sailors</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">flagon</div>
        <div class="definition">a container for drinks</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">gyrate</div>
        <div class="definition">to move around in circles</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">flustered</div>
        <div class="definition">confused or nervous</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 About the Poem</h3>
        <div class="comprehension-question">1. Who are the characters in this poem? List them with their pet names.</div>
        <div class="comprehension-question">2. Why did Custard cry for a nice safe cage? Why is the dragon called "cowardly dragon"?</div>
        <div class="comprehension-question">3. "Belinda tickled him, she tickled him unmerciful..." Why?</div>
        <div class="comprehension-question">4. The poet has employed many poetic devices in the poem. For example: "Clashed his tail like iron in a dungeon" — the poetic device here is a simile. Can you list some more such poetic devices used in the poem?</div>
        <div class="comprehension-question">5. Read stanza three again to know how the poet describes the appearance of the dragon.</div>
        <div class="comprehension-question">6. Can you find out the rhyme scheme of two or three stanzas of the poem?</div>
        <div class="comprehension-question">7. Writers use words to give us a picture or image without actually saying what they mean. Can you trace some images used in the poem?</div>
        <div class="comprehension-question">8. Do you find The Tale of Custard the Dragon to be a serious or a light-hearted poem? Give reasons to support your answer.</div>
        <div class="comprehension-question">9. This poem, in ballad form, tells a story. Have you come across any such modern song or lyric that tells a story? If you know one, tell it to the class.</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Writing Activity</h3>
        <p>Have fun writing your ballad. Gather information (choose/decide an idea/theme), organise your materials under characters and story and then write. Revise and edit your ballad to make it entertaining. Use the following guidelines to write your ballad.</p>
        <ul>
            <li>Purpose of writing the ballad: to entertain and interest</li>
            <li>To whom I am writing: decide for whom you are writing</li>
            <li>How should I structure features?:
                <ul>
                    <li>Tell a simple narrative</li>
                    <li>A few major characters</li>
                    <li>A strong rhythm and rhyme</li>
                    <li>May have a refrain (single or two line(s) repeated often)</li>
                    <li>Divide into verses</li>
                </ul>
            </li>
        </ul>
    </div>
    
    <div class="author-info">
        <h3>About the Poet</h3>
        <p>Ogden Nash wrote over four hundred pieces of comic verse. The best of his work was published in 14 volumes between 1931 and 1972. His work is perhaps best described in this poetic tribute by Anthony Burgess:</p>
        
        <div class="poet-tribute">
            <p>...he brought a new kind of sound to our literary diversions.</p>
            <p>And didn't care much about breaking the poetic laws of the Medes and the Persians.</p>
            <p>He uses lines, sometimes of considerable length that are colloquial and prosy.</p>
            <p>And at the end presents you with a rhyme...</p>
            <p>This bringing together of the informal and the formal is what his genius chiefly loves.</p>
            <p>I am trying to imitate him here, but he is probably quite inimitable.</p>
        </div>
    </div>
`;

// JavaScript to load the content when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load story content
    const storyContentDiv = document.getElementById('storyContent');
    if (storyContentDiv) {
        // The story content is now a single variable
        storyContentDiv.innerHTML = storyContent;
    }
    
    // Load poem content
    const poemContentDiv = document.getElementById('poemContent');
    if (poemContentDiv) {
        poemContentDiv.innerHTML = poemContent;
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
    
    // Add read aloud button for poem
    const poemBtn = document.createElement('button');
    poemBtn.className = 'interactive-btn read-part-btn';
    poemBtn.innerHTML = '🔊 Read Poem Aloud';
    poemBtn.setAttribute('aria-label', 'Read poem aloud');
    poemBtn.onclick = function() { readPoemAloud(); };
    
    // Add button container to poem content if it doesn't exist
    if (poemContentDiv) {
        let buttonContainer = poemContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            poemContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(poemBtn);
    }
});

// Toggle Read Aloud function for any text
function toggleReadAloud() {
    // If we're in the story module, read the story
    if (document.getElementById('story').classList.contains('active')) {
        readStoryAloud();
    }
    // If we're in the poem module, read the poem
    else if (document.getElementById('poem').classList.contains('active')) {
        readPoemAloud();
    }
}

// Read story aloud function - using chunks for better performance
function readStoryAloud() {
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
    const storyContentDiv = document.getElementById('storyContent');
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
    let currentChunk = "Madam Rides the Bus, by K. S. Sundaram. ";
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
    readTextChunksSequentially(textChunks, 'story');
}

// Read poem aloud function - using a simpler approach since poems are shorter
function readPoemAloud() {
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
    const poemContentDiv = document.getElementById('poemContent');
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
    
    // Full poem text for narration - poems are usually short enough to read in one go
    const fullText = `${poemTitle}, ${poemAuthor}.\n\n${poemText}`;
    
    // Read the poem in one go
    readTextChunksSequentially([fullText], 'poem');
}

// Function to read a series of text chunks sequentially
function readTextChunksSequentially(textChunks, contentType) {
    if (!window.narrator || !window.narrator.enabled || textChunks.length === 0) return;
    
    // Show reading indicator
    const contentDiv = contentType === 'story' 
        ? document.getElementById('storyContent') 
        : document.getElementById('poemContent');
    
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

// Highlight vocabulary words in the text
function highlightVocabulary() {
    const vocabTerms = document.querySelectorAll('.highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the story content container
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}

// Highlight poem vocabulary words
function highlightPoemVocabulary() {
    const vocabTerms = document.querySelectorAll('#poemContent .highlight-vocab');
    
    vocabTerms.forEach(term => {
        term.classList.toggle('active-highlight');
    });
    
    // Show a message that vocabulary highlighting is toggled
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = 'feedback-message success show';
    feedbackMsg.textContent = 'Vocabulary highlighting toggled. Click on highlighted words to hear their definitions.';
    
    // Find the poem content container
    const poemContent = document.getElementById('poemContent');
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
    } else if (document.getElementById('poem').classList.contains('active')) {
        contentContainer = document.getElementById('poemContent');
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
