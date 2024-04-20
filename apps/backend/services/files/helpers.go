package files

import (
	"mime/multipart"
	"net/http"
	"os"
)

type Form struct {
	Files []*multipart.FileHeader `form:"files" binding:"required"`
}

func GetFileContentType(file *os.File) (string, error) {
	buf := make([]byte, 512)
	_, err := file.Read(buf)
	if err != nil {
		return "", err
	}

	contentType := http.DetectContentType(buf)
	return contentType, nil
}
