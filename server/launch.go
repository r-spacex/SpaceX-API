package server

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

type Launch struct {
	ID string
}

// Get info headers
func (s *Server) LaunchHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("spacex-api-count", "sample")
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
	db := s.DB.Database("spacex-api")

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
