package server

import (
	"fmt"
	"net/http"
)

type Payload struct {
	ID string
}

// Get info headers
func (s *Server) PayloadHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all payloads
func (s *Server) PayloadGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All payloads returned")
}

// Get one payload
func (s *Server) PayloadGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One payload returned")
}

// Query payloads
func (s *Server) PayloadQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered payloads returned")
}

// Add a payload
func (s *Server) PayloadAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One payload added")
}

// Update a payload
func (s *Server) PayloadUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One payload updated")
}

// Delete a payload
func (s *Server) PayloadDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One payload deleted")
}

//
// Convenience Endpoints
//

// Get Tesla Roadster payload
func (s *Server) PayloadGetRoadster(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Tesla Roadster returned")
}