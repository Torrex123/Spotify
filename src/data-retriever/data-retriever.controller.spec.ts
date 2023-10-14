import { Test, TestingModule } from '@nestjs/testing';
import { DataRetrieverController } from './data-retriever.controller';

describe('DataRetrieverController', () => {
  let controller: DataRetrieverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataRetrieverController],
    }).compile();

    controller = module.get<DataRetrieverController>(DataRetrieverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
