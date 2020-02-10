package launch

import (
	"fmt"
	"net/http"
)

type Launch struct {
	ID string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all launches
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All launches returned")
}

// Get one launch
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launch returned")
}

// Query launches
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered launches returned")
}

// Add a launch
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launch added")
}

// Update a launch
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launch updated")
}

// Delete a launch
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launch deleted")
}

//
// Convenience Endpoints
//

// Get all past launches
func GetPast(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All past launches returned")
}

// Get all upcoming launches
func GetUpcoming(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All upcoming launches returned")
}

// Get latest launch
func GetLatest(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Latest launch returned")
}

// Get next launch
func GetNext(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Next launch returned")
}
