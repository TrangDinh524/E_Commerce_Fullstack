package models

import "time"

type User struct {
	ID        uint      `json:"id" db:"id"`
	FirstName string    `json:"first_name" db:"first_name"`
	LastName  string    `json:"last_name" db:"last_name"`
	Email     string    `json:"email" db:"email"`
	Password  string    `json:"password,omitempty" db:"password"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}
type LoginRequest struct {
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}

type SignupRequest struct {
	FirstName string `json:"first_name" db:"first_name"`
	LastName  string `json:"last_name" db:"last_name"`
	Email     string `json:"email" db:"email"`
	Password  string `json:"password" db:"password"`
}
type AuthResponse struct {
	User  User   `json:"user"`
	Token string `json:"token"`
}