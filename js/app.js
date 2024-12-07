const ingresos = [
    new Ingreso('Sueldo', 4000),
    new Ingreso('Ropa', 800),
];

const egresos = [
    new Egreso('Comida', 300),
    new Egreso('Arriendo', 2000),
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
                    onclick ="elimninarIngreso(${ingreso.id})"></ion-icon>
                    </button>
                    </div>
                    </div>
    </div>
    `
    return ingresoHTML;
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
                            <button class="elemento_eliminar--btn"><ion-icon name="close-circle-outline"></ion-icon></button>
                        </div>
                    </div>
                </div>`
                return egresoHTML;
}


//para eliminar ingreso
//se pasa como parametro el id para que al recorrer el arreglo se elimine el id correspondiente al elemento que se desea eliminar
const eliminarIngreso = (id) => {
    
}