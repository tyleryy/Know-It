package questions

import (
	"backend/services"
	"fmt"
	"log"
	"os"
	"path/filepath"

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

// resource will be the path to the img directory (data/33/images)
func GenerateQuestionsFromImage(count int, roomID string, resource string) *genai.GenerateContentResponse {
	ctx, model := services.GetModel("gemini-pro-vision")
	var images [][]byte

	// walk through the img dir and load up the images
	err := filepath.Walk(resource, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && (filepath.Ext(path) == ".jpg" || filepath.Ext(path) == ".jpeg") {
			data, err := os.ReadFile(path)
			if err != nil {
				log.Fatal(err)
			}
			images = append(images, data)
		}

		return nil
	})
	if err != nil {
		fmt.Printf("Error reading directory: %s\n", err)
	}

	// construct prompt
	var prompt []genai.Part

	for _, imgData := range images {
		prompt = append(prompt, genai.ImageData("jpeg", imgData))
	}

	text_prompt := fmt.Sprintf(`Generate a list of %d questions based on the images resources. Use the JSON format
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
	`, count, roomID, roomID)

	prompt = append(prompt, genai.Text(text_prompt))

	response, err := model.GenerateContent(ctx, prompt...)
	if err != nil {
		log.Fatal(err)
	}
	return response

}
