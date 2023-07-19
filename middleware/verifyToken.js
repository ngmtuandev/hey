import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({
            status: "Not Token"
        })
    }
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            if (err) {
                return res.status(400).json({
                    status: "Wrong token"
                })
            }
            else {
                req.datatoken = data // data <=> id: user._id ~~ datatoken = _id
                next()
            }
        })
    }
}

export default verifyToken