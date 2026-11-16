"use strict";

function setupCustomerSidebar() {
  if (!document.body.classList.contains("market-page") ||
      !window.location.pathname.includes("/customer/")) return;

  const fileName = window.location.pathname.split("/").pop();
  const links = [
    ["home.html", "Home", "bi-house-door"],
    ["products.html", "Shop / Products", "bi-shop"],
    ["products.html", "Categories", "bi-grid-3x3-gap"],
    ["orders.html", "My Orders", "bi-receipt"],
    ["cart.html", "Shopping Cart", "bi-cart3"],
    ["profile.html", "My Profile", "bi-person"],
  ];
  const sidebar = document.createElement("aside");
  sidebar.className = "customer-sidebar";
  sidebar.setAttribute("aria-label", "Customer navigation");
  sidebar.innerHTML = `
    <a class="customer-brand" href="home.html"><i class="bi bi-controller" aria-hidden="true"></i><span>G-STORE</span></a>
    <nav class="customer-nav">
      ${links.map(([href, label, icon], index) => `
        <a class="customer-nav-link ${index !== 2 && fileName === href ? "active" : ""}" href="${href}">
          <i class="bi ${icon}" aria-hidden="true"></i><span>${label}</span>
        </a>`).join("")}
    </nav>
    <div class="customer-sidebar-footer">
      <button class="customer-nav-link customer-logout" type="button" data-auth-logout><i class="bi bi-box-arrow-right" aria-hidden="true"></i><span>Logout</span></button>
    </div>`;
  document.body.prepend(sidebar);
  document.body.classList.add("customer-layout");

  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "customer-menu-button btn btn-primary";
  menuButton.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i><span class="visually-hidden">Open navigation</span>';
  menuButton.setAttribute("aria-label", "Open navigation");
  const overlay = document.createElement("div");
  overlay.className = "customer-sidebar-overlay";
  const closeMenu = () => {
    document.body.classList.remove("customer-sidebar-open");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  menuButton.addEventListener("click", () => {
    document.body.classList.toggle("customer-sidebar-open");
    menuButton.setAttribute("aria-label", document.body.classList.contains("customer-sidebar-open") ? "Close navigation" : "Open navigation");
  });
  overlay.addEventListener("click", closeMenu);
  sidebar.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.body.prepend(overlay);
  document.body.prepend(menuButton);
  setupLogout();
}

document.addEventListener("DOMContentLoaded", () => {
  setupCustomerSidebar();
  const currentUser = window.IPlayAuth && window.IPlayAuth.getCurrentUser();
  const isCustomerPage = window.location.pathname.includes("/customer/");
  const fileName = window.location.pathname.split("/").pop();
  const publicCustomerPages = ["home.html", "products.html", "product.html", "cart.html"];
  const requiresCustomerAuth = isCustomerPage && !publicCustomerPages.includes(fileName);

  if (!currentUser && (requiresCustomerAuth || window.location.pathname.includes("/staff/"))) {
    if (fileName === "checkout.html") {
      sessionStorage.setItem("gstore_pending_purchase", JSON.stringify({
        productId: null,
        quantity: 1,
        action: "checkout",
        returnUrl: "customer/checkout.html"
      }));
    }
    window.location.href = "../index.html?purchase=1";
    return;
  }

  if (!currentUser) return;

  const requiredRole = isCustomerPage ? "customer" : "staff";
  if (currentUser.role !== requiredRole) {
    window.location.href = currentUser.role === "staff" ? "../staff/dashboard.html" : "../customer/home.html";
    return;
  }

  const customerName = document.getElementById("customer-name");
  const adminName = document.getElementById("admin-name");
  if (customerName) customerName.textContent = currentUser.fullName;
  if (adminName) adminName.textContent = currentUser.fullName;
});
