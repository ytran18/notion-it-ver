const importAll = (context) => context.keys().map(context);

const Musium = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const newObj = {};

let count = 0;

for (const key in Musium) {
    if (count < Object.keys(Musium).length / 2) {
        newObj[key] = Musium[key];
        count++;
    } else {
        break;
    }
}

export default Object.values(newObj);