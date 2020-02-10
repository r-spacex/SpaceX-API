package crew

import (
	"fmt"
	"net/http"
)

type Crew struct {
	ID string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all crew
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All crew returned")
}

// Get one crew member
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One crew member returned")
}

// Query crew
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered crew returned")
}

// Add a crew member
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One crew member added")
}

// Update a crew member
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One crew member updated")
}

// Delete a crew member
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One crew member deleted")
}
