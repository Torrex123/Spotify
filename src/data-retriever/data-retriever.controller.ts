import { Controller, Get } from '@nestjs/common';
import { DataRetrieverService } from './data-retriever.service';

@Controller('seed')
export class DataRetrieverController {

    constructor(private readonly dataRetrieverService: DataRetrieverService) {}

    @Get()
    async retrieveData() {
        return this.dataRetrieverService.seederInit();
    }

    @Get('data')
    async retrieveData2() {
        return this.dataRetrieverService.retrieveData();
    }
}
