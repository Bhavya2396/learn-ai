/**
 * Main JavaScript for Chapter 10 interactive Hindi lesson
 */

// Global Variables
let progress = 0;
let score = 0;
let modulesCompleted = [];
let currentModule = 'author';
let audioEnabled = true;
let narrator = null;
let timeStarted = Date.now();
let userInteracted = false;

// Initialize on load
window.addEventListener('load', () => {
    initializeNarrator();
    updateTimer();
    setInterval(updateTimer, 1000);
    document.addEventListener('click', trackUserInteraction, { once: true });
    document.addEventListener('keydown', trackUserInteraction, { once: true });
    document.addEventListener('touchstart', trackUserInteraction, { once: true });
});

// Initialize Narrator (copied pattern from reference)
function initializeNarrator() {
    if ('speechSynthesis' in window) {
        narrator = {
            synth: window.speechSynthesis,
            enabled: true,
            voice: null,
            currentUtterance: null,
            onEndCallback: null,
            speak: function(text) {
                if (!this.enabled) return;
                if (!this.synth) return;
                if (!userInteracted) {
                    this.showFallbackMessage(text);
                    return;
                }
                this.synth.cancel();
                const utterance = new SpeechSynthesisUtterance(this.addNaturalPauses(text));
                if (!this.voice) this.initializeVoices();
                if (this.voice) utterance.voice = this.voice;
                this.currentUtterance = utterance;
                utterance.onend = () => {
                    this.currentUtterance = null;
                    if (this.onEndCallback) this.onEndCallback();
                };
                this.synth.speak(utterance);
            },
            addNaturalPauses: function(text) {
                return text
                    .replace(/\.\s/g, '.  ')
                    .replace(/\!\s/g, '!  ')
                    .replace(/\?\s/g, '?  ')
                    .replace(/,\s/g, ',  ')
                    .replace(/;\s/g, ';  ')
                    .replace(/:\s/g, ':  ')
                    .replace(/।\s/g, '।  ');
            },
            stop: function() {
                this.synth.cancel();
                this.currentUtterance = null;
                this.onEndCallback = null;
            },
            toggle: function() {
                this.enabled = !this.enabled;
                if (!this.enabled) this.stop();
                return this.enabled;
            },
            showFallbackMessage: function(text) {
                const fallback = document.createElement('div');
                fallback.className = 'narrator-fallback';
                fallback.innerHTML = '<div class="fallback-header"><h4>🔊 वाचक कहते हैं:</h4><button class="fallback-close" onclick="this.parentNode.parentNode.remove()">×</button></div><p>' + text + '</p>';
                document.body.appendChild(fallback);
                setTimeout(() => { if (fallback.parentNode) fallback.remove(); }, 8000);
            },
            initializeVoices: function() {
                const voices = this.synth.getVoices();
                let preferredVoice = voices.find(v => v.lang?.startsWith('hi') || v.name?.includes('Hindi'))
                    || voices.find(v => v.name?.includes('Indian') || v.name?.includes('India'))
                    || voices.find(v => v.lang?.startsWith('en'))
                    || voices[0];
                this.voice = preferredVoice || null;
            }
        };
        window.narrator = narrator;
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = function() { narrator.initializeVoices(); };
        } else {
            setTimeout(() => { if (!narrator.voice) narrator.initializeVoices(); }, 1000);
        }
    }
}

// Update Timer
function updateTimer() {
    const elapsed = Math.floor((Date.now() - timeStarted) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const el = document.getElementById('timeSpent');
    if (el) el.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Module Navigation
function showModule(moduleId) {
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
        document.querySelectorAll('.reading-indicator').forEach(ind => ind.remove());
        document.querySelectorAll('.paragraph-highlight').forEach(p => p.classList.remove('paragraph-highlight'));
    }
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    const moduleElement = document.getElementById(moduleId);
    if (!moduleElement) return;
    moduleElement.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => { n.classList.remove('active'); n.setAttribute('aria-pressed', 'false'); });
    const navItems = document.querySelectorAll('.nav-item');
    for (let item of navItems) {
        if (item.onclick && item.onclick.toString().includes(moduleId)) {
            item.classList.add('active');
            item.setAttribute('aria-pressed', 'true');
            break;
        }
    }
    if (!modulesCompleted.includes(moduleId)) {
        modulesCompleted.push(moduleId);
        updateProgress();
        showAchievement(`मॉड्यूल पूर्ण: ${getModuleName(moduleId)}`);
    }
    currentModule = moduleId;
    
    // Re-initialize dropdowns when showing language study module
    if (moduleId === 'thinking-language' && typeof initializeDropdowns === 'function') {
        setTimeout(() => initializeDropdowns(), 100);
    }
    
    setTimeout(() => startModuleNarration(moduleId), 200);
    window.scrollTo(0, 0);
}

// Start module narration
function startModuleNarration(moduleId) {
    if (!window.narrator || !window.narrator.enabled) return;
    switch(moduleId) {
        case 'author':
        case 'prereading': {
            const mod = document.getElementById(moduleId);
            if (mod) {
                const blocks = mod.querySelectorAll('.content-block');
                let text = moduleId === 'author' ? 'लेखक परिचय। ' : 'पाठ प्रवेश। ';
                blocks.forEach(b => b.querySelectorAll('p').forEach(p => text += p.textContent + ' '));
                speakInSequence(text);
            }
            break;
        }
        case 'poem':
            if (typeof readStoryPartAloud === 'function') readStoryPartAloud(1, false);
            break;
        case 'thinking-text':
            narrator.speak('प्रश्न-अभ्यास खंड में आपका स्वागत है।');
            break;
        case 'thinking-language':
            // Add welcome message for language study tab
            narrator.speak('भाषा अध्ययन में आपका स्वागत है।');
            break;
        case 'activities':
            narrator.speak('गतिविधि खंड में आपका स्वागत है।');
            break;
    }
}

function getModuleName(moduleId) {
    switch (moduleId) {
        case 'author': return 'लेखक परिचय';
        case 'prereading': return 'पाठ प्रवेश';
        case 'poem': return 'कविता';
        case 'thinking-text': return 'प्रश्न अभ्यास';
        case 'thinking-language': return 'भाषा अध्ययन';
        case 'activities': return 'गतिविधियां';
        default: return moduleId;
    }
}

// Update Progress
function updateProgress() {
    progress = (modulesCompleted.length / 6) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
        progressBar.textContent = Math.round(progress) + '%';
    }
    const mc = document.getElementById('modulesComplete');
    if (mc) mc.textContent = modulesCompleted.length;
    const bar = document.querySelector('.progress-bar');
    if (bar) bar.setAttribute('aria-valuenow', Math.round(progress));
}

// Show Achievement
function showAchievement(text) {
    const popup = document.getElementById('achievementPopup');
    const desc = document.getElementById('achievementDesc');
    if (!popup || !desc) return;
    desc.textContent = text;
    popup.classList.add('show');
    score += 10;
    const ts = document.getElementById('totalScore');
    if (ts) ts.textContent = score;
    setTimeout(() => popup.classList.remove('show'), 3000);
}

// Track user interaction
function trackUserInteraction() {
    if (!userInteracted) userInteracted = true;
    return userInteracted;
}

// Toggle Audio
function toggleAudio() {
    trackUserInteraction();
    if (!narrator) return;
    const btn = document.getElementById('audioBtn');
    audioEnabled = narrator.toggle();
    if (btn) {
        btn.textContent = audioEnabled ? '🔊' : '🔇';
        btn.classList.toggle('muted', !audioEnabled);
        btn.setAttribute('aria-label', audioEnabled ? 'वाचन बंद करें' : 'वाचन शुरू करें');
    }
}

// Speak long text in sequence
function speakInSequence(text) {
    if (!window.narrator) return;
    const sentences = text.match(/[^.!?।]+[.!?।]+/g) || [text];
    function speakNext(i = 0) {
        if (i >= sentences.length) return;
        window.narrator.onEndCallback = function() { setTimeout(() => speakNext(i + 1), 200); };
        window.narrator.speak(sentences[i]);
    }
    speakNext(0);
}

// Helpers used by activities
function recordSpeaking() {
    alert('वास्तविक कार्यान्वयन में, यह Web Audio API का उपयोग करके आपकी बोली हुई प्रतिक्रिया रिकॉर्ड करेगा।');
    score += 10;
    const ts = document.getElementById('totalScore');
    if (ts) ts.textContent = score;
    if (narrator) narrator.speak('कविता के भावों पर अपने विचार साझा करें।');
}


