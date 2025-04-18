export const logger = {
  info: (msg: string) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
  error: (msg: string) => console.error(`\x1b[31m[ERRO]\x1b[0m ${msg}`)
};
