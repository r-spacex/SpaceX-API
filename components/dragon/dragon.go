package dragon

import (
	"fmt"
	"net/http"
)

type Dragon struct {
	Id string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all dragons
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All dragons returned")
}

// Get one dragon
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One dragon returned")
}

// Query dragons
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered dragons returned")
}

// Add a dragon
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One dragon added")
}

// Update a dragon
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One dragon updated")
}

// Delete a dragon
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One dragon deleted")
}
