package launchpad

import (
	"fmt"
	"net/http"
)

type Launchpad struct {
	ID string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all launchpads
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All launchpads returned")
}

// Get one launchpad
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launchpad returned")
}

// Query launchpads
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered launchpads returned")
}

// Add a launchpad
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launchpad added")
}

// Update a launchpad
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launchpad updated")
}

// Delete a launchpad
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launchpad deleted")
}
