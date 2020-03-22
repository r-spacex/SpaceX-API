package server

import (
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Launchpad struct {
	ID              *primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name            *string             `bson:"name" json:"name"`
	FullName        *string             `bson:"full_name" json:"full_name"`
	Status          *string             `bson:"status" json:"status"`
	Timezone        *string             `bson:"timezone" json:"timezone"`
	Locality        *string             `bson:"locality" json:"locality"`
	Region          *string             `bson:"region" json:"region"`
	Latitude        *float64            `bson:"latitude" json:"latitude"`
	Longitude       *float64            `bson:"longitude" json:"longitude"`
	LaunchAttempts  int                 `bson:"launch_attempts" json:"launch_attempts"`
	LaunchSuccesses int                 `bson:"launch_successes" json:"launch_successes"`
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
