package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"server/database"
	"server/models"
	"time"

	"github.com/gin-gonic/gin"
)

func AddToCart(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		userID = 3
		// c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		// return
	}
	var req models.AddToCartRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Println("AddToCart: Error binding JSON", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if item already exists in cart
	var existingQuantity int
	err := database.DB.QueryRow("SELECT quantity FROM carts WHERE user_id = ? AND product_id = ?", userID, req.ProductID).Scan(&existingQuantity)
	if err == sql.ErrNoRows {
		// Add new item to cart
		_, err = database.DB.Exec("INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)", userID, req.ProductID, req.Quantity)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add to carts"})
			return
		}
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	} else {
		// Update existing item quantity
		_, err = database.DB.Exec("UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?", req.Quantity, userID, req.ProductID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update carts"})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Product added to carts successfully",
	})
}
func GetCart(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		userID = 3
		// c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		// return
	}
	query := `
	SELECT c.id, c.user_id, c.product_id, c.quantity, c.created_at,
		       p.final_price, p.currency, p.title, p.image, p.rating, p.stock,
		       s.seller_name
	FROM  carts c 
	LEFT JOIN products p ON c.product_id = p.id
	LEFT JOIN sellers s ON p.seller_id = s.seller_id
	WHERE c.user_id = ?
	ORDER BY c.created_at DESC
	`
	rows, err := database.DB.Query(query, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch cart"})
		return
	}

	var cartItems []models.CartItem
	var totalCount int

	for rows.Next() {
		var item models.CartItem
		var imageJSON string
		var createdAtStr string

		// Add debug logging

		err := rows.Scan(
			&item.ID, &item.UserID, &item.ProductID, &item.Quantity, &createdAtStr,
			&item.Price, &item.Currency, &item.ProductTitle, &imageJSON, &item.ProductRating, &item.ProductStock,
			&item.ProductSeller,
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan cart item"})
			return
		}

		// Parse the created_at string to time.Time
		if parsedTime, err := time.Parse("2006-01-02 15:04:05", createdAtStr); err == nil {
			item.CreatedAt = parsedTime
		}		
		
		// Parse image JSON to get first image
		var images []string
		if err := json.Unmarshal([]byte(imageJSON), &images); err == nil && len(images) > 0 {
			item.ProductImage = images[0]
		}

		totalCount += item.Quantity
		cartItems = append(cartItems, item)
	}
	response := models.CartResponse{
		Cart:  cartItems,
		Count: totalCount,
	}

	c.JSON(http.StatusOK, response)
	
}

func GetCartCount(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		userID = 3
		// c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		// return
	}

	var count int
	err := database.DB.QueryRow("SELECT COALESCE(SUM(quantity), 0) FROM carts WHERE user_id = ?", userID).Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get cart count"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"count": count})
}