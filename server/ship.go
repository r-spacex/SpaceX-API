package server

import (
	"fmt"
	"net/http"
)

type Ship struct {
	ID string
}

// Get info headers
func (s *Server) ShipHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all ships
func (s *Server) ShipGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All ships returned")
}

// Get one ship
func (s *Server) ShipGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One ship returned")
}

// Query ships
func (s *Server) ShipQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered ships returned")
}

// Add a ship
func (s *Server) ShipAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One ship added")
}

// Update a ship
func (s *Server) ShipUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One ship updated")
}

// Delete a ship
func (s *Server) ShipDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One ship deleted")
}