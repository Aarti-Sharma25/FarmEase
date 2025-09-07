// import express from "express";
// import {login ,signup, logout, verifyEmail,forgotPassword,resetPassword,checkAuth} from "../controllers/auth.controller.js";
// import {verifyToken} from "../middleware/verifyToken.js";

// const router=express.Router();


// router.get("/check-auth",verifyToken,checkAuth)

// router.post("/signup", signup);
// router.post("/login",login);
// router.post("/logout",logout);


// router.post("/verify-email",verifyEmail);
// router.post("/forgot-password",forgotPassword);
// router.post("/reset-password/:token",resetPassword);

// export default router;


import express from "express";
import multer from "multer"; // Import multer for file uploads
import { login, signup, logout, verifyEmail, forgotPassword, resetPassword, checkAuth, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Multer configuration for profile image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/profile-pictures');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Profile routes
// Profile routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, upload.single('profileImage'), updateProfile);

// Other auth routes
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
