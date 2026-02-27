#!/bin/bash

# Gerar data e hora (ano-mês-dia_hora-minuto-segundo)
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")

# Definir limite de caracteres por arquivo
limit=80000

# Escolher modo: "unique" ou "split"
mode=$1
shift

if [[ "$mode" != "unique" && "$mode" != "split" ]]; then
    echo "Erro: Primeiro argumento deve ser 'unique' ou 'split'."
    echo "Uso: $0 [unique|split] padrao1 padrao2 ..."
    exit 1
fi

# Remover outros arquivos antigos "combined_files_*.txt" no mesmo diretório
echo "Limpando arquivos antigos..."
find . -maxdepth 1 -type f -name "combined_files*.txt" -exec rm -f {} \;

# Função para adicionar conteúdo de um arquivo ao arquivo de saída
append_file_content() {
    local file="$1"
    local outfile="$2"
    echo "Adicionando conteúdo de $file em $outfile..."
    echo -e "\n\n=== $file ===\n" >> "$outfile"
    cat "$file" >> "$outfile"
}

# Verificar se foi passado pelo menos um padrão de arquivo
if [ $# -eq 0 ]; then
    echo "Erro: Por favor, forneça pelo menos um padrão de arquivo (ex: config/*.yml)."
    echo "Uso: $0 [unique|split] padrao1 padrao2 ..."
    exit 1
fi

# Variáveis para controle no modo split
file_index=1
current_size=0

# Loop para processar cada padrão de arquivo fornecido como argumento
for pattern in "$@"; do
    dir=$(dirname "$pattern")
    name=$(basename "$pattern")

    matches_raw=$(find "$dir" -type f -name "$name" -not -path "*/node_modules/*" -not -path "*/vendor/*" -not -path "*/.git/*")
    if [ -z "$matches_raw" ]; then
        echo "Aviso: Nenhum arquivo encontrado para o padrão $pattern."
        continue
    fi

    # Usar 'while read' para lidar de forma robusta com nomes de arquivo que contenham espaços
    while IFS= read -r file; do
        if [ ! -f "$file" ]; then
            echo "Aviso: O arquivo $file não existe e será ignorado."
            continue
        fi

        if [[ "$mode" == "unique" ]]; then
            output_file="combined_files.txt"
            append_file_content "$file" "$output_file"
        else # modo split
            file_size=$(wc -c < "$file")

            # --- NOVA LÓGICA ---
            # CASO 1: O arquivo individual é MAIOR que o limite e precisa ser quebrado.
            if (( file_size > limit )); then
                echo "Arquivo $file é maior que $limit, quebrando em partes..."

                # Se havia arquivos pequenos sendo agrupados, finaliza o arquivo atual deles
                # e avança para o próximo índice de arquivo para as partes do arquivo grande.
                if (( current_size > 0 )); then
                    file_index=$((file_index + 1))
                    current_size=0 # Reseta o tamanho para o próximo lote de arquivos pequenos
                fi

                temp_dir=$(mktemp -d)
                # Quebra o arquivo grande em partes com o limite de tamanho
                split -b "$limit" -d --additional-suffix=.part "$file" "${temp_dir}/part_"
                
                part_count=$(ls -1q "${temp_dir}" | wc -l)
                part_num=1

                # Itera sobre cada parte criada, usando 'ls -v' para ordenação numérica correta
                for part_file in $(ls -v "${temp_dir}"/part_*); do
                    output_part_file="combined_files_${file_index}.txt"
                    
                    # Cada parte se torna um novo arquivo de saída completo
                    echo "Adicionando parte $part_num/$part_count de $file em $output_part_file..."
                    # Adiciona um cabeçalho indicando que é uma parte de um arquivo maior
                    echo -e "\n\n=== $file (Parte ${part_num} de ${part_count}) ===\n" > "$output_part_file"
                    cat "$part_file" >> "$output_part_file"
                    
                    file_index=$((file_index + 1)) # Prepara o índice para a próxima parte/arquivo
                    part_num=$((part_num + 1))
                done

                rm -r "$temp_dir" # Limpa os arquivos temporários
                current_size=0 # Garante que o próximo arquivo pequeno comece um novo combined_file
                continue # Pula para o próximo arquivo da lista de entrada
            fi
            
            # --- LÓGICA ANTIGA MELHORADA ---
            # CASO 2: O arquivo é MENOR que o limite e será agrupado com outros.
            header_size=$(echo -e "\n\n=== $file ===\n" | wc -c)
            total_size_to_add=$((file_size + header_size))
            
            # Se o buffer atual não está vazio e o novo arquivo não cabe,
            # avança para o próximo arquivo de saída.
            if (( current_size > 0 && current_size + total_size_to_add > limit )); then
                file_index=$((file_index + 1))
                current_size=0
            fi
            
            output_file="combined_files_${file_index}.txt"
            
            # Cria/trunca o arquivo de saída se for o começo de um novo agrupamento
            if (( current_size == 0 )); then
                : > "$output_file"
            fi

            append_file_content "$file" "$output_file"
            current_size=$((current_size + total_size_to_add))
        fi
    done <<< "$matches_raw"
done

echo "Processo concluído!"

if [[ "$mode" == "split" ]]; then
    # Lista os arquivos criados em ordem numérica (ex: 1, 2, ..., 10)
    files_to_copy=$(find . -maxdepth 1 -type f -name "combined_files_*.txt" | sort -V)
    
    # Conta quantos arquivos foram gerados
    num_files=$(echo "$files_to_copy" | wc -l)

    if (( num_files > 0 )); then
        echo -e "\n--- Iniciando sessão de cópia sequencial ---"
        
        count=1
        for file_to_copy in $files_to_copy; do
            # Copia o conteúdo do arquivo para a área de transferência
            cat "$file_to_copy" | xclip -selection clipboard
            
            echo "✅ Conteúdo de '$file_to_copy' (arquivo $count de $num_files) copiado."
            
            # Se não for o último arquivo, pausa e aguarda o usuário
            if (( count < num_files )); then
                read -r -p "   Pressione Enter para copiar o próximo arquivo..."
            fi
            count=$((count + 1))
        done
        
        echo -e "\n✅ Sessão de cópia concluída. Todos os arquivos foram processados."
    else
        echo "Nenhum arquivo 'combined_files_*.txt' foi gerado para copiar."
    fi
fi