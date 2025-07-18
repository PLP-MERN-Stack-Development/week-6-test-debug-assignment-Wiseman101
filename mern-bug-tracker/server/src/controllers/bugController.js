const Bug = require('../models/bugModel');

// CREATE a new bug


const createBug = async (req, res, next) => {
  try {
    const bug = await Bug.create({ ...req.body, status: 'open' }); // ✅ FIXED
    res.status(201).json(bug);
  } catch (error) {
    next(error);
  }
};

// GET all bugs
const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.status(200).json(bugs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bugs' });
  }
};

// UPDATE a bug
const updateBug = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Bug.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Bug not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bug' });
  }
};

// DELETE a bug
// const deleteBug = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Bug.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ error: 'Bug not found' });
//     res.status(200).json({ message: 'Bug deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete bug' });
//   }
// };

const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    await bug.remove();
    res.json({ message: 'Bug deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBug,
  getBugs,
  updateBug,
  deleteBug
};
