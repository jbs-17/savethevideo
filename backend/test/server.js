import express from 'express';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto'; // Untuk membuat ID unik

const app = express();
const port = 3000;

// Map untuk menyimpan progress per proses
const progressMap = new Map();


// Fungsi untuk menjalankan yt-dlp dan memantau progress
function startDownload(url) {
  console.log(`downloading ${url}`);
  const ytDlp = spawn('yt-dlp', [url]);
  
  // Inisialisasi progress untuk ID ini
  progressMap.set(url, { progress: '0%', status: 'downloading', url });

  // Tangkap stdout
  ytDlp.stdout.on('data', (data) => {
    const output = data.toString();
    // Parsing output untuk mendapatkan persentase
    // Contoh output yt-dlp: [download]   7.0% of 100MB at 1MB/s
    const progress = output;
    if (progress) {
      progressMap.set(url, { progress, status: 'downloading', url });
      console.log(`Progress for ${url}: ${progress}`);
    }
  });

  // Tangani ketika proses selesai
  ytDlp.on('close', (code) => {
    if (code === 0) {
      progressMap.set(url, { progress: '100%', status: 'completed', url });
    } else {
      progressMap.set(url, { progress: progressMap.get(url).progress, status: 'failed', url });
    }
  });

  // Tangani error
  ytDlp.on('error', (err) => {
    console.error(`Error running yt-dlp: ${err}`);
    progressMap.set(url, { progress: '0%', status: 'error', url });
  });
}


// Endpoint untuk memulai unduhan
app.get('/download', (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  if( progressMap.has(url) ){
   return res.json(progressMap.get(url));
  }
  // Buat ID unik untuk unduhan menggunakan UUID
  startDownload(url);
  res.json({ message: 'Download started', url });
});

// Endpoint untuk mendapatkan progress
app.get('/progress', (req, res) => {
  const { url } = req.query;
  const progressData = progressMap.get(url);

  if (!progressData) {
    return res.status(404).json({ error: 'Download not found' });
  }

  res.json(progressData);
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
