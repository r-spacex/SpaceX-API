package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/r-spacex/spacex-api/middlewares"
	"github.com/r-spacex/spacex-api/components/capsule"
	"github.com/r-spacex/spacex-api/components/company"
	"github.com/r-spacex/spacex-api/components/core"
	"github.com/r-spacex/spacex-api/components/crew"
	"github.com/r-spacex/spacex-api/components/dragon"
	"github.com/r-spacex/spacex-api/components/landpad"
	"github.com/r-spacex/spacex-api/components/launch"
	"github.com/r-spacex/spacex-api/components/launchpad"
	"github.com/r-spacex/spacex-api/components/payload"
	"github.com/r-spacex/spacex-api/components/rocket"
	"github.com/r-spacex/spacex-api/components/ship"
)

func Routes() http.Handler {
	r := chi.NewRouter()

	// Capsules
	r.Route("/capsules", func(r chi.Router) {
		r.Head("/", capsule.Head)
		r.Get("/", capsule.GetAll)
		r.Get("/{id}", capsule.GetOne)
		r.Post("/Query", capsule.Query)
		r.With(middlewares.Auth).Post("/", capsule.Add)
		r.With(middlewares.Auth).Put("/{id}", capsule.Update)
		r.With(middlewares.Auth).Delete("/{id}", capsule.Delete)
	})

	// Company Info
	r.Route("/company", func(r chi.Router) {
		r.Get("/", company.GetInfo)
		r.With(middlewares.Auth).Post("/", company.Add)
		r.With(middlewares.Auth).Put("/{id}", company.Update)
		r.With(middlewares.Auth).Delete("/{id}", company.Delete)
	})

	// Cores
	r.Route("/cores", func(r chi.Router) {
		r.Head("/", core.Head)
		r.Get("/", core.GetAll)
		r.Get("/{id}", core.GetOne)
		r.Post("/Query", core.Query)
		r.With(middlewares.Auth).Post("/", core.Add)
		r.With(middlewares.Auth).Put("/{id}", core.Update)
		r.With(middlewares.Auth).Delete("/{id}", core.Delete)
	})

	// Crew
	r.Route("/crew", func(r chi.Router) {
		r.Head("/", crew.Head)
		r.Get("/", crew.GetAll)
		r.Get("/{id}", crew.GetOne)
		r.Post("/Query", crew.Query)
		r.With(middlewares.Auth).Post("/", crew.Add)
		r.With(middlewares.Auth).Put("/{id}", crew.Update)
		r.With(middlewares.Auth).Delete("/{id}", crew.Delete)
	})

	// Dragons
	r.Route("/dragons", func(r chi.Router) {
		r.Head("/", dragon.Head)
		r.Get("/", dragon.GetAll)
		r.Get("/{id}", dragon.GetOne)
		r.Post("/Query", dragon.Query)
		r.With(middlewares.Auth).Post("/", dragon.Add)
		r.With(middlewares.Auth).Put("/{id}", dragon.Update)
		r.With(middlewares.Auth).Delete("/{id}", dragon.Delete)
	})

	// Landpads
	r.Route("/landpads", func(r chi.Router) {
		r.Head("/", landpad.Head)
		r.Get("/", landpad.GetAll)
		r.Get("/{id}", landpad.GetOne)
		r.Post("/Query", landpad.Query)
		r.With(middlewares.Auth).Post("/", landpad.Add)
		r.With(middlewares.Auth).Put("/{id}", landpad.Update)
		r.With(middlewares.Auth).Delete("/{id}", landpad.Delete)
	})

	// Launches
	r.Route("/launches", func(r chi.Router) {
		r.Head("/", launch.Head)
		r.Get("/", launch.GetAll)
		r.Get("/{id}", launch.GetOne)
		r.Get("/latest", launch.GetLatest)
		r.Get("/next", launch.GetNext)
		r.Get("/upcoming", launch.GetUpcoming)
		r.Get("/past", launch.GetPast)
		r.Post("/Query", launch.Query)
		r.With(middlewares.Auth).Post("/", launch.Add)
		r.With(middlewares.Auth).Put("/{id}", launch.Update)
		r.With(middlewares.Auth).Delete("/{id}", launch.Delete)
	})

	// Launchpads
	r.Route("/launchpads", func(r chi.Router) {
		r.Head("/", launchpad.Head)
		r.Get("/", launchpad.GetAll)
		r.Get("/{id}", launchpad.GetOne)
		r.Post("/Query", launchpad.Query)
		r.With(middlewares.Auth).Post("/", launchpad.Add)
		r.With(middlewares.Auth).Put("/{id}", launchpad.Update)
		r.With(middlewares.Auth).Delete("/{id}", launchpad.Delete)
	})

	// Payloads
	r.Route("/payloads", func(r chi.Router) {
		r.Head("/", payload.Head)
		r.Get("/", payload.GetAll)
		r.Get("/{id}", payload.GetOne)
		r.Post("/Query", payload.Query)
		r.With(middlewares.Auth).Post("/", payload.Add)
		r.With(middlewares.Auth).Put("/{id}", payload.Update)
		r.With(middlewares.Auth).Delete("/{id}", payload.Delete)
	})

	// Rockets
	r.Route("/rockets", func(r chi.Router) {
		r.Head("/", rocket.Head)
		r.Get("/", rocket.GetAll)
		r.Get("/{id}", rocket.GetOne)
		r.Post("/Query", rocket.Query)
		r.With(middlewares.Auth).Post("/", rocket.Add)
		r.With(middlewares.Auth).Put("/{id}", rocket.Update)
		r.With(middlewares.Auth).Delete("/{id}", rocket.Delete)
	})

	// Ships
	r.Route("/ships", func(r chi.Router) {
		r.Head("/", ship.Head)
		r.Get("/", ship.GetAll)
		r.Get("/{id}", ship.GetOne)
		r.Post("/Query", ship.Query)
		r.With(middlewares.Auth).Post("/", ship.Add)
		r.With(middlewares.Auth).Put("/{id}", ship.Update)
		r.With(middlewares.Auth).Delete("/{id}", ship.Delete)
	})

	// Misc
	r.Route("/", func(r chi.Router) {
		r.Get("/roadster", payload.GetRoadster)
	})

	return r
}
