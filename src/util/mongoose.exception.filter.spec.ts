import { MongooseExceptionFilter } from './mongoose.exception.filter';

describe('MongooseExceptionFilter', () => {
  let filter: MongooseExceptionFilter;
  beforeEach(() => {
    filter = new MongooseExceptionFilter();
  });
  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
});
