const toggle = document.querySelectorAll(".comment-tog");
toggle.forEach((tog, tog1) =>
    tog.addEventListener("click", function () {
        const cont = tog.nextElementSibling;
        const cont2 = tog.firstElementChild;

        cont.classList.toggle("show");

        const value1 = cont.classList.value;

        if ((value1 == 'comment') == false) {
            // 열린 상태(comment show)
            tog.style.backgroundColor = "#4174b9";
            cont2.setAttribute("style", " padding: 0;width:100%; height: 100%; color:white;");

            // ====== ⬇ 중첩 if문으로 추가된 기능 (다른 comment 닫기) ⬇ ======
            if (true) {
                document.querySelectorAll(".comment").forEach(c => {
                    if (c !== cont) {
                        c.classList.remove("show");

                        const otherTog = c.previousElementSibling;
                        if (otherTog) {
                            otherTog.style.backgroundColor = "white";
                            if (otherTog.firstElementChild) {
                                otherTog.firstElementChild.setAttribute(
                                    "style",
                                    "padding: 0; width:100%; height: 100%; color:black;"
                                );
                            }
                        }
                    }
                });
            }
            // ====== ⬆ 여기까지 중첩 if문으로 넣은 부분 ⬆ ======
        } else {
            // 닫힌 상태(comment)
            tog.style.backgroundColor = "white";
            cont2.setAttribute("style", " padding: 0;width:100%; height: 100%; color:black;");
        }
    })
);
