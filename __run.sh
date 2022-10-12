#!/bin/bash
PROJECT=devos-frontend

if [[ -d "devos-frontend" ]]; then
    printf "! Project exists.\n"
    cd devos-frontend
    yarn prettier
    yarn lint
    yarn build
    yarn dev
else 
    printf "! Project does not exist.\nPlease check your project file structure.\n"
fi

printf "! Script complete \n\n"