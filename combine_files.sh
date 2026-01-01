#!/bin/bash

# ==============================================================================
# Script: Combinador de Arquivos Inteligente (Versão Anti-Lixo)
# Autor: Guerreiro
# Descrição: Agrupa arquivos ignorando pastas de dependências e ambiente.
# ==============================================================================

# Gerar data e hora (ano-mês-dia_hora-minuto-segundo)
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")

# Definir limite de caracteres por arquivo (aprox. 50kb)
limit=50000

# --- CONFIGURAÇÃO DE EXCLUSÃO ---
# Adicione aqui qualquer pasta que você queira que o script IGNORE solenemente.
ignore_dirs=(
    "node_modules"
    "vendor"
    ".nvm"
    ".git"
    ".vscode"
    ".idea"
    "dist"
    "build"
    ".next"
    ".cache"
    "__pycache__"
)

# Escolher modo: "unique" ou "split"
mode=$1
shift

if [[ "$mode" != "unique" && "$mode" != "split" ]]; then
    echo "❌ Erro: Primeiro argumento deve ser 'unique' ou 'split'."
    echo "Uso: $0 [unique|split] padrao1 padrao2 ..."
    exit 1
fi

# Remover outros arquivos antigos "combined_files_*.txt" no mesmo diretório
echo "🧹 Limpando arquivos antigos..."
find . -maxdepth 1 -type f -name "combined_files_*.txt" -exec rm -f {} \;
find . -maxdepth 1 -type f -name "combined_files.txt" -exec rm -f {} \;

# Função para adicionar conteúdo de um arquivo ao arquivo de saída
append_file_content() {
    local file="$1"
    local outfile="$2"
    echo "📝 Adicionando: $file -> $outfile"
    echo -e "\n\n=== $file ===\n" >> "$outfile"
    cat "$file" >> "$outfile"
}

# Verificar se foi passado pelo menos um padrão de arquivo
if [ $# -eq 0 ]; then
    echo "❌ Erro: Forneça pelo menos um padrão de arquivo (ex: src/*.ts)."
    exit 1
fi

# Variáveis para controle no modo split
file_index=1
current_size=0

# Construir a string de exclusão para o comando find
exclude_path_cmd=""
for dir in "${ignore_dirs[@]}"; do
    exclude_path_cmd="$exclude_path_cmd -not -path \"*/$dir/*\" -not -path \"*/.$dir/*\""
done

# Loop para processar cada padrão de arquivo fornecido como argumento
for pattern in "$@"; do
    dir_to_search=$(dirname "$pattern")
    file_pattern=$(basename "$pattern")

    # O pulo do gato: Find filtrando as pastas da ignore_dirs
    # Usamos eval para que as aspas e globos da exclude_path_cmd sejam interpretados corretamente
    matches_raw=$(eval "find \"$dir_to_search\" -type f -name \"$file_pattern\" $exclude_path_cmd")

    if [ -z "$matches_raw" ]; then
        echo "⚠️ Aviso: Nenhum arquivo encontrado para o padrão: $pattern"
        continue
    fi

    while IFS= read -r file; do
        if [ ! -f "$file" ]; then continue; fi

        if [[ "$mode" == "unique" ]]; then
            output_file="combined_files.txt"
            append_file_content "$file" "$output_file"
        else # modo split
            file_size=$(wc -c < "$file")

            # CASO 1: O arquivo individual é MAIOR que o limite
            if (( file_size > limit )); then
                echo "✂️ Arquivo $file muito grande, fatiando..."

                if (( current_size > 0 )); then
                    file_index=$((file_index + 1))
                    current_size=0
                fi

                temp_dir=$(mktemp -d)
                split -b "$limit" -d --additional-suffix=.part "$file" "${temp_dir}/part_"
                
                part_count=$(ls -1q "${temp_dir}" | wc -l)
                part_num=1

                for part_file in $(ls -v "${temp_dir}"/part_*); do
                    output_part_file="combined_files_${file_index}.txt"
                    echo -e "\n\n=== $file (Parte ${part_num} de ${part_count}) ===\n" > "$output_part_file"
                    cat "$part_file" >> "$output_part_file"
                    file_index=$((file_index + 1))
                    part_num=$((part_num + 1))
                done
                rm -r "$temp_dir"
                current_size=0
                continue
            fi
            
            # CASO 2: O arquivo é MENOR que o limite (agrupamento)
            header_size=$(echo -e "\n\n=== $file ===\n" | wc -c)
            total_size_to_add=$((file_size + header_size))
            
            if (( current_size > 0 && current_size + total_size_to_add > limit )); then
                file_index=$((file_index + 1))
                current_size=0
            fi
            
            output_file="combined_files_${file_index}.txt"
            if (( current_size == 0 )); then : > "$output_file"; fi

            append_file_content "$file" "$output_file"
            current_size=$((current_size + total_size_to_add))
        fi
    done <<< "$matches_raw"
done

echo -e "\n🚀 Processo concluído com sucesso!"

# Lógica de cópia para o clipboard (apenas modo split)
if [[ "$mode" == "split" ]]; then
    files_to_copy=$(find . -maxdepth 1 -type f -name "combined_files_*.txt" | sort -V)
    num_files=$(echo "$files_to_copy" | wc -l)

    if (( num_files > 0 )); then
        echo -e "\n📋 Iniciando cópia sequencial para o clipboard..."
        count=1
        for file_to_copy in $files_to_copy; do
            cat "$file_to_copy" | xclip -selection clipboard
            echo "✅ ($count/$num_files) Conteúdo de '$file_to_copy' copiado!"
            if (( count < num_files )); then
                read -r -p "   Pressione [Enter] para copiar o próximo..."
            fi
            count=$((count + 1))
        done
    fi
fi
