/* jshint esversion: 6, moz: true */
Ext.onReady(function() {
    // Initialize stopwatch and timer variables
    let elapsedTime = 0; // for stopwatch in seconds
    let timerDuration = 0; // for timer in seconds
    let interval;
    let timerInterval;

    // Function to create and show the stopwatch panel
    function showStopwatchPanel() {
        // Create the panel for the stopwatch and timer
        const stopwatchPanel = Ext.create('Ext.window.Window', {
            title: 'Stopwatch & Timer',
            width: 400,
            height: 400,
            layout: 'fit',
            items: [{
                html: `
                    <div id="stopwatch" style="font-size: 24px; margin-top: 20px;">Stopwatch: 00:00</div>
                    <button id="startBtn">Start Stopwatch</button>
                    <button id="stopBtn">Stop Stopwatch</button>
                    <button id="resetBtn">Reset Stopwatch</button>
                    <br><br>
                    <div id="timer" style="font-size: 24px; margin-top: 20px;">Timer: 00:00</div>
                    <input type="number" id="timerInput" placeholder="Enter seconds" min="1" style="width: 100px;">
                    <button id="setTimerBtn">Set Timer</button>
                    <button id="startTimerBtn">Start Timer</button>
                    <button id="stopTimerBtn">Stop Timer</button>
                    <button id="resetTimerBtn">Reset Timer</button>
                `,
                bodyStyle: {
                    textAlign: 'center',
                    padding: '20px'
                }
            }],
            closeAction: 'destroy' // Destroy the panel on close
        });

        stopwatchPanel.show();

        // Function to update the stopwatch display
        function updateStopwatch() {
            elapsedTime++;
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            Ext.get('stopwatch').update(`Stopwatch: ${formattedTime}`);
        }

        // Function to update the timer display
        function updateTimer() {
            if (timerDuration > 0) {
                timerDuration--;
                const minutes = Math.floor(timerDuration / 60);
                const seconds = timerDuration % 60;
                const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                Ext.get('timer').update(`Timer: ${formattedTime}`);
                if (timerDuration === 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert("Timer finished!");
                }
            }
        }

        // Start button event for stopwatch
        Ext.get('startBtn').on('click', function() {
            if (!interval) {
                interval = setInterval(updateStopwatch, 1000);
            }
        });

        // Stop button event for stopwatch
        Ext.get('stopBtn').on('click', function() {
            clearInterval(interval);
            interval = null;
        });

        // Reset button event for stopwatch
        Ext.get('resetBtn').on('click', function() {
            clearInterval(interval);
            interval = null;
            elapsedTime = 0;
            Ext.get('stopwatch').update('Stopwatch: 00:00');
        });

        // Set timer button event
        Ext.get('setTimerBtn').on('click', function() {
            const input = Ext.get('timerInput').dom.value;
            timerDuration = parseInt(input);
            if (isNaN(timerDuration) || timerDuration < 1) {
                alert("Please enter a valid number of seconds.");
            } else {
                const minutes = Math.floor(timerDuration / 60);
                const seconds = timerDuration % 60;
                Ext.get('timer').update(`Timer: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
            }
        });

        // Start button event for timer
        Ext.get('startTimerBtn').on('click', function() {
            if (!timerInterval && timerDuration > 0) {
                timerInterval = setInterval(updateTimer, 1000);
            }
        });

        // Stop button event for timer
        Ext.get('stopTimerBtn').on('click', function() {
            clearInterval(timerInterval);
            timerInterval = null;
        });

        // Reset button event for timer
        Ext.get('resetTimerBtn').on('click', function() {
            clearInterval(timerInterval);
            timerInterval = null;
            timerDuration = 0;
            Ext.get('timer').update('Timer: 00:00');
            Ext.get('timerInput').dom.value = '';
        });
    }

    // Create the first panel
    const panel1 = Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        title: 'Hello Ext JS',
        width: 400,
        height: 400,
        html: `
            <h1>Hello World!</h1>
            <h2>New To Ext</h2>
            <button id="openStopwatchBtn">Open Stopwatch & Timer</button>
        `,
        bodyStyle: {
            textAlign: 'center',
            padding: '20px'
        },
        style: {
            textAlign: 'center',
            padding: '20px'
        }
    });

    // Button to open the stopwatch and timer panel
    Ext.get('openStopwatchBtn').on('click', showStopwatchPanel);
});
