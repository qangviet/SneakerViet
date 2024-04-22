import multer from "multer";
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "images", "upload"));
        console.log(path.join(__dirname, "..", "public", "images", "upload"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    // Lọc loại file được phép tải lên (ví dụ: chỉ cho phép tải lên ảnh)
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("File không hợp lệ"), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;
