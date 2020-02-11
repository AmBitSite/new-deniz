let sliderParent = document.querySelector(".slider");
let sliderControls = document.querySelector(".slider-controls");
if (sliderParent) {
    function sliderCart(arrElem, count) {
        for (let j = 0; j < arrElem.children.length; j++) {
            arrElem.children[j].style.display = "none";
        }
        arrElem.children[count].style.display = "block";
    }
    if (sliderControls) {
        sliderControls.addEventListener("click", function (e) {
            if (e.target.classList.contains("slider-control__item")) {
                let btnSlider = e.target;
                let activeClass = document.querySelector(".slider-control__item_active");
                activeClass.classList.remove("slider-control__item_active")
                btnSlider.classList.add("slider-control__item_active")
                for (let i = 0; i < sliderControls.children.length; i++) {
                    if (sliderControls.children[i].classList.contains("slider-control__item_active")) {
                        sliderCart(sliderParent, i)
                    }
                }
            }
        })
    }
    function runSlider() {
        let arrControlSlider = document.querySelectorAll(".slider-control__item")
        for (let i = 0; i < arrControlSlider.length; i++) {
            if (arrControlSlider[i].classList.contains("slider-control__item_active")) {
                arrControlSlider[i].classList.remove("slider-control__item_active")
                if (i != arrControlSlider.length - 1) {
                    arrControlSlider[`${i += 1}`].classList.add("slider-control__item_active")
                    sliderCart(sliderParent, i)
                }
                else {
                    i = 0;
                    arrControlSlider[i].classList.add("slider-control__item_active")
                    sliderCart(sliderParent, i)
                }
            }
        }
    }
    setInterval(runSlider, 5000)
}
// -----------------------------currency rate--------------------------------
const CURRENCY = document.getElementsByClassName("currency")
if (CURRENCY) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=EUR", true);
    xhr.send();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            for (let i = 0; i < CURRENCY.length; i++) {
                CURRENCY[i].children[1].innerText = JSON.parse(this.responseText).rates[CURRENCY[i].children[0].innerText];
            };
        };
    });
}
// -----------------------------------crypto currency -----------------------------------------------
const CRYPTO_CURRENCY = document.getElementsByClassName("crypto-currency")
if (CRYPTO_CURRENCY) {
    let xhrC = new XMLHttpRequest();
    xhrC.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=BTC,ETH,BCH,USDT,LTC&apiKey=bb98291570d521612ebd320b47a541e57dd03581bc116ddeb19abb62e7a306a6", true);
    xhrC.send();
    xhrC.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            for (let i = 0; i < CRYPTO_CURRENCY.length; i++) {

                CRYPTO_CURRENCY[i].children[1].innerText = JSON.parse(this.responseText)[CRYPTO_CURRENCY[i].children[0].innerText];
            };
        };
    });
}
// ------------------------------------------news block-------------------------------------

const NEWS_SECTION = document.querySelector(".news-section")
if (NEWS_SECTION) {
    let xhrN = new XMLHttpRequest();
    xhrN.open("GET", "https://newsapi.org/v2/top-headlines?category = business&sources=bloomberg&apiKey=d5ab78edfa2649a6b0fd66a7cf1c2c68", true);
    xhrN.send();
    xhrN.addEventListener("readystatechange", function () {
        for (let j = 0; j < NEWS_SECTION.children.length; j++) {
            NEWS_SECTION.children[j].setAttribute('href', JSON.parse(this.responseText).articles[j].url);
            NEWS_SECTION.children[j].innerText = JSON.parse(this.responseText).articles[j].title;
        }
    });
}


// -------------------------------------log-in---------------------------------------------
if (document.querySelector(".login-block")) {
    const BLOCK_LOGIN = document.querySelector(".login-block")
    const LOGIN_BTN_CLOSE = document.querySelector(".login__btn-close")
    const BTN_LOGIN_POPUP = document.getElementById("btn-login-pop-up")
    const BTN_LOGIN = document.getElementById("login__btn")
    const BTN_PIN = document.getElementById("pin__btn")
    const BLOCK_AUTHORIZATION = document.querySelector(".authorization")
    const BLOCK_LOGIN_PIN = document.querySelector(".login-pin")
    const BLOCK_LOGIN_ERROR = document.querySelector(".login-error")
    function toggleDisplay(elem) {
        elem.classList.toggle("d-none")
    }
    LOGIN_BTN_CLOSE.addEventListener("click", () => {
        toggleDisplay(BLOCK_LOGIN)
        if (BLOCK_AUTHORIZATION.classList.contains("d-none")) toggleDisplay(BLOCK_AUTHORIZATION)
        if (!BLOCK_LOGIN_ERROR.classList.contains("d-none")) toggleDisplay(BLOCK_LOGIN_ERROR)
        if (!BLOCK_LOGIN_PIN.classList.contains("d-none")) toggleDisplay(BLOCK_LOGIN_PIN)
    })
    BTN_LOGIN_POPUP.addEventListener("click", () => { toggleDisplay(BLOCK_LOGIN) })

    BTN_LOGIN.addEventListener("click", () => {
        let obj = {
            username: document.querySelector(".authorization__login").value.trim(),
            password: document.querySelector(".authorization__password").value.trim()
        }
        let objS = JSON.stringify(obj)
        let promise = new Promise((resolve, reject) => {
            let xhrd = new XMLHttpRequest();
            xhrd.open("POST", "https://server.samtsov.com:8090/api/login_check", true);
            xhrd.send(objS);
            xhrd.addEventListener("readystatechange", function () {
                if (this.status === 200) {
                    sessionStorage.setItem("token", JSON.parse(this.responseText).token);
                    resolve(this.responseText)
                }
                else {
                    var error = new Error(this.statusText);
                    if (error !== "OK") {
                        error.code = this.status;
                        reject(error);
                    }
                }
            });
        })
        promise
            .then(
                result => {
                    let result1 = new XMLHttpRequest();
                    result1.open("POST", "https://server.samtsov.com:8090/user/sends/users/pins", true);
                    result1.setRequestHeader("Authorization", `${sessionStorage.getItem("token")}`)
                    result1.send();
                    result1.addEventListener("readystatechange", function () {
                        if (this.readyState === this.DONE) {
                            toggleDisplay(BLOCK_AUTHORIZATION)
                            toggleDisplay(BLOCK_LOGIN_PIN)
                        }
                    });
                },
                error => {
                    toggleDisplay(BLOCK_AUTHORIZATION)
                    toggleDisplay(BLOCK_LOGIN_ERROR)

                }
            )

    })
    BTN_PIN.addEventListener("click", () => {
        let promise = new Promise((resolve, rejec) => {
            let xhrd = new XMLHttpRequest();
            xhrd.open("POST", "https://server.samtsov.com:8090/user/verifications", true);
            xhrd.setRequestHeader("Authorization", 'Bearer ' + `${sessionStorage.getItem("token")}`)
            xhrd.setRequestHeader("Content-Type", "application/json");
            let inputPin = document.querySelector(".authorization__pin")
            let pin = { "pin": `${inputPin.value}` }
            xhrd.send(JSON.stringify(pin));
            xhrd.addEventListener("readystatechange", function () {
                if (this.status === 200) {
                    sessionStorage.setItem("base", this.responseText)
                    resolve(this.responseText)
                }
                else {
                    var error = new Error(this.statusText);
                    if (error !== "OK") {
                        error.code = this.status;
                        rejec(error);
                    }
                }
            });
        })
        promise
            .then(
                resul => {
                    window.location = `${window.origin}/account.html`;
                },
                error => {
                    toggleDisplay(BLOCK_LOGIN_PIN)
                    toggleDisplay(BLOCK_LOGIN_ERROR)
                }
            )
    })
}
// ------------------------------------------------account----------------------------------------
if (document.querySelector(".menu-tab")) {
    let blockArrTabs = document.querySelector(".menu-tab");
    let blockArrMenu = document.querySelectorAll(".menu-tab-block");
    let menuTab = document.querySelector(".menu-tab")

    if (blockArrTabs) {
        blockArrTabs.addEventListener("click", (e) => {
            let arrTabs = document.getElementsByClassName("menu-tab__item");
            document.querySelector(".tab_active").classList.remove("tab_active")
            document.querySelector(".menu-tab__item_active").classList.remove("menu-tab__item_active")
            for (let i = 0; i < arrTabs.length; i++) {
                if (arrTabs[i] === e.target) {
                    menuTab.children[i].classList.add("menu-tab__item_active")
                    blockArrMenu[i].classList.add("tab_active")
                }
            }
        })
    }
    let transferInputArgee = document.getElementById("transfer-btn__input")
    let transferBtnSend = document.querySelector(".transfer__btn")
    function toggleDisabled(booleanValue, elemDisabled) {
        booleanValue ? elemDisabled.removeAttribute("disabled") : elemDisabled.setAttribute("disabled", "true")
    }

    transferInputArgee.addEventListener("click", () => {
        toggleDisabled(transferInputArgee.checked, transferBtnSend)
    })
    let objAccount = JSON.parse(sessionStorage.getItem("base")) || ""
    function getElementAndSetText(element, text) {
        return document.getElementById(element).innerText = text
    }
    getElementAndSetText("client-name", `${objAccount.client_first_name}${objAccount.client_id}`)
    getElementAndSetText("client-email", `${objAccount.email}`)
    for (key in objAccount) {
        if (typeof (objAccount[key]) !== "object") {
            getElementAndSetText(key, objAccount[key])
        }
    }

    let accountInvoiceTable = document.getElementById("account-invoice")
    function createAccountRow() {
        let accountInvoiceTableRow = document.createElement("div")
        accountInvoiceTableRow.classList.add("account-table-row")
        accountInvoiceTableRow.classList.add("row__text_style")
        accountInvoiceTable.appendChild(accountInvoiceTableRow)
        return accountInvoiceTableRow
    }

    function createDataAccount(className, value, parent) {
        let element = document.createElement("span")
        element.classList.add(className);
        element.innerHTML = value
        parent.appendChild(element)
    }
    let accountArr = objAccount.accounts
    let accountNumbers = []
    for (key in accountArr) {
        let accountRow = createAccountRow();
        accountNumbers.push(accountArr[key].account_special_number)
        createDataAccount("account-details__column_w218", accountArr[key].account_special_number, accountRow)
        createDataAccount("account-details__column_w208", accountArr[key].account_type_name, accountRow)
        createDataAccount("account-details__column_w108", accountArr[key].currency_abbreviation, accountRow)
        createDataAccount("account-details__column_w115", (accountArr[key].status) ? "Active" : "Deactive", accountRow)
        createDataAccount("account-details__column_w126", accountArr[key].balance, accountRow)
        createDataAccount("account-details__column_w126", accountArr[key].min_balance, accountRow)

    }
    const WRAP_ACCOUNT_NUMBERS = document.getElementById("transaction-date-wrap")
    const WRAP_ACCOUNT_NUMBERS_INTERNATIONAL = document.getElementById("international-date-wrap")
    const WRAP_ACCOUNT_NUMBERS_INTRA = document.getElementById("intra-date-wrap")
    const WRAP_ACCOUNT_NUMBERS_INTRA_TO = document.getElementById("intra-date-wrap-to")
    function createLi(className, value, parent) {
        let elem = document.createElement("li");
        elem.classList.add(className)
        elem.classList.add("d-none")
        elem.innerText = value
        parent.appendChild(elem)
    }

    for (key of accountNumbers) createLi("transaction-date-wrap__item", key, WRAP_ACCOUNT_NUMBERS)
    for (key of accountNumbers) createLi("transaction-date-wrap__item", key, WRAP_ACCOUNT_NUMBERS_INTERNATIONAL)
    for (key of accountNumbers) createLi("transaction-date-wrap__item", key, WRAP_ACCOUNT_NUMBERS_INTRA)
    for (key of accountNumbers) createLi("transaction-date-wrap__item", key, WRAP_ACCOUNT_NUMBERS_INTRA_TO)

    const TRANSACTIONS_BTN = document.getElementById("transactions")

    TRANSACTIONS_BTN.addEventListener("click", () => {
        let promise = new Promise((resolve, reject) => {
            let xhrd = new XMLHttpRequest();
            xhrd.open("POST", "https://server.samtsov.com:8090/api/transfeers/gets/users/accounts/details", true);
            xhrd.setRequestHeader("Authorization", 'Bearer ' + `${sessionStorage.getItem("token")}`)
            xhrd.setRequestHeader("Content-Type", "application/json");
            xhrd.send();
            xhrd.addEventListener("readystatechange", function () {
                if (this.status === 200) {
                    if (this.responseText) resolve(this.responseText)
                }
            });
        })
        promise
            .then(
                resul => {
                    objAccount.statictic = JSON.parse(resul)
                    clearStatisticRow()
                    renderStatistic("All accounts")
                },
                error => {
                    alert("Error")
                }
            )
    })
    const TRANSACTION_TABLE = document.getElementById("transactions-table")

    function createStatisticRow() {
        let statisticRow = document.createElement("div")
        statisticRow.classList.add("statistic-table-row")
        statisticRow.classList.add("row__text_style")
        TRANSACTION_TABLE.appendChild(statisticRow)
        return statisticRow
    }
    function correctData(data) {
        arrData = data.split("T")
        return arrData[0]
    }
    function statisticAmount(elem) {
        if (elem.debit) { return `-${elem.debit}` } else { return `+${elem.credit}` }
    }
    function benificiary(obj) {

        if (obj.transfer_type_name === "International Transfer") {
            return '<a href="#" class="link-benificiary">' + `${obj.iban_code}` + '</a>'
        }

        else if (obj.transfer_type_name === "Intra Transfer") return obj.intra_to_account_number
        else if (obj.transfer_type_name === "Incoming Transfer") return obj.account_special_number
        else { return "EuroDeniz IBU" }

    }
    function correctSender(obj) {
        if (obj.transfer_type_name === "Incoming Transfer") { return "EuroDeniz IBU" }
        else return obj.account_special_number
    }
    function clearStatisticRow() {
        const arrRow = document.getElementsByClassName("statistic-table-row");
        for (let i = 0; i < arrRow.length;) {
            arrRow[0].remove()
        }
    }


    function renderStatistic(account) {
        if (account === "All accounts") {
            for (key of objAccount.statictic) {
                for (key2 of key.transaction) {
                    let statisticRow = createStatisticRow()
                    createDataAccount("account-table-row-column_w89", correctData(key2.date), statisticRow)
                    createDataAccount("account-table-row-column_171", key2.transfer_type_name, statisticRow)
                    createDataAccount("account-table-row-column_140", correctSender(key2), statisticRow)
                    createDataAccount("account-table-row-column_w143", benificiary(key2), statisticRow)
                    createDataAccount("account-table-row-column_w141", key2.transfer_number, statisticRow)
                    createDataAccount("account-table-row-column_w98", statisticAmount(key2), statisticRow)
                    createDataAccount("account-table-row-column_w96", key2.status_name, statisticRow)
                    createDataAccount("account-table-row-column_w76", `${key2.balance} ${key.currency}`, statisticRow)
                }
            }
        }
        else {
            for (key of objAccount.statictic) {
                if (key.account_number === account) {
                    for (key2 of key.transaction) {
                        let statisticRow = createStatisticRow()
                        createDataAccount("account-table-row-column_w89", correctData(key2.date), statisticRow)
                        createDataAccount("account-table-row-column_171", key2.transfer_type_name, statisticRow)
                        createDataAccount("account-table-row-column_140", correctSender(key2), statisticRow)
                        createDataAccount("account-table-row-column_w143", benificiary(key2), statisticRow)
                        createDataAccount("account-table-row-column_w141", key2.transfer_number, statisticRow)
                        createDataAccount("account-table-row-column_w98", statisticAmount(key2), statisticRow)
                        createDataAccount("account-table-row-column_w96", key2.status_name, statisticRow)
                        createDataAccount("account-table-row-column_w76", `${key2.balance} ${key.currency}`, statisticRow)
                    }
                }

            }
        }
        console.log(objAccount.statictic)
        let arrLink = document.getElementsByClassName("link-benificiary")
        for (let i = 0; i < arrLink.length; i++) {
            arrLink[i].addEventListener("click", (e) => {
                e.stopImmediatePropagation()
                let obj = returnBenificiaryInfo(e.target.innerText)
                let objFieldsName = {
                    "Beneficiary": `${obj.iban_code}` || " ",
                    "To Account Number": `${obj.account_special_number}` || " ",
                    "Bank Name": `${obj.bank_name}` || " ",
                    "Bank Address": `${obj.bank_address}` || " ",
                    "Beneficiary Address": `${obj.beneficiary_address}` || " ",
                    "Beneficiary City": `${obj.beneficiary_city}` || " ",
                    "Beneficiary Country": `${obj.beneficiary_country}` || " ",
                    "Beneficiary Name": obj.beneficiary_name || " ",
                    "Beneficiary Reference": `${obj.reference}` || " ",
                    "Amount": `${checkTypeTransfer(obj.debit, obj.credit, obj.currency_abbreviation)}` || " ",
                    "Transaction Number": `${obj.transfer_number}` || " ",
                    "Status": `${obj.status_name}` || " "
                }
                function checkTypeTransfer(debit, credit, currency) {
                    if (debit) {return `-${debit} ${currency}`}
                    else {return `+${credit} ${currency}`}
                }
                sessionStorage.setItem("beneficiary", JSON.stringify(objFieldsName))
                var newWin = window.open("about:blank", "New Blank", "width=600,height=700");
                newWin.document.write("<script src='js/newWin.js' ></scr" + "ipt>"
                )
            })
        }
        sortRowStatistic("statistic-table-row")
    }
    function returnBenificiaryInfo(text) {
        for (key of objAccount.statictic) {
            for (key2 of key.transaction) {
                if (key2.iban_code === text) return key2
            }
        }
    }
    function sortRowStatistic(HTMLelem) {
        let rowStatistic = document.getElementsByClassName(HTMLelem);

        for (let i = 0; i < rowStatistic.length; i++) {
            for (let j = 0; j < rowStatistic.length - 1; j++) {
                if (+(rowStatistic[j].children[0].innerText.replace(/-/g, "")) <= +(rowStatistic[`${j + 1}`].children[0].innerText.replace(/-/g, ""))) {
                    rowStatistic[`${j + 1}`].after(rowStatistic[j])
                }
            }
        }
    }
    const TRANSACTION_DATE_WRAP_IMG = document.getElementById("statistic-wrap-img")
    const INTERNATIONAL_DATE_WRAP_IMG = document.getElementById("international-wrap-img")
    const INTRA_DATE_WRAP_IMG = document.getElementById("intra-wrap-img")
    const INTRA_DATE_WRAP_IMG_TO = document.getElementById("intra-wrap-img-to")

    TRANSACTION_DATE_WRAP_IMG.addEventListener("click", () => { wrapSelect(TRANSACTION_DATE_WRAP_IMG) })
    INTERNATIONAL_DATE_WRAP_IMG.addEventListener("click", () => { wrapSelect(INTERNATIONAL_DATE_WRAP_IMG) })
    INTRA_DATE_WRAP_IMG.addEventListener("click", () => { wrapSelect(INTRA_DATE_WRAP_IMG) })
    INTRA_DATE_WRAP_IMG_TO.addEventListener("click", () => { wrapSelect(INTRA_DATE_WRAP_IMG_TO) })
    function wrapSelect(elem) {
        let elemParent = elem.parentNode
        for (let i = 1; i < elemParent.offsetParent.children.length; i++) {
            elem.classList.add("img_rotate")
            elem.parentNode.parentNode.children[i].classList.remove("d-none")
            elem.parentNode.parentNode.children[i].addEventListener("click", (e) => {
                e.stopImmediatePropagation()
                let text = elem.previousElementSibling.innerText
                elem.previousElementSibling.innerText = e.target.innerText
                e.target.innerText = text
                clearStatisticRow()
                renderStatistic(elem.previousElementSibling.innerText)
                sortRowStatistic("statistic-table-row")
                for (let i = 1; i < elemParent.offsetParent.children.length; i++) {
                    elem.parentNode.parentNode.children[i].classList.add("d-none")
                }
                elem.classList.remove("img_rotate")
            })
        }
    }
    const TRANSACTION_DATE_SUBMIT = document.querySelector(".transaction-date__submit");
    TRANSACTION_DATE_SUBMIT.addEventListener("click", () => {
        let fromDate = document.getElementById("from-date")
        let toDate = document.getElementById("to-date")
        fromDate.addEventListener("click", () => {
            if (fromDate.classList.contains("error")) fromDate.classList.remove("error"); fromDate.value = ""
        })
        toDate.addEventListener("click", () => {
            if (toDate.classList.contains("error")) toDate.classList.remove("error"); toDate.value = ""
        })
        const REG_EXP = /\d{4}\-\d{2}\-\d{2}/g
        if (!fromDate.value.match(REG_EXP)) {
            fromDate.classList.add("error")
        }
        else if (!toDate.value.match(REG_EXP)) {
            toDate.classList.add("error")
        }
        else if (+(fromDate.value.replace(/-/g, "")) >= +(toDate.value.replace(/-/g, ""))) {
            fromDate.classList.add("error")
            toDate.classList.add("error")
        }
        if (!fromDate.classList.contains("error") || !toDate.classList.contains("error")) {
            clearStatisticRow()
            renderStatistic(document.querySelector(".transaction-date-wrap__item").innerText)
            let statisticRow = document.getElementsByClassName("statistic-table-row")
            for (let i = 0; i < statisticRow.length; i++) {
                if (((+(fromDate.value.replace(/-/g, ""))) <= (+(statisticRow[i].children[0].innerText.replace(/-/g, ""))) && (+(statisticRow[i].children[0].innerText.replace(/-/g, ""))) <= (+(toDate.value.replace(/-/g, ""))))) { }
                else { statisticRow[i].remove(); i--; }
            }
        }
    })
    // --------------------------------international-transfer----------------------------------------
    const INTERNATIONAL_BTN = document.querySelector(".transfer__btn");

    let objPaymentDate = {}
    INTERNATIONAL_BTN.addEventListener("click", (e) => {
        e.preventDefault()
        const INTERNATIONAL_INPUT_BLOCK = document.getElementsByClassName("transfer-input-block");
        const INTERNATIONAL_PAY_CHARGES = document.getElementsByClassName("transfer-pay-charges__input");
        const INTERNATIONAL_ACCOUNT_NUMBER = document.getElementById("transfer-account-number");
        const INTERNATIONAL_CHECKBOX = document.getElementById("transfer-btn__input")
        objPaymentDate["from_account"] = INTERNATIONAL_ACCOUNT_NUMBER.innerText
        for (let i = 0; i < INTERNATIONAL_INPUT_BLOCK.length; i++) {
            objPaymentDate[INTERNATIONAL_INPUT_BLOCK[i].children[0].innerText] = INTERNATIONAL_INPUT_BLOCK[i].children[1].value
            if (INTERNATIONAL_INPUT_BLOCK[i].children[1].value === "") {
                INTERNATIONAL_INPUT_BLOCK[i].classList.add("error")
                INTERNATIONAL_INPUT_BLOCK[i].addEventListener("click", (e) => {
                    e.preventDefault()
                    INTERNATIONAL_INPUT_BLOCK[i].classList.remove("error")
                })
            }
        }
        for (let i = 1; i < INTERNATIONAL_PAY_CHARGES.length; i++) {
            if (INTERNATIONAL_PAY_CHARGES[i].checked) {
                objPaymentDate["PayCharges"] = INTERNATIONAL_PAY_CHARGES[i].value;
            }
        }
        if (INTERNATIONAL_ACCOUNT_NUMBER.innerText === "All accounts") {
            return alert("error Account number")
        }
        else if (!INTERNATIONAL_CHECKBOX.checked) { return alert("error Terms of use") }
        else if (document.querySelector(".error")) {
            return alert("error fields")

        }
        else {
            let promise = new Promise((resolve, rejec) => {
                let xhrd = new XMLHttpRequest();
                xhrd.open("POST", "https://server.samtsov.com:8090/api/transfeers/payments/requests/applications", true);
                xhrd.setRequestHeader("Authorization", 'Bearer ' + `${sessionStorage.getItem("token")}`)
                xhrd.setRequestHeader("Content-Type", "application/json");
                xhrd.send(JSON.stringify(objPaymentDate));
                xhrd.addEventListener("readystatechange", function () {
                    if (this.status === 200) {
                        resolve(this.responseText)
                    }
                    else {
                        var error = new Error(this.statusText);
                        if (error !== "OK") {
                            error.code = this.status;
                            rejec(error);
                        }
                    }
                });
            })
            promise
                .then(
                    resul => {
                        document.querySelector(".popup-message").classList.remove("d-none")
                        for (let i = 0; i < INTERNATIONAL_INPUT_BLOCK.length; i++) {
                            INTERNATIONAL_INPUT_BLOCK[i].children[1].value = "";
                        }
                    },
                    error => {
                        alert("Error")
                    }
                )
        }
    })
    if (document.querySelector(".popup-message__close")) {
        document.querySelector(".popup-message__close").addEventListener("click", () => {
            document.querySelector(".popup-message").classList.add("d-none")
        })
    }
    // --------------------------------intra-transfer----------------------------------------
    let intraTransferSubmit = document.querySelector(".intra__btn");
    intraTransferSubmit.addEventListener("click", () => {
        const INTRA_ACCOUNT = document.getElementById("intra-account");
        const INTRA_TO_ACCOUNT = document.getElementById("intra-to-account");
        const INTRA_AMOUNT = document.getElementById("intra-amount_input");
        const INTRA_REFERENCE = document.getElementById("intra-reference_input");
        const INTRA_BTN_INPUT = document.getElementById("intra-btn__input")
        if (INTRA_ACCOUNT.innerText === INTRA_TO_ACCOUNT.innerText) return alert("error account number")
        else if (INTRA_ACCOUNT.innerText === "All accounts") return alert("error account number")
        else if (INTRA_TO_ACCOUNT.innerText === "All accounts") return alert("error to account number")
        else if (INTRA_AMOUNT.value === "" || typeof (+INTRA_AMOUNT.value) !== "number") return alert("error amount")
        else if (INTRA_REFERENCE.value === "") return alert("error reference")
        else if (!INTRA_BTN_INPUT.checked) return alert("error Terms of use")

        else {
            let objTransferDate = {};
            objTransferDate.from_account = INTRA_ACCOUNT.innerText
            objTransferDate.to_account = INTRA_TO_ACCOUNT.innerText
            objTransferDate.amount = INTRA_AMOUNT.value
            objTransferDate.reference = INTRA_REFERENCE.value

            let promise = new Promise((resolve, reject) => {
                let xhrd = new XMLHttpRequest();
                xhrd.open("POST", "https://server.samtsov.com:8090/api/transfeers/internals/applications", true);
                xhrd.setRequestHeader("Authorization", 'Bearer ' + `${sessionStorage.getItem("token")}`)
                xhrd.setRequestHeader("Content-Type", "application/json");
                xhrd.send(JSON.stringify(objTransferDate));
                xhrd.addEventListener("readystatechange", function () {
                    if (this.status === 200) {
                        resolve(this.responseText)
                    }
                    else {
                        var error = new Error(this.statusText);
                        if (error !== "OK") {
                            error.code = this.status;
                            reject(error);
                        }
                    }
                });
            })
            promise
                .then(
                    resul => {
                        document.querySelector(".popup-message").classList.remove("d-none")
                    },
                    error => {
                        alert("Error")
                    }
                )

        }
    })
}

const ONLINE_FORM_SUBMIT = document.querySelector(".online-form__input_submit");
if (ONLINE_FORM_SUBMIT) {
    ONLINE_FORM_SUBMIT.addEventListener("click", (e) => {
        e.preventDefault()
        const ONLINE_FORM_BLOCK = document.querySelectorAll(".online-form-block");
        const INPUT_PASSWORD = document.getElementById("input-password")
        const INPUT_CONFIRM_PASSWORD = document.getElementById("input-confirm-password")
        let objOpenAccountFormData = {};
        let getChildElem = e => { return ONLINE_FORM_BLOCK[e].children[1] };
        let setErrorOnElem = e => {
            getChildElem(e).classList.add("menu-bord_text-error");
            getChildElem(e).addEventListener("click", () => {
                getChildElem(e).classList.remove("menu-bord_text-error");
                getChildElem(e).value = "";
            })
        }
        let setErrorOnElements = e => {
            e.classList.add("menu-bord_text-error");
            e.addEventListener("click", () => {
                e.classList.remove("menu-bord_text-error");
                e.value = "";
            })
        }
        for (let i = 0; i < ONLINE_FORM_BLOCK.length - 1; i++) {
            if (getChildElem(i).value.search(getChildElem(i).getAttribute("pattern")) == -1) { setErrorOnElem(i) };
            objOpenAccountFormData[ONLINE_FORM_BLOCK[i].children[0].innerText] = getChildElem(i).value.trim();
        }
        if (INPUT_PASSWORD.value !== INPUT_CONFIRM_PASSWORD.value) {
            setErrorOnElements(INPUT_PASSWORD)
            setErrorOnElements(INPUT_CONFIRM_PASSWORD)
        }
        if (!document.querySelector(".menu-bord_text-error")) {

            let promise = new Promise((resolve, rejec) => {
                let xhrd = new XMLHttpRequest();
                xhrd.open("POST", "https://server.samtsov.com:8090/mailer/onlines/registrations", true);
                xhrd.setRequestHeader("Content-Type", "application/json");
                xhrd.send(JSON.stringify(objOpenAccountFormData));
                xhrd.addEventListener("readystatechange", function () {
                    if (this.status === 200) {
                        resolve(this.responseText)
                    }
                    else {
                        var error = new Error(this.statusText);
                        if (error !== "OK") {
                            error.code = this.status;
                            rejec(error);
                        }
                    }
                });
            })
            promise
                .then(
                    resul => {
                        document.querySelector(".popup-message").classList.remove("d-none")
                    },
                    error => {
                        alert("Error")
                    }
                )
        }
    })
}
if (document.querySelector(".form__input_submit")) {
    document.querySelector(".form__input_submit").addEventListener("click", (e) => {
        e.preventDefault()
        let formfiends = document.querySelectorAll(".form-block");
        let objForm = {};
        objForm[formfiends[0].children[0].innerText] = formfiends[0].children[1].value
        objForm[formfiends[1].children[0].innerText] = formfiends[1].children[1].value
        objForm[formfiends[2].children[0].innerText] = formfiends[2].children[1].value
        objForm[formfiends[3].children[0].innerText] = formfiends[3].children[1].value
        let promise = new Promise((resolve, rejec) => {
            let xhrd = new XMLHttpRequest();
            xhrd.open("POST", "https://server.samtsov.com:8090/mailer/contacts/forms", true);
            xhrd.setRequestHeader("Content-Type", "application/json");
            xhrd.send(JSON.stringify(objForm));
            xhrd.addEventListener("readystatechange", function () {
                if (this.status === 200) {
                    resolve(this.responseText)
                }
                else {
                    var error = new Error(this.statusText);
                    if (error !== "OK") {
                        error.code = this.status;
                        rejec(error);
                    }
                }
            });
        })
        promise
            .then(
                resul => {
                    document.querySelector(".popup-message").classList.remove("d-none")
                },
                error => {
                    alert("error")
                }
            )
    })

}