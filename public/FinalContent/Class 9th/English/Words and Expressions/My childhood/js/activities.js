/**
 * Activities and interactive exercises for Presidents of India lesson
 */

// Initialize activities when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any activity-specific functionality
    initializeListeningActivity();
    initializeWritingActivity();
    initializeProjectActivity();
});

// Initialize the listening activity
function initializeListeningActivity() {
    // Add event listener to the play button if it exists
    const playButton = document.querySelector('.listening-activity .interactive-btn');
    if (playButton) {
        playButton.addEventListener('click', function() {
            playListeningActivity();
        });
    }
}

// Play the listening activity audio
function playListeningActivity() {
    // Make sure the user has interacted with the page
    if (typeof trackUserInteraction === 'function') {
        trackUserInteraction();
    }
    
    if (window.narrator) {
        // First stop any ongoing narration
        if (window.narrator.stop) {
            window.narrator.stop();
        }
        
        // Narrate Malala Yousafzai's speech directly
        window.narrator.speak(`
            Honourable UN Secretary General Mr Ban Ki-moon, respected President of the General Assembly Vuk Jeremic, honourable UN envoy for global education Mr Gordon Brown, respected elders and my dear brothers and sisters: Assalamu alaikum.
            
            Today it is an honour for me to be speaking again after a long time. Being here with such honourable people is a great moment in my life and it is an honour for me that today I am wearing a shawl of late Benazir Bhutto. I don't know where to begin my speech. I don't know what people would be expecting me to say, but first of all thank you to God for whom we all are equal and thank you to every person who has prayed for my fast recovery and new life.
            
            I cannot believe how much love people have shown me. I have received thousands of good-wish cards and gifts from all over the world. Thank you to all of them. Thank you to the children whose innocent words encouraged me. Thank you to my elders whose prayers strengthened me.
            
            There are hundreds of human rights activists and social workers who are not only speaking for their rights, but who are struggling to achieve their goal of peace, education and equality. Thousands of people have been killed by the terrorists and millions have been injured. I am just one of them. So here I stand, one girl among many. I speak not for myself, but so those without a voice can be heard. Those who have fought for their rights. Their right to live in peace. Their right to be treated with dignity. Their right to equality of opportunity. Their right to be educated.
            
            Now please answer the questions in the form below.
        `);
    } else {
        // If speech synthesis is not available, show a console message instead of alert
        console.log('Speech synthesis is not available in your browser. Please read the text and answer the questions.');
    }
}

// Save listening notes
function saveListeningNotes() {
    const notes1 = document.getElementById('listeningNotes1').value.trim();
    const notes2 = document.getElementById('listeningNotes2').value.trim();
    const notes3 = document.getElementById('listeningNotes3').value.trim();
    const notes4 = document.getElementById('listeningNotes4').value.trim();
    
    if (notes1.length < 5 || notes2.length < 5 || notes3.length < 5 || notes4.length < 5) {
        alert('Please answer all questions with more detailed responses.');
        return;
    }
    
    // Save the notes (in a real app, this would be sent to a server)
    alert('Your answers have been saved!');
    
    // Update progress
    if (typeof score !== 'undefined') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
    
    if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('Listening Activity Completed!');
        }
    }
    
    if (window.narrator) {
        window.narrator.speak("Great job! Your answers have been saved.");
    }
}

// Initialize the writing activity
function initializeWritingActivity() {
    // Add event listener to the writing button if it exists
    const writingButton = document.querySelector('.writing-activity .interactive-btn');
    if (writingButton) {
        writingButton.addEventListener('click', function() {
            openWritingPad();
        });
    }
}

// Open the writing pad
function openWritingPad() {
    const writingPad = document.querySelector('.writing-pad');
    if (writingPad) {
        writingPad.style.display = 'block';
        
        if (window.narrator) {
            window.narrator.speak("In 2010, the United Nations declared Dr A.P.J. Abdul Kalam's birthday as World Students' Day. Write an article on the importance of the youth and young students in the making of a New India.");
        }
    }
}

// Save writing
function saveWriting() {
    const writing = document.getElementById('writingPad').value.trim();
    
    if (writing.length < 100) {
        alert('Please write a more detailed article (at least 100 characters).');
        return;
    }
    
    // Save the writing (in a real app, this would be sent to a server)
    alert('Your article has been saved!');
    
    // Update progress
    if (typeof score !== 'undefined') {
        score += 15;
        document.getElementById('totalScore').textContent = score;
    }
    
    if (typeof modulesCompleted !== 'undefined' && !modulesCompleted.includes('activities')) {
        modulesCompleted.push('activities');
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
        if (typeof showAchievement === 'function') {
            showAchievement('Writing Activity Completed!');
        }
    }
    
    if (window.narrator) {
        window.narrator.speak("Excellent work! Your article has been saved.");
    }
}

// Speaking activity has been removed as it lacked actual recording functionality

// Initialize the project activity
function initializeProjectActivity() {
    // Add event listeners to resource links
    const resourceLinks = document.querySelectorAll('.project-resources a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceId = this.getAttribute('onclick').match(/showResource\('(.+?)'\)/)[1];
            showResource(resourceId);
        });
    });
}

// Show resource
function showResource(resourceId) {
    if (window.narrator) {
        switch(resourceId) {
            case 'gandhi-quotes':
                window.narrator.speak("Here are some famous quotes by Mahatma Gandhi: 'Be the change you wish to see in the world.' 'An eye for an eye only ends up making the whole world blind.' 'The greatness of a nation can be judged by the way its animals are treated.'");
                break;
            case 'kalam-quotes':
                window.narrator.speak("Here are some inspiring quotes by Dr. A.P.J. Abdul Kalam: 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.' 'If you fail, never give up because F.A.I.L. means First Attempt In Learning.' 'Excellence is a continuous process and not an accident.'");
                break;
            case 'mother-teresa-quotes':
                window.narrator.speak("Here are some heartfelt quotes by Mother Teresa: 'Peace begins with a smile.' 'If you judge people, you have no time to love them.' 'Not all of us can do great things. But we can do small things with great love.'");
                break;
            case 'project-template':
                window.narrator.speak("This template provides a structure for your project on inspirational quotes, including sections for different personalities, their backgrounds, and their impactful words of wisdom.");
                break;
            default:
                window.narrator.speak("Resource information is being loaded.");
                break;
        }
    }
}
