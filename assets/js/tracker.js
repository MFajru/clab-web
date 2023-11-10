const inputName = ["detail", "amount"];

function formatNumber(number) {
  return new Intl.NumberFormat("en-DE").format(number);
}

function addTransaction(event) {
  let formElements = event.target;

  let newObj = {
    detail: "",
    amount: 0,
  };
  for (inp of inputName) {
    newObj[inp] = formElements[inp].value;
  }

  const localDataJson = localStorage.getItem("data");
  const existingLocalData = JSON.parse(localDataJson);
  existingLocalData.push(newObj);
  localStorage.setItem("data", JSON.stringify(existingLocalData));
}

function deleteData(id) {
  const arrLocalDataJson = localStorage.getItem("data");
  let arrLocalData = JSON.parse(arrLocalDataJson);
  arrLocalData.splice(id, 1);
  localStorage.setItem("data", JSON.stringify(arrLocalData));
  location.reload();
}

function getTransaction() {
  const arrLocalDataJson = localStorage.getItem("data");
  if (!arrLocalDataJson) {
    localStorage.setItem("data", JSON.stringify([]));
    return;
  }
  const ulTag = document.getElementById("historyList");
  let arrLocalData = JSON.parse(arrLocalDataJson);
  for (idx in arrLocalData) {
    const newList = document.createElement("li");
    if (arrLocalData[idx].amount < 0) {
      newList.innerHTML = `<div class="history__item">
      <div class="history__item__head">
        <button class="history__item__delete btn--delete" onclick="deleteData(${idx})">
            <i class="bi bi-trash-fill"></i>
        </button>
        <p class="history__item__head__name">${arrLocalData[idx].detail}</p>
      </div>

      <div class="history__item__amount">
        <p class="history__item__amount__text">${formatNumber(
          arrLocalData[idx].amount
        )}</p>
        <div class="history__item__amount__bar--red"></div>
      </div>
    </div>`;
    } else {
      newList.innerHTML = `<div class="history__item">
      <div class="history__item__head">
        <button class="history__item__delete btn--delete" onclick="deleteData(${idx})">
            <i class="bi bi-trash-fill"></i>
        </button>
        <p class="history__item__head__name">${arrLocalData[idx].detail}</p>
      </div>

      <div class="history__item__amount">
        <p class="history__item__amount__text">${formatNumber(
          arrLocalData[idx].amount
        )}</p>
        <div class="history__item__amount__bar--green"></div>
      </div>
    </div>`;
    }
    ulTag.appendChild(newList);
  }
}

function getIncomeAndExpense() {
  const arrLocalDataJson = localStorage.getItem("data");
  if (!arrLocalDataJson) {
    return;
  }
  const arrLocalData = JSON.parse(arrLocalDataJson);
  for (idx in arrLocalData) {
    if (arrLocalData[idx].amount < 0) {
      let expense = document.getElementById("expense");
      expense.innerHTML = `-Rp ${formatNumber(
        Math.abs(arrLocalData[idx].amount)
      )}`;
    } else {
      let income = document.getElementById("income");
      income.innerHTML = `+Rp ${formatNumber(arrLocalData[idx].amount)}`;
    }
  }
}

function getBalance() {
  let balance = 0;
  const arrLocalDataJson = localStorage.getItem("data");
  if (!arrLocalDataJson) {
    return;
  }
  const arrLocalData = JSON.parse(arrLocalDataJson);
  for (idx in arrLocalData) {
    balance += parseInt(arrLocalData[idx].amount);
  }
  const balanceId = document.getElementById("balance");
  balanceId.innerHTML = `Rp ${formatNumber(balance)}`;
}

document
  .getElementById("newTransaction")
  .addEventListener("submit", addTransaction);
getTransaction();
getIncomeAndExpense();
getBalance();
