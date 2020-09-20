var net = require('net');
var http = require('http');

var HOST = '127.0.0.1';
var PORT = 8000;

var msgcount = 0;

// Instância do servidor e a função de listen
// A função de listen (função de callback) vai lidar com o evento 'connection'
const server = net.createServer((socket) => {

    // O objeto socket é único para cada conexão, e ele será designado para cada conexão automaticamente
    console.log('Entrou: ' + socket.remoteAddress +':'+ socket.remotePort);

    // função de callback que vai executar quando o socket receber dados
    socket.on('data', function(data) {

        msgcount++;
        console.log('Mensagem #'+msgcount+' recebida de [' + socket.remoteAddress +':'+ socket.remotePort+ '] com sucesso: ' + data);

        // escreve os dados de volta para o socket
        // O cliente vai receber como uma mensagem do servidor
        socket.write('\x1b[35mServidor responde: Você disse "' + data + '"');
    });

    // função de callback que vai executar quando o socket receber um evento 'close'
    socket.on('close', function(data) {
        msgcount = 0;
        console.log('Saiu: ' + socket.remoteAddress +':'+ socket.remotePort);
    });

    socket.on('error', function(err) {
        console.log('erro: ',err);
    });

});

server.listen(PORT,HOST, () => {
    console.log('Escutando em ' + HOST +':'+ PORT);
});

server.on('error', (err) => {
    console.log("erro: ",err);
});
