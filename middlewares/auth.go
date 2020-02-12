package middlewares

import (
	"net/http"

	"github.com/jmoiron/sqlx"
)

func Auth(db *sqlx.DB) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Check if token exists in database

			// If it does, check that role is admin

			// If admin role, allow access
			next.ServeHTTP(w, r)
		})
	}
}
