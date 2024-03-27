import { IRemoveOutputFactory } from 'src/students/application/factories/remove-output';

export class RemoveOutputFactory implements IRemoveOutputFactory {
  create(cpf: string) {
    return {
      cpf,
    };
  }
}
