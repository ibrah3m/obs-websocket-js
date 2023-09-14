const OBSWebSocket = require('obs-websocket-js');
const express = require('express');

const app = express();
const port = 3000;

const obs = new OBSWebSocket();
obs.connect({ address: 'localhost:4444', password: 'your_password' }) // Update with your OBS WebSocket address and password
    .then(() => {
        console.log('Connected to OBS WebSocket');
    })
    .catch(err => {
        console.error('Failed to connect to OBS WebSocket:', err);
        process.exit(1);
    });

app.get('/trigger-hotkey', (req, res) => {
    const hotkey = 'Control+Shift+H'; // Define the hotkey combination to trigger

    obs.send('TriggerHotkeyBySequence', { keyId: hotkey })
        .then(() => {
            console.log('Hotkey triggered successfully');
            res.status(200).send('Hotkey triggered successfully');
        })
        .catch(err => {
            console.error('Failed to trigger hotkey:', err);
            res.status(500).send('Failed to trigger hotkey');
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
