const toggleSidebar = () => {
  const navItemsElement = document.querySelector(".nav-items");
  console.log(navItemsElement);
  navItemsElement.classList.toggle("active-sidebar");
};

const menuElement = document.querySelector(".menu-icon");
menuElement.addEventListener("click", toggleSidebar);
console.log(menuElement);
