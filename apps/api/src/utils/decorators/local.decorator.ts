import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Local = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const res = ctx.switchToHttp().getResponse()
        const locals = res?.locals

        return data ? locals?.[data] : data
    }
)
