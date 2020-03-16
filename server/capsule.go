package server

import (
	"fmt"
	"net/http"
)

type Capsule struct {
	ID string
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
