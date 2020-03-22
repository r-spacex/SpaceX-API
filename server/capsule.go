package server

import (
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Capsule struct {
	ID            *primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Serial        *string             `bson:"serial" json:"serial"`
	Status        *string             `bson:"status" json:"status"`
	Dragon        *primitive.ObjectID `bson:"dragon" json:"dragon"`
	ReuseCount    *int                `bson:"reuse_count" json:"reuse_count"`
	WaterLandings *int                `bson:"water_landings" json:"water_landings"`
	LandLandings  *int                `bson:"land_landings" json:"land_landings"`
	LastUpdate    *string             `bson:"last_update" json:"last_update"`
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
