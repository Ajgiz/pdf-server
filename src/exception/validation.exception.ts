import { HttpException, HttpStatus } from "@nestjs/common";
export class ValidationException extends HttpException {
  messages: string;
  constructor(response: string[] | string) {
    super(response, HttpStatus.BAD_REQUEST);
    this.message = response as string;
  }
}
