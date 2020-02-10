package company

import (
	"fmt"
	"net/http"
)

type Company struct {
	Id string
}

// Get company info
func GetInfo(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Company info returned")
}

// Add company info
func Add(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Company info returned")
}

// Update company info
func Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Company info returned")
}

// Delete company info
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Company info returned")
}
