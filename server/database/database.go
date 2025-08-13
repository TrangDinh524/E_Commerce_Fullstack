package database

import (
	"database/sql"
	"log"
	"time"
	"os"
	"fmt"

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
	log.Println("Database tables created successfully")
	return nil
}

func CloseDB() {
	if DB != nil {
		DB.Close()
	}
}