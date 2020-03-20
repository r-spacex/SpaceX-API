package server

import (
	"fmt"
	"net/http"
)

type Dragon struct {
	ID string
}

// Get all dragons
func (s *Server) DragonGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All dragons returned")
}

// Get one dragon
func (s *Server) DragonGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One dragon returned")
}

// Query dragons
func (s *Server) DragonQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered dragons returned")
}

// Add a dragon
func (s *Server) DragonAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One dragon added")
}

// Update a dragon
func (s *Server) DragonUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One dragon updated")
}

// Delete a dragon
func (s *Server) DragonDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One dragon deleted")
}
