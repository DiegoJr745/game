// 1. Liga o servidor na porta certa de internet
const { WebSocketServer } = require('ws');
const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port });

// 2. Quando um jogador abre o jogo, o servidor avisa "Novo jogador conectado!"
wss.on('connection', (ws) => {

  // 3. Quando o Jogador A anda, fala no chat ou usa o relógio TAB, ele envia uma mensagem para o servidor
  ws.on('message', (message) => {
    
    // 4. O servidor pega essa mensagem e retransmite para TODOS os outros jogadores conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(message.toString());
      }
    });
  });
});