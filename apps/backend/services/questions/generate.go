package questions

import (
	"backend/services"
	"fmt"

	"github.com/google/generative-ai-go/genai"
)

func GenerateQuestions(resources string) *genai.GenerateContentResponse {
	ctx, model := services.GetModel("gemini-pro")

	prompt := "Can you generate 3 questions based on the following resources: " + resources

	response, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		fmt.Println("Error calling Gemini Pro:", err)
		return nil
	}
	return response
}
