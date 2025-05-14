
// Load saved preferences
loadPreferences();

// Save preferences to localStorage
savePrefsBtn.addEventListener('click', function() {
    const preferences = {
        theme: themeSelect.value,
        animation: animationSelect.value
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    alert('Preferences saved!');
    
    // Apply the selected theme immediately
    applyTheme(preferences.theme);
});

// Trigger animation on button click
triggerAnimationBtn.addEventListener('click', function() {
    triggerAnimation();
});

// Trigger animation when clicking the box
animatedBox.addEventListener('click', function() {
    triggerAnimation();
});

// Function to load preferences from localStorage
function loadPreferences() {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
        const preferences = JSON.parse(savedPrefs);
        
        // Set the select values
        themeSelect.value = preferences.theme;
        animationSelect.value = preferences.animation;
        
        // Apply the theme
        applyTheme(preferences.theme);
    }
}

// Function to apply the selected theme
function applyTheme(theme) {
    // Remove all theme classes first
    document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme');
    
    // Add the selected theme class
    if (theme !== 'light') {
        document.body.classList.add(`${theme}-theme`);
    }
}

// Function to trigger the animation
function triggerAnimation() {
    // Get the selected animation (either from select or localStorage)
    let animationType;
    if (animationSelect.value) {
        animationType = animationSelect.value;
    } else {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            animationType = JSON.parse(savedPrefs).animation;
        } else {
            animationType = 'bounce'; // default
        }
    }
    
    // Remove all animation classes first
    animatedBox.classList.remove('bounce', 'spin', 'pulse');
    
    // Force reflow to restart animation
    void animatedBox.offsetWidth;
    
    // Add the selected animation class
    animatedBox.classList.add(animationType);
    
    // Remove animation after it completes (for infinite animations we'll stop after one cycle)
    if (animationType === 'spin') {
        setTimeout(() => {
            animatedBox.classList.remove(animationType);
        }, 1500);
    } else if (animationType === 'pulse') {
        setTimeout(() => {
            animatedBox.classList.remove(animationType);
        }, 2000);
    } else {
        setTimeout(() => {
            animatedBox.classList.remove(animationType);
        }, 800);
    }
}