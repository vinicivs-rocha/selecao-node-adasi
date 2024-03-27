import { Inject, Injectable } from '@nestjs/common';
import { RemoveOutput } from 'src/courses/application/use-cases/crud/remove.output';
import { IStudentsCrudRepository } from 'src/students/domain/repositories/crud';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { IRemoveOutputFactory } from '../../factories/remove-output';
import { IUpdateOutputFactory } from '../../factories/update-output';
import { UpdateOutput } from './update.output';
import { UpdateStudentDto } from '../../dto/update-student.dto';

@Injectable()
export class CrudService {
  constructor(
    @Inject('StudentsCrudRepository')
    private crudRepository: IStudentsCrudRepository,
    @Inject('RemoveOutputFactory')
    private removeOutputFactory: IRemoveOutputFactory,
    @Inject('UpdateOutputFactory')
    private updateOutputFactory: IUpdateOutputFactory,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    return this.crudRepository.create(createStudentDto);
  }

  findAll() {
    return this.crudRepository.list();
  }

  findOne(cpf: string) {
    return this.crudRepository.find(cpf);
  }

  async update(
    cpf: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateOutput> {
    const updated = await this.crudRepository.update(cpf, updateStudentDto);
    return this.updateOutputFactory.create(updated);
  }

  async remove(cpf: string): Promise<RemoveOutput> {
    const removedCpf = await this.crudRepository.delete(cpf);
    return this.removeOutputFactory.create(removedCpf);
  }
}
