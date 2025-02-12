import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
        // Lançar o erro para que ele possa ser tratado no código que chama esta função
        throw err;
    }
};

export default connectDB; // Exportação padrão adicionada