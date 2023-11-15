const importAll = (context) => context.keys().map(context);

const Nasa = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const newObj = {};

let count = 0;

for (const key in Nasa) {
    if (count < Object.keys(Nasa).length / 2) {
        newObj[key] = Nasa[key];
        count++;
    } else {
        break;
    }
}

export default Object.values(newObj);