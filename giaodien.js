document.addEventListener("DOMContentLoaded", function () {
  // Tắt hiệu ứng loading sau khi trang đã tải
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.opacity = "0";
  setTimeout(() => {
    loadingOverlay.style.display = "none";
  }, 500);

  // Xử lý cuộn trang cho header và animation các section
  const header = document.getElementById("header");
  const sections = document.querySelectorAll(".fade-in");

  const options = {
    root: null, // viewport
    threshold: 0.2,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Xử lý menu hamburger trên mobile
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinksMobile = document.querySelectorAll(".nav-menu-mobile a");

  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  // Đóng menu khi click vào link
  navLinksMobile.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
    });
  });

  // Xử lý form liên hệ - CORRECTED VERSION
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // LẤY ENTRY IDs CHÍNH XÁC TỪ GOOGLE FORM CỦA BẠN
    // Thay thế các số này bằng entry IDs thực tế từ form
    const formData = {
      "entry.109577116": document.getElementById("name").value, // Thay XXXXXXX bằng entry ID của "Họ và Tên"
      "entry.1527515415": document.getElementById("phone").value, // Thay YYYYYYY bằng entry ID của "SDT"
      "entry.1366847038": getInterestValue(), // Thay ZZZZZZZ bằng entry ID của "Quan tâm đến"
      "entry.960161999": document.getElementById("message").value, // Thay WWWWWWW bằng entry ID của "Nội dung"
    };

    // Hàm để chuyển đổi giá trị dropdown thành radio button value
    function getInterestValue() {
      const interestSelect = document.getElementById("interest").value;

      // Chuyển đổi từ dropdown value sang radio value
      if (interestSelect.includes("Standard")) return "Standard";
      if (interestSelect.includes("Premium")) return "Premium";
      if (interestSelect.includes("VIP")) return "Vip"; // Chú ý: "Vip" không phải "VIP"

      return ""; // Trường hợp không chọn gì
    }

    // Tạo iframe ẩn để submit form
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.name = "hiddenFrame";
    document.body.appendChild(iframe);

    // Tạo form để submit
    const form = document.createElement("form");
    form.method = "POST";
    form.action =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf7q-egPNlrzn-I9IkclDJYDRHoCSoII0wnwN7rPlEI7netyg/formResponse";
    form.target = "hiddenFrame";

    // Thêm các input với dữ liệu (chỉ những trường có giá trị)
    Object.keys(formData).forEach((entryId) => {
      if (formData[entryId] && formData[entryId].trim() !== "") {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = entryId;
        input.value = formData[entryId];
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();

    // Cleanup và thông báo
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);

      const name = document.getElementById("name").value;
      alert(`Cảm ơn bạn, ${name}! Thông tin của bạn đã được gửi thành công.`);
      contactForm.reset();
    }, 1000);
  });
});

// HƯỚNG DẪN SỬ DỤNG:
// 1. Mở Google Form của bạn ở chế độ xem trước
// 2. F12 -> Elements tab
// 3. Inspect từng trường input để lấy entry ID
// 4. Thay thế XXXXXXX, YYYYYYY, ZZZZZZZ bằng entry IDs thật
// 5. Test lại form
