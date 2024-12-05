import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Workaround to handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer/preload.js'), // Point to preload.js
    },
  });

  win.loadFile('renderer/index.html');
}

// Example backend data handling (for simplicity, hardcoded tasks)
let tasks = [];

ipcMain.handle('fetch-tasks', () => {
  return tasks;  // Return the tasks array to the renderer
});

ipcMain.on('add-task', (event, task) => {
  tasks.push(task); // Add a new task to the list
});

ipcMain.on('delete-task', (event, taskId) => {
  tasks = tasks.filter(task => task._id !== taskId); // Remove task by ID
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
