#!/bin/bash
# Setup Node. @see https://github.com/nodesource/distributions#installation-instructions
# curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
if [[ "$(node --version)" == *"16"* ]]; then
    printf "! Local node version is 16.\n"
else 
    printf "! Node version is not 16. Install Node version 16? [Y/n]\n"
    read input
    if [[ $input =~ "Y" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        sudo aptitude install -y nodejs
    fi
fi

printf "! Install project requirements? [Y/n]\n"
read input
if [[ $input =~ "Y" ]]; then
    printf "\n! Installing supportive tools: Aptitude, GCC, G++, Make.\n"
    sudo apt-get install aptitude wget
    sudo aptitude install gcc g++ make 

    printf "\n! Installing NPM & dependencies: NPM, Yarn\n"
    sudo aptitude install npm
    sudo npm install --global yarn
fi

printf "! Using the following versions\n"
printf "\tNode Version: $(node --version)\n"
printf "\tNpm Version: $(npm --version)\n"
printf "\tYarn Version: $(yarn --version)\n"
printf "! Install project and dependencies? [Y/n]\n"
read input
if [[ $input =~ "Y" ]]; then
    cd devos-frontend
    yarn install
    yarn husky
fi

printf "! Script complete \n\n"