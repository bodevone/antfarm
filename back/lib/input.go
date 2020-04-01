package solver

import (
	"encoding/json"
	"fmt"
	"strconv"
)

// DataInput from client
type DataInput struct {
	Ants        int
	Rooms       []int
	Connections []string
}

// ParseData to make graph from obtained data
func ParseData(reqBody []byte) {
	var data DataInput
	json.Unmarshal(reqBody, &data)

	fmt.Println(data)

	// Ants
	graph.ants = data.Ants

	// Room
	for _, r := range data.Rooms {

		name := strconv.Itoa(r)
		room := &Room{name: name}
		graph.rooms[name] = room
		if r == 0 {
			graph.start = *room
		} else if r == 1 {
			graph.end = *room
		}
	}

	// Connections
	for _, c := range data.Connections {
		room1 := string(c[0])
		room2 := string(c[1])

		if InRooms(room1) && InRooms(room2) {
			graph.links = append(graph.links, Link{room1, room2})
		}
	}
}

// InRooms to check if given room is already present
func InRooms(room string) bool {
	for r := range graph.rooms {
		if r == room {
			return true
		}
	}
	return false
}
