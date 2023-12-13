// Importando módulos necesarios
const readline = require('readline');
const fs = require('fs');
require('colors'); // Agrega colores a la salida en consola

// Creando una interfaz para leer y escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definiendo una clase para representar un Producto
class Producto {
  // Propiedades privadas del Producto
  #codigoProducto;
  #nombreProducto;
  #inventarioProducto;
  #precioProducto;
  #cantidadComprada;

  // Constructor del Producto
  constructor(){
    this.#codigoProducto = '';
    this.#nombreProducto = '';
    this.#inventarioProducto = 0; // Cambié el valor inicial a 0
    this.#precioProducto = 0; // Cambié el valor inicial a 0
    this.#cantidadComprada = 0;
  }

  // Métodos para establecer y obtener el código del producto
  set setCodigoProducto(value){
    this.#codigoProducto = value;
  }
  get getCodigoProducto(){
    return this.#codigoProducto;
  }

  // Métodos para establecer y obtener el inventario del producto
  set setInventarioProducto(value){
    this.#inventarioProducto = value;
  }
  get getInventarioProducto(){
    return this.#inventarioProducto;
  }

  // Métodos para establecer y obtener el nombre del producto
  set setNombreProducto(value){
    this.#nombreProducto = value;
  }
  get getNombreProducto(){
    return this.#nombreProducto;
  }

  // Métodos para establecer y obtener el precio del producto
  set setPrecioProducto(value){
    this.#precioProducto = value;
  }
  get getPrecioProducto(){
    return this.#precioProducto;
  }

  set setCantidadComprada(value){
    this.#cantidadComprada = value;
  }
  get getCantidadComprada(){
    return this.#cantidadComprada;
  }
}

// Definiendo una clase para representar una Tienda de Productos
class ProductosTienda {
  // Propiedad privada: lista de productos
  #listaProducto;

  constructor(){
    this.#listaProducto = [];
  }

  // Método para obtener la lista de productos
  get getListaProductos(){
    return this.#listaProducto;
  }

  // Método para agregar un producto a la lista y guardar en archivo
  agregarProducto(producto) {
    this.#listaProducto.push(producto);
    this.grabarArchivoProductos(); // Guardar en archivo
  }

  // Método para cargar productos desde un archivo
  
  cargarArchivosProductos2(){

  }


  cargarArchivosProductos() {
    let datosArchivo = [];

    try {
      const data = fs.readFileSync('datos.json', 'utf8'); // Leer archivo
      datosArchivo = JSON.parse(data); // Convertir a objeto JavaScript
    } catch (error) {
      console.error(error); // Manejar error en caso de fallo
    }

    let contador = 0; // Inicializa un contador en 0 para llevar un registro del número de productos procesados.

    if (datosArchivo.length > 0) { // Verifica si hay datos en el archivo (es decir, si el arreglo 'datosArchivo' tiene elementos).
      datosArchivo.forEach(objeto => { // Itera sobre cada objeto en el arreglo 'datosArchivo'.
        contador++; // Incrementa el contador en 1.
    
        let producto = new Producto(); // Crea una nueva instancia de la clase 'Producto' y la asigna a la variable 'producto'.
    
        // Establece las propiedades del producto con los valores del objeto actual en el bucle.
        producto.setCodigoProducto = objeto.codigoProducto;
        producto.setNombreProducto = objeto.nombreProducto;
        producto.setInventarioProducto = objeto.inventarioProducto;
        producto.setPrecioProducto = objeto.precioProducto;
    
        this.#listaProducto.push(producto); // Agrega el producto a la lista de productos de la tienda.
      });
    }

    console.log(`Total de productos cargados`.bgRed,` ==>`.bgYellow,` ${contador}`.bgRed);
  }

  // Método para guardar productos en un archivo
  grabarArchivoProductos() {
    // Mapea la lista de productos y crea un nuevo array de objetos con las propiedades deseadas
    const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
      return {
        codigoProducto: producto.getCodigoProducto, // Obtiene el código del producto
        nombreProducto: producto.getNombreProducto, // Obtiene el nombre del producto
        inventarioProducto: producto.getInventarioProducto, // Obtiene el inventario del producto
        precioProducto: producto.getPrecioProducto // Obtiene el precio del producto
      };
    });
  
    const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2); // Convierte el array de objetos a una cadena JSON con formato legible
    const nombreArchivo = 'datos.json'; // Nombre del archivo a escribir
  
    fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8'); // Escribe el JSON en el archivo 'datos.json' en formato UTF-8
    console.log(`DATOS GUARDADOS EN ${nombreArchivo}`); // Imprime un mensaje indicando que los datos se han guardado en el archivo
  }

  // Método para mostrar todos los productos en consola
  mostrarProductos() {
    // Itera sobre la lista de productos y muestra la información de cada producto en la consola.
    this.getListaProductos.forEach(producto => {
      console.log(`│ Código: ${producto.getCodigoProducto} │ Nombre: ${producto.getNombreProducto} │ Inventario: ${producto.getInventarioProducto} │ Precio: ${producto.getPrecioProducto} │`);
    });
  }
}

class Cliente { // Clase cliente no hereda
  #nombre; // Atributos encapsulados
  #tarjetaID;
  #direccion;
  #productosComprados;

  constructor() { // Metodo constructor para que sea utilizado en funciones 
    this.#nombre = '';
    this.#tarjetaID = '';
    this.#direccion = '';
    this.#productosComprados = [];
  }

  // Métodos para establecer y obtener el nombre del usuario
  set setNombre(value) {
    this.#nombre = value;
  }
  get getNombre() {
    return this.#nombre;
  }

  // Métodos para establecer y obtener el ID del usuario
  set setTarjetaID(value) {
    this.#tarjetaID = value;
  }
  get getTarjetaID() {
    return this.#tarjetaID;
  }

  // Métodos para establecer y obtener la direccion del usuario
  set setDireccion(value) {
    this.#direccion = value;
  }
  get getDireccion() {
    return this.#direccion;
  }

  // Métodos para establecer y obtener tanto el prdocto como la cantidad y pegarlo en una funcion
  agregarProductoComprado(producto, cantidad) {
    this.#productosComprados.push({ producto, cantidad });
  }

  get getProductosComprados() {
    return this.#productosComprados;
  }


  verCopia(){
    // Solicitar al usuario que ingrese el nombre base para la nueva copia de respaldo
    rl.question('Ingrese el nombre base de su nueva copia de respaldo : ', (nombreBase) => {
      
      // Obtener la fecha actual para incluir en el nombre de la copia de respaldo
      const fechaActual = new Date();
      const fechaFormateada = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')}`;
      
      // Crear el nombre de la copia de respaldo utilizando el nombre base y la fecha formateada
      const nombreCopia = `${nombreBase}_${fechaFormateada}.json`;

      // Definir las rutas del archivo original y la nueva copia
      const rutaOriginal = 'datos.json';
      const rutaCopia = nombreCopia;

      try {
        // Copiar el archivo original a la nueva ubicación con el nuevo nombre
        fs.copyFileSync(rutaOriginal, rutaCopia);
        console.log(`Copia de respaldo realizada correctamente: ${rutaCopia}`.bgGreen);
      } catch (error) {
        // Manejar errores en caso de que la copia de respaldo no pueda realizarse
        console.error(`Error al hacer la copia de respaldo: ${error}`);
      }

      // Mostrar el menú nuevamente después de completar la copia de respaldo
      mostrarMenu();
    });
}




}






// Crear una instancia de la clase ProductosTienda
let productosTienda = new ProductosTienda;

// Función para agregar un producto desde la consola
function agregarProductoDesdeConsola() {
  productosTienda.mostrarProductos();

  const ingresarProducto = () => {
    rl.question('Ingrese el código del producto: ', (codigo) => {
      rl.question('Ingrese el nombre del producto: ', (nombre) => {
        rl.question('Ingrese el inventario del producto: ', (inventario) => {
          rl.question('Ingrese el precio del producto: ', (precio) => {
            rl.question('¿Desea ingresar más productos? (SI/NO): ', (respuesta) => {
              const seguirIngresando = respuesta.toUpperCase() === 'SI';

              const nuevoProducto = new Producto(); // Crear un nuevo producto
              nuevoProducto.setCodigoProducto = codigo; // Establecer propiedades
              nuevoProducto.setNombreProducto = nombre;
              nuevoProducto.setInventarioProducto = inventario;
              nuevoProducto.setPrecioProducto = precio;

              productosTienda.agregarProducto(nuevoProducto); // Agregar producto a la tienda

              console.clear(); // Limpiar consola
              console.log('Producto agregado exitosamente.'.bgGreen);

              if (seguirIngresando) {
                productosTienda.mostrarProductos();
                ingresarProducto();
              } else {
                mostrarMenu();
              }
            });
          });
        });
      });
    });
  };

  ingresarProducto();
}


function borrarPoductoInventario(){
  productosTienda.mostrarProductos();
  rl.question('Ingrese el código del producto a borrar: ', (codigo) => {
    const productos = productosTienda.getListaProductos;
    const indiceProductoABorrar = productos.findIndex(producto => producto.getCodigoProducto === codigo);

    if (indiceProductoABorrar !== -1) {
      productos.splice(indiceProductoABorrar, 1); // Elimina el producto de la lista

      productosTienda.grabarArchivoProductos(); // Actualiza el archivo con la lista modificada

      console.clear();
      console.log('Producto borrado exitosamente.'.bgGreen);
    } else {
      console.clear();
      console.log('No se encontró un producto con ese código.'.bgRed);
    }

    mostrarMenu();
  });
}

let cliente = new Cliente; // Instanciar la clase Cliente

function copiaDeRespaldo(){ //funcion para ver copia de respaldo
  console.log('NO UTILIZAR CARACTERES ESPECIALES'.bgRed);
  
  cliente.verCopia();
}

// Esta función realiza una copia de respaldo de un archivo JSON.
function ReparaciónDatos() {

  // Muestra un mensaje en la consola para indicar que no se deben utilizar caracteres especiales.
  console.log('NO UTLIZAR CARACTERES ESPECIALES'.bgRed);

  // Pregunta al usuario el nombre del archivo que desea copiar.
  rl.question('Nombre del archivo a copiar : ', (archivo) =>{

    // Pregunta al usuario el nombre del nuevo o existente archivo.
    rl.question('Nombre del nuevo o existente archivo : ', (nuevo) =>{

      // Define las rutas de los archivos original y de copia.
      const rutaOriginal = `${archivo}.json`;
      const rutaCopia = `${nuevo}.json`;

      // Verifica si las rutas existen (este bloque de código no realiza la verificación de existencia de archivos).
      if (rutaOriginal, rutaCopia) {

        // Realiza la copia de respaldo utilizando la función copyFileSync de fs.
        fs.copyFileSync(rutaOriginal, rutaCopia);

        // Muestra un mensaje indicando que la copia de respaldo se realizó correctamente.
        console.log(`Copia de respaldo realizada correctamente: ${rutaCopia}`);
      } else {

        // Muestra un mensaje de error si hay algún problema al realizar la copia de respaldo.
        console.error(`Error al hacer la copia de respaldo: ${error}`);
      }

      // Llama a la función mostrarMenu después de completar la copia de respaldo o manejar el error.
      mostrarMenu();
    });
  });
}

// ... (tu código anterior)

// Variable global para almacenar el cliente actual
global.clienteActual = null;

function comprarProductos() {
  // Preguntar datos al cliente
  rl.question('Ingrese su nombre: ', (nombre) => {
    rl.question('Ingrese su tarjeta de ID: ', (tarjetaID) => {
      rl.question('Ingrese su dirección: ', (direccion) => {
        // Crear un nuevo cliente y asignarle los datos
        global.clienteActual = new Cliente();
        global.clienteActual.setNombre = nombre;
        global.clienteActual.setTarjetaID = tarjetaID;
        global.clienteActual.setDireccion = direccion;

        mostrarProductosParaCompra();
      });
    });
  });
}

function mostrarProductosParaCompra() {
  productosTienda.mostrarProductos();
  rl.question('Ingrese el código del producto que desea comprar: ', (codigo) => {
    const producto = productosTienda.getListaProductos.find(prod => prod.getCodigoProducto === codigo);

    if (producto) {
      rl.question('Ingrese la cantidad que desea comprar: ', (cantidad) => {
        const cantidadCompra = parseInt(cantidad);
        if (cantidadCompra > 0 && cantidadCompra <= producto.getInventarioProducto) {
          global.clienteActual.agregarProductoComprado(producto, cantidadCompra);

          // Actualizar inventario del producto en tiempo real
          producto.setInventarioProducto = producto.getInventarioProducto - cantidadCompra;


          rl.question('¿Desea comprar más productos? (SI/NO): ', (respuesta) => {
            const seguirComprando = respuesta.toUpperCase() === 'SI';
            if (seguirComprando) {
              mostrarProductosParaCompra();
            } else {
              // No generamos la factura aquí, esperamos a que el usuario lo solicite desde el menú
              mostrarMenu();
            }
          });
        } else {
          console.log('La cantidad ingresada no es válida o no hay suficiente inventario.'.bgRed);
          mostrarProductosParaCompra();
        }
      });
    } else {
      console.log('No se encontró un producto con ese código.'.bgRed);
      mostrarProductosParaCompra();
    }
  });
}

function generarFactura() {
  if (global.clienteActual) {
    console.clear();
    console.log('*** FACTURA ***'.bgGreen);
    console.log(`Nombre: ${global.clienteActual.getNombre}`);
    console.log(`Tarjeta de ID: ${global.clienteActual.getTarjetaID}`);
    console.log(`Dirección: ${global.clienteActual.getDireccion}`);
    console.log('Productos comprados:');
    global.clienteActual.getProductosComprados.forEach(({ producto, cantidad }) => {
      console.log(`- ${producto.getNombreProducto} | Cantidad: ${cantidad} | Precio unitario: ${producto.getPrecioProducto} | Total: ${cantidad * producto.getPrecioProducto}`);
    });
    const total = global.clienteActual.getProductosComprados.reduce((acc, { producto, cantidad }) => acc + cantidad * producto.getPrecioProducto, 0);
    console.log(`Total a pagar: ${total}`);
    console.log('*********'.bgGreen);

    rl.question('Presione Enter para continuar...', () => {
      global.clienteActual = null; // Limpiar el cliente actual después de generar la factura
      mostrarMenu();
    });
  } else {
    console.log('No hay datos de compra para generar la factura.'.bgRed);
    mostrarMenu();
  }
}

// ... (tu código posterior)



// Función para mostrar todos los productos en consola
function mostrarProductosDesdeConsola() {
  productosTienda.mostrarProductos();
  mostrarMenu(); // Mostrar el menú nuevamente
}

// Función para mostrar el menú de opciones en consola
function mostrarMenu(cliente, productosComprados) {
  console.log('******************************************************************'.blue);
  console.log(`***********************`.blue,  `INVENTÁRIO`.bgGreen,`  *****************************`.blue);
  console.log('******************************************************************\n'.blue);

  rl.question(`1. Cargar Datos\n2. Copia de Respaldo\n3. Reparación Datos\n4. Grabar Nuevos Producto\n5. Borrar Producto\n6. Comprar Productos\n7. Imprimir factura\n8. Limpiar Consola\n0. Cerara APP\nSeleccione una opción:\n` , (opcion) => {
    switch (opcion) {
      case '1':
        mostrarProductosDesdeConsola(); // Llamar función para agregar producto
        break;
      case '2':
        copiaDeRespaldo(); // Llamar función para mostrar productos
        break;
      case '3':
        ReparaciónDatos(); // Llamar función para mostrar productos
        break;
      case '4':
        agregarProductoDesdeConsola(); // Llamar función para mostrar productos
        break;
      case '5':
        borrarPoductoInventario()
        break;
      case '6':
        comprarProductos();
        break;
      case '7':
        generarFactura();
        break;
      case '8':
        Limpiar(); // Llamar función para limpiar la consola
        break;
      case '0':
        rl.close(); // Cerrar la interfaz de consola
        break;
      default:
        console.log('Opción no válida. Por favor, seleccione una opción válida.'.bgRed);
        mostrarMenu(); // Mostrar el menú nuevamente
        break;
    }
  });
}

// Función para limpiar la consola
function Limpiar() {
  console.clear();
  console.log(`Total de productos cargados`.bgRed,` ==>`.bgYellow,` ${productosTienda.getListaProductos.length}`.bgRed);
  mostrarMenu();
  
}

// Función principal
function main() {
  console.clear();
  productosTienda.cargarArchivosProductos();
  mostrarMenu();
}



// Llamar a la función principal para iniciar el programa
main();


