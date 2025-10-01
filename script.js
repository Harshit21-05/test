const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;

function initAudio() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
}
function playStepSound() {
    initAudio();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode); gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 528;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.22, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.28);
}
function playRoundSound() {
    initAudio();
    const osc1 = audioContext.createOscillator(), osc2 = audioContext.createOscillator(), gainNode = audioContext.createGain();
    osc1.connect(gainNode); osc2.connect(gainNode); gainNode.connect(audioContext.destination);
    osc1.frequency.value = 432; osc2.frequency.value = 648;
    osc1.type = osc2.type = 'sine';
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.015, audioContext.currentTime + 0.4);
    osc1.start(audioContext.currentTime); osc2.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 0.4); osc2.stop(audioContext.currentTime + 0.4);
}
function playCompletionSound() {
    initAudio();
    [528, 594, 648, 705].forEach((freq, idx) => {
        setTimeout(() => {
            const osc = audioContext.createOscillator(), gain = audioContext.createGain();
            osc.connect(gain); gain.connect(audioContext.destination);
            osc.frequency.value = freq; osc.type = 'sine';
            gain.gain.setValueAtTime(0.14, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.22);
            osc.start(audioContext.currentTime); osc.stop(audioContext.currentTime + 0.21);
        }, idx*120);
    });
}
const poses = [
    { name: "Pranamasana", description: "Prayer Pose", breath: "Exhale", step: 1 },
    { name: "Hasta Uttanasana", description: "Raised Arms Pose", breath: "Inhale", step: 2 },
    { name: "Padahastasana", description: "Standing Forward Bend", breath: "Exhale", step: 3 },
    { name: "Ashwa Sanchalanasana", description: "Equestrian Pose", breath: "Inhale", step: 4 },
    { name: "Parvatasana", description: "Mountain Pose", breath: "Exhale", step: 5 },
    { name: "Ashtanga Namaskara", description: "Eight Limbs Pose", breath: "Hold", step: 6 },
    { name: "Bhujangasana", description: "Cobra Pose", breath: "Inhale", step: 7 },
    { name: "Parvatasana", description: "Mountain Pose", breath: "Exhale", step: 8 },
    { name: "Ashwa Sanchalanasana", description: "Equestrian Pose", breath: "Inhale", step: 9 },
    { name: "Padahastasana", description: "Standing Forward Bend", breath: "Exhale", step: 10 },
    { name: "Hasta Uttanasana", description: "Raised Arms Pose", breath: "Inhale", step: 11 },
    { name: "Pranamasana", description: "Prayer Pose", breath: "Exhale", step: 12 }
];
let config = [], sectionCount = 0;
if (document.querySelector('.home-page')) {
    const roundSections = document.getElementById('roundSections');
    const addSectionBtn = document.getElementById('addSectionBtn');
    const mainStartBtn = document.getElementById('mainStartBtn');
    addRoundSection();
    addSectionBtn.addEventListener('click', addRoundSection);
    mainStartBtn.addEventListener('click', startPractice);
    function addRoundSection() {
        sectionCount++;
        const section = document.createElement('div');
        section.className = 'round-section';
        section.innerHTML = `
            <div class="section-header">
                <h3 class="section-title">Configuration ${sectionCount}</h3>
                ${sectionCount > 1 ? '<button class="remove-btn" onclick="removeSection(this)">Remove</button>' : ''}
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label class="input-label">From Round</label>
                    <input type="number" class="input-field from-round" value="${sectionCount === 1 ? 1 : ''}" min="1">
                </div>
                <div class="input-group">
                    <label class="input-label">To Round</label>
                    <input type="number" class="input-field to-round" value="${sectionCount === 1 ? 3 : ''}" min="1">
                </div>
                <div class="input-group">
                    <label class="input-label">Seconds per Step</label>
                    <input type="number" class="input-field step-timer" value="4" min="1" max="30">
                </div>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" class="checkbox-input skip-step1" id="skip${sectionCount}">
                <label class="checkbox-label" for="skip${sectionCount}">Skip Step 1 (Pranamasana) for these rounds</label>
            </div>
        `;
        roundSections.appendChild(section);
    }
    function startPractice() {
        initAudio();
        const sections = document.querySelectorAll('.round-section');
        config = [];
        sections.forEach(section => {
            const fromRound = parseInt(section.querySelector('.from-round').value);
            const toRound = parseInt(section.querySelector('.to-round').value);
            const stepTimer = parseInt(section.querySelector('.step-timer').value);
            const skipStep1 = section.querySelector('.skip-step1').checked;
            if (fromRound && toRound && stepTimer) {
                config.push({ fromRound, toRound, stepTimer, skipStep1 });
            }
        });
        if (config.length === 0) { alert('Please configure at least one round setting'); return; }
        localStorage.setItem('suryaNamaskarConfig', JSON.stringify(config));
        window.location.href = 'practice.html';
    }
}
window.removeSection = function(btn) { btn.closest('.round-section').remove(); };

if (document.querySelector('.practice-page')) {
    let currentRound = 1, currentStep = 0, isPaused = false, isRunning = false, stepTimer = 0,
        overallTimer = 0, totalTimeStart = 0, stepInterval = null, mainTimerInterval = null,
        totalRounds = 0, totalPosesCompleted = 0;

    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const homeBtn = document.getElementById('homeBtn');

    loadConfig();

    startBtn.addEventListener('click', startPractice);
    pauseBtn.addEventListener('click', togglePause);
    stopBtn.addEventListener('click', stopPractice);
    homeBtn.addEventListener('click', goHome);

    function loadConfig() {
        const savedConfig = localStorage.getItem('suryaNamaskarConfig');
        if (savedConfig) {
            config = JSON.parse(savedConfig);
            totalRounds = Math.max(...config.map(c => c.toRound));
            recalculateTotalTimeFromConfig();
        } else { alert('No configuration found. Returning to home.'); goHome(); }
    }

    function recalculateTotalTimeFromConfig() {
        overallTimer = 0;
        config.forEach(cfg => {
            const numRounds = cfg.toRound - cfg.fromRound + 1;
            const stepsPerRound = cfg.skipStep1 ? 11 : 12;
            overallTimer += numRounds * stepsPerRound * cfg.stepTimer;
        });
        totalTimeStart = overallTimer;
        updateOverallTimerDisplay();
    }

    function runMasterTimer() {
        if (mainTimerInterval) clearInterval(mainTimerInterval);
        mainTimerInterval = setInterval(() => {
            if (overallTimer > 0 && isRunning && !isPaused) {
                overallTimer--;
                updateOverallTimerDisplay();
            } else if (overallTimer <= 0) {
                clearInterval(mainTimerInterval);
                completePractice();
            }
        }, 1000);
    }

    function startPractice() {
        initAudio();
        isRunning = true; isPaused = false;
        startBtn.style.display = 'none'; pauseBtn.style.display = 'flex';
        runMasterTimer();
        nextStep();
    }

    function nextStep() {
        if (!isRunning || isPaused) return;
        const cfg = getCurrentConfig();
        if (!cfg) return;
        const stepCount = cfg.skipStep1 ? 11 : 12;
        stepTimer = cfg.stepTimer;
        if (currentStep === 0 && cfg.skipStep1) currentStep = 1;
        if (currentStep >= stepCount) {
            currentStep = 0; currentRound++;
            if (currentRound > totalRounds) { completePractice(); return; }
            playRoundSound();
            document.getElementById('roundInfo').innerHTML = `<span class="badge-text">Round ${currentRound} of ${totalRounds}</span>`;
            const newCfg = getCurrentConfig();
            if (newCfg.skipStep1) currentStep = 1;
        }
        const pose = poses[currentStep];
        document.getElementById('poseNumber').textContent = `${pose.step}/12`;
        document.getElementById('poseName').textContent = pose.name;
        document.getElementById('poseDescription').textContent = pose.description;
        document.getElementById('breathText').textContent = pose.breath;
        playStepSound();
        totalPosesCompleted++;
        updateStepTimerDisplay();
        if (stepInterval) clearInterval(stepInterval);
        stepInterval = setInterval(() => {
            if (!isPaused && isRunning) {
                stepTimer--;
                updateStepTimerDisplay();
                if (stepTimer <= 0) {
                    clearInterval(stepInterval);
                    currentStep++;
                    nextStep();
                }
            }
        },1000);
        updateProgressBar();
    }

    function updateStepTimerDisplay() {
        document.getElementById('stepTimer').textContent = `${stepTimer}s`;
    }
    function updateOverallTimerDisplay() {
        let min = Math.floor(overallTimer / 60);
        let sec = overallTimer % 60;
        document.getElementById('overallTimer').textContent = 
            `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
    function updateProgressBar() {
        let progress = ((totalTimeStart-overallTimer)/totalTimeStart)*100;
        document.getElementById('progressBar').style.width = progress+"%";
    }
    function getCurrentConfig() {
        for (let cfg of config) if (currentRound >= cfg.fromRound && currentRound <= cfg.toRound) return cfg;
        return config[0];
    }
    function togglePause() {
        isPaused = !isPaused;
        pauseBtn.querySelector('.btn-text').textContent = isPaused ? 'Resume' : 'Pause';
        pauseBtn.querySelector('.btn-icon').textContent = isPaused ? '▶' : '⏸';
    }
    function stopPractice() {
        isRunning = false; isPaused = false;
        clearInterval(stepInterval); clearInterval(mainTimerInterval);
        goHome();
    }
    function completePractice() {
        isRunning = false;
        clearInterval(stepInterval); clearInterval(mainTimerInterval);
        playCompletionSound();
        let timeSpent = totalTimeStart-overallTimer;
        let minutes = Math.floor(timeSpent/60), seconds = timeSpent%60;
        document.getElementById('totalRoundsCompleted').textContent = totalRounds;
        document.getElementById('totalTimeSpent').textContent = `${minutes}:${String(seconds).padStart(2,'0')}`;
        document.getElementById('totalPoses').textContent = totalPosesCompleted;
        document.getElementById('completionScreen').style.display = "flex";
        document.getElementById('progressBar').style.width = "100%";
    }
    window.goHome = function() { window.location.href = 'index.html'; }
}
function goHome() { window.location.href = 'index.html'; }
