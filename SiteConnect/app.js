const express = require("express")
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const app = express()

var config = {
  "clientId": "1269364571236208732",
  "clientSecret": "Wnpi43bex3nfwGUmYqmQ7DieCzmqAt7l",
  "redirectUri": "https://legionecarlate.github.io/"
}

app.get("/", (request, response) => {
  response.send("login with discord: <a href='https://discord.com/oauth2/authorize?client_id=1269364571236208732&response_type=code&redirect_uri=https%3A%2F%2Flegionecarlate.github.io%2F&scope=identify'>login</a>")
})

app.get("/authorize", (request, response) => {
  var code = request.query["code"]
  var params = new URLSearchParams()
  params.append("client_id", config["clientId"])
  params.append("client_secret", config["clientSecret"])
  params.append("grant_type", "authorization_code")
  params.append("code", code)
  params.append("redirect_uri", config["redirectUri"])
  fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    body: params
  })
  .then(res => res.json())
  .then(json => {
    response.send("logged in")
    const user = response.data;
    document.getElementById('user-info').innerText = `Hello, ${user.username}`;
  })
})

app.listen(80, () => {
  console.log("Listening on :80")
})
