import multer from 'multer';
import path from 'path';

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/assets'); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique file names
  }
});

// Initialize multer with storage settings
export const upload = multer({ storage: storage });
