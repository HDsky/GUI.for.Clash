package main

import (
	"archive/tar"
	"archive/zip"
	"compress/gzip"
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/gen2brain/beeep"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

var (
	UserAgent = "GUI.for.Clash/1.0"
)

type ApiIOResult struct {
	Flag bool   `json:"flag"`
	Data string `json:"data"`
}

func (a *App) Writefile(path string, content string) ApiIOResult {
	fmt.Println("Writefile:", path)
	cwd, err := os.Getwd()
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	path = filepath.Join(cwd, path)
	err = os.MkdirAll(filepath.Dir(path), os.ModePerm)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	err = os.WriteFile(path, []byte(content), 0644)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	return ApiIOResult{true, "Success"}
}

func (a *App) Readfile(path string) ApiIOResult {
	fmt.Println("Readfile:", path)
	cwd, err := os.Getwd()
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	path = filepath.Join(cwd, path)
	b, err := os.ReadFile(path)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	return ApiIOResult{true, string(b)}
}

type ApiHTTPResult struct {
	Flag   bool        `json:"flag"`
	Header http.Header `json:"header"`
	Body   string      `json:"body"`
}

func (a *App) HttpGet(url string, headers map[string]string) ApiHTTPResult {
	fmt.Println("HttpGet:", url, headers)
	client := &http.Client{
		Timeout: 15 * time.Second,
	}

	header := make(http.Header)

	header.Set("User-Agent", UserAgent)

	for key, value := range headers {
		header.Set(key, value)
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return ApiHTTPResult{false, nil, err.Error()}
	}

	req.Header = header

	resp, err := client.Do(req)
	if err != nil {
		return ApiHTTPResult{false, nil, err.Error()}
	}
	defer resp.Body.Close()

	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return ApiHTTPResult{false, nil, err.Error()}
	}

	return ApiHTTPResult{true, resp.Header, string(b)}
}

func (a *App) Download(url string, path string) ApiIOResult {
	fmt.Println("Download:", url, path)
	cwd, err := os.Getwd()
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	path = filepath.Join(cwd, path)
	err = os.MkdirAll(filepath.Dir(path), os.ModePerm)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}

	client := &http.Client{}
	header := make(http.Header)
	header.Set("User-Agent", UserAgent)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}

	req.Header = header

	resp, err := client.Do(req)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return ApiIOResult{true, fmt.Sprintf("Code: %d", resp.StatusCode)}
	}

	file, err := os.Create(path)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	defer file.Close()

	_, err = io.Copy(file, resp.Body)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}

	return ApiIOResult{true, "Success"}
}

func (a *App) UnzipZIPFile(path string, output string) ApiIOResult {
	fmt.Println("UnzipZIPFile:", path, output)
	cwd, err := os.Getwd()
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	path = filepath.Join(cwd, path)
	output = filepath.Join(cwd, output)

	archive, err := zip.OpenReader(path)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	defer archive.Close()

	for _, f := range archive.File {
		filePath := filepath.Join(output, f.Name)

		if !strings.HasPrefix(filePath, filepath.Clean(output)+string(os.PathSeparator)) {
			fmt.Println("invalid file path")
			return ApiIOResult{false, err.Error()}
		}
		if f.FileInfo().IsDir() {
			os.MkdirAll(filePath, os.ModePerm)
			continue
		}

		if err := os.MkdirAll(filepath.Dir(filePath), os.ModePerm); err != nil {
			return ApiIOResult{false, err.Error()}
		}

		dstFile, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
		if err != nil {
			return ApiIOResult{false, err.Error()}
		}
		defer dstFile.Close()

		fileInArchive, err := f.Open()
		if err != nil {
			return ApiIOResult{false, err.Error()}
		}
		defer fileInArchive.Close()

		if _, err := io.Copy(dstFile, fileInArchive); err != nil {
			return ApiIOResult{false, err.Error()}
		}
	}
	return ApiIOResult{true, "Success"}
}

func (a *App) UnzipGZFile(path string, output string) ApiIOResult {
	fmt.Println("UnzipGZFile:", path, output)
	cwd, err := os.Getwd()
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	path = filepath.Join(cwd, path)
	output = filepath.Join(cwd, output)

	gzFile, err := os.Open(path)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	defer gzFile.Close()

	gzipReader, err := gzip.NewReader(gzFile)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	defer gzipReader.Close()

	tarReader := tar.NewReader(gzipReader)

	for {
		header, err := tarReader.Next()
		if err != nil {
			if err == io.EOF {
				break
			}
			return ApiIOResult{false, err.Error()}
		}

		outFile, err := os.Create(filepath.Join(output, header.Name))
		if err != nil {
			return ApiIOResult{false, err.Error()}
		}
		defer outFile.Close()

		if _, err := io.Copy(outFile, tarReader); err != nil {
			return ApiIOResult{false, err.Error()}
		}
	}

	return ApiIOResult{true, "Success"}
}

func (a *App) Notification(title string, message string, icon string) ApiIOResult {
	fmt.Println("Notification:", title, message, icon)
	err := beeep.Notify(title, message, icon)
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	return ApiIOResult{true, "Success"}
}

func (a *App) Getcwd() ApiIOResult {
	cwd, err := os.Getwd()
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	return ApiIOResult{true, cwd}
}

func (a *App) Exec(path string, args string) ApiIOResult {
	fmt.Println("Exec:", path, args)
	cwd, err := os.Getwd()
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}
	path = filepath.Join(cwd, path)

	cmd := exec.Command(path, args)

	out, err := cmd.CombinedOutput()
	if err != nil {
		return ApiIOResult{false, err.Error()}
	}

	return ApiIOResult{true, string(out)}
}
