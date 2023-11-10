function submit() {
  let elementContent = document.forms["login"].elements["email"].value;
  let newObj = {
    email: "",
  };
  newObj.email = elementContent;
  const localDataJson = localStorage.getItem("user");
  if (!localDataJson) {
    localStorage.setItem("user", JSON.stringify([]));
    return;
  }
  const existingLocalData = JSON.parse(localDataJson);
  existingLocalData.push(newObj);
  localStorage.setItem("user", JSON.stringify(existingLocalData));
}

document.getElementById("login").addEventListener("submit", submit);
