const API_BASE_URL = "http://localhost:8080";

export const GetProducts = async (params) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);

    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log("error get products", errorData);
      throw new Error(errorData.error || "Failed to fetch products");
    }

    const data = await response.json();
    console.log("get products", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const GetProductByID = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
export const GetSellers = async () => {};
export const GetSellerByID = async () => {};
