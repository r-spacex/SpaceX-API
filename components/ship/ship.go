package ship

import (
	"fmt"
	"net/http"
)

type Ship struct {
	ID string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all ships
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All ships returned")
}

// Get one ship
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One ship returned")
}

// Query ships
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered ships returned")
}

// Add a ship
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One ship added")
}

// Update a ship
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One ship updated")
}

// Delete a ship
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One ship deleted")
}
