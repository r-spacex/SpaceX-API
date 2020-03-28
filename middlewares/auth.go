package middlewares

import (
	"context"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID  primitive.ObjectID `bson:"_id"`
	Key string             `bson:"key"`
}

func Auth(client *mongo.Client) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Return 400 on missing key
			key := r.Header.Get("spacex-key")
			if key == "" {
				http.Error(w, "Invalid Request", http.StatusBadRequest)
				return
			}

			// Auth requires explicit match
			db := client.Database("auth")
			user := &User{}
			err := db.Collection("users").FindOne(context.TODO(), bson.M{"key": key}).Decode(&user)
			if err != nil {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}
			if user.Key == key {
				next.ServeHTTP(w, r)
				return
			}

			// Default branch is 401
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		})
	}
}
