package main

import (
	"backend/api/upload"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/api/upload/text/:roomId/:count", upload.HandleTextUpload)

	router.POST("/api/upload/file/:roomId/:count", upload.HandleFileUpload)

	router.Run()
}
