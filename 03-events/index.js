const EventEmitter = require( 'events' )

class myEmitter extends EventEmitter {

}
const myEmissor = new myEmitter()
const nameEvent = 'user:click'
myEmissor.on( nameEvent, function ( click ) {
    console.log('um usuario clicou', click)    
} )

/**
 * @example Evento infinito
 * /
myEmissor.emit( nameEvent, 'na barra de rolagem' )
myEmissor.emit( nameEvent, 'no ok' )

let count = 0
setInterval(function () {
    myEmissor.emit(nameEvent, 'no ok' + (count ++))
}, 1000 );
*/

/**
 * @example Evento infinito com operações dentro
 */
const stdin = process.openStdin()
function main () { 
    return new Promise( function (resolve, reject) {
        stdin.addListener( 'data', function ( value ) {
            // console.log( `Você digitou; ${ value.toString().trim() }` )
            return resolve(value)
        })
    })

}

main().then( function ( result ) {
    console.log('resultado', result.toString());    
})