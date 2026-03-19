/**
 * Story content and functionality for The Necklace
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>SHE was one of those pretty, young ladies, born as if through an <span class="highlight-vocab">error<span class="vocab-tooltip">mistake</span></span> of destiny, into a family of clerks. She had no <span class="highlight-vocab">dowry<span class="vocab-tooltip">money or property brought by a bride to her husband</span></span>, no hopes, no means of becoming known, loved, and married by a man either rich or <span class="highlight-vocab">distinguished<span class="vocab-tooltip">important; respected</span></span>; and she allowed herself to marry a petty clerk in the office of the Board of Education. She was simple, but she was unhappy.</p>
    
    <div class="vocabulary-note">
        <div class="word">error</div>
        <div class="definition">mistake</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">dowry</div>
        <div class="definition">money or property brought by a bride to her husband</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">distinguished</div>
        <div class="definition">important; respected</div>
    </div>
    
    <p>She suffered <span class="highlight-vocab">incessantly<span class="vocab-tooltip">continuously</span></span>, feeling herself born for all <span class="highlight-vocab">delicacies<span class="vocab-tooltip">fine things; luxuries</span></span> and luxuries. She suffered from the poverty of her apartment, the shabby walls and the worn chairs. All these things tortured and angered her.</p>
    
    <div class="vocabulary-note">
        <div class="word">incessantly</div>
        <div class="definition">continuously</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">delicacies</div>
        <div class="definition">fine things; luxuries</div>
    </div>
    
    <p>When she seated herself for dinner opposite her husband who uncovered the <span class="highlight-vocab">tureen<span class="vocab-tooltip">covered dish from which soup is served at the table</span></span> with a delighted air, saying, "Oh! the good potpie! I know nothing better than that…," she would think of elegant dinners, of shining silver; she thought of the exquisite food served in marvellous dishes. She had neither frocks nor jewels, nothing. And she loved only those things.</p>
    
    <div class="vocabulary-note">
        <div class="word">tureen</div>
        <div class="definition">covered dish from which soup is served at the table</div>
    </div>
    
    <p>She had a rich friend, a schoolmate at the convent, who she did not like to visit — she suffered so much when she returned. She wept for whole days from despair and disappointment.</p>
    
    <p>One evening her husband returned <span class="highlight-vocab">elated<span class="vocab-tooltip">extremely happy and excited</span></span> bearing in his hand a large envelope.</p>
    
    <div class="vocabulary-note">
        <div class="word">elated</div>
        <div class="definition">extremely happy and excited</div>
    </div>
    
    <p>"Here," he said, "here is something for you."</p>
    
    <p>She quickly drew out a printed card on which were inscribed these words:</p>
    
    <div class="invitation">
        <p>T h e  M i n i s t e r  o f  P u b l i c  I n s t r u c t i o n</p>
        <p>a n d</p>
        <p>M a d a m e  G e o r g e  R a m p o n n e a u</p>
        <p>a s k  t h e  h o n o u r  o f  M .  a n d  M m e  L o i s e l ' s  c o m p a n y .  M o n d a y</p>
        <p>evening,  January  18,  at  the  Minister ' s  res idence .</p>
    </div>
    
    <p>Instead of being delighted, as her husband had hoped, she threw the invitation <span class="highlight-vocab">spitefully<span class="vocab-tooltip">with anger and hatred</span></span> upon the table murmuring, "What do you suppose I want with that?"</p>
    
    <div class="vocabulary-note">
        <div class="word">spitefully</div>
        <div class="definition">with anger and hatred</div>
    </div>
    
    <p>"But, my dearie, I thought it would make you happy. You never go out, and this is an occasion, and a fine one! Everybody wishes one, and it is very select; not many are given to employees. You will see the whole official world there."</p>
    
    <p>She looked at him with an irritated eye and declared impatiently, "What do you suppose I have to wear to such a thing as that?"</p>
    
    <p>He had not thought of that; he stammered, "Why, the dress you wear when we go to the theatre. It seems very pretty to me…" He was silent, stupefied, in dismay, at the sight of his wife weeping. He stammered, "What is the matter? What is the matter?"</p>
    
    <p>By a violent effort, she had controlled her <span class="highlight-vocab">vexation<span class="vocab-tooltip">state of being distressed</span></span> and responded in a calm voice, wiping her moist cheeks, "Nothing. Only I have no dress and consequently I cannot go to this affair. Give your card to some colleague whose wife is better fitted out than I."</p>
    
    <div class="vocabulary-note">
        <div class="word">vexation</div>
        <div class="definition">state of being distressed</div>
    </div>
    
    <p>He was grieved, but answered, "Let us see, Matilda. How much would a suitable costume cost, something that would serve for other occasions, something very simple?"</p>
    
    <p>She reflected for some seconds thinking of a sum that she could ask for without bringing with it an immediate refusal and a frightened exclamation from the <span class="highlight-vocab">economical<span class="vocab-tooltip">careful with money</span></span> clerk. Finally she said, in a hesitating voice, "I cannot tell exactly, but it seems to me that four hundred francs ought to cover it."</p>
    
    <div class="vocabulary-note">
        <div class="word">economical</div>
        <div class="definition">careful with money</div>
    </div>
    
    <p>He turned a little pale, for he had saved just this sum to buy a gun that he might be able to join some hunting parties the next summer, with some friends who went to shoot larks on Sunday. Nevertheless, he answered, "Very well. I will give you four hundred francs. But try to have a pretty dress."</p>
    
    <p>The day of the ball approached and Mme Loisel seemed sad, disturbed, anxious. Nevertheless, her dress was nearly ready. Her husband said to her one evening, "What is the matter with you? You have acted strangely for two or three days."</p>
    
    <p>And she responded, "I am vexed not to have a jewel, nothing to adorn myself with. I shall have such a poverty-stricken look. I would prefer not to go to this party."</p>
    
    <p>He replied, "You can wear some natural flowers. In this season they look very <span class="highlight-vocab">chic<span class="vocab-tooltip">elegant and fashionable</span></span>."</p>
    
    <div class="vocabulary-note">
        <div class="word">chic</div>
        <div class="definition">elegant and fashionable</div>
    </div>
    
    <p>She was not convinced. "No", she replied, "there is nothing more humiliating than to have a shabby air in the midst of rich women."</p>
    
    <p>Then her husband cried out, "How stupid we are! Go and find your friend Mme Forestier and ask her to lend you her jewels."</p>
    
    <p>She uttered a cry of joy. "It is true!" she said. "I had not thought of that."</p>
    
    <p>The next day she took herself to her friend's house and related her story of distress. Mme Forestier went to her closet, took out a large <span class="highlight-vocab">jewel-case<span class="vocab-tooltip">a box for keeping jewelry</span></span>, brought it, opened it, and said, "Choose, my dear."</p>
    
    <div class="vocabulary-note">
        <div class="word">jewel-case</div>
        <div class="definition">a box for keeping jewelry</div>
    </div>
    
    <p>She saw at first some bracelets, then a collar of pearls, then a Venetian cross of gold and jewels of admirable workmanship. She tried the jewels before the glass, hesitated, but could neither decide to take them nor leave them. Then she asked, "Have you nothing more?"</p>
    
    <p>"Why, yes. Look for yourself. I do not know what will please you."</p>
    
    <p>Suddenly she discovered, in a black satin box, a superb necklace of diamonds. Her hands trembled as she took it out. She placed it about her throat against her dress, and was <span class="highlight-vocab">ecstatic<span class="vocab-tooltip">filled with great joy</span></span>. Then she asked, in a hesitating voice, full of anxiety, "Could you lend me this? Only this?"</p>
    
    <div class="vocabulary-note">
        <div class="word">ecstatic</div>
        <div class="definition">filled with great joy</div>
    </div>
    
    <p>"Why, yes, certainly."</p>
    
    <p>She fell upon the neck of her friend, embraced her with passion, then went away with her treasure.</p>
    
    <p>The day of the ball arrived. Mme Loisel was a great success. She was the prettiest of all — elegant, gracious, smiling and full of joy. All the men noticed her, asked her name, and wanted to be presented.</p>
    
    <p>She danced with enthusiasm, <span class="highlight-vocab">intoxicated<span class="vocab-tooltip">extremely excited</span></span> with pleasure, thinking of nothing but all this admiration, this victory so complete and sweet to her heart.</p>
    
    <div class="vocabulary-note">
        <div class="word">intoxicated</div>
        <div class="definition">extremely excited</div>
    </div>
    
    <p>She went home towards four o'clock in the morning. Her husband had been half asleep in one of the little salons since midnight, with three other gentlemen whose wives were enjoying themselves very much.</p>
    
    <p>He threw around her shoulders the modest wraps they had carried whose poverty clashed with the elegance of the ball costume. She wished to hurry away in order not to be noticed by the other women who were wrapping themselves in rich furs.</p>
    
    <p>Loisel detained her, "Wait," said he. "I am going to call a cab."</p>
    
    <p>But she would not listen and descended the steps rapidly. When they were in the street, they found no carriage; and they began to seek for one, hailing the coachmen whom they saw at a distance.</p>
    
    <p>They walked along toward the river, hopeless and <span class="highlight-vocab">shivering<span class="vocab-tooltip">trembling from cold</span></span>. Finally they found one of those old carriages that one sees in Paris after nightfall.</p>
    
    <div class="vocabulary-note">
        <div class="word">shivering</div>
        <div class="definition">trembling from cold</div>
    </div>
    
    <p>It took them as far as their door and they went wearily up to their apartment. It was all over for her. And on his part, he remembered that he would have to be at the office by ten o'clock.</p>
    
    <p>She removed the wraps from her shoulders before the glass, for a final view of herself in her glory. Suddenly she uttered a cry. Her necklace was not around her neck.</p>
    
    <p>Loisel already half undressed, asked, "What is the matter?"</p>
    
    <p>She turned towards him excitedly. "I have — I have — I no longer have Mme Forestier's necklace."</p>
    
    <p>He arose in dismay, "What! How is that? It is not possible."</p>
    
    <p>And they looked in the folds of the dress, in the folds of the cloak, in the pockets, everywhere. They could not find it.</p>
    
    <p>He asked, "You are sure you still had it when we left the Minister's house?"</p>
    
    <p>"Yes, I felt it as we came out."</p>
    
    <p>"But if you had lost it in the street, we should have heard it fall. It must be in the cab."</p>
    
    <p>"Yes, it is possible. Did you take the number?"</p>
    
    <p>"No. And you, did you notice what it was?"</p>
    
    <p>"No."</p>
    
    <p>They looked at each other utterly <span class="highlight-vocab">cast down<span class="vocab-tooltip">completely discouraged and depressed</span></span>. Finally Loisel dressed himself again.</p>
    
    <div class="vocabulary-note">
        <div class="word">cast down</div>
        <div class="definition">completely discouraged and depressed</div>
    </div>
    
    <p>"I am going," he said, "over the track where we went on foot, to see if I can find it."</p>
    
    <p>And he went. She remained in her evening gown, not having the force to go to bed.</p>
    
    <p>Toward seven o'clock her husband returned. He had found nothing.</p>
    
    <p>He went to the police and to the cab offices, and put an advertisement in the newspapers, offering a reward.</p>
    
    <p>She waited all day in a state of <span class="highlight-vocab">bewilderment<span class="vocab-tooltip">confusion</span></span> before this frightful disaster. Loisel returned in the evening, his face pale; he had discovered nothing.</p>
    
    <div class="vocabulary-note">
        <div class="word">bewilderment</div>
        <div class="definition">confusion</div>
    </div>
    
    <p>He said, "Write to your friend that you have broken the clasp of the necklace and that you will have it repaired. That will give us time."</p>
    
    <p>She wrote as he dictated.</p>
    
    <p>At the end of a week, they had lost all hope. And Loisel, older by five years, declared, "We must replace this jewel."</p>
    
    <p>In a shop of the <span class="highlight-vocab">Palais-Royal<span class="vocab-tooltip">a shopping area in Paris</span></span>, they found a <span class="highlight-vocab">chaplet<span class="vocab-tooltip">a string of beads; here, a diamond necklace</span></span> of diamonds, which seemed to them exactly like the one they had lost. It was valued at forty thousand francs. They could get it for thirty-six thousand.</p>
    
    <div class="vocabulary-note">
        <div class="word">Palais-Royal</div>
        <div class="definition">a shopping area in Paris</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">chaplet</div>
        <div class="definition">a string of beads; here, a diamond necklace</div>
    </div>
    
    <p>Loisel possessed eighteen thousand francs, which his father had left him. He borrowed the rest. He made <span class="highlight-vocab">ruinous<span class="vocab-tooltip">disastrous</span></span> promises, took money from <span class="highlight-vocab">usurers<span class="vocab-tooltip">money-lenders, especially those who lend money on a high rate of interest</span></span> and the whole race of lenders. Then he went to get the new necklace, depositing on the merchant's counter thirty-six thousand francs.</p>
    
    <div class="vocabulary-note">
        <div class="word">ruinous</div>
        <div class="definition">disastrous</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">usurers</div>
        <div class="definition">money-lenders, especially those who lend money on a high rate of interest</div>
    </div>
    
    <p>When Mme Loisel took back the jewels to Mme Forestier, the latter said to her in a <span class="highlight-vocab">frigid<span class="vocab-tooltip">very cold</span></span> tone, "You should have returned them to me sooner, for I might have needed them."</p>
    
    <div class="vocabulary-note">
        <div class="word">frigid</div>
        <div class="definition">very cold</div>
    </div>
    
    <p>Mme Forestier did not open the jewel-box as Mme Loisel feared she would. What would she think if she should perceive the substitution? Would she take her for a robber?</p>
    
    <p>Mme Loisel now knew the horrible life of necessity. She did her part, however, completely, heroically. It was necessary to pay this frightful debt. She would pay it. They sent away the maid, they changed their lodgings; they rented some rooms in an attic.</p>
    
    <p>She learned the <span class="highlight-vocab">odious<span class="vocab-tooltip">extremely unpleasant; disgusting</span></span> work of a kitchen. She washed the dishes. She washed the soiled linen, their clothes and dishcloths, which she hung on the line to dry; she took down the refuse to the street each morning and brought up the water, stopping at each landing to catch her breath. And, clothed like a woman of the people, she went to the grocer's, the butcher's and the fruiterer's, with her basket on her arm, shopping, <span class="highlight-vocab">haggling<span class="vocab-tooltip">arguing about the price</span></span> to the last <span class="highlight-vocab">sou<span class="vocab-tooltip">a former French coin of low value</span></span> of her miserable money.</p>
    
    <div class="vocabulary-note">
        <div class="word">odious</div>
        <div class="definition">extremely unpleasant; disgusting</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">haggling</div>
        <div class="definition">arguing about the price</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">sou</div>
        <div class="definition">a former French coin of low value</div>
    </div>
    
    <p>The husband worked evenings, putting the books of some merchants in order, and nights he often did copying at five sous a page. And this life lasted for ten years. At the end of ten years, they had restored all.</p>
    
    <p>Mme Loisel seemed old now. She had become a strong, hard woman, the crude woman of the poor household. Her hair badly dressed, her skirts <span class="highlight-vocab">awry<span class="vocab-tooltip">not in the correct position or shape; twisted</span></span>, her hands red, she spoke in a loud tone, and washed the floors with large pails of water. But sometimes, when her husband was at the office, she would seat herself before the window and think of that evening party of former times, of that ball where she was so beautiful and so flattered.</p>
    
    <div class="vocabulary-note">
        <div class="word">awry</div>
        <div class="definition">not in the correct position or shape; twisted</div>
    </div>
    
    <p>How would it have been if she had not lost the necklace? Who knows? How singular is life, and how full of changes! How small a thing will ruin or save one!</p>
    
    <p>One Sunday as she was taking a walk in the <span class="highlight-vocab">Champs-Elysees<span class="vocab-tooltip">a famous avenue in Paris</span></span> to rid herself of the cares of the week, she suddenly perceived a woman walking with a child. It was Mme Forestier, still young, still pretty, still attractive. Mme Loisel was affected. Should she speak to her? Yes, certainly. And now that she had paid, she would tell her all. Why not?</p>
    
    <div class="vocabulary-note">
        <div class="word">Champs-Elysees</div>
        <div class="definition">a famous avenue in Paris</div>
    </div>
    
    <p>She approached her. "Good morning, Jeanne."</p>
    
    <p>Her friend did not recognise her and was astonished to be so familiarly addressed by this common personage. She stammered, "But, Madame — I do not know — you must be mistaken—"</p>
    
    <p>"No, I am Matilda Loisel."</p>
    
    <p>Her friend uttered a cry of astonishment, "Oh! my poor Matilda! How you have changed!"</p>
    
    <p>"Yes, I have had some hard days since I saw you; and some miserable ones — and all because of you ..."</p>
    
    <p>"Because of me? How is that?"</p>
    
    <p>"You recall the diamond necklace that you loaned me to wear to the Minister's ball?"</p>
    
    <p>"Yes, very well."</p>
    
    <p>"Well, I lost it."</p>
    
    <p>"How is that, since you returned it to me?"</p>
    
    <p>"I returned another to you exactly like it. And it has taken us ten years to pay for it. You can understand that it was not easy for us who have nothing. But it is finished and I am decently content."</p>
    
    <p>Mme Forestier stopped short. She said, "You say that you bought a diamond necklace to replace mine?"</p>
    
    <p>"Yes. You did not perceive it then? They were just alike."</p>
    
    <p>And she smiled with proud and simple joy. Mme Forestier was touched and took both her hands as she replied, "Oh! My poor Matilda! Mine were false. They were not worth over five hundred francs!"</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What kind of a person is Mme Loisel?</div>
        <div class="comprehension-question">2. What kind of a person is her husband?</div>
        <div class="comprehension-question">3. What were Matilda's feelings about the invitation?</div>
        <div class="comprehension-question">4. What was the cause of Matilda's ruin?</div>
    </div>
`;

// Load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load story content
    const storyContentDiv = document.getElementById('storyContent');
    if (storyContentDiv) {
        storyContentDiv.innerHTML = storyContent;
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
});

// Toggle Read Aloud function for any text
function toggleReadAloud() {
    // If we're in the story module, read the story
    if (document.getElementById('story').classList.contains('active')) {
        readStoryAloud();
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
    let currentChunk = "The Necklace, by Guy de Maupassant. ";
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

// Function to read a series of text chunks sequentially
function readTextChunksSequentially(textChunks, contentType) {
    if (!window.narrator || !window.narrator.enabled || textChunks.length === 0) return;
    
    // Show reading indicator
    const contentDiv = contentType === 'story' 
        ? document.getElementById('storyContent') 
        : null;
    
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
