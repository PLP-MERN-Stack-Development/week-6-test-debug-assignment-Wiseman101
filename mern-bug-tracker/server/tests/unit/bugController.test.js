const Bug = require('../../src/models/bugModel');
const {
  createBug,
  getBugs,
  updateBug,
  deleteBug
} = require('../../src/controllers/bugController');

jest.mock('../../src/models/bugModel');

const mockReqRes = (body = {}, params = {}) => {
  const req = { body, params };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  return { req, res, next };
};

describe('Bug Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createBug should save and return the new bug', async () => {
    const bugData = { title: 'Test bug', description: 'Sample bug' };
    const savedBug = { ...bugData, status: 'open', _id: '123' };

    Bug.create.mockResolvedValue(savedBug);

    const { req, res, next } = mockReqRes(bugData);

    await createBug(req, res, next);

    expect(Bug.create).toHaveBeenCalledWith({ ...bugData, status: 'open' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedBug);
  });

  test('getBugs should return list of bugs', async () => {
    const bugs = [{ title: 'Bug1' }, { title: 'Bug2' }];
    Bug.find.mockResolvedValue(bugs);

    const { req, res, next } = mockReqRes();

    await getBugs(req, res, next);

    expect(Bug.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(bugs);
  });

  test('updateBug should return updated bug', async () => {
    const bugId = 'abc123';
    const updateData = { status: 'resolved' };
    const updatedBug = { _id: bugId, ...updateData };

    Bug.findByIdAndUpdate.mockResolvedValue(updatedBug);

    const { req, res, next } = mockReqRes(updateData, { id: bugId });

    await updateBug(req, res, next);

    expect(Bug.findByIdAndUpdate).toHaveBeenCalledWith(
      bugId,
      updateData,
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith(updatedBug);
  });

  test('deleteBug should confirm deletion', async () => {
    const bugId = 'xyz456';

    Bug.findByIdAndDelete.mockResolvedValue({ _id: bugId });

    const { req, res, next } = mockReqRes({}, { id: bugId });

    await deleteBug(req, res, next);

    expect(Bug.findByIdAndDelete).toHaveBeenCalledWith(bugId);
    expect(res.json).toHaveBeenCalledWith({ message: 'Bug deleted' });
  });
});
