var REGEX_PHONE_NUMBER = /^(01[2-9]|09[0-4]|09[6-9]|08[1-9]|07[0-9]|05[6-9]|03[2-9])\d{7}$/
var REGEX_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
// var REGEX_PASSWD = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])(?=.*\d)[!-~]{6,20}$/;
var REGEX_PASSWD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
var REGEX_NAME = /^.{6,20}$/
module.exports = {
  REGEX_PHONE_NUMBER,
  REGEX_EMAIL,
  REGEX_PASSWD,
  REGEX_NAME,
};
