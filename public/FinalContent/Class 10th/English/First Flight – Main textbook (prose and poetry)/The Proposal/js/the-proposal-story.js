/**
 * Story content and functionality for The Proposal
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;

// Story content data - Part 1
const storyContent = `
    <div class="characters-list">
        <h3>Characters</h3>
        <p><strong>STEPAN STEPANOVITCH CHUBUKOV:</strong> a landowner</p>
        <p><strong>NATALYA STEPANOVNA:</strong> his daughter, twenty-five years old</p>
        <p><strong>IVAN VASSILEVITCH LOMOV:</strong> a neighbour of Chubukov, a large and hearty, but very suspicious, landowner</p>
        <p><em>A drawing-room in Chubukov's house.</em></p>
        <p><em>Lomov enters, wearing a dress-jacket and white gloves. Chubukov rises to meet him.</em></p>
    </div>
    
    <p><strong>CHUBUKOV:</strong> My dear fellow, whom do I see! Ivan Vassilevitch! I am <span class="highlight-vocab">extremely<span class="vocab-tooltip">to a very great degree</span></span> glad! [<em>Squeezes his hand</em>] Now this is a surprise, my darling... How are you?</p>
    
    <div class="vocabulary-note">
        <div class="word">extremely</div>
        <div class="definition">to a very great degree</div>
    </div>
    
    <p><strong>LOMOV:</strong> Thank you. And how may you be getting on?</p>
    
    <p><strong>CHUBUKOV:</strong> We just get along somehow, my angel, thanks to your prayers, and so on. Sit down, please do... Now, you know, you shouldn't forget all about your neighbours, my darling. My dear fellow, why are you so formal in your get-up! Evening dress, gloves, and so on. Can you be going anywhere, my treasure?</p>
    
    <p><strong>LOMOV:</strong> No. I've come only to see you, <span class="highlight-vocab">honoured<span class="vocab-tooltip">respected, esteemed</span></span> Stepan Stepanovitch.</p>
    
    <div class="vocabulary-note">
        <div class="word">honoured</div>
        <div class="definition">respected, esteemed</div>
    </div>
    
    <p><strong>CHUBUKOV:</strong> Then why are you in evening dress, my <span class="highlight-vocab">precious<span class="vocab-tooltip">dear, beloved</span></span>? As if you're paying a New Year's Eve visit!</p>
    
    <div class="vocabulary-note">
        <div class="word">precious</div>
        <div class="definition">dear, beloved</div>
    </div>
    
    <p><strong>LOMOV:</strong> Well, you see, it's like this. [<em>Takes his arm</em>] I've come to you, honoured Stepan Stepanovitch, to <span class="highlight-vocab">trouble<span class="vocab-tooltip">bother, disturb</span></span> you with a request. Not once or twice have I already had the privilege of applying to you for help, and you have always, so to speak... I must ask your pardon, I am getting excited. I shall drink some water, honoured Stepan Stepanovitch. [<em>Drinks.</em>]</p>
    
    <div class="vocabulary-note">
        <div class="word">trouble</div>
        <div class="definition">bother, disturb</div>
    </div>
    
    <p><strong>CHUBUKOV:</strong> [<em>aside</em>] He's come to <span class="highlight-vocab">borrow<span class="vocab-tooltip">take and use with the promise to return</span></span> money. Shan't give him any! [<em>aloud</em>] What is it, my beauty?</p>
    
    <div class="vocabulary-note">
        <div class="word">borrow</div>
        <div class="definition">take and use with the promise to return</div>
    </div>
    
    <p><strong>LOMOV:</strong> You see, Honoured Stepanitch... I beg pardon, Stepan Honouritch... I mean, I'm <span class="highlight-vocab">awfully<span class="vocab-tooltip">extremely</span></span> excited, as you will please notice... In short, you alone can help me, though I don't deserve it, of course... and haven't any right to count on your assistance...</p>
    
    <div class="vocabulary-note">
        <div class="word">awfully</div>
        <div class="definition">extremely</div>
    </div>
    
    <p><strong>CHUBUKOV:</strong> Oh, don't go round and round it, darling! <span class="highlight-vocab">Spit it out<span class="vocab-tooltip">say it directly</span></span>! Well?</p>
    
    <div class="vocabulary-note">
        <div class="word">spit it out</div>
        <div class="definition">say it directly</div>
    </div>
    
    <p><strong>LOMOV:</strong> One moment... this very minute. The fact is I've come to ask the hand of your daughter, Natalya Stepanovna, in marriage.</p>
    
    <p><strong>CHUBUKOV:</strong> [<em>joyfully</em>] By Jove! Ivan Vassilevitch! Say it again — I didn't hear it all!</p>
    
    <p><strong>LOMOV:</strong> I have the honour to ask...</p>
    
    <p><strong>CHUBUKOV:</strong> [<em>interrupting</em>] My dear fellow... I'm so glad, and so on... Yes, indeed, and all that sort of thing. [<em>Embraces and kisses Lomov</em>] I've been hoping for it for a long time. It's been my continual desire. [<em>Sheds a tear</em>] And I've always loved you, my angel, as if you were my own son. May God give you both — His help and His love and so on, and so much hope... What am I behaving in this idiotic way for? I'm off my balance with joy, absolutely off my balance! Oh, with all my soul... I'll go and call Natasha, and all that.</p>
    
    <p><strong>LOMOV:</strong> [<em>greatly moved</em>] Honoured Stepan Stepanovitch, do you think I may count on her consent?</p>
    
    <p><strong>CHUBUKOV:</strong> Why, of course, my darling, and... as if she won't consent! She's in love; <span class="highlight-vocab">egad<span class="vocab-tooltip">an exclamation expressing surprise</span></span>, she's like a <span class="highlight-vocab">lovesick<span class="vocab-tooltip">deeply in love, besotted</span></span> cat, and so on. Shan't be long! [<em>Exit.</em>]</p>
    
    <div class="vocabulary-note">
        <div class="word">egad</div>
        <div class="definition">an exclamation expressing surprise</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">lovesick</div>
        <div class="definition">deeply in love, besotted</div>
    </div>
    
    <p><strong>LOMOV:</strong> It's cold... I'm trembling all over, just as if I'd got an examination before me. The great thing is, I must have my mind made up. If I give myself time to think, to <span class="highlight-vocab">hesitate<span class="vocab-tooltip">pause before deciding or acting</span></span>, to talk a lot, to look for an ideal, or for real love, then I'll never get married. <span class="highlight-vocab">Brr<span class="vocab-tooltip">expression indicating cold or fear</span></span>... It's cold! Natalya Stepanovna is an excellent housekeeper, not bad-looking, well-educated. What more do I want? But I'm getting a noise in my ears from excitement. [<em>Drinks</em>] And it's impossible for me not to marry. In the first place, I'm already 35 — a <span class="highlight-vocab">critical<span class="vocab-tooltip">extremely important or decisive</span></span> age, so to speak. In the second place, I ought to lead a quiet and regular life. I suffer from <span class="highlight-vocab">palpitations<span class="vocab-tooltip">rapid or irregular heartbeats</span></span>, I'm <span class="highlight-vocab">excitable<span class="vocab-tooltip">easily excited or agitated</span></span> and always getting awfully upset; at this very moment my lips are trembling, and there's a twitch in my right eyebrow. But the very worst of all is the way I sleep. I no sooner get into bed and begin to go off, when suddenly something in my left side gives a pull, and I can feel it in my shoulder and head... I jump up like a <span class="highlight-vocab">lunatic<span class="vocab-tooltip">a mentally ill person, mad person</span></span>, walk about a bit and lie down again, but as soon as I begin to get off to sleep there's another pull! And this may happen twenty times...</p>
    
    <div class="vocabulary-note">
        <div class="word">hesitate</div>
        <div class="definition">pause before deciding or acting</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">Brr</div>
        <div class="definition">expression indicating cold or fear</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">critical</div>
        <div class="definition">extremely important or decisive</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">palpitations</div>
        <div class="definition">rapid or irregular heartbeats</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">excitable</div>
        <div class="definition">easily excited or agitated</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">lunatic</div>
        <div class="definition">a mentally ill person, mad person</div>
    </div>
    
    <p>[<em>Natalya Stepanovna comes in.</em>]</p>
    
    <p><strong>NATALYA:</strong> Well, there! It's you, and papa said, "Go; there's a merchant come for his goods." How do you do, Ivan Vassilevitch?</p>
    
    <p><strong>LOMOV:</strong> How do you do, honoured Natalya Stepanovna?</p>
    
    <p><strong>NATALYA:</strong> You must excuse my apron and <span class="highlight-vocab">négligé<span class="vocab-tooltip">casual, relaxed attire</span></span>. We're shelling peas for drying. Why haven't you been here for such a long time? Sit down... [<em>They seat themselves.</em>] Won't you have some lunch?</p>
    
    <div class="vocabulary-note">
        <div class="word">négligé</div>
        <div class="definition">casual, relaxed attire</div>
    </div>
    
    <p><strong>LOMOV:</strong> No, thank you, I've had some already.</p>
    
    <p><strong>NATALYA:</strong> Then smoke. Here are the matches. The weather is <span class="highlight-vocab">splendid<span class="vocab-tooltip">excellent, magnificent</span></span> now, but yesterday it was so wet that the workmen didn't do anything all day. How much hay have you stacked? Just think, I felt greedy and had a whole field cut, and now I'm not at all pleased about it because I'm afraid my hay may rot. I ought to have waited a bit. But what's this? Why, you're in evening dress! Well, I never! Are you going to a ball or what? Though I must say you look better... Tell me, why are you got up like that?</p>
    
    <div class="vocabulary-note">
        <div class="word">splendid</div>
        <div class="definition">excellent, magnificent</div>
    </div>
    
    <p><strong>LOMOV:</strong> [<em>excited</em>] You see, honoured Natalya Stepanovna... the fact is, I've made up my mind to ask you to hear me out... Of course you'll be surprised and perhaps even angry, but a... [<em>aside</em>] It's awfully cold!</p>
    
    <p><strong>NATALYA:</strong> What's the matter? [<em>pause</em>] Well?</p>

    <p><strong>LOMOV:</strong> I shall try to be brief. You must know, honoured Natalya Stepanovna, that I have long, since my childhood, in fact, had the privilege of knowing your family. My late aunt and her husband, from whom, as you know, I inherited my land, always had the greatest respect for your father and your late mother. The Lomovs and the Chubukovs have always had the most friendly, and I might almost say the most affectionate, regard for each other. And, as you know, my land is a near neighbour of yours. You will remember that my Oxen Meadows touch your birchwoods.</p>

    <p><strong>NATALYA:</strong> Excuse my interrupting you. You say, "my Oxen Meadows". But are they yours?</p>
    
    <p><strong>LOMOV:</strong> Yes, mine.</p>
    
    <p><strong>NATALYA:</strong> What are you talking about? Oxen Meadows are ours, not yours!</p>
    
    <p><strong>LOMOV:</strong> No, mine, honoured Natalya Stepanovna.</p>
    
    <p><strong>NATALYA:</strong> Well, I never knew that before. How do you make that out?</p>
    
    <p><strong>LOMOV:</strong> How? I'm speaking of those Oxen Meadows which are wedged in between your birchwoods and the Burnt Marsh.</p>
    
    <p><strong>NATALYA:</strong> Yes, yes... they're ours.</p>
    
    <p><strong>LOMOV:</strong> No, you're mistaken, honoured Natalya Stepanovna, they're mine.</p>
    
    <p><strong>NATALYA:</strong> Just think, Ivan Vassilevitch! How long have they been yours?</p>
    
    <p><strong>LOMOV:</strong> How long? As long as I can remember.</p>
    
    <p><strong>NATALYA:</strong> Really, you won't get me to believe that!</p>
    
    <p><strong>LOMOV:</strong> But you can see from the documents, honoured Natalya Stepanovna. Oxen Meadows, it's true, were once the subject of dispute, but now everybody knows that they are mine. There's nothing to argue about. You see my aunt's grandmother gave the free use of these Meadows in perpetuity to the peasants of your father's grandfather, in return for which they were to make bricks for her. The peasants belonging to your father's grandfather had the free use of the Meadows for forty years, and had got into the habit of regarding them as their own, when it happened that...</p>

    <p><strong>NATALYA:</strong> No, it isn't at all like that! Both grandfather and great-grandfather reckoned that their land extended to Burnt Marsh — which means that Oxen Meadows were ours. I don't see what there is to argue about. It's simply silly!</p>
    
    <p><strong>LOMOV:</strong> I'll show you the documents, Natalya Stepanovna!</p>
    
    <p><strong>NATALYA:</strong> No, you're simply joking, or making fun of me. What a surprise! We've had the land for nearly three hundred years, and then we're suddenly told that it isn't ours! Ivan Vassilevitch, I can hardly believe my own ears. These Meadows aren't worth much to me. They only come to five dessiatins, and are worth perhaps 300 roubles, but I can't stand unfairness. Say what you will, I can't stand unfairness.</p>
    
    <p><strong>LOMOV:</strong> Hear me out, I implore you! The peasants of your father's grandfather, as I have already had the honour of explaining to you, used to bake bricks for my aunt's grandmother. Now my aunt's grandmother, wishing to make them a pleasant...</p>
    
    <p><strong>NATALYA:</strong> I can't make head or tail of all this about aunts and grandfathers and grandmothers. The Meadows are ours, that's all.</p>
    
    <p><strong>LOMOV:</strong> Mine.</p>
    
    <p><strong>NATALYA:</strong> Ours! You can go on proving it for two days on end, you can go and put on fifteen dress jackets, but I tell you they're ours, ours, ours! I don't want anything of yours and I don't want to give anything of mine. So there!</p>
    
    <p><strong>LOMOV:</strong> Natalya Stepanovna, I don't want the Meadows, but I am acting on principle. If you like, I'll make you a present of them.</p>
    
    <p><strong>NATALYA:</strong> I can make you a present of them myself, because they're mine! Your behaviour, Ivan Vassilevitch, is strange, to say the least! Up to this we have always thought of you as a good neighbour, a friend; last year we lent you our threshing-machine, although on that account we had to put off our own threshing till November, but you behave to us as if we were gypsies. Giving me my own land, indeed! No, really, that's not at all neighbourly! In my opinion, it's even impudent, if you want to know.</p>
    
    <p><strong>LOMOV:</strong> Then you make out that I'm a landgrabber? Madam, never in my life have I grabbed anybody else's land and I shan't allow anybody to accuse me of having done so. [<em>Quickly steps to the carafe and drinks more water</em>] Oxen Meadows are mine!</p>
    
    <p><strong>NATALYA:</strong> It's not true, they're ours!</p>
    
    <p><strong>LOMOV:</strong> Mine!</p>
    
    <p><strong>NATALYA:</strong> It's not true! I'll prove it! I'll send my mowers out to the Meadows this very day!</p>
    
    <p><strong>LOMOV:</strong> What?</p>
    
    <p><strong>NATALYA:</strong> My mowers will be there this very day!</p>
    
    <p><strong>LOMOV:</strong> I'll give it to them in the neck!</p>
    
    <p><strong>NATALYA:</strong> You dare!</p>
    
    <p><strong>LOMOV:</strong> [<em>Clutches at his heart</em>] Oxen Meadows are mine! You understand? Mine!</p>
    
    <p><strong>NATALYA:</strong> Please don't shout! You can shout yourself hoarse in your own house but here I must ask you to restrain yourself!</p>
    
    <p><strong>LOMOV:</strong> If it wasn't, madam, for this awful, excruciating palpitation, if my whole inside wasn't upset, I'd talk to you in a different way! [<em>Yells</em>] Oxen Meadows are mine!</p>
    
    <p><strong>NATALYA:</strong> Ours!</p>
    
    <p><strong>LOMOV:</strong> Mine!</p>
    
    <p><strong>NATALYA:</strong> Ours!</p>
    
    <p><strong>LOMOV:</strong> Mine!</p>
    
    <p>[<em>Enter Chubukov</em>]</p>
    
    <p><strong>CHUBUKOV:</strong> What's the matter? What are you shouting for?</p>
    
    <p><strong>NATALYA:</strong> Papa, please tell this gentleman who owns Oxen Meadows, we or he?</p>
    
    <p><strong>CHUBUKOV:</strong> [<em>to Lomov</em>] Darling, the Meadows are ours!</p>
    
    <p><strong>LOMOV:</strong> But, please, Stepan Stepanovitch, how can they be yours? Do be a reasonable man! My aunt's grandmother gave the Meadows for the temporary and free use of your grandfather's peasants. The peasants used the land for forty years and got accustomed to it as if it was their own, when it happened that...</p>
    
    <p><strong>CHUBUKOV:</strong> Excuse me, my precious. You forget just this, that the peasants didn't pay your grandmother and all that, because the Meadows were in dispute, and so on. And now everybody knows that they're ours. It means that you haven't seen the plan.</p>
    
    <p><strong>LOMOV:</strong> I'll prove to you that they're mine!</p>
    
    <p><strong>CHUBUKOV:</strong> You won't prove it, my darling —</p>
    
    <p><strong>LOMOV:</strong> I shall!</p>
    
    <p><strong>CHUBUKOV:</strong> Dear one, why yell like that? You won't prove anything just by yelling. I don't want anything of yours, and don't intend to give up what I have. Why should I? And you know, my beloved, that if you propose to go on arguing about it, I'd much sooner give up the Meadows to the peasants than to you. There!</p>
    
    <div class="comprehension-check">
        <h3>📝 Comprehension Check</h3>
        <div class="comprehension-question">1. What is the purpose of Lomov's visit to the Chubukov house?</div>
        <div class="comprehension-question">2. How does Chubukov initially misunderstand Lomov's intentions?</div>
        <div class="comprehension-question">3. What does Lomov say about his health condition?</div>
    </div>

    <p><strong>LOMOV:</strong> I don't understand! How have you the right to give away somebody else's property?</p>
    
    <p><strong>CHUBUKOV:</strong> You may take it that I know whether I have the right or not. Because, young man, I'm not used to being spoken to in that tone of voice, and so on. I, young man, am twice your age, and ask you to speak to me without agitating yourself, and all that.</p>
    
    <p><strong>LOMOV:</strong> No, you just think I'm a fool and want to have me on! You call my land yours, and then you want me to talk to you calmly and politely! Good neighbours don't behave like that, Stepan Stepanovitch! You're not a neighbour, you're a grabber!</p>
    
    <p><strong>CHUBUKOV:</strong> What's that? What did you say?</p>
    
    <p><strong>NATALYA:</strong> Papa, send the mowers out to the Meadows at once!</p>
    
    <p><strong>CHUBUKOV:</strong> What did you say, sir?</p>
    
    <p><strong>NATALYA:</strong> Oxen Meadows are ours, and I shan't give them up, shan't give them up, shan't give them up!</p>
    
    <p><strong>LOMOV:</strong> We'll see! I'll have the matter taken to court, and then I'll show you!</p>
    
    <p><strong>CHUBUKOV:</strong> To court? You can take it to court, and all that! You can! I know you; you're just on the look-out for a chance to go to court, and all that. You pettifogger! All your people were like that! All of them!</p>
    
    <p><strong>LOMOV:</strong> Never mind about my people! The Lomovs have all been honourable people, and not one has ever been tried for embezzlement, like your grandfather!</p>
    
    <p><strong>CHUBUKOV:</strong> You Lomovs have had lunacy in your family, all of you!</p>
    
    <p><strong>NATALYA:</strong> All, all, all!</p>
    
    <p><strong>CHUBUKOV:</strong> Your grandfather was a drunkard, and your younger aunt, Nastasya Mihailovna, ran away with an architect, and so on...</p>
    
    <p><strong>LOMOV:</strong> And your mother was hump-backed. [<em>Clutches at his heart</em>] Something pulling in my side... My head.... Help! Water!</p>
    
    <p><strong>CHUBUKOV:</strong> Your father was a guzzling gambler!</p>
    
    <p><strong>NATALYA:</strong> And there haven't been many backbiters to equal your aunt!</p>
    
    <p><strong>CHUBUKOV:</strong> My left foot has gone to sleep... You're an intriguer....Oh, my heart! And it's an open secret that before the last elections you bri... I can see stars... Where's my hat?</p>
    
    <p><strong>NATALYA:</strong> It's low! It's dishonest! It's mean!</p>
    
    <p><strong>CHUBUKOV:</strong> And you're just a malicious, doublefaced intriguer! Yes!</p>
    
    <p><strong>LOMOV:</strong> Here's my hat. My heart! Which way? Where's the door? Oh I think I'm dying! My foot's quite numb... [<em>Goes to the door.</em>]</p>
    
    <p><strong>CHUBUKOV:</strong> [<em>following him</em>] And don't set foot in my house again!</p>
    
    <p><strong>NATALYA:</strong> Take it to court! We'll see!</p>
    
    <p>[<em>Lomov staggers out.</em>]</p>
    
    <p><strong>CHUBUKOV:</strong> Devil take him!</p>
    
    <p>[<em>Walks about in excitement.</em>]</p>
    
    <p><strong>NATALYA:</strong> What a rascal! What trust can one have in one's neighbours after that!</p>
    
    <p><strong>CHUBUKOV:</strong> The villain! The scarecrow!</p>
    
    <p><strong>NATALYA:</strong> The monster! First he takes our land and then he has the impudence to abuse us.</p>
    
    <p><strong>CHUBUKOV:</strong> And that blind hen, yes, that turnip-ghost has the confounded cheek to make a proposal, and so on! What? A proposal!</p>
    
    <p><strong>NATALYA:</strong> What proposal?</p>
    
    <p><strong>CHUBUKOV:</strong> Why, he came here to propose to you.</p>
    
    <p><strong>NATALYA:</strong> To propose? To me? Why didn't you tell me so before?</p>
    
    <p><strong>CHUBUKOV:</strong> So he dresses up in evening clothes. The stuffed sausage! The wizen-faced frump!</p>
    
    <p><strong>NATALYA:</strong> To propose to me? Ah! [<em>Falls into an easy-chair and wails</em>] Bring him back! Back! Ah! Bring him here.</p>
    
    <p><strong>CHUBUKOV:</strong> Bring whom here?</p>
    
    <p><strong>NATALYA:</strong> Quick, quick! I'm ill! Fetch him! [<em>Hysterics.</em>]</p>
    
    <p><strong>CHUBUKOV:</strong> What's that? What's the matter with you? [<em>Clutches at his head</em>] Oh, unhappy man that I am! I'll shoot myself! I'll hang myself! We've done for her!</p>
    
    <p><strong>NATALYA:</strong> I'm dying! Fetch him!</p>
    
    <p><strong>CHUBUKOV:</strong> Tfoo! At once. Don't yell! [<em>Runs out. A pause.</em>]</p>
    
    <p><strong>NATALYA:</strong> [<em>Natalya Stepanovna wails.</em>] What have they done to me? Fetch him back! Fetch him! [<em>A pause. Chubukov runs in.</em>]</p>
    
    <p><strong>CHUBUKOV:</strong> He's coming, and so on, devil take him! Ouf! Talk to him yourself; I don't want to...</p>
    
    <p><strong>NATALYA:</strong> [<em>wails</em>] Fetch him!</p>
    
    <p><strong>CHUBUKOV:</strong> [<em>yells</em>] He's coming, I tell you. Oh, what a burden, Lord, to be the father of a grown-up daughter! I'll cut my throat I will, indeed! We cursed him, abused him, drove him out; and it's all you... you!</p>
    
    <p><strong>NATALYA:</strong> No, it was you!</p>
    
    <p><strong>CHUBUKOV:</strong> I tell you it's not my fault. [<em>Lomov appears at the door</em>] Now you talk to him yourself. [<em>Exit.</em>]</p>
    
    <p><strong>LOMOV:</strong> [<em>Lomov enters, exhausted.</em>] My heart's palpitating awfully. My foot's gone to sleep. There's something that keeps pulling in my side...</p>
    
    <p><strong>NATALYA:</strong> Forgive us, Ivan Vassilevitch, we were all a little heated. I remember now: Oxen Meadows... really are yours.</p>
    
    <p><strong>LOMOV:</strong> My heart's beating awfully. My Meadows... My eyebrows are both twitching...</p>
    
    <p><strong>NATALYA:</strong> The Meadows are yours, yes, yours. Do sit down. [<em>They sit</em>] We were wrong.</p>
    
    <p><strong>LOMOV:</strong> I did it on principle. My land is worth little to me, but the principle...</p>
    
    <p><strong>NATALYA:</strong> Yes, the principle, just so. Now let's talk of something else.</p>
    
    <p><strong>LOMOV:</strong> The more so as I have evidence. My aunt's grandmother gave the land to your father's grandfather's peasants...</p>
    
    <p><strong>NATALYA:</strong> Yes, yes, let that pass. [<em>aside</em>] I wish I knew how to get him started. [<em>aloud</em>] Are you going to start shooting soon?</p>
    
    <p><strong>LOMOV:</strong> I'm thinking of having a go at the blackcock, honoured Natalya Stepanovna, after the harvest. Oh, have you heard? Just think, what a misfortune I've had! My dog Guess, who you know, has gone lame.</p>
    
    <p><strong>NATALYA:</strong> What a pity! Why?</p>
    
    <p><strong>LOMOV:</strong> I don't know. Must have got his leg twisted or bitten by some other dog. [<em>sighs</em>] My very best dog, to say nothing of the expense. I gave Mironov 125 roubles for him.</p>
    
    <p><strong>NATALYA:</strong> It was too much, Ivan Vassilevitch.</p>
    
    <p><strong>LOMOV:</strong> I think it was very cheap. He's a first-rate dog.</p>
    
    <p><strong>NATALYA:</strong> Papa gave 85 roubles for his Squeezer, and Squeezer is heaps better than Guess!</p>
    
    <p><strong>LOMOV:</strong> Squeezer better than Guess? What an idea! [<em>laughs</em>] Squeezer better than Guess!</p>
    
    <p><strong>NATALYA:</strong> Of course he's better! Of course, Squeezer is young, he may develop a bit, but on points and pedigree he's better than anything that even Volchanetsky has got.</p>
    
    <p><strong>LOMOV:</strong> Excuse me, Natalya Stepanovna, but you forget that he is overshot, and an overshot always means the dog is a bad hunter!</p>
    
    <p><strong>NATALYA:</strong> Overshot, is he? The first time I hear it!</p>
    
    <p><strong>LOMOV:</strong> I assure you that his lower jaw is shorter than the upper.</p>
    
    <p><strong>NATALYA:</strong> Have you measured?</p>
    
    <p><strong>LOMOV:</strong> Yes. He's all right at following, of course, but if you want to get hold of anything...</p>
    
    <p><strong>NATALYA:</strong> In the first place, our Squeezer is a thoroughbred animal, the son of Harness and Chisels while there's no getting at the pedigree of your dog at all. He's old and as ugly as a worn-out cab-horse.</p>
    
    <p><strong>LOMOV:</strong> He is old, but I wouldn't take five Squeezers for him. Why, how can you? Guess is a dog; as for Squeezer, well, it's too funny to argue. Anybody you like has a dog as good as Squeezer... you may find them under every bush almost. Twenty-five roubles would be a handsome price to pay for him.</p>
    
    <p><strong>NATALYA:</strong> There's some demon of contradiction in you today, Ivan Vassilevitch. First you pretend that the Meadows are yours; now, that Guess is better than Squeezer. I don't like people who don't say what they mean, because you know perfectly well that Squeezer is a hundred times better than your silly Guess. Why do you want to say he isn't?</p>
    
    <p><strong>LOMOV:</strong> I see, Natalya Stepanovna, that you consider me either blind or a fool. You must realise that Squeezer is overshot!</p>
    
    <p><strong>NATALYA:</strong> It's not true.</p>
    
    <p><strong>LOMOV:</strong> He is!</p>
    
    <p><strong>NATALYA:</strong> It's not true!</p>
    
    <p><strong>LOMOV:</strong> Why shout, madam?</p>
    
    <p><strong>NATALYA:</strong> Why talk rot? It's awful! It's time your Guess was shot, and you compare him with Squeezer!</p>
    
    <p><strong>LOMOV:</strong> Excuse me, I cannot continue this discussion, my heart is palpitating.</p>
    
    <p><strong>NATALYA:</strong> I've noticed that those hunters argue most who know least.</p>
    
    <p><strong>LOMOV:</strong> Madam, please be silent. My heart is going to pieces. [<em>shouts</em>] Shut up!</p>
    
    <p><strong>NATALYA:</strong> I shan't shut up until you acknowledge that Squeezer is a hundred times better than your Guess!</p>
    
    <p><strong>LOMOV:</strong> A hundred times worse! Be hanged to your Squeezer! His head... eyes... shoulder...</p>
    
    <p><strong>NATALYA:</strong> There's no need to hang your silly Guess; he's half-dead already!</p>
    
    <p><strong>LOMOV:</strong> [<em>weeps</em>] Shut up! My heart's bursting!</p>
    
    <p><strong>NATALYA:</strong> I shan't shut up.</p>
    
    <p>[<em>Enter Chubukov.</em>]</p>
    
    <p><strong>CHUBUKOV:</strong> What's the matter now?</p>
    
    <p><strong>NATALYA:</strong> Papa, tell us truly, which is the better dog, our Squeezer or his Guess.</p>
    
    <p><strong>LOMOV:</strong> Stepan Stepanovitch, I implore you to tell me just one thing: is your Squeezer overshot or not? Yes or no?</p>
    
    <p><strong>CHUBUKOV:</strong> And suppose he is? What does it matter? He's the best dog in the district for all that, and so on.</p>
    
    <p><strong>LOMOV:</strong> But isn't my Guess better? Really, now?</p>
    
    <p><strong>CHUBUKOV:</strong> Don't excite yourself, my precious one. Allow me. Your Guess certainly has his good points. He's purebred, firm on his feet, has well-sprung ribs, and all that. But, my dear man, if you want to know the truth, that dog has two defects: he's old and he's short in the muzzle.</p>
    
    <p><strong>LOMOV:</strong> Excuse me, my heart... Let's take the facts. You will remember that on the Marusinsky hunt my Guess ran neck-and-neck with the Count's dog, while your Squeezer was left a whole verst behind.</p>
    
    <p><strong>CHUBUKOV:</strong> He got left behind because the Count's whipper-in hit him with his whip.</p>
    
    <p><strong>LOMOV:</strong> And with good reason. The dogs are running after a fox, when Squeezer goes and starts worrying a sheep!</p>
    
    <p><strong>CHUBUKOV:</strong> It's not true! My dear fellow, I'm very liable to lose my temper, and so, just because of that, let's stop arguing. You started because everybody is always jealous of everybody else's dogs. Yes, we're all like that! You too, sir, aren't blameless! You no sooner begin with this, that and the other, and all that... I remember everything!</p>
    
    <p><strong>LOMOV:</strong> I remember too!</p>
    
    <p><strong>CHUBUKOV:</strong> [<em>teasing him</em>] I remember, too! What do you remember?</p>
    
    <p><strong>LOMOV:</strong> My heart... my foot's gone to sleep. I can't...</p>
    
    <p><strong>NATALYA:</strong> [<em>teasing</em>] My heart! What sort of a hunter are you? You ought to go and lie on the kitchen oven and catch black beetles, not go after foxes! My heart!</p>
    
    <p><strong>CHUBUKOV:</strong> Yes really, what sort of a hunter are you, anyway? You ought to sit at home with your palpitations, and not go tracking animals. You could go hunting, but you only go to argue with people and interfere with their dogs and so on. Let's change the subject in case I lose my temper. You're not a hunter at all, anyway!</p>
    
    <p><strong>LOMOV:</strong> And are you a hunter? You only go hunting to get in with the Count and to intrigue. Oh, my heart! You're an intriguer!</p>
    
    <p><strong>CHUBUKOV:</strong> What? I am an intriguer? [<em>shouts</em>] Shut up!</p>
    
    <p><strong>LOMOV:</strong> Intriguer!</p>
    
    <p><strong>CHUBUKOV:</strong> Boy! Pup!</p>
    
    <p><strong>LOMOV:</strong> Old rat! Jesuit!</p>
    
    <p><strong>CHUBUKOV:</strong> Shut up or I'll shoot you like a partridge! You fool!</p>
    
    <p><strong>LOMOV:</strong> Everybody knows that — oh, my heart! — your late wife used to beat you... My feet... temples... sparks... I fall, I fall!</p>
    
    <p><strong>CHUBUKOV:</strong> And you're under the slipper of your house-keeper!</p>
    
    <p><strong>LOMOV:</strong> There, there, there... my heart's burst! My shoulders come off! Where is my shoulder? I die. [<em>Falls into an armchair</em>] A doctor!</p>
    
    <p><strong>CHUBUKOV:</strong> Boy! Milksop! Fool! I'm sick! [<em>Drinks water</em>] Sick!</p>
    
    <p><strong>NATALYA:</strong> What sort of a hunter are you? You can't even sit on a horse! [<em>To her father</em>] Papa, what's the matter with him? Papa! Look, Papa! [<em>screams</em>] Ivan Vassilevitch! He's dead!</p>
    
    <p><strong>CHUBUKOV:</strong> I'm sick! I can't breathe! Air!</p>
    
    <p><strong>NATALYA:</strong> He's dead. [<em>Pulls Lomov's sleeve</em>] Ivan Vassilevitch! Ivan Vassilevitch! What have you done to me? He's dead. [<em>Falls into an armchair</em>] A doctor, a doctor! [<em>Hysterics.</em>]</p>
    
    <p><strong>CHUBUKOV:</strong> Oh! What is it? What's the matter?</p>
    
    <p><strong>NATALYA:</strong> [<em>wails</em>] He's dead... dead!</p>
    
    <p><strong>CHUBUKOV:</strong> Who's dead? [<em>Looks at Lomov</em>] So he is! My word! Water! A doctor! [<em>Lifts a tumbler to Lomov's mouth</em>] Drink this! No, he doesn't drink. It means he's dead, and all that. I'm the most unhappy of men! Why don't I put a bullet into my brain? Why haven't I cut my throat yet? What am I waiting for? Give me a knife! Give me a pistol! [<em>Lomov moves</em>] He seems to be coming round. Drink some water! That's right.</p>
    
    <p><strong>LOMOV:</strong> I see stars... mist... where am I?</p>
    
    <p><strong>CHUBUKOV:</strong> Hurry up and get married and — well, to the devil with you! She's willing! [<em>He puts Lomov's hand into his daughter's</em>] She's willing and all that. I give you my blessing and so on. Only leave me in peace!</p>
    
    <p><strong>LOMOV:</strong> [<em>getting up</em>] Eh? What? To whom?</p>
    
    <p><strong>CHUBUKOV:</strong> She's willing! Well? Kiss and be damned to you!</p>
    
    <p><strong>NATALYA:</strong> [<em>wails</em>] He's alive... Yes, yes, I'm willing.</p>
    
    <p><strong>CHUBUKOV:</strong> Kiss each other!</p>
    
    <p><strong>LOMOV:</strong> Eh? Kiss whom? [<em>They kiss</em>] Very nice, too. Excuse me, what's it all about? Oh, now I understand... my heart... stars... I'm happy. Natalya Stepanovna... [<em>Kisses her hand</em>] My foot's gone to sleep.</p>
    
    <p><strong>NATALYA:</strong> I... I'm happy too...</p>
    
    <p><strong>CHUBUKOV:</strong> What a weight off my shoulders, ouf!</p>
    
    <p><strong>NATALYA:</strong> But, still you will admit now that Guess is worse than Squeezer.</p>
    
    <p><strong>LOMOV:</strong> Better!</p>
    
    <p><strong>NATALYA:</strong> Worse!</p>
    
    <p><strong>CHUBUKOV:</strong> Well, that's a way to start your family bliss! Have some champagne!</p>
    
    <p><strong>LOMOV:</strong> He's better!</p>
    
    <p><strong>NATALYA:</strong> Worse! Worse! Worse!</p>
    
    <p><strong>CHUBUKOV:</strong> [<em>trying to shout her down</em>] Champagne! Champagne!</p>
    
    <p>[<em>CURTAIN</em>]</p>
    
    <div class="vocabulary-note">
        <div class="word">pettifogger</div>
        <div class="definition">a lawyer who deals with small or unimportant matters, often in a dishonest way</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">embezzlement</div>
        <div class="definition">the theft of funds placed in one's trust</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">overshot</div>
        <div class="definition">having the upper jaw extending beyond the lower jaw (in dogs)</div>
    </div>
    
    <div class="vocabulary-note">
        <div class="word">verst</div>
        <div class="definition">an old Russian unit of distance equal to about 1.1 kilometers or 0.66 miles</div>
    </div>
    
    <div class="comprehension-check">
        <h3>📝 Final Comprehension Check</h3>
        <div class="comprehension-question">1. What is the second argument between Lomov and Natalya about?</div>
        <div class="comprehension-question">2. How does Chubukov resolve the situation in the end?</div>
        <div class="comprehension-question">3. Does the play end with the characters fully reconciled?</div>
        <div class="comprehension-question">4. What do you think the playwright is satirizing through this play?</div>
    </div>

    <div class="comprehension-check">
        <h3>📝 Major Themes in the Play</h3>
        <div class="comprehension-question">1. The marriage of economic convenience rather than love</div>
        <div class="comprehension-question">2. Human tendency to argue over petty matters</div>
        <div class="comprehension-question">3. The clash between economic interests and personal feelings</div>
        <div class="comprehension-question">4. The absurdity of social conventions</div>
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
    storyBtn.innerHTML = '🔊 Read Play Aloud';
    storyBtn.setAttribute('aria-label', 'Read play aloud');
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
    let currentChunk = "The Proposal, by Anton Chekhov. ";
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
