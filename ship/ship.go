package ship

import (
	"fmt"
	"net/http"

	"github.com/r-spacex/spacex-api/server"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Ship struct {
	ID        *primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name      *string             `bson:"name" json:"name"`
	Model     *string             `bson:"model" json:"model"`
	Type      *string             `bson:"type" json:"type"`
	Roles     []string            `bson:"roles" json:"roles"`
	Active    *bool               `bson:"active" json:"active"`
	Imo       *int                `bson:"imo" json:"imo"`
	Mmsi      *int                `bson:"mmsi" json:"mmsi"`
	Abs       *int                `bson:"abs" json:"abs"`
	Class     *int                `bson:"class" json:"class"`
	MassKg    *int                `bson:"mass_kg" json:"mass_kg"`
	MassLbs   *int                `bson:"mass_lbs" json:"mass_lbs"`
	YearBuilt *int                `bson:"year_built" json:"year_built"`
	HomePort  *string             `bson:"home_port" json:"home_port"`
	Status    *string             `bson:"status" json:"status"`
	SpeedKn   *float64            `bson:"speed_kn" json:"speed_kn"`
	CourseDeg *float64            `bson:"course_deg" json:"course_deg"`
	Latitude  *float64            `bson:"latitude" json:"latitude"`
	Longitude *float64            `bson:"longitude" json:"longitude"`
	Link      *string             `bson:"link" json:"link"`
	Image     *string             `bson:"image" json:"image"`
}

// Get all ships
func All(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "All ships returned")
	})
}

// Get one ship
func One(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One ship returned")
	})
}

// Query ships
func Query(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Filtered ships returned")
	})
}

// Add a ship
func Add(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One ship added")
	})
}

// Update a ship
func Update(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One ship updated")
	})
}

// Delete a ship
func Delete(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One ship deleted")
	})
}
