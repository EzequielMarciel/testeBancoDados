import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// suas credenciais do Supabase
const supabaseUrl = "https://rzmomstdheorrqwkdfek.supabase.co"
const supabaseKey = "sb_publishable_p9mvf-w3oreBk5KvAMKfvg_tpScOIzu"
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById("cadastroForm")
const perfilDiv = document.getElementById("perfil")

// CADASTRAR USUÁRIO
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const nome  = document.getElementById("nome").value.trim()
  const email = document.getElementById("email").value.trim()
  const foto  = document.getElementById("foto").value.trim()
  const senha = document.getElementById("senha").value.trim()

  // Validação simples

  if (!nome || !email || !senha) {
    perfilDiv.innerHTML = `<p style="color:red">Nome, Email e Senha são obrigatórios!</p>`
    return
  }

  // Inserir no Supabase
  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ nome, email, foto_url: foto, senha }])
    .select() // retorna o registro inserido

  if (error) {
    console.error("Erro ao inserir:", error)
    perfilDiv.innerHTML = `<p style="color:red">Erro: ${error.message}</p>`
  } else {
    console.log("Registro inserido:", data)
    const usuario = data[0]
    perfilDiv.style.display = "flex";
    perfilDiv.innerHTML = `
      <h2>Usuário cadastrado</h2>
      <p><strong>Nome:</strong> ${usuario.nome}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>ID de cadastro:</strong> ${usuario.id}</p>
      ${usuario.foto_url ? `<img src="${usuario.foto_url}" alt="Foto">` : ""}
      <button onclick="atualizarUsuario(${usuario.id})">Atualizar Nome</button>
    `
  }
})

// FUNÇÃO PARA ATUALIZAR USUÁRIO
async function atualizarUsuario(id) {
  const novoNome = prompt("Digite o novo nome:")
  if (!novoNome) return

  const { data, error } = await supabase
    .from("usuarios")
    .update({ nome: novoNome })
    .eq("id", id)
    .select()

  if (error) {
    alert("Erro ao atualizar: " + error.message)
    return
  }

  const usuario = data[0]
  perfilDiv.innerHTML = `
    <h2>${usuario.nome}</h2>
    <p>Número de cadastro: ${usuario.id}</p>
    ${usuario.foto_url ? `<img src="${usuario.foto_url}" alt="Foto">` : ""}
    <button onclick="atualizarUsuario(${usuario.id})">Atualizar Nome</button>
  `
}

async function buscarUsuario(email) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("id, nome, email, foto_url")
    .eq("email", email)
    .single()

  if (error) {
    console.error("Erro ao buscar:", error.message)
    return
  }

  console.log("Usuário encontrado:", data)
  document.getElementById("info").innerHTML = `
    <h2>${data.nome}</h2>
    <p>ID do usuário: ${data.id}</p>
    <p>Email: ${data.email}</p>
  `
}

// exemplo de uso
buscarUsuario("teste@teste.com")
