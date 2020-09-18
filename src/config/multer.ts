import multer from 'multer';
import path from 'path';

export default {
  dest: path.resolve(__dirname, '..', 'upload-files'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'upload-files'));
    },
    filename: (req, file, cb) => {
      const dateNow = new Date();
      const date = dateNow.getDate();
      const month = dateNow.getMonth();
      const year = dateNow.getFullYear();

      const filename = `${date}-${month}-${year} - ${file.originalname}`;

      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
};
