const importAll = (context) => context.keys().map(context);

const context1Images = importAll(require.context('./color-gradient', false, /\.(png|jpe?g|svg)$/));
const context2Images = importAll(require.context('./james-webb-telescope', false, /\.(png|jpe?g|svg)$/));
const context3Images = importAll(require.context('./nasa-archive', false, /\.(png|jpe?g|svg)$/));
const context4Images = importAll(require.context('./patern', false, /\.(png|jpe?g|svg)$/));
const context5Images = importAll(require.context('./rijksmuseum', false, /\.(png|jpe?g|svg)$/));
const context6Images = importAll(require.context('./japanese-print', false, /\.(png|jpe?g|svg)$/));
const context7Images = importAll(require.context('./the-met-musium', false, /\.(png|jpe?g|svg)$/));

const allImages = [...context1Images, ...context2Images, ...context3Images, 
...context4Images, ...context5Images, ...context6Images, ...context7Images
];

export default allImages;
