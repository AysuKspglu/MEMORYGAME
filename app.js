const cardArray = [
    {
        name: 'fries',
        img: "images/fries.jpg"
    },
    {
        name: 'hamburger',
        img: 'images/hamburger.jpg'

    },
    {
        name: "cheesecake",
        img: "images/cheesecake.jpg"
    },
    {
        name: "lipstick",
        img: "images/lipstick.jpg"
    },
    {
        name: "pizza",
        img: "images/pizza.jpg"
    },
    {
        name: "shoes",
        img: "images/shoes.jpg"
    },
    {
        name: "fries",
        img: "images/fries.jpg"
    },
    {
        name: "hamburger",
        img: "images/hamburger.jpg"
    },
    {
        name: "cheesecake",
        img: "images/cheesecake.jpg"
    },
    {
        name: "lipstick",
        img: "images/lipstick.jpg"
    },
    {
        name: "pizza",
        img: "images/pizza.jpg"
    },
    {
        name: "shoes",
        img: "images/shoes.jpg"

    },
]

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const scoreEl = document.querySelector("#score"); // <span id="score">0</span>
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let lock = false; // iki kart açıkken tıklama alma

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img");
        const src = "images/blank.jpg";         // kartın kapalı hali
        card.setAttribute("src", src);
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        gridDisplay.appendChild(card);
    }
}
createBoard();

function flipCard() {
    if (lock) return;

    const cardId = this.getAttribute("data-id");   // "0","1" gibi string gelir
    if (cardsChosenId.includes(cardId)) return;    // aynı karta iki kez izin verme

    this.setAttribute("src", cardArray[cardId].img); // ön yüzü göster
    cardsChosen.push(cardArray[cardId].name);        // isim eşleşmesi için
    cardsChosenId.push(cardId);

    if (cardsChosen.length === 2) {
        lock = true;
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll("#grid img");
    const [id1, id2] = cardsChosenId.map(Number);

    // Aynı karta iki kez tıklandıysa geri kapat
    if (id1 === id2) {
        cards[id1].setAttribute("src", "images/blank.jpg");
        return resetTurn();
    }

    // === ESLESME KONTROLÜ: isimler eşit mi? ===
    if (cardsChosen[0] === cardsChosen[1]) {
        // beyaza çek + tıklamayı kapat
        // white.jpg yoksa CSS ile .matched yapabilirsin
        cards[id1].setAttribute("src", "images/white.jpg");
        cards[id2].setAttribute("src", "images/white.jpg");
        cards[id1].removeEventListener("click", flipCard);
        cards[id2].removeEventListener("click", flipCard);

        // !! skor için mutlaka push et
        cardsWon.push([id1, id2]);
        scoreEl.textContent = String(cardsWon.length);
    } else {
        // eşleşmediyse geri kapa
        cards[id1].setAttribute("src", "images/blank.jpg");
        cards[id2].setAttribute("src", "images/blank.jpg");
    }

    // oyun bitti mi?
    if (cardsWon.length === cardArray.length / 2) {
        scoreEl.textContent = "Tebrikler! Tüm kartları buldunuz!";
    }

    resetTurn();
}

function resetTurn() {
    cardsChosen = [];
    cardsChosenId = [];
    lock = false;
}
