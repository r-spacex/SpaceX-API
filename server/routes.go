package server

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/r-spacex/spacex-api/middlewares"
)

func (s *Server) Routes() http.Handler {
	r := chi.NewRouter()

	// Capsules
	r.Route("/capsules", func(r chi.Router) {
		r.Get("/", s.CapsuleGetAll)
		r.Get("/{id}", s.CapsuleGetOne)
		r.Post("/query", s.CapsuleQuery)
		r.With(middlewares.Auth(s.Client)).Post("/", s.CapsuleAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.CapsuleUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.CapsuleDelete)
	})

	// Cores
	r.Route("/cores", func(r chi.Router) {
		r.Get("/", s.CoreGetAll)
		r.Get("/{id}", s.CoreGetOne)
		r.Post("/query", s.CoreQuery)
		r.With(middlewares.Auth(s.Client)).Post("/", s.CoreAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.CoreUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.CoreDelete)
	})

	// Crew
	r.Route("/crew", func(r chi.Router) {
		r.Get("/", s.CrewGetAll)
		r.Get("/{id}", s.CrewGetOne)
		r.Post("/query", s.CrewQuery)
		r.With(middlewares.Auth(s.Client)).Post("/", s.CrewAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.CrewUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.CrewDelete)
	})

	// Dragons
	r.Route("/dragons", func(r chi.Router) {
		r.Get("/", s.DragonGetAll)
		r.Get("/{id}", s.DragonGetOne)
		r.Post("/query", s.DragonQuery)
		r.With(middlewares.Auth(s.Client)).Post("/", s.DragonAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.DragonUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.DragonDelete)
	})

	// Landpads
	r.Route("/landpads", func(r chi.Router) {
		r.Get("/", s.LandpadGetAll)
		r.Get("/{id}", s.LandpadGetOne)
		r.Post("/query", s.LandpadQuery)
		r.With(middlewares.Auth(s.Client)).Post("/", s.LandpadQuery)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.LandpadUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.LandpadDelete)
	})

	// Launches
	r.Route("/launches", func(r chi.Router) {
		r.Get("/", s.LaunchGetAll)
		r.Get("/{id}", s.LandpadGetOne)
		r.Get("/latest", s.LaunchGetLatest)
		r.Get("/next", s.LaunchGetNext)
		r.Get("/upcoming", s.LaunchGetUpcoming)
		r.Get("/past", s.LaunchGetPast)
		r.Post("/query", s.LaunchQuery)
		r.With(middlewares.Auth(s.Client)).Post("/", s.LaunchAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.LaunchUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.LaunchDelete)
	})

	// Launchpads
	r.Route("/launchpads", func(r chi.Router) {
		r.Get("/", s.LaunchpadGetAll)
		r.Get("/{id}", s.LaunchpadGetOne)
		r.Post("/query", s.LaunchpadQuery)
		r.With(middlewares.Auth(s.Client)).Post("/", s.LaunchpadAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.LaunchpadUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.LaunchpadDelete)
	})

	// Payloads
	r.Route("/payloads", func(r chi.Router) {
		r.Get("/", s.PayloadGetAll)
		r.Get("/{id}", s.PayloadGetOne)
		r.Post("/query", s.PayloadQuery)
		r.Get("/roadster", s.PayloadGetRoadster)
		r.With(middlewares.Auth(s.Client)).Post("/", s.PayloadAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.PayloadUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.PayloadDelete)
	})

	// Rockets
	r.Route("/rockets", func(r chi.Router) {
		r.Get("/", s.RocketGetAll)
		r.Get("/{id}", s.RocketGetOne)
		r.Post("/query", s.RocketGetOne)
		r.With(middlewares.Auth(s.Client)).Post("/", s.RocketAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.RocketUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.RocketDelete)
	})

	// Ships
	r.Route("/ships", func(r chi.Router) {
		r.Get("/", s.ShipGetAll)
		r.Get("/{id}", s.ShipGetOne)
		r.Post("/query", s.ShipQuery)
		r.With(middlewares.Auth(s.Client)).Post("/", s.ShipAdd)
		r.With(middlewares.Auth(s.Client)).Put("/{id}", s.ShipUpdate)
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", s.ShipDelete)
	})

	return r
}
