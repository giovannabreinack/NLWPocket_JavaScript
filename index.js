const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
   value: 'Fazer a ADO de Segurança',
   checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
 const meta = await input({message: "Digite a meta:"})

 if(meta.length == 0){
  console.log('A meta não pode ser vazia')
  return cadastrarMeta()

 }

 metas.push({
   value: meta,
   checked: false
 })

}

 const listarMetas = async () => {
   const respostas = await checkbox({
      message: "Use as setas para mudar de meta, o espaço para marcar/desmarcar e o Enter para finalizar esta etapa.",
      choices: [...metas],
      instructions: false,
   })

   metas.forEach((m) => {
      m.checked = false
   })

   if(respostas.length == 0){
      console.log("Nenhuma meta foi selecionada")
      return
   }

   respostas.forEach((resposta) => {
      const meta = metas.find((m) => {
         return m.value == resposta
      })

      meta.checked = true

   })
 
 }

 const metasRealizadas = async () => {
   const realizadas = metas.filter((meta) => {
      return meta.checked
   })

   if(realizadas.length == 0){
      console.log('Não existem metas realizadas')
      return
   }

   await select({
      message: "Metas Realizadas: " + realizadas.length,
      choices: [...realizadas]
   })
 }

 const metasAbertas = async () => {
   const abertas = metas.filter((meta) => {
      return !meta.checked
      // ! Inverte o valor booleano
   })

   if(abertas.length == 0){
      console.log("Não existem metas abertas!")
      return
   }

   await select({
      message: "Metas Abertas: " + abertas.length,
      choices: [...abertas]
   })
 }

const start = async () => {

   while(true){

      const opcao = await select({
         message: "Menu >",
         choices: [
            {
               name: "Cadastrar Metas",
               value: "cadastrar"
            },
            {
               name: "Listar Metas",
               value: "listar"
            },
            {
               name: "Metas Realizadas",
               value: "realizadas"
            },
            {
               name: "Metas Abertas",
               value: "abertas"
            },
            {
               name: "Sair",
               value: "sair"
            }
         ]
      })

      switch(opcao) {

         case "cadastrar":
            await cadastrarMeta()
            break

         case "listar":
            await listarMetas()
            break

         case "realizadas":
           await metasRealizadas()
           break

         case "abertas":
            await metasAbertas()
            break

          case "sair":
            console.log("Até a próxima! :)")
            return
      }
   }

}

start();