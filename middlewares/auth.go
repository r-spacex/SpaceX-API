package middlewares

import (
	"net/http"
)

func Auth(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    // TODO: Handle auth 
		next.ServeHTTP(w, r)
  })
}
