package server

import (
	"fmt"
	"net/http"
)

type Crew struct {
	ID string
}

// Get info headers
func (s *Server) CrewHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all crew
func (s *Server) CrewGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All crew returned")
}

// Get one crew member
func (s *Server) CrewGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One crew member returned")
}

// Query crew
func (s *Server) CrewQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered crew returned")
}

// Add a crew member
func (s *Server) CrewAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One crew member added")
}

// Update a crew member
func (s *Server) CrewUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One crew member updated")
}

// Delete a crew member
func (s *Server) CrewDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One crew member deleted")
}