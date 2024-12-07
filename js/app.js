const ingresos = [
    new Ingreso('Sueldo', 4000),
    new Ingreso('Ropa', 800),
];

const egresos = [
    new Egreso('Comida', 300),
    new Egreso('mercado', 2000),
];


let cargarApp = () => {
    //se asigna otra funcion como callback
    cargarCabecero ();
    cargarIngresos();
    cargarEgresos();
}


let totalIngresos = () => {
    let totalIngreso = 0;
    //se itera la cantidad total del arreglo de ingresos para ir sumando
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}


let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso
}


//para cargar el cabecero primero se tienen que crear las otras funciones correspondientes a los calculos
let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos(); //calculando el presupuesto
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    //reemplazando el html por los calculos de la app
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

//aplicando formato de moneda

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:2});
}



//para cargar los ingresos en el listado html 

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);  
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${ingreso.valor}</div>
                    <div class="elemento_eliminar"><button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick ="eliminarIngreso(${ingreso.id})"></ion-icon>
                    </button>
                    </div>
                    </div>
    </div>
    `
    return ingresoHTML;
}

//para eliminar ingreso
//se pasa como parametro el id para que al recorrer el arreglo se elimine el id correspondiente al elemento que se desea eliminar
const eliminarIngreso = (id) => {
    //findIndex va a iniciar la busqueda, posteriormente se declara una funcion flecha con la cual se accedera al arreglo con el valor del id y que sea igual a id el cual es el parametro para detener la busqueda del mismo
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    //splice funciona para eliminar elementos, en este caso del arreglo y posteriormente cuantos elementos se van a eliminar, "1"
    ingresos.splice(indiceEliminar, 1);
    //despues de eliminarlo, se deben volver a cargar tanto cabecero como listado de ingresos
    cargarCabecero();
    cargarIngresos();
}

//para cargar los egresos en el listado html

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `<div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn"><ion-icon name="close-circle-outline" onclick = 'eliminarEgreso(${egreso.id})'></ion-icon></button>
                        </div>
                    </div>
                </div>`
                return egresoHTML;
}

//para eliminar egresos 

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}


//agregar nuevo elemento a traves del formulario
let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if (descripcion.value !== '' && valor.valor !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }
        else if (tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    }
}