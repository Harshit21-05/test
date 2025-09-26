// Enhanced Surya Namaskar App - Perplexity Labs Theme with Full Screen Layout
class SuryaNamaskarApp {
    constructor() {
        this.poses = [
            {
                step: 1,
                name: "Pranamasana",
                sanskrit: "प्रणामासन",
                english: "Prayer Pose",
                breathing: "Normal breathing",
                description: "Stand with palms together at heart center",
                benefits: "Centers the mind and body, promotes focus"
            },
            {
                step: 2,
                name: "Hasta Uttanasana", 
                sanskrit: "हस्त उत्तानासन",
                english: "Raised Arms Pose",
                breathing: "Inhale",
                description: "Raise arms up and arch back gently",
                benefits: "Opens chest, improves lung capacity"
            },
            {
                step: 3,
                name: "Padahastasana",
                sanskrit: "पादहस्तासन", 
                english: "Standing Forward Bend",
                breathing: "Exhale",
                description: "Fold forward from hips, hands to floor",
                benefits: "Stretches hamstrings, calms the mind"
            },
            {
                step: 4,
                name: "Ashwa Sanchalanasana",
                sanskrit: "अश्व सञ्चालनासन",
                english: "Low Lunge",
                breathing: "Inhale", 
                description: "Step right leg back, knee down, look up",
                benefits: "Strengthens legs, opens hip flexors"
            },
            {
                step: 5,
                name: "Dandasana",
                sanskrit: "दण्डासन",
                english: "Plank Pose",
                breathing: "Hold breath",
                description: "Body in straight line, arms strong",
                benefits: "Builds core strength, tones arms"
            },
            {
                step: 6,
                name: "Ashtanga Namaskara",
                sanskrit: "अष्टाङ्ग नमस्कार",
                english: "Eight-Limbed Pose", 
                breathing: "Exhale",
                description: "Knees, chest, chin to floor",
                benefits: "Develops arm and chest strength"
            },
            {
                step: 7,
                name: "Bhujangasana",
                sanskrit: "भुजङ्गासन",
                english: "Cobra Pose",
                breathing: "Inhale",
                description: "Slide forward, lift chest and head",
                benefits: "Strengthens spine, opens heart chakra"
            },
            {
                step: 8,
                name: "Parvatasana", 
                sanskrit: "पर्वतासन",
                english: "Downward Facing Dog",
                breathing: "Exhale",
                description: "Lift hips up, inverted V shape",
                benefits: "Stretches entire body, improves circulation"
            },
            {
                step: 9,
                name: "Ashwa Sanchalanasana",
                sanskrit: "अश्व सञ्चालनासन", 
                english: "Low Lunge",
                breathing: "Inhale",
                description: "Step right foot forward, look up",
                benefits: "Balances the previous movement"
            },
            {
                step: 10,
                name: "Padahastasana",
                sanskrit: "पादहस्तासन",
                english: "Standing Forward Bend", 
                breathing: "Exhale",
                description: "Both feet forward, fold at hips",
                benefits: "Releases tension, improves flexibility"
            },
            {
                step: 11,
                name: "Hasta Uttanasana",
                sanskrit: "हस्त उत्तानासन",
                english: "Raised Arms Pose",
                breathing: "Inhale", 
                description: "Rise up with arms, gentle backbend",
                benefits: "Energizes the body, opens the heart"
            },
            {
                step: 12,
                name: "Pranamasana",
                sanskrit: "प्रणामासन",
                english: "Prayer Pose",
                breathing: "Exhale",
                description: "Return to prayer position at heart",
                benefits: "Completes the cycle, brings inner peace"
            }
        ];

        this.presets = [
            {
                name: "beginner",
                label: "Beginner",
                description: "Gentle pace for newcomers",
                roundGroups: [
                    {startRound: 1, endRound: 3, stepDuration: 5, skipStep1: false}
                ]
            },
            {
                name: "intermediate",
                label: "Intermediate", 
                description: "Balanced practice",
                roundGroups: [
                    {startRound: 1, endRound: 6, stepDuration: 3, skipStep1: false}
                ]
            },
            {
                name: "advanced",
                label: "Advanced",
                description: "Fast-paced traditional practice",
                roundGroups: [
                    {startRound: 1, endRound: 12, stepDuration: 1, skipStep1: false}
                ]
            }
        ];

        this.settings = {
            roundGroups: [
                {startRound: 1, endRound: 3, stepDuration: 3, skipStep1: false}
            ]
        };

        this.practiceState = {
            isActive: false,
            isPaused: false,
            currentRound: 1,
            currentStep: 1,
            currentStepTime: 0,
            totalTime: 0,
            roundGroupIndex: 0,
            timerInterval: null
        };

        this.audioContext = null;
        this.volume = 0.5;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSettings();
        this.renderRoundGroups();
        this.setupAudio();
    }

    setupEventListeners() {
        // Home page events
        const startPracticeBtn = document.getElementById('startPractice');
        if (startPracticeBtn) {
            startPracticeBtn.addEventListener('click', () => this.startPractice());
        }
        
        // Settings events
        const addRoundGroupBtn = document.getElementById('addRoundGroupBtn');
        if (addRoundGroupBtn) {
            addRoundGroupBtn.addEventListener('click', () => this.addRoundGroup());
        }

        const clearAllBtn = document.getElementById('clearAllBtn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAllGroups());
        }

        const saveConfigBtn = document.getElementById('saveConfigBtn');
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', () => this.saveConfiguration());
        }

        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.loadPreset(e.target.dataset.preset));
        });

        // Yoga page events
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startYogaPractice());
        }

        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pausePractice());
        }

        const stopBtn = document.getElementById('stopBtn');
        if (stopBtn) {
            stopBtn.addEventListener('click', () => this.stopPractice());
        }

        const backHomeBtn = document.getElementById('backHomeBtn');
        if (backHomeBtn) {
            backHomeBtn.addEventListener('click', () => this.backToHome());
        }

        // Volume control
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.volume = e.target.value / 100;
            });
        }
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('suryaNamaskarSettings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
        }
    }

    saveSettings() {
        localStorage.setItem('suryaNamaskarSettings', JSON.stringify(this.settings));
    }

    loadPreset(presetName) {
        const preset = this.presets.find(p => p.name === presetName);
        if (preset) {
            this.settings.roundGroups = [...preset.roundGroups];
            this.renderRoundGroups();
            
            // Update active preset button
            document.querySelectorAll('.preset-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.preset === presetName) {
                    btn.classList.add('active');
                }
            });
        }
    }

    addRoundGroup() {
        const newGroup = {
            startRound: this.getNextStartRound(),
            endRound: this.getNextStartRound() + 2,
            stepDuration: 3,
            skipStep1: false
        };
        
        this.settings.roundGroups.push(newGroup);
        this.renderRoundGroups();
    }

    getNextStartRound() {
        if (this.settings.roundGroups.length === 0) return 1;
        const lastGroup = this.settings.roundGroups[this.settings.roundGroups.length - 1];
        return lastGroup.endRound + 1;
    }

    deleteRoundGroup(index) {
        if (this.settings.roundGroups.length > 1) {
            this.settings.roundGroups.splice(index, 1);
            this.renderRoundGroups();
        }
    }

    clearAllGroups() {
        this.settings.roundGroups = [
            {startRound: 1, endRound: 3, stepDuration: 3, skipStep1: false}
        ];
        this.renderRoundGroups();
        
        // Clear active preset
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    saveConfiguration() {
        if (this.validateSettings()) {
            this.saveSettings();
            this.showMessage('Configuration saved successfully!', 'success');
        }
    }

    validateSettings() {
        // Check for overlapping ranges
        const sortedGroups = [...this.settings.roundGroups].sort((a, b) => a.startRound - b.startRound);
        
        for (let i = 0; i < sortedGroups.length - 1; i++) {
            if (sortedGroups[i].endRound >= sortedGroups[i + 1].startRound) {
                this.showMessage('Round ranges cannot overlap!', 'error');
                return false;
            }
        }

        // Check for invalid ranges
        for (let group of this.settings.roundGroups) {
            if (group.startRound > group.endRound) {
                this.showMessage('Start round must be less than or equal to end round!', 'error');
                return false;
            }
            if (group.stepDuration <= 0) {
                this.showMessage('Step duration must be greater than 0!', 'error');
                return false;
            }
        }

        return true;
    }

    renderRoundGroups() {
        const container = document.getElementById('roundGroupsContainer');
        if (!container) return;

        container.innerHTML = '';

        this.settings.roundGroups.forEach((group, index) => {
            const groupElement = document.createElement('div');
            groupElement.className = 'round-group fade-in';
            groupElement.innerHTML = `
                <div class="round-group-header">
                    <span class="round-group-title">Round Group ${index + 1}</span>
                    ${this.settings.roundGroups.length > 1 ? 
                        `<button class="delete-group-btn" onclick="app.deleteRoundGroup(${index})">
                            <span>❌</span> Delete
                        </button>` 
                        : ''
                    }
                </div>
                <div class="round-group-inputs">
                    <div class="input-group">
                        <label class="input-label">Start Round</label>
                        <input type="number" class="form-input" min="1" value="${group.startRound}" 
                               onchange="app.updateRoundGroup(${index}, 'startRound', this.value)">
                    </div>
                    <div class="input-group">
                        <label class="input-label">End Round</label>
                        <input type="number" class="form-input" min="1" value="${group.endRound}"
                               onchange="app.updateRoundGroup(${index}, 'endRound', this.value)">
                    </div>
                    <div class="input-group">
                        <label class="input-label">Duration (sec)</label>
                        <input type="number" class="form-input" min="1" max="10" value="${group.stepDuration}"
                               onchange="app.updateRoundGroup(${index}, 'stepDuration', this.value)">
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" class="form-checkbox" ${group.skipStep1 ? 'checked' : ''}
                               onchange="app.updateRoundGroup(${index}, 'skipStep1', this.checked)">
                        <label class="input-label">Skip Step 1</label>
                    </div>
                </div>
            `;
            container.appendChild(groupElement);
        });
    }

    updateRoundGroup(index, field, value) {
        if (field === 'startRound' || field === 'endRound' || field === 'stepDuration') {
            value = parseInt(value);
        }
        this.settings.roundGroups[index][field] = value;
    }

    startPractice() {
        if (!this.validateSettings()) return;
        
        const homeContainer = document.getElementById('homeContainer');
        const yogaContainer = document.getElementById('yogaContainer');
        
        if (homeContainer) homeContainer.style.display = 'none';
        if (yogaContainer) yogaContainer.style.display = 'block';
        
        this.resetPracticeState();
        this.updateYogaDisplay();
    }

    resetPracticeState() {
        this.practiceState = {
            isActive: false,
            isPaused: false,
            currentRound: 1,
            currentStep: 1,
            currentStepTime: 0,
            totalTime: this.calculateTotalTime(),
            roundGroupIndex: 0,
            timerInterval: null
        };
    }

    calculateTotalTime() {
        let total = 0;
        this.settings.roundGroups.forEach(group => {
            const rounds = group.endRound - group.startRound + 1;
            const stepsPerRound = group.skipStep1 ? 11 : 12;
            total += rounds * stepsPerRound * group.stepDuration;
        });
        return total;
    }

    startYogaPractice() {
        this.practiceState.isActive = true;
        this.practiceState.isPaused = false;
        
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (startBtn) startBtn.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'inline-block';
        
        this.startTimer();
    }

    pausePractice() {
        this.practiceState.isPaused = !this.practiceState.isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (pauseBtn) {
            pauseBtn.innerHTML = this.practiceState.isPaused ? 
                '<span>▶️</span> Resume' : '<span>⏸️</span> Pause';
        }
        
        if (!this.practiceState.isPaused && this.practiceState.isActive) {
            this.startTimer();
        }
    }

    stopPractice() {
        this.practiceState.isActive = false;
        if (this.practiceState.timerInterval) {
            clearTimeout(this.practiceState.timerInterval);
            this.practiceState.timerInterval = null;
        }

        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (startBtn) startBtn.style.display = 'inline-block';
        if (pauseBtn) {
            pauseBtn.style.display = 'none';
            pauseBtn.innerHTML = '<span>⏸️</span> Pause';
        }
        
        this.resetPracticeState();
        this.updateYogaDisplay();
    }

    backToHome() {
        const yogaContainer = document.getElementById('yogaContainer');
        const homeContainer = document.getElementById('homeContainer');
        
        if (yogaContainer) yogaContainer.style.display = 'none';
        if (homeContainer) homeContainer.style.display = 'block';
        
        this.stopPractice();
    }

    startTimer() {
        if (!this.practiceState.isActive || this.practiceState.isPaused) return;
        
        const currentGroup = this.getCurrentRoundGroup();
        if (!currentGroup) {
            this.completePractice();
            return;
        }
        
        const stepDuration = currentGroup.stepDuration;
        
        if (this.practiceState.currentStepTime >= stepDuration) {
            this.nextStep();
            this.practiceState.currentStepTime = 0;
        }
        
        this.practiceState.currentStepTime++;
        this.practiceState.totalTime = Math.max(0, this.practiceState.totalTime - 1);
        
        this.updateYogaDisplay();
        
        if (this.practiceState.currentStepTime === 1) {
            this.playStepSound();
        }
        
        this.practiceState.timerInterval = setTimeout(() => this.startTimer(), 1000);
    }

    getCurrentRoundGroup() {
        return this.settings.roundGroups.find(group => 
            this.practiceState.currentRound >= group.startRound && 
            this.practiceState.currentRound <= group.endRound
        );
    }

    nextStep() {
        const currentGroup = this.getCurrentRoundGroup();
        const maxStep = currentGroup.skipStep1 ? 11 : 12;
        
        if (this.practiceState.currentStep >= maxStep) {
            this.nextRound();
        } else {
            this.practiceState.currentStep++;
            if (currentGroup.skipStep1 && this.practiceState.currentStep === 1) {
                this.practiceState.currentStep = 2;
            }
        }
        
        this.updateBreathingIndicator();
    }

    nextRound() {
        const currentGroup = this.getCurrentRoundGroup();
        
        if (this.practiceState.currentRound >= currentGroup.endRound) {
            // Move to next group
            const nextGroupIndex = this.settings.roundGroups.findIndex(group => 
                group.startRound > this.practiceState.currentRound
            );
            
            if (nextGroupIndex !== -1) {
                this.practiceState.currentRound = this.settings.roundGroups[nextGroupIndex].startRound;
                this.practiceState.currentStep = this.settings.roundGroups[nextGroupIndex].skipStep1 ? 2 : 1;
            } else {
                this.completePractice();
                return;
            }
        } else {
            this.practiceState.currentRound++;
            this.practiceState.currentStep = currentGroup.skipStep1 ? 2 : 1;
        }
        
        this.playRoundSound();
    }

    completePractice() {
        this.practiceState.isActive = false;
        if (this.practiceState.timerInterval) {
            clearTimeout(this.practiceState.timerInterval);
            this.practiceState.timerInterval = null;
        }
        
        this.playCompletionSound();
        this.showMessage('🎉 Practice completed! Well done! 🧘‍♀️', 'success');
        
        setTimeout(() => this.backToHome(), 3000);
    }

    updateYogaDisplay() {
        // Update progress
        const currentRoundEl = document.getElementById('currentRound');
        const totalRoundsEl = document.getElementById('totalRounds');
        const currentStepEl = document.getElementById('currentStep');
        
        if (currentRoundEl) currentRoundEl.textContent = this.practiceState.currentRound;
        if (totalRoundsEl) totalRoundsEl.textContent = this.getTotalRounds();
        if (currentStepEl) currentStepEl.textContent = this.practiceState.currentStep;
        
        // Update timers
        const totalTimerEl = document.getElementById('totalTimer');
        if (totalTimerEl) totalTimerEl.textContent = this.formatTime(this.practiceState.totalTime);
        
        const currentGroup = this.getCurrentRoundGroup();
        const remainingStepTime = currentGroup ? currentGroup.stepDuration - this.practiceState.currentStepTime : 0;
        const stepTimerEl = document.getElementById('stepTimer');
        if (stepTimerEl) stepTimerEl.textContent = remainingStepTime;
        
        // Update progress bar
        const totalTime = this.calculateTotalTime();
        const progress = totalTime > 0 ? ((totalTime - this.practiceState.totalTime) / totalTime) * 100 : 0;
        const progressFillEl = document.getElementById('progressFill');
        if (progressFillEl) progressFillEl.style.width = `${progress}%`;
        
        // Update pose information
        this.updatePoseDisplay();
    }

    getTotalRounds() {
        return this.settings.roundGroups.reduce((total, group) => 
            total + (group.endRound - group.startRound + 1), 0
        );
    }

    updatePoseDisplay() {
        const pose = this.poses[this.practiceState.currentStep - 1];
        if (!pose) return;
        
        const poseNameEl = document.getElementById('poseName');
        const poseSanskritEl = document.getElementById('poseSanskrit');
        const poseEnglishEl = document.getElementById('poseEnglish');
        const breathingTextEl = document.getElementById('breathingText');
        const descriptionTextEl = document.getElementById('descriptionText');
        const benefitsTextEl = document.getElementById('benefitsText');
        
        if (poseNameEl) poseNameEl.textContent = pose.name;
        if (poseSanskritEl) poseSanskritEl.textContent = pose.sanskrit;
        if (poseEnglishEl) poseEnglishEl.textContent = pose.english;
        if (breathingTextEl) breathingTextEl.textContent = pose.breathing;
        if (descriptionTextEl) descriptionTextEl.textContent = pose.description;
        if (benefitsTextEl) benefitsTextEl.textContent = pose.benefits;
    }

    updateBreathingIndicator() {
        const pose = this.poses[this.practiceState.currentStep - 1];
        const indicator = document.getElementById('breathingIndicator');
        
        if (pose && indicator) {
            indicator.className = 'breathing-indicator';
            if (pose.breathing.toLowerCase().includes('inhale')) {
                indicator.classList.add('inhale');
            } else if (pose.breathing.toLowerCase().includes('exhale')) {
                indicator.classList.add('exhale');
            }
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    setupAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Audio not supported');
        }
    }

    playSound(frequency, duration = 0.3) {
        if (!this.audioContext || this.volume === 0) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playStepSound() {
        this.playSound(528, 0.2);
    }

    playRoundSound() {
        this.playSound(396, 0.5);
    }

    playCompletionSound() {
        this.playSound(741, 1.0);
    }

    showMessage(text, type = 'info') {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            color: var(--primary-text);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border-left: 4px solid var(--perplexity-blue);
            box-shadow: 0 4px 15px var(--shadow);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;
        notification.textContent = text;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SuryaNamaskarApp();
});

// CSS for notifications
const notificationStyles = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Make app globally accessible for inline event handlers
window.app = app;
