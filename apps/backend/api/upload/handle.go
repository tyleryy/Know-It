package upload

import (
	"backend/services/questions"
	"io"
	"net/http"

	"strconv"

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
	roomID := c.Param("roomId")
	countStr := c.Param("count")
	count, err := strconv.Atoi(countStr)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid count parameter"})
		return
	}

	c.IndentedJSON(http.StatusOK, questions.GenerateQuestions(count, roomID, string((body))))
}
