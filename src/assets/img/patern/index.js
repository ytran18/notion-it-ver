const importAll = (context) => context.keys().map(context);

const Patern = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const newObj = {};

let count = 0;

for (const key in Patern) {
    if (count < Object.keys(Patern).length / 2) {
        newObj[key] = Patern[key];
        count++;
    } else {
        break;
    }
}

export default Object.values(newObj);