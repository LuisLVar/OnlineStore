"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};
const upload = multer({
    dest: "../../../client/src/assets/images"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
app.post("/upload", upload.single("file" /* name attribute of <file> element in your form */), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
            if (err)
                return handleError(err, res);
            res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
        });
    }
    else {
        fs.unlink(tempPath, err => {
            if (err)
                return handleError(err, res);
            res
                .status(403)
                .contentType("text/plain")
                .end("Only .png files are allowed!");
        });
    }
});
