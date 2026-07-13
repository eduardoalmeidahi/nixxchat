# Comandos Úteis para Administração do NixxChat na VPS

Este guia reúne os comandos mais utilizados para gerenciar, compilar, reiniciar e analisar logs e permissões do NixxChat diretamente na VPS.

---

## 1. Reinicialização e Processos (PM2)

### Reiniciar o Backend do NixxChat
Força a reinicialização do backend aplicando novas variáveis de ambiente e atualizações:
```bash
pm2 restart nixxchat-backend --update-env
```

### Listar Status dos Processos
Mostra o status de CPU, Memória, PID e Tempo de Atividade (Uptime) de todos os processos:
```bash
pm2 list
```

### Limpar Histórico de Logs
Limpa os arquivos de texto acumulados nos logs do PM2 para facilitar a leitura de novos erros:
```bash
pm2 flush
```

---

## 2. Monitoramento de Logs

### Ver Logs em Tempo Real com Timestamps
Acompanha o log do backend adicionando a data e hora em cada linha:
```bash
pm2 logs nixxchat-backend --lines 30 --timestamp
```

### Ver Últimas Linhas do Log de Erro
Consulta diretamente as últimas 30 linhas de erros registradas no arquivo de erro do PM2:
```bash
tail -n 30 /root/.pm2/logs/nixxchat-backend-error.log
```

---

## 3. Banco de Dados (MySQL)

### Consultar Conexões Ativas e Limite do Servidor
Acesse o MySQL para verificar quantas conexões estão abertas (`Threads_connected`) e o limite configurado (`max_connections`):
```bash
mysql -h 127.0.0.1 -u nixxuser -pNixxRedis2026! -e "SHOW STATUS LIKE 'Threads_connected'; SHOW VARIABLES LIKE 'max_connections';"
```

*Nota: Se houver restrições de criptografia da rede local, execute adicionando o parâmetro da chave:*
```bash
mysql --get-server-public-key -h 127.0.0.1 -u nixxuser -pNixxRedis2026! -e "SHOW STATUS LIKE 'Threads_connected';"
```

---

## 4. Compilação e Permissões

### Compilar o Backend Manualmente
Compila os arquivos TypeScript (`src/`) para JavaScript executável (`dist/`) na pasta de produção:
```bash
cd /var/www/nixxchat/backend && npm run build
```

### Corrigir Permissões de Pasta
Define o proprietário correto dos arquivos da aplicação como o usuário do CloudPanel (`api-nixxchat`), permitindo que futuros deploys do GitHub Actions consigam ler/gravar os arquivos sem erro de permissão:
```bash
chown -R api-nixxchat:api-nixxchat /var/www/nixxchat
```
