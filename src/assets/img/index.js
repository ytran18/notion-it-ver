// imageLoader.js
const importAll = (context) => context.keys().map(context);

const context1Images = importAll(require.context('./color-gradient', false, /\.(png|jpe?g|svg)$/));
const context2Images = importAll(require.context('./james-webb-telescope', false, /\.(png|jpe?g|svg)$/));
const context3Images = importAll(require.context('./nasa-archive', false, /\.(png|jpe?g|svg)$/));
// Thêm nhiều require.context khác nếu bạn cần

const allImages = [...context1Images, ...context2Images, ...context3Images];

export default allImages;
