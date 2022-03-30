#!/bin/bash
# Script may influence existing packages on the operating system. 
# Extract what is necessary.
# TODO: xterm is ONLY development
apt-get install python3-pip xterm
pip3 install -r requirements.txt 

echo "Installed Python3-Dependencies."