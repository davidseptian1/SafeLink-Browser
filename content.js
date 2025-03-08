// Contoh untuk mendeteksi iklan judi di halaman (misalnya menghapus elemen yang mencurigakan)
const ads = document.querySelectorAll('.ad, .casino-ad, .bet-ad');
ads.forEach(ad => ad.style.display = 'none');
