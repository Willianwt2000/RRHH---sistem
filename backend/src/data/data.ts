const listOfAccount = [
  {
    id: 1,
    personalId: "402-1234567-8",
    name: "Willian",
    lastname: "Metelien",
    username: "wtwill",
    password: "guesswhat",
    active: true,
  },
];

const listOfTokens = [
  {
    tokenId: 1,
    userId: 1,
    token: "An awesome token",
    creationDate: "26-02-2026",
    expiresIn: "1d",
    active: true,
  },
];

const listOfPonches = [
  {
    id: 1,
    empleadoId: 1,
    fechaEntrada: "2023-10-01T08:00:00",
    fechaSalida: "2023-10-01T17:00:00",
  },
];


const listOfCargos = [
  {
    id: 1,
    nombre: "Gerente",
    activo: true,
  },
  {
    id: 2,
    nombre: "Desarrollador",
    activo: true,
  },
];


export { listOfAccount, listOfTokens, listOfPonches, listOfCargos };