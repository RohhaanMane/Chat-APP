import jwt from 'jsonwebtoken';

const protectRoute = async(req, res, next) =>{
    try {
        const token = req.cookie.jwt;

        if(!token)
        {
            return res.status(401).json({error : "Unauthorized - no token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error : "Unauthorized - Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            res.status(404).json({error: "User not found"});
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute Middleware: ", error.message);
        res.status(500).json({error: "Internal server Error"});
    }
}

export default protectRoute;