const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10mb' }));

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error('Erro:', err);
    res.status(500).json({ error: { message: 'Erro no servidor: ' + err.message } });
  }
});

app.get('/', (req, res) => res.send('Taskette API ok'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Taskette servidor rodando na porta ${PORT}`));
