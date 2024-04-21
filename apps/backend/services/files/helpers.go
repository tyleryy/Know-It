package files_helper

import (
	"fmt"
	"image/jpeg"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"

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

// targetDir is the directory we want to store our images
// file is the current path to the pdf (data/33/application/pdf/guidebook.pdf)
// filename is the name of the pdf (guidebook.pdf)
func ExtractImagesFromPDF(targetDir string, file string, filename string) {
	log.Println("targetDir:", targetDir)
	log.Println("file:", file)
	log.Println("filename", filename)
	filePath := filepath.Join(targetDir, strings.TrimSuffix(filename, ".pdf")) // filePath is the directory that store the new converted images
	if err := os.MkdirAll(filePath, 0755); err != nil {
		panic(fmt.Sprintf("Failed to create directory: %s, error: %v", filePath, err))
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

		f, err := os.Create(filepath.Join(filePath, fmt.Sprintf("img%03d.jpg", n)))
		log.Println("Created directory:", filepath.Join(filePath, fmt.Sprintf("img%03d.jpg", n)))
		if err != nil {
			panic(err)
		}

		err = jpeg.Encode(f, img, &jpeg.Options{Quality: jpeg.DefaultQuality})
		if err != nil {
			panic(err)
		}
		log.Println("Processing page:", n)
		f.Close()
	}
}
