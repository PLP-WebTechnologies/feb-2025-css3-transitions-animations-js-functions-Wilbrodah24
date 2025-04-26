

(index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animations & localStorage Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Animation & Preferences Demo</h1>
        
        <div class="preferences">
            <h2>User Preferences</h2>
            <div class="preference-option">
                <label for="theme">Select Theme:</label>
                <select id="theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="blue">Blue</option>
                </select>
            </div>
            <div class="preference-option">
                <label for="animation">Favorite Animation:</label>
                <select id="animation">
                    <option value="bounce">Bounce</option>
                    <option value="spin">Spin</option>
                    <option value="pulse">Pulse</option>
                </select>
            </div>
            <button id="savePrefs">Save Preferences</button>
        </div>
        
        <div class="animation-area">
            <h2>Animation Playground</h2>
            <div class="animated-box" id="animatedBox">
                Click me or use your saved animation!
            </div>
            <button id="triggerAnimation">Trigger Animation</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

CSS (styles.css)
```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 19px;
    transition: background-color 0.5s ease, color 0.5s ease;
}

.container {
    max-width: 800px;
    margin: 0 auto;
}

.preferences, .animation-area {
    background: #f5f5f5;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    transition: background-color 0.5s ease;
}

.preference-option {
    margin-bottom: 15px;
}

label {
    display: inline-block;
    width: 150px;
    margin-right: 10px;
}

select, button {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
    background-color: #45a049;
    transform: scale(1.05);
}

.animated-box {
    width: 200px;
    height: 200px;
    background-color: #4CAF50;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 20px auto;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Animation Classes */
.bounce {
    animation: bounce 0.8s ease infinite alternate;
}

.spin {
    animation: spin 1.5s linear infinite;
}

.pulse {
    animation: pulse 2s ease infinite;
}

/* Keyframe Animations */
@keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-20px); }
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* Theme Classes */
.light-theme {
    background-color: white;
    color: #333;
}

.dark-theme {
    background-color: #333;
    color: white;
}

.dark-theme .preferences, 
.dark-theme .animation-area {
    background: #444;
    color: blue;
}

.blue-theme {
    background-color: #e6f2ff;
    color: #003366;
}

.blue-theme .preferences, 
.blue-theme .animation-area {
    background: #cce0ff;
}
```

 JavaScript (script.js)

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSelect = document.getElementById('theme');
    const animationSelect = document.getElementById('animation');
    const savePrefsBtn = document.getElementById('savePrefs');
    const animatedBox = document.getElementById('animatedBox');
    const triggerAnimationBtn = document.getElementById('triggerAnimation');
    
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
});
```



