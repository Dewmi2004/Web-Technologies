import {student_db} from "../db/DB.js";

//=======================ADD STUDENT=========================
const add_student = (obj) => {
    student_db.push(obj);
};

//=====================DELETE STUDENT========================
const delete_student = (index) => {
    student_db.splice(index, 1);
};

//=======================GET ALL STUDENTS====================
const get_students = () => {
    return student_db;
};

//=======================GET SINGLE STUDENT==================
const get_student = (index) => {
    return student_db[index];
};

//=====================UPDATE STUDENT========================
const update_student = (index, obj) => {
    student_db[index] = obj;
};

export {
    add_student,
    delete_student,
    get_students,
    get_student,
    update_student
};





//
// import student_db from "../db/DB.js";
//
// //=======================ADD STUDENT=========================
// const add_student = (obj) => {
//     student_db.push(obj);
// };
//
// //=====================DELETE STUDENT========================
// const delete_student = (index) => {
//     student_db.splice(index, 1);
// };
//
// //=======================GET ALL STUDENTS====================
// const get_students = () => {
//     return student_db;
// };
//
// //=======================GET SINGLE STUDENT==================
// const get_student = (index) => {
//     return student_db[index];
// };
//
// //=====================UPDATE STUDENT========================
// const update_student = (index, obj) => {
//     student_db[index] = obj;
// };
//
// export {
//     add_student,
//     delete_student,
//     get_students,
//     get_student,
//     update_student
// };
