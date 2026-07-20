const topbar = document.querySelector("nav.topbar");
const menu = document.querySelector(".navegacao");
const menuToggle = document.querySelector(".menu-toggle");

window.addEventListener("scroll", () => {
    if (!topbar) return;

    if (window.scrollY > 150) {
        topbar.classList.add("show");
    } else {
        topbar.classList.remove("show");
    }
});

if (topbar && window.innerWidth <= 900) {
    topbar.classList.add("show");
}

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        const opened = menu.classList.toggle("open");
        menuToggle.classList.toggle("open", opened);
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            menuToggle.classList.remove("open");
        });
    });
}

const detailButtons = document.querySelectorAll(".card-button");

function closeExpandedCard(card) {
    if (!card) return;
    card.classList.remove("expanded");
    const openButton = card.querySelector(".card-button");
    if (openButton) openButton.textContent = "Ver detalhes";
    const closeButton = card.querySelector(".card-close");
    if (closeButton) closeButton.remove();
    document.body.classList.remove("card-expanded");
}

function addCloseButton(card) {
    if (card.querySelector(".card-close")) return;
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "card-close";
    closeButton.innerHTML = "×";
    closeButton.addEventListener("click", () => closeExpandedCard(card));
    card.appendChild(closeButton);
}

detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".card-content");
        const wasExpanded = card.classList.contains("expanded");

        document.querySelectorAll(".card-content.expanded").forEach((openCard) => {
            if (openCard !== card) {
                closeExpandedCard(openCard);
            }
        });

        const expanded = !wasExpanded;
        if (expanded) {
            card.classList.add("expanded");
            addCloseButton(card);
        } else {
            closeExpandedCard(card);
        }
        document.body.classList.toggle("card-expanded", expanded);
        button.textContent = expanded ? "Ocultar detalhes" : "Ver detalhes";
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const openCard = document.querySelector(".card-content.expanded");
        if (openCard) closeExpandedCard(openCard);
    }
});