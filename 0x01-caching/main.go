package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main(){
	ans, err := askPass("Password?")
	if err != nil{
		log.Fatal(err)
	}
	fmt.Println(ans)
}

func askPass(quiz string) (int, error){
  fmt.Printf("%v: ", quiz)
  reader := bufio.NewReader(os.Stdin)
  input, err := reader.ReadString('\n')
  input = strings.TrimSpace(input)
  input2, err := strconv.Atoi(input)
  if err != nil{
    return -1, errors.New("An error occured")
  }
  return input2, nil
}
	
