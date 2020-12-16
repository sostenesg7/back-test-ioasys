const minMaxMessage = (field: string, min: number, max: number) =>
  `O campo ${field} deve conter entre ${min} e ${max} caracteres.`;

export const admin = {
  register: {
    name: 'O campo nome é requerido.',
    nameLength: minMaxMessage('nome', 1, 100),
    email: 'Email inválido.',
    password: 'O campo senha é requerido.',
    passwordLength: minMaxMessage('senha', 6, 16),
    passwordConfirmation: 'O campo confirmação de senha é requerido.',
    passwordConfirmationLength: minMaxMessage('confirmação de senha', 6, 16),
    passwordConfirmationMatch:
      'O campo senha e confirmação de senha não conferem.',
  },
};

export const emailAlreadyRegistered = 'O email informado já existe.';
