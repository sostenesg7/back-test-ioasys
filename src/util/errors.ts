const minMaxMessage = (field: string, min: number, max: number) =>
  `O campo ${field} deve conter entre ${min} e ${max} caracteres.`;

const requiredMessage = (field: string) => `O campo ${field} é requerido.`;

export const user = {
  register: {
    name: requiredMessage('nome'),
    nameLength: minMaxMessage('nome', 1, 100),
    email: 'Email inválido.',
    password: requiredMessage('senha'),
    passwordLength: minMaxMessage('senha', 6, 16),
    passwordConfirmation: requiredMessage('confirmação de senha'),
    passwordConfirmationLength: minMaxMessage('confirmação de senha', 6, 16),
    passwordConfirmationMatch:
      'O campo senha e confirmação de senha não conferem.',
  },
};

export const movie = {
  register: {
    title: requiredMessage('título é requerido.'),
    titleLength: minMaxMessage('título', 1, 100),
    director: requiredMessage('diretor é requerido.'),
    directorLength: minMaxMessage('diretor', 1, 100),
    genre: requiredMessage('gênero é requerido.'),
    genreLength: 'O gênero deve possuir ao menos um item.',
    cast: requiredMessage('elenco é requerido.'),
    castLength: 'O elenco deve possuir ao menos um membro.',
  },
  vote: {
    vote: requiredMessage('voto é requerido.'),
    voteLength: 'O campo voto deve ser um valor de 0 a 4.',
  },
};

export const emailAlreadyRegistered = 'O email informado já existe.';
export const invalidId = 'O id informado não é válido.';
export const invalidCredentials = 'Credenciais inválidas.';
export const userNotFound = 'Usuário não encontrado.';

export const movieNotFound = 'Filme não encontrado.';
