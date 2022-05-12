function Validation() {
  this.ktraRong = (value, spanId, msg) => {
    if (value.trim() === "") {
      getEle(spanId).innerHTML = msg;
      getEle(spanId).style.display = "block";
      return false;
    } else {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
  };

  this.ktraTrung = (value, spanId, msg, arr) => {
    let result = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].taiKhoan === value) {
        result = true;
        break;
      }
    }
    if (result) {
      getEle(spanId).innerHTML = msg;
      getEle(spanId).style.display = "block";
      return false;
    } else {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
  };

  this.kiemTraKiTu = function (value, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      //Hop le
      getEle(divId).innerHTML = "";
      getEle(divId).style.display = "none";
      return true;
    }
    // k hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };

  this.kiemTraDoDaiKiTu = function (value, spanId, message, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      //hop le
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };

  this.kiemTraMatKhau = function (value, spanId, message) {
    let password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(password)) {
      //hop le
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };

  this.kiemTraEmail = function (value, spanId, message) {
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(email)) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };
}
