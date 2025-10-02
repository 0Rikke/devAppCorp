import 'dotenv/config'; 
import app from './src/app.js'; 

const PORT = process.env.PORT || 3000; 
// Log das variáveis de ambiente importantes

// Inicia o servidor Express para escutar na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
