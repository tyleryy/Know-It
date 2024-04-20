package questions

import (
	"backend/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/generative-ai-go/genai"
)

func GenerateQuestions(c *gin.Context) {
	// // Just for testing
	// // questions := []Question{
	// // 	{ID: uuid.New(), RoomID: uuid.New(), Prompt: "HEH", Answer: "TES", Explanation: "OO"},
	// // 	{ID: uuid.New(), RoomID: uuid.New(), Prompt: "HHHAHAH", Answer: "TE", Explanation: "OO"},
	// // }
	// // c.IndentedJSON(http.StatusOK, questions)
	print(c)
	ctx, model := services.GetModel("gemini-pro")

	prompt := "Hi gemini-pro, give me a overview of gemini api pls"

	response, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		fmt.Println("Error calling Gemini Pro:", err)
		return
	}
	c.IndentedJSON(http.StatusOK, response)
}
