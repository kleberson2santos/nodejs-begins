/**
 * 0- Obter um usuario
 * 1- Obter o numero de telefone de um usuario a partir de seu Id
 * 2- Obter o endereço do usuario pelo Id
*/

// use internal module node.js
const util = require('util')
const getAddressAsync = util.promisify(getAddress)

 function getUser() {
     // quando ser algum problema -> reject(ERRO)
     // quando sucess -> RESOLV
    return new Promise(function resolvePromisse(resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                name: 'Aladin',
                birthday: new Date()
            })
        }, 1000)
        
    })
 }

 function getTelephone(idUser) {
     return new Promise(function resolvePromisse(resolve, reject){
        setTimeout(() => {
            return resolve({
                telephone:'1199002',
                ddd: 11
               })
        }, 2000);
     })
     
 }

 function getAddress(idUser, callback) {
     setTimeout( () =>
     {         
         return callback(null, {
             street: 'dos bobos',
             number: '0'
         })
     }, 2000);
 }
main()
async function main() {
    try
    {
        console.time('medida-promise')
        const user = await getUser()
        // const telephone = await getTelephone()
        // const address = await getAddressAsync(user.id)
        const result = await Promise.all([
            getTelephone(user.id),
            // @ts-ignore
            getAddressAsync(user.id)
        ])
        const address = result[ 1 ] 
        const telephone = result[ 0 ]
        
        console.log(`
            Nome: ${user.name},
            Telefone: (${telephone.ddd })${ telephone.telephone},
            Endereço: ${address.street },${ address.number}
        `);
        console.timeEnd('medida-promise')
        
    } catch (error) {
        console.log('DEU RUIM', error)        
    }
}

/**
 * @example Convertendo callbacks em promisses
 * 
 const userPromisse = getUser()

 userPromisse
    .then(function (user){
        return getTelephone(user.id)
        .then(function resolveTelephone(result) {
            return {
                user: {
                    name: user.name,
                    id: user.id
                },
                telephone: result
            }            
        })
    })
    .then(function (result) {
        const address = getAddressAsync(result.user.id)
        return address.then(function solveAddress(resultAdress) {
            return {
                user: result.user,
                telephone: result.telephone,
                address: resultAdress
            }
        });
    })
    .then(function (result) {
        console.log(`
        Nome: ${result.user.name}
        Endereço: ${result.address.street}, ${result.address.number}
        Telefone: (${result.telephone.ddd})${result.telephone.telephone}
        `)        
    })
    .catch(function (error) {
        console.error('DEU RUIM', error)        
    })
*/
 
//  function solveUser(error, user) {
//     console.log('user ', user);
//  }
 
 /**
 * @example Callbacks aninhados
 *
 getUser(function solveUser(error, user){
     if (error) {
         console.error('DEU RUIM em USUARIO ', error)
         return;         
     }
     getTelephone(user.id, function solveTelephone(error1, telephone){
        if (error1) {
            console.error('DEU RUIM em TELEFONE ', error1)
            return;
        }
        getAddress(user.id, function solveAddress(error2, address){
            if (error2) {
                console.error('DEU RUIM em ENDERECO ', error2);
                
            }

            console.log(`
                Nome: ${user.name},
                Endereço: ${address.street}, ${address.number},
                Telefone: (${telephone.number})${telephone.telephone}
            `);
            
        })
     })
 })
 */

//  const adress = getTelphone(user.id)
//  const telephone = getAdress(user.id)
//  console.log('telephone ', telephone);