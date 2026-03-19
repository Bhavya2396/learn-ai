/**
 * Activities for Mijbil the Otter interactive lesson
 */

// Activities setup
document.addEventListener('DOMContentLoaded', () => {
    setupActivities();
});

function setupActivities() {
    // Initially hide writing pad
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'none';
    }
}

// Save emotions table
function saveEmotionsTable() {
    // Get all table inputs
    const action2 = document.getElementById('action2').value.trim();
    const action3 = document.getElementById('action3').value.trim();
    const action4 = document.getElementById('action4').value.trim();
    const action5 = document.getElementById('action5').value.trim();
    const action6 = document.getElementById('action6').value.trim();
    
    const emotion2 = document.getElementById('emotion2').value.trim();
    const emotion3 = document.getElementById('emotion3').value.trim();
    const emotion4 = document.getElementById('emotion4').value.trim();
    const emotion5 = document.getElementById('emotion5').value.trim();
    const emotion6 = document.getElementById('emotion6').value.trim();
    
    // Check if at least 3 rows are filled
    if (!action2 || !emotion2 || !action3 || !emotion3 || !action4 || !emotion4) {
        const feedbackEl = document.getElementById('tableFeedback');
        feedbackEl.textContent = 'Please fill at least the first 3 rows of the table.';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the table (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('tableFeedback');
    feedbackEl.textContent = 'Your emotions table has been saved!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (window.score !== undefined) {
        window.score += 10;
        document.getElementById('totalScore').textContent = window.score;
    }
}

// Save reflection notes about Mijbil's care
function saveReflection() {
    const reflectionText = document.getElementById('reflectionText').value.trim();
    
    if (reflectionText.length < 50) {
        const feedbackEl = document.getElementById('reflectionFeedback');
        feedbackEl.textContent = 'Please write a more detailed list (at least 50 characters).';
        feedbackEl.className = 'feedback-message show error';
        return;
    }
    
    // Save the reflection (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('reflectionFeedback');
    feedbackEl.textContent = 'Your list has been saved!';
    feedbackEl.className = 'feedback-message show success';
    
    // Update progress
    if (window.score !== undefined) {
        window.score += 15;
        document.getElementById('totalScore').textContent = window.score;
    }
    
    if (window.modulesCompleted && !window.modulesCompleted.includes('prereading')) {
        if (typeof window.showAchievement === 'function') {
            window.showAchievement('List Activity Completed!');
        }
        
        if (typeof window.updateProgress === 'function') {
            window.modulesCompleted.push('prereading');
            window.updateProgress();
        }
    }
}

// Check vocabulary odd ones out
function checkVocabulary() {
    let correct = 0;
    const total = 5;
    
    const vocab1 = document.getElementById('vocab1').value;
    const vocab2 = document.getElementById('vocab2').value;
    const vocab3 = document.getElementById('vocab3').value;
    const vocab4 = document.getElementById('vocab4').value;
    const vocab5 = document.getElementById('vocab5').value;
    
    if (vocab1 === 'ridiculous') correct++;
    if (vocab2 === 'unfitting') correct++;
    if (vocab3 === 'agreeable') correct++;
    if (vocab4 === 'violent') correct++;
    if (vocab5 === 'wonderful') correct++;
    
    const feedbackEl = document.getElementById('vocabFeedback');
    
    if (correct === total) {
        feedbackEl.textContent = `Perfect! All ${correct} answers are correct.`;
        feedbackEl.className = 'feedback-message show success';
        
        // Update progress
        if (window.score !== undefined) {
            window.score += 10;
            document.getElementById('totalScore').textContent = window.score;
        }
        
        if (window.modulesCompleted && !window.modulesCompleted.includes('thinking-language')) {
            if (typeof window.showAchievement === 'function') {
                window.showAchievement('Vocabulary Exercise Completed!');
            }
        }
    } else {
        feedbackEl.textContent = `You got ${correct} out of ${total} correct. Try again!`;
        feedbackEl.className = 'feedback-message show error';
    }
}

// Check noun-verb answers
function checkNounVerbs() {
    let correct = 0;
    const total = document.querySelectorAll('.contraction-input').length;
    
    document.querySelectorAll('.contraction-input').forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correct++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('nounVerbsFeedback');
    if (feedbackEl) {
        if (correct === total) {
            feedbackEl.textContent = `Perfect! All ${correct} answers are correct.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress
            if (window.score !== undefined) {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
        } else {
            feedbackEl.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Check noun modifiers
function checkNounModifiers() {
    let correct = 0;
    const total = document.querySelectorAll('.contraction-input.wide-input').length;
    
    document.querySelectorAll('.contraction-input.wide-input').forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correct++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('modifiersFeedback');
    if (feedbackEl) {
        if (correct === total) {
            feedbackEl.textContent = `Perfect! All ${correct} noun modifier phrases are correct.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress
            if (window.score !== undefined) {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
        } else {
            feedbackEl.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Check participle forms
function checkParticiples() {
    let correct = 0;
    const total = document.querySelectorAll('.contraction-input').length;
    
    document.querySelectorAll('.contraction-input').forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.borderColor = '#4caf50';
            input.style.backgroundColor = '#e8f5e9';
            correct++;
        } else {
            input.style.borderColor = '#f44336';
            input.style.backgroundColor = '#ffebee';
        }
    });
    
    const feedbackEl = document.getElementById('participlesFeedback');
    if (feedbackEl) {
        if (correct === total) {
            feedbackEl.textContent = `Perfect! All ${correct} participle forms are correct.`;
            feedbackEl.className = 'feedback-message show success';
            
            // Update progress
            if (window.score !== undefined) {
                window.score += 10;
                document.getElementById('totalScore').textContent = window.score;
            }
            
            if (window.modulesCompleted && !window.modulesCompleted.includes('thinking-language')) {
                if (typeof window.showAchievement === 'function') {
                    window.showAchievement('Grammar Exercise Completed!');
                }
                
                if (typeof window.updateProgress === 'function' && !window.modulesCompleted.includes('thinking-language')) {
                    window.modulesCompleted.push('thinking-language');
                    window.updateProgress();
                }
            }
        } else {
            feedbackEl.textContent = `You got ${correct} out of ${total} correct. Try again!`;
            feedbackEl.className = 'feedback-message show error';
        }
    }
}

// Save listening notes about Gangaram the crocodile
function saveListeningNotes() {
    // Get all question textareas
    const questionTextareas = document.querySelectorAll('.listening-question textarea');
    let allAnswered = true;
    
    // Check if all questions have answers
    questionTextareas.forEach(textarea => {
        if (textarea.value.trim().length < 10) {
            allAnswered = false;
        }
    });
    
    if (!allAnswered) {
        alert('Please answer all questions with at least 10 characters each.');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('listeningFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = 'Your answers have been saved!';
        feedbackEl.className = 'feedback-message show success';
    }
    
    // Update progress
    if (window.score !== undefined) {
        window.score += 15;
        document.getElementById('totalScore').textContent = window.score;
    }
}

// Save dialogue responses
function saveDialogues() {
    // Get all dialogue inputs
    const dialogueInputs = document.querySelectorAll('.dialogue-input');
    let allFilled = true;
    
    // Check if all dialogues have text
    dialogueInputs.forEach(input => {
        if (input.value.trim().length < 5) {
            allFilled = false;
        }
    });
    
    if (!allFilled) {
        alert('Please write at least 5 characters for each dialogue.');
        return;
    }
    
    // Save the dialogues (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('dialogueFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = 'Your dialogues have been saved!';
        feedbackEl.className = 'feedback-message show success';
    }
    
    // Update progress
    if (window.score !== undefined) {
        window.score += 10;
        document.getElementById('totalScore').textContent = window.score;
    }
}

// Open writing pad
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        document.getElementById('writingPad').focus();
    }
}

// Save writing about animal rights
function saveWriting() {
    const writingText = document.getElementById('writingPad').value.trim();
    
    if (writingText.length < 100) {
        alert('Please write a more detailed response (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    const feedbackEl = document.getElementById('writingFeedback');
    if (feedbackEl) {
        feedbackEl.textContent = 'Your response has been saved!';
        feedbackEl.className = 'feedback-message show success';
    }
    
    // Update progress
    if (window.score !== undefined) {
        window.score += 15;
        document.getElementById('totalScore').textContent = window.score;
    }
    
    if (window.modulesCompleted && !window.modulesCompleted.includes('activities')) {
        if (typeof window.showAchievement === 'function') {
            window.showAchievement('Writing Activity Completed!');
        }
        
        if (typeof window.updateProgress === 'function') {
            window.modulesCompleted.push('activities');
            window.updateProgress();
        }
    }
}

// Play audio for listening activity
function playListeningActivity() {
    const gangaramStory = `The incident took place in Bawamohatra, a village in Bemetra district of Chhattisgarh. The residents of Bawamohatra gathered near the community pond and started weeping after they saw that the crocodile had died. The villagers were emotionally attached to the reptile and were heartbroken after his death. About 500 people of the small village attended the last rites of their beloved crocodile, Gangaram. The over three-metre long crocodile was buried in Chhattisgarh's Bawamohatra village after his last rites were performed by the villagers. A forest department official estimated that the crocodile was 130 years old. The crocodile was carried to its funeral on a tractor decorated with flowers and garlands. The villagers say Gangaram was friendly. Even the kids of the village could swim around him. He had never harmed or attacked anyone. He was not a crocodile but a friend and a divine creature for them, who was worshipped in this village. Some say that he would even eat rice and dal which was served by the villagers and kids. He was very understanding and if he saw anyone swimming near him, he used to go to the other side of the pond. Villagers used to identify themselves with the crocodile as people used to call this village — Magarmachha vala gaaon, the Crocodile's village. In fact, the villagers now wish to build a statue of Gangaram near the pond to remember their friend, who got the village a new name. It may be weird, but it could be an example of how humans and animals can coexist without harming each other.`;
    
    // If narrator is available, use it to speak the story
    if (window.narrator && window.narrator.enabled) {
        window.narrator.speak(gangaramStory);
    } else {
        // Otherwise show the text as an alert
        alert("Audio narration is not available. Here's the story: " + gangaramStory);
    }
}

// Show project resources
function showResource(resourceId) {
    let resourceInfo = "";
    
    switch (resourceId) {
        case 'animal-trade':
            resourceInfo = "Legal Animal Trade Information: The Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES) is an international agreement between governments that regulates the international trade in wild animals and plants. It places species into three appendices based on how threatened they are by trade. Appendix I species (like tigers and giant pandas) are banned from commercial trade. Appendix II species (like many reptiles) can be traded with permits. Appendix III species are protected in at least one country.";
            break;
        case 'exotic-pets':
            resourceInfo = "Exotic Pets and Regulations: Many countries have restrictions on keeping exotic pets. In India, the Wildlife Protection Act of 1972 prohibits the keeping of most native wild animals as pets. However, some non-native species can be kept with proper permits. Common legal exotic pets include certain species of birds, reptiles, and fish that are not endangered and are bred in captivity.";
            break;
        case 'project-template':
            resourceInfo = "Project Template:\n1. Introduction: Brief overview of animal trade laws\n2. Legal Framework: CITES and national laws\n3. Commonly Traded Animals: Legal vs. illegal\n4. Case Studies: Recent seizures and enforcement\n5. Impact on Wildlife Conservation: How trade affects wild populations\n6. Recommendations: How to improve regulation and enforcement";
            break;
    }
    
    if (resourceInfo) {
        alert(resourceInfo);
    }
}
