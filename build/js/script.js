
let sliderParent = document.querySelector(".slider");
let sliderControls = document.querySelector(".slider-controls");

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