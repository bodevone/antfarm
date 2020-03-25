FROM golang:1.14.1-alpine3.11
RUN mkdir /go/src/ant-farm
ADD . /go/src/ant-farm
WORKDIR /go/src/ant-farm
RUN go build -o main .