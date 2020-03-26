package capsule

import (
	"fmt"
	"net/http"

	"github.com/r-spacex/spacex-api/server"
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
func All(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "All capsules returned")
	})
}

// Get one capsule
func One(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One capsule returned")
	})
}

// Query capsules
func Query(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Filtered capsules returned")
	})
}

// Add a capsule
func Add(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One capsule added")
	})
}

// Update a capsule
func Update(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One capsule updated")
	})
}

// Delete a capsule
func Delete(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One capsule deleted")
	})
}
