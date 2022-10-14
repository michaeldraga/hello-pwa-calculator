const express = require("express");
const path = require("path");

const app = express();

const PUBLIC_DIRECTORY = path.join(__dirname, "..", "public");
const CSS_DIRECTORY = path.join(__dirname, 'css');
const SCRIPTS_DIRECTORY = path.join(__dirname, 'scripts');

console.log(CSS_DIRECTORY);

app.use((req, res, next) => {
    res.setHeader('Service-Worker-Allowed', '/');
    next();
})


app.use(express.static(PUBLIC_DIRECTORY));
app.use('/css', express.static(CSS_DIRECTORY));
app.use('/scripts', express.static(SCRIPTS_DIRECTORY));

app.listen(8080, () => {
  console.log("Listening on 8080");
});
