FROM golang:1.14.1
RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/gorilla/handlers
WORKDIR /go/src/antfarm
COPY . .
RUN go build -o main .
CMD ["/go/src/antfarm/main"]