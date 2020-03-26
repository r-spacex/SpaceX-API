package crew

import (
	"fmt"
	"net/http"

	"github.com/r-spacex/spacex-api/server"
)

type Crew struct {
	ID string
}

// Get all crew
func All(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "All crew returned")
	})
}

// Get one crew member
func One(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One crew member returned")
	})
}

// Query crew
func Query(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Filtered crew returned")
	})
}

// Add a crew member
func Add(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One crew member added")
	})
}

// Update a crew member
func Update(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One crew member added")
	})
}

// Delete a crew member
func Delete(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One crew member deleted")
	})
}
