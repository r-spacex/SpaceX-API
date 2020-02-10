package rocket

import (
	"fmt"
	"net/http"
)

type Rocket struct {
	ID string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all rockets
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All rockets returned")
}

// Get one rocket
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One rocket returned")
}

// Query rockets
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered rockets returned")
}

// Add a rocket
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One rocket added")
}

// Update a rocket
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One rocket updated")
}

// Delete a rocket
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One rocket deleted")
}
