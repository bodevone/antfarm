package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	solver "./lib"
)

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
	fmt.Println("Someone entered")
}

func createEvent(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}

	w.WriteHeader(http.StatusCreated)

	solver.InitGraph()
	solver.ParseData(reqBody)

	Solve()

	dataToSend := SendData()

	json.NewEncoder(w).Encode(reqBody)

}

// Solve Graph
func Solve() {

	solver.AddNeighbours()
	solver.PrintAll()

	if solver.StartEndConnected() {
		solver.PrintStartEnd()
		return
	}

	solver.FindPaths()
	occured, message := solver.GetError()
	if occured {
		fmt.Println("ERROR: " + message)
		return
	}

	solver.FindPathsCombn()
	solver.FindSolution()
	solver.GetSolution()

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
