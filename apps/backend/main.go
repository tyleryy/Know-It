package main

import (
	"backend/api/upload"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.POST("/api/upload/text", upload.HandleTextUpload)

	router.POST("/api/upload/file", upload.HandleFileUpload)

	router.Run()
}
