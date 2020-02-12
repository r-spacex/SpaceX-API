package server

import (
	"fmt"
	"net/http"
)

type Launchpad struct {
	ID string
}

// Get info headers
func (s *Server) LaunchpadHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
}

// Get all launchpads
func (s *Server) LaunchpadGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All launchpads returned")
}

// Get one launchpad
func (s *Server) LaunchpadGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launchpad returned")
}

// Query launchpads
func (s *Server) LaunchpadQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered launchpads returned")
}

// Add a launchpad
func (s *Server) LaunchpadAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launchpad added")
}

// Update a launchpad
func (s *Server) LaunchpadUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launchpad updated")
}

// Delete a launchpad
func (s *Server) LaunchpadDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launchpad deleted")
}