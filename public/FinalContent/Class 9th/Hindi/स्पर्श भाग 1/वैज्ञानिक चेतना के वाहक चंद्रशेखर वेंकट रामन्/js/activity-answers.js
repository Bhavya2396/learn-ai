/**
 * Activity answers and interactive content for CV Raman module
 */

// Research activity topics and guidance
const researchTopics = {
    1: {
        title: "भारत के प्रमुख वैज्ञानिक",
        description: "भारत के किन-किन वैज्ञानिकों को नोबेल पुरस्कार मिला है? उनके योगदान के बारे में जानकारी एकत्रित करें।",
        guidance: "अनुसंधान के लिए सुझाव: सी.वी. रामन्, हरगोविंद खुराना, सुब्रह्मण्यम चंद्रशेखर, वेंकटरामन रामकृष्णन, अभिजीत बनर्जी आदि के बारे में जानकारी एकत्रित करें।",
        keywords: ["नोबेल पुरस्कार", "भारतीय वैज्ञानिक", "खोजें", "आविष्कार"]
    },
    2: {
        title: "न्यूटन के आविष्कार",
        description: "न्यूटन के आविष्कार के विषय में जानकारी प्राप्त करें और उनके वैज्ञानिक योगदान की सूची बनाएं।",
        guidance: "अनुसंधान के लिए सुझाव: गुरुत्वाकर्षण का नियम, गति के नियम, प्रकाश का सिद्धांत, कैलकुलस, रिफ्लेंक्टिंग टेलीस्कोप आदि।",
        keywords: ["न्यूटन", "गुरुत्वाकर्षण", "गति के नियम", "प्रकाश"]
    },
    3: {
        title: "वैज्ञानिक चेतना का विकास",
        description: "वैज्ञानिक चेतना के मानव विकास में योगदान पर अपने विचार प्रस्तुत करें।",
        guidance: "विचार के लिए सुझाव: तर्कसंगत सोच, अंधविश्वास का खत्म होना, प्रगति, तकनीकी विकास, जीवन स्तर में सुधार।",
        keywords: ["वैज्ञानिक सोच", "तर्क", "प्रगति", "विकास"]
    }
};

// Project options and guidelines
const projectOptions = {
    1: {
        title: "भारतीय वैज्ञानिकों की सूची",
        description: "भारत के प्रमुख वैज्ञानिकों की सूची उनके कार्यों/योगदानों के साथ बनाएं।",
        guidance: "परियोजना के लिए सुझाव: ए.पी.जे. अब्दुल कलाम, डॉ. होमी भाभा, डॉ. विक्रम साराभाई, डॉ. जगदीश चंद्र बोस आदि को शामिल करें।",
        format: "तालिका बनाएं: नाम, जन्म-मृत्यु, क्षेत्र, मुख्य योगदान"
    },
    2: {
        title: "भारत का मानचित्र",
        description: "भारत के मानचित्र में तमिलनाडु के तिरुचिरापल्ली और कोलकाता की स्थिति दर्शाएं।",
        guidance: "परियोजना के लिए सुझाव: भारत का मानचित्र बनाएं या प्रिंट करें, महत्वपूर्ण स्थानों को चिह्नित करें।",
        format: "मानचित्र पर स्थानों को रंगीन पेन से दिखाएं और उनके बारे में संक्षिप्त जानकारी लिखें"
    },
    3: {
        title: "वैज्ञानिक खोजों की सूची",
        description: "पिछले बीस-पच्चीस वर्षों में हुई उन वैज्ञानिक खोजों, उपकरणों की सूची बनाएं, जिन्होंने मानव जीवन बदल दिया है।",
        guidance: "परियोजना के लिए सुझाव: इंटरनेट, मोबाइल फोन, डीएनए सीक्वेंसिंग, कृत्रिम बुद्धिमत्ता, रोबोटिक्स आदि।",
        format: "वर्षानुसार सूची बनाएं: वर्ष, खोज/आविष्कार, प्रभाव"
    }
};

// Vocabulary definitions and examples
const vocabularyBank = {
    "विशाखापत्तनम्": {
        meaning: "आंध्र प्रदेश का एक महत्वपूर्ण बंदरगाह नगर",
        example: "रामन् के पिता विशाखापत्तनम् में शिक्षक थे।"
    },
    "अतिशयोक्ति": {
        meaning: "बढ़ा-चढ़ाकर कहना",
        example: "यह कहना अतिशयोक्ति नहीं होगी कि रामन् महान वैज्ञानिक थे।"
    },
    "प्रतिभावान": {
        meaning: "जिसमें विलक्षण बौद्धिक शक्ति हो",
        example: "रामन् एक प्रतिभावान छात्र थे।"
    },
    "जिज्ञासा": {
        meaning: "जानने की इच्छा",
        example: "वैज्ञानिक जिज्ञासा ने रामन् को महान बनाया।"
    },
    "विश्वविख्यात": {
        meaning: "विश्व में प्रसिद्ध",
        example: "रामन् प्रभाव की खोज ने उन्हें विश्वविख्यात बनाया।"
    },
    "प्रायोगिक": {
        meaning: "प्रयोग संबंधी",
        example: "रामन् की खोज ने आइंस्टाइन के सिद्धांत का प्रायोगिक प्रमाण दिया।"
    },
    "अनुसंधान": {
        meaning: "शोधकार्य, खोज",
        example: "रामन् ने अपना जीवन अनुसंधान को समर्पित किया।"
    }
};

// Sample essays and writing prompts
const essayPrompts = {
    scientific_thinking: {
        title: "वैज्ञानिक सोच का महत्व",
        points: [
            "तर्कसंगत चिंतन",
            "प्रश्न करने की आदत",
            "प्रयोग और परीक्षण",
            "अंधविश्वास से मुक्ति",
            "नवाचार और आविष्कार"
        ],
        sample_intro: "वैज्ञानिक सोच मानव प्रगति का आधार है। यह हमें तर्कसंगत निर्णय लेने और समस्याओं का समाधान खोजने में मदद करती है।"
    },
    raman_inspiration: {
        title: "रामन् के जीवन से प्रेरणा",
        points: [
            "कड़ी मेहनत और लगन",
            "जिज्ञासा और धैर्य",
            "कम साधनों में भी काम करना",
            "भारतीय पहचान बनाए रखना",
            "ज्ञान की निरंतर खोज"
        ],
        sample_intro: "सी.वी. रामन् का जीवन हमें सिखाता है कि दृढ़ संकल्प और निरंतर प्रयास से कोई भी लक्ष्य प्राप्त किया जा सकता है।"
    }
};

// Fun facts about Raman and science
const scientificFacts = [
    {
        title: "रामन् प्रभाव का नाम",
        fact: "28 फरवरी को 'राष्ट्रीय विज्ञान दिवस' मनाया जाता है क्योंकि इसी दिन 1928 में रामन् प्रभाव की खोज हुई थी।"
    },
    {
        title: "प्रकाश के रंग",
        fact: "जब सफेद प्रकाश प्रिज्म से गुजरता है तो वह सात रंगों में बंट जाता है - बैंजनी, नीला, आसमानी, हरा, पीला, नारंगी, लाल।"
    },
    {
        title: "नोबेल पुरस्कार",
        fact: "रामन् पहले एशियाई और गैर-श्वेत व्यक्ति थे जिन्हें भौतिकी में नोबेल पुरस्कार मिला था।"
    },
    {
        title: "स्पेक्ट्रोस्कोपी",
        fact: "रामन् स्पेक्ट्रोस्कोपी आज भी रसायन विज्ञान और भौतिकी में महत्वपूर्ण तकनीक है।"
    }
];

// Initialize activity functions
document.addEventListener('DOMContentLoaded', function() {
    initializeActivities();
});

function initializeActivities() {
    // Add click events for research topic selection
    const researchRadios = document.querySelectorAll('input[name="research"]');
    researchRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            showResearchGuidance(this.value);
        });
    });
    
    // Add click events for project selection
    const projectRadios = document.querySelectorAll('input[name="project"]');
    projectRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            showProjectGuidance(this.value);
        });
    });
    
    // Initialize vocabulary tooltips
    initializeVocabularyTooltips();
}

function showResearchGuidance(topicId) {
    const topic = researchTopics[topicId];
    if (topic) {
        const guidanceElement = document.getElementById('researchGuidance');
        if (guidanceElement) {
            guidanceElement.innerHTML = `
                <div class="guidance-box">
                    <h4>${topic.title}</h4>
                    <p><strong>विवरण:</strong> ${topic.description}</p>
                    <p><strong>मार्गदर्शन:</strong> ${topic.guidance}</p>
                    <div class="keywords">
                        <strong>मुख्य शब्द:</strong> 
                        ${topic.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join(' ')}
                    </div>
                </div>
            `;
            guidanceElement.style.display = 'block';
        }
    }
}

function showProjectGuidance(projectId) {
    const project = projectOptions[projectId];
    if (project) {
        const guidanceElement = document.getElementById('projectGuidance');
        if (guidanceElement) {
            guidanceElement.innerHTML = `
                <div class="guidance-box">
                    <h4>${project.title}</h4>
                    <p><strong>विवरण:</strong> ${project.description}</p>
                    <p><strong>मार्गदर्शन:</strong> ${project.guidance}</p>
                    <p><strong>प्रारूप:</strong> ${project.format}</p>
                </div>
            `;
            guidanceElement.style.display = 'block';
        }
    }
}

function initializeVocabularyTooltips() {
    // Add interactive vocabulary tooltips
    Object.keys(vocabularyBank).forEach(word => {
        const elements = document.querySelectorAll(`[title*="${word}"]`);
        elements.forEach(element => {
            element.addEventListener('mouseover', function() {
                showVocabularyTooltip(this, word);
            });
            element.addEventListener('mouseout', function() {
                hideVocabularyTooltip();
            });
        });
    });
}

function showVocabularyTooltip(element, word) {
    const vocabData = vocabularyBank[word];
    if (vocabData) {
        const tooltip = document.createElement('div');
        tooltip.className = 'vocab-detail-tooltip';
        tooltip.innerHTML = `
            <div class="vocab-word">${word}</div>
            <div class="vocab-meaning">${vocabData.meaning}</div>
            <div class="vocab-example">उदाहरण: ${vocabData.example}</div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = (rect.left + window.scrollX) + 'px';
        tooltip.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    }
}

function hideVocabularyTooltip() {
    const tooltips = document.querySelectorAll('.vocab-detail-tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Show random scientific fact
function showRandomFact() {
    const randomFact = scientificFacts[Math.floor(Math.random() * scientificFacts.length)];
    const factElement = document.getElementById('randomFact');
    
    if (factElement) {
        factElement.innerHTML = `
            <div class="fact-box">
                <h4>🔬 ${randomFact.title}</h4>
                <p>${randomFact.fact}</p>
            </div>
        `;
        factElement.style.display = 'block';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            factElement.style.display = 'none';
        }, 10000);
    }
    
    if (window.narrator) {
        window.narrator.speak(`रोचक तथ्य: ${randomFact.title}। ${randomFact.fact}`);
    }
}

// Essay writing helper
function getEssayPrompt(topic) {
    const prompt = essayPrompts[topic];
    if (prompt) {
        return {
            title: prompt.title,
            points: prompt.points,
            intro: prompt.sample_intro
        };
    }
    return null;
}

// Export functions for global use
window.showResearchGuidance = showResearchGuidance;
window.showProjectGuidance = showProjectGuidance;
window.showRandomFact = showRandomFact;
window.getEssayPrompt = getEssayPrompt;
