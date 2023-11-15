const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

//Đoạn trên không cần nói cùng biết là import và lấy một số thứ cần thiết từ electron rồi nhỉ :)

let win; // khai báo biên win dùng để tạo lên một cửa sổ window của app

// Hàm tạo cửa sổ app
function createWindow() {
  win = new BrowserWindow({width: 800, height: 600}); // khai báo độ cao và rộng của cửa sổ

  win.loadURL('http://localhost:3000'); // load url của bạn, ở đây là localhost:3000 vì bạn đang chạy reactjs app trên port 3000

  win.webContents.openDevTools(); // cái này là cho phép bạn sử dụng devtool như browser để dùng cho debug thôi, không có gì đặc biệt 

 // khi close thì ta xóa cửa sổ đi 
  win.on('close', function() {
      win = null;
  })
}

// lắng nghe khi app sẵn sàng thì sẽ khởi tạo cửa sổ app
app.on('ready', createWindow);

// Khi close thì quit khỏi app
app.on('window-all-closed', function() {
  app.quit();
});

app.on('activate', function() {
  if(win == null) {
      createWindow();
  }
})
