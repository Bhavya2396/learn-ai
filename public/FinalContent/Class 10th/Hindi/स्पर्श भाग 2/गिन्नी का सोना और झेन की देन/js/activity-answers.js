/**
 * Activity answers and helper functions for Ginni ka Sona module
 */

// Global variables for activity tracking
const activityAnswers = {
    // Research activity resources
    research: {
        resources: [
            {
                title: "रवींद्र केलेकर का साहित्यिक योगदान",
                link: "https://www.sahitya-akademi.gov.in/",
                description: "रवींद्र केलेकर के साहित्यिक योगदान पर विस्तृत लेख"
            },
            {
                title: "गांधीवादी विचारधारा और आधुनिक समाज",
                link: "https://www.mkgandhi.org/",
                description: "गांधीवादी विचारधारा पर आधारित विस्तृत शोध सामग्री"
            },
            {
                title: "झेन बुद्धिज्म और जापानी संस्कृति",
                link: "#",
                description: "झेन बुद्धिज्म, जापानी चाय समारोह और उनके दार्शनिक महत्व पर जानकारी"
            }
        ],
        meaningAnswers: {
            meaning1: "1", // इसका अर्थ है कि समाज में जो स्थायी और महत्वपूर्ण मूल्य हैं...
            meaning2: "1"  // इसका अर्थ है कि हम अपना अधिकांश समय या तो अतीत की बातों...
        }
    },
    
    // Essay topics
    essay: {
        topics: [
            {
                title: "आदर्शवादिता और व्यावहारिकता का संतुलन",
                description: "इस विषय पर लिखते हुए आप आदर्शवादिता और व्यावहारिकता के बीच संतुलन के महत्व पर प्रकाश डाल सकते हैं। आप गांधीजी के उदाहरण का उल्लेख कर सकते हैं और बता सकते हैं कि कैसे वे आदर्शों पर अडिग रहते हुए भी व्यावहारिकता का परिचय देते थे।",
                keyPoints: [
                    "आदर्शवादिता और व्यावहारिकता की परिभाषा",
                    "गांधीजी के जीवन से उदाहरण",
                    "आधुनिक जीवन में इन दोनों के बीच संतुलन का महत्व",
                    "निष्कर्ष: जीवन में सफलता के लिए दोनों का महत्व"
                ]
            },
            {
                title: "वर्तमान क्षण में जीने का महत्व",
                description: "इस विषय पर लिखते हुए आप झेन दर्शन और 'चा-नो-यू' (जापानी चाय समारोह) के माध्यम से वर्तमान क्षण में जीने के महत्व पर प्रकाश डाल सकते हैं। आप बता सकते हैं कि कैसे आधुनिक जीवन की व्यस्तता में वर्तमान क्षण को महसूस करना हमारे मानसिक स्वास्थ्य के लिए महत्वपूर्ण है।",
                keyPoints: [
                    "झेन दर्शन का परिचय",
                    "आधुनिक जीवन की चुनौतियाँ",
                    "वर्तमान क्षण में जीने के लाभ",
                    "चा-नो-यू से मिली सीख"
                ]
            },
            {
                title: "शाश्वत मूल्यों का महत्व",
                description: "इस विषय पर लिखते हुए आप समाज में शाश्वत मूल्यों के महत्व और उनके संरक्षण की आवश्यकता पर प्रकाश डाल सकते हैं। आप बता सकते हैं कि कैसे ये मूल्य हमारे समाज को स्थिरता और दिशा प्रदान करते हैं और इन्हें कैसे आगे बढ़ाया जा सकता है।",
                keyPoints: [
                    "शाश्वत मूल्यों की परिभाषा",
                    "समाज में इन मूल्यों का योगदान",
                    "आदर्शवादी लोगों का समाज में योगदान",
                    "आधुनिक समय में इन मूल्यों की प्रासंगिकता"
                ]
            }
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

// Get essay topic by index
function getEssayTopic(index) {
    if (index >= 0 && index < activityAnswers.essay.topics.length) {
        return activityAnswers.essay.topics[index];
    }
    return null;
}

// Check meaning answers
function checkMeaning(answer1, answer2) {
    const correctAnswer1 = activityAnswers.research.meaningAnswers.meaning1;
    const correctAnswer2 = activityAnswers.research.meaningAnswers.meaning2;
    
    return {
        isAnswer1Correct: answer1 === correctAnswer1,
        isAnswer2Correct: answer2 === correctAnswer2
    };
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
