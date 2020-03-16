package server

import (
	"fmt"
	"net/http"
)

type Core struct {
	ID string
}

// Get all cores
func (s *Server) CoreGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All cores returned")
}

// Get one core
func (s *Server) CoreGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core returned")
}

// Query cores
func (s *Server) CoreQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered cores returned")
}

// Add a core
func (s *Server) CoreAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core added")
}

// Update a core
func (s *Server) CoreUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core updated")
}

// Delete a core
func (s *Server) CoreDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core deleted")
}