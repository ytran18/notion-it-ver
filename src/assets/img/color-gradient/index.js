const importAll = (context) => context.keys().map(context);
  
const ColorGradient = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const newObj = {};

let count = 0;

for (const key in ColorGradient) {
    if (count < Object.keys(ColorGradient).length / 2) {
        newObj[key] = ColorGradient[key];
        count++;
    } else {
        break;
    }
}

export default Object.values(newObj);
  