export const QueryUrl = (resource, params) => {
  const url = new URL(resource)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return url
}