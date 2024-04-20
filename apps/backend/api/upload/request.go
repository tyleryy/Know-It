package upload

import "github.com/gin-gonic/gin"

type UploadPdfRequest struct {
	File gin.H `json:"file"`
}

