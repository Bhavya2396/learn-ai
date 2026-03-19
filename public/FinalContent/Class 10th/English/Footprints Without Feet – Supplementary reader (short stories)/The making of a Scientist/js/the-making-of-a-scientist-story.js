/**
 * Story content and functionality for The Making of a Scientist
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data
const storyContent = `
    <p>AT the age of twenty-two, a former 'scout of the year' excited the scientific world with a new theory on how cells work. Richard H. Ebright and his college room-mate explained the theory in an article in the <span class="highlight-vocab">Proceedings<span class="vocab-tooltip">a published account of an academic meeting</span></span> of the National Academy of Science.</p>
    
    <div class="vocabulary-note">
        <div class="word">proceedings</div>
        <div class="definition">a published account of an academic meeting</div>
    </div>
    
    <p>It was the first time this important scientific journal had ever published the work of college students. In sports, that would be like making the big <span class="highlight-vocab">leagues<span class="vocab-tooltip">groups of sports clubs or teams playing matches among themselves</span></span> at the age of fifteen and hitting a home run your first time at bat*. For Richard Ebright, it was the first in a long string of achievements in science and other fields. And it all started with butterflies.</p>
    
    <div class="vocabulary-note">
        <div class="word">leagues</div>
        <div class="definition">groups of sports clubs or teams playing matches among themselves</div>
    </div>
    
    <p>An only child, Ebright grew up north of Reading, Pennsylvania. "There wasn't much I could do there," he said. "I certainly couldn't play football or baseball with a team of one. But there was one thing I could do — collect things."</p>
    
    <p>So he did, and did he ever! Beginning in kindergarten, Ebright collected butterflies with the same <span class="highlight-vocab">determination<span class="vocab-tooltip">firmness of purpose</span></span> that has marked all his activities. He also collected rocks, fossils, and coins. He became an eager <span class="highlight-vocab">astronomer<span class="vocab-tooltip">someone who studies the stars and planets</span></span>, too, sometimes star-gazing all night.</p>
    
    <div class="vocabulary-note">
        <div class="word">determination</div>
        <div class="definition">firmness of purpose</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">astronomer</div>
        <div class="definition">someone who studies the stars and planets</div>
    </div>
    
    <p class="note">* A home run in the game of baseball is when the batter scores a run after running safely around all bases and back to the home plate without stopping. A ball hit out of the playing field is also called a home run. Getting a paper published at the age of fifteen in a scientific journal is here compared to scoring a home run while batting for the first time.</p>
    
    <p>From the first he had a driving curiosity along with a bright mind. He also had a mother who encouraged his interest in learning. She took him on trips, bought him telescopes, microscopes, cameras, mounting materials, and other equipment and helped him in many other ways.</p>
    
    <p>"I was his only companion until he started school," his mother said. "After that I would bring home friends for him. But at night we just did things together. Richie was my whole life after his father died when Richie was in third grade."</p>
    
    <p>She and her son spent almost every evening at the dining room table. "If he didn't have things to do, I found work for him — not physical work, but learning things," his mother said. "He liked it. He wanted to learn."</p>
    
    <p>And learn he did. He earned top grades in school. "On everyday things he was just like every other kid," his mother said.</p>
    
    <p>By the time he was in the second grade, Ebright had collected all twenty-five species of butterflies found around his hometown.</p>
    
    <p>"That probably would have been the end of my butterfly collecting," he said. "But then my mother got me a children's book called <span class="highlight-vocab">The Travels of Monarch X<span class="vocab-tooltip">a book about the migration of monarch butterflies</span></span>." That book, which told how monarch butterflies migrate to Central America, opened the world of science to the eager young collector.</p>
    
    <div class="vocabulary-note">
        <div class="word">The Travels of Monarch X</div>
        <div class="definition">a book about the migration of monarch butterflies</div>
    </div>
    
    <p>At the end of the book, readers were invited to help study butterfly migrations. They were asked to tag butterflies for research by Dr Frederick A. Urquhart of the University of Toronto, Canada. Ebright's mother wrote to Dr Urquhart, and soon Ebright was attaching light <span class="highlight-vocab">adhesive<span class="vocab-tooltip">sticky</span></span> tags to the wings of monarchs. Anyone who found a tagged butterfly was asked to send the tag to Dr Urquhart.</p>
    
    <div class="vocabulary-note">
        <div class="word">adhesive</div>
        <div class="definition">sticky</div>
    </div>
    
    <p>The butterfly collecting season around Reading lasts six weeks in late summer. If you're going to chase them one by one, you won't catch very many. So the next step for Ebright was to raise a flock of butterflies. He would catch a female monarch, take her eggs, and raise them in his basement through their life cycle, from egg to <span class="highlight-vocab">caterpillar<span class="vocab-tooltip">a worm-like creature that later becomes a butterfly</span></span> to <span class="highlight-vocab">pupa<span class="vocab-tooltip">a stage in an insect's development when it changes from larva to adult</span></span> to adult butterfly. Then he would tag the butterflies' wings and let them go. For several years his basement was home to thousands of monarchs in different stages of development.</p>
    
    <div class="vocabulary-note">
        <div class="word">caterpillar</div>
        <div class="definition">a worm-like creature that later becomes a butterfly</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">pupa</div>
        <div class="definition">a stage in an insect's development when it changes from larva to adult</div>
    </div>
    
    <p>"Eventually I began to lose interest in tagging butterflies. It's <span class="highlight-vocab">tedious<span class="vocab-tooltip">boring</span></span> and there's not much feedback," Ebright said. "In all the time I did it," he laughed, "only two butterflies I had tagged were recaptured — and they were not more than seventy-five miles from where I lived."</p>
    
    <div class="vocabulary-note">
        <div class="word">tedious</div>
        <div class="definition">boring</div>
    </div>
    
    <p>Then in the seventh grade he got a hint of what real science is when he entered a <span class="highlight-vocab">county<span class="vocab-tooltip">region</span></span> science fair — and lost. "It was really a sad feeling to sit there and not get anything while everybody else had won something," Ebright said. His entry was slides of frog tissues, which he showed under a microscope. He realised the winners had tried to do real experiments, not simply make a neat display.</p>
    
    <div class="vocabulary-note">
        <div class="word">county</div>
        <div class="definition">region</div>
    </div>
    
    <p>Already the competitive spirit that drives Richard Ebright was appearing. "I knew that for the next year's fair I would have to do a real experiment," he said. "The subject I knew most about was the insect work I'd been doing in the past several years."</p>
    
    <p>So he wrote to Dr Urquhart for ideas, and back came a stack of suggestions for experiments. Those kept Ebright busy all through high school and led to prize projects in county and international science fairs.</p>
    
    <p>For his eighth grade project, Ebright tried to find the cause of a viral disease that kills nearly all monarch caterpillars every few years. Ebright thought the disease might be carried by a beetle. He tried raising caterpillars in the presence of beetles. "I didn't get any real results," he said. "But I went ahead and showed that I had tried the experiment. This time I won."</p>
    
    <p>The next year his science fair project was testing the theory that viceroy butterflies copy monarchs. The theory was that viceroys look like monarchs because monarchs don't taste good to birds. Viceroys, on the other hand, do taste good to birds. So the more they look like monarchs, the less likely they are to become a bird's dinner.</p>
    
    <p>Ebright's project was to see whether, in fact, birds would eat monarchs. He found that a <span class="highlight-vocab">starling<span class="vocab-tooltip">common European bird (with black, brown-spotted plumage)</span></span> would not eat ordinary bird food. It would eat all the monarchs it could get. (Ebright said later research by other people showed that viceroys probably do copy the monarch.) This project was placed first in the <span class="highlight-vocab">zoology<span class="vocab-tooltip">the scientific study of animals</span></span> division and third overall in the county science fair.</p>
    
    <div class="vocabulary-note">
        <div class="word">starling</div>
        <div class="definition">common European bird (with black, brown-spotted plumage)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">zoology</div>
        <div class="definition">the scientific study of animals</div>
    </div>
    
    <p>In his second year in high school, Richard Ebright began the research that led to his discovery of an unknown insect hormone. lndirectly, it also led to his new theory on the life of cells.</p>
    
    <p>The question he tried to answer was simple: What is the purpose of the twelve tiny gold spots on a monarch pupa?</p>
    
    <p>"Everyone assumed the spots were just <span class="highlight-vocab">ornamental<span class="vocab-tooltip">decorative</span></span>," Ebright said. "But Dr Urquhart didn't believe it."</p>
    
    <div class="vocabulary-note">
        <div class="word">ornamental</div>
        <div class="definition">decorative</div>
    </div>
    
    <p>To find the answer, Ebright and another excellent science student first had to build a device that showed that the spots were producing a hormone necessary for the butterfly's full development.</p>
    
    <p>This project won Ebright first place in the county fair and entry into the International Science and Engineering Fair. There he won third place for zoology. He also got a chance to work during the summer at the <span class="highlight-vocab">entomology<span class="vocab-tooltip">the study of insects</span></span> laboratory of the Walter Reed Army Institute of Research.</p>
    
    <div class="vocabulary-note">
        <div class="word">entomology</div>
        <div class="definition">the study of insects</div>
    </div>
    
    <p>As a high school junior, Richard Ebright continued his advanced experiments on the monarch pupa. That year his project won first place at the International Science Fair and gave him another chance to work in the army laboratory during the summer.</p>
    
    <p>In his senior year, he went a step further. He grew cells from a monarch's wing in a <span class="highlight-vocab">culture<span class="vocab-tooltip">cells grown artificially in a laboratory</span></span> and showed that the cells would divide and develop into normal butterfly wing scales only if they were fed the hormone from the gold spots. That project won first place for zoology at the International Fair. He spent the summer after graduation doing further work at the army laboratory and at the laboratory of the U.S. Department of Agriculture.</p>
    
    <div class="vocabulary-note">
        <div class="word">culture</div>
        <div class="definition">cells grown artificially in a laboratory</div>
    </div>
    
    <p>The following summer, after his freshman year at Harvard University, Ebright went back to the laboratory of the Department of Agriculture and did more work on the hormone from the gold spots. Using the laboratory's <span class="highlight-vocab">sophisticated<span class="vocab-tooltip">advanced and complex</span></span> instruments, he was able to identify the hormone's chemical structure.</p>
    
    <div class="vocabulary-note">
        <div class="word">sophisticated</div>
        <div class="definition">advanced and complex</div>
    </div>
    
    <p>A year-and-a-half later, during his junior year, Ebright got the idea for his new theory about cell life. It came while he was looking at X-ray photos of the chemical structure of a hormone.</p>
    
    <p>When he saw those photos, Ebright didn't shout, '<span class="highlight-vocab">Eureka<span class="vocab-tooltip">a cry of triumph at a discovery (originally attributed to Archimedes)</span></span>!' or even, 'I've got it!' But he believed that, along with his findings about insect hormones, the photos gave him the answer to one of biology's puzzles: how the cell can 'read' the blueprint of its DNA. DNA is the substance in the <span class="highlight-vocab">nucleus<span class="vocab-tooltip">central part</span></span> of a cell that controls <span class="highlight-vocab">heredity<span class="vocab-tooltip">the passing of genetic qualities from parents to offspring</span></span>. It determines the form and function of the cell. Thus DNA is the blueprint for life.</p>
    
    <div class="vocabulary-note">
        <div class="word">Eureka</div>
        <div class="definition">a cry of triumph at a discovery (originally attributed to Archimedes)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">nucleus</div>
        <div class="definition">central part</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">heredity</div>
        <div class="definition">the passing of genetic qualities from parents to offspring</div>
    </div>
    
    <p>Ebright and his college room-mate, James R. Wong, worked all that night drawing pictures and constructing plastic models of molecules to show how it could happen. Together they later wrote the paper that explained the theory.</p>
    
    <p>Surprising no one who knew him, Richard Ebright graduated from Harvard with highest honours, second in his class of 1,510. Ebright went on to become a graduate student researcher at Harvard Medical School. There he began doing experiments to test his theory.</p>
    
    <p>If the theory proves correct, it will be a big step towards understanding the processes of life. It might also lead to new ideas for preventing some types of cancer and other diseases. All of this is possible because of Ebright's scientific curiosity. His high school research into the purpose of the spots on a monarch pupa eventually led him to his theory about cell life.</p>
    
    <p>Richard Ebright has been interested in science since he first began collecting butterflies — but not so deeply that he hasn't time for other interests. Ebright also became a champion debater and public speaker and a good <span class="highlight-vocab">canoeist<span class="vocab-tooltip">a person who paddles a canoe, a light boat</span></span> and all-around outdoors-person. He is also an expert photographer, particularly of nature and scientific exhibits.</p>
    
    <div class="vocabulary-note">
        <div class="word">canoeist</div>
        <div class="definition">a person who paddles a canoe, a light boat</div>
    </div>
    
    <p>In high school Richard Ebright was a straight-A student. Because learning was easy, he turned a lot of his energy towards the Debating and Model United Nations clubs. He also found someone to admire — Richard A. Weiherer, his social studies teacher and adviser to both clubs. "Mr Weiherer was the perfect person for me then. He opened my mind to new ideas," Ebright said.</p>
    
    <p>"Richard would always give that extra effort," Mr Weiherer said. "What pleased me was, here was this person who put in three or four hours at night doing debate research besides doing all his research with butterflies and his other interests.</p>
    
    <p>"Richard was competitive," Mr Weiherer continued, "but not in a bad sense." He explained, "Richard wasn't interested in winning for winning's sake or winning to get a prize. Rather, he was winning because he wanted to do the best job he could. For the right reasons, he wants to be the best."</p>
    
    <p>And that is one of the ingredients in the making of a scientist. Start with a first-rate mind, add curiosity, and mix in the will to win for the right reasons. Ebright has these qualities. From the time the book, The Travels of Monarch X, opened the world of science to him, Richard Ebright has never lost his scientific curiosity.</p>
    
    <p class="author">ROBERT W. PETERSON</p>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. How old was Richard Ebright when his article was published?</div>
        <div class="comprehension-question">2. What role did Ebright's mother play in his development as a scientist?</div>
        <div class="comprehension-question">3. How did the book "The Travels of Monarch X" influence Ebright?</div>
        <div class="comprehension-question">4. What qualities make a good scientist according to the story?</div>
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
        if (p.closest('.vocabulary-note') || p.closest('.comprehension-check') || p.classList.contains('note') || p.classList.contains('author')) {
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
    let currentChunk = "The Making of a Scientist, by Robert W. Peterson. ";
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
