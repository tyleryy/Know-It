package questions

import "github.com/google/uuid"

// Type of our question
type Question struct {
	ID          uuid.UUID `json:"id"`
	RoomID      string    `json:"roomID"`
	Prompt      string    `json:"prompt"`
	Answer      string    `json:"answer"`
	Explanation string    `json:"explanation"`
}

// var separator = "------SEPARATOR------"
