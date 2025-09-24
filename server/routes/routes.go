package routes

import (
	"server/handlers"
	// "server/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	// Public routes
	auth := router.Group("/auth")
	{
		auth.POST("/signup", handlers.Signup)
		auth.POST("/login", handlers.Login)
	}
	products := router.Group("/products")
	{
		products.GET("", handlers.GetProducts)
		products.GET("/:id", handlers.GetProductByID)
	}
	sellers := router.Group("/sellers")
	{
		sellers.GET("/:id", handlers.GetSellerByID)
	}
}