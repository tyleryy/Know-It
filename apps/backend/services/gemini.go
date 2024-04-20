package services

import (
	"context"
	"os"

	"github.com/joho/godotenv"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

var client *genai.Client
var ctx = context.Background()

// init() will execute exactly once before the first time any functions
// from this package is used in programe
func init() {
	env_err := godotenv.Load(".env")
	if env_err != nil {
		panic(env_err) // Handle error appropriately (e.g., log the error and exit)
	}
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		panic("Missing API key")
	}

	var err error
	client, err = genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		panic(err)
	}
}

func GetModel(model string) (context.Context, *genai.GenerativeModel) {

	return ctx, client.GenerativeModel(model)
}
