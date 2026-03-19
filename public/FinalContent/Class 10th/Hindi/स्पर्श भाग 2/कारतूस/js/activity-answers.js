/**
 * Activity answers and helper functions for Kartoos module
 */

// Global variables for activity tracking
const activityAnswers = {
    // Research activity resources
    research: {
        resources: [
            {
                title: "संगीत नाटक अकादमी",
                link: "https://sangeetnatak.gov.in/",
                description: "भारत सरकार के संस्कृति मंत्रालय के अंतर्गत संगीत, नृत्य और नाटक के क्षेत्र में राष्ट्रीय अकादमी"
            },
            {
                title: "राष्ट्रीय नाट्य विद्यालय",
                link: "https://nsd.gov.in/",
                description: "भारत सरकार के संस्कृति मंत्रालय के अंतर्गत नाट्य कला के क्षेत्र में शीर्ष संस्था"
            },
            {
                title: "हिंदुस्तानी थिएटर का इतिहास",
                link: "#",
                description: "हबीब तनवीर और उनके समकालीन रंगमंच के बारे में जानकारी"
            }
        ],
        sampleWork: [
            "आगरा बाज़ार (1954)",
            "चरनदास चोर (1975)",
            "देख रहे हैं नैन (1957)",
            "हिरमा की अमर कहानी (1985)",
            "मिट्टी की गाड़ी (1958)",
            "जिस लाहौर नहीं वेखया ओ जन्मया ही नहीं (1990)"
        ]
    },
    
    // Role play activity guidelines
    rolePlay: {
        characters: [
            {
                name: "वज़ीर अली",
                traits: "साहसी, चतुर, देशभक्त, बुद्धिमान",
                guidelines: "आत्मविश्वास के साथ संवाद बोलें, स्वाभिमान और दृढ़ता दिखाएँ"
            },
            {
                name: "कर्नल कालिंज",
                traits: "अधिकारपूर्ण, कुछ घमंडी, प्रभावशाली",
                guidelines: "आदेशात्मक स्वर में बोलें, अपने अधिकार का प्रदर्शन करें"
            },
            {
                name: "लेफ्टीनेंट",
                traits: "आज्ञाकारी, जिज्ञासु, कर्तव्यनिष्ठ",
                guidelines: "कर्नल के प्रति सम्मान दिखाएँ, जानकारी के लिए उत्सुक रहें"
            }
        ],
        performanceTips: [
            "संवादों को याद कर लें और उन्हें स्वाभाविक रूप से बोलें",
            "मंच निर्देशों का पालन करते हुए उचित हाव-भाव का प्रदर्शन करें",
            "पात्र के स्वभाव और स्थिति के अनुसार स्वर में उतार-चढ़ाव लाएँ",
            "जब एक पात्र बोल रहा हो, तो दूसरे पात्र को उसकी बातों पर ध्यान देना चाहिए"
        ]
    }
};

// Get research resources by index
function getResearchResource(index) {
    if (index >= 0 && index < activityAnswers.research.resources.length) {
        return activityAnswers.research.resources[index];
    }
    return null;
}

// Get role play character by name
function getRolePlayCharacter(name) {
    return activityAnswers.rolePlay.characters.find(character => character.name === name);
}

// Display a resource (for a real app)
window.showResource = function(resourceId) {
    const resource = getResearchResource(resourceId);
    if (!resource) {
        console.error(`Resource with ID ${resourceId} not found`);
        return;
    }
    
    // In a real app, this would display the resource in a modal or redirect to a page
    console.log(`Showing resource: ${resource.title}`);
    alert(`संसाधन: ${resource.title}\n\n${resource.description}\n\nलिंक: ${resource.link}`);
};
