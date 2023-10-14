let bookstore = '<bookstore> \
	<book category="cooking"> \
		<title lang="en">Everyday Italian</title> \
		<author>Giada De Laurentiis</author> \
		<year>2005</year> \
		<price>30.00</price> \
	</book> \
	<book category="children"> \
		<title lang="en">Harry Potter</title> \
		<author>J K. Rowling</author> \
		<year>2005</year> \
		<price>29.99</price> \
	</book> \
	<book category="web"> \
		<title lang="en">XQuery Kick Start</title> \
		<author>James McGovern</author> \
		<author>Per Bothner</author> \
		<author>Kurt Cagle</author> \
		<author>James Linn</author> \
		<author>Vaidyanathan Nagarajan</author> \
		<year>2003</year> \
		<price>49.99</price> \
	</book> \
	<book category="web" cover="paperback"> \
		<title lang="en">Learning XML</title> \
		<author>Erik T. Ray</author> \
		<year>2003</year> \
		<price>39.95</price> \
	</book> \
</bookstore>';

function crea(){
    localStorage.setItem("bookstore", bookstore); //carico il bookstore sul localstorage
}

function visualizza(){
    let xml=localStorage.getItem("bookstore");
    //alert(xml);
    let parser=new DOMParser(); //per trasformare stringa in oggetto xml-->parsificazione
    let xmlDoc=parser.parseFromString(xml,"text/xml"); //passi la variabile xml e il tipo di documento(in questo caso xml)
    let root = xmlDoc.documentElement; //prendi l'elemento radice xmlDoc(bookstore)
    //console.log(root.nodeName); //nodeName-->ti legge il nome del nodo(bookstore)
    let tBody=document.getElementById("tabLibri");
    for(let i=0;i<root.children.length;i++)
    { //children.lenght ti da il numero di figli del nodo bookstore(4)
        let book = root.children[i];
        let categoria="",cover="", lingua="";
        let titolo="",autori="",year="",price="";
        if(book.hasAttribute("category")) //se il book ha l'attributo category
            categoria=book.getAttribute("category"); //in categoria metti l'attributo category e lo legge
        if(book.hasAttribute("cover"))
            cover=book.getAttribute("cover");
        for(let j=0;j<book.children.length;j++)
        {
            let nodeName=book.children[j].nodeName; //ti prende il nome del nodo
            switch(nodeName)
            {
                case "title":
                    titolo=book.children[j].textContent;
                    if(book.children[j].hasAttribute("lang"))
                        lingua=book.children[j].getAttribute("lang");
                    break;
                case "author":
                    if(autori!="")
                        autori+=" - ";
                    autori+=book.children[j].textContent;
                    break;
                case "year":
                    year=book.children[j].textContent;
                    break;
                case "price":
                    price=book.children[j].textContent;
                    break;
            }
        }
        let tr=document.createElement("tr");
        tBody.append(tr);

        let td=document.createElement("td");
        td.innerText=titolo;
        tr.append(td);

        td=document.createElement("td");
        td.innerText=categoria
        tr.append(td);

        td=document.createElement("td");
        td.innerText=cover
        tr.append(td);

        td=document.createElement("td");
        td.innerText=lingua;
        tr.append(td);

        td=document.createElement("td");
        td.innerText=autori
        tr.append(td);

        td=document.createElement("td");
        td.innerText=year
        tr.append(td);

        td=document.createElement("td");
        td.innerText=price
        tr.append(td);
    }
}