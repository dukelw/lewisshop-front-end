import slugify from 'slugify';

export function createSlug(text) {
  return slugify(text, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
}
