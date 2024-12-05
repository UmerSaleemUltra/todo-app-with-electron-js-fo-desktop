import { contextBridge, ipcRenderer } from 'electron';

// Expose specific functions to the renderer process
contextBridge.exposeInMainWorld('electron', {
  fetchTasks: () => ipcRenderer.invoke('fetch-tasks'),
  addTask: (task) => ipcRenderer.send('add-task', task),
  deleteTask: (taskId) => ipcRenderer.send('delete-task', taskId),
});
