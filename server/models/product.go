package models

import "time"

type Seller struct {
	SellerID string `json:"seller_id" db:"seller_id"`
	SellerName string `json:"seller_name" db:"seller_name"`
	ShopURL string `json:"shop_url" db:"shop_url"`
	SellerRating float64 `json:"seller_rating" db:"seller_rating"`
	SellerProducts int `json:"seller_products" db:"seller_products"`
	SellerFollowers int `json:"seller_followers" db:"seller_followers"`
	SellerChatsRespondedPercentage int `json:"seller_chats_responded_percentage" db:"seller_chats_responded_percentage"`
	SellerChatTimeReply string `json:"seller_chat_time_reply" db:"seller_chat_time_reply"`
	SellerJoinedDate time.Time `json:"seller_joined_date" db:"seller_joined_date"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// Helper structs for JSON fields
type ProductSpecification struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

type ProductVariation struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

type Voucher struct {
	Claimable          bool      `json:"claimable"`
	Currency           string    `json:"currency"`
	Discount           *int      `json:"discount"`
	DiscountCap        int       `json:"discount_cap"`
	DiscountPercentage int       `json:"discount_percentage"`
	MinSpend           int       `json:"min_spend"`
	ShopVoucher        string    `json:"shop_vouncher"`
	SpecialCondition   string    `json:"special_condition"`
	TextInfo           string    `json:"text_info"`
	ValidityEnd        time.Time `json:"validity_end"`
	ValidityStart      time.Time `json:"validity_start"`
}

type Product struct {
	ID                    string  `json:"id" db:"id"`
	URL                   string  `json:"url" db:"url"`
	Title                 string  `json:"title" db:"title"`
	Sold                  int     `json:"sold" db:"sold"`
	Rating                float64 `json:"rating" db:"rating"`
	Reviews               int     `json:"reviews" db:"reviews"`
	InitialPrice          float64 `json:"initial_price" db:"initial_price"`
	FinalPrice            float64 `json:"final_price" db:"final_price"`
	Currency              string  `json:"currency" db:"currency"`
	Stock                 int     `json:"stock" db:"stock"`
	Image                 []string  `json:"image" db:"image"`
	Video                 []string  `json:"video" db:"video"`
	Breadcrumb            []string  `json:"breadcrumb" db:"breadcrumb"`
	ProductSpecifications []ProductSpecification   `json:"product_specifications" db:"product_specifications"`
	ProductDescription    string  `json:"product_description" db:"product_description"`
	CategoryID            int     `json:"category_id" db:"category_id"`
	FlashSale             int     `json:"flash_sale" db:"flash_sale"`
	FlashSaleTime         string  `json:"flash_sale_time" db:"flash_sale_time"`
	ProductVariation      []ProductVariation       `json:"product_variation" db:"product_variation"`
	GmvCal                float64 `json:"gmv_cal" db:"gmv_cal"`
	CategoryURL           string  `json:"category_url" db:"category_url"`
	Vouchers              []Voucher                `json:"vouchers" db:"vouchers"`
	IsAvailable           int     `json:"is_available" db:"is_available"`
	ProductRatings        float64 `json:"product_ratings" db:"product_ratings"`
	SellerID              string  `json:"seller_id" db:"seller_id"`
	CreatedAt             time.Time `json:"created_at" db:"created_at"`
	UpdatedAt             time.Time `json:"updated_at" db:"updated_at"`
}

type ProductResponse struct {
	ID                    string  `json:"id"`
	Title                 string  `json:"title"`
	Sold                  int     `json:"sold"`
	Rating                float64 `json:"rating"`
	Reviews               int     `json:"reviews"`
	InitialPrice          float64 `json:"initial_price"`
	FinalPrice            float64 `json:"final_price"`
	Currency              string  `json:"currency"`
	Stock                 int     `json:"stock"`
	Image                 string  `json:"image"`
	ProductDescription    string  `json:"product_description"`
	SellerID              string  `json:"seller_id"`
	SellerName            string  `json:"seller_name"`
	SellerRating          float64 `json:"seller_rating"`
	DiscountPercentage    int     `json:"discount_percentage"`
}