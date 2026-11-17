"use strict";

// 1. マウスに追従する光（縦書きタイトル用）
const title = document.querySelector("h1");

if (title) {
    title.addEventListener("pointermove", (event) => {
        const rect = title.getBoundingClientRect();
        // 縦書きの場合、上から下への動き(Y)と右から左への動き(X)をCSS変数に渡す
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        title.style.setProperty("--mouse-x", `${x}%`);
        title.style.setProperty("--mouse-y", `${y}%`);
    });
}

// 2. スクロール時のアニメーション（横方向・縦書き表示に対応）
const items = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js-enabled");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 縦書きで右から左へ読む際、画面の少し手前からフワッと表示させる
        rootMargin: "0px 0px 0px -5%",
        threshold: 0.1
    });

    items.forEach((item) => observer.observe(item));
}

// 3. マウスホイール（縦スクロール）を横スクロールに変換（縦書きサイト必須の快適化）
window.addEventListener("wheel", (event) => {
    // 縦方向のスクロール量があるとき、横方向（右から左）へスムーズに流す
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        // vertical-rl（右から左）では下に回すとマイナス方向（左）へ進む
        window.scrollBy({
            left: -event.deltaY,
            behavior: "auto"
        });
    }
}, { passive: false });

// 4. ダークモード切り替え（縦書きデザインに合う和風表現に変更）
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");

        // 縦書きボタン内でも縦にスッキリ収まる表記に変更
        themeToggle.textContent = isDark
            ? "昼モード"
            : "夜モード";

        themeToggle.setAttribute("aria-pressed", String(isDark));
    });
}
