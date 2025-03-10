import express from 'express';

const router = express.router();

//post
router.post('/module/create');

//put
router.put('/module/edit/:id');

//delet
router.delete('/module/delete/:id');

export default router;