package payload

import (
	"fmt"
	"net/http"
)

type Payload struct {
	Id string
}

// Get info headers
func Head(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all payloads
func GetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All payloads returned")
}

// Get one payload
func GetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One payload returned")
}

// Query payloads
func Query(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered payloads returned")
}

// Add a payload
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One payload added")
}

// Update a payload
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One payload updated")
}

// Delete a payload
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One payload deleted")
}

//
// Convenience Endpoints
//

// Get Tesla Roadster payload
func GetRoadster(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Tesla Roadster returned")
}
