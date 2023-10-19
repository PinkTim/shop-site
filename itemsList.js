
function updateCartIcon (count) {
    const cartIcon = document.getElementById('cart-icon')
    cartIcon.textContent = count;
}

let cart = []

function updateTotal() {
    const totalPrice = document.getElementById('total-price');
    totalPrice.textContent = cart.reduce((acc, { price, count }) => acc + price * count, 0);
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.style = 'display: flex; justify-content: space-between; align-items: flex-start;'
        li.innerHTML = `
            <div class="flex">
                <div class="border-gray-200 border-2 rounded-sm w-20 h-20">
                <img src="${item.image}" class="object-cover max-w-full max-h-full h-60" />
                </div>
                    <div class="space-y-2 pl-4">
                        <div>${item.name}</div>
                        <div class="font-bold">$${item.price}</div>
                        <div class="flex font-bold space-x-2">
                        <button class="decrement">-</button>
                        <button class="item-num">${cart[index].count}</button>
                        <button class="increment">+</button>
                        </div>
                    </div>
                </div>

            <button class=" delete self-start"><img src="assets/images/Vector.png"></button>
        `
        cartItemsElement.appendChild(li);
        const deleteButton = li.querySelector('.delete');
        const decrementButton = li.querySelector('.decrement');
        const incrementButton = li.querySelector('.increment');
        const itemNumElement = li.querySelector('.item-num');

        deleteButton.addEventListener('click', () => {
            li.remove();
            cart = cart.filter(({ name }) => name !== item.name);
            updateTotal();
            updateCartIcon(cart.length || undefined)
        });

        decrementButton.addEventListener('click', () => {
            cart[index].count = Math.max(1, cart[index].count - 1);;
            itemNumElement.textContent = cart[index].count;
            updateTotal();
        });

        incrementButton.addEventListener('click', () => {
            cart[index].count += 1;
            itemNumElement.textContent = cart[index].count;
            updateTotal();
        });
    });
}

function addItem(item) {
    const currProductIdx = cart.findIndex(({ id }) => id === item.id);
    if (currProductIdx !== -1) {
        cart[currProductIdx].count += 1;
    } else {
        cart.push(item);
    }
    updateCart();
    updateCartIcon(cart.length || undefined);
    updateTotal();
}

const limit = 24;
function fetchList(page = 1) {
    const url = `https://voodoo-sandbox.myshopify.com/products.json?limit=${limit}&page=${page}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const products = data.products;
        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'basis-1/4';
            productDiv.innerHTML = `
                <div class="object-cover border-black border-2 h-60 flex justify-center overflow-hidden items-center relative">
                    <img src="${product?.images?.[0]?.src}" class=" object-cover max-w-full max-h-full h-60" />
                    <div class="absolute bg-black p-2 top-3 left-3 rounded-md text-white leading-4 font-light text-sm" >USED</div>
                </div>
                <div class="flex justify-between flex-col overflow-hidden">
                    <div class="flex justify-between py-3 text-s">
                        <div class="font-bold w-1/2">
                            <div class="overflow-hidden text-ellipsis whitespace-nowrap" title="${product.title}">${product.title}</div>
                            <div>${product.variants?.[0]?.price}</div>
                        </div>
                        <div class=" text-right">
                            <div>Condition</div>
                            <div class="font-light">Slightly used</div>
                        </div>
                    </div>
                    <button class="hover:opacity-80 active:opacity-50 add-to-cart bg-black rounded-md p-4 text-white text-center ">
                        ADD TO CART
                    </button>
                </div>
            `
            const button = productDiv.querySelector('.add-to-cart')
            button.addEventListener('click', () => {
                addItem(
                    { 
                        name: product.title,
                        price: product.variants?.[0]?.price,
                        id: product.id,
                        image: product.images?.[0]?.src,
                        count: 1,
                    }
                );
            })

            productsContainer.appendChild(productDiv);

        });
    })
    .catch(error => {
        console.error('Error:', error)
    })

    
}

fetchList();

let page = 1;
const totalCount = 461;
const pageCount = Math.ceil(totalCount / limit)

const buttons = [];

const paginationContainer = document.getElementById('pagination');
for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    if (i === 1) {
        button.classList.add('bg-black', 'text-white');
    }
    button.classList.add('flex', 'border-black', 'hover:bg-black', 'hover:text-white', 'rounded-full' , 'border-2' ,'w-10', 'h-10', 'justify-center', 'items-center');
    button.addEventListener('click', () => {
        buttons.forEach(btn => {
            btn.classList.remove('bg-black', 'text-white');
        });
        fetchList(i);
        button.classList.add('bg-black', 'text-white');
    });
    buttons.push(button);
    paginationContainer.appendChild(button);
}