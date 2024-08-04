const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'client_id': '1269364571236208732',
            'client_secret': 'xmu4zoCHo2PMIAXMXTpKTOwwz8xboXRa',
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': 'https://legionecarlate.github.io/test/index.html'
        })
    })
        .then(response => response.json())
        .then(data => {
            return fetch('https://discord.com/api/users/@me', {
                headers: {
                    'Authorization': `Bearer ${data.access_token}`
                }
            });
        })
        .then(response => response.json())
        .then(user => {
            document.getElementById('content').innerHTML = `<h1>Bienvenue, ${user.username}#${user.discriminator}!</h1>`;
        })
        .catch(console.error);
}