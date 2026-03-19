// Content for Constitutional Design lesson - Chapter 2

// South African Constitution content
const southAfricaContent = {
    struggle: `
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-fist-raised"></i></div>
                <h3 class="feature-title">Struggle Against Apartheid</h3>
                <div class="feature-desc" style="display:none;">
                    <p>Apartheid was the name of a system of racial discrimination unique to South Africa. The white Europeans imposed this system on South Africa. During the seventeenth and eighteenth centuries, the trading companies from Europe occupied it with arms and force, in the way they occupied India. But unlike India, a large number of 'whites' had settled in South Africa and became the local rulers.</p>

                    <p>The system of apartheid divided the people and labelled them on the basis of their skin colour. The native people of South Africa are black in colour. They made up about three-fourth of the population and were called 'blacks'. Besides these two groups, there were people of mixed races who were called 'coloured' and people who migrated from India.</p>

                    <p>The white rulers treated all non-whites as inferiors. The non-whites did not have voting rights. The apartheid system was particularly oppressive for the blacks. They were forbidden from living in white areas. They could work in white areas only if they had a permit. Trains, buses, taxis, hotels, hospitals, schools and colleges, libraries, cinema halls, theatres, beaches, swimming pools, public toilets, were all separate for the whites and blacks. This was called segregation. They could not even visit the churches where the whites worshipped. Blacks could not form associations or protest against the terrible treatment.</p>

                    <p>Since 1950, the blacks, coloured and Indians fought against the apartheid system. They launched protest marches and strikes. The African National Congress (ANC) was the umbrella organisation that led the struggle against the policies of segregation. This included many workers' unions and the Communist Party. Many sensitive whites also joined the ANC to oppose apartheid and played a leading role in this struggle. Several countries denounced apartheid as unjust and racist. But the white racist government continued to rule by detaining, torturing and killing thousands of black and coloured people.</p>
                </div>
                <div style="text-align: center;">
                    <button class="interactive-btn" onclick="toggleDesc(this)">See More</button>
                </div>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-flag"></i></div>
                <h3 class="feature-title">Towards a New Constitution</h3>
                <div class="feature-desc" style="display:none;">
                    <p>As protests and struggles against apartheid had increased, the government realised that they could no longer keep the blacks under their rule through repression. The white regime changed its policies. Discriminatory laws were repealed. Ban on political parties and restrictions on the media were lifted. After 28 years of imprisonment, Nelson Mandela walked out of the jail as a free man. Finally, at the midnight of 26 April 1994, the new national flag of the Republic of South Africa was unfurled marking the newly born democracy in the world. The apartheid government came to an end, paving way for the formation of a multi-racial government.</p>

                    <p>After the emergence of the new democratic South Africa, black leaders appealed to fellow blacks to forgive the whites for the atrocities they had committed while in power. They said let us build a new South Africa based on equality of all races and men and women, on democratic values, social justice and human rights. The party that ruled through oppression and brutal killings and the party that led the freedom struggle sat together to draw up a common constitution.</p>

                    <p>After two years of discussion and debate they came out with one of the finest constitutions the world has ever had. This constitution gave to its citizens the most extensive rights available in any country. Together, they decided that in the search for a solution to the problems, nobody should be excluded, no one should be treated as a demon. They agreed that everybody should become part of the solution, whatever they might have done or represented in the past. The preamble to the South African Constitution sums up this spirit.</p>
                </div>
                <div style="text-align: center;">
                    <button class="interactive-btn" onclick="toggleDesc(this)">See More</button>
                </div>
            </div>
        </div>
    `,

    quotes: `
        <div class="quote-section">
            <div class="quote-card">
                <div class="quote-text">
                    "I have fought against white domination and I have fought against black domination. I have cherished the ideal of a democratic and free society in which all persons live together in harmony and with equal opportunities. It is an ideal which I hope to live for and to achieve. But if needs be, it is an ideal for which I am prepared to die."
                </div>
                <div class="quote-author">- Nelson Mandela</div>
                <div class="button-container">
                    <button class="interactive-btn" onclick="readQuote(this.parentElement.parentElement)">🔊 Read Aloud</button>
                </div>
            </div>

            <div class="quote-card">
                <div class="quote-text">
                    "The Constitution of South Africa speaks of both the past and the future. On the one hand, it is a solemn pact in which we, as South Africans, declare to one another that we shall never permit a repetition of our racist, brutal and repressive past. But it is more than that. It is also a charter for the transformation of our country into one which is truly shared by all its people — a country which in the fullest sense belongs to all of us, black and white, women and men."
                </div>
                <div class="quote-author">- Nelson Mandela</div>
                <div class="button-container">
                    <button class="interactive-btn" onclick="readQuote(this.parentElement.parentElement)">🔊 Read Aloud</button>
                </div>
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

// Quiz questions - Constitutional Design
const quizQuestions = [
    {
        question: "Which of these is not a valid reason for why we need a constitution?",
        options: [
            "a) It generates trust and coordination among people living together.",
            "b) It specifies how the government will be constituted and who will have power.",
            "c) It lays down limits on government powers and tells us about citizens' rights.",
            "d) It ensures that the same political party always wins elections."
        ],
        correctAnswer: 3  // d) It ensures that the same political party always wins elections.
    },
    {
        question: "What was the main reason for the struggle against apartheid in South Africa?",
        options: [
            "a) Economic inequality between different regions.",
            "b) Racial discrimination and segregation policies.",
            "c) Disagreement over the country's official language.",
            "d) Conflict between different religious groups."
        ],
        correctAnswer: 1  // b) Racial discrimination and segregation policies.
    },
];

// Matching activity data - Constitutional Design concepts
const matchingTerms = [
    {
        term: "Constitution",
        definition: "The supreme law of a country that determines the relationship between people and government."
    },
    {
        term: "Apartheid",
        definition: "A system of racial discrimination and segregation practiced in South Africa until 1994."
    },
    {
        term: "Constituent Assembly",
        definition: "An assembly of elected representatives that writes a constitution for a country."
    },
    {
        term: "Preamble",
        definition: "An introductory statement in a constitution that states the reasons and guiding values."
    },
    {
        term: "Sovereign",
        definition: "The supreme right of people to make decisions on internal and external matters without external interference."
    },
    {
        term: "Secular",
        definition: "Citizens have complete freedom to follow any religion with no official state religion."
    }
];

// Function to load South African Constitution content
function loadSouthAfricaContent() {
    document.getElementById('struggle-content').innerHTML = southAfricaContent.struggle;
    document.getElementById('quotes-content').innerHTML = southAfricaContent.quotes;
}

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
    // Load Constitutional Design content
    loadSouthAfricaContent();
    loadWhyConstitutionContent();
    loadIndianConstitutionContent();
    loadPreambles();
    loadPreambleTerms();
    loadConstitutionMakers();
    loadQuizQuestions();
    loadMatchingActivity();
});
