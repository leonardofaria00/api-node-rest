import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const StorageTypes = {
  local: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, callback) => {
      file.key = `${uuidv4()} - ${file.originalname}`;

      callback(null, file.key);
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, callback) {
      const filename = `${uuidv4()} - ${file.originalname}`;

      callback(null, filename);
    },
  }),
};

export default {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: StorageTypes[process.env.LOCAL_STORAGE],
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];
    const minitypes: string[] = ['jpg', 'png', 'jpeg'];

    if (minitypes.includes(fileType)) {
      callback(null, true);
    } else {
      callback(new Error('File not allowed!'));
    }
  },
};
