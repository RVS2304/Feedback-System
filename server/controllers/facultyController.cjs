const csv = require('csvtojson');
const Faculty = require('../models/Faculty.cjs');
const fs = require('fs');
const bcrypt = require('bcrypt');

const importFaculty = async (req, res) => {

  try {

    const jsonArray = await csv().fromFile(req.file.path);
    // Course.insertMany(jsonArray);

    for (const entry of jsonArray) {

      // Hashing the password
      const hashedPassword = await bcrypt.hash(entry.Password, 10);

      // Split the courses string by commas to get individual courses
      const courses = entry.CoursesAssigned.split(',');

      // Create a new Course document with the parsed data
      const faculty = new Faculty({
        Name: entry.Name,
        Password: hashedPassword,
        Department: entry.Department,
        CoursesAssigned: courses
      });

      // Save the course document to the database
      await faculty.save();
    }
    res.send({ status: 200, success: true, msg: { jsonArray } });

  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
}

const getUploadedFacultyFiles = async (req, res) => {
  const uploadsDirectory = './uploads/facultyData';
  try {
    // Read the contents of the 'uploads' folder
    const files = await fs.readdirSync(uploadsDirectory);
    // res.send({ status: 200, success: true, msg: 'Running' });
    res.send(files);
    return files;

  } catch (error) {
    console.error('Error reading uploads directory:', error);
    res.send({ status: 400, success: false, msg: error.message });
    return [];

  }
};


// Controller function to authenticate faculty user
const authenticateFaculty = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the faculty user by username
    const faculty = await Faculty.findOne({ Name: username });

    // If faculty user not found, return error
    if (!faculty) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, faculty.Password);

    // If passwords don't match, return error
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If authentication successful, return faculty user data (you may want to omit sensitive data like password)
    res.send({ status: 200, success: true, msg: 'Authentication Successful' });


  } catch (error) {
    console.error('Error authenticating faculty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Route to fetch faculty details based on department and courses assigned
const fetchFacultyDetails = async (req, res) => {
  try {
    const { department, courses } = req.params;

    // Split the courses associated with the current semester
    const currentSemesterCourses = courses.split(',');

    // Find faculty members whose assigned courses intersect with the current semester courses
    const faculty = await Faculty.find(
      { Department: department, CoursesAssigned: { $in: currentSemesterCourses } })
      .populate('CoursesAssigned');

    // Filter each faculty member's assigned courses to include only those in the current semester
    const filteredFaculty = faculty.map(({ Name, CoursesAssigned }) => ({
      name: Name,
      coursesAssigned: CoursesAssigned.filter(course => currentSemesterCourses.includes(course))
    }));

    res.json(filteredFaculty);
  } catch (error) {
    console.error('Error fetching faculty details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};





module.exports = { importFaculty, getUploadedFacultyFiles, authenticateFaculty, fetchFacultyDetails }