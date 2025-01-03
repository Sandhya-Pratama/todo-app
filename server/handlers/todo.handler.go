package handlers

import (
	"context"

	"github.com/Sandhya-Pratama/todo-app/configs"
	"github.com/Sandhya-Pratama/todo-app/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var todoCollection = configs.ConnectDB().Collection("todos")

func CreateTodo(c *fiber.Ctx) error {
	var todo models.Todo

	// Gunakan pointer dengan &todo
	if err := c.BodyParser(&todo); err != nil {
		return err
	}

	// Validasi body todo tidak boleh kosong
	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Todo body cannot be empty"})
	}

	// Menyimpan todo ke database MongoDB
	insertResult, err := todoCollection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	// Menambahkan ID ke objek todo
	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}

func GetTodos(c *fiber.Ctx) error {
	cursor, err := todoCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	var todos []models.Todo
	if err := cursor.All(context.TODO(), &todos); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(todos)
}

func UpdateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}

	_, err = todoCollection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": "true"})

}

func DeleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	filter := bson.M{"_id": objectID}

	_, err = todoCollection.DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": "true"})
}
