/**
 * Story and poem content and functionality for The Sound of Music
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data - Part 1 (Evelyn Glennie)
const storyContentPart1 = `
    <h3>Part I</h3>
    <h4>Evelyn Glennie Listens to Sound without Hearing It</h4>

    <p>RUSH hour crowds <span class="highlight-vocab">jostle<span class="vocab-tooltip">push roughly</span></span> for position on the underground train platform. A <span class="highlight-vocab">slight<span class="vocab-tooltip">small and thin</span></span> girl, looking younger than her seventeen years, was nervous yet excited as she felt the vibrations of the approaching train. It was her first day at the prestigious Royal Academy of Music in London and <span class="highlight-vocab">daunting<span class="vocab-tooltip">frightening</span></span> enough for any teenager fresh from a Scottish farm. But this <span class="highlight-vocab">aspiring musician<span class="vocab-tooltip">a person who wants to be a musician</span></span> faced a bigger challenge than most: she was profoundly deaf.</p>
    
    <div class="vocabulary-note">
        <div class="word">jostle</div>
        <div class="definition">push roughly</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">slight</div>
        <div class="definition">small and thin</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">daunting</div>
        <div class="definition">frightening</div>
    </div>

    <div class="vocabulary-note">
        <div class="word">aspiring musician</div>
        <div class="definition">a person who wants to be a musician</div>
    </div>
    
    <p>Evelyn Glennie's loss of hearing had been gradual. Her mother remembers noticing something was wrong when the eight-year-old Evelyn was waiting to play the piano. "They called her name and she didn't move. I suddenly realised she hadn't heard," says Isabel Glennie. For quite a while Evelyn managed to conceal her growing deafness from friends and teachers. But by the time she was eleven her marks had deteriorated and her headmistress urged her parents to take her to a specialist. It was then discovered that her hearing was severely <span class="highlight-vocab">impaired<span class="vocab-tooltip">weakened</span></span> as a result of gradual nerve damage. They were advised that she should be fitted with hearing aids and sent to a school for the deaf. "Everything suddenly looked black," says Evelyn.</p>
    
    <div class="vocabulary-note">
        <div class="word">impaired</div>
        <div class="definition">weakened</div>
    </div>

    <p>But Evelyn was not going to give up. She was determined to lead a normal life and pursue her interest in music. One day she noticed a girl playing a <span class="highlight-vocab">xylophone<span class="vocab-tooltip">a musical instrument with a row of wooden bars of different lengths</span></span> and decided that she wanted to play it too. Most of the teachers discouraged her but <span class="highlight-vocab">percussionist<span class="vocab-tooltip">a person who plays the drum, the tabla, etc.</span></span> Ron Forbes spotted her <span class="highlight-vocab">potential<span class="vocab-tooltip">quality or ability that can be developed</span></span>. He began by tuning two large drums to different notes. "Don't listen through your ears," he would say, "try to sense it some other way." Says Evelyn, "Suddenly I realised I could feel the higher drum from the waist up and the lower one from the waist down." Forbes repeated the exercise, and soon Evelyn discovered that she could sense certain notes in different parts of her body. "I had learnt to open my mind and body to sounds and vibrations." The rest was sheer determination and hard work.</p>
    
    <div class="vocabulary-note">
        <div class="word">xylophone</div>
        <div class="definition">a musical instrument with a row of wooden bars of different lengths</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">percussionist</div>
        <div class="definition">a person who plays the drum, the tabla, etc.</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">potential</div>
        <div class="definition">quality or ability that can be developed</div>
    </div>

    <p>She never looked back from that point onwards. She toured the United Kingdom with a youth orchestra and by the time she was sixteen, she had decided to make music her life. She <span class="highlight-vocab">auditioned<span class="vocab-tooltip">gave a short performance so that the director could decide whether she was good enough</span></span> for the Royal Academy of Music and scored one of the highest marks in the history of the academy. She gradually moved from orchestral work to solo performances. At the end of her three-year course, she had captured most of the top awards.</p>
    
    <div class="vocabulary-note">
        <div class="word">auditioned</div>
        <div class="definition">gave a short performance so that the director could decide whether she was good enough</div>
    </div>

    <p>And for all this, Evelyn won't accept any hint of heroic achievement. "If you work hard and know where you are going, you'll get there." And she got right to the top, the world's most sought-after multi-percussionist with a mastery of some thousand instruments, and hectic international schedule.</p>
`;

// Additional story content will be loaded in separate chunks

// Poem content data
const poemContent = `
    <div class="poem-text">
        <p class="poem-title">WIND</p>
        <p class="poem-author">by Subramania Bharati</p>
        <p class="poem-translator">[translated from the Tamil by A.K. Ramanujan]</p>
        
        <div class="poem-stanza">
            <p class="poem-line">Wind, come softly.</p>
            <p class="poem-line">Don't break the shutters of the windows.</p>
            <p class="poem-line">Don't scatter the papers.</p>
            <p class="poem-line">Don't throw down the books on the shelf.</p>
            <p class="poem-line">There, look what you did — you threw them all down.</p>
            <p class="poem-line">You tore the pages of the books.</p>
            <p class="poem-line">You brought rain again.</p>
            <p class="poem-line">You're very clever at <span class="highlight-vocab">poking fun<span class="vocab-tooltip">making fun of</span></span> at weaklings.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">Frail crumbling houses, crumbling doors, crumbling <span class="highlight-vocab">rafters<span class="vocab-tooltip">sloping beams supporting a roof</span></span>,</p>
            <p class="poem-line">crumbling wood, crumbling bodies, crumbling lives,</p>
            <p class="poem-line">crumbling hearts —</p>
            <p class="poem-line">the wind god <span class="highlight-vocab">winnows<span class="vocab-tooltip">blow grain free of chaff; separate grain from husk by blowing on it</span></span> and crushes them all.</p>
        </div>
        
        <div class="poem-stanza">
            <p class="poem-line">He won't do what you tell him.</p>
            <p class="poem-line">So, come, let's build strong homes,</p>
            <p class="poem-line">Let's joint the doors firmly.</p>
            <p class="poem-line">Practise to firm the body.</p>
            <p class="poem-line">Make the heart steadfast.</p>
            <p class="poem-line">Do this, and the wind will be friends with us.</p>
            <p class="poem-line">The wind blows out weak fires.</p>
            <p class="poem-line">He makes strong fires roar and flourish.</p>
            <p class="poem-line">His friendship is good.</p>
            <p class="poem-line">We praise him every day.</p>
        </div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">poking fun</div>
        <div class="definition">making fun of</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">rafters</div>
        <div class="definition">sloping beams supporting a roof</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">winnow</div>
        <div class="definition">blow grain free of chaff; separate grain from husk by blowing on it</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What are the things the wind does in the first stanza?</div>
        <div class="comprehension-question">2. What does the poet say the wind god winnows?</div>
        <div class="comprehension-question">3. What should we do to make friends with the wind?</div>
        <div class="comprehension-question">4. What do the last four lines of the poem mean?</div>
    </div>
`;

// Load content function declarations will be in the next chunk
