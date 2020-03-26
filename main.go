package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/r-spacex/spacex-api/capsule"
	"github.com/r-spacex/spacex-api/core"
	"github.com/r-spacex/spacex-api/crew"
	"github.com/r-spacex/spacex-api/dragon"
	"github.com/r-spacex/spacex-api/landpad"
	"github.com/r-spacex/spacex-api/launch"
	"github.com/r-spacex/spacex-api/launchpad"
	"github.com/r-spacex/spacex-api/middlewares"
	"github.com/r-spacex/spacex-api/payload"
	"github.com/r-spacex/spacex-api/rocket"
	"github.com/r-spacex/spacex-api/server"
	"github.com/r-spacex/spacex-api/ship"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RedirectSlashes)
	r.Use(middleware.Heartbeat("/health"))
	r.Use(middleware.Logger)

	// CORS
	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})
	r.Use(cors.Handler)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGO_URL")))
	if err != nil {
		log.Fatalln(err)
	}
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalln(err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "6673"
	}

	s := server.New()
	s.Client = client
	s.Router = r
	s.HTTP = &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}

	// Capsules
	r.Route("/v4/capsules", func(r chi.Router) {
		r.Get("/", capsule.All(s))
		r.Get("/{id}", capsule.One(s))
		r.Post("/query", capsule.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", capsule.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", capsule.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", capsule.Delete(s))
	})

	// Cores
	r.Route("/v4/cores", func(r chi.Router) {
		r.Get("/", core.All(s))
		r.Get("/{id}", core.One(s))
		r.Post("/query", core.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", core.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", core.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", core.Delete(s))
	})

	// Crew
	r.Route("/v4/crew", func(r chi.Router) {
		r.Get("/", crew.All(s))
		r.Get("/{id}", crew.One(s))
		r.Post("/query", crew.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", crew.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", crew.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", crew.Delete(s))
	})

	// Dragons
	r.Route("/v4/dragons", func(r chi.Router) {
		r.Get("/", dragon.All(s))
		r.Get("/{id}", dragon.One(s))
		r.Post("/query", dragon.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", dragon.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", dragon.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", dragon.Delete(s))
	})

	// Landpads
	r.Route("/v4/landpads", func(r chi.Router) {
		r.Get("/", landpad.All(s))
		r.Get("/{id}", landpad.One(s))
		r.Post("/query", landpad.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", landpad.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", landpad.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", landpad.Delete(s))
	})

	// Launches
	r.Route("/v4/launches", func(r chi.Router) {
		r.Get("/", launch.All(s))
		r.Get("/{id}", launch.One(s))
		r.Get("/latest", launch.Latest(s))
		r.Get("/next", launch.Next(s))
		r.Get("/upcoming", launch.Upcoming(s))
		r.Get("/past", launch.Past(s))
		r.Post("/query", launch.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", launch.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", launch.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", launch.Delete(s))
	})

	// Launchpads
	r.Route("/v4/launchpads", func(r chi.Router) {
		r.Get("/", launchpad.All(s))
		r.Get("/{id}", launchpad.One(s))
		r.Post("/query", launchpad.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", launchpad.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", launchpad.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", launchpad.Delete(s))
	})

	// Payloads
	r.Route("/v4/payloads", func(r chi.Router) {
		r.Get("/", payload.All(s))
		r.Get("/{id}", payload.One(s))
		r.Post("/query", payload.Query(s))
		r.Get("/roadster", payload.Roadster(s))
		r.With(middlewares.Auth(s.Client)).Post("/", payload.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", payload.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", payload.Delete(s))
	})

	// Rockets
	r.Route("/v4/rockets", func(r chi.Router) {
		r.Get("/", rocket.All(s))
		r.Get("/{id}", rocket.One(s))
		r.Post("/query", rocket.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", rocket.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", rocket.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", rocket.Delete(s))
	})

	// Ships
	r.Route("/v4/ships", func(r chi.Router) {
		r.Get("/", ship.All(s))
		r.Get("/{id}", ship.One(s))
		r.Post("/query", ship.Query(s))
		r.With(middlewares.Auth(s.Client)).Post("/", ship.Add(s))
		r.With(middlewares.Auth(s.Client)).Put("/{id}", ship.Update(s))
		r.With(middlewares.Auth(s.Client)).Delete("/{id}", ship.Delete(s))
	})

	// Handle graceful shutdown
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	// Run listen in goroutine to catch signal
	go func() {
		if err := s.HTTP.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()
	log.Printf("Starting on earth at: %v", port)

	<-stop

	if err := s.HTTP.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)
	}
	log.Print("Server Exited Properly")
}
