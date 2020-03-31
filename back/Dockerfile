FROM golang:1.14.1
RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/gorilla/handlers
RUN mkdir /go/src/ant-farm
ADD . /go/src/ant-farm
WORKDIR /go/src/ant-farm
RUN go build -o main .