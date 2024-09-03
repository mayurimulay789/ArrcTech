const express = require('express');
const router = express.Router();
const multer = require('multer');
const employeeController = require('../controllers/EmployeeControlller');

const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  
  // Set up Multer storage with AWS SDK v3
  const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.EMPDATA_BUCKET_NAME,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `images/${Date.now()}${path.extname(file.originalname)}`);
      },
    }),
  });
  
  router.post('/', upload.single('image'), employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', upload.single('image'), employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
module.exports = router;
