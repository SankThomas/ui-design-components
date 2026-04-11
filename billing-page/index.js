const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");

const handleMenuOpen = () => {
  menuIcon.addEventListener("click", () => {
    if (sidebar.classList.contains("hidden")) {
      sidebar.classList.remove("hidden");
      sidebar.classList.add("block");
    } else {
      sidebar.classList.add("hidden");
      sidebar.classList.remove("block");
    }
  });
};
