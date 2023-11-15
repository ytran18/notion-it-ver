const importAll = (context) => context.keys().map(context);

const Rijksmuseum = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const newObj = {};

let count = 0;

for (const key in Rijksmuseum) {
    if (count < Object.keys(Rijksmuseum).length / 2) {
        newObj[key] = Rijksmuseum[key];
        count++;
    } else {
        break;
    }
}

export default Object.values(newObj);