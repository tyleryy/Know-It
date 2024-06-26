package files_helper

import (
	"fmt"
	"image/jpeg"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gen2brain/go-fitz"
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

// in format of data/roomId/...
// targetDir is the directory we want to store our images for this room (data/33/images)
// file is the current path to the pdf (data/33/application/pdf/guidebook.pdf)
func ExtractImagesFromPDF(targetDir string, file string) {
	log.Println("targetDir:", targetDir)
	log.Println("file:", file)

	// make the targetDir
	if err := os.MkdirAll(targetDir, 0755); err != nil {
		panic(fmt.Sprintf("Failed to create directory: %s, error: %v", targetDir, err))
	}

	doc, err := fitz.New(file)
	if err != nil {
		panic(err)
	}
	defer doc.Close()
	log.Println("Opened PDF file:", file)
	// Extract pages as images
	for n := 0; n < doc.NumPage(); n++ {
		img, err := doc.Image(n)
		if err != nil {
			panic(err)
		}

		f, err := os.Create(filepath.Join(targetDir, fmt.Sprintf("img%03d.jpg", n)))
		log.Println("Created images:", filepath.Join(targetDir, fmt.Sprintf("img%03d.jpg", n)))
		if err != nil {
			panic(err)
		}

		err = jpeg.Encode(f, img, &jpeg.Options{Quality: jpeg.DefaultQuality})
		if err != nil {
			panic(err)
		}
		log.Println("Processed page:", n)
		f.Close()
	}
}
