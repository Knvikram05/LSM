const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/Course');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Add a module to a course
router.post('/:courseId', upload.array('files', 10), async (req, res) => {
  try {
    const { courseId } = req.params;
    const files = req.files.map(file => ({ file: file.path }));

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    course.modules.push(...files);
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add MCQ to a specific module
router.post('/:courseId/:moduleId/mcqs', async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { question, options, correctAnswerIndex } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    const module = course.modules.id(moduleId);
    if (!module) return res.status(404).json({ msg: 'Module not found' });

    if (correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
      return res.status(400).json({ msg: 'Correct answer index is out of range' });
    }

    module.mcqs.push({ question, options, correctAnswerIndex });
    await course.save();

    res.status(200).json(module);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
