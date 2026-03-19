// Content for Electoral Politics lesson - Chapter 3

// Why Elections content
const whyElectionsContent = {
    card1: `
        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-newspaper"></i></div>
            <h3 class="feature-title">Card 1 - Assembly Election in Haryana</h3>
            <div class="feature-desc" style="display:none;">
                <p><em>"The time is after midnight. An expectant crowd sitting for the past five hours in a chowk of the town is waiting for its leader to come. The organisers assure and reassure the crowd that he would be here any moment. The crowd stands up whenever a passing vehicle comes that way. It arouses hopes that he has come. The leader is Mr. Devi Lal, chief of the Haryana Sangharsh Samiti, who was to address a meeting in Karnal on Thursday night. The 76-year-old leader, is a very busy man these days. His day starts at 8 a.m. and ends after 11 p.m. … he had already addressed nine election meetings since morning… been constantly addressing public meetings for the past 23 months and preparing for this election."</em></p>

                <button class="interactive-btn" onclick="speakCardContent(this, 'The time is after midnight. An expectant crowd sitting for the past five hours in a chowk of the town is waiting for its leader to come. The organisers assure and reassure the crowd that he would be here any moment. The crowd stands up whenever a passing vehicle comes that way. It arouses hopes that he has come. The leader is Mr. Devi Lal, chief of the Haryana Sangharsh Samiti, who was to address a meeting in Karnal on Thursday night. The 76-year-old leader, is a very busy man these days. His day starts at 8 a.m. and ends after 11 p.m. … he had already addressed nine election meetings since morning… been constantly addressing public meetings for the past 23 months and preparing for this election.')" style="margin: 10px 0;">🔊 Read Aloud</button>

                <p>This newspaper report is about the State assembly election in Haryana in 1987. The State had been ruled by a Congress party led government since 1982. Chaudhary Devi Lal, then an opposition leader, led a movement called 'Nyaya Yudh' (Struggle for Justice) and formed a new party, Lok Dal. His party joined other opposition parties to form a front against the Congress in the elections. In the election campaign, Devi Lal said that if his party won the elections, his government would waive the loans of farmers and small businessmen. He promised that this would be the first action of his government.</p>

                <p>The people were unhappy with the existing government. They were also attracted by Devi Lal's promise. So, when elections were held, they voted overwhelmingly in favour of Lok Dal and its allies. Lok Dal and its partners won 76 out of 90 seats in the State Assembly. Lok Dal alone won 60 seats and thus had a clear majority in the Assembly. The Congress could win only 5 seats.</p>

                <p>Once the election results were announced, the sitting Chief Minister resigned. The newly elected Members of Legislative Assembly (MLAs) of Lok Dal chose Devi Lal as their leader. The Governor invited Devi Lal to be the new Chief Minister. Three days after the election results were declared, he became the Chief Minister. As soon as he became the Chief Minister, his Government issued a Government Order waiving the outstanding loans of small farmers, agricultural labourers and small businessmen. His party ruled the State for four years. The next elections were held in 1991. But this time his party did not win popular support. The Congress won the election and formed the government.</p>
            </div>
            <div style="text-align: center;">
                <button class="interactive-btn" onclick="toggleDesc(this)">See More</button>
            </div>
        </div>
    `,

    card2: `
        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-vote-yea"></i></div>
            <h3 class="feature-title">Card 2 - Why do we need elections?</h3>
            <div class="feature-desc" style="display:none;">
                <p>Elections take place regularly in any democracy. There are more than one hundred countries in the world in which elections take place to choose people's representatives. We also read that elections are held in many countries that are not democratic.</p>

                <p>But why do we need elections? Let us try to imagine a democracy without elections. A rule of the people is possible without any elections if all the people can sit together everyday and take all the decisions. But as we have already seen in Chapter 1, this is not possible in any large community. Nor is it possible for everyone to have the time and knowledge to take decisions on all matters. Therefore in most democracies people rule through their representatives.</p>

                <p>Is there a democratic way of selecting representatives without elections? Let us think of a place where representatives are selected on the basis of age and experience. Or a place where they are chosen on the basis of education or knowledge. There could be some difficulty in deciding on who is more experienced or knowledgable. But let us say the people can resolve these difficulties. Clearly, such a place does not require elections. But can we call this place a democracy? How do we find out if the people like their representatives or not? How do we ensure that these representatives rule as per the wishes of the people? How to make sure that those who the people don't like do not remain their representatives? This requires a mechanism by which people can choose their representatives at regular intervals and change them if they wish to do so. This mechanism is called election.</p>

                <p>Therefore, elections are considered essential in our times for any representative democracy. In an election the voters make many choices: They can choose who will make laws for them. They can choose who will form the government and take major decisions. They can choose the party whose policies will guide the government and law making.</p>
            </div>
            <div style="text-align: center;">
                <button class="interactive-btn" onclick="toggleDesc(this)">See More</button>
            </div>
        </div>
    `,

    card3: `
        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-balance-scale"></i></div>
            <h3 class="feature-title">Card 3 - What makes an election democratic?</h3>
            <div class="feature-desc" style="display:none;">
                <p>Elections can be held in many ways. All democratic countries hold elections. But most non-democratic countries also hold some kind of elections. How do we distinguish democratic elections from any other election? We have discussed this question briefly in Chapter 1. We discussed many examples of countries where elections are held but they can't really be called democratic elections. Let us recall what we learnt there and start with a simple list of the minimum conditions of a democratic election:</p>

                <p>First, everyone should be able to choose. This means that everyone should have one vote and every vote should have equal value. Second, there should be something to choose from. Parties and candidates should be free to contest elections and should offer some real choice to the voters. Third, the choice should be offered at regular intervals. Elections must be held regularly after every few years. Fourth, the candidate preferred by the people should get elected. Fifth, elections should be conducted in a free and fair manner where people can choose as they really wish.</p>

                <p>These might look like very simple and easy conditions. But there are many countries where these are not fulfilled. In this chapter we will apply these conditions to the elections held in our own country to see if we can call these democratic elections.</p>
            </div>
            <div style="text-align: center;">
                <button class="interactive-btn" onclick="toggleDesc(this)">See More</button>
            </div>
        </div>
    `,

    card4: `
        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-users"></i></div>
            <h3 class="feature-title">Card 4 - Is it good to have political competition?</h3>
            <div class="feature-desc" style="display:none;">
                <p>Elections are thus all about political competition. This competition takes various forms. The most obvious form is the competition among political parties. At the constituency level, it takes the form of competition among several candidates. If there is no competition, elections will become pointless.</p>

                <p>But is it good to have political competition? Clearly, an electoral competition has many demerits. It creates a sense of disunity and 'factionalism' in every locality. You would have heard of people complaining of 'party-politics' in your locality. Different political parties and leaders often level allegations against one another. Parties and candidates often use dirty tricks to win elections. Some people say that this pressure to win electoral fights does not allow sensible long-term policies to be formulated. Some good people who may wish to serve the country do not enter this arena. They do not like the idea of being dragged into unhealthy competition.</p>

                <p>Our Constitution makers were aware of these problems. Yet they opted for free competition in elections as the way to select our future leaders. They did so because this system works better in the long run. In an ideal world all political leaders know what is good for the people and are motivated only by a desire to serve them. Political competition is not necessary in such an ideal world. But that is not what happens in real life. Political leaders all over the world, like all other professionals, are motivated by a desire to advance their political careers. They want to remain in power or get power and positions for themselves. They may wish to serve the people as well, but it is risky to depend entirely on their sense of duty. Besides even when they wish to serve the people, they may not know what is required to do so, or their ideas may not match what the people really want.</p>

                <p>How do we deal with this real life situation? One way is to try and improve the knowledge and character of political leaders. The other and more realistic way is to set up a system where political leaders are rewarded for serving the people and punished for not doing so. Who decides this reward or punishment? The simple answer is: the people. This is what electoral competition does. Regular electoral competition provides incentives to political parties and leaders. They know that if they raise issues that people want to be raised, their popularity and chances of victory will increase in the next elections. But if they fail to satisfy the voters with their work they will not be able to win again. So if a political party is motivated only by desire to be in power, even then it will be forced to serve the people. This is a bit like the way market works. Even if a shopkeeper is interested only in his profit, he is forced to give good service to the customers. If he does not, the customer will go to some other shop. Similarly, political competition may cause divisions and some ugliness, but it finally helps to force political parties and leaders to serve the people.</p>
            </div>
            <div style="text-align: center;">
                <button class="interactive-btn" onclick="toggleDesc(this)">See More</button>
            </div>
        </div>
    `
};

// Why Do We Need a Constitution content
const whyConstitutionContent = `
    <div class="features-grid">
        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-question"></i></div>
            <h3 class="feature-title">The South African Example</h3>
            <p class="feature-desc">The South African example is a good way to understand why we need a constitution and what do constitutions do. The oppressor and the oppressed in this new democracy were planning to live together as equals. It was not going to be easy for them to trust each other. They had their fears. They wanted to safeguard their interests. The black majority was keen to ensure that the democratic principle of majority rule was not compromised. They wanted substantial social and economic rights. The white minority was keen to protect its privileges and property.</p>
        </div>

        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-handshake"></i></div>
            <h3 class="feature-title">Reaching a Compromise</h3>
            <p class="feature-desc">After long negotiations both parties agreed to a compromise. The whites agreed to the principle of majority rule and that of one person one vote. They also agreed to accept some basic rights for the poor and the workers. The blacks agreed that majority rule would not be absolute. They agreed that the majority would not take away the property of the white minority. This compromise was not easy. How was this compromise going to be implemented? Even if they managed to trust each other, what was the guarantee that this trust will not be broken in future?</p>
        </div>

        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-scroll"></i></div>
            <h3 class="feature-title">Writing Down the Rules</h3>
            <p class="feature-desc">The only way to build and maintain trust in such a situation is to write down some rules of the game that everyone would abide by. These rules lay down how the rulers are to be chosen in future. These rules also determine what the elected governments are empowered to do and what they cannot do. Finally these rules decide the rights of the citizen. These rules will work only if the winner cannot change them very easily. This is what the South Africans did. They agreed on some basic rules. They also agreed that these rules will be supreme, that no government will be able to ignore these. This set of basic rules is called a constitution.</p>
        </div>

        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-globe"></i></div>
            <h3 class="feature-title">Universal Need for Constitutions</h3>
            <p class="feature-desc">Constitution making is not unique to South Africa. Every country has diverse groups of people. Their relationship may not have been as bad as that between the whites and the blacks in South Africa. But all over the world people have differences of opinion and interests. Whether democratic or not, most countries in the world need to have these basic rules. This applies not just to governments. Any association needs to have its constitution. It could be a club in your area, a cooperative society or a political party, they all need a constitution.</p>
        </div>

        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-book-open"></i></div>
            <h3 class="feature-title">What a Constitution Does</h3>
            <p class="feature-desc">The constitution of a country is a set of written rules that are accepted by all people living together in a country. Constitution is the supreme law that determines the relationship among people living in a territory (called citizens) and also the relationship between the people and government. A constitution does many things:</p>
        </div>

        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-list-ol"></i></div>
            <h3 class="feature-title">Functions of a Constitution</h3>
            <p class="feature-desc">First, it generates a degree of trust and coordination that is necessary for different kind of people to live together; Second, it specifies how the government will be constituted, who will have power to take which decisions; Third, it lays down limits on the powers of the government and tells us what the rights of the citizens are; and Fourth, it expresses the aspirations of the people about creating a good society.</p>
        </div>

        <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-history"></i></div>
            <h3 class="feature-title">Historical Practice</h3>
            <p class="feature-desc">All countries that have constitutions are not necessarily democratic. But all countries that are democratic will have constitutions. After the War of Independence against Great Britain, the Americans gave themselves a constitution. After the Revolution, the French people approved a democratic constitution. Since then it has become a practice in all democracies to have a written constitution.</p>
        </div>
    </div>
`;

// Indian Constitution content
const indianConstitutionContent = {
    making: `
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-map"></i></div>
                <h3 class="feature-title">Making of the Indian Constitution</h3>
                <p class="feature-desc">Like South Africa, India's Constitution was also drawn up under very difficult circumstances. The making of the constitution for a huge and diverse country like India was not an easy affair. At that time the people of India were emerging from the status of subjects to that of citizens. The country was born through a partition on the basis of religious differences. This was a traumatic experience for the people of India and Pakistan. Atleast ten lakh people were killed on both sides of the border in partition related violence.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-crown"></i></div>
                <h3 class="feature-title">Princely States Challenge</h3>
                <p class="feature-desc">There was another problem. The British had left it to the rulers of the princely states to decide whether they wanted to merge with India or with Pakistan or remain independent. The merger of these princely states was a difficult and uncertain task. When the constitution was being written, the future of the country did not look as secure as it does today. The makers of the constitution had anxieties about the present and the future of the country.</p>
            </div>
        </div>
    `,
    
    path: `
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-lightbulb"></i></div>
                <h3 class="feature-title">The Path to Constitution</h3>
                <p class="feature-desc">Despite all these difficulties, there was one big advantage for the makers of the Indian Constitution. Unlike South Africa, they did not have to create a consensus about what a democratic India should look like. Much of this consensus had evolved during the freedom struggle. Our national movement was not merely a struggle against a foreign rule. It was also a struggle to rejuvenate our country and to transform our society and politics. There were sharp differences of opinion within the freedom struggle about the path India should take after Independence. Such differences exist even today. Yet some basic ideas had come to be accepted by almost everyone.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-file-alt"></i></div>
                <h3 class="feature-title">Early Constitutional Drafts</h3>
                <p class="feature-desc">As far back as in 1928, Motilal Nehru and eight other Congress leaders drafted a constitution for India. In 1931, the resolution at the Karachi session of the Indian National Congress dwelt on how independent India's constitution should look like. Both these documents were committed to the inclusion of universal adult franchise, right to freedom and equality and to protecting the rights of minorities in the constitution of independent India. Thus some basic values were accepted by all leaders much before the Constituent Assembly met to deliberate on the Constitution.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-university"></i></div>
                <h3 class="feature-title">Colonial Institutional Experience</h3>
                <p class="feature-desc">The familiarity with political institutions of colonial rule also helped develop an agreement over the institutional design. The British rule had given voting rights only to a few. On that basis the British had introduced very weak legislatures. Elections were held in 1937 to Provincial Legislatures and Ministries all over British India. These were not fully democratic governments. But the experience gained by Indians in the working of the legislative institutions proved to be very useful for the country in setting up its own institutions and working in them. That is why the Indian constitution adopted many institutional details and procedures from colonial laws like the Government of India Act, 1935.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-globe-americas"></i></div>
                <h3 class="feature-title">Global Learning & Adaptation</h3>
                <p class="feature-desc">Years of thinking and deliberation on the framework of the constitution had another benefit. Our leaders gained confidence to learn from other countries, but on our own terms. Many of our leaders were inspired by the ideals of French Revolution, the practice of parliamentary democracy in Britain and the Bill of Rights in the US. The socialist revolution in Russia had inspired many Indians to think of shaping a system based on social and economic equality. Yet they were not simply imitating what others had done. At each step they were questioning whether these things suited our country. All these factors contributed to the making of our Constitution.</p>
            </div>
        </div>
    `,
    
    assembly: `
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-users"></i></div>
                <h3 class="feature-title">The Constituent Assembly</h3>
                <p class="feature-desc">The drafting of the document called the constitution was done by an assembly of elected representatives called the Constituent Assembly. Elections to the Constituent Assembly were held in July 1946. Its first meeting was held in December 1946. Soon after, the country was divided into India and Pakistan. The Constituent Assembly was also divided into the Constituent Assembly of India and that of Pakistan. The Constituent Assembly that wrote the Indian constitution had 299 members. The Assembly adopted the Constitution on 26 November 1949 but it came into effect on 26 January 1950. To mark this day we celebrate January 26 as Republic Day every year.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-check-circle"></i></div>
                <h3 class="feature-title">Why Accept This Constitution?</h3>
                <p class="feature-desc">Why should we accept the Constitution made by this Assembly more than seven decades ago? We have already noted one reason above. The Constitution does not reflect the views of its members alone. It expresses a broad consensus of its time. Many countries of the world have had to rewrite their Constitution afresh because the basic rules were not acceptable to all major social groups or political parties. In some other countries, the Constitution exists as a mere piece of paper. No one actually follows it. The experience of our Constitution is different. Over the last half a century, several groups have questioned some provisions of the Constitution. But no large social group or political party has ever questioned the legitimacy of the Constitution itself. This is an unusual achievement for any constitution.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-map-marked-alt"></i></div>
                <h3 class="feature-title">People's Representation</h3>
                <p class="feature-desc">The second reason for accepting the Constitution is that the Constituent Assembly represented the people of India. There was no universal adult franchise at that time. So the Constituent Assembly could not have been chosen directly by all the people of India. It was elected mainly by the members of the existing Provincial Legislatures that we mentioned above. This ensured a fair geographical share of members from all the regions of the country. The Assembly was dominated by the Indian National Congress, the party that led India's freedom struggle. But the Congress itself included a variety of political groups and opinions. The Assembly had many members who did not agree with the Congress. In social terms too, the Assembly represented members from different language groups, castes, classes, religions and occupations. Even if the Constituent Assembly was elected by universal adult franchise, its composition would not have been very different.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-comments"></i></div>
                <h3 class="feature-title">Systematic & Consensual Process</h3>
                <p class="feature-desc">Finally, the manner in which the Constituent Assembly worked gives sanctity to the Constitution. The Constituent Assembly worked in a systematic, open and consensual manner. First some basic principles were decided and agreed upon. Then a Drafting Committee chaired by Dr. B.R. Ambedkar prepared a draft constitution for discussion. Several rounds of thorough discussion took place on the Draft Constitution, clause by clause. More than two thousand amendments were considered. The members deliberated for 114 days spread over three years. Every document presented and every word spoken in the Constituent Assembly has been recorded and preserved. These are called 'Constituent Assembly Debates'. When printed, these debates are 12 bulky volumes! These debates provide the rationale behind every provision of the Constitution. These are used to interpret the meaning of the Constitution.</p>
            </div>
        </div>
    `
};

// Preambles
const preambles = {
    usa: `
        <div class="preamble-container">
            <h3 class="preamble-title">Preamble of the United States of America</h3>
            <div class="preamble-text" id="usa-preamble">
                <p>We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.</p>
            </div>
            <div class="button-container">
                <button class="interactive-btn" onclick="readPreamble('usa-preamble')">🔊 Read Aloud</button>
            </div>
        </div>
    `,
    
    southafrica: `
        <div class="preamble-container">
            <h3 class="preamble-title">Preamble of South Africa</h3>
            <div class="preamble-text" id="sa-preamble">
                <p>We, the people of South Africa,</p>
                <p>Recognise the injustices of our past;</p>
                <p>Honour those who suffered for justice and freedom in our land;</p>
                <p>Respect those who have worked to build and develop our country; and</p>
                <p>Believe that South Africa belongs to all who live in it, united in our diversity.</p>
                <p>We therefore, through our freely elected representatives, adopt this Constitution as the supreme law of the Republic so as to —</p>
                <p>Heal the divisions of the past and establish a society based on democratic values, social justice and fundamental human rights;</p>
                <p>Lay the foundations for a democratic and open society in which government is based on the will of the people and every citizen is equally protected by law;</p>
                <p>Improve the quality of life of all citizens and free the potential of each person; and</p>
                <p>Build a united and democratic South Africa able to take its rightful place as a sovereign state in the family of nations.</p>
                <p>May God protect our people.</p>
                <p>Nkosi Sikelel' iAfrika. Morena boloka setjhaba sa heso.</p>
                <p>God seën Suid-Afrika. God bless South Africa.</p>
                <p>Mudzimu fhatutshedza Afurika. Hosi katekisa Afrika.</p>
            </div>
            <div class="button-container">
                <button class="interactive-btn" onclick="readPreamble('sa-preamble')">🔊 Read Aloud</button>
            </div>
        </div>
    `,
    
    india: `
        <div class="preamble-container">
            <h3 class="preamble-title">Preamble of India</h3>
            <div class="preamble-text" id="india-preamble">
                <p><span class="highlight">WE, THE PEOPLE OF INDIA</span>, having solemnly resolved to constitute India into a <span class="highlight">SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC</span> and to secure to all its citizens:</p>
                <p><span class="highlight">JUSTICE</span>, social, economic and political;</p>
                <p><span class="highlight">LIBERTY</span> of thought, expression, belief, faith and worship;</p>
                <p><span class="highlight">EQUALITY</span> of status and of opportunity;</p>
                <p>and to promote among them all</p>
                <p><span class="highlight">FRATERNITY</span> assuring the dignity of the individual and the unity and integrity of the Nation;</p>
                <p>IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.</p>
                <p><small>Note: The terms 'Socialist' and 'Secular' were added in Preamble through the 42nd Constitutional Amendment in 1976.</small></p>
            </div>
            <div class="button-container">
                <button class="interactive-btn" onclick="readPreamble('india-preamble')">🔊 Read Aloud</button>
            </div>
        </div>
    `
};

// Key terms from the Preamble
const preambleTerms = [
    {
        term: "WE, THE PEOPLE OF INDIA",
        meaning: "The constitution has been drawn up and enacted by the people through their representatives, and not handed down to them by a king or any outside powers."
    },
    {
        term: "SOVEREIGN",
        meaning: "People have supreme right to make decisions on internal as well as external matters. No external power can dictate the government of India."
    },
    {
        term: "REPUBLIC",
        meaning: "The head of the state is an elected person and not a hereditary position."
    },
    {
        term: "JUSTICE",
        meaning: "Citizens cannot be discriminated on the grounds of caste, religion and gender. Social inequalities have to be reduced. Government should work for the welfare of all, especially of the disadvantaged groups."
    },
    {
        term: "SOCIALIST",
        meaning: "Wealth is generated socially and should be shared equally by society. Government should regulate the ownership of land and industry to reduce socio-economic inequalities."
    },
    {
        term: "SECULAR",
        meaning: "Citizens have complete freedom to follow any religion. But there is no official religion. Government treats all religious beliefs and practices with equal respect."
    },
    {
        term: "DEMOCRATIC",
        meaning: "A form of government where people enjoy equal political rights, elect their rulers and hold them accountable. The government is run according to some basic rules."
    },
    {
        term: "LIBERTY",
        meaning: "There are no unreasonable restrictions on the citizens in what they think, how they wish to express their thoughts and the way they wish to follow up their thoughts in action."
    },
    {
        term: "EQUALITY",
        meaning: "All are equal before the law. The traditional social inequalities have to be ended. The government should ensure equal opportunity for all."
    },
    {
        term: "FRATERNITY",
        meaning: "All of us should behave as if we are members of the same family. No one should treat a fellow citizen as inferior."
    }
];

// Constitution makers
const constitutionMakers = [
    {
        name: "Dr. B.R. Ambedkar",
        role: "Chairman of the Drafting Committee",
        description: "Known as the Father of the Indian Constitution, Dr. Ambedkar was a jurist, economist, politician and social reformer who fought against social discrimination. He was the chief architect of the Indian Constitution.",
        image: "images/ambedkar.png"
    },
    {
        name: "Jawaharlal Nehru",
        role: "Member of the Constituent Assembly",
        description: "The first Prime Minister of India, Nehru was a central figure in Indian politics before and after independence. He was a pivotal figure in the Constituent Assembly and advocated for a progressive, secular constitution.",
        image: "images/nehru.png"
    },
    {
        name: "Rajendra Prasad",
        role: "President of the Constituent Assembly",
        description: "Dr. Rajendra Prasad presided over the Constituent Assembly and later became the first President of India. His leadership was crucial in navigating the complex process of constitution-making.",
        image: "images/prasad.png"
    },
    {
        name: "Sardar Vallabhbhai Patel",
        role: "Member of the Constituent Assembly",
        description: "Known as the 'Iron Man of India', Patel played a key role in the integration of princely states into the Indian Union. His contributions to the Constituent Assembly were significant.",
        image: "images/patel.png",
    }
];

// Quiz questions - Sectors of the Indian Economy
const quizQuestions = [
    {
        question: "The sectors are classified into public and private sector on the basis of:",
        options: [
            "(i) employment conditions",
            "(ii) the nature of economic activity",
            "(iii) ownership of enterprises",
            "(iv) number of workers employed in the enterprise"
        ],
        correctAnswer: 2  // (iii) ownership of enterprises
    },
    {
        question: "Production of a commodity, mostly through the natural process, is an activity in _________ sector.",
        options: [
            "(i) primary",
            "(ii) secondary",
            "(iii) tertiary",
            "(iv) information technology"
        ],
        correctAnswer: 0  // (i) primary
    },
    {
        question: "GDP is the total value of _________ produced during a particular year.",
        options: [
            "(i) all goods and services",
            "(ii) all final goods and services",
            "(iii) all intermediate goods and services",
            "(iv) all intermediate and final goods and services"
        ],
        correctAnswer: 1  // (ii) all final goods and services
    },
    {
        question: "In terms of GVA the share of tertiary sector in 2017–18 is between _________ per cent.",
        options: [
            "(i) 20 to 30",
            "(ii) 30 to 40",
            "(iii) 50 to 60",
            "(iv) 60 to 70"
        ],
        correctAnswer: 2  // (iii) 50 to 60
    },
];

// Matching activity data
const matchingTerms = [
    {
        term: "Sovereign",
        definition: "People have supreme right to make decisions."
    },
    {
        term: "Republic",
        definition: "Head of the state is an elected person."
    },
    {
        term: "Fraternity",
        definition: "People should live like brothers and sisters."
    },
    {
        term: "Secular",
        definition: "Government will not favor any religion."
    },
    {
        term: "Democratic",
        definition: "People elect their rulers who are accountable to them."
    },
    {
        term: "Socialist",
        definition: "Wealth should be shared equally in society."
    }
];

// Function to load Policy Decision content - Not needed as content is already in HTML
// function loadPolicyDecisionContent() {
//     const policyDecisionElement = document.getElementById('policy-decision-content');
//
//     if (policyDecisionElement) {
//         policyDecisionElement.innerHTML = policyDecisionContent.card1 + policyDecisionContent.card2 + policyDecisionContent.card3;
//     } else {
//         console.error('Element with ID "policy-decision-content" not found');
//     }
// }

// Function to load Why Constitution content
function loadWhyConstitutionContent() {
    document.getElementById('why-constitution-content').innerHTML = whyConstitutionContent;
}

// Function to load Indian Constitution content
function loadIndianConstitutionContent() {
    document.getElementById('making-content').innerHTML = indianConstitutionContent.making;
    document.getElementById('path-content').innerHTML = indianConstitutionContent.path;
    document.getElementById('assembly-content').innerHTML = indianConstitutionContent.assembly;
}

// Function to load Preambles
function loadPreambles() {
    document.getElementById('usa-preamble-container').innerHTML = preambles.usa;
    document.getElementById('sa-preamble-container').innerHTML = preambles.southafrica;
    document.getElementById('india-preamble-container').innerHTML = preambles.india;
}

// Function to load Preamble terms
function loadPreambleTerms() {
    const termsContainer = document.getElementById('preamble-terms');
    let termsHTML = '<div class="card-container">';

    preambleTerms.forEach((item, index) => {
        termsHTML += `
            <div class="expand-card" data-term="${item.term}" onclick="toggleCardExpansion(this)">
                <div class="expand-card-header">
                    <h3>${item.term}</h3>
                    <span class="expand-icon">▼</span>
                </div>
                <div class="expand-card-content">
                    <p>${item.meaning}</p>
                </div>
            </div>
        `;
    });

    termsHTML += '</div>';
    termsContainer.innerHTML = termsHTML;
}

// Function to load Constitution makers
function loadConstitutionMakers() {
    const makersContainer = document.getElementById('constitution-makers');
    let makersHTML = '';
    
    constitutionMakers.forEach(maker => {
        makersHTML += `
            <div class="maker-card">
                <div class="maker-image">
                    <img src="${maker.image}" alt="${maker.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="maker-info">
                    <h3>${maker.name}</h3>
                    <h4>${maker.role}</h4>
                    <p>${maker.description}</p>
                </div>
            </div>
        `;
    });
    
    makersContainer.innerHTML = makersHTML;
}

// Function to load quiz questions
function loadQuizQuestions() {
    const quizContainer = document.getElementById('quiz-container');

    // Initialize quiz variables
    currentQuestionIndex = 0;
    userAnswers = [];
    quizCompleted = false;

    // Show first question (navigation buttons are included in showCurrentQuestion)
    showCurrentQuestion();
}

// Function to load matching activity
function loadMatchingActivity() {
    const leftColumn = document.getElementById('match-terms');
    const rightColumn = document.getElementById('match-definitions');
    
    let termsHTML = '';
    let definitionsHTML = '';
    
    // Shuffle the terms
    const shuffledTerms = [...matchingTerms].sort(() => Math.random() - 0.5);
    const shuffledDefs = [...shuffledTerms].sort(() => Math.random() - 0.5);
    
    shuffledTerms.forEach((item, index) => {
        termsHTML += `
            <div class="match-item" data-match="${item.term}" onclick="selectMatch(this, 'term')">
                ${item.term}
            </div>
        `;
        
        definitionsHTML += `
            <div class="match-item" data-match="${shuffledDefs[index].term}" onclick="selectMatch(this, 'def')">
                ${shuffledDefs[index].definition}
            </div>
        `;
    });
    
    leftColumn.innerHTML = termsHTML;
    rightColumn.innerHTML = definitionsHTML;
}

// Function to toggle card expansion
function toggleCardExpansion(cardElement) {
    const content = cardElement.querySelector('.expand-card-content');
    const icon = cardElement.querySelector('.expand-icon');

    if (cardElement.classList.contains('expanded')) {
        // Collapse
        cardElement.classList.remove('expanded');
        content.style.maxHeight = '0';
        icon.textContent = '▼';
    } else {
        // Expand
        cardElement.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '▲';
    }
}

// Initialize all content when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // loadPolicyDecisionContent(); // Policy decision content is already in HTML
    loadPreambles();
    loadPreambleTerms();
    loadConstitutionMakers();
    loadQuizQuestions();
    loadMatchingActivity();
});
