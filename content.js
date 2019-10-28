document.addEventListener('DOMContentLoaded', startExtension());

console.log("Executed");

function startExtension() {
  console.log("Executed");
  var password_fields = getPwdInputs();
  alert(password_fields[0].id);
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
