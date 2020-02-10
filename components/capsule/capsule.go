package capsule

import (
	"fmt"
	"net/http"
)

type Capsule struct {
	Id string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all capsules
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All capsules returned")
}

// Get one capsule
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One capsule returned")
}

// Query capsules
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered capsules returned")
}

// Add a capsule
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One capsule added")
}

// Update a capsule
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One capsule updated")
}

// Delete a capsule
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One capsule deleted")
}
