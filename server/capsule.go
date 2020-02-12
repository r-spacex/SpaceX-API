package server

import (
	"fmt"
	"net/http"
)

type Capsule struct {
	ID string
}

// Get info headers
func (s *Server) CapsuleHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all capsules
func (s *Server) CapsuleGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All capsules returned")
}

// Get one capsule
func (s *Server) CapsuleGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One capsule returned")
}

// Query capsules
func (s *Server) CapsuleQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered capsules returned")
}

// Add a capsule
func (s *Server) CapsuleAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One capsule added")
}

// Update a capsule
func (s *Server) CapsuleUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One capsule updated")
}

// Delete a capsule
func (s *Server) CapsuleDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One capsule deleted")
}
