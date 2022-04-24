# Urban Adventure Backend
Perinteinen tasohyppelypeli kaikenikäisille. Peli on toteutettu front-back-db -arkkitehtuurilla. Ennätykset jäävät siis historiaan. Pelin kenttä generoituu satunnaisesti, joten se on jokaisella pelikerralla erilainen.

Peli on toteutettu JavaScriptillä, backend toteutettu JavaScriptillä ja tietokantana toimii MongoDB.

Backend käynnistää WebSocket-palvelimen oletuksena porttiin 3001.
Frontend löytyy Githubista: https://github.com/juakiv/urban-adventure-front

# Asennusohjeet
1. Kloonaa repositoriot.
```
git clone git@github.com:juakiv/urban-adventure-front.git
git clone git@github.com:juakiv/urban-adventure-back.git
```

2. Asenna dependencyt molemmissa repositorioissa ajamalla komento
```
npm install
```

3. Käynnistä React-kehityspalvelin urban-adventure-front -kansiossa ajamalla komento
```
npm start
```

4. Käynnistä Websocket-palvelin urban-adventure-back -kansiossa ajamalla komento
```
node index.js
```
tai watcherilla
```
npm run watch
```
5. Avaa selaimessa localhost:3000

# Peliohjeet
1. 