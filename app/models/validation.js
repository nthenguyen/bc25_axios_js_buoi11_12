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
      if (arr[i].innerHTML === value) {
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

  this.kiemTraSo = function (value, spanId, message) {
    let numbers = /^[0-9]+$/;
    if (value.match(numbers)) {
      //hop le
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };

  this.kiemTraKiTuDacBiet = function (value, spanId, message) {
    let letters =
      '^[^<>{}"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$';
    if (value.match(letters)) {
      //hop le
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
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
