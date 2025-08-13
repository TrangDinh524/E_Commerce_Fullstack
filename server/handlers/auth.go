package handlers
import (
	"database/sql"
	"fmt"
	"net/http"

	"server/database"
	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func Signup(c *gin.Context) { 
	var req models.SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var existingUser models.User
	err := database.DB.QueryRow("SELECT id FROM users WHERE email = ?", req.Email).Scan(&existingUser.ID)
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User with this email already exists"})
		return
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Insert user into database
	_, err = database.DB.Exec("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)", req.FirstName, req.LastName, req.Email, hashedPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create user: %v", err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}
func Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("req", req)

	// Check if user exists
	var user models.User
	err := database.DB.QueryRow("SELECT id, password FROM users WHERE email = ?", req.Email).Scan(&user.ID, &user.Password)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}
	fmt.Println("user", user.Password)
	fmt.Println("req.Password", req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Check password
	if !utils.CheckHashedPassword(req.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT token
	// token, err := utils.GenerateToken(user.ID)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
	// }

	user.Password = ""
	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "user": user})
}