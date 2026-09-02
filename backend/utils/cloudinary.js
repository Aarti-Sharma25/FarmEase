// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });

// const uploadOnCloudinary = (buffer) => {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//             { resource_type: "auto" },
//             (error, result) => {
//                 if (error) return reject(error);
//                 resolve(result.secure_url);
//             }
//         );
//         stream.end(buffer);   // ye line tumhare paste mein missing thi — isi se upload actually trigger hota hai
//     });
// };

// export default uploadOnCloudinary;
import { v2 as cloudinary } from 'cloudinary';

const uploadOnCloudinary = (buffer) => {
    // Config ab yahan call ho raha hai (upload ke time pe), file import hote hi nahi —
    // taaki tab tak dotenv.config() ne process.env already load kar diya ho
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

export default uploadOnCloudinary;