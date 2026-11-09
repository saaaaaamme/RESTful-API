const http = require("http");
const app = require("./express");

const PORT = 3000;

// Membuat server HTTP menggunakan aplikasi Express
const server = http.createServer(app);

// Menjalankan server
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});