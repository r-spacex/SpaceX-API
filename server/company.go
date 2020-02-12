package server

import (
	"fmt"
	"net/http"
)

type Company struct {
	ID string
}

// Get company info
func (s *Server) CompanyGetInfo(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Company info returned")
}

// Add company info
func (s *Server) CompanyAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Company info returned")
}

// Update company info
func (s *Server) CompanyUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Company info returned")
}

// Delete company info
func (s *Server) CompanyDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Company info returned")
}