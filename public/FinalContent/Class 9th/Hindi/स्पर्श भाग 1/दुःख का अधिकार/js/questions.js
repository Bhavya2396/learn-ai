/**
 * Questions for दुःख का अधिकार Interactive Lesson
 */

// Questions data
const questionsData = {
    oral: [
        {
            question: "किसी व्यक्ति की पोशाक को देखकर हमें क्या पता चलता है?",
            options: [
                "उसकी आयु और शिक्षा",
                "उसकी सामाजिक स्थिति और दर्जा",
                "उसका नाम और पता",
                "उसकी पसंद और नापसंद"
            ],
            correct: 1,
            answer: "किसी व्यक्ति की पोशाक को देखकर हमें उसकी सामाजिक स्थिति, आर्थिक स्थिति और समाज में उसके दर्जे का पता चलता है।"
        },
        {
            question: "खरबूजे बेचनेवाली स्त्री से कोई खरबूजे क्यों नहीं खरीद रहा था?",
            options: [
                "क्योंकि खरबूजे खराब थे",
                "क्योंकि वह महंगे दाम माँग रही थी",
                "क्योंकि वह रो रही थी और लोगों को लगता था कि उसके घर में सूतक है",
                "क्योंकि लोगों को खरबूजे पसंद नहीं थे"
            ],
            correct: 2,
            answer: "खरबूजे बेचनेवाली स्त्री से कोई खरबूजे इसलिए नहीं खरीद रहा था क्योंकि वह रो रही थी और लोगों को लगता था कि उसके घर में सूतक है।"
        },
        {
            question: "उस स्त्री को देखकर लेखक को कैसा लगा?",
            options: [
                "लेखक के मन में व्यथा उठी और वे उसके रोने का कारण जानना चाहते थे",
                "लेखक को कोई फर्क नहीं पड़ा",
                "लेखक को गुस्सा आया",
                "लेखक को डर लगा"
            ],
            correct: 0,
            answer: "उस स्त्री को देखकर लेखक के मन में एक व्यथा-सी उठी और वे उसके रोने का कारण जानना चाहते थे।"
        },
        {
            question: "उस स्त्री के लड़के की मृत्यु का कारण क्या था?",
            options: [
                "बीमारी",
                "दुर्घटना",
                "साँप का डंसना",
                "बुखार"
            ],
            correct: 2,
            answer: "उस स्त्री के लड़के की मृत्यु का कारण साँप का डंसना था। वह खरबूजे चुनते समय साँप के पैर पड़ गया था।"
        },
        {
            question: "बुढ़िया को कोई क्यों उधार नहीं देता?",
            options: [
                "क्योंकि वह बहुत गरीब थी",
                "क्योंकि वह बूढ़ी थी",
                "क्योंकि वह बीमार थी",
                "क्योंकि उसका बेटा मर गया था और अब उसके पास कोई कमाने वाला नहीं था"
            ],
            correct: 3,
            answer: "बुढ़िया को कोई उधार नहीं देता क्योंकि उसका बेटा मर गया था और अब उसके पास कोई कमाने वाला नहीं था।"
        }
    ],
    written: {
        short: [
            {
                question: "मनुष्य के जीवन में पोशाक का क्या महत्त्व है?",
                options: [
                    "यह उसकी आयु और शिक्षा दिखाती है",
                    "यह उसके स्वास्थ्य का संकेत देती है",
                    "यह उसकी सामाजिक स्थिति, आर्थिक स्थिति और समाज में उसके दर्जे को निश्चित करती है",
                    "यह उसकी पसंद और नापसंद दिखाती है"
                ],
                correct: 2,
                answer: "मनुष्य के जीवन में पोशाक का बहुत महत्त्व है। यह उसकी सामाजिक स्थिति, आर्थिक स्थिति और समाज में उसके दर्जे को निश्चित करती है। पोशाक हमारे लिए अनेक बंद दरवाजे खोल देती है।"
            },
            {
                question: "पोशाक हमारे लिए कब बंधन और अड़चन बन जाती है?",
                options: [
                    "जब हम काम पर जाते हैं",
                    "जब हम जरा नीचे झुककर समाज की निचली श्रेणियों की अनुभूति को समझना चाहते हैं",
                    "जब हम घर से बाहर निकलते हैं",
                    "जब हम स्कूल जाते हैं"
                ],
                correct: 1,
                answer: "पोशाक हमारे लिए तब बंधन और अड़चन बन जाती है जब हम जरा नीचे झुककर समाज की निचली श्रेणियों की अनुभूति को समझना चाहते हैं।"
            },
            {
                question: "लेखक उस स्त्री के रोने का कारण क्यों नहीं जान पाया?",
                options: [
                    "क्योंकि फुटपाथ पर उसके समीप बैठ सकने में उनकी पोशाक ही व्यवधान बन खड़ी हो गई थी",
                    "क्योंकि वह बहुत दूर थी",
                    "क्योंकि वह बोल नहीं रही थी",
                    "क्योंकि वहाँ बहुत शोर था"
                ],
                correct: 0,
                answer: "लेखक उस स्त्री के रोने का कारण इसलिए नहीं जान पाया क्योंकि फुटपाथ पर उसके समीप बैठ सकने में उनकी पोशाक ही व्यवधान बन खड़ी हो गई थी।"
            },
            {
                question: "भगवाना अपने परिवार का निर्वाह कैसे करता था?",
                options: [
                    "नौकरी करके",
                    "व्यापार करके",
                    "खेती करके",
                    "शहर के पास डेढ़ बीघा भर जमीन में कछियारी करके और खरबूजों की डलिया बाजार में पहुँचाकर"
                ],
                correct: 3,
                answer: "भगवाना शहर के पास डेढ़ बीघा भर जमीन में कछियारी करके और खरबूजों की डलिया बाजार में पहुँचाकर अपने परिवार का निर्वाह करता था।"
            },
            {
                question: "लड़के की मृत्यु के दूसरे ही दिन बुढ़िया खरबूजे बेचने क्यों चल पड़ी?",
                options: [
                    "क्योंकि वह बहुत गरीब थी",
                    "क्योंकि वह बूढ़ी थी",
                    "क्योंकि वह बीमार थी",
                    "क्योंकि घर में खाने के लिए कुछ नहीं था और उसे दुअन्नी-चवन्नी भी कोई उधार नहीं देता था"
                ],
                correct: 3,
                answer: "लड़के की मृत्यु के दूसरे ही दिन बुढ़िया खरबूजे बेचने चल पड़ी क्योंकि घर में खाने के लिए कुछ नहीं था और उसे दुअन्नी-चवन्नी भी कोई उधार नहीं देता था।"
            },
            {
                question: "बुढ़िया के दुःख को देखकर लेखक को अपने पड़ोस की संभ्रांत महिला की याद क्यों आई?",
                options: [
                    "क्योंकि दोनों एक ही उम्र की थीं",
                    "क्योंकि दोनों में पुत्र-वियोग का दुःख था, लेकिन दोनों की स्थिति में बहुत अंतर था",
                    "क्योंकि दोनों एक ही जगह रहती थीं",
                    "क्योंकि दोनों एक ही काम करती थीं"
                ],
                correct: 1,
                answer: "बुढ़िया के दुःख को देखकर लेखक को अपने पड़ोस की संभ्रांत महिला की याद इसलिए आई क्योंकि दोनों में पुत्र-वियोग का दुःख था, लेकिन दोनों की स्थिति में बहुत अंतर था।"
            }
        ],
        medium: [
            {
                question: "बाजार के लोग खरबूजे बेचनेवाली स्त्री के बारे में क्या-क्या कह रहे थे?",
                options: [
                    "सभी ने कहा कि वह बहुत गरीब है",
                    "एक ने कहा कि जवान लड़के के मरे पूरा दिन नहीं बीता और यह बेहया दूकान लगा बैठी है, दूसरे ने कहा कि जैसी नीयत होती है अल्ला भी वैसी ही बरकत देता है",
                    "सभी ने कहा कि वह बहुत बूढ़ी है",
                    "सभी ने कहा कि वह बहुत बीमार है"
                ],
                correct: 1,
                answer: "बाजार के लोग खरबूजे बेचनेवाली स्त्री के बारे में बहुत कुछ कह रहे थे। एक आदमी ने कहा कि जवान लड़के के मरे पूरा दिन नहीं बीता और यह बेहया दूकान लगा बैठी है। दूसरे ने कहा कि जैसी नीयत होती है अल्ला भी वैसी ही बरकत देता है। तीसरे ने कहा कि ये कमीने लोग रोटी के टुकड़े पर जान देते हैं। लाला जी ने कहा कि सूतक के दिनों में बाजार में आना गलत है।"
            },
            {
                question: "पास-पड़ोस की दुकानों से पूछने पर लेखक को क्या पता चला?",
                options: [
                    "वह बहुत गरीब था",
                    "वह बहुत बूढ़ा था",
                    "वह बहुत बीमार था",
                    "वह तेईस बरस का जवान लड़का था, घर में उसकी बहू और पोता-पोती हैं, लड़का शहर के पास डेढ़ बीघा भर जमीन में कछियारी करके परिवार का निर्वाह करता था"
                ],
                correct: 3,
                answer: "पास-पड़ोस की दुकानों से पूछने पर लेखक को पता चला कि वह तेईस बरस का जवान लड़का था। घर में उसकी बहू और पोता-पोती हैं। लड़का शहर के पास डेढ़ बीघा भर जमीन में कछियारी करके परिवार का निर्वाह करता था। खरबूजों की डलिया बाजार में पहुँचाकर कभी लड़का स्वयं सौदे के पास बैठ जाता, कभी माँ बैठ जाती।"
            },
            {
                question: "लड़के को बचाने के लिए बुढ़िया माँ ने क्या-क्या उपाय किए?",
                options: [
                    "वह डॉक्टर को बुलाई",
                    "वह अस्पताल ले गई",
                    "वह दवाई दी",
                    "वह बावली होकर ओझा को बुला लाई, झाड़ना-फूँकना हुआ, नागदेव की पूजा हुई, पूजा के लिए दान-दक्षिणा चाहिए थी"
                ],
                correct: 3,
                answer: "लड़के को बचाने के लिए बुढ़िया माँ ने कई उपाय किए। वह बावली होकर ओझा को बुला लाई। झाड़ना-फूँकना हुआ। नागदेव की पूजा हुई। पूजा के लिए दान-दक्षिणा चाहिए थी, इसलिए घर में जो कुछ आटा और अनाज था, वह सब दान-दक्षिणा में उठ गया।"
            },
            {
                question: "लेखक ने बुढ़िया के दुःख का अंदाजा कैसे लगाया?",
                options: [
                    "अपने अनुभव से",
                    "अपनी कल्पना से",
                    "अपने ज्ञान से",
                    "अपने पड़ोस की संभ्रांत महिला के दुःख से, जो पुत्र की मृत्यु के बाद अढाई मास तक पलंग से उठ न सकी थी"
                ],
                correct: 3,
                answer: "लेखक ने बुढ़िया के दुःख का अंदाजा अपने पड़ोस की संभ्रांत महिला के दुःख से लगाया। वह महिला पुत्र की मृत्यु के बाद अढाई मास तक पलंग से उठ न सकी थी। उन्हें पंद्रह-पंद्रह मिनट बाद पुत्र-वियोग से मूर्छा आ जाती थी। दो-दो डॉक्टर हरदम सिरहाने बैठे रहते थे।"
            },
            {
                question: "इस पाठ का शीर्षक 'दुःख का अधिकार' कहाँ तक सार्थक है?",
                options: [
                    "बिल्कुल सार्थक नहीं है",
                    "कुछ हद तक सार्थक है",
                    "पूरी तरह सार्थक नहीं है",
                    "बहुत सार्थक है क्योंकि कहानी में दिखाया गया है कि दुःख की अनुभूति सभी को समान रूप से होती है, लेकिन समाज में कुछ लोगों को दुःख मनाने का अधिकार नहीं मिलता"
                ],
                correct: 3,
                answer: "इस पाठ का शीर्षक 'दुःख का अधिकार' बहुत सार्थक है। यह शीर्षक इसलिए सार्थक है क्योंकि कहानी में दिखाया गया है कि दुःख की अनुभूति सभी को समान रूप से होती है, लेकिन समाज में कुछ लोगों को दुःख मनाने का अधिकार नहीं मिलता। गरीब लोगों को अपने दुःख को भी छुपाना पड़ता है क्योंकि उनके पास दुःख मनाने की सुविधा नहीं होती।"
            }
        ]
    },
    meanings: [
        {
            text: "जैसे वायु की लहरें कटी हुई पतंग को सहसा भूमि पर नहीं गिर जाने देतीं उसी तरह खास परिस्थितियों में हमारी पोशाक हमें झुक सकने से रोकती रहती है।",
            options: [
                "इस वाक्य का आशय है कि पोशाक हमेशा अच्छी होनी चाहिए",
                "इस वाक्य का आशय है कि पोशाक से कोई फर्क नहीं पड़ता",
                "इस वाक्य का आशय है कि पोशाक बहुत महंगी होती है",
                "इस वाक्य का आशय है कि जिस तरह हवा की लहरें कटी हुई पतंग को तुरंत नीचे नहीं गिरने देतीं, उसी तरह कुछ विशेष परिस्थितियों में हमारी पोशाक हमें निचली श्रेणियों के लोगों के साथ घुलने-मिलने से रोकती है"
            ],
            correct: 3,
            meaning: "इस वाक्य का आशय है कि जिस तरह हवा की लहरें कटी हुई पतंग को तुरंत नीचे नहीं गिरने देतीं, उसी तरह कुछ विशेष परिस्थितियों में हमारी पोशाक हमें निचली श्रेणियों के लोगों के साथ घुलने-मिलने से रोकती है। यह पोशाक हमारे लिए बंधन बन जाती है।"
        },
        {
            text: "इनके लिए बेटा-बेटी, खसम-लुगाई, धर्म-ईमान सब रोटी का टुकड़ा है।",
            options: [
                "इस वाक्य का आशय है कि सभी लोग रोटी खाते हैं",
                "इस वाक्य का आशय है कि रोटी बहुत महत्वपूर्ण है",
                "इस वाक्य का आशय है कि सभी लोग गरीब हैं",
                "इस वाक्य का आशय है कि गरीब लोगों के लिए सभी रिश्ते-नाते, धर्म-ईमान सब कुछ रोटी के टुकड़े के समान है"
            ],
            correct: 3,
            meaning: "इस वाक्य का आशय है कि गरीब लोगों के लिए सभी रिश्ते-नाते, धर्म-ईमान सब कुछ रोटी के टुकड़े के समान है। जब भूख मिटाने की चिंता हो तो सभी मूल्य और संबंध गौण हो जाते हैं। यह गरीबी की कड़वी सच्चाई को दर्शाता है।"
        },
        {
            text: "शोक करने, गम मनाने के लिए भी सहूलियत चाहिए और... दुःखी होने का भी एक अधिकार होता है।",
            options: [
                "इस वाक्य का आशय है कि सभी लोग दुःख मना सकते हैं",
                "इस वाक्य का आशय है कि दुःख मनाना आसान है",
                "इस वाक्य का आशय है कि दुःख मनाना मुश्किल है",
                "इस वाक्य का आशय है कि दुःख मनाने के लिए भी सुविधा चाहिए होती है और गरीब लोगों को अपने दुःख को भी छुपाना पड़ता है"
            ],
            correct: 3,
            meaning: "इस वाक्य का आशय है कि दुःख मनाने के लिए भी सुविधा चाहिए होती है। गरीब लोगों को अपने दुःख को भी छुपाना पड़ता है क्योंकि उनके पास दुःख मनाने की सुविधा नहीं होती। यह समाज की कड़वी सच्चाई है कि दुःखी होने का भी एक अधिकार होता है, जो सभी को नहीं मिलता।"
        }
    ]
};

// Initialize questions when the thinking-text module is loaded
function initializeQuestions() {
    const questionsContainer = document.getElementById('textQuestions');
    if (!questionsContainer) return;
    
    let questionsHTML = '';
    
    // Oral Questions
    questionsHTML += `
        <div class="question-set">
            <p class="question-instruction">निम्नलिखित प्रश्नों के लिए सही विकल्प चुनिए:</p>
    `;
    
    questionsData.oral.forEach((q, index) => {
        questionsHTML += `
            <div class="question-item">
                <div class="question-text">${index + 1}. ${q.question}</div>
                <div class="question-options">
        `;
        
        q.options.forEach((option, optIndex) => {
            questionsHTML += `
                <div class="question-option">
                    <input type="radio" id="oral_${index}_${optIndex}" name="oral_${index}" value="${optIndex}">
                    <label for="oral_${index}_${optIndex}">${option}</label>
                </div>
            `;
        });
        
        questionsHTML += `
                </div>
                <button class="interactive-btn" onclick="checkMultipleChoiceAnswer(this, ${q.correct}, 'oral_${index}', \`${q.answer}\`)">उत्तर जाँचें</button>
                <div class="question-feedback"></div>
            </div>
        `;
    });
    
    questionsHTML += '</div>';
    
    // Written Questions - Short
    questionsHTML += `
        <div class="question-set">
    `;
    
    questionsData.written.short.forEach((q, index) => {
        questionsHTML += `
            <div class="question-item">
                <div class="question-text">${index + 6}. ${q.question}</div>
                <div class="question-options">
        `;
        
        q.options.forEach((option, optIndex) => {
            questionsHTML += `
                <div class="question-option">
                    <input type="radio" id="short_${index}_${optIndex}" name="short_${index}" value="${optIndex}">
                    <label for="short_${index}_${optIndex}">${option}</label>
                </div>
            `;
        });
        
        questionsHTML += `
                </div>
                <button class="interactive-btn" onclick="checkMultipleChoiceAnswer(this, ${q.correct}, 'short_${index}', \`${q.answer}\`)">उत्तर जाँचें</button>
                <div class="question-feedback"></div>
            </div>
        `;
    });
    
    questionsHTML += '</div>';
    
    // Written Questions - Medium
    questionsHTML += `
        <div class="question-set">
    `;
    
    questionsData.written.medium.forEach((q, index) => {
        questionsHTML += `
            <div class="question-item">
                <div class="question-text">${index + 11}. ${q.question}</div>
                <div class="question-options">
        `;
        
        q.options.forEach((option, optIndex) => {
            questionsHTML += `
                <div class="question-option">
                    <input type="radio" id="medium_${index}_${optIndex}" name="medium_${index}" value="${optIndex}">
                    <label for="medium_${index}_${optIndex}">${option}</label>
                </div>
            `;
        });
        
        questionsHTML += `
                </div>
                <button class="interactive-btn" onclick="checkMultipleChoiceAnswer(this, ${q.correct}, 'medium_${index}', \`${q.answer}\`)">उत्तर जाँचें</button>
                <div class="question-feedback"></div>
            </div>
        `;
    });
    
    questionsHTML += '</div>';
    
    // Meaning Questions
    questionsHTML += `
        <div class="question-set">
    `;
    
    questionsData.meanings.forEach((q, index) => {
        questionsHTML += `
            <div class="question-item">
                <div class="question-text">${index + 16}. "${q.text}"</div>
                <div class="question-options">
        `;
        
        q.options.forEach((option, optIndex) => {
            questionsHTML += `
                <div class="question-option">
                    <input type="radio" id="meaning_${index}_${optIndex}" name="meaning_${index}" value="${optIndex}">
                    <label for="meaning_${index}_${optIndex}">${option}</label>
                </div>
            `;
        });
        
        questionsHTML += `
                </div>
                <button class="interactive-btn" onclick="checkMultipleChoiceAnswer(this, ${q.correct}, 'meaning_${index}', \`${q.meaning}\`)">उत्तर जाँचें</button>
                <div class="question-feedback"></div>
            </div>
        `;
    });
    
    questionsHTML += '</div>';
    
    questionsContainer.innerHTML = questionsHTML;
}

// Check multiple choice answer function
function checkMultipleChoiceAnswer(button, correctIndex, questionName, correctAnswer) {
    const questionItem = button.closest('.question-item');
    const feedback = questionItem.querySelector('.question-feedback');
    const selectedOption = questionItem.querySelector(`input[name="${questionName}"]:checked`);
    
    if (!selectedOption) {
        feedback.textContent = 'कृपया पहले कोई विकल्प चुनें।';
        feedback.className = 'question-feedback warning';
        feedback.style.display = 'block';
        return;
    }
    
    const userAnswerIndex = parseInt(selectedOption.value);
    const isCorrect = userAnswerIndex === correctIndex;
    
    // Update visual feedback for options
    const options = questionItem.querySelectorAll(`input[name="${questionName}"]`);
    options.forEach((option, index) => {
        const label = option.nextElementSibling;
        if (index === correctIndex) {
            label.style.backgroundColor = '#d4edda';
            label.style.borderColor = '#28a745';
        } else if (index === userAnswerIndex && !isCorrect) {
            label.style.backgroundColor = '#f8d7da';
            label.style.borderColor = '#dc3545';
        }
    });
    
    if (isCorrect) {
        feedback.innerHTML = `
            <div class="feedback-success">
                <strong>✅ सही उत्तर!</strong><br>
                <strong>विस्तृत उत्तर:</strong> ${correctAnswer}
            </div>
        `;
        feedback.className = 'question-feedback correct';
        
        // Update score
        if (window.score !== undefined) {
            window.score += 10;
            document.getElementById('totalScore').textContent = window.score;
        }
        
        // Mark question as completed
        if (!window.modulesCompleted) {
            window.modulesCompleted = [];
        }
        if (!window.modulesCompleted.includes('thinking-text')) {
            window.modulesCompleted.push('thinking-text');
            if (typeof window.updateProgress === 'function') {
                window.updateProgress();
            }
            if (typeof window.showAchievement === 'function') {
                window.showAchievement('प्रश्न अभ्यास पूर्ण!');
            }
        }
        
        // Success feedback (narration removed)
    } else {
        feedback.innerHTML = `
            <div class="feedback-error">
                <strong>❌ गलत उत्तर</strong><br>
                <strong>सही उत्तर:</strong> ${correctAnswer}
            </div>
        `;
        feedback.className = 'question-feedback error';
        
        // Error feedback (narration removed)
    }
    
    feedback.style.display = 'block';
    
    // Disable the button after checking
    button.disabled = true;
    button.textContent = 'उत्तर जाँचा गया';
}

// Legacy check answer function (kept for compatibility)
function checkAnswer(button, correctAnswer) {
    // This function is kept for backward compatibility but is no longer used
    console.log('Legacy checkAnswer function called - use checkMultipleChoiceAnswer instead');
}

// Initialize questions when the module is shown
document.addEventListener('DOMContentLoaded', function() {
    // Initialize questions when thinking-text module is loaded
    const originalShowModule = window.showModule;
    window.showModule = function(moduleId) {
        originalShowModule(moduleId);
        if (moduleId === 'thinking-text') {
            setTimeout(initializeQuestions, 100);
        }
    };
});

// Make functions globally available
window.initializeQuestions = initializeQuestions;
window.checkAnswer = checkAnswer;
window.checkMultipleChoiceAnswer = checkMultipleChoiceAnswer;
