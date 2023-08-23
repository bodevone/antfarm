package solver

import (
	"encoding/json"
	"net/http"
)

// DataOutput to send to client
type DataOutput struct {
	Error        bool
	ErrorMessage string
	Iterations   int
	Steps        []map[int]string
}

var output DataOutput

// SendData to return DataOutput
func SendData(w http.ResponseWriter) {
	output = DataOutput{}
	if error.occured {
		output.Error = true
		output.ErrorMessage = error.message
	}
	output.Iterations = graph.iterations
	output.Steps = graph.steps
	json.NewEncoder(w).Encode(output)
}
