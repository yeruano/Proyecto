import app from './app';
import '@babel/polyfill';

async function main() {

    app.listen(process.env.PORT, () => {
        console.log(`Server on port ${ process.env.PORT }`);
    });

}

main();
