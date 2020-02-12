package server

import (
	"fmt"
	"net/http"
)

type Landpad struct {
	ID string
}

// Get info headers
func (s *Server) LandpadHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all landpads
func (s *Server) LandpadGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All landpads returned")
}

// Get one landpad
func (s *Server) LandpadGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad returned")
}

// Query landpads
func (s *Server) LandpadQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered landpads returned")
}

// Add a landpad
func (s *Server) LandpadAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad added")
}

// Update a landpad
func (s *Server) LandpadUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad updated")
}

// Delete a landpad
func (s *Server) LandpadDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad deleted")
}