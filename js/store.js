"use strict";

const KEYS = {
  products: "iplay_products",
  cart: "iplay_cart",
  orders: "iplay_orders",
  catalogueVersion: "iplay_catalogue_version"
};

const CATALOGUE_VERSION = "2026-gstore-five-category-variants-v3";

function seedProduct(id, name, category, platform, brand, price, stock, image, details = {}) {
  return {
    id, name, category, platform, brand, price, stock, image,
    description: `${name} for your gaming setup.`,
    condition: "New",
    availability: stock <= 0 ? "Out of Stock" : stock <= 5 ? "Low Stock" : "In Stock",
    ...details
  };
}

const PRODUCT_SEED = [
  seedProduct("CON-007", "PlayStation 5 Original (Fat) Disc Edition", "PlayStation", "PlayStation", "Sony", 2299, 4,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_5_and_DualSense.jpg/500px-PlayStation_5_and_DualSense.jpg",
    { variantGroup: "PlayStation consoles", variantGroupLabel: "PlayStation Consoles", model: "PlayStation 5 Original (Fat)", edition: "Disc Edition", storage: "825GB", variantLabel: "Original (Fat) · Disc Edition · 825GB", description: "Original PlayStation 5 disc console with an Ultra HD Blu-ray drive." }),
  seedProduct("PS5-ORIGINAL-1TB", "PlayStation 5 Original (Fat) Disc Edition", "PlayStation", "PlayStation", "Sony", 2399, 5,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_5_and_DualSense.jpg/500px-PlayStation_5_and_DualSense.jpg",
    { variantGroup: "PlayStation consoles", variantGroupLabel: "PlayStation Consoles", model: "PlayStation 5 Original (Fat)", edition: "Disc Edition", storage: "1TB", variantLabel: "Original (Fat) · Disc Edition · 1TB", description: "Later revision of the original PlayStation 5 disc console with 1TB storage." }),
  seedProduct("PS5-SLIM-DISC", "PlayStation 5 Slim Disc Edition", "PlayStation", "PlayStation", "Sony", 2399, 6,
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/Playstation_5_mod%C3%A8le_slim_%28%C3%A9dition_standard_avec_lecteur_de_disque_amovible.png",
    { variantGroup: "PlayStation consoles", variantGroupLabel: "PlayStation Consoles", model: "PlayStation 5 Slim", edition: "Disc Edition", storage: "1TB", variantLabel: "Slim · Disc Edition · 1TB", description: "Slim PlayStation 5 console with a detachable Ultra HD Blu-ray disc drive." }),
  seedProduct("PS5-SLIM-DIGITAL", "PlayStation 5 Slim Digital Edition", "PlayStation", "PlayStation", "Sony", 2099, 7,
    "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-digital-edition-right-image-block-01-en-24jun24?$1600px$",
    { variantGroup: "PlayStation consoles", variantGroupLabel: "PlayStation Consoles", model: "PlayStation 5 Slim", edition: "Digital Edition", storage: "1TB", variantLabel: "Slim · Digital Edition · 1TB", description: "Slim all-digital PlayStation 5 console; disc drive is not included." }),
  seedProduct("PS5-PRO-2TB", "PlayStation 5 Pro", "PlayStation", "PlayStation", "Sony", 3299, 3,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/PlayStation_5_Pro_no_disc_drive.jpg/500px-PlayStation_5_Pro_no_disc_drive.jpg",
    { variantGroup: "PlayStation consoles", variantGroupLabel: "PlayStation Consoles", model: "PlayStation 5 Pro", edition: "Digital Edition", storage: "2TB", variantLabel: "Pro · Digital Edition · 2TB", description: "PlayStation 5 Pro with 2TB storage. Disc drive sold separately." }),
  seedProduct("CON-008", "Xbox Series X Disc Edition", "Xbox", "Xbox", "Microsoft", 2499, 6,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Xbox_Series_X_2.jpg/500px-Xbox_Series_X_2.jpg",
    { variantGroup: "Xbox Series consoles", variantGroupLabel: "Xbox Series Consoles", model: "Xbox Series X", edition: "Disc Edition", storage: "1TB", variantLabel: "Series X · Disc Edition · 1TB", description: "Xbox Series X with a 4K UHD Blu-ray disc drive and 1TB SSD." }),
  seedProduct("XBOX-SERIES-X-DIGITAL", "Xbox Series X Digital Edition", "Xbox", "Xbox", "Microsoft", 2299, 4,
    "https://assets.xboxservices.com/assets/5c/5b/5c5bf348-d948-4c48-b7cc-55aaf94f2782.png?n=642227_Hero-Gallery-0_B1_857x676.png",
    { variantGroup: "Xbox Series consoles", variantGroupLabel: "Xbox Series Consoles", model: "Xbox Series X", edition: "Digital Edition", storage: "1TB", variantLabel: "Series X · Digital Edition · 1TB", description: "All-digital white Xbox Series X with 1TB SSD and no disc drive." }),
  seedProduct("XBOX-SERIES-S-WHITE", "Xbox Series S White", "Xbox", "Xbox", "Microsoft", 1399, 8,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Xbox%20Series%20S%20with%20controller.jpg?width=500",
    { variantGroup: "Xbox Series consoles", variantGroupLabel: "Xbox Series Consoles", model: "Xbox Series S White", edition: "Digital Edition", storage: "512GB", variantLabel: "Series S White · 512GB", description: "Compact all-digital Xbox Series S in Robot White with 512GB storage." }),
  seedProduct("XBOX-SERIES-S-BLACK", "Xbox Series S Black", "Xbox", "Xbox", "Microsoft", 1699, 5,
    "https://assets.xboxservices.com/assets/24/d0/24d00bc1-5aac-48ad-bed8-398cbebaefa4.jpg?n=XSS_Sharing_200x200.jpg",
    { variantGroup: "Xbox Series consoles", variantGroupLabel: "Xbox Series Consoles", model: "Xbox Series S Black", edition: "Digital Edition", storage: "1TB", variantLabel: "Series S Black · 1TB", description: "Compact all-digital Xbox Series S in Carbon Black with 1TB storage." }),
  seedProduct("NINTENDO-SWITCH-ORIGINAL", "Nintendo Switch Original", "Nintendo", "Nintendo Switch", "Nintendo", 1099, 7,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo-Switch-Console-Docked-wJoyConRB.jpg?width=500",
    { variantGroup: "Nintendo consoles", variantGroupLabel: "Nintendo Consoles", model: "Nintendo Switch Original", edition: "Neon Blue / Neon Red", storage: "32GB", variantLabel: "Original · Neon Blue / Neon Red · 32GB", description: "Original hybrid Nintendo Switch with 32GB internal storage and Neon Joy-Con." }),
  seedProduct("CON-009", "Nintendo Switch OLED", "Nintendo", "Nintendo Switch", "Nintendo", 1399, 8,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo%20Switch%20%E2%80%93%20OLED-Modell-Konsole%2020230506%20HOF01643%20RAW-Export.png?width=500",
    { variantGroup: "Nintendo consoles", variantGroupLabel: "Nintendo Consoles", model: "Nintendo Switch OLED", edition: "White Joy-Con", storage: "64GB", variantLabel: "OLED · White · 64GB", description: "Nintendo Switch OLED Model with a 7-inch OLED screen and 64GB storage." }),
  seedProduct("NINTENDO-SWITCH-LITE", "Nintendo Switch Lite", "Nintendo", "Nintendo Switch", "Nintendo", 799, 6,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo%20Switch%20Lite%20%28turquoise%29%20-%202.jpg?width=500",
    { variantGroup: "Nintendo consoles", variantGroupLabel: "Nintendo Consoles", model: "Nintendo Switch Lite", edition: "Turquoise", storage: "32GB", variantLabel: "Lite · Turquoise · 32GB", description: "Handheld-only Nintendo Switch Lite in Turquoise with 32GB storage." }),
  seedProduct("NINTENDO-SWITCH-2", "Nintendo Switch 2", "Nintendo", "Nintendo Switch 2", "Nintendo", 1899, 5,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo%20Switch%202%20in%20Docking%20Console.jpg?width=500",
    { variantGroup: "Nintendo consoles", variantGroupLabel: "Nintendo Consoles", model: "Nintendo Switch 2", edition: "Light Blue / Light Red Joy-Con 2", storage: "256GB", variantLabel: "Switch 2 · Light Blue / Light Red · 256GB", description: "Nintendo Switch 2 with 256GB internal storage and Light Blue / Light Red Joy-Con 2." }),

  seedProduct("PS5-011", "God of War Ragnarök", "Games", "PlayStation 5", "Sony Interactive Entertainment", 229, 14, "../images/game-covers/god-of-war-ragnarok.jpg",
    { genre: "Action Adventure", mediaFormat: "Physical disc", popularity: 96, releaseDate: "2022-11-09", originalPrice: 299, discount: 23, description: "Physical PlayStation 5 game disc. Join Kratos and Atreus as they face Ragnarök." }),
  seedProduct("PS5-012", "Cyberpunk 2077", "Games", "PlayStation 5", "CD Projekt", 129, 13, "../images/game-covers/cyberpunk-2077.jpg",
    { genre: "Action RPG", mediaFormat: "Physical disc", popularity: 90, releaseDate: "2020-12-10", description: "Physical PlayStation 5 game disc set in the open-world Night City." }),
  seedProduct("PS5-RE4", "Resident Evil 4 Remake", "Games", "PlayStation 5", "Capcom", 179, 12, "../images/game-covers/resident-evil-4-remake.jpg",
    { genre: "Survival Horror", mediaFormat: "Physical disc", popularity: 94, releaseDate: "2023-03-24", description: "Physical PlayStation 5 game disc and a modern reimagining of the survival horror classic." }),
  seedProduct("PS5-HOGWARTS", "Hogwarts Legacy", "Games", "PlayStation 5", "Warner Bros. Games", 159, 10, "../images/game-covers/hogwarts-legacy.jpg",
    { genre: "Action RPG", mediaFormat: "Physical disc", popularity: 92, releaseDate: "2023-02-10" }),
  seedProduct("PS5-ELDEN-RING", "Elden Ring", "Games", "PlayStation 5", "Bandai Namco", 189, 9, "../images/game-covers/elden-ring.jpg",
    { genre: "Action RPG", mediaFormat: "Physical disc", popularity: 98, releaseDate: "2022-02-25" }),
  seedProduct("PS5-FC26", "EA Sports FC 26", "Games", "PlayStation 5", "EA Sports", 249, 15, "../images/game-covers/ea-sports-fc-26.jpg",
    { genre: "Sports", mediaFormat: "Physical disc", popularity: 91, releaseDate: "2025-09-26" }),
  seedProduct("XBOX-FORZA5", "Forza Horizon 5", "Games", "Xbox Series X", "Xbox Game Studios", 129, 18, "../images/game-covers/forza-horizon-5.jpg",
    { genre: "Racing", mediaFormat: "Physical disc", popularity: 93, releaseDate: "2021-11-09", originalPrice: 249, discount: 48, description: "Physical Xbox game disc. Explore vibrant open roads across Mexico." }),
  seedProduct("XBOX-WITCHER3", "The Witcher 3: Wild Hunt", "Games", "Xbox Series X", "CD Projekt", 69, 22, "../images/game-covers/the-witcher-3.jpg",
    { genre: "RPG", mediaFormat: "Physical disc", popularity: 97, releaseDate: "2015-05-18", originalPrice: 149, discount: 54 }),
  seedProduct("XBOX-RE4", "Resident Evil 4 Remake", "Games", "Xbox Series X", "Capcom", 179, 8, "../images/game-covers/resident-evil-4-remake.jpg",
    { genre: "Survival Horror", mediaFormat: "Physical disc", popularity: 90, releaseDate: "2023-03-24" }),
  seedProduct("XBOX-FC26", "EA Sports FC 26", "Games", "Xbox Series X", "EA Sports", 249, 12, "../images/game-covers/ea-sports-fc-26.jpg",
    { genre: "Sports", mediaFormat: "Physical disc", popularity: 91, releaseDate: "2025-09-26" }),
  seedProduct("SWITCH-HOGWARTS", "Hogwarts Legacy", "Games", "Nintendo Switch", "Warner Bros. Games", 149, 7, "../images/game-covers/hogwarts-legacy.jpg",
    { genre: "Action RPG", mediaFormat: "Physical cartridge", popularity: 86, releaseDate: "2023-11-14", description: "Physical Nintendo Switch cartridge. Explore the wizarding world on the go." }),
  seedProduct("SWITCH-WITCHER3", "The Witcher 3: Wild Hunt", "Games", "Nintendo Switch", "CD Projekt", 99, 6, "../images/game-covers/the-witcher-3.jpg",
    { genre: "RPG", mediaFormat: "Physical cartridge", popularity: 88, releaseDate: "2019-10-15", description: "Physical Nintendo Switch cartridge with the complete fantasy adventure." }),
  seedProduct("SWITCH-FC26", "EA Sports FC 26", "Games", "Nintendo Switch", "EA Sports", 229, 8, "../images/game-covers/ea-sports-fc-26.jpg",
    { genre: "Sports", mediaFormat: "Physical game card", popularity: 85, releaseDate: "2025-09-26", description: "Physical Nintendo Switch game card. Compatible with Nintendo Switch 2." }),
  seedProduct("SWITCH2-FC26", "EA Sports FC 26", "Games", "Nintendo Switch 2", "EA Sports", 249, 5, "../images/game-covers/ea-sports-fc-26.jpg",
    { genre: "Sports", mediaFormat: "Physical game card", popularity: 87, releaseDate: "2025-09-26", description: "Physical Nintendo Switch 2 game card edition." }),

  seedProduct("ACC-010", "PlayStation DualSense Wireless Controller", "Accessories", "PlayStation 5", "Sony", 329, 18,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Playstation_DualSense_Controller.png/500px-Playstation_DualSense_Controller.png",
    { description: "Official PlayStation 5 DualSense wireless controller with haptic feedback." }),
  seedProduct("ACC-011", "Xbox Wireless Controller", "Accessories", "Xbox", "Microsoft", 289, 16,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Microsoft-Xbox-One-controller.jpg/250px-Microsoft-Xbox-One-controller.jpg",
    { description: "Xbox wireless controller with textured grips." }),
  seedProduct("ACC-JOYCON", "Nintendo Switch Joy-Con Pair", "Accessories", "Nintendo Switch", "Nintendo", 349, 10,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo%20Switch%20Joy-Con%20Controllers.png?width=500",
    { color: "Neon Blue / Neon Red", description: "Pair of detachable Nintendo Switch Joy-Con controllers." }),
  seedProduct("ACC-PROCONTROLLER", "Nintendo Switch Pro Controller", "Accessories", "Nintendo Switch", "Nintendo", 299, 8,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo-Switch-Pro-Controller-FL.jpg?width=500",
    { description: "Nintendo Switch Pro Controller with motion controls and HD rumble." }),
  seedProduct("ACC-012", "Gaming Headset", "Accessories", "Multi-platform", "Afterglow", 199, 7,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Headset%20computer.webp?width=500",
    { description: "Over-ear gaming headset with an adjustable boom microphone." }),
  seedProduct("ACC-KEYBOARD", "Logitech G PRO TKL Gaming Keyboard", "Accessories", "Multi-platform", "Logitech", 499, 6,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Logitech%20G%20PRO%20TKL%20gaming%20keyboard%20-%20English%20%28United%20States%29%20layout.jpg?width=500",
    { description: "Compact tenkeyless gaming keyboard with mechanical switches." }),
  seedProduct("ACC-MOUSE", "Logitech MX518 Gaming Mouse", "Accessories", "Multi-platform", "Logitech", 169, 9,
    "https://commons.wikimedia.org/wiki/Special:FilePath/Logitech%20MX518%20Gaming%20Mouse%20%284777334208%29.jpg?width=500",
    { description: "Wired Logitech gaming mouse with an ergonomic shape and responsive optical sensor." }),
  seedProduct("ACC-CHARGER", "Dual Controller Charging Station", "Accessories", "PlayStation 5", "G-Store", 129, 10,
    "https://media.direct.playstation.com/is/image/sierialto/DualSense-Charging-Station-Hero-1?$Background_Large$",
    { description: "Dual controller charging dock for PlayStation 5 DualSense controllers." }),
  seedProduct("ACC-SSD", "SanDisk Extreme Portable SSD 1TB", "Accessories", "Multi-platform", "SanDisk", 399, 5,
    "https://commons.wikimedia.org/wiki/Special:FilePath/SanDisk%20Extreme%20Portable%20SSD%20-%201TB%2C%20USB-C%20%2841036158305%29.jpg?width=500",
    { storage: "1TB", description: "Portable 1TB USB-C external SSD for compatible gaming setups." })
];

function readStore(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function products() {
  let data = readStore(KEYS.products, null);
  const savedVersion = localStorage.getItem(KEYS.catalogueVersion);
  if (!Array.isArray(data)) {
    data = PRODUCT_SEED.map((product) => ({ ...product }));
    writeStore(KEYS.products, data);
    localStorage.setItem(KEYS.catalogueVersion, CATALOGUE_VERSION);
  } else if (savedVersion !== CATALOGUE_VERSION) {
    const seededIds = new Set(PRODUCT_SEED.map((product) => product.id));
    const savedById = new Map(data.map((product) => [product.id, product]));
    const migratedSeed = PRODUCT_SEED.map((product) => ({
      ...product,
      ...(savedById.has(product.id) ? { stock: Number(savedById.get(product.id).stock) } : {})
    }));
    const customProducts = data.filter((product) =>
      !seededIds.has(product.id) &&
      !String(product.id).startsWith("PC-") &&
      !(["Games", "Video Games", "Consoles"].includes(product.category) &&
        String(product.platform || "").toLowerCase().includes("pc")))
      .map((product) => {
        if (product.category !== "Consoles" && product.category !== "Video Games") return product;
        const platform = String(product.platform || "").toLowerCase();
        const category = product.category === "Video Games" ? "Games" :
          platform.includes("xbox") ? "Xbox" :
            platform.includes("nintendo") || platform.includes("switch") ? "Nintendo" : "PlayStation";
        return { ...product, category };
      });
    data = [...migratedSeed, ...customProducts];
    writeStore(KEYS.products, data);
    const retainedIds = new Set(data.map((product) => product.id));
    const savedCart = readStore(KEYS.cart, []);
    saveCart(Array.isArray(savedCart) ? savedCart.filter((item) => retainedIds.has(item.id)) : []);
    localStorage.setItem(KEYS.catalogueVersion, CATALOGUE_VERSION);
  }
  return data;
}

function saveProducts(data) {
  writeStore(KEYS.products, data);
}

function orders() {
  const data = readStore(KEYS.orders, []);
  return Array.isArray(data) ? data : [];
}

function saveOrders(data) {
  writeStore(KEYS.orders, data);
}

function cart() {
  const data = readStore(KEYS.cart, []);
  return Array.isArray(data) ? data : [];
}

function saveCart(data) {
  writeStore(KEYS.cart, data);
}

function currentUser() {
  return window.IPlayAuth ? window.IPlayAuth.getCurrentUser() : null;
}

function money(amount) {
  return `RM${Number(amount || 0).toFixed(2)}`;
}

function statusForStock(stock) {
  if (Number(stock) <= 0) return "Out of Stock";
  if (Number(stock) <= 5) return "Low Stock";
  return "In Stock";
}

function escapeText(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function stockBadge(stock) {
  const status = statusForStock(stock);
  const classes = status === "In Stock" ? "success" : status === "Low Stock" ? "warning" : "danger";
  return `<span class="badge text-bg-${classes}">${status}</span>`;
}

function productShopCategory(product) {
  if (product.category === "PlayStation") return "playstation";
  if (product.category === "Xbox") return "xbox";
  if (product.category === "Nintendo") return "nintendo";
  if (product.category === "Accessories") return "accessories";
  if (product.category !== "Games" && product.category !== "Video Games") return "";

  const platform = String(product.platform || "").toLowerCase();
  if (platform.includes("playstation") || /^ps[45]\b/.test(platform)) return "games";
  if (platform.includes("xbox")) return "games";
  if (platform.includes("nintendo") || platform.includes("switch")) return "games";
  return "";
}

function displayProductPlatform(product) {
  return String(product.platform || "")
    .split("/")
    .map((platform) => platform.trim())
    .filter((platform) => platform.toLowerCase() !== "pc")
    .join(" / ");
}

function displayProductVariant(product) {
  return product.variantLabel ||
    [product.model, product.edition, product.storage, product.color].filter(Boolean).join(" · ") ||
    product.mediaFormat || "";
}

function productVariantGroup(product) {
  return product.variantGroup ? products().filter((item) => item.variantGroup === product.variantGroup) : [product];
}

function representativeVariant(variants) {
  return [...variants].filter((product) => Number(product.stock) > 0)
    .sort((a, b) => Number(a.price) - Number(b.price))[0] || variants[0];
}

function catalogProductGroups(items) {
  const grouped = new Map();
  items.forEach((product) => {
    const key = product.variantGroup || product.id;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(product);
  });
  return [...grouped.values()];
}

function matchesPlatform(product, platform) {
  if (!platform) return true;
  const platforms = String(product.platform || "").split("/").map((value) => value.trim().toLowerCase());
  if (platform === "PlayStation") return platforms.some((value) => value.includes("playstation") || /^ps[45]\b/.test(value));
  if (platform === "Xbox") return platforms.some((value) => value.includes("xbox"));
  if (platform === "Nintendo Switch") return platforms.some((value) =>
    (value.includes("nintendo switch") || value === "switch") && !value.includes("switch 2"));
  if (platform === "Nintendo Switch 2") return platforms.some((value) => value.includes("switch 2"));
  return platforms.includes(platform.toLowerCase());
}

function addToCart(id, requested = 1) {
  const product = products().find((item) => item.id === id);
  if (!product) return { ok: false, message: "Product not found." };
  if (product.stock <= 0) return { ok: false, message: `${product.name} is out of stock.` };
  requested = Math.floor(Number(requested));
  if (!Number.isInteger(requested) || requested < 1) return { ok: false, message: "Enter a valid quantity." };
  const items = cart();
  const existing = items.find((item) => item.id === id);
  const quantity = existing ? existing.quantity + requested : requested;
  if (quantity > product.stock) return { ok: false, message: `Only ${product.stock} units are available.` };
  if (existing) existing.quantity = quantity;
  else items.push({ id, quantity });
  saveCart(items);
  return { ok: true, message: `${product.name} added to cart.` };
}

function productCard(product, variantOptions = productVariantGroup(product), platform = "") {
  const variants = variantOptions;
  const disabled = variants.every((item) => Number(item.stock) <= 0) ? "disabled" : "";
  const discount = Number(product.discount || 0);
  const originalPrice = Number(product.originalPrice || product.price);
  const groupPrice = Math.min(...variants.filter((item) => item.stock > 0).map((item) => Number(item.price)));
  const price = Number.isFinite(groupPrice) ? groupPrice : Number(product.price);
  const stockCount = variants.reduce((sum, item) => sum + Number(item.stock || 0), 0);
  const title = product.variantGroup ? product.variantGroupLabel || product.variantGroup : product.name;
  const imageFit = product.category === "Games" || product.category === "Video Games" ? "cover-art" : "product-photo";
  const productLink = `product.html?id=${encodeURIComponent(product.id)}${platform ? `&platform=${encodeURIComponent(platform)}` : ""}`;
  return `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <article class="retail-card h-100">
        <a class="retail-image" href="${productLink}" aria-label="View ${escapeText(title)}">
          <img class="${imageFit}" src="${escapeText(product.image)}" alt="${escapeText(title)}" data-product-image>
          ${stockBadge(stockCount)}
          ${discount ? `<span class="shop-discount">-${discount}%</span>` : ""}
        </a>
        <div class="retail-card-body">
          <div class="small text-uppercase text-secondary">${escapeText(displayProductPlatform(product))} · ${escapeText(product.genre || product.mediaFormat || displayProductVariant(product) || product.condition)}</div>
          <h2 class="h5 mt-2"><a href="${productLink}">${escapeText(title)}</a></h2>
          <div class="small text-secondary retail-stock">${product.variantGroup ? "Stock across options" : "Stock"}: ${stockCount}</div>
          <div class="d-flex align-items-center justify-content-between mt-auto">
            <div class="retail-price">${product.variantGroup ? `<small class="text-secondary d-block">${variants.length} configurations available</small>` : discount ? `<small class="text-decoration-line-through text-secondary d-block">${money(originalPrice)}</small>` : ""}<strong class="price">${product.variantGroup ? "From " : ""}${money(price)}</strong></div>
          </div>
          <div class="d-grid gap-2 mt-3">
            <a class="btn btn-outline-light btn-sm" href="${productLink}">View Details</a>
            <button class="btn btn-primary btn-sm add-cart" data-id="${escapeText(product.id)}" type="button" ${disabled}>
              <i class="bi bi-cart-plus me-1"></i>Add to Cart
            </button>
          </div>
        </div>
      </article>
    </div>`;
}

function renderCatalog(containerId = "product-grid") {
  const container = document.getElementById(containerId);
  if (!container) return;
  const query = document.getElementById("product-search")?.value.trim().toLowerCase() || "";
  const platform = document.getElementById("platform-filter")?.value || "";
  const sort = document.getElementById("shop-sort")?.value || "featured";
  const category = document.getElementById("category-filter")?.value || "";
  const filteredProducts = products().filter((product) =>
    productShopCategory(product) &&
    (!category || productShopCategory(product) === category) &&
    matchesPlatform(product, platform) &&
    (!query || `${product.name} ${product.brand} ${displayProductPlatform(product)} ${product.variantLabel || ""}`.toLowerCase().includes(query)));
  const filtered = catalogProductGroups(filteredProducts);
  filtered.sort((a, b) => {
    const first = representativeVariant(a);
    const second = representativeVariant(b);
    if (sort === "price-low") return first.price - second.price;
    if (sort === "price-high") return second.price - first.price;
    if (sort === "newest") return String(second.releaseDate || "").localeCompare(String(first.releaseDate || ""));
    if (sort === "popular") return (second.popularity || 0) - (first.popularity || 0);
    return (second.popularity || 0) - (first.popularity || 0);
  });
  container.innerHTML = filtered.length ? filtered.map((variants) =>
    productCard(representativeVariant(variants), variants, platform)).join("") :
    '<div class="col-12"><div class="empty-state">No products match your selection.</div></div>';
  const feedback = document.getElementById("store-feedback");
  if (feedback) {
    feedback.className = "";
    feedback.innerHTML = `<span class="small text-secondary">${filtered.length} product${filtered.length === 1 ? "" : "s"}</span>`;
  }
  setupProductImageFallbacks();
  container.querySelectorAll(".add-cart").forEach((button) => {
    button.addEventListener("click", () => {
      if (!requestPurchase(button.dataset.id, 1, "add")) return;
      const result = addToCart(button.dataset.id);
      showFeedback(result.message, result.ok ? "success" : "danger");
      updateCartCount();
    });
  });
}

function showFeedback(message, type = "success") {
  const feedback = document.getElementById("store-feedback");
  if (!feedback) return;
  feedback.textContent = message;
  feedback.className = `alert alert-${type} store-feedback`;
}

function updateCartCount() {
  const count = cart().reduce((sum, item) => sum + Number(item.quantity), 0);
  document.querySelectorAll("[data-cart-count]").forEach((element) => element.textContent = count);
}

function getPendingPurchase() {
  try {
    return JSON.parse(sessionStorage.getItem("gstore_pending_purchase"));
  } catch {
    return null;
  }
}

function requestPurchase(id, quantity = 1, action = "add") {
  if (!currentUser()) {
    sessionStorage.setItem("gstore_pending_purchase", JSON.stringify({
      productId: id,
      quantity,
      action,
      returnUrl: action === "buy" ? "customer/checkout.html" : `customer/product.html?id=${encodeURIComponent(id)}&continue=${action}`
    }));
    window.location.href = "../index.html?purchase=1";
    return false;
  }
  return true;
}

function continuePendingPurchase() {
  const continueAction = new URLSearchParams(window.location.search).get("continue");
  const pending = getPendingPurchase();
  if (!pending || !currentUser()) return;
  if (!pending.productId) {
    sessionStorage.removeItem("gstore_pending_purchase");
    return;
  }
  const result = addToCart(pending.productId, pending.quantity || 1);
  sessionStorage.removeItem("gstore_pending_purchase");
  showFeedback(result.message, result.ok ? "success" : "danger");
  updateCartCount();
  if (result.ok && continueAction === "buy") {
    window.location.href = "checkout.html";
  } else if (result.ok && (!continueAction || continueAction === "add") && pending.action !== "buy") {
    window.location.href = "cart.html";
  }
}

function updateStoreNavigation() {
  const user = currentUser();
  const isCustomer = user?.role === "customer";
  const isAuthenticated = isCustomer || user?.role === "staff";
  document.querySelectorAll("[data-auth-logout]").forEach((button) => {
    button.classList.toggle("d-none", !isAuthenticated);
  });
  document.querySelectorAll("[data-customer-nav]").forEach((link) => {
    link.classList.toggle("d-none", !isCustomer);
  });
  document.querySelectorAll("[data-store-signin]").forEach((link) => {
    link.classList.toggle("d-none", isAuthenticated);
  });
  const customerName = document.getElementById("customer-name");
  if (customerName) customerName.textContent = user?.fullName || "";
}

function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const requestedPlatform = new URLSearchParams(window.location.search).get("platform");
  let selectedProduct = products().find((item) => item.id === id);
  if (!selectedProduct) {
    container.innerHTML = '<div class="empty-state">Product not found.</div>';
    return;
  }
  const allVariants = productVariantGroup(selectedProduct);
  const platformVariants = requestedPlatform
    ? allVariants.filter((item) => matchesPlatform(item, requestedPlatform))
    : allVariants;
  const variants = platformVariants.length ? platformVariants : allVariants;
  const dimensions = [
    ["model", "Model"],
    ["edition", "Edition / colour"],
    ["storage", "Storage"],
    ["color", "Colour"]
  ].filter(([key]) => new Set(variants.map((item) => item[key]).filter(Boolean)).size > 1);
  const selectors = dimensions.map(([key, label]) => `
    <div class="col-md-6">
      <label class="form-label" for="variant-${key}">${label}</label>
      <select class="form-select" id="variant-${key}" data-variant-dimension="${key}"></select>
    </div>`).join("");
  container.innerHTML = `
    <div class="row g-4 align-items-start">
      <div class="col-lg-6"><div class="detail-image"><img src="${escapeText(selectedProduct.image)}" alt="${escapeText(selectedProduct.name)}" data-product-image></div></div>
      <div class="col-lg-6">
        <p class="text-info text-uppercase fw-bold detail-platform">${escapeText(selectedProduct.category)} · ${escapeText(displayProductPlatform(selectedProduct))}</p>
        <h1 class="detail-title">${escapeText(selectedProduct.name)}</h1>
        <div class="row g-3 mt-1 mb-3 variant-selectors">${selectors}</div>
        <p class="small text-secondary detail-variant-label">${escapeText(displayProductVariant(selectedProduct))}</p>
        <div class="d-flex gap-2 align-items-center mb-3">
          <strong class="detail-price">${money(selectedProduct.price)}</strong>
          <span class="detail-stock">${stockBadge(selectedProduct.stock)}</span>
        </div>
        <dl class="product-facts">
          <div><dt>Brand</dt><dd class="detail-brand">${escapeText(selectedProduct.brand)}</dd></div>
          <div><dt>Format</dt><dd class="detail-format">${escapeText(selectedProduct.mediaFormat || selectedProduct.condition)}</dd></div>
          <div><dt>Availability</dt><dd class="detail-availability">${selectedProduct.stock} units</dd></div>
        </dl>
        <p class="text-secondary detail-description">${escapeText(selectedProduct.description)}</p>
        <div class="d-flex flex-wrap align-items-center gap-3">
          <input class="form-control bg-white text-dark border-secondary" id="detail-quantity" type="number" min="1" max="${selectedProduct.stock}" value="1" aria-label="Quantity" style="width:90px">
          <button class="btn btn-primary auth-submit px-4" type="button" id="detail-add" ${selectedProduct.stock <= 0 ? "disabled" : ""}><i class="bi bi-cart-plus me-1"></i>Add to cart</button>
          <button class="btn btn-outline-primary px-4" type="button" id="detail-buy" ${selectedProduct.stock <= 0 ? "disabled" : ""}>Buy now</button>
        </div>
      </div>
    </div>`;
  const quantityInput = document.getElementById("detail-quantity");
  const purchaseButtons = [document.getElementById("detail-add"), document.getElementById("detail-buy")];
  const updateVariant = (preferred = selectedProduct) => {
    let compatibleVariants = variants;
    dimensions.forEach(([key]) => {
      const select = container.querySelector(`[data-variant-dimension="${key}"]`);
      const values = [...new Set(compatibleVariants.map((item) => item[key]).filter(Boolean))];
      const selectedValue = values.includes(preferred[key]) ? preferred[key] : values[0];
      select.replaceChildren(...values.map((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        return option;
      }));
      select.value = selectedValue;
      select.disabled = values.length < 2;
      compatibleVariants = compatibleVariants.filter((item) => item[key] === selectedValue);
    });
    selectedProduct = compatibleVariants[0] || preferred;
    const image = container.querySelector(".detail-image img");
    image.src = selectedProduct.image;
    image.alt = selectedProduct.name;
    image.dataset.productImage = "";
    container.querySelector(".detail-platform").textContent =
      `${selectedProduct.category} · ${displayProductPlatform(selectedProduct)}`;
    container.querySelector(".detail-title").textContent = selectedProduct.name;
    container.querySelector(".detail-variant-label").textContent = displayProductVariant(selectedProduct);
    container.querySelector(".detail-price").textContent = money(selectedProduct.price);
    container.querySelector(".detail-stock").innerHTML = stockBadge(selectedProduct.stock);
    container.querySelector(".detail-brand").textContent = selectedProduct.brand;
    container.querySelector(".detail-format").textContent = selectedProduct.mediaFormat || selectedProduct.condition;
    container.querySelector(".detail-availability").textContent = `${selectedProduct.stock} units`;
    container.querySelector(".detail-description").textContent = selectedProduct.description;
    quantityInput.max = selectedProduct.stock;
    quantityInput.value = selectedProduct.stock > 0
      ? Math.min(Number(quantityInput.value) || 1, selectedProduct.stock)
      : 1;
    purchaseButtons.forEach((button) => { button.disabled = selectedProduct.stock <= 0; });
    const platformQuery = requestedPlatform ? `&platform=${encodeURIComponent(requestedPlatform)}` : "";
    window.history.replaceState(null, "", `product.html?id=${encodeURIComponent(selectedProduct.id)}${platformQuery}`);
  };
  dimensions.forEach(([key]) => {
    container.querySelector(`[data-variant-dimension="${key}"]`).addEventListener("change", (event) => {
      const preferred = { ...selectedProduct, [key]: event.target.value };
      updateVariant(preferred);
    });
  });
  updateVariant(selectedProduct);
  document.getElementById("detail-add").addEventListener("click", () => {
    const quantity = Math.max(1, Math.min(Number(quantityInput.value) || 1, selectedProduct.stock));
    if (!requestPurchase(selectedProduct.id, quantity, "add")) return;
    const result = addToCart(selectedProduct.id, quantity);
    showFeedback(result.message, result.ok ? "success" : "danger");
    updateCartCount();
  });
  document.getElementById("detail-buy").addEventListener("click", () => {
    const quantity = Math.max(1, Math.min(Number(quantityInput.value) || 1, selectedProduct.stock));
    if (!requestPurchase(selectedProduct.id, quantity, "buy")) return;
    const result = addToCart(selectedProduct.id, quantity);
    showFeedback(result.message, result.ok ? "success" : "danger");
    updateCartCount();
    if (result.ok) window.location.href = "checkout.html";
  });
  setupProductImageFallbacks();
}

document.addEventListener("DOMContentLoaded", () => {
  products();
  if (window.location.pathname.includes("/staff/")) return;
  updateStoreNavigation();
  continuePendingPurchase();
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  const categoryFilter = document.getElementById("category-filter");
  const categoryButtons = [...document.querySelectorAll("[data-shop-category]")];
  if (categoryFilter && categoryButtons.some((button) => button.dataset.shopCategory === requestedCategory)) {
    categoryFilter.value = requestedCategory;
  }
  categoryButtons.forEach((button) => {
    const active = button.dataset.shopCategory === categoryFilter?.value;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setupProductImageFallbacks();
  updateCartCount();
  if (categoryButtons.length) {
    renderCatalog();
    ["product-search", "platform-filter", "shop-sort"].forEach((id) => {
      document.getElementById(id)?.addEventListener(id === "product-search" ? "input" : "change", () => renderCatalog());
    });
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        categoryButtons.forEach((item) => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        categoryFilter.value = button.dataset.shopCategory;
        renderCatalog();
      });
    });
  }
  renderHomeCollections();
  renderProductDetail();
  renderCart();
  setupCheckout();
  renderOrders();
  setupProfile();
  window.addEventListener("storage", (event) => {
    if (event.key !== KEYS.products) return;
    renderCatalog();
    renderHomeCollections();
    renderProductDetail();
    renderCart();
    renderCheckoutSummary();
    updateCartCount();
  });
});

function renderHomeCollections() {
  const featured = document.getElementById("product-grid");
  if (!featured || document.querySelector("[data-shop-category]")) return;

  const catalogue = products();
  const featuredProducts = ["playstation", "xbox", "nintendo", "games", "accessories"]
    .map((category) => representativeVariant(catalogue.filter((product) => productShopCategory(product) === category)))
    .filter(Boolean);
  featured.innerHTML = featuredProducts.map((product) => productCard(product)).join("");
  setupProductImageFallbacks();
  featured.querySelectorAll(".add-cart").forEach((button) => {
    button.addEventListener("click", () => {
      if (!requestPurchase(button.dataset.id, 1, "add")) return;
      const result = addToCart(button.dataset.id);
      showFeedback(result.message, result.ok ? "success" : "danger");
      updateCartCount();
    });
  });
}

function setupProductImageFallbacks() {
  document.querySelectorAll("img[data-product-image]").forEach((image) => {
    image.addEventListener("error", () => {
      image.removeAttribute("data-product-image");
      image.src = "../images/product-fallback.svg";
    }, { once: true });
  });
  document.querySelectorAll(".retail-image img, .detail-image img").forEach((image) => {
    if (!image.dataset.productImage) return;
    if (image.complete && image.naturalWidth === 0) image.dispatchEvent(new Event("error"));
  });
}

function renderCart() {
  const container = document.getElementById("cart-content");
  if (!container) return;
  const items = cart();
  const resolved = items.map((item) => ({ ...item, product: products().find((product) => product.id === item.id) }))
    .filter((item) => item.product);
  if (!resolved.length) {
    container.innerHTML = '<div class="empty-state"><i class="bi bi-cart3 fs-1 d-block mb-3"></i>Your cart is empty.<br><a href="products.html">Browse products</a></div>';
    document.getElementById("cart-total").textContent = money(0);
    return;
  }
  container.innerHTML = resolved.map(({ product, quantity }) => `
    <div class="cart-item">
      <img src="${escapeText(product.image)}" alt="${escapeText(product.name)}" data-product-image>
      <div class="flex-grow-1"><h2 class="h6 mb-1">${escapeText(product.name)}</h2><div class="small text-secondary">${escapeText(displayProductPlatform(product))}${displayProductVariant(product) ? ` · ${escapeText(displayProductVariant(product))}` : ""}</div></div>
      <div class="cart-controls">
        <input class="form-control form-control-sm cart-quantity" type="number" min="1" max="${product.stock}" value="${quantity}" data-id="${escapeText(product.id)}" aria-label="Quantity">
        <strong>${money(product.price * quantity)}</strong>
        <button class="btn btn-link text-danger remove-cart" data-id="${escapeText(product.id)}" type="button" aria-label="Remove"><i class="bi bi-trash"></i></button>
      </div>
    </div>`).join("");
  container.querySelectorAll(".cart-quantity").forEach((input) => input.addEventListener("change", () => {
    const quantity = Math.max(1, Math.min(Number(input.value), Number(input.max)));
    const items = cart().map((item) => item.id === input.dataset.id ? { ...item, quantity } : item);
    saveCart(items);
    renderCart();
    updateCartCount();
  }));
  container.querySelectorAll(".remove-cart").forEach((button) => button.addEventListener("click", () => {
    saveCart(cart().filter((item) => item.id !== button.dataset.id));
    renderCart();
    updateCartCount();
  }));
  document.getElementById("cart-total").textContent = money(resolved.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
  setupProductImageFallbacks();
}

function renderCheckoutSummary() {
  const form = document.getElementById("checkout-form");
  if (!form) return;
  const items = cart();
  const checkoutTotal = document.getElementById("checkout-total");
  const summary = document.getElementById("checkout-summary");
  if (!items.length) {
    form.querySelector("button[type='submit']").disabled = true;
    if (summary) summary.innerHTML = '<p class="text-secondary">Your cart is empty.</p>';
    if (checkoutTotal) checkoutTotal.textContent = money(0);
    return;
  }
  let total = 0;
  if (summary) summary.innerHTML = items.map((item) => {
    const product = products().find((entry) => entry.id === item.id);
    if (!product) return "";
    total += product.price * item.quantity;
    return `<div class="d-flex justify-content-between mb-2"><span>${escapeText(product.name)}${displayProductVariant(product) ? ` · ${escapeText(displayProductVariant(product))}` : ""} × ${item.quantity}</span><strong>${money(product.price * item.quantity)}</strong></div>`;
  }).join("");
  if (checkoutTotal) checkoutTotal.textContent = money(total);
  form.querySelector("button[type='submit']").disabled = false;
}

function setupCheckout() {
  const form = document.getElementById("checkout-form");
  if (!form) return;
  renderCheckoutSummary();
  if (!cart().length) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const customer = currentUser();
    const currentProducts = products();
    const currentCart = cart();
    for (const item of currentCart) {
      const product = currentProducts.find((entry) => entry.id === item.id);
      if (!product || item.quantity > product.stock) {
        showFeedback(`${product ? product.name : "A product"} no longer has enough stock.`, "danger");
        return;
      }
    }
    let orderTotal = 0;
    const orderItems = currentCart.map((item) => {
      const product = currentProducts.find((entry) => entry.id === item.id);
      product.stock = Math.max(0, product.stock - item.quantity);
      product.availability = statusForStock(product.stock);
      orderTotal += product.price * item.quantity;
      return {
        productId: product.id,
        name: `${product.name}${displayProductVariant(product) ? ` · ${displayProductVariant(product)}` : ""}`,
        quantity: item.quantity,
        price: product.price
      };
    });
    saveProducts(currentProducts);
    const allOrders = orders();
    const order = {
      id: `IPL-${Date.now()}`,
      customer: customer.fullName,
      customerEmail: customer.email,
      items: orderItems,
      total: orderTotal,
      status: "Processing",
      stockDeducted: true,
      createdAt: new Date().toISOString()
    };
    saveOrders([order, ...allOrders]);
    saveCart([]);
    window.location.href = `orders.html?success=${encodeURIComponent(order.id)}`;
  });
}

function renderOrders() {
  const container = document.getElementById("orders-list");
  if (!container) return;
  const user = currentUser();
  const success = new URLSearchParams(window.location.search).get("success");
  if (success) showFeedback(`Order ${success} placed successfully.`, "success");
  const userOrders = orders().filter((order) => order.customerEmail === user.email).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  container.innerHTML = userOrders.length ? userOrders.map((order) => `
    <article class="management-panel mb-3">
      <div class="d-flex flex-wrap justify-content-between gap-2"><div><strong>#${escapeText(order.id)}</strong><div class="small text-secondary">${new Date(order.createdAt).toLocaleDateString()}</div></div><span class="badge text-bg-secondary">${escapeText(order.status)}</span></div>
      <hr>
      ${order.items.map((item) => `<div class="d-flex justify-content-between small mb-1"><span>${escapeText(item.name)} × ${item.quantity}</span><span>${money(item.price * item.quantity)}</span></div>`).join("")}
      <div class="d-flex justify-content-end mt-3"><strong>Total: ${money(order.total)}</strong></div>
    </article>`).join("") : '<div class="empty-state">You have no orders yet.</div>';
}

function setupProfile() {
  const form = document.getElementById("profile-form");
  if (!form) return;
  form.elements.fullName.value = currentUser().fullName;
  form.elements.email.value = currentUser().email;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const updated = { ...currentUser(), fullName: form.elements.fullName.value.trim() };
    localStorage.setItem("iplay_currentUser", JSON.stringify(updated));
    showFeedback("Profile updated successfully.", "success");
  });
}
