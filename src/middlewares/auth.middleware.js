import jwt from "jsonwebtoken"; // 1. Added missing jwt import
import { User } from "../models/user.model.js";
import {projectMember} from "../models/projectmember.models.js";
import { ApiError } from "../utils/api-errors.js";
import { asyncHandler } from "../utils/async-handler.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    // Check for token in cookies or Authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        // 2. Variable Match: Changed 'decoded' to 'decodedToken' 
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 3. Use the same variable name 'decodedToken' here
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        );

        if(!user){
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();
    } catch (error) {
        // Catch any JWT verification errors (expired, tampered, etc.)
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export const validateProjectPermission=(roles=[])=> {asyncHandler(async(req, res, next) => {
    const { projectId } = req.params;

    if(!projectId){
        throw new ApiError(400, "Project ID is required"); 
    }

   const project= await projectMember.findOne({
        project:new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(req.user._id),
    })
    if(!project){  
        throw new ApiError(404, "Project not found");
     }
    const givenRole=project?.role
    req.userRole=givenRole

    if(!roles.includes(givenRole)){
        throw new ApiError(403, "Forbidden: Insufficient permissions");
    }
});
};