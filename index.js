
// Ejercicio 1: Promesas Encadenadas

function numRandom() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.floor(Math.random() * 100)), 2000);
  });
}

function numCuadrado(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num ** 2), 3000);
  });
}

function raiz(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.sqrt(num)), 1000);
  });
}

numRandom()
  .then((numeroAleatorio) => {
    console.log("Número aleatorio:", numeroAleatorio);
    return numCuadrado(numeroAleatorio);
  })
  .then((numeroCuadrado) => {
    console.log("Número al cuadrado:", numeroCuadrado);
    return raiz(numeroCuadrado);
  })
  .then((raizNumero) => {
    console.log("Raiz:", raizNumero);
  })
  .catch((error) => {
    console.error("Se produjo un error:", error);
  });

//   Ejercicio 2: Promesa de Múltiples Solicitudes

const urls = [
  "https://thronesapi.com/api/v2/Characters/1",
  "https://thronesapi.com/api/v2/Characters/2",
  "https://thronesapi.com/api/v2/Characters/3",
];
function gets(urls) {
  const promises = [];
  urls.forEach((url) => {
    promises.push(
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          return (firstName = data.firstName);
        })
        .catch((error) => {
          console.error(error);
          return null;
        })
    );
  });
  return Promise.all(promises);
}

gets(urls)
  .then((resultados) => {
    console.log("Resultados de las solicitudes:", resultados);
  })
  .catch((error) => {
    console.error("Se produjo un error:", error);
  });

//   Ejercicio 3: Promesas Paralelas

const func1 = () => {
  return new Promise((resolve, reject) => resolve("Promesa1"));
};
const func2 = () => {
  return new Promise((resolve, reject) => resolve("Promesa2"));
};
const func3 = () => {
  return new Promise((resolve, reject) => resolve("Promesa3"));
};

const funciones = [func1, func2, func3];

function paralelas(funciones) {
  return Promise.all(funciones.map((res) => res()));
}

paralelas(funciones).then((res) => console.log(res));

// Ejercicio 4: Promesas en Cadena con Retraso

function retraso(n) {
  let promises = [];
  for (let i = 1; i <= n; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        console.log(i);
        setTimeout(() => resolve(), i * 1000);
      })
    );
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Todas las promesas se resolvieron"), n * 1000);
  });
}

retraso(5).then((res) => console.log(res));

// Ejercicio 5: Promesa con Cancelación

let cancel;

const promesa1 = ()=>{
    setTimeout(()=>{
        if(cancel){
            cancelarPromesa().then(res=>console.log(res))
        }else{
            new Promise((resolve,reject)=>{
                resolve(console.log('Resuelta!'));
            })
        }
    },5000);
}   

const cancelarPromesa = ()=>{
    cancel = true;
    new Promise((resolve,reject)=>{
        reject('Cancelada :(');
    })
}   

promesa1();
cancelarPromesa();
