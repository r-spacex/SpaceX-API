package dragon

import (
	"fmt"
	"net/http"

	"github.com/r-spacex/spacex-api/server"
)

type Dragon struct {
	ID string
}

// Get all dragons
func All(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "All dragons returned")
	})
}

// Get one dragon
func One(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One dragon returned")
	})
}

// Query dragons
func Query(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Filtered dragons returned")
	})
}

// Add a dragon
func Add(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One dragon added")
	})
}

// Update a dragon
func Update(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One dragon updated")
	})
}


// Delete a dragon
func Delete(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One dragon deleted")
	})
}
