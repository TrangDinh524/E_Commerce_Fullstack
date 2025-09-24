package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"server/database"
	"server/models"

	"github.com/gin-gonic/gin"
)

func GetProducts(c *gin.Context) { 
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "10")

	// Convert page and limit to integers
	pageInt, err := strconv.Atoi(page)
	if err != nil || pageInt < 1 {
		pageInt = 1
	}

	limitInt, err := strconv.Atoi(limit)
	if err != nil || limitInt < 1 {
		limitInt = 20
	}

	// Calculate offset
	offset := (pageInt - 1) * limitInt
	
	// Build the query
	query := `
		SELECT p.id, p.title, p.sold, p.rating, p.reviews, p.initial_price, 
		       p.final_price, p.currency, p.stock, p.image, p.product_description, 
		       p.seller_id, s.seller_name, s.seller_rating
		FROM products p
		LEFT JOIN sellers s ON p.seller_id = s.seller_id
		WHERE 1=1
	`

	args := []interface{}{}

	// Add pagination
	query += " LIMIT ? OFFSET ?"
	args = append(args, limitInt, offset)

	// Execute query
	rows, err := database.DB.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}
	defer rows.Close()

	var products []models.ProductResponse
	for rows.Next() {
		var product models.ProductResponse
		var imageJSON string
		
		err := rows.Scan(
			&product.ID, &product.Title, &product.Sold, &product.Rating,
			&product.Reviews, &product.InitialPrice, &product.FinalPrice,
			&product.Currency, &product.Stock, &imageJSON, &product.ProductDescription,
			&product.SellerID, &product.SellerName, &product.SellerRating,
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan product"})
			return
		}

		// Parse image JSON to get first image
		var images []string
		if err := json.Unmarshal([]byte(imageJSON), &images); err == nil && len(images) > 0 {
			product.Image = images[0]
		}

		// Calculate discount percentage
		if product.InitialPrice > 0 && product.FinalPrice > 0 {
			product.DiscountPercentage = int(((product.InitialPrice - product.FinalPrice) / product.InitialPrice) * 100)
		}

		products = append(products, product)
	}
	// // Calculate total pages and total products
	// totalProducts := totalProducts
	// totalPages := (totalProducts + limitInt - 1) / limitInt
	c.JSON(http.StatusOK, gin.H{
		"products": products,
		"pagination": gin.H{
			"current_page": pageInt,
		},
	})

}
func GetProductByID(c *gin.Context) { 
	id := c.Param("id")
	fmt.Println("id", id)

	query := `
	SELECT p.id, p.title, p.sold, p.rating, p.reviews, p.initial_price, 
			p.final_price, p.currency, p.stock, p.image, p.video, p.breadcrumb,
			p.product_specifications, p.product_description, p.category_id,
			p.flash_sale, p.flash_sale_time, p.product_variation, p.gmv_cal,
			p.category_url, p.vouchers, p.is_available, p.product_ratings,
			s.seller_id, s.seller_name, s.seller_rating, s.shop_url,
			s.seller_products, s.seller_followers, s.seller_chats_responded_percentage,
			s.seller_chat_time_reply
	 FROM products p
	 LEFT JOIN sellers s ON p.seller_id = s.seller_id
	 WHERE p.id = ?
	 `
	var product models.Product
	var seller models.Seller
	var imageJSON, videoJSON, breadcrumbJSON, specsJSON, variationJSON, vouchersJSON string

	err := database.DB.QueryRow(query, id).Scan(
		&product.ID, &product.Title, &product.Sold, &product.Rating,
		&product.Reviews, &product.InitialPrice, &product.FinalPrice,
		&product.Currency, &product.Stock, &imageJSON, &videoJSON,
		&breadcrumbJSON, &specsJSON, &product.ProductDescription,
		&product.CategoryID, &product.FlashSale, &product.FlashSaleTime,
		&variationJSON, &product.GmvCal, &product.CategoryURL,
		&vouchersJSON, &product.IsAvailable, &product.ProductRatings,
		&seller.SellerID, &seller.SellerName, &seller.SellerRating,
		&seller.ShopURL, &seller.SellerProducts, &seller.SellerFollowers,
		&seller.SellerChatsRespondedPercentage, &seller.SellerChatTimeReply,
	)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch product"})
		fmt.Println("error", err)
		return
	}
	// Parse JSON fields
	if imageJSON != "" && imageJSON != "null" {
		if err := json.Unmarshal([]byte(imageJSON), &product.Image); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse image data"})
			fmt.Println("error image", err)
			return
		}
	} else {
		product.Image = []string{}
	}
	
	if videoJSON != "" && videoJSON != "null" {
		if err := json.Unmarshal([]byte(videoJSON), &product.Video); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse video data"})
			fmt.Println("error video", err)
			return
		}
	} else {
		product.Video = []string{}
	}
	
	if breadcrumbJSON != "" && breadcrumbJSON != "null" {
		if err := json.Unmarshal([]byte(breadcrumbJSON), &product.Breadcrumb); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse breadcrumb data"})
			fmt.Println("error breadcrumb", err)
			return
		}
	} else {
		product.Breadcrumb = []string{}
	}

	if specsJSON != "" && specsJSON != "null" {
		if err := json.Unmarshal([]byte(specsJSON), &product.ProductSpecifications); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse product specifications"})
			fmt.Println("error product specifications", err)
			return
		}
	} else {
		product.ProductSpecifications = []models.ProductSpecification{}
	}
	
	if variationJSON != "" && variationJSON != "null" {
		if err := json.Unmarshal([]byte(variationJSON), &product.ProductVariation); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse product variation"})
			fmt.Println("error product variation", err)
			return
		}
	} else {
		product.ProductVariation = []models.ProductVariation{}
	}
	
	if vouchersJSON != "" && vouchersJSON != "null" {
		if err := json.Unmarshal([]byte(vouchersJSON), &product.Vouchers); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse vouchers data"})
			fmt.Println("error vouchers", err)
			return
		}
	} else {
		product.Vouchers = []models.Voucher{}
	}

	fmt.Println("product image", product, imageJSON)
	c.JSON(http.StatusOK, gin.H{"product": product, "seller": seller})
}	
func GetSellerByID(c *gin.Context) {}