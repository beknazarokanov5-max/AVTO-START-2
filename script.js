const partName = document.getElementById("partName");
const carBrand = document.getElementById("carBrand");
const partPrice = document.getElementById("partPrice");
const partQty = document.getElementById("partQty");
const addBtn = document.getElementById("addBtn");

const productsList = document.getElementById("productsList");

const totalPrice = document.getElementById("totalPrice");
const totalItems = document.getElementById("totalItems");

const searchInput = document.getElementById("searchInput");

let products = JSON.parse(localStorage.getItem("products")) || [];

renderProducts();

addBtn.addEventListener("click", () => {

  const name = partName.value.trim();
  const brand = carBrand.value.trim();
  const price = Number(partPrice.value);
  const qty = Number(partQty.value);

  if (!name || !brand || price <= 0 || qty <= 0) {
    alert("Заполни все поля!");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    brand,
    price,
    qty
  };

  products.push(product);

  saveProducts();

  clearInputs();

  renderProducts();

});

function renderProducts() {

  productsList.innerHTML = "";

  const search = searchInput.value.toLowerCase();

  let total = 0;
  let items = 0;

const filteredProducts = products.filter(product => {

  const name = product.name ? product.name.toLowerCase() : "";
  const brand = product.brand ? product.brand.toLowerCase() : "";

  return (
    name.includes(search) ||
    brand.includes(search)
  );

});

  filteredProducts.forEach(product => {

    total += product.price * product.qty;
    items += product.qty;

    const div = document.createElement("div");

    div.className = "product";

    div.innerHTML = `
      <div>${product.name}</div>

      <div>${product.brand}</div>

      <div>${product.price} сом</div>

      <div class="qty-box">
        <button class="minus-btn">-</button>
        <span>${product.qty}</span>
        <button class="plus-btn">+</button>
      </div>

      <div>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    // КНОПКА УДАЛЕНИЯ
    div.querySelector(".delete-btn").addEventListener("click", () => {
      deleteProduct(product.id);
    });

    // КНОПКА +
    div.querySelector(".plus-btn").addEventListener("click", () => {
      changeQty(product.id, 1);
    });

    // КНОПКА -
    div.querySelector(".minus-btn").addEventListener("click", () => {
      changeQty(product.id, -1);
    });

    productsList.appendChild(div);

  });

  totalPrice.textContent = total + " сом";
  totalItems.textContent = items;

}

function deleteProduct(id) {

  products = products.filter(product => product.id !== id);

  saveProducts();

  renderProducts();

}

function changeQty(id, value) {

  const product = products.find(product => product.id === id);

  if (!product) return;

  product.qty += value;

  if (product.qty <= 0) {
    products = products.filter(p => p.id !== id);
  }

  saveProducts();

  renderProducts();

}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function clearInputs() {

  partName.value = "";
  carBrand.value = "";
  partPrice.value = "";
  partQty.value = "";

}

searchInput.addEventListener("input", renderProducts);