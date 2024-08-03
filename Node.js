const express = require('express');
const axios = require('axios');
const app = express();

const clientID = '1269364571236208732';
const clientSecret = 'a-asTusbjIeteGo4vaLiR_w_Mv4b3wu2';
const redirectURI = 'https://legionecarlate.github.io/';

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: clientID,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectURI,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const user = userResponse.data;

        // Gérer la connexion de l'utilisateur (par exemple, créer une session)
        res.send(`Bonjour, ${user.username}!`);
    } catch (error) {
        console.error(error);
        res.send('Erreur lors de la connexion avec Discord.');
    }
});

app.listen(3000, () => {
    console.log('Serveur en cours d\'exécution sur le port 3000');
});
