import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, callback) => {
      const filename = `${uuidv4()} - ${file.originalname}`;

      callback(null, filename);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    callback(null, true);
  },
};
