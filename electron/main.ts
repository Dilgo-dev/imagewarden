import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  win.webContents.openDevTools()

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

const USER_DATA_PATH = app.getPath('userData');
const SECURE_STORAGE_PATH = path.join(USER_DATA_PATH, 'secure-storage');

if (!fs.existsSync(SECURE_STORAGE_PATH)) {
  fs.mkdirSync(SECURE_STORAGE_PATH, { recursive: true });
}

function encryptData(data: string, masterKey: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(masterKey, 'hex'), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptData(encryptedData: string, masterKey: string): string {
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(masterKey, 'hex'), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function getMasterKey(): string {
  const masterKeyPath = path.join(USER_DATA_PATH, '.master');
  
  if (fs.existsSync(masterKeyPath)) {
    return fs.readFileSync(masterKeyPath, 'utf8');
  }
  
  const newMasterKey = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(masterKeyPath, newMasterKey);
  return newMasterKey;
}

ipcMain.handle('save-encryption-key', async (_, args) => {
  try {
    const { key, storageKey } = args;
    const masterKey = getMasterKey();
    const encryptedKey = encryptData(key, masterKey);
    const keyPath = path.join(SECURE_STORAGE_PATH, `${storageKey}.key`);
    
    fs.writeFileSync(keyPath, encryptedKey);
    return true;
  } catch (error) {
    console.error('Failed to save encryption key:', error);
    return false;
  }
});

ipcMain.handle('get-encryption-key', async (_, args) => {
  try {
    const { storageKey } = args;
    const keyPath = path.join(SECURE_STORAGE_PATH, `${storageKey}.key`);
    
    if (!fs.existsSync(keyPath)) {
      return null;
    }
    
    const encryptedKey = fs.readFileSync(keyPath, 'utf8');
    const masterKey = getMasterKey();
    return decryptData(encryptedKey, masterKey);
  } catch (error) {
    console.error('Failed to retrieve encryption key:', error);
    return null;
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
