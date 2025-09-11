package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() error {
	// Db config
	dbUser := os.Getenv("DB_USER")
	dbPw := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	createDBIfNotExists(dbUser, dbPw, dbHost, dbPort, dbName);

	// Db connection string
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPw, dbHost, dbPort, dbName)

	// Connect to db
	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		return fmt.Errorf("failed to connect to db: %w", err)
	}
	// Test connection
	if err = DB.Ping(); err != nil {
		return fmt.Errorf("failed to ping db: %w", err)
	}
	// Set max open connections
	DB.SetMaxOpenConns(10)
	// Set max idle connections
	DB.SetMaxIdleConns(5)
	// Set connection max lifetime
	DB.SetConnMaxLifetime(time.Hour * 6)

	// Create tables if not exists
	if err = createTables(); err != nil {
		return fmt.Errorf("failed to create tables: %w", err)
	}

	log.Println("MySQL database initialized successfully")
	return nil
}
func createDBIfNotExists(user, pw, host, port, dbName string) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/", user, pw, host, port)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Printf("failed to connect to db: %w", err)
		return
	}
	defer db.Close()
	
	// Check if database exists
	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS `%s`", dbName))
	if err != nil {
		log.Printf("Warning: Could not create database: %v", err)
	} else {
		log.Printf("Database '%s' ready", dbName)
	}

}
func createTables() error {
	
	createUsersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id INT AUTO_INCREMENT PRIMARY KEY,
		first_name VARCHAR(255) NOT NULL,
		last_name VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		password VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	)
	`
	_, err := DB.Exec(createUsersTable)
	if err != nil {
		return fmt.Errorf("failed to create users table: %w", err)
	}


	// createUserSessionsTable := `
	// CREATE TABLE IF NOT EXISTS user_sessions (
	// 	id INT AUTO_INCREMENT PRIMARY KEY,
	// )

	createSellersTable := `
	CREATE TABLE IF NOT EXISTS sellers (
	seller_id VARCHAR(50) PRIMARY KEY,
	seller_name VARCHAR(255) NOT NULL,
	shop_url TEXT,
	seller_rating DECIMAL(2,1) DEFAULT 0.0,
	seller_products INT DEFAULT 0,
	seller_followers INT DEFAULT 0,
	seller_chats_responded_percentage INT DEFAULT 0,
	seller_chat_time_reply VARCHAR(255) NOT NULL,
	seller_joined_date DATETIME,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	)`

	_, err = DB.Exec(createSellersTable)
	if err != nil {
		return fmt.Errorf("failed to create sellers table: %w", err)
	}

	createProductsTable := `
	CREATE TABLE IF NOT EXISTS products (
		id VARCHAR(50) PRIMARY KEY,
		url TEXT,
		title TEXT,
		sold INT DEFAULT 0,
		rating DECIMAL(2,1) DEFAULT 0.0,
		reviews INT DEFAULT 0,
		initial_price DECIMAL(10,2) DEFAULT 0.00,
		final_price DECIMAL(10,2) DEFAULT 0.00,
		currency VARCHAR(10),
		stock INT DEFAULT 0,
		image TEXT,
		video TEXT,
		breadcrumb TEXT,
		product_specifications TEXT,
		product_description TEXT,
		category_id INT DEFAULT 0,
		flash_sale TINYINT(1) DEFAULT 0,
		flash_sale_time VARCHAR(255),
		product_variation TEXT,
		gmv_cal DECIMAL(15,2) DEFAULT 0.00,
		category_url TEXT,
		vouchers TEXT,
		is_available TINYINT(1) DEFAULT 0,
		product_ratings DECIMAL(2,1) DEFAULT 0.0,
		seller_id VARCHAR(50),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		FOREIGN KEY (seller_id) REFERENCES sellers(seller_id) ON DELETE SET NULL
	)`
	_, err= DB.Exec(createProductsTable)
	if err != nil {
		fmt.Errorf("failed to create products table: %w", err)
	}

	log.Println("Database tables created successfully")
	return nil
}

func CloseDB() {
	if DB != nil {
		DB.Close()
	}
}