package payload

import (
	"fmt"
	"net/http"

	"github.com/r-spacex/spacex-api/server"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Payload struct {
	ID              *primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name            *string             `bson:"name" json:"name"`
	Type            *string             `bson:"type" json:"type"`
	Reused          *bool               `bson:"reused" json:"reused"`
	Customers       []string            `bson:"customers" json:"customers"`
	NoradIds        []int               `bson:"norad_ids" json:"norad_ids"`
	Nationalities   []string            `bson:"nationalities" json:"nationalities"`
	Manufacturers   []string            `bson:"manufacturers" json:"manufacturers"`
	MassKg          *float64            `bson:"mass_kg" json:"mass_kg"`
	MassLbs         *float64            `bson:"mass_lbs" json:"mass_lbs"`
	Orbit           *string             `bson:"orbit" json:"orbit"`
	ReferenceSystem *string             `bson:"reference_system" json:"reference_system"`
	Regime          *string             `bson:"regime" json:"regime"`
	Longitude       *float64            `bson:"longitude" json:"longitude"`
	SemiMajorAxisKm *float64            `bson:"semi_major_axis_km" json:"semi_major_axis_km"`
	Eccentricity    *float64            `bson:"eccentricity" json:"eccentricity"`
	PeriapsisKm     *float64            `bson:"periapsis_km" json:"periapsis_km"`
	ApoapsisKm      *float64            `bson:"apoapsis_km" json:"apoapsis_km"`
	InclinationDeg  *float64            `bson:"inclination_deg" json:"inclination_deg"`
	PeriodMin       *float64            `bson:"period_min" json:"period_min"`
	LifespanYears   *int                `bson:"lifespan_years" json:"lifespan_years"`
	Epoch           *primitive.DateTime `bson:"epoch" json:"epoch"`
	MeanMotion      *float64            `bson:"mean_motion" json:"mean_motion"`
	RAAN            *float64            `bson:"raan" json:"raan"`
	ArgOfPericenter *float64            `bson:"arg_of_pericenter" json:"arg_of_pericenter"`
	MeanAnomaly     *float64            `bson:"mean_anomaly" json:"mean_anomaly"`
	Dragon          struct {
		Capsule         *primitive.ObjectID `bson:"capsule" json:"capsule"`
		MassReturnedKg  *float64            `bson:"mass_returned_kg" json:"mass_returned_kg"`
		MassReturnedLbs *float64            `bson:"mass_returned_lbs" json:"mass_returned_lbs"`
		FlightTimeSec   *int                `bson:"flight_time_sec" json:"flight_time_sec"`
		Manifest        *string             `bson:"manifest" json:"manifest"`
	}
}

// Get all payloads
func All(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "All payloads returned")
	})
}

// Get one payload
func One(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One payload returned")
	})
}

// Query payloads
func Query(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Filtered payloads returned")
	})
}

// Add a payload
func Add(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One payload added")
	})
}

// Update a payload
func Update(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One payload updated")
	})
}

// Delete a payload
func Delete(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "One payload deleted")
	})
}

//
// Convenience Endpoints
//

// Get Tesla Roadster payload
func Roadster(s *server.Server) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Tesla Roadster returned")
	})
}
