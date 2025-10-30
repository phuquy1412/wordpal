import express from 'express';
import {
     getAllUsers,
     createUser,
     deleteUser,
     updateUser} from '../controllers/usersControllers.js';

const router= express.Router();

router.get("/",getAllUsers);

router.post("/",createUser);

router.put("/:id",updateUser);

router.delete("/:id",deleteUser);

export default router;

