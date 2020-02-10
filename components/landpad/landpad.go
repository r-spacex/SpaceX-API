package landpad

import (
	"fmt"
	"net/http"
)

type Landpad struct {
	Id string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all landpads
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All landpads returned")
}

// Get one landpad
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad returned")
}

// Query landpads
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered landpads returned")
}

// Add a landpad
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad added")
}

// Update a landpad
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad updated")
}

// Delete a landpad
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad deleted")
}
