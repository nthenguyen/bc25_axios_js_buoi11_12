function getEle(id) {
  return document.getElementById(id);
}

var services = new Services();
var validation = new Validation();

function getListTeacher() {
  let promise = services.fetchData();
  promise
    .then((res) => renderHTML(res.data))
    .catch((err) => console.log(err))
    .finally(() => {});
}

getListTeacher();

function renderHTML(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    let teacher = data[i];
    let { id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu } = teacher;
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${taiKhoan}</td>
            <td>${matKhau}</td>
            <td>${hoTen}</td>
            <td>${email}</td>
            <td>${ngonNgu}</td>
            <td>${loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editTeacher(${id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteTeacher(${id})">Delete</button>
            </td>
        </tr>
    `;
  }
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

function deleteTeacher(id) {
  let promise = services.deleteUserById(id);
  promise.then(() => getListTeacher()).catch((err) => console.log(err));
}

function editTeacher(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Update Teacher";
  let footer = `<button class="btn btn-success" onclick="updateTeacher(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  let promise = services.getTeacherById(id);
  promise
    .then((res) => {
      let {
        taiKhoan,
        hoTen,
        matKhau,
        email,
        loaiND,
        ngonNgu,
        moTa,
        hinhAnh,
      } = res.data;
      getEle("TaiKhoan").value = taiKhoan;
      getEle("TaiKhoan").disabled = true;
      getEle("HoTen").value = hoTen;
      getEle("MatKhau").value = matKhau;
      getEle("Email").value = email;
      getEle("loaiNgonNgu").value = ngonNgu;
      getEle("loaiNguoiDung").value = loaiND;
      getEle("MoTa").value = moTa;
      getEle("HinhAnh").value = hinhAnh;
    })
    .catch((err) => console.log(err));
}

function updateTeacher(id) {
  let taiKhoan = getEle("TaiKhoan").value;
  let hoTen = getEle("HoTen").value;
  let matKhau = getEle("MatKhau").value;
  let email = getEle("Email").value;
  let ngonNgu = getEle("loaiNgonNgu").value;
  let loaiND = getEle("loaiNguoiDung").value;
  let moTa = getEle("MoTa").value;
  let hinhAnh = getEle("HinhAnh").value;
  let valid = checkValid();
  if (valid) {
    let teacher = new User(
      id,
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh
    );
    if (teacher.loaiND === "GV") {
      let promise = services.updateTeacher(id, teacher);
      promise
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          getListTeacher();
          document.getElementsByClassName("close")[0].click();
          clearFields();
          clearMessage();
          getEle("TaiKhoan").disabled = false;
        });
    } else {
      alert("Phải chọn loại người dùng GV");
      return false;
    }
  }
}

getEle("btnThemNguoiDung").addEventListener("click", () => {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Teacher";
  let footer = `<button class="btn btn-success" onclick="addTeacher()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function addTeacher() {
  let taiKhoan = getEle("TaiKhoan").value;
  let hoTen = getEle("HoTen").value;
  let matKhau = getEle("MatKhau").value;
  let email = getEle("Email").value;
  let ngonNgu = getEle("loaiNgonNgu").value;
  let loaiND = getEle("loaiNguoiDung").value;
  let moTa = getEle("MoTa").value;
  let hinhAnh = getEle("HinhAnh").value;
  let valid = checkValid();
  if (valid) {
    let teacher = new User(
      "",
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh
    );
    if (teacher.loaiND === "GV") {
      let promise = services.addTeacher(teacher);
      promise
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          getListTeacher();
          document.getElementsByClassName("close")[0].click();
        });
    } else {
      alert("Phải chọn loại người dùng GV");
      return false;
    }
  }
}

function checkValid() {
  let taiKhoan = getEle("TaiKhoan").value;
  let hoTen = getEle("HoTen").value;
  let matKhau = getEle("MatKhau").value;
  let email = getEle("Email").value;
  let ngonNgu = getEle("loaiNgonNgu").value;
  let loaiND = getEle("loaiNguoiDung").value;
  let moTa = getEle("MoTa").value;
  let hinhAnh = getEle("HinhAnh").value;
  let arr = [];
  let isValid = true;
  /* Tai khoan */
  isValid &=
    validation.ktraRong(
      taiKhoan,
      "tbTaiKhoan",
      "Tài khoản không được để trống"
    ) &&
    validation.ktraTrung(taiKhoan, "tbTaiKhoan", "Tài khoản đã tồn tại", arr);

  /* Ho ten */
  isValid &=
    validation.ktraRong(hoTen, "tbHoTen", "Họ tên không được để trống") &&
    !validation.kiemTraSo(hoTen, "tbHoTen", "Họ tên không được chứa số") &&
    !validation.kiemTraKiTuDacBiet(
      hoTen,
      "tbHoTen",
      "Họ tên không được chứa kí tự đặc biệt"
    );

  /* Mat khau */
  isValid &=
    validation.ktraRong(matKhau, "tbMatKhau", "Mật khẩu không được để trống") &&
    validation.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "Mật khẩu từ 6 - 8 kí tự",
      6,
      8
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "tbMatKhau",
      "Mật khẩu ít nhất 1 chữ hoa, 1 chữ thường, 1 kí tự đặc biệt và 1 số"
    );

  /* Email */
  isValid &=
    validation.ktraRong(email, "tbEmail", "Email không được để trống") &&
    validation.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");

  /* Hinh Anh */
  isValid = validation.ktraRong(
    hinhAnh,
    "tbImage",
    "Hình ảnh không được để trống"
  );

  /* Loai nguoi dung */
  isValid = validation.ktraRong(loaiND, "tbLoaiND", "Phải chọn");

  /* Ngon ngu */
  isValid = validation.ktraRong(ngonNgu, "tbNgonNgu", "Phải chọn");

  /* Mo ta */
  isValid &=
    validation.ktraRong(moTa, "tbMoTa", "Mô tả không được để trống") &&
    validation.kiemTraDoDaiKiTu(moTa, "tbMoTa", "Không quá 60 kí tự", 1, 60);

  return isValid;
}

const clearFields = () => {
  const fields = document.querySelectorAll(".form-control");
  for (let i = 0; i < fields.length; i++) {
    fields[i].value = "";
  }
};

const clearMessage = () => {
  const message = document.querySelectorAll(".thongbao");
  for (let i = 0; i < message.length; i++) {
    message[i].innerHTML = "";
  }
};
