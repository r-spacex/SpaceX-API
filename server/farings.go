package server

import (
	"fmt"
	"net/http"
)

type Fairing struct {
	ID string
}

// Get all fairings
func (s *Server) FairingGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All fairings returned")
}

// Get one fairing
func (s *Server) FairingGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One fairing returned")
}

// Query fairings
func (s *Server) FairingQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered fairings returned")
}

// Add a fairing
func (s *Server) FairingAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One fairing added")
}

// Update a fairing
func (s *Server) FairingUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One fairing updated")
}

// Delete a fairing
func (s *Server) FairingDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One fairing deleted")
}
