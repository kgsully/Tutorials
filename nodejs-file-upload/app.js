const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const PORT = process.env.PORT || 3500;

const app = express();


app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']), // <-- NOTE! This is a function that returns a function (the returned function is the middleware set on the route). The wrapper function that creates the closure requires an argument
    fileSizeLimiter,
    (req, res) => {
        const files = req.files;
        console.log(files);

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name);    // define the file path - full path including file name
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({status: "error", message: err});
            })
        });

        return res.json({ status: 'success', message: Object.keys(files).toString() });
});

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
