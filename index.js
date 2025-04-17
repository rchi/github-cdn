const playlist = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
const fs = require("fs");
const https = require("https");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require("path");
const helloModule = require('./gen/hello.js');
const playlistLines = []

async function fetchPlaylist() {
    fetch(playlist)
    .then(response => response.text())
    .then(data => {
        const lines = data.split("\n");
        for (const line of lines) {
            playlistLines.push(line);
        }
        console.log('lines2: ', lines);
        helloModule().then(module => {
            var parser = new module.WasmM3UParser;
            for (const line of playlistLines) {
                const parsedLine = parser.parse(line);
                console.log(`parsed: ${parsedLine}`);
                //console.log(`parsed: ${line}\n`);
            }
            console.log(parser.toString());
        })
    })
    .catch(error => {
        console.error('Error fetching the playlist:', error);
    });
}

async function onPageLoad() {
    try {
        // Simulate an asynchronous operation, such as fetching data from a database
        const data = await fetchPlaylist();
        // Use the fetched data to configure the app
        app.locals.data = data;
        // Start the server after initialization
        app.listen(3000, () => {
            console.log('Server listening on port 3000');
        });
        console.log('parsed lines');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}