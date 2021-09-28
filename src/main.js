const { app, BrowserWindow } = require("electron");
const { createWorker } = require("tesseract.js");
const path = require("path");
const utf8 = require("utf8");



// automatically pick platform
const say = require('say')

// or, override the platform
//const Say = require('say').Say
//const say = new Say('darwin' || 'win32' || 'linux')

let window;

const worker = createWorker({
  logger: (m) => console.log(m),
});

async function prueba() {
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize('J:\\proyectos\\ebook2speech\\img\\prueba.png');
  console.log(text.replaceAll("├®", "ó"));
  say.speak(text.replaceAll("├®", "ó"));

  await worker.terminate();
}

app.on("ready", () => {
  window = new BrowserWindow({
    title: "Ebook to Speech",
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      
    },
  });

  window.show();
  prueba();
});
