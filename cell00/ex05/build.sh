#!/bin/bash

# Verifica se há argumentos
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

# Cria pastas com o prefixo "ex"
for arg in "$@"; do
    mkdir -p "ex$arg"
done
