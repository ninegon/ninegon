import { ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common'

export function createErrorFromPipe (message: string, metadata?: ArgumentMetadata) {
  return new HttpException({
    status: HttpStatus.BAD_REQUEST,
    error: `Validation error (${message.toLowerCase()})`,
    meta: metadata
  }, HttpStatus.BAD_REQUEST)
}
