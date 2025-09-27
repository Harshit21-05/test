// BeFit Wellness App JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('BeFit Wellness App Loaded Successfully!');
    
    // Initialize app components
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Initialize daily tips
    initializeDailyTips();
    
    // Initialize button interactions
    initializeButtons();
    
    // Initialize stats tracking
    initializeStats();
    
    // Add smooth scrolling and animations
    addAnimations();
}

// Daily Tips Functionality
function initializeDailyTips() {
    const tips = [
        "Practice deep breathing for 5 minutes every morning to center your mind and body.",
        "Start your day with gratitude - write down three things you're thankful for.",
        "Take short breaks every hour to stretch and refresh your mind.",
        "Drink water throughout the day to stay hydrated and energized.",
        "Practice mindful eating - savor each bite and eat without distractions.",
        "Get some sunlight daily to boost your vitamin D and mood naturally.",
        "End your day with a few minutes of meditation to promote better sleep.",
        "Connect with nature - even a few minutes outdoors can reduce stress.",
        "Practice the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8.",
        "Keep a wellness journal to track your mood, energy, and progress."
    ];
    
    const dailyTipElement = document.getElementById('dailyTip');
    if (dailyTipElement) {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        dailyTipElement.textContent = randomTip;
    }
    
    // Change tip every 10 seconds
    setInterval(() => {
        if (dailyTipElement) {
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            dailyTipElement.style.opacity = '0';
            setTimeout(() => {
                dailyTipElement.textContent = randomTip;
                dailyTipElement.style.opacity = '1';
            }, 300);
        }
    }, 10000);
}

// Button Interactions
function initializeButtons() {
    // Chakra Camp Button
    const chakraCampBtn = document.getElementById('chakraCampBtn');
    if (chakraCampBtn) {
        chakraCampBtn.addEventListener('click', function() {
            console.log('Chakra Camp button clicked');
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Surya Namaskar Button
    const suryaNamaskarBtn = document.getElementById('suryaNamaskarBtn');
    if (suryaNamaskarBtn) {
        suryaNamaskarBtn.addEventListener('click', function() {
            console.log('Surya Namaskar button clicked');
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Stats Tracking
function initializeStats() {
    // Get stats from localStorage or initialize with 0
    const stats = {
        daysPracticed: parseInt(localStorage.getItem('daysPracticed') || '0'),
        sessionsCompleted: parseInt(localStorage.getItem('sessionsCompleted') || '0'),
        minutesMeditated: parseInt(localStorage.getItem('minutesMeditated') || '0')
    };
    
    // Update stats display
    updateStatsDisplay(stats);
    
    // Simulate gradual counting animation
    animateStats(stats);
}

// Update Stats Display
function updateStatsDisplay(stats) {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = stats.daysPracticed;
        statNumbers[1].textContent = stats.sessionsCompleted;
        statNumbers[2].textContent = stats.minutesMeditated;
    }
}

// Animate Stats Counter
function animateStats(targetStats) {
    const statNumbers = document.querySelectorAll('.stat-number');
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const stepDuration = duration / steps;
    
    const statsArray = [targetStats.daysPracticed, targetStats.sessionsCompleted, targetStats.minutesMeditated];
    
    statsArray.forEach((target, index) => {
        if (statNumbers[index] && target > 0) {
            let current = 0;
            const increment = target / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                statNumbers[index].textContent = Math.floor(current);
            }, stepDuration);
        }
    });
}

// Add Animations and Effects
function addAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsSection.style.opacity = '0';
        statsSection.style.transform = 'translateY(30px)';
        statsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(statsSection);
    }
    
    // Add floating animation to app title icon
    const appIcon = document.querySelector('.app-title .icon');
    if (appIcon) {
        appIcon.style.animation = 'float 6s ease-in-out infinite';
    }
}

// Utility Functions

// Update Practice Stats
function updatePracticeStats(type) {
    const stats = {
        daysPracticed: parseInt(localStorage.getItem('daysPracticed') || '0'),
        sessionsCompleted: parseInt(localStorage.getItem('sessionsCompleted') || '0'),
        minutesMeditated: parseInt(localStorage.getItem('minutesMeditated') || '0')
    };
    
    switch(type) {
        case 'chakra':
            stats.sessionsCompleted += 1;
            stats.minutesMeditated += 15; // Assume 15 minutes per chakra session
            break;
        case 'surya':
            stats.sessionsCompleted += 1;
            stats.minutesMeditated += 20; // Assume 20 minutes per surya namaskar session
            break;
    }
    
    // Update days practiced (simplified logic)
    const lastPracticeDate = localStorage.getItem('lastPracticeDate');
    const today = new Date().toDateString();
    if (lastPracticeDate !== today) {
        stats.daysPracticed += 1;
        localStorage.setItem('lastPracticeDate', today);
    }
    
    // Save to localStorage
    localStorage.setItem('daysPracticed', stats.daysPracticed.toString());
    localStorage.setItem('sessionsCompleted', stats.sessionsCompleted.toString());
    localStorage.setItem('minutesMeditated', stats.minutesMeditated.toString());
    
    // Update display
    updateStatsDisplay(stats);
    animateStats(stats);
}

// Theme Toggle (for future enhancement)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme on load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Wellness Reminders (future feature)
function setupWellnessReminders() {
    // This could be expanded to show gentle reminders
    console.log('Wellness reminders feature ready for implementation');
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        updatePracticeStats,
        toggleTheme
    };
}
