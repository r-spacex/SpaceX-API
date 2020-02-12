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
		r.Head("/", s.CapsuleHeaders)
		r.Get("/", s.CapsuleGetAll)
		r.Get("/{id}", s.CapsuleGetOne)
		r.Post("/Query", s.CapsuleQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.CapsuleAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.CapsuleUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.CapsuleDelete)
	})

	// Company Info
	r.Route("/company", func(r chi.Router) {
		r.Get("/", s.CompanyGetInfo)
		r.With(middlewares.Auth(s.DB)).Post("/", s.CompanyAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.CompanyUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.CompanyDelete)
	})

	// Cores
	r.Route("/cores", func(r chi.Router) {
		r.Head("/", s.CoreHeaders)
		r.Get("/", s.CoreGetAll)
		r.Get("/{id}", s.CoreGetOne)
		r.Post("/Query", s.CoreQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.CoreAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.CoreUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.CoreDelete)
	})

	// Crew
	r.Route("/crew", func(r chi.Router) {
		r.Head("/", s.CrewHeaders)
		r.Get("/", s.CrewGetAll)
		r.Get("/{id}", s.CrewGetOne)
		r.Post("/Query", s.CrewQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.CrewAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.CrewUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.CrewDelete)
	})

	// Dragons
	r.Route("/dragons", func(r chi.Router) {
		r.Head("/", s.DragonHeaders)
		r.Get("/", s.DragonGetAll)
		r.Get("/{id}", s.DragonGetOne)
		r.Post("/Query", s.DragonQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.DragonAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.DragonUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.DragonDelete)
	})

	// Landpads
	r.Route("/landpads", func(r chi.Router) {
		r.Head("/", s.LandpadHeaders)
		r.Get("/", s.LandpadGetAll)
		r.Get("/{id}", s.LandpadGetOne)
		r.Post("/Query", s.LandpadQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.LandpadQuery)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.LandpadUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.LandpadDelete)
	})

	// Launches
	r.Route("/launches", func(r chi.Router) {
		r.Head("/", s.LaunchHeaders)
		r.Get("/", s.LaunchGetAll)
		r.Get("/{id}", s.LandpadGetOne)
		r.Get("/latest", s.LaunchGetLatest)
		r.Get("/next", s.LaunchGetNext)
		r.Get("/upcoming", s.LaunchGetUpcoming)
		r.Get("/past", s.LaunchGetPast)
		r.Post("/Query", s.LaunchQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.LaunchAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.LaunchUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.LaunchDelete)
	})

	// Launchpads
	r.Route("/launchpads", func(r chi.Router) {
		r.Head("/", s.LaunchpadHeaders)
		r.Get("/", s.LaunchpadGetAll)
		r.Get("/{id}", s.LaunchpadGetOne)
		r.Post("/Query", s.LaunchpadQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.LaunchpadAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.LaunchpadUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.LaunchpadDelete)
	})

	// Payloads
	r.Route("/payloads", func(r chi.Router) {
		r.Head("/", s.PayloadHeaders)
		r.Get("/", s.PayloadGetAll)
		r.Get("/{id}", s.PayloadGetOne)
		r.Post("/Query", s.PayloadQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.PayloadAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.PayloadUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.PayloadDelete)
	})

	// Rockets
	r.Route("/rockets", func(r chi.Router) {
		r.Head("/", s.RocketHeaders)
		r.Get("/", s.RocketGetAll)
		r.Get("/{id}", s.RocketGetOne)
		r.Post("/Query", s.RocketGetOne)
		r.With(middlewares.Auth(s.DB)).Post("/", s.RocketAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.RocketUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.RocketDelete)
	})

	// Ships
	r.Route("/ships", func(r chi.Router) {
		r.Head("/", s.ShipHeaders)
		r.Get("/", s.ShipGetAll)
		r.Get("/{id}", s.ShipGetOne)
		r.Post("/Query", s.ShipQuery)
		r.With(middlewares.Auth(s.DB)).Post("/", s.ShipAdd)
		r.With(middlewares.Auth(s.DB)).Put("/{id}", s.ShipUpdate)
		r.With(middlewares.Auth(s.DB)).Delete("/{id}", s.ShipDelete)
	})

	// Misc
	r.Route("/", func(r chi.Router) {
		r.Get("/roadster", s.PayloadGetRoadster)
	})

	return r
}
