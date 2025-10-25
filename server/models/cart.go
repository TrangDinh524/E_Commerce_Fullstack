package models

import "time"

type Cart struct {
	ID        uint      `json:"id" db:"id"`
	UserID    uint      `json:"user_id" db:"user_id"`
	ProductID string    `json:"product_id" db:"product_id"`
	Quantity  int       `json:"quantity" db:"quantity"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

type CartItem struct {
	ID          uint    `json:"id" db:"id"`
	UserID      uint    `json:"user_id" db:"user_id"`
	ProductID   string  `json:"product_id" db:"product_id"`
	Quantity    int     `json:"quantity" db:"quantity"`
	Price       float64 `json:"price" db:"price"`
	Currency    string  `json:"currency" db:"currency"`
	ProductTitle string `json:"product_title" db:"product_title"`
	ProductImage string `json:"product_image" db:"product_image"`
	ProductRating float64 `json:"product_rating" db:"product_rating"`
	ProductStock int `json:"product_stock" db:"product_stock"`
	ProductSeller string `json:"product_seller" db:"product_seller"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

type AddToCartRequest struct {
	ProductID string `json:"product_id" binding:"required"`
	Quantity  int    `json:"quantity" binding:"required,min=1"`
}

type CartResponse struct {
	Cart  []CartItem `json:"cart"`
	Count int        `json:"count"`
}