
/**
 * @description copy only simple properties (non-object properties)
 * @param src source
 * @param target target
 */
export function copyProperties(src: any, target: any) {
  for (const key in src) {
    if (src.hasOwnProperty(key) && typeof src[key] !== 'object') {
      target[key] = src[key];
    }
  }
}
