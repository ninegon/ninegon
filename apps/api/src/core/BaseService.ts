import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, EntityTarget, QueryRunner, Repository } from 'typeorm'

@Injectable()
export class BaseService {
  private connection: DataSource
  private queryRunner?: QueryRunner

  constructor(
    connection?: DataSource,
  ) {
    if (connection) this.connection = connection
  }

  private errorStatusDefault = HttpStatus.CONFLICT
  private errorMessageDefault = 'Unexpected internal error'

  makeQB<T = any>(repository: Repository<T>, entity: EntityTarget<any>, alias = 'alias', transacting = false) {
    // if (transacting) {
    //   if (!this.queryRunner) {
    //     this.queryRunner = this.connection.createQueryRunner()
    //   }

    //   return this.connection.createQueryBuilder<T>(entity, alias, this.queryRunner)
    // }

    // return this.connection.createQueryBuilder<T>(entity, alias)
    return repository.createQueryBuilder(alias)
  }

  async startTrx() {
    if (this.queryRunner) {
      throw new Error('Already running transactions!')
    }

    this.queryRunner = this.connection.createQueryRunner()
    await this.queryRunner.connect()
    await this.queryRunner.startTransaction()
  }

  async commitTrx() {
    if (!this.queryRunner) {
      throw new Error('No running transactions!')
    }

    if (!this.queryRunner.isTransactionActive) {
      this.queryRunner = undefined
      throw new Error('No running transactions!')
    }

    this.queryRunner.commitTransaction()
  }

  async rollbackTrx() {
    if (!this.queryRunner) {
      throw new Error('No running transactions!')
    }

    if (!this.queryRunner.isTransactionActive) {
      this.queryRunner = undefined
      throw new Error('No running transactions!')
    }

    this.queryRunner.rollbackTransaction()
  }

  public isRunningTrx() {
    return this.queryRunner ? this.queryRunner.isTransactionActive : false
  }

  async releaseTrx() {
    if (!this.queryRunner) {
      throw new Error('No running transactions!')
    }

    if (!this.queryRunner.isTransactionActive) {
      this.queryRunner = undefined
      throw new Error('No running transactions!')
    }

    this.queryRunner.release()
    this.queryRunner = undefined
  }

  protected error = (error: string | HttpException | TypeError, status?: HttpStatus) => {
    // protected error = (mensaje: string, T: HttpStatus = HttpStatus.NOT_FOUND) => {
    let mensaje: string = <any>undefined
    if (/^String$/.test(error.constructor.name)) {
      mensaje = <string>error
    } else if (/^(TypeError|QueryFailedError)$/.test(error.constructor.name)) {
      mensaje = (<any>error).customMessage
    } else if (/^HttpException$/.test(error.constructor.name)) {
      mensaje = (<HttpException>error)['response']
      status = (<HttpException>error)['status']
    }

    throw new HttpException(mensaje ? mensaje : this.errorMessageDefault, status || this.errorStatusDefault)
  }
}
