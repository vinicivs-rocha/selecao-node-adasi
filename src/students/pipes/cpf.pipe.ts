import { BadRequestException, PipeTransform } from '@nestjs/common';

export class CPFPipe implements PipeTransform {
  cpfRegex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
  transform(value: any) {
    if (value.length !== 14) {
      throw new BadRequestException('Invalid CPF');
    }
    if (!this.cpfRegex.test(value))
      throw new BadRequestException('Invalid CPF');
    return value;
  }
}
