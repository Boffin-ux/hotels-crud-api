export const createEndpointKey = (endpoint: string, pathname: string, method: string): string => {
  const endpointName = pathname.toLowerCase().replace(/\/$/g, '');
  const _method = method.toLowerCase();
  const idReg = new RegExp(`${endpoint}/` + '[a-z0-9-]+/?$', 'gi');

  if (endpointName.match(idReg)) {
    return `${endpoint}/{id}:${_method}`;
  }

  if (endpointName === endpoint) {
    return `${endpoint}:${_method}`;
  }

  return 'unknown';
};
