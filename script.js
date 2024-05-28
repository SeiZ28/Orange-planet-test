document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const buttonElement = document.getElementById('button');
    const scoreCounterContainer = document.getElementById('score-counter-container');
    const energyBarInner = document.getElementById('energy-bar-inner');
    const energyText = document.getElementById('energy-text');
    let score = 0;
    let energy = 1000; // Initial energy

    const maxEnergy = 1000;
    const energyRegenRate = 2; // Energy regenerated per second

    buttonElement.addEventListener('click', async (event) => {
        if (energy > 0) {
            // Update score
            score++;
            scoreElement.textContent = score;

            // Decrease energy
            energy = Math.max(energy - 1, 0);
            updateEnergy();

            // Animate button
            buttonElement.style.transform = 'scale(0.95)';
            setTimeout(() => {
                buttonElement.style.transform = 'scale(1)';
            }, 75);

            // Get click coordinates
            const rect = buttonElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Create and animate score counter
            const scoreCounter = document.createElement('div');
            scoreCounter.textContent = '+1';
            scoreCounter.className = 'score-counter';

            scoreCounter.style.left = `${x}px`;
            scoreCounter.style.top = `${y}px`;
            scoreCounterContainer.appendChild(scoreCounter);

            await sleep(50);

            scoreCounter.style.opacity = '0';
            scoreCounter.style.top = `${y - 100}px`;

            await sleep(1000);

            scoreCounterContainer.removeChild(scoreCounter);
        }
    });

    function updateEnergy() {
        energyText.textContent = `${energy} / ${maxEnergy}`;
        const widthPercentage = (energy / maxEnergy) * 100;
        energyBarInner.style.width = `${widthPercentage}%`;
    }

    function regenerateEnergy() {
        setInterval(() => {
            if (energy < maxEnergy) {
                energy = Math.min(energy + energyRegenRate, maxEnergy);
                updateEnergy();
            }
        }, 1000); // Run every 1000ms (1 second)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Start regenerating energy
    regenerateEnergy();
});
