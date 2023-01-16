const ignoreErrorNames = [
  'NavigationDuplicated',
  'ChunkLoadError',
]

const ignoreErrorMessages = [
  /Loading CSS chunk .* failed\./,
  /Navigation cancelled from ".*" to ".*" with a new navigation\./,
  /TypeError: Load failed/,
  '"message": "header not found"'
]

export default [
  ...ignoreErrorNames,
  ...ignoreErrorMessages
]