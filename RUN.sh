case "$1" in
   -[sS])         printf "Starting Backendserver.\n"      & xterm -hold -e "python3 app.py"            & ;;
   *)             printf "No/Incorrect options were passed.\n Pass -s to run the backend-server\n"; 
esac