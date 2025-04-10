import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;
    let token = null;

    try {
        const user = await db.Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        if(user.type === 'admin'){
            const admin = await db.Admin.findOne({
                where: { user_id: user.id },
                include: [{ model: db.Users, as: 'User' }]
            });
            token = jwt.sign({ id: admin.id, name: user.name, role: user.type, role_adm:admin.role }, process.env.JWT_SECRET, {
                expiresIn: '8h',
            });
        }else if(user.type === 'teacher'){
            const teacher = await db.Teachers.findOne({
                where: { user_id: user.id },
                include: [{ model: db.Users, as: 'User' }]
            });
            token = jwt.sign({ id: teacher.id, name: user.name, role: user.type }, process.env.JWT_SECRET, {
                expiresIn: '8h',
            });
        }else if(user.type === 'student'){
            const student = await db.Student.findOne({
                where: { user_id: user.id },
                include: [{ model: db.Users, as: 'User' }]
            });
            token = jwt.sign({ id: student.id, name: user.name, role: user.type }, process.env.JWT_SECRET, {
                expiresIn: '8h',
            });
        }else{
            return res.status(400).json({ message: "Tipo de usuário inválido" });
        }
        
        const username = user.name;
        

        res.status(200).json({ success: 1, token, username});

    } catch (error) {
        console.error('Erro ao fazer login: ', error);
        res.status(500).json({ message: 'Error ao fazer login', details: error.message });
    }
}

export const signUp = async (req, res) => {
    const { name, email, password, cpf, phone_number, type, city, role, academic_formation, tecnic_especialization } = req.body;

    if (!type || type === undefined) {
        return res.status(400).json({ message: "O tipo de usuário é obrigatório" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await db.Users.create({
            name,
            email,
            password: hashedPassword,
            cpf,
            phone_number,
            type
        });

        if (type === 'student') {
            if (!city) {
                return res.status(400).json({ message: "Cidade é obrigatória para o estudante" });
            }
            await db.Student.create({ user_id: user.id, city });

        } else if (type === 'admin') {
            if (!role) {
                return res.status(400).json({ message: "Função é obrigatória para o administrador" });
            }
            await db.Admin.create({ user_id: user.id, role });

        } else if (type === 'teacher') {
            if (!academic_formation || !tecnic_especialization) {
                return res.status(400).json({ message: "Formação acadêmica e especialização técnica são obrigatórias para o professor" });
            }
            await db.Teachers.create({
                user_id: user.id,
                academic_formation,
                tecnic_especialization
            });
        } else {
            return res.status(400).json({ message: "Tipo de usuário inválido" });
        }

        return res.status(201).json({ success: 1, message: `${type.charAt(0).toUpperCase() + type.slice(1)} criado com sucesso!` });

    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar o usuário' });
    }
};
