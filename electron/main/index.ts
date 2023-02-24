import { app, BrowserWindow, shell, ipcMain } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { fork } from "child_process";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

console.log("app name");
console.log(app.name);

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

// TODO: Add channel selector to user preferences
autoUpdater.channel = 'alpha';

let serverProcess;
let rendererWindow: BrowserWindow | null = null;

// async function startServerProcess() {
//   return new Promise((resolve) => {
//     let process = fork(SERVER_PATH, ["--subprocess", app.getPath("userData")]);
//     childProcesses[process.pid] = process;
//     process.on("message", (msg) => {
//       if (msg.status == "ready") {
//         console.log("SERVER READY IN FUCNTION");
//         console.log(msg);
//         resolve(msg.port);
//       }
//     });
//   });
// }

process.env.DIST_ELECTRON = join(__dirname, "..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

const createRenderer = async () => {
  rendererWindow = new BrowserWindow({
    title: "Asheron's Atlas",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 10, y: 10 },
    minHeight: 360,
    minWidth: 660,
    icon: join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    rendererWindow.loadURL(url);
    // Open devTool if the app is not packaged
    rendererWindow.webContents.openDevTools();
  } else {
    rendererWindow.loadFile(indexHtml);
  }

  //   // Test actively push message to the Electron-Renderer
  //   win.webContents.on("did-finish-load", () => {
  //     win?.webContents.send("main-process-message", new Date().toLocaleString());
  //   });

  // Make all links open with the browser, not with the application
  rendererWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  
};

(async () => {

    await app.whenReady()

    createRenderer();



   


    rendererWindow.on('maximize', () => {
        let maximized = rendererWindow.isMaximized() ? true : false;

        rendererWindow.webContents.send("maximized", rendererWindow.isMaximized());

        //localStore.set('settings.app.screen.maximized', maximized);
    });

    rendererWindow.on('unmaximize', () => {
        let maximized = rendererWindow.isMaximized() ? true : false;

        rendererWindow.webContents.send("maximized", rendererWindow.isMaximized());

        //localStore.set('settings.app.screen.maximized', maximized);
    });

    rendererWindow.on('enter-full-screen', () => {
        // userConfigStore.set('settings.app.screen.fullscreen', true);
        // rendererWindow.webContents.send('enter-full-screen');
    });

    rendererWindow.on('leave-full-screen', () => {
        // localStore.set('settings.app.screen.fullscreen', false);
        rendererWindow.webContents.send('leave-full-screen');
    })

    rendererWindow.on('resize', () => {
        let size = rendererWindow.getSize();
        // localStore.set('settings.app.screen.size.width', size[0]);
        // localStore.set('settings.app.screen.size.height', size[1]);
    });

    rendererWindow.on('move', () => {
        let position = rendererWindow.getPosition();
        // localStore.set('settings.app.screen.position.x', position[0]);
        // localStore.set('settings.app.screen.position.y', position[1]);
    });


})();


app.on("ready", function () {
    





});

app.on("window-all-closed", () => {
    rendererWindow = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (rendererWindow) {
    // Focus on the main window if the user tried to open another
    if (rendererWindow.isMinimized()) win.restore();
    rendererWindow.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createRenderer();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});

ipcMain.on("app-mounted", (evt, arg) => {
  console.log("App mounted event in main...");
  //createBackgroundProcess();

  let platform;

  if (process.platform == "win32") {
    platform = "win";
  } else if (process.platform == "darwin") {
    platform = "mac";
  }
  rendererWindow.webContents.send("send-platform", platform);

  serverProcess = fork(process.env.PUBLIC + "/server/index.js", [
    "--subprocess",
    app.getVersion(),
    process.env.PUBLIC,
  ]);

  serverProcess.on("message", (msg) => {
    if (msg.status == "ready") {
        rendererWindow.webContents.send("server-ready", msg.port);
    }
  });
});


ipcMain.on('minimize', () => {
    console.log('minimize received')
    rendererWindow.isMinimized() ? rendererWindow.restore() : rendererWindow.minimize();
})

ipcMain.on('maximize', () => {
    console.log('maximize received');
    rendererWindow.isMaximized() ? rendererWindow.unmaximize() : rendererWindow.maximize();
})


ipcMain.on('close', () => {
    console.log('APP QUIT')
    if (rendererWindow.isDevToolsOpened()) {
        rendererWindow.closeDevTools();
    }
    rendererWindow.close();
})


app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
    console.log("process killed");
  }
});









function setupWindowEvents() {

    

}
