let sliderParent=document.querySelector(".slider"),sliderControls=document.querySelector(".slider-controls");if(sliderParent){function sliderCart(e,t){for(let t=0;t<e.children.length;t++)e.children[t].style.display="none";e.children[t].style.display="block"}function runSlider(){let e=document.querySelectorAll(".slider-control__item");for(let t=0;t<e.length;t++)e[t].classList.contains("slider-control__item_active")&&(e[t].classList.remove("slider-control__item_active"),t!=e.length-1?(e[`${t+=1}`].classList.add("slider-control__item_active"),sliderCart(sliderParent,t)):(t=0,e[t].classList.add("slider-control__item_active"),sliderCart(sliderParent,t)))}sliderControls&&sliderControls.addEventListener("click",(function(e){if(e.target.classList.contains("slider-control__item")){let t=e.target;document.querySelector(".slider-control__item_active").classList.remove("slider-control__item_active"),t.classList.add("slider-control__item_active");for(let e=0;e<sliderControls.children.length;e++)sliderControls.children[e].classList.contains("slider-control__item_active")&&sliderCart(sliderParent,e)}})),setInterval(runSlider,5e3)}const CURRENCY=document.getElementsByClassName("currency");if(CURRENCY){let e=new XMLHttpRequest;e.open("GET","https://api.exchangeratesapi.io/latest?base=EUR",!0),e.send(),e.addEventListener("readystatechange",(function(){if(this.readyState===this.DONE)for(let e=0;e<CURRENCY.length;e++)CURRENCY[e].children[1].innerText=JSON.parse(this.responseText).rates[CURRENCY[e].children[0].innerText]}))}const CRYPTO_CURRENCY=document.getElementsByClassName("crypto-currency");if(CRYPTO_CURRENCY){let e=new XMLHttpRequest;e.open("GET","https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=BTC,ETH,BCH,USDT,LTC&apiKey=bb98291570d521612ebd320b47a541e57dd03581bc116ddeb19abb62e7a306a6",!0),e.send(),e.addEventListener("readystatechange",(function(){if(this.readyState===this.DONE)for(let e=0;e<CRYPTO_CURRENCY.length;e++)CRYPTO_CURRENCY[e].children[1].innerText=JSON.parse(this.responseText)[CRYPTO_CURRENCY[e].children[0].innerText]}))}const NEWS_SECTION=document.querySelector(".news-section");if(NEWS_SECTION){let e=new XMLHttpRequest;e.open("GET","https://newsapi.org/v2/top-headlines?category = business&sources=bloomberg&apiKey=d5ab78edfa2649a6b0fd66a7cf1c2c68",!0),e.send(),e.addEventListener("readystatechange",(function(){for(let e=0;e<NEWS_SECTION.children.length;e++)NEWS_SECTION.children[e].setAttribute("href",JSON.parse(this.responseText).articles[e].url),NEWS_SECTION.children[e].innerText=JSON.parse(this.responseText).articles[e].title}))}if(document.querySelector(".login-block")){const e=document.querySelector(".login-block"),t=document.querySelector(".login__btn-close"),n=document.getElementById("btn-login-pop-up"),r=document.getElementById("login__btn"),a=document.getElementById("pin__btn"),s=document.querySelector(".authorization"),c=document.querySelector(".login-pin"),o=document.querySelector(".login-error");function toggleDisplay(e){e.classList.toggle("d-none")}t.addEventListener("click",()=>{toggleDisplay(e),s.classList.contains("d-none")&&toggleDisplay(s),o.classList.contains("d-none")||toggleDisplay(o),c.classList.contains("d-none")||toggleDisplay(c)}),n.addEventListener("click",()=>{toggleDisplay(e)}),r.addEventListener("click",()=>{let e={username:document.querySelector(".authorization__login").value.trim(),password:document.querySelector(".authorization__password").value.trim()},t=JSON.stringify(e);new Promise((e,n)=>{let r=new XMLHttpRequest;r.open("POST","https://server.samtsov.com:8090/api/login_check",!0),r.send(t),r.addEventListener("readystatechange",(function(){if(200===this.status)sessionStorage.setItem("token",JSON.parse(this.responseText).token),e(this.responseText);else{var t=new Error(this.statusText);"OK"!==t&&(t.code=this.status,n(t))}}))}).then(e=>{let t=new XMLHttpRequest;t.open("POST","https://server.samtsov.com:8090/user/sends/users/pins",!0),t.setRequestHeader("Authorization",`${sessionStorage.getItem("token")}`),t.send(),t.addEventListener("readystatechange",(function(){this.readyState===this.DONE&&(toggleDisplay(s),toggleDisplay(c))}))},e=>{toggleDisplay(s),toggleDisplay(o)})}),a.addEventListener("click",()=>{new Promise((e,t)=>{let n=new XMLHttpRequest;n.open("POST","https://server.samtsov.com:8090/user/verifications",!0),n.setRequestHeader("Authorization","Bearer "+`${sessionStorage.getItem("token")}`),n.setRequestHeader("Content-Type","application/json");let r={pin:`${document.querySelector(".authorization__pin").value}`};n.send(JSON.stringify(r)),n.addEventListener("readystatechange",(function(){if(200===this.status)sessionStorage.setItem("base",this.responseText),e(this.responseText);else{var n=new Error(this.statusText);"OK"!==n&&(n.code=this.status,t(n))}}))}).then(e=>{window.location=`${window.origin}/account.html`},e=>{toggleDisplay(c),toggleDisplay(o)})})}if(document.querySelector(".menu-tab")){let e=document.querySelector(".menu-tab"),t=document.querySelectorAll(".menu-tab-block"),n=document.querySelector(".menu-tab");e&&e.addEventListener("click",e=>{let r=document.getElementsByClassName("menu-tab__item");document.querySelector(".tab_active").classList.remove("tab_active"),document.querySelector(".menu-tab__item_active").classList.remove("menu-tab__item_active");for(let a=0;a<r.length;a++)r[a]===e.target&&(n.children[a].classList.add("menu-tab__item_active"),t[a].classList.add("tab_active"))});let r=document.getElementById("transfer-btn__input"),a=document.querySelector(".transfer__btn");function toggleDisabled(e,t){e?t.removeAttribute("disabled"):t.setAttribute("disabled","true")}r.addEventListener("click",()=>{toggleDisabled(r.checked,a)});let s=JSON.parse(sessionStorage.getItem("base"))||"";function getElementAndSetText(e,t){return document.getElementById(e).innerText=t}for(key in getElementAndSetText("client-name",`${s.client_first_name}${s.client_id}`),getElementAndSetText("client-email",`${s.email}`),s)"object"!=typeof s[key]&&getElementAndSetText(key,s[key]);let c=document.getElementById("account-invoice");function createAccountRow(){let e=document.createElement("div");return e.classList.add("account-table-row"),e.classList.add("row__text_style"),c.appendChild(e),e}function createDataAccount(e,t,n){let r=document.createElement("span");r.classList.add(e),r.innerHTML=t,n.appendChild(r)}let o=s.accounts,i=[];for(key in o){let e=createAccountRow();i.push(o[key].account_special_number),createDataAccount("account-details__column_w218",o[key].account_special_number,e),createDataAccount("account-details__column_w208",o[key].account_type_name,e),createDataAccount("account-details__column_w108",o[key].currency_abbreviation,e),createDataAccount("account-details__column_w115",o[key].status?"Active":"Deactive",e),createDataAccount("account-details__column_w126",o[key].balance,e),createDataAccount("account-details__column_w126",o[key].min_balance,e)}const l=document.getElementById("transaction-date-wrap"),d=document.getElementById("international-date-wrap"),u=document.getElementById("intra-date-wrap"),m=document.getElementById("intra-date-wrap-to");function createLi(e,t,n){let r=document.createElement("li");r.classList.add(e),r.classList.add("d-none"),r.innerText=t,n.appendChild(r)}for(key of i)createLi("transaction-date-wrap__item",key,l);for(key of i)createLi("transaction-date-wrap__item",key,d);for(key of i)createLi("transaction-date-wrap__item",key,u);for(key of i)createLi("transaction-date-wrap__item",key,m);document.getElementById("transactions").addEventListener("click",()=>{new Promise((e,t)=>{let n=new XMLHttpRequest;n.open("POST","https://server.samtsov.com:8090/api/transfeers/gets/users/accounts/details",!0),n.setRequestHeader("Authorization","Bearer "+`${sessionStorage.getItem("token")}`),n.setRequestHeader("Content-Type","application/json"),n.send(),n.addEventListener("readystatechange",(function(){200===this.status&&this.responseText&&e(this.responseText)}))}).then(e=>{s.statictic=JSON.parse(e),clearStatisticRow(),renderStatistic("All accounts")},e=>{alert("Error")})});const p=document.getElementById("transactions-table");function createStatisticRow(){let e=document.createElement("div");return e.classList.add("statistic-table-row"),e.classList.add("row__text_style"),p.appendChild(e),e}function correctData(e){return arrData=e.split("T"),arrData[0]}function statisticAmount(e){return e.debit?`-${e.debit}`:`+${e.credit}`}function benificiary(e){return"International Transfer"===e.transfer_type_name?'<a href="#" class="link-benificiary">'+`${e.iban_code}`+"</a>":"Intra Transfer"===e.transfer_type_name?e.intra_to_account_number:"Incoming Transfer"===e.transfer_type_name?e.account_special_number:"EuroDeniz IBU"}function correctSender(e){return"Incoming Transfer"===e.transfer_type_name?"EuroDeniz IBU":e.account_special_number}function clearStatisticRow(){const e=document.getElementsByClassName("statistic-table-row");for(let t=0;t<e.length;)e[0].remove()}function renderStatistic(e){if("All accounts"===e)for(key of s.statictic)for(key2 of key.transaction){let e=createStatisticRow();createDataAccount("account-table-row-column_w89",correctData(key2.date),e),createDataAccount("account-table-row-column_171",key2.transfer_type_name,e),createDataAccount("account-table-row-column_140",correctSender(key2),e),createDataAccount("account-table-row-column_w143",benificiary(key2),e),createDataAccount("account-table-row-column_w141",key2.transfer_number,e),createDataAccount("account-table-row-column_w98",statisticAmount(key2),e),createDataAccount("account-table-row-column_w96",key2.status_name,e),createDataAccount("account-table-row-column_w76",`${key2.balance} ${key.currency}`,e)}else for(key of s.statictic)if(key.account_number===e)for(key2 of key.transaction){let e=createStatisticRow();createDataAccount("account-table-row-column_w89",correctData(key2.date),e),createDataAccount("account-table-row-column_171",key2.transfer_type_name,e),createDataAccount("account-table-row-column_140",correctSender(key2),e),createDataAccount("account-table-row-column_w143",benificiary(key2),e),createDataAccount("account-table-row-column_w141",key2.transfer_number,e),createDataAccount("account-table-row-column_w98",statisticAmount(key2),e),createDataAccount("account-table-row-column_w96",key2.status_name,e),createDataAccount("account-table-row-column_w76",`${key2.balance} ${key.currency}`,e)}console.log(s.statictic);let t=document.getElementsByClassName("link-benificiary");for(let e=0;e<t.length;e++)t[e].addEventListener("click",e=>{e.stopImmediatePropagation();let t=returnBenificiaryInfo(e.target.innerText),n={Beneficiary:`${t.iban_code}`||" ","To Account Number":`${t.account_special_number}`||" ","Bank Name":`${t.bank_name}`||" ","Bank Address":`${t.bank_address}`||" ","Beneficiary Address":`${t.beneficiary_address}`||" ","Beneficiary City":`${t.beneficiary_city}`||" ","Beneficiary Country":`${t.beneficiary_country}`||" ","Beneficiary Name":t.beneficiary_name||" ","Beneficiary Reference":`${t.reference}`||" ",Amount:`${r=t.debit,a=t.credit,s=t.currency_abbreviation,r?`-${r} ${s}`:`+${a} ${s}`}`||" ","Transaction Number":`${t.transfer_number}`||" ",Status:`${t.status_name}`||" "};var r,a,s;sessionStorage.setItem("beneficiary",JSON.stringify(n)),window.open("about:blank","New Blank","width=600,height=700").document.write("<script src='js/newWin.js' ><\/script>")});sortRowStatistic("statistic-table-row")}function returnBenificiaryInfo(e){for(key of s.statictic)for(key2 of key.transaction)if(key2.iban_code===e)return key2}function sortRowStatistic(e){let t=document.getElementsByClassName(e);for(let e=0;e<t.length;e++)for(let e=0;e<t.length-1;e++)+t[e].children[0].innerText.replace(/-/g,"")<=+t[`${e+1}`].children[0].innerText.replace(/-/g,"")&&t[`${e+1}`].after(t[e])}const y=document.getElementById("statistic-wrap-img"),_=document.getElementById("international-wrap-img"),f=document.getElementById("intra-wrap-img"),g=document.getElementById("intra-wrap-img-to");function wrapSelect(e){let t=e.parentNode;for(let n=1;n<t.offsetParent.children.length;n++)e.classList.add("img_rotate"),e.parentNode.parentNode.children[n].classList.remove("d-none"),e.parentNode.parentNode.children[n].addEventListener("click",n=>{n.stopImmediatePropagation();let r=e.previousElementSibling.innerText;e.previousElementSibling.innerText=n.target.innerText,n.target.innerText=r,clearStatisticRow(),renderStatistic(e.previousElementSibling.innerText),sortRowStatistic("statistic-table-row");for(let n=1;n<t.offsetParent.children.length;n++)e.parentNode.parentNode.children[n].classList.add("d-none");e.classList.remove("img_rotate")})}y.addEventListener("click",()=>{wrapSelect(y)}),_.addEventListener("click",()=>{wrapSelect(_)}),f.addEventListener("click",()=>{wrapSelect(f)}),g.addEventListener("click",()=>{wrapSelect(g)}),document.querySelector(".transaction-date__submit").addEventListener("click",()=>{let e=document.getElementById("from-date"),t=document.getElementById("to-date");e.addEventListener("click",()=>{e.classList.contains("error")&&e.classList.remove("error"),e.value=""}),t.addEventListener("click",()=>{t.classList.contains("error")&&t.classList.remove("error"),t.value=""});const n=/\d{4}\-\d{2}\-\d{2}/g;if(e.value.match(n)?t.value.match(n)?+e.value.replace(/-/g,"")>=+t.value.replace(/-/g,"")&&(e.classList.add("error"),t.classList.add("error")):t.classList.add("error"):e.classList.add("error"),!e.classList.contains("error")||!t.classList.contains("error")){clearStatisticRow(),renderStatistic(document.querySelector(".transaction-date-wrap__item").innerText);let n=document.getElementsByClassName("statistic-table-row");for(let r=0;r<n.length;r++)+e.value.replace(/-/g,"")<=+n[r].children[0].innerText.replace(/-/g,"")&&+n[r].children[0].innerText.replace(/-/g,"")<=+t.value.replace(/-/g,"")||(n[r].remove(),r--)}});const h=document.querySelector(".transfer__btn");let v={};h.addEventListener("click",e=>{e.preventDefault();const t=document.getElementsByClassName("transfer-input-block"),n=document.getElementsByClassName("transfer-pay-charges__input"),r=document.getElementById("transfer-account-number"),a=document.getElementById("transfer-btn__input");v.from_account=r.innerText;for(let e=0;e<t.length;e++)v[t[e].children[0].innerText]=t[e].children[1].value,""===t[e].children[1].value&&(t[e].classList.add("error"),t[e].addEventListener("click",n=>{n.preventDefault(),t[e].classList.remove("error")}));for(let e=1;e<n.length;e++)n[e].checked&&(v.PayCharges=n[e].value);if("All accounts"===r.innerText)return alert("error Account number");if(!a.checked)return alert("error Terms of use");if(document.querySelector(".error"))return alert("error fields");new Promise((e,t)=>{let n=new XMLHttpRequest;n.open("POST","https://server.samtsov.com:8090/api/transfeers/payments/requests/applications",!0),n.setRequestHeader("Authorization","Bearer "+`${sessionStorage.getItem("token")}`),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(v)),n.addEventListener("readystatechange",(function(){if(200===this.status)e(this.responseText);else{var n=new Error(this.statusText);"OK"!==n&&(n.code=this.status,t(n))}}))}).then(e=>{document.querySelector(".popup-message").classList.remove("d-none");for(let e=0;e<t.length;e++)t[e].children[1].value=""},e=>{alert("Error")})}),document.querySelector(".popup-message__close")&&document.querySelector(".popup-message__close").addEventListener("click",()=>{document.querySelector(".popup-message").classList.add("d-none")}),document.querySelector(".intra__btn").addEventListener("click",()=>{const e=document.getElementById("intra-account"),t=document.getElementById("intra-to-account"),n=document.getElementById("intra-amount_input"),r=document.getElementById("intra-reference_input"),a=document.getElementById("intra-btn__input");if(e.innerText===t.innerText)return alert("error account number");if("All accounts"===e.innerText)return alert("error account number");if("All accounts"===t.innerText)return alert("error to account number");if(""===n.value||"number"!=typeof+n.value)return alert("error amount");if(""===r.value)return alert("error reference");if(!a.checked)return alert("error Terms of use");{let a={};a.from_account=e.innerText,a.to_account=t.innerText,a.amount=n.value,a.reference=r.value,new Promise((e,t)=>{let n=new XMLHttpRequest;n.open("POST","https://server.samtsov.com:8090/api/transfeers/internals/applications",!0),n.setRequestHeader("Authorization","Bearer "+`${sessionStorage.getItem("token")}`),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(a)),n.addEventListener("readystatechange",(function(){if(200===this.status)e(this.responseText);else{var n=new Error(this.statusText);"OK"!==n&&(n.code=this.status,t(n))}}))}).then(e=>{document.querySelector(".popup-message").classList.remove("d-none")},e=>{alert("Error")})}})}const ONLINE_FORM_SUBMIT=document.querySelector(".online-form__input_submit");ONLINE_FORM_SUBMIT&&ONLINE_FORM_SUBMIT.addEventListener("click",e=>{e.preventDefault();const t=document.querySelectorAll(".online-form-block"),n=document.getElementById("input-password"),r=document.getElementById("input-confirm-password");let a={},s=e=>t[e].children[1],c=e=>{s(e).classList.add("menu-bord_text-error"),s(e).addEventListener("click",()=>{s(e).classList.remove("menu-bord_text-error"),s(e).value=""})},o=e=>{e.classList.add("menu-bord_text-error"),e.addEventListener("click",()=>{e.classList.remove("menu-bord_text-error"),e.value=""})};for(let e=0;e<t.length-1;e++)-1==s(e).value.search(s(e).getAttribute("pattern"))&&c(e),a[t[e].children[0].innerText]=s(e).value.trim();if(n.value!==r.value&&(o(n),o(r)),!document.querySelector(".menu-bord_text-error")){new Promise((e,t)=>{let n=new XMLHttpRequest;n.open("POST","https://server.samtsov.com:8090/mailer/onlines/registrations",!0),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(a)),n.addEventListener("readystatechange",(function(){if(200===this.status)e(this.responseText);else{var n=new Error(this.statusText);"OK"!==n&&(n.code=this.status,t(n))}}))}).then(e=>{document.querySelector(".popup-message").classList.remove("d-none")},e=>{alert("Error")})}}),document.querySelector(".form__input_submit")&&document.querySelector(".form__input_submit").addEventListener("click",e=>{e.preventDefault();let t=document.querySelectorAll(".form-block"),n={};n[t[0].children[0].innerText]=t[0].children[1].value,n[t[1].children[0].innerText]=t[1].children[1].value,n[t[2].children[0].innerText]=t[2].children[1].value,n[t[3].children[0].innerText]=t[3].children[1].value,new Promise((e,t)=>{let r=new XMLHttpRequest;r.open("POST","https://server.samtsov.com:8090/mailer/contacts/forms",!0),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(n)),r.addEventListener("readystatechange",(function(){if(200===this.status)e(this.responseText);else{var n=new Error(this.statusText);"OK"!==n&&(n.code=this.status,t(n))}}))}).then(e=>{document.querySelector(".popup-message").classList.remove("d-none")},e=>{alert("error")})});