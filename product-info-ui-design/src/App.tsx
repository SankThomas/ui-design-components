import { useEffect, useState } from "react";
import {
  Check,
  Heart,
  Minus,
  PackageCheck,
  Plus,
  ShoppingCart,
  Trash2,
  Truck,
  X,
} from "lucide-react";

const PRODUCT = {
  id: "razer-kraken-kitty-quartz",
  name: "Razer Kraken Kitty Edt Gaming Headset Quartz",
  category: "Gaming audio",
  image:
    "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=85",
  originalPrice: 1599,
  price: 799,
  stock: 50,
  shipping: 0,
};

type CartItem = {
  productId: string;
  quantity: number;
};

type Notice = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

const currency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace("$", "$");

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>("product-demo-cart", []),
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>("product-demo-wishlist", []),
  );
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const isWishlisted = wishlist.includes(PRODUCT.id);
  const cartItem = cart.find((item) => item.productId === PRODUCT.id);
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.productId === PRODUCT.id ? PRODUCT.price * item.quantity : 0),
    0,
  );
  const savings = cart.reduce(
    (sum, item) =>
      sum +
      (item.productId === PRODUCT.id
        ? (PRODUCT.originalPrice - PRODUCT.price) * item.quantity
        : 0),
    0,
  );

  useEffect(() => {
    localStorage.setItem("product-demo-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("product-demo-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(null), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!cartOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen]);

  function showNotice(message: string, type: Notice["type"] = "success") {
    setNotice({ id: Date.now(), message, type });
  }

  function addToCart(amount = quantity) {
    const currentQuantity = cartItem?.quantity ?? 0;

    if (amount < 1 || currentQuantity + amount > PRODUCT.stock) {
      showNotice(
        `Only ${PRODUCT.stock - currentQuantity} more unit(s) can be added.`,
        "error",
      );
      return;
    }

    setCart((items) => {
      const existing = items.find((item) => item.productId === PRODUCT.id);

      if (existing) {
        return items.map((item) =>
          item.productId === PRODUCT.id
            ? { ...item, quantity: item.quantity + amount }
            : item,
        );
      }

      return [...items, { productId: PRODUCT.id, quantity: amount }];
    });

    showNotice(`${amount} ${amount === 1 ? "item" : "items"} added to cart.`);
    setCheckoutMessage("");
  }

  function updateCartQuantity(nextQuantity: number) {
    if (nextQuantity <= 0) {
      removeFromCart();
      return;
    }

    if (nextQuantity > PRODUCT.stock) {
      showNotice(`Only ${PRODUCT.stock} units are available.`, "error");
      return;
    }

    setCart((items) =>
      items.map((item) =>
        item.productId === PRODUCT.id
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    );

    setCheckoutMessage("");
  }

  function removeFromCart() {
    setCart((items) => items.filter((item) => item.productId !== PRODUCT.id));
    setCheckoutMessage("");
    showNotice("Product removed from cart.", "info");
  }

  function toggleWishlist() {
    setWishlist((items) =>
      items.includes(PRODUCT.id)
        ? items.filter((id) => id !== PRODUCT.id)
        : [...items, PRODUCT.id],
    );

    showNotice(
      isWishlisted ? "Removed from your wishlist." : "Saved to your wishlist.",
    );
  }

  function handleCheckout() {
    setCheckoutMessage(
      "Demo checkout: no payment has been taken and no order has been placed.",
    );
  }

  return (
    <main className="product-page">
      <div className="product-glow product-glow-one" aria-hidden="true" />
      <div className="product-glow product-glow-two" aria-hidden="true" />

      <button
        type="button"
        className="cart-counter"
        onClick={() => {
          setCartOpen(true);
          setCheckoutMessage("");
        }}
        aria-label={`Open cart, ${cartQuantity} items`}
      >
        <span className="cart-counter-icon">
          <ShoppingCart aria-hidden="true" />
          {cartQuantity > 0 && (
            <span className="cart-count">{cartQuantity}</span>
          )}
        </span>
        Cart
      </button>

      <article className="product-card">
        <div className="product-visual">
          <div className="product-image-orbit" aria-hidden="true" />
          <div className="product-image-orbit-inner" aria-hidden="true" />

          <img
            className="product-image"
            src={PRODUCT.image}
            alt={PRODUCT.name}
          />

          <div className="product-image-tag">
            <span className="product-image-tag-dot" />
            In stock and ready to ship
          </div>
        </div>

        <div className="product-details">
          <div className="product-topline">
            <span className="shipping-badge">
              <Truck className="size-3.5" aria-hidden="true" />
              Free shipping
            </span>
            <span className="product-category">{PRODUCT.category}</span>
          </div>

          <h1 className="product-title">{PRODUCT.name}</h1>

          <p className="product-subtitle">
            Comfortable gaming audio with a distinctive design.
          </p>

          <div className="product-divider" />

          <div className="product-price-row">
            <div>
              <p className="product-old-price">
                {currency(PRODUCT.originalPrice)}
              </p>
              <p className="product-price">{currency(PRODUCT.price)}</p>
              <p className="product-price-note">
                Prices shown for demonstration
              </p>
            </div>
            <span className="discount-badge">
              {Math.round((1 - PRODUCT.price / PRODUCT.originalPrice) * 100)}%
              OFF
            </span>
          </div>

          <div className="product-offer">
            <PackageCheck aria-hidden="true" />
            <p>
              <strong>Special offer.</strong> Available while stocks last.
            </p>
          </div>

          <div className="quantity-picker">
            <span className="quantity-label">Quantity</span>
            <div className="quantity-control">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus aria-hidden="true" />
              </button>
              <output aria-live="polite">{quantity}</output>
              <button
                type="button"
                onClick={() =>
                  setQuantity((value) => Math.min(PRODUCT.stock, value + 1))
                }
                disabled={quantity >= PRODUCT.stock}
                aria-label="Increase quantity"
              >
                <Plus aria-hidden="true" />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="add-cart-button"
            onClick={() => addToCart()}
            disabled={cartQuantity + quantity > PRODUCT.stock}
          >
            <ShoppingCart aria-hidden="true" />
            Add to cart · {currency(PRODUCT.price * quantity)}
          </button>

          <p className="stock-status">
            <span className="stock-dot" aria-hidden="true" />
            {Math.max(0, PRODUCT.stock - (cartItem?.quantity ?? 0))} units
            available to add
          </p>

          <div className="product-actions">
            <button
              type="button"
              className="product-secondary-button"
              onClick={() => addToCart(1)}
              disabled={cartQuantity >= PRODUCT.stock}
            >
              <ShoppingCart aria-hidden="true" />
              Add one
            </button>

            <button
              type="button"
              className={`product-secondary-button ${
                isWishlisted ? "product-secondary-button-active" : ""
              }`}
              onClick={toggleWishlist}
              aria-pressed={isWishlisted}
            >
              <Heart
                aria-hidden="true"
                fill={isWishlisted ? "currentColor" : "none"}
              />
              {isWishlisted ? "Wishlisted" : "Add to wishlist"}
            </button>
          </div>

          {notice && (
            <div
              key={notice.id}
              className={`product-feedback product-feedback-${notice.type}`}
              role="status"
              aria-live="polite"
            >
              <div className="product-feedback-content">
                <Check aria-hidden="true" />
                <p>{notice.message}</p>
              </div>
            </div>
          )}
        </div>
      </article>

      {cartOpen && (
        <div
          className="drawer-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCartOpen(false);
            }
          }}
        >
          <section
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <header className="cart-drawer-header">
              <div>
                <h2 id="cart-title">Your cart</h2>
                <p>
                  {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                className="drawer-close"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                autoFocus
              >
                <X aria-hidden="true" />
              </button>
            </header>

            {cartItem ? (
              <>
                <div className="cart-line-item">
                  <div className="cart-product-image">
                    <img src={PRODUCT.image} alt="" />
                  </div>

                  <div className="cart-product-info">
                    <h3>{PRODUCT.name}</h3>
                    <p className="cart-unit-price">
                      {currency(PRODUCT.price)} each
                    </p>

                    <div className="quantity-control cart-quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(cartItem.quantity - 1)
                        }
                        aria-label="Decrease cart quantity"
                      >
                        <Minus aria-hidden="true" />
                      </button>
                      <output>{cartItem.quantity}</output>
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(cartItem.quantity + 1)
                        }
                        disabled={cartItem.quantity >= PRODUCT.stock}
                        aria-label="Increase cart quantity"
                      >
                        <Plus aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-end">
                    <strong>
                      {currency(PRODUCT.price * cartItem.quantity)}
                    </strong>
                    <button
                      type="button"
                      className="remove-cart-item"
                      onClick={removeFromCart}
                      aria-label="Remove product from cart"
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{currency(subtotal)}</strong>
                  </div>
                  <div>
                    <span>Shipping</span>
                    <strong className="free-shipping-value">Free</strong>
                  </div>
                  <div>
                    <span>You save</span>
                    <strong className="savings-value">
                      {currency(savings)}
                    </strong>
                  </div>
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>{currency(subtotal)}</strong>
                  </div>
                  <p className="cart-disclaimer">
                    Final taxes and payment details would be confirmed at
                    checkout in a real store.
                  </p>

                  <button
                    type="button"
                    className="add-cart-button"
                    onClick={handleCheckout}
                  >
                    Continue to checkout
                  </button>

                  {checkoutMessage && (
                    <p className="checkout-message" role="status">
                      {checkoutMessage}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span className="empty-cart-icon">
                  <ShoppingCart aria-hidden="true" />
                </span>
                <h3>Your cart is empty</h3>
                <p>Add this headset to see it here.</p>
                <button
                  type="button"
                  className="add-cart-button"
                  onClick={() => setCartOpen(false)}
                >
                  Continue shopping
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
