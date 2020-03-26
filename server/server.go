package server

import (
	"net/http"

	"github.com/go-chi/chi"
	"go.mongodb.org/mongo-driver/mongo"
)

type Server struct {
	Client *mongo.Client
	Router *chi.Mux
	HTTP   *http.Server
}

// Construct a new server
func New() *Server {
	s := &Server{}
	return s
}
