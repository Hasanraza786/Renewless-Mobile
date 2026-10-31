const logo_mark = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 51 51\" fill=\"none\" role=\"img\" aria-labelledby=\"title\"> <title id=\"title\">Renewless</title> <rect width=\"51\" height=\"51\" fill=\"#151719\"/> <path d=\"M16 19C18 11 26 9 33 13C40 17 40 25 34 29M13 40C10 31 14 24 20 27C26 30 30 43 40 39\" stroke=\"#B9E58C\" stroke-width=\"5.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </svg>";

export default logo_mark;

// Approved vector geometry; path lengths are in the 51-unit SVG coordinate space.
export const brand_mark_paths = [
  { d: 'M16 19C18 11 26 9 33 13C40 17 40 25 34 29', length: 43 },
  { d: 'M13 40C10 31 14 24 20 27C26 30 30 43 40 39', length: 45 },
] as const;
