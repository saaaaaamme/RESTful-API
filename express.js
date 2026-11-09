const express = require("express");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Data Mahasiswa Sementara (menggunakan huruf kecil agar konsisten)
let mahasiswa = [
  { id: 1, nama: "Samuel", jurusan: "Teknik Informatika" },
  { id: 2, nama: "Sarah", jurusan: "Sistem Informasi" },
];

// GET: Mengambil semua data mahasiswa
app.get("/mahasiswa", (req, res) => {
  res.json(mahasiswa);
});

// GET: Mengambil data mahasiswa berdasarkan ID
app.get("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = mahasiswa.find((m) => m.id === id);

  if (!data) {
    return res.status(404).json({
      pesan: "Mahasiswa tidak ditemukan",
    });
  }

  res.json(data);
});

// POST: Menambahkan data mahasiswa baru
app.post("/mahasiswa", (req, res) => {
  const { nama, jurusan } = req.body;

  const dataBaru = {
    id: mahasiswa.length ? mahasiswa[mahasiswa.length - 1].id + 1 : 1,
    nama,
    jurusan,
  };

  mahasiswa.push(dataBaru);

  res.status(201).json({
    pesan: "Data mahasiswa berhasil ditambahkan",
    data: dataBaru,
  });
});

// PUT: Memperbarui data mahasiswa
app.put("/mahasiswa/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({
      pesan: "Mahasiswa tidak ditemukan",
    });
  }

  mahasiswa[index] = {
    id,
    nama: req.body.nama,
    jurusan: req.body.jurusan,
  };

  res.json({
    pesan: "Data mahasiswa berhasil diperbarui",
    data: mahasiswa[index],
  });
});

// DELETE: Menghapus data mahasiswa
app.delete("/mahasiswa/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({
      pesan: "Mahasiswa tidak ditemukan",
    });
  }

  mahasiswa.splice(index, 1);

  res.json({
    pesan: "Data mahasiswa berhasil dihapus",
  });
});

app.get("/", (req, res) => {
  res.send("selamat datang di API mahasiswa");
});
// Mengekspor aplikasi Express
module.exports = app;
