package core

import (
	"fmt"
	"net/http"
)

type Core struct {
	ID string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all cores
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All cores returned")
}

// Get one core
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core returned")
}

// Query cores
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered cores returned")
}

// Add a core
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core added")
}

// Update a core
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core updated")
}

// Delete a core
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core deleted")
}
