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

   if(respostas.length == 0){
      console.log("Nenhuma meta foi selecionada")
      return
   }

   metas.forEach((m) => {
      m.checked = false
   })

   respostas.forEach((resposta) => {
      const meta = metas.find((m) => {
         return m.value == resposta
      })

      meta.checked = true

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

               case "sair":
                  console.log("Até a próxima!")
                  return
      }
   }

}

start();