package core

import (
	"fmt"
	"net/http"

	"github.com/r-spacex/spacex-api/server"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Core struct {
	ID           *primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Serial       *string             `bson:"serial" json:"serial"`
	Block        *int                `bson:"block" json:"block"`
	Status       *string             `bson:"status" json:"status"`
	ReuseCount   int                 `bson:"reuse_count" json:"reuse_count"`
	RtlsAttempts int                 `bson:"rtls_attempts" json:"rtls_attempts"`
	RtlsLandings int                 `bson:"rtls_landings" json:"rtls_landings"`
	AsdsAttempts int                 `bson:"asds_attempts" json:"asds_attempts"`
	AsdsLandings int                 `bson:"asds_landings" json:"asds_landings"`
	LastUpdate   *string             `bson:"last_update" json:"last_update"`
}

// Get all cores
func All(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "All capsules returned")
	})
}

// Get one core
func One(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One core returned")
	})
}

// Query cores
func Query(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Filtered cores returned")
	})
}

// Add a core
func Add(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One core added")
	})
}

// Update a core
func Update(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One core updated")
	})
}

// Delete a core
func Delete(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One core deleted")
	})
}
