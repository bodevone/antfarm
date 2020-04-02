FROM golang:1.14.1
RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/gorilla/handlers
WORKDIR /go/src/ant-farm
ADD . .
RUN go build -o main .