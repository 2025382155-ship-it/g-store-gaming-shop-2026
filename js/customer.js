"use strict";

document.addEventListener("DOMContentLoaded", () => {
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
