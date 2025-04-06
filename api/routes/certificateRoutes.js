import { authorizeRole, verifyToken } from '../middleware/authMiddleware.js';
import certificateController from '../Controllers/certificateController.js';
import express from 'express';

const router = express.Router();

router.get("/",verifyToken,authorizeRole('admin'),certificateController.getAll);
router.get("/student/:id",verifyToken,authorizeRole('student'),certificateController.getById);

router.post("/", verifyToken, authorizeRole("admin"), certificateController.create);

router.put("/:id", verifyToken, authorizeRole("admin"), certificateController.update);

router.delete("/:id", verifyToken, authorizeRole("admin"), certificateController.delete);

export default router;