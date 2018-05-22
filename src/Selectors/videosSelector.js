//returns videos array filtered with the text field (search) field
export default (videos, { text }) => {
  return videos.filter(video => {
    const nameMatch = video.name.toLowerCase().includes(text.toLowerCase());
    return nameMatch;
  });
};
