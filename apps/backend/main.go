package main

import (
	"backend/api/questions"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/api/questions/generate", questions.GenerateQuestions)
	router.Run()
}
