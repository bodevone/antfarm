package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	solver "ant-farm/internal/solver"
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

	solver.SendData(w)

}

// Solve Graph
func Solve() {

	solver.AddNeighbours()
	// solver.PrintAll()

	if solver.StartEndConnected() {
		solver.PrintStartEnd()
	} else {
		solver.FindPaths()

		occured := solver.GetError()
		if !occured {
			solver.FindPathsCombn()
			solver.FindSolution()
			solver.GetSolution()
		}
	}

}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	router.HandleFunc("/", createEvent).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", handlers.CORS(headers, methods, origins)(router)))
}
