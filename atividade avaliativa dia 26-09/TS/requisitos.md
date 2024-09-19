### Requisitos Funcionais:

1. O sistema deve permitir o cadastro de quadras esportivas disponíveis.
2. Cada quadra deve ter um nome e um tipo de esporte associado (por exemplo, futebol, tênis, basquete).
3. O sistema deve permitir que os clientes reservem quadras para jogar.
4. Os clientes devem fornecer seu nome e selecionar a quadra desejada.
5. O sistema deve registrar a data e o horário da reserva.
6. O sistema deve ser capaz de listar todas as quadras disponíveis.
7. O sistema deve ser capaz de listar todas as reservas feitas.
8. Uma integração com Gemini para dar sugestão de nutrição esportiva toda vez que um novo agendamento for realizado

## Casos de teste

1. **Teste de criação de quadra esportiva:**
    - Verificar se é possível criar uma quadra esportiva com sucesso, fornecendo um nome e um tipo de esporte válido.
    - Verificar se a quadra criada está presente na lista de quadras disponíveis.
2. **Teste de reserva de quadra:**
    - Verificar se é possível reservar uma quadra com sucesso, fornecendo o nome do cliente, a quadra desejada e a data/horário da reserva.
    - Verificar se a reserva é registrada corretamente no sistema.
    - Verificar se a quadra reservada é marcada como ocupada no horário especificado.
3. **Teste de listagem de quadras disponíveis:**
    - Verificar se todas as quadras disponíveis são listadas corretamente pelo sistema.
    - Verificar se as quadras ocupadas em determinado horário não são listadas como disponíveis.
4. **Teste de listagem de reservas feitas:**
    - Verificar se todas as reservas feitas são listadas corretamente pelo sistema.
    - Verificar se as informações de cliente, quadra e horário da reserva estão corretas na lista.
5. **Teste de tentativa de reserva em quadra ocupada:**
    - Verificar se o sistema lança uma exceção ou retorna uma mensagem de erro quando uma tentativa de reserva é feita em uma quadra já ocupada no horário especificado.
6. **Teste de cancelamento de reserva:**
    - Verificar se é possível cancelar uma reserva previamente feita.
    - Verificar se a quadra reservada é marcada como disponível novamente após o cancelamento.