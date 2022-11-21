#!/bin/bash
# Run a command in the background.
_evalBg() {
    eval "$@" &>/dev/null & disown;
}

for i in {1..10}
do
   #sending http request to the server in the background
   curl ec2-18-118-14-204.us-east-2.compute.amazonaws.com &>/dev/null &
   #Desplaying the iterations
   echo "$i hit done!!"
done