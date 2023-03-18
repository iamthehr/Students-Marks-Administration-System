const expressAsyncHandler = require("express-async-handler");
const students = require("../models/student");
const marks = require("../models/marks");
const subjects = require("../models/subject");
const admin = require("../models/admin");
const generateToken = require("../config/generateToken");

const registerAdmin = expressAsyncHandler(async (req, res) => {
  const { userId, name, password } = req.body;
  if (!name || !userId || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }

  const adminExists = await admin.findOne({ userId });
  if (adminExists) {
    res.status(400);
    throw new Error("User already exits!");
    // return;
  }
  const newAdmin = await new admin({
    userId,
    name,
    password,
  });
  await newAdmin.save();
  if (newAdmin) {
    res.status(200).json({
      _id: newAdmin._id,
      userId: newAdmin.userId,
      name: newAdmin.name,
      token: generateToken(newAdmin._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const loginAdmin = expressAsyncHandler(async (req, res) => {
  const { userId, password } = req.body;

  const seladmin = await admin.findOne({ userId });

  if (seladmin && (await seladmin.matchPassword(password))) {
    res.json({
      _id: seladmin._id,
      userId: seladmin.userId,
      name: seladmin.name,
      token: generateToken(seladmin._id),
    });
  } else {
    throw new Error("Invalid User Id or password");
  }
});

const addStudent = expressAsyncHandler(async (req, res) => {
  try {
    const { name, batch, registrationNumber, semester } = req.body;
    const exist = await students.findOne({ registrationNumber });
    if (exist) {
      res.status(400).send("Student alreay exist");
      return;
    }
    const newStudent = await new students({
      name,
      batch,
      registrationNumber,
      semester,
    });
    await newStudent.save();
    const subs = await subjects.find({ semester });
    if (subs.length != 0) {
      for (var i = 0; i < subs.length; i++) {
        newStudent.subjects.push(subs[i]._id);
      }
    }
    await newStudent.save();
    res.status(200).json({ result: newStudent });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const addSubject = expressAsyncHandler(async (req, res) => {
  try {
    const { name, semester } = req.body;
    const exist = await students.findOne({ name });
    if (exist) {
      res.status(400).send("Subject alreay exist");
      return;
    }
    const newSubject = await new subjects({
      name,
      semester,
    });
    await newSubject.save();
    const stu = await students.find({ semester });
    for (var i = 0; i < stu.length; i++) {
      stu[i].subjects.push(newSubject._id);
      await stu[i].save();
    }
    res.status(200).json({ result: newSubject });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getSubjects = expressAsyncHandler(async (req, res) => {
  try {
    const { semester } = req.body;
    // console.log(semester);
    const SubjectofSem = await subjects.find({ semester: semester });
    res.status(200).json(SubjectofSem);
  } catch (error) {}
});

const uploadMarks = expressAsyncHandler(async (req, res) => {
  try {
    const { registrationNumber, subject, semester, totalMarks, gainMarks } =
      req.body;
    const sub = await subjects.findOne({ name: subject });
    // console.log(sub);
    const student = await students.find({
      registrationNumber: registrationNumber,
    });
    // console.log(student[0]._id);
    const exist = await marks.findOne({
      student: student[0]._id,
      subject: sub._id,
      semester: semester,
      batch: student[0].batch,
    });
    if (exist) {
      res.status(400).send("Marks already uploaded");
      return;
    }

    const newMarks = await new marks({
      student: student[0]._id,
      subject: sub._id,
      marks: gainMarks,
      totalMarks: totalMarks,
      semester: semester,
      batch: student[0].batch,
    });
    await newMarks.save();

    res.status(200).json({ result: newMarks });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const getStudentsandSubjects = expressAsyncHandler(async (req, res) => {
  try {
    const { semester, batch } = req.body;
    const stuList = await students.find({ semester: semester, batch: batch });
    for (var i = 0; i < stuList.length; i++) {
      const arrmarks = await marks.find({ student: stuList[i]._id });
      var sum = 0;
      var tosum = 0;

      arrmarks.map((singleMarks) => {
        sum += singleMarks.marks;
        tosum += singleMarks.totalMarks;
      });

      const obj = {
        _id: stuList[i]._id,
        name: stuList[i].name,
        registrationNumber: stuList[i].registrationNumber,
        marks: sum,
        totalMarks: tosum,
        percentage: (sum / tosum) * 100,
      };
      stuList[i] = obj;
    }

    if (stuList.length === 0) {
      res.status(400).send("No students Found");
    }
    res.status(200).json(stuList);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const editMarks = expressAsyncHandler(async (req, res) => {
  const { studentId, subjectId, value } = req.body;

  const updateMarks = await marks.findByIdAndUpdate(
    {
      student: studentId,
      subject: subjectId,
    },
    {
      marks: value,
    },
    {
      new: true,
    }
  );
  if (!updateMarks) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updateMarks);
  }
});
module.exports = {
  addStudent,
  addSubject,
  uploadMarks,
  getStudentsandSubjects,
  editMarks,
  loginAdmin,
  getSubjects,
  registerAdmin,
};
