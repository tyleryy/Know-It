package questions

import (
	"backend/services"
	"fmt"

	"github.com/google/generative-ai-go/genai"
)

func GenerateQuestionsFromText(count int, roomID string, resources string) *genai.GenerateContentResponse {
	ctx, model := services.GetModel("gemini-pro")
	// prompt := fmt.Sprintf(`Generate %d questions object based on the following resources: %s.
	// Format each question as a object with fields "id"=create a new uuid for each question object, "roomId"=%s, "prompt", "answer", and "explanation". Separate each
	// question object with the string %s`, count, resources, roomID, separator)

	prompt := fmt.Sprintf(`Generate a list of %d questions based on the following resources: %s. Use the JSON format
	given below.
	{"id": generate a new uuid,
	roomId:%s,
	"prompt":"What does this course explore?",
	"answer": "The course explores the significant philosophical implications of interdisciplinary approaches.",
	"explanation":"The introduction states that the course 'explores...significant philosophical implications."
	}
	{"id": generate a new uuid,
	roomId:%s,
	"prompt":"What is the key benefit of an interdisciplinary approach?",
	"answer": "An interdisciplinary approach combines philosophy and other disciplines, which impacts our understanding of ethics and morality.",
	"explanation":"Key takeaway 1 states that 'Combines philosophy...impacting our understanding of ethics and morality."
	}
	`, count, resources, roomID, roomID)

	response, err := model.GenerateContent(ctx, genai.Text(prompt))

	// content := response.Candidates[0].Content.Parts
	// print(content)
	if err != nil {
		fmt.Println("Error calling Gemini Pro:", err)
		return nil
	}
	return response
}

//TODO: GenerateQuestionsFromImage
