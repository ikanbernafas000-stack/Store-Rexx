// Data produk (bisa diganti sesuai stok lo)
let products = [
    // Indonesia
    { id: 1, nomor: "+62812xxxxxx1", negara: "Indonesia", harga: 7000, status: "ready", deskripsi: "Nomor fresh, siap daftar WA" },
    { id: 2, nomor: "+62813xxxxxx2", negara: "Indonesia", harga: 7000, status: "ready", deskripsi: "Nomor fresh, siap daftar WA" },
    { id: 3, nomor: "+62821xxxxxx3", negara: "Indonesia", harga: 7000, status: "ready", deskripsi: "Nomor fresh, siap daftar WA" },
    { id: 4, nomor: "+62838xxxxxx4", negara: "Indonesia", harga: 7000, status: "ready", deskripsi: "Nomor fresh, siap daftar WA" },
    { id: 5, nomor: "+62852xxxxxx5", negara: "Indonesia", harga: 7000, status: "ready", deskripsi: "Nomor fresh, siap daftar WA" },
    
    // USA
    { id: 6, nomor: "+1415555xxx1", negara: "USA", harga: 10000, status: "ready", deskripsi: "Nomor US, bisa buat verifikasi" },
    { id: 7, nomor: "+1212555xxx2", negara: "USA", harga: 10000, status: "ready", deskripsi: "Nomor US, bisa buat verifikasi" },
    { id: 8, nomor: "+1310555xxx3", negara: "USA", harga: 10000, status: "ready", deskripsi: "Nomor US, bisa buat verifikasi" },
    
    // Canada
    { id: 9, nomor: "+1416555xxx1", negara: "Canada", harga: 10000, status: "ready", deskripsi: "Nomor Canada, jarang mati" },
    { id: 10, nomor: "+1905555xxx2", negara: "Canada", harga: 10000, status: "ready", deskripsi: "Nomor Canada, jarang mati" },
    
    // UK
    { id: 11, nomor: "+4420555xxx1", negara: "UK", harga: 10000, status: "ready", deskripsi: "Nomor UK, oke punya" },
    { id: 12, nomor: "+4416155xxx2", negara: "UK", harga: 10000, status: "ready", deskripsi: "Nomor UK, oke punya" },
    
    // Paket Hemat
    { id: 13, nomor: "Paket 5 Nomor Indo", negara: "Paket", harga: 30000, status: "paket", deskripsi: "5 nomor Indonesia random, siap pakai" },
    { id: 14, nomor: "Paket 5 Nomor US", negara: "Paket", harga: 40000, status: "paket", deskripsi: "5 nomor US random, siap pakai" },
    { id: 15, nomor: "Paket 10 Nomor Campur", negara: "Paket", harga: 80000, status: "paket", deskripsi: "10 nomor random (Indo/US/Canada)" },
];

let cart = [];
let filteredProducts = products;

// Tampilkan produk
function displayProducts(productsToShow) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        let flag = '';
        if (product.negara === 'Indonesia') flag = '🇮🇩';
        else if (product.negara === 'USA') flag = '🇺🇸';
        else if (product.negara === 'Canada') flag = '🇨🇦';
        else if (product.negara === 'UK') flag = '🇬🇧';
        else flag = '📦';
        
        productCard.innerHTML = `
            <div class="product-img">${flag}</div>
            <div class="product-info">
                <div class="product-negara">${product.negara}</div>
                <div class="product-nomor">${product.nomor}</div>
                <div class="product-harga">Rp ${product.harga.toLocaleString()}</div>
                <button class="btn-add" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
            </div>
        `;
        
        productList.appendChild(productCard);
    });
}

// Filter produk
document.querySelectorAll('.kategori-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.kategori-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const negara = this.getAttribute('data-negara');
        
        if (negara === 'all') {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(p => p.negara.toLowerCase() === negara.toLowerCase());
        }
        
        displayProducts(filteredProducts);
    });
});

// Tambah ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Cek kalo produknya paket (boleh multiple)
    if (product.status === 'paket') {
        cart.push({...product, cartId: Date.now()});
    } else {
        // Cek apakah nomor sudah ada di keranjang (biar gak dobel)
        const existing = cart.find(p => p.id === productId);
        if (!existing) {
            cart.push({...product, cartId: Date.now()});
        } else {
            alert('Nomor ini udah ada di keranjang, boss!');
            return;
        }
    }
    
    updateCart();
    alert('Ditambahkan ke keranjang!');
}

// Hapus dari keranjang
function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCart();
}

// Update tampilan keranjang
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang kosong, boss!</p>';
        cartCount.textContent = '0';
        cartTotal.textContent = 'Rp 0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.harga;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.nomor}</h4>
                    <p>${item.negara}</p>
                    <span class="cart-item-price">Rp ${item.harga.toLocaleString()}</span>
                </div>
                <div class="cart-item-remove" onclick="removeFromCart(${item.cartId})">✖</div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    cartCount.textContent = cart.length;
    cartTotal.textContent = `Rp ${total.toLocaleString()}`;
}

// Toggle keranjang
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// Checkout via WhatsApp
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang masih kosong, boss!');
        return;
    }
    
    let message = 'Halo%20boss%2C%20saya%20mau%20order%20nomor%20virtual%3A%0A%0A';
    
    cart.forEach(item => {
        message += `- ${item.nomor} (${item.negara}) - Rp${item.harga.toLocaleString()}%0A`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.harga, 0);
    message += `%0A*TOTAL%3A%20Rp${total.toLocaleString()}*%0A%0A`;
    message += `Metode%20pembayaran%3A%20(isi%20sendiri%2C%20boss)%0A`;
    message += `Bukti%20transfer%3A%20(lampirkan%20nanti)`;
    
    // Ganti nomor WA lo disini!
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
}

// Quick order
function quickOrder() {
    const nama = document.getElementById('nama').value;
    const jumlah = document.getElementById('jumlah').value;
    const negara = document.getElementById('negara-order').value;
    
    if (!nama || !jumlah) {
        alert('Isi dulu nama dan jumlahnya, boss!');
        return;
    }
    
    let negaraText = '';
    if (negara === 'indonesia') negaraText = 'Indonesia';
    else if (negara === 'usa') negaraText = 'USA';
    else if (negara === 'canada') negaraText = 'Canada';
    else if (negara === 'uk') negaraText = 'UK';
    else negaraText = 'Campuran Random';
    
    const message = `Halo%20boss%2C%20saya%20${nama}%20mau%20order%20cepat%3A%0A%0A` +
                    `Jumlah%3A%20${jumlah}%20nomor%0A` +
                    `Negara%3A%20${negaraText}%0A%0A` +
                    `Tolong%20dibantu%20pilihkan%20nomor%20yang%20bagus%2C%20boss!`;
    
    window.open(`https://wa.me/6285248261867?text=${message}`, '_blank');
}

// Initialize
displayProducts(products);
updateCart();
