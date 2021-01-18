import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationRequest {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Max(100)
    limit: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    offset: number;
}