const images = [
  { url: 'images/bois.jpg', label: 'Bois' },
  { url: 'images/cuir.jpg', label: 'Cuir' },
  { url: 'images/acier.jpg', label: 'Acier' },
];

export const getPopularImages = () => Promise.resolve(images);