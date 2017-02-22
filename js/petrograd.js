window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    // load produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

//    visProduktInfo();
}

function visProduktListe( listen ) {
    console.table( listen );
    listen.forEach( visProduktInfo );
}


function visProduktInfo( produkt ) {
    console.log( produkt );

    // klon template produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // Indsæt data i klon
    klon.querySelector(".data_navn").textContent = produkt.navn;
    klon.querySelector(".data_pris").textContent = produkt.pris;
    // Beregn rabatpris
    klon.querySelector(".data_rabatpris").textContent = produkt.pris - Math.ceil( (produkt.pris*produkt.rabatsats/100));
    // find billede
    klon.querySelector(".data_billede").src = "/imgs/small/"+produkt.billede+"-sm.jpg";

    // fjern udsolgt hvis produktet ikke er udsolgt
    if( !produkt.udsolgt ) {
        // fjern .udsolgttekst
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    } else {
        // tilføj .udsolgt til .pris
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    // fjern rabatpris hvis der ikke er rabat på produktet
    if( produkt.udsolgt || produkt.rabatsats == 0 ) {
        // der er ikke rabat - fjern rabatpris
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        // der er rabat - tilføj rabat til pris
        klon.querySelector(".pris").classList.add("rabat");
    }

    // append klon til produktliste
    document.querySelector(".produktliste").appendChild( klon );
}
