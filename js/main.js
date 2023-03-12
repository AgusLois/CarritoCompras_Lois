class Product {
  constructor(name, price, img, quantity) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.quantity = quantity;
  }
}

let listProduct = [];
let listCart = [];
const url = "../json/products.json";

function preChargeProducts() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      listProduct = json;
      renderProducts(listProduct);
      console.log(listProduct);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderProducts(products) {
  generalDiv.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "col-xl-3 col-md-4 col-6";
    const divCard = document.createElement("div");
    divCard.className = "card";
    const imgCard = document.createElement("img");
    imgCard.className = "imgCard";
    imgCard.src = product.img;

    const nameProduct = document.createElement("h4");
    nameProduct.innerHTML = product.name;
    const priceProduct = document.createElement("h2");
    priceProduct.innerHTML = "$" + product.price;

    divCard.append(imgCard);
    divCard.append(nameProduct);
    divCard.append(priceProduct);
    div.append(divCard);
    generalDiv.append(div);
    var siderbarOpen = document.getElementById("openSideBar");
    siderbarOpen.addEventListener("click", () => {
      openNav();
    });

    var sidebarClose = document.getElementById("closeSideBar");
    sidebarClose.addEventListener("click", () => {
      closeNav();
    });

    divCard.addEventListener("click", () => {
      product.quantity++;
      let localProducts = localStorage.getItem("products");
      let productsJSON = JSON.parse(localProducts);
      listCart = [];
      if (localProducts !== null) {
        for (const productJSON of productsJSON) {
          listCart.push(
            new Product(
              productJSON.name,
              productJSON.price,
              productJSON.img,
              productJSON.quantity
            )
          );
        }
        if (
          listCart.some((productToAdd) => productToAdd.name === product.name)
        ) {
          listCart.map((p) => {
            if (p.name === product.name) {
              p.quantity++;
            }
          });
        } else {
          listCart.push(product);
        }

        localStorage.setItem("products", JSON.stringify(listCart));
        Toastify({
          text: "Agregaste un producto al carrito",
          duration: 4000,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      } else {
        let productsJSON = [];
        productsJSON.push(product);
        localStorage.setItem("products", JSON.stringify(productsJSON));
      }
      preChargeListCart();
      renderProductsCart();
    });
  });
}

preChargeProducts();

const inputFind = document.getElementById("searchClothes");
inputFind.addEventListener("input", () => {
  const clothesToSearch = inputFind.value;
  const clothesFilter = listProduct.filter((product) => {
    return product.name.toLowerCase().includes(clothesToSearch.toLowerCase());
  });
  renderProducts(clothesFilter);
});

function openNav() {
  document.getElementById("mySidebar").style.width = "450px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
