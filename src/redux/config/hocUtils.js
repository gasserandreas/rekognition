const createHocTypes = (baseType) => ({
  START: `${baseType}_START`,
  SUCCESS: `${baseType}_SUCCESS`,
  ERROR: `${baseType}_ERROR`,
});

const checkHocTypes = types => {
  const { START, SUCCESS, ERROR } = types;
  return START && SUCCESS && ERROR;
};

const parsePayloadById = payload => {
  const byId = {};
  const ids = [];

  payload.forEach((item) => {
    const { id } = item;
    byId[id] = item;
    ids.push(id);
  });

  return Promise.resolve({
    byId,
    ids: [...new Set(ids)],
  });
};

export {
  checkHocTypes,
  createHocTypes,
  parsePayloadById,
};
