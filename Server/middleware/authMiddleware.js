// import User from "../models/User.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// // Middleware to check if user is authenticated
// export const protect = async (req, res, next) => {
//     let token;
//     console.log('Authorization header:', req.headers.authorization);
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer ")
//     ) {
//         token = req.headers.authorization.split(" ")[1];
//     }
//     if (!token) {
//         console.log('No token found');
//         return res.status(401).json({
//             success: false,
//             message: "You are not authenticated",
//         });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log('Decoded JWT:', decoded);
//         const user = await User.findById(decoded.id || decoded._id || decoded.userId);
//         console.log('User found:', user);
//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         console.log('JWT verification error:', error);
//         return res.status(401).json({
//             success: false,
//             message: "Invalid or expired token"
//         });
//     }
// };

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  // 1. Extract Bearer token from headers
  const authHeader = req.headers.authorization;
  console.log("🔐 Authorization Header:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. If token is missing
  if (!token) {
    console.log("❌ No token found");
    return res.status(401).json({
      success: false,
      message: "Not authorized, token missing",
    });
  }

  try {
    // 3. Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded);

    // 4. Find user by decoded ID (must be ObjectId)
    const user = await User.findById(decoded.id); // decoded.id must be ObjectId
    console.log("👤 User found:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 5. Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error("⚠️ JWT Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
