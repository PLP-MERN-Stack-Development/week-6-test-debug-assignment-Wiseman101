// const express = require('express');
// const router = express.Router();
// const {
//   createBug,
//   getBugs,
//   updateBug,
//   deleteBug
// } = require('../controllers/bugController');

// // Create a bug
// router.post('/', createBug);

// // Get all bugs
// router.get('/', getBugs);

// // Update a bug by ID
// router.put('/:id', updateBug);

// // Delete a bug by ID
// router.delete('/:id', deleteBug);

// module.exports = router;
// const request = require('supertest');
// const mongoose = require('mongoose');
// const Bug = require('../../src/models/bugModel');
// const app = require('../../src/index');

// // beforeAll(async () => {
// //   const MONGO_TEST_URI = 'mongodb://127.0.0.1:27017/bugtracker_test';
// //   await mongoose.connect(MONGO_TEST_URI);
// // });

// // beforeEach(async () => {
// //   await Bug.deleteMany();
// // });

// // afterAll(async () => {
// //   await mongoose.connection.close();
// // });

// describe('Bug API Integration', () => {
//   test('POST /api/bugs - should create a new bug', async () => {
//     const bugData = { title: 'Bug A', description: 'Example bug' };

//     const res = await request(app)
//       .post('/api/bugs')
//       .send(bugData);

//     expect(res.statusCode).toBe(201);
//     expect(res.body.title).toBe(bugData.title);
//     expect(res.body.status).toBe('open');
//   });

//   test('GET /api/bugs - should return all bugs', async () => {
//     await Bug.create([
//       { title: 'Bug1', description: 'desc1' },
//       { title: 'Bug2', description: 'desc2' }
//     ]);

//     const res = await request(app).get('/api/bugs');

//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBe(2);
//   });

//   test('PUT /api/bugs/:id - should update a bug', async () => {
//     const bug = await Bug.create({ title: 'Bug', description: 'desc' });

//     const res = await request(app)
//       .put(`/api/bugs/${bug._id}`)
//       .send({ status: 'resolved' });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.status).toBe('resolved');
//   });

//   test('DELETE /api/bugs/:id - should delete a bug', async () => {
//     const bug = await Bug.create({ title: 'Bug', description: 'desc' });

//     const res = await request(app)
//       .delete(`/api/bugs/${bug._id}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe('Bug deleted');
//   });
// });
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  createBug,
  getBugs,
  updateBug,
  deleteBug
} = require('../controllers/bugController');

router.delete('/:id', protect, deleteBug);


router.post('/', createBug);
router.get('/', getBugs);
router.put('/:id', updateBug);
router.delete('/:id', deleteBug);

module.exports = router;
