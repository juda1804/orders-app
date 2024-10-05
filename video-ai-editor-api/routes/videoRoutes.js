const { Storage } = require('@google-cloud/storage');
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configuración de Google Cloud Storage
const storage = new Storage({
  keyFilename: './bucket-credentials.json'
});

const bucket = storage.bucket('draft-videos');

// Configurar Multer para almacenamiento en memoria
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Ruta para subir archivos directamente a Google Cloud Storage
router.post('/upload', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const bucketName = 'draft-videos';
    const fileName = req.file.originalname;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
      resumable: false
    });

    stream.on('error', (err) => {
      console.error('Error uploading to GCS:', err);
      res.status(500).send('Error uploading file');
    });

    stream.on('finish', async () => {
      // Make the file publicly accessible
      await file.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      res.status(200).json({ message: 'File uploaded successfully', url: publicUrl });
    });

    stream.end(req.file.buffer);

  } catch (error) {
    console.error('Error in file upload:', error);
    res.status(500).send('An error occurred during file upload');
  }
});

module.exports = router;