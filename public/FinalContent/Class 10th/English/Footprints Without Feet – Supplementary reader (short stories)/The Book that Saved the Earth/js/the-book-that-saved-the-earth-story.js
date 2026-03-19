/**
 * Play content and functionality for The Book That Saved the Earth
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Play content data - Part 1 (Characters and Scene 1)
const playContentPart1 = `
    <div class="play-scene">
        <h3 class="play-scene-title">Characters</h3>
        <p><span class="character-name">HISTORIAN</span> <span class="character-name">LIEUTENANT IOTA</span></p>
        <p><span class="character-name">GREAT AND MIGHTY THINK-TANK</span> <span class="character-name">SERGEANT OOP</span></p>
        <p><span class="character-name">APPRENTICE NOODLE</span> <span class="character-name">OFFSTAGE VOICE</span></p>
        <p><span class="character-name">CAPTAIN OMEGA</span></p>
    </div>

    <div class="play-scene">
        <h3 class="play-scene-title">SCENE 1</h3>
        <p><strong>READ AND FIND OUT</strong></p>
        <ul>
            <li>Why was the twentieth century called the 'Era of the Book'?</li>
            <li>Who tried to invade the earth in the twenty-first century?</li>
        </ul>
        
        <p><strong>TIME:</strong> The twenty-fifth century</p>
        <p><strong>PLACE:</strong> The Museum of Ancient History: Department of the Twentieth Century on the Planet Earth</p>
        
        <div class="stage-direction">BEFORE RISE: Spotlight shines on Historian, who is sitting at a table down right, on which is a movie projector. A sign on an easel beside her reads: Museum of Ancient History: Department of the Twentieth Century. She stands and bows to audience.</div>
        
        <p><span class="character-name">HISTORIAN:</span> Good afternoon. Welcome to our Museum of Ancient History, and to my department — curiosities of the good old, far-off twentieth century. The twentieth century was often called the Era of the Book. In those days, there were books about everything, from ant eaters to <span class="highlight-vocab">Zulus<span class="vocab-tooltip">an African ethnic group belonging to South Africa</span></span>. Books taught people how to, and when to, and where to, and why to. They illustrated, educated, punctuated, and even decorated. But the strangest thing a book ever did was to save the Earth.</p>
        
        <div class="vocabulary-note">
            <div class="word">Zulus</div>
            <div class="definition">an African ethnic group belonging to South Africa</div>
        </div>
        
        <p>You haven't heard about the Martian invasion of 2040? Tsk, tsk. What do they teach children nowadays? Well, you know, the invasion never really happened, because a single book stopped it. What was the book, you ask? A noble encyclopedia? A tome about rockets and missiles? A secret file from outer space? No, it was none of those. It was — but here, let me turn on the historiscope and show you what happened many centuries ago, in 2040.</p>
        
        <div class="stage-direction">(She turns on projector, and points it left. Spotlight on Historian goes out, and comes up down left on Think-Tank, who is seated on a raised box, arms folded. He has a huge, egg-shaped head, and he wears a long robe decorated with stars and circles. Apprentice Noodle stands beside him at an elaborate switchboard. A sign on an easel reads: MARS SPACE CONTROL - GREAT AND MIGHTY THINK-TANK, COMMANDER-IN-CHIEF (Bow low before entering))</div>
        
        <p><span class="character-name">NOODLE:</span> <span class="stage-direction">(bowing)</span> O Great and Mighty Think-Tank, most powerful and intelligent creature in the whole universe, what are your orders?</p>
        
        <p><span class="character-name">THINK-TANK:</span> <span class="stage-direction">(peevishly)</span> You left out part of my salutation, <span class="highlight-vocab">Apprentice<span class="vocab-tooltip">learner of a trade who has agreed to work for a certain period of time in return for being taught</span></span> Noodle. Go over the whole thing again.</p>
        
        <div class="vocabulary-note">
            <div class="word">Apprentice</div>
            <div class="definition">learner of a trade who has agreed to work for a certain period of time in return for being taught</div>
        </div>
        
        <p><span class="character-name">NOODLE:</span> It shall be done, sir. <span class="stage-direction">(in a singsong)</span> O Great and Mighty Think-Tank, Ruler of Mars and her two moons, most powerful and intelligent creature in the whole universe — <span class="stage-direction">(out of breath)</span> what-are-your-orders?</p>
        
        <p><span class="character-name">THINK-TANK:</span> That's better, Noodle. I wish to be placed in communication with our manned space probe to that ridiculous little planet we are going to put under our generous rulership. What do they call it, again?</p>
        
        <p><span class="character-name">NOODLE:</span> Earth, your Intelligence.</p>
        
        <p><span class="character-name">THINK-TANK:</span> Earth — of course. You see how insignificant the place is? But first, something important. My mirror. I wish to consult my mirror.</p>
        
        <p><span class="character-name">NOODLE:</span> It shall be done, sir. <span class="stage-direction">(He hands Think-Tank a mirror.)</span></p>
        
        <p><span class="character-name">THINK-TANK:</span> Mirror, mirror, in my hand. Who is the most fantastically intellectually gifted being in the land?</p>
        
        <p><span class="character-name">OFFSTAGE VOICE:</span> <span class="stage-direction">(after a pause)</span> You, sir.</p>
        
        <p><span class="character-name">THINK-TANK:</span> <span class="stage-direction">(smacking mirror)</span> Quicker. Answer quicker next time. I hate a slow mirror. <span class="stage-direction">(He admires himself in the mirror.)</span> Ah, there I am. Are we Martians not a handsome race? So much more attractive than those ugly Earthlings with their tiny heads. Noodle, you keep on exercising your mind, and someday you'll have a balloon brain just like mine.</p>
        
        <p><span class="character-name">NOODLE:</span> Oh, I hope so, Mighty Think-Tank. I hope so.</p>
        
        <p><span class="character-name">THINK-TANK:</span> Now, contact the space probe. I want to invade that primitive ball of mud called Earth before lunch.</p>
        
        <p><span class="character-name">NOODLE:</span> It shall be done, sir. <span class="stage-direction">(He adjusts levers on switchboard. Electronic buzzes and beeps are heard as the curtains open.)</span></p>
    </div>
`;

// Play content data - Part 2 (Scene 2 - First part)
const playContentPart2 = `
    <div class="play-scene">
        <h3 class="play-scene-title">SCENE 2</h3>
        <p><strong>READ AND FIND OUT</strong></p>
        <ul>
            <li>What guesses are made by Think–Tank about the books found on earth?</li>
        </ul>
        
        <p><strong>TIME:</strong> A few seconds later</p>
        <p><strong>PLACE:</strong> Mars Space Control and the Centerville Public Library</p>
        
        <div class="stage-direction">AT RISE: Captain Omega stands at centre, opening and closing card catalogue drawers in a confused fashion. Lieutenant Iota is up left, counting books in a bookcase. Sergeant Oop is at right, opening and closing a book, turning it upside down, shaking it and then <span class="highlight-vocab">riffling<span class="vocab-tooltip">quickly turning over the pages of a book</span></span> the pages and shaking his head.</div>
        
        <div class="vocabulary-note">
            <div class="word">riffling</div>
            <div class="definition">quickly turning over the pages of a book</div>
        </div>
        
        <p><span class="character-name">NOODLE:</span> <span class="stage-direction">(adjusting knobs)</span> I have a close sighting of the space crew, sir.</p>
        
        <div class="stage-direction">(Think-Tank puts on a pair of enormous goggles and turns towards the stage to watch.) They seem to have entered some sort of Earth structure.</div>
        
        <p><span class="character-name">THINK-TANK:</span> Excellent. Make voice contact.</p>
        
        <p><span class="character-name">NOODLE:</span> <span class="stage-direction">(speaking into a microphone)</span> Mars Space Control calling the crew of Probe One. Mars Space Control calling the crew of Probe One. Come in, Captain Omega, and give us your location.</p>
        
        <p><span class="character-name">OMEGA:</span> <span class="stage-direction">(speaking into a disk which is on a chain around her neck)</span> Captain Omega to Mars Space Control. Lieutenant Iota, Sergeant Oop, and I have arrived on Earth without incident. We have taken shelter in this <span class="stage-direction">(indicates room)</span> — this square place. Have you any idea where we are, Lieutenant Iota?</p>
        
        <p><span class="character-name">IOTA:</span> I can't figure it out, Captain. <span class="stage-direction">(holding up a book)</span> I've counted two thousand of these peculiar items. This place must be some sort of storage <span class="highlight-vocab">barn<span class="vocab-tooltip">covered building for storing hay</span></span>. What do you think, Sergeant Oop?</p>
        
        <div class="vocabulary-note">
            <div class="word">barn</div>
            <div class="definition">covered building for storing hay</div>
        </div>
        
        <p><span class="character-name">OOP:</span> I haven't a clue. I've been to seven galaxies, but I've never seen anything like this. Maybe they're hats. <span class="stage-direction">(He opens a book and puts it on his head.)</span> Say, maybe this is a <span class="highlight-vocab">haberdashery<span class="vocab-tooltip">shop which sells clothing, small articles of dress, pins, cotton, etc.</span></span>!</p>
        
        <div class="vocabulary-note">
            <div class="word">haberdashery</div>
            <div class="definition">shop which sells clothing, small articles of dress, pins, cotton, etc.</div>
        </div>
        
        <p><span class="character-name">OMEGA:</span> <span class="stage-direction">(bowing low)</span> Perhaps the Great and Mighty Think-Tank will give us the benefit of his thought on the matter.</p>
        
        <p><span class="character-name">THINK-TANK:</span> Elementary, my dear Omega. Hold one of the items up so that I may view it closely. <span class="stage-direction">(Omega holds a book on the palm of her hand.)</span> Yes, yes, I understand now. Since Earth creatures are always eating, the place in which you find yourselves is undoubtedly a crude refreshment stand.</p>
        
        <p><span class="character-name">OMEGA:</span> <span class="stage-direction">(to Iota and Oop)</span> He says we're in a refreshment stand.</p>
        
        <p><span class="character-name">OOP:</span> Well, the Earthlings certainly have a strange diet.</p>
        
        <p><span class="character-name">THINK-TANK:</span> That item in your hand is called a sandwich.</p>
        
        <p><span class="character-name">OMEGA:</span> <span class="stage-direction">(nodding)</span> A sandwich.</p>
        
        <p><span class="character-name">IOTA:</span> <span class="stage-direction">(nodding)</span> A sandwich.</p>
        
        <p><span class="character-name">OOP:</span> <span class="stage-direction">(taking book from his head)</span> A sandwich?</p>
        
        <p><span class="character-name">THINK-TANK:</span> Sandwiches are the main staple of Earth diet. Look at it closely. <span class="stage-direction">(Omega squints at book.)</span> There are two slices of what is called bread, and between them is some sort of filling.</p>
        
        <p><span class="character-name">OMEGA:</span> That is correct, sir.</p>
        
        <p><span class="character-name">THINK-TANK:</span> To confirm my opinion, I order you to eat it.</p>
        
        <p><span class="character-name">OMEGA:</span> <span class="stage-direction">(gulping)</span> Eat it?</p>
        
        <p><span class="character-name">THINK-TANK:</span> Do you doubt the Mighty Think-Tank?</p>
        
        <p><span class="character-name">OMEGA:</span> Oh, no, no. But poor Lieutenant Iota has not had her breakfast. Lieutenant Iota, I order you to eat this — this sandwich.</p>
        
        <p><span class="character-name">IOTA:</span> <span class="stage-direction">(dubiously)</span> Eat it? Oh, Captain! It's a very great honour to be the first Martian to eat a sandwich, I'm sure, but — but how can I be so impolite as to eat before my Sergeant? <span class="stage-direction">(handing Oop the book and saying brightly)</span> Sergeant Oop, I order you to eat the sandwich immediately.</p>
        
        <p><span class="character-name">OOP:</span> <span class="stage-direction">(making a face)</span> Who, Lieutenant? Me, Lieutenant?</p>
        
        <p><span class="character-name">IOTA and OMEGA:</span> <span class="stage-direction">(saluting)</span> For the glory of Mars, Oop!</p>
        
        <p><span class="character-name">OOP:</span> Yes, of course! <span class="stage-direction">(unhappily)</span> Immediately. <span class="stage-direction">(He opens his mouth wide. Omega and Iota watch him breathlessly. He bites down on a corner of the book, and pantomimes chewing and swallowing, while making terrible faces.)</span></p>
        
        <p><span class="character-name">OMEGA:</span> Well, Oop?</p>
        
        <p><span class="character-name">IOTA:</span> Well, Oop? <span class="stage-direction">(Oop coughs. Omega and Iota pound him on the back.)</span></p>
        
        <p><span class="character-name">THINK-TANK:</span> Was it not delicious, Sergeant Oop?</p>
        
        <p><span class="character-name">OOP:</span> <span class="stage-direction">(saluting)</span> That is correct, sir. It was not delicious. I don't know how the Earthlings can get those sandwiches down without water. They're dry as Martian dust.</p>
    </div>
`;

// Play content data - Part 3 (Scene 2 - Second part with nursery rhymes)
const playContentPart3 = `
    <div class="play-scene">
        <p><span class="character-name">NOODLE:</span> Sir, sir. Great and Mighty Think-Tank. I beg your pardon, but an insignificant bit of data floated into my mind about those sandwiches.</p>
        
        <p><span class="character-name">THINK-TANK:</span> It can't be worth much, but go ahead. Give us your trifling bit of data.</p>
        
        <p><span class="character-name">NOODLE:</span> Well, sir, I have seen surveyor films of those sandwiches. I noticed that the Earthlings did not eat them. They used them as some sort of communication device.</p>
        
        <p><span class="character-name">THINK-TANK:</span> <span class="stage-direction">(haughtily)</span> Naturally. That was my next point. These are actually communication sandwiches. Think-Tank is never wrong. Who is never wrong?</p>
        
        <p><span class="character-name">ALL:</span> <span class="stage-direction">(saluting)</span> Great and Mighty Think-Tank is never wrong.</p>
        
        <p><span class="character-name">THINK-TANK:</span> Therefore, I order you to listen to them.</p>
        
        <p><span class="character-name">OMEGA:</span> Listen to them?</p>
        
        <p><span class="character-name">IOTA AND OOP:</span> <span class="stage-direction">(to each other, puzzled)</span> Listen to them?</p>
        
        <p><span class="character-name">THINK-TANK:</span> Do you have marbles in your ears? I said, listen to them. <span class="stage-direction">(Martians bow very low.)</span></p>
        
        <p><span class="character-name">OMEGA:</span> It shall be done, sir. <span class="stage-direction">(They each take two books from the case, and hold them to their ears, listening intently.)</span></p>
        
        <p><span class="character-name">IOTA:</span> <span class="stage-direction">(whispering to Omega)</span> Do you hear anything?</p>
        
        <p><span class="character-name">OMEGA:</span> <span class="stage-direction">(whispering back)</span> Nothing. Do you hear anything, Oop?</p>
        
        <p><span class="character-name">OOP:</span> <span class="stage-direction">(loudly)</span> Not a thing! <span class="stage-direction">(Omega and Iota jump in fright.)</span></p>
        
        <p><span class="character-name">OMEGA AND IOTA:</span> Sh-h-h! <span class="stage-direction">(They listen intently again.)</span></p>
        
        <p><span class="character-name">THINK-TANK:</span> Well? Well? Report to me. What do you hear?</p>
        
        <p><span class="character-name">OMEGA:</span> Nothing, sir. Perhaps we are not on the correct frequency.</p>
        
        <p><span class="character-name">IOTA:</span> Nothing, sir. Perhaps the Earthlings have sharper ears than we do.</p>
        
        <p><span class="character-name">OOP:</span> I don't hear a thing. Maybe these sandwiches don't make sounds.</p>
        
        <p><span class="character-name">THINK-TANK:</span> What? Does somebody suggest the Mighty Think-Tank has made a mistake?</p>
        
        <p><span class="character-name">OMEGA:</span> Oh, no, sir; no, sir. We'll keep listening.</p>
        
        <p><span class="character-name">NOODLE:</span> Please excuse me, your Brilliance, but a cloudy piece of information is twirling around in my head.</p>
        
        <p><span class="character-name">THINK-TANK:</span> Well, twirl it out, Noodle, and I will clarify it for you.</p>
        
        <p><span class="character-name">NOODLE:</span> I seem to recall that the Earthlings did not listen to the sandwiches; they opened them and watched them.</p>
        
        <p><span class="character-name">THINK-TANK:</span> Yes, that is quite correct, I will clarify that for you, Captain Omega. Those sandwiches are not for ear communication, they are for eye communication. Now, Captain Omega, take that large, colourful sandwich over there. It appears to be important. Tell me what you observe.</p>
        
        <div class="stage-direction">(Omega picks up a very large volume of Mother Goose, holding it so that the audience can see the title. Iota looks over her left shoulder, and Oop peers over her right shoulder.)</div>
        
        <p><span class="character-name">OMEGA:</span> It appears to contain pictures of Earthlings.</p>
        
        <p><span class="character-name">IOTA:</span> There seems to be some sort of code.</p>
        
        <p><span class="character-name">THINK-TANK:</span> <span class="stage-direction">(sharply interested)</span> Code? I told you this was important. Describe the code.</p>
        
        <p><span class="character-name">OOP:</span> It's little lines and <span class="highlight-vocab">squiggles<span class="vocab-tooltip">scrawls; illegible writing or markings</span></span> and dots — thousands of them alongside the pictures.</p>
        
        <div class="vocabulary-note">
            <div class="word">squiggles</div>
            <div class="definition">scrawls; illegible writing or markings</div>
        </div>
        
        <p><span class="character-name">THINK-TANK:</span> Perhaps the Earthlings are not as primitive as we have thought. We must break the code.</p>
        
        <p><span class="character-name">NOODLE:</span> Forgive me, your Cleverness, but did not the chemical department give our space people vitamins to increase their intelligence?</p>
        
        <p><span class="character-name">THINK-TANK:</span> Stop! A thought of magnificent brilliance has come to me. Space people, our chemical department has given you vitamins to increase your intelligence. Take them immediately and then watch the sandwich. The meaning of the code will slowly unfold before you.</p>
        
        <p><span class="character-name">OMEGA:</span> It shall be done, sir. Remove vitamins. <span class="stage-direction">(Crew takes vitamins from boxes on their belts.)</span> Present vitamins. <span class="stage-direction">(They hold vitamins out in front of them, stiffly.)</span> Swallow vitamins. <span class="stage-direction">(They pop the vitamins into their mouths and gulp simultaneously. They open their eyes wide, their heads shake, and they put their hands to their foreheads.)</span></p>
        
        <p><span class="character-name">THINK-TANK:</span> Excellent. Now, <span class="highlight-vocab">decipher<span class="vocab-tooltip">find the meaning of something which is puzzling or difficult to understand</span></span> that code.</p>
        
        <div class="vocabulary-note">
            <div class="word">decipher</div>
            <div class="definition">find the meaning of something which is puzzling or difficult to understand</div>
        </div>
        
        <p><span class="character-name">ALL:</span> It shall be done, sir. <span class="stage-direction">(They frown over the book, turning pages.)</span></p>
        
        <p><span class="character-name">OMEGA:</span> <span class="stage-direction">(brightly)</span> Aha!</p>
        
        <p><span class="character-name">IOTA:</span> <span class="stage-direction">(brightly)</span> Oho!</p>
        
        <p><span class="character-name">OOP:</span> <span class="stage-direction">(bursting into laughter)</span> Ha, ha, ha.</p>
        
        <p><span class="character-name">THINK-TANK:</span> What does it say? Tell me this instant. <span class="highlight-vocab">Transcribe<span class="vocab-tooltip">write in full form from short-hand</span></span>, Omega.</p>
        
        <div class="vocabulary-note">
            <div class="word">Transcribe</div>
            <div class="definition">write in full form from short-hand</div>
        </div>
        
        <p><span class="character-name">OMEGA:</span> Yes, sir. <span class="stage-direction">(She reads with great seriousness.)</span></p>
        
        <div class="play-text">
            <p>Mistress Mary, quite contrary,<br>
            How does your garden grow?<br>
            With cockle shells and silver bells<br>
            And pretty maids all in a row.</p>
        </div>
        
        <p><span class="character-name">OOP:</span> Ha, ha, ha. Imagine that. Pretty maids growing in a garden.</p>
        
        <p><span class="character-name">THINK-TANK:</span> <span class="stage-direction">(alarmed)</span> Stop! This is no time for <span class="highlight-vocab">levity<span class="vocab-tooltip">tendency to treat serious matters without respect; lack of seriousness</span></span>. Don't you realise the seriousness of this discovery? The Earthlings have discovered how to combine agriculture and mining. They can actually grow crops of rare metals such as silver. And cockle shells. They can grow high explosives, too. Noodle, contact our invasion fleet.</p>
        
        <div class="vocabulary-note">
            <div class="word">levity</div>
            <div class="definition">tendency to treat serious matters without respect; lack of seriousness</div>
        </div>
        
        <p><span class="character-name">NOODLE:</span> They are ready to go down and take over Earth, sir.</p>
        
        <p><span class="character-name">THINK-TANK:</span> Tell them to hold. Tell them new information has come to us about Earth. Iota, transcribe.</p>
        
        <p><span class="character-name">IOTA:</span> Yes, sir. <span class="stage-direction">(She reads very gravely.)</span></p>
        
        <div class="play-text">
            <p>Hey diddle diddle! The cat and the fiddle,<br>
            The cow jumped over the moon,<br>
            The little dog laughed to see such sport,<br>
            And the dish ran away with the spoon.</p>
        </div>
        
        <p><span class="character-name">OOP:</span> <span class="stage-direction">(laughing)</span> The dish ran away with the spoon!</p>
        
        <p><span class="character-name">THINK-TANK:</span> Cease laughter. Desist. This is more and more alarming. The Earthlings have reached a high level of civilisation. Didn't you hear? They have taught their domesticated animals musical culture and space techniques. Even their dogs have a sense of humour. Why, at this very moment, they may be launching an interplanetary attack of millions of cows! Notify the invasion fleet. No invasion today Oop, transcribe the next code.</p>
        
        <p><span class="character-name">OOP:</span> Yes, sir. <span class="stage-direction">(reading)</span></p>
        
        <div class="play-text">
            <p>Humpty Dumpty sat on the wall,<br>
            Humpty Dumpty had a great fall;<br>
            All the King's horses and all the King's men,<br>
            Cannot put Humpty Dumpty together again.</p>
        </div>
        
        <p>Oh, look, sir. Here's a picture of Humpty Dumpty. Why, sir, he looks like — he looks like — <span class="stage-direction">(turns large picture of Humpty Dumpty towards Think-Tank and the audience)</span></p>
        
        <p><span class="character-name">THINK-TANK:</span> <span class="stage-direction">(screaming and holding his head)</span> It's me! It's my Great and Mighty Balloon Brain. The Earthlings have seen me, and they're after me. "Had a great fall!" — That means they plan to capture Mars Central Control and me! It's an invasion of Mars! Noodle, prepare a space capsule for me. I must escape without delay. Space people, you must leave Earth at once, but be sure to remove all traces of your visit. The Earthlings must not know that I know. <span class="stage-direction">(Omega, Iota, and Oop rush about, putting books back on shelves.)</span></p>
        
        <p><span class="character-name">NOODLE:</span> Where shall we go, sir?</p>
        
        <p><span class="character-name">THINK-TANK:</span> A hundred million miles away from Mars. Order the invasion fleet to evacuate the entire planet of Mars. We are heading for Alpha Centauri, a hundred million miles away. <span class="stage-direction">(Omega, Iota, and Oop run off right as Noodle helps Think-Tank off left and the curtain closes. Spotlight shines on Historian down right.)</span></p>
    </div>
`;

// Play content data - Part 4 (Conclusion)
const playContentPart4 = `
    <div class="play-scene">
        <p><span class="character-name">HISTORIAN:</span> <span class="stage-direction">(chuckling)</span> And that's how one dusty old book of nursery rhymes saved the world from a Martian invasion. As you all know, in the twenty-fifth century, five hundred years after all this happened, we Earthlings resumed contact with Mars, and we even became very friendly with the Martians. By that time, Great and Mighty Think-Tank had been replaced by a very clever Martian — the wise and wonderful Noodle! Oh, yes, we taught the Martians the difference between sandwiches and books. We taught them how to read, too, and we established a model library in their capital city of Marsopolis. But as you might expect, there is still one book that the Martians can never bring themselves to read. You've guessed it — Mother Goose! <span class="stage-direction">(She bows and exits right.)</span></p>
        
        <div class="stage-direction">CURTAIN</div>
        
        <p style="text-align: center; margin-top: 30px; font-style: italic;">CLAIRE BOIKO</p>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What was the twentieth century called and why?</div>
        <div class="comprehension-question">2. Who tried to invade Earth in the twenty-first century?</div>
        <div class="comprehension-question">3. What did the Martians think books were at first?</div>
        <div class="comprehension-question">4. How did the nursery rhymes save Earth from invasion?</div>
    </div>
`;

// Combine all play content
const playContent = playContentPart1 + playContentPart2 + playContentPart3 + playContentPart4;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load play content
    const playContentDiv = document.getElementById('playContent');
    if (playContentDiv) {
        playContentDiv.innerHTML = playContent;
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
    
    // Add read aloud button for play
    const playBtn = document.createElement('button');
    playBtn.className = 'interactive-btn read-part-btn';
    playBtn.innerHTML = '🔊 Read Play Aloud';
    playBtn.setAttribute('aria-label', 'Read play aloud');
    playBtn.onclick = function() { readPlayAloud(); };
    
    // Add button container to play content if it doesn't exist
    if (playContentDiv) {
        let buttonContainer = playContentDiv.querySelector('.button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            playContentDiv.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(playBtn);
    }
});

// Toggle Read Aloud function for any text
function toggleReadAloud() {
    // If we're in the play module, read the play
    if (document.getElementById('play').classList.contains('active')) {
        readPlayAloud();
    }
}

// Read play aloud function - using chunks for better performance
function readPlayAloud() {
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
    
    // Extract plain text from the play content
    const playContentDiv = document.getElementById('playContent');
    if (!playContentDiv) return;
    
    // Get all paragraphs and remove vocabulary notes and comprehension checks
    const paragraphs = playContentDiv.querySelectorAll('p');
    
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
    let currentChunk = "The Book That Saved the Earth, by Claire Boiko. ";
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
    readTextChunksSequentially(textChunks, 'play');
}

// Function to read a series of text chunks sequentially
function readTextChunksSequentially(textChunks, contentType) {
    if (!window.narrator || !window.narrator.enabled || textChunks.length === 0) return;
    
    // Show reading indicator
    const contentDiv = document.getElementById('playContent');
    
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
    
    // Find the play content container
    const playContent = document.getElementById('playContent');
    if (playContent) {
        playContent.appendChild(feedbackMsg);
        
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
    let contentContainer = document.getElementById('playContent');
    
    if (contentContainer) {
        contentContainer.appendChild(feedbackMsg);
        
        // Remove the message after a few seconds
        setTimeout(() => {
            feedbackMsg.classList.remove('show');
            setTimeout(() => feedbackMsg.remove(), 500);
        }, 3000);
    }
}
