package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
	fmt.Println("Someone entered")
}

func createEvent(w http.ResponseWriter, r *http.Request) {
	// var newEvent event
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}

	// json.Unmarshal(reqBody, &newEvent)
	// events = append(events, newEvent)
	fmt.Println(reqBody)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(reqBody)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	router.HandleFunc("/", homeLink)
	router.HandleFunc("/algo", createEvent).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", handlers.CORS(headers, methods, origins)(router)))
}
