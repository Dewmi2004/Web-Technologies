
import StudentDTO from "../dto/StudentDTO.js";
import {add_student,delete_student,get_students,get_student} from "../model/StudentModel.js";
let tbl_row;

//=============ADD STUDENT=================//

// let add_student_record = (objs)=>{
//     let tbl_row =   `<tr> <td>${objs.f_name}</td> <td>${objs.l_name}</td> <td>${objs.address}</td> </tr>`;
//     $("#student_tbl_body").append(tbl_row);
//
// }
// $('#student_save_btn').on("click",function () {
//     console.log("clicked...");
//     let f_name = $('#f_name').val();
//     let l_name = $('#l_name').val();
//     let address = $('#address').val();
//
//     let student_obj = {
//         f_name: f_name,
//         l_name : l_name,
//         address : address
//     };
//     add_student_record(student_obj);
// });

//============LOAD STUDENT =================//


const load_student_tbl = (obj) => {
    $("#student_tbl_body").empty();

    let student_list = get_students();

    student_list.map((obj,index)=>{
        let tbl_row = `<tr> <td>${obj.f_name}</td> <td>${obj.l_name}</td> <td>${obj.address}</td> <tr>`;

        $("#student_tbl_body").append(tbl_row);
    });

}

//============ADD STUDENT 2 nd type- with class =================//


$("#student_save_btn").on("click", function () {
    console.log("save btn clicked!!!")
    let f_name = $("#f_name").val();
    let l_name = $("#l_name").val();
    let address = $("#address").val();



    let student_obj = new StudentDTO(f_name, l_name, address);

    //ADD STUDENT METHOD
    add_student(student_obj);

    // student_db.push(student_obj);
    load_student_tbl()
});

//=============CLICK STUDENT ON ACTION=================//

$('#student_tbl_body').on('click','tr', function (){
    // tbl_row = $(this);

    tbl_row = $(this).index();

    console.log(tbl_row)

    let student_detail = get_student(tbl_row);

    console.log(student_detail)

    // $("#f_name").val(student_detail.f_name);
    // $("#l_name").val(student_detail.l_name);
    // $("#address").val(student_detail.address);
});


//=============DELETE STUDENT=================//

$('#student_delete_btn').on("click", ()=> {

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

            delete_student(tbl_row,1);
            // student_db.splice(tbl_row,1);
            load_student_tbl();
            $("#student_remove_btn").click();

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });


});

