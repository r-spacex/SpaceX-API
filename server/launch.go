package server

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Launch struct {
	ID                *primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	FlightNumber      *int                `bson:"flight_number" json:"flight_number"`
	Name              *string             `bson:"name" json:"name"`
	DateUTC           *primitive.DateTime `bson:"date_utc" json:"date_utc"`
	DateLocal         *primitive.DateTime `bson:"date_local" json:"date_local"`
	DatePrecision     *string             `bson:"date_precision" json:"date_precision"`
	StaticFireDateUTC *primitive.DateTime `bson:"static_fire_date_utc" json:"static_fire_date_utc"`
	TBD               bool                `bson:"tbd" json:"tbd"`
	NET               bool                `bson:"net" json:"net"`
	Window            *int                `bson:"window" json:"window"`
	Rocket            *primitive.ObjectID `bson:"rocket" json:"rocket"`
	LaunchSuccess     *bool               `bson:"launch_success" json:"launch_success"`
	Upcoming          bool                `bson:"upcoming" json:"upcoming"`
	Details           *string             `bson:"details" json:"details"`
	Cores             []struct {
		Core            *primitive.ObjectID `bson:"core" json:"core"`
		Gridfins        *bool               `bson:"gridfins" json:"gridfins"`
		Legs            *bool               `bson:"legs" json:"legs"`
		Reused          *bool               `bson:"reused" json:"reused"`
		LandingAttempt  *bool               `bson:"landing_attempt" json:"landing_attempt"`
		LandingSuccess  *bool               `bson:"landing_success" json:"landing_success"`
		LandingType     *string             `bson:"landing_type" json:"landing_type"`
		LandingLocation *string             `bson:"landing_location" json:"landing_location"`
	} `bson:"cores" json:"cores"`
	Fairings struct {
		Reused          *bool                `bson:"reused" json:"reused"`
		RecoveryAttempt *bool                `bson:"recovery_attempt" json:"recovery_attempt"`
		Recovered       *bool                `bson:"recovered" json:"recovered"`
		Ships           []primitive.ObjectID `bson:"ships" json:"ships"`
	} `bson:"fairings" json:"fairings"`
	Crew  []primitive.ObjectID `bson:"crew" json:"crew"`
	Site  *primitive.ObjectID  `bson:"site" json:"site"`
	Links struct {
		Patch struct {
			Small *string `bson:"small" json:"small"`
			Large *string `bson:"large" json:"large"`
		} `bson:"patch" json:"patch"`
		Reddit struct {
			Campaign *string `bson:"campaign" json:"campaign"`
			Launch   *string `bson:"launch" json:"launch"`
			Media    *string `bson:"media" json:"media"`
			Recovery *string `bson:"recovery" json:"recovery"`
		} `bson:"reddit" json:"reddit"`
		Flickr struct {
			Small []string `bson:"small" json:"small"`
			Large []string `bson:"large" json:"large"`
		} `bson:"flickr" json:"flickr"`
		Presskit       *string `bson:"presskit" json:"presskit"`
		Livestream     *string `bson:"livestream" json:"livestream"`
		YoutubeID      *string `bson:"youtube_id" json:"youtube_id"`
		Spaceflightnow *string `bson:"spaceflightnow" json:"spaceflightnow"`
		Wikipedia      *string `bson:"wikipedia" json:"wikipedia"`
	} `bson:"links" json:"links"`
}

// Get all launches
func (s *Server) LaunchGetAll(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All launches returned")
}

// Get one launch
func (s *Server) LaunchGetOne(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launch returned")
}

// Query launches
func (s *Server) LaunchQuery(w http.ResponseWriter, r *http.Request) {
	db := s.Client.Database("spacex-api")

	// Build BSON query
	var jsonData bson.M
	data, _ := ioutil.ReadAll(r.Body)
	if e := json.Unmarshal(data, &jsonData); e != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
	}

	// Fetch documents
	cursor, err := db.Collection("launch").Find(context.TODO(), jsonData)
	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
	}
	defer cursor.Close(context.TODO())
	for cursor.Next(context.TODO()) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			http.Error(w, "Invalid Request", http.StatusBadRequest)
		}
		log.Println(result)
	}
	if err := cursor.Err(); err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
	}
	fmt.Fprintf(w, "Raw mongo query results")
}

// Add a launch
func (s *Server) LaunchAdd(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launch added")
}

// Update a launch
func (s *Server) LaunchUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launch updated")
}

// Delete a launch
func (s *Server) LaunchDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "One launch deleted")
}

//
// Convenience Endpoints
//

// Get all past launches
func (s *Server) LaunchGetPast(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All past launches returned")
}

// Get all upcoming launches
func (s *Server) LaunchGetUpcoming(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "All upcoming launches returned")
}

// Get latest launch
func (s *Server) LaunchGetLatest(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Latest launch returned")
}

// Get next launch
func (s *Server) LaunchGetNext(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Next launch returned")
}
