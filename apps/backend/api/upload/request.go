package upload

import "github.com/gin-gonic/gin"

type UploadFileRequest struct {
	File gin.H `json:"file"`
}
