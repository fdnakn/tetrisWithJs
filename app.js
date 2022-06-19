const board = document.querySelector(".board");
const pallete = document.querySelector(".pallete");
const next = document.querySelector(".next p");
const Score = document.querySelector(".score p");

let colorArray = ["yellow", "green", "red", "blue", "purple", "pink"];
let boardbounds = board.getBoundingClientRect();
//paletimizin konumunu belirleyecek viewporta göre.

let squarevolacity; //karemizin hızı
let score;
let choosecolor;
let notstarted = false;

let drawsquare = () => {
    setInterval(() => {
        let square = document.createElement("div");
        square.classList.add("square");
        let x = Math.floor(Math.random() * board.clientWidth);
        //her olusan kareyi x axisinde rastgele yerleştirecez.
        square.style.top = "-20px";
        square.style.left = x + "px";
        square.style.right = x + 20 + "px";
        square.style.background = chooserandomcolor();
        board.append(square);
    }, 600)
}
let chooserandomcolor = () => {
    let index = Math.floor(Math.random() * colorArray.length);
    return colorArray[index];
}
let nextcolor = () => {
    let index = Math.floor(Math.random() * colorArray.length);
    next.style.background = colorArray[index];
    choosecolor = colorArray[index];
}
//oluşan kareleri hareketlendirecek fonksiyon
let squaremove = () => {
    let squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
        let pallette = pallete.getBoundingClientRect();
        //bu yeni bunda iki t var.bu sınır kontrolü yapıcak
        //düşen karenin sınıra deyip deynemediğini öğrenmek için
        let presentsquare = squares[i].getBoundingClientRect();
        let squarecolor = squares[i].style.background;
        //gelen karenin rengini ve konumunu farklı değişkenlere atadık
        squares[i].style.top = parseInt(squares[i].style.top) + 1 + squarevolacity + "px";

        if (presentsquare.bottom > pallette.top
            && presentsquare.left > pallette.left
            && pallette.right > presentsquare.right) {

            if (squarecolor === choosecolor) {
                score = score + 5;
                Score.textContent = score;
                //her yakaladıgımızda volacity'i arttıracaz oyun zorlaşsın
                board.removeChild(squares[i]);
                nextcolor();
            } else {
                initial();
                //programımızın başlama fonksiyonu
            }

        }
        if (presentsquare.bottom > boardbounds.bottom) {
            board.removeChild(squares[i]);
        }
    }
    requestAnimationFrame(squaremove);
    /* squremove sürekli çalıssın diye bunu yazmamız gerekiyor
    js de hazır bir fonksiyondur bu sürekli 1 ms de bir bu fonksiyonu çalıstıracak
    ve bu squremove içerisindeki olayı gerçekleştirecek o kadar hızlı 
    çalışıyorki  eğer biz notstarted ı yapmazsak  o zaman burdaki değerleri hemen sıfırlıyacak
    ve yine bu squremove yi çalıştırmaya çalışacak tüm değerler patlıyacak ,tasıcak vb*/
}
let initial = () => {
    let squares = document.querySelectorAll(".square");
    squares.forEach(item => {
        item.remove();
    })
    //oyunumuz başladıgında olacak olan değerler.
    squarevolacity = 1;
    score = 0;
    Score.textContent = score;
    if (!notstarted) {
        drawsquare()
        nextcolor()
        squaremove()
        notstarted = true;
    }
}

window.addEventListener("mousemove", (e) => {
    pallete.style.left = e.x + "px";
});

initial()