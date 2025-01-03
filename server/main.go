package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Sandhya-Pratama/todo-app/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Hello, World!")
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173", // URL frontend Anda
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	routes.AuthRoutes(app)
	routes.TodoRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	log.Fatal(app.Listen(":" + port))
}

// err := godotenv.Load(".env")

// if err != nil {
// 	log.Fatal("Error loading .env file")
// }

// MONGODB_URI := os.Getenv("MONGODB_URI")
// clientOption := options.Client().ApplyURI(MONGODB_URI)
// client, err := mongo.Connect(context.Background(), clientOption)

// if err != nil {
// 	log.Fatal(err)
// }

// err = client.Ping(context.Background(), nil)
// if err != nil {
// 	log.Fatal(err)
// }

// defer client.Disconnect(context.Background())

// fmt.Println("Connected to MongoDB Atlas")

// collection = client.Database("golang_db").Collection("todos")
