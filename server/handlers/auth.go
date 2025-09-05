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

	// Check if user exists
	var user models.User
	err := database.DB.QueryRow("SELECT id, first_name, last_name, email, password FROM users WHERE email = ?", req.Email).Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password)	
	if err == sql.ErrNoRows {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

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
	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	fmt.Println("user", user)
	// Return only essential user data
	userResponse := gin.H{
		"id":        user.ID,
		"firstName": user.FirstName,
		"lastName":  user.LastName,
		"email":     user.Email,
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful", 
		"user": userResponse,
		"token": token,
	})
}