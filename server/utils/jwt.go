package utils

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
)

var jwtKey string

func init() {
	// Load .env
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	// Debugging: Check if JWT_SECRET is available
	jwtKey = os.Getenv("JWT_SECRET")
	if jwtKey == "" {
		panic("JWT_SECRET not set in .env")
	}
	fmt.Println("JWT_SECRET loaded successfully")
}

func GenerateJWT(userID string) (string, error) {
	claims := jwt.MapClaims{
		"userID": userID,
		"exp":    time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtKey))
}

func ValidateJWT(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})
	return token, err
}
