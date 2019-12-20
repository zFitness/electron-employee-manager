'use strict'

import { app, protocol, BrowserWindow, Menu, Tray } from 'electron'
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//托盘对象
var appTray = null;



// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

//设置菜单栏
function createMenu() {
    //darwin 有一些限制，菜单栏无法完全取消
    if (process.platform === 'darwin') {
        const template = [
            {
                label: 'App demo',
                submenu: [
                    {
                        role: 'about'
                    },
                    {
                        role: 'quit'
                    }
                ]
            }
        ];
        //从菜单模版构建
        let menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    } else {
        //windows和linux取消菜单栏
        Menu.setApplicationMenu(null);
    }
}
//创建主窗口
function createWindow() {
    // Open the DevTools. vue tools 支持
    if (process.env.NODE_ENV === 'development') {
        BrowserWindow.addDevToolsExtension("C:\\Users\\zfitness\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0");
    }
    // Create the browser window.
    win = new BrowserWindow({
        width: 1010,
        height: 670,
        minHeight: 670,
        minWidth: 1010,
        webPreferences: {
            nodeIntegration: true,
            //解决跨域问题
            webSecurity: false
        },
        //设置窗口应用图标, __static 对应 public 目录
        icon: `${__static}/bilibili.png`,
        //关闭系统标题栏
        useContentSize: true,
        frame: false
    })

    // 托盘菜单内容
    var trayMenuTemplate = [
        {
            label: '设置',
            click: function () { }
        },
        {
            label: '关于',
            click: function () { }
        },
        {
            label: '退出',
            click: function () { app.quit() }
        }
    ];
    // 托盘图标
    appTray = new Tray(`${__static}/bilibili.png`);
    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    // 设置托盘图标的悬停提升内容
    appTray.setToolTip('这是垃圾');
    // 设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    win.on('closed', () => {
        win = null
    })
    //调用创建菜单栏函数
    createMenu();
}

//生命周期钩子函数
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }

    }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}


const { ipcMain } = require('electron')



// 放大，缩小，关闭事件机制
ipcMain.on('min', (event, data) => {

    win.minimize();
});

ipcMain.on('max', (event, data) => {
    if (win.isMaximized() || win.isFullScreen()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
});

ipcMain.on('close', (event, data) => {
    win.close();
});