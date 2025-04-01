const path = require('path');

// Need to pass in a parameter to the middleware
// Using a closure here to return a function that will have access to the paramter,
// but what actually gets set to the variable when declared will be the returned function.
// The returned middleware function will have access to the parameter, but won't take the parameter `allowedExtArray`
const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files;
        const fileExtensions = [];

        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name)); // retrieve the extension for each file / file name inside of the request and push them into an array
        });

        // Determine if the file extensions of the uploaded files allowed per the allowedExtArray
        // the value of 'allowed' will either be true or false and corresponds with whether or not EVERY uploaded file has an allowed file extension
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext));

        if(!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");
            return res.status(422).json({ status: "error", message });
        }

        next()
    }
}

module.exports = fileExtLimiter;
