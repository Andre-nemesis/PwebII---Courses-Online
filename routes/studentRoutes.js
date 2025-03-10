import express from 'express';

const router = express.router();
//posts
router.post('/course/subscribe/:id');
router.post('/course/desubscribe/:id');

//gets
router.get('/certificates/view/:id');
router.get('/courses/view');
router.get('/courses/view/:id');
router.get('/courses/view/:id/modules');

//delete
router.delete('/account/:id');

export default router;