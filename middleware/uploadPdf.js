const multer = require("multer");

exports.uploadPDF = (imageFile) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploadsPDF"); 
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "")); 
      },
    });
  
    const fileFilter = function (req, file, cb) {
      if (file.fieldname === imageFile) {
        if (!file.originalname.match(/\.(pdf|PDF)$/)) {
          req.fileValidationError = {
            message: "Only image files are allowed!",
          };
          return cb(new Error("Only image files are allowed!"), false);
        }
      }
      cb(null, true);
    };
  
    const sizeInMB = 100;
    const maxSize = sizeInMB * 1024 * 1024; 
  
    const upload = multer({
      storage,
      fileFilter,
      limits: {
        fileSize: maxSize,
      },
    }).fields([
        {
          name:imageFile,
          maxCount:4
        }
      ]) 
  
    // middleware handler
    return (req, res, next) => {
      upload(req, res, function (err) {

        if (req.fileValidationError)
          return res.status(400).send(req.fileValidationError);
  
       // show an error if file doesn't provided in req
        // if (!req.files && !err)
        //   return res.status(400).send({
        //     message: "Please select files to upload",
        //   });
  
        if (err) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).send({
              message: "Max file sized 100MB",
            });
          }
          return res.status(400).send(err);
        }
  
        // in the controller we can access using req.file
        return next();
      });
    };
  };