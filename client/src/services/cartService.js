const API_BASE_URL = "http://localhost:8080";

export const addToCart = async (productId, quantity = 1) => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   throw new Error("User not authenticated");
    // }
    console.log("addToCart", productId);
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: productId, quantity: quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add to cart");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   throw new Error("User not authenticated");
    // }

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get cart");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
};

export const getCartCount = async () => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   throw new Error("User not authenticated");
    // }

    const response = await fetch(`${API_BASE_URL}/cart/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get cart count");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting cart count:", error);
    throw error;
  }
};

export const updateCartItem = async (productId, quantity) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/cart/upadate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update cart");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to remove from cart");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to remove from cart");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};
