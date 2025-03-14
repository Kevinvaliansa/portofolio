document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll untuk navigasi
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
        });
    });

    // Fungsi untuk menampilkan modal
    function showModal(imgSrc) {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${imgSrc}" alt="Preview">
            </div>
        `;
        document.body.appendChild(modal);

        // Tutup modal saat diklik di luar gambar atau tekan ESC
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                closeModal();
            }
        });

        function closeModal() {
            modal.remove();
        }
    }

    // Event listener untuk gambar profil
    document.querySelector(".profile-pic").addEventListener("click", function () {
        showModal(this.src);
    });

    // Event listener untuk gambar sertifikat di dalam kartu
    document.querySelectorAll(".card img").forEach(img => {
        img.addEventListener("click", function () {
            showModal(this.src);
        });
    });
});
