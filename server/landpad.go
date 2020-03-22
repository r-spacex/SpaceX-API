package server

import (
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Landpad struct {
	ID               *primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name             *string             `bson:"name" json:"name"`
	FullName         *string             `bson:"full_name" json:"full_name"`
	Status           *string             `bson:"status" json:"status"`
	Type             *string             `bson:"type" json:"type"`
	Locality         *string             `bson:"locality" json:"locality"`
	Region           *string             `bson:"region" json:"region"`
	Latitude         *float64            `bson:"latitude" json:"latitude"`
	Longitude        *float64            `bson:"longitude" json:"longitude"`
	LandingAttempts  int                 `bson:"landing_attempts" json:"landing_attempts"`
	LandingSuccesses int                 `bson:"landing_successes" json:"landing_successes"`
	Details          *string             `bson:"details" json:"details"`
}

// Get all landpads
func (s *Server) LandpadGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All landpads returned")
}

// Get one landpad
func (s *Server) LandpadGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad returned")
}

// Query landpads
func (s *Server) LandpadQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered landpads returned")
}

// Add a landpad
func (s *Server) LandpadAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad added")
}

// Update a landpad
func (s *Server) LandpadUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad updated")
}

// Delete a landpad
func (s *Server) LandpadDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One landpad deleted")
}
