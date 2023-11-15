const importAll = (context) => context.keys().map(context);

const Telescope = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const newObj = {};

let count = 0;

for (const key in Telescope) {
    if (count < Object.keys(Telescope).length / 2) {
        newObj[key] = Telescope[key];
        count++;
    } else {
        break;
    }
}

export default Object.values(newObj);