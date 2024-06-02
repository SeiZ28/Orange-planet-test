document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const buttonElement = document.getElementById('button');
    const scoreCounterContainer = document.getElementById('score-counter-container');
    const energyBarInner = document.getElementById('energy-bar-inner');
    const energyText = document.getElementById('energy-text');
    let score = 0.00;
    let energy = 10.00; // Initial energy

    const maxEnergy = 10.00;
    const energyRegenRate = 0.01; // Energy regenerated per second

    buttonElement.addEventListener('mouseup', async (event) => {
        if (energy > 0) {
            // Update score
            score+=0.01;
            score = parseFloat(score.toFixed(2));
            scoreElement.textContent = score.toFixed(2);

            // Decrease energy
            energy = Math.max(energy - 0.01, 0);
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
            scoreCounter.textContent = '+0.01';
            scoreCounter.className = 'score-counter';

            scoreCounter.style.left = `${x}px`;
            scoreCounter.style.top = `${y}px`;
            scoreCounterContainer.appendChild(scoreCounter);

            await sleep(30);

            scoreCounter.style.opacity = '0';
            scoreCounter.style.top = `${y - 200}px`;

            await sleep(1000);

            scoreCounterContainer.removeChild(scoreCounter);
        }
    });

    function updateEnergy() {
        energy = parseFloat(energy.toFixed(2));
        energyText.textContent = `${energy.toFixed(2)} / ${maxEnergy.toFixed(2)}`;
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
