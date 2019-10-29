document.addEventListener('DOMContentLoaded', startExtension());

function startExtension() {
  var password = $("input[type=password]");
  var username = $("input[type=text]").not(fields.password);

  password[0].value = 'MyPassword';
}

function getPwdInputs() {
  var ary = [];
  var inputs = document.getElementsByTagName("input");
  for (var i=0; i<inputs.length; i++) {
    if (inputs[i].type.toLowerCase() === "password") {
      ary.push(inputs[i]);
    }
  }
  return ary;
}
