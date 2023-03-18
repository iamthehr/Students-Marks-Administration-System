const express = require("express");
const {
  addStudent,
  addSubject,
  uploadMarks,
  getStudentsandSubjects,
  editMarks,
  getSubjects,
  registerAdmin,
  loginAdmin,
} = require("../Controllers/Controllers");
const router = express.Router();

router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(loginAdmin);
router.route("/addStudent").post(addStudent);
router.route("/addSubject").post(addSubject);
router.route("/uploadMarks").post(uploadMarks);
router.route("/getStudentsAndSubjects").post(getStudentsandSubjects);
router.route("/getSubjects").post(getSubjects);
router.route("/editMarks").put(editMarks);

module.exports = router;
