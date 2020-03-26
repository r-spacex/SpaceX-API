package landpad

import (
	"fmt"
	"net/http"

	"github.com/r-spacex/spacex-api/server"
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
func All(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "All landpads returned")
	})
}

// Get one landpad
func One(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One landpad returned")
	})
}

// Query landpads
func Query(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Filtered landpads returned")
	})
}

// Add a landpad
func Add(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One landpad added")
	})
}

// Update a landpad
func Update(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One landpad updated")
	})
}

// Delete a landpad
func Delete(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One landpad deleted")
	})
}
