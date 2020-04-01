package solver

// DataOutput to send to client
type DataOutput struct {
	Iterations int
	Steps      []map[int]string
}

var output DataOutput

// SendData to return DataOutput
func SendData() DataOutput {
	return output
}
