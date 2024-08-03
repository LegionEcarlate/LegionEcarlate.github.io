const express = require('express');
const axios = require('axios');
const app = express();

const CLIENT_ID = '1269364571236208732';
const CLIENT_SECRET = 'a-asTusbjIeteGo4vaLiR_w_Mv4b3wu2';
const REDIRECT_URI = 'https://legionecarlate.github.io/Test/index';

app.get('/login', (req, res) => {
    const authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
    res.redirect(authorizeUrl);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    const tokenUrl = 'https://discord.com/api/oauth2/token';
    const tokenData = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
    });

    try {
        const tokenResponse = await axios.post(tokenUrl, tokenData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = tokenResponse.data.access_token;

        const userUrl = 'https://discord.com/api/users/@me';
        const userResponse = await axios.get(userUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        res.json(userResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during authentication');
    }
});

app.get('/profile', (req, res) => {
    // Envoyer le fichier HTML avec le pseudo du compte Discord
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Discord Profile</title>
        </head>
        <body>
            <h1>Bienvenue</h1>
            <p>Bonjour ${req.query.username} !</p>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
