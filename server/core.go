package server

import (
	"fmt"
	"net/http"

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
func (s *Server) CoreGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All cores returned")
}

// Get one core
func (s *Server) CoreGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core returned")
}

// Query cores
func (s *Server) CoreQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Filtered cores returned")
}

// Add a core
func (s *Server) CoreAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core added")
}

// Update a core
func (s *Server) CoreUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core updated")
}

// Delete a core
func (s *Server) CoreDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One core deleted")
}
