package upload

import (
	files_helper "backend/services/files"
	"backend/services/questions"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"strconv"

	"github.com/gin-gonic/gin"
)

func HandleFileUpload(c *gin.Context) {
	// load up param
	roomID := c.Param("roomId")
	countStr := c.Param("count")
	count, err := strconv.Atoi(countStr)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid count parameter"})
		return
	}

	// imagesDir is the directory that will store images of this entire room
	imagesDir := fmt.Sprintf(`data/%s/images`, roomID)

	// targetDir is the directory of this room for both pdf and images
	targetDir := fmt.Sprintf(`data/%s`, roomID)
	if _, err := os.Stat(targetDir); os.IsNotExist(err) {
		if err := os.MkdirAll(targetDir, 0755); err != nil {
			c.String(http.StatusInternalServerError, "failed to create directory: %s", err.Error())
			return
		}
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.String(http.StatusBadRequest, "get form err: %s", err.Error())
		return
	}
	// next doesnt need to specify upload[] because next handles multipart form data creation
	files := form.File["upload[]"] // gets the slices of files uploaded under the key "upload[]" expected to be the name of the file input in the form
	for _, file := range files {
		contentType := file.Header.Get("Content-Type")
		filename := filepath.Base(file.Filename)
		filePath := filepath.Join(targetDir, contentType, filename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.String(http.StatusBadRequest, "upload file err: %s", err.Error())
			return
		}

		if contentType == "application/pdf" {
			files_helper.ExtractImagesFromPDF(imagesDir, filePath)
		}

	}

	c.IndentedJSON(http.StatusOK, questions.GenerateQuestionsFromImage(count, roomID, imagesDir))
}

func HandleTextUpload(c *gin.Context) {
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Error reading request body"})
		return
	}
	roomID := c.Param("roomId")
	countStr := c.Param("count")
	count, err := strconv.Atoi(countStr)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid count parameter"})
		return
	}

	c.IndentedJSON(http.StatusOK, questions.GenerateQuestionsFromText(count, roomID, string((body))))
}
