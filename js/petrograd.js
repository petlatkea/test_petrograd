window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    visProduktInfo();
}

function visProduktInfo() {
    // klon template produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // Indsæt data i klon
    // TODO: Indsæt data ...

    // append klon til produktliste
    document.querySelector(".produktliste").appendChild( klon );
}
