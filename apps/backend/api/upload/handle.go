package upload

import (
	"backend/services/questions"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleFileUpload(c *gin.Context) {

}

func HandleTextUpload(c *gin.Context) {
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Error reading request body"})
		return
	}

	c.IndentedJSON(http.StatusOK, questions.GenerateQuestions((string(body))))

}
