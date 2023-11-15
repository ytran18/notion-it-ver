const importAll = (context) => context.keys().map(context);

const Japanese = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const newObj = {};

let count = 0;

for (const key in Japanese) {
    if (count < Object.keys(Japanese).length / 2) {
        newObj[key] = Japanese[key];
        count++;
    } else {
        break;
    }
};

export default Object.values(newObj);