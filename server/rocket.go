package server

import (
	"fmt"
	"net/http"
)

type Rocket struct {
	ID string
}

// Get info headers
func (s *Server) RocketHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all rockets
func (s *Server) RocketGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All rockets returned")
}

// Get one rocket
func (s *Server) RocketGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One rocket returned")
}

// Query rockets
func (s *Server) RocketQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered rockets returned")
}

// Add a rocket
func (s *Server) RocketAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One rocket added")
}

// Update a rocket
func (s *Server) RocketUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One rocket updated")
}

// Delete a rocket
func (s *Server) RocketDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One rocket deleted")
}