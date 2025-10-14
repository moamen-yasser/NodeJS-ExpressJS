const mongoose = require("mongoose");
const schema = mongoose.Schema;

const studentSchema = new schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    courses: { type: [String], required: true },
    degree: { type: Number, required: true },
    age: { type: Number, required: true },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
