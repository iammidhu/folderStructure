document.addEventListener('DOMContentLoaded', startExtension());

function startExtension() {
  fields.password = $("input[type=password]");
  fields.username = $("input[type=text]").not(fields.password);

  fields.password.value = 'MyPassword';
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
