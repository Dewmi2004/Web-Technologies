//
// import StudentDTO from "../dto/StudentDTO.js";
// import {add_student,delete_student,get_students,get_student,update_student} from "../model/StudentModel.js";
// let tbl_row;
//
// //=============ADD STUDENT=================//
//
// // let add_student_record = (objs)=>{
// //     let tbl_row =   `<tr> <td>${objs.f_name}</td> <td>${objs.l_name}</td> <td>${objs.address}</td> </tr>`;
// //     $("#student_tbl_body").append(tbl_row);
// //
// // }
// // $('#student_save_btn').on("click",function () {
// //     console.log("clicked...");
// //     let f_name = $('#f_name').val();
// //     let l_name = $('#l_name').val();
// //     let address = $('#address').val();
// //
// //     let student_obj = {
// //         f_name: f_name,
// //         l_name : l_name,
// //         address : address
// //     };
// //     add_student_record(student_obj);
// // });
//
// //============LOAD STUDENT =================//
//
//
// const load_student_tbl = (obj) => {
//     $("#student_tbl_body").empty();
//
//     let student_list = get_students();
//
//     student_list.map((obj,index)=>{
//         let tbl_row = `<tr> <td>${obj.f_name}</td> <td>${obj.l_name}</td> <td>${obj.address}</td> <tr>`;
//
//         $("#student_tbl_body").append(tbl_row);
//     });
//
// }
//
// //============ADD STUDENT 2 nd type- with class =================//
//
//
// $("#student_save_btn").on("click", function () {
//     console.log("save btn clicked!!!")
//     let f_name = $("#f_name").val();
//     let l_name = $("#l_name").val();
//     let address = $("#address").val();
//
//     if (!validate_fields()) return;
//
//     let student_obj = new StudentDTO(f_name, l_name, address);
//
//     //ADD STUDENT METHOD
//     add_student(student_obj);
//
//     Swal.fire({
//         icon: "success",
//         title: "Student Saved!",
//         text: "The student details have been successfully saved."
//     });
//     // student_db.push(student_obj);
//     load_student_tbl()
// });
//
// //=============CLICK STUDENT ON ACTION=================//
//
// $('#student_tbl_body').on('click','tr', function (){
//     // tbl_row = $(this);
//
//     tbl_row = $(this).index();
//
//     console.log(tbl_row)
//
//     let student_detail = get_student(tbl_row);
//
//     console.log(student_detail)
//
//     // $("#f_name").val(student_detail.f_name);
//     // $("#l_name").val(student_detail.l_name);
//     // $("#address").val(student_detail.address);
// });
//
// //=============Validate Data=================//
//
//
// const validate_fields = () => {
//     let f_name = $("#f_name").val().trim();
//     let l_name = $("#l_name").val().trim();
//     let address = $("#address").val().trim();
//
//     if (!f_name || !l_name || !address) {
//         Swal.fire({
//             icon: "warning",
//             title: "Validation Failed",
//             text: "All fields are required!"
//         });
//         return false;
//     }
//     return true;
// };
//
// //=============DELETE STUDENT=================//
//
// $('#student_delete_btn').on("click", ()=> {
//
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//             confirmButton: "btn btn-success",
//             cancelButton: "btn btn-danger"
//         },
//         buttonsStyling: false
//     });
//     swalWithBootstrapButtons.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true
//     }).then((result) => {
//         if (result.isConfirmed) {
//
//             delete_student(tbl_row,1);
//             // student_db.splice(tbl_row,1);
//             load_student_tbl();
//             $("#student_remove_btn").click();
//
//             swalWithBootstrapButtons.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success"
//             });
//         }
//     });
//
//
// });
//
// //=============UPDATE STUDENT=================//
//
// $('#student_update_btn').on("click", function () {
//     if (tbl_row === -1) {
//         Swal.fire({
//             icon: "error",
//             title: "No Record Selected",
//             text: "Please select a student to update."
//         });
//         return;
//     }
//
//     if (!validate_fields()) return;
//
//     let f_name = $("#f_name").val().trim();
//     let l_name = $("#l_name").val().trim();
//     let address = $("#address").val().trim();
//
//     let updated_student = new StudentDTO(f_name, l_name, address);
//     update_student(tbl_row, updated_student);
//
//     load_student_tbl();
//     reset_form();
//
//     Swal.fire({
//         icon: "success",
//         title: "Student Updated!",
//         text: "The student details have been successfully updated."
//     });
// });
//
import StudentDTO from "../dto/StudentDTO.js";
import {
    add_student,
    delete_student,
    get_students,
    get_student,
    update_student
} from "../model/StudentModel.js";

let tbl_row = -1; // ensure a default 'no selection' value

//============LOAD STUDENT =================//
const load_student_tbl = () => {
    $("#student_tbl_body").empty();

    let student_list = get_students() || [];

    student_list.forEach((obj, index) => {
        // add a data-index attribute (helps if table structure changes)
        let rowHtml = `<tr data-index="${index}">
                           <td>${obj.f_name}</td>
                           <td>${obj.l_name}</td>
                           <td>${obj.address}</td>
                       </tr>`;
        $("#student_tbl_body").append(rowHtml);
    });
};

//============RESET FORM=================//
const reset_form = () => {
    $("#f_name").val("");
    $("#l_name").val("");
    $("#address").val("");
    tbl_row = -1;
    // optionally remove any selected row highlight
    $("#student_tbl_body tr").removeClass("table-active");
};

//============VALIDATE DATA=================
const validate_fields = () => {
    let f_name = $("#f_name").val().trim();
    let l_name = $("#l_name").val().trim();
    let address = $("#address").val().trim();

    if (!f_name || !l_name || !address) {
        Swal.fire({
            icon: "warning",
            title: "Validation Failed",
            text: "All fields are required!"
        });
        return false;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(f_name)) {
        Swal.fire({
            icon: "error",
            title: "Invalid First Name",
            text: "First name can only contain letters and spaces."
        });
        return false;
    }
    if (!namePattern.test(l_name)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Last Name",
            text: "Last name can only contain letters and spaces."
        });
        return false;
    }

    if (address.length < 5) {
        Swal.fire({
            icon: "error",
            title: "Invalid Address",
            text: "Address must be at least 5 characters long."
        });
        return false;
    }

    return true;
};

//============ADD STUDENT=================//
$("#student_save_btn").on("click", function () {
    console.log("save btn clicked!!!");

    // read and trim values
    let f_name = $("#f_name").val().trim();
    let l_name = $("#l_name").val().trim();
    let address = $("#address").val().trim();

    // validate
    if (!validate_fields()) return;

    let student_obj = new StudentDTO(f_name, l_name, address);

    // ADD STUDENT METHOD
    add_student(student_obj);

    // reload and reset
    load_student_tbl();
    reset_form();

    Swal.fire({
        icon: "success",
        title: "Student Saved!",
        text: "The student details have been successfully saved.",
        timer: 1500,
        showConfirmButton: false
    });
});

//=============CLICK STUDENT ON ACTION=================//
$('#student_tbl_body').on('click', 'tr', function () {
    // get index either from attribute or fallback to index()
    const idxAttr = $(this).attr("data-index");
    tbl_row = (typeof idxAttr !== "undefined") ? parseInt(idxAttr, 10) : $(this).index();

    // highlight selected row
    $("#student_tbl_body tr").removeClass("table-active");
    $(this).addClass("table-active");

    console.log("selected row:", tbl_row);

    let student_detail = get_student(tbl_row);
    if (!student_detail) {
        // defensive: if nothing found, reset selection and return
        tbl_row = -1;
        Swal.fire({
            icon: "error",
            title: "Selection Error",
            text: "Could not find selected student."
        });
        return;
    }

    // populate form for update/delete
    $("#f_name").val(student_detail.f_name);
    $("#l_name").val(student_detail.l_name);
    $("#address").val(student_detail.address);
});

//=============DELETE STUDENT=================//
$('#student_delete_btn').on("click", () => {
    if (tbl_row === -1) {
        Swal.fire({
            icon: "error",
            title: "No Record Selected",
            text: "Please select a student to delete."
        });
        return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            delete_student(tbl_row); // model expects index only
            load_student_tbl();
            reset_form();

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "The student has been deleted.",
                icon: "success"
            });
        }
    });
});

//=============UPDATE STUDENT=================//
$('#student_update_btn').on("click", function () {
    if (tbl_row === -1) {
        Swal.fire({
            icon: "error",
            title: "No Record Selected",
            text: "Please select a student to update."
        });
        return;
    }

    // validate current form values
    if (!validate_fields()) return;

    let f_name = $("#f_name").val().trim();
    let l_name = $("#l_name").val().trim();
    let address = $("#address").val().trim();

    let updated_student = new StudentDTO(f_name, l_name, address);
    update_student(tbl_row, updated_student);

    load_student_tbl();
    reset_form();

    Swal.fire({
        icon: "success",
        title: "Student Updated!",
        text: "The student details have been successfully updated.",
        timer: 1500,
        showConfirmButton: false
    });
});

//============INITIAL LOAD=================//
$(document).ready(function () {
    load_student_tbl();
});
