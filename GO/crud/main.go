package main

import (
	"context"
	"fmt"
	"net/http"
	"log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Get all users")
}

func getUser(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Get a user");
}


func main() {

	clientOptions := options.Client().ApplyURI("mongodb+srv://abhiaditya860:ZHXUrjX1q1Rg18RV@cluster0.xnayn8w.mongodb.net/");
	client, err := mongo.Connect(context.Background(), clientOptions);

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil);

	if err != nil {
		log.Fatal(err);
	}

	fmt.Println("Connected to MongoDB!");
	defer client.Disconnect(context.Background());

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, there this is go!")
	})
	http.ListenAndServe("localhost:8080", nil)
}