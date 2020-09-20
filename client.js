var net = require('net');
const UserInput = require('readline');

var HOST = '127.0.0.1';
var PORT = 8000;

var client = new net.Socket();

const IOUser = UserInput.createInterface({
    input: process.stdin,
    output: process.stdout
  });

client.connect(PORT, HOST, function() {

    console.log('\x1b[32m\nConectado: ' + HOST + ':' + PORT + '\n Digite "sair" para sair.');
    client.write("SD é muito interessante!");

});

var ler_mensagem = function() {
    IOUser.question('\x1b[33mMande uma mensagem para o servidor: \x1b[0m', (msg) => {
        if(msg.toUpperCase() != "SAIR")
        {
            var msg_para_enviar = new Buffer.from(msg);
            client.write(msg_para_enviar);
            console.log('\x1b[33mMensagem TCP enviada para ' + HOST +':'+ PORT + '\x1b[0m');
        }        
        else {
            IOUser.close();
            client.destroy();
        }

    });
}

// função de callback que vai executar quando o cliente receber dados do servidor
client.on('data', function(data) {

    console.log(" "+data);
    ler_mensagem();

});

client.on('close', function() {

    console.log('Connection closed');
    client.destroy();

});

client.on('error', (err) => {
    
    console.log("erro: ",err);
    client.destroy();

});


ler_mensagem();

