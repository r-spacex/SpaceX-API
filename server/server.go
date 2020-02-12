package server

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/jmoiron/sqlx"
)

type Server struct {
	DB     *sqlx.DB
	Router *chi.Mux
	Http   *http.Server
}

// Construct a new server
func New() *Server {
	s := &Server{}
	s.Routes()
	return s
}
