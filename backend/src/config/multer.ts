import { randomUUID } from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { UPLOAD_MAXIMUM_FILE_SIZE } from '../constants';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    file.originalname = randomUUID() + ext;
    cb(null, file.originalname);
  },
});

function filterFiles(
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed'));
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: filterFiles,
  limits: {
    fileSize: UPLOAD_MAXIMUM_FILE_SIZE,
  },
});
