"use strict";

const SAMPLE_CUSTOMERS_VERSION = "gstore-sample-customers-v1";

document.addEventListener("DOMContentLoaded", () => {
  seedSampleCustomers();
  const productTable = document.getElementById("staff-product-table");
  if (productTable) renderStaffProducts();
  if (document.getElementById("staff-order-table")) renderStaffOrders();
  if (document.getElementById("staff-customer-table")) renderStaffCustomers();
  if (document.getElementById("staff-dashboard")) renderDashboard();
  if (document.getElementById("sales-chart")) renderSalesAnalytics();
  setupProductForm();
  setupInventory();
});

function getProducts() {
  if (typeof products === "function") return products();
  return JSON.parse(localStorage.getItem("iplay_products")) || [];
}

function saveProducts(data) {
  localStorage.setItem("iplay_products", JSON.stringify(data));
}

function getOrders() {
  const data = JSON.parse(localStorage.getItem("iplay_orders") || "[]");
  return Array.isArray(data) ? data : [];
}

function saveOrders(data) {
  localStorage.setItem("iplay_orders", JSON.stringify(data));
}

function seedSampleCustomers() {
  if (localStorage.getItem("iplay_sample_customers_version") === SAMPLE_CUSTOMERS_VERSION) return;

  const products = getProducts().filter((product) => Number(product.stock) > 0);
  if (!products.length) throw new Error("Cannot seed sample purchases because the product catalogue is empty.");

  let users;
  try {
    users = JSON.parse(localStorage.getItem("iplay_users") || "[]");
  } catch {
    throw new Error("Cannot seed sample customers because the saved customer data is invalid.");
  }
  if (!Array.isArray(users)) throw new Error("Cannot seed sample customers because the saved customer data is invalid.");

  const existingEmails = new Set(users.map((user) => String(user.email || "").toLowerCase()));
  const customers = Array.from({ length: 13 }, (_, index) => {
    const number = index + 1;
    const customerId = `SAMPLE-CUSTOMER-${String(number).padStart(3, "0")}`;
    const emailPrefix = `customer${String(number).padStart(2, "0")}`;
    let email = `${emailPrefix}@gstore-demo.example`;
    let suffix = 1;
    while (existingEmails.has(email)) {
      email = `${emailPrefix}+sample${suffix}@gstore-demo.example`;
      suffix += 1;
    }
    existingEmails.add(email);
    return {
      customerId,
      fullName: SAMPLE_CUSTOMER_NAMES[index],
      email,
      phone: `+60 10 0000 ${String(1000 + number).slice(-4)}`,
      role: "customer",
      status: "Active",
      registeredAt: new Date(Date.now() - randomInteger(240, 520) * 86400000).toISOString(),
      sampleCustomer: true
    };
  });

  const categories = ["PlayStation", "Xbox", "Nintendo", "Games", "Accessories"];
  const generatedOrders = [];
  customers.forEach((customer, customerIndex) => {
    const registrationTime = Date.parse(customer.registeredAt);
    const orderCount = randomInteger(2, 5);
    for (let orderIndex = 0; orderIndex < orderCount; orderIndex += 1) {
      const itemCount = randomInteger(1, 4);
      const shuffledCategories = shuffleValues(categories);
      const selectedProducts = [];
      for (const category of shuffledCategories) {
        const categoryProducts = products.filter((product) =>
          product.category === category && !selectedProducts.some((selected) => selected.id === product.id));
        if (categoryProducts.length) {
          selectedProducts.push(categoryProducts[randomInteger(0, categoryProducts.length - 1)]);
        }
        if (selectedProducts.length === itemCount) break;
      }
      if (!selectedProducts.length) throw new Error("Cannot generate sample purchases from the available catalogue.");

      const items = selectedProducts.map((product) => {
        const quantity = Math.min(randomInteger(1, 3), Number(product.stock));
        return {
          productId: product.id,
          name: product.name,
          quantity,
          price: Number(product.price)
        };
      });
      const total = Number(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
      const orderDate = new Date(registrationTime + Math.random() * (Date.now() - registrationTime));
      generatedOrders.push({
        id: `GSTORE-SAMPLE-${String(customerIndex + 1).padStart(2, "0")}-${String(orderIndex + 1).padStart(2, "02")}`,
        customerId: customer.customerId,
        customer: customer.fullName,
        customerEmail: customer.email,
        items,
        subtotal: total,
        total,
        status: Math.random() < 0.7 ? "Completed" : "Processing",
        stockDeducted: false,
        sampleOrder: true,
        createdAt: orderDate.toISOString()
      });
    }
  });

  const existingOrders = getOrders();
  const existingOrderIds = new Set(existingOrders.map((order) => order.id));
  const duplicateOrder = generatedOrders.find((order) => existingOrderIds.has(order.id));
  if (duplicateOrder) throw new Error(`Cannot seed sample purchases; order ID ${duplicateOrder.id} already exists.`);

  const totalsByCustomer = new Map(customers.map((customer) => [customer.customerId, { totalOrders: 0, totalSpent: 0 }]));
  generatedOrders.forEach((order) => {
    const totals = totalsByCustomer.get(order.customerId);
    totals.totalOrders += 1;
    totals.totalSpent = Number((totals.totalSpent + order.total).toFixed(2));
  });
  const sampleUsers = customers.map((customer) => ({
    ...customer,
    ...totalsByCustomer.get(customer.customerId)
  }));

  localStorage.setItem("iplay_users", JSON.stringify([...users, ...sampleUsers]));
  saveOrders([...existingOrders, ...generatedOrders]);
  localStorage.setItem("iplay_sample_customers_version", SAMPLE_CUSTOMERS_VERSION);
}

const SAMPLE_CUSTOMER_NAMES = [
  "Aina Farhana", "Daniel Lim", "Nur Izzati", "Amir Hakim", "Siti Alya",
  "Jason Tan", "Muhammad Danish", "Kavitha Raj", "Nurul Huda", "Wei Jian",
  "Farid Azman", "Mei Xin", "Arvind Kumar"
];

function randomInteger(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function shuffleValues(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInteger(0, index);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function staffMoney(value) {
  return `RM${Number(value || 0).toFixed(2)}`;
}

function formatStaffDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

function stockStatus(stock) {
  if (stock <= 0) return ["Out of Stock", "danger"];
  if (stock <= 5) return ["Low Stock", "warning"];
  return ["In Stock", "success"];
}

function renderStaffProducts() {
  const body = document.getElementById("staff-product-table");
  body.innerHTML = getProducts().map((product) => {
    const status = stockStatus(product.stock);
    return `<tr>
      <td>${escapeStaff(product.id)}</td><td><strong>${escapeStaff(product.name)}</strong></td>
      <td>${escapeStaff(product.category)}</td><td>${escapeStaff(product.platform)}</td>
      <td>${staffMoney(product.price)}</td><td>${product.stock}</td>
      <td><span class="badge text-bg-${status[1]}">${status[0]}</span></td>
      <td><button class="btn btn-sm btn-outline-light edit-product me-1" data-id="${escapeStaff(product.id)}">Edit</button><button class="btn btn-sm btn-outline-danger delete-product" data-id="${escapeStaff(product.id)}">Delete</button></td>
    </tr>`;
  }).join("");
  body.querySelectorAll(".delete-product").forEach((button) => button.addEventListener("click", () => deleteProduct(button.dataset.id)));
  body.querySelectorAll(".edit-product").forEach((button) => button.addEventListener("click", () => editProduct(button.dataset.id)));
}

function setupProductForm() {
  const form = document.getElementById("staff-product-form");
  if (!form) return;
  document.getElementById("new-product").addEventListener("click", () => {
    form.reset();
    form.elements.id.disabled = false;
    form.elements.status.value = "In Stock";
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = form.elements.id.value.trim();
    const stock = Math.max(0, Number(form.elements.stock.value));
    const data = getProducts();
    const existing = data.findIndex((item) => item.id === id);
    if (existing < 0 && data.some((item) => item.id.toLowerCase() === id.toLowerCase())) {
      staffNotice("That product ID already exists.", "danger");
      return;
    }
    const product = {
      id, name: form.elements.name.value.trim(), category: form.elements.category.value,
      platform: form.elements.platform.value, brand: form.elements.brand.value.trim(),
      description: form.elements.description.value.trim(), price: Number(form.elements.price.value),
      stock, image: form.elements.image.value.trim() || "../images/product-fallback.svg",
      condition: form.elements.condition.value, availability: stockStatus(stock)[0],
      variantGroup: form.elements.variantGroup.value.trim(),
      variantGroupLabel: form.elements.variantGroup.value.trim(),
      model: form.elements.model.value.trim(),
      edition: form.elements.edition.value.trim(),
      storage: form.elements.storage.value.trim(),
      color: form.elements.color.value.trim(),
      mediaFormat: form.elements.mediaFormat.value.trim()
    };
    if (existing >= 0) data[existing] = product;
    else data.push(product);
    saveProducts(data);
    bootstrap.Modal.getInstance(document.getElementById("product-modal")).hide();
    renderStaffProducts();
    staffNotice("Product saved successfully.", "success");
  });
}

function editProduct(id) {
  const product = getProducts().find((item) => item.id === id);
  if (!product) return;
  const form = document.getElementById("staff-product-form");
  for (const key of ["id", "name", "category", "platform", "brand", "description", "price", "stock", "image", "condition",
    "variantGroup", "model", "edition", "storage", "color", "mediaFormat"]) {
    if (form.elements[key]) form.elements[key].value = product[key] || "";
  }
  form.elements.id.disabled = true;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("product-modal")).show();
}

function deleteProduct(id) {
  const product = getProducts().find((item) => item.id === id);
  if (!product || !confirm(`Delete ${product.name}?`)) return;
  saveProducts(getProducts().filter((item) => item.id !== id));
  renderStaffProducts();
}

function setupInventory() {
  const body = document.getElementById("inventory-table");
  if (!body) return;
  body.innerHTML = getProducts().map((product) => `<tr><td>${escapeStaff(product.id)}</td><td>${escapeStaff(product.name)}</td><td><span class="badge text-bg-${stockStatus(product.stock)[1]}">${stockStatus(product.stock)[0]}</span></td><td><input class="form-control form-control-sm bg-dark text-light border-secondary inventory-stock" style="width:90px" type="number" min="0" value="${product.stock}" data-id="${escapeStaff(product.id)}"></td></tr>`).join("");
  body.querySelectorAll(".inventory-stock").forEach((input) => input.addEventListener("change", () => {
    const quantity = Math.max(0, Number(input.value));
    const data = getProducts().map((product) => product.id === input.dataset.id ? { ...product, stock: quantity, availability: stockStatus(quantity)[0] } : product);
    saveProducts(data);
    setupInventory();
    staffNotice("Stock updated.", "success");
  }));
}

function renderStaffOrders() {
  const body = document.getElementById("staff-order-table");
  body.innerHTML = getOrders().map((order) => `<tr><td>#${escapeStaff(order.id)}</td><td>${escapeStaff(order.customer)}</td><td>${order.items.map((item) => `${escapeStaff(item.name)} × ${item.quantity}`).join("<br>")}</td><td>${staffMoney(order.total)}</td><td><select class="form-select form-select-sm bg-dark text-light border-secondary order-status" data-id="${escapeStaff(order.id)}">${["Processing", "Completed", "Cancelled"].map((status) => `<option ${order.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></td></tr>`).join("") || '<tr><td colspan="5" class="text-secondary">No customer orders yet.</td></tr>';
  body.querySelectorAll(".order-status").forEach((select) => select.addEventListener("change", () => updateOrderStatus(select.dataset.id, select.value)));
}

function updateOrderStatus(orderId, status) {
  const allOrders = getOrders();
  const order = allOrders.find((item) => item.id === orderId);
  if (!order || order.status === status) return;
  if (status === "Cancelled" && order.stockDeducted && !order.stockRestored) {
    const stock = getProducts().map((product) => {
      const item = order.items.find((entry) => entry.productId === product.id);
      return item ? { ...product, stock: product.stock + item.quantity } : product;
    }).map((product) => ({ ...product, availability: stockStatus(product.stock)[0] }));
    saveProducts(stock);
    order.stockRestored = true;
  }
  if (order.status === "Cancelled" && status !== "Cancelled" && order.stockRestored) {
    const adjustedStock = getProducts().map((product) => {
      const item = order.items.find((entry) => entry.productId === product.id);
      if (!item) return product;
      const stock = Math.max(0, product.stock - item.quantity);
      return { ...product, stock, availability: stockStatus(stock)[0] };
    });
    saveProducts(adjustedStock);
    order.stockRestored = false;
  }
  order.status = status;
  saveOrders(allOrders);
  staffNotice("Order status updated.", "success");
}

function renderStaffCustomers() {
  const body = document.getElementById("staff-customer-table");
  let registered = [];
  try { registered = JSON.parse(localStorage.getItem("iplay_users")) || []; } catch {}
  const customers = [
    { customerId: "DEMO-CUSTOMER", fullName: "G-Store Customer", email: "customer@iplay.com", phone: "—", status: "Demo" },
    ...registered.filter((customer) => customer.role === "customer")
  ];
  const allOrders = getOrders();
  body.innerHTML = customers.map((customer) => {
    const customerOrders = allOrders.filter((order) => orderMatchesCustomer(order, customer));
    const spent = customerOrders.reduce((sum, order) =>
      sum + (order.status === "Cancelled" ? 0 : Number(order.total) || 0), 0);
    const customerId = customer.customerId || customer.email;
    return `<tr>
      <td>${escapeStaff(customer.customerId || "—")}</td>
      <td><button class="btn btn-link p-0 text-start customer-history" type="button" data-customer-id="${escapeStaff(customerId)}">${escapeStaff(customer.fullName)}</button></td>
      <td>${escapeStaff(customer.email)}</td>
      <td>${escapeStaff(customer.phone || "—")}</td>
      <td>${customer.registeredAt ? formatStaffDate(customer.registeredAt) : "—"}</td>
      <td>${customerOrders.length}</td>
      <td>${staffMoney(spent)}</td>
      <td><span class="badge text-bg-${customer.status === "Active" ? "success" : "secondary"}">${escapeStaff(customer.status || "Active")}</span></td>
    </tr>`;
  }).join("");
  body.querySelectorAll(".customer-history").forEach((button) => {
    button.addEventListener("click", () => showCustomerHistory(button.dataset.customerId));
  });
}

function showCustomerHistory(customerId) {
  const users = JSON.parse(localStorage.getItem("iplay_users") || "[]");
  const customer = users.find((user) => user.customerId === customerId || user.email === customerId) ||
    (customerId === "DEMO-CUSTOMER"
      ? { customerId, fullName: "G-Store Customer", email: "customer@iplay.com" }
      : null);
  if (!customer) return;

  const customerOrders = getOrders()
    .filter((order) => orderMatchesCustomer(order, customer))
    .sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt));
  document.getElementById("customer-history-title").textContent = customer.fullName;
  document.getElementById("customer-history-content").innerHTML = customerOrders.length
    ? customerOrders.map((order) => `
      <article class="management-panel mb-3">
        <div class="d-flex flex-wrap justify-content-between gap-2">
          <strong>#${escapeStaff(order.id)}</strong>
          <span>${formatStaffDate(order.createdAt)}</span>
          <span class="badge text-bg-secondary">${escapeStaff(order.status)}</span>
        </div>
        <hr>
        ${order.items.map((item) => `
          <div class="d-flex justify-content-between gap-3 small mb-2">
            <span>${escapeStaff(item.name)} × ${Number(item.quantity)}</span>
            <span>${staffMoney(Number(item.price) * Number(item.quantity))}</span>
          </div>`).join("")}
        <div class="d-flex justify-content-end"><strong>Total: ${staffMoney(order.total)}</strong></div>
      </article>`).join("")
    : '<p class="text-secondary">No orders found for this customer.</p>';
  bootstrap.Modal.getOrCreateInstance(document.getElementById("customer-history-modal")).show();
}

function orderMatchesCustomer(order, customer) {
  return Boolean(customer.customerId && order.customerId === customer.customerId) ||
    String(order.customerEmail || "").toLowerCase() === String(customer.email || "").toLowerCase();
}

function renderDashboard() {
  const products = getProducts();
  const allOrders = getOrders();
  const activeOrders = allOrders.filter((order) => order.status !== "Cancelled");
  const revenue = activeOrders.reduce((sum, order) => sum + Number(order.total), 0);
  const users = JSON.parse(localStorage.getItem("iplay_users") || "[]");
  document.getElementById("dash-products").textContent = products.length;
  document.getElementById("dash-customers").textContent = users.filter((user) => user.role === "customer").length;
  document.getElementById("dash-orders").textContent = activeOrders.length;
  document.getElementById("dash-revenue").textContent = staffMoney(revenue);
  document.getElementById("dash-low").textContent = products.filter((product) => product.stock > 0 && product.stock <= 5).length;

  const recent = document.getElementById("dash-recent");
  recent.innerHTML = activeOrders.slice(0, 5).map((order) => `<tr><td>#${escapeStaff(order.id)}</td><td>${escapeStaff(order.customer)}</td><td>${staffMoney(order.total)}</td><td>${escapeStaff(order.status)}</td></tr>`).join("") || '<tr><td colspan="4">No orders yet.</td></tr>';

  if (window.Chart) {
    const monthly = {};
    activeOrders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" });
      monthly[month] = (monthly[month] || 0) + Number(order.total);
    });
    renderChart("sales-chart", "bar", Object.keys(monthly), Object.values(monthly));

    renderCategoryChart(products, activeOrders);
  }

  const sales = {};
  activeOrders.forEach((order) => order.items.forEach((item) => sales[item.name] = (sales[item.name] || 0) + item.quantity));
  const list = Object.entries(sales).sort((a, b) => b[1] - a[1]).slice(0, 5);
  document.getElementById("best-sellers").innerHTML = list.length ? list.map(([name, quantity]) => `<div class="d-flex justify-content-between py-2 border-bottom border-secondary"><span>${escapeStaff(name)}</span><strong>${quantity}</strong></div>`).join("") : '<p class="text-secondary">No sales yet.</p>';
  renderMostActiveCustomers(users, activeOrders);
}

function renderMostActiveCustomers(users, activeOrders) {
  const target = document.getElementById("most-active-customers");
  if (!target) return;
  const customerByKey = new Map(users.filter((user) => user.role === "customer").map((user) => [
    user.customerId || user.email,
    user
  ]));
  const activity = new Map();
  activeOrders.forEach((order) => {
    const key = order.customerId || order.customerEmail || order.customer;
    const current = activity.get(key) || {
      name: customerByKey.get(key)?.fullName || order.customer || order.customerEmail || "Customer",
      orders: 0,
      spent: 0
    };
    current.orders += 1;
    current.spent += Number(order.total) || 0;
    activity.set(key, current);
  });
  const topCustomers = [...activity.values()]
    .sort((first, second) => second.orders - first.orders || second.spent - first.spent)
    .slice(0, 5);
  target.innerHTML = topCustomers.length
    ? topCustomers.map((customer) => `
      <div class="d-flex justify-content-between gap-3 py-2 border-bottom border-secondary">
        <span>${escapeStaff(customer.name)}<small class="d-block text-secondary">${customer.orders} orders</small></span>
        <strong>${staffMoney(customer.spent)}</strong>
      </div>`).join("")
    : '<p class="text-secondary">No customer orders yet.</p>';
}

function renderSalesAnalytics() {
  const products = getProducts();
  const activeOrders = getOrders().filter((order) => order.status !== "Cancelled");
  const monthly = {};
  activeOrders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" });
    monthly[month] = (monthly[month] || 0) + Number(order.total);
  });
  if (window.Chart) {
    renderChart("sales-chart", "bar", Object.keys(monthly), Object.values(monthly));
    const monthlyEmptyMessage = document.getElementById("monthly-sales-empty");
    if (monthlyEmptyMessage) monthlyEmptyMessage.classList.toggle("d-none", activeOrders.length > 0);
    renderCategoryChart(products, activeOrders);
  }
  const sales = {};
  activeOrders.forEach((order) => order.items.forEach((item) => sales[item.name] = (sales[item.name] || 0) + item.quantity));
  const list = Object.entries(sales).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const target = document.getElementById("best-sellers");
  if (target) target.innerHTML = list.length ? list.map(([name, quantity]) => `<div class="d-flex justify-content-between py-2 border-bottom border-secondary"><span>${escapeStaff(name)}</span><strong>${quantity}</strong></div>`).join("") : '<p class="text-secondary">No sales yet.</p>';
}

function renderCategoryChart(products, activeOrders) {
  const categories = new Map(
    ["PlayStation", "Xbox", "Nintendo", "Games", "Accessories"].map((category) => [category, 0])
  );
  activeOrders.forEach((order) => order.items.forEach((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (product && categories.has(product.category)) {
      categories.set(product.category, categories.get(product.category) + item.quantity);
    }
  }));
  const labels = [...categories.keys()];
  const values = [...categories.values()];
  const hasSales = values.some((value) => value > 0);
  const emptyMessage = document.getElementById("category-chart-empty");
  if (emptyMessage) emptyMessage.classList.toggle("d-none", hasSales);
  renderChart("category-chart", hasSales ? "doughnut" : "bar", labels, values);
}

function renderChart(id, type, labels, data) {
  const existing = Chart.getChart(id);
  if (existing) existing.destroy();
  const styles = getComputedStyle(document.documentElement);
  const textColor = styles.getPropertyValue("--iplay-text").trim() || "#1F1F1F";
  const mutedColor = styles.getPropertyValue("--iplay-muted").trim() || "#6C757D";
  const borderColor = styles.getPropertyValue("--iplay-border").trim() || "#E8E8E8";
  const accentColor = styles.getPropertyValue("--iplay-purple").trim() || "#006FCD";
  const dataset = {
    data,
    backgroundColor: type === "bar" ? accentColor : [accentColor, "#198754", "#6C757D", "#171717", "#A7A7A7"],
    borderColor: accentColor,
    borderRadius: 4
  };
  new Chart(document.getElementById(id), {
    type,
    data: { labels, datasets: [dataset] },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: textColor } } },
      scales: type === "bar" ? {
        x: { ticks: { color: mutedColor }, grid: { color: borderColor } },
        y: { ticks: { color: mutedColor }, grid: { color: borderColor }, beginAtZero: true }
      } : undefined
    }
  });
}

window.addEventListener("gstore-theme-change", () => {
  if (document.getElementById("staff-dashboard")) renderDashboard();
  else if (document.getElementById("sales-chart")) renderSalesAnalytics();
});

function staffNotice(message, type) {
  const element = document.getElementById("staff-feedback");
  if (!element) return;
  element.className = `alert alert-${type}`;
  element.textContent = message;
}

function escapeStaff(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
