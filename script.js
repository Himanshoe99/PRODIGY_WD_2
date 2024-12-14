let time = 0;
        let interval;
        let isRunning = false;
        let laps = [];

        const display = document.getElementById('display');
        const startStopButton = document.getElementById('startStop');
        const resetButton = document.getElementById('reset');
        const lapButton = document.getElementById('lap');
        const lapsContainer = document.getElementById('laps');
        const themeToggle = document.getElementById('themeToggle');

        function formatTime(ms) {
            const minutes = Math.floor(ms / 60000);
            const seconds = Math.floor((ms % 60000) / 1000);
            const centiseconds = Math.floor((ms % 1000) / 10);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
        }

        function updateDisplay() {
            display.textContent = formatTime(time);
        }

        function startStop() {
            if (isRunning) {
                clearInterval(interval);
                startStopButton.innerHTML = '▶';
                startStopButton.setAttribute('aria-label', 'Start');
                lapButton.disabled = true;
            } else {
                const startTime = Date.now() - time;
                interval = setInterval(() => {
                    time = Date.now() - startTime;
                    updateDisplay();
                }, 10);
                startStopButton.innerHTML = '⏸';
                startStopButton.setAttribute('aria-label', 'Stop');
                resetButton.disabled = false;
                lapButton.disabled = false;
            }
            isRunning = !isRunning;
        }

        function reset() {
            clearInterval(interval);
            time = 0;
            laps = [];
            updateDisplay();
            updateLaps();
            isRunning = false;
            startStopButton.innerHTML = '▶';
            startStopButton.setAttribute('aria-label', 'Start');
            resetButton.disabled = true;
            lapButton.disabled = true;
        }

        function lap() {
            laps.push(time);
            updateLaps();
        }

        function updateLaps() {
            lapsContainer.innerHTML = '';
            laps.forEach((lapTime, index) => {
                const lapElement = document.createElement('div');
                lapElement.classList.add('lap');
                lapElement.innerHTML = `
                    <span>Lap ${laps.length - index}</span>
                    <span>${formatTime(lapTime)}</span>
                `;
                lapsContainer.prepend(lapElement);
            });
        }

        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        }

        startStopButton.addEventListener('click', startStop);
        resetButton.addEventListener('click', reset);
        lapButton.addEventListener('click', lap);
        themeToggle.addEventListener('click', toggleTheme);