package main

import (
	"backend/api/upload"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		
		AllowAllOrigins: true,
	}))

	router.POST("/api/upload/text/:roomId/:count", upload.HandleTextUpload)

	router.POST("/api/upload/file/:roomId/:count", upload.HandleFileUpload)

	router.Run()
}
