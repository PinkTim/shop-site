function toggleCart () {
    const cart = document.getElementById('cart');
    if (cart.classList.contains('invisible')) {
        cart.classList.remove('invisible');
    } else {
        cart.classList.add('invisible');
    }
}
