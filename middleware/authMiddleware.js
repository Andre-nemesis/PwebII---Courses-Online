import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token inválido' });
    }

    jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Falha na autenticação do token' });
        }
        req.user = decoded;
        next();
    });
};

//Entendi a aplicação do código abaixo, mas por enquanto não está sendo usado.
//Qual quer coisa é só apagar.

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
};

export default verifyToken;