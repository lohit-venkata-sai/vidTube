import multer, { diskStorage } from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
//handling files

// step-1 :- multer
// stores files into ur local_storage/diskStorage/serverstorage
//inputs : distination , filename

//step-2 :- cloudinary
//takes file from localStorage and uploads it to cloud
//returns an res.url
//url is stored to our db
