const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/jsonwebtoken.json')[
    'JWT_SECRET'
];

const jwtMiddleware = async (req, res, next) => {
    const token = req.cookies['access_token'];
    if (!token) return next(); // 토큰이 없음
    try {
        const decoded = jwt.verify(token, config.secretOrPrivateKey);
        const { uuid } = decoded;

        req.user = {
            id: decoded.id,
            uuid,
            email: decoded.email,
            name: decoded.name,
            alias: decoded.alias,
        };

        return next();
    } catch (e) {
        // 토큰 검증 실패
        console.error(e);
        return next();
    }
};

module.exports = jwtMiddleware;
