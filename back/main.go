package main

import (
	"fmt"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	fmt.Println("Serving 8080...")
	http.ListenAndServe(":8081", nil)
}

func main() {
	handleRequests()
}
