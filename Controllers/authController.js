import db from '../Models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.Users.findOne({ where: { email } });

        if(!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '8h',
        });

        res.status(200).json({ success: 1, token });
    
    } catch(error) {
        console.error('Erro ao fazer login: ', error);
        res.status(500).json({ message: 'Error ao fazer login' });
    }
}