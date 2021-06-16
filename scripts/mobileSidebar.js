const toggleSidebar = () => {
  const navItemsElement = document.querySelector(".nav-items");
  navItemsElement.classList.toggle("active-sidebar");
};

const menuElement = document.querySelector(".menu-icon");
menuElement.addEventListener("click", toggleSidebar);
