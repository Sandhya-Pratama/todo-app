package routes

import (
	"github.com/Sandhya-Pratama/todo-app/handlers"
	"github.com/gofiber/fiber/v2"
)

func TodoRoutes(app *fiber.App) {
	app.Get("/todos", handlers.GetTodos)
	app.Post("/todos", handlers.CreateTodo)
	app.Put("/todos/:id", handlers.UpdateTodo)
	app.Delete("/todos/:id", handlers.DeleteTodo)
}
